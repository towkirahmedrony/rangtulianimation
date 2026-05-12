import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// ইন-মেমোরি রেট লিমিট ট্র্যাকার (IP -> { count, lastReset })
const rateLimiter = new Map<string, { count: number; lastReset: number }>();

// রেট লিমিট কনফিগারেশন: ১ মিনিটে সর্বোচ্চ ৩ বার রিকোয়েস্ট
const RATE_LIMIT_WINDOW_MS = 60 * 1000; 
const MAX_REQUESTS_PER_WINDOW = 3;

export async function POST(request: Request) {
  try {
    // ১. ইউজারের IP অ্যাড্রেস বের করা
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : 'unknown-ip';

    // ২. রেট লিমিটিং লজিক
    const now = Date.now();
    const userRate = rateLimiter.get(ip);

    if (userRate) {
      if (now - userRate.lastReset < RATE_LIMIT_WINDOW_MS) {
        if (userRate.count >= MAX_REQUESTS_PER_WINDOW) {
          return NextResponse.json(
            { success: false, message: 'অতিরিক্ত রিকোয়েস্ট পাঠানো হয়েছে। দয়া করে ১ মিনিট পর আবার চেষ্টা করুন।' },
            { status: 429 }
          );
        }
        userRate.count += 1;
      } else {
        rateLimiter.set(ip, { count: 1, lastReset: now });
      }
    } else {
      rateLimiter.set(ip, { count: 1, lastReset: now });
    }

    const { name, email, inquiry_type, message, token } = await request.json();

    // ৩. কাস্টম ইনপুট ভ্যালিডেশন (আলাদা ক্যারেক্টার লিমিট চেক)
    const trimmedName = name?.trim() || '';
    const trimmedEmail = email?.trim() || '';
    const trimmedMessage = message?.trim() || '';

    // নামের ভ্যালিডেশন (২ - ৬০ ক্যারেক্টার)
    if (trimmedName.length < 2 || trimmedName.length > 60) {
      return NextResponse.json(
        { success: false, message: 'নাম কমপক্ষে ২ থেকে ৬০ অক্ষরের মধ্যে হতে হবে।' },
        { status: 400 }
      );
    }

    // ইমেইল ভ্যালিডেশন (৫ - ১০০ ক্যারেক্টার এবং সঠিক ফরম্যাট)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (trimmedEmail.length < 5 || trimmedEmail.length > 100 || !emailRegex.test(trimmedEmail)) {
      return NextResponse.json(
        { success: false, message: 'দয়া করে একটি সঠিক ইমেইল অ্যাড্রেস প্রদান করুন।' },
        { status: 400 }
      );
    }

    // মেসেজ ভ্যালিডেশন (১০ - ২০০০ ক্যারেক্টার)
    if (trimmedMessage.length < 10 || trimmedMessage.length > 2000) {
      return NextResponse.json(
        { success: false, message: 'মেসেজ কমপক্ষে ১০ থেকে ২০০০ অক্ষরের মধ্যে হতে হবে।' },
        { status: 400 }
      );
    }

    // টোকেন চেক
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Security token is missing.' }, 
        { status: 400 }
      );
    }

    // ৪. Cloudflare Turnstile ভেরিফিকেশন
    const verifyFormData = new FormData();
    verifyFormData.append('secret', process.env.TURNSTILE_SECRET_KEY!);
    verifyFormData.append('response', token);

    const turnstileResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: verifyFormData,
    });

    const turnstileData = await turnstileResponse.json();

    if (!turnstileData.success) {
      return NextResponse.json(
        { success: false, message: 'Bot verification failed.' },
        { status: 403 }
      );
    }

    // ৫. Nodemailer কনফিগারেশন ও ইমেইল প্রেরণ
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER, 
      to: process.env.GMAIL_USER,   
      replyTo: trimmedEmail, 
      subject: `[${inquiry_type || 'General'}] Inquiry from ${trimmedName}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2>New Website Contact Message</h2>
          <p><strong>Name:</strong> ${trimmedName}</p>
          <p><strong>Email:</strong> ${trimmedEmail}</p>
          <p><strong>Reason:</strong> ${inquiry_type || 'N/A'}</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;"/>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; background: #f9f9f9; padding: 15px; border-left: 4px solid #dc2626; border-radius: 4px;">${trimmedMessage}</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: 'Message sent successfully!' }, 
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error occurred.' }, 
      { status: 500 }
    );
  }
}

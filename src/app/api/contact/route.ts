import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, inquiry_type, message, token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Security token is missing.' }, 
        { status: 400 }
      );
    }

    // Cloudflare Turnstile ভেরিফিকেশন
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

    // Nodemailer কনফিগারেশন
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // ইমেইল টেমপ্লেট
    const mailOptions = {
      from: process.env.GMAIL_USER, 
      to: process.env.GMAIL_USER,   
      replyTo: email, 
      subject: `[${inquiry_type}] Inquiry from ${name}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2>New Website Contact Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Reason:</strong> ${inquiry_type}</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;"/>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; background: #f9f9f9; padding: 15px; border-left: 4px solid #dc2626; border-radius: 4px;">${message}</p>
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

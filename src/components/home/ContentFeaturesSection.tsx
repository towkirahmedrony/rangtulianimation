import { Bell, Clapperboard, Ghost, Skull } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import FeatureCard from "@/components/ui/FeatureCard";

export default function ContentFeaturesSection() {
  return (
    <section className="relative py-14 md:py-20">
      <Container>
        <SectionHeader
          title="আমাদের কন্টেন্ট"
          subtitle="রঙতুলি অ্যানিমেশনের গল্পগুলো কেন আলাদা।"
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            title="হরর কার্টুন"
            description="ভূত, রহস্য, ভীতি আর অজানা ঘটনা।"
            icon={<Ghost className="h-6 w-6" />}
          />

          <FeatureCard
            title="রহস্য ও থ্রিলার"
            description="সাসপেন্স ধরে রাখা গল্প।"
            icon={<Skull className="h-6 w-6" />}
          />

          <FeatureCard
            title="সিনেমাটিক সাউন্ড"
            description="ভয় বাড়ানোর মতো সাউন্ড ডিজাইন।"
            icon={<Clapperboard className="h-6 w-6" />}
          />

          <FeatureCard
            title="নতুন আপডেট"
            description="নতুন গল্প পেতে সাবস্ক্রাইব করুন।"
            icon={<Bell className="h-6 w-6" />}
          />
        </div>
      </Container>
    </section>
  );
}

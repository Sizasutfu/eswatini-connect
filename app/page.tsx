import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import FeaturedBusinesses from "@/components/FeaturedBusinesses";
import WhySection from "@/components/WhySection";
import StatsSection from "@/components/StatsSection";
import ListCTA from "@/components/ListCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedBusinesses />
      <WhySection />
      <StatsSection />
      <ListCTA />
    </>
  );
}
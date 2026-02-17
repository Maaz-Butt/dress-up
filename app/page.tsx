import { EditorialStory } from "@/components/EditorialStory";
import { FeaturedGrid } from "@/components/FeaturedGrid";
import { HeroEditorial } from "@/components/HeroEditorial";
import { TestimonialsSection } from "@/components/TestimonialsSection";

const page = () => {
  return (
    <>
      <HeroEditorial />
      <FeaturedGrid />
      <EditorialStory />
      <TestimonialsSection />
    </>
  );
};

export default page;

import dynamic from "next/dynamic";
import Hero from "@/components/Hero";

const TryOnSection = dynamic(() => import("@/components/TryOn/TryOnSection"));
const About = dynamic(() => import("@/components/About"));
const Catalogue = dynamic(() => import("@/components/Catalogue"));
const Contact = dynamic(() => import("@/components/Contact"));

export default function Home() {
  return (
    <>
      <Hero />
      <TryOnSection />
      <About />
      <Catalogue />
      <Contact />
    </>
  );
}

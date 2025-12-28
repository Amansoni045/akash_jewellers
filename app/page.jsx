import dynamic from "next/dynamic";
import Hero from "@/components/Hero";

const About = dynamic(() => import("@/components/About"));
const Catalogue = dynamic(() => import("@/components/Catalogue"));
const Contact = dynamic(() => import("@/components/Contact"));

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Catalogue />
      <Contact />
    </>
  );
}

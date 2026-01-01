import "./globals.css";
import Navbar from "@/components/Navbar.jsx";
import Footer from "@/components/Footer.jsx";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export const metadata = {
  title: "Akash Jewellers",
  description: "Discover exquisite 22K/24K gold jewellery, diamond rings, and traditional designs at Akash Jewellers, Pali. Trusted since 2002.",
  keywords: ["Akash Jewellers", "Gold Jewellery Pali", "Diamond Rings", "Jewellery Shop Korba", "Handcrafted Jewellery"],
  openGraph: {
    title: "Akash Jewellers",
    description: "Explore our exclusive collection of handcrafted gold and silver jewellery.",
    url: "https://akashjewellers.com",
    siteName: "Akash Jewellers",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

import { getLivePricesData } from "@/lib/data";

export default async function RootLayout({ children }) {
  const initialPrices = await getLivePricesData();

  return (
    <html lang="en" className="bg-white" suppressHydrationWarning>
      <body className="min-h-screen w-full overflow-x-hidden bg-white text-black">
        <Navbar initialPrices={JSON.parse(JSON.stringify(initialPrices))} />
        <main className="w-full min-h-screen bg-white text-black">
          {children}
        </main>
        <FloatingWhatsApp />
        <Footer />
      </body>
    </html>
  );
}

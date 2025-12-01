import "./globals.css";
import Navbar from "@/components/Navbar.jsx";
import Footer from "@/components/Footer.jsx";

export const metadata = {
  title: "Akash Jewellers",
  description: "Smart Jewellery Store Management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-white !bg-white">
      <body className="min-h-screen w-full overflow-x-hidden bg-white text-black !bg-white !text-black">
        <Navbar />
        <main className="w-full min-h-screen bg-white text-black !bg-white !text-black">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

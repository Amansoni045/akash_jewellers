import "./globals.css";
import Navbar from "@/components/Navbar.jsx";

export const metadata = {
  title: "Akash Jewellers",
  description: "Smart Jewellery Store Management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen w-full overflow-x-hidden bg-white">
        <Navbar />

        <main className="w-full min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}

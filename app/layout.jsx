import "./globals.css";
import Navbar from "@/components/Navbar.jsx";

export const metadata = {
  title: "Akash Jewellers",
  description: "Smart Jewellery Store Management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="p-6 max-w-3xl mx-auto">{children}</main>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import './globals.scss';
import { Providers } from './Providers';
import NavBar from "../components/Navbar"; // Import Navbar
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: 'IBM Intellisphere',
  description: 'Authentication system built with Next.js and IBM Carbon Design System',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning suppressContentEditableWarning>
        <Providers>
          <NavBar />  {/* Include Navbar in all pages */}
          <main>{children}</main>
          <Footer />
        </Providers>

      </body>
    </html>
  );
}

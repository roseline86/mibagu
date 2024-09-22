import Footer from "@/components/layout/Footer";
import LeftSidebar from "@/components/layout/LeftSidebar";
import Navbar from "@/components/layout/Navbar";
import { QueryProvider } from "@/provider/QueryProvider";
import Provider from "@/provider/SessionProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import { ThemeProvider } from "../provider/ThemeProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const siteurl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  metadataBase: new URL(`${siteurl}`),
  title: {
    default: "Mibagu",
    template: "%s - Mibagu",
  },
  description:
    "This platform is for Namibian entrepreneurs to mentor each other. It is also an information portal and a market place for farmers to sell their produce.",
  generator: "Next js",
  applicationName: "Mibagu",

  authors: [{ name: "mibagu", url: "https://www.mibagu.com" }],
  creator: "Roseline",
  openGraph: {
    title: "Mibagu",
    description:
      "This platform is for Namibian entrepreneurs to mentor each other. It is also an information portal and a market place for farmers to sell their produce.",
    url: "https://www.mibagu.com",
    siteName: "Mibagu",
    type: "website",
  },
  verification: {
    google: "PwVglBQypdyR9SYyiJqv_BzHqNML2H6bhyE2N0dLGqQ",
  },

  twitter: {
    card: "summary_large_image",
    title: "Mibagu",
    description:
      "This platform is for Namibian entrepreneurs to mentor each other. It is also an information portal and a market place for farmers to sell their produce.",
  },
};
interface RootLayoutProps {
  children: ReactNode;
  session: any;
}

export default function RootLayout({ children, session }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <Provider session={session}>
              <div>
                <div className="md:grid md:grid-cols-24 lg:flex">
                  <div className="hidden w-20 bg-primary-100 md:col-span-2 md:block">
                    <LeftSidebar />
                  </div>
                  <div className="md:col-span-22 md:w-full md:border-l">
                    <Navbar />
                    <div className="mt-16">{children}</div>
                  </div>
                </div>
                <Footer />
              </div>
            </Provider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

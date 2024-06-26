import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";
import { WindowDimensionContextProvider } from "@/hooks/useWindowDimension";
import PointerContextProvider from "@/components/PointerContextProvider/PointerContextProvider";

const inter = Inter({ subsets: ["latin"] });

const twk_lausanne = localFont({
  src: "../public/typography/TWKLausanne-250.woff2",
  display: "swap",
  variable: "--font-twk-lausanne",
  weight: "250",
});

const pt_mono = localFont({
  src: "../public/typography/PTMono-Regular.woff2",
  display: "swap",
  variable: "--font-pt-mono",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export const viewport: Viewport = {
  themeColor: "#000000",
  initialScale: 1,
  width: "device-width",
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
        ${twk_lausanne.className} 
        ${twk_lausanne.variable} 
        ${pt_mono.variable} 
        overflow-x-hidden
      `}
        style={{ textRendering: "geometricPrecision" }}
      >
        <WindowDimensionContextProvider>
          <PointerContextProvider>{children}</PointerContextProvider>
        </WindowDimensionContextProvider>
      </body>
    </html>
  );
}

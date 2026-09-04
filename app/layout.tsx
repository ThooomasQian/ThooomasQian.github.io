import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://guanyue-qian.fuzzy-chick-5933.chatgpt.site"),
  title: "Guanyue Qian — Wireless Intelligence & 3D Vision",
  description: "Research portfolio of Guanyue Qian at NYU WIRELESS, working across wireless propagation, machine learning, and 3D reconstruction.",
  alternates: { canonical: "/" },
  icons: {
    icon: "/media/guanyue-qian.jpg",
    apple: "/media/guanyue-qian.jpg",
  },
  openGraph: {
    title: "Guanyue Qian — Wireless Intelligence & 3D Vision",
    description: "Making the invisible world computable.",
    type: "website",
    images: [{ url: "/og.png", width: 1734, height: 909, alt: "Guanyue Qian research portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Guanyue Qian — Wireless Intelligence & 3D Vision",
    description: "Making the invisible world computable.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

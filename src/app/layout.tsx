import type { Metadata, Viewport } from "next";

import { AppShell } from "@/components/navigation/app-shell";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "AstraSetu",
    template: "%s | AstraSetu",
  },
  description:
    "India's Interactive Space Science and Mission Exploration Platform.",
  applicationName: "AstraSetu",
  manifest: "/manifest.webmanifest",
  metadataBase: new URL("https://astrasetu.local"),
};

export const viewport: Viewport = {
  themeColor: "#050714",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}

import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <NextUIProvider>
        <ClerkProvider>
          <body>{children}</body>
        </ClerkProvider>
      </NextUIProvider>
    </html>
  );
}

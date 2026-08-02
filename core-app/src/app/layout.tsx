import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "@/providers/ThemeProvider";

export const metadata: Metadata = {
  title: "Cyber Fortress - IT Solutions",
  description: "",
  icons: "",
};

// ⚡ Bolt: Removed unused font (Inter) import and instantiation.
// Previously, Next.js would fetch and process the unused Inter font at build time.
// Removing this dead code prevents unnecessary build-time work and reduces potential bundle size bloat.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // ⚡ Bolt: Added suppressHydrationWarning to the html tag.
    // next-themes updates the class/style attributes on the html tag client-side.
    // Without this prop, React throws a hydration mismatch error and may re-render the entire root tree, harming initial client-side performance.
    <html lang="en" suppressHydrationWarning>
      <body className={GeistSans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          themes={["light", "dark"]}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

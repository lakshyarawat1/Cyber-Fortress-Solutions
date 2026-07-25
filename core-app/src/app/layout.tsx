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
    // ⚡ Bolt: Added suppressHydrationWarning to the root HTML tag.
    // next-themes injects attributes on the html tag at runtime, which causes a hydration mismatch
    // when React attempts to hydrate the server-rendered HTML. Without this, React throws a warning
    // and is forced to perform a slower client-side re-render of the entire document tree.
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

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ClikLink Internet — Fibra Óptica em Araraquara, SP",
    template: "%s — ClikLink Internet",
  },
  description:
    "Conecte-se com a melhor internet fibra em Araraquara. Planos de 100 Mega a 1 Giga com suporte local humano.",
  keywords: ["internet fibra araraquara", "cliklink", "provedor araraquara", "fibra optica"],
  authors: [{ name: "ClikLink Internet" }],
  openGraph: {
    title: "ClikLink Internet — Fibra Óptica em Araraquara",
    description: "De 100 Mega a 1 Giga. Fibra óptica pura. Suporte local humano.",
    type: "website",
    locale: "pt_BR",
    url: "https://cliklink.com.br/araraquara",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="bg-dark text-white antialiased">
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}

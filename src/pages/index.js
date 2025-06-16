import Image from "next/image";
import Head from "next/head";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div>
      <Head>
        <title>Codeswear.com - wear the code</title>
        <meta name="descriptions" content="CodesWear.com - Wear the code" />
        <link rel="icon" href="/logo/codeswear_logo_circular/logo-png.png" />
      </Head>
      Hey this is codeswear
      <div className="mx-4 bg-amber-400">This is me</div>
    </div>
  );
}

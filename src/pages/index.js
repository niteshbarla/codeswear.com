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
    <div className="{styles.container">
      <Head>
        <title>Create Next App</title>
        <meta name="descriptions" content="CodesWear.com - Wear the code" />
        <link rel="icon" href="/logo/codeswear_logo_circular/logo-png.png" />
      </Head>
    </div>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Chat",
  description: "AI Chat application with PocketBase",
};

export default function RootLayout() {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased text-white`} >
        <Image
          src="/no.png"
          alt="😾"
          className="fixed inset-0 object-cover w-full h-screen -z-10  mb-8"
          width={300}
          height={300}
        />
        <div className="max-w-2xl w-full m-auto flex flex-col items-center justify-center h-screen text-center z-10">
          <Image
            src="/iknowwhatyouare.png"
            alt="Background Image"
            className="inset-0 object-cover z-10 rounded-4xl mb-8"
            width={300}
            height={300}
          />
          I know what you are
        </div>
        {/* <ChatLayout>
          {children}
        </ChatLayout> */}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Feedora | A Feedback App",
  description: " Unlock the full potential of your platform with insights and strategies designed to enhance user experience and boost conversions.",
};

export default function Dashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col min-h-screen w-full">
      <Navbar />
      {children}
      {/* <Footer/> */}
    </main>
  );
}
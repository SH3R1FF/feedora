// import Navbar from '@/components/Navbar';

// interface RootLayoutProps {
//   children: React.ReactNode;
// }

// export default async function RootLayout({ children }: RootLayoutProps) {
//   return (
//     <div className="flex flex-col min-h-screen">
//       <Navbar />
//       {children}
//     </div>
//   );
// }

import type { Metadata } from "next";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Dashboard |  Feedora",
  description: " Unlock the full potential of your platform with insights and strategies designed to enhance user experience and boost conversions.",
};

export default function Dashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Navbar />
      {children}
      {/* <Footer/> */}
    </main>
  );
}
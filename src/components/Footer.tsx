import { Instagram, Mail, MessageSquareCode, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-5 border-t border-white/15 bg-zinc-950">
      <div className="container">
        <div className="flex flex-col lg:flex-row lg:items-center gap-8">
          <div className="flex gap-2 items-center lg:flex-1 ">
            {/* <Logo className="h-6 w-6" /> */}
            <div className='flex flex-row justify-between items-center border border-white/15 bg-zinc-900 rounded-lg h-10 gap-2 p-2'>
                <MessageSquareCode />
                <h1 className='font-bold text-base'>
                    FEEDORA
                </h1>
            </div>
          </div>
          
            <nav className="flex flex-col lg:flex-row gap-5 lg:gap-7 lg:flex-1 lg:justify-center">
              <a href="#" className="text-white/70 hover:text-white text-xs md:text-sm transition">Features</a>
              <a href="#" className="text-white/70 hover:text-white text-xs md:text-sm transition">Developers</a>
              <a href="#" className="text-white/70 hover:text-white text-xs md:text-sm transition">Company</a>
              <a href="#" className="text-white/70 hover:text-white text-xs md:text-sm transition">Blog</a>
              <a href="#" className="text-white/70 hover:text-white text-xs md:text-sm transition">Changelog</a>
            </nav>
          
          <div className="flex gap-5 lg:flex-1 lg:justify-end ">
            <Twitter className="text-white/40 hover:text-white transition"/>
            <Instagram className="text-white/40 hover:text-white transition"/>
            <Mail  className="text-white/40 hover:text-white transition"/>
          </div>
        </div>
      </div>
    </footer>
  );
};
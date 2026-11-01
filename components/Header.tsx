import { BookOpen, Headphones, Search, Menu, UserRound } from "lucide-react";
export default function Header() {
  return (
    <header className="site-header">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <a href="/" className="flex items-center gap-3">
          <span className="brand-mark"><BookOpen size={23}/></span>
          <span className="leading-tight"><strong className="block text-lg tracking-tight">HAUSA NOVELS HUB</strong><small className="text-[10px] tracking-[.23em] text-gold">READ · LISTEN · DISCOVER</small></span>
        </a>
        <nav className="hidden items-center gap-8 text-sm text-stone-300 md:flex">
          <a href="#library" className="nav-link">Explore</a>
          <a href="#audio" className="nav-link">Audiobooks</a>
          <a href="#languages" className="nav-link">Languages</a>
          <a href="#premium" className="nav-link">Premium</a>
        </nav>
        <div className="flex items-center gap-2">
          <a href="#library" className="icon-button" aria-label="Search"><Search size={18}/></a>
          <a href="#account" className="login-button"><UserRound size={16}/> <span>Sign in</span></a>
          <button className="icon-button md:hidden" aria-label="Open menu"><Menu size={19}/></button>
        </div>
      </div>
    </header>
  );
}

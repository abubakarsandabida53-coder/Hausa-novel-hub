"use client";

import { useMemo, useState } from "react";
import { ArrowRight, BookOpen, Headphones, Globe2, Search, Sparkles, Play, ShieldCheck, Menu } from "lucide-react";
import Header from "@/components/Header";
import BookCard from "@/components/BookCard";

const books = [
  { id: 1, title: "Zuciyar Mai Kauna", author: "Aisha Musa", language: "Hausa", category: "Soyayya", cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=700&q=85", audio: true },
  { id: 2, title: "The Last Promise", author: "Daniel Okoro", language: "English", category: "Drama", cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=700&q=85", audio: true, premium: true },
  { id: 3, title: "رحلة القلب", author: "ليلى أحمد", language: "Arabic", category: "Romance", cover: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=700&q=85", audio: true },
  { id: 4, title: "Ìfẹ́ àti Ìrètí", author: "Tomi Adeyemi", language: "Yoruba", category: "Ìtàn", cover: "https://images.unsplash.com/photo-1513001900722-370f803f498d?w=700&q=85" },
  { id: 5, title: "Ụzọ Ndụ", author: "Chika Nwosu", language: "Igbo", category: "Life", cover: "https://images.unsplash.com/photo-1516979187457-637abe4f9353?w=700&q=85", audio: true },
  { id: 6, title: "Le Secret du Fleuve", author: "Amélie Diallo", language: "French", category: "Mystère", cover: "https://images.unsplash.com/photo-151 чит?w=700&q=85".replace("151 чит","1519682337058-a94d519337bc") }
];
const languages = ["All languages", "Hausa", "English", "Arabic", "Yoruba", "Igbo", "French"];

export default function Home() {
  const [language, setLanguage] = useState("All languages");
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => books.filter(b =>
    (language === "All languages" || b.language === language) &&
    `${b.title} ${b.author} ${b.category}`.toLowerCase().includes(query.toLowerCase())
  ), [language, query]);

  return (
    <main>
      <Header />
      <section className="hero-section">
        <div className="hero-glow" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-28">
          <div className="relative z-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-xs font-medium text-gold"><Sparkles size={14}/> A world of stories, in your language</div>
            <h1 className="max-w-3xl text-5xl font-semibold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">Stories that <span className="gold-text">bring us</span> together.</h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-stone-300 sm:text-lg">Read inspiring novels and listen to captivating audiobooks in Hausa, English, Arabic, Yoruba, Igbo, French and more.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#library" className="primary-button">Explore library <ArrowRight size={17}/></a>
              <a href="#audio" className="secondary-button"><Headphones size={17}/> Discover audiobooks</a>
            </div>
            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 text-sm text-stone-400">
              <span className="flex items-center gap-2"><BookOpen size={16} className="text-gold"/> Read at your pace</span>
              <span className="flex items-center gap-2"><Headphones size={16} className="text-gold"/> Listen anywhere</span>
              <span className="flex items-center gap-2"><Globe2 size={16} className="text-gold"/> Many languages</span>
            </div>
          </div>
          <div className="hero-art relative mx-auto w-full max-w-xl">
            <div className="art-orbit orbit-one"/><div className="art-orbit orbit-two"/>
            <div className="floating-book book-back"><div className="book-art-pattern">✦</div><span>THE ART OF STORIES</span></div>
            <div className="floating-book book-front"><div className="book-sun">✺</div><span>LABARUN<br/>RAYUWA</span><small>A COLLECTION OF STORIES</small></div>
            <div className="audio-float"><span className="play-circle"><Play size={15} fill="currentColor"/></span><span><b>Listen to a story</b><small className="block text-stone-400">Your next journey awaits</small></span><span className="waveform">▂ ▅ ▃ ▇ ▄ ▆ ▂</span></div>
          </div>
        </div>
      </section>

      <section id="languages" className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="section-heading"><div><span className="eyebrow">EXPLORE BY LANGUAGE</span><h2>Stories in your language.</h2></div><Globe2 className="text-gold" size={27}/></div>
        <div className="mt-7 flex flex-wrap gap-3">
          {languages.slice(1).map((lang, i) => <button key={lang} onClick={() => {setLanguage(lang); document.getElementById("library")?.scrollIntoView({behavior:"smooth"});}} className={`language-pill ${language===lang?"selected":""}`}><span>{["◈","A","ع","Ọ","Ụ","é"][i]}</span>{lang}<ArrowRight size={13}/></button>)}
        </div>
      </section>

      <section id="library" className="bg-paper py-16 text-ink">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="section-heading">
            <div><span className="eyebrow">THE DIGITAL LIBRARY</span><h2>Find your next favourite.</h2><p className="mt-2 text-sm text-stone-500">Explore stories from different voices and cultures.</p></div>
            <span className="hidden text-sm text-stone-500 sm:block">{filtered.length} sample titles</span>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <div className="search-box"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search titles, authors or categories..."/></div>
            <select className="filter-select" value={language} onChange={e=>setLanguage(e.target.value)} aria-label="Filter by language">{languages.map(l=><option key={l}>{l}</option>)}</select>
          </div>
          <div className="mt-9 grid grid-cols-2 gap-x-5 gap-y-9 sm:grid-cols-3 lg:grid-cols-6">
            {filtered.map(book=><BookCard key={book.id} book={book}/>)}
          </div>
          {filtered.length===0 && <p className="py-16 text-center text-stone-500">No sample titles match your search. Try another word or language.</p>}
          <p className="mt-8 text-xs text-stone-500">Preview content only. Real novels and audio will be added through the connected author and admin publishing system.</p>
        </div>
      </section>

      <section id="audio" className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 lg:grid-cols-2 lg:px-8">
        <div><span className="eyebrow">MORE THAN READING</span><h2 className="mt-3 text-4xl font-semibold text-white">Let the stories <span className="gold-text">speak.</span></h2><p className="mt-5 max-w-lg leading-8 text-stone-400">A dedicated audiobook experience with chapter controls, playback speed, listening progress and background playback planned for the full platform.</p><a href="#library" className="primary-button mt-8 inline-flex">Explore audio titles <ArrowRight size={17}/></a></div>
        <div className="audio-panel"><div className="audio-cover"><Headphones size={54}/></div><div className="flex-1"><span className="eyebrow">AUDIOBOOK EXPERIENCE</span><h3 className="mt-2 text-xl font-semibold">Your story. Your moment.</h3><p className="mt-2 text-sm text-stone-400">Listen in the language you love.</p><div className="mt-6 h-1.5 rounded-full bg-white/10"><div className="h-1.5 w-2/5 rounded-full bg-gold"/></div><div className="mt-2 flex justify-between text-xs text-stone-500"><span>Preview concept</span><span>—:—</span></div></div></div>
      </section>

      <section id="premium" className="px-5 pb-20">
        <div className="premium-panel mx-auto max-w-7xl px-7 py-12 text-center sm:px-12">
          <span className="eyebrow">THE PREMIUM EXPERIENCE</span><h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">A world of stories, without limits.</h2><p className="mx-auto mt-4 max-w-2xl leading-7 text-stone-300">Discover exclusive books, enjoy an ad-free experience and access offline reading and listening where publishers permit.</p><a href="#account" className="primary-button mt-7 inline-flex">Discover Premium <ArrowRight size={17}/></a>
        </div>
      </section>

      <footer id="account" className="border-t border-white/10 bg-[#0b1220]">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 text-sm text-stone-400 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div><b className="tracking-wide text-white">HAUSA NOVELS HUB</b><p className="mt-1 text-xs">Read. Listen. Discover.</p></div>
          <div className="flex flex-wrap gap-5"><a href="#library">Explore</a><a href="#audio">Audiobooks</a><a href="#premium">Premium</a><a href="mailto:support@example.com">Support</a></div>
          <p className="text-xs">© 2026 Hausa Novels Hub. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}

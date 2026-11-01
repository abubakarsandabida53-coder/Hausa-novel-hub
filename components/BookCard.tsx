type Book = {
  id: number; title: string; author: string; language: string;
  category: string; cover: string; audio?: boolean; premium?: boolean;
};
export default function BookCard({ book }: { book: Book }) {
  return (
    <article className="book-card group">
      <div className="cover-wrap">
        <img src={book.cover} alt={`Cover artwork for ${book.title}`} className="book-cover" />
        {book.premium && <span className="premium-tag">PREMIUM</span>}
        {book.audio && <span className="audio-tag">♫ AUDIO</span>}
      </div>
      <div className="pt-3">
        <div className="flex items-center justify-between gap-2">
          <span className="eyebrow">{book.language}</span>
          <span className="text-xs text-stone-500">{book.category}</span>
        </div>
        <h3 className="mt-1 line-clamp-1 font-semibold text-ink">{book.title}</h3>
        <p className="mt-1 text-sm text-stone-500">{book.author}</p>
      </div>
    </article>
  );
}

import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm border-b border-lilac-200 sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap justify-between items-center">
        <Link href="/" className="text-xl font-bold text-lilac-700 flex items-center gap-2">
          🍎 SCOPE <span className="text-xs font-normal bg-lilac-100 text-lilac-700 px-2 py-0.5 rounded-full">Cardápio Escolar</span>
        </Link>
        
        <div className="flex items-center gap-2 md:gap-4 text-sm font-medium text-lilac-800">
          <Link href="/" className="hover:text-lilac-600 transition py-1 px-2 rounded-lg hover:bg-lilac-50">Início</Link>
          <Link href="/cardapio" className="hover:text-lilac-600 transition py-1 px-2 rounded-lg hover:bg-lilac-50">Cardápio</Link>
          <Link href="/favoritos" className="hover:text-lilac-600 transition py-1 px-2 rounded-lg hover:bg-lilac-50">Favoritos</Link>
          <Link href="/gerenciamento" className="hover:text-lilac-600 transition py-1 px-2 rounded-lg hover:bg-lilac-50">Gerenciar</Link>
          <Link href="/equipe" className="hover:text-lilac-600 transition py-1 px-2 rounded-lg hover:bg-lilac-50">Nossa Equipe</Link>
          
          <Link href="/login" className="bg-lilac-600 text-white px-4 py-1.5 rounded-xl hover:bg-lilac-700 shadow-sm transition">
            Entrar
          </Link>
        </div>
      </nav>
    </header>
  );
}
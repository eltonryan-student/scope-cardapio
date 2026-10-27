import Link from 'next/link';

export default function Home() {
  // Os cinco princípios do conceito SCOPE
  const principios = [
    { letra: 'S', titulo: 'Saudável', desc: 'Oferece alimentos nutritivos e variados para os estudantes.' },
    { letra: 'C', titulo: 'Completo', desc: 'Busca incluir diferentes grupos alimentares essenciais.' },
    { letra: 'O', titulo: 'Organizado', desc: 'Mantém as refeições planeadas e estruturadas por dia.' },
    { letra: 'P', titulo: 'Prático', desc: 'Utiliza alimentos fáceis de preparar e distribuir na escola.' },
    { letra: 'E', titulo: 'Económico', desc: 'Prioriza ingredientes acessíveis e da estação.' },
  ];

  return (
    <div className="space-y-12">
      {/* Seção Principal / Apresentação */}
      <section className="text-center py-12 bg-white rounded-3xl shadow-sm border border-lilac-200 px-6">
        <div className="inline-block p-4 bg-lilac-100 text-lilac-700 rounded-2xl mb-6 shadow-sm">
          <span className="text-4xl">🍎</span>
        </div>
        <h1 className="text-4xl font-extrabold text-lilac-900 mb-4">
          SCOPE — Cardápio Escolar
        </h1>
        <p className="text-lg text-lilac-700 max-w-2xl mx-auto mb-8 leading-relaxed">
          &quot;Uma alimentação equilibrada contribui para a saúde, o bem-estar e a aprendizagem dos estudantes.&quot;
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/cardapio"
            className="px-6 py-3 bg-lilac-600 text-white font-medium rounded-xl hover:bg-lilac-700 shadow-sm transition"
          >
            Ver Cardápio Semanal
          </Link>
          <Link
            href="/favoritos"
            className="px-6 py-3 bg-lilac-200 text-lilac-800 font-medium rounded-xl hover:bg-lilac-300 transition"
          >
            Minhas Refeições Favoritas
          </Link>
        </div>
      </section>

      {/* Os Cinco Princípios do SCOPE */}
      <section>
        <h2 className="text-2xl font-bold text-lilac-900 text-center mb-6">
          Os Cinco Princípios do SCOPE
        </h2>
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
          {principios.map((p) => (
            <div
              key={p.letra}
              className="bg-white p-6 rounded-2xl shadow-sm border border-lilac-200 text-center flex flex-col items-center justify-between hover:shadow-md transition"
            >
              <div className="w-12 h-12 bg-lilac-100 text-lilac-700 rounded-full flex items-center justify-center font-bold text-xl mb-4">
                {p.letra}
              </div>
              <div>
                <h3 className="font-bold text-lilac-900 mb-1">{p.titulo}</h3>
                <p className="text-xs text-lilac-600 leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Atalhos Rápidos */}
      <section className="bg-lilac-100/50 border border-lilac-200 rounded-3xl p-8 text-center">
        <h2 className="text-2xl font-bold text-lilac-900 mb-3">Explore a Plataforma</h2>
        <p className="text-sm text-lilac-700 max-w-xl mx-auto mb-6">
          Consulte as refeições de segunda a sexta-feira, personalize o cardápio e conheça a equipa responsável pelo projeto.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/cardapio"
            className="px-4 py-2 bg-white text-lilac-700 font-medium rounded-xl border border-lilac-200 hover:bg-lilac-50 transition text-sm"
          >
            Cardápio Semanal
          </Link>
          <Link
            href="/gerenciamento"
            className="px-4 py-2 bg-white text-lilac-700 font-medium rounded-xl border border-lilac-200 hover:bg-lilac-50 transition text-sm"
          >
            Área de Gestão (CRUD)
          </Link>
          <Link
            href="/equipe"
            className="px-4 py-2 bg-white text-lilac-700 font-medium rounded-xl border border-lilac-200 hover:bg-lilac-50 transition text-sm"
          >
            Nossa Equipa
          </Link>
        </div>
      </section>
    </div>
  );
}
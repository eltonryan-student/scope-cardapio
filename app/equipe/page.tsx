export default function EquipePage() {
  const integrantes = [
    {
      nome: 'Gisely Freitas',
      cargo: 'Desenvolvedora Principal & Full-Stack',
      bio: 'Responsável pela arquitetura do sistema, integração com LocalStorage e desenvolvimento geral do SCOPE.',
      imagem: '/gisely.jpg',
    },
    {
      nome: 'Allana Dias',
      cargo: 'Design UI/UX & Acessibilidade',
      bio: 'Focada na identidade visual em tons de lilás, modo escuro e experiência do utilizador na plataforma.',
      imagem: '/allana.jpg',
    },
    {
      nome: 'Maria Crisllany',
      cargo: 'Gestão de Conteúdo, Testes & CRUD',
      bio: 'Responsável pela validação do cardápio escolar, testes de usabilidade e fluxos administrativos.',
      imagem: '/crisllany.jpg',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Cabeçalho */}
      <div className="text-center bg-white p-8 rounded-3xl shadow-sm border border-lilac-200">
        <h1 className="text-3xl font-extrabold text-lilac-900 mb-2">Nossa Equipe</h1>
        <p className="text-lilac-700 max-w-xl mx-auto text-sm">
          Conheça as criadoras e desenvolvedoras responsáveis pelo projeto SCOPE.
        </p>
      </div>

      {/* Cartões dos Integrantes (Grid de 3 colunas) */}
      <div className="grid gap-6 md:grid-cols-3">
        {integrantes.map((membro, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-3xl shadow-sm border border-lilac-200 text-center flex flex-col items-center justify-between hover:shadow-md transition"
          >
            <div>
              {/* Moldura Circular para a Imagem */}
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-2 border-lilac-300 shadow-sm bg-lilac-100 flex items-center justify-center relative">
                <img
                  src={membro.imagem}
                  alt={membro.nome}
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="font-bold text-lilac-900 text-lg mb-1">{membro.nome}</h3>
              <span className="inline-block text-xs font-semibold bg-lilac-50 text-lilac-700 px-2.5 py-1 rounded-lg mb-3 border border-lilac-200">
                {membro.cargo}
              </span>
              <p className="text-xs text-lilac-600 leading-relaxed">{membro.bio}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Rodapé Informativo do Projeto */}
      <div className="bg-lilac-100/50 border border-lilac-200 rounded-3xl p-6 text-center">
        <h3 className="font-bold text-lilac-900 mb-1">Sobre o Projeto SCOPE</h3>
        <p className="text-xs text-lilac-700 max-w-2xl mx-auto leading-relaxed">
          Desenvolvido com Next.js, TypeScript e Tailwind CSS para promover uma alimentação escolar saudável, prática e acessível.
        </p>
      </div>
    </div>
  );
}
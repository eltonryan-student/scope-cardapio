'use client';

import { useState, useEffect } from 'react';
import { Refeicao } from '../../types/Refeicao';
import dadosIniciais from '../../data/cardapio.json';

export default function FavoritosPage() {
  const [refeicoes, setRefeicoes] = useState<Refeicao[]>([]);
  const [favoritos, setFavoritos] = useState<string[]>([]);

  useEffect(() => {
    // Carregar refeições do localStorage ou do JSON inicial
    const salvas = localStorage.getItem('scope_refeicoes');
    setRefeicoes(salvas ? JSON.parse(salvas) : (dadosIniciais as Refeicao[]));

    // Carregar IDs favoritos do localStorage
    const favsSalvos = localStorage.getItem('scope_favoritos');
    if (favsSalvos) {
      setFavoritos(JSON.parse(favsSalvos));
    }
  }, []);

  const removerFavorito = (id: string) => {
    const novosFavs = favoritos.filter((favId) => favId !== id);
    setFavoritos(novosFavs);
    localStorage.setItem('scope_favoritos', JSON.stringify(novosFavs));
  };

  // Filtrar apenas as refeições que estão na lista de favoritos
  const refeicoesFavoritas = refeicoes.filter((r) => favoritos.includes(r.id));

  return (
    <div className="space-y-8">
      {/* Cabeçalho da Página */}
      <div className="text-center bg-white p-8 rounded-3xl shadow-sm border border-lilac-200">
        <h1 className="text-3xl font-extrabold text-lilac-900 mb-2">Refeições Favoritas</h1>
        <p className="text-lilac-700 max-w-xl mx-auto text-sm">
          Consulte aqui as refeições que marcou como favoritas para um acesso rápido e prático.
        </p>
      </div>

      {/* Listagem de Favoritos */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {refeicoesFavoritas.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-white rounded-3xl border border-lilac-200 shadow-sm">
            <span className="text-4xl mb-3 block">🤍</span>
            <h3 className="text-lg font-bold text-lilac-900 mb-1">Ainda não tem favoritos</h3>
            <p className="text-xs text-lilac-600 max-w-sm mx-auto">
              Vá à página do cardápio e clique no ícone de coração nas refeições que deseja guardar.
            </p>
          </div>
        ) : (
          refeicoesFavoritas.map((ref) => (
            <div
              key={ref.id}
              className="bg-white p-6 rounded-2xl shadow-sm border border-lilac-200 flex flex-col justify-between hover:shadow-md transition relative"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-bold bg-lilac-100 text-lilac-700 px-2.5 py-1 rounded-lg">
                    {ref.dia}
                  </span>
                  <button
                    onClick={() => removerFavorito(ref.id)}
                    className="p-2 rounded-xl bg-pink-100 text-pink-600 hover:bg-pink-200 transition"
                    title="Remover dos favoritos"
                  >
                    ❤️
                  </button>
                </div>
                <span className="text-xs font-semibold text-lilac-600 block mb-1">{ref.tipo}</span>
                <p className="text-sm text-lilac-900 leading-relaxed">{ref.descricao}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

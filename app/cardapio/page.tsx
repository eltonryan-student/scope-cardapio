'use client';

import { useState, useEffect } from 'react';
import { Refeicao } from '../../types/Refeicao';
import dadosIniciais from '../../data/cardapio.json';

export default function CardapioPage() {
  const [refeicoes, setRefeicoes] = useState<Refeicao[]>([]);
  const [filtroTipo, setFiltroTipo] = useState<string>('todos');
  const [diaSelecionado, setDiaSelecionado] = useState<string>('todos');
  const [favoritos, setFavoritos] = useState<string[]>([]);

  useEffect(() => {
    // Carrega do LocalStorage ou usa o JSON inicial
    const salvas = localStorage.getItem('scope_refeicoes');
    if (salvas) {
      setRefeicoes(JSON.parse(salvas));
    } else {
      setRefeicoes(dadosIniciais as Refeicao[]);
      localStorage.setItem('scope_refeicoes', JSON.stringify(dadosIniciais));
    }

    // Carrega favoritos salvos
    const favsSalvos = localStorage.getItem('scope_favoritos');
    if (favsSalvos) {
      setFavoritos(JSON.parse(favsSalvos));
    }
  }, []);

  const alternarFavorito = (id: string) => {
    let novosFavs: string[];
    if (favoritos.includes(id)) {
      novosFavs = favoritos.filter((favId) => favId !== id);
    } else {
      novosFavs = [...favoritos, id];
    }
    setFavoritos(novosFavs);
    localStorage.setItem('scope_favoritos', JSON.stringify(novosFavs));
  };

  const diasDaSemana = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira'];

  // Filtragem das refeições
  const refeicoesFiltradas = refeicoes.filter((ref) => {
    const matchTipo = filtroTipo === 'todos' || ref.tipo === filtroTipo;
    const matchDia = diaSelecionado === 'todos' || ref.dia === diaSelecionado;
    return matchTipo && matchDia;
  });

  return (
    <div className="space-y-8">
      <div className="text-center bg-white p-8 rounded-3xl shadow-sm border border-lilac-200">
        <h1 className="text-3xl font-extrabold text-lilac-900 mb-2">SCOPE — Cardápio Escolar</h1>
        <p className="text-lilac-700 max-w-xl mx-auto text-sm">
          Consulte as refeições planejadas para a semana. Uma alimentação equilibrada contribui para a saúde, o bem-estar e a aprendizagem.
        </p>
      </div>

      {/* Filtros e Seleção de Dias */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-lilac-200 flex flex-col md:flex-row justify-between gap-4 items-center">
        {/* Filtro por Tipo */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <span className="text-xs font-semibold text-lilac-800 self-center mr-2">Tipo:</span>
          {['todos', 'Café da manhã', 'Almoço', 'Lanche da tarde'].map((tipo) => (
            <button
              key={tipo}
              onClick={() => setFiltroTipo(tipo)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition ${
                filtroTipo === tipo
                  ? 'bg-lilac-600 text-white shadow-sm'
                  : 'bg-lilac-50 text-lilac-700 hover:bg-lilac-100 border border-lilac-200'
              }`}
            >
              {tipo === 'todos' ? 'Todas' : tipo}
            </button>
          ))}
        </div>

        {/* Filtro por Dia da Semana */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto justify-end">
          <span className="text-xs font-semibold text-lilac-800 self-center mr-2">Dia:</span>
          <button
            onClick={() => setDiaSelecionado('todos')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition ${
              diaSelecionado === 'todos'
                ? 'bg-lilac-700 text-white shadow-sm'
                : 'bg-lilac-50 text-lilac-700 hover:bg-lilac-100 border border-lilac-200'
            }`}
          >
            Toda a Semana
          </button>
          {diasDaSemana.map((dia) => (
            <button
              key={dia}
              onClick={() => setDiaSelecionado(dia)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition ${
                diaSelecionado === dia
                  ? 'bg-lilac-700 text-white shadow-sm'
                  : 'bg-lilac-50 text-lilac-700 hover:bg-lilac-100 border border-lilac-200'
              }`}
            >
              {dia.split('-')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Listagem em Cartões */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {refeicoesFiltradas.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-lilac-200">
            <p className="text-lilac-600 text-sm">Nenhuma refeição encontrada com os filtros selecionados.</p>
          </div>
        ) : (
          refeicoesFiltradas.map((ref) => {
            const isFavorito = favoritos.includes(ref.id);
            return (
              <div
                key={ref.id}
                className="bg-white p-6 rounded-2xl shadow-sm border border-lilac-200 flex flex-col justify-between hover:shadow-md transition relative group"
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-bold bg-lilac-100 text-lilac-700 px-2.5 py-1 rounded-lg">
                      {ref.dia}
                    </span>
                    <button
                      onClick={() => alternarFavorito(ref.id)}
                      className={`p-2 rounded-xl transition ${
                        isFavorito
                          ? 'bg-pink-100 text-pink-600'
                          : 'bg-lilac-50 text-lilac-400 hover:text-pink-500'
                      }`}
                      title={isFavorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                    >
                      {isFavorito ? '❤️' : '🤍'}
                    </button>
                  </div>
                  <h3 className="font-bold text-lilac-900 text-base mb-1">{ref.tipo}</h3>
                  <p className="text-sm text-lilac-700 leading-relaxed">{ref.descricao}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
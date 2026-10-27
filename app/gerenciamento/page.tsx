'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Refeicao } from '../../types/Refeicao';
import dadosIniciais from '../../data/cardapio.json';

export default function GerenciamentoPage() {
  const [refeicoes, setRefeicoes] = useState<Refeicao[]>([]);
  const [form, setForm] = useState<{ id: string | null; dia: Refeicao['dia']; tipo: Refeicao['tipo']; descricao: string }>({
    id: null,
    dia: 'Segunda-feira',
    tipo: 'Café da manhã',
    descricao: '',
  });
  const [mensagem, setMensagem] = useState({ texto: '', tipo: '' });
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('scope_logado') !== 'true') {
      router.push('/login');
      return;
    }
    const salvas = localStorage.getItem('scope_refeicoes');
    setRefeicoes(salvas ? JSON.parse(salvas) : (dadosIniciais as Refeicao[]));
  }, [router]);

  const salvar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.descricao.trim()) {
      setMensagem({ texto: 'A descrição dos alimentos é obrigatória.', tipo: 'erro' });
      return;
    }

    const novas = form.id
      ? refeicoes.map((r) => (r.id === form.id ? { ...r, dia: form.dia, tipo: form.tipo, descricao: form.descricao } : r))
      : [...refeicoes, { id: Date.now().toString(), dia: form.dia, tipo: form.tipo, descricao: form.descricao, categoria: form.tipo }];

    setRefeicoes(novas);
    localStorage.setItem('scope_refeicoes', JSON.stringify(novas));
    setMensagem({ texto: form.id ? 'Refeição atualizada com sucesso!' : 'Refeição cadastrada com sucesso!', tipo: 'sucesso' });
    setForm({ id: null, dia: 'Segunda-feira', tipo: 'Café da manhã', descricao: '' });
  };

  const excluir = (id: string) => {
    if (confirm('Tem certeza de que deseja excluir esta refeição?')) {
      const novas = refeicoes.filter((r) => r.id !== id);
      setRefeicoes(novas);
      localStorage.setItem('scope_refeicoes', JSON.stringify(novas));

      const favs = JSON.parse(localStorage.getItem('scope_favoritos') || '[]');
      localStorage.setItem('scope_favoritos', JSON.stringify(favs.filter((fId: string) => fId !== id)));
    }
  };

  return (
    <div className="space-y-8">
      {/* Cabeçalho */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-lilac-200 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-lilac-900">Área Administrativa (CRUD)</h1>
          <p className="text-lilac-700 text-sm">Gerencie o cardápio escolar.</p>
        </div>
        <button
          onClick={() => { localStorage.removeItem('scope_logado'); router.push('/'); }}
          className="px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 text-sm font-medium border border-red-200"
        >
          Sair
        </button>
      </div>

      {/* Formulário */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-lilac-200">
        <h2 className="text-xl font-bold text-lilac-900 mb-4">{form.id ? 'Editar Refeição' : 'Cadastrar Nova Refeição'}</h2>
        <form onSubmit={salvar} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <select
              value={form.dia}
              onChange={(e) => setForm({ ...form, dia: e.target.value as Refeicao['dia'] })}
              className="w-full px-3 py-2.5 border border-lilac-300 rounded-xl bg-lilac-50/30 text-sm"
            >
              {['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira'].map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <select
              value={form.tipo}
              onChange={(e) => setForm({ ...form, tipo: e.target.value as Refeicao['tipo'] })}
              className="w-full px-3 py-2.5 border border-lilac-300 rounded-xl bg-lilac-50/30 text-sm"
            >
              <option value="Café da manhã">Café da manhã</option>
              <option value="Almoço">Almoço</option>
              <option value="Lanche da tarde">Lanche da tarde</option>
            </select>
          </div>
          <textarea
            value={form.descricao}
            onChange={(e) => setForm({ ...form, descricao: e.target.value })}
            required
            rows={3}
            placeholder="Descrição dos alimentos..."
            className="w-full px-3 py-2.5 border border-lilac-300 rounded-xl bg-lilac-50/30 text-sm"
          />
          {mensagem.texto && (
            <div className={`p-3 text-xs rounded-xl border ${mensagem.tipo === 'erro' ? 'bg-red-50 text-red-600 border-red-200' : 'bg-green-50 text-green-700 border-green-200'}`}>
              {mensagem.texto}
            </div>
          )}
          <div className="flex gap-2">
            <button type="submit" className="px-6 py-2.5 bg-lilac-600 text-white rounded-xl hover:bg-lilac-700 text-sm font-medium">
              {form.id ? 'Salvar Alterações' : 'Cadastrar Refeição'}
            </button>
            {form.id && (
              <button
                type="button"
                onClick={() => setForm({ id: null, dia: 'Segunda-feira', tipo: 'Café da manhã', descricao: '' })}
                className="px-6 py-2.5 bg-lilac-100 text-lilac-700 rounded-xl text-sm font-medium"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Tabela de Listagem */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-lilac-200">
        <h2 className="text-xl font-bold text-lilac-900 mb-4">Refeições Cadastradas ({refeicoes.length})</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-lilac-200 text-xs font-semibold text-lilac-800 bg-lilac-50/50">
                <th className="p-3">Dia</th>
                <th className="p-3">Tipo</th>
                <th className="p-3">Descrição</th>
                <th className="p-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-lilac-100">
              {refeicoes.map((ref) => (
                <tr key={ref.id} className="hover:bg-lilac-50/30">
                  <td className="p-3 font-medium text-lilac-900">{ref.dia}</td>
                  <td className="p-3 text-lilac-700">{ref.tipo}</td>
                  <td className="p-3 text-lilac-600">{ref.descricao}</td>
                  <td className="p-3 text-right space-x-2">
                    <button
                      onClick={() => setForm({ id: ref.id, dia: ref.dia, tipo: ref.tipo, descricao: ref.descricao })}
                      className="px-3 py-1 bg-lilac-100 text-lilac-700 rounded-lg text-xs font-medium"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => excluir(ref.id)}
                      className="px-3 py-1 bg-red-50 text-red-600 rounded-lg text-xs font-medium"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
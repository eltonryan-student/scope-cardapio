'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setSucesso('');

    // Validação do formato do e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErro('Por favor, introduza um endereço de e-mail válido.');
      return;
    }

    // Credenciais de demonstração
    if (email === 'admin@scope.com' && senha === '123456') {
      setSucesso('Login demonstrativo aceite com sucesso! A redirecionar...');
      
      localStorage.setItem('scope_logado', 'true');

      setTimeout(() => {
        router.push('/gerenciamento');
      }, 1200);
    } else {
      setErro('E-mail ou palavra-passe incorretos. Utilize as credenciais de teste abaixo.');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-sm border border-lilac-200 my-8">
      <div className="text-center mb-6">
        <div className="inline-block p-3 bg-lilac-100 text-lilac-700 rounded-2xl mb-3">
          🔒
        </div>
        <h1 className="text-2xl font-bold text-lilac-900">Área Administrativa</h1>
        <p className="text-xs text-lilac-600 mt-1">
          Faça login para gerenciar e atualizar o cardápio escolar.
        </p>
      </div>

      {/* Credenciais de Teste */}
      <div className="mb-6 p-4 bg-lilac-50 rounded-2xl border border-lilac-200 text-xs text-lilac-800">
        <p className="font-semibold mb-1 text-lilac-900">Credenciais de Demonstração:</p>
        <p>E-mail: <code className="bg-white px-1.5 py-0.5 rounded font-mono text-lilac-700 border border-lilac-200">admin@scope.com</code></p>
        <p className="mt-1">Palavra-passe: <code className="bg-white px-1.5 py-0.5 rounded font-mono text-lilac-700 border border-lilac-200">123456</code></p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-lilac-800 mb-1">E-mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="seu@email.com"
            className="w-full px-4 py-2.5 border border-lilac-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-lilac-500 bg-lilac-50/30 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-lilac-800 mb-1">Palavra-passe</label>
          <div className="relative">
            <input
              type={mostrarSenha ? 'text' : 'password'}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              placeholder="••••••"
              className="w-full px-4 py-2.5 border border-lilac-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-lilac-500 bg-lilac-50/30 text-sm pr-16"
            />
            <button
              type="button"
              onClick={() => setMostrarSenha(!mostrarSenha)}
              className="absolute right-3 top-3 text-xs text-lilac-600 font-medium hover:text-lilac-800"
            >
              {mostrarSenha ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>
        </div>

        {erro && (
          <div className="p-3 bg-red-50 text-red-600 text-xs rounded-xl border border-red-200">
            {erro}
          </div>
        )}

        {sucesso && (
          <div className="p-3 bg-green-50 text-green-700 text-xs rounded-xl border border-green-200">
            {sucesso}
          </div>
        )}

        <button
          type="submit"
          className="w-full py-3 bg-lilac-600 text-white font-medium rounded-xl hover:bg-lilac-700 shadow-sm transition text-sm"
        >
          Entrar no Sistema
        </button>
      </form>

      <div className="mt-6 text-center border-t border-lilac-100 pt-4">
        <Link href="/" className="text-xs text-lilac-600 hover:text-lilac-800 font-medium transition">
          &larr; Voltar à Página Inicial
        </Link>
      </div>
    </div>
  );
}
'use client';

import { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, isAuthenticated } = useAuth();
  const router = useRouter();

  // If already authenticated, redirect to dashboard
  if (isAuthenticated) {
    router.push('/dashboard');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with email:', email);
    setIsLoading(true);
    setMessage('');
    setIsError(false);

    if (!email || !password || !confirmPassword) {
      setMessage('Please fill in all fields');
      setIsError(true);
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      setIsError(true);
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setMessage('Password must be at least 6 characters long');
      setIsError(true);
      setIsLoading(false);
      return;
    }

    try {
      console.log('Calling register function with:', email);
      const result = await register(email, password);
      console.log('Register result:', result);
      
      setIsLoading(false);

      if (result.success) {
        setMessage(result.message);
        console.log('Registration successful, will redirect to login');
        // Redirect to login after successful registration
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        setMessage(result.message);
        setIsError(true);
        console.error('Registration failed:', result.message);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setMessage('An unexpected error occurred during registration.');
      setIsError(true);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h1 className="text-center text-3xl font-bold">Create an Account</h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
              sign in to your account
            </Link>
          </p>
        </div>

        {message && (
          <div className={`p-3 rounded ${isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message}
          </div>
        )}

        {/* Formulário original */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {/* Botão de envio do formulário original */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Creating account...' : 'Register'}
            </button>
            
            {/* Botão de teste direto */}
            <button
              type="button"
              onClick={() => {
                console.log('Botão de teste clicado!');
                alert('Botão de teste clicado! Verifique o console para mais detalhes.');
              }}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Teste de Click
            </button>
            
            {/* Botão de teste de registro direto */}
            <button
              type="button"
              onClick={async () => {
                try {
                  console.log('Tentando registro direto com:', { email, password });
                  
                  if (!email || !password || password !== confirmPassword) {
                    alert('Por favor preencha todos os campos corretamente');
                    return;
                  }
                  
                  const response = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password }),
                  });
                  
                  const data = await response.json();
                  console.log('Resposta API:', { status: response.status, data });
                  alert(`Resposta da API: ${JSON.stringify(data)}`);
                } catch (error) {
                  console.error('Erro de registro:', error);
                  alert(`Erro: ${error instanceof Error ? error.message : 'Desconhecido'}`);
                }
              }}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Registro Direto (Teste)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
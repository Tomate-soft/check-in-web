// src/components/login.tsx
'use client'; // Importante para usar hooks de React en Next.js App Router

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Hook para navegación en Next.js 13+ App Router
import { useUserStore } from '@/store/useUserStore';
import styles from './login.module.css'; // Asegúrate de tener un archivo CSS para estilos

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Usa selectores de Zustand para obtener solo lo que necesitas del store
  const { setUser, setIsLoading, setError, isLoading, error } = useUserStore();
  const router = useRouter(); // Instancia del router para redirección

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null); // Limpiar errores previos

    console.log('Intentando iniciar sesión con:', { username, password });

    try {
      const response = await fetch("https://internal.api.tomatesoft.com/auth/signIn", { // Asumiendo que tienes una API endpoint en Next.js
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ employeeNumber: username, pinPos: Number(password) }), // Asegúrate de que el pinPos sea un número
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error en las credenciales');
      }

      const userData = await response.json(); // Asumiendo que la respuesta es un objeto JSON con los datos del usuario
      console.log('Datos del usuario:', userData); 
      const user = userData.payload.user;

      setUser(user); 
      router.push('/home'); 
      
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Ocurrió un error al iniciar sesión.');
      setUser(null); 
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="bg-black p-12 rounded-2xl shadow-md w-full max-w-sm border border-gray-200">
         <div className={styles.logo}>
            <img src="/tomatePOSlogo.svg" alt="logo" />
            <span>Check in</span>
          </div>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-white-700 text-xl font-bold mb-2">
              Usuario:
            </label>
            <input
              type="text"
              id="username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isLoading}
              maxLength={4}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-white-700 text-xl font-bold mb-2">
              Contraseña:
            </label>
            <input
              type="number"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-white-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              value={password}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d{0,4}$/.test(value)) { 
                  setPassword(value);
                }
              }}
              required
              disabled={isLoading}
              maxLength={4}
            />
          </div>
          {error && (
            <p className="text-red-500 text-xs italic mb-4 text-center">{error}</p>
          )}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Iniciando sesión...' : 'Entrar'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;
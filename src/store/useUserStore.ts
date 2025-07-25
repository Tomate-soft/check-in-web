// src/store/userStore.ts
import { create } from 'zustand';

// 1. Define el tipo para el usuario
export interface User {
  id: string;
  name: string;
  email: string;
  lastName: string;
  employeeNumber: string;
  pinPos: number;
  role: {
    role: {
      name: string;
    };
  };
  // Agrega más propiedades del usuario según tu API
}

// 2. Define el tipo para el estado de la tienda
interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  // Acciones (funciones para modificar el estado)
  setUser: (user: User | null) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearUser: () => void; // Para cerrar sesión
}

// 3. Crea la tienda de Zustand
export const useUserStore = create<UserState>((set) => ({
  // Estado inicial
  user: null,
  isLoading: false,
  error: null,

  // Acciones (funciones que modifican el estado)
  setUser: (user) => set({ user }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  clearUser: () => set({ user: null, error: null, isLoading: false }), // Limpia el usuario al cerrar sesión
}));
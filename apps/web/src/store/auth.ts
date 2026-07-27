import { create } from 'zustand';
import { api } from '@/lib/api';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface AuthStore {
  user: User | null;
  token: string | null;
  register: (data: any) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loadUser: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,

  register: async (data) => {
    const response = await api.post('/auth/register', data);
    const { accessToken, user } = response.data;
    localStorage.setItem('token', accessToken);
    localStorage.setItem('user', JSON.stringify(user));
    api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    set({ user, token: accessToken });
  },

  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    const { accessToken, user } = response.data;
    localStorage.setItem('token', accessToken);
    localStorage.setItem('user', JSON.stringify(user));
    api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    set({ user, token: accessToken });
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete api.defaults.headers.common['Authorization'];
    set({ user: null, token: null });
  },

  loadUser: () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      set({ user: JSON.parse(user), token });
    }
  },
}));

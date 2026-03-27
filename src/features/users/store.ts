import { create } from 'zustand';
import type { User } from '../../shared/types/user';

interface UsersState {
  users: User[];
  currentUserId: string | null;
  setUsers: (users: User[]) => void;
  setCurrentUserId: (id: string | null) => void;
  upsertUser: (user: User) => void;
  removeUser: (id: string) => void;
}

export const useUsersStore = create<UsersState>((set) => ({
  users: [],
  currentUserId: null,
  setUsers: (users) => set({ users }),
  setCurrentUserId: (id) => set({ currentUserId: id }),
  upsertUser: (user) =>
    set((state) => {
      const exists = state.users.find((u) => u.id === user.id);
      if (exists) {
        return {
          users: state.users.map((u) => (u.id === user.id ? user : u)),
        };
      }
      return { users: [...state.users, user] };
    }),
  removeUser: (id) =>
    set((state) => ({
      users: state.users.filter((u) => u.id !== id),
    })),
}));


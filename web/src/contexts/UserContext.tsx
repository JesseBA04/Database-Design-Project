"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "youdash.currentUserId";

export type AppUser = {
  userId: number;
  name: string;
  youPassStatus: boolean;
};

type UserContextValue = {
  users: AppUser[];
  currentUser: AppUser | null;
  setCurrentUserId: (id: number) => void;
  loading: boolean;
};

const UserContext = createContext<UserContextValue>({
  users: [],
  currentUser: null,
  setCurrentUserId: () => {},
  loading: true,
});

export function UserProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<AppUser[]>([]);
  const [currentUserId, setCurrentUserIdState] = useState<number>(1);
  const [loading, setLoading] = useState(true);

  // Read persisted user id from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = Number(stored);
      if (!isNaN(parsed)) {
        setCurrentUserIdState(parsed);
      }
    }
  }, []);

  // Fetch all users on mount
  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users ?? []);
      })
      .catch((err) => {
        console.error("Failed to fetch users:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const setCurrentUserId = (id: number) => {
    setCurrentUserIdState(id);
    localStorage.setItem(STORAGE_KEY, String(id));
  };

  const currentUser = users.find((u) => u.userId === currentUserId) ?? null;

  return (
    <UserContext.Provider
      value={{ users, currentUser, setCurrentUserId, loading }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useCurrentUser() {
  return useContext(UserContext);
}

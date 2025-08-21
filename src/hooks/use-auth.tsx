import { useState, useEffect } from "react";

export interface AuthState {
  isLoggedIn: boolean;
  username: string;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isLoggedIn: false,
    username: "",
  });

  useEffect(() => {
    const checkAuthStatus = () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      const username = localStorage.getItem("username") || "";
      setAuthState({ isLoggedIn, username });
    };

    checkAuthStatus();

    // Listen for storage changes (useful for multiple tabs)
    window.addEventListener("storage", checkAuthStatus);

    return () => {
      window.removeEventListener("storage", checkAuthStatus);
    };
  }, []);

  const login = (username: string) => {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", username);
    setAuthState({ isLoggedIn: true, username });
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    setAuthState({ isLoggedIn: false, username: "" });
  };

  return {
    ...authState,
    login,
    logout,
  };
};

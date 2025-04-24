import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthUser, getCurrentUser, signIn, signOut, signUp } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

interface AuthContextType {
  user: AuthUser;
  loading: boolean;
  signIn: (
    email: string,
    password: string,
  ) => Promise<{
    data: any;
    error: any;
  }>;
  signUp: (
    email: string,
    password: string,
  ) => Promise<{
    data: any;
    error: any;
  }>;
  signOut: () => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for current user on mount
    const checkUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error("Error checking auth:", error);
        // Don't throw error, just set user to null
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    // Set up auth state change listener
    let authListener: { subscription: { unsubscribe: () => void } } | null = null;

    try {
      const authListenerData = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (session?.user) {
            setUser(session.user);
          } else {
            setUser(null);
          }
          setLoading(false);
        },
      );

      authListener = authListenerData.data;
    } catch (error) {
      console.error("Error setting up auth listener:", error);
      // Make sure loading is set to false even if there's an error
      setLoading(false);
    }

    return () => {
      if (authListener) {
        try {
          authListener.subscription.unsubscribe();
        } catch (error) {
          console.error("Error unsubscribing from auth listener:", error);
        }
      }
    };
  }, []);

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

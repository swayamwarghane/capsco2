import React, { createContext, useContext, useEffect, useState } from "react";
import {
  AuthUser,
  getCurrentUser,
  signIn as authSignIn,
  signOut as authSignOut,
  signUp as authSignUp,
  resetPassword as authResetPassword,
  getSession
} from "@/lib/auth";
import { supabase } from "@/lib/supabase";

interface AuthContextType {
  user: AuthUser;
  loading: boolean;
  signIn: (
    email: string,
    password: string,
    rememberMe?: boolean
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
  resetPassword: (email: string) => Promise<{
    data: any;
    error: any;
  }>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for current user on mount
    const checkUser = async () => {
      try {
        // First check for an active session
        const session = await getSession();

        if (session) {
          setUser(session.user);
          setIsAuthenticated(true);
        } else {
          // If no session, try to get the current user
          const currentUser = await getCurrentUser();
          setUser(currentUser);
          setIsAuthenticated(!!currentUser);
        }
      } catch (error) {
        console.error("Error checking auth:", error);
        // Don't throw error, just set user to null
        setUser(null);
        setIsAuthenticated(false);
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
          console.log("Auth state changed:", event);

          if (session?.user) {
            setUser(session.user);
            setIsAuthenticated(true);
          } else {
            setUser(null);
            setIsAuthenticated(false);
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

  // Custom sign-in function that handles remember me
  const signIn = async (email: string, password: string, rememberMe: boolean = false) => {
    try {
      // Set the session persistence based on the remember me option
      await supabase.auth.setSession({
        access_token: '',
        refresh_token: ''
      });

      // Call the actual sign-in function
      const result = await authSignIn(email, password);

      if (!result.error && result.data) {
        setUser(result.data.user);
        setIsAuthenticated(true);
      }

      return result;
    } catch (error) {
      console.error("Error in signIn:", error);
      return { data: null, error };
    }
  };

  // Custom sign-up function
  const signUp = async (email: string, password: string) => {
    try {
      const result = await authSignUp(email, password);
      return result;
    } catch (error) {
      console.error("Error in signUp:", error);
      return { data: null, error };
    }
  };

  // Custom sign-out function
  const signOut = async () => {
    try {
      const result = await authSignOut();
      if (!result.error) {
        setUser(null);
        setIsAuthenticated(false);
      }
      return result;
    } catch (error) {
      console.error("Error in signOut:", error);
      return { error };
    }
  };

  // Reset password function
  const resetPassword = async (email: string) => {
    try {
      return await authResetPassword(email);
    } catch (error) {
      console.error("Error in resetPassword:", error);
      return { data: null, error };
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    isAuthenticated,
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

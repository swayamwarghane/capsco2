import { supabase } from "./supabase";
import { User, AuthError } from "@supabase/supabase-js";
import {
  mockSignUp,
  mockSignIn,
  mockSignOut,
  mockGetCurrentUser,
  mockGetSession,
  mockResetPassword,
  mockUpdatePassword
} from "./mockAuth";

export type AuthUser = User | null;

// Flag to determine if we should use mock auth
const USE_MOCK_AUTH = true;

// Helper function to format error messages
const formatErrorMessage = (error: AuthError | null): string => {
  if (!error) return "";

  // Common error messages in more user-friendly format
  const errorMap: Record<string, string> = {
    "Invalid login credentials": "The email or password you entered is incorrect.",
    "Email not confirmed": "Please check your email and confirm your account before signing in.",
    "User already registered": "An account with this email already exists. Please sign in instead.",
    "Password should be at least 6 characters": "Please use a password that is at least 6 characters long.",
    "Failed to fetch": "Unable to connect to the authentication service. Please try again later.",
  };

  return errorMap[error.message] || error.message;
};

export async function signUp(email: string, password: string) {
  try {
    if (USE_MOCK_AUTH) {
      const result = await mockSignUp(email, password);
      return {
        data: result.data,
        error: result.error ? { ...result.error, message: formatErrorMessage(result.error as any) } : null
      };
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      }
    });

    return {
      data,
      error: error ? { ...error, message: formatErrorMessage(error) } : null
    };
  } catch (err) {
    console.error("Signup error:", err);
    return {
      data: null,
      error: { message: "An unexpected error occurred. Please try again." }
    };
  }
}

export async function signIn(email: string, password: string) {
  try {
    if (USE_MOCK_AUTH) {
      const result = await mockSignIn(email, password);
      return {
        data: result.data,
        error: result.error ? { ...result.error, message: formatErrorMessage(result.error as any) } : null
      };
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return {
      data,
      error: error ? { ...error, message: formatErrorMessage(error) } : null
    };
  } catch (err) {
    console.error("Sign in error:", err);
    return {
      data: null,
      error: { message: "An unexpected error occurred. Please try again." }
    };
  }
}

export async function signOut() {
  try {
    if (USE_MOCK_AUTH) {
      const result = await mockSignOut();
      return {
        error: result.error ? { ...result.error, message: formatErrorMessage(result.error as any) } : null
      };
    }

    const { error } = await supabase.auth.signOut();
    return { error: error ? { ...error, message: formatErrorMessage(error) } : null };
  } catch (err) {
    console.error("Sign out error:", err);
    return { error: { message: "Failed to sign out. Please try again." } };
  }
}

export async function resetPassword(email: string) {
  try {
    if (USE_MOCK_AUTH) {
      const result = await mockResetPassword(email);
      return {
        data: result.data,
        error: result.error ? { ...result.error, message: formatErrorMessage(result.error as any) } : null
      };
    }

    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    return {
      data,
      error: error ? { ...error, message: formatErrorMessage(error) } : null
    };
  } catch (err) {
    console.error("Reset password error:", err);
    return {
      data: null,
      error: { message: "Failed to send reset password email. Please try again." }
    };
  }
}

export async function updatePassword(password: string) {
  try {
    if (USE_MOCK_AUTH) {
      const result = await mockUpdatePassword(password);
      return {
        data: result.data,
        error: result.error ? { ...result.error, message: formatErrorMessage(result.error as any) } : null
      };
    }

    const { data, error } = await supabase.auth.updateUser({
      password,
    });

    return {
      data,
      error: error ? { ...error, message: formatErrorMessage(error) } : null
    };
  } catch (err) {
    console.error("Update password error:", err);
    return {
      data: null,
      error: { message: "Failed to update password. Please try again." }
    };
  }
}

export async function getCurrentUser() {
  try {
    if (USE_MOCK_AUTH) {
      return await mockGetCurrentUser();
    }

    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return data?.user || null;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

export async function getSession() {
  try {
    if (USE_MOCK_AUTH) {
      return await mockGetSession();
    }

    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  } catch (error) {
    console.error("Error getting session:", error);
    return null;
  }
}

// Mock authentication system for development/demo purposes
import { User } from "@supabase/supabase-js";

// In-memory storage for registered users
const users: Record<string, { email: string; password: string }> = {};

// In-memory storage for active sessions
const sessions: Record<string, { user: User; expiresAt: number }> = {};

// Generate a random UUID for user IDs
const generateUUID = (): string => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// Create a mock user object
const createMockUser = (email: string): User => {
  return {
    id: generateUUID(),
    app_metadata: {},
    user_metadata: {},
    aud: "authenticated",
    created_at: new Date().toISOString(),
    email,
    email_confirmed_at: new Date().toISOString(),
    phone: "",
    confirmed_at: new Date().toISOString(),
    last_sign_in_at: new Date().toISOString(),
    role: "authenticated",
    updated_at: new Date().toISOString(),
  } as User;
};

// Mock sign up function
export const mockSignUp = async (email: string, password: string) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Check if user already exists
  if (users[email]) {
    return {
      data: null,
      error: {
        message: "User already registered",
        status: 400,
      },
    };
  }

  // Store the new user
  users[email] = { email, password };

  // Create a mock user object
  const user = createMockUser(email);

  return {
    data: { user },
    error: null,
  };
};

// Mock sign in function
export const mockSignIn = async (email: string, password: string) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Check if user exists
  if (!users[email]) {
    return {
      data: null,
      error: {
        message: "Invalid login credentials",
        status: 400,
      },
    };
  }

  // Check if password is correct
  if (users[email].password !== password) {
    return {
      data: null,
      error: {
        message: "Invalid login credentials",
        status: 400,
      },
    };
  }

  // Create a mock user object
  const user = createMockUser(email);

  // Create a session that expires in 1 hour
  const sessionId = generateUUID();
  const expiresAt = Date.now() + 60 * 60 * 1000;
  sessions[sessionId] = { user, expiresAt };

  // Store session in localStorage
  localStorage.setItem("mockAuthSession", sessionId);

  return {
    data: { user, session: { user, expires_at: expiresAt } },
    error: null,
  };
};

// Mock sign out function
export const mockSignOut = async () => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Remove session from localStorage
  localStorage.removeItem("mockAuthSession");

  return { error: null };
};

// Mock get current user function
export const mockGetCurrentUser = async () => {
  // Get session ID from localStorage
  const sessionId = localStorage.getItem("mockAuthSession");

  if (!sessionId || !sessions[sessionId]) {
    return null;
  }

  // Check if session has expired
  if (sessions[sessionId].expiresAt < Date.now()) {
    localStorage.removeItem("mockAuthSession");
    delete sessions[sessionId];
    return null;
  }

  return sessions[sessionId].user;
};

// Mock get session function
export const mockGetSession = async () => {
  // Get session ID from localStorage
  const sessionId = localStorage.getItem("mockAuthSession");

  if (!sessionId || !sessions[sessionId]) {
    return null;
  }

  // Check if session has expired
  if (sessions[sessionId].expiresAt < Date.now()) {
    localStorage.removeItem("mockAuthSession");
    delete sessions[sessionId];
    return null;
  }

  return {
    user: sessions[sessionId].user,
    expires_at: sessions[sessionId].expiresAt,
  };
};

// Mock reset password function
export const mockResetPassword = async (email: string) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Check if user exists
  if (!users[email]) {
    return {
      data: null,
      error: {
        message: "If your email exists in our system, you will receive a password reset link",
        status: 200, // Return 200 even if email doesn't exist for security
      },
    };
  }

  return {
    data: { email },
    error: null,
  };
};

// Mock update password function
export const mockUpdatePassword = async (password: string) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Get current user
  const user = await mockGetCurrentUser();

  if (!user || !user.email) {
    return {
      data: null,
      error: {
        message: "Not authenticated",
        status: 401,
      },
    };
  }

  // Update password
  users[user.email].password = password;

  return {
    data: { user },
    error: null,
  };
};

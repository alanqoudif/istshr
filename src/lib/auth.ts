import { UserRole } from '@/types';
import { adminUser, simpleHash } from './seed';

// Interface for user data
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  image?: string;
}

// Simple client-side auth state management
class AuthService {
  private storageKey = 'istashr_auth_user';
  private usersKey = 'istashr_users';
  
  // Get current user from localStorage
  getCurrentUser(): AuthUser | null {
    if (typeof window === 'undefined') return null;
    
    const userJson = localStorage.getItem(this.storageKey);
    if (!userJson) return null;
    
    try {
      return JSON.parse(userJson) as AuthUser;
    } catch (error) {
      console.error('Failed to parse user data:', error);
      return null;
    }
  }
  
  // Set current user in localStorage
  setCurrentUser(user: AuthUser): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.storageKey, JSON.stringify(user));
  }
  
  // Clear current user from localStorage
  clearCurrentUser(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(this.storageKey);
  }
  
  // Get all users from localStorage
  getUsers(): Record<string, { email: string; password: string; name: string; role: UserRole }> {
    if (typeof window === 'undefined') return {};
    
    const usersJson = localStorage.getItem(this.usersKey);
    if (!usersJson) {
      // Initialize with admin user if no users exist
      const initialUsers = {
        [adminUser.username.toLowerCase()]: {
          email: adminUser.username,
          password: simpleHash(adminUser.password), // Hash the password
          name: adminUser.name,
          role: adminUser.role
        }
      };
      console.log('Creating initial users with admin:', initialUsers);
      localStorage.setItem(this.usersKey, JSON.stringify(initialUsers));
      return initialUsers;
    }
    
    try {
      return JSON.parse(usersJson);
    } catch (error) {
      console.error('Failed to parse users data:', error);
      return {};
    }
  }
  
  // Add a new user
  addUser(email: string, password: string, name: string, role: UserRole): boolean {
    if (typeof window === 'undefined') return false;
    
    const users = this.getUsers();
    
    // Check if user already exists
    const userKey = email.toLowerCase();
    if (users[userKey]) {
      // If it's admin, update it
      if (role === UserRole.ADMIN) {
        users[userKey] = {
          email,
          password: simpleHash(password), // Hash the password
          name,
          role
        };
        localStorage.setItem(this.usersKey, JSON.stringify(users));
        console.log('Admin user updated:', users[userKey]);
        return true;
      }
      return false; // User already exists
    }
    
    // Add new user with hashed password
    users[userKey] = {
      email,
      password: simpleHash(password), // Hash the password
      name,
      role
    };
    
    localStorage.setItem(this.usersKey, JSON.stringify(users));
    console.log('User added:', users[userKey]);
    return true;
  }
  
  // Login user
  login(email: string, password: string): AuthUser | null {
    if (typeof window === 'undefined') return null;
    
    const users = this.getUsers();
    console.log('Login attempt for:', email);
    console.log('Available users:', Object.keys(users));
    
    const userKey = email.toLowerCase();
    const user = users[userKey];
    
    if (!user) {
      console.log('User not found');
      return null; // User not found
    }
    
    const hashedPassword = simpleHash(password);
    console.log('Password check:', { 
      stored: user.password, 
      provided: hashedPassword,
      match: user.password === hashedPassword
    });
    
    if (user.password !== hashedPassword) {
      console.log('Invalid password');
      return null; // Invalid password
    }
    
    const authUser: AuthUser = {
      id: userKey,
      email: user.email,
      name: user.name,
      role: user.role
    };
    
    console.log('Login successful for:', authUser);
    this.setCurrentUser(authUser);
    return authUser;
  }
  
  // Logout user
  logout(): void {
    this.clearCurrentUser();
  }
  
  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  }
  
  // Check if user has admin role
  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return !!user && user.role === UserRole.ADMIN;
  }
  
  // Check if user has counsellor role
  isCounsellor(): boolean {
    const user = this.getCurrentUser();
    return !!user && user.role === UserRole.COUNSELLOR;
  }
  
  // Check if user exists
  userExists(email: string): boolean {
    if (typeof window === 'undefined') return false;
    
    const users = this.getUsers();
    const userKey = email.toLowerCase();
    return !!users[userKey];
  }
}

// Create singleton instance
export const authService = new AuthService();

// Initialize admin user on client side
export function initializeAuth(): void {
  if (typeof window !== 'undefined') {
    try {
      console.log('Initializing auth...');
      const users = authService.getUsers();
      console.log('Current users:', users);
      
      // Check if admin user exists
      if (!users['admin@istashr.com'.toLowerCase()]) {
        console.log('Admin user not found, creating...');
        const success = authService.addUser(
          adminUser.username,
          adminUser.password,
          adminUser.name,
          adminUser.role
        );
        console.log('Admin user creation result:', success);
      } else {
        console.log('Admin user already exists');
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
    }
  }
} 
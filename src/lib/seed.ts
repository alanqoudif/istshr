import { UserRole, CounsellingField } from '@/types';

// Admin user credentials
export const adminUser = {
  username: 'admin@istashr.com',
  password: 'Istashr@2025', // This would be hashed in a real application
  name: 'Admin User',
  role: UserRole.ADMIN
};

// Simple hash function for client-side use
// Note: This is NOT secure for production use, just for demo purposes
export function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString(16);
}

// Mock database seed function
export function seedDatabase() {
  // In a real application, this would interact with your database
  console.log('Seeding database with initial data...');
  
  // Log admin user info
  console.log('Admin user created:');
  console.log(`Username: ${adminUser.username}`);
  console.log(`Password: ${adminUser.password} (stored as hashed in the database)`);
  
  // In a real application, you would store this in your database
  // db.users.create({
  //   email: adminUser.username,
  //   password: simpleHash(adminUser.password),
  //   name: adminUser.name,
  //   role: adminUser.role
  // });
  
  console.log('Database seeding completed.');
}

// Initial counselling fields
export const counsellingFields = Object.values(CounsellingField);

// Private mode settings
export const privateModeSetting = {
  enabled: true,
  messageExpiryHours: 24, // Messages expire after 24 hours
  autoDeleteEnabled: true,
  encryptionEnabled: true
}; 
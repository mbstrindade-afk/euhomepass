import { join } from 'path';
import fs from 'fs';
import bcrypt from 'bcryptjs';

// Create the data directory if it doesn't exist
const dataDir = join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

let Database: typeof import('better-sqlite3') | null = null;
// Disable better-sqlite3 in production to avoid native binding issues
if (process.env.ENABLE_BETTER_SQLITE3 === 'true' && process.env.NODE_ENV !== 'production') {
  try {
    Database = require('better-sqlite3');
  } catch (error) {
    console.warn('better-sqlite3 native bindings not available, falling back to in-memory store.', error);
    Database = null;
  }
}

const dbPath = join(dataDir, 'users.db');
const db = Database ? new Database(dbPath) : null;

if (db) {
  // Initialize the database with users table when persistence is available
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
// User model
  email: string;
    console.log('DB: Creating user with email:', userData.email);
    
    try {
      const hashedPassword = bcrypt.hashSync(userData.password, 10);
      console.log('DB: Password hashed successfully');
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

      if (!db) {
        const existing = inMemoryUsers.find((user) => user.email === userData.email);
  id: string;
          console.warn('In-memory DB: duplicate email detected');
          return null;
  createdAt?: string;

        const newUser: User = {
          id: inMemoryId++,
          email: userData.email,
          password: hashedPassword,
          created_at: new Date().toISOString(),
        };
        inMemoryUsers.push(newUser);
        return { id: newUser.id, email: newUser.email };
  create: async (userData: UserCredentials): Promise<User | null> => {

      const stmt = db.prepare(`
    try {
      const hashedPassword = bcrypt.hashSync(userData.password, 10);
      const user = await prisma.user.create({
        data: {
          email: userData.email,
          password: hashedPassword,
        },
      });
      return { id: user.id, email: user.email, createdAt: user.createdAt.toISOString() };
    } catch (error) {
      console.error('DB: Error creating user:', error);
      return null;
    }
      if (!db) {
        const user = inMemoryUsers.find((candidate) => candidate.email === email);
        return user ? { ...user } : null;
      }

      const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
      const user = stmt.get(email) as User | undefined;
      return user || null;
    } catch (error) {
      console.error('Error finding user by email:', error);
      return null;
    }
  },

  // Validate user credentials
  validateCredentials: (email: string, password: string): boolean => {
    const user = UserRepository.findByEmail(email);
    if (!user || !user.password) return false;
    return bcrypt.compareSync(password, user.password);
  },

  updatePassword: (email: string, hashedPassword: string): boolean => {
    try {
      if (!db) {
        const user = inMemoryUsers.find((candidate) => candidate.email === email);
        if (!user) {
          return false;
        }
        user.password = hashedPassword;
        return true;
      }

      const stmt = db.prepare('UPDATE users SET password = ? WHERE email = ?');
      const result = stmt.run(hashedPassword, email);
      return result.changes > 0;
    } catch (error) {
      console.error('Error updating password:', error);
      return false;
    }
  },
};

export default db;

import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// User model
export interface User {
  id: string;
  email: string;
  password?: string;
  createdAt?: string;
  isAdmin?: boolean;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export const UserRepository = {
  // Create a new user
  create: async (userData: UserCredentials): Promise<User | null> => {
    try {
      const hashedPassword = bcrypt.hashSync(userData.password, 10);
      // Gera referralCode simples baseado no email
      const referralCode = `ref-${userData.email.replace(/[^a-zA-Z0-9]/g, "")}`;
      const user = await prisma.user.create({
        data: {
          email: userData.email,
          password: hashedPassword,
          referralCode,
        },
      });
      return { id: user.id, email: user.email, createdAt: user.createdAt.toISOString() };
    } catch (error) {
      console.error('DB: Error creating user:', error);
      return null;
    }
  },

  // Find user by email
  findByEmail: async (email: string): Promise<User | null> => {
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) return null;
      return {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt.toISOString(),
        isAdmin: user.isAdmin ?? false,
      };
    } catch (error) {
      console.error('DB: Error finding user by email:', error);
      return null;
    }
  },

  // Validate credentials
  validateCredentials: async (email: string, password: string): Promise<boolean> => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return false;
    return bcrypt.compareSync(password, user.password);
  },

  // Update password
  updatePassword: async (email: string, newPassword: string): Promise<boolean> => {
    try {
      const hashedPassword = bcrypt.hashSync(newPassword, 10);
      await prisma.user.update({
        where: { email },
        data: { password: hashedPassword },
      });
      return true;
    } catch (error) {
      console.error('DB: Error updating password:', error);
      return false;
    }
  },
};

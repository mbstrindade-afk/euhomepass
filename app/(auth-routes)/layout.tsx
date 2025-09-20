'use client';

import { ReactNode } from 'react';
import { AuthProvider } from '../../contexts/AuthContext';

export default function AuthRoutesLayout({ children }: { children: ReactNode }) {
  // Removemos o AuthProvider daqui pois já está no providers.tsx global
  return <div className="auth-routes-layout">{children}</div>;
}
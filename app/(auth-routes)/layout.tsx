'use client';

import { ReactNode } from 'react';

export default function AuthRoutesLayout({ children }: { children: ReactNode }) {
  // Auth context is applied globally via providers.tsx
  return <div className="auth-routes-layout">{children}</div>;
}

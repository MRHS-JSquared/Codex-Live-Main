import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import { TeamProvider } from '@/lib/TeamContext';
import { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CodeX',
  description: 'The ultimate competitive programming platform.',
};

function Providers({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  if (user === undefined) {
    return null; 
  }

  return <TeamProvider>{children}</TeamProvider>;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Providers>{children}</Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/lib/AuthContext';
import { TeamProvider } from '@/lib/TeamContext'; // ✅ import

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CodeX',
  description: 'The ultimate competitive programming platform.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <TeamProvider>{children}</TeamProvider> {/* ✅ wrap */}
        </AuthProvider>
      </body>
    </html>
  );
}
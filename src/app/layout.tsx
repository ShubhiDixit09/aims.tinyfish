import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AquaPulse AI • TinyFish Autonomous Web Agent Copilot',
  description: 'Autonomous web intelligence, live cloud browser streaming, and structured schema synthesis powered by TinyFish.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-dark-950 text-slate-100 antialiased selection:bg-tinyfish-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CivicPilot AI • Sovereign Indic Citizen Agent | BITCAMP Track 1',
  description: 'Autonomous government portal copilot, pre-flight document auditing, and human-in-the-loop browser automation powered by TinyFish.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#FBFBFA] text-[#191817] antialiased selection:bg-[#E8590C]/15 selection:text-[#C2410C]">
        {children}
      </body>
    </html>
  );
}

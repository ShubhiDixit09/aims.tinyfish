import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CivicPilot • Official Government Services & Application Assistant',
  description: 'Public services application assistant, document compliance auditor, and portal navigation powered by TinyFish.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#FAF9F5] text-[#141312] antialiased selection:bg-[#E8590C]/15 selection:text-[#C2410C]">
        {children}
      </body>
    </html>
  );
}

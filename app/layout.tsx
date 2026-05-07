import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AbidjanChic — Guide Premium',
  description: 'Découvrez les meilleurs endroits chics d\'Abidjan',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-[#f7f7f7] max-w-[430px] mx-auto min-h-screen">
        {children}
      </body>
    </html>
  );
}
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'NirmanERP - Modern Construction ERP for Bangladesh',
  description:
    'One Platform. Every Construction Operation. Premium Enterprise Construction ERP inspired by Somikoron ERP for Bangladeshi civil contractors, real estate developers, and engineering firms.',
  keywords: [
    'Construction ERP Bangladesh',
    'Somikoron ERP',
    'BOQ Estimation',
    'Civil Engineering ERP',
    'Construction Material Stock',
    'Muster Roll Wages BD',
    'BDT Lakh Crore ERP'
  ],
  authors: [{ name: 'NirmanERP Solutions' }],
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`} suppressHydrationWarning>
      <body className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

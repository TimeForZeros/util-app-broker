import './globals.css';
import Navbar from './navbar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <header>
        <Navbar />
      </header>
      <body>{children}</body>
    </html>
  );
}

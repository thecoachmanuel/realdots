import "./globals.css";
import { WishlistProvider } from '@/components/WishlistProvider';
import ScrollAnimation from '@/components/ScrollAnimation';

export const metadata = {
  title: "RealDots - Find your dream house",
  description: "Real Estate Agency",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700&family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ScrollAnimation>
          <WishlistProvider>
            {children}
          </WishlistProvider>
        </ScrollAnimation>
        <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js" async></script>
        <script noModule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js" async></script>
      </body>
    </html>
  );
}

import './styles.css';

export const metadata = {
    title: 'Anime Search',
    description: 'Created by Ashures using the Jikan MAL API with Next.js',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
  
import "./globals.css";

export const metadata = {
    title: "Ecommerce",
    description: "My ecommerce site",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}

import "@/styles/globals.css";

export const metadata = {
  title: "webscribe",
  description: "collaborative text editor",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-full w-full">{children}</body>
    </html>
  );
}

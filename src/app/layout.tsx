import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { Providers } from "./providers";
import { TopNavbar } from "./_components/nav-bar";
import { getServerAuthSession } from "~/server/auth";

export const metadata = {
  title: "Movie App",
  description: "A movie search app with user's watchlist",
  icons: [{ rel: "icon", url: "/logos/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <Providers>
          {session && <TopNavbar />}
          <main className="flex min-h-screen flex-col items-center justify-center bg-slate-700 text-white">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}

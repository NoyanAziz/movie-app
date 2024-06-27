import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { Providers } from "./providers";
import { TopNavbar } from "./_components/nav-bar";
import { getServerAuthSession } from "~/server/auth";
import { DISPLAY_STRINGS, LABELS } from "./constants";

export const metadata = {
  title: LABELS.APP_TITLE,
  description: DISPLAY_STRINGS.APP_DESCRIPTION,
  icons: [{ rel: "icon", url: "/logos/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  return (
    <html lang="en" className={`${GeistSans.variable} dark`}>
      <body>
        <Providers>
          {session?.user && (
            <TopNavbar
              userImage={session?.user?.image ?? ""}
              userName={session?.user?.name ?? "Guest"}
            />
          )}
          <main className="flex min-h-screen flex-col items-center bg-slate-900 text-white">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}

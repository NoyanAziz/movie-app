// app/providers.tsx
"use client";

import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    // eslint-disable-next-line @typescript-eslint/unbound-method
    <NextUIProvider navigate={router.push}>{children}</NextUIProvider>
  );
}

"use client";

import React from "react";
import { Input } from "@nextui-org/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { DISPLAY_STRINGS, MAX_SEARCH_STRING_LENGTH } from "~/app/constants";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((input: string) => {
    const params = new URLSearchParams(searchParams);
    if (input) {
      params.set("query", input);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 500);

  return (
    <div className="flex w-full items-center justify-center p-20">
      <Input
        isClearable
        radius="lg"
        placeholder={DISPLAY_STRINGS.SEARCH_BAR_PLACEHOLDER}
        startContent={
          <MagnifyingGlassIcon className="h-8 w-8 text-slate-400" />
        }
        onChange={(e) => handleSearch(e.target.value)}
        onClear={() => handleSearch("")}
        defaultValue={searchParams.get("query")?.toString()}
        maxLength={MAX_SEARCH_STRING_LENGTH}
        classNames={{
          label: "text-black/50 dark:text-white/90",
          input: [
            "mx-3",
            "text-lg",
            "bg-transparent",
            "text-black/90 dark:text-white/90",
            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
          ],
          innerWrapper: "bg-transparent",
          inputWrapper: [
            "h-[55px]",
            "shadow-xl",
            "bg-default-200/50",
            "dark:bg-default/60",
            "backdrop-blur-xl",
            "backdrop-saturate-200",
            "hover:bg-default-200/70",
            "dark:hover:bg-default/70",
            "group-data-[focus=true]:bg-default-200/50",
            "dark:group-data-[focus=true]:bg-default/60",
            "!cursor-text",
          ],
        }}
      />
    </div>
  );
}

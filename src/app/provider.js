"use client";
import * as React from "react";
import { SessionProvider } from "next-auth/react";

// 1. import `NextUIProvider` component
import { NextUIProvider } from "@nextui-org/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";

export default function Provider({ children }) {
  return (
    <NextUIProvider>
        <NextThemesProvider attribute="class" defaultTheme="light">
            <SessionProvider>{children}</SessionProvider>
        </NextThemesProvider>

    </NextUIProvider>
  );
}

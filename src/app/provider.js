"use client";
import * as React from "react";
import { SessionProvider } from "next-auth/react";

// 1. import `NextUIProvider` component
import { NextUIProvider } from "@nextui-org/react";

export default function Provider({ children }) {
  return (
    <NextUIProvider>
      <SessionProvider>{children}</SessionProvider>
    </NextUIProvider>
  );
}

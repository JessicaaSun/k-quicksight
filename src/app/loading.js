"use client";

import { Spinner } from "@nextui-org/react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center z-50 h-screen">
      <Spinner size='lg' />
    </div>
  );
}

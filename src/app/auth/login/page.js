"use client";

import { useRouter } from "next/navigation";
import FormLogin from "./components/Form";

export default function Login() {
  const router = useRouter();
  return (
    <main className="min-h-screen">
      <FormLogin />
    </main>
  );
}

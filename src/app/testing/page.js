"use client";
import DeckCard from "@/components/cards/deck-card/DeckCard";
import * as React from "react";
import { useSession } from "next-auth/react";
import { useEffect } from 'react';

export default function Testing() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      console.log("User is logged in:", session);
    }
  }, [session, status]);

  return (
    <div>
      {status === "loading" && <p>Loading...</p>}
      {status === "authenticated" && (
        <>
          <p>Welcome, {session.user.name}!</p>
          <p>Email: {session.user.email}</p>
          <p>Password {session.user.at_hash}</p>
          {/* Add other user information as needed */}
        </>
      )}
      {status === "unauthenticated" && <p>Not logged in</p>}
    </div>
  );
}

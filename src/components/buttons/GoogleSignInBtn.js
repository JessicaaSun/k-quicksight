"use client";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import React, { useCallback } from "react";
import { useSession, signIn } from "next-auth/react";

const GoogleSignInBtn = () => {
  const { data: session, status, loading } = useSession();
  const handleLoginWithGoogle = () => {
    signIn("google");
  };

  const popupCenter = (url, title) => {
    const dualScreenLeft = window.screenLeft ?? window.screenX;
    const dualScreenTop = window.screenTop ?? window.screenY;

    const width =
      window.innerWidth ?? document.documentElement.clientWidth ?? screen.width;

    const height =
      window.innerHeight ??
      document.documentElement.clientHeight ??
      screen.height;

    const systemZoom = width / window.screen.availWidth;

    const left = (width - 500) / 2 / systemZoom + dualScreenLeft;
    const top = (height - 550) / 2 / systemZoom + dualScreenTop;

    const newWindow = window.open(
      url,
      title,
      `width=${500 / systemZoom},height=${
        550 / systemZoom
      },top=${top},left=${left}`
    );

    newWindow?.focus();
  };

  return (
    <div>
      <Button
        type="submit"
        onClick={handleLoginWithGoogle}
        // onClick={() => popupCenter("/auth/login", "Sign In with you google account")}
        className="bg-white text-text-color h-[46px] border-1 border-primary-color font-semibold flex gap-5"
      >
        <Image
          src="/assets/images/google_logo.png"
          alt="google"
          width={20}
          height={20}
        />
        <p className="font-semibold text-text-color">Continue with google</p>
      </Button>
    </div>
  );
};

export default GoogleSignInBtn;

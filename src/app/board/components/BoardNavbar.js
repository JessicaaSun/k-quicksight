"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import logo from "@assets/logos/logo.png";
import {
  AiFillPlayCircle,
  AiOutlineCaretLeft,
  AiOutlineCaretRight,
} from "react-icons/ai";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import BoardSidebar from "@/app/board/components/BoardSidebar";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { logout } from "@/store/features/auth/authSlice";
import { useSidebar } from "@/context/BoardSideBarContext";
import { useHandlePreview } from "@/context/EditorPreviewContext";

const Navbar = () => {
  const { data: user, isSuccess, isLoading } = useGetUserQuery();
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const displayPreviewBtn = pathname.includes("dashboard/", "analysis/");

  const { isSidebarHidden, toggleSidebar } = useSidebar();
  const { handleOnClickPreview} = useHandlePreview()

  return (
    <div
      className={
        "fixed z-40 top-0 right-0 w-full bg-primary-color flex justify-between items-center px-[3%] py-3"
      }
    >
      <div className={"flex justify-center items-center gap-5"}>
        {isSidebarHidden ? (
          <button
            onClick={toggleSidebar}
            className="text-white text-[20px] md:block block"
          >
            <AiOutlineCaretRight />
          </button>
        ) : (
          <button
            onClick={toggleSidebar}
            className="text-white text-[20px] md:block block"
          >
            <AiOutlineCaretLeft />
          </button>
        )}
        <Link href={"/"}>
          <Image
            src={logo}
            alt={"logo"}
            className={"bg-white rounded-full w-[36px] h-[36px] object-contain"}
          />
        </Link>
      </div>
      <div className="flex items-center">
        <Dropdown>
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src={
                user?.data.avatar
                  ? user.data.avatar
                  : "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
              }
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Dynamic Actions">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold text-primary-color">
                {user?.data.username}
              </p>
            </DropdownItem>
            <DropdownItem
              onClick={() => router.push("/profile")}
              key="settings"
            >
              Profile
            </DropdownItem>
            <DropdownItem
              onClick={() => router.push("/board")}
              key="team_settings"
            >
              Board
            </DropdownItem>
            <DropdownItem
              onClick={() => {
                dispatch(logout());
                window.location.reload();
              }}
              key="logout"
              color="danger"
            >
              logout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        {displayPreviewBtn ? (
          <div className="ms-4">
            <div
              className="flex items-center text-primary-color leading-1 bg-white p-2 rounded-lg cursor-pointer hover:bg-slate-200"
              onClick={handleOnClickPreview}
            >
              <div style={{ marginRight: 4, fontSize: 20 }}>
                <AiFillPlayCircle />
              </div>{" "}
              Preview
            </div>
          </div>
        ) : (
          ""
        )}
      </div>

      <BoardSidebar toggleSidebar={isSidebarHidden} />
    </div>
  );
};

export default Navbar;
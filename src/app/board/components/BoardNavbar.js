"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "@assets/logos/logo.png";
import { AiFillPlayCircle } from "react-icons/ai";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import Sidebar from "@/app/board/components/BoardSidebar";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { logout } from "@/store/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import PlayCircleIcon from "@duyank/icons/regular/PlayCircle";

const Navbar = ({ openPreview }) => {
  const { data: user, isSuccess, isLoading } = useGetUserQuery();
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const displayPreviewBtn = pathname.includes("dashboard/", "analysis/");

  const [isSidebarHidden, setIsSidebarHidden] = useState(false);

  // Function to toggle the sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarHidden(!isSidebarHidden);
  };

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
            className={"lg:hidden md:block block"}
          >
            <svg
              width="22"
              height="15"
              viewBox="0 0 22 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.785714 2.7551H21.2143C21.6482 2.7551 22 2.48101 22 2.14286V0.612245C22 0.274094 21.6482 0 21.2143 0H0.785714C0.351754 0 0 0.274094 0 0.612245V2.14286C0 2.48101 0.351754 2.7551 0.785714 2.7551ZM0.785714 8.87755H21.2143C21.6482 8.87755 22 8.60346 22 8.26531V6.73469C22 6.39654 21.6482 6.12245 21.2143 6.12245H0.785714C0.351754 6.12245 0 6.39654 0 6.73469V8.26531C0 8.60346 0.351754 8.87755 0.785714 8.87755ZM0.785714 15H21.2143C21.6482 15 22 14.7259 22 14.3878V12.8571C22 12.519 21.6482 12.2449 21.2143 12.2449H0.785714C0.351754 12.2449 0 12.519 0 12.8571V14.3878C0 14.7259 0.351754 15 0.785714 15Z"
                fill="white"
              />
            </svg>
          </button>
        ) : (
          <button
            onClick={toggleSidebar}
            className={"lg:hidden md:block block"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="25"
              width="25"
              viewBox="0 0 384 512"
            >
              <path
                d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                fill="white"
              />
            </svg>
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
              onClick={openPreview}
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

      <Sidebar toggleSidebar={isSidebarHidden} />
    </div>
  );
};

export default Navbar;

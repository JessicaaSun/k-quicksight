"use client";
import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import PlayCircleIcon from "@duyank/icons/regular/PlayCircle";
import { downloadObjectAsJson } from "../utils/download";
import { useEditor } from "@lidojs/editor";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import { useDispatch } from "react-redux";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/context/BoardSideBarContext";
import { useHandlePreview } from "@/context/EditorPreviewContext";

import {
  AiFillPlayCircle,
  AiOutlineCaretLeft,
  AiOutlineCaretRight,
} from "react-icons/ai";
import logo from "@assets/logos/logo.png";
import BoardSidebar from "@/app/board/components/navbar/BoardSidebar";
import { logout } from "@/store/features/auth/authSlice";
import { generateBashURL } from "@/utils/util";

const HeaderLayout = ({ openPreview }, ref) => {
  const uploadRef = useRef(null);
  const { actions, query } = useEditor();
  const { data: user, isSuccess, isLoading } = useGetUserQuery();
  const dispatch = useDispatch();
  const pathname = usePathname();

  const displayPreviewBtn = pathname.includes("dashboard/**", "analysis/**", "editor");
  const { isSidebarHidden, toggleSidebar } = useSidebar();
  const { handleOnClickPreview } = useHandlePreview();

  const handleExport = () => {
    downloadObjectAsJson("file", query.serialize());
  };

  const handleImport = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function () {
        const fileContent = JSON.parse(reader.result);
        actions.setData(fileContent);
      };
      reader.readAsText(file);
      e.target.value = "";
    }
  };

  return (
    <div
      ref={ref}
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
      <div className="flex gap-5 items-center">
        {/* {displayPreviewBtn ? ( */}
          <div className="flex items-center gap-4">
            <div
              style={{
                cursor: "pointer",
                color: "#fff",
                fontWeight: 700,
                ":hover": {
                  textDecoration: "underline",
                },
              }}
              onClick={() => uploadRef.current?.click()}
            >
              <input
                ref={uploadRef}
                type="file"
                accept="application/json"
                onChange={handleImport}
                style={{ display: "none" }}
              />
              Import
            </div>
            <div
              style={{
                cursor: "pointer",
                color: "#fff",
                fontWeight: 700,
                ":hover": {
                  textDecoration: "underline",
                },
              }}
              onClick={handleExport}
            >
              Export
            </div>
            <div
              className="flex items-center text-primary-color leading-1 bg-white p-2 rounded-lg cursor-pointer hover:bg-slate-200"
              onClick={handleOnClickPreview}
            >
              <div style={{ fontSize: 20 }}>
                <AiFillPlayCircle />
              </div>{" "}
              Preview
            </div>
          </div>
        {/* ) : (
          ""
        )} */}
        <Dropdown>
          <DropdownTrigger>
          <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="primary"
              name="Jason Hughes"
              size="sm"
              src={generateBashURL(user?.data.avatar)}
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
      </div>

      <BoardSidebar toggleSidebar={isSidebarHidden} />
    </div>
  );
};

export default React.forwardRef(HeaderLayout);

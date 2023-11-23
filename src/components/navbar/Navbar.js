"use client";
import { logout, setCurrentUser } from "@/store/features/auth/authSlice";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unstable_ClassNameGenerator } from "@mui/material";
import { setCurrentImage } from "@/store/features/profile_image/imageSlice";
import { configSchema } from "next/dist/server/config-schema";
import { useSession, signOut } from "next-auth/react";
import Loading from "@/app/loading";
import logoName from "@assets/logos/name.png";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {generateBashURL} from "@/utils/util";

export default function NavbarKQuick() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();

  const menuItems = [
    {
      id: 1,
      path: "/features",
      page: "Features",
    },
    {
      id: 2,
      path: "/tutorials",
      page: "Tutorials",
    },
    {
      id: 3,
      path: "/about-us",
      page: "About",
    },
    {
      id: 4,
      path: "/contact-us",
      page: "Contact",
    },
    {
      id: 5,
      path: "/sample",
      page: "Sample",
    },
  ];
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUserQuery();
  const state = useSelector((state) => state.image);
  const userInfo = useSelector((state) => state.userInfo.userInfo);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setCurrentUser(user));
      dispatch(setCurrentImage(user.data.avatar));
    }
  }, [dispatch, isSuccess, user]);

  const validNavPath = [
    "/auth/login",
    "/auth/signup",
    "/auth/confirmation",
    "/handle_error",
    "/testing",
    "/board",
  ];

  if (validNavPath.some((path) => pathname.startsWith(path))) return null;
  else
    return (
      <nav className="flex flex-col fixed z-40 w-full">
        <Community_navbar />

        <section className="w-full bg-primary-color shadow-sm lg:px-[50px] md:px-[10px] px-[10px] flex justify-between items-center">
          <Navbar
            onMenuOpenChange={setIsMenuOpen}
            className="w-auto bg-primary-color"
          >
            <NavbarContent>
              <NavbarMenuToggle
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="sm:hidden text-white"
              />
              <NavbarBrand>
                <Link
                  href="/"
                  className="flex gap-5 justify-center items-center"
                >
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform py-[0.3rem] object-cover bg-background-color"
                    size="sm"
                    src="/assets/logos/logo.png"
                  />
                  <span className="text-primary-color font-semibold text-lg">
                    <Image
                      priority={false}
                      unoptimized={true}
                      src={logoName}
                      alt="K-QuickSight"
                      className={"w-[200px] h-[72px] object-cover"}
                    />
                  </span>
                </Link>
              </NavbarBrand>
            </NavbarContent>
            <NavbarMenu className="py-[50px] mt-[50px]">
              {menuItems.map((item) => (
                <Link
                  href={item.path}
                  key={item.id}
                  className="hover:text-primary-color font-normal hover:font-semibold hover:bg-blue-300 hover:px-3 hover:py-5 py-3 hover:rounded-lg transition-all"
                >
                  {item.page}
                </Link>
              ))}
            </NavbarMenu>
          </Navbar>
          <div className="lg:flex md:flex hidden justify-center items-center gap-10 transition-all text-background-color">
            {menuItems.map((item) => (
              <Link
                href={item.path}
                key={item.id}
                className={
                  pathname === item.path
                    ? "hover:bg-background-color hover:text-primary-color text-primary-color hover:font-semibold bg-blue-300 px-3 py-1 rounded-lg font-semibold hover:px-3 hover:py-1 hover:rounded-lg transition-all"
                    : "hover:text-primary-color font-normal hover:font-semibold hover:bg-background-color hover:px-3 hover:py-1 hover:rounded-lg transition-all"
                }
              >
                {item.page}
              </Link>
            ))}
          </div>
          {isSuccess ? (
            <Navbar className="w-auto bg-primary-color">
              <NavbarContent>
                <Dropdown placement="bottom-end">
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
                  <DropdownMenu aria-label="Profile Actions" variant="flat">
                    <DropdownItem key="profile" className="h-14 gap-2">
                      <p className="font-semibold">Signed in as</p>
                      <p className="font-semibold text-primary-color">
                        {userInfo ? userInfo.username : user?.data.username}
                      </p>
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => router.push("/profile")}
                      key="settings"
                    >
                      Profile
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => router.push("/board/recent")}
                      key="team_settings"
                    >
                      Board
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => {
                        signOut();
                        dispatch(logout());
                      }}
                      key="logout"
                      color="danger"
                    >
                      logout
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </NavbarContent>
            </Navbar>
          ) : (
            <Button
              onClick={() => router.push("/auth/login")}
              className="text-primary-color font-semibold px-7 bg-background-color"
            >
              Login
            </Button>
          )}
        </section>
      </nav>
    );
}

export function Community_navbar() {
  return (
    <div className="lg:flex md:flex bg-background-color justify-center text-sm items-center text-center gap-5 py-2.5">
      <svg
        className="lg:m-0 md:m-0 m-auto"
        width="23"
        height="23"
        viewBox="0 0 23 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="11.5" cy="11.5" r="11.5" fill="#2891F6" fillOpacity="0.2" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.89767 10.6586C8.40289 9.13143 10.7403 8.12463 11.9098 7.63819C15.2489 6.24931 15.9428 6.00805 16.395 6.00008C16.4945 5.99833 16.7169 6.02298 16.861 6.13988C16.9826 6.23858 17.0161 6.37192 17.0321 6.4655C17.0481 6.55909 17.068 6.77227 17.0522 6.93884C16.8712 8.84011 16.0883 13.454 15.6899 15.5834C15.5214 16.4845 15.1895 16.7866 14.8682 16.8162C14.17 16.8804 13.6397 16.3547 12.9634 15.9114C11.9052 15.2177 11.3073 14.7859 10.2801 14.1089C9.09297 13.3266 9.86254 12.8967 10.5391 12.194C10.7161 12.0101 13.7927 9.21175 13.8522 8.9579C13.8596 8.92615 13.8666 8.8078 13.7963 8.74531C13.7259 8.68283 13.6222 8.70419 13.5473 8.72119C13.4412 8.74528 11.7506 9.8627 8.47554 12.0734C7.99567 12.403 7.56102 12.5635 7.17159 12.5551C6.74227 12.5458 5.91644 12.3123 5.30252 12.1128C4.54952 11.868 3.95105 11.7386 4.00316 11.3229C4.03031 11.1064 4.32848 10.885 4.89767 10.6586Z"
          fill="#0346A5"
        />
      </svg>
      <div>
        <Link href={"/"} className="text-primary-color font-semibold">
          {" "}
          Join our community, support{" "}
        </Link>
        and Connect with Like-Minded Individuals for Assistance and Guidance.
      </div>
    </div>
  );
}

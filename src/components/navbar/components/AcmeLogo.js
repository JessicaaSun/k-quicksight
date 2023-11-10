"use client"
import React from "react";
import Link from "next/link";
export const AcmeLogo = () => (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
        <path
            clipRule="evenodd"
            d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
            fill="currentColor"
            fillRule="evenodd"
        />
    </svg>
);

export const community_navbar = () => {
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
                <circle
                    cx="11.5"
                    cy="11.5"
                    r="11.5"
                    fill="#2891F6"
                    fillOpacity="0.2"
                />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.89767 10.6586C8.40289 9.13143 10.7403 8.12463 11.9098 7.63819C15.2489 6.24931 15.9428 6.00805 16.395 6.00008C16.4945 5.99833 16.7169 6.02298 16.861 6.13988C16.9826 6.23858 17.0161 6.37192 17.0321 6.4655C17.0481 6.55909 17.068 6.77227 17.0522 6.93884C16.8712 8.84011 16.0883 13.454 15.6899 15.5834C15.5214 16.4845 15.1895 16.7866 14.8682 16.8162C14.17 16.8804 13.6397 16.3547 12.9634 15.9114C11.9052 15.2177 11.3073 14.7859 10.2801 14.1089C9.09297 13.3266 9.86254 12.8967 10.5391 12.194C10.7161 12.0101 13.7927 9.21175 13.8522 8.9579C13.8596 8.92615 13.8666 8.8078 13.7963 8.74531C13.7259 8.68283 13.6222 8.70419 13.5473 8.72119C13.4412 8.74528 11.7506 9.8627 8.47554 12.0734C7.99567 12.403 7.56102 12.5635 7.17159 12.5551C6.74227 12.5458 5.91644 12.3123 5.30252 12.1128C4.54952 11.868 3.95105 11.7386 4.00316 11.3229C4.03031 11.1064 4.32848 10.885 4.89767 10.6586Z"
                    fill="#0346A5"
                />
            </svg>
            <div>
                <Link href={"/"} className="text-primary-color font-semibold"> Join our community, support </Link>
                and Connect with Like-Minded
                Individuals for Assistance and Guidance.
            </div>
        </div>
    )
}
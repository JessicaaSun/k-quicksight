"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Grid } from "antd";

const { useBreakpoint } = Grid;

export const AOSInit = () => {
	const screen = useBreakpoint();
	useEffect(() => {
		AOS.init({
			easing: "ease-out-quad",
			duration: 800,
			disable: screen.sm || screen.xs,
			once: true,
		});
	}, [screen.sm, screen.xs]);

	return null;
};

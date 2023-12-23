// app/components/ThemeSwitcher.tsx
"use client";

import {useTheme} from "next-themes";
import { useEffect, useState } from "react";
import {LuSun} from "react-icons/lu";
import {FiMoon} from "react-icons/fi";
import {Switch} from "@nextui-org/react";

export default function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme();

    const handleSetTheme = () => {
        if (theme === 'light') {
            setTheme('dark')
        } else {
            setTheme('light')
        }
    }

    useEffect(() => {
        setMounted(true)
    }, [])

    if(!mounted) return null

    return (
        <Switch
            defaultSelected
            size="lg"
            color="primary"
            startContent={<LuSun />}
            endContent={<FiMoon />}
            onValueChange={handleSetTheme}
        >

        </Switch>
    )
}
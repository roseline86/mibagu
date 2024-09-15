"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { BsMoonStars } from "react-icons/bs";
import { MdOutlineWbSunny } from "react-icons/md";
import ToolTipHook from "../helper/ToolTipHook";
import { Label } from "../ui/label";

export default function ThemeSwitch() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const handleThemeToggle = () => {
    // Toggle between light and dark themes
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    setMounted(true);
    // Set the default theme to light when the component mounts
    if (theme === "system" || !theme) {
      setTheme("light");
    }
  }, [theme, setTheme]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative flex flex-col items-center justify-center gap-5 text-gray-200">
      <Label htmlFor="mode" onClick={handleThemeToggle}>
        <ToolTipHook
          icon={
            theme === "light" ? (
              <MdOutlineWbSunny size={28} />
            ) : (
              <BsMoonStars size={28} />
            )
          }
          text="Change Theme"
        />
      </Label>
    </div>
  );
}

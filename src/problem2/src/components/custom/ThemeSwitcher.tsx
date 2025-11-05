import { LaptopMinimal, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const ThemeSwitcher = ({ className = "" }: { className?: string }) => {
  const [theme, setTheme] = useState("system");

  //! Apply theme whenever it changes
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "system") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      root.classList.toggle("dark", prefersDark);
    } else {
      root.classList.toggle("dark", theme === "dark");
    }
  }, [theme]);

  //! Load saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "system";
    setTheme(savedTheme);
  }, []);

  //! Save and set theme
  const handleChangeTheme = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div
      className={`relative flex flex-row p-1 rounded-full shadow-primary shadow-md w-fit bg-card transition-transform duration-300 hover:scale-110 *:cursor-pointer *:z-10 *:flex-1 *:p-2 ${className}`}
    >
      {/*//? INDICATOR */}
      <div
        className={`theme-indicator shadow-md ${
          theme === "light"
            ? "translate-x-px"
            : theme === "dark"
            ? "translate-x-[62px]"
            : "translate-x-8"
        }`}
      />

      {/*//? LIGHT */}
      <button onClick={() => handleChangeTheme("light")}>
        <Sun
          size={15}
          className={`${
            theme === "light" ? "text-card-foreground" : "text-muted-foreground"
          }`}
          aria-label="Light theme"
        />
      </button>

      {/*//? SYSTEM */}
      <button onClick={() => handleChangeTheme("system")}>
        <LaptopMinimal
          size={15}
          className={`${
            theme === "system"
              ? "text-card-foreground"
              : "text-muted-foreground"
          }`}
          aria-label="System theme"
        />
      </button>

      {/*//? DARK */}
      <button onClick={() => handleChangeTheme("dark")}>
        <Moon
          size={15}
          className={`${
            theme === "dark" ? "text-card-foreground" : "text-muted-foreground"
          }`}
          aria-label="Dark theme"
        />
      </button>
    </div>
  );
};

export default ThemeSwitcher;

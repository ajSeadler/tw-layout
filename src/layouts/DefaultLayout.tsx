import type { ReactNode } from "react";
import Navbar from "../components/Navbar";
import { useTheme } from "../hooks/useTheme";

type Props = { children: ReactNode };

export function DefaultLayout({ children }: Props) {
  const { theme } = useTheme();

  return (
    <div
      className={`${theme} min-h-screen flex flex-col bg-[rgb(var(--background))] text-[rgb(var(--copy-primary))] font-sans transition-colors duration-300`}
    >
      <Navbar />

      <main className="flex-1 w-full">{children}</main>

      <footer className="text-center text-xs py-6 border-t border-[rgb(var(--border))] bg-[rgb(var(--card))] text-[rgb(var(--copy-secondary))]">
        © {new Date().getFullYear()} — Built with ❤️
      </footer>
    </div>
  );
}

export default DefaultLayout;

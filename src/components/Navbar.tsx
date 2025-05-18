import ThemeSwitcher from "./ThemeSwitcher";

const Navbar = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-[rgb(var(--border))] bg-[rgb(var(--card))]">
      <h1 className="text-2xl font-semibold"></h1>
      <ThemeSwitcher />
    </header>
  );
};

export default Navbar;

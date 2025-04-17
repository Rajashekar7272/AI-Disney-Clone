import Image from "next/image";
import Link from "next/link";
import DisneyLogo from "../public/DisneyLogo-removebg-preview.png";
import { ThemeToggler } from "./ThemeToggler";
import SearchInput from "./SearchInput";
import GenreDropdown from "./GenreDropdown";

function Header() {
  return (
    <header
      className="fixed z-20 top-0 left-0 flex items-center justify-between w-full px-4 sm:px-6 lg:px-8 py-2 sm:py-3 
      bg-gradient-to-t from-gray-200/0 via-gray-900/25 to-gray-900"
    >
      <Link href="/">
        <Image
          src={DisneyLogo}
          alt="Disney Logo"
          width={120}
          height={100}
          sizes="(max-width: 640px) 80px, (max-width: 1024px) 100px, 120px"
          className="cursor-pointer invert-0 dark:invert w-20 sm:w-24 lg:w-28 2xl:w-32"
        />
      </Link>
      <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-6">
        {/* Genre Dropdown */}
        <GenreDropdown />

        {/* Search */}
        <SearchInput />

        {/* Toggler */}
        <ThemeToggler />
      </div>
    </header>
  );
}

export default Header;
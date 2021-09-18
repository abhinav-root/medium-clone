import Link from "next/link";

const Header = () => {
  return (
    <header>
      <nav className="bg-gray-100 py-3 px-8">
        <div className="flex justify-end space-x-8 items-center">
          <Link href="/register">
            <a className="bg-yellow-500 text-white px-4 py-1 rounded-2xl hover:bg-yellow-400">
              Sign up
            </a>
          </Link>
          <Link href="/login">
            <a className="text-blue-600 hover:text-blue-500">Login</a>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;

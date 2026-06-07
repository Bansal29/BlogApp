import { type MouseEvent, useEffect, useState } from "react";
import { Avatar } from "./BlogCard";
import { Link, useNavigate } from "react-router-dom";

export const Appbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userName, setUserName] = useState("You");
  const navigate = useNavigate();

  useEffect(() => {
    setIsAuthenticated(Boolean(localStorage.getItem("token")));
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = () => {
      setProfileOpen(false);
      setMobileOpen(false);
    };

    if (profileOpen || mobileOpen) {
      window.addEventListener("click", handleClickOutside);
    }

    return () => window.removeEventListener("click", handleClickOutside);
  }, [profileOpen, mobileOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setIsAuthenticated(false);
    setProfileOpen(false);
    navigate("/");
  };

  const toggleProfile = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setProfileOpen((open) => !open);
  };

  const toggleMobile = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setMobileOpen((open) => !open);
  };

  return (
    <div className="border-b bg-white px-4 py-4 shadow-sm md:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-xl font-semibold text-slate-900">
            Vichaar
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            <Link to="/" className="hover:text-slate-900">
              Home
            </Link>
            <Link to="/blogs" className="hover:text-slate-900">
              Blogs
            </Link>
          </nav>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <>
              <Link to="/publish">
                <button className="rounded-full bg-green-700 px-5 py-2 text-sm font-semibold text-white hover:bg-green-800">
                  New post
                </button>
              </Link>
              <div className="relative">
                <button
                  onClick={toggleProfile}
                  type="button"
                  className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm hover:border-slate-300"
                >
                  <Avatar size="small" name={userName} />
                  <span>{userName}</span>
                </button>
                {profileOpen && (
                  <div className="absolute right-0 z-20 mt-2 w-44 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
                    <div className="px-4 py-3 text-sm text-slate-700">
                      Signed in as
                      <div className="font-semibold text-slate-900">
                        {userName}
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-4 text-sm font-medium text-slate-700">
              <Link to="/signin" className="hover:text-slate-900">
                Sign in
              </Link>
              <Link
                to="/signup"
                className="rounded-full border border-slate-900 bg-white px-4 py-2 hover:bg-slate-50"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>

        <button
          onClick={toggleMobile}
          className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-2 text-slate-700 shadow-sm md:hidden"
          type="button"
        >
          <span className="sr-only">Toggle menu</span>
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden mt-3 rounded-2xl border border-slate-200 bg-white shadow-lg">
          <div className="flex flex-col gap-1 px-4 py-4 text-sm text-slate-700">
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className="rounded-xl px-3 py-2 hover:bg-slate-100"
            >
              Home
            </Link>
            <Link
              to="/blogs"
              onClick={() => setMobileOpen(false)}
              className="rounded-xl px-3 py-2 hover:bg-slate-100"
            >
              Blogs
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/publish"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-3 py-2 hover:bg-slate-100"
                >
                  New post
                </Link>
                <button
                  onClick={handleLogout}
                  className="rounded-xl px-3 py-2 text-left hover:bg-slate-100"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-3 py-2 hover:bg-slate-100"
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-3 py-2 hover:bg-slate-100"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

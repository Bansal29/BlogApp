import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsAuthenticated(Boolean(localStorage.getItem("token")));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="max-w-5xl mx-auto px-6 py-16 sm:py-24">
        <div className="text-center space-y-6">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
            Welcome to Vichaar Blog
          </p>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
            Write, share, and discover stories with your community.
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-slate-600">
            Publish new posts, browse the latest blogs, or sign in to manage
            your profile. This is the home for writers, readers, and creators.
          </p>

          {isAuthenticated ? (
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
              <Link
                to="/blogs"
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Go to blogs
              </Link>
              <Link
                to="/publish"
                className="inline-flex items-center justify-center rounded-full border border-slate-900 bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100"
              >
                Create post
              </Link>
              <button
                onClick={handleLogout}
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
              <Link
                to="/signin"
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Sign in
              </Link>
              <Link
                to="/signup"
                className="inline-flex items-center justify-center rounded-full border border-slate-900 bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100"
              >
                Sign up
              </Link>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2 pt-8 text-left">
            <Link
              to="/blogs"
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold">Browse blogs</h2>
              <p className="mt-2 text-sm text-slate-600">
                See all published posts and read what other authors are sharing.
              </p>
            </Link>
            <Link
              to="/publish"
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold">Create new post</h2>
              <p className="mt-2 text-sm text-slate-600">
                Share your next idea with the world by publishing a new blog.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/Signup.tsx";
import { Signin } from "./pages/Signin.tsx";
import { Blog } from "./pages/Blog.tsx";
import { Home } from "./pages/Home.tsx";
import Blogs from "./pages/Blogs.tsx";
import { Publish } from "./pages/Publish";
import {
  signinInput,
  signupInput,
  createPostInput,
  updatePostInput,
} from "common-utils-aryan";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/publish" element={<Publish />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

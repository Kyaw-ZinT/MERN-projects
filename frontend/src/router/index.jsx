import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import BlogForm from "../pages/BlogForm";
import BookDetail from "../pages/BookDetail";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/about",
        element: <About />,
      },

      {
        path: "/contact",
        element: <Contact />,
      },

      {
        path: "/blogForm",
        element: <BlogForm />,
      },
      {
        path: "/books/edit/:id",
        element: <BlogForm />,
      },
      {
        path: "/books/:id",
        element: <BookDetail />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
    ],
  },
]);

export default router;

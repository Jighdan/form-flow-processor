import "./styles.css";

import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Routes } from "enums/routes";
import { PageHome } from "pages/home";
import { PageSignUp } from "pages/sign-up";
import { PageOnboarding } from "pages/onboarding";

const router = createBrowserRouter([
  {
    path: Routes.HOME,
    element: <PageHome />,
  },
  {
    path: Routes.SIGN_UP,
    element: <PageSignUp />,
  },
  {
    path: Routes.ONBOARDING,
    element: <PageOnboarding />,
  },
]);

const root = document.getElementById("root");

if (root) {
  createRoot(root).render(<RouterProvider router={router} />);
}

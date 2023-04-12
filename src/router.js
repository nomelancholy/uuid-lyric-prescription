import { createBrowserRouter } from "react-router-dom";
import Welcome from "./components/Welcome";
import Examine from "./components/Examine";
import Prescribe from "./components/Prescribe";
import ErrorPage from "./components/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
    errorElement: <ErrorPage />,
  },
  {
    path: "examine",
    element: <Examine />,
  },
  {
    path: "prescribe/:type",
    element: <Prescribe />,
    errorElement: <ErrorPage />,
  },
]);

export default router;

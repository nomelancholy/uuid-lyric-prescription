import { createBrowserRouter } from "react-router-dom";
import Welcome from "./components/Welcome";
import Examine from "./components/Examine";
import Prescribe from "./components/Prescribe";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
  },
  {
    path: "examine",
    element: <Examine />,
  },
  {
    path: "prescribe/:type",
    element: <Prescribe />,
  },
]);

export default router;

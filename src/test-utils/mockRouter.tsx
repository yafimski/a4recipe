import PageNotFound from "../components/PageNotFound";
import HomePage from "../pages/HomePage";
import Instructions from "../pages/Instructions";
import Quantities from "../pages/Quantities";

const routesConfig = [
  {
    path: "/",
    element: <HomePage />,
    errorElement: <PageNotFound />,
  },
  { path: "/quantities", element: <Quantities /> },
  { path: "/instructions", element: <Instructions /> },
];

export default routesConfig;

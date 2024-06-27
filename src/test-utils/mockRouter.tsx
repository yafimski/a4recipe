import PageNotFound from "../components/PageNotFound";
import HomePage from "../pages/HomePage";
import Quantities from "../pages/Quantities";

const routesConfig = [
  {
    path: "/",
    element: <HomePage />,
    errorElement: <PageNotFound />,
  },
  { path: "/quantities", element: <Quantities /> },
];

export default routesConfig;

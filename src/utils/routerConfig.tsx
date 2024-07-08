import PageNotFound from "../components/PageNotFound";
import DoublePrint from "../pages/DoublePrint";
import HomePage from "../pages/HomePage";
import Instructions from "../pages/Instructions";
import PrintPage from "../pages/PrintPage";
import Quantities from "../pages/Quantities";

const routesConfig = [
  {
    path: process.env.NODE_ENV === "production" ? "/a4recipe/" : "/",
    element: <HomePage />,
    errorElement: <PageNotFound />,
  },
  { path: "/quantities", element: <Quantities /> },
  { path: "/instructions", element: <Instructions /> },
  { path: "/print", element: <PrintPage /> },
  { path: "/doublePrint", element: <DoublePrint /> },
];

export default routesConfig;

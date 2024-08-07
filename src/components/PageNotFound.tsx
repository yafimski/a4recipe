import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="flex flex-col center h-screen">
      <h1 className="text-fluidTitle mb-4">404 Page Not Found</h1>
      <Link to="/" style={{ fontSize: 20, textDecoration: "none", color: "blue" }}>
        Back to a4recipe Home
      </Link>
    </div>
  );
}

export default PageNotFound;

import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="flex flex-col center h-screen">
      <h1 className="text-2xl mb-4">404 Page Not Found</h1>
      <Link to="/" style={{ fontSize: 20, textDecoration: "none" }}>
        Back to a4recipe Home
      </Link>
    </div>
  );
}

export default PageNotFound;

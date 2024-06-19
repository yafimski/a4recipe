import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="notFoundLink">
      <h1>404 Page Not Found</h1>
      <Link to="/">Back to a4recipe Home</Link>
    </div>
  );
}

export default PageNotFound;

import { Link } from "@remix-run/react";

export default function FooterNav() {
  return (
    <div>
      <span>
        <Link to="/"> Home</Link>
      </span>{" "}
      &nbsp;
      <span>
        <Link to="/bids">Bids</Link>
        {"  "}
      </span>
      <span>
        <Link to="/collections">Collections</Link>
      </span>{" "}
      {"  "}
      <span>
        <Link to="/users">Users</Link>
      </span>
    </div>
  );
}

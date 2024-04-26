import { Link } from "@remix-run/react";

export default function Dashboard() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/collections">collections</Link>
        </li>
      </ul>
    </div>
  );
}

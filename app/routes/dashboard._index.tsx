import { Link } from "@remix-run/react";

export default function Dashboard() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/collections">collections</Link>
        </li>
        <li>
          <Link to="/bids"> of bids by collection id</Link>
        </li>
      </ul>

      <ul>
        <li> collection CRUD</li>
      </ul>

      <ul>
        <li>Bid Crud</li>
      </ul>

      <ul>
        <li>
          accept bid (should reject other bids), params: collection_id, bid_id
        </li>
      </ul>
    </div>
  );
}

import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import FooterNav from "~/components/FooterNav";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix</h1>
      <div>
        <Link to="/dashboard">Go to dashboard</Link>
      </div>

      <div>
        <Link to="/bids">See bids</Link>
      </div>
      <FooterNav />
    </div>
  );
}

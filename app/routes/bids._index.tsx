import React from "react";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { json, LoaderFunctionArgs } from "@remix-run/node";

import { getAllBids, getBids } from "~/models/bids.server";
import { Bids } from "@prisma/client";
import FooterNav from "~/components/FooterNav";

export async function loader({ request }: LoaderFunctionArgs) {
  console.log("loader called");
  const url = new URL(request.url);

  const cid = url.searchParams.get("collection_id");
  if (cid === null) {
    console.log("cid is null");
    const bids = await getAllBids();
    return json({ bids, id: "" });
  }

  const id = parseInt(cid, 10);
  if (Number.isNaN(id)) {
    console.log("cid is NaN");
    return json({ bids: [], id });
  }

  console.log(`id is ${id}`);
  const bids = await getBids(id);
  return json({ bids, id });
}

export default function BidsIndex() {
  const { bids, id } = useLoaderData<typeof loader>();

  const renderBids = () => {
    if (Array.isArray(bids) === false) {
      return <React.Fragment>Loading...</React.Fragment>;
    }

    const lis = bids.map((bid, index: number) => {
      if (!bid) {
        return <React.Fragment key={index}></React.Fragment>;
      }

      return (
        <li key={index}>
          {bid.id} | [{bid.status}] | ${bid.price / 100}
        </li>
      );
    });

    return <ul>{lis}</ul>;
  };

  return (
    <React.Fragment>
      <Form>
        <input
          type="number"
          placeholder="enter a collection ID"
          name="collection_id"
          defaultValue={id || ""}
        />
      </Form>
      <hr />
      <h5>BIDS</h5>
      <section>{renderBids()}</section>
      <Link to={"/bid/create"}>Create New Bid</Link>
      <FooterNav />
    </React.Fragment>
  );
}

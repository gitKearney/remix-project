import React, { useRef, useState } from "react";
import { Form, useLoaderData } from "@remix-run/react";
import { Bids, Collections } from "@prisma/client";
import { json, redirect } from "@remix-run/node";
import { createBid } from "~/models/bids.server";
import { createCollection, getCollections } from "~/models/collections.server";

import invariant from "tiny-invariant";

import type { ActionFunctionArgs } from "@remix-run/node";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

// ***** SERVER ACTION THAT SAVES DATA FROM FORM *****
export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  console.log(formData);

  const collection_id = formData.get("collectionid");
  const price = formData.get("price");
  const user_id = formData.get("userid");
  const status = "pending";

  invariant(typeof collection_id === "string", "invalid stock name");
  invariant(typeof price === "string", "invalid price");
  invariant(typeof user_id === "string", "invalid user");

  const b: Bids = {
    collection_id: parseInt(collection_id, 10),
    price: parseInt(price, 10),
    user_id: parseInt(user_id, 10),
    status,
    id: 0,
  };

  await createBid(b);
  return redirect("/bids");
};

// ***** SERVER CODE THAT HYDRATES THE DROPDOWN LIST *****
export const loader = async () => {
  const collections = await getCollections();

  return json({ collections });
};

// ***** THE REACT FRONT_END COMPONENT *****
export default function CreateBid() {
  const { collections } = useLoaderData<typeof loader>();
  const [collectionId, setCollectionId] = useState<number>(0);

  // code for react search autocomplete
  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results);
  };

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result);
  };

  const handleOnSelect = (item: Collections) => {
    // the item selected
    setCollectionId(item.id);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const formatResult = (collection: Collections) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>
          name: {collection.name}
        </span>
      </>
    );
  };

  return (
    <React.Fragment>
      <Form key={"bid.new"} id="create-bid" method="post">
        <input type="number" name="price" placeholder="price of bid" />
        <input type="number" name="userid" placeholder="id of user" />
        <input
          defaultValue={"pendings"}
          type="text"
          name="status"
          placeholder="pending"
          disabled
        />
        <input type="hidden" name="collectionid" value={collectionId} />
        <div>
          <h5>FIND A STOCK</h5>
          <div style={{ width: 512 }}>
            {/* <input type="number" name="collection" placeholder="id of collection" /> */}
            <ReactSearchAutocomplete
              items={collections}
              onSearch={handleOnSearch}
              onHover={handleOnHover}
              onSelect={handleOnSelect}
              onFocus={handleOnFocus}
              formatResult={formatResult}
            />
          </div>
        </div>
        <button type="submit">Save</button>
      </Form>
    </React.Fragment>
  );
}

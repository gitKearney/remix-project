import { Form, useNavigate } from "@remix-run/react";
import type { ActionFunctionArgs } from "@remix-run/node";
import { Collections } from "@prisma/client";
import { json, redirect } from "@remix-run/node";

import React from "react";
import { createCollection } from "~/models/collections.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  /** @type {Collections} */
  const updates: Collections = {
    id: 0,
    descriptions: "",
    name: "",
    price: 0,
    stocks: 0,
  };

  // let's make sure everything's a number
  const _price: boolean = !!parseInt(formData.get("price"), 10);
  const _stocks: boolean = !!parseInt(formData.get("stocks"), 10);

  if (_price && _stocks) {
    updates.descriptions = formData.get("descriptions");
    updates.name = formData.get("name");
    updates.price = parseInt(formData.get("price"), 10);
    updates.stocks = parseInt(formData.get("stocks"), 10);
  } else {
    return redirect(`/collections`);
  }

  await createCollection(updates);

  return redirect(`/collections/${updates.name}`);
};

export default function CreateCollection() {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Form key={"collection.name"} id="collection-up" method="post">
        <p>
          <span>Name</span>
          <input
            defaultValue={""}
            aria-label="collection name"
            name="name"
            type="text"
            placeholder="collection name"
          />
        </p>
        <p>
          <span>Description</span>
          <input
            defaultValue={""}
            aria-label="collection description"
            name="descriptions"
            type="text"
            maxLength={60}
            placeholder="short desc"
          />
        </p>
        <p>
          <label htmlFor="stocs">Stock Quantity</label>
          <input
            defaultValue={""}
            aria-label="quantity of stock"
            name="stocks"
            id="stocks"
            type="number"
            min={0}
            max={32600}
            placeholder="quantity of stock"
          />
          <label htmlFor="price">Stock Price</label>
          <input
            defaultValue={""}
            aria-label="price of stock"
            name="price"
            id="price"
            type="number"
            min={0}
            max={32600}
            placeholder="price of stock pennies"
          />
        </p>
        <button type="submit">Save</button>
      </Form>
      <button type="button" onClick={() => navigate(-1)}>
        Cancel
      </button>
    </React.Fragment>
  );
}

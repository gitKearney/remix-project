import { Fragment } from "react/jsx-runtime";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData, useNavigate } from "@remix-run/react";
import invariant from "tiny-invariant";

import { getCollection, updateCollection } from "~/models/collections.server";
import { Collections } from "@prisma/client";

/**
 * @description handles form submission
 */
export async function action({ params, request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const updated = Object.fromEntries(formData);
  console.log("updated", updated);

  /** @type {Collections} */
  const updates: Collections = {
    id: 0,
    descriptions: "",
    name: "",
    price: 0,
    stocks: 0,
  };

  // let's make sure everything's a number
  const _id: boolean = !!parseInt(formData.get("id"), 10);
  const _price: boolean = !!parseInt(formData.get("price"), 10);
  const _stocks: boolean = !!parseInt(formData.get("stocks"), 10);

  if (_id && _price && _stocks) {
    updates.id = parseInt(formData.get("id"), 10);
    updates.descriptions = formData.get("descriptions");
    updates.name = formData.get("name");
    updates.price = parseInt(formData.get("price"), 10);
    updates.stocks = parseInt(formData.get("stocks"), 10);
  } else {
    return redirect(`/collections/${params.name}`);
  }

  await updateCollection(updates);

  return redirect(`/collections/${updates.name}`);
}

/**
 * @description hydrates the webpage
 */
export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.name, "name is required");
  const collection = await getCollection(params.name);

  if (!collection) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ collection });
};

/**
 * @description React component
 */
export default function CollectionEdit() {
  const { collection } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  return (
    <Fragment>
      <Form key={collection.name} id="collection-up" method="put">
        <p>
          <span>Name</span>
          <input
            defaultValue={collection.name}
            aria-label="collection name"
            name="name"
            type="text"
            placeholder="collection name"
          />
        </p>
        <p>
          <span>Description</span>
          <input
            defaultValue={collection.descriptions}
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
            defaultValue={collection.stocks}
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
            defaultValue={collection.price}
            aria-label="price of stock"
            name="price"
            id="price"
            type="number"
            min={0}
            max={32600}
            placeholder="price of stock pennies"
          />
          <input type="hidden" name="id" value={collection.id} />
        </p>
        <button type="submit">Save</button>
      </Form>
      <button type="button" onClick={() => navigate(-1)}>
        Cancel
      </button>
    </Fragment>
  );
}

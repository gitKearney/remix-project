import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getCollection } from "~/models/collections.server";
import invariant from "tiny-invariant";
import { Fragment } from "react/jsx-runtime";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.name, "name is required");
  const collection = await getCollection(params.name);

  if (!collection) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ collection });
};

export default function Collection() {
  const { collection } = useLoaderData<typeof loader>();
  return (
    <Fragment>
      <div>{collection.name}</div>
      <div>${collection.price / 100}</div>
      <div>Quantity: {collection.stocks}</div>
      <Link to={`/collection/${collection.name}/edit`}>EDIT</Link>
    </Fragment>
  );
}

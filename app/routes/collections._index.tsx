import { Collections } from "@prisma/client";
import { json, Link, useLoaderData } from "@remix-run/react";

import { Fragment } from "react";
import { getCollections } from "~/models/collections.server";

export const loader = async () => {
  return json({ collections: await getCollections() });
};

export default function CollectionIndex() {
  const { collections } = useLoaderData<typeof loader>();

  const renderCollections = () => {
    /**@type {Collections} */
    return collections.map((c, i) => {
      return (
        <li key={`${i}`}>
          <div>
            {c.name} |{" "}
            <span style={{ fontStyle: "italic" }}>{c.descriptions}</span>
          </div>
          <Link to={c.name}>Details</Link>
        </li>
      );
    });
  };

  return (
    <Fragment>
      <div>TODO LIST COLLECTIONS</div>
      <ul>{renderCollections()}</ul>
      <Link to="/collection/new/create">Create New</Link>
    </Fragment>
  );
}

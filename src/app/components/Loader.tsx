import React from "react";
import { Spinner } from "@nextui-org/react";

export default function Loader() {
  return (
    <Spinner size="lg" label="Loading.." color="success" labelColor="success" />
  );
}

import React from "react";
import { Progress } from "@nextui-org/react";

export default function Loader() {
  return (
    <Progress
      size="sm"
      isIndeterminate
      aria-label="Loading..."
      className="max-w-md"
    />
  );
}

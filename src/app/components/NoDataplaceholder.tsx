"use client";
import { Button } from "@nextui-org/react";

export default function NoDataPlaceholder({ DATA }: { Data: String }) {
  return (
    <div className="flex flex-col w-full items-center justify-center m-4 bg-gray-100 text-gray-800 p-4 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-gray-600">
        No {DATA} Found
      </h2>
      <p className="text-lg mb-6 text-gray-500">
        Looks like there's nothing here yet!
      </p>
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import Loader from "../components/Loader";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleNewForm = () => {
    setLoading(true);
    router.push(`/newform/${Math.round(Math.random() * 100000000000000)}`);
    setLoading(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h2>Main Page</h2>
    </main>
  );
}

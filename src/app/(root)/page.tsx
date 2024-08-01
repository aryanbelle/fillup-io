"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import Loader from "../components/Loader";

export default function Home() {
  const [id, setId] = useState(crypto.randomUUID());
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleNewForm = () => {
    setLoading(true);
    router.push(`/form/${id}`);
    setLoading(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-around p-24">
      <h2>Main Page</h2>
      {loading ? (
        <Loader />
      ) : (
        <Button variant="flat" color="primary" onClick={handleNewForm}>
          New Form
        </Button>
      )}
    </main>
  );
}

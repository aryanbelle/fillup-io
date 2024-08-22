"use client";
import Dashboard from "@/app/components/Dashboard";
import Loader from "@/app/components/Loader";
import { useUser } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  if (!isLoaded) {
    // Handle loading state however you like
    return (
      <div className="min-h-[94vh] flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (isSignedIn) {
    return <Dashboard />;
  } else {
    router.push("signin");
  }
}

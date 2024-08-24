import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import HomePage from "@/app/components/HomePage";
export default async function Home() {
  const user = await currentUser();
  if (user) redirect("/dashboard");
  else return <HomePage />;
}

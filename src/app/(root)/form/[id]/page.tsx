"use client";
import CreatorForm from "@/app/components/CreatorForm";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
const page = ({ params }: { params: { id: String } }) => {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  if (!user || !isLoaded) router.push("/signin");

  return (
    <div className="mainclass overflow-auto bg-[#e6ebed] flex flex-col text-gray-900  h-full  justify-center items-center">
      <CreatorForm />
    </div>
  );
};

export default page;

"use client";
import CreatorForm from "@/app/components/CreatorForm";
const page = ({ params }: { params: { id: String } }) => {
  return (
    <div className="flex flex-col text-gray-900  min-h-screen justify-center items-center">
      <CreatorForm />
    </div>
  );
};

export default page;

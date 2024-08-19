import CreatorForm from "@/app/components/CreatorForm";

const page = async () => {
  return (
    <div className="mainclass p-4 bg-[#e6ebed] h-[92vh]  flex flex-col justify-center items-center text-gray-900 ">
      <CreatorForm />
    </div>
  );
};

export default page;

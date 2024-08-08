import React from "react";
import NavigationBar from "../components/Navbar";
const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="mainclass min-h-screen  flex flex-col ">
      <NavigationBar />
      <div className="min-h-[88vh] flex flex-col justify-center bg-[#e6ebed]">
        {children}
      </div>
    </main>
  );
};

export default HomeLayout;

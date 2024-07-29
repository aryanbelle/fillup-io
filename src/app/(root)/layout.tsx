import React from "react";
import NavigationBar from "../components/Navbar";
const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-screen flex flex-col">
      <div className="top-0 ">
        <NavigationBar />
      </div>
      {children}
    </main>
  );
};

export default HomeLayout;

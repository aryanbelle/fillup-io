"use client";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import "../../../public/hero.jpg"; // Ensure the image path is correct
import "../../../public/robot.jpg";
import "../../../public/simplified.jpg";
import "../../../public/templates.jpg";
import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { isSignedIn } = useAuth();
  if (isSignedIn) {
    router.push("/dashboard");
  }
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="h-screen flex flex-col lg:flex-row justify-center items-center relative">
        {/* Hero Image */}
        <motion.div
          className="relative hidden lg:block lg:w-1/2 align-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <img
            src="hero.jpg" // Ensure this path matches your public folder setup
            alt="Hero"
            className="object-cover w-[80%]"
          />
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-20 lg:w-1/2 lg:pl-12 text-center lg:text-left px-4 md:px-12 lg:px-24 lg:pl-32">
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold mb-4 text-gray-900"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Typewriter
              options={{
                strings: ["FillUp.io"],
                autoStart: true,
                loop: true,
              }}
            />
          </motion.h1>
          <motion.p
            className="text-lg md:text-2xl mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Create, share, and analyze surveys effortlessly.
            <br />
            Perfect for collecting feedback, conducting research, or organizing
            events.
          </motion.p>
          <motion.div
            className="flex justify-center lg:justify-start space-x-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <button className="bg-blue-500 hover:bg-blue-700 text-white py-3 px-8 rounded-full text-lg shadow-xl transform hover:scale-105 transition-all duration-300">
              <a href="/signin">Get Started</a>
            </button>
            <button className="bg-gray-100 hover:bg-gray-300 text-gray-900 py-3 px-8 rounded-full text-lg shadow-xl transform hover:scale-105 transition-all duration-300">
              Explore Features
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-100">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            className="text-4xl font-extrabold mb-12 text-gray-900"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Cutting-Edge Features
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="flex justify-center mb-4">
                <img
                  src="robot.jpg"
                  alt="AI-Powered Surveys"
                  className="object-cover w-32 h-32"
                />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                AI-Powered Surveys
              </h3>
              <p className="text-base text-gray-600">
                Leverage AI to create smart, adaptive surveys that enhance
                response quality and completion rates.
              </p>
            </motion.div>
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="flex justify-center mb-4">
                <img
                  src="simplified.jpg"
                  alt="Simplified Interface"
                  className="object-cover w-32 h-32"
                />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                Simplified
              </h3>
              <p className="text-base text-gray-600">
                Experience a clean and simple interface that lets you create and
                manage surveys with ease.
              </p>
            </motion.div>
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="flex justify-center mb-4">
                <img
                  src="templates.jpg"
                  alt="Customizable Templates"
                  className="object-cover w-32 h-32"
                />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                Customizable Templates
              </h3>
              <p className="text-base text-gray-600">
                Choose from a variety of templates and customize them to reflect
                your brand’s identity.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-20 bg-blue-900">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            className="text-4xl font-extrabold text-white"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Unmatched Security
          </motion.h2>
          <p className="text-lg text-gray-200 mt-6 mb-6">
            Your data is safeguarded with industry-leading security measures,
            including end-to-end encryption and regular audits.
          </p>
          <motion.button
            className="bg-blue-500 hover:bg-blue-700 text-white py-4 px-10 rounded-full text-lg shadow-xl transform hover:scale-105 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
          >
            Learn More About Our Security
          </motion.button>
        </div>
      </section>

      {/* Developers Section */}
      <section className="py-20 bg-gradient-to-b from-gray-100 to-white">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            className="text-4xl font-extrabold mb-12 text-gray-900"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Meet the Developers
          </motion.h2>
          <div className="flex justify-center space-x-12">
            {[
              {
                name: "Sanket Kore",
                linkedIn: "https://www.linkedin.com/in/developer1",
                email: "sanketkore960@gmail.com",
              },
              {
                name: "Aryan Belle",
                linkedIn: "https://www.linkedin.com/in/developer2",
                email: "aryaanbelle692@gmail.com",
              },
            ].map((developer, index) => (
              <motion.div
                key={index}
                className="bg-white p-10 rounded-lg shadow-2xl hover:shadow-3xl text-left max-w-xs transform hover:-translate-y-2 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <h3 className="text-2xl font-bold mb-2 text-gray-900">
                  {developer.name}
                </h3>
                <p className="text-base text-gray-600 mb-4">
                  <a
                    href={`mailto:${developer.email}`}
                    className="hover:underline"
                  >
                    {developer.email}
                  </a>
                </p>
                <p className="text-base text-gray-600">
                  <a href={developer.linkedIn} className="hover:underline">
                    LinkedIn Profile
                  </a>
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

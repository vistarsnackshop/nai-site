"use client";
import { useState } from "react";
import Footer from "../footer/page";
import PasswordInput from "./passwordComponent";

export default function SigninPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/authenticate', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Authentication successful
        window.location.href = "../browsepage"; // Redirect to dashboard or next page
      } else {
        const data = await response.json();
        setError(data.message || "Authentication failed");
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      setError("Internal Server Error-Sign In Page");
    }
  };

  return (
    <>
      <div className="font-[sans-serif] text-[#333]">
        <div className="min-h-screen flex flex-col items-center justify-center">
          <div className="flex flex-col items-center mb-24 mt-8">
            <img src="vistar-logo.png" alt="Vistar logo" className="mb-4" />
            <p className="text-3xl font-extrabold">
              National Account Information
            </p>
          </div>
          <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full p-4 m-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
            <div className="md:max-w-md w-full sm:px-6 py-4">
              <form onSubmit={handleSignIn}>
                <div className="mb-12">
                  <h3 className="text-3xl font-extrabold">Sign in</h3>
                </div>
                <div>
                  <label className="text-xs block mb-2">Username</label>
                  <div className="relative flex items-center">
                    <input
                      name="username"
                      type="text"
                      required
                      value = {username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full text-sm border-b border-gray-300 focus:border-[#333] px-2 py-3 outline-none"
                      placeholder="Enter Username"
                    />
                  </div>
                </div>
                <PasswordInput
                  value = {password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="flex items-center justify-between gap-2 mt-5">
                  <div className="flex items-center"></div>
                  <div></div>
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <div className="mt-12">
                  <button
                    type="submit"
                    className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded-full text-white bg-vistarGreen hover:bg-vistarGreenHover focus:outline-none"
                  >
                    Sign in
                  </button>
                </div>
                <br></br>
                <div className="space-x-8 flex justify-center pt-10"></div>
              </form>
            </div>
            <div className="md:h-full max-md:mt-10 bg-[#000842] rounded-xl lg:p-12 p-8 relative overflow-hidden">
              <img
                src="vistar-truck.jpg"
                className="absolute inset-0 w-full h-full object-cover"
                alt="Vistar truck on login"
              />
            </div>
          </div>
          <Footer/>
        </div>
      </div>
    </>
  );
}

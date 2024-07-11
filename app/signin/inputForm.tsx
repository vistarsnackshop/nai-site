"use client";
import { useState } from "react";
import { FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";


const InputForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const createQueryString = useCallback(
    (name: string, value:string) => {
      const params = new URLSearchParams();
      params.set(name, value);

      return params.toString();
    },
    []
  );

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await signIn("credentials", {
        username: formData.get("username") as string,
        password: formData.get("password") as string,
        redirect: false,
      });

      if (response?.error) {
        setError("Invalid username or password"); // Set generic error message
      } else {
        const username = formData.get("username") as string;
        router.push(`/browsepage?${createQueryString("username", username)}`);
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid username or password"); // Generic error message for unexpected errors
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-12">
        <h3 className="text-3xl font-extrabold">Sign in</h3>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div>
        <label className="text-xs block mb-2">Username</label>
        <div className="relative flex items-center">
          <input
            name="username"
            type="text"
            required
            className="w-full text-sm border-b border-gray-300 focus:border-[#333] px-2 py-3 outline-none"
            placeholder="Enter Username"
          />
        </div>
      </div>
      <div className="mt-8">
        <label className="text-xs block mb-2">Password</label>
        <div className="relative flex items-center">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            required
            className="w-full text-sm border-b border-gray-300 focus:border-[#333] px-2 py-3 outline-none"
            placeholder="Enter password"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#bbb"
            stroke="#bbb"
            onClick={togglePasswordVisibility}
            className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
            viewBox="0 0 128 128"
          >
            <path
              d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
              data-original="#000000"
            />
          </svg>
        </div>
      </div>
      <div className="flex items-center justify-between gap-2 mt-5">
        <div className="flex items-center"></div>
        <div></div>
      </div>
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
  );
};

export default InputForm;

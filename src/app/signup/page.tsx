"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import signUp from "@/firebase/auth/signup";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleForm = async (event: any) => {
    event.preventDefault();

    const { result, error } = await signUp(email, password);

    if (error) {
      return console.log(error);
    }

    console.log(result);
    return router.push("/");
  };

  return (
    <div className="h-screen w-screen bg-[#121212] flex justify-center items-center">
      <div className="text-white flex justify-center items-center flex-col w-1/3 container mx-auto">
        <h1 className="text-4xl text-center leading-10 font-bold">
          Inscrivez-vous pour commencer à écouter
        </h1>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className=" py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form
              className="space-y-6"
              action=""
              method="POST"
              onSubmit={handleForm}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white"
                >
                  Adresse email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none !bg-[#121212] block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#20D760]  focus:border-[#20D760]  sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-white"
                >
                  Mot de passe
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block !bg-[#121212] w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#20D760]  focus:border-[#20D760]  sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium  bg-[#20D760]  focus:outline-none focus:ring-2 focus:ring-offset-2 text-[#121212] focus:ring-[#20D760] "
                >
                  S'inscrire
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

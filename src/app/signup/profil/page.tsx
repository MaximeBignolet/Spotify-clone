"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import addData from "@/firebase/firestore/addData";
import { getCookie } from "cookies-next";

export default function Profil() {
  const [name, setName] = useState("");
  const [firstname, setFirstName] = useState("");
  const id = getCookie("token");
  const router = useRouter();

  const handleForm = async (event: any) => {
    event.preventDefault();
    const data = {
      name: name,
      firstname: firstname,
    };
    const { result, error } = await addData("user", id, data);

    if (error) {
      return console.error(error);
    }

    router.push("/");
  };

  return (
    <div className="h-screen w-screen bg-[#121212] flex justify-center items-center">
      <div className="text-white flex justify-center items-center flex-col w-1/3 container mx-auto">
        <h1 className="text-4xl text-center leading-10 font-bold">
          Enregistrez vos informations
        </h1>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className=" py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form
              className="space-y-6"
              action=""
              method="POST"
              onSubmit={handleForm}
            >
              <div className="flex gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-white"
                  >
                    Nom
                  </label>
                  <div className="mt-1">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      onChange={(e) => setName(e.target.value)}
                      className="appearance-none !bg-[#121212] block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#20D760]  focus:border-[#20D760]  sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="firstname"
                    className="block text-sm font-medium text-white"
                  >
                    Prénom
                  </label>
                  <div className="mt-1">
                    <input
                      id="firstname"
                      name="firstname"
                      type="text"
                      required
                      onChange={(e) => setFirstName(e.target.value)}
                      className="appearance-none block !bg-[#121212] w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#20D760]  focus:border-[#20D760]  sm:text-sm"
                    />
                  </div>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium  bg-[#20D760]  focus:outline-none focus:ring-2 focus:ring-offset-2 text-[#121212] focus:ring-[#20D760] "
                >
                  Continuer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

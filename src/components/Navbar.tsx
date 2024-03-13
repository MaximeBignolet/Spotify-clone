"use client";
import { Navigation } from "@/types/Navigation";
import { Dialog, Transition } from "@headlessui/react";

import {
  faHouse,
  faMagnifyingGlass,
  faRightToBracket,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LibraryIconSvg from "./svg/LibraryIconSvg";
import { faPlus } from "@fortawesome/pro-solid-svg-icons";
import React, { useEffect, useRef, useState, Fragment } from "react";
import { getCategories } from "@/services/getAllCategories";
import { Categories } from "@/types/Categories";
import Link from "next/link";
import { deleteCookie, getCookie, hasCookie } from "cookies-next";
import getData from "@/firebase/firestore/getData";

const NavBar = () => {
  const [clickedIconPlus, setClickedIconPlus] = useState<boolean>(false);
  const [categories, setCategories] = useState<Categories["items"]>();
  const [authToken, setAuthToken] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [firstname, setFirstName] = useState<string>("");
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  const openModal = () => {
    setOpen(!open);
  };

  const id = getCookie("token");
  function onClickIconPlus() {
    setClickedIconPlus(!clickedIconPlus);
  }

  function onClickDeleteCookies() {
    deleteCookie("token");
  }

  useEffect(() => {
    async function fetchCategories() {
      const categoriesData = await getCategories();
      const authToken = hasCookie("token");
      if (authToken) {
        const { result } = await getData("user", id);
        setName(result?.get("name"));
        setFirstName(result?.get("firstname"));
      }
      setAuthToken(authToken);
      if (categoriesData) {
        setCategories(categoriesData);
      }
    }
    fetchCategories();
  });

  const navItems: Navigation[] = [
    {
      name: "Accueil",
      path: "/",
      icon: <FontAwesomeIcon icon={faHouse} />,
      id: 1,
    },
    {
      name: "Rechercher",
      path: "/search",
      icon: <FontAwesomeIcon icon={faMagnifyingGlass} />,
      id: 2,
    },
  ];

  return (
    <div className="bg-black w-[25vw] h-screen">
      <div className="pt-5 pb-2 mx-4">
        <nav className="bg-[#121212] flex flex-col gap-5 rounded-xl p-5">
          {navItems.map((item) => (
            <ul
              className="text-gray-400 flex items-center cursor-pointer font-medium gap-3 hover:text-white transition-all duration-300 ease-out"
              key={item.id}
            >
              <li className="w-5">{item.icon}</li>
              <li>{item.name}</li>
            </ul>
          ))}
        </nav>
      </div>
      <div className="mx-4 bg-[#121212] rounded-xl">
        <div className="pl-5 py-3 flex items-center justify-between  cursor-pointer">
          <div className="flex items-center gap-3">
            <LibraryIconSvg />
            <p className="text-gray-400 hover:text-white transition-all duration-300 ease-out font-medium">
              Bibliothèque
            </p>
          </div>
          <div>
            <FontAwesomeIcon
              icon={faPlus}
              className="w-3 mr-4 cursor-pointer text-gray-400"
              onClick={onClickIconPlus}
            />
          </div>
        </div>
      </div>
      <div className="mx-4 my-7 bg-[#121212] rounded-xl">
        <div className="pl-5 py-3 flex items-center justify-between">
          {categories ? (
            <ul className="text-gray-400">
              {categories.map((category) => (
                <li
                  key={category.id}
                  className="flex items-center text-lg gap-3 my-4 cursor-pointer hover:text-white transition-all duration-300"
                >
                  {category.icons.map((icon, index) => (
                    <img
                      key={index}
                      src={icon.url}
                      alt={`Icone pour ${category.name}`}
                      className="w-12 object-cover h-fit"
                    />
                  ))}
                  {category.name}
                </li>
              ))}
            </ul>
          ) : (
            <p>Erreur dans la récupération des données</p>
          )}
        </div>
      </div>
      {authToken ? (
        <div className="mx-4 bg-[#121212] mt-2 mb-2 rounded-xl">
          <div className="pl-5 py-3  cursor-pointer">
            <div className="flex items-center gap-3">
              <div onClick={openModal}>
                <FontAwesomeIcon
                  icon={faRightToBracket}
                  className="w-5 mr-4 cursor-pointer text-gray-400"
                />
              </div>
              <p className="text-gray-400  font-medium">
                <span className="hover:text-white transition-all duration-300 ease-out">
                  {firstname} {name}
                </span>
              </p>
            </div>
          </div>
          <Transition.Root show={open} as={Fragment}>
            <Dialog
              as="div"
              className="fixed z-10 inset-0 overflow-y-auto"
              initialFocus={cancelButtonRef}
              onClose={setOpen}
            >
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                {/* This element is to trick the browser into centering the modal contents. */}
                <span
                  className="hidden sm:inline-block sm:align-middle sm:h-screen"
                  aria-hidden="true"
                >
                  &#8203;
                </span>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start items-center flex w-full justify-center">
                        <div className="mt-3 text-center flex-col flex items-center sm:mt-0 sm:ml-4 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-lg leading-6 font-medium text-gray-900"
                          >
                            Déconnection
                          </Dialog.Title>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              Souhaitez-vous vraiment vous déconnecter ?
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse flex justify-center">
                      <button
                        type="button"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white bg-[#20D760] sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => setOpen(false)}
                      >
                        <a href="/" onClick={onClickDeleteCookies}>
                          Oui
                        </a>
                      </button>
                      <button
                        type="button"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                      >
                        Non
                      </button>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>
        </div>
      ) : (
        <div className="mx-4 bg-[#121212] mt-2 mb-2 rounded-xl">
          <div className="pl-5 py-3  cursor-pointer">
            <div className="flex items-center gap-3">
              <FontAwesomeIcon
                icon={faRightToBracket}
                className="w-5 mr-4 cursor-pointer text-gray-400"
              />
              <p className="text-gray-400  font-medium">
                <Link href="login">
                  <span className="hover:text-white transition-all duration-300 ease-out">
                    Login
                  </span>{" "}
                </Link>
                /
                <Link href="/signup">
                  <span className="hover:text-white transition-all duration-300 ease-out">
                    {" "}
                    Sign up
                  </span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;

"use client";
import { Navigation } from "@/types/Navigation";
import {
  faHouse,
  faMagnifyingGlass,
  faRightToBracket,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LibraryIconSvg from "./svg/LibraryIconSvg";
import { faPlus } from "@fortawesome/pro-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { getCategories } from "@/services/getAllCategories";
import { Categories } from "@/types/Categories";
import Link from "next/link";

const NavBar = () => {
  const [clickedIconPlus, setClickedIconPlus] = useState(false);
  const [categories, setCategories] = useState<Categories["items"]>();

  function onClickIconPlus() {
    setClickedIconPlus(!clickedIconPlus);
  }

  useEffect(() => {
    async function fetchCategories() {
      const categoriesData = await getCategories();
      if (categoriesData) {
        setCategories(categoriesData);
      }
    }
    fetchCategories();
  }, []);

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
      <div className="mx-4 bg-[#121212] mt-2 mb-2 rounded-xl">
        <div className="pl-5 py-3  cursor-pointer">
          <div className="flex items-center gap-3">
            <FontAwesomeIcon
              icon={faRightToBracket}
              className="w-5 mr-4 cursor-pointer text-gray-400"
            />
            <p className="text-gray-400  font-medium">
              <span className="hover:text-white transition-all duration-300 ease-out">
                Login
              </span>{" "}
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
    </div>
  );
};

export default NavBar;

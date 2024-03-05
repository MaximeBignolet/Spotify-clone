"use client";
import { Navigation } from "@/types/Navigation";
import { faHouse, faMagnifyingGlass } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LibraryIconSvg from "./svg/LibraryIconSvg";
import { faPlus } from "@fortawesome/pro-solid-svg-icons";
import { useState } from "react";

const NavBar = () => {
  const [clickedIconPlus, setClickedIconPlus] = useState(false);

  function onClickIconPlus() {
    setClickedIconPlus(!clickedIconPlus);
  }

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
    </div>
  );
};

export default NavBar;

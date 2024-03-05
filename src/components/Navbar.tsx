import { Navigation } from "@/types/Navigation";
import { faHouse, faMagnifyingGlass } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavBar = () => {
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
    <div className="bg-black w-[20vw] h-screen">
      <div className="pt-5">
        <nav className="bg-[#121212] mx-2 flex flex-col gap-5 rounded-xl p-3 pl-4">
          {navItems.map((item) => (
            <ul
              className="text-gray-400 flex items-center cursor-pointer font-medium gap-3"
              key={item.id}
            >
              <li className="w-6">{item.icon}</li>
              <li>{item.name}</li>
            </ul>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default NavBar;

"use client";
import { getNewRelease } from "@/services/getNewRelease";
import { NewReleases } from "@/types/NewReleases";
import { useEffect, useState } from "react";

const NewReleases = () => {
  const [newReleases, setNewReleases] = useState<NewReleases["albums"]>();
  useEffect(() => {
    async function fetchNewReleases() {
      const data = await getNewRelease();
      if (data && data.items) {
        setNewReleases(data);
      }
    }
    fetchNewReleases();
  }, []);
  return (
    <div className="container mx-auto p-10">
      <h2 className="text-white font-medium text-2xl">Nouvelles sorties</h2>
      <div className="flex mt-5 gap-4">
        {newReleases?.items.map((item, index) => (
          <div className="cursor-pointer" key={index}>
            {item.images
              .map((img, index) => (
                <img
                  src={img.url}
                  height={img.height}
                  width={img.width}
                  className="rounded-md"
                  key={index}
                />
              ))
              .slice(0, 1)}
            <ul>
              <li className="text-gray-400 text-sm" key={index}>
                {item.artists.map((artist) => artist.name).join(", ")}
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewReleases;

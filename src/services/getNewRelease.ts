import axios from "axios";
import { getToken } from "./getToken";
import { NewReleases } from "@/types/NewReleases";

export const getNewRelease = async () => {
  const token = await getToken();
  try {
    const resp = await axios.get(
      "https://api.spotify.com/v1/browse/new-releases?limit=7",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return resp.data.albums as NewReleases["albums"];
  } catch (e) {
    console.log(e);
  }
};

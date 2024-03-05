import axios from "axios";
import { getToken } from "./getToken";
import { Categories } from "@/types/Categories";

export const getCategories = async () => {
  const token = await getToken();
  try {
    const resp = await axios.get(
      "https://api.spotify.com/v1/browse/categories?locale=fr_FR&limit=10",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return resp.data.categories.items as Categories["items"];
  } catch (e) {
    console.log(e);
  }
};

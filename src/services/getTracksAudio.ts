import axios from "axios";
import { getToken } from "./getToken";

export const playSpotifyTrack = async () => {
  const token = await getToken(); // Assurez-vous que cette fonction récupère correctement le token d'accès.

  const body = {
    context_uri: "spotify:album:5ht7ItJgpBH7W6vJ5BqpPr", // L'URI de l'album, de la playlist ou de l'artiste à jouer.
    offset: {
      position: 5, // Commence la lecture à partir de la 6ème piste de l'album/contexte spécifié.
    },
    position_ms: 0, // Commence la lecture au début de la piste spécifiée.
  };

  try {
    const response = await axios.put(
      "https://api.spotify.com/v1/me/player/play?device_id=721f1906ffaa80713e9a076da493b700e01b82f1",
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Playback started:", response.data);
  } catch (error: any) {
    console.error("Error starting playback:", error.response.data);
  }
};

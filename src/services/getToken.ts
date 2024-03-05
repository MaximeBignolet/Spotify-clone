import axios from "axios";

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
  "base64"
);
export const getToken = async () => {
  try {
    const resp = await axios.post(
      "https://accounts.spotify.com/api/token",
      "grant_type=client_credentials",
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${credentials}`,
        },
      }
    );
    const token = resp.data.access_token;
    return token;
  } catch (e) {
    console.log(e);
  }
};

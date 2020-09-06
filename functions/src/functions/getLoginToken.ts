import axios from "axios";
const getLoginToken = async () => {
  const { username, password } = process.env;
  if (!username) throw new Error("id not provided");
  if (!password) throw new Error("password not provided");

  const fetched = await axios.post<{
    success: boolean;
    refreshToken: string;
  }>("https://api.dimigo.life/auth/authorize", {
    username,
    password,
  });

  if (fetched.data.success)
    return fetched.headers["set-cookie"][0].split("; ")[0];
};

export default getLoginToken;

import axios from "axios";
import config from "../config/index.js";

const controller = {
  login: async function (req, res) {
    try {
      const { code } = req.body;
      if (!code) {
        throw { status: 400, message: "Required fields can't be empty!" };
      }

      const { data } = await axios.post(
        `https://github.com/login/oauth/access_token`,
        {
          client_id: config.GITHUB_CLIENT_ID,
          client_secret: config.GITHUB_CLIENT_SECRET,
          code,
        },
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      if (data.error) {
        throw { status: 500, message: data.error };
      }

      res.status(200).send(data);
    } catch (err) {
      console.log(err);
      res
        .status(err.status || 500)
        .send(err.message || "Something went wrong!");
    }
  },
};
export default controller;

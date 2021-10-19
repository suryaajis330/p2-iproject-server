const axios = require("axios");
const { OAuth2Client } = require("google-auth-library");
const clientId = process.env.GSIGNIN_CLIENTID;
const client = new OAuth2Client(clientId);

const avatars = axios.create({
  baseURL: "https://avatars.dicebear.com/api/avataaars",
});

const createAvatar = async (req, res, next) => {
  try {
    const { fullName, token } = req.body;
    let name = fullName;

    if (token) {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: clientId,
      });

      const payload = ticket.getPayload();

      const fullNameGoogle = payload.given_name + " " + payload.family_name;

      name = fullNameGoogle;
    }

    const avatarUrl = await avatars({
      url: `/${name}.svg`,
      method: "GET",
      params: {
        size: 50,
      },
    });

    if (!avatarUrl) {
      throw { name: "AvatarError" };
    }

    req.body.imgUrl = avatarUrl.data;

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = createAvatar;

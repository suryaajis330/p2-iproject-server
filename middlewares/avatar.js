const { OAuth2Client } = require("google-auth-library");
const clientId = process.env.GSIGNIN_CLIENTID;
const client = new OAuth2Client(clientId);

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

    let avatarUrl = `https://avatars.dicebear.com/api/avataaars/${name}.svg?size=50`

    req.body.imgUrl = avatarUrl;

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = createAvatar;

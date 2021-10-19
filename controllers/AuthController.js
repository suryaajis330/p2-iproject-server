const { OAuth2Client } = require("google-auth-library");
const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const clientId = process.env.GSIGNIN_CLIENTID;
const client = new OAuth2Client(clientId);

class AuthController {
  static async register(req, res, next) {
    try {
      const { fullName, email, password, phone, address, imgUrl } = req.body;

      const response = await User.create({
        fullName,
        email,
        password,
        role: "Customer",
        imgUrl,
        phone,
        address,
      });

      const result = {
        fullName: response.fullName,
        email: response.email,
        role: response.role,
        imgUrl: response.imgUrl,
        phone: response.phone,
        address: response.address,
      };

      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const response = await User.findOne({
        where: {
          email,
        },
      });

      if (!response) {
        throw { name: "InvalidInput" };
      }

      if (!comparePassword(password, response.password)) {
        throw { name: "InvalidInput" };
      }

      const payload = {
        id: response.id,
        email: response.email,
        role: response.role,
        imgUrl: response.imgUrl,
        phone: response.phone,
        address: response.address,
      };

      const token = signToken(payload);

      res.status(200).json({ access_token: token });
    } catch (err) {
      next(err);
    }
  }

  static async loginGoogle(req, res, next) {
    try {
      const { token, imgUrl } = req.body;
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: clientId,
      });

      const payload = ticket.getPayload();

      const fullNameGoogle = payload.given_name + " " + payload.family_name;
      const emailGoogle = payload.email;

      const [user, isCreated] = await User.findOrCreate({
        where: { email: emailGoogle },
        defaults: {
          fullName: fullNameGoogle,
          password: Math.random().toString(36).slice(-8),
          role: "Customer",
        },
      });

      let dataUser = {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        imgUrl
      };

      const tokenFromServer = signToken(dataUser);

      res.status(200).json({ access_token: tokenFromServer });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AuthController;

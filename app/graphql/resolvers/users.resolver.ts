import { UserInputError } from "apollo-server";
import * as bcrypt from "bcryptjs";

import User from "../../models/User.model";
import { validationRegister, validationLogin, generateToken } from "../../utils";

import { IArgRegisterInput, StringObject, IUserWithToken } from "../../types";

export default {
  Query: {
    getUsers: () =>
      User.find()
        .then((res) => res)
        .catch(console.error)
  },

  Mutation: {
    register: async (_: any, { registerInput }: IArgRegisterInput): Promise<IUserWithToken> => {
      const { username, password, confirmPassword, email } = registerInput;

      const { errors, isValid } = validationRegister(username, password, confirmPassword, email);

      if (!isValid) {
        throw new UserInputError("Errors", { errors });
      }

      const user = await User.findOne({ username });

      if (user) {
        throw new UserInputError("This username is taken", {
          errors: {
            username: "This username is taken"
          }
        });
      }

      const hashedPass = await bcrypt.hash(password, 12);

      const newUser = new User({
        username,
        email,
        createdAt: new Date().toISOString(),
        password: hashedPass
      });

      const res: any = await newUser.save();

      const token = generateToken(res);

      return {
        ...res._doc,
        token,
        id: res._id
      };
    },

    login: async (_: any, { username, password }: StringObject): Promise<IUserWithToken> => {
      const { errors, isValid } = validationLogin(username, password);

      if (!isValid) {
        throw new UserInputError("Errors", { errors });
      }

      const user: any = await User.findOne({ username });

      if (!user) {
        errors.general = "User not found!";
        throw new UserInputError("User not found", { errors });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        errors.general = "wrong credentials!";
        throw new UserInputError("Wrong credentials", { errors });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token
      };
    }
  }
};

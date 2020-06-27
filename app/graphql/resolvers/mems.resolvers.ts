import Mem from "../../models/Mem.model";
import User from "../../models/User.model";

import { IArgMemInfo, IArgsGetMemes, IMem } from "app/types";
import { ES } from "../../utils";

export default {
  Query: {
    getMemes: (_: any, { author, ...args }: IArgsGetMemes) =>
      Mem.find(author === "all" ? {} : { author })
        .sort({ createdAt: -1 })
        .skip(args.offset)
        .limit(args.limit)
        .populate("author", "username")
        .then((res) => res)
        .catch((err) => console.dir(err)),

    addToES: () => {
      Mem.find()
        .populate({ path: "author", select: "username" })
        .then((res) => {
          console.log(res);
          ES.addMemesToIndexBulk(res);

          return true;
        })
        .catch(console.error);
    }
  },

  Mutations: {
    addNewMem: async (_: any, args: IArgMemInfo): Promise<IMem> => {
      const { file, name, internalUrl, memSrc, createdAt, author, tags } = args;

      const res = await Mem.uploadFileToAWS(internalUrl, file);

      const newMem = new Mem({
        file: res.Location,
        name,
        memSrc,
        createdAt,
        author,
        tags
      });

      const user = (await User.findById(author)) || null;
      const formatedUser = user ? { _id: author, username: user.username } : null;

      await ES.addMemeToES(newMem, formatedUser);

      await newMem.save();

      return newMem;
    }
  }
};

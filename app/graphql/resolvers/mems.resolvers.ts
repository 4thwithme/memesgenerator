import * as mongoose from "mongoose";

import Mem from "../../models/Mem.model";
import User from "../../models/User.model";

import { IArgMemInfo, IArgsGetMemes, IMem } from "app/types";
import { ES } from "../../utils";

export default {
  Query: {
    getMemes: (_: any, { author, ...args }: IArgsGetMemes): Promise<void | IMem[]> =>
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
          ES.addMemesToIndexBulk(res);

          return true;
        })
        .catch(console.error);
    },

    searchMemes: async (
      _: any,
      { query, limit, offset }: { query: string; limit: number; offset: number }
    ) => {
      const res: IMem[] = await ES.searhMemes(query, limit, offset);

      const ids = res.map((item) => mongoose.Types.ObjectId(item._id));

      return await Mem.find()
        .where("_id")
        .in(ids)
        .populate({ path: "author", select: "username" });
    }
  },

  Mutations: {
    addNewMem: async (_: any, args: IArgMemInfo): Promise<IMem> => {
      const { file, name, externalUrl, memSrc, createdAt, author, tags } = args;

      const res = await Mem.uploadFileToAWS(externalUrl, file);

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
    },

    uploadFromUrlToAmazon: async (
      _: any,
      { externalUrl }: { externalUrl: string }
    ): Promise<{ url: string }> => {
      const res = await Mem.uploadFileToAWS(externalUrl, null);

      return { url: res.Location };
    }
  }
};

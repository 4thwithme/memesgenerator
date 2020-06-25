import Mem from "../../models/Mem.model";

import { IArgMemInfo, IArgsGetMemes } from "app/types";

export default {
  Query: {
    getMemes: (_: any, { author, ...args }: IArgsGetMemes) =>
      Mem.find(author === "all" ? {} : { author })
        .sort({ createdAt: -1 })
        .skip(args.offset)
        .limit(args.limit)
        .populate("author", "username")
        .then((res) => res)
        .catch((err) => console.dir(err))
  },

  Mutations: {
    addNewMem: async (_: any, args: IArgMemInfo): Promise<{ res: boolean }> => {
      const { file, name, internalUrl, memSrc, createdAt, author, tags } = args;

      Mem.uploadFileToAWS(internalUrl, file, async (res: any) => {
        const newMem = new Mem({
          file: res.Location,
          name,
          memSrc,
          createdAt,
          author,
          tags
        });

        await newMem.save();
      });

      return { res: true };
    }
  }
};

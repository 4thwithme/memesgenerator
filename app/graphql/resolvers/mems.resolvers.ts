import Mem from "../../models/Mem.model";

import { IArgMemInfo, IArgsGetMemes } from "app/types";

export default {
  Query: {
    getMemes: (_: any, args: IArgsGetMemes) =>
      Mem.find({ authorId: args.authorId })
        .skip(args.offset)
        .limit(args.limit)
        .then((res) => res)
        .catch(console.error)
  },

  Mutations: {
    addNewMem: async (_: any, args: IArgMemInfo): Promise<{ res: boolean }> => {
      const { file, name, internalUrl, memSrc, createdAt, authorId, tags } = args;

      Mem.uploadFileToAWS(internalUrl, file, async (res: any) => {
        const newMem = new Mem({
          file: res.Location,
          name,
          memSrc,
          createdAt,
          authorId,
          tags
        });

        await newMem.save();
      });

      return { res: true };
    }
  }
};

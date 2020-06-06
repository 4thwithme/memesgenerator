import * as mongoose from "mongoose";
import * as fs from "fs";
import * as https from "https";

import { IMem, IMemModel } from "../types";
import { awsHelper } from "../utils";

const { model, Schema } = mongoose;

const DEST = __dirname + "/../uploads/temp.jpg";

const MemSchema = new Schema({
  file: { type: String, required: true },
  name: { type: String, required: true },
  memSrc: { type: String, required: true },
  createdAt: { type: String, required: true },
  authorId: { type: Schema.Types.ObjectId || null, required: true },
  tags: [{ type: String, required: true }]
});

MemSchema.statics.uploadFileToAWS = (
  internalUrl: string | null,
  file: any,
  callback: (a: object) => void
): void => {
  if (internalUrl) {
    console.log(internalUrl);
    const file = fs.createWriteStream(DEST);

    const request = https.get(internalUrl, (response) => {
      if (response.statusCode !== 200) {
        return console.error(response.statusCode);
      }

      response.pipe(file);
    });

    file.on("finish", () =>
      awsHelper.uploadFile(DEST, (res) => {
        callback(res);
        file.close();
      })
    );

    request.on("error", (err) => {
      fs.unlink(DEST, console.error);
      return console.error(err.message);
    });
  } else {
    const base = file.split("base64,")[1];

    fs.writeFile(DEST, base, { encoding: "base64" }, async (err) => {
      if (err) {
        console.error(err);
      }

      awsHelper.uploadFile(DEST, (res) => {
        callback(res);
      });
    });
  }
};

export default model<IMem, IMemModel>("Mem", MemSchema);
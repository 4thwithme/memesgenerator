import * as fs from "fs";
import * as AWS from "aws-sdk";
import { SECRET, ID, BUCKET, REGION } from "../config/awsConfig";

AWS.config.update({
  secretAccessKey: SECRET,
  accessKeyId: ID,
  region: REGION
});

const s3 = new AWS.S3();

const uploadFile = (path: string, callback: (res: object) => void): void => {
  const fileContent = fs.readFileSync(path);

  const params = {
    Bucket: BUCKET,
    Key: `${Date.now()}-${(Math.random() * 100000000000).toFixed(0)}.jpg`, // File name you want to save as in S3
    Body: fileContent,
    ACL: "public-read"
  };

  s3.upload(params, (err: Error, data: any) => {
    if (err) throw err;

    fs.unlink(path, (err) => {
      if (err) console.error(err);

      console.log("Temp File Delete");
    });

    callback(data);
  });
};

export default {
  uploadFile
};

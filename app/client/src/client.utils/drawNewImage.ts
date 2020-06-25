import { createImage } from ".";

import { ICroppedAreaPixels, IMemText } from "../client.types";
import { splitLinesForCanvas } from ".";

export default async function(
  imageSrc: string,
  imageParams: {
    width: number;
    height: number;
  },
  cropInfo: ICroppedAreaPixels,
  textArr: IMemText[]
) {
  const image: HTMLImageElement = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  console.log(
    "image width, height",
    image.width,
    image.naturalWidth,
    image.height,
    image.naturalHeight,
    "cropInfo",
    cropInfo
  );

  const widthMultiplicator = +(image.width / imageParams.width);
  const heightMultiplicator = +(image.height / imageParams.height);

  canvas.width = cropInfo.width * widthMultiplicator || image.width;
  canvas.height = cropInfo.height * heightMultiplicator || image.height;

  console.log("multiplicators x, y:", widthMultiplicator, heightMultiplicator);

  //draw img croped area size
  if (ctx) {
    ctx.drawImage(
      image,
      -(cropInfo.x * widthMultiplicator) || 0,
      -(cropInfo.y * heightMultiplicator) || 0
    );

    textArr.length &&
      textArr.forEach((item) => {
        ctx.fillStyle = item.color;
        ctx.font = `bold ${+item.fontSize * widthMultiplicator}px/1 Arial, sans-serif`;

        splitLinesForCanvas(
          ctx,
          item.text,
          (item.coords.x - cropInfo.x) * widthMultiplicator,
          (item.coords.y - cropInfo.y) * heightMultiplicator + Number(+item.fontSize),
          item.maxWidth * widthMultiplicator * heightMultiplicator + 30,
          Number(+item.fontSize)
        );
      });
  }

  // // As Base64 string
  // return canvas.toDataURL("image/jpeg");

  // // As a blob
  // return new Promise((resolve) => {
  //   canvas.toBlob((file) => {
  //     resolve(file);
  //   }, "image/jpeg");
  // });

  return new Promise((resolve) => {
    canvas.toBlob((file) => {
      resolve({ file: canvas.toDataURL("image/jpeg"), url: URL.createObjectURL(file) });
    }, "image/jpeg");
  });
}

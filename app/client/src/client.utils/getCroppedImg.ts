import { ICroppedAreaPixels } from "../client.types";

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();

    image.src = url.startsWith("blob") ? url : url + "?" + Date.now();
    image.setAttribute("crossOrigin", "");

    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
  });

export default async function(imageSrc: string, pixelCrop: ICroppedAreaPixels) {
  const image: HTMLImageElement = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const safeArea = Math.max(image.width, image.height) * 2;
  canvas.width = safeArea;
  canvas.height = safeArea;

  if (ctx) {
    ctx.translate(safeArea / 2, safeArea / 2);
    ctx.translate(-safeArea / 2, -safeArea / 2);
    ctx.fillStyle = "#ffffff";

    ctx.drawImage(image, safeArea / 2 - image.width * 0.5, safeArea / 2 - image.height * 0.5);

    const data = ctx.getImageData(0, 0, safeArea, safeArea);

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.putImageData(
      data,
      0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x,
      0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y
    );
  }

  // As Base64 string
  // return canvas.toDataURL("image/jpeg");

  // As a blob
  return new Promise((resolve) => {
    canvas.toBlob((file) => {
      resolve(file);
    }, "image/jpeg");
  });
}

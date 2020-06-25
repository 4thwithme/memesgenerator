export default (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();

    image.src = url.startsWith("blob") ? url : url + "?" + Date.now();
    image.setAttribute("crossOrigin", "");

    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
  });

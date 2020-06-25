export default (
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  fontSize: number
) => {
  const words = text.split(" ");
  let line = "";

  let currentHeight = y;

  for (let n = 0; n < words.length; n++) {
    const testLine = words.length - n === 1 ? line + words[n] : line + words[n] + " ";

    const testWidth = +context.measureText(testLine).width.toFixed(1);

    if (testWidth > +maxWidth.toFixed(1)) {
      context.fillText(line, x, currentHeight);

      line = words[n] + " ";
      currentHeight += fontSize;
    } else {
      line = testLine;
    }
  }

  context.fillText(line, x, currentHeight);
};

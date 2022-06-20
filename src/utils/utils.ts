import sharp from "sharp";
const resize = async (
  filePath: string,
  width: number,
  height: number,
  thumpPath: string
): Promise<void> => {
  await sharp(filePath)
    .resize({
      width: width,
      height: height,
    })
    .toFile(thumpPath);
};

export default resize;

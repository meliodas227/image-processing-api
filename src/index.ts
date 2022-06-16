import express from "express";
import fs from "fs";
import path from "path";
import sharp from "sharp";

const app = express();
const port = 3000;

app.get("/resize", async (req, res) => {
  const width = req.query.width as string,
    height = req.query.height as string;
  const imageName = req.query.name + "_" + height + "_" + width;
  const filePath = path.join(
    __dirname,
    "..",
    "images",
    req.query.name + ".jpg"
  );
  const thumpPath = path.join(
    __dirname,
    "..",
    "thump-images",
    imageName + ".jpg"
  );
  if (fs.existsSync(thumpPath)) {
    res.sendFile(thumpPath);
  } else {
    await sharp(filePath)
      .resize({
        width: parseInt(width),
        height: parseInt(height),
      })
      .toFile(thumpPath);
    res.sendFile(thumpPath);
  }
});

app.listen(port, () => {
  console.log("app is running in port 3000");
});

export default app;

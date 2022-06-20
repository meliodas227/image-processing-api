import supertest from "supertest";
import app from "../index";
import fs from "fs";
import path from "path";

const request = supertest(app);

describe("is image exist", () => {
  it("is image saved in thump-images", async () => {
    if(fs.existsSync(
        path.join(
            __dirname,
            "..",
            "..",
            "thump-images",
            "icelandwaterfall_550_550.jpg"
          )
    )){
        fs.unlink(
            path.join(
                __dirname,
                "..",
                "..",
                "thump-images",
                "icelandwaterfall_550_550.jpg"
              ),()=>{}
        )
    }
    await request.get("/resize?name=icelandwaterfall&height=550&width=550");
    expect(
      fs.existsSync(
        path.join(
          __dirname,
          "..",
          "..",
          "thump-images",
          "icelandwaterfall_550_550.jpg"
        )
      )
    ).toBe(true);
  });
});

describe("Testing responses", () => {
  it("getting api endpoint", async () => {
    if(fs.existsSync(
        path.join(
            __dirname,
            "..",
            "..",
            "thump-images",
            "icelandwaterfall_550_550.jpg"
          )
    )){
        fs.unlink(
            path.join(
                __dirname,
                "..",
                "..",
                "thump-images",
                "icelandwaterfall_550_550.jpg"
              ),()=>{}
        )
    }
    const response = await request.get(
      "/resize?name=icelandwaterfall&height=550&width=550"
    );
    expect(response.status).toBe(200);
  });
  it("bad request if width or height not number", async () => {
    const response = await request.get(
      "/resize?name=icelandwaterfall&height=550abc&width=550"
    );
    expect(response.status).toBe(400);
  });
  it("bad request if width or height value is less than or equal 0", async () => {
    const response = await request.get(
      "/resize?name=icelandwaterfall&height=0&width=550"
    );
    expect(response.status).toBe(400);
  });
  it("file not found", async () => {
    const response = await request.get("/resize?name=&height=550&width=550");
    expect(response.status).toBe(404);
  });
});

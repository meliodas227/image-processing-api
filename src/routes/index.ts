import { Router } from "express";
import resize_routes from "./api/resize";

const routes = Router();

routes.get("/", (req, res):void => {
  res.send(
    "Welcome to resize api please use resize route with name,width,hieght quiries."
  );
});

routes.use("/resize", resize_routes);

export default routes;

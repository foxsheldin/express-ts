import express from "express";
import fileUpload from "express-fileupload";
import router from "../routes/post.routes";

export const app = express();

app.use(express.json());
app.use(express.static("static"));
app.use(fileUpload());

app.use("/api", router);

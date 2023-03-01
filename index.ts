import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { app } from "./src/configs/app.config";

const PORT = 5000;

dotenv.config();

async function startApp() {
  try {
    await mongoose.connect(process.env.EXPRESS_APP_DB_URL as string);
    app.listen(PORT, () => console.log("Server started on port " + PORT));
  } catch (error) {
    console.log(error);
  }
}

startApp();

import app from "./app.js";
import appConfig from "./app/appConfig/index.js";
import mongoose from "mongoose";
import { LeadModel } from "./app/module/Lead/lead.model.js";

// let server: Server;
const PORT = appConfig.port || 5000;

async function main() {
  try {
    await mongoose.connect(appConfig.mongodb_url as string);
    app.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}`);
    });

  } catch (error) {
    console.log(error);
  }
}
main();

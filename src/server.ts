import app from "./app.js";
import appConfig from "./app/appConfig/index.js";
import mongoose from "mongoose";
import { LeadModel } from "./app/module/Lead/lead.model.js";
// import mongoose from "mongoose";

// let server: Server;
const PORT = appConfig.port || 5000;

async function main() {
  try {
    await mongoose.connect(appConfig.mongodb_url as string);


    await LeadModel.updateMany(
      { userId: { $exists: false } },
      {
        $set: {
          userId: new mongoose.Types.ObjectId("6a083ec119c78659922d79cb")
        }
      }
    );
    app.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}`);
    });

  } catch (error) {
    console.log(error);
  }
}
main();

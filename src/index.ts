import app from "./app.js";
import appConfig from "./app/appConfig/index.js";
import mongoose from "mongoose";


async function main(){

  await mongoose.connect(appConfig.mongodb_url as string);

  app.listen(appConfig.port || 5000, ()=>{
    console.log("Server running");
  });

}

main();
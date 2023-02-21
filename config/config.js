import dotenv from 'dotenv'
dotenv.config()
if (process.env.NODE_ENV == "prod") {
  console.log(process.env.NODE_ENV);
  dotenv.config({ path: ".env" });
} else{
    console.log(process.env.NODE_ENV);
    dotenv.config({ path: ".env.dev" });
}
export let DB_URL = process.env.MONGO_URL
import chalk from "chalk";
import app from "./app.js";
import dbConnection from "./config/db.js";
import { env } from "./config/env.js";

dbConnection();

app.listen(env.PORT, () => {
  console.log(
    `Server is running on port http://localhost:${chalk.bgGreen.white(env.PORT)}/`,
  );
});

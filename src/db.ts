import { DataSource } from "typeorm";

export default new DataSource({
  type: "sqlite",
  database: "checkpoint-2.sqlite",
  entities: ["src/entities/*.ts"],
  synchronize: true,
  //   logging: true, /*To log sql queries*/
});

import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import createApolloGraphqlServer from "./graphql";
import UserService from "./services/user";

config();

async function init() {
  const app = express();
  const port = Number(process.env.PORT) || 3000;

  app.get("/", (_req, res) => {
    res.send("hello from server");
  });

  const gqlServer = await createApolloGraphqlServer();
  app.use("/graphql", cors(), express.json(), expressMiddleware(gqlServer, {
  context: async ({ req }) => {
    // @ts-ignore
    const token = req.headers['token'];
    try {
      const decoded = UserService.decodeJwtToken(token as string);
      let user = null;
      if (decoded && typeof decoded === 'object' && 'id' in decoded) {
        user = await UserService.getUserById((decoded as any).id);
      }
      return { user };
    } catch (error) {
      return {};
    }
  }
}));

  app.listen(port, () => {
    console.log(`http://localhost:3000/graphql`);
  });
}

init();

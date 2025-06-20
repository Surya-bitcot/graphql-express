"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const cors_1 = __importDefault(require("cors"));
const express4_1 = require("@apollo/server/express4");
const graphql_1 = __importDefault(require("./graphql"));
const user_1 = __importDefault(require("./services/user"));
(0, dotenv_1.config)();
async function init() {
    const app = (0, express_1.default)();
    const port = Number(process.env.PORT) || 3000;
    app.get("/", (_req, res) => {
        res.send("hello from server");
    });
    const gqlServer = await (0, graphql_1.default)();
    app.use("/graphql", (0, cors_1.default)(), express_1.default.json(), (0, express4_1.expressMiddleware)(gqlServer, {
        context: async ({ req }) => {
            // @ts-ignore
            const token = req.headers['token'];
            try {
                const user = user_1.default.decodeJwtToken(token);
                return { user }; // <-- Wrap in object
            }
            catch (error) {
                return {};
            }
        }
    }));
    app.listen(port, () => {
        console.log(`http://localhost:3000/graphql`);
    });
}
init();

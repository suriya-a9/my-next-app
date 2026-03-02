require("dotenv").config();
const next = require("next");
const express = require("express");
const connectDB = require("./app/lib/db");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const ItemRouter = require("./app/routes/itemRoutes");

app.prepare().then(async () => {
    const server = express();

    await connectDB();

    server.use(express.json());

    server.use("/api/item", ItemRouter);
    server.use((req, res) => {
        return handle(req, res);
    });
    server.listen(3000, () =>
        console.log("Running on http://localhost:3000")
    );
});
import express from "express";
import { connectDatabase } from "./utils/prisma.util.js";

const app = express();

await connectDatabase();
app.listen(3000, () => {
    console.log("?");
});

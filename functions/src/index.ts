import * as functions from "firebase-functions";

import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { router } from "./router";

const server = express();
server.use(express.json());
console.log("Holy Shit!");
server.use(express.static("audios"));
server.use("/", router);
server.get("/", (req, res) => res.send("Welcome to FCF"));

export const app = functions.https.onRequest(server);

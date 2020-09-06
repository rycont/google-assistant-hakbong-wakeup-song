import {
  textResponseWithAudio,
  getHuizinTIme,
  getMusicChart,
} from "../functions";
import { Request, Response } from "express";

const dialogflowFulfillment = async (req: Request, res: Response) => {
  console.log(req.headers.host);
  const songInfo = await getMusicChart();
  res.json(
    textResponseWithAudio(getHuizinTIme(new Date()), {
      coverUri: songInfo.thumbnail.split("?")[0],
      description: songInfo.artist,
      name: songInfo.title,
      uri: `https://${req.headers.host}/${
        process.env.FIREBASE_DEV ? "dimigolife-wakeupsong/us-central1" : ""
      }/app/todayAudio`,
    })
  );
};

export default dialogflowFulfillment;

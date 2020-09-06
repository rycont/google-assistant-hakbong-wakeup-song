import { Request, Response } from "express";
import { bucket } from "../storage";
import { downloadTodayMp3 } from "../functions";
import { APP_NAME } from "../constants";

const getTodayAudio = async (req: Request, res: Response) => {
  console.log("loading audio");
  const d = new Date();
  const filename = `${d.getMonth() + 1}${d.getDate()}.mp3`;
  if (!(await bucket.file(filename).exists())[0])
    await downloadTodayMp3(d, filename);
  console.log(
    `https://firebasestorage.googleapis.com/v0/b/${APP_NAME}.appspot.com/o/${filename}?alt=media`
  );
  res.redirect(
    `https://firebasestorage.googleapis.com/v0/b/${APP_NAME}.appspot.com/o/${filename}?alt=media`
  );
};

export default getTodayAudio;

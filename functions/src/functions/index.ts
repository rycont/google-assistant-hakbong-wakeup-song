import ffmpegPath from "ffmpeg-static";
import ffmpeg from "fluent-ffmpeg";
import ytdl from "ytdl-core";
import axios from "axios";
import youtubeSearch from "yt-search";
import { lifeCookie, bucket } from "../storage";
import os from "os";
import { join } from "path";

export const getMusicChart = async (): Promise<{
  rank: number;
  id: number;
  title: string;
  artist: string;
  aid: number;
  album: string;
  thumbnail: string;
}> =>
  (
    await axios.get("https://api.dimigo.life/music/chart?limit=1&gender=M", {
      headers: {
        Cookie: await lifeCookie,
      },
    })
  ).data.data.list[0];
export const getChart1stYoutubeid = async () => {
  return (await youtubeSearch((await getMusicChart()).title)).videos[0].videoId;
};
export const downloadTodayMp3 = async (d: Date, filename: string) => {
  console.log("Downloading Audio");
  const videoId = await getChart1stYoutubeid();
  const outputPath = join(os.tmpdir(), filename);
  console.log(videoId);
  await new Promise((res, rej) => {
    ffmpeg(
      ytdl(`https://www.youtube.com/watch?v=${videoId}`, {
        filter: (format) => format.container === "mp4",
      })
    )
      .setFfmpegPath(ffmpegPath)
      .toFormat("mp3")
      .output(outputPath)
      .on("end", () => {
        console.log("Downloaded!");
        res();
      })
      .run();
  });
  return await bucket.upload(outputPath);
};
export const getHuizinTIme = (d: Date) => {
  const pronounceNumber = [
    "공",
    "일",
    "이",
    "삼",
    "사",
    "오",
    "육",
    "칠",
    "팔",
    "구",
  ];
  const heizinHour = [...(d.getHours() + "").padStart(2, "0")].map(
    (e) => pronounceNumber[+e]
  );
  const minute = d.getMinutes() + "";
  return {
    textToSpeech: `현재시각. ${heizinHour.join(
      "."
    )}시. ${d.getMinutes()}분입니다. 리잠자지 마시고오. 등교준비하시길 바랍니다.`,
    displayText: `현재시각 ${d.getHours()}시 ${d.getMinutes()}분입니다. 리잠자지 마시고 등교준비하시길 바랍니다.`,
  };
};

export const textResponseWithAudio = (
  text: {
    displayText: string;
    textToSpeech: string;
  },
  audio: {
    uri: string;
    description: string;
    name: string;
    coverUri: string;
  }
) => ({
  payload: {
    google: {
      expectUserResponse: true,
      richResponse: {
        items: [
          {
            simpleResponse: text,
          },
          {
            mediaResponse: {
              mediaType: "AUDIO",
              mediaObjects: [
                {
                  contentUrl: audio.uri,
                  description: audio.description,
                  icon: {
                    url: audio.coverUri,
                    accessibilityText: `Album cover of the ${audio.name}`,
                  },
                  name: audio.name,
                },
              ],
            },
          },
        ],
        suggestions: [
          {
            title: "Basic Card",
          },
        ],
      },
    },
  },
});

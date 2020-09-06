import getLoginToken from "./functions/getLoginToken";
import fbAdmin from "firebase-admin";
import { APP_NAME } from "./constants";

export const AUDIOFILE_LOCATION = __dirname;
export const lifeCookie = getLoginToken();

fbAdmin.initializeApp();
export const bucket = fbAdmin.storage().bucket(`${APP_NAME}.appspot.com`);

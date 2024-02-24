import { NextRequest, NextResponse } from "next/server";
import { getIdVideo } from "./helpers";
import {
  IResponseGetVideoInf,
  IDataResponseVideoInf,
  ResponseJSON,
} from "./interface";

const API_URL =
  "https://api16-normal-c-useast1a.tiktokv.com/aweme/v1/feed/?aweme_id=";

const headers = new Headers();
headers.append(
  "User-Agent",
  "TikTok 26.2.0 rv:262018 (iPhone; iOS 14.4.2; en_US) Cronet"
);

/**
 *
 * @returns IResponseGetVideoInf
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get("url");

    if (!url) {
      return NextResponse.json<ResponseJSON<null>>({
        data: null,
        message: "Video URL is required",
        status: 400,
      });
    }

    const idVideo = getIdVideo(url);

    const res = await fetch(API_URL + idVideo, {
      method: "GET",
      headers,
    });

    const videoInf: IResponseGetVideoInf = await res.json();

    const data: IDataResponseVideoInf = {
      desc: videoInf.aweme_list[0].desc,
      cover: videoInf.aweme_list[0].video.cover.url_list[0],
      duration: videoInf.aweme_list[0].video.duration,
      downloadUrl: videoInf.aweme_list[0].video.play_addr.url_list[0],
    };

    return NextResponse.json<ResponseJSON<IDataResponseVideoInf>>({
      data,
      message: "",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json<ResponseJSON<null>>({
      data: null,
      message: "Network error",
      status: 500,
    });
  }
}

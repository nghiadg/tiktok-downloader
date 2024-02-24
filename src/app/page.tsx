"use client";
import { AppButton } from "@/components/base";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { IDataResponseVideoInf, ResponseJSON } from "./api/videos/interface";

const Home = () => {
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [videoInf, setVideoInf] = useState<IDataResponseVideoInf>();
  const [loading, setLoading] = useState<boolean>(false);
  const [downloading, setDownloading] = useState<boolean>(false);

  const changeVideoUrl = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setVideoUrl(e.target.value);
    },
    []
  );

  const getVideoInf = useCallback(async () => {
    try {
      setLoading(true);
      // Validate url before call API
      const url = new URL(videoUrl);
      if (url.hostname !== "www.tiktok.com") {
        throw new Error("URL is wrong.");
      }

      const res = await fetch(
        "/api/videos?" +
          new URLSearchParams({
            url: videoUrl,
          }),
        {
          method: "GET",
        }
      );

      const data: ResponseJSON<IDataResponseVideoInf> = await res.json();

      if (data.status !== 200) {
        setErrorMsg(data.message);
        return;
      }

      setVideoInf(data.data);
      setErrorMsg("");
    } catch (error) {
      console.error(error);
      setErrorMsg("Oop! Something is wrong, maybe that is url.");
    } finally {
      setLoading(false);
    }
  }, [videoUrl]);

  const handleDownloadVideo = useCallback(async () => {
    try {
      setDownloading(true);
      if (!videoInf?.downloadUrl) {
        return;
      }

      await fetch(videoInf.downloadUrl)
        .then((res) => res.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const hyperlink = document.createElement("a");
          hyperlink.href = url;
          hyperlink.download = "video.mp4";
          hyperlink.click();
          window.URL.revokeObjectURL(url);
        });
    } catch (error) {
      console.error(error);
    } finally {
      setDownloading(false);
    }
  }, [videoInf?.downloadUrl]);

  return (
    <div className="pt-14">
      <div className="text-center">
        <h1 className="font-bold text-4xl">
          <span className="text-primary">TikTok&nbsp;</span>
          Video Downloader
        </h1>
        <div className="my-4">
          Try this unique tool for quick, hassle-free downloads from TikTok.
        </div>
        <div>
          Note: We do not allow/support the download of copyrighted material!
        </div>
      </div>

      <div className="flex justify-center">
        <div>
          <div className="rounded-md p-1 pl-4 shadow-c0 flex items-stretch gap-4 mt-20 w-[46rem]">
            <div className="flex-1">
              <input
                type="text"
                className="h-full w-full outline-none"
                value={videoUrl}
                onChange={changeVideoUrl}
              />
            </div>
            <AppButton loading={loading} onClick={getVideoInf}>
              {loading ? "Getting..." : "Get Video"}
            </AppButton>
          </div>
          <div className="text-sm text-red-600 mt-1">{errorMsg}</div>
        </div>
      </div>
      <div className="text-center my-9">
        By using our service you accept our
        <span className="text-primary">&nbsp;Terms of Service&nbsp;</span> and
        <span className="text-primary">&nbsp;Privacy Policy&nbsp;</span>
      </div>
      {videoInf ? (
        <div className="flex justify-center">
          <div className="h-32 p-2 shadow-c0 flex gap-2 w-[34rem]">
            <div className="relative h-full w-full">
              <Image
                src={videoInf?.cover ?? ""}
                alt="cover"
                className="rounded-md"
                fill={true}
                objectFit="cover"
              />
            </div>

            <div className="flex flex-col items-end justify-between">
              <div className="line-clamp-2">{videoInf?.desc}</div>
              <AppButton loading={downloading} onClick={handleDownloadVideo}>
                {downloading ? "Downloading" : "Download"}
              </AppButton>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Home;

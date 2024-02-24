export const getIdVideo = (url: string) => {
  const matching = url.includes("/video/");

  if (!matching) {
    // Url is wrong
  }

  // TikTok ID is usually 19 characters long and sits after /video/
  let idVideo = url.substring(
    url.indexOf("/video/") + 7,
    url.indexOf("/video/") + 26
  );
  return idVideo.length > 19
    ? idVideo.substring(0, idVideo.indexOf("?"))
    : idVideo;
};

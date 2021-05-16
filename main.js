function decodeIReal(link) {
  // decode the URL ASCII format and remove the link prefix
  const decoded = decodeURIComponent(link.replace(/irealb\w*:\/\//, ""));
  // check if it's a playlist and get the playlist's name
  const playlist = decoded.includes("===")
    ? decoded.substr(decoded.lastIndexOf("===") + 3)
    : undefined;
  //separate the songs and data
  const data = decoded.split("===").map((song) => {
    let data = song.split("=");
    let x = data.filter((value) => value != "");

    return {
      name: x[0],
      artist: x[1],
      style: x[2],
      ...(x[6] != 0 ? { tempo: x[6] } : {}),
      ...(playlist ? { playlist: playlist } : {}),
    };
  });
  return playlist ? data.slice(0, -1) : data;
}

module.exports = decodeIReal;

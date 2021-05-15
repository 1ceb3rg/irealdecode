function decodeIReal(link) {
  const decoded = decodeURIComponent(link.replace(/irealb\w*:\/\//, ""));
  const isPlaylist = decoded.includes("===");
  const data = decoded.split("===").map((song) => {
    let data = song.split("=");
    let x = data.filter(
      (value) => value != undefined && value !== null && value !== ""
    );
    return { name: x[0], artist: x[1], style: x[2], tempo: x[6] };
  });
  return isPlaylist ? data.slice(0, -1) : data;
}

module.exports = decodeIReal;

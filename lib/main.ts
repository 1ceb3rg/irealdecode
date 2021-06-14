

 type Note = "A" | "B" | "C" | "D" | "E" | "F" | "G";
 type Sign= ""|"b"|"#"
 type Tonality= ""|"-"
 type Key= `${Note}${Sign}${Tonality}`

interface IReal {
  ireallink: string;
  name: string;
  artist: string;
  style: string;
  key: Key;
  tempo: string;
  playlist?: string;
  playbackStyle:string;
  playbackNumTimes:string;
  changes:string;

}

const fixedEncodeURIComponent = (string:string): string => {
  return encodeURIComponent(string).replace(/[!'()*]/g, (c) => {
      return '%' + c.charCodeAt(0).toString(16);
  });
}
export function encodeIreal(ireal:IReal ){

return `irealb://${fixedEncodeURIComponent(ireal.name)}=${fixedEncodeURIComponent(ireal.artist)}==${fixedEncodeURIComponent(ireal.style)}=${fixedEncodeURIComponent(ireal.key)}==${fixedEncodeURIComponent(ireal.changes)}=${encodeURIComponent(ireal.playbackStyle)}=${+ireal.tempo}=${+ireal.playbackNumTimes}
`
;
}


export function decodeIreal(link:string) {
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
      ireallink:"irealb://"+fixedEncodeURIComponent(song),
      artist: x[1],
      style: x[2],
      key:x[3],
      changes:x[4],
      playbackStyle:x[5],
     tempo: x[6],
      ...(playlist ? { playlist: playlist } : {}),
      playbackNumTimes:x[7]
    } as IReal;
  });
  return playlist ? data.slice(0, -1) : data;
}


import { IReal, IRealPlaylist, Key, MajorKey, MinorKey, PlaybackNumTimes, Tempo, Transposition } from "./types";
const fixedEncodeURIComponent = (string: string): string => {
  return encodeURIComponent(string).replace(/[!'()*]/g, (c) => {
    return "%" + c.charCodeAt(0).toString(16);
  });
};

// Regex to to check for ireal song strings
const SongUrlRegex= /^irealb\w*:\/\/[^=]*=[^=]*==[^=]*=[^=]*=([^=]*)?[^=]*=[^=]*=[^=]*=[^=]*=[^=]*$/

// Keys with their transposition number for IReal
const MajorKeys: Record<MajorKey, number> = {
  C: 0,
  Db: 1,
  D: 2,
  Eb: 3,
  E: 4,
  F: 5,
  Gb: 6,
  G: 7,
  Ab: 8,
  A: 9,
  Bb: 10,
  B: 11,
};
Object.freeze(MajorKeys);
const MinorKeys: Record<MinorKey, number> = {
  "A-": 0,
  "Bb-": 1,
  "B-": 2,
  "C-": 3,
  "C#-": 4,
  "D-": 5,
  "Eb-": 6,
  "E-": 7,
  "F-": 8,
  "F#-": 9,
  "G-": 10,
  "G#-": 11,
};
Object.freeze(MinorKeys);

const Keys = { ...MajorKeys, ...MinorKeys };
Object.freeze(Keys);

// transpose an encoded iRealString
export function transposeIrealString(
  irealLink: string,
  transpose: MajorKey | MinorKey
) {
  if (!SongUrlRegex.test(irealLink)) return undefined;
  return (
    /irealbook/.test(irealLink)
      ? encodeIreal(decodeIreal(irealLink)!)
      : irealLink
  ).replace(
    /(?<=irealb\w*:\/\/[^=]*=[^=]*==[^=]*=[^=]*=)([^=]*)?(?=[^=]*=[^=]*=[^=]*=[^=]*=[^=]*)/,
    Keys[transpose].toString()
  );
}
//encode an ireal URL from an IReal object
export function encodeIreal(ireal: IReal): string  {
  return `irealb://${fixedEncodeURIComponent(
    ireal.title
  )}=${fixedEncodeURIComponent(ireal.artist)}==${fixedEncodeURIComponent(
    ireal.style
  )}=${fixedEncodeURIComponent(ireal.key)}=${
    ireal.transpose
  }=${encodeURIComponent("1r34LbKcu7" + ireal.changes)}=${encodeURIComponent(
    ireal?.playbackStyle ?? ""
  )}=${+(ireal?.tempo ?? 0)}=${+(ireal?.playbackNumTimes ?? 3)}
`;
}
// convert a song string into and IReal object
function makeIreal(irealString: string, isOldForm?: boolean) {
  const data = irealString.split("=");
  return isOldForm
    ? {
        title: data[0].trim(),
        artist: data[1].trim(),
        style: data[3].trim(),
        key: data[4].trim() as Key,
        changes: data[6],
      }
    : {
        title: data[0].trim(),
        artist: data[1].trim(),
        style: data[3].trim(),
        key: data[4].trim() as Key,
        transpose: data[5] as Transposition,
        changes: data[6].split("1r34LbKcu7")[1],
        playbackStyle: data[7].trim() || "",
        tempo: data[8] as Tempo || "0" ,
        playbackNumTimes: data[9] as PlaybackNumTimes || "3",
      };
}
// detect if an item is a playlist
export function detectPlaylist(link: string): string | undefined {
  const playlist = /(.*)===([^=]*)$/.exec(decodeURIComponent(link));
  return playlist ? playlist[0] : undefined;
}

// return an IReal object if the link is a single song, or undefined if it's not
export function decodeIreal(link: string): IReal | undefined {
  if (!SongUrlRegex.test(link)) return undefined;
  const decoded = decodeURIComponent(link);
    return makeIreal(
      decoded.replace(/irealb\w*:\/\//, ""),
      /irealbook/.test(decoded)
    );
}



export function decodeIrealPlaylist(link: string): Promise<IRealPlaylist> {
  return new Promise((resolve, reject) => {
    //check for the old format
    const isOldForm = /irealbook/.test(link);
    const playlist = detectPlaylist(link);
    // decode the URL format and remove the link prefix
    const decoded = decodeURIComponent(link.replace(/irealb\w*:\/\//, ""));
    if (playlist) {
      const data = /(.*)===([^=]*)$/.exec(decoded);
      if (data)
        resolve({
          title: playlist,
          songs: data[1]
            .split("===")
            ?.map((song): IReal => makeIreal(song, isOldForm)),
        });
      else reject("Cannot parse playlist");
    } else reject("Is not a playlist");
  });
}

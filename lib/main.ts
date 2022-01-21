import { IReal, IRealPlaylist, Key, MajorKey, MinorKey, PlaybackNumTimes, Tempo, Transposition } from "./types";
const fixedEncodeURIComponent = (string: string): string => {
  return encodeURIComponent(string).replace(/[!'()*]/g, (c) => {
    return "%" + c.charCodeAt(0).toString(16);
  });
};
/*
'One Note Samba=Jobim Antonio-Carlos==Bossa Nova=Bb==1r34LbKcu7|QyX74D-7XX7-D|QyX11#7B|yQX7-C|QyX7bD|QyyQ|Db4TA*[yX7-DQ|B7#bA|QyX7^bE|QyXb7B|QyX7-F|QyX117XyQ|yX7-CX7^bDXyQ|CbA|QyX7-bEB*[]yQX6bBZL11#7B 7-7XyQ|7bD|QbD|Qy LZC#*[] 7F 7hC|QyX^7B|QyX7#F|QyX7-AD-7XlcKQyQyX11C-7XyyX7-C|QyX7bD|QXy7-D|QyX11#7B|QQ|B7#|QyX7|QyX7yQ|BbX7C|QyX6bD|QyXb7A|QyX7^bE|QyX7yQ|B^X7-F|Bb6XyQZ =Jazz-Bossa Nova=0=3'
 */
// Regex to to check for ireal song
const SongUrlRegex=       /^ireal(b|book):\/\/[^=]*=[^=]*==[^=]*=[^=]*=([^=]*)?[^=]*=[^=]*=[^=]*=[^=]*=[^=]*$/
const DecodedSongUrlRegex=/^ireal(b|book):\/\/[^=]*=[^=]*==[^=]*=[A-Z](b|\#)?-?=\d?\d?=1r34LbKcu7[^=]*=[^=]*=\d\d?\d?=\d\d?\d?/

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

// Transpose an encoded iRealString. Only works with the irealb:// links (new format)
export function transposeIrealString(
  irealLink: string,
  transpose: MajorKey | MinorKey
) {
  if (!DecodedSongUrlRegex.test(decodeURIComponent(irealLink))) return undefined;
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
  if(ireal?.oldForm)return `irealbook://${ireal.title}=${ireal.artist}=${ireal.style}=${ireal.key}=n=${ireal.changes}`
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
        changes: data[5],
        oldForm:true
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
// Detect if an item is a playlist
export function detectPlaylist(link: string): string | undefined {
  const playlist = /(?<=^ireal(b|book):\/\/([^=]*=[^=]*==[^=]*=[A-Z](b|\#)?-?=\d?\d?=1r34LbKcu7[^=]*=[^=]*=\d\d?\d?=\d\d?\d?===)*)[^=]*$/.exec(decodeURIComponent(link));
  
  return playlist ? playlist[0] : undefined;
}

// return an IReal object if the link is a single song, or undefined if it's not
export function decodeIreal(link: string): IReal | undefined {
  const isOldForm=/^irealbook/.test(link)
  const decoded=decodeURIComponent(link)
  if (!DecodedSongUrlRegex.test(decoded)&&!isOldForm) return undefined;
    return makeIreal(
      decoded.replace(/^irealb\w*:\/\//, ""),
      isOldForm
    );
}



export function decodeIrealPlaylist(link: string): Promise<IRealPlaylist> {
  return new Promise((resolve, reject) => {
    //check for the old format
    const isOldForm = /^irealbook/.test(link);
    const playlist = detectPlaylist(link);
    // decode the URL format and remove the link prefix
    const decoded = decodeURIComponent(link.replace(/^irealb\w*:\/\//, ""));
    // check if it's a playlist
    if (playlist) {
      const data = /(.*)===([^=]*)$/.exec(decoded);
      if (data)
      {
        const result={
          title: playlist,
          songs: data[1]
            .split("===")
            ?.map((song): IReal =>makeIreal(song,isOldForm)),
        };
        result.songs.every(song=>song!==undefined)?resolve(result):reject('Cannot parse playlist')
      }
      else reject("Cannot parse playlist");
    } else reject("Is not a playlist");
  });
}

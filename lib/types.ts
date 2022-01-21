
export type IRealPlaylist = {title:string, songs:Array<IReal>}
export type irealUrl=`irealb://${string}=${string}==${string}=${string}=${string}=${string}=${string}=${string}=${string}`

// List of available keys 
export type KeyNote =
  | "A"
  | "Bb"
  | "B"
  | "C"
  | "C#"
  | "Db"
  | "D"
  | "D#"
  | "Eb"
  | "E"
  | "F"
  | "F#"
  | "Gb"
  | "G"
  | "G#"
  | "Ab"

  

  export type MinorKey='A-'|'Bb-'|'B-'|'C-'|'C#-'|'D-'|'Eb-'|'E-'|'F-'|'F#-'|'G-'|'G#-'
  export type MajorKey='C'|'Db'|'D'|'Eb'|'E'|'F'|'Gb'|'G'|'Ab'|'A'|'Bb'|'B'

// export type Note = "A" | "B" | "C" | "D" | "E" | "F" | "G";
// export type Sign = "" | "b" | "#";
export type Tonality = "" | "-";
export type Key = MinorKey|MajorKey;
export type Transposition="0"|"1"|"2"|"3"|"4"|"5"|"6"|"7"|"8"|"9"|"10"|"11"|""
export type Tempo =`${number}`
export type PlaybackNumTimes=`${number}`
export interface IReal {
  
  title: string;
  artist: string;
  style: string;
  key: Key;
  changes: string;
  transpose?:Transposition
  tempo?: Tempo;
  playlist?: string;
  playbackStyle?: string;
  playbackNumTimes?: string;
  oldForm?:boolean
  
}
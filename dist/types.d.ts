export declare type IRealPlaylist = {
    title: string;
    songs: Array<IReal>;
};
export declare type irealUrl = `irealb://${string}=${string}==${string}=${string}=${string}=${string}=${string}=${string}=${string}`;
export declare type KeyNote = "A" | "Bb" | "B" | "C" | "C#" | "Db" | "D" | "D#" | "Eb" | "E" | "F" | "F#" | "Gb" | "G" | "G#" | "Ab";
export declare type MinorKey = 'A-' | 'Bb-' | 'B-' | 'C-' | 'C#-' | 'D-' | 'Eb-' | 'E-' | 'F-' | 'F#-' | 'G-' | 'G#-';
export declare type MajorKey = 'C' | 'Db' | 'D' | 'Eb' | 'E' | 'F' | 'Gb' | 'G' | 'Ab' | 'A' | 'Bb' | 'B';
export declare type Tonality = "" | "-";
export declare type Key = MinorKey | MajorKey;
export declare type Transposition = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "";
export declare type Tempo = `${number}`;
export declare type PlaybackNumTimes = `${number}`;
export interface IReal {
    title: string;
    artist: string;
    style: string;
    key: Key;
    changes: string;
    transpose?: Transposition;
    tempo?: Tempo;
    playlist?: string;
    playbackStyle?: string;
    playbackNumTimes?: string;
    oldForm?: boolean;
}
//# sourceMappingURL=types.d.ts.map
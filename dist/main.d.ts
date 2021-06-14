declare type Note = "A" | "B" | "C" | "D" | "E" | "F" | "G";
declare type Sign = "" | "b" | "#";
declare type Tonality = "" | "-";
declare type Key = `${Note}${Sign}${Tonality}`;
interface IReal {
    ireallink: string;
    name: string;
    artist: string;
    style: string;
    key: Key;
    tempo: string;
    playlist?: string;
    playbackStyle: string;
    playbackNumTimes: string;
    changes: string;
}
export declare function encodeIreal(ireal: IReal): string;
export declare function decodeIreal(link: string): IReal[];
export {};
//# sourceMappingURL=main.d.ts.map
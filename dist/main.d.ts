import { IReal, IRealPlaylist, MajorKey, MinorKey } from "./types";
export declare function transposeIrealString(irealLink: string, transpose: MajorKey | MinorKey): string | undefined;
export declare function encodeIreal(ireal: IReal): string;
export declare function detectPlaylist(link: string): string | undefined;
export declare function decodeIreal(link: string): IReal | undefined;
export declare function decodeIrealPlaylist(link: string): Promise<IRealPlaylist>;
//# sourceMappingURL=main.d.ts.map
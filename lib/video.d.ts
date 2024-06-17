export default class VideoPlayer {
    container: HTMLElement | null;
    videoElem: HTMLVideoElement | null;
    canvas: HTMLCanvasElement | null;
    playing: boolean;
    loading: boolean;
    ended: boolean;
    loopTimes: number;
    maxLoopTimes: number;
    audioDuration: number;
    playbackRate: number;
    constructor(container: string | HTMLElement, options: {
        [key: string]: any;
    });
    /**
     *
     *
     * @param {{ [key: string]: any}} options
     * @memberof VideoPlayer
     */
    initListeners(options: {
        [key: string]: any;
    }): void;
    /**
     *
     *
     * @memberof VideoPlayer
     */
    drawVideo(): void;
    /**
     *
     *
     * @param {CanvasRenderingContext2D} ctx
     * @memberof VideoPlayer
     */
    renderCanvas(ctx: CanvasRenderingContext2D): void;
    setVisibility(visibility: string): void;
    setSource(src: string): void;
    play(): void;
    pause(): void;
    destroy(): void;
    /**
     *
     *
     * @param {number} audioDuration
     * @memberof VideoPlayer
     */
    setAudioDuration(audioDuration: number): void;
}

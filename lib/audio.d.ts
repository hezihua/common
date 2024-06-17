export interface IAudioPlayer {
    play: () => void;
    pause: () => void;
    stop: () => void;
    setVolume: (volume: number) => void;
    getCurrentTime: () => number;
    getDuration: () => number;
}
declare class AudioPlayer implements IAudioPlayer {
    private audio;
    private container;
    constructor(container: string | HTMLElement, options: Record<string, any>);
    play(): void;
    pause(): void;
    stop(): void;
    setVolume(volume: number): void;
    getCurrentTime(): number;
    getDuration(): number;
}
export default AudioPlayer;

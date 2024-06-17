export interface IAudioPlayer {
  play: () => void;
  pause: () => void;
  stop: () => void;
  setVolume: (volume: number) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
}

class AudioPlayer implements IAudioPlayer {
private audio: HTMLAudioElement;
private container: HTMLElement | null;
constructor(container: string | HTMLElement, options: Record<string, any>) {
  const { audioUrl, endfn } = options
  this.container = typeof container === 'string' ? document.getElementById(container) : container;
  this.audio = new Audio(audioUrl);
  this.audio.onended = () => {
    endfn()
  }
  this.audio.style.display = 'none';
  // this.audio.style.width = '100vw';
  // this.audio.style.height = '100vh';
  this.container && this.container.appendChild(this.audio);
      
  this.audio.play();
}

play(): void {
  this.audio.play();
}

pause(): void {
  this.audio.pause();
}

stop(): void {
  this.audio.pause();
  this.audio.currentTime = 0;
}

setVolume(volume: number): void {
  if (volume >= 0 && volume <= 1) {
    this.audio.volume = volume;
  } else {
    throw new Error('Volume must be between 0 and 1.');
  }
}

getCurrentTime(): number {
  return this.audio.currentTime;
}

getDuration(): number {
  return this.audio.duration;
}
}

export default AudioPlayer

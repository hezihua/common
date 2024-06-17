export default class VideoPlayer {
  public container: HTMLElement | null;
  public videoElem: HTMLVideoElement | null;
  public canvas: HTMLCanvasElement | null;
  public playing: boolean;
  public loading: boolean;
  public ended: boolean;
  public loopTimes: number;
  public maxLoopTimes: number;
  public audioDuration: number;
  public playbackRate: number;
  constructor(container: string | HTMLElement, options: { [key: string]: any}) {
    this.container = typeof container === 'string' ? document.getElementById(container) : container;
    let defaultOptions = options || {
      width: '100vw',
      height: '100vh'
    };
    this.videoElem = document.createElement('video');
    this.videoElem.id = defaultOptions.id;
    this.videoElem.src = defaultOptions.url;
    this.videoElem.autoplay = true;
    this.videoElem.loop = true;
    this.videoElem.controls = true;
    this.videoElem.playsInline = true;
    this.videoElem.muted = true;
    this.videoElem.style.display = 'none';
    this.videoElem.style.width = defaultOptions.width || '100vw';
    this.videoElem.style.height = defaultOptions.height || '100vh';
      
    this.canvas = document.createElement('canvas');
  
    this.container && this.container.appendChild(this.videoElem);
    this.container && this.container.appendChild(this.canvas);
  
    this.canvas.style.width = defaultOptions.width || '100vw';
    this.canvas.style.height = defaultOptions.height || '100vh';
    this.canvas.style.objectFit = window.innerWidth > window.innerHeight ? 'contain' : 'cover';
  
    this.playing = false;
    this.loading = false;
    this.ended = false;
    this.loopTimes = 0;
    this.maxLoopTimes = 0;
    this.audioDuration = 0;
    this.playbackRate = 1;
    this.initListeners(options);
  }
  
  /**
   *
   *
   * @param {{ [key: string]: any}} options
   * @memberof VideoPlayer
   */
  initListeners(options: { [key: string]: any}) {
    (this.videoElem as HTMLVideoElement).onseeking = () => {
      this.loading = true;
    }
    (this.videoElem as HTMLVideoElement).onseeked = () => {
      this.loading = false;
    }
    (this.videoElem as HTMLVideoElement).onwaiting = () => {
      this.loading = true;
    }
    (this.videoElem as HTMLVideoElement).oncanplay = () => {
      (this.canvas as HTMLCanvasElement).width = (this.videoElem as HTMLVideoElement).videoWidth;
      (this.canvas as HTMLCanvasElement).height = (this.videoElem as HTMLVideoElement).videoHeight;
  
      this.loading = false;
      this.playing = true;
      this.ended = false;
      this.drawVideo();
  
      options.oncanplay && options.oncanplay();
    }
    (this.videoElem as HTMLVideoElement).oncanplaythrough = () => { };
    (this.videoElem as HTMLVideoElement).onerror = () => {
      this.loading = false;
    }
    (this.videoElem as HTMLVideoElement).onpause = () => {
      this.playing = false;
    }
    (this.videoElem as HTMLVideoElement).onended = () => {
      this.loopTimes++
      if (this.loopTimes < this.maxLoopTimes) {
        (this.videoElem as HTMLVideoElement).play();
      } else {
        this.ended = true;
        options.onended && options.onended();
      }
    }
    (this.videoElem as HTMLVideoElement).onplay = () => {
      options.onplay && options.onplay();
    }
  }
  
  /**
   *
   *
   * @memberof VideoPlayer
   */
  drawVideo() {
    const ctx = (this.canvas as HTMLCanvasElement).getContext('2d', {
      willReadFrequently: true,
    })
    ctx && this.renderCanvas(ctx);
  }
  
  /**
   *
   *
   * @param {CanvasRenderingContext2D} ctx
   * @memberof VideoPlayer
   */
  renderCanvas(ctx: CanvasRenderingContext2D) {
    if (!this.ended && !this.loading) {
      window.requestAnimationFrame(this.renderCanvas.bind(this, ctx));
    }
    ctx.clearRect(0, 0, (this.canvas as HTMLCanvasElement).width, (this.canvas as HTMLCanvasElement).height);
    ctx.drawImage((this.videoElem as HTMLVideoElement), 0, 0, (this.canvas as HTMLCanvasElement).width, (this.canvas as HTMLCanvasElement).height);
  }
  
  setVisibility(visibility:string) {
    (this.canvas as HTMLCanvasElement).style.visibility = visibility;
  }
  
  setSource(src: string) {
    (this.videoElem as HTMLVideoElement).src = src;
  }
  
  play() {
    (this.videoElem as HTMLVideoElement).play();
  }
  
  pause() {
    (this.videoElem as HTMLVideoElement).pause();
  }
  
  destroy() {
    this.videoElem = null;
    this.canvas = null;
  }
  
  /**
   *
   *
   * @param {number} audioDuration
   * @memberof VideoPlayer
   */
  setAudioDuration(audioDuration: number) {
    this.audioDuration = audioDuration;
    this.loopTimes = 0;
    const times = Math.round((audioDuration || 0) / ((this.videoElem as HTMLVideoElement).duration));
    this.maxLoopTimes = times || 1;
    this.playbackRate = ((this.videoElem as HTMLVideoElement).duration * this.maxLoopTimes) / (audioDuration || 1);
    if (this.videoElem) (this.videoElem as HTMLVideoElement).playbackRate = isNaN(this.playbackRate) ? 1 : this.playbackRate;
  }
}
  
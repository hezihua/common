class AudioPlayer {
    constructor(container, options) {
        const { audioUrl, endfn } = options;
        this.container = typeof container === 'string' ? document.getElementById(container) : container;
        this.audio = new Audio(audioUrl);
        this.audio.onended = () => {
            endfn();
        };
        this.audio.style.display = 'none';
        // this.audio.style.width = '100vw';
        // this.audio.style.height = '100vh';
        this.container && this.container.appendChild(this.audio);
        this.audio.play();
    }
    play() {
        this.audio.play();
    }
    pause() {
        this.audio.pause();
    }
    stop() {
        this.audio.pause();
        this.audio.currentTime = 0;
    }
    setVolume(volume) {
        if (volume >= 0 && volume <= 1) {
            this.audio.volume = volume;
        }
        else {
            throw new Error('Volume must be between 0 and 1.');
        }
    }
    getCurrentTime() {
        return this.audio.currentTime;
    }
    getDuration() {
        return this.audio.duration;
    }
}

class VideoPlayer {
    constructor(container, options) {
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
    initListeners(options) {
        this.videoElem.onseeking = () => {
            this.loading = true;
        };
        this.videoElem.onseeked = () => {
            this.loading = false;
        };
        this.videoElem.onwaiting = () => {
            this.loading = true;
        };
        this.videoElem.oncanplay = () => {
            this.canvas.width = this.videoElem.videoWidth;
            this.canvas.height = this.videoElem.videoHeight;
            this.loading = false;
            this.playing = true;
            this.ended = false;
            this.drawVideo();
            options.oncanplay && options.oncanplay();
        };
        this.videoElem.oncanplaythrough = () => { };
        this.videoElem.onerror = () => {
            this.loading = false;
        };
        this.videoElem.onpause = () => {
            this.playing = false;
        };
        this.videoElem.onended = () => {
            this.loopTimes++;
            if (this.loopTimes < this.maxLoopTimes) {
                this.videoElem.play();
            }
            else {
                this.ended = true;
                options.onended && options.onended();
            }
        };
        this.videoElem.onplay = () => {
            options.onplay && options.onplay();
        };
    }
    /**
     *
     *
     * @memberof VideoPlayer
     */
    drawVideo() {
        const ctx = this.canvas.getContext('2d', {
            willReadFrequently: true,
        });
        ctx && this.renderCanvas(ctx);
    }
    /**
     *
     *
     * @param {CanvasRenderingContext2D} ctx
     * @memberof VideoPlayer
     */
    renderCanvas(ctx) {
        if (!this.ended && !this.loading) {
            window.requestAnimationFrame(this.renderCanvas.bind(this, ctx));
        }
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.drawImage(this.videoElem, 0, 0, this.canvas.width, this.canvas.height);
    }
    setVisibility(visibility) {
        this.canvas.style.visibility = visibility;
    }
    setSource(src) {
        this.videoElem.src = src;
    }
    play() {
        this.videoElem.play();
    }
    pause() {
        this.videoElem.pause();
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
    setAudioDuration(audioDuration) {
        this.audioDuration = audioDuration;
        this.loopTimes = 0;
        const times = Math.round((audioDuration || 0) / (this.videoElem.duration));
        this.maxLoopTimes = times || 1;
        this.playbackRate = (this.videoElem.duration * this.maxLoopTimes) / (audioDuration || 1);
        if (this.videoElem)
            this.videoElem.playbackRate = isNaN(this.playbackRate) ? 1 : this.playbackRate;
    }
}

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function getIOSVersion() {
    const useragent = navigator.userAgent.toLowerCase();
    const ver = useragent.match(/cpu iphone os (.*?) like mac os/);
    if (!ver) {
        return '';
    }
    else {
        const version = ver[1].replace(/_/g, '.');
        return version;
    }
}
function isLegacyIOSVersion() {
    let v = getIOSVersion();
    console.log('getIOSVersion', v);
    return '14.2'.localeCompare(v) > 0;
}
/**
 *
 *
 * @export
 * @param {ArrayBuffer} arraybuffer
 * @param {() => void} onEnd
 * @return {*}
 */
function playWithAudioBufferSource(arraybuffer, onEnd) {
    return __awaiter(this, void 0, void 0, function* () {
        const audioContext = new window.AudioContext();
        const audiosource = audioContext.createBufferSource();
        audiosource.connect(audioContext.destination);
        let audiodata; // = await audioContext.decodeAudioData(arraybuffer)
        if (isLegacyIOSVersion()) {
            console.log('test111');
            audiodata = yield new Promise((resolve, reject) => {
                audioContext.decodeAudioData(arraybuffer, function (decodedData) {
                    resolve(decodedData);
                });
            });
        }
        else {
            audiodata = yield audioContext.decodeAudioData(arraybuffer);
        }
        console.log('audiodata: ', audiodata);
        audiosource.buffer = audiodata;
        const audioDuration = audiodata.length / audioContext.sampleRate;
        // const endedHandler = () => {
        // }
        console.log('tts audio duration', audioDuration + 's');
        audiosource.addEventListener('ended', onEnd);
        audiosource.start(0);
        return audioContext;
    });
}
/**
 *
 *
 * @export
 * @param {Function} func
 * @param {number} delay
 * @return {*}  {Function}
 */
function throttle(func, delay) {
    let lastExecuted = 0;
    return function (...args) {
        const now = Date.now();
        if (now - lastExecuted >= delay) {
            func.apply(this, args);
            lastExecuted = now;
        }
    };
}

export { AudioPlayer, VideoPlayer, playWithAudioBufferSource, throttle };
//# sourceMappingURL=index.js.map

function getIOSVersion() {
  const useragent = navigator.userAgent.toLowerCase()
  const ver = useragent.match(/cpu iphone os (.*?) like mac os/)
  if (!ver) {
    return ''
  } else {
    const version = ver[1].replace(/_/g, '.')
    return version
  }
}
  
function isLegacyIOSVersion() {
  let v = getIOSVersion()
  console.log('getIOSVersion', v);
  return '14.2'.localeCompare(v) > 0
}



/**
 *
 *
 * @export
 * @param {ArrayBuffer} arraybuffer
 * @param {() => void} onEnd
 * @return {*} 
 */
export async function playWithAudioBufferSource(arraybuffer: ArrayBuffer, onEnd: () => void) {
  const audioContext = new window.AudioContext()
  const audiosource: AudioBufferSourceNode = audioContext.createBufferSource()
  audiosource.connect(audioContext.destination)
  
  let audiodata: AudioBuffer// = await audioContext.decodeAudioData(arraybuffer)
  if (isLegacyIOSVersion()) {
    console.log('test111');
    audiodata = await new Promise((resolve, reject) => {
      audioContext.decodeAudioData(arraybuffer, function(decodedData) {
        resolve(decodedData)
      })
    })
  } else {
    audiodata = await audioContext.decodeAudioData(arraybuffer)
  }

  console.log('audiodata: ', audiodata);
    
  audiosource.buffer = audiodata
  
  const audioDuration = audiodata.length / audioContext.sampleRate
  
  // const endedHandler = () => {
      
  // }

  console.log('tts audio duration', audioDuration + 's')
  
  audiosource.addEventListener('ended', onEnd)
  
  audiosource.start(0)

  return audioContext

}


/**
 *
 *
 * @export
 * @param {Function} func
 * @param {number} delay
 * @return {*}  {Function}
 */
export function throttle(func: Function, delay: number): Function {
  let lastExecuted = 0;
  return function(this: any, ...args: any[]): void {
    const now = Date.now();
    if (now - lastExecuted >= delay) {
      func.apply(this, args);
      lastExecuted = now;
    }
  };
}
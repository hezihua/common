/**
 *
 *
 * @export
 * @param {ArrayBuffer} arraybuffer
 * @param {() => void} onEnd
 * @return {*}
 */
export declare function playWithAudioBufferSource(arraybuffer: ArrayBuffer, onEnd: () => void): Promise<AudioContext>;
/**
 *
 *
 * @export
 * @param {Function} func
 * @param {number} delay
 * @return {*}  {Function}
 */
export declare function throttle(func: Function, delay: number): Function;

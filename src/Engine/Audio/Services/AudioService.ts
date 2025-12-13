export function AudioService() {
  const sounds: Map<string, Howl> = new Map();

  function loadSound(name: string, src: string, type: TSoundType, options: TSoundOptions = {}) {
    const sound = new Howl({
      src: [src],
      loop: options.loop || false,
      volume: options.volume || 1.0
    });

    sounds.set(name, sound);
  }

  function play(name: string) {
    sounds.get(name)?.play();
  }

  function stop(name: string) {
    sounds.get(name)?.stop();
  }

  function setVolume(name: string, volume: number) {
    sounds.get(name)?.volume(volume);
  }
}

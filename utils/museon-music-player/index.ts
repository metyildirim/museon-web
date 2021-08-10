export enum LoopStates {
  NOLOOP,
  LOOPALL,
  LOOPONE,
}

export default class MuseonMusicPlayer {
  player: HTMLAudioElement;
  list: Array<string>;
  index: number;
  queue: Array<string>;
  shuffle: boolean;
  loop: number;

  constructor(
    list?: Array<string>,
    index?: number,
    loop?: number,
    shuffle?: boolean,
    volume?: number
  ) {
    this.index = index || 0;
    this.loop = loop || 0;
    this.shuffle = shuffle || false;
    this.list = list || [];
    this.queue = [];
    this.player = new Audio();
    this.player.volume = volume || 1;
    this.player.onended = this.onMusicEnd;
    this.updateMusic(this.index);
  }

  onMusicEnd = () => {
    if (this.loop === LoopStates.LOOPONE) {
      this.rewind();
    } else {
      this.next();
    }
  };

  play = () => {
    this.player.play();
  };

  pause = () => {
    this.player.pause();
  };

  next = () => {
    if (this.queue.length > 0) {
      this.updateMusic(this.index, this.queue.shift());
    }
    let newIndex = this.index + 1;
    if (newIndex === this.list.length) {
      newIndex = 0;
      this.updateMusic(newIndex);
      if (this.loop === LoopStates.LOOPALL) {
        this.play();
      }
    } else {
      this.updateMusic(newIndex);
      this.play();
    }
  };

  prev = () => {
    if (this.shouldRewind()) {
      this.rewind();
      return;
    }
    let newIndex = this.index - 1;
    if (newIndex < 0) {
      if ((this.loop = LoopStates.LOOPALL)) {
        newIndex = this.list.length - 1;
      } else {
        this.rewind();
        return;
      }
    }
    this.updateMusic(newIndex);
    this.play();
  };

  shouldRewind = () => {
    return this.getCurrentTime() > 3;
  };

  rewind = () => {
    this.setCurrentTime(0);
    this.play();
  };

  updateList = (list: Array<string>, index: number) => {
    this.list = list;
    this.updateMusic(index);
    this.play();
  };

  updateMusic = (index: number, src?: string) => {
    if (!src) {
      this.index = index;
    }
    this.player.src = src || this.list[index];
  };

  addToQueue = (url: string) => {
    this.queue.push(url);
  };

  getDownloadUrl = () => {
    return this.player.src;
  };

  getDuration = () => {
    return this.player.duration;
  };

  getVolume = () => {
    return this.player.volume;
  };

  getCurrentTime = () => {
    return this.player.currentTime;
  };

  setVolume = (volume: number) => {
    this.player.volume = volume;
  };

  setCurrentTime = (currentTime: number) => {
    this.player.currentTime = currentTime;
  };

  setShuffle = (active: boolean) => {
    this.shuffle = active;
  };

  setLoop = (loopState: number) => {
    this.loop = loopState;
  };
}

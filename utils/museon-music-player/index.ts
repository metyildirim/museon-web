export enum LoopStates {
  NOLOOP,
  LOOPALL,
  LOOPONE,
}

export default class MuseonMusicPlayer {
  private player: HTMLAudioElement;
  private list: Array<string>;
  private index: number;
  private queue: Array<string>;
  private shuffle: boolean;
  private loop: number;

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

  private onMusicEnd = () => {
    if (this.loop === LoopStates.LOOPONE) {
      this.rewind();
    } else {
      this.next();
    }
  };

  private shouldRewind = () => {
    return this.getCurrentTime() > 3;
  };

  private rewind = () => {
    this.setCurrentTime(0);
    this.play();
  };

  private updateMusic = (index: number, src?: string) => {
    if (!src) {
      this.index = index;
    }
    this.player.src = src || this.list[index];
  };

  private getCurrentTime = () => {
    return this.player.currentTime;
  };

  private setCurrentTime = (currentTime: number) => {
    this.player.currentTime = currentTime;
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

  updateList = (list: Array<string>, index: number) => {
    this.list = list;
    this.updateMusic(index);
    this.play();
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

  setVolume = (volume: number) => {
    this.player.volume = volume;
  };

  getProgress = () => {
    return this.getCurrentTime() / this.getDuration();
  };

  setProgress = (progress: number) => {
    this.setCurrentTime(progress * this.getDuration());
  };

  setShuffle = (active: boolean) => {
    this.shuffle = active;
  };

  setLoop = (loopState: number) => {
    this.loop = loopState;
  };
}

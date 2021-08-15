export enum LOOP_STATES {
  NoLoop,
  LoopAll,
  LoopOne,
}

export type ListType = {
  song: string;
  album: string;
  artists: Array<string>;
  cover: string;
  src: string;
};

export default class MuseonMusicPlayer {
  private player: HTMLAudioElement;
  private callback: (
    cover: string,
    isPlaying: boolean,
    index: number,
    currentTime: string,
    duration: string,
    progress: string,
    song: string,
    album: string,
    artists: Array<string>
  ) => void;
  private list: Array<ListType>;
  private index: number;
  private queue: Array<ListType>;
  private shuffle: boolean;
  private loop: number;

  constructor(
    playerCallback: (
      cover: string,
      isPlaying: boolean,
      index: number,
      currentTime: string,
      duration: string,
      progress: string,
      song: string,
      album: string,
      artists: Array<string>
    ) => void,
    list?: Array<ListType>,
    index?: number,
    loop?: number,
    shuffle?: boolean,
    volume?: number
  ) {
    this.callback = playerCallback;
    this.index = index || 0;
    this.loop = loop || 0;
    this.shuffle = shuffle || false;
    this.list = list || [];
    this.queue = [];
    this.player = new Audio();
    this.player.volume = volume || 1;
    this.player.onended = this.onMusicEnd;
    this.updateMusic(this.index);
    this.setMediaButtons();
    setInterval(this.notify, 200);
  }

  private notify = () => {
    this.callback(
      this.getCover(),
      this.isPlaying(),
      this.index,
      this.getFormatedCurrentTime(),
      this.getFormatedDuration(),
      this.getProgress(),
      this.getSong(),
      this.getAlbum(),
      this.getArtists()
    );
  };

  private onMusicEnd = () => {
    if (this.loop === LOOP_STATES.LoopOne) {
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
    this.player.src = src || this.list[index].src;
    this.updateMediaSession(
      this.getCover(),
      this.getSong(),
      this.getAlbum(),
      this.getArtists()
    );
  };

  private formatTime = (duration: number) => {
    if (!duration) {
      return "0:00";
    }
    const hours = Math.floor(duration / 3600);
    const mins = Math.floor((duration % 3600) / 60);
    const secs = Math.floor(duration % 60);
    let result = "";
    if (hours > 0) {
      result += "" + hours + ":" + (mins < 10 ? "0" : "");
    }
    result += "" + mins + ":" + (secs < 10 ? "0" : "");
    result += "" + secs;
    return result;
  };

  private getCurrentTime = () => {
    return this.player.currentTime;
  };

  private getDuration = () => {
    return this.player.duration;
  };

  private setCurrentTime = (currentTime: number) => {
    this.player.currentTime = currentTime;
  };

  private getFormatedCurrentTime = () => {
    return this.formatTime(this.getCurrentTime());
  };

  private getFormatedDuration = () => {
    return this.formatTime(this.getDuration());
  };

  private getProgress = () => {
    const progress = this.getCurrentTime() / this.getDuration();
    if (!progress) {
      return "0";
    }
    return progress.toFixed(3);
  };

  private isPlaying = () => {
    return !this.player.paused;
  };

  private getCover = () => {
    return this.list[this.index]?.cover;
  };

  private getSong = () => {
    return this.list[this.index]?.song;
  };

  private getAlbum = () => {
    return this.list[this.index]?.album;
  };

  private getArtists = () => {
    return this.list[this.index]?.artists;
  };

  private setMediaButtons = () => {
    navigator.mediaSession.setActionHandler("play", this.play);
    navigator.mediaSession.setActionHandler("pause", this.pause);
    navigator.mediaSession.setActionHandler("previoustrack", this.prev);
    navigator.mediaSession.setActionHandler("nexttrack", this.next);
  };

  private updateMediaSession = (
    cover: string,
    song: string,
    album: string,
    artists: Array<string>
  ) => {
    const mergedArtists = artists.join(", ");
    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: song,
        artist: mergedArtists,
        album: album,
        artwork: [{ src: cover, sizes: "512x512", type: "image/png" }],
      });
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
      this.updateMusic(this.index, this.queue.shift()?.src);
    }
    let newIndex = this.index + 1;
    if (newIndex === this.list.length) {
      newIndex = 0;
      this.updateMusic(newIndex);
      if (this.loop === LOOP_STATES.LoopAll) {
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
      if (this.loop === LOOP_STATES.NoLoop) {
        this.rewind();
        return;
      } else {
        newIndex = this.list.length - 1;
      }
    }
    this.updateMusic(newIndex);
    this.play();
  };

  updateList = (list: Array<ListType>, index: number) => {
    this.list = list;
    this.updateMusic(index);
    this.play();
  };

  addToQueue = (music: ListType) => {
    this.queue.push(music);
  };

  getDownloadUrl = () => {
    return this.player.src;
  };

  setVolume = (volume: number) => {
    this.player.volume = volume;
  };

  setProgress = (progress: string) => {
    this.setCurrentTime(Number(progress) * this.getDuration());
  };

  setShuffle = (active: boolean) => {
    this.shuffle = active;
  };

  setLoop = (loopState: number) => {
    this.loop = loopState;
  };
}

import shuffleIndexes from "./shuffle-indexes";

export enum LOOP_STATES {
  NoLoop,
  LoopAll,
  LoopOne,
}

export type ArtistType = {
  id: string;
  name: string;
  cover: string;
};

export type SongType = {
  title: string;
  src: string;
  album: AlbumType;
  artists: Array<ArtistType>;
};

export type AlbumType = {
  id: string;
  title: string;
  cover: string;
  songs: Array<SongType>;
};

export type ListType = {
  title: string;
  album: AlbumType;
  artists: Array<ArtistType>;
  src: string;
  index?: number;
};

export type CallbackType = (
  cover: string,
  isPlaying: boolean,
  index: number,
  currentTime: string,
  duration: string,
  progress: string,
  title: string,
  album: AlbumType,
  artists: Array<ArtistType>,
  isAlbum: boolean
) => void;

export default class MuseonMusicPlayer {
  static instance: MuseonMusicPlayer;
  private player: HTMLAudioElement;
  private fetcher: HTMLAudioElement;
  private callback: CallbackType;
  private list: Array<ListType>;
  private index: number;
  private shuffledIndexes: Array<number>;
  private queue: Array<ListType>;
  private shuffle: boolean;
  private shufflePivot: number;
  private loop: number;
  private isAlbum: boolean;

  constructor(
    playerCallback: CallbackType,
    isAlbum: boolean,
    list?: Array<ListType>,
    index?: number,
    loop?: number,
    shuffle?: boolean,
    volume?: number
  ) {
    if (MuseonMusicPlayer.instance) {
      throw "There should only be one music player instance";
    }
    this.callback = playerCallback;
    this.isAlbum = isAlbum;
    this.loop = loop || 0;
    this.shuffle = shuffle || false;
    this.index = index || 0;
    this.list = list || [];
    this.shuffledIndexes = shuffleIndexes(this.list);
    this.shufflePivot = this.index;
    this.queue = [];
    this.fetcher = new Audio();
    this.player = new Audio();
    this.player.volume = volume || 1;
    this.player.onended = this.onMusicEnd;
    this.updateMusic(this.index);
    this.setMediaButtons();
    setInterval(this.notify, 200);
    MuseonMusicPlayer.instance = this;
  }

  private notify = () => {
    this.callback(
      this.getCover(),
      this.isPlaying(),
      this.index,
      this.getFormatedCurrentTime(),
      this.getFormatedDuration(),
      this.getProgress(),
      this.gettitle(),
      this.getAlbum(),
      this.getArtists(),
      this.isAlbum
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
      this.gettitle(),
      this.getAlbum(),
      this.getArtists()
    );
    this.fetchNext();
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
    this.player.currentTime = isNaN(currentTime) ? 0 : currentTime;
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
    return this.list[this.index]?.album.cover;
  };

  private gettitle = () => {
    return this.list[this.index]?.title;
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
    title: string,
    album: AlbumType,
    artists: Array<ArtistType>
  ) => {
    const artistNames: Array<string> = [];
    artists.forEach(({ name }) => {
      artistNames.push(name);
    });
    const mergedArtists = artistNames.join(", ");
    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: title,
        artist: mergedArtists,
        album: album.title,
        artwork: [{ src: cover, sizes: "512x512", type: "image/png" }],
      });
    }
  };

  private getIndexBeforePivot = () => {
    const index = this.shuffledIndexes.indexOf(this.shufflePivot) - 1;
    if (index < 0) {
      return this.shuffledIndexes[this.shuffledIndexes.length - 1];
    }
    return this.shuffledIndexes[index];
  };

  private getNextIndex = () => {
    if (!this.shuffle) return this.index + 1;
    const nextIndex = this.shuffledIndexes.indexOf(this.index) + 1;
    if (nextIndex === this.shuffledIndexes.length) {
      return this.shuffledIndexes[0];
    } else {
      return this.shuffledIndexes[nextIndex];
    }
  };

  private getPrevIndex = () => {
    if (!this.shuffle) return this.index - 1;
    const prevIndex = this.shuffledIndexes.indexOf(this.index) - 1;
    if (prevIndex < 0) {
      return this.shuffledIndexes[this.shuffledIndexes.length - 1];
    } else {
      return this.shuffledIndexes[prevIndex];
    }
  };

  private checkNextIndex = (index: number) => {
    if (!this.shuffle) return index !== this.list.length;
    return index !== this.shufflePivot;
  };

  private checkPrevIndex = (index: number) => {
    if (!this.shuffle) return index < 0;
    return index === this.getIndexBeforePivot();
  };

  private fetchNext = () => {
    let nextIndex = this.getNextIndex();
    nextIndex = nextIndex === this.list.length ? 0 : nextIndex;
    this.fetcher.src = this.list[nextIndex].src;
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
    let nextIndex = this.getNextIndex();
    if (this.checkNextIndex(nextIndex)) {
      this.updateMusic(nextIndex);
      this.play();
    } else {
      nextIndex = this.shuffle ? this.shufflePivot : 0;
      this.updateMusic(nextIndex);
      if (this.loop !== LOOP_STATES.NoLoop) {
        this.play();
      }
    }
  };

  prev = () => {
    if (this.shouldRewind()) {
      this.rewind();
      return;
    }
    let prevIndex = this.getPrevIndex();
    if (this.checkPrevIndex(prevIndex)) {
      if (this.loop === LOOP_STATES.NoLoop) {
        this.rewind();
        return;
      } else {
        if (this.shuffle) {
          prevIndex = this.getIndexBeforePivot();
        } else {
          prevIndex = this.list.length - 1;
        }
      }
    }
    this.updateMusic(prevIndex);
    this.play();
  };

  updateList = (list: Array<ListType>, isAlbum: boolean, index: number) => {
    this.list = list;
    this.isAlbum = isAlbum;
    this.updateMusic(index);
    this.shufflePivot = index;
    this.shuffledIndexes = shuffleIndexes(this.list);
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
    if (active) {
      this.shufflePivot = this.index;
    }
    this.shuffle = active;
    this.fetchNext();
  };

  setLoop = (loopState: number) => {
    this.loop = loopState;
  };
}

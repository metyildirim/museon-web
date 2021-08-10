import React from "react";
import MMP, { LoopStates } from "../../../utils/museon-music-player";

type MusicPlayerProps = {};

class MusicPlayer extends React.Component {
  mmp?: MMP;

  constructor(props: MusicPlayerProps) {
    super(props);
  }

  componentDidMount() {
    this.mmp = new MMP([
      "https://firebasestorage.googleapis.com/v0/b/actuel.appspot.com/o/sil-mp3%2Fwhere_is_my_mind.mp3?alt=media&token=e802d401-a50b-48e0-95f2-8934f7673e60",
    ]);
    this.mmp.addToQueue("");
  }

  render() {
    return <div className="player-container"></div>;
  }
}

export default MusicPlayer;

import { useEffect, useRef, useState } from "react";

export default function useMusicSelect(
  songList: { name: string; src: string }[]
) {
  const [selectedSongName, setSelectedSongName] = useState("");
  const audioRef = useRef(null);
  const musicListRef = useRef(null);

  useEffect(() => {
    let spans: null | Element[] = null;

    function playMusic(e: any) {
      e.preventDefault();
      e.stopImmediatePropagation();
      const songName = e.target?.innerText;
      const foundSong = songList.find(({ name }) => name === songName);
      if (audioRef.current) {
        // @ts-ignore
        audioRef.current.src = foundSong?.src;
        // @ts-ignore
        audioRef.current.play();
      }
      console.log(foundSong);
    }

    if (!musicListRef.current) {
      spans = Array.from(
        document.querySelectorAll(
          ".ck.ck-dropdown.ckeditor5-musicSelect-dropdown>div>ul>li>button>span"
        )
      );
      if (spans) {
        spans.forEach((span) => span.addEventListener("click", playMusic));
      }
      console.log(spans);

      return () => {
        if (spans)
          spans.forEach((span) => span.removeEventListener("click", playMusic));
      };
    }
  }, [musicListRef]);

  const handleMusicSelect = ({ name, src }: { name: string; src: string }) => {
    setSelectedSongName(name);
    //TODO 음악 선택 후 처리
    alert(`${name}${src}`);
  };

  const handleResetMusicSelect = () => {
    setSelectedSongName("");
    audioRef.current = null;
    musicListRef.current = null;
  };

  return {
    audioRef,
    selectedSongName,
    handleMusicSelect,
    handleResetMusicSelect,
  };
}

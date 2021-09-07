import { useEffect, useRef, useState } from "react";

export default function useMusicSelect(
  songList: { name: string; src: string }[]
) {
  const [selectedSongName, setSelectedSongName] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const musicListRef = useRef(null);

  useEffect(() => {
    let spans: null | Element[] = null;
    const audio: HTMLAudioElement | null = audioRef.current;

    //TODO 아이콘 원복
    function allPauseIconToPlayIcon(){
      const playings = Array.from(document.querySelectorAll('.playing'))
      playings.forEach((element) => {
        element.classList.remove("playing")
      })
    }

    function playMusic(e: any) {
      e.preventDefault();
      e.stopImmediatePropagation();
      const target = e.target
      const songName = target?.innerText;
      const foundSong = songList.find(({ name }) => name === songName);
      if (audio) {
        console.log(foundSong?.name)
        // ! 음악 재생중이 아닐 때
        allPauseIconToPlayIcon()
        console.log(target)
        target.parentElement.classList.add("playing")
        audio.src = foundSong?.src || "";
        audio.play();
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
      if (audio){
        audio.addEventListener('ended', allPauseIconToPlayIcon)
      }

      return () => {
        if (spans)
          spans.forEach((span) => span.removeEventListener("click", playMusic));

        if (audio) audio.removeEventListener('ended', allPauseIconToPlayIcon)
      };
    }
  }, [musicListRef]);

  const handleMusicSelect = ({ name, src }: { name: string; src: string }) => {
    setSelectedSongName(name);
    //TODO 음악 선택 후 처리
    // alert(`${name}${src}`);
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

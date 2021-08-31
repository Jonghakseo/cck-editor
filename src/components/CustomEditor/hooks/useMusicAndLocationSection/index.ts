import { useEffect } from "react";

export default function useMusicAndLocationSection(
  selectedSongName: string,
  location: any
) {
  useEffect(() => {
    const section = document.getElementById("ckeditor__location__music");
    if (section) {
      if (!selectedSongName && !location) {
        section && section.remove();
      }
    } else {
      if (selectedSongName || location) {
        const res = document.querySelectorAll(
          ".ck.ck-editor__top.ck-reset_all"
        );
        if (res && res.length > 0) {
          const div = document.createElement("div");
          div.id = "ckeditor__location__music";
          res[0].appendChild(div);
        }
      }
    }
  }, [selectedSongName, location]);

  useEffect(()=>{
      const music = document.getElementById("ckeditor__selected__music");
      if (selectedSongName){

      }
  },[selectedSongName])
}

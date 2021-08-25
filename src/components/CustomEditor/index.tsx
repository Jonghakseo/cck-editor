import React, { ChangeEvent, useEffect, useRef, useState } from "react";
// @ts-ignore
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { EditorUploadAdapterPlugin } from "./plugins/EditorUploadAdapterPlugin";
import { MOCK_DATA } from "./mock/data";
import "./font.css";
import "./style.css";
import { checkHashKeyword } from "../../apis/hashTag";
const ClassicEditor = require("../../ckeditor/build/ckeditor");

export interface Props {
  onChange?: (data: any) => any;
}

const SAMPLE_SONGS = [
  {
    name: "시끄러운 알람소리",
    src: "https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg",
  },
  {
    name: "귀여운 망아지",
    src: "https://www.w3schools.com/tags/horse.mp3",
  },
  {
    name: "잔잔한 피아노",
    src: "https://www.kozco.com/tech/piano2.wav",
  },
];

const CustomEditor: React.FC<Props> = ({ onChange }: Props) => {
  const editorRef = useRef<null | HTMLAudioElement>(null);
  const audioRef = useRef(null);
  const musicListRef = useRef(null);
  const [selectedSongName, setSelectedSongName] = useState("")

  const [data, setData] = useState(MOCK_DATA);
  const [saveCount, setSaveCount] = useState<number>(
    () => Number(window.localStorage.getItem("cckEditorSaveCount")) || 0
  );
  const [autoList, setAutoList] = useState<string[]>([]);

  const handleSave = () => {
    setSaveCount((prev) => prev + 1);
    window.localStorage.setItem("cckEditorSaveCount", `${saveCount + 1}`);
    window.localStorage.setItem("cckEditor", data.toString());
    alert("임시 저장 되었습니다.");
  };

  const getSaveData = () => {
    setData(window.localStorage.getItem("cckEditor") || "");
  };

  const handleTagChange = async ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    console.log(value);
    if (value) {
      try {
        const autoList = await checkHashKeyword(value);
        setAutoList(autoList);
      } catch (e) {
        console.error(e);
      }
    } else {
      setAutoList([]);
    }
  };
  console.log(autoList);

  useEffect(() => {
    let spans: null | Element[] = null;

    function playMusic(e: any) {
      e.preventDefault();
      e.stopImmediatePropagation();
      const songName = e.target?.innerText;
      const foundSong = SAMPLE_SONGS.find(({ name }) => name === songName);
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

  const editorConfig = {
    extraPlugins: [EditorUploadAdapterPlugin],
    fontFamily: {
      options: [
        "NanumSquare",
        "고운밤",
        "범솜체",
        "왼손잡이도 예뻐",
        "암스테르담",
        "성실체",
      ],
    },
    video: {
      upload: {
        types: ["mp4", "mov", "avi"],
      },
    },
    musicSelect: {
      // @ts-ignore
      onSelect: ({ name, src }) => {
        setSelectedSongName(name)
        //TODO 음악 선택 후 처리
        alert(`${name}${src}`);
      },
      lists: SAMPLE_SONGS,
    },
    toolbar: {
      items: [
        "musicSelect",
        "fontfamily",
        "fontsize",
        "|",
        "bold",
        "underline",
        "italic",
        "strikethrough",
        "|",
        "fontColor",
        "fontBackgroundColor",
        "|",
        "alignment",
        "horizontalLine",
        "numberedList",
        "lineHeight",
        "|",
        "blockQuote",
        "insertTable",
        "link",
        "uploadImage",
        "mediaEmbed",
        "videoUpload",
      ],
      shouldNotGroupWhenFull: true,
    },
    placeholder: "내용",
    // 업로드로더 API 요청 파라미터 전송
    uploadInfo: "pic",
  };

  return (
    <div>
      <audio ref={audioRef} />
      <p>{selectedSongName}</p>
      <CKEditor
        ref={editorRef}
        editor={ClassicEditor}
        config={editorConfig}
        data={data}
        onChange={(event: any, editor: { getData: () => any }) => {
          const data = editor.getData();
          setData(data);
          console.log(data);
          if (onChange) onChange(data);
        }}
      />
      <div style={{ position: "relative" }}>
        <p>태그 자동완성 테스트</p>
        <input onChange={handleTagChange} />
        <ul className={"autoTagList"}>
          {autoList.map((keyword) => {
            return <li key={keyword}>{keyword}</li>;
          })}
        </ul>
      </div>
      <div>
        <button onClick={handleSave}>임시저장({saveCount})</button>
        <button onClick={getSaveData}>불러오기</button>
      </div>
    </div>
  );
};

CustomEditor.defaultProps = {};
export default CustomEditor;

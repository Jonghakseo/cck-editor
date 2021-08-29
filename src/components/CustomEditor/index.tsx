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
  const [selectedSongName, setSelectedSongName] = useState("");

  const [data, setData] = useState(MOCK_DATA);
  const [saveCount, setSaveCount] = useState<number>(
    () => Number(window.localStorage.getItem("cckEditorSaveCount")) || 0
  );
  const [autoList, setAutoList] = useState<string[]>([]);
  const [tagText, setTagText] = useState<string>("");
  const [tagList, setTagList] = useState<string[]>([]);

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
    // console.log(value);
    if (value) {
      setTagText(value);
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
  // console.log(autoList);

  // tag 추가
  const handleAddtag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    const target = e.target as HTMLTextAreaElement;
    const value = target.value;
    // 3개까지만 가능하게 제한을 둔다.
    if (tagList.length === 3) return;
    setTagList((prev) => [...prev, value]);
    setTagText("");
  };

  // tag 삭제
  const handleDeleteTag = (idx: number) => {
    setTagList((prev) =>
      prev.filter((item) => {
        return prev.indexOf(item) !== idx;
      })
    );
  };

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
        setSelectedSongName(name);
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
        "doubleQoute",
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
    placeholder: "제목",
    // 업로드로더 API 요청 파라미터 전송
    uploadInfo: "pic",
  };

  return (
    <div className="ckeditor__total__wrapper">
      <audio ref={audioRef} />
      <p>{selectedSongName}</p>

      <div className="ckeditor__wrapper">
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

        {/* tag */}
        <div className="tag__wrapper">
          <div className="tag__tags">
            {tagList.map((tag, idx) => {
              return (
                <div className="tag__item" key={tag}>
                  <span>#</span>
                  <span>{tag}</span>
                  <span
                    className="tag__item__delete-btn"
                    onClick={() => handleDeleteTag(idx)}
                  >
                    x
                  </span>
                </div>
              );
            })}

            <div className="tag__input-and-autolist-wrapper">
              <input
                className="tag__input"
                onChange={handleTagChange}
                placeholder="# 키워드 입력(최대 3개)"
                onKeyPress={(e) => handleAddtag(e)}
                value={tagText || ""}
              />

              {/* recommendation */}
              {autoList.length !== 0 && (
                <ul className="autoTagList">
                  {autoList.map((keyword) => {
                    return <li key={keyword}>{keyword}</li>;
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="btn__wrapper">
        <button onClick={handleSave}>임시저장({saveCount})</button>
        <button onClick={getSaveData}>불러오기</button>
      </div>
    </div>
  );
};

CustomEditor.defaultProps = {};
export default CustomEditor;

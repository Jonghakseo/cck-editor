import React, { useRef, useState } from "react";
// @ts-ignore
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { EditorUploadAdapterPlugin } from "./plugins/EditorUploadAdapterPlugin";
import { MOCK_DATA } from "./mock/data";
import "./font.css";
import "./style.css";
import useMusicSelect from "./hooks/useMusicSelect";
import useTempSave from "./hooks/useTempSave";
import useAutoComplete from "./hooks/useAutoComplete";
import URLS from "../../routes/urls";
import useAddLocation from "./hooks/useAddLocation";

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
  const { audioRef, selectedSongName, handleMusicSelect } =
    useMusicSelect(SAMPLE_SONGS);

  const [data, setData] = useState(MOCK_DATA);

  const { getSaveData, handleSave, saveCount } = useTempSave(data, setData);
  useAddLocation();

  const { handleTagChange, autoList } = useAutoComplete();

  const editorConfig = {
    extraPlugins: [EditorUploadAdapterPlugin],
    addLocation: {
      userLocation: "신당동",
      onClickUserLocation: ({ value }: any) => {
        alert(value);
      },
      onClickOpenMap: () => {
        window.open(
          URLS.MAP,
          "title",
          "width=600, height=700, toolbar=no, menubar=no, scrollbars=no, resizable=yes"
        );
      },
    },
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
      onSelect: handleMusicSelect,
      lists: SAMPLE_SONGS,
    },
    toolbar: {
      items: [
        "addLocation",
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
            {/* {tagList.map((tag, idx) => {
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
            })} */}

            <div className="tag__input-and-autolist-wrapper">
              {/* <input
                className="tag__input"
                onChange={handleTagChange}
                placeholder="# 키워드 입력(최대 3개)"
                onKeyPress={(e) => handleAddtag(e)}
                value={tagText || ""}
              /> */}

              {/* recommendation */}
              {/* {autoList.length !== 0 && (
                <ul className="autoTagList">
                  {autoList.map((keyword) => {
                    return <li key={keyword}>{keyword}</li>;
                  })}
                </ul>
              )} */}
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

import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
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
import useMusicAndLocationSection from "./hooks/useMusicAndLocationSection";

// svg icons
import LocationIcon from "./icon/maps-and-flags.svg";
import MusicIcon from "./icon/musical-note.svg";

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
  const {
    audioRef,
    selectedSongName,
    handleMusicSelect,
    handleResetMusicSelect,
  } = useMusicSelect(SAMPLE_SONGS);
  const [title, setTitle] = useState<string>("");
  const [tagText, setTagText] = useState<string>("");
  const [tagList, setTagList] = useState<string[]>([]);

  const [data, setData] = useState(MOCK_DATA);

  const { getSaveData, handleSave, saveCount } = useTempSave(data, setData);

  const { location, setLocation } = useAddLocation();

  const { handleTagChange, clearAutoList, autoList } = useAutoComplete();

  // useMusicAndLocationSection(selectedSongName, location);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const addTag = (value: string) => {
    setTagList((prev: string[]) => [...prev, value]);
    setTagText("");
    clearAutoList();
  };
  // tag 추가
  const handleAddtag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
      const target = e.target as HTMLInputElement;
      const value = target.value;
      // 3개까지만 가능하게 제한을 둔다.
      if (tagList.length < 3) addTag(value);
    }
  };

  // tag 삭제
  const handleDeleteTag = (idx: number) => {
    setTagList((prev: string[]) =>
      prev.filter((item) => {
        return prev.indexOf(item) !== idx;
      })
    );
  };

  const editorConfig = {
    extraPlugins: [EditorUploadAdapterPlugin],
    addLocation: {
      userLocation: "신당동",
      onClickUserLocation: ({ value }: any) => {
        setLocation({ title: value });
      },
      onClickOpenMap: () => {
        window.open(
          URLS.MAP,
          "map",
          "width=940, height=700, toolbar=no, menubar=no, scrollbars=no, resizable=yes"
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
        "|",
        "fontfamily",
        "fontsize",
        "doubleQoute",
        "frameQuote",
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

  const isShowLocationAndMusic = selectedSongName || location;
  const locationAndMusic = (
    <div id={"ckeditor__location__music"}>
      {location && (
        <p id={"selected_location"}>
          <svg
            className="ckeditor__location__music__icon"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 512 512"
          >
            <g>
              <g>
                <path
                  d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
			c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
			c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"
                />
              </g>
            </g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
          </svg>

          <span>{location?.title}</span>
          <span
            className="ckeditor__location__music__cancel-btn"
            onClick={() => setLocation(null)}
          >
            x
          </span>
        </p>
      )}
      {selectedSongName && (
        <p id={"selected_music"}>
          {/* <img
            src={MusicIcon}
            alt="song icon"
            className="ckeditor__location__music__icon"
          /> */}
          <svg
            className="ckeditor__location__music__icon"
            id="Capa_1"
            enable-background="new 0 0 448 448"
            viewBox="0 0 448 448"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m442.016 3.5c-3.744-3.04-8.672-4.096-13.472-3.136l-288 64c-7.328 1.632-12.544 8.128-12.544 15.616v253.12c-13.408-8.128-29.92-13.12-48-13.12-44.096 0-80 28.704-80 64s35.904 64 80 64 80-28.704 80-64v-195.168l256-56.896v137.184c-13.408-8.128-29.92-13.12-48-13.12-44.128 0-80 28.704-80 64s35.872 64 80 64 80-28.704 80-64v-304c0-4.864-2.176-9.44-5.984-12.48z" />
            <g />
            <g />
            <g />
            <g />
            <g />
            <g />
            <g />
            <g />
            <g />
            <g />
            <g />
            <g />
            <g />
            <g />
            <g />
          </svg>
          <span>{selectedSongName}</span>
          <span
            className="ckeditor__location__music__cancel-btn"
            onClick={handleResetMusicSelect}
          >
            x
          </span>
        </p>
      )}
    </div>
  );

  return (
    <div className="ckeditor__total__wrapper">
      <audio ref={audioRef} />
      <div
        className={`ckeditor__wrapper${
          isShowLocationAndMusic ? " expanded" : ""
        }`}
      >
        <div className="ckeditor__title__wrapper">
          <input
            className="ckeditor__title__input"
            type="text"
            onChange={(e) => handleTitleChange(e)}
            value={title}
            placeholder="제목"
          />
        </div>

        {isShowLocationAndMusic && locationAndMusic}

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
            {tagList.map((tag: string, idx: number) => {
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
              {tagList.length < 3 && (
                <input
                  className="tag__input"
                  onChange={(e) => {
                    handleTagChange(e);
                    setTagText(e.target.value);
                  }}
                  placeholder="# 키워드 입력(최대 3개)"
                  onKeyPress={(e) => handleAddtag(e)}
                  value={tagText || ""}
                />
              )}
              {/* recommendation */}
              {autoList.length !== 0 && (
                <ul className="autoTagList">
                  {autoList.map((keyword: string) => {
                    return (
                      <li key={keyword} onClick={() => addTag(keyword)}>
                        {keyword}
                      </li>
                    );
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

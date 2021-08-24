import React, { ChangeEvent, useRef, useState } from "react";
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

const CustomEditor: React.FC<Props> = ({ onChange }: Props) => {
  const editorRef = useRef(null);
  const [data, setData] = useState(MOCK_DATA);
  const [saveCount, setSaveCount] = useState<number>(
    () => Number(window.localStorage.getItem("cckEditorSaveCount")) || 0
  );
  const [autoList, setAutoList] = useState<string[]>([])

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
    console.log(value)
    if (value){
      try {
        const autoList = await checkHashKeyword(value)
        setAutoList(autoList);
      } catch (e) {
        console.error(e);
      }
    }else {
      setAutoList([])
    }
  };
  console.log(autoList)

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
    toolbar: {
      items: [
        // "heading",
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
    placeholder: "내용을 입력해주세요",
    // 업로드로더 API 요청 파라미터 전송
    uploadInfo: "pic",
  };

  return (
    <div>
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

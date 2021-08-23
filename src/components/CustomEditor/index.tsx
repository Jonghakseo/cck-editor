import React, { useRef } from "react";
// @ts-ignore
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { EditorUploadAdapterPlugin } from "./plugins/EditorUploadAdapterPlugin";
import { MOCK_DATA } from "./mock/data";
import "./font.css";
const ClassicEditor = require("../../ckeditor/build/ckeditor");

export interface Props {}

const CustomEditor: React.FC<Props> = (props: Props) => {
  const editorRef = useRef(null);

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
    <CKEditor
      ref={editorRef}
      editor={ClassicEditor}
      config={editorConfig}
      data={MOCK_DATA}
      onChange={(event: any, editor: { getData: () => any }) => {
        const data = editor.getData();
        console.log(data);
        // if (onChange) onChange(data);
      }}
    />
  );
};

CustomEditor.defaultProps = {};
export default CustomEditor;

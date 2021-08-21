import React, { useRef } from "react";
// import ClassicEditor  from "../../ckeditor/build/ckeditor";
// @ts-ignore
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { EditorUploadAdapterPlugin } from "./plugins/EditorUploadAdapterPlugin";
import { MOCK_DATA } from "./mock/data";
// @ts-ignore

const ClassicEditor = require("../../ckeditor/build/ckeditor");

export interface Props {}

const CustomEditor: React.FC<Props> = (props: Props) => {
  const editorRef = useRef(null);

  const editorConfig = {
    extraPlugins: [EditorUploadAdapterPlugin],
    alignment: {
      options: ["left", "center", "right"],
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
        //TODO video
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

import { imageUpload } from "../../../../apis/imageUpload";

type UploadCode = "picture";

class EditorUploadAdapter {
  private loader: any;

  private uploadInfo: UploadCode;

  constructor(loader: any, uploadInfo: UploadCode) {
    this.loader = loader;
    this.uploadInfo = uploadInfo;
  }

  upload() {
    // Return a promise that will be resolved when the file is uploaded.
    return this.loader.file.then(async (file: any) => {
      // const hide = message.loading("이미지 업로드중..");
      try {
        console.log(file)
        const url = await imageUpload(file);
        // CKEditor 에서 참조 하는 지정 필드 (default)
        return { default: url };
      } catch (e) {
        console.error(e);
        return { default: null };
      } finally {
        // setTimeout(hide, 0);
      }
    });
  }

  // Aborts the upload process.
  abort() {
    // Reject the promise returned from the upload() method.
    // server.abortUpload();
  }
}

// @ts-ignore
export function EditorUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader: any) => {
    return new EditorUploadAdapter(loader, editor.config.get("uploadInfo"));
  };
}

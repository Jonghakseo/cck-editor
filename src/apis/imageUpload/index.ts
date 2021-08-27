import {Method, request} from "../../network/Request";

export function imageUpload(imgFile:File) {
    const body = new FormData()
    body.append('file', imgFile)
    return request({
        method: Method.POST,
        baseUrl: "url",
        body
    });
}

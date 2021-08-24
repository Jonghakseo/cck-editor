const MOCK_TAGS = [
  "fontfamily(1)",
  "fontsize(1)",
  "bold(2)",
  "underline(1)",
  "italic(11)",
  "strikethrough(1)",
  "fontColor(1)",
  "fontBackgroundColor(1)",
  "alignment(1)",
  "horizontalLine(1)",
  "numberedList(1)",
  "lineHeight(1)",
  "blockQuote(1)",
  "insertTable(1)",
  "link(1)",
  "uploadImage(1)",
  "mediaEmbed(1)",
  "videoUpload(1)",
    "가나다(8)"
];

export const checkHashKeyword = async (keyword:string):Promise<string[]> =>{
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve(MOCK_TAGS.filter((tag)=>{
                return tag.includes(keyword)
            }).slice(0,3))
        },400)
    })
}

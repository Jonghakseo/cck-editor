const MOCK_TAGS = [
  "fontfamily",
  "fontsize",
  "bold",
  "underline",
  "italic",
  "strikethrough",
  "fontColor",
  "fontBackgroundColor",
  "alignment",
  "horizontalLine",
  "numberedList",
  "lineHeight",
  "blockQuote",
  "insertTable",
  "link",
  "uploadImage",
  "mediaEmbed",
  "videoUpload",
  "가나다",
];

export interface TagListType {
  text: string;
  count: number;
}

export const checkHashKeyword = async (
  keyword: string
): Promise<TagListType[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let list = MOCK_TAGS.filter((tag) => {
        return tag.includes(keyword);
      }).slice(0, 3);

      const totalList = list.map((item) => {
        return {
          text: item,
          count: MOCK_TAGS.filter((tag) => {
            return tag === item;
          }).length,
        };
      });

      resolve(totalList);

      //   resolve(
      // MOCK_TAGS.filter((tag) => {
      //   return tag.includes(keyword);
      // }).slice(0, 3)
      //   );
    }, 400);
  });
};

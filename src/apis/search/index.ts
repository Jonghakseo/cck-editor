import { Method, request } from "../../network/Request";

// const realUrl = "https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode"
const lambdaUrl =
  "https://pvcp4p1ii9.execute-api.ap-northeast-2.amazonaws.com/default/searchNaverKeyword";

export interface SearchResultItem {
  address: string;
  category: string;
  description: string;
  link: string;
  mapx: number;
  mapy: number;
  roadAddress: string;
  telephone: string;
  title:string
}
export interface SearchResult {
  display: number;
  items: SearchResultItem[];
}

export const keywordSearch = async (keyword: string) => {
  const { data } = await request({
    method: Method.GET,
    baseUrl: lambdaUrl,
    queryParams: {
      key: keyword,
    },
  });

  return JSON.parse(data) as SearchResult;
};

import {Method, request} from "../../network/Request";

// const realUrl = "https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode"
const lambdaUrl = "https://pvcp4p1ii9.execute-api.ap-northeast-2.amazonaws.com/default/searchNaverKeyword"

export const keywordSearch = async (keyword:string) =>  {
    const {data } =await request({
        method: Method.GET,
        baseUrl: lambdaUrl,
        queryParams:{
            key:keyword
        }
    });

    return JSON.parse(data)
}



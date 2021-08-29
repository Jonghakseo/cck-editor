import React, { useEffect, useRef, useState } from "react";
import { keywordSearch, SearchResultItem } from "../apis/search";

declare const naver: any;

export interface Props {}

const MapPage: React.FC<Props> = (props: Props) => {
  const mapRef = useRef<any>(null);
  const map = mapRef.current;
  const inputRef = useRef<null | HTMLInputElement>(null);
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);

  const moveMap = (x: number, y: number) => {
    const point = new naver.maps.Point(x, y);
    const latLng = naver.maps.TransCoord.fromTM128ToLatLng(point);
    map.setCenter(latLng); // 중심 좌표 이동
    map.setZoom(14); // 줌 레벨 변경

    var marker = new naver.maps.Marker({
      position: latLng,
      map: map,
    });
  };

  const handleSearch = async () => {
    const input = inputRef.current;
    if (input !== null) {
      const key = input?.value;
      try {
        const { items } = await keywordSearch(key);
        console.log(items);
        setSearchResults(items);
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      var mapOptions = {
        center: new naver.maps.LatLng(37.3895704, 127.105399),
        mapDataControl: true,
        zoom: 10,
      };
      mapRef.current = new naver.maps.Map("map", mapOptions);
    }, 100);

    return () => {
      mapRef.current.destroy();
    };
  }, []);
  return (
    <article>
      <div className={"map_header"}>
        <input
          ref={inputRef}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
        <button onClick={handleSearch}>검색</button>
      </div>
      <div className={"map_contents"} style={{ display: "flex" }}>
        <div className={"map_search_result"}>
          {searchResults?.map((item, index) => {
            return (
              <div
                key={index.toString()}
                onClick={() => moveMap(item.mapx, item.mapy)}
              >
                <h3>{item.title}</h3>
                <p>{item.roadAddress}</p>
              </div>
            );
          })}
        </div>
        <div id={"map"} style={{ width: "400px", height: "400px" }} />
      </div>
    </article>
  );
};

MapPage.defaultProps = {};
export default MapPage;

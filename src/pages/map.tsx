import React, { useEffect, useRef, useState } from "react";
import { keywordSearch, SearchResultItem } from "../apis/search";
import "./map.css";

declare const naver: any;

export interface Props {}

const naverMaker =
  '<img class="map_marker_icon" draggable="false" src="http://static.naver.net/maps/mantle/1x/marker-default.png" alt="" crossorigin="anonymous" style="margin: 0px; padding: 0px; border: 0px solid transparent; display: block; -webkit-user-drag: none; box-sizing: content-box !important; max-width: none !important; max-height: none !important; min-width: 0px !important; min-height: 0px !important; position: absolute; cursor: inherit; width: 22px; height: 33px; left: 0px; top: 0px;">';

function makeMarkerContent(title: string, addr: string) {
  return `<div style="position: relative">
<div class="map_marker_wrapper">
<div class="map_marker_content">
<input value="${title}" id="map_marker_input"/><span>${addr}</span>
</div>
<!--<div class="map_marker_button">-->
<!--<button id="map_marker_add_button">추가</button>-->
<!--</div>-->
</div>
${naverMaker}
</div>`;
}

const MapPage: React.FC<Props> = (props: Props) => {
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const inputRef = useRef<null | HTMLInputElement>(null);
  const [selfSelect, setSelfSelect] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);

  const moveMap = (item: SearchResultItem) => {
    const { mapy, mapx, title, address } = item;
    const point = new naver.maps.Point(mapx, mapy);
    const latLng = naver.maps.TransCoord.fromTM128ToLatLng(point);
    mapRef.current.setCenter(latLng); // 중심 좌표 이동
    mapRef.current.setZoom(17); // 줌 레벨 변경

    if (markerRef.current) {
      markerRef.current.setVisible(true);
      markerRef.current.setPosition(latLng);
      markerRef.current.setIcon({
        content: makeMarkerContent(htmlToString(title), address),
        size: new naver.maps.Size(336, 90),
      });
    }
  };

  const handleAddLocation = () => {
    const titleInput = document.getElementById(
      "map_marker_input"
    ) as HTMLInputElement;
    if (markerRef.current && titleInput) {
      const { value: title } = titleInput;
      const position = markerRef.current.getPosition();
      if (!title) {
        alert("등록하려는 위치명이 없습니다.");
      }
      if (!position) {
        alert("위치정보가 없습니다.");
      }
      if (window.confirm("현재 위치를 등록하시겠습니까?")) {
        const data = JSON.stringify({ title, position });
        console.log(data);
        window.opener.postMessage(data, "*");
        window.close();
      }
    }else{
      alert("등록하려는 위치가 없습니다.");
    }
  };

  const handleSearch = async () => {
    const input = inputRef.current;
    if (input !== null) {
      const key = input?.value;
      try {
        const { items } = await keywordSearch(key);
        console.log(items);
        setSearchResults(items);
        if (items.length > 0) moveMap(items[0]);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleSelfSearch = () => {
    function handleSelect(e: any) {
      mapRef.current.setCenter(e.coord);
      markerRef.current.setPosition(e.coord);
      markerRef.current.setVisible(true);
      markerRef.current.setIcon({
        content: makeMarkerContent("나만의 장소", ""),
        size: new naver.maps.Size(336, 90),
      });
    }
    if (selfSelect) {
      markerRef.current.setVisible(false);
      naver.maps.Event.clearInstanceListeners(mapRef.current);
    } else {
      naver.maps.Event.addListener(mapRef.current, "click", handleSelect);
    }

    setSelfSelect((p) => !p);
  };

  useEffect(() => {
    setTimeout(() => {
      var mapOptions = {
        center: new naver.maps.LatLng(37.3895704, 127.105399),
        mapDataControl: true,
        zoom: 14,
      };
      mapRef.current = new naver.maps.Map("map", mapOptions);
      markerRef.current = new naver.maps.Marker({
        position: null,
        map: mapRef.current,
        // animation: naver.maps.Animation.DROP,
        visible: false,
      });
    }, 100);

    function handleClick(e: any) {
      console.log(e);
      if (e.target) {
        if (e.target.id) {
          if (e.target.id === "map_marker_input") {
            e.stopImmediatePropagation();
            e.preventDefault();
            e.target.focus();
            e.target.value = "";
          }
          if (e.target.id === "map_marker_add_button") {
            e.stopImmediatePropagation();
            e.preventDefault();
            handleAddLocation();
          }
        }
      }
    }

    window.addEventListener("click", handleClick);

    return () => {
      mapRef.current.destroy();
      window.removeEventListener("click", handleClick);
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
      <div className={"map_contents"}>
        <div className={"map_search_result"}>
          {searchResults?.map((item, index) => {
            return (
              <div key={index.toString()} onClick={() => moveMap(item)}>
                <h3>{htmlToString(item.title)}</h3>
                <p>{item.roadAddress}</p>
              </div>
            );
          })}
        </div>
        <div id="map" />
      </div>
      <div>
        <button onClick={handleSelfSearch}>
          {selfSelect ? "직접선택 해제" : "지도에서 직접선택"}
        </button>
        <button onClick={handleAddLocation}>확인</button>
      </div>
    </article>
  );
};

MapPage.defaultProps = {};
export default MapPage;

function htmlToString(oriText: string) {
  var newText = oriText.replace(/(<([^>]+)>)/gi, "");
  return newText.replaceAll("&amp;", "&");
}

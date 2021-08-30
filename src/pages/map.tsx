import React, { useEffect } from "react";

declare const naver: any;

export interface Props {}

const MapPage: React.FC<Props> = (props: Props) => {
  useEffect(() => {
    setTimeout(() => {
      var mapOptions = {
        center: new naver.maps.LatLng(37.3595704, 127.105399),
        zoom: 10,
      };
      var map = new naver.maps.Map("map", mapOptions);
    }, 100);
  }, []);
  return (
    <>
      <div id={"map"} style={{ width: "400px", height: "400px" }} />
      map
    </>
  );
};

MapPage.defaultProps = {};
export default MapPage;

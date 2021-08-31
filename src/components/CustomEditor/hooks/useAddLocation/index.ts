import { useEffect, useState } from "react";

export default function useAddLocation() {
  const [location, setLocation] = useState<any>();
  useEffect(() => {
    function handleMsg(e: any) {
      if (e?.data && typeof e.data === "string") {
        const data = JSON.parse(e.data);
        console.log(e.data);
        console.log(data);
        setLocation(data);
      }
    }

    window.addEventListener("message", handleMsg);

    return () => window.removeEventListener("message", handleMsg);
  }, []);

  return { location };
}

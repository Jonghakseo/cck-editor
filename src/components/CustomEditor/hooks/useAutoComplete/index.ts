import { ChangeEvent, useState } from "react";
import { checkHashKeyword } from "../../../../apis/hashTag";

export default function useAutoComplete() {
  const [autoList, setAutoList] = useState<string[]>([]);
  const clearAutoList = () => setAutoList([]);
  const handleTagChange = async ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    if (value) {
      try {
        const autoList = await checkHashKeyword(value);
        setAutoList(autoList);
      } catch (e) {
        console.error(e);
      }
    } else {
      setAutoList([]);
    }
  };

  return { autoList, clearAutoList, handleTagChange };
}

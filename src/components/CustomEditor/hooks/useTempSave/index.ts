import React, { useState } from "react";

export default function useTempSave(
  data: any,
  setData: React.Dispatch<React.SetStateAction<string>>
) {
  const [saveCount, setSaveCount] = useState<number>(
    () => Number(window.localStorage.getItem("cckEditorSaveCount")) || 0
  );

  const handleSave = () => {
    setSaveCount((prev) => prev + 1);
    window.localStorage.setItem("cckEditorSaveCount", `${saveCount + 1}`);
    window.localStorage.setItem("cckEditor", data.toString());
    alert("임시 저장 되었습니다.");
  };

  const getSaveData = () => {
    setData(window.localStorage.getItem("cckEditor") || "");
  };

  return { handleSave, getSaveData, saveCount };
}

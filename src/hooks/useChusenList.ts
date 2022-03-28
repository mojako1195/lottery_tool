import { useCallback, useState } from "react";

import type { ChusenList } from "../types/chusenList";

export const useChusenList = () => {
  // リスト一覧
  const [chusens, setChusens] = useState<ChusenList[]>([]);

  // リスト追加
  const addChusen = useCallback(
    (title: string, omomi: string) => {
      const isTitle = chusens.some((data) => data.title === title);
      if (isTitle) {
        alert("すでに抽選対象に含まれています。");
        return;
      }
      const newChusens = [...chusens];
      const chusen: ChusenList = {
        title: title,
        omomi: omomi,
      };
      newChusens.push(chusen);
      setChusens(newChusens);
    },
    [chusens]
  );

  // リスト削除
  const deleteChusen = useCallback(
    (index: number) => {
      const newChusenLists = [...chusens];
      newChusenLists.splice(index, 1);
      setChusens(newChusenLists);
    },
    [chusens]
  );

  return { chusens, addChusen, deleteChusen };
};

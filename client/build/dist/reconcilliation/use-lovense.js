import {useEffect, useState} from "../../_snowpack/pkg/react";
export const useLovense = (lovense) => {
  const [info, setInfo] = useState();
  const [canRotate, setCanRotate] = useState(false);
  useEffect(() => {
    if (!lovense) {
      return;
    }
    Promise.all([lovense.info(), lovense.canRotate()]).then(([info2, canRotate2]) => {
      setInfo(info2);
      setCanRotate(canRotate2);
    });
  }, [lovense]);
  if (!(lovense && info)) {
    return;
  }
  return {
    lovense,
    model: info.model,
    id: info.id,
    canVibrate: true,
    canRotate
  };
};

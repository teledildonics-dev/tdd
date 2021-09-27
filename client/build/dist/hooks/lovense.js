import Lovense from "../lovense/lovense.js";
import {useEffect, useState} from "../../_snowpack/pkg/react.js";
export const useLovense = (device, onConnect, onDisconnect) => {
  const [lovense, setState] = useState();
  useEffect(() => {
    const lovense2 = new Lovense(device);
    if (onConnect) {
      lovense2.addEventListener("connect", () => {
        onConnect(lovense2);
      });
    }
    if (onDisconnect) {
      lovense2.addEventListener("disconnect", () => {
        onDisconnect(lovense2);
      });
    }
    setState(lovense2);
    return () => {
      (async () => {
        lovense2.stop().catch((error) => {
          console.error("Error from stop command while cleaning up useLovense():", error);
        });
        await lovense2.disconnect();
        await lovense2.destroy();
      })();
    };
  }, [device, onConnect, onDisconnect]);
  return lovense;
};

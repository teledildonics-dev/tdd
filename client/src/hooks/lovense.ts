import Lovense from "../lovense/lovense";
import { useEffect, useState } from "react";

export const useLovense = (
  device: BluetoothDevice,
  onConnect?: (_: Lovense) => void,
  onDisconnect?: (_: Lovense) => void,
): Lovense | null => {
  const [lovense, setState] = useState();

  useEffect(() => {
    const lovense = new Lovense(device);

    if (onConnect) {
      lovense.addEventListener("connect", () => {
        onConnect(lovense);
      });
    }

    if (onDisconnect) {
      lovense.addEventListener("disconnect", () => {
        onDisconnect(lovense);
      });
    }

    setState(lovense as any);

    return () => {
      (async () => {
        lovense.stop().catch((error) => {
          console.error(
            "Error from stop command while cleaning up useLovense():",
            error,
          );
        });
        await lovense.disconnect();
        await lovense.destroy();
      })();
    };
  }, [device, onConnect, onDisconnect]);

  return lovense as any;
};

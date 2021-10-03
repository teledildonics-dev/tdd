import { useEffect } from "../../_snowpack/pkg/react.js";

let n = 0;
export const useLovenseDebug = (lovense) => {
  useEffect(() => {
    if (!lovense) {
      return;
    }
    n++;
    window.lovense = lovense;
    window[`lovense${n}`] = lovense;
    window.call = window[`call${n}`] = async (command) =>
      lovense.call(command, async (responses) => {
        const { value } = await responses.read();
        return value;
      });
    console.info(
      `%c🌟%c Exported %c${lovense.deviceName()}%c as %cwindow.lovense${n}: Lovense%c, with %cwindow.call${n}: async (command: string) => Promise<void>%c.`,
      "font-family: sans-serif; margin-top: 16px; margin-right: 16px;",
      "font-family: sans-serif;",
      "font-family: sans-serif; color: purple;",
      "font-family: sans-serif;",
      "font-weight: bold;",
      "font-family: sans-serif;",
      "font-weight: bold;",
      " ",
    );
    console.info(lovense);
    console.info(
      "%c🌟%c You may now %cawait call('DeviceType;')%c.",
      "font-family: sans-serif; margin-bottom: 16px; margin-right: 16px;",
      "font-family: sans-serif;",
      "font-weight: bold;",
      "font-family: sans-serif;",
    );
  }, [lovense]);
};

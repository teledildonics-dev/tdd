import {useEffect, useRef, useState} from "../../_snowpack/pkg/react.js";
import {sleep} from "../common/async.js";
export const useThrottledChanges = (interval, value) => {
  const throttled = useRef(false);
  const [throttledValue, setThrottledValue] = useState(value);
  const targetValue = useRef(value);
  useEffect(() => {
    targetValue.current = value;
    if (!throttled.current) {
      throttled.current = true;
      setThrottledValue(value);
      const checkAsync = async (initialValue) => {
        await sleep(interval);
        const latestTargetValue = targetValue.current;
        if (initialValue !== latestTargetValue) {
          setThrottledValue(latestTargetValue);
          checkAsync(latestTargetValue);
        } else {
          throttled.current = false;
        }
      };
      checkAsync(value);
    }
  }, [value]);
  return throttledValue;
};

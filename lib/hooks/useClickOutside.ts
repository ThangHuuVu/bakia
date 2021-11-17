import { MutableRefObject, useEffect } from "react";

function useClickOutside(refs: MutableRefObject<any>[], callback: () => void) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (refs.every((ref) => ref.current && !ref.current.contains(event.target))) {
        callback?.();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [callback]);
}

export default useClickOutside;

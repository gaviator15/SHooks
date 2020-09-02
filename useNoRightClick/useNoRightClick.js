import { useEffect, useRef } from "react";

export const useNoRightClick = (onContextMenu) => {
  if (typeof onContextMenu !== "function") {
    return;
  }
  const element = useRef();
  const banContextMenu = (e) => {
    // 마우스 우클릭 시, 우클릭 메뉴가 뜨지 않도록 제한하는 함수
    e.preventDefault();
  };
  useEffect(() => {
    if (element.current) {
      // 마우스 우클릭 메뉴 제한
      element.current.addEventListener("contextmenu", banContextMenu);
      // 우클릭 시 발생시키고 싶은 (사용자가 지정한)이벤트 동작
      element.current.addEventListener("contextmenu", onContextMenu);
    }
    return () => {
      if (element.current) {
        // Component가 UnMount될 때, 이벤트 제거
        element.current.removeEventListener("contextmenu", banContextMenu);
        element.current.removeEventListener("contextmenu", onContextMenu);
      }
    };
  }, []);
  return element;
};

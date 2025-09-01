import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";

// 생성된 라우트 트리 가져오기
import { routeTree } from "./routeTree.gen";
 
// 새로운 라우터 인스턴스 생성
const router = createRouter({ routeTree });
 
// 타입 안정성을 위한 라우터 인스턴스 등록
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
 
// 애플리케이션 렌더링
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}
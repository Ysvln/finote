import { SidebarProvider, SidebarTrigger } from "@/shared/ui/sidebar";
import { UserSidebar } from "@/widgets/sidebar/UserSidebar";
import { ReactNode } from "react";

interface AppLayoutProps {
  children?: ReactNode;
}
// TODO : 로그인 및 회원가입 구현 후 권한별 sidebar 처리

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <SidebarProvider>
        <UserSidebar />
        <main className="flex-1 p-4">
          <SidebarTrigger className="mb-4" />
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}

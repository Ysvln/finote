import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { AppLayout } from "./layouts/appLayout";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <AppLayout>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </AppLayout>
  );
}

import { Button } from "@/shared/ui/button";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: AboutComponent,
});

function AboutComponent() {
  return (
    <div className="p-2">
      <h3>About</h3>
      <Button>OK</Button>
    </div>
  );
}

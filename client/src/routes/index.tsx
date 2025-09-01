import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Main,
});

function Main() {
  return (
    <div className="p-2">
      <h3>Welcome Main!</h3>
    </div>
  );
}

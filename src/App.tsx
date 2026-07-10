import { SelectionProvider } from "./context/SelectionContext";
import HomePage from "./HomePage";
import SpeedTestPage from "./pages/SpeedTestPage";

function getRoute(): string {
  const path = window.location.pathname.replace(/\/$/, "") || "/";
  return path;
}

export default function App() {
  const route = getRoute();

  if (route === "/teste-de-velocidade") {
    return <SpeedTestPage />;
  }

  return (
    <SelectionProvider>
      <HomePage />
    </SelectionProvider>
  );
}

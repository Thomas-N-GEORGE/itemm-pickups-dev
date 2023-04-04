import "./App.css";
import MainScreen from "./screens/MainScreen";
import { AppStateProvider } from "./contexts/state";

function App() {
  return (
    <div className={"App"}>
      <AppStateProvider>
        <MainScreen/>
      </AppStateProvider>
    </div>
  );
}

export default App;

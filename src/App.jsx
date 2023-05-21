import "./App.css";
import MainScreen from "./screens/MainScreen";
import {AppStateProvider} from "./contexts/state";
import BottomBar from "./components/layout/BottomBar";

function App() {
	return (
		<div className={"App"}>
			<AppStateProvider>
				<MainScreen/>
				<BottomBar/>
			</AppStateProvider>
		</div>
	);
}

export default App;

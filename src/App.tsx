import { Provider } from "react-redux";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import LeftPaneNavbar from "./components/UIComponents/LeftPaneNavbar";
import PageFooter from "./components/UIComponents/PageFooter";
import Favourites from "./pages/Favourites";
import HomePage from "./pages/Home";
import Trash from "./pages/Trash";
import store from "./store/store";
import "./sass/main.scss";

function App(): JSX.Element {
	return (
		<Provider store={store}>
			<HashRouter>
				<main className="app">
					<LeftPaneNavbar />
					<Routes>
						<Route path="/home" element={<HomePage/>}/>
						<Route path="/favourites" element={<Favourites/>}/>
						<Route path="/trash" element={<Trash/>}/>
						<Route path="*" element={<Navigate to="/home" replace={true}/>}/>
					</Routes>
					<PageFooter />
				</main>
			</HashRouter>
		</Provider>
	);
}

export default App;

import { Provider } from "react-redux";
import Footer from "./components/Common/Footer";
import Navigation from "./components/Common/Navigation";
import HomePage from "./components/Pages/Home";
import store from "./store/store";
import "./styles/main.scss";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Navigation />
        <HomePage />
        <Footer />
      </div>
    </Provider>
  );
}

export default App;

import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import Header from "./components/Header";
import List from "./components/List";

function App() {
  const isDarkThemeOn = useSelector((state) => state.app.darkTheme);

  // use class "'dark-mode' to change theme"
  return (
    <div className={`${isDarkThemeOn ? "dark-mode" : ""}`}>
      <Header />
      <List />
    </div>
  );
}

export default App;

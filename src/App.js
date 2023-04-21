import "./App.css";
import SelectCity from "./components/SelectCity";
import ShowWeather from "./components/ShowWeather";
import { CityContextProvider } from "./context/city-context";

function App() {
  return (
    <div className="App">
      <CityContextProvider>
        <SelectCity />
        <ShowWeather />
      </CityContextProvider>
    </div>
  );
}

export default App;

import "./App.css";
import Rutas from "./components/rutas/Rutas";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <>
      <Provider store={store}>
        <Rutas />
      </Provider>
    </>
  );
}

export default App;

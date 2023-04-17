import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import { apiSlice } from "./api/apiSlice";
import Rutas from "./components/rutas/Rutas";

function App() {
  return (
    <>
      <ApiProvider api={apiSlice}>
        <Rutas />
      </ApiProvider>
    </>
  );
}

export default App;

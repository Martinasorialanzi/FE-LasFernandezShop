import { configureStore } from "@reduxjs/toolkit";
import products from "./slices/products";

//esto sirve para que no se borre directamente los datos de la base de datos sino que lo haga despues de un tiempo para poder volver atras si te confndiste
const persistanceMiddleware = (store) => (next) => (action) => {
	next(action);
	localStorage.setItem("__redux__state__", JSON.stringify(store.getState()));
};

export default configureStore({
	reducer: {
		products,
	},
	middleware: [persistanceMiddleware],
});

import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';


// const initialState = () => {
// 	const persistedState = localStorage.getItem("__redux__state__");
// 	return persistedState ? JSON.parse(persistedState).products : DEFAULT_STATE;
// };

export const productSlice = createSlice({
	name: "products", //nombre que le doy a este slice
	initialState:{
		list:[]
	},
	reducers: {
		setProductList:(state,action)=>{
			state.list=action.payload;
			console.log(action.payload)
			console.log(state)
		},
		deleteProductById: (state, action) => {
			const _id = action.payload;
			console.log(_id);
			return state.list.filter((product) => product._id !== _id);
		},
	}
});


export default productSlice.reducer; //el reducer del slice para agregarlo al store
export const {
	 setProductList,
	 deleteProductById 
	} = productSlice.actions;


const baseUrl = "http://localhost:8080/v1";

export const getProducts = ()=> (dispatch) => {
 axios
 	.get(`${baseUrl}/products`)
	.then((response)=>{

	dispatch(setProductList( response.data.totalProducts))
	})
	.catch( (error) =>
		console.log(error.response))
	}
	export const deleteProduct = (_id)=> {
		axios
			.delete(`${baseUrl}/product/${_id}`)
		   .then((response)=>{
	   
		//    dispatch(deleteProductById())
		   })
		   .catch( (error) =>
			   console.log(error.response))
		   }



// export const productsSelectors = productsAdapter.getSelectors((state) => state.products);

// export const { selectId, selectById, selectTotal, selectEntities, selectAll } = productsSelectors;

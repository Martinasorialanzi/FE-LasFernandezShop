import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

//axios http

const baseUrl = "http://localhost:8080/v1";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    
    try {  
      const response= await axios({
        url:`${baseUrl}/products`,
        method:"GET"
      })
      
      return (response.data.totalProducts)
        
      } catch (error) {
        console.log(error.response)
      }
     

  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProducts',

async (_id) => {
  console.log(_id);
  try {
    await axios({
      url: `${baseUrl}/product/${_id}`,
      method: "DELETE",
    });
  return _id

  } catch (error) {
    console.log(error.response.data);
  }
})


const productsAdapter = createEntityAdapter({
  selectId: (product) => product._id,
});


export const productSlice = createSlice({
  name: "products", //nombre que le doy a este slice
  initialState: 
    //estado inicial
     productsAdapter.getInitialState({loading:false}) 
  ,
  reducers: {
  },
  
  extraReducers:(builder)=>{
    builder.addCase(getProducts.pending,(state)=> {
      state.loading = true;
    })
    builder.addCase(getProducts.fulfilled,(state, { payload })=> {
      state.loading = false;
      productsAdapter.setAll(state, payload);
    })
    builder.addCase(getProducts.rejected,(state)=> {
      state.loading(false);
    })
   
      builder.addCase(deleteProduct.pending,(state)=> {
        state.loading = true;
      })
      builder.addCase(deleteProduct.fulfilled,(state, { payload:_id })=> {
        state.loading = false;
        productsAdapter.removeOne(state,_id)

      })
      builder.addCase(deleteProduct.rejected,(state)=> {
        state.loading(false);
      })
  },
})

export const productsSelectors = productsAdapter.getSelectors(
  state=>state.products);

// export const { selectId, 
//   selectById, 
//   selectTotal, 
//   selectEntities, 
//   selectAll } =
//   productsSelectors


export default productSlice.reducer; //el reducer del slice para agregarlo al store


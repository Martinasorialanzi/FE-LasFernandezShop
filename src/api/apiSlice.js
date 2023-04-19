//RTK query sirve para manejar estados haciendo llamass apis evinyando usar thunks etc, lo que reduce la cantidad de codigos

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/React";

export const apiSlice = createApi({
  reducerPath: "productosApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1",
  }),
  endpoints: (build) => ({
    //funcion que devuelve un objeto //el builder permite definir cuales son las peticiones que traen datos(query)=>(get) y las que mutas datos (mutaciones)=>(put/delete/post)
    getProducts: build.query({
      query: () => `/products`,
      providesTags: ["Products"], //esto es una propiedad que le da nombre a esta funcion y sirve para decirle a los mutation ejecuten "Productos" y se actualice solo
      //  transformResponse:response=>response.sort((a,b)=>b.codigo-a.codigo)   //sirve para ordenar o modificar la forma en la que vienen los datos en este caso de mayor a menor
    }),
    createProduct: build.mutation({
      query: (newProduct) => ({
        url: "/products",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: build.mutation({
      query: (_id) => ({
        url: `/product/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
    updateEstadoProduct: build.mutation({
      query: (updatedState) => ({
        url: `/product/${updatedState._id}`,
        method: "PUT",
        body: updatedState,
      }),
      invalidatesTags: ["Products"],
    }),

    getAllClients:build.query({
      query:()=>"/clients",
      providesTags: ["Clients"],
  }),
  invalidatesTags: ["Products"],
  }),
});




export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateEstadoProductMutation,
  useGetAllClientsQuery,
} = apiSlice; //hook para solicitar datos //esto es un hook que da redux toolkit para usarlo en el frontend y me permite maejar cuadno esta cargando , cuando hay un error, etc

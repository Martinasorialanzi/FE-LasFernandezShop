//RTK query sirve para manejar estados haciendo llamass apis evinyando usar thunks etc, lo que reduce la cantidad de codigos

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/React";

export const apiSlice=createApi({
    reducerPath: "productosApi",
    baseQuery:fetchBaseQuery({
        baseUrl: "http://localhost:8080/v1"
    }),
    endpoints:(build)=>({       //funcion que devuelve un objeto //el builder permite definir cuales son las peticiones que traen datos(query)=>(get) y las que mutas datos (mutaciones)=>(put/delete/post)
        getProducts : build.query({
            query:()=>`/products`
        })
    })
})


export const {useGetProductsQuery}=apiSlice  //hook para solicitar datos //esto es un hook que da redux toolkit para usarlo en el frontend y me permite maejar cuadno esta cargando , cuando hay un error, etc
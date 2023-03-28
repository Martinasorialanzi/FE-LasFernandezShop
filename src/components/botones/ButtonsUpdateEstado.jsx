import React from 'react'
import { Button } from 'react-bootstrap'
import { UpdateProduct } from '../../api/GetProducts'
import Swal from 'sweetalert2'


export const ButtonVender = (_id) => {

    const vender=(_id)=>{
        const formData = {
            estado:"vendido"
          };
          console.log(formData);
          UpdateProduct(_id, formData);
    }



  return (
    <>

    <Button onClick={(e)=>vender(_id._id)}>Vender</Button>

    </>
  )
}

export const ButtonDevolver = (_id) => {


    const devuelto=(_id)=>{


        const formData = {
            estado:"local"
          };

          Swal.fire({
            title: 'Estas seguro?',
            text: "No se podra revertir!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#E95821',
            cancelButtonColor: '#5B5B5B',
            confirmButtonText: 'Si, borrar!',
            confirmButtonColor: '#E95821',
            
          }).then((result) => {
            if (result.isConfirmed) {
                UpdateProduct(_id, formData);
              Swal.fire(
                {icon: 'success',
                title: 'Producto borrado!',
                showConfirmButton: false,
                timer: 1500}
              )
              
          }
        })
          
         
    }

  return (
    <>

    <Button onClick={(e)=>devuelto(_id._id)}>Devuelto</Button>
    </>
  )
}


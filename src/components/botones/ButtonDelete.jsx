import React from 'react'
import { Button } from 'react-bootstrap'
import { deleteProduct } from '../../api/GetProducts'
import Swal from 'sweetalert2'

const ButtonDelete = (_id) => {
    
    const borrarProduct = (_id) => {
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
            deleteProduct(_id)
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
    <Button variant="dark" size="md" onClick={(e)=>borrarProduct(_id._id)}>Delete</Button>
    </>
  )
}

export default ButtonDelete
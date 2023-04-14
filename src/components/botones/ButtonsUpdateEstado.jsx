import React from "react";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { useUpdateEstadoProductMutation } from "../../api/apiSlice";

export const ButtonVender = (_id) => {
	const [updateState] = useUpdateEstadoProductMutation();
	const vender = (_id) => {
		console.log(_id);
		updateState({ estado: "vendido", _id });

		Swal.fire({
			icon: "success",
			title: "Producto vendido!",
			showConfirmButton: false,
			timer: 1500,
		});
	};

	return (
		<>
			<Button variant="dark" size="md" onClick={(e) => vender(_id._id)}>
				Vender
			</Button>
		</>
	);
};

export const ButtonDevolver = (_id) => {
	const [updateState] = useUpdateEstadoProductMutation();

	const devuelto = (_id) => {
		Swal.fire({
			title: "Estas seguro?",
			icon: "warning",
			showCancelButton: true,
			cancelButtonColor: "#5B5B5B",
			confirmButtonText: "Si, devuelto!",
			confirmButtonColor: "#E95821",
		}).then((result) => {
			if (result.isConfirmed) {
				updateState({ estado: "local", _id });
				Swal.fire({
					icon: "success",
					title: "Producto devuelto!",
					showConfirmButton: false,
					timer: 1500,
				});
			}
		});
	};

	return (
		<>
			<Button variant="dark" size="md" onClick={(e) => devuelto(_id._id)}>
				Devuelto
			</Button>
		</>
	);
};

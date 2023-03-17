import React, { useState } from "react";
import { Button, Pagination } from "react-bootstrap";

const Paginacion = ({ pagina, setPagina, maximo }) => {
  const [input, setInput] = useState(1);

  const nextPage = () => {
    setInput(input + 1);
    setPagina(pagina + 1);
  };
  const previousPage = () => {
   
      setInput(input - 1);
      setPagina(pagina - 1);
    
  };

  const onKeyDown = (e) => {
    if (e.keyCode == 13) { //esto significa si doy enter pase lo siguiente (el 13 seria el enter)
      setPagina(parseInt(e.target.value));
      if (
        parseInt(e.target.value) < 1 ||
        parseInt(e.target.value) > Math.ceil(maximo) ||
        isNaN(parseInt(e.target.value))
      ) {
        setPagina(1)
        setInput(1)
      }else {
        setPagina(parseInt(e.target.value))
      }
    }
  };



  return (
    <>
      <Button disabled={pagina===1||pagina<1} onClick={previousPage}>anterior</Button>
      <input onChange={(e)=>setInput(e.target.value)}  onKeyDown={(e)=>onKeyDown(e)} name="page" autoComplete="off" value={input} /> de {maximo}
      <Button disabled={pagina===Math.ceil(maximo)||pagina>Math.ceil(maximo)} onClick={nextPage}>siguiente</Button>
    </>
  );
};

export default Paginacion;

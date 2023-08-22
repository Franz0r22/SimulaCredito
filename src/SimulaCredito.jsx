import { useState, useEffect } from 'react'
import './App.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const SimulaCredito = ({ cuotaInitial, pieInitial, tasa, cuotaMin, cuotaMax, pieMin, pieMax, plazos }) => {
 
  // Estados
  const [cuota, setCuota] = useState(cuotaInitial);
  const [pie, setPie] = useState(pieInitial);
  const [plazo, setPlazo] = useState(plazos[2]);
  const [alert, setAlert] = useState('');

  // Manejadores
  const handleInputChange = (event, setState) => {
    const newValue = parseInt(event.target.value);
    setState(newValue);
    validaMonto(valorFinalCalculado);
  };

  const handlePlazoChange = (event) => {
    setPlazo(parseInt(event.target.value));
  };

  //Calculo de Monto Final  
  const calcularValorFinal = () => {
    const va = cuota * ((1 - Math.pow(1 + tasa / 100, -plazo)) / (tasa / 100)) + pie;
    const valorCalculado = va * 0.9;
    return valorCalculado;
  };

  let valorFinalCalculado = calcularValorFinal();

  //Funcion Valida el Pie
  const validaMonto = (valorCalculado) => {

    if (pie < valorCalculado*0.2 || pie > valorCalculado*0.5) {
      setAlert('El pie debe estar entre el 20% y 50% del monto total');
    } else {
      setAlert('');
    }
  }

  //Valida el Pie cuando el Plazo cambia
  useEffect(() => {    
    validaMonto(calcularValorFinal());
  }, [plazo, pie, cuota]);

  //Calcula el porcentaje de Pie
  const porcentajePie = (pie / calcularValorFinal()) * 100;
  let porcentajeRedondeado;

  if (porcentajePie > 50) {
    porcentajeRedondeado = Math.ceil(porcentajePie);
  } else if (porcentajePie < 20) {
    porcentajeRedondeado = Math.floor(porcentajePie);
  } else {
    porcentajeRedondeado = Math.round(porcentajePie);
  }
  
  //Dar Formato a valor final
  const ValorFinalFormateado = valorFinalCalculado.toLocaleString("es-CL",
  { style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0
  });

  


  return (
  <>
    <section>
      <h1 className="h3 text-white">Simula tu crédito aquí</h1>
    </section>
    <Form style={{width:400}}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label className="colorValue">Cuota: ${cuota.toLocaleString()}</Form.Label>
      <Form.Range 
        min={cuotaMin}
        max={cuotaMax}
        step="10000"
        value={cuota}
        onChange={(e) => handleInputChange(e, setCuota)}     
      />
      </Form.Group>
      <Form.Label className="colorValue">Pie: ${pie.toLocaleString()}</Form.Label>
      <Form.Range 
        min={pieMin}
        max={pieMax}
        step="100000"
        value={pie}
        onChange={(e) => handleInputChange(e, setPie)}        
      />
      <p className="colorValue">% de Pie: {porcentajeRedondeado}%</p>
      <small><p className="text-danger fst-italic">{alert}</p></small>
      <Form.Select
        value={plazo}
        onChange={handlePlazoChange}
        >
          <option value={12}>12</option>
          <option value={24}>24</option>
          <option value={36}>36</option>
          <option value={48}>48</option>
      </Form.Select>  
      <p className="colorValue mt-3">Monto Total: {ValorFinalFormateado}</p>    
      <Button
      className="w-100"
      variant="primary"
      size="lg"
      disabled={alert}
      >Buscar</Button>  
    </Form>
  </>  
  );
};

export default SimulaCredito;

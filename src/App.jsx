import { useState, useEffect } from 'react'
import './App.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const App = () => {
 
  // Estados
  const [cuota, setCuota] = useState(140000);
  const [pie, setPie] = useState(1000000);
  const [plazo, setPlazo] = useState(36);
  const [tasa, setTasa] = useState(2.5);
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
      setAlert('Monto no válido');
    } else {
      setAlert('');
    }
  }

  //Valida el Pie cuando el Plazo cambia
  useEffect(() => {    
    validaMonto(calcularValorFinal());
  }, [plazo]);

  //Calcula el porcentaje de Pie
  const porcentajePie = Math.trunc((pie / calcularValorFinal()) * 100);
  
  //Dar Formato a valor final
  const ValorFinalFormateado = valorFinalCalculado.toLocaleString("es-CL",
  { style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0
  });

  


  return (
    <Form style={{width:400}}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label className="colorValue">Cuota: ${cuota.toLocaleString()}</Form.Label>
      <Form.Range 
        min="140000"
        max="2000000"
        step="10000"
        value={cuota}
        onChange={(e) => handleInputChange(e, setCuota)}     
      />
      </Form.Group>
      <Form.Label className="colorValue">Pie: ${pie.toLocaleString()}</Form.Label>
      <Form.Range 
        min="1000000"
        max="25000000"
        step="100000"
        value={pie}
        onChange={(e) => handleInputChange(e, setPie)}        
      />
      <p className="colorValue">% de Pie: {porcentajePie}%</p>
      <p className="colorValue">{alert}</p>
      <Form.Select
        value={plazo}
        onChange={handlePlazoChange}
        >
          <option value={12}>12</option>
          <option value={24}>24</option>
          <option value={36}>36</option>
          <option value={48}>48</option>
      </Form.Select>  
      <p className="colorValue">Valor final calculado: {ValorFinalFormateado}</p>    
      <Button
      className="w-100"
      variant="primary"
      size="lg"
      disabled={alert}
      >Button</Button>  
    </Form>
  );
};

export default App;

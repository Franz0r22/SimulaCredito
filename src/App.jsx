import SimulaCredito from "./SimulaCredito";

function App() {
  return (
    <div>
      <SimulaCredito
        cuotaInitial={140000}
        pieInitial={1000000}
        tasa={2.5}
        cuotaMin={140000}
        cuotaMax={2000000}
        pieMin={1000000}
        pieMax={25000000}
        plazos={[12, 24, 36, 48]}
      />
    </div>
  );
}

export default App;

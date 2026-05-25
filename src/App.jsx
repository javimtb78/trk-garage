import PdfViewer from "./components/PdfViewer";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./index.css";

function Dashboard() {

  const [kms, setKms] = useState(
    localStorage.getItem("kms") || 22000
  );

  const [oilChange, setOilChange] = useState(
    localStorage.getItem("oilChange") || 24000
  );

  useEffect(() => {
    localStorage.setItem("kms", kms);
    localStorage.setItem("oilChange", oilChange);
  }, [kms, oilChange]);

  return (
    <div className="main">

      <h1 className="title">TRK Garage</h1>

      <div className="cards">
      <button
  onClick={() => window.location.href="/maintenance"}
  style={{
    padding: "15px",
    background: "#00d26a",
    border: "none",
    borderRadius: "10px",
    marginBottom: "20px",
    fontWeight: "bold",
    cursor: "pointer"
  }}
>
  + Añadir mantenimiento
</button>


        <div className="card">
          <h2>Kilómetros actuales</h2>

          <input
            type="number"
            value={kms}
            onChange={(e) => setKms(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "10px"
            }}
          />
        </div>

        <div className="card">
          <h2>Próximo cambio aceite</h2>

          <input
            type="number"
            value={oilChange}
            onChange={(e) => setOilChange(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "10px"
            }}
          />

          <p style={{ marginTop: "20px" }}>
            Faltan:
            <strong>
              {" "}
              {oilChange - kms} km
            </strong>
          </p>

        </div>

      </div>

    </div>
  );
}

function Manual() {

  const [search, setSearch] = useState("");

  const sections = [
    {
      name: "Suspensión",
      page: 31
    },
    {
      name: "Sistema eléctrico",
      page: 33
    },
    {
      name: "Motor",
      page: 24
    },
    {
      name: "Frenos",
      page: 30
    },
    {
      name: "Herramientas",
      page: 16
    },
  ];

  const filtered = sections.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="main">

      <h1 className="title">
        Manual Interactivo
      </h1>

      <input
        type="text"
        placeholder="Buscar..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "20px"
        }}
      />

      <div className="cards">

        {filtered.map((section, index) => (

          <div key={index} className="card">

            <h2>{section.name}</h2>

            <p>Página {section.page}</p>

          </div>

        ))}

      </div>

      <PdfViewer />
  

    </div>
  );
}
function Maintenance() {

  const [type, setType] = useState("");
  const [kms, setKms] = useState("");

  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("maintenanceHistory")) || []
  );

  function saveMaintenance() {

    const newEntry = {
      type,
      kms,
      date: new Date().toLocaleDateString()
    };

    const updated = [...history, newEntry];

    setHistory(updated);

    localStorage.setItem(
      "maintenanceHistory",
      JSON.stringify(updated)
    );

    setType("");
    setKms("");
  }

  return (
    <div className="main">

      <h1 className="title">
        Mantenimiento
      </h1>

      <div className="card">

        <input
          type="text"
          placeholder="Tipo mantenimiento"
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px"
          }}
        />

        <input
          type="number"
          placeholder="Kilómetros"
          value={kms}
          onChange={(e) => setKms(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px"
          }}
        />

        <button
          onClick={saveMaintenance}
          style={{
            padding: "12px 20px",
            background: "#00d26a",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Guardar mantenimiento
        </button>

      </div>

      <div className="cards">

        {history.map((item, index) => (

          <div className="card" key={index}>

            <h2>{item.type}</h2>

            <p>{item.kms} km</p>

            <p>{item.date}</p>

          </div>

        ))}

      </div>

    </div>
  );
}
function Fuel() {

  const [liters, setLiters] = useState("");
  const [kms, setKms] = useState("");
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("fuelHistory")) || []
  );

  function saveFuel() {

    const newEntry = {
      liters,
      kms
    };

    const updated = [...history, newEntry];

    setHistory(updated);

    localStorage.setItem(
      "fuelHistory",
      JSON.stringify(updated)
    );

    setLiters("");
    setKms("");
  }

  return (
    <div className="main">

      <h1 className="title">
        Consumos
      </h1>

      <div className="card">

        <input
          type="number"
          placeholder="Litros"
          value={liters}
          onChange={(e) => setLiters(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px"
          }}
        />

        <input
          type="number"
          placeholder="Kilómetros"
          value={kms}
          onChange={(e) => setKms(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px"
          }}
        />

        <button
          onClick={saveFuel}
          style={{
            padding: "10px 20px",
            background: "#00d26a",
            border: "none",
            color: "black",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Guardar repostaje
        </button>

      </div>

      <div className="cards">

        {history.map((item, index) => (

          <div className="card" key={index}>

            <h2>Repostaje</h2>

            <p>{item.liters} litros</p>

            <p>{item.kms} km</p>

          </div>

        ))}

      </div>

    </div>
  );
}

function Sidebar() {

  return (
    <div className="sidebar">

      <div className="logo">
        TRK Garage
      </div>

      <div className="menu">

        <Link to="/">
          Dashboard
        </Link>

        <Link to="/manual">
          Manual
        </Link>

        <Link to="/fuel">
          Consumos
        </Link>
        <Link to="/maintenance">
         Mantenimiento
        </Link>
      </div>

    </div>
  );
}

export default function App() {

  return (
    <BrowserRouter>

      <div className="layout">

        <Sidebar />

        <Routes>

          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/manual"
            element={<Manual />}
          />

          <Route
            path="/fuel"
            element={<Fuel />}
          />
         <Route
          path="/maintenance"
          element={<Maintenance />}
          />
        </Routes>

      </div>

    </BrowserRouter>
  );
}
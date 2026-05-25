import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./index.css";

function Dashboard() {
  return (
    <div className="main">
      <h1 className="title">TRK Garage</h1>

      <div className="cards">

        <div className="card">
          <h2>Mantenimiento</h2>
          <p>Próximo cambio aceite: 1200 km</p>
        </div>

        <div className="card">
          <h2>Consumo</h2>
          <p>Media: 4.8L/100</p>
        </div>

        <div className="card">
          <h2>Cadena</h2>
          <p>Último engrase: 320 km</p>
        </div>

      </div>
    </div>
  );
}

function Manual() {
  return (
    <div className="main">
      <h1 className="title">Manual Interactivo</h1>

      <iframe
        className="manual-frame"
        src="/manual/manual-trk.pdf"
        title="manual"
      />
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
        <Link to="/">Dashboard</Link>
        <Link to="/manual">Manual</Link>
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
          <Route path="/" element={<Dashboard />} />
          <Route path="/manual" element={<Manual />} />
        </Routes>

      </div>

    </BrowserRouter>
  );
}
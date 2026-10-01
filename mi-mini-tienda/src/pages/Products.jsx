import { useState } from "react";
import ProductCard from "../components/ProductCard.jsx";
import PRODUCTOS from "../datos/productos.js";

export default function Products({ onAgregar }) {
  const [busqueda, setBusqueda] = useState("");

  const productosFiltrados = PRODUCTOS.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.trim().toLowerCase())
  );

  return (
    <section className="page-section">
      <header className="page-header">
        <p className="eyebrow">El catálogo</p>
        <h1>Productos</h1>
        <p>Elegí tu próximo par de zapatillas.</p>
      </header>

      <div className="catalog-toolbar">
        <div className="search-field">
          <label className="field-label" htmlFor="busqueda">Buscar por nombre</label>
          <div className="search-wrapper">
            <span className="search-symbol" aria-hidden="true">⌕</span>
            <input
              className="form-input search-input"
              id="busqueda"
              type="search"
              placeholder="Por ejemplo: Urban"
              value={busqueda}
              onChange={(evento) => setBusqueda(evento.target.value)}
            />
          </div>
        </div>
        <p className="results-label" role="status">Resultados: {productosFiltrados.length}</p>
      </div>

      {productosFiltrados.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon" aria-hidden="true">👟</span>
          <h2>No encontramos zapatillas con ese nombre.</h2>
          <p>Probá con otro nombre o borrá la búsqueda para ver todos los modelos.</p>
        </div>
      ) : (
        <div className="product-grid">
          {productosFiltrados.map((producto) => (
            <ProductCard
              key={producto.id}
              producto={producto}
              onAgregar={onAgregar}
            />
          ))}
        </div>
      )}
    </section>
  );
}

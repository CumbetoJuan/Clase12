import { useState } from "react";
import { Link } from "react-router-dom";

export default function Cart({ carrito, onQuitar }) {
  const [cantidadesAQuitar, setCantidadesAQuitar] = useState({});

  const total = carrito.reduce(
    (acumulado, producto) => acumulado + producto.precio * producto.cantidad,
    0
  );
  const cantidadTotal = carrito.reduce(
    (acumulado, producto) => acumulado + producto.cantidad,
    0
  );

  return (
    <section className="page-section">
      <div className="page-header">
        <p className="eyebrow">Tus elegidos</p>
        <h1>Carrito</h1>
        <p>Revisá tus zapatillas y elegí cuántas querés quitar.</p>
      </div>

      {carrito.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon" aria-hidden="true">👟</span>
          <h2>Tu carrito está vacío.</h2>
          <p>Elegí tu próximo par en nuestro catálogo.</p>
          <Link to="/productos" className="button button-dark">Ver productos</Link>
        </div>
      ) : (
        <div className="cart-layout">
          <ul className="cart-list">
            {carrito.map((producto) => {
              const cantidadAQuitar = Math.min(
                cantidadesAQuitar[producto.id] ?? 1,
                producto.cantidad
              );

              return (
                <li key={producto.id} className="cart-item">
                  <span className="cart-media" aria-hidden="true">
                    {producto.emoji}
                  </span>
                  <div>
                    <div className="cart-item-header">
                      <div>
                        <h2>{producto.nombre}</h2>
                        <p>Precio por par: ${producto.precio.toLocaleString("es-AR")}</p>
                      </div>
                      <p className="cart-subtotal">
                        <small>Subtotal</small>
                        ${(producto.precio * producto.cantidad).toLocaleString("es-AR")}
                      </p>
                    </div>
                    <p className="cart-current-quantity">Cantidad: {producto.cantidad}</p>
                    <div className="cart-controls">
                      <label htmlFor={`cantidad-quitar-${producto.id}`}>
                        Cantidad a quitar
                      </label>
                      <select
                        id={`cantidad-quitar-${producto.id}`}
                        className="quantity-select"
                        value={cantidadAQuitar}
                        onChange={(evento) => {
                          const cantidad = Number(evento.target.value);
                          setCantidadesAQuitar((actuales) => ({
                            ...actuales,
                            [producto.id]: cantidad,
                          }));
                        }}
                      >
                        {Array.from({ length: producto.cantidad }, (_, indice) => indice + 1).map((cantidad) => (
                          <option key={cantidad} value={cantidad}>
                            {cantidad}
                          </option>
                        ))}
                      </select>
                      <button
                        className="remove-button"
                        type="button"
                        onClick={() => {
                          onQuitar(producto.id, cantidadAQuitar);
                          setCantidadesAQuitar((actuales) => ({
                            ...actuales,
                            [producto.id]: 1,
                          }));
                        }}
                        aria-label={`Quitar ${cantidadAQuitar} de ${producto.nombre} del carrito`}
                      >
                        Quitar
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <aside className="order-summary" aria-labelledby="titulo-resumen">
            <h2 id="titulo-resumen">Resumen</h2>
            <div className="summary-row"><span>Modelos</span><strong>{carrito.length}</strong></div>
            <div className="summary-row"><span>Pares</span><strong>{cantidadTotal}</strong></div>
            <p className="summary-total">
              <span>Total a pagar</span>
              <strong>${total.toLocaleString("es-AR")}</strong>
            </p>
            <Link to="/productos" className="button button-accent button-full">Seguir comprando</Link>
          </aside>
        </div>
      )}
    </section>
  );
}

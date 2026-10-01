export default function ProductCard({ producto, onAgregar }) {
  return (
    <article className="product-card" data-product={producto.id}>
      <div className="product-media">
        {producto.destacado && <span className="product-badge">Destacado</span>}
        <span className="product-emoji" aria-hidden="true">{producto.emoji}</span>
      </div>
      <div className="product-body">
        <p className="product-category">Zapatillas</p>
        <h3>{producto.nombre}</h3>
        <p className="product-price">
          <strong>${producto.precio.toLocaleString("es-AR")}</strong>
          <small>Precio por par</small>
        </p>
        <button className="button button-dark button-full" type="button" onClick={() => onAgregar(producto)}>
          <span aria-hidden="true">+</span> Agregar al carrito
        </button>
      </div>
    </article>
  );
}

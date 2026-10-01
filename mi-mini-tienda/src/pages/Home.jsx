import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import PRODUCTOS from "../datos/productos.js";

export default function Home({ onAgregar }) {
  const destacados = PRODUCTOS.filter((producto) => producto.destacado);

  return (
    <section className="home-page">
      <div className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Encontrá tu estilo</p>
          <h1>Zapatillas para <span>todos los días.</span></h1>
          <p className="hero-description">Encontrá tu próximo par favorito. Elegí el modelo que acompaña tu día.</p>
          <Link to="/productos" className="button button-accent">
            Ver productos <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="hero-art" aria-hidden="true">
          <span className="hero-shoe">👟</span>
          <span className="hero-art-label">Un par. Mil caminos.</span>
        </div>
      </div>

      <div className="section-heading">
        <div><p className="eyebrow">Nuestra selección</p><h2>Destacados</h2></div>
        <Link to="/productos" className="text-link">Ver todos <span aria-hidden="true">↗</span></Link>
      </div>
      <div className="product-grid">
        {destacados.map((producto) => (
          <ProductCard
            key={producto.id}
            producto={producto}
            onAgregar={onAgregar}
          />
        ))}
      </div>
    </section>
  );
}

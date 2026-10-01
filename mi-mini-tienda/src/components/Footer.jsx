import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <strong>Mi tienda de zapatillas</strong>
          <p>Proyecto de práctica con React</p>
        </div>
        <nav className="footer-nav" aria-label="Enlaces del pie">
          <Link to="/productos">Ver productos</Link>
          <Link to="/contacto">Contacto</Link>
        </nav>
      </div>
    </footer>
  );
}

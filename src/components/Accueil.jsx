import './Accueil.css';
import icon from '../assets/icon.png';

const Accueil = () => {
  return (
    <div className="accueil">
      <div className="Hello">
        <img width="200px" alt="icon" src={icon} />
      </div>
      <h1>Comptabilité</h1>
    </div>
  );
};

export { Accueil as default };
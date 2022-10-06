import icon from '../assets/icon.png';
import "./HomePage.css"

const HomePage = (props) => {
  return (
    <div className="accueil">
      <div className="Hello">
        <img width="200px" alt="icon" src={icon} />
      </div>
      <h1>Comptabilité</h1>
    </div>
  );
};

export default HomePage;

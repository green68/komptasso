import './Header.css';

function Header({ children }) {

  return (
    <header className="main-header">
      {children}
    </header>
  );
}

export { Header as default };
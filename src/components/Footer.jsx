import './Footer.css';

const Footer = ({ children }) => {

  return (
    <footer className="main-footer">
      {children}
    </footer>
  )
}

export { 
  Footer as default 
}
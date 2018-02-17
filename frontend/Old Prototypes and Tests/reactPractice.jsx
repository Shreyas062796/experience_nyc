function App() {
  return (
    <div>
      {navbar}
    </div>
  );
}

const navbar = <div className="navbar-fixed">
  <nav className="nav-extended" style={{backgroundColor: '#333333'}}>
    <div className="nav-wrapper">
      <a href="#!" className="brand-logo"></a>
      <a className="center">Experience NYC</a>
      <ul className="right hide-on-med-and-down">
        <li><a href="#">About Us</a></li>
        <li><a href="#">Contact</a></li>
        <li><a href="#">Login | Signup</a></li>
      </ul>
    </div>
  </nav>
</div>;

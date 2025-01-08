import React from "react";
import { Link } from "react-router-dom";
const AppHeader = () => {
  return (
    <header style={styles.header}>
      <nav>
        <ul style={styles.navList}>
          <li>
            <Link to="/" style={styles.navLink}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/product-design" style={styles.navLink}>
              Custom Design
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: "#000000",
    padding: "10px 20px",
    textAlign: "center",
  },
  title: {
    margin: 0,
  },
  navList: {
    listStyleType: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    justifyContent: "center",
    gap: "15px",
  },
  navLink: {
    color: "#FFFFFF",
    textDecoration: "none",
    fontSize: "16px",
  },
};

export default AppHeader;

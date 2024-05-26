import React from 'react';

function Contact() {
  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <h1 style={{ color: "#db1436" }}>FEEL FREE TO CONTACT US</h1>
      <div className="container my-3" style={styles.card}>
        <div className="row">
          <div className="col">
            <h4 style={styles.heading}>EMAIL :</h4>
            <p style={styles.paragraph}>anshikachamoli2004@gmail.com</p>
          </div>
        </div>
      </div>

      <div className="container my-3" style={styles.card}>
        <div className="row">
          <div className="col">
            <h4 style={styles.heading}>LINKEDIN HANDLE :</h4>
            <p style={styles.paragraph}>
              <a href="https://www.linkedin.com/in/anshika-chamoli-5b9b4a1b2" rel="noreferrer" target="_blank" style={styles.link}>https://www.linkedin.com/in/anshika-chamoli-5b9b4a1b2</a>
            </p>
          </div>
        </div>
      </div>

      <div className="container my-3" style={styles.card}>
        <div className="row">
          <div className="col">
            <h4 style={styles.heading}>TWITTER HANDLE :</h4>
            <p style={styles.paragraph}>
              <a href="https://twitter.com/Anshika1804" rel="noreferrer" target="_blank" style={styles.link}>https://twitter.com/Anshika1804</a>
            </p>
          </div>
        </div>
      </div>

      <div className="container my-3" style={styles.card}>
        <div className="row">
          <div className="col">
            <h4 style={styles.heading}>MOBILE NUMBER :</h4>
            <p style={styles.paragraph}>9837902661</p>
          </div>
        </div>
      </div>
      <div className="container" style={styles.infoContainer}>
        <h5 style={styles.infoText}>For any query kindly email us at our provided email id.</h5>
        <h5 style={styles.infoText}>Thank You for visiting us.</h5>
      </div>
      <div style={{height:"20px"}}></div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: "lightcyan",
    borderRadius: "15px",
    padding: "15px",
    marginBottom: "20px",
    boxShadow: "0px 0px 10px 2px rgba(0,0,0,0.1)",
    transition: "box-shadow 0.3s ease",
  },
  heading: {
    color: "navy",
    marginBottom: "5px",
  },
  paragraph: {
    fontSize: "20px",
  },
  link: {
    fontSize: "20px",
    color: "#007bff",
    textDecoration: "none",
    transition: "color 0.3s ease",
  },
  infoContainer: {
    backgroundColor: "lightcyan",
    width: "500px",
    borderRadius: "10px",
    padding: "15px",
    textAlign: "center",
    marginTop: "20px",
  },
  infoText: {
    color: "darkblue",
    marginBottom: "10px",
  },
};

export default Contact;

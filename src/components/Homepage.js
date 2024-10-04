import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faApple, faWindows, faAndroid } from '@fortawesome/free-brands-svg-icons';
import { faBox, faShoppingCart, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFacebook, faPinterest, faGooglePlus, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons';
import './homepage.css'; // Import your CSS

const Homepage = () => {
  return (
    <div>
      <div className="header">
      <Link to="/login">Login</Link>
      </div>
      <div className="banner">
        <div className="homepgcontainer1">
          <div className="bannerheader">
            <h1>IMS</h1>
            <h3>Inventory Management System</h3>
          </div>
          <p className="bannerpara">
            Monitor stock levels, track purchases, and streamline order management in one centralized system.
            <br />
            Gain full visibility of your inventory from suppliers to customers.
          </p>
          <div className="bannericons">
            <div className="icon-circle">
              <FontAwesomeIcon icon={faApple} />
            </div>
            <div className="icon-circle">
              <FontAwesomeIcon icon={faAndroid} />
            </div>
            <div className="icon-circle">
              <FontAwesomeIcon icon={faWindows} />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="homepgcontainer2">
            <div className="homepgfeatures">
                <div className="homepgfeature">
                    <span className="featureicon"><FontAwesomeIcon icon={faBox} /></span>
                    <h3 className="featuretitle">Real-time Stock Tracking</h3>
                    <p className="featuredescription">
                        Keep track of your inventory levels in real-time. Get instant notifications when stock levels are low or when new inventory is received.
                    </p>
                </div>
                <div className="homepgfeature">
                    <span className="featureicon"><FontAwesomeIcon icon={faShoppingCart} /></span>
                    <h3 className="featuretitle">Automated Order Management</h3>
                    <p className="featuredescription">
                        Automate your order processing and ensure timely restocking. Create purchase orders automatically based on stock thresholds.
                    </p>
                </div>
                <div className="homepgfeature">
                    <span className="featureicon"><FontAwesomeIcon icon={faChartLine} /></span>
                    <h3 className="featuretitle">Reporting & Analytics</h3>
                    <p className="featuredescription">
                        Generate detailed reports to analyze sales, inventory levels, and stock movement trends.
                    </p>
                </div>
            </div>
        </div>

      {/* Notification Section */}
      <div className="homepgnotified">
        <div className="homepgcontainer2">
          <div className="homepgnotifiedcontainer">
            <div className="emailform">
              <h3>Stay Updated with Inventory Insights!</h3>
              <p>
                Subscribe to our newsletter and receive the latest updates, tips, and best practices.
              </p>
              <form>
                <div className="formcontainer">
                  <input type="text" placeholder="Email Address" />
                  <button>Notify</button>
                </div>
              </form>
            </div>
            <div className="image1">
              <a href="/login">
                <img src="images/login-image5.jpg" alt="Update Notification Image" style={{ width: '100%', borderRadius: '10px' }} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Socials Section */}
      <div className="socials">
            <div className="homepgcontainer2">
                <h3 className="socialheader">Connect with Us</h3>
                <p className="socialtext">Reach out to us for guidance, tips, or assistance.</p>
                <div className="socialiconscontainer">
                    <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
                    <a href="#"><FontAwesomeIcon icon={faFacebook} /></a>
                    <a href="#"><FontAwesomeIcon icon={faPinterest} /></a>
                    <a href="#"><FontAwesomeIcon icon={faGooglePlus} /></a>
                    <a href="#"><FontAwesomeIcon icon={faLinkedin} /></a>
                    <a href="#"><FontAwesomeIcon icon={faYoutube} /></a>
                </div>
            </div>
        </div>

      {/* Footer */}
      <div className="footer">
        <div className="homepgcontainer2">
          <a href="#">Contact</a>
          <a href="#">Features</a>
          <a href="#">Pricing</a>
          <a href="#">Email</a>
          <a href="#">Support</a>
          <a href="#">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
};

export default Homepage;

// components/footer.js
export function createFooter() {
    return `
      <div class="footer-container">
        <div class="footer-content">
          <div class="footer-section">
            <input type="checkbox" id="assistance-toggle" class="footer-toggle">
            <label for="assistance-toggle">
              <h3>Assistance</h3>
            </label>
            <ul>
              <li><a href="#">Size Guide</a></li>
              <li><a href="#">Shipping & Returns</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Track Your Order</a></li>
            </ul>
          </div>
  
          <div class="footer-section">
            <input type="checkbox" id="company-toggle" class="footer-toggle">
            <label for="company-toggle">
              <h3>Company</h3>
            </label>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press</a></li>
              <li><a href="#">Store Locations</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>
  
          <div class="footer-section">
            <input type="checkbox" id="payment-toggle" class="footer-toggle">
            <label for="payment-toggle">
              <h3>Payment Methods</h3>
            </label>
            <p class="footer-label">Secure payments via</p>
            <div class="payment-icons">
              <i class="fab fa-cc-visa"></i>
              <i class="fab fa-cc-mastercard"></i>
              <i class="fab fa-cc-amex"></i>
              <i class="fab fa-paypal"></i>
            </div>
            <p class="footer-label">Express checkout available</p>
          </div>
  
          <div class="footer-section">
            <input type="checkbox" id="connect-toggle" class="footer-toggle">
            <label for="connect-toggle">
              <h3>Stay Connected</h3>
            </label>
            <div class="social-icons">
              <a href="#"><i class="fab fa-instagram"></i></a>
              <a href="#"><i class="fab fa-facebook"></i></a>
              <a href="#"><i class="fab fa-x-twitter"></i></a>
              <a href="#"><i class="fab fa-pinterest"></i></a>
            </div>
          </div>
        </div>
  
        <div class="footer-bottom">
          <p>&copy; 2025 Threads. All rights reserved.</p>
        </div>
      </div>
    `;
  }
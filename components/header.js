// components/header.js
export function createHeader() {
    return `
      <div class="header-container">
        <div class="logo">
          <a href="index.html"><span class="logo-accent">Threads</span></a>
        </div>
  
        <!-- Hidden checkbox for menu toggle -->
        <input type="checkbox" id="menu-toggle" class="menu-toggle">
  
        <!-- Hamburger icon -->
        <label for="menu-toggle" class="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </label>
  
        <!-- Navigation Menu -->
        <nav>
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="index.html">New</a></li>
            <li><a href="men.html">Men</a></li>
            <li><a href="women.html">Women</a></li>
            <li><a href="index.html">Sale</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </nav>
      </div>
    `;
  }
import React from "react";
import { Link } from "react-router-dom";


function HomePage() {
  return (
    <div className="home">
      <section className="hero-container">
        <div className="hero">
          <div className="hero-img">
            <img src="/images/image2.png" alt="hero" />
          </div>
          <div className="hero-text">
            <h1 className="header">Become part of your 
            <br />
            business with AI</h1>
            <p className="hero-message">Welcome to a place where AI is your personal assistant. Take all the knowledge you can from your company</p>
          </div>
          
          <div>
          <button type="get-started" style={{marginRight: "10px"}}>Get Started</button>
          <button type="how-it-works" style={{marginLeft: "10px"}}>How it Works</button>
          </div>

        </div>
      </section>
      
      <section>
      <div className="features">
      <div>
        <h2 className="hero-features">Features</h2>
      </div>
        
        <div className="feature-cards">
          <div className="feature-card">
            <div className="icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <h3>Real-time Analytics</h3>
            <p>Get valuable insights into your business performance with real-time analytics.</p>
          </div>
          <div className="feature-card">
            <div className="icon">
              <i className="fas fa-robot"></i>
            </div>
            <h3>AI-powered Automation</h3>
            <p>Automate repetitive tasks and let AI do the heavy lifting for you.</p>
          </div>
          <div className="feature-card">
            <div className="icon">
              <i className="fas fa-users"></i>
            </div>
            <h3>Customer Segmentation</h3>
            <p>Identify and target specific customer segments with personalized messaging.</p>
          </div>
          <div className="feature-card">
            <div className="icon">
              <i className="fas fa-search"></i>
            </div>
            <h3>Advanced Search</h3>
            <p>Quickly find what you need with advanced search capabilities.</p>
          </div>
          <div className="feature-card">
            <div className="icon">
              <i className="fas fa-shield-alt"></i>
            </div>
            <h3>Secure Data Management</h3>
            <p>Protect your sensitive data with secure and reliable data management solutions.</p>
          </div>
          <div className="feature-card">
            <div className="icon">
              <i className="fas fa-briefcase"></i>
            </div>
            <h3>Workflow Management</h3>
            <p>Streamline your business processes with powerful workflow management tools.</p>
          </div>
        </div>
      </div>
      </section>
      
    </div>
  );
}

export default HomePage;

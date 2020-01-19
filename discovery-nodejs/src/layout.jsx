import React from 'react';
import { Header, Jumbotron, Footer } from 'watson-react-components';
import Demo from './demo';
import CSVReader from './CSVReader';
import exabeamicon from './assets/exabeam.png'





export default function Layout() {  
  return (
    <div>
      <a href="http://localhost:3000">
      <img src={exabeamicon} width="200" height="150" alt="Exabeam"/>              
        </a>
        <Header
        mainBreadcrumbs="Exabeam Reviews"
        mainBreadcrumbsUrl="/"
        subBreadcrumbs="2020 Hackathon"
        subBreadcrumbsUrl="/"
        hasWordmark={false}
      />
      
      <Demo />      
      <CSVReader/>
      <div className="footer-container--div">
        <section className="_full-width-row footer-gdpr--section">
          <span>
            This system is for Exabeam 2020 Hackathon demonstration purposes only and is not intended to process Personal
            Data. No Personal Data is to be entered into this system as it may not have the
            necessary controls in place to meet the requirements of the General Data Protection
            Regulation (EU) 2016/679
          </span>
        </section>
        {/* <Footer /> */}
      </div>
    </div>
  );
}

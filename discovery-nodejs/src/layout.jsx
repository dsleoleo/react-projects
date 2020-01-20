import React from 'react';
import Demo from './demo';
import Review from './review';
import exabeamicon from './assets/exabeam.png';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';


const useStyles = makeStyles({
  root: {
    width: 500,
    backgroundColor : 'transparent'
  },
});

export default function Layout() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="fill-block">
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction label="Exabeam Reviews" />    
        <BottomNavigationAction label="Company Searches" />
      </BottomNavigation>

      {value == 0 ? (<Review/>) : (
          <Demo />
        )}


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

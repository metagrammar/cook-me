import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ButtonBase, Link } from '@material-ui/core';
import { Facebook, Instagram, Twitter } from '@material-ui/icons';
import './Footer.css';

const useStyles = makeStyles((theme) => ({
    termsButtons: {
      fontFamily: 'Montserrat, sans-serif',
      disableTouchRipple: false,
      fontSize: '1rem',
      marginBottom: '1em',
    },
    linkButtons: {
        marginRight: '1em',
    }
  }));

const Footer = () => {
    const classes = useStyles();
    const preventDefault = (event) => event.preventDefault();
    return (
        <>
            <div className='footer'>
                <div className='footer-center'>
                    <div className='about'>
                        <div className='follow'>
                        <h3>Follow Secret Sauce</h3>
                        <Link href="#" onClick={preventDefault} className={classes.linkButtons}><Facebook /></Link>
                        <Link href="#" onClick={preventDefault} className={classes.linkButtons}><Instagram /></Link>
                        <Link href="#" onClick={preventDefault}><Twitter /></Link>
                        </div>
                        <div className='contact'>
                            <h3>Contact Secret Sauce</h3>
                            <p>Cook Me would love to hear from you, drop us a note at: 
                            <a href="mailto:hi@secret-sauce.com?subject=Dear cook me, can I ask you a question?"> hi@secret-sauce.com</a>
                            </p>
                        </div>
                        <div className='news'>
                        <h3>Secret Sauce says...</h3>
                        <p>Get the newsletter.</p>
                        <div className="email-input">
                            <form name="newsletter" method="POST" data-netlify="true">
                                <input className="newsletter-input" type="text" placeholder="your-email@example.com" id="search"></input>
                                <button className="newsletter-button">OK</button>
                            </form>
                        </div>
                        </div>
                    </div>
                    <div className='terms-condition'>
                        <ButtonBase className={classes.termsButtons}>Terms &amp; Conditions</ButtonBase>
                        <ButtonBase className={classes.termsButtons}>Legal</ButtonBase>
                        <ButtonBase className={classes.termsButtons}>Privacy Policy</ButtonBase>
                    </div>
                </div>
            </div>
        </>
        
    )
};

export default Footer;
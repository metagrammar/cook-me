import React from 'react';
import Highlight from './components/highlight'
import ResultsMain from './components/ResultsMain';
import Footer from './components/Footer';
import './App.css';


function Home(props) {
  return (
    <div className="App">
        <Highlight gotRecipes={props.initial}/>
        <ResultsMain gotRecipes={props.gotRecipes} searchToggle={props.searchToggle} search={props.search} filters={props.filters} resetFilter={props.resetFilter}/>
        <Footer />
    </div>
  );
}

export default Home;
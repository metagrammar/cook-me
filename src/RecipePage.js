import React from 'react';
import { useParams } from 'react-router-dom'
import Recipe from './components/recipe'
import ResultsMore from './components/ResultsMore';
import Footer from './components/Footer';
import './App.css';


function RecipePage({initial}) {

  let { recipe } = useParams()

  return (
    <div className="App">
        <Recipe recipeSlug={recipe} />
        <ResultsMore gotRecipes={initial}/>
        <Footer />
    </div>
  );
}

export default RecipePage;
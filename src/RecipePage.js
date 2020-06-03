import React from 'react';
import { useParams } from 'react-router-dom'
import Recipe from './components/recipe'
import ResultsMore from './components/ResultsMore';
import './App.css';


function RecipePage({initial}) {

  let { recipe } = useParams()

  return (
    <div className="App">
        <Recipe recipeSlug={recipe} />
        <ResultsMore gotRecipes={initial}/>
    </div>
  );
}

export default RecipePage;
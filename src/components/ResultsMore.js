import React from 'react';
import { Link, useHistory } from "react-router-dom";
import { CardMedia } from '@material-ui/core';
import './ResultsMore.css';

const ResultsMore = ({gotRecipes}) => {

    const history = useHistory();
    
    return (
    <>
      <div className='results-cards-more'>
        <h2 className='main-results'>Other recipes you may be interessted in</h2>
            <div className='cards-wrap'>
                <div className='cards-wrap'>
                {gotRecipes.slice(7,9).map(recipe => 
                  <>
                    <Link
                        to= ' '
                        style={{textDecoration: 'none'}}
                        onClick={(e) =>{ history.push(`/${recipe.recipe_slug}`); window.scrollTo(0,0); e.preventDefault()}} 
                        key={recipe.recipe_id}
                        >
                    <CardMedia className='main-card' image={recipe.recipe_hero_image} />
                    <h3 className='recipe-card-title'>{recipe.recipe_title}</h3>
                    </Link>
                  </>
                )}
                </div>
            </div>
        </div>
    </>
    )
};

export default ResultsMore;
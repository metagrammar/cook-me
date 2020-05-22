import React from 'react';
import { Link, useHistory } from "react-router-dom";
import { CardMedia } from '@material-ui/core';
import './ResultsMore.css';

const ResultsMore = ({gotRecipes}) => {

    const history = useHistory();
    //let i=0;
    return (
        <>
        <div className='results-cards-more'>
        <h2 className='main-results'>Other recipes you may be interessted in</h2>
            <div className='cards-wrap'>
            <div className='cards-wrap'>
                {gotRecipes.slice(7,9).map(recipe => 
                    recipe.sys.contentType.sys.id === 'recipe'? 
                    <>
                    <Link
                        to= ' '
                        style={{textDecoration: 'none'}}
                        onClick={(e) =>{ history.push(`/${recipe.fields.slug}`);window.scrollTo(0,0); e.preventDefault()}} 
                        key={recipe.sys.id}
                        >
                    <CardMedia className='main-card' image={recipe.fields.recipeHeroImage.fields.file.url} />
                    <h3 className='recipe-card-title'>{recipe.fields.recipeTitle}</h3>
                     </Link>
                    </>
                     :''
                    )}
            </div>
            </div>
        </div>
        </>
        
    )
};

export default ResultsMore;
import React from 'react';
import { Link, useHistory } from "react-router-dom";
import Carousel from 'react-material-ui-carousel'
import CardMedia from '@material-ui/core/CardMedia';
import './highlight.css';



function Highlight({ gotRecipes }) {

  const history = useHistory();

  
   return (
      <>  
        <div className="highlight">
            <Carousel autoPlay={true} indicators={false} interval={4500} timeout={500}>

                    {gotRecipes.slice(0,4).map(recipe => {
                      
                      return (                        
                        <Link
                            to=' '
                            style={{textDecoration: 'none'}}
                            onClick={(e) => {history.push(`/${recipe.recipe_slug}`); window.scrollTo(0,0); e.preventDefault()}} 
                            key={recipe.recipe_id}
                            >
                            <div className="carouselitem">
                              <CardMedia 
                                image={recipe.recipe_hero_image}
                                className="img-conatin" />
                        
                                <div className="carouselitem-card">
                                    <h2>Our recommandation:</h2>
                                    <h1>{recipe.recipe_title}</h1>
                                </div>
                            </div>  
                        </Link>
                        )}
                      )}                 
            </Carousel>
            {document.getElementById('container')}
        </div>
      </>
    );
  }
  
  export default Highlight;
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
                      
                      if (recipe.sys.contentType.sys.id === 'recipe') {
                        return (                        
                        <Link
                            to=' '
                            style={{textDecoration: 'none'}}
                            onClick={(e) => {history.push(`/${recipe.fields.slug}`); window.scrollTo(0,0); e.preventDefault()}} 
                            key={recipe.sys.id}
                            >
                            <div className="carouselitem">
                              <CardMedia 
                                image={recipe.fields.recipeHeroImage.fields.file.url}
                                className="img-conatin" />
                        
                                <div className="carouselitem-card">
                                    <h2>Best of {recipe.fields.categories[0].fields.categoryTitle}</h2>
                                    <h1>{recipe.fields.recipeTitle}</h1>
                                </div>
                            </div>  
                        </Link>
                        )}
                        return (console.log("api not responded yet"))
                        }
                      )}                 
            </Carousel>
            {document.getElementById('container')}
        </div>
      </>
    );
  }
  
  export default Highlight;
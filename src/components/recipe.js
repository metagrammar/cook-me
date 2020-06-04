import React, { useState, useEffect } from 'react';
import './recipe.css';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Steps from './steps';
import './recipe.css';


const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: '1rem',
      fontFamily: 'Montserrat, sans-serif'
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  let ingridients = []


  
 function Recipe({ recipeSlug }) {
  const [recipeData, setRecipeData] = useState()
  const [stepData, setStepData] = useState()

    useEffect( ()=>{
      fetch(`https://saucy-secret.herokuapp.com/recipe/${recipeSlug}`, requestOptions)
      .then(response => response.json())
      .then(result => setRecipeData(result))
      .then(x => ingridients = Object.values(recipeData[0].recipe_ingredients))
      .then(after => {
        fetch(`https://saucy-secret.herokuapp.com/step/${recipeData[0].recipe_id}`, requestOptions)
          .then(response => response.json())
          .then(result => setStepData(result))
          .catch(error => console.log('error', error));
          })
      .catch(error => console.log('error', error));
    },[recipeSlug,recipeData])

    return (
      !recipeData?"":
        <div className="recipe" id="recipe">
          <img src={recipeData[0].recipe_hero_image} alt={recipeData[0].recipe_title} className='hero-image' />
          <h1>{recipeData[0].recipe_title}</h1>
            <h3>{recipeData[0].recipe_description}</h3>
            <TableContainer className='table' component={Paper}>
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell className='table-header' align="left">Amount</StyledTableCell>
                      <StyledTableCell className='table-header'  align="left">Ingredient</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ingridients.map((row) => (
                    <StyledTableRow key={row[0]+row[1]}>
                      <StyledTableCell align="left" width="20%">{row[0]}</StyledTableCell>
                      <StyledTableCell align="left">{row[1]}</StyledTableCell>
                    </StyledTableRow>))}
                </TableBody>
              </Table>
            </TableContainer>
            {!stepData? console.log("waiting"):
            <Steps recipeData={Object.values(stepData)} />
            }
        </div>
    );
  }
  
  export default Recipe;
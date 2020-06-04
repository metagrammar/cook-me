import React, { useEffect, useState } from 'react';
import { Hidden, useMediaQuery } from '@material-ui/core';
import './category.css';
import NavSearch from './NavSearch';

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};


function Category({ getFilter }) {
  const [catData, setCatData] = useState()
  const [mainCatData, setMainCatData] = useState()

    useEffect( () => {
      fetch("https://saucy-secret.herokuapp.com/cat_main/", requestOptions)
      .then(response => response.json())
      .then(result => setMainCatData(result))
      .catch(error => console.log('error', error));

      fetch("https://saucy-secret.herokuapp.com/cat/", requestOptions)
      .then(response => response.json())
      .then(result => setCatData(result))
      .catch(error => console.log('error', error));
      },[])


  const handleCheckboxFilter = (e) => {
      let tempData = []
      for(let i = 0; i < e.currentTarget.length; i++)

      { if(e.currentTarget[i].checked) {
          tempData.push(e.currentTarget[i].name)
        }
      }
      getFilter(tempData)
    }

    const isMobile = useMediaQuery('(max-width: 600px)');
    const handleHeight = isMobile ? 'categoryMobile' : ''
    // const handleSerachInput = isMobile ? 'categoryMobile' : ''

    return (
      <>
      <div className={`category ${handleHeight}` }
      onChange={(e) => handleCheckboxFilter(e)}
      >
      <Hidden smUp>
          <div className='mobile-search'>
            <NavSearch />
          </div>
        </Hidden>
        {mainCatData !== undefined?
          mainCatData.map(mainCat => 
          <div className='category-item' key={mainCat.main_cat_id}>
            <h3>{mainCat.main_cat_title}</h3>
            
            {catData !== undefined?catData.map(cat => {
                return (
                <label class='container'>
                  {cat.category_title}
                  <input 
                    name={cat.category_title} 
                    type="checkbox" 
                  />
                  <span class="checkmark"></span>
                  </label>
                )
                })
              :""} 
          </div>
          ):""}
          <Hidden smUp>
          <button className='mobile-accept-cats'>Set filters</button>
          </Hidden>
      </div>
      </>
      );
    }
    
  
  export default Category;

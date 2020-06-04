import React, { useEffect, useState } from 'react';
import { Hidden, useMediaQuery } from '@material-ui/core';
import './category.css';
import NavSearch from './NavSearch';




const contentful = require('contentful')
const client = contentful.createClient({
  space: 'on7xb2olivy7',
  environment: 'master', // defaults to 'master' if not set
  accessToken: process.env.REACT_APP_SECRET_SAUCE_DELIVERY_API_TOKEN
})

function Category({ getFilter }) {

  const [catData, setCatData] = useState()
  const [mainCatData, setMainCatData] = useState()


  useEffect(()=>{ 
        client.getEntries({
          content_type: 'mainCategory'})
        .then((response) => setMainCatData(response.items))
        .catch(console.error)

        client.getEntries({
          content_type: 'categories'})
        .then((response) => setCatData(response.items))
        .catch(console.error)
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
          <div className='category-item' key={mainCat.sys.id}>
            <h3>{mainCat.fields.title}</h3>
            
            {catData !== undefined?catData.map(cat => {
                if (cat.fields.parentCategory.fields.id === mainCat.fields.id){
                  return(
                    <label class='container'>
                      {cat.fields.categoryTitle}
                      <input 
                        name={cat.fields.categoryTitle} 
                        type="checkbox" 
                      />
                      <span class="checkmark"></span>
                    </label>
                  )
                } return (null)
              }):""} 
          </div>
          ):""}
          <Hidden smUp>
          <button className='mobile-accept-cats'>
            Set filters
          </button>
        </Hidden>
        </div>
        
      </>
      );}
  
  export default Category;

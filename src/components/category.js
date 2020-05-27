import React, { useEffect, useState } from 'react';
import './category.css';




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

    return (
      <>
      <form className='category' onChange={(e) => handleCheckboxFilter(e)}>
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
        </form>
        
      </>
      );}
  
  export default Category;

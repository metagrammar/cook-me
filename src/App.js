import React, {useState, useEffect} from 'react';
import { Route, Switch, useHistory } from "react-router-dom";
import Home from './Home'
import Footer from './components/Footer'
import Navigation from './components/navigation'
import RecipePage from './RecipePage'

// API SETUP INFORMATION
const contentful = require('contentful')
const client = contentful.createClient({
  space: 'on7xb2olivy7',
  environment: 'master', // defaults to 'master' if not set
  accessToken: process.env.REACT_APP_SECRET_SAUCE_DELIVERY_API_TOKEN
})


function App() {
  const [searchToggle, setSearchToggle] = useState(0)
  const [search, setSearch] = useState()
  const [recipes, setRecipes] = useState()
  const [initial, setInitial] = useState()
  const [categories, setCategories] = useState()
  const [catFilter, setCatFilter] = useState([])
  const [firstRun, setFirstRun] = useState(true);
  const history = useHistory();


//HELPER FUNCTIONS
  const searchHandler = (searchquery) => {
    history.push('/')
    setSearchToggle(1)
    setSearch(searchquery)
    resetFilter()
  }

    

      
  const filterHandler = (filter) => {
    setCatFilter(filter);
    setRecipes(initial.filter(x => catFilter.every(y => 
      {return x.fields.categories.some(z => 
          z.fields.categoryTitle === y)
          })
      ))
  }

  
  const resetFilter = () => {
    setCatFilter([])
  }



// USE EFFECTS
  useEffect( () => {
    client.getEntries({
      content_type: 'categories'})
    .then(response => setCategories(response.items))
    .catch(console.error)
  
    client.getEntries({
      content_type: 'recipe'})
    .then(response => setInitial(response.items))
    .catch(console.error)
  
    if (searchToggle === 0){
    client.getEntries({
      content_type: 'recipe'})
    .then(response => setRecipes(response.items))
    .catch(console.error)
    }
    else {
    console.log("Useeffect of Search")
    client.getEntries({
      content_type: 'recipe',
      'query': `${search}`})
    .then((response) => {console.log(response.items); setRecipes(response.items)})
    .catch(console.error)
    }

    if (!firstRun) {
      setRecipes(initial.filter(x => catFilter.every(y => x.fields.categories.some(z => z.fields.categoryTitle === y))))
    } else setFirstRun(false)


  },[search, searchToggle])
  





  // RETURN
  return (
    <div>
      <Navigation onSearch={searchHandler} getFilter={filterHandler}/>
      {!recipes?'': 
      <Switch>
        <Route path='/:recipe' render={props => <RecipePage gotRecipes={recipes} initial={initial} {...props} />} />
        <Route exact path='/' render={props => <Home initial={initial} gotRecipes={recipes} gotCategories={categories} searchToggle={searchToggle} search={search} filters={catFilter} resetFilter={resetFilter} {...props} />} />
      </Switch>
      }
      <Footer/>
    </div>
  );
}

export default App;

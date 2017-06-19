import React from 'react';

import RecipeDetail from './RecipeDetail';
import RecipeList from './RecipeList';
import CreateForm from './CreateForm';
import SearchBox from './SearchBox';

const LOCAL_STORAGE_KEY = 'recipes';

class App extends React.Component {
    constructor() {
        super();

        const localStorageRecipes = window.localStorage.getItem(LOCAL_STORAGE_KEY);

        this.state = {
            showCreate: false,
            recipes: localStorageRecipes ? JSON.parse(localStorageRecipes) : [],
            selectedRecipe: null,
            search: ''
        };
    }

    showCreate() {
        this.setState({ showCreate: true});
    }
    
    handleCreateRecipe(name, ingredients, instructions) {
        const newRecipes = this.state.recipes.concat({
            id: new Date().getTime(),
            name,
            ingredients,
            instructions
        });
        this.updateRecipes(newRecipes);
    }

    handleSelectRecipe(recipe) {
        this.setState({
            selectedRecipe: recipe,
            showCreate: false
        })
    }

    handleDeleteRecipe(recipeToDelete) {
        const newRecipes = this.state.recipes.filter(recipe=> recipe !== recipeToDelete);
        this.updateRecipes(newRecipes);
        this.setState({
            selectedRecipe : null
        });
    }

    handleSearchChange(search) {
        this.setState({
            search
        });
    }

    updateRecipes(newRecipes) {
        this.setState({
            recipes: newRecipes
        });

        window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newRecipes));
    }

    render() {
        const { recipes, selectedRecipe, showCreate, search} = this.state;

        const filteredRecipes = recipes.filter(recipe=>
            recipe.name.toLowerCase().indexOf(search.toLowerCase()) > -1)
            .sort((a, b) => a.name > b.name);
        
        return(
        <div className = 'container'>
            <h1>Recipe Database</h1>

            <div className = 'row'>
                <div className='col-xs-4'>
                    <button type='button' className='btn btn-primary' style={{ width: '100%', marginBottom: '5px'}} 
                     onClick={this.showCreate.bind(this)}
                    >
                        Create new recipe 
                    </button>
                    <SearchBox onChange={this.handleSearchChange.bind(this)} />
                    <RecipeList 
                        recipes={filteredRecipes}
                        onSelectRecipe={this.handleSelectRecipe.bind(this)}
                    />
                </div>
                <div className='col-xs-8'>
                    {
                    showCreate ? 
                    <CreateForm onSubmit={this.handleCreateRecipe.bind(this)} /> : 
                    <RecipeDetail recipe={selectedRecipe} onDelete={this.handleDeleteRecipe.bind(this)} />
                    }

                </div>
            </div>
        </div>);        
    }
}

export default App;
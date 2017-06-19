import React from 'react';

import RecipeDetail from './RecipeDetail';
import RecipeList from './RecipeList';
import CreateEditForm from './CreateEditForm';
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
        this.setState({ showCreate: true, selectedRecipe : null});
    }
    
    handleRecipeCreated(name, ingredients, instructions) {
        const newRecipes = this.state.recipes.concat({
            id: new Date().getTime(),
            name,
            ingredients,
            instructions
        });
        this.updateRecipes(newRecipes);
    }

    handleRecipeEdited(name, ingredients, instructions) {
        const {recipes, selectedRecipe} = this.state;
        const editedRecipe = Object.assign({}, selectedRecipe, {
            name,
            ingredients,
            instructions
        });

        const newRecipes = recipes.map(recipe => recipe === selectedRecipe ? editedRecipe : recipe);
        this.updateRecipes(newRecipes);
        this.handleSelectRecipe(editedRecipe);
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

    handleEditRecipe() {
        this.setState({
            showCreate : true
        })
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
                    <CreateEditForm 
                      onCreate={this.handleRecipeCreated.bind(this)} 
                      onEdit={this.handleRecipeEdited.bind(this)} 
                      recipe={selectedRecipe} /> : 
                    <RecipeDetail recipe={selectedRecipe} 
                      onDelete={this.handleDeleteRecipe.bind(this)} 
                      onEdit={this.handleEditRecipe.bind(this)}/>
                    }

                </div>
            </div>
        </div>);        
    }
}

export default App;
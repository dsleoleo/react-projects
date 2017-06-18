import React from 'react';

import RecipeDetail from './RecipeDetail';
import RecipeList from './RecipeList';
import CreateForm from './CreateForm';

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            showCreate: false,
            recipes: [],
            selectedRecipe: null
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
        this.setState({
            recipes : newRecipes
        });
    }

    handleSelectRecipe(recipe) {
        this.setState({
            selectedRecipe: recipe,
            showCreate: false
        })
    }

    render() {
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
                    <RecipeList 
                        recipes={this.state.recipes}
                        onSelectRecipe={this.handleSelectRecipe.bind(this)}
                    />
                </div>
                <div className='col-xs-8'>
                    {this.state.showCreate ? 
                    <CreateForm onSubmit={this.handleCreateRecipe.bind(this)} /> : 
                    <RecipeDetail recipe={this.state.selectedRecipe}/>
                    }

                </div>
            </div>
        </div>);        
    }
}

export default App;
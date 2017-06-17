import React from 'react';
import Header from './Header';
import TodoList from './TodoList';

class App extends React.Component {
    render() {
        return <div><Header /><TodoList /></div>;        
    }
}

export default App;
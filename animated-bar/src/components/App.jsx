import React from 'react';
import Strategy from './Strategy';

class App extends React.Component {
    constructor(...args) {
        super(...args);        

    }
   


    render() {
        return (
            <div style={{display: "flex"}}>                                
                <Strategy id="first"></Strategy>                
                <Strategy id="second"></Strategy>
            </div>
        )
    }
}

export default App;
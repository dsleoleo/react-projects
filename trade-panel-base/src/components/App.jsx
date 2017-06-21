import React from 'react';
import Collapsible from './Collapsible';
import PricePanel from './PricePanel';
import Timer from './Timer';


class App extends React.Component {
    render() {
        return (
        <div className="exchange-container">            
            <PricePanel />
            <PricePanel />
            <PricePanel />
            <PricePanel />
            <PricePanel />
            <PricePanel />
        </div>);        
    }
}

export default App;
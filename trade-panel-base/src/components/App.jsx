import React from 'react';
import Collapsible from './Collapsible';
import PricePanel from './PricePanel';
import Timer from './Timer';


class App extends React.Component {
    render() {
        return (
        <div className="exchange-container">            
            <PricePanel symbol="ETH / USD" bigFigure={3} interval={1600}/>
            <PricePanel symbol="BTC / USD" bigFigure={26} interval={2000}/>
            <PricePanel symbol="LTC / USD" bigFigure={0} interval={3500}/>
            <PricePanel symbol="ETC / USD" bigFigure={0} interval={4500}/>
            <PricePanel symbol="DASH / USD" bigFigure={1} interval={3000}/>
            <PricePanel symbol="ZEC / USD" bigFigure={3} interval={2400}/>
        </div>);        
    }
}

export default App;
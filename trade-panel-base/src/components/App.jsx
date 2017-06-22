import React from 'react';
import Collapsible from './Collapsible';
import PricePanel from './PricePanel';
import Timer from './Timer';


class App extends React.Component {
    render() {
        return (
        <div className="exchange-container">            
            <PricePanel base="XMR" term="USD" bigFigure={3} interval={2500}/>
            <PricePanel base="BTC" term="USD" bigFigure={26} interval={3000}/>
            <PricePanel base="LTC" term="USD" bigFigure={0} interval={5500}/>
            <PricePanel base="ETC" term="USD" bigFigure={0} interval={6500}/>
            <PricePanel base="DASH" term="USD" bigFigure={1} interval={7000}/>
            <PricePanel base="ZEC" term="USD" bigFigure={3} interval={8400}/>
            <PricePanel base="BTC" term="EUR" bigFigure={26} interval={9000}/>
            <PricePanel base="BTC" term="JPY" bigFigure={89} interval={6000}/>
        </div>);        
    }
}

export default App;
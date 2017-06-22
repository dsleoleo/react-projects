import React from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class PricePanel extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            open: false,
            bidRate: { bigFigure: this.props.bigFigure, pip: 0, decimal: 0, scale: 100, isUp: false},
            askRate: { bigFigure: this.props.bigFigure, pip: 0, decimal: 0, scale: 100, isUp: false},
            symbol: this.props.symbol, 
            isSpreadDown: true,
            bids: [],
            asks: []
        };
    }
    
    getRandom(baseNumber) {
        return Math.floor((Math.random() * baseNumber) + 1) - 1;
    }
    generateRate(bigFigure) {
        return { bigFigure, pip: this.getRandom(100), decimal: this.getRandom(100), scale: 100, isUp: false};
    }
    getRawPrice(rate) {
        return rate.bigFigure * rate.scale + rate.pip + rate.decimal / 100;
    }
    getSpread(bid, ask) {
        return (this.getRawPrice(ask) - this.getRawPrice(bid)).toFixed(2);
    }
    componentDidMount() {
        this.timer = setInterval(this.setPrice.bind(this), this.props.interval);
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }
    
    
    setPrice() {
       const {bidRate: previousBid, askRate: previousAsk} = this.state;        
        const bid = this.generateRate(this.props.bigFigure);
        var ask = this.generateRate(this.props.bigFigure);
        while(this.getRawPrice(ask) < this.getRawPrice(bid)) {
            ask = this.generateRate(this.props.bigFigure);
        }
        bid.isUp = this.getRawPrice(bid) > this.getRawPrice(previousBid)
        ask.isUp = this.getRawPrice(ask) < this.getRawPrice(previousAsk)
        const isSpreadDown = this.getSpread(bid, ask) < this.getSpread(previousBid, previousAsk)

        this.setState({
            bidRate : bid,
            askRate : ask,
            isSpreadDown : isSpreadDown,
            bids: [{size: 888, price: 1234, exchange: "Coinbase"}, {size: 888, price: 1234, exchange: "Coinbase"}, {size: 888, price: 1234, exchange: "Coinbase"}, {size: 888, price: 1234, exchange: "Coinbase"}],
            asks: [{size: 888, price: 1234, exchange: "Coinbase"}, {size: 888, price: 1234, exchange: "Coinbase"}, {size: 888, price: 1234, exchange: "Coinbase"}]
        });
    }

    render() {
        const upAnimation = { animationName: 'price-up', animationDuration: '1s'};
        const downAnimation = { animationName: 'price-down', animationDuration: '1s'};

        return (
            <div className="price-panel-container">
                <div className="spot-tile spot-tile--readonly">
                    <div className="spot-tile__container">
                        <div className="spot-tile__controls"><i className="spot-tile__icon--hidden spot-tile__icon--chart glyphicon glyphicon-stats"></i>
                            <i className="popout__controls glyphicon glyphicon-new-window spot-tile__icon--tearoff"></i>
                            <i className="popout__undock spot-tile__icon--undock glyphicon glyphicon-log-out"></i>
                        </div>
                        <div><span className="spot-tile__execution-label">Executing</span>
                            <div className=""><span className="spot-tile__symbol">{this.props.symbol}</span>
                                <div className="price-button spot-tile__price spot-tile__price--bid" style={this.state.bidRate.isUp ? upAnimation : downAnimation}>
                                
                                    <span className="price-button__wrapper">
                                        <span className="price-button__big-figure">
                                            <span className="price-button__direction">Sell</span>
                                            <br />{this.state.bidRate.bigFigure}
                                        </span>
                                        <span className="price-button__pip">{this.state.bidRate.pip}</span><span className="price-button__tenth">.{this.state.bidRate.decimal}</span></span>
                                
                                </div>
                                <div className="spot-tile__price-movement">
                                    <div>
                                        <div className="price-movement">
                                            <i className={this.state.isSpreadDown ? "price-movement__icon--up glyphicon glyphicon-chevron-up" : "price-movement__icon--down glyphicon glyphicon-chevron-down"}                                               
                                            ></i>
                                            <span className="price-movement__value">{this.getSpread(this.state.bidRate, this.state.askRate)}</span>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div className="price-button spot-tile__price spot-tile__price--ask" style={this.state.askRate.isUp ? upAnimation : downAnimation}>
                                    <span className="price-button__wrapper">
                                        <span className="price-button__big-figure">
                                            <span className="price-button__direction">Buy</span>
                                            <br />{this.state.askRate.bigFigure}
                                </span>
                                        <span className="price-button__pip">{this.state.askRate.pip}</span><span className="price-button__tenth">.{this.state.askRate.decimal}</span></span>
                                </div>
                            </div>
                            <div className="notional spot-tile__notional">
                                <span>1000,000</span>
                            </div>
                            <div className="spot-tile__delivery">
                                <span>1000,000</span>
                            </div>

                            <div className="center-down-arrow">
                                <i className={ this.state.open ? "glyphicon glyphicon-triangle-top" : "glyphicon glyphicon-triangle-bottom" } onClick={() => this.setState({ open: !this.state.open })}></i>
                            </div>
                        </div>

                    </div>

                </div>

                <Panel collapsible expanded={this.state.open} style={{ backgroundColor : '#2979bc', border: 'none'}}>
                    <div className="extension-panel-container">
                    <div className="extension-table-item-left">    
                    <table className="table table-hover table-condensed bg-primary">
                        <thead>
                            <tr>
                                <th>Size</th>
                                <th>Rate</th>
                                <th>Exchange</th>
                            </tr>
                        </thead>
                        <tbody>                            
                            { this.state.bids.map(bid=><tr><td>{bid.size}</td><td>{bid.price}</td><td>{bid.exchange}</td></tr>)}                                                            
                        </tbody>
                    </table>
                    </div>
                    <div className="extension-table-item-right">    
                    <table className="table table-hover table-condensed bg-primary">
                        <thead>
                            <tr>
                                <th style={{textAlign: 'right'}}>Size</th>
                                <th style={{textAlign: 'right'}}>Rate</th>
                                <th style={{textAlign: 'right'}}>Exchange</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.state.asks.map(bid=><tr><td>{bid.size}</td><td>{bid.price}</td><td>{bid.exchange}</td></tr>)}                                                            
                        </tbody>
                    </table>
                    </div>
                    </div>
                </Panel>
            </div>

        );
    }
}

PricePanel.propTypes = {
    interval: PropTypes.number.isRequired,
    bigFigure: PropTypes.number.isRequired,    
    symbol: PropTypes.string.isRequired,
}
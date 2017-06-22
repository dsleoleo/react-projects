import React from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import BitcoinImg from '../img/bitcoin.png';
import EtherImg from '../img/ethereum.png';
import DashImg from '../img/dash.png';
import IotaImg from '../img/iota.png';
import UsdImg from '../img/usd.png';
import LiteCoinImg from '../img/litecoin.png';
import RippleImg from '../img/ripple.png';
import MoneroImg from '../img/monero.png';
import ZCashImg from '../img/zcash2.png';
import JpyImg from '../img/jpy.png';
import EurImg from '../img/eur.png';

const COINS_SYMBOL = ['BTC', 'ETH', 'XRP', 'LTC', 'ETC', 'XEM', 'DASH', 'MIOTA', 'XMR', 'ZEC'];
const CURRENCY_SYMBOL = ['JPY', 'USD', 'EUR', 'CNY'];
const EXCHANGE = ['Coinbase', 'Cryptsy', 'Bter', 'Coins-e', 'Hitbtc', 'FXBTC'];

const IMG_MAP = {'BTC': BitcoinImg, 'ETC': EtherImg, 'XRP' : RippleImg, 
                 'DASH': DashImg, 'USD' : UsdImg, 'MIOTA': IotaImg, 'LTC': LiteCoinImg, 
                 'XMR': MoneroImg, 'ZEC': ZCashImg, 'EUR': EurImg, 'JPY': JpyImg};
export default class PricePanel extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            open: false,
            bidRate: { bigFigure: this.props.bigFigure, pip: 0, decimal: 0, scale: 100, isUp: false},
            askRate: { bigFigure: this.props.bigFigure, pip: 0, decimal: 0, scale: 100, isUp: false},
            base: this.props.base,
            term: this.props.term, 
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
    
    generateExchange() {
        return { size: this.getRandom(100) + 21, price: this.getRawPrice(this.generateRate(this.props.bigFigure)), exchange: EXCHANGE[this.getRandom(EXCHANGE.length) - 1]};
    }
    
    aggregateSize(totalSize, price) {
        return totalSize + price.size;
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

        var bids = [];
        var asks = [];
        for (var i = 0; i < 5; i++) {
            bids = bids.concat(this.generateExchange());
            asks = asks.concat(this.generateExchange());
        }

        this.setState({
            bidRate : bid,
            askRate : ask,
            isSpreadDown : isSpreadDown,
            bids: bids,
            asks: asks
        });
    }

    render() {
        const upAnimation = { animationName: 'price-up', animationDuration: '1s'};
        const downAnimation = { animationName: 'price-down', animationDuration: '1s'};
        const btcIcon = { backgroundImage: 'url(' + BitcoinImg + ')'};
        
        return (
            <div className="price-panel-container">
                <div className="spot-tile spot-tile--readonly">
                    <div className="spot-tile__container">
                        <div className="spot-tile__controls"><i className="spot-tile__icon--hidden spot-tile__icon--chart glyphicon glyphicon-stats"></i>
                            <i className="popout__controls glyphicon glyphicon-new-window spot-tile__icon--tearoff"></i>
                            <i className="popout__undock spot-tile__icon--undock glyphicon glyphicon-log-out"></i>
                        </div>
                        <div><span className="spot-tile__execution-label">Executing</span>
                            <div className="" >
                                <span className="spot-tile__symbol">{this.props.base} / {this.props.term}                                 
                                </span>
                                <span className="spot-tile__coin_icon">
                                    <img src={IMG_MAP[this.props.base]} height="35" width="35" /><img src={IMG_MAP[this.props.term]} height="35" width="35" />
                                </span>    
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
                                <span>{this.state.bids.reduce(this.aggregateSize, 0)}</span>
                            </div>
                            <div className="spot-tile__delivery">
                                <span>{this.state.asks.reduce(this.aggregateSize, 0)}</span>
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
    base: PropTypes.string.isRequired,
    term: PropTypes.string.isRequired
}
import React from 'react';
import Panel from 'react-bootstrap/lib/Panel';

export default class PricePanel extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            open: false,
            bidRate: { bigFigure: 0, pip: 0, decimal: 0, scale: 100},
            askRate: { bigFigure: 0, pip: 0, decimal: 0, scale: 100},
            symbol: ''
        };
    }
    
    getRandom(baseNumber) {
        return Math.floor((Math.random() * baseNumber) + 1) - 1;
    }
    generateRate(bigFigure) {
        return { bigFigure, pip: this.getRandom(100), decimal: this.getRandom(100), scale: 100};
    }
    getRawPrice(rate) {
        return rate.bigFigure * rate.scale + rate.pip + rate.decimal / 100;
    }
    getSpread(bid, ask) {
        return (this.getRawPrice(ask) - this.getRawPrice(bid)).toFixed(2);
    }
    componentDidMount() {
        this.setPrice();
    }
    
    setPrice() {
        const bid = this.generateRate(200);
        var ask = this.generateRate(200);
        while(this.getRawPrice(ask) < this.getRawPrice(bid)) {
            ask = this.generateRate(200);
        }
        this.setState({
            bidRate : bid,
            askRate : ask
        });
    }

    render() {
        return (
            <div className="price-panel-container">
                <div className="spot-tile spot-tile--readonly">
                    <div className="spot-tile__container">
                        <div className="spot-tile__controls"><i className="spot-tile__icon--hidden spot-tile__icon--chart glyphicon glyphicon-stats"></i>
                            <i className="popout__controls glyphicon glyphicon-new-window spot-tile__icon--tearoff"></i>
                            <i className="popout__undock spot-tile__icon--undock glyphicon glyphicon-log-out"></i>
                        </div>
                        <div><span className="spot-tile__execution-label">Executing</span>
                            <div className=""><span className="spot-tile__symbol">XBT / USD</span>
                                <div className="price-button spot-tile__price spot-tile__price--bid">
                                    <span className="price-button__wrapper">
                                        <span className="price-button__big-figure">
                                            <span className="price-button__direction">Sell</span>
                                            <br />{this.state.bidRate.bigFigure}
                                        </span>
                                        <span className="price-button__pip">{this.state.bidRate.pip}</span><span className="price-button__tenth">.{this.state.bidRate.decimal}</span></span>
                                </div>
                                <div className="spot-tile__price-movement">
                                    <div>
                                        <div className="price-movement"><i className="price-movement__icon--up fa fa-lg price-movement__icon--inactive"></i>
                                            <span className="price-movement__value">{this.getSpread(this.state.bidRate, this.state.askRate)}</span><i className="price-movement__icon--down fa fa-lg fa-caret-down"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="price-button spot-tile__price spot-tile__price--ask">
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
                                <i className="glyphicon glyphicon-triangle-bottom" onClick={() => this.setState({ open: !this.state.open })}></i>
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
                            <tr>
                                <td>100</td>
                                <td>2624.78</td>
                                <td>GDAX</td>
                            </tr>
                            <tr>
                                <td>100</td>
                                <td>2624.78</td>
                                <td>GDAX</td>
                            </tr>
                            <tr>
                                <td>100</td>
                                <td>2624.78</td>
                                <td>GDAX</td>
                            </tr>
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
                            <tr>
                                <td>100</td>
                                <td>2624.78</td>
                                <td>GDAX</td>
                            </tr>
                            <tr>
                                <td>100</td>
                                <td>2624.78</td>
                                <td>GDAX</td>
                            </tr>
                            <tr>
                                <td>100</td>
                                <td>2624.78</td>
                                <td>GDAX</td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                    </div>
                </Panel>
            </div>

        );
    }
}


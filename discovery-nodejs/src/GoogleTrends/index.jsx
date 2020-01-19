import React, { Component } from 'react';
import classNames from 'classnames';
import { string, number, shape, arrayOf } from 'prop-types';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ComposedChart,
} from 'recharts';
import WidgetHeader from '../WidgetHeader/index';
import QuerySyntax from '../QuerySyntax/index';
import queryBuilder from '../query-builder';

export default class GoogleTrends extends Component {
  state = {
    data: null,
    hasLoaded: false,
  }

  static widgetTitle() {
    return 'Google Trends';
  }

  static widgetDescription() {
    return 'Interest over time for each company from Google Trends';
  }

  static propTypes = {
    query: shape({
      text: string.isRequired,
    }).isRequired
  };

  encodeQueryData(data) {
    const ret = [];
    for (let d in data)
      ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    return ret.join('&');
  }

  convertResponseToGraphJSON(json) {
    const data = json.default.timelineData;
    var finalJSON = [];

    var i;
    for (i = 0; i < data.length; i++) {
      let curData = data[i];
      let graphData = {};
      graphData["time"] = curData.time;
      graphData["formatted_time"] = curData.formattedAxisTime;
      var company;
      for (company = 0; company < curData.value.length; company++) {
        graphData["company_" + company] = curData.value[company];
      }

      finalJSON.push(graphData);
    }

    console.log(finalJSON);
    return finalJSON;
  }

  makeRequest = (query) => {
    const host = process.env.REACT_APP_SERVER || '';
    const queryArray = query.text.split(",");
    let reqParams = {};
    var i;
    for (i = 0; i < queryArray.length; i++) {
      reqParams["company_" + i] = queryArray[i];
    }

    fetch(`${host}/api/trends?${this.encodeQueryData(reqParams)}`, {
      method: 'GET',
    }).then(response => {
      if (response.ok) {
        response.json().then(json => {
          console.log("got result for " + query.text);
          this.setState({ data: this.convertResponseToGraphJSON(json), hasLoaded: true })
        });
      }
    });
  }

  render() {
    const { query } = this.props;

    return (
      <div>
        {!this.state.hasLoaded ? (
          this.makeRequest(query)) :
          <div className="anomaly-detection widget">
            <WidgetHeader
              title={GoogleTrends.widgetTitle()}
              description={GoogleTrends.widgetDescription()}
            />

          <div className="anomaly-chart-container--div">
            <ResponsiveContainer height={250}>
              <LineChart
                data={this.state.data}
                className={classNames('anomaly-chart--svg', {
                  faded: this.state.showOverlay,
                })}
                margin={{
                  ...ComposedChart.defaultProps.margin,
                  top: 15,
                  right: 15,
                }}
              >
                {
                  [...Array(query.text.split(",").length).keys()].map((id) => {
                    return (<Line
                      type="linear"
                      dataKey={"company_" + id}
                      name={"Search Interest for " + query.text.split(",")[id]}
                      stroke={"#" + (parseInt("6ABA4F", 16) + (id * -400)).toString(16)}
                      strokeWidth="3"
                    />)
                  })
                }
                <CartesianGrid stroke="#ccc" />
                <XAxis
                  dataKey="formatted_time"
                  tickLine={false}
                />
                <YAxis domain={['auto', 'auto']} tickLine={false} />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </div>
          </div>
        }
      </div>
    );
  }
}

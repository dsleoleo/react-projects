import React, { Component } from 'react';
import {
    ResponsiveContainer,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ComposedChart,
    BarChart,
    Bar,
    Legend,
} from 'recharts';
import {_dataString_} from '../sentimentstudydata.js';

export default class SentimentBarGraph extends Component {
    state = {
        data: null,
        hasLoaded: false,
    }

    csvToSentimentData = () => {
        var rows = _dataString_.split("\n");
        const csv = rows.map(row => row.split(","));
        var res = {};
        const header = csv[0];
        csv.shift();

        res["questions"] = csv.map(row => row[0]);
        res["negative"] = csv.map(row => parseFloat(row[1]));
        res["positive"] = csv.map(row => parseFloat(row[3]));

        var final = [];
        var i;
        for (i = 0; i < 6; i++) {
            var curObj = {};
            curObj["questions"] = res["questions"][i];
            curObj["negative"] = res["negative"][i];
            curObj["positive"] = res["positive"][i];

            final.push(curObj)
        }
        // console.log(final);
        return final;
    }

    static defaultProps = {
        colorLine: '#6ABA4F',
    };

    render() {
        return (
            <div>
                {!this.state.hasLoaded ? (
                    this.setState({ data: this.csvToSentimentData(), hasLoaded: true })) :
                    <ResponsiveContainer height={250}>
                        <BarChart
                            data={this.state.data}
                            barSize="2"
                            margin={{
                                ...ComposedChart.defaultProps.margin,
                                top: 15,
                                right: 15,
                            }}
                        >
                            <Bar
                                dataKey="positive"
                                name="Positive sentiment"
                                fill="#6ABA4F"
                            />

                            <Bar
                                dataKey="negative"
                                name="Negative sentiment"
                                fill="#fc0303"
                            />
                            <CartesianGrid stroke="#ccc" />
                            <XAxis
                                dataKey="questions"
                            />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            />
                </BarChart>
                    </ResponsiveContainer>}
            </div>
        );
    }
}

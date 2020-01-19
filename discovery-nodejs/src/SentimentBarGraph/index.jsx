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
    BarChart,
} from 'recharts';

export default class SentimentBarGraph extends Component {

    static csvToSentimentData(csv) {
        var data = {};
        const header = csv[0];
        const data = csv.shift();

        data[questions] = data.map(row => row[0]);
        const negativeIndex = header.find(val => val === "negative");
        data[negative] = data.map(row => row[negativeIndex]);
        const posIndex = header.find(val => val === "positive");
        data[positice] = data.map(row => row[posIndex]);

        return data;
    }

    static propTypes = {
        sentimentData: arrayOf(
            shape({
                questions: string.isRequired,
                negative: number.isRequired,
                positive: number.isRequired,
            })
        ).isRequired
    };

    static defaultProps = {
        colorLine: '#6ABA4F',
    };

    render() {
        const { sentimentData } = this.props;
        return (
            <ResponsiveContainer height={250}>
                <BarChart
                    data={sentimentData}
                    margin={{
                        ...ComposedChart.defaultProps.margin,
                        top: 15,
                        right: 15,
                    }}
                >
                    <Bar
                        dataKey="positive"
                        name="Positive sentiment"
                        fill="#6ABA4F'"
                    />

                    <Bar
                        dataKey="negative"
                        name="Negative sentiment"
                        fill="#fc0303'"
                    />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis
                        dataKey="questions"
                    />
                    <YAxis domain={['auto', 'auto']} />
                    <Tooltip />
                    <Legend />
                    />
                </BarChart>
            </ResponsiveContainer>
        );
    }
}

import React, { Component } from 'react';

import exabeamicon from './assets/exabeam.png';
import moment from 'moment';
import { TextInput, Icon, ButtonsGroup } from 'watson-react-components';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import negative from './assets/negative';
import positive from './assets/positive';
import ReactWordCloud from 'react-wordcloud';
import CSVReader from './CSVReader';
import SentimentBarGraph from './SentimentBarGraph';
import RatingChart from './RatingChart';
import ResponseChart from './ResponseChart';
import LinearIndeterminate from './LinearProgress';

export default class Review extends Component {
    classes = makeStyles({
        table: {
            minWidth: 650,
        },
    });

    state = {
        hide: true,
        error: null,
        data: null,
        loading: false,
        dateButtons: [
            {
                value: 'lastweek',
                id: 'rb-1',
                text: 'Last Week',
                startDate: moment().subtract(1, 'w'),
                endDate: moment(),
            },
            {
                value: 'lasttwoweeks',
                id: 'rb-2',
                text: 'Last 2 Weeks',
                startDate: moment().subtract(2, 'w'),
                endDate: moment(),
            },
            {
                value: 'lastmonth',
                id: 'rb-3',
                text: 'Last Month',
                startDate: moment().subtract(30, 'd'),
                endDate: moment(),
            },
            {
                value: 'lasttwomonths',
                id: 'rb-4',
                text: 'Last 2 Months',
                selected: true,
                startDate: moment().subtract(60, 'd'),
                endDate: moment(),
            },
        ]
    };

    handleReviewClick() {
        this.setState({
            hide: false,
            loading: true, data: [
                ["", "Survey Response Name", "Survey Response ID", "CSAT Label Response", "CSAT Positive Feedback Detail", "CSAT Negative Feedback Detail", "Account", "Collector ID", "NPS Detail", "Opportunity", "CS Satisfaction Weight Response", "NPS Label", "Response Status", "Collector Name", "Contact", "CS Negative Feedback Detail", "CS Feedback Detail", "CS Positive Feedback Detail", "CSAT Detail", "NPS Normalized", "NPS Response", "Product Satisfaction Detail", "Product Satisfaction Label Response", "Product Satisfaction Weight Response", "PS Business Needs Label Response", "PS Business Needs Weight Response", "PS Professionalism Label Response", "PS Qualifications Label Response", "PS Professionalism Weight Response", "PS Qualifications Weight Response", "Response Duration", "PS Responsiveness Label Response", "Resource Feedback Detail", "PS Responsiveness Weight Response", "PS Satisfaction Label Response", "PS Satisfaction Weight Response"],
                ["0", "SMR-0000107", "aAI3l000000Xe2C", "Very dissatisfied", "Partner has worked well to support our talks with Exabeam team.", "Quick and satisfactory responses towards problem s… reasonable expectation setting in sales process.", "", "250831383", "Customer support and sales commitments have not be…ve less confidence on the product value received.", "", "1.0", "Detractor", "", "Salesforce Weblink Invitation", "Nishtha Kaura", "", "", "", "Customer service has always been a let down. We re…or almost 2-3 weeks of the ticket remaining open.", "-1", "3", "Product works well but we have less confidence in the models and log sources being ingested.", "Neither satisfied nor dissatisfied", "3.0", "", "", "", "", "", "", "321", "", "", "", "", ""],
                ["1", "SMR-0000045", "aAI3l000000XdxC", "Neither satisfied nor dissatisfied", "Customer support from a Sales perspective has been excellent pre & post sale.", "More knowledgeable TAM support for the Incident Response module.", "", "250831383", "Upgrading is a difficult process. Customizations a…ding. This has caused downtime with each upgrade.", "", "3.0", "Passive", "", "Salesforce Weblink Invitation", "JEFFREY BARR", "", "", "", "Our TAM support has not been at the level we had hoped.", "0", "7", "See previous answers", "Somewhat satisfied", "4.0", "", "", "", "", "", "", "271", "", "", "", "", ""],
                ["2", "SMR-0000040", "aAI3l000000Xdwn", "Somewhat dissatisfied", "Nothing!!", "Customer support should be improved a lot.  I know…cumented and customers should be trained as well.", "", "250831383", "I like the idea and technical aspect of the produc… i would think before recommending this solution.", "", "2.0", "Detractor", "", "Salesforce Weblink Invitation", "Shashidhar Panduga", "", "", "", "I believe some folks in customer service are reall…lability issues with other layers within Exabeam.", "-1", "5", "The product is capable of detecting what other tra…ing which again is dependent on the support team.", "Neither satisfied nor dissatisfied", "3.0", "", "", "", "", "", "", "812", "", "Customer support should be improved a lot.  I know…cumented and customers should be trained as well.", "", "", ""],
            ]
        });
        // this.timer = setTimeout(this.stopLoading.bind(this), 2000);
    }

    stopLoading() {
        this.setState({ loading: false });
    }
    dateButtonChanged() {

    }

    render() {

        return (
            <div>
                <img src={exabeamicon} width="300" height="300" alt="Exabeam" style={{ opacity: 0.7 }} />
                {/* <CSVReader></CSVReader> */}
                {this.state.hide ? (
                    <div className="fill-block-large">
                        <section className="_full-width-row query query_collapsed">
                            <div className="_container _container_large">
                                <div className="query--flex-container">
                                    <div className="query--text-input-container">
                                        <div className="query--search-container">
                                            <button
                                                type="button"
                                                onClick={this.handleReviewClick.bind(this)}
                                                className="query--icon-container"
                                            >
                                                Analyze Reviews &nbsp;&nbsp;
                                        <Icon type="search" size="regular" fill="#ffffff" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className='query--date-buttons-container'>
                                        <ButtonsGroup
                                            type="radio"
                                            name="radio-buttons"
                                            onChange={this.dateButtonChanged}
                                            buttons={this.state.dateButtons}
                                        />
                                    </div>

                                </div>
                            </div>
                        </section>


                    </div>

                ) : (
                        <div className="table_main">
                            <br />
                            <br />
                            <TableContainer component={Paper}>
                                <Table className={this.classes.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            {this.state.data[0].slice(0, 10).map(r =>
                                                <TableCell>{r}</TableCell>
                                            )}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.data.slice(1, 3).map(row => (
                                            <TableRow key={row[0]}>
                                                {row.slice(0, 10).map(r =>
                                                    <TableCell align="left">{r}</TableCell>
                                                )}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>

                            </TableContainer>
                            <br />
                            <br />
                            <br />
                            <div className="chart-box">
                                <ResponseChart />
                                <RatingChart />
                                <SentimentBarGraph />
                            </div>
                            <br />
                            <br />
                            <br />
                            <div className="chart-box">
                                <div style={{ height: 300, width: 800 }}>
                                    <ReactWordCloud words={positive}

                                        options={{
                                            colors: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b'],
                                            enableTooltip: true,
                                            deterministic: false,
                                            fontFamily: 'impact',
                                            fontSizes: [20, 80],
                                            fontStyle: 'normal',
                                            fontWeight: 'normal',
                                            padding: 1,
                                            rotations: 3,
                                            rotationAngles: [0, 90],
                                            scale: 'sqrt',
                                            spiral: 'archimedean',
                                            transitionDuration: 3000,
                                        }}
                                    />
                                </div>

                                <div style={{ height: 300, width: 800 }}>
                                    <ReactWordCloud words={negative}

                                        options={{
                                            colors: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b'],
                                            enableTooltip: true,
                                            deterministic: false,
                                            fontFamily: 'impact',
                                            fontSizes: [20, 80],
                                            fontStyle: 'normal',
                                            fontWeight: 'normal',
                                            padding: 1,
                                            rotations: 3,
                                            rotationAngles: [0, 90],
                                            scale: 'sqrt',
                                            spiral: 'archimedean',
                                            transitionDuration: 3000,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>




            //         <img src={exabeamicon} width="400" height="300" alt="Exabeam" />

            // </div>
        );
    }



}
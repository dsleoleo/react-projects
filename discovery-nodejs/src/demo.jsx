import React, { Component } from 'react';
import { Icon, Alert } from 'watson-react-components';
import { fields } from './fields';
import Query from './Query/index';
import TopEntities from './TopEntities/index';
import TopStories from './TopStories/index';
import AnomalyDetection from './AnomalyDetection/index';
import SentimentAnalysis from './SentimentAnalysis/index';
import MentionsAndSentiments from './MentionsAndSentiments/index';
import NoResults from './NoResults/index';

const hasResults = entities =>
  entities.aggregations &&
  entities.aggregations.length > 0 &&
  entities.aggregations[0].field === fields.title_entity_text;

const parseQueryResults = response => {
  const data = response.result;
  const parsedData = {
    results: data.results, // Top Results
    entities: {}, // Topic cloud
    sentiments: null, // Sentiment by source
    sentiment: null, // Overall sentiment
    mentions: null, // Mentions and Sentiments
    anomalyData: null, // Anomaly data
  };

  data.aggregations.forEach(aggregation => {
    // sentiments by source
    if (aggregation.type === 'term' && aggregation.field === fields.host) {
      parsedData.sentiments = aggregation;
    }
    // Overall sentiment
    if (aggregation.type === 'term' && aggregation.field === fields.text_document_sentiment_type) {
      parsedData.sentiment = aggregation;
    }

    if (aggregation.type === 'term' && aggregation.field === fields.title_concept_text) {
      parsedData.entities.topics = aggregation.results;
    }

    // Mentions and sentiments
    if (
      aggregation.type === 'filter' &&
      'aggregations' in aggregation &&
      aggregation.aggregations[0].field === fields.title_entity_text
    ) {
      parsedData.mentions = aggregation;
    }

    if (aggregation.type === 'nested' && aggregation.path === fields.title_entity) {
      const entities = aggregation.aggregations;
      if (entities && entities.length > 0 && hasResults(entities[0])) {
        if (entities[0].match === `${fields.title_entity_type}:Company`) {
          parsedData.entities.companies = entities[0].aggregations[0].results;
        }
        if (entities[0].match === `${fields.title_entity_type}:Person`) {
          parsedData.entities.people = entities[0].aggregations[0].results;
        }
      }
    }

    if (aggregation.type === 'timeslice' && aggregation.anomaly) {
      parsedData.anomalyData = aggregation.results;
    }
  });

  return parsedData;
};

export default class Demo extends Component {
  state = {
    query: null,
    error: null,
    data: null,
    loading: false,
  };

  handleQueryChange = query => {
    this.setState({
      query: query,
      data : []
    });
    query.text.split(",").map(splittedQuery => {
      const newQuery = Object.assign({}, query);
      newQuery.text = splittedQuery;
      console.log("query=" + JSON.stringify(newQuery));            
      this.fetchNewData(newQuery);  
    })           
  };

  /**
   * Call the query API every time the query change.
   */
  fetchNewData = query => {
    this.setState({      
      loading: true,
      error: null,      
    });
    const host = process.env.REACT_APP_SERVER || '';
    fetch(`${host}/api/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(query),
    }).then(response => {
      if (response.ok) {
        response.json().then(json => {     
          console.log("got result for " + query.text);               
          this.state.data.push(parseQueryResults(json));                              
          this.setState({loading : false});
        });
      } else {
        response
          .json()
          .then(error => {
            this.setState({ error, loading: false });
          })
          .catch(() => {
            this.setState({
              error: {
                error: 'There was a problem with the request, please try again',
              },
              loading: false,
            });
          });
      }
    });
    // scroll to the loading bar
    window.scrollTo(100, 344);
  };

  render() {        
    return (
      <div className="demo-container--div">
        <Query onQueryChange={this.handleQueryChange} query={this.state.query} />
        {this.state.loading && (
          <div className="results">
            <div className="loader--container">
              <Icon type="loader" size="large" />
            </div>
          </div>
        )}
        {this.state.error && (
          <div className="error--container">
            <Alert type="error" color="red">
              <p className="base--p">{this.state.error.error}</p>
            </Alert>
          </div>
        )}
        {!this.state.error &&
        !this.state.loading &&
        this.state.data &&
        this.state.data[0].results.length > 0 ? (
          <div className="all_container">            
            {this.state.data.map(data => 
              <div className="results">                
            <div className="_container _container_large">
            <div className="row">
                <div className="results--panel-3">
                  <SentimentAnalysis
                    query={this.state.query}
                    sentiment={data.sentiment}
                    sentiments={data.sentiments}
                  />
                </div>
              </div>
              <div className="row">
                <AnomalyDetection
                  query={this.state.query}
                  anomalyData={data.anomalyData}
                />
              </div>
              <div className="row">
                <div className="results--panel-4">
                  <MentionsAndSentiments
                    query={this.state.query}
                    mentions={data.mentions}
                  />
                </div>
              </div>
              <div className="row">
                <div className="results--panel-1">
                  <TopStories
                    query={this.state.query}
                    stories={data.results}
                    onShowCode={this.toggleTopResults}
                  />
                </div>
                {/* <div className="results--panel-2">
                  <TopEntities
                    query={this.state.query}
                    entities={data.entities}
                    onShowCode={this.toggleTopEntities}
                  />
                </div> */}
              </div>

            </div>
          </div>
            )}                                        
          </div>
        ) : (
          !this.state.loading && this.state.data && <NoResults query={this.state.query} />
        )}
      </div>
    );
  }
}

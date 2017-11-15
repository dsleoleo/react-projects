import React from 'react';
import { Step, Icon, Container, Message, Segment } from 'semantic-ui-react';
import Tree from './DataGenSortableTree';
import DataGenStep from './DataGenStep';
import DataGenContent from './DataGenContent';
import ConfigForm from './ConfigForm';
import DateSetup from './DateSetup';
import ConfigDisplay from './ConfigDisplay';
import LoggerForm from './LoggerForm';
import Destination from './Destination';
import MessageDef from './MessageDef';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            steps: [
                {
                    active: true, completed: false, icon: 'calendar', title: 'Date Setup',
                    description: 'Pick training and classification date',
                    data: { start_date: null, end_date: null }
                },
                {
                    active: false, completed: false, icon: 'users', title: 'Users Setup',
                    description: 'Setup users, hosts, ips, and domains',
                    data: { num_of_users: null, num_of_ips: null, num_of_hosts: null, user_ip_ratio: null, num_of_special_user: null, num_of_users_per_hour: null, rogue_chance: null }
                },
                {
                    active: false, completed: false, icon: 'info circle', title: 'Loggers Setup',
                    description: 'Setup loggers and queries',
                    data: { log_hosts: null }
                },
                {
                    active: false, completed: false, icon: 'folder open', title: 'Destination Setup',
                    description: 'Output directories and HDFS',
                    data: { base_dir: "/opt/exabeam/data/input", use_hdfs: false, hdfs_host: null, hdfs_port: 9000 }
                },
                {
                    active: false, completed: false, icon: 'cogs', title: 'Messages Setup',
                    description: 'Message definitions',
                    data: { messages: null, hvf_messages: null }
                },
                {
                    active: false, completed: false, icon: 'rocket', title: 'Generate Config File',
                    description: '',
                    data: null
                },
            ],
            currentStep: null
        };
    }

    componentWillMount() {
        this.setState({ currentStep: this.state.steps[0] });
    }

    onSelectStep(data) {
        data.active = true;
        let steps = [];
        this.state.steps.forEach(step => {
            if (step.title != data.title) {
                step.active = false;
            }
        });
        steps = this.state.steps;
        this.setState({ steps: steps, currentStep: data }); //only this will trigger re-render        
    }

    onComplete(content) {
        console.log(JSON.stringify(content));
        let steps = [];
        let current = null;
        this.state.steps.forEach(step => {
            if (step.title == content.title) {
                const allValues = Object.keys(step.data).map(key => step.data[key]);
                if (allValues.every(x => x != null))
                    step.completed = true;

                current = step;
                step.active = true;
            }
            else {
                step.active = false;
            }
        });
        steps = this.state.steps;
        this.setState({ steps: steps, currentStep: current });
    }

    render() {
        let key = 0;
        let ConfigWrapper = null;

        switch (this.state.currentStep.title) {
            case 'Date Setup':
                ConfigWrapper = () => <DateSetup dateData={this.state.currentStep.data} />
                break;
            case 'Users Setup':
                ConfigWrapper = () => <ConfigForm data={this.state.currentStep.data} />
                break;
            case 'Loggers Setup':
                ConfigWrapper = () => <LoggerForm data={this.state.currentStep.data} />
                break;
            case 'Destination Setup':
                ConfigWrapper = () => <Destination data={this.state.currentStep.data} />
                break;
            case 'Messages Setup':
                ConfigWrapper = () => <MessageDef data={this.state.currentStep.data}/>
                break;
            case 'Generate Config File':
                ConfigWrapper = () => <h1>Lets rock4</h1>
                break;
            default:
                console.log('Sorry, we are out of ' + this.state.currentStep.title + '.');
        }


        return (<div>
            <Step.Group attached='top'>
                {this.state.steps.map(step =>
                    <DataGenStep key={++key} step={step} onSelectStep={this.onSelectStep.bind(this)} /> //need to bind this otherwise, when callback is invoked, "this" won't be in scope
                )}
            </Step.Group>
            <DataGenContent step={this.state.currentStep} onComplete={this.onComplete.bind(this)}>
                <ConfigWrapper />
            </DataGenContent>
            <ConfigDisplay data={this.state.currentStep.data} />
        </div>
        );
    }
}


export default App;
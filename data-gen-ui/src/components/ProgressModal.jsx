import React, { Component } from 'react'
import { Progress, Button, Header, Icon, Modal } from 'semantic-ui-react'

export default class ProgressModal extends Component {
    constructor(props) {
        super(props)
        this.state =
            {
                modalOpen: true,
                percent: 0
            }
    }

    componentDidMount() {
        this.startTimer();
    }
    handleOpen() {
        this.setState({ modalOpen: true })
    }

    handleClose() {
        this.setState({ modalOpen: false })
    }

    tick() {
        if (this.state.percent < 100)
            this.setState({ percent: (this.state.percent + 1) })
        else {
            this.stopTimer();
        }
    }
    startTimer() {
        clearInterval(this.timer)
        this.state.loading = true;
        this.timer = setInterval(this.tick.bind(this), 100)
    }
    stopTimer() {
        clearInterval(this.timer)
        this.setState({ loading: false });
    }


    render() {
        return (
            <Modal
                open={this.state.modalOpen}
                onClose={this.handleClose}
                basic
            >
                <Header><Icon.Group size='huge'>
                    <Icon loading size='big' name='sun' />
                    <Icon name='user' />
                </Icon.Group></Header>
                <Modal.Content>
                    <Progress percent={this.state.percent} progress />
                </Modal.Content>
                <Modal.Actions>
                    {this.state.percent >= 100 && <Button color='green' onClick={this.handleClose.bind(this)} inverted>
                        <Icon name='checkmark' /> Ok
          </Button>}
                </Modal.Actions>
            </Modal>
        )
    }
}
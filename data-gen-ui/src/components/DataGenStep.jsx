import React from 'react'
import PropTypes from 'prop-types';
import { Step, Icon } from 'semantic-ui-react'

const DataGenStep = ({step, onSelectStep}) => (    
      <Step active={step.active} disabled = {step.disabled} completed={step.completed} onClick={onSelectStep.bind(null, step)}>
        <Icon name={step.icon}/>  
        <Step.Content>
          <Step.Title>{step.title}</Step.Title>
          <Step.Description>{step.description}</Step.Description>
        </Step.Content>
      </Step>      
  )

  DataGenStep.propTypes = {
    step: PropTypes.object.isRequired,
    onSelectStep: PropTypes.func.isRequired,
};
export default DataGenStep
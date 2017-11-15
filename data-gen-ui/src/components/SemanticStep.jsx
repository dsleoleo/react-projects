import React from 'react'
import { Step, Icon } from 'semantic-ui-react'

const StepExampleStep = () => (
    <Step.Group attached='top'>
      <Step active>
        <Icon name='calendar'/>  
        <Step.Content>
          <Step.Title>Date Setup</Step.Title>
          <Step.Description>Pick training and classification date</Step.Description>
        </Step.Content>
      </Step>
      <Step>
        <Icon name='users'/>  
        <Step.Content>
          <Step.Title>Users Setup</Step.Title>
          <Step.Description>Setup users, hosts, ips, and domains</Step.Description>
        </Step.Content>
      </Step>
      <Step>
        <Icon name='info circle'/>  
        <Step.Content>
          <Step.Title>Loggers Setup</Step.Title>
          <Step.Description>Loggers and queries</Step.Description>
        </Step.Content>
      </Step>      
      <Step>
        <Icon name='folder open'/>  
        <Step.Content>
          <Step.Title>Destination Setup</Step.Title>
          <Step.Description>Output directories and HDFS</Step.Description>
        </Step.Content>
      </Step>
      <Step>
        <Icon name='cogs'/>  
        <Step.Content>
          <Step.Title>Messages Setup</Step.Title>
          <Step.Description>Message definitions</Step.Description>
        </Step.Content>
      </Step>
      <Step>
        <Icon name='rocket'/>
        <Step.Content>
          <Step.Title>Generate Config File</Step.Title>
        </Step.Content>
      </Step>
    </Step.Group>
  )

export default StepExampleStep
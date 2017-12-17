import * as React from 'react';
import { Component } from 'react';
import { Model, OhmPrefixes, FaradPrefixes } from './Model';
import { Form } from './Form';
import { Charts } from './Charts';

export class App extends Component<{},{}> {
    
    render(){
        const model = new Model();
        return (
            <div id="container">
                <Form submit={model.createPoints} />
                <Charts model={model} />
            </div>
        );
    }
}
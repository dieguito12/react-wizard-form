'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

class WizardForm extends React.Component {

    constructor(props) {
        super(props);
        this.nextStep = this.nextStep.bind(this);
        this.previousStep = this.previousStep.bind(this);
        this.navigate = this.navigate.bind(this);
        this.onHeaderClick = this.onHeaderClick.bind(this);

        this.state = {
            step: props.initialStep ? parseInt(props.initialStep) : 0,
            data: '',
            showHeaders: true,
            headers: props.headers,
            elements: props.children,
            submitElementClass: props.submitElementClass,
            nextElementClass: props.nextElementClass,
        }

        let params = {
            nextStep: this.nextStep,
            data: this.state.data,
            previousStep: this.previousStep,
            navigate: this.navigate
        }
        let AllComponents = [];
        this.state.elements.map(function (obj, i) {
            params.key = i;
            AllComponents.push(React.cloneElement(obj, params));
        });
        this.state.elements = AllComponents;
    }

    componentDidMount() {
        if (this.props.initAfterMount) {
            this.props.initAfterMount();
        }
    }

    componentWillMount() {
        if (this.props.initBeforeMount) {
            this.props.initBeforeMount();
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            step: nextProps.initialStep ? parseInt(nextProps.initialStep) : 0,
            elements: nextProps.children,
            submitElementClass: nextProps.submitElementClass,
            nextElementClass: nextProps.nextElementClass,
        });
        let params = {
            nextStep: this.nextStep,
            data: this.state.data,
            previousStep: this.previousStep,
            navigate: this.navigate
        }
        let AllComponents = [];
        this.state.elements.map(function (obj, i) {
            params.key = i;
            AllComponents.push(React.cloneElement(obj, params));
        });
        this.setState({
            elements: AllComponents
        });
    }

    navigate(step, data) {
        if (step => 0 && step < this.state.headers.length && step != this.state.step) {
            this.setState({
                step: step,
                data: data,
            });
        }
    }

    onHeaderClick(e) {
        let forms = this.state.elements;
        for (let i = 0; i < forms.length; i++) {
            if (forms[i].type.name == e.currentTarget.getAttribute('form')) {
                forms[this.state.step].props.navigate(i);
            }
        }
    }

    nextStep(data) {
        if (this.state.elements.length - this.state.step > 1) {
            let params = {
                nextStep: this.nextStep,
                data: data,
                previousStep: this.previousStep,
                navigate: this.navigate
            }
            let newElements = [];
            this.state.elements.map(function (obj, i) {
                params.key = i;
                newElements.push(React.cloneElement(obj, params));
            });
            this.setState({
                step: this.state.step + 1,
                data: data,
                elements: newElements
            });
        }
    }

    previousStep(data) {
        if (this.state.step > 0) {
            let params = {
                nextStep: this.nextStep,
                data: data,
                previousStep: this.previousStep,
                navigate: this.navigate
            }
            let newElements = [];
            this.state.elements.map(function (obj, i) {
                params.key = i;
                newElements.push(React.cloneElement(obj, params));
            });
            this.setState({
                step: this.state.step - 1,
                data: data,
                elements: newElements
            });
        }
    }

    render() {
        const AllHeaders = [];
        let headersParam = {
            onClick: this.onHeaderClick
        }
        if(this.props.headers) {
            this.props.headers.map(function (obj, i) {
                headersParam.key = i;
                AllHeaders.push(React.cloneElement(obj, headersParam));
            });
        }

        return (
            <div>
                <div style={{display: 'inline-flex'}}>
                    {
                        this.state.showHeaders &&
                        AllHeaders
                    }
                </div>
                {this.state.elements[this.state.step]}
            </div>
        );
    }
}

export default WizardForm

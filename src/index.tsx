'use strict';

import * as React from 'react';

import { WizardFormProps, WizardFormState, ClonedWizardElementProps } from '../index';

class WizardForm extends React.Component<WizardFormProps, WizardFormState> {

    state: WizardFormState = {
        step: this.props.initialStep ? this.props.initialStep : 0,
        data: null,
        headers: this.props.headers || [],
        elements: this.props.children
    }

    componentDidMount() {
        if (this.props.initAfterMount) {
            this.props.initAfterMount();
        }

        const params: ClonedWizardElementProps = {
            nextStep: this.nextStep,
            data: this.state.data,
            currentStep: this.state.step,
            previousStep: this.previousStep,
            navigate: this.navigate
        };


        let AllComponents: Array<any> = [];

        this.state.elements.forEach((obj, i) => {
            AllComponents.push(React.cloneElement(obj, { ...params, ...{ key: 'react-wizard-form-step-' + i }, ...obj.props }));
        });

        this.setState({ elements: AllComponents });
    }

    static getDerivedStateFromProps(nextProps: WizardFormProps, prevState: WizardFormState) {
        const params = {
            data: prevState.data,
            currentStep: prevState.step,
        };

        let AllComponents: Array<any> = [];

        prevState.elements.forEach((obj, i) => {
            AllComponents.push(React.cloneElement(obj, { ...params, ...{ key: 'react-wizard-form-step-' + i }, ...nextProps.children[i].props }));
        });

        return { elements: AllComponents };
    }

    componentDidUpdate() {
        if (this.props.initialStep && this.props.initialStep >= 0) {
            this.navigate(this.props.initialStep, this.state.data);
        }
    }

    navigate = (step: number, data?: Record<string, unknown> | null): void => {
        if (step >= 0 && step < this.state.elements.length && step !== this.state.step) {
            let params = {
                nextStep: this.nextStep,
                data: data,
                currentStep: this.state.step + 1,
                previousStep: this.previousStep,
                navigate: this.navigate
            }

            const newElements: Array<React.ReactElement> = [];

            this.state.elements.forEach((obj, i) => {
                newElements.push(React.cloneElement(obj, { ...params, ...{ key: 'react-wizard-form-step-' + i }, ...obj.props }));
            });

            this.setState({
                step: step,
                data: data,
                elements: newElements
            });

            if (this.props.onStepChanged) {
                this.props.onStepChanged(step);
            }
        }
    }

    onHeaderClick = (e: Event): void => {
        let forms = this.state.elements;
        for (let i = 0; i < forms.length; i++) {
            const target = e.currentTarget as HTMLElement;
            if (forms[i].type === target.getAttribute('form')) {
                forms[this.state.step].props.navigate(i);
            }
        }
    }

    nextStep = (data?: Record<string, unknown> | null): void => {
        if (this.state.elements.length - this.state.step > 1) {
            let params = {
                nextStep: this.nextStep,
                data: data,
                currentStep: this.state.step + 1,
                previousStep: this.previousStep,
                navigate: this.navigate,
            }

            const newElements: Array<React.ReactElement> = [];

            this.state.elements.forEach((obj, i) => {
                newElements.push(React.cloneElement(obj, { ...params, ...{ key: 'react-wizard-form-step-' + i }, ...obj.props }));
            });

            if (this.props.onStepChanged) {
                this.props.onStepChanged(this.state.step + 1);
            }
            this.setState({
                step: this.state.step + 1,
                data: data,
                elements: newElements
            });

        }
    }

    previousStep = (data?: Record<string, unknown> | null): void => {
        if (this.state.step > 0) {
            let params = {
                nextStep: this.nextStep,
                data: data,
                currentStep: this.state.step - 1,
                previousStep: this.previousStep,
                navigate: this.navigate,
            }

            const newElements: Array<React.ReactElement> = [];
            this.state.elements.forEach((obj, i) => {
                newElements.push(React.cloneElement(obj, { ...params, ...{ key: 'react-wizard-form-step-' + i }, ...obj.props }));
            });

            this.setState({
                step: this.state.step - 1,
                data: data,
                elements: newElements
            });
            if (this.props.onStepChanged) {
                this.props.onStepChanged(this.state.step - 1);
            }
        }
    }

    render() {
        const AllHeaders: Array<React.ReactElement> = [];

        const headersParam = {
            onClick: this.onHeaderClick
        }

        if (this.props.headers) {
            this.props.headers.forEach((obj, i) => {
                AllHeaders.push(React.cloneElement(obj, { ...headersParam, ...{ key: 'react-wizard-form-header-' + i }, ...obj.props }));
            });
        }
        return (
            <div>
                {AllHeaders.length != 0 &&
                    <ul className={this.props.headerClass} style={{ display: 'inline-flex' }}>
                        {
                            AllHeaders
                        }
                    </ul>
                }
                {this.state.elements[this.state.step]}
            </div>
        );
    }
}

export default WizardForm

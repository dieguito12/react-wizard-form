'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class WizardForm extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            step: this.props.initialStep ? this.props.initialStep : 0,
            data: null,
            headers: this.props.headers || [],
            elements: this.props.children
        };
        this.navigate = (step, data) => {
            if (step <= 0 && this.state.headers !== undefined && step < this.state.headers.length && step != this.state.step) {
                this.setState({
                    step: step,
                    data: data
                });
                if (this.props.onStepChanged) {
                    this.props.onStepChanged(step);
                }
            }
        };
        this.onHeaderClick = (e) => {
            let forms = this.state.elements;
            for (let i = 0; i < forms.length; i++) {
                const target = e.currentTarget;
                if (forms[i].type === target.getAttribute('form')) {
                    forms[this.state.step].props.navigate(i);
                }
            }
        };
        this.nextStep = (data) => {
            if (this.state.elements.length - this.state.step > 1) {
                let params = {
                    nextStep: this.nextStep,
                    data: data,
                    currentStep: this.state.step + 1,
                    previousStep: this.previousStep,
                    navigate: this.navigate,
                };
                const newElements = [];
                this.state.elements.forEach((obj, i) => {
                    newElements.push(React.cloneElement(obj, Object.assign(Object.assign({}, params), { key: 'react-wizard-form-step-' + i })));
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
        };
        this.previousStep = (data) => {
            if (this.state.step > 0) {
                let params = {
                    nextStep: this.nextStep,
                    data: data,
                    currentStep: this.state.step - 1,
                    previousStep: this.previousStep,
                    navigate: this.navigate,
                };
                const newElements = [];
                this.state.elements.forEach((obj, i) => {
                    newElements.push(React.cloneElement(obj, Object.assign(Object.assign({}, params), { key: 'react-wizard-form-step-' + i })));
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
        };
    }
    componentDidMount() {
        if (this.props.initAfterMount) {
            this.props.initAfterMount();
        }
        const params = {
            nextStep: this.nextStep,
            data: this.state.data,
            currentStep: this.state.step,
            previousStep: this.previousStep,
            navigate: this.navigate
        };
        let AllComponents = [];
        this.state.elements.forEach((obj, i) => {
            AllComponents.push(React.cloneElement(obj, Object.assign(Object.assign({}, params), { key: 'react-wizard-form-step-' + i })));
        });
        this.setState({ elements: AllComponents });
    }
    componentDidUpdate() {
        if (this.props.initialStep && this.props.initialStep >= 0) {
            this.navigate(this.props.initialStep, this.state.data);
        }
        const params = {
            nextStep: this.nextStep,
            data: this.state.data,
            currentStep: this.state.step,
            previousStep: this.previousStep,
            navigate: this.navigate
        };
        let AllComponents = [];
        this.state.elements.forEach((obj, i) => {
            AllComponents.push(React.cloneElement(obj, Object.assign(Object.assign({}, params), { key: 'react-wizard-form-step-' + i })));
        });
        this.setState({ elements: AllComponents });
    }
    render() {
        const AllHeaders = [];
        const headersParam = {
            onClick: this.onHeaderClick
        };
        if (this.props.headers) {
            this.props.headers.forEach((obj, i) => {
                AllHeaders.push(React.cloneElement(obj, Object.assign(Object.assign({}, headersParam), { key: 'react-wizard-form-header-' + i })));
            });
        }
        return (React.createElement("div", null,
            AllHeaders.length != 0 &&
                React.createElement("ul", { className: this.props.headerClass, style: { display: 'inline-flex' } }, AllHeaders),
            this.state.elements[this.state.step]));
    }
}
exports.default = WizardForm;
//# sourceMappingURL=index.js.map
# react-wizard-form
Simple react wizard for any html view, form or react component

## Getting Started

These instructions will install the component on your react project.

### Prerequisites

What things you need to install the component:

```
npm
```

### Installing


To install the react-wizard-form just do:

```
npm install react-wizard-form
```

To save it into your package.json

```
npm install --save react-wizard-form
```

## Examples

This examples will guide you on how to use this component

### Basic Usage

This example is without the navigation header

##### Your Wizard 

Add your views, forms or components as children of the WizardForm in the same order you want them to navigate:

```
// your-form.js

import React from 'react';
import ReactDOM from 'react-dom';
import WizardForm from 'react-wizard-form';
import StepOneForm from './step-one.js';
import StepTwoForm from './step-two.js';

class YourForm extends React.Component {

    render() {
        return (
            <WizardForm>
                <StepOneForm />
                <StepTwoForm />
            </WizardForm>
        )
    }
}

const yourFormContainer = document.getElementById('your-form-container');
ReactDOM.render(
    <YourForm />,
    yourFormContainer
);

export default YourForm;

```

##### Each Form

To go to the each form, view or component they have to call

```
this.props.nextStep(data);
```

To go to te previous form call:


```
this.props.previousStep(data);
```

Where **data** is an object of any data you want to pass from one form to another.

```
// step-one.js

import React from 'react';
import ReactDOM from 'react-dom';

class StepOneForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            data: this.props.data ? this.props.data : {}
        }
    }

    handleOnNextButtonClicked() {
        let data = {}
        data.name = this.refs.name;

        // Anything else you want to pass add it to data

        this.props.nextStep(data);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleOnNextButtonClicked}>
                    <label>
                        Name:
                        <input 
                            type="text" 
                            ref="name"
                            value={this.state.name} 
                            onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default StepOneForm;

```

```
// step-two.js

import React from 'react';
import ReactDOM from 'react-dom';

class StepTwoForm extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOnPreviousStep = this.handleOnPreviousStep.bind(this);

        // The data from the previous step comes in this.props.data

        this.state = {
            data: this.props.data,
        }
    }

    handleSubmit() {
        
        // Anything here
    }

    handleOnPreviousStep() {
        let data = this.state.data;

        this.props.previousStep(data);
    }

    render() {
        return (
            <div>
                The name from the previous step is {this.state.data.name}
                <button
                    type="button"
                    onClick={this.handleSubmit}
                    className="btn btn-link">Send</button>
                <button
                    type="button"
                    onClick={this.handleOnPreviousStep}
                    className="btn btn-default float-right">Back</button>
            </div>
        );
    }
}

export default StepTwoForm;

```

### Advance Usage

This example is with the navigation header.

With the header you can navigate to any step using a custom header navigator made by you.

##### Your Wizard 

Add your views, forms or components as children of the WizardForm in the same order you want them to navigate
as same as the array of headers.

Each view of the headers needs to have a **form** property with is to specify (with a string) the name of the corresponded view.

When the header view is clicked the corresponded form will be rendered if this form has the **data** prop of its data with something,
it will pass it to.

```
// your-form.js

import React from 'react';
import ReactDOM from 'react-dom';
import WizardForm from 'react-wizard-form';
import StepOneForm from './step-one.js';
import StepTwoForm from './step-two.js';

class YourForm extends React.Component {

    render() {
        return (
            <WizardForm
                headers={[
                    <div
                        form={"StepOneForm"}>
                        Go to step one
                    </div,
                    <div
                        form={"StepTwoForm"}>
                        Go to step two
                    </div>,
                    <div
                        form={"StepThreeForm"}>
                        Go to step three
                    </div>
                ]}>
                <StepOneForm />
                <StepTwoForm />
                <StepThreeForm />
            </WizardForm>
        )
    }
}

const yourFormContainer = document.getElementById('your-form-container');
ReactDOM.render(
    <YourForm />,
    yourFormContainer
);

export default YourForm;

```

## Props

| Prop | Description | Type |
| --- | --- | --- |
| `initialStep` (optional) | The step which the wizard will be (0 is the first one) | Number |
| `headers` (optional) | Array of JSX components corresponding to the header of each form of the wizard | Array |
| `children` (required) | JSX or Array of JSX components of each form of the wizard | JSX or Array |
| `onStepChanged` (optional) | Callback that is executed when a step is changed | Func |
| `initAfterMount` (optional) | Callback that is executed after the wizard is mounted | Func |
| `initBeforeMount` (optional) | Callback that is executed before the wizard is mounted | Func |
| `headerClass` (optional) | CSS class of the <ul> component of the header | String |

## Compatible With

* [ES2015](https://babeljs.io/learn-es2015/)
* [ES2016](https://babeljs.io/docs/plugins/preset-es2016/)

## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue,
email, or any other method with the owners of this repository before making a change. 

Please note we have a code of conduct, please follow it in all your interactions with the project.

### Pull Request Process

1. Ensure any install or build dependencies are removed before the end of the layer when doing a 
   build.
2. Update the README.md with details of changes to the interface, this includes new environment 
   variables, exposed ports, useful file locations and container parameters.
3. Increase the version numbers in any examples files and the README.md to the new version that this
   Pull Request would represent. The versioning scheme we use is [SemVer](http://semver.org/).
4. You may merge the Pull Request in once you have the sign-off of two other developers, or if you 
   do not have permission to do that, you may request the second reviewer to merge it for you.

## Author

* **Diego Rafael Mena Hernandez** - *Initial work* - [dieguito12](https://github.com/dieguito12)

## License

ISC

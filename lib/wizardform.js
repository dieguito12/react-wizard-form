'use strict';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var WizardForm = (function (_super) {
    __extends(WizardForm, _super);
    function WizardForm() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            step: _this.props.initialStep ? _this.props.initialStep : 0,
            data: null,
            headers: _this.props.headers || [],
            elements: _this.props.children
        };
        _this.navigate = function (step, data) {
            if (step <= 0 && _this.state.headers !== undefined && step < _this.state.headers.length && step != _this.state.step) {
                _this.setState({
                    step: step,
                    data: data
                });
                if (_this.props.onStepChanged) {
                    _this.props.onStepChanged(step);
                }
            }
        };
        _this.onHeaderClick = function (e) {
            var forms = _this.state.elements;
            for (var i = 0; i < forms.length; i++) {
                var target = e.currentTarget;
                if (forms[i].type === target.getAttribute('form')) {
                    forms[_this.state.step].props.navigate(i);
                }
            }
        };
        _this.nextStep = function (data) {
            if (_this.state.elements.length - _this.state.step > 1) {
                var params_1 = {
                    nextStep: _this.nextStep,
                    data: data,
                    currentStep: _this.state.step + 1,
                    previousStep: _this.previousStep,
                    navigate: _this.navigate,
                };
                var newElements_1 = [];
                _this.state.elements.forEach(function (obj, i) {
                    newElements_1.push(React.cloneElement(obj, __assign(__assign({}, params_1), { key: 'react-wizard-form-step-' + i })));
                });
                if (_this.props.onStepChanged) {
                    _this.props.onStepChanged(_this.state.step + 1);
                }
                _this.setState({
                    step: _this.state.step + 1,
                    data: data,
                    elements: newElements_1
                });
            }
        };
        _this.previousStep = function (data) {
            if (_this.state.step > 0) {
                var params_2 = {
                    nextStep: _this.nextStep,
                    data: data,
                    currentStep: _this.state.step - 1,
                    previousStep: _this.previousStep,
                    navigate: _this.navigate,
                };
                var newElements_2 = [];
                _this.state.elements.forEach(function (obj, i) {
                    newElements_2.push(React.cloneElement(obj, __assign(__assign({}, params_2), { key: 'react-wizard-form-step-' + i })));
                });
                _this.setState({
                    step: _this.state.step - 1,
                    data: data,
                    elements: newElements_2
                });
                if (_this.props.onStepChanged) {
                    _this.props.onStepChanged(_this.state.step - 1);
                }
            }
        };
        return _this;
    }
    WizardForm.prototype.componentDidMount = function () {
        if (this.props.initAfterMount) {
            this.props.initAfterMount();
        }
        var params = {
            nextStep: this.nextStep,
            data: this.state.data,
            currentStep: this.state.step,
            previousStep: this.previousStep,
            navigate: this.navigate
        };
        var AllComponents = [];
        this.state.elements.forEach(function (obj, i) {
            AllComponents.push(React.cloneElement(obj, __assign(__assign({}, params), { key: 'react-wizard-form-step-' + i })));
        });
        this.setState({ elements: AllComponents });
    };
    WizardForm.prototype.componentDidUpdate = function () {
        if (this.props.initialStep && this.props.initialStep >= 0) {
            this.navigate(this.props.initialStep, this.state.data);
        }
        var params = {
            nextStep: this.nextStep,
            data: this.state.data,
            currentStep: this.state.step,
            previousStep: this.previousStep,
            navigate: this.navigate
        };
        var AllComponents = [];
        this.state.elements.forEach(function (obj, i) {
            AllComponents.push(React.cloneElement(obj, __assign(__assign({}, params), { key: 'react-wizard-form-step-' + i })));
        });
        this.setState({ elements: AllComponents });
    };
    WizardForm.prototype.render = function () {
        var AllHeaders = [];
        var headersParam = {
            onClick: this.onHeaderClick
        };
        if (this.props.headers) {
            this.props.headers.forEach(function (obj, i) {
                AllHeaders.push(React.cloneElement(obj, __assign(__assign({}, headersParam), { key: 'react-wizard-form-header-' + i })));
            });
        }
        return (React.createElement("div", null,
            AllHeaders.length != 0 &&
                React.createElement("ul", { className: this.props.headerClass, style: { display: 'inline-flex' } }, AllHeaders),
            this.state.elements[this.state.step]));
    };
    return WizardForm;
}(React.Component));
exports.default = WizardForm;
//# sourceMappingURL=wizardform.js.map
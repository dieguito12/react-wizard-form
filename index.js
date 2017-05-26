'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WizardForm = function (_React$Component) {
    _inherits(WizardForm, _React$Component);

    function WizardForm(props) {
        _classCallCheck(this, WizardForm);

        var _this = _possibleConstructorReturn(this, (WizardForm.__proto__ || Object.getPrototypeOf(WizardForm)).call(this, props));

        _this.nextStep = _this.nextStep.bind(_this);
        _this.previousStep = _this.previousStep.bind(_this);
        _this.navigate = _this.navigate.bind(_this);
        _this.onHeaderClick = _this.onHeaderClick.bind(_this);

        _this.state = {
            step: props.initialStep ? parseInt(props.initialStep) : 0,
            data: "",
            headers: props.headers,
            elements: props.children,
            submitElementClass: props.submitElementClass,
            nextElementClass: props.nextElementClass
        };

        var params = {
            nextStep: _this.nextStep,
            data: _this.state.data,
            currentStep: _this.state.step,
            previousStep: _this.previousStep,
            navigate: _this.navigate
        };
        var AllComponents = [];
        _this.state.elements.map(function (obj, i) {
            params.key = i;
            AllComponents.push(_react2.default.cloneElement(obj, params));
        });
        _this.state.elements = AllComponents;
        return _this;
    }

    _createClass(WizardForm, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.props.initAfterMount) {
                this.props.initAfterMount();
            }
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            if (this.props.initBeforeMount) {
                this.props.initBeforeMount();
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.initialStep) {
                if (nextProps.inOrder) {
                    if (this.state.step > nextProps.initialStep) {
                        this.navigate(nextProps.initialStep, this.state.data);
                    }
                }
            }
            var params = {
                nextStep: this.nextStep,
                data: this.state.data,
                currentStep: this.state.step,
                previousStep: this.previousStep,
                navigate: this.navigate
            };
            var AllComponents = [];
            nextProps.children.map(function (obj, i) {
                params.key = i;
                AllComponents.push(_react2.default.cloneElement(obj, params));
            });
            this.setState({
                elements: AllComponents,
                submitElementClass: nextProps.submitElementClass,
                nextElementClass: nextProps.nextElementClass
            });
        }
    }, {
        key: 'navigate',
        value: function navigate(step, data) {
            var _this2 = this;

            if (function (step) {
                return 0 && step < _this2.state.headers.length && step != _this2.state.step;
            }) {
                this.setState({
                    step: step,
                    data: data
                });
                if (this.props.onStepChanged) {
                    this.props.onStepChanged(step);
                }
            }
        }
    }, {
        key: 'onHeaderClick',
        value: function onHeaderClick(e) {
            var forms = this.state.elements;
            for (var i = 0; i < forms.length; i++) {
                if (forms[i].type.name == e.currentTarget.getAttribute('form')) {
                    forms[this.state.step].props.navigate(i);
                }
            }
        }
    }, {
        key: 'nextStep',
        value: function nextStep(data) {
            if (this.state.elements.length - this.state.step > 1) {
                var params = {
                    nextStep: this.nextStep,
                    data: data,
                    currentStep: this.state.step + 1,
                    previousStep: this.previousStep,
                    navigate: this.navigate
                };

                var newElements = [];
                this.state.elements.map(function (obj, i) {
                    params.key = i;
                    newElements.push(_react2.default.cloneElement(obj, params));
                });

                this.setState({
                    step: this.state.step + 1,
                    data: data,
                    elements: newElements
                });
                if (this.props.onStepChanged) {
                    this.props.onStepChanged(this.state.step + 1);
                }
            }
        }
    }, {
        key: 'previousStep',
        value: function previousStep(data) {
            if (this.state.step > 0) {
                var params = {
                    nextStep: this.nextStep,
                    data: data,
                    currentStep: this.state.step - 1,
                    previousStep: this.previousStep,
                    navigate: this.navigate
                };

                var newElements = [];
                this.state.elements.map(function (obj, i) {
                    params.key = i;
                    newElements.push(_react2.default.cloneElement(obj, params));
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
    }, {
        key: 'render',
        value: function render() {
            var AllHeaders = [];
            var headersParam = {
                onClick: this.onHeaderClick
            };
            if (this.props.headers) {
                this.props.headers.map(function (obj, i) {
                    headersParam.key = i;
                    AllHeaders.push(_react2.default.cloneElement(obj, headersParam));
                });
            }
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'ul',
                    { className: this.props.headerClass, style: { display: 'inline-flex' } },
                    AllHeaders
                ),
                this.state.elements[this.state.step]
            );
        }
    }]);

    return WizardForm;
}(_react2.default.Component);

exports.default = WizardForm;

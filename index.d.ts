
import * as React from 'react';

export interface WizardFormProps {
    initialStep?: number | 0,

    headers?: Array<React.ReactElement> | [],

    children: Array<React.ReactElement>,

    initAfterMount?: () => void,

    onStepChanged?: (step: number) => void,

    headerClass?: string
}

export interface WizardFormState {
    step: number,

    data?: Record<string, unknown> | null,

    headers?: Array<React.ReactElement> | [],

    elements: Array<React.ReactElement>
}

export type ClonedWizardElementProps = {
    nextStep: (data: Record<string, unknown> | undefined) => void,

    previousStep: (data: Record<string, unknown> | undefined) => void,

    navigate: (step: number, data: Record<string, unknown> | null) => void,

    data?: Record<string, unknown> | null,

    currentStep: number
}

declare class WizardForm extends React.Component<WizardFormProps, WizardFormState> {
    nextStep: (data: Record<string, unknown> | undefined) => void

    previousStep: (data: Record<string, unknown> | undefined) => void

    navigate: (step: number, data: Record<string, unknown> | undefined) => void

    data: Record<string, unknown> | null

    currentStep: number
}

declare module 'react-wizard-form' {
}

export default WizardForm;
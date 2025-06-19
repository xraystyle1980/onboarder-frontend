export interface LaunchContext {
  timing: string;
  signupStrategy: string;
  frictionReduction: string;
  valueReinforcement: string;
}

export interface ProductInfo {
  productName: string;
  targetAudience: string;
  productType: string;
  coreUserGoal: string;
  onboardingGoal: {
    education: string;
    featureSetup: string;
    activation: string;
  };
  keyFeatures: string[];
  launchContext: LaunchContext;
}

export interface PatternInfo {
  pattern: string;
  rationale: string;
}

export type UxPattern =
  | 'Setup Wizard'
  | 'Feature Tour'
  | 'Progressive Personalization'
  | 'Just-in-Time Tooltip'
  | 'Empty State Coaching';

export type LayoutType =
  | 'full_screen'
  | 'modal_form'
  | 'tooltip_overlay'
  | 'split_screen'
  | 'swipeable_cards';

export type ModalType = 
  | 'welcome'      // Introduction modal
  | 'form'         // Input collection modal
  | 'confirmation' // Confirmation/success modal
  | 'summary';     // Review/summary modal

export type InputFieldType =
  | 'text'
  | 'email'
  | 'number'
  | 'select'
  | 'multiselect'
  | 'checkbox'
  | 'radio'
  | 'textarea'
  | 'date';

export interface InputField {
  type: InputFieldType;
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];  // For select/multiselect/radio
  validation?: string; // Validation rules
}

export interface OnboardingStep {
  id: string;
  stepName: string;
  uxGoal: string;
  userAction: string;
  uxPattern: UxPattern;
  patternPurpose: string;
  layoutType: LayoutType;
  layoutPurpose: string;
  rationale: string;
  headline?: string;
  subtext?: string;
  marketingCopy?: string;
  cta?: string;
  ctaType?: string;
  modalType?: ModalType;        // Type of modal if layoutType is 'modal_form'
  inputFields?: InputField[];   // Required input fields for form modals
}

export interface IntegrationOverview {
  narrative: string | string[];
  implementationNotes: string;
}

export interface CopyGuidelines {
  tone: string;
  voice: string;
  keyPhrases: string[];
}

export interface OnboardingFlow {
  productInfo: ProductInfo;
  pattern: PatternInfo;
  steps: OnboardingStep[];
  integrationOverview: IntegrationOverview;
  copy: CopyGuidelines;
  generatedAt: string;
} 
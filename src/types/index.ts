
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
  onboardingGoal: OnboardingGoal;
  keyFeatures: string[];
  launchContext: LaunchContext;
  flowType: string;
}

export interface PatternInfo {
  pattern: string;
  rationale: string;
  citation?: string;
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

export type ModalType = 'welcome' | 'form' | 'confirmation' | 'summary';

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
  label: string;
  type: string;
  required?: boolean;
  placeholder?: string;
  options?: string[];
  validation?: any;
}

export interface OnboardingStep {
  id: string;
  stepName: string;
  uxGoal: string;
  userAction: string;
  uxPattern: string;
  patternPurpose: string;
  layoutType: LayoutType;
  layoutPurpose: string;
  rationale: string;
  headline: string;
  subtitle: string;
  marketingCopy?: string;
  cta: string;
  ctaType: string;
  modalType?: ModalType;
  inputFields?: InputField[];
  featureCallouts?: FeatureCallouts;
  flowEnd?: boolean;
}

export interface IntegrationOverview {
  narrative: string;
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
  featureCallouts: FeatureCallouts;
  integrationOverview: IntegrationOverview;
  copy: CopyGuidelines;
  generatedAt: string;
}

export interface OnboardingGoal {
  education: string;
  featureSetup: string;
  activation: string;
}

export interface FeatureCallout {
  title: string;
  description: string;
}

export interface FeatureCallouts {
  features: FeatureCallout[];
}

export interface AppState {
  onboardingFlow: OnboardingFlow | null;
  isLoading: boolean;
  error: string | null;
  currentStepIndex: number;
  user: any;
  showSampleData: boolean;
} 
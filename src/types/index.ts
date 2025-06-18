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
  flowType: string;
}

export interface PatternInfo {
  pattern: string;
  rationale: string;
}

export interface OnboardingStep {
  id: string;
  stepName: string;
  uxGoal: string;
  userAction: string;
  layout: string;
  rationale: string;
  pattern: string;
  patternRationale: string;
  headline?: string;
  subtext?: string;
  cta?: string;
  ctaType?: string;
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
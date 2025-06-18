import React from "react";
import { Card, Chip, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { OnboardingFlow } from "../../types";
import { SummaryCard } from '../cards/SummaryCard';

interface OnboardingSummaryTabProps {
  flow: OnboardingFlow;
  onDownload: (format: 'markdown' | 'html' | 'json') => void;
}

export function OnboardingSummaryTab({ flow, onDownload }: OnboardingSummaryTabProps) {
  return (
    <section>
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-semibold mb-8">
          <span className="bg-gradient-text-2">
            Onboarding Summary
          </span>
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        <SummaryCard
          icon="lucide:package"
          iconColor="text-blue-500"
          label="Product Name"
        >
          {flow.productInfo.productName}
        </SummaryCard>

        <SummaryCard
          icon="lucide:users-round"
          iconColor="text-green-500"
          label="Target Audience"
        >
          {flow.productInfo.targetAudience}
        </SummaryCard>

        <SummaryCard
          icon="lucide:target"
          iconColor="text-orange-500"
          label="Core User Goal"
        >
          {flow.productInfo.coreUserGoal}
        </SummaryCard>

        <SummaryCard
          icon="lucide:layers"
          iconColor="text-purple-500"
          label="Product Type"
        >
          {flow.productInfo.productType}
        </SummaryCard>

        <SummaryCard
          icon="lucide:git-pull-request"
          iconColor="text-indigo-500"
          label="Flow Type"
        >
          {flow.productInfo.flowType}
        </SummaryCard>

        <SummaryCard
          icon="lucide:key"
          iconColor="text-pink-500"
          label="Key Features"
        >
          <div className="flex flex-wrap items-center gap-3">
            {flow.productInfo.keyFeatures.map((feature, index) => (
              <Chip
                key={index}
                variant="flat"
                color="primary"
                className="summary-feature-chip max-w-[200px]"
              >
                <span className="truncate">{feature}</span>
              </Chip>
            ))}
          </div>
        </SummaryCard>

        <SummaryCard
          icon="lucide:rocket"
          iconColor="text-yellow-500"
          label="Onboarding Goals"
          className="col-span-full"
        >
          <div className="flex flex-col md:flex-row items-center gap-2">
            <SummaryCard
              icon="lucide:zap"
              iconColor="text-purple-500"
              label="Education"
              className="border-none shadow-none"
            >
              {flow.productInfo.onboardingGoal.education}
            </SummaryCard>
            <SummaryCard
              icon="lucide:zap"
              iconColor="text-purple-500"
              label="Feature Setup"
              className="border-none shadow-none"
            >
              {flow.productInfo.onboardingGoal.featureSetup}
            </SummaryCard>
            <SummaryCard
              icon="lucide:zap"
              iconColor="text-purple-500"
              label="Activation"
              className="border-none shadow-none"
            >
              {flow.productInfo.onboardingGoal.activation}
            </SummaryCard>
          </div>
        </SummaryCard>
      </div>

    </section>
  );
}
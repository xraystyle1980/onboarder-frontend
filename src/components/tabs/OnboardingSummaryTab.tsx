import React from "react";
import { Accordion, AccordionItem } from "@heroui/react";
import { Icon } from "@iconify/react";
import { OnboardingFlow } from "../../types";
import { SummarySectionCard } from "../shared/SummarySectionCard";
import { accordionItemClassNames } from "../shared/accordionTheme";
import { IconBox } from "../shared/IconBox";
import { Pill } from "../shared/Pill";

interface OnboardingSummaryTabProps {
  flow: OnboardingFlow;
  onDownload: (format: 'markdown' | 'html' | 'json') => void;
}

export function OnboardingSummaryTab({ flow }: OnboardingSummaryTabProps) {
  return (
    <section className="pt-4">
      <h3 className="text-3xl text-foreground mb-8">Onboarding Summary</h3>
      {/* Top row: Product Name & Core User Goal in a single card */}
      
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        
        <SummarySectionCard
          icon={<Icon icon="lucide:package" className="text-primary-400" width={32} height={32} />}
          title={flow.productInfo.productName}
          className="col-span-1 lg:col-span-2 mb-6"
        >



          <div className="flex flex-col lg:flex-row gap-8">
            {/* Product Info (left) */}
            <div className="flex flex-row items-center gap-4 flex-1 pb-6 lg:pb-0 lg:pr-8">
              <div>
                <Pill className="capitalize">
                    <span className="text-lg">{flow.productInfo.productType}</span>
                </Pill>
              </div>
            </div>
            {/* Core User Goal (right) */}
            <div className="flex flex-row border border-border shadow-3xl items-center gap-4 flex-1 rounded-xl bg-card p-6">
              <IconBox
                icon={<Icon icon="lucide:target" width={24} height={24} className="text-sky-500" />}
                size={48}
              />
              <div>
                <div className="text-foreground text-lg">Core User Goal</div>
                <div className="text-muted-foreground text-base">{flow.productInfo.coreUserGoal}</div>
              </div>
            </div>
          </div>
        </SummarySectionCard>
      </div>
      {/* Second row: Target Audience & Onboarding Pattern */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <SummarySectionCard
          icon={<Icon icon="lucide:users-round" className="text-secondary-500" width={24} height={24} />}
          title="Target Audience"
        >
          <div className="text-muted-foreground text-base">{flow.productInfo.targetAudience}</div>
        </SummarySectionCard>
        <SummarySectionCard
          icon={<Icon icon="lucide:git-pull-request" className="text-primary-700" width={24} height={24} />}
          title="Onboarding Pattern"
        >
          <div className="text-muted-foreground text-base">{flow.pattern.pattern}</div>
        </SummarySectionCard>
      </div>
      {/* Third row: Key Features & Onboarding Goals (Accordion) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">


        
        {/* Key Features */}
        <SummarySectionCard
          icon={<Icon icon="lucide:key" className="text-primary-500" width={22} height={22} />}
          title="Key Features"
        >
          <ul className="space-y-3 text-lg text-muted-foreground">
            {flow.productInfo.keyFeatures.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-2 text-foreground text-base first:mt-2">
                <Icon icon="lucide:check-circle" className="text-primary-400 mr-1" width={18} height={18} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </SummarySectionCard>



        {/* Onboarding Goals Accordion */}
        <SummarySectionCard
          icon={<Icon icon="lucide:rocket" className="text-primary-700" width={22} height={22} />}
          title="Onboarding Goals"
        >
          <Accordion variant="light" showDivider={true} className="w-full">
            <AccordionItem 
              key="education" 
              title={<span className="flex items-center gap-2"><Icon icon="lucide:zap" className="text-yellow-400" width={18} height={18} />Education</span>}
              classNames={accordionItemClassNames}
            >
              {flow.productInfo.onboardingGoal.education}
            </AccordionItem>
            <AccordionItem 
              key="featureSetup" 
              title={<span className="flex items-center gap-2"><Icon icon="lucide:zap" className="text-yellow-400" width={18} height={18} />Feature Setup</span>}
              classNames={accordionItemClassNames}
            >
              {flow.productInfo.onboardingGoal.featureSetup}
            </AccordionItem>
            <AccordionItem 
              key="activation" 
              title={<span className="flex items-center gap-2"><Icon icon="lucide:zap" className="text-yellow-400" width={18} height={18} />Activation</span>}
              classNames={accordionItemClassNames}
            >
              {flow.productInfo.onboardingGoal.activation}
            </AccordionItem>
          </Accordion>
        </SummarySectionCard>
      </div>
    </section>
  );
}
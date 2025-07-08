import React from 'react';
import { Card, Accordion, AccordionItem } from "@heroui/react";
import { Icon } from "@iconify/react";
import { OnboardingFlow } from '../../types';
import { SummarySectionCard } from '../shared/SummarySectionCard';
import { accordionItemClassNames } from '../shared/accordionTheme';

interface UXNarrativeTabProps {
  flow: OnboardingFlow;
}

export const UXNarrativeTab: React.FC<UXNarrativeTabProps> = ({ flow }) => {
  return (
    <section className="pt-4">
      <h3 className="text-3xl mb-8 text-foreground">UX Narrative</h3>
      



      
      <SummarySectionCard 
        className="p-0"
      >
        
        
        
        <Accordion defaultExpandedKeys={["integration"]} showDivider={true} className="w-full">
          {/* Integration Narrative */}
          <AccordionItem
            key="integration"
            title={<span className="flex items-center gap-2"><Icon icon="lucide:layers" className="text-primary-500" width={22} height={22} /><span className="font-medium text-lg">Integration Narrative</span></span>}
            classNames={accordionItemClassNames}
          >
            {Array.isArray(flow.integrationOverview.narrative)
              ? flow.integrationOverview.narrative.map((paragraph, index) => (
                  <p key={index} className="mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))
              : typeof flow.integrationOverview.narrative === 'string'
                ? flow.integrationOverview.narrative.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 last:mb-0">
                      {paragraph}
                    </p>
                  ))
                : <p>{String(flow.integrationOverview.narrative)}</p>
            }
          </AccordionItem>
          {/* Implementation Details */}
          <AccordionItem
            key="implementation"
            title={<span className="flex items-center gap-2"><Icon icon="lucide:settings" className="text-primary-500" width={22} height={22} /><span className="font-medium text-lg">Implementation</span></span>}
            classNames={accordionItemClassNames}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <SummarySectionCard
                icon={<Icon icon="lucide:calendar-check" className="text-primary-500" width={22} height={22} />}
                title="Notes"
                className="bg-card rounded-xl p-6"
              >
                <div className="text-muted-foreground text-base">
                  {flow.integrationOverview.implementationNotes}
                </div>
              </SummarySectionCard>
              <SummarySectionCard
                icon={<Icon icon="lucide:volume-2" className="text-primary-500" width={22} height={22} />}
                title="Tone"
                className="bg-card rounded-xl p-6"
              >
                <div className="text-muted-foreground text-base">
                  {flow.copy.tone}
                </div>
              </SummarySectionCard>
              <SummarySectionCard
                icon={<Icon icon="lucide:mic" className="text-primary-500" width={22} height={22} />}
                title="Voice"
                className="bg-card rounded-xl p-6"
              >
                <div className="text-muted-foreground text-base">
                  {flow.copy.voice}
                </div>
              </SummarySectionCard>
            </div>
          </AccordionItem>




          {/* Key Phrases */}
          <AccordionItem
            key="keyphrases"
            title={<span className="flex items-center gap-2"><Icon icon="lucide:key" className="text-primary-500" width={22} height={22} /><span className="font-medium text-lg">Key Phrases</span></span>}
            classNames={accordionItemClassNames}
          >
            <ul className="space-y-3 text-lg text-muted-foreground">
              {flow.copy.keyPhrases.map((phrase, index) => (
                <li key={index} className="flex items-center gap-2 text-foreground text-base">
                  <Icon icon="lucide:quote" className="text-primary-400 mr-1" width={18} height={18} />
                <span>{phrase}</span>
              </li>
              ))}
            </ul>

            {/* 
            {flow.productInfo.keyFeatures.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-2 text-foreground text-base first:mt-2">
                <Icon icon="lucide:check-circle" className="text-primary-400 mr-1" width={18} height={18} />
                <span>{feature}</span>
              </li>
            ))}
          </ul> */}


          </AccordionItem>



        </Accordion>
      </SummarySectionCard>
    </section>
  );
}; 
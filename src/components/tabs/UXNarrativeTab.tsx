import React from 'react';
import { Card, Chip } from "@heroui/react";
import { OnboardingFlow } from '../../types';
import { SummaryCard } from '../cards/SummaryCard';

interface UXNarrativeTabProps {
  flow: OnboardingFlow;
}

export const UXNarrativeTab: React.FC<UXNarrativeTabProps> = ({ flow }) => {
  return (
    <section>
      <h3 className="text-2xl font-semibold mb-8">
        <span className="bg-gradient-text-2">
          UX Narrative
        </span>
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {/* Integration Overview - Narrative */}
        <SummaryCard
          icon="lucide:file-text"
          iconColor="text-emerald-500"
          label="Integration Narrative"
          className="col-span-full"
        >
          {typeof flow.integrationOverview.narrative === 'string'
            ? flow.integrationOverview.narrative.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 last:mb-0">
                  {paragraph}
                </p>
              ))
            : Array.isArray(flow.integrationOverview.narrative)
              ? flow.integrationOverview.narrative.map((paragraph, index) => (
                  <p key={index} className="mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))
              : <p>{String(flow.integrationOverview.narrative)}</p>
          }
        </SummaryCard>

        {/* Implementation Notes */}
        <SummaryCard
          icon="lucide:clipboard-list"
          iconColor="text-cyan-500"
          label="Implementation Notes"
        >
          {flow.integrationOverview.implementationNotes.split('\n').map((line, index) => (
            <p key={index} className="mb-2 last:mb-0">{line}</p>
          ))}
        </SummaryCard>

        {/* Copy Guidelines - Tone */}
        <SummaryCard
          icon="lucide:volume-2"
          iconColor="text-rose-500"
          label="Tone"
        >
          {flow.copy.tone}
        </SummaryCard>

        {/* Copy Guidelines - Voice */}
        <SummaryCard
          icon="lucide:mic"
          iconColor="text-pink-500"
          label="Voice"
        >
          {flow.copy.voice}
        </SummaryCard>

        {/* Copy Guidelines - Key Phrases */}
        <SummaryCard
          icon="lucide:quote"
          iconColor="text-violet-500"
          label="Key Phrases"
          className="col-span-full"
        >
          <div className="flex flex-wrap gap-2">
            {flow.copy.keyPhrases.map((phrase, index) => (
              <Chip
                key={index}
                variant="flat"
                color="primary"
                className="summary-feature-chip"
              >
                {phrase}
              </Chip>
            ))}
          </div>
        </SummaryCard>
      </div>
    </section>
  );
}; 
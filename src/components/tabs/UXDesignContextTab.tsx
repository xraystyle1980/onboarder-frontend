import React from 'react';
import { Card } from "@heroui/react";
import { OnboardingFlow } from '../../types';
import { SummaryCard } from '../cards/SummaryCard';

interface UXDesignContextTabProps {
  flow: OnboardingFlow;
}

export const UXDesignContextTab: React.FC<UXDesignContextTabProps> = ({ flow }) => {
  return (
    <></>
    // <section>
    //   <h3 className="text-2xl font-semibold mb-8">
    //     <span className="bg-gradient-text-2">
    //       UX Design Context
    //     </span>
    //   </h3>
    //   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
    //     {/* Launch Context - Timing */}
    //     <SummaryCard
    //       icon="lucide:hourglass"
    //       iconColor="text-blue-500"
    //       label="Launch Timing"
    //     >
    //       {flow.productInfo.launchContext.timing}
    //     </SummaryCard>

    //     {/* Launch Context - Signup Strategy */}
    //     <SummaryCard
    //       icon="lucide:user-plus"
    //       iconColor="text-green-500"
    //       label="Signup Strategy"
    //     >
    //       {flow.productInfo.launchContext.signupStrategy}
    //     </SummaryCard>

    //     {/* Launch Context - Friction Reduction */}
    //     <SummaryCard
    //       icon="lucide:minimize"
    //       iconColor="text-orange-500"
    //       label="Friction Reduction"
    //     >
    //       {flow.productInfo.launchContext.frictionReduction}
    //     </SummaryCard>

    //     {/* Launch Context - Value Reinforcement */}
    //     <SummaryCard
    //       icon="lucide:award"
    //       iconColor="text-purple-500"
    //       label="Value Reinforcement"
    //     >
    //       {flow.productInfo.launchContext.valueReinforcement}
    //     </SummaryCard>

    //     {/* Recommended Pattern */}
    //     <SummaryCard
    //       icon="lucide:puzzle"
    //       iconColor="text-indigo-500"
    //       label="Recommended Pattern"
    //     >
    //       {flow.pattern.pattern}
    //     </SummaryCard>

    //     {/* Pattern Rationale - Full Width */}
    //     <SummaryCard
    //       icon="lucide:lightbulb"
    //       iconColor="text-yellow-500"
    //       label="Pattern Rationale"
    //       className="col-span-full"
    //     >
    //       {flow.pattern.rationale}
    //     </SummaryCard>
    //   </div>
    // </section>
  );
}; 
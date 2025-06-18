import React, { useRef, useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { OnboardingStep, OnboardingFlow } from "../types";
import { FlowCard } from "./flow-cards/FlowCard";
import { useFlowCardTabs } from "../hooks/useFlowCardTabs";
import { CARD_WIDTH } from "../utils/constants";

interface OnboardingFlowCardsProps {
  flow: OnboardingFlow;
}

export const OnboardingFlowCards: React.FC<OnboardingFlowCardsProps> = React.memo(({ flow }) => {
  const { handleTabChange, getSelectedTab } = useFlowCardTabs();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  // Only handle arrow visibility and scrolling
  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 0);
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    updateArrows();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateArrows);
    window.addEventListener('resize', updateArrows);
    return () => {
      el.removeEventListener('scroll', updateArrows);
      window.removeEventListener('resize', updateArrows);
    };
  }, []);

  const scrollBy = (amount: number) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <section className="p-6">
      <h3 className="text-2xl font-semibold mb-8">
        <span className="bg-gradient-text-2">
          Onboarding Flow
        </span>
      </h3>
    
      <div className="relative w-full max-w-full mx-auto">
        {showLeft && (
          <button
            className="absolute left-[0px] top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white shadow rounded-full p-2 transition-colors border border-gray-200"
            onClick={() => scrollBy(-CARD_WIDTH * 1.5)}
            aria-label="Scroll left"
          >
            <Icon icon="lucide:chevron-left" width={24} height={24} />
          </button>
        )}
        {showRight && (
          <button
            className="absolute right-[0px] top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white shadow rounded-full p-2 transition-colors border border-gray-200"
            onClick={() => scrollBy(CARD_WIDTH * 1.5)}
            aria-label="Scroll right"
          >
            <Icon icon="lucide:chevron-right" width={24} height={24} />
          </button>
        )}
        <div
          ref={scrollRef}
          className="px-8 flex gap-2 pb-4 overflow-x-auto scroll-smooth w-full scroll-mask"
        >
          {flow.steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <FlowCard
                step={step}
                flow={flow}
                index={index}
                selectedTab={getSelectedTab(step.id)}
                onTabChange={(key) => handleTabChange(step.id, key)}
              />
              {index < flow.steps.length - 1 && (
                <div className="flex items-center px-1">
                  <Icon icon="lucide:arrow-right" className="text-default-400" width={20} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
});

OnboardingFlowCards.displayName = 'OnboardingFlowCards';
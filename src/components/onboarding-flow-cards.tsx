import React, { useRef, useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { OnboardingStep, OnboardingFlow } from "../types";
import { FlowCard } from "./flow-cards/FlowCard";
import { useFlowCardTabs } from "../hooks/useFlowCardTabs";
import { CARD_WIDTH } from "../utils/constants";
import { Pill } from "./shared/Pill";

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
      <div className="flex items-center gap-4 mb-8">
      
        <h2 className="text-3xl text-foreground">Screens</h2>

        {/* The pattern below matches the value in the onboarding summary tab under 'Flow Type' */}
        <Pill>
          {flow.pattern.pattern}
        </Pill>
      </div>
    
      <div className="relative w-full max-w-full mx-auto">
        {showLeft && (
          <button
            className="absolute left-[-48px] top-1/2 -translate-y-1/2 z-30 bg-gradient-orange-pink border-none hover:bg-accent/90 rounded-full p-2 transition-colors border shadow-xl"
            onClick={() => scrollBy(-CARD_WIDTH * 1.5)}
            aria-label="Scroll left"
          >
            <Icon icon="lucide:chevron-left" width={24} height={24} className="text-black" />
          </button>
        )}
        {showRight && (
          <button
            className="absolute right-[-48px] top-1/2 -translate-y-1/2 z-30 bg-gradient-orange-pink border-none hover:bg-accent/90 rounded-full p-2 transition-colors border shadow-xl"
            onClick={() => scrollBy(CARD_WIDTH * 1.5)}
            aria-label="Scroll right"
          >
            <Icon icon="lucide:chevron-right" width={24} height={24} className="text-black" />
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
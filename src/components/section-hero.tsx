"use client";
import React from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";

interface SectionHeroProps {
  inputText: string;
  onInputChange: (text: string) => void;
  onGenerate: () => void;
  onClear: () => void;
  isGenerating: boolean;
}

export default function SectionHero({
  inputText,
  onInputChange,
  onGenerate,
  onClear,
  isGenerating,
}: SectionHeroProps) {
  return (
    <div className="relative flex flex-col items-center overflow-clip [background-image:linear-gradient(90deg,_#00000033,_#00000033),linear-gradient(90deg,_#667eea,_#764ba2)]">
      <div className="max-w-screen-md mx-auto">
        <div className="flex flex-col items-start justify-center gap-[29px] border-solid border-gray-200 p-4 sm:p-8">
          <div className="flex flex-col gap-4 self-stretch border-solid border-gray-200 text-center max-w-full">
            <div className="flex items-start justify-center break-words">
              <h1 className="font-bold text-center text-6xl max-md:text-4xl max-md:leading-[50px]">
                <span className="text-white">{"Design Onboarding UX ​"}</span>
                <span className="bg-gradient-text-1">
                  Instantly
                </span>
              </h1>
            </div>
            <div className="flex items-start justify-center break-words">
              <h2 className="text-3xl text-center text-white/90">
                Transform your product ideas into structured onboarding flows with AI-powered UX insights
              </h2>
            </div>
          </div>
          <div className="flex flex-col items-start justify-center gap-[23px] rounded-2xl border border-solid border-x-white/20 border-y-white/20 bg-black/30 p-8 w-full max-w-full">
            <textarea
              value={inputText}
              onChange={(e) => onInputChange(e.target.value)}
              className="self-stretch rounded-xl border border-solid border-x-white/50 border-y-white/50 bg-white/70 p-4 text-base leading-6 text-slate-900 resize-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              rows={4}
              placeholder='A fitness tracking app called "FitTrack Pro" that helps users set up their fitness goals, connect devices, and understand key features. Target audience is health-conscious adults aged 25-45.'
              disabled={isGenerating}
            />
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-[11px] border-solid border-gray-200 min-[1430px]:flex-nowrap w-full">
              <div className="flex items-center gap-4 flex-wrap justify-center">
                <div className="flex flex-wrap items-center justify-center gap-[7px] border-solid border-gray-200 min-[1430px]:flex-nowrap flex-grow">
                  <Icon icon="lucide:wand-2" className="h-3.5 w-[11px] text-indigo-500" />
                  <div className="w-auto text-sm text-white break-words">
                    Onboarder will analyze and generate your UX flow
                  </div>
                </div>
                <Button
                  variant="solid"
                  color="primary"
                  size="md"
                  onPress={onGenerate}
                  isDisabled={!inputText.trim() || isGenerating}
                  startContent={<Icon icon="lucide:wand-2" width={16} />}
                >
                  {isGenerating ? "Generating..." : "Generate Onboarding"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

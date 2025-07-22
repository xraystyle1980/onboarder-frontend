"use client";
import React, { useState, useRef, useEffect } from "react";
import { Button, Switch, cn } from "@heroui/react";
import { Pill } from "./shared/Pill";
import Lottie from 'lottie-react';
import robotIcon from '../lottie/robot-hover.json';
import { Icon } from "@iconify/react";

interface SectionHeroProps {
  inputText: string;
  onInputChange: (text: string) => void;
  onGenerate: () => void;
  onClear: () => void;
  isGenerating: boolean;
  isExample: boolean;
  onToggleExample: (checked: boolean) => void;
  hasGeneratedFlow: boolean;
  currentProgressMessage?: string;
}

export default function SectionHero({
  inputText,
  onInputChange,
  onGenerate,
  onClear,
  isGenerating,
  isExample,
  onToggleExample,
  hasGeneratedFlow,
  currentProgressMessage,
}: SectionHeroProps) {
  const playerRef = useRef<any>(null);

  const handleMouseEnter = () => {
    if (playerRef.current && !isGenerating) {
      playerRef.current.setDirection(1);
      playerRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (playerRef.current && !isGenerating) {
      playerRef.current.setDirection(-1);
      playerRef.current.play();
    }
  };

  // Handle Lottie animation for generating state
  useEffect(() => {
    if (playerRef.current && !isGenerating) {
      playerRef.current.loop = false;
    }
  }, [isGenerating]);

  return (
    <div className="px-3 lg:px-0 container mx-auto gap-2 relative flex flex-col items-center overflow-clip pt-5 lg:pt-16 pb-4">
      <div className="mt-2 mb-0 lg:mt-4 lg:mb-5">
        <Pill>
          {/* <MdiIcon path={mdiRobot} size={0.9} color="#0369a1" /> */}
          AI-Powered UX Generation
        </Pill>
      </div>
      {/* Headline */}
      <div className="w-full max-w-3xl text-center mb-6">
        <h1 className="text-[40px] lg:text-[60px] font-semibold text-white block">Design onboarding UX flows 
        <span className="gradient-orange-pink"> instantly</span></h1>
      </div>
      {/* Subheading */}
      <div className="w-full max-w-3xl mx-auto flex items-center justify-center mb-6 lg:mb-7">
        <p className="text-xl lg:text-2xl leading-7 lg:leading-8 text-white text-center w-full">
          <span className="font-semibold text-sky-400">Kickstart your UX. </span>
          <span className="font-regular text-slate-300">Just describe your product and Onboarder will generate a user-facing onboarding flow you can build on.</span>
        </p>
      </div>


      {/* Prompt Box */}
      <div className="w-full max-w-5xl mx-auto flex flex-col pt-3">
        <form
          onSubmit={e => {
            e.preventDefault();
            if (!inputText.trim()) return; // browser will show required message
            onGenerate();
          }}
          className="flex flex-col items-start justify-end gap-4 rounded-3xl border-2 border-solid border-blue-600/50 px-3 lg:px-8 pb-3.5 bg-black/30 [background-image:radial-gradient(#f725850f,_#0b0b140f),radial-gradient(#7c3aed14,_#0b0b1414),radial-gradient(#00e5ff16,_#0b0b1416),linear-gradient(90deg,_#0b0b14,_#0b0b14)]"
        >
          {/* Prompt label */}
          <div className="flex items-center justify-center relative top-[-1rem]">
            <Pill>✨ Describe your product</Pill>
          </div>
          {/* Prompt text area */}
          <textarea
            id="product-description"
            name="product-description"
            value={inputText}
            onChange={(e) => onInputChange(e.target.value)}
            required
            aria-label="Describe your product"
            className="bg-transparent text-lg lg:text-2xl self-stretch rounded-xl border border-none px-2 pb-2 pt-0 lg:p-4 leading-normal text-white/30 focus:text-white placeholder-white/30 transition-colors selection:bg-sky-500/30 resize-none mb-2"
            rows={4}
            placeholder='A project management app called "FreelancePM" that helps freelancers create projects, invite clients, and track tasks. Target audience is independent contractors and solo professionals aged 25-50.'
            disabled={isGenerating}
          />
          {/* Example toggle and Generate button row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-y-3 border-t border-solid border-neutral-600/50 py-4 w-full">
            <div className="flex justify-center md:justify-start items-center gap-3 w-full text-sm">
              <Switch
                isSelected={isExample}
                onValueChange={onToggleExample}
                isDisabled={isGenerating || hasGeneratedFlow}
                classNames={{
                  label: [
                    "text-sky-700 text-sm", // OFF state
                    "group-data-[selected=true]:text-sky-500" // ON state
                  ].join(" ")
                }}
              >
                  Try your own flow or toggle the example
             
              </Switch>
              
            </div>
            <Button
              className="btn-primary flex items-center gap-3 min-w-[260px] transition-all duration-300 ease-in-out"
              type="submit"
              isDisabled={isGenerating}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              startContent={
                <div className="mr-2">
                  {isGenerating ? (
                    <Icon 
                      icon="mdi:cog" 
                      width={24} 
                      height={24} 
                      className="animate-spin text-black" 
                    />
                  ) : (
                    <Lottie
                      lottieRef={playerRef}
                      animationData={robotIcon}
                      style={{ width: 40, height: 40 }}
                      loop={false}
                      autoplay={false}
                    />
                  )}
                </div>
              }
            >
              <span>
                {isGenerating ? (currentProgressMessage || "Generating...") : "Generate Flow"}
              </span>
            </Button>
          
          </div>
        </form>
      </div>


    </div>
  );
}

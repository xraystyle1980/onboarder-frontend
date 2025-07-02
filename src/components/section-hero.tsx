"use client";
import React, { useState, useRef, useEffect } from "react";
import { Button, Switch, cn } from "@heroui/react";
import MdiIcon from '@mdi/react';
import { mdiRobot } from '@mdi/js';
import { Pill } from "./shared/Pill";
import Lottie from 'lottie-react';
import robotIcon from '../lottie/robot-hover.json';

interface SectionHeroProps {
  inputText: string;
  onInputChange: (text: string) => void;
  onGenerate: () => void;
  onClear: () => void;
  isGenerating: boolean;
  isExample: boolean;
  onToggleExample: (checked: boolean) => void;
}

export default function SectionHero({
  inputText,
  onInputChange,
  onGenerate,
  onClear,
  isGenerating,
  isExample,
  onToggleExample,
}: SectionHeroProps) {
  const playerRef = useRef<any>(null);
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  const handleMouseEnter = () => {
    console.log('Mouse enter triggered');
    console.log('Player ref:', playerRef.current);
    console.log('Is player ready:', isPlayerReady);
    
    if (playerRef.current) {
      console.log('Playing animation...');
      playerRef.current.goToAndPlay(0);
    } else {
      console.log('Player ref is null');
    }
  };

  const handlePlayerReady = () => {
    console.log('Player ready set to true');
    setIsPlayerReady(true);
  };

  const handleAnimationComplete = () => {
    console.log('Animation completed');
    // Animation completed, reset for next hover
    if (playerRef.current) {
      playerRef.current.goToAndStop(0, true);
    }
  };

  return (
    <div className="gap-2 relative flex flex-col items-center overflow-clip hero-radial-bg pt-16 pb-4 px-4 lg:px-0">
      <div className="mt-4 mb-5">
        <Pill>
          {/* <MdiIcon path={mdiRobot} size={0.9} color="#0369a1" /> */}
          AI-Powered UX Generation
        </Pill>
      </div>
      {/* Headline */}
      <div className="w-full max-w-3xl text-center text-[60px] font-bold leading-[60px] mb-6">
        <span className="text-white block">Design Onboarding UX</span>
        <span className="gradient-orange-pink block">Instantly</span>
      </div>
      {/* Subheading */}
      <div className="flex items-center justify-center w-full max-w-3xl mx-auto mb-7">
        <p className="text-2xl leading-8 text-white text-center w-full">
          <span className="font-semibold text-sky-400">Kickstart your UX. </span>
          <span className="font-regular text-slate-300">Just describe your product and we'll generate a user-facing onboarding flow you can build on.</span>
        </p>
      </div>


      {/* Prompt Box */}
      <div className="flex flex-col justify-end w-full max-w-5xl pt-3">
        <form
          onSubmit={e => {
            e.preventDefault();
            if (!inputText.trim()) return; // browser will show required message
            onGenerate();
          }}
          className="flex flex-col items-start justify-end gap-4 rounded-3xl border-2 border-solid border-blue-600/50 px-8 pb-3.5 bg-black/30 [background-image:radial-gradient(#f725850f,_#0b0b140f),radial-gradient(#7c3aed14,_#0b0b1414),radial-gradient(#00e5ff16,_#0b0b1416),linear-gradient(90deg,_#0b0b14,_#0b0b14)]"
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
            className="bg-transparent text-2xl self-stretch rounded-xl border border-none p-4 leading-normal text-white/30 focus:text-white placeholder-white/30 transition-colors selection:bg-sky-500/30 resize-none mb-2"
            rows={3}
            placeholder='A project management app called "FreelancePM" that helps freelancers create projects, invite clients, and track tasks. Target audience is independent contractors and solo professionals aged 25-50.'
            disabled={isGenerating}
          />
          {/* Example toggle and Generate button row */}
          <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-y-3 border-t border-solid border-neutral-600/50 py-4 w-full">
            <div className="flex items-center gap-3 w-full text-sm">
              <Switch
                isSelected={isExample}
                onValueChange={onToggleExample}
                classNames={{
                  label: [
                    "text-sky-700", // OFF state
                    "group-data-[selected=true]:text-sky-500" // ON state
                  ].join(" ")
                }}
              >
                 Example
              </Switch>
              <span className="text-sky-500 text-sm">
                Try your own flow or toggle the example
              </span>
            </div>
            <Button
              className="btn-primary flex items-center gap-3 px-12 py-7 rounded-2xl drop-shadow-lg"
              type="submit"
              isDisabled={isGenerating}
              onMouseEnter={handleMouseEnter}
              startContent={
                <div className="mr-2">
                  <Lottie
                    lottieRef={playerRef}
                    animationData={robotIcon}
                    style={{ width: 48, height: 48 }}
                    onComplete={handleAnimationComplete}
                    loop={false}
                    autoplay={false}
                  />
                </div>
              }
            >
              <span className="text-lg leading-6">{isGenerating ? "Generating..." : "Generate Flow"}</span>
            </Button>
          
          </div>
        </form>
      </div>


    </div>
  );
}

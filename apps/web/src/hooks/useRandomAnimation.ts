"use client";
import { useState, useEffect } from "react";

export function useRandomAnimation(totalPhases: number, basePhaseDuration: number) {
  const [phase, setPhase] = useState(0);
  const [loopKey, setLoopKey] = useState(0);
  const [phaseDuration, setPhaseDuration] = useState(basePhaseDuration);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    let isMounted = true;

    // Random start delay (0s, 1s, or 2s) to stagger initial page load
    const startDelay = Math.floor(Math.random() * 3) * 1000;

    const cyclePhase = (currentPhase: number, currentLoop: number, currentDuration: number) => {
      timeoutId = setTimeout(() => {
        if (!isMounted) return;

        const nextPhase = (currentPhase + 1) % totalPhases;
        let nextLoop = currentLoop;
        let nextDuration = currentDuration;

        // Speed modulation only at the start of a new loop
        if (nextPhase === 0) {
          nextLoop += 1;
          const rand = Math.random();
          // 30% faster, 30% slower, 40% normal
          if (rand < 0.3) nextDuration = basePhaseDuration * 0.8;
          else if (rand < 0.6) nextDuration = basePhaseDuration * 1.2;
          else nextDuration = basePhaseDuration;
        }

        setPhase(nextPhase);
        setLoopKey(nextLoop);
        setPhaseDuration(nextDuration);

        cyclePhase(nextPhase, nextLoop, nextDuration);
      }, currentDuration);
    };

    timeoutId = setTimeout(() => {
      if (!isMounted) return;
      cyclePhase(0, 0, basePhaseDuration);
    }, startDelay);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [totalPhases, basePhaseDuration]);

  return { phase, loopKey, phaseDuration };
}

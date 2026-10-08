import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useReducedMotionPreference } from '../../utils/motion.js';

interface Props {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  badgeColor?: string;
}

export const AnimatedCounter: React.FC<Props> = ({
  value,
  prefix = '',
  suffix = '',
  className = '',
  badgeColor = 'bg-amber-400 text-slate-950'
}) => {
  const reducedMotion = useReducedMotionPreference();
  const [displayValue, setDisplayValue] = useState(value);
  const [floatingDeltas, setFloatingDeltas] = useState<{ id: number; delta: number }[]>([]);
  const prevValueRef = useRef(value);

  useEffect(() => {
    const prev = prevValueRef.current;
    if (value !== prev) {
      const delta = value - prev;
      prevValueRef.current = value;

      if (delta > 0) {
        // Trigger floating "+delta" badge
        const badgeId = Date.now() + Math.random();
        setFloatingDeltas(d => [...d, { id: badgeId, delta }]);
        setTimeout(() => {
          setFloatingDeltas(d => d.filter(item => item.id !== badgeId));
        }, 1500);
      }

      if (reducedMotion) {
        setDisplayValue(value);
        return;
      }

      // Smooth count-up
      const duration = 750; // ms
      const startTime = performance.now();
      const startVal = displayValue;

      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(startVal + (value - startVal) * eased);
        setDisplayValue(current);

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          setDisplayValue(value);
        }
      };

      requestAnimationFrame(step);
    }
  }, [value, reducedMotion]);

  return (
    <span className={`relative inline-flex items-center font-black ${className}`}>
      <span>
        {prefix}
        {displayValue.toLocaleString()}
        {suffix}
      </span>

      {/* Floating deltas (+20, +45, etc.) */}
      <AnimatePresence>
        {!reducedMotion &&
          floatingDeltas.map(item => (
            <motion.span
              key={item.id}
              initial={{ opacity: 0, y: 0, scale: 0.6 }}
              animate={{ opacity: 1, y: -24, scale: 1.1 }}
              exit={{ opacity: 0, y: -36, scale: 0.9 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className={`pointer-events-none absolute -top-1 -right-4 px-2 py-0.5 rounded-full text-[11px] font-black shadow-lg z-30 ${badgeColor}`}
            >
              +{item.delta}
            </motion.span>
          ))}
      </AnimatePresence>
    </span>
  );
};

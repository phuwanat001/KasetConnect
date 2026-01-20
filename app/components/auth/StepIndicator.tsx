"use client";

import { Check } from "lucide-react";

interface Step {
  number: number;
  title: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.number;
          const isCurrent = currentStep === step.number;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.number} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                {/* Circle */}
                <div
                  className={`
                    relative flex items-center justify-center w-10 h-10 rounded-full
                    font-bold text-sm transition-all duration-300
                    ${
                      isCompleted
                        ? "bg-emerald-500 text-white"
                        : isCurrent
                          ? "bg-emerald-500 text-white ring-4 ring-emerald-500/30"
                          : "bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
                    }
                  `}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : step.number}

                  {/* Pulse animation for current */}
                  {isCurrent && (
                    <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-25" />
                  )}
                </div>

                {/* Title */}
                <span
                  className={`
                    mt-2 text-xs font-medium text-center max-w-[80px]
                    ${
                      isCurrent || isCompleted
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-slate-500 dark:text-slate-400"
                    }
                  `}
                >
                  {step.title}
                </span>
              </div>

              {/* Connector Line */}
              {!isLast && (
                <div className="flex-1 mx-2">
                  <div
                    className={`
                      h-1 rounded-full transition-all duration-500
                      ${
                        isCompleted
                          ? "bg-emerald-500"
                          : "bg-slate-200 dark:bg-slate-700"
                      }
                    `}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

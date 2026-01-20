"use client";

import { useState, useRef, KeyboardEvent, ClipboardEvent } from "react";

interface OTPInputProps {
  length?: number;
  onComplete?: (otp: string) => void;
  disabled?: boolean;
}

export function OTPInput({
  length = 6,
  onComplete,
  disabled = false,
}: OTPInputProps) {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Take only last character
    setOtp(newOtp);

    // Move to next input
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if complete
    const otpValue = newOtp.join("");
    if (otpValue.length === length && onComplete) {
      onComplete(otpValue);
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, length);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split("").forEach((char, i) => {
      if (i < length) newOtp[i] = char;
    });
    setOtp(newOtp);

    // Focus last filled input or last input
    const focusIndex = Math.min(pastedData.length, length - 1);
    inputRefs.current[focusIndex]?.focus();

    if (pastedData.length === length && onComplete) {
      onComplete(pastedData);
    }
  };

  return (
    <div className="flex gap-3 justify-center">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          disabled={disabled}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className={`
            w-12 h-14 text-center text-xl font-bold rounded-xl
            border-2 transition-all duration-200
            ${
              digit
                ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400"
                : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            }
            focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
        />
      ))}
    </div>
  );
}

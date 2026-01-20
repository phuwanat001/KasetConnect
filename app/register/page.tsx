"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  Leaf,
  Mail,
  Lock,
  User,
  CreditCard,
  Check,
  Eye,
  EyeOff,
  RefreshCw,
  Sparkles,
  Shield,
  Upload,
  Camera,
} from "lucide-react";

const STEPS = [
  { number: 1, title: "บัญชี", icon: Mail },
  { number: 2, title: "ข้อมูล", icon: User },
  { number: 3, title: "ยืนยัน", icon: Shield },
  { number: 4, title: "สำเร็จ", icon: Check },
];

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  // Form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    idCard: "",
    firstName: "",
    lastName: "",
    phone: "",
    idCardImage: null as File | null,
    selfieImage: null as File | null,
  });

  // Errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateFormData = (field: string, value: string | File | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  // OTP Input Handler
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto focus next
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }

    // Auto verify when complete
    if (newOtp.every((d) => d) && newOtp.join("").length === 6) {
      setOtpVerified(true);
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  // Validate ID Card (13 digits)
  const validateIdCard = (id: string): boolean => {
    if (!/^\d{13}$/.test(id)) return false;
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      sum += parseInt(id[i]) * (13 - i);
    }
    const checkDigit = (11 - (sum % 11)) % 10;
    return checkDigit === parseInt(id[12]);
  };

  const formatIdCard = (value: string): string => {
    const digits = value.replace(/\D/g, "").slice(0, 13);
    if (digits.length <= 1) return digits;
    if (digits.length <= 5) return `${digits.slice(0, 1)}-${digits.slice(1)}`;
    if (digits.length <= 10)
      return `${digits.slice(0, 1)}-${digits.slice(1, 5)}-${digits.slice(5)}`;
    if (digits.length <= 12)
      return `${digits.slice(0, 1)}-${digits.slice(1, 5)}-${digits.slice(5, 10)}-${digits.slice(10)}`;
    return `${digits.slice(0, 1)}-${digits.slice(1, 5)}-${digits.slice(5, 10)}-${digits.slice(10, 12)}-${digits.slice(12)}`;
  };

  const handleSendOTP = async () => {
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrors({ email: "กรุณากรอกอีเมลที่ถูกต้อง" });
      return;
    }

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setOtpSent(true);
    setCountdown(60);
    setIsLoading(false);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.email) newErrors.email = "กรุณากรอกอีเมล";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "รูปแบบอีเมลไม่ถูกต้อง";
      }
      if (!otpVerified) newErrors.otp = "กรุณายืนยัน OTP";
      if (!formData.password) newErrors.password = "กรุณากรอกรหัสผ่าน";
      else if (formData.password.length < 8) {
        newErrors.password = "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร";
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "รหัสผ่านไม่ตรงกัน";
      }
    }

    if (currentStep === 2) {
      const rawIdCard = formData.idCard.replace(/\D/g, "");
      if (!rawIdCard) newErrors.idCard = "กรุณากรอกเลขบัตรประชาชน";
      else if (!validateIdCard(rawIdCard)) {
        newErrors.idCard = "เลขบัตรประชาชนไม่ถูกต้อง";
      }
      if (!formData.firstName) newErrors.firstName = "กรุณากรอกชื่อ";
      if (!formData.lastName) newErrors.lastName = "กรุณากรอกนามสกุล";
    }

    if (currentStep === 3) {
      if (!formData.idCardImage)
        newErrors.idCardImage = "กรุณาอัพโหลดรูปบัตรประชาชน";
      if (!formData.selfieImage)
        newErrors.selfieImage = "กรุณาอัพโหลดรูป Selfie";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (!validateStep()) return;

    if (currentStep === 3) {
      setIsLoading(true);
      await new Promise((r) => setTimeout(r, 2000));
      setIsLoading(false);
    }

    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleFileUpload = (
    field: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      updateFormData(field, file);
    }
  };

  return (
    <div className="min-h-full bg-linear-to-br from-slate-950 via-emerald-950 to-slate-950 relative overflow-auto">
      {/* Background Elements - Fixed */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-1/3 -left-20 w-80 h-80 bg-teal-500/15 rounded-full blur-[100px] animate-pulse [animation-delay:1s]" />
        <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-cyan-500/15 rounded-full blur-[100px] animate-pulse [animation-delay:2s]" />
      </div>

      {/* Content - Scrollable */}
      <div className="relative z-10 flex items-start justify-center px-4 py-6 sm:py-12">
        <div className="w-full max-w-sm sm:max-w-lg">
          {/* Logo */}
          <div className="text-center mb-4 sm:mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-bold group"
            >
              <div className="relative p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-linear-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/30">
                <Leaf className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
              </div>
              <span className="text-white">
                Kaset<span className="text-emerald-400">Connect</span>
              </span>
            </Link>
          </div>

          {/* Step Indicator */}
          <div className="mb-6 flex justify-center">
            <div className="flex items-center">
              {STEPS.map((step, index) => {
                const Icon = step.icon;
                const isCompleted = currentStep > step.number;
                const isCurrent = currentStep === step.number;

                return (
                  <div key={step.number} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 ${
                          isCompleted
                            ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                            : isCurrent
                              ? "bg-linear-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30"
                              : "bg-white/10 text-slate-500"
                        }`}
                      >
                        {isCompleted ? (
                          <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                        ) : (
                          <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                        )}
                      </div>
                      <span
                        className={`mt-1.5 sm:mt-2 text-[10px] sm:text-xs font-medium ${
                          isCurrent ? "text-emerald-400" : "text-slate-500"
                        }`}
                      >
                        {step.title}
                      </span>
                    </div>
                    {index < STEPS.length - 1 && (
                      <div
                        className={`w-8 sm:w-16 h-0.5 sm:h-1 mx-1.5 sm:mx-3 rounded-full transition-all duration-300 ${
                          isCompleted ? "bg-emerald-500" : "bg-white/10"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Register Card */}
          <div className="relative">
            <div className="absolute -inset-1 bg-linear-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 rounded-2xl sm:rounded-3xl blur-xl opacity-75" />

            <div className="relative bg-white/10 backdrop-blur-2xl border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl">
              {/* Step 1: Account */}
              {currentStep === 1 && (
                <div className="space-y-5">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      <span className="text-sm font-medium text-emerald-300">
                        ขั้นตอนที่ 1
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-white">
                      สร้างบัญชีผู้ใช้
                    </h2>
                    <p className="text-slate-400 mt-1">
                      กรอกอีเมลและตั้งรหัสผ่าน
                    </p>
                  </div>

                  {/* Email with OTP */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      อีเมล
                    </label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-emerald-500/10">
                          <Mail className="w-4 h-4 text-emerald-400" />
                        </div>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            updateFormData("email", e.target.value)
                          }
                          placeholder="your@email.com"
                          disabled={otpVerified}
                          className="w-full pl-14 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:bg-white/10 disabled:opacity-50 transition-all"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleSendOTP}
                        disabled={isLoading || countdown > 0 || otpVerified}
                        className="px-5 py-4 rounded-xl bg-emerald-500 text-white font-medium disabled:opacity-50 hover:bg-emerald-600 transition-colors whitespace-nowrap"
                      >
                        {isLoading ? (
                          <RefreshCw className="w-5 h-5 animate-spin" />
                        ) : countdown > 0 ? (
                          `${countdown}s`
                        ) : otpVerified ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          "ส่ง OTP"
                        )}
                      </button>
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* OTP Input */}
                  {otpSent && !otpVerified && (
                    <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                      <p className="text-sm text-emerald-300 mb-4 text-center">
                        กรอกรหัส OTP 6 หลักที่ส่งไปยัง {formData.email}
                      </p>
                      <div className="flex justify-center gap-2">
                        {otp.map((digit, index) => (
                          <input
                            key={index}
                            id={`otp-${index}`}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) =>
                              handleOtpChange(index, e.target.value)
                            }
                            onKeyDown={(e) => handleOtpKeyDown(index, e)}
                            className="w-12 h-14 text-center text-xl font-bold rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {otpVerified && (
                    <div className="flex items-center gap-2 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                      <Check className="w-5 h-5 text-emerald-400" />
                      <span className="text-sm text-emerald-300">
                        ยืนยันอีเมลสำเร็จ
                      </span>
                    </div>
                  )}

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      รหัสผ่าน
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-emerald-500/10">
                        <Lock className="w-4 h-4 text-emerald-400" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) =>
                          updateFormData("password", e.target.value)
                        }
                        placeholder="อย่างน้อย 8 ตัวอักษร"
                        className="w-full pl-14 pr-12 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:bg-white/10 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-white/10 text-slate-400"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      ยืนยันรหัสผ่าน
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-emerald-500/10">
                        <Lock className="w-4 h-4 text-emerald-400" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          updateFormData("confirmPassword", e.target.value)
                        }
                        placeholder="ยืนยันรหัสผ่าน"
                        className="w-full pl-14 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:bg-white/10 transition-all"
                      />
                    </div>
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Personal Info */}
              {currentStep === 2 && (
                <div className="space-y-5">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      <span className="text-sm font-medium text-emerald-300">
                        ขั้นตอนที่ 2
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-white">
                      ข้อมูลส่วนตัว
                    </h2>
                    <p className="text-slate-400 mt-1">
                      กรอกข้อมูลตามบัตรประชาชน
                    </p>
                  </div>

                  {/* ID Card */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      เลขบัตรประชาชน 13 หลัก
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-emerald-500/10">
                        <CreditCard className="w-4 h-4 text-emerald-400" />
                      </div>
                      <input
                        type="text"
                        value={formData.idCard}
                        onChange={(e) =>
                          updateFormData("idCard", formatIdCard(e.target.value))
                        }
                        placeholder="X-XXXX-XXXXX-XX-X"
                        maxLength={17}
                        className="w-full pl-14 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:bg-white/10 transition-all tracking-wider"
                      />
                    </div>
                    {errors.idCard && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.idCard}
                      </p>
                    )}
                  </div>

                  {/* Name */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        ชื่อ
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-emerald-500/10">
                          <User className="w-4 h-4 text-emerald-400" />
                        </div>
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) =>
                            updateFormData("firstName", e.target.value)
                          }
                          placeholder="ชื่อจริง"
                          className="w-full pl-14 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:bg-white/10 transition-all"
                        />
                      </div>
                      {errors.firstName && (
                        <p className="mt-1 text-sm text-red-400">
                          {errors.firstName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        นามสกุล
                      </label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) =>
                          updateFormData("lastName", e.target.value)
                        }
                        placeholder="นามสกุล"
                        className="w-full px-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:bg-white/10 transition-all"
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-sm text-red-400">
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: KYC */}
              {currentStep === 3 && (
                <div className="space-y-5">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      <span className="text-sm font-medium text-emerald-300">
                        ขั้นตอนที่ 3
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-white">
                      ยืนยันตัวตน
                    </h2>
                    <p className="text-slate-400 mt-1">
                      อัพโหลดเอกสารเพื่อยืนยันตัวตน
                    </p>
                  </div>

                  {/* ID Card Upload */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      รูปบัตรประชาชน
                    </label>
                    <label className="flex flex-col items-center justify-center w-full h-36 rounded-2xl border-2 border-dashed border-white/20 bg-white/5 hover:bg-white/10 cursor-pointer transition-all">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload("idCardImage", e)}
                      />
                      {formData.idCardImage ? (
                        <div className="flex items-center gap-2 text-emerald-400">
                          <Check className="w-5 h-5" />
                          <span>{formData.idCardImage.name}</span>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-8 h-8 text-slate-400 mb-2" />
                          <span className="text-sm text-slate-400">
                            คลิกเพื่ออัพโหลดรูปบัตรประชาชน
                          </span>
                        </>
                      )}
                    </label>
                    {errors.idCardImage && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.idCardImage}
                      </p>
                    )}
                  </div>

                  {/* Selfie Upload */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      รูป Selfie พร้อมบัตรประชาชน
                    </label>
                    <label className="flex flex-col items-center justify-center w-full h-36 rounded-2xl border-2 border-dashed border-white/20 bg-white/5 hover:bg-white/10 cursor-pointer transition-all">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload("selfieImage", e)}
                      />
                      {formData.selfieImage ? (
                        <div className="flex items-center gap-2 text-emerald-400">
                          <Check className="w-5 h-5" />
                          <span>{formData.selfieImage.name}</span>
                        </div>
                      ) : (
                        <>
                          <Camera className="w-8 h-8 text-slate-400 mb-2" />
                          <span className="text-sm text-slate-400">
                            คลิกเพื่ออัพโหลดรูป Selfie
                          </span>
                        </>
                      )}
                    </label>
                    {errors.selfieImage && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.selfieImage}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 4: Success */}
              {currentStep === 4 && (
                <div className="text-center py-8">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-linear-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                    <Check className="w-12 h-12 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    สมัครสมาชิกสำเร็จ!
                  </h2>
                  <p className="text-slate-400 mb-8">
                    ระบบกำลังตรวจสอบข้อมูลของคุณ
                    <br />
                    จะแจ้งผลภายใน 1-2 วันทำการ
                  </p>
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-linear-to-r from-emerald-500 to-teal-500 text-white font-bold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all"
                  >
                    ไปหน้าเข้าสู่ระบบ
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              )}

              {/* Navigation Buttons */}
              {currentStep < 4 && (
                <div className="flex gap-4 mt-8">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-white/20 text-white font-medium hover:bg-white/5 transition-colors"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      ย้อนกลับ
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={isLoading}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-linear-to-r from-emerald-500 to-teal-500 text-white font-bold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all disabled:opacity-50"
                  >
                    {isLoading ? (
                      <RefreshCw className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        {currentStep === 3 ? "ยืนยันการสมัคร" : "ถัดไป"}
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Login Link */}
              {currentStep < 4 && (
                <p className="mt-6 text-center text-slate-400">
                  มีบัญชีอยู่แล้ว?{" "}
                  <Link
                    href="/login"
                    className="font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    เข้าสู่ระบบ
                  </Link>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

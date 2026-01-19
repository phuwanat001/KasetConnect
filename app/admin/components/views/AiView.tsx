"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import type { AiData } from "../../lib/types";

interface AiViewProps {
  data: AiData;
}

interface ToggleSwitchProps {
  enabled: boolean;
  onChange: () => void;
}

function ToggleSwitch({ enabled, onChange }: ToggleSwitchProps) {
  return (
    <button
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? "bg-indigo-600" : "bg-slate-200 dark:bg-slate-700"
      }`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform ${
          enabled ? "translate-x-5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

export function AiView({ data }: AiViewProps) {
  const [settings, setSettings] = useState(data.settings);
  const [systemStatus, setSystemStatus] = useState(data.system_status);
  const [isRetraining, setIsRetraining] = useState(false);

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings({
      ...settings,
      [key]: {
        ...settings[key],
        enabled: !settings[key].enabled,
      },
    });

    const settingNames: Record<string, string> = {
      smart_recommendation: "ระบบแนะนำอัจฉริยะ",
      chatbot_assistant: "แชทบอทผู้ช่วย",
      price_optimization: "การปรับราคาอัตโนมัติ",
      fraud_detection: "ตรวจจับพฤติกรรมน่าสงสัย",
    };

    toast.success(
      `${settings[key].enabled ? "ปิด" : "เปิด"}${settingNames[key]}แล้ว`,
    );
  };

  const handleRetrain = () => {
    setIsRetraining(true);
    toast.loading("กำลังเทรนโมเดล...", { id: "retrain" });

    setTimeout(() => {
      setIsRetraining(false);
      toast.success("เทรนโมเดลเสร็จสิ้น", { id: "retrain" });
    }, 3000);
  };

  const handleRestartSystem = () => {
    setSystemStatus("degraded");
    toast.loading("กำลังรีสตาร์ทระบบ...", { id: "restart" });

    setTimeout(() => {
      setSystemStatus("operational");
      toast.success("รีสตาร์ทระบบเสร็จสิ้น", { id: "restart" });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-800 dark:to-purple-800 text-white rounded-xl p-6 flex flex-col md:flex-row justify-between md:items-center gap-4 shadow-lg">
        <div>
          <h3 className="text-2xl font-bold mb-1">ระบบ AI เกษตร (Kaset AI)</h3>
          <p className="text-indigo-200 text-sm">
            จัดการอัลกอริทึมการจับคู่และแชทบอทอัจฉริยะ
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium">สถานะระบบ:</span>
          <span
            className={`text-xs font-bold px-3 py-1 rounded-full uppercase ${
              systemStatus === "operational"
                ? "bg-green-400 text-green-900"
                : systemStatus === "degraded"
                  ? "bg-yellow-400 text-yellow-900"
                  : "bg-red-400 text-red-900"
            }`}
          >
            {systemStatus === "operational"
              ? "ทำงานปกติ"
              : systemStatus === "degraded"
                ? "กำลังปรับปรุง"
                : "ออฟไลน์"}
          </span>
          <button
            onClick={handleRestartSystem}
            className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-lg text-xs font-medium transition-colors"
          >
            รีสตาร์ท
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* AI Settings */}
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm dark:shadow-none p-6 border border-slate-200 dark:border-slate-800 transition-colors">
          <h4 className="font-bold text-slate-900 dark:text-white mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">
            การตั้งค่า (Configuration)
          </h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-slate-900 dark:text-white">
                  ระบบแนะนำอัจฉริยะ
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {settings.smart_recommendation.description}
                </p>
              </div>
              <ToggleSwitch
                enabled={settings.smart_recommendation.enabled}
                onChange={() => toggleSetting("smart_recommendation")}
              />
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-slate-900 dark:text-white">
                  แชทบอทผู้ช่วย
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {settings.chatbot_assistant.description}
                </p>
              </div>
              <ToggleSwitch
                enabled={settings.chatbot_assistant.enabled}
                onChange={() => toggleSetting("chatbot_assistant")}
              />
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-slate-900 dark:text-white">
                  การปรับราคาอัตโนมัติ
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {settings.price_optimization.description}
                </p>
              </div>
              <ToggleSwitch
                enabled={settings.price_optimization.enabled}
                onChange={() => toggleSetting("price_optimization")}
              />
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-slate-900 dark:text-white">
                  ตรวจจับพฤติกรรมน่าสงสัย
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {settings.fraud_detection.description}
                </p>
              </div>
              <ToggleSwitch
                enabled={settings.fraud_detection.enabled}
                onChange={() => toggleSetting("fraud_detection")}
              />
            </div>
          </div>
        </div>

        {/* AI Usage Stats */}
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm dark:shadow-none p-6 border border-slate-200 dark:border-slate-800 transition-colors">
          <h4 className="font-bold text-slate-900 dark:text-white mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">
            การใช้งานวันนี้
          </h4>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600 dark:text-slate-400">
                  {data.usage_today.matches.label}
                </span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {data.usage_today.matches.value.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all"
                  style={{ width: `${data.usage_today.matches.percentage}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600 dark:text-slate-400">
                  {data.usage_today.chat_responses.label}
                </span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {data.usage_today.chat_responses.value}
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full transition-all"
                  style={{
                    width: `${data.usage_today.chat_responses.percentage}%`,
                  }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600 dark:text-slate-400">
                  {data.usage_today.fraud_alerts.label}
                </span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {data.usage_today.fraud_alerts.value}
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div
                  className="bg-red-600 h-2 rounded-full transition-all"
                  style={{
                    width: `${data.usage_today.fraud_alerts.percentage}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Model Info */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm dark:shadow-none p-6 border border-slate-200 dark:border-slate-800 transition-colors">
        <div className="flex justify-between items-center mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">
          <h4 className="font-bold text-slate-900 dark:text-white">
            ข้อมูลโมเดล (Model Information)
          </h4>
          <button
            onClick={handleRetrain}
            disabled={isRetraining}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            {isRetraining ? "กำลังเทรน..." : "เทรนโมเดลใหม่"}
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Recommendation Model
            </p>
            <p className="font-semibold text-slate-900 dark:text-white">
              {data.model_info.recommendation_model}
            </p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Chatbot Model
            </p>
            <p className="font-semibold text-slate-900 dark:text-white">
              {data.model_info.chatbot_model}
            </p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Last Trained
            </p>
            <p className="font-semibold text-slate-900 dark:text-white">
              {data.model_info.last_trained}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

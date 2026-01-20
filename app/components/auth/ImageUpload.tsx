"use client";

import { useState, useRef, ChangeEvent } from "react";
import { Upload, X, Camera, Image as ImageIcon } from "lucide-react";

interface ImageUploadProps {
  label: string;
  hint?: string;
  icon?: "camera" | "image";
  onImageSelect: (file: File | null) => void;
  accept?: string;
}

export function ImageUpload({
  label,
  hint,
  icon = "image",
  onImageSelect,
  accept = "image/*",
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      onImageSelect(file);
    } else {
      setPreview(null);
      onImageSelect(null);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleFileSelect(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleRemove = () => {
    handleFileSelect(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const IconComponent = icon === "camera" ? Camera : ImageIcon;

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
      </label>

      {preview ? (
        <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-2 rounded-full bg-red-500 text-white shadow-lg hover:bg-red-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-2 left-2 px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-medium">
            ✓ อัพโหลดแล้ว
          </div>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
            relative cursor-pointer rounded-2xl border-2 border-dashed p-8
            flex flex-col items-center justify-center gap-4
            transition-all duration-200
            ${
              isDragging
                ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30"
                : "border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:border-emerald-400 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20"
            }
          `}
        >
          <div
            className={`
            p-4 rounded-2xl transition-colors
            ${isDragging ? "bg-emerald-500 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400"}
          `}
          >
            <IconComponent className="w-8 h-8" />
          </div>

          <div className="text-center">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
              <span className="text-emerald-600 dark:text-emerald-400">
                คลิกเพื่ออัพโหลด
              </span>{" "}
              หรือลากไฟล์มาวาง
            </p>
            {hint && (
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                {hint}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Upload className="w-4 h-4" />
            <span>PNG, JPG up to 10MB</span>
          </div>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
}

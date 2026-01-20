"use client";

import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  avatar: string;
  rating: number;
  content: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "สมศักดิ์ พันธุ์ข้าว",
    role: "เกษตรกรชาวนา",
    location: "สุพรรณบุรี",
    avatar: "S",
    rating: 5,
    content:
      "ประทับใจมากครับ! หารถเกี่ยวข้าวได้ง่าย ราคาถูกกว่าที่อื่น และผู้ให้เช่าก็ส่งตรงเวลา ช่วยประหยัดค่าใช้จ่ายได้มาก",
  },
  {
    id: "2",
    name: "มาลี สวนผัก",
    role: "เจ้าของสวนผักออร์แกนิค",
    location: "นครปฐม",
    avatar: "M",
    rating: 5,
    content:
      "ใช้บริการเช่าโดรนพ่นยามาแล้ว 3 ครั้ง ทุกครั้งได้เครื่องคุณภาพดี พร้อมคนควบคุมที่มีความเชี่ยวชาญ",
  },
  {
    id: "3",
    name: "วิชัย ไร่อ้อย",
    role: "เจ้าของไร่อ้อย",
    location: "นครราชสีมา",
    avatar: "W",
    rating: 5,
    content:
      "ระบบใช้งานง่าย เปรียบเทียบราคาได้ชัดเจน มั่นใจว่าได้ราคาที่ยุติธรรม ไม่ต้องโทรถามเจ้าหลายๆ เจ้า",
  },
  {
    id: "4",
    name: "ประยูร นาดำ",
    role: "เกษตรกรรุ่นใหม่",
    location: "ขอนแก่น",
    avatar: "P",
    rating: 5,
    content:
      "แอปดีมาก ค้นหาเครื่องจักรได้ตามตำแหน่ง ไม่ต้องเสียเวลาขนส่งจากที่ไกล ช่วยประหยัดทั้งเงินและเวลา",
  },
];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const nextSlide = () => {
    goToSlide((activeIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    goToSlide((activeIndex - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [activeIndex]);

  return (
    <section className="py-24 bg-linear-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 overflow-hidden relative">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200/40 dark:bg-emerald-900/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-200/40 dark:bg-teal-900/20 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm uppercase tracking-wider mb-3">
            Testimonials
          </p>
          <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            เสียงจากเกษตรกรที่ใช้งานจริง
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            ความเห็นจากผู้ใช้งานจริงที่ไว้วางใจ KasetConnect
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Quote Icon */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-10">
            <div className="w-16 h-16 rounded-full bg-linear-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-xl shadow-emerald-500/25">
              <Quote className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Main Card */}
          <div className="relative bg-white dark:bg-slate-900 rounded-3xl shadow-2xl shadow-slate-200 dark:shadow-slate-900/50 p-8 lg:p-12 pt-14 overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-linear-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 opacity-50" />

            {/* Content */}
            <div className="relative z-10">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`transition-all duration-500 ${
                    index === activeIndex
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4 absolute inset-0 pointer-events-none"
                  }`}
                >
                  {/* Stars */}
                  <div className="flex items-center justify-center gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-6 h-6 ${
                          i < testimonial.rating
                            ? "text-amber-400 fill-amber-400"
                            : "text-slate-300"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-xl lg:text-2xl text-slate-700 dark:text-slate-200 text-center leading-relaxed mb-8">
                    "{testimonial.content}"
                  </p>

                  {/* Author */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-linear-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-xl font-bold mb-4 shadow-lg shadow-emerald-500/25">
                      {testimonial.avatar}
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400">
                      {testimonial.role}
                    </p>
                    <p className="text-sm text-emerald-600 dark:text-emerald-400">
                      📍 {testimonial.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 lg:-left-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white dark:bg-slate-800 shadow-lg flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-emerald-500 hover:text-white transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 lg:-right-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white dark:bg-slate-800 shadow-lg flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-emerald-500 hover:text-white transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === activeIndex
                    ? "w-8 h-3 bg-linear-to-r from-emerald-500 to-teal-500"
                    : "w-3 h-3 bg-slate-300 dark:bg-slate-700 hover:bg-emerald-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

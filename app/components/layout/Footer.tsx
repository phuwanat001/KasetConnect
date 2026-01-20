import {
  Leaf,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const quickLinks = [
  { href: "/", label: "หน้าแรก" },
  { href: "/marketplace", label: "ตลาดเช่า" },
  { href: "/lessors", label: "ผู้ให้เช่าแนะนำ" },
  { href: "/about", label: "เกี่ยวกับเรา" },
  { href: "/blog", label: "บทความเกษตร" },
];

const supportLinks = [
  { href: "/help", label: "ศูนย์ช่วยเหลือ" },
  { href: "/terms", label: "ข้อตกลงและเงื่อนไข" },
  { href: "/privacy", label: "นโยบายความเป็นส่วนตัว" },
  { href: "/contact", label: "ติดต่อเรา" },
  { href: "/faq", label: "คำถามที่พบบ่อย" },
];

const socialLinks = [
  { href: "#", icon: Facebook, label: "Facebook" },
  { href: "#", icon: Twitter, label: "Twitter" },
  { href: "#", icon: Instagram, label: "Instagram" },
  { href: "#", icon: Linkedin, label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 md:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* 1. Brand Section */}
          <div className="lg:col-span-1 space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-bold text-xl text-white"
            >
              <div className="p-2 rounded-xl bg-linear-to-br from-emerald-500 to-teal-500">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span>
                Kaset<span className="text-emerald-400">Connect</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              แพลตฟอร์มแบ่งปันและเช่าเครื่องจักรทางการเกษตรที่ครบวงจรที่สุด
              เชื่อมต่อเกษตรกรและเจ้าของเครื่องจักรทั่วประเทศไทย
            </p>

            {/* Newsletter Signup */}
            <div className="pt-4">
              <p className="text-sm font-medium text-white mb-2">
                รับข่าวสารและโปรโมชั่น
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="อีเมลของคุณ"
                  className="flex-1 px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
                <button className="px-4 py-2 rounded-xl bg-linear-to-r from-emerald-500 to-teal-500 text-white hover:opacity-90 transition-opacity">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 pt-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:bg-emerald-500/10 hover:text-emerald-400 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h3 className="font-bold text-white mb-4">เมนูลัด</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-emerald-400 transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-emerald-400 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Support */}
          <div>
            <h3 className="font-bold text-white mb-4">ช่วยเหลือ</h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-emerald-400 transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-emerald-400 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Contact Info */}
          <div>
            <h3 className="font-bold text-white mb-4">ติดต่อเรา</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-slate-800">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                </div>
                <span className="text-sm text-slate-400">
                  123 ถนนงามวงศ์วาน แขวงลาดยาว
                  <br />
                  เขตจตุจักร กรุงเทพฯ 10900
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-slate-800">
                  <Phone className="w-4 h-4 text-emerald-400" />
                </div>
                <a
                  href="tel:021234567"
                  className="text-sm text-slate-400 hover:text-emerald-400 transition-colors"
                >
                  02-123-4567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-slate-800">
                  <Mail className="w-4 h-4 text-emerald-400" />
                </div>
                <a
                  href="mailto:support@kasetconnect.com"
                  className="text-sm text-slate-400 hover:text-emerald-400 transition-colors"
                >
                  support@kasetconnect.com
                </a>
              </li>
            </ul>

            {/* Business Hours */}
            <div className="mt-6 p-4 rounded-xl bg-slate-800/50 border border-slate-700">
              <p className="text-sm font-medium text-white mb-1">เวลาทำการ</p>
              <p className="text-xs text-slate-400">
                จันทร์ - ศุกร์: 08:00 - 18:00
              </p>
              <p className="text-xs text-slate-400">เสาร์: 09:00 - 15:00</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-4 md:px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} KasetConnect. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-xs">
              <Link
                href="/privacy"
                className="text-slate-500 hover:text-emerald-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-slate-500 hover:text-emerald-400 transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="text-slate-500 hover:text-emerald-400 transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

import * as React from "react";
import { useSetShell } from "@/context/ShellContext";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Phone, ArrowRight, ChevronLeft } from "lucide-react";
import { OTPInput } from "@/components/auth/OTPInput";

export function Login({
  onLogin,
}: {
  onLogin: (userData: { name: string; profile: string; mobile: string }) => void;
}) {
  const [mobile, setMobile] = React.useState("");
  const [isMobileError, setIsMobileError] = React.useState(false);
  const [otp, setOtp] = React.useState("");
  const [isOtpSent, setIsOtpSent] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleMobileLogin = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!isOtpSent) {
      if (!/^[6-9]\d{9}$/.test(mobile)) {
        setIsMobileError(true);
        return;
      }
      setIsMobileError(false);
      setIsLoading(true);
      // Simulate sending OTP
      setTimeout(() => {
        setIsOtpSent(true);
        setIsLoading(false);
      }, 1500);
    } else {
      setIsLoading(true);
      // Simulate verification
      setTimeout(() => {
        onLogin({
          name: "User",
          profile: "https://api.dicebear.com/7.x/avataaars/svg?seed=" + mobile,
          mobile: mobile,
        });
        setIsLoading(false);
      }, 1500);
    }
  };

  useSetShell({
    title: null,
    footer: null,
    bottomNav: null,
  });

  if (isOtpSent) {
    return (
      <div className="flex flex-col items-center justify-center min-h-70vh] py-4">
          <div className="text-center mb-8 w-full">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-slate-50 shadow-sm mb-6">
              <Phone className="h-8 w-8 text-[#FF9933]" />
            </div>
            <h1 className="text-2xl font-bold text-slate-700 tracking-tight mb-3">Verify your phone</h1>
            <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-xs mx-auto">
              We've sent a 6-digit code to <span className="text-slate-900 font-bold">+91 {mobile}</span>. Enter it below to continue.
            </p>
            <button
              type="button"
              onClick={() => setIsOtpSent(false)}
              className="mt-4 text-xs font-bold text-[#B35300] hover:text-orange-700 underline underline-offset-4"
            >
              Wrong number? Edit mobile
            </button>
          </div>

          <Card className="p-6 border-slate-100 shadow-xl shadow-slate-200/50 w-full max-w-sm">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1 block">
                  Enter OTP
                </label>
                <OTPInput
                  value={otp}
                  onChange={setOtp}
                  onEnter={handleMobileLogin}
                  length={6}
                  className="justify-center"
                />
              </div>

              <div className="space-y-4">
                <Button
                  onClick={handleMobileLogin}
                  className="w-full h-14 text-base font-bold rounded-2xl shadow-lg shadow-orange-200"
                  disabled={isLoading || otp.length < 6}
                >
                  {isLoading ? (
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    "Verify & Continue"
                  )}
                </Button>

                <div className="text-center">
                  <p className="text-sm text-slate-500 font-medium">
                    Didn't get OTP?{" "}
                    <button 
                      type="button"
                      className="text-[#B35300] font-bold hover:underline"
                      onClick={() => {
                        setOtp("");
                      }}
                    >
                      Resend OTP
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <p className="mt-8 text-center text-xs text-slate-400 font-medium px-8 w-full">
            Securing your spiritual journey with Yajro
          </p>
        </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] py-4">
        <div className="text-center mb-8 w-full">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-br from-[#FF9933] to-amber-500 shadow-xl shadow-orange-200 mb-4">
            <img src="/images/yajro-logo.png" alt="Yajro Logo" />
          </div>
          <h1 className="text-2xl font-bold text-slate-700 tracking-tight">Welcome to Yajro</h1>
          <p className="text-slate-500 mt-2 font-medium">Your gateway to spiritual wellness</p>
        </div>

        <Card className="p-6 border-slate-100 shadow-xl shadow-slate-200/50 w-full max-w-sm">
          <form onSubmit={handleMobileLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                Mobile Number
              </label>
            <div className={`relative flex items-center bg-slate-50 rounded-2xl mt-1 ring-1 transition-all focus-within:bg-white overflow-hidden ${
              isMobileError 
                ? "ring-red-500 bg-red-50" 
                : "ring-slate-200 focus-within:ring-[#FF9933]/45"
            }`}>
                <div className="pl-4 flex items-center pointer-events-none">
                  <span className="text-lg font-bold text-slate-700 tracking-[0.2em]">+91</span>
                  <div className="mx-2 h-6 w-[1px] bg-slate-300" />
                </div>
                <input
                  type="tel"
                  placeholder="Enter mobile number"
                  value={mobile}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    if (value.length > 0 && !/^[6-9]/.test(value)) {
                      return;
                    }
                    if (value.length <= 10) {
                      setMobile(value);
                      if (value.length === 10) {
                        setIsMobileError(false);
                      }
                    }
                  }}
                  required
                  className="w-full py-5 text-xl font-bold text-slate-700 tracking-[0.4em] bg-transparent outline-none placeholder:text-slate-300 placeholder:tracking-normal placeholder:font-medium"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-14 text-base font-bold rounded-2xl shadow-lg shadow-orange-100"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Send OTP
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </Card>

        <p className="mt-8 text-center text-xs text-slate-400 font-medium px-8 w-full">
          By continuing, you agree to Yajro's{" "}
          <a href="#" className="text-[#B35300] underline underline-offset-2">Terms of Service</a> and{" "}
          <a href="#" className="text-[#B35300] underline underline-offset-2">Privacy Policy</a>
        </p>
      </div>
  );
}

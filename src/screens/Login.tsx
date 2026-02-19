import * as React from "react";
import { useSetShell } from "@/context/ShellContext";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Mail, ArrowRight, ChevronLeft } from "lucide-react";
import { OTPInput } from "@/components/auth/OTPInput";

export function Login({
  onLogin,
}: {
  onLogin: (userData: { name: string; profile: string; email: string }) => void;
}) {
  const [email, setEmail] = React.useState("");
  const [otp, setOtp] = React.useState("");
  const [isOtpSent, setIsOtpSent] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isOtpSent) {
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
          name: email.split("@")[0],
          profile: "https://api.dicebear.com/7.x/avataaars/svg?seed=" + email,
          email: email,
        });
        setIsLoading(false);
      }, 1500);
    }
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    // Simulate Google Login
    setTimeout(() => {
      onLogin({
        name: "Srinivas Rao",
        profile: "https://api.dicebear.com/7.x/avataaars/svg?seed=srinivas",
        email: "srinivas.rao@example.com",
      });
      setIsLoading(false);
    }, 1500);
  };

  useSetShell({
    title: null,
    footer: null,
    bottomNav: null,
  });

  if (isOtpSent) {
    return (
      <div className="flex flex-col min-h-[80vh] px-2 py-4">
          <div className="mb-6">
            <button
              onClick={() => setIsOtpSent(false)}
              className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          </div>

          <div className="text-center mb-6">
            <h1 className="text-xl font-black text-slate-900 tracking-tight mb-2">Enter OTP Code</h1>
            <p className="text-sm text-slate-500 font-medium px-4 leading-relaxed">
              Check your Email! We've sent a one-time verification code to <span className="text-slate-900 font-bold">{email}</span>. Enter the code below to verify your account.
            </p>
          </div>

          <div className="space-y-8">
            <OTPInput
              value={otp}
              onChange={setOtp}
              length={6}
              className="justify-center gap-3"
            />

            <Button
              onClick={handleEmailLogin}
              className="w-full h-14 text-base font-bold rounded-full shadow-lg"
              disabled={isLoading || otp.length < 6}
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "Continue"
              )}
            </Button>

            <div className="text-center">
              <p className="text-sm text-slate-500 font-medium">
                Didn't get OTP?{" "}
                <button 
                  type="button"
                  className="text-[#B35300] font-bold hover:underline"
                  onClick={() => {
                    // Reset and resend logic here
                    setOtp("");
                  }}
                >
                  Resend OTP
                </button>
              </p>
            </div>
          </div>
        </div>
    );
  }

  return (
    <div className="flex flex-col min-h-[80vh] px-2 py-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-br from-[#FF9933] to-amber-500 shadow-xl shadow-orange-200 mb-4 rotate-3">
            <span className="text-white text-3xl font-black">Y</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Welcome to Yajro</h1>
          <p className="text-slate-500 mt-2 font-medium">Your gateway to spiritual wellness</p>
        </div>

        <Card className="p-6 border-slate-100 shadow-xl shadow-slate-200/50">
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-2xl bg-slate-50 border-transparent px-4 py-4 pr-12 text-sm ring-1 ring-slate-200 shadow-sm outline-none focus:ring-2 focus:ring-[#FF9933]/45 transition-all focus:bg-white"
                />
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <Mail className="h-5 w-5" />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base font-bold rounded-2xl"
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

          <div className="relative my-8 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <span className="relative px-4 bg-white text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              Or continue with
            </span>
          </div>

          <Button
            type="button"
            variant="secondary"
            className="w-full h-12 border-slate-100 font-bold rounded-2xl gap-3"
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"
                fill="#EA4335"
              />
            </svg>
            Sign in with Google
          </Button>
        </Card>

        <p className="mt-8 text-center text-xs text-slate-400 font-medium px-8">
          By continuing, you agree to Yajro's{" "}
          <a href="#" className="text-[#B35300] underline underline-offset-2">Terms of Service</a> and{" "}
          <a href="#" className="text-[#B35300] underline underline-offset-2">Privacy Policy</a>
        </p>
      </div>
  );
}

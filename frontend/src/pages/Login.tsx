import React, { useState } from 'react';
import { Phone, Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuthStore } from '@/lib/authStore';

type AuthMode = 'phone' | 'email';

interface LoginProps {
  onNavigate: (page: string) => void;
}

export default function Login({ onNavigate }: LoginProps) {
  const { login } = useAuthStore();
  const [mode, setMode] = useState<AuthMode>('phone');

  // Phone/OTP state
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [otpError, setOtpError] = useState('');

  // Email/Password state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSendOtp = () => {
    setPhoneError('');
    const cleaned = phone.replace(/\s/g, '');
    if (!cleaned) {
      setPhoneError('Please enter your phone number.');
      return;
    }
    if (!/^\d{10}$/.test(cleaned)) {
      setPhoneError('Enter a valid 10-digit phone number.');
      return;
    }
    setOtpSent(true);
  };

  const handleVerifyOtp = () => {
    setOtpError('');
    if (!otp) {
      setOtpError('Please enter the OTP.');
      return;
    }
    if (otp.length !== 6) {
      setOtpError('OTP must be 6 digits.');
      return;
    }
    const name = `User ${phone.slice(-4)}`;
    login({ name, phone });
    onNavigate('home');
  };

  const handleEmailLogin = () => {
    setEmailError('');
    setPasswordError('');
    let valid = true;
    if (!email) {
      setEmailError('Please enter your email address.');
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Enter a valid email address.');
      valid = false;
    }
    if (!password) {
      setPasswordError('Please enter your password.');
      valid = false;
    }
    if (!valid) return;
    const name = email.split('@')[0];
    login({ name, phone: '', email });
    onNavigate('home');
  };

  const handleModeSwitch = (newMode: AuthMode) => {
    setMode(newMode);
    setPhoneError('');
    setOtpError('');
    setEmailError('');
    setPasswordError('');
    setOtpSent(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-primary/80 px-6 pt-12 pb-10 text-center">
        <img
          src="/assets/generated/murkimart-logo.dim_400x120.png"
          alt="MurkiMart"
          className="h-10 mx-auto mb-4 object-contain brightness-0 invert"
        />
        <h1 className="font-display font-bold text-2xl text-white">Welcome Back!</h1>
        <p className="text-white/80 text-sm mt-1">Login to continue shopping</p>
      </div>

      {/* Card */}
      <div className="flex-1 px-4 -mt-5">
        <div className="bg-white rounded-3xl shadow-card border border-border p-6">
          {/* Mode Toggle */}
          <div className="flex bg-muted rounded-2xl p-1 mb-6">
            <button
              onClick={() => handleModeSwitch('phone')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                mode === 'phone'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-muted-foreground'
              }`}
            >
              <Phone className="w-4 h-4" />
              Phone / OTP
            </button>
            <button
              onClick={() => handleModeSwitch('email')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                mode === 'email'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-muted-foreground'
              }`}
            >
              <Mail className="w-4 h-4" />
              Email
            </button>
          </div>

          {/* Phone / OTP Flow */}
          {mode === 'phone' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Mobile Number
                </label>
                <div className="flex items-center gap-2 border border-border rounded-xl px-3 py-2.5 focus-within:border-primary transition-colors">
                  <span className="text-sm font-medium text-muted-foreground">+91</span>
                  <div className="w-px h-4 bg-border" />
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value.replace(/\D/g, ''));
                      setPhoneError('');
                    }}
                    placeholder="Enter 10-digit number"
                    className="flex-1 text-sm outline-none bg-transparent text-foreground placeholder:text-muted-foreground"
                    disabled={otpSent}
                  />
                  {otpSent && (
                    <button
                      onClick={() => { setOtpSent(false); setOtp(''); setOtpError(''); }}
                      className="text-xs text-primary font-semibold"
                    >
                      Change
                    </button>
                  )}
                </div>
                {phoneError && (
                  <p className="text-xs text-destructive mt-1">{phoneError}</p>
                )}
              </div>

              {!otpSent ? (
                <button
                  onClick={handleSendOtp}
                  className="w-full bg-primary text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 active:scale-95 transition-all"
                >
                  Send OTP
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="space-y-4">
                  <div className="bg-secondary/10 rounded-xl p-3 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-secondary shrink-0" />
                    <p className="text-xs text-secondary font-medium">
                      OTP sent to +91 {phone}
                    </p>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5">
                      Enter 6-digit OTP
                    </label>
                    <input
                      type="tel"
                      inputMode="numeric"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => {
                        setOtp(e.target.value.replace(/\D/g, ''));
                        setOtpError('');
                      }}
                      placeholder="• • • • • •"
                      className="w-full border border-border rounded-xl px-4 py-3 text-center text-lg font-bold tracking-[0.5em] outline-none focus:border-primary transition-colors bg-transparent text-foreground placeholder:text-muted-foreground placeholder:tracking-normal"
                    />
                    {otpError && (
                      <p className="text-xs text-destructive mt-1">{otpError}</p>
                    )}
                  </div>
                  <button
                    onClick={handleVerifyOtp}
                    className="w-full bg-primary text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 active:scale-95 transition-all"
                  >
                    Verify & Login
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Email / Password Flow */}
          {mode === 'email' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Email Address
                </label>
                <div className="flex items-center gap-2 border border-border rounded-xl px-3 py-2.5 focus-within:border-primary transition-colors">
                  <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
                    placeholder="you@example.com"
                    className="flex-1 text-sm outline-none bg-transparent text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                {emailError && (
                  <p className="text-xs text-destructive mt-1">{emailError}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Password
                </label>
                <div className="flex items-center gap-2 border border-border rounded-xl px-3 py-2.5 focus-within:border-primary transition-colors">
                  <Lock className="w-4 h-4 text-muted-foreground shrink-0" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setPasswordError(''); }}
                    placeholder="Enter your password"
                    className="flex-1 text-sm outline-none bg-transparent text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                {passwordError && (
                  <p className="text-xs text-destructive mt-1">{passwordError}</p>
                )}
              </div>

              <button
                onClick={handleEmailLogin}
                className="w-full bg-primary text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 active:scale-95 transition-all"
              >
                Login
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Continue as Guest */}
          <button
            onClick={() => onNavigate('home')}
            className="w-full border-2 border-secondary text-secondary font-bold py-3 rounded-xl hover:bg-secondary/5 active:scale-95 transition-all text-sm"
          >
            Continue as Guest
          </button>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-muted-foreground mt-4 px-4">
          By continuing, you agree to MurkiMart's Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}

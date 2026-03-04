"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth"
import Image from "next/image"
import Link from "next/link"
import { BookOpen, Eye, EyeOff  } from "lucide-react"

export function LoginForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    const success = await login(username, password)
    if (!success) setError("Invalid username or password")
    setIsLoading(false)
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Abril+Fatface&family=DM+Sans:wght@300;400;500&display=swap');

        .amari-root { font-family: 'DM Sans', sans-serif; }

        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(72px);
          opacity: 0.5;
          animation: drift 12s ease-in-out infinite;
          pointer-events: none;
        }
        .blob-1 {
          width: 420px; height: 420px;
          background: radial-gradient(circle, #a3b8e8 0%, #7b9ad6 60%, transparent 100%);
          top: -120px; left: -100px;
        }
        .blob-2 {
          width: 340px; height: 340px;
          background: radial-gradient(circle, #c5d3f0 0%, #a3b8e8 60%, transparent 100%);
          bottom: -80px; right: -80px;
          animation-delay: -4s;
        }
        .blob-3 {
          width: 240px; height: 240px;
          background: radial-gradient(circle, #dfe6f5 0%, #c5d3f0 60%, transparent 100%);
          top: 38%; left: 18%;
          animation-delay: -8s;
        }
        @keyframes drift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(16px, -22px) scale(1.04); }
          66%       { transform: translate(-10px, 12px) scale(0.97); }
        }

        .particle {
          position: absolute;
          border-radius: 50%;
          opacity: 0;
          animation: float-up 8s ease-in infinite;
          pointer-events: none;
        }
        @keyframes float-up {
          0%   { opacity: 0;   transform: translateY(0) scale(0); }
          10%  { opacity: 0.5; transform: translateY(-18px) scale(1); }
          90%  { opacity: 0.1; transform: translateY(-150px) scale(0.6); }
          100% { opacity: 0;   transform: translateY(-170px) scale(0); }
        }

        .card-enter {
          animation: card-in 0.65s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes card-in {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .logo-halo {
          animation: halo-pulse 3.5s ease-in-out infinite;
        }
        @keyframes halo-pulse {
          0%, 100% { box-shadow: 0 0 0 4px rgba(17,50,156,0.15), 0 0 0 8px rgba(17,50,156,0.07); }
          50%       { box-shadow: 0 0 0 8px rgba(17,50,156,0.06), 0 0 0 16px rgba(17,50,156,0.03); }
        }

        .color-band {
          height: 5px;
          background: linear-gradient(90deg, #7b9ad6 0%, #2e4fb3 35%, #11329c 65%, #7b9ad6 100%);
          background-size: 200% 100%;
          animation: band-shift 4s ease infinite;
        }
        @keyframes band-shift {
          0%   { background-position: 0% 0%; }
          50%  { background-position: 100% 0%; }
          100% { background-position: 0% 0%; }
        }

        .ornament-divider {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #7b9ad6;
          font-size: 11px;
          letter-spacing: 0.08em;
        }
        .ornament-divider::before,
        .ornament-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, #a3b8e8, transparent);
        }

        .amari-input {
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }
        .amari-input:focus {
          border-color: #2e4fb3 !important;
          box-shadow: 0 0 0 3px rgba(17,50,156,0.15) !important;
          background: #fff !important;
          outline: none !important;
        }

        .signin-btn {
          background: linear-gradient(135deg, #1a3faa 0%, #11329c 45%, #0d2880 100%);
          transition: all 0.25s ease;
          position: relative;
          overflow: hidden;
        }
        .signin-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.25s;
        }
        .signin-btn:hover::before { opacity: 1; }
        .signin-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 28px rgba(17,50,156,0.45);
        }
        .signin-btn:active   { transform: translateY(0); }
        .signin-btn:disabled { opacity: 0.7; transform: none; box-shadow: none; }

        .manual-btn {
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(17,50,156,0.3);
          color: #11329c;
          transition: all 0.25s ease;
          box-shadow: 0 4px 20px rgba(17,50,156,0.1);
        }
        .manual-btn:hover {
          background: #fff;
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(17,50,156,0.2);
          border-color: rgba(17,50,156,0.5);
        }

        .dot-loader span {
          display: inline-block;
          width: 5px; height: 5px;
          background: rgba(255,255,255,0.85);
          border-radius: 50%;
          margin: 0 2px;
          animation: dot-bounce 1.1s ease-in-out infinite;
        }
        .dot-loader span:nth-child(2) { animation-delay: 0.18s; }
        .dot-loader span:nth-child(3) { animation-delay: 0.36s; }
        @keyframes dot-bounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40%            { transform: scale(1);   opacity: 1; }
        }

        .error-msg {
          animation: shake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97);
        }
        @keyframes shake {
          10%, 90% { transform: translateX(-2px); }
          20%, 80% { transform: translateX(3px); }
          30%, 50%, 70% { transform: translateX(-3px); }
          40%, 60% { transform: translateX(3px); }
        }
      `}</style>

      <div
        className="amari-root min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
        style={{ background: "linear-gradient(145deg, #dfe6f5 0%, #e2e9f7 35%, #dde4f3 65%, #dfe6f5 100%)" }}
      >
        {/* blobs */}
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />

        {/* particles */}
        {[...Array(8)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${10 + i * 11}%`,
            bottom: `${5 + (i % 3) * 8}%`,
            animationDelay: `${i * 1.1}s`,
            animationDuration: `${7 + (i % 3)}s`,
            background: i % 2 === 0 ? "#7b9ad6" : "#a3b8e8",
            width:  `${4 + (i % 3)}px`,
            height: `${4 + (i % 3)}px`,
          }} />
        ))}

        {/* dot-grid texture */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "radial-gradient(circle, rgba(17,50,156,0.07) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }} />

        {/* card */}
        <div className="card-enter relative z-10 w-full" style={{ maxWidth: "520px" }}>

          {/* top pip */}
          <div className="flex justify-center mb-5">
            <div style={{
              height: "3px", width: "56px", borderRadius: "2px",
              background: "linear-gradient(90deg, #7b9ad6, #11329c, #a3b8e8)",
            }} />
          </div>

          <div
            className="relative rounded-3xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.84)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.92)",
              boxShadow: "0 24px 80px rgba(17,50,156,0.13), 0 4px 24px rgba(17,50,156,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
            }}
          >
            <div className="color-band" />

            <div className="px-10 pt-10 pb-9">

              {/* branding + logo */}
              <div className="flex flex-col items-center mb-4">

                <h1 style={{
                  fontFamily: "'Abril Fatface', Georgia, serif",
                  fontSize: "38px",
                  fontWeight: 400,
                  color: "#0d2880",
                  letterSpacing: "1px",
                  textAlign: "center",
                  lineHeight: 1.15,
                  marginBottom: "0px",
                }}>
                  Amari's
                  <span style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontStyle: "normal", fontWeight: 400, color: "#11329c", fontSize: "15px", letterSpacing: "3px", textTransform: "uppercase" as const, marginTop: "4px" }}>
                   Scoops &amp; Savours
                  </span>
                </h1>

                <div
                  className="logo-halo my-4 rounded-full"
                  style={{ padding: "3px", background: "linear-gradient(135deg, #a3b8e8, #7b9ad6, #c5d3f0)" }}
                >
                  <div
                    className="rounded-full overflow-hidden flex items-center justify-center"
                    style={{ width: "80px", height: "80px", background: "linear-gradient(135deg, #dfe6f5, #c5d3f0)" }}
                  >
                    <Image
                      src="/amari-blue-logo.png"
                      alt="Amari's Scoops & Savours"
                      width={70}
                      height={70}
                      className="object-contain"
                    />
                  </div>
                </div>

                <p style={{ fontSize: "15px", color: "#64748b", textAlign: "center", }}>
                  Sign in to access the management system
                </p>
              </div>

              {/* form */}
              <form onSubmit={handleSubmit} className="space-y-4">

                <div className="space-y-1.5">
                  <Label htmlFor="username" style={{ fontSize: "12px", fontWeight: 500, color: "#11329c", letterSpacing: "0.03em" }}>
                    Username
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    required
                    className="amari-input pl-4 pr-4 h-12 rounded-xl text-sm"
                    style={{
                      background: "rgba(223,230,245,0.5)",
                      border: "1.5px solid rgba(17,50,156,0.25)",
                      color: "#0d2880",
                      fontSize: "13.5px",
                    }}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="password" style={{ fontSize: "12px", fontWeight: 500, color: "#11329c", letterSpacing: "0.03em" }}>
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                      className="amari-input pl-4 pr-10 h-12 rounded-xl text-sm"
                      style={{
                        background: "rgba(223,230,245,0.5)",
                        border: "1.5px solid rgba(17,50,156,0.25)",
                        color: "#0d2880",
                        fontSize: "13.5px",
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                      style={{ color: "#7b9ad6" }}
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div
                    className="error-msg flex items-center gap-2 px-3 py-2.5 rounded-xl"
                    style={{ background: "rgba(254,226,226,0.7)", border: "1px solid rgba(252,165,165,0.5)", color: "#b91c1c" }}
                  >
                    <span>⚠</span>
                    <span style={{ fontSize: "12.5px" }}>{error}</span>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="signin-btn w-full h-12 rounded-xl text-white font-medium mt-1 border-0"
                  style={{ fontSize: "13.5px", letterSpacing: "0.02em" }}
                >
                  {isLoading ? (
                    <span className="dot-loader flex items-center gap-1">
                      <span /><span /><span />
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Sign In
                    </span>
                  )}
                </Button>
              </form>

              {/* footer */}
              <div className="mt-6 text-center">
                <p style={{ fontSize: "10.5px", color: "#94a3b8" }}>
                  All rights reserved 2025 · Arf2 IM
                </p>
              </div>

            </div>
          </div>

          {/* bottom pips */}
          <div className="flex justify-center mt-5 gap-2">
            {["#7b9ad6", "#2e4fb3", "#11329c", "#2e4fb3", "#7b9ad6"].map((c, i) => (
              <div key={i} style={{
                width: i === 2 ? "24px" : "6px",
                height: "3px",
                borderRadius: "2px",
                background: c,
                opacity: 0.65,
              }} />
            ))}
          </div>

        </div>
      </div>

      {/* floating manual button */}
      <Link href="/user-manual" target="_blank" className="fixed bottom-6 right-6 z-50">
        <button className="manual-btn flex items-center gap-2 px-4 py-2.5 rounded-2xl font-medium text-sm cursor-pointer">
          <BookOpen className="w-4 h-4" style={{ color: "#11329c" }} />
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 500 }}>
            User Manual
          </span>
        </button>
      </Link>
    </>
  )
}
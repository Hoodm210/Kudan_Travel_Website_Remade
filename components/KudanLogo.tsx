import React from "react";

interface KudanLogoProps {
  height?: number;
  className?: string;
}

export default function KudanLogo({ height = 40, className = "" }: KudanLogoProps) {
  return (
    <div className={`relative flex items-center gap-3 ${className}`}>
      <img
        src="/logo.png"
        alt="Kudan Travel Logo"
        style={{ height: `${height}px` }}
        className="w-auto object-contain"
      />
    </div>
  );
}
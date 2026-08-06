import Image from "next/image";

interface LogoProps {
  variant?: "default" | "footer" | "light";
  className?: string;
}

export function Logo({ variant = "default", className = "" }: LogoProps) {
  const sizes = {
    default: { width: 160, height: 44 },
    footer: { width: 140, height: 38 },
    light: { width: 180, height: 50 },
  };

  const s = sizes[variant];

  return (
    <Image
      src="/logo-cliklink.png"
      alt="ClikLink Internet"
      width={s.width}
      height={s.height}
      className={`object-contain ${className}`}
      priority
    />
  );
}

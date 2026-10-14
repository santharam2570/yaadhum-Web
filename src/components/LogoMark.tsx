import Image from "next/image";

type Props = {
  size?: number;
  orbit?: boolean;
  priority?: boolean;
  className?: string;
};

export function LogoMark({ size = 40, orbit = false, priority = false, className = "" }: Props) {
  return (
    <div
      className={`relative shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {orbit && (
        <>
          <div className="absolute -inset-[18%] rounded-full bg-ember-500/30 blur-3xl animate-glow" />
          <div className="absolute -inset-[12%] rounded-full border border-ember-500/25 animate-spin-slow">
            <span className="absolute -top-1.5 left-1/2 size-3 -translate-x-1/2 rounded-full bg-flame shadow-[0_0_18px_4px] shadow-flame/70" />
          </div>
          <div className="absolute -inset-[26%] rounded-full border border-dashed border-gold/15 animate-spin-reverse">
            <span className="absolute top-1/2 -right-1 size-2 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_14px_3px] shadow-gold/60" />
          </div>
        </>
      )}
      <div className="relative size-full overflow-hidden rounded-full ring-1 ring-ember-500/40 shadow-[0_0_40px_-6px] shadow-ember-500/60">
        <Image
          src="/logo-mark.jpg"
          alt="Yaadhum International Technologies logo"
          fill
          sizes={`${size}px`}
          priority={priority}
          className="scale-[1.06] object-cover"
        />
      </div>
    </div>
  );
}

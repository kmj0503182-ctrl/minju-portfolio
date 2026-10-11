import Image from "next/image";
import { ImageIcon } from "lucide-react";

export function ImageSlot({
  src,
  alt,
  label,
  className = "",
  dark = false,
}: {
  src?: string;
  alt: string;
  label: string;
  className?: string;
  dark?: boolean;
}) {
  if (src) {
    return (
      <div className={`relative overflow-hidden rounded-2xl ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 50vw, 320px"
          unoptimized={src.startsWith("http")}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed p-3 text-center ${
        dark ? "border-white/30 bg-white/10 text-emerald-100" : "border-line bg-mint text-sage"
      } ${className}`}
    >
      <ImageIcon className="h-6 w-6" />
      <span className="text-xs leading-snug font-medium">{label}</span>
    </div>
  );
}

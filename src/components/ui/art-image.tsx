"use client";

export function ArtImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={640}
      height={384}
      loading="lazy"
      onError={(e) => (e.currentTarget.style.display = "none")}
      className={className}
    />
  );
}

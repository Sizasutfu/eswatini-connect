"use client";

import Image from "next/image";
import { useState } from "react";

interface Props {
  src: string;
  alt: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  className?: string;
}

/**
 * next/image wrapper with a graceful gradient fallback
 * if the remote image fails to load.
 */
export default function BusinessImage({
  src,
  alt,
  fill = true,
  sizes,
  priority = false,
  className,
}: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className="w-full h-full min-h-[120px] bg-gradient-to-br from-brand-greenLight to-brand-goldLight"
        role="img"
        aria-label={alt}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      sizes={sizes}
      priority={priority}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
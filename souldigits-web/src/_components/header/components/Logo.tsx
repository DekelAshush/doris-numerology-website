"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import logoImage from "../../../../public/Logo.png";

function Logo() {
  return (
    <Link href="/" className="shrink-0">
      <Image
        src={logoImage}
        alt="Soul Digits Logo"
        unoptimized
        className="h-8 w-8 rounded-full object-cover md:h-14 md:w-14"
        priority
      />
    </Link>
  );
}

export default Logo;

"use client";
import React from "react";
import Image from "next/image";

type RoleBlock = {
  title: string;
  bullets: string[];
  imageSrc?: string;
  imageAlt?: string;
};

const Column: React.FC<RoleBlock> = ({
  title,
  bullets,
  imageSrc,
  imageAlt,
}) => (
  <div className="flex flex-col items-start">
    <h4 className="text-2xl font-serif text-[#7f95b3] mb-2">{title}</h4>

    {imageSrc && (
      <div className="w-full flex justify-center mt-1 mb-4">
        <Image
          src={imageSrc}
          alt={imageAlt ?? title}
          width={260}
          height={200}
          className="h-40 md:h-48 w-auto object-contain drop-shadow-md"
          priority={false}
        />
      </div>
    )}

    <ul className="list-disc pl-5 text-wedding-olive space-y-2 mb-4">
      {bullets.map((b, i) => (
        <li key={i} className="text-base text-wedding-olive">
          {b}
        </li>
      ))}
    </ul>
  </div>
);

const DressCodePoster: React.FC<{
  bridesmaids: RoleBlock;
  groomsmen: RoleBlock;
  note?: string;
}> = ({ bridesmaids, groomsmen, note }) => {
  return (
    <div className="p-6 md:p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative">
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-wedding-gold/30" />

        <Column {...bridesmaids} />
        <Column {...groomsmen} />
      </div>

      {note && (
        <p className="mt-6 text-center text-sm md:text-base text-[#7f95b3]">
          • {note}
        </p>
      )}
    </div>
  );
};

export default DressCodePoster;

"use client";

type Props = {
  text: string;
  sender: string;
};

function WhatsAppTestimonialBubble({ text, sender }: Props) {
  return (
    <div className="w-full">
      <div className="relative w-full rounded-lg rounded-ee-sm bg-[#005c4b] px-4 py-3 text-[15px] leading-relaxed text-[#e9edef] shadow-md">
        <p className="mb-1.5 text-[12px] font-semibold text-[#8ab4a8]">
          {sender}
        </p>
        <p className="whitespace-pre-line text-[#e9edef]">{text}</p>
        <div className="mt-2 flex justify-end">
          <span className="text-[11px] text-[#53bdeb]" aria-hidden="true">
            ✓✓
          </span>
        </div>
      </div>
    </div>
  );
}

export default WhatsAppTestimonialBubble;

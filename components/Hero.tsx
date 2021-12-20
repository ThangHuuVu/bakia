import Link from "next/link";
import { ProgressRing } from "../components/ProgressRing";
import { useEffect, useState } from "react";
import { useInterval } from "@/lib/hooks/useInterval";
import { Slide } from "@/lib/cms/datocms";

const Hero = ({ slides }) => {
  const ELAPSE_TIME = 5000;
  const DELAY = 50;
  const [currentHighlight, setCurrentHighlight] = useState(1);
  const [progress, setProgress] = useState(0);

  useInterval(() => {
    if (progress < 100) {
      setProgress((DELAY / (ELAPSE_TIME - DELAY)) * 100 + progress);
    }
  }, DELAY);

  useEffect(() => {
    if (progress >= 100) {
      setProgress(0);
      setCurrentHighlight(currentHighlight === slides.length ? 1 : currentHighlight + 1);
    }
  }, [progress, currentHighlight, slides.length]);
  return (
    <div className="hidden md:flex md:flex-col w-[18.5rem] h-[25rem] uppercase italic font-black md:gap-[1.875rem]">
      {slides.map((slide) => (
        <SlideItem
          key={slide.order}
          slide={slide}
          order={slide.order}
          currentHighlight={currentHighlight}
          progress={currentHighlight === slide.order ? progress : 0}
        />
      ))}
    </div>
  );
};

interface SlideItemProps {
  slide: Slide;
  currentHighlight: number;
  progress: number;
  order: number;
}

const SlideItem = ({ slide, currentHighlight, progress, order }: SlideItemProps) => {
  const [isHighlighting, setIsHighlighting] = useState<boolean>(false);

  useEffect(() => {
    setIsHighlighting(currentHighlight === order);
  }, [currentHighlight, order]);

  return (
    <div
      className={`flex gap-4 ${
        isHighlighting ? "opacity-100" : " opacity-[0.4]"
      } transition-opacity`}
    >
      <ProgressRing
        strokeWidth={isHighlighting ? 2 : 1}
        progress={progress}
        running={isHighlighting}
      >
        <svg
          width="11"
          height="11"
          viewBox="0 0 11 11"
          xmlns="http://www.w3.org/2000/svg"
          fill="black"
          className={`transform transition-transform ${isHighlighting ? "rotate-180" : "rotate-0"}`}
        >
          <path d="M3.2042 4.87594C3.22446 4.86581 3.25485 4.85568 3.27512 4.84555C5.30146 6.87189 7.3278 8.89823 9.35414 10.9246L10.9246 10.9246L10.9246 9.27311C8.90835 7.2569 6.88201 5.23055 4.84553 3.19408C4.99751 3.19408 5.07856 3.19408 5.16975 3.19408C6.09173 3.19408 7.00359 3.19408 7.92557 3.19408C8.87795 3.19408 9.83034 3.19408 10.7827 3.19408C10.8232 3.19408 10.884 3.20421 10.9246 3.20421L10.9246 0.924576L0.924562 0.924575L0.924561 10.9246L3.2042 10.9246C3.2042 8.89823 3.2042 6.88202 3.2042 4.87594Z" />
        </svg>
      </ProgressRing>
      <div className="transition-all">
        <h2 className="text-[1.625rem] leading-none mb-2">{slide.title}</h2>
        <h3 className="text-base">{slide.subheading}</h3>
        {isHighlighting && (
          <>
            <p
              className="not-italic font-normal normal-case font-body"
              dangerouslySetInnerHTML={{
                __html: slide.paragraph.replace(/(?:\r\n|\r|\n)/g, "<br>"),
              }}
            ></p>
            {slide.cta && (
              <Link href={slide.cta.href}>
                <a className="w-[8.5rem] h-[2.625rem] flex items-center justify-center mt-4 rounded-lg bg-main text-lg italic font-bold leading-[1.438rem] text-center uppercase md:text-xl md:leading-[1.313rem]">
                  {slide.cta.title}
                </a>
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Hero;

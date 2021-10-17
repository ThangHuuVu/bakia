import AboutLayout from "@/components/AboutLayout";
import Generations from "@/components/Generations";
import { getAbout } from "@/lib/cms/datocms";
import { InferGetStaticPropsType } from "next";
import Image from "next/image";

export const getStaticProps = async ({ preview = false }) => {
  const about = (await getAbout(preview)) || [];

  return {
    props: {
      about,
    },
  };
};

const AboutPage = ({
  about: { heading, subheading, intro, generations, images },
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <AboutLayout title="Bakia - About">
    <div className="relative flex flex-col items-center h-full">
      <div className="h-[21.438rem] w-full relative overflow-hidden md:h-[29.688rem] md:overflow-visible">
        <div className="absolute transform right-[-12.5rem] h-full md:hidden">
          <Image
            width={508}
            height={343}
            src={images[0].url}
            alt="Background"
            blurDataURL={images[0].blurUpThumb}
          />
        </div>
        <div className="absolute right-[-8.188rem] hidden h-full md:block">
          <Image
            width={804}
            height={475}
            src={images[0].url}
            alt="Background"
            blurDataURL={images[0].blurUpThumb}
          />
        </div>
        <div className="flex flex-col-reverse left-4 prose top-[11.625rem] absolute md:left-[6.625rem] md:top-[12.5rem]">
          <h2 className="md:before:absolute md:before:border-[0.5px] md:before:border-black md:before:border-solid md:before:w-[5.563rem] md:before:left-[-6.125rem] md:before:top-[2.125rem]">
            {heading}
          </h2>
          <h3>{subheading}</h3>
        </div>
      </div>
      <div className="relative md:h-[51.25rem] md:w-content px-4 pt-20 pb-[5.875rem] bg-white md:pt-[7.75rem] md:px-content">
        <div className="md:w-full md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:px-content md:flex md:justify-between">
          <p
            className="mb-40 bg-white text-altGrey  md:max-w-[45.5rem] md:mb-0"
            dangerouslySetInnerHTML={{ __html: intro }}
          />
          <p className="hidden sm:block uppercase rotate-90 tracking-[0.5rem] text-xs leading-tight text-black font-body after:absolute after:w-2 after:h-2 after:bg-black after:top-1 after:right-[-2.5rem]">
            bakia toys · 2020
          </p>
        </div>
      </div>
      <Generations generations={generations} images={images.slice(1, images.length)} />
    </div>
  </AboutLayout>
);

export default AboutPage;

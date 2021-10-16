import Layout from "@/components/Layout";
import { getAbout } from "@/lib/cms/datocms";
import { InferGetStaticPropsType } from "next";
import Image from "next/image";
import { useState } from "react";

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
  <Layout title="Bakia - About">
    <div className="relative">
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
        <div className="absolute right-[-8.188rem] hidden h-full md:block md:top-[-3.188rem]">
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
      <div className="px-4 pt-20 pb-[5.875rem] bg-white md:w-screen md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:top-[26.5rem] md:px-content md:flex md:justify-between">
        <p
          className="mb-40 bg-white text-altGrey  md:max-w-[45.5rem] md:mb-0"
          dangerouslySetInnerHTML={{ __html: intro }}
        />
        <p className="hidden sm:block uppercase rotate-90 tracking-[0.5rem] text-xs leading-tight text-black font-body after:absolute after:w-2 after:h-2 after:bg-black after:top-1 after:right-[-2.5rem]">
          bakia toys · 2020
        </p>
      </div>
      <Generation generations={generations} images={images.slice(1, images.length)} />
    </div>
  </Layout>
);

const Generation = ({ generations, images }) => {
  const [current, setCurrent] = useState(0);
  return (
    <div className="relative">
      <p className="font-light text-[1.75rem] leading-8 text-center text-black absolute top-[-29.375rem]">
        {generations.title}
      </p>
      <div className="mt-[19.375rem] w-full h-[11.375rem] bg-white prose relative  px-5 pt-14 md:hidden">
        <div className="absolute left-[-8.5rem] top-[-23.75rem]">
          <Image
            width={336}
            height={380}
            src={images[current].url}
            blurDataURL={images[current].blurUpThumb}
            alt={generations.generations[current].title}
          />
        </div>
        <div className="absolute right-4 top-[-23.75rem] space-y-4">
          {images.map((image, idx) => {
            return (
              <div
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`${
                  idx === current ? "border-2 border-main" : "border border-black"
                } rounded-full w-[3.75rem] h-[3.75rem] relative`}
                style={{
                  backgroundImage: `url(${image.url})`,
                  backgroundSize: "90px 110px",
                  backgroundPosition: "50% -5%",
                  backgroundRepeat: "no-repeat",
                }}
              >
                {idx === images.length - 1 && (
                  <span className="text-[2.25rem] text-[#768489] absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                    ?
                  </span>
                )}
              </div>
            );
          })}
        </div>
        <h2 className="absolute transform -translate-x-1/2 left-1/2 top-[-0.813rem] after:bg-gradient-to-r after:from-main after:to-white after:w-[10.25rem] after:h-1 after:absolute after:bottom-[-1.25rem] after:block after:left-1/2 after:-translate-x-1/2">
          {generations.generations[current].name}
        </h2>
        <p className="">{generations.generations[current].description}</p>
      </div>
    </div>
  );
};

export default AboutPage;

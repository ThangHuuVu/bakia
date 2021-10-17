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
  </Layout>
);

const Generations = ({ generations, images }) => {
  const [current, setCurrent] = useState(0);
  return (
    <>
      {/* Mobile */}
      <div className="relative sm:hidden">
        <p className="font-light text-[1.75rem] leading-8 text-center text-black absolute top-[-10rem]">
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
      {/* Desktop */}
      <div className="relative hidden w-full md:block h-[41.438rem]">
        <p className="absolute font-light text-4xl leading-[2.625rem] text-center text-black top-[-19.875rem] transform -translate-x-1/2 left-1/2">
          {generations.title}
        </p>
        <div className="absolute bottom-0 h-[50.375rem] left-[-3.75rem]">
          <Image
            width={710}
            height={806}
            src={images[current].url}
            blurDataURL={images[current].blurUpThumb}
            alt={generations.generations[current].title}
          />
          <div className="w-[56.875rem] h-0 border-0.5 border-black rotate-90 absolute bottom-[28.438rem] left-[-6.25rem] after:absolute after:h-2 after:w-2 after:bg-black after:bottom-[-0.25rem] after:left-[-0.5rem]"></div>
          <div className="absolute backdrop-filter bg-white bg-opacity-[0.2] backdrop-blur-[30px] w-full h-full bottom-0 left-[-22.25rem]" />
          <div
            className="absolute w-[20.375rem] h-[40.75rem] border-0.5 border-black border-solid bottom-[13.125rem] left-[1.75rem]"
            style={{
              left: "calc(1.75rem + 1px)",
              borderTopLeftRadius: "calc(20.375rem + 1px)",
              borderBottomLeftRadius: "calc(20.375rem + 1px)",
            }}
          >
            <div className="relative w-full h-full">
              <div className="absolute transform -translate-x-1/2 left-1/2 top-[0.9375rem]">
                <div
                  onClick={() => setCurrent(0)}
                  className={`${
                    0 === current ? "border-2 border-main" : "border border-black"
                  } rounded-full w-[3.75rem] h-[3.75rem] relative bg-white`}
                  style={{
                    backgroundImage: `url(${images[0].url})`,
                    backgroundSize: "90px 110px",
                    backgroundPosition: "50% -5%",
                    backgroundRepeat: "no-repeat",
                  }}
                />
              </div>
              <div className="absolute left-[-1.875rem] transform -translate-y-1/2 top-1/2">
                <div
                  onClick={() => setCurrent(1)}
                  className={`${
                    1 === current ? "border-2 border-main" : "border border-black"
                  } rounded-full w-[3.75rem] h-[3.75rem] relative bg-white`}
                  style={{
                    backgroundImage: `url(${images[1].url})`,
                    backgroundSize: "90px 110px",
                    backgroundPosition: "50% -5%",
                    backgroundRepeat: "no-repeat",
                  }}
                />
              </div>
              <div className="absolute bottom-[0.9375rem] transform -translate-x-1/2 left-1/2">
                <div
                  onClick={() => setCurrent(2)}
                  className={`${
                    2 === current ? "border-2 border-main" : "border border-black"
                  } rounded-full w-[3.75rem] h-[3.75rem] relative bg-white`}
                  style={{
                    backgroundImage: `url(${images[2].url})`,
                    backgroundSize: "90px 110px",
                    backgroundPosition: "50% -5%",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <span className="text-[2.25rem] text-[#768489] absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                    ?
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-[21.875rem] absolute right-0 bottom-[16.5rem] prose flex flex-col gap-2">
          <h1 className="relative after:bg-gradient-to-r after:from-main after:to-white after:w-[10.25rem] after:h-1 after:absolute after:block after:bottom-[-0.5rem]">
            {generations.generations[current].name}
          </h1>
          <p dangerouslySetInnerHTML={{ __html: generations.generations[current].description }} />

          <div className="flex items-center justify-between italic font-bold leading-5 text-black uppercase select-none">
            <div
              className={`flex items-center gap-4 ${
                current === 0 ? "opacity-[0.4] cursor-not-allowed" : "cursor-pointer"
              }`}
              onClick={() => {
                if (current > 0) setCurrent(current - 1);
              }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  r="15.75"
                  transform="matrix(-1 0 0 1 16 16)"
                  stroke="black"
                  strokeWidth="0.5"
                />
                <path
                  d="M20.3431 9.99988L14.6863 15.6567L20.3431 21.3136"
                  stroke="black"
                  strokeLinecap="round"
                />
                <path
                  d="M14.3431 9.99988L8.68629 15.6567L14.3431 21.3136"
                  stroke="black"
                  strokeLinecap="round"
                />
              </svg>
              quay lại
            </div>
            <div
              className={`flex flex-row-reverse items-center gap-4 ${
                current === generations.generations.length - 1
                  ? "opacity-[0.4] cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              onClick={() => {
                if (current < generations.generations.length - 1) setCurrent(current + 1);
              }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="16" cy="16" r="15.75" stroke="black" strokeWidth="0.5" />
                <path
                  d="M11.6569 9.99988L17.3137 15.6567L11.6569 21.3136"
                  stroke="black"
                  strokeLinecap="round"
                />
                <path
                  d="M17.6569 9.99988L23.3137 15.6567L17.6569 21.3136"
                  stroke="black"
                  strokeLinecap="round"
                />
              </svg>
              tiếp theo
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;

import Layout from "@/components/Layout";
import Link from "next/link";
import { getHeroSlides, Slide } from "@/lib/cms/datocms";
import { InferGetStaticPropsType } from "next";
import Hero from "@/components/Hero";

export const getStaticProps = async ({ preview = false }) => {
  const allSlides: Slide[] = (await getHeroSlides(preview)) || [];

  return {
    props: {
      slides: allSlides.sort((a, b) => a.order - b.order),
    },
    revalidate: 600,
  };
};

const IndexPage = ({ slides }: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Layout title="Home">
    <video
      playsInline
      loop
      autoPlay
      muted
      src={"static/home/main_video_responsive.mp4"}
      className="fixed top-0 w-full h-screen md:hidden"
    />
    <video
      playsInline
      loop
      autoPlay
      muted
      src={"static/home/main_video.mp4"}
      className="absolute left-0 hidden w-full h-content md:block top-14"
    />
    <div className="absolute w-full px-4 bottom-2 md:hidden">
      <div className="flex items-end justify-between mb-3">
        <div className="italic font-black uppercase">
          <h1 className="text-h2 leading-h2">{slides[0].title}</h1>
          <h2 className="text-base">{slides[0].subheading}</h2>
        </div>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mb-2"
        >
          <path
            d="M4.74164 9.26444C4.72948 9.24012 4.71733 9.20365 4.70517 9.17933C7.13678 6.74772 9.56839 4.31611 12 1.8845V0H10.0182C7.59878 2.41945 5.16717 4.85106 2.7234 7.29483C2.7234 7.11246 2.7234 7.0152 2.7234 6.90578C2.7234 5.79939 2.7234 4.70517 2.7234 3.59878C2.7234 2.45593 2.7234 1.31307 2.7234 0.170213C2.7234 0.121581 2.73556 0.0486322 2.73556 0H0V12H12V9.26444C9.56839 9.26444 7.14894 9.26444 4.74164 9.26444Z"
            fill="black"
          />
        </svg>
      </div>

      <Link href={slides[0].cta.href}>
        <a>
          <div className="flex items-center justify-center w-full text-xl italic font-black uppercase rounded-lg h-14 bg-main">
            {slides[0].cta.title}
          </div>
        </a>
      </Link>
    </div>
    <div className="fixed items-center justify-between hidden w-full h-full md:flex">
      <div className="w-full max-w-[86rem] h-full flex justify-between mx-auto mt-[15.625rem]">
        <svg
          width="262"
          height="246"
          viewBox="0 0 262 246"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[16.25rem] h-[15.375rem]"
        >
          <path
            d="M55.3995 221.905L50.6738 209.449H53.4932L57.1013 219.731H57.1378L60.7606 209.449H63.5653L58.2919 223.153H57.021C56.2687 223.16 55.7282 222.744 55.3995 221.905Z"
            fill="black"
          />
          <path
            d="M84.1919 219.971H79.0572L77.8447 223.16H75.0254L80.3938 209.456H81.6063C82.4535 209.456 83.0305 209.85 83.33 210.631L88.2091 223.16H85.3897L84.1919 219.971ZM79.0791 207.45C78.4656 206.91 78.1588 206.194 78.1588 205.304V204.91H80.2331V205.304C80.2331 205.669 80.35 205.961 80.5837 206.173C80.8174 206.391 81.1242 206.494 81.504 206.494H81.7377C82.1175 206.494 82.4243 206.384 82.658 206.173C82.8918 205.961 83.0086 205.669 83.0086 205.304V204.91H85.083V205.304C85.083 206.194 84.7762 206.91 84.1627 207.45C83.5491 207.99 82.7384 208.26 81.7304 208.26H81.4967C80.5034 208.26 79.6926 207.99 79.0791 207.45ZM79.7803 217.702H83.4615L81.6355 212.769H81.6136L79.7803 217.702Z"
            fill="black"
          />
          <path
            d="M100.794 209.456H103.204L109.792 218.775V209.456H112.436V223.16H110.026L103.438 213.842V223.16H100.794V209.456Z"
            fill="black"
          />
          <path
            d="M126.672 222.664C126.329 222.328 126.153 221.891 126.153 221.343V209.456H128.856V220.811H136.306V223.16H128.052C127.483 223.16 127.022 222.992 126.672 222.664Z"
            fill="black"
          />
          <path
            d="M157.005 219.971H151.871L150.658 223.16H147.839L153.207 209.456H154.42C155.267 209.456 155.844 209.85 156.144 210.631L161.023 223.16H158.203L157.005 219.971ZM152.594 217.702H156.275L154.449 212.769H154.427L152.594 217.702Z"
            fill="black"
          />
          <path
            d="M173.6 209.456H176.01L182.598 218.775V209.456H185.242V223.16H182.832L176.244 213.842V223.16H173.6V209.456Z"
            fill="black"
          />
          <path
            d="M201.005 222.671C200.23 222.241 199.639 221.628 199.208 220.84C198.784 220.052 198.572 219.139 198.572 218.111V214.506C198.572 213.477 198.784 212.565 199.208 211.777C199.631 210.989 200.23 210.376 201.012 209.945C201.786 209.515 202.684 209.296 203.707 209.296H205.898C206.877 209.296 207.739 209.493 208.484 209.879C209.229 210.273 209.806 210.828 210.222 211.543C210.631 212.258 210.843 213.09 210.843 214.031H208.177C208.177 213.324 207.965 212.762 207.549 212.331C207.133 211.901 206.585 211.682 205.905 211.682H203.714C202.984 211.682 202.392 211.952 201.947 212.492C201.501 213.032 201.282 213.74 201.282 214.615V217.987C201.282 218.862 201.501 219.57 201.939 220.11C202.378 220.65 202.955 220.92 203.678 220.92H205.993C206.658 220.92 207.213 220.679 207.651 220.198C208.089 219.716 208.308 219.118 208.308 218.395V217.965H204.503V215.615H210.967V218.395C210.967 219.351 210.755 220.198 210.339 220.942C209.923 221.686 209.331 222.27 208.571 222.686C207.812 223.102 206.95 223.313 205.986 223.313H203.67C202.663 223.321 201.771 223.102 201.005 222.671Z"
            fill="black"
          />
          <path
            d="M9.90105 245.351C9.13414 244.92 8.54251 244.307 8.12619 243.519C7.70986 242.731 7.49805 241.819 7.49805 240.79V237.185C7.49805 236.156 7.70986 235.244 8.13349 234.456C8.55712 233.668 9.15605 233.055 9.93757 232.625C10.7118 232.194 11.6102 231.975 12.6327 231.975H14.7071C15.6858 231.975 16.5477 232.187 17.2927 232.603C18.0377 233.019 18.6147 233.602 19.031 234.354C19.44 235.106 19.6519 235.974 19.6519 236.966H16.9859C16.9859 236.186 16.7741 235.551 16.3578 235.076C15.9414 234.602 15.3936 234.361 14.7144 234.361H12.6327C11.9023 234.361 11.3107 234.631 10.8652 235.171C10.4196 235.711 10.2005 236.419 10.2005 237.295V240.666C10.2005 241.542 10.4123 242.249 10.8506 242.789C11.2815 243.329 11.8512 243.599 12.5524 243.599H14.6705C15.3644 243.599 15.9268 243.329 16.3651 242.797C16.8033 242.264 17.0224 241.556 17.0224 240.681H19.6884C19.6884 241.739 19.4766 242.665 19.0602 243.468C18.6439 244.271 18.0523 244.891 17.2927 245.329C16.5331 245.767 15.6566 245.986 14.6632 245.986H12.5451C11.5517 246 10.668 245.781 9.90105 245.351Z"
            fill="black"
          />
          <path d="M32.8574 232.135H35.5599V245.839H32.8574V232.135Z" fill="black" />
          <path
            d="M53.0675 244.585L48.3418 232.128H51.1611L54.7693 242.41H54.8058L58.4286 232.128H61.2333L55.9598 245.832H54.6889C53.9366 245.84 53.3961 245.424 53.0675 244.585Z"
            fill="black"
          />
          <path d="M74.0151 232.135H76.7176V245.839H74.0151V232.135Z" fill="black" />
          <path
            d="M91.1577 245.343C90.8145 245.008 90.6392 244.57 90.6392 244.022V232.135H93.3416V243.49H100.792V245.839H92.5382C91.9612 245.839 91.501 245.672 91.1577 245.343Z"
            fill="black"
          />
          <path d="M113.646 232.135H116.349V245.839H113.646V232.135Z" fill="black" />
          <path
            d="M129.481 244.511L136.756 234.449H129.839V232.135H140.503V233.464L133.192 243.526H140.306V245.839H129.489V244.511H129.481Z"
            fill="black"
          />
          <path
            d="M161.465 242.651H156.331L155.118 245.839H152.299L157.667 232.135H158.88C159.727 232.135 160.304 232.53 160.603 233.31L165.482 245.839H162.663L161.465 242.651ZM157.061 240.374H160.742L158.916 235.441H158.894L157.061 240.374Z"
            fill="black"
          />
          <path
            d="M181.442 234.485H177.089V232.135H188.498V234.485H184.145V245.839H181.442V234.485Z"
            fill="black"
          />
          <path d="M201.433 232.135H204.135V245.839H201.433V232.135Z" fill="black" />
          <path
            d="M220.16 245.343C219.371 244.906 218.758 244.293 218.319 243.505C217.881 242.716 217.662 241.797 217.662 240.754V237.229C217.662 236.186 217.881 235.266 218.319 234.478C218.758 233.69 219.371 233.077 220.16 232.639C220.949 232.201 221.862 231.982 222.892 231.982H224.966C225.996 231.982 226.909 232.201 227.698 232.639C228.487 233.077 229.1 233.69 229.538 234.478C229.977 235.266 230.196 236.186 230.196 237.229V240.754C230.196 241.797 229.977 242.716 229.538 243.505C229.1 244.293 228.487 244.906 227.698 245.343C226.909 245.781 225.996 246 224.966 246H222.892C221.862 246 220.949 245.781 220.16 245.343ZM224.966 243.607C225.726 243.607 226.332 243.329 226.799 242.782C227.26 242.235 227.493 241.512 227.493 240.629V237.338C227.493 236.448 227.26 235.733 226.799 235.186C226.339 234.639 225.726 234.361 224.966 234.361H222.892C222.132 234.361 221.526 234.639 221.058 235.186C220.598 235.733 220.365 236.456 220.365 237.338V240.629C220.365 241.52 220.598 242.235 221.058 242.782C221.519 243.329 222.132 243.607 222.892 243.607H224.966Z"
            fill="black"
          />
          <path
            d="M243.525 232.135H245.936L252.524 241.454V232.135H255.168V245.839H252.758L246.169 236.521V245.839H243.525V232.135Z"
            fill="black"
          />
          <path
            d="M154.454 148.233C154.462 148.146 154.483 148.058 154.483 147.963C154.483 147.869 154.462 147.788 154.454 147.693V147.278H154.41C154.074 144.541 151.81 142.418 149.027 142.418C146.245 142.418 143.98 144.541 143.644 147.278H136.888C136.603 144.789 134.624 142.826 132.097 142.513V135.741C134.836 135.405 136.961 133.143 136.961 130.363C136.961 127.356 134.478 124.919 131.41 124.919C128.343 124.919 125.859 127.356 125.859 130.363C125.859 133.172 128.043 135.464 130.833 135.748V142.491C128.24 142.753 126.202 144.738 125.91 147.27H119.023C118.687 144.534 116.422 142.41 113.64 142.41C110.63 142.41 108.191 144.891 108.191 147.956C108.191 151.021 110.63 153.502 113.64 153.502C116.452 153.502 118.745 151.32 119.03 148.533H125.91C126.224 151.036 128.255 152.998 130.826 153.261V160.325C128.036 160.617 125.852 162.901 125.852 165.71C125.852 168.716 128.335 171.154 131.403 171.154C134.471 171.154 136.954 168.716 136.954 165.71C136.954 162.937 134.828 160.668 132.089 160.332V153.247C134.602 152.933 136.567 150.999 136.874 148.533H143.622C143.915 151.32 146.201 153.502 149.013 153.502C151.825 153.502 154.118 151.32 154.403 148.533H154.432V148.233H154.454Z"
            fill="black"
          />
          <path
            d="M154.812 68.2351L141.505 79.2245C140.533 79.8813 139.956 80.954 139.956 82.085V98.1897L135.683 102.254C135.011 102.896 133.857 102.444 133.857 101.532V97.7227L132.053 94.7528V91.2283L133.324 88.1635L131.863 79.9032L131.425 78.8378L130.921 79.9397L129.46 88.2L130.731 91.2648V94.7893L128.927 97.7592V101.568C128.927 102.473 127.773 102.926 127.101 102.291L122.828 98.2262V82.1215C122.828 80.9831 122.251 79.9178 121.28 79.261L107.906 68.4321L108.191 71.891C108.995 76.6852 112.055 80.8737 116.496 83.2671H116.503C117.153 83.6174 117.547 84.2887 117.526 85.0038L115.225 104.545L131.418 119.796L148.005 104.823L145.288 84.9747C145.259 84.2595 145.653 83.5809 146.311 83.2307C150.751 80.8372 153.812 76.6487 154.615 71.8545L154.812 68.2351Z"
            fill="black"
          />
          <path
            d="M42.9715 0.0134277V7.50755H7.9709V29.9826H35.4703V22.4885H17.97V14.9944H42.9715V37.4695H0.469727V0.0134277H42.9715Z"
            fill="black"
          />
          <path
            d="M103.171 7.50878H60.6689V0.0146484H103.171V7.50878ZM103.171 22.4897H60.6689V14.9956H103.171V22.4897ZM103.171 37.478H60.6689V29.9839H103.171V37.478Z"
            fill="black"
          />
          <path
            d="M155.869 27.1891V0.0146484H163.37V37.478H155.569L128.369 10.3036V37.478H120.868V0.0146484H128.669L155.869 27.1891Z"
            fill="black"
          />
          <path
            d="M223.569 7.50878H181.067V0.0146484H223.569V7.50878ZM223.569 22.4897H181.067V14.9956H223.569V22.4897ZM223.569 37.478H181.067V29.9839H223.569V37.478Z"
            fill="black"
          />
          <path
            d="M261.462 0.0145942V0H246.993V6.95414H253.968V37.4779H261.47V0.0145942H261.462Z"
            fill="#3EFFA8"
          />
        </svg>
        <Hero slides={slides} />
      </div>
    </div>
  </Layout>
);

export default IndexPage;

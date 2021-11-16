import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import useClickOutside from "@/lib/hooks/useClickOutside";
import useLocalStorage from "@/lib/hooks/useLocalStorage";
import { CartItem } from "@/lib/types/cart";

function useIsScrollTop() {
  const [isTop, setIsTop] = useState(true);
  useEffect(() => {
    function onScroll() {
      setIsTop(window.scrollY <= 0);
    }
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return isTop;
}

export default function Header() {
  const [menuActive, setMenuActive] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [cartActive, setCartActive] = useState(false);

  const [cart] = useLocalStorage<CartItem[]>("cart", []);
  const isCartHasItem = cart.length > 0;

  const router = useRouter();
  const isTop = useIsScrollTop();
  const isCart = router.pathname === "/cart";

  useEffect(() => {
    if (searchActive || menuActive) {
      setCartActive(false);
    } else {
      setCartActive(isCart);
    }
  }, [isCart, menuActive, searchActive]);

  const onMenuToggle = () => {
    setMenuActive((status) => {
      setSearchActive(false);
      return !status;
    });
  };
  const onSearchToggle = () => {
    setSearchActive((status) => {
      setMenuActive(false);
      return !status;
    });
  };
  const onGoToCart = () => {
    router.push("/cart");
  };
  useEffect(() => {
    if (menuActive || searchActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [menuActive, searchActive]);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => {
    if (menuActive) {
      setMenuActive(false);
    }
  });

  return (
    <>
      <header
        className={`sticky top-0 z-50 flex items-center justify-center ${
          isCart ? "bg-white" : isTop || menuActive || searchActive ? "bg-transparent" : "bg-white"
        }`}
      >
        <nav className="w-full h-14 flex items-center justify-between md:max-w-content md:h-[3.188rem]">
          <div className="flex">
            <button
              className={`rounded-full w-12 h-12 grid place-content-center ${
                menuActive ? "bg-main" : "bg-transparent"
              } transition-colors`}
              onClick={onMenuToggle}
            >
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 32H34V29.3333H14V32ZM14 25.3333H34V22.6667H14V25.3333ZM14 16V18.6667H34V16H14Z"
                  fill="black"
                />
              </svg>
            </button>
            <div className="ml-[-0.5rem] rounded-full w-12 h-12" />
          </div>
          <Link href="/">
            <a>
              <svg
                width="90"
                height="24"
                viewBox="0 0 90 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M58.4206 6.60464C58.9108 6.60464 59.3309 6.43078 59.6927 6.09466C60.0544 5.73535 60.2295 5.3065 60.2295 4.79652C60.2295 4.30972 60.0544 3.89247 59.6927 3.53316C59.3309 3.17386 58.9108 3 58.4206 3C57.9071 3 57.4754 3.17386 57.1136 3.53316C56.7751 3.89247 56.6001 4.30972 56.6001 4.79652C56.6001 5.3065 56.7751 5.73535 57.1136 6.09466C57.4754 6.43078 57.9071 6.60464 58.4206 6.60464Z"
                  fill="black"
                />
                <path
                  d="M56.6117 10.1977V17.3954C56.6117 18.3922 56.9618 19.2383 57.662 19.9569C58.3622 20.6523 59.2141 21 60.2411 21V13.8023C60.2411 12.8287 59.8793 11.9826 59.1674 11.2756C58.4556 10.557 57.6037 10.1977 56.6117 10.1977Z"
                  fill="black"
                />
                <path
                  d="M17.0501 9.16614C17.7619 8.47071 18.1237 7.6246 18.1237 6.60464C18.1237 5.63104 17.7619 4.78494 17.0501 4.07792C16.3498 3.3709 15.4979 3.0116 14.506 3.0116H0V10.2556H2.99922V13.7791H0V21H14.506C15.4863 21 16.3382 20.6523 17.0501 19.9569C17.7619 19.2614 18.1237 18.4153 18.1237 17.3954C18.1237 16.4218 17.7619 15.5757 17.0501 14.8686C16.3498 14.1616 15.4979 13.8023 14.506 13.8023V10.1977C15.4863 10.1977 16.3382 9.84997 17.0501 9.16614ZM14.506 17.407H3.62941V13.8023H12.6971C13.1872 13.8023 13.6074 13.9762 13.9691 14.3355C14.3309 14.6948 14.506 15.112 14.506 15.5988V17.407ZM13.9691 9.6993C13.6074 10.0354 13.1872 10.2093 12.6971 10.2093H3.62941V6.60464H14.506V8.40117C14.506 8.91115 14.3192 9.33999 13.9691 9.6993Z"
                  fill="black"
                />
                <path
                  d="M35.9089 4.06632C35.2087 3.3593 34.3568 3 33.3649 3H22.4883C21.4847 3 20.6327 3.3593 19.9092 4.06632C19.209 4.76175 18.8589 5.60786 18.8589 6.59305V17.3954C18.8589 19.3889 20.481 21 22.4883 21V13.8023H33.3649V21C35.3721 21 36.9943 19.3889 36.9943 17.3954V6.60464C36.9826 5.63104 36.6208 4.78493 35.9089 4.06632ZM33.3532 10.1977L31.591 10.1861C31.5443 10.1861 31.4976 10.1861 31.451 10.1977H24.4605H22.4766V6.60464H33.3532V10.1977Z"
                  fill="black"
                />
                <path
                  d="M77.9914 4.06632C77.2912 3.3593 76.4393 3 75.4474 3H64.5708C63.5672 3 62.7153 3.3593 61.9917 4.06632C61.2915 4.76175 60.9414 5.60786 60.9414 6.59305V17.3954C60.9414 19.3889 62.5635 21 64.5708 21V13.8023H75.4474V21C77.4546 21 79.0768 19.3889 79.0768 17.3954V6.60464C79.0651 5.63104 78.715 4.78493 77.9914 4.06632ZM75.4474 10.1977L73.6852 10.1861C73.6385 10.1861 73.5918 10.1861 73.5451 10.1977H66.5547H64.5708V6.60464H75.4474V10.1977Z"
                  fill="black"
                />
                <path
                  d="M55.8415 10.1977V4.79652L44.965 10.1977H41.3356V3C40.332 3 39.48 3.3593 38.7565 4.06632C38.0563 4.76175 37.7062 5.60786 37.7062 6.59305V17.3954C37.7062 19.3889 39.3283 21 41.3356 21V13.8023H44.965L55.8415 19.2035V13.8023H48.5944L48.5711 13.7791V10.1977H55.8415Z"
                  fill="black"
                />
                <path
                  d="M88.0511 6.51192V7.55506L86.4756 9.10818H85.9505L83.8499 7.0219V6.50033L85.4253 4.9472H86.4756L84.6434 6.76691L86.2189 8.33162L88.0511 6.51192Z"
                  fill="black"
                />
                <path
                  d="M83.0796 4.18223C81.4925 5.75853 81.4925 8.29684 83.0796 9.87315C84.6668 11.4495 87.2225 11.4495 88.8097 9.87315C90.3968 8.29684 90.3968 5.75853 88.8097 4.18223C87.2225 2.60592 84.6668 2.60592 83.0796 4.18223ZM88.1678 9.22408C86.9425 10.4411 84.9585 10.4411 83.7332 9.22408C82.5078 8.00708 82.5078 6.0367 83.7332 4.8197C84.9585 3.6027 86.9425 3.6027 88.1678 4.8197C89.3932 6.0367 89.3932 8.00708 88.1678 9.22408Z"
                  fill="black"
                />
              </svg>
            </a>
          </Link>
          <div className="flex">
            <button
              className={`rounded-full w-12 h-12 grid place-content-center ${
                searchActive ? "bg-main" : "bg-transparent"
              } transition-colors`}
              onClick={onSearchToggle}
            >
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M27.4286 26.0571H26.6971L26.4229 25.7829C27.3371 24.7771 27.8857 23.4057 27.8857 21.9429C27.8857 18.6514 25.2343 16 21.9429 16C18.6514 16 16 18.6514 16 21.9429C16 25.2343 18.6514 27.8857 21.9429 27.8857C23.4057 27.8857 24.7771 27.3371 25.7829 26.4229L26.0571 26.6971V27.4286L30.6286 32L32 30.6286L27.4286 26.0571ZM21.9429 26.0571C19.6571 26.0571 17.8286 24.2286 17.8286 21.9429C17.8286 19.6571 19.6571 17.8286 21.9429 17.8286C24.2286 17.8286 26.0571 19.6571 26.0571 21.9429C26.0571 24.2286 24.2286 26.0571 21.9429 26.0571Z"
                  fill="black"
                />
              </svg>
            </button>
            <button
              className={`ml-[-0.5rem] rounded-full w-12 h-12 grid place-content-center ${
                cartActive ? "bg-main" : "bg-transparent"
              } transition-colors ${
                isCartHasItem
                  ? "relative after:absolute after:w-2 after:h-2 after:rounded-full after:bg-main after:right-[0.375rem] after:top-[0.375rem]"
                  : ""
              }`}
              onClick={onGoToCart}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.2 12.8C12.08 12.8 12.8 13.52 12.8 14.4C12.8 15.28 12.08 16 11.2 16C10.32 16 9.6 15.28 9.6 14.4C9.6 13.52 10.32 12.8 11.2 12.8ZM16 0V1.6H14.4L11.52 7.68L12.56 9.6C12.72 9.84 12.8 10.08 12.8 10.4C12.8 11.28 12.08 12 11.2 12H1.6V10.4H10.88C10.96 10.4 11.12 10.32 11.12 10.16V10.08L10.32 8.8H4.4C3.84 8.8 3.28 8.48 3.04 8L0.160001 2.8C0 2.64 0 2.56 0 2.4C0 1.92 0.4 1.6 0.8 1.6H12.64L13.36 0H16ZM3.2 12.8C4.08 12.8 4.8 13.52 4.8 14.4C4.8 15.28 4.08 16 3.2 16C2.32 16 1.6 15.28 1.6 14.4C1.6 13.52 2.32 12.8 3.2 12.8Z"
                  fill="black"
                />
              </svg>
            </button>
          </div>
        </nav>
      </header>
      <div
        ref={ref}
        onClick={onMenuToggle}
        className={`fixed w-full h-screen right-0 top-0 flex flex-col justify-between z-40 bg-white transition-opacity md:transform md:transition-transform ${
          menuActive
            ? "opacity-100 md:translate-y-0"
            : "pointer-events-none opacity-0 -translate-y-full"
        } backdrop-filter bg-opacity-24 backdrop-saturate-150 backdrop-blur-lg firefox:bg-opacity-100 md:opacity-100 md:h-[21.875rem]`}
      >
        <nav className="flex flex-col items-center justify-center gap-5 mt-56 italic font-black uppercase text-h2 leading-h2 md:mt-32">
          <Link href="/">
            <a className={router.pathname === "/" ? "text-mediumMint" : "text-black"}>Trang chủ</a>
          </Link>
          <Link href="/about">
            <a className={router.pathname === "/about" ? "text-mediumMint" : "text-black"}>
              Giới thiệu
            </a>
          </Link>
          <Link href="/custom">
            <a className={router.pathname === "/custom" ? "text-mediumMint" : "text-black"}>
              customize lab
            </a>
          </Link>
        </nav>
        <div className="flex flex-col items-center justify-center gap-2 mb-8 font-body text-s3 md:flex-row md:gap-10">
          <div className="flex items-center gap-2">
            <svg
              width="15"
              height="16"
              viewBox="0 0 15 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="inline-block"
            >
              <path
                d="M10.9125 7.23059C11.2125 6.93395 11.3813 6.56315 11.3813 6.13673C11.3813 5.72885 11.2313 5.35805 10.9125 5.06141C10.6125 4.76477 10.2563 4.59791 9.82502 4.59791V3.0591C10.2375 3.0591 10.6125 2.91078 10.9125 2.61414C11.2125 2.3175 11.3813 1.9467 11.3813 1.52028C11.3813 1.1124 11.2313 0.741599 10.9125 0.444959C10.6125 0.14832 10.2563 0 9.82502 0H3.61877V3.07764H4.91252V4.57937H3.61877V7.65701H9.82502C10.2375 7.67555 10.6125 7.52723 10.9125 7.23059ZM5.17502 1.53882H9.82502V2.29896C9.82502 2.52144 9.75002 2.70684 9.60002 2.85516C9.45002 3.00348 9.26252 3.07764 9.05627 3.07764H5.17502V1.53882ZM5.17502 4.59791H9.05627C9.26252 4.59791 9.45002 4.67207 9.60002 4.82039C9.75002 4.96871 9.82502 5.15411 9.82502 5.35805V6.11819H5.17502V4.59791Z"
                fill="black"
              />
              <path
                d="M8.26877 9.86325H11.3813C11.3813 9.43683 11.2313 9.08457 10.9125 8.76939C10.6125 8.47275 10.2563 8.32443 9.82502 8.32443H5.17502C4.31252 8.32443 3.61877 9.01041 3.61877 9.86325H6.73127V11.4021L4.38752 16H6.71252V12.9223L6.73127 12.9038H8.26877V15.9814H10.5938L8.26877 11.3835V9.86325Z"
                fill="black"
              />
              <path
                d="M11.775 1.94669C11.7 2.31749 11.5125 2.6512 11.2125 2.9293C11.1938 2.94784 11.1938 2.94784 11.175 2.96638C12.7688 4.09732 13.8 5.95132 13.8 8.0278C13.8 10.6049 12.2063 12.8111 9.9563 13.7752L10.4813 14.8134C13.125 13.664 14.9813 11.0684 14.9813 8.0278C15 5.50636 13.725 3.28156 11.775 1.94669Z"
                fill="black"
              />
              <path
                d="M5.025 13.7752C2.775 12.8297 1.18125 10.6049 1.18125 8.0278C1.18125 6.22942 1.95 4.61644 3.16875 3.4855V1.98376C1.25625 3.31864 0 5.5249 0 8.0278C0 11.0684 1.85625 13.6825 4.5 14.8134L5.025 13.7752Z"
                fill="black"
              />
              <path
                d="M7.16248 14.2758V15.4438C7.27498 15.4438 7.38748 15.4438 7.49998 15.4438C7.61248 15.4438 7.72498 15.4438 7.83748 15.4438V14.2758C7.72498 14.2758 7.61248 14.2758 7.49998 14.2758C7.38748 14.2758 7.27498 14.2758 7.16248 14.2758Z"
                fill="black"
              />
            </svg>
            BAKIA Exclusive and Premium
          </div>
          <div className="flex items-center gap-3 md:gap-9">
            <div className="flex items-center gap-2">
              <svg
                width="12"
                height="14"
                viewBox="0 0 12 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="inline-block"
              >
                <path
                  d="M10.8242 9.54705L9.12749 9.32103C8.72 9.26648 8.31919 9.43014 8.03195 9.76526L6.80281 11.1993C4.91234 10.077 3.36255 8.2767 2.40061 6.06335L3.63644 4.62155C3.92368 4.28643 4.06396 3.81882 4.0172 3.34341L3.82348 1.37945C3.74332 0.592307 3.17551 0 2.49414 0H1.33848C0.583624 0 -0.0443069 0.73259 0.00245392 1.61326C0.3565 8.26891 4.91902 13.5841 10.6172 13.9971C11.372 14.0517 11.9999 13.3191 11.9999 12.4384V11.0902C12.0066 10.303 11.4989 9.64057 10.8242 9.54705Z"
                  fill="black"
                />
              </svg>
              (+84) 969 505 423
            </div>
            <div className="flex items-center gap-2">
              <svg
                width="14"
                height="10"
                viewBox="0 0 14 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="inline-block"
              >
                <path
                  d="M12.6001 0H1.40012C0.630122 0 0.00712206 0.5625 0.00712206 1.25L0.00012207 8.75C0.00012207 9.4375 0.630122 10 1.40012 10H12.6001C13.3701 10 14.0001 9.4375 14.0001 8.75V1.25C14.0001 0.5625 13.3701 0 12.6001 0ZM11.9001 8.75H2.10012C1.71512 8.75 1.40012 8.46875 1.40012 8.125V2.5L6.25812 5.2125C6.71312 5.46875 7.28712 5.46875 7.74212 5.2125L12.6001 2.5V8.125C12.6001 8.46875 12.2851 8.75 11.9001 8.75ZM7.00012 4.375L1.40012 1.25H12.6001L7.00012 4.375Z"
                  fill="black"
                />
              </svg>
              team.bakia@gmail.com
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

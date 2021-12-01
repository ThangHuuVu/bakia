const API_URL = "https://graphql.datocms.com";
const API_TOKEN = process.env.DATOCMS_READONLY_TOKEN;

// See: https://www.datocms.com/blog/offer-responsive-progressive-lqip-images-in-2020
export const responsiveImageFragment = `
  fragment responsiveImageFragment on ResponsiveImage {
  srcSet
    webpSrcSet
    sizes
    src
    width
    height
    aspectRatio
    alt
    title
    bgColor
    base64
  }
`;
export interface Options {
  variables?: unknown;
  preview?: boolean;
}
export async function fetchAPI(query: string, { variables, preview }: Options = {}) {
  const res = await fetch(API_URL + (preview ? "/preview" : ""), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    throw new Error("Failed to fetch API");
  }
  return json.data;
}

export interface Slide {
  title: string;
  subheading: string;
  paragraph: string;
  order: number;
  cta?: {
    href: string;
    title: string;
  };
}
export async function getHeroSlides(preview: boolean) {
  const data = await fetchAPI(
    `
    {
        allSlides {
            cta
            paragraph
            subheading
            title
            order
        }
    }
  `,
    { preview }
  );
  return data?.allSlides as Slide[];
}

export async function getAbout(preview: boolean) {
  const data = await fetchAPI(
    `
    {
      about {
        images {
          blurUpThumb
          url
        }
        intro
        subheading
        heading
        generations
      }
    }
  `,
    { preview }
  );
  return data?.about;
}

export async function getDiscountCodeDescription(preview: boolean) {
  const data = await fetchAPI(
    `
    {
      discountCodeGene1 {
        detail {
          value
        }
        title
      }
    }
  `,
    { preview }
  );
  return data?.discountCodeGene1;
}

export async function getPaymentContent(preview: boolean) {
  const data = await fetchAPI(
    `
    {
      paymentContent {
        term {
          value
        }
        banks {
          accountNumber
          accountHolderName
          image {
            blurUpThumb
            url
          }
          bankName
          branch
        }
        eWallets {
          name
          image {
            url
            blurUpThumb
          }
          accountHolderName
          accountNumber
        }
        successMessage {
          value
        }
      }
    }
  `,
    { preview }
  );
  return data?.paymentContent;
}

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const vndCurrency = await prisma.currency.upsert({
    where: { id: 1 },
    create: {
      name: "Vietnam Dong",
      abbreviationSign: "VND",
    },
    update: {
      name: "Vietnam Dong",
      abbreviationSign: "VND",
    },
  });
  await prisma.gene.upsert({
    where: { id: 1 },
    create: {
      image: "",
      name: "Gene 1",
      description: "Bakia GENE:1 Van Lang Heritage",
      price: 1500000,
      currencyId: vndCurrency.id,
    },
    update: {
      image: "",
      name: "Gene 1",
      description: "Bakia GENE:1 Van Lang Heritage",
      price: 1500000,
      currencyId: vndCurrency.id,
    },
  });
  const skin = await prisma.category.upsert({
    where: { id: 1 },
    create: { name: "Da", thumbnail: "Skin.svg", layer: null, parentId: null },
    update: { name: "Da", thumbnail: "Skin.svg", layer: null, parentId: null },
  });
  const outfit = await prisma.category.upsert({
    where: { id: 2 },
    create: { name: "Outfit", thumbnail: "Outfit.svg", layer: null, parentId: null },
    update: { name: "Outfit", thumbnail: "Outfit.svg", layer: null, parentId: null },
  });
  const hair = await prisma.category.upsert({
    where: { id: 3 },
    create: { name: "Tóc", thumbnail: "Hair.svg", layer: 10, parentId: null },
    update: { name: "Tóc", thumbnail: "Hair.svg", layer: 10, parentId: null },
  });
  const eyes = await prisma.category.upsert({
    where: { id: 4 },
    create: { name: "Mắt", thumbnail: "Eyes.svg", layer: null, parentId: null },
    update: { name: "Mắt", thumbnail: "Eyes.svg", layer: null, parentId: null },
  });
  const lips = await prisma.category.upsert({
    where: { id: 5 },
    create: { name: "Môi", thumbnail: "Lips.svg", layer: 7, parentId: null },
    update: { name: "Môi", thumbnail: "Lips.svg", layer: 7, parentId: null },
  });
  const nose = await prisma.category.upsert({
    where: { id: 6 },
    create: { name: "Mũi", thumbnail: "Nose.svg", layer: 7, parentId: null },
    update: { name: "Mũi", thumbnail: "Nose.svg", layer: 7, parentId: null },
  });
  const others = await prisma.category.upsert({
    where: { id: 7 },
    create: { name: "Khác", thumbnail: "Other.svg", layer: null, parentId: null },
    update: { name: "Khác", thumbnail: "Other.svg", layer: null, parentId: null },
  });
  const skinTone = await prisma.category.upsert({
    where: { id: 8 },
    create: { name: "Màu da", thumbnail: "Skin+tone.svg", layer: 0, parentId: skin.id },
    update: { name: "Màu da", thumbnail: "Skin+tone.svg", layer: 0, parentId: skin.id },
  });
  const blush = await prisma.category.upsert({
    where: { id: 9 },
    create: { name: "Má hồng", thumbnail: "Blush.svg", layer: 1, parentId: skin.id },
    update: { name: "Má hồng", thumbnail: "Blush.svg", layer: 1, parentId: skin.id },
  });
  const skinFeature = await prisma.category.upsert({
    where: { id: 10 },
    create: { name: "Khác", thumbnail: "Other.svg", layer: 2, parentId: skin.id },
    update: { name: "Khác", thumbnail: "Other.svg", layer: 2, parentId: skin.id },
  });
  const clothes = await prisma.category.upsert({
    where: { id: 11 },
    create: { name: "Set đồ", thumbnail: "Other.svg", layer: 9, parentId: outfit.id },
    update: { name: "Set đồ", thumbnail: "Other.svg", layer: 9, parentId: outfit.id },
  });
  const sneakers = await prisma.category.upsert({
    where: { id: 12 },
    create: { name: "Sneaker", thumbnail: "Sneaker.svg", layer: 10, parentId: outfit.id },
    update: { name: "Sneaker", thumbnail: "Sneaker.svg", layer: 10, parentId: outfit.id },
  });
  const eyeShape = await prisma.category.upsert({
    where: { id: 13 },
    create: { name: "Kiểu mắt", thumbnail: "Eye+shape.svg", layer: 4, parentId: eyes.id },
    update: { name: "Kiểu mắt", thumbnail: "Eye+shape.svg", layer: 4, parentId: eyes.id },
  });
  const eyebrows = await prisma.category.upsert({
    where: { id: 14 },
    create: { name: "Lông mày", thumbnail: "Eye+brown.svg", layer: 7, parentId: eyes.id },
    update: { name: "Lông mày", thumbnail: "Eye+brown.svg", layer: 7, parentId: eyes.id },
  });
  const eyeLine = await prisma.category.upsert({
    where: { id: 15 },
    create: { name: "Kẻ mắt", thumbnail: "Eyeline.svg", layer: 5, parentId: eyes.id },
    update: { name: "Kẻ mắt", thumbnail: "Eyeline.svg", layer: 5, parentId: eyes.id },
  });
  const eyeShadow = await prisma.category.upsert({
    where: { id: 16 },
    create: { name: "Bầu mắt", thumbnail: "Eyeshadow.svg", layer: 3, parentId: eyes.id },
    update: { name: "Bầu mắt", thumbnail: "Eyeshadow.svg", layer: 3, parentId: eyes.id },
  });
  const eyeLashes = await prisma.category.upsert({
    where: { id: 17 },
    create: { name: "Lông mi", thumbnail: "Eyelashes.svg", layer: 6, parentId: eyes.id },
    update: { name: "Lông mi", thumbnail: "Eyelashes.svg", layer: 6, parentId: eyes.id },
  });
  const beard = await prisma.category.upsert({
    where: { id: 18 },
    create: { name: "Râu", thumbnail: "Beard.svg", layer: 8, parentId: others.id },
    update: { name: "Râu", thumbnail: "Beard.svg", layer: 8, parentId: others.id },
  });
  const face = await prisma.category.upsert({
    where: { id: 19 },
    create: { name: "Mặt", thumbnail: "Other.svg", layer: 9, parentId: others.id },
    update: { name: "Mặt", thumbnail: "Other.svg", layer: 9, parentId: others.id },
  });
  const glasses = await prisma.category.upsert({
    where: { id: 20 },
    create: { name: "Kính", thumbnail: "Glasses.svg", layer: 10, parentId: others.id },
    update: { name: "Kính", thumbnail: "Glasses.svg", layer: 10, parentId: others.id },
  });

  // outfit
  const set1 = await prisma.product.upsert({
    where: { id: 1 },
    create: {
      name: "GENE 1 White",
      categoryId: clothes.id,
    },
    update: {
      name: "GENE 1 White",
      categoryId: clothes.id,
    },
  });
  await prisma.productVariant.upsert({
    where: { id: 1 },
    create: {
      name: "GENE 1 White",
      image: "02-1+Outfit/set1.png",
      thumbnail: "02-1+Outfit/set1_thumb.png",
      price: 2500000,
      currencyId: vndCurrency.id,
      productId: set1.id,
    },
    update: {
      name: "GENE 1 White",
      image: "02-1+Outfit/set1.png",
      thumbnail: "02-1+Outfit/set1_thumb.png",
      price: 2500000,
      currencyId: vndCurrency.id,
      productId: set1.id,
    },
  });
  const set2 = await prisma.product.upsert({
    where: { id: 2 },
    create: {
      name: "GENE 1 Black",
      categoryId: clothes.id,
    },
    update: {
      name: "GENE 1 Black",
      categoryId: clothes.id,
    },
  });
  await prisma.productVariant.upsert({
    where: { id: 2 },
    create: {
      name: "GENE 1 Black",
      image: "02-1+Outfit/set2.png",
      thumbnail: "02-1+Outfit/set2_thumb.png",
      price: 2500000,
      currencyId: vndCurrency.id,
      productId: set2.id,
    },
    update: {
      name: "GENE 1 Black",
      image: "02-1+Outfit/set2.png",
      thumbnail: "02-1+Outfit/set2_thumb.png",
      price: 2500000,
      currencyId: vndCurrency.id,
      productId: set2.id,
    },
  });
  const set3 = await prisma.product.upsert({
    where: { id: 3 },
    create: {
      name: "GENE 1 Black & White",
      categoryId: clothes.id,
    },
    update: {
      name: "GENE 1 Black & White",
      categoryId: clothes.id,
    },
  });
  await prisma.productVariant.upsert({
    where: { id: 3 },
    create: {
      name: "GENE 1 Black & White",
      image: "02-1+Outfit/set3.png",
      thumbnail: "02-1+Outfit/set3_thumb.png",
      price: 2500000,
      currencyId: vndCurrency.id,
      productId: set3.id,
    },
    update: {
      name: "GENE 1 Black & White",
      image: "02-1+Outfit/set3.png",
      thumbnail: "02-1+Outfit/set3_thumb.png",
      price: 2500000,
      currencyId: vndCurrency.id,
      productId: set3.id,
    },
  });
  const set4 = await prisma.product.upsert({
    where: { id: 4 },
    create: {
      name: "GENE 1 White & Black",
      categoryId: clothes.id,
    },
    update: {
      name: "GENE 1 White & Black",
      categoryId: clothes.id,
    },
  });
  await prisma.productVariant.upsert({
    where: { id: 4 },
    create: {
      name: "GENE 1 White & Black",
      image: "02-1+Outfit/set4.png",
      thumbnail: "02-1+Outfit/set4_thumb.png",
      price: 2500000,
      currencyId: vndCurrency.id,
      productId: set4.id,
    },
    update: {
      name: "GENE 1 White & Black",
      image: "02-1+Outfit/set4.png",
      thumbnail: "02-1+Outfit/set4_thumb.png",
      price: 2500000,
      currencyId: vndCurrency.id,
      productId: set4.id,
    },
  });

  // eyes color
  const eyeColor1 = await prisma.variantColor.upsert({
    where: {
      id: 1,
    },
    create: {
      code: "#6b503c",
      name: "Natural brown",
    },
    update: {
      code: "#6b503c",
      name: "Natural brown",
    },
  });
  const eyeColor2 = await prisma.variantColor.upsert({
    where: {
      id: 2,
    },
    create: {
      code: "#9edefe",
      name: "Vibrant sky",
    },
    update: {
      code: "#9edefe",
      name: "Vibrant sky",
    },
  });
  const eyeColor3 = await prisma.variantColor.upsert({
    where: {
      id: 3,
    },
    create: {
      code: "#8b94a4",
      name: "Ashes",
    },
    update: {
      code: "#8b94a4",
      name: "Ashes",
    },
  });
  const eyeColor4 = await prisma.variantColor.upsert({
    where: {
      id: 4,
    },
    create: {
      code: "#a8a38c",
      name: "Mistique",
    },
    update: {
      code: "#a8a38c",
      name: "Mistique",
    },
  });
  const eyeColor5 = await prisma.variantColor.upsert({
    where: {
      id: 5,
    },
    create: {
      code: "#ffdb92",
      name: "Luster",
    },
    update: {
      code: "#ffdb92",
      name: "Luster",
    },
  });
  const eyeColor6 = await prisma.variantColor.upsert({
    where: {
      id: 6,
    },
    create: {
      code: "#ffffff",
      name: "Futuristic",
    },
    update: {
      code: "#ffffff",
      name: "Futuristic",
    },
  });
  const eyeColor7 = await prisma.variantColor.upsert({
    where: {
      id: 7,
    },
    create: {
      code: "#ff3333",
      name: "Red zone",
    },
    update: {
      code: "#ff3333",
      name: "Red zone",
    },
  });
  const eyeColor8 = await prisma.variantColor.upsert({
    where: {
      id: 8,
    },
    create: {
      code: "#23120b",
      name: "Galantus",
    },
    update: {
      code: "#23120b",
      name: "Galantus",
    },
  });
  const eyeColor9 = await prisma.variantColor.upsert({
    where: {
      id: 9,
    },
    create: {
      code: "#000000",
      name: "Shinobi",
    },
    update: {
      code: "#000000",
      name: "Shinobi",
    },
  });

  // eye shape
  const eyeShape1 = await prisma.product.upsert({
    where: { id: 5 },
    create: {
      name: "Mắt phương đông",
      categoryId: eyeShape.id,
    },
    update: {
      name: "Mắt phương đông",
      categoryId: eyeShape.id,
    },
  });
  await prisma.productVariant.upsert({
    where: { id: 5 },
    create: {
      name: "Mắt phương đông Natural brown",
      image: "04-2+Eyes+shape/eye_shape1/eye_shape1_cl1.png",
      thumbnail: "04-2+Eyes+shape/eye_shape1/eye_shape1_cl1_thumb.png",
      price: 50000,
      currencyId: vndCurrency.id,
      productId: eyeShape1.id,
      colorId: eyeColor1.id,
    },
    update: {
      name: "Mắt phương đông Natural brown",
      image: "04-2+Eyes+shape/eye_shape1/eye_shape1_cl1.png",
      thumbnail: "04-2+Eyes+shape/eye_shape1/eye_shape1_cl1_thumb.png",
      price: 50000,
      currencyId: vndCurrency.id,
      productId: eyeShape1.id,
      colorId: eyeColor1.id,
    },
  });
  await prisma.productVariant.upsert({
    where: { id: 6 },
    create: {
      name: "Mắt phương đông Vibrant sky",
      image: "04-2+Eyes+shape/eye_shape1/eye_shape1_cl2.png",
      thumbnail: "04-2+Eyes+shape/eye_shape1/eye_shape1_cl2_thumb.png",
      price: 50000,
      currencyId: vndCurrency.id,
      productId: eyeShape1.id,
      colorId: eyeColor2.id,
    },
    update: {
      name: "Mắt phương đông Vibrant sky",
      image: "04-2+Eyes+shape/eye_shape1/eye_shape1_cl2.png",
      thumbnail: "04-2+Eyes+shape/eye_shape1/eye_shape1_cl2_thumb.png",
      price: 50000,
      currencyId: vndCurrency.id,
      productId: eyeShape1.id,
      colorId: eyeColor2.id,
    },
  });
  await prisma.productVariant.upsert({
    where: { id: 7 },
    create: {
      name: "Mắt phương đông Ashes",
      image: "04-2+Eyes+shape/eye_shape1/eye_shape1_cl3.png",
      thumbnail: "04-2+Eyes+shape/eye_shape1/eye_shape1_cl3_thumb.png",
      price: 50000,
      currencyId: vndCurrency.id,
      productId: eyeShape1.id,
      colorId: eyeColor3.id,
    },
    update: {
      name: "Mắt phương đông Ashes",
      image: "04-2+Eyes+shape/eye_shape1/eye_shape1_cl3.png",
      thumbnail: "04-2+Eyes+shape/eye_shape1/eye_shape1_cl3_thumb.png",
      price: 50000,
      currencyId: vndCurrency.id,
      productId: eyeShape1.id,
      colorId: eyeColor3.id,
    },
  });
  await prisma.productVariant.upsert({
    where: { id: 8 },
    create: {
      name: "Mắt phương đông Mistique",
      image: "04-2+Eyes+shape/eye_shape1/eye_shape1_cl4.png",
      thumbnail: "04-2+Eyes+shape/eye_shape1/eye_shape1_cl4_thumb.png",
      price: 50000,
      currencyId: vndCurrency.id,
      productId: eyeShape1.id,
      colorId: eyeColor4.id,
    },
    update: {
      name: "Mắt phương đông Mistique",
      image: "04-2+Eyes+shape/eye_shape1/eye_shape1_cl4.png",
      thumbnail: "04-2+Eyes+shape/eye_shape1/eye_shape1_cl4_thumb.png",
      price: 50000,
      currencyId: vndCurrency.id,
      productId: eyeShape1.id,
      colorId: eyeColor4.id,
    },
  });
  await prisma.productVariant.upsert({
    where: { id: 9 },
    create: {
      name: "Mắt phương đông Luster",
      image: "04-2+Eyes+shape/eye_shape1/eye_shape1_cl5.png",
      thumbnail: "04-2+Eyes+shape/eye_shape1/eye_shape1_cl5_thumb.png",
      price: 50000,
      currencyId: vndCurrency.id,
      productId: eyeShape1.id,
      colorId: eyeColor5.id,
    },
    update: {
      name: "Mắt phương đông Luster",
      image: "04-2+Eyes+shape/eye_shape1/eye_shape1_cl5.png",
      thumbnail: "04-2+Eyes+shape/eye_shape1/eye_shape1_cl5_thumb.png",
      price: 50000,
      currencyId: vndCurrency.id,
      productId: eyeShape1.id,
      colorId: eyeColor5.id,
    },
  });
  await prisma.productVariant.upsert({
    where: { id: 10 },
    create: {
      name: "Mắt phương đông Futuristic",
      image: "04-2+Eyes+shape/eye_shape1/eye_shape1_cl6.png",
      thumbnail: "04-2+Eyes+shape/eye_shape1/eye_shape1_cl6_thumb.png",
      price: 50000,
      currencyId: vndCurrency.id,
      productId: eyeShape1.id,
      colorId: eyeColor6.id,
    },
    update: {
      name: "Mắt phương đông Futuristic",
      image: "04-2+Eyes+shape/eye_shape1/eye_shape1_cl6.png",
      thumbnail: "04-2+Eyes+shape/eye_shape1/eye_shape1_cl6_thumb.png",
      price: 50000,
      currencyId: vndCurrency.id,
      productId: eyeShape1.id,
      colorId: eyeColor6.id,
    },
  });
  await prisma.productVariant.upsert({
    where: { id: 11 },
    create: {
      name: "Mắt phương đông Red zone",
      image: "04-2+Eyes+shape/eye_shape1/eye_shape1_cl7.png",
      thumbnail: "04-2+Eyes+shape/eye_shape1/eye_shape1_cl7_thumb.png",
      price: 50000,
      currencyId: vndCurrency.id,
      productId: eyeShape1.id,
      colorId: eyeColor7.id,
    },
    update: {
      name: "Mắt phương đông Red zone",
      image: "04-2+Eyes+shape/eye_shape1/eye_shape1_cl7.png",
      thumbnail: "04-2+Eyes+shape/eye_shape1/eye_shape1_cl7_thumb.png",
      price: 50000,
      currencyId: vndCurrency.id,
      productId: eyeShape1.id,
      colorId: eyeColor7.id,
    },
  });
  await prisma.productVariant.upsert({
    where: { id: 12 },
    create: {
      name: "Mắt phương đông Galantus",
      image: "04-2+Eyes+shape/eye_shape1/eye_shape1_cl8.png",
      thumbnail: "04-2+Eyes+shape/eye_shape1/eye_shape1_cl8_thumb.png",
      price: 50000,
      currencyId: vndCurrency.id,
      productId: eyeShape1.id,
      colorId: eyeColor8.id,
    },
    update: {
      name: "Mắt phương đông Galantus",
      image: "04-2+Eyes+shape/eye_shape1/eye_shape1_cl8.png",
      thumbnail: "04-2+Eyes+shape/eye_shape1/eye_shape1_cl8_thumb.png",
      price: 50000,
      currencyId: vndCurrency.id,
      productId: eyeShape1.id,
      colorId: eyeColor8.id,
    },
  });
  await prisma.productVariant.upsert({
    where: { id: 13 },
    create: {
      name: "Mắt phương đông Galantus",
      image: "04-2+Eyes+shape/eye_shape1/eye_shape1_cl9.png",
      thumbnail: "04-2+Eyes+shape/eye_shape1/eye_shape1_cl9_thumb.png",
      price: 50000,
      currencyId: vndCurrency.id,
      productId: eyeShape1.id,
      colorId: eyeColor9.id,
    },
    update: {
      name: "Mắt phương đông Galantus",
      image: "04-2+Eyes+shape/eye_shape1/eye_shape1_cl9.png",
      thumbnail: "04-2+Eyes+shape/eye_shape1/eye_shape1_cl9_thumb.png",
      price: 50000,
      currencyId: vndCurrency.id,
      productId: eyeShape1.id,
      colorId: eyeColor9.id,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

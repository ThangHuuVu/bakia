import { getCategories, getGene } from "../db";
import { ArrayElement, Awaited } from "./common";

export type CategoryType = ArrayElement<Awaited<ReturnType<typeof getCategories>>>;

export type ProductType = ArrayElement<CategoryType["products"]>;

export type GeneType = Awaited<ReturnType<typeof getGene>>;

export type VariantType = ArrayElement<ProductType["variants"]>;

export type ColorType = VariantType["color"];

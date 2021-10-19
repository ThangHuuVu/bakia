export interface Container {
  children: React.ReactNode;
}

// TODO remove when upgrade to TS 4.5
export type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;

export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

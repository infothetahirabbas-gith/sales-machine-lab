// Ambient module declarations for vite-imagetools query-string imports.
// Any import ending with `format=webp` or `format=avif` resolves to a string URL.
declare module "*format=webp" {
  const src: string;
  export default src;
}
declare module "*format=avif" {
  const src: string;
  export default src;
}
declare module "*&as=srcset" {
  const src: string;
  export default src;
}

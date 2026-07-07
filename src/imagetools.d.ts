// Ambient module declarations for vite-imagetools query-string imports.
// TypeScript wildcards in module declarations only match a single `*` segment,
// so we enumerate the common suffix patterns used across the app.
declare module "*&format=webp&quality=72" { const src: string; export default src; }
declare module "*?format=webp&quality=72&w=1200" { const src: string; export default src; }
declare module "*?format=webp&quality=70&w=640" { const src: string; export default src; }
declare module "*?w=520&format=webp&quality=72" { const src: string; export default src; }
declare module "*&as=srcset" { const src: string; export default src; }

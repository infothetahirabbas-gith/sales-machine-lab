// Ambient module declarations for vite-imagetools query-string imports.
// TypeScript wildcards in module declarations only match a single `*` segment,
// so we enumerate the common suffix patterns used across the app.
declare module "*&format=webp&quality=72" { const src: string; export default src; }
declare module "*?format=webp&quality=72&w=1200" { const src: string; export default src; }
declare module "*?format=webp&quality=70&w=640" { const src: string; export default src; }
declare module "*?format=webp&quality=62&w=560" { const src: string; export default src; }
declare module "*?w=520&format=webp&quality=72" { const src: string; export default src; }
declare module "*?format=webp&quality=68&w=960" { const src: string; export default src; }
declare module "*?format=webp&quality=58&w=560" { const src: string; export default src; }
declare module "*?format=webp&quality=58&w=480" { const src: string; export default src; }
declare module "*?format=webp&quality=62&w=720" { const src: string; export default src; }
declare module "*?format=webp&quality=60&w=800" { const src: string; export default src; }
declare module "*?format=webp&quality=55&w=480" { const src: string; export default src; }
declare module "*?format=webp&quality=58&w=640" { const src: string; export default src; }
declare module "*&as=srcset" { const src: string; export default src; }

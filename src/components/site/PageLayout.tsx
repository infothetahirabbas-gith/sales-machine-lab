import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col overflow-x-clip">
      <Header />
      <main className="flex-1 w-full max-w-full overflow-x-clip">{children}</main>
      <Footer />
    </div>
  );
}

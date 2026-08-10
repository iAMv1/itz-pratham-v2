import { Nav } from "@/components/layout/nav";
import { Rail } from "@/components/layout/rail";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { CursorRing } from "@/components/layout/cursor-ring";
import { Preloader } from "@/components/layout/preloader";
import { LenisProvider } from "@/components/layout/lenis-provider";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <LenisProvider>
      <Preloader />
      <ScrollProgress />
      <CursorRing />
      <Nav />
      <Rail />
      {children}
      <Footer />
    </LenisProvider>
  );
}

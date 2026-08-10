import { Nav } from "@/components/layout/nav";
import { Rail } from "@/components/layout/rail";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { CursorRing } from "@/components/layout/cursor-ring";
import { Preloader } from "@/components/layout/preloader";
import { LenisProvider } from "@/components/layout/lenis-provider";

export function SiteShell({ children, rail = false }: { children: React.ReactNode; rail?: boolean }) {
  return (
    <LenisProvider>
      <Preloader />
      <ScrollProgress />
      <CursorRing />
      <Nav />
      {rail ? <Rail /> : null}
      {children}
      <Footer />
    </LenisProvider>
  );
}

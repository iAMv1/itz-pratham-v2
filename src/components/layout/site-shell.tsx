import { Nav } from "@/components/layout/nav";
import { Rail } from "@/components/layout/rail";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { Preloader } from "@/components/layout/preloader";
import { LenisProvider } from "@/components/layout/lenis-provider";
import { OfflineArchive } from "@/components/layout/offline-archive";

export function SiteShell({ children, rail = false }: { children: React.ReactNode; rail?: boolean }) {
  return (
    <LenisProvider>
      <Preloader />
      <ScrollProgress />
      <Nav />
      {rail ? <Rail /> : null}
      {children}
      <OfflineArchive />
      <Footer />
    </LenisProvider>
  );
}

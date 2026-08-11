import type { Metadata } from "next";
import { Contact } from "@/components/sections/contact";
import { SiteShell } from "@/components/layout/site-shell";

export const metadata: Metadata = { title: "Contact — Pratham Nahata", description: "Open to collaborations — a product, a model, a website, a hackathon team. Live GitHub activity feed and direct email." };

export default function ContactPage() {
  return (
    <SiteShell>
      <main id="main" className="flex-1">
        <div className="pt-[72px]">
          <Contact />
        </div>
      </main>
    </SiteShell>
  );
}

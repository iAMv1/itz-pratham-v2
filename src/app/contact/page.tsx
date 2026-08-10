import type { Metadata } from "next";
import { Contact } from "@/components/sections/contact";
import { SiteShell } from "@/components/layout/site-shell";

export const metadata: Metadata = { title: "Contact — Pratham Nahata" };

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

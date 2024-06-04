import { ReactNode } from "react";
import SiteHeader from "./(client-components)/(Header)/SiteHeader";
import FooterNav from "@/components/FooterNav";
import Footer from "@/components/Footer";

type Props = {
  children: ReactNode;
};

export default async function ClientLayout({ children }: Props) {
  return (
    <>
      <SiteHeader />
      {children}
      <FooterNav />
    </>
  );
}

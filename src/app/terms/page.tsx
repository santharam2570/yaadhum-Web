import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms governing the use of the ${company.name} website.`,
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      updated="1 October 2026"
      intro={
        <p>
          These terms govern your use of this website, operated by {company.legalName}. By using the site you agree to them. Services we deliver to clients are governed
          by separate written agreements.
        </p>
      }
      sections={[
        {
          id: "use-of-site",
          title: "Use of this website",
          body: (
            <p>
              You may browse and share content from this website for personal and internal business purposes. You must not misuse the site, attempt to gain unauthorised
              access, submit malicious files, or use automated means to send enquiries or applications.
            </p>
          ),
        },
        {
          id: "intellectual-property",
          title: "Intellectual property",
          body: (
            <p>
              The {company.short} name, logo, product names, text, graphics and code on this website are owned by or licensed to {company.legalName}. You may quote short
              extracts from our articles with attribution and a link to the original.
            </p>
          ),
        },
        {
          id: "information",
          title: "Information on this site",
          body: (
            <p>
              Content is provided for general information only and does not constitute professional advice. Figures such as metrics and outcomes describe past results and
              are not a guarantee of future performance. We may update content at any time.
            </p>
          ),
        },
        {
          id: "submissions",
          title: "Your submissions",
          body: (
            <p>
              When you submit an enquiry or application you confirm that the information is accurate and that you have the right to share it. We handle submissions as
              described in our <Link href="/privacy">Privacy Policy</Link>.
            </p>
          ),
        },
        {
          id: "third-party-links",
          title: "Third-party links",
          body: <p>Links to external websites are provided for convenience. We are not responsible for their content or privacy practices.</p>,
        },
        {
          id: "liability",
          title: "Limitation of liability",
          body: (
            <p>
              To the extent permitted by law, {company.legalName} is not liable for any indirect or consequential loss arising from use of this website. Nothing in these
              terms limits liability that cannot be limited by law.
            </p>
          ),
        },
        {
          id: "governing-law",
          title: "Governing law",
          body: <p>These terms are governed by the laws of India, and the courts of Tiruchirappalli, Tamil Nadu have jurisdiction, unless mandatory local law provides otherwise.</p>,
        },
        {
          id: "contact",
          title: "Contact",
          body: (
            <p>
              Questions about these terms? Email <a href={`mailto:${company.email}`}>{company.email}</a>.
            </p>
          ),
        },
      ]}
    />
  );
}

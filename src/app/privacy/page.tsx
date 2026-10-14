import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { company, officeAddress } from "@/data/company";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${company.name} collects, uses and protects personal data.`,
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="1 October 2026"
      intro={
        <p>
          {company.name} (&ldquo;{company.short}&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) respects your privacy. This policy explains what personal data we collect through this
          website, why we collect it, and the choices you have. It is written to align with the EU and UK GDPR, India&apos;s Digital Personal Data Protection Act 2023 and
          similar laws worldwide.
        </p>
      }
      sections={[
        {
          id: "data-we-collect",
          title: "Data we collect",
          body: (
            <>
              <p>We only collect personal data that you choose to give us, or that is technically necessary to run this website:</p>
              <ul>
                <li>
                  <strong>Enquiries:</strong> name, work email, company, phone number, country and the details of your request.
                </li>
                <li>
                  <strong>Job applications:</strong> name, contact details, location, experience, notice period, profile links, cover letter and your resume.
                </li>
                <li>
                  <strong>Newsletter:</strong> your email address and where you subscribed.
                </li>
                <li>
                  <strong>Technical data:</strong> IP address and basic request information, used briefly for security and abuse prevention.
                </li>
              </ul>
            </>
          ),
        },
        {
          id: "how-we-use-it",
          title: "How we use your data",
          body: (
            <ul>
              <li>To respond to your enquiry and provide proposals or demos (legitimate interest / pre-contract steps).</li>
              <li>To assess your application for current and future roles (consent).</li>
              <li>To send our newsletter, which you can unsubscribe from at any time (consent).</li>
              <li>To keep this website secure and prevent spam or misuse (legitimate interest).</li>
            </ul>
          ),
        },
        {
          id: "retention",
          title: "Retention",
          body: (
            <p>
              Enquiries are kept for up to 24 months after our last interaction. Job applications and resumes are kept for up to 12 months unless you ask us to delete them sooner.
              Newsletter data is kept until you unsubscribe.
            </p>
          ),
        },
        {
          id: "sharing",
          title: "Sharing and international transfers",
          body: (
            <p>
              We never sell personal data. We share it only with service providers who help us operate (for example hosting and email), under contracts that require
              appropriate safeguards. Where data is transferred across borders, we rely on recognised mechanisms such as Standard Contractual Clauses.
            </p>
          ),
        },
        {
          id: "cookies",
          title: "Cookies",
          body: <p>This website uses only strictly necessary cookies required for it to function. We do not use advertising or cross-site tracking cookies.</p>,
        },
        {
          id: "security",
          title: "Security",
          body: (
            <p>
              We apply technical and organisational measures aligned with ISO 27001 practices, including encryption in transit, access controls and least-privilege
              access to submissions.
            </p>
          ),
        },
        {
          id: "your-rights",
          title: "Your rights",
          body: (
            <p>
              Depending on where you live, you may have the right to access, correct, delete or export your personal data, to withdraw consent, and to object to or
              restrict processing. To exercise any of these rights, email <a href={`mailto:${company.email}`}>{company.email}</a>. You may also complain to your local data
              protection authority.
            </p>
          ),
        },
        {
          id: "contact",
          title: "Contact",
          body: (
            <p>
              Questions about this policy can be sent to <a href={`mailto:${company.email}`}>{company.email}</a> or by post to {company.legalName}, {officeAddress(company.hq)}.
            </p>
          ),
        },
      ]}
    />
  );
}

import React from "react";
import { Mail, Globe, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function PrivacyPolicyPage() {
  const policySections = [
    {
      title: "1. Information We Collect",
      content: "We may collect the following types of information:",
      subsections: [
        {
          title: "a) Personal Information",
          points: [
            "Name, email address, phone number, and account details when you register.",
            "Payment details (processed securely by third-party providers).",
            "Resume, CV, or documents you voluntarily upload.",
          ],
        },
        {
          title: "b) Usage Data",
          points: [
            "App activity (features used, learning progress, test results).",
            "Device information (IP address, browser type, operating system, device ID).",
            "Log data, cookies, and analytics to improve performance.",
          ],
        },
        {
          title: "c) Sensitive Data",
          points: [
            "We do not collect sensitive personal data (such as health, religion, or biometric information) unless explicitly provided by you for specific features.",
          ],
        },
      ],
    },
    {
      title: "2. How We Use Your Information",
      content: "We use collected information to:",
      points: [
        "Provide, operate, and improve our services.",
        "Personalize user experience with AI-driven recommendations.",
        "Process payments and subscriptions.",
        "Communicate updates, offers, and support.",
        "Conduct research, analytics, and product development.",
        "Ensure compliance with legal obligations.",
      ],
    },
    {
      title: "3. Sharing of Information",
      content: "We may share your information in the following cases:",
      points: [
        "Service Providers: With trusted third-party vendors (e.g., payment gateways, analytics, hosting).",
        "Legal Requirements: When required by law, regulation, or to protect rights and safety.",
        "Business Transfers: In case of merger, acquisition, or sale of assets.",
      ],
      footer: "We do not sell your personal information to third parties.",
    },
    {
      title: "4. Cookies & Tracking",
      content: "We use cookies and similar technologies to:",
      points: [
        "Remember preferences and login sessions.",
        "Measure performance and usage analytics.",
        "Deliver relevant content and ads.",
      ],
      footer:
        "You can disable cookies via your browser settings, but some features may not function properly.",
    },
    {
      title: "5. Data Retention",
      content:
        "We retain your information as long as necessary to provide services and comply with legal obligations. You may request deletion of your account and associated data anytime.",
    },
    {
      title: "6. Your Privacy Rights",
      content:
        "Depending on your location, you may have rights under laws such as GDPR (EU), CCPA (California), or other regulations. These include:",
      points: [
        "Right to access, correct, or delete your data.",
        "Right to opt out of data processing or marketing communications.",
        "Right to portability of your personal data.",
      ],
      footer: "Requests can be made by contacting us at support@thetaurus.ai.",
    },
    {
      title: "7. Children’s Privacy",
      content:
        "Our App is not directed at children under the age of 13 (or the minimum legal age in your country). We do not knowingly collect data from children. If you believe we have collected such data, please contact us to delete it.",
    },
    {
      title: "8. Data Security",
      content:
        "We implement industry-standard measures (encryption, secure servers, limited access) to protect your data. However, no system is 100% secure, and we cannot guarantee absolute security.",
    },
    {
      title: "9. Third-Party Links",
      content:
        "Our App and website may contain links to third-party services. We are not responsible for the privacy practices of such external sites.",
    },
    {
      title: "10. International Data Transfers",
      content:
        "Your data may be transferred and processed in countries other than your own. By using our services, you consent to such transfers, which we secure through appropriate safeguards.",
    },
    {
      title: "11. Updates to This Policy",
      content:
        "We may update this Privacy Policy from time to time. Changes will be reflected with an updated “Last Updated” date. Continued use of our services after updates indicates acceptance.",
    },
  ];

  return (
    <div className="bg-white text-black font-sans leading-relaxed">
      <Link to="/" className="flex items-center my-4 px-4">
        <ArrowLeft size={18} className="mr-2" /> Go Back
      </Link>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-2 sm:p-12">
          <header className="text-left mb-4 md:mb-12">
            <h1 className="text-2xl md:text-2xl lg:text-3xl font-semibold text-black tracking-tight">
              📜 Privacy Policy for Taurus AI
            </h1>
          </header>

          <section className="prose prose-lg max-w-none">
            <p className="text-lg">
              Taurus AI (“Company,” “we,” “our,” or “us”) respects your privacy
              and is committed to protecting it through this Privacy Policy.
              This document explains how we collect, use, disclose, and
              safeguard your information when you use our website
              www.thetaurus.ai and our mobile application (“App”).
            </p>
            <p className="text-lg bg-white border-l-4 border-black p-4 rounded-r-lg">
              If you do not agree with the terms of this Privacy Policy, please
              do not access the App or our services.
            </p>
          </section>

          <div className="mt-12 space-y-10">
            {policySections.map((section, index) => (
              <section key={index}>
                <h2 className="text-2xl font-semibold text-black mb-4 pb-2 border-b border-gray-700">
                  {section.title}
                </h2>
                <div className="space-y-4 text-black">
                  {section.content && <p>{section.content}</p>}

                  {section.points && (
                    <ul className="space-y-2 list-disc list-inside pl-4">
                      {section.points.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  )}

                  {section.subsections && (
                    <div className="space-y-4 pl-4">
                      {section.subsections.map((sub, i) => (
                        <div key={i}>
                          <h3 className="font-semibold text-black">
                            {sub.title}
                          </h3>
                          <ul className="space-y-2 list-disc list-inside pl-4 mt-2">
                            {sub.points.map((point, j) => (
                              <li key={j}>{point}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.footer && <p className="mt-4">{section.footer}</p>}
                </div>
              </section>
            ))}

            <section>
              <h2 className="text-2xl font-bold text-black mb-4 pb-2 border-b border-gray-700">
                12. Contact Us
              </h2>
              <div className="border border-black rounded-lg p-6">
                <p className="text-black mb-4">
                  If you have any questions about this Privacy Policy or wish to
                  exercise your privacy rights, please contact us:
                </p>
                <div className="flex items-center text-black mb-2">
                  <Mail className="w-6 h-6 mr-2" />
                  <span className="font-semibold mr-2">Email:</span>
                  <a
                    href="mailto:support@thetaurus.ai"
                    className="text-black hover:underline"
                  >
                    support@thetaurus.ai
                  </a>
                </div>
                <div className="flex items-center text-black">
                  <Globe className="w-6 h-6 mr-2" />
                  <span className="font-semibold mr-2">Website:</span>
                  <a
                    href="https://www.thetaurus.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black hover:underline"
                  >
                    www.thetaurus.ai
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

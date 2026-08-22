export const metadata = {
  title: "Privacy Policy | Lasting Moments Booth",
  description: "How Lasting Moments Booth, LLC collects, uses, and protects your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 text-black">
      <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-600 mb-8">
        Lasting Moments Booth, LLC · Effective August 8, 2026
      </p>

      <p className="mb-6">
        Lasting Moments Booth, LLC (“we,” “us”) explains here how we collect, use, and
        protect information when you visit our website, request a quote, book an event,
        or contact us.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">Information we collect</h2>
      <ul className="list-disc pl-6 space-y-1 mb-6">
        <li>Contact info — name, email, phone from our booking/contact forms.</li>
        <li>Event details — date, location, event type, guest count, package.</li>
        <li>Payment info — deposits/balances processed by Clover; we don’t store full card numbers.</li>
        <li>Photos/videos — images and video captured during your event.</li>
        <li>Communications — emails, contracts, and feedback you send us.</li>
        <li>Basic site usage data — standard technical info like browser type and pages visited.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3">How we use it</h2>
      <ul className="list-disc pl-6 space-y-1 mb-6">
        <li>Respond to inquiries, prepare quotes, and manage bookings and contracts</li>
        <li>Process deposit/balance payments through Clover</li>
        <li>Coordinate event logistics and deliver your photos/videos</li>
        <li>Respond to feedback, and send service emails (contracts, payment reminders)</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3">Photos and videos from your event</h2>
      <p className="mb-6">
        We provide your event photos/videos to you as part of our service, and may use
        select images in our online gallery, website, or social media — only with your
        consent, requested separately (e.g. in your booking contract). Let us know if
        you’d prefer we not use them publicly.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">How we share it</h2>
      <p className="mb-6">
        We do not sell your information. We share only what’s needed with: Clover
        (payments), Resend (contract/reminder emails), Vercel (hosting), and Zoho Mail
        (business email). These providers use it only to perform their service for us.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">Data retention &amp; security</h2>
      <p className="mb-6">
        We keep booking, contract, and payment records as long as needed for our
        services, legal and tax obligations, and dispute resolution. Event photos/videos
        are kept to deliver them to you and, with consent, for portfolio use. We rely on
        established providers (Clover, Resend, Vercel) with their own security standards;
        no method of transmission is completely secure.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">Your choices and rights</h2>
      <p className="mb-6">
        You may ask us to access, correct, or delete your personal information (subject
        to our legal/record-keeping obligations), opt out of public use of your event
        photos, or unsubscribe from non-essential emails — service emails needed to
        complete your booking will still be sent. Contact us below to make a request.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">Children’s privacy</h2>
      <p className="mb-6">
        Our services are for adults booking events. We do not knowingly collect personal
        information directly from children under 18 through our website.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">Changes to this policy</h2>
      <p className="mb-6">
        We may update this policy from time to time; the effective date above reflects
        the latest version. Continued use of our services after changes take effect
        means you accept the update.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">Contact us</h2>
      <p>
        Lasting Moments Booth, LLC ·{" "}
        <a href="mailto:info@lastingmomentsboothllc.com" className="underline">
          info@lastingmomentsboothllc.com
        </a>{" "}
        · lastingmomentsboothllc.com
      </p>
    </main>
  );
}

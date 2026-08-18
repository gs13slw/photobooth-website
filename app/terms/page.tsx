export const metadata = {
  title: "Terms of Service | Lasting Moments Booth",
  description: "Terms of Service and Booking Agreement for Lasting Moments Booth, LLC.",
};

export default function TermsOfServicePage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 text-black">
      <h1 className="text-3xl font-bold mb-2">Terms of Service &amp; Booking Agreement</h1>
      <p className="mb-8">
        By remitting a deposit or making a payment for services, you explicitly
        agree to all contract terms, conditions, and policies outlined below by
        Lasting Moments Booth, LLC.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">1. Advance Booking Requirement</h2>
      <ul className="list-disc pl-6 space-y-1 mb-6">
        <li>
          <strong>Standard Booking Lead Time:</strong> All bookings must be made
          4 to 6 weeks in advance.
        </li>
        <li>
          <strong>Children&apos;s Birthday Parties Exception:</strong> The only
          exception is children&apos;s birthday party bookings, which require a
          minimum of 2 weeks advance notice.
        </li>
        <li>
          <strong>Late Bookings:</strong> Bookings made with less advance notice
          than required are subject to Company availability and final approval.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3">2. Cancellation and Refund Policy</h2>
      <p className="mb-4">
        The only cancellation and refund exceptions under this Agreement are
        for severe weather or a verified medical emergency as described below.
      </p>
      <p className="mb-4">
        <strong>Exception: Severe Weather or Medical Emergency</strong> — If a
        cancellation made less than 7 days before the event is due to severe
        weather or a medical emergency, and the Client submits supporting
        documentation (such as an official weather advisory, medical note, or
        hospital record) to the Company, the Client may choose one of the
        following options instead of forfeiting funds paid:
      </p>
      <ul className="list-disc pl-6 space-y-1 mb-4">
        <li>A 50% refund of total funds paid, OR</li>
        <li>
          A 100% credit of total funds paid toward rescheduling the event to a
          new date, subject to Company availability.
        </li>
      </ul>
      <p className="mb-6">
        <strong>Documentation Requirement:</strong> Official documentation must
        be submitted to the Company within 7 days of cancellation for this
        exception to apply. The Company reserves the right to determine, in
        good faith, whether submitted documentation reasonably supports the
        claimed severe weather or medical emergency.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">3. How to Cancel</h2>
      <p className="mb-6">
        Cancellation requests must be submitted in writing via email to{" "}
        <a href="mailto:info@lastingmomentsbooth.com" className="underline">
          info@lastingmomentsbooth.com
        </a>
        . The official cancellation date is recorded as the date the Company
        receives the written request, not the date the Client decided to
        cancel.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">4. General Terms</h2>
      <ul className="list-disc pl-6 space-y-1 mb-6">
        <li>
          <strong>Non-Transferable:</strong> This Agreement is strictly between
          the Company and the Client and is not transferable without the
          Company&apos;s written consent.
        </li>
        <li>
          <strong>Liability Limits:</strong> The Company will make commercially
          reasonable efforts to provide all contracted services, but is not
          liable for delays, interruptions, or failures caused by circumstances
          beyond its reasonable control (including severe weather, venue
          restrictions, or equipment failure despite reasonable precautions).
        </li>
        <li>
          <strong>Governing Law:</strong> This Agreement is governed by and
          construed in accordance with the laws of the State of Georgia.
        </li>
      </ul>
    </main>
  );
}

import BookingFlow from "./BookingFlow";
import { CalendarCheck } from "lucide-react";

export default function BookingSection() {
  return (
    <section id="booking" className="relative bg-[#8A6D1E] py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[500px] w-[800px] -translate-x-1/2 bg-black/10 opacity-60 blur-3xl" />
      </div>

      <div className="container-x relative">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center text-black">
            <CalendarCheck size={13} />
            Booking
          </span>
          <h2 className="mt-5 text-balance font-display text-4xl font-semibold tracking-tight text-black sm:text-5xl">
            Build your quote in under a minute.
          </h2>
          <p className="mt-5 text-balance text-lg text-black/80">
            Answer a few quick questions, pick your date, and get a live
            estimate. No account, no phone call required.
          </p>
        </div>

        <div className="mt-14">
          <BookingFlow />
        </div>
      </div>
    </section>
  );
}

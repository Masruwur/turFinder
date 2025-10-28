import { Wallet } from "lucide-react";
import { useEffect } from "react";
import { TurfEntity } from "../data/mockData";
import { useLocation, useNavigate } from "react-router-dom";
import type { SelectedSlot } from "./slot";

interface PaymentLocationState {
  turf: TurfEntity;
  selectedSlots: SelectedSlot[];
  totalAmount: number;
}

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as PaymentLocationState | undefined;

  useEffect(() => {
    if (!state) {
      navigate("/turfind", { replace: true });
    }
  }, [state, navigate]);

  if (!state) {
    return null;
  }

  const { turf, selectedSlots, totalAmount } = state;
  const formattedTotal = totalAmount.toLocaleString("en-US", {
    maximumFractionDigits: 0,
  });

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans dark:bg-gray-950 dark:text-gray-50">
      <header className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="font-mono text-2xl tracking-wide"
          aria-label="Back">
          ‹
        </button>
        <h1 className="font-mono text-xl tracking-wide">CHECKOUT</h1>
      </header>

      <main className="max-w-6xl mx-auto px-4 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* LEFT: Payment details */}
        <section className="lg:col-span-7 xl:col-span-8">
          <h2 className="font-mono text-lg mb-3 tracking-wide">
            PAYMENT DETAILS
          </h2>

          {/* Credit/Debit */}
          <div className="border border-gray-300 dark:border-gray-700 rounded-sm overflow-hidden mb-4">
            <div className="flex items-center gap-4 p-2">
              <div className="w-10 h-10 grid place-items-center bg-gray-950/5 dark:bg-gray-50/5 rounded-sm">
                💳
              </div>
              <div className="font-mono font-medium tracking-wide">
                CREDIT/DEBIT CARD
              </div>
            </div>
          </div>

          {/* bkash */}
          <div className="border border-gray-300 dark:border-gray-700 rounded-sm overflow-hidden mb-4 cursor-pointer">
            <div className="flex items-start gap-4 p-4">
              <Wallet />
              <div>
                <div className="font-mono font-medium tracking-wide">bKash</div>
              </div>
            </div>
          </div>

          {/* Card form */}
          <div className="space-y-5">
            <Field label="CARD NUMBER">
              <input
                placeholder="1234 5678 9012 3456"
                className="w-full h-12 px-4 bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-800 dark:focus:ring-gray-200 font-mono tracking-wide"
              />
            </Field>

            <div className="grid grid-cols-2 gap-5">
              <Field label="MONTH">
                <select className="w-full h-12 px-4 bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-800 dark:focus:ring-gray-200 font-mono tracking-wide">
                  <option>MM</option>
                  {Array.from({ length: 12 }, (_, i) => {
                    const v = String(i + 1).padStart(2, "0");
                    return <option key={v}>{v}</option>;
                  })}
                </select>
              </Field>
              <Field label="YEAR">
                <select className="w-full h-12 px-4 bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-800 dark:focus:ring-gray-200 font-mono tracking-wide">
                  <option>YYYY</option>
                  {Array.from({ length: 11 }, (_, i) => 2025 + i).map((y) => (
                    <option key={y}>{y}</option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="SECURITY CODE">
              <input
                placeholder="123"
                className="w-full h-12 px-4 bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-800 dark:focus:ring-gray-200 font-mono tracking-wide"
              />
            </Field>

            <Field label="CARDHOLDER NAME">
              <input
                placeholder="JOHN"
                className="w-full h-12 px-4 bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-800 dark:focus:ring-gray-200 font-mono tracking-wide uppercase"
              />
            </Field>
          </div>
        </section>

        {/* RIGHT: Order summary (yellow ticket style) */}
        <aside className="lg:col-span-5 xl:col-span-4">
          <h2 className="sr-only">Order Summary</h2>
          <Ticket
            turf={turf}
            selectedSlots={selectedSlots}
            totalAmount={totalAmount}
          />
        </aside>
      </main>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="font-mono text-xs mb-2 tracking-wide">{label}</div>
      {children}
    </label>
  );
}

interface TicketProps {
  turf: TurfEntity;
  selectedSlots: SelectedSlot[];
  totalAmount: number;
}

function Ticket({ turf, selectedSlots, totalAmount }: TicketProps) {
  const formatDate = (isoDate: string) =>
    new Date(isoDate).toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });

  const formatCurrency = (value: number) =>
    value.toLocaleString("en-US", { maximumFractionDigits: 0 });

  const ticketDate = selectedSlots[0]?.date
    ? formatDate(selectedSlots[0].date)
    : "—";

  return (
    <div className="bg-yellow-400 text-gray-900 rounded-md shadow-[0_10px_30px_-10px_rgba(250,204,21,0.4)] border border-black/20 overflow-hidden">
      {/* Ticket Header Row */}
      <div className="px-5 py-4 flex items-center gap-3 border-b border-black/20">
        <div className="font-mono text-base font-semibold tracking-wide">
          turFinder*
        </div>
        <div className="ml-auto">
          <span className="font-mono px-2 py-1 text-sm border border-black/30 rounded-sm bg-black/5 tracking-wide">
            INFO
          </span>
        </div>
        <div className="font-mono text-sm tracking-wide">SL / G</div>
      </div>

      {/* Grey strip */}
      <div className="bg-gray-100 text-gray-900 px-5 py-4 border-b border-black/20">
        <div className="flex items-center justify-between font-mono tracking-wide">
          <span>{turf.slotDuration} minutes</span>
          <span>{turf.name}</span>
        </div>
        <div className="font-mono text-2xl mt-1 tracking-wide">
          {ticketDate}
        </div>
      </div>

      {/* Checklist items */}
      <div className="px-5 py-4 space-y-4 font-redhatmono">
        {selectedSlots.map((slot) => (
          <div
            key={`${slot.date}-${slot.slotId}`}
            className="flex items-start gap-5">
            <div className="w-4 h-4 border-2 border-black/80 rounded-sm mt-1 bg-black text-white text-xs grid place-items-center">
              ✓
            </div>
            <div className="flex-1">
              <div className="text-lg tracking-wide">
                {slot.slot.start} – {slot.slot.end}
              </div>
              <div className="text-sm text-gray-700 tracking-wide">
                {formatDate(slot.date)}
              </div>
            </div>
            <div className="font-mono text-sm tracking-wide">
              &#2547;{formatCurrency(slot.price)}
            </div>
          </div>
        ))}
      </div>

      {/* Barcode row */}
      <div className="px-5 pb-4">
        <div className="h-px bg-black/30 my-2" />
        <div className="flex items-center justify-between font-mono text-sm text-gray-700 tracking-wide">
          <span>{selectedSlots.length} slot(s)</span>
          <span>&#2547;{formatCurrency(totalAmount)}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-4 grid grid-cols-3 gap-3 items-end border-t border-black/20">
        <div>
          <div className="font-mono text-xs tracking-wide">RECEIPT</div>
          <div className="font-mono text-xs tracking-wide">
            TURF #{turf.id.toString().padStart(3, "0")}
          </div>
        </div>
        <div>
          <div className="font-mono text-xs tracking-wide">TIME & DATE</div>
          <div className="font-mono text-xs tracking-wide">
            {selectedSlots[0]?.slot.start} – {selectedSlots[0]?.slot.end}
          </div>
          <div className="font-mono text-xs tracking-wide">{ticketDate}</div>
        </div>
        <div className="ml-auto w-40 h-10 bg-[repeating-linear-gradient(90deg,black,black_4px,transparent_4px,transparent_8px)]" />
      </div>

      {/* Totals sidebar mimic */}
      <div className="px-5 py-5 bg-black/5 border-t border-black/20">
        <div className="flex items-center justify-between font-mono mt-4 text-lg tracking-wide">
          <span>TOTAL</span>
          <span>&#2547;{formatCurrency(totalAmount)}</span>
        </div>
      </div>
    </div>
  );
}

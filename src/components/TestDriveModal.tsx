import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Calendar, Car, MapPin, User, Mail, Phone } from 'lucide-react';
import { VEHICLES } from '../data/vehicles';
import { GLOBAL_DEALERS } from '../data/dealers';
import type { VehicleId } from '../types';

interface TestDriveModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialVehicleId?: VehicleId;
}

export const TestDriveModal: React.FC<TestDriveModalProps> = ({
  isOpen,
  onClose,
  initialVehicleId = 't2',
}) => {
  const [vehicleId, setVehicleId] = useState<VehicleId>(initialVehicleId);
  const [selectedDealer, setSelectedDealer] = useState(GLOBAL_DEALERS[0]?.id || '');
  const [date, setDate] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialVehicleId) setVehicleId(initialVehicleId);
  }, [initialVehicleId]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const selectedVehicleObj = VEHICLES.find((v) => v.id === vehicleId) || VEHICLES[0];

  return (
    <div
      id="test-drive-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div
        id="test-drive-modal-card"
        className="w-full max-w-xl bg-[#141618] border border-white/20 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <span className="text-xs uppercase font-bold text-[#39AEB2] tracking-wider font-goldman">
              Experience the Drive
            </span>
            <h3 className="text-2xl font-bold font-goldman text-white mt-0.5">
              Book a Test Drive
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 md:p-8 max-h-[75vh] overflow-y-auto">
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#39AEB2]/20 text-[#39AEB2] flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 size={36} />
              </div>
              <h4 className="text-2xl font-bold font-goldman text-white">
                Test Drive Scheduled!
              </h4>
              <p className="text-sm text-gray-300 max-w-sm mx-auto leading-relaxed">
                Thank you, {fullName}. Your appointment for the{' '}
                <strong className="text-white">{selectedVehicleObj.name}</strong> has been
                registered. Your local dealer will contact you to confirm timing.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="mt-6 bg-[#39AEB2] text-black font-bold px-8 py-3 rounded-full text-xs uppercase tracking-wider"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Vehicle Selection Preview */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  Select Model
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {VEHICLES.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setVehicleId(v.id)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        vehicleId === v.id
                          ? 'border-[#39AEB2] bg-[#39AEB2]/15 text-white font-bold'
                          : 'border-white/10 bg-white/5 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      <span className="text-xs block truncate">{v.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dealer selector */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  Preferred Authorized Showroom
                </label>
                <select
                  value={selectedDealer}
                  onChange={(e) => setSelectedDealer(e.target.value)}
                  className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#39AEB2]"
                >
                  {GLOBAL_DEALERS.map((d) => (
                    <option key={d.id} value={d.id} className="bg-[#141618] text-white">
                      {d.country} — {d.company} ({d.city})
                    </option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  Preferred Date
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#39AEB2]"
                />
              </div>

              {/* Personal Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#39AEB2]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+971 50 123 4567"
                    className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#39AEB2]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#39AEB2]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#39AEB2] hover:bg-[#2e9498] text-black font-bold py-3.5 rounded-full text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95"
              >
                <span>Confirm Test Drive Request</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

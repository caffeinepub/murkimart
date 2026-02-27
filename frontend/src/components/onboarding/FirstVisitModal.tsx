import React, { useState } from 'react';
import { MapPin, Phone, Home, Navigation, X } from 'lucide-react';
import { useAuthStore } from '@/lib/authStore';
import { useAddressStore } from '@/lib/addressStore';

const LOCALITIES = [
  'Murki Bazar',
  'Zafarabad Road',
  'Bypass Road',
  'Civil Lines',
  'Katra Bazar',
];

interface FirstVisitModalProps {
  onClose: () => void;
}

export default function FirstVisitModal({ onClose }: FirstVisitModalProps) {
  const login = useAuthStore((s) => s.login);
  const addAddress = useAddressStore((s) => s.addAddress);

  const [phone, setPhone] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [street, setStreet] = useState('');
  const [landmark, setLandmark] = useState('');
  const [locality, setLocality] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }
    if (!houseNumber.trim()) {
      newErrors.houseNumber = 'House / flat number is required';
    }
    if (!locality) {
      newErrors.locality = 'Please select your locality';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    login({
      name: `Customer`,
      phone,
    });

    addAddress({
      label: 'Home',
      houseNumber: houseNumber.trim(),
      street: street.trim(),
      landmark: landmark.trim(),
      locality,
      isDefault: true,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 pt-6 pb-8">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-bold text-lg">MurkiMart</span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              aria-label="Skip for now"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <h2 className="text-white text-xl font-bold mt-3">
            Welcome! Let's get you set up 🛒
          </h2>
          <p className="text-orange-100 text-sm mt-1">
            Enter your number & address for fast delivery
          </p>
        </div>

        {/* Decorative wave */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-4 relative">
          <div className="absolute inset-x-0 bottom-0 h-4 bg-white rounded-t-3xl" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 pb-6 pt-2 space-y-4">
          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              <Phone className="w-3.5 h-3.5 inline mr-1 text-orange-500" />
              Mobile Number
            </label>
            <div className="flex items-center border-2 rounded-xl overflow-hidden focus-within:border-orange-500 transition-colors border-gray-200">
              <span className="px-3 py-2.5 bg-gray-50 text-gray-500 text-sm font-medium border-r border-gray-200">
                +91
              </span>
              <input
                type="tel"
                inputMode="numeric"
                maxLength={10}
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value.replace(/\D/g, '').slice(0, 10));
                  if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
                }}
                placeholder="10-digit number"
                className="flex-1 px-3 py-2.5 text-sm outline-none bg-white"
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>

          {/* House Number */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              <Home className="w-3.5 h-3.5 inline mr-1 text-orange-500" />
              House / Flat Number
            </label>
            <input
              type="text"
              value={houseNumber}
              onChange={(e) => {
                setHouseNumber(e.target.value);
                if (errors.houseNumber) setErrors((prev) => ({ ...prev, houseNumber: '' }));
              }}
              placeholder="e.g. 42, Block B"
              className="w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-orange-500 transition-colors"
            />
            {errors.houseNumber && (
              <p className="text-red-500 text-xs mt-1">{errors.houseNumber}</p>
            )}
          </div>

          {/* Street */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Street / Colony
              <span className="text-gray-400 font-normal ml-1">(optional)</span>
            </label>
            <input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="e.g. Gandhi Nagar"
              className="w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-orange-500 transition-colors"
            />
          </div>

          {/* Locality */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              <Navigation className="w-3.5 h-3.5 inline mr-1 text-orange-500" />
              Locality
            </label>
            <select
              value={locality}
              onChange={(e) => {
                setLocality(e.target.value);
                if (errors.locality) setErrors((prev) => ({ ...prev, locality: '' }));
              }}
              className="w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-orange-500 transition-colors bg-white appearance-none"
            >
              <option value="">Select your area</option>
              {LOCALITIES.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
            {errors.locality && (
              <p className="text-red-500 text-xs mt-1">{errors.locality}</p>
            )}
          </div>

          {/* Landmark */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Landmark
              <span className="text-gray-400 font-normal ml-1">(optional)</span>
            </label>
            <input
              type="text"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
              placeholder="e.g. Near Murki Bazar"
              className="w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-orange-500 transition-colors"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-3 rounded-xl text-sm hover:from-green-700 hover:to-green-800 transition-all shadow-md active:scale-95"
          >
            Save & Start Shopping 🛍️
          </button>

          {/* Skip */}
          <button
            type="button"
            onClick={onClose}
            className="w-full text-gray-400 text-xs py-1 hover:text-gray-500 transition-colors"
          >
            Skip for now
          </button>
        </form>
      </div>
    </div>
  );
}

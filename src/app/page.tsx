'use client';

import React, { useState } from 'react';

export default function LeaseCreate() {
  const [formData, setFormData] = useState({
    name: '',
    flatNumber: '',
    towerNo: '',
    leaseStartDate: '',
    leaseEndDate: '',
    monthlyLeaseAmount: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/leases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message);
        setFormData({
          name: '',
          flatNumber: '',
          towerNo: '',
          leaseStartDate: '',
          leaseEndDate: '',
          monthlyLeaseAmount: ''
        });
      } else {
        setStatus('error');
        setMessage(data.error || 'Failed to create lease');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-2xl">
        {/* Header Section */}
        <div className="mb-10 space-y-2">
          <div className="inline-block px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 mb-4">
            <span className="text-xs font-semibold tracking-wide text-zinc-400 uppercase">Core Platform</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-br from-black to-zinc-500 bg-clip-text text-transparent">
            Create Lease
          </h1>
          <p className="text-zinc-400 text-lg">
            Register a new tenant agreement in the deterministic system.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-zinc-900/40 border border-zinc-800/50 rounded-2xl p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
          {/* Subtle glow effect */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="space-y-4">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300 ml-1">Tenant Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-black/40 border border-zinc-800 rounded-xl px-4 py-3 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-sm"
                  placeholder="e.g. John Doe"
                />
              </div>

              {/* Property Details Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300 ml-1">Flat Number</label>
                  <input
                    type="text"
                    name="flatNumber"
                    required
                    value={formData.flatNumber}
                    onChange={handleChange}
                    className="w-full bg-black/40 border border-zinc-800 rounded-xl px-4 py-3 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-sm"
                    placeholder="e.g. 402B"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300 ml-1">Tower No</label>
                  <input
                    type="text"
                    name="towerNo"
                    required
                    value={formData.towerNo}
                    onChange={handleChange}
                    className="w-full bg-black/40 border border-zinc-800 rounded-xl px-4 py-3 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-sm"
                    placeholder="e.g. Tower A"
                  />
                </div>
              </div>

              {/* Dates Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300 ml-1">Lease Start</label>
                  <input
                    type="date"
                    name="leaseStartDate"
                    required
                    value={formData.leaseStartDate}
                    onChange={handleChange}
                    className="w-full bg-black/40 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-sm [color-scheme:dark]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300 ml-1">Lease End</label>
                  <input
                    type="date"
                    name="leaseEndDate"
                    required
                    value={formData.leaseEndDate}
                    onChange={handleChange}
                    className="w-full bg-black/40 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-sm [color-scheme:dark]"
                  />
                </div>
              </div>

              {/* Amount */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300 ml-1">Monthly Lease Amount ($)</label>
                <input
                  type="number"
                  name="monthlyLeaseAmount"
                  required
                  min="0"
                  step="0.01"
                  value={formData.monthlyLeaseAmount}
                  onChange={handleChange}
                  className="w-full bg-black/40 border border-zinc-800 rounded-xl px-4 py-3 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-sm"
                  placeholder="e.g. 2500.00"
                />
              </div>
            </div>

            {/* Status Messages */}
            {status === 'success' && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm px-4 py-3 rounded-xl flex items-center space-x-2">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{message}</span>
              </div>
            )}

            {status === 'error' && (
              <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm px-4 py-3 rounded-xl flex items-center space-x-2">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{message}</span>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-white text-black font-semibold rounded-xl px-4 py-3.5 hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg shadow-white/10"
              >
                {status === 'loading' ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Saving...</span>
                  </>
                ) : (
                  <span>Create Lease Record</span>
                )}
              </button>
            </div>

          </form>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center text-xs text-zinc-600">
          Deterministic execution enforced • No runtime logic generation
        </div>
      </div>
    </div>
  );
}

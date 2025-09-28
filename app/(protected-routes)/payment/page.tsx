'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

type PaymentPlan = 'quarterly' | 'annual';

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedPlan, setSelectedPlan] = useState<PaymentPlan>('quarterly');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    holderName: '',
    email: '',
    billingAddress: {
      street: '',
      city: '',
      postalCode: '',
      country: 'PT'
    }
  });

  useEffect(() => {
    const planParam = searchParams.get('plan');
    if (planParam === 'annual' || planParam === 'quarterly') {
      setSelectedPlan(planParam);
    }
  }, [searchParams]);

  const plans = {
    quarterly: {
      name: 'Quarterly Flex',
      price: 90,
      period: '3 months',
      features: [
        '3 usage months within 12 months validity',
        'Use flexibly: 1-3 months or separate stays',
        'Utility coverage included (up to €200/month)',
        'No booking fees',
        'Standard support',
        'EU/EEA verified community access'
      ]
    },
    annual: {
      name: 'Annual',
      price: 270,
      period: '12 months',
      features: [
        '12 usage months within 12 months validity',
        'All Quarterly features included',
        'Priority support',
        'Early access to new features',
        'Save €90 compared to 4 Quarterly passes',
        'Best value for frequent travelers'
      ]
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('billing.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        billingAddress: {
          ...prev.billingAddress,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real implementation, you would process the payment here
      // and redirect to a success page or dashboard
      router.push(`/payment/success?plan=${selectedPlan}`);
    } catch (error) {
      console.error('Payment failed:', error);
      setLoading(false);
    }
  };

  const formatCardNumber = (value: string) => {
    return value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
  };

  const formatExpiryDate = (value: string) => {
    return value.replace(/\D/g, '').replace(/(\d{2})(\d{2})/, '$1/$2');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/dashboard" className="flex items-center gap-2">
              <img src="/logoyellowprint-removebg-preview.png" alt="HomePass logo" className="w-40 h-auto" />
            </Link>
            <div className="text-sm text-slate-600">
              Secure Payment
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Plan Selection */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Choose Your Plan</h2>
            
            <div className="space-y-4">
              {Object.entries(plans).map(([key, plan]) => (
                <label key={key} className="block">
                  <input
                    type="radio"
                    name="plan"
                    value={key}
                    checked={selectedPlan === key}
                    onChange={(e) => setSelectedPlan(e.target.value as PaymentPlan)}
                    className="sr-only"
                  />
                  <div className={`border rounded-xl p-4 cursor-pointer transition-all ${
                    selectedPlan === key 
                      ? 'border-emerald-500 bg-emerald-50 shadow-md' 
                      : 'border-slate-200 hover:border-slate-300'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-slate-900">{plan.name}</h3>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-slate-900">€{plan.price}</div>
                        <div className="text-sm text-slate-600">/ {plan.period}</div>
                        {key === 'annual' && (
                          <div className="inline-block px-2 py-1 text-xs text-green-700 bg-green-100 rounded-full mt-1">
                            Save €90
                          </div>
                        )}
                      </div>
                    </div>
                    <ul className="space-y-1 text-sm text-slate-600">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-0.5">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </label>
              ))}
            </div>

            {/* Order Summary */}
            <div className="mt-6 pt-6 border-t border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Plan: {plans[selectedPlan].name}</span>
                  <span>€{plans[selectedPlan].price}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (included)</span>
                  <span>€0</span>
                </div>
                <div className="border-t border-slate-200 pt-2 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>€{plans[selectedPlan].price}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Payment Details</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Payment Method Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Payment Method
                </label>
                <div className="flex gap-3">
                  <label className="flex-1">
                    <input
                      type="radio"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value as 'card' | 'paypal')}
                      className="sr-only"
                    />
                    <div className={`border rounded-lg p-3 cursor-pointer text-center transition-all ${
                      paymentMethod === 'card' 
                        ? 'border-emerald-500 bg-emerald-50' 
                        : 'border-slate-200 hover:border-slate-300'
                    }`}>
                      <div className="font-medium">Credit Card</div>
                      <div className="text-xs text-slate-600">Visa, Mastercard</div>
                    </div>
                  </label>
                  <label className="flex-1">
                    <input
                      type="radio"
                      value="paypal"
                      checked={paymentMethod === 'paypal'}
                      onChange={(e) => setPaymentMethod(e.target.value as 'card' | 'paypal')}
                      className="sr-only"
                    />
                    <div className={`border rounded-lg p-3 cursor-pointer text-center transition-all ${
                      paymentMethod === 'paypal' 
                        ? 'border-emerald-500 bg-emerald-50' 
                        : 'border-slate-200 hover:border-slate-300'
                    }`}>
                      <div className="font-medium">PayPal</div>
                      <div className="text-xs text-slate-600">Secure payment</div>
                    </div>
                  </label>
                </div>
              </div>

              {paymentMethod === 'card' && (
                <>
                  {/* Card Details */}
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={(e) => {
                          const formatted = formatCardNumber(e.target.value.slice(0, 19));
                          setFormData(prev => ({ ...prev, cardNumber: formatted }));
                        }}
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={(e) => {
                            const formatted = formatExpiryDate(e.target.value.slice(0, 4));
                            setFormData(prev => ({ ...prev, expiryDate: formatted }));
                          }}
                          placeholder="MM/YY"
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '').slice(0, 3);
                            setFormData(prev => ({ ...prev, cvv: value }));
                          }}
                          placeholder="123"
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        name="holderName"
                        value={formData.holderName}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        required
                      />
                    </div>
                  </div>

                  {/* Billing Address */}
                  <div className="space-y-4">
                    <h3 className="font-medium text-slate-900">Billing Address</h3>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Street Address
                      </label>
                      <input
                        type="text"
                        name="billing.street"
                        value={formData.billingAddress.street}
                        onChange={handleInputChange}
                        placeholder="123 Main Street"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          name="billing.city"
                          value={formData.billingAddress.city}
                          onChange={handleInputChange}
                          placeholder="Lisbon"
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Postal Code
                        </label>
                        <input
                          type="text"
                          name="billing.postalCode"
                          value={formData.billingAddress.postalCode}
                          onChange={handleInputChange}
                          placeholder="1000-001"
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Country
                      </label>
                      <select
                        name="billing.country"
                        value={formData.billingAddress.country}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        required
                      >
                        <option value="PT">Portugal</option>
                        <option value="ES">Spain</option>
                        <option value="FR">France</option>
                        <option value="DE">Germany</option>
                        <option value="IT">Italy</option>
                        <option value="NL">Netherlands</option>
                        <option value="BE">Belgium</option>
                        <option value="AT">Austria</option>
                        <option value="DK">Denmark</option>
                        <option value="SE">Sweden</option>
                        <option value="NO">Norway</option>
                        <option value="FI">Finland</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>

              {/* Security Note */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="text-emerald-500">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900 text-sm">Secure Payment</h4>
                    <p className="text-xs text-slate-600 mt-1">
                      Your payment information is encrypted and secure. We don't store your card details.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all ${
                  loading 
                    ? 'bg-slate-400 cursor-not-allowed' 
                    : 'bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500'
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing Payment...
                  </div>
                ) : (
                  `Complete Payment - €${plans[selectedPlan].price}`
                )}
              </button>

              {/* Terms */}
              <p className="text-xs text-slate-600 text-center">
                By completing this purchase, you agree to our{' '}
                <Link href="/legal/terms" className="text-emerald-600 hover:text-emerald-700 underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/legal/privacy" className="text-emerald-600 hover:text-emerald-700 underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
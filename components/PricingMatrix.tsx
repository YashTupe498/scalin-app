"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

type Currency = "USD" | "EUR" | "INR";

const pricingConfig = {
  tiers: [
    { 
      id: 'starter', 
      name: 'Starter', 
      basePriceUSD: 29, 
      description: 'Perfect for small teams getting started with AI automation.',
      features: ['Up to 5 Automated Workflows', 'Basic Analytics Dashboard', 'Community Support', '1GB Storage'] 
    },
    { 
      id: 'pro', 
      name: 'Professional', 
      basePriceUSD: 89, 
      isPopular: true,
      description: 'Ideal for scaling businesses needing advanced capabilities.',
      features: ['Unlimited Workflows', 'Advanced Custom Analytics', 'Priority 24/7 Support', 'API Access', 'Custom Integrations'] 
    },
    { 
      id: 'enterprise', 
      name: 'Enterprise', 
      basePriceUSD: 249, 
      description: 'Uncapped power and security for large organizations.',
      features: ['Everything in Pro', 'Dedicated Success Manager', 'SSO & SAML Authentication', 'Custom SLA', 'On-Premise Deployment Options'] 
    },
  ],
  exchangeRates: {
    USD: 1,
    EUR: 0.92,
    INR: 83.5,
  },
  regionalTariffMultiplier: {
    USD: 1,
    EUR: 1.05, // EU VAT / Tariff offset
    INR: 0.85,  // Purchasing Power Parity adjustment
  },
  annualDiscountMultiplier: 0.8 // 20% off
};

const currencySymbols: Record<Currency, string> = {
  USD: "$",
  EUR: "€",
  INR: "₹",
};

export function PricingMatrix() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [currency, setCurrency] = useState<Currency>("USD");

  const computePrice = (basePriceUSD: number) => {
    const rawPrice = basePriceUSD * pricingConfig.exchangeRates[currency] * pricingConfig.regionalTariffMultiplier[currency] * (isAnnual ? pricingConfig.annualDiscountMultiplier : 1);
    
    // Formatting: round properly. For INR, round to nearest 100. For USD/EUR, round to nearest whole number.
    if (currency === "INR") {
      return Math.round(rawPrice / 10) * 10;
    }
    return Math.round(rawPrice);
  };

  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
          Transparent, Global Pricing
        </h2>
        <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
          Scale your AI infrastructure without surprises. Choose your preferred currency and billing cycle.
        </p>
      </div>

      {/* Controls: Currency & Billing Cycle */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-16">
        {/* Currency Switcher */}
        <div className="flex bg-zinc-900/50 p-1 rounded-full border border-zinc-800 backdrop-blur-md">
          {(["USD", "EUR", "INR"] as Currency[]).map((c) => (
            <button
              key={c}
              onClick={() => setCurrency(c)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                currency === c 
                  ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]" 
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Billing Cycle Toggle */}
        <div className="flex items-center gap-4">
          <span className={`text-sm font-medium ${!isAnnual ? 'text-white' : 'text-zinc-500'}`}>Monthly</span>
          <button 
            onClick={() => setIsAnnual(!isAnnual)}
            className="w-14 h-8 bg-zinc-900 border border-zinc-700 rounded-full flex items-center p-1 cursor-pointer transition-colors"
            style={{ backgroundColor: isAnnual ? '#ffffff' : '#18181b' }}
          >
            <motion.div 
              layout
              className={`w-6 h-6 rounded-full shadow-md ${isAnnual ? 'bg-black' : 'bg-zinc-400'}`}
              animate={{ x: isAnnual ? 24 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </button>
          <span className={`text-sm font-medium flex items-center gap-2 ${isAnnual ? 'text-white' : 'text-zinc-500'}`}>
            Annually <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-1 rounded-full uppercase tracking-wider font-bold">Save 20%</span>
          </span>
        </div>
      </div>

      {/* Pricing Tiers Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {pricingConfig.tiers.map((tier) => (
          <div 
            key={tier.id}
            className={`relative p-8 rounded-none border backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:border-white/60 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] bg-zinc-950/80`}
          >
            {tier.isPopular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-black text-xs font-bold px-4 py-1 rounded-none uppercase tracking-widest shadow-[0_0_15px_rgba(255,255,255,0.5)] border border-white">
                Most Popular
              </div>
            )}
            
            <h3 className="text-2xl font-bold text-white mb-2 font-serif italic">{tier.name}</h3>
            <p className="text-zinc-400 text-sm h-10 mb-6 font-serif">{tier.description}</p>
            
            <div className="mb-8">
              <span className="text-5xl font-bold text-white tracking-tighter flex items-baseline">
                <span className="text-2xl mr-1 text-zinc-500">{currencySymbols[currency]}</span>
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={`${currency}-${isAnnual}-${tier.basePriceUSD}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {computePrice(tier.basePriceUSD).toLocaleString()}
                  </motion.span>
                </AnimatePresence>
                <span className="text-base font-normal text-zinc-500 ml-2">/mo</span>
              </span>
              {isAnnual && (
                <div className="mt-2 text-sm text-emerald-400 font-medium">
                  Billed {currencySymbols[currency]}{(computePrice(tier.basePriceUSD) * 12).toLocaleString()} yearly
                </div>
              )}
            </div>
            
            <button className={`w-full py-3 rounded-none font-bold mb-8 transition-all bg-white text-black hover:bg-zinc-300 hover:scale-105`}>
              Get Started
            </button>
            
            <ul className="space-y-4">
              {tier.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                  <Check className="w-5 h-5 text-white shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

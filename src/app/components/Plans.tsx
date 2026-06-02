import { useState } from 'react';
import { Check, X, Zap, Shield, Building2, Crown, CreditCard, Star, Sparkles } from 'lucide-react';
import { useAuth } from '../../lib/supabase/auth-context';

interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  icon: React.ElementType;
  iconColor: string;
  borderColor: string;
  badgeColor: string;
  glowColor: string;
  badge?: string;
  features: { text: string; included: boolean }[];
  ctaLabel: string;
  ctaStyle: string;
  current?: boolean;
}

const plans: Plan[] = [
  {
    id: 'basico',
    name: 'Básico',
    price: 'Gratis',
    period: '',
    description: 'Para uso personal y aprendizaje en ciberseguridad.',
    icon: Shield,
    iconColor: 'text-cyan-400',
    borderColor: 'border-cyan-500/30',
    badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    glowColor: 'rgba(6,182,212,0.15)',
    features: [
      { text: 'Análisis heurístico de URLs', included: true },
      { text: 'Historial de 50 análisis', included: true },
      { text: 'Exportación PDF básica', included: true },
      { text: 'Dashboard de estadísticas', included: true },
      { text: 'Alertas por email', included: false },
      { text: 'API de integración', included: false },
      { text: 'Reportes avanzados', included: false },
      { text: 'Soporte prioritario', included: false },
    ],
    ctaLabel: 'Plan Actual',
    ctaStyle: 'bg-gray-700 text-gray-400 cursor-default',
    current: true,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$9.99',
    period: '/mes',
    description: 'Para profesionales y equipos de seguridad pequeños.',
    icon: Zap,
    iconColor: 'text-violet-400',
    borderColor: 'border-violet-500/50',
    badgeColor: 'bg-violet-500/10 text-violet-400 border-violet-500/30',
    glowColor: 'rgba(139,92,246,0.2)',
    badge: 'Más Popular',
    features: [
      { text: 'Análisis heurístico avanzado', included: true },
      { text: 'Historial ilimitado', included: true },
      { text: 'Exportación PDF profesional', included: true },
      { text: 'Dashboard de estadísticas', included: true },
      { text: 'Alertas por email', included: true },
      { text: 'API de integración (1000 req/día)', included: true },
      { text: 'Reportes avanzados', included: false },
      { text: 'Soporte prioritario', included: false },
    ],
    ctaLabel: 'Suscribirse a Pro',
    ctaStyle: 'bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white shadow-lg shadow-violet-500/30',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '$29.99',
    period: '/mes',
    description: 'Para empresas y equipos de seguridad corporativos.',
    icon: Building2,
    iconColor: 'text-amber-400',
    borderColor: 'border-amber-500/40',
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    glowColor: 'rgba(245,158,11,0.15)',
    features: [
      { text: 'Análisis heurístico avanzado', included: true },
      { text: 'Historial ilimitado', included: true },
      { text: 'Exportación PDF profesional', included: true },
      { text: 'Dashboard de estadísticas', included: true },
      { text: 'Alertas por email', included: true },
      { text: 'API de integración (ilimitada)', included: true },
      { text: 'Reportes avanzados y BI', included: true },
      { text: 'Soporte prioritario 24/7', included: true },
    ],
    ctaLabel: 'Contactar Ventas',
    ctaStyle: 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white shadow-lg shadow-amber-500/30',
  },
];

function UpgradeModal({ plan, onClose }: { plan: Plan; onClose: () => void }) {
  const [step, setStep] = useState<'info' | 'form' | 'success'>('info');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useAuth();

  const formatCard = (v: string) =>
    v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  const formatExpiry = (v: string) =>
    v.replace(/\D/g, '').slice(0, 4).replace(/^(\d{2})(\d)/, '$1/$2');

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className={`p-5 border-b border-gray-700/50`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${plan.badgeColor}`}>
              <plan.icon className={`w-5 h-5 ${plan.iconColor}`} />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Plan {plan.name}</h3>
              <p className="text-gray-400 text-sm">{plan.price}{plan.period} · Facturación mensual</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {step === 'info' && (
            <div className="space-y-4">
              <p className="text-gray-300 text-sm">
                Estás a punto de actualizar tu plan a <span className="text-white font-semibold">{plan.name}</span>. Continuarás con acceso inmediato a todas las funciones.
              </p>
              <div className="bg-black/20 border border-gray-800 rounded-xl p-4 space-y-2">
                {plan.features.filter(f => f.included).map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    {f.text}
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-2">
                <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-gray-700 text-gray-300 hover:bg-gray-800 font-medium transition-all">
                  Cancelar
                </button>
                <button onClick={() => setStep('form')} className={`flex-1 py-2.5 rounded-xl font-semibold transition-all duration-300 ${plan.ctaStyle}`}>
                  Continuar →
                </button>
              </div>
            </div>
          )}

          {step === 'form' && (
            <form onSubmit={handlePay} className="space-y-4">
              <div className="flex items-center gap-2 text-gray-400 text-xs mb-2">
                <CreditCard className="w-4 h-4" />
                Pago seguro · Encriptado SSL
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1.5">Nombre en la tarjeta</label>
                <input
                  type="text"
                  value={cardName}
                  onChange={e => setCardName(e.target.value)}
                  placeholder="Juan Pérez"
                  required
                  className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1.5">Número de tarjeta</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={e => setCardNumber(formatCard(e.target.value))}
                  placeholder="1234 5678 9012 3456"
                  required
                  maxLength={19}
                  className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1.5">Vencimiento</label>
                  <input
                    type="text"
                    value={expiry}
                    onChange={e => setExpiry(formatExpiry(e.target.value))}
                    placeholder="MM/AA"
                    required
                    maxLength={5}
                    className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors font-mono"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1.5">CVV</label>
                  <input
                    type="password"
                    value={cvv}
                    onChange={e => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    placeholder="•••"
                    required
                    maxLength={4}
                    className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors font-mono"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-1">
                <button type="button" onClick={() => setStep('info')} className="flex-1 py-2.5 rounded-xl border border-gray-700 text-gray-300 hover:bg-gray-800 font-medium transition-all">
                  Atrás
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`flex-1 py-2.5 rounded-xl font-semibold transition-all duration-300 ${plan.ctaStyle} disabled:opacity-70`}
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg>
                      Procesando...
                    </span>
                  ) : (
                    `Pagar ${plan.price}${plan.period}`
                  )}
                </button>
              </div>
            </form>
          )}

          {step === 'success' && (
            <div className="text-center py-4">
              <div className="w-16 h-16 mx-auto mb-4 bg-emerald-500/20 rounded-full flex items-center justify-center">
                <Check className="w-9 h-9 text-emerald-400" />
              </div>
              <h4 className="text-white text-xl font-bold mb-2">¡Suscripción activada!</h4>
              <p className="text-gray-400 text-sm mb-1">
                Tu plan <span className="text-white font-semibold">{plan.name}</span> está activo.
              </p>
              <p className="text-gray-500 text-xs mb-6">Confirmación enviada a {user?.email}</p>
              <button onClick={onClose} className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold transition-all">
                Continuar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function Plans() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="text-center mb-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-violet-500/10 border border-violet-500/30 rounded-full text-violet-400 text-xs font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          Planes y Precios
        </div>
        <h2 className="text-3xl font-bold text-white mb-3">
          Elige el plan que mejor se adapta a ti
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto">
          Desde uso personal hasta implementaciones corporativas. Todos los planes incluyen análisis heurístico avanzado.
        </p>
      </div>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {plans.map((plan) => {
          const Icon = plan.icon;
          return (
            <div
              key={plan.id}
              className={`relative rounded-2xl border ${plan.borderColor} bg-gradient-to-br from-gray-900/60 to-gray-800/40 backdrop-blur-xl p-6 flex flex-col transition-all duration-300 hover:scale-[1.02]`}
              style={{ boxShadow: `0 0 40px ${plan.glowColor}` }}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full text-white text-xs font-bold flex items-center gap-1 shadow-lg shadow-violet-500/40">
                    <Star className="w-3 h-3" />
                    {plan.badge}
                  </span>
                </div>
              )}

              {plan.current && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 bg-cyan-600/80 rounded-full text-white text-xs font-semibold">
                    Plan Actual
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-5">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 border ${plan.badgeColor}`}>
                  <Icon className={`w-6 h-6 ${plan.iconColor}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-gray-400 text-sm">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                {plan.period && <span className="text-gray-400 text-sm ml-1">{plan.period}</span>}
              </div>

              {/* Features */}
              <ul className="space-y-2.5 flex-1 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm">
                    {feature.included ? (
                      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    ) : (
                      <X className="w-4 h-4 text-gray-600 flex-shrink-0" />
                    )}
                    <span className={feature.included ? 'text-gray-200' : 'text-gray-500'}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={() => !plan.current && setSelectedPlan(plan)}
                disabled={plan.current}
                className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${plan.ctaStyle} ${plan.current ? 'cursor-default' : 'cursor-pointer'}`}
              >
                {plan.current ? (
                  <span className="flex items-center justify-center gap-2">
                    <Crown className="w-4 h-4" />
                    Plan Actual
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    {plan.ctaLabel}
                  </span>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* FAQ / Note */}
      <div className="max-w-5xl mx-auto bg-gradient-to-br from-gray-900/40 to-gray-800/20 border border-gray-700/40 rounded-2xl p-6 backdrop-blur-xl">
        <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
          <Shield className="w-4 h-4 text-cyan-400" />
          Preguntas frecuentes
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          {[
            ['¿Puedo cancelar en cualquier momento?', 'Sí, puedes cancelar tu suscripción cuando quieras sin penalizaciones.'],
            ['¿Hay período de prueba?', 'El plan Básico es gratuito para siempre. No se requiere tarjeta de crédito.'],
            ['¿Mis datos están protegidos?', 'Sí, todo el análisis es del lado del cliente y usamos Supabase con RLS.'],
            ['¿Factura disponible?', 'Recibirás un correo con tu factura mensual tras cada pago.'],
          ].map(([q, a], i) => (
            <div key={i} className="space-y-1">
              <p className="text-white font-medium">{q}</p>
              <p className="text-gray-400">{a}</p>
            </div>
          ))}
        </div>
      </div>

      {selectedPlan && (
        <UpgradeModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />
      )}
    </div>
  );
}

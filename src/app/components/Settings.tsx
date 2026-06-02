import { useState, useEffect } from 'react';
import { Moon, Sun, Bell, Trash2, Shield, Save, Mail, ToggleLeft, ToggleRight } from 'lucide-react';

interface SettingsProps {
  onClearHistory: () => void;
  onThemeChange: (isDark: boolean) => void;
}

export function Settings({ onClearHistory, onThemeChange }: SettingsProps) {
  const [darkMode, setDarkMode] = useState(true);
  const [sensitivity, setSensitivity] = useState(2);
  const [notifications, setNotifications] = useState(false);
  const [alertEmail, setAlertEmail] = useState('');
  const [emailAlertsEnabled, setEmailAlertsEnabled] = useState(false);
  const [emailSaved, setEmailSaved] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('phishguard_darkmode');
    const savedSensitivity = localStorage.getItem('phishguard_sensitivity');
    const savedNotifications = localStorage.getItem('phishguard_notifications');
    const savedAlertEmail = localStorage.getItem('phishguard_alert_email');
    const savedEmailAlertsEnabled = localStorage.getItem('phishguard_email_alerts_enabled');

    if (savedDarkMode !== null) {
      const isDark = savedDarkMode === 'true';
      setDarkMode(isDark);
      onThemeChange(isDark);
    }
    if (savedSensitivity !== null) setSensitivity(parseInt(savedSensitivity));
    if (savedNotifications !== null) setNotifications(savedNotifications === 'true');
    if (savedAlertEmail !== null) setAlertEmail(savedAlertEmail);
    if (savedEmailAlertsEnabled !== null) setEmailAlertsEnabled(savedEmailAlertsEnabled === 'true');
  }, []);

  const handleDarkModeToggle = () => {
    const newValue = !darkMode;
    setDarkMode(newValue);
    localStorage.setItem('phishguard_darkmode', String(newValue));
    onThemeChange(newValue);
  };

  const handleSensitivityChange = (value: number) => {
    setSensitivity(value);
    localStorage.setItem('phishguard_sensitivity', String(value));
  };

  const handleNotificationsToggle = () => {
    const newValue = !notifications;
    setNotifications(newValue);
    localStorage.setItem('phishguard_notifications', String(newValue));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAlertEmail(e.target.value);
    setEmailSaved(false);
  };

  const handleSaveEmail = () => {
    localStorage.setItem('phishguard_alert_email', alertEmail);
    setEmailSaved(true);
    setTimeout(() => setEmailSaved(false), 3000);
  };

  const handleEmailAlertsToggle = () => {
    const newValue = !emailAlertsEnabled;
    setEmailAlertsEnabled(newValue);
    localStorage.setItem('phishguard_email_alerts_enabled', String(newValue));
  };

  const handleClearHistory = () => {
    if (confirm('¿Estás seguro de que deseas borrar todo el historial? Esta acción no se puede deshacer.')) {
      onClearHistory();
    }
  };

  const getSensitivityLabel = () => {
    switch (sensitivity) {
      case 1: return 'Bajo';
      case 2: return 'Medio';
      case 3: return 'Alto';
      default: return 'Medio';
    }
  };

  // ─── Theme-aware class helpers ───────────────────────────────────────────
  const d = darkMode;
  const card = d
    ? 'bg-gradient-to-br from-gray-900/50 to-gray-800/30 border-cyan-500/20'
    : 'bg-white border-gray-200 shadow-sm';
  const cardTitle = d ? 'text-white' : 'text-gray-900';
  const cardSubtitle = d ? 'text-gray-400' : 'text-gray-500';
  const rowBg = d ? 'bg-black/20 border-gray-800' : 'bg-gray-50 border-gray-200';
  const rowLabel = d ? 'text-white' : 'text-gray-800';
  const rowSub = d ? 'text-gray-500' : 'text-gray-500';
  const inputBg = d
    ? 'bg-black/30 border-gray-700 text-white placeholder-gray-500 focus:border-orange-500/50'
    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-orange-400';
  const sliderTrackDark = '#1f2937';
  const sliderTrackLight = '#e5e7eb';

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Appearance */}
      <div className={`border rounded-2xl p-6 backdrop-blur-xl ${card}`}>
        <div className="flex items-center gap-3 mb-6">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${d ? 'bg-cyan-500/20' : 'bg-cyan-50'}`}>
            {darkMode ? <Moon className="w-5 h-5 text-cyan-500" /> : <Sun className="w-5 h-5 text-yellow-500" />}
          </div>
          <div>
            <h3 className={`text-lg font-semibold ${cardTitle}`}>Apariencia</h3>
            <p className={`text-sm ${cardSubtitle}`}>Personaliza el tema de la interfaz</p>
          </div>
        </div>

        <div className={`flex items-center justify-between p-4 border rounded-xl ${rowBg}`}>
          <div className="flex items-center gap-3">
            {darkMode
              ? <Moon className="w-5 h-5 text-cyan-400" />
              : <Sun className="w-5 h-5 text-yellow-500" />}
            <div>
              <p className={`font-medium ${rowLabel}`}>Modo {darkMode ? 'Oscuro' : 'Claro'}</p>
              <p className={`text-sm ${rowSub}`}>Cambia el tema visual</p>
            </div>
          </div>
          <button
            onClick={handleDarkModeToggle}
            className={`relative w-14 h-7 rounded-full transition-all duration-300 ${darkMode ? 'bg-cyan-600' : 'bg-gray-300'}`}
          >
            <div className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform duration-300 shadow-sm ${darkMode ? 'translate-x-7' : 'translate-x-0'}`} />
          </button>
        </div>
      </div>

      {/* Detection */}
      <div className={`border rounded-2xl p-6 backdrop-blur-xl ${card}`}>
        <div className="flex items-center gap-3 mb-6">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${d ? 'bg-emerald-500/20' : 'bg-emerald-50'}`}>
            <Shield className="w-5 h-5 text-emerald-500" />
          </div>
          <div>
            <h3 className={`text-lg font-semibold ${cardTitle}`}>Detección</h3>
            <p className={`text-sm ${cardSubtitle}`}>Configura la sensibilidad del análisis</p>
          </div>
        </div>

        <div className={`p-4 border rounded-xl ${rowBg}`}>
          <div className="flex items-center justify-between mb-3">
            <label className={`font-medium ${rowLabel}`}>Nivel de Sensibilidad</label>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
              sensitivity === 1 ? 'bg-yellow-500/20 text-yellow-500 border-yellow-400/30' :
              sensitivity === 2 ? 'bg-cyan-500/20 text-cyan-500 border-cyan-400/30' :
              'bg-red-500/20 text-red-500 border-red-400/30'
            }`}>
              {getSensitivityLabel()}
            </span>
          </div>

          <input
            type="range" min="1" max="3" value={sensitivity}
            onChange={(e) => handleSensitivityChange(parseInt(e.target.value))}
            className="w-full h-2 rounded-full appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right,
                ${sensitivity === 1 ? '#eab308' : sensitivity === 2 ? '#06b6d4' : '#ef4444'} 0%,
                ${sensitivity === 1 ? '#eab308' : sensitivity === 2 ? '#06b6d4' : '#ef4444'} ${((sensitivity - 1) / 2) * 100}%,
                ${d ? sliderTrackDark : sliderTrackLight} ${((sensitivity - 1) / 2) * 100}%,
                ${d ? sliderTrackDark : sliderTrackLight} 100%)`
            }}
          />
          <div className={`flex justify-between mt-2 text-xs ${d ? 'text-gray-500' : 'text-gray-400'}`}>
            <span>Bajo</span><span>Medio</span><span>Alto</span>
          </div>
          <p className={`text-sm mt-3 ${d ? 'text-gray-500' : 'text-gray-400'}`}>
            {sensitivity === 1 && 'Detecta solo amenazas evidentes y de alto riesgo'}
            {sensitivity === 2 && 'Balance entre precisión y cobertura de amenazas'}
            {sensitivity === 3 && 'Máxima protección, puede generar falsos positivos'}
          </p>
        </div>
      </div>

      {/* Notifications */}
      <div className={`border rounded-2xl p-6 backdrop-blur-xl ${card}`}>
        <div className="flex items-center gap-3 mb-6">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${d ? 'bg-purple-500/20' : 'bg-purple-50'}`}>
            <Bell className="w-5 h-5 text-purple-500" />
          </div>
          <div>
            <h3 className={`text-lg font-semibold ${cardTitle}`}>Notificaciones</h3>
            <p className={`text-sm ${cardSubtitle}`}>Gestiona alertas y sonidos</p>
          </div>
        </div>

        <div className={`flex items-center justify-between p-4 border rounded-xl ${rowBg}`}>
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-purple-500" />
            <div>
              <p className={`font-medium ${rowLabel}`}>Alertas Sonoras</p>
              <p className={`text-sm ${rowSub}`}>Reproducir sonido al detectar amenazas</p>
            </div>
          </div>
          <button
            onClick={handleNotificationsToggle}
            className={`relative w-14 h-7 rounded-full transition-all duration-300 ${notifications ? 'bg-purple-600' : d ? 'bg-gray-600' : 'bg-gray-300'}`}
          >
            <div className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform duration-300 shadow-sm ${notifications ? 'translate-x-7' : 'translate-x-0'}`} />
          </button>
        </div>
      </div>

      {/* Email Alerts */}
      <div className={`border rounded-2xl p-6 backdrop-blur-xl ${d ? 'bg-gradient-to-br from-gray-900/50 to-gray-800/30 border-orange-500/20' : 'bg-white border-orange-300/50 shadow-sm'}`}>
        <div className="flex items-center gap-3 mb-6">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${d ? 'bg-orange-500/20' : 'bg-orange-50'}`}>
            <Mail className="w-5 h-5 text-orange-500" />
          </div>
          <div>
            <h3 className={`text-lg font-semibold ${cardTitle}`}>Notificaciones de Seguridad</h3>
            <p className={`text-sm ${cardSubtitle}`}>Recibe alertas por correo cuando se detecten amenazas</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className={`p-4 border rounded-xl ${rowBg}`}>
            <label className={`font-medium mb-3 block ${rowLabel}`}>Correo de Alertas</label>
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${d ? 'text-gray-500' : 'text-gray-400'}`} />
                <input
                  type="email" value={alertEmail} onChange={handleEmailChange}
                  placeholder="admin@empresa.com"
                  className={`w-full pl-11 pr-4 py-3 border rounded-xl focus:outline-none transition-all duration-300 ${inputBg}`}
                />
              </div>
              <button
                onClick={handleSaveEmail}
                disabled={!alertEmail.includes('@')}
                className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                  emailSaved ? 'bg-emerald-600 text-white' :
                  alertEmail.includes('@') ? 'bg-orange-600 hover:bg-orange-500 text-white' :
                  d ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Save className="w-4 h-4" />
                {emailSaved ? 'Guardado' : 'Guardar'}
              </button>
            </div>
            <p className={`text-xs mt-2 ${d ? 'text-gray-500' : 'text-gray-400'}`}>Este correo recibirá alertas de phishing crítico</p>
          </div>

          <div className={`flex items-center justify-between p-4 border rounded-xl ${rowBg}`}>
            <div className="flex items-center gap-3">
              {emailAlertsEnabled
                ? <ToggleRight className="w-5 h-5 text-orange-500" />
                : <ToggleLeft className={`w-5 h-5 ${d ? 'text-gray-500' : 'text-gray-400'}`} />}
              <div>
                <p className={`font-medium ${rowLabel}`}>Activar alertas por Phishing Crítico</p>
                <p className={`text-sm ${rowSub}`}>Enviar correo cuando se detecte riesgo Alto o Crítico</p>
              </div>
            </div>
            <button
              onClick={handleEmailAlertsToggle}
              disabled={!alertEmail.includes('@')}
              className={`relative w-14 h-7 rounded-full transition-all duration-300 ${emailAlertsEnabled ? 'bg-orange-600' : d ? 'bg-gray-600' : 'bg-gray-300'} ${!alertEmail.includes('@') ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform duration-300 shadow-sm ${emailAlertsEnabled ? 'translate-x-7' : 'translate-x-0'}`} />
            </button>
          </div>

          {emailAlertsEnabled && alertEmail.includes('@') && (
            <div className="flex items-center gap-2 p-3 bg-orange-500/10 border border-orange-400/30 rounded-xl">
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
              <p className={`text-sm ${d ? 'text-orange-300' : 'text-orange-600'}`}>
                Alertas activas para: <span className="font-medium">{alertEmail}</span>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Danger Zone */}
      <div className={`border rounded-2xl p-6 backdrop-blur-xl ${d ? 'bg-gradient-to-br from-red-950/30 to-red-900/20 border-red-500/30' : 'bg-red-50/60 border-red-300/50 shadow-sm'}`}>
        <div className="flex items-center gap-3 mb-6">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${d ? 'bg-red-500/20' : 'bg-red-100'}`}>
            <Trash2 className="w-5 h-5 text-red-500" />
          </div>
          <div>
            <h3 className={`text-lg font-semibold ${d ? 'text-white' : 'text-gray-900'}`}>Zona Peligrosa</h3>
            <p className={`text-sm ${d ? 'text-red-300/70' : 'text-red-500/80'}`}>Acciones irreversibles</p>
          </div>
        </div>

        <button
          onClick={handleClearHistory}
          className={`w-full flex items-center justify-between p-4 border rounded-xl transition-all duration-300 group ${d ? 'bg-red-950/30 hover:bg-red-950/50 border-red-500/30 hover:border-red-500/50' : 'bg-red-50 hover:bg-red-100 border-red-300/50 hover:border-red-400/60'}`}
        >
          <div className="flex items-center gap-3">
            <Trash2 className="w-5 h-5 text-red-500" />
            <div className="text-left">
              <p className={`font-medium group-hover:text-red-400 transition-colors ${d ? 'text-white' : 'text-gray-800'}`}>Borrar Historial Completo</p>
              <p className={`text-sm ${d ? 'text-red-400/60' : 'text-red-500/70'}`}>Elimina todos los registros guardados</p>
            </div>
          </div>
          <div className={`px-3 py-1 border rounded-lg text-sm font-semibold ${d ? 'bg-red-500/20 border-red-500/30 text-red-400' : 'bg-red-100 border-red-300 text-red-600'}`}>
            Eliminar
          </div>
        </button>
      </div>

      {/* Autosave note */}
      <div className={`flex items-center justify-center gap-2 p-4 border rounded-xl ${d ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-emerald-50 border-emerald-300/50'}`}>
        <Save className="w-4 h-4 text-emerald-500" />
        <p className={`text-sm font-medium ${d ? 'text-emerald-400' : 'text-emerald-600'}`}>Los cambios se guardan automáticamente</p>
      </div>

      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none; width: 20px; height: 20px;
          border-radius: 50%; background: white; cursor: pointer;
          box-shadow: 0 0 10px rgba(6,182,212,0.5);
        }
        .slider::-moz-range-thumb {
          width: 20px; height: 20px; border-radius: 50%;
          background: white; cursor: pointer; border: none;
          box-shadow: 0 0 10px rgba(6,182,212,0.5);
        }
      `}</style>
    </div>
  );
}

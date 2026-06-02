import { useState } from 'react';
import { User, Lock, Eye, EyeOff, CheckCircle, XCircle, Loader2, KeyRound } from 'lucide-react';
import { useAuth } from '../../lib/supabase/auth-context';
import { createClient } from '../../lib/supabase/client';

export function AccountProfile() {
  const { user } = useAuth();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const newPasswordValid = newPassword.length === 0 ? null : newPassword.length >= 8;
  const confirmPasswordValid =
    confirmPassword.length === 0 ? null : confirmPassword === newPassword;

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPasswordValid || !confirmPasswordValid) return;

    setIsLoading(true);
    setMessage(null);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password: newPassword });

      if (error) {
        setMessage({ type: 'error', text: error.message || 'No se pudo actualizar la contraseña.' });
      } else {
        setMessage({ type: 'success', text: 'Contraseña actualizada correctamente.' });
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch {
      setMessage({ type: 'error', text: 'Ocurrió un error inesperado. Intenta nuevamente.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      {/* User Info Card */}
      <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-cyan-500/20 rounded-2xl p-6 backdrop-blur-xl">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-7 h-7 text-white" />
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Correo registrado</p>
            <p className="text-white font-semibold break-all">{user?.email ?? '—'}</p>
          </div>
        </div>
      </div>

      {/* Change Password Card */}
      <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-cyan-500/20 rounded-2xl p-6 backdrop-blur-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center">
            <KeyRound className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold">Cambiar Contraseña</h3>
            <p className="text-gray-500 text-xs">Mínimo 8 caracteres</p>
          </div>
        </div>

        {/* Feedback message */}
        {message && (
          <div
            className={`mb-5 p-4 rounded-xl flex items-start gap-3 ${
              message.type === 'success'
                ? 'bg-emerald-500/10 border border-emerald-500/30'
                : 'bg-red-500/10 border border-red-500/30'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            )}
            <p
              className={`text-sm ${
                message.type === 'success' ? 'text-emerald-300' : 'text-red-300'
              }`}
            >
              {message.text}
            </p>
          </div>
        )}

        <form onSubmit={handleUpdatePassword} className="space-y-4">
          {/* Nueva Contraseña */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Nueva Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type={showNew ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Mínimo 8 caracteres"
                disabled={isLoading}
                className={`w-full pl-12 pr-12 py-3 bg-black/30 border-2 rounded-xl text-white placeholder-gray-600 focus:outline-none transition-all duration-300 disabled:opacity-50 ${
                  newPasswordValid === null
                    ? 'border-gray-700 focus:border-cyan-500'
                    : newPasswordValid
                    ? 'border-emerald-500 focus:border-emerald-400'
                    : 'border-red-500 focus:border-red-400'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
              >
                {showNew ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Confirmar Contraseña */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Confirmar Nueva Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type={showConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repite la nueva contraseña"
                disabled={isLoading}
                className={`w-full pl-12 pr-12 py-3 bg-black/30 border-2 rounded-xl text-white placeholder-gray-600 focus:outline-none transition-all duration-300 disabled:opacity-50 ${
                  confirmPasswordValid === null
                    ? 'border-gray-700 focus:border-cyan-500'
                    : confirmPasswordValid
                    ? 'border-emerald-500 focus:border-emerald-400'
                    : 'border-red-500 focus:border-red-400'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
              >
                {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {confirmPasswordValid === false && (
              <p className="mt-1.5 text-xs text-red-400">Las contraseñas no coinciden.</p>
            )}
          </div>

          <button
            type="submit"
            disabled={!newPasswordValid || !confirmPasswordValid || isLoading}
            className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl font-semibold text-white hover:from-cyan-500 hover:to-blue-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            style={{
              boxShadow:
                newPasswordValid && confirmPasswordValid && !isLoading
                  ? '0 0 30px rgba(6, 182, 212, 0.4)'
                  : 'none',
            }}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Actualizando...
              </span>
            ) : (
              'Actualizar Contraseña'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

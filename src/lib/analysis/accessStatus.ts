export type EstadoAcceso = 'Pendiente' | 'Seguro' | 'Sospechoso';

export interface AccessStatusInput {
  risk: string;
  estado?: EstadoAcceso;
  color?: string;
  bloqueado?: boolean;
}

export interface DynamicAccessStatus {
  permitted: boolean;
  text: string;
  shortText: string;
  containerClasses: string;
  badgeClasses: string;
  textClasses: string;
  iconColorClasses: string;
}

/**
 * A link is "Permitido" unless the user has explicitly blocked it.
 * The risk/estado level only affects the threat badge, not the access status.
 */
export function getDynamicAccessStatus(input: AccessStatusInput): DynamicAccessStatus {
  const permitted = !Boolean(input.bloqueado);

  if (permitted) {
    return {
      permitted: true,
      text: 'Acceso: Permitido',
      shortText: 'Permitido',
      containerClasses:
        'bg-gradient-to-r from-emerald-950/40 to-emerald-900/20 border-emerald-500/40',
      badgeClasses: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
      textClasses: 'text-emerald-400',
      iconColorClasses: 'text-emerald-400',
    };
  }

  return {
    permitted: false,
    text: 'Acceso: Bloqueado',
    shortText: 'Bloqueado',
    containerClasses:
      'bg-gradient-to-r from-red-950/50 to-red-900/20 border-red-500/40',
    badgeClasses: 'bg-red-500/15 text-red-400 border-red-500/30',
    textClasses: 'text-red-400',
    iconColorClasses: 'text-red-400',
  };
}

/** @deprecated Use getDynamicAccessStatus directly */
export function isAnalysisAccessPermitted(input: AccessStatusInput): boolean {
  return getDynamicAccessStatus(input).permitted;
}

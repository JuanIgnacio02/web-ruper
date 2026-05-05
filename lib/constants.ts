/**
 * Centralización de gradientes de producto — single source of truth.
 * Antes estos mapas estaban duplicados en ProductCard, ProductDetail y globals.css.
 */

export const BG_GRADIENTS: Record<string, string> = {
  'bg-dogs':        'linear-gradient(135deg,#fff3ee,#ffe0d0)',
  'bg-cats':        'linear-gradient(135deg,#f3eeff,#e0d0ff)',
  'bg-farm':        'linear-gradient(135deg,#eefff3,#d0f0d8)',
  'bg-birds':       'linear-gradient(135deg,#fffbee,#fff0c0)',
  'bg-fish':        'linear-gradient(135deg,#eef8ff,#d0e8ff)',
  'bg-accessories': 'linear-gradient(135deg,#fff0fa,#f5d0ff)',
  'bg-small':       'linear-gradient(135deg,#eefff3,#c8f0d8)',
  'bg-acc':         'linear-gradient(135deg,#f5f5f5,#e8e8e8)',
}

export const CAT_GRADIENTS: Record<string, string> = {
  perros:      BG_GRADIENTS['bg-dogs'],
  gatos:       BG_GRADIENTS['bg-cats'],
  granja:      BG_GRADIENTS['bg-farm'],
  aves:        BG_GRADIENTS['bg-birds'],
  peces:       BG_GRADIENTS['bg-fish'],
  accesorios:  BG_GRADIENTS['bg-accessories'],
  'pequeños':  BG_GRADIENTS['bg-small'],
}

const DEFAULT_BG = BG_GRADIENTS['bg-dogs']

/** Devuelve el gradiente correcto dado bg_class y/o category */
export function getProductBg(bgClass?: string | null, category?: string): string {
  return (bgClass && BG_GRADIENTS[bgClass])
      ?? (category && CAT_GRADIENTS[category])
      ?? DEFAULT_BG
}

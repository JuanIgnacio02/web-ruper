// ─── Producto ────────────────────────────────────────────

export type BadgeType = 'badge-top' | 'badge-sale' | 'badge-new' | null

export type AnimalCategory =
  | 'perros'
  | 'gatos'
  | 'granja'
  | 'aves'
  | 'pequeños'
  | 'peces'
  | 'accesorios'

export type FilterAnimal = AnimalCategory | 'all'

export type BgClass =
  | 'bg-dogs'
  | 'bg-cats'
  | 'bg-farm'
  | 'bg-birds'
  | 'bg-fish'
  | 'bg-accessories'
  | 'bg-small'

export interface Product {
  id: number
  name: string
  brand: string
  category: AnimalCategory
  subcategory: string | null
  raza: string | null
  etapa: string | null
  linea: string | null
  price: number
  weight: string | null
  flavor: string | null
  emoji: string
  img: string | null
  bg_class: BgClass
  badge: string | null
  badge_type: BadgeType
  description: string | null
  features: string[]
  stock: boolean
  featured: boolean
  created_at: string
}

export type ProductInsert = Omit<Product, 'id' | 'created_at'>
export type ProductUpdate = Partial<ProductInsert>

// ─── Filtros ─────────────────────────────────────────────

export interface ProductFilters {
  raza: string
  etapa: string
  linea: string
}

export interface ActiveFilter {
  animal: FilterAnimal | null
  filters: ProductFilters
}

export interface AnimalFilterOption {
  value: string
  label: string
}

export interface AnimalFilterDef {
  key: keyof ProductFilters
  label: string
  options: AnimalFilterOption[]
}

export interface AnimalPanelConfig {
  animal: AnimalCategory
  label: string
  emoji: string
  bgImage: string
  filters: AnimalFilterDef[]
}

// ─── Carrito ─────────────────────────────────────────────

export interface CartItem {
  name: string
  price: number
  emoji: string
  cat: string
  qty: number
}

export type CartAction =
  | { type: 'ADD'; payload: Omit<CartItem, 'qty'> }
  | { type: 'CHANGE_QTY'; payload: { name: string; delta: number } }
  | { type: 'REMOVE'; payload: { name: string } }
  | { type: 'CLEAR' }

// ─── Toast ───────────────────────────────────────────────

export type ToastKind = 'ok' | 'err' | 'info'

export interface ToastMessage {
  id: string
  text: string
  kind: ToastKind
}

// ─── Config ──────────────────────────────────────────────

export interface SiteConfig {
  WA_NUMBER: string
  STORE_NAME: string
  CITY: string
  TOAST_DURATION: number
}

// ─── Cloudinary ──────────────────────────────────────────

export interface CloudinaryUploadResult {
  url: string
  publicId: string
}

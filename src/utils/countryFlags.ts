/**
 * Map location strings to country flag emojis
 * Supports full country names, country codes, city + country, etc.
 */
const COUNTRY_MAP: Record<string, string> = {
  // Countries
  argentina: '🇦🇷',
  australia: '🇦🇺',
  austria: '🇦🇹',
  belgium: '🇧🇪',
  brazil: '🇧🇷',
  canada: '🇨🇦',
  chile: '🇨🇱',
  china: '🇨🇳',
  colombia: '🇨🇴',
  'costa rica': '🇨🇷',
  croatia: '🇭🇷',
  czech: '🇨🇿',
  czechia: '🇨🇿',
  'czech republic': '🇨🇿',
  denmark: '🇩🇰',
  egypt: '🇪🇬',
  estonia: '🇪🇪',
  finland: '🇫🇮',
  france: '🇫🇷',
  germany: '🇩🇪',
  greece: '🇬🇷',
  hongkong: '🇭🇰',
  'hong kong': '🇭🇰',
  hungary: '🇭🇺',
  iceland: '🇮🇸',
  india: '🇮🇳',
  indonesia: '🇮🇩',
  ireland: '🇮🇪',
  israel: '🇮🇱',
  italy: '🇮🇹',
  japan: '🇯🇵',
  korea: '🇰🇷',
  'south korea': '🇰🇷',
  'north korea': '🇰🇵',
  latvia: '🇱🇻',
  liechtenstein: '🇱🇮',
  lithuania: '🇱🇹',
  luxembourg: '🇱🇺',
  malaysia: '🇲🇾',
  malta: '🇲🇹',
  mexico: '🇲🇽',
  netherlands: '🇳🇱',
  'new zealand': '🇳🇿',
  norway: '🇳🇴',
  peru: '🇵🇪',
  philippines: '🇵🇭',
  poland: '🇵🇱',
  portugal: '🇵🇹',
  romania: '🇷🇴',
  russia: '🇷🇺',
  singapore: '🇸🇬',
  spain: '🇪🇸',
  sweden: '🇸🇪',
  switzerland: '🇨🇭',
  taiwan: '🇹🇼',
  thailand: '🇹🇭',
  turkey: '🇹🇷',
  ukraine: '🇺🇦',
  'united kingdom': '🇬🇧',
  uk: '🇬🇧',
  'united states': '🇺🇸',
  usa: '🇺🇸',
  us: '🇺🇸',
  'united arab emirates': '🇦🇪',
  uae: '🇦🇪',
  venezuela: '🇻🇪',
  vietnam: '🇻🇳',

  // US States
  alabama: '🇺🇸',
  alaska: '🇺🇸',
  arizona: '🇺🇸',
  arkansas: '🇺🇸',
  california: '🇺🇸',
  colorado: '🇺🇸',
  connecticut: '🇺🇸',
  delaware: '🇺🇸',
  florida: '🇺🇸',
  georgia: '🇺🇸',
  hawaii: '🇺🇸',
  idaho: '🇺🇸',
  illinois: '🇺🇸',
  indiana: '🇺🇸',
  iowa: '🇺🇸',
  kansas: '🇺🇸',
  kentucky: '🇺🇸',
  louisiana: '🇺🇸',
  maine: '🇺🇸',
  maryland: '🇺🇸',
  massachusetts: '🇺🇸',
  michigan: '🇺🇸',
  minnesota: '🇺🇸',
  mississippi: '🇺🇸',
  missouri: '🇺🇸',
  montana: '🇺🇸',
  nebraska: '🇺🇸',
  nevada: '🇺🇸',
  'new hampshire': '🇺🇸',
  'new jersey': '🇺🇸',
  'new mexico': '🇺🇸',
  'new york': '🇺🇸',
  'north carolina': '🇺🇸',
  'north dakota': '🇺🇸',
  ohio: '🇺🇸',
  oklahoma: '🇺🇸',
  oregon: '🇺🇸',
  pennsylvania: '🇺🇸',
  'rhode island': '🇺🇸',
  'south carolina': '🇺🇸',
  'south dakota': '🇺🇸',
  tennessee: '🇺🇸',
  texas: '🇺🇸',
  utah: '🇺🇸',
  vermont: '🇺🇸',
  virginia: '🇺🇸',
  washington: '🇺🇸',
  'west virginia': '🇺🇸',
  wisconsin: '🇺🇸',
  wyoming: '🇺🇸',
  dc: '🇺🇸',
  'd.c.': '🇺🇸',
  'district of columbia': '🇺🇸',
}

/**
 * Get country flag emoji from location string
 * Returns emoji if found, or location string as-is
 */
export function getCountryFlag(location?: string | null): string {
  if (!location) return '🌍'

  const normalized = location.toLowerCase().trim()
  const flag = COUNTRY_MAP[normalized]

  if (flag) return flag

  // Try partial matching for multi-word locations (e.g., "San Francisco, USA")
  const parts = normalized.split(/[,/]/).map(s => s.trim())
  for (const part of parts) {
    if (COUNTRY_MAP[part]) return COUNTRY_MAP[part]
  }

  return '🌍'
}

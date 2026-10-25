/**
 * Bangladeshi Taka Currency and Number Formatters
 */

export function formatBDT(amount: number, style: 'compact' | 'full' = 'compact'): string {
  if (isNaN(amount)) return '৳0';

  if (style === 'compact') {
    const abs = Math.abs(amount);
    const sign = amount < 0 ? '-' : '';

    if (abs >= 10000000) {
      // 1 Crore = 10,000,000
      const croreVal = (abs / 10000000).toFixed(2);
      return `${sign}৳${croreVal} Cr`;
    } else if (abs >= 100000) {
      // 1 Lakh = 100,000
      const lakhVal = (abs / 100000).toFixed(2);
      return `${sign}৳${lakhVal} Lakh`;
    } else if (abs >= 1000) {
      const kVal = (abs / 1000).toFixed(1);
      return `${sign}৳${kVal}K`;
    }
  }

  // South Asian Number Format (e.g., 12,34,567)
  const isNegative = amount < 0;
  const numStr = Math.round(Math.abs(amount)).toString();
  
  if (numStr.length <= 3) {
    return `${isNegative ? '-' : ''}৳${numStr}`;
  }

  const lastThree = numStr.substring(numStr.length - 3);
  const otherNumbers = numStr.substring(0, numStr.length - 3);
  const formattedOther = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
  
  return `${isNegative ? '-' : ''}৳${formattedOther},${lastThree}`;
}

export function formatNumberBD(num: number): string {
  if (isNaN(num)) return '0';
  const numStr = Math.round(Math.abs(num)).toString();
  if (numStr.length <= 3) {
    return (num < 0 ? '-' : '') + numStr;
  }
  const lastThree = numStr.substring(numStr.length - 3);
  const otherNumbers = numStr.substring(0, numStr.length - 3);
  const formattedOther = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
  return (num < 0 ? '-' : '') + `${formattedOther},${lastThree}`;
}

const BD_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function formatDateBD(dateStr: string): string {
  if (!dateStr) return '';
  // Deterministic ISO match (YYYY-MM-DD) to prevent timezone shifts across SSR & client
  const isoMatch = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (isoMatch) {
    const year = isoMatch[1];
    const monthIdx = parseInt(isoMatch[2], 10) - 1;
    const day = isoMatch[3];
    if (monthIdx >= 0 && monthIdx < 12) {
      return `${day} ${BD_MONTHS[monthIdx]} ${year}`;
    }
  }

  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  const day = String(d.getUTCDate()).padStart(2, '0');
  const month = BD_MONTHS[d.getUTCMonth()];
  const year = d.getUTCFullYear();
  return `${day} ${month} ${year}`;
}

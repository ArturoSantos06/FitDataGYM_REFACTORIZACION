export const toDate = (value) => {
  const date = value?.toDate?.() || new Date(value || 0);
  return Number.isNaN(date.getTime()) ? new Date(0) : date;
};

export const parseProductDetails = (details) => {
  if (Array.isArray(details)) return details;

  try {
    const parsed = JSON.parse(String(details || '[]'));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    // Compatibilidad con registros antiguos que usaban comillas simples.
    try {
      const parsed = JSON.parse(String(details || '[]').replace(/'/g, '"'));
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
};

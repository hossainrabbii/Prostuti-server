export const applyTemplate = (
  html: string,
  data: Record<string, any>,
): string => {
  return html.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    const value = data[key];
    if (value === undefined)
      console.warn(`Template variable not found: {{${key}}}`);
    return value !== undefined && value !== null ? String(value) : "";
  });
};

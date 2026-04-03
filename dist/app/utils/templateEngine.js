export const applyTemplate = (html, data) => {
    return html.replace(/\{\{(\w+)\}\}/g, (match, key) => {
        const value = data[key];
        if (value === undefined)
            console.warn(`Template variable not found: {{${key}}}`);
        return value !== undefined && value !== null ? String(value) : "";
    });
};
//# sourceMappingURL=templateEngine.js.map
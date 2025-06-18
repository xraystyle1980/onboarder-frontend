export const getMimeType = (format: string): string => {
  switch (format) {
    case 'markdown':
      return 'text/markdown';
    case 'html':
      return 'text/html';
    case 'json':
      return 'application/json';
    default:
      return 'text/plain';
  }
}; 
// resources/js/utils/pagination.js

/**
 * Returns an array of visible page numbers for pagination display.
 * @param {number} current - Current page number.
 * @param {number} last - Last page number.
 * @param {number} delta - Number of pages to show before and after current.
 * @returns {number[]} - Array of visible page numbers.
 */
export const getVisiblePages = (current, last, delta = 2) => {
  let start = Math.max(1, current - delta);
  let end = Math.min(last, current + delta);

  // Adjust for edges
  if (current <= delta) end = Math.min(last, 5);
  if (current + delta > last) start = Math.max(1, last - 4);

  const pages = [];
  for (let i = start; i <= end; i++) pages.push(i);
  return pages;
};

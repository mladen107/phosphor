/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2016, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/


/**
 * Test whether a client position lies within a node.
 *
 * @param node - The DOM node of interest.
 *
 * @param clientX - The client X coordinate of interest.
 *
 * @param clientY - The client Y coordinate of interest.
 *
 * @returns `true` if the node covers the position, `false` otherwise.
 *
 * #### Example
 * ```typescript
 * import { hitTest } from 'phosphor/lib/dom/query';
 *
 * let div = document.createElement('div');
 * div.style.position = 'absolute';
 * div.style.left = '0px';
 * div.style.top = '0px';
 * div.style.width = '100px';
 * div.style.height = '100px';
 * document.body.appendChild(div);
 *
 * hitTest(div, 50, 50);   // true
 * hitTest(div, 150, 150); // false
 * ```
 */
export
function hitTest(node: Element, clientX: number, clientY: number): boolean {
  let rect = node.getBoundingClientRect();
  return (
    clientX >= rect.left &&
    clientX < rect.right &&
    clientY >= rect.top &&
    clientY < rect.bottom
  );
}


/**
 * Scroll an element into view if needed.
 *
 * @param area - The scroll area element.
 *
 * @param elem - The element of interest.
 *
 * @param threshold - The overflow threshold, in pixels, required
 *   before adjusting the scroll position. The default is zero.
 *
 * #### Example
 * ```typescript
 * import { scrollIfNeeded } from 'phosphor/lib/dom/query';
 *
 * let area = document.createElement('div');
 * let elem = document.createElement('div');
 *
 * // Style the scrollable area with a small height and a black border.
 * area.style.height = '100px';
 * area.style.overflow = 'auto';
 * area.style.border = '1px solid black';
 *
 * // Style the element of interest with a red border and some content.
 * elem.style.border = '1px solid red';
 * elem.textContent = 'visible content';
 *
 * // Add enough whitespace to to guarantee scrolling.
 * for (let i = 0; i < 50; i++) {
 *   area.appendChild(document.createElement('br'));
 * }
 *
 * // Attach the nodes to the DOM.
 * area.appendChild(elem);
 * document.body.appendChild(area);
 *
 * // Scroll to the element of interest.
 * scrollIfNeeded(area, elem);
 * ```
 */
export
function scrollIfNeeded(area: HTMLElement, elem: HTMLElement, threshold = 0): void {
  let ar = area.getBoundingClientRect();
  let er = elem.getBoundingClientRect();
  if (er.top < (ar.top - threshold)) {
    area.scrollTop -= ar.top - er.top + threshold;
  } else if (er.bottom > (ar.bottom + threshold)) {
    area.scrollTop += er.bottom - ar.bottom + threshold;
  }
}
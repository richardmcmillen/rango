import { focusesOnclick } from "../lib/dom-utils";
import { applyEmphasisStyles, applyInitialStyles } from "../lib/styles";
import { intersectors } from "./intersectors";
import { displayHints } from "./hints";

export function clickElementByHint(hintText: string, newTab: true) {
	const target = intersectors.find(
		(intersector) => intersector.hintText === String(hintText)
	);

	if (target) {
		applyEmphasisStyles(target);
		if (focusesOnclick(target.element)) {
			setTimeout(() => {
				applyInitialStyles(target);
			}, 300);
			(target.element as HTMLInputElement).focus();
		} else {
			let evt = new MouseEvent("click", {
				bubbles: true,
				cancelable: true,
				view: window,
				metaKey: newTab
			});

			target.element.dispatchEvent(evt);

			// On some pages like codepen there are hints remaining after closing a popup panel.
			// This is not a perfect solution but as long as the user clicks with voice I think we're safe
			displayHints(intersectors);
		}
	}
}

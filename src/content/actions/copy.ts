import { ResponseWithTalonAction } from "../../typing/types";
import { showTooltip } from "../hints/tooltip";
import { getIntersectorWithHint } from "../intersectors";

export function copyToClipboardResponse(text: string): ResponseWithTalonAction {
	return {
		talonAction: {
			type: "copyToClipboard",
			textToCopy: text,
		},
	};
}

export function copyElementTextContentToClipboard(hintText: string) {
	const target = getIntersectorWithHint(hintText);
	const textContent = target.element.textContent;
	const message = textContent ? "Copied!" : "No text content to copy";
	showTooltip(target, message, 1500);
	return textContent ? copyToClipboardResponse(textContent) : undefined;
}

export function copyLinkToClipboard(hintText: string) {
	const target = getIntersectorWithHint(hintText);
	let href;
	if (target.element instanceof HTMLAnchorElement) {
		href = target.element.href;
	}

	const message = href ? "Copied!" : "Not a link";
	showTooltip(target, message, 1500);
	return href ? copyToClipboardResponse(href) : undefined;
}

export function copyMarkdownLinkToClipboard(hintText: string) {
	const target = getIntersectorWithHint(hintText);
	let href;
	let markdown;
	if (target.element instanceof HTMLAnchorElement) {
		href = target.element.href;
		const title = target.element.textContent ?? "";
		markdown = `[${title}](${href})`;
	}

	const message = markdown ? "Copied!" : "Not a link";
	showTooltip(target, message, 1500);
	return markdown ? copyToClipboardResponse(markdown) : undefined;
}

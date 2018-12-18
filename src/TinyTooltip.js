class TinyTooltip {
	constructor(_trigger) {
		this.trigger = _trigger;
		this.bindEvents();
	}

	buildTooltip(_info) {
		let data = JSON.parse(_info),
			left = this.trigger.offsetLeft,
			top = this.trigger.offsetTop,
			tooltip = document.createElement("div");

		tooltip.className = "TinyTooltip";

		switch (data.type) {
			case "primary":
				tooltip.className += " TinyTooltip--primary";
				break;
			case "danger":
				tooltip.className += " TinyTooltip--danger";
				break;
			case "info":
				tooltip.className += " TinyTooltip--info";
				break;
			case "success":
				tooltip.className += " TinyTooltip--success";
				break;
			case "default":
				tooltip.className += " TinyTooltip--default";
				break;
			default:
				tooltip.className += " TinyTooltip--default";
		}

		tooltip.textContent = data.text;

		tooltip.setAttribute("style", `transform: translate3d(${left}px, ${top - 35}px, 0);visibility: hidden;`);

		if (!document.querySelector(".TinyTooltip")) {
			document.body.appendChild(tooltip);
			let tooltipEl = document.querySelector(".TinyTooltip"),
				tooltipElWidth = tooltipEl.offsetWidth,
				tooltipElHalfWidth = tooltipElWidth / 2;

			tooltip.setAttribute("style", `transform: translate3d(${left + this.trigger.offsetWidth - (tooltipElHalfWidth + this.trigger.offsetWidth / 2)}px, ${top - 35}px, 0);visibility: visible;`);
		}
	}

	showTooltip() {
		let info = this.trigger.getAttribute("data-tinytooltip");
		this.buildTooltip(info);
	}

	hideTooltip() {
		if (document.querySelector(".TinyTooltip")) {
			document.querySelector(".TinyTooltip").remove();
		}
	}

	bindEvents() {
		this.trigger.addEventListener("mouseenter", this.showTooltip.bind(this));
		this.trigger.addEventListener("mouseleave", this.hideTooltip.bind(this));
	}
}

export default {
	init: function() {
		const triggers = document.querySelectorAll("[data-tinytooltip]");

		// For every tooltip create a new TinyTooltip object
		[...triggers].forEach(trigger => {
			new TinyTooltip(trigger);
		});
	}
};

/*jslint white: true, browser: true, devel: true, onevar: true, undef: true, nomen: true, eqeqeq: true, plusplus: false, bitwise: true, regexp: true, newcap: true, immed: true */
/*global window */

/*
 * Chess engine module.
 * No AI, just move validation.
 */
(function ()
{
	/*
	 * Module definitions.
	 */
	var state = {
		},
		log = function ()
		{
			var i, msg = "",
				console = document.getElementById("console");
			if (console) {
				for (i = 0; i < arguments.length - 1; i++) {
					msg += arguments[i] + " ";
				}
				msg += arguments[i];
				console.textContent = msg + "\n" + console.textContent;
			}
		},
		handlers = {
			start: function (ev)
			{
				log("start handler");
			},
			move: function (ev)
			{
				log("move handler");
			}
		},
		onMessage = function (ev)
		{
			var data = JSON.parse(ev.data),
				type = data.type || "";

			log(ev.origin, ev.data);
			if (typeof handlers[type] === "function") {
				handlers[type](ev);
			} else {
				log("Handler not implemented");
			}
		};


	/*
	 * Module initialization.
	 */

	// Listen to messages.
	window.addEventListener("message", onMessage, false);

	// Tell we're ready.
	parent.postMessage(JSON.stringify({type: "ready"}), "http://chess-mashup.com");
}());

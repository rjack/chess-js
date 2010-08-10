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
	var log = function (msg)
		{
			var console = document.getElementById("console");
			if (console) {
				console.textContent = msg + "\n" + console.textContent;
			}
		},
		onMessage = function (ev)
		{
			var data = JSON.parse(ev.data),
				type = data.type || "";

			log(ev.data);
		};


	/*
	 * Module initialization.
	 */

	// Listen to messages.
	window.addEventListener("message", onMessage, false);

	// Tell we're ready.
	parent.postMessage(JSON.stringify({type: "ready"}), "http://chess-mashup.com");
}());

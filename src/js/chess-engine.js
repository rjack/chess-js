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
	var onMessage = function (ev)
		{
			var data = JSON.parse(ev.data),
				type = data.type || "";

			if (type === "start") {
				alert("chess-engine:start");
			} else if (type === "move") {
				alert("chess-engine:move");
			} else {
				alert("chess-engine:unknown (" + type + ")");
			}
		};


	/*
	 * Module initialization.
	 */

	// Listen to messages.
	window.addEventListener("message", onMessage, false);

	// Tell we're ready.
	parent.postMessage(JSON.stringify({type: "engine:ready"}), "http://chess-mashup.com");
}());

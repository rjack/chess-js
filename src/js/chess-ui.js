/*jslint white: true, browser: true, devel: true, onevar: true, undef: true, nomen: true, eqeqeq: true, plusplus: false, bitwise: true, regexp: true, newcap: true, immed: true */
/*global window */

/*
 * Chess UI module.
 */
(function ()
{
	/*
	 * Module definitions.
	 */
	var	onMessage = function (ev)
		{
			var	data = JSON.parse(ev.data),
				type = data.type;

			if (type === "start") {
				alert("chess-ui:start");
			} else if (type === "move") {
				alert("chess-ui:move");
			} else {
				alert("chess-ui:unknown (" + type + ")");
			}
		};


	/*
	 * Module initialization.
	 */

	// Listen to messages.
	window.addEventListener("message", onMessage, false);

	// Tell we're ready
	parent.postMessage(JSON.stringify({type: "ui:ready"}), "http://chess-mashup.com");
}());

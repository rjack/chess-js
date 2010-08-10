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
	var log = function ()
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
		ui = {
			"new-game": function (ev)
			{
				parent.postMessage(JSON.stringify({type: "new-game"}), "http://chess-mashup.com");
			}
		},
		handlers = {
			"new-game": function (ev)
			{
				log("new-game handler");
			},
			"move": function (ev)
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

	// Listen to UI events.
	document.getElementById("new-game").addEventListener("click", ui["new-game"], false);

	// Tell we're ready.
	parent.postMessage(JSON.stringify({type: "ready"}), "http://chess-mashup.com");
}());

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
	var state = {},
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
			"new-game": function (ev, data)
			{
				var initState = function ()
					{
						return {
							title: "",     // game title
							pieces: [
								{ name: "r", pos: [0, 0], color: "black" },
								{ name: "n", pos: [0, 1], color: "black" },
								{ name: "b", pos: [0, 2], color: "black" },
								{ name: "q", pos: [0, 3], color: "black" },
								{ name: "k", pos: [0, 4], color: "black" },
								{ name: "b", pos: [0, 5], color: "black" },
								{ name: "n", pos: [0, 6], color: "black" },
								{ name: "r", pos: [0, 7], color: "black" },
								{ name: "p", pos: [1, 0], color: "black" },
								{ name: "p", pos: [1, 1], color: "black" },
								{ name: "p", pos: [1, 2], color: "black" },
								{ name: "p", pos: [1, 3], color: "black" },
								{ name: "p", pos: [1, 4], color: "black" },
								{ name: "p", pos: [1, 5], color: "black" },
								{ name: "p", pos: [1, 6], color: "black" },
								{ name: "p", pos: [1, 7], color: "black" },
								{ name: "r", pos: [7, 0], color: "white" },
								{ name: "n", pos: [7, 1], color: "white" },
								{ name: "b", pos: [7, 2], color: "white" },
								{ name: "q", pos: [7, 3], color: "white" },
								{ name: "k", pos: [7, 4], color: "white" },
								{ name: "b", pos: [7, 5], color: "white" },
								{ name: "n", pos: [7, 6], color: "white" },
								{ name: "r", pos: [7, 7], color: "white" },
								{ name: "p", pos: [6, 0], color: "white" },
								{ name: "p", pos: [6, 1], color: "white" },
								{ name: "p", pos: [6, 2], color: "white" },
								{ name: "p", pos: [6, 3], color: "white" },
								{ name: "p", pos: [6, 4], color: "white" },
								{ name: "p", pos: [6, 5], color: "white" },
								{ name: "p", pos: [6, 6], color: "white" },
								{ name: "p", pos: [6, 7], color: "white" }
							]
						};
					};

				state = initState();
				state.title = data.title;
				parent.postMessage(JSON.stringify({type: "update", new_value: state}), "http://chess-mashup.com");
			},
			"move": function (ev, data)
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
				handlers[type](ev, data);
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

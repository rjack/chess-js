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
								{ name: "r", pos: [0, 0], color: "white" },
								{ name: "n", pos: [1, 0], color: "white" },
								{ name: "b", pos: [2, 0], color: "white" },
								{ name: "k", pos: [3, 0], color: "white" },
								{ name: "q", pos: [4, 0], color: "white" },
								{ name: "b", pos: [5, 0], color: "white" },
								{ name: "n", pos: [6, 0], color: "white" },
								{ name: "r", pos: [7, 0], color: "white" },
								{ name: "p", pos: [0, 1], color: "white" },
								{ name: "p", pos: [1, 1], color: "white" },
								{ name: "p", pos: [2, 1], color: "white" },
								{ name: "p", pos: [3, 1], color: "white" },
								{ name: "p", pos: [4, 1], color: "white" },
								{ name: "p", pos: [5, 1], color: "white" },
								{ name: "p", pos: [6, 1], color: "white" },
								{ name: "p", pos: [7, 1], color: "white" },
								{ name: "r", pos: [0, 7], color: "black" },
								{ name: "n", pos: [1, 7], color: "black" },
								{ name: "b", pos: [2, 7], color: "black" },
								{ name: "k", pos: [3, 7], color: "black" },
								{ name: "q", pos: [4, 7], color: "black" },
								{ name: "b", pos: [5, 7], color: "black" },
								{ name: "n", pos: [6, 7], color: "black" },
								{ name: "r", pos: [7, 7], color: "black" },
								{ name: "p", pos: [0, 6], color: "black" },
								{ name: "p", pos: [1, 6], color: "black" },
								{ name: "p", pos: [2, 6], color: "black" },
								{ name: "p", pos: [3, 6], color: "black" },
								{ name: "p", pos: [4, 6], color: "black" },
								{ name: "p", pos: [5, 6], color: "black" },
								{ name: "p", pos: [6, 6], color: "black" },
								{ name: "p", pos: [7, 6], color: "black" }
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

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
		ui = (function ()
		{
			var i,
				elems = {
					"title": null,
					"input-title": null,
					"board": null
				};
			for (i in elems) {
				elems[i] = document.getElementById(i);
			}
			return elems;
		}()),
		ui_handlers = {
			"input-new-game": function (ev)
			{
				var message = {
					type: "new-game",
					title: ui["input-title"].value || "Foo game"
				};
				parent.postMessage(JSON.stringify(message), "http://chess-mashup.com");
			}
		},
		game_handlers = {
			"update": function (ev, data)
			{
				if (data.new_value.title) {
					ui.title.textContent = data.new_value.title;
				}
			}
		},
		onMessage = function (ev)
		{
			var data = JSON.parse(ev.data),
				type = data.type || "";

			log(ev.origin, ev.data);
			if (typeof game_handlers[type] === "function") {
				game_handlers[type](ev, data);
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
	document.getElementById("input-new-game").addEventListener("click", ui_handlers["input-new-game"], false);

	// Create empty board.
	(function ()
	{
		var i, j,
			color,
			tr, td;

		for (i = 0; i < 8; i++) {
			tr = document.createElement("tr");
			for (j = 0; j < 8; j++) {
				td = document.createElement("td");
				tr.appendChild(td);
				if ((i + j) % 2) {
					color = "black";
				} else {
					color = "white";
				}
				td.setAttribute("class", color);
			}
			ui.board.appendChild(tr);
		}
	}());

	// Tell we're ready.
	parent.postMessage(JSON.stringify({type: "ready"}), "http://chess-mashup.com");
}());

/*jslint white: true, browser: true, devel: true, onevar: true, undef: true, nomen: true, eqeqeq: true, plusplus: false, bitwise: true, regexp: true, newcap: true, immed: true */
/*global window */

/*
 * Chess UI module that log moves to console.
 */
(function ()
{
	var ev,

	var namespace = "com.example.chess-ui-log",

		namespace_separator = ":",

		/*
		 * >> namespaced("foo")
		 * "com.example.chess-ui-log:foo"
		 */
		namespaced = function (event_type)
		{
			return namespace + namespace_separator + event_type;
		},

		/*
		 * >> denamespace("com.example.chess-ui-log:foo")
		 * [ "com.example.chess-ui-log", "foo" ]
		 */
		denamespace = function (ev)
		{
			return ev.split(namespace_separator);
		},

		onStart = function (ev)
		{
			console.log("Chess game " + ev.data.game.id +
					" \"" + ev.data.game.name + "\" started: " +
					ev.data.players.white + " (white) vs " +
					ev.data.players.black + " (black)");
		},

		onMove = function (ev)
		{
			console.log(ev.data.player + " moved "  + ev.data.piece +
					" from " + ev.data.from + " to " + ev.data.to +
					(captures ? " capturing " : ""));
		},

		onCheckmate = logEvent,

		onMessage = function (ev)
		{
			var chunks = denamespace(ev.data.type),
				ns = chunks[0],
				type = chunks[1];

			if (ns === namespace) {
				if (type === "start") {
					onStart(ev);
				} else if (type === "move") {
					onMove(ev);
				} else if (type === "checkmate") {
					onCheckmate(ev);
				}
			}
		};


	// Listen to messages
	window.addEventListener("message", onMessage, false);

	// Tell we're ready
	window.postMessage({type: namespaced("ready")}, window.location);
}());

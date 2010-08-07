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

		onStart = logEvent,

		onMove = logEvent,

		onCheckmate = logEvent,

		onMessage = function (ev)
		{
			var chunks = ev.data.type.split(":"),
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
	window.postMessage(namespaced("ready"), window.location);
}());

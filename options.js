/*
HTCRAWL - 1.0
http://htcrawl.org
Author: filippo.cavallarin@wearesegment.com

This program is free software; you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free Software
Foundation; either version 2 of the License, or (at your option) any later
version.
*/

exports.options = {
	id: 0,
	verbose: false,
	checkAjax: true,
	fillValues: true,
	triggerEvents: true,
	checkWebsockets: true,
	searchUrls: true,
	jsonOutput:true,
	maxExecTime: 300000, // 300 seconds - remove me!
	ajaxTimeout:3000,
	printAjaxPostData: true,
	loadImages: false,
	getCookies:true,
	mapEvents: true,
	checkScriptInsertion: true,
	checkFetch: true,
	httpAuth: false,
	triggerAllMappedEvents: true, //unused
	outputMappedEvents: false,
	overrideTimeoutFunctions: false,
	referer: false,
	userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'",
	allEvents: ['abort', 'autocomplete', 'autocompleteerror', 'beforecopy', 'beforecut', 'beforepaste', 'blur', 'cancel', 'canplay', 'canplaythrough', 'change', /*'click',*/ 'close', 'contextmenu', 'copy', 'cuechange', 'cut', 'dblclick', 'drag', 'dragend', 'dragenter', 'dragleave', 'dragover', 'dragstart', 'drop', 'durationchange', 'emptied', 'ended', 'error', 'focus', 'input', 'invalid', 'keydown', 'keypress', 'keyup', 'load', 'loadeddata', 'loadedmetadata', 'loadstart', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'mousewheel', 'paste', 'pause', 'play', 'playing', 'progress', 'ratechange', 'reset', 'resize', 'scroll', 'search', 'seeked', 'seeking', 'select', 'selectstart', 'show', 'stalled', 'submit', 'suspend', 'timeupdate', 'toggle', 'volumechange', 'waiting', 'webkitfullscreenchange', 'webkitfullscreenerror', 'wheel'],
	// experimenting with click only ..
	mouseEvents: ['click'], //['click','dblclick','mouseup','mousedown','mousemove','mouseover', 'mouseout'],
	keyboardEvents: [], //['keydown', 'keypress', 'keydown', 'keypress', 'keyup'],
	setCookies: [{
        "name": "s_1",
        "value": "af3aa63b-32a0-4d1a-beb7-5e4fd281429c",
        "domain": "172.18.1.199",
        "path": "/api/v1/",
        "expires": 1730276985,
        "size": 39,
        "httpOnly": true,
        "secure": true,
        "Samesite": "Lax",
        "session": false,
        "sameParty": false,
        "sourceScheme": "Secure",
        "sourcePort": 443
      }],
	excludedUrls: [],
	maximumRecursion: 5,
	maximumAjaxChain: 30,
	preventElementRemoval: 1,
	randomSeed: "IsHOulDb34RaNd0MsTR1ngbUt1mN0t",
	// map input names to string generators. see generateRandomValues to see all available generators
	inputNameMatchValue:[ // regexps NEED to be string to get passed to phantom page
		{name: "mail", value: "email"},
		{name: "((number)|(phone))|(^tel)", value: "number"},
		{name: "(date)|(birth)", value: "humandate"},
		{name: "((month)|(day))|(^mon$)", value: "month"},
		{name: "year", value: "year"},
		{name: "url", value: "url"},
		{name: "firstname", value: "firstname"},
		{name: "(surname)|(lastname)", value: "surname"},
	],
	/* always trigger these events since event delegation mays "confuse" the triggering of mapped events */
	// NOTE: trigger mouseUP FIRST to prevent up and down to be considered a click
	eventsMap: {
		'button':['click','dblclick','keydown','keyup','mouseup', 'mousedown'],
		'select':['change','click','dblclick','keydown','keyup','mouseup', 'mousedown'],
		'input':['change','click','dblclick','blur','focus','keydown','keyup','mouseup', 'mousedown'],
		'a':['click','dblclick','keydown','keyup','mouseup', 'mousedown'],
		'textarea':['change','click','dblclick','blur','focus','keydown','keyup','mouseup', 'mousedown'],
		'span':['click','dblclick','mouseup', 'mousedown'],
		'td':['click','dblclick','mouseup', 'mousedown'],
		'tr':['click','dblclick','mouseup', 'mousedown'],
		'div':['click','dblclick','mouseup', 'mousedown']
	},
	proxy: null,
	loadWithPost: false,
	postData: null,
	headlessChrome: true,
	extraHeaders: {},
	openChromeDevtoos: false,
	exceptionOnRedirect: false,
	navigationTimeout: 20000,
	bypassCSP: true,
	simulateRealEvents: true,
	crawlmode: "linear", // linear || random
	browserLocalstorage: null,
	skipDuplicateContent: false,
	localStorageByLogin: {"csrf_token":"ImRkYTUwOTEyNDcxMTRiYzhmYjgyM2ZiNjU3YjBkY2FkMTZhYjlkYTYi.ZUIO4A.KgX6UEBu9efsTG3XvYGL2zve6Jw",
	"pub":"LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQm9qQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FZOEFNSUlCaWdLQ0FZRUF1YzdUWFRUM0NDNVhkSDFxUkdGYwpGcENBMkZTZnhEY3oxQ0llRi82RXZScFk5SFlHTXBNTnEwT01jSWFuTTVIdFBRTjh3a0ludDNoVTR2MVZRWDl2Cm1yYWRaajZpZEpXbFREK1Vrdi81emc4b3lKaW0zNkN2b2dQbWFVSEpsMnpHelgxTFJmOG9oLzFZTXNFOFR0MS8KVGNsU2thU0JXeEVpQzB1WUIxQzdhZ1lFVlI0VzVZM3N0alJXT2NrKzVjUHdXY1FGY1pJTVhwUEp3ZzdNTm5ORAptTTNxOFNaM0RNTGdMck9OM1JMUVhJVVZCaEs3d0VWM2J1bmFHSGhkbkZYZEphNmpiZG4vamFsL1A4RDI3N1E0CmlQTFBPRDVJMmlLN3cxVFFKOXNoaXE4YTZXTTZueTdKWTVzOWYvUEVMNUlNWmhCUUdXYVFvd25YMVRxK2pqWisKeTZyd1ZIQ2xna2JBRGo0RGxVb3J3TGhja29MRlRQRmNKZ0I3c3hpcXp1MmhER2J0TVJZa2dDVm1uREpRMW5LcgpwQWhIVm1od3pWU3pwbWc1YWpydXBjMWR1K2YzdnEzNDZoRGdwa0ZZbzlVTmpWdXFReTJjTUxndk9QZDZsazNQCm1SZ3hNRWxoMlZBUHYxK256ZnFseWxwSVdFQldZL0tNWXhwUGxOT0JPcTRMQWdNQkFBRT0KLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0tCg==",
	"url_path":"/task/addtask",
	"app-authority":'["supermanfusion"]',
	"token":"qG7cY0/4P8QM0I6c+Jc86DALVwy37Cb15ALZEu+UhkKHMS05tZTz6uhe1QuEjLB9X0Dk8GQUOF3erg8Q+nsr36e4nD9DO5ySfXw7r3XA1rM="
	}
};

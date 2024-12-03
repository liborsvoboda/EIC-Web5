describe("the show command", function () {
	beforeEach(function () {
		clearWorkArea();
	});
	afterEach(function () {
		clearWorkArea();
	});

	it("can show element, with display:block by default", function () {
		var div = make("<div style=display:none _='on click show me'></div>");
		getComputedStyle(div).display.should.equal("none");
		div.click();
		getComputedStyle(div).display.should.equal("block");
	});

	it("can show form, with display:block by default", function () {
		var form = make("<form style=display:none _='on click show me'></form>");
		getComputedStyle(form).display.should.equal("none");
		form.click();
		getComputedStyle(form).display.should.equal("block");
	});

	it("can show element with display:block explicitly", function () {
		var div = make("<div style=display:none _='on click show me with display'></div>");
		getComputedStyle(div).display.should.equal("none");
		div.click();
		getComputedStyle(div).display.should.equal("block");
	});

	it("can show element with custom display value", function () {
		var div = make("<div style=display:none _='on click show me with display: flex'></div>");
		getComputedStyle(div).display.should.equal("none");
		div.click();
		getComputedStyle(div).display.should.equal("flex");
	});

	it("can show element with inline-block display value", function () {
		var div = make("<div style=display:none _='on click show me with display: inline-block'></div>");
		getComputedStyle(div).display.should.equal("none");
		div.click();
		getComputedStyle(div).display.should.equal("inline-block");
	});

	it("can show element with opacity:1", function () {
		var div = make("<div style=opacity:0 _='on click show me with opacity'></div>");
		getComputedStyle(div).opacity.should.equal("0");
		div.click();
		getComputedStyle(div).opacity.should.equal("1");
	});

	it("can show element with opacity style literal", function () {
		var div = make("<div style=opacity:0 _='on click show me with *opacity'></div>");
		getComputedStyle(div).opacity.should.equal("0");
		div.click();
		getComputedStyle(div).opacity.should.equal("1");
	});

	it("can show element, with visibility:visible", function () {
		var div = make("<div style=visibility:hidden _='on click show me with visibility'></div>");
		getComputedStyle(div).visibility.should.equal("hidden");
		div.click();
		getComputedStyle(div).visibility.should.equal("visible");
	});

	it("can show other elements", function () {
		var showme = make("<div style=display:none class=showme></div>");
		var div = make("<div _='on click show .showme'></div>");
		getComputedStyle(showme).display.should.equal("none");
		div.click();
		getComputedStyle(showme).display.should.equal("block");
	});

	it("can show multiple elements with inline-block display value", function () {
		var div = make("<div _='on click show <#d1, #d2/> with display: inline-block'></div>");
		var d1 = make("<div style='display: none' id='d1'></div>");
		var d2 = make("<div style='display: none' id='d2'></div>");
		getComputedStyle(d1).display.should.equal("none");
		getComputedStyle(d2).display.should.equal("none");
		div.click();
		getComputedStyle(d1).display.should.equal("inline-block");
		getComputedStyle(d2).display.should.equal("inline-block");
	});

	it("can show multiple elements as class with inline-block display value", function () {
		var div = make("<div _='on click show .c1 with display:inline-block'></div>");
		var d1 = make("<div style='display: none' id='d1' class='c1'></div>");
		var d2 = make("<div style='display: none' id='d2' class='c1'></div>");
		getComputedStyle(d1).display.should.equal("none");
		getComputedStyle(d2).display.should.equal("none");
		div.click();
		getComputedStyle(d1).display.should.equal("inline-block");
		getComputedStyle(d2).display.should.equal("inline-block");
	});

	it("can use a when clause to show or hide an element", function () {
		var div = make("<div _='on click " +
			"                              toggle .foo " +
			"                              show when I match .foo'></div>");
		div.classList.contains("foo").should.equal(false);
		div.click();
		div.classList.contains("foo").should.equal(true);
		getComputedStyle(div).display.should.equal("block");
		div.click();
		div.classList.contains("foo").should.equal(false);
		getComputedStyle(div).display.should.equal("none");
		div.click();
		div.classList.contains("foo").should.equal(true);
		getComputedStyle(div).display.should.equal("block");
	});

	it("can use a when clause and a with clause to show or hide an element", function () {
		var div = make("<div _='on click " +
			"                              toggle .foo " +
			"                              show with opacity when I match .foo'></div>");
		div.classList.contains("foo").should.equal(false);
		div.click();
		div.classList.contains("foo").should.equal(true);
		getComputedStyle(div).opacity.should.equal("1");
		div.click();
		div.classList.contains("foo").should.equal(false);
		getComputedStyle(div).opacity.should.equal("0");
		div.click();
		div.classList.contains("foo").should.equal(true);
		getComputedStyle(div).opacity.should.equal("1");
	});

	it("can filter over a set of elements using the its symbol", function () {
		var div = make("<div _='on click show <p/> in me when its innerText contains \"foo\"'>" +
			"<p id='p1'>foo</p>" +
			"<p id='p2'>bar</p>" +
			"<p id='p3'>foo</p>" +
			"<p id='p4'>doh</p>" +
			"</div>");

		var p1 = byId("p1")
		var p2 = byId("p2")
		var p3 = byId("p3")
		var p4 = byId("p4")

		getComputedStyle(p1).display.should.equal("block");
		getComputedStyle(p2).display.should.equal("block");
		getComputedStyle(p3).display.should.equal("block");
		getComputedStyle(p4).display.should.equal("block");

		div.click();

		getComputedStyle(p1).display.should.equal("block");
		getComputedStyle(p2).display.should.equal("none");
		getComputedStyle(p3).display.should.equal("block");
		getComputedStyle(p4).display.should.equal("none");


	});

	it("starting off with display none does not stick", function () {
		var div = make("<div style='display: none' _='on click toggle .foo show when I match .foo'></div>");
		getComputedStyle(div).display.should.equal("none");
		div.click();
		getComputedStyle(div).display.should.equal("block");
		div.click();
		getComputedStyle(div).display.should.equal("none");
	});

});

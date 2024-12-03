describe("the toggle command", function () {
	beforeEach(function () {
		clearWorkArea();
	});
	afterEach(function () {
		clearWorkArea();
	});

	it("can toggle class ref on a single div", function () {
		var div = make("<div _='on click toggle .foo'></div>");
		div.classList.contains("foo").should.equal(false);
		div.click();
		div.classList.contains("foo").should.equal(true);
		div.click();
		div.classList.contains("foo").should.equal(false);
	});

	it("can toggle class ref on a single form", function () {
		var form = make("<form _='on click toggle .foo'></form>");
		form.classList.contains("foo").should.equal(false);
		form.click();
		form.classList.contains("foo").should.equal(true);
		form.click();
		form.classList.contains("foo").should.equal(false);
	});

	it("can target another div for class ref toggle", function () {
		var bar = make("<div id='bar'></div>");
		var div = make("<div _='on click toggle .foo on #bar'></div>");
		bar.classList.contains("foo").should.equal(false);
		div.classList.contains("foo").should.equal(false);
		div.click();
		bar.classList.contains("foo").should.equal(true);
		div.classList.contains("foo").should.equal(false);
		div.click();
		bar.classList.contains("foo").should.equal(false);
		div.classList.contains("foo").should.equal(false);
	});

	it("can toggle non-class attributes", function () {
		var div = make("<div _='on click toggle [@foo=\"bar\"]'></div>");
		div.hasAttribute("foo").should.equal(false);
		div.click();
		div.getAttribute("foo").should.equal("bar");
		div.click();
		div.hasAttribute("foo").should.equal(false);
	});

	it("can toggle for a fixed amount of time", function (done) {
		var div = make("<div _='on click toggle .foo for 10ms'></div>");
		div.classList.contains("foo").should.equal(false);
		div.click();
		div.classList.contains("foo").should.equal(true);
		setTimeout(function () {
			div.classList.contains("foo").should.equal(false);
			done();
		}, 20);
	});

	it("can toggle until an event on another element", function (done) {
		var d1 = make("<div id='d1'></div>");
		var div = make("<div _='on click toggle .foo until foo from #d1'></div>");
		div.classList.contains("foo").should.equal(false);
		div.click();
		div.classList.contains("foo").should.equal(true);
		d1.dispatchEvent(new CustomEvent("foo"));
		setTimeout(function () {
			div.classList.contains("foo").should.equal(false);
			done();
		}, 1);
	});

	it("can toggle between two classes", function () {
		var div = make("<div class='foo' _='on click toggle between .foo and .bar'></div>");
		div.classList.contains("foo").should.equal(true);
		div.classList.contains("bar").should.equal(false);
		div.click();
		div.classList.contains("foo").should.equal(false);
		div.classList.contains("bar").should.equal(true);
		div.click();
		div.classList.contains("foo").should.equal(true);
		div.classList.contains("bar").should.equal(false);
	});

	it("can toggle multiple class refs", function () {
		var div = make("<div class='bar' _='on click toggle .foo .bar'></div>");
		div.classList.contains("foo").should.equal(false);
		div.classList.contains("bar").should.equal(true);
		div.click();
		div.classList.contains("foo").should.equal(true);
		div.classList.contains("bar").should.equal(false);
		div.click();
		div.classList.contains("foo").should.equal(false);
		div.classList.contains("bar").should.equal(true);
	});
});

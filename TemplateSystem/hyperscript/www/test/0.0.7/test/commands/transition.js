describe("the transition command", function() {

    beforeEach(function () {
        clearWorkArea();
    });
    afterEach(function () {
        clearWorkArea();
    });

    it("can transition a single property on current element", function (done) {
        var div = make("<div _='on click transition width from 0px to 100px'></div>");
        div.style.width.should.equal("");
        div.click();
        div.style.width.should.equal("0px");
        setTimeout(function () {
            div.style.width.should.equal("100px");
            done();
        }, 20);
    })

    it("can transition two properties on current element", function (done) {
        var div = make("<div _='on click transition width from 0px to 100px height from 0px to 100px'></div>");
        div.style.width.should.equal("");
        div.style.height.should.equal("");
        div.click();
        div.style.width.should.equal("0px");
        div.style.height.should.equal("0px");
        setTimeout(function () {
            div.style.width.should.equal("100px");
            div.style.height.should.equal("100px");
            done();
        }, 20);
    })

    it("can transition on another element", function (done) {
        var div = make("<div _='on click transition element #foo width from 0px to 100px'></div>");
        var div2 = make("<div id='foo'></div>");
        div2.style.width.should.equal("");
        div.click();
        div2.style.width.should.equal("0px");
        setTimeout(function () {
            div2.style.width.should.equal("100px");
            done();
        }, 20);
    })

    it("can transition with a custom transition time", function (done) {
        var div = make("<div _='on click transition element #foo width from 0px to 100px using \"width 2s ease-in\"'></div>");
        var div2 = make("<div id='foo'></div>");
        div2.style.width.should.equal("");
        div.click();
        div2.style.width.should.equal("0px");
        setTimeout(function () {
            div2.style.width.should.equal("100px");
            done();
        }, 20);
    })



});


describe("_hyperscript regressions", function() {

    beforeEach(function () {
        clearWorkArea();
    });
    afterEach(function () {
        clearWorkArea();
    });

    it("can pick detail fields out by name", function(){
        var div = make("<div id='d1'></div>")
        var input = make("<input debug='true' _='on onchange if my.value !== \"\" then trigger customEvt end end " +
                                          "on customEvt log event then put my.value into #d1.innerHTML'/>");
        div.innerHTML.should.equal("");
        input.value = "foo";
        input.dispatchEvent(new Event("onchange"));
        input.value = "";
        input.dispatchEvent(new Event("onchange"));
        div.innerHTML.should.equal("foo");
        input.value = "bar";
        input.dispatchEvent(new Event("onchange"));
        div.innerHTML.should.equal("bar");
    })

    it("can trigger htmx events", function(){
        var div1 = make("<div id='div1' _='on htmx:foo put \"foo\" into my.innerHTML'></div>");
        var div2 = make("<div _='on click send htmx:foo to #div1'></div>");
        div2.click();
        div1.innerHTML.should.equal("foo");
    })

    it("can remove class by id", function(){
        var form = make("<form class='hideme' id='email-form'></form>");
        var div = make("<div _='on click remove .hideme from #email-form'></div>");
        form.classList.contains('hideme').should.equal(true);
        div.click();
        form.classList.contains('hideme').should.equal(false);
    })

    it("can remove by clicks elsewhere", function(){
        var div = make("<div _='on click elsewhere remove me'></div>");
        var div2 = make("<div></div>");
        div2.click();
        should.equal(div.parentNode, null);
    })

});
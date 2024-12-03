describe("the on feature", function() {

    beforeEach(function () {
        clearWorkArea();
    });
    afterEach(function () {
         clearWorkArea();
    });

    it("can respond to events with dots in names", function(){
        var bar = make("<div _='on click send example.event to #d1'></div>");
        var div = make("<div id='d1' _='on example.event add .called'></div>");
        div.classList.contains("called").should.equal(false);
        bar.click();
        div.classList.contains("called").should.equal(true);
    })

    it("can respond to events with colons in names", function(){
        var bar = make("<div _='on click send example:event to #d1'></div>");
        var div = make("<div id='d1' _='on example:event add .called'></div>");
        div.classList.contains("called").should.equal(false);
        bar.click();
        div.classList.contains("called").should.equal(true);
    })

    // TODO enable strings in event names
    // it("can respond to events with minus in names", function(){
    //     var bar = make("<div _='on click send \"a-b\" to #d1'></div>");
    //     var div = make("<div id='d1' _='on \"a-b\" add .called'></div>");
    //     div.classList.contains("called").should.equal(false);
    //     bar.click();
    //     div.classList.contains("called").should.equal(true);
    // })

    it("can respond to events on other elements", function(){
        var bar = make("<div id='bar'></div>");
        var div = make("<div _='on click from #bar add .clicked'></div>");
        div.classList.contains("clicked").should.equal(false);
        bar.click();
        div.classList.contains("clicked").should.equal(true);
    })

    it("supports \"elsewhere\" modifier", function(){
        var div = make("<div _='on click elsewhere add .clicked'></div>");
        div.classList.contains("clicked").should.equal(false);
        div.click();
        div.classList.contains("clicked").should.equal(false);
        document.body.click();
        div.classList.contains("clicked").should.equal(true);
    })

    it("supports \"from elsewhere\" modifier", function(){
        var div = make("<div _='on click from elsewhere add .clicked'></div>");
        div.classList.contains("clicked").should.equal(false);
        div.click();
        div.classList.contains("clicked").should.equal(false);
        document.body.click();
        div.classList.contains("clicked").should.equal(true);
    })

    it("can pick detail fields out by name", function(){
        var bar = make("<div id='d1' _='on click send custom(foo:\"fromBar\") to #d2'></div>");
        var div = make("<div id='d2' _='on custom(foo) call me.classList.add(foo)'></div>");
        div.classList.contains("fromBar").should.equal(false);
        bar.click();
        div.classList.contains("fromBar").should.equal(true);
    })

    it("can fire an event on load", function(done){
        var div = make("<div id='d1' _='on load put \"Loaded\" into my.innerHTML'></div>");
        setTimeout(function () {
            div.innerText.should.equal("Loaded");
            done();
        }, 1);
    })

    it("can filter the load event", function(done){
        var i = 0;
        window.increment = function() {
            i++;
        }
        var image = make("<img width='1px' _='on load[not detail.hyperscript] log event call window.increment()' src='https://hyperscript.org/img/light_logo.png'/>");
        setTimeout(function () {
            i.should.equal(1);
            delete window.increment;
            done();
        }, 200);
    })

    it("can be in a top level script tag", function(done){
        var div = make("<script type='text/hyperscript'>on load put \"Loaded\" into #loadedDemo.innerHTML</script><div id='loadedDemo'></div>");
        setTimeout(function () {
            byId('loadedDemo').innerText.should.equal("Loaded");
            done();
        }, 1);
    })

    it("can have a simple event filter", function(){
        var div = make("<div id='d1' _='on click[false] log event then put \"Clicked\" into my.innerHTML'></div>");
        div.click();
        byId('d1').innerText.should.equal("");
    })

    it("can refer to event properties directly in filter", function(){
        var div = make("<div _='on click[buttons==0] log event then put \"Clicked\" into my.innerHTML'></div>");
        div.click();
        div.innerText.should.equal("Clicked");

        div = make("<div _='on click[buttons==1] log event then put \"Clicked\" into my.innerHTML'></div>");
        div.click();
        div.innerText.should.equal("");

        div = make("<div _='on click[buttons==1 and buttons==0] log event then put \"Clicked\" into my.innerHTML'></div>");
        div.click();
        div.innerText.should.equal("");
    })

    it("can click after a positive event filter", function(){
        var div = make("<div _='on foo(bar)[bar] put \"triggered\" into my.innerHTML'></div>");
        div.dispatchEvent(new CustomEvent("foo", {detail: {bar:false}}));
        div.innerText.should.equal("");

        div.dispatchEvent(new CustomEvent("foo", {detail: {bar:true}}));
        div.innerText.should.equal("triggered");

    })

    it("multiple event handlers at a time are allowed to execute with the every keyword", function(){

        var i = 1;
        window.increment = function(){
            return i++;
        }

        var div = make("<div _='on every click put increment() into my.innerHTML then wait for a customEvent'></div>");
        div.click()
        div.innerText.should.equal("1");
        div.click()
        div.innerText.should.equal("2");
        div.click()
        div.innerText.should.equal("3");
        delete window.increment;
    })

    it("can have multiple event handlers", function(){

        var i = 1;
        window.increment = function(){
            return i++;
        }

        var div = make("<div _='on foo put increment() into my.innerHTML end" +
            "                          on bar put increment() into my.innerHTML'></div>");
        div.dispatchEvent(new CustomEvent("foo"));
        div.innerText.should.equal("1");
        div.dispatchEvent(new CustomEvent("bar"));
        div.innerText.should.equal("2");
        div.dispatchEvent(new CustomEvent("foo"));
        div.innerText.should.equal("3");
        delete window.increment;
    })

    it("can have multiple event handlers, no end", function(){

        var i = 1;
        window.increment = function(){
            return i++;
        }

        var div = make("<div _='on foo put increment() into my.innerHTML" +
            "                          on bar put increment() into my.innerHTML'></div>");
        div.dispatchEvent(new CustomEvent("foo"));
        div.innerText.should.equal("1");
        div.dispatchEvent(new CustomEvent("bar"));
        div.innerText.should.equal("2");
        div.dispatchEvent(new CustomEvent("foo"));
        div.innerText.should.equal("3");
        delete window.increment;
    })

    it("can queue events", function(done){

        var i = 0;
        window.increment = function(){
            return i++;
        }

        // start first event
        var div = make("<div _='on foo wait for bar then call increment()'></div>");
        div.dispatchEvent(new CustomEvent("foo"));
        i.should.equal(0);

        // queue next event
        div.dispatchEvent(new CustomEvent("foo"));
        i.should.equal(0);

        // queue next event
        div.dispatchEvent(new CustomEvent("foo"));
        i.should.equal(0);

        // ungate first event handler
        div.dispatchEvent(new CustomEvent("bar"));
        setTimeout(function () {
            i.should.equal(1);
            div.dispatchEvent(new CustomEvent("bar"));
            setTimeout(function () {
                i.should.equal(2);
                div.dispatchEvent(new CustomEvent("bar"));
                setTimeout(function () {
                    i.should.equal(2);
                    delete window.increment;
                    done();
                }, 20);
            }, 20);
        }, 20);
    })

    it("can queue first event", function(done){

        var i = 0;
        window.increment = function(){
            return i++;
        }

        // start first event
        var div = make("<div _='on foo queue first wait for bar then call increment()'></div>");
        div.dispatchEvent(new CustomEvent("foo"));
        i.should.equal(0);

        // queue next event
        div.dispatchEvent(new CustomEvent("foo"));
        i.should.equal(0);

        // queue next event
        div.dispatchEvent(new CustomEvent("foo"));
        i.should.equal(0);

        // ungate first event handler
        div.dispatchEvent(new CustomEvent("bar"));
        setTimeout(function () {
            i.should.equal(1);
            div.dispatchEvent(new CustomEvent("bar"));
            setTimeout(function () {
                i.should.equal(2);
                div.dispatchEvent(new CustomEvent("bar"));
                setTimeout(function () {
                    i.should.equal(2);
                    delete window.increment;
                    done();
                }, 20);
            }, 20);
        }, 20);
    })

    it("can queue last event", function(done){

        var i = 0;
        window.increment = function(){
            return i++;
        }

        // start first event
        var div = make("<div _='on foo queue last wait for bar then call increment()'></div>");
        div.dispatchEvent(new CustomEvent("foo"));
        i.should.equal(0);

        // queue next event
        div.dispatchEvent(new CustomEvent("foo"));
        i.should.equal(0);

        // queue next event
        div.dispatchEvent(new CustomEvent("foo"));
        i.should.equal(0);

        // ungate first event handler
        div.dispatchEvent(new CustomEvent("bar"));
        setTimeout(function () {
            i.should.equal(1);
            div.dispatchEvent(new CustomEvent("bar"));
            setTimeout(function () {
                i.should.equal(2);
                div.dispatchEvent(new CustomEvent("bar"));
                setTimeout(function () {
                    i.should.equal(2);
                    delete window.increment;
                    done();
                }, 20);
            }, 20);
        }, 20);
    })

    it("can queue all events", function(done){

        var i = 0;
        window.increment = function(){
            return i++;
        }

        // start first event
        var div = make("<div _='on foo queue all wait for bar then call increment()'></div>");
        div.dispatchEvent(new CustomEvent("foo"));
        i.should.equal(0);

        // queue next event
        div.dispatchEvent(new CustomEvent("foo"));
        i.should.equal(0);

        // queue next event
        div.dispatchEvent(new CustomEvent("foo"));
        i.should.equal(0);

        // ungate first event handler
        div.dispatchEvent(new CustomEvent("bar"));
        setTimeout(function () {
            i.should.equal(1);
            div.dispatchEvent(new CustomEvent("bar"));
            setTimeout(function () {
                i.should.equal(2);
                div.dispatchEvent(new CustomEvent("bar"));
                setTimeout(function () {
                    i.should.equal(3);
                    delete window.increment;
                    done();
                }, 20);
            }, 20);
        }, 20);
    })

    it("queue none does not allow future queued events", function(done){

        var i = 1;
        window.increment = function(){
            return i++;
        }

        var div = make("<div _='on click queue none put increment() into my.innerHTML then wait for a customEvent'></div>");
        div.click()
        div.innerText.should.equal("1");
        div.click()
        div.innerText.should.equal("1");
        div.dispatchEvent(new CustomEvent("customEvent"));
        setTimeout(function(){
            div.innerText.should.equal("1");
            div.click()
            div.innerText.should.equal("2");
            delete window.increment;
            done();
        }, 20)
    })

    it("can invoke on multiple events", function(){
        var i = 0;
        window.increment = function(){
            return i++;
        }

        var div = make("<div _='on click or foo call increment()'></div>");
        div.click()
        i.should.equal(1);
        div.dispatchEvent(new CustomEvent("foo"));
        i.should.equal(2);
        delete window.increment;
    })

    it("can listen for events in another element (lazy)", function(){

        var div = make("<div _='on click in #d1 put it into window.tmp'>" +
            "                    <div id='d1'></div>" +
            "                    <div id='d2'></div>" +
            "               </div>");
        var div1 = byId("d1");
        div1.click()
        div1.should.equal(window.tmp);
        delete window.tmp;
    })

    it("can filter events based on count", function () {
        var div = make("<div _='on click 1 put 1 + my.innerHTML as Int into my.innerHTML'>0</div>");
        div.click()
        div.innerHTML.should.equal("1");
        div.click()
        div.innerHTML.should.equal("1");
        div.click()
        div.innerHTML.should.equal("1");
    });

    it("can filter events based on count range", function () {
        var div = make("<div _='on click 1 to 2 put 1 + my.innerHTML as Int into my.innerHTML'>0</div>");
        div.click()
        div.innerHTML.should.equal("1");
        div.click()
        div.innerHTML.should.equal("2");
        div.click()
        div.innerHTML.should.equal("2");
    });

    it("can filter events based on unbounded count range", function () {
        var div = make("<div _='on click 2 and on put 1 + my.innerHTML as Int into my.innerHTML'>0</div>");
        div.click()
        div.innerHTML.should.equal("0");
        div.click()
        div.innerHTML.should.equal("1");
        div.click()
        div.innerHTML.should.equal("2");
    });

    it("can mix ranges", function () {
        var div = make("<div _='on click 1 put \"one\" into my.innerHTML " +
            "                          on click 3 put \"three\" into my.innerHTML " +
            "                          on click 2 put \"two\" into my.innerHTML '>0</div>");
        div.click()
        div.innerHTML.should.equal("one");
        div.click()
        div.innerHTML.should.equal("two");
        div.click()
        div.innerHTML.should.equal("three");
        div.click()
        div.innerHTML.should.equal("three");
    });


});


(this.webpackJsonp=this.webpackJsonp||[]).push([[17],{70:function(n,e,t){"use strict";t.r(e),t.d(e,"HTMLEnvironment",(function(){return a}));var i=t(146),o=t(9),r=t(7),c=t(25),s=t(29),u=function(n,e,t,i){return new(t||(t=Promise))((function(o,r){function c(n){try{u(i.next(n))}catch(n){r(n)}}function s(n){try{u(i.throw(n))}catch(n){r(n)}}function u(n){var e;n.done?o(n.value):(e=n.value,e instanceof t?e:new t((function(n){n(e)}))).then(c,s)}u((i=i.apply(n,e||[])).next())}))};class a{initialize({id:n,sharedEnvironment:e,styles:t}){return u(this,void 0,void 0,(function*(){const{appElement:u}=Object(s.a)(document,t),a=document.createElement("iframe");a.style.width="100%",a.style.height="100%",u.appendChild(a),Object(c.c)({id:n,prefixLineCount:0,sharedEnvironment:e,consoleProxy:o.d,onRunApplication:e=>{const t=function(n){return Object(i.bundle)({entry:n.entry,request({origin:e,url:t}){if(void 0===e)return n.fileMap[t];if(/^(https?)?\/\//.test(t))return;if(t.startsWith("/"))return n.fileMap[t.slice(1)];const i=r.c(r.a(e),t);return n.fileMap[i]}})}(e),o=a.contentDocument;o&&(o.close(),o.open(),function(n,{id:e,codeVersion:t}){const i=n.contentWindow;Object(c.a)({consoleProxy:i.console,codeVersion:t,id:e,prefixLineCount:0,sharedEnvironment:!1}),i.onerror=Object(c.b)({codeVersion:t,id:e,prefixLineCount:0})}(a,{id:n,codeVersion:e.codeVersion}),o.write(t),o.close())}})}))}}e.default=new a}}]);
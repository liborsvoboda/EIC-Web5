!function(n){var o={};function i(t){if(o[t])return o[t].exports;var e=o[t]={i:t,l:!1,exports:{}};return n[t].call(e.exports,e,e.exports,i),e.l=!0,e.exports}i.m=n,i.c=o,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)i.d(n,o,function(t){return e[t]}.bind(null,o));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=0)}([function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var c,s,o,l,i,r,a,u=n(1),d=n(3),p=n(4),f=n(5),m=z(d.default),y=z(p.default),g=document.getElementById("ts-version"),v=document.getElementById("ts-version-selector"),h=document.getElementById("editor-js"),w=document.getElementById("editor-ts"),b=document.getElementById("run-code"),O=document.getElementById("run-text"),E=document.getElementById("loading"),_=document.getElementById("processing"),S=document.getElementById("shareable-url"),x=document.getElementById("options-toggle"),I=document.getElementById("options"),j=Array.prototype.slice.call(I.getElementsByClassName("option")).map(function(t){return t.firstElementChild}),T=["uiOptions"];function C(n){document.getElementById("base").href=window.location.href.split("#")[0].replace(/\/?$/,"/"),window.require.config({paths:{vs:n.locationUrl}}),window.MonacoEnvironment={getWorkerUrl:function(t,e){return n.proxyPath}},window.require([n.entry],function(t){!function(t){!function(t){var e,n=f.getEditorConfigs().filter(function(t){return!0!==t.hide}).map(function(t){return{tsVersion:t.tsVersion,monacoVersion:t.monaco,monacoModule:t.module}}),o=document.createElement("select");o.id="ts-version-select";for(var i=0,r=n;i<r.length;i++){var a=r[i],c=document.createElement("option"),s=a.tsVersion;c.value=a.tsVersion,c.text=isNaN(parseInt(a.tsVersion[0]))?s:"v"+s,c.selected=a.tsVersion===t,c.selected&&(e=c.text),o.onchange=function(){k(this.value)},o.appendChild(c)}v.innerHTML="",v.appendChild(o),g.innerText=e}(t);var e=function(){var t=window.location.hash.substr(1);return t?W(t):{}}(),n=function(){var t=localStorage.getItem("tsp");return t?W(t):{}}(),o=!1;l={compilerOptions:{noImplicitAny:!1,strictNullChecks:!1,strictFunctionTypes:!1,strictPropertyInitialization:!1,noImplicitReturns:!1,noImplicitThis:!1,removeComments:!1,experimentalDecorators:!1,emitDecoratorMetadata:!1,allowNonTsExtensions:!0,target:monaco.languages.typescript.ScriptTarget.ES2015},windowOptions:{console:!0},uiOptions:{autoUpdateUrl:!1,localStorageBackup:!0}},window.tsp.options=l,window.tsp.compile=L,window.tsp.emit=L,window.tsp.run=U,window.tsp.share=$,window.tsp.reset=A,window.tsp.sync=M,window.tsp.setCompilerOption=B,window.tsp.changeTsVersion=k;var i=["function foo(bar: number): string {","    return `${bar}`;","}",""].join("\n");(!(n&&n.options&&n.options.uiOptions)||n.options.uiOptions.localStorageBackup)&&(o=!0);if(G({uiOptions:{localStorageBackup:o}}),o&&n&&n.options)for(var r in T){var a;n.options.hasOwnProperty(r)&&((a={})[r]=n.options[r],G(a))}e&&e.editor?i=e.editor:o&&n&&n.editor&&(i=n.editor);e&&e.options?G(e.options):o&&n&&n.options&&G(n.options);Y(),c=monaco.editor.create(w,{value:i,language:"typescript",automaticLayout:!0,minimap:{enabled:!1},selectionClipboard:!1}),s=monaco.editor.create(h,{value:["",""].join("\n"),language:"javascript",readOnly:!0,automaticLayout:!0,minimap:{enabled:!1},quickSuggestions:!1,parameterHints:{enabled:!1},autoClosingBrackets:"never",suggestOnTriggerCharacters:!1,snippetSuggestions:"none",wordBasedSuggestions:!1}),c.onDidChangeModelContent(u(L,100)),x.onclick=Z,window.onclick=tt,b.onclick=U,P(),window.onkeydown=N,L(),D(!0),F(),function(t,e,n){void 0===e&&(e=5);void 0===n&&(n=.01);t.style.opacity="1";var o=setInterval(function(){parseFloat(t.style.opacity)<.05?(clearInterval(o),t.style.opacity="0",t.style.display="none"):t.style.opacity=""+(parseFloat(t.style.opacity)-n)},e)}(E)}(n.tsVersion)})}function k(t){var e=new URLSearchParams(window.location.search);e.set("ts",t),window.location.search=e.toString()}function B(t,e){window.tsp.options.compilerOptions[t]=e,P(),Y(),L()}function M(){P(),Y()}function N(t){t.ctrlKey&&82===t.which&&U(),(t.ctrlKey||t.metaKey)&&83===t.which&&t.preventDefault()}function P(){for(var t=j,e=0;e<t.length;e++){var n=t[e],o=n.classList.item(0);Q()[o].hasOwnProperty(n.name)&&(n instanceof HTMLInputElement?"checkbox"===n.type?n.checked=!!l[o][n.name]:"text"===t[e].type&&(n.value=""+l[o][n.name]):n instanceof HTMLSelectElement&&(n.value=""+l[o][n.name])),n.onchange=V}}function V(t){var e=this.classList.item(0),n=Q()[e][this.name];this instanceof HTMLInputElement?"checkbox"===this.type?n=!!this.checked:"text"===this.type&&(n=this.value):n=this instanceof HTMLSelectElement?this.value:this.value||void 0,Q()[e][this.name]=n,Y(),L(),D(),F(),J()}function L(t){void 0!==t&&(D(),F()),_.style.display="inline-block",monaco.languages.typescript.getTypeScriptWorker().then(function(t){return t(c.getModel().uri)}).then(function(t){return t.getEmitOutput(c.getModel().uri.toString())},et).then(function(t){return!t.emitSkipped&&(!(!t.outputFiles||!t.outputFiles[0])&&t.outputFiles[0].text)},et).then(function(t){var e;return"string"==typeof t&&(e=t,s.getModel().setValue(e)),!!t},et).then(function(t){et()},et)}function U(){var e;!o||o.closed?(function(){if(!O)return;O.innerText="Run in window"}(),e=window.open("about:blank","","width=800,height=600"),o=e):(e=o,function(){if(!O)return;O.innerText="Run in window"}()),e.onunload=null,e.location.href="about:blank",setTimeout(function(){var t;e.document.open(),e.document.write((t=void 0!==t?t:Q().windowOptions.console?m:y).replace(/__CODE__/,s.getValue())),e.document.close(),e.onunload=R},50)}function R(){O&&(O.innerText="Run in new window")}function D(t){window.tsp.options.uiOptions.autoUpdateUrl?t||(window.location.hash=H(q(K()))):window.location.hash&&(window.location.hash="")}function F(){window.tsp.options.uiOptions.localStorageBackup?localStorage.setItem("tsp",H(K())):localStorage.setItem("tsp",H({options:{uiOptions:{localStorageBackup:!1}}}))}function A(t,e,n){if((void 0===t&&(t=!1),void 0===e&&(e=!1),n&&n.preventDefault(),!e)&&!confirm("Are you sure? All your changes will be lost."))return;localStorage.removeItem("tsp"),t&&(window.location.href=window.location.href.split("#")[0])}function J(){S.value=$()}function $(){return window.location.href.replace(window.location.hash,"").replace("#","")+("#"+H(q(K())))}function H(t){return btoa(encodeURIComponent(JSON.stringify(t)))}function W(t){return JSON.parse(decodeURIComponent(atob(t)))}function q(t){t=JSON.parse(JSON.stringify(t));for(var e=0,n=T;e<n.length;e++){var o=n[e];t.options[o]=void 0}return t}function K(t){return void 0===t&&(t=!0),{editor:c.getValue(),options:X()}}function Y(){var t=X();t.compilerOptions.allowNonTsExtensions=!0,monaco.languages.typescript.typescriptDefaults.setCompilerOptions(t.compilerOptions)}function z(t){return"string"!=typeof t?"":t.replace(new RegExp(/__BASE__/),window.location.href.split("#")[0].replace(/\/?$/,"/")).replace(new RegExp(/__VERSION__/g),"1.11.0")}function G(t,e){for(var n in void 0===e&&(e=Q()),t)null!==t[n]&&"object"==typeof t[n]?G(t[n],e[n]):e[n]=t[n]}function Q(){return window.tsp.options}function X(){return JSON.parse(JSON.stringify(Q()))}function Z(t){this.classList.toggle("active")&&J(),I.classList.toggle("visible")}function tt(t){x.contains(t.target)||I.contains(t.target)||I.classList.remove("visible")}function et(){_.style.display="none"}window.tsp={options:{}},i=new URLSearchParams(location.search).get("ts"),r=f.getEditorConfig(i),(a=document.createElement("script")).onload=function(){C(r)},a.src=r.loaderUrl,document.head.appendChild(a)},function(i,t,e){(function(t){function h(){return o.Date.now()}var r=NaN,a="[object Symbol]",c=/^\s+|\s+$/g,s=/^[-+]0x[0-9a-f]+$/i,l=/^0b[01]+$/i,u=/^0o[0-7]+$/i,d=parseInt,e="object"==typeof t&&t&&t.Object===Object&&t,n="object"==typeof self&&self&&self.Object===Object&&self,o=e||n||Function("return this")(),p=Object.prototype.toString,w=Math.max,b=Math.min;function O(t){var e=typeof t;return t&&("object"==e||"function"==e)}function E(t){if("number"==typeof t)return t;if("symbol"==typeof(e=t)||(n=e)&&"object"==typeof n&&p.call(e)==a)return r;var e,n,o;if(O(t)&&(t=O(o="function"==typeof t.valueOf?t.valueOf():t)?o+"":o),"string"!=typeof t)return 0===t?t:+t;t=t.replace(c,"");var i=l.test(t);return i||u.test(t)?d(t.slice(2),i?2:8):s.test(t)?r:+t}i.exports=function(o,i,t){var r,a,c,s,l,u,d=0,p=!1,f=!1,e=!0;if("function"!=typeof o)throw new TypeError("Expected a function");function m(t){var e=r,n=a;return r=a=void 0,d=t,s=o.apply(n,e)}function y(t){var e=t-u;return void 0===u||i<=e||e<0||f&&c<=t-d}function g(){var t,e,n=h();if(y(n))return v(n);l=setTimeout(g,(e=i-((t=n)-u),f?b(e,c-(t-d)):e))}function v(t){return l=void 0,e&&r?m(t):(r=a=void 0,s)}function n(){var t,e=h(),n=y(e);if(r=arguments,a=this,u=e,n){if(void 0===l)return d=t=u,l=setTimeout(g,i),p?m(t):s;if(f)return l=setTimeout(g,i),m(u)}return void 0===l&&(l=setTimeout(g,i)),s}return i=E(i)||0,O(t)&&(p=!!t.leading,f="maxWait"in t,c=f?w(E(t.maxWait)||0,i):c,e="trailing"in t?!!t.trailing:e),n.cancel=function(){void 0!==l&&clearTimeout(l),r=u=a=l=void(d=0)},n.flush=function(){return void 0===l?s:v(h())},n}}).call(this,e(2))},function(t,e){var n=function(){return this}();try{n=n||new Function("return this")()}catch(t){"object"==typeof window&&(n=window)}t.exports=n},function(t,e,n){"use strict";n.r(e),e.default='<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <base id="base" href="__BASE__" />\n    <meta charset="utf8" />\n    <title>TypeScript Playground (run code)</title>\n    <link rel="icon" href="assets/favicon.ico" />\n    <link rel="stylesheet" href="style.css?__VERSION__" />\n    <script>\n      window.tsp = window.tsp || {};\n    <\/script>\n  </head>\n\n  <body id="run-window">\n    <div id="console" class="grid grid-pad">\n      <div class="col-1-1">\n        <div id="console-heading">\n          Console Output:\n        </div>\n      </div>\n      <div class="col-1-1">\n        <div class="console" id="console-content"></div>\n      </div>\n    </div>\n    <div id="loading-window">\n      <div class="spinner">\n        <div class="double-bounce1"></div>\n        <div class="double-bounce2"></div>\n      </div>\n    </div>\n\n    <script src="run.js?__VERSION__"><\/script>\n\n    <script id="code">\n      (function () {\n        __CODE__;\n      })();\n    <\/script>\n    <script>\n      tsp.fadeOut(document.getElementById("loading-window"));\n    <\/script>\n  </body>\n</html>\n'},function(t,e,n){"use strict";n.r(e),e.default='<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="utf8" />\n    <title>TypeScript Playground (run code)</title>\n    <link rel="icon" href="__BASE__/assets/favicon.ico" />\n  </head>\n\n  <body>\n    <script>\n      __CODE__;\n    <\/script>\n  </body>\n</html>\n'},function(t,e,n){"use strict";var l=this&&this.__assign||function(){return(l=Object.assign||function(t){for(var e,n=1,o=arguments.length;n<o;n++)for(var i in e=arguments[n])Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t}).apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0}),e.getEditorConfig=e.getEditorConfigs=e.getLatestVersion=void 0;var u=n(6);function d(){return Object.keys(u).filter(function(t){return"nightly"!==t&&!t.includes("-")}).sort().pop()}function o(t){void 0===t&&(t="latest");var e=d(),n=t;null==n&&(n="latest"),"latest"===n&&(n=e),null==u[n.toLowerCase()]&&(n=e);var o=u[n];if(null==o)throw new Error("Could not load TypeScript version");var i="https://unpkg.com/"+o.module+"@"+o.monaco,r=i+"/min",a=r+"/vs",c=r+"/vs/loader.js",s="proxy.js?baseUrl="+r+"&locationUrl="+a;return l(l({},o),{entry:"vs/editor/editor.main",tsVersion:n,monacoUrl:i,baseUrl:r,locationUrl:a,loaderUrl:c,proxyPath:s})}e.getLatestVersion=d,e.getEditorConfigs=function(){return Object.keys(u).map(o)},e.getEditorConfig=o},function(t){t.exports=JSON.parse('{"2.4.1":{"monaco":"0.10.0","module":"monaco-editor"},"2.7.2":{"monaco":"0.11.1","module":"monaco-editor"},"2.8.1":{"monaco":"0.13.1","module":"monaco-editor"},"3.0.1":{"monaco":"0.14.3","module":"monaco-editor"},"3.1.6":{"monaco":"0.15.6","module":"monaco-editor"},"3.3.3":{"monaco":"0.16.1","module":"monaco-editor"},"3.5.1":{"monaco":"0.17.1","module":"monaco-editor"},"3.6.3":{"monaco":"0.18.1","module":"monaco-editor"},"3.7-beta":{"monaco":"3.7.2","module":"@typescript-deploys/monaco-editor","hide":true},"3.7.5":{"monaco":"3.7.5","module":"@typescript-deploys/monaco-editor"},"3.8-beta":{"monaco":"3.8.0-beta","module":"@typescript-deploys/monaco-editor","hide":true},"3.8.3":{"monaco":"3.8.3","module":"@typescript-deploys/monaco-editor"},"3.9.2":{"monaco":"3.9.2","module":"@typescript-deploys/monaco-editor"},"4.0.0-beta":{"monaco":"4.0.0-beta","module":"@typescript-deploys/monaco-editor"},"nightly":{"monaco":"next","module":"@typescript-deploys/monaco-editor"}}')}]);
//# sourceMappingURL=app.js.map
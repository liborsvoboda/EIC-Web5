/**
 * In most cases the jsxLoader will be used to automatically compile JSX code
 * in the browser, however if needed it's possible that it can be used from node.
 * 
 * https://github.com/dataformsjs/dataformsjs/issues/16
 * 
 * To compare transformed code with Babel, try it online:
 *  https://babeljs.io/repl
 * 
 * In general results should be similar. With the recent versions of Babel (2020-2022)
 * it will add extra comments for generated React Code that are not included with jsxLoader.
 * The current version of jsxLoader typically spaces elements one element per line for
 * readability of the transformed code which is different than the Babel output which
 * is more compressed for line-endings.
 */

/**
 * Import
 */
const { jsxLoader } = require('../js/react/jsxLoader')

/**
 * React Demo
 */
const reactCode = jsxLoader.compiler.compile('<Comp>hello mama</Comp>')
console.log(reactCode)
console.log('\n')
/*
Result:
"use strict";
React.createElement(Comp, null, "hello mama");
*/

/**
 * `h` Demo
 */
jsxLoader.compiler.pragma = 'h';
const desugarizedCode = jsxLoader.compiler.compile('<Comp>hello mama</Comp>')
console.log(desugarizedCode)
console.log('\n')
/*
"use strict";
h(Comp, null, "hello mama")
*/

/**
 * Nested Elements using Vue 3 `Vue.h` and `Vue.Fragment`
 */
jsxLoader.compiler.pragma = 'Vue.h';
jsxLoader.compiler.pragmaFrag = 'Vue.Fragment';
const nestedElement = jsxLoader.compiler.compile('<>hello extra space <span>test</span> <span>test2</span></>')
console.log(nestedElement)
console.log('\n')
/*
"use strict";
Vue.h(Vue.Fragment, null, "hello extra space ", 
            Vue.h("span", null, "test"), " ", 
            Vue.h("span", null, "test2"))
*/

/**
 * [jsxLoader.usePreact()] Helper and do not automatically add "use strict"
 */
jsxLoader.usePreact()
jsxLoader.compiler.addUseStrict = false;
const preactCode = jsxLoader.compiler.compile('<><div>Hello Preact</div></>')
console.log(preactCode)
console.log('\n')
/*
preact.createElement(preact.Fragment, null, 
            preact.createElement("div", null, "Hello Preact"))
*/

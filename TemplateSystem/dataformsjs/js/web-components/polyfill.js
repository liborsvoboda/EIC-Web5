/**
 * DataFormsJS Web Components Polyfill
 *
 * This script provides polyfills for older browsers for all DataFormsJS Web Components and
 * core features needed for app development. This script does not provide polyfills for
 * [window.customElements] or any Web Component APIs; rather it uses the DataFormsJS
 * Framework to replicate the needed functionality for DataFormsJS Web Components to work.
 *
 * When DataFormsJS was first created it started out as a JavaScript Framework that can
 * use HTML to handle a lot of app functionality. For example, defining SPA routes from
 * script elements that download HTML as needed, defining JSON services through HTML,
 * and adding features to apps using HTML attributes. This is similar to a goal of
 * Web Components which allow for custom app logic based on user defined HTML elements.
 * Most of the DataFormsJS Web Components have been designed based on the original
 * Framework so this made for an ideal use of the polyfill because Framework code
 * is small in size and optimized to work with all browsers.
 *
 * Additionally, DataFormsJS Web Components provide an easy to customize API based on
 * plain JavaScript functions or code. This script will trigger the same API DOM events
 * which allows apps to define simple functions that can work with both modern and
 * legacy browsers if needed.
 *
 * Example Usage:
 *     <script type="module" src="dataformsjs/js/web-components/url-router.min.js"></script>
 *     <script type="module" src="dataformsjs/js/web-components/json-data.min.js"></script>
 *     <script nomodule src="dataformsjs/js/web-components/polyfill.min.js"></script>
 *
 * When this script runs it will determine the URL it’s running from and then download
 * additional Framework Plugins and Scripts as needed for the page. If the install path
 * can be determined or if it’s manually set it will download from that location otherwise
 * it will use a public CDN. These files are small in size and download asynchronously
 * so there is no or minimal delay for most users.
 *
 * @link     https://www.dataformsjs.com
 * @author   Conrad Sollitt (https://conradsollitt.com)
 * @license  MIT
 */

/* Validates with both [eslint] and [jshint] */
/* global app, Promise */
/* eslint-env browser */
/* eslint quotes: ["error", "single", { "avoidEscape": true }] */
/* eslint strict: ["error", "function"] */
/* eslint spaced-comment: ["error", "always"] */
/* eslint no-console: ["error", { allow: ["log", "warn", "error"] }] */
/* eslint no-prototype-builtins: "off" */
/* jshint strict: true */
/* jshint evil:true */

(function () {
    'use strict';

    /**
     * CSS that is added to the page.
     */
    var polyfillStyleId = 'web-components-polyfill-css';
    var polyfillStyleCss = [
        // For IE during page loading until `app.updateTemplatesForIE()` is from the main framework
        'template { display:none }',
        // Reset all JS Controls converted from Web Components
        '[data-control] { display:block; padding:0; margin:0; }',
        // Handle <json-data> for Modern browsers as it will not be defined.
        // DataFormsJS templates typically have this set to `display:none`
        // when the component is not defined.
        'json-data[data-control]:not(:defined), is-loading:not(:defined), has-error:not(:defined), is-loaded:not(:defined) { display:block; }',
        // Older Webkit Browsers (UC Browser, Old Safari) need additional updates
        // for non-JS-control components otherwise margin/padding can appear slightly off.
        'image-gallery, markdown-content { display: block; }',
    ].join('\n');

    // Module Level Variables
    var rootUrl = null;
    var useMinFiles = null;

    /**
     * Update specific Web Components to use DataFormsJS Framework Plugins, Controls, etc.
     * In many cases the Web Components use HTML Attributes without a "data-" prefix,
     * while the Framework Plugins and Controls typically use or require a "data-" prefix.
     */
    var updateElements = {
        dataAttributes: function(element, attributes) {
            attributes.forEach(function(attr) {
                var value = element.getAttribute(attr);
                if (value !== null) {
                    element.setAttribute('data-' + attr, value);
                }
            });
        },
        jsonData: function(element) {
            updateElements.dataAttributes(element, ['url', 'load-only-once', 'click-selector', 'transform-data']);
            var elements = ['is-loading', 'has-error', 'is-loaded'];
            elements.forEach(function(name) {
                var el = element.querySelector(name);
                if (el) {
                    var div = document.createElement('div');
                    div.className = el.className;
                    div.classList.add(name);
                    var templateSelector = el.getAttribute('template-selector');
                    if (templateSelector) {
                        div.setAttribute('data-template-selector', templateSelector);
                    }
                    while (el.firstChild) {
                        div.appendChild(el.removeChild(el.firstChild));
                    }
                    el.parentNode.replaceChild(div, el);
                }
            });
        },
        dataList: function(element) {
            updateElements.dataAttributes(element, ['template-selector', 'root-element', 'root-class', 'root-attr', 'error-class', 'template-returns-html', 'list-item-name']);
        },
        dataTable: function(element) {
            updateElements.dataAttributes(element, ['highlight-class', 'labels', 'columns', 'table-attr', 'col-class', 'col-link-template', 'col-link-fields', 'row-item-name']);
        },
        dataView: function(element) {
            updateElements.dataAttributes(element, ['template-selector', 'template-returns-html']);
        },
        imageGallery: function(element) {
            element.setAttribute('data-image-gallery', element.getAttribute('image'));
            updateElements.dataAttributes(element, ['image-avif', 'image-webp']);
            var title = element.getAttribute('title');
            if (title === null) {
                var img = element.querySelector('img[alt]');
                if (img) {
                    title = img.getAttribute('alt');
                    element.setAttribute('title', title);
                }
            }
        },
        inputFilter: function(element) {
            updateElements.dataAttributes(element, ['filter-selector', 'filter-results-text-all', 'filter-results-text-filtered']);
            var selector = element.getAttribute('filter-results-selector');
            if (selector) {
                element.setAttribute('data-filter-results-text-selector', selector);
            }
        },
        leafletMap: function(element) {
            element.setAttribute('data-leaflet', '');
            updateElements.dataAttributes(element, ['latitude', 'longitude', 'zoom', 'marker']);
            // Convert bind attributes - example:
            //   "latitude, longitude, marker"
            // To:
            //   "data-latitude, data-longitude, data-marker"
            var bindAttr = element.getAttribute('data-bind-attr');
            if (bindAttr && !bindAttr.includes('data-')) {
                bindAttr = bindAttr.split(',').map(function(s) { return 'data-' + s.trim(); });
                element.setAttribute('data-bind-attr', bindAttr.join(', '));
            }
        },
        markdownContent: function(element) {
            updateElements.dataAttributes(element, ['url', 'show-source', 'loading-selector', 'link-target', 'link-rel', 'link-root-url', 'load-only-once']);
        },
        navLinks: function() {
            // This assumes only one <nav is="spa-links"> exists on the page. If a site
            // uses multiple nav formats then it will likely need to make additional updates
            // on the 'app:routeChanged' event.
            var navSelector = 'nav[is="spa-links"]';
            var element = document.querySelector(navSelector);
            if (!element) {
                return;
            }
            var itemSelector = element.getAttribute('item-selector');
            if (itemSelector) {
                app.plugins.navLinks.itemSelector = navSelector + ' ' + itemSelector;
            }
            var activeClass = element.getAttribute('active-class');
            if (activeClass) {
                app.plugins.navLinks.activeClass = activeClass;
            }
        },
        animation: function() {
            var animationService = document.querySelector('animation-service');
            if (!animationService) {
                return;
            }
            var intersectionRatio = animationService.getAttribute('intersection-ratio');
            if (intersectionRatio && !isNaN(parseFloat(intersectionRatio))) {
                app.plugins.animation.intersectionRatio = parseFloat(intersectionRatio);
            }
        },
    };

    /**
     * Custom Framework Page object to handle routes defined by <url-router> Routes.
     */
    var polyfillPage = {
        model: {},
        onRendered: function() {
            var model = this;

            // Define API based on Web Component version that apps may call
            var router = document.querySelector('url-router');
            if (router) {
                router.currentRoute = { path: app.activeController.path };
            }

            // Bind [url-param] elements
            var elements = document.querySelectorAll('[url-param]');
            Array.prototype.forEach.call(elements, function(element) {
                var name = element.getAttribute('url-param');
                if (model[name] !== undefined) {
                    element.textContent = model[name];
                }
            });

            // Update all elements with the [url-attr-param] attribute.
            // This will typically be used to replace <a href> and other
            // attributes with values from the URL.
            elements = document.querySelectorAll('[url-attr-param]');
            Array.prototype.forEach.call(elements, function(element) {
                app.plugins.dataBind.bindAttrTmpl(element, 'url-attr-param', model);
            });

            // App Event
            // When using Web Components this happens on the <url-router> and bubbles
            // up to the document. For the polyfill the specific router element
            // doesn't matter so the event is dispatched on the document.
            dispatchEvent(document, 'app:routeChanged', {
                url: (app.activeController && app.activeController.path ? app.activeController.path : null),
                urlParams: app.activeParameterList,
            });

            // Update <json-data> Web Component so it matches the
            // Framework control version then reload the control.
            var hasJsonData = false;
            app.activeJsControls.forEach(function(control) {
                if (control.control === 'json-data') {
                    updateElements.jsonData(control.element);
                    app.loadJsControl(control);
                    if (control.data.clickSelector === null) {
                        // Search forms that use [click-selector] will not run until
                        // after a user action so only set `hasJsonData` when the
                        // control will run automatically.
                        hasJsonData = true;
                    }
                }
            });

            // If <json-data> was found it will call `updateContent()` once the
            // data is downloaded, otherwise it needs to be called directly.
            if (!hasJsonData) {
                updateContent(document);
            }
        },
        onRouteUnload: function() {
            // Execute JavaScript from <url-route onunload="{js}">
            if (typeof this.onunload === 'string') {
                evalElementJs(this.onunload, 'url-route', 'onunload');
            }
        },
    };

    /**
     * Function used to add a plugin for elements that have the class [old-browser-warning].
     * All elements with the class will be updated regardless of the browser. The reason is
     * the intended production use of this file is to run from <script nomodule>.
     *
     * @param {HTMLElement} rootElement
     */
    var oldBrowserWarning = function(rootElement) {
        var elements = (rootElement || document).querySelectorAll('.old-browser-warning');
        var defaultMessage = 'Thank you for visiting! However some features on this page require a newer Browser or OS than the one that you are currently using. If you have a different browser available then please open this page with it.';
        Array.prototype.forEach.call(elements, function(element) {
            var message = element.getAttribute('data-old-browser-warning');
            app.showError(element, (message ? message : defaultMessage));
        });
    };

    /**
     * Function that gets called after a JSON Service finishes downloading data
     * or after the page is ready once the route has been set.
     */
    function updateContent(rootElement) {
        // Load Framework JavaScript Controls based on known Web Components.
        // For example: <data-list>, <data-table>, etc. This excludes <json-data>
        // which completes prior to this function being called.
        var promises = [];
        var controls = [
            { name:'data-list', transform: updateElements.dataList },
            { name:'data-table', transform: updateElements.dataTable },
            { name:'data-view', transform: updateElements.dataView },
            { name:'markdown-content', transform: updateElements.markdownContent },
        ];
        controls.forEach(function(control) {
            promises.push(new Promise(function(resolve) {
                var elements = rootElement.querySelectorAll(control.name);
                if (elements.length === 0) {
                    resolve();
                    return;
                }
                var url = rootUrl + 'controls/' + control.name + (useMinFiles ? '.min' : '') + '.js';
                app.loadScripts(url).then(function() {
                    Array.prototype.forEach.call(elements, function(el) {
                        control.transform(el);
                        app.loadJsControl(el);
                    });
                    resolve();
                });
            }));
        });

        // After all JS Controls are loaded then plugins can be loaded.
        // This matches the Framework behavior when `app.updateView()` is called.
        Promise.all(promises).finally(function () {
            // Make one final call to load an nested controls. For complex
            // sites that use a <json-data> within a <json-data> they cannot
            // be polyfilled, however for simple pages such as <markdown-content>
            // using [data-bind] under a <data-list> this will work.
            app.loadAllJsControls();

            // Make sure [data-bind] values are handled before other plugins run
            var firstElement = document.querySelector('[data-bind]');
            if (firstElement) {
                app.plugins.dataBind.reload();
            }

            // Look for elements that would trigger a plugin and add to list
            var pluginsToLoad = [];
            var search = [
                { selector: '.click-to-highlight', plugin: 'clickToHighlight' },
                { selector: '[data-sort]', plugin: 'sort' },
                { selector: '[is="spa-links"]', plugin: 'navLinks', after: updateElements.navLinks },
                { selector: '[is="input-filter"]', plugin: 'filter', update: updateElements.inputFilter },
                { selector: '[is="leaflet-map"]', plugin: 'leaflet', update: updateElements.leafletMap },
                { selector: 'image-gallery', plugin: 'imageGallery', update: updateElements.imageGallery },
                { selector: '[data-enter-key-click-selector]', plugin: 'keydownAction' },
                { selector: 'prism-service', plugin: 'prism' },
                { selector: '[data-export-csv-selector]', plugin: 'exportToCsv' },
                { selector: '[data-export-excel-selector]', plugin: 'exportToExcel' },
                { selector: 'highlighter-service', plugin: 'highlighter' },
                { selector: 'filter-service', plugin: 'filter' },
                { selector: 'animation-service', plugin: 'animation', after: updateElements.animation }, 
            ];
            search.forEach(function(item) {
                var element = document.querySelector(item.selector);
                if (element) {
                    // Add plugin to download list
                    if (typeof item.after === undefined) {
                        pluginsToLoad.push(item.plugin);
                    } else {
                        pluginsToLoad.push({ name: item.plugin, callback: item.after });
                    }
                    // Update all elements for specific plugins
                    if (item.update !== undefined) {
                        var elements = document.querySelectorAll(item.selector);
                        Array.prototype.forEach.call(elements, function(el) {
                            item.update(el);
                        });
                    }
                }
            });

            // Load Plugins
            pluginsToLoad.forEach(function(plugin) {
                if (typeof plugin === 'string') {
                    loadPlugin(plugin);
                } else {
                    loadPlugin(plugin.name, plugin.callback);
                }
            });

            // App Events
            dispatchEvent(rootElement, 'app:contentReady');
            if (rootElement !== document && rootElement.getAttribute('data-control') === 'json-data') {
                evalElementJs(rootElement.getAttribute('onready'), 'json-data', 'onready');
            }
        });
    }

    /**
     * Used to execute code from <url-route>[onload|onunload] and <json-data>[onready]
     *
     * @param {string} js
     * @param {string} name
     * @param {string} prop
     */
    function evalElementJs(js, name, prop) {
        if (js) {
            try {
                var fn = new Function('return ' + js);
                var result = fn();
                if (typeof result === 'function') {
                    result();
                }
            } catch(e) {
                app.showErrorAlert('Error from function <' + name + ' ' + prop + '="' + js + '">: ' + e.message);
                console.error(e);
            }
        }
    }

    /**
     * Trigger DOM Events for Apps to handle
     *
     * @param {HTMLElement} element
     * @param {Event|CustomEvent} event
     * @param {undefined|any} detail
     */
    function dispatchEvent(element, eventName, detail) {
        // Standard DOM Event
        var event;
        if (detail === undefined) {
            if (typeof(Event) === 'function') {
                event = new Event(eventName, { bubbles: true }); // Modern Browsers
            } else {
                event = document.createEvent('Event'); // IE 11
                event.initEvent(eventName, true, false);
            }
        } else {
            if (typeof(CustomEvent) === 'function') {
                event = new CustomEvent(eventName, { bubbles: true, detail: detail });
            } else {
                event = document.createEvent('CustomEvent');
                event.initCustomEvent(eventName, true, false, detail);
            }
        }
        element.dispatchEvent(event);

        // Execute JavaScript from <url-route onload="{js}">
        if (eventName === 'app:routeChanged' && app.activeController && app.activeController.settings && app.activeController.settings.onload) {
            evalElementJs(app.activeController.settings.onload, 'url-route', 'onload');
        }
    }

    /**
     * Download and run a DataFormsJS Framework plugin.
     * @param {string} name
     * @param {undefined|function} callback
     */
    function loadPlugin(name, callback) {
        // Run plugin if it's already loaded.
        if (app.plugins[name] !== undefined) {
            if (callback !== undefined) {
                callback();
            }
            app.plugins[name].reload();
            return;
        }

        // Download then Plugin
        var url = rootUrl + 'plugins/' + name + (useMinFiles ? '.min' : '') + '.js';
        app.loadScripts(url).then(function() {
            if (app.plugins[name] === undefined) {
                console.warn('Plugin [' + name + '] was loaded but not found. The script might still be loading in the DOM.');
                return;
            }
            if (callback !== undefined) {
                callback();
            }
            app.plugins[name].reload();
        });
    }

    /**
     * Handle DataFormsJS Framework Events
     */
    function defineCustomEvents() {
        app.controls['json-data'].onFetch = function(element, fromCache) {
            // Update the [app.activeModel] based downloaded data.
            if (app.activeController && app.activeController.modelName) {
                if (!fromCache) {
                    app.deepClone(app.activeModel, this);
                }
            } else {
                app.activeModel = this; // Non-SPA
            }

            // Define a `state` property on the element that contains the downloaded
            // element. This matches the behavior of the <json-data> Web Component
            // which allows for easy to use API. On key difference though is when
            // modifying state using the polyfill the main `app.activeModel` should
            // be updated instead as this is reset on each page view.
            element.state = this;

            // Update page content
            updateContent(element);
        };
    }

    /**
     * Convert routes under <url-router> to standard Framework routes
     * @param {HTMLElement} router
     */
    function defineRoutes(router) {
        // Private function related to routing setup
        function routerError(router, error) {
            dispatchEvent(router, 'app:error', error);
            dispatchEvent(router, 'app:routeChanged', {
                url: (app.activeController && app.activeController.path ? app.activeController.path : null),
                urlParams: app.activeParameterList,
            });
            app.showError(router, error);
            console.error(error);
        }

        // Get Router Type
        if (router.getAttribute('mode') === 'history') {
            // Required before `app.setup()` is called in order to use
            // History Routes (pushState, popstate)
            document.documentElement.setAttribute('data-routing-mode', 'history');
        }

        // Define and Validate App Settings based on Router
        app.settings.viewSelector = router.getAttribute('view-selector');
        app.settings.lazyTemplateSelector = router.getAttribute('loading-template-selector');
        if (app.settings.viewSelector === null) {
            routerError(router, 'Error, element <' + router.tagName.toLowerCase() + '> is missing attribute [view-selector]');
            return;
        }
        var view = document.querySelector(app.settings.viewSelector);
        if (view === null) {
            routerError(router, 'Error, element from <url-router view-selector="' + app.escapeHtml(app.settings.viewSelector) + '"> was not found on the page.');
            return;
        }

        // Define API events on the element that can be used by apps.
        // Full compatibility is not needed, rather functions can be added
        // if it's determined that they would be commonly called or useful.
        router.changeRoute = function(path) {
            app.changeRoute(path);
        };

        // Map items from [window.lazyLoad] to [app.lazyLoad] excluding items in
        // the format of `{module:url}` as they are intended only for modern browsers
        // and items in the format of `{nomodule:url}` will be added as strings.
        if (window.lazyLoad !== undefined) {
            for (var prop in window.lazyLoad) {
                if (window.lazyLoad.hasOwnProperty(prop)) {
                    var item = window.lazyLoad[prop];
                    if (Array.isArray(item) || typeof item === 'string') {
                        app.lazyLoad[prop] = item;
                    } else if (typeof item.nomodule === 'string') {
                        app.lazyLoad[prop] = item.nomodule;
                    } else if (typeof item.module !== 'string') {
                        console.error('Unhandled window.lazyLoad Script: ' + prop);
                    }
                }
            }
        }

        // Get all routes on the page and for each route add a controller object. When using the
        // standard DataFormsJS framework it converts <template|script data-route="path"> to
        // controllers. For the Web Components Polyfill <url-route> are used instead.
        var routes = router.querySelectorAll('url-route');
        var viewIndex = 0;
        Array.prototype.forEach.call(routes, function(route) {
            // Get route [path]
            var path = route.getAttribute('path');
            if (path === null) {
                routerError(router, 'Error, element <' + route.tagName.toLowerCase() + '> is missing attribute [path]');
                console.log(route);
                return;
            }

            // If default route then update app settings
            var isDefault = (route.getAttribute('default-route') !== null);
            if (isDefault) {
                app.settings.defaultRoute = path;
            }

            // Handle [redirect] routes
            var redirect = route.getAttribute('redirect');
            if (redirect !== null) {
                app.addController({
                    path: path,
                    onRendered: function() {
                        app.changeRoute(this.redirect);
                    },
                    settings: { redirect: redirect },
                });
                return;
            }

            // Get Template Source
            var viewUrl = route.getAttribute('src');
            var viewId;
            if (viewUrl === null || viewUrl === '') {
                viewUrl = undefined;
                var template = route.querySelector('template');
                if (template === null) {
                    app.showErrorAlert('Missing <template> or [src] attribute for route <' + route.tagName.toLowerCase() + ' path="' + path + '">.');
                    console.log(route);
                    return;
                }
                if (!template.id) {
                    template.id = 'url-route-template-' + viewIndex + '-' + (new Date()).getTime();
                    viewIndex++;
                }
                viewId = template.id;
            }

            // Map items from [lazy-load] and JS events.
            var settings = {
                lazyLoad: [],
                onload: route.getAttribute('onload'),
                onunload: route.getAttribute('onunload'),
            };
            var lazyLoad = route.getAttribute('lazy-load');
            if (lazyLoad !== null) {
                lazyLoad = lazyLoad.split(',').map(function(s) { return s.trim(); });
                settings.lazyLoad = lazyLoad.filter(function(item) {
                    return (app.lazyLoad[item] !== undefined);
                }).join(', ');
            }
            var noLazyLoad = (Object.keys(settings.lazyLoad).length === 0);
            if (noLazyLoad) { delete settings.lazyLoad; }
            if (settings.onload === null) { delete settings.onload; }
            if (settings.onunload === null) { delete settings.onunload; }

            // Convert core HTML 'data-*' attributes to a Controller Settings.
            // Example:
            //   'data-url' becomes 'settings.url'
            //   'data-i18n-file' becomes 'settings.i18nFile'
            var skipProps = ['route', 'page', 'model', 'src', 'engine'];
            for (var prop in route.dataset) {
                if (skipProps.indexOf(prop) === -1) {
                    var value = route.dataset[prop];
                    switch (value) {
                        case 'true':
                        case '': // Empty values default to `true`
                            settings[prop] = true;
                            break;
                        case 'false':
                            settings[prop] = false;
                            break;
                        case 'null':
                            settings[prop] = null;
                            break;
                        default:
                            settings[prop] = value;
                    }
                }
            }

            // Only keep settings if there is at least one prop
            if (Object.keys(settings).length === 0) {
                settings = undefined;
            }

            // Add Route as Framework Controller
            app.addController({
                path: path,
                viewId: viewId,
                viewUrl: viewUrl,
                viewEngine: 'Text',
                pageType: 'polyfillPage',
                settings: settings,
            });
        });

        // Setup the routes. When using the standard Framework this would be
        // called automatically from the ('DOMContentLoaded') event however it
        // needs to be called directly here after adding the routes/controllers.
        app.setup();
    }

    /**
     * Setup the page for non-SPA's
     */
    function noRoutingSetup() {
        app.activeModel = {};
        app.onUpdateViewComplete = function() {
            polyfillPage.onRendered();
        };
        app.updateView();
        app.cssVarsPonyfill();
    }

    /**
     * Basic script loading used once time to load the main framework file
     * [DataFormsJS.js]. After it's loaded `app.loadScript()` and `app.loadScripts()`
     * are used for additional script loading.
     *
     * @param {string} url
     * @param {function} callback
     */
    function loadScript(url, callback) {
        var script = document.createElement('script');
        script.onload = callback;
        script.onerror = function () {
            console.error('Error loading Script: ' + url);
            callback();
        };
        script.src = url;
        document.head.appendChild(script);
    }

    /**
     * Determine the root URL for loading DataFormsJS framework files.
     */
    function findRootUrl() {
        // Did the app set a custom value? If so use it.
        if (typeof window.dataformsjsUrl === 'string') {
            rootUrl = window.dataformsjsUrl;
            useMinFiles = (window.dataformsjsMinFiles !== false); // Defaults to `true` if not defined
            return;
        }

        // If minimized polyfill is being used then download minimized framework files,
        // otherwise if un-minimized files then download un-minimized framework files.
        var files = ['/web-components/polyfill.min.js', '/web-components/polyfill.js'];
        for (var n = 0; n < 2; n++) {
            var script = document.querySelector('script[src$="' + files[n] + '"]');
            var src;
            if (script) {
                src = script.getAttribute('src');
                rootUrl = src.substring(0, src.length - files[n].length + 1);
                useMinFiles = (n === 0);
                return;
            }
        }

        // Default if [dataformsjs] path cannot be determined.
        rootUrl = 'https://cdn.jsdelivr.net/npm/dataformsjs@latest/js/';
        useMinFiles = true;
    }

    /**
     * Once the Framework and needed Browser Polyfills are downloaded then
     * download needed Framework scripts and setup the app.
     */
    function loadPagePlugins() {
        // A number of additional scripts are downloaded that may or may not be used,
        // however in general the files are small. The "*.min.js" version of these files
        // is around 5 to 10 kB of size depending on gzip settings from the server.
        // It's likely most sites using this will use [json-data], [dataBind]. Additional
        // scripts such as [js/plugins/data-list.js, js/plugins/filter.js] are downloaded
        // later only if they are used by the app. All scripts here are downloaded
        // asynchronously so it's very quick.
        var promises = [
            app.loadScripts(rootUrl + 'controls/json-data' + (useMinFiles ? '.min' : '') + '.js'),
            app.loadScripts(rootUrl + 'extensions/format' + (useMinFiles ? '.min' : '') + '.js'),
            app.loadScripts(rootUrl + 'extensions/jsTemplate' + (useMinFiles ? '.min' : '') + '.js'),
            app.loadScripts(rootUrl + 'plugins/dataBind' + (useMinFiles ? '.min' : '') + '.js'),
        ];

        // Load [i18n] plugin if <i18n-service> exists on the page and
        // set needed HTML attributes on the root <html> element.
        var i18nService = document.querySelector('i18n-service');
        if (i18nService) {
            promises.push(app.loadScripts(rootUrl + 'plugins/i18n' + (useMinFiles ? '.min' : '') + '.js'));
            var attrMap = [
                { web: 'default-locale', plugin: 'data-i18n-default' },
                { web: 'file', plugin: 'data-i18n-file' },
                { web: 'locales', plugin: 'data-i18n-locales' },
                { web: 'file-dir', plugin: 'data-i18n-dir' },
            ];
            attrMap.forEach(function(attr) {
                var value = i18nService.getAttribute(attr.web);
                if (value) {
                    document.documentElement.setAttribute(attr.plugin, value);
                }
            });
            // Add common API function so it can be called by app code
            i18nService.updateContent = function(rootElement) {
                app.plugins.i18n.onRendered(rootElement);
            };
        }

        // Handle global script errors if the page uses <show-errors-service>.
        // This only has to be set once and must be set before `app.setup()` is called.
        if (document.querySelector('show-errors-service')) {
            document.documentElement.setAttribute('data-show-errors', '');
        }

        // Support API from <html-import-service> if it's defined on the page.
        // Note - the original Framework functions support an optional `model`
        // parameter however it's not included with Web Components so it doesn't
        // need to be defined as the Framework will handle it automatically.
        var importService = document.querySelector('html-import-service');
        if (importService) {
            importService.refreshAllHtmlControls = function (callback) {
                app.refreshAllHtmlControls(callback);
            };
            importService.refreshHtmlControl = function(control, callback) {
                app.refreshHtmlControl(control, callback);
            };
        }

        // Add API for additional Web Components
        var prismService = document.querySelector('prism-service');
        if (prismService) {
            app.loadScripts(rootUrl + 'plugins/prism' + (useMinFiles ? '.min' : '') + '.js');
            prismService.onLoad = function(rootElement) {
                app.plugins.prism.onRendered(rootElement);
            };
        }

        // After all scripts have been loaded the setup the app
        Promise.all(promises).finally(function () {
            // Setup DataFormsJS
            defineCustomEvents();
            app.addPlugin('oldBrowserWarning', oldBrowserWarning);
            var router = document.querySelector('url-router');
            if (router === null) {
                noRoutingSetup();
            } else {
                app.addPage('polyfillPage', polyfillPage); // Used by all SPA routes
                defineRoutes(router);
            }
        });
    }

    /**
     * Setup the app when the page is ready
     */
    document.addEventListener('DOMContentLoaded', function() {
        // Check if DataFormsJS Web Components are already defined on the page
        // and if they are then exit with a console warning.
        //
        // This can happen if using Web Components with <script src="polyfill.js">
        // instead of <script nomodule src="polyfill.js">.
        //
        // Old Versions of Safari (10.#) have a bug where both <script type="module">
        // and <script nomodule> will be loaded. Additionally the issue can affect
        // legacy Edge browsers as well.
        //
        // This does not check all DataFormsJS Web Components; rather it should
        // handle the majority of apps that use DataFormsJS Web Components.
        // Basically most apps are expected to use on of <url-router> or <json-data>
        // and if a page had only <table is="sortable-table"> then the Web Component
        // and polyfill would run at the same time resulting in unpredictable sorting.
        //
        // Related Links:
        //   https://caniuse.com/es6-module
        //   https://gist.github.com/jakub-g/5fc11af85a061ca29cc84892f1059fec
        //   https://jakearchibald.com/2017/es-modules-in-browsers/
        //   https://gist.github.com/samthor/64b114e4a4f539915a95b91ffd340acc
        //
        if (window.customElements && (window.customElements.get('url-router') || window.customElements.get('json-data') || window.customElements.get('sortable-table'))) {
            console.warn('It appears that both DataFormsJS Web Components and [polyfill.js] are loaded. Because of this [polyfill.js] will not run.');
            return;
        }

        // Define a global variable so apps can check if this file is being used.
        window.usingWebComponentsPolyfill = true;

        // Handle already loaded plugins from [jsPlugins.js] and if defined
        // remove the exiting `window.app` object. An example of this exists
        // in [examples/log-table-web.htm].
        var plugins = null;
        if (window.app !== undefined && typeof window.app.plugins === 'object' && window.DataFormsJS === undefined) {
            plugins = window.app.plugins;
            delete window.app;
        }

        // Download the DataFormsJS Framework main file
        findRootUrl();
        var url = rootUrl + 'DataFormsJS' + (useMinFiles ? '.min' : '') + '.js';
        loadScript(url, function () {
            app.viewEngine('Text');
            app.loadCss(polyfillStyleId, polyfillStyleCss);

            // If [jsPlugins.js] is used then add back the plugins
            if (plugins !== null) {
                for (var name in plugins) {
                    if (plugins.hasOwnProperty(name)) {
                        app.addPlugin(name, plugins[name]);
                    }
                }
            }

            // Polyfill Logic that normally happens from DataFormsJS 'DOMContentLoaded' event
            var condition = (Array.from && window.Promise && window.fetch && Promise.prototype.finally ? true : false);
            app.loadScript(condition, app.settings.polyfillUrl, loadPagePlugins);
        });
    });
})();

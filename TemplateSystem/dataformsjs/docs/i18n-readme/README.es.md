
<p align="center">
	<img src="https://raw.githubusercontent.com/dataformsjs/static-files/master/img/logo/DataFormsJS-144px.png">
</p>

# 🌟 ¡Bienvenido a DataFormsJS!

**¡Gracias por su visita!** 🌠👍

DataFormsJS es un nuevo marco de JavaScript y componentes independientes de reacción y web. A tiny browser-based [JSX Compiler](https://github.com/dataformsjs/dataformsjs/blob/master/docs/jsx-loader.md) is also included as part of this Framework. DataFormsJS es de tamaño pequeño, fácil de aprender, diseñado para un desarrollo rápido y para ofrecer una gran experiencia tanto para desarrolladores como para usuarios finales. DataFormsJS se publicó por primera vez en noviembre de 2019 y se escribió y utilizó durante muchos años antes de su lanzamiento. A partir de 2024, se ha utilizado en una variedad de aplicaciones y sitios web, es extremadamente estable y contiene muchas pruebas unitarias.

Este repositorio contiene el Marco de DataFormsJS, Páginas de ejemplo y Pruebas unitarias. El sitio web principal existe en otro repositorio.

## 💫 ¿Por qué usar DataFormsJS?

|<img src="https://raw.githubusercontent.com/dataformsjs/website/master/public/img/icons/fast.svg" alt="Desarrollo mas rapido" width="60">|<img src="https://raw.githubusercontent.com/dataformsjs/website/master/public/img/icons/small-size.svg" alt="Talla pequeña" width="60">|<img src="https://raw.githubusercontent.com/dataformsjs/website/master/public/img/icons/light-switch.svg" alt="Fácil de aprender" width="60">|
|---|---|---|
|**Desarrollo mas rapido** Visualice datos de los servicios web y GraphQL usando solo HTML Markup y defina las características de la aplicación y del sitio usando los atributos HTML.|**Talla pequeña** Todos los archivos son pequeños y se descargan solo cuando se usan, lo que permite un mayor rendimiento y un sitio más pequeño.|**Fácil de aprender** DataFormsJS está construido en torno a HTML, CSS, JavaScript, Templating y tiene una API mínima de JavaScript y HTML para que pueda comenzar de inmediato.|

|<img src="https://raw.githubusercontent.com/dataformsjs/website/master/public/img/icons/column.svg" alt="Estabilidad" width="60">|<img src="https://raw.githubusercontent.com/dataformsjs/website/master/public/img/icons/water.svg" alt="Flexibilidad" width="60">|<img src="https://raw.githubusercontent.com/dataformsjs/website/master/public/img/icons/star.svg" alt="Mejores sitios" width="60">|
|---|---|---|
|**Estabilidad** Diseñado para uso a largo plazo; un sitio desarrollado con DataFormsJS hoy funcionará muy bien y será fácil de mantener en décadas.|**Flexibilidad** Funciona bien con otro código y la API está diseñada para ofrecer flexibilidad y características personalizadas. Si puede pensarlo, puede construirlo con DataFormsJS.|**Mejores sitios** DataFormsJS está diseñado para ser una gran experiencia tanto para desarrolladores como para usuarios finales, permitiéndole crear mejores sitios.|

|¡Funciona con|<img src="https://raw.githubusercontent.com/dataformsjs/website/master/public/img/logos/react.svg" alt="React" width="64"><div>React</div>|<img src="https://raw.githubusercontent.com/dataformsjs/website/master/public/img/logos/vue.svg" alt="Vue" width="64"><div>Vue</div>|<img src="https://raw.githubusercontent.com/dataformsjs/website/master/public/img/logos/handlebars.png" alt="Handlebars" width="64"><div>Handlebars</div>|<img src="https://raw.githubusercontent.com/dataformsjs/website/master/public/img/logos/graphql.svg" alt="GraphQL" width="64"><div>GraphQL</div>|<img src="https://raw.githubusercontent.com/dataformsjs/website/master/public/img/logos/preact.svg" alt="Preact" width="64"><div>Preact</div>|y más!|
|---|---|---|---|---|---|---|

|¡Aprende algo nuevo!|<div><img src="https://raw.githubusercontent.com/dataformsjs/website/master/public/img/logos/web-components.svg" alt="Web Components" width="64"></div><div>Web Components</div>|
|---|---|

## 🚀 Empezando

**Comenzar con DataFormsJS es extremadamente fácil.**

Instale desde **npm**, esta opción funciona muy bien si está utilizando `create-react-app` o desea una copia de todos los archivos localmente:
```
npm install dataformsjs
```

**Descargue este repositorio**. Es pequeño para descargar porque este repositorio no tiene dependencias y carga HandlebarsJS, Vue y React desde un CDN. Para ver páginas de ejemplo, debe instalarse Node y luego puede iniciar el servidor local usando:
```
npm start
```

The start screen allows you to quickly filter and view many different examples and resources.

<p align="center">
<img src="https://raw.githubusercontent.com/dataformsjs/static-files/master/img/screenshots/dataformsjs-start-page.png" alt="DataFormsJS npm start page">
</p>

Los archivos JavaScript para el Framework y React y Web Components independientes existen en el directorio `js`. Estructura completa del directorio:

```
dataformsjs
├── docs
├── examples
│   ├── *.htm
│   └── server.js
└── js
│   ├── DataFormsJS.js
│   ├── react\*.js
│   ├── web-components\*.js
│   └── *\*.js
├── scripts\*.js
├── server\app.js
└── test
    ├── *.htm
    └── server.js
```

**Desarrolle en línea** utilizando el código de juegos: https://www.dataformsjs.com/es/playground

<p align="center">
<img src="https://raw.githubusercontent.com/dataformsjs/static-files/master/img/screenshots/Playground.png" alt="Code Playground">
</p>

**Descargar un archivo de plantilla** Descargue un archivo de plantilla usando scripts de un CDN: https://www.dataformsjs.com/es/getting-started

<p align="center">
<img src="https://raw.githubusercontent.com/dataformsjs/static-files/master/img/screenshots/Getting-Started-Templates.png" alt="Plantillas de inicio">
</p>

## 📄 Example Code

Este ejemplo usa Vue para crear plantillas. Si lo guarda con un editor de texto, puede verlo localmente en su navegador. Además, el sitio principal contiene muchas plantillas y ejemplos. DataFormsJS funciona con Vue 2 y Vue 3.

```html
<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Ejemplo de DataFormsJS usando Vue</title>
    </head>
    <body>
        <header>
            <nav>
                <a href="#/">Casa</a>
                <a href="#/data">Ejemplo de datos</a>
            </nav>
        </header>

        <main id="view"></main>

        <template data-route="/">
            <h1>Hola Mundo!</h1>
        </template>

        <template id="loading-screen">
            <h3>Cargando...</h3>
        </template>

        <script
            type="text/x-template"
            data-engine="vue"
            data-route="/data"
            data-page="jsonData"
            data-url="https://www.dataformsjs.com/data/geonames/countries"
            data-load-only-once
            data-lazy-load="jsonData, flags"
            data-countries>

            <h3 v-if="isLoading" class="loading">Cargando...</h3>
            <h3 v-if="hasError" class="error">{{ errorMessage }}</h3>
            <div v-if="isLoaded">
                <h1>Países</h1>
                <ul>
                    <li v-for="country in countries">
                        <i v-bind:class="country.iso.toLowerCase() + ' flag'"></i>
                        <span>{{ country.country }}<span>
                    </li>
                </ul>
            </div>
        </script>

        <!-- Vue 2 -->
        <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.min.js"></script>

        <!-- Vue 3 -->
        <!-- <script src="https://cdn.jsdelivr.net/npm/vue@3.2.30/dist/vue.global.prod.js"></script> -->

        <!-- DataFormsJS -->
        <script src="https://cdn.jsdelivr.net/npm/dataformsjs@latest/js/DataFormsJS.min.js"></script>
        <script>
            app.lazyLoad = {
                jsonData: 'https://cdn.jsdelivr.net/npm/dataformsjs@latest/js/pages/jsonData.min.js',
                flags: 'https://cdn.jsdelivr.net/npm/semantic-ui-flag@2.4.0/flag.min.css',
            };
            app.settings.lazyTemplateSelector = '#loading-screen';
        </script>
    </body>
</html>
```

This example uses React with the `jsxLoader.min.js` script for converting JSX to JS directly it the browser and it includes DataFormsJS React Components from `DataFormsJS.min.js`. If you copy the contents of this code it will also work in a browser. All React Components are also compatible with Preact when using jsxLoader.

```html
<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>DataFormsJS Example using React</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/semantic-ui-flag@2.4.0/flag.min.css">
    </head>
    <body>
        <div id="root"></div>

        <script type="text/babel">
            function ShowLoading() {
                return <div className="loading">Loading...</div>;
            }

            function ShowError(props) {
                return <div className="error">{props.error}</div>;
            }

            function ShowCountries(props) {
                return (
                    <React.Fragment>
                        <h1>Countries</h1>
                        <ul>
                            {props.data && props.data.countries && props.data.countries.map(country => {
                                return (
                                    <li key={country.iso}>
                                        <i className={country.iso.toLowerCase() + ' flag'}></i>
                                        <span>{country.country}</span>
                                    </li>
                                )
                            })}
                        </ul>
                    </React.Fragment>
                )
            }

            class App extends React.Component {
                render() {
                    return (
                        <ErrorBoundary>
                            <JsonData
                                url="https://www.dataformsjs.com/data/geonames/countries"
                                isLoading={<ShowLoading />}
                                hasError={<ShowError />}
                                isLoaded={<ShowCountries />}
                                loadOnlyOnce={true} />
                        </ErrorBoundary>
                    )
                }
            }

            ReactDOM.render(
                <App />,
                document.getElementById('root')
            );
        </script>

        <script crossorigin="anonymous" src="https://cdn.jsdelivr.net/npm/react@17.0.2/umd/react.production.min.js"></script>
        <script crossorigin="anonymous" src="https://cdn.jsdelivr.net/npm/react-dom@17.0.2/umd/react-dom.production.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/dataformsjs@latest/js/react/jsxLoader.min.js"></script>
        <script type="module" src="https://cdn.jsdelivr.net/npm/dataformsjs@latest/js/react/es6/DataFormsJS.min.js"></script>
        <script nomodule src="https://cdn.jsdelivr.net/npm/dataformsjs@latest/js/react/es5/DataFormsJS.min.js"></script>
    </body>
</html>
```

When working with node or webpack you will typically import Libraries using an `import` statement:

```js
// Use React Hooks
import React, { useState, useReducer } from 'react';

// Use React Router
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from "react-router-dom";

// Use Redux
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux';

// Import Individual DataFormsJS React Components
import JsonData from 'dataformsjs/js/react/es6/JsonData';
import LazyLoad from 'dataformsjs/js/react/es6/LazyLoad';
import Format from 'dataformsjs/js/react/es6/Format';
import ErrorBoundary from 'dataformsjs/js/react/es6/ErrorBoundary';
// [Cache, CssVars, I18n, ImageGallery, InputFilter, LeafletMap, Markdown, SortableTable]
```

When working with the `jsxLoader` and compiling JSX directly in a browser the recommend method for importing is to simply reference the global classes or functions of the libraries that you need for your app:

```js
// Use React Hooks
const useState = React.useState;
const useReducer = React.useReducer;

// Use React Router
const Router = ReactRouterDOM.HashRouter;
const Route = ReactRouterDOM.Route;
const NavLink = ReactRouterDOM.NavLink;
const Link = ReactRouterDOM.Link;

// Use Redux
const Provider = ReactRedux.Provider;
const connect = ReactRedux.connect;
const createStore = Redux.createStore;
```

Many examples exist for popular React Libraries using `jsxLoader` at the following site:

https://awesome-web-react.js.org/

<p align="center">
	<a href="https://awesome-web-react.js.org/"><img width="312" height="350" src="https://raw.githubusercontent.com/dataformsjs/awesome-web-react/master/img/awesome-web-react.svg" alt="Awesome Web React"></a>
</p>

This example uses DataFormsJS Web Components. Web Components are well defined standard and provide for functionally similar to JavaScript Frameworks while using less JavaScript code.

```html
<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>DataFormsJS Example using Web Components</title>
    </head>
    <body>
        <header>
            <nav>
                <a href="#/">Home</a>
                <a href="#/data">Data Example</a>
            </nav>
        </header>

        <main id="view"></main>

        <template id="loading-screen">
            <h2>Loading...</h2>
        </template>

        <!--
            <url-router> and <url-route> will be used to define #hash routes
        -->
        <url-router view-selector="#view" loading-template-selector="#loading-screen">
            <!-- Home Page -->
            <url-route path="/">
                <template>
                    <h1>Hello World!</h1>
                </template>
            </url-route>

            <!--
                Display a list of Countries from a JSON Service. Elements
                with [data-bind] are populated with data from the Web Service.

                [lazy-load] is used along with `window.lazyLoad` near the bottom
                of this file to dynamically load scripts only if they will be used.
            -->
            <url-route path="/data" lazy-load="json_data, data_list, flags">
                <template>
                    <json-data url="https://www.dataformsjs.com/data/geonames/countries">
                        <is-loading>
                            <div>Loading...</div>
                        </is-loading>
                        <has-error>
                            <div data-bind="errorMessage"></div>
                        </has-error>
                        <is-loaded>
                            <data-list
                                data-bind="countries"
                                template-selector="#country"
                                root-element="ul">
                            </data-list>
                        </is-loaded>
                    </json-data>
                </template>
            </url-route>
        </url-router>

        <!--
            Template for <data-list> using Template literals (Template strings)
        -->
        <template id="country">
            <li>
                <i class="${iso.toLowerCase() + ' flag'}"></i>
                <span>${country}<span>
            </li>
        </template>

        <!-- DataFormsJS Web Components -->
        <script type="module" src="https://cdn.jsdelivr.net/npm/dataformsjs@latest/js/web-components/url-router.min.js"></script>
        <script nomodule src="https://cdn.jsdelivr.net/npm/dataformsjs@latest/js/web-components/polyfill.min.js"></script>
        <script>
            window.lazyLoad = {
                json_data: { module: 'https://cdn.jsdelivr.net/npm/dataformsjs@latest/js/web-components/json-data.min.js' },
                data_list: { module: 'https://cdn.jsdelivr.net/npm/dataformsjs@latest/js/web-components/data-list.min.js' },
                flags: 'https://cdn.jsdelivr.net/npm/semantic-ui-flag@2.4.0/flag.min.css',
            };
        </script>
    </body>
</html>
```

## 🤝 Contribuyendo

**Todas las contribuciones son bienvenidas.** Para cambios importantes, incluidos los cambios de última hora en el código existente o la actualización de gráficos y archivos existentes, abra primero un problema para analizar qué le gustaría cambiar. Algunos ejemplos de artículos para contribuir:

* Errores tipográficos y gramaticales: si ve alguno, corríjalo y envíelo.
* Documentación y Tutoriales. Actualmente, la mayoría de la documentación se encuentra en la sección de referencia rápida y en los comentarios de código, por lo que se necesitará mucha documentación y se escribirá con el tiempo.
* Se desarrollarán muchos más ejemplos en el futuro. Si tiene ideas, envíelas.
* Pruebas de unidad y métodos de prueba adicionales: los archivos y las características de Core Framework se prueban por unidad; sin embargo, cada línea de código debe probarse por unidad en todos los archivos. Actualmente no hay pruebas unitarias para Vue, React y componentes web.
* Scripts adicionales, componentes de reacción, componentes web y características.
* Nuevas ideas: si tiene ideas sobre cómo mejorar, abra un tema para discutir.

El archivo [docs/to-do-list.txt](https://github.com/dataformsjs/dataformsjs/blob/master/docs/to-do-list.txt) contiene la lista completa de elementos que están actualmente pendientes y es un buen lugar para comenzar.

## ❓ Preguntas más frecuentes

**¿Por qué se creó DataFormsJS?**

El desarrollo inicial y el uso de DataFormsJS ocurrieron en privado en 2013 para permitir el desarrollo rápido de aplicaciones de una sola página (SPA) de alta calidad y libres de errores. DataFormsJS fue diseñado para tener un tamaño pequeño, un gran rendimiento y ser mucho más rápido para el desarrollo en comparación con otros Frameworks. Algunas de las razones para un desarrollo rápido incluyen mostrar servicios JSON usando solo marcado y plantilla ((Handlebars, Underscore, etc.) y definir características de aplicaciones y sitios usando atributos HTML y pequeños complementos de JavaScript.

Las primeras versiones de DataFormsJS se utilizaron en varias compañías en diferentes tipos de aplicaciones.

Ahora que tanto React como Vue se han vuelto muy populares, se han desarrollado componentes React separados para ayudar con React Development y el marco se ha ampliado para admitir Vue. Además, se han desarrollado componentes web separados para permitir una funcionalidad similar en los navegadores modernos sin utilizar un marco de JavaScript.

**¿Por qué tardó tanto en salir?**

El autor de DataFormsJS tenía varios trabajos ocupados en ese momento y también estaba trabajando en otro gran proyecto al mismo tiempo [FastSitePHP](https://www.fastsitephp.com/es/).

**How large is DataFormsJS?**

_Todos los tamaños se basan en scripts minificados y compresión gzip del servidor web. The file size can vary slightly between different browsers and CDNs - for example the Framework is 12.1 kB in Safari and 12.5 kB in Chrome._

* **DataFormsJS Framework – 12.5 kB** (157 kB versión completa sin comprimir)
* Los archivos adicionales (controladores, complementos, etc.) suelen tener solo 1-3 kB cada uno.
* En general, cuando use el Framework, espere aproximadamente 15 kB para la carga inicial de la página, y luego varios kB para páginas adicionales que carguen complementos, páginas, controladores, etc.

* **React JSX Loader – 6.6 kB** (91 kB versión completa sin comprimir)
* **React (todos los componentes en JavaScript) – 5.7 kB**
* Los componentes de reacción individuales tienen entre 3 y 12 kB cuando no están comprimidos e incluyen comentarios.
* **Los componentes web generalmente tienen entre 1 y 3 kB cada uno**, por lo general, utilizará una serie de componentes, por lo que en las aplicaciones de ejemplo, esto suma aproximadamente 15 kB para cada aplicación.

Si bien el marco DataFormsJS es pequeño, generalmente se utilizará con un motor de visualización o plantilla más grande:

* React: ~ 40 kB
* Handlebars: ~ 22 kB
* Vue 2: ~ 33 kB
* Vue 3: ~ 40 kB
* Underscore: ~ 6 kB
* Nunjucks - ~ 25 kB

Además, en un sitio complejo o grande, se espera que el código de terceros represente la mayor cantidad de JavaScript. Por ejemplo, CodeMirror Text Editor usado en el sitio Playground tiene alrededor de 250 kB, sin embargo DataFormsJS tiene la capacidad de descargar solo código de terceros cuando sea necesario.

**How do I use the JSX Loader for React?**

See the main document: https://github.com/dataformsjs/dataformsjs/blob/master/docs/jsx-loader.md

**¿Cuáles son los planes futuros para DataFormsJS?**

DataFormsJS está aquí a largo plazo y se desarrollará indefinidamente con nuevas características, componentes, ejemplos, documentos, etc. Si bien DataFormsJS es un Framework, también incluye componentes web independientes que se pueden usar sin el Framework. Con el tiempo, se desarrollarán muchos complementos y componentes web adicionales.

DataFormsJS continuará desarrollándose de una manera que permita el desarrollo basado en la web (por ejemplo: el sitio de juegos) y se mantendrá en tamaño pequeño cargando scripts solo cuando sea necesario.

**What does the logo represent and where is the source?**

<img src="https://raw.githubusercontent.com/dataformsjs/website/master/public/img/DataFormsJS.svg" alt="DataFormsJS" width="64" height="64">

The main DataFormsJS logo is a drawing of a hash symbol in a URL and it uses colors from the main DataFormsJS website. The logo was chosen because the DataFormsJS Framework was originally created for Single Page Applications (SPA).

* DataFormsJS SVG: https://github.com/dataformsjs/website/blob/master/public/img/DataFormsJS.svg
* DataFormsJS Logo Various Sites and Formats: https://github.com/dataformsjs/static-files/tree/master/img/logo
* The DataFormsJS logos is dual licensed under both **MIT License** and <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" style="font-weight:bold;">Creative Commons Attribution 4.0 International License</a>.
* Feel free to copy the logo as needed if publishing anything that references DataFormsJS.

## 📝 Licencia

Este proyecto está licenciado bajo la **MIT License** - vea el archivo [LICENSE](LICENSE) para más detalles.

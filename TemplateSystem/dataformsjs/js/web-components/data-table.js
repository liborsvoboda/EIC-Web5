/**
 * DataFormsJS <data-table> Web Component
 *
 * This component renders a standard <table> after [value] is set from JavaScript
 * with an array of objects. This component works with the <json-data> to display
 * data once it is downloaded.
 */

/* Validates with both [jshint] and [eslint] */
/* For online eslint - Source Type = 'module' must be manually selected. */
/* jshint esversion:8 */
/* jshint evil:true */
/* eslint-env browser, es6 */
/* eslint quotes: ["error", "single", { "avoidEscape": true }] */
/* eslint spaced-comment: ["error", "always"] */
/* eslint-disable no-console */

import {
    render,
    buildUrl,
    polyfillCustomElements
} from './utils.js';
import { Format } from './utils-format.js';

/**
 * Shadow DOM for Custom Elements
 */
const shadowTmpl = document.createElement('template');
shadowTmpl.innerHTML = `
    <style>
        :host { display: block; }
        :host([hidden]) { display: none; }
    </style>
    <slot></slot>
`;

function toggleHighlight(e) {
    const nodeName = e.target.nodeName;
    if (nodeName === 'A' || nodeName === 'INPUT' || nodeName === 'SELECT' || nodeName === 'TEXTAREA' || nodeName === 'BUTTON') {
        return;
    }
    this.classList.toggle('highlight');
}

class DataTable extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(shadowTmpl.content.cloneNode(true));
        this.state = {
            list: null,
            hasBeenLoaded: false,
        };
    }

    static get observedAttributes() {
        return ['col-link-template', 'col-link-fields', 'col-class', 'columns', 'labels', 'table-attr', 'highlight-class'];
    }

    attributeChangedCallback(attr, oldVal /* , newVal */) {
        switch (attr) {
            case 'col-link-template':
            case 'col-link-fields':
            case 'col-class':
            case 'columns':
            case 'labels':
            case 'table-attr':
            case 'highlight-class':
            case 'empty-data-text':
                if (oldVal !== null || this.state.hasBeenLoaded) {
                    this.renderTable();
                }
                break;
        }
    }

    get value() {
        return this.state.list;
    }

    set value(list) {
        this.state.list = list;
        this.renderTable();
    }

    get errorClass() {
        return this.getAttribute('error-class');
    }

    get defaultErrorStyle() {
        return 'color:white; background-color:red; padding:0.5rem 1rem; margin:.5rem;';
    }

    get emptyDataText() {
        const value = this.getAttribute('empty-data-text');
        return (value === null ? 'No records found' : value);
    }

    getTemplate() {
        let template = this.querySelector('template:not([data-footer])');
        if (template === null) {
            template = this.querySelector('script[type="text/x-template"]:not([data-footer])');
        }
        return template;
    }

    getFooterTemplate() {
        let template = this.querySelector('template[data-footer]');
        if (template === null) {
            template = this.querySelector('script[type="text/x-template"][data-footer]');
        }
        return template;
    }

    removeTable() {
        // If there is no template than it's safe to clear all content
        if (this.getTemplate() === null && this.getFooterTemplate() === null) {
            this.innerHTML = '';
            return;
        }

        // <template> exists so simply remove <table> from the DOM
        const table = this.querySelector('table');
        if (table !== null) {
            table.parentNode.removeChild(table);
        }
    }

    renderTable() {
        // Ignore if [value] has not yet been set
        const list = this.state.list;
        if (list === null || list === '') {
            this.removeTable();
            return;
        }

        // Allow attribute changes after first render
        this.state.hasBeenLoaded = true;

        // Is there a template to use for each row?
        const template = this.getTemplate();
        const footerTemplate = this.getFooterTemplate();

        // Private functions in this scope to add the table and show errors
        const addTable = (html) => {
            if (template === null && footerTemplate === null) {
                this.innerHTML = html;
            } else {
                this.removeTable();
                this.insertAdjacentHTML('beforeend', html);
            }
        };

        const showError = (errorMessage) => {
            const errorClass = this.errorClass;
            if (errorClass) {
                addTable(render`<table class="${this.errorClass}"><caption>Error Rendering Template - ${errorMessage}</caption></table>`);
            } else {
                addTable(render`<table><caption style="display:block; ${this.defaultErrorStyle}">Error Rendering Template - ${errorMessage}</caption></table>`);
            }
        };

        // Show "no-data" table and default "No records found" text if empty
        if (Array.isArray(list) && list.length === 0) {
            addTable(render`<table class="no-data"><caption style="display:block;">${this.emptyDataText}</caption></table>`);
            return;
        }

        // Validate data type
        let isValid = true;
        if (!Array.isArray(list)) {
            isValid = false;
        } else if (list.length > 0 && typeof list[0] !== 'object') {
            isValid = false;
        }
        if (!isValid) {
            showError('Error invalid data type for <data-table>, an array of objects is required.');
            return;
        }

        // Get Columns - Either User Defined or from the first Record
        const userCols = this.getAttribute('columns');
        const columns = (userCols ? userCols.split(',').map(s => s.trim()) : Object.keys(list[0]));

        // Get Custom Labels/Titles to Display or use Field Names
        let labels = columns;
        let userLabels = this.getAttribute('labels');
        if (userLabels) {
            labels = userLabels.split(',').map(s => s.trim());
            // If there is a mismatch between defined columns
            // and labels then switch to using columns.
            if ((labels.length !== columns.length) && template === null) {
                labels = columns;
            }
        }

        // Table Header
        let tableHtml = '<table';
        let tableAttr = this.getAttribute('table-attr');
        if (tableAttr) {
            tableAttr = tableAttr.split(',').map(s => s.trim());
            for (const attr of tableAttr) {
                const pos = attr.indexOf('=');
                if (pos > 1) {
                    const name = attr.substring(0, pos).trim();
                    const value = attr.substring(pos+1).trim();
                    tableHtml += render` ${name}="${value}"`;
                } else {
                    tableHtml += render` ${attr}`;
                }
            }
        }
        const colClass = this.getAttribute('col-class');
        const html = [];
        html.push(`${tableHtml}><thead><tr>`);
        if (colClass) {
            const classList = colClass.split(',').map(s => s.trim());
            const classIndex = {};
            for (const item of classList) {
                const pos = item.indexOf('=');
                if (pos > 0) {
                    const col = item.substring(0, pos);
                    const className = item.substring(pos+1);
                    classIndex[col] = className;
                }
            }
            for (let n = 0, m = labels.length; n < m; n++) {
                const label = labels[n];
                let className;
                if (classIndex[n.toString()] !== undefined) {
                    className = classIndex[n.toString()];
                } else if (classIndex[label] !== undefined) {
                    className = classIndex[label];
                }
                if (className) {
                    html.push(render`<th class="${className}">${label}</th>`);
                } else {
                    html.push(render`<th>${label}</th>`);
                }
            }
        } else {
            for (const label of labels) {
                html.push(render`<th>${label}</th>`);
            }
        }
        html.push('</tr></thead>');

        // Table Body
        html.push('<tbody>');
        if (template) {
            // Render each item in the template. A new function is dynamically created that simply
            // renders the contents of the template as a JavaScript template literal (template string).
            // The Tagged Template Literal function `render()` from [utils.js] is used to safely escape
            // the variables for HTML encoding. The variable `index` is made available to the template
            // and it can be safely overwritten by the list item due to variable scoping during rendering.
            try {
                // By default variables for the list item are scoped using `with`. If [row-item-name]
                // is used then the template can refer to each list item object by a variable name.
                const rowItemName = this.getAttribute('row-item-name');
                let tmpl;
                if (rowItemName) {
                    tmpl = new Function(rowItemName, 'index', 'render', 'format', 'return render`' + template.innerHTML + '`');
                } else {
                    tmpl = new Function('item', 'index', 'render', 'format', 'with(item){return render`' + template.innerHTML + '`}');
                }
                let index = 0;
                const format = new Format();
                for (const item of list) {
                    try {
                        html.push(tmpl(item, index, render, format));
                    } catch (e) {
                        const errorClass = this.errorClass;
                        if (errorClass) {
                            html.push(render`<tr class="${this.errorClass}">`);
                        } else {
                            html.push(render`<tr style="${this.defaultErrorStyle}">`);
                        }
                        html.push(render`<td colspan="${columns.length}">Item Error - ${e.message}</td></tr>`);
                    }
                    index++;
                }
            } catch (e) {
                showError('Error Rendering Template - ' + e.message);
                return;
            }
        } else {
            // Will the table use a link template?
            const linkTmpl = this.getAttribute('col-link-template');
            let linkFields = this.getAttribute('col-link-fields');
            if (linkTmpl) {
                if (linkFields) {
                    linkFields = linkFields.split(',').map(s => s.trim());
                } else {
                    linkFields = [columns[0]];
                }
            }

            // Build basic table
            for (const item of list) {
                const row = [];
                row.push('<tr>');
                for (const column of columns) {
                    if (linkTmpl && linkFields.includes(column)) {
                        row.push(render`<td>
                            <a href="${buildUrl(linkTmpl, item)}">${item[column]}</a>
                        </td>`);
                    } else {
                        row.push(render`<td>${item[column]}</td>`);
                    }
                }
                row.push('</tr>');
                html.push(row.join(''));
            }
        }
        // Footer Template
        if (footerTemplate) {
            html.push('<tfoot>');
            const numValues = (field) => {
                const values = [];
                for (const item of list) {
                    let value = item[field];
                    switch (typeof value) {
                        case 'number':
                            values.push(value);
                            break;
                        case 'string':
                            value = parseFloat(value);
                            if (!isNaN(value)) {
                                values.push(value);
                            }
                    }
                }
                return values;
            };
            const sum = (field) => {
                return numValues(field).reduce((a, b) => a + b, 0);
            };
            const avg = (field) => {
                const values = numValues(field);
                return values.reduce((a, b) => a + b, 0) / values.length;
            };
            const max = (field) => {
                return Math.max.apply(null, numValues(field));
            };
            const min = (field) => {
                return Math.min.apply(null, numValues(field));
            };
            const count = () => { return list.length; };
            try {
                const tmpl = new Function('render', 'format', 'sum', 'avg', 'max', 'min', 'count', 'return render`' + footerTemplate.innerHTML + '`');
                const format = new Format();
                try {
                    html.push(tmpl(render, format, sum, avg, max, min, count));
                } catch (e) {
                    const errorClass = this.errorClass;
                    if (errorClass) {
                        html.push(render`<tr class="${this.errorClass}">`);
                    } else {
                        html.push(render`<tr style="${this.defaultErrorStyle}">`);
                    }
                    html.push(render`<td colspan="${columns.length}">Footer Error - ${e.message}</td></tr>`);
                }
            } catch (e) {
                showError('Error Rendering Footer Template - ' + e.message);
                return;
            }
            html.push('</tfoot>');
        }
        html.push('</tbody></table>');
        addTable(html.join(''));

        // Allow user to highlight rows by clicking on them?
        // This allows a user to easily see where they are on wide rows or mobile devices.
        // Based on DataFormJS [clickToHighlight] Plugin: [js/plugins/clickToHighlight.js]
        const highlightClass = this.getAttribute('highlight-class');
        if (highlightClass) {
            const rows = this.querySelectorAll('tbody tr');
            for (const row of rows) {
                row.style.cursor = 'pointer';
                row.addEventListener('click', toggleHighlight);
            }
        }

        // Update table or elements such as <table is="sortable-table"> if needed
        polyfillCustomElements(this);
    }
}

window.customElements.define('data-table', DataTable);

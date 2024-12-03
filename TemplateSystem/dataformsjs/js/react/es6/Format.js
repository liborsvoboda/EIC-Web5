/**
 * This is a standard JavaScript class which is intended for use
 * with the React Components to provide an easy to use API for
 * formatting Numbers, Dates, Times, etc.
 *
 * Example:
 *     const format = new Format();
 *     {format.number(country.area_km)}
 *     {format.date(region.modification_date)}
 *
 * API:
 *     format.number(value)
 *     format.round(value, decimalPlaces?)
 *     format.currency(value, currencyCode)
 *     format.percent(value, decimalPlaces?)
 *         format.percent(0.2767) = '28%'
 *         format.percent(0.27) = '27%'
 *         format.percent(0.2767, 2) = '27.67%'
 *     format.date(value)
 *     format.dateTime(value)
 *     format.time(value)
 */

/* Validates with both [jshint] and [eslint] */
/* For online eslint - Source Type = 'module' must be manually selected. */
/* jshint esversion:6 */
/* eslint-env browser, es6 */
/* eslint quotes: ["error", "single", { "avoidEscape": true }] */
/* eslint spaced-comment: ["error", "always"] */
/* eslint-disable no-console */

export default class Format {
    number(value) {
        return this.formatNumber(value, {});
    }

    round(value, decimalPlaces=0) {
        const intlOptions = {
            style: 'decimal',
            maximumFractionDigits: decimalPlaces,
            minimumFractionDigits: decimalPlaces,
        };
        return this.formatNumber(value, intlOptions);
    }

    currency(value, currencyCode) {
        const intlOptions = { style: 'currency', currency: currencyCode, maximumFractionDigits: 2 };
        return this.formatNumber(value, intlOptions);
    }

    percent(value, decimalPlaces=0) {
        const intlOptions = {
            style: 'percent',
            maximumFractionDigits: decimalPlaces,
            minimumFractionDigits: decimalPlaces,
        };
        return this.formatNumber(value, intlOptions);
    }

    date(value) {
        return this.formatDateTime(value, {});
    }

    dateTime(value) {
        const intlOptions = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        return this.formatDateTime(value, intlOptions);
    }

    time(value) {
        const intlOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
        return this.formatDateTime(value, intlOptions);
    }

    // Return true if a valid number, this excludes Infinity and NaN
    isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    // Format a date, date/time or time value with Intl.DateTimeFormat()
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
    formatDateTime(dateTime, options) {
        // Fallback to data in original format.
        // As of 2019 this would most likely happen on older iOS.
        if (window.Intl === undefined) {
            return dateTime;
        }

        // Make sure a value exists
        if (dateTime === null || dateTime === '') {
            return null;
        }

        // Return formatted date/time in the user's local language
        try {
            if (dateTime instanceof Date) {
                return new Intl.DateTimeFormat(navigator.language, options).format(dateTime);
            } else if (/^\d{4}-\d{2}-\d{2}$/.test(dateTime)) {
                // Basic date without timezone (YYYY-MM-DD)
                const nums = dateTime.split('-').map(function(n) { return parseInt(n, 10); });
                const date = new Date(nums[0], nums[1] - 1, nums[2]);
                return new Intl.DateTimeFormat(navigator.language, options).format(date);
            } else {
                // Assume JavaScript `Date` object can parse the date.
                // In the future a new Temporal may be used instead:
                //    https://tc39.es/proposal-temporal/docs/
                const localDate = new Date(dateTime);
                const date = Intl.DateTimeFormat(navigator.language, options).format(localDate);
                if (navigator.language === 'en-US') {
                    // Chrome returns "{date}, {time}" but most people in the US
                    // use "{date} {time}" without the comma.
                    return date.toLocaleString().replace(', ', ' ');
                }
                return date.toLocaleString();
            }
        } catch (e) {
            // If Error log to console and return 'Error' text
            console.warn('Error formatting Date/Time Value:');
            console.log(navigator.language);
            console.log(options);
            console.log(dateTime);
            console.log(e);
            return 'Error';
        }
    }

    // Format a numeric value with Intl.NumberFormat()
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat
    formatNumber(value, options) {
        // Get the user's selected language.
        // navigator.language = Standards Version in most browsers and new versions of IE
        // navigator.userLanguage = Older versions of IE such as IE 9
        const language = (navigator.language ? navigator.language : navigator.userLanguage);

        // Check for a valid number
        if (value === null || value === '') {
            return null;
        }
        if (!this.isNumber(value)) {
            console.warn('Warning value specified in DateFormsJS function formatNumber() is not a number:');
            console.log(value);
            return value;
        }

        // Fallback if Intl.NumberFormat() is not supported.
        // For example IE9 and below or versions of Safari.
        if (window.Intl === undefined) {
            // Get the specified options
            const style = (options.style ? options.style : null);
            const maximumFractionDigits = (options.maximumFractionDigits ? options.maximumFractionDigits : 0);

            // If percent provide a basic formatting fallback
            if (style === 'percent') {
                return (value * 100).toFixed(maximumFractionDigits) + '%';
            }

            // Fallback for specific langauges
            let digitGrouping = null;
            let decimalMark = null;
            let currencySymbol = null;
            switch (language) {
                case 'en-us':
                    digitGrouping = ',';
                    decimalMark = '.';
                    currencySymbol = '$';
                    break;
            }

            if (digitGrouping !== null) {
                const numberParts = value.toString().split('.');
                numberParts[0] = numberParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                const formattedValue = numberParts.join(decimalMark);

                if (style === 'currency') {
                    return currencySymbol + formattedValue;
                } else {
                    return formattedValue;
                }
            }

            // Return the value as it was passed to this function
            return value;
        }

        // Return formatted number/currency/percent/etc in the user's local language
        try {
            return new Intl.NumberFormat(language, options).format(value);
        } catch (e) {
            // If Error log to console and return 'Error' text
            console.warn('Error formatting Numeric Value:');
            console.log(language);
            console.log(options);
            console.log(value);
            console.log(e);
            return 'Error';
        }
    }
}

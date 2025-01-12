(function () {
"use strict";

var React = (window.React === undefined && window.preact !== undefined ? window.preact : window.React);

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var jsonDataCache = [];
var graphQL_Cache = {};

function saveDataToCache(url, query, params, data) {
  for (var n = 0, m = jsonDataCache.length; n < m; n++) {
    var cache = jsonDataCache[n];

    if (cache.url === url && cache.query === query) {
      cache.params = JSON.stringify(params);
      cache.data = data;
      return;
    }
  }

  jsonDataCache.push({
    url: url,
    query: query,
    params: JSON.stringify(params),
    data: data
  });
}

function getDataFromCache(url, query, params) {
  for (var n = 0, m = jsonDataCache.length; n < m; n++) {
    var cache = jsonDataCache[n];

    if (cache.url === url && cache.query === query) {
      if (JSON.stringify(params) === cache.params) {
        return cache.data;
      }

      break;
    }
  }

  return null;
}

function IsLoading(props) {
  var show = props.fetchState === 0;

  if (!show || !props.children) {
    return null;
  }

  return props.children;
}

function HasError(props) {
  var show = props.fetchState === -1;

  if (!show || !props.children) {
    return null;
  }

  var error = props.error;

  if (typeof error === 'string' && error.indexOf('Error') === -1) {
    error = 'Error - ' + error;
  }

  return React.cloneElement(props.children, {
    error: error
  });
}

function IsLoaded(props) {
  var show = props.fetchState === 1;

  if (!show || !props.children) {
    return null;
  }

  return React.cloneElement(props.children, {
    data: props.data,
    params: props.params,
    handleChange: props.handleChange,
    childProps: props.childProps
  });
}

var JsonData = function (_React$Component) {
  _inherits(JsonData, _React$Component);

  var _super = _createSuper(JsonData);

  function JsonData(props) {
    var _this;

    _classCallCheck(this, JsonData);

    _this = _super.call(this, props);
    _this._isFetching = false;
    _this._isMounted = false;
    _this.fetchData = _this.fetchData.bind(_assertThisInitialized(_this));
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_this));
    _this._querySrc = props && props.querySrc ? props.querySrc : undefined;
    _this._query = props && props.query ? props.query : undefined;
    _this.state = {
      fetchState: 0,
      error: null,
      params: _this.getUrlParams(),
      data: null
    };
    return _this;
  }

  _createClass(JsonData, [{
    key: "getUrlParams",
    value: function getUrlParams() {
      var params = {};

      if (this.props && this.props.graphQL === true) {
        return this.props.variables === undefined ? {} : this.props.variables;
      }

      for (var prop in this.props) {
        if (prop !== 'url' && typeof this.props[prop] === 'string') {
          params[prop] = this.props[prop];
        }
      }

      return params;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this._isMounted = true;

      if (this.props.graphQL === true && this._query === undefined && this._querySrc !== undefined) {
        if (graphQL_Cache[this._querySrc] !== undefined) {
          this._query = graphQL_Cache[this._querySrc];
        }
      }

      if (this.props.loadOnlyOnce) {
        var data = getDataFromCache(this.props.url, this._query, this.getUrlParams());

        if (data !== null) {
          this.setState({
            fetchState: 1,
            data: data
          });
          return;
        }
      }

      if (this.props.graphQL === true && this._query === undefined && this._querySrc !== undefined) {
        var querySrc = this._querySrc;
        var jsonData = this;
        fetch(querySrc, null).then(function (response) {
          var status = response.status;

          if (status >= 200 && status < 300 || status === 304) {
            return Promise.resolve(response);
          } else {
            var error = 'Error loading data. Server Response Code: ' + status + ', Response Text: ' + response.statusText;
            return Promise.reject(error);
          }
        }).then(function (response) {
          return response.text();
        }).then(function (text) {
          graphQL_Cache[querySrc] = text;
          jsonData._query = graphQL_Cache[querySrc];
          jsonData.fetchData();
        }).catch(function (error) {
          throw new Error('Error Downloading GraphQL Script: [' + querySrc + '], Error: ' + error.toString());
        });
        return;
      }

      this.fetchData();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var needsRefresh;

      if (this.props.graphQL === true) {
        needsRefresh = JSON.stringify(prevProps.variables) !== JSON.stringify(this.props.variables);
      } else {
        var prevUrl = this.buildUrl(prevState.params);
        var newUrl = this.buildUrl(this.props);
        needsRefresh = prevUrl !== newUrl;
      }

      if (needsRefresh) {
        this.setState({
          params: this.getUrlParams()
        }, this.fetchData);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._isMounted = false;
    }
  }, {
    key: "buildUrl",
    value: function buildUrl(params) {
      var url = this.props.url;

      if (this.props.graphQL !== true && Object.keys(params).length > 0) {
        for (var param in params) {
          if (url.indexOf(':' + param) > -1) {
            url = url.replace(new RegExp(':' + param, 'g'), encodeURIComponent(params[param]));
          }
        }
      }

      return url;
    }
  }, {
    key: "fetchData",
    value: function fetchData() {
      var _this2 = this;

      var url = this.buildUrl(this.state.params);

      if (this._isFetching) {
        return;
      }

      this._isFetching = true;
      var options = {
        mode: 'cors',
        cache: 'no-store',
        credentials: 'same-origin'
      };

      if (this.props.fetchOptions) {
        options = this.props.fetchOptions;
      }

      if (this.props.fetchHeaders) {
        options.headers = this.props.fetchHeaders;
      }

      if (this.props.graphQL === true) {
        var variables = this.props.variables === undefined ? {} : this.props.variables;

        if (window.location.origin === 'file://' || window.location.origin === 'null') {
          url += url.indexOf('?') === -1 ? '?' : '&';
          url += 'query=' + encodeURIComponent(this._query.trim());
          url += '&variables=' + encodeURIComponent(JSON.stringify(variables));
        } else {
          options.method = 'POST';

          if (options.headers === undefined) {
            options.headers = {
              'Content-Type': 'application/json'
            };
          } else {
            options.headers['Content-Type'] = 'application/json';
          }

          options.body = JSON.stringify({
            query: this._query,
            variables: variables
          });
        }
      }

      this.setState({
        fetchState: 0
      }, function () {
        _this2.updateView();

        fetch(url, options).then(function (response) {
          var status = response.status;

          if (status >= 200 && status < 300 || status === 304) {
            return Promise.resolve(response);
          } else {
            var error = 'Error loading data. Server Response Code: ' + status + ', Response Text: ' + response.statusText;
            return Promise.reject(error);
          }
        }).then(function (response) {
          return response.json();
        }).then(function (data) {
          var graphQL = _this2.props.graphQL === true;

          if (graphQL) {
            if (data.errors && data.errors.length) {
              var errorMessage;

              if (data.errors.length === 1 && data.errors[0].message) {
                errorMessage = '[GraphQL Error]: ' + data.errors[0].message;
              } else {
                var errorTextGraphQLErrors = typeof _this2.props.errorTextGraphQLErrors === 'string' ? _this2.props.errorTextGraphQLErrors : '{count} GraphQL Errors occurred. See console for full details.';
                errorMessage = errorTextGraphQLErrors.replace('{count}', data.errors.length);
              }

              console.error(data.errors);
              throw errorMessage;
            }
          }

          if (_this2._isMounted) {
            _this2.setState({
              fetchState: 1,
              data: graphQL ? data.data : data
            });
          }

          if (_this2.props.loadOnlyOnce) {
            saveDataToCache(_this2.props.url, _this2._query, _this2.getUrlParams(), graphQL ? data.data : data);
          }
        }).catch(function (error) {
          if (_this2._isMounted) {
            _this2.setState({
              fetchState: -1,
              error: error.toString()
            });
          }
        }).finally(function () {
          _this2._isFetching = false;

          _this2.updateView();
        });
      });
    }
  }, {
    key: "handleChange",
    value: function handleChange() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (this._isMounted) {
        this.setState({
          data: data === null ? this.state.data : data
        });
      }
    }
  }, {
    key: "updateView",
    value: function updateView() {
      if (typeof this.props.onViewUpdated === 'function') {
        try {
          this.props.onViewUpdated();
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(React.Fragment, null, React.createElement(IsLoading, {
        fetchState: this.state.fetchState
      }, this.props.isLoading), React.createElement(HasError, {
        fetchState: this.state.fetchState,
        error: this.state.error
      }, this.props.hasError), React.createElement(IsLoaded, {
        fetchState: this.state.fetchState,
        data: this.state.data,
        params: this.state.params,
        handleChange: this.handleChange,
        childProps: this.props.childProps
      }, this.props.isLoaded));
    }
  }]);

  return JsonData;
}(React.Component);

window.JsonData = JsonData;
})();
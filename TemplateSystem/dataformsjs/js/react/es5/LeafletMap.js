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

var LeafletMap = function (_React$Component) {
  _inherits(LeafletMap, _React$Component);

  var _super = _createSuper(LeafletMap);

  function LeafletMap(props) {
    var _this;

    _classCallCheck(this, LeafletMap);

    _this = _super.call(this, props);
    _this.div = React.createRef();
    return _this;
  }

  _createClass(LeafletMap, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var lat = parseFloat(this.props.latitude);
      var long = parseFloat(this.props.longitude);
      var zoom = parseInt(this.props.zoom, 10);
      var markerText = this.props.marker;
      var numAttr = [{
        attr: 'latitude',
        value: lat
      }, {
        attr: 'longitude',
        value: long
      }, {
        attr: 'zoom',
        value: zoom
      }];

      for (var n = 0, m = numAttr.length; n < m; n++) {
        if (isNaN(numAttr[n].value)) {
          console.error('<LeafletMap> - Invalid Prop for [' + numAttr[n].attr + '], value was not a number.');
          console.log(numAttr[n].attr);
          console.log(this.props);
          return;
        }
      }

      if (window.L === undefined) {
        console.error('Error - Unable to show map because Leaflet is not loaded on the page.');
        return;
      }

      var map = L.map(this.div.current).setView([lat, long], zoom);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright" target="_blank">OpenStreetMap</a> contributors'
      }).addTo(map);

      if (markerText !== null) {
        var marker = L.marker([lat, long]).addTo(map);

        if (markerText) {
          marker.bindPopup(markerText);
        }

        marker.openPopup();
      }
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement('div', {
        className: 'leaflet-map',
        ref: this.div
      });
    }
  }]);

  return LeafletMap;
}(React.Component);

window.LeafletMap = LeafletMap;
})();
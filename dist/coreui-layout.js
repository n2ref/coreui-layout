(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, (global.CoreUI = global.CoreUI || {}, global.CoreUI.layout = factory()));
})(this, (function () { 'use strict';

  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }
  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }

  var LayoutUtils = {
    /**
     * Проверка на объект
     * @param value
     */
    isObject: function isObject(value) {
      return _typeof(value) === 'object' && !Array.isArray(value) && value !== null;
    },
    /**
     * @returns {string}
     * @private
     */
    hashCode: function hashCode() {
      return this.crc32((new Date().getTime() + Math.random()).toString()).toString(16);
    },
    /**
     * Hash crc32
     * @param str
     * @returns {number}
     * @private
     */
    crc32: function crc32(str) {
      for (var a, o = [], c = 0; c < 256; c++) {
        a = c;
        for (var f = 0; f < 8; f++) {
          a = 1 & a ? 3988292384 ^ a >>> 1 : a >>> 1;
        }
        o[c] = a;
      }
      for (var n = -1, t = 0; t < str.length; t++) {
        n = n >>> 8 ^ o[255 & (n ^ str.charCodeAt(t))];
      }
      return (-1 ^ n) >>> 0;
    }
  };

  var LayoutPrivate = {
    /**
     * Выполнение события
     * @param {object} layout
     * @param {string} name
     * @param {object|null} context
     * @param {Array} params
     * @private
     */
    trigger: function trigger(layout, name, context, params) {
      params = params || [];
      if (layout._events.hasOwnProperty(name) && layout._events[name].length > 0) {
        for (var i = 0; i < layout._events[name].length; i++) {
          var callback = layout._events[name][i].callback;
          context = layout._events[name][i].context || context;
          callback.apply(context, params);
          if (layout._events[name][i].singleExec) {
            layout._events[name].splice(i, 1);
            i--;
          }
        }
      }
    },
    /**
     * Формирование контента
     * @param {object} layout
     * @param {*}      data
     * @returns {string}
     * @private
     */
    renderContent: function renderContent(layout, data) {
      var result = [];
      if (typeof data === 'string') {
        result.push(data);
      } else if (data instanceof Object) {
        if (!Array.isArray(data)) {
          data = [data];
        }
        for (var i = 0; i < data.length; i++) {
          if (typeof data[i] === 'string') {
            result.push(data[i]);
          } else if (data[i] instanceof Object && typeof data[i].render === 'function' && typeof data[i].initEvents === 'function') {
            result.push(data[i].render());
            layout.on('shown.coreui.layout', data[i].initEvents, data[i], true);
          } else if (!Array.isArray(data[i]) && data[i].hasOwnProperty('component') && data[i].component.substring(0, 6) === 'coreui') {
            var name = data[i].component.split('.')[1];
            if (CoreUI.hasOwnProperty(name) && LayoutUtils.isObject(CoreUI[name])) {
              var instance = CoreUI[name].create(data[i]);
              result.push(instance.render());
              layout.on('shown.coreui.layout', instance.initEvents, instance, true);
            } else {
              result.push(JSON.stringify(data[i]));
            }
          } else {
            result.push(JSON.stringify(data[i]));
          }
        }
      }
      return result;
    }
  };

  var LayoutInstance = /*#__PURE__*/function () {
    /**
     * Инициализация
     * @param options
     */
    function LayoutInstance(options) {
      _classCallCheck(this, LayoutInstance);
      _defineProperty(this, "_options", {
        id: '',
        justify: "start",
        // start, end, center, between, around, evenly
        align: "start",
        // start, end, center, baseline, stretch
        direction: "row",
        // column, column-reverse, row, row-reverse
        wrap: "wrap",
        // wrap, nowrap, reverse
        overflow: null,
        // auto, hidden, visible, scroll
        overflowX: null,
        // auto, hidden, visible, scroll
        overflowY: null,
        // auto, hidden, visible, scroll
        width: null,
        minWidth: null,
        maxWidth: null,
        height: null,
        minHeight: null,
        naxHeight: null,
        gap: null,
        items: [],
        sizes: {}
      });
      _defineProperty(this, "_item", {
        id: '',
        align: null,
        // start, end, center, baseline, stretch
        order: null,
        // 0 - 5
        fill: false,
        overflow: null,
        // auto, hidden, visible, scroll
        overflowX: null,
        // auto, hidden, visible, scroll
        overflowY: null,
        // auto, hidden, visible, scroll
        width: null,
        minWidth: null,
        maxWidth: null,
        height: null,
        minHeight: null,
        naxHeight: null,
        sizes: {}
      });
      _defineProperty(this, "_id", '');
      _defineProperty(this, "_events", {});
      this._options = $.extend(true, {}, this._options, options);
      this._id = this._options.hasOwnProperty('id') && typeof this._options.id === 'string' && this._options.id ? this._options.id : LayoutUtils.hashCode();
      var that = this;
      $.each(this._options.items, function (key, item) {
        if (LayoutUtils.isObject(item)) {
          if (!item.hasOwnProperty('id') || typeof item.id !== 'string' || !item.id) {
            that._options.items[key].id = LayoutUtils.hashCode();
          }
        }
      });
    }

    /**
     *
     */
    return _createClass(LayoutInstance, [{
      key: "initEvents",
      value: function initEvents() {
        LayoutPrivate.trigger(this, 'shown.coreui.layout');
      }

      /**
       *
       * @returns {*}
       */
    }, {
      key: "getId",
      value: function getId() {
        return this._id;
      }

      /**
       * @param itemId
       * @param content
       */
    }, {
      key: "setItemContent",
      value: function setItemContent(itemId, content) {
        var container = $('#coreui-layout-' + this.getId() + ' .item-' + itemId);
        if (container[0]) {
          var contents = LayoutPrivate.renderContent(this, content);
          container.empty();
          $.each(contents, function (key, content) {
            container.append(content);
          });
          LayoutPrivate.trigger(this, 'show-content.coreui.layout', this, [itemId]);
        }
      }

      /**
       *
       * @param element
       * @returns {*}
       */
    }, {
      key: "render",
      value: function render(element) {
        var containerClasses = [];
        var containerStyles = [];
        var containerItems = [];
        switch (this._options.direction) {
          case 'row':
            containerClasses.push('flex-row');
            break;
          case 'row-reverse':
            containerClasses.push('flex-row-reverse');
            break;
          case 'column':
            containerClasses.push('flex-column');
            break;
          case 'column-reverse':
            containerClasses.push('flex-column-reverse');
            break;
        }
        switch (this._options.justify) {
          case 'start':
            containerClasses.push('justify-content-start');
            break;
          case 'end':
            containerClasses.push('justify-content-end');
            break;
          case 'center':
            containerClasses.push('justify-content-center');
            break;
          case 'between':
            containerClasses.push('justify-content-between');
            break;
          case 'around':
            containerClasses.push('justify-content-around');
            break;
          case 'evenly':
            containerClasses.push('justify-content-evenly');
            break;
        }
        switch (this._options.align) {
          case 'start':
            containerClasses.push('align-items-start');
            break;
          case 'end':
            containerClasses.push('align-items-end');
            break;
          case 'center':
            containerClasses.push('align-items-center');
            break;
          case 'baseline':
            containerClasses.push('align-items-baseline');
            break;
          case 'stretch':
            containerClasses.push('align-items-stretch');
            break;
        }
        switch (this._options.wrap) {
          case 'wrap':
            containerClasses.push('flex-wrap');
            break;
          case 'wrap-reverse':
            containerClasses.push('flex-wrap-reverse');
            break;
          case 'nowrap':
            containerClasses.push('flex-nowrap');
            break;
        }
        switch (this._options.overflow) {
          case 'auto':
            containerClasses.push('overflow-auto');
            break;
          case 'hidden':
            containerClasses.push('overflow-hidden');
            break;
          case 'visible':
            containerClasses.push('overflow-visible');
            break;
          case 'scroll':
            containerClasses.push('overflow-scroll');
            break;
        }
        switch (this._options.overflowX) {
          case 'auto':
            containerClasses.push('overflow-x-auto');
            break;
          case 'hidden':
            containerClasses.push('overflow-x-hidden');
            break;
          case 'visible':
            containerClasses.push('overflow-x-visible');
            break;
          case 'scroll':
            containerClasses.push('overflow-x-scroll');
            break;
        }
        switch (this._options.overflowY) {
          case 'auto':
            containerClasses.push('overflow-y-auto');
            break;
          case 'hidden':
            containerClasses.push('overflow-y-hidden');
            break;
          case 'visible':
            containerClasses.push('overflow-y-visible');
            break;
          case 'scroll':
            containerClasses.push('overflow-y-scroll');
            break;
        }
        if (['number', 'string'].indexOf(_typeof(this._options.width)) >= 0) {
          var unit = typeof this._options.width === 'number' ? 'px' : '';
          containerStyles.push('width:' + this._options.width + unit);
        }
        if (['number', 'string'].indexOf(_typeof(this._options.minWidth)) >= 0) {
          var _unit = typeof this._options.minWidth === 'number' ? 'px' : '';
          containerStyles.push('min-width:' + this._options.minWidth + _unit);
        }
        if (['number', 'string'].indexOf(_typeof(this._options.maxWidth)) >= 0) {
          var _unit2 = typeof this._options.maxWidth === 'number' ? 'px' : '';
          containerStyles.push('max-width:' + this._options.maxWidth + _unit2);
        }
        if (['number', 'string'].indexOf(_typeof(this._options.height)) >= 0) {
          var _unit3 = typeof this._options.height === 'number' ? 'px' : '';
          containerStyles.push('height:' + this._options.height + _unit3);
        }
        if (['number', 'string'].indexOf(_typeof(this._options.minHeight)) >= 0) {
          var _unit4 = typeof this._options.minHeight === 'number' ? 'px' : '';
          containerStyles.push('min-height:' + this._options.minHeight + _unit4);
        }
        if (['number', 'string'].indexOf(_typeof(this._options.maxHeight)) >= 0) {
          var _unit5 = typeof this._options.maxHeight === 'number' ? 'px' : '';
          containerStyles.push('max-height:' + this._options.maxHeight + _unit5);
        }
        if (['number', 'string'].indexOf(_typeof(this._options.gap)) >= 0) {
          var _unit6 = typeof this._options.gap === 'number' ? 'px' : '';
          containerStyles.push('gap:' + this._options.gap + _unit6);
        }
        $.each(this._options.sizes, function (name, size) {
          if (['sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name) >= 0) {
            switch (size.direction) {
              case 'row':
                containerClasses.push('flex-' + name + '-row');
                break;
              case 'row-reverse':
                containerClasses.push('flex-' + name + '-row-reverse');
                break;
              case 'column':
                containerClasses.push('flex-' + name + '-column');
                break;
              case 'column-reverse':
                containerClasses.push('flex-' + name + '-column-reverse');
                break;
            }
            switch (size.justify) {
              case 'start':
                containerClasses.push('justify-content-' + name + '-start');
                break;
              case 'end':
                containerClasses.push('justify-content-' + name + '-end');
                break;
              case 'center':
                containerClasses.push('justify-content-' + name + '-center');
                break;
              case 'between':
                containerClasses.push('justify-content-' + name + '-between');
                break;
              case 'around':
                containerClasses.push('justify-content-' + name + '-around');
                break;
              case 'evenly':
                containerClasses.push('justify-content-' + name + '-evenly');
                break;
            }
            switch (size.align) {
              case 'start':
                containerClasses.push('align-items-' + name + '-start');
                break;
              case 'end':
                containerClasses.push('align-items-' + name + '-end');
                break;
              case 'center':
                containerClasses.push('align-items-' + name + '-center');
                break;
              case 'baseline':
                containerClasses.push('align-items-' + name + '-baseline');
                break;
              case 'stretch':
                containerClasses.push('align-items-' + name + '-stretch');
                break;
            }
            switch (size.wrap) {
              case 'wrap':
                containerClasses.push('flex-' + name + '-wrap');
                break;
              case 'wrap-reverse':
                containerClasses.push('flex-' + name + '-wrap-reverse');
                break;
              case 'nowrap':
                containerClasses.push('flex-' + name + '-nowrap');
                break;
            }
          }
        });
        var that = this;
        var issetColumns = false;
        $.each(this._options.items, function (key, item) {
          var itemClasses = ['coreui-layout-item', 'item-' + item.id];
          var itemStyles = [];
          var issetItemColumn = false;
          switch (item.align) {
            case 'start':
              itemClasses.push('align-self-start');
              break;
            case 'end':
              itemClasses.push('align-self-end');
              break;
            case 'center':
              itemClasses.push('align-self-center');
              break;
            case 'baseline':
              itemClasses.push('align-self-baseline');
              break;
            case 'stretch':
              itemClasses.push('align-self-stretch');
              break;
          }
          switch (item.overflow) {
            case 'auto':
              itemClasses.push('overflow-auto');
              break;
            case 'hidden':
              itemClasses.push('overflow-hidden');
              break;
            case 'visible':
              itemClasses.push('overflow-visible');
              break;
            case 'scroll':
              itemClasses.push('overflow-scroll');
              break;
          }
          switch (item.overflowX) {
            case 'auto':
              itemClasses.push('overflow-x-auto');
              break;
            case 'hidden':
              itemClasses.push('overflow-x-hidden');
              break;
            case 'visible':
              itemClasses.push('overflow-x-visible');
              break;
            case 'scroll':
              itemClasses.push('overflow-x-scroll');
              break;
          }
          switch (item.overflowY) {
            case 'auto':
              itemClasses.push('overflow-y-auto');
              break;
            case 'hidden':
              itemClasses.push('overflow-y-hidden');
              break;
            case 'visible':
              itemClasses.push('overflow-y-visible');
              break;
            case 'scroll':
              itemClasses.push('overflow-y-scroll');
              break;
          }
          if (item.fill) {
            itemClasses.push('flex-fill');
          }
          if (typeof item.order === 'number') {
            if (item.order < 0) {
              itemClasses.push('order-0');
            } else if (item.order > 5) {
              itemClasses.push('order-5');
            } else {
              itemClasses.push('order-' + item.order);
            }
          }
          if (item.widthColumn) {
            issetColumns = true;
            issetItemColumn = true;
            itemClasses.push('col-' + item.widthColumn);
          }
          $.each(item.sizes, function (name, size) {
            if (['sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name) >= 0) {
              switch (size.align) {
                case 'start':
                  itemClasses.push('align-self-' + name + '-start');
                  break;
                case 'end':
                  itemClasses.push('align-self-' + name + '-end');
                  break;
                case 'center':
                  itemClasses.push('align-self-' + name + '-center');
                  break;
                case 'baseline':
                  itemClasses.push('align-self-' + name + '-baseline');
                  break;
                case 'stretch':
                  itemClasses.push('align-self-' + name + '-stretch');
                  break;
              }
              if (size.fill) {
                itemClasses.push('flex-' + name + '-fill');
              }
              if (size.widthColumn) {
                issetColumns = true;
                issetItemColumn = true;
                itemClasses.push('col-' + name + '-' + size.widthColumn);
              }
              if (typeof size.order === 'number') {
                if (size.order < 0) {
                  itemClasses.push('order-' + name + '-0');
                } else if (size.order > 5) {
                  itemClasses.push('order-' + name + '-5');
                } else {
                  itemClasses.push('order-' + name + '-' + size.order);
                }
              }
            }
          });
          if (item.width !== undefined) {
            var _unit7 = typeof item.width === 'number' ? 'px' : '';
            itemStyles.push('width:' + item.width + _unit7);
          }
          if (item.minWidth !== undefined) {
            var _unit8 = typeof item.minWidth === 'number' ? 'px' : '';
            itemStyles.push('min-width:' + item.minWidth + _unit8);
          }
          if (item.maxWidth !== undefined) {
            var _unit9 = typeof item.maxWidth === 'number' ? 'px' : '';
            itemStyles.push('max-width:' + item.maxWidth + _unit9);
          }
          if (item.height !== undefined) {
            var _unit10 = typeof item.height === 'number' ? 'px' : '';
            itemStyles.push('height:' + item.height + _unit10);
          }
          if (item.minHeight) {
            var _unit11 = typeof item.minHeight === 'number' ? 'px' : '';
            itemStyles.push('min-height:' + item.minHeight + _unit11);
          }
          if (item.maxHeight !== undefined) {
            var _unit12 = typeof item.maxHeight === 'number' ? 'px' : '';
            itemStyles.push('max-height:' + item.maxHeight + _unit12);
          }
          if (issetItemColumn) {
            itemClasses.push('col');
          }
          var contents = LayoutPrivate.renderContent(that, item.content);
          var styles = itemStyles.length > 0 ? ' style="' + itemStyles.join(';') + '"' : '';
          var itemContent = $('<div class="' + itemClasses.join(' ') + '"' + styles + '></div>');
          $.each(contents, function (name, content) {
            itemContent.append(content);
          });
          containerItems.push(itemContent);
        });
        if (issetColumns) {
          containerClasses.push('row');
        }
        var styles = containerStyles.length > 0 ? ' style="' + containerStyles.join(';') + '"' : '';
        var html = $('<div id="coreui-layout-' + this.getId() + '" ' + 'class="coreui-layout d-flex ' + containerClasses.join(' ') + '"' + styles + '></div>');
        containerItems.map(function (containerItem) {
          html.append(containerItem);
        });
        if (element === undefined) {
          return html;
        }

        // Dom element
        var domElement = {};
        if (typeof element === 'string') {
          domElement = document.getElementById(element);
          if (!domElement) {
            return '';
          }
        } else if (element instanceof HTMLElement) {
          domElement = element;
        }
        $(domElement).html(html);
        this.initEvents();
      }

      /**
       * @param eventName
       * @param callback
       * @param context
       * @param singleExec
       */
    }, {
      key: "on",
      value: function on(eventName, callback, context, singleExec) {
        if (_typeof(this._events[eventName]) !== 'object') {
          this._events[eventName] = [];
        }
        this._events[eventName].push({
          context: context || this,
          callback: callback,
          singleExec: !!singleExec
        });
      }
    }]);
  }();

  var Layout = {
    _instances: {},
    /**
     * @param {object} options
     * @returns {LayoutInstance}
     */
    create: function create(options) {
      var instance = new LayoutInstance(LayoutUtils.isObject(options) ? options : {});
      var layoutId = instance.getId();
      this._instances[layoutId] = instance;
      return instance;
    },
    /**
     * @param {string} id
     * @returns {object|null}
     */
    get: function get(id) {
      if (!this._instances.hasOwnProperty(id)) {
        return null;
      }
      if (!$('#coreui-layout-' + this._instances[id])[0]) {
        delete this._instances[id];
        return null;
      }
      return this._instances[id];
    }
  };

  return Layout;

}));

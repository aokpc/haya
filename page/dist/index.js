(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/.deno/events@3.3.0/node_modules/events/events.js
  var require_events = __commonJS({
    "node_modules/.deno/events@3.3.0/node_modules/events/events.js"(exports, module) {
      "use strict";
      var R2 = typeof Reflect === "object" ? Reflect : null;
      var ReflectApply = R2 && typeof R2.apply === "function" ? R2.apply : function ReflectApply2(target, receiver, args) {
        return Function.prototype.apply.call(target, receiver, args);
      };
      var ReflectOwnKeys;
      if (R2 && typeof R2.ownKeys === "function") {
        ReflectOwnKeys = R2.ownKeys;
      } else if (Object.getOwnPropertySymbols) {
        ReflectOwnKeys = function ReflectOwnKeys2(target) {
          return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
        };
      } else {
        ReflectOwnKeys = function ReflectOwnKeys2(target) {
          return Object.getOwnPropertyNames(target);
        };
      }
      function ProcessEmitWarning(warning) {
        if (console && console.warn) console.warn(warning);
      }
      var NumberIsNaN = Number.isNaN || function NumberIsNaN2(value) {
        return value !== value;
      };
      function EventEmitter2() {
        EventEmitter2.init.call(this);
      }
      module.exports = EventEmitter2;
      module.exports.once = once;
      EventEmitter2.EventEmitter = EventEmitter2;
      EventEmitter2.prototype._events = void 0;
      EventEmitter2.prototype._eventsCount = 0;
      EventEmitter2.prototype._maxListeners = void 0;
      var defaultMaxListeners = 10;
      function checkListener(listener) {
        if (typeof listener !== "function") {
          throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
        }
      }
      Object.defineProperty(EventEmitter2, "defaultMaxListeners", {
        enumerable: true,
        get: function() {
          return defaultMaxListeners;
        },
        set: function(arg) {
          if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) {
            throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
          }
          defaultMaxListeners = arg;
        }
      });
      EventEmitter2.init = function() {
        if (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) {
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
        }
        this._maxListeners = this._maxListeners || void 0;
      };
      EventEmitter2.prototype.setMaxListeners = function setMaxListeners(n2) {
        if (typeof n2 !== "number" || n2 < 0 || NumberIsNaN(n2)) {
          throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n2 + ".");
        }
        this._maxListeners = n2;
        return this;
      };
      function _getMaxListeners(that) {
        if (that._maxListeners === void 0)
          return EventEmitter2.defaultMaxListeners;
        return that._maxListeners;
      }
      EventEmitter2.prototype.getMaxListeners = function getMaxListeners() {
        return _getMaxListeners(this);
      };
      EventEmitter2.prototype.emit = function emit(type) {
        var args = [];
        for (var i4 = 1; i4 < arguments.length; i4++) args.push(arguments[i4]);
        var doError = type === "error";
        var events = this._events;
        if (events !== void 0)
          doError = doError && events.error === void 0;
        else if (!doError)
          return false;
        if (doError) {
          var er;
          if (args.length > 0)
            er = args[0];
          if (er instanceof Error) {
            throw er;
          }
          var err = new Error("Unhandled error." + (er ? " (" + er.message + ")" : ""));
          err.context = er;
          throw err;
        }
        var handler = events[type];
        if (handler === void 0)
          return false;
        if (typeof handler === "function") {
          ReflectApply(handler, this, args);
        } else {
          var len = handler.length;
          var listeners = arrayClone(handler, len);
          for (var i4 = 0; i4 < len; ++i4)
            ReflectApply(listeners[i4], this, args);
        }
        return true;
      };
      function _addListener(target, type, listener, prepend) {
        var m4;
        var events;
        var existing;
        checkListener(listener);
        events = target._events;
        if (events === void 0) {
          events = target._events = /* @__PURE__ */ Object.create(null);
          target._eventsCount = 0;
        } else {
          if (events.newListener !== void 0) {
            target.emit(
              "newListener",
              type,
              listener.listener ? listener.listener : listener
            );
            events = target._events;
          }
          existing = events[type];
        }
        if (existing === void 0) {
          existing = events[type] = listener;
          ++target._eventsCount;
        } else {
          if (typeof existing === "function") {
            existing = events[type] = prepend ? [listener, existing] : [existing, listener];
          } else if (prepend) {
            existing.unshift(listener);
          } else {
            existing.push(listener);
          }
          m4 = _getMaxListeners(target);
          if (m4 > 0 && existing.length > m4 && !existing.warned) {
            existing.warned = true;
            var w4 = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners added. Use emitter.setMaxListeners() to increase limit");
            w4.name = "MaxListenersExceededWarning";
            w4.emitter = target;
            w4.type = type;
            w4.count = existing.length;
            ProcessEmitWarning(w4);
          }
        }
        return target;
      }
      EventEmitter2.prototype.addListener = function addListener(type, listener) {
        return _addListener(this, type, listener, false);
      };
      EventEmitter2.prototype.on = EventEmitter2.prototype.addListener;
      EventEmitter2.prototype.prependListener = function prependListener(type, listener) {
        return _addListener(this, type, listener, true);
      };
      function onceWrapper() {
        if (!this.fired) {
          this.target.removeListener(this.type, this.wrapFn);
          this.fired = true;
          if (arguments.length === 0)
            return this.listener.call(this.target);
          return this.listener.apply(this.target, arguments);
        }
      }
      function _onceWrap(target, type, listener) {
        var state = { fired: false, wrapFn: void 0, target, type, listener };
        var wrapped = onceWrapper.bind(state);
        wrapped.listener = listener;
        state.wrapFn = wrapped;
        return wrapped;
      }
      EventEmitter2.prototype.once = function once2(type, listener) {
        checkListener(listener);
        this.on(type, _onceWrap(this, type, listener));
        return this;
      };
      EventEmitter2.prototype.prependOnceListener = function prependOnceListener(type, listener) {
        checkListener(listener);
        this.prependListener(type, _onceWrap(this, type, listener));
        return this;
      };
      EventEmitter2.prototype.removeListener = function removeListener(type, listener) {
        var list, events, position, i4, originalListener;
        checkListener(listener);
        events = this._events;
        if (events === void 0)
          return this;
        list = events[type];
        if (list === void 0)
          return this;
        if (list === listener || list.listener === listener) {
          if (--this._eventsCount === 0)
            this._events = /* @__PURE__ */ Object.create(null);
          else {
            delete events[type];
            if (events.removeListener)
              this.emit("removeListener", type, list.listener || listener);
          }
        } else if (typeof list !== "function") {
          position = -1;
          for (i4 = list.length - 1; i4 >= 0; i4--) {
            if (list[i4] === listener || list[i4].listener === listener) {
              originalListener = list[i4].listener;
              position = i4;
              break;
            }
          }
          if (position < 0)
            return this;
          if (position === 0)
            list.shift();
          else {
            spliceOne(list, position);
          }
          if (list.length === 1)
            events[type] = list[0];
          if (events.removeListener !== void 0)
            this.emit("removeListener", type, originalListener || listener);
        }
        return this;
      };
      EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener;
      EventEmitter2.prototype.removeAllListeners = function removeAllListeners(type) {
        var listeners, events, i4;
        events = this._events;
        if (events === void 0)
          return this;
        if (events.removeListener === void 0) {
          if (arguments.length === 0) {
            this._events = /* @__PURE__ */ Object.create(null);
            this._eventsCount = 0;
          } else if (events[type] !== void 0) {
            if (--this._eventsCount === 0)
              this._events = /* @__PURE__ */ Object.create(null);
            else
              delete events[type];
          }
          return this;
        }
        if (arguments.length === 0) {
          var keys = Object.keys(events);
          var key;
          for (i4 = 0; i4 < keys.length; ++i4) {
            key = keys[i4];
            if (key === "removeListener") continue;
            this.removeAllListeners(key);
          }
          this.removeAllListeners("removeListener");
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
          return this;
        }
        listeners = events[type];
        if (typeof listeners === "function") {
          this.removeListener(type, listeners);
        } else if (listeners !== void 0) {
          for (i4 = listeners.length - 1; i4 >= 0; i4--) {
            this.removeListener(type, listeners[i4]);
          }
        }
        return this;
      };
      function _listeners(target, type, unwrap) {
        var events = target._events;
        if (events === void 0)
          return [];
        var evlistener = events[type];
        if (evlistener === void 0)
          return [];
        if (typeof evlistener === "function")
          return unwrap ? [evlistener.listener || evlistener] : [evlistener];
        return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
      }
      EventEmitter2.prototype.listeners = function listeners(type) {
        return _listeners(this, type, true);
      };
      EventEmitter2.prototype.rawListeners = function rawListeners(type) {
        return _listeners(this, type, false);
      };
      EventEmitter2.listenerCount = function(emitter, type) {
        if (typeof emitter.listenerCount === "function") {
          return emitter.listenerCount(type);
        } else {
          return listenerCount.call(emitter, type);
        }
      };
      EventEmitter2.prototype.listenerCount = listenerCount;
      function listenerCount(type) {
        var events = this._events;
        if (events !== void 0) {
          var evlistener = events[type];
          if (typeof evlistener === "function") {
            return 1;
          } else if (evlistener !== void 0) {
            return evlistener.length;
          }
        }
        return 0;
      }
      EventEmitter2.prototype.eventNames = function eventNames() {
        return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
      };
      function arrayClone(arr, n2) {
        var copy = new Array(n2);
        for (var i4 = 0; i4 < n2; ++i4)
          copy[i4] = arr[i4];
        return copy;
      }
      function spliceOne(list, index) {
        for (; index + 1 < list.length; index++)
          list[index] = list[index + 1];
        list.pop();
      }
      function unwrapListeners(arr) {
        var ret = new Array(arr.length);
        for (var i4 = 0; i4 < ret.length; ++i4) {
          ret[i4] = arr[i4].listener || arr[i4];
        }
        return ret;
      }
      function once(emitter, name) {
        return new Promise(function(resolve, reject) {
          function errorListener(err) {
            emitter.removeListener(name, resolver);
            reject(err);
          }
          function resolver() {
            if (typeof emitter.removeListener === "function") {
              emitter.removeListener("error", errorListener);
            }
            resolve([].slice.call(arguments));
          }
          ;
          eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
          if (name !== "error") {
            addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
          }
        });
      }
      function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
        if (typeof emitter.on === "function") {
          eventTargetAgnosticAddListener(emitter, "error", handler, flags);
        }
      }
      function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
        if (typeof emitter.on === "function") {
          if (flags.once) {
            emitter.once(name, listener);
          } else {
            emitter.on(name, listener);
          }
        } else if (typeof emitter.addEventListener === "function") {
          emitter.addEventListener(name, function wrapListener(arg) {
            if (flags.once) {
              emitter.removeEventListener(name, wrapListener);
            }
            listener(arg);
          });
        } else {
          throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
        }
      }
    }
  });

  // node_modules/.deno/preact@10.26.4/node_modules/preact/dist/preact.module.js
  var n;
  var l;
  var t;
  var u;
  var i;
  var r;
  var o;
  var e;
  var f;
  var c;
  var s;
  var a;
  var h;
  var p = {};
  var v = [];
  var y = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
  var d = Array.isArray;
  function w(n2, l5) {
    for (var t4 in l5) n2[t4] = l5[t4];
    return n2;
  }
  function g(n2) {
    n2 && n2.parentNode && n2.parentNode.removeChild(n2);
  }
  function _(l5, t4, u3) {
    var i4, r4, o4, e4 = {};
    for (o4 in t4) "key" == o4 ? i4 = t4[o4] : "ref" == o4 ? r4 = t4[o4] : e4[o4] = t4[o4];
    if (arguments.length > 2 && (e4.children = arguments.length > 3 ? n.call(arguments, 2) : u3), "function" == typeof l5 && null != l5.defaultProps) for (o4 in l5.defaultProps) void 0 === e4[o4] && (e4[o4] = l5.defaultProps[o4]);
    return m(l5, e4, i4, r4, null);
  }
  function m(n2, u3, i4, r4, o4) {
    var e4 = { type: n2, props: u3, key: i4, ref: r4, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: null == o4 ? ++t : o4, __i: -1, __u: 0 };
    return null == o4 && null != l.vnode && l.vnode(e4), e4;
  }
  function k(n2) {
    return n2.children;
  }
  function x(n2, l5) {
    this.props = n2, this.context = l5;
  }
  function S(n2, l5) {
    if (null == l5) return n2.__ ? S(n2.__, n2.__i + 1) : null;
    for (var t4; l5 < n2.__k.length; l5++) if (null != (t4 = n2.__k[l5]) && null != t4.__e) return t4.__e;
    return "function" == typeof n2.type ? S(n2) : null;
  }
  function C(n2) {
    var l5, t4;
    if (null != (n2 = n2.__) && null != n2.__c) {
      for (n2.__e = n2.__c.base = null, l5 = 0; l5 < n2.__k.length; l5++) if (null != (t4 = n2.__k[l5]) && null != t4.__e) {
        n2.__e = n2.__c.base = t4.__e;
        break;
      }
      return C(n2);
    }
  }
  function M(n2) {
    (!n2.__d && (n2.__d = true) && i.push(n2) && !$.__r++ || r !== l.debounceRendering) && ((r = l.debounceRendering) || o)($);
  }
  function $() {
    for (var n2, t4, u3, r4, o4, f4, c5, s5 = 1; i.length; ) i.length > s5 && i.sort(e), n2 = i.shift(), s5 = i.length, n2.__d && (u3 = void 0, o4 = (r4 = (t4 = n2).__v).__e, f4 = [], c5 = [], t4.__P && ((u3 = w({}, r4)).__v = r4.__v + 1, l.vnode && l.vnode(u3), O(t4.__P, u3, r4, t4.__n, t4.__P.namespaceURI, 32 & r4.__u ? [o4] : null, f4, null == o4 ? S(r4) : o4, !!(32 & r4.__u), c5), u3.__v = r4.__v, u3.__.__k[u3.__i] = u3, z(f4, u3, c5), u3.__e != o4 && C(u3)));
    $.__r = 0;
  }
  function I(n2, l5, t4, u3, i4, r4, o4, e4, f4, c5, s5) {
    var a5, h4, y4, d4, w4, g3, _2 = u3 && u3.__k || v, m4 = l5.length;
    for (f4 = P(t4, l5, _2, f4, m4), a5 = 0; a5 < m4; a5++) null != (y4 = t4.__k[a5]) && (h4 = -1 === y4.__i ? p : _2[y4.__i] || p, y4.__i = a5, g3 = O(n2, y4, h4, i4, r4, o4, e4, f4, c5, s5), d4 = y4.__e, y4.ref && h4.ref != y4.ref && (h4.ref && q(h4.ref, null, y4), s5.push(y4.ref, y4.__c || d4, y4)), null == w4 && null != d4 && (w4 = d4), 4 & y4.__u || h4.__k === y4.__k ? f4 = A(y4, f4, n2) : "function" == typeof y4.type && void 0 !== g3 ? f4 = g3 : d4 && (f4 = d4.nextSibling), y4.__u &= -7);
    return t4.__e = w4, f4;
  }
  function P(n2, l5, t4, u3, i4) {
    var r4, o4, e4, f4, c5, s5 = t4.length, a5 = s5, h4 = 0;
    for (n2.__k = new Array(i4), r4 = 0; r4 < i4; r4++) null != (o4 = l5[r4]) && "boolean" != typeof o4 && "function" != typeof o4 ? (f4 = r4 + h4, (o4 = n2.__k[r4] = "string" == typeof o4 || "number" == typeof o4 || "bigint" == typeof o4 || o4.constructor == String ? m(null, o4, null, null, null) : d(o4) ? m(k, { children: o4 }, null, null, null) : void 0 === o4.constructor && o4.__b > 0 ? m(o4.type, o4.props, o4.key, o4.ref ? o4.ref : null, o4.__v) : o4).__ = n2, o4.__b = n2.__b + 1, e4 = null, -1 !== (c5 = o4.__i = L(o4, t4, f4, a5)) && (a5--, (e4 = t4[c5]) && (e4.__u |= 2)), null == e4 || null === e4.__v ? (-1 == c5 && (i4 > s5 ? h4-- : i4 < s5 && h4++), "function" != typeof o4.type && (o4.__u |= 4)) : c5 != f4 && (c5 == f4 - 1 ? h4-- : c5 == f4 + 1 ? h4++ : (c5 > f4 ? h4-- : h4++, o4.__u |= 4))) : n2.__k[r4] = null;
    if (a5) for (r4 = 0; r4 < s5; r4++) null != (e4 = t4[r4]) && 0 == (2 & e4.__u) && (e4.__e == u3 && (u3 = S(e4)), B(e4, e4));
    return u3;
  }
  function A(n2, l5, t4) {
    var u3, i4;
    if ("function" == typeof n2.type) {
      for (u3 = n2.__k, i4 = 0; u3 && i4 < u3.length; i4++) u3[i4] && (u3[i4].__ = n2, l5 = A(u3[i4], l5, t4));
      return l5;
    }
    n2.__e != l5 && (l5 && n2.type && !t4.contains(l5) && (l5 = S(n2)), t4.insertBefore(n2.__e, l5 || null), l5 = n2.__e);
    do {
      l5 = l5 && l5.nextSibling;
    } while (null != l5 && 8 == l5.nodeType);
    return l5;
  }
  function H(n2, l5) {
    return l5 = l5 || [], null == n2 || "boolean" == typeof n2 || (d(n2) ? n2.some(function(n3) {
      H(n3, l5);
    }) : l5.push(n2)), l5;
  }
  function L(n2, l5, t4, u3) {
    var i4, r4, o4 = n2.key, e4 = n2.type, f4 = l5[t4];
    if (null === f4 && null == n2.key || f4 && o4 == f4.key && e4 === f4.type && 0 == (2 & f4.__u)) return t4;
    if (u3 > (null != f4 && 0 == (2 & f4.__u) ? 1 : 0)) for (i4 = t4 - 1, r4 = t4 + 1; i4 >= 0 || r4 < l5.length; ) {
      if (i4 >= 0) {
        if ((f4 = l5[i4]) && 0 == (2 & f4.__u) && o4 == f4.key && e4 === f4.type) return i4;
        i4--;
      }
      if (r4 < l5.length) {
        if ((f4 = l5[r4]) && 0 == (2 & f4.__u) && o4 == f4.key && e4 === f4.type) return r4;
        r4++;
      }
    }
    return -1;
  }
  function T(n2, l5, t4) {
    "-" == l5[0] ? n2.setProperty(l5, null == t4 ? "" : t4) : n2[l5] = null == t4 ? "" : "number" != typeof t4 || y.test(l5) ? t4 : t4 + "px";
  }
  function j(n2, l5, t4, u3, i4) {
    var r4;
    n: if ("style" == l5) if ("string" == typeof t4) n2.style.cssText = t4;
    else {
      if ("string" == typeof u3 && (n2.style.cssText = u3 = ""), u3) for (l5 in u3) t4 && l5 in t4 || T(n2.style, l5, "");
      if (t4) for (l5 in t4) u3 && t4[l5] === u3[l5] || T(n2.style, l5, t4[l5]);
    }
    else if ("o" == l5[0] && "n" == l5[1]) r4 = l5 != (l5 = l5.replace(f, "$1")), l5 = l5.toLowerCase() in n2 || "onFocusOut" == l5 || "onFocusIn" == l5 ? l5.toLowerCase().slice(2) : l5.slice(2), n2.l || (n2.l = {}), n2.l[l5 + r4] = t4, t4 ? u3 ? t4.t = u3.t : (t4.t = c, n2.addEventListener(l5, r4 ? a : s, r4)) : n2.removeEventListener(l5, r4 ? a : s, r4);
    else {
      if ("http://www.w3.org/2000/svg" == i4) l5 = l5.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
      else if ("width" != l5 && "height" != l5 && "href" != l5 && "list" != l5 && "form" != l5 && "tabIndex" != l5 && "download" != l5 && "rowSpan" != l5 && "colSpan" != l5 && "role" != l5 && "popover" != l5 && l5 in n2) try {
        n2[l5] = null == t4 ? "" : t4;
        break n;
      } catch (n3) {
      }
      "function" == typeof t4 || (null == t4 || false === t4 && "-" != l5[4] ? n2.removeAttribute(l5) : n2.setAttribute(l5, "popover" == l5 && 1 == t4 ? "" : t4));
    }
  }
  function F(n2) {
    return function(t4) {
      if (this.l) {
        var u3 = this.l[t4.type + n2];
        if (null == t4.u) t4.u = c++;
        else if (t4.u < u3.t) return;
        return u3(l.event ? l.event(t4) : t4);
      }
    };
  }
  function O(n2, t4, u3, i4, r4, o4, e4, f4, c5, s5) {
    var a5, h4, p4, v4, y4, _2, m4, b2, S2, C3, M3, $3, P2, A3, H2, L2, T3, j3 = t4.type;
    if (void 0 !== t4.constructor) return null;
    128 & u3.__u && (c5 = !!(32 & u3.__u), o4 = [f4 = t4.__e = u3.__e]), (a5 = l.__b) && a5(t4);
    n: if ("function" == typeof j3) try {
      if (b2 = t4.props, S2 = "prototype" in j3 && j3.prototype.render, C3 = (a5 = j3.contextType) && i4[a5.__c], M3 = a5 ? C3 ? C3.props.value : a5.__ : i4, u3.__c ? m4 = (h4 = t4.__c = u3.__c).__ = h4.__E : (S2 ? t4.__c = h4 = new j3(b2, M3) : (t4.__c = h4 = new x(b2, M3), h4.constructor = j3, h4.render = D), C3 && C3.sub(h4), h4.props = b2, h4.state || (h4.state = {}), h4.context = M3, h4.__n = i4, p4 = h4.__d = true, h4.__h = [], h4._sb = []), S2 && null == h4.__s && (h4.__s = h4.state), S2 && null != j3.getDerivedStateFromProps && (h4.__s == h4.state && (h4.__s = w({}, h4.__s)), w(h4.__s, j3.getDerivedStateFromProps(b2, h4.__s))), v4 = h4.props, y4 = h4.state, h4.__v = t4, p4) S2 && null == j3.getDerivedStateFromProps && null != h4.componentWillMount && h4.componentWillMount(), S2 && null != h4.componentDidMount && h4.__h.push(h4.componentDidMount);
      else {
        if (S2 && null == j3.getDerivedStateFromProps && b2 !== v4 && null != h4.componentWillReceiveProps && h4.componentWillReceiveProps(b2, M3), !h4.__e && (null != h4.shouldComponentUpdate && false === h4.shouldComponentUpdate(b2, h4.__s, M3) || t4.__v == u3.__v)) {
          for (t4.__v != u3.__v && (h4.props = b2, h4.state = h4.__s, h4.__d = false), t4.__e = u3.__e, t4.__k = u3.__k, t4.__k.some(function(n3) {
            n3 && (n3.__ = t4);
          }), $3 = 0; $3 < h4._sb.length; $3++) h4.__h.push(h4._sb[$3]);
          h4._sb = [], h4.__h.length && e4.push(h4);
          break n;
        }
        null != h4.componentWillUpdate && h4.componentWillUpdate(b2, h4.__s, M3), S2 && null != h4.componentDidUpdate && h4.__h.push(function() {
          h4.componentDidUpdate(v4, y4, _2);
        });
      }
      if (h4.context = M3, h4.props = b2, h4.__P = n2, h4.__e = false, P2 = l.__r, A3 = 0, S2) {
        for (h4.state = h4.__s, h4.__d = false, P2 && P2(t4), a5 = h4.render(h4.props, h4.state, h4.context), H2 = 0; H2 < h4._sb.length; H2++) h4.__h.push(h4._sb[H2]);
        h4._sb = [];
      } else do {
        h4.__d = false, P2 && P2(t4), a5 = h4.render(h4.props, h4.state, h4.context), h4.state = h4.__s;
      } while (h4.__d && ++A3 < 25);
      h4.state = h4.__s, null != h4.getChildContext && (i4 = w(w({}, i4), h4.getChildContext())), S2 && !p4 && null != h4.getSnapshotBeforeUpdate && (_2 = h4.getSnapshotBeforeUpdate(v4, y4)), L2 = a5, null != a5 && a5.type === k && null == a5.key && (L2 = N(a5.props.children)), f4 = I(n2, d(L2) ? L2 : [L2], t4, u3, i4, r4, o4, e4, f4, c5, s5), h4.base = t4.__e, t4.__u &= -161, h4.__h.length && e4.push(h4), m4 && (h4.__E = h4.__ = null);
    } catch (n3) {
      if (t4.__v = null, c5 || null != o4) if (n3.then) {
        for (t4.__u |= c5 ? 160 : 128; f4 && 8 == f4.nodeType && f4.nextSibling; ) f4 = f4.nextSibling;
        o4[o4.indexOf(f4)] = null, t4.__e = f4;
      } else for (T3 = o4.length; T3--; ) g(o4[T3]);
      else t4.__e = u3.__e, t4.__k = u3.__k;
      l.__e(n3, t4, u3);
    }
    else null == o4 && t4.__v == u3.__v ? (t4.__k = u3.__k, t4.__e = u3.__e) : f4 = t4.__e = V(u3.__e, t4, u3, i4, r4, o4, e4, c5, s5);
    return (a5 = l.diffed) && a5(t4), 128 & t4.__u ? void 0 : f4;
  }
  function z(n2, t4, u3) {
    for (var i4 = 0; i4 < u3.length; i4++) q(u3[i4], u3[++i4], u3[++i4]);
    l.__c && l.__c(t4, n2), n2.some(function(t5) {
      try {
        n2 = t5.__h, t5.__h = [], n2.some(function(n3) {
          n3.call(t5);
        });
      } catch (n3) {
        l.__e(n3, t5.__v);
      }
    });
  }
  function N(n2) {
    return "object" != typeof n2 || null == n2 ? n2 : d(n2) ? n2.map(N) : w({}, n2);
  }
  function V(t4, u3, i4, r4, o4, e4, f4, c5, s5) {
    var a5, h4, v4, y4, w4, _2, m4, b2 = i4.props, k4 = u3.props, x3 = u3.type;
    if ("svg" == x3 ? o4 = "http://www.w3.org/2000/svg" : "math" == x3 ? o4 = "http://www.w3.org/1998/Math/MathML" : o4 || (o4 = "http://www.w3.org/1999/xhtml"), null != e4) {
      for (a5 = 0; a5 < e4.length; a5++) if ((w4 = e4[a5]) && "setAttribute" in w4 == !!x3 && (x3 ? w4.localName == x3 : 3 == w4.nodeType)) {
        t4 = w4, e4[a5] = null;
        break;
      }
    }
    if (null == t4) {
      if (null == x3) return document.createTextNode(k4);
      t4 = document.createElementNS(o4, x3, k4.is && k4), c5 && (l.__m && l.__m(u3, e4), c5 = false), e4 = null;
    }
    if (null === x3) b2 === k4 || c5 && t4.data === k4 || (t4.data = k4);
    else {
      if (e4 = e4 && n.call(t4.childNodes), b2 = i4.props || p, !c5 && null != e4) for (b2 = {}, a5 = 0; a5 < t4.attributes.length; a5++) b2[(w4 = t4.attributes[a5]).name] = w4.value;
      for (a5 in b2) if (w4 = b2[a5], "children" == a5) ;
      else if ("dangerouslySetInnerHTML" == a5) v4 = w4;
      else if (!(a5 in k4)) {
        if ("value" == a5 && "defaultValue" in k4 || "checked" == a5 && "defaultChecked" in k4) continue;
        j(t4, a5, null, w4, o4);
      }
      for (a5 in k4) w4 = k4[a5], "children" == a5 ? y4 = w4 : "dangerouslySetInnerHTML" == a5 ? h4 = w4 : "value" == a5 ? _2 = w4 : "checked" == a5 ? m4 = w4 : c5 && "function" != typeof w4 || b2[a5] === w4 || j(t4, a5, w4, b2[a5], o4);
      if (h4) c5 || v4 && (h4.__html === v4.__html || h4.__html === t4.innerHTML) || (t4.innerHTML = h4.__html), u3.__k = [];
      else if (v4 && (t4.innerHTML = ""), I("template" === u3.type ? t4.content : t4, d(y4) ? y4 : [y4], u3, i4, r4, "foreignObject" == x3 ? "http://www.w3.org/1999/xhtml" : o4, e4, f4, e4 ? e4[0] : i4.__k && S(i4, 0), c5, s5), null != e4) for (a5 = e4.length; a5--; ) g(e4[a5]);
      c5 || (a5 = "value", "progress" == x3 && null == _2 ? t4.removeAttribute("value") : void 0 !== _2 && (_2 !== t4[a5] || "progress" == x3 && !_2 || "option" == x3 && _2 !== b2[a5]) && j(t4, a5, _2, b2[a5], o4), a5 = "checked", void 0 !== m4 && m4 !== t4[a5] && j(t4, a5, m4, b2[a5], o4));
    }
    return t4;
  }
  function q(n2, t4, u3) {
    try {
      if ("function" == typeof n2) {
        var i4 = "function" == typeof n2.__u;
        i4 && n2.__u(), i4 && null == t4 || (n2.__u = n2(t4));
      } else n2.current = t4;
    } catch (n3) {
      l.__e(n3, u3);
    }
  }
  function B(n2, t4, u3) {
    var i4, r4;
    if (l.unmount && l.unmount(n2), (i4 = n2.ref) && (i4.current && i4.current !== n2.__e || q(i4, null, t4)), null != (i4 = n2.__c)) {
      if (i4.componentWillUnmount) try {
        i4.componentWillUnmount();
      } catch (n3) {
        l.__e(n3, t4);
      }
      i4.base = i4.__P = null;
    }
    if (i4 = n2.__k) for (r4 = 0; r4 < i4.length; r4++) i4[r4] && B(i4[r4], t4, u3 || "function" != typeof n2.type);
    u3 || g(n2.__e), n2.__c = n2.__ = n2.__e = void 0;
  }
  function D(n2, l5, t4) {
    return this.constructor(n2, t4);
  }
  function E(t4, u3, i4) {
    var r4, o4, e4, f4;
    u3 == document && (u3 = document.documentElement), l.__ && l.__(t4, u3), o4 = (r4 = "function" == typeof i4) ? null : i4 && i4.__k || u3.__k, e4 = [], f4 = [], O(u3, t4 = (!r4 && i4 || u3).__k = _(k, null, [t4]), o4 || p, p, u3.namespaceURI, !r4 && i4 ? [i4] : o4 ? null : u3.firstChild ? n.call(u3.childNodes) : null, e4, !r4 && i4 ? i4 : o4 ? o4.__e : u3.firstChild, r4, f4), z(e4, t4, f4);
  }
  function J(l5, t4, u3) {
    var i4, r4, o4, e4, f4 = w({}, l5.props);
    for (o4 in l5.type && l5.type.defaultProps && (e4 = l5.type.defaultProps), t4) "key" == o4 ? i4 = t4[o4] : "ref" == o4 ? r4 = t4[o4] : f4[o4] = void 0 === t4[o4] && void 0 !== e4 ? e4[o4] : t4[o4];
    return arguments.length > 2 && (f4.children = arguments.length > 3 ? n.call(arguments, 2) : u3), m(l5.type, f4, i4 || l5.key, r4 || l5.ref, null);
  }
  function K(n2) {
    function l5(n3) {
      var t4, u3;
      return this.getChildContext || (t4 = /* @__PURE__ */ new Set(), (u3 = {})[l5.__c] = this, this.getChildContext = function() {
        return u3;
      }, this.componentWillUnmount = function() {
        t4 = null;
      }, this.shouldComponentUpdate = function(n4) {
        this.props.value !== n4.value && t4.forEach(function(n5) {
          n5.__e = true, M(n5);
        });
      }, this.sub = function(n4) {
        t4.add(n4);
        var l6 = n4.componentWillUnmount;
        n4.componentWillUnmount = function() {
          t4 && t4.delete(n4), l6 && l6.call(n4);
        };
      }), n3.children;
    }
    return l5.__c = "__cC" + h++, l5.__ = n2, l5.Provider = l5.__l = (l5.Consumer = function(n3, l6) {
      return n3.children(l6);
    }).contextType = l5, l5;
  }
  n = v.slice, l = { __e: function(n2, l5, t4, u3) {
    for (var i4, r4, o4; l5 = l5.__; ) if ((i4 = l5.__c) && !i4.__) try {
      if ((r4 = i4.constructor) && null != r4.getDerivedStateFromError && (i4.setState(r4.getDerivedStateFromError(n2)), o4 = i4.__d), null != i4.componentDidCatch && (i4.componentDidCatch(n2, u3 || {}), o4 = i4.__d), o4) return i4.__E = i4;
    } catch (l6) {
      n2 = l6;
    }
    throw n2;
  } }, t = 0, u = function(n2) {
    return null != n2 && null == n2.constructor;
  }, x.prototype.setState = function(n2, l5) {
    var t4;
    t4 = null != this.__s && this.__s !== this.state ? this.__s : this.__s = w({}, this.state), "function" == typeof n2 && (n2 = n2(w({}, t4), this.props)), n2 && w(t4, n2), null != n2 && this.__v && (l5 && this._sb.push(l5), M(this));
  }, x.prototype.forceUpdate = function(n2) {
    this.__v && (this.__e = true, n2 && this.__h.push(n2), M(this));
  }, x.prototype.render = k, i = [], o = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, e = function(n2, l5) {
    return n2.__v.__b - l5.__v.__b;
  }, $.__r = 0, f = /(PointerCapture)$|Capture$/i, c = 0, s = F(false), a = F(true), h = 0;

  // node_modules/.deno/preact@10.26.4/node_modules/preact/hooks/dist/hooks.module.js
  var t2;
  var r2;
  var u2;
  var i2;
  var o2 = 0;
  var f2 = [];
  var c2 = l;
  var e2 = c2.__b;
  var a2 = c2.__r;
  var v2 = c2.diffed;
  var l2 = c2.__c;
  var m2 = c2.unmount;
  var s2 = c2.__;
  function p2(n2, t4) {
    c2.__h && c2.__h(r2, n2, o2 || t4), o2 = 0;
    var u3 = r2.__H || (r2.__H = { __: [], __h: [] });
    return n2 >= u3.__.length && u3.__.push({}), u3.__[n2];
  }
  function d2(n2) {
    return o2 = 1, h2(D2, n2);
  }
  function h2(n2, u3, i4) {
    var o4 = p2(t2++, 2);
    if (o4.t = n2, !o4.__c && (o4.__ = [i4 ? i4(u3) : D2(void 0, u3), function(n3) {
      var t4 = o4.__N ? o4.__N[0] : o4.__[0], r4 = o4.t(t4, n3);
      t4 !== r4 && (o4.__N = [r4, o4.__[1]], o4.__c.setState({}));
    }], o4.__c = r2, !r2.__f)) {
      var f4 = function(n3, t4, r4) {
        if (!o4.__c.__H) return true;
        var u4 = o4.__c.__H.__.filter(function(n4) {
          return !!n4.__c;
        });
        if (u4.every(function(n4) {
          return !n4.__N;
        })) return !c5 || c5.call(this, n3, t4, r4);
        var i5 = o4.__c.props !== n3;
        return u4.forEach(function(n4) {
          if (n4.__N) {
            var t5 = n4.__[0];
            n4.__ = n4.__N, n4.__N = void 0, t5 !== n4.__[0] && (i5 = true);
          }
        }), c5 && c5.call(this, n3, t4, r4) || i5;
      };
      r2.__f = true;
      var c5 = r2.shouldComponentUpdate, e4 = r2.componentWillUpdate;
      r2.componentWillUpdate = function(n3, t4, r4) {
        if (this.__e) {
          var u4 = c5;
          c5 = void 0, f4(n3, t4, r4), c5 = u4;
        }
        e4 && e4.call(this, n3, t4, r4);
      }, r2.shouldComponentUpdate = f4;
    }
    return o4.__N || o4.__;
  }
  function y2(n2, u3) {
    var i4 = p2(t2++, 3);
    !c2.__s && C2(i4.__H, u3) && (i4.__ = n2, i4.u = u3, r2.__H.__h.push(i4));
  }
  function A2(n2) {
    return o2 = 5, T2(function() {
      return { current: n2 };
    }, []);
  }
  function T2(n2, r4) {
    var u3 = p2(t2++, 7);
    return C2(u3.__H, r4) && (u3.__ = n2(), u3.__H = r4, u3.__h = n2), u3.__;
  }
  function j2() {
    for (var n2; n2 = f2.shift(); ) if (n2.__P && n2.__H) try {
      n2.__H.__h.forEach(z2), n2.__H.__h.forEach(B2), n2.__H.__h = [];
    } catch (t4) {
      n2.__H.__h = [], c2.__e(t4, n2.__v);
    }
  }
  c2.__b = function(n2) {
    r2 = null, e2 && e2(n2);
  }, c2.__ = function(n2, t4) {
    n2 && t4.__k && t4.__k.__m && (n2.__m = t4.__k.__m), s2 && s2(n2, t4);
  }, c2.__r = function(n2) {
    a2 && a2(n2), t2 = 0;
    var i4 = (r2 = n2.__c).__H;
    i4 && (u2 === r2 ? (i4.__h = [], r2.__h = [], i4.__.forEach(function(n3) {
      n3.__N && (n3.__ = n3.__N), n3.u = n3.__N = void 0;
    })) : (i4.__h.forEach(z2), i4.__h.forEach(B2), i4.__h = [], t2 = 0)), u2 = r2;
  }, c2.diffed = function(n2) {
    v2 && v2(n2);
    var t4 = n2.__c;
    t4 && t4.__H && (t4.__H.__h.length && (1 !== f2.push(t4) && i2 === c2.requestAnimationFrame || ((i2 = c2.requestAnimationFrame) || w2)(j2)), t4.__H.__.forEach(function(n3) {
      n3.u && (n3.__H = n3.u), n3.u = void 0;
    })), u2 = r2 = null;
  }, c2.__c = function(n2, t4) {
    t4.some(function(n3) {
      try {
        n3.__h.forEach(z2), n3.__h = n3.__h.filter(function(n4) {
          return !n4.__ || B2(n4);
        });
      } catch (r4) {
        t4.some(function(n4) {
          n4.__h && (n4.__h = []);
        }), t4 = [], c2.__e(r4, n3.__v);
      }
    }), l2 && l2(n2, t4);
  }, c2.unmount = function(n2) {
    m2 && m2(n2);
    var t4, r4 = n2.__c;
    r4 && r4.__H && (r4.__H.__.forEach(function(n3) {
      try {
        z2(n3);
      } catch (n4) {
        t4 = n4;
      }
    }), r4.__H = void 0, t4 && c2.__e(t4, r4.__v));
  };
  var k2 = "function" == typeof requestAnimationFrame;
  function w2(n2) {
    var t4, r4 = function() {
      clearTimeout(u3), k2 && cancelAnimationFrame(t4), setTimeout(n2);
    }, u3 = setTimeout(r4, 100);
    k2 && (t4 = requestAnimationFrame(r4));
  }
  function z2(n2) {
    var t4 = r2, u3 = n2.__c;
    "function" == typeof u3 && (n2.__c = void 0, u3()), r2 = t4;
  }
  function B2(n2) {
    var t4 = r2;
    n2.__c = n2.__(), r2 = t4;
  }
  function C2(n2, t4) {
    return !n2 || n2.length !== t4.length || t4.some(function(t5, r4) {
      return t5 !== n2[r4];
    });
  }
  function D2(n2, t4) {
    return "function" == typeof t4 ? t4(n2) : t4;
  }

  // node_modules/.deno/preact-router@4.1.2/node_modules/preact-router/dist/preact-router.mjs
  var a3 = {};
  function c3(n2, t4) {
    for (var r4 in t4) n2[r4] = t4[r4];
    return n2;
  }
  function s3(n2, t4, r4) {
    var i4, o4 = /(?:\?([^#]*))?(#.*)?$/, e4 = n2.match(o4), u3 = {};
    if (e4 && e4[1]) for (var f4 = e4[1].split("&"), c5 = 0; c5 < f4.length; c5++) {
      var s5 = f4[c5].split("=");
      u3[decodeURIComponent(s5[0])] = decodeURIComponent(s5.slice(1).join("="));
    }
    n2 = d3(n2.replace(o4, "")), t4 = d3(t4 || "");
    for (var h4 = Math.max(n2.length, t4.length), v4 = 0; v4 < h4; v4++) if (t4[v4] && ":" === t4[v4].charAt(0)) {
      var l5 = t4[v4].replace(/(^:|[+*?]+$)/g, ""), p4 = (t4[v4].match(/[+*?]+$/) || a3)[0] || "", m4 = ~p4.indexOf("+"), y4 = ~p4.indexOf("*"), U2 = n2[v4] || "";
      if (!U2 && !y4 && (p4.indexOf("?") < 0 || m4)) {
        i4 = false;
        break;
      }
      if (u3[l5] = decodeURIComponent(U2), m4 || y4) {
        u3[l5] = n2.slice(v4).map(decodeURIComponent).join("/");
        break;
      }
    } else if (t4[v4] !== n2[v4]) {
      i4 = false;
      break;
    }
    return (true === r4.default || false !== i4) && u3;
  }
  function h3(n2, t4) {
    return n2.rank < t4.rank ? 1 : n2.rank > t4.rank ? -1 : n2.index - t4.index;
  }
  function v3(n2, t4) {
    return n2.index = t4, n2.rank = function(n3) {
      return n3.props.default ? 0 : d3(n3.props.path).map(l3).join("");
    }(n2), n2.props;
  }
  function d3(n2) {
    return n2.replace(/(^\/+|\/+$)/g, "").split("/");
  }
  function l3(n2) {
    return ":" == n2.charAt(0) ? 1 + "*+?".indexOf(n2.charAt(n2.length - 1)) || 4 : 5;
  }
  var p3 = {};
  var m3 = [];
  var y3 = [];
  var U = null;
  var g2 = { url: R() };
  var k3 = K(g2);
  function R() {
    var n2;
    return "" + ((n2 = U && U.location ? U.location : U && U.getCurrentLocation ? U.getCurrentLocation() : "undefined" != typeof location ? location : p3).pathname || "") + (n2.search || "");
  }
  function $2(n2, t4) {
    return void 0 === t4 && (t4 = false), "string" != typeof n2 && n2.url && (t4 = n2.replace, n2 = n2.url), function(n3) {
      for (var t5 = m3.length; t5--; ) if (m3[t5].canRoute(n3)) return true;
      return false;
    }(n2) && function(n3, t5) {
      void 0 === t5 && (t5 = "push"), U && U[t5] ? U[t5](n3) : "undefined" != typeof history && history[t5 + "State"] && history[t5 + "State"](null, null, n3);
    }(n2, t4 ? "replace" : "push"), I2(n2);
  }
  function I2(n2) {
    for (var t4 = false, r4 = 0; r4 < m3.length; r4++) m3[r4].routeTo(n2) && (t4 = true);
    return t4;
  }
  function M2(n2) {
    if (n2 && n2.getAttribute) {
      var t4 = n2.getAttribute("href"), r4 = n2.getAttribute("target");
      if (t4 && t4.match(/^\//g) && (!r4 || r4.match(/^_?self$/i))) return $2(t4);
    }
  }
  function b(n2) {
    return n2.stopImmediatePropagation && n2.stopImmediatePropagation(), n2.stopPropagation && n2.stopPropagation(), n2.preventDefault(), false;
  }
  function W(n2) {
    if (!(n2.ctrlKey || n2.metaKey || n2.altKey || n2.shiftKey || n2.button)) {
      var t4 = n2.target;
      do {
        if ("a" === t4.localName && t4.getAttribute("href")) {
          if (t4.hasAttribute("data-native") || t4.hasAttribute("native")) return;
          if (M2(t4)) return b(n2);
        }
      } while (t4 = t4.parentNode);
    }
  }
  var w3 = false;
  function D3(n2) {
    n2.history && (U = n2.history), this.state = { url: n2.url || R() };
  }
  c3(D3.prototype = new x(), { shouldComponentUpdate: function(n2) {
    return true !== n2.static || n2.url !== this.props.url || n2.onChange !== this.props.onChange;
  }, canRoute: function(n2) {
    var t4 = H(this.props.children);
    return void 0 !== this.g(t4, n2);
  }, routeTo: function(n2) {
    this.setState({ url: n2 });
    var t4 = this.canRoute(n2);
    return this.p || this.forceUpdate(), t4;
  }, componentWillMount: function() {
    this.p = true;
  }, componentDidMount: function() {
    var n2 = this;
    w3 || (w3 = true, U || addEventListener("popstate", function() {
      I2(R());
    }), addEventListener("click", W)), m3.push(this), U && (this.u = U.listen(function(t4) {
      var r4 = t4.location || t4;
      n2.routeTo("" + (r4.pathname || "") + (r4.search || ""));
    })), this.p = false;
  }, componentWillUnmount: function() {
    "function" == typeof this.u && this.u(), m3.splice(m3.indexOf(this), 1);
  }, componentWillUpdate: function() {
    this.p = true;
  }, componentDidUpdate: function() {
    this.p = false;
  }, g: function(n2, t4) {
    n2 = n2.filter(v3).sort(h3);
    for (var r4 = 0; r4 < n2.length; r4++) {
      var i4 = n2[r4], o4 = s3(t4, i4.props.path, i4.props);
      if (o4) return [i4, o4];
    }
  }, render: function(n2, t4) {
    var e4, u3, f4 = n2.onChange, a5 = t4.url, s5 = this.c, h4 = this.g(H(n2.children), a5);
    if (h4 && (u3 = J(h4[0], c3(c3({ url: a5, matches: e4 = h4[1] }, e4), { key: void 0, ref: void 0 }))), a5 !== (s5 && s5.url)) {
      c3(g2, s5 = this.c = { url: a5, previous: s5 && s5.url, current: u3, path: u3 ? u3.props.path : null, matches: e4 }), s5.router = this, s5.active = u3 ? [u3] : [];
      for (var v4 = y3.length; v4--; ) y3[v4]({});
      "function" == typeof f4 && f4(s5);
    }
    return _(k3.Provider, { value: s5 }, u3);
  } });

  // src/route/root.tsx
  function Root(params) {
    return /* @__PURE__ */ _("div", null, /* @__PURE__ */ _("img", { style: { width: "100vw" }, src: "/assets/min.jpeg" }), /* @__PURE__ */ _("h2", { style: { margin: "0px", textAlign: "center" } }, /* @__PURE__ */ _("a", { href: "", onClick: () => $2("/start", true) }, ">>>\u7D9A\u3051\u308B")));
  }

  // node_modules/.deno/browser-image-compression@2.0.2/node_modules/browser-image-compression/dist/browser-image-compression.mjs
  function _mergeNamespaces(e4, t4) {
    return t4.forEach(function(t5) {
      t5 && "string" != typeof t5 && !Array.isArray(t5) && Object.keys(t5).forEach(function(r4) {
        if ("default" !== r4 && !(r4 in e4)) {
          var i4 = Object.getOwnPropertyDescriptor(t5, r4);
          Object.defineProperty(e4, r4, i4.get ? i4 : { enumerable: true, get: function() {
            return t5[r4];
          } });
        }
      });
    }), Object.freeze(e4);
  }
  function copyExifWithoutOrientation(e4, t4) {
    return new Promise(function(r4, i4) {
      let o4;
      return getApp1Segment(e4).then(function(e5) {
        try {
          return o4 = e5, r4(new Blob([t4.slice(0, 2), o4, t4.slice(2)], { type: "image/jpeg" }));
        } catch (e6) {
          return i4(e6);
        }
      }, i4);
    });
  }
  var getApp1Segment = (e4) => new Promise((t4, r4) => {
    const i4 = new FileReader();
    i4.addEventListener("load", ({ target: { result: e5 } }) => {
      const i5 = new DataView(e5);
      let o4 = 0;
      if (65496 !== i5.getUint16(o4)) return r4("not a valid JPEG");
      for (o4 += 2; ; ) {
        const a5 = i5.getUint16(o4);
        if (65498 === a5) break;
        const s5 = i5.getUint16(o4 + 2);
        if (65505 === a5 && 1165519206 === i5.getUint32(o4 + 4)) {
          const a6 = o4 + 10;
          let f4;
          switch (i5.getUint16(a6)) {
            case 18761:
              f4 = true;
              break;
            case 19789:
              f4 = false;
              break;
            default:
              return r4("TIFF header contains invalid endian");
          }
          if (42 !== i5.getUint16(a6 + 2, f4)) return r4("TIFF header contains invalid version");
          const l5 = i5.getUint32(a6 + 4, f4), c5 = a6 + l5 + 2 + 12 * i5.getUint16(a6 + l5, f4);
          for (let e6 = a6 + l5 + 2; e6 < c5; e6 += 12) {
            if (274 == i5.getUint16(e6, f4)) {
              if (3 !== i5.getUint16(e6 + 2, f4)) return r4("Orientation data type is invalid");
              if (1 !== i5.getUint32(e6 + 4, f4)) return r4("Orientation data count is invalid");
              i5.setUint16(e6 + 8, 1, f4);
              break;
            }
          }
          return t4(e5.slice(o4, o4 + 2 + s5));
        }
        o4 += 2 + s5;
      }
      return t4(new Blob());
    }), i4.readAsArrayBuffer(e4);
  });
  var e3 = {};
  var t3 = { get exports() {
    return e3;
  }, set exports(t4) {
    e3 = t4;
  } };
  !function(e4) {
    var r4, i4, UZIP2 = {};
    t3.exports = UZIP2, UZIP2.parse = function(e5, t4) {
      for (var r5 = UZIP2.bin.readUshort, i5 = UZIP2.bin.readUint, o4 = 0, a5 = {}, s5 = new Uint8Array(e5), f4 = s5.length - 4; 101010256 != i5(s5, f4); ) f4--;
      o4 = f4;
      o4 += 4;
      var l5 = r5(s5, o4 += 4);
      r5(s5, o4 += 2);
      var c5 = i5(s5, o4 += 2), u3 = i5(s5, o4 += 4);
      o4 += 4, o4 = u3;
      for (var h4 = 0; h4 < l5; h4++) {
        i5(s5, o4), o4 += 4, o4 += 4, o4 += 4, i5(s5, o4 += 4);
        c5 = i5(s5, o4 += 4);
        var d4 = i5(s5, o4 += 4), A3 = r5(s5, o4 += 4), g3 = r5(s5, o4 + 2), p4 = r5(s5, o4 + 4);
        o4 += 6;
        var m4 = i5(s5, o4 += 8);
        o4 += 4, o4 += A3 + g3 + p4, UZIP2._readLocal(s5, m4, a5, c5, d4, t4);
      }
      return a5;
    }, UZIP2._readLocal = function(e5, t4, r5, i5, o4, a5) {
      var s5 = UZIP2.bin.readUshort, f4 = UZIP2.bin.readUint;
      f4(e5, t4), s5(e5, t4 += 4), s5(e5, t4 += 2);
      var l5 = s5(e5, t4 += 2);
      f4(e5, t4 += 2), f4(e5, t4 += 4), t4 += 4;
      var c5 = s5(e5, t4 += 8), u3 = s5(e5, t4 += 2);
      t4 += 2;
      var h4 = UZIP2.bin.readUTF8(e5, t4, c5);
      if (t4 += c5, t4 += u3, a5) r5[h4] = { size: o4, csize: i5 };
      else {
        var d4 = new Uint8Array(e5.buffer, t4);
        if (0 == l5) r5[h4] = new Uint8Array(d4.buffer.slice(t4, t4 + i5));
        else {
          if (8 != l5) throw "unknown compression method: " + l5;
          var A3 = new Uint8Array(o4);
          UZIP2.inflateRaw(d4, A3), r5[h4] = A3;
        }
      }
    }, UZIP2.inflateRaw = function(e5, t4) {
      return UZIP2.F.inflate(e5, t4);
    }, UZIP2.inflate = function(e5, t4) {
      return e5[0], e5[1], UZIP2.inflateRaw(new Uint8Array(e5.buffer, e5.byteOffset + 2, e5.length - 6), t4);
    }, UZIP2.deflate = function(e5, t4) {
      null == t4 && (t4 = { level: 6 });
      var r5 = 0, i5 = new Uint8Array(50 + Math.floor(1.1 * e5.length));
      i5[r5] = 120, i5[r5 + 1] = 156, r5 += 2, r5 = UZIP2.F.deflateRaw(e5, i5, r5, t4.level);
      var o4 = UZIP2.adler(e5, 0, e5.length);
      return i5[r5 + 0] = o4 >>> 24 & 255, i5[r5 + 1] = o4 >>> 16 & 255, i5[r5 + 2] = o4 >>> 8 & 255, i5[r5 + 3] = o4 >>> 0 & 255, new Uint8Array(i5.buffer, 0, r5 + 4);
    }, UZIP2.deflateRaw = function(e5, t4) {
      null == t4 && (t4 = { level: 6 });
      var r5 = new Uint8Array(50 + Math.floor(1.1 * e5.length)), i5 = UZIP2.F.deflateRaw(e5, r5, i5, t4.level);
      return new Uint8Array(r5.buffer, 0, i5);
    }, UZIP2.encode = function(e5, t4) {
      null == t4 && (t4 = false);
      var r5 = 0, i5 = UZIP2.bin.writeUint, o4 = UZIP2.bin.writeUshort, a5 = {};
      for (var s5 in e5) {
        var f4 = !UZIP2._noNeed(s5) && !t4, l5 = e5[s5], c5 = UZIP2.crc.crc(l5, 0, l5.length);
        a5[s5] = { cpr: f4, usize: l5.length, crc: c5, file: f4 ? UZIP2.deflateRaw(l5) : l5 };
      }
      for (var s5 in a5) r5 += a5[s5].file.length + 30 + 46 + 2 * UZIP2.bin.sizeUTF8(s5);
      r5 += 22;
      var u3 = new Uint8Array(r5), h4 = 0, d4 = [];
      for (var s5 in a5) {
        var A3 = a5[s5];
        d4.push(h4), h4 = UZIP2._writeHeader(u3, h4, s5, A3, 0);
      }
      var g3 = 0, p4 = h4;
      for (var s5 in a5) {
        A3 = a5[s5];
        d4.push(h4), h4 = UZIP2._writeHeader(u3, h4, s5, A3, 1, d4[g3++]);
      }
      var m4 = h4 - p4;
      return i5(u3, h4, 101010256), h4 += 4, o4(u3, h4 += 4, g3), o4(u3, h4 += 2, g3), i5(u3, h4 += 2, m4), i5(u3, h4 += 4, p4), h4 += 4, h4 += 2, u3.buffer;
    }, UZIP2._noNeed = function(e5) {
      var t4 = e5.split(".").pop().toLowerCase();
      return -1 != "png,jpg,jpeg,zip".indexOf(t4);
    }, UZIP2._writeHeader = function(e5, t4, r5, i5, o4, a5) {
      var s5 = UZIP2.bin.writeUint, f4 = UZIP2.bin.writeUshort, l5 = i5.file;
      return s5(e5, t4, 0 == o4 ? 67324752 : 33639248), t4 += 4, 1 == o4 && (t4 += 2), f4(e5, t4, 20), f4(e5, t4 += 2, 0), f4(e5, t4 += 2, i5.cpr ? 8 : 0), s5(e5, t4 += 2, 0), s5(e5, t4 += 4, i5.crc), s5(e5, t4 += 4, l5.length), s5(e5, t4 += 4, i5.usize), f4(e5, t4 += 4, UZIP2.bin.sizeUTF8(r5)), f4(e5, t4 += 2, 0), t4 += 2, 1 == o4 && (t4 += 2, t4 += 2, s5(e5, t4 += 6, a5), t4 += 4), t4 += UZIP2.bin.writeUTF8(e5, t4, r5), 0 == o4 && (e5.set(l5, t4), t4 += l5.length), t4;
    }, UZIP2.crc = { table: function() {
      for (var e5 = new Uint32Array(256), t4 = 0; t4 < 256; t4++) {
        for (var r5 = t4, i5 = 0; i5 < 8; i5++) 1 & r5 ? r5 = 3988292384 ^ r5 >>> 1 : r5 >>>= 1;
        e5[t4] = r5;
      }
      return e5;
    }(), update: function(e5, t4, r5, i5) {
      for (var o4 = 0; o4 < i5; o4++) e5 = UZIP2.crc.table[255 & (e5 ^ t4[r5 + o4])] ^ e5 >>> 8;
      return e5;
    }, crc: function(e5, t4, r5) {
      return 4294967295 ^ UZIP2.crc.update(4294967295, e5, t4, r5);
    } }, UZIP2.adler = function(e5, t4, r5) {
      for (var i5 = 1, o4 = 0, a5 = t4, s5 = t4 + r5; a5 < s5; ) {
        for (var f4 = Math.min(a5 + 5552, s5); a5 < f4; ) o4 += i5 += e5[a5++];
        i5 %= 65521, o4 %= 65521;
      }
      return o4 << 16 | i5;
    }, UZIP2.bin = { readUshort: function(e5, t4) {
      return e5[t4] | e5[t4 + 1] << 8;
    }, writeUshort: function(e5, t4, r5) {
      e5[t4] = 255 & r5, e5[t4 + 1] = r5 >> 8 & 255;
    }, readUint: function(e5, t4) {
      return 16777216 * e5[t4 + 3] + (e5[t4 + 2] << 16 | e5[t4 + 1] << 8 | e5[t4]);
    }, writeUint: function(e5, t4, r5) {
      e5[t4] = 255 & r5, e5[t4 + 1] = r5 >> 8 & 255, e5[t4 + 2] = r5 >> 16 & 255, e5[t4 + 3] = r5 >> 24 & 255;
    }, readASCII: function(e5, t4, r5) {
      for (var i5 = "", o4 = 0; o4 < r5; o4++) i5 += String.fromCharCode(e5[t4 + o4]);
      return i5;
    }, writeASCII: function(e5, t4, r5) {
      for (var i5 = 0; i5 < r5.length; i5++) e5[t4 + i5] = r5.charCodeAt(i5);
    }, pad: function(e5) {
      return e5.length < 2 ? "0" + e5 : e5;
    }, readUTF8: function(e5, t4, r5) {
      for (var i5, o4 = "", a5 = 0; a5 < r5; a5++) o4 += "%" + UZIP2.bin.pad(e5[t4 + a5].toString(16));
      try {
        i5 = decodeURIComponent(o4);
      } catch (i6) {
        return UZIP2.bin.readASCII(e5, t4, r5);
      }
      return i5;
    }, writeUTF8: function(e5, t4, r5) {
      for (var i5 = r5.length, o4 = 0, a5 = 0; a5 < i5; a5++) {
        var s5 = r5.charCodeAt(a5);
        if (0 == (4294967168 & s5)) e5[t4 + o4] = s5, o4++;
        else if (0 == (4294965248 & s5)) e5[t4 + o4] = 192 | s5 >> 6, e5[t4 + o4 + 1] = 128 | s5 >> 0 & 63, o4 += 2;
        else if (0 == (4294901760 & s5)) e5[t4 + o4] = 224 | s5 >> 12, e5[t4 + o4 + 1] = 128 | s5 >> 6 & 63, e5[t4 + o4 + 2] = 128 | s5 >> 0 & 63, o4 += 3;
        else {
          if (0 != (4292870144 & s5)) throw "e";
          e5[t4 + o4] = 240 | s5 >> 18, e5[t4 + o4 + 1] = 128 | s5 >> 12 & 63, e5[t4 + o4 + 2] = 128 | s5 >> 6 & 63, e5[t4 + o4 + 3] = 128 | s5 >> 0 & 63, o4 += 4;
        }
      }
      return o4;
    }, sizeUTF8: function(e5) {
      for (var t4 = e5.length, r5 = 0, i5 = 0; i5 < t4; i5++) {
        var o4 = e5.charCodeAt(i5);
        if (0 == (4294967168 & o4)) r5++;
        else if (0 == (4294965248 & o4)) r5 += 2;
        else if (0 == (4294901760 & o4)) r5 += 3;
        else {
          if (0 != (4292870144 & o4)) throw "e";
          r5 += 4;
        }
      }
      return r5;
    } }, UZIP2.F = {}, UZIP2.F.deflateRaw = function(e5, t4, r5, i5) {
      var o4 = [[0, 0, 0, 0, 0], [4, 4, 8, 4, 0], [4, 5, 16, 8, 0], [4, 6, 16, 16, 0], [4, 10, 16, 32, 0], [8, 16, 32, 32, 0], [8, 16, 128, 128, 0], [8, 32, 128, 256, 0], [32, 128, 258, 1024, 1], [32, 258, 258, 4096, 1]][i5], a5 = UZIP2.F.U, s5 = UZIP2.F._goodIndex;
      UZIP2.F._hash;
      var f4 = UZIP2.F._putsE, l5 = 0, c5 = r5 << 3, u3 = 0, h4 = e5.length;
      if (0 == i5) {
        for (; l5 < h4; ) {
          f4(t4, c5, l5 + (_2 = Math.min(65535, h4 - l5)) == h4 ? 1 : 0), c5 = UZIP2.F._copyExact(e5, l5, _2, t4, c5 + 8), l5 += _2;
        }
        return c5 >>> 3;
      }
      var d4 = a5.lits, A3 = a5.strt, g3 = a5.prev, p4 = 0, m4 = 0, w4 = 0, v4 = 0, b2 = 0, y4 = 0;
      for (h4 > 2 && (A3[y4 = UZIP2.F._hash(e5, 0)] = 0), l5 = 0; l5 < h4; l5++) {
        if (b2 = y4, l5 + 1 < h4 - 2) {
          y4 = UZIP2.F._hash(e5, l5 + 1);
          var E2 = l5 + 1 & 32767;
          g3[E2] = A3[y4], A3[y4] = E2;
        }
        if (u3 <= l5) {
          (p4 > 14e3 || m4 > 26697) && h4 - l5 > 100 && (u3 < l5 && (d4[p4] = l5 - u3, p4 += 2, u3 = l5), c5 = UZIP2.F._writeBlock(l5 == h4 - 1 || u3 == h4 ? 1 : 0, d4, p4, v4, e5, w4, l5 - w4, t4, c5), p4 = m4 = v4 = 0, w4 = l5);
          var F2 = 0;
          l5 < h4 - 2 && (F2 = UZIP2.F._bestMatch(e5, l5, g3, b2, Math.min(o4[2], h4 - l5), o4[3]));
          var _2 = F2 >>> 16, B3 = 65535 & F2;
          if (0 != F2) {
            B3 = 65535 & F2;
            var U2 = s5(_2 = F2 >>> 16, a5.of0);
            a5.lhst[257 + U2]++;
            var C3 = s5(B3, a5.df0);
            a5.dhst[C3]++, v4 += a5.exb[U2] + a5.dxb[C3], d4[p4] = _2 << 23 | l5 - u3, d4[p4 + 1] = B3 << 16 | U2 << 8 | C3, p4 += 2, u3 = l5 + _2;
          } else a5.lhst[e5[l5]]++;
          m4++;
        }
      }
      for (w4 == l5 && 0 != e5.length || (u3 < l5 && (d4[p4] = l5 - u3, p4 += 2, u3 = l5), c5 = UZIP2.F._writeBlock(1, d4, p4, v4, e5, w4, l5 - w4, t4, c5), p4 = 0, m4 = 0, p4 = m4 = v4 = 0, w4 = l5); 0 != (7 & c5); ) c5++;
      return c5 >>> 3;
    }, UZIP2.F._bestMatch = function(e5, t4, r5, i5, o4, a5) {
      var s5 = 32767 & t4, f4 = r5[s5], l5 = s5 - f4 + 32768 & 32767;
      if (f4 == s5 || i5 != UZIP2.F._hash(e5, t4 - l5)) return 0;
      for (var c5 = 0, u3 = 0, h4 = Math.min(32767, t4); l5 <= h4 && 0 != --a5 && f4 != s5; ) {
        if (0 == c5 || e5[t4 + c5] == e5[t4 + c5 - l5]) {
          var d4 = UZIP2.F._howLong(e5, t4, l5);
          if (d4 > c5) {
            if (u3 = l5, (c5 = d4) >= o4) break;
            l5 + 2 < d4 && (d4 = l5 + 2);
            for (var A3 = 0, g3 = 0; g3 < d4 - 2; g3++) {
              var p4 = t4 - l5 + g3 + 32768 & 32767, m4 = p4 - r5[p4] + 32768 & 32767;
              m4 > A3 && (A3 = m4, f4 = p4);
            }
          }
        }
        l5 += (s5 = f4) - (f4 = r5[s5]) + 32768 & 32767;
      }
      return c5 << 16 | u3;
    }, UZIP2.F._howLong = function(e5, t4, r5) {
      if (e5[t4] != e5[t4 - r5] || e5[t4 + 1] != e5[t4 + 1 - r5] || e5[t4 + 2] != e5[t4 + 2 - r5]) return 0;
      var i5 = t4, o4 = Math.min(e5.length, t4 + 258);
      for (t4 += 3; t4 < o4 && e5[t4] == e5[t4 - r5]; ) t4++;
      return t4 - i5;
    }, UZIP2.F._hash = function(e5, t4) {
      return (e5[t4] << 8 | e5[t4 + 1]) + (e5[t4 + 2] << 4) & 65535;
    }, UZIP2.saved = 0, UZIP2.F._writeBlock = function(e5, t4, r5, i5, o4, a5, s5, f4, l5) {
      var c5, u3, h4, d4, A3, g3, p4, m4, w4, v4 = UZIP2.F.U, b2 = UZIP2.F._putsF, y4 = UZIP2.F._putsE;
      v4.lhst[256]++, u3 = (c5 = UZIP2.F.getTrees())[0], h4 = c5[1], d4 = c5[2], A3 = c5[3], g3 = c5[4], p4 = c5[5], m4 = c5[6], w4 = c5[7];
      var E2 = 32 + (0 == (l5 + 3 & 7) ? 0 : 8 - (l5 + 3 & 7)) + (s5 << 3), F2 = i5 + UZIP2.F.contSize(v4.fltree, v4.lhst) + UZIP2.F.contSize(v4.fdtree, v4.dhst), _2 = i5 + UZIP2.F.contSize(v4.ltree, v4.lhst) + UZIP2.F.contSize(v4.dtree, v4.dhst);
      _2 += 14 + 3 * p4 + UZIP2.F.contSize(v4.itree, v4.ihst) + (2 * v4.ihst[16] + 3 * v4.ihst[17] + 7 * v4.ihst[18]);
      for (var B3 = 0; B3 < 286; B3++) v4.lhst[B3] = 0;
      for (B3 = 0; B3 < 30; B3++) v4.dhst[B3] = 0;
      for (B3 = 0; B3 < 19; B3++) v4.ihst[B3] = 0;
      var U2 = E2 < F2 && E2 < _2 ? 0 : F2 < _2 ? 1 : 2;
      if (b2(f4, l5, e5), b2(f4, l5 + 1, U2), l5 += 3, 0 == U2) {
        for (; 0 != (7 & l5); ) l5++;
        l5 = UZIP2.F._copyExact(o4, a5, s5, f4, l5);
      } else {
        var C3, I3;
        if (1 == U2 && (C3 = v4.fltree, I3 = v4.fdtree), 2 == U2) {
          UZIP2.F.makeCodes(v4.ltree, u3), UZIP2.F.revCodes(v4.ltree, u3), UZIP2.F.makeCodes(v4.dtree, h4), UZIP2.F.revCodes(v4.dtree, h4), UZIP2.F.makeCodes(v4.itree, d4), UZIP2.F.revCodes(v4.itree, d4), C3 = v4.ltree, I3 = v4.dtree, y4(f4, l5, A3 - 257), y4(f4, l5 += 5, g3 - 1), y4(f4, l5 += 5, p4 - 4), l5 += 4;
          for (var Q = 0; Q < p4; Q++) y4(f4, l5 + 3 * Q, v4.itree[1 + (v4.ordr[Q] << 1)]);
          l5 += 3 * p4, l5 = UZIP2.F._codeTiny(m4, v4.itree, f4, l5), l5 = UZIP2.F._codeTiny(w4, v4.itree, f4, l5);
        }
        for (var M3 = a5, x3 = 0; x3 < r5; x3 += 2) {
          for (var S2 = t4[x3], R2 = S2 >>> 23, T3 = M3 + (8388607 & S2); M3 < T3; ) l5 = UZIP2.F._writeLit(o4[M3++], C3, f4, l5);
          if (0 != R2) {
            var O3 = t4[x3 + 1], P2 = O3 >> 16, H2 = O3 >> 8 & 255, L2 = 255 & O3;
            y4(f4, l5 = UZIP2.F._writeLit(257 + H2, C3, f4, l5), R2 - v4.of0[H2]), l5 += v4.exb[H2], b2(f4, l5 = UZIP2.F._writeLit(L2, I3, f4, l5), P2 - v4.df0[L2]), l5 += v4.dxb[L2], M3 += R2;
          }
        }
        l5 = UZIP2.F._writeLit(256, C3, f4, l5);
      }
      return l5;
    }, UZIP2.F._copyExact = function(e5, t4, r5, i5, o4) {
      var a5 = o4 >>> 3;
      return i5[a5] = r5, i5[a5 + 1] = r5 >>> 8, i5[a5 + 2] = 255 - i5[a5], i5[a5 + 3] = 255 - i5[a5 + 1], a5 += 4, i5.set(new Uint8Array(e5.buffer, t4, r5), a5), o4 + (r5 + 4 << 3);
    }, UZIP2.F.getTrees = function() {
      for (var e5 = UZIP2.F.U, t4 = UZIP2.F._hufTree(e5.lhst, e5.ltree, 15), r5 = UZIP2.F._hufTree(e5.dhst, e5.dtree, 15), i5 = [], o4 = UZIP2.F._lenCodes(e5.ltree, i5), a5 = [], s5 = UZIP2.F._lenCodes(e5.dtree, a5), f4 = 0; f4 < i5.length; f4 += 2) e5.ihst[i5[f4]]++;
      for (f4 = 0; f4 < a5.length; f4 += 2) e5.ihst[a5[f4]]++;
      for (var l5 = UZIP2.F._hufTree(e5.ihst, e5.itree, 7), c5 = 19; c5 > 4 && 0 == e5.itree[1 + (e5.ordr[c5 - 1] << 1)]; ) c5--;
      return [t4, r5, l5, o4, s5, c5, i5, a5];
    }, UZIP2.F.getSecond = function(e5) {
      for (var t4 = [], r5 = 0; r5 < e5.length; r5 += 2) t4.push(e5[r5 + 1]);
      return t4;
    }, UZIP2.F.nonZero = function(e5) {
      for (var t4 = "", r5 = 0; r5 < e5.length; r5 += 2) 0 != e5[r5 + 1] && (t4 += (r5 >> 1) + ",");
      return t4;
    }, UZIP2.F.contSize = function(e5, t4) {
      for (var r5 = 0, i5 = 0; i5 < t4.length; i5++) r5 += t4[i5] * e5[1 + (i5 << 1)];
      return r5;
    }, UZIP2.F._codeTiny = function(e5, t4, r5, i5) {
      for (var o4 = 0; o4 < e5.length; o4 += 2) {
        var a5 = e5[o4], s5 = e5[o4 + 1];
        i5 = UZIP2.F._writeLit(a5, t4, r5, i5);
        var f4 = 16 == a5 ? 2 : 17 == a5 ? 3 : 7;
        a5 > 15 && (UZIP2.F._putsE(r5, i5, s5, f4), i5 += f4);
      }
      return i5;
    }, UZIP2.F._lenCodes = function(e5, t4) {
      for (var r5 = e5.length; 2 != r5 && 0 == e5[r5 - 1]; ) r5 -= 2;
      for (var i5 = 0; i5 < r5; i5 += 2) {
        var o4 = e5[i5 + 1], a5 = i5 + 3 < r5 ? e5[i5 + 3] : -1, s5 = i5 + 5 < r5 ? e5[i5 + 5] : -1, f4 = 0 == i5 ? -1 : e5[i5 - 1];
        if (0 == o4 && a5 == o4 && s5 == o4) {
          for (var l5 = i5 + 5; l5 + 2 < r5 && e5[l5 + 2] == o4; ) l5 += 2;
          (c5 = Math.min(l5 + 1 - i5 >>> 1, 138)) < 11 ? t4.push(17, c5 - 3) : t4.push(18, c5 - 11), i5 += 2 * c5 - 2;
        } else if (o4 == f4 && a5 == o4 && s5 == o4) {
          for (l5 = i5 + 5; l5 + 2 < r5 && e5[l5 + 2] == o4; ) l5 += 2;
          var c5 = Math.min(l5 + 1 - i5 >>> 1, 6);
          t4.push(16, c5 - 3), i5 += 2 * c5 - 2;
        } else t4.push(o4, 0);
      }
      return r5 >>> 1;
    }, UZIP2.F._hufTree = function(e5, t4, r5) {
      var i5 = [], o4 = e5.length, a5 = t4.length, s5 = 0;
      for (s5 = 0; s5 < a5; s5 += 2) t4[s5] = 0, t4[s5 + 1] = 0;
      for (s5 = 0; s5 < o4; s5++) 0 != e5[s5] && i5.push({ lit: s5, f: e5[s5] });
      var f4 = i5.length, l5 = i5.slice(0);
      if (0 == f4) return 0;
      if (1 == f4) {
        var c5 = i5[0].lit;
        l5 = 0 == c5 ? 1 : 0;
        return t4[1 + (c5 << 1)] = 1, t4[1 + (l5 << 1)] = 1, 1;
      }
      i5.sort(function(e6, t5) {
        return e6.f - t5.f;
      });
      var u3 = i5[0], h4 = i5[1], d4 = 0, A3 = 1, g3 = 2;
      for (i5[0] = { lit: -1, f: u3.f + h4.f, l: u3, r: h4, d: 0 }; A3 != f4 - 1; ) u3 = d4 != A3 && (g3 == f4 || i5[d4].f < i5[g3].f) ? i5[d4++] : i5[g3++], h4 = d4 != A3 && (g3 == f4 || i5[d4].f < i5[g3].f) ? i5[d4++] : i5[g3++], i5[A3++] = { lit: -1, f: u3.f + h4.f, l: u3, r: h4 };
      var p4 = UZIP2.F.setDepth(i5[A3 - 1], 0);
      for (p4 > r5 && (UZIP2.F.restrictDepth(l5, r5, p4), p4 = r5), s5 = 0; s5 < f4; s5++) t4[1 + (l5[s5].lit << 1)] = l5[s5].d;
      return p4;
    }, UZIP2.F.setDepth = function(e5, t4) {
      return -1 != e5.lit ? (e5.d = t4, t4) : Math.max(UZIP2.F.setDepth(e5.l, t4 + 1), UZIP2.F.setDepth(e5.r, t4 + 1));
    }, UZIP2.F.restrictDepth = function(e5, t4, r5) {
      var i5 = 0, o4 = 1 << r5 - t4, a5 = 0;
      for (e5.sort(function(e6, t5) {
        return t5.d == e6.d ? e6.f - t5.f : t5.d - e6.d;
      }), i5 = 0; i5 < e5.length && e5[i5].d > t4; i5++) {
        var s5 = e5[i5].d;
        e5[i5].d = t4, a5 += o4 - (1 << r5 - s5);
      }
      for (a5 >>>= r5 - t4; a5 > 0; ) {
        (s5 = e5[i5].d) < t4 ? (e5[i5].d++, a5 -= 1 << t4 - s5 - 1) : i5++;
      }
      for (; i5 >= 0; i5--) e5[i5].d == t4 && a5 < 0 && (e5[i5].d--, a5++);
      0 != a5 && console.log("debt left");
    }, UZIP2.F._goodIndex = function(e5, t4) {
      var r5 = 0;
      return t4[16 | r5] <= e5 && (r5 |= 16), t4[8 | r5] <= e5 && (r5 |= 8), t4[4 | r5] <= e5 && (r5 |= 4), t4[2 | r5] <= e5 && (r5 |= 2), t4[1 | r5] <= e5 && (r5 |= 1), r5;
    }, UZIP2.F._writeLit = function(e5, t4, r5, i5) {
      return UZIP2.F._putsF(r5, i5, t4[e5 << 1]), i5 + t4[1 + (e5 << 1)];
    }, UZIP2.F.inflate = function(e5, t4) {
      var r5 = Uint8Array;
      if (3 == e5[0] && 0 == e5[1]) return t4 || new r5(0);
      var i5 = UZIP2.F, o4 = i5._bitsF, a5 = i5._bitsE, s5 = i5._decodeTiny, f4 = i5.makeCodes, l5 = i5.codes2map, c5 = i5._get17, u3 = i5.U, h4 = null == t4;
      h4 && (t4 = new r5(e5.length >>> 2 << 3));
      for (var d4, A3, g3 = 0, p4 = 0, m4 = 0, w4 = 0, v4 = 0, b2 = 0, y4 = 0, E2 = 0, F2 = 0; 0 == g3; ) if (g3 = o4(e5, F2, 1), p4 = o4(e5, F2 + 1, 2), F2 += 3, 0 != p4) {
        if (h4 && (t4 = UZIP2.F._check(t4, E2 + (1 << 17))), 1 == p4 && (d4 = u3.flmap, A3 = u3.fdmap, b2 = 511, y4 = 31), 2 == p4) {
          m4 = a5(e5, F2, 5) + 257, w4 = a5(e5, F2 + 5, 5) + 1, v4 = a5(e5, F2 + 10, 4) + 4, F2 += 14;
          for (var _2 = 0; _2 < 38; _2 += 2) u3.itree[_2] = 0, u3.itree[_2 + 1] = 0;
          var B3 = 1;
          for (_2 = 0; _2 < v4; _2++) {
            var U2 = a5(e5, F2 + 3 * _2, 3);
            u3.itree[1 + (u3.ordr[_2] << 1)] = U2, U2 > B3 && (B3 = U2);
          }
          F2 += 3 * v4, f4(u3.itree, B3), l5(u3.itree, B3, u3.imap), d4 = u3.lmap, A3 = u3.dmap, F2 = s5(u3.imap, (1 << B3) - 1, m4 + w4, e5, F2, u3.ttree);
          var C3 = i5._copyOut(u3.ttree, 0, m4, u3.ltree);
          b2 = (1 << C3) - 1;
          var I3 = i5._copyOut(u3.ttree, m4, w4, u3.dtree);
          y4 = (1 << I3) - 1, f4(u3.ltree, C3), l5(u3.ltree, C3, d4), f4(u3.dtree, I3), l5(u3.dtree, I3, A3);
        }
        for (; ; ) {
          var Q = d4[c5(e5, F2) & b2];
          F2 += 15 & Q;
          var M3 = Q >>> 4;
          if (M3 >>> 8 == 0) t4[E2++] = M3;
          else {
            if (256 == M3) break;
            var x3 = E2 + M3 - 254;
            if (M3 > 264) {
              var S2 = u3.ldef[M3 - 257];
              x3 = E2 + (S2 >>> 3) + a5(e5, F2, 7 & S2), F2 += 7 & S2;
            }
            var R2 = A3[c5(e5, F2) & y4];
            F2 += 15 & R2;
            var T3 = R2 >>> 4, O3 = u3.ddef[T3], P2 = (O3 >>> 4) + o4(e5, F2, 15 & O3);
            for (F2 += 15 & O3, h4 && (t4 = UZIP2.F._check(t4, E2 + (1 << 17))); E2 < x3; ) t4[E2] = t4[E2++ - P2], t4[E2] = t4[E2++ - P2], t4[E2] = t4[E2++ - P2], t4[E2] = t4[E2++ - P2];
            E2 = x3;
          }
        }
      } else {
        0 != (7 & F2) && (F2 += 8 - (7 & F2));
        var H2 = 4 + (F2 >>> 3), L2 = e5[H2 - 4] | e5[H2 - 3] << 8;
        h4 && (t4 = UZIP2.F._check(t4, E2 + L2)), t4.set(new r5(e5.buffer, e5.byteOffset + H2, L2), E2), F2 = H2 + L2 << 3, E2 += L2;
      }
      return t4.length == E2 ? t4 : t4.slice(0, E2);
    }, UZIP2.F._check = function(e5, t4) {
      var r5 = e5.length;
      if (t4 <= r5) return e5;
      var i5 = new Uint8Array(Math.max(r5 << 1, t4));
      return i5.set(e5, 0), i5;
    }, UZIP2.F._decodeTiny = function(e5, t4, r5, i5, o4, a5) {
      for (var s5 = UZIP2.F._bitsE, f4 = UZIP2.F._get17, l5 = 0; l5 < r5; ) {
        var c5 = e5[f4(i5, o4) & t4];
        o4 += 15 & c5;
        var u3 = c5 >>> 4;
        if (u3 <= 15) a5[l5] = u3, l5++;
        else {
          var h4 = 0, d4 = 0;
          16 == u3 ? (d4 = 3 + s5(i5, o4, 2), o4 += 2, h4 = a5[l5 - 1]) : 17 == u3 ? (d4 = 3 + s5(i5, o4, 3), o4 += 3) : 18 == u3 && (d4 = 11 + s5(i5, o4, 7), o4 += 7);
          for (var A3 = l5 + d4; l5 < A3; ) a5[l5] = h4, l5++;
        }
      }
      return o4;
    }, UZIP2.F._copyOut = function(e5, t4, r5, i5) {
      for (var o4 = 0, a5 = 0, s5 = i5.length >>> 1; a5 < r5; ) {
        var f4 = e5[a5 + t4];
        i5[a5 << 1] = 0, i5[1 + (a5 << 1)] = f4, f4 > o4 && (o4 = f4), a5++;
      }
      for (; a5 < s5; ) i5[a5 << 1] = 0, i5[1 + (a5 << 1)] = 0, a5++;
      return o4;
    }, UZIP2.F.makeCodes = function(e5, t4) {
      for (var r5, i5, o4, a5, s5 = UZIP2.F.U, f4 = e5.length, l5 = s5.bl_count, c5 = 0; c5 <= t4; c5++) l5[c5] = 0;
      for (c5 = 1; c5 < f4; c5 += 2) l5[e5[c5]]++;
      var u3 = s5.next_code;
      for (r5 = 0, l5[0] = 0, i5 = 1; i5 <= t4; i5++) r5 = r5 + l5[i5 - 1] << 1, u3[i5] = r5;
      for (o4 = 0; o4 < f4; o4 += 2) 0 != (a5 = e5[o4 + 1]) && (e5[o4] = u3[a5], u3[a5]++);
    }, UZIP2.F.codes2map = function(e5, t4, r5) {
      for (var i5 = e5.length, o4 = UZIP2.F.U.rev15, a5 = 0; a5 < i5; a5 += 2) if (0 != e5[a5 + 1]) for (var s5 = a5 >> 1, f4 = e5[a5 + 1], l5 = s5 << 4 | f4, c5 = t4 - f4, u3 = e5[a5] << c5, h4 = u3 + (1 << c5); u3 != h4; ) {
        r5[o4[u3] >>> 15 - t4] = l5, u3++;
      }
    }, UZIP2.F.revCodes = function(e5, t4) {
      for (var r5 = UZIP2.F.U.rev15, i5 = 15 - t4, o4 = 0; o4 < e5.length; o4 += 2) {
        var a5 = e5[o4] << t4 - e5[o4 + 1];
        e5[o4] = r5[a5] >>> i5;
      }
    }, UZIP2.F._putsE = function(e5, t4, r5) {
      r5 <<= 7 & t4;
      var i5 = t4 >>> 3;
      e5[i5] |= r5, e5[i5 + 1] |= r5 >>> 8;
    }, UZIP2.F._putsF = function(e5, t4, r5) {
      r5 <<= 7 & t4;
      var i5 = t4 >>> 3;
      e5[i5] |= r5, e5[i5 + 1] |= r5 >>> 8, e5[i5 + 2] |= r5 >>> 16;
    }, UZIP2.F._bitsE = function(e5, t4, r5) {
      return (e5[t4 >>> 3] | e5[1 + (t4 >>> 3)] << 8) >>> (7 & t4) & (1 << r5) - 1;
    }, UZIP2.F._bitsF = function(e5, t4, r5) {
      return (e5[t4 >>> 3] | e5[1 + (t4 >>> 3)] << 8 | e5[2 + (t4 >>> 3)] << 16) >>> (7 & t4) & (1 << r5) - 1;
    }, UZIP2.F._get17 = function(e5, t4) {
      return (e5[t4 >>> 3] | e5[1 + (t4 >>> 3)] << 8 | e5[2 + (t4 >>> 3)] << 16) >>> (7 & t4);
    }, UZIP2.F._get25 = function(e5, t4) {
      return (e5[t4 >>> 3] | e5[1 + (t4 >>> 3)] << 8 | e5[2 + (t4 >>> 3)] << 16 | e5[3 + (t4 >>> 3)] << 24) >>> (7 & t4);
    }, UZIP2.F.U = (r4 = Uint16Array, i4 = Uint32Array, { next_code: new r4(16), bl_count: new r4(16), ordr: [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], of0: [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 999, 999, 999], exb: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0], ldef: new r4(32), df0: [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 65535, 65535], dxb: [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0], ddef: new i4(32), flmap: new r4(512), fltree: [], fdmap: new r4(32), fdtree: [], lmap: new r4(32768), ltree: [], ttree: [], dmap: new r4(32768), dtree: [], imap: new r4(512), itree: [], rev15: new r4(32768), lhst: new i4(286), dhst: new i4(30), ihst: new i4(19), lits: new i4(15e3), strt: new r4(65536), prev: new r4(32768) }), function() {
      for (var e5 = UZIP2.F.U, t4 = 0; t4 < 32768; t4++) {
        var r5 = t4;
        r5 = (4278255360 & (r5 = (4042322160 & (r5 = (3435973836 & (r5 = (2863311530 & r5) >>> 1 | (1431655765 & r5) << 1)) >>> 2 | (858993459 & r5) << 2)) >>> 4 | (252645135 & r5) << 4)) >>> 8 | (16711935 & r5) << 8, e5.rev15[t4] = (r5 >>> 16 | r5 << 16) >>> 17;
      }
      function pushV(e6, t5, r6) {
        for (; 0 != t5--; ) e6.push(0, r6);
      }
      for (t4 = 0; t4 < 32; t4++) e5.ldef[t4] = e5.of0[t4] << 3 | e5.exb[t4], e5.ddef[t4] = e5.df0[t4] << 4 | e5.dxb[t4];
      pushV(e5.fltree, 144, 8), pushV(e5.fltree, 112, 9), pushV(e5.fltree, 24, 7), pushV(e5.fltree, 8, 8), UZIP2.F.makeCodes(e5.fltree, 9), UZIP2.F.codes2map(e5.fltree, 9, e5.flmap), UZIP2.F.revCodes(e5.fltree, 9), pushV(e5.fdtree, 32, 5), UZIP2.F.makeCodes(e5.fdtree, 5), UZIP2.F.codes2map(e5.fdtree, 5, e5.fdmap), UZIP2.F.revCodes(e5.fdtree, 5), pushV(e5.itree, 19, 0), pushV(e5.ltree, 286, 0), pushV(e5.dtree, 30, 0), pushV(e5.ttree, 320, 0);
    }();
  }();
  var UZIP = _mergeNamespaces({ __proto__: null, default: e3 }, [e3]);
  var UPNG = function() {
    var e4 = { nextZero(e5, t5) {
      for (; 0 != e5[t5]; ) t5++;
      return t5;
    }, readUshort: (e5, t5) => e5[t5] << 8 | e5[t5 + 1], writeUshort(e5, t5, r4) {
      e5[t5] = r4 >> 8 & 255, e5[t5 + 1] = 255 & r4;
    }, readUint: (e5, t5) => 16777216 * e5[t5] + (e5[t5 + 1] << 16 | e5[t5 + 2] << 8 | e5[t5 + 3]), writeUint(e5, t5, r4) {
      e5[t5] = r4 >> 24 & 255, e5[t5 + 1] = r4 >> 16 & 255, e5[t5 + 2] = r4 >> 8 & 255, e5[t5 + 3] = 255 & r4;
    }, readASCII(e5, t5, r4) {
      let i4 = "";
      for (let o4 = 0; o4 < r4; o4++) i4 += String.fromCharCode(e5[t5 + o4]);
      return i4;
    }, writeASCII(e5, t5, r4) {
      for (let i4 = 0; i4 < r4.length; i4++) e5[t5 + i4] = r4.charCodeAt(i4);
    }, readBytes(e5, t5, r4) {
      const i4 = [];
      for (let o4 = 0; o4 < r4; o4++) i4.push(e5[t5 + o4]);
      return i4;
    }, pad: (e5) => e5.length < 2 ? `0${e5}` : e5, readUTF8(t5, r4, i4) {
      let o4, a5 = "";
      for (let o5 = 0; o5 < i4; o5++) a5 += `%${e4.pad(t5[r4 + o5].toString(16))}`;
      try {
        o4 = decodeURIComponent(a5);
      } catch (o5) {
        return e4.readASCII(t5, r4, i4);
      }
      return o4;
    } };
    function decodeImage(t5, r4, i4, o4) {
      const a5 = r4 * i4, s5 = _getBPP(o4), f4 = Math.ceil(r4 * s5 / 8), l5 = new Uint8Array(4 * a5), c5 = new Uint32Array(l5.buffer), { ctype: u3 } = o4, { depth: h4 } = o4, d4 = e4.readUshort;
      if (6 == u3) {
        const e5 = a5 << 2;
        if (8 == h4) for (var A3 = 0; A3 < e5; A3 += 4) l5[A3] = t5[A3], l5[A3 + 1] = t5[A3 + 1], l5[A3 + 2] = t5[A3 + 2], l5[A3 + 3] = t5[A3 + 3];
        if (16 == h4) for (A3 = 0; A3 < e5; A3++) l5[A3] = t5[A3 << 1];
      } else if (2 == u3) {
        const e5 = o4.tabs.tRNS;
        if (null == e5) {
          if (8 == h4) for (A3 = 0; A3 < a5; A3++) {
            var g3 = 3 * A3;
            c5[A3] = 255 << 24 | t5[g3 + 2] << 16 | t5[g3 + 1] << 8 | t5[g3];
          }
          if (16 == h4) for (A3 = 0; A3 < a5; A3++) {
            g3 = 6 * A3;
            c5[A3] = 255 << 24 | t5[g3 + 4] << 16 | t5[g3 + 2] << 8 | t5[g3];
          }
        } else {
          var p4 = e5[0];
          const r5 = e5[1], i5 = e5[2];
          if (8 == h4) for (A3 = 0; A3 < a5; A3++) {
            var m4 = A3 << 2;
            g3 = 3 * A3;
            c5[A3] = 255 << 24 | t5[g3 + 2] << 16 | t5[g3 + 1] << 8 | t5[g3], t5[g3] == p4 && t5[g3 + 1] == r5 && t5[g3 + 2] == i5 && (l5[m4 + 3] = 0);
          }
          if (16 == h4) for (A3 = 0; A3 < a5; A3++) {
            m4 = A3 << 2, g3 = 6 * A3;
            c5[A3] = 255 << 24 | t5[g3 + 4] << 16 | t5[g3 + 2] << 8 | t5[g3], d4(t5, g3) == p4 && d4(t5, g3 + 2) == r5 && d4(t5, g3 + 4) == i5 && (l5[m4 + 3] = 0);
          }
        }
      } else if (3 == u3) {
        const e5 = o4.tabs.PLTE, s6 = o4.tabs.tRNS, c6 = s6 ? s6.length : 0;
        if (1 == h4) for (var w4 = 0; w4 < i4; w4++) {
          var v4 = w4 * f4, b2 = w4 * r4;
          for (A3 = 0; A3 < r4; A3++) {
            m4 = b2 + A3 << 2;
            var y4 = 3 * (E2 = t5[v4 + (A3 >> 3)] >> 7 - ((7 & A3) << 0) & 1);
            l5[m4] = e5[y4], l5[m4 + 1] = e5[y4 + 1], l5[m4 + 2] = e5[y4 + 2], l5[m4 + 3] = E2 < c6 ? s6[E2] : 255;
          }
        }
        if (2 == h4) for (w4 = 0; w4 < i4; w4++) for (v4 = w4 * f4, b2 = w4 * r4, A3 = 0; A3 < r4; A3++) {
          m4 = b2 + A3 << 2, y4 = 3 * (E2 = t5[v4 + (A3 >> 2)] >> 6 - ((3 & A3) << 1) & 3);
          l5[m4] = e5[y4], l5[m4 + 1] = e5[y4 + 1], l5[m4 + 2] = e5[y4 + 2], l5[m4 + 3] = E2 < c6 ? s6[E2] : 255;
        }
        if (4 == h4) for (w4 = 0; w4 < i4; w4++) for (v4 = w4 * f4, b2 = w4 * r4, A3 = 0; A3 < r4; A3++) {
          m4 = b2 + A3 << 2, y4 = 3 * (E2 = t5[v4 + (A3 >> 1)] >> 4 - ((1 & A3) << 2) & 15);
          l5[m4] = e5[y4], l5[m4 + 1] = e5[y4 + 1], l5[m4 + 2] = e5[y4 + 2], l5[m4 + 3] = E2 < c6 ? s6[E2] : 255;
        }
        if (8 == h4) for (A3 = 0; A3 < a5; A3++) {
          var E2;
          m4 = A3 << 2, y4 = 3 * (E2 = t5[A3]);
          l5[m4] = e5[y4], l5[m4 + 1] = e5[y4 + 1], l5[m4 + 2] = e5[y4 + 2], l5[m4 + 3] = E2 < c6 ? s6[E2] : 255;
        }
      } else if (4 == u3) {
        if (8 == h4) for (A3 = 0; A3 < a5; A3++) {
          m4 = A3 << 2;
          var F2 = t5[_2 = A3 << 1];
          l5[m4] = F2, l5[m4 + 1] = F2, l5[m4 + 2] = F2, l5[m4 + 3] = t5[_2 + 1];
        }
        if (16 == h4) for (A3 = 0; A3 < a5; A3++) {
          var _2;
          m4 = A3 << 2, F2 = t5[_2 = A3 << 2];
          l5[m4] = F2, l5[m4 + 1] = F2, l5[m4 + 2] = F2, l5[m4 + 3] = t5[_2 + 2];
        }
      } else if (0 == u3) for (p4 = o4.tabs.tRNS ? o4.tabs.tRNS : -1, w4 = 0; w4 < i4; w4++) {
        const e5 = w4 * f4, i5 = w4 * r4;
        if (1 == h4) for (var B3 = 0; B3 < r4; B3++) {
          var U2 = (F2 = 255 * (t5[e5 + (B3 >>> 3)] >>> 7 - (7 & B3) & 1)) == 255 * p4 ? 0 : 255;
          c5[i5 + B3] = U2 << 24 | F2 << 16 | F2 << 8 | F2;
        }
        else if (2 == h4) for (B3 = 0; B3 < r4; B3++) {
          U2 = (F2 = 85 * (t5[e5 + (B3 >>> 2)] >>> 6 - ((3 & B3) << 1) & 3)) == 85 * p4 ? 0 : 255;
          c5[i5 + B3] = U2 << 24 | F2 << 16 | F2 << 8 | F2;
        }
        else if (4 == h4) for (B3 = 0; B3 < r4; B3++) {
          U2 = (F2 = 17 * (t5[e5 + (B3 >>> 1)] >>> 4 - ((1 & B3) << 2) & 15)) == 17 * p4 ? 0 : 255;
          c5[i5 + B3] = U2 << 24 | F2 << 16 | F2 << 8 | F2;
        }
        else if (8 == h4) for (B3 = 0; B3 < r4; B3++) {
          U2 = (F2 = t5[e5 + B3]) == p4 ? 0 : 255;
          c5[i5 + B3] = U2 << 24 | F2 << 16 | F2 << 8 | F2;
        }
        else if (16 == h4) for (B3 = 0; B3 < r4; B3++) {
          F2 = t5[e5 + (B3 << 1)], U2 = d4(t5, e5 + (B3 << 1)) == p4 ? 0 : 255;
          c5[i5 + B3] = U2 << 24 | F2 << 16 | F2 << 8 | F2;
        }
      }
      return l5;
    }
    function _decompress(e5, r4, i4, o4) {
      const a5 = _getBPP(e5), s5 = Math.ceil(i4 * a5 / 8), f4 = new Uint8Array((s5 + 1 + e5.interlace) * o4);
      return r4 = e5.tabs.CgBI ? t4(r4, f4) : _inflate(r4, f4), 0 == e5.interlace ? r4 = _filterZero(r4, e5, 0, i4, o4) : 1 == e5.interlace && (r4 = function _readInterlace(e6, t5) {
        const r5 = t5.width, i5 = t5.height, o5 = _getBPP(t5), a6 = o5 >> 3, s6 = Math.ceil(r5 * o5 / 8), f5 = new Uint8Array(i5 * s6);
        let l5 = 0;
        const c5 = [0, 0, 4, 0, 2, 0, 1], u3 = [0, 4, 0, 2, 0, 1, 0], h4 = [8, 8, 8, 4, 4, 2, 2], d4 = [8, 8, 4, 4, 2, 2, 1];
        let A3 = 0;
        for (; A3 < 7; ) {
          const p4 = h4[A3], m4 = d4[A3];
          let w4 = 0, v4 = 0, b2 = c5[A3];
          for (; b2 < i5; ) b2 += p4, v4++;
          let y4 = u3[A3];
          for (; y4 < r5; ) y4 += m4, w4++;
          const E2 = Math.ceil(w4 * o5 / 8);
          _filterZero(e6, t5, l5, w4, v4);
          let F2 = 0, _2 = c5[A3];
          for (; _2 < i5; ) {
            let t6 = u3[A3], i6 = l5 + F2 * E2 << 3;
            for (; t6 < r5; ) {
              var g3;
              if (1 == o5) g3 = (g3 = e6[i6 >> 3]) >> 7 - (7 & i6) & 1, f5[_2 * s6 + (t6 >> 3)] |= g3 << 7 - ((7 & t6) << 0);
              if (2 == o5) g3 = (g3 = e6[i6 >> 3]) >> 6 - (7 & i6) & 3, f5[_2 * s6 + (t6 >> 2)] |= g3 << 6 - ((3 & t6) << 1);
              if (4 == o5) g3 = (g3 = e6[i6 >> 3]) >> 4 - (7 & i6) & 15, f5[_2 * s6 + (t6 >> 1)] |= g3 << 4 - ((1 & t6) << 2);
              if (o5 >= 8) {
                const r6 = _2 * s6 + t6 * a6;
                for (let t7 = 0; t7 < a6; t7++) f5[r6 + t7] = e6[(i6 >> 3) + t7];
              }
              i6 += o5, t6 += m4;
            }
            F2++, _2 += p4;
          }
          w4 * v4 != 0 && (l5 += v4 * (1 + E2)), A3 += 1;
        }
        return f5;
      }(r4, e5)), r4;
    }
    function _inflate(e5, r4) {
      return t4(new Uint8Array(e5.buffer, 2, e5.length - 6), r4);
    }
    var t4 = function() {
      const e5 = { H: {} };
      return e5.H.N = function(t5, r4) {
        const i4 = Uint8Array;
        let o4, a5, s5 = 0, f4 = 0, l5 = 0, c5 = 0, u3 = 0, h4 = 0, d4 = 0, A3 = 0, g3 = 0;
        if (3 == t5[0] && 0 == t5[1]) return r4 || new i4(0);
        const p4 = e5.H, m4 = p4.b, w4 = p4.e, v4 = p4.R, b2 = p4.n, y4 = p4.A, E2 = p4.Z, F2 = p4.m, _2 = null == r4;
        for (_2 && (r4 = new i4(t5.length >>> 2 << 5)); 0 == s5; ) if (s5 = m4(t5, g3, 1), f4 = m4(t5, g3 + 1, 2), g3 += 3, 0 != f4) {
          if (_2 && (r4 = e5.H.W(r4, A3 + (1 << 17))), 1 == f4 && (o4 = F2.J, a5 = F2.h, h4 = 511, d4 = 31), 2 == f4) {
            l5 = w4(t5, g3, 5) + 257, c5 = w4(t5, g3 + 5, 5) + 1, u3 = w4(t5, g3 + 10, 4) + 4, g3 += 14;
            let e6 = 1;
            for (var B3 = 0; B3 < 38; B3 += 2) F2.Q[B3] = 0, F2.Q[B3 + 1] = 0;
            for (B3 = 0; B3 < u3; B3++) {
              const r6 = w4(t5, g3 + 3 * B3, 3);
              F2.Q[1 + (F2.X[B3] << 1)] = r6, r6 > e6 && (e6 = r6);
            }
            g3 += 3 * u3, b2(F2.Q, e6), y4(F2.Q, e6, F2.u), o4 = F2.w, a5 = F2.d, g3 = v4(F2.u, (1 << e6) - 1, l5 + c5, t5, g3, F2.v);
            const r5 = p4.V(F2.v, 0, l5, F2.C);
            h4 = (1 << r5) - 1;
            const i5 = p4.V(F2.v, l5, c5, F2.D);
            d4 = (1 << i5) - 1, b2(F2.C, r5), y4(F2.C, r5, o4), b2(F2.D, i5), y4(F2.D, i5, a5);
          }
          for (; ; ) {
            const e6 = o4[E2(t5, g3) & h4];
            g3 += 15 & e6;
            const i5 = e6 >>> 4;
            if (i5 >>> 8 == 0) r4[A3++] = i5;
            else {
              if (256 == i5) break;
              {
                let e7 = A3 + i5 - 254;
                if (i5 > 264) {
                  const r5 = F2.q[i5 - 257];
                  e7 = A3 + (r5 >>> 3) + w4(t5, g3, 7 & r5), g3 += 7 & r5;
                }
                const o5 = a5[E2(t5, g3) & d4];
                g3 += 15 & o5;
                const s6 = o5 >>> 4, f5 = F2.c[s6], l6 = (f5 >>> 4) + m4(t5, g3, 15 & f5);
                for (g3 += 15 & f5; A3 < e7; ) r4[A3] = r4[A3++ - l6], r4[A3] = r4[A3++ - l6], r4[A3] = r4[A3++ - l6], r4[A3] = r4[A3++ - l6];
                A3 = e7;
              }
            }
          }
        } else {
          0 != (7 & g3) && (g3 += 8 - (7 & g3));
          const o5 = 4 + (g3 >>> 3), a6 = t5[o5 - 4] | t5[o5 - 3] << 8;
          _2 && (r4 = e5.H.W(r4, A3 + a6)), r4.set(new i4(t5.buffer, t5.byteOffset + o5, a6), A3), g3 = o5 + a6 << 3, A3 += a6;
        }
        return r4.length == A3 ? r4 : r4.slice(0, A3);
      }, e5.H.W = function(e6, t5) {
        const r4 = e6.length;
        if (t5 <= r4) return e6;
        const i4 = new Uint8Array(r4 << 1);
        return i4.set(e6, 0), i4;
      }, e5.H.R = function(t5, r4, i4, o4, a5, s5) {
        const f4 = e5.H.e, l5 = e5.H.Z;
        let c5 = 0;
        for (; c5 < i4; ) {
          const e6 = t5[l5(o4, a5) & r4];
          a5 += 15 & e6;
          const i5 = e6 >>> 4;
          if (i5 <= 15) s5[c5] = i5, c5++;
          else {
            let e7 = 0, t6 = 0;
            16 == i5 ? (t6 = 3 + f4(o4, a5, 2), a5 += 2, e7 = s5[c5 - 1]) : 17 == i5 ? (t6 = 3 + f4(o4, a5, 3), a5 += 3) : 18 == i5 && (t6 = 11 + f4(o4, a5, 7), a5 += 7);
            const r5 = c5 + t6;
            for (; c5 < r5; ) s5[c5] = e7, c5++;
          }
        }
        return a5;
      }, e5.H.V = function(e6, t5, r4, i4) {
        let o4 = 0, a5 = 0;
        const s5 = i4.length >>> 1;
        for (; a5 < r4; ) {
          const r5 = e6[a5 + t5];
          i4[a5 << 1] = 0, i4[1 + (a5 << 1)] = r5, r5 > o4 && (o4 = r5), a5++;
        }
        for (; a5 < s5; ) i4[a5 << 1] = 0, i4[1 + (a5 << 1)] = 0, a5++;
        return o4;
      }, e5.H.n = function(t5, r4) {
        const i4 = e5.H.m, o4 = t5.length;
        let a5, s5, f4;
        let l5;
        const c5 = i4.j;
        for (var u3 = 0; u3 <= r4; u3++) c5[u3] = 0;
        for (u3 = 1; u3 < o4; u3 += 2) c5[t5[u3]]++;
        const h4 = i4.K;
        for (a5 = 0, c5[0] = 0, s5 = 1; s5 <= r4; s5++) a5 = a5 + c5[s5 - 1] << 1, h4[s5] = a5;
        for (f4 = 0; f4 < o4; f4 += 2) l5 = t5[f4 + 1], 0 != l5 && (t5[f4] = h4[l5], h4[l5]++);
      }, e5.H.A = function(t5, r4, i4) {
        const o4 = t5.length, a5 = e5.H.m.r;
        for (let e6 = 0; e6 < o4; e6 += 2) if (0 != t5[e6 + 1]) {
          const o5 = e6 >> 1, s5 = t5[e6 + 1], f4 = o5 << 4 | s5, l5 = r4 - s5;
          let c5 = t5[e6] << l5;
          const u3 = c5 + (1 << l5);
          for (; c5 != u3; ) {
            i4[a5[c5] >>> 15 - r4] = f4, c5++;
          }
        }
      }, e5.H.l = function(t5, r4) {
        const i4 = e5.H.m.r, o4 = 15 - r4;
        for (let e6 = 0; e6 < t5.length; e6 += 2) {
          const a5 = t5[e6] << r4 - t5[e6 + 1];
          t5[e6] = i4[a5] >>> o4;
        }
      }, e5.H.M = function(e6, t5, r4) {
        r4 <<= 7 & t5;
        const i4 = t5 >>> 3;
        e6[i4] |= r4, e6[i4 + 1] |= r4 >>> 8;
      }, e5.H.I = function(e6, t5, r4) {
        r4 <<= 7 & t5;
        const i4 = t5 >>> 3;
        e6[i4] |= r4, e6[i4 + 1] |= r4 >>> 8, e6[i4 + 2] |= r4 >>> 16;
      }, e5.H.e = function(e6, t5, r4) {
        return (e6[t5 >>> 3] | e6[1 + (t5 >>> 3)] << 8) >>> (7 & t5) & (1 << r4) - 1;
      }, e5.H.b = function(e6, t5, r4) {
        return (e6[t5 >>> 3] | e6[1 + (t5 >>> 3)] << 8 | e6[2 + (t5 >>> 3)] << 16) >>> (7 & t5) & (1 << r4) - 1;
      }, e5.H.Z = function(e6, t5) {
        return (e6[t5 >>> 3] | e6[1 + (t5 >>> 3)] << 8 | e6[2 + (t5 >>> 3)] << 16) >>> (7 & t5);
      }, e5.H.i = function(e6, t5) {
        return (e6[t5 >>> 3] | e6[1 + (t5 >>> 3)] << 8 | e6[2 + (t5 >>> 3)] << 16 | e6[3 + (t5 >>> 3)] << 24) >>> (7 & t5);
      }, e5.H.m = function() {
        const e6 = Uint16Array, t5 = Uint32Array;
        return { K: new e6(16), j: new e6(16), X: [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], S: [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 999, 999, 999], T: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0], q: new e6(32), p: [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 65535, 65535], z: [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0], c: new t5(32), J: new e6(512), _: [], h: new e6(32), $: [], w: new e6(32768), C: [], v: [], d: new e6(32768), D: [], u: new e6(512), Q: [], r: new e6(32768), s: new t5(286), Y: new t5(30), a: new t5(19), t: new t5(15e3), k: new e6(65536), g: new e6(32768) };
      }(), function() {
        const t5 = e5.H.m;
        for (var r4 = 0; r4 < 32768; r4++) {
          let e6 = r4;
          e6 = (2863311530 & e6) >>> 1 | (1431655765 & e6) << 1, e6 = (3435973836 & e6) >>> 2 | (858993459 & e6) << 2, e6 = (4042322160 & e6) >>> 4 | (252645135 & e6) << 4, e6 = (4278255360 & e6) >>> 8 | (16711935 & e6) << 8, t5.r[r4] = (e6 >>> 16 | e6 << 16) >>> 17;
        }
        function n2(e6, t6, r5) {
          for (; 0 != t6--; ) e6.push(0, r5);
        }
        for (r4 = 0; r4 < 32; r4++) t5.q[r4] = t5.S[r4] << 3 | t5.T[r4], t5.c[r4] = t5.p[r4] << 4 | t5.z[r4];
        n2(t5._, 144, 8), n2(t5._, 112, 9), n2(t5._, 24, 7), n2(t5._, 8, 8), e5.H.n(t5._, 9), e5.H.A(t5._, 9, t5.J), e5.H.l(t5._, 9), n2(t5.$, 32, 5), e5.H.n(t5.$, 5), e5.H.A(t5.$, 5, t5.h), e5.H.l(t5.$, 5), n2(t5.Q, 19, 0), n2(t5.C, 286, 0), n2(t5.D, 30, 0), n2(t5.v, 320, 0);
      }(), e5.H.N;
    }();
    function _getBPP(e5) {
      return [1, null, 3, 1, 2, null, 4][e5.ctype] * e5.depth;
    }
    function _filterZero(e5, t5, r4, i4, o4) {
      let a5 = _getBPP(t5);
      const s5 = Math.ceil(i4 * a5 / 8);
      let f4, l5;
      a5 = Math.ceil(a5 / 8);
      let c5 = e5[r4], u3 = 0;
      if (c5 > 1 && (e5[r4] = [0, 0, 1][c5 - 2]), 3 == c5) for (u3 = a5; u3 < s5; u3++) e5[u3 + 1] = e5[u3 + 1] + (e5[u3 + 1 - a5] >>> 1) & 255;
      for (let t6 = 0; t6 < o4; t6++) if (f4 = r4 + t6 * s5, l5 = f4 + t6 + 1, c5 = e5[l5 - 1], u3 = 0, 0 == c5) for (; u3 < s5; u3++) e5[f4 + u3] = e5[l5 + u3];
      else if (1 == c5) {
        for (; u3 < a5; u3++) e5[f4 + u3] = e5[l5 + u3];
        for (; u3 < s5; u3++) e5[f4 + u3] = e5[l5 + u3] + e5[f4 + u3 - a5];
      } else if (2 == c5) for (; u3 < s5; u3++) e5[f4 + u3] = e5[l5 + u3] + e5[f4 + u3 - s5];
      else if (3 == c5) {
        for (; u3 < a5; u3++) e5[f4 + u3] = e5[l5 + u3] + (e5[f4 + u3 - s5] >>> 1);
        for (; u3 < s5; u3++) e5[f4 + u3] = e5[l5 + u3] + (e5[f4 + u3 - s5] + e5[f4 + u3 - a5] >>> 1);
      } else {
        for (; u3 < a5; u3++) e5[f4 + u3] = e5[l5 + u3] + _paeth(0, e5[f4 + u3 - s5], 0);
        for (; u3 < s5; u3++) e5[f4 + u3] = e5[l5 + u3] + _paeth(e5[f4 + u3 - a5], e5[f4 + u3 - s5], e5[f4 + u3 - a5 - s5]);
      }
      return e5;
    }
    function _paeth(e5, t5, r4) {
      const i4 = e5 + t5 - r4, o4 = i4 - e5, a5 = i4 - t5, s5 = i4 - r4;
      return o4 * o4 <= a5 * a5 && o4 * o4 <= s5 * s5 ? e5 : a5 * a5 <= s5 * s5 ? t5 : r4;
    }
    function _IHDR(t5, r4, i4) {
      i4.width = e4.readUint(t5, r4), r4 += 4, i4.height = e4.readUint(t5, r4), r4 += 4, i4.depth = t5[r4], r4++, i4.ctype = t5[r4], r4++, i4.compress = t5[r4], r4++, i4.filter = t5[r4], r4++, i4.interlace = t5[r4], r4++;
    }
    function _copyTile(e5, t5, r4, i4, o4, a5, s5, f4, l5) {
      const c5 = Math.min(t5, o4), u3 = Math.min(r4, a5);
      let h4 = 0, d4 = 0;
      for (let r5 = 0; r5 < u3; r5++) for (let a6 = 0; a6 < c5; a6++) if (s5 >= 0 && f4 >= 0 ? (h4 = r5 * t5 + a6 << 2, d4 = (f4 + r5) * o4 + s5 + a6 << 2) : (h4 = (-f4 + r5) * t5 - s5 + a6 << 2, d4 = r5 * o4 + a6 << 2), 0 == l5) i4[d4] = e5[h4], i4[d4 + 1] = e5[h4 + 1], i4[d4 + 2] = e5[h4 + 2], i4[d4 + 3] = e5[h4 + 3];
      else if (1 == l5) {
        var A3 = e5[h4 + 3] * (1 / 255), g3 = e5[h4] * A3, p4 = e5[h4 + 1] * A3, m4 = e5[h4 + 2] * A3, w4 = i4[d4 + 3] * (1 / 255), v4 = i4[d4] * w4, b2 = i4[d4 + 1] * w4, y4 = i4[d4 + 2] * w4;
        const t6 = 1 - A3, r6 = A3 + w4 * t6, o5 = 0 == r6 ? 0 : 1 / r6;
        i4[d4 + 3] = 255 * r6, i4[d4 + 0] = (g3 + v4 * t6) * o5, i4[d4 + 1] = (p4 + b2 * t6) * o5, i4[d4 + 2] = (m4 + y4 * t6) * o5;
      } else if (2 == l5) {
        A3 = e5[h4 + 3], g3 = e5[h4], p4 = e5[h4 + 1], m4 = e5[h4 + 2], w4 = i4[d4 + 3], v4 = i4[d4], b2 = i4[d4 + 1], y4 = i4[d4 + 2];
        A3 == w4 && g3 == v4 && p4 == b2 && m4 == y4 ? (i4[d4] = 0, i4[d4 + 1] = 0, i4[d4 + 2] = 0, i4[d4 + 3] = 0) : (i4[d4] = g3, i4[d4 + 1] = p4, i4[d4 + 2] = m4, i4[d4 + 3] = A3);
      } else if (3 == l5) {
        A3 = e5[h4 + 3], g3 = e5[h4], p4 = e5[h4 + 1], m4 = e5[h4 + 2], w4 = i4[d4 + 3], v4 = i4[d4], b2 = i4[d4 + 1], y4 = i4[d4 + 2];
        if (A3 == w4 && g3 == v4 && p4 == b2 && m4 == y4) continue;
        if (A3 < 220 && w4 > 20) return false;
      }
      return true;
    }
    return { decode: function decode(r4) {
      const i4 = new Uint8Array(r4);
      let o4 = 8;
      const a5 = e4, s5 = a5.readUshort, f4 = a5.readUint, l5 = { tabs: {}, frames: [] }, c5 = new Uint8Array(i4.length);
      let u3, h4 = 0, d4 = 0;
      const A3 = [137, 80, 78, 71, 13, 10, 26, 10];
      for (var g3 = 0; g3 < 8; g3++) if (i4[g3] != A3[g3]) throw "The input is not a PNG file!";
      for (; o4 < i4.length; ) {
        const e5 = a5.readUint(i4, o4);
        o4 += 4;
        const r5 = a5.readASCII(i4, o4, 4);
        if (o4 += 4, "IHDR" == r5) _IHDR(i4, o4, l5);
        else if ("iCCP" == r5) {
          for (var p4 = o4; 0 != i4[p4]; ) p4++;
          a5.readASCII(i4, o4, p4 - o4), i4[p4 + 1];
          const s6 = i4.slice(p4 + 2, o4 + e5);
          let f5 = null;
          try {
            f5 = _inflate(s6);
          } catch (e6) {
            f5 = t4(s6);
          }
          l5.tabs[r5] = f5;
        } else if ("CgBI" == r5) l5.tabs[r5] = i4.slice(o4, o4 + 4);
        else if ("IDAT" == r5) {
          for (g3 = 0; g3 < e5; g3++) c5[h4 + g3] = i4[o4 + g3];
          h4 += e5;
        } else if ("acTL" == r5) l5.tabs[r5] = { num_frames: f4(i4, o4), num_plays: f4(i4, o4 + 4) }, u3 = new Uint8Array(i4.length);
        else if ("fcTL" == r5) {
          if (0 != d4) (E2 = l5.frames[l5.frames.length - 1]).data = _decompress(l5, u3.slice(0, d4), E2.rect.width, E2.rect.height), d4 = 0;
          const e6 = { x: f4(i4, o4 + 12), y: f4(i4, o4 + 16), width: f4(i4, o4 + 4), height: f4(i4, o4 + 8) };
          let t5 = s5(i4, o4 + 22);
          t5 = s5(i4, o4 + 20) / (0 == t5 ? 100 : t5);
          const r6 = { rect: e6, delay: Math.round(1e3 * t5), dispose: i4[o4 + 24], blend: i4[o4 + 25] };
          l5.frames.push(r6);
        } else if ("fdAT" == r5) {
          for (g3 = 0; g3 < e5 - 4; g3++) u3[d4 + g3] = i4[o4 + g3 + 4];
          d4 += e5 - 4;
        } else if ("pHYs" == r5) l5.tabs[r5] = [a5.readUint(i4, o4), a5.readUint(i4, o4 + 4), i4[o4 + 8]];
        else if ("cHRM" == r5) {
          l5.tabs[r5] = [];
          for (g3 = 0; g3 < 8; g3++) l5.tabs[r5].push(a5.readUint(i4, o4 + 4 * g3));
        } else if ("tEXt" == r5 || "zTXt" == r5) {
          null == l5.tabs[r5] && (l5.tabs[r5] = {});
          var m4 = a5.nextZero(i4, o4), w4 = a5.readASCII(i4, o4, m4 - o4), v4 = o4 + e5 - m4 - 1;
          if ("tEXt" == r5) y4 = a5.readASCII(i4, m4 + 1, v4);
          else {
            var b2 = _inflate(i4.slice(m4 + 2, m4 + 2 + v4));
            y4 = a5.readUTF8(b2, 0, b2.length);
          }
          l5.tabs[r5][w4] = y4;
        } else if ("iTXt" == r5) {
          null == l5.tabs[r5] && (l5.tabs[r5] = {});
          m4 = 0, p4 = o4;
          m4 = a5.nextZero(i4, p4);
          w4 = a5.readASCII(i4, p4, m4 - p4);
          const t5 = i4[p4 = m4 + 1];
          var y4;
          i4[p4 + 1], p4 += 2, m4 = a5.nextZero(i4, p4), a5.readASCII(i4, p4, m4 - p4), p4 = m4 + 1, m4 = a5.nextZero(i4, p4), a5.readUTF8(i4, p4, m4 - p4);
          v4 = e5 - ((p4 = m4 + 1) - o4);
          if (0 == t5) y4 = a5.readUTF8(i4, p4, v4);
          else {
            b2 = _inflate(i4.slice(p4, p4 + v4));
            y4 = a5.readUTF8(b2, 0, b2.length);
          }
          l5.tabs[r5][w4] = y4;
        } else if ("PLTE" == r5) l5.tabs[r5] = a5.readBytes(i4, o4, e5);
        else if ("hIST" == r5) {
          const e6 = l5.tabs.PLTE.length / 3;
          l5.tabs[r5] = [];
          for (g3 = 0; g3 < e6; g3++) l5.tabs[r5].push(s5(i4, o4 + 2 * g3));
        } else if ("tRNS" == r5) 3 == l5.ctype ? l5.tabs[r5] = a5.readBytes(i4, o4, e5) : 0 == l5.ctype ? l5.tabs[r5] = s5(i4, o4) : 2 == l5.ctype && (l5.tabs[r5] = [s5(i4, o4), s5(i4, o4 + 2), s5(i4, o4 + 4)]);
        else if ("gAMA" == r5) l5.tabs[r5] = a5.readUint(i4, o4) / 1e5;
        else if ("sRGB" == r5) l5.tabs[r5] = i4[o4];
        else if ("bKGD" == r5) 0 == l5.ctype || 4 == l5.ctype ? l5.tabs[r5] = [s5(i4, o4)] : 2 == l5.ctype || 6 == l5.ctype ? l5.tabs[r5] = [s5(i4, o4), s5(i4, o4 + 2), s5(i4, o4 + 4)] : 3 == l5.ctype && (l5.tabs[r5] = i4[o4]);
        else if ("IEND" == r5) break;
        o4 += e5, a5.readUint(i4, o4), o4 += 4;
      }
      var E2;
      return 0 != d4 && ((E2 = l5.frames[l5.frames.length - 1]).data = _decompress(l5, u3.slice(0, d4), E2.rect.width, E2.rect.height)), l5.data = _decompress(l5, c5, l5.width, l5.height), delete l5.compress, delete l5.interlace, delete l5.filter, l5;
    }, toRGBA8: function toRGBA8(e5) {
      const t5 = e5.width, r4 = e5.height;
      if (null == e5.tabs.acTL) return [decodeImage(e5.data, t5, r4, e5).buffer];
      const i4 = [];
      null == e5.frames[0].data && (e5.frames[0].data = e5.data);
      const o4 = t5 * r4 * 4, a5 = new Uint8Array(o4), s5 = new Uint8Array(o4), f4 = new Uint8Array(o4);
      for (let c5 = 0; c5 < e5.frames.length; c5++) {
        const u3 = e5.frames[c5], h4 = u3.rect.x, d4 = u3.rect.y, A3 = u3.rect.width, g3 = u3.rect.height, p4 = decodeImage(u3.data, A3, g3, e5);
        if (0 != c5) for (var l5 = 0; l5 < o4; l5++) f4[l5] = a5[l5];
        if (0 == u3.blend ? _copyTile(p4, A3, g3, a5, t5, r4, h4, d4, 0) : 1 == u3.blend && _copyTile(p4, A3, g3, a5, t5, r4, h4, d4, 1), i4.push(a5.buffer.slice(0)), 0 == u3.dispose) ;
        else if (1 == u3.dispose) _copyTile(s5, A3, g3, a5, t5, r4, h4, d4, 0);
        else if (2 == u3.dispose) for (l5 = 0; l5 < o4; l5++) a5[l5] = f4[l5];
      }
      return i4;
    }, _paeth, _copyTile, _bin: e4 };
  }();
  !function() {
    const { _copyTile: e4 } = UPNG, { _bin: t4 } = UPNG, r4 = UPNG._paeth;
    var i4 = { table: function() {
      const e5 = new Uint32Array(256);
      for (let t5 = 0; t5 < 256; t5++) {
        let r5 = t5;
        for (let e6 = 0; e6 < 8; e6++) 1 & r5 ? r5 = 3988292384 ^ r5 >>> 1 : r5 >>>= 1;
        e5[t5] = r5;
      }
      return e5;
    }(), update(e5, t5, r5, o5) {
      for (let a5 = 0; a5 < o5; a5++) e5 = i4.table[255 & (e5 ^ t5[r5 + a5])] ^ e5 >>> 8;
      return e5;
    }, crc: (e5, t5, r5) => 4294967295 ^ i4.update(4294967295, e5, t5, r5) };
    function addErr(e5, t5, r5, i5) {
      t5[r5] += e5[0] * i5 >> 4, t5[r5 + 1] += e5[1] * i5 >> 4, t5[r5 + 2] += e5[2] * i5 >> 4, t5[r5 + 3] += e5[3] * i5 >> 4;
    }
    function N2(e5) {
      return Math.max(0, Math.min(255, e5));
    }
    function D4(e5, t5) {
      const r5 = e5[0] - t5[0], i5 = e5[1] - t5[1], o5 = e5[2] - t5[2], a5 = e5[3] - t5[3];
      return r5 * r5 + i5 * i5 + o5 * o5 + a5 * a5;
    }
    function dither(e5, t5, r5, i5, o5, a5, s5) {
      null == s5 && (s5 = 1);
      const f4 = i5.length, l5 = [];
      for (var c5 = 0; c5 < f4; c5++) {
        const e6 = i5[c5];
        l5.push([e6 >>> 0 & 255, e6 >>> 8 & 255, e6 >>> 16 & 255, e6 >>> 24 & 255]);
      }
      for (c5 = 0; c5 < f4; c5++) {
        let e6 = 4294967295;
        for (var u3 = 0, h4 = 0; h4 < f4; h4++) {
          var d4 = D4(l5[c5], l5[h4]);
          h4 != c5 && d4 < e6 && (e6 = d4, u3 = h4);
        }
      }
      const A3 = new Uint32Array(o5.buffer), g3 = new Int16Array(t5 * r5 * 4), p4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
      for (c5 = 0; c5 < p4.length; c5++) p4[c5] = 255 * ((p4[c5] + 0.5) / 16 - 0.5);
      for (let o6 = 0; o6 < r5; o6++) for (let w4 = 0; w4 < t5; w4++) {
        var m4;
        c5 = 4 * (o6 * t5 + w4);
        if (2 != s5) m4 = [N2(e5[c5] + g3[c5]), N2(e5[c5 + 1] + g3[c5 + 1]), N2(e5[c5 + 2] + g3[c5 + 2]), N2(e5[c5 + 3] + g3[c5 + 3])];
        else {
          d4 = p4[4 * (3 & o6) + (3 & w4)];
          m4 = [N2(e5[c5] + d4), N2(e5[c5 + 1] + d4), N2(e5[c5 + 2] + d4), N2(e5[c5 + 3] + d4)];
        }
        u3 = 0;
        let v4 = 16777215;
        for (h4 = 0; h4 < f4; h4++) {
          const e6 = D4(m4, l5[h4]);
          e6 < v4 && (v4 = e6, u3 = h4);
        }
        const b2 = l5[u3], y4 = [m4[0] - b2[0], m4[1] - b2[1], m4[2] - b2[2], m4[3] - b2[3]];
        1 == s5 && (w4 != t5 - 1 && addErr(y4, g3, c5 + 4, 7), o6 != r5 - 1 && (0 != w4 && addErr(y4, g3, c5 + 4 * t5 - 4, 3), addErr(y4, g3, c5 + 4 * t5, 5), w4 != t5 - 1 && addErr(y4, g3, c5 + 4 * t5 + 4, 1))), a5[c5 >> 2] = u3, A3[c5 >> 2] = i5[u3];
      }
    }
    function _main(e5, r5, o5, a5, s5) {
      null == s5 && (s5 = {});
      const { crc: f4 } = i4, l5 = t4.writeUint, c5 = t4.writeUshort, u3 = t4.writeASCII;
      let h4 = 8;
      const d4 = e5.frames.length > 1;
      let A3, g3 = false, p4 = 33 + (d4 ? 20 : 0);
      if (null != s5.sRGB && (p4 += 13), null != s5.pHYs && (p4 += 21), null != s5.iCCP && (A3 = pako.deflate(s5.iCCP), p4 += 21 + A3.length + 4), 3 == e5.ctype) {
        for (var m4 = e5.plte.length, w4 = 0; w4 < m4; w4++) e5.plte[w4] >>> 24 != 255 && (g3 = true);
        p4 += 8 + 3 * m4 + 4 + (g3 ? 8 + 1 * m4 + 4 : 0);
      }
      for (var v4 = 0; v4 < e5.frames.length; v4++) {
        d4 && (p4 += 38), p4 += (F2 = e5.frames[v4]).cimg.length + 12, 0 != v4 && (p4 += 4);
      }
      p4 += 12;
      const b2 = new Uint8Array(p4), y4 = [137, 80, 78, 71, 13, 10, 26, 10];
      for (w4 = 0; w4 < 8; w4++) b2[w4] = y4[w4];
      if (l5(b2, h4, 13), h4 += 4, u3(b2, h4, "IHDR"), h4 += 4, l5(b2, h4, r5), h4 += 4, l5(b2, h4, o5), h4 += 4, b2[h4] = e5.depth, h4++, b2[h4] = e5.ctype, h4++, b2[h4] = 0, h4++, b2[h4] = 0, h4++, b2[h4] = 0, h4++, l5(b2, h4, f4(b2, h4 - 17, 17)), h4 += 4, null != s5.sRGB && (l5(b2, h4, 1), h4 += 4, u3(b2, h4, "sRGB"), h4 += 4, b2[h4] = s5.sRGB, h4++, l5(b2, h4, f4(b2, h4 - 5, 5)), h4 += 4), null != s5.iCCP) {
        const e6 = 13 + A3.length;
        l5(b2, h4, e6), h4 += 4, u3(b2, h4, "iCCP"), h4 += 4, u3(b2, h4, "ICC profile"), h4 += 11, h4 += 2, b2.set(A3, h4), h4 += A3.length, l5(b2, h4, f4(b2, h4 - (e6 + 4), e6 + 4)), h4 += 4;
      }
      if (null != s5.pHYs && (l5(b2, h4, 9), h4 += 4, u3(b2, h4, "pHYs"), h4 += 4, l5(b2, h4, s5.pHYs[0]), h4 += 4, l5(b2, h4, s5.pHYs[1]), h4 += 4, b2[h4] = s5.pHYs[2], h4++, l5(b2, h4, f4(b2, h4 - 13, 13)), h4 += 4), d4 && (l5(b2, h4, 8), h4 += 4, u3(b2, h4, "acTL"), h4 += 4, l5(b2, h4, e5.frames.length), h4 += 4, l5(b2, h4, null != s5.loop ? s5.loop : 0), h4 += 4, l5(b2, h4, f4(b2, h4 - 12, 12)), h4 += 4), 3 == e5.ctype) {
        l5(b2, h4, 3 * (m4 = e5.plte.length)), h4 += 4, u3(b2, h4, "PLTE"), h4 += 4;
        for (w4 = 0; w4 < m4; w4++) {
          const t5 = 3 * w4, r6 = e5.plte[w4], i5 = 255 & r6, o6 = r6 >>> 8 & 255, a6 = r6 >>> 16 & 255;
          b2[h4 + t5 + 0] = i5, b2[h4 + t5 + 1] = o6, b2[h4 + t5 + 2] = a6;
        }
        if (h4 += 3 * m4, l5(b2, h4, f4(b2, h4 - 3 * m4 - 4, 3 * m4 + 4)), h4 += 4, g3) {
          l5(b2, h4, m4), h4 += 4, u3(b2, h4, "tRNS"), h4 += 4;
          for (w4 = 0; w4 < m4; w4++) b2[h4 + w4] = e5.plte[w4] >>> 24 & 255;
          h4 += m4, l5(b2, h4, f4(b2, h4 - m4 - 4, m4 + 4)), h4 += 4;
        }
      }
      let E2 = 0;
      for (v4 = 0; v4 < e5.frames.length; v4++) {
        var F2 = e5.frames[v4];
        d4 && (l5(b2, h4, 26), h4 += 4, u3(b2, h4, "fcTL"), h4 += 4, l5(b2, h4, E2++), h4 += 4, l5(b2, h4, F2.rect.width), h4 += 4, l5(b2, h4, F2.rect.height), h4 += 4, l5(b2, h4, F2.rect.x), h4 += 4, l5(b2, h4, F2.rect.y), h4 += 4, c5(b2, h4, a5[v4]), h4 += 2, c5(b2, h4, 1e3), h4 += 2, b2[h4] = F2.dispose, h4++, b2[h4] = F2.blend, h4++, l5(b2, h4, f4(b2, h4 - 30, 30)), h4 += 4);
        const t5 = F2.cimg;
        l5(b2, h4, (m4 = t5.length) + (0 == v4 ? 0 : 4)), h4 += 4;
        const r6 = h4;
        u3(b2, h4, 0 == v4 ? "IDAT" : "fdAT"), h4 += 4, 0 != v4 && (l5(b2, h4, E2++), h4 += 4), b2.set(t5, h4), h4 += m4, l5(b2, h4, f4(b2, r6, h4 - r6)), h4 += 4;
      }
      return l5(b2, h4, 0), h4 += 4, u3(b2, h4, "IEND"), h4 += 4, l5(b2, h4, f4(b2, h4 - 4, 4)), h4 += 4, b2.buffer;
    }
    function compressPNG(e5, t5, r5) {
      for (let i5 = 0; i5 < e5.frames.length; i5++) {
        const o5 = e5.frames[i5];
        o5.rect.width;
        const a5 = o5.rect.height, s5 = new Uint8Array(a5 * o5.bpl + a5);
        o5.cimg = _filterZero(o5.img, a5, o5.bpp, o5.bpl, s5, t5, r5);
      }
    }
    function compress2(t5, r5, i5, o5, a5) {
      const s5 = a5[0], f4 = a5[1], l5 = a5[2], c5 = a5[3], u3 = a5[4], h4 = a5[5];
      let d4 = 6, A3 = 8, g3 = 255;
      for (var p4 = 0; p4 < t5.length; p4++) {
        const e5 = new Uint8Array(t5[p4]);
        for (var m4 = e5.length, w4 = 0; w4 < m4; w4 += 4) g3 &= e5[w4 + 3];
      }
      const v4 = 255 != g3, b2 = function framize(t6, r6, i6, o6, a6, s6) {
        const f5 = [];
        for (var l6 = 0; l6 < t6.length; l6++) {
          const h6 = new Uint8Array(t6[l6]), A5 = new Uint32Array(h6.buffer);
          var c6;
          let g4 = 0, p5 = 0, m5 = r6, w5 = i6, v5 = o6 ? 1 : 0;
          if (0 != l6) {
            const b3 = s6 || o6 || 1 == l6 || 0 != f5[l6 - 2].dispose ? 1 : 2;
            let y5 = 0, E3 = 1e9;
            for (let e5 = 0; e5 < b3; e5++) {
              var u4 = new Uint8Array(t6[l6 - 1 - e5]);
              const o7 = new Uint32Array(t6[l6 - 1 - e5]);
              let s7 = r6, f6 = i6, c7 = -1, h7 = -1;
              for (let e6 = 0; e6 < i6; e6++) for (let t7 = 0; t7 < r6; t7++) {
                A5[d5 = e6 * r6 + t7] != o7[d5] && (t7 < s7 && (s7 = t7), t7 > c7 && (c7 = t7), e6 < f6 && (f6 = e6), e6 > h7 && (h7 = e6));
              }
              -1 == c7 && (s7 = f6 = c7 = h7 = 0), a6 && (1 == (1 & s7) && s7--, 1 == (1 & f6) && f6--);
              const v6 = (c7 - s7 + 1) * (h7 - f6 + 1);
              v6 < E3 && (E3 = v6, y5 = e5, g4 = s7, p5 = f6, m5 = c7 - s7 + 1, w5 = h7 - f6 + 1);
            }
            u4 = new Uint8Array(t6[l6 - 1 - y5]);
            1 == y5 && (f5[l6 - 1].dispose = 2), c6 = new Uint8Array(m5 * w5 * 4), e4(u4, r6, i6, c6, m5, w5, -g4, -p5, 0), v5 = e4(h6, r6, i6, c6, m5, w5, -g4, -p5, 3) ? 1 : 0, 1 == v5 ? _prepareDiff(h6, r6, i6, c6, { x: g4, y: p5, width: m5, height: w5 }) : e4(h6, r6, i6, c6, m5, w5, -g4, -p5, 0);
          } else c6 = h6.slice(0);
          f5.push({ rect: { x: g4, y: p5, width: m5, height: w5 }, img: c6, blend: v5, dispose: 0 });
        }
        if (o6) for (l6 = 0; l6 < f5.length; l6++) {
          if (1 == (A4 = f5[l6]).blend) continue;
          const e5 = A4.rect, o7 = f5[l6 - 1].rect, s7 = Math.min(e5.x, o7.x), c7 = Math.min(e5.y, o7.y), u5 = { x: s7, y: c7, width: Math.max(e5.x + e5.width, o7.x + o7.width) - s7, height: Math.max(e5.y + e5.height, o7.y + o7.height) - c7 };
          f5[l6 - 1].dispose = 1, l6 - 1 != 0 && _updateFrame(t6, r6, i6, f5, l6 - 1, u5, a6), _updateFrame(t6, r6, i6, f5, l6, u5, a6);
        }
        let h5 = 0;
        if (1 != t6.length) for (var d5 = 0; d5 < f5.length; d5++) {
          var A4;
          h5 += (A4 = f5[d5]).rect.width * A4.rect.height;
        }
        return f5;
      }(t5, r5, i5, s5, f4, l5), y4 = {}, E2 = [], F2 = [];
      if (0 != o5) {
        const e5 = [];
        for (w4 = 0; w4 < b2.length; w4++) e5.push(b2[w4].img.buffer);
        const t6 = function concatRGBA(e6) {
          let t7 = 0;
          for (var r7 = 0; r7 < e6.length; r7++) t7 += e6[r7].byteLength;
          const i7 = new Uint8Array(t7);
          let o6 = 0;
          for (r7 = 0; r7 < e6.length; r7++) {
            const t8 = new Uint8Array(e6[r7]), a6 = t8.length;
            for (let e7 = 0; e7 < a6; e7 += 4) {
              let r8 = t8[e7], a7 = t8[e7 + 1], s6 = t8[e7 + 2];
              const f5 = t8[e7 + 3];
              0 == f5 && (r8 = a7 = s6 = 0), i7[o6 + e7] = r8, i7[o6 + e7 + 1] = a7, i7[o6 + e7 + 2] = s6, i7[o6 + e7 + 3] = f5;
            }
            o6 += a6;
          }
          return i7.buffer;
        }(e5), r6 = quantize(t6, o5);
        for (w4 = 0; w4 < r6.plte.length; w4++) E2.push(r6.plte[w4].est.rgba);
        let i6 = 0;
        for (w4 = 0; w4 < b2.length; w4++) {
          const e6 = (B3 = b2[w4]).img.length;
          var _2 = new Uint8Array(r6.inds.buffer, i6 >> 2, e6 >> 2);
          F2.push(_2);
          const t7 = new Uint8Array(r6.abuf, i6, e6);
          h4 && dither(B3.img, B3.rect.width, B3.rect.height, E2, t7, _2), B3.img.set(t7), i6 += e6;
        }
      } else for (p4 = 0; p4 < b2.length; p4++) {
        var B3 = b2[p4];
        const e5 = new Uint32Array(B3.img.buffer);
        var U2 = B3.rect.width;
        m4 = e5.length, _2 = new Uint8Array(m4);
        F2.push(_2);
        for (w4 = 0; w4 < m4; w4++) {
          const t6 = e5[w4];
          if (0 != w4 && t6 == e5[w4 - 1]) _2[w4] = _2[w4 - 1];
          else if (w4 > U2 && t6 == e5[w4 - U2]) _2[w4] = _2[w4 - U2];
          else {
            let e6 = y4[t6];
            if (null == e6 && (y4[t6] = e6 = E2.length, E2.push(t6), E2.length >= 300)) break;
            _2[w4] = e6;
          }
        }
      }
      const C3 = E2.length;
      C3 <= 256 && 0 == u3 && (A3 = C3 <= 2 ? 1 : C3 <= 4 ? 2 : C3 <= 16 ? 4 : 8, A3 = Math.max(A3, c5));
      for (p4 = 0; p4 < b2.length; p4++) {
        (B3 = b2[p4]).rect.x, B3.rect.y;
        U2 = B3.rect.width;
        const e5 = B3.rect.height;
        let t6 = B3.img;
        new Uint32Array(t6.buffer);
        let r6 = 4 * U2, i6 = 4;
        if (C3 <= 256 && 0 == u3) {
          r6 = Math.ceil(A3 * U2 / 8);
          var I3 = new Uint8Array(r6 * e5);
          const o6 = F2[p4];
          for (let t7 = 0; t7 < e5; t7++) {
            w4 = t7 * r6;
            const e6 = t7 * U2;
            if (8 == A3) for (var Q = 0; Q < U2; Q++) I3[w4 + Q] = o6[e6 + Q];
            else if (4 == A3) for (Q = 0; Q < U2; Q++) I3[w4 + (Q >> 1)] |= o6[e6 + Q] << 4 - 4 * (1 & Q);
            else if (2 == A3) for (Q = 0; Q < U2; Q++) I3[w4 + (Q >> 2)] |= o6[e6 + Q] << 6 - 2 * (3 & Q);
            else if (1 == A3) for (Q = 0; Q < U2; Q++) I3[w4 + (Q >> 3)] |= o6[e6 + Q] << 7 - 1 * (7 & Q);
          }
          t6 = I3, d4 = 3, i6 = 1;
        } else if (0 == v4 && 1 == b2.length) {
          I3 = new Uint8Array(U2 * e5 * 3);
          const o6 = U2 * e5;
          for (w4 = 0; w4 < o6; w4++) {
            const e6 = 3 * w4, r7 = 4 * w4;
            I3[e6] = t6[r7], I3[e6 + 1] = t6[r7 + 1], I3[e6 + 2] = t6[r7 + 2];
          }
          t6 = I3, d4 = 2, i6 = 3, r6 = 3 * U2;
        }
        B3.img = t6, B3.bpl = r6, B3.bpp = i6;
      }
      return { ctype: d4, depth: A3, plte: E2, frames: b2 };
    }
    function _updateFrame(t5, r5, i5, o5, a5, s5, f4) {
      const l5 = Uint8Array, c5 = Uint32Array, u3 = new l5(t5[a5 - 1]), h4 = new c5(t5[a5 - 1]), d4 = a5 + 1 < t5.length ? new l5(t5[a5 + 1]) : null, A3 = new l5(t5[a5]), g3 = new c5(A3.buffer);
      let p4 = r5, m4 = i5, w4 = -1, v4 = -1;
      for (let e5 = 0; e5 < s5.height; e5++) for (let t6 = 0; t6 < s5.width; t6++) {
        const i6 = s5.x + t6, f5 = s5.y + e5, l6 = f5 * r5 + i6, c6 = g3[l6];
        0 == c6 || 0 == o5[a5 - 1].dispose && h4[l6] == c6 && (null == d4 || 0 != d4[4 * l6 + 3]) || (i6 < p4 && (p4 = i6), i6 > w4 && (w4 = i6), f5 < m4 && (m4 = f5), f5 > v4 && (v4 = f5));
      }
      -1 == w4 && (p4 = m4 = w4 = v4 = 0), f4 && (1 == (1 & p4) && p4--, 1 == (1 & m4) && m4--), s5 = { x: p4, y: m4, width: w4 - p4 + 1, height: v4 - m4 + 1 };
      const b2 = o5[a5];
      b2.rect = s5, b2.blend = 1, b2.img = new Uint8Array(s5.width * s5.height * 4), 0 == o5[a5 - 1].dispose ? (e4(u3, r5, i5, b2.img, s5.width, s5.height, -s5.x, -s5.y, 0), _prepareDiff(A3, r5, i5, b2.img, s5)) : e4(A3, r5, i5, b2.img, s5.width, s5.height, -s5.x, -s5.y, 0);
    }
    function _prepareDiff(t5, r5, i5, o5, a5) {
      e4(t5, r5, i5, o5, a5.width, a5.height, -a5.x, -a5.y, 2);
    }
    function _filterZero(e5, t5, r5, i5, o5, a5, s5) {
      const f4 = [];
      let l5, c5 = [0, 1, 2, 3, 4];
      -1 != a5 ? c5 = [a5] : (t5 * i5 > 5e5 || 1 == r5) && (c5 = [0]), s5 && (l5 = { level: 0 });
      const u3 = UZIP;
      for (var h4 = 0; h4 < c5.length; h4++) {
        for (let a6 = 0; a6 < t5; a6++) _filterLine(o5, e5, a6, i5, r5, c5[h4]);
        f4.push(u3.deflate(o5, l5));
      }
      let d4, A3 = 1e9;
      for (h4 = 0; h4 < f4.length; h4++) f4[h4].length < A3 && (d4 = h4, A3 = f4[h4].length);
      return f4[d4];
    }
    function _filterLine(e5, t5, i5, o5, a5, s5) {
      const f4 = i5 * o5;
      let l5 = f4 + i5;
      if (e5[l5] = s5, l5++, 0 == s5) if (o5 < 500) for (var c5 = 0; c5 < o5; c5++) e5[l5 + c5] = t5[f4 + c5];
      else e5.set(new Uint8Array(t5.buffer, f4, o5), l5);
      else if (1 == s5) {
        for (c5 = 0; c5 < a5; c5++) e5[l5 + c5] = t5[f4 + c5];
        for (c5 = a5; c5 < o5; c5++) e5[l5 + c5] = t5[f4 + c5] - t5[f4 + c5 - a5] + 256 & 255;
      } else if (0 == i5) {
        for (c5 = 0; c5 < a5; c5++) e5[l5 + c5] = t5[f4 + c5];
        if (2 == s5) for (c5 = a5; c5 < o5; c5++) e5[l5 + c5] = t5[f4 + c5];
        if (3 == s5) for (c5 = a5; c5 < o5; c5++) e5[l5 + c5] = t5[f4 + c5] - (t5[f4 + c5 - a5] >> 1) + 256 & 255;
        if (4 == s5) for (c5 = a5; c5 < o5; c5++) e5[l5 + c5] = t5[f4 + c5] - r4(t5[f4 + c5 - a5], 0, 0) + 256 & 255;
      } else {
        if (2 == s5) for (c5 = 0; c5 < o5; c5++) e5[l5 + c5] = t5[f4 + c5] + 256 - t5[f4 + c5 - o5] & 255;
        if (3 == s5) {
          for (c5 = 0; c5 < a5; c5++) e5[l5 + c5] = t5[f4 + c5] + 256 - (t5[f4 + c5 - o5] >> 1) & 255;
          for (c5 = a5; c5 < o5; c5++) e5[l5 + c5] = t5[f4 + c5] + 256 - (t5[f4 + c5 - o5] + t5[f4 + c5 - a5] >> 1) & 255;
        }
        if (4 == s5) {
          for (c5 = 0; c5 < a5; c5++) e5[l5 + c5] = t5[f4 + c5] + 256 - r4(0, t5[f4 + c5 - o5], 0) & 255;
          for (c5 = a5; c5 < o5; c5++) e5[l5 + c5] = t5[f4 + c5] + 256 - r4(t5[f4 + c5 - a5], t5[f4 + c5 - o5], t5[f4 + c5 - a5 - o5]) & 255;
        }
      }
    }
    function quantize(e5, t5) {
      const r5 = new Uint8Array(e5), i5 = r5.slice(0), o5 = new Uint32Array(i5.buffer), a5 = getKDtree(i5, t5), s5 = a5[0], f4 = a5[1], l5 = r5.length, c5 = new Uint8Array(l5 >> 2);
      let u3;
      if (r5.length < 2e7) for (var h4 = 0; h4 < l5; h4 += 4) {
        u3 = getNearest(s5, d4 = r5[h4] * (1 / 255), A3 = r5[h4 + 1] * (1 / 255), g3 = r5[h4 + 2] * (1 / 255), p4 = r5[h4 + 3] * (1 / 255)), c5[h4 >> 2] = u3.ind, o5[h4 >> 2] = u3.est.rgba;
      }
      else for (h4 = 0; h4 < l5; h4 += 4) {
        var d4 = r5[h4] * (1 / 255), A3 = r5[h4 + 1] * (1 / 255), g3 = r5[h4 + 2] * (1 / 255), p4 = r5[h4 + 3] * (1 / 255);
        for (u3 = s5; u3.left; ) u3 = planeDst(u3.est, d4, A3, g3, p4) <= 0 ? u3.left : u3.right;
        c5[h4 >> 2] = u3.ind, o5[h4 >> 2] = u3.est.rgba;
      }
      return { abuf: i5.buffer, inds: c5, plte: f4 };
    }
    function getKDtree(e5, t5, r5) {
      null == r5 && (r5 = 1e-4);
      const i5 = new Uint32Array(e5.buffer), o5 = { i0: 0, i1: e5.length, bst: null, est: null, tdst: 0, left: null, right: null };
      o5.bst = stats(e5, o5.i0, o5.i1), o5.est = estats(o5.bst);
      const a5 = [o5];
      for (; a5.length < t5; ) {
        let t6 = 0, o6 = 0;
        for (var s5 = 0; s5 < a5.length; s5++) a5[s5].est.L > t6 && (t6 = a5[s5].est.L, o6 = s5);
        if (t6 < r5) break;
        const f4 = a5[o6], l5 = splitPixels(e5, i5, f4.i0, f4.i1, f4.est.e, f4.est.eMq255);
        if (f4.i0 >= l5 || f4.i1 <= l5) {
          f4.est.L = 0;
          continue;
        }
        const c5 = { i0: f4.i0, i1: l5, bst: null, est: null, tdst: 0, left: null, right: null };
        c5.bst = stats(e5, c5.i0, c5.i1), c5.est = estats(c5.bst);
        const u3 = { i0: l5, i1: f4.i1, bst: null, est: null, tdst: 0, left: null, right: null };
        u3.bst = { R: [], m: [], N: f4.bst.N - c5.bst.N };
        for (s5 = 0; s5 < 16; s5++) u3.bst.R[s5] = f4.bst.R[s5] - c5.bst.R[s5];
        for (s5 = 0; s5 < 4; s5++) u3.bst.m[s5] = f4.bst.m[s5] - c5.bst.m[s5];
        u3.est = estats(u3.bst), f4.left = c5, f4.right = u3, a5[o6] = c5, a5.push(u3);
      }
      a5.sort((e6, t6) => t6.bst.N - e6.bst.N);
      for (s5 = 0; s5 < a5.length; s5++) a5[s5].ind = s5;
      return [o5, a5];
    }
    function getNearest(e5, t5, r5, i5, o5) {
      if (null == e5.left) return e5.tdst = function dist(e6, t6, r6, i6, o6) {
        const a6 = t6 - e6[0], s6 = r6 - e6[1], f5 = i6 - e6[2], l6 = o6 - e6[3];
        return a6 * a6 + s6 * s6 + f5 * f5 + l6 * l6;
      }(e5.est.q, t5, r5, i5, o5), e5;
      const a5 = planeDst(e5.est, t5, r5, i5, o5);
      let s5 = e5.left, f4 = e5.right;
      a5 > 0 && (s5 = e5.right, f4 = e5.left);
      const l5 = getNearest(s5, t5, r5, i5, o5);
      if (l5.tdst <= a5 * a5) return l5;
      const c5 = getNearest(f4, t5, r5, i5, o5);
      return c5.tdst < l5.tdst ? c5 : l5;
    }
    function planeDst(e5, t5, r5, i5, o5) {
      const { e: a5 } = e5;
      return a5[0] * t5 + a5[1] * r5 + a5[2] * i5 + a5[3] * o5 - e5.eMq;
    }
    function splitPixels(e5, t5, r5, i5, o5, a5) {
      for (i5 -= 4; r5 < i5; ) {
        for (; vecDot(e5, r5, o5) <= a5; ) r5 += 4;
        for (; vecDot(e5, i5, o5) > a5; ) i5 -= 4;
        if (r5 >= i5) break;
        const s5 = t5[r5 >> 2];
        t5[r5 >> 2] = t5[i5 >> 2], t5[i5 >> 2] = s5, r5 += 4, i5 -= 4;
      }
      for (; vecDot(e5, r5, o5) > a5; ) r5 -= 4;
      return r5 + 4;
    }
    function vecDot(e5, t5, r5) {
      return e5[t5] * r5[0] + e5[t5 + 1] * r5[1] + e5[t5 + 2] * r5[2] + e5[t5 + 3] * r5[3];
    }
    function stats(e5, t5, r5) {
      const i5 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], o5 = [0, 0, 0, 0], a5 = r5 - t5 >> 2;
      for (let a6 = t5; a6 < r5; a6 += 4) {
        const t6 = e5[a6] * (1 / 255), r6 = e5[a6 + 1] * (1 / 255), s5 = e5[a6 + 2] * (1 / 255), f4 = e5[a6 + 3] * (1 / 255);
        o5[0] += t6, o5[1] += r6, o5[2] += s5, o5[3] += f4, i5[0] += t6 * t6, i5[1] += t6 * r6, i5[2] += t6 * s5, i5[3] += t6 * f4, i5[5] += r6 * r6, i5[6] += r6 * s5, i5[7] += r6 * f4, i5[10] += s5 * s5, i5[11] += s5 * f4, i5[15] += f4 * f4;
      }
      return i5[4] = i5[1], i5[8] = i5[2], i5[9] = i5[6], i5[12] = i5[3], i5[13] = i5[7], i5[14] = i5[11], { R: i5, m: o5, N: a5 };
    }
    function estats(e5) {
      const { R: t5 } = e5, { m: r5 } = e5, { N: i5 } = e5, a5 = r5[0], s5 = r5[1], f4 = r5[2], l5 = r5[3], c5 = 0 == i5 ? 0 : 1 / i5, u3 = [t5[0] - a5 * a5 * c5, t5[1] - a5 * s5 * c5, t5[2] - a5 * f4 * c5, t5[3] - a5 * l5 * c5, t5[4] - s5 * a5 * c5, t5[5] - s5 * s5 * c5, t5[6] - s5 * f4 * c5, t5[7] - s5 * l5 * c5, t5[8] - f4 * a5 * c5, t5[9] - f4 * s5 * c5, t5[10] - f4 * f4 * c5, t5[11] - f4 * l5 * c5, t5[12] - l5 * a5 * c5, t5[13] - l5 * s5 * c5, t5[14] - l5 * f4 * c5, t5[15] - l5 * l5 * c5], h4 = u3, d4 = o4;
      let A3 = [Math.random(), Math.random(), Math.random(), Math.random()], g3 = 0, p4 = 0;
      if (0 != i5) for (let e6 = 0; e6 < 16 && (A3 = d4.multVec(h4, A3), p4 = Math.sqrt(d4.dot(A3, A3)), A3 = d4.sml(1 / p4, A3), !(0 != e6 && Math.abs(p4 - g3) < 1e-9)); e6++) g3 = p4;
      const m4 = [a5 * c5, s5 * c5, f4 * c5, l5 * c5];
      return { Cov: u3, q: m4, e: A3, L: g3, eMq255: d4.dot(d4.sml(255, m4), A3), eMq: d4.dot(A3, m4), rgba: (Math.round(255 * m4[3]) << 24 | Math.round(255 * m4[2]) << 16 | Math.round(255 * m4[1]) << 8 | Math.round(255 * m4[0]) << 0) >>> 0 };
    }
    var o4 = { multVec: (e5, t5) => [e5[0] * t5[0] + e5[1] * t5[1] + e5[2] * t5[2] + e5[3] * t5[3], e5[4] * t5[0] + e5[5] * t5[1] + e5[6] * t5[2] + e5[7] * t5[3], e5[8] * t5[0] + e5[9] * t5[1] + e5[10] * t5[2] + e5[11] * t5[3], e5[12] * t5[0] + e5[13] * t5[1] + e5[14] * t5[2] + e5[15] * t5[3]], dot: (e5, t5) => e5[0] * t5[0] + e5[1] * t5[1] + e5[2] * t5[2] + e5[3] * t5[3], sml: (e5, t5) => [e5 * t5[0], e5 * t5[1], e5 * t5[2], e5 * t5[3]] };
    UPNG.encode = function encode(e5, t5, r5, i5, o5, a5, s5) {
      null == i5 && (i5 = 0), null == s5 && (s5 = false);
      const f4 = compress2(e5, t5, r5, i5, [false, false, false, 0, s5, false]);
      return compressPNG(f4, -1), _main(f4, t5, r5, o5, a5);
    }, UPNG.encodeLL = function encodeLL(e5, t5, r5, i5, o5, a5, s5, f4) {
      const l5 = { ctype: 0 + (1 == i5 ? 0 : 2) + (0 == o5 ? 0 : 4), depth: a5, frames: [] }, c5 = (i5 + o5) * a5, u3 = c5 * t5;
      for (let i6 = 0; i6 < e5.length; i6++) l5.frames.push({ rect: { x: 0, y: 0, width: t5, height: r5 }, img: new Uint8Array(e5[i6]), blend: 0, dispose: 1, bpp: Math.ceil(c5 / 8), bpl: Math.ceil(u3 / 8) });
      return compressPNG(l5, 0, true), _main(l5, t5, r5, s5, f4);
    }, UPNG.encode.compress = compress2, UPNG.encode.dither = dither, UPNG.quantize = quantize, UPNG.quantize.getKDtree = getKDtree, UPNG.quantize.getNearest = getNearest;
  }();
  var r3 = { toArrayBuffer(e4, t4) {
    const i4 = e4.width, o4 = e4.height, a5 = i4 << 2, s5 = e4.getContext("2d").getImageData(0, 0, i4, o4), f4 = new Uint32Array(s5.data.buffer), l5 = (32 * i4 + 31) / 32 << 2, c5 = l5 * o4, u3 = 122 + c5, h4 = new ArrayBuffer(u3), d4 = new DataView(h4), A3 = 1 << 20;
    let g3, p4, m4, w4, v4 = A3, b2 = 0, y4 = 0, E2 = 0;
    function set16(e5) {
      d4.setUint16(y4, e5, true), y4 += 2;
    }
    function set32(e5) {
      d4.setUint32(y4, e5, true), y4 += 4;
    }
    function seek(e5) {
      y4 += e5;
    }
    set16(19778), set32(u3), seek(4), set32(122), set32(108), set32(i4), set32(-o4 >>> 0), set16(1), set16(32), set32(3), set32(c5), set32(2835), set32(2835), seek(8), set32(16711680), set32(65280), set32(255), set32(4278190080), set32(1466527264), function convert() {
      for (; b2 < o4 && v4 > 0; ) {
        for (w4 = 122 + b2 * l5, g3 = 0; g3 < a5; ) v4--, p4 = f4[E2++], m4 = p4 >>> 24, d4.setUint32(w4 + g3, p4 << 8 | m4), g3 += 4;
        b2++;
      }
      E2 < f4.length ? (v4 = A3, setTimeout(convert, r3._dly)) : t4(h4);
    }();
  }, toBlob(e4, t4) {
    this.toArrayBuffer(e4, (e5) => {
      t4(new Blob([e5], { type: "image/bmp" }));
    });
  }, _dly: 9 };
  var i3 = { CHROME: "CHROME", FIREFOX: "FIREFOX", DESKTOP_SAFARI: "DESKTOP_SAFARI", IE: "IE", IOS: "IOS", ETC: "ETC" };
  var o3 = { [i3.CHROME]: 16384, [i3.FIREFOX]: 11180, [i3.DESKTOP_SAFARI]: 16384, [i3.IE]: 8192, [i3.IOS]: 4096, [i3.ETC]: 8192 };
  var a4 = "undefined" != typeof window;
  var s4 = "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope;
  var f3 = a4 && window.cordova && window.cordova.require && window.cordova.require("cordova/modulemapper");
  var CustomFile = (a4 || s4) && (f3 && f3.getOriginalSymbol(window, "File") || "undefined" != typeof File && File);
  var CustomFileReader = (a4 || s4) && (f3 && f3.getOriginalSymbol(window, "FileReader") || "undefined" != typeof FileReader && FileReader);
  function getFilefromDataUrl(e4, t4, r4 = Date.now()) {
    return new Promise((i4) => {
      const o4 = e4.split(","), a5 = o4[0].match(/:(.*?);/)[1], s5 = globalThis.atob(o4[1]);
      let f4 = s5.length;
      const l5 = new Uint8Array(f4);
      for (; f4--; ) l5[f4] = s5.charCodeAt(f4);
      const c5 = new Blob([l5], { type: a5 });
      c5.name = t4, c5.lastModified = r4, i4(c5);
    });
  }
  function getDataUrlFromFile(e4) {
    return new Promise((t4, r4) => {
      const i4 = new CustomFileReader();
      i4.onload = () => t4(i4.result), i4.onerror = (e5) => r4(e5), i4.readAsDataURL(e4);
    });
  }
  function loadImage(e4) {
    return new Promise((t4, r4) => {
      const i4 = new Image();
      i4.onload = () => t4(i4), i4.onerror = (e5) => r4(e5), i4.src = e4;
    });
  }
  function getBrowserName() {
    if (void 0 !== getBrowserName.cachedResult) return getBrowserName.cachedResult;
    let e4 = i3.ETC;
    const { userAgent: t4 } = navigator;
    return /Chrom(e|ium)/i.test(t4) ? e4 = i3.CHROME : /iP(ad|od|hone)/i.test(t4) && /WebKit/i.test(t4) ? e4 = i3.IOS : /Safari/i.test(t4) ? e4 = i3.DESKTOP_SAFARI : /Firefox/i.test(t4) ? e4 = i3.FIREFOX : (/MSIE/i.test(t4) || true == !!document.documentMode) && (e4 = i3.IE), getBrowserName.cachedResult = e4, getBrowserName.cachedResult;
  }
  function approximateBelowMaximumCanvasSizeOfBrowser(e4, t4) {
    const r4 = getBrowserName(), i4 = o3[r4];
    let a5 = e4, s5 = t4, f4 = a5 * s5;
    const l5 = a5 > s5 ? s5 / a5 : a5 / s5;
    for (; f4 > i4 * i4; ) {
      const e5 = (i4 + a5) / 2, t5 = (i4 + s5) / 2;
      e5 < t5 ? (s5 = t5, a5 = t5 * l5) : (s5 = e5 * l5, a5 = e5), f4 = a5 * s5;
    }
    return { width: a5, height: s5 };
  }
  function getNewCanvasAndCtx(e4, t4) {
    let r4, i4;
    try {
      if (r4 = new OffscreenCanvas(e4, t4), i4 = r4.getContext("2d"), null === i4) throw new Error("getContext of OffscreenCanvas returns null");
    } catch (e5) {
      r4 = document.createElement("canvas"), i4 = r4.getContext("2d");
    }
    return r4.width = e4, r4.height = t4, [r4, i4];
  }
  function drawImageInCanvas(e4, t4) {
    const { width: r4, height: i4 } = approximateBelowMaximumCanvasSizeOfBrowser(e4.width, e4.height), [o4, a5] = getNewCanvasAndCtx(r4, i4);
    return t4 && /jpe?g/.test(t4) && (a5.fillStyle = "white", a5.fillRect(0, 0, o4.width, o4.height)), a5.drawImage(e4, 0, 0, o4.width, o4.height), o4;
  }
  function isIOS() {
    return void 0 !== isIOS.cachedResult || (isIOS.cachedResult = ["iPad Simulator", "iPhone Simulator", "iPod Simulator", "iPad", "iPhone", "iPod"].includes(navigator.platform) || navigator.userAgent.includes("Mac") && "undefined" != typeof document && "ontouchend" in document), isIOS.cachedResult;
  }
  function drawFileInCanvas(e4, t4 = {}) {
    return new Promise(function(r4, o4) {
      let a5, s5;
      var $Try_2_Post = function() {
        try {
          return s5 = drawImageInCanvas(a5, t4.fileType || e4.type), r4([a5, s5]);
        } catch (e5) {
          return o4(e5);
        }
      }, $Try_2_Catch = function(t5) {
        try {
          0;
          var $Try_3_Catch = function(e5) {
            try {
              throw e5;
            } catch (e6) {
              return o4(e6);
            }
          };
          try {
            let t6;
            return getDataUrlFromFile(e4).then(function(e5) {
              try {
                return t6 = e5, loadImage(t6).then(function(e6) {
                  try {
                    return a5 = e6, function() {
                      try {
                        return $Try_2_Post();
                      } catch (e7) {
                        return o4(e7);
                      }
                    }();
                  } catch (e7) {
                    return $Try_3_Catch(e7);
                  }
                }, $Try_3_Catch);
              } catch (e6) {
                return $Try_3_Catch(e6);
              }
            }, $Try_3_Catch);
          } catch (e5) {
            $Try_3_Catch(e5);
          }
        } catch (e5) {
          return o4(e5);
        }
      };
      try {
        if (isIOS() || [i3.DESKTOP_SAFARI, i3.MOBILE_SAFARI].includes(getBrowserName())) throw new Error("Skip createImageBitmap on IOS and Safari");
        return createImageBitmap(e4).then(function(e5) {
          try {
            return a5 = e5, $Try_2_Post();
          } catch (e6) {
            return $Try_2_Catch();
          }
        }, $Try_2_Catch);
      } catch (e5) {
        $Try_2_Catch();
      }
    });
  }
  function canvasToFile(e4, t4, i4, o4, a5 = 1) {
    return new Promise(function(s5, f4) {
      let l5;
      if ("image/png" === t4) {
        let c5, u3, h4;
        return c5 = e4.getContext("2d"), { data: u3 } = c5.getImageData(0, 0, e4.width, e4.height), h4 = UPNG.encode([u3.buffer], e4.width, e4.height, 4096 * a5), l5 = new Blob([h4], { type: t4 }), l5.name = i4, l5.lastModified = o4, $If_4.call(this);
      }
      {
        let $If_5 = function() {
          return $If_4.call(this);
        };
        if ("image/bmp" === t4) return new Promise((t5) => r3.toBlob(e4, t5)).then(function(e5) {
          try {
            return l5 = e5, l5.name = i4, l5.lastModified = o4, $If_5.call(this);
          } catch (e6) {
            return f4(e6);
          }
        }.bind(this), f4);
        {
          let $If_6 = function() {
            return $If_5.call(this);
          };
          if ("function" == typeof OffscreenCanvas && e4 instanceof OffscreenCanvas) return e4.convertToBlob({ type: t4, quality: a5 }).then(function(e5) {
            try {
              return l5 = e5, l5.name = i4, l5.lastModified = o4, $If_6.call(this);
            } catch (e6) {
              return f4(e6);
            }
          }.bind(this), f4);
          {
            let d4;
            return d4 = e4.toDataURL(t4, a5), getFilefromDataUrl(d4, i4, o4).then(function(e5) {
              try {
                return l5 = e5, $If_6.call(this);
              } catch (e6) {
                return f4(e6);
              }
            }.bind(this), f4);
          }
        }
      }
      function $If_4() {
        return s5(l5);
      }
    });
  }
  function cleanupCanvasMemory(e4) {
    e4.width = 0, e4.height = 0;
  }
  function isAutoOrientationInBrowser() {
    return new Promise(function(e4, t4) {
      let r4, i4, o4, a5, s5;
      return void 0 !== isAutoOrientationInBrowser.cachedResult ? e4(isAutoOrientationInBrowser.cachedResult) : (r4 = "data:image/jpeg;base64,/9j/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAYAAAAAAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIAAEAAgMBEQACEQEDEQH/xABKAAEAAAAAAAAAAAAAAAAAAAALEAEAAAAAAAAAAAAAAAAAAAAAAQEAAAAAAAAAAAAAAAAAAAAAEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8H//2Q==", getFilefromDataUrl("data:image/jpeg;base64,/9j/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAYAAAAAAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIAAEAAgMBEQACEQEDEQH/xABKAAEAAAAAAAAAAAAAAAAAAAALEAEAAAAAAAAAAAAAAAAAAAAAAQEAAAAAAAAAAAAAAAAAAAAAEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8H//2Q==", "test.jpg", Date.now()).then(function(r5) {
        try {
          return i4 = r5, drawFileInCanvas(i4).then(function(r6) {
            try {
              return o4 = r6[1], canvasToFile(o4, i4.type, i4.name, i4.lastModified).then(function(r7) {
                try {
                  return a5 = r7, cleanupCanvasMemory(o4), drawFileInCanvas(a5).then(function(r8) {
                    try {
                      return s5 = r8[0], isAutoOrientationInBrowser.cachedResult = 1 === s5.width && 2 === s5.height, e4(isAutoOrientationInBrowser.cachedResult);
                    } catch (e5) {
                      return t4(e5);
                    }
                  }, t4);
                } catch (e5) {
                  return t4(e5);
                }
              }, t4);
            } catch (e5) {
              return t4(e5);
            }
          }, t4);
        } catch (e5) {
          return t4(e5);
        }
      }, t4));
    });
  }
  function getExifOrientation(e4) {
    return new Promise((t4, r4) => {
      const i4 = new CustomFileReader();
      i4.onload = (e5) => {
        const r5 = new DataView(e5.target.result);
        if (65496 != r5.getUint16(0, false)) return t4(-2);
        const i5 = r5.byteLength;
        let o4 = 2;
        for (; o4 < i5; ) {
          if (r5.getUint16(o4 + 2, false) <= 8) return t4(-1);
          const e6 = r5.getUint16(o4, false);
          if (o4 += 2, 65505 == e6) {
            if (1165519206 != r5.getUint32(o4 += 2, false)) return t4(-1);
            const e7 = 18761 == r5.getUint16(o4 += 6, false);
            o4 += r5.getUint32(o4 + 4, e7);
            const i6 = r5.getUint16(o4, e7);
            o4 += 2;
            for (let a5 = 0; a5 < i6; a5++) if (274 == r5.getUint16(o4 + 12 * a5, e7)) return t4(r5.getUint16(o4 + 12 * a5 + 8, e7));
          } else {
            if (65280 != (65280 & e6)) break;
            o4 += r5.getUint16(o4, false);
          }
        }
        return t4(-1);
      }, i4.onerror = (e5) => r4(e5), i4.readAsArrayBuffer(e4);
    });
  }
  function handleMaxWidthOrHeight(e4, t4) {
    const { width: r4 } = e4, { height: i4 } = e4, { maxWidthOrHeight: o4 } = t4;
    let a5, s5 = e4;
    return isFinite(o4) && (r4 > o4 || i4 > o4) && ([s5, a5] = getNewCanvasAndCtx(r4, i4), r4 > i4 ? (s5.width = o4, s5.height = i4 / r4 * o4) : (s5.width = r4 / i4 * o4, s5.height = o4), a5.drawImage(e4, 0, 0, s5.width, s5.height), cleanupCanvasMemory(e4)), s5;
  }
  function followExifOrientation(e4, t4) {
    const { width: r4 } = e4, { height: i4 } = e4, [o4, a5] = getNewCanvasAndCtx(r4, i4);
    switch (t4 > 4 && t4 < 9 ? (o4.width = i4, o4.height = r4) : (o4.width = r4, o4.height = i4), t4) {
      case 2:
        a5.transform(-1, 0, 0, 1, r4, 0);
        break;
      case 3:
        a5.transform(-1, 0, 0, -1, r4, i4);
        break;
      case 4:
        a5.transform(1, 0, 0, -1, 0, i4);
        break;
      case 5:
        a5.transform(0, 1, 1, 0, 0, 0);
        break;
      case 6:
        a5.transform(0, 1, -1, 0, i4, 0);
        break;
      case 7:
        a5.transform(0, -1, -1, 0, i4, r4);
        break;
      case 8:
        a5.transform(0, -1, 1, 0, 0, r4);
    }
    return a5.drawImage(e4, 0, 0, r4, i4), cleanupCanvasMemory(e4), o4;
  }
  function compress(e4, t4, r4 = 0) {
    return new Promise(function(i4, o4) {
      let a5, s5, f4, l5, c5, u3, h4, d4, A3, g3, p4, m4, w4, v4, b2, y4, E2, F2, _2, B3;
      function incProgress(e5 = 5) {
        if (t4.signal && t4.signal.aborted) throw t4.signal.reason;
        a5 += e5, t4.onProgress(Math.min(a5, 100));
      }
      function setProgress(e5) {
        if (t4.signal && t4.signal.aborted) throw t4.signal.reason;
        a5 = Math.min(Math.max(e5, a5), 100), t4.onProgress(a5);
      }
      return a5 = r4, s5 = t4.maxIteration || 10, f4 = 1024 * t4.maxSizeMB * 1024, incProgress(), drawFileInCanvas(e4, t4).then(function(r5) {
        try {
          return [, l5] = r5, incProgress(), c5 = handleMaxWidthOrHeight(l5, t4), incProgress(), new Promise(function(r6, i5) {
            var o5;
            if (!(o5 = t4.exifOrientation)) return getExifOrientation(e4).then(function(e5) {
              try {
                return o5 = e5, $If_2.call(this);
              } catch (e6) {
                return i5(e6);
              }
            }.bind(this), i5);
            function $If_2() {
              return r6(o5);
            }
            return $If_2.call(this);
          }).then(function(r6) {
            try {
              return u3 = r6, incProgress(), isAutoOrientationInBrowser().then(function(r7) {
                try {
                  return h4 = r7 ? c5 : followExifOrientation(c5, u3), incProgress(), d4 = t4.initialQuality || 1, A3 = t4.fileType || e4.type, canvasToFile(h4, A3, e4.name, e4.lastModified, d4).then(function(r8) {
                    try {
                      {
                        let $Loop_3 = function() {
                          if (s5-- && (b2 > f4 || b2 > w4)) {
                            let t5, r9;
                            return t5 = B3 ? 0.95 * _2.width : _2.width, r9 = B3 ? 0.95 * _2.height : _2.height, [E2, F2] = getNewCanvasAndCtx(t5, r9), F2.drawImage(_2, 0, 0, t5, r9), d4 *= "image/png" === A3 ? 0.85 : 0.95, canvasToFile(E2, A3, e4.name, e4.lastModified, d4).then(function(e5) {
                              try {
                                return y4 = e5, cleanupCanvasMemory(_2), _2 = E2, b2 = y4.size, setProgress(Math.min(99, Math.floor((v4 - b2) / (v4 - f4) * 100))), $Loop_3;
                              } catch (e6) {
                                return o4(e6);
                              }
                            }, o4);
                          }
                          return [1];
                        }, $Loop_3_exit = function() {
                          return cleanupCanvasMemory(_2), cleanupCanvasMemory(E2), cleanupCanvasMemory(c5), cleanupCanvasMemory(h4), cleanupCanvasMemory(l5), setProgress(100), i4(y4);
                        };
                        if (g3 = r8, incProgress(), p4 = g3.size > f4, m4 = g3.size > e4.size, !p4 && !m4) return setProgress(100), i4(g3);
                        var a6;
                        return w4 = e4.size, v4 = g3.size, b2 = v4, _2 = h4, B3 = !t4.alwaysKeepResolution && p4, (a6 = function(e5) {
                          for (; e5; ) {
                            if (e5.then) return void e5.then(a6, o4);
                            try {
                              if (e5.pop) {
                                if (e5.length) return e5.pop() ? $Loop_3_exit.call(this) : e5;
                                e5 = $Loop_3;
                              } else e5 = e5.call(this);
                            } catch (e6) {
                              return o4(e6);
                            }
                          }
                        }.bind(this))($Loop_3);
                      }
                    } catch (u4) {
                      return o4(u4);
                    }
                  }.bind(this), o4);
                } catch (e5) {
                  return o4(e5);
                }
              }.bind(this), o4);
            } catch (e5) {
              return o4(e5);
            }
          }.bind(this), o4);
        } catch (e5) {
          return o4(e5);
        }
      }.bind(this), o4);
    });
  }
  var l4 = "\nlet scriptImported = false\nself.addEventListener('message', async (e) => {\n  const { file, id, imageCompressionLibUrl, options } = e.data\n  options.onProgress = (progress) => self.postMessage({ progress, id })\n  try {\n    if (!scriptImported) {\n      // console.log('[worker] importScripts', imageCompressionLibUrl)\n      self.importScripts(imageCompressionLibUrl)\n      scriptImported = true\n    }\n    // console.log('[worker] self', self)\n    const compressedFile = await imageCompression(file, options)\n    self.postMessage({ file: compressedFile, id })\n  } catch (e) {\n    // console.error('[worker] error', e)\n    self.postMessage({ error: e.message + '\\n' + e.stack, id })\n  }\n})\n";
  var c4;
  function compressOnWebWorker(e4, t4) {
    return new Promise((r4, i4) => {
      c4 || (c4 = function createWorkerScriptURL(e5) {
        const t5 = [];
        return "function" == typeof e5 ? t5.push(`(${e5})()`) : t5.push(e5), URL.createObjectURL(new Blob(t5));
      }(l4));
      const o4 = new Worker(c4);
      o4.addEventListener("message", function handler(e5) {
        if (t4.signal && t4.signal.aborted) o4.terminate();
        else if (void 0 === e5.data.progress) {
          if (e5.data.error) return i4(new Error(e5.data.error)), void o4.terminate();
          r4(e5.data.file), o4.terminate();
        } else t4.onProgress(e5.data.progress);
      }), o4.addEventListener("error", i4), t4.signal && t4.signal.addEventListener("abort", () => {
        i4(t4.signal.reason), o4.terminate();
      }), o4.postMessage({ file: e4, imageCompressionLibUrl: t4.libURL, options: { ...t4, onProgress: void 0, signal: void 0 } });
    });
  }
  function imageCompression(e4, t4) {
    return new Promise(function(r4, i4) {
      let o4, a5, s5, f4, l5, c5;
      if (o4 = { ...t4 }, s5 = 0, { onProgress: f4 } = o4, o4.maxSizeMB = o4.maxSizeMB || Number.POSITIVE_INFINITY, l5 = "boolean" != typeof o4.useWebWorker || o4.useWebWorker, delete o4.useWebWorker, o4.onProgress = (e5) => {
        s5 = e5, "function" == typeof f4 && f4(s5);
      }, !(e4 instanceof Blob || e4 instanceof CustomFile)) return i4(new Error("The file given is not an instance of Blob or File"));
      if (!/^image/.test(e4.type)) return i4(new Error("The file given is not an image"));
      if (c5 = "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope, !l5 || "function" != typeof Worker || c5) return compress(e4, o4).then(function(e5) {
        try {
          return a5 = e5, $If_4.call(this);
        } catch (e6) {
          return i4(e6);
        }
      }.bind(this), i4);
      var u3 = function() {
        try {
          return $If_4.call(this);
        } catch (e5) {
          return i4(e5);
        }
      }.bind(this), $Try_1_Catch = function(t5) {
        try {
          return compress(e4, o4).then(function(e5) {
            try {
              return a5 = e5, u3();
            } catch (e6) {
              return i4(e6);
            }
          }, i4);
        } catch (e5) {
          return i4(e5);
        }
      };
      try {
        return o4.libURL = o4.libURL || "https://cdn.jsdelivr.net/npm/browser-image-compression@2.0.2/dist/browser-image-compression.js", compressOnWebWorker(e4, o4).then(function(e5) {
          try {
            return a5 = e5, u3();
          } catch (e6) {
            return $Try_1_Catch();
          }
        }, $Try_1_Catch);
      } catch (e5) {
        $Try_1_Catch();
      }
      function $If_4() {
        try {
          a5.name = e4.name, a5.lastModified = e4.lastModified;
        } catch (e5) {
        }
        try {
          o4.preserveExif && "image/jpeg" === e4.type && (!o4.fileType || o4.fileType && o4.fileType === e4.type) && (a5 = copyExifWithoutOrientation(e4, a5));
        } catch (e5) {
        }
        return r4(a5);
      }
    });
  }
  imageCompression.getDataUrlFromFile = getDataUrlFromFile, imageCompression.getFilefromDataUrl = getFilefromDataUrl, imageCompression.loadImage = loadImage, imageCompression.drawImageInCanvas = drawImageInCanvas, imageCompression.drawFileInCanvas = drawFileInCanvas, imageCompression.canvasToFile = canvasToFile, imageCompression.getExifOrientation = getExifOrientation, imageCompression.handleMaxWidthOrHeight = handleMaxWidthOrHeight, imageCompression.followExifOrientation = followExifOrientation, imageCompression.cleanupCanvasMemory = cleanupCanvasMemory, imageCompression.isAutoOrientationInBrowser = isAutoOrientationInBrowser, imageCompression.approximateBelowMaximumCanvasSizeOfBrowser = approximateBelowMaximumCanvasSizeOfBrowser, imageCompression.copyExifWithoutOrientation = copyExifWithoutOrientation, imageCompression.getBrowserName = getBrowserName, imageCompression.version = "2.0.2";

  // src/socket.ts
  var import_events = __toESM(require_events());
  function createSocket(path) {
    const ws = new WebSocket(path);
    return new Promise((resolve, reject) => {
      ws.onopen = () => resolve(ws);
    });
  }
  var ClientSocket = class extends import_events.EventEmitter {
    constructor(ws) {
      super();
      this.ws = ws;
      ws.addEventListener("message", (m4) => {
        const [name, value] = JSON.parse(m4.data);
        this.emit(name, value);
      });
    }
    id;
    send(name, value) {
      this.ws.send(JSON.stringify([name, value]));
    }
  };

  // src/route/start.tsx
  var imageCompression2 = imageCompression;
  function Start(params) {
    const inputRef = A2(null);
    const fileRef = A2(null);
    const imgRef = A2(null);
    const [error, setError] = d2("");
    const [img, setImg] = d2("");
    return /* @__PURE__ */ _("div", null, /* @__PURE__ */ _("h2", { style: { textAlign: "center" } }, "\u540D\u524D\u3092\u5165\u529B"), /* @__PURE__ */ _(
      "input",
      {
        ref: inputRef,
        type: "text",
        className: "name-input",
        placeholder: "\u30CA\u30DE\u30A8"
      }
    ), /* @__PURE__ */ _("label", { class: "file-label" }, /* @__PURE__ */ _(
      "input",
      {
        ref: fileRef,
        type: "file",
        className: "file-input",
        accept: "image/*",
        onInput: async (e4) => {
          if (!fileRef.current || !fileRef.current.files) {
            return;
          }
          setError("\u753B\u50CF\u3092\u51E6\u7406\u4E2D...");
          const blob = await imageCompression2(
            fileRef.current?.files[0],
            {
              maxWidthOrHeight: 240,
              libURL: "/browser-image-compression.js"
            }
          );
          img && URL.revokeObjectURL(img);
          imgRef.current = blob;
          setImg(URL.createObjectURL(blob));
          setError("");
        }
      }
    ), "\u30A2\u30A4\u30B3\u30F3\u753B\u50CF\u3092\u9078\u629E"), error ? /* @__PURE__ */ _("h2", { style: { textAlign: "center", color: "#f00" } }, error) : "", img ? /* @__PURE__ */ _("h2", { style: { textAlign: "center" } }, /* @__PURE__ */ _(
      "img",
      {
        style: { width: "50px", height: "50px", objectFit: "cover" },
        src: img,
        alt: "icon"
      }
    )) : "", /* @__PURE__ */ _("h2", { style: { margin: "0px", textAlign: "center" } }, /* @__PURE__ */ _(
      "a",
      {
        href: "",
        onClick: async (e4) => {
          e4.preventDefault();
          const val = inputRef.current?.value;
          if (!val) {
            return setError("\u30A8\u30E9\u30FC\u304C\u767A\u751F\u3057\u307E\u3057\u305F");
          }
          if (val.includes("\u3075\u304B") || val.includes("\u30D5\u30AB") || val.includes("\u6DF1") || val.includes("<")) {
            return setError("\u30A8\u30E9\u30FC\u304C\u767A\u751F\u3057\u307E\u3057\u305F");
          }
          appContext.i.name = val.substring(0, 8);
          const upload = await fetch("/icons/" + appContext.i.id, {
            body: imgRef.current ?? await createDefaultIcon(),
            method: "POST"
          });
          if (!upload.ok) {
            return setError("\u30A8\u30E9\u30FC\u304C\u767A\u751F\u3057\u307E\u3057\u305F");
          }
          appContext.socket = new ClientSocket(
            await createSocket("/ws/" + appContext.i.id)
          );
          appContext.socket.send("join", appContext.i);
          $2("/wait", true);
        }
      },
      ">>>\u7D9A\u3051\u308B"
    )));
  }
  var createDefaultIcon = async () => await imageCompression2(
    new File(
      [await (await fetch("/ico.png")).blob()],
      "ico.png",
      { type: "image/png" }
    ),
    {
      maxWidthOrHeight: 240,
      libURL: "/browser-image-compression.js"
    }
  );

  // src/fetch.ts
  function useJoined() {
    const [joined, setJoined] = d2(null);
    y2(() => {
      (async () => {
        const res = await fetch("/joined");
        setJoined(await res.json());
      })();
    }, []);
    return [joined, setJoined];
  }
  function omit(params, keys) {
    const newObj = { ...params };
    for (const key of keys) {
      delete newObj[key];
    }
    return newObj;
  }

  // src/route/wait.tsx
  function Wait(params) {
    return /* @__PURE__ */ _("div", null, /* @__PURE__ */ _("h2", { style: { textAlign: "center" } }, "\u958B\u59CB\u3055\u308C\u308B\u306E\u3092\u5F85\u3063\u3066\u3044\u307E\u3059"), /* @__PURE__ */ _("h2", { style: { textAlign: "center" } }, /* @__PURE__ */ _("span", { className: "loader" })), /* @__PURE__ */ _(UserList, null));
  }
  function UserList() {
    const [joined, setJoined] = useJoined();
    y2(() => {
      if (!appContext.socket) {
        location.href = "/";
        return;
      }
      const f4 = (e4) => {
        setJoined(
          (previous) => previous ? previous.find((u3) => u3.id === e4.id) ? previous : [...previous, e4] : [e4]
        );
      };
      const f22 = ({ uid }) => {
        setJoined(
          (previous) => previous ? [...previous.filter((u3) => u3.id !== uid)] : []
        );
      };
      const f32 = ({ t: t4 }) => {
        setTimeout(() => {
          $2("/play", true);
        }, t4 - Date.now());
      };
      appContext.socket.on("join", f4);
      appContext.socket.on("leave", f22);
      appContext.socket.on("start", f32);
      return () => {
        appContext.socket.off("join", f4);
        appContext.socket.off("leave", f22);
        appContext.socket.off("start", f32);
      };
    }, []);
    return /* @__PURE__ */ _("div", { className: "user-list-base" }, joined ? joined.map((user) => /* @__PURE__ */ _(
      "div",
      {
        className: "user-list-content",
        ...user.id === appContext.i.id ? { style: { backgroundColor: "#f8f" } } : {}
      },
      /* @__PURE__ */ _(
        "img",
        {
          className: "user-list-icon",
          src: `/icons/${user.id}`,
          alt: user.name
        }
      ),
      /* @__PURE__ */ _("div", { className: "user-list-name" }, user.name)
    )) : "");
  }

  // src/svgs.tsx
  function Button(params) {
    return params.press ? /* @__PURE__ */ _("svg", { style: { width: "200px", height: "200px" }, viewBox: "0 0 52 52" }, /* @__PURE__ */ _(
      "path",
      {
        fill: "#9c8e68",
        d: "M5.5 24.5 5.5 34.5A20 10 1 1045.5 34.5L45.5 24.5Z"
      }
    ), /* @__PURE__ */ _(
      "path",
      {
        fill: "#ffedba",
        d: "M20 15A20 10 1 1030 15Z"
      }
    ), /* @__PURE__ */ _(
      "path",
      {
        fill: "#a8480c",
        d: "M14 24.5A10 5 0 0036 24.5L36 20a10 5 0 01-22 0z"
      }
    ), /* @__PURE__ */ _(
      "path",
      {
        fill: "#f06916",
        d: "M14 20.1A10 5 0 0136 20.1Z"
      }
    ), /* @__PURE__ */ _(
      "path",
      {
        fill: "#f06916",
        d: "M14 20A10 5 0 0036 20L14 20Z"
      }
    )) : /* @__PURE__ */ _("svg", { style: { width: "200px", height: "200px" }, viewBox: "0 0 52 52" }, /* @__PURE__ */ _(
      "path",
      {
        fill: "#9c8e68",
        d: "M5.5 24.5 5.5 34.5A20 10 1 1045.5 34.5L45.5 24.5Z"
      }
    ), /* @__PURE__ */ _(
      "path",
      {
        fill: "#ffedba",
        d: "M20 15A20 10 1 1030 15Z"
      }
    ), /* @__PURE__ */ _(
      "path",
      {
        fill: "#a8480c",
        d: "M14 24.5A10 5 0 0036 24.5L36 18A10 5 0 0114 18Z"
      }
    ), /* @__PURE__ */ _(
      "path",
      {
        fill: "#f06916",
        d: "M14 18.1A10 5 0 0136 18.1Z"
      }
    ), /* @__PURE__ */ _(
      "path",
      {
        fill: "#f06916",
        d: "M14 18A10 5 0 0036 18M14 18Z"
      }
    ));
  }
  function O2() {
    return /* @__PURE__ */ _("svg", { viewBox: "0 0 24 24" }, /* @__PURE__ */ _(
      "path",
      {
        fill: "#f11",
        d: "M3 12M0 12A1 1 0 0024 12 1 1 0 000 12M3 12A1 1 0 0121 12 1 1 0 013 12Z"
      }
    ));
  }
  function X() {
    return /* @__PURE__ */ _("svg", { viewBox: "0 0 24 24" }, /* @__PURE__ */ _(
      "path",
      {
        fill: "#11f",
        d: "M3 0 0 3 9 12 0 21 3 24 12 15 21 24 24 21 15 12 24 3 21 0 12 9Z"
      }
    ));
  }

  // src/route/play.tsx
  var intervalF;
  setInterval(() => {
    if (!intervalF) {
      return;
    }
    try {
      intervalF();
    } catch {
    }
  }, 100);
  function Play(params) {
    if (!appContext.socket) {
      location.href = "/";
      return;
    }
    const setUserRef = A2(null);
    const [answer, setAnswer] = d2({ ans: "", short: "" });
    const [q2, setQ] = d2("");
    const [overParam, setOverParam] = d2({});
    const [press, setPress] = d2(false);
    y2(() => {
      appContext.socket?.on("leave", ({ uid }) => {
        setUserRef.current && setUserRef.current(
          (users) => users && users.filter((u3) => u3.id !== uid)
        );
      });
      appContext.socket?.on("O", ({ uid, qid, t: t4 }) => {
        if (appContext.nowQid !== qid) {
          return;
        }
        setUserRef.current && setUserRef.current(
          (users) => users && users.map(
            (u3) => u3.id === uid ? { ...u3, correct: true, correctTime: t4 } : u3
          )
        );
      });
      appContext.socket?.on("X", ({ uid, qid }) => {
        if (appContext.nowQid !== qid) {
          return;
        }
        setUserRef.current && setUserRef.current(
          (users) => users && users.map((u3) => u3.id === uid ? u3 : { ...u3, correct: false })
        );
      });
      appContext.socket?.on("end", () => {
        $2("/end");
      });
      appContext.socket?.on("questionBegin", (e4) => {
        setTimeout(() => {
          setOverParam({});
          setAnswer({ ans: "", short: "" });
          let qstr = "";
          intervalF = () => {
            if ((appContext.q?.id ?? 0) !== e4.q.id) {
              intervalF = void 0;
              return;
            }
            if (qstr.length < appContext.q.text.length) {
              qstr = qstr + appContext.q.text[qstr.length];
              setQ(qstr);
            } else {
              intervalF = void 0;
            }
          };
        }, e4.t - Date.now() + 500);
        setTimeout(() => {
          setOverParam({
            t: "title",
            qid: e4.q.id
          });
        }, e4.t - Date.now());
        appContext.q = {
          ...e4.q,
          answer: JSON.parse(decodeURIComponent(escape(atob(e4.q.answer.answer))))
        };
        appContext.nowQid = e4.q.id;
        setUserRef.current(
          (users) => users && users.map((u3) => ({
            ...u3,
            correct: void 0,
            correctTime: 0,
            first: false
          }))
        );
      });
      appContext.socket?.on("questionEnd", ({ id, users }) => {
        if (appContext.nowQid !== id) {
          return;
        }
        appContext.nowQid = -1;
        setPress(false);
        setOverParam({});
        setQ(appContext.q.text);
        setUserRef.current(users);
        setAnswer({
          ans: appContext.q.answer.answer,
          short: appContext.q.answer.short
        });
      });
    }, []);
    y2(() => {
      const onkeydown = (e4) => {
        if (e4.key === "Enter" || e4.key === " ") {
          if (appContext.nowQid === -1) {
            return;
          }
          if (overParam.t) {
            return;
          }
          setPress(true);
          startAnswer(setOverParam);
        }
      };
      document.addEventListener("keydown", onkeydown);
      return () => {
        document.removeEventListener("keydown", onkeydown);
      };
    }, [overParam]);
    return /* @__PURE__ */ _("div", { className: "play" }, /* @__PURE__ */ _(Over, { ...overParam }), /* @__PURE__ */ _(Header, { q: appContext.nowQid, userRef: setUserRef }), /* @__PURE__ */ _(
      QBody,
      {
        text: q2,
        answer
      }
    ), /* @__PURE__ */ _(
      QButton,
      {
        ...{ press },
        onClick: () => {
          if (appContext.nowQid === -1) {
            return;
          }
          setPress(true);
          startAnswer(setOverParam);
        }
      }
    ));
  }
  function Over(params) {
    y2(() => {
      if (params.t === "select") {
        const onkeydown = (e4) => {
          if (e4.key === "1") {
            params.onAnsSelect(params.selects[0]);
          } else if (e4.key === "2") {
            params.onAnsSelect(params.selects[1]);
          } else if (e4.key === "3") {
            params.onAnsSelect(params.selects[2]);
          } else if (e4.key === "4") {
            params.onAnsSelect(params.selects[3]);
          }
        };
        document.addEventListener("keydown", onkeydown);
        return () => {
          document.removeEventListener("keydown", onkeydown);
        };
      }
    }, [params]);
    return /* @__PURE__ */ _(
      "div",
      {
        ...omit(params, ["t", "onSelect", "selects", "correct"]),
        className: params.t ? "over show" : "over"
      },
      params.t === "title" && /* @__PURE__ */ _("div", { className: "qtitle" }, "\u7B2C", params.qid + 1, "\u554F"),
      params.t === "select" && /* @__PURE__ */ _("div", null, /* @__PURE__ */ _("div", { className: "inputPopup" }, /* @__PURE__ */ _("div", { className: "title" }, "\u89E3\u7B54\u4E2D..."), /* @__PURE__ */ _("div", { style: { display: "flex", flexDirection: "row" } }, /* @__PURE__ */ _("img", { className: "icon", src: `/icons/${appContext.i.id}` }), /* @__PURE__ */ _("div", { className: "text" }, params.ans || appContext.i.name))), /* @__PURE__ */ _("div", { className: "selects" }, params.selects.map((s5) => /* @__PURE__ */ _(
        "div",
        {
          className: "select",
          onClick: () => {
            params.onAnsSelect(s5);
          }
        },
        s5
      )))),
      params.t === "result" && (params.correct ? /* @__PURE__ */ _("div", { className: "result" }, /* @__PURE__ */ _(O2, null)) : /* @__PURE__ */ _("div", { className: "result" }, /* @__PURE__ */ _(X, null)))
    );
  }
  function QButton(params) {
    return /* @__PURE__ */ _("div", { ...omit(params, ["press"]), className: "qbutton" }, /* @__PURE__ */ _(Button, { ...params }));
  }
  function QBody(param) {
    return /* @__PURE__ */ _("div", { className: "qbody" }, /* @__PURE__ */ _("div", { className: "question" }, /* @__PURE__ */ _("div", { style: { marginRight: "3px" } }, "Q."), /* @__PURE__ */ _("div", null, param.text)), /* @__PURE__ */ _("div", { className: "answer" }, param.answer?.ans && /* @__PURE__ */ _("div", null, /* @__PURE__ */ _("div", { className: "ans" }, "A. ", param.answer.ans), /* @__PURE__ */ _("div", { className: "short" }, param.answer.short))));
  }
  function Header(params) {
    return /* @__PURE__ */ _("div", { className: "header" }, /* @__PURE__ */ _("div", { className: "title" }, "Q", params.q > -1 ? params.q + 1 : ""), /* @__PURE__ */ _(UserList2, { userRef: params.userRef }));
  }
  function UserList2(param) {
    const [users, setUsers] = useJoined();
    param.userRef.current = setUsers;
    return /* @__PURE__ */ _("div", { className: "users" }, users && users.map((u3) => /* @__PURE__ */ _("div", { className: "user" }, typeof u3.first === "boolean" && u3.first && /* @__PURE__ */ _("div", { className: "first" }, "1st"), typeof u3.correct === "boolean" && (u3.correct ? /* @__PURE__ */ _("div", { className: "correct" }, /* @__PURE__ */ _(O2, null)) : /* @__PURE__ */ _("div", { className: "correct" }, /* @__PURE__ */ _(X, null))), /* @__PURE__ */ _("img", { className: "icon", src: `/icons/${u3.id}` }), /* @__PURE__ */ _("div", { className: "name" }, u3.name.substring(0, 8)), /* @__PURE__ */ _("div", { className: "score" }, u3.score))));
  }
  var regExp = {
    hiragana: /[ぁ-んー]/,
    katakana: /[ァ-ヶー]/,
    alphabet: /[A-Z]/,
    number: /[0-9]/
  };
  var strings = {
    hiragana: "\u3042\u3044\u3046\u3048\u304A\u304B\u304D\u304F\u3051\u3053\u3055\u3057\u3059\u305B\u305D\u305F\u3061\u3064\u3066\u3068\u306A\u306B\u306C\u306D\u306E\u306F\u3072\u3075\u3078\u307B\u307E\u307F\u3080\u3081\u3082\u3084\u3086\u3088\u3089\u308A\u308B\u308C\u308D\u308F\u3092\u3093\u30FC",
    katakana: "\u30A2\u30A4\u30A6\u30A8\u30AA\u30AB\u30AD\u30AF\u30B1\u30B3\u30B5\u30B7\u30B9\u30BB\u30BD\u30BF\u30C1\u30C4\u30C6\u30C8\u30CA\u30CB\u30CC\u30CD\u30CE\u30CF\u30D2\u30D5\u30D8\u30DB\u30DE\u30DF\u30E0\u30E1\u30E2\u30E4\u30E6\u30E8\u30E9\u30EA\u30EB\u30EC\u30ED\u30EF\u30F2\u30F3\u30FC",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    number: "0123456789"
  };
  function generateOptions(ans) {
    const options = [ans];
    if (regExp.hiragana.test(ans)) {
      for (let i4 = 0; i4 < 3; i4++) {
        const randomIndex = Math.floor(Math.random() * strings.hiragana.length);
        const randomChar = strings.hiragana[randomIndex];
        if (options.includes(randomChar)) {
          i4--;
          continue;
        }
        options.push(randomChar);
      }
    } else if (regExp.katakana.test(ans)) {
      for (let i4 = 0; i4 < 3; i4++) {
        const randomIndex = Math.floor(Math.random() * strings.katakana.length);
        const randomChar = strings.katakana[randomIndex];
        if (options.includes(randomChar)) {
          i4--;
          continue;
        }
        options.push(randomChar);
      }
    } else if (regExp.alphabet.test(ans)) {
      for (let i4 = 0; i4 < 3; i4++) {
        const randomIndex = Math.floor(Math.random() * strings.alphabet.length);
        const randomChar = strings.alphabet[randomIndex];
        if (options.includes(randomChar)) {
          i4--;
          continue;
        }
        options.push(randomChar);
      }
    } else {
      for (let i4 = 0; i4 < 3; i4++) {
        const randomIndex = Math.floor(Math.random() * strings.number.length);
        const randomChar = strings.number[randomIndex];
        if (options.includes(randomChar)) {
          i4--;
          continue;
        }
        options.push(randomChar);
      }
    }
    return options.sort(() => Math.random() - 0.5);
  }
  function startAnswer(setOverParam) {
    intervalF = void 0;
    const ans = appContext.q.answer.short;
    let i4 = -1;
    const onAnsSelect = (input) => {
      if (input !== null && input !== ans[i4]) {
        setOverParam({
          t: "result",
          correct: false
        });
        appContext.socket?.send("X", {
          qid: appContext.nowQid,
          uid: appContext.i.id
        });
        return;
      }
      if (i4 + 1 === ans.length) {
        setOverParam({
          t: "result",
          correct: true
        });
        appContext.socket?.send("O", {
          qid: appContext.nowQid,
          uid: appContext.i.id,
          t: Date.now()
        });
        return;
      }
      i4++;
      const options = generateOptions(ans[i4]);
      setOverParam({
        t: "select",
        selects: options,
        onAnsSelect,
        ans: ans.substring(0, i4)
      });
    };
    onAnsSelect(null);
  }

  // src/route/end.tsx
  function End(params) {
    return /* @__PURE__ */ _("div", null, /* @__PURE__ */ _("h2", { style: { textAlign: "center" } }, "\u7D50\u679C\u767A\u8868"), /* @__PURE__ */ _(UserList3, null), /* @__PURE__ */ _("h2", { style: { textAlign: "center" } }, /* @__PURE__ */ _(
      "button",
      {
        type: "button",
        className: "admin-button",
        onClick: () => {
          $2("/", true);
        }
      },
      "\u623B\u308B"
    )));
  }
  function UserList3() {
    const [joined, setJoined] = useJoined();
    const [users, setUsers] = d2([]);
    y2(() => {
      if (!joined) {
        return;
      }
      const _joined = joined.sort((a5, b2) => a5.score - b2.score);
      const id = setInterval(() => {
        setUsers((u3) => {
          if (u3.length < _joined.length) {
            return [_joined[u3.length], ...u3];
          }
          clearInterval(id);
          appContext.socket?.ws.close();
          return u3;
        });
      }, 250);
      return () => clearInterval(id);
    }, [joined]);
    return /* @__PURE__ */ _("div", { className: "user-list-base" }, users.length ? users.map((user) => /* @__PURE__ */ _(
      "div",
      {
        className: "user-list-content",
        style: { backgroundColor: "#fff", border: "2px solid" }
      },
      /* @__PURE__ */ _(
        "img",
        {
          className: "user-list-icon",
          src: `/icons/${user.id}`,
          alt: user.name
        }
      ),
      /* @__PURE__ */ _("div", { className: "user-list-name" }, user.name, /* @__PURE__ */ _(
        "span",
        {
          style: {
            color: "#fd5",
            display: "inline-block",
            marginLeft: "20px"
          }
        },
        user.score
      ))
    )) : "");
  }

  // src/app.tsx
  var appContext = {
    nowQid: -1,
    i: { id: Math.floor(Math.random() * 2 ** 32), name: "_none", score: -1 }
  };
  function App() {
    return /* @__PURE__ */ _(D3, null, /* @__PURE__ */ _(Root, { path: "/" }), /* @__PURE__ */ _(Start, { path: "/start" }), /* @__PURE__ */ _(Wait, { path: "/wait" }), /* @__PURE__ */ _(Play, { path: "/play" }), /* @__PURE__ */ _(End, { path: "/end" }));
  }

  // src/index.tsx
  E(/* @__PURE__ */ _(App, null), document.body);
})();

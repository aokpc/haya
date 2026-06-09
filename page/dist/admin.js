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
      var R = typeof Reflect === "object" ? Reflect : null;
      var ReflectApply = R && typeof R.apply === "function" ? R.apply : function ReflectApply2(target, receiver, args) {
        return Function.prototype.apply.call(target, receiver, args);
      };
      var ReflectOwnKeys;
      if (R && typeof R.ownKeys === "function") {
        ReflectOwnKeys = R.ownKeys;
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
        for (var i3 = 1; i3 < arguments.length; i3++) args.push(arguments[i3]);
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
          for (var i3 = 0; i3 < len; ++i3)
            ReflectApply(listeners[i3], this, args);
        }
        return true;
      };
      function _addListener(target, type, listener, prepend) {
        var m3;
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
          m3 = _getMaxListeners(target);
          if (m3 > 0 && existing.length > m3 && !existing.warned) {
            existing.warned = true;
            var w3 = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners added. Use emitter.setMaxListeners() to increase limit");
            w3.name = "MaxListenersExceededWarning";
            w3.emitter = target;
            w3.type = type;
            w3.count = existing.length;
            ProcessEmitWarning(w3);
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
        var list, events, position, i3, originalListener;
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
          for (i3 = list.length - 1; i3 >= 0; i3--) {
            if (list[i3] === listener || list[i3].listener === listener) {
              originalListener = list[i3].listener;
              position = i3;
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
        var listeners, events, i3;
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
          for (i3 = 0; i3 < keys.length; ++i3) {
            key = keys[i3];
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
          for (i3 = listeners.length - 1; i3 >= 0; i3--) {
            this.removeListener(type, listeners[i3]);
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
        for (var i3 = 0; i3 < n2; ++i3)
          copy[i3] = arr[i3];
        return copy;
      }
      function spliceOne(list, index) {
        for (; index + 1 < list.length; index++)
          list[index] = list[index + 1];
        list.pop();
      }
      function unwrapListeners(arr) {
        var ret = new Array(arr.length);
        for (var i3 = 0; i3 < ret.length; ++i3) {
          ret[i3] = arr[i3].listener || arr[i3];
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
  function w(n2, l3) {
    for (var t3 in l3) n2[t3] = l3[t3];
    return n2;
  }
  function g(n2) {
    n2 && n2.parentNode && n2.parentNode.removeChild(n2);
  }
  function _(l3, t3, u3) {
    var i3, r3, o3, e3 = {};
    for (o3 in t3) "key" == o3 ? i3 = t3[o3] : "ref" == o3 ? r3 = t3[o3] : e3[o3] = t3[o3];
    if (arguments.length > 2 && (e3.children = arguments.length > 3 ? n.call(arguments, 2) : u3), "function" == typeof l3 && null != l3.defaultProps) for (o3 in l3.defaultProps) void 0 === e3[o3] && (e3[o3] = l3.defaultProps[o3]);
    return m(l3, e3, i3, r3, null);
  }
  function m(n2, u3, i3, r3, o3) {
    var e3 = { type: n2, props: u3, key: i3, ref: r3, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: null == o3 ? ++t : o3, __i: -1, __u: 0 };
    return null == o3 && null != l.vnode && l.vnode(e3), e3;
  }
  function k(n2) {
    return n2.children;
  }
  function x(n2, l3) {
    this.props = n2, this.context = l3;
  }
  function S(n2, l3) {
    if (null == l3) return n2.__ ? S(n2.__, n2.__i + 1) : null;
    for (var t3; l3 < n2.__k.length; l3++) if (null != (t3 = n2.__k[l3]) && null != t3.__e) return t3.__e;
    return "function" == typeof n2.type ? S(n2) : null;
  }
  function C(n2) {
    var l3, t3;
    if (null != (n2 = n2.__) && null != n2.__c) {
      for (n2.__e = n2.__c.base = null, l3 = 0; l3 < n2.__k.length; l3++) if (null != (t3 = n2.__k[l3]) && null != t3.__e) {
        n2.__e = n2.__c.base = t3.__e;
        break;
      }
      return C(n2);
    }
  }
  function M(n2) {
    (!n2.__d && (n2.__d = true) && i.push(n2) && !$.__r++ || r !== l.debounceRendering) && ((r = l.debounceRendering) || o)($);
  }
  function $() {
    for (var n2, t3, u3, r3, o3, f3, c3, s3 = 1; i.length; ) i.length > s3 && i.sort(e), n2 = i.shift(), s3 = i.length, n2.__d && (u3 = void 0, o3 = (r3 = (t3 = n2).__v).__e, f3 = [], c3 = [], t3.__P && ((u3 = w({}, r3)).__v = r3.__v + 1, l.vnode && l.vnode(u3), O(t3.__P, u3, r3, t3.__n, t3.__P.namespaceURI, 32 & r3.__u ? [o3] : null, f3, null == o3 ? S(r3) : o3, !!(32 & r3.__u), c3), u3.__v = r3.__v, u3.__.__k[u3.__i] = u3, z(f3, u3, c3), u3.__e != o3 && C(u3)));
    $.__r = 0;
  }
  function I(n2, l3, t3, u3, i3, r3, o3, e3, f3, c3, s3) {
    var a3, h3, y3, d3, w3, g2, _2 = u3 && u3.__k || v, m3 = l3.length;
    for (f3 = P(t3, l3, _2, f3, m3), a3 = 0; a3 < m3; a3++) null != (y3 = t3.__k[a3]) && (h3 = -1 === y3.__i ? p : _2[y3.__i] || p, y3.__i = a3, g2 = O(n2, y3, h3, i3, r3, o3, e3, f3, c3, s3), d3 = y3.__e, y3.ref && h3.ref != y3.ref && (h3.ref && q(h3.ref, null, y3), s3.push(y3.ref, y3.__c || d3, y3)), null == w3 && null != d3 && (w3 = d3), 4 & y3.__u || h3.__k === y3.__k ? f3 = A(y3, f3, n2) : "function" == typeof y3.type && void 0 !== g2 ? f3 = g2 : d3 && (f3 = d3.nextSibling), y3.__u &= -7);
    return t3.__e = w3, f3;
  }
  function P(n2, l3, t3, u3, i3) {
    var r3, o3, e3, f3, c3, s3 = t3.length, a3 = s3, h3 = 0;
    for (n2.__k = new Array(i3), r3 = 0; r3 < i3; r3++) null != (o3 = l3[r3]) && "boolean" != typeof o3 && "function" != typeof o3 ? (f3 = r3 + h3, (o3 = n2.__k[r3] = "string" == typeof o3 || "number" == typeof o3 || "bigint" == typeof o3 || o3.constructor == String ? m(null, o3, null, null, null) : d(o3) ? m(k, { children: o3 }, null, null, null) : void 0 === o3.constructor && o3.__b > 0 ? m(o3.type, o3.props, o3.key, o3.ref ? o3.ref : null, o3.__v) : o3).__ = n2, o3.__b = n2.__b + 1, e3 = null, -1 !== (c3 = o3.__i = L(o3, t3, f3, a3)) && (a3--, (e3 = t3[c3]) && (e3.__u |= 2)), null == e3 || null === e3.__v ? (-1 == c3 && (i3 > s3 ? h3-- : i3 < s3 && h3++), "function" != typeof o3.type && (o3.__u |= 4)) : c3 != f3 && (c3 == f3 - 1 ? h3-- : c3 == f3 + 1 ? h3++ : (c3 > f3 ? h3-- : h3++, o3.__u |= 4))) : n2.__k[r3] = null;
    if (a3) for (r3 = 0; r3 < s3; r3++) null != (e3 = t3[r3]) && 0 == (2 & e3.__u) && (e3.__e == u3 && (u3 = S(e3)), B(e3, e3));
    return u3;
  }
  function A(n2, l3, t3) {
    var u3, i3;
    if ("function" == typeof n2.type) {
      for (u3 = n2.__k, i3 = 0; u3 && i3 < u3.length; i3++) u3[i3] && (u3[i3].__ = n2, l3 = A(u3[i3], l3, t3));
      return l3;
    }
    n2.__e != l3 && (l3 && n2.type && !t3.contains(l3) && (l3 = S(n2)), t3.insertBefore(n2.__e, l3 || null), l3 = n2.__e);
    do {
      l3 = l3 && l3.nextSibling;
    } while (null != l3 && 8 == l3.nodeType);
    return l3;
  }
  function L(n2, l3, t3, u3) {
    var i3, r3, o3 = n2.key, e3 = n2.type, f3 = l3[t3];
    if (null === f3 && null == n2.key || f3 && o3 == f3.key && e3 === f3.type && 0 == (2 & f3.__u)) return t3;
    if (u3 > (null != f3 && 0 == (2 & f3.__u) ? 1 : 0)) for (i3 = t3 - 1, r3 = t3 + 1; i3 >= 0 || r3 < l3.length; ) {
      if (i3 >= 0) {
        if ((f3 = l3[i3]) && 0 == (2 & f3.__u) && o3 == f3.key && e3 === f3.type) return i3;
        i3--;
      }
      if (r3 < l3.length) {
        if ((f3 = l3[r3]) && 0 == (2 & f3.__u) && o3 == f3.key && e3 === f3.type) return r3;
        r3++;
      }
    }
    return -1;
  }
  function T(n2, l3, t3) {
    "-" == l3[0] ? n2.setProperty(l3, null == t3 ? "" : t3) : n2[l3] = null == t3 ? "" : "number" != typeof t3 || y.test(l3) ? t3 : t3 + "px";
  }
  function j(n2, l3, t3, u3, i3) {
    var r3;
    n: if ("style" == l3) if ("string" == typeof t3) n2.style.cssText = t3;
    else {
      if ("string" == typeof u3 && (n2.style.cssText = u3 = ""), u3) for (l3 in u3) t3 && l3 in t3 || T(n2.style, l3, "");
      if (t3) for (l3 in t3) u3 && t3[l3] === u3[l3] || T(n2.style, l3, t3[l3]);
    }
    else if ("o" == l3[0] && "n" == l3[1]) r3 = l3 != (l3 = l3.replace(f, "$1")), l3 = l3.toLowerCase() in n2 || "onFocusOut" == l3 || "onFocusIn" == l3 ? l3.toLowerCase().slice(2) : l3.slice(2), n2.l || (n2.l = {}), n2.l[l3 + r3] = t3, t3 ? u3 ? t3.t = u3.t : (t3.t = c, n2.addEventListener(l3, r3 ? a : s, r3)) : n2.removeEventListener(l3, r3 ? a : s, r3);
    else {
      if ("http://www.w3.org/2000/svg" == i3) l3 = l3.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
      else if ("width" != l3 && "height" != l3 && "href" != l3 && "list" != l3 && "form" != l3 && "tabIndex" != l3 && "download" != l3 && "rowSpan" != l3 && "colSpan" != l3 && "role" != l3 && "popover" != l3 && l3 in n2) try {
        n2[l3] = null == t3 ? "" : t3;
        break n;
      } catch (n3) {
      }
      "function" == typeof t3 || (null == t3 || false === t3 && "-" != l3[4] ? n2.removeAttribute(l3) : n2.setAttribute(l3, "popover" == l3 && 1 == t3 ? "" : t3));
    }
  }
  function F(n2) {
    return function(t3) {
      if (this.l) {
        var u3 = this.l[t3.type + n2];
        if (null == t3.u) t3.u = c++;
        else if (t3.u < u3.t) return;
        return u3(l.event ? l.event(t3) : t3);
      }
    };
  }
  function O(n2, t3, u3, i3, r3, o3, e3, f3, c3, s3) {
    var a3, h3, p3, v3, y3, _2, m3, b, S2, C3, M2, $2, P2, A3, H, L2, T3, j3 = t3.type;
    if (void 0 !== t3.constructor) return null;
    128 & u3.__u && (c3 = !!(32 & u3.__u), o3 = [f3 = t3.__e = u3.__e]), (a3 = l.__b) && a3(t3);
    n: if ("function" == typeof j3) try {
      if (b = t3.props, S2 = "prototype" in j3 && j3.prototype.render, C3 = (a3 = j3.contextType) && i3[a3.__c], M2 = a3 ? C3 ? C3.props.value : a3.__ : i3, u3.__c ? m3 = (h3 = t3.__c = u3.__c).__ = h3.__E : (S2 ? t3.__c = h3 = new j3(b, M2) : (t3.__c = h3 = new x(b, M2), h3.constructor = j3, h3.render = D), C3 && C3.sub(h3), h3.props = b, h3.state || (h3.state = {}), h3.context = M2, h3.__n = i3, p3 = h3.__d = true, h3.__h = [], h3._sb = []), S2 && null == h3.__s && (h3.__s = h3.state), S2 && null != j3.getDerivedStateFromProps && (h3.__s == h3.state && (h3.__s = w({}, h3.__s)), w(h3.__s, j3.getDerivedStateFromProps(b, h3.__s))), v3 = h3.props, y3 = h3.state, h3.__v = t3, p3) S2 && null == j3.getDerivedStateFromProps && null != h3.componentWillMount && h3.componentWillMount(), S2 && null != h3.componentDidMount && h3.__h.push(h3.componentDidMount);
      else {
        if (S2 && null == j3.getDerivedStateFromProps && b !== v3 && null != h3.componentWillReceiveProps && h3.componentWillReceiveProps(b, M2), !h3.__e && (null != h3.shouldComponentUpdate && false === h3.shouldComponentUpdate(b, h3.__s, M2) || t3.__v == u3.__v)) {
          for (t3.__v != u3.__v && (h3.props = b, h3.state = h3.__s, h3.__d = false), t3.__e = u3.__e, t3.__k = u3.__k, t3.__k.some(function(n3) {
            n3 && (n3.__ = t3);
          }), $2 = 0; $2 < h3._sb.length; $2++) h3.__h.push(h3._sb[$2]);
          h3._sb = [], h3.__h.length && e3.push(h3);
          break n;
        }
        null != h3.componentWillUpdate && h3.componentWillUpdate(b, h3.__s, M2), S2 && null != h3.componentDidUpdate && h3.__h.push(function() {
          h3.componentDidUpdate(v3, y3, _2);
        });
      }
      if (h3.context = M2, h3.props = b, h3.__P = n2, h3.__e = false, P2 = l.__r, A3 = 0, S2) {
        for (h3.state = h3.__s, h3.__d = false, P2 && P2(t3), a3 = h3.render(h3.props, h3.state, h3.context), H = 0; H < h3._sb.length; H++) h3.__h.push(h3._sb[H]);
        h3._sb = [];
      } else do {
        h3.__d = false, P2 && P2(t3), a3 = h3.render(h3.props, h3.state, h3.context), h3.state = h3.__s;
      } while (h3.__d && ++A3 < 25);
      h3.state = h3.__s, null != h3.getChildContext && (i3 = w(w({}, i3), h3.getChildContext())), S2 && !p3 && null != h3.getSnapshotBeforeUpdate && (_2 = h3.getSnapshotBeforeUpdate(v3, y3)), L2 = a3, null != a3 && a3.type === k && null == a3.key && (L2 = N(a3.props.children)), f3 = I(n2, d(L2) ? L2 : [L2], t3, u3, i3, r3, o3, e3, f3, c3, s3), h3.base = t3.__e, t3.__u &= -161, h3.__h.length && e3.push(h3), m3 && (h3.__E = h3.__ = null);
    } catch (n3) {
      if (t3.__v = null, c3 || null != o3) if (n3.then) {
        for (t3.__u |= c3 ? 160 : 128; f3 && 8 == f3.nodeType && f3.nextSibling; ) f3 = f3.nextSibling;
        o3[o3.indexOf(f3)] = null, t3.__e = f3;
      } else for (T3 = o3.length; T3--; ) g(o3[T3]);
      else t3.__e = u3.__e, t3.__k = u3.__k;
      l.__e(n3, t3, u3);
    }
    else null == o3 && t3.__v == u3.__v ? (t3.__k = u3.__k, t3.__e = u3.__e) : f3 = t3.__e = V(u3.__e, t3, u3, i3, r3, o3, e3, c3, s3);
    return (a3 = l.diffed) && a3(t3), 128 & t3.__u ? void 0 : f3;
  }
  function z(n2, t3, u3) {
    for (var i3 = 0; i3 < u3.length; i3++) q(u3[i3], u3[++i3], u3[++i3]);
    l.__c && l.__c(t3, n2), n2.some(function(t4) {
      try {
        n2 = t4.__h, t4.__h = [], n2.some(function(n3) {
          n3.call(t4);
        });
      } catch (n3) {
        l.__e(n3, t4.__v);
      }
    });
  }
  function N(n2) {
    return "object" != typeof n2 || null == n2 ? n2 : d(n2) ? n2.map(N) : w({}, n2);
  }
  function V(t3, u3, i3, r3, o3, e3, f3, c3, s3) {
    var a3, h3, v3, y3, w3, _2, m3, b = i3.props, k3 = u3.props, x2 = u3.type;
    if ("svg" == x2 ? o3 = "http://www.w3.org/2000/svg" : "math" == x2 ? o3 = "http://www.w3.org/1998/Math/MathML" : o3 || (o3 = "http://www.w3.org/1999/xhtml"), null != e3) {
      for (a3 = 0; a3 < e3.length; a3++) if ((w3 = e3[a3]) && "setAttribute" in w3 == !!x2 && (x2 ? w3.localName == x2 : 3 == w3.nodeType)) {
        t3 = w3, e3[a3] = null;
        break;
      }
    }
    if (null == t3) {
      if (null == x2) return document.createTextNode(k3);
      t3 = document.createElementNS(o3, x2, k3.is && k3), c3 && (l.__m && l.__m(u3, e3), c3 = false), e3 = null;
    }
    if (null === x2) b === k3 || c3 && t3.data === k3 || (t3.data = k3);
    else {
      if (e3 = e3 && n.call(t3.childNodes), b = i3.props || p, !c3 && null != e3) for (b = {}, a3 = 0; a3 < t3.attributes.length; a3++) b[(w3 = t3.attributes[a3]).name] = w3.value;
      for (a3 in b) if (w3 = b[a3], "children" == a3) ;
      else if ("dangerouslySetInnerHTML" == a3) v3 = w3;
      else if (!(a3 in k3)) {
        if ("value" == a3 && "defaultValue" in k3 || "checked" == a3 && "defaultChecked" in k3) continue;
        j(t3, a3, null, w3, o3);
      }
      for (a3 in k3) w3 = k3[a3], "children" == a3 ? y3 = w3 : "dangerouslySetInnerHTML" == a3 ? h3 = w3 : "value" == a3 ? _2 = w3 : "checked" == a3 ? m3 = w3 : c3 && "function" != typeof w3 || b[a3] === w3 || j(t3, a3, w3, b[a3], o3);
      if (h3) c3 || v3 && (h3.__html === v3.__html || h3.__html === t3.innerHTML) || (t3.innerHTML = h3.__html), u3.__k = [];
      else if (v3 && (t3.innerHTML = ""), I("template" === u3.type ? t3.content : t3, d(y3) ? y3 : [y3], u3, i3, r3, "foreignObject" == x2 ? "http://www.w3.org/1999/xhtml" : o3, e3, f3, e3 ? e3[0] : i3.__k && S(i3, 0), c3, s3), null != e3) for (a3 = e3.length; a3--; ) g(e3[a3]);
      c3 || (a3 = "value", "progress" == x2 && null == _2 ? t3.removeAttribute("value") : void 0 !== _2 && (_2 !== t3[a3] || "progress" == x2 && !_2 || "option" == x2 && _2 !== b[a3]) && j(t3, a3, _2, b[a3], o3), a3 = "checked", void 0 !== m3 && m3 !== t3[a3] && j(t3, a3, m3, b[a3], o3));
    }
    return t3;
  }
  function q(n2, t3, u3) {
    try {
      if ("function" == typeof n2) {
        var i3 = "function" == typeof n2.__u;
        i3 && n2.__u(), i3 && null == t3 || (n2.__u = n2(t3));
      } else n2.current = t3;
    } catch (n3) {
      l.__e(n3, u3);
    }
  }
  function B(n2, t3, u3) {
    var i3, r3;
    if (l.unmount && l.unmount(n2), (i3 = n2.ref) && (i3.current && i3.current !== n2.__e || q(i3, null, t3)), null != (i3 = n2.__c)) {
      if (i3.componentWillUnmount) try {
        i3.componentWillUnmount();
      } catch (n3) {
        l.__e(n3, t3);
      }
      i3.base = i3.__P = null;
    }
    if (i3 = n2.__k) for (r3 = 0; r3 < i3.length; r3++) i3[r3] && B(i3[r3], t3, u3 || "function" != typeof n2.type);
    u3 || g(n2.__e), n2.__c = n2.__ = n2.__e = void 0;
  }
  function D(n2, l3, t3) {
    return this.constructor(n2, t3);
  }
  function E(t3, u3, i3) {
    var r3, o3, e3, f3;
    u3 == document && (u3 = document.documentElement), l.__ && l.__(t3, u3), o3 = (r3 = "function" == typeof i3) ? null : i3 && i3.__k || u3.__k, e3 = [], f3 = [], O(u3, t3 = (!r3 && i3 || u3).__k = _(k, null, [t3]), o3 || p, p, u3.namespaceURI, !r3 && i3 ? [i3] : o3 ? null : u3.firstChild ? n.call(u3.childNodes) : null, e3, !r3 && i3 ? i3 : o3 ? o3.__e : u3.firstChild, r3, f3), z(e3, t3, f3);
  }
  n = v.slice, l = { __e: function(n2, l3, t3, u3) {
    for (var i3, r3, o3; l3 = l3.__; ) if ((i3 = l3.__c) && !i3.__) try {
      if ((r3 = i3.constructor) && null != r3.getDerivedStateFromError && (i3.setState(r3.getDerivedStateFromError(n2)), o3 = i3.__d), null != i3.componentDidCatch && (i3.componentDidCatch(n2, u3 || {}), o3 = i3.__d), o3) return i3.__E = i3;
    } catch (l4) {
      n2 = l4;
    }
    throw n2;
  } }, t = 0, u = function(n2) {
    return null != n2 && null == n2.constructor;
  }, x.prototype.setState = function(n2, l3) {
    var t3;
    t3 = null != this.__s && this.__s !== this.state ? this.__s : this.__s = w({}, this.state), "function" == typeof n2 && (n2 = n2(w({}, t3), this.props)), n2 && w(t3, n2), null != n2 && this.__v && (l3 && this._sb.push(l3), M(this));
  }, x.prototype.forceUpdate = function(n2) {
    this.__v && (this.__e = true, n2 && this.__h.push(n2), M(this));
  }, x.prototype.render = k, i = [], o = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, e = function(n2, l3) {
    return n2.__v.__b - l3.__v.__b;
  }, $.__r = 0, f = /(PointerCapture)$|Capture$/i, c = 0, s = F(false), a = F(true), h = 0;

  // src/socket.ts
  var import_events = __toESM(require_events());
  var ClientSocket = class extends import_events.EventEmitter {
    constructor(ws) {
      super();
      this.ws = ws;
      ws.addEventListener("message", (m3) => {
        const [name, value] = JSON.parse(m3.data);
        this.emit(name, value);
      });
    }
    id;
    send(name, value) {
      this.ws.send(JSON.stringify([name, value]));
    }
  };

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
  function p2(n2, t3) {
    c2.__h && c2.__h(r2, n2, o2 || t3), o2 = 0;
    var u3 = r2.__H || (r2.__H = { __: [], __h: [] });
    return n2 >= u3.__.length && u3.__.push({}), u3.__[n2];
  }
  function d2(n2) {
    return o2 = 1, h2(D2, n2);
  }
  function h2(n2, u3, i3) {
    var o3 = p2(t2++, 2);
    if (o3.t = n2, !o3.__c && (o3.__ = [i3 ? i3(u3) : D2(void 0, u3), function(n3) {
      var t3 = o3.__N ? o3.__N[0] : o3.__[0], r3 = o3.t(t3, n3);
      t3 !== r3 && (o3.__N = [r3, o3.__[1]], o3.__c.setState({}));
    }], o3.__c = r2, !r2.__f)) {
      var f3 = function(n3, t3, r3) {
        if (!o3.__c.__H) return true;
        var u4 = o3.__c.__H.__.filter(function(n4) {
          return !!n4.__c;
        });
        if (u4.every(function(n4) {
          return !n4.__N;
        })) return !c3 || c3.call(this, n3, t3, r3);
        var i4 = o3.__c.props !== n3;
        return u4.forEach(function(n4) {
          if (n4.__N) {
            var t4 = n4.__[0];
            n4.__ = n4.__N, n4.__N = void 0, t4 !== n4.__[0] && (i4 = true);
          }
        }), c3 && c3.call(this, n3, t3, r3) || i4;
      };
      r2.__f = true;
      var c3 = r2.shouldComponentUpdate, e3 = r2.componentWillUpdate;
      r2.componentWillUpdate = function(n3, t3, r3) {
        if (this.__e) {
          var u4 = c3;
          c3 = void 0, f3(n3, t3, r3), c3 = u4;
        }
        e3 && e3.call(this, n3, t3, r3);
      }, r2.shouldComponentUpdate = f3;
    }
    return o3.__N || o3.__;
  }
  function y2(n2, u3) {
    var i3 = p2(t2++, 3);
    !c2.__s && C2(i3.__H, u3) && (i3.__ = n2, i3.u = u3, r2.__H.__h.push(i3));
  }
  function A2(n2) {
    return o2 = 5, T2(function() {
      return { current: n2 };
    }, []);
  }
  function T2(n2, r3) {
    var u3 = p2(t2++, 7);
    return C2(u3.__H, r3) && (u3.__ = n2(), u3.__H = r3, u3.__h = n2), u3.__;
  }
  function j2() {
    for (var n2; n2 = f2.shift(); ) if (n2.__P && n2.__H) try {
      n2.__H.__h.forEach(z2), n2.__H.__h.forEach(B2), n2.__H.__h = [];
    } catch (t3) {
      n2.__H.__h = [], c2.__e(t3, n2.__v);
    }
  }
  c2.__b = function(n2) {
    r2 = null, e2 && e2(n2);
  }, c2.__ = function(n2, t3) {
    n2 && t3.__k && t3.__k.__m && (n2.__m = t3.__k.__m), s2 && s2(n2, t3);
  }, c2.__r = function(n2) {
    a2 && a2(n2), t2 = 0;
    var i3 = (r2 = n2.__c).__H;
    i3 && (u2 === r2 ? (i3.__h = [], r2.__h = [], i3.__.forEach(function(n3) {
      n3.__N && (n3.__ = n3.__N), n3.u = n3.__N = void 0;
    })) : (i3.__h.forEach(z2), i3.__h.forEach(B2), i3.__h = [], t2 = 0)), u2 = r2;
  }, c2.diffed = function(n2) {
    v2 && v2(n2);
    var t3 = n2.__c;
    t3 && t3.__H && (t3.__H.__h.length && (1 !== f2.push(t3) && i2 === c2.requestAnimationFrame || ((i2 = c2.requestAnimationFrame) || w2)(j2)), t3.__H.__.forEach(function(n3) {
      n3.u && (n3.__H = n3.u), n3.u = void 0;
    })), u2 = r2 = null;
  }, c2.__c = function(n2, t3) {
    t3.some(function(n3) {
      try {
        n3.__h.forEach(z2), n3.__h = n3.__h.filter(function(n4) {
          return !n4.__ || B2(n4);
        });
      } catch (r3) {
        t3.some(function(n4) {
          n4.__h && (n4.__h = []);
        }), t3 = [], c2.__e(r3, n3.__v);
      }
    }), l2 && l2(n2, t3);
  }, c2.unmount = function(n2) {
    m2 && m2(n2);
    var t3, r3 = n2.__c;
    r3 && r3.__H && (r3.__H.__.forEach(function(n3) {
      try {
        z2(n3);
      } catch (n4) {
        t3 = n4;
      }
    }), r3.__H = void 0, t3 && c2.__e(t3, r3.__v));
  };
  var k2 = "function" == typeof requestAnimationFrame;
  function w2(n2) {
    var t3, r3 = function() {
      clearTimeout(u3), k2 && cancelAnimationFrame(t3), setTimeout(n2);
    }, u3 = setTimeout(r3, 100);
    k2 && (t3 = requestAnimationFrame(r3));
  }
  function z2(n2) {
    var t3 = r2, u3 = n2.__c;
    "function" == typeof u3 && (n2.__c = void 0, u3()), r2 = t3;
  }
  function B2(n2) {
    var t3 = r2;
    n2.__c = n2.__(), r2 = t3;
  }
  function C2(n2, t3) {
    return !n2 || n2.length !== t3.length || t3.some(function(t4, r3) {
      return t4 !== n2[r3];
    });
  }
  function D2(n2, t3) {
    return "function" == typeof t3 ? t3(n2) : t3;
  }

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

  // src/admin/userlist.tsx
  function UserList() {
    const [joined, setJoined] = useJoined();
    y2(() => {
      const handleUserJoin = (e3) => {
        setJoined(
          (previous) => previous ? previous.find((u3) => u3.id === e3.id) ? previous : [...previous, e3] : [e3]
        );
      };
      const handleUserLeave = ({ uid }) => {
        console.log("leave", uid);
        setJoined(
          (previous) => previous ? [...previous.filter((u3) => u3.id !== uid)] : []
        );
      };
      const handleUserCorrect = (e3) => {
        setJoined(
          (previous) => previous ? previous.map((u3) => u3.id === e3.uid ? { ...u3, correct: true } : u3) : []
        );
      };
      const handleUserIncorrect = (e3) => {
        setJoined(
          (previous) => previous ? previous.map((u3) => u3.id === e3.uid ? { ...u3, correct: false } : u3) : []
        );
      };
      const handleQuestionBegin = () => {
        setJoined(
          (previous) => previous ? previous.map((u3) => ({ ...u3, correct: void 0 })) : []
        );
      };
      const handleQuestionEnd = ({ users }) => {
        setJoined(users);
      };
      adminws.on("join", handleUserJoin);
      adminws.on("leave", handleUserLeave);
      adminws.on("O", handleUserCorrect);
      adminws.on("X", handleUserIncorrect);
      adminws.on("questionBegin", handleQuestionBegin);
      adminws.on("questionEnd", handleQuestionEnd);
      return () => {
        adminws.off("join", handleUserJoin);
        adminws.off("leave", handleUserLeave);
        adminws.off("O", handleUserCorrect);
        adminws.off("X", handleUserIncorrect);
        adminws.off("questionBegin", handleQuestionBegin);
        adminws.off("questionEnd", handleQuestionEnd);
      };
    }, []);
    return /* @__PURE__ */ _("div", { className: "user-list-base", style: { height: "300px" } }, joined ? joined.map((user) => /* @__PURE__ */ _("div", { className: "user-list-content" }, /* @__PURE__ */ _(
      "img",
      {
        className: "user-list-icon",
        src: `/icons/${user.id}`,
        alt: user.name
      }
    ), /* @__PURE__ */ _("div", { className: "user-list-name" }, user.name, /* @__PURE__ */ _("span", { style: { color: "#0ff", marginLeft: "10px" } }, user.score), typeof user.correct === "boolean" ? /* @__PURE__ */ _("span", { style: { color: "#f0f", marginLeft: "10px" } }, user.correct ? "\u25CB" : "\xD7") : "", user.first ? /* @__PURE__ */ _("span", { style: { color: "#ff0", marginLeft: "10px" } }, "1st") : ""))) : "");
  }

  // src/admin/setting.tsx
  function Setting() {
    const [step, setStep] = d2(0);
    const [currentQ, setCurrentQ] = d2(-1);
    const fileRef = A2(null);
    const [fileName, setFileName] = d2("");
    const qRef = A2([]);
    return /* @__PURE__ */ _("div", null, /* @__PURE__ */ _("h3", { style: { textAlign: "center" } }, "Setting"), /* @__PURE__ */ _("div", { className: "admin-settings" }, step === 0 ? /* @__PURE__ */ _("label", { class: "csv-label" }, /* @__PURE__ */ _(
      "input",
      {
        ref: fileRef,
        type: "file",
        className: "file-input",
        accept: ".csv",
        onInput: async (e3) => {
          if (!fileRef.current || !fileRef.current.files) {
            return;
          }
          qRef.current = parseCsv(
            await fileRef.current.files[0].text()
          );
          setFileName(fileRef.current.files[0].name);
          setStep(1);
        }
      }
    ), "\u554F\u984C\u30EA\u30B9\u30C8(csv)\u3092\u9078\u629E") : step === 1 ? /* @__PURE__ */ _("p", { style: { textAlign: "center" }, onClick: () => setStep(0) }, fileName) : "", step === 1 ? /* @__PURE__ */ _("div", null, /* @__PURE__ */ _(Questions, { questions: qRef.current }), /* @__PURE__ */ _(
      "button",
      {
        className: "admin-button",
        type: "button",
        onClick: () => {
          if (!confirm("\u3053\u306E\u8A2D\u5B9A\u3067\u30AF\u30A4\u30BA\u3092\u958B\u59CB\u3057\u307E\u3059\u304B\uFF1F")) {
            return;
          }
          adminws.send("start", { t: Date.now() + 1e3 });
          setStep(2);
        }
      },
      "\u30AF\u30A4\u30BA\u3092\u958B\u59CB"
    )) : "", step === 2 || step === 3 ? /* @__PURE__ */ _("div", null, /* @__PURE__ */ _(Questions, { questions: qRef.current, current: currentQ }), step === 3 ? /* @__PURE__ */ _(
      "button",
      {
        className: "admin-button",
        type: "button",
        onClick: () => {
          adminws.send("questionEnd", {
            users: [],
            id: currentQ,
            t: Date.now() + 1e3
          });
          if (currentQ === qRef.current.length - 1) {
            setStep(4);
            return;
          }
          setStep(2);
        }
      },
      "\u3053\u306E\u554F\u984C\u3092\u7D42\u4E86"
    ) : /* @__PURE__ */ _(
      "button",
      {
        className: "admin-button",
        type: "button",
        onClick: () => {
          adminws.send("questionBegin", {
            q: qRef.current[currentQ + 1],
            t: Date.now() + 1e3
          });
          setCurrentQ(currentQ + 1);
          setStep(3);
        }
      },
      "\u6B21\u306E\u554F\u984C\u3092\u958B\u59CB"
    )) : "", step === 4 ? /* @__PURE__ */ _(
      "button",
      {
        className: "admin-button",
        type: "button",
        onClick: () => {
          adminws.send("end", {
            users: []
          });
          setCurrentQ(currentQ + 1);
          location.reload();
        }
      },
      "\u30AF\u30A4\u30BA\u3092\u7D42\u4E86"
    ) : ""));
  }
  function Questions(param) {
    return /* @__PURE__ */ _("div", { className: "csv-list-base" }, /* @__PURE__ */ _("div", { className: "csv-list-row", style: { backgroundColor: "#aff" } }, /* @__PURE__ */ _("div", { className: "csv-list-text" }, "\u554F\u984C\u6587"), /* @__PURE__ */ _("div", { className: "csv-list-answer" }, "\u89E3\u7B54"), /* @__PURE__ */ _("div", { className: "csv-list-answer" }, "\u304B\u3044\u3068\u3046")), param.questions.map((q2, i3) => /* @__PURE__ */ _(
      "div",
      {
        key: q2.id,
        className: param.current === i3 ? "csv-list-row -current" : "csv-list-row"
      },
      /* @__PURE__ */ _("div", { className: "csv-list-text" }, q2.text),
      /* @__PURE__ */ _("div", { className: "csv-list-answer" }, q2.answer.answer),
      /* @__PURE__ */ _("div", { className: "csv-list-answer" }, q2.answer.short)
    )));
  }
  function parseCsv(param) {
    const lines = param.split("\n");
    const res = [];
    let i3 = 0;
    for (const line of lines) {
      if (!line) {
        continue;
      }
      if (i3 === 0) {
        i3++;
        continue;
      }
      const [text, short, answer] = line.split(",");
      res.push({ text, answer: { answer, short }, id: res.length });
      i3++;
    }
    return res;
  }

  // src/admin.tsx
  E(/* @__PURE__ */ _(App, null), document.body);
  var adminws = new ClientSocket(new WebSocket("/ws-admin"));
  function App() {
    const [error, setError] = d2("");
    y2(() => {
      adminws.ws.addEventListener("error", (e3) => {
        setError(e3.toString());
      });
      adminws.ws.addEventListener("close", (e3) => {
        setError("\u63A5\u7D9A\u304C\u5207\u65AD\u3055\u308C\u307E\u3057\u305F");
      });
    }, []);
    return /* @__PURE__ */ _("div", null, /* @__PURE__ */ _("h1", { style: { textAlign: "center" } }, "Admin"), error ? /* @__PURE__ */ _("h3", { style: { textAlign: "center", color: "#f00" } }, error) : "", /* @__PURE__ */ _("h3", { style: { textAlign: "center" } }, "\u53C2\u52A0\u4E2D\u306E\u30E6\u30FC\u30B6\u30FC"), /* @__PURE__ */ _(UserList, null), /* @__PURE__ */ _(Setting, null));
  }
})();

'use strict';
var exports = exports || {};
"use strict";
const _JSON = JSON;
var JSOX = exports;
function privateizeEverything() {
  function ma() {
    var b = Y.pop();
    b || (b = {context:0, current_class:null, current_class_field:0, arrayType:-1, elements:null, element_array:null});
    return b;
  }
  function qa() {
    var b = na.pop();
    b ? b.n = 0 : b = {buf:null, n:0};
    return b;
  }
  function x(b) {
    var e = "";
    b = new Uint8Array(b);
    var a = b.byteLength, q = a % 3;
    a -= q;
    for (var g, l, h, r, c = 0; c < a; c += 3) {
      r = b[c] << 16 | b[c + 1] << 8 | b[c + 2], g = (r & 16515072) >> 18, l = (r & 258048) >> 12, h = (r & 4032) >> 6, r &= 63, e += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[g] + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[l] + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[h] + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[r];
    }
    1 == q ? (r = b[a], e += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[(r & 252) >> 2] + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[(r & 3) << 4] + "==") : 2 == q && (r = b[a] << 8 | b[a + 1], e += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[(r & 64512) >> 10] + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[(r & 1008) >> 4] + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[(r & 15) << 2] + 
    "=");
    return e;
  }
  function sa(b) {
    var e = new ArrayBuffer(1 == b.length % 4 ? 3 * ((b.length + 3) / 4 | 0) - 3 : 2 == b.length % 4 ? 3 * ((b.length + 3) / 4 | 0) - 2 : 3 == b.length % 4 ? 3 * ((b.length + 3) / 4 | 0) - 1 : -1 == w[b[b.length - 3]] ? 3 * ((b.length + 3) / 4 | 0) - 3 : -1 == w[b[b.length - 2]] ? 3 * ((b.length + 3) / 4 | 0) - 2 : -1 == w[b[b.length - 1]] ? 3 * ((b.length + 3) / 4 | 0) - 1 : 3 * ((b.length + 3) / 4 | 0)), a = new Uint8Array(e), q, g = b.length + 3 >> 2;
    for (q = 0; q < g; q++) {
      var l = w[b[4 * q]], h = 4 * q + 1 < b.length ? w[b[4 * q + 1]] : -1, r = 0 <= h && 4 * q + 2 < b.length ? w[b[4 * q + 2]] : -1, c = 0 <= r && 4 * q + 3 < b.length ? w[b[4 * q + 3]] : -1;
      0 <= h && (a[3 * q] = l << 2 | h >> 4);
      0 <= r && (a[3 * q + 1] = h << 4 | r >> 2 & 15);
      0 <= c && (a[3 * q + 2] = r << 6 | c & 63);
    }
    return e;
  }
  const oa = "function" === typeof BigInt, ta = "ab u8 cu8 s8 u16 s16 u32 s32 u64 s64 f32 f64".split(" ");
  var X = null, Z = null;
  const ua = [ArrayBuffer, Uint8Array, Uint8ClampedArray, Int8Array, Uint16Array, Int16Array, Uint32Array, Int32Array, null, null, Float32Array, Float64Array], va = {["true"]:!0, ["false"]:!1, ["null"]:null, ["NaN"]:NaN, ["Infinity"]:Infinity, ["undefined"]:void 0}, Y = [], na = [];
  JSOX.escape = function(b) {
    var e, a = "";
    if (!b) {
      return b;
    }
    for (e = 0; e < b.length; e++) {
      if ('"' == b[e] || "\\" == b[e] || "`" == b[e] || "'" == b[e]) {
        a += "\\";
      }
      a += b[e];
    }
    return a;
  };
  var g = new WeakMap, U = new Map, Q = new Map;
  JSOX.begin = function(b, e) {
    const a = {name:null, value_type:0, string:"", contains:null, className:null};
    var q = 1, g = 1;
    let l = 0, h;
    var r = new Map, c = 0, p = !0, n = !1, C = null, V = null, B = void 0, E = [], t = {first:null, last:null, saved:null, push(a) {
      var c = this.saved;
      c ? (this.saved = c.next, c.node = a, c.next = null, c.prior = this.last) : c = {node:a, next:null, prior:this.last};
      this.last || (this.first = c);
      this.last = c;
      this.length++;
    }, pop() {
      var a = this.last;
      if (!a) {
        return null;
      }
      (this.last = a.prior) || (this.first = null);
      a.next = this.saved;
      this.saved = a;
      this.length--;
      return a.node;
    }, length:0}, ia = [], x = {}, m = null, H = 0, M = -1, d = 0, L = 0, w = !1, aa = !1, S = !1, ja = !1, k = !1, z = {first:null, last:null, saved:null, push(a) {
      var c = this.saved;
      c ? (this.saved = c.next, c.node = a, c.next = null, c.prior = this.last) : c = {node:a, next:null, prior:this.last};
      this.last || (this.first = c);
      this.last = c;
    }, shift() {
      var a = this.first;
      if (!a) {
        return null;
      }
      (this.first = a.next) || (this.last = null);
      a.next = this.saved;
      this.saved = a;
      return a.node;
    }, unshift(a) {
      var c = this.saved;
      c ? (this.saved = c.next, c.node = a, c.next = this.first, c.prior = null) : c = {node:a, next:this.first, prior:null};
      this.first || (this.last = c);
      this.first = c;
    }}, F = null, A = !1, y = !1, v = !1, ka = !1, ba = !1, T = !1, ca = !1, D = 0, N = 0, I = !1, J = !1, O = !1, da = !1;
    return {registerFromJSOX(a, c) {
      if (r.get(a)) {
        throw Error("Existing fromJSOX has been registered for prototype");
      }
      r.set(a, c);
    }, value() {
      var a = C;
      C = void 0;
      return a;
    }, reset() {
      c = 0;
      p = !0;
      z.last && (z.last.next = z.save);
      z.save = z.first;
      z.first = z.last = null;
      t.last && (t.last.next = t.save);
      t.save = z.first;
      E = t.first = t.last = null;
      B = void 0;
      d = 0;
      ia = [];
      x = {};
      m = null;
      H = 0;
      a.value_type = 0;
      a.name = null;
      a.string = "";
      a.className = null;
      g = q = 1;
      n = !1;
      L = 0;
      ka = v = A = J = !1;
    }, usePrototype(a, c) {
      x[a] = c;
    }, write(a) {
      "string" !== typeof a && (a = String(a));
      for (a = this._write(a, !1); 0 < a && !(C && ("function" === typeof e && function wa(a, c) {
        var b, d = a[c];
        if (d && "object" === typeof d) {
          for (b in d) {
            if (Object.prototype.hasOwnProperty.call(d, b)) {
              var p = wa(d, b);
              void 0 !== p ? d[b] = p : delete d[b];
            }
          }
        }
        return e.call(a, c, d);
      }({"":C}, ""), b(C), C = void 0), 2 > a); a = this._write()) {
      }
    }, _write(b, e) {
      function u(a, c) {
        throw Error(`${a} '${String.fromCodePoint(c)}' unexpected at ${l} (near '${K.substr(4 < l ? l - 4 : 0, 4 < l ? 3 : l - 1)}[${String.fromCodePoint(c)}]${K.substr(l, 10)}') [${q}:${g}]`);
      }
      function R() {
        a.value_type = 0;
        a.string = "";
      }
      function ra(a) {
        if (da) {
          if (oa) {
            return BigInt(a);
          }
          throw Error("no builtin BigInt()", 0);
        }
        return O ? new Date(a) : 1 < a.length && !w && !aa && !S && 48 === a.charCodeAt(0) ? (n ? -1 : 1) * Number("0o" + a) : (n ? -1 : 1) * Number(a);
      }
      function la() {
        var c = null;
        switch(a.value_type) {
          case 5:
            if (da) {
              if (oa) {
                return BigInt(a.string);
              }
              throw Error("no builtin BigInt()", 0);
            }
            return O ? new Date(a.string) : ra(a.string);
          case 4:
            return a.className && ((c = r.get(a.className)) || (c = Q.get(a.className)), a.className = null, c) ? c.call(a.string) : a.string;
          case 2:
            return !0;
          case 3:
            return !1;
          case 7:
            return NaN;
          case 8:
            return NaN;
          case 9:
            return -Infinity;
          case 10:
            return Infinity;
          case 1:
            return null;
          case -1:
            break;
          case 12:
            break;
          case 6:
            return a.className && ((c = r.get(a.className)) || (c = Q.get(a.className)), a.className = null, c) ? c.call(a.contains) : a.contains;
          case 13:
            if (0 <= M) {
              return c = sa(a.contains[0]), 0 === M ? c : new ua[M](c);
            }
            if (-2 === M) {
              var b = V;
              a.contains.forEach(a => b = b[a]);
              return b;
            }
            return a.className && ((c = r.get(a.className)) || (c = Q.get(a.className)), a.className = null, c) ? c.call(a.contains) : a.contains;
          default:
            console.log("Unhandled value conversion.", a);
        }
      }
      function X() {
        switch(a.value_type) {
          case 12:
            E.push(void 0);
            delete E[E.length - 1];
            break;
          default:
            E.push(la());
        }
        R();
      }
      function ea() {
        12 !== a.value_type && (B[a.name] = la(), R());
      }
      function G(b) {
        if (0 !== c) {
          switch(n && (valstring += "-", n = !1), c) {
            case 31:
              switch(a.value_type) {
                case 2:
                  a.string += "true";
                  break;
                case 3:
                  a.string += "false";
                  break;
                case 1:
                  a.string += "null";
                  break;
                case 10:
                  a.string += "Infinity";
                  break;
                case 9:
                  a.string += "-Infinity";
                  break;
                case 8:
                  a.string += "NaN";
                  break;
                case 7:
                  a.string += "-NaN";
                  break;
                case -1:
                  a.string += "undefined";
                  break;
                case 4:
                  break;
                default:
                  console.log("Value of type " + a.value_type + " is not restored...");
              }case 1:
              a.string += "t";
              break;
            case 2:
              a.string += "tr";
              break;
            case 3:
              a.string += "tru";
              break;
            case 5:
              a.string += "f";
              break;
            case 6:
              a.string += "fa";
              break;
            case 7:
              a.string += "fal";
              break;
            case 8:
              a.string += "fals";
              break;
            case 9:
              a.string += "n";
              break;
            case 10:
              a.string += "nu";
              break;
            case 11:
              a.string += "nul";
              break;
            case 12:
              a.string += "u";
              break;
            case 13:
              a.string += "un";
              break;
            case 14:
              a.string += "und";
              break;
            case 15:
              a.string += "unde";
              break;
            case 16:
              a.string += "undef";
              break;
            case 17:
              a.string += "undefi";
              break;
            case 18:
              a.string += "undefin";
              break;
            case 19:
              a.string += "undefine";
              break;
            case 20:
              a.string += "M";
              break;
            case 21:
              a.string += "Na";
              break;
            case 22:
              a.string += "I";
              break;
            case 23:
              a.string += "In";
              break;
            case 24:
              a.string += "Inf";
              break;
            case 25:
              a.string += "Infi";
              break;
            case 26:
              a.string += "Infin";
              break;
            case 27:
              a.string += "Infini";
              break;
            case 28:
              a.string += "Infinit";
          }
        }
        a.value_type = 4;
        c = 29;
        123 == b ? Z() : 91 == b ? ha() : 32 != b && 13 != b && 10 != b && 9 != b && 65279 != b && 2028 != b && 2029 != b && (44 == b || 125 == b || 93 == b || 58 == b ? u("Invalid character near identifier", b) : a.string += h);
      }
      function U(c) {
        let b = 0;
        for (; 0 == b && l < K.length;) {
          h = K.charAt(l);
          let d = K.codePointAt(l++);
          65536 <= d && (h += K.charAt(l), l++);
          g++;
          if (d == c) {
            v ? (a.string += h, v = !1) : (I ? u("Incomplete Octal sequence", d) : ca ? u("Incomplete hexidecimal sequence", d) : T ? u("Incomplete unicode sequence", d) : ba && u("Incomplete long unicode sequence", d), b = 1);
          } else {
            if (v) {
              if (I) {
                if (3 > N && 48 <= d && 57 >= d) {
                  D *= 8, D += d - 48, N++, 3 === N && (a.string += String.fromCodePoint(D), v = I = !1);
                } else {
                  if (255 < D) {
                    u("(escaped character, parsing octal escape val=%d) fault while parsing", d);
                    b = -1;
                    break;
                  }
                  a.string += String.fromCodePoint(D);
                  v = I = !1;
                }
              } else {
                if (ba) {
                  125 == d ? (a.string += String.fromCodePoint(D), v = T = ba = !1) : (D *= 16, 48 <= d && 57 >= d ? D += d - 48 : 65 <= d && 70 >= d ? D += d - 65 + 10 : 97 <= d && 102 >= d ? D += d - 97 + 10 : (u("(escaped character, parsing hex of \\u)", d), b = -1, v = ba = !1));
                } else {
                  if (ca || T) {
                    if (0 === N && 123 === d) {
                      ba = !0;
                      continue;
                    }
                    if (2 > N || T && 4 > N) {
                      D *= 16;
                      if (48 <= d && 57 >= d) {
                        D += d - 48;
                      } else {
                        if (65 <= d && 70 >= d) {
                          D += d - 65 + 10;
                        } else {
                          if (97 <= d && 102 >= d) {
                            D += d - 97 + 10;
                          } else {
                            u(T ? "(escaped character, parsing hex of \\u)" : "(escaped character, parsing hex of \\x)", d);
                            b = -1;
                            v = ca = !1;
                            continue;
                          }
                        }
                      }
                      N++;
                      T ? 4 == N && (a.string += String.fromCodePoint(D), v = T = !1) : 2 == N && (a.string += String.fromCodePoint(D), v = ca = !1);
                      continue;
                    }
                  }
                  switch(d) {
                    case 13:
                      ka = !0;
                      g = 1;
                      continue;
                    case 10:
                    case 2028:
                    case 2029:
                      q++;
                      break;
                    case 116:
                      a.string += "\t";
                      break;
                    case 98:
                      a.string += "\b";
                      break;
                    case 110:
                      a.string += "\n";
                      break;
                    case 114:
                      a.string += "\r";
                      break;
                    case 102:
                      a.string += "\f";
                      break;
                    case 48:
                    case 49:
                    case 50:
                    case 51:
                      I = !0;
                      D = d - 48;
                      N = 1;
                      continue;
                    case 120:
                      ca = !0;
                      D = N = 0;
                      continue;
                    case 117:
                      T = !0;
                      D = N = 0;
                      continue;
                    default:
                      a.string += h;
                  }
                  v = !1;
                }
              }
            } else {
              92 === d ? v ? (a.string += "\\", v = !1) : v = !0 : ka ? (ka = !1, 10 == d ? (q++, g = 1, v = !1) : (q++, g = 1)) : a.string += h;
            }
          }
        }
        return b;
      }
      function W() {
        let c;
        for (; (c = l) < K.length;) {
          h = K.charAt(c);
          let b = K.codePointAt(l++);
          65536 <= b && (u("fault while parsing number;", b), h += K.charAt(l), l++);
          if (95 != b) {
            if (g++, 48 <= b && 57 >= b) {
              S && (k = !0), a.string += h;
            } else {
              if (45 == b || 43 == b) {
                0 == a.string.length || S && !ja && !k ? (a.string += h, ja = !0) : (a.string += h, O = !0);
              } else {
                if (58 == b && O) {
                  a.string += h, O = !0;
                } else {
                  if (84 == b && O) {
                    a.string += h, O = !0;
                  } else {
                    if (90 == b && O) {
                      a.string += h, O = !0;
                    } else {
                      if (46 == b) {
                        if (aa || w || S) {
                          p = !1;
                          u("fault while parsing number;", b);
                          break;
                        } else {
                          a.string += h, aa = !0;
                        }
                      } else {
                        if (110 == b) {
                          da = !0;
                          break;
                        } else {
                          if (120 == b || 98 == b || 111 == b || 88 == b || 66 == b || 79 == b) {
                            if (w || "0" != a.string) {
                              p = !1;
                              u("fault while parsing number;", b);
                              break;
                            } else {
                              w = !0, a.string += h;
                            }
                          } else {
                            if (101 == b || 69 == b) {
                              if (S) {
                                p = !1;
                                u("fault while parsing number;", b);
                                break;
                              } else {
                                a.string += h, S = !0;
                              }
                            } else {
                              32 == b || 13 == b || 10 == b || 9 == b || 65279 == b || 44 == b || 125 == b || 93 == b || 58 == b ? l = c : e && (p = !1, u("fault while parsing number;", b));
                              break;
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        e || l != K.length ? (y = !1, a.value_type = 5, 0 == d && (J = !0)) : y = !0;
      }
      function Z() {
        let b, n = null, e = {};
        0 < c && 29 > c && G();
        if (0 == d) {
          29 == c && a.string.length ? (r.get(a.string) ? a.className = a.string : Q.get(a.string) && (a.className = a.string), (n = ia.find(b => b.name === a.string)) ? (e = Object.assign(e, n.protoObject), Object.setPrototypeOf(e, Object.getPrototypeOf(n.protoObject)), b = 6) : (ia.push(n = {name:a.string, protoObject:x[a.string] || Object.create({}), fields:[]}), b = 5), c = 0) : (b = 3, c = 29);
        } else {
          if (29 == c || 1 === d || 4 === d) {
            0 != c ? (r.get(a.string) ? a.className = a.string : Q.get(a.string) && (a.className = a.string), (n = ia.find(b => b.name === a.string)) || u("Referenced class " + a.string + " has not been defined", f), e = Object.assign(e, n.protoObject), Object.setPrototypeOf(e, Object.getPrototypeOf(n.protoObject)), b = 6) : b = 3, c = 0;
          } else {
            if (3 == d && 0 == c) {
              return u("fault while parsing; getting field name unexpected ", f), p = !1;
            }
            b = 3;
          }
        }
        {
          let c = ma();
          a.value_type = 6;
          0 == d ? C = B = e : 4 == d && (B[a.name] = e);
          c.context = d;
          c.elements = B;
          c.element_array = E;
          c.name = a.name;
          c.current_class = m;
          c.current_class_field = H;
          c.arrayType = M;
          c.className = a.className;
          a.className = null;
          m = n;
          H = 0;
          B = e;
          V || (V = B);
          t.push(c);
          R();
          d = b;
        }
        return !0;
      }
      function ha() {
        0 < c && 29 > c && G();
        if (29 == c && a.string.length) {
          var b = ta.findIndex(b => b === a.string);
          0 <= b ? (c = 0, M = b) : "ref" === a.string ? M = -2 : r.get(a.string) ? a.className = a.string : Q.get(a.string) ? a.className = a.string : u("Unknown type specified for array:" + a.string, f);
        } else {
          if (3 == d || 29 == c || 30 == c) {
            return u("Fault while parsing; while getting field name unexpected", f), p = !1;
          }
        }
        {
          b = ma();
          a.value_type = 13;
          let c = [];
          0 == d ? C = E = c : 4 == d && (B[a.name] = c);
          b.context = d;
          b.elements = B;
          b.element_array = E;
          b.name = a.name;
          b.current_class = m;
          b.current_class_field = H;
          b.arrayType = M;
          b.className = a.className;
          m = a.className = null;
          H = 0;
          E = c;
          V || (V = E);
          t.push(b);
          R();
          d = 1;
        }
        return !0;
      }
      var fa = 0;
      if (!p) {
        return -1;
      }
      if (b && b.length) {
        var P = qa();
        P.buf = b;
        z.push(P);
      } else {
        y && (y = !1, a.value_type = 5, 0 == d && (J = !0), fa = 1);
      }
      for (; p && (P = z.shift());) {
        l = P.n;
        var K = P.buf;
        A && (b = U(F), 0 > b ? p = !1 : 0 < b && (A = !1, p && (a.value_type = 4)));
        for (y && W(); !J && p && l < K.length;) {
          h = K.charAt(l);
          var f = K.codePointAt(l++);
          65536 <= f && (h += K.charAt(l), l++);
          g++;
          if (L) {
            if (1 == L) {
              if (42 == f) {
                L = 3;
                continue;
              }
              47 != f ? (u("fault while parsing;", f), p = !1) : L = 2;
              continue;
            }
            if (2 == L) {
              10 == f && (L = 0);
              continue;
            }
            if (3 == L) {
              42 == f && (L = 4);
              continue;
            }
            if (4 == L) {
              47 == f ? L = 0 : 42 != f && (L = 3);
              continue;
            }
          }
          switch(f) {
            case 47:
              L || (L = 1);
              break;
            case 123:
              Z();
              break;
            case 91:
              ha();
              break;
            case 58:
              3 == d || 5 == d ? 0 != c && 29 != c && 30 != c ? (p = FALSE, thorwError(`fault while parsing; unquoted keyword used as object field name (state:${c})`, f)) : (c = 0, a.name = a.string, a.string = "", d = 4, a.value_type = 0) : (1 == d ? u("(in array, got colon out of string):parsing fault;", f) : u("(outside any object, got colon out of string):parsing fault;", f), p = !1);
              break;
            case 125:
              c = 0;
              5 == d ? m ? (a.string && (m.protoObject[a.string] = void 0, m.fields.push(a.string)), R(), b = t.pop(), c = d = 0, a.name = b.name, B = b.elements, E = b.element_array, m = b.current_class, H = b.current_class_field, M = b.arrayType, a.className = b.className, V = null, Y.push(b)) : u("State error; gathering class fields, and lost the class", f) : 3 == d || 6 == d ? (0 != a.value_type && (m && (a.name = m.fields[H++]), ea()), a.value_type = 6, a.contains = B, a.string = "", b = t.pop(), 
              d = b.context, a.name = b.name, B = b.elements, E = b.element_array, m = b.current_class, H = b.current_class_field, M = b.arrayType, a.className = b.className, Y.push(b), 0 == d && (J = !0)) : 4 == d ? (0 != a.value_type && ea(), a.value_type = 6, a.contains = B, b = t.pop(), a.name = b.name, d = b.context, a.name = b.name, B = b.elements, m = b.current_class, H = b.current_class_field, M = b.arrayType, a.className = b.className, E = b.element_array, Y.push(b), 0 == d && (J = !0)) : 
              (u("Fault while parsing; unexpected", f), p = !1);
              n = !1;
              break;
            case 93:
              31 == c && (c = 0);
              1 == d ? (0 != a.value_type && X(), a.contains = E, b = t.pop(), a.name = b.name, d = b.context, B = b.elements, m = b.current_class, H = b.current_class_field, M = b.arrayType, a.className = b.className, E = b.element_array, Y.push(b), a.value_type = 13, 0 == d && (J = !0)) : (u(`bad context ${d}; fault while parsing`, f), p = !1);
              n = !1;
              break;
            case 44:
              if (31 == c || 29 == c) {
                c = 0;
              }
              5 == d ? m ? (m.protoObject[a.string] = void 0, m.fields.push(a.string), a.string = "", c = 29) : u("State error; gathering class fields, and lost the class", f) : 3 == d ? m ? (a.name = m.fields[H++], 0 != a.value_type && (ea(), R())) : u("State error; gathering class values, and lost the class", f) : 6 == d ? m ? (a.name = m.fields[H++], 0 != a.value_type && (ea(), R())) : u("State error; gathering class values, and lost the class", f) : 1 == d ? (0 == a.value_type && (a.value_type = 
              12), 0 != a.value_type && (X(), R())) : 4 == d ? (d = 3, 0 != a.value_type && (ea(), R())) : (p = !1, u("bad context; excessive commas while parsing;", f));
              n = !1;
              break;
            default:
              if (0 == d || 4 == d && 29 == c || 3 == d || 5 == d) {
                switch(f) {
                  case 96:
                  case 34:
                  case 39:
                    0 == c || 29 == c ? (a.string.length && (a.className = a.string, a.string = ""), U(f) ? a.value_type = 4 : (F = f, A = !0)) : u("fault while parsing; quote not at start of field name", f);
                    break;
                  case 10:
                    q++, g = 1;
                  case 13:
                  case 32:
                  case 9:
                  case 65279:
                    if (31 === c) {
                      c = 0;
                      0 === d && (J = !0);
                      break;
                    }
                    0 === c || 30 === c ? 0 == d && a.value_type && (J = !0) : 29 === c ? 0 === d ? (c = 0, J = !0) : a.string.length && (c = 30) : (p = !1, u("fault while parsing; whitepsace unexpected", f));
                    break;
                  default:
                    0 == c && (48 <= f && 57 >= f || 43 == f || 46 == f || 45 == f) ? (aa = k = ja = da = O = S = w = !1, a.string = h, P.n = l, W()) : (30 === c && (p = !1, u("fault while parsing; character unexpected", f)), 0 === c && (c = 29, a.value_type = 4), a.string += h);
                }
              } else {
                switch(f) {
                  case 96:
                  case 34:
                  case 39:
                    U(f) ? (a.value_type = 4, c = 31) : (F = f, A = !0);
                    break;
                  case 10:
                    q++, g = 1;
                  case 32:
                  case 9:
                  case 13:
                  case 2028:
                  case 2029:
                  case 65279:
                    if (31 == c) {
                      c = 0;
                      0 == d && (J = !0);
                      break;
                    }
                    0 != c && 30 != c && (29 == c ? a.string.length && (c = 30) : (p = !1, u("fault parsing whitespace", f)));
                    break;
                  case 116:
                    0 == c ? c = 1 : 27 == c ? c = 28 : G(f);
                    break;
                  case 114:
                    1 == c ? c = 2 : G(f);
                    break;
                  case 117:
                    2 == c ? c = 3 : 9 == c ? c = 10 : 0 == c ? c = 12 : G(f);
                    break;
                  case 101:
                    3 == c ? (a.value_type = 2, c = 31) : 8 == c ? (a.value_type = 3, c = 31) : 14 == c ? c = 15 : 18 == c ? c = 19 : G(f);
                    break;
                  case 110:
                    0 == c ? c = 9 : 12 == c ? c = 13 : 17 == c ? c = 18 : 22 == c ? c = 23 : 25 == c ? c = 26 : G(f);
                    break;
                  case 100:
                    13 == c ? c = 14 : 19 == c ? (a.value_type = -1, c = 31) : G(f);
                    break;
                  case 105:
                    16 == c ? c = 17 : 24 == c ? c = 25 : 26 == c ? c = 27 : G(f);
                    break;
                  case 108:
                    10 == c ? c = 11 : 11 == c ? (a.value_type = 1, c = 31) : 6 == c ? c = 7 : G(f);
                    break;
                  case 102:
                    0 == c ? c = 5 : 15 == c ? c = 16 : 23 == c ? c = 24 : G(f);
                    break;
                  case 97:
                    5 == c ? c = 6 : 20 == c ? c = 21 : G(f);
                    break;
                  case 115:
                    7 == c ? c = 8 : G(f);
                    break;
                  case 73:
                    0 == c ? c = 22 : G(f);
                    break;
                  case 78:
                    0 == c ? c = 20 : 21 == c ? (a.value_type = n ? 7 : 8, n = !1, c = 31) : G(f);
                    break;
                  case 121:
                    28 == c ? (a.value_type = n ? 9 : 10, n = !1, c = 31) : G(f);
                    break;
                  case 45:
                    0 == c ? n = !n : G(f);
                    break;
                  default:
                    0 == c && (48 <= f && 57 >= f || 43 == f || 46 == f || 45 == f) ? (aa = k = ja = da = O = S = w = !1, a.string = h, P.n = l, W()) : G(f);
                }
              }
          }
          if (J) {
            31 == c && (c = 0);
            break;
          }
        }
        l == K.length ? (na.push(P), A || y || 3 == d ? fa = 0 : 0 != d || 0 == a.value_type && !C || (J = !0, fa = 1)) : (P.n = l, z.unshift(P), fa = 2);
        if (J) {
          V = null;
          break;
        }
      }
      if (!p) {
        return -1;
      }
      J && 0 != a.value_type && (C = la(), n = !1, a.string = "", a.value_type = 0);
      J = !1;
      return fa;
    }};
  };
  const W = [Object.freeze(JSOX.begin())];
  var ha = 0;
  JSOX.parse = function(b, e) {
    var a = ha++;
    W.length <= a && W.push(Object.freeze(JSOX.begin()));
    a = W[a];
    "string" !== typeof b && (b = String(b));
    a.reset();
    if (0 < a._write(b, !0)) {
      return b = a.value(), "function" === typeof e && function h(a, b) {
        var g, c = a[b];
        if (c && "object" === typeof c) {
          for (g in c) {
            if (Object.prototype.hasOwnProperty.call(c, g)) {
              var p = h(c, g);
              void 0 !== p ? c[g] = p : delete c[g];
            }
          }
        }
        return e.call(a, b, c);
      }({"":b}, ""), ha--, b;
    }
  };
  var pa = function() {
    return this && this.valueOf();
  };
  g.set(Object.prototype, {external:!1, name:Object.prototype.constructor.name, cb:null});
  g.set(Date.prototype, {external:!1, name:"Date", cb:function() {
    var b = -this.getTimezoneOffset(), e = 0 <= b ? "+" : "-", a = function(a) {
      a = Math.floor(Math.abs(a));
      return (10 > a ? "0" : "") + a;
    };
    return [this.getFullYear(), "-", a(this.getMonth() + 1), "-", a(this.getDate()), "T", a(this.getHours()), ":", a(this.getMinutes()), ":", a(this.getSeconds()), e, a(b / 60), ":", a(b % 60)].join("");
  }});
  g.set(Boolean.prototype, {external:!1, name:"Boolean", cb:pa});
  g.set(Number.prototype, {external:!1, name:"Number", cb:function() {
    return isNaN(this) ? "NaN" : isFinite(this) ? String(this) : 0 > this ? "-Infinity" : "Infinity";
  }});
  g.set(String.prototype, {external:!1, name:"String", cb:function() {
    return '"' + JSOX.escape(pa.apply(this)) + '"';
  }});
  "function" === typeof BigInt && g.set(BigInt.prototype, {external:!1, name:"BigInt", cb:function() {
    return this + "n";
  }});
  g.set(ArrayBuffer.prototype, {external:!0, name:"ab", cb:function() {
    return "[" + x(this) + "]";
  }});
  g.set(Uint8Array.prototype, {external:!0, name:"u8", cb:function() {
    return "[" + x(this.buffer) + "]";
  }});
  g.set(Uint8ClampedArray.prototype, {external:!0, name:"uc8", cb:function() {
    return "[" + x(this.buffer) + "]";
  }});
  g.set(Int8Array.prototype, {external:!0, name:"s8", cb:function() {
    return "[" + x(this.buffer) + "]";
  }});
  g.set(Uint16Array.prototype, {external:!0, name:"u16", cb:function() {
    return "[" + x(this.buffer) + "]";
  }});
  g.set(Int16Array.prototype, {external:!0, name:"s16", cb:function() {
    return "[" + x(this.buffer) + "]";
  }});
  g.set(Uint32Array.prototype, {external:!0, name:"u32", cb:function() {
    return "[" + x(this.buffer) + "]";
  }});
  g.set(Int32Array.prototype, {external:!0, name:"s32", cb:function() {
    return "[" + x(this.buffer) + "]";
  }});
  "undefined" != typeof Uint64Array && g.set(Uint64Array.prototype, {external:!0, name:"u64", cb:function() {
    return "[" + x(this.buffer) + "]";
  }});
  "undefined" != typeof Int64Array && g.set(Int64Array.prototype, {external:!0, name:"s64", cb:function() {
    return "[" + x(this.buffer) + "]";
  }});
  g.set(Float32Array.prototype, {external:!0, name:"f32", cb:function() {
    return "[" + x(this.buffer) + "]";
  }});
  g.set(Float64Array.prototype, {external:!0, name:"f64", cb:function() {
    return "[" + x(this.buffer) + "]";
  }});
  g.set(Float64Array.prototype, {external:!0, name:"f64", cb:function() {
    return "[" + x(this.buffer) + "]";
  }});
  g.set(Map.prototype, Z = {external:!0, name:"map", cb:null});
  Q.set("map", function() {
    var b = new Map;
    for (key in this) {
      b.set(key, this[key]);
    }
    return b;
  });
  g.set(Array.prototype, X = {external:!1, name:Array.prototype.constructor.name, cb:null});
  JSOX.registerToJSOX = function(b, e, a) {
    if (e.prototype && e.prototype === Object.prototype) {
      e = Object.keys(e).toString();
      if (U.get(e)) {
        throw Error("Existing toJSOX has been registered for object type");
      }
      U.set(e, {external:!0, name:b, cb:a});
    } else {
      if (g.get(e)) {
        throw Error("Existing toJSOX has been registered for prototype");
      }
      console.log("PUSH PROTOTYPE");
      g.set(e, {external:!0, name:b || a.constructor.name, cb:a});
    }
  };
  JSOX.registerFromJSOX = function(b, e) {
    if (Q.get(b)) {
      throw Error("Existing fromJSOX has been registered for prototype");
    }
    Q.set(b, e);
  };
  JSOX.registerToFrom = function(b, e, a, g) {
    JSOX.registerToJSOX(b, e, a);
    JSOX.registerFromJSOX(b, g);
  };
  JSOX.stringifier = function() {
    function b(a) {
      if (null !== a) {
        var b = l.get(a);
        if (b) {
          return b;
        }
        if (!h.length) {
          return "";
        }
        l.set(a, JSON.stringify(h));
      }
    }
    function e(a, b) {
      var c, e = Object.getPrototypeOf(a);
      if (c = q.find(a => {
        if (a.proto && a.proto === e) {
          return !0;
        }
      })) {
        return c;
      }
      if (b) {
        b = b.map(a => {
          if ("string" === typeof a) {
            return a;
          }
        });
        var n = b.toString();
      } else {
        n = Object.keys(a).toString();
      }
      return c = q.find(a => {
        if (a.tag === n) {
          return !0;
        }
      });
    }
    function a(a, n, C) {
      function p(a) {
        return isNaN(a) ? a in va || /((\n|\r|\t)|[ \{\}\(\)<>!\+\-\*\/\.:, ])/.test(a) ? x + JSOX.escape(a) + x : a : ["'", a.toString(), "'"].join("");
      }
      function B(a, d) {
        function n() {
          var a = [];
          let b = h.length;
          for (let c = 0; c < this.length; c += 1) {
            h[b] = c, a[c] = B(c, this) || "null";
          }
          h.splice(b, 1);
          return 0 === a.length ? "[]" : t ? ["[\n", t, a.join(",\n" + t), "\n", C, "]"].join("") : "[" + a.join(",") + "]";
        }
        function l() {
          var a = {tmp:null}, b = "{", c = !0, d, n;
          for ([d, n] of this) {
            a.tmp = n, b += (c ? "" : ",") + p(d) + ":" + B("tmp", a), c = !1;
          }
          return b + "}";
        }
        E && (X.cb = n, Z.cb = l, E = !1);
        X.cb = n;
        var m, C = t;
        let x = h.length;
        var k = d[a], z = void 0 !== k && null !== k && (r.get(Object.getPrototypeOf(k)) || g.get(Object.getPrototypeOf(k)) || null);
        var F = !z && void 0 !== k && null !== k && (c.get(Object.keys(k).toString()) || U.get(Object.keys(k).toString()) || null);
        var A = z && z.cb || F && F.cb;
        if (void 0 !== k && null !== k && "function" === typeof A) {
          t += H;
          if ("object" === typeof k && (m = b(k))) {
            return "ref" + m;
          }
          k = A.apply(k);
          t = C;
        } else {
          "object" === typeof k && (m = b(k));
        }
        "function" === typeof w && (k = w.call(d, a, k));
        switch(typeof k) {
          case "string":
          case "number":
            var y = "";
            "" === a && (y = q.map(a => a.name + "{" + a.fields.join(",") + "}").join(t ? "\n" : "") + (t ? "\n" : ""));
            return z && z.external ? y + z.name + k : F && F.external ? y + F.name + k : y + k;
          case "boolean":
          case "null":
            return String(k);
          case "object":
            if (m) {
              return "ref" + m;
            }
            if (!k) {
              return "null";
            }
            t += H;
            F = null;
            d = [];
            if (w && "object" === typeof w) {
              var v = w.length;
              F = e(k, w);
              for (A = 0; A < v; A += 1) {
                "string" === typeof w[A] && (y = w[A], h[x] = y, (m = B(y, k)) && (F ? d.push(m) : d.push(p(y) + (t ? ": " : ":") + m)));
              }
            } else {
              F = e(k);
              A = [];
              for (y in k) {
                if (Object.prototype.hasOwnProperty.call(k, y)) {
                  for (v = 0; v < A.length; v++) {
                    if (A[v] > y) {
                      A.splice(v, 0, y);
                      break;
                    }
                  }
                  v == A.length && A.push(y);
                }
              }
              for (v = 0; v < A.length; v++) {
                y = A[v], Object.prototype.hasOwnProperty.call(k, y) && (h[x] = y, (m = B(y, k)) && (F ? d.push(m) : d.push(p(y) + (t ? ": " : ":") + m)));
              }
            }
            h.splice(x, 1);
            k = "" === a ? q.map(a => a.name + "{" + a.fields.join(",") + "}").join(t ? "\n" : "") + (t ? "\n" : "") : "";
            z && z.external && (k = "" === a ? k + z.name : k + '"' + z.name + '"');
            a = null;
            F && (a = p(F.name));
            m = k + (0 === d.length ? "{}" : t ? (F ? a : "") + "{\n" + t + d.join(",\n" + t) + "\n" + C + "}" : (F ? a : "") + "{" + d.join(",") + "}");
            t = C;
            return m;
        }
      }
      if (void 0 === a) {
        return "undefined";
      }
      if (null !== a) {
        var E = !0, t, w;
        var I = typeof C;
        var m = typeof n;
        var H = t = "";
        if ("number" === I) {
          for (I = 0; I < C; I += 1) {
            H += " ";
          }
        } else {
          "string" === I && (H = C);
        }
        if ((w = n) && "function" !== m && ("object" !== m || "number" !== typeof n.length)) {
          throw Error("JSOX.stringify");
        }
        h = [];
        l = new WeakMap;
        return B("", {"":a});
      }
    }
    var q = [], x = '"', l = new WeakMap, h = [], r = new WeakMap, c = new Map;
    return {defineClass(a, b) {
      q.push(a = {name:a, tag:Object.keys(b).toString(), proto:Object.getPrototypeOf(b), fields:Object.keys(b)});
      for (b = 1; b < a.fields.length; b++) {
        if (a.fields[b] < a.fields[b - 1]) {
          let c = a.fields[b - 1];
          a.fields[b - 1] = a.fields[b];
          a.fields[b] = c;
          1 < b && (b -= 2);
        }
      }
      a.proto === Object.getPrototypeOf({}) && (a.proto = null);
    }, stringify(b, c, e) {
      return a(b, c, e);
    }, setQuote(a) {
      x = a;
    }, registerToJSOX(a, b, e) {
      if (b.prototype && b.prototype !== Object.prototype) {
        if (r.get(b)) {
          throw Error("Existing toJSOX has been registered for prototype");
        }
        r.set(b, {external:!0, name:a || e.constructor.name, cb:e});
      } else {
        b = Object.keys(b).toString();
        if (c.get(b)) {
          throw Error("Existing toJSOX has been registered for object type");
        }
        c.set(b, {external:!0, name:a, cb:e});
      }
    }};
  };
  const w = {"~":-1, "=":-1, $:62, _:63, "+":62, "-":62, ".":62, "/":63, ",":63};
  for (var I = 0; 256 > I; I++) {
    64 > I && (w["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[I]] = I);
  }
  Object.freeze(w);
  JSOX.stringify = function(b, e, a) {
    return JSOX.stringifier().stringify(b, e, a);
  };
  [[0, 384, [16767487, 16739071, 130048, 3670016, 0, 16777208, 16777215, 8388607, 8388608, 0, 128, 0, 0, 0, 0, 0]]].map(b => ({firstChar:b[0], lastChar:b[1], bits:b[2]}));
}
privateizeEverything();


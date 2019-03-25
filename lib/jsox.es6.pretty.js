'use strict';
var exports = exports || {};
"use strict";
const _JSON = JSON;
var JSOX = exports;
function privateizeEverything() {
  function la() {
    var c = Y.pop();
    c || (c = {context:0, current_class:null, current_class_field:0, arrayType:-1, elements:null, element_array:null});
    return c;
  }
  function pa() {
    var c = ma.pop();
    c ? c.n = 0 : c = {buf:null, n:0};
    return c;
  }
  function B(c) {
    var k = "";
    c = new Uint8Array(c);
    var a = c.byteLength, m = a % 3;
    a -= m;
    for (var g, h, u, b, l = 0; l < a; l += 3) {
      b = c[l] << 16 | c[l + 1] << 8 | c[l + 2], g = (b & 16515072) >> 18, h = (b & 258048) >> 12, u = (b & 4032) >> 6, b &= 63, k += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[g] + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[h] + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[u] + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[b];
    }
    1 == m ? (b = c[a], g = (b & 252) >> 2, h = (b & 3) << 4, k += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[g] + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[h] + "==") : 2 == m && (b = c[a] << 8 | c[a + 1], g = (b & 64512) >> 10, h = (b & 1008) >> 4, u = (b & 15) << 2, k += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[g] + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[h] + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[u] + 
    "=");
    return k;
  }
  function qa(c) {
    var k = new ArrayBuffer(3 * (c.length + 3 >> 2 | 0) - (("=" === c[c.length - 1] ? 1 : 0) + ("=" === c[c.length - 2] ? 1 : 0))), a = new Uint8Array(k), m, g = c.length + 3 >> 2;
    for (m = 0; m < g; m++) {
      var h = y[c[4 * m + 1]], u = y[c[4 * m + 2]], b = y[c[4 * m + 3]];
      a[3 * m] = y[c[4 * m]] << 2 | h >> 4;
      0 <= u && (a[3 * m + 1] = h << 4 | u >> 2 & 15);
      0 <= b && (a[3 * m + 2] = u << 6 | b & 63);
    }
    return k;
  }
  const na = "function" === typeof BigInt, ra = "ab u8 cu8 s8 u16 s16 u32 s32 u64 s64 f32 f64".split(" ");
  var U = null, Z = null;
  const sa = [ArrayBuffer, Uint8Array, Uint8ClampedArray, Int8Array, Uint16Array, Int16Array, Uint32Array, Int32Array, null, null, Float32Array, Float64Array], ta = {["true"]:!0, ["false"]:!1, ["null"]:null, ["NaN"]:NaN, ["Infinity"]:Infinity, ["undefined"]:void 0}, Y = [], ma = [];
  JSOX.escape = function(c) {
    var k, a = "";
    if (!c) {
      return c;
    }
    for (k = 0; k < c.length; k++) {
      if ('"' == c[k] || "\\" == c[k] || "`" == c[k] || "'" == c[k]) {
        a += "\\";
      }
      a += c[k];
    }
    return a;
  };
  var q = new WeakMap, W = new Map, R = new Map;
  JSOX.begin = function(c, k) {
    const a = {name:null, value_type:0, string:"", contains:null, className:null}, m = {line:1, col:1};
    let g = 0, h;
    var u = new Map, b = 0, l = !0, n = !1, G = null, q = null, v = void 0, z = [], M = {first:null, last:null, saved:null, push(a) {
      var b = this.saved;
      b ? (this.saved = b.next, b.node = a, b.next = null, b.prior = this.last) : b = {node:a, next:null, prior:this.last};
      this.last || (this.first = b);
      this.last = b;
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
    }, length:0}, w = [], B = {}, r = null, K = 0, F = -1, d = 0, L = 0, X = !1, aa = !1, S = !1, ha = !1, ia = !1, e = {first:null, last:null, saved:null, push(a) {
      var b = this.saved;
      b ? (this.saved = b.next, b.node = a, b.next = null, b.prior = this.last) : b = {node:a, next:null, prior:this.last};
      this.last || (this.first = b);
      this.last = b;
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
      var b = this.saved;
      b ? (this.saved = b.next, b.node = a, b.next = this.first, b.prior = null) : b = {node:a, next:this.first, prior:null};
      this.first || (this.last = b);
      this.first = b;
    }}, ja = null, A = !1, x = !1, p = !1, H = !1, ba = !1, T = !1, ca = !1, C = 0, N = 0, y = !1, I = !1, O = !1, P = !1;
    return {registerFromJSOX(a, b) {
      if (u.get(a)) {
        throw Error("Existing fromJSOX has been registered for prototype");
      }
      u.set(a, b);
    }, value() {
      var a = G;
      G = void 0;
      return a;
    }, reset() {
      b = 0;
      l = !0;
      e.last && (e.last.next = e.save);
      e.save = e.first;
      e.first = e.last = null;
      M.last && (M.last.next = M.save);
      M.save = e.first;
      z = M.first = M.last = null;
      v = void 0;
      d = 0;
      w = [];
      B = {};
      r = null;
      K = 0;
      a.value_type = 0;
      a.name = null;
      a.string = "";
      a.className = null;
      m.line = 1;
      m.col = 1;
      n = !1;
      L = 0;
      H = p = A = I = !1;
    }, usePrototype(a, b) {
      B[a] = b;
    }, write(a) {
      "string" !== typeof a && (a = String(a));
      for (a = this._write(a, !1); 0 < a && !(G && ("function" === typeof k && function va(a, b) {
        var c, d = a[b];
        if (d && "object" === typeof d) {
          for (c in d) {
            if (Object.prototype.hasOwnProperty.call(d, c)) {
              var n = va(d, c);
              void 0 !== n ? d[c] = n : delete d[c];
            }
          }
        }
        return k.call(a, b, d);
      }({"":G}, ""), c(G), G = void 0), 2 > a); a = this._write()) {
      }
    }, _write(c, k) {
      function t(a, b) {
        throw Error(`${a} '${String.fromCodePoint(b)}' unexpected at ${g} (near '${J.substr(4 < g ? g - 4 : 0, 4 < g ? 3 : g - 1)}[${String.fromCodePoint(b)}]${J.substr(g, 10)}') [${m.line}:${m.col}]`);
      }
      function E() {
        a.value_type = 0;
        a.string = "";
      }
      function ua(a) {
        if (P) {
          if (na) {
            return BigInt(a);
          }
          throw Error("no builtin BigInt()", 0);
        }
        return O ? new Date(a) : 1 < a.length && !X && !aa && !S && 48 === a.charCodeAt(0) ? (n ? -1 : 1) * Number("0o" + a) : (n ? -1 : 1) * Number(a);
      }
      function U() {
        var b = null;
        switch(a.value_type) {
          case 5:
            if (P) {
              if (na) {
                return BigInt(a.string);
              }
              throw Error("no builtin BigInt()", 0);
            }
            return O ? new Date(a.string) : ua(a.string);
          case 4:
            return a.className && ((b = u.get(a.className)) || (b = R.get(a.className)), a.className = null, b) ? b.call(a.string) : a.string;
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
            return a.className && ((b = u.get(a.className)) || (b = R.get(a.className)), a.className = null, b) ? b.call(a.contains) : a.contains;
          case 13:
            if (0 <= F) {
              return b = qa(a.contains[0]), 0 === F ? b : new sa[F](b);
            }
            if (-2 === F) {
              var c = q;
              a.contains.forEach((a) => c = c[a]);
              return c;
            }
            return a.className && ((b = u.get(a.className)) || (b = R.get(a.className)), a.className = null, b) ? b.call(a.contains) : a.contains;
          default:
            console.log("Unhandled value conversion.", a);
        }
      }
      function W() {
        switch(a.value_type) {
          case 12:
            z.push(void 0);
            delete z[z.length - 1];
            break;
          default:
            z.push(U());
        }
        E();
      }
      function da() {
        12 !== a.value_type && (v[a.name] = U(), E());
      }
      function D(c) {
        if (0 !== b) {
          switch(n && (valstring += "-", n = !1), b) {
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
        b = 29;
        123 == c ? Z() : 91 == c ? fa() : 32 != c && 13 != c && 10 != c && 9 != c && 65279 != c && 2028 != c && 2029 != c && (44 == c || 125 == c || 93 == c || 58 == c ? t("Invalid character near identifier", c) : a.string += h);
      }
      function V(b) {
        let c = 0;
        for (; 0 == c && g < J.length;) {
          h = J.charAt(g);
          let d = J.codePointAt(g++);
          65536 <= d && (h += J.charAt(g), g++);
          m.col++;
          if (d == b) {
            p ? (a.string += h, p = !1) : (y ? t("Incomplete Octal sequence", d) : ca ? t("Incomplete hexidecimal sequence", d) : T ? t("Incomplete unicode sequence", d) : ba && t("Incomplete long unicode sequence", d), c = 1);
          } else {
            if (p) {
              if (y) {
                if (3 > N && 48 <= d && 57 >= d) {
                  C *= 8, C += d - 48, N++, 3 === N && (a.string += String.fromCodePoint(C), p = y = !1);
                } else {
                  if (255 < C) {
                    t("(escaped character, parsing octal escape val=%d) fault while parsing", d);
                    c = -1;
                    break;
                  }
                  a.string += String.fromCodePoint(C);
                  p = y = !1;
                }
              } else {
                if (ba) {
                  125 == d ? (a.string += String.fromCodePoint(C), p = T = ba = !1) : (C *= 16, 48 <= d && 57 >= d ? C += d - 48 : 65 <= d && 70 >= d ? C += d - 65 + 10 : 97 <= d && 102 >= d ? C += d - 97 + 10 : (t("(escaped character, parsing hex of \\u)", d), c = -1, p = ba = !1));
                } else {
                  if (ca || T) {
                    if (0 === N && 123 === d) {
                      ba = !0;
                      continue;
                    }
                    if (2 > N || T && 4 > N) {
                      C *= 16;
                      if (48 <= d && 57 >= d) {
                        C += d - 48;
                      } else {
                        if (65 <= d && 70 >= d) {
                          C += d - 65 + 10;
                        } else {
                          if (97 <= d && 102 >= d) {
                            C += d - 97 + 10;
                          } else {
                            t(T ? "(escaped character, parsing hex of \\u)" : "(escaped character, parsing hex of \\x)", d);
                            c = -1;
                            p = ca = !1;
                            continue;
                          }
                        }
                      }
                      N++;
                      T ? 4 == N && (a.string += String.fromCodePoint(C), p = T = !1) : 2 == N && (a.string += String.fromCodePoint(C), p = ca = !1);
                      continue;
                    }
                  }
                  switch(d) {
                    case 13:
                      H = !0;
                      m.col = 1;
                      continue;
                    case 10:
                    case 2028:
                    case 2029:
                      m.line++;
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
                      y = !0;
                      C = d - 48;
                      N = 1;
                      continue;
                    case 120:
                      ca = !0;
                      C = N = 0;
                      continue;
                    case 117:
                      T = !0;
                      C = N = 0;
                      continue;
                    default:
                      a.string += h;
                  }
                  p = !1;
                }
              }
            } else {
              92 === d ? p ? (a.string += "\\", p = !1) : p = !0 : H ? (H = !1, 10 == d ? (m.line++, m.col = 1, p = !1) : (m.line++, m.col = 1)) : a.string += h;
            }
          }
        }
        return c;
      }
      function ka() {
        let b;
        for (; (b = g) < J.length;) {
          h = J.charAt(b);
          let c = J.codePointAt(g++);
          65536 <= c && (t("fault while parsing number;", c), h += J.charAt(g), g++);
          if (95 != c) {
            if (m.col++, 48 <= c && 57 >= c) {
              S && (ia = !0), a.string += h;
            } else {
              if (45 == c || 43 == c) {
                0 == a.string.length || S && !ha && !ia ? (a.string += h, ha = !0) : (a.string += h, O = !0);
              } else {
                if (58 == c && O) {
                  a.string += h, O = !0;
                } else {
                  if (84 == c && O) {
                    a.string += h, O = !0;
                  } else {
                    if (90 == c && O) {
                      a.string += h, O = !0;
                    } else {
                      if (46 == c) {
                        if (aa || X || S) {
                          l = !1;
                          t("fault while parsing number;", c);
                          break;
                        } else {
                          a.string += h, aa = !0;
                        }
                      } else {
                        if (110 == c) {
                          P = !0;
                          break;
                        } else {
                          if (120 == c || 98 == c || 111 == c || 88 == c || 66 == c || 79 == c) {
                            if (X || "0" != a.string) {
                              l = !1;
                              t("fault while parsing number;", c);
                              break;
                            } else {
                              X = !0, a.string += h;
                            }
                          } else {
                            if (101 == c || 69 == c) {
                              if (S) {
                                l = !1;
                                t("fault while parsing number;", c);
                                break;
                              } else {
                                a.string += h, S = !0;
                              }
                            } else {
                              32 == c || 13 == c || 10 == c || 9 == c || 65279 == c || 44 == c || 125 == c || 93 == c || 58 == c ? g = b : k && (l = !1, t("fault while parsing number;", c));
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
        k || g != J.length ? (x = !1, a.value_type = 5, 0 == d && (I = !0)) : x = !0;
      }
      function Z() {
        let c, n = null, e = {};
        0 < b && 29 > b && D();
        if (0 == d) {
          29 == b && a.string.length ? (u.get(a.string) ? a.className = a.string : R.get(a.string) && (a.className = a.string), (n = w.find((b) => b.name === a.string)) ? (e = Object.assign(e, n.protoObject), Object.setPrototypeOf(e, Object.getPrototypeOf(n.protoObject)), c = 6) : (w.push(n = {name:a.string, protoObject:B[a.string] || Object.create({}), fields:[]}), c = 5), b = 0) : (c = 3, b = 29);
        } else {
          if (29 == b || 1 === d || 4 === d) {
            0 != b ? (u.get(a.string) ? a.className = a.string : R.get(a.string) && (a.className = a.string), (n = w.find((b) => b.name === a.string)) || t("Referenced class " + a.string + " has not been defined", f), e = Object.assign(e, n.protoObject), Object.setPrototypeOf(e, Object.getPrototypeOf(n.protoObject)), c = 6) : c = 3, b = 0;
          } else {
            if (3 == d && 0 == b) {
              return t("fault while parsing; getting field name unexpected ", f), l = !1;
            }
            c = 3;
          }
        }
        {
          let b = la();
          a.value_type = 6;
          0 == d ? G = v = e : 4 == d && (v[a.name] = e);
          b.context = d;
          b.elements = v;
          b.element_array = z;
          b.name = a.name;
          b.current_class = r;
          b.current_class_field = K;
          b.arrayType = F;
          b.className = a.className;
          a.className = null;
          r = n;
          K = 0;
          v = e;
          q || (q = v);
          M.push(b);
          E();
          d = c;
        }
        return !0;
      }
      function fa() {
        0 < b && 29 > b && D();
        if (29 == b && a.string.length) {
          var c = ra.findIndex((b) => b === a.string);
          0 <= c ? (b = 0, F = c) : "ref" === a.string ? F = -2 : u.get(a.string) ? a.className = a.string : R.get(a.string) ? a.className = a.string : t("Unknown type specified for array:" + a.string, f);
        } else {
          if (3 == d || 29 == b || 30 == b) {
            return t("Fault while parsing; while getting field name unexpected", f), l = !1;
          }
        }
        {
          c = la();
          a.value_type = 13;
          let b = [];
          0 == d ? G = z = b : 4 == d && (v[a.name] = b);
          c.context = d;
          c.elements = v;
          c.element_array = z;
          c.name = a.name;
          c.current_class = r;
          c.current_class_field = K;
          c.arrayType = F;
          c.className = a.className;
          r = a.className = null;
          K = 0;
          z = b;
          q || (q = z);
          M.push(c);
          E();
          d = 1;
        }
        return !0;
      }
      var ea = 0;
      if (!l) {
        return -1;
      }
      if (c && c.length) {
        var Q = pa();
        Q.buf = c;
        e.push(Q);
      } else {
        x && (x = !1, a.value_type = 5, 0 == d && (I = !0), ea = 1);
      }
      for (; l && (Q = e.shift());) {
        g = Q.n;
        var J = Q.buf;
        A && (c = V(ja), 0 > c ? l = !1 : 0 < c && (A = !1, l && (a.value_type = 4)));
        for (x && ka(); !I && l && g < J.length;) {
          h = J.charAt(g);
          var f = J.codePointAt(g++);
          65536 <= f && (h += J.charAt(g), g++);
          m.col++;
          if (L) {
            if (1 == L) {
              if (42 == f) {
                L = 3;
                continue;
              }
              47 != f ? (t("fault while parsing;", f), l = !1) : L = 2;
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
              fa();
              break;
            case 58:
              3 == d || 5 == d ? 0 != b && 29 != b && 30 != b ? (l = FALSE, thorwError(`fault while parsing; unquoted keyword used as object field name (state:${b})`, f)) : (b = 0, a.name = a.string, a.string = "", d = 4, a.value_type = 0) : (1 == d ? t("(in array, got colon out of string):parsing fault;", f) : t("(outside any object, got colon out of string):parsing fault;", f), l = !1);
              break;
            case 125:
              b = 0;
              5 == d ? r ? (a.string && (r.protoObject[a.string] = void 0, r.fields.push(a.string)), E(), c = M.pop(), b = d = 0, a.name = c.name, v = c.elements, z = c.element_array, r = c.current_class, K = c.current_class_field, F = c.arrayType, a.className = c.className, q = null, Y.push(c)) : t("State error; gathering class fields, and lost the class", f) : 3 == d || 6 == d ? (0 != a.value_type && (r && (a.name = r.fields[K++]), da()), a.value_type = 6, a.contains = v, a.string = "", c = M.pop(), 
              d = c.context, a.name = c.name, v = c.elements, z = c.element_array, r = c.current_class, K = c.current_class_field, F = c.arrayType, a.className = c.className, Y.push(c), 0 == d && (I = !0)) : 4 == d ? (0 != a.value_type && da(), a.value_type = 6, a.contains = v, c = M.pop(), a.name = c.name, d = c.context, a.name = c.name, v = c.elements, r = c.current_class, K = c.current_class_field, F = c.arrayType, a.className = c.className, z = c.element_array, Y.push(c), 0 == d && (I = !0)) : 
              (t("Fault while parsing; unexpected", f), l = !1);
              n = !1;
              break;
            case 93:
              31 == b && (b = 0);
              1 == d ? (0 != a.value_type && W(), a.contains = z, c = M.pop(), a.name = c.name, d = c.context, v = c.elements, r = c.current_class, K = c.current_class_field, F = c.arrayType, a.className = c.className, z = c.element_array, Y.push(c), a.value_type = 13, 0 == d && (I = !0)) : (t(`bad context ${d}; fault while parsing`, f), l = !1);
              n = !1;
              break;
            case 44:
              if (31 == b || 29 == b) {
                b = 0;
              }
              5 == d ? r ? (r.protoObject[a.string] = void 0, r.fields.push(a.string), a.string = "", b = 29) : t("State error; gathering class fields, and lost the class", f) : 3 == d ? r ? (a.name = r.fields[K++], 0 != a.value_type && (da(), E())) : t("State error; gathering class values, and lost the class", f) : 6 == d ? r ? (a.name = r.fields[K++], 0 != a.value_type && (da(), E())) : t("State error; gathering class values, and lost the class", f) : 1 == d ? (0 == a.value_type && (a.value_type = 
              12), 0 != a.value_type && (W(), E())) : 4 == d ? (d = 3, 0 != a.value_type && (da(), E())) : (l = !1, t("bad context; excessive commas while parsing;", f));
              n = !1;
              break;
            default:
              if (0 == d || 4 == d && 29 == b || 3 == d || 5 == d) {
                switch(f) {
                  case 96:
                  case 34:
                  case 39:
                    0 == b || 29 == b ? (a.string.length && (a.className = a.string, a.string = ""), V(f) ? a.value_type = 4 : (ja = f, A = !0)) : t("fault while parsing; quote not at start of field name", f);
                    break;
                  case 10:
                    m.line++, m.col = 1;
                  case 13:
                  case 32:
                  case 9:
                  case 65279:
                    if (31 === b) {
                      b = 0;
                      0 === d && (I = !0);
                      break;
                    }
                    0 === b || 30 === b ? 0 == d && a.value_type && (I = !0) : 29 === b ? 0 === d ? (b = 0, I = !0) : a.string.length && (b = 30) : (l = !1, t("fault while parsing; whitepsace unexpected", f));
                    break;
                  default:
                    0 == b && (48 <= f && 57 >= f || 43 == f || 46 == f || 45 == f) ? (aa = ia = ha = P = O = S = X = !1, a.string = h, Q.n = g, ka()) : (30 === b && (l = !1, t("fault while parsing; character unexpected", f)), 0 === b && (b = 29, a.value_type = 4), a.string += h);
                }
              } else {
                switch(f) {
                  case 96:
                  case 34:
                  case 39:
                    V(f) ? (a.value_type = 4, b = 31) : (ja = f, A = !0);
                    break;
                  case 10:
                    m.line++, m.col = 1;
                  case 32:
                  case 9:
                  case 13:
                  case 2028:
                  case 2029:
                  case 65279:
                    if (31 == b) {
                      b = 0;
                      0 == d && (I = !0);
                      break;
                    }
                    0 != b && 30 != b && (29 == b ? a.string.length && (b = 30) : (l = !1, t("fault parsing whitespace", f)));
                    break;
                  case 116:
                    0 == b ? b = 1 : 27 == b ? b = 28 : D(f);
                    break;
                  case 114:
                    1 == b ? b = 2 : D(f);
                    break;
                  case 117:
                    2 == b ? b = 3 : 9 == b ? b = 10 : 0 == b ? b = 12 : D(f);
                    break;
                  case 101:
                    3 == b ? (a.value_type = 2, b = 31) : 8 == b ? (a.value_type = 3, b = 31) : 14 == b ? b = 15 : 18 == b ? b = 19 : D(f);
                    break;
                  case 110:
                    0 == b ? b = 9 : 12 == b ? b = 13 : 17 == b ? b = 18 : 22 == b ? b = 23 : 25 == b ? b = 26 : D(f);
                    break;
                  case 100:
                    13 == b ? b = 14 : 19 == b ? (a.value_type = -1, b = 31) : D(f);
                    break;
                  case 105:
                    16 == b ? b = 17 : 24 == b ? b = 25 : 26 == b ? b = 27 : D(f);
                    break;
                  case 108:
                    10 == b ? b = 11 : 11 == b ? (a.value_type = 1, b = 31) : 6 == b ? b = 7 : D(f);
                    break;
                  case 102:
                    0 == b ? b = 5 : 15 == b ? b = 16 : 23 == b ? b = 24 : D(f);
                    break;
                  case 97:
                    5 == b ? b = 6 : 20 == b ? b = 21 : D(f);
                    break;
                  case 115:
                    7 == b ? b = 8 : D(f);
                    break;
                  case 73:
                    0 == b ? b = 22 : D(f);
                    break;
                  case 78:
                    0 == b ? b = 20 : 21 == b ? (a.value_type = n ? 7 : 8, n = !1, b = 31) : D(f);
                    break;
                  case 121:
                    28 == b ? (a.value_type = n ? 9 : 10, n = !1, b = 31) : D(f);
                    break;
                  case 45:
                    0 == b ? n = !n : D(f);
                    break;
                  default:
                    0 == b && (48 <= f && 57 >= f || 43 == f || 46 == f || 45 == f) ? (aa = ia = ha = P = O = S = X = !1, a.string = h, Q.n = g, ka()) : D(f);
                }
              }
          }
          if (I) {
            31 == b && (b = 0);
            break;
          }
        }
        g == J.length ? (ma.push(Q), A || x || 3 == d ? ea = 0 : 0 != d || 0 == a.value_type && !G || (I = !0, ea = 1)) : (Q.n = g, e.unshift(Q), ea = 2);
        if (I) {
          q = null;
          break;
        }
      }
      if (!l) {
        return -1;
      }
      I && 0 != a.value_type && (G = U(), n = !1, a.string = "", a.value_type = 0);
      I = !1;
      return ea;
    }};
  };
  const V = [Object.freeze(JSOX.begin())];
  var fa = 0;
  JSOX.parse = function(c, k) {
    var a = fa++;
    V.length <= a && V.push(Object.freeze(JSOX.begin()));
    a = V[a];
    "string" !== typeof c && (c = String(c));
    a.reset();
    if (0 < a._write(c, !0)) {
      return c = a.value(), "function" === typeof k && function u(a, c) {
        var b, l = a[c];
        if (l && "object" === typeof l) {
          for (b in l) {
            if (Object.prototype.hasOwnProperty.call(l, b)) {
              var n = u(l, b);
              void 0 !== n ? l[b] = n : delete l[b];
            }
          }
        }
        return k.call(a, c, l);
      }({"":c}, ""), fa--, c;
    }
  };
  var oa = function() {
    return this && this.valueOf();
  };
  q.set(Object.prototype, {external:!1, name:Object.prototype.constructor.name, cb:null});
  q.set(Date.prototype, {external:!1, name:"Date", cb:function() {
    var c = -this.getTimezoneOffset(), k = 0 <= c ? "+" : "-", a = function(a) {
      a = Math.floor(Math.abs(a));
      return (10 > a ? "0" : "") + a;
    };
    return [this.getFullYear(), "-", a(this.getMonth() + 1), "-", a(this.getDate()), "T", a(this.getHours()), ":", a(this.getMinutes()), ":", a(this.getSeconds()), k, a(c / 60), ":", a(c % 60)].join("");
  }});
  q.set(Boolean.prototype, {external:!1, name:"Boolean", cb:oa});
  q.set(Number.prototype, {external:!1, name:"Number", cb:function() {
    return isNaN(this) ? "NaN" : isFinite(this) ? String(this) : 0 > this ? "-Infinity" : "Infinity";
  }});
  q.set(String.prototype, {external:!1, name:"String", cb:function() {
    return '"' + JSOX.escape(oa.apply(this)) + '"';
  }});
  "function" === typeof BigInt && q.set(BigInt.prototype, {external:!1, name:"BigInt", cb:function() {
    return this + "n";
  }});
  q.set(ArrayBuffer.prototype, {external:!0, name:"ab", cb:function() {
    return "[" + B(this) + "]";
  }});
  q.set(Uint8Array.prototype, {external:!0, name:"u8", cb:function() {
    return "[" + B(this.buffer) + "]";
  }});
  q.set(Uint8ClampedArray.prototype, {external:!0, name:"uc8", cb:function() {
    return "[" + B(this.buffer) + "]";
  }});
  q.set(Int8Array.prototype, {external:!0, name:"s8", cb:function() {
    return "[" + B(this.buffer) + "]";
  }});
  q.set(Uint16Array.prototype, {external:!0, name:"u16", cb:function() {
    return "[" + B(this.buffer) + "]";
  }});
  q.set(Int16Array.prototype, {external:!0, name:"s16", cb:function() {
    return "[" + B(this.buffer) + "]";
  }});
  q.set(Uint32Array.prototype, {external:!0, name:"u32", cb:function() {
    return "[" + B(this.buffer) + "]";
  }});
  q.set(Int32Array.prototype, {external:!0, name:"s32", cb:function() {
    return "[" + B(this.buffer) + "]";
  }});
  "undefined" != typeof Uint64Array && q.set(Uint64Array.prototype, {external:!0, name:"u64", cb:function() {
    return "[" + B(this.buffer) + "]";
  }});
  "undefined" != typeof Int64Array && q.set(Int64Array.prototype, {external:!0, name:"s64", cb:function() {
    return "[" + B(this.buffer) + "]";
  }});
  q.set(Float32Array.prototype, {external:!0, name:"f32", cb:function() {
    return "[" + B(this.buffer) + "]";
  }});
  q.set(Float64Array.prototype, {external:!0, name:"f64", cb:function() {
    return "[" + B(this.buffer) + "]";
  }});
  q.set(Float64Array.prototype, {external:!0, name:"f64", cb:function() {
    return "[" + B(this.buffer) + "]";
  }});
  q.set(Map.prototype, Z = {external:!0, name:"map", cb:null});
  R.set("map", function() {
    var c = new Map;
    for (key in this) {
      c.set(key, this[key]);
    }
    return c;
  });
  q.set(Array.prototype, U = {external:!1, name:Array.prototype.constructor.name, cb:null});
  JSOX.registerToJSOX = function(c, k, a) {
    if (k.prototype && k.prototype === Object.prototype) {
      k = Object.keys(k).toString();
      if (W.get(k)) {
        throw Error("Existing toJSOX has been registered for object type");
      }
      W.set(k, {external:!0, name:c, cb:a});
    } else {
      if (q.get(k)) {
        throw Error("Existing toJSOX has been registered for prototype");
      }
      console.log("PUSH PROTOTYPE");
      q.set(k, {external:!0, name:c || a.constructor.name, cb:a});
    }
  };
  JSOX.registerFromJSOX = function(c, k) {
    if (R.get(c)) {
      throw Error("Existing fromJSOX has been registered for prototype");
    }
    R.set(c, k);
  };
  JSOX.registerToFrom = function(c, k, a, m) {
    JSOX.registerToJSOX(c, k, a);
    JSOX.registerFromJSOX(c, m);
  };
  JSOX.stringifier = function() {
    function c(a) {
      if (null !== a) {
        var b = h.get(a);
        if (b) {
          return b;
        }
        if (!u.length) {
          return "";
        }
        h.set(a, JSON.stringify(u));
      }
    }
    function k(a, b) {
      var c, n = Object.getPrototypeOf(a);
      if (c = m.find((a) => {
        if (a.proto && a.proto === n) {
          return !0;
        }
      })) {
        return c;
      }
      if (b) {
        b = b.map((a) => {
          if ("string" === typeof a) {
            return a;
          }
        });
        var k = b.toString();
      } else {
        k = Object.keys(a).toString();
      }
      return c = m.find((a) => {
        if (a.tag === k) {
          return !0;
        }
      });
    }
    function a(a, G, E) {
      function n(a) {
        return isNaN(a) ? a in ta || /((\n|\r|\t)|[ \{\}\(\)<>!\+\-\*\/\.:, ])/.test(a) ? g + JSOX.escape(a) + g : a : ["'", a.toString(), "'"].join("");
      }
      function z(a, g) {
        function d() {
          var a = [];
          let b = u.length;
          for (let c = 0; c < this.length; c += 1) {
            u[b] = c, a[c] = z(c, this) || "null";
          }
          u.splice(b, 1);
          return 0 === a.length ? "[]" : w ? ["[\n", w, a.join(",\n" + w), "\n", r, "]"].join("") : "[" + a.join(",") + "]";
        }
        function G() {
          var a = {tmp:null}, b = "{", c = !0, d, e;
          for ([d, e] of this) {
            a.tmp = e, b += (c ? "" : ",") + n(d) + ":" + z("tmp", a), c = !1;
          }
          return b += "}";
        }
        B && (U.cb = d, Z.cb = G, B = !1);
        U.cb = d;
        var h, r = w;
        let E = u.length;
        var e = g[a], v = void 0 !== e && null !== e && (b.get(Object.getPrototypeOf(e)) || q.get(Object.getPrototypeOf(e)) || null);
        var A = !v && void 0 !== e && null !== e && (l.get(Object.keys(e).toString()) || W.get(Object.keys(e).toString()) || null);
        var x = v && v.cb || A && A.cb;
        if (void 0 !== e && null !== e && "function" === typeof x) {
          w += F;
          if ("object" === typeof e && (h = c(e))) {
            return "ref" + h;
          }
          e = x.apply(e);
          w = r;
        } else {
          "object" === typeof e && (h = c(e));
        }
        "function" === typeof y && (e = y.call(g, a, e));
        switch(typeof e) {
          case "string":
          case "number":
            var p = "";
            "" === a && (p = m.map((a) => a.name + "{" + a.fields.join(",") + "}").join(w ? "\n" : "") + (w ? "\n" : ""));
            return v && v.external ? p + v.name + e : A && A.external ? p + A.name + e : p + e;
          case "boolean":
          case "null":
            return String(e);
          case "object":
            if (h) {
              return "ref" + h;
            }
            if (!e) {
              return "null";
            }
            w += F;
            A = null;
            g = [];
            if (y && "object" === typeof y) {
              var H = y.length;
              A = k(e, y);
              for (x = 0; x < H; x += 1) {
                "string" === typeof y[x] && (p = y[x], u[E] = p, (h = z(p, e)) && (A ? g.push(h) : g.push(n(p) + (w ? ": " : ":") + h)));
              }
            } else {
              A = k(e);
              x = [];
              for (p in e) {
                if (Object.prototype.hasOwnProperty.call(e, p)) {
                  for (H = 0; H < x.length; H++) {
                    if (x[H] > p) {
                      x.splice(H, 0, p);
                      break;
                    }
                  }
                  H == x.length && x.push(p);
                }
              }
              for (H = 0; H < x.length; H++) {
                p = x[H], Object.prototype.hasOwnProperty.call(e, p) && (u[E] = p, (h = z(p, e)) && (A ? g.push(h) : g.push(n(p) + (w ? ": " : ":") + h)));
              }
            }
            u.splice(E, 1);
            e = "" === a ? m.map((a) => a.name + "{" + a.fields.join(",") + "}").join(w ? "\n" : "") + (w ? "\n" : "") : "";
            v && v.external && (e = "" === a ? e + v.name : e + '"' + v.name + '"');
            a = null;
            A && (a = n(A.name));
            h = e + (0 === g.length ? "{}" : w ? (A ? a : "") + "{\n" + w + g.join(",\n" + w) + "\n" + r + "}" : (A ? a : "") + "{" + g.join(",") + "}");
            w = r;
            return h;
        }
      }
      if (void 0 === a) {
        return "undefined";
      }
      if (null !== a) {
        var B = !0, w, y;
        var r = typeof E;
        var K = typeof G;
        var F = w = "";
        if ("number" === r) {
          for (r = 0; r < E; r += 1) {
            F += " ";
          }
        } else {
          "string" === r && (F = E);
        }
        if ((y = G) && "function" !== K && ("object" !== K || "number" !== typeof G.length)) {
          throw Error("JSOX.stringify");
        }
        u = [];
        h = new WeakMap;
        return z("", {"":a});
      }
    }
    var m = [], g = '"', h = new WeakMap, u = [], b = new WeakMap, l = new Map;
    return {defineClass(a, b) {
      m.push(a = {name:a, tag:Object.keys(b).toString(), proto:Object.getPrototypeOf(b), fields:Object.keys(b)});
      for (b = 1; b < a.fields.length; b++) {
        if (a.fields[b] < a.fields[b - 1]) {
          let c = a.fields[b - 1];
          a.fields[b - 1] = a.fields[b];
          a.fields[b] = c;
          1 < b && (b -= 2);
        }
      }
      a.proto === Object.getPrototypeOf({}) && (a.proto = null);
    }, stringify(b, c, g) {
      return a(b, c, g);
    }, setQuote(a) {
      g = a;
    }, registerToJSOX(a, c, g) {
      if (c.prototype && c.prototype !== Object.prototype) {
        if (b.get(c)) {
          throw Error("Existing toJSOX has been registered for prototype");
        }
        b.set(c, {external:!0, name:a || g.constructor.name, cb:g});
      } else {
        c = Object.keys(c).toString();
        if (l.get(c)) {
          throw Error("Existing toJSOX has been registered for object type");
        }
        l.set(c, {external:!0, name:a, cb:g});
      }
    }};
  };
  const y = {"=":-1};
  for (var P = 0; 256 > P; P++) {
    64 > P && (y["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[P]] = P);
  }
  JSOX.stringify = function(c, k, a) {
    return JSOX.stringifier().stringify(c, k, a);
  };
  [[0, 384, [16767487, 16739071, 130048, 3670016, 0, 16777208, 16777215, 8388607, 8388608, 0, 128, 0, 0, 0, 0, 0]]].map((c) => ({firstChar:c[0], lastChar:c[1], bits:c[2]}));
}
privateizeEverything();


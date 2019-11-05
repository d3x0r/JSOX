'use strict';
const _JSON = JSON;
var JSOX = exports;
function privateizeEverything() {
  function ka() {
    var c = X.pop();
    c || (c = {context:0, current_class:null, current_class_field:0, arrayType:-1, elements:null, element_array:null});
    return c;
  }
  function qa() {
    var c = la.pop();
    c ? c.n = 0 : c = {buf:null, n:0};
    return c;
  }
  function C(c) {
    var k = "";
    c = new Uint8Array(c);
    var a = c.byteLength, e = a % 3;
    a -= e;
    for (var g, h, u, b, m = 0; m < a; m += 3) {
      b = c[m] << 16 | c[m + 1] << 8 | c[m + 2], g = (b & 16515072) >> 18, h = (b & 258048) >> 12, u = (b & 4032) >> 6, b &= 63, k += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[g] + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[h] + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[u] + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[b];
    }
    1 == e ? (b = c[a], g = (b & 252) >> 2, h = (b & 3) << 4, k += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[g] + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[h] + "==") : 2 == e && (b = c[a] << 8 | c[a + 1], g = (b & 64512) >> 10, h = (b & 1008) >> 4, u = (b & 15) << 2, k += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[g] + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[h] + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[u] + 
    "=");
    return k;
  }
  function ra(c) {
    var k = new ArrayBuffer(1 == c.length % 4 ? 3 * ((c.length + 3) / 4 | 0) - 3 : 2 == c.length % 4 ? 3 * ((c.length + 3) / 4 | 0) - 2 : 3 == c.length % 4 ? 3 * ((c.length + 3) / 4 | 0) - 1 : -1 == v[c[c.length - 3]] ? 3 * ((c.length + 3) / 4 | 0) - 3 : -1 == v[c[c.length - 2]] ? 3 * ((c.length + 3) / 4 | 0) - 2 : -1 == v[c[c.length - 1]] ? 3 * ((c.length + 3) / 4 | 0) - 1 : 3 * ((c.length + 3) / 4 | 0)), a = new Uint8Array(k), e, g = c.length + 3 >> 2;
    for (e = 0; e < g; e++) {
      var h = v[c[4 * e]], u = 4 * e + 1 < c.length ? v[c[4 * e + 1]] : -1, b = 0 <= u && 4 * e + 2 < c.length ? v[c[4 * e + 2]] : -1, m = 0 <= b && 4 * e + 3 < c.length ? v[c[4 * e + 3]] : -1;
      0 <= u && (a[3 * e] = h << 2 | u >> 4);
      0 <= b && (a[3 * e + 1] = u << 4 | b >> 2 & 15);
      0 <= m && (a[3 * e + 2] = b << 6 | m & 63);
    }
    return k;
  }
  const ma = "function" === typeof BigInt, sa = "ab u8 cu8 s8 u16 s16 u32 s32 u64 s64 f32 f64".split(" ");
  var U = null, Y = null;
  const ta = [ArrayBuffer, Uint8Array, Uint8ClampedArray, Int8Array, Uint16Array, Int16Array, Uint32Array, Int32Array, null, null, Float32Array, Float64Array], ua = {["true"]:!0, ["false"]:!1, ["null"]:null, ["NaN"]:NaN, ["Infinity"]:Infinity, ["undefined"]:void 0}, X = [], la = [];
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
    const a = {name:null, value_type:0, string:"", contains:null, className:null}, e = {line:1, col:1};
    let g = 0, h;
    var u = new Map, b = 0, m = !0, n = !1, K = null, q = null, w = void 0, x = [], M = {first:null, last:null, saved:null, push(a) {
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
    }, length:0}, y = [], C = {}, r = null, J = 0, z = -1, d = 0, L = 0, v = !1, Z = !1, S = !1, fa = !1, ha = !1, l = {first:null, last:null, saved:null, push(a) {
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
    }}, ia = null, B = !1, A = !1, p = !1, G = !1, aa = !1, T = !1, ba = !1, D = 0, N = 0, P = !1, H = !1, O = !1, ca = !1;
    return {registerFromJSOX(a, b) {
      if (u.get(a)) {
        throw Error("Existing fromJSOX has been registered for prototype");
      }
      u.set(a, b);
    }, value() {
      var a = K;
      K = void 0;
      return a;
    }, reset() {
      b = 0;
      m = !0;
      l.last && (l.last.next = l.save);
      l.save = l.first;
      l.first = l.last = null;
      M.last && (M.last.next = M.save);
      M.save = l.first;
      x = M.first = M.last = null;
      w = void 0;
      d = 0;
      y = [];
      C = {};
      r = null;
      J = 0;
      a.value_type = 0;
      a.name = null;
      a.string = "";
      a.className = null;
      e.line = 1;
      e.col = 1;
      n = !1;
      L = 0;
      G = p = B = H = !1;
    }, usePrototype(a, b) {
      C[a] = b;
    }, write(a) {
      "string" !== typeof a && (a = String(a));
      for (a = this._write(a, !1); 0 < a && !(K && ("function" === typeof k && function wa(a, b) {
        var c, d = a[b];
        if (d && "object" === typeof d) {
          for (c in d) {
            if (Object.prototype.hasOwnProperty.call(d, c)) {
              var e = wa(d, c);
              void 0 !== e ? d[c] = e : delete d[c];
            }
          }
        }
        return k.call(a, b, d);
      }({"":K}, ""), c(K), K = void 0), 2 > a); a = this._write()) {
      }
    }, _write(c, k) {
      function t(a, b) {
        throw Error(`${a} '${String.fromCodePoint(b)}' unexpected at ${g} (near '${I.substr(4 < g ? g - 4 : 0, 4 < g ? 3 : g - 1)}[${String.fromCodePoint(b)}]${I.substr(g, 10)}') [${e.line}:${e.col}]`);
      }
      function F() {
        a.value_type = 0;
        a.string = "";
      }
      function va(a) {
        if (ca) {
          if (ma) {
            return BigInt(a);
          }
          throw Error("no builtin BigInt()", 0);
        }
        return O ? new Date(a) : 1 < a.length && !v && !Z && !S && 48 === a.charCodeAt(0) ? (n ? -1 : 1) * Number("0o" + a) : (n ? -1 : 1) * Number(a);
      }
      function U() {
        var b = null;
        switch(a.value_type) {
          case 5:
            if (ca) {
              if (ma) {
                return BigInt(a.string);
              }
              throw Error("no builtin BigInt()", 0);
            }
            return O ? new Date(a.string) : va(a.string);
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
            if (0 <= z) {
              return b = ra(a.string), 0 === z ? b : new ta[z](b);
            }
            if (-2 === z) {
              b = q;
              b = a.contains.reduce((a, b) => a && a[b], b);
              if (!b) {
                throw Error("Path did not resolve poperly.");
              }
              return b;
            }
            return a.className && ((b = u.get(a.className)) || (b = R.get(a.className)), a.className = null, b) ? b.call(a.contains) : a.contains;
          default:
            console.log("Unhandled value conversion.", a);
        }
      }
      function W() {
        if (-1 != z) {
          switch(a.value_type) {
            case 12:
              x.push(void 0);
              delete x[x.length - 1];
              break;
            default:
              x.push(U());
          }
          F();
        }
      }
      function da() {
        12 !== a.value_type && (w[a.name] = U(), F());
      }
      function E(c) {
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
        123 == c ? Y() : 91 == c ? na() : 32 != c && 13 != c && 10 != c && 9 != c && 65279 != c && 2028 != c && 2029 != c && (44 == c || 125 == c || 93 == c || 58 == c ? t("Invalid character near identifier", c) : a.string += h);
      }
      function V(b) {
        let c = 0;
        for (; 0 == c && g < I.length;) {
          h = I.charAt(g);
          let d = I.codePointAt(g++);
          65536 <= d && (h += I.charAt(g), g++);
          e.col++;
          if (d == b) {
            p ? (a.string += h, p = !1) : (P ? t("Incomplete Octal sequence", d) : ba ? t("Incomplete hexidecimal sequence", d) : T ? t("Incomplete unicode sequence", d) : aa && t("Incomplete long unicode sequence", d), c = 1);
          } else {
            if (p) {
              if (P) {
                if (3 > N && 48 <= d && 57 >= d) {
                  D *= 8, D += d - 48, N++, 3 === N && (a.string += String.fromCodePoint(D), p = P = !1);
                } else {
                  if (255 < D) {
                    t("(escaped character, parsing octal escape val=%d) fault while parsing", d);
                    c = -1;
                    break;
                  }
                  a.string += String.fromCodePoint(D);
                  p = P = !1;
                }
              } else {
                if (aa) {
                  125 == d ? (a.string += String.fromCodePoint(D), p = T = aa = !1) : (D *= 16, 48 <= d && 57 >= d ? D += d - 48 : 65 <= d && 70 >= d ? D += d - 65 + 10 : 97 <= d && 102 >= d ? D += d - 97 + 10 : (t("(escaped character, parsing hex of \\u)", d), c = -1, p = aa = !1));
                } else {
                  if (ba || T) {
                    if (0 === N && 123 === d) {
                      aa = !0;
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
                            t(T ? "(escaped character, parsing hex of \\u)" : "(escaped character, parsing hex of \\x)", d);
                            c = -1;
                            p = ba = !1;
                            continue;
                          }
                        }
                      }
                      N++;
                      T ? 4 == N && (a.string += String.fromCodePoint(D), p = T = !1) : 2 == N && (a.string += String.fromCodePoint(D), p = ba = !1);
                      continue;
                    }
                  }
                  switch(d) {
                    case 13:
                      G = !0;
                      e.col = 1;
                      continue;
                    case 10:
                    case 2028:
                    case 2029:
                      e.line++;
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
                      P = !0;
                      D = d - 48;
                      N = 1;
                      continue;
                    case 120:
                      ba = !0;
                      D = N = 0;
                      continue;
                    case 117:
                      T = !0;
                      D = N = 0;
                      continue;
                    default:
                      a.string += h;
                  }
                  p = !1;
                }
              }
            } else {
              92 === d ? p ? (a.string += "\\", p = !1) : p = !0 : G ? (G = !1, 10 == d ? (e.line++, e.col = 1, p = !1) : (e.line++, e.col = 1)) : a.string += h;
            }
          }
        }
        return c;
      }
      function ja() {
        let b;
        for (; (b = g) < I.length;) {
          h = I.charAt(b);
          let c = I.codePointAt(g++);
          65536 <= c && (t("fault while parsing number;", c), h += I.charAt(g), g++);
          if (95 != c) {
            if (e.col++, 48 <= c && 57 >= c) {
              S && (ha = !0), a.string += h;
            } else {
              if (45 == c || 43 == c) {
                0 == a.string.length || S && !fa && !ha ? (a.string += h, fa = !0) : (a.string += h, O = !0);
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
                        if (Z || v || S) {
                          m = !1;
                          t("fault while parsing number;", c);
                          break;
                        } else {
                          a.string += h, Z = !0;
                        }
                      } else {
                        if (110 == c) {
                          ca = !0;
                          break;
                        } else {
                          if (120 == c || 98 == c || 111 == c || 88 == c || 66 == c || 79 == c) {
                            if (v || "0" != a.string) {
                              m = !1;
                              t("fault while parsing number;", c);
                              break;
                            } else {
                              v = !0, a.string += h;
                            }
                          } else {
                            if (101 == c || 69 == c) {
                              if (S) {
                                m = !1;
                                t("fault while parsing number;", c);
                                break;
                              } else {
                                a.string += h, S = !0;
                              }
                            } else {
                              32 == c || 13 == c || 10 == c || 9 == c || 65279 == c || 44 == c || 125 == c || 93 == c || 58 == c ? g = b : k && (m = !1, t("fault while parsing number;", c));
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
        k || g != I.length ? (A = !1, a.value_type = 5, 0 == d && (H = !0)) : A = !0;
      }
      function Y() {
        let c, e = null, n = {};
        0 < b && 29 > b && E();
        if (0 == d) {
          29 == b && a.string.length ? (u.get(a.string) ? a.className = a.string : R.get(a.string) && (a.className = a.string), (e = y.find((b) => b.name === a.string)) ? (n = Object.assign(n, e.protoObject), Object.setPrototypeOf(n, Object.getPrototypeOf(e.protoObject)), c = 6) : (y.push(e = {name:a.string, protoObject:C[a.string] || Object.create({}), fields:[]}), c = 5), b = 0) : (c = 3, b = 29);
        } else {
          if (29 == b || 1 === d || 4 === d) {
            0 != b ? (u.get(a.string) ? a.className = a.string : R.get(a.string) && (a.className = a.string), (e = y.find((b) => b.name === a.string)) || t("Referenced class " + a.string + " has not been defined", f), n = Object.assign(n, e.protoObject), Object.setPrototypeOf(n, Object.getPrototypeOf(e.protoObject)), c = 6) : c = 3, b = 0;
          } else {
            if (3 == d && 0 == b) {
              return t("fault while parsing; getting field name unexpected ", f), m = !1;
            }
            c = 3;
          }
        }
        {
          let b = ka();
          a.value_type = 6;
          0 == d ? w = n : 1 == d ? -1 == z && x.push(n) : 4 == d && (w[a.name] = n);
          b.context = d;
          b.elements = w;
          b.element_array = x;
          b.name = a.name;
          b.current_class = r;
          b.current_class_field = J;
          b.arrayType = z;
          b.className = a.className;
          z = -1;
          a.className = null;
          r = e;
          J = 0;
          w = n;
          q || (q = w);
          M.push(b);
          F();
          d = c;
        }
        return !0;
      }
      function na() {
        0 < b && 29 > b && E();
        if (29 == b && a.string.length) {
          var c = sa.findIndex((b) => b === a.string);
          0 <= c ? (b = 0, z = c) : "ref" === a.string ? z = -2 : u.get(a.string) ? a.className = a.string : R.get(a.string) ? a.className = a.string : t("Unknown type specified for array:" + a.string, f);
        } else {
          if (3 == d || 29 == b || 30 == b) {
            return t("Fault while parsing; while getting field name unexpected", f), m = !1;
          }
        }
        {
          c = ka();
          a.value_type = 13;
          let b = [];
          0 == d ? x = b : 1 == d ? -1 == z && x.push(b) : 4 == d && (w[a.name] = b);
          c.context = d;
          c.elements = w;
          c.element_array = x;
          c.name = a.name;
          c.current_class = r;
          c.current_class_field = J;
          c.arrayType = z;
          c.className = a.className;
          z = -1;
          r = a.className = null;
          J = 0;
          x = b;
          q || (q = x);
          M.push(c);
          F();
          d = 1;
        }
        return !0;
      }
      var ea = 0;
      if (!m) {
        return -1;
      }
      if (c && c.length) {
        var Q = qa();
        Q.buf = c;
        l.push(Q);
      } else {
        A && (A = !1, a.value_type = 5, 0 == d && (H = !0), ea = 1);
      }
      for (; m && (Q = l.shift());) {
        g = Q.n;
        var I = Q.buf;
        B && (c = V(ia), 0 > c ? m = !1 : 0 < c && (B = !1, m && (a.value_type = 4)));
        for (A && ja(); !H && m && g < I.length;) {
          h = I.charAt(g);
          var f = I.codePointAt(g++);
          65536 <= f && (h += I.charAt(g), g++);
          e.col++;
          if (L) {
            if (1 == L) {
              if (42 == f) {
                L = 3;
                continue;
              }
              47 != f ? (t("fault while parsing;", f), m = !1) : L = 2;
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
              Y();
              break;
            case 91:
              na();
              break;
            case 58:
              3 == d || 5 == d ? 0 != b && 29 != b && 30 != b ? (m = FALSE, thorwError(`fault while parsing; unquoted keyword used as object field name (state:${b})`, f)) : (b = 0, a.name = a.string, a.string = "", d = 4, a.value_type = 0) : (1 == d ? t("(in array, got colon out of string):parsing fault;", f) : t("(outside any object, got colon out of string):parsing fault;", f), m = !1);
              break;
            case 125:
              31 == b && (b = 0);
              5 == d ? r ? (a.string && (r.protoObject[a.string] = void 0, r.fields.push(a.string)), F(), c = M.pop(), b = d = 0, a.name = c.name, w = c.elements, x = c.element_array, r = c.current_class, J = c.current_class_field, z = c.arrayType, a.className = c.className, q = null, X.push(c)) : t("State error; gathering class fields, and lost the class", f) : 3 == d || 6 == d ? (0 != a.value_type && (r && (a.name = r.fields[J++]), da()), a.value_type = 6, a.contains = w, a.string = "", c = M.pop(), 
              d = c.context, a.name = c.name, w = c.elements, x = c.element_array, r = c.current_class, J = c.current_class_field, z = c.arrayType, a.className = c.className, X.push(c), 0 == d && (H = !0)) : 4 == d ? (0 != a.value_type && da(), a.value_type = 6, a.contains = w, c = M.pop(), a.name = c.name, d = c.context, a.name = c.name, w = c.elements, r = c.current_class, J = c.current_class_field, z = c.arrayType, a.className = c.className, x = c.element_array, X.push(c), 0 == d && (H = !0)) : 
              (t("Fault while parsing; unexpected", f), m = !1);
              n = !1;
              break;
            case 93:
              31 == b && (b = 0);
              1 == d ? (0 != a.value_type && W(), a.contains = x, c = M.pop(), a.name = c.name, d = c.context, w = c.elements, r = c.current_class, J = c.current_class_field, z = c.arrayType, a.className = c.className, x = c.element_array, X.push(c), a.value_type = 13, 0 == d && (H = !0)) : (t(`bad context ${d}; fault while parsing`, f), m = !1);
              n = !1;
              break;
            case 44:
              if (31 == b || 29 == b) {
                b = 0;
              }
              5 == d ? r ? (r.protoObject[a.string] = void 0, r.fields.push(a.string), a.string = "", b = 29) : t("State error; gathering class fields, and lost the class", f) : 3 == d ? r ? (a.name = r.fields[J++], 0 != a.value_type && (da(), F())) : t("State error; gathering class values, and lost the class", f) : 6 == d ? r ? (a.name = r.fields[J++], 0 != a.value_type && (da(), F())) : t("State error; gathering class values, and lost the class", f) : 1 == d ? (0 == a.value_type && (a.value_type = 
              12), 0 != a.value_type && (W(), F())) : 4 == d ? (d = 3, 0 != a.value_type && (da(), F()), b = 0) : (m = !1, t("bad context; excessive commas while parsing;", f));
              n = !1;
              break;
            default:
              if (0 == d || 4 == d && 29 == b || 3 == d || 5 == d) {
                switch(f) {
                  case 96:
                  case 34:
                  case 39:
                    0 == b || 29 == b ? (a.string.length && (a.className = a.string, a.string = ""), V(f) ? a.value_type = 4 : (ia = f, B = !0)) : t("fault while parsing; quote not at start of field name", f);
                    break;
                  case 10:
                    e.line++, e.col = 1;
                  case 13:
                  case 32:
                  case 9:
                  case 65279:
                    if (31 === b) {
                      b = 0;
                      0 === d && (H = !0);
                      break;
                    }
                    0 === b || 30 === b ? 0 == d && a.value_type && (H = !0) : 29 === b ? 0 === d ? (b = 0, H = !0) : a.string.length && (b = 30) : (m = !1, t("fault while parsing; whitepsace unexpected", f));
                    break;
                  default:
                    0 == b && (48 <= f && 57 >= f || 43 == f || 46 == f || 45 == f) ? (Z = ha = fa = ca = O = S = v = !1, a.string = h, Q.n = g, ja()) : (30 === b && (m = !1, t("fault while parsing; character unexpected", f)), 0 === b && (b = 29, a.value_type = 4), a.string += h);
                }
              } else {
                switch(f) {
                  case 96:
                  case 34:
                  case 39:
                    V(f) ? (a.value_type = 4, b = 31) : (ia = f, B = !0);
                    break;
                  case 10:
                    e.line++, e.col = 1;
                  case 32:
                  case 9:
                  case 13:
                  case 2028:
                  case 2029:
                  case 65279:
                    if (31 == b) {
                      b = 0;
                      0 == d && (H = !0);
                      break;
                    }
                    0 != b && 30 != b && (29 == b ? a.string.length && (b = 30) : (m = !1, t("fault parsing whitespace", f)));
                    break;
                  case 116:
                    0 == b ? b = 1 : 27 == b ? b = 28 : E(f);
                    break;
                  case 114:
                    1 == b ? b = 2 : E(f);
                    break;
                  case 117:
                    2 == b ? b = 3 : 9 == b ? b = 10 : 0 == b ? b = 12 : E(f);
                    break;
                  case 101:
                    3 == b ? (a.value_type = 2, b = 31) : 8 == b ? (a.value_type = 3, b = 31) : 14 == b ? b = 15 : 18 == b ? b = 19 : E(f);
                    break;
                  case 110:
                    0 == b ? b = 9 : 12 == b ? b = 13 : 17 == b ? b = 18 : 22 == b ? b = 23 : 25 == b ? b = 26 : E(f);
                    break;
                  case 100:
                    13 == b ? b = 14 : 19 == b ? (a.value_type = -1, b = 31) : E(f);
                    break;
                  case 105:
                    16 == b ? b = 17 : 24 == b ? b = 25 : 26 == b ? b = 27 : E(f);
                    break;
                  case 108:
                    10 == b ? b = 11 : 11 == b ? (a.value_type = 1, b = 31) : 6 == b ? b = 7 : E(f);
                    break;
                  case 102:
                    0 == b ? b = 5 : 15 == b ? b = 16 : 23 == b ? b = 24 : E(f);
                    break;
                  case 97:
                    5 == b ? b = 6 : 20 == b ? b = 21 : E(f);
                    break;
                  case 115:
                    7 == b ? b = 8 : E(f);
                    break;
                  case 73:
                    0 == b ? b = 22 : E(f);
                    break;
                  case 78:
                    0 == b ? b = 20 : 21 == b ? (a.value_type = n ? 7 : 8, n = !1, b = 31) : E(f);
                    break;
                  case 121:
                    28 == b ? (a.value_type = n ? 9 : 10, n = !1, b = 31) : E(f);
                    break;
                  case 45:
                    0 == b ? n = !n : E(f);
                    break;
                  default:
                    0 == b && (48 <= f && 57 >= f || 43 == f || 46 == f || 45 == f) ? (Z = ha = fa = ca = O = S = v = !1, a.string = h, Q.n = g, ja()) : E(f);
                }
              }
          }
          if (H) {
            31 == b && (b = 0);
            break;
          }
        }
        g == I.length ? (la.push(Q), B || A || 3 == d ? ea = 0 : 0 != d || 0 == a.value_type && !K || (H = !0, ea = 1)) : (Q.n = g, l.unshift(Q), ea = 2);
        if (H) {
          q = null;
          break;
        }
      }
      if (!m) {
        return -1;
      }
      H && 0 != a.value_type && (K = U(), n = !1, a.string = "", a.value_type = 0);
      H = !1;
      return ea;
    }};
  };
  const V = [Object.freeze(JSOX.begin())];
  var oa = 0;
  JSOX.parse = function(c, k) {
    var a = oa++;
    V.length <= a && V.push(Object.freeze(JSOX.begin()));
    a = V[a];
    "string" !== typeof c && (c = String(c));
    a.reset();
    if (0 < a._write(c, !0)) {
      return c = a.value(), "function" === typeof k && function u(a, c) {
        var b, m = a[c];
        if (m && "object" === typeof m) {
          for (b in m) {
            if (Object.prototype.hasOwnProperty.call(m, b)) {
              var n = u(m, b);
              void 0 !== n ? m[b] = n : delete m[b];
            }
          }
        }
        return k.call(a, c, m);
      }({"":c}, ""), oa--, c;
    }
  };
  var pa = function() {
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
  q.set(Boolean.prototype, {external:!1, name:"Boolean", cb:pa});
  q.set(Number.prototype, {external:!1, name:"Number", cb:function() {
    return isNaN(this) ? "NaN" : isFinite(this) ? String(this) : 0 > this ? "-Infinity" : "Infinity";
  }});
  q.set(String.prototype, {external:!1, name:"String", cb:function() {
    return '"' + JSOX.escape(pa.apply(this)) + '"';
  }});
  "function" === typeof BigInt && q.set(BigInt.prototype, {external:!1, name:"BigInt", cb:function() {
    return this + "n";
  }});
  q.set(ArrayBuffer.prototype, {external:!0, name:"ab", cb:function() {
    return "[" + C(this) + "]";
  }});
  q.set(Uint8Array.prototype, {external:!0, name:"u8", cb:function() {
    return "[" + C(this.buffer) + "]";
  }});
  q.set(Uint8ClampedArray.prototype, {external:!0, name:"uc8", cb:function() {
    return "[" + C(this.buffer) + "]";
  }});
  q.set(Int8Array.prototype, {external:!0, name:"s8", cb:function() {
    return "[" + C(this.buffer) + "]";
  }});
  q.set(Uint16Array.prototype, {external:!0, name:"u16", cb:function() {
    return "[" + C(this.buffer) + "]";
  }});
  q.set(Int16Array.prototype, {external:!0, name:"s16", cb:function() {
    return "[" + C(this.buffer) + "]";
  }});
  q.set(Uint32Array.prototype, {external:!0, name:"u32", cb:function() {
    return "[" + C(this.buffer) + "]";
  }});
  q.set(Int32Array.prototype, {external:!0, name:"s32", cb:function() {
    return "[" + C(this.buffer) + "]";
  }});
  "undefined" != typeof Uint64Array && q.set(Uint64Array.prototype, {external:!0, name:"u64", cb:function() {
    return "[" + C(this.buffer) + "]";
  }});
  "undefined" != typeof Int64Array && q.set(Int64Array.prototype, {external:!0, name:"s64", cb:function() {
    return "[" + C(this.buffer) + "]";
  }});
  q.set(Float32Array.prototype, {external:!0, name:"f32", cb:function() {
    return "[" + C(this.buffer) + "]";
  }});
  q.set(Float64Array.prototype, {external:!0, name:"f64", cb:function() {
    return "[" + C(this.buffer) + "]";
  }});
  q.set(Float64Array.prototype, {external:!0, name:"f64", cb:function() {
    return "[" + C(this.buffer) + "]";
  }});
  q.set(Map.prototype, Y = {external:!0, name:"map", cb:null});
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
      q.set(k, {external:!0, name:c || a.constructor.name, cb:a});
    }
  };
  JSOX.registerFromJSOX = function(c, k) {
    if (R.get(c)) {
      throw Error("Existing fromJSOX has been registered for prototype");
    }
    R.set(c, k);
  };
  JSOX.registerToFrom = function(c, k, a, e) {
    JSOX.registerToJSOX(c, k, a);
    JSOX.registerFromJSOX(c, e);
  };
  JSOX.stringifier = function() {
    function c(a) {
      if (null !== a) {
        var b = h.get(a);
        if (b) {
          return b;
        }
        h.set(a, _JSON.stringify(u));
      }
    }
    function k(a, b) {
      var c, n = Object.getPrototypeOf(a);
      if (c = e.find((a) => {
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
      return c = e.find((a) => {
        if (a.tag === k) {
          return !0;
        }
      });
    }
    function a(a, K, F) {
      function n(a) {
        return isNaN(a) ? a in ua || /([0-9\-])/.test(a[0]) || /((\n|\r|\t)|[ \{\}\(\)<>!\+\-\*\/\.:, ])/.test(a) ? g + JSOX.escape(a) + g : a : ["'", a.toString(), "'"].join("");
      }
      function x(a, g) {
        function d() {
          var a = [];
          let b = u.length;
          for (let c = 0; c < this.length; c += 1) {
            u[b] = c, a[c] = x(c, this) || "null";
          }
          u.splice(b, 1);
          return 0 === a.length ? "[]" : y ? ["[\n", y, a.join(",\n" + y), "\n", r, "]"].join("") : "[" + a.join(",") + "]";
        }
        function K() {
          var a = {tmp:null}, b = "{", c = !0, d, e;
          for ([d, e] of this) {
            a.tmp = e, b += (c ? "" : ",") + n(d) + ":" + x("tmp", a), c = !1;
          }
          return b += "}";
        }
        C && (U.cb = d, Y.cb = K, C = !1);
        U.cb = d;
        var h, r = y;
        let F = u.length;
        var l = g[a], w = void 0 !== l && null !== l && (b.get(Object.getPrototypeOf(l)) || q.get(Object.getPrototypeOf(l)) || null);
        var B = !w && void 0 !== l && null !== l && (m.get(Object.keys(l).toString()) || W.get(Object.keys(l).toString()) || null);
        var A = w && w.cb || B && B.cb;
        if (void 0 !== l && null !== l && "function" === typeof A) {
          y += z;
          if ("object" === typeof l && (h = c(l))) {
            return "ref" + h;
          }
          l = A.apply(l);
          y = r;
        } else {
          if ("object" === typeof l && (h = c(l))) {
            return "ref" + h;
          }
        }
        "function" === typeof v && (l = v.call(g, a, l));
        switch(typeof l) {
          case "string":
          case "number":
            var p = "";
            "" === a && (p = e.map((a) => a.name + "{" + a.fields.join(",") + "}").join(y ? "\n" : "") + (y ? "\n" : ""));
            return w && w.external ? p + w.name + l : B && B.external ? p + B.name + l : p + l;
          case "boolean":
          case "null":
            return String(l);
          case "object":
            if (h) {
              return "ref" + h;
            }
            if (!l) {
              return "null";
            }
            y += z;
            B = null;
            g = [];
            if (v && "object" === typeof v) {
              var G = v.length;
              B = k(l, v);
              for (A = 0; A < G; A += 1) {
                "string" === typeof v[A] && (p = v[A], u[F] = p, (h = x(p, l)) && (B ? g.push(h) : g.push(n(p) + (y ? ": " : ":") + h)));
              }
            } else {
              B = k(l);
              A = [];
              for (p in l) {
                if (Object.prototype.hasOwnProperty.call(l, p)) {
                  for (G = 0; G < A.length; G++) {
                    if (A[G] > p) {
                      A.splice(G, 0, p);
                      break;
                    }
                  }
                  G == A.length && A.push(p);
                }
              }
              for (G = 0; G < A.length; G++) {
                p = A[G], Object.prototype.hasOwnProperty.call(l, p) && (u[F] = p, (h = x(p, l)) && (B ? g.push(h) : g.push(n(p) + (y ? ": " : ":") + h)));
              }
            }
            u.splice(F, 1);
            l = "" === a ? e.map((a) => a.name + "{" + a.fields.join(",") + "}").join(y ? "\n" : "") + (y ? "\n" : "") : "";
            w && w.external && (l = "" === a ? l + w.name : l + '"' + w.name + '"');
            a = null;
            B && (a = n(B.name));
            h = l + (0 === g.length ? "{}" : y ? (B ? a : "") + "{\n" + y + g.join(",\n" + y) + "\n" + r + "}" : (B ? a : "") + "{" + g.join(",") + "}");
            y = r;
            return h;
        }
      }
      if (void 0 === a) {
        return "undefined";
      }
      if (null !== a) {
        var C = !0, y, v;
        var r = typeof F;
        var J = typeof K;
        var z = y = "";
        if ("number" === r) {
          for (r = 0; r < F; r += 1) {
            z += " ";
          }
        } else {
          "string" === r && (z = F);
        }
        if ((v = K) && "function" !== J && ("object" !== J || "number" !== typeof K.length)) {
          throw Error("JSOX.stringify");
        }
        u = [];
        h = new WeakMap;
        return x("", {"":a});
      }
    }
    var e = [], g = '"', h = new WeakMap, u = [], b = new WeakMap, m = new Map;
    return {defineClass(a, b) {
      e.push(a = {name:a, tag:Object.keys(b).toString(), proto:Object.getPrototypeOf(b), fields:Object.keys(b)});
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
      g = a;
    }, registerToJSOX(a, c, e) {
      if (c.prototype && c.prototype !== Object.prototype) {
        if (b.get(c)) {
          throw Error("Existing toJSOX has been registered for prototype");
        }
        b.set(c, {external:!0, name:a || e.constructor.name, cb:e});
      } else {
        c = Object.keys(c).toString();
        if (m.get(c)) {
          throw Error("Existing toJSOX has been registered for object type");
        }
        m.set(c, {external:!0, name:a, cb:e});
      }
    }};
  };
  const v = {"~":-1, "=":-1, $:62, _:63, "+":62, "-":62, ".":62, "/":63, ",":63};
  for (var P = 0; 256 > P; P++) {
    64 > P && (v["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[P]] = P);
  }
  Object.freeze(v);
  JSOX.stringify = function(c, k, a) {
    return JSOX.stringifier().stringify(c, k, a);
  };
  [[0, 384, [16767487, 16739071, 130048, 3670016, 0, 16777208, 16777215, 8388607, 8388608, 0, 128, 0, 0, 0, 0, 0]]].map((c) => ({firstChar:c[0], lastChar:c[1], bits:c[2]}));
}
privateizeEverything();


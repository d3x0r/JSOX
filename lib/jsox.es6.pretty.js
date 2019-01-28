'use strict';
var JSOX = {}, exports = exports || {};
exports.JSOX = JSOX;
function privateizeEverything() {
  function la() {
    var c = Z.pop();
    c || (c = {context:0, current_class:null, current_class_field:0, arrayType:-1, elements:null, element_array:null});
    return c;
  }
  function ra() {
    var c = ma.pop();
    c ? c.n = 0 : c = {buf:null, n:0};
    return c;
  }
  function A(c) {
    var g = "";
    c = new Uint8Array(c);
    var a = c.byteLength, n = a % 3;
    a -= n;
    for (var m, k, p, b, d = 0; d < a; d += 3) {
      b = c[d] << 16 | c[d + 1] << 8 | c[d + 2], m = (b & 16515072) >> 18, k = (b & 258048) >> 12, p = (b & 4032) >> 6, b &= 63, g += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[m] + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[k] + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[p] + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[b];
    }
    1 == n ? (b = c[a], m = (b & 252) >> 2, k = (b & 3) << 4, g += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[m] + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[k] + "==") : 2 == n && (b = c[a] << 8 | c[a + 1], m = (b & 64512) >> 10, k = (b & 1008) >> 4, p = (b & 15) << 2, g += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[m] + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[k] + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[p] + 
    "=");
    return g;
  }
  function sa(c) {
    var g = new ArrayBuffer(3 * (c.length + 3 >> 2 | 0) - (("=" === c[c.length - 1] ? 1 : 0) + ("=" === c[c.length - 2] ? 1 : 0))), a = new Uint8Array(g), n, m = c.length + 3 >> 2;
    for (n = 0; n < m; n++) {
      var k = H[c[4 * n + 1]], p = H[c[4 * n + 2]], b = H[c[4 * n + 3]];
      a[3 * n] = H[c[4 * n]] << 2 | k >> 4;
      0 <= p && (a[3 * n + 1] = k << 4 | p >> 2 & 15);
      0 <= b && (a[3 * n + 2] = p << 6 | b & 63);
    }
    return g;
  }
  const na = "function" === typeof BigInt, ta = "ab u8 cu8 s8 u16 s16 u32 s32 u64 s64 f32 f64".split(" "), ua = [ArrayBuffer, Uint8Array, Uint8ClampedArray, Int8Array, Uint16Array, Int16Array, Uint32Array, Int32Array, null, null, Float32Array, Float64Array], S = {["true"]:!0, ["false"]:!1, ["null"]:null, ["NaN"]:NaN, ["Infinity"]:Infinity, ["undefined"]:void 0}, Z = [], ma = [];
  JSOX.escape = function(c) {
    var g, a = "";
    if (!c) {
      return c;
    }
    for (g = 0; g < c.length; g++) {
      if ('"' == c[g] || "\\" == c[g] || "`" == c[g] || "'" == c[g]) {
        a += "\\";
      }
      a += c[g];
    }
    return a;
  };
  var p = new WeakMap, V = new Map, Q = new Map;
  JSOX.begin = function(c, g) {
    const a = {name:null, value_type:0, string:"", contains:null, className:null}, n = {line:1, col:1};
    let m = 0, k;
    var p = new Map, b = 0, d = !0, l = !1, I = null, T = null, q = void 0, v = [], C = {first:null, last:null, saved:null, push(a) {
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
    }, length:0}, A = [], ia = {}, r = null, K = 0, L = -1, h = 0, e = 0, W = !1, y = !1, w = !1, x = !1, u = !1, z = {first:null, last:null, saved:null, push(a) {
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
    }}, ja = null, X = !1, Y = !1, E = !1, H = !1, J = !1, R = !1, aa = !1, B = 0, M = 0, ba = !1, F = !1, N = !1, ca = !1;
    return {registerFromJSOX(a, b) {
      if (p.get(a)) {
        throw Error("Existing fromJSOX has been registered for prototype");
      }
      p.set(a, b);
    }, value() {
      var a = I;
      I = void 0;
      return a;
    }, reset() {
      b = 0;
      d = !0;
      z.last && (z.last.next = z.save);
      z.save = z.first;
      z.first = z.last = null;
      C.last && (C.last.next = C.save);
      C.save = z.first;
      v = C.first = C.last = null;
      q = void 0;
      h = 0;
      A = [];
      ia = {};
      r = null;
      K = 0;
      a.value_type = 0;
      a.name = null;
      a.string = "";
      a.className = null;
      n.line = 1;
      n.col = 1;
      l = !1;
      e = 0;
      H = E = X = F = !1;
    }, usePrototype(a, b) {
      ia[a] = b;
    }, write(a) {
      "string" !== typeof a && (a = String(a));
      for (a = this._write(a, !1); 0 < a && !(I && ("function" === typeof g && function va(a, b) {
        var c, d = a[b];
        if (d && "object" === typeof d) {
          for (c in d) {
            if (Object.prototype.hasOwnProperty.call(d, c)) {
              var e = va(d, c);
              void 0 !== e ? d[c] = e : delete d[c];
            }
          }
        }
        return g.call(a, b, d);
      }({"":I}, ""), c(I), I = void 0), 2 > a); a = this._write()) {
      }
    }, _write(c, g) {
      function t(a, b) {
        throw Error(`${a} '${String.fromCodePoint(b)}' unexpected at ${m} (near '${G.substr(4 < m ? m - 4 : 0, 4 < m ? 3 : m - 1)}[${String.fromCodePoint(b)}]${G.substr(m, 10)}') [${n.line}:${n.col}]`);
      }
      function P() {
        a.value_type = 0;
        a.string = "";
      }
      function ha(a) {
        if (ca) {
          if (na) {
            return BigInt(a);
          }
          throw Error("no builtin BigInt()", 0);
        }
        return N ? new Date(a) : 1 < a.length && !W && !y && !w && 48 === a.charCodeAt(0) ? (l ? -1 : 1) * Number("0o" + a) : (l ? -1 : 1) * Number(a);
      }
      function S() {
        var b = null;
        switch(a.value_type) {
          case 5:
            if (ca) {
              if (na) {
                return BigInt(a.string);
              }
              throw Error("no builtin BigInt()", 0);
            }
            return N ? new Date(a.string) : ha(a.string);
          case 4:
            return a.className && ((b = p.get(a.className)) || (b = Q.get(a.className)), a.className = null, b) ? b.call(a.string) : a.string;
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
            return a.className && ((b = p.get(a.className)) || (b = Q.get(a.className)), a.className = null, b) ? b.call(a.contains) : a.contains;
          case 13:
            if (0 <= L) {
              return b = sa(a.contains[0]), 0 === L ? b : new ua[L](b);
            }
            if (-2 === L) {
              var c = T;
              a.contains.forEach((a) => c = c[a]);
              return c;
            }
            return a.className && ((b = p.get(a.className)) || (b = Q.get(a.className)), a.className = null, b) ? b.call(a.contains) : a.contains;
          default:
            console.log("Unhandled value conversion.", a);
        }
      }
      function V() {
        switch(a.value_type) {
          case 12:
            v.push(void 0);
            delete v[v.length - 1];
            break;
          default:
            v.push(S());
        }
        P();
      }
      function da() {
        12 !== a.value_type && (q[a.name] = S(), P());
      }
      function D(c) {
        if (0 !== b) {
          switch(l && (valstring += "-", l = !1), b) {
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
        123 == c ? oa() : 91 == c ? fa() : 32 != c && 13 != c && 10 != c && 9 != c && 65279 != c && 2028 != c && 2029 != c && (44 == c || 125 == c || 93 == c || 58 == c ? t("Invalid character near identifier", c) : a.string += k);
      }
      function U(b) {
        let c = 0;
        for (; 0 == c && m < G.length;) {
          k = G.charAt(m);
          let d = G.codePointAt(m++);
          65536 <= d && (k += G.charAt(m), m++);
          n.col++;
          if (d == b) {
            E ? (a.string += k, E = !1) : (ba ? t("Incomplete Octal sequence", d) : aa ? t("Incomplete hexidecimal sequence", d) : R ? t("Incomplete unicode sequence", d) : J && t("Incomplete long unicode sequence", d), c = 1);
          } else {
            if (E) {
              if (ba) {
                if (3 > M && 48 <= d && 57 >= d) {
                  B *= 8, B += d - 48, M++, 3 === M && (a.string += String.fromCodePoint(B), E = ba = !1);
                } else {
                  if (255 < B) {
                    t("(escaped character, parsing octal escape val=%d) fault while parsing", d);
                    c = -1;
                    break;
                  }
                  a.string += String.fromCodePoint(B);
                  E = ba = !1;
                }
              } else {
                if (J) {
                  125 == d ? (a.string += String.fromCodePoint(B), E = R = J = !1) : (B *= 16, 48 <= d && 57 >= d ? B += d - 48 : 65 <= d && 70 >= d ? B += d - 65 + 10 : 97 <= d && 102 >= d ? B += d - 97 + 10 : (t("(escaped character, parsing hex of \\u)", d), c = -1, E = J = !1));
                } else {
                  if (aa || R) {
                    if (0 === M && 123 === d) {
                      J = !0;
                      continue;
                    }
                    if (2 > M || R && 4 > M) {
                      B *= 16;
                      if (48 <= d && 57 >= d) {
                        B += d - 48;
                      } else {
                        if (65 <= d && 70 >= d) {
                          B += d - 65 + 10;
                        } else {
                          if (97 <= d && 102 >= d) {
                            B += d - 97 + 10;
                          } else {
                            t(R ? "(escaped character, parsing hex of \\u)" : "(escaped character, parsing hex of \\x)", d);
                            c = -1;
                            E = aa = !1;
                            continue;
                          }
                        }
                      }
                      M++;
                      R ? 4 == M && (a.string += String.fromCodePoint(B), E = R = !1) : 2 == M && (a.string += String.fromCodePoint(B), E = aa = !1);
                      continue;
                    }
                  }
                  switch(d) {
                    case 13:
                      H = !0;
                      n.col = 1;
                      continue;
                    case 10:
                    case 2028:
                    case 2029:
                      n.line++;
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
                      ba = !0;
                      B = d - 48;
                      M = 1;
                      continue;
                    case 120:
                      aa = !0;
                      B = M = 0;
                      continue;
                    case 117:
                      R = !0;
                      B = M = 0;
                      continue;
                    default:
                      a.string += k;
                  }
                  E = !1;
                }
              }
            } else {
              92 === d ? E ? (a.string += "\\", E = !1) : E = !0 : H ? (H = !1, 10 == d ? (n.line++, n.col = 1, E = !1) : (n.line++, n.col = 1)) : a.string += k;
            }
          }
        }
        return c;
      }
      function ka() {
        let b;
        for (; (b = m) < G.length;) {
          k = G.charAt(b);
          let c = G.codePointAt(m++);
          65536 <= c && (t("fault while parsing number;", c), k += G.charAt(m), m++);
          if (95 != c) {
            if (n.col++, 48 <= c && 57 >= c) {
              w && (u = !0), a.string += k;
            } else {
              if (45 == c || 43 == c) {
                0 == a.string.length || w && !x && !u ? (a.string += k, x = !0) : (a.string += k, N = !0);
              } else {
                if (58 == c && N) {
                  a.string += k, N = !0;
                } else {
                  if (84 == c && N) {
                    a.string += k, N = !0;
                  } else {
                    if (90 == c && N) {
                      a.string += k, N = !0;
                    } else {
                      if (46 == c) {
                        if (y || W || w) {
                          d = !1;
                          t("fault while parsing number;", c);
                          break;
                        } else {
                          a.string += k, y = !0;
                        }
                      } else {
                        if (110 == c) {
                          ca = !0;
                          break;
                        } else {
                          if (120 == c || 98 == c || 111 == c || 88 == c || 66 == c || 79 == c) {
                            if (W || "0" != a.string) {
                              d = !1;
                              t("fault while parsing number;", c);
                              break;
                            } else {
                              W = !0, a.string += k;
                            }
                          } else {
                            if (101 == c || 69 == c) {
                              if (w) {
                                d = !1;
                                t("fault while parsing number;", c);
                                break;
                              } else {
                                a.string += k, w = !0;
                              }
                            } else {
                              32 == c || 13 == c || 10 == c || 9 == c || 65279 == c || 44 == c || 125 == c || 93 == c || 58 == c ? m = b : g && (d = !1, t("fault while parsing number;", c));
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
        g || m != G.length ? (Y = !1, a.value_type = 5, 0 == h && (F = !0)) : Y = !0;
      }
      function oa() {
        let c, e = null, l = {};
        0 < b && 29 > b && D();
        if (0 == h) {
          29 == b && a.string.length ? (p.get(a.string) ? a.className = a.string : Q.get(a.string) && (a.className = a.string), (e = A.find((b) => b.name === a.string)) ? (l = Object.assign(l, e.protoObject), Object.setPrototypeOf(l, Object.getPrototypeOf(e.protoObject)), c = 6) : (A.push(e = {name:a.string, protoObject:ia[a.string] || Object.create({}), fields:[]}), c = 5), b = 0) : (c = 3, b = 29);
        } else {
          if (29 == b || 1 === h || 4 === h) {
            0 != b ? (p.get(a.string) ? a.className = a.string : Q.get(a.string) && (a.className = a.string), (e = A.find((b) => b.name === a.string)) || t("Referenced class " + a.string + " has not been defined", f), l = Object.assign(l, e.protoObject), Object.setPrototypeOf(l, Object.getPrototypeOf(e.protoObject)), c = 6) : c = 3, b = 0;
          } else {
            if (3 == h && 0 == b) {
              return t("fault while parsing; getting field name unexpected ", f), d = !1;
            }
            c = 3;
          }
        }
        {
          let b = la();
          a.value_type = 6;
          0 == h ? I = q = l : 4 == h && (q[a.name] = l);
          b.context = h;
          b.elements = q;
          b.element_array = v;
          b.name = a.name;
          b.current_class = r;
          b.current_class_field = K;
          b.arrayType = L;
          b.className = a.className;
          a.className = null;
          r = e;
          K = 0;
          q = l;
          T || (T = q);
          C.push(b);
          P();
          h = c;
        }
        return !0;
      }
      function fa() {
        0 < b && 29 > b && D();
        if (29 == b && a.string.length) {
          var c = ta.findIndex((b) => b === a.string);
          0 <= c ? (b = 0, L = c) : "ref" === a.string ? L = -2 : p.get(a.string) ? a.className = a.string : Q.get(a.string) ? a.className = a.string : t("Unknown type specified for array:" + a.string, f);
        } else {
          if (3 == h || 29 == b || 30 == b) {
            return t("Fault while parsing; while getting field name unexpected", f), d = !1;
          }
        }
        {
          c = la();
          a.value_type = 13;
          let b = [];
          0 == h ? I = v = b : 4 == h && (q[a.name] = b);
          c.context = h;
          c.elements = q;
          c.element_array = v;
          c.name = a.name;
          c.current_class = r;
          c.current_class_field = K;
          c.arrayType = L;
          c.className = a.className;
          r = a.className = null;
          K = 0;
          v = b;
          T || (T = v);
          C.push(c);
          P();
          h = 1;
        }
        return !0;
      }
      var ea = 0;
      if (!d) {
        return -1;
      }
      if (c && c.length) {
        var O = ra();
        O.buf = c;
        z.push(O);
      } else {
        Y && (Y = !1, a.value_type = 5, 0 == h && (F = !0), ea = 1);
      }
      for (; d && (O = z.shift());) {
        m = O.n;
        var G = O.buf;
        X && (c = U(ja), 0 > c ? d = !1 : 0 < c && (X = !1, d && (a.value_type = 4)));
        for (Y && ka(); !F && d && m < G.length;) {
          k = G.charAt(m);
          var f = G.codePointAt(m++);
          65536 <= f && (k += G.charAt(m), m++);
          n.col++;
          if (e) {
            if (1 == e) {
              if (42 == f) {
                e = 3;
                continue;
              }
              47 != f ? (t("fault while parsing;", f), d = !1) : e = 2;
              continue;
            }
            if (2 == e) {
              10 == f && (e = 0);
              continue;
            }
            if (3 == e) {
              42 == f && (e = 4);
              continue;
            }
            if (4 == e) {
              47 == f ? e = 0 : 42 != f && (e = 3);
              continue;
            }
          }
          switch(f) {
            case 47:
              e || (e = 1);
              break;
            case 123:
              oa();
              break;
            case 91:
              fa();
              break;
            case 58:
              3 == h ? 0 != b && 29 != b && 30 != b ? (d = FALSE, thorwError(`fault while parsing; unquoted keyword used as object field name (state:${b})`, f)) : (b = 0, a.name = a.string, a.string = "", h = 4, a.value_type = 0) : (1 == h ? t("(in array, got colon out of string):parsing fault;", f) : t("(outside any object, got colon out of string):parsing fault;", f), d = !1);
              break;
            case 125:
              b = 0;
              5 == h ? r ? (a.string && (r.protoObject[a.string] = void 0, r.fields.push(a.string)), P(), c = C.pop(), b = h = 0, a.name = c.name, q = c.elements, v = c.element_array, r = c.current_class, K = c.current_class_field, L = c.arrayType, a.className = c.className, T = null, Z.push(c)) : t("State error; gathering class fields, and lost the class", f) : 3 == h || 6 == h ? (0 != a.value_type && (a.name = r.fields[K++], da()), a.value_type = 6, a.contains = q, a.string = "", c = C.pop(), h = 
              c.context, a.name = c.name, q = c.elements, v = c.element_array, r = c.current_class, K = c.current_class_field, L = c.arrayType, a.className = c.className, Z.push(c), 0 == h && (F = !0)) : 4 == h ? (0 != a.value_type && da(), a.value_type = 6, a.contains = q, c = C.pop(), a.name = c.name, h = c.context, a.name = c.name, q = c.elements, r = c.current_class, K = c.current_class_field, L = c.arrayType, a.className = c.className, v = c.element_array, Z.push(c), 0 == h && (F = !0)) : (t("Fault while parsing; unexpected", 
              f), d = !1);
              l = !1;
              break;
            case 93:
              31 == b && (b = 0);
              1 == h ? (0 != a.value_type && V(), a.contains = v, c = C.pop(), a.name = c.name, h = c.context, q = c.elements, r = c.current_class, K = c.current_class_field, L = c.arrayType, a.className = c.className, v = c.element_array, Z.push(c), a.value_type = 13, 0 == h && (F = !0)) : (t(`bad context ${h}; fault while parsing`, f), d = !1);
              l = !1;
              break;
            case 44:
              if (31 == b || 29 == b) {
                b = 0;
              }
              5 == h ? r ? (r.protoObject[a.string] = void 0, r.fields.push(a.string), a.string = "", b = 29) : t("State error; gathering class fields, and lost the class", f) : 3 == h ? r ? (a.name = r.fields[K++], 0 != a.value_type && (da(), P())) : t("State error; gathering class values, and lost the class", f) : 6 == h ? r ? (a.name = r.fields[K++], 0 != a.value_type && (da(), P())) : t("State error; gathering class values, and lost the class", f) : 1 == h ? (0 == a.value_type && (a.value_type = 
              12), 0 != a.value_type && (V(), P())) : 4 == h ? (h = 3, 0 != a.value_type && (da(), P())) : (d = !1, t("bad context; excessive commas while parsing;", f));
              l = !1;
              break;
            default:
              if (0 == h || 4 == h && 29 == b || 3 == h || 5 == h) {
                switch(f) {
                  case 96:
                  case 34:
                  case 39:
                    0 == b || 29 == b ? (a.string.length && (a.className = a.string, a.string = ""), U(f) ? a.value_type = 4 : (ja = f, X = !0)) : t("fault while parsing; quote not at start of field name", f);
                    break;
                  case 10:
                    n.line++, n.col = 1;
                  case 13:
                  case 32:
                  case 9:
                  case 65279:
                    if (31 === b) {
                      b = 0;
                      0 === h && (F = !0);
                      break;
                    }
                    0 === b || 30 === b ? 0 == h && a.value_type && (F = !0) : 29 === b ? 0 === h ? (b = 0, F = !0) : a.string.length && (b = 30) : (d = !1, t("fault while parsing; whitepsace unexpected", f));
                    break;
                  default:
                    0 == b && (48 <= f && 57 >= f || 43 == f || 46 == f || 45 == f) ? (y = u = x = ca = N = w = W = !1, a.string = k, O.n = m, ka()) : (30 === b && (d = !1, t("fault while parsing; character unexpected", f)), 0 === b && (b = 29, a.value_type = 4), a.string += k);
                }
              } else {
                switch(f) {
                  case 96:
                  case 34:
                  case 39:
                    U(f) ? (a.value_type = 4, b = 31) : (ja = f, X = !0);
                    break;
                  case 10:
                    n.line++, n.col = 1;
                  case 32:
                  case 9:
                  case 13:
                  case 2028:
                  case 2029:
                  case 65279:
                    if (31 == b) {
                      b = 0;
                      0 == h && (F = !0);
                      break;
                    }
                    0 != b && 30 != b && (29 == b ? a.string.length && (b = 30) : (d = !1, t("fault parsing whitespace", f)));
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
                    0 == b ? b = 20 : 21 == b ? (a.value_type = l ? 7 : 8, l = !1, b = 31) : D(f);
                    break;
                  case 121:
                    28 == b ? (a.value_type = l ? 9 : 10, l = !1, b = 31) : D(f);
                    break;
                  case 45:
                    0 == b ? l = !l : D(f);
                    break;
                  default:
                    0 == b && (48 <= f && 57 >= f || 43 == f || 46 == f || 45 == f) ? (y = u = x = ca = N = w = W = !1, a.string = k, O.n = m, ka()) : D(f);
                }
              }
          }
          if (F) {
            31 == b && (b = 0);
            break;
          }
        }
        m == G.length ? (ma.push(O), X || Y || 3 == h ? ea = 0 : 0 != h || 0 == a.value_type && !I || (F = !0, ea = 1)) : (O.n = m, z.unshift(O), ea = 2);
        if (F) {
          T = null;
          break;
        }
      }
      if (!d) {
        return -1;
      }
      F && 0 != a.value_type && (I = S(), l = !1, a.string = "", a.value_type = 0);
      F = !1;
      return ea;
    }};
  };
  const U = [Object.freeze(JSOX.begin())];
  var fa = 0;
  JSOX.parse = function(c, g) {
    var a = fa++;
    U.length <= a && U.push(Object.freeze(JSOX.begin()));
    a = U[a];
    "string" !== typeof c && (c = String(c));
    a.reset();
    if (0 < a._write(c, !0)) {
      return c = a.value(), "function" === typeof g && function ha(a, c) {
        var b, d = a[c];
        if (d && "object" === typeof d) {
          for (b in d) {
            if (Object.prototype.hasOwnProperty.call(d, b)) {
              var l = ha(d, b);
              void 0 !== l ? d[b] = l : delete d[b];
            }
          }
        }
        return g.call(a, c, d);
      }({"":c}, ""), fa--, c;
    }
  };
  var pa = function() {
    return this && this.valueOf();
  };
  p.set(Object.prototype, {external:!1, name:Object.prototype.constructor.name, cb:null});
  p.set(Date.prototype, {external:!1, name:"Date", cb:function() {
    var c = -this.getTimezoneOffset(), g = 0 <= c ? "+" : "-", a = function(a) {
      a = Math.floor(Math.abs(a));
      return (10 > a ? "0" : "") + a;
    };
    return [this.getFullYear(), "-", a(this.getMonth() + 1), "-", a(this.getDate()), "T", a(this.getHours()), ":", a(this.getMinutes()), ":", a(this.getSeconds()), g, a(c / 60), ":", a(c % 60)].join("");
  }});
  p.set(Boolean.prototype, {external:!1, name:"Boolean", cb:pa});
  p.set(Number.prototype, {external:!1, name:"Number", cb:function() {
    return isNaN(this) ? "NaN" : isFinite(this) ? String(this) : 0 > this ? "-Infinity" : "Infinity";
  }});
  p.set(String.prototype, {external:!1, name:"String", cb:function() {
    return '"' + JSOX.escape(pa.apply(this)) + '"';
  }});
  "function" === typeof BigInt && p.set(BigInt.prototype, {external:!1, name:"BigInt", cb:function() {
    return this + "n";
  }});
  p.set(ArrayBuffer.prototype, {external:!0, name:"ab", cb:function() {
    return "[" + A(this) + "]";
  }});
  p.set(Uint8Array.prototype, {external:!0, name:"u8", cb:function() {
    return "[" + A(this.buffer) + "]";
  }});
  p.set(Uint8ClampedArray.prototype, {external:!0, name:"uc8", cb:function() {
    return "[" + A(this.buffer) + "]";
  }});
  p.set(Int8Array.prototype, {external:!0, name:"s8", cb:function() {
    return "[" + A(this.buffer) + "]";
  }});
  p.set(Uint16Array.prototype, {external:!0, name:"u16", cb:function() {
    return "[" + A(this.buffer) + "]";
  }});
  p.set(Int16Array.prototype, {external:!0, name:"s16", cb:function() {
    return "[" + A(this.buffer) + "]";
  }});
  p.set(Uint32Array.prototype, {external:!0, name:"u32", cb:function() {
    return "[" + A(this.buffer) + "]";
  }});
  p.set(Int32Array.prototype, {external:!0, name:"s32", cb:function() {
    return "[" + A(this.buffer) + "]";
  }});
  "undefined" != typeof Uint64Array && p.set(Uint64Array.prototype, {external:!0, name:"u64", cb:function() {
    return "[" + A(this.buffer) + "]";
  }});
  "undefined" != typeof Int64Array && p.set(Int64Array.prototype, {external:!0, name:"s64", cb:function() {
    return "[" + A(this.buffer) + "]";
  }});
  p.set(Float32Array.prototype, {external:!0, name:"f32", cb:function() {
    return "[" + A(this.buffer) + "]";
  }});
  p.set(Float64Array.prototype, {external:!0, name:"f64", cb:function() {
    return "[" + A(this.buffer) + "]";
  }});
  JSOX.registerToJSOX = function(c, g, a) {
    if (g.prototype && g.prototype !== Object.prototype) {
      if (p.get(g)) {
        throw Error("Existing toJSOX has been registered for prototype");
      }
      console.log("PUSH PROTOTYPE");
      p.set(g, {external:!0, name:c || a.constructor.name, cb:a});
    } else {
      g = Object.keys(g).toString();
      if (V.get(g)) {
        throw Error("Existing toJSOX has been registered for object type");
      }
      V.set(g, {external:!0, name:c, cb:a});
    }
  };
  JSOX.registerFromJSOX = function(c, g) {
    if (Q.get(c)) {
      throw Error("Existing fromJSOX has been registered for prototype");
    }
    Q.set(c, g);
  };
  JSOX.registerToFrom = function(c, g, a, n) {
    JSOX.registerToJSOX(c, g, a);
    JSOX.registerFromJSOX(c, n);
  };
  var qa;
  JSOX.stringifier = function() {
    function c(b, c) {
      var d, l = Object.getPrototypeOf(b);
      if (d = a.find((a) => {
        if (a.proto && a.proto === l) {
          return !0;
        }
      })) {
        return d;
      }
      if (c) {
        c = c.map((a) => {
          if ("string" === typeof a) {
            return a;
          }
        });
        var k = c.toString();
      } else {
        k = Object.keys(b).toString();
      }
      return d = a.find((a) => {
        if (a.tag === k) {
          return !0;
        }
      });
    }
    function g(d, l, g) {
      function I(d, l) {
        qa.cb = function() {
          var a = [];
          let b = k.length;
          for (let c = 0; c < this.length; c += 1) {
            k[b] = c, a[c] = I(c, this) || "null";
          }
          k.splice(b, 1);
          return 0 === a.length ? "[]" : q ? ["[\n", q, a.join(",\n" + q), "\n", g, "]"].join("") : "[" + a.join(",") + "]";
        };
        var g = q;
        let h = k.length;
        var e = l[d], r = void 0 !== e && null !== e && (A.get(Object.getPrototypeOf(e)) || p.get(Object.getPrototypeOf(e)) || null);
        var y = !r && void 0 !== e && null !== e && (b.get(Object.keys(e).toString()) || V.get(Object.keys(e).toString()) || null);
        var w = r && r.cb || y && y.cb;
        if (void 0 !== e && null !== e && "function" === typeof w) {
          q += H;
          if ("object" === typeof e) {
            if (null === e) {
              var x = void 0;
            } else {
              x = m.get(e), x || (m.set(e, JSON.stringify(k)), x = void 0);
            }
            if (x) {
              return "ref" + x;
            }
          }
          e = w.apply(e);
          q = g;
        } else {
          "object" === typeof e && (null === e ? x = void 0 : (x = m.get(e), x || (m.set(e, k.length ? JSON.stringify(k) : "[]"), x = void 0)));
        }
        "function" === typeof v && (e = v.call(l, d, e));
        switch(typeof e) {
          case "string":
          case "number":
            var u = "";
            "" === d && (u = a.map((a) => a.name + "{" + a.fields.join(",") + "}").join(q ? "\n" : "") + (q ? "\n" : ""));
            return r && r.external ? u + r.name + e : y && y.external ? u + y.name + e : u + e;
          case "boolean":
          case "null":
            return String(e);
          case "object":
            if (x) {
              return "ref" + x;
            }
            if (!e) {
              return "null";
            }
            q += H;
            y = null;
            l = [];
            if (v && "object" === typeof v) {
              var z = v.length;
              y = c(e, v);
              for (w = 0; w < z; w += 1) {
                "string" === typeof v[w] && (u = v[w], k[h] = u, (x = I(u, e)) && (y ? l.push(x) : l.push((u in S || /((\n|\r|\t)|s|S|[ \{\}\(\)<>!\+\-\*\/\.:, ])/.test(u) ? n + JSOX.escape(u) + n : u) + (q ? ": " : ":") + x)));
              }
            } else {
              y = c(e);
              w = [];
              for (u in e) {
                if (Object.prototype.hasOwnProperty.call(e, u)) {
                  for (z = 0; z < w.length; z++) {
                    if (w[z] > u) {
                      w.splice(z, 0, u);
                      break;
                    }
                  }
                  z == w.length && w.push(u);
                }
              }
              for (z = 0; z < w.length; z++) {
                u = w[z], Object.prototype.hasOwnProperty.call(e, u) && (k[h] = u, (x = I(u, e)) && (y ? l.push(x) : l.push((u in S || /((\n|\r|\t)|s|S|[ \{\}\(\)<>!\+\-\*\/\.:, ])/.test(u) ? n + JSOX.escape(u) + n : u) + (q ? ": " : ":") + x)));
              }
            }
            k.splice(h, 1);
            e = "" === d ? a.map((a) => a.name + "{" + a.fields.join(",") + "}").join(q ? "\n" : "") + (q ? "\n" : "") : "";
            r && r.external && (e = "" === d ? e + r.name : e + '"' + r.name + '"');
            d = null;
            y && (d = y.name in S || /((\n|\r|\t)|s|S|[ \{\}\(\)<>!\+\-\*\/\.:, ])/.test(y.name) ? n + JSOX.escape(y.name) + n : y.name);
            x = e + (0 === l.length ? "{}" : q ? (y ? d : "") + "{\n" + q + l.join(",\n" + q) + "\n" + g + "}" : (y ? d : "") + "{" + l.join(",") + "}");
            q = g;
            return x;
        }
      }
      if (void 0 === d) {
        return "undefined";
      }
      if (null !== d) {
        var q, v;
        var C = typeof g;
        var J = typeof l;
        var H = q = "";
        if ("number" === C) {
          for (C = 0; C < g; C += 1) {
            H += " ";
          }
        } else {
          "string" === C && (H = g);
        }
        if ((v = l) && "function" !== J && ("object" !== J || "number" !== typeof l.length)) {
          throw Error("JSOX.stringify");
        }
        k = [];
        m = new WeakMap;
        m.set(k, "~INTERNAL~PATH~");
        return I("", {"":d});
      }
    }
    var a = [], n = '"', m = new WeakMap, k = [], A = new WeakMap, b = new Map;
    p.get(Array.prototype) || p.set(Array.prototype, qa = {external:!1, name:Array.prototype.constructor.name, cb:null});
    return {defineClass(b, c) {
      a.push(b = {name:b, tag:Object.keys(c).toString(), proto:Object.getPrototypeOf(c), fields:Object.keys(c)});
      for (c = 1; c < b.fields.length; c++) {
        if (b.fields[c] < b.fields[c - 1]) {
          let a = b.fields[c - 1];
          b.fields[c - 1] = b.fields[c];
          b.fields[c] = a;
          1 < c && (c -= 2);
        }
      }
      b.proto === Object.getPrototypeOf({}) && (b.proto = null);
    }, stringify(a, b, c) {
      return g(a, b, c);
    }, setQuote(a) {
      n = a;
    }, registerToJSOX(a, c, g) {
      if (c.prototype && c.prototype !== Object.prototype) {
        if (A.get(c)) {
          throw Error("Existing toJSOX has been registered for prototype");
        }
        A.set(c, {external:!0, name:a || g.constructor.name, cb:g});
      } else {
        c = Object.keys(c).toString();
        if (b.get(c)) {
          throw Error("Existing toJSOX has been registered for object type");
        }
        b.set(c, {external:!0, name:a, cb:g});
      }
    }};
  };
  const H = {"=":-1};
  for (var J = 0; 256 > J; J++) {
    64 > J && (H["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[J]] = J);
  }
  JSOX.stringify = function(c, g, a) {
    return JSOX.stringifier().stringify(c, g, a);
  };
  [[0, 384, [16767487, 16739071, 130048, 3670016, 0, 16777208, 16777215, 8388607, 8388608, 0, 128, 0, 0, 0, 0, 0]]].map((c) => ({firstChar:c[0], lastChar:c[1], bits:c[2]}));
}
privateizeEverything();


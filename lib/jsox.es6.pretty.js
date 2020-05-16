'use strict';
var exports = exports || {};
"use strict";
const _JSON = JSON;
var JSOX = exports;
function privateizeEverything() {
  function ma() {
    var c = ca.pop();
    c || (c = {context:0, current_proto:null, current_class:null, current_class_field:0, arrayType:-1, elements:null, element_array:null});
    return c;
  }
  function qa() {
    var c = na.pop();
    c ? c.n = 0 : c = {buf:null, n:0};
    return c;
  }
  function v(c) {
    var f = "";
    c = new Uint8Array(c);
    var a = c.byteLength, h = a % 3;
    a -= h;
    for (var e, k, n, b, m = 0; m < a; m += 3) {
      b = c[m] << 16 | c[m + 1] << 8 | c[m + 2], e = (b & 16515072) >> 18, k = (b & 258048) >> 12, n = (b & 4032) >> 6, b &= 63, f += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[e] + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[k] + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[n] + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[b];
    }
    1 == h ? (b = c[a], e = (b & 252) >> 2, k = (b & 3) << 4, f += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[e] + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[k] + "==") : 2 == h && (b = c[a] << 8 | c[a + 1], e = (b & 64512) >> 10, k = (b & 1008) >> 4, n = (b & 15) << 2, f += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[e] + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[k] + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[n] + 
    "=");
    return f;
  }
  function ra(c) {
    var f = new ArrayBuffer(1 == c.length % 4 ? 3 * ((c.length + 3) / 4 | 0) - 3 : 2 == c.length % 4 ? 3 * ((c.length + 3) / 4 | 0) - 2 : 3 == c.length % 4 ? 3 * ((c.length + 3) / 4 | 0) - 1 : -1 == K[c[c.length - 3]] ? 3 * ((c.length + 3) / 4 | 0) - 3 : -1 == K[c[c.length - 2]] ? 3 * ((c.length + 3) / 4 | 0) - 2 : -1 == K[c[c.length - 1]] ? 3 * ((c.length + 3) / 4 | 0) - 1 : 3 * ((c.length + 3) / 4 | 0)), a = new Uint8Array(f), h, e = c.length + 3 >> 2;
    for (h = 0; h < e; h++) {
      var k = K[c[4 * h]], n = 4 * h + 1 < c.length ? K[c[4 * h + 1]] : -1, b = 0 <= n && 4 * h + 2 < c.length ? K[c[4 * h + 2]] : -1, m = 0 <= b && 4 * h + 3 < c.length ? K[c[4 * h + 3]] : -1;
      0 <= n && (a[3 * h] = k << 2 | n >> 4);
      0 <= b && (a[3 * h + 1] = n << 4 | b >> 2 & 15);
      0 <= m && (a[3 * h + 2] = b << 6 | m & 63);
    }
    return f;
  }
  const sa = "function" === typeof BigInt, ta = "ab u8 cu8 s8 u16 s16 u32 s32 u64 s64 f32 f64".split(" ");
  var Y = null, da = null;
  const ua = [ArrayBuffer, Uint8Array, Uint8ClampedArray, Int8Array, Uint16Array, Int16Array, Uint32Array, Int32Array, null, null, Float32Array, Float64Array], va = {["true"]:!0, ["false"]:!1, ["null"]:null, ["NaN"]:NaN, ["Infinity"]:Infinity, ["undefined"]:void 0}, ca = [], na = [];
  JSOX.escape = function(c) {
    var f, a = "";
    if (!c) {
      return c;
    }
    for (f = 0; f < c.length; f++) {
      if ('"' == c[f] || "\\" == c[f] || "`" == c[f] || "'" == c[f]) {
        a += "\\";
      }
      a += c[f];
    }
    return a;
  };
  var p = new WeakMap, U = new Map, S = new Map;
  JSOX.begin = function(c, f) {
    const a = {name:null, value_type:0, string:"", contains:null, className:null}, h = {line:1, col:1};
    let e = 0, k;
    var n = new Map, b = 0, m = !0, N = !1, q = !1, p = null, V = null, A = void 0, B = [], t = {first:null, last:null, saved:null, push(a) {
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
    }, length:0}, ia = [], H = null, u = null, E = 0, w = -1, d = 0, L = 0, v = !1, ja = !1, W = !1, K = !1, l = !1, O = {first:null, last:null, saved:null, push(a) {
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
    }}, G = null, C = !1, x = !1, y = !1, X = !1, ea = !1, T = !1, fa = !1, F = 0, M = 0, P = !1, I = !1, Q = !1, ka = !1;
    return {fromJSOX(a, b, c) {
      function d() {
      }
      if (n.get(a)) {
        throw Error("Existing fromJSOX has been registered for prototype");
      }
      b || (b = d);
      if (b && !("constructor" in b)) {
        throw Error("Please pass a prototype like thing...");
      }
      n.set(a, {protoCon:b.prototype.constructor, cb:c});
    }, registerFromJSOX(a, b, c) {
      throw Error("registerFromJSOX is deprecated, please update to use fromJSOX instead");
    }, value() {
      var a = p;
      p = void 0;
      return a;
    }, reset() {
      b = 0;
      m = !0;
      O.last && (O.last.next = O.save);
      O.save = O.first;
      O.first = O.last = null;
      t.last && (t.last.next = t.save);
      t.save = O.first;
      B = t.first = t.last = null;
      A = void 0;
      d = 0;
      ia = [];
      u = H = null;
      E = 0;
      a.value_type = 0;
      a.name = null;
      a.string = "";
      a.className = null;
      h.line = 1;
      h.col = 1;
      q = !1;
      L = 0;
      X = y = C = I = !1;
    }, usePrototype(a, b) {
    }, write(a) {
      "string" !== typeof a && (a = String(a));
      for (a = this._write(a, !1); 0 < a && !(p && ("function" === typeof f && function Z(a, b) {
        var c, d = a[b];
        if (d && "object" === typeof d) {
          for (c in d) {
            if (Object.prototype.hasOwnProperty.call(d, c)) {
              var h = Z(d, c);
              void 0 !== h ? d[c] = h : delete d[c];
            }
          }
        }
        return f.call(a, b, d);
      }({"":p}, ""), c(p), p = void 0), 2 > a); a = this._write()) {
      }
    }, _write(c, f) {
      function r(a, b) {
        throw Error(`${a} '${String.fromCodePoint(b)}' unexpected at ${e} (near '${J.substr(4 < e ? e - 4 : 0, 4 < e ? 3 : e - 1)}[${String.fromCodePoint(b)}]${J.substr(e, 10)}') [${h.line}:${h.col}]`);
      }
      function z() {
        a.value_type = 0;
        a.string = "";
        a.contains = null;
      }
      function Z() {
        var b = null;
        switch(a.value_type) {
          case 5:
            if (ka) {
              if (sa) {
                return BigInt(a.string);
              }
              throw Error("no builtin BigInt()", 0);
            }
            return Q ? new Date(a.string) : (q ? -1 : 1) * Number(a.string);
          case 4:
            return a.className && ((b = n.get(a.className)) || (b = S.get(a.className)), a.className = null, b && b.cb) ? b.cb.call(a.string) : a.string;
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
            return a.className && ((b = n.get(a.className)) || (b = S.get(a.className)), a.className = null, b && b.cb) ? a.contains = b.cb.call(a.contains) : a.contains;
          case 13:
            if (0 <= w) {
              return b = ra(a.contains[0]), 0 === w ? b : new ua[w](b);
            }
            if (-2 === w) {
              b = V;
              b = a.contains.reduce((a, b) => Object.getPrototypeOf(a) === Map.prototype ? a.get(b) : a && a[b], b);
              if (!b) {
                throw Error("Path did not resolve poperly.");
              }
              return b;
            }
            return a.className && ((b = n.get(a.className)) || (b = S.get(a.className)), a.className = null, b && b.cb) ? b.cb.call(a.contains) : a.contains;
          default:
            console.log("Unhandled value conversion.", a);
        }
      }
      function Y() {
        if (-3 == w) {
          6 === a.value_type && (B[B.length - 1] = a.contains), w = -1;
        } else {
          switch(a.value_type) {
            case 12:
              B.push(void 0);
              delete B[B.length - 1];
              break;
            default:
              B.push(Z());
          }
          z();
        }
      }
      function aa() {
        -3 === w ? (A[a.name] = Z(), w = -1) : 12 !== a.value_type && (!a.name && u && (a.name = u.fields[E++]), A[a.name] = Z(), z());
      }
      function D(c) {
        if (0 !== b) {
          q && (valstring += "-", q = !1);
          switch(b) {
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
                case 0:
                  break;
                default:
                  console.log("Value of type " + a.value_type + " is not restored...");
              }break;
            case 1:
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
          a.value_type = 4;
          b = 31;
        } else {
          b = 31, 0 === a.value_type && a.string.length && (a.value_type = 4);
        }
        123 == c ? ba() : 91 == c ? da() : 44 != c && 32 != c && 13 != c && 10 != c && 9 != c && 65279 != c && 2028 != c && 2029 != c && (44 == c || 125 == c || 93 == c || 58 == c ? r("Invalid character near identifier", c) : "number" === typeof c && (a.string += k));
      }
      function U(b) {
        let c = 0;
        for (; 0 == c && e < J.length;) {
          k = J.charAt(e);
          let d = J.codePointAt(e++);
          65536 <= d && (k += J.charAt(e), e++);
          h.col++;
          if (d == b) {
            y ? (a.string += k, y = X = !1) : (P ? r("Incomplete Octal sequence", d) : fa ? r("Incomplete hexidecimal sequence", d) : T ? r("Incomplete unicode sequence", d) : ea && r("Incomplete long unicode sequence", d), c = 1);
          } else {
            if (y) {
              if (P) {
                if (3 > M && 48 <= d && 57 >= d) {
                  F *= 8, F += d - 48, M++, 3 === M && (a.string += String.fromCodePoint(F), y = P = !1);
                } else {
                  if (255 < F) {
                    r("(escaped character, parsing octal escape val=%d) fault while parsing", d);
                    c = -1;
                    break;
                  }
                  a.string += String.fromCodePoint(F);
                  y = P = !1;
                }
              } else {
                if (ea) {
                  125 == d ? (a.string += String.fromCodePoint(F), y = T = ea = !1) : (F *= 16, 48 <= d && 57 >= d ? F += d - 48 : 65 <= d && 70 >= d ? F += d - 65 + 10 : 97 <= d && 102 >= d ? F += d - 97 + 10 : (r("(escaped character, parsing hex of \\u)", d), c = -1, y = ea = !1));
                } else {
                  if (fa || T) {
                    if (0 === M && 123 === d) {
                      ea = !0;
                      continue;
                    }
                    if (2 > M || T && 4 > M) {
                      F *= 16;
                      if (48 <= d && 57 >= d) {
                        F += d - 48;
                      } else {
                        if (65 <= d && 70 >= d) {
                          F += d - 65 + 10;
                        } else {
                          if (97 <= d && 102 >= d) {
                            F += d - 97 + 10;
                          } else {
                            r(T ? "(escaped character, parsing hex of \\u)" : "(escaped character, parsing hex of \\x)", d);
                            c = -1;
                            y = fa = !1;
                            continue;
                          }
                        }
                      }
                      M++;
                      T ? 4 == M && (a.string += String.fromCodePoint(F), y = T = !1) : 2 == M && (a.string += String.fromCodePoint(F), y = fa = !1);
                      continue;
                    }
                  }
                  switch(d) {
                    case 13:
                      X = !0;
                      h.col = 1;
                      continue;
                    case 2028:
                    case 2029:
                      h.col = 1;
                    case 10:
                      X ? X = !1 : h.col = 1;
                      h.line++;
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
                      F = d - 48;
                      M = 1;
                      continue;
                    case 120:
                      fa = !0;
                      F = M = 0;
                      continue;
                    case 117:
                      T = !0;
                      F = M = 0;
                      continue;
                    default:
                      a.string += k;
                  }
                  y = !1;
                }
              }
            } else {
              92 === d ? y ? (a.string += "\\", y = !1) : y = !0 : (X && (X = !1, h.line++, h.col = 2), a.string += k);
            }
          }
        }
        return c;
      }
      function la() {
        let c;
        for (; (c = e) < J.length;) {
          k = J.charAt(c);
          let d = J.codePointAt(e++);
          65536 <= d && (r("fault while parsing number;", d), k += J.charAt(e), e++);
          if (95 != d) {
            if (h.col++, 48 <= d && 57 >= d) {
              W && (l = !0), a.string += k;
            } else {
              if (45 == d || 43 == d) {
                45 == d && (q = !q), 0 == a.string.length || W && !K && !l ? (a.string += k, K = !0) : (a.string += k, Q = !0);
              } else {
                if (78 == d) {
                  if (0 == b) {
                    x = !1;
                    b = 20;
                    return;
                  }
                  r("fault while parsing number;", d);
                  break;
                } else {
                  if (73 == d) {
                    if (0 == b) {
                      x = !1;
                      b = 22;
                      return;
                    }
                    r("fault while parsing number;", d);
                    break;
                  } else {
                    if (58 == d && Q) {
                      a.string += k, Q = !0;
                    } else {
                      if (84 == d && Q) {
                        a.string += k, Q = !0;
                      } else {
                        if (90 == d && Q) {
                          a.string += k, Q = !0;
                        } else {
                          if (46 == d) {
                            if (ja || v || W) {
                              m = !1;
                              r("fault while parsing number;", d);
                              break;
                            } else {
                              a.string += k, ja = !0;
                            }
                          } else {
                            if (110 == d) {
                              ka = !0;
                              break;
                            } else {
                              if (120 == d || 98 == d || 111 == d || 88 == d || 66 == d || 79 == d) {
                                if (v || "0" != a.string) {
                                  m = !1;
                                  r("fault while parsing number;", d);
                                  break;
                                } else {
                                  v = !0, a.string += k;
                                }
                              } else {
                                if (101 == d || 69 == d) {
                                  if (W) {
                                    m = !1;
                                    r("fault while parsing number;", d);
                                    break;
                                  } else {
                                    a.string += k, W = !0;
                                  }
                                } else {
                                  32 == d || 13 == d || 10 == d || 9 == d || 65279 == d || 44 == d || 125 == d || 93 == d || 58 == d ? e = c : f && (m = !1, r("fault while parsing number;", d));
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
          }
        }
        f || e != J.length ? (x = !1, a.value_type = 5, 0 == d && (I = !0)) : x = !0;
      }
      function ba() {
        let c = null, h = {};
        0 < b && 29 > b && D(123);
        var f;
        if (0 == d) {
          if (29 == b && a.string.length) {
            if (f = n.get(a.string)) {
              a.className = a.string;
            } else {
              if (f = S.get(a.string)) {
                a.className = a.string;
              }
            }
            if (c = ia.find((b) => b.name === a.string)) {
              if (N) {
                c.fields.length = 0;
                var q = 5;
              } else {
                tmpObj = new c.protoCon, q = 6;
              }
            } else {
              q = function() {
              }, ia.push(c = {name:a.string, protoCon:f && f.protoCon || q.constructor, fields:[]}), q = 5;
            }
            N = !1;
            b = 0;
          } else {
            q = 3, b = 29;
          }
        } else {
          if (29 == b || 1 === d || 4 === d || 6 == d) {
            0 != b || 4 == a.value_type ? ((f = n.get(a.string)) ? a.className = a.string : (f = S.get(a.string)) ? a.className = a.string : (c = ia.find((b) => b.name === a.string)) || r("Referenced class " + a.string + " has not been defined", g), h = {}, q = 6) : q = 3, b = 0;
          } else {
            if (3 == d && 0 == b) {
              return r("fault while parsing; getting field name unexpected ", g), m = !1;
            }
            q = 3;
          }
        }
        let e = ma();
        a.value_type = 6;
        if (0 === d) {
          A = h;
        } else {
          if (1 == d) {
            -1 == w && B.push(h);
          } else {
            if (4 == d || 6 == d) {
              !a.name && u && (a.name = u.fields[E++]), A[a.name] = h;
            }
          }
        }
        e.context = d;
        e.elements = A;
        e.element_array = B;
        e.name = a.name;
        e.current_proto = H;
        e.current_class = u;
        e.current_class_field = E;
        e.arrayType = -1 == w ? -3 : w;
        e.className = a.className;
        a.className = null;
        a.name = null;
        H = f;
        u = c;
        E = 0;
        A = h;
        V || (V = A);
        t.push(e);
        z();
        d = q;
        return !0;
      }
      function da() {
        0 < b && 29 > b && D(91);
        if (31 == b && a.string.length) {
          var c = ta.findIndex((b) => b === a.string);
          0 <= c ? (b = 0, w = c, a.className = a.string, a.string = null) : "ref" === a.string ? (a.className = null, w = -2) : n.get(a.string) ? a.className = a.string : S.get(a.string) ? a.className = a.string : r("Unknown type specified for array:" + a.string, g);
        } else {
          if (3 == d || 29 == b || 30 == b) {
            return r("Fault while parsing; while getting field name unexpected", g), m = !1;
          }
        }
        {
          c = ma();
          a.value_type = 13;
          let b = [];
          0 == d ? B = b : 1 == d ? -1 == w && B.push(b) : 4 == d && (A[a.name] = b);
          c.context = d;
          c.elements = A;
          c.element_array = B;
          c.name = a.name;
          c.current_proto = H;
          c.current_class = u;
          c.current_class_field = E;
          c.arrayType = -1 == w ? -3 : w;
          c.className = a.className;
          w = -1;
          a.className = null;
          u = H = a.name = null;
          E = 0;
          B = b;
          V || (V = B);
          t.push(c);
          z();
          d = 1;
        }
        return !0;
      }
      var ha = 0;
      if (!m) {
        return -1;
      }
      if (c && c.length) {
        var R = qa();
        R.buf = c;
        O.push(R);
      } else {
        x && (x = !1, a.value_type = 5, 0 == d && (I = !0), ha = 1);
      }
      for (; m && (R = O.shift());) {
        e = R.n;
        var J = R.buf;
        C && (c = U(G), 0 > c ? m = !1 : 0 < c && (C = !1, m && (a.value_type = 4)));
        for (x && la(); !I && m && e < J.length;) {
          k = J.charAt(e);
          var g = J.codePointAt(e++);
          65536 <= g && (k += J.charAt(e), e++);
          h.col++;
          if (L) {
            if (1 == L) {
              if (42 == g) {
                L = 3;
                continue;
              }
              47 != g ? (r("fault while parsing;", g), m = !1) : L = 2;
              continue;
            }
            if (2 == L) {
              10 == g && (L = 0);
              continue;
            }
            if (3 == L) {
              42 == g && (L = 4);
              continue;
            }
            if (4 == L) {
              47 == g ? L = 0 : 42 != g && (L = 3);
              continue;
            }
          }
          switch(g) {
            case 47:
              L || (L = 1);
              break;
            case 123:
              ba();
              break;
            case 91:
              da();
              break;
            case 58:
              6 == d ? (b = 0, a.name = a.string, a.string = "", a.value_type = 0) : 3 == d || 5 == d ? (0 != b && 31 != b && 29 != b && 30 != b && D(32), b = 0, a.name = a.string, a.string = "", d = 3 === d ? 4 : 8, a.value_type = 0) : 0 == d ? (console.log("Override colon found, allow class redefinition"), N = !0) : (1 == d ? r("(in array, got colon out of string):parsing fault;", g) : r("(outside any object, got colon out of string):parsing fault;", g), m = !1);
              break;
            case 125:
              31 == b && (b = 0);
              5 == d ? u ? (a.string && u.fields.push(a.string), z(), c = t.pop(), b = d = 0, a.name = c.name, A = c.elements, B = c.element_array, u = c.current_class, E = c.current_class_field, w = c.arrayType, a.className = c.className, V = null, ca.push(c)) : r("State error; gathering class fields, and lost the class", g) : 3 == d || 6 == d ? (0 != a.value_type && (u && (a.name = u.fields[E++]), aa()), a.value_type = 6, H && (A = new H.protoCon(A)), a.contains = A, a.string = "", c = t.pop(), 
              d = c.context, a.name = c.name, A = c.elements, B = c.element_array, u = c.current_class, H = c.current_proto, E = c.current_class_field, w = c.arrayType, a.className = c.className, ca.push(c), 0 == d && (I = !0)) : 4 == d ? (0 != a.value_type && aa(), a.value_type = 6, a.contains = A, c = t.pop(), a.name = c.name, d = c.context, a.name = c.name, A = c.elements, H = c.current_proto, u = c.current_class, E = c.current_class_field, w = c.arrayType, a.className = c.className, B = c.element_array, 
              ca.push(c), 0 == d && (I = !0)) : (r("Fault while parsing; unexpected", g), m = !1);
              q = !1;
              break;
            case 93:
              31 == b && (b = 0);
              1 == d ? (0 != a.value_type && Y(), a.contains = B, c = t.pop(), a.name = c.name, a.className = c.className, d = c.context, A = c.elements, B = c.element_array, H = c.current_proto, u = c.current_class, E = c.current_class_field, w = c.arrayType, ca.push(c), a.value_type = 13, 0 == d && (I = !0)) : (r(`bad context ${d}; fault while parsing`, g), m = !1);
              q = !1;
              break;
            case 44:
              D(g);
              if (31 == b || 29 == b) {
                b = 0;
              }
              5 == d ? u ? (u.fields.push(a.string), a.string = "", b = 29) : r("State error; gathering class fields, and lost the class", g) : 3 == d ? u ? (a.name = u.fields[E++], 0 != a.value_type && (aa(), z())) : (a.string || a.value_type) && r("State error; comma in field name and/or lost the class", g) : 6 == d ? (u ? (-3 == w || a.name || (a.name = u.fields[E++]), 0 != a.value_type && (-3 != w && aa(), z())) : 0 != a.value_type && (aa(), z()), a.name = null) : 1 == d ? (0 == a.value_type && 
              (a.value_type = 12), 0 != a.value_type && (Y(), z())) : 4 == d ? (d = 3, 0 != a.value_type && (aa(), z()), b = 0) : (m = !1, r("bad context; excessive commas while parsing;", g));
              q = !1;
              break;
            default:
              switch(g) {
                default:
                  if (0 == d || 4 == d && 29 == b || 3 == d || 5 == d) {
                    switch(g) {
                      case 96:
                      case 34:
                      case 39:
                        0 == b || 29 == b ? (a.string.length && (a.className = a.string, a.string = ""), U(g) ? a.value_type = 4 : (G = g, C = !0)) : r("fault while parsing; quote not at start of field name", g);
                        break;
                      case 10:
                        h.line++, h.col = 1;
                      case 13:
                      case 32:
                      case 9:
                      case 65279:
                        if (31 === b) {
                          b = 0;
                          0 === d && (I = !0);
                          break;
                        }
                        0 === b || 30 === b ? 0 == d && a.value_type && (I = !0) : 29 === b ? 0 === d ? (b = 0, I = !0) : a.string.length && (b = 30) : (m = !1, r("fault while parsing; whitepsace unexpected", g));
                        break;
                      default:
                        0 == b && (48 <= g && 57 >= g || 43 == g || 46 == g || 45 == g) ? (ja = l = K = ka = Q = W = v = !1, a.string = k, R.n = e, la()) : (30 === b && (m = !1, r("fault while parsing; character unexpected", g)), 0 === b && (b = 29, a.value_type = 4), a.string += k);
                    }
                  } else {
                    0 == b && (48 <= g && 57 >= g || 43 == g || 46 == g || 45 == g) ? (ja = l = K = ka = Q = W = v = !1, a.string = k, R.n = e, la()) : D(g);
                  }
                  break;
                case 96:
                case 34:
                case 39:
                  U(g) ? (a.value_type = 4, b = 31) : (G = g, C = !0);
                  break;
                case 10:
                  h.line++, h.col = 1;
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
                  0 != b && 30 != b && (29 == b ? a.string.length && (b = 30) : (m = !1, r("fault parsing whitespace", g)));
                  break;
                case 116:
                  0 == b ? b = 1 : 27 == b ? b = 28 : D(g);
                  break;
                case 114:
                  1 == b ? b = 2 : D(g);
                  break;
                case 117:
                  2 == b ? b = 3 : 9 == b ? b = 10 : 0 == b ? b = 12 : D(g);
                  break;
                case 101:
                  3 == b ? (a.value_type = 2, b = 31) : 8 == b ? (a.value_type = 3, b = 31) : 14 == b ? b = 15 : 18 == b ? b = 19 : D(g);
                  break;
                case 110:
                  0 == b ? b = 9 : 12 == b ? b = 13 : 17 == b ? b = 18 : 22 == b ? b = 23 : 25 == b ? b = 26 : D(g);
                  break;
                case 100:
                  13 == b ? b = 14 : 19 == b ? (a.value_type = -1, b = 31) : D(g);
                  break;
                case 105:
                  16 == b ? b = 17 : 24 == b ? b = 25 : 26 == b ? b = 27 : D(g);
                  break;
                case 108:
                  10 == b ? b = 11 : 11 == b ? (a.value_type = 1, b = 31) : 6 == b ? b = 7 : D(g);
                  break;
                case 102:
                  0 == b ? b = 5 : 15 == b ? b = 16 : 23 == b ? b = 24 : D(g);
                  break;
                case 97:
                  5 == b ? b = 6 : 20 == b ? b = 21 : D(g);
                  break;
                case 115:
                  7 == b ? b = 8 : D(g);
                  break;
                case 73:
                  0 == b ? b = 22 : D(g);
                  break;
                case 78:
                  0 == b ? b = 20 : 21 == b ? (a.value_type = q ? 7 : 8, q = !1, b = 31) : D(g);
                  break;
                case 121:
                  28 == b ? (a.value_type = q ? 9 : 10, q = !1, b = 31) : D(g);
                  break;
                case 45:
                  0 == b ? q = !q : D(g);
              }
          }
          if (I) {
            31 == b && (b = 0);
            break;
          }
        }
        e == J.length ? (na.push(R), C || x || 3 == d ? ha = 0 : 0 != d || 0 == a.value_type && !p || (I = !0, ha = 1)) : (R.n = e, O.unshift(R), ha = 2);
        if (I) {
          V = null;
          break;
        }
      }
      if (!m) {
        return -1;
      }
      I && 0 != a.value_type && (p = Z(), q = !1, a.string = "", a.value_type = 0);
      I = !1;
      return ha;
    }};
  };
  const ba = [Object.freeze(JSOX.begin())];
  var oa = 0;
  JSOX.parse = function(c, f) {
    var a = oa++;
    ba.length <= a && ba.push(Object.freeze(JSOX.begin()));
    a = ba[a];
    "string" !== typeof c && (c = String(c));
    a.reset();
    if (0 < a._write(c, !0)) {
      return c = a.value(), "function" === typeof f && function n(a, c) {
        var b, e = a[c];
        if (e && "object" === typeof e) {
          for (b in e) {
            if (Object.prototype.hasOwnProperty.call(e, b)) {
              var N = n(e, b);
              void 0 !== N ? e[b] = N : delete e[b];
            }
          }
        }
        return f.call(a, c, e);
      }({"":c}, ""), oa--, c;
    }
  };
  var pa = function() {
    return this && this.valueOf();
  };
  p.set(Object.prototype, {external:!1, name:Object.prototype.constructor.name, cb:null});
  p.set(Date.prototype, {external:!1, name:"Date", cb:function() {
    var c = -this.getTimezoneOffset(), f = 0 <= c ? "+" : "-", a = function(a) {
      a = Math.floor(Math.abs(a));
      return (10 > a ? "0" : "") + a;
    };
    return [this.getFullYear(), "-", a(this.getMonth() + 1), "-", a(this.getDate()), "T", a(this.getHours()), ":", a(this.getMinutes()), ":", a(this.getSeconds()), "." + function(a) {
      a = Math.floor(Math.abs(a));
      return (100 > a ? "0" : "") + (10 > a ? "0" : "") + a;
    }(this.getMilliseconds()) + f, a(c / 60), ":", a(c % 60)].join("");
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
    return "[" + v(this) + "]";
  }});
  p.set(Uint8Array.prototype, {external:!0, name:"u8", cb:function() {
    return "[" + v(this.buffer) + "]";
  }});
  p.set(Uint8ClampedArray.prototype, {external:!0, name:"uc8", cb:function() {
    return "[" + v(this.buffer) + "]";
  }});
  p.set(Int8Array.prototype, {external:!0, name:"s8", cb:function() {
    return "[" + v(this.buffer) + "]";
  }});
  p.set(Uint16Array.prototype, {external:!0, name:"u16", cb:function() {
    return "[" + v(this.buffer) + "]";
  }});
  p.set(Int16Array.prototype, {external:!0, name:"s16", cb:function() {
    return "[" + v(this.buffer) + "]";
  }});
  p.set(Uint32Array.prototype, {external:!0, name:"u32", cb:function() {
    return "[" + v(this.buffer) + "]";
  }});
  p.set(Int32Array.prototype, {external:!0, name:"s32", cb:function() {
    return "[" + v(this.buffer) + "]";
  }});
  "undefined" != typeof Uint64Array && p.set(Uint64Array.prototype, {external:!0, name:"u64", cb:function() {
    return "[" + v(this.buffer) + "]";
  }});
  "undefined" != typeof Int64Array && p.set(Int64Array.prototype, {external:!0, name:"s64", cb:function() {
    return "[" + v(this.buffer) + "]";
  }});
  p.set(Float32Array.prototype, {external:!0, name:"f32", cb:function() {
    return "[" + v(this.buffer) + "]";
  }});
  p.set(Float64Array.prototype, {external:!0, name:"f64", cb:function() {
    return "[" + v(this.buffer) + "]";
  }});
  p.set(Float64Array.prototype, {external:!0, name:"f64", cb:function() {
    return "[" + v(this.buffer) + "]";
  }});
  p.set(Map.prototype, da = {external:!0, name:"map", cb:null});
  S.set("map", {protoCon:Map.constructor, cb:function(c, f) {
    c && this.set(c, f);
    return this;
  }});
  p.set(Array.prototype, Y = {external:!1, name:Array.prototype.constructor.name, cb:null});
  JSOX.toJSOX = JSOX.registerToJSOX = function(c, f, a) {
    if (f.prototype && f.prototype === Object.prototype) {
      f = Object.keys(f).toString();
      if (U.get(f)) {
        throw Error("Existing toJSOX has been registered for object type");
      }
      U.set(f, {external:!0, name:c, cb:a});
    } else {
      if (p.get(f)) {
        throw Error("Existing toJSOX has been registered for prototype");
      }
      p.set(f.prototype, {external:!0, name:c || a.constructor.name, cb:a});
    }
  };
  JSOX.fromJSOX = function(c, f, a) {
    function h() {
    }
    f || (f = h.prototype);
    if (S.get(c)) {
      throw Error("Existing fromJSOX has been registered for prototype");
    }
    if (f && !("constructor" in f)) {
      throw Error("Please pass a prototype like thing...");
    }
    S.set(c, {protoCon:f.prototype.constructor, cb:a});
  };
  JSOX.registerFromJSOX = function(c, f, a) {
    throw Error("deprecated; please adjust code to use fromJSOX");
  };
  JSOX.addType = function(c, f, a, h) {
    JSOX.toJSOX(c, f, a);
    JSOX.fromJSOX(c, f, h);
  };
  JSOX.registerToFrom = function(c, f, a, h) {
    throw Error("registerToFrom deprecated; please use addType");
  };
  JSOX.stringifier = function() {
    function c(a) {
      if (null !== a) {
        var b = k.get(a);
        if (b) {
          return b;
        }
        k.set(a, _JSON.stringify(n));
      }
    }
    function f(a, b) {
      var c, f = Object.getPrototypeOf(a);
      if (c = h.find((a) => {
        if (a.proto && a.proto === f) {
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
        var e = b.toString();
      } else {
        e = Object.keys(a).toString();
      }
      return c = h.find((a) => {
        if (a.tag === e) {
          return !0;
        }
      });
    }
    function a(a, q, z) {
      function N(a) {
        return isNaN(a) ? a in va || /([0-9\-])/.test(a[0]) || /((\n|\r|\t)|[ \{\}\(\)<>!\+\-\*\/\.:, ])/.test(a) ? e + JSOX.escape(a) + e : a : ["'", a.toString(), "'"].join("");
      }
      function A(a, d) {
        function e() {
          var a = [];
          let b = n.length;
          for (let c = 0; c < this.length; c += 1) {
            n[b] = c, a[c] = A(c, this) || "null";
          }
          n.splice(b, 1);
          return 0 === a.length ? "[]" : t ? ["[\n", t, a.join(",\n" + t), "\n", u, "]"].join("") : "[" + a.join(",") + "]";
        }
        function q() {
          var a = {tmp:null}, b = "{", c = !0, d, e;
          for ([d, e] of this) {
            a.tmp = e;
            var f = n.length;
            n[f] = d;
            b += (c ? "" : ",") + N(d) + ":" + A("tmp", a);
            n.length = f;
            c = !1;
          }
          return b += "}";
        }
        B && (Y.cb = e, da.cb = q, B = !1);
        Y.cb = e;
        var k, u = t;
        let w = n.length;
        var l = d[a], z = void 0 !== l && null !== l && (b.get(Object.getPrototypeOf(l)) || p.get(Object.getPrototypeOf(l)) || null);
        var G = !z && void 0 !== l && null !== l && (m.get(Object.keys(l).toString()) || U.get(Object.keys(l).toString()) || null);
        var C = z && z.cb || G && G.cb;
        if (void 0 !== l && null !== l && "function" === typeof C) {
          t += E;
          if ("object" === typeof l && (k = c(l))) {
            return "ref" + k;
          }
          l = C.apply(l);
          t = u;
        } else {
          if ("object" === typeof l && (k = c(l))) {
            return "ref" + k;
          }
        }
        "function" === typeof v && (l = v.call(d, a, l));
        switch(typeof l) {
          case "string":
          case "number":
            var x = "";
            "" === a && (x = h.map((a) => a.name + "{" + a.fields.join(",") + "}").join(t ? "\n" : "") + (t ? "\n" : ""));
            return z && z.external ? x + z.name + l : G && G.external ? x + G.name + l : x + l;
          case "boolean":
          case "null":
            return String(l);
          case "object":
            if (k) {
              return "ref" + k;
            }
            if (!l) {
              return "null";
            }
            t += E;
            G = null;
            d = [];
            if (v && "object" === typeof v) {
              var y = v.length;
              G = f(l, v);
              for (C = 0; C < y; C += 1) {
                "string" === typeof v[C] && (x = v[C], n[w] = x, (k = A(x, l)) && (G ? d.push(k) : d.push(N(x) + (t ? ": " : ":") + k)));
              }
            } else {
              G = f(l);
              C = [];
              for (x in l) {
                if (Object.prototype.hasOwnProperty.call(l, x)) {
                  for (y = 0; y < C.length; y++) {
                    if (C[y] > x) {
                      C.splice(y, 0, x);
                      break;
                    }
                  }
                  y == C.length && C.push(x);
                }
              }
              for (y = 0; y < C.length; y++) {
                x = C[y], Object.prototype.hasOwnProperty.call(l, x) && (n[w] = x, (k = A(x, l)) && (G ? d.push(k) : d.push(N(x) + (t ? ": " : ":") + k)));
              }
            }
            n.splice(w, 1);
            l = "" === a ? h.map((a) => a.name + "{" + a.fields.join(",") + "}").join(t ? "\n" : "") + (t ? "\n" : "") : "";
            z && z.external && (l = "" === a ? l + z.name : l + '"' + z.name + '"');
            a = null;
            G && (a = N(G.name));
            k = l + (0 === d.length ? "{}" : t ? (G ? a : "") + "{\n" + t + d.join(",\n" + t) + "\n" + u + "}" : (G ? a : "") + "{" + d.join(",") + "}");
            t = u;
            return k;
        }
      }
      if (void 0 === a) {
        return "undefined";
      }
      if (null !== a) {
        var B = !0, t, v;
        var H = typeof z;
        var u = typeof q;
        var E = t = "";
        if ("number" === H) {
          for (H = 0; H < z; H += 1) {
            E += " ";
          }
        } else {
          "string" === H && (E = z);
        }
        if ((v = q) && "function" !== u && ("object" !== u || "number" !== typeof q.length)) {
          throw Error("JSOX.stringify");
        }
        n = [];
        k = new WeakMap;
        return A("", {"":a});
      }
    }
    var h = [], e = '"', k = new WeakMap, n = [], b = new WeakMap, m = new Map;
    return {defineClass(a, b) {
      h.push(a = {name:a, tag:Object.keys(b).toString(), proto:Object.getPrototypeOf(b), fields:Object.keys(b)});
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
      e = a;
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
  const K = {"~":-1, "=":-1, $:62, _:63, "+":62, "-":62, ".":62, "/":63, ",":63};
  for (var P = 0; 256 > P; P++) {
    64 > P && (K["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[P]] = P);
  }
  Object.freeze(K);
  JSOX.stringify = function(c, f, a) {
    return JSOX.stringifier().stringify(c, f, a);
  };
  [[0, 384, [16767487, 16739071, 130048, 3670016, 0, 16777208, 16777215, 8388607, 8388608, 0, 128, 0, 0, 0, 0, 0]]].map((c) => ({firstChar:c[0], lastChar:c[1], bits:c[2]}));
}
privateizeEverything();


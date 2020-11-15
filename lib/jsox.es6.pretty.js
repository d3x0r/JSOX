'use strict';
var exports = exports || {};
const _JSON = JSON, JSOX = exports;
function privateizeEverything() {
  function Ba() {
    var c = ra.pop();
    c || (c = {context:0, current_proto:null, current_class:null, current_class_field:0, arrayType:-1, valueType:0, elements:null, element_array:null});
    return c;
  }
  function Ka() {
    var c = Ca.pop();
    c ? c.n = 0 : c = {buf:null, n:0};
    return c;
  }
  function Da() {
    return this && this.valueOf();
  }
  function ca(c) {
    var k = "";
    c = new Uint8Array(c);
    var n = c.byteLength, a = n % 3;
    n -= a;
    for (var z, u, p, w, b = 0; b < n; b += 3) {
      w = c[b] << 16 | c[b + 1] << 8 | c[b + 2], z = (w & 16515072) >> 18, u = (w & 258048) >> 12, p = (w & 4032) >> 6, w &= 63, k += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[z] + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[u] + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[p] + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[w];
    }
    1 == a ? (w = c[n], k += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[(w & 252) >> 2] + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[(w & 3) << 4] + "==") : 2 == a && (w = c[n] << 8 | c[n + 1], k += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[(w & 64512) >> 10] + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[(w & 1008) >> 4] + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[(w & 15) << 2] + 
    "=");
    return k;
  }
  function Ea(c) {
    var k = new ArrayBuffer(1 == c.length % 4 ? 3 * ((c.length + 3) / 4 | 0) - 3 : 2 == c.length % 4 ? 3 * ((c.length + 3) / 4 | 0) - 2 : 3 == c.length % 4 ? 3 * ((c.length + 3) / 4 | 0) - 1 : -1 == ia[c[c.length - 3]] ? 3 * ((c.length + 3) / 4 | 0) - 3 : -1 == ia[c[c.length - 2]] ? 3 * ((c.length + 3) / 4 | 0) - 2 : -1 == ia[c[c.length - 1]] ? 3 * ((c.length + 3) / 4 | 0) - 1 : 3 * ((c.length + 3) / 4 | 0)), n = new Uint8Array(k), a, z = c.length + 3 >> 2;
    for (a = 0; a < z; a++) {
      var u = ia[c[4 * a]], p = 4 * a + 1 < c.length ? ia[c[4 * a + 1]] : -1, w = 0 <= p && 4 * a + 2 < c.length ? ia[c[4 * a + 2]] : -1, b = 0 <= w && 4 * a + 3 < c.length ? ia[c[4 * a + 3]] : -1;
      0 <= p && (n[3 * a] = u << 2 | p >> 4);
      0 <= w && (n[3 * a + 1] = p << 4 | w >> 2 & 15);
      0 <= b && (n[3 * a + 2] = w << 6 | b & 63);
    }
    return k;
  }
  const La = "function" === typeof BigInt, Ma = "ab u8 cu8 s8 u16 s16 u32 s32 u64 s64 f32 f64".split(" ");
  var ua = null, Fa = null;
  const Na = [ArrayBuffer, Uint8Array, Uint8ClampedArray, Int8Array, Uint16Array, Int16Array, Uint32Array, Int32Array, null, null, Float32Array, Float64Array], Oa = {["true"]:!0, ["false"]:!1, ["null"]:null, ["NaN"]:NaN, ["Infinity"]:Infinity, ["undefined"]:void 0}, ra = [], Ca = [];
  exports.escape = function(c) {
    var k, n = "";
    if (!c) {
      return c;
    }
    for (k = 0; k < c.length; k++) {
      if ('"' == c[k] || "\\" == c[k] || "`" == c[k] || "'" == c[k]) {
        n += "\\";
      }
      n += c[k];
    }
    return n;
  };
  const N = new WeakMap, va = new Map, ka = new Map, wa = [];
  exports.begin = function(c, k) {
    function n(d) {
      throw Error(`${d} at ${u} [${z.line}:${z.col}]`);
    }
    const a = {name:null, value_type:0, string:"", contains:null, className:null, }, z = {line:1, col:1};
    let u = 0, p;
    var w = new Map, b = 0, F = !0, ja = !1, Q = !1, da = null, ea = null, l = void 0, m = [], t = {first:null, last:null, saved:null, push(d) {
      var y = this.saved;
      y ? (this.saved = y.next, y.node = d, y.next = null, y.prior = this.last) : y = {node:d, next:null, prior:this.last};
      this.last ? this.last.next = y : this.first = y;
      this.last = y;
      this.length++;
    }, pop() {
      var d = this.last;
      if (!d) {
        return null;
      }
      (this.last = d.prior) || (this.first = null);
      d.next = this.saved;
      this.last && (this.last.next = null);
      d.next || (d.first = null);
      this.saved = d;
      this.length--;
      return d.node;
    }, length:0, }, O = [], I = null, A = null, v = 0, B = -1, g = 0, R = 0, fa = !1, L = !1, S = !1, la = !1, pa = !1, G = {first:null, last:null, saved:null, push(d) {
      var y = this.saved;
      y ? (this.saved = y.next, y.node = d, y.next = null, y.prior = this.last) : y = {node:d, next:null, prior:this.last};
      this.last ? this.last.next = y : this.first = y;
      this.last = y;
    }, shift() {
      var d = this.first;
      if (!d) {
        return null;
      }
      (this.first = d.next) || (this.last = null);
      d.next = this.saved;
      this.saved = d;
      return d.node;
    }, unshift(d) {
      var y = this.saved;
      this.saved = y.next;
      y.node = d;
      y.next = this.first;
      y.prior = null;
      this.first || (this.last = y);
      this.first = y;
    }}, ma = null, ba = !1, q = !1, K = !1, M = !1, P = !1, C = !1, U = !1, D = 0, V = 0, J = !1, W = !1, na = !1;
    return {fromJSOX(d, y, r) {
      function X() {
      }
      if (w.get(d)) {
        throw Error("Existing fromJSOX has been registered for prototype");
      }
      y || (y = X);
      if (y && !("constructor" in y)) {
        throw Error("Please pass a prototype like thing...");
      }
      w.set(d, {protoCon:y.prototype.constructor, cb:r});
    }, registerFromJSOX(d, y) {
      throw Error("registerFromJSOX is deprecated, please update to use fromJSOX instead:" + d + y.toString());
    }, finalError() {
      0 !== R && (1 === R && n("Comment began at end of document"), 2 === R && console.log("Warning: '//' comment without end of line ended document"), 3 === R && n("Open comment '/*' is missing close at end of document"), 4 === R && n("Incomplete '/* *' close at end of document"));
      ba && n("Incomplete string");
    }, value() {
      this.finalError();
      var d = da;
      da = void 0;
      return d;
    }, reset() {
      b = 0;
      F = !0;
      G.last && (G.last.next = G.save);
      G.save = G.first;
      G.first = G.last = null;
      t.last && (t.last.next = t.save);
      t.length = 0;
      t.save = G.first;
      t.first = t.last = null;
      m = [];
      l = void 0;
      g = 0;
      O = [];
      A = I = null;
      v = 0;
      a.value_type = 0;
      a.name = null;
      a.string = "";
      a.className = null;
      z.line = 1;
      z.col = 1;
      Q = !1;
      R = 0;
      W = M = K = ba = J = !1;
    }, usePrototype(d, y) {
    }, write(d) {
      "string" !== typeof d && "undefined" !== typeof d && (d = String(d));
      for (d = this._write(d, !1); 0 < d && !("function" === typeof k && function qa(r, X) {
        var oa, Y = r[X];
        if (Y && "object" === typeof Y) {
          for (oa in Y) {
            if (Object.prototype.hasOwnProperty.call(Y, oa)) {
              var H = qa(Y, oa);
              void 0 !== H ? Y[oa] = H : delete Y[oa];
            }
          }
        }
        return k.call(r, X, Y);
      }({"":da}, ""), da = c(da), 2 > d); d = this._write()) {
      }
    }, _write(d, y) {
      function r(e, f) {
        throw Error(`${e} '${String.fromCodePoint(f)}' unexpected at ${u} (near '${Z.substr(4 < u ? u - 4 : 0, 4 < u ? 3 : u - 1)}[${String.fromCodePoint(f)}]${Z.substr(u, 10)}') [${z.line}:${z.col}]`);
      }
      function X() {
        a.value_type = 0;
        a.string = "";
        a.contains = null;
      }
      function qa() {
        switch(a.value_type) {
          case 5:
            !(13 < a.string.length || 13 == a.string.length && "2" < a[0]) || W || pa || la || L || (na = !0);
            if (na) {
              if (La) {
                return BigInt(a.string);
              }
              throw Error("no builtin BigInt()", 0);
            }
            if (W) {
              var e = new Date(a.string);
              isNaN(e.getTime()) && r("Bad number format", h);
              return e;
            }
            return (Q ? -1 : 1) * Number(a.string);
          case 4:
            if (a.className) {
              (e = w.get(a.className)) || (e = ka.get(a.className));
              if (e && e.cb) {
                return a.className = null, e.cb.call(a.string);
              }
              throw Error("Double string error, no constructor for: new " + a.className + "(" + a.string + ")");
            }
            return a.string;
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
            return a.className && ((e = w.get(a.className)) || (e = ka.get(a.className)), a.className = null, e && e.cb) ? a.contains = e.cb.call(a.contains) : a.contains;
          case 13:
            if (0 <= B) {
              return e = a.contains.length ? Ea(a.contains[0]) : Ea(a.string), 0 === B ? e : new Na[B](e);
            }
            if (-2 === B) {
              var f = ea;
              for (e = 0; e < a.contains.length; e++) {
                const x = a.contains[e];
                f = f[a.contains[e]];
                if (!f) {
                  {
                    let E = t.first, T = 0;
                    for (; E && T < a.contains.length;) {
                      const aa = a.contains[T];
                      if (E.next) {
                        if ("number" === typeof aa) {
                          const xa = E.next.node.element_array;
                          if (xa && aa >= xa.length) {
                            if (T === a.contains.length - 1) {
                              f = l;
                              break;
                            } else {
                              if (E.next.next && aa === xa.length) {
                                f = E.next.next.node.elements;
                                E = E.next;
                                T++;
                                continue;
                              }
                            }
                            console.log("This is one broken path...", E, E.node, aa);
                            throw Error("Array overflow in history.");
                          }
                        } else {
                          if (aa !== E.next.node.name) {
                            f = E.next.node.elements[aa];
                            e = T;
                            break;
                          }
                        }
                      }
                      E = E.next;
                      T++;
                    }
                  }
                }
                if (!f) {
                  throw Error("Path did not resolve poperly." + a.contains + " at " + x + "(" + e + ")");
                }
              }
              B = -3;
              return f;
            }
            return a.className && ((e = w.get(a.className)) || (e = ka.get(a.className)), a.className = null, e && e.cb) ? e.cb.call(a.contains) : a.contains;
          default:
            console.log("Unhandled value conversion.", a);
        }
      }
      function oa() {
        if (-3 == B) {
          6 === a.value_type && m.push(a.contains), B = -1;
        } else {
          switch(a.value_type) {
            case 12:
              m.push(void 0);
              delete m[m.length - 1];
              break;
            default:
              m.push(qa());
          }
          X();
        }
      }
      function Y() {
        -3 === B ? (l[a.name] = qa(), B = -1) : 12 !== a.value_type && (!a.name && A && (a.name = A.fields[v++]), l[a.name] = qa(), X());
      }
      function H(e) {
        if (0 !== b) {
          Q && r("Negative outside of quotes, being converted to a string (would lose count of leading '-' characters)", e);
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
                  r("Negative outside of quotes, being converted to a string", e);
                  break;
                case 8:
                  a.string += "NaN";
                  break;
                case 7:
                  a.string += "-NaN";
                  r("Negative outside of quotes, being converted to a string", e);
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
              break;
            case 32:
              r("String-keyword recovery fail (after whitespace)", e);
          }
          a.value_type = 4;
          29 > b && (b = 31);
        } else {
          b = 31, a.value_type = 4;
        }
        123 == e ? Ga() : 91 == e ? Ha() : 44 != e && 32 != e && 13 != e && 10 != e && 9 != e && 65279 != e && 8232 != e && 8233 != e && (44 == e || 125 == e || 93 == e || 58 == e ? r("Invalid character near identifier", e) : a.string += p);
      }
      function ya(e) {
        let f = 0;
        for (; 0 == f && u < Z.length;) {
          p = Z.charAt(u);
          let x = Z.codePointAt(u++);
          65536 <= x && (p += Z.charAt(u), u++);
          z.col++;
          if (x == e) {
            K ? (U ? r("Incomplete hexidecimal sequence", x) : C ? r("Incomplete long unicode sequence", x) : P && r("Incomplete unicode sequence", x), M ? (M = !1, f = 1) : a.string += p, K = !1) : f = 1;
          } else {
            if (K) {
              if (P) {
                125 == x ? (a.string += String.fromCodePoint(D), K = C = P = !1) : (D *= 16, 48 <= x && 57 >= x ? D += x - 48 : 65 <= x && 70 >= x ? D += x - 65 + 10 : 97 <= x && 102 >= x ? D += x - 97 + 10 : (r("(escaped character, parsing hex of \\u)", x), f = -1, K = P = !1));
              } else {
                if (U || C) {
                  if (0 === V && 123 === x) {
                    P = !0;
                    continue;
                  }
                  if (2 > V || C && 4 > V) {
                    D *= 16;
                    if (48 <= x && 57 >= x) {
                      D += x - 48;
                    } else {
                      if (65 <= x && 70 >= x) {
                        D += x - 65 + 10;
                      } else {
                        if (97 <= x && 102 >= x) {
                          D += x - 97 + 10;
                        } else {
                          r(C ? "(escaped character, parsing hex of \\u)" : "(escaped character, parsing hex of \\x)", x);
                          f = -1;
                          K = U = !1;
                          continue;
                        }
                      }
                    }
                    V++;
                    C ? 4 == V && (a.string += String.fromCodePoint(D), K = C = !1) : 2 == V && (a.string += String.fromCodePoint(D), K = U = !1);
                    continue;
                  }
                }
                switch(x) {
                  case 13:
                    M = !0;
                    z.col = 1;
                    continue;
                  case 8232:
                  case 8233:
                    z.col = 1;
                  case 10:
                    M ? M = !1 : z.col = 1;
                    z.line++;
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
                    a.string += "\x00";
                    break;
                  case 120:
                    U = !0;
                    D = V = 0;
                    continue;
                  case 117:
                    C = !0;
                    D = V = 0;
                    continue;
                  default:
                    a.string += p;
                }
                K = !1;
              }
            } else {
              92 === x ? K ? (a.string += "\\", K = !1) : (K = !0, V = D = 0) : (M && (M = !1, z.line++, z.col = 2), a.string += p);
            }
          }
        }
        return f;
      }
      function za() {
        let e;
        for (; (e = u) < Z.length;) {
          p = Z.charAt(e);
          let f = Z.codePointAt(u++);
          if (256 <= f) {
            u = e;
            break;
          } else {
            if (95 != f) {
              if (z.col++, 48 <= f && 57 >= f) {
                S && (pa = !0), a.string += p;
              } else {
                if (45 == f || 43 == f) {
                  0 == a.string.length || S && !la && !pa ? (45 != f || S || (Q = !Q), a.string += p, la = !0) : (a.string += p, W = !0);
                } else {
                  if (78 == f) {
                    if (0 == b) {
                      q = !1;
                      b = 20;
                      return;
                    }
                    r("fault while parsing number;", f);
                    break;
                  } else {
                    if (73 == f) {
                      if (0 == b) {
                        q = !1;
                        b = 22;
                        return;
                      }
                      r("fault while parsing number;", f);
                      break;
                    } else {
                      if (58 == f && W) {
                        a.string += p, W = !0;
                      } else {
                        if (84 == f && W) {
                          a.string += p, W = !0;
                        } else {
                          if (90 == f && W) {
                            a.string += p, W = !0;
                          } else {
                            if (46 == f) {
                              if (L || fa || S) {
                                F = !1;
                                r("fault while parsing number;", f);
                                break;
                              } else {
                                a.string += p, L = !0;
                              }
                            } else {
                              if (110 == f) {
                                na = !0;
                                break;
                              } else {
                                if (120 == f || 98 == f || 111 == f || 88 == f || 66 == f || 79 == f) {
                                  if (fa || "0" != a.string) {
                                    F = !1;
                                    r("fault while parsing number;", f);
                                    break;
                                  } else {
                                    fa = !0, a.string += p;
                                  }
                                } else {
                                  if (101 == f || 69 == f) {
                                    if (S) {
                                      F = !1;
                                      r("fault while parsing number;", f);
                                      break;
                                    } else {
                                      a.string += p, S = !0;
                                    }
                                  } else {
                                    32 == f || 13 == f || 10 == f || 9 == f || 47 == f || 35 == f || 44 == f || 125 == f || 93 == f || 123 == f || 91 == f || 34 == f || 39 == f || 96 == f || 58 == f ? u = e : y && (F = !1, r("fault while parsing number;", f));
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
        }
        y || u != Z.length ? (q = !1, a.value_type = 5, 0 == g && (J = !0)) : q = !0;
      }
      function Ga() {
        let e, f = null, x = {};
        0 < b && 29 > b && H(123);
        let E;
        E = Ia();
        if (0 == g) {
          if (29 == b || 31 == b && (E || a.string.length)) {
            E && E.protoDef && E.protoDef.protocon && (x = new E.protoDef.protocon, e = 2);
            if (!E || !E.protoDef && a.string) {
              if (f = O.find(aa => aa.name === a.string)) {
                ja ? (f.fields.length = 0, e = 4) : (x = new f.protoCon, e = 5);
              } else {
                function aa() {
                }
                O.push(f = {name:a.string, protoCon:E && E.protoDef && E.protoDef.protoCon || aa.constructor, fields:[]});
                e = 4;
              }
              ja = !1;
            }
            A = f;
            b = 0;
          } else {
            b = 29, e = 2;
          }
        } else {
          if (29 == b || 1 === g || 3 === g || 5 == g) {
            if (0 != b || 4 == a.value_type) {
              if (E && E.protoDef) {
                a.className = a.string, x = new E.protoDef.protoCon, e = 2;
              } else {
                if (f = O.find(aa => aa.name === a.string)) {
                  e = 5;
                } else {
                  function aa() {
                  }
                  w.set(a.string, {protoCon:aa.prototype.constructor, cb:null});
                  l = new aa;
                  e = 2;
                }
                x = {};
              }
            } else {
              e = 2;
            }
            b = 0;
          } else {
            if (2 == g && 0 == b) {
              return r("fault while parsing; getting field name unexpected ", h), F = !1;
            }
            e = 2;
          }
        }
        let T = Ba();
        a.value_type = 6;
        0 === g ? l = x : 1 == g || 3 != g && 5 != g || (!a.name && A && (a.name = A.fields[v++]), l[a.name] = x);
        T.context = g;
        T.elements = l;
        T.element_array = m;
        T.name = a.name;
        T.current_proto = I;
        T.current_class = A;
        T.current_class_field = v;
        T.valueType = a.value_type;
        T.arrayType = -1 == B ? -3 : B;
        T.className = a.className;
        a.className = null;
        a.name = null;
        I = E;
        A = f;
        v = 0;
        l = x;
        ea || (ea = l);
        t.push(T);
        X();
        g = e;
        return !0;
      }
      function Ha() {
        0 < b && 29 > b && H(91);
        if (31 == b && a.string.length) {
          var e = Ma.findIndex(f => f === a.string);
          0 <= e ? (b = 0, B = e, a.className = a.string, a.string = null) : "ref" === a.string ? (a.className = null, B = -2) : w.get(a.string) ? a.className = a.string : ka.get(a.string) ? a.className = a.string : r(`Unknown type '${a.string}' specified for array`, h);
        } else {
          if (2 == g || 29 == b || 30 == b) {
            return r("Fault while parsing; while getting field name unexpected", h), F = !1;
          }
        }
        {
          e = Ba();
          a.value_type = 13;
          let f = [];
          0 == g ? m = f : 1 == g ? -1 == B && m.push(f) : 3 == g && (l[a.name] = f);
          e.context = g;
          e.elements = l;
          e.element_array = m;
          e.name = a.name;
          e.current_proto = I;
          e.current_class = A;
          e.current_class_field = v;
          e.valueType = a.value_type;
          e.arrayType = -1 == B ? -3 : B;
          e.className = a.className;
          B = -1;
          a.className = null;
          A = I = a.name = null;
          v = 0;
          m = f;
          ea || (ea = m);
          t.push(e);
          X();
          g = 1;
        }
        return !0;
      }
      function Ia() {
        const e = {protoDef:null, cls:null};
        (e.protoDef = w.get(a.string)) ? a.className || (a.className = a.string, a.string = null) : (e.protoDef = ka.get(a.string)) && !a.className && (console.log("IN GETPROTO AND FIXING?"), a.className = a.string, a.string = null);
        a.string && (e.cls = O.find(f => f.name === a.string));
        return e.protoDef || e.cls ? e : null;
      }
      var sa = 0;
      if (!F) {
        return -1;
      }
      if (d && d.length) {
        var ha = Ka();
        ha.buf = d;
        G.push(ha);
      } else {
        q && (q = !1, a.value_type = 5, 0 == g && (J = !0), sa = 1), 0 !== g && r("Unclosed object at end of stream.", h);
      }
      for (; F && (ha = G.shift());) {
        u = ha.n;
        var Z = ha.buf;
        ba && (d = ya(ma), 0 > d ? F = !1 : 0 < d && (ba = !1, F && (a.value_type = 4)));
        for (q && za(); !J && F && u < Z.length;) {
          p = Z.charAt(u);
          var h = Z.codePointAt(u++);
          65536 <= h && (p += Z.charAt(u), u++);
          z.col++;
          if (R) {
            if (1 == R) {
              if (42 == h) {
                R = 3;
              } else {
                if (47 != h) {
                  return r("fault while parsing;", h);
                }
                R = 2;
              }
            } else {
              if (2 == R) {
                if (10 == h || 13 == h) {
                  R = 0;
                }
              } else {
                3 == R ? 42 == h && (R = 4) : R = 47 == h ? 0 : 3;
              }
            }
          } else {
            switch(h) {
              case 47:
                R = 1;
                break;
              case 123:
                Ga();
                break;
              case 91:
                Ha();
                break;
              case 58:
                5 == g ? (b = 0, a.name = a.string, a.string = "", a.value_type = 0) : 2 == g || 4 == g ? 4 == g ? Object.keys(l).length || (console.log("This is a full object, not a class def...", a.className), d = () => {
                }, w.set(t.last.node.current_class.name, {protoCon:d.prototype.constructor, cb:null}), l = new d, g = 3, a.name = a.string, b = 0, a.string = "", a.value_type = 0, console.log("don't do default;s do a revive...")) : (0 != b && 31 != b && 29 != b && 30 != b && H(32), b = 0, a.name = a.string, a.string = "", g = 2 === g ? 3 : 6, a.value_type = 0) : 0 == g ? (console.log("Override colon found, allow class redefinition", g), ja = !0) : (1 == g ? r("(in array, got colon out of string):parsing fault;", 
                h) : 3 == g ? r("String unexpected", h) : r("(outside any object, got colon out of string):parsing fault;", h), F = !1);
                break;
              case 125:
                31 == b && (b = 0);
                4 == g ? A ? (a.string && A.fields.push(a.string), X(), d = t.pop(), b = g = 0, a.name = d.name, l = d.elements, m = d.element_array, A = d.current_class, v = d.current_class_field, B = d.arrayType, a.value_type = d.valueType, a.className = d.className, ea = null, ra.push(d)) : r("State error; gathering class fields, and lost the class", h) : 2 == g || 5 == g ? (0 != a.value_type && (A && (a.name = A.fields[v++]), Y()), a.value_type = 6, I && I.protoDef && (console.log("SOMETHING SHOULD AHVE BEEN REPLACED HERE??", 
                I), console.log("The other version only revives on init"), l = new I.protoDef.cb(l, void 0, void 0)), a.contains = l, a.string = "", d = t.pop(), g = d.context, a.name = d.name, l = d.elements, m = d.element_array, A = d.current_class, I = d.current_proto, v = d.current_class_field, B = d.arrayType, a.value_type = d.valueType, a.className = d.className, ra.push(d), 0 == g && (J = !0)) : 3 == g ? (0 === a.value_type && r("Fault while parsing; unexpected", h), Y(), a.value_type = 6, 
                a.contains = l, b = 0, d = t.pop(), g = d.context, a.name = d.name, l = d.elements, I = d.current_proto, A = d.current_class, v = d.current_class_field, B = d.arrayType, a.value_type = d.valueType, a.className = d.className, m = d.element_array, ra.push(d), 0 == g && (J = !0)) : (r("Fault while parsing; unexpected", h), F = !1);
                Q = !1;
                break;
              case 93:
                30 <= b && (b = 0);
                1 == g ? (0 != a.value_type && (a.name && console.log("Ya this should blow up"), oa()), a.contains = m, d = t.pop(), a.name = d.name, a.className = d.className, g = d.context, l = d.elements, m = d.element_array, I = d.current_proto, A = d.current_class, v = d.current_class_field, B = d.arrayType, a.value_type = d.valueType, ra.push(d), a.value_type = 13, 0 == g && (J = !0)) : (r(`bad context ${g}; fault while parsing`, h), F = !1);
                Q = !1;
                break;
              case 44:
                31 > b && 0 != b && H(h);
                if (31 == b || 29 == b) {
                  b = 0;
                }
                4 == g ? A ? (A.fields.push(a.string), a.string = "", b = 29) : r("State error; gathering class fields, and lost the class", h) : 2 == g ? A ? (a.name = A.fields[v++], 0 != a.value_type && (Y(), X())) : (a.string || a.value_type) && r("State error; comma in field name and/or lost the class", h) : 5 == g ? (A ? (-3 == B || a.name || (a.name = A.fields[v++]), 0 != a.value_type && (-3 != B && Y(), X())) : 0 != a.value_type && (Y(), X()), a.name = null) : 1 == g ? (0 == a.value_type && 
                (a.value_type = 12), oa(), X()) : 3 == g && 0 != a.value_type ? (g = 2, 0 != a.value_type && (Y(), X()), b = 0) : (F = !1, r("bad context; excessive commas while parsing;", h));
                Q = !1;
                break;
              default:
                switch(h) {
                  default:
                    if (0 == g || 3 == g && 29 == b || 2 == g || 29 == b || 4 == g) {
                      switch(h) {
                        case 96:
                        case 34:
                        case 39:
                          0 == b || 29 == b ? (a.string.length && (console.log("IN ARRAY AND FIXING?"), a.className = a.string, a.string = ""), ya(h) ? a.value_type = 4 : (ma = h, ba = !0)) : r("fault while parsing; quote not at start of field name", h);
                          break;
                        case 10:
                          z.line++, z.col = 1;
                        case 13:
                        case 32:
                        case 8232:
                        case 8233:
                        case 9:
                        case 65279:
                          if (0 === g && 31 === b) {
                            b = 0;
                            0 === g && (J = !0);
                            break;
                          }
                          0 === b || 30 === b ? 0 == g && a.value_type && (J = !0) : 29 === b ? 0 === g ? (b = 0, J = !0) : (a.string.length && console.log("STEP TO NEXT TOKEN."), b = 30) : (F = !1, r("fault while parsing; whitepsace unexpected", h));
                          break;
                        default:
                          if (0 == b && (48 <= h && 57 >= h || 43 == h || 46 == h || 45 == h)) {
                            L = pa = la = na = W = S = fa = !1, a.string = p, ha.n = u, za();
                          } else {
                            if (30 === b && (F = !1, r("fault while parsing; character unexpected", h)), 0 === b) {
                              b = 29, a.value_type = 4, a.string += p;
                            } else {
                              if (0 == a.value_type) {
                                0 !== b && 31 !== b && H(h);
                              } else {
                                if (31 === b || 29 === b) {
                                  a.string += p;
                                } else {
                                  if (2 == g) {
                                    if (29 == b) {
                                      a.string += p;
                                      break;
                                    }
                                    r("Multiple values found in field name", h);
                                  }
                                  3 == g && r("String unexpected", h);
                                }
                              }
                            }
                          }
                      }
                    } else {
                      0 == b && (48 <= h && 57 >= h || 43 == h || 46 == h || 45 == h) ? (L = pa = la = na = W = S = fa = !1, a.string = p, ha.n = u, za()) : 0 == a.value_type ? 0 != b ? H(h) : (b = 31, a.string += p) : 2 == g ? r("Multiple values found in field name", h) : 3 == g ? (4 != a.value_type && (6 != a.value_type && 13 != a.value_type || r("String unexpected", h), H(h)), 30 == b ? Ia() ? (31 == b, a.string = p) : r("String unexpected", h) : 31 == b ? a.string += p : r("String unexpected", 
                      h)) : 1 == g && (30 == b ? (a.className || (a.className = a.string, a.string = ""), a.string += p) : 31 == b && (a.string += p));
                    }
                    break;
                  case 96:
                  case 34:
                  case 39:
                    ya(h) ? (a.value_type = 4, b = 31) : (ma = h, ba = !0);
                    break;
                  case 10:
                    z.line++, z.col = 1;
                  case 32:
                  case 9:
                  case 13:
                  case 8232:
                  case 8233:
                  case 65279:
                    if (31 == b) {
                      if (0 == g) {
                        b = 0;
                        J = !0;
                        break;
                      } else {
                        if (3 == g) {
                          b = 32;
                          break;
                        } else {
                          if (2 == g) {
                            b = 30;
                            break;
                          } else {
                            if (1 == g) {
                              b = 30;
                              break;
                            }
                          }
                        }
                      }
                    }
                    0 != b && 30 != b && (29 == b ? a.string.length && (b = 30) : 31 > b && H(h));
                    break;
                  case 116:
                    0 == b ? b = 1 : 27 == b ? b = 28 : H(h);
                    break;
                  case 114:
                    1 == b ? b = 2 : H(h);
                    break;
                  case 117:
                    2 == b ? b = 3 : 9 == b ? b = 10 : 0 == b ? b = 12 : H(h);
                    break;
                  case 101:
                    3 == b ? (a.value_type = 2, b = 31) : 8 == b ? (a.value_type = 3, b = 31) : 14 == b ? b = 15 : 18 == b ? b = 19 : H(h);
                    break;
                  case 110:
                    0 == b ? b = 9 : 12 == b ? b = 13 : 17 == b ? b = 18 : 22 == b ? b = 23 : 25 == b ? b = 26 : H(h);
                    break;
                  case 100:
                    13 == b ? b = 14 : 19 == b ? (a.value_type = -1, b = 31) : H(h);
                    break;
                  case 105:
                    16 == b ? b = 17 : 24 == b ? b = 25 : 26 == b ? b = 27 : H(h);
                    break;
                  case 108:
                    10 == b ? b = 11 : 11 == b ? (a.value_type = 1, b = 31) : 6 == b ? b = 7 : H(h);
                    break;
                  case 102:
                    0 == b ? b = 5 : 15 == b ? b = 16 : 23 == b ? b = 24 : H(h);
                    break;
                  case 97:
                    5 == b ? b = 6 : 20 == b ? b = 21 : H(h);
                    break;
                  case 115:
                    7 == b ? b = 8 : H(h);
                    break;
                  case 73:
                    0 == b ? b = 22 : H(h);
                    break;
                  case 78:
                    0 == b ? b = 20 : 21 == b ? (a.value_type = Q ? 7 : 8, Q = !1, b = 31) : H(h);
                    break;
                  case 121:
                    28 == b ? (a.value_type = Q ? 9 : 10, Q = !1, b = 31) : H(h);
                    break;
                  case 45:
                    0 == b ? Q = !Q : H(h);
                }
            }
            if (J) {
              31 == b && (b = 0);
              break;
            }
          }
        }
        u == Z.length ? (Ca.push(ha), ba || q || 2 == g ? sa = 0 : 0 != g || 0 == a.value_type && !da || (J = !0, sa = 1)) : (ha.n = u, G.unshift(ha), sa = 2);
        if (J) {
          ea = null;
          break;
        }
      }
      if (!F) {
        return -1;
      }
      J && 0 != a.value_type && (b = 0, da = qa(), Q = !1, a.string = "", a.value_type = 0);
      J = !1;
      return sa;
    }};
  };
  const Aa = [Object.freeze(exports.begin())];
  var Ja = 0;
  exports.parse = function(c, k) {
    var n = Ja++;
    Aa.length <= n && Aa.push(Object.freeze(exports.begin()));
    n = Aa[n];
    "string" !== typeof c && (c = String(c));
    n.reset();
    c = n._write(c, !0);
    if (0 < c) {
      n = n.value();
      if ("undefined" === typeof n && 1 < c) {
        throw Error("Pending value could not complete");
      }
      n = "function" === typeof k ? function p(z, u) {
        var w, b = z[u];
        if (b && "object" === typeof b) {
          for (w in b) {
            if (Object.prototype.hasOwnProperty.call(b, w)) {
              var F = p(b, w);
              void 0 !== F ? b[w] = F : delete b[w];
            }
          }
        }
        console.log("SO this calls deeply?", u, b);
        return k.call(z, u, b);
      }({"":n}, "") : n;
      Ja--;
      return n;
    }
    n.finalError();
  };
  N.set(Object.prototype, {external:!1, name:Object.prototype.constructor.name, cb:null});
  N.set(Date.prototype, {external:!1, name:"Date", cb:function() {
    var c = -this.getTimezoneOffset(), k = 0 <= c ? "+" : "-", n = function(a) {
      a = Math.floor(Math.abs(a));
      return (10 > a ? "0" : "") + a;
    };
    return [this.getFullYear(), "-", n(this.getMonth() + 1), "-", n(this.getDate()), "T", n(this.getHours()), ":", n(this.getMinutes()), ":", n(this.getSeconds()), "." + function(a) {
      a = Math.floor(Math.abs(a));
      return (100 > a ? "0" : "") + (10 > a ? "0" : "") + a;
    }(this.getMilliseconds()) + k, n(c / 60), ":", n(c % 60)].join("");
  }});
  N.set(Boolean.prototype, {external:!1, name:"Boolean", cb:Da});
  N.set(Number.prototype, {external:!1, name:"Number", cb:function() {
    return isNaN(this) ? "NaN" : isFinite(this) ? String(this) : 0 > this ? "-Infinity" : "Infinity";
  }});
  N.set(String.prototype, {external:!1, name:"String", cb:function() {
    return '"' + exports.escape(Da.apply(this)) + '"';
  }});
  "function" === typeof BigInt && N.set(BigInt.prototype, {external:!1, name:"BigInt", cb:function() {
    return this + "n";
  }});
  N.set(ArrayBuffer.prototype, {external:!0, name:"ab", cb:function() {
    return "[" + ca(this) + "]";
  }});
  N.set(Uint8Array.prototype, {external:!0, name:"u8", cb:function() {
    return "[" + ca(this.buffer) + "]";
  }});
  N.set(Uint8ClampedArray.prototype, {external:!0, name:"uc8", cb:function() {
    return "[" + ca(this.buffer) + "]";
  }});
  N.set(Int8Array.prototype, {external:!0, name:"s8", cb:function() {
    return "[" + ca(this.buffer) + "]";
  }});
  N.set(Uint16Array.prototype, {external:!0, name:"u16", cb:function() {
    return "[" + ca(this.buffer) + "]";
  }});
  N.set(Int16Array.prototype, {external:!0, name:"s16", cb:function() {
    return "[" + ca(this.buffer) + "]";
  }});
  N.set(Uint32Array.prototype, {external:!0, name:"u32", cb:function() {
    return "[" + ca(this.buffer) + "]";
  }});
  N.set(Int32Array.prototype, {external:!0, name:"s32", cb:function() {
    return "[" + ca(this.buffer) + "]";
  }});
  N.set(Float32Array.prototype, {external:!0, name:"f32", cb:function() {
    return "[" + ca(this.buffer) + "]";
  }});
  N.set(Float64Array.prototype, {external:!0, name:"f64", cb:function() {
    return "[" + ca(this.buffer) + "]";
  }});
  N.set(Float64Array.prototype, {external:!0, name:"f64", cb:function() {
    return "[" + ca(this.buffer) + "]";
  }});
  N.set(Map.prototype, Fa = {external:!0, name:"map", cb:null});
  ka.set("map", {protoCon:Map.constructor, cb:function(c, k) {
    c && this.set(c, k);
    return this;
  }});
  N.set(Array.prototype, ua = {external:!1, name:Array.prototype.constructor.name, cb:null});
  exports.defineClass = function(c, k) {
    for (var n = Object.keys(k), a = 1; a < n.length; a++) {
      var z, u;
      (z = n[a - 1]) > (u = n[a]) && (n[a - 1] = u, n[a] = z, a ? a -= 2 : a--);
    }
    wa.push(c = {name:c, tag:n.toString(), proto:Object.getPrototypeOf(k), fields:Object.keys(k)});
    for (k = 1; k < c.fields.length; k++) {
      c.fields[k] < c.fields[k - 1] && (n = c.fields[k - 1], c.fields[k - 1] = c.fields[k], c.fields[k] = n, 1 < k && (k -= 2));
    }
    c.proto === Object.getPrototypeOf({}) && (c.proto = null);
  };
  exports.toJSOX = exports.registerToJSOX = function(c, k, n) {
    if (k.prototype && k.prototype === Object.prototype) {
      k = Object.keys(k).toString();
      if (va.get(k)) {
        throw Error("Existing toJSOX has been registered for object type");
      }
      va.set(k, {external:!0, name:c, cb:n});
    } else {
      if (N.get(k.prototype)) {
        throw Error("Existing toJSOX has been registered for prototype");
      }
      N.set(k.prototype, {external:!0, name:c || n.constructor.name, cb:n});
    }
  };
  exports.fromJSOX = function(c, k, n) {
    function a() {
    }
    k || (k = a.prototype);
    if (ka.get(c)) {
      throw Error("Existing fromJSOX has been registered for prototype");
    }
    if (k && !("constructor" in k)) {
      throw Error("Please pass a prototype like thing...");
    }
    ka.set(c, {protoCon:k.prototype.constructor, cb:n});
  };
  exports.registerFromJSOX = function(c, k) {
    throw Error("deprecated; please adjust code to use fromJSOX:" + c + k.toString());
  };
  exports.addType = function(c, k, n, a) {
    exports.toJSOX(c, k, n);
    exports.fromJSOX(c, k, a);
  };
  exports.registerToFrom = function(c, k) {
    throw Error("registerToFrom deprecated; please use addType:" + c + k.toString());
  };
  exports.stringifier = function() {
    function c(l) {
      if (null !== l) {
        var m = u.get(l);
        if (m) {
          return m;
        }
        u.set(l, _JSON.stringify(p));
      }
    }
    function k(l, m) {
      var t, O = Object.getPrototypeOf(l);
      if (t = a.find(v => {
        if (v.proto && v.proto === O) {
          return !0;
        }
      })) {
        return t;
      }
      if (a.length || wa.length) {
        if (m) {
          m = m.map(v => {
            if ("string" === typeof v) {
              return v;
            }
          });
          var I = m.toString();
        } else {
          l = Object.keys(l);
          for (m = 1; m < l.length; m++) {
            var A;
            (t = l[m - 1]) > (A = l[m]) && (l[m - 1] = A, l[m] = t, m ? m -= 2 : m--);
          }
          I = l.toString();
        }
        (t = a.find(v => {
          if (v.tag === I) {
            return !0;
          }
        })) || (t = wa.find(v => {
          if (v.tag === I) {
            return !0;
          }
        }));
      }
      return t;
    }
    function n(l, m, t) {
      function O(L) {
        return isNaN(L) ? L in Oa || /([0-9-])/.test(L[0]) || /((\n|\r|\t)|[ {}()<>!+*/.:,-])/.test(L) ? z + exports.escape(L) + z : L : ["'", L.toString(), "'"].join("");
      }
      function I(L, S) {
        function la() {
          var D = [];
          let V = p.length;
          for (let J = 0; J < this.length; J += 1) {
            p[V] = J, D[J] = I(J, this) || "null";
          }
          p.length = V;
          w.length = V;
          return 0 === D.length ? "[]" : v ? ["[\n", v, D.join(",\n" + v), "\n", ma, "]"].join("") : "[" + D.join(",") + "]";
        }
        function pa() {
          var D = {tmp:null}, V = "{", J = !0, W, na;
          for ([W, na] of this) {
            D.tmp = na;
            var d = p.length;
            p[d] = W;
            V += (J ? "" : ",") + O(W) + ":" + I("tmp", D);
            p.length = d;
            J = !1;
          }
          return V + "}";
        }
        A && (ua.cb = la, Fa.cb = pa, A = !1);
        ua.cb = la;
        var G, ma = v;
        let ba = p.length;
        var q = S[L];
        "object" === typeof q && null !== q && ja && !Q.find(D => D === q) && (Q.push(q), w[ba] = q, q = ja.apply(q, [ea]), Q.pop(), w.length = ba);
        var K = void 0 !== q && null !== q && (b.get(Object.getPrototypeOf(q)) || N.get(Object.getPrototypeOf(q)) || null);
        var M = !K && void 0 !== q && null !== q && (F.get(Object.keys(q).toString()) || va.get(Object.keys(q).toString()) || null);
        var P = K && K.cb || M && M.cb;
        if (void 0 !== q && null !== q && "function" === typeof P) {
          v += fa;
          if ("object" === typeof q && (G = c(q))) {
            return "ref" + G;
          }
          q = P.apply(q);
          v = ma;
        } else {
          if ("object" === typeof q && (G = c(q))) {
            return "ref" + G;
          }
        }
        "function" === typeof B && (q = B.call(S, L, q));
        switch(typeof q) {
          case "string":
          case "number":
            var C = "";
            "" === L && (C = a.map(D => D.name + "{" + D.fields.join(",") + "}").join(v ? "\n" : "") + (v ? "\n" : ""));
            return K && K.external ? C + K.name + q : M && M.external ? C + M.name + q : C + q;
          case "boolean":
          case "null":
            return String(q);
          case "object":
            if (G) {
              return "ref" + G;
            }
            if (!q) {
              return "null";
            }
            v += fa;
            M = null;
            S = [];
            if (B && "object" === typeof B) {
              var U = B.length;
              M = k(q, B);
              for (P = 0; P < U; P += 1) {
                "string" === typeof B[P] && (C = B[P], p[ba] = C, (G = I(C, q)) && (M ? S.push(G) : S.push(O(C) + (v ? ": " : ":") + G)));
              }
            } else {
              M = k(q);
              P = [];
              for (C in q) {
                if ((!da || Object.prototype.propertyIsEnumerable.call(q, C)) && Object.prototype.hasOwnProperty.call(q, C)) {
                  for (U = 0; U < P.length; U++) {
                    if (P[U] > C) {
                      P.splice(U, 0, C);
                      break;
                    }
                  }
                  U == P.length && P.push(C);
                }
              }
              for (U = 0; U < P.length; U++) {
                C = P[U], Object.prototype.hasOwnProperty.call(q, C) && (p[ba] = C, (G = I(C, q)) && (M ? S.push(G) : S.push(O(C) + (v ? ": " : ":") + G)));
              }
            }
            p.splice(ba, 1);
            C = "" === L ? a.map(D => D.name + "{" + D.fields.join(",") + "}").join(v ? "\n" : "") + (v ? "\n" : "") : "";
            K && K.external && (C = "" === L ? C + K.name : C + '"' + K.name + '"');
            L = null;
            M && (L = O(M.name));
            G = C + (0 === S.length ? "{}" : v ? (M ? L : "") + "{\n" + v + S.join(",\n" + v) + "\n" + ma + "}" : (M ? L : "") + "{" + S.join(",") + "}");
            v = ma;
            return G;
        }
      }
      if (void 0 === l) {
        return "undefined";
      }
      if (null !== l) {
        var A = !0, v, B;
        var g = typeof t;
        var R = typeof m;
        var fa = v = "";
        if ("number" === g) {
          for (g = 0; g < t; g += 1) {
            fa += " ";
          }
        } else {
          "string" === g && (fa = t);
        }
        if ((B = m) && "function" !== R && ("object" !== R || "number" !== typeof m.length)) {
          throw Error("JSOX.stringify");
        }
        p.length = 0;
        u = new WeakMap;
        return I("", {"":l});
      }
    }
    var a = [], z = '"';
    let u = new WeakMap;
    const p = [];
    var w = [];
    const b = new WeakMap, F = new Map;
    let ja = null;
    const Q = [];
    let da = !1;
    const ea = {defineClass(l, m) {
      for (var t = Object.keys(m), O = 1; O < t.length; O++) {
        var I, A;
        (I = t[O - 1]) > (A = t[O]) && (t[O - 1] = A, t[O] = I, O ? O -= 2 : O--);
      }
      a.push(l = {name:l, tag:t.toString(), proto:Object.getPrototypeOf(m), fields:Object.keys(m)});
      for (m = 1; m < l.fields.length; m++) {
        l.fields[m] < l.fields[m - 1] && (t = l.fields[m - 1], l.fields[m - 1] = l.fields[m], l.fields[m] = t, 1 < m && (m -= 2));
      }
      l.proto === Object.getPrototypeOf({}) && (l.proto = null);
    }, setDefaultObjectToJSOX(l) {
      ja = l;
    }, isEncoding(l) {
      return !!w.find((m, t) => m === l && t < w.length - 1);
    }, encodeObject(l) {
      return ja ? ja.apply(l, [this]) : l;
    }, stringify(l, m, t) {
      return n(l, m, t);
    }, setQuote(l) {
      z = l;
    }, registerToJSOX(l, m, t) {
      if (m.prototype && m.prototype !== Object.prototype) {
        if (b.get(m)) {
          throw Error("Existing toJSOX has been registered for prototype");
        }
        b.set(m, {external:!0, name:l || t.constructor.name, cb:t});
      } else {
        m = Object.keys(m).toString();
        if (F.get(m)) {
          throw Error("Existing toJSOX has been registered for object type");
        }
        F.set(m, {external:!0, name:l, cb:t});
      }
    }, get ignoreNonEnumerable() {
      return da;
    }, set ignoreNonEnumerable(l) {
      da = l;
    }, };
    return ea;
  };
  const ia = {"~":-1, "=":-1, $:62, _:63, "+":62, "-":62, ".":62, "/":63, ",":63};
  for (var ta = 0; 256 > ta; ta++) {
    64 > ta && (ia["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[ta]] = ta);
  }
  Object.freeze(ia);
  exports.stringify = function(c, k, n) {
    return exports.stringifier().stringify(c, k, n);
  };
  [[0, 256, [16767487, 16739071, 130048, 3670016, 0, 16777208, 16777215, 8388607]]].map(c => ({firstChar:c[0], lastChar:c[1], bits:c[2]}));
}
privateizeEverything();


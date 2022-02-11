'use strict';
const _JSON = JSON, JSOX = exports;
JSOX.version = "1.2.113";
function privateizeEverything() {
  function Ba() {
    let c = ra.pop();
    c || (c = {context:0, current_proto:null, current_class:null, current_class_field:0, arrayType:-1, valueType:0, elements:null});
    return c;
  }
  function Ka() {
    let c = Ca.pop();
    c ? c.n = 0 : c = {buf:null, n:0};
    return c;
  }
  function Da() {
    return this && this.valueOf();
  }
  function ba(c) {
    let m = "";
    c = new Uint8Array(c);
    var r = c.byteLength;
    let a = r % 3;
    r -= a;
    let B, y, x;
    for (let b = 0; b < r; b += 3) {
      var w = c[b] << 16 | c[b + 1] << 8 | c[b + 2];
      B = (w & 16515072) >> 18;
      y = (w & 258048) >> 12;
      x = (w & 4032) >> 6;
      w &= 63;
      m += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$_"[B] + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$_"[y] + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$_"[x] + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$_"[w];
    }
    1 == a ? (w = c[r], m += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$_"[(w & 252) >> 2] + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$_"[(w & 3) << 4] + "==") : 2 == a && (w = c[r] << 8 | c[r + 1], m += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$_"[(w & 64512) >> 10] + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$_"[(w & 1008) >> 4] + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$_"[(w & 15) << 2] + 
    "=");
    return m;
  }
  function Ea(c) {
    let m = new ArrayBuffer(1 == c.length % 4 ? 3 * ((c.length + 3) / 4 | 0) - 3 : 2 == c.length % 4 ? 3 * ((c.length + 3) / 4 | 0) - 2 : 3 == c.length % 4 ? 3 * ((c.length + 3) / 4 | 0) - 1 : -1 == ja[c[c.length - 3]] ? 3 * ((c.length + 3) / 4 | 0) - 3 : -1 == ja[c[c.length - 2]] ? 3 * ((c.length + 3) / 4 | 0) - 2 : -1 == ja[c[c.length - 1]] ? 3 * ((c.length + 3) / 4 | 0) - 1 : 3 * ((c.length + 3) / 4 | 0)), r = new Uint8Array(m), a, B = c.length + 3 >> 2;
    for (a = 0; a < B; a++) {
      let y = ja[c[4 * a]], x = 4 * a + 1 < c.length ? ja[c[4 * a + 1]] : -1, w = 0 <= x && 4 * a + 2 < c.length ? ja[c[4 * a + 2]] : -1, b = 0 <= w && 4 * a + 3 < c.length ? ja[c[4 * a + 3]] : -1;
      0 <= x && (r[3 * a] = y << 2 | x >> 4);
      0 <= w && (r[3 * a + 1] = x << 4 | w >> 2 & 15);
      0 <= b && (r[3 * a + 2] = w << 6 | b & 63);
    }
    return m;
  }
  const La = "function" === typeof BigInt, Ma = "ab u8 cu8 s8 u16 s16 u32 s32 u64 s64 f32 f64".split(" ");
  let Fa = null, va = null;
  const Na = [ArrayBuffer, Uint8Array, Uint8ClampedArray, Int8Array, Uint16Array, Int16Array, Uint32Array, Int32Array, null, null, Float32Array, Float64Array], Oa = {["true"]:!0, ["false"]:!1, ["null"]:null, ["NaN"]:NaN, ["Infinity"]:Infinity, ["undefined"]:void 0};
  class wa extends Date {
    constructor(c, m) {
      super(c);
      this.ns = m || 0;
    }
  }
  JSOX.DateNS = wa;
  const ra = [], Ca = [];
  JSOX.escape = function(c) {
    let m, r = "";
    if (!c) {
      return c;
    }
    for (m = 0; m < c.length; m++) {
      if ('"' == c[m] || "\\" == c[m] || "`" == c[m] || "'" == c[m]) {
        r += "\\";
      }
      r += c[m];
    }
    return r;
  };
  let F = new WeakMap, ua = new Map, fa = new Map, oa = [];
  JSOX.reset = function() {
    F = new WeakMap;
    ua = new Map;
    fa = new Map;
    oa = [];
  };
  JSOX.begin = function(c, m) {
    function r(f) {
      throw Error(`${f} at ${y} [${B.line}:${B.col}]`);
    }
    const a = {name:null, value_type:0, string:"", contains:null, className:null, }, B = {line:1, col:1};
    let y = 0, x, w = new Map, b = 0, C = !0, pa = !1, N = !1, ca = null, da = null, A = void 0, g = {first:null, last:null, saved:null, push(f) {
      let z = this.saved;
      z ? (this.saved = z.next, z.node = f, z.next = null, z.prior = this.last) : z = {node:f, next:null, prior:this.last};
      this.last ? this.last.next = z : this.first = z;
      this.last = z;
      this.length++;
    }, pop() {
      let f = this.last;
      (this.last = f.prior) || (this.first = null);
      f.next = this.saved;
      this.last && (this.last.next = null);
      f.next || (f.first = null);
      this.saved = f;
      this.length--;
      return f.node;
    }, length:0, }, n = [], p = null, k = null, L = 0, q = -1, h = 0, O = 0, ka = !1, ha = !1, V = !1, U = !1, qa = !1, Z = {first:null, last:null, saved:null, push(f) {
      let z = this.saved;
      z ? (this.saved = z.next, z.node = f, z.next = null, z.prior = this.last) : z = {node:f, next:null, prior:this.last};
      this.last ? this.last.next = z : this.first = z;
      this.last = z;
    }, shift() {
      let f = this.first;
      if (!f) {
        return null;
      }
      (this.first = f.next) || (this.last = null);
      f.next = this.saved;
      this.saved = f;
      return f.node;
    }, unshift(f) {
      let z = this.saved;
      this.saved = z.next;
      z.node = f;
      z.next = this.first;
      z.prior = null;
      this.first || (this.last = z);
      this.first = z;
    }}, I = null, aa = !1, Y = !1, t = !1, G = !1, R = !1, J = !1, H = !1, Q = 0, E = 0, K = !1, P = !1, la = !1;
    return {fromJSOX(f, z, u) {
      function W() {
      }
      if (w.get(f)) {
        throw Error("Existing fromJSOX has been registered for prototype");
      }
      z || (z = W);
      if (z && !("constructor" in z)) {
        throw Error("Please pass a prototype like thing...");
      }
      w.set(f, {protoCon:z.prototype.constructor, cb:u});
    }, registerFromJSOX(f, z) {
      throw Error("registerFromJSOX is deprecated, please update to use fromJSOX instead:" + f + z.toString());
    }, finalError() {
      0 !== O && (1 === O && r("Comment began at end of document"), 3 === O && r("Open comment '/*' is missing close at end of document"), 4 === O && r("Incomplete '/* *' close at end of document"));
      aa && r("Incomplete string");
    }, value() {
      this.finalError();
      let f = ca;
      ca = void 0;
      return f;
    }, reset() {
      b = 0;
      C = !0;
      Z.last && (Z.last.next = Z.save);
      Z.save = Z.first;
      Z.first = Z.last = null;
      g.last && (g.last.next = g.save);
      g.length = 0;
      g.save = Z.first;
      g.first = g.last = null;
      A = void 0;
      h = 0;
      n = [];
      k = p = null;
      L = 0;
      a.value_type = 0;
      a.name = null;
      a.string = "";
      a.className = null;
      B.line = 1;
      B.col = 1;
      N = !1;
      O = 0;
      P = G = t = aa = K = !1;
    }, usePrototype(f, z) {
    }, write(f) {
      "string" !== typeof f && "undefined" !== typeof f && (f = String(f));
      if (!C) {
        throw Error("Parser is still in an error state, please reset before resuming");
      }
      for (f = this._write(f, !1); 0 < f && !("function" === typeof m && function sa(u, W) {
        let ma, ia, D = u[W];
        if (D && "object" === typeof D) {
          for (ma in D) {
            Object.prototype.hasOwnProperty.call(D, ma) && (ia = sa(D, ma), void 0 !== ia ? D[ma] = ia : delete D[ma]);
          }
        }
        return m.call(u, W, D);
      }({"":ca}, ""), ca = c(ca), 2 > f); f = this._write()) {
      }
    }, _write(f, z) {
      function u(d, e) {
        throw Error(`${d} '${String.fromCodePoint(e)}' unexpected at ${y} (near '${X.substr(4 < y ? y - 4 : 0, 4 < y ? 3 : y - 1)}[${String.fromCodePoint(e)}]${X.substr(y, 10)}') [${B.line}:${B.col}]`);
      }
      function W() {
        a.value_type = 0;
        a.string = "";
        a.contains = null;
      }
      function sa() {
        switch(a.value_type) {
          case 5:
            !(13 < a.string.length || 13 == a.string.length && "2" < a[0]) || P || qa || U || ha || (la = !0);
            if (la) {
              if (La) {
                return BigInt(a.string);
              }
              throw Error("no builtin BigInt()", 0);
            }
            if (P) {
              var d = a.string.matches(/\.(\d.*)/);
              if (4 > d.length) {
                return d = new Date(a.string), isNaN(d.getTime()) && u("Bad Date format", l), d;
              }
              for (d = d.splice(0, 3); 6 > d.length;) {
                d += "0";
              }
              d = new wa(a.string, Number(d));
              isNaN(d.getTime()) && u("Bad DateNS format", l);
              return d;
            }
            return (N ? -1 : 1) * Number(a.string);
          case 4:
            if (a.className) {
              (d = w.get(a.className)) || (d = fa.get(a.className));
              if (d && d.cb) {
                return a.className = null, d.cb.call(a.string);
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
            return a.className && ((d = w.get(a.className)) || (d = fa.get(a.className)), a.className = null, d && d.cb) ? a.contains = d.cb.call(a.contains) : a.contains;
          case 13:
            if (0 <= q) {
              d = a.contains.length ? Ea(a.contains[0]) : Ea(a.string);
              if (0 === q) {
                return q = -1, d;
              }
              d = new Na[q](d);
              q = -1;
              return d;
            }
            if (-2 === q) {
              d = da;
              var e;
              const v = a.contains.length;
              for (e = 0; e < v; e++) {
                const T = a.contains[e];
                let M = d[T];
                if (!M) {
                  e = g.first;
                  let S = 0;
                  for (; e && S < v && S < g.length;) {
                    const na = a.contains[S];
                    if (na in d) {
                      break;
                    }
                    if (e.next) {
                      if ("number" === typeof na) {
                        const xa = e.next.node.elements, Pa = e.next.node.elements;
                        if (xa && na >= xa.length) {
                          if (S === Pa.length - 1) {
                            console.log("This is actually at the current object so use that"), M = A;
                          } else {
                            if (e.next.next && na === xa.length) {
                              M = e.next.next.node.elements;
                              e = e.next;
                              S++;
                              d = M;
                              continue;
                            }
                            M = A;
                            S++;
                          }
                          break;
                        }
                      } else {
                        if (na !== e.next.node.name) {
                          M = e.next.node.elements[na];
                          break;
                        } else {
                          M = 13 === e.next.node.valueType ? e.next.node.elements_array : e.next.node.elements[na];
                        }
                      }
                    } else {
                      M = M[na];
                    }
                    e = e.next;
                    S++;
                  }
                  e = S < v ? S - 1 : S;
                }
                if (!M) {
                  throw Error("Path did not resolve properly:" + a.contains + " at " + T + "(" + e + ")");
                }
                d = M;
              }
              q = -3;
              return d;
            }
            return a.className && ((d = w.get(a.className)) || (d = fa.get(a.className)), a.className = null, d && d.cb) ? d.cb.call(a.contains) : a.contains;
          default:
            console.log("Unhandled value conversion.", a);
        }
      }
      function ma() {
        if (-3 == q) {
          6 === a.value_type && A.push(a.contains), q = -1;
        } else {
          switch(a.value_type) {
            case 12:
              A.push(void 0);
              delete A[A.length - 1];
              break;
            default:
              A.push(sa());
          }
          W();
        }
      }
      function ia() {
        if (-3 === q && 13 === a.value_type) {
          W(), q = -1;
        } else {
          if (12 !== a.value_type) {
            !a.name && k && (a.name = k.fields[L++]);
            var d = sa();
            p && p.protoDef && p.protoDef.cb ? (d = p.protoDef.cb.call(A, a.name, d)) && (A[a.name] = d) : A[a.name] = d;
            W();
          }
        }
      }
      function D(d) {
        if (0 !== b) {
          N && u("Negative outside of quotes, being converted to a string (would lose count of leading '-' characters)", d);
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
                  u("Negative outside of quotes, being converted to a string", d);
                  break;
                case 8:
                  a.string += "NaN";
                  break;
                case 7:
                  a.string += "-NaN";
                  u("Negative outside of quotes, being converted to a string", d);
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
              u("String-keyword recovery fail (after whitespace)", d);
          }
          a.value_type = 4;
          29 > b && (b = 31);
        } else {
          b = 31, a.value_type = 4;
        }
        123 == d ? Ga() : 91 == d ? Ha() : 44 != d && 32 != d && 13 != d && 10 != d && 9 != d && 65279 != d && 8232 != d && 8233 != d && (44 == d || 125 == d || 93 == d || 58 == d ? u("Invalid character near identifier", d) : a.string += x);
      }
      function ya(d) {
        let e = 0;
        for (; 0 == e && y < X.length;) {
          x = X.charAt(y);
          let v = X.codePointAt(y++);
          65536 <= v && (x += X.charAt(y), y++);
          B.col++;
          if (v == d) {
            t ? (H ? u("Incomplete hexidecimal sequence", v) : J ? u("Incomplete long unicode sequence", v) : R && u("Incomplete unicode sequence", v), G ? (G = !1, e = 1) : a.string += x, t = !1) : e = 1;
          } else {
            if (t) {
              if (R) {
                125 == v ? (a.string += String.fromCodePoint(Q), t = J = R = !1) : (Q *= 16, 48 <= v && 57 >= v ? Q += v - 48 : 65 <= v && 70 >= v ? Q += v - 65 + 10 : 97 <= v && 102 >= v ? Q += v - 97 + 10 : (u("(escaped character, parsing hex of \\u)", v), e = -1, t = R = !1));
              } else {
                if (H || J) {
                  if (0 === E && 123 === v) {
                    R = !0;
                    continue;
                  }
                  if (2 > E || J && 4 > E) {
                    Q *= 16;
                    if (48 <= v && 57 >= v) {
                      Q += v - 48;
                    } else {
                      if (65 <= v && 70 >= v) {
                        Q += v - 65 + 10;
                      } else {
                        if (97 <= v && 102 >= v) {
                          Q += v - 97 + 10;
                        } else {
                          u(J ? "(escaped character, parsing hex of \\u)" : "(escaped character, parsing hex of \\x)", v);
                          e = -1;
                          t = H = !1;
                          continue;
                        }
                      }
                    }
                    E++;
                    J ? 4 == E && (a.string += String.fromCodePoint(Q), t = J = !1) : 2 == E && (a.string += String.fromCodePoint(Q), t = H = !1);
                    continue;
                  }
                }
                switch(v) {
                  case 13:
                    G = !0;
                    B.col = 1;
                    continue;
                  case 8232:
                  case 8233:
                    B.col = 1;
                  case 10:
                    G ? G = !1 : B.col = 1;
                    B.line++;
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
                  case 118:
                    a.string += "\v";
                    break;
                  case 48:
                    a.string += "\x00";
                    break;
                  case 120:
                    H = !0;
                    Q = E = 0;
                    continue;
                  case 117:
                    J = !0;
                    Q = E = 0;
                    continue;
                  default:
                    a.string += x;
                }
                t = !1;
              }
            } else {
              92 === v ? t ? (a.string += "\\", t = !1) : (t = !0, E = Q = 0) : (G && (G = !1, B.line++, B.col = 2), a.string += x);
            }
          }
        }
        return e;
      }
      function za() {
        let d;
        for (; (d = y) < X.length;) {
          x = X.charAt(d);
          let e = X.codePointAt(y++);
          if (256 <= e) {
            y = d;
            break;
          } else {
            if (95 != e) {
              if (B.col++, 48 <= e && 57 >= e) {
                V && (qa = !0), a.string += x;
              } else {
                if (45 == e || 43 == e) {
                  0 == a.string.length || V && !U && !qa ? (45 != e || V || (N = !N), a.string += x, U = !0) : (a.string += x, P = !0);
                } else {
                  if (78 == e) {
                    if (0 == b) {
                      Y = !1;
                      b = 20;
                      return;
                    }
                    u("fault while parsing number;", e);
                    break;
                  } else {
                    if (73 == e) {
                      if (0 == b) {
                        Y = !1;
                        b = 22;
                        return;
                      }
                      u("fault while parsing number;", e);
                      break;
                    } else {
                      if (58 == e && P) {
                        a.string += x, P = !0;
                      } else {
                        if (84 == e && P) {
                          a.string += x, P = !0;
                        } else {
                          if (90 == e && P) {
                            a.string += x, P = !0;
                          } else {
                            if (46 == e) {
                              if (ha || ka || V) {
                                C = !1;
                                u("fault while parsing number;", e);
                                break;
                              } else {
                                a.string += x, ha = !0;
                              }
                            } else {
                              if (110 == e) {
                                la = !0;
                                break;
                              } else {
                                if (ka && (95 <= e && 102 >= e || 65 <= e && 70 >= e)) {
                                  a.string += x;
                                } else {
                                  if (120 == e || 98 == e || 111 == e || 88 == e || 66 == e || 79 == e) {
                                    if (ka || "0" != a.string) {
                                      C = !1;
                                      u("fault while parsing number;", e);
                                      break;
                                    } else {
                                      ka = !0, a.string += x;
                                    }
                                  } else {
                                    if (101 == e || 69 == e) {
                                      if (V) {
                                        C = !1;
                                        u("fault while parsing number;", e);
                                        break;
                                      } else {
                                        a.string += x, V = !0;
                                      }
                                    } else {
                                      32 == e || 13 == e || 10 == e || 9 == e || 47 == e || 35 == e || 44 == e || 125 == e || 93 == e || 123 == e || 91 == e || 34 == e || 39 == e || 96 == e || 58 == e ? y = d : z && (C = !1, u("fault while parsing number;", e));
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
        }
        z || y != X.length ? (Y = !1, a.value_type = 5, 0 == h && (K = !0)) : Y = !0;
      }
      function Ga() {
        let d = 2, e = null, v = {};
        0 < b && 29 > b && D(123);
        let T;
        T = Ia();
        if (0 == h) {
          if (29 == b || 31 == b && (T || a.string.length)) {
            T && T.protoDef && T.protoDef.protoCon && (v = new T.protoDef.protoCon);
            if (!T || !T.protoDef && a.string) {
              if (e = n.find(S => S.name === a.string)) {
                pa ? (e.fields.length = 0, d = 4) : (v = new e.protoCon, d = 5);
              } else {
                function S() {
                }
                n.push(e = {name:a.string, protoCon:T && T.protoDef && T.protoDef.protoCon || S.constructor, fields:[]});
                d = 4;
              }
              pa = !1;
            }
            k = e;
            b = 0;
          } else {
            b = 29;
          }
        } else {
          if (29 == b || 1 === h || 3 === h || 5 == h) {
            if (0 != b || 4 == a.value_type) {
              if (T && T.protoDef) {
                v = new T.protoDef.protoCon;
              } else {
                if (e = n.find(S => S.name === a.string)) {
                  d = 5, v = {};
                } else {
                  function S() {
                  }
                  w.set(a.string, {protoCon:S.prototype.constructor, cb:null});
                  v = new S;
                }
              }
            }
            b = 0;
          } else {
            if (2 == h && 0 == b) {
              return u("fault while parsing; getting field name unexpected ", l), C = !1;
            }
          }
        }
        let M = Ba();
        a.value_type = 6;
        0 === h ? A = v : 1 == h || 3 != h && 5 != h || (!a.name && k && (a.name = k.fields[L++]), A[a.name] = v);
        M.context = h;
        M.elements = A;
        M.name = a.name;
        M.current_proto = p;
        M.current_class = k;
        M.current_class_field = L;
        M.valueType = a.value_type;
        M.arrayType = q;
        M.className = a.className;
        a.className = null;
        a.name = null;
        p = T;
        k = e;
        L = 0;
        A = v;
        da || (da = A);
        g.push(M);
        W();
        h = d;
        return !0;
      }
      function Ha() {
        0 < b && 29 > b && D(91);
        if (31 == b && a.string.length) {
          var d = Ma.findIndex(v => v === a.string);
          0 <= d ? (b = 0, q = d, a.className = a.string, a.string = null) : "ref" === a.string ? (a.className = null, q = -2) : w.get(a.string) ? a.className = a.string : fa.get(a.string) ? a.className = a.string : u(`Unknown type '${a.string}' specified for array`, l);
        } else {
          if (2 == h || 29 == b || 30 == b) {
            return u("Fault while parsing; while getting field name unexpected", l), C = !1;
          }
        }
        d = Ba();
        a.value_type = 13;
        let e = [];
        if (0 == h) {
          A = e;
        } else {
          if (1 == h) {
            -1 == q && A.push(e);
          } else {
            if (3 == h) {
              if (a.name || (console.log("This says it's resolved......."), q = -3), p && p.protoDef) {
                if (p.protoDef.cb) {
                  const v = p.protoDef.cb.call(A, a.name, e);
                  void 0 !== v && (e = A[a.name] = v);
                } else {
                  A[a.name] = e;
                }
              } else {
                A[a.name] = e;
              }
            }
          }
        }
        d.context = h;
        d.elements = A;
        d.name = a.name;
        d.current_proto = p;
        d.current_class = k;
        d.current_class_field = L;
        d.valueType = a.value_type;
        d.arrayType = -1 == q ? -3 : q;
        d.className = a.className;
        q = -1;
        a.className = null;
        k = p = a.name = null;
        L = 0;
        A = e;
        da || (da = e);
        g.push(d);
        W();
        h = 1;
        return !0;
      }
      function Ia() {
        const d = {protoDef:null, cls:null};
        (d.protoDef = w.get(a.string)) ? a.className || (a.className = a.string, a.string = null) : (d.protoDef = fa.get(a.string)) && !a.className && (a.className = a.string, a.string = null);
        a.string && (d.cls = n.find(e => e.name === a.string));
        return d.protoDef || d.cls ? d : null;
      }
      let l, ea, X, ta = 0;
      if (!C) {
        return -1;
      }
      f && f.length ? (ea = Ka(), ea.buf = f, Z.push(ea)) : (Y && (Y = !1, a.value_type = 5, 0 == h && (K = !0), ta = 1), 0 !== h && u("Unclosed object at end of stream.", l));
      for (; C && (ea = Z.shift());) {
        y = ea.n;
        X = ea.buf;
        aa && (f = ya(I), 0 > f ? C = !1 : 0 < f && (aa = !1, C && (a.value_type = 4)));
        for (Y && za(); !K && C && y < X.length;) {
          if (x = X.charAt(y), l = X.codePointAt(y++), 65536 <= l && (x += X.charAt(y), y++), B.col++, O) {
            if (1 == O) {
              if (42 == l) {
                O = 3;
              } else {
                if (47 != l) {
                  return u("fault while parsing;", l);
                }
                O = 2;
              }
            } else {
              if (2 == O) {
                if (10 == l || 13 == l) {
                  O = 0;
                }
              } else {
                3 == O ? 42 == l && (O = 4) : O = 47 == l ? 0 : 3;
              }
            }
          } else {
            switch(l) {
              case 47:
                O = 1;
                break;
              case 123:
                Ga();
                break;
              case 91:
                Ha();
                break;
              case 58:
                5 == h ? (b = 0, a.name = a.string, a.string = "", a.value_type = 0) : 2 == h || 4 == h ? 4 == h ? Object.keys(A).length || (console.log("This is a full object, not a class def...", a.className), f = () => {
                }, w.set(g.last.node.current_class.name, {protoCon:f.prototype.constructor, cb:null}), A = new f, h = 3, a.name = a.string, b = 0, a.string = "", a.value_type = 0, console.log("don't do default;s do a revive...")) : (0 != b && 31 != b && 29 != b && 30 != b && D(32), b = 0, a.name = a.string, a.string = "", h = 2 === h ? 3 : 6, a.value_type = 0) : 0 == h ? (console.log("Override colon found, allow class redefinition", h), pa = !0) : (1 == h ? u("(in array, got colon out of string):parsing fault;", 
                l) : 3 == h ? u("String unexpected", l) : u("(outside any object, got colon out of string):parsing fault;", l), C = !1);
                break;
              case 125:
                31 == b && (b = 0);
                4 == h ? k ? (a.string && k.fields.push(a.string), W(), f = g.pop(), b = h = 0, a.name = f.name, A = f.elements, k = f.current_class, L = f.current_class_field, q = f.arrayType, a.value_type = f.valueType, a.className = f.className, da = null, ra.push(f)) : u("State error; gathering class fields, and lost the class", l) : 2 == h || 5 == h ? (0 != a.value_type && (k && (a.name = k.fields[L++]), ia()), a.value_type = 6, p && p.protoDef && (console.log("SOMETHING SHOULD AHVE BEEN REPLACED HERE??", 
                p), console.log("The other version only revives on init"), A = new p.protoDef.cb(A, void 0, void 0)), a.contains = A, a.string = "", f = g.pop(), h = f.context, a.name = f.name, A = f.elements, k = f.current_class, p = f.current_proto, L = f.current_class_field, q = f.arrayType, a.value_type = f.valueType, a.className = f.className, ra.push(f), 0 == h && (K = !0)) : 3 == h ? (0 === a.value_type && u("Fault while parsing; unexpected", l), ia(), a.value_type = 6, a.contains = A, b = 
                0, f = g.pop(), h = f.context, a.name = f.name, A = f.elements, p = f.current_proto, k = f.current_class, L = f.current_class_field, q = f.arrayType, a.value_type = f.valueType, a.className = f.className, ra.push(f), 0 == h && (K = !0)) : (u("Fault while parsing; unexpected", l), C = !1);
                N = !1;
                break;
              case 93:
                30 <= b && (b = 0);
                1 == h ? (0 != a.value_type && (a.name && console.log("Ya this should blow up"), ma()), a.contains = A, f = g.pop(), a.name = f.name, a.className = f.className, h = f.context, A = f.elements, p = f.current_proto, k = f.current_class, L = f.current_class_field, q = f.arrayType, a.value_type = f.valueType, ra.push(f), a.value_type = 13, 0 == h && (K = !0)) : (u(`bad context ${h}; fault while parsing`, l), C = !1);
                N = !1;
                break;
              case 44:
                30 > b && 0 != b && D(l);
                if (31 == b || 29 == b) {
                  b = 0;
                }
                4 == h ? k ? (k.fields.push(a.string), a.string = "", b = 29) : u("State error; gathering class fields, and lost the class", l) : 2 == h ? k ? (a.name = k.fields[L++], 0 != a.value_type && (ia(), W())) : (a.string || a.value_type) && u("State error; comma in field name and/or lost the class", l) : 5 == h ? (k ? (-3 == q || a.name || (a.name = k.fields[L++]), 0 != a.value_type && (-3 != q && ia(), W())) : 0 != a.value_type && (ia(), W()), a.name = null) : 1 == h ? (0 == a.value_type && 
                (a.value_type = 12), ma(), W(), b = 0) : 3 == h && 0 != a.value_type ? (h = 2, 0 != a.value_type && (ia(), W()), b = 0) : (C = !1, u("bad context; excessive commas while parsing;", l));
                N = !1;
                break;
              default:
                switch(l) {
                  default:
                    if (0 == h || 3 == h && 29 == b || 2 == h || 29 == b || 4 == h) {
                      switch(l) {
                        case 96:
                        case 34:
                        case 39:
                          0 == b || 29 == b ? (a.string.length && (console.log("IN ARRAY AND FIXING?"), a.className = a.string, a.string = ""), ya(l) ? a.value_type = 4 : (I = l, aa = !0)) : u("fault while parsing; quote not at start of field name", l);
                          break;
                        case 10:
                          B.line++, B.col = 1;
                        case 13:
                        case 32:
                        case 8232:
                        case 8233:
                        case 9:
                        case 65279:
                          if (0 === h && 31 === b) {
                            b = 0;
                            0 === h && (K = !0);
                            break;
                          }
                          0 === b || 30 === b ? 0 == h && a.value_type && (K = !0) : 29 === b ? 0 === h ? (b = 0, K = !0) : (a.string.length && console.log("STEP TO NEXT TOKEN."), b = 30) : (C = !1, u("fault while parsing; whitepsace unexpected", l));
                          break;
                        default:
                          if (0 == b && (48 <= l && 57 >= l || 43 == l || 46 == l || 45 == l)) {
                            ha = qa = U = la = P = V = ka = !1, a.string = x, ea.n = y, za();
                          } else {
                            if (30 === b && (C = !1, u("fault while parsing; character unexpected", l)), 0 === b) {
                              b = 29, a.value_type = 4, a.string += x;
                            } else {
                              if (0 == a.value_type) {
                                0 !== b && 31 !== b && D(l);
                              } else {
                                if (31 === b || 29 === b) {
                                  a.string += x;
                                } else {
                                  if (2 == h) {
                                    if (29 == b) {
                                      a.string += x;
                                      break;
                                    }
                                    u("Multiple values found in field name", l);
                                  }
                                  3 == h && u("String unexpected", l);
                                }
                              }
                            }
                          }
                      }
                    } else {
                      0 == b && (48 <= l && 57 >= l || 43 == l || 46 == l || 45 == l) ? (ha = qa = U = la = P = V = ka = !1, a.string = x, ea.n = y, za()) : 0 == a.value_type ? 0 != b ? D(l) : (b = 31, a.string += x, a.value_type = 4) : 2 == h ? u("Multiple values found in field name", l) : 3 == h ? (4 != a.value_type && (6 != a.value_type && 13 != a.value_type || u("String unexpected", l), D(l)), 30 == b ? Ia() ? (31 == b, a.string = x) : u("String unexpected", l) : 31 == b ? a.string += x : u("String unexpected", 
                      l)) : 1 == h && (30 == b ? (a.className || (a.className = a.string, a.string = ""), a.string += x) : 31 == b && (a.string += x));
                    }
                    break;
                  case 96:
                  case 34:
                  case 39:
                    a.string && (a.className = a.string);
                    a.string = "";
                    ya(l) ? (a.value_type = 4, b = 31) : (I = l, aa = !0);
                    break;
                  case 10:
                    B.line++, B.col = 1;
                  case 32:
                  case 9:
                  case 13:
                  case 8232:
                  case 8233:
                  case 65279:
                    if (31 == b) {
                      if (0 == h) {
                        b = 0;
                        K = !0;
                        break;
                      } else {
                        if (3 == h) {
                          b = 32;
                          break;
                        } else {
                          if (2 == h) {
                            b = 30;
                            break;
                          } else {
                            if (1 == h) {
                              b = 30;
                              break;
                            }
                          }
                        }
                      }
                    }
                    0 != b && 30 != b && (29 == b ? a.string.length && (b = 30) : 31 > b && D(l));
                    break;
                  case 116:
                    0 == b ? b = 1 : 27 == b ? b = 28 : D(l);
                    break;
                  case 114:
                    1 == b ? b = 2 : D(l);
                    break;
                  case 117:
                    2 == b ? b = 3 : 9 == b ? b = 10 : 0 == b ? b = 12 : D(l);
                    break;
                  case 101:
                    3 == b ? (a.value_type = 2, b = 31) : 8 == b ? (a.value_type = 3, b = 31) : 14 == b ? b = 15 : 18 == b ? b = 19 : D(l);
                    break;
                  case 110:
                    0 == b ? b = 9 : 12 == b ? b = 13 : 17 == b ? b = 18 : 22 == b ? b = 23 : 25 == b ? b = 26 : D(l);
                    break;
                  case 100:
                    13 == b ? b = 14 : 19 == b ? (a.value_type = -1, b = 31) : D(l);
                    break;
                  case 105:
                    16 == b ? b = 17 : 24 == b ? b = 25 : 26 == b ? b = 27 : D(l);
                    break;
                  case 108:
                    10 == b ? b = 11 : 11 == b ? (a.value_type = 1, b = 31) : 6 == b ? b = 7 : D(l);
                    break;
                  case 102:
                    0 == b ? b = 5 : 15 == b ? b = 16 : 23 == b ? b = 24 : D(l);
                    break;
                  case 97:
                    5 == b ? b = 6 : 20 == b ? b = 21 : D(l);
                    break;
                  case 115:
                    7 == b ? b = 8 : D(l);
                    break;
                  case 73:
                    0 == b ? b = 22 : D(l);
                    break;
                  case 78:
                    0 == b ? b = 20 : 21 == b ? (a.value_type = N ? 7 : 8, N = !1, b = 31) : D(l);
                    break;
                  case 121:
                    28 == b ? (a.value_type = N ? 9 : 10, N = !1, b = 31) : D(l);
                    break;
                  case 45:
                    0 == b ? N = !N : D(l);
                    break;
                  case 43:
                    0 !== b && D(l);
                }
            }
            if (K) {
              31 == b && (b = 0);
              break;
            }
          }
        }
        y == X.length ? (Ca.push(ea), aa || Y || 2 == h ? ta = 0 : 0 != h || 0 == a.value_type && !ca || (K = !0, ta = 1)) : (ea.n = y, Z.unshift(ea), ta = 2);
        if (K) {
          da = null;
          break;
        }
      }
      if (!C) {
        return -1;
      }
      K && 0 != a.value_type && (b = 0, ca = sa(), N = !1, a.string = "", a.value_type = 0);
      K = !1;
      return ta;
    }};
  };
  const Aa = [Object.freeze(JSOX.begin())];
  let Ja = 0;
  JSOX.parse = function(c, m) {
    var r = Ja++;
    Aa.length <= r && Aa.push(Object.freeze(JSOX.begin()));
    r = Aa[r];
    "string" !== typeof c && (c = String(c));
    r.reset();
    c = r._write(c, !0);
    if (0 < c) {
      r = r.value();
      if ("undefined" === typeof r && 1 < c) {
        throw Error("Pending value could not complete");
      }
      r = "function" === typeof m ? function x(B, y) {
        let w, b, C = B[y];
        if (C && "object" === typeof C) {
          for (w in C) {
            Object.prototype.hasOwnProperty.call(C, w) && (b = x(C, w), void 0 !== b ? C[w] = b : delete C[w]);
          }
        }
        return m.call(B, y, C);
      }({"":r}, "") : r;
      Ja--;
      return r;
    }
    r.finalError();
  };
  JSOX.defineClass = function(c, m) {
    var r = Object.keys(m);
    for (let a = 1; a < r.length; a++) {
      let B, y;
      (B = r[a - 1]) > (y = r[a]) && (r[a - 1] = y, r[a] = B, a ? a -= 2 : a--);
    }
    oa.push(c = {name:c, tag:r.toString(), proto:Object.getPrototypeOf(m), fields:Object.keys(m)});
    for (m = 1; m < c.fields.length; m++) {
      c.fields[m] < c.fields[m - 1] && (r = c.fields[m - 1], c.fields[m - 1] = c.fields[m], c.fields[m] = r, 1 < m && (m -= 2));
    }
    c.proto === Object.getPrototypeOf({}) && (c.proto = null);
  };
  JSOX.toJSOX = JSOX.registerToJSOX = function(c, m, r) {
    if (m.prototype && m.prototype === Object.prototype) {
      m = Object.keys(m).toString();
      if (ua.get(m)) {
        throw Error("Existing toJSOX has been registered for object type");
      }
      ua.set(m, {external:!0, name:c, cb:r});
    } else {
      if (F.get(m.prototype)) {
        throw Error("Existing toJSOX has been registered for prototype");
      }
      F.set(m.prototype, {external:!0, name:c || r.constructor.name, cb:r});
    }
  };
  JSOX.fromJSOX = function(c, m, r) {
    function a() {
    }
    m || (m = a.prototype);
    if (fa.get(c)) {
      throw Error("Existing fromJSOX has been registered for prototype");
    }
    if (m && !("constructor" in m)) {
      throw Error("Please pass a prototype like thing...");
    }
    fa.set(c, {protoCon:m.prototype.constructor, cb:r});
  };
  JSOX.registerFromJSOX = function(c, m) {
    throw Error("deprecated; please adjust code to use fromJSOX:" + c + m.toString());
  };
  JSOX.addType = function(c, m, r, a) {
    JSOX.toJSOX(c, m, r);
    JSOX.fromJSOX(c, m, a);
  };
  JSOX.registerToFrom = function(c, m) {
    throw Error("registerToFrom deprecated; please use addType:" + c + m.toString());
  };
  JSOX.stringifier = function() {
    function c(g) {
      return isNaN(g) ? g in Oa || /([0-9-])/.test(g[0]) || /((\n|\r|\t)|[ {}()<>!+*/.:,-])/.test(g) ? y + JSOX.escape(g) + y : g : ["'", g.toString(), "'"].join("");
    }
    function m(g) {
      if (null !== g) {
        var n = x.get(g);
        if (n) {
          return n;
        }
        x.set(g, _JSON.stringify(w));
      }
    }
    function r(g, n) {
      let p;
      var k;
      let L = Object.getPrototypeOf(g);
      if (k = B.find(q => {
        if (q.proto && q.proto === L) {
          return !0;
        }
      })) {
        return k;
      }
      if (B.length || oa.length) {
        if (n) {
          n = n.map(q => {
            if ("string" === typeof q) {
              return q;
            }
          }), p = n.toString();
        } else {
          g = Object.keys(g);
          for (n = 1; n < g.length; n++) {
            let q;
            (k = g[n - 1]) > (q = g[n]) && (g[n - 1] = q, g[n] = k, n ? n -= 2 : n--);
          }
          p = g.toString();
        }
        (k = B.find(q => {
          if (q.tag === p) {
            return !0;
          }
        })) || (k = oa.find(q => {
          if (q.tag === p) {
            return !0;
          }
        }));
      }
      return k;
    }
    function a(g, n, p) {
      function k(V, U) {
        function qa() {
          let E = [], K = w.length;
          for (let P = 0; P < this.length; P += 1) {
            w[K] = P, E[P] = k(P, this) || "null";
          }
          w.length = K;
          b.length = K;
          return 0 === E.length ? "[]" : q ? ["[\n", q, E.join(",\n" + q), "\n", aa, "]"].join("") : "[" + E.join(",") + "]";
        }
        function Z() {
          let E = {tmp:null}, K = "{", P = !0;
          for (let [la, f] of this) {
            E.tmp = f;
            let z = w.length;
            w[z] = la;
            K += (P ? "" : ",") + c(la) + ":" + k("tmp", E);
            w.length = z;
            P = !1;
          }
          return K + "}";
        }
        L && (Fa.cb = qa, va.cb = Z, L = !1);
        var I;
        let aa = q;
        let Y = w.length, t = U[V];
        "object" === typeof t && null !== t && N && !ca.find(E => E === t) && (ca.push(t), b[Y] = t, t = N.apply(t, [A]), ca.pop(), b.length = Y);
        var G = void 0 !== t && null !== t && Object.getPrototypeOf(t);
        G = G && (C.get(G) || F.get(G) || null);
        var R = !G && void 0 !== t && null !== t && (pa.get(Object.keys(t).toString()) || ua.get(Object.keys(t).toString()) || null);
        var J = G && G.cb || R && R.cb;
        if (void 0 !== t && null !== t && "function" === typeof J) {
          q += ha;
          if ("object" === typeof t && (I = m(t))) {
            return "ref" + I;
          }
          t = J.call(t, A);
          q = aa;
        } else {
          if ("object" === typeof t && (I = m(t))) {
            return "ref" + I;
          }
        }
        "function" === typeof h && (t = h.call(U, V, t));
        switch(typeof t) {
          case "bigint":
            return t + "n";
          case "string":
          case "number":
            var H = "";
            "" === V && (H = B.map(E => E.name + "{" + E.fields.join(",") + "}").join(q ? "\n" : "") + oa.map(E => E.name + "{" + E.fields.join(",") + "}").join(q ? "\n" : "") + (q ? "\n" : ""));
            return G && G.external ? H + G.name + t : R && R.external ? H + R.name + t : H + t;
          case "boolean":
          case "null":
            return String(t);
          case "object":
            if (I) {
              return "ref" + I;
            }
            if (!t) {
              return "null";
            }
            q += ha;
            U = null;
            R = [];
            if (h && "object" === typeof h) {
              var Q = h.length;
              U = r(t, h);
              for (J = 0; J < Q; J += 1) {
                "string" === typeof h[J] && (H = h[J], w[Y] = H, (I = k(H, t)) && (U ? R.push(I) : R.push(c(H) + (q ? ": " : ":") + I)));
              }
            } else {
              U = r(t);
              J = [];
              for (H in t) {
                if ((!da || Object.prototype.propertyIsEnumerable.call(t, H)) && Object.prototype.hasOwnProperty.call(t, H)) {
                  for (I = 0; I < J.length; I++) {
                    if (J[I] > H) {
                      J.splice(I, 0, H);
                      break;
                    }
                  }
                  I == J.length && J.push(H);
                }
              }
              for (Q = 0; Q < J.length; Q++) {
                H = J[Q], Object.prototype.hasOwnProperty.call(t, H) && (w[Y] = H, (I = k(H, t)) && (U ? R.push(I) : R.push(c(H) + (q ? ": " : ":") + I)));
              }
            }
            w.splice(Y, 1);
            V = "" === V ? (B.map(E => E.name + "{" + E.fields.join(",") + "}").join(q ? "\n" : "") || oa.map(E => E.name + "{" + E.fields.join(",") + "}").join(q ? "\n" : "")) + (q ? "\n" : "") : "";
            G && G.external && (V += c(G.name));
            G = null;
            U && (G = c(U.name));
            I = V + (0 === R.length ? "{}" : q ? (U ? G : "") + "{\n" + q + R.join(",\n" + q) + "\n" + aa + "}" : (U ? G : "") + "{" + R.join(",") + "}");
            q = aa;
            return I;
        }
      }
      if (void 0 === g) {
        return "undefined";
      }
      if (null !== g) {
        var L = !0, q, h;
        var O = typeof p;
        var ka = typeof n;
        var ha = q = "";
        if ("number" === O) {
          for (O = 0; O < p; O += 1) {
            ha += " ";
          }
        } else {
          "string" === O && (ha = p);
        }
        if ((h = n) && "function" !== ka && ("object" !== ka || "number" !== typeof n.length)) {
          throw Error("JSOX.stringify");
        }
        w.length = 0;
        x = new WeakMap;
        g = k("", {"":g});
        oa.length = 0;
        return g;
      }
    }
    let B = [], y = '"', x = new WeakMap;
    const w = [];
    let b = [];
    const C = new WeakMap, pa = new Map;
    let N = null;
    const ca = [];
    let da = !1;
    F.get(Object.prototype) || (F.set(Object.prototype, {external:!1, name:Object.prototype.constructor.name, cb:null}), F.set(Date.prototype, {external:!1, name:"Date", cb:function() {
      let g = -this.getTimezoneOffset(), n = 0 <= g ? "+" : "-", p = function(k) {
        k = Math.floor(Math.abs(k));
        return (10 > k ? "0" : "") + k;
      };
      return [this.getFullYear(), "-", p(this.getMonth() + 1), "-", p(this.getDate()), "T", p(this.getHours()), ":", p(this.getMinutes()), ":", p(this.getSeconds()), "." + function(k) {
        k = Math.floor(Math.abs(k));
        return (100 > k ? "0" : "") + (10 > k ? "0" : "") + k;
      }(this.getMilliseconds()) + n, p(g / 60), ":", p(g % 60)].join("");
    }}), F.set(wa.prototype, {external:!1, name:"DateNS", cb:function() {
      let g = -this.getTimezoneOffset(), n = 0 <= g ? "+" : "-", p = function(k) {
        k = Math.floor(Math.abs(k));
        return (10 > k ? "0" : "") + k;
      };
      return [this.getFullYear(), "-", p(this.getMonth() + 1), "-", p(this.getDate()), "T", p(this.getHours()), ":", p(this.getMinutes()), ":", p(this.getSeconds()), "." + function(k) {
        k = Math.floor(Math.abs(k));
        return (100 > k ? "0" : "") + (10 > k ? "0" : "") + k;
      }(this.getMilliseconds()) + function(k) {
        k = Math.floor(Math.abs(k));
        return (100000 > k ? "0" : "") + (10000 > k ? "0" : "") + (1000 > k ? "0" : "") + (100 > k ? "0" : "") + (10 > k ? "0" : "") + k;
      }(this.ns) + n, p(g / 60), ":", p(g % 60)].join("");
    }}), F.set(Boolean.prototype, {external:!1, name:"Boolean", cb:Da}), F.set(Number.prototype, {external:!1, name:"Number", cb:function() {
      return isNaN(this) ? "NaN" : isFinite(this) ? String(this) : 0 > this ? "-Infinity" : "Infinity";
    }}), F.set(String.prototype, {external:!1, name:"String", cb:function() {
      return '"' + JSOX.escape(Da.apply(this)) + '"';
    }}), "function" === typeof BigInt && F.set(BigInt.prototype, {external:!1, name:"BigInt", cb:function() {
      return this + "n";
    }}), F.set(ArrayBuffer.prototype, {external:!0, name:"ab", cb:function() {
      return "[" + c(ba(this)) + "]";
    }}), F.set(Uint8Array.prototype, {external:!0, name:"u8", cb:function() {
      return "[" + c(ba(this.buffer)) + "]";
    }}), F.set(Uint8ClampedArray.prototype, {external:!0, name:"uc8", cb:function() {
      return "[" + c(ba(this.buffer)) + "]";
    }}), F.set(Int8Array.prototype, {external:!0, name:"s8", cb:function() {
      return "[" + c(ba(this.buffer)) + "]";
    }}), F.set(Uint16Array.prototype, {external:!0, name:"u16", cb:function() {
      return "[" + c(ba(this.buffer)) + "]";
    }}), F.set(Int16Array.prototype, {external:!0, name:"s16", cb:function() {
      return "[" + c(ba(this.buffer)) + "]";
    }}), F.set(Uint32Array.prototype, {external:!0, name:"u32", cb:function() {
      return "[" + c(ba(this.buffer)) + "]";
    }}), F.set(Int32Array.prototype, {external:!0, name:"s32", cb:function() {
      return "[" + c(ba(this.buffer)) + "]";
    }}), F.set(Float32Array.prototype, {external:!0, name:"f32", cb:function() {
      return "[" + c(ba(this.buffer)) + "]";
    }}), F.set(Float64Array.prototype, {external:!0, name:"f64", cb:function() {
      return "[" + c(ba(this.buffer)) + "]";
    }}), F.set(Float64Array.prototype, {external:!0, name:"f64", cb:function() {
      return "[" + c(ba(this.buffer)) + "]";
    }}), F.set(RegExp.prototype, va = {external:!0, name:"regex", cb:function(g, n) {
      return "'" + escape(this.source) + "'";
    }}), fa.set("regex", {protoCon:RegExp, cb:function(g, n) {
      return new RegExp(this);
    }}), F.set(Map.prototype, va = {external:!0, name:"map", cb:null}), fa.set("map", {protoCon:Map, cb:function(g, n) {
      if (g) {
        this.set(g, n);
      } else {
        return this;
      }
    }}), F.set(Array.prototype, Fa = {external:!1, name:Array.prototype.constructor.name, cb:null}));
    const A = {defineClass(g, n) {
      var p = Object.keys(n);
      for (let k = 1; k < p.length; k++) {
        let L, q;
        (L = p[k - 1]) > (q = p[k]) && (p[k - 1] = q, p[k] = L, k ? k -= 2 : k--);
      }
      B.push(g = {name:g, tag:p.toString(), proto:Object.getPrototypeOf(n), fields:Object.keys(n)});
      for (n = 1; n < g.fields.length; n++) {
        g.fields[n] < g.fields[n - 1] && (p = g.fields[n - 1], g.fields[n - 1] = g.fields[n], g.fields[n] = p, 1 < n && (n -= 2));
      }
      g.proto === Object.getPrototypeOf({}) && (g.proto = null);
    }, setDefaultObjectToJSOX(g) {
      N = g;
    }, isEncoding(g) {
      return !!b.find((n, p) => n === g && p < b.length - 1);
    }, encodeObject(g) {
      return N ? N.apply(g, [this]) : g;
    }, stringify(g, n, p) {
      return a(g, n, p);
    }, setQuote(g) {
      y = g;
    }, registerToJSOX(g, n, p) {
      return this.toJSOX(g, n, p);
    }, toJSOX(g, n, p) {
      if (n.prototype && n.prototype !== Object.prototype) {
        if (C.get(n.prototype)) {
          throw Error("Existing toJSOX has been registered for prototype");
        }
        C.set(n.prototype, {external:!0, name:g || p.constructor.name, cb:p});
      } else {
        n = Object.keys(n).toString();
        if (pa.get(n)) {
          throw Error("Existing toJSOX has been registered for object type");
        }
        pa.set(n, {external:!0, name:g, cb:p});
      }
    }, get ignoreNonEnumerable() {
      return da;
    }, set ignoreNonEnumerable(g) {
      da = g;
    }, };
    return A;
  };
  const ja = {"~":-1, "=":-1, $:62, _:63, "+":62, "-":62, ".":62, "/":63, ",":63};
  for (let c = 0; 256 > c; c++) {
    64 > c && (ja["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$_"[c]] = c);
  }
  Object.freeze(ja);
  JSOX.stringify = function(c, m, r) {
    return JSOX.stringifier().stringify(c, m, r);
  };
  [[0, 256, [16767487, 16739071, 130048, 3670016, 0, 16777208, 16777215, 8388607]]].map(c => ({firstChar:c[0], lastChar:c[1], bits:c[2]}));
}
privateizeEverything();


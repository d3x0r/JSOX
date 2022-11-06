const _JSON = JSON, JSOX = exports;
JSOX.version = "1.2.116";
function privateizeEverything() {
  function Aa() {
    let c = ta.pop();
    c ||= {context:0, current_proto:null, current_class:null, current_class_field:0, arrayType:-1, valueType:0, elements:null};
    return c;
  }
  function Ja() {
    let c = Ba.pop();
    c ? c.n = 0 : c = {buf:null, n:0};
    return c;
  }
  function Ca() {
    return this && this.valueOf();
  }
  function da(c) {
    let m = "";
    c = new Uint8Array(c);
    var t = c.byteLength;
    let a = t % 3;
    t -= a;
    let C, x, y;
    for (let b = 0; b < t; b += 3) {
      var w = c[b] << 16 | c[b + 1] << 8 | c[b + 2];
      C = (w & 16515072) >> 18;
      x = (w & 258048) >> 12;
      y = (w & 4032) >> 6;
      w &= 63;
      m += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$_"[C] + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$_"[x] + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$_"[y] + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$_"[w];
    }
    1 == a ? (w = c[t], m += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$_"[(w & 252) >> 2] + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$_"[(w & 3) << 4] + "==") : 2 == a && (w = c[t] << 8 | c[t + 1], m += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$_"[(w & 64512) >> 10] + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$_"[(w & 1008) >> 4] + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$_"[(w & 15) << 2] + 
    "=");
    return m;
  }
  function Da(c) {
    let m = new ArrayBuffer(1 == c.length % 4 ? 3 * ((c.length + 3) / 4 | 0) - 3 : 2 == c.length % 4 ? 3 * ((c.length + 3) / 4 | 0) - 2 : 3 == c.length % 4 ? 3 * ((c.length + 3) / 4 | 0) - 1 : -1 == ka[c[c.length - 3]] ? 3 * ((c.length + 3) / 4 | 0) - 3 : -1 == ka[c[c.length - 2]] ? 3 * ((c.length + 3) / 4 | 0) - 2 : -1 == ka[c[c.length - 1]] ? 3 * ((c.length + 3) / 4 | 0) - 1 : 3 * ((c.length + 3) / 4 | 0)), t = new Uint8Array(m), a, C = c.length + 3 >> 2;
    for (a = 0; a < C; a++) {
      let x = ka[c[4 * a]], y = 4 * a + 1 < c.length ? ka[c[4 * a + 1]] : -1, w = 0 <= y && 4 * a + 2 < c.length ? ka[c[4 * a + 2]] : -1, b = 0 <= w && 4 * a + 3 < c.length ? ka[c[4 * a + 3]] : -1;
      0 <= y && (t[3 * a] = x << 2 | y >> 4);
      0 <= w && (t[3 * a + 1] = y << 4 | w >> 2 & 15);
      0 <= b && (t[3 * a + 2] = w << 6 | b & 63);
    }
    return m;
  }
  const Ka = "function" === typeof BigInt, La = "ab u8 cu8 s8 u16 s16 u32 s32 u64 s64 f32 f64".split(" ");
  let Ea = null, wa = null;
  const Ma = [ArrayBuffer, Uint8Array, Uint8ClampedArray, Int8Array, Uint16Array, Int16Array, Uint32Array, Int32Array, null, null, Float32Array, Float64Array], Na = {["true"]:!0, ["false"]:!1, ["null"]:null, NaN, Infinity, undefined:void 0};
  class xa extends Date {
    constructor(c, m) {
      super(c);
      this.ns = m || 0;
    }
  }
  JSOX.DateNS = xa;
  const ta = [], Ba = [];
  JSOX.escape = function(c) {
    let m, t = "";
    if (!c) {
      return c;
    }
    for (m = 0; m < c.length; m++) {
      if ('"' == c[m] || "\\" == c[m] || "`" == c[m] || "'" == c[m]) {
        t += "\\";
      }
      t += c[m];
    }
    return t;
  };
  let F = new WeakMap(), va = new Map(), ia = new Map(), pa = [];
  JSOX.reset = function() {
    F = new WeakMap();
    va = new Map();
    ia = new Map();
    pa = [];
  };
  JSOX.begin = function(c, m) {
    function t(d) {
      throw Error(`${d} at ${x} [${C.line}:${C.col}]`);
    }
    const a = {name:null, value_type:0, string:"", contains:null, className:null,}, C = {line:1, col:1};
    let x = 0, y, w = new Map(), b = 0, D = !0, qa = !1, N = !1, ea = null, la = null, A = void 0, f = {first:null, last:null, saved:null, push(d) {
      let z = this.saved;
      z ? (this.saved = z.next, z.node = d, z.next = null, z.prior = this.last) : z = {node:d, next:null, prior:this.last};
      this.last ? this.last.next = z : this.first = z;
      this.last = z;
      this.length++;
    }, pop() {
      let d = this.last;
      (this.last = d.prior) || (this.first = null);
      d.next = this.saved;
      this.last && (this.last.next = null);
      d.next || (d.first = null);
      this.saved = d;
      this.length--;
      return d.node;
    }, length:0,}, p = [], q = null, k = null, L = 0, r = -1, h = 0, O = 0, ma = !1, ja = !1, U = !1, T = !1, ra = !1, Z = {first:null, last:null, saved:null, push(d) {
      let z = this.saved;
      z ? (this.saved = z.next, z.node = d, z.next = null, z.prior = this.last) : z = {node:d, next:null, prior:this.last};
      this.last ? this.last.next = z : this.first = z;
      this.last = z;
    }, shift() {
      let d = this.first;
      if (!d) {
        return null;
      }
      (this.first = d.next) || (this.last = null);
      d.next = this.saved;
      this.saved = d;
      return d.node;
    }, unshift(d) {
      let z = this.saved;
      this.saved = z.next;
      z.node = d;
      z.next = this.first;
      z.prior = null;
      this.first || (this.last = z);
      this.first = z;
    }}, I = null, aa = !1, Y = !1, u = !1, G = !1, R = !1, J = !1, H = !1, Q = 0, E = 0, K = !1, P = !1, na = !1;
    return {fromJSOX(d, z, v) {
      function V() {
      }
      if (w.get(d)) {
        throw Error("Existing fromJSOX has been registered for prototype");
      }
      z ||= V;
      if (z && !("constructor" in z)) {
        throw Error("Please pass a prototype like thing...");
      }
      w.set(d, {protoCon:z.prototype.constructor, cb:v});
    }, registerFromJSOX(d, z) {
      throw Error("registerFromJSOX is deprecated, please update to use fromJSOX instead:" + d + z.toString());
    }, finalError() {
      0 !== O && (1 === O && t("Comment began at end of document"), 3 === O && t("Open comment '/*' is missing close at end of document"), 4 === O && t("Incomplete '/* *' close at end of document"));
      aa && t("Incomplete string");
    }, value() {
      this.finalError();
      let d = ea;
      ea = void 0;
      return d;
    }, reset() {
      b = 0;
      D = !0;
      Z.last && (Z.last.next = Z.save);
      Z.save = Z.first;
      Z.first = Z.last = null;
      f.last && (f.last.next = f.save);
      f.length = 0;
      f.save = Z.first;
      f.first = f.last = null;
      A = void 0;
      h = 0;
      p = [];
      k = q = null;
      L = 0;
      a.value_type = 0;
      a.name = null;
      a.string = "";
      a.className = null;
      C.line = 1;
      C.col = 1;
      N = !1;
      O = 0;
      P = G = u = aa = K = !1;
    }, usePrototype(d, z) {
    }, write(d) {
      "string" !== typeof d && "undefined" !== typeof d && (d = String(d));
      if (!D) {
        throw Error("Parser is still in an error state, please reset before resuming");
      }
      for (d = this._write(d, !1); 0 < d && !("function" === typeof m && function oa(v, V) {
        let fa, ba, B = v[V];
        if (B && "object" === typeof B) {
          for (fa in B) {
            Object.prototype.hasOwnProperty.call(B, fa) && (ba = oa(B, fa), void 0 !== ba ? B[fa] = ba : delete B[fa]);
          }
        }
        return m.call(v, V, B);
      }({"":ea}, ""), ea = c(ea), 2 > d); d = this._write()) {
      }
    }, parse(d, z) {
      "string" !== typeof d && (d = String(d));
      this.reset();
      d = this._write(d, !0);
      if (0 < d) {
        let v = this.value();
        if ("undefined" === typeof v && 1 < d) {
          throw Error("Pending value could not complete");
        }
        return v = "function" === typeof z ? function ba(oa, fa) {
          let B, sa, ca = oa[fa];
          if (ca && "object" === typeof ca) {
            for (B in ca) {
              Object.prototype.hasOwnProperty.call(ca, B) && (sa = ba(ca, B), void 0 !== sa ? ca[B] = sa : delete ca[B]);
            }
          }
          return z.call(oa, fa, ca);
        }({"":v}, "") : v;
      }
      this.finalError();
    }, _write(d, z) {
      function v(e, g) {
        throw Error(`${e} '${String.fromCodePoint(g)}' unexpected at ${x} (near '${W.substr(4 < x ? x - 4 : 0, 4 < x ? 3 : x - 1)}[${String.fromCodePoint(g)}]${W.substr(x, 10)}') [${C.line}:${C.col}]`);
      }
      function V() {
        a.value_type = 0;
        a.string = "";
        a.contains = null;
      }
      function oa() {
        switch(a.value_type) {
          case 5:
            !(13 < a.string.length || 13 == a.string.length && "2" < a[0]) || P || ra || T || ja || (na = !0);
            if (na) {
              if (Ka) {
                return BigInt(a.string);
              }
              throw Error("no builtin BigInt()", 0);
            }
            if (P) {
              var e = (e = a.string.match(/\.(\d\d\d\d*)/)) ? e[1] : null;
              if (!e || 4 > e.length) {
                return e = new Date(a.string), isNaN(e.getTime()) && v("Bad Date format", l), e;
              }
              for (e = e.substr(3); 6 > e.length;) {
                e += "0";
              }
              e = new xa(a.string, Number(e));
              isNaN(e.getTime()) && v("Bad DateNS format" + e + e.getTime(), l);
              return e;
            }
            return (N ? -1 : 1) * Number(a.string);
          case 4:
            if (a.className) {
              (e = w.get(a.className)) || (e = ia.get(a.className));
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
            return a.className && ((e = w.get(a.className)) || (e = ia.get(a.className)), a.className = null, e && e.cb) ? a.contains = e.cb.call(a.contains) : a.contains;
          case 13:
            if (0 <= r) {
              e = a.contains.length ? Da(a.contains[0]) : Da(a.string);
              if (0 === r) {
                return r = -1, e;
              }
              e = new Ma[r](e);
              r = -1;
              return e;
            }
            if (-2 === r) {
              var g = la, n;
              e = a.contains.length;
              for (n = 0; n < e; n++) {
                const S = a.contains[n];
                g = g[S];
                if (!g) {
                  n = f.first;
                  let M = 0;
                  for (; n && M < e && M < f.length;) {
                    const X = a.contains[M];
                    if (!n.next || X !== n.next.node.name) {
                      break;
                    }
                    if (n.next) {
                      if ("number" === typeof X) {
                        const ya = n.next.node.elements;
                        if (ya && X >= ya.length) {
                          if (M === f.length - 1) {
                            console.log("This is actually at the current object so use that", M, a.contains, A);
                          } else {
                            if (n.next.next && X === ya.length) {
                              g = n.next.next.node.elements;
                              n = n.next;
                              M++;
                              continue;
                            }
                          }
                          g = A;
                          M++;
                          break;
                        }
                      } else {
                        if (X !== n.next.node.name) {
                          g = n.next.node.elements[X];
                          break;
                        } else {
                          g = n.next.next ? n.next.next.node.elements : A;
                        }
                      }
                    } else {
                      g = g[X];
                    }
                    n = n.next;
                    M++;
                  }
                  n = M < e ? M - 1 : M;
                }
                if (!g) {
                  throw Error("Path did not resolve properly:" + a.contains + " at " + S + "(" + n + ")");
                }
              }
              r = -3;
              return g;
            }
            return a.className && ((e = w.get(a.className)) || (e = ia.get(a.className)), a.className = null, e && e.cb) ? e.cb.call(a.contains) : a.contains;
          default:
            console.log("Unhandled value conversion.", a);
        }
      }
      function fa() {
        if (-3 == r) {
          6 === a.value_type && A.push(a.contains), r = -1;
        } else {
          switch(a.value_type) {
            case 12:
              A.push(void 0);
              delete A[A.length - 1];
              break;
            default:
              A.push(oa());
          }
          V();
        }
      }
      function ba() {
        if (-3 === r && 13 === a.value_type) {
          V(), r = -1;
        } else {
          if (12 !== a.value_type) {
            !a.name && k && (a.name = k.fields[L++]);
            var e = oa();
            q && q.protoDef && q.protoDef.cb ? (e = q.protoDef.cb.call(A, a.name, e)) && (A[a.name] = e) : A[a.name] = e;
            V();
          }
        }
      }
      function B(e) {
        if (0 !== b) {
          N && v("Negative outside of quotes, being converted to a string (would lose count of leading '-' characters)", e);
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
                  v("Negative outside of quotes, being converted to a string", e);
                  break;
                case 8:
                  a.string += "NaN";
                  break;
                case 7:
                  a.string += "-NaN";
                  v("Negative outside of quotes, being converted to a string", e);
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
              a.string += "N";
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
              v("String-keyword recovery fail (after whitespace)", e);
          }
          a.value_type = 4;
          29 > b && (b = 31);
        } else {
          b = 31, a.value_type = 4;
        }
        123 == e ? Fa() : 91 == e ? Ga() : 44 != e && 32 != e && 13 != e && 10 != e && 9 != e && 65279 != e && 8232 != e && 8233 != e && (44 == e || 125 == e || 93 == e || 58 == e ? v("Invalid character near identifier", e) : a.string += y);
      }
      function sa(e) {
        let g = 0;
        for (; 0 == g && x < W.length;) {
          y = W.charAt(x);
          let n = W.codePointAt(x++);
          65536 <= n && (y += W.charAt(x), x++);
          C.col++;
          if (n == e) {
            u ? (H ? v("Incomplete hexidecimal sequence", n) : J ? v("Incomplete long unicode sequence", n) : R && v("Incomplete unicode sequence", n), G ? (G = !1, g = 1) : a.string += y, u = !1) : g = 1;
          } else if (u) {
            if (R) {
              125 == n ? (a.string += String.fromCodePoint(Q), u = J = R = !1) : (Q *= 16, 48 <= n && 57 >= n ? Q += n - 48 : 65 <= n && 70 >= n ? Q += n - 65 + 10 : 97 <= n && 102 >= n ? Q += n - 97 + 10 : (v("(escaped character, parsing hex of \\u)", n), g = -1, u = R = !1));
            } else {
              if (H || J) {
                if (0 === E && 123 === n) {
                  R = !0;
                  continue;
                }
                if (2 > E || J && 4 > E) {
                  Q *= 16;
                  if (48 <= n && 57 >= n) {
                    Q += n - 48;
                  } else if (65 <= n && 70 >= n) {
                    Q += n - 65 + 10;
                  } else if (97 <= n && 102 >= n) {
                    Q += n - 97 + 10;
                  } else {
                    v(J ? "(escaped character, parsing hex of \\u)" : "(escaped character, parsing hex of \\x)", n);
                    g = -1;
                    u = H = !1;
                    continue;
                  }
                  E++;
                  J ? 4 == E && (a.string += String.fromCodePoint(Q), u = J = !1) : 2 == E && (a.string += String.fromCodePoint(Q), u = H = !1);
                  continue;
                }
              }
              switch(n) {
                case 13:
                  G = !0;
                  C.col = 1;
                  continue;
                case 8232:
                case 8233:
                  C.col = 1;
                case 10:
                  G ? G = !1 : C.col = 1;
                  C.line++;
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
                  a.string += y;
              }
              u = !1;
            }
          } else {
            92 === n ? u ? (a.string += "\\", u = !1) : (u = !0, E = Q = 0) : (G && (G = !1, C.line++, C.col = 2), a.string += y);
          }
        }
        return g;
      }
      function ca() {
        let e;
        for (; (e = x) < W.length;) {
          y = W.charAt(e);
          let g = W.codePointAt(x++);
          if (256 <= g) {
            x = e;
            break;
          } else {
            if (95 != g) {
              if (C.col++, 48 <= g && 57 >= g) {
                U && (ra = !0), a.string += y;
              } else if (45 == g || 43 == g) {
                0 == a.string.length || U && !T && !ra ? (45 != g || U || (N = !N), a.string += y, T = !0) : (a.string += y, P = !0);
              } else if (78 == g) {
                if (0 == b) {
                  Y = !1;
                  b = 20;
                  return;
                }
                v("fault while parsing number;", g);
                break;
              } else if (73 == g) {
                if (0 == b) {
                  Y = !1;
                  b = 22;
                  return;
                }
                v("fault while parsing number;", g);
                break;
              } else if (58 == g && P) {
                a.string += y, P = !0;
              } else if (84 == g && P) {
                a.string += y, P = !0;
              } else if (90 == g && P) {
                a.string += y, P = !0;
              } else if (46 == g) {
                if (ja || ma || U) {
                  D = !1;
                  v("fault while parsing number;", g);
                  break;
                } else {
                  a.string += y, ja = !0;
                }
              } else if (110 == g) {
                na = !0;
                break;
              } else if (ma && (95 <= g && 102 >= g || 65 <= g && 70 >= g)) {
                a.string += y;
              } else if (120 == g || 98 == g || 111 == g || 88 == g || 66 == g || 79 == g) {
                if (ma || "0" != a.string) {
                  D = !1;
                  v("fault while parsing number;", g);
                  break;
                } else {
                  ma = !0, a.string += y;
                }
              } else if (101 == g || 69 == g) {
                if (U) {
                  D = !1;
                  v("fault while parsing number;", g);
                  break;
                } else {
                  a.string += y, U = !0;
                }
              } else {
                32 == g || 13 == g || 10 == g || 9 == g || 47 == g || 35 == g || 44 == g || 125 == g || 93 == g || 123 == g || 91 == g || 34 == g || 39 == g || 96 == g || 58 == g ? x = e : z && (D = !1, v("fault while parsing number;", g));
                break;
              }
            }
          }
        }
        z || x != W.length ? (Y = !1, a.value_type = 5, 0 == h && (K = !0)) : Y = !0;
      }
      function Fa() {
        let e = 2, g = null, n = {};
        0 < b && 29 > b && B(123);
        let S;
        S = Ha();
        if (0 == h) {
          if (29 == b || 31 == b && (S || a.string.length)) {
            S && S.protoDef && S.protoDef.protoCon && (n = new S.protoDef.protoCon());
            if (!S || !S.protoDef && a.string) {
              if (g = p.find(X => X.name === a.string)) {
                qa ? (g.fields.length = 0, e = 4) : (n = new g.protoCon(), e = 5);
              } else {
                function X() {
                }
                p.push(g = {name:a.string, protoCon:S && S.protoDef && S.protoDef.protoCon || X.constructor, fields:[]});
                e = 4;
              }
              qa = !1;
            }
            k = g;
            b = 0;
          } else {
            b = 29;
          }
        } else if (29 == b || 1 === h || 3 === h || 5 == h) {
          if (0 != b || 4 == a.value_type) {
            if (S && S.protoDef) {
              n = new S.protoDef.protoCon();
            } else {
              if (g = p.find(X => X.name === a.string)) {
                e = 5, n = {};
              } else {
                function X() {
                }
                w.set(a.string, {protoCon:X.prototype.constructor, cb:null});
                n = new X();
              }
            }
          }
          b = 0;
        } else if (2 == h && 0 == b) {
          return v("fault while parsing; getting field name unexpected ", l), D = !1;
        }
        let M = Aa();
        a.value_type = 6;
        if (0 === h) {
          A = n;
        } else if (1 == h) {
          a.name = A.length;
        } else if (3 == h || 5 == h) {
          !a.name && k && (a.name = k.fields[L++]), A[a.name] = n;
        }
        M.context = h;
        M.elements = A;
        M.name = a.name;
        M.current_proto = q;
        M.current_class = k;
        M.current_class_field = L;
        M.valueType = a.value_type;
        M.arrayType = r;
        M.className = a.className;
        a.className = null;
        a.name = null;
        q = S;
        k = g;
        L = 0;
        A = n;
        la ||= A;
        f.push(M);
        V();
        h = e;
        return !0;
      }
      function Ga() {
        0 < b && 29 > b && B(91);
        if (31 == b && a.string.length) {
          var e = La.findIndex(n => n === a.string);
          0 <= e ? (b = 0, r = e, a.className = a.string, a.string = null) : "ref" === a.string ? (a.className = null, r = -2) : w.get(a.string) ? a.className = a.string : ia.get(a.string) ? a.className = a.string : v(`Unknown type '${a.string}' specified for array`, l);
        } else if (2 == h || 29 == b || 30 == b) {
          return v("Fault while parsing; while getting field name unexpected", l), D = !1;
        }
        e = Aa();
        a.value_type = 13;
        let g = [];
        if (0 == h) {
          A = g;
        } else if (1 == h) {
          -1 == r && A.push(g), a.name = A.length;
        } else if (3 == h) {
          if (a.name || (console.log("This says it's resolved......."), r = -3), q && q.protoDef) {
            if (q.protoDef.cb) {
              const n = q.protoDef.cb.call(A, a.name, g);
              void 0 !== n && (g = A[a.name] = n);
            } else {
              A[a.name] = g;
            }
          } else {
            A[a.name] = g;
          }
        }
        e.context = h;
        e.elements = A;
        e.name = a.name;
        e.current_proto = q;
        e.current_class = k;
        e.current_class_field = L;
        e.valueType = a.value_type;
        e.arrayType = -1 == r ? -3 : r;
        e.className = a.className;
        r = -1;
        a.className = null;
        k = q = a.name = null;
        L = 0;
        A = g;
        la ||= g;
        f.push(e);
        V();
        h = 1;
        return !0;
      }
      function Ha() {
        const e = {protoDef:null, cls:null};
        (e.protoDef = w.get(a.string)) ? a.className || (a.className = a.string, a.string = null) : (e.protoDef = ia.get(a.string)) && !a.className && (a.className = a.string, a.string = null);
        a.string && (e.cls = p.find(g => g.name === a.string));
        return e.protoDef || e.cls ? e : null;
      }
      let l, ha, W, ua = 0;
      if (!D) {
        return -1;
      }
      d && d.length ? (ha = Ja(), ha.buf = d, Z.push(ha)) : (Y && (Y = !1, a.value_type = 5, 0 == h && (K = !0), ua = 1), 0 !== h && v("Unclosed object at end of stream.", l));
      for (; D && (ha = Z.shift());) {
        x = ha.n;
        W = ha.buf;
        aa && (d = sa(I), 0 > d ? D = !1 : 0 < d && (aa = !1, D && (a.value_type = 4)));
        for (Y && ca(); !K && D && x < W.length;) {
          if (y = W.charAt(x), l = W.codePointAt(x++), 65536 <= l && (y += W.charAt(x), x++), C.col++, O) {
            if (1 == O) {
              if (42 == l) {
                O = 3;
              } else {
                if (47 != l) {
                  return v("fault while parsing;", l);
                }
                O = 2;
              }
            } else if (2 == O) {
              if (10 == l || 13 == l) {
                O = 0;
              }
            } else {
              3 == O ? 42 == l && (O = 4) : O = 47 == l ? 0 : 3;
            }
          } else {
            switch(l) {
              case 47:
                O = 1;
                break;
              case 123:
                Fa();
                break;
              case 91:
                Ga();
                break;
              case 58:
                5 == h ? (b = 0, a.name = a.string, a.string = "", a.value_type = 0) : 2 == h || 4 == h ? 4 == h ? Object.keys(A).length || (console.log("This is a full object, not a class def...", a.className), d = () => {
                }, w.set(f.last.node.current_class.name, {protoCon:d.prototype.constructor, cb:null}), A = new d(), h = 3, a.name = a.string, b = 0, a.string = "", a.value_type = 0, console.log("don't do default;s do a revive...")) : (0 != b && 31 != b && 29 != b && 30 != b && B(32), b = 0, a.name = a.string, a.string = "", h = 2 === h ? 3 : 6, a.value_type = 0) : 0 == h ? (console.log("Override colon found, allow class redefinition", h), qa = !0) : (1 == h ? v("(in array, got colon out of string):parsing fault;", 
                l) : 3 == h ? v("String unexpected", l) : v("(outside any object, got colon out of string):parsing fault;", l), D = !1);
                break;
              case 125:
                31 == b && (b = 0);
                4 == h ? k ? (a.string && k.fields.push(a.string), V(), d = f.pop(), b = h = 0, a.name = d.name, A = d.elements, k = d.current_class, L = d.current_class_field, r = d.arrayType, a.value_type = d.valueType, a.className = d.className, la = null, ta.push(d)) : v("State error; gathering class fields, and lost the class", l) : 2 == h || 5 == h ? (0 != a.value_type && (k && (a.name = k.fields[L++]), ba()), a.value_type = 6, q && q.protoDef && (console.log("SOMETHING SHOULD AHVE BEEN REPLACED HERE??", 
                q), console.log("The other version only revives on init"), A = new q.protoDef.cb(A, void 0, void 0)), a.contains = A, a.string = "", d = f.pop(), h = d.context, a.name = d.name, A = d.elements, k = d.current_class, q = d.current_proto, L = d.current_class_field, r = d.arrayType, a.value_type = d.valueType, a.className = d.className, ta.push(d), 0 == h && (K = !0)) : 3 == h ? (0 === a.value_type && v("Fault while parsing; unexpected", l), ba(), a.value_type = 6, a.contains = A, b = 
                0, d = f.pop(), h = d.context, a.name = d.name, A = d.elements, q = d.current_proto, k = d.current_class, L = d.current_class_field, r = d.arrayType, a.value_type = d.valueType, a.className = d.className, ta.push(d), 0 == h && (K = !0)) : (v("Fault while parsing; unexpected", l), D = !1);
                N = !1;
                break;
              case 93:
                30 <= b && (b = 0);
                1 == h ? (0 != a.value_type && fa(), a.contains = A, d = f.pop(), a.name = d.name, a.className = d.className, h = d.context, A = d.elements, q = d.current_proto, k = d.current_class, L = d.current_class_field, r = d.arrayType, a.value_type = d.valueType, ta.push(d), a.value_type = 13, 0 == h && (K = !0)) : (v(`bad context ${h}; fault while parsing`, l), D = !1);
                N = !1;
                break;
              case 44:
                30 > b && 0 != b && B(l);
                if (31 == b || 29 == b) {
                  b = 0;
                }
                4 == h ? k ? (k.fields.push(a.string), a.string = "", b = 29) : v("State error; gathering class fields, and lost the class", l) : 2 == h ? k ? (a.name = k.fields[L++], 0 != a.value_type && (ba(), V())) : (a.string || a.value_type) && v("State error; comma in field name and/or lost the class", l) : 5 == h ? (k ? (-3 == r || a.name || (a.name = k.fields[L++]), 0 != a.value_type && (-3 != r && ba(), V())) : 0 != a.value_type && (ba(), V()), a.name = null) : 1 == h ? (0 == a.value_type && 
                (a.value_type = 12), fa(), V(), b = 0) : 3 == h && 0 != a.value_type ? (h = 2, 0 != a.value_type && (ba(), V()), b = 0) : (D = !1, v("bad context; excessive commas while parsing;", l));
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
                          0 == b || 29 == b ? (a.string.length && (console.log("IN ARRAY AND FIXING?"), a.className = a.string, a.string = ""), sa(l) ? a.value_type = 4 : (I = l, aa = !0)) : v("fault while parsing; quote not at start of field name", l);
                          break;
                        case 10:
                          C.line++, C.col = 1;
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
                          0 === b || 30 === b ? 0 == h && a.value_type && (K = !0) : 29 === b ? 0 === h ? (b = 0, K = !0) : (a.string.length && console.log("STEP TO NEXT TOKEN."), b = 30) : (D = !1, v("fault while parsing; whitepsace unexpected", l));
                          break;
                        default:
                          if (0 == b && (48 <= l && 57 >= l || 43 == l || 46 == l || 45 == l)) {
                            ja = ra = T = na = P = U = ma = !1, a.string = y, ha.n = x, ca();
                          } else {
                            if (30 === b && (D = !1, v("fault while parsing; character unexpected", l)), 0 === b) {
                              b = 29, a.value_type = 4, a.string += y;
                            } else {
                              if (0 == a.value_type) {
                                0 !== b && 31 !== b && B(l);
                              } else {
                                if (31 === b || 29 === b) {
                                  a.string += y;
                                } else {
                                  if (2 == h) {
                                    if (29 == b) {
                                      a.string += y;
                                      break;
                                    }
                                    v("Multiple values found in field name", l);
                                  }
                                  3 == h && v("String unexpected", l);
                                }
                              }
                            }
                          }
                      }
                    } else {
                      0 == b && (48 <= l && 57 >= l || 43 == l || 46 == l || 45 == l) ? (ja = ra = T = na = P = U = ma = !1, a.string = y, ha.n = x, ca()) : 0 == a.value_type ? 0 != b ? B(l) : (b = 31, a.string += y, a.value_type = 4) : 2 == h ? v("Multiple values found in field name", l) : 3 == h ? (4 != a.value_type && (6 != a.value_type && 13 != a.value_type || v("String unexpected", l), B(l)), 30 == b ? Ha() ? (31 == b, a.string = y) : v("String unexpected", l) : 31 == b ? a.string += y : v("String unexpected", 
                      l)) : 1 == h && (30 == b ? (a.className || (a.className = a.string, a.string = ""), a.string += y) : 31 == b && (a.string += y));
                    }
                    break;
                  case 96:
                  case 34:
                  case 39:
                    a.string && (a.className = a.string);
                    a.string = "";
                    sa(l) ? (a.value_type = 4, b = 31) : (I = l, aa = !0);
                    break;
                  case 10:
                    C.line++, C.col = 1;
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
                      } else if (3 == h) {
                        b = 32;
                        break;
                      } else if (2 == h) {
                        b = 30;
                        break;
                      } else if (1 == h) {
                        b = 30;
                        break;
                      }
                    }
                    0 != b && 30 != b && (29 == b ? a.string.length && (b = 30) : 31 > b && B(l));
                    break;
                  case 116:
                    0 == b ? b = 1 : 27 == b ? b = 28 : B(l);
                    break;
                  case 114:
                    1 == b ? b = 2 : B(l);
                    break;
                  case 117:
                    2 == b ? b = 3 : 9 == b ? b = 10 : 0 == b ? b = 12 : B(l);
                    break;
                  case 101:
                    3 == b ? (a.value_type = 2, b = 31) : 8 == b ? (a.value_type = 3, b = 31) : 14 == b ? b = 15 : 18 == b ? b = 19 : B(l);
                    break;
                  case 110:
                    0 == b ? b = 9 : 12 == b ? b = 13 : 17 == b ? b = 18 : 22 == b ? b = 23 : 25 == b ? b = 26 : B(l);
                    break;
                  case 100:
                    13 == b ? b = 14 : 19 == b ? (a.value_type = -1, b = 31) : B(l);
                    break;
                  case 105:
                    16 == b ? b = 17 : 24 == b ? b = 25 : 26 == b ? b = 27 : B(l);
                    break;
                  case 108:
                    10 == b ? b = 11 : 11 == b ? (a.value_type = 1, b = 31) : 6 == b ? b = 7 : B(l);
                    break;
                  case 102:
                    0 == b ? b = 5 : 15 == b ? b = 16 : 23 == b ? b = 24 : B(l);
                    break;
                  case 97:
                    5 == b ? b = 6 : 20 == b ? b = 21 : B(l);
                    break;
                  case 115:
                    7 == b ? b = 8 : B(l);
                    break;
                  case 73:
                    0 == b ? b = 22 : B(l);
                    break;
                  case 78:
                    0 == b ? b = 20 : 21 == b ? (a.value_type = N ? 7 : 8, N = !1, b = 31) : B(l);
                    break;
                  case 121:
                    28 == b ? (a.value_type = N ? 9 : 10, N = !1, b = 31) : B(l);
                    break;
                  case 45:
                    0 == b ? N = !N : B(l);
                    break;
                  case 43:
                    0 !== b && B(l);
                }
            }
            if (K) {
              31 == b && (b = 0);
              break;
            }
          }
        }
        x == W.length ? (Ba.push(ha), aa || Y || 2 == h ? ua = 0 : 0 != h || 0 == a.value_type && !ea || (K = !0, ua = 1)) : (ha.n = x, Z.unshift(ha), ua = 2);
        if (K) {
          la = null;
          break;
        }
      }
      if (!D) {
        return -1;
      }
      K && 0 != a.value_type && (b = 0, ea = oa(), N = !1, a.string = "", a.value_type = 0);
      K = !1;
      return ua;
    }};
  };
  const za = [Object.freeze(JSOX.begin())];
  let Ia = 0;
  JSOX.parse = function(c, m) {
    var t = Ia++;
    za.length <= t && za.push(Object.freeze(JSOX.begin()));
    t = za[t];
    "string" !== typeof c && (c = String(c));
    t.reset();
    c = t._write(c, !0);
    if (0 < c) {
      t = t.value();
      if ("undefined" === typeof t && 1 < c) {
        throw Error("Pending value could not complete");
      }
      t = "function" === typeof m ? function y(C, x) {
        let w, b, D = C[x];
        if (D && "object" === typeof D) {
          for (w in D) {
            Object.prototype.hasOwnProperty.call(D, w) && (b = y(D, w), void 0 !== b ? D[w] = b : delete D[w]);
          }
        }
        return m.call(C, x, D);
      }({"":t}, "") : t;
      Ia--;
      return t;
    }
    t.finalError();
  };
  JSOX.defineClass = function(c, m) {
    var t = Object.keys(m);
    for (let a = 1; a < t.length; a++) {
      let C, x;
      (C = t[a - 1]) > (x = t[a]) && (t[a - 1] = x, t[a] = C, a ? a -= 2 : a--);
    }
    pa.push(c = {name:c, tag:t.toString(), proto:Object.getPrototypeOf(m), fields:Object.keys(m)});
    for (m = 1; m < c.fields.length; m++) {
      c.fields[m] < c.fields[m - 1] && (t = c.fields[m - 1], c.fields[m - 1] = c.fields[m], c.fields[m] = t, 1 < m && (m -= 2));
    }
    c.proto === Object.getPrototypeOf({}) && (c.proto = null);
  };
  JSOX.toJSOX = JSOX.registerToJSOX = function(c, m, t) {
    if (m.prototype && m.prototype === Object.prototype) {
      m = Object.keys(m).toString();
      if (va.get(m)) {
        throw Error("Existing toJSOX has been registered for object type");
      }
      va.set(m, {external:!0, name:c, cb:t});
    } else {
      if (F.get(m.prototype)) {
        throw Error("Existing toJSOX has been registered for prototype");
      }
      F.set(m.prototype, {external:!0, name:c || t.constructor.name, cb:t});
    }
  };
  JSOX.fromJSOX = function(c, m, t) {
    function a() {
    }
    m || (m = a.prototype);
    if (ia.get(c)) {
      throw Error("Existing fromJSOX has been registered for prototype");
    }
    if (m && !("constructor" in m)) {
      throw Error("Please pass a prototype like thing...");
    }
    ia.set(c, {protoCon:m.prototype.constructor, cb:t});
  };
  JSOX.registerFromJSOX = function(c, m) {
    throw Error("deprecated; please adjust code to use fromJSOX:" + c + m.toString());
  };
  JSOX.addType = function(c, m, t, a) {
    JSOX.toJSOX(c, m, t);
    JSOX.fromJSOX(c, m, a);
  };
  JSOX.registerToFrom = function(c, m) {
    throw Error("registerToFrom deprecated; please use addType:" + c + m.toString());
  };
  JSOX.stringifier = function() {
    function c(f) {
      return isNaN(f) ? f.includes("\ufeff") ? x + JSOX.escape(f) + x : f in Na || /([0-9-])/.test(f[0]) || /((\n|\r|\t)|[ {}()<>!+*/.:,-])/.test(f) ? x + JSOX.escape(f) + x : f : ["'", f.toString(), "'"].join("");
    }
    function m(f) {
      if (null !== f) {
        var p = y.get(f);
        if (p) {
          return p;
        }
        y.set(f, _JSON.stringify(w));
      }
    }
    function t(f, p) {
      let q;
      var k;
      let L = Object.getPrototypeOf(f);
      if (k = C.find(r => {
        if (r.proto && r.proto === L) {
          return !0;
        }
      })) {
        return k;
      }
      if (C.length || pa.length) {
        if (p) {
          p = p.map(r => {
            if ("string" === typeof r) {
              return r;
            }
          }), q = p.toString();
        } else {
          f = Object.keys(f);
          for (p = 1; p < f.length; p++) {
            let r;
            (k = f[p - 1]) > (r = f[p]) && (f[p - 1] = r, f[p] = k, p ? p -= 2 : p--);
          }
          q = f.toString();
        }
        (k = C.find(r => {
          if (r.tag === q) {
            return !0;
          }
        })) || (k = pa.find(r => {
          if (r.tag === q) {
            return !0;
          }
        }));
      }
      return k;
    }
    function a(f, p, q) {
      function k(U, T) {
        function ra() {
          let E = [], K = w.length;
          for (let P = 0; P < this.length; P += 1) {
            w[K] = P, E[P] = k(P, this) || "null";
          }
          w.length = K;
          b.length = K;
          return 0 === E.length ? "[]" : r ? ["[\n", r, E.join(",\n" + r), "\n", aa, "]"].join("") : "[" + E.join(",") + "]";
        }
        function Z() {
          let E = {tmp:null}, K = "{", P = !0;
          for (let [na, d] of this) {
            E.tmp = d;
            let z = w.length;
            w[z] = na;
            K += (P ? "" : ",") + c(na) + ":" + k("tmp", E);
            w.length = z;
            P = !1;
          }
          return K + "}";
        }
        L && (Ea.cb = ra, wa.cb = Z, L = !1);
        var I;
        let aa = r;
        let Y = w.length, u = T[U];
        "object" === typeof u && null !== u && N && !ea.find(E => E === u) && (ea.push(u), b[Y] = u, u = N.apply(u, [A]), ea.pop(), b.length = Y);
        var G = void 0 !== u && null !== u && Object.getPrototypeOf(u);
        G = G && (D.get(G) || F.get(G) || null);
        var R = !G && void 0 !== u && null !== u && (qa.get(Object.keys(u).toString()) || va.get(Object.keys(u).toString()) || null);
        var J = G && G.cb || R && R.cb;
        if (void 0 !== u && null !== u && "function" === typeof J) {
          r += ja;
          if ("object" === typeof u && (I = m(u))) {
            return "ref" + I;
          }
          u = J.call(u, A);
          r = aa;
        } else if ("object" === typeof u && (I = m(u))) {
          return "ref" + I;
        }
        "function" === typeof h && (u = h.call(T, U, u));
        switch(typeof u) {
          case "bigint":
            return u + "n";
          case "string":
          case "number":
            var H = "";
            "" === U && (H = C.map(E => E.name + "{" + E.fields.join(",") + "}").join(r ? "\n" : "") + pa.map(E => E.name + "{" + E.fields.join(",") + "}").join(r ? "\n" : "") + (r ? "\n" : ""));
            return G && G.external ? H + G.name + u : R && R.external ? H + R.name + u : H + u;
          case "boolean":
          case "null":
            return String(u);
          case "object":
            if (I) {
              return "ref" + I;
            }
            if (!u) {
              return "null";
            }
            r += ja;
            T = null;
            R = [];
            if (h && "object" === typeof h) {
              var Q = h.length;
              T = t(u, h);
              for (J = 0; J < Q; J += 1) {
                "string" === typeof h[J] && (H = h[J], w[Y] = H, (I = k(H, u)) && (T ? R.push(I) : R.push(c(H) + (r ? ": " : ":") + I)));
              }
            } else {
              T = t(u);
              J = [];
              for (H in u) {
                if ((!la || Object.prototype.propertyIsEnumerable.call(u, H)) && Object.prototype.hasOwnProperty.call(u, H)) {
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
                H = J[Q], Object.prototype.hasOwnProperty.call(u, H) && (w[Y] = H, (I = k(H, u)) && (T ? R.push(I) : R.push(c(H) + (r ? ": " : ":") + I)));
              }
            }
            w.splice(Y, 1);
            U = "" === U ? (C.map(E => E.name + "{" + E.fields.join(",") + "}").join(r ? "\n" : "") || pa.map(E => E.name + "{" + E.fields.join(",") + "}").join(r ? "\n" : "")) + (r ? "\n" : "") : "";
            G && G.external && (U += c(G.name));
            G = null;
            T && (G = c(T.name));
            I = U + (0 === R.length ? "{}" : r ? (T ? G : "") + "{\n" + r + R.join(",\n" + r) + "\n" + aa + "}" : (T ? G : "") + "{" + R.join(",") + "}");
            r = aa;
            return I;
        }
      }
      if (void 0 === f) {
        return "undefined";
      }
      if (null !== f) {
        var L = !0, r, h;
        var O = typeof q;
        var ma = typeof p;
        var ja = r = "";
        if ("number" === O) {
          for (O = 0; O < q; O += 1) {
            ja += " ";
          }
        } else {
          "string" === O && (ja = q);
        }
        if ((h = p) && "function" !== ma && ("object" !== ma || "number" !== typeof p.length)) {
          throw Error("JSOX.stringify");
        }
        w.length = 0;
        y = new WeakMap();
        f = k("", {"":f});
        pa.length = 0;
        return f;
      }
    }
    let C = [], x = '"', y = new WeakMap();
    const w = [];
    let b = [];
    const D = new WeakMap(), qa = new Map();
    let N = null;
    const ea = [];
    let la = !1;
    F.get(Object.prototype) || (F.set(Object.prototype, {external:!1, name:Object.prototype.constructor.name, cb:null}), F.set(Date.prototype, {external:!1, name:"Date", cb:function() {
      let f = -this.getTimezoneOffset(), p = 0 <= f ? "+" : "-", q = function(k) {
        k = Math.floor(Math.abs(k));
        return (10 > k ? "0" : "") + k;
      };
      return [this.getFullYear(), "-", q(this.getMonth() + 1), "-", q(this.getDate()), "T", q(this.getHours()), ":", q(this.getMinutes()), ":", q(this.getSeconds()), "." + function(k) {
        k = Math.floor(Math.abs(k));
        return (100 > k ? "0" : "") + (10 > k ? "0" : "") + k;
      }(this.getMilliseconds()) + p, q(f / 60), ":", q(f % 60)].join("");
    }}), F.set(xa.prototype, {external:!1, name:"DateNS", cb:function() {
      let f = -this.getTimezoneOffset(), p = 0 <= f ? "+" : "-", q = function(k) {
        k = Math.floor(Math.abs(k));
        return (10 > k ? "0" : "") + k;
      };
      return [this.getFullYear(), "-", q(this.getMonth() + 1), "-", q(this.getDate()), "T", q(this.getHours()), ":", q(this.getMinutes()), ":", q(this.getSeconds()), "." + function(k) {
        k = Math.floor(Math.abs(k));
        return (100 > k ? "0" : "") + (10 > k ? "0" : "") + k;
      }(this.getMilliseconds()) + function(k) {
        k = Math.floor(Math.abs(k));
        return (100000 > k ? "0" : "") + (10000 > k ? "0" : "") + (1000 > k ? "0" : "") + (100 > k ? "0" : "") + (10 > k ? "0" : "") + k;
      }(this.ns) + p, q(f / 60), ":", q(f % 60)].join("");
    }}), F.set(Boolean.prototype, {external:!1, name:"Boolean", cb:Ca}), F.set(Number.prototype, {external:!1, name:"Number", cb:function() {
      return isNaN(this) ? "NaN" : isFinite(this) ? String(this) : 0 > this ? "-Infinity" : "Infinity";
    }}), F.set(String.prototype, {external:!1, name:"String", cb:function() {
      return '"' + JSOX.escape(Ca.apply(this)) + '"';
    }}), "function" === typeof BigInt && F.set(BigInt.prototype, {external:!1, name:"BigInt", cb:function() {
      return this + "n";
    }}), F.set(ArrayBuffer.prototype, {external:!0, name:"ab", cb:function() {
      return "[" + c(da(this)) + "]";
    }}), F.set(Uint8Array.prototype, {external:!0, name:"u8", cb:function() {
      return "[" + c(da(this.buffer)) + "]";
    }}), F.set(Uint8ClampedArray.prototype, {external:!0, name:"uc8", cb:function() {
      return "[" + c(da(this.buffer)) + "]";
    }}), F.set(Int8Array.prototype, {external:!0, name:"s8", cb:function() {
      return "[" + c(da(this.buffer)) + "]";
    }}), F.set(Uint16Array.prototype, {external:!0, name:"u16", cb:function() {
      return "[" + c(da(this.buffer)) + "]";
    }}), F.set(Int16Array.prototype, {external:!0, name:"s16", cb:function() {
      return "[" + c(da(this.buffer)) + "]";
    }}), F.set(Uint32Array.prototype, {external:!0, name:"u32", cb:function() {
      return "[" + c(da(this.buffer)) + "]";
    }}), F.set(Int32Array.prototype, {external:!0, name:"s32", cb:function() {
      return "[" + c(da(this.buffer)) + "]";
    }}), F.set(Float32Array.prototype, {external:!0, name:"f32", cb:function() {
      return "[" + c(da(this.buffer)) + "]";
    }}), F.set(Float64Array.prototype, {external:!0, name:"f64", cb:function() {
      return "[" + c(da(this.buffer)) + "]";
    }}), F.set(Float64Array.prototype, {external:!0, name:"f64", cb:function() {
      return "[" + c(da(this.buffer)) + "]";
    }}), F.set(RegExp.prototype, wa = {external:!0, name:"regex", cb:function(f, p) {
      return "'" + escape(this.source) + "'";
    }}), ia.set("regex", {protoCon:RegExp, cb:function(f, p) {
      return new RegExp(this);
    }}), F.set(Map.prototype, wa = {external:!0, name:"map", cb:null}), ia.set("map", {protoCon:Map, cb:function(f, p) {
      if (f) {
        this.set(f, p);
      } else {
        return this;
      }
    }}), F.set(Array.prototype, Ea = {external:!1, name:Array.prototype.constructor.name, cb:null}));
    const A = {defineClass(f, p) {
      var q = Object.keys(p);
      for (let k = 1; k < q.length; k++) {
        let L, r;
        (L = q[k - 1]) > (r = q[k]) && (q[k - 1] = r, q[k] = L, k ? k -= 2 : k--);
      }
      C.push(f = {name:f, tag:q.toString(), proto:Object.getPrototypeOf(p), fields:Object.keys(p)});
      for (p = 1; p < f.fields.length; p++) {
        f.fields[p] < f.fields[p - 1] && (q = f.fields[p - 1], f.fields[p - 1] = f.fields[p], f.fields[p] = q, 1 < p && (p -= 2));
      }
      f.proto === Object.getPrototypeOf({}) && (f.proto = null);
    }, setDefaultObjectToJSOX(f) {
      N = f;
    }, isEncoding(f) {
      return !!b.find((p, q) => p === f && q < b.length - 1);
    }, encodeObject(f) {
      return N ? N.apply(f, [this]) : f;
    }, stringify(f, p, q) {
      return a(f, p, q);
    }, setQuote(f) {
      x = f;
    }, registerToJSOX(f, p, q) {
      return this.toJSOX(f, p, q);
    }, toJSOX(f, p, q) {
      if (p.prototype && p.prototype !== Object.prototype) {
        if (D.get(p.prototype)) {
          throw Error("Existing toJSOX has been registered for prototype");
        }
        D.set(p.prototype, {external:!0, name:f || q.constructor.name, cb:q});
      } else {
        p = Object.keys(p).toString();
        if (qa.get(p)) {
          throw Error("Existing toJSOX has been registered for object type");
        }
        qa.set(p, {external:!0, name:f, cb:q});
      }
    }, get ignoreNonEnumerable() {
      return la;
    }, set ignoreNonEnumerable(f) {
      la = f;
    },};
    return A;
  };
  const ka = {"~":-1, "=":-1, $:62, _:63, "+":62, "-":62, ".":62, "/":63, ",":63};
  for (let c = 0; 256 > c; c++) {
    64 > c && (ka["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$_"[c]] = c);
  }
  Object.freeze(ka);
  JSOX.stringify = function(c, m, t) {
    return JSOX.stringifier().stringify(c, m, t);
  };
  [[0, 256, [16767487, 16739071, 130048, 3670016, 0, 16777208, 16777215, 8388607]]].map(c => ({firstChar:c[0], lastChar:c[1], bits:c[2]}));
}
privateizeEverything();


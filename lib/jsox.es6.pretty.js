'use strict';
var JSOX = "object" === typeof exports ? exports : {};
function privateizeEverything() {
  function la() {
    var c = V.pop();
    c || (c = {context:0, current_class:null, current_class_field:0, arrayType:-1, elements:null, element_array:null});
    return c;
  }
  function pa() {
    var c = ma.pop();
    c ? c.n = 0 : c = {buf:null, n:0};
    return c;
  }
  function u(c) {
    var m = "";
    c = new Uint8Array(c);
    var a = c.byteLength, h = a % 3;
    a -= h;
    for (var k, l, b, d, g = 0; g < a; g += 3) {
      d = c[g] << 16 | c[g + 1] << 8 | c[g + 2], k = (d & 16515072) >> 18, l = (d & 258048) >> 12, b = (d & 4032) >> 6, d &= 63, m += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[k] + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[l] + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[b] + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[d];
    }
    1 == h ? (d = c[a], k = (d & 252) >> 2, l = (d & 3) << 4, m += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[k] + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[l] + "==") : 2 == h && (d = c[a] << 8 | c[a + 1], k = (d & 64512) >> 10, l = (d & 1008) >> 4, b = (d & 15) << 2, m += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[k] + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[l] + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[b] + 
    "=");
    return m;
  }
  function qa(c) {
    var m = new ArrayBuffer(3 * (c.length + 3 >> 2 | 0) - (("=" === c[c.length - 1] ? 1 : 0) + ("=" === c[c.length - 2] ? 1 : 0))), a = new Uint8Array(m), h, k = c.length + 3 >> 2;
    for (h = 0; h < k; h++) {
      var l = L[c[4 * h + 1]], b = L[c[4 * h + 2]], d = L[c[4 * h + 3]];
      a[3 * h] = L[c[4 * h]] << 2 | l >> 4;
      0 <= b && (a[3 * h + 1] = l << 4 | b >> 2 & 15);
      0 <= d && (a[3 * h + 2] = b << 6 | d & 63);
    }
    return m;
  }
  const na = "function" === typeof BigInt, ra = "ab u8 cu8 s8 u16 s16 u32 s32 u64 s64 f32 f64".split(" "), sa = [ArrayBuffer, Uint8Array, Uint8ClampedArray, Int8Array, Uint16Array, Int16Array, Uint32Array, Int32Array, null, null, Float32Array, Float32Array], V = [], ma = [];
  JSOX.escape = function(c) {
    var m, a = "";
    if (!c) {
      return c;
    }
    for (m = 0; m < c.length; m++) {
      if ('"' == c[m] || "\\" == c[m] || "`" == c[m] || "'" == c[m]) {
        a += "\\";
      }
      a += c[m];
    }
    return a;
  };
  var r = new WeakMap, O = new Map;
  JSOX.begin = function(c, m) {
    const a = {name:null, value_type:0, string:"", contains:null, className:null}, h = {line:1, col:1};
    let k = 0, l;
    var b = 0, d = !0, g = !1, v = null, r = null, x = void 0, p = [], w = {first:null, last:null, saved:null, push(a) {
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
    }, length:0}, u = [], fa = {}, t = null, H = 0, I = -1, e = 0, F = 0, R = !1, n = !1, P = !1, da = !1, A = !1, G = {first:null, last:null, saved:null, push(a) {
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
    }}, ha = null, S = !1, T = !1, B = !1, L = !1, E = !1, Q = !1, W = !1, y = 0, J = 0, X = !1, C = !1, K = !1, Y = !1;
    return {value() {
      var a = v;
      v = void 0;
      return a;
    }, reset() {
      b = 0;
      d = !0;
      G.last && (G.last.next = G.save);
      G.save = G.first;
      G.first = G.last = null;
      w.last && (w.last.next = w.save);
      w.save = G.first;
      p = w.first = w.last = null;
      x = void 0;
      e = 0;
      u = [];
      fa = {};
      t = null;
      H = 0;
      a.value_type = 0;
      a.name = null;
      a.string = "";
      a.className = null;
      h.line = 1;
      h.col = 1;
      g = !1;
      F = 0;
      L = B = S = C = !1;
    }, usePrototype(a, b) {
      fa[a] = b;
    }, write(a) {
      "string" !== typeof a && (a = String(a));
      for (a = this._write(a, !1); 0 < a && !(v && ("function" === typeof m && function ua(a, b) {
        var c, d = a[b];
        if (d && "object" === typeof d) {
          for (c in d) {
            if (Object.prototype.hasOwnProperty.call(d, c)) {
              var e = ua(d, c);
              void 0 !== e ? d[c] = e : delete d[c];
            }
          }
        }
        return m.call(a, b, d);
      }({"":v}, ""), c(v), v = void 0), 2 > a); a = this._write()) {
      }
    }, _write(c, m) {
      function q(a, b) {
        throw Error(`${a} '${String.fromCodePoint(b)}' unexpected at ${k} (near '${D.substr(4 < k ? k - 4 : 0, 4 < k ? 3 : k - 1)}[${String.fromCodePoint(b)}]${D.substr(k, 10)}') [${h.line}:${h.col}]`);
      }
      function N() {
        a.value_type = 0;
        a.string = "";
      }
      function ta(a) {
        if (Y) {
          if (na) {
            return BigInt(a);
          }
          throw Error("no builtin BigInt()", 0);
        }
        return K ? new Date(a) : 1 < a.length && !R && !n && !P && 48 === a.charCodeAt(0) ? (g ? -1 : 1) * Number("0o" + a) : (g ? -1 : 1) * Number(a);
      }
      function ea() {
        var b = null;
        switch(a.value_type) {
          case 5:
            if (Y) {
              if (na) {
                return BigInt(a.string);
              }
              throw Error("no builtin BigInt()", 0);
            }
            return K ? new Date(a.string) : ta(a.string);
          case 4:
            return a.className && (b = O.get(a.className), a.className = null, b) ? b.call(a.string) : a.string;
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
            return a.className && (b = O.get(a.className), a.className = null, b) ? b.call(a.contains) : a.contains;
          case 13:
            if (0 <= I) {
              return b = qa(a.contains[0]), 0 === I ? b : new sa[I](b);
            }
            if (-2 === I) {
              var c = r;
              a.contains.forEach((a) => c = c[a]);
              return c;
            }
            return a.className && (b = O.get(a.className), a.className = null, b) ? b.call(a.contains) : a.contains;
          default:
            console.log("Unhandled value conversion.", a);
        }
      }
      function U() {
        switch(a.value_type) {
          case 12:
            p.push(void 0);
            delete p[p.length - 1];
            break;
          default:
            p.push(ea());
        }
        N();
      }
      function Z() {
        12 !== a.value_type && (x[a.name] = ea(), N());
      }
      function z(c) {
        if (0 !== b) {
          switch(g && (valstring += "-", g = !1), b) {
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
        123 == c ? ba() : 91 == c ? ca() : 32 != c && 13 != c && 10 != c && 9 != c && 65279 != c && 2028 != c && 2029 != c && (44 == c || 125 == c || 93 == c || 58 == c ? q("Invalid character near identifier", c) : a.string += l);
      }
      function ia(b) {
        let c = 0;
        for (; 0 == c && k < D.length;) {
          l = D.charAt(k);
          let d = D.codePointAt(k++);
          65536 <= d && (l += D.charAt(k), k++);
          h.col++;
          if (d == b) {
            B ? (a.string += l, B = !1) : (X ? q("Incomplete Octal sequence", d) : W ? q("Incomplete hexidecimal sequence", d) : Q ? q("Incomplete unicode sequence", d) : E && q("Incomplete long unicode sequence", d), c = 1);
          } else {
            if (B) {
              if (X) {
                if (3 > J && 48 <= d && 57 >= d) {
                  y *= 8, y += d - 48, J++, 3 === J && (a.string += String.fromCodePoint(y), B = X = !1);
                } else {
                  if (255 < y) {
                    q("(escaped character, parsing octal escape val=%d) fault while parsing", d);
                    c = -1;
                    break;
                  }
                  a.string += String.fromCodePoint(y);
                  B = X = !1;
                }
              } else {
                if (E) {
                  125 == d ? (a.string += String.fromCodePoint(y), B = Q = E = !1) : (y *= 16, 48 <= d && 57 >= d ? y += d - 48 : 65 <= d && 70 >= d ? y += d - 65 + 10 : 97 <= d && 102 >= d ? y += d - 97 + 10 : (q("(escaped character, parsing hex of \\u)", d), c = -1, B = E = !1));
                } else {
                  if (W || Q) {
                    if (0 === J && 123 === d) {
                      E = !0;
                      continue;
                    }
                    if (2 > J || Q && 4 > J) {
                      y *= 16;
                      if (48 <= d && 57 >= d) {
                        y += d - 48;
                      } else {
                        if (65 <= d && 70 >= d) {
                          y += d - 65 + 10;
                        } else {
                          if (97 <= d && 102 >= d) {
                            y += d - 97 + 10;
                          } else {
                            q(Q ? "(escaped character, parsing hex of \\u)" : "(escaped character, parsing hex of \\x)", d);
                            c = -1;
                            B = W = !1;
                            continue;
                          }
                        }
                      }
                      J++;
                      Q ? 4 == J && (a.string += String.fromCodePoint(y), B = Q = !1) : 2 == J && (a.string += String.fromCodePoint(y), B = W = !1);
                      continue;
                    }
                  }
                  switch(d) {
                    case 13:
                      L = !0;
                      h.col = 1;
                      continue;
                    case 10:
                    case 2028:
                    case 2029:
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
                      X = !0;
                      y = d - 48;
                      J = 1;
                      continue;
                    case 120:
                      W = !0;
                      y = J = 0;
                      continue;
                    case 117:
                      Q = !0;
                      y = J = 0;
                      continue;
                    default:
                      a.string += l;
                  }
                  B = !1;
                }
              }
            } else {
              92 === d ? B ? (a.string += "\\", B = !1) : B = !0 : L ? (L = !1, 10 == d ? (h.line++, h.col = 1, B = !1) : (h.line++, h.col = 1)) : a.string += l;
            }
          }
        }
        return c;
      }
      function ja() {
        let b;
        for (; (b = k) < D.length;) {
          l = D.charAt(b);
          let c = D.codePointAt(k++);
          65536 <= c && (q("fault while parsing number;", c), l += D.charAt(k), k++);
          if (95 != c) {
            if (h.col++, 48 <= c && 57 >= c) {
              P && (A = !0), a.string += l;
            } else {
              if (45 == c || 43 == c) {
                0 == a.string.length || P && !da && !A ? (a.string += l, da = !0) : (a.string += l, K = !0);
              } else {
                if (58 == c && K) {
                  a.string += l, K = !0;
                } else {
                  if (84 == c && K) {
                    a.string += l, K = !0;
                  } else {
                    if (90 == c && K) {
                      a.string += l, K = !0;
                    } else {
                      if (46 == c) {
                        if (n || R || P) {
                          d = !1;
                          q("fault while parsing number;", c);
                          break;
                        } else {
                          a.string += l, n = !0;
                        }
                      } else {
                        if (110 == c) {
                          Y = !0;
                          break;
                        } else {
                          if (120 == c || 98 == c || 111 == c || 88 == c || 66 == c || 79 == c) {
                            if (R || "0" != a.string) {
                              d = !1;
                              q("fault while parsing number;", c);
                              break;
                            } else {
                              R = !0, a.string += l;
                            }
                          } else {
                            if (101 == c || 69 == c) {
                              if (P) {
                                d = !1;
                                q("fault while parsing number;", c);
                                break;
                              } else {
                                a.string += l, P = !0;
                              }
                            } else {
                              32 == c || 13 == c || 10 == c || 9 == c || 65279 == c || 44 == c || 125 == c || 93 == c || 58 == c ? k = b : m && (d = !1, q("fault while parsing number;", c));
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
        m || k != D.length ? (T = !1, a.value_type = 5, 0 == e && (C = !0)) : T = !0;
      }
      function ba() {
        let c, g = null, h = {};
        0 < b && 29 > b && z();
        if (0 == e) {
          29 == b && a.string.length ? (O.get(a.string) && (a.className = a.string), (g = u.find((b) => b.name === a.string)) ? (h = Object.assign(h, g.protoObject), Object.setPrototypeOf(h, Object.getPrototypeOf(g.protoObject)), c = 6) : (u.push(g = {name:a.string, protoObject:fa[a.string] || Object.create({}), fields:[]}), c = 5), b = 0) : (c = 3, b = 29);
        } else {
          if (29 == b || 1 === e || 4 === e) {
            0 != b ? (O.get(a.string) && (a.className = a.string), (g = u.find((b) => b.name === a.string)) || q("Referenced class " + a.string + " has not been defined", f), h = Object.assign(h, g.protoObject), Object.setPrototypeOf(h, Object.getPrototypeOf(g.protoObject)), c = 6) : c = 3, b = 0;
          } else {
            if (3 == e && 0 == b) {
              return q("fault while parsing; getting field name unexpected ", f), d = !1;
            }
            c = 3;
          }
        }
        {
          let b = la();
          a.value_type = 6;
          0 == e ? v = x = h : 4 == e && (x[a.name] = h);
          b.context = e;
          b.elements = x;
          b.element_array = p;
          b.name = a.name;
          b.current_class = t;
          b.current_class_field = H;
          b.arrayType = I;
          b.className = a.className;
          a.className = null;
          t = g;
          H = 0;
          x = h;
          r || (r = x);
          w.push(b);
          N();
          e = c;
        }
        return !0;
      }
      function ca() {
        0 < b && 29 > b && z();
        if (29 == b && a.string.length) {
          var c = ra.findIndex((b) => b === a.string);
          0 <= c ? (b = 0, I = c) : "ref" === a.string ? I = -2 : O.get(a.string) ? a.className = a.string : q("Unknown type specified for array:" + a.string, f);
        } else {
          if (3 == e || 29 == b || 30 == b) {
            return q("Fault while parsing; while getting field name unexpected", f), d = !1;
          }
        }
        {
          c = la();
          a.value_type = 13;
          let b = [];
          0 == e ? v = p = b : 4 == e && (x[a.name] = b);
          c.context = e;
          c.elements = x;
          c.element_array = p;
          c.name = a.name;
          c.current_class = t;
          c.current_class_field = H;
          c.arrayType = I;
          c.className = a.className;
          t = a.className = null;
          H = 0;
          p = b;
          r || (r = p);
          w.push(c);
          N();
          e = 1;
        }
        return !0;
      }
      var aa = 0;
      if (!d) {
        return -1;
      }
      if (c && c.length) {
        var M = pa();
        M.buf = c;
        G.push(M);
      } else {
        T && (T = !1, a.value_type = 5, 0 == e && (C = !0), aa = 1);
      }
      for (; d && (M = G.shift());) {
        k = M.n;
        var D = M.buf;
        S && (c = ia(ha), 0 > c ? d = !1 : 0 < c && (S = !1, d && (a.value_type = 4)));
        for (T && ja(); !C && d && k < D.length;) {
          l = D.charAt(k);
          var f = D.codePointAt(k++);
          65536 <= f && (l += D.charAt(k), k++);
          h.col++;
          if (F) {
            if (1 == F) {
              if (42 == f) {
                F = 3;
                continue;
              }
              47 != f ? (q("fault while parsing;", f), d = !1) : F = 2;
              continue;
            }
            if (2 == F) {
              10 == f && (F = 0);
              continue;
            }
            if (3 == F) {
              42 == f && (F = 4);
              continue;
            }
            if (4 == F) {
              47 == f ? F = 0 : 42 != f && (F = 3);
              continue;
            }
          }
          switch(f) {
            case 47:
              F || (F = 1);
              break;
            case 123:
              ba();
              break;
            case 91:
              ca();
              break;
            case 58:
              3 == e ? 0 != b && 29 != b && 30 != b ? (d = FALSE, thorwError(`fault while parsing; unquoted keyword used as object field name (state:${b})`, f)) : (b = 0, a.name = a.string, a.string = "", e = 4, a.value_type = 0) : (1 == e ? q("(in array, got colon out of string):parsing fault;", f) : q("(outside any object, got colon out of string):parsing fault;", f), d = !1);
              break;
            case 125:
              b = 0;
              5 == e ? t ? (a.string && (t.protoObject[a.string] = void 0, t.fields.push(a.string)), N(), c = w.pop(), b = e = 0, a.name = c.name, x = c.elements, p = c.element_array, t = c.current_class, H = c.current_class_field, I = c.arrayType, a.className = c.className, r = null, V.push(c)) : q("State error; gathering class fields, and lost the class", f) : 3 == e || 6 == e ? (0 != a.value_type && (a.name = t.fields[H++], Z()), a.value_type = 6, a.contains = x, a.string = "", c = w.pop(), e = 
              c.context, a.name = c.name, x = c.elements, p = c.element_array, t = c.current_class, H = c.current_class_field, I = c.arrayType, a.className = c.className, V.push(c), 0 == e && (C = !0)) : 4 == e ? (0 != a.value_type && Z(), a.value_type = 6, a.contains = x, c = w.pop(), a.name = c.name, e = c.context, a.name = c.name, x = c.elements, t = c.current_class, H = c.current_class_field, I = c.arrayType, a.className = c.className, p = c.element_array, V.push(c), 0 == e && (C = !0)) : (q("Fault while parsing; unexpected", 
              f), d = !1);
              g = !1;
              break;
            case 93:
              31 == b && (b = 0);
              1 == e ? (0 != a.value_type && U(), a.contains = p, c = w.pop(), a.name = c.name, e = c.context, x = c.elements, t = c.current_class, H = c.current_class_field, I = c.arrayType, a.className = c.className, p = c.element_array, V.push(c), a.value_type = 13, 0 == e && (C = !0)) : (q(`bad context ${e}; fault while parsing`, f), d = !1);
              g = !1;
              break;
            case 44:
              if (31 == b || 29 == b) {
                b = 0;
              }
              5 == e ? t ? (t.protoObject[a.string] = void 0, t.fields.push(a.string), a.string = "", b = 29) : q("State error; gathering class fields, and lost the class", f) : 3 == e ? t ? (a.name = t.fields[H++], 0 != a.value_type && (Z(), N())) : q("State error; gathering class values, and lost the class", f) : 6 == e ? t ? (a.name = t.fields[H++], 0 != a.value_type && (Z(), N())) : q("State error; gathering class values, and lost the class", f) : 1 == e ? (0 == a.value_type && (a.value_type = 
              12), 0 != a.value_type && (U(), N())) : 4 == e ? (e = 3, 0 != a.value_type && (Z(), N())) : (d = !1, q("bad context; excessive commas while parsing;", f));
              g = !1;
              break;
            default:
              if (0 == e || 4 == e && 29 == b || 3 == e || 5 == e) {
                switch(f) {
                  case 96:
                  case 34:
                  case 39:
                    0 == b || 29 == b ? (a.string.length && (a.className = a.string, a.string = ""), ia(f) ? a.value_type = 4 : (ha = f, S = !0)) : q("fault while parsing; quote not at start of field name", f);
                    break;
                  case 10:
                    h.line++, h.col = 1;
                  case 13:
                  case 32:
                  case 9:
                  case 65279:
                    if (31 === b) {
                      b = 0;
                      0 === e && (C = !0);
                      break;
                    }
                    0 === b || 30 === b ? 0 == e && a.value_type && (C = !0) : 29 === b ? 0 === e ? (b = 0, C = !0) : a.string.length && (b = 30) : (d = !1, q("fault while parsing; whitepsace unexpected", f));
                    break;
                  default:
                    (c = ka.find((a) => a.firstChar >= f && a.lastChar > f)) && c.bits[(f - c.firstChar) / 24] & 1 << (f - c.firstChar) % 24 ? (d = !1, q(`fault while parsing object field name; \\u${f}`, f)) : 0 == b && (48 <= f && 57 >= f || 43 == f || 46 == f || 45 == f) ? (n = A = da = Y = K = P = R = !1, a.string = l, M.n = k, ja()) : (30 === b && (d = !1, q("fault while parsing; character unexpected", f)), 0 === b && (b = 29, a.value_type = 4), a.string += l);
                }
              } else {
                switch(f) {
                  case 96:
                  case 34:
                  case 39:
                    ia(f) ? (a.value_type = 4, b = 31) : (ha = f, S = !0);
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
                      0 == e && (C = !0);
                      break;
                    }
                    0 != b && 30 != b && (29 == b ? a.string.length && (b = 30) : (d = !1, q("fault parsing whitespace", f)));
                    break;
                  case 116:
                    0 == b ? b = 1 : 27 == b ? b = 28 : z(f);
                    break;
                  case 114:
                    1 == b ? b = 2 : z(f);
                    break;
                  case 117:
                    2 == b ? b = 3 : 9 == b ? b = 10 : 0 == b ? b = 12 : z(f);
                    break;
                  case 101:
                    3 == b ? (a.value_type = 2, b = 31) : 8 == b ? (a.value_type = 3, b = 31) : 14 == b ? b = 15 : 18 == b ? b = 19 : z(f);
                    break;
                  case 110:
                    0 == b ? b = 9 : 12 == b ? b = 13 : 17 == b ? b = 18 : 22 == b ? b = 23 : 25 == b ? b = 26 : z(f);
                    break;
                  case 100:
                    13 == b ? b = 14 : 19 == b ? (a.value_type = -1, b = 31) : z(f);
                    break;
                  case 105:
                    16 == b ? b = 17 : 24 == b ? b = 25 : 26 == b ? b = 27 : z(f);
                    break;
                  case 108:
                    10 == b ? b = 11 : 11 == b ? (a.value_type = 1, b = 31) : 6 == b ? b = 7 : z(f);
                    break;
                  case 102:
                    0 == b ? b = 5 : 15 == b ? b = 16 : 23 == b ? b = 24 : z(f);
                    break;
                  case 97:
                    5 == b ? b = 6 : 20 == b ? b = 21 : z(f);
                    break;
                  case 115:
                    7 == b ? b = 8 : z(f);
                    break;
                  case 73:
                    0 == b ? b = 22 : z(f);
                    break;
                  case 78:
                    0 == b ? b = 20 : 21 == b ? (a.value_type = g ? 7 : 8, g = !1, b = 31) : z(f);
                    break;
                  case 121:
                    28 == b ? (a.value_type = g ? 9 : 10, g = !1, b = 31) : z(f);
                    break;
                  case 45:
                    0 == b ? g = !g : z(f);
                    break;
                  default:
                    0 == b && (48 <= f && 57 >= f || 43 == f || 46 == f || 45 == f) ? (n = A = da = Y = K = P = R = !1, a.string = l, M.n = k, ja()) : z(f);
                }
              }
          }
          if (C) {
            31 == b && (b = 0);
            break;
          }
        }
        k == D.length ? (ma.push(M), S || T || 3 == e ? aa = 0 : 0 != e || 0 == a.value_type && !v || (C = !0, aa = 1)) : (M.n = k, G.unshift(M), aa = 2);
        if (C) {
          r = null;
          break;
        }
      }
      if (!d) {
        return -1;
      }
      C && 0 != a.value_type && (v = ea(), g = !1, a.string = "", a.value_type = 0);
      C = !1;
      return aa;
    }};
  };
  const U = [Object.freeze(JSOX.begin())];
  var ba = 0;
  JSOX.parse = function(c, m) {
    var a = ba++;
    U.length <= a && U.push(Object.freeze(JSOX.begin()));
    a = U[a];
    "string" !== typeof c && (c = String(c));
    a.reset();
    if (0 < a._write(c, !0)) {
      return c = a.value(), "function" === typeof m && function b(a, c) {
        var d, g = a[c];
        if (g && "object" === typeof g) {
          for (d in g) {
            if (Object.prototype.hasOwnProperty.call(g, d)) {
              var k = b(g, d);
              void 0 !== k ? g[d] = k : delete g[d];
            }
          }
        }
        return m.call(a, c, g);
      }({"":c}, ""), ba--, c;
    }
  };
  var ca = function() {
    return this && this.valueOf();
  };
  r.set(Object.prototype, {external:!1, name:Object.prototype.constructor.name, cb:null});
  r.set(Date.prototype, {external:!1, name:"Date", cb:function() {
    var c = -this.getTimezoneOffset(), m = 0 <= c ? "+" : "-", a = function(a) {
      a = Math.floor(Math.abs(a));
      return (10 > a ? "0" : "") + a;
    };
    return this.getFullYear() + "-" + a(this.getMonth() + 1) + "-" + a(this.getDate()) + "T" + a(this.getHours()) + ":" + a(this.getMinutes()) + ":" + a(this.getSeconds()) + m + a(c / 60) + ":" + a(c % 60);
  }});
  r.set(Boolean.prototype, {external:!1, name:"Boolean", cb:ca});
  r.set(Number.prototype, {external:!1, name:"Number", cb:function() {
    return isNaN(this) ? "NaN" : isFinite(this) ? String(this) : 0 > this ? "-Infinity" : "Infinity";
  }});
  r.set(String.prototype, {external:!1, name:"String", cb:function() {
    return '"' + JSOX.escape(ca.apply(this)) + '"';
  }});
  "function" === typeof BigInt && r.set(BigInt.prototype, {external:!1, name:"BigInt", cb:function() {
    return this + "n";
  }});
  r.set(ArrayBuffer.prototype, {external:!0, name:"ab", cb:function() {
    return "[" + u(this) + "]";
  }});
  r.set(Uint8Array.prototype, {external:!0, name:"u8", cb:function() {
    return "[" + u(this.buffer) + "]";
  }});
  r.set(Uint8ClampedArray.prototype, {external:!0, name:"uc8", cb:function() {
    return "[" + u(this.buffer) + "]";
  }});
  r.set(Int8Array.prototype, {external:!0, name:"s8", cb:function() {
    return "[" + u(this.buffer) + "]";
  }});
  r.set(Uint16Array.prototype, {external:!0, name:"u16", cb:function() {
    return "[" + u(this.buffer) + "]";
  }});
  r.set(Int16Array.prototype, {external:!0, name:"s16", cb:function() {
    return "[" + u(this.buffer) + "]";
  }});
  r.set(Uint32Array.prototype, {external:!0, name:"u32", cb:function() {
    return "[" + u(this.buffer) + "]";
  }});
  r.set(Uint32Array.prototype, {external:!0, name:"s32", cb:function() {
    return "[" + u(this.buffer) + "]";
  }});
  "undefined" != typeof Uint64Array && r.set(Uint64Array.prototype, {external:!0, name:"u64", cb:function() {
    return "[" + u(this.buffer) + "]";
  }});
  "undefined" != typeof Int64Array && r.set(Int64Array.prototype, {external:!0, name:"s64", cb:function() {
    return "[" + u(this.buffer) + "]";
  }});
  r.set(Float32Array.prototype, {external:!0, name:"f32", cb:function() {
    return "[" + u(this.buffer) + "]";
  }});
  r.set(Float64Array.prototype, {external:!0, name:"f64", cb:function() {
    return "[" + u(this.buffer) + "]";
  }});
  JSOX.registerToJSOX = function(c, m, a) {
    if (r.get(m)) {
      throw Error("Existing toJSOX has been registered for prototype");
    }
    r.set(m, {external:!0, name:c || a.constructor.name, cb:a});
  };
  JSOX.registerFromJSOX = function(c, m) {
    if (O.get(c)) {
      throw Error("Existing fromJSOX has been registered for prototype");
    }
    O.set(c, m);
  };
  JSOX.registerToFrom = function(c, m, a, h) {
    JSOX.registerToJSOX(c, m, a);
    JSOX.registerFromJSOX(c, h);
  };
  var oa;
  JSOX.stringifier = function() {
    function c(a) {
      if (null !== a) {
        var c = l.get(a);
        if (c) {
          return c;
        }
        l.set(a, JSON.stringify(b));
      }
    }
    function m(a, b) {
      var c, d = Object.getPrototypeOf(a);
      if (c = h.find((a) => {
        if (a.proto && a.proto === d) {
          return !0;
        }
      })) {
        return c;
      }
      if (b) {
        b.map((a) => {
          if ("string" === typeof a) {
            return a;
          }
        });
        var g = b.toString();
      } else {
        g = Object.keys(a).toString();
      }
      return c = h.find((a) => {
        if (a.tag === g) {
          return !0;
        }
      });
    }
    function a(a, g, u) {
      function d(a) {
        var b;
        for (b = 0; b < a.length; b++) {
          let c = a.codePointAt(b);
          65536 <= c && b++;
          if (ka[c / 384 | 0] && ka[c / 384 | 0][c % 384 / 24 | 0] & 1 << c % 24) {
            break;
          }
        }
        return b < a.lenth || "true false null NaN Infinity undefined".split(" ").find((b) => b === a) || a.includes(" ") || /[\(\)<>!\+\-\*\/\., ]/.test(a) ? k + JSOX.escape(a) + k : a;
      }
      function x(a, g) {
        oa.cb = function() {
          var a = [];
          let c = b.length;
          for (let d = 0; d < this.length; d += 1) {
            b[c] = d, a[d] = x(d, this) || "null";
          }
          b.splice(c, 1);
          return 0 === a.length ? "[]" : p ? "[\n" + p + a.join(",\n" + p) + "\n" + l + "]" : "[" + a.join(",") + "]";
        };
        var k, e, l = p;
        let u = b.length;
        var n = g[a], t = void 0 !== n && null !== n && (r.get(Object.getPrototypeOf(n)) || null);
        var v = t && t.cb;
        if (void 0 !== n && null !== n && "function" === typeof v) {
          p += E;
          if ("object" === typeof n && (e = c(n))) {
            return "ref" + e;
          }
          n = v.apply(n);
          p = l;
        } else {
          "object" === typeof n && (e = c(n));
        }
        "function" === typeof w && (n = w.call(g, a, n));
        switch(typeof n) {
          case "string":
          case "number":
            var A = "";
            "" === a && (A = h.map((a) => a.name + "{" + a.fields.join(",") + "}").join(p ? "\n" : "") + (p ? "\n" : ""));
            return t && t.external ? A + t.name + n : A + n;
          case "boolean":
          case "null":
            return String(n);
          case "object":
            if (e) {
              return "ref" + e;
            }
            if (!n) {
              return "null";
            }
            p += E;
            g = null;
            v = [];
            if (w && "object" === typeof w) {
              var G = w.length;
              g = m(n, w);
              for (k = 0; k < G; k += 1) {
                "string" === typeof w[k] && (A = w[k], b[u] = A, (e = x(A, n)) && (g ? v.push(e) : v.push(d(A) + (p ? ": " : ":") + e)));
              }
            } else {
              for (A in g = m(n), n) {
                Object.prototype.hasOwnProperty.call(n, A) && (b[u] = A, (e = x(A, n)) && (g ? v.push(e) : v.push(d(A) + (p ? ": " : ":") + e)));
              }
            }
            b.splice(u, 1);
            n = "" === a ? h.map((a) => a.name + "{" + a.fields.join(",") + "}").join(p ? "\n" : "") + (p ? "\n" : "") : "";
            t && t.external && (n = "" === a ? n + t.name : n + '"' + t.name + '"');
            e = n + (0 === v.length ? "{}" : p ? (g ? d(g.name) : "") + "{\n" + p + v.join(",\n" + p) + "\n" + l + "}" : (g ? d(g.name) : "") + "{" + v.join(",") + "}");
            p = l;
            return e;
        }
      }
      if (void 0 === a) {
        return "undefined";
      }
      if (null !== a) {
        var p, w, v;
        var E = p = "";
        if ("number" === typeof u) {
          for (v = 0; v < u; v += 1) {
            E += " ";
          }
        } else {
          "string" === typeof u && (E = u);
        }
        if ((w = g) && "function" !== typeof g && ("object" !== typeof g || "number" !== typeof g.length)) {
          throw Error("JSOX.stringify");
        }
        b = [];
        l = new WeakMap;
        return x("", {"":a});
      }
    }
    var h = [], k = '"', l = new WeakMap, b = [];
    r.get(Array.prototype) || r.set(Array.prototype, oa = {external:!1, name:Array.prototype.constructor.name, cb:null});
    return {defineClass(a, b) {
      h.push(a = {name:a, tag:Object.keys(b).toString(), proto:Object.getPrototypeOf(b), fields:Object.keys(b)});
      a.proto === Object.getPrototypeOf({}) && (a.proto = null);
    }, stringify(b, c, h) {
      return a(b, c, h);
    }, setQuote(a) {
      k = a;
    }};
  };
  const L = {"=":-1};
  for (var E = 0; 256 > E; E++) {
    64 > E && (L["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[E]] = E);
  }
  JSOX.stringify = function(c, m, a) {
    return JSOX.stringifier().stringify(c, m, a);
  };
  const ka = [[0, 384, [16767487, 16739071, 130048, 3670016, 0, 16777208, 16777215, 8388607, 8388608, 0, 128, 0, 0, 0, 0, 0]]].map((c) => ({firstChar:c[0], lastChar:c[1], bits:c[2]}));
}
privateizeEverything();


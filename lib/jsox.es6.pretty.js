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
    }, length:0}, u = [], fa = {}, t = null, H = 0, I = -1, f = 0, F = 0, R = !1, n = !1, P = !1, da = !1, A = !1, G = {first:null, last:null, saved:null, push(a) {
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
    }}, ha = null, S = !1, T = !1, B = !1, L = !1, D = !1, Q = !1, W = !1, y = 0, J = 0, X = !1, E = !1, K = !1, Y = !1;
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
      f = 0;
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
      L = B = S = E = !1;
    }, usePrototype(a, b) {
      fa[a] = b;
    }, write(a) {
      "string" !== typeof a && (a = String(a));
      for (a = this._write(a, !1); 0 < a && !(v && ("function" === typeof m && function ua(a, b) {
        var c, d = a[b];
        if (d && "object" === typeof d) {
          for (c in d) {
            if (Object.prototype.hasOwnProperty.call(d, c)) {
              var f = ua(d, c);
              void 0 !== f ? d[c] = f : delete d[c];
            }
          }
        }
        return m.call(a, b, d);
      }({"":v}, ""), c(v), v = void 0), 2 > a); a = this._write()) {
      }
    }, _write(c, m) {
      function q(a, b) {
        throw Error(`${a} '${String.fromCodePoint(b)}' unexpected at ${k} (near '${C.substr(4 < k ? k - 4 : 0, 4 < k ? 3 : k - 1)}[${String.fromCodePoint(b)}]${C.substr(k, 10)}') [${h.line}:${h.col}]`);
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
        for (; 0 == c && k < C.length;) {
          l = C.charAt(k);
          let d = C.codePointAt(k++);
          65536 <= d && (l += C.charAt(k), k++);
          h.col++;
          if (d == b) {
            B ? (a.string += l, B = !1) : (X ? q("Incomplete Octal sequence", d) : W ? q("Incomplete hexidecimal sequence", d) : Q ? q("Incomplete unicode sequence", d) : D && q("Incomplete long unicode sequence", d), c = 1);
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
                if (D) {
                  125 == d ? (a.string += String.fromCodePoint(y), B = Q = D = !1) : (y *= 16, 48 <= d && 57 >= d ? y += d - 48 : 65 <= d && 70 >= d ? y += d - 65 + 10 : 97 <= d && 102 >= d ? y += d - 97 + 10 : (q("(escaped character, parsing hex of \\u)", d), c = -1, B = D = !1));
                } else {
                  if (W || Q) {
                    if (0 === J && 123 === d) {
                      D = !0;
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
        for (; (b = k) < C.length;) {
          l = C.charAt(b);
          let c = C.codePointAt(k++);
          65536 <= c && (q("fault while parsing number;", c), l += C.charAt(k), k++);
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
        m || k != C.length ? (T = !1, a.value_type = 5, 0 == f && (E = !0)) : T = !0;
      }
      function ba() {
        let c, g = null, h = {};
        0 < b && 29 > b && z();
        if (0 == f) {
          29 == b && a.string.length ? (O.get(a.string) && (a.className = a.string), (g = u.find((b) => b.name === a.string)) ? (h = Object.assign(h, g.protoObject), Object.setPrototypeOf(h, Object.getPrototypeOf(g.protoObject)), c = 6) : (u.push(g = {name:a.string, protoObject:fa[a.string] || Object.create({}), fields:[]}), c = 5), b = 0) : (c = 3, b = 29);
        } else {
          if (29 == b || 1 === f || 4 === f) {
            0 != b ? (O.get(a.string) && (a.className = a.string), (g = u.find((b) => b.name === a.string)) || q("Referenced class " + a.string + " has not been defined", e), h = Object.assign(h, g.protoObject), Object.setPrototypeOf(h, Object.getPrototypeOf(g.protoObject)), c = 6) : c = 3, b = 0;
          } else {
            if (3 == f && 0 == b) {
              return q("fault while parsing; getting field name unexpected ", e), d = !1;
            }
            c = 3;
          }
        }
        {
          let b = la();
          a.value_type = 6;
          0 == f ? v = x = h : 4 == f && (x[a.name] = h);
          b.context = f;
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
          f = c;
        }
        return !0;
      }
      function ca() {
        0 < b && 29 > b && z();
        if (29 == b && a.string.length) {
          var c = ra.findIndex((b) => b === a.string);
          0 <= c ? (b = 0, I = c) : "ref" === a.string ? I = -2 : O.get(a.string) ? a.className = a.string : q("Unknown type specified for array:" + a.string, e);
        } else {
          if (3 == f || 29 == b || 30 == b) {
            return q("Fault while parsing; while getting field name unexpected", e), d = !1;
          }
        }
        {
          c = la();
          a.value_type = 13;
          let b = [];
          0 == f ? v = p = b : 4 == f && (x[a.name] = b);
          c.context = f;
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
          f = 1;
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
        T && (T = !1, a.value_type = 5, 0 == f && (E = !0), aa = 1);
      }
      for (; d && (M = G.shift());) {
        k = M.n;
        var C = M.buf;
        S && (c = ia(ha), 0 > c ? d = !1 : 0 < c && (S = !1, d && (a.value_type = 4)));
        for (T && ja(); !E && d && k < C.length;) {
          l = C.charAt(k);
          var e = C.codePointAt(k++);
          65536 <= e && (l += C.charAt(k), k++);
          h.col++;
          if (F) {
            if (1 == F) {
              if (42 == e) {
                F = 3;
                continue;
              }
              47 != e ? (q("fault while parsing;", e), d = !1) : F = 2;
              continue;
            }
            if (2 == F) {
              10 == e && (F = 0);
              continue;
            }
            if (3 == F) {
              42 == e && (F = 4);
              continue;
            }
            if (4 == F) {
              47 == e ? F = 0 : 42 != e && (F = 3);
              continue;
            }
          }
          switch(e) {
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
              3 == f ? 0 != b && 29 != b && 30 != b ? (d = FALSE, thorwError(`fault while parsing; unquoted keyword used as object field name (state:${b})`, e)) : (b = 0, a.name = a.string, a.string = "", f = 4, a.value_type = 0) : (1 == f ? q("(in array, got colon out of string):parsing fault;", e) : q("(outside any object, got colon out of string):parsing fault;", e), d = !1);
              break;
            case 125:
              b = 0;
              5 == f ? t ? (a.string && (t.protoObject[a.string] = void 0, t.fields.push(a.string)), N(), c = w.pop(), b = f = 0, a.name = c.name, x = c.elements, p = c.element_array, t = c.current_class, H = c.current_class_field, I = c.arrayType, a.className = c.className, r = null, V.push(c)) : q("State error; gathering class fields, and lost the class", e) : 3 == f || 6 == f ? (0 != a.value_type && (a.name = t.fields[H++], Z()), a.value_type = 6, a.contains = x, a.string = "", c = w.pop(), f = 
              c.context, a.name = c.name, x = c.elements, p = c.element_array, t = c.current_class, H = c.current_class_field, I = c.arrayType, a.className = c.className, V.push(c), 0 == f && (E = !0)) : 4 == f ? (0 != a.value_type && Z(), a.value_type = 6, a.contains = x, c = w.pop(), a.name = c.name, f = c.context, a.name = c.name, x = c.elements, t = c.current_class, H = c.current_class_field, I = c.arrayType, a.className = c.className, p = c.element_array, V.push(c), 0 == f && (E = !0)) : (q("Fault while parsing; unexpected", 
              e), d = !1);
              g = !1;
              break;
            case 93:
              31 == b && (b = 0);
              1 == f ? (0 != a.value_type && U(), a.contains = p, c = w.pop(), a.name = c.name, f = c.context, x = c.elements, t = c.current_class, H = c.current_class_field, I = c.arrayType, a.className = c.className, p = c.element_array, V.push(c), a.value_type = 13, 0 == f && (E = !0)) : (q(`bad context ${f}; fault while parsing`, e), d = !1);
              g = !1;
              break;
            case 44:
              if (31 == b || 29 == b) {
                b = 0;
              }
              5 == f ? t ? (t.protoObject[a.string] = void 0, t.fields.push(a.string), a.string = "", b = 29) : q("State error; gathering class fields, and lost the class", e) : 3 == f ? t ? (a.name = t.fields[H++], 0 != a.value_type && (Z(), N())) : q("State error; gathering class values, and lost the class", e) : 6 == f ? t ? (a.name = t.fields[H++], 0 != a.value_type && (Z(), N())) : q("State error; gathering class values, and lost the class", e) : 1 == f ? (0 == a.value_type && (a.value_type = 
              12), 0 != a.value_type && (U(), N())) : 4 == f ? (f = 3, 0 != a.value_type && (Z(), N())) : (d = !1, q("bad context; excessive commas while parsing;", e));
              g = !1;
              break;
            default:
              if (0 == f || 4 == f && 29 == b || 3 == f || 5 == f) {
                switch(e) {
                  case 96:
                  case 34:
                  case 39:
                    0 == b || 29 == b ? (a.string.length && (a.className = a.string, a.string = ""), ia(e) ? a.value_type = 4 : (ha = e, S = !0)) : q("fault while parsing; quote not at start of field name", e);
                    break;
                  case 10:
                    h.line++, h.col = 1;
                  case 13:
                  case 32:
                  case 9:
                  case 65279:
                    if (31 === b) {
                      b = 0;
                      0 === f && (E = !0);
                      break;
                    }
                    0 !== b && 30 !== b && (29 === b ? 0 === f ? E = !0 : a.string.length && (b = 30) : (d = !1, q("fault while parsing; whitepsace unexpected", e)));
                    break;
                  default:
                    (c = ka.find((a) => a.firstChar >= e && a.lastChar > e)) && c.bits[(e - c.firstChar) / 24] & 1 << (e - c.firstChar) % 24 ? (d = !1, q(`fault while parsing object field name; \\u${e}`, e)) : 0 == b && (48 <= e && 57 >= e || 43 == e || 46 == e || 45 == e) ? (n = A = da = Y = K = P = R = !1, a.string = l, M.n = k, ja()) : (30 === b && (d = !1, q("fault while parsing; character unexpected", e)), 0 === b && (b = 29, a.value_type = 4), a.string += l);
                }
              } else {
                switch(e) {
                  case 96:
                  case 34:
                  case 39:
                    ia(e) ? (a.value_type = 4, b = 31) : (ha = e, S = !0);
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
                      0 == f && (E = !0);
                      break;
                    }
                    0 != b && 30 != b && (29 == b ? a.string.length && (b = 30) : (d = !1, q("fault parsing whitespace", e)));
                    break;
                  case 116:
                    0 == b ? b = 1 : 27 == b ? b = 28 : z(e);
                    break;
                  case 114:
                    1 == b ? b = 2 : z(e);
                    break;
                  case 117:
                    2 == b ? b = 3 : 9 == b ? b = 10 : 0 == b ? b = 12 : z(e);
                    break;
                  case 101:
                    3 == b ? (a.value_type = 2, b = 31) : 8 == b ? (a.value_type = 3, b = 31) : 14 == b ? b = 15 : 18 == b ? b = 19 : z(e);
                    break;
                  case 110:
                    0 == b ? b = 9 : 12 == b ? b = 13 : 17 == b ? b = 18 : 22 == b ? b = 23 : 25 == b ? b = 26 : z(e);
                    break;
                  case 100:
                    13 == b ? b = 14 : 19 == b ? (a.value_type = -1, b = 31) : z(e);
                    break;
                  case 105:
                    16 == b ? b = 17 : 24 == b ? b = 25 : 26 == b ? b = 27 : z(e);
                    break;
                  case 108:
                    10 == b ? b = 11 : 11 == b ? (a.value_type = 1, b = 31) : 6 == b ? b = 7 : z(e);
                    break;
                  case 102:
                    0 == b ? b = 5 : 15 == b ? b = 16 : 23 == b ? b = 24 : z(e);
                    break;
                  case 97:
                    5 == b ? b = 6 : 20 == b ? b = 21 : z(e);
                    break;
                  case 115:
                    7 == b ? b = 8 : z(e);
                    break;
                  case 73:
                    0 == b ? b = 22 : z(e);
                    break;
                  case 78:
                    0 == b ? b = 20 : 21 == b ? (a.value_type = g ? 7 : 8, g = !1, b = 31) : z(e);
                    break;
                  case 121:
                    28 == b ? (a.value_type = g ? 9 : 10, g = !1, b = 31) : z(e);
                    break;
                  case 45:
                    0 == b ? g = !g : z(e);
                    break;
                  default:
                    0 == b && (48 <= e && 57 >= e || 43 == e || 46 == e || 45 == e) ? (n = A = da = Y = K = P = R = !1, a.string = l, M.n = k, ja()) : z(e);
                }
              }
          }
          if (E) {
            31 == b && (b = 0);
            break;
          }
        }
        k == C.length ? (ma.push(M), S || T || 3 == f ? aa = 0 : 0 != f || 0 == a.value_type && !v || (E = !0, aa = 1)) : (M.n = k, G.unshift(M), aa = 2);
        if (E) {
          r = null;
          break;
        }
      }
      if (!d) {
        return -1;
      }
      E && 0 != a.value_type && (v = ea(), g = !1, a.string = "", a.value_type = 0);
      E = !1;
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
        var k, f, l = p;
        let u = b.length;
        var n = g[a], t = void 0 !== n && null !== n && (r.get(Object.getPrototypeOf(n)) || null);
        var v = t && t.cb;
        if (void 0 !== n && null !== n && "function" === typeof v) {
          p += D;
          if ("object" === typeof n && (f = c(n))) {
            return "ref" + f;
          }
          n = v.apply(n);
          p = l;
        } else {
          "object" === typeof n && (f = c(n));
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
            if (f) {
              return "ref" + f;
            }
            if (!n) {
              return "null";
            }
            p += D;
            g = null;
            v = [];
            if (w && "object" === typeof w) {
              var G = w.length;
              g = m(n, w);
              for (k = 0; k < G; k += 1) {
                "string" === typeof w[k] && (A = w[k], b[u] = A, (f = x(A, n)) && (g ? v.push(f) : v.push(d(A) + (p ? ": " : ":") + f)));
              }
            } else {
              for (A in g = m(n), n) {
                Object.prototype.hasOwnProperty.call(n, A) && (b[u] = A, (f = x(A, n)) && (g ? v.push(f) : v.push(d(A) + (p ? ": " : ":") + f)));
              }
            }
            b.splice(u, 1);
            n = "" === a ? h.map((a) => a.name + "{" + a.fields.join(",") + "}").join(p ? "\n" : "") + (p ? "\n" : "") : "";
            t && t.external && (n = "" === a ? n + t.name : n + '"' + t.name + '"');
            f = n + (0 === v.length ? "{}" : p ? (g ? d(g.name) : "") + "{\n" + p + v.join(",\n" + p) + "\n" + l + "}" : (g ? d(g.name) : "") + "{" + v.join(",") + "}");
            p = l;
            return f;
        }
      }
      if (void 0 === a) {
        return "undefined";
      }
      if (null !== a) {
        var p, w, v;
        var D = p = "";
        if ("number" === typeof u) {
          for (v = 0; v < u; v += 1) {
            D += " ";
          }
        } else {
          "string" === typeof u && (D = u);
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
  for (var D = 0; 256 > D; D++) {
    64 > D && (L["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[D]] = D);
  }
  JSOX.stringify = function(c, m, a) {
    return JSOX.stringifier().stringify(c, m, a);
  };
  const ka = [[0, 384, [16767487, 16739071, 130048, 3670016, 0, 16777208, 16777215, 8388607, 8388608, 0, 128, 0, 0, 0, 0, 0]], [384, 768, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15360, 14745596, 16777135]], [768, 1152, [0, 0, 0, 0, 2097152, 12352, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0]], [1152, 1536, [772, 0, 0, 0, 0, 0, 0, 0, 0, 252, 0, 230, 0, 18752, 0, 6144]], [1536, 1920, [65535, 216, 0, 0, 15360, 0, 0, 0, 1048576, 131168, 16736256, 191, 0, 0, 0, 0]], [1920, 2304, [0, 0, 0, 0, 12582912, 3, 0, 8388352, 
  0, 64, 0, 0, 0, 0, 262144, 0]], [2304, 2688, [0, 0, 0, 0, 65584, 0, 0, 0, 0, 0, 12284, 0, 0, 0, 0, 0]], [2688, 3072, [0, 0, 0, 0, 196608, 0, 0, 0, 0, 0, 253, 0, 0, 0, 0, 524032]], [3072, 3456, [0, 0, 0, 0, 0, 255, 0, 0, 0, 0, 0, 0, 0, 8388608, 32512, 261888]], [3456, 3840, [0, 0, 0, 0, 1048576, 0, 0, 8388608, 32768, 12, 0, 0, 0, 0, 0, 0]], [3840, 4224, [16777214, 16515324, 15711, 0, 0, 8192, 0, 12582912, 16768959, 7, 0, 0, 0, 16515072, 0, 0]], [4224, 4608, [0, 192, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0]], [4608, 4992, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16711680, 2096129]], [4992, 5376, [16711680, 3, 0, 0, 0, 256, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]], [5376, 5760, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 96]], [5760, 6144, [1, 24, 0, 0, 14336, 0, 0, 24576, 0, 0, 0, 0, 0, 0, 3952, 261888]], [6144, 6528, [18431, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12544, 0, 0]], [6528, 6912, [0, 0, 0, 12582912, 16777215, 255, 49152, 0, 0, 0, 0, 0, 16255, 64, 0, 0]], [6912, 7296, [0, 0, 0, 16515072, 
  15730687, 31, 0, 0, 0, 0, 61440, 0, 0, 248, 0, 12582912]], [7296, 7680, [0, 0, 16711680, 2048, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]], [8064, 8448, [0, 0, 237568, 14680288, 57344, 16777056, 16777215, 8388607, 15728638, 16769023, 16744433, 127, 16777215, 255, 1957888, 0]], [8448, 8832, [13632379, 176064, 2034688, 16777148, 0, 917504, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215]], [8832, 9216, [16777215, 16777215, 16777215, 16777215, 16777215, 
  16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215]], [9216, 9600, [16777215, 32767, 16711680, 7, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215]], [9600, 9984, [16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215]], [9984, 10368, [16777215, 16777215, 16777215, 
  16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215]], [10368, 10752, [16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215]], [10752, 11136, [16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16764927]], [11136, 11520, 
  [4194303, 16777215, 16770047, 2045, 61440, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14680064, 16646151]], [11520, 11904, [0, 0, 0, 0, 65536, 0, 0, 0, 0, 0, 16711680, 16777215, 16777215, 262143, 0, 0]], [11904, 12288, [16777215, 16777211, 16777215, 16777215, 1048575, 16776960, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 63, 1048320]], [12288, 12672, [16776991, 511, 57537, 0, 0, 0, 65536, 0, 0, 0, 2048, 0, 0, 0, 0, 0]], [12672, 13056, [16711680, 255, 16711680, 16777215, 15, 
  16776960, 16744447, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 8388607]], [13056, 13440, [16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 65535, 0, 0, 0, 0, 0]], [19584, 19968, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16776960, 16777215, 16777215]], [41856, 42240, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16776960, 16777215, 32767, 0, 12582912]], [42240, 42624, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 224, 0, 0, 0, 4198144]], 
  [42624, 43008, [0, 0, 0, 0, 16515072, 16776960, 196735, 0, 0, 0, 0, 6, 0, 0, 0, 0]], [43008, 43392, [0, 983040, 1023, 0, 15728640, 0, 0, 0, 49152, 0, 5888, 0, 49152, 0, 32768, 0]], [43392, 43776, [0, 0, 16646144, 12582975, 0, 0, 0, 0, 0, 240, 896, 0, 0, 0, 49152, 768]], [43776, 44160, [0, 0, 0, 524288, 0, 0, 0, 0, 0, 524288, 0, 0, 0, 0, 0, 0]], [64128, 64512, [0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 16515072, 1023, 0, 0]], [64512, 64896, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 192, 0, 0]], [64896, 
  65280, [0, 0, 0, 0, 0, 48, 1023, 16770816, 16195583, 1015807, 0, 0, 0, 0, 0, 8388608]], [65280, 65664, [65534, 508, 96256, 16252928, 63, 0, 0, 0, 0, 8355584, 15872, 0, 0, 0, 0, 0]], [65664, 66048, [0, 0, 0, 0, 0, 16746240, 16777215, 16748543, 0, 0, 16777184, 1048447, 1, 0, 16777215, 2097151]], [66048, 66432, [0, 0, 0, 0, 0, 0, 0, 0, 0, 16776704, 4095, 0, 15, 0, 0, 0]], [66432, 66816, [0, 128, 0, 256, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]], [66816, 67200, [0, 0, 0, 0, 32768, 0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0]], [67584, 67968, [0, 0, 0, 16744448, 8388608, 255, 8388608, 255, 0, 0, 63488, 9420800, 0, 128, 0, 0]], [67968, 68352, [0, 0, 16723968, 16776447, 16777215, 255, 0, 0, 16711935, 1, 57344, 14680064, 0, 65536, 0, 32760]], [68352, 68736, [0, 0, 65024, 16711680, 0, 255, 7680, 254, 0, 0, 0, 0, 0, 0, 0, 0]], [68736, 69120, [0, 0, 0, 0, 0, 252, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]], [69120, 69504, [0, 0, 0, 0, 16777215, 127, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]], [69504, 69888, [0, 0, 0, 0, 0, 0, 0, 0, 16531328, 
  16383, 0, 0, 0, 1016, 0, 0]], [69888, 70272, [0, 0, 983040, 0, 3145728, 0, 0, 0, 9184, 16776936, 31, 0, 0, 63, 0, 0]], [70272, 70656, [0, 131072, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]], [70656, 71040, [0, 0, 0, 2621688, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0]], [71040, 71424, [0, 0, 16646144, 65535, 0, 0, 0, 0, 14, 2096896, 0, 0, 0, 0, 0, 0]], [71424, 71808, [0, 0, 64512, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]], [71808, 72192, [0, 0, 0, 0, 523264, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]], [72192, 72576, 
  [0, 0, 8355840, 0, 0, 0, 515072, 0, 0, 0, 0, 0, 0, 0, 0, 0]], [72576, 72960, [0, 0, 0, 0, 0, 0, 0, 0, 62, 2097148, 3, 0, 0, 0, 0, 0]], [74496, 74880, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7936]], [92544, 92928, [0, 0, 0, 0, 0, 0, 0, 0, 0, 12582912, 0, 0, 0, 0, 0, 8192]], [92928, 93312, [0, 0, 3211136, 16252928, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]], [113664, 114048, [0, 0, 0, 0, 0, 0, 1019904, 0, 0, 0, 0, 0, 0, 0, 0, 0]], [118656, 119040, [0, 0, 0, 0, 0, 16776960, 16777215, 16777215, 16777215, 
  16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16383]], [119040, 119424, [16777215, 16678911, 16777215, 16777215, 16260127, 15734791, 16777215, 16777155, 16777215, 131071, 16711680, 16777215, 16777215, 9215, 0, 0]], [119424, 119808, [0, 0, 0, 0, 0, 16776960, 16777215, 16777215, 8388607, 16776960, 3, 0, 0, 0, 0, 0]], [120192, 120576, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 512, 2048, 524288]], [120576, 120960, [2097152, 0, 32, 128, 32768, 131072, 0, 2, 8, 0, 16711680, 16777215, 16777215, 
  16777215, 16777215, 16777215]], [120960, 121344, [16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215]], [121344, 121728, [0, 0, 1920, 0, 14671872, 1044479, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]], [124800, 125184, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16744448, 0, 0]], [125184, 125568, [0, 0, 0, 12582912, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]], [126336, 126720, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 768]], [126720, 127104, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16711680, 16777215, 16715775, 16777215, 16777215, 16777215]], [127104, 127488, [1048575, 8388352, 16711678, 16776959, 4194303, 2096896, 16777215, 16777087, 16777215, 1048575, 16777215, 16777215, 8191, 0, 12582912, 16777215]], [127488, 127872, [16711687, 16777215, 16715775, 769, 63, 0, 0, 0, 0, 0, 16711680, 16777215, 16777215, 16777215, 16777215, 16777215]], [127872, 128256, [16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 
  16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215]], [128256, 128640, [16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215]], [128640, 129024, [16777215, 16777215, 16777215, 8191, 16719871, 16776961, 16777215, 16777215, 16777215, 16777215, 16711695, 16777215, 16777215, 16777215, 31, 0]], [129024, 129408, [16715775, 16777215, 16777215, 261888, 
  16777215, 65535, 16777215, 63, 0, 0, 16711680, 16776975, 16777215, 2097023, 16777215, 15]], [129408, 129792, [16777215, 0, 65536, 16776960, 127, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]], [917376, 917760, [0, 0, 0, 0, 0, 512, 16711680, 16777215, 16777215, 16777215]]].map((c) => ({firstChar:c[0], lastChar:c[1], bits:c[2]}));
}
privateizeEverything();


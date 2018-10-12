/*
 * JSON Grammar
 * ============
 *
 * Based on the grammar from RFC 7159 [1].
 *
 * Note that JSON is also specified in ECMA-262 [2], ECMA-404 [3], and on the
 * JSON website [4] (somewhat informally). The RFC seems the most authoritative
 * source, which is confirmed e.g. by [5].
 *
 * [1] http://tools.ietf.org/html/rfc7159
 * [2] http://www.ecma-international.org/publications/standards/Ecma-262.htm
 * [3] http://www.ecma-international.org/publications/standards/Ecma-404.htm
 * [4] http://json.org/
 * [5] https://www.tbray.org/ongoing/When/201x/2014/03/05/RFC7159-JSON
 */

/* ----- 2. JSON Grammar ----- */

{
    var myList = new Map();
    function saveRef( name, vals ) {
	var def = myList.get( name );
	if( def ) {
		var z = def.reduce( (acc,val,idx)=>{ acc[val]=vals[idx]; return acc; }, {} );
		return z;
	} else {
		myList.set( name, vals );
	}
	
    }
}

JSON_text
  = ws value:(value)* ws { var vals= value.reduce( (acc,v)=>((v&&acc.push(v)),acc), [] ); return vals.length>1?vals:vals.length?vals[0]:undefined }

begin_array     = ws "[" ws
begin_object    = ws "{" ws
end_array       = ws "]" ws
end_object      = ws "}" ws
name_separator  = ws ":" ws
value_separator = ws "," ws

ws "whitespace" = [ \t\n\r\u07ec\u07ed]*

/* ----- 3. Values ----- */

value
  = false
  / Undefined
  / NaN
  / Infinity
  / NegInfinity
  / null
  / true
  / objectDef
  / object
  / array
  / numberBig
  / number
  / string
  

Undefined   = "undefined" { return undefined; }
NaN         = "NaN" { return NaN; }
Infinity    = "Infinity" { return Infinity; }
NegInfinity = "-Infinity" { return -Infinity; }
false       = "false" { return false; }
null        = "null"  { return null;  }
true        = "true"  { return true;  }

/* ----- 4. Objects ----- */

objectDef
  = ident:string begin_object
    fields:(
      head:string
      tail:(value_separator v:value { return v; })*
      { var ab = saveRef( ident, [head].concat(tail) ); return ab; }
    )?
    end_object
    { return fields; }

typedArray
  =  ( "ab"  begin_array base64 end_array 
     / "u8"  begin_array base64 end_array 
     / "s8"  begin_array base64 end_array 
     / "u16"  begin_array base64 end_array 
     / "s16"  begin_array base64 end_array 
     / "u32"  begin_array base64 end_array 
     / "s32"  begin_array base64 end_array 
     / "f32"  begin_array base64 end_array 
     / "f64"  begin_array base64 end_array 
     / "ref"  begin_array
    fields:(
      head:string
      tail:(value_separator v:value { return v; })*
      { return "PATH RESOLVED" + fields; }
    )?
    end_array
    )

//typedString



object
  = begin_object
    members:(
      head:member
      tail:(value_separator m:member { return m; })*
      {
        var result = {}, i;

        result[head.name] = head.value;

        for (i = 0; i < tail.length; i++) {
          result[tail[i].name] = tail[i].value;
        }

        return result;
      }
    )?
    end_object
    { return members !== null ? members: {}; }

member
  = name:string name_separator value:value {
      return { name: name, value: value };
    }

/* ----- 5. Arrays ----- */

array
  = begin_array
    values:(
      head:value
      tail:(value_separator v:value { return v; })*
      { return [head].concat(tail); }
    )?
    end_array
    { return values !== null ? values : []; }

/* ----- 6. Numbers ----- */

number "number"
  = m:minus? l:int ( d: date { if( d.find( (c)=>c==="T") ) { console.log( "DATE?", l, "[", (m?m:"")+l.join("")+d.join(""),"]" ); return new Date( (m?m:"")+l.join("")+d.join("") );} else return parseFloat( (m?m:"")+l.join("")+d.join("") );  }
               / frac? exp? { return parseFloat(text()); }
               )
numberBig "numberBig"
  = minus? int "n" { return BigInt(text()); }

decimal_point = "."
date          = ([0-9]/"T"/"Z"/":"/"-"/"."/"+")*
digit1_9      = [1-9]
e             = [eE]
exp           = e (minus / plus)? DIGIT+
frac          = decimal_point DIGIT+
int           = zero / (digit1_9 DIGIT*)
minus         = "-"
plus          = "+"
zero          = "0"

/* ----- 7. Strings ----- */

string "string"
  = ( quotation_mark chars:char* quotation_mark { return chars.join(""); } /
      chars1:[^0-9^:^\,^\[^\]^\{^\}^\(^\)] chars:identChar* ( ws / [\,\[\]\{\}] ) { return chars1 + chars.join(""); } )

identChar = unescaped

char
  = unescaped
  / escape
    sequence:(
        '"'
      / "'"
      / "`"
      / "\\"
      / "/"
      / "b" { return "\b"; }
      / "f" { return "\f"; }
      / "n" { return "\n"; }
      / "r" { return "\r"; }
      / "t" { return "\t"; }
      / "u" ( digits:$(HEXDIG HEXDIG HEXDIG HEXDIG) { return String.fromCharCode(parseInt(digits, 16)); } 
            / "{" digits:$(HEXDIG? HEXDIG? HEXDIG? HEXDIG? HEXDIG?) "}" { return String.fromCharCode(parseInt(digits, 16)); } )
    )
    { return sequence; }

escape         = "\\"
quotation_mark = '"'
unescaped      = [^\0-\x1F\x22:\,\[\]\{\}]

/* ----- Core ABNF Rules ----- */

/* See RFC 4234, Appendix B (http://tools.ietf.org/html/rfc4627). */
DIGIT  = [0-9]
HEXDIG = [0-9a-f]i
base64 = [0-9a-zA-Z+/=]
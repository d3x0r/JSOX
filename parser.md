Parser State Transitions

The parser is implemented as a stateful streaming processor, which
returns with each completed value.  The state is controlled primarily
by 'context' and 'word'.  'context' is where, within the structure of
of the document it parsing is.  

CONTEXT_UNKNOWN   
CONTEXT_IN_ARRAY            - '[' until matching ']'

CONTEXT_OBJECT_FIELD        - '{' until matchin '}'; but is after a letter
                              of the identifier starts, or just after
							  a gathered string.
CONTEXT_OBJECT_FIELD_VALUE  - after ':', still in OBJECT_FIELD
CONTEXT_CLASS_FIELD         - (identifer '{') in CONTEXT_UNKNOWN, define 
                              typed-object, contents of { } are a list of
							  strings/identifiers.
CONTEXT_CLASS_VALUE         - (identifer '{') in CONTEXT_OBJECT_FIELD_VALUE,
                              CONTEXT_IN_ARRAY. or CONTEXT_UNKNOWN and
							  the identifier previously defined a typed-
							  object.

Values are any of the primitive keywords, Numbers(big,Date), 
Strings(unquoted identifier), Object, Array

There are 2 sub-state handlers which are responsible for
handling strings and numbers.  These will be called gatherers.

A 'Value' type is suggested.  A value type will have a notation
that indicates it's type as an enumeration (or other list of symbols), it
will have the string(or character sequence) that is the source of the current
'value', and perhaps a native conversion of that string to a native type;
for example in C, representing uint64_t and double as native data types.  In
a language such as Javascript, a value may be just a 'var', which similarly
has all such information available.  Although a parallel state needs to track
the value type still, because there is a VALUE_UNSET which is different from 
VALUE_UNDEFINED, in that a VALUE_UNSET has not had a completed value assigned
to it (any string data may be incomplete).

There are a few distinct parsing states that reflect the current state 
within structural characters ( '{','[',':',',','}',']' ).  CONTEXT_UNKNOWN, 
that is a context state before anything is parsed, or 'the outermost' context.
Within CONTEXT_UNKNOWN, primitive values delimited by either whitespace or
quotes or any of the structural characters.  This allows, at a top level 
something like '{a:1}{b:2}[3][4]"5"6 ' to be a valid stream of values 
`[{a:1},{b:2},[3],[4],"5",6]` each value returned sequentially (or otherwise
emitted to the application).

CONTEXT_IN_ARRAY - after the open '[', until ']', generally changes the 
operation of several structural characters.
   ',' is to complete the previous value, and store it in the current array.
   ':' is illegal.
   '{' begin Object; save CONTEXT,WORDPOS,CollectedValue, goto CONTEXT_OBJECT_FIELD
   '}' is illegal.
   '[' begin Array; save CONTEXT,WORDPOS,CollectedValue start CONTEXT_IN_ARRAY
   ']' Pop the saved CONTEXT,WORDPOS,CollectedValue (goto previous)
   
   
CONTEXT_OBJECT_FIELD - after the open '{', until '}', generally 
   ',' is illegal, may be ignored  as in {,,,,} === {}
   ':' completes the field identifier.  Stores it as the 'name' of the current value.
   ']' is illegal.
   '[' is illegal.
   '{' is illegal.
   '}' pop the saved CONTEXT,WORDPOS,CollectedValue (goto previous)
   A quote or Legal identifier start, begin collecting field name (WORD_IN_FIELD)
   whitespace after a field name sets WORD_AFTER_FIELD
   if WORD_AFTER_FIELD, and new string/identifier (basically not a ':') fault,
   string-string is only legal in CONTEXT_UNKNOWN

CONTEXT_OBJECT_AFTER_FIELD - after ':', a Value is expected here
   '[' - begin Array; save CONTEXT,WORDPOS,CollectedValue, goto CONTEXT_IN_ARRAY
   '{' - begin Object; save CONTEXT,WORDPOS,CollectedValue, goto CONTEXT_OBJECT_FIELD
   ':' - illegal... ':' after ':'
   ',' - complete value, push collected field (with name)
   '}' - complete value, push collected field, pop CONTEXT,WORDPOS,CollectedValue
   ']' - is illegal.
   
CONTEXT_CLASS_FIELD - This is defining a typed-object.  if Identifier/String 
gathered, is followed by '{', and is in CONTEXT_UNKNOWN, and the identifier/string
hasn't already previously been defined (otherwise, it's a reference of the defined
type CONTEXT_CLASS_VALUE).
   ':' - illegal
   ',' - push field string/identifier
   '[' - illegal
   ']' - illegal
   '{' - illegal
   '}' - close current class definition, reset to CONTET_UNKNOWN.

CONTEXT_CLASS_VALUE - if Identifier/String gathered, is followed by '{'
and CONTEXT_UNKNOWN or CONTEXT_IN_ARRAY or CONTEXT_OBJECT_AFTER_FIELD.
   ':' - illegal
   ',' - push value, using respective field name from object definition
   '[' - save CONTEXT,WORDPOS,CollectedValue start CONTEXT_IN_ARRAY
   ']' - illegal
   '{' - save CONTEXT,WORDPOS,CollectedVvalue start CONTEXT_OBJECT_FIELD 
   '}' - close current object definition, reset to CONTET_UNKNOWN.
   
String Gatherer
    updates position.
	Is given the current input state, the current output state, and the opening quote.
	A basic implementation will gather data until the current character is the same as
	the opening quote, and is also not escaped.  Escapes using backslashes (\), must
	be resolved.  (See String section)
	
Number Gatherer
    After the first character which defines the start of a number, this routine
	handles validation of input and gathering of the number.  It results with the 
	type of number which may be 'Number', but may be Integer, Float, Date, BigInt, 
	Radix-Integer(0x123).  Integers may be resulted using the largest available
	signed integer type, or with more detailed types, 64 bit integers are expected to
	not have loss of data.  Floats may result in the largest available precision,
	or more detailed.  From the gatherer, Dates and BigInts are returned as their strings.
	
Stream Processor
    if( gatheringString) call String Gatherer
	if( gatherNumber) call Number Gatherer
	while( not in error state AND
	       get a character from input ) {
		if( commentState active ) {
		    process comment characters
			ignore character, continue next character.
        }
		
	    if( '{','[',':',',','}',']' )
			Complete Value
			
				 
		else {
		    if( is Quote '"',"'","`" ) 
				Complete Value
			    set gatheringString
                if( had a value ) return now
				  else call String Gatherer.
		    if( is whitespace " ","\t","\n",... )
			    
			    Complete Value
                (CONTEXT UNKNOWN)if( had a value ) return now
				
			if( one of "truefalsndiIyN" ) step constant word state.
			if( '-' ) and AT WORD_POS_RESET; save 'negative=!negative)
			    (This isn't automatically a number because -Infinity)
				
			if( '+','.','0'-'9' ) begin number, call Number Gatherer
			
			if( not identifier character ) 
			    throw error.
		
		    collect character to identifier.
			    
		}
	}
	if( Value.Type != UNSET )
	    return value


Complete Value
		    complete current value (or value has string)
			    parse gathered string
				convert to native type
				commit gathered value to current container
				reset gathered value.


		
Stream Buffer(er)
    forEach input block, add input to pending input for the Stream Processor.
	

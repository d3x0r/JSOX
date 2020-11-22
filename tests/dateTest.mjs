
import {JSOX} from "../lib/jsox.mjs";

console.log( "Date:", JSOX.stringify( new Date() ) );
const wasDate = JSOX.parse( "2020-11-22T11:08:09.415-08:00" );
console.log( "Date:", wasDate );

const test = '{TaxId:[{tag:SSN,value:"123-456-7890"}],addresses:[],bankAccounts:[],contact:[],data:ref[],dob:2020-11-21T21:55:05.596-06:00,email:[],fName:Test,fmtName:"",lName:User,mName:M,nName:"",suffix:"",title:"Mr.",webAccounts:[]}';
const out = JSOX.parse( test );

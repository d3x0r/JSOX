// Generate lib/jsox.mjs from src/jsox.mjs.
//
// src/jsox.mjs is the only hand-edited parser source.  Everything in lib/ is a
// build product: this script writes lib/jsox.mjs with the package version
// stamped in and a generated-file header; mjs-to-cjs.mjs then derives
// lib/jsox.js from it, and rollup derives the minified/gzipped variants.
//
// The version stamped is the git tag on HEAD when there is one (so a tagged
// release always reports the tag it was built from); otherwise the version in
// package.json is used, so an untagged working tree still builds.
//
//   node src-to-lib.mjs             write lib/jsox.mjs
//   node src-to-lib.mjs --check     exit 1 if lib/jsox.mjs is stale (no write)

import FS from "fs";
import {sack} from "sack.vfs";

const SRC = "src/jsox.mjs";
const DST = "lib/jsox.mjs";

const pkg = JSON.parse( FS.readFileSync( "package.json", "utf8" ) );

getBranch( ( branch, tags ) => {
	if( tags && tags.length ) {
		// tags on HEAD; a release tag may be written as 1.2.130 or v1.2.130.
		const version = tags[0].replace( /^v/, "" );
		if( version !== pkg.version )
			console.warn( `WARNING: HEAD is tagged ${tags[0]} but package.json says ${pkg.version}; stamping ${version}.` );
		stamp( version, `git tag ${tags[0]}` );
	}
	else
		stamp( pkg.version, "package.json" );
} );

function stamp( version, from ) {
	const src = FS.readFileSync( SRC, "utf8" );
	const nl  = src.includes( "\r\n" ) ? "\r\n" : "\n";

	const versionLine = /^JSOX\.version = "[^"]*";$/m;
	if( !versionLine.test( src ) )
		throw new Error( `${SRC}: could not find the 'JSOX.version = "...";' line to stamp.` );

	const header = [
		`// GENERATED FILE -- do not edit.`,
		`// Built from ${SRC} by src-to-lib.mjs (npm run build); edits here are overwritten.`,
		``,
	].join( nl );

	const out = header + src.replace( versionLine, `JSOX.version = "${version}";` );

	if( process.argv.includes( "--check" ) ) {
		const cur = FS.existsSync( DST ) ? FS.readFileSync( DST, "utf8" ) : null;
		if( cur === out ) { console.log( `${DST} is up to date.` ); process.exit( 0 ); }
		console.error( `${DST} is STALE -- run: node src-to-lib.mjs` );
		process.exit( 1 );
	}

	FS.writeFileSync( DST, out );
	console.log( `wrote ${DST} from ${SRC} (version ${version}, from ${from})` );
}

//---------------------------------------------------------------------------
// git helpers.  cb( branch, tags ) is always called; tags is the list of tags
// on HEAD, which is empty when HEAD is not tagged or this is not a git checkout.
//---------------------------------------------------------------------------

function getBranch( cb ) {
	const gitlog = [];
	const task = sack.Task( {
		bin: "git"
		, args: [ "branch" ]
		, input( buffer ) {
			gitlog.push( buffer );
		}
		, end() {
			if( task.exitCode === 128 ) {
				console.log( "Not in a git repository; using package.json version." );
				cb( null, [] );
				return;
			}
			let branch = null;
			for( const line of gitlog.join( '' ).replaceAll( ' ', '' ).split( '\n' ) ) {
				if( line[0] === '*' ) {
					branch = line.substr( 1 );
					break;
				}
			}
			getTag( branch, cb );
		}
	} );
}

function getTag( branch, cb ) {
	const gitlog = [];
	const tags = [];
	const task = sack.Task( {
		bin: "git"
		, args: [ "log", "-n", "1", "--decorate" ]
		, input( buffer ) {
			gitlog.push( buffer );
		}
		, end() {
			if( task.exitCode === 128 ) {
				console.log( "Not in a git repository; using package.json version." );
				cb( branch, [] );
				return;
			}
			// first line looks like: commit <sha> (HEAD -> master, tag: 1.2.129, origin/master)
			const decorations = /\(([^)]*)\)/.exec( gitlog.join( '' ).split( '\n' )[0] );
			if( decorations ) {
				for( const seg of decorations[1].split( ',' ) ) {
					const s = seg.trim();
					if( s.startsWith( "tag:" ) )
						tags.push( s.substr( 4 ).trim() );
				}
			}
			if( tags.length === 0 )
				showLastTag( () => cb( branch, [] ) );
			else
				cb( branch, tags );
		}
	} );
}

function showLastTag( cb ) {
	let lastTag = "";
	const task = sack.Task( {
		bin: "git"
		, args: [ "describe", "--tags", "--abbrev=0" ]
		, input( buffer ) {
			lastTag += buffer;
		}
		, end() {
			lastTag = lastTag.replace( /[\r\n]+$/, "" );
			if( task.exitCode === 0 && lastTag )
				console.log( `HEAD is not tagged (last tag is ${lastTag}); using package.json version.` );
			else
				console.log( "HEAD is not tagged; using package.json version." );
			cb();
		}
	} );
}

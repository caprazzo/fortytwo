/** Called automatically by JsDoc Toolkit. */
function publish(symbolSet) {
	publish.conf = {  // trailing slash expected for dirs
		ext:         ".html",
		outDir:      JSDOC.opt.d || SYS.pwd+"../out/couchapp/",
		templatesDir: JSDOC.opt.t || SYS.pwd+"../templates/couchapp/"
	};
	
	// is source output is suppressed, just display the links to the source file
	if (JSDOC.opt.s && defined(Link) && Link.prototype._makeSrcLink) {
		Link.prototype._makeSrcLink = function(srcFilePath) {
			return "&lt;"+srcFilePath+"&gt;";
		}
	}
	
	// create the folders and subfolders to hold the output
	IO.mkPath((publish.conf.outDir+"symbols/src").split("/"));
		
	// used to allow Link to check the details of things being linked to
	Link.symbolSet = symbolSet;

	// create the required templates
	try {
		var couchappTemplate = new JSDOC.JsPlate(publish.conf.templatesDir+"couchapp.tmpl");
	}
	catch(e) {
		print("Couldn't create the required templates: "+e);
		quit();
	}
	
	var symbols = symbolSet.toArray();
	var couchapp = {
		shows: [],
		lists: [],
		updates: [],
		views: {},
		fulltext: {}
	}
	
	symbols.forEach(function(symbol) {
		if (symbol.srcFile) {
			makeSrcFile(symbol.srcFile, publish.conf.outDir, symbol.alias);
			symbol.viewSource = symbol.alias + '.html';
		}
		var P = symbol.alias.split('.');
		
		switch(P[0]) {
			case 'views':
			case 'fulltext':				
				print(P[0] + ' ' + P[1] + ' ' + ' ' + P[2] + ' ' + symbol.alias);
				if (!couchapp[P[0]][P[1]]) couchapp[P[0]][P[1]] = [];
				couchapp[P[0]][P[1]].push(symbol);
			break;
			case 'lists':
			case 'updates':
			case 'shows':				
				couchapp[P[0]].push(symbol);
			break;			
		}
	});
			
	IO.saveFile(publish.conf.outDir, "index"+publish.conf.ext, couchappTemplate.process(couchapp));
}

/** Turn a raw source file into a code-hilited page in the docs. */
function makeSrcFile(path, srcDir, name) {
	if (JSDOC.opt.s) return;

	var src = {path: path, name:name, charset: IO.encoding, hilited: ""};
	
	if (defined(JSDOC.PluginManager)) {
		JSDOC.PluginManager.run("onPublishSrc", src);
	}

	if (src.hilited) {		
		IO.saveFile(srcDir, name+publish.conf.ext, src.hilited);
	}
}

/** Find symbol {@link ...} strings in text and turn into html links */
function resolveLinks(str, from) {
	return str.replace(/\{@link ([^} ]+) ?\}/gi,
		function(match, symbolName) {
			return '<a href="#'+symbolName+'">'+symbolName+'</a>';			
		}
	);	
}

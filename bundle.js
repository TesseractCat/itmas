(()=>{var Io=Object.create;var bs=Object.defineProperty;var Do=Object.getOwnPropertyDescriptor;var zo=Object.getOwnPropertyNames;var ko=Object.getPrototypeOf,Oo=Object.prototype.hasOwnProperty;var No=(r,t,e)=>t in r?bs(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var fi=(r=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(r,{get:(t,e)=>(typeof require<"u"?require:t)[e]}):r)(function(r){if(typeof require<"u")return require.apply(this,arguments);throw new Error('Dynamic require of "'+r+'" is not supported')});var Fo=(r,t)=>()=>(t||r((t={exports:{}}).exports,t),t.exports);var Uo=(r,t,e,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of zo(t))!Oo.call(r,i)&&i!==e&&bs(r,i,{get:()=>t[i],enumerable:!(n=Do(t,i))||n.enumerable});return r};var Bo=(r,t,e)=>(e=r!=null?Io(ko(r)):{},Uo(t||!r||!r.__esModule?bs(e,"default",{value:r,enumerable:!0}):e,r));var Ht=(r,t,e)=>(No(r,typeof t!="symbol"?t+"":t,e),e);var To=Fo((So,Hr)=>{(function(r){typeof So=="object"&&typeof Hr<"u"?Hr.exports=r():typeof define=="function"&&define.amd?define([],r):(typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:this).JSZip=r()})(function(){return function r(t,e,n){function i(a,h){if(!e[a]){if(!t[a]){var l=typeof fi=="function"&&fi;if(!h&&l)return l(a,!0);if(s)return s(a,!0);var p=new Error("Cannot find module '"+a+"'");throw p.code="MODULE_NOT_FOUND",p}var u=e[a]={exports:{}};t[a][0].call(u.exports,function(f){var m=t[a][1][f];return i(m||f)},u,u.exports,r,t,e,n)}return e[a].exports}for(var s=typeof fi=="function"&&fi,o=0;o<n.length;o++)i(n[o]);return i}({1:[function(r,t,e){"use strict";var n=r("./utils"),i=r("./support"),s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";e.encode=function(o){for(var a,h,l,p,u,f,m,g=[],c=0,d=o.length,_=d,y=n.getTypeOf(o)!=="string";c<o.length;)_=d-c,l=y?(a=o[c++],h=c<d?o[c++]:0,c<d?o[c++]:0):(a=o.charCodeAt(c++),h=c<d?o.charCodeAt(c++):0,c<d?o.charCodeAt(c++):0),p=a>>2,u=(3&a)<<4|h>>4,f=1<_?(15&h)<<2|l>>6:64,m=2<_?63&l:64,g.push(s.charAt(p)+s.charAt(u)+s.charAt(f)+s.charAt(m));return g.join("")},e.decode=function(o){var a,h,l,p,u,f,m=0,g=0,c="data:";if(o.substr(0,c.length)===c)throw new Error("Invalid base64 input, it looks like a data url.");var d,_=3*(o=o.replace(/[^A-Za-z0-9+/=]/g,"")).length/4;if(o.charAt(o.length-1)===s.charAt(64)&&_--,o.charAt(o.length-2)===s.charAt(64)&&_--,_%1!=0)throw new Error("Invalid base64 input, bad content length.");for(d=i.uint8array?new Uint8Array(0|_):new Array(0|_);m<o.length;)a=s.indexOf(o.charAt(m++))<<2|(p=s.indexOf(o.charAt(m++)))>>4,h=(15&p)<<4|(u=s.indexOf(o.charAt(m++)))>>2,l=(3&u)<<6|(f=s.indexOf(o.charAt(m++))),d[g++]=a,u!==64&&(d[g++]=h),f!==64&&(d[g++]=l);return d}},{"./support":30,"./utils":32}],2:[function(r,t,e){"use strict";var n=r("./external"),i=r("./stream/DataWorker"),s=r("./stream/Crc32Probe"),o=r("./stream/DataLengthProbe");function a(h,l,p,u,f){this.compressedSize=h,this.uncompressedSize=l,this.crc32=p,this.compression=u,this.compressedContent=f}a.prototype={getContentWorker:function(){var h=new i(n.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new o("data_length")),l=this;return h.on("end",function(){if(this.streamInfo.data_length!==l.uncompressedSize)throw new Error("Bug : uncompressed data size mismatch")}),h},getCompressedWorker:function(){return new i(n.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize",this.compressedSize).withStreamInfo("uncompressedSize",this.uncompressedSize).withStreamInfo("crc32",this.crc32).withStreamInfo("compression",this.compression)}},a.createWorkerFrom=function(h,l,p){return h.pipe(new s).pipe(new o("uncompressedSize")).pipe(l.compressWorker(p)).pipe(new o("compressedSize")).withStreamInfo("compression",l)},t.exports=a},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(r,t,e){"use strict";var n=r("./stream/GenericWorker");e.STORE={magic:"\0\0",compressWorker:function(){return new n("STORE compression")},uncompressWorker:function(){return new n("STORE decompression")}},e.DEFLATE=r("./flate")},{"./flate":7,"./stream/GenericWorker":28}],4:[function(r,t,e){"use strict";var n=r("./utils"),i=function(){for(var s,o=[],a=0;a<256;a++){s=a;for(var h=0;h<8;h++)s=1&s?3988292384^s>>>1:s>>>1;o[a]=s}return o}();t.exports=function(s,o){return s!==void 0&&s.length?n.getTypeOf(s)!=="string"?function(a,h,l,p){var u=i,f=p+l;a^=-1;for(var m=p;m<f;m++)a=a>>>8^u[255&(a^h[m])];return-1^a}(0|o,s,s.length,0):function(a,h,l,p){var u=i,f=p+l;a^=-1;for(var m=p;m<f;m++)a=a>>>8^u[255&(a^h.charCodeAt(m))];return-1^a}(0|o,s,s.length,0):0}},{"./utils":32}],5:[function(r,t,e){"use strict";e.base64=!1,e.binary=!1,e.dir=!1,e.createFolders=!0,e.date=null,e.compression=null,e.compressionOptions=null,e.comment=null,e.unixPermissions=null,e.dosPermissions=null},{}],6:[function(r,t,e){"use strict";var n=null;n=typeof Promise<"u"?Promise:r("lie"),t.exports={Promise:n}},{lie:37}],7:[function(r,t,e){"use strict";var n=typeof Uint8Array<"u"&&typeof Uint16Array<"u"&&typeof Uint32Array<"u",i=r("pako"),s=r("./utils"),o=r("./stream/GenericWorker"),a=n?"uint8array":"array";function h(l,p){o.call(this,"FlateWorker/"+l),this._pako=null,this._pakoAction=l,this._pakoOptions=p,this.meta={}}e.magic="\b\0",s.inherits(h,o),h.prototype.processChunk=function(l){this.meta=l.meta,this._pako===null&&this._createPako(),this._pako.push(s.transformTo(a,l.data),!1)},h.prototype.flush=function(){o.prototype.flush.call(this),this._pako===null&&this._createPako(),this._pako.push([],!0)},h.prototype.cleanUp=function(){o.prototype.cleanUp.call(this),this._pako=null},h.prototype._createPako=function(){this._pako=new i[this._pakoAction]({raw:!0,level:this._pakoOptions.level||-1});var l=this;this._pako.onData=function(p){l.push({data:p,meta:l.meta})}},e.compressWorker=function(l){return new h("Deflate",l)},e.uncompressWorker=function(){return new h("Inflate",{})}},{"./stream/GenericWorker":28,"./utils":32,pako:38}],8:[function(r,t,e){"use strict";function n(u,f){var m,g="";for(m=0;m<f;m++)g+=String.fromCharCode(255&u),u>>>=8;return g}function i(u,f,m,g,c,d){var _,y,w=u.file,b=u.compression,M=d!==a.utf8encode,L=s.transformTo("string",d(w.name)),I=s.transformTo("string",a.utf8encode(w.name)),T=w.comment,z=s.transformTo("string",d(T)),A=s.transformTo("string",a.utf8encode(T)),N=I.length!==w.name.length,v=A.length!==T.length,O="",B="",U="",nt=w.dir,G=w.date,J={crc32:0,compressedSize:0,uncompressedSize:0};f&&!m||(J.crc32=u.crc32,J.compressedSize=u.compressedSize,J.uncompressedSize=u.uncompressedSize);var C=0;f&&(C|=8),M||!N&&!v||(C|=2048);var R=0,it=0;nt&&(R|=16),c==="UNIX"?(it=798,R|=function(K,ft){var Tt=K;return K||(Tt=ft?16893:33204),(65535&Tt)<<16}(w.unixPermissions,nt)):(it=20,R|=function(K){return 63&(K||0)}(w.dosPermissions)),_=G.getUTCHours(),_<<=6,_|=G.getUTCMinutes(),_<<=5,_|=G.getUTCSeconds()/2,y=G.getUTCFullYear()-1980,y<<=4,y|=G.getUTCMonth()+1,y<<=5,y|=G.getUTCDate(),N&&(B=n(1,1)+n(h(L),4)+I,O+="up"+n(B.length,2)+B),v&&(U=n(1,1)+n(h(z),4)+A,O+="uc"+n(U.length,2)+U);var Z="";return Z+=`
\0`,Z+=n(C,2),Z+=b.magic,Z+=n(_,2),Z+=n(y,2),Z+=n(J.crc32,4),Z+=n(J.compressedSize,4),Z+=n(J.uncompressedSize,4),Z+=n(L.length,2),Z+=n(O.length,2),{fileRecord:l.LOCAL_FILE_HEADER+Z+L+O,dirRecord:l.CENTRAL_FILE_HEADER+n(it,2)+Z+n(z.length,2)+"\0\0\0\0"+n(R,4)+n(g,4)+L+O+z}}var s=r("../utils"),o=r("../stream/GenericWorker"),a=r("../utf8"),h=r("../crc32"),l=r("../signature");function p(u,f,m,g){o.call(this,"ZipFileWorker"),this.bytesWritten=0,this.zipComment=f,this.zipPlatform=m,this.encodeFileName=g,this.streamFiles=u,this.accumulate=!1,this.contentBuffer=[],this.dirRecords=[],this.currentSourceOffset=0,this.entriesCount=0,this.currentFile=null,this._sources=[]}s.inherits(p,o),p.prototype.push=function(u){var f=u.meta.percent||0,m=this.entriesCount,g=this._sources.length;this.accumulate?this.contentBuffer.push(u):(this.bytesWritten+=u.data.length,o.prototype.push.call(this,{data:u.data,meta:{currentFile:this.currentFile,percent:m?(f+100*(m-g-1))/m:100}}))},p.prototype.openedSource=function(u){this.currentSourceOffset=this.bytesWritten,this.currentFile=u.file.name;var f=this.streamFiles&&!u.file.dir;if(f){var m=i(u,f,!1,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.push({data:m.fileRecord,meta:{percent:0}})}else this.accumulate=!0},p.prototype.closedSource=function(u){this.accumulate=!1;var f=this.streamFiles&&!u.file.dir,m=i(u,f,!0,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);if(this.dirRecords.push(m.dirRecord),f)this.push({data:function(g){return l.DATA_DESCRIPTOR+n(g.crc32,4)+n(g.compressedSize,4)+n(g.uncompressedSize,4)}(u),meta:{percent:100}});else for(this.push({data:m.fileRecord,meta:{percent:0}});this.contentBuffer.length;)this.push(this.contentBuffer.shift());this.currentFile=null},p.prototype.flush=function(){for(var u=this.bytesWritten,f=0;f<this.dirRecords.length;f++)this.push({data:this.dirRecords[f],meta:{percent:100}});var m=this.bytesWritten-u,g=function(c,d,_,y,w){var b=s.transformTo("string",w(y));return l.CENTRAL_DIRECTORY_END+"\0\0\0\0"+n(c,2)+n(c,2)+n(d,4)+n(_,4)+n(b.length,2)+b}(this.dirRecords.length,m,u,this.zipComment,this.encodeFileName);this.push({data:g,meta:{percent:100}})},p.prototype.prepareNextSource=function(){this.previous=this._sources.shift(),this.openedSource(this.previous.streamInfo),this.isPaused?this.previous.pause():this.previous.resume()},p.prototype.registerPrevious=function(u){this._sources.push(u);var f=this;return u.on("data",function(m){f.processChunk(m)}),u.on("end",function(){f.closedSource(f.previous.streamInfo),f._sources.length?f.prepareNextSource():f.end()}),u.on("error",function(m){f.error(m)}),this},p.prototype.resume=function(){return!!o.prototype.resume.call(this)&&(!this.previous&&this._sources.length?(this.prepareNextSource(),!0):this.previous||this._sources.length||this.generatedError?void 0:(this.end(),!0))},p.prototype.error=function(u){var f=this._sources;if(!o.prototype.error.call(this,u))return!1;for(var m=0;m<f.length;m++)try{f[m].error(u)}catch(g){}return!0},p.prototype.lock=function(){o.prototype.lock.call(this);for(var u=this._sources,f=0;f<u.length;f++)u[f].lock()},t.exports=p},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(r,t,e){"use strict";var n=r("../compressions"),i=r("./ZipFileWorker");e.generateWorker=function(s,o,a){var h=new i(o.streamFiles,a,o.platform,o.encodeFileName),l=0;try{s.forEach(function(p,u){l++;var f=function(d,_){var y=d||_,w=n[y];if(!w)throw new Error(y+" is not a valid compression method !");return w}(u.options.compression,o.compression),m=u.options.compressionOptions||o.compressionOptions||{},g=u.dir,c=u.date;u._compressWorker(f,m).withStreamInfo("file",{name:p,dir:g,date:c,comment:u.comment||"",unixPermissions:u.unixPermissions,dosPermissions:u.dosPermissions}).pipe(h)}),h.entriesCount=l}catch(p){h.error(p)}return h}},{"../compressions":3,"./ZipFileWorker":8}],10:[function(r,t,e){"use strict";function n(){if(!(this instanceof n))return new n;if(arguments.length)throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");this.files=Object.create(null),this.comment=null,this.root="",this.clone=function(){var i=new n;for(var s in this)typeof this[s]!="function"&&(i[s]=this[s]);return i}}(n.prototype=r("./object")).loadAsync=r("./load"),n.support=r("./support"),n.defaults=r("./defaults"),n.version="3.10.1",n.loadAsync=function(i,s){return new n().loadAsync(i,s)},n.external=r("./external"),t.exports=n},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(r,t,e){"use strict";var n=r("./utils"),i=r("./external"),s=r("./utf8"),o=r("./zipEntries"),a=r("./stream/Crc32Probe"),h=r("./nodejsUtils");function l(p){return new i.Promise(function(u,f){var m=p.decompressed.getContentWorker().pipe(new a);m.on("error",function(g){f(g)}).on("end",function(){m.streamInfo.crc32!==p.decompressed.crc32?f(new Error("Corrupted zip : CRC32 mismatch")):u()}).resume()})}t.exports=function(p,u){var f=this;return u=n.extend(u||{},{base64:!1,checkCRC32:!1,optimizedBinaryString:!1,createFolders:!1,decodeFileName:s.utf8decode}),h.isNode&&h.isStream(p)?i.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")):n.prepareContent("the loaded zip file",p,!0,u.optimizedBinaryString,u.base64).then(function(m){var g=new o(u);return g.load(m),g}).then(function(m){var g=[i.Promise.resolve(m)],c=m.files;if(u.checkCRC32)for(var d=0;d<c.length;d++)g.push(l(c[d]));return i.Promise.all(g)}).then(function(m){for(var g=m.shift(),c=g.files,d=0;d<c.length;d++){var _=c[d],y=_.fileNameStr,w=n.resolve(_.fileNameStr);f.file(w,_.decompressed,{binary:!0,optimizedBinaryString:!0,date:_.date,dir:_.dir,comment:_.fileCommentStr.length?_.fileCommentStr:null,unixPermissions:_.unixPermissions,dosPermissions:_.dosPermissions,createFolders:u.createFolders}),_.dir||(f.file(w).unsafeOriginalName=y)}return g.zipComment.length&&(f.comment=g.zipComment),f})}},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(r,t,e){"use strict";var n=r("../utils"),i=r("../stream/GenericWorker");function s(o,a){i.call(this,"Nodejs stream input adapter for "+o),this._upstreamEnded=!1,this._bindStream(a)}n.inherits(s,i),s.prototype._bindStream=function(o){var a=this;(this._stream=o).pause(),o.on("data",function(h){a.push({data:h,meta:{percent:0}})}).on("error",function(h){a.isPaused?this.generatedError=h:a.error(h)}).on("end",function(){a.isPaused?a._upstreamEnded=!0:a.end()})},s.prototype.pause=function(){return!!i.prototype.pause.call(this)&&(this._stream.pause(),!0)},s.prototype.resume=function(){return!!i.prototype.resume.call(this)&&(this._upstreamEnded?this.end():this._stream.resume(),!0)},t.exports=s},{"../stream/GenericWorker":28,"../utils":32}],13:[function(r,t,e){"use strict";var n=r("readable-stream").Readable;function i(s,o,a){n.call(this,o),this._helper=s;var h=this;s.on("data",function(l,p){h.push(l)||h._helper.pause(),a&&a(p)}).on("error",function(l){h.emit("error",l)}).on("end",function(){h.push(null)})}r("../utils").inherits(i,n),i.prototype._read=function(){this._helper.resume()},t.exports=i},{"../utils":32,"readable-stream":16}],14:[function(r,t,e){"use strict";t.exports={isNode:typeof Buffer<"u",newBufferFrom:function(n,i){if(Buffer.from&&Buffer.from!==Uint8Array.from)return Buffer.from(n,i);if(typeof n=="number")throw new Error('The "data" argument must not be a number');return new Buffer(n,i)},allocBuffer:function(n){if(Buffer.alloc)return Buffer.alloc(n);var i=new Buffer(n);return i.fill(0),i},isBuffer:function(n){return Buffer.isBuffer(n)},isStream:function(n){return n&&typeof n.on=="function"&&typeof n.pause=="function"&&typeof n.resume=="function"}}},{}],15:[function(r,t,e){"use strict";function n(w,b,M){var L,I=s.getTypeOf(b),T=s.extend(M||{},h);T.date=T.date||new Date,T.compression!==null&&(T.compression=T.compression.toUpperCase()),typeof T.unixPermissions=="string"&&(T.unixPermissions=parseInt(T.unixPermissions,8)),T.unixPermissions&&16384&T.unixPermissions&&(T.dir=!0),T.dosPermissions&&16&T.dosPermissions&&(T.dir=!0),T.dir&&(w=c(w)),T.createFolders&&(L=g(w))&&d.call(this,L,!0);var z=I==="string"&&T.binary===!1&&T.base64===!1;M&&M.binary!==void 0||(T.binary=!z),(b instanceof l&&b.uncompressedSize===0||T.dir||!b||b.length===0)&&(T.base64=!1,T.binary=!0,b="",T.compression="STORE",I="string");var A=null;A=b instanceof l||b instanceof o?b:f.isNode&&f.isStream(b)?new m(w,b):s.prepareContent(w,b,T.binary,T.optimizedBinaryString,T.base64);var N=new p(w,A,T);this.files[w]=N}var i=r("./utf8"),s=r("./utils"),o=r("./stream/GenericWorker"),a=r("./stream/StreamHelper"),h=r("./defaults"),l=r("./compressedObject"),p=r("./zipObject"),u=r("./generate"),f=r("./nodejsUtils"),m=r("./nodejs/NodejsStreamInputAdapter"),g=function(w){w.slice(-1)==="/"&&(w=w.substring(0,w.length-1));var b=w.lastIndexOf("/");return 0<b?w.substring(0,b):""},c=function(w){return w.slice(-1)!=="/"&&(w+="/"),w},d=function(w,b){return b=b!==void 0?b:h.createFolders,w=c(w),this.files[w]||n.call(this,w,null,{dir:!0,createFolders:b}),this.files[w]};function _(w){return Object.prototype.toString.call(w)==="[object RegExp]"}var y={load:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},forEach:function(w){var b,M,L;for(b in this.files)L=this.files[b],(M=b.slice(this.root.length,b.length))&&b.slice(0,this.root.length)===this.root&&w(M,L)},filter:function(w){var b=[];return this.forEach(function(M,L){w(M,L)&&b.push(L)}),b},file:function(w,b,M){if(arguments.length!==1)return w=this.root+w,n.call(this,w,b,M),this;if(_(w)){var L=w;return this.filter(function(T,z){return!z.dir&&L.test(T)})}var I=this.files[this.root+w];return I&&!I.dir?I:null},folder:function(w){if(!w)return this;if(_(w))return this.filter(function(I,T){return T.dir&&w.test(I)});var b=this.root+w,M=d.call(this,b),L=this.clone();return L.root=M.name,L},remove:function(w){w=this.root+w;var b=this.files[w];if(b||(w.slice(-1)!=="/"&&(w+="/"),b=this.files[w]),b&&!b.dir)delete this.files[w];else for(var M=this.filter(function(I,T){return T.name.slice(0,w.length)===w}),L=0;L<M.length;L++)delete this.files[M[L].name];return this},generate:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},generateInternalStream:function(w){var b,M={};try{if((M=s.extend(w||{},{streamFiles:!1,compression:"STORE",compressionOptions:null,type:"",platform:"DOS",comment:null,mimeType:"application/zip",encodeFileName:i.utf8encode})).type=M.type.toLowerCase(),M.compression=M.compression.toUpperCase(),M.type==="binarystring"&&(M.type="string"),!M.type)throw new Error("No output type specified.");s.checkSupport(M.type),M.platform!=="darwin"&&M.platform!=="freebsd"&&M.platform!=="linux"&&M.platform!=="sunos"||(M.platform="UNIX"),M.platform==="win32"&&(M.platform="DOS");var L=M.comment||this.comment||"";b=u.generateWorker(this,M,L)}catch(I){(b=new o("error")).error(I)}return new a(b,M.type||"string",M.mimeType)},generateAsync:function(w,b){return this.generateInternalStream(w).accumulate(b)},generateNodeStream:function(w,b){return(w=w||{}).type||(w.type="nodebuffer"),this.generateInternalStream(w).toNodejsStream(b)}};t.exports=y},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(r,t,e){"use strict";t.exports=r("stream")},{stream:void 0}],17:[function(r,t,e){"use strict";var n=r("./DataReader");function i(s){n.call(this,s);for(var o=0;o<this.data.length;o++)s[o]=255&s[o]}r("../utils").inherits(i,n),i.prototype.byteAt=function(s){return this.data[this.zero+s]},i.prototype.lastIndexOfSignature=function(s){for(var o=s.charCodeAt(0),a=s.charCodeAt(1),h=s.charCodeAt(2),l=s.charCodeAt(3),p=this.length-4;0<=p;--p)if(this.data[p]===o&&this.data[p+1]===a&&this.data[p+2]===h&&this.data[p+3]===l)return p-this.zero;return-1},i.prototype.readAndCheckSignature=function(s){var o=s.charCodeAt(0),a=s.charCodeAt(1),h=s.charCodeAt(2),l=s.charCodeAt(3),p=this.readData(4);return o===p[0]&&a===p[1]&&h===p[2]&&l===p[3]},i.prototype.readData=function(s){if(this.checkOffset(s),s===0)return[];var o=this.data.slice(this.zero+this.index,this.zero+this.index+s);return this.index+=s,o},t.exports=i},{"../utils":32,"./DataReader":18}],18:[function(r,t,e){"use strict";var n=r("../utils");function i(s){this.data=s,this.length=s.length,this.index=0,this.zero=0}i.prototype={checkOffset:function(s){this.checkIndex(this.index+s)},checkIndex:function(s){if(this.length<this.zero+s||s<0)throw new Error("End of data reached (data length = "+this.length+", asked index = "+s+"). Corrupted zip ?")},setIndex:function(s){this.checkIndex(s),this.index=s},skip:function(s){this.setIndex(this.index+s)},byteAt:function(){},readInt:function(s){var o,a=0;for(this.checkOffset(s),o=this.index+s-1;o>=this.index;o--)a=(a<<8)+this.byteAt(o);return this.index+=s,a},readString:function(s){return n.transformTo("string",this.readData(s))},readData:function(){},lastIndexOfSignature:function(){},readAndCheckSignature:function(){},readDate:function(){var s=this.readInt(4);return new Date(Date.UTC(1980+(s>>25&127),(s>>21&15)-1,s>>16&31,s>>11&31,s>>5&63,(31&s)<<1))}},t.exports=i},{"../utils":32}],19:[function(r,t,e){"use strict";var n=r("./Uint8ArrayReader");function i(s){n.call(this,s)}r("../utils").inherits(i,n),i.prototype.readData=function(s){this.checkOffset(s);var o=this.data.slice(this.zero+this.index,this.zero+this.index+s);return this.index+=s,o},t.exports=i},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(r,t,e){"use strict";var n=r("./DataReader");function i(s){n.call(this,s)}r("../utils").inherits(i,n),i.prototype.byteAt=function(s){return this.data.charCodeAt(this.zero+s)},i.prototype.lastIndexOfSignature=function(s){return this.data.lastIndexOf(s)-this.zero},i.prototype.readAndCheckSignature=function(s){return s===this.readData(4)},i.prototype.readData=function(s){this.checkOffset(s);var o=this.data.slice(this.zero+this.index,this.zero+this.index+s);return this.index+=s,o},t.exports=i},{"../utils":32,"./DataReader":18}],21:[function(r,t,e){"use strict";var n=r("./ArrayReader");function i(s){n.call(this,s)}r("../utils").inherits(i,n),i.prototype.readData=function(s){if(this.checkOffset(s),s===0)return new Uint8Array(0);var o=this.data.subarray(this.zero+this.index,this.zero+this.index+s);return this.index+=s,o},t.exports=i},{"../utils":32,"./ArrayReader":17}],22:[function(r,t,e){"use strict";var n=r("../utils"),i=r("../support"),s=r("./ArrayReader"),o=r("./StringReader"),a=r("./NodeBufferReader"),h=r("./Uint8ArrayReader");t.exports=function(l){var p=n.getTypeOf(l);return n.checkSupport(p),p!=="string"||i.uint8array?p==="nodebuffer"?new a(l):i.uint8array?new h(n.transformTo("uint8array",l)):new s(n.transformTo("array",l)):new o(l)}},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(r,t,e){"use strict";e.LOCAL_FILE_HEADER="PK",e.CENTRAL_FILE_HEADER="PK",e.CENTRAL_DIRECTORY_END="PK",e.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK\x07",e.ZIP64_CENTRAL_DIRECTORY_END="PK",e.DATA_DESCRIPTOR="PK\x07\b"},{}],24:[function(r,t,e){"use strict";var n=r("./GenericWorker"),i=r("../utils");function s(o){n.call(this,"ConvertWorker to "+o),this.destType=o}i.inherits(s,n),s.prototype.processChunk=function(o){this.push({data:i.transformTo(this.destType,o.data),meta:o.meta})},t.exports=s},{"../utils":32,"./GenericWorker":28}],25:[function(r,t,e){"use strict";var n=r("./GenericWorker"),i=r("../crc32");function s(){n.call(this,"Crc32Probe"),this.withStreamInfo("crc32",0)}r("../utils").inherits(s,n),s.prototype.processChunk=function(o){this.streamInfo.crc32=i(o.data,this.streamInfo.crc32||0),this.push(o)},t.exports=s},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(r,t,e){"use strict";var n=r("../utils"),i=r("./GenericWorker");function s(o){i.call(this,"DataLengthProbe for "+o),this.propName=o,this.withStreamInfo(o,0)}n.inherits(s,i),s.prototype.processChunk=function(o){if(o){var a=this.streamInfo[this.propName]||0;this.streamInfo[this.propName]=a+o.data.length}i.prototype.processChunk.call(this,o)},t.exports=s},{"../utils":32,"./GenericWorker":28}],27:[function(r,t,e){"use strict";var n=r("../utils"),i=r("./GenericWorker");function s(o){i.call(this,"DataWorker");var a=this;this.dataIsReady=!1,this.index=0,this.max=0,this.data=null,this.type="",this._tickScheduled=!1,o.then(function(h){a.dataIsReady=!0,a.data=h,a.max=h&&h.length||0,a.type=n.getTypeOf(h),a.isPaused||a._tickAndRepeat()},function(h){a.error(h)})}n.inherits(s,i),s.prototype.cleanUp=function(){i.prototype.cleanUp.call(this),this.data=null},s.prototype.resume=function(){return!!i.prototype.resume.call(this)&&(!this._tickScheduled&&this.dataIsReady&&(this._tickScheduled=!0,n.delay(this._tickAndRepeat,[],this)),!0)},s.prototype._tickAndRepeat=function(){this._tickScheduled=!1,this.isPaused||this.isFinished||(this._tick(),this.isFinished||(n.delay(this._tickAndRepeat,[],this),this._tickScheduled=!0))},s.prototype._tick=function(){if(this.isPaused||this.isFinished)return!1;var o=null,a=Math.min(this.max,this.index+16384);if(this.index>=this.max)return this.end();switch(this.type){case"string":o=this.data.substring(this.index,a);break;case"uint8array":o=this.data.subarray(this.index,a);break;case"array":case"nodebuffer":o=this.data.slice(this.index,a)}return this.index=a,this.push({data:o,meta:{percent:this.max?this.index/this.max*100:0}})},t.exports=s},{"../utils":32,"./GenericWorker":28}],28:[function(r,t,e){"use strict";function n(i){this.name=i||"default",this.streamInfo={},this.generatedError=null,this.extraStreamInfo={},this.isPaused=!0,this.isFinished=!1,this.isLocked=!1,this._listeners={data:[],end:[],error:[]},this.previous=null}n.prototype={push:function(i){this.emit("data",i)},end:function(){if(this.isFinished)return!1;this.flush();try{this.emit("end"),this.cleanUp(),this.isFinished=!0}catch(i){this.emit("error",i)}return!0},error:function(i){return!this.isFinished&&(this.isPaused?this.generatedError=i:(this.isFinished=!0,this.emit("error",i),this.previous&&this.previous.error(i),this.cleanUp()),!0)},on:function(i,s){return this._listeners[i].push(s),this},cleanUp:function(){this.streamInfo=this.generatedError=this.extraStreamInfo=null,this._listeners=[]},emit:function(i,s){if(this._listeners[i])for(var o=0;o<this._listeners[i].length;o++)this._listeners[i][o].call(this,s)},pipe:function(i){return i.registerPrevious(this)},registerPrevious:function(i){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.streamInfo=i.streamInfo,this.mergeStreamInfo(),this.previous=i;var s=this;return i.on("data",function(o){s.processChunk(o)}),i.on("end",function(){s.end()}),i.on("error",function(o){s.error(o)}),this},pause:function(){return!this.isPaused&&!this.isFinished&&(this.isPaused=!0,this.previous&&this.previous.pause(),!0)},resume:function(){if(!this.isPaused||this.isFinished)return!1;var i=this.isPaused=!1;return this.generatedError&&(this.error(this.generatedError),i=!0),this.previous&&this.previous.resume(),!i},flush:function(){},processChunk:function(i){this.push(i)},withStreamInfo:function(i,s){return this.extraStreamInfo[i]=s,this.mergeStreamInfo(),this},mergeStreamInfo:function(){for(var i in this.extraStreamInfo)Object.prototype.hasOwnProperty.call(this.extraStreamInfo,i)&&(this.streamInfo[i]=this.extraStreamInfo[i])},lock:function(){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.isLocked=!0,this.previous&&this.previous.lock()},toString:function(){var i="Worker "+this.name;return this.previous?this.previous+" -> "+i:i}},t.exports=n},{}],29:[function(r,t,e){"use strict";var n=r("../utils"),i=r("./ConvertWorker"),s=r("./GenericWorker"),o=r("../base64"),a=r("../support"),h=r("../external"),l=null;if(a.nodestream)try{l=r("../nodejs/NodejsStreamOutputAdapter")}catch(f){}function p(f,m){return new h.Promise(function(g,c){var d=[],_=f._internalType,y=f._outputType,w=f._mimeType;f.on("data",function(b,M){d.push(b),m&&m(M)}).on("error",function(b){d=[],c(b)}).on("end",function(){try{var b=function(M,L,I){switch(M){case"blob":return n.newBlob(n.transformTo("arraybuffer",L),I);case"base64":return o.encode(L);default:return n.transformTo(M,L)}}(y,function(M,L){var I,T=0,z=null,A=0;for(I=0;I<L.length;I++)A+=L[I].length;switch(M){case"string":return L.join("");case"array":return Array.prototype.concat.apply([],L);case"uint8array":for(z=new Uint8Array(A),I=0;I<L.length;I++)z.set(L[I],T),T+=L[I].length;return z;case"nodebuffer":return Buffer.concat(L);default:throw new Error("concat : unsupported type '"+M+"'")}}(_,d),w);g(b)}catch(M){c(M)}d=[]}).resume()})}function u(f,m,g){var c=m;switch(m){case"blob":case"arraybuffer":c="uint8array";break;case"base64":c="string"}try{this._internalType=c,this._outputType=m,this._mimeType=g,n.checkSupport(c),this._worker=f.pipe(new i(c)),f.lock()}catch(d){this._worker=new s("error"),this._worker.error(d)}}u.prototype={accumulate:function(f){return p(this,f)},on:function(f,m){var g=this;return f==="data"?this._worker.on(f,function(c){m.call(g,c.data,c.meta)}):this._worker.on(f,function(){n.delay(m,arguments,g)}),this},resume:function(){return n.delay(this._worker.resume,[],this._worker),this},pause:function(){return this._worker.pause(),this},toNodejsStream:function(f){if(n.checkSupport("nodestream"),this._outputType!=="nodebuffer")throw new Error(this._outputType+" is not supported by this method");return new l(this,{objectMode:this._outputType!=="nodebuffer"},f)}},t.exports=u},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(r,t,e){"use strict";if(e.base64=!0,e.array=!0,e.string=!0,e.arraybuffer=typeof ArrayBuffer<"u"&&typeof Uint8Array<"u",e.nodebuffer=typeof Buffer<"u",e.uint8array=typeof Uint8Array<"u",typeof ArrayBuffer>"u")e.blob=!1;else{var n=new ArrayBuffer(0);try{e.blob=new Blob([n],{type:"application/zip"}).size===0}catch(s){try{var i=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);i.append(n),e.blob=i.getBlob("application/zip").size===0}catch(o){e.blob=!1}}}try{e.nodestream=!!r("readable-stream").Readable}catch(s){e.nodestream=!1}},{"readable-stream":16}],31:[function(r,t,e){"use strict";for(var n=r("./utils"),i=r("./support"),s=r("./nodejsUtils"),o=r("./stream/GenericWorker"),a=new Array(256),h=0;h<256;h++)a[h]=252<=h?6:248<=h?5:240<=h?4:224<=h?3:192<=h?2:1;a[254]=a[254]=1;function l(){o.call(this,"utf-8 decode"),this.leftOver=null}function p(){o.call(this,"utf-8 encode")}e.utf8encode=function(u){return i.nodebuffer?s.newBufferFrom(u,"utf-8"):function(f){var m,g,c,d,_,y=f.length,w=0;for(d=0;d<y;d++)(64512&(g=f.charCodeAt(d)))==55296&&d+1<y&&(64512&(c=f.charCodeAt(d+1)))==56320&&(g=65536+(g-55296<<10)+(c-56320),d++),w+=g<128?1:g<2048?2:g<65536?3:4;for(m=i.uint8array?new Uint8Array(w):new Array(w),d=_=0;_<w;d++)(64512&(g=f.charCodeAt(d)))==55296&&d+1<y&&(64512&(c=f.charCodeAt(d+1)))==56320&&(g=65536+(g-55296<<10)+(c-56320),d++),g<128?m[_++]=g:(g<2048?m[_++]=192|g>>>6:(g<65536?m[_++]=224|g>>>12:(m[_++]=240|g>>>18,m[_++]=128|g>>>12&63),m[_++]=128|g>>>6&63),m[_++]=128|63&g);return m}(u)},e.utf8decode=function(u){return i.nodebuffer?n.transformTo("nodebuffer",u).toString("utf-8"):function(f){var m,g,c,d,_=f.length,y=new Array(2*_);for(m=g=0;m<_;)if((c=f[m++])<128)y[g++]=c;else if(4<(d=a[c]))y[g++]=65533,m+=d-1;else{for(c&=d===2?31:d===3?15:7;1<d&&m<_;)c=c<<6|63&f[m++],d--;1<d?y[g++]=65533:c<65536?y[g++]=c:(c-=65536,y[g++]=55296|c>>10&1023,y[g++]=56320|1023&c)}return y.length!==g&&(y.subarray?y=y.subarray(0,g):y.length=g),n.applyFromCharCode(y)}(u=n.transformTo(i.uint8array?"uint8array":"array",u))},n.inherits(l,o),l.prototype.processChunk=function(u){var f=n.transformTo(i.uint8array?"uint8array":"array",u.data);if(this.leftOver&&this.leftOver.length){if(i.uint8array){var m=f;(f=new Uint8Array(m.length+this.leftOver.length)).set(this.leftOver,0),f.set(m,this.leftOver.length)}else f=this.leftOver.concat(f);this.leftOver=null}var g=function(d,_){var y;for((_=_||d.length)>d.length&&(_=d.length),y=_-1;0<=y&&(192&d[y])==128;)y--;return y<0||y===0?_:y+a[d[y]]>_?y:_}(f),c=f;g!==f.length&&(i.uint8array?(c=f.subarray(0,g),this.leftOver=f.subarray(g,f.length)):(c=f.slice(0,g),this.leftOver=f.slice(g,f.length))),this.push({data:e.utf8decode(c),meta:u.meta})},l.prototype.flush=function(){this.leftOver&&this.leftOver.length&&(this.push({data:e.utf8decode(this.leftOver),meta:{}}),this.leftOver=null)},e.Utf8DecodeWorker=l,n.inherits(p,o),p.prototype.processChunk=function(u){this.push({data:e.utf8encode(u.data),meta:u.meta})},e.Utf8EncodeWorker=p},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(r,t,e){"use strict";var n=r("./support"),i=r("./base64"),s=r("./nodejsUtils"),o=r("./external");function a(m){return m}function h(m,g){for(var c=0;c<m.length;++c)g[c]=255&m.charCodeAt(c);return g}r("setimmediate"),e.newBlob=function(m,g){e.checkSupport("blob");try{return new Blob([m],{type:g})}catch(d){try{var c=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);return c.append(m),c.getBlob(g)}catch(_){throw new Error("Bug : can't construct the Blob.")}}};var l={stringifyByChunk:function(m,g,c){var d=[],_=0,y=m.length;if(y<=c)return String.fromCharCode.apply(null,m);for(;_<y;)g==="array"||g==="nodebuffer"?d.push(String.fromCharCode.apply(null,m.slice(_,Math.min(_+c,y)))):d.push(String.fromCharCode.apply(null,m.subarray(_,Math.min(_+c,y)))),_+=c;return d.join("")},stringifyByChar:function(m){for(var g="",c=0;c<m.length;c++)g+=String.fromCharCode(m[c]);return g},applyCanBeUsed:{uint8array:function(){try{return n.uint8array&&String.fromCharCode.apply(null,new Uint8Array(1)).length===1}catch(m){return!1}}(),nodebuffer:function(){try{return n.nodebuffer&&String.fromCharCode.apply(null,s.allocBuffer(1)).length===1}catch(m){return!1}}()}};function p(m){var g=65536,c=e.getTypeOf(m),d=!0;if(c==="uint8array"?d=l.applyCanBeUsed.uint8array:c==="nodebuffer"&&(d=l.applyCanBeUsed.nodebuffer),d)for(;1<g;)try{return l.stringifyByChunk(m,c,g)}catch(_){g=Math.floor(g/2)}return l.stringifyByChar(m)}function u(m,g){for(var c=0;c<m.length;c++)g[c]=m[c];return g}e.applyFromCharCode=p;var f={};f.string={string:a,array:function(m){return h(m,new Array(m.length))},arraybuffer:function(m){return f.string.uint8array(m).buffer},uint8array:function(m){return h(m,new Uint8Array(m.length))},nodebuffer:function(m){return h(m,s.allocBuffer(m.length))}},f.array={string:p,array:a,arraybuffer:function(m){return new Uint8Array(m).buffer},uint8array:function(m){return new Uint8Array(m)},nodebuffer:function(m){return s.newBufferFrom(m)}},f.arraybuffer={string:function(m){return p(new Uint8Array(m))},array:function(m){return u(new Uint8Array(m),new Array(m.byteLength))},arraybuffer:a,uint8array:function(m){return new Uint8Array(m)},nodebuffer:function(m){return s.newBufferFrom(new Uint8Array(m))}},f.uint8array={string:p,array:function(m){return u(m,new Array(m.length))},arraybuffer:function(m){return m.buffer},uint8array:a,nodebuffer:function(m){return s.newBufferFrom(m)}},f.nodebuffer={string:p,array:function(m){return u(m,new Array(m.length))},arraybuffer:function(m){return f.nodebuffer.uint8array(m).buffer},uint8array:function(m){return u(m,new Uint8Array(m.length))},nodebuffer:a},e.transformTo=function(m,g){if(g=g||"",!m)return g;e.checkSupport(m);var c=e.getTypeOf(g);return f[c][m](g)},e.resolve=function(m){for(var g=m.split("/"),c=[],d=0;d<g.length;d++){var _=g[d];_==="."||_===""&&d!==0&&d!==g.length-1||(_===".."?c.pop():c.push(_))}return c.join("/")},e.getTypeOf=function(m){return typeof m=="string"?"string":Object.prototype.toString.call(m)==="[object Array]"?"array":n.nodebuffer&&s.isBuffer(m)?"nodebuffer":n.uint8array&&m instanceof Uint8Array?"uint8array":n.arraybuffer&&m instanceof ArrayBuffer?"arraybuffer":void 0},e.checkSupport=function(m){if(!n[m.toLowerCase()])throw new Error(m+" is not supported by this platform")},e.MAX_VALUE_16BITS=65535,e.MAX_VALUE_32BITS=-1,e.pretty=function(m){var g,c,d="";for(c=0;c<(m||"").length;c++)d+="\\x"+((g=m.charCodeAt(c))<16?"0":"")+g.toString(16).toUpperCase();return d},e.delay=function(m,g,c){setImmediate(function(){m.apply(c||null,g||[])})},e.inherits=function(m,g){function c(){}c.prototype=g.prototype,m.prototype=new c},e.extend=function(){var m,g,c={};for(m=0;m<arguments.length;m++)for(g in arguments[m])Object.prototype.hasOwnProperty.call(arguments[m],g)&&c[g]===void 0&&(c[g]=arguments[m][g]);return c},e.prepareContent=function(m,g,c,d,_){return o.Promise.resolve(g).then(function(y){return n.blob&&(y instanceof Blob||["[object File]","[object Blob]"].indexOf(Object.prototype.toString.call(y))!==-1)&&typeof FileReader<"u"?new o.Promise(function(w,b){var M=new FileReader;M.onload=function(L){w(L.target.result)},M.onerror=function(L){b(L.target.error)},M.readAsArrayBuffer(y)}):y}).then(function(y){var w=e.getTypeOf(y);return w?(w==="arraybuffer"?y=e.transformTo("uint8array",y):w==="string"&&(_?y=i.decode(y):c&&d!==!0&&(y=function(b){return h(b,n.uint8array?new Uint8Array(b.length):new Array(b.length))}(y))),y):o.Promise.reject(new Error("Can't read the data of '"+m+"'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))})}},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,setimmediate:54}],33:[function(r,t,e){"use strict";var n=r("./reader/readerFor"),i=r("./utils"),s=r("./signature"),o=r("./zipEntry"),a=r("./support");function h(l){this.files=[],this.loadOptions=l}h.prototype={checkSignature:function(l){if(!this.reader.readAndCheckSignature(l)){this.reader.index-=4;var p=this.reader.readString(4);throw new Error("Corrupted zip or bug: unexpected signature ("+i.pretty(p)+", expected "+i.pretty(l)+")")}},isSignature:function(l,p){var u=this.reader.index;this.reader.setIndex(l);var f=this.reader.readString(4)===p;return this.reader.setIndex(u),f},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2);var l=this.reader.readData(this.zipCommentLength),p=a.uint8array?"uint8array":"array",u=i.transformTo(p,l);this.zipComment=this.loadOptions.decodeFileName(u)},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.reader.skip(4),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={};for(var l,p,u,f=this.zip64EndOfCentralSize-44;0<f;)l=this.reader.readInt(2),p=this.reader.readInt(4),u=this.reader.readData(p),this.zip64ExtensibleData[l]={id:l,length:p,value:u}},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),1<this.disksCount)throw new Error("Multi-volumes zip are not supported")},readLocalFiles:function(){var l,p;for(l=0;l<this.files.length;l++)p=this.files[l],this.reader.setIndex(p.localHeaderOffset),this.checkSignature(s.LOCAL_FILE_HEADER),p.readLocalPart(this.reader),p.handleUTF8(),p.processAttributes()},readCentralDir:function(){var l;for(this.reader.setIndex(this.centralDirOffset);this.reader.readAndCheckSignature(s.CENTRAL_FILE_HEADER);)(l=new o({zip64:this.zip64},this.loadOptions)).readCentralPart(this.reader),this.files.push(l);if(this.centralDirRecords!==this.files.length&&this.centralDirRecords!==0&&this.files.length===0)throw new Error("Corrupted zip or bug: expected "+this.centralDirRecords+" records in central dir, got "+this.files.length)},readEndOfCentral:function(){var l=this.reader.lastIndexOfSignature(s.CENTRAL_DIRECTORY_END);if(l<0)throw this.isSignature(0,s.LOCAL_FILE_HEADER)?new Error("Corrupted zip: can't find end of central directory"):new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");this.reader.setIndex(l);var p=l;if(this.checkSignature(s.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===i.MAX_VALUE_16BITS||this.diskWithCentralDirStart===i.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===i.MAX_VALUE_16BITS||this.centralDirRecords===i.MAX_VALUE_16BITS||this.centralDirSize===i.MAX_VALUE_32BITS||this.centralDirOffset===i.MAX_VALUE_32BITS){if(this.zip64=!0,(l=this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR))<0)throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");if(this.reader.setIndex(l),this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,s.ZIP64_CENTRAL_DIRECTORY_END)&&(this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_END),this.relativeOffsetEndOfZip64CentralDir<0))throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral()}var u=this.centralDirOffset+this.centralDirSize;this.zip64&&(u+=20,u+=12+this.zip64EndOfCentralSize);var f=p-u;if(0<f)this.isSignature(p,s.CENTRAL_FILE_HEADER)||(this.reader.zero=f);else if(f<0)throw new Error("Corrupted zip: missing "+Math.abs(f)+" bytes.")},prepareReader:function(l){this.reader=n(l)},load:function(l){this.prepareReader(l),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles()}},t.exports=h},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utils":32,"./zipEntry":34}],34:[function(r,t,e){"use strict";var n=r("./reader/readerFor"),i=r("./utils"),s=r("./compressedObject"),o=r("./crc32"),a=r("./utf8"),h=r("./compressions"),l=r("./support");function p(u,f){this.options=u,this.loadOptions=f}p.prototype={isEncrypted:function(){return(1&this.bitFlag)==1},useUTF8:function(){return(2048&this.bitFlag)==2048},readLocalPart:function(u){var f,m;if(u.skip(22),this.fileNameLength=u.readInt(2),m=u.readInt(2),this.fileName=u.readData(this.fileNameLength),u.skip(m),this.compressedSize===-1||this.uncompressedSize===-1)throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");if((f=function(g){for(var c in h)if(Object.prototype.hasOwnProperty.call(h,c)&&h[c].magic===g)return h[c];return null}(this.compressionMethod))===null)throw new Error("Corrupted zip : compression "+i.pretty(this.compressionMethod)+" unknown (inner file : "+i.transformTo("string",this.fileName)+")");this.decompressed=new s(this.compressedSize,this.uncompressedSize,this.crc32,f,u.readData(this.compressedSize))},readCentralPart:function(u){this.versionMadeBy=u.readInt(2),u.skip(2),this.bitFlag=u.readInt(2),this.compressionMethod=u.readString(2),this.date=u.readDate(),this.crc32=u.readInt(4),this.compressedSize=u.readInt(4),this.uncompressedSize=u.readInt(4);var f=u.readInt(2);if(this.extraFieldsLength=u.readInt(2),this.fileCommentLength=u.readInt(2),this.diskNumberStart=u.readInt(2),this.internalFileAttributes=u.readInt(2),this.externalFileAttributes=u.readInt(4),this.localHeaderOffset=u.readInt(4),this.isEncrypted())throw new Error("Encrypted zip are not supported");u.skip(f),this.readExtraFields(u),this.parseZIP64ExtraField(u),this.fileComment=u.readData(this.fileCommentLength)},processAttributes:function(){this.unixPermissions=null,this.dosPermissions=null;var u=this.versionMadeBy>>8;this.dir=!!(16&this.externalFileAttributes),u==0&&(this.dosPermissions=63&this.externalFileAttributes),u==3&&(this.unixPermissions=this.externalFileAttributes>>16&65535),this.dir||this.fileNameStr.slice(-1)!=="/"||(this.dir=!0)},parseZIP64ExtraField:function(){if(this.extraFields[1]){var u=n(this.extraFields[1].value);this.uncompressedSize===i.MAX_VALUE_32BITS&&(this.uncompressedSize=u.readInt(8)),this.compressedSize===i.MAX_VALUE_32BITS&&(this.compressedSize=u.readInt(8)),this.localHeaderOffset===i.MAX_VALUE_32BITS&&(this.localHeaderOffset=u.readInt(8)),this.diskNumberStart===i.MAX_VALUE_32BITS&&(this.diskNumberStart=u.readInt(4))}},readExtraFields:function(u){var f,m,g,c=u.index+this.extraFieldsLength;for(this.extraFields||(this.extraFields={});u.index+4<c;)f=u.readInt(2),m=u.readInt(2),g=u.readData(m),this.extraFields[f]={id:f,length:m,value:g};u.setIndex(c)},handleUTF8:function(){var u=l.uint8array?"uint8array":"array";if(this.useUTF8())this.fileNameStr=a.utf8decode(this.fileName),this.fileCommentStr=a.utf8decode(this.fileComment);else{var f=this.findExtraFieldUnicodePath();if(f!==null)this.fileNameStr=f;else{var m=i.transformTo(u,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(m)}var g=this.findExtraFieldUnicodeComment();if(g!==null)this.fileCommentStr=g;else{var c=i.transformTo(u,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(c)}}},findExtraFieldUnicodePath:function(){var u=this.extraFields[28789];if(u){var f=n(u.value);return f.readInt(1)!==1||o(this.fileName)!==f.readInt(4)?null:a.utf8decode(f.readData(u.length-5))}return null},findExtraFieldUnicodeComment:function(){var u=this.extraFields[25461];if(u){var f=n(u.value);return f.readInt(1)!==1||o(this.fileComment)!==f.readInt(4)?null:a.utf8decode(f.readData(u.length-5))}return null}},t.exports=p},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(r,t,e){"use strict";function n(f,m,g){this.name=f,this.dir=g.dir,this.date=g.date,this.comment=g.comment,this.unixPermissions=g.unixPermissions,this.dosPermissions=g.dosPermissions,this._data=m,this._dataBinary=g.binary,this.options={compression:g.compression,compressionOptions:g.compressionOptions}}var i=r("./stream/StreamHelper"),s=r("./stream/DataWorker"),o=r("./utf8"),a=r("./compressedObject"),h=r("./stream/GenericWorker");n.prototype={internalStream:function(f){var m=null,g="string";try{if(!f)throw new Error("No output type specified.");var c=(g=f.toLowerCase())==="string"||g==="text";g!=="binarystring"&&g!=="text"||(g="string"),m=this._decompressWorker();var d=!this._dataBinary;d&&!c&&(m=m.pipe(new o.Utf8EncodeWorker)),!d&&c&&(m=m.pipe(new o.Utf8DecodeWorker))}catch(_){(m=new h("error")).error(_)}return new i(m,g,"")},async:function(f,m){return this.internalStream(f).accumulate(m)},nodeStream:function(f,m){return this.internalStream(f||"nodebuffer").toNodejsStream(m)},_compressWorker:function(f,m){if(this._data instanceof a&&this._data.compression.magic===f.magic)return this._data.getCompressedWorker();var g=this._decompressWorker();return this._dataBinary||(g=g.pipe(new o.Utf8EncodeWorker)),a.createWorkerFrom(g,f,m)},_decompressWorker:function(){return this._data instanceof a?this._data.getContentWorker():this._data instanceof h?this._data:new s(this._data)}};for(var l=["asText","asBinary","asNodeBuffer","asUint8Array","asArrayBuffer"],p=function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},u=0;u<l.length;u++)n.prototype[l[u]]=p;t.exports=n},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(r,t,e){(function(n){"use strict";var i,s,o=n.MutationObserver||n.WebKitMutationObserver;if(o){var a=0,h=new o(f),l=n.document.createTextNode("");h.observe(l,{characterData:!0}),i=function(){l.data=a=++a%2}}else if(n.setImmediate||n.MessageChannel===void 0)i="document"in n&&"onreadystatechange"in n.document.createElement("script")?function(){var m=n.document.createElement("script");m.onreadystatechange=function(){f(),m.onreadystatechange=null,m.parentNode.removeChild(m),m=null},n.document.documentElement.appendChild(m)}:function(){setTimeout(f,0)};else{var p=new n.MessageChannel;p.port1.onmessage=f,i=function(){p.port2.postMessage(0)}}var u=[];function f(){var m,g;s=!0;for(var c=u.length;c;){for(g=u,u=[],m=-1;++m<c;)g[m]();c=u.length}s=!1}t.exports=function(m){u.push(m)!==1||s||i()}}).call(this,typeof global<"u"?global:typeof self<"u"?self:typeof window<"u"?window:{})},{}],37:[function(r,t,e){"use strict";var n=r("immediate");function i(){}var s={},o=["REJECTED"],a=["FULFILLED"],h=["PENDING"];function l(c){if(typeof c!="function")throw new TypeError("resolver must be a function");this.state=h,this.queue=[],this.outcome=void 0,c!==i&&m(this,c)}function p(c,d,_){this.promise=c,typeof d=="function"&&(this.onFulfilled=d,this.callFulfilled=this.otherCallFulfilled),typeof _=="function"&&(this.onRejected=_,this.callRejected=this.otherCallRejected)}function u(c,d,_){n(function(){var y;try{y=d(_)}catch(w){return s.reject(c,w)}y===c?s.reject(c,new TypeError("Cannot resolve promise with itself")):s.resolve(c,y)})}function f(c){var d=c&&c.then;if(c&&(typeof c=="object"||typeof c=="function")&&typeof d=="function")return function(){d.apply(c,arguments)}}function m(c,d){var _=!1;function y(M){_||(_=!0,s.reject(c,M))}function w(M){_||(_=!0,s.resolve(c,M))}var b=g(function(){d(w,y)});b.status==="error"&&y(b.value)}function g(c,d){var _={};try{_.value=c(d),_.status="success"}catch(y){_.status="error",_.value=y}return _}(t.exports=l).prototype.finally=function(c){if(typeof c!="function")return this;var d=this.constructor;return this.then(function(_){return d.resolve(c()).then(function(){return _})},function(_){return d.resolve(c()).then(function(){throw _})})},l.prototype.catch=function(c){return this.then(null,c)},l.prototype.then=function(c,d){if(typeof c!="function"&&this.state===a||typeof d!="function"&&this.state===o)return this;var _=new this.constructor(i);return this.state!==h?u(_,this.state===a?c:d,this.outcome):this.queue.push(new p(_,c,d)),_},p.prototype.callFulfilled=function(c){s.resolve(this.promise,c)},p.prototype.otherCallFulfilled=function(c){u(this.promise,this.onFulfilled,c)},p.prototype.callRejected=function(c){s.reject(this.promise,c)},p.prototype.otherCallRejected=function(c){u(this.promise,this.onRejected,c)},s.resolve=function(c,d){var _=g(f,d);if(_.status==="error")return s.reject(c,_.value);var y=_.value;if(y)m(c,y);else{c.state=a,c.outcome=d;for(var w=-1,b=c.queue.length;++w<b;)c.queue[w].callFulfilled(d)}return c},s.reject=function(c,d){c.state=o,c.outcome=d;for(var _=-1,y=c.queue.length;++_<y;)c.queue[_].callRejected(d);return c},l.resolve=function(c){return c instanceof this?c:s.resolve(new this(i),c)},l.reject=function(c){var d=new this(i);return s.reject(d,c)},l.all=function(c){var d=this;if(Object.prototype.toString.call(c)!=="[object Array]")return this.reject(new TypeError("must be an array"));var _=c.length,y=!1;if(!_)return this.resolve([]);for(var w=new Array(_),b=0,M=-1,L=new this(i);++M<_;)I(c[M],M);return L;function I(T,z){d.resolve(T).then(function(A){w[z]=A,++b!==_||y||(y=!0,s.resolve(L,w))},function(A){y||(y=!0,s.reject(L,A))})}},l.race=function(c){var d=this;if(Object.prototype.toString.call(c)!=="[object Array]")return this.reject(new TypeError("must be an array"));var _=c.length,y=!1;if(!_)return this.resolve([]);for(var w=-1,b=new this(i);++w<_;)M=c[w],d.resolve(M).then(function(L){y||(y=!0,s.resolve(b,L))},function(L){y||(y=!0,s.reject(b,L))});var M;return b}},{immediate:36}],38:[function(r,t,e){"use strict";var n={};(0,r("./lib/utils/common").assign)(n,r("./lib/deflate"),r("./lib/inflate"),r("./lib/zlib/constants")),t.exports=n},{"./lib/deflate":39,"./lib/inflate":40,"./lib/utils/common":41,"./lib/zlib/constants":44}],39:[function(r,t,e){"use strict";var n=r("./zlib/deflate"),i=r("./utils/common"),s=r("./utils/strings"),o=r("./zlib/messages"),a=r("./zlib/zstream"),h=Object.prototype.toString,l=0,p=-1,u=0,f=8;function m(c){if(!(this instanceof m))return new m(c);this.options=i.assign({level:p,method:f,chunkSize:16384,windowBits:15,memLevel:8,strategy:u,to:""},c||{});var d=this.options;d.raw&&0<d.windowBits?d.windowBits=-d.windowBits:d.gzip&&0<d.windowBits&&d.windowBits<16&&(d.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new a,this.strm.avail_out=0;var _=n.deflateInit2(this.strm,d.level,d.method,d.windowBits,d.memLevel,d.strategy);if(_!==l)throw new Error(o[_]);if(d.header&&n.deflateSetHeader(this.strm,d.header),d.dictionary){var y;if(y=typeof d.dictionary=="string"?s.string2buf(d.dictionary):h.call(d.dictionary)==="[object ArrayBuffer]"?new Uint8Array(d.dictionary):d.dictionary,(_=n.deflateSetDictionary(this.strm,y))!==l)throw new Error(o[_]);this._dict_set=!0}}function g(c,d){var _=new m(d);if(_.push(c,!0),_.err)throw _.msg||o[_.err];return _.result}m.prototype.push=function(c,d){var _,y,w=this.strm,b=this.options.chunkSize;if(this.ended)return!1;y=d===~~d?d:d===!0?4:0,typeof c=="string"?w.input=s.string2buf(c):h.call(c)==="[object ArrayBuffer]"?w.input=new Uint8Array(c):w.input=c,w.next_in=0,w.avail_in=w.input.length;do{if(w.avail_out===0&&(w.output=new i.Buf8(b),w.next_out=0,w.avail_out=b),(_=n.deflate(w,y))!==1&&_!==l)return this.onEnd(_),!(this.ended=!0);w.avail_out!==0&&(w.avail_in!==0||y!==4&&y!==2)||(this.options.to==="string"?this.onData(s.buf2binstring(i.shrinkBuf(w.output,w.next_out))):this.onData(i.shrinkBuf(w.output,w.next_out)))}while((0<w.avail_in||w.avail_out===0)&&_!==1);return y===4?(_=n.deflateEnd(this.strm),this.onEnd(_),this.ended=!0,_===l):y!==2||(this.onEnd(l),!(w.avail_out=0))},m.prototype.onData=function(c){this.chunks.push(c)},m.prototype.onEnd=function(c){c===l&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=i.flattenChunks(this.chunks)),this.chunks=[],this.err=c,this.msg=this.strm.msg},e.Deflate=m,e.deflate=g,e.deflateRaw=function(c,d){return(d=d||{}).raw=!0,g(c,d)},e.gzip=function(c,d){return(d=d||{}).gzip=!0,g(c,d)}},{"./utils/common":41,"./utils/strings":42,"./zlib/deflate":46,"./zlib/messages":51,"./zlib/zstream":53}],40:[function(r,t,e){"use strict";var n=r("./zlib/inflate"),i=r("./utils/common"),s=r("./utils/strings"),o=r("./zlib/constants"),a=r("./zlib/messages"),h=r("./zlib/zstream"),l=r("./zlib/gzheader"),p=Object.prototype.toString;function u(m){if(!(this instanceof u))return new u(m);this.options=i.assign({chunkSize:16384,windowBits:0,to:""},m||{});var g=this.options;g.raw&&0<=g.windowBits&&g.windowBits<16&&(g.windowBits=-g.windowBits,g.windowBits===0&&(g.windowBits=-15)),!(0<=g.windowBits&&g.windowBits<16)||m&&m.windowBits||(g.windowBits+=32),15<g.windowBits&&g.windowBits<48&&(15&g.windowBits)==0&&(g.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new h,this.strm.avail_out=0;var c=n.inflateInit2(this.strm,g.windowBits);if(c!==o.Z_OK)throw new Error(a[c]);this.header=new l,n.inflateGetHeader(this.strm,this.header)}function f(m,g){var c=new u(g);if(c.push(m,!0),c.err)throw c.msg||a[c.err];return c.result}u.prototype.push=function(m,g){var c,d,_,y,w,b,M=this.strm,L=this.options.chunkSize,I=this.options.dictionary,T=!1;if(this.ended)return!1;d=g===~~g?g:g===!0?o.Z_FINISH:o.Z_NO_FLUSH,typeof m=="string"?M.input=s.binstring2buf(m):p.call(m)==="[object ArrayBuffer]"?M.input=new Uint8Array(m):M.input=m,M.next_in=0,M.avail_in=M.input.length;do{if(M.avail_out===0&&(M.output=new i.Buf8(L),M.next_out=0,M.avail_out=L),(c=n.inflate(M,o.Z_NO_FLUSH))===o.Z_NEED_DICT&&I&&(b=typeof I=="string"?s.string2buf(I):p.call(I)==="[object ArrayBuffer]"?new Uint8Array(I):I,c=n.inflateSetDictionary(this.strm,b)),c===o.Z_BUF_ERROR&&T===!0&&(c=o.Z_OK,T=!1),c!==o.Z_STREAM_END&&c!==o.Z_OK)return this.onEnd(c),!(this.ended=!0);M.next_out&&(M.avail_out!==0&&c!==o.Z_STREAM_END&&(M.avail_in!==0||d!==o.Z_FINISH&&d!==o.Z_SYNC_FLUSH)||(this.options.to==="string"?(_=s.utf8border(M.output,M.next_out),y=M.next_out-_,w=s.buf2string(M.output,_),M.next_out=y,M.avail_out=L-y,y&&i.arraySet(M.output,M.output,_,y,0),this.onData(w)):this.onData(i.shrinkBuf(M.output,M.next_out)))),M.avail_in===0&&M.avail_out===0&&(T=!0)}while((0<M.avail_in||M.avail_out===0)&&c!==o.Z_STREAM_END);return c===o.Z_STREAM_END&&(d=o.Z_FINISH),d===o.Z_FINISH?(c=n.inflateEnd(this.strm),this.onEnd(c),this.ended=!0,c===o.Z_OK):d!==o.Z_SYNC_FLUSH||(this.onEnd(o.Z_OK),!(M.avail_out=0))},u.prototype.onData=function(m){this.chunks.push(m)},u.prototype.onEnd=function(m){m===o.Z_OK&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=i.flattenChunks(this.chunks)),this.chunks=[],this.err=m,this.msg=this.strm.msg},e.Inflate=u,e.inflate=f,e.inflateRaw=function(m,g){return(g=g||{}).raw=!0,f(m,g)},e.ungzip=f},{"./utils/common":41,"./utils/strings":42,"./zlib/constants":44,"./zlib/gzheader":47,"./zlib/inflate":49,"./zlib/messages":51,"./zlib/zstream":53}],41:[function(r,t,e){"use strict";var n=typeof Uint8Array<"u"&&typeof Uint16Array<"u"&&typeof Int32Array<"u";e.assign=function(o){for(var a=Array.prototype.slice.call(arguments,1);a.length;){var h=a.shift();if(h){if(typeof h!="object")throw new TypeError(h+"must be non-object");for(var l in h)h.hasOwnProperty(l)&&(o[l]=h[l])}}return o},e.shrinkBuf=function(o,a){return o.length===a?o:o.subarray?o.subarray(0,a):(o.length=a,o)};var i={arraySet:function(o,a,h,l,p){if(a.subarray&&o.subarray)o.set(a.subarray(h,h+l),p);else for(var u=0;u<l;u++)o[p+u]=a[h+u]},flattenChunks:function(o){var a,h,l,p,u,f;for(a=l=0,h=o.length;a<h;a++)l+=o[a].length;for(f=new Uint8Array(l),a=p=0,h=o.length;a<h;a++)u=o[a],f.set(u,p),p+=u.length;return f}},s={arraySet:function(o,a,h,l,p){for(var u=0;u<l;u++)o[p+u]=a[h+u]},flattenChunks:function(o){return[].concat.apply([],o)}};e.setTyped=function(o){o?(e.Buf8=Uint8Array,e.Buf16=Uint16Array,e.Buf32=Int32Array,e.assign(e,i)):(e.Buf8=Array,e.Buf16=Array,e.Buf32=Array,e.assign(e,s))},e.setTyped(n)},{}],42:[function(r,t,e){"use strict";var n=r("./common"),i=!0,s=!0;try{String.fromCharCode.apply(null,[0])}catch(l){i=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(l){s=!1}for(var o=new n.Buf8(256),a=0;a<256;a++)o[a]=252<=a?6:248<=a?5:240<=a?4:224<=a?3:192<=a?2:1;function h(l,p){if(p<65537&&(l.subarray&&s||!l.subarray&&i))return String.fromCharCode.apply(null,n.shrinkBuf(l,p));for(var u="",f=0;f<p;f++)u+=String.fromCharCode(l[f]);return u}o[254]=o[254]=1,e.string2buf=function(l){var p,u,f,m,g,c=l.length,d=0;for(m=0;m<c;m++)(64512&(u=l.charCodeAt(m)))==55296&&m+1<c&&(64512&(f=l.charCodeAt(m+1)))==56320&&(u=65536+(u-55296<<10)+(f-56320),m++),d+=u<128?1:u<2048?2:u<65536?3:4;for(p=new n.Buf8(d),m=g=0;g<d;m++)(64512&(u=l.charCodeAt(m)))==55296&&m+1<c&&(64512&(f=l.charCodeAt(m+1)))==56320&&(u=65536+(u-55296<<10)+(f-56320),m++),u<128?p[g++]=u:(u<2048?p[g++]=192|u>>>6:(u<65536?p[g++]=224|u>>>12:(p[g++]=240|u>>>18,p[g++]=128|u>>>12&63),p[g++]=128|u>>>6&63),p[g++]=128|63&u);return p},e.buf2binstring=function(l){return h(l,l.length)},e.binstring2buf=function(l){for(var p=new n.Buf8(l.length),u=0,f=p.length;u<f;u++)p[u]=l.charCodeAt(u);return p},e.buf2string=function(l,p){var u,f,m,g,c=p||l.length,d=new Array(2*c);for(u=f=0;u<c;)if((m=l[u++])<128)d[f++]=m;else if(4<(g=o[m]))d[f++]=65533,u+=g-1;else{for(m&=g===2?31:g===3?15:7;1<g&&u<c;)m=m<<6|63&l[u++],g--;1<g?d[f++]=65533:m<65536?d[f++]=m:(m-=65536,d[f++]=55296|m>>10&1023,d[f++]=56320|1023&m)}return h(d,f)},e.utf8border=function(l,p){var u;for((p=p||l.length)>l.length&&(p=l.length),u=p-1;0<=u&&(192&l[u])==128;)u--;return u<0||u===0?p:u+o[l[u]]>p?u:p}},{"./common":41}],43:[function(r,t,e){"use strict";t.exports=function(n,i,s,o){for(var a=65535&n|0,h=n>>>16&65535|0,l=0;s!==0;){for(s-=l=2e3<s?2e3:s;h=h+(a=a+i[o++]|0)|0,--l;);a%=65521,h%=65521}return a|h<<16|0}},{}],44:[function(r,t,e){"use strict";t.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],45:[function(r,t,e){"use strict";var n=function(){for(var i,s=[],o=0;o<256;o++){i=o;for(var a=0;a<8;a++)i=1&i?3988292384^i>>>1:i>>>1;s[o]=i}return s}();t.exports=function(i,s,o,a){var h=n,l=a+o;i^=-1;for(var p=a;p<l;p++)i=i>>>8^h[255&(i^s[p])];return-1^i}},{}],46:[function(r,t,e){"use strict";var n,i=r("../utils/common"),s=r("./trees"),o=r("./adler32"),a=r("./crc32"),h=r("./messages"),l=0,p=4,u=0,f=-2,m=-1,g=4,c=2,d=8,_=9,y=286,w=30,b=19,M=2*y+1,L=15,I=3,T=258,z=T+I+1,A=42,N=113,v=1,O=2,B=3,U=4;function nt(x,X){return x.msg=h[X],X}function G(x){return(x<<1)-(4<x?9:0)}function J(x){for(var X=x.length;0<=--X;)x[X]=0}function C(x){var X=x.state,Q=X.pending;Q>x.avail_out&&(Q=x.avail_out),Q!==0&&(i.arraySet(x.output,X.pending_buf,X.pending_out,Q,x.next_out),x.next_out+=Q,X.pending_out+=Q,x.total_out+=Q,x.avail_out-=Q,X.pending-=Q,X.pending===0&&(X.pending_out=0))}function R(x,X){s._tr_flush_block(x,0<=x.block_start?x.block_start:-1,x.strstart-x.block_start,X),x.block_start=x.strstart,C(x.strm)}function it(x,X){x.pending_buf[x.pending++]=X}function Z(x,X){x.pending_buf[x.pending++]=X>>>8&255,x.pending_buf[x.pending++]=255&X}function K(x,X){var Q,k,P=x.max_chain_length,V=x.strstart,rt=x.prev_length,st=x.nice_match,q=x.strstart>x.w_size-z?x.strstart-(x.w_size-z):0,ut=x.window,E=x.w_mask,S=x.prev,H=x.strstart+T,ot=ut[V+rt-1],ht=ut[V+rt];x.prev_length>=x.good_match&&(P>>=2),st>x.lookahead&&(st=x.lookahead);do if(ut[(Q=X)+rt]===ht&&ut[Q+rt-1]===ot&&ut[Q]===ut[V]&&ut[++Q]===ut[V+1]){V+=2,Q++;do;while(ut[++V]===ut[++Q]&&ut[++V]===ut[++Q]&&ut[++V]===ut[++Q]&&ut[++V]===ut[++Q]&&ut[++V]===ut[++Q]&&ut[++V]===ut[++Q]&&ut[++V]===ut[++Q]&&ut[++V]===ut[++Q]&&V<H);if(k=T-(H-V),V=H-T,rt<k){if(x.match_start=X,st<=(rt=k))break;ot=ut[V+rt-1],ht=ut[V+rt]}}while((X=S[X&E])>q&&--P!=0);return rt<=x.lookahead?rt:x.lookahead}function ft(x){var X,Q,k,P,V,rt,st,q,ut,E,S=x.w_size;do{if(P=x.window_size-x.lookahead-x.strstart,x.strstart>=S+(S-z)){for(i.arraySet(x.window,x.window,S,S,0),x.match_start-=S,x.strstart-=S,x.block_start-=S,X=Q=x.hash_size;k=x.head[--X],x.head[X]=S<=k?k-S:0,--Q;);for(X=Q=S;k=x.prev[--X],x.prev[X]=S<=k?k-S:0,--Q;);P+=S}if(x.strm.avail_in===0)break;if(rt=x.strm,st=x.window,q=x.strstart+x.lookahead,ut=P,E=void 0,E=rt.avail_in,ut<E&&(E=ut),Q=E===0?0:(rt.avail_in-=E,i.arraySet(st,rt.input,rt.next_in,E,q),rt.state.wrap===1?rt.adler=o(rt.adler,st,E,q):rt.state.wrap===2&&(rt.adler=a(rt.adler,st,E,q)),rt.next_in+=E,rt.total_in+=E,E),x.lookahead+=Q,x.lookahead+x.insert>=I)for(V=x.strstart-x.insert,x.ins_h=x.window[V],x.ins_h=(x.ins_h<<x.hash_shift^x.window[V+1])&x.hash_mask;x.insert&&(x.ins_h=(x.ins_h<<x.hash_shift^x.window[V+I-1])&x.hash_mask,x.prev[V&x.w_mask]=x.head[x.ins_h],x.head[x.ins_h]=V,V++,x.insert--,!(x.lookahead+x.insert<I)););}while(x.lookahead<z&&x.strm.avail_in!==0)}function Tt(x,X){for(var Q,k;;){if(x.lookahead<z){if(ft(x),x.lookahead<z&&X===l)return v;if(x.lookahead===0)break}if(Q=0,x.lookahead>=I&&(x.ins_h=(x.ins_h<<x.hash_shift^x.window[x.strstart+I-1])&x.hash_mask,Q=x.prev[x.strstart&x.w_mask]=x.head[x.ins_h],x.head[x.ins_h]=x.strstart),Q!==0&&x.strstart-Q<=x.w_size-z&&(x.match_length=K(x,Q)),x.match_length>=I)if(k=s._tr_tally(x,x.strstart-x.match_start,x.match_length-I),x.lookahead-=x.match_length,x.match_length<=x.max_lazy_match&&x.lookahead>=I){for(x.match_length--;x.strstart++,x.ins_h=(x.ins_h<<x.hash_shift^x.window[x.strstart+I-1])&x.hash_mask,Q=x.prev[x.strstart&x.w_mask]=x.head[x.ins_h],x.head[x.ins_h]=x.strstart,--x.match_length!=0;);x.strstart++}else x.strstart+=x.match_length,x.match_length=0,x.ins_h=x.window[x.strstart],x.ins_h=(x.ins_h<<x.hash_shift^x.window[x.strstart+1])&x.hash_mask;else k=s._tr_tally(x,0,x.window[x.strstart]),x.lookahead--,x.strstart++;if(k&&(R(x,!1),x.strm.avail_out===0))return v}return x.insert=x.strstart<I-1?x.strstart:I-1,X===p?(R(x,!0),x.strm.avail_out===0?B:U):x.last_lit&&(R(x,!1),x.strm.avail_out===0)?v:O}function et(x,X){for(var Q,k,P;;){if(x.lookahead<z){if(ft(x),x.lookahead<z&&X===l)return v;if(x.lookahead===0)break}if(Q=0,x.lookahead>=I&&(x.ins_h=(x.ins_h<<x.hash_shift^x.window[x.strstart+I-1])&x.hash_mask,Q=x.prev[x.strstart&x.w_mask]=x.head[x.ins_h],x.head[x.ins_h]=x.strstart),x.prev_length=x.match_length,x.prev_match=x.match_start,x.match_length=I-1,Q!==0&&x.prev_length<x.max_lazy_match&&x.strstart-Q<=x.w_size-z&&(x.match_length=K(x,Q),x.match_length<=5&&(x.strategy===1||x.match_length===I&&4096<x.strstart-x.match_start)&&(x.match_length=I-1)),x.prev_length>=I&&x.match_length<=x.prev_length){for(P=x.strstart+x.lookahead-I,k=s._tr_tally(x,x.strstart-1-x.prev_match,x.prev_length-I),x.lookahead-=x.prev_length-1,x.prev_length-=2;++x.strstart<=P&&(x.ins_h=(x.ins_h<<x.hash_shift^x.window[x.strstart+I-1])&x.hash_mask,Q=x.prev[x.strstart&x.w_mask]=x.head[x.ins_h],x.head[x.ins_h]=x.strstart),--x.prev_length!=0;);if(x.match_available=0,x.match_length=I-1,x.strstart++,k&&(R(x,!1),x.strm.avail_out===0))return v}else if(x.match_available){if((k=s._tr_tally(x,0,x.window[x.strstart-1]))&&R(x,!1),x.strstart++,x.lookahead--,x.strm.avail_out===0)return v}else x.match_available=1,x.strstart++,x.lookahead--}return x.match_available&&(k=s._tr_tally(x,0,x.window[x.strstart-1]),x.match_available=0),x.insert=x.strstart<I-1?x.strstart:I-1,X===p?(R(x,!0),x.strm.avail_out===0?B:U):x.last_lit&&(R(x,!1),x.strm.avail_out===0)?v:O}function At(x,X,Q,k,P){this.good_length=x,this.max_lazy=X,this.nice_length=Q,this.max_chain=k,this.func=P}function Mt(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=d,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new i.Buf16(2*M),this.dyn_dtree=new i.Buf16(2*(2*w+1)),this.bl_tree=new i.Buf16(2*(2*b+1)),J(this.dyn_ltree),J(this.dyn_dtree),J(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new i.Buf16(L+1),this.heap=new i.Buf16(2*y+1),J(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new i.Buf16(2*y+1),J(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function bt(x){var X;return x&&x.state?(x.total_in=x.total_out=0,x.data_type=c,(X=x.state).pending=0,X.pending_out=0,X.wrap<0&&(X.wrap=-X.wrap),X.status=X.wrap?A:N,x.adler=X.wrap===2?0:1,X.last_flush=l,s._tr_init(X),u):nt(x,f)}function xt(x){var X=bt(x);return X===u&&function(Q){Q.window_size=2*Q.w_size,J(Q.head),Q.max_lazy_match=n[Q.level].max_lazy,Q.good_match=n[Q.level].good_length,Q.nice_match=n[Q.level].nice_length,Q.max_chain_length=n[Q.level].max_chain,Q.strstart=0,Q.block_start=0,Q.lookahead=0,Q.insert=0,Q.match_length=Q.prev_length=I-1,Q.match_available=0,Q.ins_h=0}(x.state),X}function Dt(x,X,Q,k,P,V){if(!x)return f;var rt=1;if(X===m&&(X=6),k<0?(rt=0,k=-k):15<k&&(rt=2,k-=16),P<1||_<P||Q!==d||k<8||15<k||X<0||9<X||V<0||g<V)return nt(x,f);k===8&&(k=9);var st=new Mt;return(x.state=st).strm=x,st.wrap=rt,st.gzhead=null,st.w_bits=k,st.w_size=1<<st.w_bits,st.w_mask=st.w_size-1,st.hash_bits=P+7,st.hash_size=1<<st.hash_bits,st.hash_mask=st.hash_size-1,st.hash_shift=~~((st.hash_bits+I-1)/I),st.window=new i.Buf8(2*st.w_size),st.head=new i.Buf16(st.hash_size),st.prev=new i.Buf16(st.w_size),st.lit_bufsize=1<<P+6,st.pending_buf_size=4*st.lit_bufsize,st.pending_buf=new i.Buf8(st.pending_buf_size),st.d_buf=1*st.lit_bufsize,st.l_buf=3*st.lit_bufsize,st.level=X,st.strategy=V,st.method=Q,xt(x)}n=[new At(0,0,0,0,function(x,X){var Q=65535;for(Q>x.pending_buf_size-5&&(Q=x.pending_buf_size-5);;){if(x.lookahead<=1){if(ft(x),x.lookahead===0&&X===l)return v;if(x.lookahead===0)break}x.strstart+=x.lookahead,x.lookahead=0;var k=x.block_start+Q;if((x.strstart===0||x.strstart>=k)&&(x.lookahead=x.strstart-k,x.strstart=k,R(x,!1),x.strm.avail_out===0)||x.strstart-x.block_start>=x.w_size-z&&(R(x,!1),x.strm.avail_out===0))return v}return x.insert=0,X===p?(R(x,!0),x.strm.avail_out===0?B:U):(x.strstart>x.block_start&&(R(x,!1),x.strm.avail_out),v)}),new At(4,4,8,4,Tt),new At(4,5,16,8,Tt),new At(4,6,32,32,Tt),new At(4,4,16,16,et),new At(8,16,32,32,et),new At(8,16,128,128,et),new At(8,32,128,256,et),new At(32,128,258,1024,et),new At(32,258,258,4096,et)],e.deflateInit=function(x,X){return Dt(x,X,d,15,8,0)},e.deflateInit2=Dt,e.deflateReset=xt,e.deflateResetKeep=bt,e.deflateSetHeader=function(x,X){return x&&x.state?x.state.wrap!==2?f:(x.state.gzhead=X,u):f},e.deflate=function(x,X){var Q,k,P,V;if(!x||!x.state||5<X||X<0)return x?nt(x,f):f;if(k=x.state,!x.output||!x.input&&x.avail_in!==0||k.status===666&&X!==p)return nt(x,x.avail_out===0?-5:f);if(k.strm=x,Q=k.last_flush,k.last_flush=X,k.status===A)if(k.wrap===2)x.adler=0,it(k,31),it(k,139),it(k,8),k.gzhead?(it(k,(k.gzhead.text?1:0)+(k.gzhead.hcrc?2:0)+(k.gzhead.extra?4:0)+(k.gzhead.name?8:0)+(k.gzhead.comment?16:0)),it(k,255&k.gzhead.time),it(k,k.gzhead.time>>8&255),it(k,k.gzhead.time>>16&255),it(k,k.gzhead.time>>24&255),it(k,k.level===9?2:2<=k.strategy||k.level<2?4:0),it(k,255&k.gzhead.os),k.gzhead.extra&&k.gzhead.extra.length&&(it(k,255&k.gzhead.extra.length),it(k,k.gzhead.extra.length>>8&255)),k.gzhead.hcrc&&(x.adler=a(x.adler,k.pending_buf,k.pending,0)),k.gzindex=0,k.status=69):(it(k,0),it(k,0),it(k,0),it(k,0),it(k,0),it(k,k.level===9?2:2<=k.strategy||k.level<2?4:0),it(k,3),k.status=N);else{var rt=d+(k.w_bits-8<<4)<<8;rt|=(2<=k.strategy||k.level<2?0:k.level<6?1:k.level===6?2:3)<<6,k.strstart!==0&&(rt|=32),rt+=31-rt%31,k.status=N,Z(k,rt),k.strstart!==0&&(Z(k,x.adler>>>16),Z(k,65535&x.adler)),x.adler=1}if(k.status===69)if(k.gzhead.extra){for(P=k.pending;k.gzindex<(65535&k.gzhead.extra.length)&&(k.pending!==k.pending_buf_size||(k.gzhead.hcrc&&k.pending>P&&(x.adler=a(x.adler,k.pending_buf,k.pending-P,P)),C(x),P=k.pending,k.pending!==k.pending_buf_size));)it(k,255&k.gzhead.extra[k.gzindex]),k.gzindex++;k.gzhead.hcrc&&k.pending>P&&(x.adler=a(x.adler,k.pending_buf,k.pending-P,P)),k.gzindex===k.gzhead.extra.length&&(k.gzindex=0,k.status=73)}else k.status=73;if(k.status===73)if(k.gzhead.name){P=k.pending;do{if(k.pending===k.pending_buf_size&&(k.gzhead.hcrc&&k.pending>P&&(x.adler=a(x.adler,k.pending_buf,k.pending-P,P)),C(x),P=k.pending,k.pending===k.pending_buf_size)){V=1;break}V=k.gzindex<k.gzhead.name.length?255&k.gzhead.name.charCodeAt(k.gzindex++):0,it(k,V)}while(V!==0);k.gzhead.hcrc&&k.pending>P&&(x.adler=a(x.adler,k.pending_buf,k.pending-P,P)),V===0&&(k.gzindex=0,k.status=91)}else k.status=91;if(k.status===91)if(k.gzhead.comment){P=k.pending;do{if(k.pending===k.pending_buf_size&&(k.gzhead.hcrc&&k.pending>P&&(x.adler=a(x.adler,k.pending_buf,k.pending-P,P)),C(x),P=k.pending,k.pending===k.pending_buf_size)){V=1;break}V=k.gzindex<k.gzhead.comment.length?255&k.gzhead.comment.charCodeAt(k.gzindex++):0,it(k,V)}while(V!==0);k.gzhead.hcrc&&k.pending>P&&(x.adler=a(x.adler,k.pending_buf,k.pending-P,P)),V===0&&(k.status=103)}else k.status=103;if(k.status===103&&(k.gzhead.hcrc?(k.pending+2>k.pending_buf_size&&C(x),k.pending+2<=k.pending_buf_size&&(it(k,255&x.adler),it(k,x.adler>>8&255),x.adler=0,k.status=N)):k.status=N),k.pending!==0){if(C(x),x.avail_out===0)return k.last_flush=-1,u}else if(x.avail_in===0&&G(X)<=G(Q)&&X!==p)return nt(x,-5);if(k.status===666&&x.avail_in!==0)return nt(x,-5);if(x.avail_in!==0||k.lookahead!==0||X!==l&&k.status!==666){var st=k.strategy===2?function(q,ut){for(var E;;){if(q.lookahead===0&&(ft(q),q.lookahead===0)){if(ut===l)return v;break}if(q.match_length=0,E=s._tr_tally(q,0,q.window[q.strstart]),q.lookahead--,q.strstart++,E&&(R(q,!1),q.strm.avail_out===0))return v}return q.insert=0,ut===p?(R(q,!0),q.strm.avail_out===0?B:U):q.last_lit&&(R(q,!1),q.strm.avail_out===0)?v:O}(k,X):k.strategy===3?function(q,ut){for(var E,S,H,ot,ht=q.window;;){if(q.lookahead<=T){if(ft(q),q.lookahead<=T&&ut===l)return v;if(q.lookahead===0)break}if(q.match_length=0,q.lookahead>=I&&0<q.strstart&&(S=ht[H=q.strstart-1])===ht[++H]&&S===ht[++H]&&S===ht[++H]){ot=q.strstart+T;do;while(S===ht[++H]&&S===ht[++H]&&S===ht[++H]&&S===ht[++H]&&S===ht[++H]&&S===ht[++H]&&S===ht[++H]&&S===ht[++H]&&H<ot);q.match_length=T-(ot-H),q.match_length>q.lookahead&&(q.match_length=q.lookahead)}if(q.match_length>=I?(E=s._tr_tally(q,1,q.match_length-I),q.lookahead-=q.match_length,q.strstart+=q.match_length,q.match_length=0):(E=s._tr_tally(q,0,q.window[q.strstart]),q.lookahead--,q.strstart++),E&&(R(q,!1),q.strm.avail_out===0))return v}return q.insert=0,ut===p?(R(q,!0),q.strm.avail_out===0?B:U):q.last_lit&&(R(q,!1),q.strm.avail_out===0)?v:O}(k,X):n[k.level].func(k,X);if(st!==B&&st!==U||(k.status=666),st===v||st===B)return x.avail_out===0&&(k.last_flush=-1),u;if(st===O&&(X===1?s._tr_align(k):X!==5&&(s._tr_stored_block(k,0,0,!1),X===3&&(J(k.head),k.lookahead===0&&(k.strstart=0,k.block_start=0,k.insert=0))),C(x),x.avail_out===0))return k.last_flush=-1,u}return X!==p?u:k.wrap<=0?1:(k.wrap===2?(it(k,255&x.adler),it(k,x.adler>>8&255),it(k,x.adler>>16&255),it(k,x.adler>>24&255),it(k,255&x.total_in),it(k,x.total_in>>8&255),it(k,x.total_in>>16&255),it(k,x.total_in>>24&255)):(Z(k,x.adler>>>16),Z(k,65535&x.adler)),C(x),0<k.wrap&&(k.wrap=-k.wrap),k.pending!==0?u:1)},e.deflateEnd=function(x){var X;return x&&x.state?(X=x.state.status)!==A&&X!==69&&X!==73&&X!==91&&X!==103&&X!==N&&X!==666?nt(x,f):(x.state=null,X===N?nt(x,-3):u):f},e.deflateSetDictionary=function(x,X){var Q,k,P,V,rt,st,q,ut,E=X.length;if(!x||!x.state||(V=(Q=x.state).wrap)===2||V===1&&Q.status!==A||Q.lookahead)return f;for(V===1&&(x.adler=o(x.adler,X,E,0)),Q.wrap=0,E>=Q.w_size&&(V===0&&(J(Q.head),Q.strstart=0,Q.block_start=0,Q.insert=0),ut=new i.Buf8(Q.w_size),i.arraySet(ut,X,E-Q.w_size,Q.w_size,0),X=ut,E=Q.w_size),rt=x.avail_in,st=x.next_in,q=x.input,x.avail_in=E,x.next_in=0,x.input=X,ft(Q);Q.lookahead>=I;){for(k=Q.strstart,P=Q.lookahead-(I-1);Q.ins_h=(Q.ins_h<<Q.hash_shift^Q.window[k+I-1])&Q.hash_mask,Q.prev[k&Q.w_mask]=Q.head[Q.ins_h],Q.head[Q.ins_h]=k,k++,--P;);Q.strstart=k,Q.lookahead=I-1,ft(Q)}return Q.strstart+=Q.lookahead,Q.block_start=Q.strstart,Q.insert=Q.lookahead,Q.lookahead=0,Q.match_length=Q.prev_length=I-1,Q.match_available=0,x.next_in=st,x.input=q,x.avail_in=rt,Q.wrap=V,u},e.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./messages":51,"./trees":52}],47:[function(r,t,e){"use strict";t.exports=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}},{}],48:[function(r,t,e){"use strict";t.exports=function(n,i){var s,o,a,h,l,p,u,f,m,g,c,d,_,y,w,b,M,L,I,T,z,A,N,v,O;s=n.state,o=n.next_in,v=n.input,a=o+(n.avail_in-5),h=n.next_out,O=n.output,l=h-(i-n.avail_out),p=h+(n.avail_out-257),u=s.dmax,f=s.wsize,m=s.whave,g=s.wnext,c=s.window,d=s.hold,_=s.bits,y=s.lencode,w=s.distcode,b=(1<<s.lenbits)-1,M=(1<<s.distbits)-1;t:do{_<15&&(d+=v[o++]<<_,_+=8,d+=v[o++]<<_,_+=8),L=y[d&b];e:for(;;){if(d>>>=I=L>>>24,_-=I,(I=L>>>16&255)===0)O[h++]=65535&L;else{if(!(16&I)){if((64&I)==0){L=y[(65535&L)+(d&(1<<I)-1)];continue e}if(32&I){s.mode=12;break t}n.msg="invalid literal/length code",s.mode=30;break t}T=65535&L,(I&=15)&&(_<I&&(d+=v[o++]<<_,_+=8),T+=d&(1<<I)-1,d>>>=I,_-=I),_<15&&(d+=v[o++]<<_,_+=8,d+=v[o++]<<_,_+=8),L=w[d&M];n:for(;;){if(d>>>=I=L>>>24,_-=I,!(16&(I=L>>>16&255))){if((64&I)==0){L=w[(65535&L)+(d&(1<<I)-1)];continue n}n.msg="invalid distance code",s.mode=30;break t}if(z=65535&L,_<(I&=15)&&(d+=v[o++]<<_,(_+=8)<I&&(d+=v[o++]<<_,_+=8)),u<(z+=d&(1<<I)-1)){n.msg="invalid distance too far back",s.mode=30;break t}if(d>>>=I,_-=I,(I=h-l)<z){if(m<(I=z-I)&&s.sane){n.msg="invalid distance too far back",s.mode=30;break t}if(N=c,(A=0)===g){if(A+=f-I,I<T){for(T-=I;O[h++]=c[A++],--I;);A=h-z,N=O}}else if(g<I){if(A+=f+g-I,(I-=g)<T){for(T-=I;O[h++]=c[A++],--I;);if(A=0,g<T){for(T-=I=g;O[h++]=c[A++],--I;);A=h-z,N=O}}}else if(A+=g-I,I<T){for(T-=I;O[h++]=c[A++],--I;);A=h-z,N=O}for(;2<T;)O[h++]=N[A++],O[h++]=N[A++],O[h++]=N[A++],T-=3;T&&(O[h++]=N[A++],1<T&&(O[h++]=N[A++]))}else{for(A=h-z;O[h++]=O[A++],O[h++]=O[A++],O[h++]=O[A++],2<(T-=3););T&&(O[h++]=O[A++],1<T&&(O[h++]=O[A++]))}break}}break}}while(o<a&&h<p);o-=T=_>>3,d&=(1<<(_-=T<<3))-1,n.next_in=o,n.next_out=h,n.avail_in=o<a?a-o+5:5-(o-a),n.avail_out=h<p?p-h+257:257-(h-p),s.hold=d,s.bits=_}},{}],49:[function(r,t,e){"use strict";var n=r("../utils/common"),i=r("./adler32"),s=r("./crc32"),o=r("./inffast"),a=r("./inftrees"),h=1,l=2,p=0,u=-2,f=1,m=852,g=592;function c(A){return(A>>>24&255)+(A>>>8&65280)+((65280&A)<<8)+((255&A)<<24)}function d(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new n.Buf16(320),this.work=new n.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function _(A){var N;return A&&A.state?(N=A.state,A.total_in=A.total_out=N.total=0,A.msg="",N.wrap&&(A.adler=1&N.wrap),N.mode=f,N.last=0,N.havedict=0,N.dmax=32768,N.head=null,N.hold=0,N.bits=0,N.lencode=N.lendyn=new n.Buf32(m),N.distcode=N.distdyn=new n.Buf32(g),N.sane=1,N.back=-1,p):u}function y(A){var N;return A&&A.state?((N=A.state).wsize=0,N.whave=0,N.wnext=0,_(A)):u}function w(A,N){var v,O;return A&&A.state?(O=A.state,N<0?(v=0,N=-N):(v=1+(N>>4),N<48&&(N&=15)),N&&(N<8||15<N)?u:(O.window!==null&&O.wbits!==N&&(O.window=null),O.wrap=v,O.wbits=N,y(A))):u}function b(A,N){var v,O;return A?(O=new d,(A.state=O).window=null,(v=w(A,N))!==p&&(A.state=null),v):u}var M,L,I=!0;function T(A){if(I){var N;for(M=new n.Buf32(512),L=new n.Buf32(32),N=0;N<144;)A.lens[N++]=8;for(;N<256;)A.lens[N++]=9;for(;N<280;)A.lens[N++]=7;for(;N<288;)A.lens[N++]=8;for(a(h,A.lens,0,288,M,0,A.work,{bits:9}),N=0;N<32;)A.lens[N++]=5;a(l,A.lens,0,32,L,0,A.work,{bits:5}),I=!1}A.lencode=M,A.lenbits=9,A.distcode=L,A.distbits=5}function z(A,N,v,O){var B,U=A.state;return U.window===null&&(U.wsize=1<<U.wbits,U.wnext=0,U.whave=0,U.window=new n.Buf8(U.wsize)),O>=U.wsize?(n.arraySet(U.window,N,v-U.wsize,U.wsize,0),U.wnext=0,U.whave=U.wsize):(O<(B=U.wsize-U.wnext)&&(B=O),n.arraySet(U.window,N,v-O,B,U.wnext),(O-=B)?(n.arraySet(U.window,N,v-O,O,0),U.wnext=O,U.whave=U.wsize):(U.wnext+=B,U.wnext===U.wsize&&(U.wnext=0),U.whave<U.wsize&&(U.whave+=B))),0}e.inflateReset=y,e.inflateReset2=w,e.inflateResetKeep=_,e.inflateInit=function(A){return b(A,15)},e.inflateInit2=b,e.inflate=function(A,N){var v,O,B,U,nt,G,J,C,R,it,Z,K,ft,Tt,et,At,Mt,bt,xt,Dt,x,X,Q,k,P=0,V=new n.Buf8(4),rt=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!A||!A.state||!A.output||!A.input&&A.avail_in!==0)return u;(v=A.state).mode===12&&(v.mode=13),nt=A.next_out,B=A.output,J=A.avail_out,U=A.next_in,O=A.input,G=A.avail_in,C=v.hold,R=v.bits,it=G,Z=J,X=p;t:for(;;)switch(v.mode){case f:if(v.wrap===0){v.mode=13;break}for(;R<16;){if(G===0)break t;G--,C+=O[U++]<<R,R+=8}if(2&v.wrap&&C===35615){V[v.check=0]=255&C,V[1]=C>>>8&255,v.check=s(v.check,V,2,0),R=C=0,v.mode=2;break}if(v.flags=0,v.head&&(v.head.done=!1),!(1&v.wrap)||(((255&C)<<8)+(C>>8))%31){A.msg="incorrect header check",v.mode=30;break}if((15&C)!=8){A.msg="unknown compression method",v.mode=30;break}if(R-=4,x=8+(15&(C>>>=4)),v.wbits===0)v.wbits=x;else if(x>v.wbits){A.msg="invalid window size",v.mode=30;break}v.dmax=1<<x,A.adler=v.check=1,v.mode=512&C?10:12,R=C=0;break;case 2:for(;R<16;){if(G===0)break t;G--,C+=O[U++]<<R,R+=8}if(v.flags=C,(255&v.flags)!=8){A.msg="unknown compression method",v.mode=30;break}if(57344&v.flags){A.msg="unknown header flags set",v.mode=30;break}v.head&&(v.head.text=C>>8&1),512&v.flags&&(V[0]=255&C,V[1]=C>>>8&255,v.check=s(v.check,V,2,0)),R=C=0,v.mode=3;case 3:for(;R<32;){if(G===0)break t;G--,C+=O[U++]<<R,R+=8}v.head&&(v.head.time=C),512&v.flags&&(V[0]=255&C,V[1]=C>>>8&255,V[2]=C>>>16&255,V[3]=C>>>24&255,v.check=s(v.check,V,4,0)),R=C=0,v.mode=4;case 4:for(;R<16;){if(G===0)break t;G--,C+=O[U++]<<R,R+=8}v.head&&(v.head.xflags=255&C,v.head.os=C>>8),512&v.flags&&(V[0]=255&C,V[1]=C>>>8&255,v.check=s(v.check,V,2,0)),R=C=0,v.mode=5;case 5:if(1024&v.flags){for(;R<16;){if(G===0)break t;G--,C+=O[U++]<<R,R+=8}v.length=C,v.head&&(v.head.extra_len=C),512&v.flags&&(V[0]=255&C,V[1]=C>>>8&255,v.check=s(v.check,V,2,0)),R=C=0}else v.head&&(v.head.extra=null);v.mode=6;case 6:if(1024&v.flags&&(G<(K=v.length)&&(K=G),K&&(v.head&&(x=v.head.extra_len-v.length,v.head.extra||(v.head.extra=new Array(v.head.extra_len)),n.arraySet(v.head.extra,O,U,K,x)),512&v.flags&&(v.check=s(v.check,O,K,U)),G-=K,U+=K,v.length-=K),v.length))break t;v.length=0,v.mode=7;case 7:if(2048&v.flags){if(G===0)break t;for(K=0;x=O[U+K++],v.head&&x&&v.length<65536&&(v.head.name+=String.fromCharCode(x)),x&&K<G;);if(512&v.flags&&(v.check=s(v.check,O,K,U)),G-=K,U+=K,x)break t}else v.head&&(v.head.name=null);v.length=0,v.mode=8;case 8:if(4096&v.flags){if(G===0)break t;for(K=0;x=O[U+K++],v.head&&x&&v.length<65536&&(v.head.comment+=String.fromCharCode(x)),x&&K<G;);if(512&v.flags&&(v.check=s(v.check,O,K,U)),G-=K,U+=K,x)break t}else v.head&&(v.head.comment=null);v.mode=9;case 9:if(512&v.flags){for(;R<16;){if(G===0)break t;G--,C+=O[U++]<<R,R+=8}if(C!==(65535&v.check)){A.msg="header crc mismatch",v.mode=30;break}R=C=0}v.head&&(v.head.hcrc=v.flags>>9&1,v.head.done=!0),A.adler=v.check=0,v.mode=12;break;case 10:for(;R<32;){if(G===0)break t;G--,C+=O[U++]<<R,R+=8}A.adler=v.check=c(C),R=C=0,v.mode=11;case 11:if(v.havedict===0)return A.next_out=nt,A.avail_out=J,A.next_in=U,A.avail_in=G,v.hold=C,v.bits=R,2;A.adler=v.check=1,v.mode=12;case 12:if(N===5||N===6)break t;case 13:if(v.last){C>>>=7&R,R-=7&R,v.mode=27;break}for(;R<3;){if(G===0)break t;G--,C+=O[U++]<<R,R+=8}switch(v.last=1&C,R-=1,3&(C>>>=1)){case 0:v.mode=14;break;case 1:if(T(v),v.mode=20,N!==6)break;C>>>=2,R-=2;break t;case 2:v.mode=17;break;case 3:A.msg="invalid block type",v.mode=30}C>>>=2,R-=2;break;case 14:for(C>>>=7&R,R-=7&R;R<32;){if(G===0)break t;G--,C+=O[U++]<<R,R+=8}if((65535&C)!=(C>>>16^65535)){A.msg="invalid stored block lengths",v.mode=30;break}if(v.length=65535&C,R=C=0,v.mode=15,N===6)break t;case 15:v.mode=16;case 16:if(K=v.length){if(G<K&&(K=G),J<K&&(K=J),K===0)break t;n.arraySet(B,O,U,K,nt),G-=K,U+=K,J-=K,nt+=K,v.length-=K;break}v.mode=12;break;case 17:for(;R<14;){if(G===0)break t;G--,C+=O[U++]<<R,R+=8}if(v.nlen=257+(31&C),C>>>=5,R-=5,v.ndist=1+(31&C),C>>>=5,R-=5,v.ncode=4+(15&C),C>>>=4,R-=4,286<v.nlen||30<v.ndist){A.msg="too many length or distance symbols",v.mode=30;break}v.have=0,v.mode=18;case 18:for(;v.have<v.ncode;){for(;R<3;){if(G===0)break t;G--,C+=O[U++]<<R,R+=8}v.lens[rt[v.have++]]=7&C,C>>>=3,R-=3}for(;v.have<19;)v.lens[rt[v.have++]]=0;if(v.lencode=v.lendyn,v.lenbits=7,Q={bits:v.lenbits},X=a(0,v.lens,0,19,v.lencode,0,v.work,Q),v.lenbits=Q.bits,X){A.msg="invalid code lengths set",v.mode=30;break}v.have=0,v.mode=19;case 19:for(;v.have<v.nlen+v.ndist;){for(;At=(P=v.lencode[C&(1<<v.lenbits)-1])>>>16&255,Mt=65535&P,!((et=P>>>24)<=R);){if(G===0)break t;G--,C+=O[U++]<<R,R+=8}if(Mt<16)C>>>=et,R-=et,v.lens[v.have++]=Mt;else{if(Mt===16){for(k=et+2;R<k;){if(G===0)break t;G--,C+=O[U++]<<R,R+=8}if(C>>>=et,R-=et,v.have===0){A.msg="invalid bit length repeat",v.mode=30;break}x=v.lens[v.have-1],K=3+(3&C),C>>>=2,R-=2}else if(Mt===17){for(k=et+3;R<k;){if(G===0)break t;G--,C+=O[U++]<<R,R+=8}R-=et,x=0,K=3+(7&(C>>>=et)),C>>>=3,R-=3}else{for(k=et+7;R<k;){if(G===0)break t;G--,C+=O[U++]<<R,R+=8}R-=et,x=0,K=11+(127&(C>>>=et)),C>>>=7,R-=7}if(v.have+K>v.nlen+v.ndist){A.msg="invalid bit length repeat",v.mode=30;break}for(;K--;)v.lens[v.have++]=x}}if(v.mode===30)break;if(v.lens[256]===0){A.msg="invalid code -- missing end-of-block",v.mode=30;break}if(v.lenbits=9,Q={bits:v.lenbits},X=a(h,v.lens,0,v.nlen,v.lencode,0,v.work,Q),v.lenbits=Q.bits,X){A.msg="invalid literal/lengths set",v.mode=30;break}if(v.distbits=6,v.distcode=v.distdyn,Q={bits:v.distbits},X=a(l,v.lens,v.nlen,v.ndist,v.distcode,0,v.work,Q),v.distbits=Q.bits,X){A.msg="invalid distances set",v.mode=30;break}if(v.mode=20,N===6)break t;case 20:v.mode=21;case 21:if(6<=G&&258<=J){A.next_out=nt,A.avail_out=J,A.next_in=U,A.avail_in=G,v.hold=C,v.bits=R,o(A,Z),nt=A.next_out,B=A.output,J=A.avail_out,U=A.next_in,O=A.input,G=A.avail_in,C=v.hold,R=v.bits,v.mode===12&&(v.back=-1);break}for(v.back=0;At=(P=v.lencode[C&(1<<v.lenbits)-1])>>>16&255,Mt=65535&P,!((et=P>>>24)<=R);){if(G===0)break t;G--,C+=O[U++]<<R,R+=8}if(At&&(240&At)==0){for(bt=et,xt=At,Dt=Mt;At=(P=v.lencode[Dt+((C&(1<<bt+xt)-1)>>bt)])>>>16&255,Mt=65535&P,!(bt+(et=P>>>24)<=R);){if(G===0)break t;G--,C+=O[U++]<<R,R+=8}C>>>=bt,R-=bt,v.back+=bt}if(C>>>=et,R-=et,v.back+=et,v.length=Mt,At===0){v.mode=26;break}if(32&At){v.back=-1,v.mode=12;break}if(64&At){A.msg="invalid literal/length code",v.mode=30;break}v.extra=15&At,v.mode=22;case 22:if(v.extra){for(k=v.extra;R<k;){if(G===0)break t;G--,C+=O[U++]<<R,R+=8}v.length+=C&(1<<v.extra)-1,C>>>=v.extra,R-=v.extra,v.back+=v.extra}v.was=v.length,v.mode=23;case 23:for(;At=(P=v.distcode[C&(1<<v.distbits)-1])>>>16&255,Mt=65535&P,!((et=P>>>24)<=R);){if(G===0)break t;G--,C+=O[U++]<<R,R+=8}if((240&At)==0){for(bt=et,xt=At,Dt=Mt;At=(P=v.distcode[Dt+((C&(1<<bt+xt)-1)>>bt)])>>>16&255,Mt=65535&P,!(bt+(et=P>>>24)<=R);){if(G===0)break t;G--,C+=O[U++]<<R,R+=8}C>>>=bt,R-=bt,v.back+=bt}if(C>>>=et,R-=et,v.back+=et,64&At){A.msg="invalid distance code",v.mode=30;break}v.offset=Mt,v.extra=15&At,v.mode=24;case 24:if(v.extra){for(k=v.extra;R<k;){if(G===0)break t;G--,C+=O[U++]<<R,R+=8}v.offset+=C&(1<<v.extra)-1,C>>>=v.extra,R-=v.extra,v.back+=v.extra}if(v.offset>v.dmax){A.msg="invalid distance too far back",v.mode=30;break}v.mode=25;case 25:if(J===0)break t;if(K=Z-J,v.offset>K){if((K=v.offset-K)>v.whave&&v.sane){A.msg="invalid distance too far back",v.mode=30;break}ft=K>v.wnext?(K-=v.wnext,v.wsize-K):v.wnext-K,K>v.length&&(K=v.length),Tt=v.window}else Tt=B,ft=nt-v.offset,K=v.length;for(J<K&&(K=J),J-=K,v.length-=K;B[nt++]=Tt[ft++],--K;);v.length===0&&(v.mode=21);break;case 26:if(J===0)break t;B[nt++]=v.length,J--,v.mode=21;break;case 27:if(v.wrap){for(;R<32;){if(G===0)break t;G--,C|=O[U++]<<R,R+=8}if(Z-=J,A.total_out+=Z,v.total+=Z,Z&&(A.adler=v.check=v.flags?s(v.check,B,Z,nt-Z):i(v.check,B,Z,nt-Z)),Z=J,(v.flags?C:c(C))!==v.check){A.msg="incorrect data check",v.mode=30;break}R=C=0}v.mode=28;case 28:if(v.wrap&&v.flags){for(;R<32;){if(G===0)break t;G--,C+=O[U++]<<R,R+=8}if(C!==(4294967295&v.total)){A.msg="incorrect length check",v.mode=30;break}R=C=0}v.mode=29;case 29:X=1;break t;case 30:X=-3;break t;case 31:return-4;case 32:default:return u}return A.next_out=nt,A.avail_out=J,A.next_in=U,A.avail_in=G,v.hold=C,v.bits=R,(v.wsize||Z!==A.avail_out&&v.mode<30&&(v.mode<27||N!==4))&&z(A,A.output,A.next_out,Z-A.avail_out)?(v.mode=31,-4):(it-=A.avail_in,Z-=A.avail_out,A.total_in+=it,A.total_out+=Z,v.total+=Z,v.wrap&&Z&&(A.adler=v.check=v.flags?s(v.check,B,Z,A.next_out-Z):i(v.check,B,Z,A.next_out-Z)),A.data_type=v.bits+(v.last?64:0)+(v.mode===12?128:0)+(v.mode===20||v.mode===15?256:0),(it==0&&Z===0||N===4)&&X===p&&(X=-5),X)},e.inflateEnd=function(A){if(!A||!A.state)return u;var N=A.state;return N.window&&(N.window=null),A.state=null,p},e.inflateGetHeader=function(A,N){var v;return A&&A.state?(2&(v=A.state).wrap)==0?u:((v.head=N).done=!1,p):u},e.inflateSetDictionary=function(A,N){var v,O=N.length;return A&&A.state?(v=A.state).wrap!==0&&v.mode!==11?u:v.mode===11&&i(1,N,O,0)!==v.check?-3:z(A,N,O,O)?(v.mode=31,-4):(v.havedict=1,p):u},e.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./inffast":48,"./inftrees":50}],50:[function(r,t,e){"use strict";var n=r("../utils/common"),i=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],s=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],o=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],a=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];t.exports=function(h,l,p,u,f,m,g,c){var d,_,y,w,b,M,L,I,T,z=c.bits,A=0,N=0,v=0,O=0,B=0,U=0,nt=0,G=0,J=0,C=0,R=null,it=0,Z=new n.Buf16(16),K=new n.Buf16(16),ft=null,Tt=0;for(A=0;A<=15;A++)Z[A]=0;for(N=0;N<u;N++)Z[l[p+N]]++;for(B=z,O=15;1<=O&&Z[O]===0;O--);if(O<B&&(B=O),O===0)return f[m++]=20971520,f[m++]=20971520,c.bits=1,0;for(v=1;v<O&&Z[v]===0;v++);for(B<v&&(B=v),A=G=1;A<=15;A++)if(G<<=1,(G-=Z[A])<0)return-1;if(0<G&&(h===0||O!==1))return-1;for(K[1]=0,A=1;A<15;A++)K[A+1]=K[A]+Z[A];for(N=0;N<u;N++)l[p+N]!==0&&(g[K[l[p+N]]++]=N);if(M=h===0?(R=ft=g,19):h===1?(R=i,it-=257,ft=s,Tt-=257,256):(R=o,ft=a,-1),A=v,b=m,nt=N=C=0,y=-1,w=(J=1<<(U=B))-1,h===1&&852<J||h===2&&592<J)return 1;for(;;){for(L=A-nt,T=g[N]<M?(I=0,g[N]):g[N]>M?(I=ft[Tt+g[N]],R[it+g[N]]):(I=96,0),d=1<<A-nt,v=_=1<<U;f[b+(C>>nt)+(_-=d)]=L<<24|I<<16|T|0,_!==0;);for(d=1<<A-1;C&d;)d>>=1;if(d!==0?(C&=d-1,C+=d):C=0,N++,--Z[A]==0){if(A===O)break;A=l[p+g[N]]}if(B<A&&(C&w)!==y){for(nt===0&&(nt=B),b+=v,G=1<<(U=A-nt);U+nt<O&&!((G-=Z[U+nt])<=0);)U++,G<<=1;if(J+=1<<U,h===1&&852<J||h===2&&592<J)return 1;f[y=C&w]=B<<24|U<<16|b-m|0}}return C!==0&&(f[b+C]=A-nt<<24|64<<16|0),c.bits=B,0}},{"../utils/common":41}],51:[function(r,t,e){"use strict";t.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],52:[function(r,t,e){"use strict";var n=r("../utils/common"),i=0,s=1;function o(P){for(var V=P.length;0<=--V;)P[V]=0}var a=0,h=29,l=256,p=l+1+h,u=30,f=19,m=2*p+1,g=15,c=16,d=7,_=256,y=16,w=17,b=18,M=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],L=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],I=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],T=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],z=new Array(2*(p+2));o(z);var A=new Array(2*u);o(A);var N=new Array(512);o(N);var v=new Array(256);o(v);var O=new Array(h);o(O);var B,U,nt,G=new Array(u);function J(P,V,rt,st,q){this.static_tree=P,this.extra_bits=V,this.extra_base=rt,this.elems=st,this.max_length=q,this.has_stree=P&&P.length}function C(P,V){this.dyn_tree=P,this.max_code=0,this.stat_desc=V}function R(P){return P<256?N[P]:N[256+(P>>>7)]}function it(P,V){P.pending_buf[P.pending++]=255&V,P.pending_buf[P.pending++]=V>>>8&255}function Z(P,V,rt){P.bi_valid>c-rt?(P.bi_buf|=V<<P.bi_valid&65535,it(P,P.bi_buf),P.bi_buf=V>>c-P.bi_valid,P.bi_valid+=rt-c):(P.bi_buf|=V<<P.bi_valid&65535,P.bi_valid+=rt)}function K(P,V,rt){Z(P,rt[2*V],rt[2*V+1])}function ft(P,V){for(var rt=0;rt|=1&P,P>>>=1,rt<<=1,0<--V;);return rt>>>1}function Tt(P,V,rt){var st,q,ut=new Array(g+1),E=0;for(st=1;st<=g;st++)ut[st]=E=E+rt[st-1]<<1;for(q=0;q<=V;q++){var S=P[2*q+1];S!==0&&(P[2*q]=ft(ut[S]++,S))}}function et(P){var V;for(V=0;V<p;V++)P.dyn_ltree[2*V]=0;for(V=0;V<u;V++)P.dyn_dtree[2*V]=0;for(V=0;V<f;V++)P.bl_tree[2*V]=0;P.dyn_ltree[2*_]=1,P.opt_len=P.static_len=0,P.last_lit=P.matches=0}function At(P){8<P.bi_valid?it(P,P.bi_buf):0<P.bi_valid&&(P.pending_buf[P.pending++]=P.bi_buf),P.bi_buf=0,P.bi_valid=0}function Mt(P,V,rt,st){var q=2*V,ut=2*rt;return P[q]<P[ut]||P[q]===P[ut]&&st[V]<=st[rt]}function bt(P,V,rt){for(var st=P.heap[rt],q=rt<<1;q<=P.heap_len&&(q<P.heap_len&&Mt(V,P.heap[q+1],P.heap[q],P.depth)&&q++,!Mt(V,st,P.heap[q],P.depth));)P.heap[rt]=P.heap[q],rt=q,q<<=1;P.heap[rt]=st}function xt(P,V,rt){var st,q,ut,E,S=0;if(P.last_lit!==0)for(;st=P.pending_buf[P.d_buf+2*S]<<8|P.pending_buf[P.d_buf+2*S+1],q=P.pending_buf[P.l_buf+S],S++,st===0?K(P,q,V):(K(P,(ut=v[q])+l+1,V),(E=M[ut])!==0&&Z(P,q-=O[ut],E),K(P,ut=R(--st),rt),(E=L[ut])!==0&&Z(P,st-=G[ut],E)),S<P.last_lit;);K(P,_,V)}function Dt(P,V){var rt,st,q,ut=V.dyn_tree,E=V.stat_desc.static_tree,S=V.stat_desc.has_stree,H=V.stat_desc.elems,ot=-1;for(P.heap_len=0,P.heap_max=m,rt=0;rt<H;rt++)ut[2*rt]!==0?(P.heap[++P.heap_len]=ot=rt,P.depth[rt]=0):ut[2*rt+1]=0;for(;P.heap_len<2;)ut[2*(q=P.heap[++P.heap_len]=ot<2?++ot:0)]=1,P.depth[q]=0,P.opt_len--,S&&(P.static_len-=E[2*q+1]);for(V.max_code=ot,rt=P.heap_len>>1;1<=rt;rt--)bt(P,ut,rt);for(q=H;rt=P.heap[1],P.heap[1]=P.heap[P.heap_len--],bt(P,ut,1),st=P.heap[1],P.heap[--P.heap_max]=rt,P.heap[--P.heap_max]=st,ut[2*q]=ut[2*rt]+ut[2*st],P.depth[q]=(P.depth[rt]>=P.depth[st]?P.depth[rt]:P.depth[st])+1,ut[2*rt+1]=ut[2*st+1]=q,P.heap[1]=q++,bt(P,ut,1),2<=P.heap_len;);P.heap[--P.heap_max]=P.heap[1],function(ht,pt){var Et,F,Y,dt,wt,yt,St=pt.dyn_tree,Rt=pt.max_code,Nt=pt.stat_desc.static_tree,W=pt.stat_desc.has_stree,vt=pt.stat_desc.extra_bits,mt=pt.stat_desc.extra_base,lt=pt.stat_desc.max_length,gt=0;for(dt=0;dt<=g;dt++)ht.bl_count[dt]=0;for(St[2*ht.heap[ht.heap_max]+1]=0,Et=ht.heap_max+1;Et<m;Et++)lt<(dt=St[2*St[2*(F=ht.heap[Et])+1]+1]+1)&&(dt=lt,gt++),St[2*F+1]=dt,Rt<F||(ht.bl_count[dt]++,wt=0,mt<=F&&(wt=vt[F-mt]),yt=St[2*F],ht.opt_len+=yt*(dt+wt),W&&(ht.static_len+=yt*(Nt[2*F+1]+wt)));if(gt!==0){do{for(dt=lt-1;ht.bl_count[dt]===0;)dt--;ht.bl_count[dt]--,ht.bl_count[dt+1]+=2,ht.bl_count[lt]--,gt-=2}while(0<gt);for(dt=lt;dt!==0;dt--)for(F=ht.bl_count[dt];F!==0;)Rt<(Y=ht.heap[--Et])||(St[2*Y+1]!==dt&&(ht.opt_len+=(dt-St[2*Y+1])*St[2*Y],St[2*Y+1]=dt),F--)}}(P,V),Tt(ut,ot,P.bl_count)}function x(P,V,rt){var st,q,ut=-1,E=V[1],S=0,H=7,ot=4;for(E===0&&(H=138,ot=3),V[2*(rt+1)+1]=65535,st=0;st<=rt;st++)q=E,E=V[2*(st+1)+1],++S<H&&q===E||(S<ot?P.bl_tree[2*q]+=S:q!==0?(q!==ut&&P.bl_tree[2*q]++,P.bl_tree[2*y]++):S<=10?P.bl_tree[2*w]++:P.bl_tree[2*b]++,ut=q,ot=(S=0)===E?(H=138,3):q===E?(H=6,3):(H=7,4))}function X(P,V,rt){var st,q,ut=-1,E=V[1],S=0,H=7,ot=4;for(E===0&&(H=138,ot=3),st=0;st<=rt;st++)if(q=E,E=V[2*(st+1)+1],!(++S<H&&q===E)){if(S<ot)for(;K(P,q,P.bl_tree),--S!=0;);else q!==0?(q!==ut&&(K(P,q,P.bl_tree),S--),K(P,y,P.bl_tree),Z(P,S-3,2)):S<=10?(K(P,w,P.bl_tree),Z(P,S-3,3)):(K(P,b,P.bl_tree),Z(P,S-11,7));ut=q,ot=(S=0)===E?(H=138,3):q===E?(H=6,3):(H=7,4)}}o(G);var Q=!1;function k(P,V,rt,st){Z(P,(a<<1)+(st?1:0),3),function(q,ut,E,S){At(q),S&&(it(q,E),it(q,~E)),n.arraySet(q.pending_buf,q.window,ut,E,q.pending),q.pending+=E}(P,V,rt,!0)}e._tr_init=function(P){Q||(function(){var V,rt,st,q,ut,E=new Array(g+1);for(q=st=0;q<h-1;q++)for(O[q]=st,V=0;V<1<<M[q];V++)v[st++]=q;for(v[st-1]=q,q=ut=0;q<16;q++)for(G[q]=ut,V=0;V<1<<L[q];V++)N[ut++]=q;for(ut>>=7;q<u;q++)for(G[q]=ut<<7,V=0;V<1<<L[q]-7;V++)N[256+ut++]=q;for(rt=0;rt<=g;rt++)E[rt]=0;for(V=0;V<=143;)z[2*V+1]=8,V++,E[8]++;for(;V<=255;)z[2*V+1]=9,V++,E[9]++;for(;V<=279;)z[2*V+1]=7,V++,E[7]++;for(;V<=287;)z[2*V+1]=8,V++,E[8]++;for(Tt(z,p+1,E),V=0;V<u;V++)A[2*V+1]=5,A[2*V]=ft(V,5);B=new J(z,M,l+1,p,g),U=new J(A,L,0,u,g),nt=new J(new Array(0),I,0,f,d)}(),Q=!0),P.l_desc=new C(P.dyn_ltree,B),P.d_desc=new C(P.dyn_dtree,U),P.bl_desc=new C(P.bl_tree,nt),P.bi_buf=0,P.bi_valid=0,et(P)},e._tr_stored_block=k,e._tr_flush_block=function(P,V,rt,st){var q,ut,E=0;0<P.level?(P.strm.data_type===2&&(P.strm.data_type=function(S){var H,ot=4093624447;for(H=0;H<=31;H++,ot>>>=1)if(1&ot&&S.dyn_ltree[2*H]!==0)return i;if(S.dyn_ltree[18]!==0||S.dyn_ltree[20]!==0||S.dyn_ltree[26]!==0)return s;for(H=32;H<l;H++)if(S.dyn_ltree[2*H]!==0)return s;return i}(P)),Dt(P,P.l_desc),Dt(P,P.d_desc),E=function(S){var H;for(x(S,S.dyn_ltree,S.l_desc.max_code),x(S,S.dyn_dtree,S.d_desc.max_code),Dt(S,S.bl_desc),H=f-1;3<=H&&S.bl_tree[2*T[H]+1]===0;H--);return S.opt_len+=3*(H+1)+5+5+4,H}(P),q=P.opt_len+3+7>>>3,(ut=P.static_len+3+7>>>3)<=q&&(q=ut)):q=ut=rt+5,rt+4<=q&&V!==-1?k(P,V,rt,st):P.strategy===4||ut===q?(Z(P,2+(st?1:0),3),xt(P,z,A)):(Z(P,4+(st?1:0),3),function(S,H,ot,ht){var pt;for(Z(S,H-257,5),Z(S,ot-1,5),Z(S,ht-4,4),pt=0;pt<ht;pt++)Z(S,S.bl_tree[2*T[pt]+1],3);X(S,S.dyn_ltree,H-1),X(S,S.dyn_dtree,ot-1)}(P,P.l_desc.max_code+1,P.d_desc.max_code+1,E+1),xt(P,P.dyn_ltree,P.dyn_dtree)),et(P),st&&At(P)},e._tr_tally=function(P,V,rt){return P.pending_buf[P.d_buf+2*P.last_lit]=V>>>8&255,P.pending_buf[P.d_buf+2*P.last_lit+1]=255&V,P.pending_buf[P.l_buf+P.last_lit]=255&rt,P.last_lit++,V===0?P.dyn_ltree[2*rt]++:(P.matches++,V--,P.dyn_ltree[2*(v[rt]+l+1)]++,P.dyn_dtree[2*R(V)]++),P.last_lit===P.lit_bufsize-1},e._tr_align=function(P){Z(P,2,3),K(P,_,z),function(V){V.bi_valid===16?(it(V,V.bi_buf),V.bi_buf=0,V.bi_valid=0):8<=V.bi_valid&&(V.pending_buf[V.pending++]=255&V.bi_buf,V.bi_buf>>=8,V.bi_valid-=8)}(P)}},{"../utils/common":41}],53:[function(r,t,e){"use strict";t.exports=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}},{}],54:[function(r,t,e){(function(n){(function(i,s){"use strict";if(!i.setImmediate){var o,a,h,l,p=1,u={},f=!1,m=i.document,g=Object.getPrototypeOf&&Object.getPrototypeOf(i);g=g&&g.setTimeout?g:i,o={}.toString.call(i.process)==="[object process]"?function(y){process.nextTick(function(){d(y)})}:function(){if(i.postMessage&&!i.importScripts){var y=!0,w=i.onmessage;return i.onmessage=function(){y=!1},i.postMessage("","*"),i.onmessage=w,y}}()?(l="setImmediate$"+Math.random()+"$",i.addEventListener?i.addEventListener("message",_,!1):i.attachEvent("onmessage",_),function(y){i.postMessage(l+y,"*")}):i.MessageChannel?((h=new MessageChannel).port1.onmessage=function(y){d(y.data)},function(y){h.port2.postMessage(y)}):m&&"onreadystatechange"in m.createElement("script")?(a=m.documentElement,function(y){var w=m.createElement("script");w.onreadystatechange=function(){d(y),w.onreadystatechange=null,a.removeChild(w),w=null},a.appendChild(w)}):function(y){setTimeout(d,0,y)},g.setImmediate=function(y){typeof y!="function"&&(y=new Function(""+y));for(var w=new Array(arguments.length-1),b=0;b<w.length;b++)w[b]=arguments[b+1];var M={callback:y,args:w};return u[p]=M,o(p),p++},g.clearImmediate=c}function c(y){delete u[y]}function d(y){if(f)setTimeout(d,0,y);else{var w=u[y];if(w){f=!0;try{(function(b){var M=b.callback,L=b.args;switch(L.length){case 0:M();break;case 1:M(L[0]);break;case 2:M(L[0],L[1]);break;case 3:M(L[0],L[1],L[2]);break;default:M.apply(s,L)}})(w)}finally{c(y),f=!1}}}}function _(y){y.source===i&&typeof y.data=="string"&&y.data.indexOf(l)===0&&d(+y.data.slice(l.length))}})(typeof self>"u"?n===void 0?this:n:self)}).call(this,typeof global<"u"?global:typeof self<"u"?self:typeof window<"u"?window:{})},{}]},{},[10])(10)})});function Ai(r,t,e,n){let i=n,s=0,o=0;for(t=Math.floor(t),e=Math.floor(e),r.rect(t-i,e,n<<1,1);i>s;)o-=--i-++s,o<0&&(o+=i++),r.rect(t-s,e-i,s<<1,1),r.rect(t-i,e-s,i<<1,1),r.rect(t-i,e+s,i<<1,1),r.rect(t-s,e+i,s<<1,1)}function Vo(r,t,e,n=1){t=[Math.floor(t[0]),Math.floor(t[1])],e=[Math.floor(e[0]),Math.floor(e[1])];let i=[Math.min(t[0],e[0])-n,Math.min(t[1],e[1])-n],s=[Math.max(t[0],e[0])+n,Math.max(t[1],e[1])+n],o=s[0]-i[0]+1,a=s[1]-i[1]+1;if(o==0||a==0)return;let h=r.getImageData(i[0],i[1],o,a),l=[parseInt(r.fillStyle.substring(1,3),16),parseInt(r.fillStyle.substring(3,5),16),parseInt(r.fillStyle.substring(5,7),16),r.globalCompositeOperation=="source-over"?255:0];function p(b,M){h.data[(b[1]*o+b[0])*4+0]=M[0],h.data[(b[1]*o+b[0])*4+1]=M[1],h.data[(b[1]*o+b[0])*4+2]=M[2],h.data[(b[1]*o+b[0])*4+3]=M[3]}let[u,f]=[t[0]-i[0],t[1]-i[1]],[m,g]=[e[0]-i[0],e[1]-i[1]],c=Math.abs(m-u),d=u<m?1:-1,_=-Math.abs(g-f),y=f<g?1:-1,w=c+_;for(;;){for(let M=-n;M<=n;M++)p([u+M,f],l),p([u,f+M],l);if(u==m&&f==g)break;let b=2*w;b>=_&&(w+=_,u+=d),b<=c&&(w+=c,f+=y)}r.putImageData(h,i[0],i[1])}function ws(r,t,e,n,i=!1){n=Math.floor(n),Vo(r,t,e,n);let[s,o]=t,[a,h]=e;if(r.beginPath(),!i)Ai(r,s,o,n),Ai(r,a,h,n);else{let l=n;r.rect(Math.floor(s)-l,Math.floor(o)-l,l*2,l*2),r.rect(Math.floor(a)-l,Math.floor(h)-l,l*2,l*2)}r.fill()}var Dr="145",Rn={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Pn={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Wo=0,qr=1,Ho=2;var ao=1,Go=2,_i=3,ei=0,Te=1,Fe=2,hn=0,Kn=1,Zr=2,Yr=3,Jr=4,Xo=5,Jn=100,qo=101,Zo=102,jr=103,$r=104,Yo=200,Jo=201,jo=202,$o=203,oo=204,lo=205,Ko=206,Qo=207,tl=208,el=209,nl=210,il=0,sl=1,rl=2,er=3,al=4,ol=5,ll=6,cl=7,co=0,hl=1,ul=2,Ie=0,dl=1,fl=2,pl=3,ml=4,gl=5,ho=300,ni=301,ii=302,nr=303,ir=304,cs=306,sr=1e3,ue=1001,rr=1002,jt=1003,Kr=1004;var Qr=1005;var Se=1006,_l=1007;var hs=1008;var Mn=1009,xl=1010,vl=1011,uo=1012,yl=1013,vn=1014,Ue=1015,yi=1016,bl=1017,wl=1018,Qn=1020,Ml=1021,Sl=1022,ve=1023,Tl=1024,Al=1025,bn=1026,si=1027,El=1028,Cl=1029,Rl=1030,Pl=1031,Ll=1033,Ms=33776,Ss=33777,Ts=33778,As=33779,ta=35840,ea=35841,na=35842,ia=35843,Il=36196,sa=37492,ra=37496,aa=37808,oa=37809,la=37810,ca=37811,ha=37812,ua=37813,da=37814,fa=37815,pa=37816,ma=37817,ga=37818,_a=37819,xa=37820,va=37821,ya=36492;var ji=2300,$i=2301,Es=2302,ba=2400,wa=2401,Ma=2402;var je=3e3,Yt=3001,Dl=3200,zl=3201,kl=0,Ol=1;var Ze="srgb",yn="srgb-linear";var Cs=7680;var Nl=519,Sa=35044;var Ta="300 es",ar=1035,Be=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let i=this._listeners[t];if(i!==void 0){let s=i.indexOf(e);s!==-1&&i.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let n=this._listeners[t.type];if(n!==void 0){t.target=this;let i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,t);t.target=null}}},re=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Rs=Math.PI/180,Aa=180/Math.PI;function Si(){let r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(re[r&255]+re[r>>8&255]+re[r>>16&255]+re[r>>24&255]+"-"+re[t&255]+re[t>>8&255]+"-"+re[t>>16&15|64]+re[t>>24&255]+"-"+re[e&63|128]+re[e>>8&255]+"-"+re[e>>16&255]+re[e>>24&255]+re[n&255]+re[n>>8&255]+re[n>>16&255]+re[n>>24&255]).toLowerCase()}function he(r,t,e){return Math.max(t,Math.min(e,r))}function Fl(r,t){return(r%t+t)%t}function Ps(r,t,e){return(1-e)*r+e*t}function Ea(r){return(r&r-1)===0&&r!==0}function or(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function Ei(r,t){switch(t.constructor){case Float32Array:return r;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function ge(r,t){switch(t.constructor){case Float32Array:return r;case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}var zt=class{constructor(t=0,e=0){zt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),i=Math.sin(e),s=this.x-t.x,o=this.y-t.y;return this.x=s*n-o*i+t.x,this.y=s*i+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},de=class{constructor(){de.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1]}set(t,e,n,i,s,o,a,h,l){let p=this.elements;return p[0]=t,p[1]=i,p[2]=a,p[3]=e,p[4]=s,p[5]=h,p[6]=n,p[7]=o,p[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,s=this.elements,o=n[0],a=n[3],h=n[6],l=n[1],p=n[4],u=n[7],f=n[2],m=n[5],g=n[8],c=i[0],d=i[3],_=i[6],y=i[1],w=i[4],b=i[7],M=i[2],L=i[5],I=i[8];return s[0]=o*c+a*y+h*M,s[3]=o*d+a*w+h*L,s[6]=o*_+a*b+h*I,s[1]=l*c+p*y+u*M,s[4]=l*d+p*w+u*L,s[7]=l*_+p*b+u*I,s[2]=f*c+m*y+g*M,s[5]=f*d+m*w+g*L,s[8]=f*_+m*b+g*I,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],h=t[6],l=t[7],p=t[8];return e*o*p-e*a*l-n*s*p+n*a*h+i*s*l-i*o*h}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],h=t[6],l=t[7],p=t[8],u=p*o-a*l,f=a*h-p*s,m=l*s-o*h,g=e*u+n*f+i*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let c=1/g;return t[0]=u*c,t[1]=(i*l-p*n)*c,t[2]=(a*n-i*o)*c,t[3]=f*c,t[4]=(p*e-i*h)*c,t[5]=(i*s-a*e)*c,t[6]=m*c,t[7]=(n*h-l*e)*c,t[8]=(o*e-n*s)*c,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,s,o,a){let h=Math.cos(s),l=Math.sin(s);return this.set(n*h,n*l,-n*(h*o+l*a)+o+t,-i*l,i*h,-i*(-l*o+h*a)+a+e,0,0,1),this}scale(t,e){let n=this.elements;return n[0]*=t,n[3]*=t,n[6]*=t,n[1]*=e,n[4]*=e,n[7]*=e,this}rotate(t){let e=Math.cos(t),n=Math.sin(t),i=this.elements,s=i[0],o=i[3],a=i[6],h=i[1],l=i[4],p=i[7];return i[0]=e*s+n*h,i[3]=e*o+n*l,i[6]=e*a+n*p,i[1]=-n*s+e*h,i[4]=-n*o+e*l,i[7]=-n*a+e*p,this}translate(t,e){let n=this.elements;return n[0]+=t*n[2],n[3]+=t*n[5],n[6]+=t*n[8],n[1]+=e*n[2],n[4]+=e*n[5],n[7]+=e*n[8],this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};function fo(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function Ki(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function wn(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Ji(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}var Ls={[Ze]:{[yn]:wn},[yn]:{[Ze]:Ji}},Ee={legacyMode:!0,get workingColorSpace(){return yn},set workingColorSpace(r){console.warn("THREE.ColorManagement: .workingColorSpace is readonly.")},convert:function(r,t,e){if(this.legacyMode||t===e||!t||!e)return r;if(Ls[t]&&Ls[t][e]!==void 0){let n=Ls[t][e];return r.r=n(r.r),r.g=n(r.g),r.b=n(r.b),r}throw new Error("Unsupported color space conversion.")},fromWorkingColorSpace:function(r,t){return this.convert(r,this.workingColorSpace,t)},toWorkingColorSpace:function(r,t){return this.convert(r,t,this.workingColorSpace)}},po={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Qt={r:0,g:0,b:0},Ce={h:0,s:0,l:0},Ci={h:0,s:0,l:0};function Is(r,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?r+(t-r)*6*e:e<1/2?t:e<2/3?r+(t-r)*6*(2/3-e):r}function Ri(r,t){return t.r=r.r,t.g=r.g,t.b=r.b,t}var Xt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,e===void 0&&n===void 0?this.set(t):this.setRGB(t,e,n)}set(t){return t&&t.isColor?this.copy(t):typeof t=="number"?this.setHex(t):typeof t=="string"&&this.setStyle(t),this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ze){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Ee.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=yn){return this.r=t,this.g=e,this.b=n,Ee.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=yn){if(t=Fl(t,1),e=he(e,0,1),n=he(n,0,1),e===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+e):n+e-n*e,o=2*n-s;this.r=Is(o,s,t+1/3),this.g=Is(o,s,t),this.b=Is(o,s,t-1/3)}return Ee.toWorkingColorSpace(this,i),this}setStyle(t,e=Ze){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^((?:rgb|hsl)a?)\(([^\)]*)\)/.exec(t)){let s,o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return this.r=Math.min(255,parseInt(s[1],10))/255,this.g=Math.min(255,parseInt(s[2],10))/255,this.b=Math.min(255,parseInt(s[3],10))/255,Ee.toWorkingColorSpace(this,e),n(s[4]),this;if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return this.r=Math.min(100,parseInt(s[1],10))/100,this.g=Math.min(100,parseInt(s[2],10))/100,this.b=Math.min(100,parseInt(s[3],10))/100,Ee.toWorkingColorSpace(this,e),n(s[4]),this;break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a)){let h=parseFloat(s[1])/360,l=parseFloat(s[2])/100,p=parseFloat(s[3])/100;return n(s[4]),this.setHSL(h,l,p,e)}break}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){let s=i[1],o=s.length;if(o===3)return this.r=parseInt(s.charAt(0)+s.charAt(0),16)/255,this.g=parseInt(s.charAt(1)+s.charAt(1),16)/255,this.b=parseInt(s.charAt(2)+s.charAt(2),16)/255,Ee.toWorkingColorSpace(this,e),this;if(o===6)return this.r=parseInt(s.charAt(0)+s.charAt(1),16)/255,this.g=parseInt(s.charAt(2)+s.charAt(3),16)/255,this.b=parseInt(s.charAt(4)+s.charAt(5),16)/255,Ee.toWorkingColorSpace(this,e),this}return t&&t.length>0?this.setColorName(t,e):this}setColorName(t,e=Ze){let n=po[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=wn(t.r),this.g=wn(t.g),this.b=wn(t.b),this}copyLinearToSRGB(t){return this.r=Ji(t.r),this.g=Ji(t.g),this.b=Ji(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ze){return Ee.fromWorkingColorSpace(Ri(this,Qt),t),he(Qt.r*255,0,255)<<16^he(Qt.g*255,0,255)<<8^he(Qt.b*255,0,255)<<0}getHexString(t=Ze){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=yn){Ee.fromWorkingColorSpace(Ri(this,Qt),e);let n=Qt.r,i=Qt.g,s=Qt.b,o=Math.max(n,i,s),a=Math.min(n,i,s),h,l,p=(a+o)/2;if(a===o)h=0,l=0;else{let u=o-a;switch(l=p<=.5?u/(o+a):u/(2-o-a),o){case n:h=(i-s)/u+(i<s?6:0);break;case i:h=(s-n)/u+2;break;case s:h=(n-i)/u+4;break}h/=6}return t.h=h,t.s=l,t.l=p,t}getRGB(t,e=yn){return Ee.fromWorkingColorSpace(Ri(this,Qt),e),t.r=Qt.r,t.g=Qt.g,t.b=Qt.b,t}getStyle(t=Ze){return Ee.fromWorkingColorSpace(Ri(this,Qt),t),t!==Ze?`color(${t} ${Qt.r} ${Qt.g} ${Qt.b})`:`rgb(${Qt.r*255|0},${Qt.g*255|0},${Qt.b*255|0})`}offsetHSL(t,e,n){return this.getHSL(Ce),Ce.h+=t,Ce.s+=e,Ce.l+=n,this.setHSL(Ce.h,Ce.s,Ce.l),this}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Ce),t.getHSL(Ci);let n=Ps(Ce.h,Ci.h,e),i=Ps(Ce.s,Ci.s,e),s=Ps(Ce.l,Ci.l,e);return this.setHSL(n,i,s),this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}};Xt.NAMES=po;var kn,Qi=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{kn===void 0&&(kn=Ki("canvas")),kn.width=t.width,kn.height=t.height;let n=kn.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=kn}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Ki("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let i=n.getImageData(0,0,t.width,t.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=wn(s[o]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(wn(e[n]/255)*255):e[n]=wn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},ts=class{constructor(t=null){this.isSource=!0,this.uuid=Si(),this.data=t,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(Ds(i[o].image)):s.push(Ds(i[o]))}else s=Ds(i);n.url=s}return e||(t.images[this.uuid]=n),n}};function Ds(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Qi.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Ul=0,pe=class extends Be{constructor(t=pe.DEFAULT_IMAGE,e=pe.DEFAULT_MAPPING,n=ue,i=ue,s=Se,o=hs,a=ve,h=Mn,l=1,p=je){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ul++}),this.uuid=Si(),this.name="",this.source=new ts(t),this.mipmaps=[],this.mapping=e,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=h,this.offset=new zt(0,0),this.repeat=new zt(1,1),this.center=new zt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new de,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.encoding=p,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.encoding=t.encoding,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.5,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,type:this.type,encoding:this.encoding,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return JSON.stringify(this.userData)!=="{}"&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==ho)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case sr:t.x=t.x-Math.floor(t.x);break;case ue:t.x=t.x<0?0:1;break;case rr:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case sr:t.y=t.y-Math.floor(t.y);break;case ue:t.y=t.y<0?0:1;break;case rr:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}};pe.DEFAULT_IMAGE=null;pe.DEFAULT_MAPPING=ho;var te=class{constructor(t=0,e=0,n=0,i=1){te.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,s=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*s,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,s,h=t.elements,l=h[0],p=h[4],u=h[8],f=h[1],m=h[5],g=h[9],c=h[2],d=h[6],_=h[10];if(Math.abs(p-f)<.01&&Math.abs(u-c)<.01&&Math.abs(g-d)<.01){if(Math.abs(p+f)<.1&&Math.abs(u+c)<.1&&Math.abs(g+d)<.1&&Math.abs(l+m+_-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let w=(l+1)/2,b=(m+1)/2,M=(_+1)/2,L=(p+f)/4,I=(u+c)/4,T=(g+d)/4;return w>b&&w>M?w<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(w),i=L/n,s=I/n):b>M?b<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(b),n=L/i,s=T/i):M<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(M),n=I/s,i=T/s),this.set(n,i,s,e),this}let y=Math.sqrt((d-g)*(d-g)+(u-c)*(u-c)+(f-p)*(f-p));return Math.abs(y)<.001&&(y=1),this.x=(d-g)/y,this.y=(u-c)/y,this.z=(f-p)/y,this.w=Math.acos((l+m+_-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this.w=this.w<0?Math.ceil(this.w):Math.floor(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},De=class extends Be{constructor(t,e,n={}){super(),this.isWebGLRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new te(0,0,t,e),this.scissorTest=!1,this.viewport=new te(0,0,t,e);let i={width:t,height:e,depth:1};this.texture=new pe(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.encoding),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.internalFormat=n.internalFormat!==void 0?n.internalFormat:null,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:Se,this.depthBuffer=n.depthBuffer!==void 0?n.depthBuffer:!0,this.stencilBuffer=n.stencilBuffer!==void 0?n.stencilBuffer:!1,this.depthTexture=n.depthTexture!==void 0?n.depthTexture:null,this.samples=n.samples!==void 0?n.samples:0}setSize(t,e,n=1){(this.width!==t||this.height!==e||this.depth!==n)&&(this.width=t,this.height=e,this.depth=n,this.texture.image.width=t,this.texture.image.height=e,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.viewport.copy(t.viewport),this.texture=t.texture.clone(),this.texture.isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new ts(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},es=class extends pe{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=jt,this.minFilter=jt,this.wrapR=ue,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var lr=class extends pe{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=jt,this.minFilter=jt,this.wrapR=ue,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var ze=class{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,s,o,a){let h=n[i+0],l=n[i+1],p=n[i+2],u=n[i+3],f=s[o+0],m=s[o+1],g=s[o+2],c=s[o+3];if(a===0){t[e+0]=h,t[e+1]=l,t[e+2]=p,t[e+3]=u;return}if(a===1){t[e+0]=f,t[e+1]=m,t[e+2]=g,t[e+3]=c;return}if(u!==c||h!==f||l!==m||p!==g){let d=1-a,_=h*f+l*m+p*g+u*c,y=_>=0?1:-1,w=1-_*_;if(w>Number.EPSILON){let M=Math.sqrt(w),L=Math.atan2(M,_*y);d=Math.sin(d*L)/M,a=Math.sin(a*L)/M}let b=a*y;if(h=h*d+f*b,l=l*d+m*b,p=p*d+g*b,u=u*d+c*b,d===1-a){let M=1/Math.sqrt(h*h+l*l+p*p+u*u);h*=M,l*=M,p*=M,u*=M}}t[e]=h,t[e+1]=l,t[e+2]=p,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,i,s,o){let a=n[i],h=n[i+1],l=n[i+2],p=n[i+3],u=s[o],f=s[o+1],m=s[o+2],g=s[o+3];return t[e]=a*g+p*u+h*m-l*f,t[e+1]=h*g+p*f+l*u-a*m,t[e+2]=l*g+p*m+a*f-h*u,t[e+3]=p*g-a*u-h*f-l*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e){let n=t._x,i=t._y,s=t._z,o=t._order,a=Math.cos,h=Math.sin,l=a(n/2),p=a(i/2),u=a(s/2),f=h(n/2),m=h(i/2),g=h(s/2);switch(o){case"XYZ":this._x=f*p*u+l*m*g,this._y=l*m*u-f*p*g,this._z=l*p*g+f*m*u,this._w=l*p*u-f*m*g;break;case"YXZ":this._x=f*p*u+l*m*g,this._y=l*m*u-f*p*g,this._z=l*p*g-f*m*u,this._w=l*p*u+f*m*g;break;case"ZXY":this._x=f*p*u-l*m*g,this._y=l*m*u+f*p*g,this._z=l*p*g+f*m*u,this._w=l*p*u-f*m*g;break;case"ZYX":this._x=f*p*u-l*m*g,this._y=l*m*u+f*p*g,this._z=l*p*g-f*m*u,this._w=l*p*u+f*m*g;break;case"YZX":this._x=f*p*u+l*m*g,this._y=l*m*u+f*p*g,this._z=l*p*g-f*m*u,this._w=l*p*u-f*m*g;break;case"XZY":this._x=f*p*u-l*m*g,this._y=l*m*u-f*p*g,this._z=l*p*g+f*m*u,this._w=l*p*u+f*m*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e!==!1&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],i=e[4],s=e[8],o=e[1],a=e[5],h=e[9],l=e[2],p=e[6],u=e[10],f=n+a+u;if(f>0){let m=.5/Math.sqrt(f+1);this._w=.25/m,this._x=(p-h)*m,this._y=(s-l)*m,this._z=(o-i)*m}else if(n>a&&n>u){let m=2*Math.sqrt(1+n-a-u);this._w=(p-h)/m,this._x=.25*m,this._y=(i+o)/m,this._z=(s+l)/m}else if(a>u){let m=2*Math.sqrt(1+a-n-u);this._w=(s-l)/m,this._x=(i+o)/m,this._y=.25*m,this._z=(h+p)/m}else{let m=2*Math.sqrt(1+u-n-a);this._w=(o-i)/m,this._x=(s+l)/m,this._y=(h+p)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(he(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,i=t._y,s=t._z,o=t._w,a=e._x,h=e._y,l=e._z,p=e._w;return this._x=n*p+o*a+i*l-s*h,this._y=i*p+o*h+s*a-n*l,this._z=s*p+o*l+n*h-i*a,this._w=o*p-n*a-i*h-s*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,i=this._y,s=this._z,o=this._w,a=o*t._w+n*t._x+i*t._y+s*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=i,this._z=s,this;let h=1-a*a;if(h<=Number.EPSILON){let m=1-e;return this._w=m*o+e*this._w,this._x=m*n+e*this._x,this._y=m*i+e*this._y,this._z=m*s+e*this._z,this.normalize(),this._onChangeCallback(),this}let l=Math.sqrt(h),p=Math.atan2(l,a),u=Math.sin((1-e)*p)/l,f=Math.sin(e*p)/l;return this._w=o*u+this._w*f,this._x=n*u+this._x*f,this._y=i*u+this._y*f,this._z=s*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=Math.random(),e=Math.sqrt(1-t),n=Math.sqrt(t),i=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(e*Math.cos(i),n*Math.sin(s),n*Math.cos(s),e*Math.sin(i))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},$=class{constructor(t=0,e=0,n=0){$.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Ca.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Ca.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*i,this.y=s[1]*e+s[4]*n+s[7]*i,this.z=s[2]*e+s[5]*n+s[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,s=t.elements,o=1/(s[3]*e+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*e+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*e+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,i=this.z,s=t.x,o=t.y,a=t.z,h=t.w,l=h*e+o*i-a*n,p=h*n+a*e-s*i,u=h*i+s*n-o*e,f=-s*e-o*n-a*i;return this.x=l*h+f*-s+p*-a-u*-o,this.y=p*h+f*-o+u*-s-l*-a,this.z=u*h+f*-a+l*-o-p*-s,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*i,this.y=s[1]*e+s[5]*n+s[9]*i,this.z=s[2]*e+s[6]*n+s[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,i=t.y,s=t.z,o=e.x,a=e.y,h=e.z;return this.x=i*h-s*a,this.y=s*o-n*h,this.z=n*a-i*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return zs.copy(this).projectOnVector(t),this.sub(zs)}reflect(t){return this.sub(zs.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(he(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=(Math.random()-.5)*2,e=Math.random()*Math.PI*2,n=Math.sqrt(1-t**2);return this.x=n*Math.cos(e),this.y=n*Math.sin(e),this.z=t,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},zs=new $,Ca=new ze,Sn=class{constructor(t=new $(1/0,1/0,1/0),e=new $(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){let e=1/0,n=1/0,i=1/0,s=-1/0,o=-1/0,a=-1/0;for(let h=0,l=t.length;h<l;h+=3){let p=t[h],u=t[h+1],f=t[h+2];p<e&&(e=p),u<n&&(n=u),f<i&&(i=f),p>s&&(s=p),u>o&&(o=u),f>a&&(a=f)}return this.min.set(e,n,i),this.max.set(s,o,a),this}setFromBufferAttribute(t){let e=1/0,n=1/0,i=1/0,s=-1/0,o=-1/0,a=-1/0;for(let h=0,l=t.count;h<l;h++){let p=t.getX(h),u=t.getY(h),f=t.getZ(h);p<e&&(e=p),u<n&&(n=u),f<i&&(i=f),p>s&&(s=p),u>o&&(o=u),f>a&&(a=f)}return this.min.set(e,n,i),this.max.set(s,o,a),this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=pn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0)if(e&&n.attributes!=null&&n.attributes.position!==void 0){let s=n.attributes.position;for(let o=0,a=s.count;o<a;o++)pn.fromBufferAttribute(s,o).applyMatrix4(t.matrixWorld),this.expandByPoint(pn)}else n.boundingBox===null&&n.computeBoundingBox(),ks.copy(n.boundingBox),ks.applyMatrix4(t.matrixWorld),this.union(ks);let i=t.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,pn),pn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(pi),Pi.subVectors(this.max,pi),On.subVectors(t.a,pi),Nn.subVectors(t.b,pi),Fn.subVectors(t.c,pi),en.subVectors(Nn,On),nn.subVectors(Fn,Nn),mn.subVectors(On,Fn);let e=[0,-en.z,en.y,0,-nn.z,nn.y,0,-mn.z,mn.y,en.z,0,-en.x,nn.z,0,-nn.x,mn.z,0,-mn.x,-en.y,en.x,0,-nn.y,nn.x,0,-mn.y,mn.x,0];return!Os(e,On,Nn,Fn,Pi)||(e=[1,0,0,0,1,0,0,0,1],!Os(e,On,Nn,Fn,Pi))?!1:(Li.crossVectors(en,nn),e=[Li.x,Li.y,Li.z],Os(e,On,Nn,Fn,Pi))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return pn.copy(t).clamp(this.min,this.max).sub(t).length()}getBoundingSphere(t){return this.getCenter(t.center),t.radius=this.getSize(pn).length()*.5,t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(We[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),We[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),We[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),We[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),We[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),We[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),We[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),We[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(We),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},We=[new $,new $,new $,new $,new $,new $,new $,new $],pn=new $,ks=new Sn,On=new $,Nn=new $,Fn=new $,en=new $,nn=new $,mn=new $,pi=new $,Pi=new $,Li=new $,gn=new $;function Os(r,t,e,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){gn.fromArray(r,s);let a=i.x*Math.abs(gn.x)+i.y*Math.abs(gn.y)+i.z*Math.abs(gn.z),h=t.dot(gn),l=e.dot(gn),p=n.dot(gn);if(Math.max(-Math.max(h,l,p),Math.min(h,l,p))>a)return!1}return!0}var Bl=new Sn,Ra=new $,Ii=new $,Ns=new $,bi=class{constructor(t=new $,e=-1){this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Bl.setFromPoints(t).getCenter(n);let i=0;for(let s=0,o=t.length;s<o;s++)i=Math.max(i,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ns.subVectors(t,this.center);let e=Ns.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.add(Ns.multiplyScalar(i/n)),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?Ii.set(0,0,1).multiplyScalar(t.radius):Ii.subVectors(t.center,this.center).normalize().multiplyScalar(t.radius),this.expandByPoint(Ra.copy(t.center).add(Ii)),this.expandByPoint(Ra.copy(t.center).sub(Ii)),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},He=new $,Fs=new $,Di=new $,sn=new $,Us=new $,zi=new $,Bs=new $,cr=class{constructor(t=new $,e=new $(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.direction).multiplyScalar(t).add(this.origin)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,He)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.direction).multiplyScalar(n).add(this.origin)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=He.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(He.copy(this.direction).multiplyScalar(e).add(this.origin),He.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){Fs.copy(t).add(e).multiplyScalar(.5),Di.copy(e).sub(t).normalize(),sn.copy(this.origin).sub(Fs);let s=t.distanceTo(e)*.5,o=-this.direction.dot(Di),a=sn.dot(this.direction),h=-sn.dot(Di),l=sn.lengthSq(),p=Math.abs(1-o*o),u,f,m,g;if(p>0)if(u=o*h-a,f=o*a-h,g=s*p,u>=0)if(f>=-g)if(f<=g){let c=1/p;u*=c,f*=c,m=u*(u+o*f+2*a)+f*(o*u+f+2*h)+l}else f=s,u=Math.max(0,-(o*f+a)),m=-u*u+f*(f+2*h)+l;else f=-s,u=Math.max(0,-(o*f+a)),m=-u*u+f*(f+2*h)+l;else f<=-g?(u=Math.max(0,-(-o*s+a)),f=u>0?-s:Math.min(Math.max(-s,-h),s),m=-u*u+f*(f+2*h)+l):f<=g?(u=0,f=Math.min(Math.max(-s,-h),s),m=f*(f+2*h)+l):(u=Math.max(0,-(o*s+a)),f=u>0?s:Math.min(Math.max(-s,-h),s),m=-u*u+f*(f+2*h)+l);else f=o>0?-s:s,u=Math.max(0,-(o*f+a)),m=-u*u+f*(f+2*h)+l;return n&&n.copy(this.direction).multiplyScalar(u).add(this.origin),i&&i.copy(Di).multiplyScalar(f).add(Fs),m}intersectSphere(t,e){He.subVectors(t.center,this.origin);let n=He.dot(this.direction),i=He.dot(He)-n*n,s=t.radius*t.radius;if(i>s)return null;let o=Math.sqrt(s-i),a=n-o,h=n+o;return a<0&&h<0?null:a<0?this.at(h,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,s,o,a,h,l=1/this.direction.x,p=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(n=(t.min.x-f.x)*l,i=(t.max.x-f.x)*l):(n=(t.max.x-f.x)*l,i=(t.min.x-f.x)*l),p>=0?(s=(t.min.y-f.y)*p,o=(t.max.y-f.y)*p):(s=(t.max.y-f.y)*p,o=(t.min.y-f.y)*p),n>o||s>i||((s>n||n!==n)&&(n=s),(o<i||i!==i)&&(i=o),u>=0?(a=(t.min.z-f.z)*u,h=(t.max.z-f.z)*u):(a=(t.max.z-f.z)*u,h=(t.min.z-f.z)*u),n>h||a>i)||((a>n||n!==n)&&(n=a),(h<i||i!==i)&&(i=h),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,He)!==null}intersectTriangle(t,e,n,i,s){Us.subVectors(e,t),zi.subVectors(n,t),Bs.crossVectors(Us,zi);let o=this.direction.dot(Bs),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;sn.subVectors(this.origin,t);let h=a*this.direction.dot(zi.crossVectors(sn,zi));if(h<0)return null;let l=a*this.direction.dot(Us.cross(sn));if(l<0||h+l>o)return null;let p=-a*sn.dot(Bs);return p<0?null:this.at(p/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ee=class{constructor(){ee.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}set(t,e,n,i,s,o,a,h,l,p,u,f,m,g,c,d){let _=this.elements;return _[0]=t,_[4]=e,_[8]=n,_[12]=i,_[1]=s,_[5]=o,_[9]=a,_[13]=h,_[2]=l,_[6]=p,_[10]=u,_[14]=f,_[3]=m,_[7]=g,_[11]=c,_[15]=d,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ee().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,i=1/Un.setFromMatrixColumn(t,0).length(),s=1/Un.setFromMatrixColumn(t,1).length(),o=1/Un.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,i=t.y,s=t.z,o=Math.cos(n),a=Math.sin(n),h=Math.cos(i),l=Math.sin(i),p=Math.cos(s),u=Math.sin(s);if(t.order==="XYZ"){let f=o*p,m=o*u,g=a*p,c=a*u;e[0]=h*p,e[4]=-h*u,e[8]=l,e[1]=m+g*l,e[5]=f-c*l,e[9]=-a*h,e[2]=c-f*l,e[6]=g+m*l,e[10]=o*h}else if(t.order==="YXZ"){let f=h*p,m=h*u,g=l*p,c=l*u;e[0]=f+c*a,e[4]=g*a-m,e[8]=o*l,e[1]=o*u,e[5]=o*p,e[9]=-a,e[2]=m*a-g,e[6]=c+f*a,e[10]=o*h}else if(t.order==="ZXY"){let f=h*p,m=h*u,g=l*p,c=l*u;e[0]=f-c*a,e[4]=-o*u,e[8]=g+m*a,e[1]=m+g*a,e[5]=o*p,e[9]=c-f*a,e[2]=-o*l,e[6]=a,e[10]=o*h}else if(t.order==="ZYX"){let f=o*p,m=o*u,g=a*p,c=a*u;e[0]=h*p,e[4]=g*l-m,e[8]=f*l+c,e[1]=h*u,e[5]=c*l+f,e[9]=m*l-g,e[2]=-l,e[6]=a*h,e[10]=o*h}else if(t.order==="YZX"){let f=o*h,m=o*l,g=a*h,c=a*l;e[0]=h*p,e[4]=c-f*u,e[8]=g*u+m,e[1]=u,e[5]=o*p,e[9]=-a*p,e[2]=-l*p,e[6]=m*u+g,e[10]=f-c*u}else if(t.order==="XZY"){let f=o*h,m=o*l,g=a*h,c=a*l;e[0]=h*p,e[4]=-u,e[8]=l*p,e[1]=f*u+c,e[5]=o*p,e[9]=m*u-g,e[2]=g*u-m,e[6]=a*p,e[10]=c*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Vl,t,Wl)}lookAt(t,e,n){let i=this.elements;return _e.subVectors(t,e),_e.lengthSq()===0&&(_e.z=1),_e.normalize(),rn.crossVectors(n,_e),rn.lengthSq()===0&&(Math.abs(n.z)===1?_e.x+=1e-4:_e.z+=1e-4,_e.normalize(),rn.crossVectors(n,_e)),rn.normalize(),ki.crossVectors(_e,rn),i[0]=rn.x,i[4]=ki.x,i[8]=_e.x,i[1]=rn.y,i[5]=ki.y,i[9]=_e.y,i[2]=rn.z,i[6]=ki.z,i[10]=_e.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,s=this.elements,o=n[0],a=n[4],h=n[8],l=n[12],p=n[1],u=n[5],f=n[9],m=n[13],g=n[2],c=n[6],d=n[10],_=n[14],y=n[3],w=n[7],b=n[11],M=n[15],L=i[0],I=i[4],T=i[8],z=i[12],A=i[1],N=i[5],v=i[9],O=i[13],B=i[2],U=i[6],nt=i[10],G=i[14],J=i[3],C=i[7],R=i[11],it=i[15];return s[0]=o*L+a*A+h*B+l*J,s[4]=o*I+a*N+h*U+l*C,s[8]=o*T+a*v+h*nt+l*R,s[12]=o*z+a*O+h*G+l*it,s[1]=p*L+u*A+f*B+m*J,s[5]=p*I+u*N+f*U+m*C,s[9]=p*T+u*v+f*nt+m*R,s[13]=p*z+u*O+f*G+m*it,s[2]=g*L+c*A+d*B+_*J,s[6]=g*I+c*N+d*U+_*C,s[10]=g*T+c*v+d*nt+_*R,s[14]=g*z+c*O+d*G+_*it,s[3]=y*L+w*A+b*B+M*J,s[7]=y*I+w*N+b*U+M*C,s[11]=y*T+w*v+b*nt+M*R,s[15]=y*z+w*O+b*G+M*it,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],i=t[8],s=t[12],o=t[1],a=t[5],h=t[9],l=t[13],p=t[2],u=t[6],f=t[10],m=t[14],g=t[3],c=t[7],d=t[11],_=t[15];return g*(+s*h*u-i*l*u-s*a*f+n*l*f+i*a*m-n*h*m)+c*(+e*h*m-e*l*f+s*o*f-i*o*m+i*l*p-s*h*p)+d*(+e*l*u-e*a*m-s*o*u+n*o*m+s*a*p-n*l*p)+_*(-i*a*p-e*h*u+e*a*f+i*o*u-n*o*f+n*h*p)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],h=t[6],l=t[7],p=t[8],u=t[9],f=t[10],m=t[11],g=t[12],c=t[13],d=t[14],_=t[15],y=u*d*l-c*f*l+c*h*m-a*d*m-u*h*_+a*f*_,w=g*f*l-p*d*l-g*h*m+o*d*m+p*h*_-o*f*_,b=p*c*l-g*u*l+g*a*m-o*c*m-p*a*_+o*u*_,M=g*u*h-p*c*h-g*a*f+o*c*f+p*a*d-o*u*d,L=e*y+n*w+i*b+s*M;if(L===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let I=1/L;return t[0]=y*I,t[1]=(c*f*s-u*d*s-c*i*m+n*d*m+u*i*_-n*f*_)*I,t[2]=(a*d*s-c*h*s+c*i*l-n*d*l-a*i*_+n*h*_)*I,t[3]=(u*h*s-a*f*s-u*i*l+n*f*l+a*i*m-n*h*m)*I,t[4]=w*I,t[5]=(p*d*s-g*f*s+g*i*m-e*d*m-p*i*_+e*f*_)*I,t[6]=(g*h*s-o*d*s-g*i*l+e*d*l+o*i*_-e*h*_)*I,t[7]=(o*f*s-p*h*s+p*i*l-e*f*l-o*i*m+e*h*m)*I,t[8]=b*I,t[9]=(g*u*s-p*c*s-g*n*m+e*c*m+p*n*_-e*u*_)*I,t[10]=(o*c*s-g*a*s+g*n*l-e*c*l-o*n*_+e*a*_)*I,t[11]=(p*a*s-o*u*s-p*n*l+e*u*l+o*n*m-e*a*m)*I,t[12]=M*I,t[13]=(p*c*i-g*u*i+g*n*f-e*c*f-p*n*d+e*u*d)*I,t[14]=(g*a*i-o*c*i-g*n*h+e*c*h+o*n*d-e*a*d)*I,t[15]=(o*u*i-p*a*i+p*n*h-e*u*h-o*n*f+e*a*f)*I,this}scale(t){let e=this.elements,n=t.x,i=t.y,s=t.z;return e[0]*=n,e[4]*=i,e[8]*=s,e[1]*=n,e[5]*=i,e[9]*=s,e[2]*=n,e[6]*=i,e[10]*=s,e[3]*=n,e[7]*=i,e[11]*=s,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),i=Math.sin(e),s=1-n,o=t.x,a=t.y,h=t.z,l=s*o,p=s*a;return this.set(l*o+n,l*a-i*h,l*h+i*a,0,l*a+i*h,p*a+n,p*h-i*o,0,l*h-i*a,p*h+i*o,s*h*h+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,s,o){return this.set(1,n,s,0,t,1,o,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){let i=this.elements,s=e._x,o=e._y,a=e._z,h=e._w,l=s+s,p=o+o,u=a+a,f=s*l,m=s*p,g=s*u,c=o*p,d=o*u,_=a*u,y=h*l,w=h*p,b=h*u,M=n.x,L=n.y,I=n.z;return i[0]=(1-(c+_))*M,i[1]=(m+b)*M,i[2]=(g-w)*M,i[3]=0,i[4]=(m-b)*L,i[5]=(1-(f+_))*L,i[6]=(d+y)*L,i[7]=0,i[8]=(g+w)*I,i[9]=(d-y)*I,i[10]=(1-(f+c))*I,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){let i=this.elements,s=Un.set(i[0],i[1],i[2]).length(),o=Un.set(i[4],i[5],i[6]).length(),a=Un.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),t.x=i[12],t.y=i[13],t.z=i[14],Re.copy(this);let l=1/s,p=1/o,u=1/a;return Re.elements[0]*=l,Re.elements[1]*=l,Re.elements[2]*=l,Re.elements[4]*=p,Re.elements[5]*=p,Re.elements[6]*=p,Re.elements[8]*=u,Re.elements[9]*=u,Re.elements[10]*=u,e.setFromRotationMatrix(Re),n.x=s,n.y=o,n.z=a,this}makePerspective(t,e,n,i,s,o){let a=this.elements,h=2*s/(e-t),l=2*s/(n-i),p=(e+t)/(e-t),u=(n+i)/(n-i),f=-(o+s)/(o-s),m=-2*o*s/(o-s);return a[0]=h,a[4]=0,a[8]=p,a[12]=0,a[1]=0,a[5]=l,a[9]=u,a[13]=0,a[2]=0,a[6]=0,a[10]=f,a[14]=m,a[3]=0,a[7]=0,a[11]=-1,a[15]=0,this}makeOrthographic(t,e,n,i,s,o){let a=this.elements,h=1/(e-t),l=1/(n-i),p=1/(o-s),u=(e+t)*h,f=(n+i)*l,m=(o+s)*p;return a[0]=2*h,a[4]=0,a[8]=0,a[12]=-u,a[1]=0,a[5]=2*l,a[9]=0,a[13]=-f,a[2]=0,a[6]=0,a[10]=-2*p,a[14]=-m,a[3]=0,a[7]=0,a[11]=0,a[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},Un=new $,Re=new ee,Vl=new $(0,0,0),Wl=new $(1,1,1),rn=new $,ki=new $,_e=new $,Pa=new ee,La=new ze,Tn=class{constructor(t=0,e=0,n=0,i=Tn.DefaultOrder){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let i=t.elements,s=i[0],o=i[4],a=i[8],h=i[1],l=i[5],p=i[9],u=i[2],f=i[6],m=i[10];switch(e){case"XYZ":this._y=Math.asin(he(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-p,m),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-he(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(a,m),this._z=Math.atan2(h,l)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(he(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,m),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(h,s));break;case"ZYX":this._y=Math.asin(-he(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,m),this._z=Math.atan2(h,s)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(he(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-p,l),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(a,m));break;case"XZY":this._z=Math.asin(-he(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-p,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Pa.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Pa,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return La.setFromEuler(this),this.setFromQuaternion(La,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}toVector3(){console.error("THREE.Euler: .toVector3() has been removed. Use Vector3.setFromEuler() instead")}};Tn.DefaultOrder="XYZ";Tn.RotationOrders=["XYZ","YZX","ZXY","XZY","YXZ","ZYX"];var ns=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Hl=0,Ia=new $,Bn=new ze,Ge=new ee,Oi=new $,mi=new $,Gl=new $,Xl=new ze,Da=new $(1,0,0),za=new $(0,1,0),ka=new $(0,0,1),ql={type:"added"},Oa={type:"removed"},ce=class extends Be{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Hl++}),this.uuid=Si(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ce.DefaultUp.clone();let t=new $,e=new Tn,n=new ze,i=new $(1,1,1);function s(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new ee},normalMatrix:{value:new de}}),this.matrix=new ee,this.matrixWorld=new ee,this.matrixAutoUpdate=ce.DefaultMatrixAutoUpdate,this.matrixWorldNeedsUpdate=!1,this.matrixWorldAutoUpdate=ce.DefaultMatrixWorldAutoUpdate,this.layers=new ns,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Bn.setFromAxisAngle(t,e),this.quaternion.multiply(Bn),this}rotateOnWorldAxis(t,e){return Bn.setFromAxisAngle(t,e),this.quaternion.premultiply(Bn),this}rotateX(t){return this.rotateOnAxis(Da,t)}rotateY(t){return this.rotateOnAxis(za,t)}rotateZ(t){return this.rotateOnAxis(ka,t)}translateOnAxis(t,e){return Ia.copy(t).applyQuaternion(this.quaternion),this.position.add(Ia.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Da,t)}translateY(t){return this.translateOnAxis(za,t)}translateZ(t){return this.translateOnAxis(ka,t)}localToWorld(t){return t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return t.applyMatrix4(Ge.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Oi.copy(t):Oi.set(t,e,n);let i=this.parent;this.updateWorldMatrix(!0,!1),mi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ge.lookAt(mi,Oi,this.up):Ge.lookAt(Oi,mi,this.up),this.quaternion.setFromRotationMatrix(Ge),i&&(Ge.extractRotation(i.matrixWorld),Bn.setFromRotationMatrix(Ge),this.quaternion.premultiply(Bn.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.parent!==null&&t.parent.remove(t),t.parent=this,this.children.push(t),t.dispatchEvent(ql)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Oa)),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){for(let t=0;t<this.children.length;t++){let e=this.children[t];e.parent=null,e.dispatchEvent(Oa)}return this.children.length=0,this}attach(t){return this.updateWorldMatrix(!0,!1),Ge.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Ge.multiply(t.parent.matrixWorld)),t.applyMatrix4(Ge),this.add(t),t.updateWorldMatrix(!1,!0),this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(mi,t,Gl),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(mi,Xl,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,i=e.length;n<i;n++){let s=e[n];(s.matrixWorldAutoUpdate===!0||t===!0)&&s.updateMatrixWorld(t)}}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){let i=this.children;for(let s=0,o=i.length;s<o;s++){let a=i[s];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.5,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),JSON.stringify(this.userData)!=="{}"&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON()));function s(a,h){return a[h.uuid]===void 0&&(a[h.uuid]=h.toJSON(t)),h.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let h=a.shapes;if(Array.isArray(h))for(let l=0,p=h.length;l<p;l++){let u=h[l];s(t.shapes,u)}else s(t.shapes,h)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let h=0,l=this.material.length;h<l;h++)a.push(s(t.materials,this.material[h]));i.material=a}else i.material=s(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){let h=this.animations[a];i.animations.push(s(t.animations,h))}}if(e){let a=o(t.geometries),h=o(t.materials),l=o(t.textures),p=o(t.images),u=o(t.shapes),f=o(t.skeletons),m=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),h.length>0&&(n.materials=h),l.length>0&&(n.textures=l),p.length>0&&(n.images=p),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),m.length>0&&(n.animations=m),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){let h=[];for(let l in a){let p=a[l];delete p.metadata,h.push(p)}return h}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let i=t.children[n];this.add(i.clone())}return this}};ce.DefaultUp=new $(0,1,0);ce.DefaultMatrixAutoUpdate=!0;ce.DefaultMatrixWorldAutoUpdate=!0;var Pe=new $,Xe=new $,Vs=new $,qe=new $,Vn=new $,Wn=new $,Na=new $,Ws=new $,Hs=new $,Gs=new $,Le=class{constructor(t=new $,e=new $,n=new $){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),Pe.subVectors(t,e),i.cross(Pe);let s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(t,e,n,i,s){Pe.subVectors(i,e),Xe.subVectors(n,e),Vs.subVectors(t,e);let o=Pe.dot(Pe),a=Pe.dot(Xe),h=Pe.dot(Vs),l=Xe.dot(Xe),p=Xe.dot(Vs),u=o*l-a*a;if(u===0)return s.set(-2,-1,-1);let f=1/u,m=(l*h-a*p)*f,g=(o*p-a*h)*f;return s.set(1-m-g,g,m)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,qe),qe.x>=0&&qe.y>=0&&qe.x+qe.y<=1}static getUV(t,e,n,i,s,o,a,h){return this.getBarycoord(t,e,n,i,qe),h.set(0,0),h.addScaledVector(s,qe.x),h.addScaledVector(o,qe.y),h.addScaledVector(a,qe.z),h}static isFrontFacing(t,e,n,i){return Pe.subVectors(n,e),Xe.subVectors(t,e),Pe.cross(Xe).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Pe.subVectors(this.c,this.b),Xe.subVectors(this.a,this.b),Pe.cross(Xe).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Le.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Le.getBarycoord(t,this.a,this.b,this.c,e)}getUV(t,e,n,i,s){return Le.getUV(t,this.a,this.b,this.c,e,n,i,s)}containsPoint(t){return Le.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Le.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,i=this.b,s=this.c,o,a;Vn.subVectors(i,n),Wn.subVectors(s,n),Ws.subVectors(t,n);let h=Vn.dot(Ws),l=Wn.dot(Ws);if(h<=0&&l<=0)return e.copy(n);Hs.subVectors(t,i);let p=Vn.dot(Hs),u=Wn.dot(Hs);if(p>=0&&u<=p)return e.copy(i);let f=h*u-p*l;if(f<=0&&h>=0&&p<=0)return o=h/(h-p),e.copy(n).addScaledVector(Vn,o);Gs.subVectors(t,s);let m=Vn.dot(Gs),g=Wn.dot(Gs);if(g>=0&&m<=g)return e.copy(s);let c=m*l-h*g;if(c<=0&&l>=0&&g<=0)return a=l/(l-g),e.copy(n).addScaledVector(Wn,a);let d=p*g-m*u;if(d<=0&&u-p>=0&&m-g>=0)return Na.subVectors(s,i),a=(u-p)/(u-p+(m-g)),e.copy(i).addScaledVector(Na,a);let _=1/(d+c+f);return o=c*_,a=f*_,e.copy(n).addScaledVector(Vn,o).addScaledVector(Wn,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Zl=0,ri=class extends Be{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Zl++}),this.uuid=Si(),this.name="",this.type="Material",this.blending=Kn,this.side=ei,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.blendSrc=oo,this.blendDst=lo,this.blendEquation=Jn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.depthFunc=er,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Nl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Cs,this.stencilZFail=Cs,this.stencilZPass=Cs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn("THREE.Material: '"+e+"' parameter is undefined.");continue}let i=this[e];if(i===void 0){console.warn("THREE."+this.type+": '"+e+"' is not a property of this material.");continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.5,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Kn&&(n.blending=this.blending),this.side!==ei&&(n.side=this.side),this.vertexColors&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=this.transparent),n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.stencilWrite=this.stencilWrite,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaToCoverage===!0&&(n.alphaToCoverage=this.alphaToCoverage),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=this.premultipliedAlpha),this.wireframe===!0&&(n.wireframe=this.wireframe),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=this.flatShading),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),JSON.stringify(this.userData)!=="{}"&&(n.userData=this.userData);function i(s){let o=[];for(let a in s){let h=s[a];delete h.metadata,o.push(h)}return o}if(e){let s=i(t.textures),o=i(t.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let i=e.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},is=class extends ri{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Xt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=co,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},Kt=new $,Ni=new zt,Ae=class{constructor(t,e,n){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n===!0,this.usage=Sa,this.updateRange={offset:0,count:-1},this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Ni.fromBufferAttribute(this,e),Ni.applyMatrix3(t),this.setXY(e,Ni.x,Ni.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Kt.fromBufferAttribute(this,e),Kt.applyMatrix3(t),this.setXYZ(e,Kt.x,Kt.y,Kt.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Kt.fromBufferAttribute(this,e),Kt.applyMatrix4(t),this.setXYZ(e,Kt.x,Kt.y,Kt.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Kt.fromBufferAttribute(this,e),Kt.applyNormalMatrix(t),this.setXYZ(e,Kt.x,Kt.y,Kt.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Kt.fromBufferAttribute(this,e),Kt.transformDirection(t),this.setXYZ(e,Kt.x,Kt.y,Kt.z);return this}set(t,e=0){return this.array.set(t,e),this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Ei(e,this.array)),e}setX(t,e){return this.normalized&&(e=ge(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Ei(e,this.array)),e}setY(t,e){return this.normalized&&(e=ge(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Ei(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ge(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Ei(e,this.array)),e}setW(t,e){return this.normalized&&(e=ge(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=ge(e,this.array),n=ge(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=ge(e,this.array),n=ge(n,this.array),i=ge(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t*=this.itemSize,this.normalized&&(e=ge(e,this.array),n=ge(n,this.array),i=ge(i,this.array),s=ge(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Sa&&(t.usage=this.usage),(this.updateRange.offset!==0||this.updateRange.count!==-1)&&(t.updateRange=this.updateRange),t}copyColorsArray(){console.error("THREE.BufferAttribute: copyColorsArray() was removed in r144.")}copyVector2sArray(){console.error("THREE.BufferAttribute: copyVector2sArray() was removed in r144.")}copyVector3sArray(){console.error("THREE.BufferAttribute: copyVector3sArray() was removed in r144.")}copyVector4sArray(){console.error("THREE.BufferAttribute: copyVector4sArray() was removed in r144.")}};var ss=class extends Ae{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var rs=class extends Ae{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var Je=class extends Ae{constructor(t,e,n){super(new Float32Array(t),e,n)}};var Yl=0,Me=new ee,Xs=new ce,Hn=new $,xe=new Sn,gi=new Sn,se=new $,$e=class extends Be{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Yl++}),this.uuid=Si(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(fo(t)?rs:ss)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new de().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Me.makeRotationFromQuaternion(t),this.applyMatrix4(Me),this}rotateX(t){return Me.makeRotationX(t),this.applyMatrix4(Me),this}rotateY(t){return Me.makeRotationY(t),this.applyMatrix4(Me),this}rotateZ(t){return Me.makeRotationZ(t),this.applyMatrix4(Me),this}translate(t,e,n){return Me.makeTranslation(t,e,n),this.applyMatrix4(Me),this}scale(t,e,n){return Me.makeScale(t,e,n),this.applyMatrix4(Me),this}lookAt(t){return Xs.lookAt(t),Xs.updateMatrix(),this.applyMatrix4(Xs.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Hn).negate(),this.translate(Hn.x,Hn.y,Hn.z),this}setFromPoints(t){let e=[];for(let n=0,i=t.length;n<i;n++){let s=t[n];e.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new Je(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Sn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new $(-1/0,-1/0,-1/0),new $(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){let s=e[n];xe.setFromBufferAttribute(s),this.morphTargetsRelative?(se.addVectors(this.boundingBox.min,xe.min),this.boundingBox.expandByPoint(se),se.addVectors(this.boundingBox.max,xe.max),this.boundingBox.expandByPoint(se)):(this.boundingBox.expandByPoint(xe.min),this.boundingBox.expandByPoint(xe.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new bi);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new $,1/0);return}if(t){let n=this.boundingSphere.center;if(xe.setFromBufferAttribute(t),e)for(let s=0,o=e.length;s<o;s++){let a=e[s];gi.setFromBufferAttribute(a),this.morphTargetsRelative?(se.addVectors(xe.min,gi.min),xe.expandByPoint(se),se.addVectors(xe.max,gi.max),xe.expandByPoint(se)):(xe.expandByPoint(gi.min),xe.expandByPoint(gi.max))}xe.getCenter(n);let i=0;for(let s=0,o=t.count;s<o;s++)se.fromBufferAttribute(t,s),i=Math.max(i,n.distanceToSquared(se));if(e)for(let s=0,o=e.length;s<o;s++){let a=e[s],h=this.morphTargetsRelative;for(let l=0,p=a.count;l<p;l++)se.fromBufferAttribute(a,l),h&&(Hn.fromBufferAttribute(t,l),se.add(Hn)),i=Math.max(i,n.distanceToSquared(se))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.array,i=e.position.array,s=e.normal.array,o=e.uv.array,a=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ae(new Float32Array(4*a),4));let h=this.getAttribute("tangent").array,l=[],p=[];for(let A=0;A<a;A++)l[A]=new $,p[A]=new $;let u=new $,f=new $,m=new $,g=new zt,c=new zt,d=new zt,_=new $,y=new $;function w(A,N,v){u.fromArray(i,A*3),f.fromArray(i,N*3),m.fromArray(i,v*3),g.fromArray(o,A*2),c.fromArray(o,N*2),d.fromArray(o,v*2),f.sub(u),m.sub(u),c.sub(g),d.sub(g);let O=1/(c.x*d.y-d.x*c.y);!isFinite(O)||(_.copy(f).multiplyScalar(d.y).addScaledVector(m,-c.y).multiplyScalar(O),y.copy(m).multiplyScalar(c.x).addScaledVector(f,-d.x).multiplyScalar(O),l[A].add(_),l[N].add(_),l[v].add(_),p[A].add(y),p[N].add(y),p[v].add(y))}let b=this.groups;b.length===0&&(b=[{start:0,count:n.length}]);for(let A=0,N=b.length;A<N;++A){let v=b[A],O=v.start,B=v.count;for(let U=O,nt=O+B;U<nt;U+=3)w(n[U+0],n[U+1],n[U+2])}let M=new $,L=new $,I=new $,T=new $;function z(A){I.fromArray(s,A*3),T.copy(I);let N=l[A];M.copy(N),M.sub(I.multiplyScalar(I.dot(N))).normalize(),L.crossVectors(T,N);let O=L.dot(p[A])<0?-1:1;h[A*4]=M.x,h[A*4+1]=M.y,h[A*4+2]=M.z,h[A*4+3]=O}for(let A=0,N=b.length;A<N;++A){let v=b[A],O=v.start,B=v.count;for(let U=O,nt=O+B;U<nt;U+=3)z(n[U+0]),z(n[U+1]),z(n[U+2])}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ae(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,m=n.count;f<m;f++)n.setXYZ(f,0,0,0);let i=new $,s=new $,o=new $,a=new $,h=new $,l=new $,p=new $,u=new $;if(t)for(let f=0,m=t.count;f<m;f+=3){let g=t.getX(f+0),c=t.getX(f+1),d=t.getX(f+2);i.fromBufferAttribute(e,g),s.fromBufferAttribute(e,c),o.fromBufferAttribute(e,d),p.subVectors(o,s),u.subVectors(i,s),p.cross(u),a.fromBufferAttribute(n,g),h.fromBufferAttribute(n,c),l.fromBufferAttribute(n,d),a.add(p),h.add(p),l.add(p),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(c,h.x,h.y,h.z),n.setXYZ(d,l.x,l.y,l.z)}else for(let f=0,m=e.count;f<m;f+=3)i.fromBufferAttribute(e,f+0),s.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),p.subVectors(o,s),u.subVectors(i,s),p.cross(u),n.setXYZ(f+0,p.x,p.y,p.z),n.setXYZ(f+1,p.x,p.y,p.z),n.setXYZ(f+2,p.x,p.y,p.z);this.normalizeNormals(),n.needsUpdate=!0}}merge(){return console.error("THREE.BufferGeometry.merge() has been removed. Use THREE.BufferGeometryUtils.mergeBufferGeometries() instead."),this}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)se.fromBufferAttribute(t,e),se.normalize(),t.setXYZ(e,se.x,se.y,se.z)}toNonIndexed(){function t(a,h){let l=a.array,p=a.itemSize,u=a.normalized,f=new l.constructor(h.length*p),m=0,g=0;for(let c=0,d=h.length;c<d;c++){a.isInterleavedBufferAttribute?m=h[c]*a.data.stride+a.offset:m=h[c]*p;for(let _=0;_<p;_++)f[g++]=l[m++]}return new Ae(f,p,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new $e,n=this.index.array,i=this.attributes;for(let a in i){let h=i[a],l=t(h,n);e.setAttribute(a,l)}let s=this.morphAttributes;for(let a in s){let h=[],l=s[a];for(let p=0,u=l.length;p<u;p++){let f=l[p],m=t(f,n);h.push(m)}e.morphAttributes[a]=h}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,h=o.length;a<h;a++){let l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){let t={metadata:{version:4.5,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let h=this.parameters;for(let l in h)h[l]!==void 0&&(t[l]=h[l]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let h in n){let l=n[h];t.data.attributes[h]=l.toJSON(t.data)}let i={},s=!1;for(let h in this.morphAttributes){let l=this.morphAttributes[h],p=[];for(let u=0,f=l.length;u<f;u++){let m=l[u];p.push(m.toJSON(t.data))}p.length>0&&(i[h]=p,s=!0)}s&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone(e));let i=t.attributes;for(let l in i){let p=i[l];this.setAttribute(l,p.clone(e))}let s=t.morphAttributes;for(let l in s){let p=[],u=s[l];for(let f=0,m=u.length;f<m;f++)p.push(u[f].clone(e));this.morphAttributes[l]=p}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let l=0,p=o.length;l<p;l++){let u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let h=t.boundingSphere;return h!==null&&(this.boundingSphere=h.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,t.parameters!==void 0&&(this.parameters=Object.assign({},t.parameters)),this}dispose(){this.dispatchEvent({type:"dispose"})}},Fa=new ee,Gn=new cr,qs=new bi,an=new $,on=new $,ln=new $,Zs=new $,Ys=new $,Js=new $,Fi=new $,Ui=new $,Bi=new $,Vi=new zt,Wi=new zt,Hi=new zt,js=new $,Gi=new $,fe=class extends ce{constructor(t=new $e,e=new is){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){let a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}raycast(t,e){let n=this.geometry,i=this.material,s=this.matrixWorld;if(i===void 0||(n.boundingSphere===null&&n.computeBoundingSphere(),qs.copy(n.boundingSphere),qs.applyMatrix4(s),t.ray.intersectsSphere(qs)===!1)||(Fa.copy(s).invert(),Gn.copy(t.ray).applyMatrix4(Fa),n.boundingBox!==null&&Gn.intersectsBox(n.boundingBox)===!1))return;let o,a=n.index,h=n.attributes.position,l=n.morphAttributes.position,p=n.morphTargetsRelative,u=n.attributes.uv,f=n.attributes.uv2,m=n.groups,g=n.drawRange;if(a!==null)if(Array.isArray(i))for(let c=0,d=m.length;c<d;c++){let _=m[c],y=i[_.materialIndex],w=Math.max(_.start,g.start),b=Math.min(a.count,Math.min(_.start+_.count,g.start+g.count));for(let M=w,L=b;M<L;M+=3){let I=a.getX(M),T=a.getX(M+1),z=a.getX(M+2);o=Xi(this,y,t,Gn,h,l,p,u,f,I,T,z),o&&(o.faceIndex=Math.floor(M/3),o.face.materialIndex=_.materialIndex,e.push(o))}}else{let c=Math.max(0,g.start),d=Math.min(a.count,g.start+g.count);for(let _=c,y=d;_<y;_+=3){let w=a.getX(_),b=a.getX(_+1),M=a.getX(_+2);o=Xi(this,i,t,Gn,h,l,p,u,f,w,b,M),o&&(o.faceIndex=Math.floor(_/3),e.push(o))}}else if(h!==void 0)if(Array.isArray(i))for(let c=0,d=m.length;c<d;c++){let _=m[c],y=i[_.materialIndex],w=Math.max(_.start,g.start),b=Math.min(h.count,Math.min(_.start+_.count,g.start+g.count));for(let M=w,L=b;M<L;M+=3){let I=M,T=M+1,z=M+2;o=Xi(this,y,t,Gn,h,l,p,u,f,I,T,z),o&&(o.faceIndex=Math.floor(M/3),o.face.materialIndex=_.materialIndex,e.push(o))}}else{let c=Math.max(0,g.start),d=Math.min(h.count,g.start+g.count);for(let _=c,y=d;_<y;_+=3){let w=_,b=_+1,M=_+2;o=Xi(this,i,t,Gn,h,l,p,u,f,w,b,M),o&&(o.faceIndex=Math.floor(_/3),e.push(o))}}}};function Jl(r,t,e,n,i,s,o,a){let h;if(t.side===Te?h=n.intersectTriangle(o,s,i,!0,a):h=n.intersectTriangle(i,s,o,t.side!==Fe,a),h===null)return null;Gi.copy(a),Gi.applyMatrix4(r.matrixWorld);let l=e.ray.origin.distanceTo(Gi);return l<e.near||l>e.far?null:{distance:l,point:Gi.clone(),object:r}}function Xi(r,t,e,n,i,s,o,a,h,l,p,u){an.fromBufferAttribute(i,l),on.fromBufferAttribute(i,p),ln.fromBufferAttribute(i,u);let f=r.morphTargetInfluences;if(s&&f){Fi.set(0,0,0),Ui.set(0,0,0),Bi.set(0,0,0);for(let g=0,c=s.length;g<c;g++){let d=f[g],_=s[g];d!==0&&(Zs.fromBufferAttribute(_,l),Ys.fromBufferAttribute(_,p),Js.fromBufferAttribute(_,u),o?(Fi.addScaledVector(Zs,d),Ui.addScaledVector(Ys,d),Bi.addScaledVector(Js,d)):(Fi.addScaledVector(Zs.sub(an),d),Ui.addScaledVector(Ys.sub(on),d),Bi.addScaledVector(Js.sub(ln),d)))}an.add(Fi),on.add(Ui),ln.add(Bi)}r.isSkinnedMesh&&(r.boneTransform(l,an),r.boneTransform(p,on),r.boneTransform(u,ln));let m=Jl(r,t,e,n,an,on,ln,js);if(m){a&&(Vi.fromBufferAttribute(a,l),Wi.fromBufferAttribute(a,p),Hi.fromBufferAttribute(a,u),m.uv=Le.getUV(js,an,on,ln,Vi,Wi,Hi,new zt)),h&&(Vi.fromBufferAttribute(h,l),Wi.fromBufferAttribute(h,p),Hi.fromBufferAttribute(h,u),m.uv2=Le.getUV(js,an,on,ln,Vi,Wi,Hi,new zt));let g={a:l,b:p,c:u,normal:new $,materialIndex:0};Le.getNormal(an,on,ln,g.normal),m.face=g}return m}var Ke=class extends $e{constructor(t=1,e=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};let a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);let h=[],l=[],p=[],u=[],f=0,m=0;g("z","y","x",-1,-1,n,e,t,o,s,0),g("z","y","x",1,-1,n,e,-t,o,s,1),g("x","z","y",1,1,t,n,e,i,o,2),g("x","z","y",1,-1,t,n,-e,i,o,3),g("x","y","z",1,-1,t,e,n,i,s,4),g("x","y","z",-1,-1,t,e,-n,i,s,5),this.setIndex(h),this.setAttribute("position",new Je(l,3)),this.setAttribute("normal",new Je(p,3)),this.setAttribute("uv",new Je(u,2));function g(c,d,_,y,w,b,M,L,I,T,z){let A=b/I,N=M/T,v=b/2,O=M/2,B=L/2,U=I+1,nt=T+1,G=0,J=0,C=new $;for(let R=0;R<nt;R++){let it=R*N-O;for(let Z=0;Z<U;Z++){let K=Z*A-v;C[c]=K*y,C[d]=it*w,C[_]=B,l.push(C.x,C.y,C.z),C[c]=0,C[d]=0,C[_]=L>0?1:-1,p.push(C.x,C.y,C.z),u.push(Z/I),u.push(1-R/T),G+=1}}for(let R=0;R<T;R++)for(let it=0;it<I;it++){let Z=f+it+U*R,K=f+it+U*(R+1),ft=f+(it+1)+U*(R+1),Tt=f+(it+1)+U*R;h.push(Z,K,Tt),h.push(K,ft,Tt),J+=6}a.addGroup(m,J,z),m+=J,f+=G}}static fromJSON(t){return new Ke(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function ai(r){let t={};for(let e in r){t[e]={};for(let n in r[e]){let i=r[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function ae(r){let t={};for(let e=0;e<r.length;e++){let n=ai(r[e]);for(let i in n)t[i]=n[i]}return t}function jl(r){let t=[];for(let e=0;e<r.length;e++)t.push(r[e].clone());return t}var $l={clone:ai,merge:ae},Kl=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ql=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,ye=class extends ri{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Kl,this.fragmentShader=Ql,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv2:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ai(t.uniforms),this.uniformsGroups=jl(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let i in this.uniforms){let o=this.uniforms[i].value;o&&o.isTexture?e.uniforms[i]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[i]={type:"m4",value:o.toArray()}:e.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},oi=class extends ce{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ee,this.projectionMatrix=new ee,this.projectionMatrixInverse=new ee}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(-e[8],-e[9],-e[10]).normalize()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},le=class extends oi{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Aa*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Rs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Aa*2*Math.atan(Math.tan(Rs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(t,e,n,i,s,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Rs*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,s=-.5*i,o=this.view;if(this.view!==null&&this.view.enabled){let h=o.fullWidth,l=o.fullHeight;s+=o.offsetX*i/h,e-=o.offsetY*n/l,i*=o.width/h,n*=o.height/l}let a=this.filmOffset;a!==0&&(s+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,e,e-n,t,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},Xn=90,qn=1,hr=class extends ce{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n;let i=new le(Xn,qn,t,e);i.layers=this.layers,i.up.set(0,-1,0),i.lookAt(new $(1,0,0)),this.add(i);let s=new le(Xn,qn,t,e);s.layers=this.layers,s.up.set(0,-1,0),s.lookAt(new $(-1,0,0)),this.add(s);let o=new le(Xn,qn,t,e);o.layers=this.layers,o.up.set(0,0,1),o.lookAt(new $(0,1,0)),this.add(o);let a=new le(Xn,qn,t,e);a.layers=this.layers,a.up.set(0,0,-1),a.lookAt(new $(0,-1,0)),this.add(a);let h=new le(Xn,qn,t,e);h.layers=this.layers,h.up.set(0,-1,0),h.lookAt(new $(0,0,1)),this.add(h);let l=new le(Xn,qn,t,e);l.layers=this.layers,l.up.set(0,-1,0),l.lookAt(new $(0,0,-1)),this.add(l)}update(t,e){this.parent===null&&this.updateMatrixWorld();let n=this.renderTarget,[i,s,o,a,h,l]=this.children,p=t.getRenderTarget(),u=t.toneMapping,f=t.xr.enabled;t.toneMapping=Ie,t.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0),t.render(e,i),t.setRenderTarget(n,1),t.render(e,s),t.setRenderTarget(n,2),t.render(e,o),t.setRenderTarget(n,3),t.render(e,a),t.setRenderTarget(n,4),t.render(e,h),n.texture.generateMipmaps=m,t.setRenderTarget(n,5),t.render(e,l),t.setRenderTarget(p),t.toneMapping=u,t.xr.enabled=f,n.texture.needsPMREMUpdate=!0}},as=class extends pe{constructor(t,e,n,i,s,o,a,h,l,p){t=t!==void 0?t:[],e=e!==void 0?e:ni,super(t,e,n,i,s,o,a,h,l,p),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},ur=class extends De{constructor(t,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new as(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.encoding),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Se}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.encoding=e.encoding,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new Ke(5,5,5),s=new ye({name:"CubemapFromEquirect",uniforms:ai(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Te,blending:hn});s.uniforms.tEquirect.value=e;let o=new fe(i,s),a=e.minFilter;return e.minFilter===hs&&(e.minFilter=Se),new hr(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,i){let s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,i);t.setRenderTarget(s)}},$s=new $,tc=new $,ec=new de,Ye=class{constructor(t=new $(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let i=$s.subVectors(n,e).cross(tc.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(this.normal).multiplyScalar(-this.distanceToPoint(t)).add(t)}intersectLine(t,e){let n=t.delta($s),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let s=-(t.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:e.copy(n).multiplyScalar(s).add(t.start)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||ec.getNormalMatrix(t),i=this.coplanarPoint($s).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},Zn=new bi,qi=new $,os=class{constructor(t=new Ye,e=new Ye,n=new Ye,i=new Ye,s=new Ye,o=new Ye){this.planes=[t,e,n,i,s,o]}set(t,e,n,i,s,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t){let e=this.planes,n=t.elements,i=n[0],s=n[1],o=n[2],a=n[3],h=n[4],l=n[5],p=n[6],u=n[7],f=n[8],m=n[9],g=n[10],c=n[11],d=n[12],_=n[13],y=n[14],w=n[15];return e[0].setComponents(a-i,u-h,c-f,w-d).normalize(),e[1].setComponents(a+i,u+h,c+f,w+d).normalize(),e[2].setComponents(a+s,u+l,c+m,w+_).normalize(),e[3].setComponents(a-s,u-l,c-m,w-_).normalize(),e[4].setComponents(a-o,u-p,c-g,w-y).normalize(),e[5].setComponents(a+o,u+p,c+g,w+y).normalize(),this}intersectsObject(t){let e=t.geometry;return e.boundingSphere===null&&e.computeBoundingSphere(),Zn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld),this.intersectsSphere(Zn)}intersectsSprite(t){return Zn.center.set(0,0,0),Zn.radius=.7071067811865476,Zn.applyMatrix4(t.matrixWorld),this.intersectsSphere(Zn)}intersectsSphere(t){let e=this.planes,n=t.center,i=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let i=e[n];if(qi.x=i.normal.x>0?t.max.x:t.min.x,qi.y=i.normal.y>0?t.max.y:t.min.y,qi.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(qi)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function mo(){let r=null,t=!1,e=null,n=null;function i(s,o){e(s,o),n=r.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=r.requestAnimationFrame(i),t=!0)},stop:function(){r.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){r=s}}}function nc(r,t){let e=t.isWebGL2,n=new WeakMap;function i(l,p){let u=l.array,f=l.usage,m=r.createBuffer();r.bindBuffer(p,m),r.bufferData(p,u,f),l.onUploadCallback();let g;if(u instanceof Float32Array)g=5126;else if(u instanceof Uint16Array)if(l.isFloat16BufferAttribute)if(e)g=5131;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else g=5123;else if(u instanceof Int16Array)g=5122;else if(u instanceof Uint32Array)g=5125;else if(u instanceof Int32Array)g=5124;else if(u instanceof Int8Array)g=5120;else if(u instanceof Uint8Array)g=5121;else if(u instanceof Uint8ClampedArray)g=5121;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:m,type:g,bytesPerElement:u.BYTES_PER_ELEMENT,version:l.version}}function s(l,p,u){let f=p.array,m=p.updateRange;r.bindBuffer(u,l),m.count===-1?r.bufferSubData(u,0,f):(e?r.bufferSubData(u,m.offset*f.BYTES_PER_ELEMENT,f,m.offset,m.count):r.bufferSubData(u,m.offset*f.BYTES_PER_ELEMENT,f.subarray(m.offset,m.offset+m.count)),m.count=-1)}function o(l){return l.isInterleavedBufferAttribute&&(l=l.data),n.get(l)}function a(l){l.isInterleavedBufferAttribute&&(l=l.data);let p=n.get(l);p&&(r.deleteBuffer(p.buffer),n.delete(l))}function h(l,p){if(l.isGLBufferAttribute){let f=n.get(l);(!f||f.version<l.version)&&n.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);let u=n.get(l);u===void 0?n.set(l,i(l,p)):u.version<l.version&&(s(u.buffer,l,p),u.version=l.version)}return{get:o,remove:a,update:h}}var An=class extends $e{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};let s=t/2,o=e/2,a=Math.floor(n),h=Math.floor(i),l=a+1,p=h+1,u=t/a,f=e/h,m=[],g=[],c=[],d=[];for(let _=0;_<p;_++){let y=_*f-o;for(let w=0;w<l;w++){let b=w*u-s;g.push(b,-y,0),c.push(0,0,1),d.push(w/a),d.push(1-_/h)}}for(let _=0;_<h;_++)for(let y=0;y<a;y++){let w=y+l*_,b=y+l*(_+1),M=y+1+l*(_+1),L=y+1+l*_;m.push(w,b,L),m.push(b,M,L)}this.setIndex(m),this.setAttribute("position",new Je(g,3)),this.setAttribute("normal",new Je(c,3)),this.setAttribute("uv",new Je(d,2))}static fromJSON(t){return new An(t.width,t.height,t.widthSegments,t.heightSegments)}},ic=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vUv ).g;
#endif`,sc=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,rc=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,ac=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,oc=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,lc=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,cc="vec3 transformed = vec3( position );",hc=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,uc=`vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 f0, const in float f90, const in float roughness ) {
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
	float D = D_GGX( alpha, dotNH );
	return F * ( V * D );
}
#ifdef USE_IRIDESCENCE
	vec3 BRDF_GGX_Iridescence( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 f0, const in float f90, const in float iridescence, const in vec3 iridescenceFresnel, const in float roughness ) {
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = mix( F_Schlick( f0, f90, dotVH ), iridescenceFresnel, iridescence );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif`,dc=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			 return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float R21 = R12;
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,fc=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vUv );
		vec2 dSTdy = dFdy( vUv );
		float Hll = bumpScale * texture2D( bumpMap, vUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = dFdx( surf_pos.xyz );
		vec3 vSigmaY = dFdy( surf_pos.xyz );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,pc=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,mc=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,gc=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,_c=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,xc=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,vc=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,yc=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,bc=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,wc=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
struct GeometricContext {
	vec3 position;
	vec3 normal;
	vec3 viewDir;
#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal;
#endif
};
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}`,Mc=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_v0 0.339
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_v1 0.276
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_v4 0.046
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_v5 0.016
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_v6 0.0038
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Sc=`vec3 transformedNormal = objectNormal;
#ifdef USE_INSTANCING
	mat3 m = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );
	transformedNormal = m * transformedNormal;
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	vec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Tc=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ac=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vUv ).x * displacementScale + displacementBias );
#endif`,Ec=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Cc=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Rc="gl_FragColor = linearToOutputTexel( gl_FragColor );",Pc=`vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Lc=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 envColor = textureCubeUV( envMap, reflectVec, 0.0 );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Ic=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Dc=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,zc=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,kc=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Oc=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Nc=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Fc=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Uc=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Bc=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Vc=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vUv2 );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Wc=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Hc=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Gc=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert
#define Material_LightProbeLOD( material )	(0)`,Xc=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
uniform vec3 lightProbe[ 9 ];
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( PHYSICALLY_CORRECT_LIGHTS )
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#else
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometry.position;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometry.position;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,qc=`#if defined( USE_ENVMAP )
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#if defined( ENVMAP_TYPE_CUBE_UV )
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#if defined( ENVMAP_TYPE_CUBE_UV )
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
#endif`,Zc=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Yc=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon
#define Material_LightProbeLOD( material )	(0)`,Jc=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,jc=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong
#define Material_LightProbeLOD( material )	(0)`,$c=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULARINTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vUv ).a;
		#endif
		#ifdef USE_SPECULARCOLORMAP
			specularColorFactor *= texture2D( specularColorMap, vUv ).rgb;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEENCOLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEENROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vUv ).a;
	#endif
#endif`,Kc=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
};
vec3 clearcoatSpecular = vec3( 0.0 );
vec3 sheenSpecular = vec3( 0.0 );
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometry.normal;
		vec3 viewDir = geometry.viewDir;
		vec3 position = geometry.position;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometry.clearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecular += ccIrradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.clearcoatNormal, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * BRDF_Sheen( directLight.direction, geometry.viewDir, geometry.normal, material.sheenColor, material.sheenRoughness );
	#endif
	#ifdef USE_IRIDESCENCE
		reflectedLight.directSpecular += irradiance * BRDF_GGX_Iridescence( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness );
	#else
		reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularF90, material.roughness );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecular += clearcoatRadiance * EnvironmentBRDF( geometry.clearcoatNormal, geometry.viewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * material.sheenColor * IBLSheenBRDF( geometry.normal, geometry.viewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Qc=`
GeometricContext geometry;
geometry.position = - vViewPosition;
geometry.normal = normal;
geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
#ifdef USE_CLEARCOAT
	geometry.clearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometry.viewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometry, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	irradiance += getLightProbeIrradiance( lightProbe, geometry.normal );
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,th=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vUv2 );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometry.normal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	radiance += getIBLRadiance( geometry.viewDir, geometry.normal, material.roughness );
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometry.viewDir, geometry.clearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,eh=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );
#endif`,nh=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ih=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,sh=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,rh=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,ah=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,oh=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,lh=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,ch=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	uniform mat3 uvTransform;
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,hh=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vUv );
	metalnessFactor *= texelMetalness.b;
#endif`,uh=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,dh=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,fh=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,ph=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,mh=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,gh=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	#ifdef USE_TANGENT
		vec3 tangent = normalize( vTangent );
		vec3 bitangent = normalize( vBitangent );
		#ifdef DOUBLE_SIDED
			tangent = tangent * faceDirection;
			bitangent = bitangent * faceDirection;
		#endif
		#if defined( TANGENTSPACE_NORMALMAP ) || defined( USE_CLEARCOAT_NORMALMAP )
			mat3 vTBN = mat3( tangent, bitangent, normal );
		#endif
	#endif
#endif
vec3 geometryNormal = normal;`,_h=`#ifdef OBJECTSPACE_NORMALMAP
	normal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( TANGENTSPACE_NORMALMAP )
	vec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	#ifdef USE_TANGENT
		normal = normalize( vTBN * mapN );
	#else
		normal = perturbNormal2Arb( - vViewPosition, normal, mapN, faceDirection );
	#endif
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,xh=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,vh=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,yh=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,bh=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef OBJECTSPACE_NORMALMAP
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( TANGENTSPACE_NORMALMAP ) || defined ( USE_CLEARCOAT_NORMALMAP ) )
	vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm, vec3 mapN, float faceDirection ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( vUv.st );
		vec2 st1 = dFdy( vUv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : faceDirection * inversesqrt( det );
		return normalize( T * ( mapN.x * scale ) + B * ( mapN.y * scale ) + N * mapN.z );
	}
#endif`,wh=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = geometryNormal;
#endif`,Mh=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	#ifdef USE_TANGENT
		clearcoatNormal = normalize( vTBN * clearcoatMapN );
	#else
		clearcoatNormal = perturbNormal2Arb( - vViewPosition, clearcoatNormal, clearcoatMapN, faceDirection );
	#endif
#endif`,Sh=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif`,Th=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Ah=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha + 0.1;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Eh=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {
	return linearClipZ * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * invClipZ - far );
}`,Ch=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Rh=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ph=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Lh=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ih=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Dh=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,zh=`#if NUM_SPOT_LIGHT_COORDS > 0
  varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
  uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );
		bool inFrustum = all( inFrustumVec );
		bvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );
		bool frustumTest = all( frustumTestVec );
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,kh=`#if NUM_SPOT_LIGHT_COORDS > 0
  uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
  varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Oh=`#if defined( USE_SHADOWMAP ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#if NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SPOT_LIGHT_COORDS > 0 || NUM_POINT_LIGHT_SHADOWS > 0
		vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		vec4 shadowWorldPosition;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
		vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
		vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
#endif`,Nh=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Fh=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Uh=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	uniform int boneTextureSize;
	mat4 getBoneMatrix( const in float i ) {
		float j = i * 4.0;
		float x = mod( j, float( boneTextureSize ) );
		float y = floor( j / float( boneTextureSize ) );
		float dx = 1.0 / float( boneTextureSize );
		float dy = 1.0 / float( boneTextureSize );
		y = dy * ( y + 0.5 );
		vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );
		vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );
		vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );
		vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );
		mat4 bone = mat4( v1, v2, v3, v4 );
		return bone;
	}
#endif`,Bh=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Vh=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Wh=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Hh=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Gh=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Xh=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return toneMappingExposure * color;
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,qh=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmission = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmission.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmission.rgb, material.transmission );
#endif`,Zh=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float framebufferLod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		#ifdef texture2DLodEXT
			return texture2DLodEXT( transmissionSamplerMap, fragCoord.xy, framebufferLod );
		#else
			return texture2D( transmissionSamplerMap, fragCoord.xy, framebufferLod );
		#endif
	}
	vec3 applyVolumeAttenuation( const in vec3 radiance, const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return radiance;
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance * radiance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 attenuatedColor = applyVolumeAttenuation( transmittedLight.rgb, length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		return vec4( ( 1.0 - F ) * attenuatedColor * diffuseColor, transmittedLight.a );
	}
#endif`,Yh=`#if ( defined( USE_UV ) && ! defined( UVS_VERTEX_ONLY ) )
	varying vec2 vUv;
#endif`,Jh=`#ifdef USE_UV
	#ifdef UVS_VERTEX_ONLY
		vec2 vUv;
	#else
		varying vec2 vUv;
	#endif
	uniform mat3 uvTransform;
#endif`,jh=`#ifdef USE_UV
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
#endif`,$h=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	varying vec2 vUv2;
#endif`,Kh=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	attribute vec2 uv2;
	varying vec2 vUv2;
	uniform mat3 uv2Transform;
#endif`,Qh=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	vUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;
#endif`,tu=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,eu=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,nu=`uniform sampler2D t2D;
varying vec2 vUv;
void main() {
	gl_FragColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		gl_FragColor = vec4( mix( pow( gl_FragColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), gl_FragColor.rgb * 0.0773993808, vec3( lessThanEqual( gl_FragColor.rgb, vec3( 0.04045 ) ) ) ), gl_FragColor.w );
	#endif
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,iu=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,su=`#include <envmap_common_pars_fragment>
uniform float opacity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	vec3 vReflect = vWorldDirection;
	#include <envmap_fragment>
	gl_FragColor = envColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,ru=`#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,au=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,ou=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,lu=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,cu=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,hu=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,uu=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,du=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,fu=`#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,pu=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vUv2 );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,mu=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,gu=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_u=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,xu=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vu=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	vViewPosition = - mvPosition.xyz;
#endif
}`,yu=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,bu=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,wu=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Mu=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Su=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULARINTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
	#ifdef USE_SPECULARCOLORMAP
		uniform sampler2D specularColorMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEENCOLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEENROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <bsdfs>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecular;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + clearcoatSpecular * material.clearcoat;
	#endif
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Tu=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Au=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Eu=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Cu=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Ru=`#include <common>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Pu=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,Lu=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Iu=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,Ot={alphamap_fragment:ic,alphamap_pars_fragment:sc,alphatest_fragment:rc,alphatest_pars_fragment:ac,aomap_fragment:oc,aomap_pars_fragment:lc,begin_vertex:cc,beginnormal_vertex:hc,bsdfs:uc,iridescence_fragment:dc,bumpmap_pars_fragment:fc,clipping_planes_fragment:pc,clipping_planes_pars_fragment:mc,clipping_planes_pars_vertex:gc,clipping_planes_vertex:_c,color_fragment:xc,color_pars_fragment:vc,color_pars_vertex:yc,color_vertex:bc,common:wc,cube_uv_reflection_fragment:Mc,defaultnormal_vertex:Sc,displacementmap_pars_vertex:Tc,displacementmap_vertex:Ac,emissivemap_fragment:Ec,emissivemap_pars_fragment:Cc,encodings_fragment:Rc,encodings_pars_fragment:Pc,envmap_fragment:Lc,envmap_common_pars_fragment:Ic,envmap_pars_fragment:Dc,envmap_pars_vertex:zc,envmap_physical_pars_fragment:qc,envmap_vertex:kc,fog_vertex:Oc,fog_pars_vertex:Nc,fog_fragment:Fc,fog_pars_fragment:Uc,gradientmap_pars_fragment:Bc,lightmap_fragment:Vc,lightmap_pars_fragment:Wc,lights_lambert_fragment:Hc,lights_lambert_pars_fragment:Gc,lights_pars_begin:Xc,lights_toon_fragment:Zc,lights_toon_pars_fragment:Yc,lights_phong_fragment:Jc,lights_phong_pars_fragment:jc,lights_physical_fragment:$c,lights_physical_pars_fragment:Kc,lights_fragment_begin:Qc,lights_fragment_maps:th,lights_fragment_end:eh,logdepthbuf_fragment:nh,logdepthbuf_pars_fragment:ih,logdepthbuf_pars_vertex:sh,logdepthbuf_vertex:rh,map_fragment:ah,map_pars_fragment:oh,map_particle_fragment:lh,map_particle_pars_fragment:ch,metalnessmap_fragment:hh,metalnessmap_pars_fragment:uh,morphcolor_vertex:dh,morphnormal_vertex:fh,morphtarget_pars_vertex:ph,morphtarget_vertex:mh,normal_fragment_begin:gh,normal_fragment_maps:_h,normal_pars_fragment:xh,normal_pars_vertex:vh,normal_vertex:yh,normalmap_pars_fragment:bh,clearcoat_normal_fragment_begin:wh,clearcoat_normal_fragment_maps:Mh,clearcoat_pars_fragment:Sh,iridescence_pars_fragment:Th,output_fragment:Ah,packing:Eh,premultiplied_alpha_fragment:Ch,project_vertex:Rh,dithering_fragment:Ph,dithering_pars_fragment:Lh,roughnessmap_fragment:Ih,roughnessmap_pars_fragment:Dh,shadowmap_pars_fragment:zh,shadowmap_pars_vertex:kh,shadowmap_vertex:Oh,shadowmask_pars_fragment:Nh,skinbase_vertex:Fh,skinning_pars_vertex:Uh,skinning_vertex:Bh,skinnormal_vertex:Vh,specularmap_fragment:Wh,specularmap_pars_fragment:Hh,tonemapping_fragment:Gh,tonemapping_pars_fragment:Xh,transmission_fragment:qh,transmission_pars_fragment:Zh,uv_pars_fragment:Yh,uv_pars_vertex:Jh,uv_vertex:jh,uv2_pars_fragment:$h,uv2_pars_vertex:Kh,uv2_vertex:Qh,worldpos_vertex:tu,background_vert:eu,background_frag:nu,cube_vert:iu,cube_frag:su,depth_vert:ru,depth_frag:au,distanceRGBA_vert:ou,distanceRGBA_frag:lu,equirect_vert:cu,equirect_frag:hu,linedashed_vert:uu,linedashed_frag:du,meshbasic_vert:fu,meshbasic_frag:pu,meshlambert_vert:mu,meshlambert_frag:gu,meshmatcap_vert:_u,meshmatcap_frag:xu,meshnormal_vert:vu,meshnormal_frag:yu,meshphong_vert:bu,meshphong_frag:wu,meshphysical_vert:Mu,meshphysical_frag:Su,meshtoon_vert:Tu,meshtoon_frag:Au,points_vert:Eu,points_frag:Cu,shadow_vert:Ru,shadow_frag:Pu,sprite_vert:Lu,sprite_frag:Iu},_t={common:{diffuse:{value:new Xt(16777215)},opacity:{value:1},map:{value:null},uvTransform:{value:new de},uv2Transform:{value:new de},alphaMap:{value:null},alphaTest:{value:0}},specularmap:{specularMap:{value:null}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1}},emissivemap:{emissiveMap:{value:null}},bumpmap:{bumpMap:{value:null},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalScale:{value:new zt(1,1)}},displacementmap:{displacementMap:{value:null},displacementScale:{value:1},displacementBias:{value:0}},roughnessmap:{roughnessMap:{value:null}},metalnessmap:{metalnessMap:{value:null}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Xt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Xt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaTest:{value:0},uvTransform:{value:new de}},sprite:{diffuse:{value:new Xt(16777215)},opacity:{value:1},center:{value:new zt(.5,.5)},rotation:{value:0},map:{value:null},alphaMap:{value:null},alphaTest:{value:0},uvTransform:{value:new de}}},Ne={basic:{uniforms:ae([_t.common,_t.specularmap,_t.envmap,_t.aomap,_t.lightmap,_t.fog]),vertexShader:Ot.meshbasic_vert,fragmentShader:Ot.meshbasic_frag},lambert:{uniforms:ae([_t.common,_t.specularmap,_t.envmap,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.fog,_t.lights,{emissive:{value:new Xt(0)}}]),vertexShader:Ot.meshlambert_vert,fragmentShader:Ot.meshlambert_frag},phong:{uniforms:ae([_t.common,_t.specularmap,_t.envmap,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.fog,_t.lights,{emissive:{value:new Xt(0)},specular:{value:new Xt(1118481)},shininess:{value:30}}]),vertexShader:Ot.meshphong_vert,fragmentShader:Ot.meshphong_frag},standard:{uniforms:ae([_t.common,_t.envmap,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.roughnessmap,_t.metalnessmap,_t.fog,_t.lights,{emissive:{value:new Xt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ot.meshphysical_vert,fragmentShader:Ot.meshphysical_frag},toon:{uniforms:ae([_t.common,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.gradientmap,_t.fog,_t.lights,{emissive:{value:new Xt(0)}}]),vertexShader:Ot.meshtoon_vert,fragmentShader:Ot.meshtoon_frag},matcap:{uniforms:ae([_t.common,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.fog,{matcap:{value:null}}]),vertexShader:Ot.meshmatcap_vert,fragmentShader:Ot.meshmatcap_frag},points:{uniforms:ae([_t.points,_t.fog]),vertexShader:Ot.points_vert,fragmentShader:Ot.points_frag},dashed:{uniforms:ae([_t.common,_t.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ot.linedashed_vert,fragmentShader:Ot.linedashed_frag},depth:{uniforms:ae([_t.common,_t.displacementmap]),vertexShader:Ot.depth_vert,fragmentShader:Ot.depth_frag},normal:{uniforms:ae([_t.common,_t.bumpmap,_t.normalmap,_t.displacementmap,{opacity:{value:1}}]),vertexShader:Ot.meshnormal_vert,fragmentShader:Ot.meshnormal_frag},sprite:{uniforms:ae([_t.sprite,_t.fog]),vertexShader:Ot.sprite_vert,fragmentShader:Ot.sprite_frag},background:{uniforms:{uvTransform:{value:new de},t2D:{value:null}},vertexShader:Ot.background_vert,fragmentShader:Ot.background_frag},cube:{uniforms:ae([_t.envmap,{opacity:{value:1}}]),vertexShader:Ot.cube_vert,fragmentShader:Ot.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ot.equirect_vert,fragmentShader:Ot.equirect_frag},distanceRGBA:{uniforms:ae([_t.common,_t.displacementmap,{referencePosition:{value:new $},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ot.distanceRGBA_vert,fragmentShader:Ot.distanceRGBA_frag},shadow:{uniforms:ae([_t.lights,_t.fog,{color:{value:new Xt(0)},opacity:{value:1}}]),vertexShader:Ot.shadow_vert,fragmentShader:Ot.shadow_frag}};Ne.physical={uniforms:ae([Ne.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatNormalScale:{value:new zt(1,1)},clearcoatNormalMap:{value:null},iridescence:{value:0},iridescenceMap:{value:null},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},sheen:{value:0},sheenColor:{value:new Xt(0)},sheenColorMap:{value:null},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},transmission:{value:0},transmissionMap:{value:null},transmissionSamplerSize:{value:new zt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},attenuationDistance:{value:0},attenuationColor:{value:new Xt(0)},specularIntensity:{value:1},specularIntensityMap:{value:null},specularColor:{value:new Xt(1,1,1)},specularColorMap:{value:null}}]),vertexShader:Ot.meshphysical_vert,fragmentShader:Ot.meshphysical_frag};function Du(r,t,e,n,i,s){let o=new Xt(0),a=i===!0?0:1,h,l,p=null,u=0,f=null;function m(c,d){let _=!1,y=d.isScene===!0?d.background:null;y&&y.isTexture&&(y=t.get(y));let w=r.xr,b=w.getSession&&w.getSession();b&&b.environmentBlendMode==="additive"&&(y=null),y===null?g(o,a):y&&y.isColor&&(g(y,1),_=!0),(r.autoClear||_)&&r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil),y&&(y.isCubeTexture||y.mapping===cs)?(l===void 0&&(l=new fe(new Ke(1,1,1),new ye({name:"BackgroundCubeMaterial",uniforms:ai(Ne.cube.uniforms),vertexShader:Ne.cube.vertexShader,fragmentShader:Ne.cube.fragmentShader,side:Te,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(M,L,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=y,l.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,(p!==y||u!==y.version||f!==r.toneMapping)&&(l.material.needsUpdate=!0,p=y,u=y.version,f=r.toneMapping),l.layers.enableAll(),c.unshift(l,l.geometry,l.material,0,0,null)):y&&y.isTexture&&(h===void 0&&(h=new fe(new An(2,2),new ye({name:"BackgroundMaterial",uniforms:ai(Ne.background.uniforms),vertexShader:Ne.background.vertexShader,fragmentShader:Ne.background.fragmentShader,side:ei,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),Object.defineProperty(h.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(h)),h.material.uniforms.t2D.value=y,y.matrixAutoUpdate===!0&&y.updateMatrix(),h.material.uniforms.uvTransform.value.copy(y.matrix),(p!==y||u!==y.version||f!==r.toneMapping)&&(h.material.needsUpdate=!0,p=y,u=y.version,f=r.toneMapping),h.layers.enableAll(),c.unshift(h,h.geometry,h.material,0,0,null))}function g(c,d){e.buffers.color.setClear(c.r,c.g,c.b,d,s)}return{getClearColor:function(){return o},setClearColor:function(c,d=1){o.set(c),a=d,g(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(c){a=c,g(o,a)},render:m}}function zu(r,t,e,n){let i=r.getParameter(34921),s=n.isWebGL2?null:t.get("OES_vertex_array_object"),o=n.isWebGL2||s!==null,a={},h=d(null),l=h,p=!1;function u(B,U,nt,G,J){let C=!1;if(o){let R=c(G,nt,U);l!==R&&(l=R,m(l.object)),C=_(B,G,nt,J),C&&y(B,G,nt,J)}else{let R=U.wireframe===!0;(l.geometry!==G.id||l.program!==nt.id||l.wireframe!==R)&&(l.geometry=G.id,l.program=nt.id,l.wireframe=R,C=!0)}J!==null&&e.update(J,34963),(C||p)&&(p=!1,T(B,U,nt,G),J!==null&&r.bindBuffer(34963,e.get(J).buffer))}function f(){return n.isWebGL2?r.createVertexArray():s.createVertexArrayOES()}function m(B){return n.isWebGL2?r.bindVertexArray(B):s.bindVertexArrayOES(B)}function g(B){return n.isWebGL2?r.deleteVertexArray(B):s.deleteVertexArrayOES(B)}function c(B,U,nt){let G=nt.wireframe===!0,J=a[B.id];J===void 0&&(J={},a[B.id]=J);let C=J[U.id];C===void 0&&(C={},J[U.id]=C);let R=C[G];return R===void 0&&(R=d(f()),C[G]=R),R}function d(B){let U=[],nt=[],G=[];for(let J=0;J<i;J++)U[J]=0,nt[J]=0,G[J]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:nt,attributeDivisors:G,object:B,attributes:{},index:null}}function _(B,U,nt,G){let J=l.attributes,C=U.attributes,R=0,it=nt.getAttributes();for(let Z in it)if(it[Z].location>=0){let ft=J[Z],Tt=C[Z];if(Tt===void 0&&(Z==="instanceMatrix"&&B.instanceMatrix&&(Tt=B.instanceMatrix),Z==="instanceColor"&&B.instanceColor&&(Tt=B.instanceColor)),ft===void 0||ft.attribute!==Tt||Tt&&ft.data!==Tt.data)return!0;R++}return l.attributesNum!==R||l.index!==G}function y(B,U,nt,G){let J={},C=U.attributes,R=0,it=nt.getAttributes();for(let Z in it)if(it[Z].location>=0){let ft=C[Z];ft===void 0&&(Z==="instanceMatrix"&&B.instanceMatrix&&(ft=B.instanceMatrix),Z==="instanceColor"&&B.instanceColor&&(ft=B.instanceColor));let Tt={};Tt.attribute=ft,ft&&ft.data&&(Tt.data=ft.data),J[Z]=Tt,R++}l.attributes=J,l.attributesNum=R,l.index=G}function w(){let B=l.newAttributes;for(let U=0,nt=B.length;U<nt;U++)B[U]=0}function b(B){M(B,0)}function M(B,U){let nt=l.newAttributes,G=l.enabledAttributes,J=l.attributeDivisors;nt[B]=1,G[B]===0&&(r.enableVertexAttribArray(B),G[B]=1),J[B]!==U&&((n.isWebGL2?r:t.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](B,U),J[B]=U)}function L(){let B=l.newAttributes,U=l.enabledAttributes;for(let nt=0,G=U.length;nt<G;nt++)U[nt]!==B[nt]&&(r.disableVertexAttribArray(nt),U[nt]=0)}function I(B,U,nt,G,J,C){n.isWebGL2===!0&&(nt===5124||nt===5125)?r.vertexAttribIPointer(B,U,nt,J,C):r.vertexAttribPointer(B,U,nt,G,J,C)}function T(B,U,nt,G){if(n.isWebGL2===!1&&(B.isInstancedMesh||G.isInstancedBufferGeometry)&&t.get("ANGLE_instanced_arrays")===null)return;w();let J=G.attributes,C=nt.getAttributes(),R=U.defaultAttributeValues;for(let it in C){let Z=C[it];if(Z.location>=0){let K=J[it];if(K===void 0&&(it==="instanceMatrix"&&B.instanceMatrix&&(K=B.instanceMatrix),it==="instanceColor"&&B.instanceColor&&(K=B.instanceColor)),K!==void 0){let ft=K.normalized,Tt=K.itemSize,et=e.get(K);if(et===void 0)continue;let At=et.buffer,Mt=et.type,bt=et.bytesPerElement;if(K.isInterleavedBufferAttribute){let xt=K.data,Dt=xt.stride,x=K.offset;if(xt.isInstancedInterleavedBuffer){for(let X=0;X<Z.locationSize;X++)M(Z.location+X,xt.meshPerAttribute);B.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=xt.meshPerAttribute*xt.count)}else for(let X=0;X<Z.locationSize;X++)b(Z.location+X);r.bindBuffer(34962,At);for(let X=0;X<Z.locationSize;X++)I(Z.location+X,Tt/Z.locationSize,Mt,ft,Dt*bt,(x+Tt/Z.locationSize*X)*bt)}else{if(K.isInstancedBufferAttribute){for(let xt=0;xt<Z.locationSize;xt++)M(Z.location+xt,K.meshPerAttribute);B.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let xt=0;xt<Z.locationSize;xt++)b(Z.location+xt);r.bindBuffer(34962,At);for(let xt=0;xt<Z.locationSize;xt++)I(Z.location+xt,Tt/Z.locationSize,Mt,ft,Tt*bt,Tt/Z.locationSize*xt*bt)}}else if(R!==void 0){let ft=R[it];if(ft!==void 0)switch(ft.length){case 2:r.vertexAttrib2fv(Z.location,ft);break;case 3:r.vertexAttrib3fv(Z.location,ft);break;case 4:r.vertexAttrib4fv(Z.location,ft);break;default:r.vertexAttrib1fv(Z.location,ft)}}}}L()}function z(){v();for(let B in a){let U=a[B];for(let nt in U){let G=U[nt];for(let J in G)g(G[J].object),delete G[J];delete U[nt]}delete a[B]}}function A(B){if(a[B.id]===void 0)return;let U=a[B.id];for(let nt in U){let G=U[nt];for(let J in G)g(G[J].object),delete G[J];delete U[nt]}delete a[B.id]}function N(B){for(let U in a){let nt=a[U];if(nt[B.id]===void 0)continue;let G=nt[B.id];for(let J in G)g(G[J].object),delete G[J];delete nt[B.id]}}function v(){O(),p=!0,l!==h&&(l=h,m(l.object))}function O(){h.geometry=null,h.program=null,h.wireframe=!1}return{setup:u,reset:v,resetDefaultState:O,dispose:z,releaseStatesOfGeometry:A,releaseStatesOfProgram:N,initAttributes:w,enableAttribute:b,disableUnusedAttributes:L}}function ku(r,t,e,n){let i=n.isWebGL2,s;function o(l){s=l}function a(l,p){r.drawArrays(s,l,p),e.update(p,s,1)}function h(l,p,u){if(u===0)return;let f,m;if(i)f=r,m="drawArraysInstanced";else if(f=t.get("ANGLE_instanced_arrays"),m="drawArraysInstancedANGLE",f===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[m](s,l,p,u),e.update(p,s,u)}this.setMode=o,this.render=a,this.renderInstances=h}function Ou(r,t,e){let n;function i(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){let I=t.get("EXT_texture_filter_anisotropic");n=r.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function s(I){if(I==="highp"){if(r.getShaderPrecisionFormat(35633,36338).precision>0&&r.getShaderPrecisionFormat(35632,36338).precision>0)return"highp";I="mediump"}return I==="mediump"&&r.getShaderPrecisionFormat(35633,36337).precision>0&&r.getShaderPrecisionFormat(35632,36337).precision>0?"mediump":"lowp"}let o=typeof WebGL2RenderingContext<"u"&&r instanceof WebGL2RenderingContext||typeof WebGL2ComputeRenderingContext<"u"&&r instanceof WebGL2ComputeRenderingContext,a=e.precision!==void 0?e.precision:"highp",h=s(a);h!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",h,"instead."),a=h);let l=o||t.has("WEBGL_draw_buffers"),p=e.logarithmicDepthBuffer===!0,u=r.getParameter(34930),f=r.getParameter(35660),m=r.getParameter(3379),g=r.getParameter(34076),c=r.getParameter(34921),d=r.getParameter(36347),_=r.getParameter(36348),y=r.getParameter(36349),w=f>0,b=o||t.has("OES_texture_float"),M=w&&b,L=o?r.getParameter(36183):0;return{isWebGL2:o,drawBuffers:l,getMaxAnisotropy:i,getMaxPrecision:s,precision:a,logarithmicDepthBuffer:p,maxTextures:u,maxVertexTextures:f,maxTextureSize:m,maxCubemapSize:g,maxAttributes:c,maxVertexUniforms:d,maxVaryings:_,maxFragmentUniforms:y,vertexTextures:w,floatFragmentTextures:b,floatVertexTextures:M,maxSamples:L}}function Nu(r){let t=this,e=null,n=0,i=!1,s=!1,o=new Ye,a=new de,h={value:null,needsUpdate:!1};this.uniform=h,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f,m){let g=u.length!==0||f||n!==0||i;return i=f,e=p(u,m,0),n=u.length,g},this.beginShadows=function(){s=!0,p(null)},this.endShadows=function(){s=!1,l()},this.setState=function(u,f,m){let g=u.clippingPlanes,c=u.clipIntersection,d=u.clipShadows,_=r.get(u);if(!i||g===null||g.length===0||s&&!d)s?p(null):l();else{let y=s?0:n,w=y*4,b=_.clippingState||null;h.value=b,b=p(g,f,w,m);for(let M=0;M!==w;++M)b[M]=e[M];_.clippingState=b,this.numIntersection=c?this.numPlanes:0,this.numPlanes+=y}};function l(){h.value!==e&&(h.value=e,h.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function p(u,f,m,g){let c=u!==null?u.length:0,d=null;if(c!==0){if(d=h.value,g!==!0||d===null){let _=m+c*4,y=f.matrixWorldInverse;a.getNormalMatrix(y),(d===null||d.length<_)&&(d=new Float32Array(_));for(let w=0,b=m;w!==c;++w,b+=4)o.copy(u[w]).applyMatrix4(y,a),o.normal.toArray(d,b),d[b+3]=o.constant}h.value=d,h.needsUpdate=!0}return t.numPlanes=c,t.numIntersection=0,d}}function Fu(r){let t=new WeakMap;function e(o,a){return a===nr?o.mapping=ni:a===ir&&(o.mapping=ii),o}function n(o){if(o&&o.isTexture&&o.isRenderTargetTexture===!1){let a=o.mapping;if(a===nr||a===ir)if(t.has(o)){let h=t.get(o).texture;return e(h,o.mapping)}else{let h=o.image;if(h&&h.height>0){let l=new ur(h.height/2);return l.fromEquirectangularTexture(r,o),t.set(o,l),o.addEventListener("dispose",i),e(l.texture,o.mapping)}else return null}}return o}function i(o){let a=o.target;a.removeEventListener("dispose",i);let h=t.get(a);h!==void 0&&(t.delete(a),h.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}var dr=class extends oi{constructor(t=-1,e=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,s=n-t,o=n+t,a=i+e,h=i-e;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,p=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,o=s+l*this.view.width,a-=p*this.view.offsetY,h=a-p*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,h,this.near,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},jn=4,Ua=[.125,.215,.35,.446,.526,.582],xn=20,Ks=new dr,Ba=new Xt,Qs=null,_n=(1+Math.sqrt(5))/2,Yn=1/_n,Va=[new $(1,1,1),new $(-1,1,1),new $(1,1,-1),new $(-1,1,-1),new $(0,_n,Yn),new $(0,_n,-Yn),new $(Yn,0,_n),new $(-Yn,0,_n),new $(_n,Yn,0),new $(-_n,Yn,0)],ls=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){Qs=this._renderer.getRenderTarget(),this._setSize(256);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,n,i,s),e>0&&this._blur(s,0,0,e),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ga(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ha(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Qs),t.scissorTest=!1,Zi(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ni||t.mapping===ii?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Qs=this._renderer.getRenderTarget();let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Se,minFilter:Se,generateMipmaps:!1,type:yi,format:ve,encoding:je,depthBuffer:!1},i=Wa(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Wa(t,e,n);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Uu(s)),this._blurMaterial=Bu(s,t,e)}return i}_compileMaterial(t){let e=new fe(this._lodPlanes[0],t);this._renderer.compile(e,Ks)}_sceneToCubeUV(t,e,n,i){let a=new le(90,1,e,n),h=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],p=this._renderer,u=p.autoClear,f=p.toneMapping;p.getClearColor(Ba),p.toneMapping=Ie,p.autoClear=!1;let m=new is({name:"PMREM.Background",side:Te,depthWrite:!1,depthTest:!1}),g=new fe(new Ke,m),c=!1,d=t.background;d?d.isColor&&(m.color.copy(d),t.background=null,c=!0):(m.color.copy(Ba),c=!0);for(let _=0;_<6;_++){let y=_%3;y===0?(a.up.set(0,h[_],0),a.lookAt(l[_],0,0)):y===1?(a.up.set(0,0,h[_]),a.lookAt(0,l[_],0)):(a.up.set(0,h[_],0),a.lookAt(0,0,l[_]));let w=this._cubeSize;Zi(i,y*w,_>2?w:0,w,w),p.setRenderTarget(i),c&&p.render(g,a),p.render(t,a)}g.geometry.dispose(),g.material.dispose(),p.toneMapping=f,p.autoClear=u,t.background=d}_textureToCubeUV(t,e){let n=this._renderer,i=t.mapping===ni||t.mapping===ii;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ga()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ha());let s=i?this._cubemapMaterial:this._equirectMaterial,o=new fe(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=t;let h=this._cubeSize;Zi(e,0,0,3*h,2*h),n.setRenderTarget(e),n.render(o,Ks)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){let s=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),o=Va[(i-1)%Va.length];this._blur(t,i-1,i,s,o)}e.autoClear=n}_blur(t,e,n,i,s){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,i,"latitudinal",s),this._halfBlur(o,t,n,n,i,"longitudinal",s)}_halfBlur(t,e,n,i,s,o,a){let h=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let p=3,u=new fe(this._lodPlanes[i],l),f=l.uniforms,m=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*m):2*Math.PI/(2*xn-1),c=s/g,d=isFinite(s)?1+Math.floor(p*c):xn;d>xn&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${d} samples when the maximum is set to ${xn}`);let _=[],y=0;for(let I=0;I<xn;++I){let T=I/c,z=Math.exp(-T*T/2);_.push(z),I===0?y+=z:I<d&&(y+=2*z)}for(let I=0;I<_.length;I++)_[I]=_[I]/y;f.envMap.value=t.texture,f.samples.value=d,f.weights.value=_,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);let{_lodMax:w}=this;f.dTheta.value=g,f.mipInt.value=w-n;let b=this._sizeLods[i],M=3*b*(i>w-jn?i-w+jn:0),L=4*(this._cubeSize-b);Zi(e,M,L,3*b,2*b),h.setRenderTarget(e),h.render(u,Ks)}};function Uu(r){let t=[],e=[],n=[],i=r,s=r-jn+1+Ua.length;for(let o=0;o<s;o++){let a=Math.pow(2,i);e.push(a);let h=1/a;o>r-jn?h=Ua[o-r+jn-1]:o===0&&(h=0),n.push(h);let l=1/(a-2),p=-l,u=1+l,f=[p,p,u,p,u,u,p,p,u,u,p,u],m=6,g=6,c=3,d=2,_=1,y=new Float32Array(c*g*m),w=new Float32Array(d*g*m),b=new Float32Array(_*g*m);for(let L=0;L<m;L++){let I=L%3*2/3-1,T=L>2?0:-1,z=[I,T,0,I+2/3,T,0,I+2/3,T+1,0,I,T,0,I+2/3,T+1,0,I,T+1,0];y.set(z,c*g*L),w.set(f,d*g*L);let A=[L,L,L,L,L,L];b.set(A,_*g*L)}let M=new $e;M.setAttribute("position",new Ae(y,c)),M.setAttribute("uv",new Ae(w,d)),M.setAttribute("faceIndex",new Ae(b,_)),t.push(M),i>jn&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Wa(r,t,e){let n=new De(r,t,e);return n.texture.mapping=cs,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Zi(r,t,e,n,i){r.viewport.set(t,e,n,i),r.scissor.set(t,e,n,i)}function Bu(r,t,e){let n=new Float32Array(xn),i=new $(0,1,0);return new ye({name:"SphericalGaussianBlur",defines:{n:xn,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:zr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:hn,depthTest:!1,depthWrite:!1})}function Ha(){return new ye({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:zr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:hn,depthTest:!1,depthWrite:!1})}function Ga(){return new ye({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:zr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:hn,depthTest:!1,depthWrite:!1})}function zr(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Vu(r){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){let h=a.mapping,l=h===nr||h===ir,p=h===ni||h===ii;if(l||p)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let u=t.get(a);return e===null&&(e=new ls(r)),u=l?e.fromEquirectangular(a,u):e.fromCubemap(a,u),t.set(a,u),u.texture}else{if(t.has(a))return t.get(a).texture;{let u=a.image;if(l&&u&&u.height>0||p&&u&&i(u)){e===null&&(e=new ls(r));let f=l?e.fromEquirectangular(a):e.fromCubemap(a);return t.set(a,f),a.addEventListener("dispose",s),f.texture}else return null}}}return a}function i(a){let h=0,l=6;for(let p=0;p<l;p++)a[p]!==void 0&&h++;return h===l}function s(a){let h=a.target;h.removeEventListener("dispose",s);let l=t.get(h);l!==void 0&&(t.delete(h),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Wu(r){let t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(n){n.isWebGL2?e("EXT_color_buffer_float"):(e("WEBGL_depth_texture"),e("OES_texture_float"),e("OES_texture_half_float"),e("OES_texture_half_float_linear"),e("OES_standard_derivatives"),e("OES_element_index_uint"),e("OES_vertex_array_object"),e("ANGLE_instanced_arrays")),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture")},get:function(n){let i=e(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Hu(r,t,e,n){let i={},s=new WeakMap;function o(u){let f=u.target;f.index!==null&&t.remove(f.index);for(let g in f.attributes)t.remove(f.attributes[g]);f.removeEventListener("dispose",o),delete i[f.id];let m=s.get(f);m&&(t.remove(m),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(u,f){return i[f.id]===!0||(f.addEventListener("dispose",o),i[f.id]=!0,e.memory.geometries++),f}function h(u){let f=u.attributes;for(let g in f)t.update(f[g],34962);let m=u.morphAttributes;for(let g in m){let c=m[g];for(let d=0,_=c.length;d<_;d++)t.update(c[d],34962)}}function l(u){let f=[],m=u.index,g=u.attributes.position,c=0;if(m!==null){let y=m.array;c=m.version;for(let w=0,b=y.length;w<b;w+=3){let M=y[w+0],L=y[w+1],I=y[w+2];f.push(M,L,L,I,I,M)}}else{let y=g.array;c=g.version;for(let w=0,b=y.length/3-1;w<b;w+=3){let M=w+0,L=w+1,I=w+2;f.push(M,L,L,I,I,M)}}let d=new(fo(f)?rs:ss)(f,1);d.version=c;let _=s.get(u);_&&t.remove(_),s.set(u,d)}function p(u){let f=s.get(u);if(f){let m=u.index;m!==null&&f.version<m.version&&l(u)}else l(u);return s.get(u)}return{get:a,update:h,getWireframeAttribute:p}}function Gu(r,t,e,n){let i=n.isWebGL2,s;function o(f){s=f}let a,h;function l(f){a=f.type,h=f.bytesPerElement}function p(f,m){r.drawElements(s,m,a,f*h),e.update(m,s,1)}function u(f,m,g){if(g===0)return;let c,d;if(i)c=r,d="drawElementsInstanced";else if(c=t.get("ANGLE_instanced_arrays"),d="drawElementsInstancedANGLE",c===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}c[d](s,m,a,f*h,g),e.update(m,s,g)}this.setMode=o,this.setIndex=l,this.render=p,this.renderInstances=u}function Xu(r){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(e.calls++,o){case 4:e.triangles+=a*(s/3);break;case 1:e.lines+=a*(s/2);break;case 3:e.lines+=a*(s-1);break;case 2:e.lines+=a*s;break;case 0:e.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){e.frame++,e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function qu(r,t){return r[0]-t[0]}function Zu(r,t){return Math.abs(t[1])-Math.abs(r[1])}function Yu(r,t,e){let n={},i=new Float32Array(8),s=new WeakMap,o=new te,a=[];for(let l=0;l<8;l++)a[l]=[l,0];function h(l,p,u,f){let m=l.morphTargetInfluences;if(t.isWebGL2===!0){let g=p.morphAttributes.position||p.morphAttributes.normal||p.morphAttributes.color,c=g!==void 0?g.length:0,d=s.get(p);if(d===void 0||d.count!==c){let U=function(){O.dispose(),s.delete(p),p.removeEventListener("dispose",U)};d!==void 0&&d.texture.dispose();let w=p.morphAttributes.position!==void 0,b=p.morphAttributes.normal!==void 0,M=p.morphAttributes.color!==void 0,L=p.morphAttributes.position||[],I=p.morphAttributes.normal||[],T=p.morphAttributes.color||[],z=0;w===!0&&(z=1),b===!0&&(z=2),M===!0&&(z=3);let A=p.attributes.position.count*z,N=1;A>t.maxTextureSize&&(N=Math.ceil(A/t.maxTextureSize),A=t.maxTextureSize);let v=new Float32Array(A*N*4*c),O=new es(v,A,N,c);O.type=Ue,O.needsUpdate=!0;let B=z*4;for(let nt=0;nt<c;nt++){let G=L[nt],J=I[nt],C=T[nt],R=A*N*4*nt;for(let it=0;it<G.count;it++){let Z=it*B;w===!0&&(o.fromBufferAttribute(G,it),v[R+Z+0]=o.x,v[R+Z+1]=o.y,v[R+Z+2]=o.z,v[R+Z+3]=0),b===!0&&(o.fromBufferAttribute(J,it),v[R+Z+4]=o.x,v[R+Z+5]=o.y,v[R+Z+6]=o.z,v[R+Z+7]=0),M===!0&&(o.fromBufferAttribute(C,it),v[R+Z+8]=o.x,v[R+Z+9]=o.y,v[R+Z+10]=o.z,v[R+Z+11]=C.itemSize===4?o.w:1)}}d={count:c,texture:O,size:new zt(A,N)},s.set(p,d),p.addEventListener("dispose",U)}let _=0;for(let w=0;w<m.length;w++)_+=m[w];let y=p.morphTargetsRelative?1:1-_;f.getUniforms().setValue(r,"morphTargetBaseInfluence",y),f.getUniforms().setValue(r,"morphTargetInfluences",m),f.getUniforms().setValue(r,"morphTargetsTexture",d.texture,e),f.getUniforms().setValue(r,"morphTargetsTextureSize",d.size)}else{let g=m===void 0?0:m.length,c=n[p.id];if(c===void 0||c.length!==g){c=[];for(let b=0;b<g;b++)c[b]=[b,0];n[p.id]=c}for(let b=0;b<g;b++){let M=c[b];M[0]=b,M[1]=m[b]}c.sort(Zu);for(let b=0;b<8;b++)b<g&&c[b][1]?(a[b][0]=c[b][0],a[b][1]=c[b][1]):(a[b][0]=Number.MAX_SAFE_INTEGER,a[b][1]=0);a.sort(qu);let d=p.morphAttributes.position,_=p.morphAttributes.normal,y=0;for(let b=0;b<8;b++){let M=a[b],L=M[0],I=M[1];L!==Number.MAX_SAFE_INTEGER&&I?(d&&p.getAttribute("morphTarget"+b)!==d[L]&&p.setAttribute("morphTarget"+b,d[L]),_&&p.getAttribute("morphNormal"+b)!==_[L]&&p.setAttribute("morphNormal"+b,_[L]),i[b]=I,y+=I):(d&&p.hasAttribute("morphTarget"+b)===!0&&p.deleteAttribute("morphTarget"+b),_&&p.hasAttribute("morphNormal"+b)===!0&&p.deleteAttribute("morphNormal"+b),i[b]=0)}let w=p.morphTargetsRelative?1:1-y;f.getUniforms().setValue(r,"morphTargetBaseInfluence",w),f.getUniforms().setValue(r,"morphTargetInfluences",i)}}return{update:h}}function Ju(r,t,e,n){let i=new WeakMap;function s(h){let l=n.render.frame,p=h.geometry,u=t.get(h,p);return i.get(u)!==l&&(t.update(u),i.set(u,l)),h.isInstancedMesh&&(h.hasEventListener("dispose",a)===!1&&h.addEventListener("dispose",a),e.update(h.instanceMatrix,34962),h.instanceColor!==null&&e.update(h.instanceColor,34962)),u}function o(){i=new WeakMap}function a(h){let l=h.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:s,dispose:o}}var go=new pe,_o=new es,xo=new lr,vo=new as,Xa=[],qa=[],Za=new Float32Array(16),Ya=new Float32Array(9),Ja=new Float32Array(4);function ui(r,t,e){let n=r[0];if(n<=0||n>0)return r;let i=t*e,s=Xa[i];if(s===void 0&&(s=new Float32Array(i),Xa[i]=s),t!==0){n.toArray(s,0);for(let o=1,a=0;o!==t;++o)a+=e,r[o].toArray(s,a)}return s}function ne(r,t){if(r.length!==t.length)return!1;for(let e=0,n=r.length;e<n;e++)if(r[e]!==t[e])return!1;return!0}function ie(r,t){for(let e=0,n=t.length;e<n;e++)r[e]=t[e]}function us(r,t){let e=qa[t];e===void 0&&(e=new Int32Array(t),qa[t]=e);for(let n=0;n!==t;++n)e[n]=r.allocateTextureUnit();return e}function ju(r,t){let e=this.cache;e[0]!==t&&(r.uniform1f(this.addr,t),e[0]=t)}function $u(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ne(e,t))return;r.uniform2fv(this.addr,t),ie(e,t)}}function Ku(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ne(e,t))return;r.uniform3fv(this.addr,t),ie(e,t)}}function Qu(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ne(e,t))return;r.uniform4fv(this.addr,t),ie(e,t)}}function td(r,t){let e=this.cache,n=t.elements;if(n===void 0){if(ne(e,t))return;r.uniformMatrix2fv(this.addr,!1,t),ie(e,t)}else{if(ne(e,n))return;Ja.set(n),r.uniformMatrix2fv(this.addr,!1,Ja),ie(e,n)}}function ed(r,t){let e=this.cache,n=t.elements;if(n===void 0){if(ne(e,t))return;r.uniformMatrix3fv(this.addr,!1,t),ie(e,t)}else{if(ne(e,n))return;Ya.set(n),r.uniformMatrix3fv(this.addr,!1,Ya),ie(e,n)}}function nd(r,t){let e=this.cache,n=t.elements;if(n===void 0){if(ne(e,t))return;r.uniformMatrix4fv(this.addr,!1,t),ie(e,t)}else{if(ne(e,n))return;Za.set(n),r.uniformMatrix4fv(this.addr,!1,Za),ie(e,n)}}function id(r,t){let e=this.cache;e[0]!==t&&(r.uniform1i(this.addr,t),e[0]=t)}function sd(r,t){let e=this.cache;ne(e,t)||(r.uniform2iv(this.addr,t),ie(e,t))}function rd(r,t){let e=this.cache;ne(e,t)||(r.uniform3iv(this.addr,t),ie(e,t))}function ad(r,t){let e=this.cache;ne(e,t)||(r.uniform4iv(this.addr,t),ie(e,t))}function od(r,t){let e=this.cache;e[0]!==t&&(r.uniform1ui(this.addr,t),e[0]=t)}function ld(r,t){let e=this.cache;ne(e,t)||(r.uniform2uiv(this.addr,t),ie(e,t))}function cd(r,t){let e=this.cache;ne(e,t)||(r.uniform3uiv(this.addr,t),ie(e,t))}function hd(r,t){let e=this.cache;ne(e,t)||(r.uniform4uiv(this.addr,t),ie(e,t))}function ud(r,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture2D(t||go,i)}function dd(r,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||xo,i)}function fd(r,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||vo,i)}function pd(r,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||_o,i)}function md(r){switch(r){case 5126:return ju;case 35664:return $u;case 35665:return Ku;case 35666:return Qu;case 35674:return td;case 35675:return ed;case 35676:return nd;case 5124:case 35670:return id;case 35667:case 35671:return sd;case 35668:case 35672:return rd;case 35669:case 35673:return ad;case 5125:return od;case 36294:return ld;case 36295:return cd;case 36296:return hd;case 35678:case 36198:case 36298:case 36306:case 35682:return ud;case 35679:case 36299:case 36307:return dd;case 35680:case 36300:case 36308:case 36293:return fd;case 36289:case 36303:case 36311:case 36292:return pd}}function gd(r,t){r.uniform1fv(this.addr,t)}function _d(r,t){let e=ui(t,this.size,2);r.uniform2fv(this.addr,e)}function xd(r,t){let e=ui(t,this.size,3);r.uniform3fv(this.addr,e)}function vd(r,t){let e=ui(t,this.size,4);r.uniform4fv(this.addr,e)}function yd(r,t){let e=ui(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,e)}function bd(r,t){let e=ui(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,e)}function wd(r,t){let e=ui(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,e)}function Md(r,t){r.uniform1iv(this.addr,t)}function Sd(r,t){r.uniform2iv(this.addr,t)}function Td(r,t){r.uniform3iv(this.addr,t)}function Ad(r,t){r.uniform4iv(this.addr,t)}function Ed(r,t){r.uniform1uiv(this.addr,t)}function Cd(r,t){r.uniform2uiv(this.addr,t)}function Rd(r,t){r.uniform3uiv(this.addr,t)}function Pd(r,t){r.uniform4uiv(this.addr,t)}function Ld(r,t,e){let n=this.cache,i=t.length,s=us(e,i);ne(n,s)||(r.uniform1iv(this.addr,s),ie(n,s));for(let o=0;o!==i;++o)e.setTexture2D(t[o]||go,s[o])}function Id(r,t,e){let n=this.cache,i=t.length,s=us(e,i);ne(n,s)||(r.uniform1iv(this.addr,s),ie(n,s));for(let o=0;o!==i;++o)e.setTexture3D(t[o]||xo,s[o])}function Dd(r,t,e){let n=this.cache,i=t.length,s=us(e,i);ne(n,s)||(r.uniform1iv(this.addr,s),ie(n,s));for(let o=0;o!==i;++o)e.setTextureCube(t[o]||vo,s[o])}function zd(r,t,e){let n=this.cache,i=t.length,s=us(e,i);ne(n,s)||(r.uniform1iv(this.addr,s),ie(n,s));for(let o=0;o!==i;++o)e.setTexture2DArray(t[o]||_o,s[o])}function kd(r){switch(r){case 5126:return gd;case 35664:return _d;case 35665:return xd;case 35666:return vd;case 35674:return yd;case 35675:return bd;case 35676:return wd;case 5124:case 35670:return Md;case 35667:case 35671:return Sd;case 35668:case 35672:return Td;case 35669:case 35673:return Ad;case 5125:return Ed;case 36294:return Cd;case 36295:return Rd;case 36296:return Pd;case 35678:case 36198:case 36298:case 36306:case 35682:return Ld;case 35679:case 36299:case 36307:return Id;case 35680:case 36300:case 36308:case 36293:return Dd;case 36289:case 36303:case 36311:case 36292:return zd}}var fr=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.setValue=md(e.type)}},pr=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.size=e.size,this.setValue=kd(e.type)}},mr=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let i=this.seq;for(let s=0,o=i.length;s!==o;++s){let a=i[s];a.setValue(t,e[a.id],n)}}},tr=/(\w+)(\])?(\[|\.)?/g;function ja(r,t){r.seq.push(t),r.map[t.id]=t}function Od(r,t,e){let n=r.name,i=n.length;for(tr.lastIndex=0;;){let s=tr.exec(n),o=tr.lastIndex,a=s[1],h=s[2]==="]",l=s[3];if(h&&(a=a|0),l===void 0||l==="["&&o+2===i){ja(e,l===void 0?new fr(a,r,t):new pr(a,r,t));break}else{let u=e.map[a];u===void 0&&(u=new mr(a),ja(e,u)),e=u}}}var ti=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,35718);for(let i=0;i<n;++i){let s=t.getActiveUniform(e,i),o=t.getUniformLocation(e,s.name);Od(s,o,this)}}setValue(t,e,n,i){let s=this.map[e];s!==void 0&&s.setValue(t,n,i)}setOptional(t,e,n){let i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let s=0,o=e.length;s!==o;++s){let a=e[s],h=n[a.id];h.needsUpdate!==!1&&a.setValue(t,h.value,i)}}static seqWithValue(t,e){let n=[];for(let i=0,s=t.length;i!==s;++i){let o=t[i];o.id in e&&n.push(o)}return n}};function $a(r,t,e){let n=r.createShader(t);return r.shaderSource(n,e),r.compileShader(n),n}var Nd=0;function Fd(r,t){let e=r.split(`
`),n=[],i=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let o=i;o<s;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}function Ud(r){switch(r){case je:return["Linear","( value )"];case Yt:return["sRGB","( value )"];default:return console.warn("THREE.WebGLProgram: Unsupported encoding:",r),["Linear","( value )"]}}function Ka(r,t,e){let n=r.getShaderParameter(t,35713),i=r.getShaderInfoLog(t).trim();if(n&&i==="")return"";let s=/ERROR: 0:(\d+)/.exec(i);if(s){let o=parseInt(s[1]);return e.toUpperCase()+`

`+i+`

`+Fd(r.getShaderSource(t),o)}else return i}function Bd(r,t){let e=Ud(t);return"vec4 "+r+"( vec4 value ) { return LinearTo"+e[0]+e[1]+"; }"}function Vd(r,t){let e;switch(t){case dl:e="Linear";break;case fl:e="Reinhard";break;case pl:e="OptimizedCineon";break;case ml:e="ACESFilmic";break;case gl:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+r+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function Wd(r){return[r.extensionDerivatives||!!r.envMapCubeUVHeight||r.bumpMap||r.tangentSpaceNormalMap||r.clearcoatNormalMap||r.flatShading||r.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(r.extensionFragDepth||r.logarithmicDepthBuffer)&&r.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",r.extensionDrawBuffers&&r.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(r.extensionShaderTextureLOD||r.envMap||r.transmission)&&r.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(xi).join(`
`)}function Hd(r){let t=[];for(let e in r){let n=r[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Gd(r,t){let e={},n=r.getProgramParameter(t,35721);for(let i=0;i<n;i++){let s=r.getActiveAttrib(t,i),o=s.name,a=1;s.type===35674&&(a=2),s.type===35675&&(a=3),s.type===35676&&(a=4),e[o]={type:s.type,location:r.getAttribLocation(t,o),locationSize:a}}return e}function xi(r){return r!==""}function Qa(r,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function to(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Xd=/^[ \t]*#include +<([\w\d./]+)>/gm;function gr(r){return r.replace(Xd,qd)}function qd(r,t){let e=Ot[t];if(e===void 0)throw new Error("Can not resolve #include <"+t+">");return gr(e)}var Zd=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function eo(r){return r.replace(Zd,Yd)}function Yd(r,t,e,n){let i="";for(let s=parseInt(t);s<parseInt(e);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function no(r){let t="precision "+r.precision+` float;
precision `+r.precision+" int;";return r.precision==="highp"?t+=`
#define HIGH_PRECISION`:r.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Jd(r){let t="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===ao?t="SHADOWMAP_TYPE_PCF":r.shadowMapType===Go?t="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===_i&&(t="SHADOWMAP_TYPE_VSM"),t}function jd(r){let t="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case ni:case ii:t="ENVMAP_TYPE_CUBE";break;case cs:t="ENVMAP_TYPE_CUBE_UV";break}return t}function $d(r){let t="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case ii:t="ENVMAP_MODE_REFRACTION";break}return t}function Kd(r){let t="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case co:t="ENVMAP_BLENDING_MULTIPLY";break;case hl:t="ENVMAP_BLENDING_MIX";break;case ul:t="ENVMAP_BLENDING_ADD";break}return t}function Qd(r){let t=r.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function tf(r,t,e,n){let i=r.getContext(),s=e.defines,o=e.vertexShader,a=e.fragmentShader,h=Jd(e),l=jd(e),p=$d(e),u=Kd(e),f=Qd(e),m=e.isWebGL2?"":Wd(e),g=Hd(s),c=i.createProgram(),d,_,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(d=[g].filter(xi).join(`
`),d.length>0&&(d+=`
`),_=[m,g].filter(xi).join(`
`),_.length>0&&(_+=`
`)):(d=[no(e),"#define SHADER_NAME "+e.shaderName,g,e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.supportsVertexTextures?"#define VERTEX_TEXTURES":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+p:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMap&&e.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",e.normalMap&&e.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.displacementMap&&e.supportsVertexTextures?"#define USE_DISPLACEMENTMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularIntensityMap?"#define USE_SPECULARINTENSITYMAP":"",e.specularColorMap?"#define USE_SPECULARCOLORMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEENCOLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEENROUGHNESSMAP":"",e.vertexTangents?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUvs?"#define USE_UV":"",e.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors&&e.isWebGL2?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+h:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(xi).join(`
`),_=[m,no(e),"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+p:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMap&&e.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",e.normalMap&&e.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularIntensityMap?"#define USE_SPECULARINTENSITYMAP":"",e.specularColorMap?"#define USE_SPECULARCOLORMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEENCOLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEENROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.vertexTangents?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUvs?"#define USE_UV":"",e.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+h:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.physicallyCorrectLights?"#define PHYSICALLY_CORRECT_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Ie?"#define TONE_MAPPING":"",e.toneMapping!==Ie?Ot.tonemapping_pars_fragment:"",e.toneMapping!==Ie?Vd("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ot.encodings_pars_fragment,Bd("linearToOutputTexel",e.outputEncoding),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(xi).join(`
`)),o=gr(o),o=Qa(o,e),o=to(o,e),a=gr(a),a=Qa(a,e),a=to(a,e),o=eo(o),a=eo(a),e.isWebGL2&&e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,d=["precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+d,_=["#define varying in",e.glslVersion===Ta?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Ta?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+_);let w=y+d+o,b=y+_+a,M=$a(i,35633,w),L=$a(i,35632,b);if(i.attachShader(c,M),i.attachShader(c,L),e.index0AttributeName!==void 0?i.bindAttribLocation(c,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(c,0,"position"),i.linkProgram(c),r.debug.checkShaderErrors){let z=i.getProgramInfoLog(c).trim(),A=i.getShaderInfoLog(M).trim(),N=i.getShaderInfoLog(L).trim(),v=!0,O=!0;if(i.getProgramParameter(c,35714)===!1){v=!1;let B=Ka(i,M,"vertex"),U=Ka(i,L,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(c,35715)+`

Program Info Log: `+z+`
`+B+`
`+U)}else z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",z):(A===""||N==="")&&(O=!1);O&&(this.diagnostics={runnable:v,programLog:z,vertexShader:{log:A,prefix:d},fragmentShader:{log:N,prefix:_}})}i.deleteShader(M),i.deleteShader(L);let I;this.getUniforms=function(){return I===void 0&&(I=new ti(i,c)),I};let T;return this.getAttributes=function(){return T===void 0&&(T=Gd(i,c)),T},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(c),this.program=void 0},this.name=e.shaderName,this.id=Nd++,this.cacheKey=t,this.usedTimes=1,this.program=c,this.vertexShader=M,this.fragmentShader=L,this}var ef=0,_r=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new xr(t),e.set(t,n)),n}},xr=class{constructor(t){this.id=ef++,this.code=t,this.usedTimes=0}};function nf(r,t,e,n,i,s,o){let a=new ns,h=new _r,l=[],p=i.isWebGL2,u=i.logarithmicDepthBuffer,f=i.vertexTextures,m=i.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function c(T,z,A,N,v){let O=N.fog,B=v.geometry,U=T.isMeshStandardMaterial?N.environment:null,nt=(T.isMeshStandardMaterial?e:t).get(T.envMap||U),G=!!nt&&nt.mapping===cs?nt.image.height:null,J=g[T.type];T.precision!==null&&(m=i.getMaxPrecision(T.precision),m!==T.precision&&console.warn("THREE.WebGLProgram.getParameters:",T.precision,"not supported, using",m,"instead."));let C=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,R=C!==void 0?C.length:0,it=0;B.morphAttributes.position!==void 0&&(it=1),B.morphAttributes.normal!==void 0&&(it=2),B.morphAttributes.color!==void 0&&(it=3);let Z,K,ft,Tt;if(J){let Dt=Ne[J];Z=Dt.vertexShader,K=Dt.fragmentShader}else Z=T.vertexShader,K=T.fragmentShader,h.update(T),ft=h.getVertexShaderID(T),Tt=h.getFragmentShaderID(T);let et=r.getRenderTarget(),At=T.alphaTest>0,Mt=T.clearcoat>0,bt=T.iridescence>0;return{isWebGL2:p,shaderID:J,shaderName:T.type,vertexShader:Z,fragmentShader:K,defines:T.defines,customVertexShaderID:ft,customFragmentShaderID:Tt,isRawShaderMaterial:T.isRawShaderMaterial===!0,glslVersion:T.glslVersion,precision:m,instancing:v.isInstancedMesh===!0,instancingColor:v.isInstancedMesh===!0&&v.instanceColor!==null,supportsVertexTextures:f,outputEncoding:et===null?r.outputEncoding:et.isXRRenderTarget===!0?et.texture.encoding:je,map:!!T.map,matcap:!!T.matcap,envMap:!!nt,envMapMode:nt&&nt.mapping,envMapCubeUVHeight:G,lightMap:!!T.lightMap,aoMap:!!T.aoMap,emissiveMap:!!T.emissiveMap,bumpMap:!!T.bumpMap,normalMap:!!T.normalMap,objectSpaceNormalMap:T.normalMapType===Ol,tangentSpaceNormalMap:T.normalMapType===kl,decodeVideoTexture:!!T.map&&T.map.isVideoTexture===!0&&T.map.encoding===Yt,clearcoat:Mt,clearcoatMap:Mt&&!!T.clearcoatMap,clearcoatRoughnessMap:Mt&&!!T.clearcoatRoughnessMap,clearcoatNormalMap:Mt&&!!T.clearcoatNormalMap,iridescence:bt,iridescenceMap:bt&&!!T.iridescenceMap,iridescenceThicknessMap:bt&&!!T.iridescenceThicknessMap,displacementMap:!!T.displacementMap,roughnessMap:!!T.roughnessMap,metalnessMap:!!T.metalnessMap,specularMap:!!T.specularMap,specularIntensityMap:!!T.specularIntensityMap,specularColorMap:!!T.specularColorMap,opaque:T.transparent===!1&&T.blending===Kn,alphaMap:!!T.alphaMap,alphaTest:At,gradientMap:!!T.gradientMap,sheen:T.sheen>0,sheenColorMap:!!T.sheenColorMap,sheenRoughnessMap:!!T.sheenRoughnessMap,transmission:T.transmission>0,transmissionMap:!!T.transmissionMap,thicknessMap:!!T.thicknessMap,combine:T.combine,vertexTangents:!!T.normalMap&&!!B.attributes.tangent,vertexColors:T.vertexColors,vertexAlphas:T.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,vertexUvs:!!T.map||!!T.bumpMap||!!T.normalMap||!!T.specularMap||!!T.alphaMap||!!T.emissiveMap||!!T.roughnessMap||!!T.metalnessMap||!!T.clearcoatMap||!!T.clearcoatRoughnessMap||!!T.clearcoatNormalMap||!!T.iridescenceMap||!!T.iridescenceThicknessMap||!!T.displacementMap||!!T.transmissionMap||!!T.thicknessMap||!!T.specularIntensityMap||!!T.specularColorMap||!!T.sheenColorMap||!!T.sheenRoughnessMap,uvsVertexOnly:!(!!T.map||!!T.bumpMap||!!T.normalMap||!!T.specularMap||!!T.alphaMap||!!T.emissiveMap||!!T.roughnessMap||!!T.metalnessMap||!!T.clearcoatNormalMap||!!T.iridescenceMap||!!T.iridescenceThicknessMap||T.transmission>0||!!T.transmissionMap||!!T.thicknessMap||!!T.specularIntensityMap||!!T.specularColorMap||T.sheen>0||!!T.sheenColorMap||!!T.sheenRoughnessMap)&&!!T.displacementMap,fog:!!O,useFog:T.fog===!0,fogExp2:O&&O.isFogExp2,flatShading:!!T.flatShading,sizeAttenuation:T.sizeAttenuation,logarithmicDepthBuffer:u,skinning:v.isSkinnedMesh===!0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:R,morphTextureStride:it,numDirLights:z.directional.length,numPointLights:z.point.length,numSpotLights:z.spot.length,numSpotLightMaps:z.spotLightMap.length,numRectAreaLights:z.rectArea.length,numHemiLights:z.hemi.length,numDirLightShadows:z.directionalShadowMap.length,numPointLightShadows:z.pointShadowMap.length,numSpotLightShadows:z.spotShadowMap.length,numSpotLightShadowsWithMaps:z.numSpotLightShadowsWithMaps,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:T.dithering,shadowMapEnabled:r.shadowMap.enabled&&A.length>0,shadowMapType:r.shadowMap.type,toneMapping:T.toneMapped?r.toneMapping:Ie,physicallyCorrectLights:r.physicallyCorrectLights,premultipliedAlpha:T.premultipliedAlpha,doubleSided:T.side===Fe,flipSided:T.side===Te,useDepthPacking:!!T.depthPacking,depthPacking:T.depthPacking||0,index0AttributeName:T.index0AttributeName,extensionDerivatives:T.extensions&&T.extensions.derivatives,extensionFragDepth:T.extensions&&T.extensions.fragDepth,extensionDrawBuffers:T.extensions&&T.extensions.drawBuffers,extensionShaderTextureLOD:T.extensions&&T.extensions.shaderTextureLOD,rendererExtensionFragDepth:p||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:p||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:p||n.has("EXT_shader_texture_lod"),customProgramCacheKey:T.customProgramCacheKey()}}function d(T){let z=[];if(T.shaderID?z.push(T.shaderID):(z.push(T.customVertexShaderID),z.push(T.customFragmentShaderID)),T.defines!==void 0)for(let A in T.defines)z.push(A),z.push(T.defines[A]);return T.isRawShaderMaterial===!1&&(_(z,T),y(z,T),z.push(r.outputEncoding)),z.push(T.customProgramCacheKey),z.join()}function _(T,z){T.push(z.precision),T.push(z.outputEncoding),T.push(z.envMapMode),T.push(z.envMapCubeUVHeight),T.push(z.combine),T.push(z.vertexUvs),T.push(z.fogExp2),T.push(z.sizeAttenuation),T.push(z.morphTargetsCount),T.push(z.morphAttributeCount),T.push(z.numDirLights),T.push(z.numPointLights),T.push(z.numSpotLights),T.push(z.numSpotLightMaps),T.push(z.numHemiLights),T.push(z.numRectAreaLights),T.push(z.numDirLightShadows),T.push(z.numPointLightShadows),T.push(z.numSpotLightShadows),T.push(z.numSpotLightShadowsWithMaps),T.push(z.shadowMapType),T.push(z.toneMapping),T.push(z.numClippingPlanes),T.push(z.numClipIntersection),T.push(z.depthPacking)}function y(T,z){a.disableAll(),z.isWebGL2&&a.enable(0),z.supportsVertexTextures&&a.enable(1),z.instancing&&a.enable(2),z.instancingColor&&a.enable(3),z.map&&a.enable(4),z.matcap&&a.enable(5),z.envMap&&a.enable(6),z.lightMap&&a.enable(7),z.aoMap&&a.enable(8),z.emissiveMap&&a.enable(9),z.bumpMap&&a.enable(10),z.normalMap&&a.enable(11),z.objectSpaceNormalMap&&a.enable(12),z.tangentSpaceNormalMap&&a.enable(13),z.clearcoat&&a.enable(14),z.clearcoatMap&&a.enable(15),z.clearcoatRoughnessMap&&a.enable(16),z.clearcoatNormalMap&&a.enable(17),z.iridescence&&a.enable(18),z.iridescenceMap&&a.enable(19),z.iridescenceThicknessMap&&a.enable(20),z.displacementMap&&a.enable(21),z.specularMap&&a.enable(22),z.roughnessMap&&a.enable(23),z.metalnessMap&&a.enable(24),z.gradientMap&&a.enable(25),z.alphaMap&&a.enable(26),z.alphaTest&&a.enable(27),z.vertexColors&&a.enable(28),z.vertexAlphas&&a.enable(29),z.vertexUvs&&a.enable(30),z.vertexTangents&&a.enable(31),z.uvsVertexOnly&&a.enable(32),T.push(a.mask),a.disableAll(),z.fog&&a.enable(0),z.useFog&&a.enable(1),z.flatShading&&a.enable(2),z.logarithmicDepthBuffer&&a.enable(3),z.skinning&&a.enable(4),z.morphTargets&&a.enable(5),z.morphNormals&&a.enable(6),z.morphColors&&a.enable(7),z.premultipliedAlpha&&a.enable(8),z.shadowMapEnabled&&a.enable(9),z.physicallyCorrectLights&&a.enable(10),z.doubleSided&&a.enable(11),z.flipSided&&a.enable(12),z.useDepthPacking&&a.enable(13),z.dithering&&a.enable(14),z.specularIntensityMap&&a.enable(15),z.specularColorMap&&a.enable(16),z.transmission&&a.enable(17),z.transmissionMap&&a.enable(18),z.thicknessMap&&a.enable(19),z.sheen&&a.enable(20),z.sheenColorMap&&a.enable(21),z.sheenRoughnessMap&&a.enable(22),z.decodeVideoTexture&&a.enable(23),z.opaque&&a.enable(24),T.push(a.mask)}function w(T){let z=g[T.type],A;if(z){let N=Ne[z];A=$l.clone(N.uniforms)}else A=T.uniforms;return A}function b(T,z){let A;for(let N=0,v=l.length;N<v;N++){let O=l[N];if(O.cacheKey===z){A=O,++A.usedTimes;break}}return A===void 0&&(A=new tf(r,z,T,s),l.push(A)),A}function M(T){if(--T.usedTimes===0){let z=l.indexOf(T);l[z]=l[l.length-1],l.pop(),T.destroy()}}function L(T){h.remove(T)}function I(){h.dispose()}return{getParameters:c,getProgramCacheKey:d,getUniforms:w,acquireProgram:b,releaseProgram:M,releaseShaderCache:L,programs:l,dispose:I}}function sf(){let r=new WeakMap;function t(s){let o=r.get(s);return o===void 0&&(o={},r.set(s,o)),o}function e(s){r.delete(s)}function n(s,o,a){r.get(s)[o]=a}function i(){r=new WeakMap}return{get:t,remove:e,update:n,dispose:i}}function rf(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.z!==t.z?r.z-t.z:r.id-t.id}function io(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function so(){let r=[],t=0,e=[],n=[],i=[];function s(){t=0,e.length=0,n.length=0,i.length=0}function o(u,f,m,g,c,d){let _=r[t];return _===void 0?(_={id:u.id,object:u,geometry:f,material:m,groupOrder:g,renderOrder:u.renderOrder,z:c,group:d},r[t]=_):(_.id=u.id,_.object=u,_.geometry=f,_.material=m,_.groupOrder=g,_.renderOrder=u.renderOrder,_.z=c,_.group=d),t++,_}function a(u,f,m,g,c,d){let _=o(u,f,m,g,c,d);m.transmission>0?n.push(_):m.transparent===!0?i.push(_):e.push(_)}function h(u,f,m,g,c,d){let _=o(u,f,m,g,c,d);m.transmission>0?n.unshift(_):m.transparent===!0?i.unshift(_):e.unshift(_)}function l(u,f){e.length>1&&e.sort(u||rf),n.length>1&&n.sort(f||io),i.length>1&&i.sort(f||io)}function p(){for(let u=t,f=r.length;u<f;u++){let m=r[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:n,transparent:i,init:s,push:a,unshift:h,finish:p,sort:l}}function af(){let r=new WeakMap;function t(n,i){let s=r.get(n),o;return s===void 0?(o=new so,r.set(n,[o])):i>=s.length?(o=new so,s.push(o)):o=s[i],o}function e(){r=new WeakMap}return{get:t,dispose:e}}function of(){let r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new $,color:new Xt};break;case"SpotLight":e={position:new $,direction:new $,color:new Xt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new $,color:new Xt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new $,skyColor:new Xt,groundColor:new Xt};break;case"RectAreaLight":e={color:new Xt,position:new $,halfWidth:new $,halfHeight:new $};break}return r[t.id]=e,e}}}function lf(){let r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new zt};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new zt};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new zt,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=e,e}}}var cf=0;function hf(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function uf(r,t){let e=new of,n=lf(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0};for(let p=0;p<9;p++)i.probe.push(new $);let s=new $,o=new ee,a=new ee;function h(p,u){let f=0,m=0,g=0;for(let N=0;N<9;N++)i.probe[N].set(0,0,0);let c=0,d=0,_=0,y=0,w=0,b=0,M=0,L=0,I=0,T=0;p.sort(hf);let z=u!==!0?Math.PI:1;for(let N=0,v=p.length;N<v;N++){let O=p[N],B=O.color,U=O.intensity,nt=O.distance,G=O.shadow&&O.shadow.map?O.shadow.map.texture:null;if(O.isAmbientLight)f+=B.r*U*z,m+=B.g*U*z,g+=B.b*U*z;else if(O.isLightProbe)for(let J=0;J<9;J++)i.probe[J].addScaledVector(O.sh.coefficients[J],U);else if(O.isDirectionalLight){let J=e.get(O);if(J.color.copy(O.color).multiplyScalar(O.intensity*z),O.castShadow){let C=O.shadow,R=n.get(O);R.shadowBias=C.bias,R.shadowNormalBias=C.normalBias,R.shadowRadius=C.radius,R.shadowMapSize=C.mapSize,i.directionalShadow[c]=R,i.directionalShadowMap[c]=G,i.directionalShadowMatrix[c]=O.shadow.matrix,b++}i.directional[c]=J,c++}else if(O.isSpotLight){let J=e.get(O);J.position.setFromMatrixPosition(O.matrixWorld),J.color.copy(B).multiplyScalar(U*z),J.distance=nt,J.coneCos=Math.cos(O.angle),J.penumbraCos=Math.cos(O.angle*(1-O.penumbra)),J.decay=O.decay,i.spot[_]=J;let C=O.shadow;if(O.map&&(i.spotLightMap[I]=O.map,I++,C.updateMatrices(O),O.castShadow&&T++),i.spotLightMatrix[_]=C.matrix,O.castShadow){let R=n.get(O);R.shadowBias=C.bias,R.shadowNormalBias=C.normalBias,R.shadowRadius=C.radius,R.shadowMapSize=C.mapSize,i.spotShadow[_]=R,i.spotShadowMap[_]=G,L++}_++}else if(O.isRectAreaLight){let J=e.get(O);J.color.copy(B).multiplyScalar(U),J.halfWidth.set(O.width*.5,0,0),J.halfHeight.set(0,O.height*.5,0),i.rectArea[y]=J,y++}else if(O.isPointLight){let J=e.get(O);if(J.color.copy(O.color).multiplyScalar(O.intensity*z),J.distance=O.distance,J.decay=O.decay,O.castShadow){let C=O.shadow,R=n.get(O);R.shadowBias=C.bias,R.shadowNormalBias=C.normalBias,R.shadowRadius=C.radius,R.shadowMapSize=C.mapSize,R.shadowCameraNear=C.camera.near,R.shadowCameraFar=C.camera.far,i.pointShadow[d]=R,i.pointShadowMap[d]=G,i.pointShadowMatrix[d]=O.shadow.matrix,M++}i.point[d]=J,d++}else if(O.isHemisphereLight){let J=e.get(O);J.skyColor.copy(O.color).multiplyScalar(U*z),J.groundColor.copy(O.groundColor).multiplyScalar(U*z),i.hemi[w]=J,w++}}y>0&&(t.isWebGL2||r.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=_t.LTC_FLOAT_1,i.rectAreaLTC2=_t.LTC_FLOAT_2):r.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=_t.LTC_HALF_1,i.rectAreaLTC2=_t.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=f,i.ambient[1]=m,i.ambient[2]=g;let A=i.hash;(A.directionalLength!==c||A.pointLength!==d||A.spotLength!==_||A.rectAreaLength!==y||A.hemiLength!==w||A.numDirectionalShadows!==b||A.numPointShadows!==M||A.numSpotShadows!==L||A.numSpotMaps!==I)&&(i.directional.length=c,i.spot.length=_,i.rectArea.length=y,i.point.length=d,i.hemi.length=w,i.directionalShadow.length=b,i.directionalShadowMap.length=b,i.pointShadow.length=M,i.pointShadowMap.length=M,i.spotShadow.length=L,i.spotShadowMap.length=L,i.directionalShadowMatrix.length=b,i.pointShadowMatrix.length=M,i.spotLightMatrix.length=L+I-T,i.spotLightMap.length=I,i.numSpotLightShadowsWithMaps=T,A.directionalLength=c,A.pointLength=d,A.spotLength=_,A.rectAreaLength=y,A.hemiLength=w,A.numDirectionalShadows=b,A.numPointShadows=M,A.numSpotShadows=L,A.numSpotMaps=I,i.version=cf++)}function l(p,u){let f=0,m=0,g=0,c=0,d=0,_=u.matrixWorldInverse;for(let y=0,w=p.length;y<w;y++){let b=p[y];if(b.isDirectionalLight){let M=i.directional[f];M.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(_),f++}else if(b.isSpotLight){let M=i.spot[g];M.position.setFromMatrixPosition(b.matrixWorld),M.position.applyMatrix4(_),M.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(_),g++}else if(b.isRectAreaLight){let M=i.rectArea[c];M.position.setFromMatrixPosition(b.matrixWorld),M.position.applyMatrix4(_),a.identity(),o.copy(b.matrixWorld),o.premultiply(_),a.extractRotation(o),M.halfWidth.set(b.width*.5,0,0),M.halfHeight.set(0,b.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),c++}else if(b.isPointLight){let M=i.point[m];M.position.setFromMatrixPosition(b.matrixWorld),M.position.applyMatrix4(_),m++}else if(b.isHemisphereLight){let M=i.hemi[d];M.direction.setFromMatrixPosition(b.matrixWorld),M.direction.transformDirection(_),d++}}}return{setup:h,setupView:l,state:i}}function ro(r,t){let e=new uf(r,t),n=[],i=[];function s(){n.length=0,i.length=0}function o(u){n.push(u)}function a(u){i.push(u)}function h(u){e.setup(n,u)}function l(u){e.setupView(n,u)}return{init:s,state:{lightsArray:n,shadowsArray:i,lights:e},setupLights:h,setupLightsView:l,pushLight:o,pushShadow:a}}function df(r,t){let e=new WeakMap;function n(s,o=0){let a=e.get(s),h;return a===void 0?(h=new ro(r,t),e.set(s,[h])):o>=a.length?(h=new ro(r,t),a.push(h)):h=a[o],h}function i(){e=new WeakMap}return{get:n,dispose:i}}var vr=class extends ri{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Dl,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},yr=class extends ri{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.referencePosition=new $,this.nearDistance=1,this.farDistance=1e3,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.referencePosition.copy(t.referencePosition),this.nearDistance=t.nearDistance,this.farDistance=t.farDistance,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},ff=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,pf=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function mf(r,t,e){let n=new os,i=new zt,s=new zt,o=new te,a=new vr({depthPacking:zl}),h=new yr,l={},p=e.maxTextureSize,u={0:Te,1:ei,2:Fe},f=new ye({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new zt},radius:{value:4}},vertexShader:ff,fragmentShader:pf}),m=f.clone();m.defines.HORIZONTAL_PASS=1;let g=new $e;g.setAttribute("position",new Ae(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let c=new fe(g,f),d=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ao,this.render=function(b,M,L){if(d.enabled===!1||d.autoUpdate===!1&&d.needsUpdate===!1||b.length===0)return;let I=r.getRenderTarget(),T=r.getActiveCubeFace(),z=r.getActiveMipmapLevel(),A=r.state;A.setBlending(hn),A.buffers.color.setClear(1,1,1,1),A.buffers.depth.setTest(!0),A.setScissorTest(!1);for(let N=0,v=b.length;N<v;N++){let O=b[N],B=O.shadow;if(B===void 0){console.warn("THREE.WebGLShadowMap:",O,"has no shadow.");continue}if(B.autoUpdate===!1&&B.needsUpdate===!1)continue;i.copy(B.mapSize);let U=B.getFrameExtents();if(i.multiply(U),s.copy(B.mapSize),(i.x>p||i.y>p)&&(i.x>p&&(s.x=Math.floor(p/U.x),i.x=s.x*U.x,B.mapSize.x=s.x),i.y>p&&(s.y=Math.floor(p/U.y),i.y=s.y*U.y,B.mapSize.y=s.y)),B.map===null){let G=this.type!==_i?{minFilter:jt,magFilter:jt}:{};B.map=new De(i.x,i.y,G),B.map.texture.name=O.name+".shadowMap",B.camera.updateProjectionMatrix()}r.setRenderTarget(B.map),r.clear();let nt=B.getViewportCount();for(let G=0;G<nt;G++){let J=B.getViewport(G);o.set(s.x*J.x,s.y*J.y,s.x*J.z,s.y*J.w),A.viewport(o),B.updateMatrices(O,G),n=B.getFrustum(),w(M,L,B.camera,O,this.type)}B.isPointLightShadow!==!0&&this.type===_i&&_(B,L),B.needsUpdate=!1}d.needsUpdate=!1,r.setRenderTarget(I,T,z)};function _(b,M){let L=t.update(c);f.defines.VSM_SAMPLES!==b.blurSamples&&(f.defines.VSM_SAMPLES=b.blurSamples,m.defines.VSM_SAMPLES=b.blurSamples,f.needsUpdate=!0,m.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new De(i.x,i.y)),f.uniforms.shadow_pass.value=b.map.texture,f.uniforms.resolution.value=b.mapSize,f.uniforms.radius.value=b.radius,r.setRenderTarget(b.mapPass),r.clear(),r.renderBufferDirect(M,null,L,f,c,null),m.uniforms.shadow_pass.value=b.mapPass.texture,m.uniforms.resolution.value=b.mapSize,m.uniforms.radius.value=b.radius,r.setRenderTarget(b.map),r.clear(),r.renderBufferDirect(M,null,L,m,c,null)}function y(b,M,L,I,T,z){let A=null,N=L.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(N!==void 0?A=N:A=L.isPointLight===!0?h:a,r.localClippingEnabled&&M.clipShadows===!0&&Array.isArray(M.clippingPlanes)&&M.clippingPlanes.length!==0||M.displacementMap&&M.displacementScale!==0||M.alphaMap&&M.alphaTest>0){let v=A.uuid,O=M.uuid,B=l[v];B===void 0&&(B={},l[v]=B);let U=B[O];U===void 0&&(U=A.clone(),B[O]=U),A=U}return A.visible=M.visible,A.wireframe=M.wireframe,z===_i?A.side=M.shadowSide!==null?M.shadowSide:M.side:A.side=M.shadowSide!==null?M.shadowSide:u[M.side],A.alphaMap=M.alphaMap,A.alphaTest=M.alphaTest,A.clipShadows=M.clipShadows,A.clippingPlanes=M.clippingPlanes,A.clipIntersection=M.clipIntersection,A.displacementMap=M.displacementMap,A.displacementScale=M.displacementScale,A.displacementBias=M.displacementBias,A.wireframeLinewidth=M.wireframeLinewidth,A.linewidth=M.linewidth,L.isPointLight===!0&&A.isMeshDistanceMaterial===!0&&(A.referencePosition.setFromMatrixPosition(L.matrixWorld),A.nearDistance=I,A.farDistance=T),A}function w(b,M,L,I,T){if(b.visible===!1)return;if(b.layers.test(M.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&T===_i)&&(!b.frustumCulled||n.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,b.matrixWorld);let N=t.update(b),v=b.material;if(Array.isArray(v)){let O=N.groups;for(let B=0,U=O.length;B<U;B++){let nt=O[B],G=v[nt.materialIndex];if(G&&G.visible){let J=y(b,G,I,L.near,L.far,T);r.renderBufferDirect(L,null,N,J,b,nt)}}}else if(v.visible){let O=y(b,v,I,L.near,L.far,T);r.renderBufferDirect(L,null,N,O,b,null)}}let A=b.children;for(let N=0,v=A.length;N<v;N++)w(A[N],M,L,I,T)}}function gf(r,t,e){let n=e.isWebGL2;function i(){let W=!1,vt=new te,mt=null,lt=new te(0,0,0,0);return{setMask:function(gt){mt!==gt&&!W&&(r.colorMask(gt,gt,gt,gt),mt=gt)},setLocked:function(gt){W=gt},setClear:function(gt,Pt,Gt,Jt,Qe){Qe===!0&&(gt*=Jt,Pt*=Jt,Gt*=Jt),vt.set(gt,Pt,Gt,Jt),lt.equals(vt)===!1&&(r.clearColor(gt,Pt,Gt,Jt),lt.copy(vt))},reset:function(){W=!1,mt=null,lt.set(-1,0,0,0)}}}function s(){let W=!1,vt=null,mt=null,lt=null;return{setTest:function(gt){gt?At(2929):Mt(2929)},setMask:function(gt){vt!==gt&&!W&&(r.depthMask(gt),vt=gt)},setFunc:function(gt){if(mt!==gt){switch(gt){case il:r.depthFunc(512);break;case sl:r.depthFunc(519);break;case rl:r.depthFunc(513);break;case er:r.depthFunc(515);break;case al:r.depthFunc(514);break;case ol:r.depthFunc(518);break;case ll:r.depthFunc(516);break;case cl:r.depthFunc(517);break;default:r.depthFunc(515)}mt=gt}},setLocked:function(gt){W=gt},setClear:function(gt){lt!==gt&&(r.clearDepth(gt),lt=gt)},reset:function(){W=!1,vt=null,mt=null,lt=null}}}function o(){let W=!1,vt=null,mt=null,lt=null,gt=null,Pt=null,Gt=null,Jt=null,Qe=null;return{setTest:function(qt){W||(qt?At(2960):Mt(2960))},setMask:function(qt){vt!==qt&&!W&&(r.stencilMask(qt),vt=qt)},setFunc:function(qt,Ve,be){(mt!==qt||lt!==Ve||gt!==be)&&(r.stencilFunc(qt,Ve,be),mt=qt,lt=Ve,gt=be)},setOp:function(qt,Ve,be){(Pt!==qt||Gt!==Ve||Jt!==be)&&(r.stencilOp(qt,Ve,be),Pt=qt,Gt=Ve,Jt=be)},setLocked:function(qt){W=qt},setClear:function(qt){Qe!==qt&&(r.clearStencil(qt),Qe=qt)},reset:function(){W=!1,vt=null,mt=null,lt=null,gt=null,Pt=null,Gt=null,Jt=null,Qe=null}}}let a=new i,h=new s,l=new o,p=new WeakMap,u=new WeakMap,f={},m={},g=new WeakMap,c=[],d=null,_=!1,y=null,w=null,b=null,M=null,L=null,I=null,T=null,z=!1,A=null,N=null,v=null,O=null,B=null,U=r.getParameter(35661),nt=!1,G=0,J=r.getParameter(7938);J.indexOf("WebGL")!==-1?(G=parseFloat(/^WebGL (\d)/.exec(J)[1]),nt=G>=1):J.indexOf("OpenGL ES")!==-1&&(G=parseFloat(/^OpenGL ES (\d)/.exec(J)[1]),nt=G>=2);let C=null,R={},it=r.getParameter(3088),Z=r.getParameter(2978),K=new te().fromArray(it),ft=new te().fromArray(Z);function Tt(W,vt,mt){let lt=new Uint8Array(4),gt=r.createTexture();r.bindTexture(W,gt),r.texParameteri(W,10241,9728),r.texParameteri(W,10240,9728);for(let Pt=0;Pt<mt;Pt++)r.texImage2D(vt+Pt,0,6408,1,1,0,6408,5121,lt);return gt}let et={};et[3553]=Tt(3553,3553,1),et[34067]=Tt(34067,34069,6),a.setClear(0,0,0,1),h.setClear(1),l.setClear(0),At(2929),h.setFunc(er),P(!1),V(qr),At(2884),Q(hn);function At(W){f[W]!==!0&&(r.enable(W),f[W]=!0)}function Mt(W){f[W]!==!1&&(r.disable(W),f[W]=!1)}function bt(W,vt){return m[W]!==vt?(r.bindFramebuffer(W,vt),m[W]=vt,n&&(W===36009&&(m[36160]=vt),W===36160&&(m[36009]=vt)),!0):!1}function xt(W,vt){let mt=c,lt=!1;if(W)if(mt=g.get(vt),mt===void 0&&(mt=[],g.set(vt,mt)),W.isWebGLMultipleRenderTargets){let gt=W.texture;if(mt.length!==gt.length||mt[0]!==36064){for(let Pt=0,Gt=gt.length;Pt<Gt;Pt++)mt[Pt]=36064+Pt;mt.length=gt.length,lt=!0}}else mt[0]!==36064&&(mt[0]=36064,lt=!0);else mt[0]!==1029&&(mt[0]=1029,lt=!0);lt&&(e.isWebGL2?r.drawBuffers(mt):t.get("WEBGL_draw_buffers").drawBuffersWEBGL(mt))}function Dt(W){return d!==W?(r.useProgram(W),d=W,!0):!1}let x={[Jn]:32774,[qo]:32778,[Zo]:32779};if(n)x[jr]=32775,x[$r]=32776;else{let W=t.get("EXT_blend_minmax");W!==null&&(x[jr]=W.MIN_EXT,x[$r]=W.MAX_EXT)}let X={[Yo]:0,[Jo]:1,[jo]:768,[oo]:770,[nl]:776,[tl]:774,[Ko]:772,[$o]:769,[lo]:771,[el]:775,[Qo]:773};function Q(W,vt,mt,lt,gt,Pt,Gt,Jt){if(W===hn){_===!0&&(Mt(3042),_=!1);return}if(_===!1&&(At(3042),_=!0),W!==Xo){if(W!==y||Jt!==z){if((w!==Jn||L!==Jn)&&(r.blendEquation(32774),w=Jn,L=Jn),Jt)switch(W){case Kn:r.blendFuncSeparate(1,771,1,771);break;case Zr:r.blendFunc(1,1);break;case Yr:r.blendFuncSeparate(0,769,0,1);break;case Jr:r.blendFuncSeparate(0,768,0,770);break;default:console.error("THREE.WebGLState: Invalid blending: ",W);break}else switch(W){case Kn:r.blendFuncSeparate(770,771,1,771);break;case Zr:r.blendFunc(770,1);break;case Yr:r.blendFuncSeparate(0,769,0,1);break;case Jr:r.blendFunc(0,768);break;default:console.error("THREE.WebGLState: Invalid blending: ",W);break}b=null,M=null,I=null,T=null,y=W,z=Jt}return}gt=gt||vt,Pt=Pt||mt,Gt=Gt||lt,(vt!==w||gt!==L)&&(r.blendEquationSeparate(x[vt],x[gt]),w=vt,L=gt),(mt!==b||lt!==M||Pt!==I||Gt!==T)&&(r.blendFuncSeparate(X[mt],X[lt],X[Pt],X[Gt]),b=mt,M=lt,I=Pt,T=Gt),y=W,z=null}function k(W,vt){W.side===Fe?Mt(2884):At(2884);let mt=W.side===Te;vt&&(mt=!mt),P(mt),W.blending===Kn&&W.transparent===!1?Q(hn):Q(W.blending,W.blendEquation,W.blendSrc,W.blendDst,W.blendEquationAlpha,W.blendSrcAlpha,W.blendDstAlpha,W.premultipliedAlpha),h.setFunc(W.depthFunc),h.setTest(W.depthTest),h.setMask(W.depthWrite),a.setMask(W.colorWrite);let lt=W.stencilWrite;l.setTest(lt),lt&&(l.setMask(W.stencilWriteMask),l.setFunc(W.stencilFunc,W.stencilRef,W.stencilFuncMask),l.setOp(W.stencilFail,W.stencilZFail,W.stencilZPass)),st(W.polygonOffset,W.polygonOffsetFactor,W.polygonOffsetUnits),W.alphaToCoverage===!0?At(32926):Mt(32926)}function P(W){A!==W&&(W?r.frontFace(2304):r.frontFace(2305),A=W)}function V(W){W!==Wo?(At(2884),W!==N&&(W===qr?r.cullFace(1029):W===Ho?r.cullFace(1028):r.cullFace(1032))):Mt(2884),N=W}function rt(W){W!==v&&(nt&&r.lineWidth(W),v=W)}function st(W,vt,mt){W?(At(32823),(O!==vt||B!==mt)&&(r.polygonOffset(vt,mt),O=vt,B=mt)):Mt(32823)}function q(W){W?At(3089):Mt(3089)}function ut(W){W===void 0&&(W=33984+U-1),C!==W&&(r.activeTexture(W),C=W)}function E(W,vt,mt){mt===void 0&&(C===null?mt=33984+U-1:mt=C);let lt=R[mt];lt===void 0&&(lt={type:void 0,texture:void 0},R[mt]=lt),(lt.type!==W||lt.texture!==vt)&&(C!==mt&&(r.activeTexture(mt),C=mt),r.bindTexture(W,vt||et[W]),lt.type=W,lt.texture=vt)}function S(){let W=R[C];W!==void 0&&W.type!==void 0&&(r.bindTexture(W.type,null),W.type=void 0,W.texture=void 0)}function H(){try{r.compressedTexImage2D.apply(r,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function ot(){try{r.texSubImage2D.apply(r,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function ht(){try{r.texSubImage3D.apply(r,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function pt(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function Et(){try{r.texStorage2D.apply(r,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function F(){try{r.texStorage3D.apply(r,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function Y(){try{r.texImage2D.apply(r,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function dt(){try{r.texImage3D.apply(r,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function wt(W){K.equals(W)===!1&&(r.scissor(W.x,W.y,W.z,W.w),K.copy(W))}function yt(W){ft.equals(W)===!1&&(r.viewport(W.x,W.y,W.z,W.w),ft.copy(W))}function St(W,vt){let mt=u.get(vt);mt===void 0&&(mt=new WeakMap,u.set(vt,mt));let lt=mt.get(W);lt===void 0&&(lt=r.getUniformBlockIndex(vt,W.name),mt.set(W,lt))}function Rt(W,vt){let lt=u.get(vt).get(W);p.get(W)!==lt&&(r.uniformBlockBinding(vt,lt,W.__bindingPointIndex),p.set(W,lt))}function Nt(){r.disable(3042),r.disable(2884),r.disable(2929),r.disable(32823),r.disable(3089),r.disable(2960),r.disable(32926),r.blendEquation(32774),r.blendFunc(1,0),r.blendFuncSeparate(1,0,1,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(513),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(519,0,4294967295),r.stencilOp(7680,7680,7680),r.clearStencil(0),r.cullFace(1029),r.frontFace(2305),r.polygonOffset(0,0),r.activeTexture(33984),r.bindFramebuffer(36160,null),n===!0&&(r.bindFramebuffer(36009,null),r.bindFramebuffer(36008,null)),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),f={},C=null,R={},m={},g=new WeakMap,c=[],d=null,_=!1,y=null,w=null,b=null,M=null,L=null,I=null,T=null,z=!1,A=null,N=null,v=null,O=null,B=null,K.set(0,0,r.canvas.width,r.canvas.height),ft.set(0,0,r.canvas.width,r.canvas.height),a.reset(),h.reset(),l.reset()}return{buffers:{color:a,depth:h,stencil:l},enable:At,disable:Mt,bindFramebuffer:bt,drawBuffers:xt,useProgram:Dt,setBlending:Q,setMaterial:k,setFlipSided:P,setCullFace:V,setLineWidth:rt,setPolygonOffset:st,setScissorTest:q,activeTexture:ut,bindTexture:E,unbindTexture:S,compressedTexImage2D:H,texImage2D:Y,texImage3D:dt,updateUBOMapping:St,uniformBlockBinding:Rt,texStorage2D:Et,texStorage3D:F,texSubImage2D:ot,texSubImage3D:ht,compressedTexSubImage2D:pt,scissor:wt,viewport:yt,reset:Nt}}function _f(r,t,e,n,i,s,o){let a=i.isWebGL2,h=i.maxTextures,l=i.maxCubemapSize,p=i.maxTextureSize,u=i.maxSamples,f=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,m=/OculusBrowser/g.test(navigator.userAgent),g=new WeakMap,c,d=new WeakMap,_=!1;try{_=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch(E){}function y(E,S){return _?new OffscreenCanvas(E,S):Ki("canvas")}function w(E,S,H,ot){let ht=1;if((E.width>ot||E.height>ot)&&(ht=ot/Math.max(E.width,E.height)),ht<1||S===!0)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap){let pt=S?or:Math.floor,Et=pt(ht*E.width),F=pt(ht*E.height);c===void 0&&(c=y(Et,F));let Y=H?y(Et,F):c;return Y.width=Et,Y.height=F,Y.getContext("2d").drawImage(E,0,0,Et,F),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+E.width+"x"+E.height+") to ("+Et+"x"+F+")."),Y}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+E.width+"x"+E.height+")."),E;return E}function b(E){return Ea(E.width)&&Ea(E.height)}function M(E){return a?!1:E.wrapS!==ue||E.wrapT!==ue||E.minFilter!==jt&&E.minFilter!==Se}function L(E,S){return E.generateMipmaps&&S&&E.minFilter!==jt&&E.minFilter!==Se}function I(E){r.generateMipmap(E)}function T(E,S,H,ot,ht=!1){if(a===!1)return S;if(E!==null){if(r[E]!==void 0)return r[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let pt=S;return S===6403&&(H===5126&&(pt=33326),H===5131&&(pt=33325),H===5121&&(pt=33321)),S===33319&&(H===5126&&(pt=33328),H===5131&&(pt=33327),H===5121&&(pt=33323)),S===6408&&(H===5126&&(pt=34836),H===5131&&(pt=34842),H===5121&&(pt=ot===Yt&&ht===!1?35907:32856),H===32819&&(pt=32854),H===32820&&(pt=32855)),(pt===33325||pt===33326||pt===33327||pt===33328||pt===34842||pt===34836)&&t.get("EXT_color_buffer_float"),pt}function z(E,S,H){return L(E,H)===!0||E.isFramebufferTexture&&E.minFilter!==jt&&E.minFilter!==Se?Math.log2(Math.max(S.width,S.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?S.mipmaps.length:1}function A(E){return E===jt||E===Kr||E===Qr?9728:9729}function N(E){let S=E.target;S.removeEventListener("dispose",N),O(S),S.isVideoTexture&&g.delete(S)}function v(E){let S=E.target;S.removeEventListener("dispose",v),U(S)}function O(E){let S=n.get(E);if(S.__webglInit===void 0)return;let H=E.source,ot=d.get(H);if(ot){let ht=ot[S.__cacheKey];ht.usedTimes--,ht.usedTimes===0&&B(E),Object.keys(ot).length===0&&d.delete(H)}n.remove(E)}function B(E){let S=n.get(E);r.deleteTexture(S.__webglTexture);let H=E.source,ot=d.get(H);delete ot[S.__cacheKey],o.memory.textures--}function U(E){let S=E.texture,H=n.get(E),ot=n.get(S);if(ot.__webglTexture!==void 0&&(r.deleteTexture(ot.__webglTexture),o.memory.textures--),E.depthTexture&&E.depthTexture.dispose(),E.isWebGLCubeRenderTarget)for(let ht=0;ht<6;ht++)r.deleteFramebuffer(H.__webglFramebuffer[ht]),H.__webglDepthbuffer&&r.deleteRenderbuffer(H.__webglDepthbuffer[ht]);else{if(r.deleteFramebuffer(H.__webglFramebuffer),H.__webglDepthbuffer&&r.deleteRenderbuffer(H.__webglDepthbuffer),H.__webglMultisampledFramebuffer&&r.deleteFramebuffer(H.__webglMultisampledFramebuffer),H.__webglColorRenderbuffer)for(let ht=0;ht<H.__webglColorRenderbuffer.length;ht++)H.__webglColorRenderbuffer[ht]&&r.deleteRenderbuffer(H.__webglColorRenderbuffer[ht]);H.__webglDepthRenderbuffer&&r.deleteRenderbuffer(H.__webglDepthRenderbuffer)}if(E.isWebGLMultipleRenderTargets)for(let ht=0,pt=S.length;ht<pt;ht++){let Et=n.get(S[ht]);Et.__webglTexture&&(r.deleteTexture(Et.__webglTexture),o.memory.textures--),n.remove(S[ht])}n.remove(S),n.remove(E)}let nt=0;function G(){nt=0}function J(){let E=nt;return E>=h&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+h),nt+=1,E}function C(E){let S=[];return S.push(E.wrapS),S.push(E.wrapT),S.push(E.magFilter),S.push(E.minFilter),S.push(E.anisotropy),S.push(E.internalFormat),S.push(E.format),S.push(E.type),S.push(E.generateMipmaps),S.push(E.premultiplyAlpha),S.push(E.flipY),S.push(E.unpackAlignment),S.push(E.encoding),S.join()}function R(E,S){let H=n.get(E);if(E.isVideoTexture&&q(E),E.isRenderTargetTexture===!1&&E.version>0&&H.__version!==E.version){let ot=E.image;if(ot===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ot.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Mt(H,E,S);return}}e.bindTexture(3553,H.__webglTexture,33984+S)}function it(E,S){let H=n.get(E);if(E.version>0&&H.__version!==E.version){Mt(H,E,S);return}e.bindTexture(35866,H.__webglTexture,33984+S)}function Z(E,S){let H=n.get(E);if(E.version>0&&H.__version!==E.version){Mt(H,E,S);return}e.bindTexture(32879,H.__webglTexture,33984+S)}function K(E,S){let H=n.get(E);if(E.version>0&&H.__version!==E.version){bt(H,E,S);return}e.bindTexture(34067,H.__webglTexture,33984+S)}let ft={[sr]:10497,[ue]:33071,[rr]:33648},Tt={[jt]:9728,[Kr]:9984,[Qr]:9986,[Se]:9729,[_l]:9985,[hs]:9987};function et(E,S,H){if(H?(r.texParameteri(E,10242,ft[S.wrapS]),r.texParameteri(E,10243,ft[S.wrapT]),(E===32879||E===35866)&&r.texParameteri(E,32882,ft[S.wrapR]),r.texParameteri(E,10240,Tt[S.magFilter]),r.texParameteri(E,10241,Tt[S.minFilter])):(r.texParameteri(E,10242,33071),r.texParameteri(E,10243,33071),(E===32879||E===35866)&&r.texParameteri(E,32882,33071),(S.wrapS!==ue||S.wrapT!==ue)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),r.texParameteri(E,10240,A(S.magFilter)),r.texParameteri(E,10241,A(S.minFilter)),S.minFilter!==jt&&S.minFilter!==Se&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),t.has("EXT_texture_filter_anisotropic")===!0){let ot=t.get("EXT_texture_filter_anisotropic");if(S.type===Ue&&t.has("OES_texture_float_linear")===!1||a===!1&&S.type===yi&&t.has("OES_texture_half_float_linear")===!1)return;(S.anisotropy>1||n.get(S).__currentAnisotropy)&&(r.texParameterf(E,ot.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,i.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy)}}function At(E,S){let H=!1;E.__webglInit===void 0&&(E.__webglInit=!0,S.addEventListener("dispose",N));let ot=S.source,ht=d.get(ot);ht===void 0&&(ht={},d.set(ot,ht));let pt=C(S);if(pt!==E.__cacheKey){ht[pt]===void 0&&(ht[pt]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,H=!0),ht[pt].usedTimes++;let Et=ht[E.__cacheKey];Et!==void 0&&(ht[E.__cacheKey].usedTimes--,Et.usedTimes===0&&B(S)),E.__cacheKey=pt,E.__webglTexture=ht[pt].texture}return H}function Mt(E,S,H){let ot=3553;S.isDataArrayTexture&&(ot=35866),S.isData3DTexture&&(ot=32879);let ht=At(E,S),pt=S.source;e.bindTexture(ot,E.__webglTexture,33984+H);let Et=n.get(pt);if(pt.version!==Et.__version||ht===!0){e.activeTexture(33984+H),r.pixelStorei(37440,S.flipY),r.pixelStorei(37441,S.premultiplyAlpha),r.pixelStorei(3317,S.unpackAlignment),r.pixelStorei(37443,0);let F=M(S)&&b(S.image)===!1,Y=w(S.image,F,!1,p);Y=ut(S,Y);let dt=b(Y)||a,wt=s.convert(S.format,S.encoding),yt=s.convert(S.type),St=T(S.internalFormat,wt,yt,S.encoding,S.isVideoTexture);et(ot,S,dt);let Rt,Nt=S.mipmaps,W=a&&S.isVideoTexture!==!0,vt=Et.__version===void 0||ht===!0,mt=z(S,Y,dt);if(S.isDepthTexture)St=6402,a?S.type===Ue?St=36012:S.type===vn?St=33190:S.type===Qn?St=35056:St=33189:S.type===Ue&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),S.format===bn&&St===6402&&S.type!==uo&&S.type!==vn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),S.type=vn,yt=s.convert(S.type)),S.format===si&&St===6402&&(St=34041,S.type!==Qn&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),S.type=Qn,yt=s.convert(S.type))),vt&&(W?e.texStorage2D(3553,1,St,Y.width,Y.height):e.texImage2D(3553,0,St,Y.width,Y.height,0,wt,yt,null));else if(S.isDataTexture)if(Nt.length>0&&dt){W&&vt&&e.texStorage2D(3553,mt,St,Nt[0].width,Nt[0].height);for(let lt=0,gt=Nt.length;lt<gt;lt++)Rt=Nt[lt],W?e.texSubImage2D(3553,lt,0,0,Rt.width,Rt.height,wt,yt,Rt.data):e.texImage2D(3553,lt,St,Rt.width,Rt.height,0,wt,yt,Rt.data);S.generateMipmaps=!1}else W?(vt&&e.texStorage2D(3553,mt,St,Y.width,Y.height),e.texSubImage2D(3553,0,0,0,Y.width,Y.height,wt,yt,Y.data)):e.texImage2D(3553,0,St,Y.width,Y.height,0,wt,yt,Y.data);else if(S.isCompressedTexture){W&&vt&&e.texStorage2D(3553,mt,St,Nt[0].width,Nt[0].height);for(let lt=0,gt=Nt.length;lt<gt;lt++)Rt=Nt[lt],S.format!==ve?wt!==null?W?e.compressedTexSubImage2D(3553,lt,0,0,Rt.width,Rt.height,wt,Rt.data):e.compressedTexImage2D(3553,lt,St,Rt.width,Rt.height,0,Rt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):W?e.texSubImage2D(3553,lt,0,0,Rt.width,Rt.height,wt,yt,Rt.data):e.texImage2D(3553,lt,St,Rt.width,Rt.height,0,wt,yt,Rt.data)}else if(S.isDataArrayTexture)W?(vt&&e.texStorage3D(35866,mt,St,Y.width,Y.height,Y.depth),e.texSubImage3D(35866,0,0,0,0,Y.width,Y.height,Y.depth,wt,yt,Y.data)):e.texImage3D(35866,0,St,Y.width,Y.height,Y.depth,0,wt,yt,Y.data);else if(S.isData3DTexture)W?(vt&&e.texStorage3D(32879,mt,St,Y.width,Y.height,Y.depth),e.texSubImage3D(32879,0,0,0,0,Y.width,Y.height,Y.depth,wt,yt,Y.data)):e.texImage3D(32879,0,St,Y.width,Y.height,Y.depth,0,wt,yt,Y.data);else if(S.isFramebufferTexture){if(vt)if(W)e.texStorage2D(3553,mt,St,Y.width,Y.height);else{let lt=Y.width,gt=Y.height;for(let Pt=0;Pt<mt;Pt++)e.texImage2D(3553,Pt,St,lt,gt,0,wt,yt,null),lt>>=1,gt>>=1}}else if(Nt.length>0&&dt){W&&vt&&e.texStorage2D(3553,mt,St,Nt[0].width,Nt[0].height);for(let lt=0,gt=Nt.length;lt<gt;lt++)Rt=Nt[lt],W?e.texSubImage2D(3553,lt,0,0,wt,yt,Rt):e.texImage2D(3553,lt,St,wt,yt,Rt);S.generateMipmaps=!1}else W?(vt&&e.texStorage2D(3553,mt,St,Y.width,Y.height),e.texSubImage2D(3553,0,0,0,wt,yt,Y)):e.texImage2D(3553,0,St,wt,yt,Y);L(S,dt)&&I(ot),Et.__version=pt.version,S.onUpdate&&S.onUpdate(S)}E.__version=S.version}function bt(E,S,H){if(S.image.length!==6)return;let ot=At(E,S),ht=S.source;e.bindTexture(34067,E.__webglTexture,33984+H);let pt=n.get(ht);if(ht.version!==pt.__version||ot===!0){e.activeTexture(33984+H),r.pixelStorei(37440,S.flipY),r.pixelStorei(37441,S.premultiplyAlpha),r.pixelStorei(3317,S.unpackAlignment),r.pixelStorei(37443,0);let Et=S.isCompressedTexture||S.image[0].isCompressedTexture,F=S.image[0]&&S.image[0].isDataTexture,Y=[];for(let lt=0;lt<6;lt++)!Et&&!F?Y[lt]=w(S.image[lt],!1,!0,l):Y[lt]=F?S.image[lt].image:S.image[lt],Y[lt]=ut(S,Y[lt]);let dt=Y[0],wt=b(dt)||a,yt=s.convert(S.format,S.encoding),St=s.convert(S.type),Rt=T(S.internalFormat,yt,St,S.encoding),Nt=a&&S.isVideoTexture!==!0,W=pt.__version===void 0||ot===!0,vt=z(S,dt,wt);et(34067,S,wt);let mt;if(Et){Nt&&W&&e.texStorage2D(34067,vt,Rt,dt.width,dt.height);for(let lt=0;lt<6;lt++){mt=Y[lt].mipmaps;for(let gt=0;gt<mt.length;gt++){let Pt=mt[gt];S.format!==ve?yt!==null?Nt?e.compressedTexSubImage2D(34069+lt,gt,0,0,Pt.width,Pt.height,yt,Pt.data):e.compressedTexImage2D(34069+lt,gt,Rt,Pt.width,Pt.height,0,Pt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Nt?e.texSubImage2D(34069+lt,gt,0,0,Pt.width,Pt.height,yt,St,Pt.data):e.texImage2D(34069+lt,gt,Rt,Pt.width,Pt.height,0,yt,St,Pt.data)}}}else{mt=S.mipmaps,Nt&&W&&(mt.length>0&&vt++,e.texStorage2D(34067,vt,Rt,Y[0].width,Y[0].height));for(let lt=0;lt<6;lt++)if(F){Nt?e.texSubImage2D(34069+lt,0,0,0,Y[lt].width,Y[lt].height,yt,St,Y[lt].data):e.texImage2D(34069+lt,0,Rt,Y[lt].width,Y[lt].height,0,yt,St,Y[lt].data);for(let gt=0;gt<mt.length;gt++){let Gt=mt[gt].image[lt].image;Nt?e.texSubImage2D(34069+lt,gt+1,0,0,Gt.width,Gt.height,yt,St,Gt.data):e.texImage2D(34069+lt,gt+1,Rt,Gt.width,Gt.height,0,yt,St,Gt.data)}}else{Nt?e.texSubImage2D(34069+lt,0,0,0,yt,St,Y[lt]):e.texImage2D(34069+lt,0,Rt,yt,St,Y[lt]);for(let gt=0;gt<mt.length;gt++){let Pt=mt[gt];Nt?e.texSubImage2D(34069+lt,gt+1,0,0,yt,St,Pt.image[lt]):e.texImage2D(34069+lt,gt+1,Rt,yt,St,Pt.image[lt])}}}L(S,wt)&&I(34067),pt.__version=ht.version,S.onUpdate&&S.onUpdate(S)}E.__version=S.version}function xt(E,S,H,ot,ht){let pt=s.convert(H.format,H.encoding),Et=s.convert(H.type),F=T(H.internalFormat,pt,Et,H.encoding);n.get(S).__hasExternalTextures||(ht===32879||ht===35866?e.texImage3D(ht,0,F,S.width,S.height,S.depth,0,pt,Et,null):e.texImage2D(ht,0,F,S.width,S.height,0,pt,Et,null)),e.bindFramebuffer(36160,E),st(S)?f.framebufferTexture2DMultisampleEXT(36160,ot,ht,n.get(H).__webglTexture,0,rt(S)):r.framebufferTexture2D(36160,ot,ht,n.get(H).__webglTexture,0),e.bindFramebuffer(36160,null)}function Dt(E,S,H){if(r.bindRenderbuffer(36161,E),S.depthBuffer&&!S.stencilBuffer){let ot=33189;if(H||st(S)){let ht=S.depthTexture;ht&&ht.isDepthTexture&&(ht.type===Ue?ot=36012:ht.type===vn&&(ot=33190));let pt=rt(S);st(S)?f.renderbufferStorageMultisampleEXT(36161,pt,ot,S.width,S.height):r.renderbufferStorageMultisample(36161,pt,ot,S.width,S.height)}else r.renderbufferStorage(36161,ot,S.width,S.height);r.framebufferRenderbuffer(36160,36096,36161,E)}else if(S.depthBuffer&&S.stencilBuffer){let ot=rt(S);H&&st(S)===!1?r.renderbufferStorageMultisample(36161,ot,35056,S.width,S.height):st(S)?f.renderbufferStorageMultisampleEXT(36161,ot,35056,S.width,S.height):r.renderbufferStorage(36161,34041,S.width,S.height),r.framebufferRenderbuffer(36160,33306,36161,E)}else{let ot=S.isWebGLMultipleRenderTargets===!0?S.texture:[S.texture];for(let ht=0;ht<ot.length;ht++){let pt=ot[ht],Et=s.convert(pt.format,pt.encoding),F=s.convert(pt.type),Y=T(pt.internalFormat,Et,F,pt.encoding),dt=rt(S);H&&st(S)===!1?r.renderbufferStorageMultisample(36161,dt,Y,S.width,S.height):st(S)?f.renderbufferStorageMultisampleEXT(36161,dt,Y,S.width,S.height):r.renderbufferStorage(36161,Y,S.width,S.height)}}r.bindRenderbuffer(36161,null)}function x(E,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(36160,E),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(S.depthTexture).__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),R(S.depthTexture,0);let ot=n.get(S.depthTexture).__webglTexture,ht=rt(S);if(S.depthTexture.format===bn)st(S)?f.framebufferTexture2DMultisampleEXT(36160,36096,3553,ot,0,ht):r.framebufferTexture2D(36160,36096,3553,ot,0);else if(S.depthTexture.format===si)st(S)?f.framebufferTexture2DMultisampleEXT(36160,33306,3553,ot,0,ht):r.framebufferTexture2D(36160,33306,3553,ot,0);else throw new Error("Unknown depthTexture format")}function X(E){let S=n.get(E),H=E.isWebGLCubeRenderTarget===!0;if(E.depthTexture&&!S.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");x(S.__webglFramebuffer,E)}else if(H){S.__webglDepthbuffer=[];for(let ot=0;ot<6;ot++)e.bindFramebuffer(36160,S.__webglFramebuffer[ot]),S.__webglDepthbuffer[ot]=r.createRenderbuffer(),Dt(S.__webglDepthbuffer[ot],E,!1)}else e.bindFramebuffer(36160,S.__webglFramebuffer),S.__webglDepthbuffer=r.createRenderbuffer(),Dt(S.__webglDepthbuffer,E,!1);e.bindFramebuffer(36160,null)}function Q(E,S,H){let ot=n.get(E);S!==void 0&&xt(ot.__webglFramebuffer,E,E.texture,36064,3553),H!==void 0&&X(E)}function k(E){let S=E.texture,H=n.get(E),ot=n.get(S);E.addEventListener("dispose",v),E.isWebGLMultipleRenderTargets!==!0&&(ot.__webglTexture===void 0&&(ot.__webglTexture=r.createTexture()),ot.__version=S.version,o.memory.textures++);let ht=E.isWebGLCubeRenderTarget===!0,pt=E.isWebGLMultipleRenderTargets===!0,Et=b(E)||a;if(ht){H.__webglFramebuffer=[];for(let F=0;F<6;F++)H.__webglFramebuffer[F]=r.createFramebuffer()}else{if(H.__webglFramebuffer=r.createFramebuffer(),pt)if(i.drawBuffers){let F=E.texture;for(let Y=0,dt=F.length;Y<dt;Y++){let wt=n.get(F[Y]);wt.__webglTexture===void 0&&(wt.__webglTexture=r.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&E.samples>0&&st(E)===!1){let F=pt?S:[S];H.__webglMultisampledFramebuffer=r.createFramebuffer(),H.__webglColorRenderbuffer=[],e.bindFramebuffer(36160,H.__webglMultisampledFramebuffer);for(let Y=0;Y<F.length;Y++){let dt=F[Y];H.__webglColorRenderbuffer[Y]=r.createRenderbuffer(),r.bindRenderbuffer(36161,H.__webglColorRenderbuffer[Y]);let wt=s.convert(dt.format,dt.encoding),yt=s.convert(dt.type),St=T(dt.internalFormat,wt,yt,dt.encoding,E.isXRRenderTarget===!0),Rt=rt(E);r.renderbufferStorageMultisample(36161,Rt,St,E.width,E.height),r.framebufferRenderbuffer(36160,36064+Y,36161,H.__webglColorRenderbuffer[Y])}r.bindRenderbuffer(36161,null),E.depthBuffer&&(H.__webglDepthRenderbuffer=r.createRenderbuffer(),Dt(H.__webglDepthRenderbuffer,E,!0)),e.bindFramebuffer(36160,null)}}if(ht){e.bindTexture(34067,ot.__webglTexture),et(34067,S,Et);for(let F=0;F<6;F++)xt(H.__webglFramebuffer[F],E,S,36064,34069+F);L(S,Et)&&I(34067),e.unbindTexture()}else if(pt){let F=E.texture;for(let Y=0,dt=F.length;Y<dt;Y++){let wt=F[Y],yt=n.get(wt);e.bindTexture(3553,yt.__webglTexture),et(3553,wt,Et),xt(H.__webglFramebuffer,E,wt,36064+Y,3553),L(wt,Et)&&I(3553)}e.unbindTexture()}else{let F=3553;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(a?F=E.isWebGL3DRenderTarget?32879:35866:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),e.bindTexture(F,ot.__webglTexture),et(F,S,Et),xt(H.__webglFramebuffer,E,S,36064,F),L(S,Et)&&I(F),e.unbindTexture()}E.depthBuffer&&X(E)}function P(E){let S=b(E)||a,H=E.isWebGLMultipleRenderTargets===!0?E.texture:[E.texture];for(let ot=0,ht=H.length;ot<ht;ot++){let pt=H[ot];if(L(pt,S)){let Et=E.isWebGLCubeRenderTarget?34067:3553,F=n.get(pt).__webglTexture;e.bindTexture(Et,F),I(Et),e.unbindTexture()}}}function V(E){if(a&&E.samples>0&&st(E)===!1){let S=E.isWebGLMultipleRenderTargets?E.texture:[E.texture],H=E.width,ot=E.height,ht=16384,pt=[],Et=E.stencilBuffer?33306:36096,F=n.get(E),Y=E.isWebGLMultipleRenderTargets===!0;if(Y)for(let dt=0;dt<S.length;dt++)e.bindFramebuffer(36160,F.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(36160,36064+dt,36161,null),e.bindFramebuffer(36160,F.__webglFramebuffer),r.framebufferTexture2D(36009,36064+dt,3553,null,0);e.bindFramebuffer(36008,F.__webglMultisampledFramebuffer),e.bindFramebuffer(36009,F.__webglFramebuffer);for(let dt=0;dt<S.length;dt++){pt.push(36064+dt),E.depthBuffer&&pt.push(Et);let wt=F.__ignoreDepthValues!==void 0?F.__ignoreDepthValues:!1;if(wt===!1&&(E.depthBuffer&&(ht|=256),E.stencilBuffer&&(ht|=1024)),Y&&r.framebufferRenderbuffer(36008,36064,36161,F.__webglColorRenderbuffer[dt]),wt===!0&&(r.invalidateFramebuffer(36008,[Et]),r.invalidateFramebuffer(36009,[Et])),Y){let yt=n.get(S[dt]).__webglTexture;r.framebufferTexture2D(36009,36064,3553,yt,0)}r.blitFramebuffer(0,0,H,ot,0,0,H,ot,ht,9728),m&&r.invalidateFramebuffer(36008,pt)}if(e.bindFramebuffer(36008,null),e.bindFramebuffer(36009,null),Y)for(let dt=0;dt<S.length;dt++){e.bindFramebuffer(36160,F.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(36160,36064+dt,36161,F.__webglColorRenderbuffer[dt]);let wt=n.get(S[dt]).__webglTexture;e.bindFramebuffer(36160,F.__webglFramebuffer),r.framebufferTexture2D(36009,36064+dt,3553,wt,0)}e.bindFramebuffer(36009,F.__webglMultisampledFramebuffer)}}function rt(E){return Math.min(u,E.samples)}function st(E){let S=n.get(E);return a&&E.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function q(E){let S=o.render.frame;g.get(E)!==S&&(g.set(E,S),E.update())}function ut(E,S){let H=E.encoding,ot=E.format,ht=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||E.format===ar||H!==je&&(H===Yt?a===!1?t.has("EXT_sRGB")===!0&&ot===ve?(E.format=ar,E.minFilter=Se,E.generateMipmaps=!1):S=Qi.sRGBToLinear(S):(ot!==ve||ht!==Mn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture encoding:",H)),S}this.allocateTextureUnit=J,this.resetTextureUnits=G,this.setTexture2D=R,this.setTexture2DArray=it,this.setTexture3D=Z,this.setTextureCube=K,this.rebindTextures=Q,this.setupRenderTarget=k,this.updateRenderTargetMipmap=P,this.updateMultisampleRenderTarget=V,this.setupDepthRenderbuffer=X,this.setupFrameBufferTexture=xt,this.useMultisampledRTT=st}function xf(r,t,e){let n=e.isWebGL2;function i(s,o=null){let a;if(s===Mn)return 5121;if(s===bl)return 32819;if(s===wl)return 32820;if(s===xl)return 5120;if(s===vl)return 5122;if(s===uo)return 5123;if(s===yl)return 5124;if(s===vn)return 5125;if(s===Ue)return 5126;if(s===yi)return n?5131:(a=t.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(s===Ml)return 6406;if(s===ve)return 6408;if(s===Tl)return 6409;if(s===Al)return 6410;if(s===bn)return 6402;if(s===si)return 34041;if(s===El)return 6403;if(s===Sl)return console.warn("THREE.WebGLRenderer: THREE.RGBFormat has been removed. Use THREE.RGBAFormat instead. https://github.com/mrdoob/three.js/pull/23228"),6408;if(s===ar)return a=t.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(s===Cl)return 36244;if(s===Rl)return 33319;if(s===Pl)return 33320;if(s===Ll)return 36249;if(s===Ms||s===Ss||s===Ts||s===As)if(o===Yt)if(a=t.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(s===Ms)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Ss)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Ts)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===As)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=t.get("WEBGL_compressed_texture_s3tc"),a!==null){if(s===Ms)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Ss)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Ts)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===As)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===ta||s===ea||s===na||s===ia)if(a=t.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(s===ta)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===ea)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===na)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===ia)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Il)return a=t.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===sa||s===ra)if(a=t.get("WEBGL_compressed_texture_etc"),a!==null){if(s===sa)return o===Yt?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(s===ra)return o===Yt?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===aa||s===oa||s===la||s===ca||s===ha||s===ua||s===da||s===fa||s===pa||s===ma||s===ga||s===_a||s===xa||s===va)if(a=t.get("WEBGL_compressed_texture_astc"),a!==null){if(s===aa)return o===Yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===oa)return o===Yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===la)return o===Yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===ca)return o===Yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===ha)return o===Yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===ua)return o===Yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===da)return o===Yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===fa)return o===Yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===pa)return o===Yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===ma)return o===Yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===ga)return o===Yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===_a)return o===Yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===xa)return o===Yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===va)return o===Yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===ya)if(a=t.get("EXT_texture_compression_bptc"),a!==null){if(s===ya)return o===Yt?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT}else return null;return s===Qn?n?34042:(a=t.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):r[s]!==void 0?r[s]:null}return{convert:i}}var br=class extends le{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},$n=class extends ce{constructor(){super(),this.isGroup=!0,this.type="Group"}},vf={type:"move"},vi=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new $n,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new $n,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new $,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new $),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new $n,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new $,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new $),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,s=null,o=null,a=this._targetRay,h=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(let c of t.hand.values()){let d=e.getJointPose(c,n);if(l.joints[c.jointName]===void 0){let y=new $n;y.matrixAutoUpdate=!1,y.visible=!1,l.joints[c.jointName]=y,l.add(y)}let _=l.joints[c.jointName];d!==null&&(_.matrix.fromArray(d.transform.matrix),_.matrix.decompose(_.position,_.rotation,_.scale),_.jointRadius=d.radius),_.visible=d!==null}let p=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=p.position.distanceTo(u.position),m=.02,g=.005;l.inputState.pinching&&f>m+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&f<=m-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else h!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(h.matrix.fromArray(s.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),s.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(s.linearVelocity)):h.hasLinearVelocity=!1,s.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(s.angularVelocity)):h.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(vf)))}return a!==null&&(a.visible=i!==null),h!==null&&(h.visible=s!==null),l!==null&&(l.visible=o!==null),this}},wr=class extends pe{constructor(t,e,n,i,s,o,a,h,l,p){if(p=p!==void 0?p:bn,p!==bn&&p!==si)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&p===bn&&(n=vn),n===void 0&&p===si&&(n=Qn),super(null,i,s,o,a,h,p,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:jt,this.minFilter=h!==void 0?h:jt,this.flipY=!1,this.generateMipmaps=!1}},Mr=class extends Be{constructor(t,e){super();let n=this,i=null,s=1,o=null,a="local-floor",h=null,l=null,p=null,u=null,f=null,m=null,g=e.getContextAttributes(),c=null,d=null,_=[],y=[],w=new le;w.layers.enable(1),w.viewport=new te;let b=new le;b.layers.enable(2),b.viewport=new te;let M=[w,b],L=new br;L.layers.enable(1),L.layers.enable(2);let I=null,T=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(C){let R=_[C];return R===void 0&&(R=new vi,_[C]=R),R.getTargetRaySpace()},this.getControllerGrip=function(C){let R=_[C];return R===void 0&&(R=new vi,_[C]=R),R.getGripSpace()},this.getHand=function(C){let R=_[C];return R===void 0&&(R=new vi,_[C]=R),R.getHandSpace()};function z(C){let R=y.indexOf(C.inputSource);if(R===-1)return;let it=_[R];it!==void 0&&it.dispatchEvent({type:C.type,data:C.inputSource})}function A(){i.removeEventListener("select",z),i.removeEventListener("selectstart",z),i.removeEventListener("selectend",z),i.removeEventListener("squeeze",z),i.removeEventListener("squeezestart",z),i.removeEventListener("squeezeend",z),i.removeEventListener("end",A),i.removeEventListener("inputsourceschange",N);for(let C=0;C<_.length;C++){let R=y[C];R!==null&&(y[C]=null,_[C].disconnect(R))}I=null,T=null,t.setRenderTarget(c),f=null,u=null,p=null,i=null,d=null,J.stop(),n.isPresenting=!1,n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(C){s=C,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(C){a=C,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return h||o},this.setReferenceSpace=function(C){h=C},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return p},this.getFrame=function(){return m},this.getSession=function(){return i},this.setSession=async function(C){if(i=C,i!==null){if(c=t.getRenderTarget(),i.addEventListener("select",z),i.addEventListener("selectstart",z),i.addEventListener("selectend",z),i.addEventListener("squeeze",z),i.addEventListener("squeezestart",z),i.addEventListener("squeezeend",z),i.addEventListener("end",A),i.addEventListener("inputsourceschange",N),g.xrCompatible!==!0&&await e.makeXRCompatible(),i.renderState.layers===void 0||t.capabilities.isWebGL2===!1){let R={antialias:i.renderState.layers===void 0?g.antialias:!0,alpha:g.alpha,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,e,R),i.updateRenderState({baseLayer:f}),d=new De(f.framebufferWidth,f.framebufferHeight,{format:ve,type:Mn,encoding:t.outputEncoding,stencilBuffer:g.stencil})}else{let R=null,it=null,Z=null;g.depth&&(Z=g.stencil?35056:33190,R=g.stencil?si:bn,it=g.stencil?Qn:vn);let K={colorFormat:32856,depthFormat:Z,scaleFactor:s};p=new XRWebGLBinding(i,e),u=p.createProjectionLayer(K),i.updateRenderState({layers:[u]}),d=new De(u.textureWidth,u.textureHeight,{format:ve,type:Mn,depthTexture:new wr(u.textureWidth,u.textureHeight,it,void 0,void 0,void 0,void 0,void 0,void 0,R),stencilBuffer:g.stencil,encoding:t.outputEncoding,samples:g.antialias?4:0});let ft=t.properties.get(d);ft.__ignoreDepthValues=u.ignoreDepthValues}d.isXRRenderTarget=!0,this.setFoveation(1),h=null,o=await i.requestReferenceSpace(a),J.setContext(i),J.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}};function N(C){for(let R=0;R<C.removed.length;R++){let it=C.removed[R],Z=y.indexOf(it);Z>=0&&(y[Z]=null,_[Z].dispatchEvent({type:"disconnected",data:it}))}for(let R=0;R<C.added.length;R++){let it=C.added[R],Z=y.indexOf(it);if(Z===-1){for(let ft=0;ft<_.length;ft++)if(ft>=y.length){y.push(it),Z=ft;break}else if(y[ft]===null){y[ft]=it,Z=ft;break}if(Z===-1)break}let K=_[Z];K&&K.dispatchEvent({type:"connected",data:it})}}let v=new $,O=new $;function B(C,R,it){v.setFromMatrixPosition(R.matrixWorld),O.setFromMatrixPosition(it.matrixWorld);let Z=v.distanceTo(O),K=R.projectionMatrix.elements,ft=it.projectionMatrix.elements,Tt=K[14]/(K[10]-1),et=K[14]/(K[10]+1),At=(K[9]+1)/K[5],Mt=(K[9]-1)/K[5],bt=(K[8]-1)/K[0],xt=(ft[8]+1)/ft[0],Dt=Tt*bt,x=Tt*xt,X=Z/(-bt+xt),Q=X*-bt;R.matrixWorld.decompose(C.position,C.quaternion,C.scale),C.translateX(Q),C.translateZ(X),C.matrixWorld.compose(C.position,C.quaternion,C.scale),C.matrixWorldInverse.copy(C.matrixWorld).invert();let k=Tt+X,P=et+X,V=Dt-Q,rt=x+(Z-Q),st=At*et/P*k,q=Mt*et/P*k;C.projectionMatrix.makePerspective(V,rt,st,q,k,P)}function U(C,R){R===null?C.matrixWorld.copy(C.matrix):C.matrixWorld.multiplyMatrices(R.matrixWorld,C.matrix),C.matrixWorldInverse.copy(C.matrixWorld).invert()}this.updateCamera=function(C){if(i===null)return;L.near=b.near=w.near=C.near,L.far=b.far=w.far=C.far,(I!==L.near||T!==L.far)&&(i.updateRenderState({depthNear:L.near,depthFar:L.far}),I=L.near,T=L.far);let R=C.parent,it=L.cameras;U(L,R);for(let K=0;K<it.length;K++)U(it[K],R);L.matrixWorld.decompose(L.position,L.quaternion,L.scale),C.matrix.copy(L.matrix),C.matrix.decompose(C.position,C.quaternion,C.scale);let Z=C.children;for(let K=0,ft=Z.length;K<ft;K++)Z[K].updateMatrixWorld(!0);it.length===2?B(L,w,b):L.projectionMatrix.copy(w.projectionMatrix)},this.getCamera=function(){return L},this.getFoveation=function(){if(u!==null)return u.fixedFoveation;if(f!==null)return f.fixedFoveation},this.setFoveation=function(C){u!==null&&(u.fixedFoveation=C),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=C)};let nt=null;function G(C,R){if(l=R.getViewerPose(h||o),m=R,l!==null){let it=l.views;f!==null&&(t.setRenderTargetFramebuffer(d,f.framebuffer),t.setRenderTarget(d));let Z=!1;it.length!==L.cameras.length&&(L.cameras.length=0,Z=!0);for(let K=0;K<it.length;K++){let ft=it[K],Tt=null;if(f!==null)Tt=f.getViewport(ft);else{let At=p.getViewSubImage(u,ft);Tt=At.viewport,K===0&&(t.setRenderTargetTextures(d,At.colorTexture,u.ignoreDepthValues?void 0:At.depthStencilTexture),t.setRenderTarget(d))}let et=M[K];et===void 0&&(et=new le,et.layers.enable(K),et.viewport=new te,M[K]=et),et.matrix.fromArray(ft.transform.matrix),et.projectionMatrix.fromArray(ft.projectionMatrix),et.viewport.set(Tt.x,Tt.y,Tt.width,Tt.height),K===0&&L.matrix.copy(et.matrix),Z===!0&&L.cameras.push(et)}}for(let it=0;it<_.length;it++){let Z=y[it],K=_[it];Z!==null&&K!==void 0&&K.update(Z,R,h||o)}nt&&nt(C,R),m=null}let J=new mo;J.setAnimationLoop(G),this.setAnimationLoop=function(C){nt=C},this.dispose=function(){}}};function yf(r,t){function e(c,d){c.fogColor.value.copy(d.color),d.isFog?(c.fogNear.value=d.near,c.fogFar.value=d.far):d.isFogExp2&&(c.fogDensity.value=d.density)}function n(c,d,_,y,w){d.isMeshBasicMaterial||d.isMeshLambertMaterial?i(c,d):d.isMeshToonMaterial?(i(c,d),p(c,d)):d.isMeshPhongMaterial?(i(c,d),l(c,d)):d.isMeshStandardMaterial?(i(c,d),u(c,d),d.isMeshPhysicalMaterial&&f(c,d,w)):d.isMeshMatcapMaterial?(i(c,d),m(c,d)):d.isMeshDepthMaterial?i(c,d):d.isMeshDistanceMaterial?(i(c,d),g(c,d)):d.isMeshNormalMaterial?i(c,d):d.isLineBasicMaterial?(s(c,d),d.isLineDashedMaterial&&o(c,d)):d.isPointsMaterial?a(c,d,_,y):d.isSpriteMaterial?h(c,d):d.isShadowMaterial?(c.color.value.copy(d.color),c.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function i(c,d){c.opacity.value=d.opacity,d.color&&c.diffuse.value.copy(d.color),d.emissive&&c.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(c.map.value=d.map),d.alphaMap&&(c.alphaMap.value=d.alphaMap),d.bumpMap&&(c.bumpMap.value=d.bumpMap,c.bumpScale.value=d.bumpScale,d.side===Te&&(c.bumpScale.value*=-1)),d.displacementMap&&(c.displacementMap.value=d.displacementMap,c.displacementScale.value=d.displacementScale,c.displacementBias.value=d.displacementBias),d.emissiveMap&&(c.emissiveMap.value=d.emissiveMap),d.normalMap&&(c.normalMap.value=d.normalMap,c.normalScale.value.copy(d.normalScale),d.side===Te&&c.normalScale.value.negate()),d.specularMap&&(c.specularMap.value=d.specularMap),d.alphaTest>0&&(c.alphaTest.value=d.alphaTest);let _=t.get(d).envMap;if(_&&(c.envMap.value=_,c.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,c.reflectivity.value=d.reflectivity,c.ior.value=d.ior,c.refractionRatio.value=d.refractionRatio),d.lightMap){c.lightMap.value=d.lightMap;let b=r.physicallyCorrectLights!==!0?Math.PI:1;c.lightMapIntensity.value=d.lightMapIntensity*b}d.aoMap&&(c.aoMap.value=d.aoMap,c.aoMapIntensity.value=d.aoMapIntensity);let y;d.map?y=d.map:d.specularMap?y=d.specularMap:d.displacementMap?y=d.displacementMap:d.normalMap?y=d.normalMap:d.bumpMap?y=d.bumpMap:d.roughnessMap?y=d.roughnessMap:d.metalnessMap?y=d.metalnessMap:d.alphaMap?y=d.alphaMap:d.emissiveMap?y=d.emissiveMap:d.clearcoatMap?y=d.clearcoatMap:d.clearcoatNormalMap?y=d.clearcoatNormalMap:d.clearcoatRoughnessMap?y=d.clearcoatRoughnessMap:d.iridescenceMap?y=d.iridescenceMap:d.iridescenceThicknessMap?y=d.iridescenceThicknessMap:d.specularIntensityMap?y=d.specularIntensityMap:d.specularColorMap?y=d.specularColorMap:d.transmissionMap?y=d.transmissionMap:d.thicknessMap?y=d.thicknessMap:d.sheenColorMap?y=d.sheenColorMap:d.sheenRoughnessMap&&(y=d.sheenRoughnessMap),y!==void 0&&(y.isWebGLRenderTarget&&(y=y.texture),y.matrixAutoUpdate===!0&&y.updateMatrix(),c.uvTransform.value.copy(y.matrix));let w;d.aoMap?w=d.aoMap:d.lightMap&&(w=d.lightMap),w!==void 0&&(w.isWebGLRenderTarget&&(w=w.texture),w.matrixAutoUpdate===!0&&w.updateMatrix(),c.uv2Transform.value.copy(w.matrix))}function s(c,d){c.diffuse.value.copy(d.color),c.opacity.value=d.opacity}function o(c,d){c.dashSize.value=d.dashSize,c.totalSize.value=d.dashSize+d.gapSize,c.scale.value=d.scale}function a(c,d,_,y){c.diffuse.value.copy(d.color),c.opacity.value=d.opacity,c.size.value=d.size*_,c.scale.value=y*.5,d.map&&(c.map.value=d.map),d.alphaMap&&(c.alphaMap.value=d.alphaMap),d.alphaTest>0&&(c.alphaTest.value=d.alphaTest);let w;d.map?w=d.map:d.alphaMap&&(w=d.alphaMap),w!==void 0&&(w.matrixAutoUpdate===!0&&w.updateMatrix(),c.uvTransform.value.copy(w.matrix))}function h(c,d){c.diffuse.value.copy(d.color),c.opacity.value=d.opacity,c.rotation.value=d.rotation,d.map&&(c.map.value=d.map),d.alphaMap&&(c.alphaMap.value=d.alphaMap),d.alphaTest>0&&(c.alphaTest.value=d.alphaTest);let _;d.map?_=d.map:d.alphaMap&&(_=d.alphaMap),_!==void 0&&(_.matrixAutoUpdate===!0&&_.updateMatrix(),c.uvTransform.value.copy(_.matrix))}function l(c,d){c.specular.value.copy(d.specular),c.shininess.value=Math.max(d.shininess,1e-4)}function p(c,d){d.gradientMap&&(c.gradientMap.value=d.gradientMap)}function u(c,d){c.roughness.value=d.roughness,c.metalness.value=d.metalness,d.roughnessMap&&(c.roughnessMap.value=d.roughnessMap),d.metalnessMap&&(c.metalnessMap.value=d.metalnessMap),t.get(d).envMap&&(c.envMapIntensity.value=d.envMapIntensity)}function f(c,d,_){c.ior.value=d.ior,d.sheen>0&&(c.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),c.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(c.sheenColorMap.value=d.sheenColorMap),d.sheenRoughnessMap&&(c.sheenRoughnessMap.value=d.sheenRoughnessMap)),d.clearcoat>0&&(c.clearcoat.value=d.clearcoat,c.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(c.clearcoatMap.value=d.clearcoatMap),d.clearcoatRoughnessMap&&(c.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap),d.clearcoatNormalMap&&(c.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),c.clearcoatNormalMap.value=d.clearcoatNormalMap,d.side===Te&&c.clearcoatNormalScale.value.negate())),d.iridescence>0&&(c.iridescence.value=d.iridescence,c.iridescenceIOR.value=d.iridescenceIOR,c.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],c.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(c.iridescenceMap.value=d.iridescenceMap),d.iridescenceThicknessMap&&(c.iridescenceThicknessMap.value=d.iridescenceThicknessMap)),d.transmission>0&&(c.transmission.value=d.transmission,c.transmissionSamplerMap.value=_.texture,c.transmissionSamplerSize.value.set(_.width,_.height),d.transmissionMap&&(c.transmissionMap.value=d.transmissionMap),c.thickness.value=d.thickness,d.thicknessMap&&(c.thicknessMap.value=d.thicknessMap),c.attenuationDistance.value=d.attenuationDistance,c.attenuationColor.value.copy(d.attenuationColor)),c.specularIntensity.value=d.specularIntensity,c.specularColor.value.copy(d.specularColor),d.specularIntensityMap&&(c.specularIntensityMap.value=d.specularIntensityMap),d.specularColorMap&&(c.specularColorMap.value=d.specularColorMap)}function m(c,d){d.matcap&&(c.matcap.value=d.matcap)}function g(c,d){c.referencePosition.value.copy(d.referencePosition),c.nearDistance.value=d.nearDistance,c.farDistance.value=d.farDistance}return{refreshFogUniforms:e,refreshMaterialUniforms:n}}function bf(r,t,e,n){let i={},s={},o=[],a=e.isWebGL2?r.getParameter(35375):0;function h(y,w){let b=w.program;n.uniformBlockBinding(y,b)}function l(y,w){let b=i[y.id];b===void 0&&(g(y),b=p(y),i[y.id]=b,y.addEventListener("dispose",d));let M=w.program;n.updateUBOMapping(y,M);let L=t.render.frame;s[y.id]!==L&&(f(y),s[y.id]=L)}function p(y){let w=u();y.__bindingPointIndex=w;let b=r.createBuffer(),M=y.__size,L=y.usage;return r.bindBuffer(35345,b),r.bufferData(35345,M,L),r.bindBuffer(35345,null),r.bindBufferBase(35345,w,b),b}function u(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(y){let w=i[y.id],b=y.uniforms,M=y.__cache;r.bindBuffer(35345,w);for(let L=0,I=b.length;L<I;L++){let T=b[L];if(m(T,L,M)===!0){let z=T.value,A=T.__offset;typeof z=="number"?(T.__data[0]=z,r.bufferSubData(35345,A,T.__data)):(T.value.isMatrix3?(T.__data[0]=T.value.elements[0],T.__data[1]=T.value.elements[1],T.__data[2]=T.value.elements[2],T.__data[3]=T.value.elements[0],T.__data[4]=T.value.elements[3],T.__data[5]=T.value.elements[4],T.__data[6]=T.value.elements[5],T.__data[7]=T.value.elements[0],T.__data[8]=T.value.elements[6],T.__data[9]=T.value.elements[7],T.__data[10]=T.value.elements[8],T.__data[11]=T.value.elements[0]):z.toArray(T.__data),r.bufferSubData(35345,A,T.__data))}}r.bindBuffer(35345,null)}function m(y,w,b){let M=y.value;if(b[w]===void 0)return typeof M=="number"?b[w]=M:b[w]=M.clone(),!0;if(typeof M=="number"){if(b[w]!==M)return b[w]=M,!0}else{let L=b[w];if(L.equals(M)===!1)return L.copy(M),!0}return!1}function g(y){let w=y.uniforms,b=0,M=16,L=0;for(let I=0,T=w.length;I<T;I++){let z=w[I],A=c(z);if(z.__data=new Float32Array(A.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=b,I>0){L=b%M;let N=M-L;L!==0&&N-A.boundary<0&&(b+=M-L,z.__offset=b)}b+=A.storage}return L=b%M,L>0&&(b+=M-L),y.__size=b,y.__cache={},this}function c(y){let w=y.value,b={boundary:0,storage:0};return typeof w=="number"?(b.boundary=4,b.storage=4):w.isVector2?(b.boundary=8,b.storage=8):w.isVector3||w.isColor?(b.boundary=16,b.storage=12):w.isVector4?(b.boundary=16,b.storage=16):w.isMatrix3?(b.boundary=48,b.storage=48):w.isMatrix4?(b.boundary=64,b.storage=64):w.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",w),b}function d(y){let w=y.target;w.removeEventListener("dispose",d);let b=o.indexOf(w.__bindingPointIndex);o.splice(b,1),r.deleteBuffer(i[w.id]),delete i[w.id],delete s[w.id]}function _(){for(let y in i)r.deleteBuffer(i[y]);o=[],i={},s={}}return{bind:h,update:l,dispose:_}}function wf(){let r=Ki("canvas");return r.style.display="block",r}function kr(r={}){this.isWebGLRenderer=!0;let t=r.canvas!==void 0?r.canvas:wf(),e=r.context!==void 0?r.context:null,n=r.depth!==void 0?r.depth:!0,i=r.stencil!==void 0?r.stencil:!0,s=r.antialias!==void 0?r.antialias:!1,o=r.premultipliedAlpha!==void 0?r.premultipliedAlpha:!0,a=r.preserveDrawingBuffer!==void 0?r.preserveDrawingBuffer:!1,h=r.powerPreference!==void 0?r.powerPreference:"default",l=r.failIfMajorPerformanceCaveat!==void 0?r.failIfMajorPerformanceCaveat:!1,p;e!==null?p=e.getContextAttributes().alpha:p=r.alpha!==void 0?r.alpha:!1;let u=null,f=null,m=[],g=[];this.domElement=t,this.debug={checkShaderErrors:!0},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.outputEncoding=je,this.physicallyCorrectLights=!1,this.toneMapping=Ie,this.toneMappingExposure=1,Object.defineProperties(this,{gammaFactor:{get:function(){return console.warn("THREE.WebGLRenderer: .gammaFactor has been removed."),2},set:function(){console.warn("THREE.WebGLRenderer: .gammaFactor has been removed.")}}});let c=this,d=!1,_=0,y=0,w=null,b=-1,M=null,L=new te,I=new te,T=null,z=t.width,A=t.height,N=1,v=null,O=null,B=new te(0,0,z,A),U=new te(0,0,z,A),nt=!1,G=new os,J=!1,C=!1,R=null,it=new ee,Z=new zt,K=new $,ft={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Tt(){return w===null?N:1}let et=e;function At(D,tt){for(let at=0;at<D.length;at++){let j=D[at],ct=t.getContext(j,tt);if(ct!==null)return ct}return null}try{let D={alpha:!0,depth:n,stencil:i,antialias:s,premultipliedAlpha:o,preserveDrawingBuffer:a,powerPreference:h,failIfMajorPerformanceCaveat:l};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Dr}`),t.addEventListener("webglcontextlost",St,!1),t.addEventListener("webglcontextrestored",Rt,!1),t.addEventListener("webglcontextcreationerror",Nt,!1),et===null){let tt=["webgl2","webgl","experimental-webgl"];if(c.isWebGL1Renderer===!0&&tt.shift(),et=At(tt,D),et===null)throw At(tt)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}et.getShaderPrecisionFormat===void 0&&(et.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(D){throw console.error("THREE.WebGLRenderer: "+D.message),D}let Mt,bt,xt,Dt,x,X,Q,k,P,V,rt,st,q,ut,E,S,H,ot,ht,pt,Et,F,Y,dt;function wt(){Mt=new Wu(et),bt=new Ou(et,Mt,r),Mt.init(bt),F=new xf(et,Mt,bt),xt=new gf(et,Mt,bt),Dt=new Xu,x=new sf,X=new _f(et,Mt,xt,x,bt,F,Dt),Q=new Fu(c),k=new Vu(c),P=new nc(et,bt),Y=new zu(et,Mt,P,bt),V=new Hu(et,P,Dt,Y),rt=new Ju(et,V,P,Dt),ht=new Yu(et,bt,X),S=new Nu(x),st=new nf(c,Q,k,Mt,bt,Y,S),q=new yf(c,x),ut=new af,E=new df(Mt,bt),ot=new Du(c,Q,xt,rt,p,o),H=new mf(c,rt,bt),dt=new bf(et,Dt,bt,xt),pt=new ku(et,Mt,Dt,bt),Et=new Gu(et,Mt,Dt,bt),Dt.programs=st.programs,c.capabilities=bt,c.extensions=Mt,c.properties=x,c.renderLists=ut,c.shadowMap=H,c.state=xt,c.info=Dt}wt();let yt=new Mr(c,et);this.xr=yt,this.getContext=function(){return et},this.getContextAttributes=function(){return et.getContextAttributes()},this.forceContextLoss=function(){let D=Mt.get("WEBGL_lose_context");D&&D.loseContext()},this.forceContextRestore=function(){let D=Mt.get("WEBGL_lose_context");D&&D.restoreContext()},this.getPixelRatio=function(){return N},this.setPixelRatio=function(D){D!==void 0&&(N=D,this.setSize(z,A,!1))},this.getSize=function(D){return D.set(z,A)},this.setSize=function(D,tt,at){if(yt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}z=D,A=tt,t.width=Math.floor(D*N),t.height=Math.floor(tt*N),at!==!1&&(t.style.width=D+"px",t.style.height=tt+"px"),this.setViewport(0,0,D,tt)},this.getDrawingBufferSize=function(D){return D.set(z*N,A*N).floor()},this.setDrawingBufferSize=function(D,tt,at){z=D,A=tt,N=at,t.width=Math.floor(D*at),t.height=Math.floor(tt*at),this.setViewport(0,0,D,tt)},this.getCurrentViewport=function(D){return D.copy(L)},this.getViewport=function(D){return D.copy(B)},this.setViewport=function(D,tt,at,j){D.isVector4?B.set(D.x,D.y,D.z,D.w):B.set(D,tt,at,j),xt.viewport(L.copy(B).multiplyScalar(N).floor())},this.getScissor=function(D){return D.copy(U)},this.setScissor=function(D,tt,at,j){D.isVector4?U.set(D.x,D.y,D.z,D.w):U.set(D,tt,at,j),xt.scissor(I.copy(U).multiplyScalar(N).floor())},this.getScissorTest=function(){return nt},this.setScissorTest=function(D){xt.setScissorTest(nt=D)},this.setOpaqueSort=function(D){v=D},this.setTransparentSort=function(D){O=D},this.getClearColor=function(D){return D.copy(ot.getClearColor())},this.setClearColor=function(){ot.setClearColor.apply(ot,arguments)},this.getClearAlpha=function(){return ot.getClearAlpha()},this.setClearAlpha=function(){ot.setClearAlpha.apply(ot,arguments)},this.clear=function(D=!0,tt=!0,at=!0){let j=0;D&&(j|=16384),tt&&(j|=256),at&&(j|=1024),et.clear(j)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",St,!1),t.removeEventListener("webglcontextrestored",Rt,!1),t.removeEventListener("webglcontextcreationerror",Nt,!1),ut.dispose(),E.dispose(),x.dispose(),Q.dispose(),k.dispose(),rt.dispose(),Y.dispose(),dt.dispose(),st.dispose(),yt.dispose(),yt.removeEventListener("sessionstart",Pt),yt.removeEventListener("sessionend",Gt),R&&(R.dispose(),R=null),Jt.stop()};function St(D){D.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),d=!0}function Rt(){console.log("THREE.WebGLRenderer: Context Restored."),d=!1;let D=Dt.autoReset,tt=H.enabled,at=H.autoUpdate,j=H.needsUpdate,ct=H.type;wt(),Dt.autoReset=D,H.enabled=tt,H.autoUpdate=at,H.needsUpdate=j,H.type=ct}function Nt(D){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",D.statusMessage)}function W(D){let tt=D.target;tt.removeEventListener("dispose",W),vt(tt)}function vt(D){mt(D),x.remove(D)}function mt(D){let tt=x.get(D).programs;tt!==void 0&&(tt.forEach(function(at){st.releaseProgram(at)}),D.isShaderMaterial&&st.releaseShaderCache(D))}this.renderBufferDirect=function(D,tt,at,j,ct,Ct){tt===null&&(tt=ft);let Lt=ct.isMesh&&ct.matrixWorld.determinant()<0,kt=Co(D,tt,at,j,ct);xt.setMaterial(j,Lt);let It=at.index,Wt=at.attributes.position;if(It===null){if(Wt===void 0||Wt.count===0)return}else if(It.count===0)return;let Ft=1;j.wireframe===!0&&(It=V.getWireframeAttribute(at),Ft=2),Y.setup(ct,j,kt,at,It);let Ut,Zt=pt;It!==null&&(Ut=P.get(It),Zt=Et,Zt.setIndex(Ut));let dn=It!==null?It.count:Wt.count,In=at.drawRange.start*Ft,Dn=at.drawRange.count*Ft,Oe=Ct!==null?Ct.start*Ft:0,Bt=Ct!==null?Ct.count*Ft:1/0,zn=Math.max(In,Oe),$t=Math.min(dn,In+Dn,Oe+Bt)-1,we=Math.max(0,$t-zn+1);if(we!==0){if(ct.isMesh)j.wireframe===!0?(xt.setLineWidth(j.wireframeLinewidth*Tt()),Zt.setMode(1)):Zt.setMode(4);else if(ct.isLine){let tn=j.linewidth;tn===void 0&&(tn=1),xt.setLineWidth(tn*Tt()),ct.isLineSegments?Zt.setMode(1):ct.isLineLoop?Zt.setMode(2):Zt.setMode(3)}else ct.isPoints?Zt.setMode(0):ct.isSprite&&Zt.setMode(4);if(ct.isInstancedMesh)Zt.renderInstances(zn,we,ct.count);else if(at.isInstancedBufferGeometry){let tn=Math.min(at.instanceCount,at._maxInstanceCount);Zt.renderInstances(zn,we,tn)}else Zt.render(zn,we)}},this.compile=function(D,tt){function at(j,ct,Ct){j.transparent===!0&&j.side===Fe?(j.side=Te,j.needsUpdate=!0,Ti(j,ct,Ct),j.side=ei,j.needsUpdate=!0,Ti(j,ct,Ct),j.side=Fe):Ti(j,ct,Ct)}f=E.get(D),f.init(),g.push(f),D.traverseVisible(function(j){j.isLight&&j.layers.test(tt.layers)&&(f.pushLight(j),j.castShadow&&f.pushShadow(j))}),f.setupLights(c.physicallyCorrectLights),D.traverse(function(j){let ct=j.material;if(ct)if(Array.isArray(ct))for(let Ct=0;Ct<ct.length;Ct++){let Lt=ct[Ct];at(Lt,D,j)}else at(ct,D,j)}),g.pop(),f=null};let lt=null;function gt(D){lt&&lt(D)}function Pt(){Jt.stop()}function Gt(){Jt.start()}let Jt=new mo;Jt.setAnimationLoop(gt),typeof self<"u"&&Jt.setContext(self),this.setAnimationLoop=function(D){lt=D,yt.setAnimationLoop(D),D===null?Jt.stop():Jt.start()},yt.addEventListener("sessionstart",Pt),yt.addEventListener("sessionend",Gt),this.render=function(D,tt){if(tt!==void 0&&tt.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(d===!0)return;D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),tt.parent===null&&tt.matrixWorldAutoUpdate===!0&&tt.updateMatrixWorld(),yt.enabled===!0&&yt.isPresenting===!0&&(yt.cameraAutoUpdate===!0&&yt.updateCamera(tt),tt=yt.getCamera()),D.isScene===!0&&D.onBeforeRender(c,D,tt,w),f=E.get(D,g.length),f.init(),g.push(f),it.multiplyMatrices(tt.projectionMatrix,tt.matrixWorldInverse),G.setFromProjectionMatrix(it),C=this.localClippingEnabled,J=S.init(this.clippingPlanes,C,tt),u=ut.get(D,m.length),u.init(),m.push(u),Qe(D,tt,0,c.sortObjects),u.finish(),c.sortObjects===!0&&u.sort(v,O),J===!0&&S.beginShadows();let at=f.state.shadowsArray;if(H.render(at,D,tt),J===!0&&S.endShadows(),this.info.autoReset===!0&&this.info.reset(),ot.render(u,D),f.setupLights(c.physicallyCorrectLights),tt.isArrayCamera){let j=tt.cameras;for(let ct=0,Ct=j.length;ct<Ct;ct++){let Lt=j[ct];qt(u,D,Lt,Lt.viewport)}}else qt(u,D,tt);w!==null&&(X.updateMultisampleRenderTarget(w),X.updateRenderTargetMipmap(w)),D.isScene===!0&&D.onAfterRender(c,D,tt),Y.resetDefaultState(),b=-1,M=null,g.pop(),g.length>0?f=g[g.length-1]:f=null,m.pop(),m.length>0?u=m[m.length-1]:u=null};function Qe(D,tt,at,j){if(D.visible===!1)return;if(D.layers.test(tt.layers)){if(D.isGroup)at=D.renderOrder;else if(D.isLOD)D.autoUpdate===!0&&D.update(tt);else if(D.isLight)f.pushLight(D),D.castShadow&&f.pushShadow(D);else if(D.isSprite){if(!D.frustumCulled||G.intersectsSprite(D)){j&&K.setFromMatrixPosition(D.matrixWorld).applyMatrix4(it);let Lt=rt.update(D),kt=D.material;kt.visible&&u.push(D,Lt,kt,at,K.z,null)}}else if((D.isMesh||D.isLine||D.isPoints)&&(D.isSkinnedMesh&&D.skeleton.frame!==Dt.render.frame&&(D.skeleton.update(),D.skeleton.frame=Dt.render.frame),!D.frustumCulled||G.intersectsObject(D))){j&&K.setFromMatrixPosition(D.matrixWorld).applyMatrix4(it);let Lt=rt.update(D),kt=D.material;if(Array.isArray(kt)){let It=Lt.groups;for(let Wt=0,Ft=It.length;Wt<Ft;Wt++){let Ut=It[Wt],Zt=kt[Ut.materialIndex];Zt&&Zt.visible&&u.push(D,Lt,Zt,at,K.z,Ut)}}else kt.visible&&u.push(D,Lt,kt,at,K.z,null)}}let Ct=D.children;for(let Lt=0,kt=Ct.length;Lt<kt;Lt++)Qe(Ct[Lt],tt,at,j)}function qt(D,tt,at,j){let ct=D.opaque,Ct=D.transmissive,Lt=D.transparent;f.setupLightsView(at),Ct.length>0&&Ve(ct,tt,at),j&&xt.viewport(L.copy(j)),ct.length>0&&be(ct,tt,at),Ct.length>0&&be(Ct,tt,at),Lt.length>0&&be(Lt,tt,at),xt.buffers.depth.setTest(!0),xt.buffers.depth.setMask(!0),xt.buffers.color.setMask(!0),xt.setPolygonOffset(!1)}function Ve(D,tt,at){let j=bt.isWebGL2;R===null&&(R=new De(1,1,{generateMipmaps:!0,type:Mt.has("EXT_color_buffer_half_float")?yi:Mn,minFilter:hs,samples:j&&s===!0?4:0})),c.getDrawingBufferSize(Z),j?R.setSize(Z.x,Z.y):R.setSize(or(Z.x),or(Z.y));let ct=c.getRenderTarget();c.setRenderTarget(R),c.clear();let Ct=c.toneMapping;c.toneMapping=Ie,be(D,tt,at),c.toneMapping=Ct,X.updateMultisampleRenderTarget(R),X.updateRenderTargetMipmap(R),c.setRenderTarget(ct)}function be(D,tt,at){let j=tt.isScene===!0?tt.overrideMaterial:null;for(let ct=0,Ct=D.length;ct<Ct;ct++){let Lt=D[ct],kt=Lt.object,It=Lt.geometry,Wt=j===null?Lt.material:j,Ft=Lt.group;kt.layers.test(at.layers)&&Eo(kt,tt,at,It,Wt,Ft)}}function Eo(D,tt,at,j,ct,Ct){D.onBeforeRender(c,tt,at,j,ct,Ct),D.modelViewMatrix.multiplyMatrices(at.matrixWorldInverse,D.matrixWorld),D.normalMatrix.getNormalMatrix(D.modelViewMatrix),ct.onBeforeRender(c,tt,at,j,D,Ct),ct.transparent===!0&&ct.side===Fe?(ct.side=Te,ct.needsUpdate=!0,c.renderBufferDirect(at,tt,j,ct,D,Ct),ct.side=ei,ct.needsUpdate=!0,c.renderBufferDirect(at,tt,j,ct,D,Ct),ct.side=Fe):c.renderBufferDirect(at,tt,j,ct,D,Ct),D.onAfterRender(c,tt,at,j,ct,Ct)}function Ti(D,tt,at){tt.isScene!==!0&&(tt=ft);let j=x.get(D),ct=f.state.lights,Ct=f.state.shadowsArray,Lt=ct.state.version,kt=st.getParameters(D,ct.state,Ct,tt,at),It=st.getProgramCacheKey(kt),Wt=j.programs;j.environment=D.isMeshStandardMaterial?tt.environment:null,j.fog=tt.fog,j.envMap=(D.isMeshStandardMaterial?k:Q).get(D.envMap||j.environment),Wt===void 0&&(D.addEventListener("dispose",W),Wt=new Map,j.programs=Wt);let Ft=Wt.get(It);if(Ft!==void 0){if(j.currentProgram===Ft&&j.lightsStateVersion===Lt)return Gr(D,kt),Ft}else kt.uniforms=st.getUniforms(D),D.onBuild(at,kt,c),D.onBeforeCompile(kt,c),Ft=st.acquireProgram(kt,It),Wt.set(It,Ft),j.uniforms=kt.uniforms;let Ut=j.uniforms;(!D.isShaderMaterial&&!D.isRawShaderMaterial||D.clipping===!0)&&(Ut.clippingPlanes=S.uniform),Gr(D,kt),j.needsLights=Po(D),j.lightsStateVersion=Lt,j.needsLights&&(Ut.ambientLightColor.value=ct.state.ambient,Ut.lightProbe.value=ct.state.probe,Ut.directionalLights.value=ct.state.directional,Ut.directionalLightShadows.value=ct.state.directionalShadow,Ut.spotLights.value=ct.state.spot,Ut.spotLightShadows.value=ct.state.spotShadow,Ut.rectAreaLights.value=ct.state.rectArea,Ut.ltc_1.value=ct.state.rectAreaLTC1,Ut.ltc_2.value=ct.state.rectAreaLTC2,Ut.pointLights.value=ct.state.point,Ut.pointLightShadows.value=ct.state.pointShadow,Ut.hemisphereLights.value=ct.state.hemi,Ut.directionalShadowMap.value=ct.state.directionalShadowMap,Ut.directionalShadowMatrix.value=ct.state.directionalShadowMatrix,Ut.spotShadowMap.value=ct.state.spotShadowMap,Ut.spotLightMatrix.value=ct.state.spotLightMatrix,Ut.spotLightMap.value=ct.state.spotLightMap,Ut.pointShadowMap.value=ct.state.pointShadowMap,Ut.pointShadowMatrix.value=ct.state.pointShadowMatrix);let Zt=Ft.getUniforms(),dn=ti.seqWithValue(Zt.seq,Ut);return j.currentProgram=Ft,j.uniformsList=dn,Ft}function Gr(D,tt){let at=x.get(D);at.outputEncoding=tt.outputEncoding,at.instancing=tt.instancing,at.skinning=tt.skinning,at.morphTargets=tt.morphTargets,at.morphNormals=tt.morphNormals,at.morphColors=tt.morphColors,at.morphTargetsCount=tt.morphTargetsCount,at.numClippingPlanes=tt.numClippingPlanes,at.numIntersection=tt.numClipIntersection,at.vertexAlphas=tt.vertexAlphas,at.vertexTangents=tt.vertexTangents,at.toneMapping=tt.toneMapping}function Co(D,tt,at,j,ct){tt.isScene!==!0&&(tt=ft),X.resetTextureUnits();let Ct=tt.fog,Lt=j.isMeshStandardMaterial?tt.environment:null,kt=w===null?c.outputEncoding:w.isXRRenderTarget===!0?w.texture.encoding:je,It=(j.isMeshStandardMaterial?k:Q).get(j.envMap||Lt),Wt=j.vertexColors===!0&&!!at.attributes.color&&at.attributes.color.itemSize===4,Ft=!!j.normalMap&&!!at.attributes.tangent,Ut=!!at.morphAttributes.position,Zt=!!at.morphAttributes.normal,dn=!!at.morphAttributes.color,In=j.toneMapped?c.toneMapping:Ie,Dn=at.morphAttributes.position||at.morphAttributes.normal||at.morphAttributes.color,Oe=Dn!==void 0?Dn.length:0,Bt=x.get(j),zn=f.state.lights;if(J===!0&&(C===!0||D!==M)){let me=D===M&&j.id===b;S.setState(j,D,me)}let $t=!1;j.version===Bt.__version?(Bt.needsLights&&Bt.lightsStateVersion!==zn.state.version||Bt.outputEncoding!==kt||ct.isInstancedMesh&&Bt.instancing===!1||!ct.isInstancedMesh&&Bt.instancing===!0||ct.isSkinnedMesh&&Bt.skinning===!1||!ct.isSkinnedMesh&&Bt.skinning===!0||Bt.envMap!==It||j.fog===!0&&Bt.fog!==Ct||Bt.numClippingPlanes!==void 0&&(Bt.numClippingPlanes!==S.numPlanes||Bt.numIntersection!==S.numIntersection)||Bt.vertexAlphas!==Wt||Bt.vertexTangents!==Ft||Bt.morphTargets!==Ut||Bt.morphNormals!==Zt||Bt.morphColors!==dn||Bt.toneMapping!==In||bt.isWebGL2===!0&&Bt.morphTargetsCount!==Oe)&&($t=!0):($t=!0,Bt.__version=j.version);let we=Bt.currentProgram;$t===!0&&(we=Ti(j,tt,ct));let tn=!1,di=!1,xs=!1,oe=we.getUniforms(),fn=Bt.uniforms;if(xt.useProgram(we.program)&&(tn=!0,di=!0,xs=!0),j.id!==b&&(b=j.id,di=!0),tn||M!==D){if(oe.setValue(et,"projectionMatrix",D.projectionMatrix),bt.logarithmicDepthBuffer&&oe.setValue(et,"logDepthBufFC",2/(Math.log(D.far+1)/Math.LN2)),M!==D&&(M=D,di=!0,xs=!0),j.isShaderMaterial||j.isMeshPhongMaterial||j.isMeshToonMaterial||j.isMeshStandardMaterial||j.envMap){let me=oe.map.cameraPosition;me!==void 0&&me.setValue(et,K.setFromMatrixPosition(D.matrixWorld))}(j.isMeshPhongMaterial||j.isMeshToonMaterial||j.isMeshLambertMaterial||j.isMeshBasicMaterial||j.isMeshStandardMaterial||j.isShaderMaterial)&&oe.setValue(et,"isOrthographic",D.isOrthographicCamera===!0),(j.isMeshPhongMaterial||j.isMeshToonMaterial||j.isMeshLambertMaterial||j.isMeshBasicMaterial||j.isMeshStandardMaterial||j.isShaderMaterial||j.isShadowMaterial||ct.isSkinnedMesh)&&oe.setValue(et,"viewMatrix",D.matrixWorldInverse)}if(ct.isSkinnedMesh){oe.setOptional(et,ct,"bindMatrix"),oe.setOptional(et,ct,"bindMatrixInverse");let me=ct.skeleton;me&&(bt.floatVertexTextures?(me.boneTexture===null&&me.computeBoneTexture(),oe.setValue(et,"boneTexture",me.boneTexture,X),oe.setValue(et,"boneTextureSize",me.boneTextureSize)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}let vs=at.morphAttributes;if((vs.position!==void 0||vs.normal!==void 0||vs.color!==void 0&&bt.isWebGL2===!0)&&ht.update(ct,at,j,we),(di||Bt.receiveShadow!==ct.receiveShadow)&&(Bt.receiveShadow=ct.receiveShadow,oe.setValue(et,"receiveShadow",ct.receiveShadow)),j.isMeshGouraudMaterial&&j.envMap!==null&&(fn.envMap.value=It,fn.flipEnvMap.value=It.isCubeTexture&&It.isRenderTargetTexture===!1?-1:1),di&&(oe.setValue(et,"toneMappingExposure",c.toneMappingExposure),Bt.needsLights&&Ro(fn,xs),Ct&&j.fog===!0&&q.refreshFogUniforms(fn,Ct),q.refreshMaterialUniforms(fn,j,N,A,R),ti.upload(et,Bt.uniformsList,fn,X)),j.isShaderMaterial&&j.uniformsNeedUpdate===!0&&(ti.upload(et,Bt.uniformsList,fn,X),j.uniformsNeedUpdate=!1),j.isSpriteMaterial&&oe.setValue(et,"center",ct.center),oe.setValue(et,"modelViewMatrix",ct.modelViewMatrix),oe.setValue(et,"normalMatrix",ct.normalMatrix),oe.setValue(et,"modelMatrix",ct.matrixWorld),j.isShaderMaterial||j.isRawShaderMaterial){let me=j.uniformsGroups;for(let ys=0,Lo=me.length;ys<Lo;ys++)if(bt.isWebGL2){let Xr=me[ys];dt.update(Xr,we),dt.bind(Xr,we)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return we}function Ro(D,tt){D.ambientLightColor.needsUpdate=tt,D.lightProbe.needsUpdate=tt,D.directionalLights.needsUpdate=tt,D.directionalLightShadows.needsUpdate=tt,D.pointLights.needsUpdate=tt,D.pointLightShadows.needsUpdate=tt,D.spotLights.needsUpdate=tt,D.spotLightShadows.needsUpdate=tt,D.rectAreaLights.needsUpdate=tt,D.hemisphereLights.needsUpdate=tt}function Po(D){return D.isMeshLambertMaterial||D.isMeshToonMaterial||D.isMeshPhongMaterial||D.isMeshStandardMaterial||D.isShadowMaterial||D.isShaderMaterial&&D.lights===!0}this.getActiveCubeFace=function(){return _},this.getActiveMipmapLevel=function(){return y},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(D,tt,at){x.get(D.texture).__webglTexture=tt,x.get(D.depthTexture).__webglTexture=at;let j=x.get(D);j.__hasExternalTextures=!0,j.__hasExternalTextures&&(j.__autoAllocateDepthBuffer=at===void 0,j.__autoAllocateDepthBuffer||Mt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),j.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(D,tt){let at=x.get(D);at.__webglFramebuffer=tt,at.__useDefaultFramebuffer=tt===void 0},this.setRenderTarget=function(D,tt=0,at=0){w=D,_=tt,y=at;let j=!0;if(D){let It=x.get(D);It.__useDefaultFramebuffer!==void 0?(xt.bindFramebuffer(36160,null),j=!1):It.__webglFramebuffer===void 0?X.setupRenderTarget(D):It.__hasExternalTextures&&X.rebindTextures(D,x.get(D.texture).__webglTexture,x.get(D.depthTexture).__webglTexture)}let ct=null,Ct=!1,Lt=!1;if(D){let It=D.texture;(It.isData3DTexture||It.isDataArrayTexture)&&(Lt=!0);let Wt=x.get(D).__webglFramebuffer;D.isWebGLCubeRenderTarget?(ct=Wt[tt],Ct=!0):bt.isWebGL2&&D.samples>0&&X.useMultisampledRTT(D)===!1?ct=x.get(D).__webglMultisampledFramebuffer:ct=Wt,L.copy(D.viewport),I.copy(D.scissor),T=D.scissorTest}else L.copy(B).multiplyScalar(N).floor(),I.copy(U).multiplyScalar(N).floor(),T=nt;if(xt.bindFramebuffer(36160,ct)&&bt.drawBuffers&&j&&xt.drawBuffers(D,ct),xt.viewport(L),xt.scissor(I),xt.setScissorTest(T),Ct){let It=x.get(D.texture);et.framebufferTexture2D(36160,36064,34069+tt,It.__webglTexture,at)}else if(Lt){let It=x.get(D.texture),Wt=tt||0;et.framebufferTextureLayer(36160,36064,It.__webglTexture,at||0,Wt)}b=-1},this.readRenderTargetPixels=function(D,tt,at,j,ct,Ct,Lt){if(!(D&&D.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let kt=x.get(D).__webglFramebuffer;if(D.isWebGLCubeRenderTarget&&Lt!==void 0&&(kt=kt[Lt]),kt){xt.bindFramebuffer(36160,kt);try{let It=D.texture,Wt=It.format,Ft=It.type;if(Wt!==ve&&F.convert(Wt)!==et.getParameter(35739)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}let Ut=Ft===yi&&(Mt.has("EXT_color_buffer_half_float")||bt.isWebGL2&&Mt.has("EXT_color_buffer_float"));if(Ft!==Mn&&F.convert(Ft)!==et.getParameter(35738)&&!(Ft===Ue&&(bt.isWebGL2||Mt.has("OES_texture_float")||Mt.has("WEBGL_color_buffer_float")))&&!Ut){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}tt>=0&&tt<=D.width-j&&at>=0&&at<=D.height-ct&&et.readPixels(tt,at,j,ct,F.convert(Wt),F.convert(Ft),Ct)}finally{let It=w!==null?x.get(w).__webglFramebuffer:null;xt.bindFramebuffer(36160,It)}}},this.copyFramebufferToTexture=function(D,tt,at=0){let j=Math.pow(2,-at),ct=Math.floor(tt.image.width*j),Ct=Math.floor(tt.image.height*j);X.setTexture2D(tt,0),et.copyTexSubImage2D(3553,at,0,0,D.x,D.y,ct,Ct),xt.unbindTexture()},this.copyTextureToTexture=function(D,tt,at,j=0){let ct=tt.image.width,Ct=tt.image.height,Lt=F.convert(at.format),kt=F.convert(at.type);X.setTexture2D(at,0),et.pixelStorei(37440,at.flipY),et.pixelStorei(37441,at.premultiplyAlpha),et.pixelStorei(3317,at.unpackAlignment),tt.isDataTexture?et.texSubImage2D(3553,j,D.x,D.y,ct,Ct,Lt,kt,tt.image.data):tt.isCompressedTexture?et.compressedTexSubImage2D(3553,j,D.x,D.y,tt.mipmaps[0].width,tt.mipmaps[0].height,Lt,tt.mipmaps[0].data):et.texSubImage2D(3553,j,D.x,D.y,Lt,kt,tt.image),j===0&&at.generateMipmaps&&et.generateMipmap(3553),xt.unbindTexture()},this.copyTextureToTexture3D=function(D,tt,at,j,ct=0){if(c.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}let Ct=D.max.x-D.min.x+1,Lt=D.max.y-D.min.y+1,kt=D.max.z-D.min.z+1,It=F.convert(j.format),Wt=F.convert(j.type),Ft;if(j.isData3DTexture)X.setTexture3D(j,0),Ft=32879;else if(j.isDataArrayTexture)X.setTexture2DArray(j,0),Ft=35866;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}et.pixelStorei(37440,j.flipY),et.pixelStorei(37441,j.premultiplyAlpha),et.pixelStorei(3317,j.unpackAlignment);let Ut=et.getParameter(3314),Zt=et.getParameter(32878),dn=et.getParameter(3316),In=et.getParameter(3315),Dn=et.getParameter(32877),Oe=at.isCompressedTexture?at.mipmaps[0]:at.image;et.pixelStorei(3314,Oe.width),et.pixelStorei(32878,Oe.height),et.pixelStorei(3316,D.min.x),et.pixelStorei(3315,D.min.y),et.pixelStorei(32877,D.min.z),at.isDataTexture||at.isData3DTexture?et.texSubImage3D(Ft,ct,tt.x,tt.y,tt.z,Ct,Lt,kt,It,Wt,Oe.data):at.isCompressedTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),et.compressedTexSubImage3D(Ft,ct,tt.x,tt.y,tt.z,Ct,Lt,kt,It,Oe.data)):et.texSubImage3D(Ft,ct,tt.x,tt.y,tt.z,Ct,Lt,kt,It,Wt,Oe),et.pixelStorei(3314,Ut),et.pixelStorei(32878,Zt),et.pixelStorei(3316,dn),et.pixelStorei(3315,In),et.pixelStorei(32877,Dn),ct===0&&j.generateMipmaps&&et.generateMipmap(Ft),xt.unbindTexture()},this.initTexture=function(D){D.isCubeTexture?X.setTextureCube(D,0):D.isData3DTexture?X.setTexture3D(D,0):D.isDataArrayTexture?X.setTexture2DArray(D,0):X.setTexture2D(D,0),xt.unbindTexture()},this.resetState=function(){_=0,y=0,w=null,xt.reset(),Y.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}var Sr=class extends kr{};Sr.prototype.isWebGL1Renderer=!0;var li=class extends ce{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e}get autoUpdate(){return console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),this.matrixWorldAutoUpdate}set autoUpdate(t){console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),this.matrixWorldAutoUpdate=t}};var ci=class extends pe{constructor(t=null,e=1,n=1,i,s,o,a,h,l=jt,p=jt,u,f){super(null,o,a,h,l,p,i,s,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};function cn(r,t,e){return yo(r)?new r.constructor(r.subarray(t,e!==void 0?e:r.length)):r.slice(t,e)}function Yi(r,t,e){return!r||!e&&r.constructor===t?r:typeof t.BYTES_PER_ELEMENT=="number"?new t(r):Array.prototype.slice.call(r)}function yo(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}var hi=class{constructor(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,i=e[n],s=e[n-1];t:{e:{let o;n:{i:if(!(t<i)){for(let a=n+2;;){if(i===void 0){if(t<s)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=i,i=e[++n],t<i)break e}o=e.length;break n}if(!(t>=s)){let a=e[1];t<a&&(n=2,s=a);for(let h=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===h)break;if(i=s,s=e[--n-1],t>=s)break e}o=n,n=0;break n}break t}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(i=e[n],s=e[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,t,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=t*i;for(let o=0;o!==i;++o)e[o]=n[s+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Tr=class extends hi{constructor(t,e,n,i){super(t,e,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:ba,endingEnd:ba}}intervalChanged_(t,e,n){let i=this.parameterPositions,s=t-2,o=t+1,a=i[s],h=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case wa:s=t,a=2*e-n;break;case Ma:s=i.length-2,a=e+i[s]-i[s+1];break;default:s=t,a=n}if(h===void 0)switch(this.getSettings_().endingEnd){case wa:o=t,h=2*n-e;break;case Ma:o=1,h=n+i[1]-i[0];break;default:o=t-1,h=e}let l=(n-e)*.5,p=this.valueSize;this._weightPrev=l/(e-a),this._weightNext=l/(h-n),this._offsetPrev=s*p,this._offsetNext=o*p}interpolate_(t,e,n,i){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,h=t*a,l=h-a,p=this._offsetPrev,u=this._offsetNext,f=this._weightPrev,m=this._weightNext,g=(n-e)/(i-e),c=g*g,d=c*g,_=-f*d+2*f*c-f*g,y=(1+f)*d+(-1.5-2*f)*c+(-.5+f)*g+1,w=(-1-m)*d+(1.5+m)*c+.5*g,b=m*d-m*c;for(let M=0;M!==a;++M)s[M]=_*o[p+M]+y*o[l+M]+w*o[h+M]+b*o[u+M];return s}},Ar=class extends hi{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,h=t*a,l=h-a,p=(n-e)/(i-e),u=1-p;for(let f=0;f!==a;++f)s[f]=o[l+f]*u+o[h+f]*p;return s}},Er=class extends hi{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t){return this.copySampleValue_(t-1)}},ke=class{constructor(t,e,n,i){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Yi(e,this.TimeBufferType),this.values=Yi(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Yi(t.times,Array),values:Yi(t.values,Array)};let i=t.getInterpolation();i!==t.DefaultInterpolation&&(n.interpolation=i)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Er(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Ar(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Tr(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case ji:e=this.InterpolantFactoryMethodDiscrete;break;case $i:e=this.InterpolantFactoryMethodLinear;break;case Es:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ji;case this.InterpolantFactoryMethodLinear:return $i;case this.InterpolantFactoryMethodSmooth:return Es}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]*=t}return this}trim(t,e){let n=this.times,i=n.length,s=0,o=i-1;for(;s!==i&&n[s]<t;)++s;for(;o!==-1&&n[o]>e;)--o;if(++o,s!==0||o!==i){s>=o&&(o=Math.max(o,1),s=o-1);let a=this.getValueSize();this.times=cn(n,s,o),this.values=cn(this.values,s*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==s;a++){let h=n[a];if(typeof h=="number"&&isNaN(h)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,h),t=!1;break}if(o!==null&&o>h){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,h,o),t=!1;break}o=h}if(i!==void 0&&yo(i))for(let a=0,h=i.length;a!==h;++a){let l=i[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),t=!1;break}}return t}optimize(){let t=cn(this.times),e=cn(this.values),n=this.getValueSize(),i=this.getInterpolation()===Es,s=t.length-1,o=1;for(let a=1;a<s;++a){let h=!1,l=t[a],p=t[a+1];if(l!==p&&(a!==1||l!==t[0]))if(i)h=!0;else{let u=a*n,f=u-n,m=u+n;for(let g=0;g!==n;++g){let c=e[u+g];if(c!==e[f+g]||c!==e[m+g]){h=!0;break}}}if(h){if(a!==o){t[o]=t[a];let u=a*n,f=o*n;for(let m=0;m!==n;++m)e[f+m]=e[u+m]}++o}}if(s>0){t[o]=t[s];for(let a=s*n,h=o*n,l=0;l!==n;++l)e[h+l]=e[a+l];++o}return o!==t.length?(this.times=cn(t,0,o),this.values=cn(e,0,o*n)):(this.times=t,this.values=e),this}clone(){let t=cn(this.times,0),e=cn(this.values,0),n=this.constructor,i=new n(this.name,t,e);return i.createInterpolant=this.createInterpolant,i}};ke.prototype.TimeBufferType=Float32Array;ke.prototype.ValueBufferType=Float32Array;ke.prototype.DefaultInterpolation=$i;var En=class extends ke{};En.prototype.ValueTypeName="bool";En.prototype.ValueBufferType=Array;En.prototype.DefaultInterpolation=ji;En.prototype.InterpolantFactoryMethodLinear=void 0;En.prototype.InterpolantFactoryMethodSmooth=void 0;var Cr=class extends ke{};Cr.prototype.ValueTypeName="color";var Rr=class extends ke{};Rr.prototype.ValueTypeName="number";var Pr=class extends hi{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,h=(n-e)/(i-e),l=t*a;for(let p=l+a;l!==p;l+=4)ze.slerpFlat(s,0,o,l-a,o,l,h);return s}},wi=class extends ke{InterpolantFactoryMethodLinear(t){return new Pr(this.times,this.values,this.getValueSize(),t)}};wi.prototype.ValueTypeName="quaternion";wi.prototype.DefaultInterpolation=$i;wi.prototype.InterpolantFactoryMethodSmooth=void 0;var Cn=class extends ke{};Cn.prototype.ValueTypeName="string";Cn.prototype.ValueBufferType=Array;Cn.prototype.DefaultInterpolation=ji;Cn.prototype.InterpolantFactoryMethodLinear=void 0;Cn.prototype.InterpolantFactoryMethodSmooth=void 0;var Lr=class extends ke{};Lr.prototype.ValueTypeName="vector";var Or="\\[\\]\\.:\\/",Mf=new RegExp("["+Or+"]","g"),Nr="[^"+Or+"]",Sf="[^"+Or.replace("\\.","")+"]",Tf=/((?:WC+[\/:])*)/.source.replace("WC",Nr),Af=/(WCOD+)?/.source.replace("WCOD",Sf),Ef=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Nr),Cf=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Nr),Rf=new RegExp("^"+Tf+Af+Ef+Cf+"$"),Pf=["material","materials","bones","map"],Ir=class{constructor(t,e,n){let i=n||Vt.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},Vt=class{constructor(t,e,n){this.path=e,this.parsedPath=n||Vt.parseTrackName(e),this.node=Vt.findNode(t,this.parsedPath.nodeName)||t,this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new Vt.Composite(t,e,n):new Vt(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Mf,"")}static parseTrackName(t){let e=Rf.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let s=n.nodeName.substring(i+1);Pf.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(s){for(let o=0;o<s.length;o++){let a=s[o];if(a.name===e||a.uuid===e)return a;let h=n(a.children);if(h)return h}return null},i=n(t.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)t[e++]=n[i]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,i=e.propertyName,s=e.propertyIndex;if(t||(t=Vt.findNode(this.rootNode,e.nodeName)||this.rootNode,this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.error("THREE.PropertyBinding: Trying to update node for track: "+this.path+" but it wasn't found.");return}if(n){let l=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let p=0;p<t.length;p++)if(t[p].name===l){l=p;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(l!==void 0){if(t[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}let o=t[i];if(o===void 0){let l=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let h=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[s]!==void 0&&(s=t.morphTargetDictionary[s])}h=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(h=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(h=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[h],this.setValue=this.SetterByBindingTypeAndVersioning[h][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Vt.Composite=Ir;Vt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Vt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Vt.prototype.GetterByBindingType=[Vt.prototype._getValue_direct,Vt.prototype._getValue_array,Vt.prototype._getValue_arrayElement,Vt.prototype._getValue_toArray];Vt.prototype.SetterByBindingTypeAndVersioning=[[Vt.prototype._setValue_direct,Vt.prototype._setValue_direct_setNeedsUpdate,Vt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Vt.prototype._setValue_array,Vt.prototype._setValue_array_setNeedsUpdate,Vt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Vt.prototype._setValue_arrayElement,Vt.prototype._setValue_arrayElement_setNeedsUpdate,Vt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Vt.prototype._setValue_fromArray,Vt.prototype._setValue_fromArray_setNeedsUpdate,Vt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Of=new Float32Array(1);var Mi=class{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(he(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Dr}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Dr);var un={Circle:"Circle",Square:"Square",Fill:"Fill"};function Lf(r,t,e,n){let i=r.getImageData(0,0,r.canvas.width,r.canvas.height);function s(f){return new Uint8Array([parseInt(f.substring(1,3),16),parseInt(f.substring(3,5),16),parseInt(f.substring(5,7),16),255])}function o(f){return i.data.slice((f[1]*r.canvas.width+f[0])*4,(f[1]*r.canvas.width+f[0])*4+4)}function a(f,m){i.data[(f[1]*r.canvas.width+f[0])*4+0]=m[0],i.data[(f[1]*r.canvas.width+f[0])*4+1]=m[1],i.data[(f[1]*r.canvas.width+f[0])*4+2]=m[2],i.data[(f[1]*r.canvas.width+f[0])*4+3]=m[3]}function h(f,m){return f[0]==m[0]&&f[1]==m[1]&&f[2]==m[2]&&f[3]==m[3]}let l=s(n?"#000000":r.fillStyle);n&&(l[3]=0);let p=o([t,e]);if(h(l,p))return;let u=[[t,e]];for(;u.length>0;){let f=u.pop(),m=[[f[0]-1,f[1]+0],[f[0]+1,f[1]+0],[f[0]+0,f[1]-1],[f[0]+0,f[1]+1]];for(let g of m)g[0]<0||g[1]<0||g[0]>=r.canvas.width||g[1]>=r.canvas.width||h(o(g),p)&&(u.push(g),a(g,l))}r.putImageData(i,0,0)}var ds=10,Fr=class extends HTMLElement{constructor(){super();Ht(this,"ctx");Ht(this,"overlayCtx");Ht(this,"size");Ht(this,"color","rgb(0,0,0)");Ht(this,"brushSize",.5);Ht(this,"brushStyle",un.Circle);Ht(this,"textures",Array(4).fill(null).map(()=>{let e=new ci(new Uint8Array(262144),256,256);return e.flipY=!0,e.needsUpdate=!0,e}));Ht(this,"layers",Array(4).fill(null));Ht(this,"layer",0);Ht(this,"mouseDown",!1);Ht(this,"previousX",0);Ht(this,"previousY",0);Ht(this,"start");this.attachShadow({mode:"open"}),this.size=256;let e=document.createElement("canvas");e.id="canvas",e.width=this.size,e.height=e.width,e.oncontextmenu=()=>!1,e.addEventListener("pointerdown",a=>this.handleMouseDown(a)),document.addEventListener("pointermove",a=>this.handleMouseMove(a)),document.addEventListener("pointerup",a=>this.handleMouseUp(a)),this.ctx=e.getContext("2d",{willReadFrequently:!0});let n=document.createElement("canvas");n.id="overlay",n.width=e.width,n.height=e.height,this.overlayCtx=n.getContext("2d"),this.overlayCtx.fillStyle="black";let i=document.createElement("div");i.id="title";let s=document.createElement("slot");s.name="title",s.textContent="Placeholder",i.append(s);let o=document.createElement("style");o.textContent=`
:host {
    transform: scale(1);
    display: block;
    width: 500px;
    height: 500px;

    user-select: none;
}

* {
    box-sizing: border-box;
}

#canvas {
    width: 100%;
    height: 100%;

    image-rendering: pixelated;
    background-color: #FFF;
    border: none;
    border-radius: inherit;

    background-size: 10% 10%;
    background-image: linear-gradient(to right, #d7d7d7 1px, transparent 1px), linear-gradient(to bottom, #d7d7d7d7 1px, transparent 1px);
}
#title {
    position: absolute;
    top: 10px;
    left: 10px;

    font-family: arial;
    color: rgba(0,0,0,0.5);

    pointer-events: none;
}
#overlay {
    pointer-events: none;

    position: absolute;
    top: 0px;
    left: 0px;

    image-rendering: pixelated;
    border: none;
    border-radius: inherit;

    width: 100%;
    height: 100%;
}
`,this.shadowRoot.append(o,e,n,i)}clear(e=!0){this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height),e&&this.invalidate(this.layer)}palettize(e){function n(s,o){let a=[s[0]-o[0],s[1]-o[1],s[2]-o[2],s[3]-o[3]];return Math.sqrt(a[0]*a[0]+a[1]*a[1]+a[2]*a[2]+a[3]*a[3])}let i=this.ctx.getImageData(0,0,this.ctx.canvas.width,this.ctx.canvas.height);for(let s=0;s<this.ctx.canvas.width;s++)for(let o=0;o<this.ctx.canvas.height;o++){let a=i.data.slice((o*this.ctx.canvas.width+s)*4,(o*this.ctx.canvas.width+s)*4+4),h=9999,l=[0,0,0,0];for(let p of e)n(a,p)<h&&(h=n(a,p),l=p);i.data[(o*this.ctx.canvas.width+s)*4+0]=l[0],i.data[(o*this.ctx.canvas.width+s)*4+1]=l[1],i.data[(o*this.ctx.canvas.width+s)*4+2]=l[2],i.data[(o*this.ctx.canvas.width+s)*4+3]=l[3]}this.ctx.putImageData(i,0,0)}eventToCanvasCoords(e,n,i){let{clientX:s,clientY:o}=e,{top:a,left:h,width:l,height:p}=this.ctx.canvas.getBoundingClientRect();return{current:[(s-h)/l*this.ctx.canvas.width,(o-a)/p*this.ctx.canvas.height],previous:[(this.previousX-h)/l*this.ctx.canvas.width,(this.previousY-a)/p*this.ctx.canvas.height]}}handleMouseDown(e){if(this.layer==-1)return;this.mouseDown=!0,this.ctx.fillStyle=this.ctx.strokeStyle=this.color,this.color=="transparent"&&(this.ctx.fillStyle=this.ctx.strokeStyle="white");let{current:n}=this.eventToCanvasCoords(e);if(this.start=n,this.color=="transparent"&&(this.ctx.globalCompositeOperation="destination-out"),e.ctrlKey)Lf(this.ctx,Math.floor(n[0]),Math.floor(n[1]),this.color=="transparent"),this.mouseDown=!1;else{let i=e.pointerType=="pen"?Math.max(e.pressure,.2):this.brushSize;ws(this.ctx,n,n,i*ds,this.brushStyle==un.Square)}this.ctx.globalCompositeOperation="source-over",this.invalidate(this.layer)}handleMouseMove(e){let{current:n,previous:i}=this.eventToCanvasCoords(e),s=e.pointerType=="pen"?Math.max(e.pressure,.2):this.brushSize;if(this.overlayCtx.clearRect(0,0,this.overlayCtx.canvas.width,this.overlayCtx.canvas.height),this.overlayCtx.beginPath(),this.overlayCtx.fillStyle=this.color=="transparent"?"rgba(0,0,0,0.5)":this.color,this.brushStyle==un.Square){let o=s*ds;this.overlayCtx.fillRect(Math.floor(n[0])-o,Math.floor(n[1])-o,o*2,o*2)}else Ai(this.overlayCtx,n[0],n[1],s*ds);this.overlayCtx.fill(),this.mouseDown&&(this.color=="transparent"&&(this.ctx.globalCompositeOperation="destination-out"),ws(this.ctx,i,n,s*ds,this.brushStyle==un.Square),this.ctx.globalCompositeOperation="source-over",this.invalidate(this.layer)),this.previousX=e.clientX,this.previousY=e.clientY}handleMouseUp(e){this.mouseDown=!1}invalidate(e){this.textures[e].image.data=this.ctx.getImageData(0,0,this.ctx.canvas.width,this.ctx.canvas.height),this.textures[e].needsUpdate=!0,this.dispatchEvent(new CustomEvent("change",{detail:e}))}async saveToLayer(e){let n=await new Promise(i=>this.ctx.canvas.toBlob(i));this.layers[e]=n}async loadLayer(e){if(this.layer!=e&&(await this.saveToLayer(this.layer),this.clear(!1),this.layer=e,this.layers[this.layer]!=null)){let n=new Image,i=URL.createObjectURL(this.layers[this.layer]);n.setAttribute("src",i),await new Promise(s=>n.addEventListener("load",s)),this.ctx.drawImage(n,0,0),URL.revokeObjectURL(i)}}async serialize(){return await this.saveToLayer(this.layer),this.layers}async deserialize(e){console.assert(e.length==4),this.layer=-1,this.layers=e;for(let[n,i]of this.layers.entries()){if(this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height),i!=null){let s=new Image,o=URL.createObjectURL(i);s.setAttribute("src",o),await new Promise(a=>s.addEventListener("load",a)),this.ctx.drawImage(s,0,0),URL.revokeObjectURL(o)}this.invalidate(n)}await this.loadLayer(0)}};customElements.define("itmas-cloth",Fr);var Ur=class extends HTMLElement{constructor(){super();Ht(this,"divs",[]);this.attachShadow({mode:"open"});let e=["transparent","#dde4e8","#ffc97a","#8dc196","#5a6e93","#301c44","#ce2f7f","#ef8a6e","#514cad","#877aff"],n=document.createElement("div");n.id="wrapper";for(let[s,o]of e.entries()){let a=document.createElement("input");a.type="color",a.id=s,a.value=o;let h=document.createElement("label");h.setAttribute("for",s),h.style.backgroundColor=o,h.classList.add("color"),o=="transparent"&&h.classList.add("transparent"),o=="black"&&h.classList.add("selected"),h.addEventListener("click",l=>{for(let p of[...n.getElementsByClassName("selected")])p.classList.remove("selected");h.classList.add("selected"),this.dispatchEvent(new CustomEvent("change",{detail:h.style.backgroundColor})),l.preventDefault()}),a.addEventListener("change",l=>{h.style.backgroundColor=l.target.value,this.dispatchEvent(new CustomEvent("change",{detail:l.target.value}))}),o!="transparent"&&h.addEventListener("contextmenu",l=>(a.dispatchEvent(new MouseEvent("click")),l.preventDefault(),!1),!1),o!="transparent"&&(h.append(a),this.divs.push(h)),n.append(h)}let i=document.createElement("style");i.textContent=`
:host {
    display: block;
}
* {
    box-sizing: border-box;
}
input {
    display: block;
    opacity: 0;
    width: 0;
    height: 0;
    padding: 0;
    border: none;
    background: none;
}

#wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-basis: content;
    height: 100%;
    gap: 15px;
}

.color {
    display: block;
    outline: 3px solid black;
    border-radius: var(--roundness);

    width: 100%;
    flex-grow: 1;

    cursor: pointer;

    transition: outline 0.2s;
}
.color:hover, .selected {
    outline-width: 6px;
}
.transparent {
    background-color: #FFF !important;
    background-size: 5px 5px;
    background-image: linear-gradient(to right, #d7d7d7 1px, transparent 1px), linear-gradient(to bottom, #d7d7d7d7 1px, transparent 1px);
}
`,this.shadowRoot.append(i,n)}setColors(e){function n(i){return"#"+i.split("(")[1].split(")")[0].split(",").map(s=>parseInt(s).toString(16).padStart(2,"0")).join("")}for(let[i,s]of e.entries()){if(i>=this.divs.length)return;this.divs[i].style.backgroundColor=s,this.divs[i].firstElementChild.value=n(s)}}getColors(){return this.divs.map(e=>e.style.backgroundColor)}};customElements.define("itmas-palette",Ur);var Br=class extends HTMLElement{constructor(){super();Ht(this,"nameElem");this.attachShadow({mode:"open"}),this.nameElem=document.createElement("span"),this.shadowRoot.append(this.nameElem)}connectedCallback(){this.nameElem.innerText=`${parseInt(this.getAttribute("layer"))+1}`}};customElements.define("itmas-layer",Br);var bo={type:"change"},Vr={type:"start"},wo={type:"end"},fs=class extends Be{constructor(t,e){super(),this.object=t,this.domElement=e,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new $,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Rn.ROTATE,MIDDLE:Rn.DOLLY,RIGHT:Rn.PAN},this.touches={ONE:Pn.ROTATE,TWO:Pn.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return a.phi},this.getAzimuthalAngle=function(){return a.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(F){F.addEventListener("keydown",ut),this._domElementKeyEvents=F},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(bo),n.update(),s=i.NONE},this.update=function(){let F=new $,Y=new ze().setFromUnitVectors(t.up,new $(0,1,0)),dt=Y.clone().invert(),wt=new $,yt=new ze,St=2*Math.PI;return function(){let Nt=n.object.position;F.copy(Nt).sub(n.target),F.applyQuaternion(Y),a.setFromVector3(F),n.autoRotate&&s===i.NONE&&z(I()),n.enableDamping?(a.theta+=h.theta*n.dampingFactor,a.phi+=h.phi*n.dampingFactor):(a.theta+=h.theta,a.phi+=h.phi);let W=n.minAzimuthAngle,vt=n.maxAzimuthAngle;return isFinite(W)&&isFinite(vt)&&(W<-Math.PI?W+=St:W>Math.PI&&(W-=St),vt<-Math.PI?vt+=St:vt>Math.PI&&(vt-=St),W<=vt?a.theta=Math.max(W,Math.min(vt,a.theta)):a.theta=a.theta>(W+vt)/2?Math.max(W,a.theta):Math.min(vt,a.theta)),a.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,a.phi)),a.makeSafe(),a.radius*=l,a.radius=Math.max(n.minDistance,Math.min(n.maxDistance,a.radius)),n.enableDamping===!0?n.target.addScaledVector(p,n.dampingFactor):n.target.add(p),F.setFromSpherical(a),F.applyQuaternion(dt),Nt.copy(n.target).add(F),n.object.lookAt(n.target),n.enableDamping===!0?(h.theta*=1-n.dampingFactor,h.phi*=1-n.dampingFactor,p.multiplyScalar(1-n.dampingFactor)):(h.set(0,0,0),p.set(0,0,0)),l=1,u||wt.distanceToSquared(n.object.position)>o||8*(1-yt.dot(n.object.quaternion))>o?(n.dispatchEvent(bo),wt.copy(n.object.position),yt.copy(n.object.quaternion),u=!1,!0):!1}}(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",H),n.domElement.removeEventListener("pointerdown",Q),n.domElement.removeEventListener("pointercancel",V),n.domElement.removeEventListener("wheel",q),n.domElement.removeEventListener("pointermove",k),n.domElement.removeEventListener("pointerup",P),n._domElementKeyEvents!==null&&n._domElementKeyEvents.removeEventListener("keydown",ut)};let n=this,i={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},s=i.NONE,o=1e-6,a=new Mi,h=new Mi,l=1,p=new $,u=!1,f=new zt,m=new zt,g=new zt,c=new zt,d=new zt,_=new zt,y=new zt,w=new zt,b=new zt,M=[],L={};function I(){return 2*Math.PI/60/60*n.autoRotateSpeed}function T(){return Math.pow(.95,n.zoomSpeed)}function z(F){h.theta-=F}function A(F){h.phi-=F}let N=function(){let F=new $;return function(dt,wt){F.setFromMatrixColumn(wt,0),F.multiplyScalar(-dt),p.add(F)}}(),v=function(){let F=new $;return function(dt,wt){n.screenSpacePanning===!0?F.setFromMatrixColumn(wt,1):(F.setFromMatrixColumn(wt,0),F.crossVectors(n.object.up,F)),F.multiplyScalar(dt),p.add(F)}}(),O=function(){let F=new $;return function(dt,wt){let yt=n.domElement;if(n.object.isPerspectiveCamera){let St=n.object.position;F.copy(St).sub(n.target);let Rt=F.length();Rt*=Math.tan(n.object.fov/2*Math.PI/180),N(2*dt*Rt/yt.clientHeight,n.object.matrix),v(2*wt*Rt/yt.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(N(dt*(n.object.right-n.object.left)/n.object.zoom/yt.clientWidth,n.object.matrix),v(wt*(n.object.top-n.object.bottom)/n.object.zoom/yt.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}}();function B(F){n.object.isPerspectiveCamera?l/=F:n.object.isOrthographicCamera?(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom*F)),n.object.updateProjectionMatrix(),u=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function U(F){n.object.isPerspectiveCamera?l*=F:n.object.isOrthographicCamera?(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/F)),n.object.updateProjectionMatrix(),u=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function nt(F){f.set(F.clientX,F.clientY)}function G(F){y.set(F.clientX,F.clientY)}function J(F){c.set(F.clientX,F.clientY)}function C(F){m.set(F.clientX,F.clientY),g.subVectors(m,f).multiplyScalar(n.rotateSpeed);let Y=n.domElement;z(2*Math.PI*g.x/Y.clientHeight),A(2*Math.PI*g.y/Y.clientHeight),f.copy(m),n.update()}function R(F){w.set(F.clientX,F.clientY),b.subVectors(w,y),b.y>0?B(T()):b.y<0&&U(T()),y.copy(w),n.update()}function it(F){d.set(F.clientX,F.clientY),_.subVectors(d,c).multiplyScalar(n.panSpeed),O(_.x,_.y),c.copy(d),n.update()}function Z(F){F.deltaY<0?U(T()):F.deltaY>0&&B(T()),n.update()}function K(F){let Y=!1;switch(F.code){case n.keys.UP:O(0,n.keyPanSpeed),Y=!0;break;case n.keys.BOTTOM:O(0,-n.keyPanSpeed),Y=!0;break;case n.keys.LEFT:O(n.keyPanSpeed,0),Y=!0;break;case n.keys.RIGHT:O(-n.keyPanSpeed,0),Y=!0;break}Y&&(F.preventDefault(),n.update())}function ft(){if(M.length===1)f.set(M[0].pageX,M[0].pageY);else{let F=.5*(M[0].pageX+M[1].pageX),Y=.5*(M[0].pageY+M[1].pageY);f.set(F,Y)}}function Tt(){if(M.length===1)c.set(M[0].pageX,M[0].pageY);else{let F=.5*(M[0].pageX+M[1].pageX),Y=.5*(M[0].pageY+M[1].pageY);c.set(F,Y)}}function et(){let F=M[0].pageX-M[1].pageX,Y=M[0].pageY-M[1].pageY,dt=Math.sqrt(F*F+Y*Y);y.set(0,dt)}function At(){n.enableZoom&&et(),n.enablePan&&Tt()}function Mt(){n.enableZoom&&et(),n.enableRotate&&ft()}function bt(F){if(M.length==1)m.set(F.pageX,F.pageY);else{let dt=Et(F),wt=.5*(F.pageX+dt.x),yt=.5*(F.pageY+dt.y);m.set(wt,yt)}g.subVectors(m,f).multiplyScalar(n.rotateSpeed);let Y=n.domElement;z(2*Math.PI*g.x/Y.clientHeight),A(2*Math.PI*g.y/Y.clientHeight),f.copy(m)}function xt(F){if(M.length===1)d.set(F.pageX,F.pageY);else{let Y=Et(F),dt=.5*(F.pageX+Y.x),wt=.5*(F.pageY+Y.y);d.set(dt,wt)}_.subVectors(d,c).multiplyScalar(n.panSpeed),O(_.x,_.y),c.copy(d)}function Dt(F){let Y=Et(F),dt=F.pageX-Y.x,wt=F.pageY-Y.y,yt=Math.sqrt(dt*dt+wt*wt);w.set(0,yt),b.set(0,Math.pow(w.y/y.y,n.zoomSpeed)),B(b.y),y.copy(w)}function x(F){n.enableZoom&&Dt(F),n.enablePan&&xt(F)}function X(F){n.enableZoom&&Dt(F),n.enableRotate&&bt(F)}function Q(F){n.enabled!==!1&&(M.length===0&&(n.domElement.setPointerCapture(F.pointerId),n.domElement.addEventListener("pointermove",k),n.domElement.addEventListener("pointerup",P)),ot(F),F.pointerType==="touch"?E(F):rt(F))}function k(F){n.enabled!==!1&&(F.pointerType==="touch"?S(F):st(F))}function P(F){ht(F),M.length===0&&(n.domElement.releasePointerCapture(F.pointerId),n.domElement.removeEventListener("pointermove",k),n.domElement.removeEventListener("pointerup",P)),n.dispatchEvent(wo),s=i.NONE}function V(F){ht(F)}function rt(F){let Y;switch(F.button){case 0:Y=n.mouseButtons.LEFT;break;case 1:Y=n.mouseButtons.MIDDLE;break;case 2:Y=n.mouseButtons.RIGHT;break;default:Y=-1}switch(Y){case Rn.DOLLY:if(n.enableZoom===!1)return;G(F),s=i.DOLLY;break;case Rn.ROTATE:if(F.ctrlKey||F.metaKey||F.shiftKey){if(n.enablePan===!1)return;J(F),s=i.PAN}else{if(n.enableRotate===!1)return;nt(F),s=i.ROTATE}break;case Rn.PAN:if(F.ctrlKey||F.metaKey||F.shiftKey){if(n.enableRotate===!1)return;nt(F),s=i.ROTATE}else{if(n.enablePan===!1)return;J(F),s=i.PAN}break;default:s=i.NONE}s!==i.NONE&&n.dispatchEvent(Vr)}function st(F){switch(s){case i.ROTATE:if(n.enableRotate===!1)return;C(F);break;case i.DOLLY:if(n.enableZoom===!1)return;R(F);break;case i.PAN:if(n.enablePan===!1)return;it(F);break}}function q(F){n.enabled===!1||n.enableZoom===!1||s!==i.NONE||(F.preventDefault(),n.dispatchEvent(Vr),Z(F),n.dispatchEvent(wo))}function ut(F){n.enabled===!1||n.enablePan===!1||K(F)}function E(F){switch(pt(F),M.length){case 1:switch(n.touches.ONE){case Pn.ROTATE:if(n.enableRotate===!1)return;ft(),s=i.TOUCH_ROTATE;break;case Pn.PAN:if(n.enablePan===!1)return;Tt(),s=i.TOUCH_PAN;break;default:s=i.NONE}break;case 2:switch(n.touches.TWO){case Pn.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;At(),s=i.TOUCH_DOLLY_PAN;break;case Pn.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;Mt(),s=i.TOUCH_DOLLY_ROTATE;break;default:s=i.NONE}break;default:s=i.NONE}s!==i.NONE&&n.dispatchEvent(Vr)}function S(F){switch(pt(F),s){case i.TOUCH_ROTATE:if(n.enableRotate===!1)return;bt(F),n.update();break;case i.TOUCH_PAN:if(n.enablePan===!1)return;xt(F),n.update();break;case i.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;x(F),n.update();break;case i.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;X(F),n.update();break;default:s=i.NONE}}function H(F){n.enabled!==!1&&F.preventDefault()}function ot(F){M.push(F)}function ht(F){delete L[F.pointerId];for(let Y=0;Y<M.length;Y++)if(M[Y].pointerId==F.pointerId){M.splice(Y,1);return}}function pt(F){let Y=L[F.pointerId];Y===void 0&&(Y=new zt,L[F.pointerId]=Y),Y.set(F.pageX,F.pageY)}function Et(F){let Y=F.pointerId===M[0].pointerId?M[1]:M[0];return L[Y.pointerId]}n.domElement.addEventListener("contextmenu",H),n.domElement.addEventListener("pointerdown",Q),n.domElement.addEventListener("pointercancel",V),n.domElement.addEventListener("wheel",q,{passive:!1}),this.update()}};var ps=class{constructor(t,e,n){this.variables=[],this.currentTextureIndex=0;let i=Ue,s=new li,o=new oi;o.position.z=1;let a={passThruTexture:{value:null}},h=u(m(),a),l=new fe(new An(2,2),h);s.add(l),this.setDataType=function(g){return i=g,this},this.addVariable=function(g,c,d){let _=this.createShaderMaterial(c),y={name:g,initialValueTexture:d,material:_,dependencies:null,renderTargets:[],wrapS:null,wrapT:null,minFilter:jt,magFilter:jt};return this.variables.push(y),y},this.setVariableDependencies=function(g,c){g.dependencies=c},this.init=function(){if(n.capabilities.isWebGL2===!1&&n.extensions.has("OES_texture_float")===!1)return"No OES_texture_float support for float textures.";if(n.capabilities.maxVertexTextures===0)return"No support for vertex shader textures.";for(let g=0;g<this.variables.length;g++){let c=this.variables[g];c.renderTargets[0]=this.createRenderTarget(t,e,c.wrapS,c.wrapT,c.minFilter,c.magFilter),c.renderTargets[1]=this.createRenderTarget(t,e,c.wrapS,c.wrapT,c.minFilter,c.magFilter),this.renderTexture(c.initialValueTexture,c.renderTargets[0]),this.renderTexture(c.initialValueTexture,c.renderTargets[1]);let d=c.material,_=d.uniforms;if(c.dependencies!==null)for(let y=0;y<c.dependencies.length;y++){let w=c.dependencies[y];if(w.name!==c.name){let b=!1;for(let M=0;M<this.variables.length;M++)if(w.name===this.variables[M].name){b=!0;break}if(!b)return"Variable dependency not found. Variable="+c.name+", dependency="+w.name}_[w.name]={value:null},d.fragmentShader=`
uniform sampler2D `+w.name+`;
`+d.fragmentShader}}return this.currentTextureIndex=0,null},this.compute=function(){let g=this.currentTextureIndex,c=this.currentTextureIndex===0?1:0;for(let d=0,_=this.variables.length;d<_;d++){let y=this.variables[d];if(y.dependencies!==null){let w=y.material.uniforms;for(let b=0,M=y.dependencies.length;b<M;b++){let L=y.dependencies[b];w[L.name].value=L.renderTargets[g].texture}}this.doRenderTarget(y.material,y.renderTargets[c])}this.currentTextureIndex=c},this.getCurrentRenderTarget=function(g){return g.renderTargets[this.currentTextureIndex]},this.getAlternateRenderTarget=function(g){return g.renderTargets[this.currentTextureIndex===0?1:0]},this.dispose=function(){var c;l.geometry.dispose(),l.material.dispose();let g=this.variables;for(let d=0;d<g.length;d++){let _=g[d];(c=_.initialValueTexture)==null||c.dispose();let y=_.renderTargets;for(let w=0;w<y.length;w++)y[w].dispose()}};function p(g){g.defines.resolution="vec2( "+t.toFixed(1)+", "+e.toFixed(1)+" )"}this.addResolutionDefine=p;function u(g,c){c=c||{};let d=new ye({uniforms:c,vertexShader:f(),fragmentShader:g});return p(d),d}this.createShaderMaterial=u,this.createRenderTarget=function(g,c,d,_,y,w){return g=g||t,c=c||e,d=d||ue,_=_||ue,y=y||jt,w=w||jt,new De(g,c,{wrapS:d,wrapT:_,minFilter:y,magFilter:w,format:ve,type:i,depthBuffer:!1})},this.createTexture=function(){let g=new Float32Array(t*e*4),c=new ci(g,t,e,ve,Ue);return c.needsUpdate=!0,c},this.renderTexture=function(g,c){a.passThruTexture.value=g,this.doRenderTarget(h,c),a.passThruTexture.value=null},this.doRenderTarget=function(g,c){let d=n.getRenderTarget(),_=n.xr.enabled,y=n.shadowMap.autoUpdate,w=n.outputEncoding,b=n.toneMapping;n.xr.enabled=!1,n.shadowMap.autoUpdate=!1,n.outputEncoding=je,n.toneMapping=Ie,l.material=g,n.setRenderTarget(c),n.render(s,o),l.material=h,n.xr.enabled=_,n.shadowMap.autoUpdate=y,n.outputEncoding=w,n.toneMapping=b,n.setRenderTarget(d)};function f(){return`void main()	{

	gl_Position = vec4( position, 1.0 );

}
`}function m(){return`uniform sampler2D passThruTexture;

void main() {

	vec2 uv = gl_FragCoord.xy / resolution.xy;

	gl_FragColor = texture2D( passThruTexture, uv );

}
`}}};var Wr=`
vec4 sampleVolume(vec3 p) { // p: (0-1, 0-1, 0-1)
    vec4 t = vec4(0,0,0,0);
    vec4 f = vec4(0,0,0,0);
    vec4 s = vec4(0,0,0,0);

    vec4 result = vec4(0,0,0,0);

    #pragma unroll_loop_start
    for (int i = 0; i < 4; i++) {
        t = texture2D(topViews[i], vec2(p.x, 1.0 - p.z));
        f = texture2D(frontViews[i], p.xy);
        s = texture2D(sideViews[i], p.zy);

        if (t.a > 0.5 && f.a > 0.5 && s.a > 0.5) {
            //result = vec4((t.xyz + f.xyz + s.xyz)/3.0, 1);
            result = vec4(f.xyz, 1);

            if (distance(f.xyz, s.xyz) < 0.01)
                result = vec4(f.xyz, 1);
            if (distance(t.xyz, f.xyz) < 0.01)
                result = vec4(t.xyz, 1);
            if (distance(t.xyz, s.xyz) < 0.01)
                result = vec4(t.xyz, 1);

            return result;
        }
    }
    #pragma unroll_loop_end

    return result;
}
`,If=`
float sampleDistance(vec3 p) { // p: (0-1, 0-1, 0-1)
    float t = 0.0;
    float f = 0.0;
    float s = 0.0;

    float result = 999.0;

    #pragma unroll_loop_start
    for (int i = 0; i < 4; i++) {
        t = texture2D(topViews[i], vec2(p.x, 1.0 - p.z)).a;
        f = texture2D(frontViews[i], p.xy).a;
        s = texture2D(sideViews[i], p.zy).a;

        result = min(result, min(t, min(f, s)));
    }
    #pragma unroll_loop_end

    return result;
}
float sampleDistanceBinary(vec3 p) {
    float t = 0.0;
    float f = 0.0;
    float s = 0.0;

    float result = 0.0;

    #pragma unroll_loop_start
    for (int i = 0; i < 4; i++) {
        t = texture2D(topViews[i], vec2(p.x, 1.0 - p.z)).a;
        f = texture2D(frontViews[i], p.xy).a;
        s = texture2D(sideViews[i], p.zy).a;

        if (t < 0.5 && f < 0.5 && s < 0.5) {
            result += 1.0;
        }
    }
    #pragma unroll_loop_end

    return result/4.0;
}

// https://iquilezles.org/articles/normalsSDF/
vec3 sampleNormal(vec3 p) {
    const float eps = 0.1; // or some other value
    const vec2 h = vec2(eps,0);
    return normalize( vec3(sampleDistanceBinary(p+h.xyy) - sampleDistanceBinary(p-h.xyy),
                           sampleDistanceBinary(p+h.yxy) - sampleDistanceBinary(p-h.yxy),
                           sampleDistanceBinary(p+h.yyx) - sampleDistanceBinary(p-h.yyx) ) );
}
`,ms=class extends ye{constructor(e,{topViews:n,frontViews:i,sideViews:s}){super();Ht(this,"renderer");Ht(this,"topViews");Ht(this,"frontViews");Ht(this,"sideViews");this.renderer=e,this.topViews=n,this.frontViews=i,this.sideViews=s,this.uniforms.topViews={type:"tv",value:this.topViews},this.uniforms.frontViews={type:"tv",value:this.frontViews},this.uniforms.sideViews={type:"tv",value:this.sideViews},this.vertexShader=`
varying vec3 v_position;
varying vec2 v_uv;

void main() {
    v_position = (modelMatrix * vec4(position, 1)).xyz;
    v_uv = uv;

    vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * modelViewPosition; 
}
`,this.fragmentShader=`
uniform sampler2D topViews[4];
uniform sampler2D frontViews[4];
uniform sampler2D sideViews[4];

varying vec3 v_position;
varying vec2 v_uv;

struct Ray {
    vec3 origin;
    vec3 dir;
    vec3 invDir;
};
struct Hit {
    float tMin;
    float tMax;
};

bool inBox(vec3 p) {
    return (p.x > -0.5 && p.y > -0.5 && p.z > -0.5 && p.x < 0.5 && p.y < 0.5 && p.z < 0.5);
}

bool intersectBox(const vec3 boxMin, const vec3 boxMax, const Ray r, out Hit hit) {
    vec3 tbot = r.invDir * (boxMin - r.origin);
    vec3 ttop = r.invDir * (boxMax - r.origin);
    vec3 tmin = min(ttop, tbot);
    vec3 tmax = max(ttop, tbot);
    vec2 t = max(tmin.xx, tmin.yz);
    float t0 = max(t.x, t.y);
    t = min(tmax.xx, tmax.yz);
    float t1 = min(t.x, t.y);
    hit.tMin = t0;
    hit.tMax = t1;
    return t1 > max(t0, 0.0);
}

${Wr}
${If}

void main() {
    gl_FragColor = vec4(1,1,1,1);

    Ray r = Ray(cameraPosition,
                normalize(v_position - cameraPosition),
                1.0/normalize(v_position - cameraPosition));

    Hit hit;
    intersectBox(vec3(-0.5,-0.5,-0.5), vec3(0.5,0.5,0.5), r, hit);
    vec3 a = r.origin + hit.tMin * r.dir;
    vec3 b = r.origin + hit.tMax * r.dir;

    if (inBox(cameraPosition))
        a = cameraPosition;

    for (float i = 0.0; i < 128.0; i++) {
        vec3 p = mix(a, b, i/128.0);
        vec3 mp = p + vec3(0.5,0.5,0.5);

        vec4 result = sampleVolume(mp);
        if (result.a > 0.0) {
            gl_FragColor = result;
            break;
        }
    }
}
`,this.side=Fe}};function Ln(r,t=!0){let e=new ArrayBuffer(4);return new DataView(e).setInt32(0,r,t),new Uint8Array(e)}function Df(r,t=!0){let e=new ArrayBuffer(4);return new DataView(e).setUint32(0,r,t),new Uint8Array(e)}function Mo(r){return Uint8Array.from(r.split("").map(t=>t.charCodeAt()))}var gs=class{constructor(){Ht(this,"palette",[]);Ht(this,"voxels",[])}addVoxel(t,e){let n=this.palette.indexOf(e);n==-1&&(n=this.palette.length,this.palette.push(e)),this.voxels.push(t[0],t[1],t[2],n+1)}toBlob(){let t=this.MAIN(),e=new Uint8Array(8);return e.set(Mo("VOX "),0),e.set(Ln(150),4),new Blob([e,t])}MAIN(){let t=this.SIZE(),e=this.XYZI(),n=this.RGBA(),i=new Uint8Array(t.length+e.length+n.length);return i.set(t),i.set(e,t.length),i.set(n,t.length+e.length),this.createChunk("MAIN",[],i)}SIZE(){let t=new Uint8Array(12);return t.set(Ln(256),0),t.set(Ln(256),4),t.set(Ln(256),8),this.createChunk("SIZE",t)}XYZI(){let t=new Uint8Array(this.voxels.length+4);return t.set(Ln(this.voxels.length/4),0),t.set(this.voxels,4),this.createChunk("XYZI",t)}RGBA(){let t=new Uint8Array(1024);for(let e=0;e<this.palette.length;e++)t.set(Df(this.palette[e],!1),e*4);return this.createChunk("RGBA",t)}createChunk(t,e=[],n=[]){let i=12+e.length+n.length,s=new Uint8Array(i);return s.set(Mo(t),0),s.set(Ln(e.length),4),s.set(Ln(n.length),8),s.set(e,12),s.set(n,12+e.length),s}};var _s=Bo(To());function Ao(r,t){let e=URL.createObjectURL(r),n=document.createElement("a");n.href=e,n.download=t,n.rel="noopener",setTimeout(()=>{URL.revokeObjectURL(e)},4e4),setTimeout(()=>{n.dispatchEvent(new MouseEvent("click"))},0)}window.onbeforeunload=function(){return!0};window.addEventListener("load",()=>{let r=new li,t=new le(40,1,.1,1e3),e=document.getElementById("three-canvas"),{width:n,height:i}=e.getBoundingClientRect();e.width=n,e.height=n;let s=new kr({canvas:e});s.setClearColor(16777215);let o=[document.getElementById("top-view"),document.getElementById("front-view"),document.getElementById("side-view")],a=o.map(g=>g.textures),h=new fs(t,s.domElement);h.minDistance=.4,h.maxDistance=3,h.enableDamping=!0,t.position.z=1,h.update();function l(){requestAnimationFrame(l),h.update(),s.render(r,t)}l(),document.getElementById("palette").addEventListener("change",g=>{for(let c of o)c.color=g.detail}),document.getElementById("brush").addEventListener("change",g=>{for(let c of o)c.brushSize=parseInt(g.target.value)/parseInt(g.target.getAttribute("max"))}),document.getElementById("shape").addEventListener("click",g=>{g.target.textContent=="\u2B24"?g.target.textContent="\u2BC0":g.target.textContent="\u2B24";for(let c of o)c.brushStyle==un.Circle?c.brushStyle=un.Square:c.brushStyle=un.Circle}),document.getElementById("clear").addEventListener("click",()=>{if(confirm("Are you sure you want to clear this layer?"))for(let g of o)g.clear()}),document.getElementById("expand").addEventListener("click",()=>{for(let c of o)c.style.display=c.style.display=="none"?"block":"none";let g=document.getElementById("grid");g.style.display=g.style.display=="block"?"grid":"block"}),document.getElementById("save").addEventListener("click",async()=>{let g=new _s.default,c={};c.version=1,c.palette=palette.getColors(),g.file("metadata.json",new Blob([JSON.stringify(c)],{type:"application/json"})),s.render(r,t);let d=await new Promise(_=>document.getElementById("three-canvas").toBlob(_));console.log(d),g.file("thumbnail.png",d);for(let _ of o){let y=g.folder(_.id);for(let[w,b]of(await _.serialize()).entries())b!=null&&y.file(`layer-${w}.png`,b)}g.generateAsync({type:"blob"}).then(async _=>{Ao(_,"model.zip")})});async function p(g){let c=new _s.default;await c.loadAsync(g);for(let _ of o){let y=Array(4).fill(null);for(let[w,b]of Object.entries(c.files)){let M=w.match(new RegExp(`${_.id}/layer-(\\d+).png`));M!=null&&(y[parseInt(M[1])]=await b.async("blob"),y[parseInt(M[1])]=y[parseInt(M[1])].slice(0,y[parseInt(M[1])].size,"image/png"))}await _.deserialize(y)}let d=c.file("metadata.json");if(d!=null){let _=JSON.parse(await d.async("string"));"palette"in _&&palette.setColors(_.palette)}}document.getElementById("load").addEventListener("change",async g=>{let c=g.target.files;if(c.length==0)return;let d=c[0];await p(d)}),document.getElementById("examples").addEventListener("change",async g=>{let c=await(await fetch(`./models/${g.target.value}.zip`)).blob();await p(c)}),document.getElementById("export").addEventListener("click",async()=>{[...document.querySelectorAll("#buttons *")].forEach(z=>z.setAttribute("disabled",""));let g=new _s.default,c=new gs,d=new ps(256,256,s),_=d.createShaderMaterial(`
uniform sampler2D frontViews[4];
uniform sampler2D sideViews[4];
uniform sampler2D topViews[4];
uniform int layer;

${Wr}

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;

    vec3 p = vec3(uv.x, float(layer)/255.0, uv.y);
    gl_FragColor = sampleVolume(p);
}
`,{layer:{value:null},frontViews:{type:"tv",value:null},sideViews:{type:"tv",value:null},topViews:{type:"tv",value:null}});_.uniforms.topViews.value=o[0].textures,_.uniforms.frontViews.value=o[1].textures,_.uniforms.sideViews.value=o[2].textures;let y=d.init();y!==null&&console.error(y);let w=new Float32Array(256*256*4),b=d.createRenderTarget(),M=document.createElement("canvas");M.width=256,M.height=256;let L=M.getContext("2d"),I=new Uint8ClampedArray(256*256*4);for(let z=0;z<256;z++){document.documentElement.style.setProperty("--progress",`${z/256*100}%`),_.uniforms.layer.value=z,d.doRenderTarget(_,b),s.readRenderTargetPixels(b,0,0,256,256,w);for(let N=0;N<w.length/4;N++)if(I[N*4+0]=w[N*4+0]*255,I[N*4+1]=w[N*4+1]*255,I[N*4+2]=w[N*4+2]*255,I[N*4+3]=w[N*4+3]*255,I[N*4+3]>128){let v=N%256,O=Math.floor(N/256);c.addVoxel([v,O,z],I[N*4+0]<<24|I[N*4+1]<<16|I[N*4+2]<<8|I[N*4+3]<<0)}let A=new ImageData(I,256,256);L.putImageData(A,0,0)}document.documentElement.style.setProperty("--progress","0%");let T=c.toBlob();Ao(T,"export.vox"),[...document.querySelectorAll("#buttons *")].forEach(z=>z.removeAttribute("disabled"))}),[...document.getElementsByTagName("itmas-layer")].forEach(g=>{loadingLayers=!1;let c=parseInt(g.getAttribute("layer"));g.addEventListener("click",async()=>{var d;if(loadingLayers){console.warn("Attempted to load layers while loading layers!");return}loadingLayers=!0,(d=document.querySelector("itmas-layer.selected"))==null||d.classList.remove("selected"),g.classList.add("selected"),await Promise.all(o.map(_=>_.loadLayer(c))),loadingLayers=!1})});let u=new Ke(1,1,1),f=new ms(s,{topViews:a[0],frontViews:a[1],sideViews:a[2]}),m=new fe(u,f);r.add(m)});})();
/*!

JSZip v3.10.1 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/main/LICENSE
*/
/**
 * @license
 * Copyright 2010-2022 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
//# sourceMappingURL=bundle.js.map

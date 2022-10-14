(()=>{var Ao=Object.create;var ps=Object.defineProperty;var To=Object.getOwnPropertyDescriptor;var Eo=Object.getOwnPropertyNames;var Co=Object.getPrototypeOf,Po=Object.prototype.hasOwnProperty;var Ro=(a,t,e)=>t in a?ps(a,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[t]=e;var oi=(a=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(a,{get:(t,e)=>(typeof require<"u"?require:t)[e]}):a)(function(a){if(typeof require<"u")return require.apply(this,arguments);throw new Error('Dynamic require of "'+a+'" is not supported')});var Lo=(a,t)=>()=>(t||a((t={exports:{}}).exports,t),t.exports);var Io=(a,t,e,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of Eo(t))!Po.call(a,i)&&i!==e&&ps(a,i,{get:()=>t[i],enumerable:!(n=To(t,i))||n.enumerable});return a};var Do=(a,t,e)=>(e=a!=null?Ao(Co(a)):{},Io(t||!a||!a.__esModule?ps(e,"default",{value:a,enumerable:!0}):e,a));var ie=(a,t,e)=>(Ro(a,typeof t!="symbol"?t+"":t,e),e);var vo=Lo((xo,kr)=>{(function(a){typeof xo=="object"&&typeof kr<"u"?kr.exports=a():typeof define=="function"&&define.amd?define([],a):(typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:this).JSZip=a()})(function(){return function a(t,e,n){function i(r,l){if(!e[r]){if(!t[r]){var c=typeof oi=="function"&&oi;if(!l&&c)return c(r,!0);if(s)return s(r,!0);var p=new Error("Cannot find module '"+r+"'");throw p.code="MODULE_NOT_FOUND",p}var h=e[r]={exports:{}};t[r][0].call(h.exports,function(f){var m=t[r][1][f];return i(m||f)},h,h.exports,a,t,e,n)}return e[r].exports}for(var s=typeof oi=="function"&&oi,o=0;o<n.length;o++)i(n[o]);return i}({1:[function(a,t,e){"use strict";var n=a("./utils"),i=a("./support"),s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";e.encode=function(o){for(var r,l,c,p,h,f,m,g=[],u=0,d=o.length,x=d,y=n.getTypeOf(o)!=="string";u<o.length;)x=d-u,c=y?(r=o[u++],l=u<d?o[u++]:0,u<d?o[u++]:0):(r=o.charCodeAt(u++),l=u<d?o.charCodeAt(u++):0,u<d?o.charCodeAt(u++):0),p=r>>2,h=(3&r)<<4|l>>4,f=1<x?(15&l)<<2|c>>6:64,m=2<x?63&c:64,g.push(s.charAt(p)+s.charAt(h)+s.charAt(f)+s.charAt(m));return g.join("")},e.decode=function(o){var r,l,c,p,h,f,m=0,g=0,u="data:";if(o.substr(0,u.length)===u)throw new Error("Invalid base64 input, it looks like a data url.");var d,x=3*(o=o.replace(/[^A-Za-z0-9+/=]/g,"")).length/4;if(o.charAt(o.length-1)===s.charAt(64)&&x--,o.charAt(o.length-2)===s.charAt(64)&&x--,x%1!=0)throw new Error("Invalid base64 input, bad content length.");for(d=i.uint8array?new Uint8Array(0|x):new Array(0|x);m<o.length;)r=s.indexOf(o.charAt(m++))<<2|(p=s.indexOf(o.charAt(m++)))>>4,l=(15&p)<<4|(h=s.indexOf(o.charAt(m++)))>>2,c=(3&h)<<6|(f=s.indexOf(o.charAt(m++))),d[g++]=r,h!==64&&(d[g++]=l),f!==64&&(d[g++]=c);return d}},{"./support":30,"./utils":32}],2:[function(a,t,e){"use strict";var n=a("./external"),i=a("./stream/DataWorker"),s=a("./stream/Crc32Probe"),o=a("./stream/DataLengthProbe");function r(l,c,p,h,f){this.compressedSize=l,this.uncompressedSize=c,this.crc32=p,this.compression=h,this.compressedContent=f}r.prototype={getContentWorker:function(){var l=new i(n.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new o("data_length")),c=this;return l.on("end",function(){if(this.streamInfo.data_length!==c.uncompressedSize)throw new Error("Bug : uncompressed data size mismatch")}),l},getCompressedWorker:function(){return new i(n.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize",this.compressedSize).withStreamInfo("uncompressedSize",this.uncompressedSize).withStreamInfo("crc32",this.crc32).withStreamInfo("compression",this.compression)}},r.createWorkerFrom=function(l,c,p){return l.pipe(new s).pipe(new o("uncompressedSize")).pipe(c.compressWorker(p)).pipe(new o("compressedSize")).withStreamInfo("compression",c)},t.exports=r},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(a,t,e){"use strict";var n=a("./stream/GenericWorker");e.STORE={magic:"\0\0",compressWorker:function(){return new n("STORE compression")},uncompressWorker:function(){return new n("STORE decompression")}},e.DEFLATE=a("./flate")},{"./flate":7,"./stream/GenericWorker":28}],4:[function(a,t,e){"use strict";var n=a("./utils"),i=function(){for(var s,o=[],r=0;r<256;r++){s=r;for(var l=0;l<8;l++)s=1&s?3988292384^s>>>1:s>>>1;o[r]=s}return o}();t.exports=function(s,o){return s!==void 0&&s.length?n.getTypeOf(s)!=="string"?function(r,l,c,p){var h=i,f=p+c;r^=-1;for(var m=p;m<f;m++)r=r>>>8^h[255&(r^l[m])];return-1^r}(0|o,s,s.length,0):function(r,l,c,p){var h=i,f=p+c;r^=-1;for(var m=p;m<f;m++)r=r>>>8^h[255&(r^l.charCodeAt(m))];return-1^r}(0|o,s,s.length,0):0}},{"./utils":32}],5:[function(a,t,e){"use strict";e.base64=!1,e.binary=!1,e.dir=!1,e.createFolders=!0,e.date=null,e.compression=null,e.compressionOptions=null,e.comment=null,e.unixPermissions=null,e.dosPermissions=null},{}],6:[function(a,t,e){"use strict";var n=null;n=typeof Promise<"u"?Promise:a("lie"),t.exports={Promise:n}},{lie:37}],7:[function(a,t,e){"use strict";var n=typeof Uint8Array<"u"&&typeof Uint16Array<"u"&&typeof Uint32Array<"u",i=a("pako"),s=a("./utils"),o=a("./stream/GenericWorker"),r=n?"uint8array":"array";function l(c,p){o.call(this,"FlateWorker/"+c),this._pako=null,this._pakoAction=c,this._pakoOptions=p,this.meta={}}e.magic="\b\0",s.inherits(l,o),l.prototype.processChunk=function(c){this.meta=c.meta,this._pako===null&&this._createPako(),this._pako.push(s.transformTo(r,c.data),!1)},l.prototype.flush=function(){o.prototype.flush.call(this),this._pako===null&&this._createPako(),this._pako.push([],!0)},l.prototype.cleanUp=function(){o.prototype.cleanUp.call(this),this._pako=null},l.prototype._createPako=function(){this._pako=new i[this._pakoAction]({raw:!0,level:this._pakoOptions.level||-1});var c=this;this._pako.onData=function(p){c.push({data:p,meta:c.meta})}},e.compressWorker=function(c){return new l("Deflate",c)},e.uncompressWorker=function(){return new l("Inflate",{})}},{"./stream/GenericWorker":28,"./utils":32,pako:38}],8:[function(a,t,e){"use strict";function n(h,f){var m,g="";for(m=0;m<f;m++)g+=String.fromCharCode(255&h),h>>>=8;return g}function i(h,f,m,g,u,d){var x,y,M=h.file,w=h.compression,S=d!==r.utf8encode,I=s.transformTo("string",d(M.name)),D=s.transformTo("string",r.utf8encode(M.name)),A=M.comment,k=s.transformTo("string",d(A)),T=s.transformTo("string",r.utf8encode(A)),F=D.length!==M.name.length,v=T.length!==A.length,O="",B="",U="",nt=M.dir,G=M.date,J={crc32:0,compressedSize:0,uncompressedSize:0};f&&!m||(J.crc32=h.crc32,J.compressedSize=h.compressedSize,J.uncompressedSize=h.uncompressedSize);var C=0;f&&(C|=8),S||!F&&!v||(C|=2048);var P=0,it=0;nt&&(P|=16),u==="UNIX"?(it=798,P|=function(K,ft){var At=K;return K||(At=ft?16893:33204),(65535&At)<<16}(M.unixPermissions,nt)):(it=20,P|=function(K){return 63&(K||0)}(M.dosPermissions)),x=G.getUTCHours(),x<<=6,x|=G.getUTCMinutes(),x<<=5,x|=G.getUTCSeconds()/2,y=G.getUTCFullYear()-1980,y<<=4,y|=G.getUTCMonth()+1,y<<=5,y|=G.getUTCDate(),F&&(B=n(1,1)+n(l(I),4)+D,O+="up"+n(B.length,2)+B),v&&(U=n(1,1)+n(l(k),4)+T,O+="uc"+n(U.length,2)+U);var Z="";return Z+=`
\0`,Z+=n(C,2),Z+=w.magic,Z+=n(x,2),Z+=n(y,2),Z+=n(J.crc32,4),Z+=n(J.compressedSize,4),Z+=n(J.uncompressedSize,4),Z+=n(I.length,2),Z+=n(O.length,2),{fileRecord:c.LOCAL_FILE_HEADER+Z+I+O,dirRecord:c.CENTRAL_FILE_HEADER+n(it,2)+Z+n(k.length,2)+"\0\0\0\0"+n(P,4)+n(g,4)+I+O+k}}var s=a("../utils"),o=a("../stream/GenericWorker"),r=a("../utf8"),l=a("../crc32"),c=a("../signature");function p(h,f,m,g){o.call(this,"ZipFileWorker"),this.bytesWritten=0,this.zipComment=f,this.zipPlatform=m,this.encodeFileName=g,this.streamFiles=h,this.accumulate=!1,this.contentBuffer=[],this.dirRecords=[],this.currentSourceOffset=0,this.entriesCount=0,this.currentFile=null,this._sources=[]}s.inherits(p,o),p.prototype.push=function(h){var f=h.meta.percent||0,m=this.entriesCount,g=this._sources.length;this.accumulate?this.contentBuffer.push(h):(this.bytesWritten+=h.data.length,o.prototype.push.call(this,{data:h.data,meta:{currentFile:this.currentFile,percent:m?(f+100*(m-g-1))/m:100}}))},p.prototype.openedSource=function(h){this.currentSourceOffset=this.bytesWritten,this.currentFile=h.file.name;var f=this.streamFiles&&!h.file.dir;if(f){var m=i(h,f,!1,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.push({data:m.fileRecord,meta:{percent:0}})}else this.accumulate=!0},p.prototype.closedSource=function(h){this.accumulate=!1;var f=this.streamFiles&&!h.file.dir,m=i(h,f,!0,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);if(this.dirRecords.push(m.dirRecord),f)this.push({data:function(g){return c.DATA_DESCRIPTOR+n(g.crc32,4)+n(g.compressedSize,4)+n(g.uncompressedSize,4)}(h),meta:{percent:100}});else for(this.push({data:m.fileRecord,meta:{percent:0}});this.contentBuffer.length;)this.push(this.contentBuffer.shift());this.currentFile=null},p.prototype.flush=function(){for(var h=this.bytesWritten,f=0;f<this.dirRecords.length;f++)this.push({data:this.dirRecords[f],meta:{percent:100}});var m=this.bytesWritten-h,g=function(u,d,x,y,M){var w=s.transformTo("string",M(y));return c.CENTRAL_DIRECTORY_END+"\0\0\0\0"+n(u,2)+n(u,2)+n(d,4)+n(x,4)+n(w.length,2)+w}(this.dirRecords.length,m,h,this.zipComment,this.encodeFileName);this.push({data:g,meta:{percent:100}})},p.prototype.prepareNextSource=function(){this.previous=this._sources.shift(),this.openedSource(this.previous.streamInfo),this.isPaused?this.previous.pause():this.previous.resume()},p.prototype.registerPrevious=function(h){this._sources.push(h);var f=this;return h.on("data",function(m){f.processChunk(m)}),h.on("end",function(){f.closedSource(f.previous.streamInfo),f._sources.length?f.prepareNextSource():f.end()}),h.on("error",function(m){f.error(m)}),this},p.prototype.resume=function(){return!!o.prototype.resume.call(this)&&(!this.previous&&this._sources.length?(this.prepareNextSource(),!0):this.previous||this._sources.length||this.generatedError?void 0:(this.end(),!0))},p.prototype.error=function(h){var f=this._sources;if(!o.prototype.error.call(this,h))return!1;for(var m=0;m<f.length;m++)try{f[m].error(h)}catch(g){}return!0},p.prototype.lock=function(){o.prototype.lock.call(this);for(var h=this._sources,f=0;f<h.length;f++)h[f].lock()},t.exports=p},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(a,t,e){"use strict";var n=a("../compressions"),i=a("./ZipFileWorker");e.generateWorker=function(s,o,r){var l=new i(o.streamFiles,r,o.platform,o.encodeFileName),c=0;try{s.forEach(function(p,h){c++;var f=function(d,x){var y=d||x,M=n[y];if(!M)throw new Error(y+" is not a valid compression method !");return M}(h.options.compression,o.compression),m=h.options.compressionOptions||o.compressionOptions||{},g=h.dir,u=h.date;h._compressWorker(f,m).withStreamInfo("file",{name:p,dir:g,date:u,comment:h.comment||"",unixPermissions:h.unixPermissions,dosPermissions:h.dosPermissions}).pipe(l)}),l.entriesCount=c}catch(p){l.error(p)}return l}},{"../compressions":3,"./ZipFileWorker":8}],10:[function(a,t,e){"use strict";function n(){if(!(this instanceof n))return new n;if(arguments.length)throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");this.files=Object.create(null),this.comment=null,this.root="",this.clone=function(){var i=new n;for(var s in this)typeof this[s]!="function"&&(i[s]=this[s]);return i}}(n.prototype=a("./object")).loadAsync=a("./load"),n.support=a("./support"),n.defaults=a("./defaults"),n.version="3.10.1",n.loadAsync=function(i,s){return new n().loadAsync(i,s)},n.external=a("./external"),t.exports=n},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(a,t,e){"use strict";var n=a("./utils"),i=a("./external"),s=a("./utf8"),o=a("./zipEntries"),r=a("./stream/Crc32Probe"),l=a("./nodejsUtils");function c(p){return new i.Promise(function(h,f){var m=p.decompressed.getContentWorker().pipe(new r);m.on("error",function(g){f(g)}).on("end",function(){m.streamInfo.crc32!==p.decompressed.crc32?f(new Error("Corrupted zip : CRC32 mismatch")):h()}).resume()})}t.exports=function(p,h){var f=this;return h=n.extend(h||{},{base64:!1,checkCRC32:!1,optimizedBinaryString:!1,createFolders:!1,decodeFileName:s.utf8decode}),l.isNode&&l.isStream(p)?i.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")):n.prepareContent("the loaded zip file",p,!0,h.optimizedBinaryString,h.base64).then(function(m){var g=new o(h);return g.load(m),g}).then(function(m){var g=[i.Promise.resolve(m)],u=m.files;if(h.checkCRC32)for(var d=0;d<u.length;d++)g.push(c(u[d]));return i.Promise.all(g)}).then(function(m){for(var g=m.shift(),u=g.files,d=0;d<u.length;d++){var x=u[d],y=x.fileNameStr,M=n.resolve(x.fileNameStr);f.file(M,x.decompressed,{binary:!0,optimizedBinaryString:!0,date:x.date,dir:x.dir,comment:x.fileCommentStr.length?x.fileCommentStr:null,unixPermissions:x.unixPermissions,dosPermissions:x.dosPermissions,createFolders:h.createFolders}),x.dir||(f.file(M).unsafeOriginalName=y)}return g.zipComment.length&&(f.comment=g.zipComment),f})}},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(a,t,e){"use strict";var n=a("../utils"),i=a("../stream/GenericWorker");function s(o,r){i.call(this,"Nodejs stream input adapter for "+o),this._upstreamEnded=!1,this._bindStream(r)}n.inherits(s,i),s.prototype._bindStream=function(o){var r=this;(this._stream=o).pause(),o.on("data",function(l){r.push({data:l,meta:{percent:0}})}).on("error",function(l){r.isPaused?this.generatedError=l:r.error(l)}).on("end",function(){r.isPaused?r._upstreamEnded=!0:r.end()})},s.prototype.pause=function(){return!!i.prototype.pause.call(this)&&(this._stream.pause(),!0)},s.prototype.resume=function(){return!!i.prototype.resume.call(this)&&(this._upstreamEnded?this.end():this._stream.resume(),!0)},t.exports=s},{"../stream/GenericWorker":28,"../utils":32}],13:[function(a,t,e){"use strict";var n=a("readable-stream").Readable;function i(s,o,r){n.call(this,o),this._helper=s;var l=this;s.on("data",function(c,p){l.push(c)||l._helper.pause(),r&&r(p)}).on("error",function(c){l.emit("error",c)}).on("end",function(){l.push(null)})}a("../utils").inherits(i,n),i.prototype._read=function(){this._helper.resume()},t.exports=i},{"../utils":32,"readable-stream":16}],14:[function(a,t,e){"use strict";t.exports={isNode:typeof Buffer<"u",newBufferFrom:function(n,i){if(Buffer.from&&Buffer.from!==Uint8Array.from)return Buffer.from(n,i);if(typeof n=="number")throw new Error('The "data" argument must not be a number');return new Buffer(n,i)},allocBuffer:function(n){if(Buffer.alloc)return Buffer.alloc(n);var i=new Buffer(n);return i.fill(0),i},isBuffer:function(n){return Buffer.isBuffer(n)},isStream:function(n){return n&&typeof n.on=="function"&&typeof n.pause=="function"&&typeof n.resume=="function"}}},{}],15:[function(a,t,e){"use strict";function n(M,w,S){var I,D=s.getTypeOf(w),A=s.extend(S||{},l);A.date=A.date||new Date,A.compression!==null&&(A.compression=A.compression.toUpperCase()),typeof A.unixPermissions=="string"&&(A.unixPermissions=parseInt(A.unixPermissions,8)),A.unixPermissions&&16384&A.unixPermissions&&(A.dir=!0),A.dosPermissions&&16&A.dosPermissions&&(A.dir=!0),A.dir&&(M=u(M)),A.createFolders&&(I=g(M))&&d.call(this,I,!0);var k=D==="string"&&A.binary===!1&&A.base64===!1;S&&S.binary!==void 0||(A.binary=!k),(w instanceof c&&w.uncompressedSize===0||A.dir||!w||w.length===0)&&(A.base64=!1,A.binary=!0,w="",A.compression="STORE",D="string");var T=null;T=w instanceof c||w instanceof o?w:f.isNode&&f.isStream(w)?new m(M,w):s.prepareContent(M,w,A.binary,A.optimizedBinaryString,A.base64);var F=new p(M,T,A);this.files[M]=F}var i=a("./utf8"),s=a("./utils"),o=a("./stream/GenericWorker"),r=a("./stream/StreamHelper"),l=a("./defaults"),c=a("./compressedObject"),p=a("./zipObject"),h=a("./generate"),f=a("./nodejsUtils"),m=a("./nodejs/NodejsStreamInputAdapter"),g=function(M){M.slice(-1)==="/"&&(M=M.substring(0,M.length-1));var w=M.lastIndexOf("/");return 0<w?M.substring(0,w):""},u=function(M){return M.slice(-1)!=="/"&&(M+="/"),M},d=function(M,w){return w=w!==void 0?w:l.createFolders,M=u(M),this.files[M]||n.call(this,M,null,{dir:!0,createFolders:w}),this.files[M]};function x(M){return Object.prototype.toString.call(M)==="[object RegExp]"}var y={load:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},forEach:function(M){var w,S,I;for(w in this.files)I=this.files[w],(S=w.slice(this.root.length,w.length))&&w.slice(0,this.root.length)===this.root&&M(S,I)},filter:function(M){var w=[];return this.forEach(function(S,I){M(S,I)&&w.push(I)}),w},file:function(M,w,S){if(arguments.length!==1)return M=this.root+M,n.call(this,M,w,S),this;if(x(M)){var I=M;return this.filter(function(A,k){return!k.dir&&I.test(A)})}var D=this.files[this.root+M];return D&&!D.dir?D:null},folder:function(M){if(!M)return this;if(x(M))return this.filter(function(D,A){return A.dir&&M.test(D)});var w=this.root+M,S=d.call(this,w),I=this.clone();return I.root=S.name,I},remove:function(M){M=this.root+M;var w=this.files[M];if(w||(M.slice(-1)!=="/"&&(M+="/"),w=this.files[M]),w&&!w.dir)delete this.files[M];else for(var S=this.filter(function(D,A){return A.name.slice(0,M.length)===M}),I=0;I<S.length;I++)delete this.files[S[I].name];return this},generate:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},generateInternalStream:function(M){var w,S={};try{if((S=s.extend(M||{},{streamFiles:!1,compression:"STORE",compressionOptions:null,type:"",platform:"DOS",comment:null,mimeType:"application/zip",encodeFileName:i.utf8encode})).type=S.type.toLowerCase(),S.compression=S.compression.toUpperCase(),S.type==="binarystring"&&(S.type="string"),!S.type)throw new Error("No output type specified.");s.checkSupport(S.type),S.platform!=="darwin"&&S.platform!=="freebsd"&&S.platform!=="linux"&&S.platform!=="sunos"||(S.platform="UNIX"),S.platform==="win32"&&(S.platform="DOS");var I=S.comment||this.comment||"";w=h.generateWorker(this,S,I)}catch(D){(w=new o("error")).error(D)}return new r(w,S.type||"string",S.mimeType)},generateAsync:function(M,w){return this.generateInternalStream(M).accumulate(w)},generateNodeStream:function(M,w){return(M=M||{}).type||(M.type="nodebuffer"),this.generateInternalStream(M).toNodejsStream(w)}};t.exports=y},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(a,t,e){"use strict";t.exports=a("stream")},{stream:void 0}],17:[function(a,t,e){"use strict";var n=a("./DataReader");function i(s){n.call(this,s);for(var o=0;o<this.data.length;o++)s[o]=255&s[o]}a("../utils").inherits(i,n),i.prototype.byteAt=function(s){return this.data[this.zero+s]},i.prototype.lastIndexOfSignature=function(s){for(var o=s.charCodeAt(0),r=s.charCodeAt(1),l=s.charCodeAt(2),c=s.charCodeAt(3),p=this.length-4;0<=p;--p)if(this.data[p]===o&&this.data[p+1]===r&&this.data[p+2]===l&&this.data[p+3]===c)return p-this.zero;return-1},i.prototype.readAndCheckSignature=function(s){var o=s.charCodeAt(0),r=s.charCodeAt(1),l=s.charCodeAt(2),c=s.charCodeAt(3),p=this.readData(4);return o===p[0]&&r===p[1]&&l===p[2]&&c===p[3]},i.prototype.readData=function(s){if(this.checkOffset(s),s===0)return[];var o=this.data.slice(this.zero+this.index,this.zero+this.index+s);return this.index+=s,o},t.exports=i},{"../utils":32,"./DataReader":18}],18:[function(a,t,e){"use strict";var n=a("../utils");function i(s){this.data=s,this.length=s.length,this.index=0,this.zero=0}i.prototype={checkOffset:function(s){this.checkIndex(this.index+s)},checkIndex:function(s){if(this.length<this.zero+s||s<0)throw new Error("End of data reached (data length = "+this.length+", asked index = "+s+"). Corrupted zip ?")},setIndex:function(s){this.checkIndex(s),this.index=s},skip:function(s){this.setIndex(this.index+s)},byteAt:function(){},readInt:function(s){var o,r=0;for(this.checkOffset(s),o=this.index+s-1;o>=this.index;o--)r=(r<<8)+this.byteAt(o);return this.index+=s,r},readString:function(s){return n.transformTo("string",this.readData(s))},readData:function(){},lastIndexOfSignature:function(){},readAndCheckSignature:function(){},readDate:function(){var s=this.readInt(4);return new Date(Date.UTC(1980+(s>>25&127),(s>>21&15)-1,s>>16&31,s>>11&31,s>>5&63,(31&s)<<1))}},t.exports=i},{"../utils":32}],19:[function(a,t,e){"use strict";var n=a("./Uint8ArrayReader");function i(s){n.call(this,s)}a("../utils").inherits(i,n),i.prototype.readData=function(s){this.checkOffset(s);var o=this.data.slice(this.zero+this.index,this.zero+this.index+s);return this.index+=s,o},t.exports=i},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(a,t,e){"use strict";var n=a("./DataReader");function i(s){n.call(this,s)}a("../utils").inherits(i,n),i.prototype.byteAt=function(s){return this.data.charCodeAt(this.zero+s)},i.prototype.lastIndexOfSignature=function(s){return this.data.lastIndexOf(s)-this.zero},i.prototype.readAndCheckSignature=function(s){return s===this.readData(4)},i.prototype.readData=function(s){this.checkOffset(s);var o=this.data.slice(this.zero+this.index,this.zero+this.index+s);return this.index+=s,o},t.exports=i},{"../utils":32,"./DataReader":18}],21:[function(a,t,e){"use strict";var n=a("./ArrayReader");function i(s){n.call(this,s)}a("../utils").inherits(i,n),i.prototype.readData=function(s){if(this.checkOffset(s),s===0)return new Uint8Array(0);var o=this.data.subarray(this.zero+this.index,this.zero+this.index+s);return this.index+=s,o},t.exports=i},{"../utils":32,"./ArrayReader":17}],22:[function(a,t,e){"use strict";var n=a("../utils"),i=a("../support"),s=a("./ArrayReader"),o=a("./StringReader"),r=a("./NodeBufferReader"),l=a("./Uint8ArrayReader");t.exports=function(c){var p=n.getTypeOf(c);return n.checkSupport(p),p!=="string"||i.uint8array?p==="nodebuffer"?new r(c):i.uint8array?new l(n.transformTo("uint8array",c)):new s(n.transformTo("array",c)):new o(c)}},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(a,t,e){"use strict";e.LOCAL_FILE_HEADER="PK",e.CENTRAL_FILE_HEADER="PK",e.CENTRAL_DIRECTORY_END="PK",e.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK\x07",e.ZIP64_CENTRAL_DIRECTORY_END="PK",e.DATA_DESCRIPTOR="PK\x07\b"},{}],24:[function(a,t,e){"use strict";var n=a("./GenericWorker"),i=a("../utils");function s(o){n.call(this,"ConvertWorker to "+o),this.destType=o}i.inherits(s,n),s.prototype.processChunk=function(o){this.push({data:i.transformTo(this.destType,o.data),meta:o.meta})},t.exports=s},{"../utils":32,"./GenericWorker":28}],25:[function(a,t,e){"use strict";var n=a("./GenericWorker"),i=a("../crc32");function s(){n.call(this,"Crc32Probe"),this.withStreamInfo("crc32",0)}a("../utils").inherits(s,n),s.prototype.processChunk=function(o){this.streamInfo.crc32=i(o.data,this.streamInfo.crc32||0),this.push(o)},t.exports=s},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(a,t,e){"use strict";var n=a("../utils"),i=a("./GenericWorker");function s(o){i.call(this,"DataLengthProbe for "+o),this.propName=o,this.withStreamInfo(o,0)}n.inherits(s,i),s.prototype.processChunk=function(o){if(o){var r=this.streamInfo[this.propName]||0;this.streamInfo[this.propName]=r+o.data.length}i.prototype.processChunk.call(this,o)},t.exports=s},{"../utils":32,"./GenericWorker":28}],27:[function(a,t,e){"use strict";var n=a("../utils"),i=a("./GenericWorker");function s(o){i.call(this,"DataWorker");var r=this;this.dataIsReady=!1,this.index=0,this.max=0,this.data=null,this.type="",this._tickScheduled=!1,o.then(function(l){r.dataIsReady=!0,r.data=l,r.max=l&&l.length||0,r.type=n.getTypeOf(l),r.isPaused||r._tickAndRepeat()},function(l){r.error(l)})}n.inherits(s,i),s.prototype.cleanUp=function(){i.prototype.cleanUp.call(this),this.data=null},s.prototype.resume=function(){return!!i.prototype.resume.call(this)&&(!this._tickScheduled&&this.dataIsReady&&(this._tickScheduled=!0,n.delay(this._tickAndRepeat,[],this)),!0)},s.prototype._tickAndRepeat=function(){this._tickScheduled=!1,this.isPaused||this.isFinished||(this._tick(),this.isFinished||(n.delay(this._tickAndRepeat,[],this),this._tickScheduled=!0))},s.prototype._tick=function(){if(this.isPaused||this.isFinished)return!1;var o=null,r=Math.min(this.max,this.index+16384);if(this.index>=this.max)return this.end();switch(this.type){case"string":o=this.data.substring(this.index,r);break;case"uint8array":o=this.data.subarray(this.index,r);break;case"array":case"nodebuffer":o=this.data.slice(this.index,r)}return this.index=r,this.push({data:o,meta:{percent:this.max?this.index/this.max*100:0}})},t.exports=s},{"../utils":32,"./GenericWorker":28}],28:[function(a,t,e){"use strict";function n(i){this.name=i||"default",this.streamInfo={},this.generatedError=null,this.extraStreamInfo={},this.isPaused=!0,this.isFinished=!1,this.isLocked=!1,this._listeners={data:[],end:[],error:[]},this.previous=null}n.prototype={push:function(i){this.emit("data",i)},end:function(){if(this.isFinished)return!1;this.flush();try{this.emit("end"),this.cleanUp(),this.isFinished=!0}catch(i){this.emit("error",i)}return!0},error:function(i){return!this.isFinished&&(this.isPaused?this.generatedError=i:(this.isFinished=!0,this.emit("error",i),this.previous&&this.previous.error(i),this.cleanUp()),!0)},on:function(i,s){return this._listeners[i].push(s),this},cleanUp:function(){this.streamInfo=this.generatedError=this.extraStreamInfo=null,this._listeners=[]},emit:function(i,s){if(this._listeners[i])for(var o=0;o<this._listeners[i].length;o++)this._listeners[i][o].call(this,s)},pipe:function(i){return i.registerPrevious(this)},registerPrevious:function(i){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.streamInfo=i.streamInfo,this.mergeStreamInfo(),this.previous=i;var s=this;return i.on("data",function(o){s.processChunk(o)}),i.on("end",function(){s.end()}),i.on("error",function(o){s.error(o)}),this},pause:function(){return!this.isPaused&&!this.isFinished&&(this.isPaused=!0,this.previous&&this.previous.pause(),!0)},resume:function(){if(!this.isPaused||this.isFinished)return!1;var i=this.isPaused=!1;return this.generatedError&&(this.error(this.generatedError),i=!0),this.previous&&this.previous.resume(),!i},flush:function(){},processChunk:function(i){this.push(i)},withStreamInfo:function(i,s){return this.extraStreamInfo[i]=s,this.mergeStreamInfo(),this},mergeStreamInfo:function(){for(var i in this.extraStreamInfo)Object.prototype.hasOwnProperty.call(this.extraStreamInfo,i)&&(this.streamInfo[i]=this.extraStreamInfo[i])},lock:function(){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.isLocked=!0,this.previous&&this.previous.lock()},toString:function(){var i="Worker "+this.name;return this.previous?this.previous+" -> "+i:i}},t.exports=n},{}],29:[function(a,t,e){"use strict";var n=a("../utils"),i=a("./ConvertWorker"),s=a("./GenericWorker"),o=a("../base64"),r=a("../support"),l=a("../external"),c=null;if(r.nodestream)try{c=a("../nodejs/NodejsStreamOutputAdapter")}catch(f){}function p(f,m){return new l.Promise(function(g,u){var d=[],x=f._internalType,y=f._outputType,M=f._mimeType;f.on("data",function(w,S){d.push(w),m&&m(S)}).on("error",function(w){d=[],u(w)}).on("end",function(){try{var w=function(S,I,D){switch(S){case"blob":return n.newBlob(n.transformTo("arraybuffer",I),D);case"base64":return o.encode(I);default:return n.transformTo(S,I)}}(y,function(S,I){var D,A=0,k=null,T=0;for(D=0;D<I.length;D++)T+=I[D].length;switch(S){case"string":return I.join("");case"array":return Array.prototype.concat.apply([],I);case"uint8array":for(k=new Uint8Array(T),D=0;D<I.length;D++)k.set(I[D],A),A+=I[D].length;return k;case"nodebuffer":return Buffer.concat(I);default:throw new Error("concat : unsupported type '"+S+"'")}}(x,d),M);g(w)}catch(S){u(S)}d=[]}).resume()})}function h(f,m,g){var u=m;switch(m){case"blob":case"arraybuffer":u="uint8array";break;case"base64":u="string"}try{this._internalType=u,this._outputType=m,this._mimeType=g,n.checkSupport(u),this._worker=f.pipe(new i(u)),f.lock()}catch(d){this._worker=new s("error"),this._worker.error(d)}}h.prototype={accumulate:function(f){return p(this,f)},on:function(f,m){var g=this;return f==="data"?this._worker.on(f,function(u){m.call(g,u.data,u.meta)}):this._worker.on(f,function(){n.delay(m,arguments,g)}),this},resume:function(){return n.delay(this._worker.resume,[],this._worker),this},pause:function(){return this._worker.pause(),this},toNodejsStream:function(f){if(n.checkSupport("nodestream"),this._outputType!=="nodebuffer")throw new Error(this._outputType+" is not supported by this method");return new c(this,{objectMode:this._outputType!=="nodebuffer"},f)}},t.exports=h},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(a,t,e){"use strict";if(e.base64=!0,e.array=!0,e.string=!0,e.arraybuffer=typeof ArrayBuffer<"u"&&typeof Uint8Array<"u",e.nodebuffer=typeof Buffer<"u",e.uint8array=typeof Uint8Array<"u",typeof ArrayBuffer>"u")e.blob=!1;else{var n=new ArrayBuffer(0);try{e.blob=new Blob([n],{type:"application/zip"}).size===0}catch(s){try{var i=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);i.append(n),e.blob=i.getBlob("application/zip").size===0}catch(o){e.blob=!1}}}try{e.nodestream=!!a("readable-stream").Readable}catch(s){e.nodestream=!1}},{"readable-stream":16}],31:[function(a,t,e){"use strict";for(var n=a("./utils"),i=a("./support"),s=a("./nodejsUtils"),o=a("./stream/GenericWorker"),r=new Array(256),l=0;l<256;l++)r[l]=252<=l?6:248<=l?5:240<=l?4:224<=l?3:192<=l?2:1;r[254]=r[254]=1;function c(){o.call(this,"utf-8 decode"),this.leftOver=null}function p(){o.call(this,"utf-8 encode")}e.utf8encode=function(h){return i.nodebuffer?s.newBufferFrom(h,"utf-8"):function(f){var m,g,u,d,x,y=f.length,M=0;for(d=0;d<y;d++)(64512&(g=f.charCodeAt(d)))==55296&&d+1<y&&(64512&(u=f.charCodeAt(d+1)))==56320&&(g=65536+(g-55296<<10)+(u-56320),d++),M+=g<128?1:g<2048?2:g<65536?3:4;for(m=i.uint8array?new Uint8Array(M):new Array(M),d=x=0;x<M;d++)(64512&(g=f.charCodeAt(d)))==55296&&d+1<y&&(64512&(u=f.charCodeAt(d+1)))==56320&&(g=65536+(g-55296<<10)+(u-56320),d++),g<128?m[x++]=g:(g<2048?m[x++]=192|g>>>6:(g<65536?m[x++]=224|g>>>12:(m[x++]=240|g>>>18,m[x++]=128|g>>>12&63),m[x++]=128|g>>>6&63),m[x++]=128|63&g);return m}(h)},e.utf8decode=function(h){return i.nodebuffer?n.transformTo("nodebuffer",h).toString("utf-8"):function(f){var m,g,u,d,x=f.length,y=new Array(2*x);for(m=g=0;m<x;)if((u=f[m++])<128)y[g++]=u;else if(4<(d=r[u]))y[g++]=65533,m+=d-1;else{for(u&=d===2?31:d===3?15:7;1<d&&m<x;)u=u<<6|63&f[m++],d--;1<d?y[g++]=65533:u<65536?y[g++]=u:(u-=65536,y[g++]=55296|u>>10&1023,y[g++]=56320|1023&u)}return y.length!==g&&(y.subarray?y=y.subarray(0,g):y.length=g),n.applyFromCharCode(y)}(h=n.transformTo(i.uint8array?"uint8array":"array",h))},n.inherits(c,o),c.prototype.processChunk=function(h){var f=n.transformTo(i.uint8array?"uint8array":"array",h.data);if(this.leftOver&&this.leftOver.length){if(i.uint8array){var m=f;(f=new Uint8Array(m.length+this.leftOver.length)).set(this.leftOver,0),f.set(m,this.leftOver.length)}else f=this.leftOver.concat(f);this.leftOver=null}var g=function(d,x){var y;for((x=x||d.length)>d.length&&(x=d.length),y=x-1;0<=y&&(192&d[y])==128;)y--;return y<0||y===0?x:y+r[d[y]]>x?y:x}(f),u=f;g!==f.length&&(i.uint8array?(u=f.subarray(0,g),this.leftOver=f.subarray(g,f.length)):(u=f.slice(0,g),this.leftOver=f.slice(g,f.length))),this.push({data:e.utf8decode(u),meta:h.meta})},c.prototype.flush=function(){this.leftOver&&this.leftOver.length&&(this.push({data:e.utf8decode(this.leftOver),meta:{}}),this.leftOver=null)},e.Utf8DecodeWorker=c,n.inherits(p,o),p.prototype.processChunk=function(h){this.push({data:e.utf8encode(h.data),meta:h.meta})},e.Utf8EncodeWorker=p},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(a,t,e){"use strict";var n=a("./support"),i=a("./base64"),s=a("./nodejsUtils"),o=a("./external");function r(m){return m}function l(m,g){for(var u=0;u<m.length;++u)g[u]=255&m.charCodeAt(u);return g}a("setimmediate"),e.newBlob=function(m,g){e.checkSupport("blob");try{return new Blob([m],{type:g})}catch(d){try{var u=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);return u.append(m),u.getBlob(g)}catch(x){throw new Error("Bug : can't construct the Blob.")}}};var c={stringifyByChunk:function(m,g,u){var d=[],x=0,y=m.length;if(y<=u)return String.fromCharCode.apply(null,m);for(;x<y;)g==="array"||g==="nodebuffer"?d.push(String.fromCharCode.apply(null,m.slice(x,Math.min(x+u,y)))):d.push(String.fromCharCode.apply(null,m.subarray(x,Math.min(x+u,y)))),x+=u;return d.join("")},stringifyByChar:function(m){for(var g="",u=0;u<m.length;u++)g+=String.fromCharCode(m[u]);return g},applyCanBeUsed:{uint8array:function(){try{return n.uint8array&&String.fromCharCode.apply(null,new Uint8Array(1)).length===1}catch(m){return!1}}(),nodebuffer:function(){try{return n.nodebuffer&&String.fromCharCode.apply(null,s.allocBuffer(1)).length===1}catch(m){return!1}}()}};function p(m){var g=65536,u=e.getTypeOf(m),d=!0;if(u==="uint8array"?d=c.applyCanBeUsed.uint8array:u==="nodebuffer"&&(d=c.applyCanBeUsed.nodebuffer),d)for(;1<g;)try{return c.stringifyByChunk(m,u,g)}catch(x){g=Math.floor(g/2)}return c.stringifyByChar(m)}function h(m,g){for(var u=0;u<m.length;u++)g[u]=m[u];return g}e.applyFromCharCode=p;var f={};f.string={string:r,array:function(m){return l(m,new Array(m.length))},arraybuffer:function(m){return f.string.uint8array(m).buffer},uint8array:function(m){return l(m,new Uint8Array(m.length))},nodebuffer:function(m){return l(m,s.allocBuffer(m.length))}},f.array={string:p,array:r,arraybuffer:function(m){return new Uint8Array(m).buffer},uint8array:function(m){return new Uint8Array(m)},nodebuffer:function(m){return s.newBufferFrom(m)}},f.arraybuffer={string:function(m){return p(new Uint8Array(m))},array:function(m){return h(new Uint8Array(m),new Array(m.byteLength))},arraybuffer:r,uint8array:function(m){return new Uint8Array(m)},nodebuffer:function(m){return s.newBufferFrom(new Uint8Array(m))}},f.uint8array={string:p,array:function(m){return h(m,new Array(m.length))},arraybuffer:function(m){return m.buffer},uint8array:r,nodebuffer:function(m){return s.newBufferFrom(m)}},f.nodebuffer={string:p,array:function(m){return h(m,new Array(m.length))},arraybuffer:function(m){return f.nodebuffer.uint8array(m).buffer},uint8array:function(m){return h(m,new Uint8Array(m.length))},nodebuffer:r},e.transformTo=function(m,g){if(g=g||"",!m)return g;e.checkSupport(m);var u=e.getTypeOf(g);return f[u][m](g)},e.resolve=function(m){for(var g=m.split("/"),u=[],d=0;d<g.length;d++){var x=g[d];x==="."||x===""&&d!==0&&d!==g.length-1||(x===".."?u.pop():u.push(x))}return u.join("/")},e.getTypeOf=function(m){return typeof m=="string"?"string":Object.prototype.toString.call(m)==="[object Array]"?"array":n.nodebuffer&&s.isBuffer(m)?"nodebuffer":n.uint8array&&m instanceof Uint8Array?"uint8array":n.arraybuffer&&m instanceof ArrayBuffer?"arraybuffer":void 0},e.checkSupport=function(m){if(!n[m.toLowerCase()])throw new Error(m+" is not supported by this platform")},e.MAX_VALUE_16BITS=65535,e.MAX_VALUE_32BITS=-1,e.pretty=function(m){var g,u,d="";for(u=0;u<(m||"").length;u++)d+="\\x"+((g=m.charCodeAt(u))<16?"0":"")+g.toString(16).toUpperCase();return d},e.delay=function(m,g,u){setImmediate(function(){m.apply(u||null,g||[])})},e.inherits=function(m,g){function u(){}u.prototype=g.prototype,m.prototype=new u},e.extend=function(){var m,g,u={};for(m=0;m<arguments.length;m++)for(g in arguments[m])Object.prototype.hasOwnProperty.call(arguments[m],g)&&u[g]===void 0&&(u[g]=arguments[m][g]);return u},e.prepareContent=function(m,g,u,d,x){return o.Promise.resolve(g).then(function(y){return n.blob&&(y instanceof Blob||["[object File]","[object Blob]"].indexOf(Object.prototype.toString.call(y))!==-1)&&typeof FileReader<"u"?new o.Promise(function(M,w){var S=new FileReader;S.onload=function(I){M(I.target.result)},S.onerror=function(I){w(I.target.error)},S.readAsArrayBuffer(y)}):y}).then(function(y){var M=e.getTypeOf(y);return M?(M==="arraybuffer"?y=e.transformTo("uint8array",y):M==="string"&&(x?y=i.decode(y):u&&d!==!0&&(y=function(w){return l(w,n.uint8array?new Uint8Array(w.length):new Array(w.length))}(y))),y):o.Promise.reject(new Error("Can't read the data of '"+m+"'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))})}},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,setimmediate:54}],33:[function(a,t,e){"use strict";var n=a("./reader/readerFor"),i=a("./utils"),s=a("./signature"),o=a("./zipEntry"),r=a("./support");function l(c){this.files=[],this.loadOptions=c}l.prototype={checkSignature:function(c){if(!this.reader.readAndCheckSignature(c)){this.reader.index-=4;var p=this.reader.readString(4);throw new Error("Corrupted zip or bug: unexpected signature ("+i.pretty(p)+", expected "+i.pretty(c)+")")}},isSignature:function(c,p){var h=this.reader.index;this.reader.setIndex(c);var f=this.reader.readString(4)===p;return this.reader.setIndex(h),f},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2);var c=this.reader.readData(this.zipCommentLength),p=r.uint8array?"uint8array":"array",h=i.transformTo(p,c);this.zipComment=this.loadOptions.decodeFileName(h)},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.reader.skip(4),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={};for(var c,p,h,f=this.zip64EndOfCentralSize-44;0<f;)c=this.reader.readInt(2),p=this.reader.readInt(4),h=this.reader.readData(p),this.zip64ExtensibleData[c]={id:c,length:p,value:h}},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),1<this.disksCount)throw new Error("Multi-volumes zip are not supported")},readLocalFiles:function(){var c,p;for(c=0;c<this.files.length;c++)p=this.files[c],this.reader.setIndex(p.localHeaderOffset),this.checkSignature(s.LOCAL_FILE_HEADER),p.readLocalPart(this.reader),p.handleUTF8(),p.processAttributes()},readCentralDir:function(){var c;for(this.reader.setIndex(this.centralDirOffset);this.reader.readAndCheckSignature(s.CENTRAL_FILE_HEADER);)(c=new o({zip64:this.zip64},this.loadOptions)).readCentralPart(this.reader),this.files.push(c);if(this.centralDirRecords!==this.files.length&&this.centralDirRecords!==0&&this.files.length===0)throw new Error("Corrupted zip or bug: expected "+this.centralDirRecords+" records in central dir, got "+this.files.length)},readEndOfCentral:function(){var c=this.reader.lastIndexOfSignature(s.CENTRAL_DIRECTORY_END);if(c<0)throw this.isSignature(0,s.LOCAL_FILE_HEADER)?new Error("Corrupted zip: can't find end of central directory"):new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");this.reader.setIndex(c);var p=c;if(this.checkSignature(s.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===i.MAX_VALUE_16BITS||this.diskWithCentralDirStart===i.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===i.MAX_VALUE_16BITS||this.centralDirRecords===i.MAX_VALUE_16BITS||this.centralDirSize===i.MAX_VALUE_32BITS||this.centralDirOffset===i.MAX_VALUE_32BITS){if(this.zip64=!0,(c=this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR))<0)throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");if(this.reader.setIndex(c),this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,s.ZIP64_CENTRAL_DIRECTORY_END)&&(this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_END),this.relativeOffsetEndOfZip64CentralDir<0))throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral()}var h=this.centralDirOffset+this.centralDirSize;this.zip64&&(h+=20,h+=12+this.zip64EndOfCentralSize);var f=p-h;if(0<f)this.isSignature(p,s.CENTRAL_FILE_HEADER)||(this.reader.zero=f);else if(f<0)throw new Error("Corrupted zip: missing "+Math.abs(f)+" bytes.")},prepareReader:function(c){this.reader=n(c)},load:function(c){this.prepareReader(c),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles()}},t.exports=l},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utils":32,"./zipEntry":34}],34:[function(a,t,e){"use strict";var n=a("./reader/readerFor"),i=a("./utils"),s=a("./compressedObject"),o=a("./crc32"),r=a("./utf8"),l=a("./compressions"),c=a("./support");function p(h,f){this.options=h,this.loadOptions=f}p.prototype={isEncrypted:function(){return(1&this.bitFlag)==1},useUTF8:function(){return(2048&this.bitFlag)==2048},readLocalPart:function(h){var f,m;if(h.skip(22),this.fileNameLength=h.readInt(2),m=h.readInt(2),this.fileName=h.readData(this.fileNameLength),h.skip(m),this.compressedSize===-1||this.uncompressedSize===-1)throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");if((f=function(g){for(var u in l)if(Object.prototype.hasOwnProperty.call(l,u)&&l[u].magic===g)return l[u];return null}(this.compressionMethod))===null)throw new Error("Corrupted zip : compression "+i.pretty(this.compressionMethod)+" unknown (inner file : "+i.transformTo("string",this.fileName)+")");this.decompressed=new s(this.compressedSize,this.uncompressedSize,this.crc32,f,h.readData(this.compressedSize))},readCentralPart:function(h){this.versionMadeBy=h.readInt(2),h.skip(2),this.bitFlag=h.readInt(2),this.compressionMethod=h.readString(2),this.date=h.readDate(),this.crc32=h.readInt(4),this.compressedSize=h.readInt(4),this.uncompressedSize=h.readInt(4);var f=h.readInt(2);if(this.extraFieldsLength=h.readInt(2),this.fileCommentLength=h.readInt(2),this.diskNumberStart=h.readInt(2),this.internalFileAttributes=h.readInt(2),this.externalFileAttributes=h.readInt(4),this.localHeaderOffset=h.readInt(4),this.isEncrypted())throw new Error("Encrypted zip are not supported");h.skip(f),this.readExtraFields(h),this.parseZIP64ExtraField(h),this.fileComment=h.readData(this.fileCommentLength)},processAttributes:function(){this.unixPermissions=null,this.dosPermissions=null;var h=this.versionMadeBy>>8;this.dir=!!(16&this.externalFileAttributes),h==0&&(this.dosPermissions=63&this.externalFileAttributes),h==3&&(this.unixPermissions=this.externalFileAttributes>>16&65535),this.dir||this.fileNameStr.slice(-1)!=="/"||(this.dir=!0)},parseZIP64ExtraField:function(){if(this.extraFields[1]){var h=n(this.extraFields[1].value);this.uncompressedSize===i.MAX_VALUE_32BITS&&(this.uncompressedSize=h.readInt(8)),this.compressedSize===i.MAX_VALUE_32BITS&&(this.compressedSize=h.readInt(8)),this.localHeaderOffset===i.MAX_VALUE_32BITS&&(this.localHeaderOffset=h.readInt(8)),this.diskNumberStart===i.MAX_VALUE_32BITS&&(this.diskNumberStart=h.readInt(4))}},readExtraFields:function(h){var f,m,g,u=h.index+this.extraFieldsLength;for(this.extraFields||(this.extraFields={});h.index+4<u;)f=h.readInt(2),m=h.readInt(2),g=h.readData(m),this.extraFields[f]={id:f,length:m,value:g};h.setIndex(u)},handleUTF8:function(){var h=c.uint8array?"uint8array":"array";if(this.useUTF8())this.fileNameStr=r.utf8decode(this.fileName),this.fileCommentStr=r.utf8decode(this.fileComment);else{var f=this.findExtraFieldUnicodePath();if(f!==null)this.fileNameStr=f;else{var m=i.transformTo(h,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(m)}var g=this.findExtraFieldUnicodeComment();if(g!==null)this.fileCommentStr=g;else{var u=i.transformTo(h,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(u)}}},findExtraFieldUnicodePath:function(){var h=this.extraFields[28789];if(h){var f=n(h.value);return f.readInt(1)!==1||o(this.fileName)!==f.readInt(4)?null:r.utf8decode(f.readData(h.length-5))}return null},findExtraFieldUnicodeComment:function(){var h=this.extraFields[25461];if(h){var f=n(h.value);return f.readInt(1)!==1||o(this.fileComment)!==f.readInt(4)?null:r.utf8decode(f.readData(h.length-5))}return null}},t.exports=p},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(a,t,e){"use strict";function n(f,m,g){this.name=f,this.dir=g.dir,this.date=g.date,this.comment=g.comment,this.unixPermissions=g.unixPermissions,this.dosPermissions=g.dosPermissions,this._data=m,this._dataBinary=g.binary,this.options={compression:g.compression,compressionOptions:g.compressionOptions}}var i=a("./stream/StreamHelper"),s=a("./stream/DataWorker"),o=a("./utf8"),r=a("./compressedObject"),l=a("./stream/GenericWorker");n.prototype={internalStream:function(f){var m=null,g="string";try{if(!f)throw new Error("No output type specified.");var u=(g=f.toLowerCase())==="string"||g==="text";g!=="binarystring"&&g!=="text"||(g="string"),m=this._decompressWorker();var d=!this._dataBinary;d&&!u&&(m=m.pipe(new o.Utf8EncodeWorker)),!d&&u&&(m=m.pipe(new o.Utf8DecodeWorker))}catch(x){(m=new l("error")).error(x)}return new i(m,g,"")},async:function(f,m){return this.internalStream(f).accumulate(m)},nodeStream:function(f,m){return this.internalStream(f||"nodebuffer").toNodejsStream(m)},_compressWorker:function(f,m){if(this._data instanceof r&&this._data.compression.magic===f.magic)return this._data.getCompressedWorker();var g=this._decompressWorker();return this._dataBinary||(g=g.pipe(new o.Utf8EncodeWorker)),r.createWorkerFrom(g,f,m)},_decompressWorker:function(){return this._data instanceof r?this._data.getContentWorker():this._data instanceof l?this._data:new s(this._data)}};for(var c=["asText","asBinary","asNodeBuffer","asUint8Array","asArrayBuffer"],p=function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},h=0;h<c.length;h++)n.prototype[c[h]]=p;t.exports=n},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(a,t,e){(function(n){"use strict";var i,s,o=n.MutationObserver||n.WebKitMutationObserver;if(o){var r=0,l=new o(f),c=n.document.createTextNode("");l.observe(c,{characterData:!0}),i=function(){c.data=r=++r%2}}else if(n.setImmediate||n.MessageChannel===void 0)i="document"in n&&"onreadystatechange"in n.document.createElement("script")?function(){var m=n.document.createElement("script");m.onreadystatechange=function(){f(),m.onreadystatechange=null,m.parentNode.removeChild(m),m=null},n.document.documentElement.appendChild(m)}:function(){setTimeout(f,0)};else{var p=new n.MessageChannel;p.port1.onmessage=f,i=function(){p.port2.postMessage(0)}}var h=[];function f(){var m,g;s=!0;for(var u=h.length;u;){for(g=h,h=[],m=-1;++m<u;)g[m]();u=h.length}s=!1}t.exports=function(m){h.push(m)!==1||s||i()}}).call(this,typeof global<"u"?global:typeof self<"u"?self:typeof window<"u"?window:{})},{}],37:[function(a,t,e){"use strict";var n=a("immediate");function i(){}var s={},o=["REJECTED"],r=["FULFILLED"],l=["PENDING"];function c(u){if(typeof u!="function")throw new TypeError("resolver must be a function");this.state=l,this.queue=[],this.outcome=void 0,u!==i&&m(this,u)}function p(u,d,x){this.promise=u,typeof d=="function"&&(this.onFulfilled=d,this.callFulfilled=this.otherCallFulfilled),typeof x=="function"&&(this.onRejected=x,this.callRejected=this.otherCallRejected)}function h(u,d,x){n(function(){var y;try{y=d(x)}catch(M){return s.reject(u,M)}y===u?s.reject(u,new TypeError("Cannot resolve promise with itself")):s.resolve(u,y)})}function f(u){var d=u&&u.then;if(u&&(typeof u=="object"||typeof u=="function")&&typeof d=="function")return function(){d.apply(u,arguments)}}function m(u,d){var x=!1;function y(S){x||(x=!0,s.reject(u,S))}function M(S){x||(x=!0,s.resolve(u,S))}var w=g(function(){d(M,y)});w.status==="error"&&y(w.value)}function g(u,d){var x={};try{x.value=u(d),x.status="success"}catch(y){x.status="error",x.value=y}return x}(t.exports=c).prototype.finally=function(u){if(typeof u!="function")return this;var d=this.constructor;return this.then(function(x){return d.resolve(u()).then(function(){return x})},function(x){return d.resolve(u()).then(function(){throw x})})},c.prototype.catch=function(u){return this.then(null,u)},c.prototype.then=function(u,d){if(typeof u!="function"&&this.state===r||typeof d!="function"&&this.state===o)return this;var x=new this.constructor(i);return this.state!==l?h(x,this.state===r?u:d,this.outcome):this.queue.push(new p(x,u,d)),x},p.prototype.callFulfilled=function(u){s.resolve(this.promise,u)},p.prototype.otherCallFulfilled=function(u){h(this.promise,this.onFulfilled,u)},p.prototype.callRejected=function(u){s.reject(this.promise,u)},p.prototype.otherCallRejected=function(u){h(this.promise,this.onRejected,u)},s.resolve=function(u,d){var x=g(f,d);if(x.status==="error")return s.reject(u,x.value);var y=x.value;if(y)m(u,y);else{u.state=r,u.outcome=d;for(var M=-1,w=u.queue.length;++M<w;)u.queue[M].callFulfilled(d)}return u},s.reject=function(u,d){u.state=o,u.outcome=d;for(var x=-1,y=u.queue.length;++x<y;)u.queue[x].callRejected(d);return u},c.resolve=function(u){return u instanceof this?u:s.resolve(new this(i),u)},c.reject=function(u){var d=new this(i);return s.reject(d,u)},c.all=function(u){var d=this;if(Object.prototype.toString.call(u)!=="[object Array]")return this.reject(new TypeError("must be an array"));var x=u.length,y=!1;if(!x)return this.resolve([]);for(var M=new Array(x),w=0,S=-1,I=new this(i);++S<x;)D(u[S],S);return I;function D(A,k){d.resolve(A).then(function(T){M[k]=T,++w!==x||y||(y=!0,s.resolve(I,M))},function(T){y||(y=!0,s.reject(I,T))})}},c.race=function(u){var d=this;if(Object.prototype.toString.call(u)!=="[object Array]")return this.reject(new TypeError("must be an array"));var x=u.length,y=!1;if(!x)return this.resolve([]);for(var M=-1,w=new this(i);++M<x;)S=u[M],d.resolve(S).then(function(I){y||(y=!0,s.resolve(w,I))},function(I){y||(y=!0,s.reject(w,I))});var S;return w}},{immediate:36}],38:[function(a,t,e){"use strict";var n={};(0,a("./lib/utils/common").assign)(n,a("./lib/deflate"),a("./lib/inflate"),a("./lib/zlib/constants")),t.exports=n},{"./lib/deflate":39,"./lib/inflate":40,"./lib/utils/common":41,"./lib/zlib/constants":44}],39:[function(a,t,e){"use strict";var n=a("./zlib/deflate"),i=a("./utils/common"),s=a("./utils/strings"),o=a("./zlib/messages"),r=a("./zlib/zstream"),l=Object.prototype.toString,c=0,p=-1,h=0,f=8;function m(u){if(!(this instanceof m))return new m(u);this.options=i.assign({level:p,method:f,chunkSize:16384,windowBits:15,memLevel:8,strategy:h,to:""},u||{});var d=this.options;d.raw&&0<d.windowBits?d.windowBits=-d.windowBits:d.gzip&&0<d.windowBits&&d.windowBits<16&&(d.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new r,this.strm.avail_out=0;var x=n.deflateInit2(this.strm,d.level,d.method,d.windowBits,d.memLevel,d.strategy);if(x!==c)throw new Error(o[x]);if(d.header&&n.deflateSetHeader(this.strm,d.header),d.dictionary){var y;if(y=typeof d.dictionary=="string"?s.string2buf(d.dictionary):l.call(d.dictionary)==="[object ArrayBuffer]"?new Uint8Array(d.dictionary):d.dictionary,(x=n.deflateSetDictionary(this.strm,y))!==c)throw new Error(o[x]);this._dict_set=!0}}function g(u,d){var x=new m(d);if(x.push(u,!0),x.err)throw x.msg||o[x.err];return x.result}m.prototype.push=function(u,d){var x,y,M=this.strm,w=this.options.chunkSize;if(this.ended)return!1;y=d===~~d?d:d===!0?4:0,typeof u=="string"?M.input=s.string2buf(u):l.call(u)==="[object ArrayBuffer]"?M.input=new Uint8Array(u):M.input=u,M.next_in=0,M.avail_in=M.input.length;do{if(M.avail_out===0&&(M.output=new i.Buf8(w),M.next_out=0,M.avail_out=w),(x=n.deflate(M,y))!==1&&x!==c)return this.onEnd(x),!(this.ended=!0);M.avail_out!==0&&(M.avail_in!==0||y!==4&&y!==2)||(this.options.to==="string"?this.onData(s.buf2binstring(i.shrinkBuf(M.output,M.next_out))):this.onData(i.shrinkBuf(M.output,M.next_out)))}while((0<M.avail_in||M.avail_out===0)&&x!==1);return y===4?(x=n.deflateEnd(this.strm),this.onEnd(x),this.ended=!0,x===c):y!==2||(this.onEnd(c),!(M.avail_out=0))},m.prototype.onData=function(u){this.chunks.push(u)},m.prototype.onEnd=function(u){u===c&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=i.flattenChunks(this.chunks)),this.chunks=[],this.err=u,this.msg=this.strm.msg},e.Deflate=m,e.deflate=g,e.deflateRaw=function(u,d){return(d=d||{}).raw=!0,g(u,d)},e.gzip=function(u,d){return(d=d||{}).gzip=!0,g(u,d)}},{"./utils/common":41,"./utils/strings":42,"./zlib/deflate":46,"./zlib/messages":51,"./zlib/zstream":53}],40:[function(a,t,e){"use strict";var n=a("./zlib/inflate"),i=a("./utils/common"),s=a("./utils/strings"),o=a("./zlib/constants"),r=a("./zlib/messages"),l=a("./zlib/zstream"),c=a("./zlib/gzheader"),p=Object.prototype.toString;function h(m){if(!(this instanceof h))return new h(m);this.options=i.assign({chunkSize:16384,windowBits:0,to:""},m||{});var g=this.options;g.raw&&0<=g.windowBits&&g.windowBits<16&&(g.windowBits=-g.windowBits,g.windowBits===0&&(g.windowBits=-15)),!(0<=g.windowBits&&g.windowBits<16)||m&&m.windowBits||(g.windowBits+=32),15<g.windowBits&&g.windowBits<48&&(15&g.windowBits)==0&&(g.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new l,this.strm.avail_out=0;var u=n.inflateInit2(this.strm,g.windowBits);if(u!==o.Z_OK)throw new Error(r[u]);this.header=new c,n.inflateGetHeader(this.strm,this.header)}function f(m,g){var u=new h(g);if(u.push(m,!0),u.err)throw u.msg||r[u.err];return u.result}h.prototype.push=function(m,g){var u,d,x,y,M,w,S=this.strm,I=this.options.chunkSize,D=this.options.dictionary,A=!1;if(this.ended)return!1;d=g===~~g?g:g===!0?o.Z_FINISH:o.Z_NO_FLUSH,typeof m=="string"?S.input=s.binstring2buf(m):p.call(m)==="[object ArrayBuffer]"?S.input=new Uint8Array(m):S.input=m,S.next_in=0,S.avail_in=S.input.length;do{if(S.avail_out===0&&(S.output=new i.Buf8(I),S.next_out=0,S.avail_out=I),(u=n.inflate(S,o.Z_NO_FLUSH))===o.Z_NEED_DICT&&D&&(w=typeof D=="string"?s.string2buf(D):p.call(D)==="[object ArrayBuffer]"?new Uint8Array(D):D,u=n.inflateSetDictionary(this.strm,w)),u===o.Z_BUF_ERROR&&A===!0&&(u=o.Z_OK,A=!1),u!==o.Z_STREAM_END&&u!==o.Z_OK)return this.onEnd(u),!(this.ended=!0);S.next_out&&(S.avail_out!==0&&u!==o.Z_STREAM_END&&(S.avail_in!==0||d!==o.Z_FINISH&&d!==o.Z_SYNC_FLUSH)||(this.options.to==="string"?(x=s.utf8border(S.output,S.next_out),y=S.next_out-x,M=s.buf2string(S.output,x),S.next_out=y,S.avail_out=I-y,y&&i.arraySet(S.output,S.output,x,y,0),this.onData(M)):this.onData(i.shrinkBuf(S.output,S.next_out)))),S.avail_in===0&&S.avail_out===0&&(A=!0)}while((0<S.avail_in||S.avail_out===0)&&u!==o.Z_STREAM_END);return u===o.Z_STREAM_END&&(d=o.Z_FINISH),d===o.Z_FINISH?(u=n.inflateEnd(this.strm),this.onEnd(u),this.ended=!0,u===o.Z_OK):d!==o.Z_SYNC_FLUSH||(this.onEnd(o.Z_OK),!(S.avail_out=0))},h.prototype.onData=function(m){this.chunks.push(m)},h.prototype.onEnd=function(m){m===o.Z_OK&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=i.flattenChunks(this.chunks)),this.chunks=[],this.err=m,this.msg=this.strm.msg},e.Inflate=h,e.inflate=f,e.inflateRaw=function(m,g){return(g=g||{}).raw=!0,f(m,g)},e.ungzip=f},{"./utils/common":41,"./utils/strings":42,"./zlib/constants":44,"./zlib/gzheader":47,"./zlib/inflate":49,"./zlib/messages":51,"./zlib/zstream":53}],41:[function(a,t,e){"use strict";var n=typeof Uint8Array<"u"&&typeof Uint16Array<"u"&&typeof Int32Array<"u";e.assign=function(o){for(var r=Array.prototype.slice.call(arguments,1);r.length;){var l=r.shift();if(l){if(typeof l!="object")throw new TypeError(l+"must be non-object");for(var c in l)l.hasOwnProperty(c)&&(o[c]=l[c])}}return o},e.shrinkBuf=function(o,r){return o.length===r?o:o.subarray?o.subarray(0,r):(o.length=r,o)};var i={arraySet:function(o,r,l,c,p){if(r.subarray&&o.subarray)o.set(r.subarray(l,l+c),p);else for(var h=0;h<c;h++)o[p+h]=r[l+h]},flattenChunks:function(o){var r,l,c,p,h,f;for(r=c=0,l=o.length;r<l;r++)c+=o[r].length;for(f=new Uint8Array(c),r=p=0,l=o.length;r<l;r++)h=o[r],f.set(h,p),p+=h.length;return f}},s={arraySet:function(o,r,l,c,p){for(var h=0;h<c;h++)o[p+h]=r[l+h]},flattenChunks:function(o){return[].concat.apply([],o)}};e.setTyped=function(o){o?(e.Buf8=Uint8Array,e.Buf16=Uint16Array,e.Buf32=Int32Array,e.assign(e,i)):(e.Buf8=Array,e.Buf16=Array,e.Buf32=Array,e.assign(e,s))},e.setTyped(n)},{}],42:[function(a,t,e){"use strict";var n=a("./common"),i=!0,s=!0;try{String.fromCharCode.apply(null,[0])}catch(c){i=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(c){s=!1}for(var o=new n.Buf8(256),r=0;r<256;r++)o[r]=252<=r?6:248<=r?5:240<=r?4:224<=r?3:192<=r?2:1;function l(c,p){if(p<65537&&(c.subarray&&s||!c.subarray&&i))return String.fromCharCode.apply(null,n.shrinkBuf(c,p));for(var h="",f=0;f<p;f++)h+=String.fromCharCode(c[f]);return h}o[254]=o[254]=1,e.string2buf=function(c){var p,h,f,m,g,u=c.length,d=0;for(m=0;m<u;m++)(64512&(h=c.charCodeAt(m)))==55296&&m+1<u&&(64512&(f=c.charCodeAt(m+1)))==56320&&(h=65536+(h-55296<<10)+(f-56320),m++),d+=h<128?1:h<2048?2:h<65536?3:4;for(p=new n.Buf8(d),m=g=0;g<d;m++)(64512&(h=c.charCodeAt(m)))==55296&&m+1<u&&(64512&(f=c.charCodeAt(m+1)))==56320&&(h=65536+(h-55296<<10)+(f-56320),m++),h<128?p[g++]=h:(h<2048?p[g++]=192|h>>>6:(h<65536?p[g++]=224|h>>>12:(p[g++]=240|h>>>18,p[g++]=128|h>>>12&63),p[g++]=128|h>>>6&63),p[g++]=128|63&h);return p},e.buf2binstring=function(c){return l(c,c.length)},e.binstring2buf=function(c){for(var p=new n.Buf8(c.length),h=0,f=p.length;h<f;h++)p[h]=c.charCodeAt(h);return p},e.buf2string=function(c,p){var h,f,m,g,u=p||c.length,d=new Array(2*u);for(h=f=0;h<u;)if((m=c[h++])<128)d[f++]=m;else if(4<(g=o[m]))d[f++]=65533,h+=g-1;else{for(m&=g===2?31:g===3?15:7;1<g&&h<u;)m=m<<6|63&c[h++],g--;1<g?d[f++]=65533:m<65536?d[f++]=m:(m-=65536,d[f++]=55296|m>>10&1023,d[f++]=56320|1023&m)}return l(d,f)},e.utf8border=function(c,p){var h;for((p=p||c.length)>c.length&&(p=c.length),h=p-1;0<=h&&(192&c[h])==128;)h--;return h<0||h===0?p:h+o[c[h]]>p?h:p}},{"./common":41}],43:[function(a,t,e){"use strict";t.exports=function(n,i,s,o){for(var r=65535&n|0,l=n>>>16&65535|0,c=0;s!==0;){for(s-=c=2e3<s?2e3:s;l=l+(r=r+i[o++]|0)|0,--c;);r%=65521,l%=65521}return r|l<<16|0}},{}],44:[function(a,t,e){"use strict";t.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],45:[function(a,t,e){"use strict";var n=function(){for(var i,s=[],o=0;o<256;o++){i=o;for(var r=0;r<8;r++)i=1&i?3988292384^i>>>1:i>>>1;s[o]=i}return s}();t.exports=function(i,s,o,r){var l=n,c=r+o;i^=-1;for(var p=r;p<c;p++)i=i>>>8^l[255&(i^s[p])];return-1^i}},{}],46:[function(a,t,e){"use strict";var n,i=a("../utils/common"),s=a("./trees"),o=a("./adler32"),r=a("./crc32"),l=a("./messages"),c=0,p=4,h=0,f=-2,m=-1,g=4,u=2,d=8,x=9,y=286,M=30,w=19,S=2*y+1,I=15,D=3,A=258,k=A+D+1,T=42,F=113,v=1,O=2,B=3,U=4;function nt(_,X){return _.msg=l[X],X}function G(_){return(_<<1)-(4<_?9:0)}function J(_){for(var X=_.length;0<=--X;)_[X]=0}function C(_){var X=_.state,Q=X.pending;Q>_.avail_out&&(Q=_.avail_out),Q!==0&&(i.arraySet(_.output,X.pending_buf,X.pending_out,Q,_.next_out),_.next_out+=Q,X.pending_out+=Q,_.total_out+=Q,_.avail_out-=Q,X.pending-=Q,X.pending===0&&(X.pending_out=0))}function P(_,X){s._tr_flush_block(_,0<=_.block_start?_.block_start:-1,_.strstart-_.block_start,X),_.block_start=_.strstart,C(_.strm)}function it(_,X){_.pending_buf[_.pending++]=X}function Z(_,X){_.pending_buf[_.pending++]=X>>>8&255,_.pending_buf[_.pending++]=255&X}function K(_,X){var Q,z,R=_.max_chain_length,V=_.strstart,rt=_.prev_length,st=_.nice_match,q=_.strstart>_.w_size-k?_.strstart-(_.w_size-k):0,ut=_.window,E=_.w_mask,b=_.prev,H=_.strstart+A,ot=ut[V+rt-1],ht=ut[V+rt];_.prev_length>=_.good_match&&(R>>=2),st>_.lookahead&&(st=_.lookahead);do if(ut[(Q=X)+rt]===ht&&ut[Q+rt-1]===ot&&ut[Q]===ut[V]&&ut[++Q]===ut[V+1]){V+=2,Q++;do;while(ut[++V]===ut[++Q]&&ut[++V]===ut[++Q]&&ut[++V]===ut[++Q]&&ut[++V]===ut[++Q]&&ut[++V]===ut[++Q]&&ut[++V]===ut[++Q]&&ut[++V]===ut[++Q]&&ut[++V]===ut[++Q]&&V<H);if(z=A-(H-V),V=H-A,rt<z){if(_.match_start=X,st<=(rt=z))break;ot=ut[V+rt-1],ht=ut[V+rt]}}while((X=b[X&E])>q&&--R!=0);return rt<=_.lookahead?rt:_.lookahead}function ft(_){var X,Q,z,R,V,rt,st,q,ut,E,b=_.w_size;do{if(R=_.window_size-_.lookahead-_.strstart,_.strstart>=b+(b-k)){for(i.arraySet(_.window,_.window,b,b,0),_.match_start-=b,_.strstart-=b,_.block_start-=b,X=Q=_.hash_size;z=_.head[--X],_.head[X]=b<=z?z-b:0,--Q;);for(X=Q=b;z=_.prev[--X],_.prev[X]=b<=z?z-b:0,--Q;);R+=b}if(_.strm.avail_in===0)break;if(rt=_.strm,st=_.window,q=_.strstart+_.lookahead,ut=R,E=void 0,E=rt.avail_in,ut<E&&(E=ut),Q=E===0?0:(rt.avail_in-=E,i.arraySet(st,rt.input,rt.next_in,E,q),rt.state.wrap===1?rt.adler=o(rt.adler,st,E,q):rt.state.wrap===2&&(rt.adler=r(rt.adler,st,E,q)),rt.next_in+=E,rt.total_in+=E,E),_.lookahead+=Q,_.lookahead+_.insert>=D)for(V=_.strstart-_.insert,_.ins_h=_.window[V],_.ins_h=(_.ins_h<<_.hash_shift^_.window[V+1])&_.hash_mask;_.insert&&(_.ins_h=(_.ins_h<<_.hash_shift^_.window[V+D-1])&_.hash_mask,_.prev[V&_.w_mask]=_.head[_.ins_h],_.head[_.ins_h]=V,V++,_.insert--,!(_.lookahead+_.insert<D)););}while(_.lookahead<k&&_.strm.avail_in!==0)}function At(_,X){for(var Q,z;;){if(_.lookahead<k){if(ft(_),_.lookahead<k&&X===c)return v;if(_.lookahead===0)break}if(Q=0,_.lookahead>=D&&(_.ins_h=(_.ins_h<<_.hash_shift^_.window[_.strstart+D-1])&_.hash_mask,Q=_.prev[_.strstart&_.w_mask]=_.head[_.ins_h],_.head[_.ins_h]=_.strstart),Q!==0&&_.strstart-Q<=_.w_size-k&&(_.match_length=K(_,Q)),_.match_length>=D)if(z=s._tr_tally(_,_.strstart-_.match_start,_.match_length-D),_.lookahead-=_.match_length,_.match_length<=_.max_lazy_match&&_.lookahead>=D){for(_.match_length--;_.strstart++,_.ins_h=(_.ins_h<<_.hash_shift^_.window[_.strstart+D-1])&_.hash_mask,Q=_.prev[_.strstart&_.w_mask]=_.head[_.ins_h],_.head[_.ins_h]=_.strstart,--_.match_length!=0;);_.strstart++}else _.strstart+=_.match_length,_.match_length=0,_.ins_h=_.window[_.strstart],_.ins_h=(_.ins_h<<_.hash_shift^_.window[_.strstart+1])&_.hash_mask;else z=s._tr_tally(_,0,_.window[_.strstart]),_.lookahead--,_.strstart++;if(z&&(P(_,!1),_.strm.avail_out===0))return v}return _.insert=_.strstart<D-1?_.strstart:D-1,X===p?(P(_,!0),_.strm.avail_out===0?B:U):_.last_lit&&(P(_,!1),_.strm.avail_out===0)?v:O}function et(_,X){for(var Q,z,R;;){if(_.lookahead<k){if(ft(_),_.lookahead<k&&X===c)return v;if(_.lookahead===0)break}if(Q=0,_.lookahead>=D&&(_.ins_h=(_.ins_h<<_.hash_shift^_.window[_.strstart+D-1])&_.hash_mask,Q=_.prev[_.strstart&_.w_mask]=_.head[_.ins_h],_.head[_.ins_h]=_.strstart),_.prev_length=_.match_length,_.prev_match=_.match_start,_.match_length=D-1,Q!==0&&_.prev_length<_.max_lazy_match&&_.strstart-Q<=_.w_size-k&&(_.match_length=K(_,Q),_.match_length<=5&&(_.strategy===1||_.match_length===D&&4096<_.strstart-_.match_start)&&(_.match_length=D-1)),_.prev_length>=D&&_.match_length<=_.prev_length){for(R=_.strstart+_.lookahead-D,z=s._tr_tally(_,_.strstart-1-_.prev_match,_.prev_length-D),_.lookahead-=_.prev_length-1,_.prev_length-=2;++_.strstart<=R&&(_.ins_h=(_.ins_h<<_.hash_shift^_.window[_.strstart+D-1])&_.hash_mask,Q=_.prev[_.strstart&_.w_mask]=_.head[_.ins_h],_.head[_.ins_h]=_.strstart),--_.prev_length!=0;);if(_.match_available=0,_.match_length=D-1,_.strstart++,z&&(P(_,!1),_.strm.avail_out===0))return v}else if(_.match_available){if((z=s._tr_tally(_,0,_.window[_.strstart-1]))&&P(_,!1),_.strstart++,_.lookahead--,_.strm.avail_out===0)return v}else _.match_available=1,_.strstart++,_.lookahead--}return _.match_available&&(z=s._tr_tally(_,0,_.window[_.strstart-1]),_.match_available=0),_.insert=_.strstart<D-1?_.strstart:D-1,X===p?(P(_,!0),_.strm.avail_out===0?B:U):_.last_lit&&(P(_,!1),_.strm.avail_out===0)?v:O}function Tt(_,X,Q,z,R){this.good_length=_,this.max_lazy=X,this.nice_length=Q,this.max_chain=z,this.func=R}function Mt(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=d,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new i.Buf16(2*S),this.dyn_dtree=new i.Buf16(2*(2*M+1)),this.bl_tree=new i.Buf16(2*(2*w+1)),J(this.dyn_ltree),J(this.dyn_dtree),J(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new i.Buf16(I+1),this.heap=new i.Buf16(2*y+1),J(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new i.Buf16(2*y+1),J(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function bt(_){var X;return _&&_.state?(_.total_in=_.total_out=0,_.data_type=u,(X=_.state).pending=0,X.pending_out=0,X.wrap<0&&(X.wrap=-X.wrap),X.status=X.wrap?T:F,_.adler=X.wrap===2?0:1,X.last_flush=c,s._tr_init(X),h):nt(_,f)}function xt(_){var X=bt(_);return X===h&&function(Q){Q.window_size=2*Q.w_size,J(Q.head),Q.max_lazy_match=n[Q.level].max_lazy,Q.good_match=n[Q.level].good_length,Q.nice_match=n[Q.level].nice_length,Q.max_chain_length=n[Q.level].max_chain,Q.strstart=0,Q.block_start=0,Q.lookahead=0,Q.insert=0,Q.match_length=Q.prev_length=D-1,Q.match_available=0,Q.ins_h=0}(_.state),X}function Dt(_,X,Q,z,R,V){if(!_)return f;var rt=1;if(X===m&&(X=6),z<0?(rt=0,z=-z):15<z&&(rt=2,z-=16),R<1||x<R||Q!==d||z<8||15<z||X<0||9<X||V<0||g<V)return nt(_,f);z===8&&(z=9);var st=new Mt;return(_.state=st).strm=_,st.wrap=rt,st.gzhead=null,st.w_bits=z,st.w_size=1<<st.w_bits,st.w_mask=st.w_size-1,st.hash_bits=R+7,st.hash_size=1<<st.hash_bits,st.hash_mask=st.hash_size-1,st.hash_shift=~~((st.hash_bits+D-1)/D),st.window=new i.Buf8(2*st.w_size),st.head=new i.Buf16(st.hash_size),st.prev=new i.Buf16(st.w_size),st.lit_bufsize=1<<R+6,st.pending_buf_size=4*st.lit_bufsize,st.pending_buf=new i.Buf8(st.pending_buf_size),st.d_buf=1*st.lit_bufsize,st.l_buf=3*st.lit_bufsize,st.level=X,st.strategy=V,st.method=Q,xt(_)}n=[new Tt(0,0,0,0,function(_,X){var Q=65535;for(Q>_.pending_buf_size-5&&(Q=_.pending_buf_size-5);;){if(_.lookahead<=1){if(ft(_),_.lookahead===0&&X===c)return v;if(_.lookahead===0)break}_.strstart+=_.lookahead,_.lookahead=0;var z=_.block_start+Q;if((_.strstart===0||_.strstart>=z)&&(_.lookahead=_.strstart-z,_.strstart=z,P(_,!1),_.strm.avail_out===0)||_.strstart-_.block_start>=_.w_size-k&&(P(_,!1),_.strm.avail_out===0))return v}return _.insert=0,X===p?(P(_,!0),_.strm.avail_out===0?B:U):(_.strstart>_.block_start&&(P(_,!1),_.strm.avail_out),v)}),new Tt(4,4,8,4,At),new Tt(4,5,16,8,At),new Tt(4,6,32,32,At),new Tt(4,4,16,16,et),new Tt(8,16,32,32,et),new Tt(8,16,128,128,et),new Tt(8,32,128,256,et),new Tt(32,128,258,1024,et),new Tt(32,258,258,4096,et)],e.deflateInit=function(_,X){return Dt(_,X,d,15,8,0)},e.deflateInit2=Dt,e.deflateReset=xt,e.deflateResetKeep=bt,e.deflateSetHeader=function(_,X){return _&&_.state?_.state.wrap!==2?f:(_.state.gzhead=X,h):f},e.deflate=function(_,X){var Q,z,R,V;if(!_||!_.state||5<X||X<0)return _?nt(_,f):f;if(z=_.state,!_.output||!_.input&&_.avail_in!==0||z.status===666&&X!==p)return nt(_,_.avail_out===0?-5:f);if(z.strm=_,Q=z.last_flush,z.last_flush=X,z.status===T)if(z.wrap===2)_.adler=0,it(z,31),it(z,139),it(z,8),z.gzhead?(it(z,(z.gzhead.text?1:0)+(z.gzhead.hcrc?2:0)+(z.gzhead.extra?4:0)+(z.gzhead.name?8:0)+(z.gzhead.comment?16:0)),it(z,255&z.gzhead.time),it(z,z.gzhead.time>>8&255),it(z,z.gzhead.time>>16&255),it(z,z.gzhead.time>>24&255),it(z,z.level===9?2:2<=z.strategy||z.level<2?4:0),it(z,255&z.gzhead.os),z.gzhead.extra&&z.gzhead.extra.length&&(it(z,255&z.gzhead.extra.length),it(z,z.gzhead.extra.length>>8&255)),z.gzhead.hcrc&&(_.adler=r(_.adler,z.pending_buf,z.pending,0)),z.gzindex=0,z.status=69):(it(z,0),it(z,0),it(z,0),it(z,0),it(z,0),it(z,z.level===9?2:2<=z.strategy||z.level<2?4:0),it(z,3),z.status=F);else{var rt=d+(z.w_bits-8<<4)<<8;rt|=(2<=z.strategy||z.level<2?0:z.level<6?1:z.level===6?2:3)<<6,z.strstart!==0&&(rt|=32),rt+=31-rt%31,z.status=F,Z(z,rt),z.strstart!==0&&(Z(z,_.adler>>>16),Z(z,65535&_.adler)),_.adler=1}if(z.status===69)if(z.gzhead.extra){for(R=z.pending;z.gzindex<(65535&z.gzhead.extra.length)&&(z.pending!==z.pending_buf_size||(z.gzhead.hcrc&&z.pending>R&&(_.adler=r(_.adler,z.pending_buf,z.pending-R,R)),C(_),R=z.pending,z.pending!==z.pending_buf_size));)it(z,255&z.gzhead.extra[z.gzindex]),z.gzindex++;z.gzhead.hcrc&&z.pending>R&&(_.adler=r(_.adler,z.pending_buf,z.pending-R,R)),z.gzindex===z.gzhead.extra.length&&(z.gzindex=0,z.status=73)}else z.status=73;if(z.status===73)if(z.gzhead.name){R=z.pending;do{if(z.pending===z.pending_buf_size&&(z.gzhead.hcrc&&z.pending>R&&(_.adler=r(_.adler,z.pending_buf,z.pending-R,R)),C(_),R=z.pending,z.pending===z.pending_buf_size)){V=1;break}V=z.gzindex<z.gzhead.name.length?255&z.gzhead.name.charCodeAt(z.gzindex++):0,it(z,V)}while(V!==0);z.gzhead.hcrc&&z.pending>R&&(_.adler=r(_.adler,z.pending_buf,z.pending-R,R)),V===0&&(z.gzindex=0,z.status=91)}else z.status=91;if(z.status===91)if(z.gzhead.comment){R=z.pending;do{if(z.pending===z.pending_buf_size&&(z.gzhead.hcrc&&z.pending>R&&(_.adler=r(_.adler,z.pending_buf,z.pending-R,R)),C(_),R=z.pending,z.pending===z.pending_buf_size)){V=1;break}V=z.gzindex<z.gzhead.comment.length?255&z.gzhead.comment.charCodeAt(z.gzindex++):0,it(z,V)}while(V!==0);z.gzhead.hcrc&&z.pending>R&&(_.adler=r(_.adler,z.pending_buf,z.pending-R,R)),V===0&&(z.status=103)}else z.status=103;if(z.status===103&&(z.gzhead.hcrc?(z.pending+2>z.pending_buf_size&&C(_),z.pending+2<=z.pending_buf_size&&(it(z,255&_.adler),it(z,_.adler>>8&255),_.adler=0,z.status=F)):z.status=F),z.pending!==0){if(C(_),_.avail_out===0)return z.last_flush=-1,h}else if(_.avail_in===0&&G(X)<=G(Q)&&X!==p)return nt(_,-5);if(z.status===666&&_.avail_in!==0)return nt(_,-5);if(_.avail_in!==0||z.lookahead!==0||X!==c&&z.status!==666){var st=z.strategy===2?function(q,ut){for(var E;;){if(q.lookahead===0&&(ft(q),q.lookahead===0)){if(ut===c)return v;break}if(q.match_length=0,E=s._tr_tally(q,0,q.window[q.strstart]),q.lookahead--,q.strstart++,E&&(P(q,!1),q.strm.avail_out===0))return v}return q.insert=0,ut===p?(P(q,!0),q.strm.avail_out===0?B:U):q.last_lit&&(P(q,!1),q.strm.avail_out===0)?v:O}(z,X):z.strategy===3?function(q,ut){for(var E,b,H,ot,ht=q.window;;){if(q.lookahead<=A){if(ft(q),q.lookahead<=A&&ut===c)return v;if(q.lookahead===0)break}if(q.match_length=0,q.lookahead>=D&&0<q.strstart&&(b=ht[H=q.strstart-1])===ht[++H]&&b===ht[++H]&&b===ht[++H]){ot=q.strstart+A;do;while(b===ht[++H]&&b===ht[++H]&&b===ht[++H]&&b===ht[++H]&&b===ht[++H]&&b===ht[++H]&&b===ht[++H]&&b===ht[++H]&&H<ot);q.match_length=A-(ot-H),q.match_length>q.lookahead&&(q.match_length=q.lookahead)}if(q.match_length>=D?(E=s._tr_tally(q,1,q.match_length-D),q.lookahead-=q.match_length,q.strstart+=q.match_length,q.match_length=0):(E=s._tr_tally(q,0,q.window[q.strstart]),q.lookahead--,q.strstart++),E&&(P(q,!1),q.strm.avail_out===0))return v}return q.insert=0,ut===p?(P(q,!0),q.strm.avail_out===0?B:U):q.last_lit&&(P(q,!1),q.strm.avail_out===0)?v:O}(z,X):n[z.level].func(z,X);if(st!==B&&st!==U||(z.status=666),st===v||st===B)return _.avail_out===0&&(z.last_flush=-1),h;if(st===O&&(X===1?s._tr_align(z):X!==5&&(s._tr_stored_block(z,0,0,!1),X===3&&(J(z.head),z.lookahead===0&&(z.strstart=0,z.block_start=0,z.insert=0))),C(_),_.avail_out===0))return z.last_flush=-1,h}return X!==p?h:z.wrap<=0?1:(z.wrap===2?(it(z,255&_.adler),it(z,_.adler>>8&255),it(z,_.adler>>16&255),it(z,_.adler>>24&255),it(z,255&_.total_in),it(z,_.total_in>>8&255),it(z,_.total_in>>16&255),it(z,_.total_in>>24&255)):(Z(z,_.adler>>>16),Z(z,65535&_.adler)),C(_),0<z.wrap&&(z.wrap=-z.wrap),z.pending!==0?h:1)},e.deflateEnd=function(_){var X;return _&&_.state?(X=_.state.status)!==T&&X!==69&&X!==73&&X!==91&&X!==103&&X!==F&&X!==666?nt(_,f):(_.state=null,X===F?nt(_,-3):h):f},e.deflateSetDictionary=function(_,X){var Q,z,R,V,rt,st,q,ut,E=X.length;if(!_||!_.state||(V=(Q=_.state).wrap)===2||V===1&&Q.status!==T||Q.lookahead)return f;for(V===1&&(_.adler=o(_.adler,X,E,0)),Q.wrap=0,E>=Q.w_size&&(V===0&&(J(Q.head),Q.strstart=0,Q.block_start=0,Q.insert=0),ut=new i.Buf8(Q.w_size),i.arraySet(ut,X,E-Q.w_size,Q.w_size,0),X=ut,E=Q.w_size),rt=_.avail_in,st=_.next_in,q=_.input,_.avail_in=E,_.next_in=0,_.input=X,ft(Q);Q.lookahead>=D;){for(z=Q.strstart,R=Q.lookahead-(D-1);Q.ins_h=(Q.ins_h<<Q.hash_shift^Q.window[z+D-1])&Q.hash_mask,Q.prev[z&Q.w_mask]=Q.head[Q.ins_h],Q.head[Q.ins_h]=z,z++,--R;);Q.strstart=z,Q.lookahead=D-1,ft(Q)}return Q.strstart+=Q.lookahead,Q.block_start=Q.strstart,Q.insert=Q.lookahead,Q.lookahead=0,Q.match_length=Q.prev_length=D-1,Q.match_available=0,_.next_in=st,_.input=q,_.avail_in=rt,Q.wrap=V,h},e.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./messages":51,"./trees":52}],47:[function(a,t,e){"use strict";t.exports=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}},{}],48:[function(a,t,e){"use strict";t.exports=function(n,i){var s,o,r,l,c,p,h,f,m,g,u,d,x,y,M,w,S,I,D,A,k,T,F,v,O;s=n.state,o=n.next_in,v=n.input,r=o+(n.avail_in-5),l=n.next_out,O=n.output,c=l-(i-n.avail_out),p=l+(n.avail_out-257),h=s.dmax,f=s.wsize,m=s.whave,g=s.wnext,u=s.window,d=s.hold,x=s.bits,y=s.lencode,M=s.distcode,w=(1<<s.lenbits)-1,S=(1<<s.distbits)-1;t:do{x<15&&(d+=v[o++]<<x,x+=8,d+=v[o++]<<x,x+=8),I=y[d&w];e:for(;;){if(d>>>=D=I>>>24,x-=D,(D=I>>>16&255)===0)O[l++]=65535&I;else{if(!(16&D)){if((64&D)==0){I=y[(65535&I)+(d&(1<<D)-1)];continue e}if(32&D){s.mode=12;break t}n.msg="invalid literal/length code",s.mode=30;break t}A=65535&I,(D&=15)&&(x<D&&(d+=v[o++]<<x,x+=8),A+=d&(1<<D)-1,d>>>=D,x-=D),x<15&&(d+=v[o++]<<x,x+=8,d+=v[o++]<<x,x+=8),I=M[d&S];n:for(;;){if(d>>>=D=I>>>24,x-=D,!(16&(D=I>>>16&255))){if((64&D)==0){I=M[(65535&I)+(d&(1<<D)-1)];continue n}n.msg="invalid distance code",s.mode=30;break t}if(k=65535&I,x<(D&=15)&&(d+=v[o++]<<x,(x+=8)<D&&(d+=v[o++]<<x,x+=8)),h<(k+=d&(1<<D)-1)){n.msg="invalid distance too far back",s.mode=30;break t}if(d>>>=D,x-=D,(D=l-c)<k){if(m<(D=k-D)&&s.sane){n.msg="invalid distance too far back",s.mode=30;break t}if(F=u,(T=0)===g){if(T+=f-D,D<A){for(A-=D;O[l++]=u[T++],--D;);T=l-k,F=O}}else if(g<D){if(T+=f+g-D,(D-=g)<A){for(A-=D;O[l++]=u[T++],--D;);if(T=0,g<A){for(A-=D=g;O[l++]=u[T++],--D;);T=l-k,F=O}}}else if(T+=g-D,D<A){for(A-=D;O[l++]=u[T++],--D;);T=l-k,F=O}for(;2<A;)O[l++]=F[T++],O[l++]=F[T++],O[l++]=F[T++],A-=3;A&&(O[l++]=F[T++],1<A&&(O[l++]=F[T++]))}else{for(T=l-k;O[l++]=O[T++],O[l++]=O[T++],O[l++]=O[T++],2<(A-=3););A&&(O[l++]=O[T++],1<A&&(O[l++]=O[T++]))}break}}break}}while(o<r&&l<p);o-=A=x>>3,d&=(1<<(x-=A<<3))-1,n.next_in=o,n.next_out=l,n.avail_in=o<r?r-o+5:5-(o-r),n.avail_out=l<p?p-l+257:257-(l-p),s.hold=d,s.bits=x}},{}],49:[function(a,t,e){"use strict";var n=a("../utils/common"),i=a("./adler32"),s=a("./crc32"),o=a("./inffast"),r=a("./inftrees"),l=1,c=2,p=0,h=-2,f=1,m=852,g=592;function u(T){return(T>>>24&255)+(T>>>8&65280)+((65280&T)<<8)+((255&T)<<24)}function d(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new n.Buf16(320),this.work=new n.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function x(T){var F;return T&&T.state?(F=T.state,T.total_in=T.total_out=F.total=0,T.msg="",F.wrap&&(T.adler=1&F.wrap),F.mode=f,F.last=0,F.havedict=0,F.dmax=32768,F.head=null,F.hold=0,F.bits=0,F.lencode=F.lendyn=new n.Buf32(m),F.distcode=F.distdyn=new n.Buf32(g),F.sane=1,F.back=-1,p):h}function y(T){var F;return T&&T.state?((F=T.state).wsize=0,F.whave=0,F.wnext=0,x(T)):h}function M(T,F){var v,O;return T&&T.state?(O=T.state,F<0?(v=0,F=-F):(v=1+(F>>4),F<48&&(F&=15)),F&&(F<8||15<F)?h:(O.window!==null&&O.wbits!==F&&(O.window=null),O.wrap=v,O.wbits=F,y(T))):h}function w(T,F){var v,O;return T?(O=new d,(T.state=O).window=null,(v=M(T,F))!==p&&(T.state=null),v):h}var S,I,D=!0;function A(T){if(D){var F;for(S=new n.Buf32(512),I=new n.Buf32(32),F=0;F<144;)T.lens[F++]=8;for(;F<256;)T.lens[F++]=9;for(;F<280;)T.lens[F++]=7;for(;F<288;)T.lens[F++]=8;for(r(l,T.lens,0,288,S,0,T.work,{bits:9}),F=0;F<32;)T.lens[F++]=5;r(c,T.lens,0,32,I,0,T.work,{bits:5}),D=!1}T.lencode=S,T.lenbits=9,T.distcode=I,T.distbits=5}function k(T,F,v,O){var B,U=T.state;return U.window===null&&(U.wsize=1<<U.wbits,U.wnext=0,U.whave=0,U.window=new n.Buf8(U.wsize)),O>=U.wsize?(n.arraySet(U.window,F,v-U.wsize,U.wsize,0),U.wnext=0,U.whave=U.wsize):(O<(B=U.wsize-U.wnext)&&(B=O),n.arraySet(U.window,F,v-O,B,U.wnext),(O-=B)?(n.arraySet(U.window,F,v-O,O,0),U.wnext=O,U.whave=U.wsize):(U.wnext+=B,U.wnext===U.wsize&&(U.wnext=0),U.whave<U.wsize&&(U.whave+=B))),0}e.inflateReset=y,e.inflateReset2=M,e.inflateResetKeep=x,e.inflateInit=function(T){return w(T,15)},e.inflateInit2=w,e.inflate=function(T,F){var v,O,B,U,nt,G,J,C,P,it,Z,K,ft,At,et,Tt,Mt,bt,xt,Dt,_,X,Q,z,R=0,V=new n.Buf8(4),rt=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!T||!T.state||!T.output||!T.input&&T.avail_in!==0)return h;(v=T.state).mode===12&&(v.mode=13),nt=T.next_out,B=T.output,J=T.avail_out,U=T.next_in,O=T.input,G=T.avail_in,C=v.hold,P=v.bits,it=G,Z=J,X=p;t:for(;;)switch(v.mode){case f:if(v.wrap===0){v.mode=13;break}for(;P<16;){if(G===0)break t;G--,C+=O[U++]<<P,P+=8}if(2&v.wrap&&C===35615){V[v.check=0]=255&C,V[1]=C>>>8&255,v.check=s(v.check,V,2,0),P=C=0,v.mode=2;break}if(v.flags=0,v.head&&(v.head.done=!1),!(1&v.wrap)||(((255&C)<<8)+(C>>8))%31){T.msg="incorrect header check",v.mode=30;break}if((15&C)!=8){T.msg="unknown compression method",v.mode=30;break}if(P-=4,_=8+(15&(C>>>=4)),v.wbits===0)v.wbits=_;else if(_>v.wbits){T.msg="invalid window size",v.mode=30;break}v.dmax=1<<_,T.adler=v.check=1,v.mode=512&C?10:12,P=C=0;break;case 2:for(;P<16;){if(G===0)break t;G--,C+=O[U++]<<P,P+=8}if(v.flags=C,(255&v.flags)!=8){T.msg="unknown compression method",v.mode=30;break}if(57344&v.flags){T.msg="unknown header flags set",v.mode=30;break}v.head&&(v.head.text=C>>8&1),512&v.flags&&(V[0]=255&C,V[1]=C>>>8&255,v.check=s(v.check,V,2,0)),P=C=0,v.mode=3;case 3:for(;P<32;){if(G===0)break t;G--,C+=O[U++]<<P,P+=8}v.head&&(v.head.time=C),512&v.flags&&(V[0]=255&C,V[1]=C>>>8&255,V[2]=C>>>16&255,V[3]=C>>>24&255,v.check=s(v.check,V,4,0)),P=C=0,v.mode=4;case 4:for(;P<16;){if(G===0)break t;G--,C+=O[U++]<<P,P+=8}v.head&&(v.head.xflags=255&C,v.head.os=C>>8),512&v.flags&&(V[0]=255&C,V[1]=C>>>8&255,v.check=s(v.check,V,2,0)),P=C=0,v.mode=5;case 5:if(1024&v.flags){for(;P<16;){if(G===0)break t;G--,C+=O[U++]<<P,P+=8}v.length=C,v.head&&(v.head.extra_len=C),512&v.flags&&(V[0]=255&C,V[1]=C>>>8&255,v.check=s(v.check,V,2,0)),P=C=0}else v.head&&(v.head.extra=null);v.mode=6;case 6:if(1024&v.flags&&(G<(K=v.length)&&(K=G),K&&(v.head&&(_=v.head.extra_len-v.length,v.head.extra||(v.head.extra=new Array(v.head.extra_len)),n.arraySet(v.head.extra,O,U,K,_)),512&v.flags&&(v.check=s(v.check,O,K,U)),G-=K,U+=K,v.length-=K),v.length))break t;v.length=0,v.mode=7;case 7:if(2048&v.flags){if(G===0)break t;for(K=0;_=O[U+K++],v.head&&_&&v.length<65536&&(v.head.name+=String.fromCharCode(_)),_&&K<G;);if(512&v.flags&&(v.check=s(v.check,O,K,U)),G-=K,U+=K,_)break t}else v.head&&(v.head.name=null);v.length=0,v.mode=8;case 8:if(4096&v.flags){if(G===0)break t;for(K=0;_=O[U+K++],v.head&&_&&v.length<65536&&(v.head.comment+=String.fromCharCode(_)),_&&K<G;);if(512&v.flags&&(v.check=s(v.check,O,K,U)),G-=K,U+=K,_)break t}else v.head&&(v.head.comment=null);v.mode=9;case 9:if(512&v.flags){for(;P<16;){if(G===0)break t;G--,C+=O[U++]<<P,P+=8}if(C!==(65535&v.check)){T.msg="header crc mismatch",v.mode=30;break}P=C=0}v.head&&(v.head.hcrc=v.flags>>9&1,v.head.done=!0),T.adler=v.check=0,v.mode=12;break;case 10:for(;P<32;){if(G===0)break t;G--,C+=O[U++]<<P,P+=8}T.adler=v.check=u(C),P=C=0,v.mode=11;case 11:if(v.havedict===0)return T.next_out=nt,T.avail_out=J,T.next_in=U,T.avail_in=G,v.hold=C,v.bits=P,2;T.adler=v.check=1,v.mode=12;case 12:if(F===5||F===6)break t;case 13:if(v.last){C>>>=7&P,P-=7&P,v.mode=27;break}for(;P<3;){if(G===0)break t;G--,C+=O[U++]<<P,P+=8}switch(v.last=1&C,P-=1,3&(C>>>=1)){case 0:v.mode=14;break;case 1:if(A(v),v.mode=20,F!==6)break;C>>>=2,P-=2;break t;case 2:v.mode=17;break;case 3:T.msg="invalid block type",v.mode=30}C>>>=2,P-=2;break;case 14:for(C>>>=7&P,P-=7&P;P<32;){if(G===0)break t;G--,C+=O[U++]<<P,P+=8}if((65535&C)!=(C>>>16^65535)){T.msg="invalid stored block lengths",v.mode=30;break}if(v.length=65535&C,P=C=0,v.mode=15,F===6)break t;case 15:v.mode=16;case 16:if(K=v.length){if(G<K&&(K=G),J<K&&(K=J),K===0)break t;n.arraySet(B,O,U,K,nt),G-=K,U+=K,J-=K,nt+=K,v.length-=K;break}v.mode=12;break;case 17:for(;P<14;){if(G===0)break t;G--,C+=O[U++]<<P,P+=8}if(v.nlen=257+(31&C),C>>>=5,P-=5,v.ndist=1+(31&C),C>>>=5,P-=5,v.ncode=4+(15&C),C>>>=4,P-=4,286<v.nlen||30<v.ndist){T.msg="too many length or distance symbols",v.mode=30;break}v.have=0,v.mode=18;case 18:for(;v.have<v.ncode;){for(;P<3;){if(G===0)break t;G--,C+=O[U++]<<P,P+=8}v.lens[rt[v.have++]]=7&C,C>>>=3,P-=3}for(;v.have<19;)v.lens[rt[v.have++]]=0;if(v.lencode=v.lendyn,v.lenbits=7,Q={bits:v.lenbits},X=r(0,v.lens,0,19,v.lencode,0,v.work,Q),v.lenbits=Q.bits,X){T.msg="invalid code lengths set",v.mode=30;break}v.have=0,v.mode=19;case 19:for(;v.have<v.nlen+v.ndist;){for(;Tt=(R=v.lencode[C&(1<<v.lenbits)-1])>>>16&255,Mt=65535&R,!((et=R>>>24)<=P);){if(G===0)break t;G--,C+=O[U++]<<P,P+=8}if(Mt<16)C>>>=et,P-=et,v.lens[v.have++]=Mt;else{if(Mt===16){for(z=et+2;P<z;){if(G===0)break t;G--,C+=O[U++]<<P,P+=8}if(C>>>=et,P-=et,v.have===0){T.msg="invalid bit length repeat",v.mode=30;break}_=v.lens[v.have-1],K=3+(3&C),C>>>=2,P-=2}else if(Mt===17){for(z=et+3;P<z;){if(G===0)break t;G--,C+=O[U++]<<P,P+=8}P-=et,_=0,K=3+(7&(C>>>=et)),C>>>=3,P-=3}else{for(z=et+7;P<z;){if(G===0)break t;G--,C+=O[U++]<<P,P+=8}P-=et,_=0,K=11+(127&(C>>>=et)),C>>>=7,P-=7}if(v.have+K>v.nlen+v.ndist){T.msg="invalid bit length repeat",v.mode=30;break}for(;K--;)v.lens[v.have++]=_}}if(v.mode===30)break;if(v.lens[256]===0){T.msg="invalid code -- missing end-of-block",v.mode=30;break}if(v.lenbits=9,Q={bits:v.lenbits},X=r(l,v.lens,0,v.nlen,v.lencode,0,v.work,Q),v.lenbits=Q.bits,X){T.msg="invalid literal/lengths set",v.mode=30;break}if(v.distbits=6,v.distcode=v.distdyn,Q={bits:v.distbits},X=r(c,v.lens,v.nlen,v.ndist,v.distcode,0,v.work,Q),v.distbits=Q.bits,X){T.msg="invalid distances set",v.mode=30;break}if(v.mode=20,F===6)break t;case 20:v.mode=21;case 21:if(6<=G&&258<=J){T.next_out=nt,T.avail_out=J,T.next_in=U,T.avail_in=G,v.hold=C,v.bits=P,o(T,Z),nt=T.next_out,B=T.output,J=T.avail_out,U=T.next_in,O=T.input,G=T.avail_in,C=v.hold,P=v.bits,v.mode===12&&(v.back=-1);break}for(v.back=0;Tt=(R=v.lencode[C&(1<<v.lenbits)-1])>>>16&255,Mt=65535&R,!((et=R>>>24)<=P);){if(G===0)break t;G--,C+=O[U++]<<P,P+=8}if(Tt&&(240&Tt)==0){for(bt=et,xt=Tt,Dt=Mt;Tt=(R=v.lencode[Dt+((C&(1<<bt+xt)-1)>>bt)])>>>16&255,Mt=65535&R,!(bt+(et=R>>>24)<=P);){if(G===0)break t;G--,C+=O[U++]<<P,P+=8}C>>>=bt,P-=bt,v.back+=bt}if(C>>>=et,P-=et,v.back+=et,v.length=Mt,Tt===0){v.mode=26;break}if(32&Tt){v.back=-1,v.mode=12;break}if(64&Tt){T.msg="invalid literal/length code",v.mode=30;break}v.extra=15&Tt,v.mode=22;case 22:if(v.extra){for(z=v.extra;P<z;){if(G===0)break t;G--,C+=O[U++]<<P,P+=8}v.length+=C&(1<<v.extra)-1,C>>>=v.extra,P-=v.extra,v.back+=v.extra}v.was=v.length,v.mode=23;case 23:for(;Tt=(R=v.distcode[C&(1<<v.distbits)-1])>>>16&255,Mt=65535&R,!((et=R>>>24)<=P);){if(G===0)break t;G--,C+=O[U++]<<P,P+=8}if((240&Tt)==0){for(bt=et,xt=Tt,Dt=Mt;Tt=(R=v.distcode[Dt+((C&(1<<bt+xt)-1)>>bt)])>>>16&255,Mt=65535&R,!(bt+(et=R>>>24)<=P);){if(G===0)break t;G--,C+=O[U++]<<P,P+=8}C>>>=bt,P-=bt,v.back+=bt}if(C>>>=et,P-=et,v.back+=et,64&Tt){T.msg="invalid distance code",v.mode=30;break}v.offset=Mt,v.extra=15&Tt,v.mode=24;case 24:if(v.extra){for(z=v.extra;P<z;){if(G===0)break t;G--,C+=O[U++]<<P,P+=8}v.offset+=C&(1<<v.extra)-1,C>>>=v.extra,P-=v.extra,v.back+=v.extra}if(v.offset>v.dmax){T.msg="invalid distance too far back",v.mode=30;break}v.mode=25;case 25:if(J===0)break t;if(K=Z-J,v.offset>K){if((K=v.offset-K)>v.whave&&v.sane){T.msg="invalid distance too far back",v.mode=30;break}ft=K>v.wnext?(K-=v.wnext,v.wsize-K):v.wnext-K,K>v.length&&(K=v.length),At=v.window}else At=B,ft=nt-v.offset,K=v.length;for(J<K&&(K=J),J-=K,v.length-=K;B[nt++]=At[ft++],--K;);v.length===0&&(v.mode=21);break;case 26:if(J===0)break t;B[nt++]=v.length,J--,v.mode=21;break;case 27:if(v.wrap){for(;P<32;){if(G===0)break t;G--,C|=O[U++]<<P,P+=8}if(Z-=J,T.total_out+=Z,v.total+=Z,Z&&(T.adler=v.check=v.flags?s(v.check,B,Z,nt-Z):i(v.check,B,Z,nt-Z)),Z=J,(v.flags?C:u(C))!==v.check){T.msg="incorrect data check",v.mode=30;break}P=C=0}v.mode=28;case 28:if(v.wrap&&v.flags){for(;P<32;){if(G===0)break t;G--,C+=O[U++]<<P,P+=8}if(C!==(4294967295&v.total)){T.msg="incorrect length check",v.mode=30;break}P=C=0}v.mode=29;case 29:X=1;break t;case 30:X=-3;break t;case 31:return-4;case 32:default:return h}return T.next_out=nt,T.avail_out=J,T.next_in=U,T.avail_in=G,v.hold=C,v.bits=P,(v.wsize||Z!==T.avail_out&&v.mode<30&&(v.mode<27||F!==4))&&k(T,T.output,T.next_out,Z-T.avail_out)?(v.mode=31,-4):(it-=T.avail_in,Z-=T.avail_out,T.total_in+=it,T.total_out+=Z,v.total+=Z,v.wrap&&Z&&(T.adler=v.check=v.flags?s(v.check,B,Z,T.next_out-Z):i(v.check,B,Z,T.next_out-Z)),T.data_type=v.bits+(v.last?64:0)+(v.mode===12?128:0)+(v.mode===20||v.mode===15?256:0),(it==0&&Z===0||F===4)&&X===p&&(X=-5),X)},e.inflateEnd=function(T){if(!T||!T.state)return h;var F=T.state;return F.window&&(F.window=null),T.state=null,p},e.inflateGetHeader=function(T,F){var v;return T&&T.state?(2&(v=T.state).wrap)==0?h:((v.head=F).done=!1,p):h},e.inflateSetDictionary=function(T,F){var v,O=F.length;return T&&T.state?(v=T.state).wrap!==0&&v.mode!==11?h:v.mode===11&&i(1,F,O,0)!==v.check?-3:k(T,F,O,O)?(v.mode=31,-4):(v.havedict=1,p):h},e.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./inffast":48,"./inftrees":50}],50:[function(a,t,e){"use strict";var n=a("../utils/common"),i=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],s=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],o=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],r=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];t.exports=function(l,c,p,h,f,m,g,u){var d,x,y,M,w,S,I,D,A,k=u.bits,T=0,F=0,v=0,O=0,B=0,U=0,nt=0,G=0,J=0,C=0,P=null,it=0,Z=new n.Buf16(16),K=new n.Buf16(16),ft=null,At=0;for(T=0;T<=15;T++)Z[T]=0;for(F=0;F<h;F++)Z[c[p+F]]++;for(B=k,O=15;1<=O&&Z[O]===0;O--);if(O<B&&(B=O),O===0)return f[m++]=20971520,f[m++]=20971520,u.bits=1,0;for(v=1;v<O&&Z[v]===0;v++);for(B<v&&(B=v),T=G=1;T<=15;T++)if(G<<=1,(G-=Z[T])<0)return-1;if(0<G&&(l===0||O!==1))return-1;for(K[1]=0,T=1;T<15;T++)K[T+1]=K[T]+Z[T];for(F=0;F<h;F++)c[p+F]!==0&&(g[K[c[p+F]]++]=F);if(S=l===0?(P=ft=g,19):l===1?(P=i,it-=257,ft=s,At-=257,256):(P=o,ft=r,-1),T=v,w=m,nt=F=C=0,y=-1,M=(J=1<<(U=B))-1,l===1&&852<J||l===2&&592<J)return 1;for(;;){for(I=T-nt,A=g[F]<S?(D=0,g[F]):g[F]>S?(D=ft[At+g[F]],P[it+g[F]]):(D=96,0),d=1<<T-nt,v=x=1<<U;f[w+(C>>nt)+(x-=d)]=I<<24|D<<16|A|0,x!==0;);for(d=1<<T-1;C&d;)d>>=1;if(d!==0?(C&=d-1,C+=d):C=0,F++,--Z[T]==0){if(T===O)break;T=c[p+g[F]]}if(B<T&&(C&M)!==y){for(nt===0&&(nt=B),w+=v,G=1<<(U=T-nt);U+nt<O&&!((G-=Z[U+nt])<=0);)U++,G<<=1;if(J+=1<<U,l===1&&852<J||l===2&&592<J)return 1;f[y=C&M]=B<<24|U<<16|w-m|0}}return C!==0&&(f[w+C]=T-nt<<24|64<<16|0),u.bits=B,0}},{"../utils/common":41}],51:[function(a,t,e){"use strict";t.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],52:[function(a,t,e){"use strict";var n=a("../utils/common"),i=0,s=1;function o(R){for(var V=R.length;0<=--V;)R[V]=0}var r=0,l=29,c=256,p=c+1+l,h=30,f=19,m=2*p+1,g=15,u=16,d=7,x=256,y=16,M=17,w=18,S=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],I=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],D=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],A=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],k=new Array(2*(p+2));o(k);var T=new Array(2*h);o(T);var F=new Array(512);o(F);var v=new Array(256);o(v);var O=new Array(l);o(O);var B,U,nt,G=new Array(h);function J(R,V,rt,st,q){this.static_tree=R,this.extra_bits=V,this.extra_base=rt,this.elems=st,this.max_length=q,this.has_stree=R&&R.length}function C(R,V){this.dyn_tree=R,this.max_code=0,this.stat_desc=V}function P(R){return R<256?F[R]:F[256+(R>>>7)]}function it(R,V){R.pending_buf[R.pending++]=255&V,R.pending_buf[R.pending++]=V>>>8&255}function Z(R,V,rt){R.bi_valid>u-rt?(R.bi_buf|=V<<R.bi_valid&65535,it(R,R.bi_buf),R.bi_buf=V>>u-R.bi_valid,R.bi_valid+=rt-u):(R.bi_buf|=V<<R.bi_valid&65535,R.bi_valid+=rt)}function K(R,V,rt){Z(R,rt[2*V],rt[2*V+1])}function ft(R,V){for(var rt=0;rt|=1&R,R>>>=1,rt<<=1,0<--V;);return rt>>>1}function At(R,V,rt){var st,q,ut=new Array(g+1),E=0;for(st=1;st<=g;st++)ut[st]=E=E+rt[st-1]<<1;for(q=0;q<=V;q++){var b=R[2*q+1];b!==0&&(R[2*q]=ft(ut[b]++,b))}}function et(R){var V;for(V=0;V<p;V++)R.dyn_ltree[2*V]=0;for(V=0;V<h;V++)R.dyn_dtree[2*V]=0;for(V=0;V<f;V++)R.bl_tree[2*V]=0;R.dyn_ltree[2*x]=1,R.opt_len=R.static_len=0,R.last_lit=R.matches=0}function Tt(R){8<R.bi_valid?it(R,R.bi_buf):0<R.bi_valid&&(R.pending_buf[R.pending++]=R.bi_buf),R.bi_buf=0,R.bi_valid=0}function Mt(R,V,rt,st){var q=2*V,ut=2*rt;return R[q]<R[ut]||R[q]===R[ut]&&st[V]<=st[rt]}function bt(R,V,rt){for(var st=R.heap[rt],q=rt<<1;q<=R.heap_len&&(q<R.heap_len&&Mt(V,R.heap[q+1],R.heap[q],R.depth)&&q++,!Mt(V,st,R.heap[q],R.depth));)R.heap[rt]=R.heap[q],rt=q,q<<=1;R.heap[rt]=st}function xt(R,V,rt){var st,q,ut,E,b=0;if(R.last_lit!==0)for(;st=R.pending_buf[R.d_buf+2*b]<<8|R.pending_buf[R.d_buf+2*b+1],q=R.pending_buf[R.l_buf+b],b++,st===0?K(R,q,V):(K(R,(ut=v[q])+c+1,V),(E=S[ut])!==0&&Z(R,q-=O[ut],E),K(R,ut=P(--st),rt),(E=I[ut])!==0&&Z(R,st-=G[ut],E)),b<R.last_lit;);K(R,x,V)}function Dt(R,V){var rt,st,q,ut=V.dyn_tree,E=V.stat_desc.static_tree,b=V.stat_desc.has_stree,H=V.stat_desc.elems,ot=-1;for(R.heap_len=0,R.heap_max=m,rt=0;rt<H;rt++)ut[2*rt]!==0?(R.heap[++R.heap_len]=ot=rt,R.depth[rt]=0):ut[2*rt+1]=0;for(;R.heap_len<2;)ut[2*(q=R.heap[++R.heap_len]=ot<2?++ot:0)]=1,R.depth[q]=0,R.opt_len--,b&&(R.static_len-=E[2*q+1]);for(V.max_code=ot,rt=R.heap_len>>1;1<=rt;rt--)bt(R,ut,rt);for(q=H;rt=R.heap[1],R.heap[1]=R.heap[R.heap_len--],bt(R,ut,1),st=R.heap[1],R.heap[--R.heap_max]=rt,R.heap[--R.heap_max]=st,ut[2*q]=ut[2*rt]+ut[2*st],R.depth[q]=(R.depth[rt]>=R.depth[st]?R.depth[rt]:R.depth[st])+1,ut[2*rt+1]=ut[2*st+1]=q,R.heap[1]=q++,bt(R,ut,1),2<=R.heap_len;);R.heap[--R.heap_max]=R.heap[1],function(ht,pt){var Et,N,Y,dt,wt,yt,St=pt.dyn_tree,Pt=pt.max_code,Nt=pt.stat_desc.static_tree,W=pt.stat_desc.has_stree,vt=pt.stat_desc.extra_bits,mt=pt.stat_desc.extra_base,lt=pt.stat_desc.max_length,gt=0;for(dt=0;dt<=g;dt++)ht.bl_count[dt]=0;for(St[2*ht.heap[ht.heap_max]+1]=0,Et=ht.heap_max+1;Et<m;Et++)lt<(dt=St[2*St[2*(N=ht.heap[Et])+1]+1]+1)&&(dt=lt,gt++),St[2*N+1]=dt,Pt<N||(ht.bl_count[dt]++,wt=0,mt<=N&&(wt=vt[N-mt]),yt=St[2*N],ht.opt_len+=yt*(dt+wt),W&&(ht.static_len+=yt*(Nt[2*N+1]+wt)));if(gt!==0){do{for(dt=lt-1;ht.bl_count[dt]===0;)dt--;ht.bl_count[dt]--,ht.bl_count[dt+1]+=2,ht.bl_count[lt]--,gt-=2}while(0<gt);for(dt=lt;dt!==0;dt--)for(N=ht.bl_count[dt];N!==0;)Pt<(Y=ht.heap[--Et])||(St[2*Y+1]!==dt&&(ht.opt_len+=(dt-St[2*Y+1])*St[2*Y],St[2*Y+1]=dt),N--)}}(R,V),At(ut,ot,R.bl_count)}function _(R,V,rt){var st,q,ut=-1,E=V[1],b=0,H=7,ot=4;for(E===0&&(H=138,ot=3),V[2*(rt+1)+1]=65535,st=0;st<=rt;st++)q=E,E=V[2*(st+1)+1],++b<H&&q===E||(b<ot?R.bl_tree[2*q]+=b:q!==0?(q!==ut&&R.bl_tree[2*q]++,R.bl_tree[2*y]++):b<=10?R.bl_tree[2*M]++:R.bl_tree[2*w]++,ut=q,ot=(b=0)===E?(H=138,3):q===E?(H=6,3):(H=7,4))}function X(R,V,rt){var st,q,ut=-1,E=V[1],b=0,H=7,ot=4;for(E===0&&(H=138,ot=3),st=0;st<=rt;st++)if(q=E,E=V[2*(st+1)+1],!(++b<H&&q===E)){if(b<ot)for(;K(R,q,R.bl_tree),--b!=0;);else q!==0?(q!==ut&&(K(R,q,R.bl_tree),b--),K(R,y,R.bl_tree),Z(R,b-3,2)):b<=10?(K(R,M,R.bl_tree),Z(R,b-3,3)):(K(R,w,R.bl_tree),Z(R,b-11,7));ut=q,ot=(b=0)===E?(H=138,3):q===E?(H=6,3):(H=7,4)}}o(G);var Q=!1;function z(R,V,rt,st){Z(R,(r<<1)+(st?1:0),3),function(q,ut,E,b){Tt(q),b&&(it(q,E),it(q,~E)),n.arraySet(q.pending_buf,q.window,ut,E,q.pending),q.pending+=E}(R,V,rt,!0)}e._tr_init=function(R){Q||(function(){var V,rt,st,q,ut,E=new Array(g+1);for(q=st=0;q<l-1;q++)for(O[q]=st,V=0;V<1<<S[q];V++)v[st++]=q;for(v[st-1]=q,q=ut=0;q<16;q++)for(G[q]=ut,V=0;V<1<<I[q];V++)F[ut++]=q;for(ut>>=7;q<h;q++)for(G[q]=ut<<7,V=0;V<1<<I[q]-7;V++)F[256+ut++]=q;for(rt=0;rt<=g;rt++)E[rt]=0;for(V=0;V<=143;)k[2*V+1]=8,V++,E[8]++;for(;V<=255;)k[2*V+1]=9,V++,E[9]++;for(;V<=279;)k[2*V+1]=7,V++,E[7]++;for(;V<=287;)k[2*V+1]=8,V++,E[8]++;for(At(k,p+1,E),V=0;V<h;V++)T[2*V+1]=5,T[2*V]=ft(V,5);B=new J(k,S,c+1,p,g),U=new J(T,I,0,h,g),nt=new J(new Array(0),D,0,f,d)}(),Q=!0),R.l_desc=new C(R.dyn_ltree,B),R.d_desc=new C(R.dyn_dtree,U),R.bl_desc=new C(R.bl_tree,nt),R.bi_buf=0,R.bi_valid=0,et(R)},e._tr_stored_block=z,e._tr_flush_block=function(R,V,rt,st){var q,ut,E=0;0<R.level?(R.strm.data_type===2&&(R.strm.data_type=function(b){var H,ot=4093624447;for(H=0;H<=31;H++,ot>>>=1)if(1&ot&&b.dyn_ltree[2*H]!==0)return i;if(b.dyn_ltree[18]!==0||b.dyn_ltree[20]!==0||b.dyn_ltree[26]!==0)return s;for(H=32;H<c;H++)if(b.dyn_ltree[2*H]!==0)return s;return i}(R)),Dt(R,R.l_desc),Dt(R,R.d_desc),E=function(b){var H;for(_(b,b.dyn_ltree,b.l_desc.max_code),_(b,b.dyn_dtree,b.d_desc.max_code),Dt(b,b.bl_desc),H=f-1;3<=H&&b.bl_tree[2*A[H]+1]===0;H--);return b.opt_len+=3*(H+1)+5+5+4,H}(R),q=R.opt_len+3+7>>>3,(ut=R.static_len+3+7>>>3)<=q&&(q=ut)):q=ut=rt+5,rt+4<=q&&V!==-1?z(R,V,rt,st):R.strategy===4||ut===q?(Z(R,2+(st?1:0),3),xt(R,k,T)):(Z(R,4+(st?1:0),3),function(b,H,ot,ht){var pt;for(Z(b,H-257,5),Z(b,ot-1,5),Z(b,ht-4,4),pt=0;pt<ht;pt++)Z(b,b.bl_tree[2*A[pt]+1],3);X(b,b.dyn_ltree,H-1),X(b,b.dyn_dtree,ot-1)}(R,R.l_desc.max_code+1,R.d_desc.max_code+1,E+1),xt(R,R.dyn_ltree,R.dyn_dtree)),et(R),st&&Tt(R)},e._tr_tally=function(R,V,rt){return R.pending_buf[R.d_buf+2*R.last_lit]=V>>>8&255,R.pending_buf[R.d_buf+2*R.last_lit+1]=255&V,R.pending_buf[R.l_buf+R.last_lit]=255&rt,R.last_lit++,V===0?R.dyn_ltree[2*rt]++:(R.matches++,V--,R.dyn_ltree[2*(v[rt]+c+1)]++,R.dyn_dtree[2*P(V)]++),R.last_lit===R.lit_bufsize-1},e._tr_align=function(R){Z(R,2,3),K(R,x,k),function(V){V.bi_valid===16?(it(V,V.bi_buf),V.bi_buf=0,V.bi_valid=0):8<=V.bi_valid&&(V.pending_buf[V.pending++]=255&V.bi_buf,V.bi_buf>>=8,V.bi_valid-=8)}(R)}},{"../utils/common":41}],53:[function(a,t,e){"use strict";t.exports=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}},{}],54:[function(a,t,e){(function(n){(function(i,s){"use strict";if(!i.setImmediate){var o,r,l,c,p=1,h={},f=!1,m=i.document,g=Object.getPrototypeOf&&Object.getPrototypeOf(i);g=g&&g.setTimeout?g:i,o={}.toString.call(i.process)==="[object process]"?function(y){process.nextTick(function(){d(y)})}:function(){if(i.postMessage&&!i.importScripts){var y=!0,M=i.onmessage;return i.onmessage=function(){y=!1},i.postMessage("","*"),i.onmessage=M,y}}()?(c="setImmediate$"+Math.random()+"$",i.addEventListener?i.addEventListener("message",x,!1):i.attachEvent("onmessage",x),function(y){i.postMessage(c+y,"*")}):i.MessageChannel?((l=new MessageChannel).port1.onmessage=function(y){d(y.data)},function(y){l.port2.postMessage(y)}):m&&"onreadystatechange"in m.createElement("script")?(r=m.documentElement,function(y){var M=m.createElement("script");M.onreadystatechange=function(){d(y),M.onreadystatechange=null,r.removeChild(M),M=null},r.appendChild(M)}):function(y){setTimeout(d,0,y)},g.setImmediate=function(y){typeof y!="function"&&(y=new Function(""+y));for(var M=new Array(arguments.length-1),w=0;w<M.length;w++)M[w]=arguments[w+1];var S={callback:y,args:M};return h[p]=S,o(p),p++},g.clearImmediate=u}function u(y){delete h[y]}function d(y){if(f)setTimeout(d,0,y);else{var M=h[y];if(M){f=!0;try{(function(w){var S=w.callback,I=w.args;switch(I.length){case 0:S();break;case 1:S(I[0]);break;case 2:S(I[0],I[1]);break;case 3:S(I[0],I[1],I[2]);break;default:S.apply(s,I)}})(M)}finally{u(y),f=!1}}}}function x(y){y.source===i&&typeof y.data=="string"&&y.data.indexOf(c)===0&&d(+y.data.slice(c.length))}})(typeof self>"u"?n===void 0?this:n:self)}).call(this,typeof global<"u"?global:typeof self<"u"?self:typeof window<"u"?window:{})},{}]},{},[10])(10)})});function Ur(a,t,e,n){let i=n,s=0,o=0;for(t=Math.floor(t),e=Math.floor(e),a.rect(t-i,e,n<<1,1);i>s;)o-=--i-++s,o<0&&(o+=i++),a.rect(t-s,e-i,s<<1,1),a.rect(t-i,e-s,i<<1,1),a.rect(t-i,e+s,i<<1,1),a.rect(t-s,e+i,s<<1,1)}function Br(a,t,e,n,i){var s,o,r=i-e,l=n-t,c=!1,p=l>>31,h=r>>31,f;if((r^h)-h>(l^p)-p&&(r^=l,l^=r,r^=l,c=!0),s=l<0?-1:1,o=l===0?r:r/l,c)for(t+=.5,f=0;f!==l;f+=s)a.rect(t+f*o|0,e+f,1,1);else for(e+=.5,f=0;f!==l;f+=s)a.rect(t+f,e+f*o|0,1,1)}function ms(a,t,e,n,i=!1){let[s,o]=t,[r,l]=e;var c=r-s,p=l-o,h=Math.atan2(p,c),f=s-n*Math.sin(h),m=o+n*Math.cos(h),g=r-n*Math.sin(h),u=l+n*Math.cos(h),d=s+n*Math.sin(h),x=o-n*Math.cos(h),y=r+n*Math.sin(h),M=l-n*Math.cos(h);a.beginPath(),a.moveTo(s,o),a.lineTo(r,l),a.lineWidth=n<<1,a.stroke(),a.beginPath(),Br(a,f|0,m|0,g|0,u|0),Br(a,d|0,x|0,y|0,M|0),a.fill(),i?(a.fillRect(Math.floor(s)-n,Math.floor(o)-n,n*2,n*2),a.fillRect(Math.floor(r)-n,Math.floor(l)-n,n*2,n*2)):(Ur(a,s,o,n),Ur(a,r,l,n),a.fill())}var Tr="145",En={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Cn={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},zo=0,Vr=1,ko=2;var eo=1,Oo=2,ui=3,Kn=0,we=1,ke=2,ln=0,Jn=1,Wr=2,Hr=3,Gr=4,No=5,qn=100,Fo=101,Uo=102,Xr=103,qr=104,Bo=200,Vo=201,Wo=202,Ho=203,no=204,io=205,Go=206,Xo=207,qo=208,Zo=209,Yo=210,Jo=0,jo=1,$o=2,Ys=3,Ko=4,Qo=5,tl=6,el=7,so=0,nl=1,il=2,qe=0,sl=1,rl=2,al=3,ol=4,ll=5,ro=300,Qn=301,ti=302,Js=303,js=304,as=306,$s=1e3,Ce=1001,Ks=1002,ae=1003,Zr=1004;var Yr=1005;var ye=1006,cl=1007;var os=1008;var bn=1009,hl=1010,ul=1011,ao=1012,dl=1013,gn=1014,_n=1015,pi=1016,fl=1017,pl=1018,jn=1020,ml=1021,gl=1022,Oe=1023,_l=1024,xl=1025,vn=1026,ei=1027,vl=1028,yl=1029,bl=1030,wl=1031,Ml=1033,gs=33776,_s=33777,xs=33778,vs=33779,Jr=35840,jr=35841,$r=35842,Kr=35843,Sl=36196,Qr=37492,ta=37496,ea=37808,na=37809,ia=37810,sa=37811,ra=37812,aa=37813,oa=37814,la=37815,ca=37816,ha=37817,ua=37818,da=37819,fa=37820,pa=37821,ma=36492;var Xi=2300,qi=2301,ys=2302,ga=2400,_a=2401,xa=2402;var wn=3e3,Zt=3001,Al=3200,Tl=3201,El=0,Cl=1;var Ge="srgb",xn="srgb-linear";var bs=7680;var Pl=519,va=35044;var ya="300 es",Qs=1035,Ne=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let i=this._listeners[t];if(i!==void 0){let s=i.indexOf(e);s!==-1&&i.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let n=this._listeners[t.type];if(n!==void 0){t.target=this;let i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,t);t.target=null}}},se=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var ws=Math.PI/180,ba=180/Math.PI;function yi(){let a=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(se[a&255]+se[a>>8&255]+se[a>>16&255]+se[a>>24&255]+"-"+se[t&255]+se[t>>8&255]+"-"+se[t>>16&15|64]+se[t>>24&255]+"-"+se[e&63|128]+se[e>>8&255]+"-"+se[e>>16&255]+se[e>>24&255]+se[n&255]+se[n>>8&255]+se[n>>16&255]+se[n>>24&255]).toLowerCase()}function he(a,t,e){return Math.max(t,Math.min(e,a))}function Rl(a,t){return(a%t+t)%t}function Ms(a,t,e){return(1-e)*a+e*t}function wa(a){return(a&a-1)===0&&a!==0}function tr(a){return Math.pow(2,Math.floor(Math.log(a)/Math.LN2))}function wi(a,t){switch(t.constructor){case Float32Array:return a;case Uint16Array:return a/65535;case Uint8Array:return a/255;case Int16Array:return Math.max(a/32767,-1);case Int8Array:return Math.max(a/127,-1);default:throw new Error("Invalid component type.")}}function pe(a,t){switch(t.constructor){case Float32Array:return a;case Uint16Array:return Math.round(a*65535);case Uint8Array:return Math.round(a*255);case Int16Array:return Math.round(a*32767);case Int8Array:return Math.round(a*127);default:throw new Error("Invalid component type.")}}var zt=class{constructor(t=0,e=0){zt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),i=Math.sin(e),s=this.x-t.x,o=this.y-t.y;return this.x=s*n-o*i+t.x,this.y=s*i+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},ue=class{constructor(){ue.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1]}set(t,e,n,i,s,o,r,l,c){let p=this.elements;return p[0]=t,p[1]=i,p[2]=r,p[3]=e,p[4]=s,p[5]=l,p[6]=n,p[7]=o,p[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,s=this.elements,o=n[0],r=n[3],l=n[6],c=n[1],p=n[4],h=n[7],f=n[2],m=n[5],g=n[8],u=i[0],d=i[3],x=i[6],y=i[1],M=i[4],w=i[7],S=i[2],I=i[5],D=i[8];return s[0]=o*u+r*y+l*S,s[3]=o*d+r*M+l*I,s[6]=o*x+r*w+l*D,s[1]=c*u+p*y+h*S,s[4]=c*d+p*M+h*I,s[7]=c*x+p*w+h*D,s[2]=f*u+m*y+g*S,s[5]=f*d+m*M+g*I,s[8]=f*x+m*w+g*D,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],r=t[5],l=t[6],c=t[7],p=t[8];return e*o*p-e*r*c-n*s*p+n*r*l+i*s*c-i*o*l}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],r=t[5],l=t[6],c=t[7],p=t[8],h=p*o-r*c,f=r*l-p*s,m=c*s-o*l,g=e*h+n*f+i*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let u=1/g;return t[0]=h*u,t[1]=(i*c-p*n)*u,t[2]=(r*n-i*o)*u,t[3]=f*u,t[4]=(p*e-i*l)*u,t[5]=(i*s-r*e)*u,t[6]=m*u,t[7]=(n*l-c*e)*u,t[8]=(o*e-n*s)*u,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,s,o,r){let l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*r)+o+t,-i*c,i*l,-i*(-c*o+l*r)+r+e,0,0,1),this}scale(t,e){let n=this.elements;return n[0]*=t,n[3]*=t,n[6]*=t,n[1]*=e,n[4]*=e,n[7]*=e,this}rotate(t){let e=Math.cos(t),n=Math.sin(t),i=this.elements,s=i[0],o=i[3],r=i[6],l=i[1],c=i[4],p=i[7];return i[0]=e*s+n*l,i[3]=e*o+n*c,i[6]=e*r+n*p,i[1]=-n*s+e*l,i[4]=-n*o+e*c,i[7]=-n*r+e*p,this}translate(t,e){let n=this.elements;return n[0]+=t*n[2],n[3]+=t*n[5],n[6]+=t*n[8],n[1]+=e*n[2],n[4]+=e*n[5],n[7]+=e*n[8],this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};function oo(a){for(let t=a.length-1;t>=0;--t)if(a[t]>=65535)return!0;return!1}function Zi(a){return document.createElementNS("http://www.w3.org/1999/xhtml",a)}function yn(a){return a<.04045?a*.0773993808:Math.pow(a*.9478672986+.0521327014,2.4)}function Gi(a){return a<.0031308?a*12.92:1.055*Math.pow(a,.41666)-.055}var Ss={[Ge]:{[xn]:yn},[xn]:{[Ge]:Gi}},Se={legacyMode:!0,get workingColorSpace(){return xn},set workingColorSpace(a){console.warn("THREE.ColorManagement: .workingColorSpace is readonly.")},convert:function(a,t,e){if(this.legacyMode||t===e||!t||!e)return a;if(Ss[t]&&Ss[t][e]!==void 0){let n=Ss[t][e];return a.r=n(a.r),a.g=n(a.g),a.b=n(a.b),a}throw new Error("Unsupported color space conversion.")},fromWorkingColorSpace:function(a,t){return this.convert(a,this.workingColorSpace,t)},toWorkingColorSpace:function(a,t){return this.convert(a,t,this.workingColorSpace)}},lo={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},$t={r:0,g:0,b:0},Ae={h:0,s:0,l:0},Mi={h:0,s:0,l:0};function As(a,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?a+(t-a)*6*e:e<1/2?t:e<2/3?a+(t-a)*6*(2/3-e):a}function Si(a,t){return t.r=a.r,t.g=a.g,t.b=a.b,t}var Gt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,e===void 0&&n===void 0?this.set(t):this.setRGB(t,e,n)}set(t){return t&&t.isColor?this.copy(t):typeof t=="number"?this.setHex(t):typeof t=="string"&&this.setStyle(t),this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ge){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Se.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=xn){return this.r=t,this.g=e,this.b=n,Se.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=xn){if(t=Rl(t,1),e=he(e,0,1),n=he(n,0,1),e===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+e):n+e-n*e,o=2*n-s;this.r=As(o,s,t+1/3),this.g=As(o,s,t),this.b=As(o,s,t-1/3)}return Se.toWorkingColorSpace(this,i),this}setStyle(t,e=Ge){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^((?:rgb|hsl)a?)\(([^\)]*)\)/.exec(t)){let s,o=i[1],r=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(r))return this.r=Math.min(255,parseInt(s[1],10))/255,this.g=Math.min(255,parseInt(s[2],10))/255,this.b=Math.min(255,parseInt(s[3],10))/255,Se.toWorkingColorSpace(this,e),n(s[4]),this;if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(r))return this.r=Math.min(100,parseInt(s[1],10))/100,this.g=Math.min(100,parseInt(s[2],10))/100,this.b=Math.min(100,parseInt(s[3],10))/100,Se.toWorkingColorSpace(this,e),n(s[4]),this;break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(r)){let l=parseFloat(s[1])/360,c=parseFloat(s[2])/100,p=parseFloat(s[3])/100;return n(s[4]),this.setHSL(l,c,p,e)}break}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){let s=i[1],o=s.length;if(o===3)return this.r=parseInt(s.charAt(0)+s.charAt(0),16)/255,this.g=parseInt(s.charAt(1)+s.charAt(1),16)/255,this.b=parseInt(s.charAt(2)+s.charAt(2),16)/255,Se.toWorkingColorSpace(this,e),this;if(o===6)return this.r=parseInt(s.charAt(0)+s.charAt(1),16)/255,this.g=parseInt(s.charAt(2)+s.charAt(3),16)/255,this.b=parseInt(s.charAt(4)+s.charAt(5),16)/255,Se.toWorkingColorSpace(this,e),this}return t&&t.length>0?this.setColorName(t,e):this}setColorName(t,e=Ge){let n=lo[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=yn(t.r),this.g=yn(t.g),this.b=yn(t.b),this}copyLinearToSRGB(t){return this.r=Gi(t.r),this.g=Gi(t.g),this.b=Gi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ge){return Se.fromWorkingColorSpace(Si(this,$t),t),he($t.r*255,0,255)<<16^he($t.g*255,0,255)<<8^he($t.b*255,0,255)<<0}getHexString(t=Ge){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=xn){Se.fromWorkingColorSpace(Si(this,$t),e);let n=$t.r,i=$t.g,s=$t.b,o=Math.max(n,i,s),r=Math.min(n,i,s),l,c,p=(r+o)/2;if(r===o)l=0,c=0;else{let h=o-r;switch(c=p<=.5?h/(o+r):h/(2-o-r),o){case n:l=(i-s)/h+(i<s?6:0);break;case i:l=(s-n)/h+2;break;case s:l=(n-i)/h+4;break}l/=6}return t.h=l,t.s=c,t.l=p,t}getRGB(t,e=xn){return Se.fromWorkingColorSpace(Si(this,$t),e),t.r=$t.r,t.g=$t.g,t.b=$t.b,t}getStyle(t=Ge){return Se.fromWorkingColorSpace(Si(this,$t),t),t!==Ge?`color(${t} ${$t.r} ${$t.g} ${$t.b})`:`rgb(${$t.r*255|0},${$t.g*255|0},${$t.b*255|0})`}offsetHSL(t,e,n){return this.getHSL(Ae),Ae.h+=t,Ae.s+=e,Ae.l+=n,this.setHSL(Ae.h,Ae.s,Ae.l),this}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Ae),t.getHSL(Mi);let n=Ms(Ae.h,Mi.h,e),i=Ms(Ae.s,Mi.s,e),s=Ms(Ae.l,Mi.l,e);return this.setHSL(n,i,s),this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}};Gt.NAMES=lo;var In,Yi=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{In===void 0&&(In=Zi("canvas")),In.width=t.width,In.height=t.height;let n=In.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=In}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Zi("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let i=n.getImageData(0,0,t.width,t.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=yn(s[o]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(yn(e[n]/255)*255):e[n]=yn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Ji=class{constructor(t=null){this.isSource=!0,this.uuid=yi(),this.data=t,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,r=i.length;o<r;o++)i[o].isDataTexture?s.push(Ts(i[o].image)):s.push(Ts(i[o]))}else s=Ts(i);n.url=s}return e||(t.images[this.uuid]=n),n}};function Ts(a){return typeof HTMLImageElement<"u"&&a instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&a instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&a instanceof ImageBitmap?Yi.getDataURL(a):a.data?{data:Array.from(a.data),width:a.width,height:a.height,type:a.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Ll=0,de=class extends Ne{constructor(t=de.DEFAULT_IMAGE,e=de.DEFAULT_MAPPING,n=Ce,i=Ce,s=ye,o=os,r=Oe,l=bn,c=1,p=wn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ll++}),this.uuid=yi(),this.name="",this.source=new Ji(t),this.mipmaps=[],this.mapping=e,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=r,this.internalFormat=null,this.type=l,this.offset=new zt(0,0),this.repeat=new zt(1,1),this.center=new zt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ue,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.encoding=p,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.encoding=t.encoding,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.5,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,type:this.type,encoding:this.encoding,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return JSON.stringify(this.userData)!=="{}"&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==ro)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case $s:t.x=t.x-Math.floor(t.x);break;case Ce:t.x=t.x<0?0:1;break;case Ks:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case $s:t.y=t.y-Math.floor(t.y);break;case Ce:t.y=t.y<0?0:1;break;case Ks:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}};de.DEFAULT_IMAGE=null;de.DEFAULT_MAPPING=ro;var Kt=class{constructor(t=0,e=0,n=0,i=1){Kt.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,s=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*s,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,s,l=t.elements,c=l[0],p=l[4],h=l[8],f=l[1],m=l[5],g=l[9],u=l[2],d=l[6],x=l[10];if(Math.abs(p-f)<.01&&Math.abs(h-u)<.01&&Math.abs(g-d)<.01){if(Math.abs(p+f)<.1&&Math.abs(h+u)<.1&&Math.abs(g+d)<.1&&Math.abs(c+m+x-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let M=(c+1)/2,w=(m+1)/2,S=(x+1)/2,I=(p+f)/4,D=(h+u)/4,A=(g+d)/4;return M>w&&M>S?M<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(M),i=I/n,s=D/n):w>S?w<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(w),n=I/i,s=A/i):S<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(S),n=D/s,i=A/s),this.set(n,i,s,e),this}let y=Math.sqrt((d-g)*(d-g)+(h-u)*(h-u)+(f-p)*(f-p));return Math.abs(y)<.001&&(y=1),this.x=(d-g)/y,this.y=(h-u)/y,this.z=(f-p)/y,this.w=Math.acos((c+m+x-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this.w=this.w<0?Math.ceil(this.w):Math.floor(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Ye=class extends Ne{constructor(t,e,n={}){super(),this.isWebGLRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Kt(0,0,t,e),this.scissorTest=!1,this.viewport=new Kt(0,0,t,e);let i={width:t,height:e,depth:1};this.texture=new de(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.encoding),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.internalFormat=n.internalFormat!==void 0?n.internalFormat:null,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:ye,this.depthBuffer=n.depthBuffer!==void 0?n.depthBuffer:!0,this.stencilBuffer=n.stencilBuffer!==void 0?n.stencilBuffer:!1,this.depthTexture=n.depthTexture!==void 0?n.depthTexture:null,this.samples=n.samples!==void 0?n.samples:0}setSize(t,e,n=1){(this.width!==t||this.height!==e||this.depth!==n)&&(this.width=t,this.height=e,this.depth=n,this.texture.image.width=t,this.texture.image.height=e,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.viewport.copy(t.viewport),this.texture=t.texture.clone(),this.texture.isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new Ji(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},ji=class extends de{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=ae,this.minFilter=ae,this.wrapR=Ce,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var er=class extends de{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=ae,this.minFilter=ae,this.wrapR=Ce,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Re=class{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,s,o,r){let l=n[i+0],c=n[i+1],p=n[i+2],h=n[i+3],f=s[o+0],m=s[o+1],g=s[o+2],u=s[o+3];if(r===0){t[e+0]=l,t[e+1]=c,t[e+2]=p,t[e+3]=h;return}if(r===1){t[e+0]=f,t[e+1]=m,t[e+2]=g,t[e+3]=u;return}if(h!==u||l!==f||c!==m||p!==g){let d=1-r,x=l*f+c*m+p*g+h*u,y=x>=0?1:-1,M=1-x*x;if(M>Number.EPSILON){let S=Math.sqrt(M),I=Math.atan2(S,x*y);d=Math.sin(d*I)/S,r=Math.sin(r*I)/S}let w=r*y;if(l=l*d+f*w,c=c*d+m*w,p=p*d+g*w,h=h*d+u*w,d===1-r){let S=1/Math.sqrt(l*l+c*c+p*p+h*h);l*=S,c*=S,p*=S,h*=S}}t[e]=l,t[e+1]=c,t[e+2]=p,t[e+3]=h}static multiplyQuaternionsFlat(t,e,n,i,s,o){let r=n[i],l=n[i+1],c=n[i+2],p=n[i+3],h=s[o],f=s[o+1],m=s[o+2],g=s[o+3];return t[e]=r*g+p*h+l*m-c*f,t[e+1]=l*g+p*f+c*h-r*m,t[e+2]=c*g+p*m+r*f-l*h,t[e+3]=p*g-r*h-l*f-c*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e){let n=t._x,i=t._y,s=t._z,o=t._order,r=Math.cos,l=Math.sin,c=r(n/2),p=r(i/2),h=r(s/2),f=l(n/2),m=l(i/2),g=l(s/2);switch(o){case"XYZ":this._x=f*p*h+c*m*g,this._y=c*m*h-f*p*g,this._z=c*p*g+f*m*h,this._w=c*p*h-f*m*g;break;case"YXZ":this._x=f*p*h+c*m*g,this._y=c*m*h-f*p*g,this._z=c*p*g-f*m*h,this._w=c*p*h+f*m*g;break;case"ZXY":this._x=f*p*h-c*m*g,this._y=c*m*h+f*p*g,this._z=c*p*g+f*m*h,this._w=c*p*h-f*m*g;break;case"ZYX":this._x=f*p*h-c*m*g,this._y=c*m*h+f*p*g,this._z=c*p*g-f*m*h,this._w=c*p*h+f*m*g;break;case"YZX":this._x=f*p*h+c*m*g,this._y=c*m*h+f*p*g,this._z=c*p*g-f*m*h,this._w=c*p*h-f*m*g;break;case"XZY":this._x=f*p*h-c*m*g,this._y=c*m*h-f*p*g,this._z=c*p*g+f*m*h,this._w=c*p*h+f*m*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e!==!1&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],i=e[4],s=e[8],o=e[1],r=e[5],l=e[9],c=e[2],p=e[6],h=e[10],f=n+r+h;if(f>0){let m=.5/Math.sqrt(f+1);this._w=.25/m,this._x=(p-l)*m,this._y=(s-c)*m,this._z=(o-i)*m}else if(n>r&&n>h){let m=2*Math.sqrt(1+n-r-h);this._w=(p-l)/m,this._x=.25*m,this._y=(i+o)/m,this._z=(s+c)/m}else if(r>h){let m=2*Math.sqrt(1+r-n-h);this._w=(s-c)/m,this._x=(i+o)/m,this._y=.25*m,this._z=(l+p)/m}else{let m=2*Math.sqrt(1+h-n-r);this._w=(o-i)/m,this._x=(s+c)/m,this._y=(l+p)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(he(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,i=t._y,s=t._z,o=t._w,r=e._x,l=e._y,c=e._z,p=e._w;return this._x=n*p+o*r+i*c-s*l,this._y=i*p+o*l+s*r-n*c,this._z=s*p+o*c+n*l-i*r,this._w=o*p-n*r-i*l-s*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,i=this._y,s=this._z,o=this._w,r=o*t._w+n*t._x+i*t._y+s*t._z;if(r<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,r=-r):this.copy(t),r>=1)return this._w=o,this._x=n,this._y=i,this._z=s,this;let l=1-r*r;if(l<=Number.EPSILON){let m=1-e;return this._w=m*o+e*this._w,this._x=m*n+e*this._x,this._y=m*i+e*this._y,this._z=m*s+e*this._z,this.normalize(),this._onChangeCallback(),this}let c=Math.sqrt(l),p=Math.atan2(c,r),h=Math.sin((1-e)*p)/c,f=Math.sin(e*p)/c;return this._w=o*h+this._w*f,this._x=n*h+this._x*f,this._y=i*h+this._y*f,this._z=s*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=Math.random(),e=Math.sqrt(1-t),n=Math.sqrt(t),i=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(e*Math.cos(i),n*Math.sin(s),n*Math.cos(s),e*Math.sin(i))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},$=class{constructor(t=0,e=0,n=0){$.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Ma.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Ma.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*i,this.y=s[1]*e+s[4]*n+s[7]*i,this.z=s[2]*e+s[5]*n+s[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,s=t.elements,o=1/(s[3]*e+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*e+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*e+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,i=this.z,s=t.x,o=t.y,r=t.z,l=t.w,c=l*e+o*i-r*n,p=l*n+r*e-s*i,h=l*i+s*n-o*e,f=-s*e-o*n-r*i;return this.x=c*l+f*-s+p*-r-h*-o,this.y=p*l+f*-o+h*-s-c*-r,this.z=h*l+f*-r+c*-o-p*-s,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*i,this.y=s[1]*e+s[5]*n+s[9]*i,this.z=s[2]*e+s[6]*n+s[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,i=t.y,s=t.z,o=e.x,r=e.y,l=e.z;return this.x=i*l-s*r,this.y=s*o-n*l,this.z=n*r-i*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Es.copy(this).projectOnVector(t),this.sub(Es)}reflect(t){return this.sub(Es.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(he(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=(Math.random()-.5)*2,e=Math.random()*Math.PI*2,n=Math.sqrt(1-t**2);return this.x=n*Math.cos(e),this.y=n*Math.sin(e),this.z=t,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Es=new $,Ma=new Re,Mn=class{constructor(t=new $(1/0,1/0,1/0),e=new $(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){let e=1/0,n=1/0,i=1/0,s=-1/0,o=-1/0,r=-1/0;for(let l=0,c=t.length;l<c;l+=3){let p=t[l],h=t[l+1],f=t[l+2];p<e&&(e=p),h<n&&(n=h),f<i&&(i=f),p>s&&(s=p),h>o&&(o=h),f>r&&(r=f)}return this.min.set(e,n,i),this.max.set(s,o,r),this}setFromBufferAttribute(t){let e=1/0,n=1/0,i=1/0,s=-1/0,o=-1/0,r=-1/0;for(let l=0,c=t.count;l<c;l++){let p=t.getX(l),h=t.getY(l),f=t.getZ(l);p<e&&(e=p),h<n&&(n=h),f<i&&(i=f),p>s&&(s=p),h>o&&(o=h),f>r&&(r=f)}return this.min.set(e,n,i),this.max.set(s,o,r),this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=un.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0)if(e&&n.attributes!=null&&n.attributes.position!==void 0){let s=n.attributes.position;for(let o=0,r=s.count;o<r;o++)un.fromBufferAttribute(s,o).applyMatrix4(t.matrixWorld),this.expandByPoint(un)}else n.boundingBox===null&&n.computeBoundingBox(),Cs.copy(n.boundingBox),Cs.applyMatrix4(t.matrixWorld),this.union(Cs);let i=t.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,un),un.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(li),Ai.subVectors(this.max,li),Dn.subVectors(t.a,li),zn.subVectors(t.b,li),kn.subVectors(t.c,li),Qe.subVectors(zn,Dn),tn.subVectors(kn,zn),dn.subVectors(Dn,kn);let e=[0,-Qe.z,Qe.y,0,-tn.z,tn.y,0,-dn.z,dn.y,Qe.z,0,-Qe.x,tn.z,0,-tn.x,dn.z,0,-dn.x,-Qe.y,Qe.x,0,-tn.y,tn.x,0,-dn.y,dn.x,0];return!Ps(e,Dn,zn,kn,Ai)||(e=[1,0,0,0,1,0,0,0,1],!Ps(e,Dn,zn,kn,Ai))?!1:(Ti.crossVectors(Qe,tn),e=[Ti.x,Ti.y,Ti.z],Ps(e,Dn,zn,kn,Ai))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return un.copy(t).clamp(this.min,this.max).sub(t).length()}getBoundingSphere(t){return this.getCenter(t.center),t.radius=this.getSize(un).length()*.5,t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ue[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ue[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ue[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ue[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ue[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ue[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ue[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ue[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ue),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},Ue=[new $,new $,new $,new $,new $,new $,new $,new $],un=new $,Cs=new Mn,Dn=new $,zn=new $,kn=new $,Qe=new $,tn=new $,dn=new $,li=new $,Ai=new $,Ti=new $,fn=new $;function Ps(a,t,e,n,i){for(let s=0,o=a.length-3;s<=o;s+=3){fn.fromArray(a,s);let r=i.x*Math.abs(fn.x)+i.y*Math.abs(fn.y)+i.z*Math.abs(fn.z),l=t.dot(fn),c=e.dot(fn),p=n.dot(fn);if(Math.max(-Math.max(l,c,p),Math.min(l,c,p))>r)return!1}return!0}var Il=new Mn,Sa=new $,Ei=new $,Rs=new $,mi=class{constructor(t=new $,e=-1){this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Il.setFromPoints(t).getCenter(n);let i=0;for(let s=0,o=t.length;s<o;s++)i=Math.max(i,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Rs.subVectors(t,this.center);let e=Rs.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.add(Rs.multiplyScalar(i/n)),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?Ei.set(0,0,1).multiplyScalar(t.radius):Ei.subVectors(t.center,this.center).normalize().multiplyScalar(t.radius),this.expandByPoint(Sa.copy(t.center).add(Ei)),this.expandByPoint(Sa.copy(t.center).sub(Ei)),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},Be=new $,Ls=new $,Ci=new $,en=new $,Is=new $,Pi=new $,Ds=new $,nr=class{constructor(t=new $,e=new $(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.direction).multiplyScalar(t).add(this.origin)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Be)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.direction).multiplyScalar(n).add(this.origin)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Be.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Be.copy(this.direction).multiplyScalar(e).add(this.origin),Be.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){Ls.copy(t).add(e).multiplyScalar(.5),Ci.copy(e).sub(t).normalize(),en.copy(this.origin).sub(Ls);let s=t.distanceTo(e)*.5,o=-this.direction.dot(Ci),r=en.dot(this.direction),l=-en.dot(Ci),c=en.lengthSq(),p=Math.abs(1-o*o),h,f,m,g;if(p>0)if(h=o*l-r,f=o*r-l,g=s*p,h>=0)if(f>=-g)if(f<=g){let u=1/p;h*=u,f*=u,m=h*(h+o*f+2*r)+f*(o*h+f+2*l)+c}else f=s,h=Math.max(0,-(o*f+r)),m=-h*h+f*(f+2*l)+c;else f=-s,h=Math.max(0,-(o*f+r)),m=-h*h+f*(f+2*l)+c;else f<=-g?(h=Math.max(0,-(-o*s+r)),f=h>0?-s:Math.min(Math.max(-s,-l),s),m=-h*h+f*(f+2*l)+c):f<=g?(h=0,f=Math.min(Math.max(-s,-l),s),m=f*(f+2*l)+c):(h=Math.max(0,-(o*s+r)),f=h>0?s:Math.min(Math.max(-s,-l),s),m=-h*h+f*(f+2*l)+c);else f=o>0?-s:s,h=Math.max(0,-(o*f+r)),m=-h*h+f*(f+2*l)+c;return n&&n.copy(this.direction).multiplyScalar(h).add(this.origin),i&&i.copy(Ci).multiplyScalar(f).add(Ls),m}intersectSphere(t,e){Be.subVectors(t.center,this.origin);let n=Be.dot(this.direction),i=Be.dot(Be)-n*n,s=t.radius*t.radius;if(i>s)return null;let o=Math.sqrt(s-i),r=n-o,l=n+o;return r<0&&l<0?null:r<0?this.at(l,e):this.at(r,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,s,o,r,l,c=1/this.direction.x,p=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(n=(t.min.x-f.x)*c,i=(t.max.x-f.x)*c):(n=(t.max.x-f.x)*c,i=(t.min.x-f.x)*c),p>=0?(s=(t.min.y-f.y)*p,o=(t.max.y-f.y)*p):(s=(t.max.y-f.y)*p,o=(t.min.y-f.y)*p),n>o||s>i||((s>n||n!==n)&&(n=s),(o<i||i!==i)&&(i=o),h>=0?(r=(t.min.z-f.z)*h,l=(t.max.z-f.z)*h):(r=(t.max.z-f.z)*h,l=(t.min.z-f.z)*h),n>l||r>i)||((r>n||n!==n)&&(n=r),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Be)!==null}intersectTriangle(t,e,n,i,s){Is.subVectors(e,t),Pi.subVectors(n,t),Ds.crossVectors(Is,Pi);let o=this.direction.dot(Ds),r;if(o>0){if(i)return null;r=1}else if(o<0)r=-1,o=-o;else return null;en.subVectors(this.origin,t);let l=r*this.direction.dot(Pi.crossVectors(en,Pi));if(l<0)return null;let c=r*this.direction.dot(Is.cross(en));if(c<0||l+c>o)return null;let p=-r*en.dot(Ds);return p<0?null:this.at(p/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Qt=class{constructor(){Qt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}set(t,e,n,i,s,o,r,l,c,p,h,f,m,g,u,d){let x=this.elements;return x[0]=t,x[4]=e,x[8]=n,x[12]=i,x[1]=s,x[5]=o,x[9]=r,x[13]=l,x[2]=c,x[6]=p,x[10]=h,x[14]=f,x[3]=m,x[7]=g,x[11]=u,x[15]=d,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Qt().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,i=1/On.setFromMatrixColumn(t,0).length(),s=1/On.setFromMatrixColumn(t,1).length(),o=1/On.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,i=t.y,s=t.z,o=Math.cos(n),r=Math.sin(n),l=Math.cos(i),c=Math.sin(i),p=Math.cos(s),h=Math.sin(s);if(t.order==="XYZ"){let f=o*p,m=o*h,g=r*p,u=r*h;e[0]=l*p,e[4]=-l*h,e[8]=c,e[1]=m+g*c,e[5]=f-u*c,e[9]=-r*l,e[2]=u-f*c,e[6]=g+m*c,e[10]=o*l}else if(t.order==="YXZ"){let f=l*p,m=l*h,g=c*p,u=c*h;e[0]=f+u*r,e[4]=g*r-m,e[8]=o*c,e[1]=o*h,e[5]=o*p,e[9]=-r,e[2]=m*r-g,e[6]=u+f*r,e[10]=o*l}else if(t.order==="ZXY"){let f=l*p,m=l*h,g=c*p,u=c*h;e[0]=f-u*r,e[4]=-o*h,e[8]=g+m*r,e[1]=m+g*r,e[5]=o*p,e[9]=u-f*r,e[2]=-o*c,e[6]=r,e[10]=o*l}else if(t.order==="ZYX"){let f=o*p,m=o*h,g=r*p,u=r*h;e[0]=l*p,e[4]=g*c-m,e[8]=f*c+u,e[1]=l*h,e[5]=u*c+f,e[9]=m*c-g,e[2]=-c,e[6]=r*l,e[10]=o*l}else if(t.order==="YZX"){let f=o*l,m=o*c,g=r*l,u=r*c;e[0]=l*p,e[4]=u-f*h,e[8]=g*h+m,e[1]=h,e[5]=o*p,e[9]=-r*p,e[2]=-c*p,e[6]=m*h+g,e[10]=f-u*h}else if(t.order==="XZY"){let f=o*l,m=o*c,g=r*l,u=r*c;e[0]=l*p,e[4]=-h,e[8]=c*p,e[1]=f*h+u,e[5]=o*p,e[9]=m*h-g,e[2]=g*h-m,e[6]=r*p,e[10]=u*h+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Dl,t,zl)}lookAt(t,e,n){let i=this.elements;return me.subVectors(t,e),me.lengthSq()===0&&(me.z=1),me.normalize(),nn.crossVectors(n,me),nn.lengthSq()===0&&(Math.abs(n.z)===1?me.x+=1e-4:me.z+=1e-4,me.normalize(),nn.crossVectors(n,me)),nn.normalize(),Ri.crossVectors(me,nn),i[0]=nn.x,i[4]=Ri.x,i[8]=me.x,i[1]=nn.y,i[5]=Ri.y,i[9]=me.y,i[2]=nn.z,i[6]=Ri.z,i[10]=me.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,s=this.elements,o=n[0],r=n[4],l=n[8],c=n[12],p=n[1],h=n[5],f=n[9],m=n[13],g=n[2],u=n[6],d=n[10],x=n[14],y=n[3],M=n[7],w=n[11],S=n[15],I=i[0],D=i[4],A=i[8],k=i[12],T=i[1],F=i[5],v=i[9],O=i[13],B=i[2],U=i[6],nt=i[10],G=i[14],J=i[3],C=i[7],P=i[11],it=i[15];return s[0]=o*I+r*T+l*B+c*J,s[4]=o*D+r*F+l*U+c*C,s[8]=o*A+r*v+l*nt+c*P,s[12]=o*k+r*O+l*G+c*it,s[1]=p*I+h*T+f*B+m*J,s[5]=p*D+h*F+f*U+m*C,s[9]=p*A+h*v+f*nt+m*P,s[13]=p*k+h*O+f*G+m*it,s[2]=g*I+u*T+d*B+x*J,s[6]=g*D+u*F+d*U+x*C,s[10]=g*A+u*v+d*nt+x*P,s[14]=g*k+u*O+d*G+x*it,s[3]=y*I+M*T+w*B+S*J,s[7]=y*D+M*F+w*U+S*C,s[11]=y*A+M*v+w*nt+S*P,s[15]=y*k+M*O+w*G+S*it,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],i=t[8],s=t[12],o=t[1],r=t[5],l=t[9],c=t[13],p=t[2],h=t[6],f=t[10],m=t[14],g=t[3],u=t[7],d=t[11],x=t[15];return g*(+s*l*h-i*c*h-s*r*f+n*c*f+i*r*m-n*l*m)+u*(+e*l*m-e*c*f+s*o*f-i*o*m+i*c*p-s*l*p)+d*(+e*c*h-e*r*m-s*o*h+n*o*m+s*r*p-n*c*p)+x*(-i*r*p-e*l*h+e*r*f+i*o*h-n*o*f+n*l*p)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],r=t[5],l=t[6],c=t[7],p=t[8],h=t[9],f=t[10],m=t[11],g=t[12],u=t[13],d=t[14],x=t[15],y=h*d*c-u*f*c+u*l*m-r*d*m-h*l*x+r*f*x,M=g*f*c-p*d*c-g*l*m+o*d*m+p*l*x-o*f*x,w=p*u*c-g*h*c+g*r*m-o*u*m-p*r*x+o*h*x,S=g*h*l-p*u*l-g*r*f+o*u*f+p*r*d-o*h*d,I=e*y+n*M+i*w+s*S;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let D=1/I;return t[0]=y*D,t[1]=(u*f*s-h*d*s-u*i*m+n*d*m+h*i*x-n*f*x)*D,t[2]=(r*d*s-u*l*s+u*i*c-n*d*c-r*i*x+n*l*x)*D,t[3]=(h*l*s-r*f*s-h*i*c+n*f*c+r*i*m-n*l*m)*D,t[4]=M*D,t[5]=(p*d*s-g*f*s+g*i*m-e*d*m-p*i*x+e*f*x)*D,t[6]=(g*l*s-o*d*s-g*i*c+e*d*c+o*i*x-e*l*x)*D,t[7]=(o*f*s-p*l*s+p*i*c-e*f*c-o*i*m+e*l*m)*D,t[8]=w*D,t[9]=(g*h*s-p*u*s-g*n*m+e*u*m+p*n*x-e*h*x)*D,t[10]=(o*u*s-g*r*s+g*n*c-e*u*c-o*n*x+e*r*x)*D,t[11]=(p*r*s-o*h*s-p*n*c+e*h*c+o*n*m-e*r*m)*D,t[12]=S*D,t[13]=(p*u*i-g*h*i+g*n*f-e*u*f-p*n*d+e*h*d)*D,t[14]=(g*r*i-o*u*i-g*n*l+e*u*l+o*n*d-e*r*d)*D,t[15]=(o*h*i-p*r*i+p*n*l-e*h*l-o*n*f+e*r*f)*D,this}scale(t){let e=this.elements,n=t.x,i=t.y,s=t.z;return e[0]*=n,e[4]*=i,e[8]*=s,e[1]*=n,e[5]*=i,e[9]*=s,e[2]*=n,e[6]*=i,e[10]*=s,e[3]*=n,e[7]*=i,e[11]*=s,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),i=Math.sin(e),s=1-n,o=t.x,r=t.y,l=t.z,c=s*o,p=s*r;return this.set(c*o+n,c*r-i*l,c*l+i*r,0,c*r+i*l,p*r+n,p*l-i*o,0,c*l-i*r,p*l+i*o,s*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,s,o){return this.set(1,n,s,0,t,1,o,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){let i=this.elements,s=e._x,o=e._y,r=e._z,l=e._w,c=s+s,p=o+o,h=r+r,f=s*c,m=s*p,g=s*h,u=o*p,d=o*h,x=r*h,y=l*c,M=l*p,w=l*h,S=n.x,I=n.y,D=n.z;return i[0]=(1-(u+x))*S,i[1]=(m+w)*S,i[2]=(g-M)*S,i[3]=0,i[4]=(m-w)*I,i[5]=(1-(f+x))*I,i[6]=(d+y)*I,i[7]=0,i[8]=(g+M)*D,i[9]=(d-y)*D,i[10]=(1-(f+u))*D,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){let i=this.elements,s=On.set(i[0],i[1],i[2]).length(),o=On.set(i[4],i[5],i[6]).length(),r=On.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),t.x=i[12],t.y=i[13],t.z=i[14],Te.copy(this);let c=1/s,p=1/o,h=1/r;return Te.elements[0]*=c,Te.elements[1]*=c,Te.elements[2]*=c,Te.elements[4]*=p,Te.elements[5]*=p,Te.elements[6]*=p,Te.elements[8]*=h,Te.elements[9]*=h,Te.elements[10]*=h,e.setFromRotationMatrix(Te),n.x=s,n.y=o,n.z=r,this}makePerspective(t,e,n,i,s,o){let r=this.elements,l=2*s/(e-t),c=2*s/(n-i),p=(e+t)/(e-t),h=(n+i)/(n-i),f=-(o+s)/(o-s),m=-2*o*s/(o-s);return r[0]=l,r[4]=0,r[8]=p,r[12]=0,r[1]=0,r[5]=c,r[9]=h,r[13]=0,r[2]=0,r[6]=0,r[10]=f,r[14]=m,r[3]=0,r[7]=0,r[11]=-1,r[15]=0,this}makeOrthographic(t,e,n,i,s,o){let r=this.elements,l=1/(e-t),c=1/(n-i),p=1/(o-s),h=(e+t)*l,f=(n+i)*c,m=(o+s)*p;return r[0]=2*l,r[4]=0,r[8]=0,r[12]=-h,r[1]=0,r[5]=2*c,r[9]=0,r[13]=-f,r[2]=0,r[6]=0,r[10]=-2*p,r[14]=-m,r[3]=0,r[7]=0,r[11]=0,r[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},On=new $,Te=new Qt,Dl=new $(0,0,0),zl=new $(1,1,1),nn=new $,Ri=new $,me=new $,Aa=new Qt,Ta=new Re,Sn=class{constructor(t=0,e=0,n=0,i=Sn.DefaultOrder){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let i=t.elements,s=i[0],o=i[4],r=i[8],l=i[1],c=i[5],p=i[9],h=i[2],f=i[6],m=i[10];switch(e){case"XYZ":this._y=Math.asin(he(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(-p,m),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-he(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(r,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(he(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,m),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-he(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,m),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(he(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-p,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(r,m));break;case"XZY":this._z=Math.asin(-he(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(r,s)):(this._x=Math.atan2(-p,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Aa.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Aa,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Ta.setFromEuler(this),this.setFromQuaternion(Ta,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}toVector3(){console.error("THREE.Euler: .toVector3() has been removed. Use Vector3.setFromEuler() instead")}};Sn.DefaultOrder="XYZ";Sn.RotationOrders=["XYZ","YZX","ZXY","XZY","YXZ","ZYX"];var $i=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},kl=0,Ea=new $,Nn=new Re,Ve=new Qt,Li=new $,ci=new $,Ol=new $,Nl=new Re,Ca=new $(1,0,0),Pa=new $(0,1,0),Ra=new $(0,0,1),Fl={type:"added"},La={type:"removed"},ce=class extends Ne{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:kl++}),this.uuid=yi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ce.DefaultUp.clone();let t=new $,e=new Sn,n=new Re,i=new $(1,1,1);function s(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Qt},normalMatrix:{value:new ue}}),this.matrix=new Qt,this.matrixWorld=new Qt,this.matrixAutoUpdate=ce.DefaultMatrixAutoUpdate,this.matrixWorldNeedsUpdate=!1,this.matrixWorldAutoUpdate=ce.DefaultMatrixWorldAutoUpdate,this.layers=new $i,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Nn.setFromAxisAngle(t,e),this.quaternion.multiply(Nn),this}rotateOnWorldAxis(t,e){return Nn.setFromAxisAngle(t,e),this.quaternion.premultiply(Nn),this}rotateX(t){return this.rotateOnAxis(Ca,t)}rotateY(t){return this.rotateOnAxis(Pa,t)}rotateZ(t){return this.rotateOnAxis(Ra,t)}translateOnAxis(t,e){return Ea.copy(t).applyQuaternion(this.quaternion),this.position.add(Ea.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Ca,t)}translateY(t){return this.translateOnAxis(Pa,t)}translateZ(t){return this.translateOnAxis(Ra,t)}localToWorld(t){return t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return t.applyMatrix4(Ve.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Li.copy(t):Li.set(t,e,n);let i=this.parent;this.updateWorldMatrix(!0,!1),ci.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ve.lookAt(ci,Li,this.up):Ve.lookAt(Li,ci,this.up),this.quaternion.setFromRotationMatrix(Ve),i&&(Ve.extractRotation(i.matrixWorld),Nn.setFromRotationMatrix(Ve),this.quaternion.premultiply(Nn.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.parent!==null&&t.parent.remove(t),t.parent=this,this.children.push(t),t.dispatchEvent(Fl)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(La)),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){for(let t=0;t<this.children.length;t++){let e=this.children[t];e.parent=null,e.dispatchEvent(La)}return this.children.length=0,this}attach(t){return this.updateWorldMatrix(!0,!1),Ve.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Ve.multiply(t.parent.matrixWorld)),t.applyMatrix4(Ve),this.add(t),t.updateWorldMatrix(!1,!0),this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ci,t,Ol),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ci,Nl,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,i=e.length;n<i;n++){let s=e[n];(s.matrixWorldAutoUpdate===!0||t===!0)&&s.updateMatrixWorld(t)}}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){let i=this.children;for(let s=0,o=i.length;s<o;s++){let r=i[s];r.matrixWorldAutoUpdate===!0&&r.updateWorldMatrix(!1,!0)}}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.5,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),JSON.stringify(this.userData)!=="{}"&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON()));function s(r,l){return r[l.uuid]===void 0&&(r[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(t.geometries,this.geometry);let r=this.geometry.parameters;if(r!==void 0&&r.shapes!==void 0){let l=r.shapes;if(Array.isArray(l))for(let c=0,p=l.length;c<p;c++){let h=l[c];s(t.shapes,h)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let r=[];for(let l=0,c=this.material.length;l<c;l++)r.push(s(t.materials,this.material[l]));i.material=r}else i.material=s(t.materials,this.material);if(this.children.length>0){i.children=[];for(let r=0;r<this.children.length;r++)i.children.push(this.children[r].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let r=0;r<this.animations.length;r++){let l=this.animations[r];i.animations.push(s(t.animations,l))}}if(e){let r=o(t.geometries),l=o(t.materials),c=o(t.textures),p=o(t.images),h=o(t.shapes),f=o(t.skeletons),m=o(t.animations),g=o(t.nodes);r.length>0&&(n.geometries=r),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),p.length>0&&(n.images=p),h.length>0&&(n.shapes=h),f.length>0&&(n.skeletons=f),m.length>0&&(n.animations=m),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(r){let l=[];for(let c in r){let p=r[c];delete p.metadata,l.push(p)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let i=t.children[n];this.add(i.clone())}return this}};ce.DefaultUp=new $(0,1,0);ce.DefaultMatrixAutoUpdate=!0;ce.DefaultMatrixWorldAutoUpdate=!0;var Ee=new $,We=new $,zs=new $,He=new $,Fn=new $,Un=new $,Ia=new $,ks=new $,Os=new $,Ns=new $,Pe=class{constructor(t=new $,e=new $,n=new $){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),Ee.subVectors(t,e),i.cross(Ee);let s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(t,e,n,i,s){Ee.subVectors(i,e),We.subVectors(n,e),zs.subVectors(t,e);let o=Ee.dot(Ee),r=Ee.dot(We),l=Ee.dot(zs),c=We.dot(We),p=We.dot(zs),h=o*c-r*r;if(h===0)return s.set(-2,-1,-1);let f=1/h,m=(c*l-r*p)*f,g=(o*p-r*l)*f;return s.set(1-m-g,g,m)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,He),He.x>=0&&He.y>=0&&He.x+He.y<=1}static getUV(t,e,n,i,s,o,r,l){return this.getBarycoord(t,e,n,i,He),l.set(0,0),l.addScaledVector(s,He.x),l.addScaledVector(o,He.y),l.addScaledVector(r,He.z),l}static isFrontFacing(t,e,n,i){return Ee.subVectors(n,e),We.subVectors(t,e),Ee.cross(We).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Ee.subVectors(this.c,this.b),We.subVectors(this.a,this.b),Ee.cross(We).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Pe.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Pe.getBarycoord(t,this.a,this.b,this.c,e)}getUV(t,e,n,i,s){return Pe.getUV(t,this.a,this.b,this.c,e,n,i,s)}containsPoint(t){return Pe.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Pe.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,i=this.b,s=this.c,o,r;Fn.subVectors(i,n),Un.subVectors(s,n),ks.subVectors(t,n);let l=Fn.dot(ks),c=Un.dot(ks);if(l<=0&&c<=0)return e.copy(n);Os.subVectors(t,i);let p=Fn.dot(Os),h=Un.dot(Os);if(p>=0&&h<=p)return e.copy(i);let f=l*h-p*c;if(f<=0&&l>=0&&p<=0)return o=l/(l-p),e.copy(n).addScaledVector(Fn,o);Ns.subVectors(t,s);let m=Fn.dot(Ns),g=Un.dot(Ns);if(g>=0&&m<=g)return e.copy(s);let u=m*c-l*g;if(u<=0&&c>=0&&g<=0)return r=c/(c-g),e.copy(n).addScaledVector(Un,r);let d=p*g-m*h;if(d<=0&&h-p>=0&&m-g>=0)return Ia.subVectors(s,i),r=(h-p)/(h-p+(m-g)),e.copy(i).addScaledVector(Ia,r);let x=1/(d+u+f);return o=u*x,r=f*x,e.copy(n).addScaledVector(Fn,o).addScaledVector(Un,r)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Ul=0,ni=class extends Ne{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ul++}),this.uuid=yi(),this.name="",this.type="Material",this.blending=Jn,this.side=Kn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.blendSrc=no,this.blendDst=io,this.blendEquation=qn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.depthFunc=Ys,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Pl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=bs,this.stencilZFail=bs,this.stencilZPass=bs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn("THREE.Material: '"+e+"' parameter is undefined.");continue}let i=this[e];if(i===void 0){console.warn("THREE."+this.type+": '"+e+"' is not a property of this material.");continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.5,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Jn&&(n.blending=this.blending),this.side!==Kn&&(n.side=this.side),this.vertexColors&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=this.transparent),n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.stencilWrite=this.stencilWrite,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaToCoverage===!0&&(n.alphaToCoverage=this.alphaToCoverage),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=this.premultipliedAlpha),this.wireframe===!0&&(n.wireframe=this.wireframe),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=this.flatShading),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),JSON.stringify(this.userData)!=="{}"&&(n.userData=this.userData);function i(s){let o=[];for(let r in s){let l=s[r];delete l.metadata,o.push(l)}return o}if(e){let s=i(t.textures),o=i(t.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let i=e.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},Ki=class extends ni{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Gt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=so,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},jt=new $,Ii=new zt,Me=class{constructor(t,e,n){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n===!0,this.usage=va,this.updateRange={offset:0,count:-1},this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Ii.fromBufferAttribute(this,e),Ii.applyMatrix3(t),this.setXY(e,Ii.x,Ii.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)jt.fromBufferAttribute(this,e),jt.applyMatrix3(t),this.setXYZ(e,jt.x,jt.y,jt.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)jt.fromBufferAttribute(this,e),jt.applyMatrix4(t),this.setXYZ(e,jt.x,jt.y,jt.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)jt.fromBufferAttribute(this,e),jt.applyNormalMatrix(t),this.setXYZ(e,jt.x,jt.y,jt.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)jt.fromBufferAttribute(this,e),jt.transformDirection(t),this.setXYZ(e,jt.x,jt.y,jt.z);return this}set(t,e=0){return this.array.set(t,e),this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=wi(e,this.array)),e}setX(t,e){return this.normalized&&(e=pe(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=wi(e,this.array)),e}setY(t,e){return this.normalized&&(e=pe(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=wi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=pe(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=wi(e,this.array)),e}setW(t,e){return this.normalized&&(e=pe(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=pe(e,this.array),n=pe(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=pe(e,this.array),n=pe(n,this.array),i=pe(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t*=this.itemSize,this.normalized&&(e=pe(e,this.array),n=pe(n,this.array),i=pe(i,this.array),s=pe(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==va&&(t.usage=this.usage),(this.updateRange.offset!==0||this.updateRange.count!==-1)&&(t.updateRange=this.updateRange),t}copyColorsArray(){console.error("THREE.BufferAttribute: copyColorsArray() was removed in r144.")}copyVector2sArray(){console.error("THREE.BufferAttribute: copyVector2sArray() was removed in r144.")}copyVector3sArray(){console.error("THREE.BufferAttribute: copyVector3sArray() was removed in r144.")}copyVector4sArray(){console.error("THREE.BufferAttribute: copyVector4sArray() was removed in r144.")}};var Qi=class extends Me{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var ts=class extends Me{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var Ze=class extends Me{constructor(t,e,n){super(new Float32Array(t),e,n)}};var Bl=0,ve=new Qt,Fs=new ce,Bn=new $,ge=new Mn,hi=new Mn,ne=new $,Je=class extends Ne{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Bl++}),this.uuid=yi(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(oo(t)?ts:Qi)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new ue().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return ve.makeRotationFromQuaternion(t),this.applyMatrix4(ve),this}rotateX(t){return ve.makeRotationX(t),this.applyMatrix4(ve),this}rotateY(t){return ve.makeRotationY(t),this.applyMatrix4(ve),this}rotateZ(t){return ve.makeRotationZ(t),this.applyMatrix4(ve),this}translate(t,e,n){return ve.makeTranslation(t,e,n),this.applyMatrix4(ve),this}scale(t,e,n){return ve.makeScale(t,e,n),this.applyMatrix4(ve),this}lookAt(t){return Fs.lookAt(t),Fs.updateMatrix(),this.applyMatrix4(Fs.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Bn).negate(),this.translate(Bn.x,Bn.y,Bn.z),this}setFromPoints(t){let e=[];for(let n=0,i=t.length;n<i;n++){let s=t[n];e.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new Ze(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Mn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new $(-1/0,-1/0,-1/0),new $(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){let s=e[n];ge.setFromBufferAttribute(s),this.morphTargetsRelative?(ne.addVectors(this.boundingBox.min,ge.min),this.boundingBox.expandByPoint(ne),ne.addVectors(this.boundingBox.max,ge.max),this.boundingBox.expandByPoint(ne)):(this.boundingBox.expandByPoint(ge.min),this.boundingBox.expandByPoint(ge.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new mi);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new $,1/0);return}if(t){let n=this.boundingSphere.center;if(ge.setFromBufferAttribute(t),e)for(let s=0,o=e.length;s<o;s++){let r=e[s];hi.setFromBufferAttribute(r),this.morphTargetsRelative?(ne.addVectors(ge.min,hi.min),ge.expandByPoint(ne),ne.addVectors(ge.max,hi.max),ge.expandByPoint(ne)):(ge.expandByPoint(hi.min),ge.expandByPoint(hi.max))}ge.getCenter(n);let i=0;for(let s=0,o=t.count;s<o;s++)ne.fromBufferAttribute(t,s),i=Math.max(i,n.distanceToSquared(ne));if(e)for(let s=0,o=e.length;s<o;s++){let r=e[s],l=this.morphTargetsRelative;for(let c=0,p=r.count;c<p;c++)ne.fromBufferAttribute(r,c),l&&(Bn.fromBufferAttribute(t,c),ne.add(Bn)),i=Math.max(i,n.distanceToSquared(ne))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.array,i=e.position.array,s=e.normal.array,o=e.uv.array,r=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Me(new Float32Array(4*r),4));let l=this.getAttribute("tangent").array,c=[],p=[];for(let T=0;T<r;T++)c[T]=new $,p[T]=new $;let h=new $,f=new $,m=new $,g=new zt,u=new zt,d=new zt,x=new $,y=new $;function M(T,F,v){h.fromArray(i,T*3),f.fromArray(i,F*3),m.fromArray(i,v*3),g.fromArray(o,T*2),u.fromArray(o,F*2),d.fromArray(o,v*2),f.sub(h),m.sub(h),u.sub(g),d.sub(g);let O=1/(u.x*d.y-d.x*u.y);!isFinite(O)||(x.copy(f).multiplyScalar(d.y).addScaledVector(m,-u.y).multiplyScalar(O),y.copy(m).multiplyScalar(u.x).addScaledVector(f,-d.x).multiplyScalar(O),c[T].add(x),c[F].add(x),c[v].add(x),p[T].add(y),p[F].add(y),p[v].add(y))}let w=this.groups;w.length===0&&(w=[{start:0,count:n.length}]);for(let T=0,F=w.length;T<F;++T){let v=w[T],O=v.start,B=v.count;for(let U=O,nt=O+B;U<nt;U+=3)M(n[U+0],n[U+1],n[U+2])}let S=new $,I=new $,D=new $,A=new $;function k(T){D.fromArray(s,T*3),A.copy(D);let F=c[T];S.copy(F),S.sub(D.multiplyScalar(D.dot(F))).normalize(),I.crossVectors(A,F);let O=I.dot(p[T])<0?-1:1;l[T*4]=S.x,l[T*4+1]=S.y,l[T*4+2]=S.z,l[T*4+3]=O}for(let T=0,F=w.length;T<F;++T){let v=w[T],O=v.start,B=v.count;for(let U=O,nt=O+B;U<nt;U+=3)k(n[U+0]),k(n[U+1]),k(n[U+2])}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Me(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,m=n.count;f<m;f++)n.setXYZ(f,0,0,0);let i=new $,s=new $,o=new $,r=new $,l=new $,c=new $,p=new $,h=new $;if(t)for(let f=0,m=t.count;f<m;f+=3){let g=t.getX(f+0),u=t.getX(f+1),d=t.getX(f+2);i.fromBufferAttribute(e,g),s.fromBufferAttribute(e,u),o.fromBufferAttribute(e,d),p.subVectors(o,s),h.subVectors(i,s),p.cross(h),r.fromBufferAttribute(n,g),l.fromBufferAttribute(n,u),c.fromBufferAttribute(n,d),r.add(p),l.add(p),c.add(p),n.setXYZ(g,r.x,r.y,r.z),n.setXYZ(u,l.x,l.y,l.z),n.setXYZ(d,c.x,c.y,c.z)}else for(let f=0,m=e.count;f<m;f+=3)i.fromBufferAttribute(e,f+0),s.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),p.subVectors(o,s),h.subVectors(i,s),p.cross(h),n.setXYZ(f+0,p.x,p.y,p.z),n.setXYZ(f+1,p.x,p.y,p.z),n.setXYZ(f+2,p.x,p.y,p.z);this.normalizeNormals(),n.needsUpdate=!0}}merge(){return console.error("THREE.BufferGeometry.merge() has been removed. Use THREE.BufferGeometryUtils.mergeBufferGeometries() instead."),this}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)ne.fromBufferAttribute(t,e),ne.normalize(),t.setXYZ(e,ne.x,ne.y,ne.z)}toNonIndexed(){function t(r,l){let c=r.array,p=r.itemSize,h=r.normalized,f=new c.constructor(l.length*p),m=0,g=0;for(let u=0,d=l.length;u<d;u++){r.isInterleavedBufferAttribute?m=l[u]*r.data.stride+r.offset:m=l[u]*p;for(let x=0;x<p;x++)f[g++]=c[m++]}return new Me(f,p,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new Je,n=this.index.array,i=this.attributes;for(let r in i){let l=i[r],c=t(l,n);e.setAttribute(r,c)}let s=this.morphAttributes;for(let r in s){let l=[],c=s[r];for(let p=0,h=c.length;p<h;p++){let f=c[p],m=t(f,n);l.push(m)}e.morphAttributes[r]=l}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let r=0,l=o.length;r<l;r++){let c=o[r];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.5,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let i={},s=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],p=[];for(let h=0,f=c.length;h<f;h++){let m=c[h];p.push(m.toJSON(t.data))}p.length>0&&(i[l]=p,s=!0)}s&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let r=this.boundingSphere;return r!==null&&(t.data.boundingSphere={center:r.center.toArray(),radius:r.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone(e));let i=t.attributes;for(let c in i){let p=i[c];this.setAttribute(c,p.clone(e))}let s=t.morphAttributes;for(let c in s){let p=[],h=s[c];for(let f=0,m=h.length;f<m;f++)p.push(h[f].clone(e));this.morphAttributes[c]=p}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let c=0,p=o.length;c<p;c++){let h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}let r=t.boundingBox;r!==null&&(this.boundingBox=r.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,t.parameters!==void 0&&(this.parameters=Object.assign({},t.parameters)),this}dispose(){this.dispatchEvent({type:"dispose"})}},Da=new Qt,Vn=new nr,Us=new mi,sn=new $,rn=new $,an=new $,Bs=new $,Vs=new $,Ws=new $,Di=new $,zi=new $,ki=new $,Oi=new zt,Ni=new zt,Fi=new zt,Hs=new $,Ui=new $,be=class extends ce{constructor(t=new Je,e=new Ki){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){let r=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[r]=s}}}}raycast(t,e){let n=this.geometry,i=this.material,s=this.matrixWorld;if(i===void 0||(n.boundingSphere===null&&n.computeBoundingSphere(),Us.copy(n.boundingSphere),Us.applyMatrix4(s),t.ray.intersectsSphere(Us)===!1)||(Da.copy(s).invert(),Vn.copy(t.ray).applyMatrix4(Da),n.boundingBox!==null&&Vn.intersectsBox(n.boundingBox)===!1))return;let o,r=n.index,l=n.attributes.position,c=n.morphAttributes.position,p=n.morphTargetsRelative,h=n.attributes.uv,f=n.attributes.uv2,m=n.groups,g=n.drawRange;if(r!==null)if(Array.isArray(i))for(let u=0,d=m.length;u<d;u++){let x=m[u],y=i[x.materialIndex],M=Math.max(x.start,g.start),w=Math.min(r.count,Math.min(x.start+x.count,g.start+g.count));for(let S=M,I=w;S<I;S+=3){let D=r.getX(S),A=r.getX(S+1),k=r.getX(S+2);o=Bi(this,y,t,Vn,l,c,p,h,f,D,A,k),o&&(o.faceIndex=Math.floor(S/3),o.face.materialIndex=x.materialIndex,e.push(o))}}else{let u=Math.max(0,g.start),d=Math.min(r.count,g.start+g.count);for(let x=u,y=d;x<y;x+=3){let M=r.getX(x),w=r.getX(x+1),S=r.getX(x+2);o=Bi(this,i,t,Vn,l,c,p,h,f,M,w,S),o&&(o.faceIndex=Math.floor(x/3),e.push(o))}}else if(l!==void 0)if(Array.isArray(i))for(let u=0,d=m.length;u<d;u++){let x=m[u],y=i[x.materialIndex],M=Math.max(x.start,g.start),w=Math.min(l.count,Math.min(x.start+x.count,g.start+g.count));for(let S=M,I=w;S<I;S+=3){let D=S,A=S+1,k=S+2;o=Bi(this,y,t,Vn,l,c,p,h,f,D,A,k),o&&(o.faceIndex=Math.floor(S/3),o.face.materialIndex=x.materialIndex,e.push(o))}}else{let u=Math.max(0,g.start),d=Math.min(l.count,g.start+g.count);for(let x=u,y=d;x<y;x+=3){let M=x,w=x+1,S=x+2;o=Bi(this,i,t,Vn,l,c,p,h,f,M,w,S),o&&(o.faceIndex=Math.floor(x/3),e.push(o))}}}};function Vl(a,t,e,n,i,s,o,r){let l;if(t.side===we?l=n.intersectTriangle(o,s,i,!0,r):l=n.intersectTriangle(i,s,o,t.side!==ke,r),l===null)return null;Ui.copy(r),Ui.applyMatrix4(a.matrixWorld);let c=e.ray.origin.distanceTo(Ui);return c<e.near||c>e.far?null:{distance:c,point:Ui.clone(),object:a}}function Bi(a,t,e,n,i,s,o,r,l,c,p,h){sn.fromBufferAttribute(i,c),rn.fromBufferAttribute(i,p),an.fromBufferAttribute(i,h);let f=a.morphTargetInfluences;if(s&&f){Di.set(0,0,0),zi.set(0,0,0),ki.set(0,0,0);for(let g=0,u=s.length;g<u;g++){let d=f[g],x=s[g];d!==0&&(Bs.fromBufferAttribute(x,c),Vs.fromBufferAttribute(x,p),Ws.fromBufferAttribute(x,h),o?(Di.addScaledVector(Bs,d),zi.addScaledVector(Vs,d),ki.addScaledVector(Ws,d)):(Di.addScaledVector(Bs.sub(sn),d),zi.addScaledVector(Vs.sub(rn),d),ki.addScaledVector(Ws.sub(an),d)))}sn.add(Di),rn.add(zi),an.add(ki)}a.isSkinnedMesh&&(a.boneTransform(c,sn),a.boneTransform(p,rn),a.boneTransform(h,an));let m=Vl(a,t,e,n,sn,rn,an,Hs);if(m){r&&(Oi.fromBufferAttribute(r,c),Ni.fromBufferAttribute(r,p),Fi.fromBufferAttribute(r,h),m.uv=Pe.getUV(Hs,sn,rn,an,Oi,Ni,Fi,new zt)),l&&(Oi.fromBufferAttribute(l,c),Ni.fromBufferAttribute(l,p),Fi.fromBufferAttribute(l,h),m.uv2=Pe.getUV(Hs,sn,rn,an,Oi,Ni,Fi,new zt));let g={a:c,b:p,c:h,normal:new $,materialIndex:0};Pe.getNormal(sn,rn,an,g.normal),m.face=g}return m}var je=class extends Je{constructor(t=1,e=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};let r=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);let l=[],c=[],p=[],h=[],f=0,m=0;g("z","y","x",-1,-1,n,e,t,o,s,0),g("z","y","x",1,-1,n,e,-t,o,s,1),g("x","z","y",1,1,t,n,e,i,o,2),g("x","z","y",1,-1,t,n,-e,i,o,3),g("x","y","z",1,-1,t,e,n,i,s,4),g("x","y","z",-1,-1,t,e,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new Ze(c,3)),this.setAttribute("normal",new Ze(p,3)),this.setAttribute("uv",new Ze(h,2));function g(u,d,x,y,M,w,S,I,D,A,k){let T=w/D,F=S/A,v=w/2,O=S/2,B=I/2,U=D+1,nt=A+1,G=0,J=0,C=new $;for(let P=0;P<nt;P++){let it=P*F-O;for(let Z=0;Z<U;Z++){let K=Z*T-v;C[u]=K*y,C[d]=it*M,C[x]=B,c.push(C.x,C.y,C.z),C[u]=0,C[d]=0,C[x]=I>0?1:-1,p.push(C.x,C.y,C.z),h.push(Z/D),h.push(1-P/A),G+=1}}for(let P=0;P<A;P++)for(let it=0;it<D;it++){let Z=f+it+U*P,K=f+it+U*(P+1),ft=f+(it+1)+U*(P+1),At=f+(it+1)+U*P;l.push(Z,K,At),l.push(K,ft,At),J+=6}r.addGroup(m,J,k),m+=J,f+=G}}static fromJSON(t){return new je(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function ii(a){let t={};for(let e in a){t[e]={};for(let n in a[e]){let i=a[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function re(a){let t={};for(let e=0;e<a.length;e++){let n=ii(a[e]);for(let i in n)t[i]=n[i]}return t}function Wl(a){let t=[];for(let e=0;e<a.length;e++)t.push(a[e].clone());return t}var Hl={clone:ii,merge:re},Gl=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Xl=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Le=class extends ni{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Gl,this.fragmentShader=Xl,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv2:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ii(t.uniforms),this.uniformsGroups=Wl(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let i in this.uniforms){let o=this.uniforms[i].value;o&&o.isTexture?e.uniforms[i]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[i]={type:"m4",value:o.toArray()}:e.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},es=class extends ce{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Qt,this.projectionMatrix=new Qt,this.projectionMatrixInverse=new Qt}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(-e[8],-e[9],-e[10]).normalize()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},le=class extends es{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=ba*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(ws*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ba*2*Math.atan(Math.tan(ws*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(t,e,n,i,s,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(ws*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,s=-.5*i,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*i/l,e-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}let r=this.filmOffset;r!==0&&(s+=t*r/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,e,e-n,t,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},Wn=90,Hn=1,ir=class extends ce{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n;let i=new le(Wn,Hn,t,e);i.layers=this.layers,i.up.set(0,-1,0),i.lookAt(new $(1,0,0)),this.add(i);let s=new le(Wn,Hn,t,e);s.layers=this.layers,s.up.set(0,-1,0),s.lookAt(new $(-1,0,0)),this.add(s);let o=new le(Wn,Hn,t,e);o.layers=this.layers,o.up.set(0,0,1),o.lookAt(new $(0,1,0)),this.add(o);let r=new le(Wn,Hn,t,e);r.layers=this.layers,r.up.set(0,0,-1),r.lookAt(new $(0,-1,0)),this.add(r);let l=new le(Wn,Hn,t,e);l.layers=this.layers,l.up.set(0,-1,0),l.lookAt(new $(0,0,1)),this.add(l);let c=new le(Wn,Hn,t,e);c.layers=this.layers,c.up.set(0,-1,0),c.lookAt(new $(0,0,-1)),this.add(c)}update(t,e){this.parent===null&&this.updateMatrixWorld();let n=this.renderTarget,[i,s,o,r,l,c]=this.children,p=t.getRenderTarget(),h=t.toneMapping,f=t.xr.enabled;t.toneMapping=qe,t.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0),t.render(e,i),t.setRenderTarget(n,1),t.render(e,s),t.setRenderTarget(n,2),t.render(e,o),t.setRenderTarget(n,3),t.render(e,r),t.setRenderTarget(n,4),t.render(e,l),n.texture.generateMipmaps=m,t.setRenderTarget(n,5),t.render(e,c),t.setRenderTarget(p),t.toneMapping=h,t.xr.enabled=f,n.texture.needsPMREMUpdate=!0}},ns=class extends de{constructor(t,e,n,i,s,o,r,l,c,p){t=t!==void 0?t:[],e=e!==void 0?e:Qn,super(t,e,n,i,s,o,r,l,c,p),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},sr=class extends Ye{constructor(t,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new ns(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.encoding),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:ye}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.encoding=e.encoding,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new je(5,5,5),s=new Le({name:"CubemapFromEquirect",uniforms:ii(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:we,blending:ln});s.uniforms.tEquirect.value=e;let o=new be(i,s),r=e.minFilter;return e.minFilter===os&&(e.minFilter=ye),new ir(1,10,this).update(t,o),e.minFilter=r,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,i){let s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,i);t.setRenderTarget(s)}},Gs=new $,ql=new $,Zl=new ue,Xe=class{constructor(t=new $(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let i=Gs.subVectors(n,e).cross(ql.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(this.normal).multiplyScalar(-this.distanceToPoint(t)).add(t)}intersectLine(t,e){let n=t.delta(Gs),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let s=-(t.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:e.copy(n).multiplyScalar(s).add(t.start)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||Zl.getNormalMatrix(t),i=this.coplanarPoint(Gs).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},Gn=new mi,Vi=new $,is=class{constructor(t=new Xe,e=new Xe,n=new Xe,i=new Xe,s=new Xe,o=new Xe){this.planes=[t,e,n,i,s,o]}set(t,e,n,i,s,o){let r=this.planes;return r[0].copy(t),r[1].copy(e),r[2].copy(n),r[3].copy(i),r[4].copy(s),r[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t){let e=this.planes,n=t.elements,i=n[0],s=n[1],o=n[2],r=n[3],l=n[4],c=n[5],p=n[6],h=n[7],f=n[8],m=n[9],g=n[10],u=n[11],d=n[12],x=n[13],y=n[14],M=n[15];return e[0].setComponents(r-i,h-l,u-f,M-d).normalize(),e[1].setComponents(r+i,h+l,u+f,M+d).normalize(),e[2].setComponents(r+s,h+c,u+m,M+x).normalize(),e[3].setComponents(r-s,h-c,u-m,M-x).normalize(),e[4].setComponents(r-o,h-p,u-g,M-y).normalize(),e[5].setComponents(r+o,h+p,u+g,M+y).normalize(),this}intersectsObject(t){let e=t.geometry;return e.boundingSphere===null&&e.computeBoundingSphere(),Gn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld),this.intersectsSphere(Gn)}intersectsSprite(t){return Gn.center.set(0,0,0),Gn.radius=.7071067811865476,Gn.applyMatrix4(t.matrixWorld),this.intersectsSphere(Gn)}intersectsSphere(t){let e=this.planes,n=t.center,i=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let i=e[n];if(Vi.x=i.normal.x>0?t.max.x:t.min.x,Vi.y=i.normal.y>0?t.max.y:t.min.y,Vi.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(Vi)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function co(){let a=null,t=!1,e=null,n=null;function i(s,o){e(s,o),n=a.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=a.requestAnimationFrame(i),t=!0)},stop:function(){a.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){a=s}}}function Yl(a,t){let e=t.isWebGL2,n=new WeakMap;function i(c,p){let h=c.array,f=c.usage,m=a.createBuffer();a.bindBuffer(p,m),a.bufferData(p,h,f),c.onUploadCallback();let g;if(h instanceof Float32Array)g=5126;else if(h instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(e)g=5131;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else g=5123;else if(h instanceof Int16Array)g=5122;else if(h instanceof Uint32Array)g=5125;else if(h instanceof Int32Array)g=5124;else if(h instanceof Int8Array)g=5120;else if(h instanceof Uint8Array)g=5121;else if(h instanceof Uint8ClampedArray)g=5121;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:m,type:g,bytesPerElement:h.BYTES_PER_ELEMENT,version:c.version}}function s(c,p,h){let f=p.array,m=p.updateRange;a.bindBuffer(h,c),m.count===-1?a.bufferSubData(h,0,f):(e?a.bufferSubData(h,m.offset*f.BYTES_PER_ELEMENT,f,m.offset,m.count):a.bufferSubData(h,m.offset*f.BYTES_PER_ELEMENT,f.subarray(m.offset,m.offset+m.count)),m.count=-1)}function o(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function r(c){c.isInterleavedBufferAttribute&&(c=c.data);let p=n.get(c);p&&(a.deleteBuffer(p.buffer),n.delete(c))}function l(c,p){if(c.isGLBufferAttribute){let f=n.get(c);(!f||f.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);let h=n.get(c);h===void 0?n.set(c,i(c,p)):h.version<c.version&&(s(h.buffer,c,p),h.version=c.version)}return{get:o,remove:r,update:l}}var gi=class extends Je{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};let s=t/2,o=e/2,r=Math.floor(n),l=Math.floor(i),c=r+1,p=l+1,h=t/r,f=e/l,m=[],g=[],u=[],d=[];for(let x=0;x<p;x++){let y=x*f-o;for(let M=0;M<c;M++){let w=M*h-s;g.push(w,-y,0),u.push(0,0,1),d.push(M/r),d.push(1-x/l)}}for(let x=0;x<l;x++)for(let y=0;y<r;y++){let M=y+c*x,w=y+c*(x+1),S=y+1+c*(x+1),I=y+1+c*x;m.push(M,w,I),m.push(w,S,I)}this.setIndex(m),this.setAttribute("position",new Ze(g,3)),this.setAttribute("normal",new Ze(u,3)),this.setAttribute("uv",new Ze(d,2))}static fromJSON(t){return new gi(t.width,t.height,t.widthSegments,t.heightSegments)}},Jl=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vUv ).g;
#endif`,jl=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,$l=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Kl=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ql=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,tc=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ec="vec3 transformed = vec3( position );",nc=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,ic=`vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
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
#endif`,sc=`#ifdef USE_IRIDESCENCE
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
#endif`,rc=`#ifdef USE_BUMPMAP
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
#endif`,ac=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,oc=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,lc=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,cc=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,hc=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,uc=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,dc=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,fc=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,pc=`#define PI 3.141592653589793
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
}`,mc=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,gc=`vec3 transformedNormal = objectNormal;
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
#endif`,_c=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,xc=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vUv ).x * displacementScale + displacementBias );
#endif`,vc=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,yc=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,bc="gl_FragColor = linearToOutputTexel( gl_FragColor );",wc=`vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Mc=`#ifdef USE_ENVMAP
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
#endif`,Sc=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Ac=`#ifdef USE_ENVMAP
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
#endif`,Tc=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ec=`#ifdef USE_ENVMAP
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
#endif`,Cc=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Pc=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Rc=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Lc=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ic=`#ifdef USE_GRADIENTMAP
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
}`,Dc=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vUv2 );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,zc=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,kc=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Oc=`varying vec3 vViewPosition;
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
#define Material_LightProbeLOD( material )	(0)`,Nc=`uniform bool receiveShadow;
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
#endif`,Fc=`#if defined( USE_ENVMAP )
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
#endif`,Uc=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Bc=`varying vec3 vViewPosition;
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
#define Material_LightProbeLOD( material )	(0)`,Vc=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Wc=`varying vec3 vViewPosition;
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
#define Material_LightProbeLOD( material )	(0)`,Hc=`PhysicalMaterial material;
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
#endif`,Gc=`struct PhysicalMaterial {
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
}`,Xc=`
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
#endif`,qc=`#if defined( RE_IndirectDiffuse )
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
#endif`,Zc=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );
#endif`,Yc=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Jc=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,jc=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,$c=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Kc=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Qc=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,th=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,eh=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	uniform mat3 uvTransform;
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,nh=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ih=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,sh=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,rh=`#ifdef USE_MORPHNORMALS
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
#endif`,ah=`#ifdef USE_MORPHTARGETS
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
#endif`,oh=`#ifdef USE_MORPHTARGETS
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
#endif`,lh=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 geometryNormal = normal;`,ch=`#ifdef OBJECTSPACE_NORMALMAP
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
#endif`,hh=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,uh=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,dh=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,fh=`#ifdef USE_NORMALMAP
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
#endif`,ph=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = geometryNormal;
#endif`,mh=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	#ifdef USE_TANGENT
		clearcoatNormal = normalize( vTBN * clearcoatMapN );
	#else
		clearcoatNormal = perturbNormal2Arb( - vViewPosition, clearcoatNormal, clearcoatMapN, faceDirection );
	#endif
#endif`,gh=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif`,_h=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,xh=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha + 0.1;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,vh=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,yh=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,bh=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,wh=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Mh=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Sh=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Ah=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Th=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Eh=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Ch=`#if defined( USE_SHADOWMAP ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Ph=`float getShadowMask() {
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
}`,Rh=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Lh=`#ifdef USE_SKINNING
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
#endif`,Ih=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Dh=`#ifdef USE_SKINNING
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
#endif`,zh=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,kh=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Oh=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Nh=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Fh=`#ifdef USE_TRANSMISSION
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
#endif`,Uh=`#ifdef USE_TRANSMISSION
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
#endif`,Bh=`#if ( defined( USE_UV ) && ! defined( UVS_VERTEX_ONLY ) )
	varying vec2 vUv;
#endif`,Vh=`#ifdef USE_UV
	#ifdef UVS_VERTEX_ONLY
		vec2 vUv;
	#else
		varying vec2 vUv;
	#endif
	uniform mat3 uvTransform;
#endif`,Wh=`#ifdef USE_UV
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
#endif`,Hh=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	varying vec2 vUv2;
#endif`,Gh=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	attribute vec2 uv2;
	varying vec2 vUv2;
	uniform mat3 uv2Transform;
#endif`,Xh=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	vUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;
#endif`,qh=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Zh=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Yh=`uniform sampler2D t2D;
varying vec2 vUv;
void main() {
	gl_FragColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		gl_FragColor = vec4( mix( pow( gl_FragColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), gl_FragColor.rgb * 0.0773993808, vec3( lessThanEqual( gl_FragColor.rgb, vec3( 0.04045 ) ) ) ), gl_FragColor.w );
	#endif
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,Jh=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,jh=`#include <envmap_common_pars_fragment>
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
}`,$h=`#include <common>
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
}`,Kh=`#if DEPTH_PACKING == 3200
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
}`,Qh=`#define DISTANCE
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
}`,tu=`#define DISTANCE
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
}`,eu=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,nu=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,iu=`uniform float scale;
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
}`,su=`uniform vec3 diffuse;
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
}`,ru=`#include <common>
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
}`,au=`uniform vec3 diffuse;
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
}`,ou=`#define LAMBERT
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
}`,lu=`#define LAMBERT
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
}`,cu=`#define MATCAP
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
}`,hu=`#define MATCAP
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
}`,uu=`#define NORMAL
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
}`,du=`#define NORMAL
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
}`,fu=`#define PHONG
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
}`,pu=`#define PHONG
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
}`,mu=`#define STANDARD
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
}`,gu=`#define STANDARD
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
}`,_u=`#define TOON
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
}`,xu=`#define TOON
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
}`,vu=`uniform float size;
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
}`,yu=`uniform vec3 diffuse;
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
}`,bu=`#include <common>
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
}`,wu=`uniform vec3 color;
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
}`,Mu=`uniform float rotation;
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
}`,Su=`uniform vec3 diffuse;
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
}`,Ot={alphamap_fragment:Jl,alphamap_pars_fragment:jl,alphatest_fragment:$l,alphatest_pars_fragment:Kl,aomap_fragment:Ql,aomap_pars_fragment:tc,begin_vertex:ec,beginnormal_vertex:nc,bsdfs:ic,iridescence_fragment:sc,bumpmap_pars_fragment:rc,clipping_planes_fragment:ac,clipping_planes_pars_fragment:oc,clipping_planes_pars_vertex:lc,clipping_planes_vertex:cc,color_fragment:hc,color_pars_fragment:uc,color_pars_vertex:dc,color_vertex:fc,common:pc,cube_uv_reflection_fragment:mc,defaultnormal_vertex:gc,displacementmap_pars_vertex:_c,displacementmap_vertex:xc,emissivemap_fragment:vc,emissivemap_pars_fragment:yc,encodings_fragment:bc,encodings_pars_fragment:wc,envmap_fragment:Mc,envmap_common_pars_fragment:Sc,envmap_pars_fragment:Ac,envmap_pars_vertex:Tc,envmap_physical_pars_fragment:Fc,envmap_vertex:Ec,fog_vertex:Cc,fog_pars_vertex:Pc,fog_fragment:Rc,fog_pars_fragment:Lc,gradientmap_pars_fragment:Ic,lightmap_fragment:Dc,lightmap_pars_fragment:zc,lights_lambert_fragment:kc,lights_lambert_pars_fragment:Oc,lights_pars_begin:Nc,lights_toon_fragment:Uc,lights_toon_pars_fragment:Bc,lights_phong_fragment:Vc,lights_phong_pars_fragment:Wc,lights_physical_fragment:Hc,lights_physical_pars_fragment:Gc,lights_fragment_begin:Xc,lights_fragment_maps:qc,lights_fragment_end:Zc,logdepthbuf_fragment:Yc,logdepthbuf_pars_fragment:Jc,logdepthbuf_pars_vertex:jc,logdepthbuf_vertex:$c,map_fragment:Kc,map_pars_fragment:Qc,map_particle_fragment:th,map_particle_pars_fragment:eh,metalnessmap_fragment:nh,metalnessmap_pars_fragment:ih,morphcolor_vertex:sh,morphnormal_vertex:rh,morphtarget_pars_vertex:ah,morphtarget_vertex:oh,normal_fragment_begin:lh,normal_fragment_maps:ch,normal_pars_fragment:hh,normal_pars_vertex:uh,normal_vertex:dh,normalmap_pars_fragment:fh,clearcoat_normal_fragment_begin:ph,clearcoat_normal_fragment_maps:mh,clearcoat_pars_fragment:gh,iridescence_pars_fragment:_h,output_fragment:xh,packing:vh,premultiplied_alpha_fragment:yh,project_vertex:bh,dithering_fragment:wh,dithering_pars_fragment:Mh,roughnessmap_fragment:Sh,roughnessmap_pars_fragment:Ah,shadowmap_pars_fragment:Th,shadowmap_pars_vertex:Eh,shadowmap_vertex:Ch,shadowmask_pars_fragment:Ph,skinbase_vertex:Rh,skinning_pars_vertex:Lh,skinning_vertex:Ih,skinnormal_vertex:Dh,specularmap_fragment:zh,specularmap_pars_fragment:kh,tonemapping_fragment:Oh,tonemapping_pars_fragment:Nh,transmission_fragment:Fh,transmission_pars_fragment:Uh,uv_pars_fragment:Bh,uv_pars_vertex:Vh,uv_vertex:Wh,uv2_pars_fragment:Hh,uv2_pars_vertex:Gh,uv2_vertex:Xh,worldpos_vertex:qh,background_vert:Zh,background_frag:Yh,cube_vert:Jh,cube_frag:jh,depth_vert:$h,depth_frag:Kh,distanceRGBA_vert:Qh,distanceRGBA_frag:tu,equirect_vert:eu,equirect_frag:nu,linedashed_vert:iu,linedashed_frag:su,meshbasic_vert:ru,meshbasic_frag:au,meshlambert_vert:ou,meshlambert_frag:lu,meshmatcap_vert:cu,meshmatcap_frag:hu,meshnormal_vert:uu,meshnormal_frag:du,meshphong_vert:fu,meshphong_frag:pu,meshphysical_vert:mu,meshphysical_frag:gu,meshtoon_vert:_u,meshtoon_frag:xu,points_vert:vu,points_frag:yu,shadow_vert:bu,shadow_frag:wu,sprite_vert:Mu,sprite_frag:Su},_t={common:{diffuse:{value:new Gt(16777215)},opacity:{value:1},map:{value:null},uvTransform:{value:new ue},uv2Transform:{value:new ue},alphaMap:{value:null},alphaTest:{value:0}},specularmap:{specularMap:{value:null}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1}},emissivemap:{emissiveMap:{value:null}},bumpmap:{bumpMap:{value:null},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalScale:{value:new zt(1,1)}},displacementmap:{displacementMap:{value:null},displacementScale:{value:1},displacementBias:{value:0}},roughnessmap:{roughnessMap:{value:null}},metalnessmap:{metalnessMap:{value:null}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Gt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Gt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaTest:{value:0},uvTransform:{value:new ue}},sprite:{diffuse:{value:new Gt(16777215)},opacity:{value:1},center:{value:new zt(.5,.5)},rotation:{value:0},map:{value:null},alphaMap:{value:null},alphaTest:{value:0},uvTransform:{value:new ue}}},ze={basic:{uniforms:re([_t.common,_t.specularmap,_t.envmap,_t.aomap,_t.lightmap,_t.fog]),vertexShader:Ot.meshbasic_vert,fragmentShader:Ot.meshbasic_frag},lambert:{uniforms:re([_t.common,_t.specularmap,_t.envmap,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.fog,_t.lights,{emissive:{value:new Gt(0)}}]),vertexShader:Ot.meshlambert_vert,fragmentShader:Ot.meshlambert_frag},phong:{uniforms:re([_t.common,_t.specularmap,_t.envmap,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.fog,_t.lights,{emissive:{value:new Gt(0)},specular:{value:new Gt(1118481)},shininess:{value:30}}]),vertexShader:Ot.meshphong_vert,fragmentShader:Ot.meshphong_frag},standard:{uniforms:re([_t.common,_t.envmap,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.roughnessmap,_t.metalnessmap,_t.fog,_t.lights,{emissive:{value:new Gt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ot.meshphysical_vert,fragmentShader:Ot.meshphysical_frag},toon:{uniforms:re([_t.common,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.gradientmap,_t.fog,_t.lights,{emissive:{value:new Gt(0)}}]),vertexShader:Ot.meshtoon_vert,fragmentShader:Ot.meshtoon_frag},matcap:{uniforms:re([_t.common,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.fog,{matcap:{value:null}}]),vertexShader:Ot.meshmatcap_vert,fragmentShader:Ot.meshmatcap_frag},points:{uniforms:re([_t.points,_t.fog]),vertexShader:Ot.points_vert,fragmentShader:Ot.points_frag},dashed:{uniforms:re([_t.common,_t.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ot.linedashed_vert,fragmentShader:Ot.linedashed_frag},depth:{uniforms:re([_t.common,_t.displacementmap]),vertexShader:Ot.depth_vert,fragmentShader:Ot.depth_frag},normal:{uniforms:re([_t.common,_t.bumpmap,_t.normalmap,_t.displacementmap,{opacity:{value:1}}]),vertexShader:Ot.meshnormal_vert,fragmentShader:Ot.meshnormal_frag},sprite:{uniforms:re([_t.sprite,_t.fog]),vertexShader:Ot.sprite_vert,fragmentShader:Ot.sprite_frag},background:{uniforms:{uvTransform:{value:new ue},t2D:{value:null}},vertexShader:Ot.background_vert,fragmentShader:Ot.background_frag},cube:{uniforms:re([_t.envmap,{opacity:{value:1}}]),vertexShader:Ot.cube_vert,fragmentShader:Ot.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ot.equirect_vert,fragmentShader:Ot.equirect_frag},distanceRGBA:{uniforms:re([_t.common,_t.displacementmap,{referencePosition:{value:new $},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ot.distanceRGBA_vert,fragmentShader:Ot.distanceRGBA_frag},shadow:{uniforms:re([_t.lights,_t.fog,{color:{value:new Gt(0)},opacity:{value:1}}]),vertexShader:Ot.shadow_vert,fragmentShader:Ot.shadow_frag}};ze.physical={uniforms:re([ze.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatNormalScale:{value:new zt(1,1)},clearcoatNormalMap:{value:null},iridescence:{value:0},iridescenceMap:{value:null},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},sheen:{value:0},sheenColor:{value:new Gt(0)},sheenColorMap:{value:null},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},transmission:{value:0},transmissionMap:{value:null},transmissionSamplerSize:{value:new zt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},attenuationDistance:{value:0},attenuationColor:{value:new Gt(0)},specularIntensity:{value:1},specularIntensityMap:{value:null},specularColor:{value:new Gt(1,1,1)},specularColorMap:{value:null}}]),vertexShader:Ot.meshphysical_vert,fragmentShader:Ot.meshphysical_frag};function Au(a,t,e,n,i,s){let o=new Gt(0),r=i===!0?0:1,l,c,p=null,h=0,f=null;function m(u,d){let x=!1,y=d.isScene===!0?d.background:null;y&&y.isTexture&&(y=t.get(y));let M=a.xr,w=M.getSession&&M.getSession();w&&w.environmentBlendMode==="additive"&&(y=null),y===null?g(o,r):y&&y.isColor&&(g(y,1),x=!0),(a.autoClear||x)&&a.clear(a.autoClearColor,a.autoClearDepth,a.autoClearStencil),y&&(y.isCubeTexture||y.mapping===as)?(c===void 0&&(c=new be(new je(1,1,1),new Le({name:"BackgroundCubeMaterial",uniforms:ii(ze.cube.uniforms),vertexShader:ze.cube.vertexShader,fragmentShader:ze.cube.fragmentShader,side:we,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(S,I,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=y,c.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,(p!==y||h!==y.version||f!==a.toneMapping)&&(c.material.needsUpdate=!0,p=y,h=y.version,f=a.toneMapping),c.layers.enableAll(),u.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new be(new gi(2,2),new Le({name:"BackgroundMaterial",uniforms:ii(ze.background.uniforms),vertexShader:ze.background.vertexShader,fragmentShader:ze.background.fragmentShader,side:Kn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=y,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(p!==y||h!==y.version||f!==a.toneMapping)&&(l.material.needsUpdate=!0,p=y,h=y.version,f=a.toneMapping),l.layers.enableAll(),u.unshift(l,l.geometry,l.material,0,0,null))}function g(u,d){e.buffers.color.setClear(u.r,u.g,u.b,d,s)}return{getClearColor:function(){return o},setClearColor:function(u,d=1){o.set(u),r=d,g(o,r)},getClearAlpha:function(){return r},setClearAlpha:function(u){r=u,g(o,r)},render:m}}function Tu(a,t,e,n){let i=a.getParameter(34921),s=n.isWebGL2?null:t.get("OES_vertex_array_object"),o=n.isWebGL2||s!==null,r={},l=d(null),c=l,p=!1;function h(B,U,nt,G,J){let C=!1;if(o){let P=u(G,nt,U);c!==P&&(c=P,m(c.object)),C=x(B,G,nt,J),C&&y(B,G,nt,J)}else{let P=U.wireframe===!0;(c.geometry!==G.id||c.program!==nt.id||c.wireframe!==P)&&(c.geometry=G.id,c.program=nt.id,c.wireframe=P,C=!0)}J!==null&&e.update(J,34963),(C||p)&&(p=!1,A(B,U,nt,G),J!==null&&a.bindBuffer(34963,e.get(J).buffer))}function f(){return n.isWebGL2?a.createVertexArray():s.createVertexArrayOES()}function m(B){return n.isWebGL2?a.bindVertexArray(B):s.bindVertexArrayOES(B)}function g(B){return n.isWebGL2?a.deleteVertexArray(B):s.deleteVertexArrayOES(B)}function u(B,U,nt){let G=nt.wireframe===!0,J=r[B.id];J===void 0&&(J={},r[B.id]=J);let C=J[U.id];C===void 0&&(C={},J[U.id]=C);let P=C[G];return P===void 0&&(P=d(f()),C[G]=P),P}function d(B){let U=[],nt=[],G=[];for(let J=0;J<i;J++)U[J]=0,nt[J]=0,G[J]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:nt,attributeDivisors:G,object:B,attributes:{},index:null}}function x(B,U,nt,G){let J=c.attributes,C=U.attributes,P=0,it=nt.getAttributes();for(let Z in it)if(it[Z].location>=0){let ft=J[Z],At=C[Z];if(At===void 0&&(Z==="instanceMatrix"&&B.instanceMatrix&&(At=B.instanceMatrix),Z==="instanceColor"&&B.instanceColor&&(At=B.instanceColor)),ft===void 0||ft.attribute!==At||At&&ft.data!==At.data)return!0;P++}return c.attributesNum!==P||c.index!==G}function y(B,U,nt,G){let J={},C=U.attributes,P=0,it=nt.getAttributes();for(let Z in it)if(it[Z].location>=0){let ft=C[Z];ft===void 0&&(Z==="instanceMatrix"&&B.instanceMatrix&&(ft=B.instanceMatrix),Z==="instanceColor"&&B.instanceColor&&(ft=B.instanceColor));let At={};At.attribute=ft,ft&&ft.data&&(At.data=ft.data),J[Z]=At,P++}c.attributes=J,c.attributesNum=P,c.index=G}function M(){let B=c.newAttributes;for(let U=0,nt=B.length;U<nt;U++)B[U]=0}function w(B){S(B,0)}function S(B,U){let nt=c.newAttributes,G=c.enabledAttributes,J=c.attributeDivisors;nt[B]=1,G[B]===0&&(a.enableVertexAttribArray(B),G[B]=1),J[B]!==U&&((n.isWebGL2?a:t.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](B,U),J[B]=U)}function I(){let B=c.newAttributes,U=c.enabledAttributes;for(let nt=0,G=U.length;nt<G;nt++)U[nt]!==B[nt]&&(a.disableVertexAttribArray(nt),U[nt]=0)}function D(B,U,nt,G,J,C){n.isWebGL2===!0&&(nt===5124||nt===5125)?a.vertexAttribIPointer(B,U,nt,J,C):a.vertexAttribPointer(B,U,nt,G,J,C)}function A(B,U,nt,G){if(n.isWebGL2===!1&&(B.isInstancedMesh||G.isInstancedBufferGeometry)&&t.get("ANGLE_instanced_arrays")===null)return;M();let J=G.attributes,C=nt.getAttributes(),P=U.defaultAttributeValues;for(let it in C){let Z=C[it];if(Z.location>=0){let K=J[it];if(K===void 0&&(it==="instanceMatrix"&&B.instanceMatrix&&(K=B.instanceMatrix),it==="instanceColor"&&B.instanceColor&&(K=B.instanceColor)),K!==void 0){let ft=K.normalized,At=K.itemSize,et=e.get(K);if(et===void 0)continue;let Tt=et.buffer,Mt=et.type,bt=et.bytesPerElement;if(K.isInterleavedBufferAttribute){let xt=K.data,Dt=xt.stride,_=K.offset;if(xt.isInstancedInterleavedBuffer){for(let X=0;X<Z.locationSize;X++)S(Z.location+X,xt.meshPerAttribute);B.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=xt.meshPerAttribute*xt.count)}else for(let X=0;X<Z.locationSize;X++)w(Z.location+X);a.bindBuffer(34962,Tt);for(let X=0;X<Z.locationSize;X++)D(Z.location+X,At/Z.locationSize,Mt,ft,Dt*bt,(_+At/Z.locationSize*X)*bt)}else{if(K.isInstancedBufferAttribute){for(let xt=0;xt<Z.locationSize;xt++)S(Z.location+xt,K.meshPerAttribute);B.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let xt=0;xt<Z.locationSize;xt++)w(Z.location+xt);a.bindBuffer(34962,Tt);for(let xt=0;xt<Z.locationSize;xt++)D(Z.location+xt,At/Z.locationSize,Mt,ft,At*bt,At/Z.locationSize*xt*bt)}}else if(P!==void 0){let ft=P[it];if(ft!==void 0)switch(ft.length){case 2:a.vertexAttrib2fv(Z.location,ft);break;case 3:a.vertexAttrib3fv(Z.location,ft);break;case 4:a.vertexAttrib4fv(Z.location,ft);break;default:a.vertexAttrib1fv(Z.location,ft)}}}}I()}function k(){v();for(let B in r){let U=r[B];for(let nt in U){let G=U[nt];for(let J in G)g(G[J].object),delete G[J];delete U[nt]}delete r[B]}}function T(B){if(r[B.id]===void 0)return;let U=r[B.id];for(let nt in U){let G=U[nt];for(let J in G)g(G[J].object),delete G[J];delete U[nt]}delete r[B.id]}function F(B){for(let U in r){let nt=r[U];if(nt[B.id]===void 0)continue;let G=nt[B.id];for(let J in G)g(G[J].object),delete G[J];delete nt[B.id]}}function v(){O(),p=!0,c!==l&&(c=l,m(c.object))}function O(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:h,reset:v,resetDefaultState:O,dispose:k,releaseStatesOfGeometry:T,releaseStatesOfProgram:F,initAttributes:M,enableAttribute:w,disableUnusedAttributes:I}}function Eu(a,t,e,n){let i=n.isWebGL2,s;function o(c){s=c}function r(c,p){a.drawArrays(s,c,p),e.update(p,s,1)}function l(c,p,h){if(h===0)return;let f,m;if(i)f=a,m="drawArraysInstanced";else if(f=t.get("ANGLE_instanced_arrays"),m="drawArraysInstancedANGLE",f===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[m](s,c,p,h),e.update(p,s,h)}this.setMode=o,this.render=r,this.renderInstances=l}function Cu(a,t,e){let n;function i(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){let D=t.get("EXT_texture_filter_anisotropic");n=a.getParameter(D.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function s(D){if(D==="highp"){if(a.getShaderPrecisionFormat(35633,36338).precision>0&&a.getShaderPrecisionFormat(35632,36338).precision>0)return"highp";D="mediump"}return D==="mediump"&&a.getShaderPrecisionFormat(35633,36337).precision>0&&a.getShaderPrecisionFormat(35632,36337).precision>0?"mediump":"lowp"}let o=typeof WebGL2RenderingContext<"u"&&a instanceof WebGL2RenderingContext||typeof WebGL2ComputeRenderingContext<"u"&&a instanceof WebGL2ComputeRenderingContext,r=e.precision!==void 0?e.precision:"highp",l=s(r);l!==r&&(console.warn("THREE.WebGLRenderer:",r,"not supported, using",l,"instead."),r=l);let c=o||t.has("WEBGL_draw_buffers"),p=e.logarithmicDepthBuffer===!0,h=a.getParameter(34930),f=a.getParameter(35660),m=a.getParameter(3379),g=a.getParameter(34076),u=a.getParameter(34921),d=a.getParameter(36347),x=a.getParameter(36348),y=a.getParameter(36349),M=f>0,w=o||t.has("OES_texture_float"),S=M&&w,I=o?a.getParameter(36183):0;return{isWebGL2:o,drawBuffers:c,getMaxAnisotropy:i,getMaxPrecision:s,precision:r,logarithmicDepthBuffer:p,maxTextures:h,maxVertexTextures:f,maxTextureSize:m,maxCubemapSize:g,maxAttributes:u,maxVertexUniforms:d,maxVaryings:x,maxFragmentUniforms:y,vertexTextures:M,floatFragmentTextures:w,floatVertexTextures:S,maxSamples:I}}function Pu(a){let t=this,e=null,n=0,i=!1,s=!1,o=new Xe,r=new ue,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f,m){let g=h.length!==0||f||n!==0||i;return i=f,e=p(h,m,0),n=h.length,g},this.beginShadows=function(){s=!0,p(null)},this.endShadows=function(){s=!1,c()},this.setState=function(h,f,m){let g=h.clippingPlanes,u=h.clipIntersection,d=h.clipShadows,x=a.get(h);if(!i||g===null||g.length===0||s&&!d)s?p(null):c();else{let y=s?0:n,M=y*4,w=x.clippingState||null;l.value=w,w=p(g,f,M,m);for(let S=0;S!==M;++S)w[S]=e[S];x.clippingState=w,this.numIntersection=u?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function p(h,f,m,g){let u=h!==null?h.length:0,d=null;if(u!==0){if(d=l.value,g!==!0||d===null){let x=m+u*4,y=f.matrixWorldInverse;r.getNormalMatrix(y),(d===null||d.length<x)&&(d=new Float32Array(x));for(let M=0,w=m;M!==u;++M,w+=4)o.copy(h[M]).applyMatrix4(y,r),o.normal.toArray(d,w),d[w+3]=o.constant}l.value=d,l.needsUpdate=!0}return t.numPlanes=u,t.numIntersection=0,d}}function Ru(a){let t=new WeakMap;function e(o,r){return r===Js?o.mapping=Qn:r===js&&(o.mapping=ti),o}function n(o){if(o&&o.isTexture&&o.isRenderTargetTexture===!1){let r=o.mapping;if(r===Js||r===js)if(t.has(o)){let l=t.get(o).texture;return e(l,o.mapping)}else{let l=o.image;if(l&&l.height>0){let c=new sr(l.height/2);return c.fromEquirectangularTexture(a,o),t.set(o,c),o.addEventListener("dispose",i),e(c.texture,o.mapping)}else return null}}return o}function i(o){let r=o.target;r.removeEventListener("dispose",i);let l=t.get(r);l!==void 0&&(t.delete(r),l.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}var rr=class extends es{constructor(t=-1,e=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,s=n-t,o=n+t,r=i+e,l=i-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,p=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,r-=p*this.view.offsetY,l=r-p*this.view.height}this.projectionMatrix.makeOrthographic(s,o,r,l,this.near,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Zn=4,za=[.125,.215,.35,.446,.526,.582],mn=20,Xs=new rr,ka=new Gt,qs=null,pn=(1+Math.sqrt(5))/2,Xn=1/pn,Oa=[new $(1,1,1),new $(-1,1,1),new $(1,1,-1),new $(-1,1,-1),new $(0,pn,Xn),new $(0,pn,-Xn),new $(Xn,0,pn),new $(-Xn,0,pn),new $(pn,Xn,0),new $(-pn,Xn,0)],ss=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){qs=this._renderer.getRenderTarget(),this._setSize(256);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,n,i,s),e>0&&this._blur(s,0,0,e),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ua(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Fa(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(qs),t.scissorTest=!1,Wi(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Qn||t.mapping===ti?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),qs=this._renderer.getRenderTarget();let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:ye,minFilter:ye,generateMipmaps:!1,type:pi,format:Oe,encoding:wn,depthBuffer:!1},i=Na(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Na(t,e,n);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Lu(s)),this._blurMaterial=Iu(s,t,e)}return i}_compileMaterial(t){let e=new be(this._lodPlanes[0],t);this._renderer.compile(e,Xs)}_sceneToCubeUV(t,e,n,i){let r=new le(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],p=this._renderer,h=p.autoClear,f=p.toneMapping;p.getClearColor(ka),p.toneMapping=qe,p.autoClear=!1;let m=new Ki({name:"PMREM.Background",side:we,depthWrite:!1,depthTest:!1}),g=new be(new je,m),u=!1,d=t.background;d?d.isColor&&(m.color.copy(d),t.background=null,u=!0):(m.color.copy(ka),u=!0);for(let x=0;x<6;x++){let y=x%3;y===0?(r.up.set(0,l[x],0),r.lookAt(c[x],0,0)):y===1?(r.up.set(0,0,l[x]),r.lookAt(0,c[x],0)):(r.up.set(0,l[x],0),r.lookAt(0,0,c[x]));let M=this._cubeSize;Wi(i,y*M,x>2?M:0,M,M),p.setRenderTarget(i),u&&p.render(g,r),p.render(t,r)}g.geometry.dispose(),g.material.dispose(),p.toneMapping=f,p.autoClear=h,t.background=d}_textureToCubeUV(t,e){let n=this._renderer,i=t.mapping===Qn||t.mapping===ti;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ua()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Fa());let s=i?this._cubemapMaterial:this._equirectMaterial,o=new be(this._lodPlanes[0],s),r=s.uniforms;r.envMap.value=t;let l=this._cubeSize;Wi(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,Xs)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){let s=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),o=Oa[(i-1)%Oa.length];this._blur(t,i-1,i,s,o)}e.autoClear=n}_blur(t,e,n,i,s){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,i,"latitudinal",s),this._halfBlur(o,t,n,n,i,"longitudinal",s)}_halfBlur(t,e,n,i,s,o,r){let l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let p=3,h=new be(this._lodPlanes[i],c),f=c.uniforms,m=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*m):2*Math.PI/(2*mn-1),u=s/g,d=isFinite(s)?1+Math.floor(p*u):mn;d>mn&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${d} samples when the maximum is set to ${mn}`);let x=[],y=0;for(let D=0;D<mn;++D){let A=D/u,k=Math.exp(-A*A/2);x.push(k),D===0?y+=k:D<d&&(y+=2*k)}for(let D=0;D<x.length;D++)x[D]=x[D]/y;f.envMap.value=t.texture,f.samples.value=d,f.weights.value=x,f.latitudinal.value=o==="latitudinal",r&&(f.poleAxis.value=r);let{_lodMax:M}=this;f.dTheta.value=g,f.mipInt.value=M-n;let w=this._sizeLods[i],S=3*w*(i>M-Zn?i-M+Zn:0),I=4*(this._cubeSize-w);Wi(e,S,I,3*w,2*w),l.setRenderTarget(e),l.render(h,Xs)}};function Lu(a){let t=[],e=[],n=[],i=a,s=a-Zn+1+za.length;for(let o=0;o<s;o++){let r=Math.pow(2,i);e.push(r);let l=1/r;o>a-Zn?l=za[o-a+Zn-1]:o===0&&(l=0),n.push(l);let c=1/(r-2),p=-c,h=1+c,f=[p,p,h,p,h,h,p,p,h,h,p,h],m=6,g=6,u=3,d=2,x=1,y=new Float32Array(u*g*m),M=new Float32Array(d*g*m),w=new Float32Array(x*g*m);for(let I=0;I<m;I++){let D=I%3*2/3-1,A=I>2?0:-1,k=[D,A,0,D+2/3,A,0,D+2/3,A+1,0,D,A,0,D+2/3,A+1,0,D,A+1,0];y.set(k,u*g*I),M.set(f,d*g*I);let T=[I,I,I,I,I,I];w.set(T,x*g*I)}let S=new Je;S.setAttribute("position",new Me(y,u)),S.setAttribute("uv",new Me(M,d)),S.setAttribute("faceIndex",new Me(w,x)),t.push(S),i>Zn&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Na(a,t,e){let n=new Ye(a,t,e);return n.texture.mapping=as,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Wi(a,t,e,n,i){a.viewport.set(t,e,n,i),a.scissor.set(t,e,n,i)}function Iu(a,t,e){let n=new Float32Array(mn),i=new $(0,1,0);return new Le({name:"SphericalGaussianBlur",defines:{n:mn,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${a}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Er(),fragmentShader:`

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
		`,blending:ln,depthTest:!1,depthWrite:!1})}function Fa(){return new Le({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Er(),fragmentShader:`

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
		`,blending:ln,depthTest:!1,depthWrite:!1})}function Ua(){return new Le({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Er(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ln,depthTest:!1,depthWrite:!1})}function Er(){return`

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
	`}function Du(a){let t=new WeakMap,e=null;function n(r){if(r&&r.isTexture){let l=r.mapping,c=l===Js||l===js,p=l===Qn||l===ti;if(c||p)if(r.isRenderTargetTexture&&r.needsPMREMUpdate===!0){r.needsPMREMUpdate=!1;let h=t.get(r);return e===null&&(e=new ss(a)),h=c?e.fromEquirectangular(r,h):e.fromCubemap(r,h),t.set(r,h),h.texture}else{if(t.has(r))return t.get(r).texture;{let h=r.image;if(c&&h&&h.height>0||p&&h&&i(h)){e===null&&(e=new ss(a));let f=c?e.fromEquirectangular(r):e.fromCubemap(r);return t.set(r,f),r.addEventListener("dispose",s),f.texture}else return null}}}return r}function i(r){let l=0,c=6;for(let p=0;p<c;p++)r[p]!==void 0&&l++;return l===c}function s(r){let l=r.target;l.removeEventListener("dispose",s);let c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function zu(a){let t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=a.getExtension("WEBGL_depth_texture")||a.getExtension("MOZ_WEBGL_depth_texture")||a.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=a.getExtension("EXT_texture_filter_anisotropic")||a.getExtension("MOZ_EXT_texture_filter_anisotropic")||a.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=a.getExtension("WEBGL_compressed_texture_s3tc")||a.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||a.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=a.getExtension("WEBGL_compressed_texture_pvrtc")||a.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=a.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(n){n.isWebGL2?e("EXT_color_buffer_float"):(e("WEBGL_depth_texture"),e("OES_texture_float"),e("OES_texture_half_float"),e("OES_texture_half_float_linear"),e("OES_standard_derivatives"),e("OES_element_index_uint"),e("OES_vertex_array_object"),e("ANGLE_instanced_arrays")),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture")},get:function(n){let i=e(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function ku(a,t,e,n){let i={},s=new WeakMap;function o(h){let f=h.target;f.index!==null&&t.remove(f.index);for(let g in f.attributes)t.remove(f.attributes[g]);f.removeEventListener("dispose",o),delete i[f.id];let m=s.get(f);m&&(t.remove(m),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function r(h,f){return i[f.id]===!0||(f.addEventListener("dispose",o),i[f.id]=!0,e.memory.geometries++),f}function l(h){let f=h.attributes;for(let g in f)t.update(f[g],34962);let m=h.morphAttributes;for(let g in m){let u=m[g];for(let d=0,x=u.length;d<x;d++)t.update(u[d],34962)}}function c(h){let f=[],m=h.index,g=h.attributes.position,u=0;if(m!==null){let y=m.array;u=m.version;for(let M=0,w=y.length;M<w;M+=3){let S=y[M+0],I=y[M+1],D=y[M+2];f.push(S,I,I,D,D,S)}}else{let y=g.array;u=g.version;for(let M=0,w=y.length/3-1;M<w;M+=3){let S=M+0,I=M+1,D=M+2;f.push(S,I,I,D,D,S)}}let d=new(oo(f)?ts:Qi)(f,1);d.version=u;let x=s.get(h);x&&t.remove(x),s.set(h,d)}function p(h){let f=s.get(h);if(f){let m=h.index;m!==null&&f.version<m.version&&c(h)}else c(h);return s.get(h)}return{get:r,update:l,getWireframeAttribute:p}}function Ou(a,t,e,n){let i=n.isWebGL2,s;function o(f){s=f}let r,l;function c(f){r=f.type,l=f.bytesPerElement}function p(f,m){a.drawElements(s,m,r,f*l),e.update(m,s,1)}function h(f,m,g){if(g===0)return;let u,d;if(i)u=a,d="drawElementsInstanced";else if(u=t.get("ANGLE_instanced_arrays"),d="drawElementsInstancedANGLE",u===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}u[d](s,m,r,f*l,g),e.update(m,s,g)}this.setMode=o,this.setIndex=c,this.render=p,this.renderInstances=h}function Nu(a){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,r){switch(e.calls++,o){case 4:e.triangles+=r*(s/3);break;case 1:e.lines+=r*(s/2);break;case 3:e.lines+=r*(s-1);break;case 2:e.lines+=r*s;break;case 0:e.points+=r*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){e.frame++,e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function Fu(a,t){return a[0]-t[0]}function Uu(a,t){return Math.abs(t[1])-Math.abs(a[1])}function Bu(a,t,e){let n={},i=new Float32Array(8),s=new WeakMap,o=new Kt,r=[];for(let c=0;c<8;c++)r[c]=[c,0];function l(c,p,h,f){let m=c.morphTargetInfluences;if(t.isWebGL2===!0){let g=p.morphAttributes.position||p.morphAttributes.normal||p.morphAttributes.color,u=g!==void 0?g.length:0,d=s.get(p);if(d===void 0||d.count!==u){let U=function(){O.dispose(),s.delete(p),p.removeEventListener("dispose",U)};d!==void 0&&d.texture.dispose();let M=p.morphAttributes.position!==void 0,w=p.morphAttributes.normal!==void 0,S=p.morphAttributes.color!==void 0,I=p.morphAttributes.position||[],D=p.morphAttributes.normal||[],A=p.morphAttributes.color||[],k=0;M===!0&&(k=1),w===!0&&(k=2),S===!0&&(k=3);let T=p.attributes.position.count*k,F=1;T>t.maxTextureSize&&(F=Math.ceil(T/t.maxTextureSize),T=t.maxTextureSize);let v=new Float32Array(T*F*4*u),O=new ji(v,T,F,u);O.type=_n,O.needsUpdate=!0;let B=k*4;for(let nt=0;nt<u;nt++){let G=I[nt],J=D[nt],C=A[nt],P=T*F*4*nt;for(let it=0;it<G.count;it++){let Z=it*B;M===!0&&(o.fromBufferAttribute(G,it),v[P+Z+0]=o.x,v[P+Z+1]=o.y,v[P+Z+2]=o.z,v[P+Z+3]=0),w===!0&&(o.fromBufferAttribute(J,it),v[P+Z+4]=o.x,v[P+Z+5]=o.y,v[P+Z+6]=o.z,v[P+Z+7]=0),S===!0&&(o.fromBufferAttribute(C,it),v[P+Z+8]=o.x,v[P+Z+9]=o.y,v[P+Z+10]=o.z,v[P+Z+11]=C.itemSize===4?o.w:1)}}d={count:u,texture:O,size:new zt(T,F)},s.set(p,d),p.addEventListener("dispose",U)}let x=0;for(let M=0;M<m.length;M++)x+=m[M];let y=p.morphTargetsRelative?1:1-x;f.getUniforms().setValue(a,"morphTargetBaseInfluence",y),f.getUniforms().setValue(a,"morphTargetInfluences",m),f.getUniforms().setValue(a,"morphTargetsTexture",d.texture,e),f.getUniforms().setValue(a,"morphTargetsTextureSize",d.size)}else{let g=m===void 0?0:m.length,u=n[p.id];if(u===void 0||u.length!==g){u=[];for(let w=0;w<g;w++)u[w]=[w,0];n[p.id]=u}for(let w=0;w<g;w++){let S=u[w];S[0]=w,S[1]=m[w]}u.sort(Uu);for(let w=0;w<8;w++)w<g&&u[w][1]?(r[w][0]=u[w][0],r[w][1]=u[w][1]):(r[w][0]=Number.MAX_SAFE_INTEGER,r[w][1]=0);r.sort(Fu);let d=p.morphAttributes.position,x=p.morphAttributes.normal,y=0;for(let w=0;w<8;w++){let S=r[w],I=S[0],D=S[1];I!==Number.MAX_SAFE_INTEGER&&D?(d&&p.getAttribute("morphTarget"+w)!==d[I]&&p.setAttribute("morphTarget"+w,d[I]),x&&p.getAttribute("morphNormal"+w)!==x[I]&&p.setAttribute("morphNormal"+w,x[I]),i[w]=D,y+=D):(d&&p.hasAttribute("morphTarget"+w)===!0&&p.deleteAttribute("morphTarget"+w),x&&p.hasAttribute("morphNormal"+w)===!0&&p.deleteAttribute("morphNormal"+w),i[w]=0)}let M=p.morphTargetsRelative?1:1-y;f.getUniforms().setValue(a,"morphTargetBaseInfluence",M),f.getUniforms().setValue(a,"morphTargetInfluences",i)}}return{update:l}}function Vu(a,t,e,n){let i=new WeakMap;function s(l){let c=n.render.frame,p=l.geometry,h=t.get(l,p);return i.get(h)!==c&&(t.update(h),i.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",r)===!1&&l.addEventListener("dispose",r),e.update(l.instanceMatrix,34962),l.instanceColor!==null&&e.update(l.instanceColor,34962)),h}function o(){i=new WeakMap}function r(l){let c=l.target;c.removeEventListener("dispose",r),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:s,dispose:o}}var ho=new de,uo=new ji,fo=new er,po=new ns,Ba=[],Va=[],Wa=new Float32Array(16),Ha=new Float32Array(9),Ga=new Float32Array(4);function ri(a,t,e){let n=a[0];if(n<=0||n>0)return a;let i=t*e,s=Ba[i];if(s===void 0&&(s=new Float32Array(i),Ba[i]=s),t!==0){n.toArray(s,0);for(let o=1,r=0;o!==t;++o)r+=e,a[o].toArray(s,r)}return s}function te(a,t){if(a.length!==t.length)return!1;for(let e=0,n=a.length;e<n;e++)if(a[e]!==t[e])return!1;return!0}function ee(a,t){for(let e=0,n=t.length;e<n;e++)a[e]=t[e]}function ls(a,t){let e=Va[t];e===void 0&&(e=new Int32Array(t),Va[t]=e);for(let n=0;n!==t;++n)e[n]=a.allocateTextureUnit();return e}function Wu(a,t){let e=this.cache;e[0]!==t&&(a.uniform1f(this.addr,t),e[0]=t)}function Hu(a,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(a.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(te(e,t))return;a.uniform2fv(this.addr,t),ee(e,t)}}function Gu(a,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(a.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(a.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(te(e,t))return;a.uniform3fv(this.addr,t),ee(e,t)}}function Xu(a,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(a.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(te(e,t))return;a.uniform4fv(this.addr,t),ee(e,t)}}function qu(a,t){let e=this.cache,n=t.elements;if(n===void 0){if(te(e,t))return;a.uniformMatrix2fv(this.addr,!1,t),ee(e,t)}else{if(te(e,n))return;Ga.set(n),a.uniformMatrix2fv(this.addr,!1,Ga),ee(e,n)}}function Zu(a,t){let e=this.cache,n=t.elements;if(n===void 0){if(te(e,t))return;a.uniformMatrix3fv(this.addr,!1,t),ee(e,t)}else{if(te(e,n))return;Ha.set(n),a.uniformMatrix3fv(this.addr,!1,Ha),ee(e,n)}}function Yu(a,t){let e=this.cache,n=t.elements;if(n===void 0){if(te(e,t))return;a.uniformMatrix4fv(this.addr,!1,t),ee(e,t)}else{if(te(e,n))return;Wa.set(n),a.uniformMatrix4fv(this.addr,!1,Wa),ee(e,n)}}function Ju(a,t){let e=this.cache;e[0]!==t&&(a.uniform1i(this.addr,t),e[0]=t)}function ju(a,t){let e=this.cache;te(e,t)||(a.uniform2iv(this.addr,t),ee(e,t))}function $u(a,t){let e=this.cache;te(e,t)||(a.uniform3iv(this.addr,t),ee(e,t))}function Ku(a,t){let e=this.cache;te(e,t)||(a.uniform4iv(this.addr,t),ee(e,t))}function Qu(a,t){let e=this.cache;e[0]!==t&&(a.uniform1ui(this.addr,t),e[0]=t)}function td(a,t){let e=this.cache;te(e,t)||(a.uniform2uiv(this.addr,t),ee(e,t))}function ed(a,t){let e=this.cache;te(e,t)||(a.uniform3uiv(this.addr,t),ee(e,t))}function nd(a,t){let e=this.cache;te(e,t)||(a.uniform4uiv(this.addr,t),ee(e,t))}function id(a,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(a.uniform1i(this.addr,i),n[0]=i),e.setTexture2D(t||ho,i)}function sd(a,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(a.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||fo,i)}function rd(a,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(a.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||po,i)}function ad(a,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(a.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||uo,i)}function od(a){switch(a){case 5126:return Wu;case 35664:return Hu;case 35665:return Gu;case 35666:return Xu;case 35674:return qu;case 35675:return Zu;case 35676:return Yu;case 5124:case 35670:return Ju;case 35667:case 35671:return ju;case 35668:case 35672:return $u;case 35669:case 35673:return Ku;case 5125:return Qu;case 36294:return td;case 36295:return ed;case 36296:return nd;case 35678:case 36198:case 36298:case 36306:case 35682:return id;case 35679:case 36299:case 36307:return sd;case 35680:case 36300:case 36308:case 36293:return rd;case 36289:case 36303:case 36311:case 36292:return ad}}function ld(a,t){a.uniform1fv(this.addr,t)}function cd(a,t){let e=ri(t,this.size,2);a.uniform2fv(this.addr,e)}function hd(a,t){let e=ri(t,this.size,3);a.uniform3fv(this.addr,e)}function ud(a,t){let e=ri(t,this.size,4);a.uniform4fv(this.addr,e)}function dd(a,t){let e=ri(t,this.size,4);a.uniformMatrix2fv(this.addr,!1,e)}function fd(a,t){let e=ri(t,this.size,9);a.uniformMatrix3fv(this.addr,!1,e)}function pd(a,t){let e=ri(t,this.size,16);a.uniformMatrix4fv(this.addr,!1,e)}function md(a,t){a.uniform1iv(this.addr,t)}function gd(a,t){a.uniform2iv(this.addr,t)}function _d(a,t){a.uniform3iv(this.addr,t)}function xd(a,t){a.uniform4iv(this.addr,t)}function vd(a,t){a.uniform1uiv(this.addr,t)}function yd(a,t){a.uniform2uiv(this.addr,t)}function bd(a,t){a.uniform3uiv(this.addr,t)}function wd(a,t){a.uniform4uiv(this.addr,t)}function Md(a,t,e){let n=this.cache,i=t.length,s=ls(e,i);te(n,s)||(a.uniform1iv(this.addr,s),ee(n,s));for(let o=0;o!==i;++o)e.setTexture2D(t[o]||ho,s[o])}function Sd(a,t,e){let n=this.cache,i=t.length,s=ls(e,i);te(n,s)||(a.uniform1iv(this.addr,s),ee(n,s));for(let o=0;o!==i;++o)e.setTexture3D(t[o]||fo,s[o])}function Ad(a,t,e){let n=this.cache,i=t.length,s=ls(e,i);te(n,s)||(a.uniform1iv(this.addr,s),ee(n,s));for(let o=0;o!==i;++o)e.setTextureCube(t[o]||po,s[o])}function Td(a,t,e){let n=this.cache,i=t.length,s=ls(e,i);te(n,s)||(a.uniform1iv(this.addr,s),ee(n,s));for(let o=0;o!==i;++o)e.setTexture2DArray(t[o]||uo,s[o])}function Ed(a){switch(a){case 5126:return ld;case 35664:return cd;case 35665:return hd;case 35666:return ud;case 35674:return dd;case 35675:return fd;case 35676:return pd;case 5124:case 35670:return md;case 35667:case 35671:return gd;case 35668:case 35672:return _d;case 35669:case 35673:return xd;case 5125:return vd;case 36294:return yd;case 36295:return bd;case 36296:return wd;case 35678:case 36198:case 36298:case 36306:case 35682:return Md;case 35679:case 36299:case 36307:return Sd;case 35680:case 36300:case 36308:case 36293:return Ad;case 36289:case 36303:case 36311:case 36292:return Td}}var ar=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.setValue=od(e.type)}},or=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.size=e.size,this.setValue=Ed(e.type)}},lr=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let i=this.seq;for(let s=0,o=i.length;s!==o;++s){let r=i[s];r.setValue(t,e[r.id],n)}}},Zs=/(\w+)(\])?(\[|\.)?/g;function Xa(a,t){a.seq.push(t),a.map[t.id]=t}function Cd(a,t,e){let n=a.name,i=n.length;for(Zs.lastIndex=0;;){let s=Zs.exec(n),o=Zs.lastIndex,r=s[1],l=s[2]==="]",c=s[3];if(l&&(r=r|0),c===void 0||c==="["&&o+2===i){Xa(e,c===void 0?new ar(r,a,t):new or(r,a,t));break}else{let h=e.map[r];h===void 0&&(h=new lr(r),Xa(e,h)),e=h}}}var $n=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,35718);for(let i=0;i<n;++i){let s=t.getActiveUniform(e,i),o=t.getUniformLocation(e,s.name);Cd(s,o,this)}}setValue(t,e,n,i){let s=this.map[e];s!==void 0&&s.setValue(t,n,i)}setOptional(t,e,n){let i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let s=0,o=e.length;s!==o;++s){let r=e[s],l=n[r.id];l.needsUpdate!==!1&&r.setValue(t,l.value,i)}}static seqWithValue(t,e){let n=[];for(let i=0,s=t.length;i!==s;++i){let o=t[i];o.id in e&&n.push(o)}return n}};function qa(a,t,e){let n=a.createShader(t);return a.shaderSource(n,e),a.compileShader(n),n}var Pd=0;function Rd(a,t){let e=a.split(`
`),n=[],i=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let o=i;o<s;o++){let r=o+1;n.push(`${r===t?">":" "} ${r}: ${e[o]}`)}return n.join(`
`)}function Ld(a){switch(a){case wn:return["Linear","( value )"];case Zt:return["sRGB","( value )"];default:return console.warn("THREE.WebGLProgram: Unsupported encoding:",a),["Linear","( value )"]}}function Za(a,t,e){let n=a.getShaderParameter(t,35713),i=a.getShaderInfoLog(t).trim();if(n&&i==="")return"";let s=/ERROR: 0:(\d+)/.exec(i);if(s){let o=parseInt(s[1]);return e.toUpperCase()+`

`+i+`

`+Rd(a.getShaderSource(t),o)}else return i}function Id(a,t){let e=Ld(t);return"vec4 "+a+"( vec4 value ) { return LinearTo"+e[0]+e[1]+"; }"}function Dd(a,t){let e;switch(t){case sl:e="Linear";break;case rl:e="Reinhard";break;case al:e="OptimizedCineon";break;case ol:e="ACESFilmic";break;case ll:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+a+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function zd(a){return[a.extensionDerivatives||!!a.envMapCubeUVHeight||a.bumpMap||a.tangentSpaceNormalMap||a.clearcoatNormalMap||a.flatShading||a.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(a.extensionFragDepth||a.logarithmicDepthBuffer)&&a.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",a.extensionDrawBuffers&&a.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(a.extensionShaderTextureLOD||a.envMap||a.transmission)&&a.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(di).join(`
`)}function kd(a){let t=[];for(let e in a){let n=a[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Od(a,t){let e={},n=a.getProgramParameter(t,35721);for(let i=0;i<n;i++){let s=a.getActiveAttrib(t,i),o=s.name,r=1;s.type===35674&&(r=2),s.type===35675&&(r=3),s.type===35676&&(r=4),e[o]={type:s.type,location:a.getAttribLocation(t,o),locationSize:r}}return e}function di(a){return a!==""}function Ya(a,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return a.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Ja(a,t){return a.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Nd=/^[ \t]*#include +<([\w\d./]+)>/gm;function cr(a){return a.replace(Nd,Fd)}function Fd(a,t){let e=Ot[t];if(e===void 0)throw new Error("Can not resolve #include <"+t+">");return cr(e)}var Ud=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ja(a){return a.replace(Ud,Bd)}function Bd(a,t,e,n){let i="";for(let s=parseInt(t);s<parseInt(e);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function $a(a){let t="precision "+a.precision+` float;
precision `+a.precision+" int;";return a.precision==="highp"?t+=`
#define HIGH_PRECISION`:a.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:a.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Vd(a){let t="SHADOWMAP_TYPE_BASIC";return a.shadowMapType===eo?t="SHADOWMAP_TYPE_PCF":a.shadowMapType===Oo?t="SHADOWMAP_TYPE_PCF_SOFT":a.shadowMapType===ui&&(t="SHADOWMAP_TYPE_VSM"),t}function Wd(a){let t="ENVMAP_TYPE_CUBE";if(a.envMap)switch(a.envMapMode){case Qn:case ti:t="ENVMAP_TYPE_CUBE";break;case as:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Hd(a){let t="ENVMAP_MODE_REFLECTION";if(a.envMap)switch(a.envMapMode){case ti:t="ENVMAP_MODE_REFRACTION";break}return t}function Gd(a){let t="ENVMAP_BLENDING_NONE";if(a.envMap)switch(a.combine){case so:t="ENVMAP_BLENDING_MULTIPLY";break;case nl:t="ENVMAP_BLENDING_MIX";break;case il:t="ENVMAP_BLENDING_ADD";break}return t}function Xd(a){let t=a.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function qd(a,t,e,n){let i=a.getContext(),s=e.defines,o=e.vertexShader,r=e.fragmentShader,l=Vd(e),c=Wd(e),p=Hd(e),h=Gd(e),f=Xd(e),m=e.isWebGL2?"":zd(e),g=kd(s),u=i.createProgram(),d,x,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(d=[g].filter(di).join(`
`),d.length>0&&(d+=`
`),x=[m,g].filter(di).join(`
`),x.length>0&&(x+=`
`)):(d=[$a(e),"#define SHADER_NAME "+e.shaderName,g,e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.supportsVertexTextures?"#define VERTEX_TEXTURES":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+p:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMap&&e.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",e.normalMap&&e.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.displacementMap&&e.supportsVertexTextures?"#define USE_DISPLACEMENTMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularIntensityMap?"#define USE_SPECULARINTENSITYMAP":"",e.specularColorMap?"#define USE_SPECULARCOLORMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEENCOLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEENROUGHNESSMAP":"",e.vertexTangents?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUvs?"#define USE_UV":"",e.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors&&e.isWebGL2?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(di).join(`
`),x=[m,$a(e),"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+p:"",e.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMap&&e.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",e.normalMap&&e.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularIntensityMap?"#define USE_SPECULARINTENSITYMAP":"",e.specularColorMap?"#define USE_SPECULARCOLORMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEENCOLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEENROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.vertexTangents?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUvs?"#define USE_UV":"",e.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.physicallyCorrectLights?"#define PHYSICALLY_CORRECT_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==qe?"#define TONE_MAPPING":"",e.toneMapping!==qe?Ot.tonemapping_pars_fragment:"",e.toneMapping!==qe?Dd("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ot.encodings_pars_fragment,Id("linearToOutputTexel",e.outputEncoding),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(di).join(`
`)),o=cr(o),o=Ya(o,e),o=Ja(o,e),r=cr(r),r=Ya(r,e),r=Ja(r,e),o=ja(o),r=ja(r),e.isWebGL2&&e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,d=["precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+d,x=["#define varying in",e.glslVersion===ya?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===ya?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+x);let M=y+d+o,w=y+x+r,S=qa(i,35633,M),I=qa(i,35632,w);if(i.attachShader(u,S),i.attachShader(u,I),e.index0AttributeName!==void 0?i.bindAttribLocation(u,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(u,0,"position"),i.linkProgram(u),a.debug.checkShaderErrors){let k=i.getProgramInfoLog(u).trim(),T=i.getShaderInfoLog(S).trim(),F=i.getShaderInfoLog(I).trim(),v=!0,O=!0;if(i.getProgramParameter(u,35714)===!1){v=!1;let B=Za(i,S,"vertex"),U=Za(i,I,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(u,35715)+`

Program Info Log: `+k+`
`+B+`
`+U)}else k!==""?console.warn("THREE.WebGLProgram: Program Info Log:",k):(T===""||F==="")&&(O=!1);O&&(this.diagnostics={runnable:v,programLog:k,vertexShader:{log:T,prefix:d},fragmentShader:{log:F,prefix:x}})}i.deleteShader(S),i.deleteShader(I);let D;this.getUniforms=function(){return D===void 0&&(D=new $n(i,u)),D};let A;return this.getAttributes=function(){return A===void 0&&(A=Od(i,u)),A},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(u),this.program=void 0},this.name=e.shaderName,this.id=Pd++,this.cacheKey=t,this.usedTimes=1,this.program=u,this.vertexShader=S,this.fragmentShader=I,this}var Zd=0,hr=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new ur(t),e.set(t,n)),n}},ur=class{constructor(t){this.id=Zd++,this.code=t,this.usedTimes=0}};function Yd(a,t,e,n,i,s,o){let r=new $i,l=new hr,c=[],p=i.isWebGL2,h=i.logarithmicDepthBuffer,f=i.vertexTextures,m=i.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function u(A,k,T,F,v){let O=F.fog,B=v.geometry,U=A.isMeshStandardMaterial?F.environment:null,nt=(A.isMeshStandardMaterial?e:t).get(A.envMap||U),G=!!nt&&nt.mapping===as?nt.image.height:null,J=g[A.type];A.precision!==null&&(m=i.getMaxPrecision(A.precision),m!==A.precision&&console.warn("THREE.WebGLProgram.getParameters:",A.precision,"not supported, using",m,"instead."));let C=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,P=C!==void 0?C.length:0,it=0;B.morphAttributes.position!==void 0&&(it=1),B.morphAttributes.normal!==void 0&&(it=2),B.morphAttributes.color!==void 0&&(it=3);let Z,K,ft,At;if(J){let Dt=ze[J];Z=Dt.vertexShader,K=Dt.fragmentShader}else Z=A.vertexShader,K=A.fragmentShader,l.update(A),ft=l.getVertexShaderID(A),At=l.getFragmentShaderID(A);let et=a.getRenderTarget(),Tt=A.alphaTest>0,Mt=A.clearcoat>0,bt=A.iridescence>0;return{isWebGL2:p,shaderID:J,shaderName:A.type,vertexShader:Z,fragmentShader:K,defines:A.defines,customVertexShaderID:ft,customFragmentShaderID:At,isRawShaderMaterial:A.isRawShaderMaterial===!0,glslVersion:A.glslVersion,precision:m,instancing:v.isInstancedMesh===!0,instancingColor:v.isInstancedMesh===!0&&v.instanceColor!==null,supportsVertexTextures:f,outputEncoding:et===null?a.outputEncoding:et.isXRRenderTarget===!0?et.texture.encoding:wn,map:!!A.map,matcap:!!A.matcap,envMap:!!nt,envMapMode:nt&&nt.mapping,envMapCubeUVHeight:G,lightMap:!!A.lightMap,aoMap:!!A.aoMap,emissiveMap:!!A.emissiveMap,bumpMap:!!A.bumpMap,normalMap:!!A.normalMap,objectSpaceNormalMap:A.normalMapType===Cl,tangentSpaceNormalMap:A.normalMapType===El,decodeVideoTexture:!!A.map&&A.map.isVideoTexture===!0&&A.map.encoding===Zt,clearcoat:Mt,clearcoatMap:Mt&&!!A.clearcoatMap,clearcoatRoughnessMap:Mt&&!!A.clearcoatRoughnessMap,clearcoatNormalMap:Mt&&!!A.clearcoatNormalMap,iridescence:bt,iridescenceMap:bt&&!!A.iridescenceMap,iridescenceThicknessMap:bt&&!!A.iridescenceThicknessMap,displacementMap:!!A.displacementMap,roughnessMap:!!A.roughnessMap,metalnessMap:!!A.metalnessMap,specularMap:!!A.specularMap,specularIntensityMap:!!A.specularIntensityMap,specularColorMap:!!A.specularColorMap,opaque:A.transparent===!1&&A.blending===Jn,alphaMap:!!A.alphaMap,alphaTest:Tt,gradientMap:!!A.gradientMap,sheen:A.sheen>0,sheenColorMap:!!A.sheenColorMap,sheenRoughnessMap:!!A.sheenRoughnessMap,transmission:A.transmission>0,transmissionMap:!!A.transmissionMap,thicknessMap:!!A.thicknessMap,combine:A.combine,vertexTangents:!!A.normalMap&&!!B.attributes.tangent,vertexColors:A.vertexColors,vertexAlphas:A.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,vertexUvs:!!A.map||!!A.bumpMap||!!A.normalMap||!!A.specularMap||!!A.alphaMap||!!A.emissiveMap||!!A.roughnessMap||!!A.metalnessMap||!!A.clearcoatMap||!!A.clearcoatRoughnessMap||!!A.clearcoatNormalMap||!!A.iridescenceMap||!!A.iridescenceThicknessMap||!!A.displacementMap||!!A.transmissionMap||!!A.thicknessMap||!!A.specularIntensityMap||!!A.specularColorMap||!!A.sheenColorMap||!!A.sheenRoughnessMap,uvsVertexOnly:!(!!A.map||!!A.bumpMap||!!A.normalMap||!!A.specularMap||!!A.alphaMap||!!A.emissiveMap||!!A.roughnessMap||!!A.metalnessMap||!!A.clearcoatNormalMap||!!A.iridescenceMap||!!A.iridescenceThicknessMap||A.transmission>0||!!A.transmissionMap||!!A.thicknessMap||!!A.specularIntensityMap||!!A.specularColorMap||A.sheen>0||!!A.sheenColorMap||!!A.sheenRoughnessMap)&&!!A.displacementMap,fog:!!O,useFog:A.fog===!0,fogExp2:O&&O.isFogExp2,flatShading:!!A.flatShading,sizeAttenuation:A.sizeAttenuation,logarithmicDepthBuffer:h,skinning:v.isSkinnedMesh===!0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:P,morphTextureStride:it,numDirLights:k.directional.length,numPointLights:k.point.length,numSpotLights:k.spot.length,numSpotLightMaps:k.spotLightMap.length,numRectAreaLights:k.rectArea.length,numHemiLights:k.hemi.length,numDirLightShadows:k.directionalShadowMap.length,numPointLightShadows:k.pointShadowMap.length,numSpotLightShadows:k.spotShadowMap.length,numSpotLightShadowsWithMaps:k.numSpotLightShadowsWithMaps,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:A.dithering,shadowMapEnabled:a.shadowMap.enabled&&T.length>0,shadowMapType:a.shadowMap.type,toneMapping:A.toneMapped?a.toneMapping:qe,physicallyCorrectLights:a.physicallyCorrectLights,premultipliedAlpha:A.premultipliedAlpha,doubleSided:A.side===ke,flipSided:A.side===we,useDepthPacking:!!A.depthPacking,depthPacking:A.depthPacking||0,index0AttributeName:A.index0AttributeName,extensionDerivatives:A.extensions&&A.extensions.derivatives,extensionFragDepth:A.extensions&&A.extensions.fragDepth,extensionDrawBuffers:A.extensions&&A.extensions.drawBuffers,extensionShaderTextureLOD:A.extensions&&A.extensions.shaderTextureLOD,rendererExtensionFragDepth:p||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:p||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:p||n.has("EXT_shader_texture_lod"),customProgramCacheKey:A.customProgramCacheKey()}}function d(A){let k=[];if(A.shaderID?k.push(A.shaderID):(k.push(A.customVertexShaderID),k.push(A.customFragmentShaderID)),A.defines!==void 0)for(let T in A.defines)k.push(T),k.push(A.defines[T]);return A.isRawShaderMaterial===!1&&(x(k,A),y(k,A),k.push(a.outputEncoding)),k.push(A.customProgramCacheKey),k.join()}function x(A,k){A.push(k.precision),A.push(k.outputEncoding),A.push(k.envMapMode),A.push(k.envMapCubeUVHeight),A.push(k.combine),A.push(k.vertexUvs),A.push(k.fogExp2),A.push(k.sizeAttenuation),A.push(k.morphTargetsCount),A.push(k.morphAttributeCount),A.push(k.numDirLights),A.push(k.numPointLights),A.push(k.numSpotLights),A.push(k.numSpotLightMaps),A.push(k.numHemiLights),A.push(k.numRectAreaLights),A.push(k.numDirLightShadows),A.push(k.numPointLightShadows),A.push(k.numSpotLightShadows),A.push(k.numSpotLightShadowsWithMaps),A.push(k.shadowMapType),A.push(k.toneMapping),A.push(k.numClippingPlanes),A.push(k.numClipIntersection),A.push(k.depthPacking)}function y(A,k){r.disableAll(),k.isWebGL2&&r.enable(0),k.supportsVertexTextures&&r.enable(1),k.instancing&&r.enable(2),k.instancingColor&&r.enable(3),k.map&&r.enable(4),k.matcap&&r.enable(5),k.envMap&&r.enable(6),k.lightMap&&r.enable(7),k.aoMap&&r.enable(8),k.emissiveMap&&r.enable(9),k.bumpMap&&r.enable(10),k.normalMap&&r.enable(11),k.objectSpaceNormalMap&&r.enable(12),k.tangentSpaceNormalMap&&r.enable(13),k.clearcoat&&r.enable(14),k.clearcoatMap&&r.enable(15),k.clearcoatRoughnessMap&&r.enable(16),k.clearcoatNormalMap&&r.enable(17),k.iridescence&&r.enable(18),k.iridescenceMap&&r.enable(19),k.iridescenceThicknessMap&&r.enable(20),k.displacementMap&&r.enable(21),k.specularMap&&r.enable(22),k.roughnessMap&&r.enable(23),k.metalnessMap&&r.enable(24),k.gradientMap&&r.enable(25),k.alphaMap&&r.enable(26),k.alphaTest&&r.enable(27),k.vertexColors&&r.enable(28),k.vertexAlphas&&r.enable(29),k.vertexUvs&&r.enable(30),k.vertexTangents&&r.enable(31),k.uvsVertexOnly&&r.enable(32),A.push(r.mask),r.disableAll(),k.fog&&r.enable(0),k.useFog&&r.enable(1),k.flatShading&&r.enable(2),k.logarithmicDepthBuffer&&r.enable(3),k.skinning&&r.enable(4),k.morphTargets&&r.enable(5),k.morphNormals&&r.enable(6),k.morphColors&&r.enable(7),k.premultipliedAlpha&&r.enable(8),k.shadowMapEnabled&&r.enable(9),k.physicallyCorrectLights&&r.enable(10),k.doubleSided&&r.enable(11),k.flipSided&&r.enable(12),k.useDepthPacking&&r.enable(13),k.dithering&&r.enable(14),k.specularIntensityMap&&r.enable(15),k.specularColorMap&&r.enable(16),k.transmission&&r.enable(17),k.transmissionMap&&r.enable(18),k.thicknessMap&&r.enable(19),k.sheen&&r.enable(20),k.sheenColorMap&&r.enable(21),k.sheenRoughnessMap&&r.enable(22),k.decodeVideoTexture&&r.enable(23),k.opaque&&r.enable(24),A.push(r.mask)}function M(A){let k=g[A.type],T;if(k){let F=ze[k];T=Hl.clone(F.uniforms)}else T=A.uniforms;return T}function w(A,k){let T;for(let F=0,v=c.length;F<v;F++){let O=c[F];if(O.cacheKey===k){T=O,++T.usedTimes;break}}return T===void 0&&(T=new qd(a,k,A,s),c.push(T)),T}function S(A){if(--A.usedTimes===0){let k=c.indexOf(A);c[k]=c[c.length-1],c.pop(),A.destroy()}}function I(A){l.remove(A)}function D(){l.dispose()}return{getParameters:u,getProgramCacheKey:d,getUniforms:M,acquireProgram:w,releaseProgram:S,releaseShaderCache:I,programs:c,dispose:D}}function Jd(){let a=new WeakMap;function t(s){let o=a.get(s);return o===void 0&&(o={},a.set(s,o)),o}function e(s){a.delete(s)}function n(s,o,r){a.get(s)[o]=r}function i(){a=new WeakMap}return{get:t,remove:e,update:n,dispose:i}}function jd(a,t){return a.groupOrder!==t.groupOrder?a.groupOrder-t.groupOrder:a.renderOrder!==t.renderOrder?a.renderOrder-t.renderOrder:a.material.id!==t.material.id?a.material.id-t.material.id:a.z!==t.z?a.z-t.z:a.id-t.id}function Ka(a,t){return a.groupOrder!==t.groupOrder?a.groupOrder-t.groupOrder:a.renderOrder!==t.renderOrder?a.renderOrder-t.renderOrder:a.z!==t.z?t.z-a.z:a.id-t.id}function Qa(){let a=[],t=0,e=[],n=[],i=[];function s(){t=0,e.length=0,n.length=0,i.length=0}function o(h,f,m,g,u,d){let x=a[t];return x===void 0?(x={id:h.id,object:h,geometry:f,material:m,groupOrder:g,renderOrder:h.renderOrder,z:u,group:d},a[t]=x):(x.id=h.id,x.object=h,x.geometry=f,x.material=m,x.groupOrder=g,x.renderOrder=h.renderOrder,x.z=u,x.group=d),t++,x}function r(h,f,m,g,u,d){let x=o(h,f,m,g,u,d);m.transmission>0?n.push(x):m.transparent===!0?i.push(x):e.push(x)}function l(h,f,m,g,u,d){let x=o(h,f,m,g,u,d);m.transmission>0?n.unshift(x):m.transparent===!0?i.unshift(x):e.unshift(x)}function c(h,f){e.length>1&&e.sort(h||jd),n.length>1&&n.sort(f||Ka),i.length>1&&i.sort(f||Ka)}function p(){for(let h=t,f=a.length;h<f;h++){let m=a[h];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:n,transparent:i,init:s,push:r,unshift:l,finish:p,sort:c}}function $d(){let a=new WeakMap;function t(n,i){let s=a.get(n),o;return s===void 0?(o=new Qa,a.set(n,[o])):i>=s.length?(o=new Qa,s.push(o)):o=s[i],o}function e(){a=new WeakMap}return{get:t,dispose:e}}function Kd(){let a={};return{get:function(t){if(a[t.id]!==void 0)return a[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new $,color:new Gt};break;case"SpotLight":e={position:new $,direction:new $,color:new Gt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new $,color:new Gt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new $,skyColor:new Gt,groundColor:new Gt};break;case"RectAreaLight":e={color:new Gt,position:new $,halfWidth:new $,halfHeight:new $};break}return a[t.id]=e,e}}}function Qd(){let a={};return{get:function(t){if(a[t.id]!==void 0)return a[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new zt};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new zt};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new zt,shadowCameraNear:1,shadowCameraFar:1e3};break}return a[t.id]=e,e}}}var tf=0;function ef(a,t){return(t.castShadow?2:0)-(a.castShadow?2:0)+(t.map?1:0)-(a.map?1:0)}function nf(a,t){let e=new Kd,n=Qd(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0};for(let p=0;p<9;p++)i.probe.push(new $);let s=new $,o=new Qt,r=new Qt;function l(p,h){let f=0,m=0,g=0;for(let F=0;F<9;F++)i.probe[F].set(0,0,0);let u=0,d=0,x=0,y=0,M=0,w=0,S=0,I=0,D=0,A=0;p.sort(ef);let k=h!==!0?Math.PI:1;for(let F=0,v=p.length;F<v;F++){let O=p[F],B=O.color,U=O.intensity,nt=O.distance,G=O.shadow&&O.shadow.map?O.shadow.map.texture:null;if(O.isAmbientLight)f+=B.r*U*k,m+=B.g*U*k,g+=B.b*U*k;else if(O.isLightProbe)for(let J=0;J<9;J++)i.probe[J].addScaledVector(O.sh.coefficients[J],U);else if(O.isDirectionalLight){let J=e.get(O);if(J.color.copy(O.color).multiplyScalar(O.intensity*k),O.castShadow){let C=O.shadow,P=n.get(O);P.shadowBias=C.bias,P.shadowNormalBias=C.normalBias,P.shadowRadius=C.radius,P.shadowMapSize=C.mapSize,i.directionalShadow[u]=P,i.directionalShadowMap[u]=G,i.directionalShadowMatrix[u]=O.shadow.matrix,w++}i.directional[u]=J,u++}else if(O.isSpotLight){let J=e.get(O);J.position.setFromMatrixPosition(O.matrixWorld),J.color.copy(B).multiplyScalar(U*k),J.distance=nt,J.coneCos=Math.cos(O.angle),J.penumbraCos=Math.cos(O.angle*(1-O.penumbra)),J.decay=O.decay,i.spot[x]=J;let C=O.shadow;if(O.map&&(i.spotLightMap[D]=O.map,D++,C.updateMatrices(O),O.castShadow&&A++),i.spotLightMatrix[x]=C.matrix,O.castShadow){let P=n.get(O);P.shadowBias=C.bias,P.shadowNormalBias=C.normalBias,P.shadowRadius=C.radius,P.shadowMapSize=C.mapSize,i.spotShadow[x]=P,i.spotShadowMap[x]=G,I++}x++}else if(O.isRectAreaLight){let J=e.get(O);J.color.copy(B).multiplyScalar(U),J.halfWidth.set(O.width*.5,0,0),J.halfHeight.set(0,O.height*.5,0),i.rectArea[y]=J,y++}else if(O.isPointLight){let J=e.get(O);if(J.color.copy(O.color).multiplyScalar(O.intensity*k),J.distance=O.distance,J.decay=O.decay,O.castShadow){let C=O.shadow,P=n.get(O);P.shadowBias=C.bias,P.shadowNormalBias=C.normalBias,P.shadowRadius=C.radius,P.shadowMapSize=C.mapSize,P.shadowCameraNear=C.camera.near,P.shadowCameraFar=C.camera.far,i.pointShadow[d]=P,i.pointShadowMap[d]=G,i.pointShadowMatrix[d]=O.shadow.matrix,S++}i.point[d]=J,d++}else if(O.isHemisphereLight){let J=e.get(O);J.skyColor.copy(O.color).multiplyScalar(U*k),J.groundColor.copy(O.groundColor).multiplyScalar(U*k),i.hemi[M]=J,M++}}y>0&&(t.isWebGL2||a.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=_t.LTC_FLOAT_1,i.rectAreaLTC2=_t.LTC_FLOAT_2):a.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=_t.LTC_HALF_1,i.rectAreaLTC2=_t.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=f,i.ambient[1]=m,i.ambient[2]=g;let T=i.hash;(T.directionalLength!==u||T.pointLength!==d||T.spotLength!==x||T.rectAreaLength!==y||T.hemiLength!==M||T.numDirectionalShadows!==w||T.numPointShadows!==S||T.numSpotShadows!==I||T.numSpotMaps!==D)&&(i.directional.length=u,i.spot.length=x,i.rectArea.length=y,i.point.length=d,i.hemi.length=M,i.directionalShadow.length=w,i.directionalShadowMap.length=w,i.pointShadow.length=S,i.pointShadowMap.length=S,i.spotShadow.length=I,i.spotShadowMap.length=I,i.directionalShadowMatrix.length=w,i.pointShadowMatrix.length=S,i.spotLightMatrix.length=I+D-A,i.spotLightMap.length=D,i.numSpotLightShadowsWithMaps=A,T.directionalLength=u,T.pointLength=d,T.spotLength=x,T.rectAreaLength=y,T.hemiLength=M,T.numDirectionalShadows=w,T.numPointShadows=S,T.numSpotShadows=I,T.numSpotMaps=D,i.version=tf++)}function c(p,h){let f=0,m=0,g=0,u=0,d=0,x=h.matrixWorldInverse;for(let y=0,M=p.length;y<M;y++){let w=p[y];if(w.isDirectionalLight){let S=i.directional[f];S.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(x),f++}else if(w.isSpotLight){let S=i.spot[g];S.position.setFromMatrixPosition(w.matrixWorld),S.position.applyMatrix4(x),S.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(x),g++}else if(w.isRectAreaLight){let S=i.rectArea[u];S.position.setFromMatrixPosition(w.matrixWorld),S.position.applyMatrix4(x),r.identity(),o.copy(w.matrixWorld),o.premultiply(x),r.extractRotation(o),S.halfWidth.set(w.width*.5,0,0),S.halfHeight.set(0,w.height*.5,0),S.halfWidth.applyMatrix4(r),S.halfHeight.applyMatrix4(r),u++}else if(w.isPointLight){let S=i.point[m];S.position.setFromMatrixPosition(w.matrixWorld),S.position.applyMatrix4(x),m++}else if(w.isHemisphereLight){let S=i.hemi[d];S.direction.setFromMatrixPosition(w.matrixWorld),S.direction.transformDirection(x),d++}}}return{setup:l,setupView:c,state:i}}function to(a,t){let e=new nf(a,t),n=[],i=[];function s(){n.length=0,i.length=0}function o(h){n.push(h)}function r(h){i.push(h)}function l(h){e.setup(n,h)}function c(h){e.setupView(n,h)}return{init:s,state:{lightsArray:n,shadowsArray:i,lights:e},setupLights:l,setupLightsView:c,pushLight:o,pushShadow:r}}function sf(a,t){let e=new WeakMap;function n(s,o=0){let r=e.get(s),l;return r===void 0?(l=new to(a,t),e.set(s,[l])):o>=r.length?(l=new to(a,t),r.push(l)):l=r[o],l}function i(){e=new WeakMap}return{get:n,dispose:i}}var dr=class extends ni{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Al,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},fr=class extends ni{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.referencePosition=new $,this.nearDistance=1,this.farDistance=1e3,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.referencePosition.copy(t.referencePosition),this.nearDistance=t.nearDistance,this.farDistance=t.farDistance,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},rf=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,af=`uniform sampler2D shadow_pass;
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
}`;function of(a,t,e){let n=new is,i=new zt,s=new zt,o=new Kt,r=new dr({depthPacking:Tl}),l=new fr,c={},p=e.maxTextureSize,h={0:we,1:Kn,2:ke},f=new Le({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new zt},radius:{value:4}},vertexShader:rf,fragmentShader:af}),m=f.clone();m.defines.HORIZONTAL_PASS=1;let g=new Je;g.setAttribute("position",new Me(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let u=new be(g,f),d=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=eo,this.render=function(w,S,I){if(d.enabled===!1||d.autoUpdate===!1&&d.needsUpdate===!1||w.length===0)return;let D=a.getRenderTarget(),A=a.getActiveCubeFace(),k=a.getActiveMipmapLevel(),T=a.state;T.setBlending(ln),T.buffers.color.setClear(1,1,1,1),T.buffers.depth.setTest(!0),T.setScissorTest(!1);for(let F=0,v=w.length;F<v;F++){let O=w[F],B=O.shadow;if(B===void 0){console.warn("THREE.WebGLShadowMap:",O,"has no shadow.");continue}if(B.autoUpdate===!1&&B.needsUpdate===!1)continue;i.copy(B.mapSize);let U=B.getFrameExtents();if(i.multiply(U),s.copy(B.mapSize),(i.x>p||i.y>p)&&(i.x>p&&(s.x=Math.floor(p/U.x),i.x=s.x*U.x,B.mapSize.x=s.x),i.y>p&&(s.y=Math.floor(p/U.y),i.y=s.y*U.y,B.mapSize.y=s.y)),B.map===null){let G=this.type!==ui?{minFilter:ae,magFilter:ae}:{};B.map=new Ye(i.x,i.y,G),B.map.texture.name=O.name+".shadowMap",B.camera.updateProjectionMatrix()}a.setRenderTarget(B.map),a.clear();let nt=B.getViewportCount();for(let G=0;G<nt;G++){let J=B.getViewport(G);o.set(s.x*J.x,s.y*J.y,s.x*J.z,s.y*J.w),T.viewport(o),B.updateMatrices(O,G),n=B.getFrustum(),M(S,I,B.camera,O,this.type)}B.isPointLightShadow!==!0&&this.type===ui&&x(B,I),B.needsUpdate=!1}d.needsUpdate=!1,a.setRenderTarget(D,A,k)};function x(w,S){let I=t.update(u);f.defines.VSM_SAMPLES!==w.blurSamples&&(f.defines.VSM_SAMPLES=w.blurSamples,m.defines.VSM_SAMPLES=w.blurSamples,f.needsUpdate=!0,m.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Ye(i.x,i.y)),f.uniforms.shadow_pass.value=w.map.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,a.setRenderTarget(w.mapPass),a.clear(),a.renderBufferDirect(S,null,I,f,u,null),m.uniforms.shadow_pass.value=w.mapPass.texture,m.uniforms.resolution.value=w.mapSize,m.uniforms.radius.value=w.radius,a.setRenderTarget(w.map),a.clear(),a.renderBufferDirect(S,null,I,m,u,null)}function y(w,S,I,D,A,k){let T=null,F=I.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(F!==void 0?T=F:T=I.isPointLight===!0?l:r,a.localClippingEnabled&&S.clipShadows===!0&&Array.isArray(S.clippingPlanes)&&S.clippingPlanes.length!==0||S.displacementMap&&S.displacementScale!==0||S.alphaMap&&S.alphaTest>0){let v=T.uuid,O=S.uuid,B=c[v];B===void 0&&(B={},c[v]=B);let U=B[O];U===void 0&&(U=T.clone(),B[O]=U),T=U}return T.visible=S.visible,T.wireframe=S.wireframe,k===ui?T.side=S.shadowSide!==null?S.shadowSide:S.side:T.side=S.shadowSide!==null?S.shadowSide:h[S.side],T.alphaMap=S.alphaMap,T.alphaTest=S.alphaTest,T.clipShadows=S.clipShadows,T.clippingPlanes=S.clippingPlanes,T.clipIntersection=S.clipIntersection,T.displacementMap=S.displacementMap,T.displacementScale=S.displacementScale,T.displacementBias=S.displacementBias,T.wireframeLinewidth=S.wireframeLinewidth,T.linewidth=S.linewidth,I.isPointLight===!0&&T.isMeshDistanceMaterial===!0&&(T.referencePosition.setFromMatrixPosition(I.matrixWorld),T.nearDistance=D,T.farDistance=A),T}function M(w,S,I,D,A){if(w.visible===!1)return;if(w.layers.test(S.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&A===ui)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,w.matrixWorld);let F=t.update(w),v=w.material;if(Array.isArray(v)){let O=F.groups;for(let B=0,U=O.length;B<U;B++){let nt=O[B],G=v[nt.materialIndex];if(G&&G.visible){let J=y(w,G,D,I.near,I.far,A);a.renderBufferDirect(I,null,F,J,w,nt)}}}else if(v.visible){let O=y(w,v,D,I.near,I.far,A);a.renderBufferDirect(I,null,F,O,w,null)}}let T=w.children;for(let F=0,v=T.length;F<v;F++)M(T[F],S,I,D,A)}}function lf(a,t,e){let n=e.isWebGL2;function i(){let W=!1,vt=new Kt,mt=null,lt=new Kt(0,0,0,0);return{setMask:function(gt){mt!==gt&&!W&&(a.colorMask(gt,gt,gt,gt),mt=gt)},setLocked:function(gt){W=gt},setClear:function(gt,Rt,Ht,Yt,$e){$e===!0&&(gt*=Yt,Rt*=Yt,Ht*=Yt),vt.set(gt,Rt,Ht,Yt),lt.equals(vt)===!1&&(a.clearColor(gt,Rt,Ht,Yt),lt.copy(vt))},reset:function(){W=!1,mt=null,lt.set(-1,0,0,0)}}}function s(){let W=!1,vt=null,mt=null,lt=null;return{setTest:function(gt){gt?Tt(2929):Mt(2929)},setMask:function(gt){vt!==gt&&!W&&(a.depthMask(gt),vt=gt)},setFunc:function(gt){if(mt!==gt){switch(gt){case Jo:a.depthFunc(512);break;case jo:a.depthFunc(519);break;case $o:a.depthFunc(513);break;case Ys:a.depthFunc(515);break;case Ko:a.depthFunc(514);break;case Qo:a.depthFunc(518);break;case tl:a.depthFunc(516);break;case el:a.depthFunc(517);break;default:a.depthFunc(515)}mt=gt}},setLocked:function(gt){W=gt},setClear:function(gt){lt!==gt&&(a.clearDepth(gt),lt=gt)},reset:function(){W=!1,vt=null,mt=null,lt=null}}}function o(){let W=!1,vt=null,mt=null,lt=null,gt=null,Rt=null,Ht=null,Yt=null,$e=null;return{setTest:function(Xt){W||(Xt?Tt(2960):Mt(2960))},setMask:function(Xt){vt!==Xt&&!W&&(a.stencilMask(Xt),vt=Xt)},setFunc:function(Xt,Fe,_e){(mt!==Xt||lt!==Fe||gt!==_e)&&(a.stencilFunc(Xt,Fe,_e),mt=Xt,lt=Fe,gt=_e)},setOp:function(Xt,Fe,_e){(Rt!==Xt||Ht!==Fe||Yt!==_e)&&(a.stencilOp(Xt,Fe,_e),Rt=Xt,Ht=Fe,Yt=_e)},setLocked:function(Xt){W=Xt},setClear:function(Xt){$e!==Xt&&(a.clearStencil(Xt),$e=Xt)},reset:function(){W=!1,vt=null,mt=null,lt=null,gt=null,Rt=null,Ht=null,Yt=null,$e=null}}}let r=new i,l=new s,c=new o,p=new WeakMap,h=new WeakMap,f={},m={},g=new WeakMap,u=[],d=null,x=!1,y=null,M=null,w=null,S=null,I=null,D=null,A=null,k=!1,T=null,F=null,v=null,O=null,B=null,U=a.getParameter(35661),nt=!1,G=0,J=a.getParameter(7938);J.indexOf("WebGL")!==-1?(G=parseFloat(/^WebGL (\d)/.exec(J)[1]),nt=G>=1):J.indexOf("OpenGL ES")!==-1&&(G=parseFloat(/^OpenGL ES (\d)/.exec(J)[1]),nt=G>=2);let C=null,P={},it=a.getParameter(3088),Z=a.getParameter(2978),K=new Kt().fromArray(it),ft=new Kt().fromArray(Z);function At(W,vt,mt){let lt=new Uint8Array(4),gt=a.createTexture();a.bindTexture(W,gt),a.texParameteri(W,10241,9728),a.texParameteri(W,10240,9728);for(let Rt=0;Rt<mt;Rt++)a.texImage2D(vt+Rt,0,6408,1,1,0,6408,5121,lt);return gt}let et={};et[3553]=At(3553,3553,1),et[34067]=At(34067,34069,6),r.setClear(0,0,0,1),l.setClear(1),c.setClear(0),Tt(2929),l.setFunc(Ys),R(!1),V(Vr),Tt(2884),Q(ln);function Tt(W){f[W]!==!0&&(a.enable(W),f[W]=!0)}function Mt(W){f[W]!==!1&&(a.disable(W),f[W]=!1)}function bt(W,vt){return m[W]!==vt?(a.bindFramebuffer(W,vt),m[W]=vt,n&&(W===36009&&(m[36160]=vt),W===36160&&(m[36009]=vt)),!0):!1}function xt(W,vt){let mt=u,lt=!1;if(W)if(mt=g.get(vt),mt===void 0&&(mt=[],g.set(vt,mt)),W.isWebGLMultipleRenderTargets){let gt=W.texture;if(mt.length!==gt.length||mt[0]!==36064){for(let Rt=0,Ht=gt.length;Rt<Ht;Rt++)mt[Rt]=36064+Rt;mt.length=gt.length,lt=!0}}else mt[0]!==36064&&(mt[0]=36064,lt=!0);else mt[0]!==1029&&(mt[0]=1029,lt=!0);lt&&(e.isWebGL2?a.drawBuffers(mt):t.get("WEBGL_draw_buffers").drawBuffersWEBGL(mt))}function Dt(W){return d!==W?(a.useProgram(W),d=W,!0):!1}let _={[qn]:32774,[Fo]:32778,[Uo]:32779};if(n)_[Xr]=32775,_[qr]=32776;else{let W=t.get("EXT_blend_minmax");W!==null&&(_[Xr]=W.MIN_EXT,_[qr]=W.MAX_EXT)}let X={[Bo]:0,[Vo]:1,[Wo]:768,[no]:770,[Yo]:776,[qo]:774,[Go]:772,[Ho]:769,[io]:771,[Zo]:775,[Xo]:773};function Q(W,vt,mt,lt,gt,Rt,Ht,Yt){if(W===ln){x===!0&&(Mt(3042),x=!1);return}if(x===!1&&(Tt(3042),x=!0),W!==No){if(W!==y||Yt!==k){if((M!==qn||I!==qn)&&(a.blendEquation(32774),M=qn,I=qn),Yt)switch(W){case Jn:a.blendFuncSeparate(1,771,1,771);break;case Wr:a.blendFunc(1,1);break;case Hr:a.blendFuncSeparate(0,769,0,1);break;case Gr:a.blendFuncSeparate(0,768,0,770);break;default:console.error("THREE.WebGLState: Invalid blending: ",W);break}else switch(W){case Jn:a.blendFuncSeparate(770,771,1,771);break;case Wr:a.blendFunc(770,1);break;case Hr:a.blendFuncSeparate(0,769,0,1);break;case Gr:a.blendFunc(0,768);break;default:console.error("THREE.WebGLState: Invalid blending: ",W);break}w=null,S=null,D=null,A=null,y=W,k=Yt}return}gt=gt||vt,Rt=Rt||mt,Ht=Ht||lt,(vt!==M||gt!==I)&&(a.blendEquationSeparate(_[vt],_[gt]),M=vt,I=gt),(mt!==w||lt!==S||Rt!==D||Ht!==A)&&(a.blendFuncSeparate(X[mt],X[lt],X[Rt],X[Ht]),w=mt,S=lt,D=Rt,A=Ht),y=W,k=null}function z(W,vt){W.side===ke?Mt(2884):Tt(2884);let mt=W.side===we;vt&&(mt=!mt),R(mt),W.blending===Jn&&W.transparent===!1?Q(ln):Q(W.blending,W.blendEquation,W.blendSrc,W.blendDst,W.blendEquationAlpha,W.blendSrcAlpha,W.blendDstAlpha,W.premultipliedAlpha),l.setFunc(W.depthFunc),l.setTest(W.depthTest),l.setMask(W.depthWrite),r.setMask(W.colorWrite);let lt=W.stencilWrite;c.setTest(lt),lt&&(c.setMask(W.stencilWriteMask),c.setFunc(W.stencilFunc,W.stencilRef,W.stencilFuncMask),c.setOp(W.stencilFail,W.stencilZFail,W.stencilZPass)),st(W.polygonOffset,W.polygonOffsetFactor,W.polygonOffsetUnits),W.alphaToCoverage===!0?Tt(32926):Mt(32926)}function R(W){T!==W&&(W?a.frontFace(2304):a.frontFace(2305),T=W)}function V(W){W!==zo?(Tt(2884),W!==F&&(W===Vr?a.cullFace(1029):W===ko?a.cullFace(1028):a.cullFace(1032))):Mt(2884),F=W}function rt(W){W!==v&&(nt&&a.lineWidth(W),v=W)}function st(W,vt,mt){W?(Tt(32823),(O!==vt||B!==mt)&&(a.polygonOffset(vt,mt),O=vt,B=mt)):Mt(32823)}function q(W){W?Tt(3089):Mt(3089)}function ut(W){W===void 0&&(W=33984+U-1),C!==W&&(a.activeTexture(W),C=W)}function E(W,vt,mt){mt===void 0&&(C===null?mt=33984+U-1:mt=C);let lt=P[mt];lt===void 0&&(lt={type:void 0,texture:void 0},P[mt]=lt),(lt.type!==W||lt.texture!==vt)&&(C!==mt&&(a.activeTexture(mt),C=mt),a.bindTexture(W,vt||et[W]),lt.type=W,lt.texture=vt)}function b(){let W=P[C];W!==void 0&&W.type!==void 0&&(a.bindTexture(W.type,null),W.type=void 0,W.texture=void 0)}function H(){try{a.compressedTexImage2D.apply(a,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function ot(){try{a.texSubImage2D.apply(a,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function ht(){try{a.texSubImage3D.apply(a,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function pt(){try{a.compressedTexSubImage2D.apply(a,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function Et(){try{a.texStorage2D.apply(a,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function N(){try{a.texStorage3D.apply(a,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function Y(){try{a.texImage2D.apply(a,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function dt(){try{a.texImage3D.apply(a,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function wt(W){K.equals(W)===!1&&(a.scissor(W.x,W.y,W.z,W.w),K.copy(W))}function yt(W){ft.equals(W)===!1&&(a.viewport(W.x,W.y,W.z,W.w),ft.copy(W))}function St(W,vt){let mt=h.get(vt);mt===void 0&&(mt=new WeakMap,h.set(vt,mt));let lt=mt.get(W);lt===void 0&&(lt=a.getUniformBlockIndex(vt,W.name),mt.set(W,lt))}function Pt(W,vt){let lt=h.get(vt).get(W);p.get(W)!==lt&&(a.uniformBlockBinding(vt,lt,W.__bindingPointIndex),p.set(W,lt))}function Nt(){a.disable(3042),a.disable(2884),a.disable(2929),a.disable(32823),a.disable(3089),a.disable(2960),a.disable(32926),a.blendEquation(32774),a.blendFunc(1,0),a.blendFuncSeparate(1,0,1,0),a.colorMask(!0,!0,!0,!0),a.clearColor(0,0,0,0),a.depthMask(!0),a.depthFunc(513),a.clearDepth(1),a.stencilMask(4294967295),a.stencilFunc(519,0,4294967295),a.stencilOp(7680,7680,7680),a.clearStencil(0),a.cullFace(1029),a.frontFace(2305),a.polygonOffset(0,0),a.activeTexture(33984),a.bindFramebuffer(36160,null),n===!0&&(a.bindFramebuffer(36009,null),a.bindFramebuffer(36008,null)),a.useProgram(null),a.lineWidth(1),a.scissor(0,0,a.canvas.width,a.canvas.height),a.viewport(0,0,a.canvas.width,a.canvas.height),f={},C=null,P={},m={},g=new WeakMap,u=[],d=null,x=!1,y=null,M=null,w=null,S=null,I=null,D=null,A=null,k=!1,T=null,F=null,v=null,O=null,B=null,K.set(0,0,a.canvas.width,a.canvas.height),ft.set(0,0,a.canvas.width,a.canvas.height),r.reset(),l.reset(),c.reset()}return{buffers:{color:r,depth:l,stencil:c},enable:Tt,disable:Mt,bindFramebuffer:bt,drawBuffers:xt,useProgram:Dt,setBlending:Q,setMaterial:z,setFlipSided:R,setCullFace:V,setLineWidth:rt,setPolygonOffset:st,setScissorTest:q,activeTexture:ut,bindTexture:E,unbindTexture:b,compressedTexImage2D:H,texImage2D:Y,texImage3D:dt,updateUBOMapping:St,uniformBlockBinding:Pt,texStorage2D:Et,texStorage3D:N,texSubImage2D:ot,texSubImage3D:ht,compressedTexSubImage2D:pt,scissor:wt,viewport:yt,reset:Nt}}function cf(a,t,e,n,i,s,o){let r=i.isWebGL2,l=i.maxTextures,c=i.maxCubemapSize,p=i.maxTextureSize,h=i.maxSamples,f=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,m=/OculusBrowser/g.test(navigator.userAgent),g=new WeakMap,u,d=new WeakMap,x=!1;try{x=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch(E){}function y(E,b){return x?new OffscreenCanvas(E,b):Zi("canvas")}function M(E,b,H,ot){let ht=1;if((E.width>ot||E.height>ot)&&(ht=ot/Math.max(E.width,E.height)),ht<1||b===!0)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap){let pt=b?tr:Math.floor,Et=pt(ht*E.width),N=pt(ht*E.height);u===void 0&&(u=y(Et,N));let Y=H?y(Et,N):u;return Y.width=Et,Y.height=N,Y.getContext("2d").drawImage(E,0,0,Et,N),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+E.width+"x"+E.height+") to ("+Et+"x"+N+")."),Y}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+E.width+"x"+E.height+")."),E;return E}function w(E){return wa(E.width)&&wa(E.height)}function S(E){return r?!1:E.wrapS!==Ce||E.wrapT!==Ce||E.minFilter!==ae&&E.minFilter!==ye}function I(E,b){return E.generateMipmaps&&b&&E.minFilter!==ae&&E.minFilter!==ye}function D(E){a.generateMipmap(E)}function A(E,b,H,ot,ht=!1){if(r===!1)return b;if(E!==null){if(a[E]!==void 0)return a[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let pt=b;return b===6403&&(H===5126&&(pt=33326),H===5131&&(pt=33325),H===5121&&(pt=33321)),b===33319&&(H===5126&&(pt=33328),H===5131&&(pt=33327),H===5121&&(pt=33323)),b===6408&&(H===5126&&(pt=34836),H===5131&&(pt=34842),H===5121&&(pt=ot===Zt&&ht===!1?35907:32856),H===32819&&(pt=32854),H===32820&&(pt=32855)),(pt===33325||pt===33326||pt===33327||pt===33328||pt===34842||pt===34836)&&t.get("EXT_color_buffer_float"),pt}function k(E,b,H){return I(E,H)===!0||E.isFramebufferTexture&&E.minFilter!==ae&&E.minFilter!==ye?Math.log2(Math.max(b.width,b.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?b.mipmaps.length:1}function T(E){return E===ae||E===Zr||E===Yr?9728:9729}function F(E){let b=E.target;b.removeEventListener("dispose",F),O(b),b.isVideoTexture&&g.delete(b)}function v(E){let b=E.target;b.removeEventListener("dispose",v),U(b)}function O(E){let b=n.get(E);if(b.__webglInit===void 0)return;let H=E.source,ot=d.get(H);if(ot){let ht=ot[b.__cacheKey];ht.usedTimes--,ht.usedTimes===0&&B(E),Object.keys(ot).length===0&&d.delete(H)}n.remove(E)}function B(E){let b=n.get(E);a.deleteTexture(b.__webglTexture);let H=E.source,ot=d.get(H);delete ot[b.__cacheKey],o.memory.textures--}function U(E){let b=E.texture,H=n.get(E),ot=n.get(b);if(ot.__webglTexture!==void 0&&(a.deleteTexture(ot.__webglTexture),o.memory.textures--),E.depthTexture&&E.depthTexture.dispose(),E.isWebGLCubeRenderTarget)for(let ht=0;ht<6;ht++)a.deleteFramebuffer(H.__webglFramebuffer[ht]),H.__webglDepthbuffer&&a.deleteRenderbuffer(H.__webglDepthbuffer[ht]);else{if(a.deleteFramebuffer(H.__webglFramebuffer),H.__webglDepthbuffer&&a.deleteRenderbuffer(H.__webglDepthbuffer),H.__webglMultisampledFramebuffer&&a.deleteFramebuffer(H.__webglMultisampledFramebuffer),H.__webglColorRenderbuffer)for(let ht=0;ht<H.__webglColorRenderbuffer.length;ht++)H.__webglColorRenderbuffer[ht]&&a.deleteRenderbuffer(H.__webglColorRenderbuffer[ht]);H.__webglDepthRenderbuffer&&a.deleteRenderbuffer(H.__webglDepthRenderbuffer)}if(E.isWebGLMultipleRenderTargets)for(let ht=0,pt=b.length;ht<pt;ht++){let Et=n.get(b[ht]);Et.__webglTexture&&(a.deleteTexture(Et.__webglTexture),o.memory.textures--),n.remove(b[ht])}n.remove(b),n.remove(E)}let nt=0;function G(){nt=0}function J(){let E=nt;return E>=l&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+l),nt+=1,E}function C(E){let b=[];return b.push(E.wrapS),b.push(E.wrapT),b.push(E.magFilter),b.push(E.minFilter),b.push(E.anisotropy),b.push(E.internalFormat),b.push(E.format),b.push(E.type),b.push(E.generateMipmaps),b.push(E.premultiplyAlpha),b.push(E.flipY),b.push(E.unpackAlignment),b.push(E.encoding),b.join()}function P(E,b){let H=n.get(E);if(E.isVideoTexture&&q(E),E.isRenderTargetTexture===!1&&E.version>0&&H.__version!==E.version){let ot=E.image;if(ot===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ot.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Mt(H,E,b);return}}e.bindTexture(3553,H.__webglTexture,33984+b)}function it(E,b){let H=n.get(E);if(E.version>0&&H.__version!==E.version){Mt(H,E,b);return}e.bindTexture(35866,H.__webglTexture,33984+b)}function Z(E,b){let H=n.get(E);if(E.version>0&&H.__version!==E.version){Mt(H,E,b);return}e.bindTexture(32879,H.__webglTexture,33984+b)}function K(E,b){let H=n.get(E);if(E.version>0&&H.__version!==E.version){bt(H,E,b);return}e.bindTexture(34067,H.__webglTexture,33984+b)}let ft={[$s]:10497,[Ce]:33071,[Ks]:33648},At={[ae]:9728,[Zr]:9984,[Yr]:9986,[ye]:9729,[cl]:9985,[os]:9987};function et(E,b,H){if(H?(a.texParameteri(E,10242,ft[b.wrapS]),a.texParameteri(E,10243,ft[b.wrapT]),(E===32879||E===35866)&&a.texParameteri(E,32882,ft[b.wrapR]),a.texParameteri(E,10240,At[b.magFilter]),a.texParameteri(E,10241,At[b.minFilter])):(a.texParameteri(E,10242,33071),a.texParameteri(E,10243,33071),(E===32879||E===35866)&&a.texParameteri(E,32882,33071),(b.wrapS!==Ce||b.wrapT!==Ce)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),a.texParameteri(E,10240,T(b.magFilter)),a.texParameteri(E,10241,T(b.minFilter)),b.minFilter!==ae&&b.minFilter!==ye&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),t.has("EXT_texture_filter_anisotropic")===!0){let ot=t.get("EXT_texture_filter_anisotropic");if(b.type===_n&&t.has("OES_texture_float_linear")===!1||r===!1&&b.type===pi&&t.has("OES_texture_half_float_linear")===!1)return;(b.anisotropy>1||n.get(b).__currentAnisotropy)&&(a.texParameterf(E,ot.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,i.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy)}}function Tt(E,b){let H=!1;E.__webglInit===void 0&&(E.__webglInit=!0,b.addEventListener("dispose",F));let ot=b.source,ht=d.get(ot);ht===void 0&&(ht={},d.set(ot,ht));let pt=C(b);if(pt!==E.__cacheKey){ht[pt]===void 0&&(ht[pt]={texture:a.createTexture(),usedTimes:0},o.memory.textures++,H=!0),ht[pt].usedTimes++;let Et=ht[E.__cacheKey];Et!==void 0&&(ht[E.__cacheKey].usedTimes--,Et.usedTimes===0&&B(b)),E.__cacheKey=pt,E.__webglTexture=ht[pt].texture}return H}function Mt(E,b,H){let ot=3553;b.isDataArrayTexture&&(ot=35866),b.isData3DTexture&&(ot=32879);let ht=Tt(E,b),pt=b.source;e.bindTexture(ot,E.__webglTexture,33984+H);let Et=n.get(pt);if(pt.version!==Et.__version||ht===!0){e.activeTexture(33984+H),a.pixelStorei(37440,b.flipY),a.pixelStorei(37441,b.premultiplyAlpha),a.pixelStorei(3317,b.unpackAlignment),a.pixelStorei(37443,0);let N=S(b)&&w(b.image)===!1,Y=M(b.image,N,!1,p);Y=ut(b,Y);let dt=w(Y)||r,wt=s.convert(b.format,b.encoding),yt=s.convert(b.type),St=A(b.internalFormat,wt,yt,b.encoding,b.isVideoTexture);et(ot,b,dt);let Pt,Nt=b.mipmaps,W=r&&b.isVideoTexture!==!0,vt=Et.__version===void 0||ht===!0,mt=k(b,Y,dt);if(b.isDepthTexture)St=6402,r?b.type===_n?St=36012:b.type===gn?St=33190:b.type===jn?St=35056:St=33189:b.type===_n&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),b.format===vn&&St===6402&&b.type!==ao&&b.type!==gn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),b.type=gn,yt=s.convert(b.type)),b.format===ei&&St===6402&&(St=34041,b.type!==jn&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),b.type=jn,yt=s.convert(b.type))),vt&&(W?e.texStorage2D(3553,1,St,Y.width,Y.height):e.texImage2D(3553,0,St,Y.width,Y.height,0,wt,yt,null));else if(b.isDataTexture)if(Nt.length>0&&dt){W&&vt&&e.texStorage2D(3553,mt,St,Nt[0].width,Nt[0].height);for(let lt=0,gt=Nt.length;lt<gt;lt++)Pt=Nt[lt],W?e.texSubImage2D(3553,lt,0,0,Pt.width,Pt.height,wt,yt,Pt.data):e.texImage2D(3553,lt,St,Pt.width,Pt.height,0,wt,yt,Pt.data);b.generateMipmaps=!1}else W?(vt&&e.texStorage2D(3553,mt,St,Y.width,Y.height),e.texSubImage2D(3553,0,0,0,Y.width,Y.height,wt,yt,Y.data)):e.texImage2D(3553,0,St,Y.width,Y.height,0,wt,yt,Y.data);else if(b.isCompressedTexture){W&&vt&&e.texStorage2D(3553,mt,St,Nt[0].width,Nt[0].height);for(let lt=0,gt=Nt.length;lt<gt;lt++)Pt=Nt[lt],b.format!==Oe?wt!==null?W?e.compressedTexSubImage2D(3553,lt,0,0,Pt.width,Pt.height,wt,Pt.data):e.compressedTexImage2D(3553,lt,St,Pt.width,Pt.height,0,Pt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):W?e.texSubImage2D(3553,lt,0,0,Pt.width,Pt.height,wt,yt,Pt.data):e.texImage2D(3553,lt,St,Pt.width,Pt.height,0,wt,yt,Pt.data)}else if(b.isDataArrayTexture)W?(vt&&e.texStorage3D(35866,mt,St,Y.width,Y.height,Y.depth),e.texSubImage3D(35866,0,0,0,0,Y.width,Y.height,Y.depth,wt,yt,Y.data)):e.texImage3D(35866,0,St,Y.width,Y.height,Y.depth,0,wt,yt,Y.data);else if(b.isData3DTexture)W?(vt&&e.texStorage3D(32879,mt,St,Y.width,Y.height,Y.depth),e.texSubImage3D(32879,0,0,0,0,Y.width,Y.height,Y.depth,wt,yt,Y.data)):e.texImage3D(32879,0,St,Y.width,Y.height,Y.depth,0,wt,yt,Y.data);else if(b.isFramebufferTexture){if(vt)if(W)e.texStorage2D(3553,mt,St,Y.width,Y.height);else{let lt=Y.width,gt=Y.height;for(let Rt=0;Rt<mt;Rt++)e.texImage2D(3553,Rt,St,lt,gt,0,wt,yt,null),lt>>=1,gt>>=1}}else if(Nt.length>0&&dt){W&&vt&&e.texStorage2D(3553,mt,St,Nt[0].width,Nt[0].height);for(let lt=0,gt=Nt.length;lt<gt;lt++)Pt=Nt[lt],W?e.texSubImage2D(3553,lt,0,0,wt,yt,Pt):e.texImage2D(3553,lt,St,wt,yt,Pt);b.generateMipmaps=!1}else W?(vt&&e.texStorage2D(3553,mt,St,Y.width,Y.height),e.texSubImage2D(3553,0,0,0,wt,yt,Y)):e.texImage2D(3553,0,St,wt,yt,Y);I(b,dt)&&D(ot),Et.__version=pt.version,b.onUpdate&&b.onUpdate(b)}E.__version=b.version}function bt(E,b,H){if(b.image.length!==6)return;let ot=Tt(E,b),ht=b.source;e.bindTexture(34067,E.__webglTexture,33984+H);let pt=n.get(ht);if(ht.version!==pt.__version||ot===!0){e.activeTexture(33984+H),a.pixelStorei(37440,b.flipY),a.pixelStorei(37441,b.premultiplyAlpha),a.pixelStorei(3317,b.unpackAlignment),a.pixelStorei(37443,0);let Et=b.isCompressedTexture||b.image[0].isCompressedTexture,N=b.image[0]&&b.image[0].isDataTexture,Y=[];for(let lt=0;lt<6;lt++)!Et&&!N?Y[lt]=M(b.image[lt],!1,!0,c):Y[lt]=N?b.image[lt].image:b.image[lt],Y[lt]=ut(b,Y[lt]);let dt=Y[0],wt=w(dt)||r,yt=s.convert(b.format,b.encoding),St=s.convert(b.type),Pt=A(b.internalFormat,yt,St,b.encoding),Nt=r&&b.isVideoTexture!==!0,W=pt.__version===void 0||ot===!0,vt=k(b,dt,wt);et(34067,b,wt);let mt;if(Et){Nt&&W&&e.texStorage2D(34067,vt,Pt,dt.width,dt.height);for(let lt=0;lt<6;lt++){mt=Y[lt].mipmaps;for(let gt=0;gt<mt.length;gt++){let Rt=mt[gt];b.format!==Oe?yt!==null?Nt?e.compressedTexSubImage2D(34069+lt,gt,0,0,Rt.width,Rt.height,yt,Rt.data):e.compressedTexImage2D(34069+lt,gt,Pt,Rt.width,Rt.height,0,Rt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Nt?e.texSubImage2D(34069+lt,gt,0,0,Rt.width,Rt.height,yt,St,Rt.data):e.texImage2D(34069+lt,gt,Pt,Rt.width,Rt.height,0,yt,St,Rt.data)}}}else{mt=b.mipmaps,Nt&&W&&(mt.length>0&&vt++,e.texStorage2D(34067,vt,Pt,Y[0].width,Y[0].height));for(let lt=0;lt<6;lt++)if(N){Nt?e.texSubImage2D(34069+lt,0,0,0,Y[lt].width,Y[lt].height,yt,St,Y[lt].data):e.texImage2D(34069+lt,0,Pt,Y[lt].width,Y[lt].height,0,yt,St,Y[lt].data);for(let gt=0;gt<mt.length;gt++){let Ht=mt[gt].image[lt].image;Nt?e.texSubImage2D(34069+lt,gt+1,0,0,Ht.width,Ht.height,yt,St,Ht.data):e.texImage2D(34069+lt,gt+1,Pt,Ht.width,Ht.height,0,yt,St,Ht.data)}}else{Nt?e.texSubImage2D(34069+lt,0,0,0,yt,St,Y[lt]):e.texImage2D(34069+lt,0,Pt,yt,St,Y[lt]);for(let gt=0;gt<mt.length;gt++){let Rt=mt[gt];Nt?e.texSubImage2D(34069+lt,gt+1,0,0,yt,St,Rt.image[lt]):e.texImage2D(34069+lt,gt+1,Pt,yt,St,Rt.image[lt])}}}I(b,wt)&&D(34067),pt.__version=ht.version,b.onUpdate&&b.onUpdate(b)}E.__version=b.version}function xt(E,b,H,ot,ht){let pt=s.convert(H.format,H.encoding),Et=s.convert(H.type),N=A(H.internalFormat,pt,Et,H.encoding);n.get(b).__hasExternalTextures||(ht===32879||ht===35866?e.texImage3D(ht,0,N,b.width,b.height,b.depth,0,pt,Et,null):e.texImage2D(ht,0,N,b.width,b.height,0,pt,Et,null)),e.bindFramebuffer(36160,E),st(b)?f.framebufferTexture2DMultisampleEXT(36160,ot,ht,n.get(H).__webglTexture,0,rt(b)):a.framebufferTexture2D(36160,ot,ht,n.get(H).__webglTexture,0),e.bindFramebuffer(36160,null)}function Dt(E,b,H){if(a.bindRenderbuffer(36161,E),b.depthBuffer&&!b.stencilBuffer){let ot=33189;if(H||st(b)){let ht=b.depthTexture;ht&&ht.isDepthTexture&&(ht.type===_n?ot=36012:ht.type===gn&&(ot=33190));let pt=rt(b);st(b)?f.renderbufferStorageMultisampleEXT(36161,pt,ot,b.width,b.height):a.renderbufferStorageMultisample(36161,pt,ot,b.width,b.height)}else a.renderbufferStorage(36161,ot,b.width,b.height);a.framebufferRenderbuffer(36160,36096,36161,E)}else if(b.depthBuffer&&b.stencilBuffer){let ot=rt(b);H&&st(b)===!1?a.renderbufferStorageMultisample(36161,ot,35056,b.width,b.height):st(b)?f.renderbufferStorageMultisampleEXT(36161,ot,35056,b.width,b.height):a.renderbufferStorage(36161,34041,b.width,b.height),a.framebufferRenderbuffer(36160,33306,36161,E)}else{let ot=b.isWebGLMultipleRenderTargets===!0?b.texture:[b.texture];for(let ht=0;ht<ot.length;ht++){let pt=ot[ht],Et=s.convert(pt.format,pt.encoding),N=s.convert(pt.type),Y=A(pt.internalFormat,Et,N,pt.encoding),dt=rt(b);H&&st(b)===!1?a.renderbufferStorageMultisample(36161,dt,Y,b.width,b.height):st(b)?f.renderbufferStorageMultisampleEXT(36161,dt,Y,b.width,b.height):a.renderbufferStorage(36161,Y,b.width,b.height)}}a.bindRenderbuffer(36161,null)}function _(E,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(36160,E),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(b.depthTexture).__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),P(b.depthTexture,0);let ot=n.get(b.depthTexture).__webglTexture,ht=rt(b);if(b.depthTexture.format===vn)st(b)?f.framebufferTexture2DMultisampleEXT(36160,36096,3553,ot,0,ht):a.framebufferTexture2D(36160,36096,3553,ot,0);else if(b.depthTexture.format===ei)st(b)?f.framebufferTexture2DMultisampleEXT(36160,33306,3553,ot,0,ht):a.framebufferTexture2D(36160,33306,3553,ot,0);else throw new Error("Unknown depthTexture format")}function X(E){let b=n.get(E),H=E.isWebGLCubeRenderTarget===!0;if(E.depthTexture&&!b.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");_(b.__webglFramebuffer,E)}else if(H){b.__webglDepthbuffer=[];for(let ot=0;ot<6;ot++)e.bindFramebuffer(36160,b.__webglFramebuffer[ot]),b.__webglDepthbuffer[ot]=a.createRenderbuffer(),Dt(b.__webglDepthbuffer[ot],E,!1)}else e.bindFramebuffer(36160,b.__webglFramebuffer),b.__webglDepthbuffer=a.createRenderbuffer(),Dt(b.__webglDepthbuffer,E,!1);e.bindFramebuffer(36160,null)}function Q(E,b,H){let ot=n.get(E);b!==void 0&&xt(ot.__webglFramebuffer,E,E.texture,36064,3553),H!==void 0&&X(E)}function z(E){let b=E.texture,H=n.get(E),ot=n.get(b);E.addEventListener("dispose",v),E.isWebGLMultipleRenderTargets!==!0&&(ot.__webglTexture===void 0&&(ot.__webglTexture=a.createTexture()),ot.__version=b.version,o.memory.textures++);let ht=E.isWebGLCubeRenderTarget===!0,pt=E.isWebGLMultipleRenderTargets===!0,Et=w(E)||r;if(ht){H.__webglFramebuffer=[];for(let N=0;N<6;N++)H.__webglFramebuffer[N]=a.createFramebuffer()}else{if(H.__webglFramebuffer=a.createFramebuffer(),pt)if(i.drawBuffers){let N=E.texture;for(let Y=0,dt=N.length;Y<dt;Y++){let wt=n.get(N[Y]);wt.__webglTexture===void 0&&(wt.__webglTexture=a.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(r&&E.samples>0&&st(E)===!1){let N=pt?b:[b];H.__webglMultisampledFramebuffer=a.createFramebuffer(),H.__webglColorRenderbuffer=[],e.bindFramebuffer(36160,H.__webglMultisampledFramebuffer);for(let Y=0;Y<N.length;Y++){let dt=N[Y];H.__webglColorRenderbuffer[Y]=a.createRenderbuffer(),a.bindRenderbuffer(36161,H.__webglColorRenderbuffer[Y]);let wt=s.convert(dt.format,dt.encoding),yt=s.convert(dt.type),St=A(dt.internalFormat,wt,yt,dt.encoding,E.isXRRenderTarget===!0),Pt=rt(E);a.renderbufferStorageMultisample(36161,Pt,St,E.width,E.height),a.framebufferRenderbuffer(36160,36064+Y,36161,H.__webglColorRenderbuffer[Y])}a.bindRenderbuffer(36161,null),E.depthBuffer&&(H.__webglDepthRenderbuffer=a.createRenderbuffer(),Dt(H.__webglDepthRenderbuffer,E,!0)),e.bindFramebuffer(36160,null)}}if(ht){e.bindTexture(34067,ot.__webglTexture),et(34067,b,Et);for(let N=0;N<6;N++)xt(H.__webglFramebuffer[N],E,b,36064,34069+N);I(b,Et)&&D(34067),e.unbindTexture()}else if(pt){let N=E.texture;for(let Y=0,dt=N.length;Y<dt;Y++){let wt=N[Y],yt=n.get(wt);e.bindTexture(3553,yt.__webglTexture),et(3553,wt,Et),xt(H.__webglFramebuffer,E,wt,36064+Y,3553),I(wt,Et)&&D(3553)}e.unbindTexture()}else{let N=3553;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(r?N=E.isWebGL3DRenderTarget?32879:35866:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),e.bindTexture(N,ot.__webglTexture),et(N,b,Et),xt(H.__webglFramebuffer,E,b,36064,N),I(b,Et)&&D(N),e.unbindTexture()}E.depthBuffer&&X(E)}function R(E){let b=w(E)||r,H=E.isWebGLMultipleRenderTargets===!0?E.texture:[E.texture];for(let ot=0,ht=H.length;ot<ht;ot++){let pt=H[ot];if(I(pt,b)){let Et=E.isWebGLCubeRenderTarget?34067:3553,N=n.get(pt).__webglTexture;e.bindTexture(Et,N),D(Et),e.unbindTexture()}}}function V(E){if(r&&E.samples>0&&st(E)===!1){let b=E.isWebGLMultipleRenderTargets?E.texture:[E.texture],H=E.width,ot=E.height,ht=16384,pt=[],Et=E.stencilBuffer?33306:36096,N=n.get(E),Y=E.isWebGLMultipleRenderTargets===!0;if(Y)for(let dt=0;dt<b.length;dt++)e.bindFramebuffer(36160,N.__webglMultisampledFramebuffer),a.framebufferRenderbuffer(36160,36064+dt,36161,null),e.bindFramebuffer(36160,N.__webglFramebuffer),a.framebufferTexture2D(36009,36064+dt,3553,null,0);e.bindFramebuffer(36008,N.__webglMultisampledFramebuffer),e.bindFramebuffer(36009,N.__webglFramebuffer);for(let dt=0;dt<b.length;dt++){pt.push(36064+dt),E.depthBuffer&&pt.push(Et);let wt=N.__ignoreDepthValues!==void 0?N.__ignoreDepthValues:!1;if(wt===!1&&(E.depthBuffer&&(ht|=256),E.stencilBuffer&&(ht|=1024)),Y&&a.framebufferRenderbuffer(36008,36064,36161,N.__webglColorRenderbuffer[dt]),wt===!0&&(a.invalidateFramebuffer(36008,[Et]),a.invalidateFramebuffer(36009,[Et])),Y){let yt=n.get(b[dt]).__webglTexture;a.framebufferTexture2D(36009,36064,3553,yt,0)}a.blitFramebuffer(0,0,H,ot,0,0,H,ot,ht,9728),m&&a.invalidateFramebuffer(36008,pt)}if(e.bindFramebuffer(36008,null),e.bindFramebuffer(36009,null),Y)for(let dt=0;dt<b.length;dt++){e.bindFramebuffer(36160,N.__webglMultisampledFramebuffer),a.framebufferRenderbuffer(36160,36064+dt,36161,N.__webglColorRenderbuffer[dt]);let wt=n.get(b[dt]).__webglTexture;e.bindFramebuffer(36160,N.__webglFramebuffer),a.framebufferTexture2D(36009,36064+dt,3553,wt,0)}e.bindFramebuffer(36009,N.__webglMultisampledFramebuffer)}}function rt(E){return Math.min(h,E.samples)}function st(E){let b=n.get(E);return r&&E.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function q(E){let b=o.render.frame;g.get(E)!==b&&(g.set(E,b),E.update())}function ut(E,b){let H=E.encoding,ot=E.format,ht=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||E.format===Qs||H!==wn&&(H===Zt?r===!1?t.has("EXT_sRGB")===!0&&ot===Oe?(E.format=Qs,E.minFilter=ye,E.generateMipmaps=!1):b=Yi.sRGBToLinear(b):(ot!==Oe||ht!==bn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture encoding:",H)),b}this.allocateTextureUnit=J,this.resetTextureUnits=G,this.setTexture2D=P,this.setTexture2DArray=it,this.setTexture3D=Z,this.setTextureCube=K,this.rebindTextures=Q,this.setupRenderTarget=z,this.updateRenderTargetMipmap=R,this.updateMultisampleRenderTarget=V,this.setupDepthRenderbuffer=X,this.setupFrameBufferTexture=xt,this.useMultisampledRTT=st}function hf(a,t,e){let n=e.isWebGL2;function i(s,o=null){let r;if(s===bn)return 5121;if(s===fl)return 32819;if(s===pl)return 32820;if(s===hl)return 5120;if(s===ul)return 5122;if(s===ao)return 5123;if(s===dl)return 5124;if(s===gn)return 5125;if(s===_n)return 5126;if(s===pi)return n?5131:(r=t.get("OES_texture_half_float"),r!==null?r.HALF_FLOAT_OES:null);if(s===ml)return 6406;if(s===Oe)return 6408;if(s===_l)return 6409;if(s===xl)return 6410;if(s===vn)return 6402;if(s===ei)return 34041;if(s===vl)return 6403;if(s===gl)return console.warn("THREE.WebGLRenderer: THREE.RGBFormat has been removed. Use THREE.RGBAFormat instead. https://github.com/mrdoob/three.js/pull/23228"),6408;if(s===Qs)return r=t.get("EXT_sRGB"),r!==null?r.SRGB_ALPHA_EXT:null;if(s===yl)return 36244;if(s===bl)return 33319;if(s===wl)return 33320;if(s===Ml)return 36249;if(s===gs||s===_s||s===xs||s===vs)if(o===Zt)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(s===gs)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===_s)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===xs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===vs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(s===gs)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===_s)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===xs)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===vs)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Jr||s===jr||s===$r||s===Kr)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(s===Jr)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===jr)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===$r)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Kr)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Sl)return r=t.get("WEBGL_compressed_texture_etc1"),r!==null?r.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===Qr||s===ta)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(s===Qr)return o===Zt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(s===ta)return o===Zt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===ea||s===na||s===ia||s===sa||s===ra||s===aa||s===oa||s===la||s===ca||s===ha||s===ua||s===da||s===fa||s===pa)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(s===ea)return o===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===na)return o===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===ia)return o===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===sa)return o===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===ra)return o===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===aa)return o===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===oa)return o===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===la)return o===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===ca)return o===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===ha)return o===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===ua)return o===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===da)return o===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===fa)return o===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===pa)return o===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===ma)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(s===ma)return o===Zt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT}else return null;return s===jn?n?34042:(r=t.get("WEBGL_depth_texture"),r!==null?r.UNSIGNED_INT_24_8_WEBGL:null):a[s]!==void 0?a[s]:null}return{convert:i}}var pr=class extends le{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},Yn=class extends ce{constructor(){super(),this.isGroup=!0,this.type="Group"}},uf={type:"move"},fi=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Yn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Yn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new $,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new $),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Yn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new $,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new $),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,s=null,o=null,r=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(let u of t.hand.values()){let d=e.getJointPose(u,n);if(c.joints[u.jointName]===void 0){let y=new Yn;y.matrixAutoUpdate=!1,y.visible=!1,c.joints[u.jointName]=y,c.add(y)}let x=c.joints[u.jointName];d!==null&&(x.matrix.fromArray(d.transform.matrix),x.matrix.decompose(x.position,x.rotation,x.scale),x.jointRadius=d.radius),x.visible=d!==null}let p=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=p.position.distanceTo(h.position),m=.02,g=.005;c.inputState.pinching&&f>m+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=m-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));r!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(r.matrix.fromArray(i.transform.matrix),r.matrix.decompose(r.position,r.rotation,r.scale),i.linearVelocity?(r.hasLinearVelocity=!0,r.linearVelocity.copy(i.linearVelocity)):r.hasLinearVelocity=!1,i.angularVelocity?(r.hasAngularVelocity=!0,r.angularVelocity.copy(i.angularVelocity)):r.hasAngularVelocity=!1,this.dispatchEvent(uf)))}return r!==null&&(r.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}},mr=class extends de{constructor(t,e,n,i,s,o,r,l,c,p){if(p=p!==void 0?p:vn,p!==vn&&p!==ei)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&p===vn&&(n=gn),n===void 0&&p===ei&&(n=jn),super(null,i,s,o,r,l,p,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=r!==void 0?r:ae,this.minFilter=l!==void 0?l:ae,this.flipY=!1,this.generateMipmaps=!1}},gr=class extends Ne{constructor(t,e){super();let n=this,i=null,s=1,o=null,r="local-floor",l=null,c=null,p=null,h=null,f=null,m=null,g=e.getContextAttributes(),u=null,d=null,x=[],y=[],M=new le;M.layers.enable(1),M.viewport=new Kt;let w=new le;w.layers.enable(2),w.viewport=new Kt;let S=[M,w],I=new pr;I.layers.enable(1),I.layers.enable(2);let D=null,A=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(C){let P=x[C];return P===void 0&&(P=new fi,x[C]=P),P.getTargetRaySpace()},this.getControllerGrip=function(C){let P=x[C];return P===void 0&&(P=new fi,x[C]=P),P.getGripSpace()},this.getHand=function(C){let P=x[C];return P===void 0&&(P=new fi,x[C]=P),P.getHandSpace()};function k(C){let P=y.indexOf(C.inputSource);if(P===-1)return;let it=x[P];it!==void 0&&it.dispatchEvent({type:C.type,data:C.inputSource})}function T(){i.removeEventListener("select",k),i.removeEventListener("selectstart",k),i.removeEventListener("selectend",k),i.removeEventListener("squeeze",k),i.removeEventListener("squeezestart",k),i.removeEventListener("squeezeend",k),i.removeEventListener("end",T),i.removeEventListener("inputsourceschange",F);for(let C=0;C<x.length;C++){let P=y[C];P!==null&&(y[C]=null,x[C].disconnect(P))}D=null,A=null,t.setRenderTarget(u),f=null,h=null,p=null,i=null,d=null,J.stop(),n.isPresenting=!1,n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(C){s=C,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(C){r=C,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(C){l=C},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return p},this.getFrame=function(){return m},this.getSession=function(){return i},this.setSession=async function(C){if(i=C,i!==null){if(u=t.getRenderTarget(),i.addEventListener("select",k),i.addEventListener("selectstart",k),i.addEventListener("selectend",k),i.addEventListener("squeeze",k),i.addEventListener("squeezestart",k),i.addEventListener("squeezeend",k),i.addEventListener("end",T),i.addEventListener("inputsourceschange",F),g.xrCompatible!==!0&&await e.makeXRCompatible(),i.renderState.layers===void 0||t.capabilities.isWebGL2===!1){let P={antialias:i.renderState.layers===void 0?g.antialias:!0,alpha:g.alpha,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,e,P),i.updateRenderState({baseLayer:f}),d=new Ye(f.framebufferWidth,f.framebufferHeight,{format:Oe,type:bn,encoding:t.outputEncoding,stencilBuffer:g.stencil})}else{let P=null,it=null,Z=null;g.depth&&(Z=g.stencil?35056:33190,P=g.stencil?ei:vn,it=g.stencil?jn:gn);let K={colorFormat:32856,depthFormat:Z,scaleFactor:s};p=new XRWebGLBinding(i,e),h=p.createProjectionLayer(K),i.updateRenderState({layers:[h]}),d=new Ye(h.textureWidth,h.textureHeight,{format:Oe,type:bn,depthTexture:new mr(h.textureWidth,h.textureHeight,it,void 0,void 0,void 0,void 0,void 0,void 0,P),stencilBuffer:g.stencil,encoding:t.outputEncoding,samples:g.antialias?4:0});let ft=t.properties.get(d);ft.__ignoreDepthValues=h.ignoreDepthValues}d.isXRRenderTarget=!0,this.setFoveation(1),l=null,o=await i.requestReferenceSpace(r),J.setContext(i),J.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}};function F(C){for(let P=0;P<C.removed.length;P++){let it=C.removed[P],Z=y.indexOf(it);Z>=0&&(y[Z]=null,x[Z].dispatchEvent({type:"disconnected",data:it}))}for(let P=0;P<C.added.length;P++){let it=C.added[P],Z=y.indexOf(it);if(Z===-1){for(let ft=0;ft<x.length;ft++)if(ft>=y.length){y.push(it),Z=ft;break}else if(y[ft]===null){y[ft]=it,Z=ft;break}if(Z===-1)break}let K=x[Z];K&&K.dispatchEvent({type:"connected",data:it})}}let v=new $,O=new $;function B(C,P,it){v.setFromMatrixPosition(P.matrixWorld),O.setFromMatrixPosition(it.matrixWorld);let Z=v.distanceTo(O),K=P.projectionMatrix.elements,ft=it.projectionMatrix.elements,At=K[14]/(K[10]-1),et=K[14]/(K[10]+1),Tt=(K[9]+1)/K[5],Mt=(K[9]-1)/K[5],bt=(K[8]-1)/K[0],xt=(ft[8]+1)/ft[0],Dt=At*bt,_=At*xt,X=Z/(-bt+xt),Q=X*-bt;P.matrixWorld.decompose(C.position,C.quaternion,C.scale),C.translateX(Q),C.translateZ(X),C.matrixWorld.compose(C.position,C.quaternion,C.scale),C.matrixWorldInverse.copy(C.matrixWorld).invert();let z=At+X,R=et+X,V=Dt-Q,rt=_+(Z-Q),st=Tt*et/R*z,q=Mt*et/R*z;C.projectionMatrix.makePerspective(V,rt,st,q,z,R)}function U(C,P){P===null?C.matrixWorld.copy(C.matrix):C.matrixWorld.multiplyMatrices(P.matrixWorld,C.matrix),C.matrixWorldInverse.copy(C.matrixWorld).invert()}this.updateCamera=function(C){if(i===null)return;I.near=w.near=M.near=C.near,I.far=w.far=M.far=C.far,(D!==I.near||A!==I.far)&&(i.updateRenderState({depthNear:I.near,depthFar:I.far}),D=I.near,A=I.far);let P=C.parent,it=I.cameras;U(I,P);for(let K=0;K<it.length;K++)U(it[K],P);I.matrixWorld.decompose(I.position,I.quaternion,I.scale),C.matrix.copy(I.matrix),C.matrix.decompose(C.position,C.quaternion,C.scale);let Z=C.children;for(let K=0,ft=Z.length;K<ft;K++)Z[K].updateMatrixWorld(!0);it.length===2?B(I,M,w):I.projectionMatrix.copy(M.projectionMatrix)},this.getCamera=function(){return I},this.getFoveation=function(){if(h!==null)return h.fixedFoveation;if(f!==null)return f.fixedFoveation},this.setFoveation=function(C){h!==null&&(h.fixedFoveation=C),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=C)};let nt=null;function G(C,P){if(c=P.getViewerPose(l||o),m=P,c!==null){let it=c.views;f!==null&&(t.setRenderTargetFramebuffer(d,f.framebuffer),t.setRenderTarget(d));let Z=!1;it.length!==I.cameras.length&&(I.cameras.length=0,Z=!0);for(let K=0;K<it.length;K++){let ft=it[K],At=null;if(f!==null)At=f.getViewport(ft);else{let Tt=p.getViewSubImage(h,ft);At=Tt.viewport,K===0&&(t.setRenderTargetTextures(d,Tt.colorTexture,h.ignoreDepthValues?void 0:Tt.depthStencilTexture),t.setRenderTarget(d))}let et=S[K];et===void 0&&(et=new le,et.layers.enable(K),et.viewport=new Kt,S[K]=et),et.matrix.fromArray(ft.transform.matrix),et.projectionMatrix.fromArray(ft.projectionMatrix),et.viewport.set(At.x,At.y,At.width,At.height),K===0&&I.matrix.copy(et.matrix),Z===!0&&I.cameras.push(et)}}for(let it=0;it<x.length;it++){let Z=y[it],K=x[it];Z!==null&&K!==void 0&&K.update(Z,P,l||o)}nt&&nt(C,P),m=null}let J=new co;J.setAnimationLoop(G),this.setAnimationLoop=function(C){nt=C},this.dispose=function(){}}};function df(a,t){function e(u,d){u.fogColor.value.copy(d.color),d.isFog?(u.fogNear.value=d.near,u.fogFar.value=d.far):d.isFogExp2&&(u.fogDensity.value=d.density)}function n(u,d,x,y,M){d.isMeshBasicMaterial||d.isMeshLambertMaterial?i(u,d):d.isMeshToonMaterial?(i(u,d),p(u,d)):d.isMeshPhongMaterial?(i(u,d),c(u,d)):d.isMeshStandardMaterial?(i(u,d),h(u,d),d.isMeshPhysicalMaterial&&f(u,d,M)):d.isMeshMatcapMaterial?(i(u,d),m(u,d)):d.isMeshDepthMaterial?i(u,d):d.isMeshDistanceMaterial?(i(u,d),g(u,d)):d.isMeshNormalMaterial?i(u,d):d.isLineBasicMaterial?(s(u,d),d.isLineDashedMaterial&&o(u,d)):d.isPointsMaterial?r(u,d,x,y):d.isSpriteMaterial?l(u,d):d.isShadowMaterial?(u.color.value.copy(d.color),u.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function i(u,d){u.opacity.value=d.opacity,d.color&&u.diffuse.value.copy(d.color),d.emissive&&u.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(u.map.value=d.map),d.alphaMap&&(u.alphaMap.value=d.alphaMap),d.bumpMap&&(u.bumpMap.value=d.bumpMap,u.bumpScale.value=d.bumpScale,d.side===we&&(u.bumpScale.value*=-1)),d.displacementMap&&(u.displacementMap.value=d.displacementMap,u.displacementScale.value=d.displacementScale,u.displacementBias.value=d.displacementBias),d.emissiveMap&&(u.emissiveMap.value=d.emissiveMap),d.normalMap&&(u.normalMap.value=d.normalMap,u.normalScale.value.copy(d.normalScale),d.side===we&&u.normalScale.value.negate()),d.specularMap&&(u.specularMap.value=d.specularMap),d.alphaTest>0&&(u.alphaTest.value=d.alphaTest);let x=t.get(d).envMap;if(x&&(u.envMap.value=x,u.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,u.reflectivity.value=d.reflectivity,u.ior.value=d.ior,u.refractionRatio.value=d.refractionRatio),d.lightMap){u.lightMap.value=d.lightMap;let w=a.physicallyCorrectLights!==!0?Math.PI:1;u.lightMapIntensity.value=d.lightMapIntensity*w}d.aoMap&&(u.aoMap.value=d.aoMap,u.aoMapIntensity.value=d.aoMapIntensity);let y;d.map?y=d.map:d.specularMap?y=d.specularMap:d.displacementMap?y=d.displacementMap:d.normalMap?y=d.normalMap:d.bumpMap?y=d.bumpMap:d.roughnessMap?y=d.roughnessMap:d.metalnessMap?y=d.metalnessMap:d.alphaMap?y=d.alphaMap:d.emissiveMap?y=d.emissiveMap:d.clearcoatMap?y=d.clearcoatMap:d.clearcoatNormalMap?y=d.clearcoatNormalMap:d.clearcoatRoughnessMap?y=d.clearcoatRoughnessMap:d.iridescenceMap?y=d.iridescenceMap:d.iridescenceThicknessMap?y=d.iridescenceThicknessMap:d.specularIntensityMap?y=d.specularIntensityMap:d.specularColorMap?y=d.specularColorMap:d.transmissionMap?y=d.transmissionMap:d.thicknessMap?y=d.thicknessMap:d.sheenColorMap?y=d.sheenColorMap:d.sheenRoughnessMap&&(y=d.sheenRoughnessMap),y!==void 0&&(y.isWebGLRenderTarget&&(y=y.texture),y.matrixAutoUpdate===!0&&y.updateMatrix(),u.uvTransform.value.copy(y.matrix));let M;d.aoMap?M=d.aoMap:d.lightMap&&(M=d.lightMap),M!==void 0&&(M.isWebGLRenderTarget&&(M=M.texture),M.matrixAutoUpdate===!0&&M.updateMatrix(),u.uv2Transform.value.copy(M.matrix))}function s(u,d){u.diffuse.value.copy(d.color),u.opacity.value=d.opacity}function o(u,d){u.dashSize.value=d.dashSize,u.totalSize.value=d.dashSize+d.gapSize,u.scale.value=d.scale}function r(u,d,x,y){u.diffuse.value.copy(d.color),u.opacity.value=d.opacity,u.size.value=d.size*x,u.scale.value=y*.5,d.map&&(u.map.value=d.map),d.alphaMap&&(u.alphaMap.value=d.alphaMap),d.alphaTest>0&&(u.alphaTest.value=d.alphaTest);let M;d.map?M=d.map:d.alphaMap&&(M=d.alphaMap),M!==void 0&&(M.matrixAutoUpdate===!0&&M.updateMatrix(),u.uvTransform.value.copy(M.matrix))}function l(u,d){u.diffuse.value.copy(d.color),u.opacity.value=d.opacity,u.rotation.value=d.rotation,d.map&&(u.map.value=d.map),d.alphaMap&&(u.alphaMap.value=d.alphaMap),d.alphaTest>0&&(u.alphaTest.value=d.alphaTest);let x;d.map?x=d.map:d.alphaMap&&(x=d.alphaMap),x!==void 0&&(x.matrixAutoUpdate===!0&&x.updateMatrix(),u.uvTransform.value.copy(x.matrix))}function c(u,d){u.specular.value.copy(d.specular),u.shininess.value=Math.max(d.shininess,1e-4)}function p(u,d){d.gradientMap&&(u.gradientMap.value=d.gradientMap)}function h(u,d){u.roughness.value=d.roughness,u.metalness.value=d.metalness,d.roughnessMap&&(u.roughnessMap.value=d.roughnessMap),d.metalnessMap&&(u.metalnessMap.value=d.metalnessMap),t.get(d).envMap&&(u.envMapIntensity.value=d.envMapIntensity)}function f(u,d,x){u.ior.value=d.ior,d.sheen>0&&(u.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),u.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(u.sheenColorMap.value=d.sheenColorMap),d.sheenRoughnessMap&&(u.sheenRoughnessMap.value=d.sheenRoughnessMap)),d.clearcoat>0&&(u.clearcoat.value=d.clearcoat,u.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(u.clearcoatMap.value=d.clearcoatMap),d.clearcoatRoughnessMap&&(u.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap),d.clearcoatNormalMap&&(u.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),u.clearcoatNormalMap.value=d.clearcoatNormalMap,d.side===we&&u.clearcoatNormalScale.value.negate())),d.iridescence>0&&(u.iridescence.value=d.iridescence,u.iridescenceIOR.value=d.iridescenceIOR,u.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],u.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(u.iridescenceMap.value=d.iridescenceMap),d.iridescenceThicknessMap&&(u.iridescenceThicknessMap.value=d.iridescenceThicknessMap)),d.transmission>0&&(u.transmission.value=d.transmission,u.transmissionSamplerMap.value=x.texture,u.transmissionSamplerSize.value.set(x.width,x.height),d.transmissionMap&&(u.transmissionMap.value=d.transmissionMap),u.thickness.value=d.thickness,d.thicknessMap&&(u.thicknessMap.value=d.thicknessMap),u.attenuationDistance.value=d.attenuationDistance,u.attenuationColor.value.copy(d.attenuationColor)),u.specularIntensity.value=d.specularIntensity,u.specularColor.value.copy(d.specularColor),d.specularIntensityMap&&(u.specularIntensityMap.value=d.specularIntensityMap),d.specularColorMap&&(u.specularColorMap.value=d.specularColorMap)}function m(u,d){d.matcap&&(u.matcap.value=d.matcap)}function g(u,d){u.referencePosition.value.copy(d.referencePosition),u.nearDistance.value=d.nearDistance,u.farDistance.value=d.farDistance}return{refreshFogUniforms:e,refreshMaterialUniforms:n}}function ff(a,t,e,n){let i={},s={},o=[],r=e.isWebGL2?a.getParameter(35375):0;function l(y,M){let w=M.program;n.uniformBlockBinding(y,w)}function c(y,M){let w=i[y.id];w===void 0&&(g(y),w=p(y),i[y.id]=w,y.addEventListener("dispose",d));let S=M.program;n.updateUBOMapping(y,S);let I=t.render.frame;s[y.id]!==I&&(f(y),s[y.id]=I)}function p(y){let M=h();y.__bindingPointIndex=M;let w=a.createBuffer(),S=y.__size,I=y.usage;return a.bindBuffer(35345,w),a.bufferData(35345,S,I),a.bindBuffer(35345,null),a.bindBufferBase(35345,M,w),w}function h(){for(let y=0;y<r;y++)if(o.indexOf(y)===-1)return o.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(y){let M=i[y.id],w=y.uniforms,S=y.__cache;a.bindBuffer(35345,M);for(let I=0,D=w.length;I<D;I++){let A=w[I];if(m(A,I,S)===!0){let k=A.value,T=A.__offset;typeof k=="number"?(A.__data[0]=k,a.bufferSubData(35345,T,A.__data)):(A.value.isMatrix3?(A.__data[0]=A.value.elements[0],A.__data[1]=A.value.elements[1],A.__data[2]=A.value.elements[2],A.__data[3]=A.value.elements[0],A.__data[4]=A.value.elements[3],A.__data[5]=A.value.elements[4],A.__data[6]=A.value.elements[5],A.__data[7]=A.value.elements[0],A.__data[8]=A.value.elements[6],A.__data[9]=A.value.elements[7],A.__data[10]=A.value.elements[8],A.__data[11]=A.value.elements[0]):k.toArray(A.__data),a.bufferSubData(35345,T,A.__data))}}a.bindBuffer(35345,null)}function m(y,M,w){let S=y.value;if(w[M]===void 0)return typeof S=="number"?w[M]=S:w[M]=S.clone(),!0;if(typeof S=="number"){if(w[M]!==S)return w[M]=S,!0}else{let I=w[M];if(I.equals(S)===!1)return I.copy(S),!0}return!1}function g(y){let M=y.uniforms,w=0,S=16,I=0;for(let D=0,A=M.length;D<A;D++){let k=M[D],T=u(k);if(k.__data=new Float32Array(T.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=w,D>0){I=w%S;let F=S-I;I!==0&&F-T.boundary<0&&(w+=S-I,k.__offset=w)}w+=T.storage}return I=w%S,I>0&&(w+=S-I),y.__size=w,y.__cache={},this}function u(y){let M=y.value,w={boundary:0,storage:0};return typeof M=="number"?(w.boundary=4,w.storage=4):M.isVector2?(w.boundary=8,w.storage=8):M.isVector3||M.isColor?(w.boundary=16,w.storage=12):M.isVector4?(w.boundary=16,w.storage=16):M.isMatrix3?(w.boundary=48,w.storage=48):M.isMatrix4?(w.boundary=64,w.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),w}function d(y){let M=y.target;M.removeEventListener("dispose",d);let w=o.indexOf(M.__bindingPointIndex);o.splice(w,1),a.deleteBuffer(i[M.id]),delete i[M.id],delete s[M.id]}function x(){for(let y in i)a.deleteBuffer(i[y]);o=[],i={},s={}}return{bind:l,update:c,dispose:x}}function pf(){let a=Zi("canvas");return a.style.display="block",a}function Cr(a={}){this.isWebGLRenderer=!0;let t=a.canvas!==void 0?a.canvas:pf(),e=a.context!==void 0?a.context:null,n=a.depth!==void 0?a.depth:!0,i=a.stencil!==void 0?a.stencil:!0,s=a.antialias!==void 0?a.antialias:!1,o=a.premultipliedAlpha!==void 0?a.premultipliedAlpha:!0,r=a.preserveDrawingBuffer!==void 0?a.preserveDrawingBuffer:!1,l=a.powerPreference!==void 0?a.powerPreference:"default",c=a.failIfMajorPerformanceCaveat!==void 0?a.failIfMajorPerformanceCaveat:!1,p;e!==null?p=e.getContextAttributes().alpha:p=a.alpha!==void 0?a.alpha:!1;let h=null,f=null,m=[],g=[];this.domElement=t,this.debug={checkShaderErrors:!0},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.outputEncoding=wn,this.physicallyCorrectLights=!1,this.toneMapping=qe,this.toneMappingExposure=1,Object.defineProperties(this,{gammaFactor:{get:function(){return console.warn("THREE.WebGLRenderer: .gammaFactor has been removed."),2},set:function(){console.warn("THREE.WebGLRenderer: .gammaFactor has been removed.")}}});let u=this,d=!1,x=0,y=0,M=null,w=-1,S=null,I=new Kt,D=new Kt,A=null,k=t.width,T=t.height,F=1,v=null,O=null,B=new Kt(0,0,k,T),U=new Kt(0,0,k,T),nt=!1,G=new is,J=!1,C=!1,P=null,it=new Qt,Z=new zt,K=new $,ft={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function At(){return M===null?F:1}let et=e;function Tt(L,tt){for(let at=0;at<L.length;at++){let j=L[at],ct=t.getContext(j,tt);if(ct!==null)return ct}return null}try{let L={alpha:!0,depth:n,stencil:i,antialias:s,premultipliedAlpha:o,preserveDrawingBuffer:r,powerPreference:l,failIfMajorPerformanceCaveat:c};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Tr}`),t.addEventListener("webglcontextlost",St,!1),t.addEventListener("webglcontextrestored",Pt,!1),t.addEventListener("webglcontextcreationerror",Nt,!1),et===null){let tt=["webgl2","webgl","experimental-webgl"];if(u.isWebGL1Renderer===!0&&tt.shift(),et=Tt(tt,L),et===null)throw Tt(tt)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}et.getShaderPrecisionFormat===void 0&&(et.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(L){throw console.error("THREE.WebGLRenderer: "+L.message),L}let Mt,bt,xt,Dt,_,X,Q,z,R,V,rt,st,q,ut,E,b,H,ot,ht,pt,Et,N,Y,dt;function wt(){Mt=new zu(et),bt=new Cu(et,Mt,a),Mt.init(bt),N=new hf(et,Mt,bt),xt=new lf(et,Mt,bt),Dt=new Nu,_=new Jd,X=new cf(et,Mt,xt,_,bt,N,Dt),Q=new Ru(u),z=new Du(u),R=new Yl(et,bt),Y=new Tu(et,Mt,R,bt),V=new ku(et,R,Dt,Y),rt=new Vu(et,V,R,Dt),ht=new Bu(et,bt,X),b=new Pu(_),st=new Yd(u,Q,z,Mt,bt,Y,b),q=new df(u,_),ut=new $d,E=new sf(Mt,bt),ot=new Au(u,Q,xt,rt,p,o),H=new of(u,rt,bt),dt=new ff(et,Dt,bt,xt),pt=new Eu(et,Mt,Dt,bt),Et=new Ou(et,Mt,Dt,bt),Dt.programs=st.programs,u.capabilities=bt,u.extensions=Mt,u.properties=_,u.renderLists=ut,u.shadowMap=H,u.state=xt,u.info=Dt}wt();let yt=new gr(u,et);this.xr=yt,this.getContext=function(){return et},this.getContextAttributes=function(){return et.getContextAttributes()},this.forceContextLoss=function(){let L=Mt.get("WEBGL_lose_context");L&&L.loseContext()},this.forceContextRestore=function(){let L=Mt.get("WEBGL_lose_context");L&&L.restoreContext()},this.getPixelRatio=function(){return F},this.setPixelRatio=function(L){L!==void 0&&(F=L,this.setSize(k,T,!1))},this.getSize=function(L){return L.set(k,T)},this.setSize=function(L,tt,at){if(yt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}k=L,T=tt,t.width=Math.floor(L*F),t.height=Math.floor(tt*F),at!==!1&&(t.style.width=L+"px",t.style.height=tt+"px"),this.setViewport(0,0,L,tt)},this.getDrawingBufferSize=function(L){return L.set(k*F,T*F).floor()},this.setDrawingBufferSize=function(L,tt,at){k=L,T=tt,F=at,t.width=Math.floor(L*at),t.height=Math.floor(tt*at),this.setViewport(0,0,L,tt)},this.getCurrentViewport=function(L){return L.copy(I)},this.getViewport=function(L){return L.copy(B)},this.setViewport=function(L,tt,at,j){L.isVector4?B.set(L.x,L.y,L.z,L.w):B.set(L,tt,at,j),xt.viewport(I.copy(B).multiplyScalar(F).floor())},this.getScissor=function(L){return L.copy(U)},this.setScissor=function(L,tt,at,j){L.isVector4?U.set(L.x,L.y,L.z,L.w):U.set(L,tt,at,j),xt.scissor(D.copy(U).multiplyScalar(F).floor())},this.getScissorTest=function(){return nt},this.setScissorTest=function(L){xt.setScissorTest(nt=L)},this.setOpaqueSort=function(L){v=L},this.setTransparentSort=function(L){O=L},this.getClearColor=function(L){return L.copy(ot.getClearColor())},this.setClearColor=function(){ot.setClearColor.apply(ot,arguments)},this.getClearAlpha=function(){return ot.getClearAlpha()},this.setClearAlpha=function(){ot.setClearAlpha.apply(ot,arguments)},this.clear=function(L=!0,tt=!0,at=!0){let j=0;L&&(j|=16384),tt&&(j|=256),at&&(j|=1024),et.clear(j)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",St,!1),t.removeEventListener("webglcontextrestored",Pt,!1),t.removeEventListener("webglcontextcreationerror",Nt,!1),ut.dispose(),E.dispose(),_.dispose(),Q.dispose(),z.dispose(),rt.dispose(),Y.dispose(),dt.dispose(),st.dispose(),yt.dispose(),yt.removeEventListener("sessionstart",Rt),yt.removeEventListener("sessionend",Ht),P&&(P.dispose(),P=null),Yt.stop()};function St(L){L.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),d=!0}function Pt(){console.log("THREE.WebGLRenderer: Context Restored."),d=!1;let L=Dt.autoReset,tt=H.enabled,at=H.autoUpdate,j=H.needsUpdate,ct=H.type;wt(),Dt.autoReset=L,H.enabled=tt,H.autoUpdate=at,H.needsUpdate=j,H.type=ct}function Nt(L){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",L.statusMessage)}function W(L){let tt=L.target;tt.removeEventListener("dispose",W),vt(tt)}function vt(L){mt(L),_.remove(L)}function mt(L){let tt=_.get(L).programs;tt!==void 0&&(tt.forEach(function(at){st.releaseProgram(at)}),L.isShaderMaterial&&st.releaseShaderCache(L))}this.renderBufferDirect=function(L,tt,at,j,ct,Ct){tt===null&&(tt=ft);let Lt=ct.isMesh&&ct.matrixWorld.determinant()<0,kt=bo(L,tt,at,j,ct);xt.setMaterial(j,Lt);let It=at.index,Wt=at.attributes.position;if(It===null){if(Wt===void 0||Wt.count===0)return}else if(It.count===0)return;let Ft=1;j.wireframe===!0&&(It=V.getWireframeAttribute(at),Ft=2),Y.setup(ct,j,kt,at,It);let Ut,qt=pt;It!==null&&(Ut=R.get(It),qt=Et,qt.setIndex(Ut));let cn=It!==null?It.count:Wt.count,Pn=at.drawRange.start*Ft,Rn=at.drawRange.count*Ft,De=Ct!==null?Ct.start*Ft:0,Bt=Ct!==null?Ct.count*Ft:1/0,Ln=Math.max(Pn,De),Jt=Math.min(cn,Pn+Rn,De+Bt)-1,xe=Math.max(0,Jt-Ln+1);if(xe!==0){if(ct.isMesh)j.wireframe===!0?(xt.setLineWidth(j.wireframeLinewidth*At()),qt.setMode(1)):qt.setMode(4);else if(ct.isLine){let Ke=j.linewidth;Ke===void 0&&(Ke=1),xt.setLineWidth(Ke*At()),ct.isLineSegments?qt.setMode(1):ct.isLineLoop?qt.setMode(2):qt.setMode(3)}else ct.isPoints?qt.setMode(0):ct.isSprite&&qt.setMode(4);if(ct.isInstancedMesh)qt.renderInstances(Ln,xe,ct.count);else if(at.isInstancedBufferGeometry){let Ke=Math.min(at.instanceCount,at._maxInstanceCount);qt.renderInstances(Ln,xe,Ke)}else qt.render(Ln,xe)}},this.compile=function(L,tt){function at(j,ct,Ct){j.transparent===!0&&j.side===ke?(j.side=we,j.needsUpdate=!0,bi(j,ct,Ct),j.side=Kn,j.needsUpdate=!0,bi(j,ct,Ct),j.side=ke):bi(j,ct,Ct)}f=E.get(L),f.init(),g.push(f),L.traverseVisible(function(j){j.isLight&&j.layers.test(tt.layers)&&(f.pushLight(j),j.castShadow&&f.pushShadow(j))}),f.setupLights(u.physicallyCorrectLights),L.traverse(function(j){let ct=j.material;if(ct)if(Array.isArray(ct))for(let Ct=0;Ct<ct.length;Ct++){let Lt=ct[Ct];at(Lt,L,j)}else at(ct,L,j)}),g.pop(),f=null};let lt=null;function gt(L){lt&&lt(L)}function Rt(){Yt.stop()}function Ht(){Yt.start()}let Yt=new co;Yt.setAnimationLoop(gt),typeof self<"u"&&Yt.setContext(self),this.setAnimationLoop=function(L){lt=L,yt.setAnimationLoop(L),L===null?Yt.stop():Yt.start()},yt.addEventListener("sessionstart",Rt),yt.addEventListener("sessionend",Ht),this.render=function(L,tt){if(tt!==void 0&&tt.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(d===!0)return;L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),tt.parent===null&&tt.matrixWorldAutoUpdate===!0&&tt.updateMatrixWorld(),yt.enabled===!0&&yt.isPresenting===!0&&(yt.cameraAutoUpdate===!0&&yt.updateCamera(tt),tt=yt.getCamera()),L.isScene===!0&&L.onBeforeRender(u,L,tt,M),f=E.get(L,g.length),f.init(),g.push(f),it.multiplyMatrices(tt.projectionMatrix,tt.matrixWorldInverse),G.setFromProjectionMatrix(it),C=this.localClippingEnabled,J=b.init(this.clippingPlanes,C,tt),h=ut.get(L,m.length),h.init(),m.push(h),$e(L,tt,0,u.sortObjects),h.finish(),u.sortObjects===!0&&h.sort(v,O),J===!0&&b.beginShadows();let at=f.state.shadowsArray;if(H.render(at,L,tt),J===!0&&b.endShadows(),this.info.autoReset===!0&&this.info.reset(),ot.render(h,L),f.setupLights(u.physicallyCorrectLights),tt.isArrayCamera){let j=tt.cameras;for(let ct=0,Ct=j.length;ct<Ct;ct++){let Lt=j[ct];Xt(h,L,Lt,Lt.viewport)}}else Xt(h,L,tt);M!==null&&(X.updateMultisampleRenderTarget(M),X.updateRenderTargetMipmap(M)),L.isScene===!0&&L.onAfterRender(u,L,tt),Y.resetDefaultState(),w=-1,S=null,g.pop(),g.length>0?f=g[g.length-1]:f=null,m.pop(),m.length>0?h=m[m.length-1]:h=null};function $e(L,tt,at,j){if(L.visible===!1)return;if(L.layers.test(tt.layers)){if(L.isGroup)at=L.renderOrder;else if(L.isLOD)L.autoUpdate===!0&&L.update(tt);else if(L.isLight)f.pushLight(L),L.castShadow&&f.pushShadow(L);else if(L.isSprite){if(!L.frustumCulled||G.intersectsSprite(L)){j&&K.setFromMatrixPosition(L.matrixWorld).applyMatrix4(it);let Lt=rt.update(L),kt=L.material;kt.visible&&h.push(L,Lt,kt,at,K.z,null)}}else if((L.isMesh||L.isLine||L.isPoints)&&(L.isSkinnedMesh&&L.skeleton.frame!==Dt.render.frame&&(L.skeleton.update(),L.skeleton.frame=Dt.render.frame),!L.frustumCulled||G.intersectsObject(L))){j&&K.setFromMatrixPosition(L.matrixWorld).applyMatrix4(it);let Lt=rt.update(L),kt=L.material;if(Array.isArray(kt)){let It=Lt.groups;for(let Wt=0,Ft=It.length;Wt<Ft;Wt++){let Ut=It[Wt],qt=kt[Ut.materialIndex];qt&&qt.visible&&h.push(L,Lt,qt,at,K.z,Ut)}}else kt.visible&&h.push(L,Lt,kt,at,K.z,null)}}let Ct=L.children;for(let Lt=0,kt=Ct.length;Lt<kt;Lt++)$e(Ct[Lt],tt,at,j)}function Xt(L,tt,at,j){let ct=L.opaque,Ct=L.transmissive,Lt=L.transparent;f.setupLightsView(at),Ct.length>0&&Fe(ct,tt,at),j&&xt.viewport(I.copy(j)),ct.length>0&&_e(ct,tt,at),Ct.length>0&&_e(Ct,tt,at),Lt.length>0&&_e(Lt,tt,at),xt.buffers.depth.setTest(!0),xt.buffers.depth.setMask(!0),xt.buffers.color.setMask(!0),xt.setPolygonOffset(!1)}function Fe(L,tt,at){let j=bt.isWebGL2;P===null&&(P=new Ye(1,1,{generateMipmaps:!0,type:Mt.has("EXT_color_buffer_half_float")?pi:bn,minFilter:os,samples:j&&s===!0?4:0})),u.getDrawingBufferSize(Z),j?P.setSize(Z.x,Z.y):P.setSize(tr(Z.x),tr(Z.y));let ct=u.getRenderTarget();u.setRenderTarget(P),u.clear();let Ct=u.toneMapping;u.toneMapping=qe,_e(L,tt,at),u.toneMapping=Ct,X.updateMultisampleRenderTarget(P),X.updateRenderTargetMipmap(P),u.setRenderTarget(ct)}function _e(L,tt,at){let j=tt.isScene===!0?tt.overrideMaterial:null;for(let ct=0,Ct=L.length;ct<Ct;ct++){let Lt=L[ct],kt=Lt.object,It=Lt.geometry,Wt=j===null?Lt.material:j,Ft=Lt.group;kt.layers.test(at.layers)&&yo(kt,tt,at,It,Wt,Ft)}}function yo(L,tt,at,j,ct,Ct){L.onBeforeRender(u,tt,at,j,ct,Ct),L.modelViewMatrix.multiplyMatrices(at.matrixWorldInverse,L.matrixWorld),L.normalMatrix.getNormalMatrix(L.modelViewMatrix),ct.onBeforeRender(u,tt,at,j,L,Ct),ct.transparent===!0&&ct.side===ke?(ct.side=we,ct.needsUpdate=!0,u.renderBufferDirect(at,tt,j,ct,L,Ct),ct.side=Kn,ct.needsUpdate=!0,u.renderBufferDirect(at,tt,j,ct,L,Ct),ct.side=ke):u.renderBufferDirect(at,tt,j,ct,L,Ct),L.onAfterRender(u,tt,at,j,ct,Ct)}function bi(L,tt,at){tt.isScene!==!0&&(tt=ft);let j=_.get(L),ct=f.state.lights,Ct=f.state.shadowsArray,Lt=ct.state.version,kt=st.getParameters(L,ct.state,Ct,tt,at),It=st.getProgramCacheKey(kt),Wt=j.programs;j.environment=L.isMeshStandardMaterial?tt.environment:null,j.fog=tt.fog,j.envMap=(L.isMeshStandardMaterial?z:Q).get(L.envMap||j.environment),Wt===void 0&&(L.addEventListener("dispose",W),Wt=new Map,j.programs=Wt);let Ft=Wt.get(It);if(Ft!==void 0){if(j.currentProgram===Ft&&j.lightsStateVersion===Lt)return Nr(L,kt),Ft}else kt.uniforms=st.getUniforms(L),L.onBuild(at,kt,u),L.onBeforeCompile(kt,u),Ft=st.acquireProgram(kt,It),Wt.set(It,Ft),j.uniforms=kt.uniforms;let Ut=j.uniforms;(!L.isShaderMaterial&&!L.isRawShaderMaterial||L.clipping===!0)&&(Ut.clippingPlanes=b.uniform),Nr(L,kt),j.needsLights=Mo(L),j.lightsStateVersion=Lt,j.needsLights&&(Ut.ambientLightColor.value=ct.state.ambient,Ut.lightProbe.value=ct.state.probe,Ut.directionalLights.value=ct.state.directional,Ut.directionalLightShadows.value=ct.state.directionalShadow,Ut.spotLights.value=ct.state.spot,Ut.spotLightShadows.value=ct.state.spotShadow,Ut.rectAreaLights.value=ct.state.rectArea,Ut.ltc_1.value=ct.state.rectAreaLTC1,Ut.ltc_2.value=ct.state.rectAreaLTC2,Ut.pointLights.value=ct.state.point,Ut.pointLightShadows.value=ct.state.pointShadow,Ut.hemisphereLights.value=ct.state.hemi,Ut.directionalShadowMap.value=ct.state.directionalShadowMap,Ut.directionalShadowMatrix.value=ct.state.directionalShadowMatrix,Ut.spotShadowMap.value=ct.state.spotShadowMap,Ut.spotLightMatrix.value=ct.state.spotLightMatrix,Ut.spotLightMap.value=ct.state.spotLightMap,Ut.pointShadowMap.value=ct.state.pointShadowMap,Ut.pointShadowMatrix.value=ct.state.pointShadowMatrix);let qt=Ft.getUniforms(),cn=$n.seqWithValue(qt.seq,Ut);return j.currentProgram=Ft,j.uniformsList=cn,Ft}function Nr(L,tt){let at=_.get(L);at.outputEncoding=tt.outputEncoding,at.instancing=tt.instancing,at.skinning=tt.skinning,at.morphTargets=tt.morphTargets,at.morphNormals=tt.morphNormals,at.morphColors=tt.morphColors,at.morphTargetsCount=tt.morphTargetsCount,at.numClippingPlanes=tt.numClippingPlanes,at.numIntersection=tt.numClipIntersection,at.vertexAlphas=tt.vertexAlphas,at.vertexTangents=tt.vertexTangents,at.toneMapping=tt.toneMapping}function bo(L,tt,at,j,ct){tt.isScene!==!0&&(tt=ft),X.resetTextureUnits();let Ct=tt.fog,Lt=j.isMeshStandardMaterial?tt.environment:null,kt=M===null?u.outputEncoding:M.isXRRenderTarget===!0?M.texture.encoding:wn,It=(j.isMeshStandardMaterial?z:Q).get(j.envMap||Lt),Wt=j.vertexColors===!0&&!!at.attributes.color&&at.attributes.color.itemSize===4,Ft=!!j.normalMap&&!!at.attributes.tangent,Ut=!!at.morphAttributes.position,qt=!!at.morphAttributes.normal,cn=!!at.morphAttributes.color,Pn=j.toneMapped?u.toneMapping:qe,Rn=at.morphAttributes.position||at.morphAttributes.normal||at.morphAttributes.color,De=Rn!==void 0?Rn.length:0,Bt=_.get(j),Ln=f.state.lights;if(J===!0&&(C===!0||L!==S)){let fe=L===S&&j.id===w;b.setState(j,L,fe)}let Jt=!1;j.version===Bt.__version?(Bt.needsLights&&Bt.lightsStateVersion!==Ln.state.version||Bt.outputEncoding!==kt||ct.isInstancedMesh&&Bt.instancing===!1||!ct.isInstancedMesh&&Bt.instancing===!0||ct.isSkinnedMesh&&Bt.skinning===!1||!ct.isSkinnedMesh&&Bt.skinning===!0||Bt.envMap!==It||j.fog===!0&&Bt.fog!==Ct||Bt.numClippingPlanes!==void 0&&(Bt.numClippingPlanes!==b.numPlanes||Bt.numIntersection!==b.numIntersection)||Bt.vertexAlphas!==Wt||Bt.vertexTangents!==Ft||Bt.morphTargets!==Ut||Bt.morphNormals!==qt||Bt.morphColors!==cn||Bt.toneMapping!==Pn||bt.isWebGL2===!0&&Bt.morphTargetsCount!==De)&&(Jt=!0):(Jt=!0,Bt.__version=j.version);let xe=Bt.currentProgram;Jt===!0&&(xe=bi(j,tt,ct));let Ke=!1,ai=!1,us=!1,oe=xe.getUniforms(),hn=Bt.uniforms;if(xt.useProgram(xe.program)&&(Ke=!0,ai=!0,us=!0),j.id!==w&&(w=j.id,ai=!0),Ke||S!==L){if(oe.setValue(et,"projectionMatrix",L.projectionMatrix),bt.logarithmicDepthBuffer&&oe.setValue(et,"logDepthBufFC",2/(Math.log(L.far+1)/Math.LN2)),S!==L&&(S=L,ai=!0,us=!0),j.isShaderMaterial||j.isMeshPhongMaterial||j.isMeshToonMaterial||j.isMeshStandardMaterial||j.envMap){let fe=oe.map.cameraPosition;fe!==void 0&&fe.setValue(et,K.setFromMatrixPosition(L.matrixWorld))}(j.isMeshPhongMaterial||j.isMeshToonMaterial||j.isMeshLambertMaterial||j.isMeshBasicMaterial||j.isMeshStandardMaterial||j.isShaderMaterial)&&oe.setValue(et,"isOrthographic",L.isOrthographicCamera===!0),(j.isMeshPhongMaterial||j.isMeshToonMaterial||j.isMeshLambertMaterial||j.isMeshBasicMaterial||j.isMeshStandardMaterial||j.isShaderMaterial||j.isShadowMaterial||ct.isSkinnedMesh)&&oe.setValue(et,"viewMatrix",L.matrixWorldInverse)}if(ct.isSkinnedMesh){oe.setOptional(et,ct,"bindMatrix"),oe.setOptional(et,ct,"bindMatrixInverse");let fe=ct.skeleton;fe&&(bt.floatVertexTextures?(fe.boneTexture===null&&fe.computeBoneTexture(),oe.setValue(et,"boneTexture",fe.boneTexture,X),oe.setValue(et,"boneTextureSize",fe.boneTextureSize)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}let ds=at.morphAttributes;if((ds.position!==void 0||ds.normal!==void 0||ds.color!==void 0&&bt.isWebGL2===!0)&&ht.update(ct,at,j,xe),(ai||Bt.receiveShadow!==ct.receiveShadow)&&(Bt.receiveShadow=ct.receiveShadow,oe.setValue(et,"receiveShadow",ct.receiveShadow)),j.isMeshGouraudMaterial&&j.envMap!==null&&(hn.envMap.value=It,hn.flipEnvMap.value=It.isCubeTexture&&It.isRenderTargetTexture===!1?-1:1),ai&&(oe.setValue(et,"toneMappingExposure",u.toneMappingExposure),Bt.needsLights&&wo(hn,us),Ct&&j.fog===!0&&q.refreshFogUniforms(hn,Ct),q.refreshMaterialUniforms(hn,j,F,T,P),$n.upload(et,Bt.uniformsList,hn,X)),j.isShaderMaterial&&j.uniformsNeedUpdate===!0&&($n.upload(et,Bt.uniformsList,hn,X),j.uniformsNeedUpdate=!1),j.isSpriteMaterial&&oe.setValue(et,"center",ct.center),oe.setValue(et,"modelViewMatrix",ct.modelViewMatrix),oe.setValue(et,"normalMatrix",ct.normalMatrix),oe.setValue(et,"modelMatrix",ct.matrixWorld),j.isShaderMaterial||j.isRawShaderMaterial){let fe=j.uniformsGroups;for(let fs=0,So=fe.length;fs<So;fs++)if(bt.isWebGL2){let Fr=fe[fs];dt.update(Fr,xe),dt.bind(Fr,xe)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return xe}function wo(L,tt){L.ambientLightColor.needsUpdate=tt,L.lightProbe.needsUpdate=tt,L.directionalLights.needsUpdate=tt,L.directionalLightShadows.needsUpdate=tt,L.pointLights.needsUpdate=tt,L.pointLightShadows.needsUpdate=tt,L.spotLights.needsUpdate=tt,L.spotLightShadows.needsUpdate=tt,L.rectAreaLights.needsUpdate=tt,L.hemisphereLights.needsUpdate=tt}function Mo(L){return L.isMeshLambertMaterial||L.isMeshToonMaterial||L.isMeshPhongMaterial||L.isMeshStandardMaterial||L.isShadowMaterial||L.isShaderMaterial&&L.lights===!0}this.getActiveCubeFace=function(){return x},this.getActiveMipmapLevel=function(){return y},this.getRenderTarget=function(){return M},this.setRenderTargetTextures=function(L,tt,at){_.get(L.texture).__webglTexture=tt,_.get(L.depthTexture).__webglTexture=at;let j=_.get(L);j.__hasExternalTextures=!0,j.__hasExternalTextures&&(j.__autoAllocateDepthBuffer=at===void 0,j.__autoAllocateDepthBuffer||Mt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),j.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(L,tt){let at=_.get(L);at.__webglFramebuffer=tt,at.__useDefaultFramebuffer=tt===void 0},this.setRenderTarget=function(L,tt=0,at=0){M=L,x=tt,y=at;let j=!0;if(L){let It=_.get(L);It.__useDefaultFramebuffer!==void 0?(xt.bindFramebuffer(36160,null),j=!1):It.__webglFramebuffer===void 0?X.setupRenderTarget(L):It.__hasExternalTextures&&X.rebindTextures(L,_.get(L.texture).__webglTexture,_.get(L.depthTexture).__webglTexture)}let ct=null,Ct=!1,Lt=!1;if(L){let It=L.texture;(It.isData3DTexture||It.isDataArrayTexture)&&(Lt=!0);let Wt=_.get(L).__webglFramebuffer;L.isWebGLCubeRenderTarget?(ct=Wt[tt],Ct=!0):bt.isWebGL2&&L.samples>0&&X.useMultisampledRTT(L)===!1?ct=_.get(L).__webglMultisampledFramebuffer:ct=Wt,I.copy(L.viewport),D.copy(L.scissor),A=L.scissorTest}else I.copy(B).multiplyScalar(F).floor(),D.copy(U).multiplyScalar(F).floor(),A=nt;if(xt.bindFramebuffer(36160,ct)&&bt.drawBuffers&&j&&xt.drawBuffers(L,ct),xt.viewport(I),xt.scissor(D),xt.setScissorTest(A),Ct){let It=_.get(L.texture);et.framebufferTexture2D(36160,36064,34069+tt,It.__webglTexture,at)}else if(Lt){let It=_.get(L.texture),Wt=tt||0;et.framebufferTextureLayer(36160,36064,It.__webglTexture,at||0,Wt)}w=-1},this.readRenderTargetPixels=function(L,tt,at,j,ct,Ct,Lt){if(!(L&&L.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let kt=_.get(L).__webglFramebuffer;if(L.isWebGLCubeRenderTarget&&Lt!==void 0&&(kt=kt[Lt]),kt){xt.bindFramebuffer(36160,kt);try{let It=L.texture,Wt=It.format,Ft=It.type;if(Wt!==Oe&&N.convert(Wt)!==et.getParameter(35739)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}let Ut=Ft===pi&&(Mt.has("EXT_color_buffer_half_float")||bt.isWebGL2&&Mt.has("EXT_color_buffer_float"));if(Ft!==bn&&N.convert(Ft)!==et.getParameter(35738)&&!(Ft===_n&&(bt.isWebGL2||Mt.has("OES_texture_float")||Mt.has("WEBGL_color_buffer_float")))&&!Ut){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}tt>=0&&tt<=L.width-j&&at>=0&&at<=L.height-ct&&et.readPixels(tt,at,j,ct,N.convert(Wt),N.convert(Ft),Ct)}finally{let It=M!==null?_.get(M).__webglFramebuffer:null;xt.bindFramebuffer(36160,It)}}},this.copyFramebufferToTexture=function(L,tt,at=0){let j=Math.pow(2,-at),ct=Math.floor(tt.image.width*j),Ct=Math.floor(tt.image.height*j);X.setTexture2D(tt,0),et.copyTexSubImage2D(3553,at,0,0,L.x,L.y,ct,Ct),xt.unbindTexture()},this.copyTextureToTexture=function(L,tt,at,j=0){let ct=tt.image.width,Ct=tt.image.height,Lt=N.convert(at.format),kt=N.convert(at.type);X.setTexture2D(at,0),et.pixelStorei(37440,at.flipY),et.pixelStorei(37441,at.premultiplyAlpha),et.pixelStorei(3317,at.unpackAlignment),tt.isDataTexture?et.texSubImage2D(3553,j,L.x,L.y,ct,Ct,Lt,kt,tt.image.data):tt.isCompressedTexture?et.compressedTexSubImage2D(3553,j,L.x,L.y,tt.mipmaps[0].width,tt.mipmaps[0].height,Lt,tt.mipmaps[0].data):et.texSubImage2D(3553,j,L.x,L.y,Lt,kt,tt.image),j===0&&at.generateMipmaps&&et.generateMipmap(3553),xt.unbindTexture()},this.copyTextureToTexture3D=function(L,tt,at,j,ct=0){if(u.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}let Ct=L.max.x-L.min.x+1,Lt=L.max.y-L.min.y+1,kt=L.max.z-L.min.z+1,It=N.convert(j.format),Wt=N.convert(j.type),Ft;if(j.isData3DTexture)X.setTexture3D(j,0),Ft=32879;else if(j.isDataArrayTexture)X.setTexture2DArray(j,0),Ft=35866;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}et.pixelStorei(37440,j.flipY),et.pixelStorei(37441,j.premultiplyAlpha),et.pixelStorei(3317,j.unpackAlignment);let Ut=et.getParameter(3314),qt=et.getParameter(32878),cn=et.getParameter(3316),Pn=et.getParameter(3315),Rn=et.getParameter(32877),De=at.isCompressedTexture?at.mipmaps[0]:at.image;et.pixelStorei(3314,De.width),et.pixelStorei(32878,De.height),et.pixelStorei(3316,L.min.x),et.pixelStorei(3315,L.min.y),et.pixelStorei(32877,L.min.z),at.isDataTexture||at.isData3DTexture?et.texSubImage3D(Ft,ct,tt.x,tt.y,tt.z,Ct,Lt,kt,It,Wt,De.data):at.isCompressedTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),et.compressedTexSubImage3D(Ft,ct,tt.x,tt.y,tt.z,Ct,Lt,kt,It,De.data)):et.texSubImage3D(Ft,ct,tt.x,tt.y,tt.z,Ct,Lt,kt,It,Wt,De),et.pixelStorei(3314,Ut),et.pixelStorei(32878,qt),et.pixelStorei(3316,cn),et.pixelStorei(3315,Pn),et.pixelStorei(32877,Rn),ct===0&&j.generateMipmaps&&et.generateMipmap(Ft),xt.unbindTexture()},this.initTexture=function(L){L.isCubeTexture?X.setTextureCube(L,0):L.isData3DTexture?X.setTexture3D(L,0):L.isDataArrayTexture?X.setTexture2DArray(L,0):X.setTexture2D(L,0),xt.unbindTexture()},this.resetState=function(){x=0,y=0,M=null,xt.reset(),Y.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}var _r=class extends Cr{};_r.prototype.isWebGL1Renderer=!0;var rs=class extends ce{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e}get autoUpdate(){return console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),this.matrixWorldAutoUpdate}set autoUpdate(t){console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),this.matrixWorldAutoUpdate=t}};var _i=class extends de{constructor(t=null,e=1,n=1,i,s,o,r,l,c=ae,p=ae,h,f){super(null,o,r,l,c,p,i,s,h,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};function on(a,t,e){return mo(a)?new a.constructor(a.subarray(t,e!==void 0?e:a.length)):a.slice(t,e)}function Hi(a,t,e){return!a||!e&&a.constructor===t?a:typeof t.BYTES_PER_ELEMENT=="number"?new t(a):Array.prototype.slice.call(a)}function mo(a){return ArrayBuffer.isView(a)&&!(a instanceof DataView)}var si=class{constructor(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,i=e[n],s=e[n-1];t:{e:{let o;n:{i:if(!(t<i)){for(let r=n+2;;){if(i===void 0){if(t<s)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===r)break;if(s=i,i=e[++n],t<i)break e}o=e.length;break n}if(!(t>=s)){let r=e[1];t<r&&(n=2,s=r);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=e[--n-1],t>=s)break e}o=n,n=0;break n}break t}for(;n<o;){let r=n+o>>>1;t<e[r]?o=r:n=r+1}if(i=e[n],s=e[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,t,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=t*i;for(let o=0;o!==i;++o)e[o]=n[s+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},xr=class extends si{constructor(t,e,n,i){super(t,e,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:ga,endingEnd:ga}}intervalChanged_(t,e,n){let i=this.parameterPositions,s=t-2,o=t+1,r=i[s],l=i[o];if(r===void 0)switch(this.getSettings_().endingStart){case _a:s=t,r=2*e-n;break;case xa:s=i.length-2,r=e+i[s]-i[s+1];break;default:s=t,r=n}if(l===void 0)switch(this.getSettings_().endingEnd){case _a:o=t,l=2*n-e;break;case xa:o=1,l=n+i[1]-i[0];break;default:o=t-1,l=e}let c=(n-e)*.5,p=this.valueSize;this._weightPrev=c/(e-r),this._weightNext=c/(l-n),this._offsetPrev=s*p,this._offsetNext=o*p}interpolate_(t,e,n,i){let s=this.resultBuffer,o=this.sampleValues,r=this.valueSize,l=t*r,c=l-r,p=this._offsetPrev,h=this._offsetNext,f=this._weightPrev,m=this._weightNext,g=(n-e)/(i-e),u=g*g,d=u*g,x=-f*d+2*f*u-f*g,y=(1+f)*d+(-1.5-2*f)*u+(-.5+f)*g+1,M=(-1-m)*d+(1.5+m)*u+.5*g,w=m*d-m*u;for(let S=0;S!==r;++S)s[S]=x*o[p+S]+y*o[c+S]+M*o[l+S]+w*o[h+S];return s}},vr=class extends si{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let s=this.resultBuffer,o=this.sampleValues,r=this.valueSize,l=t*r,c=l-r,p=(n-e)/(i-e),h=1-p;for(let f=0;f!==r;++f)s[f]=o[c+f]*h+o[l+f]*p;return s}},yr=class extends si{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t){return this.copySampleValue_(t-1)}},Ie=class{constructor(t,e,n,i){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Hi(e,this.TimeBufferType),this.values=Hi(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Hi(t.times,Array),values:Hi(t.values,Array)};let i=t.getInterpolation();i!==t.DefaultInterpolation&&(n.interpolation=i)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new yr(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new vr(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new xr(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case Xi:e=this.InterpolantFactoryMethodDiscrete;break;case qi:e=this.InterpolantFactoryMethodLinear;break;case ys:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Xi;case this.InterpolantFactoryMethodLinear:return qi;case this.InterpolantFactoryMethodSmooth:return ys}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]*=t}return this}trim(t,e){let n=this.times,i=n.length,s=0,o=i-1;for(;s!==i&&n[s]<t;)++s;for(;o!==-1&&n[o]>e;)--o;if(++o,s!==0||o!==i){s>=o&&(o=Math.max(o,1),s=o-1);let r=this.getValueSize();this.times=on(n,s,o),this.values=on(this.values,s*r,o*r)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let r=0;r!==s;r++){let l=n[r];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,r,l),t=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,r,l,o),t=!1;break}o=l}if(i!==void 0&&mo(i))for(let r=0,l=i.length;r!==l;++r){let c=i[r];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,r,c),t=!1;break}}return t}optimize(){let t=on(this.times),e=on(this.values),n=this.getValueSize(),i=this.getInterpolation()===ys,s=t.length-1,o=1;for(let r=1;r<s;++r){let l=!1,c=t[r],p=t[r+1];if(c!==p&&(r!==1||c!==t[0]))if(i)l=!0;else{let h=r*n,f=h-n,m=h+n;for(let g=0;g!==n;++g){let u=e[h+g];if(u!==e[f+g]||u!==e[m+g]){l=!0;break}}}if(l){if(r!==o){t[o]=t[r];let h=r*n,f=o*n;for(let m=0;m!==n;++m)e[f+m]=e[h+m]}++o}}if(s>0){t[o]=t[s];for(let r=s*n,l=o*n,c=0;c!==n;++c)e[l+c]=e[r+c];++o}return o!==t.length?(this.times=on(t,0,o),this.values=on(e,0,o*n)):(this.times=t,this.values=e),this}clone(){let t=on(this.times,0),e=on(this.values,0),n=this.constructor,i=new n(this.name,t,e);return i.createInterpolant=this.createInterpolant,i}};Ie.prototype.TimeBufferType=Float32Array;Ie.prototype.ValueBufferType=Float32Array;Ie.prototype.DefaultInterpolation=qi;var An=class extends Ie{};An.prototype.ValueTypeName="bool";An.prototype.ValueBufferType=Array;An.prototype.DefaultInterpolation=Xi;An.prototype.InterpolantFactoryMethodLinear=void 0;An.prototype.InterpolantFactoryMethodSmooth=void 0;var br=class extends Ie{};br.prototype.ValueTypeName="color";var wr=class extends Ie{};wr.prototype.ValueTypeName="number";var Mr=class extends si{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let s=this.resultBuffer,o=this.sampleValues,r=this.valueSize,l=(n-e)/(i-e),c=t*r;for(let p=c+r;c!==p;c+=4)Re.slerpFlat(s,0,o,c-r,o,c,l);return s}},xi=class extends Ie{InterpolantFactoryMethodLinear(t){return new Mr(this.times,this.values,this.getValueSize(),t)}};xi.prototype.ValueTypeName="quaternion";xi.prototype.DefaultInterpolation=qi;xi.prototype.InterpolantFactoryMethodSmooth=void 0;var Tn=class extends Ie{};Tn.prototype.ValueTypeName="string";Tn.prototype.ValueBufferType=Array;Tn.prototype.DefaultInterpolation=Xi;Tn.prototype.InterpolantFactoryMethodLinear=void 0;Tn.prototype.InterpolantFactoryMethodSmooth=void 0;var Sr=class extends Ie{};Sr.prototype.ValueTypeName="vector";var Pr="\\[\\]\\.:\\/",mf=new RegExp("["+Pr+"]","g"),Rr="[^"+Pr+"]",gf="[^"+Pr.replace("\\.","")+"]",_f=/((?:WC+[\/:])*)/.source.replace("WC",Rr),xf=/(WCOD+)?/.source.replace("WCOD",gf),vf=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Rr),yf=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Rr),bf=new RegExp("^"+_f+xf+vf+yf+"$"),wf=["material","materials","bones","map"],Ar=class{constructor(t,e,n){let i=n||Vt.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},Vt=class{constructor(t,e,n){this.path=e,this.parsedPath=n||Vt.parseTrackName(e),this.node=Vt.findNode(t,this.parsedPath.nodeName)||t,this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new Vt.Composite(t,e,n):new Vt(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(mf,"")}static parseTrackName(t){let e=bf.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let s=n.nodeName.substring(i+1);wf.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(s){for(let o=0;o<s.length;o++){let r=s[o];if(r.name===e||r.uuid===e)return r;let l=n(r.children);if(l)return l}return null},i=n(t.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)t[e++]=n[i]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,i=e.propertyName,s=e.propertyIndex;if(t||(t=Vt.findNode(this.rootNode,e.nodeName)||this.rootNode,this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.error("THREE.PropertyBinding: Trying to update node for track: "+this.path+" but it wasn't found.");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let p=0;p<t.length;p++)if(t[p].name===c){c=p;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let o=t[i];if(o===void 0){let c=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",t);return}let r=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?r=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(r=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[s]!==void 0&&(s=t.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][r]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Vt.Composite=Ar;Vt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Vt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Vt.prototype.GetterByBindingType=[Vt.prototype._getValue_direct,Vt.prototype._getValue_array,Vt.prototype._getValue_arrayElement,Vt.prototype._getValue_toArray];Vt.prototype.SetterByBindingTypeAndVersioning=[[Vt.prototype._setValue_direct,Vt.prototype._setValue_direct_setNeedsUpdate,Vt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Vt.prototype._setValue_array,Vt.prototype._setValue_array_setNeedsUpdate,Vt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Vt.prototype._setValue_arrayElement,Vt.prototype._setValue_arrayElement_setNeedsUpdate,Vt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Vt.prototype._setValue_fromArray,Vt.prototype._setValue_fromArray_setNeedsUpdate,Vt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Af=new Float32Array(1);var vi=class{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(he(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Tr}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Tr);var Lr=class extends HTMLElement{constructor(){super();ie(this,"canvas");ie(this,"ctx");ie(this,"color","black");ie(this,"brushSize",5);ie(this,"brushSquare",!1);ie(this,"textures",Array(4).fill(null).map(()=>{let e=new _i(new Uint8Array([0,0,0,0]),1,1);return e.needsUpdate=!0,e}));ie(this,"layers",Array(4).fill(null));ie(this,"layer",0);ie(this,"mouseDown",!1);this.attachShadow({mode:"open"});let e=document.createElement("canvas");e.width=256,e.height=e.width,e.addEventListener("mousedown",o=>this.handleMouseDown(o)),e.addEventListener("mousemove",o=>this.handleMouseMove(o)),document.addEventListener("mouseup",o=>this.handleMouseUp(o)),this.canvas=e,this.ctx=e.getContext("2d",{willReadFrequently:!0});let n=document.createElement("div");n.id="title";let i=document.createElement("slot");i.name="title",i.textContent="Placeholder",n.append(i);let s=document.createElement("style");s.textContent=`
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

canvas {
    width: 100%;
    height: 100%;

    image-rendering: pixelated;
    background-color: #FFF;
    border: 1px solid black;

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
`,this.initLayer(0),this.shadowRoot.append(s,e,n)}clear(e=!0){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),e&&this.invalidate(this.layer)}eventToCanvasCoords(e,n,i){let{offsetX:s,offsetY:o,movementX:r,movementY:l}=e,{width:c,height:p}=this.canvas.getBoundingClientRect();return{current:[s/c*this.canvas.width,o/p*this.canvas.height],previous:[(s-r)/c*this.canvas.width,(o-l)/p*this.canvas.height]}}handleMouseDown(e){if(this.layer==-1)return;this.mouseDown=!0,this.ctx.fillStyle=this.ctx.strokeStyle=this.color,this.color=="transparent"&&(this.ctx.fillStyle=this.ctx.strokeStyle="white");let{current:n}=this.eventToCanvasCoords(e);this.color=="transparent"&&(this.ctx.globalCompositeOperation="destination-out"),ms(this.ctx,n,n,this.brushSize,this.brushSquare),this.ctx.globalCompositeOperation="source-over",this.invalidate(this.layer)}handleMouseMove(e){if(this.mouseDown){let{current:n,previous:i}=this.eventToCanvasCoords(e);this.color=="transparent"&&(this.ctx.globalCompositeOperation="destination-out"),ms(this.ctx,i,n,this.brushSize,this.brushSquare),this.ctx.globalCompositeOperation="source-over",this.invalidate(this.layer)}}handleMouseUp(e){this.mouseDown=!1}invalidate(e){this.textures[e].image.data=this.ctx.getImageData(0,0,this.canvas.width,this.canvas.height),this.textures[e].needsUpdate=!0}initLayer(e){this.textures[e]!=null&&this.textures[e].dispose(),this.textures[e]=new _i(this.ctx.getImageData(0,0,this.canvas.width,this.canvas.height),this.canvas.width,this.canvas.height),this.textures[e].flipY=!0,this.textures[e].needsUpdate=!0}async saveToLayer(e){let n=await new Promise(i=>this.canvas.toBlob(i));this.layers[e]=n}async loadLayer(e){if(this.layer!=e)if(await this.saveToLayer(this.layer),this.clear(!1),this.layer=e,this.layers[this.layer]!=null){let n=new Image,i=URL.createObjectURL(this.layers[this.layer]);n.setAttribute("src",i),await new Promise(s=>n.addEventListener("load",s)),this.ctx.drawImage(n,0,0),URL.revokeObjectURL(i)}else this.initLayer(e)}async serialize(){return await this.saveToLayer(this.layer),this.layers}async deserialize(e){this.layer=-1,this.layers=e;for(let[n,i]of this.layers.entries()){if(i==null){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.initLayer(n);continue}this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);let s=new Image,o=URL.createObjectURL(i);s.setAttribute("src",o),await new Promise(r=>s.addEventListener("load",r)),this.ctx.drawImage(s,0,0),URL.revokeObjectURL(o),this.initLayer(n)}await this.loadLayer(0)}};customElements.define("itmas-cloth",Lr);var Ir=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"});let t=["transparent","#dde4e8","#ffc97a","#8dc196","#5a6e93","#301c44","#ce2f7f","#ef8a6e","#514cad","#877aff"],e=[];for(let[i,s]of t.entries()){let o=document.createElement("input");o.type="color",o.id=i,o.value=s;let r=document.createElement("label");r.setAttribute("for",i),r.style.backgroundColor=s,r.classList.add("color"),s=="transparent"&&r.classList.add("transparent"),s=="black"&&r.classList.add("selected"),r.addEventListener("click",()=>{for(let l of e)l.classList.remove("selected");r.classList.add("selected"),this.dispatchEvent(new CustomEvent("change",{detail:r.style.backgroundColor}))}),o.addEventListener("change",l=>{r.style.backgroundColor=l.target.value,this.dispatchEvent(new CustomEvent("change",{detail:l.target.value}))}),o.addEventListener("click",l=>{l.button==0&&l.preventDefault()}),s!="transparent"&&r.addEventListener("contextmenu",l=>(o.dispatchEvent(new MouseEvent("click",{button:2})),l.preventDefault(),!1),!1),e.push(r),s!="transparent"&&e.push(o)}let n=document.createElement("style");n.textContent=`
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

.color {
    display: block;
    border: 3px solid black;
    border-radius: 100%;

    width: 100%;
    height: auto;
    aspect-ratio: 1/1;

    margin-bottom: 10px;
    cursor: pointer;

    transition: border 0.2s;
}
.black {
    border: 3px solid white;
    outline: 1px solid black;
}
.color:hover, .selected {
    border-width: 6px;
}
.transparent {
    background-color: #FFF !important;
    background-size: 5px 5px;
    background-image: linear-gradient(to right, #d7d7d7 1px, transparent 1px), linear-gradient(to bottom, #d7d7d7d7 1px, transparent 1px);
}
`,this.shadowRoot.append(n,...e)}};customElements.define("itmas-palette",Ir);var Dr=class extends HTMLElement{constructor(){super();ie(this,"nameElem");this.attachShadow({mode:"open"}),this.nameElem=document.createElement("span"),this.shadowRoot.append(this.nameElem)}connectedCallback(){this.nameElem.innerText=`${parseInt(this.getAttribute("layer"))+1}`}};customElements.define("itmas-layer",Dr);var go={type:"change"},zr={type:"start"},_o={type:"end"},cs=class extends Ne{constructor(t,e){super(),this.object=t,this.domElement=e,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new $,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:En.ROTATE,MIDDLE:En.DOLLY,RIGHT:En.PAN},this.touches={ONE:Cn.ROTATE,TWO:Cn.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return r.phi},this.getAzimuthalAngle=function(){return r.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(N){N.addEventListener("keydown",ut),this._domElementKeyEvents=N},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(go),n.update(),s=i.NONE},this.update=function(){let N=new $,Y=new Re().setFromUnitVectors(t.up,new $(0,1,0)),dt=Y.clone().invert(),wt=new $,yt=new Re,St=2*Math.PI;return function(){let Nt=n.object.position;N.copy(Nt).sub(n.target),N.applyQuaternion(Y),r.setFromVector3(N),n.autoRotate&&s===i.NONE&&k(D()),n.enableDamping?(r.theta+=l.theta*n.dampingFactor,r.phi+=l.phi*n.dampingFactor):(r.theta+=l.theta,r.phi+=l.phi);let W=n.minAzimuthAngle,vt=n.maxAzimuthAngle;return isFinite(W)&&isFinite(vt)&&(W<-Math.PI?W+=St:W>Math.PI&&(W-=St),vt<-Math.PI?vt+=St:vt>Math.PI&&(vt-=St),W<=vt?r.theta=Math.max(W,Math.min(vt,r.theta)):r.theta=r.theta>(W+vt)/2?Math.max(W,r.theta):Math.min(vt,r.theta)),r.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,r.phi)),r.makeSafe(),r.radius*=c,r.radius=Math.max(n.minDistance,Math.min(n.maxDistance,r.radius)),n.enableDamping===!0?n.target.addScaledVector(p,n.dampingFactor):n.target.add(p),N.setFromSpherical(r),N.applyQuaternion(dt),Nt.copy(n.target).add(N),n.object.lookAt(n.target),n.enableDamping===!0?(l.theta*=1-n.dampingFactor,l.phi*=1-n.dampingFactor,p.multiplyScalar(1-n.dampingFactor)):(l.set(0,0,0),p.set(0,0,0)),c=1,h||wt.distanceToSquared(n.object.position)>o||8*(1-yt.dot(n.object.quaternion))>o?(n.dispatchEvent(go),wt.copy(n.object.position),yt.copy(n.object.quaternion),h=!1,!0):!1}}(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",H),n.domElement.removeEventListener("pointerdown",Q),n.domElement.removeEventListener("pointercancel",V),n.domElement.removeEventListener("wheel",q),n.domElement.removeEventListener("pointermove",z),n.domElement.removeEventListener("pointerup",R),n._domElementKeyEvents!==null&&n._domElementKeyEvents.removeEventListener("keydown",ut)};let n=this,i={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},s=i.NONE,o=1e-6,r=new vi,l=new vi,c=1,p=new $,h=!1,f=new zt,m=new zt,g=new zt,u=new zt,d=new zt,x=new zt,y=new zt,M=new zt,w=new zt,S=[],I={};function D(){return 2*Math.PI/60/60*n.autoRotateSpeed}function A(){return Math.pow(.95,n.zoomSpeed)}function k(N){l.theta-=N}function T(N){l.phi-=N}let F=function(){let N=new $;return function(dt,wt){N.setFromMatrixColumn(wt,0),N.multiplyScalar(-dt),p.add(N)}}(),v=function(){let N=new $;return function(dt,wt){n.screenSpacePanning===!0?N.setFromMatrixColumn(wt,1):(N.setFromMatrixColumn(wt,0),N.crossVectors(n.object.up,N)),N.multiplyScalar(dt),p.add(N)}}(),O=function(){let N=new $;return function(dt,wt){let yt=n.domElement;if(n.object.isPerspectiveCamera){let St=n.object.position;N.copy(St).sub(n.target);let Pt=N.length();Pt*=Math.tan(n.object.fov/2*Math.PI/180),F(2*dt*Pt/yt.clientHeight,n.object.matrix),v(2*wt*Pt/yt.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(F(dt*(n.object.right-n.object.left)/n.object.zoom/yt.clientWidth,n.object.matrix),v(wt*(n.object.top-n.object.bottom)/n.object.zoom/yt.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}}();function B(N){n.object.isPerspectiveCamera?c/=N:n.object.isOrthographicCamera?(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom*N)),n.object.updateProjectionMatrix(),h=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function U(N){n.object.isPerspectiveCamera?c*=N:n.object.isOrthographicCamera?(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/N)),n.object.updateProjectionMatrix(),h=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function nt(N){f.set(N.clientX,N.clientY)}function G(N){y.set(N.clientX,N.clientY)}function J(N){u.set(N.clientX,N.clientY)}function C(N){m.set(N.clientX,N.clientY),g.subVectors(m,f).multiplyScalar(n.rotateSpeed);let Y=n.domElement;k(2*Math.PI*g.x/Y.clientHeight),T(2*Math.PI*g.y/Y.clientHeight),f.copy(m),n.update()}function P(N){M.set(N.clientX,N.clientY),w.subVectors(M,y),w.y>0?B(A()):w.y<0&&U(A()),y.copy(M),n.update()}function it(N){d.set(N.clientX,N.clientY),x.subVectors(d,u).multiplyScalar(n.panSpeed),O(x.x,x.y),u.copy(d),n.update()}function Z(N){N.deltaY<0?U(A()):N.deltaY>0&&B(A()),n.update()}function K(N){let Y=!1;switch(N.code){case n.keys.UP:O(0,n.keyPanSpeed),Y=!0;break;case n.keys.BOTTOM:O(0,-n.keyPanSpeed),Y=!0;break;case n.keys.LEFT:O(n.keyPanSpeed,0),Y=!0;break;case n.keys.RIGHT:O(-n.keyPanSpeed,0),Y=!0;break}Y&&(N.preventDefault(),n.update())}function ft(){if(S.length===1)f.set(S[0].pageX,S[0].pageY);else{let N=.5*(S[0].pageX+S[1].pageX),Y=.5*(S[0].pageY+S[1].pageY);f.set(N,Y)}}function At(){if(S.length===1)u.set(S[0].pageX,S[0].pageY);else{let N=.5*(S[0].pageX+S[1].pageX),Y=.5*(S[0].pageY+S[1].pageY);u.set(N,Y)}}function et(){let N=S[0].pageX-S[1].pageX,Y=S[0].pageY-S[1].pageY,dt=Math.sqrt(N*N+Y*Y);y.set(0,dt)}function Tt(){n.enableZoom&&et(),n.enablePan&&At()}function Mt(){n.enableZoom&&et(),n.enableRotate&&ft()}function bt(N){if(S.length==1)m.set(N.pageX,N.pageY);else{let dt=Et(N),wt=.5*(N.pageX+dt.x),yt=.5*(N.pageY+dt.y);m.set(wt,yt)}g.subVectors(m,f).multiplyScalar(n.rotateSpeed);let Y=n.domElement;k(2*Math.PI*g.x/Y.clientHeight),T(2*Math.PI*g.y/Y.clientHeight),f.copy(m)}function xt(N){if(S.length===1)d.set(N.pageX,N.pageY);else{let Y=Et(N),dt=.5*(N.pageX+Y.x),wt=.5*(N.pageY+Y.y);d.set(dt,wt)}x.subVectors(d,u).multiplyScalar(n.panSpeed),O(x.x,x.y),u.copy(d)}function Dt(N){let Y=Et(N),dt=N.pageX-Y.x,wt=N.pageY-Y.y,yt=Math.sqrt(dt*dt+wt*wt);M.set(0,yt),w.set(0,Math.pow(M.y/y.y,n.zoomSpeed)),B(w.y),y.copy(M)}function _(N){n.enableZoom&&Dt(N),n.enablePan&&xt(N)}function X(N){n.enableZoom&&Dt(N),n.enableRotate&&bt(N)}function Q(N){n.enabled!==!1&&(S.length===0&&(n.domElement.setPointerCapture(N.pointerId),n.domElement.addEventListener("pointermove",z),n.domElement.addEventListener("pointerup",R)),ot(N),N.pointerType==="touch"?E(N):rt(N))}function z(N){n.enabled!==!1&&(N.pointerType==="touch"?b(N):st(N))}function R(N){ht(N),S.length===0&&(n.domElement.releasePointerCapture(N.pointerId),n.domElement.removeEventListener("pointermove",z),n.domElement.removeEventListener("pointerup",R)),n.dispatchEvent(_o),s=i.NONE}function V(N){ht(N)}function rt(N){let Y;switch(N.button){case 0:Y=n.mouseButtons.LEFT;break;case 1:Y=n.mouseButtons.MIDDLE;break;case 2:Y=n.mouseButtons.RIGHT;break;default:Y=-1}switch(Y){case En.DOLLY:if(n.enableZoom===!1)return;G(N),s=i.DOLLY;break;case En.ROTATE:if(N.ctrlKey||N.metaKey||N.shiftKey){if(n.enablePan===!1)return;J(N),s=i.PAN}else{if(n.enableRotate===!1)return;nt(N),s=i.ROTATE}break;case En.PAN:if(N.ctrlKey||N.metaKey||N.shiftKey){if(n.enableRotate===!1)return;nt(N),s=i.ROTATE}else{if(n.enablePan===!1)return;J(N),s=i.PAN}break;default:s=i.NONE}s!==i.NONE&&n.dispatchEvent(zr)}function st(N){switch(s){case i.ROTATE:if(n.enableRotate===!1)return;C(N);break;case i.DOLLY:if(n.enableZoom===!1)return;P(N);break;case i.PAN:if(n.enablePan===!1)return;it(N);break}}function q(N){n.enabled===!1||n.enableZoom===!1||s!==i.NONE||(N.preventDefault(),n.dispatchEvent(zr),Z(N),n.dispatchEvent(_o))}function ut(N){n.enabled===!1||n.enablePan===!1||K(N)}function E(N){switch(pt(N),S.length){case 1:switch(n.touches.ONE){case Cn.ROTATE:if(n.enableRotate===!1)return;ft(),s=i.TOUCH_ROTATE;break;case Cn.PAN:if(n.enablePan===!1)return;At(),s=i.TOUCH_PAN;break;default:s=i.NONE}break;case 2:switch(n.touches.TWO){case Cn.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;Tt(),s=i.TOUCH_DOLLY_PAN;break;case Cn.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;Mt(),s=i.TOUCH_DOLLY_ROTATE;break;default:s=i.NONE}break;default:s=i.NONE}s!==i.NONE&&n.dispatchEvent(zr)}function b(N){switch(pt(N),s){case i.TOUCH_ROTATE:if(n.enableRotate===!1)return;bt(N),n.update();break;case i.TOUCH_PAN:if(n.enablePan===!1)return;xt(N),n.update();break;case i.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;_(N),n.update();break;case i.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;X(N),n.update();break;default:s=i.NONE}}function H(N){n.enabled!==!1&&N.preventDefault()}function ot(N){S.push(N)}function ht(N){delete I[N.pointerId];for(let Y=0;Y<S.length;Y++)if(S[Y].pointerId==N.pointerId){S.splice(Y,1);return}}function pt(N){let Y=I[N.pointerId];Y===void 0&&(Y=new zt,I[N.pointerId]=Y),Y.set(N.pageX,N.pageY)}function Et(N){let Y=N.pointerId===S[0].pointerId?S[1]:S[0];return I[Y.pointerId]}n.domElement.addEventListener("contextmenu",H),n.domElement.addEventListener("pointerdown",Q),n.domElement.addEventListener("pointercancel",V),n.domElement.addEventListener("wheel",q,{passive:!1}),this.update()}};var hs=class extends Le{constructor({topViews:e,frontViews:n,sideViews:i}){super();ie(this,"topViews");ie(this,"frontViews");ie(this,"sideViews");this.topViews=e,this.frontViews=n,this.sideViews=i,this.uniforms.topViews={type:"tv",value:e},this.uniforms.frontViews={type:"tv",value:n},this.uniforms.sideViews={type:"tv",value:i},this.vertexShader=`
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

        vec4 t = vec4(0,0,0,0);
        vec4 f = vec4(0,0,0,0);
        vec4 s = vec4(0,0,0,0);
        #pragma unroll_loop_start
        for (int i = 0; i < 4; i++) {
            t = texture2D(topViews[i], vec2(mp.x, 1.0 - mp.z));
            f = texture2D(frontViews[i], mp.xy);
            s = texture2D(sideViews[i], mp.zy);

            if (t.a > 0.5 && f.a > 0.5 && s.a > 0.5) {
                //gl_FragColor = vec4((t.xyz + f.xyz + s.xyz)/3.0, 1);
                gl_FragColor = vec4(f.xyz, 1);
                if (distance(f.xyz, s.xyz) < 0.01)
                    gl_FragColor = vec4(f.xyz, 1);
                if (distance(t.xyz, f.xyz) < 0.01)
                    gl_FragColor = vec4(t.xyz, 1);
                if (distance(t.xyz, s.xyz) < 0.01)
                    gl_FragColor = vec4(t.xyz, 1);
                break;
            }
        }
        #pragma unroll_loop_end

        // vec3 border = abs(mp - vec3(0.5,0.5,0.5));
        // const float width = 0.48;
        // if (border.x > width && border.y > width && border.z > width) {
        //     gl_FragColor = vec4(0,0,0,1);
        //     break;
        // }
    }
}
`,this.side=ke}};var Or=Do(vo());window.addEventListener("load",()=>{let a=new rs,t=new le(60,1,.1,1e3),e=document.getElementById("three-canvas"),{width:n,height:i}=e.getBoundingClientRect();e.width=n,e.height=n;let s=new Cr({canvas:e});s.setClearColor(16777215);let o=[document.getElementById("top-view"),document.getElementById("front-view"),document.getElementById("side-view")],r=o.map(m=>m.textures),l=new cs(t,s.domElement);l.enableDamping=!0,t.position.z=1,l.update();function c(){requestAnimationFrame(c),l.update(),s.render(a,t)}c(),document.getElementById("palette").addEventListener("change",m=>{for(let g of o)g.color=m.detail}),document.getElementById("brush").addEventListener("change",m=>{for(let g of o)g.brushSize=parseInt(m.target.value)}),document.getElementById("shape").addEventListener("click",m=>{m.target.textContent=="\u2B24"?m.target.textContent="\u2BC0":m.target.textContent="\u2B24";for(let g of o)g.brushSquare=!g.brushSquare}),document.getElementById("clear").addEventListener("click",()=>{if(confirm("Are you sure you want to clear this layer?"))for(let m of o)m.clear()}),document.getElementById("save").addEventListener("click",async()=>{let m=new Or.default;for(let g of o){let u=m.folder(g.id);for(let[d,x]of(await g.serialize()).entries())x!=null&&u.file(`layer-${d}.png`,x)}m.generateAsync({type:"blob"}).then(function(g){let u=URL.createObjectURL(g),d=document.createElement("a");d.href=u,d.download="model.zip",d.click()})}),document.getElementById("load").addEventListener("change",async m=>{let g=m.target.files;if(g.length==0)return;let u=g[0],d=new Or.default;await d.loadAsync(u);for(let x of o){let y=Array(4).fill(null);for(let[M,w]of Object.entries(d.files)){let S=M.match(new RegExp(`${x.id}/layer-(\\d+).png`));S!=null&&(y[parseInt(S[1])]=await w.async("blob"),y[parseInt(S[1])]=y[parseInt(S[1])].slice(0,y[parseInt(S[1])].size,"image/png"))}await x.deserialize(y)}}),[...document.getElementsByTagName("itmas-layer")].forEach(m=>{loadingLayers=!1;let g=parseInt(m.getAttribute("layer"));m.addEventListener("click",async()=>{var u;if(loadingLayers){console.warn("Attempted to load layers while loading layers!");return}loadingLayers=!0,(u=document.querySelector("itmas-layer.selected"))==null||u.classList.remove("selected"),m.classList.add("selected"),await Promise.all(o.map(d=>d.loadLayer(g))),loadingLayers=!1})});let p=new je(1,1,1),h=new hs({topViews:r[0],frontViews:r[1],sideViews:r[2]}),f=new be(p,h);a.add(f)});})();
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

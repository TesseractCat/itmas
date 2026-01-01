(()=>{var gl=Object.create;var qs=Object.defineProperty;var _l=Object.getOwnPropertyDescriptor;var xl=Object.getOwnPropertyNames;var vl=Object.getPrototypeOf,yl=Object.prototype.hasOwnProperty;var bl=(r,t,e)=>t in r?qs(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var Pi=(r=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(r,{get:(t,e)=>(typeof require<"u"?require:t)[e]}):r)(function(r){if(typeof require<"u")return require.apply(this,arguments);throw new Error('Dynamic require of "'+r+'" is not supported')});var wl=(r,t)=>()=>(t||r((t={exports:{}}).exports,t),t.exports);var Ml=(r,t,e,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of xl(t))!yl.call(r,i)&&i!==e&&qs(r,i,{get:()=>t[i],enumerable:!(n=_l(t,i))||n.enumerable});return r};var Sl=(r,t,e)=>(e=r!=null?gl(vl(r)):{},Ml(t||!r||!r.__esModule?qs(e,"default",{value:r,enumerable:!0}):e,r));var Nt=(r,t,e)=>(bl(r,typeof t!="symbol"?t+"":t,e),e);var il=wl((nl,ga)=>{(function(r){typeof nl=="object"&&typeof ga<"u"?ga.exports=r():typeof define=="function"&&define.amd?define([],r):(typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:this).JSZip=r()})(function(){return function r(t,e,n){function i(a,c){if(!e[a]){if(!t[a]){var l=typeof Pi=="function"&&Pi;if(!c&&l)return l(a,!0);if(s)return s(a,!0);var p=new Error("Cannot find module '"+a+"'");throw p.code="MODULE_NOT_FOUND",p}var h=e[a]={exports:{}};t[a][0].call(h.exports,function(d){var m=t[a][1][d];return i(m||d)},h,h.exports,r,t,e,n)}return e[a].exports}for(var s=typeof Pi=="function"&&Pi,o=0;o<n.length;o++)i(n[o]);return i}({1:[function(r,t,e){"use strict";var n=r("./utils"),i=r("./support"),s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";e.encode=function(o){for(var a,c,l,p,h,d,m,g=[],u=0,f=o.length,_=f,y=n.getTypeOf(o)!=="string";u<o.length;)_=f-u,l=y?(a=o[u++],c=u<f?o[u++]:0,u<f?o[u++]:0):(a=o.charCodeAt(u++),c=u<f?o.charCodeAt(u++):0,u<f?o.charCodeAt(u++):0),p=a>>2,h=(3&a)<<4|c>>4,d=1<_?(15&c)<<2|l>>6:64,m=2<_?63&l:64,g.push(s.charAt(p)+s.charAt(h)+s.charAt(d)+s.charAt(m));return g.join("")},e.decode=function(o){var a,c,l,p,h,d,m=0,g=0,u="data:";if(o.substr(0,u.length)===u)throw new Error("Invalid base64 input, it looks like a data url.");var f,_=3*(o=o.replace(/[^A-Za-z0-9+/=]/g,"")).length/4;if(o.charAt(o.length-1)===s.charAt(64)&&_--,o.charAt(o.length-2)===s.charAt(64)&&_--,_%1!=0)throw new Error("Invalid base64 input, bad content length.");for(f=i.uint8array?new Uint8Array(0|_):new Array(0|_);m<o.length;)a=s.indexOf(o.charAt(m++))<<2|(p=s.indexOf(o.charAt(m++)))>>4,c=(15&p)<<4|(h=s.indexOf(o.charAt(m++)))>>2,l=(3&h)<<6|(d=s.indexOf(o.charAt(m++))),f[g++]=a,h!==64&&(f[g++]=c),d!==64&&(f[g++]=l);return f}},{"./support":30,"./utils":32}],2:[function(r,t,e){"use strict";var n=r("./external"),i=r("./stream/DataWorker"),s=r("./stream/Crc32Probe"),o=r("./stream/DataLengthProbe");function a(c,l,p,h,d){this.compressedSize=c,this.uncompressedSize=l,this.crc32=p,this.compression=h,this.compressedContent=d}a.prototype={getContentWorker:function(){var c=new i(n.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new o("data_length")),l=this;return c.on("end",function(){if(this.streamInfo.data_length!==l.uncompressedSize)throw new Error("Bug : uncompressed data size mismatch")}),c},getCompressedWorker:function(){return new i(n.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize",this.compressedSize).withStreamInfo("uncompressedSize",this.uncompressedSize).withStreamInfo("crc32",this.crc32).withStreamInfo("compression",this.compression)}},a.createWorkerFrom=function(c,l,p){return c.pipe(new s).pipe(new o("uncompressedSize")).pipe(l.compressWorker(p)).pipe(new o("compressedSize")).withStreamInfo("compression",l)},t.exports=a},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(r,t,e){"use strict";var n=r("./stream/GenericWorker");e.STORE={magic:"\0\0",compressWorker:function(){return new n("STORE compression")},uncompressWorker:function(){return new n("STORE decompression")}},e.DEFLATE=r("./flate")},{"./flate":7,"./stream/GenericWorker":28}],4:[function(r,t,e){"use strict";var n=r("./utils"),i=function(){for(var s,o=[],a=0;a<256;a++){s=a;for(var c=0;c<8;c++)s=1&s?3988292384^s>>>1:s>>>1;o[a]=s}return o}();t.exports=function(s,o){return s!==void 0&&s.length?n.getTypeOf(s)!=="string"?function(a,c,l,p){var h=i,d=p+l;a^=-1;for(var m=p;m<d;m++)a=a>>>8^h[255&(a^c[m])];return-1^a}(0|o,s,s.length,0):function(a,c,l,p){var h=i,d=p+l;a^=-1;for(var m=p;m<d;m++)a=a>>>8^h[255&(a^c.charCodeAt(m))];return-1^a}(0|o,s,s.length,0):0}},{"./utils":32}],5:[function(r,t,e){"use strict";e.base64=!1,e.binary=!1,e.dir=!1,e.createFolders=!0,e.date=null,e.compression=null,e.compressionOptions=null,e.comment=null,e.unixPermissions=null,e.dosPermissions=null},{}],6:[function(r,t,e){"use strict";var n=null;n=typeof Promise<"u"?Promise:r("lie"),t.exports={Promise:n}},{lie:37}],7:[function(r,t,e){"use strict";var n=typeof Uint8Array<"u"&&typeof Uint16Array<"u"&&typeof Uint32Array<"u",i=r("pako"),s=r("./utils"),o=r("./stream/GenericWorker"),a=n?"uint8array":"array";function c(l,p){o.call(this,"FlateWorker/"+l),this._pako=null,this._pakoAction=l,this._pakoOptions=p,this.meta={}}e.magic="\b\0",s.inherits(c,o),c.prototype.processChunk=function(l){this.meta=l.meta,this._pako===null&&this._createPako(),this._pako.push(s.transformTo(a,l.data),!1)},c.prototype.flush=function(){o.prototype.flush.call(this),this._pako===null&&this._createPako(),this._pako.push([],!0)},c.prototype.cleanUp=function(){o.prototype.cleanUp.call(this),this._pako=null},c.prototype._createPako=function(){this._pako=new i[this._pakoAction]({raw:!0,level:this._pakoOptions.level||-1});var l=this;this._pako.onData=function(p){l.push({data:p,meta:l.meta})}},e.compressWorker=function(l){return new c("Deflate",l)},e.uncompressWorker=function(){return new c("Inflate",{})}},{"./stream/GenericWorker":28,"./utils":32,pako:38}],8:[function(r,t,e){"use strict";function n(h,d){var m,g="";for(m=0;m<d;m++)g+=String.fromCharCode(255&h),h>>>=8;return g}function i(h,d,m,g,u,f){var _,y,M=h.file,w=h.compression,S=f!==a.utf8encode,D=s.transformTo("string",f(M.name)),T=s.transformTo("string",a.utf8encode(M.name)),b=M.comment,L=s.transformTo("string",f(b)),E=s.transformTo("string",a.utf8encode(b)),N=T.length!==M.name.length,v=E.length!==b.length,O="",B="",F="",$=M.dir,q=M.date,j={crc32:0,compressedSize:0,uncompressedSize:0};d&&!m||(j.crc32=h.crc32,j.compressedSize=h.compressedSize,j.uncompressedSize=h.uncompressedSize);var P=0;d&&(P|=8),S||!N&&!v||(P|=2048);var R=0,it=0;$&&(R|=16),u==="UNIX"?(it=798,R|=function(Q,ft){var Et=Q;return Q||(Et=ft?16893:33204),(65535&Et)<<16}(M.unixPermissions,$)):(it=20,R|=function(Q){return 63&(Q||0)}(M.dosPermissions)),_=q.getUTCHours(),_<<=6,_|=q.getUTCMinutes(),_<<=5,_|=q.getUTCSeconds()/2,y=q.getUTCFullYear()-1980,y<<=4,y|=q.getUTCMonth()+1,y<<=5,y|=q.getUTCDate(),N&&(B=n(1,1)+n(c(D),4)+T,O+="up"+n(B.length,2)+B),v&&(F=n(1,1)+n(c(L),4)+E,O+="uc"+n(F.length,2)+F);var Y="";return Y+=`
\0`,Y+=n(P,2),Y+=w.magic,Y+=n(_,2),Y+=n(y,2),Y+=n(j.crc32,4),Y+=n(j.compressedSize,4),Y+=n(j.uncompressedSize,4),Y+=n(D.length,2),Y+=n(O.length,2),{fileRecord:l.LOCAL_FILE_HEADER+Y+D+O,dirRecord:l.CENTRAL_FILE_HEADER+n(it,2)+Y+n(L.length,2)+"\0\0\0\0"+n(R,4)+n(g,4)+D+O+L}}var s=r("../utils"),o=r("../stream/GenericWorker"),a=r("../utf8"),c=r("../crc32"),l=r("../signature");function p(h,d,m,g){o.call(this,"ZipFileWorker"),this.bytesWritten=0,this.zipComment=d,this.zipPlatform=m,this.encodeFileName=g,this.streamFiles=h,this.accumulate=!1,this.contentBuffer=[],this.dirRecords=[],this.currentSourceOffset=0,this.entriesCount=0,this.currentFile=null,this._sources=[]}s.inherits(p,o),p.prototype.push=function(h){var d=h.meta.percent||0,m=this.entriesCount,g=this._sources.length;this.accumulate?this.contentBuffer.push(h):(this.bytesWritten+=h.data.length,o.prototype.push.call(this,{data:h.data,meta:{currentFile:this.currentFile,percent:m?(d+100*(m-g-1))/m:100}}))},p.prototype.openedSource=function(h){this.currentSourceOffset=this.bytesWritten,this.currentFile=h.file.name;var d=this.streamFiles&&!h.file.dir;if(d){var m=i(h,d,!1,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.push({data:m.fileRecord,meta:{percent:0}})}else this.accumulate=!0},p.prototype.closedSource=function(h){this.accumulate=!1;var d=this.streamFiles&&!h.file.dir,m=i(h,d,!0,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);if(this.dirRecords.push(m.dirRecord),d)this.push({data:function(g){return l.DATA_DESCRIPTOR+n(g.crc32,4)+n(g.compressedSize,4)+n(g.uncompressedSize,4)}(h),meta:{percent:100}});else for(this.push({data:m.fileRecord,meta:{percent:0}});this.contentBuffer.length;)this.push(this.contentBuffer.shift());this.currentFile=null},p.prototype.flush=function(){for(var h=this.bytesWritten,d=0;d<this.dirRecords.length;d++)this.push({data:this.dirRecords[d],meta:{percent:100}});var m=this.bytesWritten-h,g=function(u,f,_,y,M){var w=s.transformTo("string",M(y));return l.CENTRAL_DIRECTORY_END+"\0\0\0\0"+n(u,2)+n(u,2)+n(f,4)+n(_,4)+n(w.length,2)+w}(this.dirRecords.length,m,h,this.zipComment,this.encodeFileName);this.push({data:g,meta:{percent:100}})},p.prototype.prepareNextSource=function(){this.previous=this._sources.shift(),this.openedSource(this.previous.streamInfo),this.isPaused?this.previous.pause():this.previous.resume()},p.prototype.registerPrevious=function(h){this._sources.push(h);var d=this;return h.on("data",function(m){d.processChunk(m)}),h.on("end",function(){d.closedSource(d.previous.streamInfo),d._sources.length?d.prepareNextSource():d.end()}),h.on("error",function(m){d.error(m)}),this},p.prototype.resume=function(){return!!o.prototype.resume.call(this)&&(!this.previous&&this._sources.length?(this.prepareNextSource(),!0):this.previous||this._sources.length||this.generatedError?void 0:(this.end(),!0))},p.prototype.error=function(h){var d=this._sources;if(!o.prototype.error.call(this,h))return!1;for(var m=0;m<d.length;m++)try{d[m].error(h)}catch(g){}return!0},p.prototype.lock=function(){o.prototype.lock.call(this);for(var h=this._sources,d=0;d<h.length;d++)h[d].lock()},t.exports=p},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(r,t,e){"use strict";var n=r("../compressions"),i=r("./ZipFileWorker");e.generateWorker=function(s,o,a){var c=new i(o.streamFiles,a,o.platform,o.encodeFileName),l=0;try{s.forEach(function(p,h){l++;var d=function(f,_){var y=f||_,M=n[y];if(!M)throw new Error(y+" is not a valid compression method !");return M}(h.options.compression,o.compression),m=h.options.compressionOptions||o.compressionOptions||{},g=h.dir,u=h.date;h._compressWorker(d,m).withStreamInfo("file",{name:p,dir:g,date:u,comment:h.comment||"",unixPermissions:h.unixPermissions,dosPermissions:h.dosPermissions}).pipe(c)}),c.entriesCount=l}catch(p){c.error(p)}return c}},{"../compressions":3,"./ZipFileWorker":8}],10:[function(r,t,e){"use strict";function n(){if(!(this instanceof n))return new n;if(arguments.length)throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");this.files=Object.create(null),this.comment=null,this.root="",this.clone=function(){var i=new n;for(var s in this)typeof this[s]!="function"&&(i[s]=this[s]);return i}}(n.prototype=r("./object")).loadAsync=r("./load"),n.support=r("./support"),n.defaults=r("./defaults"),n.version="3.10.1",n.loadAsync=function(i,s){return new n().loadAsync(i,s)},n.external=r("./external"),t.exports=n},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(r,t,e){"use strict";var n=r("./utils"),i=r("./external"),s=r("./utf8"),o=r("./zipEntries"),a=r("./stream/Crc32Probe"),c=r("./nodejsUtils");function l(p){return new i.Promise(function(h,d){var m=p.decompressed.getContentWorker().pipe(new a);m.on("error",function(g){d(g)}).on("end",function(){m.streamInfo.crc32!==p.decompressed.crc32?d(new Error("Corrupted zip : CRC32 mismatch")):h()}).resume()})}t.exports=function(p,h){var d=this;return h=n.extend(h||{},{base64:!1,checkCRC32:!1,optimizedBinaryString:!1,createFolders:!1,decodeFileName:s.utf8decode}),c.isNode&&c.isStream(p)?i.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")):n.prepareContent("the loaded zip file",p,!0,h.optimizedBinaryString,h.base64).then(function(m){var g=new o(h);return g.load(m),g}).then(function(m){var g=[i.Promise.resolve(m)],u=m.files;if(h.checkCRC32)for(var f=0;f<u.length;f++)g.push(l(u[f]));return i.Promise.all(g)}).then(function(m){for(var g=m.shift(),u=g.files,f=0;f<u.length;f++){var _=u[f],y=_.fileNameStr,M=n.resolve(_.fileNameStr);d.file(M,_.decompressed,{binary:!0,optimizedBinaryString:!0,date:_.date,dir:_.dir,comment:_.fileCommentStr.length?_.fileCommentStr:null,unixPermissions:_.unixPermissions,dosPermissions:_.dosPermissions,createFolders:h.createFolders}),_.dir||(d.file(M).unsafeOriginalName=y)}return g.zipComment.length&&(d.comment=g.zipComment),d})}},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(r,t,e){"use strict";var n=r("../utils"),i=r("../stream/GenericWorker");function s(o,a){i.call(this,"Nodejs stream input adapter for "+o),this._upstreamEnded=!1,this._bindStream(a)}n.inherits(s,i),s.prototype._bindStream=function(o){var a=this;(this._stream=o).pause(),o.on("data",function(c){a.push({data:c,meta:{percent:0}})}).on("error",function(c){a.isPaused?this.generatedError=c:a.error(c)}).on("end",function(){a.isPaused?a._upstreamEnded=!0:a.end()})},s.prototype.pause=function(){return!!i.prototype.pause.call(this)&&(this._stream.pause(),!0)},s.prototype.resume=function(){return!!i.prototype.resume.call(this)&&(this._upstreamEnded?this.end():this._stream.resume(),!0)},t.exports=s},{"../stream/GenericWorker":28,"../utils":32}],13:[function(r,t,e){"use strict";var n=r("readable-stream").Readable;function i(s,o,a){n.call(this,o),this._helper=s;var c=this;s.on("data",function(l,p){c.push(l)||c._helper.pause(),a&&a(p)}).on("error",function(l){c.emit("error",l)}).on("end",function(){c.push(null)})}r("../utils").inherits(i,n),i.prototype._read=function(){this._helper.resume()},t.exports=i},{"../utils":32,"readable-stream":16}],14:[function(r,t,e){"use strict";t.exports={isNode:typeof Buffer<"u",newBufferFrom:function(n,i){if(Buffer.from&&Buffer.from!==Uint8Array.from)return Buffer.from(n,i);if(typeof n=="number")throw new Error('The "data" argument must not be a number');return new Buffer(n,i)},allocBuffer:function(n){if(Buffer.alloc)return Buffer.alloc(n);var i=new Buffer(n);return i.fill(0),i},isBuffer:function(n){return Buffer.isBuffer(n)},isStream:function(n){return n&&typeof n.on=="function"&&typeof n.pause=="function"&&typeof n.resume=="function"}}},{}],15:[function(r,t,e){"use strict";function n(M,w,S){var D,T=s.getTypeOf(w),b=s.extend(S||{},c);b.date=b.date||new Date,b.compression!==null&&(b.compression=b.compression.toUpperCase()),typeof b.unixPermissions=="string"&&(b.unixPermissions=parseInt(b.unixPermissions,8)),b.unixPermissions&&16384&b.unixPermissions&&(b.dir=!0),b.dosPermissions&&16&b.dosPermissions&&(b.dir=!0),b.dir&&(M=u(M)),b.createFolders&&(D=g(M))&&f.call(this,D,!0);var L=T==="string"&&b.binary===!1&&b.base64===!1;S&&S.binary!==void 0||(b.binary=!L),(w instanceof l&&w.uncompressedSize===0||b.dir||!w||w.length===0)&&(b.base64=!1,b.binary=!0,w="",b.compression="STORE",T="string");var E=null;E=w instanceof l||w instanceof o?w:d.isNode&&d.isStream(w)?new m(M,w):s.prepareContent(M,w,b.binary,b.optimizedBinaryString,b.base64);var N=new p(M,E,b);this.files[M]=N}var i=r("./utf8"),s=r("./utils"),o=r("./stream/GenericWorker"),a=r("./stream/StreamHelper"),c=r("./defaults"),l=r("./compressedObject"),p=r("./zipObject"),h=r("./generate"),d=r("./nodejsUtils"),m=r("./nodejs/NodejsStreamInputAdapter"),g=function(M){M.slice(-1)==="/"&&(M=M.substring(0,M.length-1));var w=M.lastIndexOf("/");return 0<w?M.substring(0,w):""},u=function(M){return M.slice(-1)!=="/"&&(M+="/"),M},f=function(M,w){return w=w!==void 0?w:c.createFolders,M=u(M),this.files[M]||n.call(this,M,null,{dir:!0,createFolders:w}),this.files[M]};function _(M){return Object.prototype.toString.call(M)==="[object RegExp]"}var y={load:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},forEach:function(M){var w,S,D;for(w in this.files)D=this.files[w],(S=w.slice(this.root.length,w.length))&&w.slice(0,this.root.length)===this.root&&M(S,D)},filter:function(M){var w=[];return this.forEach(function(S,D){M(S,D)&&w.push(D)}),w},file:function(M,w,S){if(arguments.length!==1)return M=this.root+M,n.call(this,M,w,S),this;if(_(M)){var D=M;return this.filter(function(b,L){return!L.dir&&D.test(b)})}var T=this.files[this.root+M];return T&&!T.dir?T:null},folder:function(M){if(!M)return this;if(_(M))return this.filter(function(T,b){return b.dir&&M.test(T)});var w=this.root+M,S=f.call(this,w),D=this.clone();return D.root=S.name,D},remove:function(M){M=this.root+M;var w=this.files[M];if(w||(M.slice(-1)!=="/"&&(M+="/"),w=this.files[M]),w&&!w.dir)delete this.files[M];else for(var S=this.filter(function(T,b){return b.name.slice(0,M.length)===M}),D=0;D<S.length;D++)delete this.files[S[D].name];return this},generate:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},generateInternalStream:function(M){var w,S={};try{if((S=s.extend(M||{},{streamFiles:!1,compression:"STORE",compressionOptions:null,type:"",platform:"DOS",comment:null,mimeType:"application/zip",encodeFileName:i.utf8encode})).type=S.type.toLowerCase(),S.compression=S.compression.toUpperCase(),S.type==="binarystring"&&(S.type="string"),!S.type)throw new Error("No output type specified.");s.checkSupport(S.type),S.platform!=="darwin"&&S.platform!=="freebsd"&&S.platform!=="linux"&&S.platform!=="sunos"||(S.platform="UNIX"),S.platform==="win32"&&(S.platform="DOS");var D=S.comment||this.comment||"";w=h.generateWorker(this,S,D)}catch(T){(w=new o("error")).error(T)}return new a(w,S.type||"string",S.mimeType)},generateAsync:function(M,w){return this.generateInternalStream(M).accumulate(w)},generateNodeStream:function(M,w){return(M=M||{}).type||(M.type="nodebuffer"),this.generateInternalStream(M).toNodejsStream(w)}};t.exports=y},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(r,t,e){"use strict";t.exports=r("stream")},{stream:void 0}],17:[function(r,t,e){"use strict";var n=r("./DataReader");function i(s){n.call(this,s);for(var o=0;o<this.data.length;o++)s[o]=255&s[o]}r("../utils").inherits(i,n),i.prototype.byteAt=function(s){return this.data[this.zero+s]},i.prototype.lastIndexOfSignature=function(s){for(var o=s.charCodeAt(0),a=s.charCodeAt(1),c=s.charCodeAt(2),l=s.charCodeAt(3),p=this.length-4;0<=p;--p)if(this.data[p]===o&&this.data[p+1]===a&&this.data[p+2]===c&&this.data[p+3]===l)return p-this.zero;return-1},i.prototype.readAndCheckSignature=function(s){var o=s.charCodeAt(0),a=s.charCodeAt(1),c=s.charCodeAt(2),l=s.charCodeAt(3),p=this.readData(4);return o===p[0]&&a===p[1]&&c===p[2]&&l===p[3]},i.prototype.readData=function(s){if(this.checkOffset(s),s===0)return[];var o=this.data.slice(this.zero+this.index,this.zero+this.index+s);return this.index+=s,o},t.exports=i},{"../utils":32,"./DataReader":18}],18:[function(r,t,e){"use strict";var n=r("../utils");function i(s){this.data=s,this.length=s.length,this.index=0,this.zero=0}i.prototype={checkOffset:function(s){this.checkIndex(this.index+s)},checkIndex:function(s){if(this.length<this.zero+s||s<0)throw new Error("End of data reached (data length = "+this.length+", asked index = "+s+"). Corrupted zip ?")},setIndex:function(s){this.checkIndex(s),this.index=s},skip:function(s){this.setIndex(this.index+s)},byteAt:function(){},readInt:function(s){var o,a=0;for(this.checkOffset(s),o=this.index+s-1;o>=this.index;o--)a=(a<<8)+this.byteAt(o);return this.index+=s,a},readString:function(s){return n.transformTo("string",this.readData(s))},readData:function(){},lastIndexOfSignature:function(){},readAndCheckSignature:function(){},readDate:function(){var s=this.readInt(4);return new Date(Date.UTC(1980+(s>>25&127),(s>>21&15)-1,s>>16&31,s>>11&31,s>>5&63,(31&s)<<1))}},t.exports=i},{"../utils":32}],19:[function(r,t,e){"use strict";var n=r("./Uint8ArrayReader");function i(s){n.call(this,s)}r("../utils").inherits(i,n),i.prototype.readData=function(s){this.checkOffset(s);var o=this.data.slice(this.zero+this.index,this.zero+this.index+s);return this.index+=s,o},t.exports=i},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(r,t,e){"use strict";var n=r("./DataReader");function i(s){n.call(this,s)}r("../utils").inherits(i,n),i.prototype.byteAt=function(s){return this.data.charCodeAt(this.zero+s)},i.prototype.lastIndexOfSignature=function(s){return this.data.lastIndexOf(s)-this.zero},i.prototype.readAndCheckSignature=function(s){return s===this.readData(4)},i.prototype.readData=function(s){this.checkOffset(s);var o=this.data.slice(this.zero+this.index,this.zero+this.index+s);return this.index+=s,o},t.exports=i},{"../utils":32,"./DataReader":18}],21:[function(r,t,e){"use strict";var n=r("./ArrayReader");function i(s){n.call(this,s)}r("../utils").inherits(i,n),i.prototype.readData=function(s){if(this.checkOffset(s),s===0)return new Uint8Array(0);var o=this.data.subarray(this.zero+this.index,this.zero+this.index+s);return this.index+=s,o},t.exports=i},{"../utils":32,"./ArrayReader":17}],22:[function(r,t,e){"use strict";var n=r("../utils"),i=r("../support"),s=r("./ArrayReader"),o=r("./StringReader"),a=r("./NodeBufferReader"),c=r("./Uint8ArrayReader");t.exports=function(l){var p=n.getTypeOf(l);return n.checkSupport(p),p!=="string"||i.uint8array?p==="nodebuffer"?new a(l):i.uint8array?new c(n.transformTo("uint8array",l)):new s(n.transformTo("array",l)):new o(l)}},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(r,t,e){"use strict";e.LOCAL_FILE_HEADER="PK",e.CENTRAL_FILE_HEADER="PK",e.CENTRAL_DIRECTORY_END="PK",e.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK\x07",e.ZIP64_CENTRAL_DIRECTORY_END="PK",e.DATA_DESCRIPTOR="PK\x07\b"},{}],24:[function(r,t,e){"use strict";var n=r("./GenericWorker"),i=r("../utils");function s(o){n.call(this,"ConvertWorker to "+o),this.destType=o}i.inherits(s,n),s.prototype.processChunk=function(o){this.push({data:i.transformTo(this.destType,o.data),meta:o.meta})},t.exports=s},{"../utils":32,"./GenericWorker":28}],25:[function(r,t,e){"use strict";var n=r("./GenericWorker"),i=r("../crc32");function s(){n.call(this,"Crc32Probe"),this.withStreamInfo("crc32",0)}r("../utils").inherits(s,n),s.prototype.processChunk=function(o){this.streamInfo.crc32=i(o.data,this.streamInfo.crc32||0),this.push(o)},t.exports=s},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(r,t,e){"use strict";var n=r("../utils"),i=r("./GenericWorker");function s(o){i.call(this,"DataLengthProbe for "+o),this.propName=o,this.withStreamInfo(o,0)}n.inherits(s,i),s.prototype.processChunk=function(o){if(o){var a=this.streamInfo[this.propName]||0;this.streamInfo[this.propName]=a+o.data.length}i.prototype.processChunk.call(this,o)},t.exports=s},{"../utils":32,"./GenericWorker":28}],27:[function(r,t,e){"use strict";var n=r("../utils"),i=r("./GenericWorker");function s(o){i.call(this,"DataWorker");var a=this;this.dataIsReady=!1,this.index=0,this.max=0,this.data=null,this.type="",this._tickScheduled=!1,o.then(function(c){a.dataIsReady=!0,a.data=c,a.max=c&&c.length||0,a.type=n.getTypeOf(c),a.isPaused||a._tickAndRepeat()},function(c){a.error(c)})}n.inherits(s,i),s.prototype.cleanUp=function(){i.prototype.cleanUp.call(this),this.data=null},s.prototype.resume=function(){return!!i.prototype.resume.call(this)&&(!this._tickScheduled&&this.dataIsReady&&(this._tickScheduled=!0,n.delay(this._tickAndRepeat,[],this)),!0)},s.prototype._tickAndRepeat=function(){this._tickScheduled=!1,this.isPaused||this.isFinished||(this._tick(),this.isFinished||(n.delay(this._tickAndRepeat,[],this),this._tickScheduled=!0))},s.prototype._tick=function(){if(this.isPaused||this.isFinished)return!1;var o=null,a=Math.min(this.max,this.index+16384);if(this.index>=this.max)return this.end();switch(this.type){case"string":o=this.data.substring(this.index,a);break;case"uint8array":o=this.data.subarray(this.index,a);break;case"array":case"nodebuffer":o=this.data.slice(this.index,a)}return this.index=a,this.push({data:o,meta:{percent:this.max?this.index/this.max*100:0}})},t.exports=s},{"../utils":32,"./GenericWorker":28}],28:[function(r,t,e){"use strict";function n(i){this.name=i||"default",this.streamInfo={},this.generatedError=null,this.extraStreamInfo={},this.isPaused=!0,this.isFinished=!1,this.isLocked=!1,this._listeners={data:[],end:[],error:[]},this.previous=null}n.prototype={push:function(i){this.emit("data",i)},end:function(){if(this.isFinished)return!1;this.flush();try{this.emit("end"),this.cleanUp(),this.isFinished=!0}catch(i){this.emit("error",i)}return!0},error:function(i){return!this.isFinished&&(this.isPaused?this.generatedError=i:(this.isFinished=!0,this.emit("error",i),this.previous&&this.previous.error(i),this.cleanUp()),!0)},on:function(i,s){return this._listeners[i].push(s),this},cleanUp:function(){this.streamInfo=this.generatedError=this.extraStreamInfo=null,this._listeners=[]},emit:function(i,s){if(this._listeners[i])for(var o=0;o<this._listeners[i].length;o++)this._listeners[i][o].call(this,s)},pipe:function(i){return i.registerPrevious(this)},registerPrevious:function(i){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.streamInfo=i.streamInfo,this.mergeStreamInfo(),this.previous=i;var s=this;return i.on("data",function(o){s.processChunk(o)}),i.on("end",function(){s.end()}),i.on("error",function(o){s.error(o)}),this},pause:function(){return!this.isPaused&&!this.isFinished&&(this.isPaused=!0,this.previous&&this.previous.pause(),!0)},resume:function(){if(!this.isPaused||this.isFinished)return!1;var i=this.isPaused=!1;return this.generatedError&&(this.error(this.generatedError),i=!0),this.previous&&this.previous.resume(),!i},flush:function(){},processChunk:function(i){this.push(i)},withStreamInfo:function(i,s){return this.extraStreamInfo[i]=s,this.mergeStreamInfo(),this},mergeStreamInfo:function(){for(var i in this.extraStreamInfo)Object.prototype.hasOwnProperty.call(this.extraStreamInfo,i)&&(this.streamInfo[i]=this.extraStreamInfo[i])},lock:function(){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.isLocked=!0,this.previous&&this.previous.lock()},toString:function(){var i="Worker "+this.name;return this.previous?this.previous+" -> "+i:i}},t.exports=n},{}],29:[function(r,t,e){"use strict";var n=r("../utils"),i=r("./ConvertWorker"),s=r("./GenericWorker"),o=r("../base64"),a=r("../support"),c=r("../external"),l=null;if(a.nodestream)try{l=r("../nodejs/NodejsStreamOutputAdapter")}catch(d){}function p(d,m){return new c.Promise(function(g,u){var f=[],_=d._internalType,y=d._outputType,M=d._mimeType;d.on("data",function(w,S){f.push(w),m&&m(S)}).on("error",function(w){f=[],u(w)}).on("end",function(){try{var w=function(S,D,T){switch(S){case"blob":return n.newBlob(n.transformTo("arraybuffer",D),T);case"base64":return o.encode(D);default:return n.transformTo(S,D)}}(y,function(S,D){var T,b=0,L=null,E=0;for(T=0;T<D.length;T++)E+=D[T].length;switch(S){case"string":return D.join("");case"array":return Array.prototype.concat.apply([],D);case"uint8array":for(L=new Uint8Array(E),T=0;T<D.length;T++)L.set(D[T],b),b+=D[T].length;return L;case"nodebuffer":return Buffer.concat(D);default:throw new Error("concat : unsupported type '"+S+"'")}}(_,f),M);g(w)}catch(S){u(S)}f=[]}).resume()})}function h(d,m,g){var u=m;switch(m){case"blob":case"arraybuffer":u="uint8array";break;case"base64":u="string"}try{this._internalType=u,this._outputType=m,this._mimeType=g,n.checkSupport(u),this._worker=d.pipe(new i(u)),d.lock()}catch(f){this._worker=new s("error"),this._worker.error(f)}}h.prototype={accumulate:function(d){return p(this,d)},on:function(d,m){var g=this;return d==="data"?this._worker.on(d,function(u){m.call(g,u.data,u.meta)}):this._worker.on(d,function(){n.delay(m,arguments,g)}),this},resume:function(){return n.delay(this._worker.resume,[],this._worker),this},pause:function(){return this._worker.pause(),this},toNodejsStream:function(d){if(n.checkSupport("nodestream"),this._outputType!=="nodebuffer")throw new Error(this._outputType+" is not supported by this method");return new l(this,{objectMode:this._outputType!=="nodebuffer"},d)}},t.exports=h},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(r,t,e){"use strict";if(e.base64=!0,e.array=!0,e.string=!0,e.arraybuffer=typeof ArrayBuffer<"u"&&typeof Uint8Array<"u",e.nodebuffer=typeof Buffer<"u",e.uint8array=typeof Uint8Array<"u",typeof ArrayBuffer>"u")e.blob=!1;else{var n=new ArrayBuffer(0);try{e.blob=new Blob([n],{type:"application/zip"}).size===0}catch(s){try{var i=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);i.append(n),e.blob=i.getBlob("application/zip").size===0}catch(o){e.blob=!1}}}try{e.nodestream=!!r("readable-stream").Readable}catch(s){e.nodestream=!1}},{"readable-stream":16}],31:[function(r,t,e){"use strict";for(var n=r("./utils"),i=r("./support"),s=r("./nodejsUtils"),o=r("./stream/GenericWorker"),a=new Array(256),c=0;c<256;c++)a[c]=252<=c?6:248<=c?5:240<=c?4:224<=c?3:192<=c?2:1;a[254]=a[254]=1;function l(){o.call(this,"utf-8 decode"),this.leftOver=null}function p(){o.call(this,"utf-8 encode")}e.utf8encode=function(h){return i.nodebuffer?s.newBufferFrom(h,"utf-8"):function(d){var m,g,u,f,_,y=d.length,M=0;for(f=0;f<y;f++)(64512&(g=d.charCodeAt(f)))==55296&&f+1<y&&(64512&(u=d.charCodeAt(f+1)))==56320&&(g=65536+(g-55296<<10)+(u-56320),f++),M+=g<128?1:g<2048?2:g<65536?3:4;for(m=i.uint8array?new Uint8Array(M):new Array(M),f=_=0;_<M;f++)(64512&(g=d.charCodeAt(f)))==55296&&f+1<y&&(64512&(u=d.charCodeAt(f+1)))==56320&&(g=65536+(g-55296<<10)+(u-56320),f++),g<128?m[_++]=g:(g<2048?m[_++]=192|g>>>6:(g<65536?m[_++]=224|g>>>12:(m[_++]=240|g>>>18,m[_++]=128|g>>>12&63),m[_++]=128|g>>>6&63),m[_++]=128|63&g);return m}(h)},e.utf8decode=function(h){return i.nodebuffer?n.transformTo("nodebuffer",h).toString("utf-8"):function(d){var m,g,u,f,_=d.length,y=new Array(2*_);for(m=g=0;m<_;)if((u=d[m++])<128)y[g++]=u;else if(4<(f=a[u]))y[g++]=65533,m+=f-1;else{for(u&=f===2?31:f===3?15:7;1<f&&m<_;)u=u<<6|63&d[m++],f--;1<f?y[g++]=65533:u<65536?y[g++]=u:(u-=65536,y[g++]=55296|u>>10&1023,y[g++]=56320|1023&u)}return y.length!==g&&(y.subarray?y=y.subarray(0,g):y.length=g),n.applyFromCharCode(y)}(h=n.transformTo(i.uint8array?"uint8array":"array",h))},n.inherits(l,o),l.prototype.processChunk=function(h){var d=n.transformTo(i.uint8array?"uint8array":"array",h.data);if(this.leftOver&&this.leftOver.length){if(i.uint8array){var m=d;(d=new Uint8Array(m.length+this.leftOver.length)).set(this.leftOver,0),d.set(m,this.leftOver.length)}else d=this.leftOver.concat(d);this.leftOver=null}var g=function(f,_){var y;for((_=_||f.length)>f.length&&(_=f.length),y=_-1;0<=y&&(192&f[y])==128;)y--;return y<0||y===0?_:y+a[f[y]]>_?y:_}(d),u=d;g!==d.length&&(i.uint8array?(u=d.subarray(0,g),this.leftOver=d.subarray(g,d.length)):(u=d.slice(0,g),this.leftOver=d.slice(g,d.length))),this.push({data:e.utf8decode(u),meta:h.meta})},l.prototype.flush=function(){this.leftOver&&this.leftOver.length&&(this.push({data:e.utf8decode(this.leftOver),meta:{}}),this.leftOver=null)},e.Utf8DecodeWorker=l,n.inherits(p,o),p.prototype.processChunk=function(h){this.push({data:e.utf8encode(h.data),meta:h.meta})},e.Utf8EncodeWorker=p},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(r,t,e){"use strict";var n=r("./support"),i=r("./base64"),s=r("./nodejsUtils"),o=r("./external");function a(m){return m}function c(m,g){for(var u=0;u<m.length;++u)g[u]=255&m.charCodeAt(u);return g}r("setimmediate"),e.newBlob=function(m,g){e.checkSupport("blob");try{return new Blob([m],{type:g})}catch(f){try{var u=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);return u.append(m),u.getBlob(g)}catch(_){throw new Error("Bug : can't construct the Blob.")}}};var l={stringifyByChunk:function(m,g,u){var f=[],_=0,y=m.length;if(y<=u)return String.fromCharCode.apply(null,m);for(;_<y;)g==="array"||g==="nodebuffer"?f.push(String.fromCharCode.apply(null,m.slice(_,Math.min(_+u,y)))):f.push(String.fromCharCode.apply(null,m.subarray(_,Math.min(_+u,y)))),_+=u;return f.join("")},stringifyByChar:function(m){for(var g="",u=0;u<m.length;u++)g+=String.fromCharCode(m[u]);return g},applyCanBeUsed:{uint8array:function(){try{return n.uint8array&&String.fromCharCode.apply(null,new Uint8Array(1)).length===1}catch(m){return!1}}(),nodebuffer:function(){try{return n.nodebuffer&&String.fromCharCode.apply(null,s.allocBuffer(1)).length===1}catch(m){return!1}}()}};function p(m){var g=65536,u=e.getTypeOf(m),f=!0;if(u==="uint8array"?f=l.applyCanBeUsed.uint8array:u==="nodebuffer"&&(f=l.applyCanBeUsed.nodebuffer),f)for(;1<g;)try{return l.stringifyByChunk(m,u,g)}catch(_){g=Math.floor(g/2)}return l.stringifyByChar(m)}function h(m,g){for(var u=0;u<m.length;u++)g[u]=m[u];return g}e.applyFromCharCode=p;var d={};d.string={string:a,array:function(m){return c(m,new Array(m.length))},arraybuffer:function(m){return d.string.uint8array(m).buffer},uint8array:function(m){return c(m,new Uint8Array(m.length))},nodebuffer:function(m){return c(m,s.allocBuffer(m.length))}},d.array={string:p,array:a,arraybuffer:function(m){return new Uint8Array(m).buffer},uint8array:function(m){return new Uint8Array(m)},nodebuffer:function(m){return s.newBufferFrom(m)}},d.arraybuffer={string:function(m){return p(new Uint8Array(m))},array:function(m){return h(new Uint8Array(m),new Array(m.byteLength))},arraybuffer:a,uint8array:function(m){return new Uint8Array(m)},nodebuffer:function(m){return s.newBufferFrom(new Uint8Array(m))}},d.uint8array={string:p,array:function(m){return h(m,new Array(m.length))},arraybuffer:function(m){return m.buffer},uint8array:a,nodebuffer:function(m){return s.newBufferFrom(m)}},d.nodebuffer={string:p,array:function(m){return h(m,new Array(m.length))},arraybuffer:function(m){return d.nodebuffer.uint8array(m).buffer},uint8array:function(m){return h(m,new Uint8Array(m.length))},nodebuffer:a},e.transformTo=function(m,g){if(g=g||"",!m)return g;e.checkSupport(m);var u=e.getTypeOf(g);return d[u][m](g)},e.resolve=function(m){for(var g=m.split("/"),u=[],f=0;f<g.length;f++){var _=g[f];_==="."||_===""&&f!==0&&f!==g.length-1||(_===".."?u.pop():u.push(_))}return u.join("/")},e.getTypeOf=function(m){return typeof m=="string"?"string":Object.prototype.toString.call(m)==="[object Array]"?"array":n.nodebuffer&&s.isBuffer(m)?"nodebuffer":n.uint8array&&m instanceof Uint8Array?"uint8array":n.arraybuffer&&m instanceof ArrayBuffer?"arraybuffer":void 0},e.checkSupport=function(m){if(!n[m.toLowerCase()])throw new Error(m+" is not supported by this platform")},e.MAX_VALUE_16BITS=65535,e.MAX_VALUE_32BITS=-1,e.pretty=function(m){var g,u,f="";for(u=0;u<(m||"").length;u++)f+="\\x"+((g=m.charCodeAt(u))<16?"0":"")+g.toString(16).toUpperCase();return f},e.delay=function(m,g,u){setImmediate(function(){m.apply(u||null,g||[])})},e.inherits=function(m,g){function u(){}u.prototype=g.prototype,m.prototype=new u},e.extend=function(){var m,g,u={};for(m=0;m<arguments.length;m++)for(g in arguments[m])Object.prototype.hasOwnProperty.call(arguments[m],g)&&u[g]===void 0&&(u[g]=arguments[m][g]);return u},e.prepareContent=function(m,g,u,f,_){return o.Promise.resolve(g).then(function(y){return n.blob&&(y instanceof Blob||["[object File]","[object Blob]"].indexOf(Object.prototype.toString.call(y))!==-1)&&typeof FileReader<"u"?new o.Promise(function(M,w){var S=new FileReader;S.onload=function(D){M(D.target.result)},S.onerror=function(D){w(D.target.error)},S.readAsArrayBuffer(y)}):y}).then(function(y){var M=e.getTypeOf(y);return M?(M==="arraybuffer"?y=e.transformTo("uint8array",y):M==="string"&&(_?y=i.decode(y):u&&f!==!0&&(y=function(w){return c(w,n.uint8array?new Uint8Array(w.length):new Array(w.length))}(y))),y):o.Promise.reject(new Error("Can't read the data of '"+m+"'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))})}},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,setimmediate:54}],33:[function(r,t,e){"use strict";var n=r("./reader/readerFor"),i=r("./utils"),s=r("./signature"),o=r("./zipEntry"),a=r("./support");function c(l){this.files=[],this.loadOptions=l}c.prototype={checkSignature:function(l){if(!this.reader.readAndCheckSignature(l)){this.reader.index-=4;var p=this.reader.readString(4);throw new Error("Corrupted zip or bug: unexpected signature ("+i.pretty(p)+", expected "+i.pretty(l)+")")}},isSignature:function(l,p){var h=this.reader.index;this.reader.setIndex(l);var d=this.reader.readString(4)===p;return this.reader.setIndex(h),d},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2);var l=this.reader.readData(this.zipCommentLength),p=a.uint8array?"uint8array":"array",h=i.transformTo(p,l);this.zipComment=this.loadOptions.decodeFileName(h)},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.reader.skip(4),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={};for(var l,p,h,d=this.zip64EndOfCentralSize-44;0<d;)l=this.reader.readInt(2),p=this.reader.readInt(4),h=this.reader.readData(p),this.zip64ExtensibleData[l]={id:l,length:p,value:h}},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),1<this.disksCount)throw new Error("Multi-volumes zip are not supported")},readLocalFiles:function(){var l,p;for(l=0;l<this.files.length;l++)p=this.files[l],this.reader.setIndex(p.localHeaderOffset),this.checkSignature(s.LOCAL_FILE_HEADER),p.readLocalPart(this.reader),p.handleUTF8(),p.processAttributes()},readCentralDir:function(){var l;for(this.reader.setIndex(this.centralDirOffset);this.reader.readAndCheckSignature(s.CENTRAL_FILE_HEADER);)(l=new o({zip64:this.zip64},this.loadOptions)).readCentralPart(this.reader),this.files.push(l);if(this.centralDirRecords!==this.files.length&&this.centralDirRecords!==0&&this.files.length===0)throw new Error("Corrupted zip or bug: expected "+this.centralDirRecords+" records in central dir, got "+this.files.length)},readEndOfCentral:function(){var l=this.reader.lastIndexOfSignature(s.CENTRAL_DIRECTORY_END);if(l<0)throw this.isSignature(0,s.LOCAL_FILE_HEADER)?new Error("Corrupted zip: can't find end of central directory"):new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");this.reader.setIndex(l);var p=l;if(this.checkSignature(s.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===i.MAX_VALUE_16BITS||this.diskWithCentralDirStart===i.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===i.MAX_VALUE_16BITS||this.centralDirRecords===i.MAX_VALUE_16BITS||this.centralDirSize===i.MAX_VALUE_32BITS||this.centralDirOffset===i.MAX_VALUE_32BITS){if(this.zip64=!0,(l=this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR))<0)throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");if(this.reader.setIndex(l),this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,s.ZIP64_CENTRAL_DIRECTORY_END)&&(this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_END),this.relativeOffsetEndOfZip64CentralDir<0))throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral()}var h=this.centralDirOffset+this.centralDirSize;this.zip64&&(h+=20,h+=12+this.zip64EndOfCentralSize);var d=p-h;if(0<d)this.isSignature(p,s.CENTRAL_FILE_HEADER)||(this.reader.zero=d);else if(d<0)throw new Error("Corrupted zip: missing "+Math.abs(d)+" bytes.")},prepareReader:function(l){this.reader=n(l)},load:function(l){this.prepareReader(l),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles()}},t.exports=c},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utils":32,"./zipEntry":34}],34:[function(r,t,e){"use strict";var n=r("./reader/readerFor"),i=r("./utils"),s=r("./compressedObject"),o=r("./crc32"),a=r("./utf8"),c=r("./compressions"),l=r("./support");function p(h,d){this.options=h,this.loadOptions=d}p.prototype={isEncrypted:function(){return(1&this.bitFlag)==1},useUTF8:function(){return(2048&this.bitFlag)==2048},readLocalPart:function(h){var d,m;if(h.skip(22),this.fileNameLength=h.readInt(2),m=h.readInt(2),this.fileName=h.readData(this.fileNameLength),h.skip(m),this.compressedSize===-1||this.uncompressedSize===-1)throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");if((d=function(g){for(var u in c)if(Object.prototype.hasOwnProperty.call(c,u)&&c[u].magic===g)return c[u];return null}(this.compressionMethod))===null)throw new Error("Corrupted zip : compression "+i.pretty(this.compressionMethod)+" unknown (inner file : "+i.transformTo("string",this.fileName)+")");this.decompressed=new s(this.compressedSize,this.uncompressedSize,this.crc32,d,h.readData(this.compressedSize))},readCentralPart:function(h){this.versionMadeBy=h.readInt(2),h.skip(2),this.bitFlag=h.readInt(2),this.compressionMethod=h.readString(2),this.date=h.readDate(),this.crc32=h.readInt(4),this.compressedSize=h.readInt(4),this.uncompressedSize=h.readInt(4);var d=h.readInt(2);if(this.extraFieldsLength=h.readInt(2),this.fileCommentLength=h.readInt(2),this.diskNumberStart=h.readInt(2),this.internalFileAttributes=h.readInt(2),this.externalFileAttributes=h.readInt(4),this.localHeaderOffset=h.readInt(4),this.isEncrypted())throw new Error("Encrypted zip are not supported");h.skip(d),this.readExtraFields(h),this.parseZIP64ExtraField(h),this.fileComment=h.readData(this.fileCommentLength)},processAttributes:function(){this.unixPermissions=null,this.dosPermissions=null;var h=this.versionMadeBy>>8;this.dir=!!(16&this.externalFileAttributes),h==0&&(this.dosPermissions=63&this.externalFileAttributes),h==3&&(this.unixPermissions=this.externalFileAttributes>>16&65535),this.dir||this.fileNameStr.slice(-1)!=="/"||(this.dir=!0)},parseZIP64ExtraField:function(){if(this.extraFields[1]){var h=n(this.extraFields[1].value);this.uncompressedSize===i.MAX_VALUE_32BITS&&(this.uncompressedSize=h.readInt(8)),this.compressedSize===i.MAX_VALUE_32BITS&&(this.compressedSize=h.readInt(8)),this.localHeaderOffset===i.MAX_VALUE_32BITS&&(this.localHeaderOffset=h.readInt(8)),this.diskNumberStart===i.MAX_VALUE_32BITS&&(this.diskNumberStart=h.readInt(4))}},readExtraFields:function(h){var d,m,g,u=h.index+this.extraFieldsLength;for(this.extraFields||(this.extraFields={});h.index+4<u;)d=h.readInt(2),m=h.readInt(2),g=h.readData(m),this.extraFields[d]={id:d,length:m,value:g};h.setIndex(u)},handleUTF8:function(){var h=l.uint8array?"uint8array":"array";if(this.useUTF8())this.fileNameStr=a.utf8decode(this.fileName),this.fileCommentStr=a.utf8decode(this.fileComment);else{var d=this.findExtraFieldUnicodePath();if(d!==null)this.fileNameStr=d;else{var m=i.transformTo(h,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(m)}var g=this.findExtraFieldUnicodeComment();if(g!==null)this.fileCommentStr=g;else{var u=i.transformTo(h,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(u)}}},findExtraFieldUnicodePath:function(){var h=this.extraFields[28789];if(h){var d=n(h.value);return d.readInt(1)!==1||o(this.fileName)!==d.readInt(4)?null:a.utf8decode(d.readData(h.length-5))}return null},findExtraFieldUnicodeComment:function(){var h=this.extraFields[25461];if(h){var d=n(h.value);return d.readInt(1)!==1||o(this.fileComment)!==d.readInt(4)?null:a.utf8decode(d.readData(h.length-5))}return null}},t.exports=p},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(r,t,e){"use strict";function n(d,m,g){this.name=d,this.dir=g.dir,this.date=g.date,this.comment=g.comment,this.unixPermissions=g.unixPermissions,this.dosPermissions=g.dosPermissions,this._data=m,this._dataBinary=g.binary,this.options={compression:g.compression,compressionOptions:g.compressionOptions}}var i=r("./stream/StreamHelper"),s=r("./stream/DataWorker"),o=r("./utf8"),a=r("./compressedObject"),c=r("./stream/GenericWorker");n.prototype={internalStream:function(d){var m=null,g="string";try{if(!d)throw new Error("No output type specified.");var u=(g=d.toLowerCase())==="string"||g==="text";g!=="binarystring"&&g!=="text"||(g="string"),m=this._decompressWorker();var f=!this._dataBinary;f&&!u&&(m=m.pipe(new o.Utf8EncodeWorker)),!f&&u&&(m=m.pipe(new o.Utf8DecodeWorker))}catch(_){(m=new c("error")).error(_)}return new i(m,g,"")},async:function(d,m){return this.internalStream(d).accumulate(m)},nodeStream:function(d,m){return this.internalStream(d||"nodebuffer").toNodejsStream(m)},_compressWorker:function(d,m){if(this._data instanceof a&&this._data.compression.magic===d.magic)return this._data.getCompressedWorker();var g=this._decompressWorker();return this._dataBinary||(g=g.pipe(new o.Utf8EncodeWorker)),a.createWorkerFrom(g,d,m)},_decompressWorker:function(){return this._data instanceof a?this._data.getContentWorker():this._data instanceof c?this._data:new s(this._data)}};for(var l=["asText","asBinary","asNodeBuffer","asUint8Array","asArrayBuffer"],p=function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},h=0;h<l.length;h++)n.prototype[l[h]]=p;t.exports=n},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(r,t,e){(function(n){"use strict";var i,s,o=n.MutationObserver||n.WebKitMutationObserver;if(o){var a=0,c=new o(d),l=n.document.createTextNode("");c.observe(l,{characterData:!0}),i=function(){l.data=a=++a%2}}else if(n.setImmediate||n.MessageChannel===void 0)i="document"in n&&"onreadystatechange"in n.document.createElement("script")?function(){var m=n.document.createElement("script");m.onreadystatechange=function(){d(),m.onreadystatechange=null,m.parentNode.removeChild(m),m=null},n.document.documentElement.appendChild(m)}:function(){setTimeout(d,0)};else{var p=new n.MessageChannel;p.port1.onmessage=d,i=function(){p.port2.postMessage(0)}}var h=[];function d(){var m,g;s=!0;for(var u=h.length;u;){for(g=h,h=[],m=-1;++m<u;)g[m]();u=h.length}s=!1}t.exports=function(m){h.push(m)!==1||s||i()}}).call(this,typeof global<"u"?global:typeof self<"u"?self:typeof window<"u"?window:{})},{}],37:[function(r,t,e){"use strict";var n=r("immediate");function i(){}var s={},o=["REJECTED"],a=["FULFILLED"],c=["PENDING"];function l(u){if(typeof u!="function")throw new TypeError("resolver must be a function");this.state=c,this.queue=[],this.outcome=void 0,u!==i&&m(this,u)}function p(u,f,_){this.promise=u,typeof f=="function"&&(this.onFulfilled=f,this.callFulfilled=this.otherCallFulfilled),typeof _=="function"&&(this.onRejected=_,this.callRejected=this.otherCallRejected)}function h(u,f,_){n(function(){var y;try{y=f(_)}catch(M){return s.reject(u,M)}y===u?s.reject(u,new TypeError("Cannot resolve promise with itself")):s.resolve(u,y)})}function d(u){var f=u&&u.then;if(u&&(typeof u=="object"||typeof u=="function")&&typeof f=="function")return function(){f.apply(u,arguments)}}function m(u,f){var _=!1;function y(S){_||(_=!0,s.reject(u,S))}function M(S){_||(_=!0,s.resolve(u,S))}var w=g(function(){f(M,y)});w.status==="error"&&y(w.value)}function g(u,f){var _={};try{_.value=u(f),_.status="success"}catch(y){_.status="error",_.value=y}return _}(t.exports=l).prototype.finally=function(u){if(typeof u!="function")return this;var f=this.constructor;return this.then(function(_){return f.resolve(u()).then(function(){return _})},function(_){return f.resolve(u()).then(function(){throw _})})},l.prototype.catch=function(u){return this.then(null,u)},l.prototype.then=function(u,f){if(typeof u!="function"&&this.state===a||typeof f!="function"&&this.state===o)return this;var _=new this.constructor(i);return this.state!==c?h(_,this.state===a?u:f,this.outcome):this.queue.push(new p(_,u,f)),_},p.prototype.callFulfilled=function(u){s.resolve(this.promise,u)},p.prototype.otherCallFulfilled=function(u){h(this.promise,this.onFulfilled,u)},p.prototype.callRejected=function(u){s.reject(this.promise,u)},p.prototype.otherCallRejected=function(u){h(this.promise,this.onRejected,u)},s.resolve=function(u,f){var _=g(d,f);if(_.status==="error")return s.reject(u,_.value);var y=_.value;if(y)m(u,y);else{u.state=a,u.outcome=f;for(var M=-1,w=u.queue.length;++M<w;)u.queue[M].callFulfilled(f)}return u},s.reject=function(u,f){u.state=o,u.outcome=f;for(var _=-1,y=u.queue.length;++_<y;)u.queue[_].callRejected(f);return u},l.resolve=function(u){return u instanceof this?u:s.resolve(new this(i),u)},l.reject=function(u){var f=new this(i);return s.reject(f,u)},l.all=function(u){var f=this;if(Object.prototype.toString.call(u)!=="[object Array]")return this.reject(new TypeError("must be an array"));var _=u.length,y=!1;if(!_)return this.resolve([]);for(var M=new Array(_),w=0,S=-1,D=new this(i);++S<_;)T(u[S],S);return D;function T(b,L){f.resolve(b).then(function(E){M[L]=E,++w!==_||y||(y=!0,s.resolve(D,M))},function(E){y||(y=!0,s.reject(D,E))})}},l.race=function(u){var f=this;if(Object.prototype.toString.call(u)!=="[object Array]")return this.reject(new TypeError("must be an array"));var _=u.length,y=!1;if(!_)return this.resolve([]);for(var M=-1,w=new this(i);++M<_;)S=u[M],f.resolve(S).then(function(D){y||(y=!0,s.resolve(w,D))},function(D){y||(y=!0,s.reject(w,D))});var S;return w}},{immediate:36}],38:[function(r,t,e){"use strict";var n={};(0,r("./lib/utils/common").assign)(n,r("./lib/deflate"),r("./lib/inflate"),r("./lib/zlib/constants")),t.exports=n},{"./lib/deflate":39,"./lib/inflate":40,"./lib/utils/common":41,"./lib/zlib/constants":44}],39:[function(r,t,e){"use strict";var n=r("./zlib/deflate"),i=r("./utils/common"),s=r("./utils/strings"),o=r("./zlib/messages"),a=r("./zlib/zstream"),c=Object.prototype.toString,l=0,p=-1,h=0,d=8;function m(u){if(!(this instanceof m))return new m(u);this.options=i.assign({level:p,method:d,chunkSize:16384,windowBits:15,memLevel:8,strategy:h,to:""},u||{});var f=this.options;f.raw&&0<f.windowBits?f.windowBits=-f.windowBits:f.gzip&&0<f.windowBits&&f.windowBits<16&&(f.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new a,this.strm.avail_out=0;var _=n.deflateInit2(this.strm,f.level,f.method,f.windowBits,f.memLevel,f.strategy);if(_!==l)throw new Error(o[_]);if(f.header&&n.deflateSetHeader(this.strm,f.header),f.dictionary){var y;if(y=typeof f.dictionary=="string"?s.string2buf(f.dictionary):c.call(f.dictionary)==="[object ArrayBuffer]"?new Uint8Array(f.dictionary):f.dictionary,(_=n.deflateSetDictionary(this.strm,y))!==l)throw new Error(o[_]);this._dict_set=!0}}function g(u,f){var _=new m(f);if(_.push(u,!0),_.err)throw _.msg||o[_.err];return _.result}m.prototype.push=function(u,f){var _,y,M=this.strm,w=this.options.chunkSize;if(this.ended)return!1;y=f===~~f?f:f===!0?4:0,typeof u=="string"?M.input=s.string2buf(u):c.call(u)==="[object ArrayBuffer]"?M.input=new Uint8Array(u):M.input=u,M.next_in=0,M.avail_in=M.input.length;do{if(M.avail_out===0&&(M.output=new i.Buf8(w),M.next_out=0,M.avail_out=w),(_=n.deflate(M,y))!==1&&_!==l)return this.onEnd(_),!(this.ended=!0);M.avail_out!==0&&(M.avail_in!==0||y!==4&&y!==2)||(this.options.to==="string"?this.onData(s.buf2binstring(i.shrinkBuf(M.output,M.next_out))):this.onData(i.shrinkBuf(M.output,M.next_out)))}while((0<M.avail_in||M.avail_out===0)&&_!==1);return y===4?(_=n.deflateEnd(this.strm),this.onEnd(_),this.ended=!0,_===l):y!==2||(this.onEnd(l),!(M.avail_out=0))},m.prototype.onData=function(u){this.chunks.push(u)},m.prototype.onEnd=function(u){u===l&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=i.flattenChunks(this.chunks)),this.chunks=[],this.err=u,this.msg=this.strm.msg},e.Deflate=m,e.deflate=g,e.deflateRaw=function(u,f){return(f=f||{}).raw=!0,g(u,f)},e.gzip=function(u,f){return(f=f||{}).gzip=!0,g(u,f)}},{"./utils/common":41,"./utils/strings":42,"./zlib/deflate":46,"./zlib/messages":51,"./zlib/zstream":53}],40:[function(r,t,e){"use strict";var n=r("./zlib/inflate"),i=r("./utils/common"),s=r("./utils/strings"),o=r("./zlib/constants"),a=r("./zlib/messages"),c=r("./zlib/zstream"),l=r("./zlib/gzheader"),p=Object.prototype.toString;function h(m){if(!(this instanceof h))return new h(m);this.options=i.assign({chunkSize:16384,windowBits:0,to:""},m||{});var g=this.options;g.raw&&0<=g.windowBits&&g.windowBits<16&&(g.windowBits=-g.windowBits,g.windowBits===0&&(g.windowBits=-15)),!(0<=g.windowBits&&g.windowBits<16)||m&&m.windowBits||(g.windowBits+=32),15<g.windowBits&&g.windowBits<48&&(15&g.windowBits)==0&&(g.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new c,this.strm.avail_out=0;var u=n.inflateInit2(this.strm,g.windowBits);if(u!==o.Z_OK)throw new Error(a[u]);this.header=new l,n.inflateGetHeader(this.strm,this.header)}function d(m,g){var u=new h(g);if(u.push(m,!0),u.err)throw u.msg||a[u.err];return u.result}h.prototype.push=function(m,g){var u,f,_,y,M,w,S=this.strm,D=this.options.chunkSize,T=this.options.dictionary,b=!1;if(this.ended)return!1;f=g===~~g?g:g===!0?o.Z_FINISH:o.Z_NO_FLUSH,typeof m=="string"?S.input=s.binstring2buf(m):p.call(m)==="[object ArrayBuffer]"?S.input=new Uint8Array(m):S.input=m,S.next_in=0,S.avail_in=S.input.length;do{if(S.avail_out===0&&(S.output=new i.Buf8(D),S.next_out=0,S.avail_out=D),(u=n.inflate(S,o.Z_NO_FLUSH))===o.Z_NEED_DICT&&T&&(w=typeof T=="string"?s.string2buf(T):p.call(T)==="[object ArrayBuffer]"?new Uint8Array(T):T,u=n.inflateSetDictionary(this.strm,w)),u===o.Z_BUF_ERROR&&b===!0&&(u=o.Z_OK,b=!1),u!==o.Z_STREAM_END&&u!==o.Z_OK)return this.onEnd(u),!(this.ended=!0);S.next_out&&(S.avail_out!==0&&u!==o.Z_STREAM_END&&(S.avail_in!==0||f!==o.Z_FINISH&&f!==o.Z_SYNC_FLUSH)||(this.options.to==="string"?(_=s.utf8border(S.output,S.next_out),y=S.next_out-_,M=s.buf2string(S.output,_),S.next_out=y,S.avail_out=D-y,y&&i.arraySet(S.output,S.output,_,y,0),this.onData(M)):this.onData(i.shrinkBuf(S.output,S.next_out)))),S.avail_in===0&&S.avail_out===0&&(b=!0)}while((0<S.avail_in||S.avail_out===0)&&u!==o.Z_STREAM_END);return u===o.Z_STREAM_END&&(f=o.Z_FINISH),f===o.Z_FINISH?(u=n.inflateEnd(this.strm),this.onEnd(u),this.ended=!0,u===o.Z_OK):f!==o.Z_SYNC_FLUSH||(this.onEnd(o.Z_OK),!(S.avail_out=0))},h.prototype.onData=function(m){this.chunks.push(m)},h.prototype.onEnd=function(m){m===o.Z_OK&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=i.flattenChunks(this.chunks)),this.chunks=[],this.err=m,this.msg=this.strm.msg},e.Inflate=h,e.inflate=d,e.inflateRaw=function(m,g){return(g=g||{}).raw=!0,d(m,g)},e.ungzip=d},{"./utils/common":41,"./utils/strings":42,"./zlib/constants":44,"./zlib/gzheader":47,"./zlib/inflate":49,"./zlib/messages":51,"./zlib/zstream":53}],41:[function(r,t,e){"use strict";var n=typeof Uint8Array<"u"&&typeof Uint16Array<"u"&&typeof Int32Array<"u";e.assign=function(o){for(var a=Array.prototype.slice.call(arguments,1);a.length;){var c=a.shift();if(c){if(typeof c!="object")throw new TypeError(c+"must be non-object");for(var l in c)c.hasOwnProperty(l)&&(o[l]=c[l])}}return o},e.shrinkBuf=function(o,a){return o.length===a?o:o.subarray?o.subarray(0,a):(o.length=a,o)};var i={arraySet:function(o,a,c,l,p){if(a.subarray&&o.subarray)o.set(a.subarray(c,c+l),p);else for(var h=0;h<l;h++)o[p+h]=a[c+h]},flattenChunks:function(o){var a,c,l,p,h,d;for(a=l=0,c=o.length;a<c;a++)l+=o[a].length;for(d=new Uint8Array(l),a=p=0,c=o.length;a<c;a++)h=o[a],d.set(h,p),p+=h.length;return d}},s={arraySet:function(o,a,c,l,p){for(var h=0;h<l;h++)o[p+h]=a[c+h]},flattenChunks:function(o){return[].concat.apply([],o)}};e.setTyped=function(o){o?(e.Buf8=Uint8Array,e.Buf16=Uint16Array,e.Buf32=Int32Array,e.assign(e,i)):(e.Buf8=Array,e.Buf16=Array,e.Buf32=Array,e.assign(e,s))},e.setTyped(n)},{}],42:[function(r,t,e){"use strict";var n=r("./common"),i=!0,s=!0;try{String.fromCharCode.apply(null,[0])}catch(l){i=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(l){s=!1}for(var o=new n.Buf8(256),a=0;a<256;a++)o[a]=252<=a?6:248<=a?5:240<=a?4:224<=a?3:192<=a?2:1;function c(l,p){if(p<65537&&(l.subarray&&s||!l.subarray&&i))return String.fromCharCode.apply(null,n.shrinkBuf(l,p));for(var h="",d=0;d<p;d++)h+=String.fromCharCode(l[d]);return h}o[254]=o[254]=1,e.string2buf=function(l){var p,h,d,m,g,u=l.length,f=0;for(m=0;m<u;m++)(64512&(h=l.charCodeAt(m)))==55296&&m+1<u&&(64512&(d=l.charCodeAt(m+1)))==56320&&(h=65536+(h-55296<<10)+(d-56320),m++),f+=h<128?1:h<2048?2:h<65536?3:4;for(p=new n.Buf8(f),m=g=0;g<f;m++)(64512&(h=l.charCodeAt(m)))==55296&&m+1<u&&(64512&(d=l.charCodeAt(m+1)))==56320&&(h=65536+(h-55296<<10)+(d-56320),m++),h<128?p[g++]=h:(h<2048?p[g++]=192|h>>>6:(h<65536?p[g++]=224|h>>>12:(p[g++]=240|h>>>18,p[g++]=128|h>>>12&63),p[g++]=128|h>>>6&63),p[g++]=128|63&h);return p},e.buf2binstring=function(l){return c(l,l.length)},e.binstring2buf=function(l){for(var p=new n.Buf8(l.length),h=0,d=p.length;h<d;h++)p[h]=l.charCodeAt(h);return p},e.buf2string=function(l,p){var h,d,m,g,u=p||l.length,f=new Array(2*u);for(h=d=0;h<u;)if((m=l[h++])<128)f[d++]=m;else if(4<(g=o[m]))f[d++]=65533,h+=g-1;else{for(m&=g===2?31:g===3?15:7;1<g&&h<u;)m=m<<6|63&l[h++],g--;1<g?f[d++]=65533:m<65536?f[d++]=m:(m-=65536,f[d++]=55296|m>>10&1023,f[d++]=56320|1023&m)}return c(f,d)},e.utf8border=function(l,p){var h;for((p=p||l.length)>l.length&&(p=l.length),h=p-1;0<=h&&(192&l[h])==128;)h--;return h<0||h===0?p:h+o[l[h]]>p?h:p}},{"./common":41}],43:[function(r,t,e){"use strict";t.exports=function(n,i,s,o){for(var a=65535&n|0,c=n>>>16&65535|0,l=0;s!==0;){for(s-=l=2e3<s?2e3:s;c=c+(a=a+i[o++]|0)|0,--l;);a%=65521,c%=65521}return a|c<<16|0}},{}],44:[function(r,t,e){"use strict";t.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],45:[function(r,t,e){"use strict";var n=function(){for(var i,s=[],o=0;o<256;o++){i=o;for(var a=0;a<8;a++)i=1&i?3988292384^i>>>1:i>>>1;s[o]=i}return s}();t.exports=function(i,s,o,a){var c=n,l=a+o;i^=-1;for(var p=a;p<l;p++)i=i>>>8^c[255&(i^s[p])];return-1^i}},{}],46:[function(r,t,e){"use strict";var n,i=r("../utils/common"),s=r("./trees"),o=r("./adler32"),a=r("./crc32"),c=r("./messages"),l=0,p=4,h=0,d=-2,m=-1,g=4,u=2,f=8,_=9,y=286,M=30,w=19,S=2*y+1,D=15,T=3,b=258,L=b+T+1,E=42,N=113,v=1,O=2,B=3,F=4;function $(x,X){return x.msg=c[X],X}function q(x){return(x<<1)-(4<x?9:0)}function j(x){for(var X=x.length;0<=--X;)x[X]=0}function P(x){var X=x.state,tt=X.pending;tt>x.avail_out&&(tt=x.avail_out),tt!==0&&(i.arraySet(x.output,X.pending_buf,X.pending_out,tt,x.next_out),x.next_out+=tt,X.pending_out+=tt,x.total_out+=tt,x.avail_out-=tt,X.pending-=tt,X.pending===0&&(X.pending_out=0))}function R(x,X){s._tr_flush_block(x,0<=x.block_start?x.block_start:-1,x.strstart-x.block_start,X),x.block_start=x.strstart,P(x.strm)}function it(x,X){x.pending_buf[x.pending++]=X}function Y(x,X){x.pending_buf[x.pending++]=X>>>8&255,x.pending_buf[x.pending++]=255&X}function Q(x,X){var tt,k,I=x.max_chain_length,V=x.strstart,rt=x.prev_length,st=x.nice_match,Z=x.strstart>x.w_size-L?x.strstart-(x.w_size-L):0,ut=x.window,C=x.w_mask,A=x.prev,G=x.strstart+b,ot=ut[V+rt-1],ht=ut[V+rt];x.prev_length>=x.good_match&&(I>>=2),st>x.lookahead&&(st=x.lookahead);do if(ut[(tt=X)+rt]===ht&&ut[tt+rt-1]===ot&&ut[tt]===ut[V]&&ut[++tt]===ut[V+1]){V+=2,tt++;do;while(ut[++V]===ut[++tt]&&ut[++V]===ut[++tt]&&ut[++V]===ut[++tt]&&ut[++V]===ut[++tt]&&ut[++V]===ut[++tt]&&ut[++V]===ut[++tt]&&ut[++V]===ut[++tt]&&ut[++V]===ut[++tt]&&V<G);if(k=b-(G-V),V=G-b,rt<k){if(x.match_start=X,st<=(rt=k))break;ot=ut[V+rt-1],ht=ut[V+rt]}}while((X=A[X&C])>Z&&--I!=0);return rt<=x.lookahead?rt:x.lookahead}function ft(x){var X,tt,k,I,V,rt,st,Z,ut,C,A=x.w_size;do{if(I=x.window_size-x.lookahead-x.strstart,x.strstart>=A+(A-L)){for(i.arraySet(x.window,x.window,A,A,0),x.match_start-=A,x.strstart-=A,x.block_start-=A,X=tt=x.hash_size;k=x.head[--X],x.head[X]=A<=k?k-A:0,--tt;);for(X=tt=A;k=x.prev[--X],x.prev[X]=A<=k?k-A:0,--tt;);I+=A}if(x.strm.avail_in===0)break;if(rt=x.strm,st=x.window,Z=x.strstart+x.lookahead,ut=I,C=void 0,C=rt.avail_in,ut<C&&(C=ut),tt=C===0?0:(rt.avail_in-=C,i.arraySet(st,rt.input,rt.next_in,C,Z),rt.state.wrap===1?rt.adler=o(rt.adler,st,C,Z):rt.state.wrap===2&&(rt.adler=a(rt.adler,st,C,Z)),rt.next_in+=C,rt.total_in+=C,C),x.lookahead+=tt,x.lookahead+x.insert>=T)for(V=x.strstart-x.insert,x.ins_h=x.window[V],x.ins_h=(x.ins_h<<x.hash_shift^x.window[V+1])&x.hash_mask;x.insert&&(x.ins_h=(x.ins_h<<x.hash_shift^x.window[V+T-1])&x.hash_mask,x.prev[V&x.w_mask]=x.head[x.ins_h],x.head[x.ins_h]=V,V++,x.insert--,!(x.lookahead+x.insert<T)););}while(x.lookahead<L&&x.strm.avail_in!==0)}function Et(x,X){for(var tt,k;;){if(x.lookahead<L){if(ft(x),x.lookahead<L&&X===l)return v;if(x.lookahead===0)break}if(tt=0,x.lookahead>=T&&(x.ins_h=(x.ins_h<<x.hash_shift^x.window[x.strstart+T-1])&x.hash_mask,tt=x.prev[x.strstart&x.w_mask]=x.head[x.ins_h],x.head[x.ins_h]=x.strstart),tt!==0&&x.strstart-tt<=x.w_size-L&&(x.match_length=Q(x,tt)),x.match_length>=T)if(k=s._tr_tally(x,x.strstart-x.match_start,x.match_length-T),x.lookahead-=x.match_length,x.match_length<=x.max_lazy_match&&x.lookahead>=T){for(x.match_length--;x.strstart++,x.ins_h=(x.ins_h<<x.hash_shift^x.window[x.strstart+T-1])&x.hash_mask,tt=x.prev[x.strstart&x.w_mask]=x.head[x.ins_h],x.head[x.ins_h]=x.strstart,--x.match_length!=0;);x.strstart++}else x.strstart+=x.match_length,x.match_length=0,x.ins_h=x.window[x.strstart],x.ins_h=(x.ins_h<<x.hash_shift^x.window[x.strstart+1])&x.hash_mask;else k=s._tr_tally(x,0,x.window[x.strstart]),x.lookahead--,x.strstart++;if(k&&(R(x,!1),x.strm.avail_out===0))return v}return x.insert=x.strstart<T-1?x.strstart:T-1,X===p?(R(x,!0),x.strm.avail_out===0?B:F):x.last_lit&&(R(x,!1),x.strm.avail_out===0)?v:O}function nt(x,X){for(var tt,k,I;;){if(x.lookahead<L){if(ft(x),x.lookahead<L&&X===l)return v;if(x.lookahead===0)break}if(tt=0,x.lookahead>=T&&(x.ins_h=(x.ins_h<<x.hash_shift^x.window[x.strstart+T-1])&x.hash_mask,tt=x.prev[x.strstart&x.w_mask]=x.head[x.ins_h],x.head[x.ins_h]=x.strstart),x.prev_length=x.match_length,x.prev_match=x.match_start,x.match_length=T-1,tt!==0&&x.prev_length<x.max_lazy_match&&x.strstart-tt<=x.w_size-L&&(x.match_length=Q(x,tt),x.match_length<=5&&(x.strategy===1||x.match_length===T&&4096<x.strstart-x.match_start)&&(x.match_length=T-1)),x.prev_length>=T&&x.match_length<=x.prev_length){for(I=x.strstart+x.lookahead-T,k=s._tr_tally(x,x.strstart-1-x.prev_match,x.prev_length-T),x.lookahead-=x.prev_length-1,x.prev_length-=2;++x.strstart<=I&&(x.ins_h=(x.ins_h<<x.hash_shift^x.window[x.strstart+T-1])&x.hash_mask,tt=x.prev[x.strstart&x.w_mask]=x.head[x.ins_h],x.head[x.ins_h]=x.strstart),--x.prev_length!=0;);if(x.match_available=0,x.match_length=T-1,x.strstart++,k&&(R(x,!1),x.strm.avail_out===0))return v}else if(x.match_available){if((k=s._tr_tally(x,0,x.window[x.strstart-1]))&&R(x,!1),x.strstart++,x.lookahead--,x.strm.avail_out===0)return v}else x.match_available=1,x.strstart++,x.lookahead--}return x.match_available&&(k=s._tr_tally(x,0,x.window[x.strstart-1]),x.match_available=0),x.insert=x.strstart<T-1?x.strstart:T-1,X===p?(R(x,!0),x.strm.avail_out===0?B:F):x.last_lit&&(R(x,!1),x.strm.avail_out===0)?v:O}function At(x,X,tt,k,I){this.good_length=x,this.max_lazy=X,this.nice_length=tt,this.max_chain=k,this.func=I}function Mt(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=f,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new i.Buf16(2*S),this.dyn_dtree=new i.Buf16(2*(2*M+1)),this.bl_tree=new i.Buf16(2*(2*w+1)),j(this.dyn_ltree),j(this.dyn_dtree),j(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new i.Buf16(D+1),this.heap=new i.Buf16(2*y+1),j(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new i.Buf16(2*y+1),j(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function bt(x){var X;return x&&x.state?(x.total_in=x.total_out=0,x.data_type=u,(X=x.state).pending=0,X.pending_out=0,X.wrap<0&&(X.wrap=-X.wrap),X.status=X.wrap?E:N,x.adler=X.wrap===2?0:1,X.last_flush=l,s._tr_init(X),h):$(x,d)}function xt(x){var X=bt(x);return X===h&&function(tt){tt.window_size=2*tt.w_size,j(tt.head),tt.max_lazy_match=n[tt.level].max_lazy,tt.good_match=n[tt.level].good_length,tt.nice_match=n[tt.level].nice_length,tt.max_chain_length=n[tt.level].max_chain,tt.strstart=0,tt.block_start=0,tt.lookahead=0,tt.insert=0,tt.match_length=tt.prev_length=T-1,tt.match_available=0,tt.ins_h=0}(x.state),X}function zt(x,X,tt,k,I,V){if(!x)return d;var rt=1;if(X===m&&(X=6),k<0?(rt=0,k=-k):15<k&&(rt=2,k-=16),I<1||_<I||tt!==f||k<8||15<k||X<0||9<X||V<0||g<V)return $(x,d);k===8&&(k=9);var st=new Mt;return(x.state=st).strm=x,st.wrap=rt,st.gzhead=null,st.w_bits=k,st.w_size=1<<st.w_bits,st.w_mask=st.w_size-1,st.hash_bits=I+7,st.hash_size=1<<st.hash_bits,st.hash_mask=st.hash_size-1,st.hash_shift=~~((st.hash_bits+T-1)/T),st.window=new i.Buf8(2*st.w_size),st.head=new i.Buf16(st.hash_size),st.prev=new i.Buf16(st.w_size),st.lit_bufsize=1<<I+6,st.pending_buf_size=4*st.lit_bufsize,st.pending_buf=new i.Buf8(st.pending_buf_size),st.d_buf=1*st.lit_bufsize,st.l_buf=3*st.lit_bufsize,st.level=X,st.strategy=V,st.method=tt,xt(x)}n=[new At(0,0,0,0,function(x,X){var tt=65535;for(tt>x.pending_buf_size-5&&(tt=x.pending_buf_size-5);;){if(x.lookahead<=1){if(ft(x),x.lookahead===0&&X===l)return v;if(x.lookahead===0)break}x.strstart+=x.lookahead,x.lookahead=0;var k=x.block_start+tt;if((x.strstart===0||x.strstart>=k)&&(x.lookahead=x.strstart-k,x.strstart=k,R(x,!1),x.strm.avail_out===0)||x.strstart-x.block_start>=x.w_size-L&&(R(x,!1),x.strm.avail_out===0))return v}return x.insert=0,X===p?(R(x,!0),x.strm.avail_out===0?B:F):(x.strstart>x.block_start&&(R(x,!1),x.strm.avail_out),v)}),new At(4,4,8,4,Et),new At(4,5,16,8,Et),new At(4,6,32,32,Et),new At(4,4,16,16,nt),new At(8,16,32,32,nt),new At(8,16,128,128,nt),new At(8,32,128,256,nt),new At(32,128,258,1024,nt),new At(32,258,258,4096,nt)],e.deflateInit=function(x,X){return zt(x,X,f,15,8,0)},e.deflateInit2=zt,e.deflateReset=xt,e.deflateResetKeep=bt,e.deflateSetHeader=function(x,X){return x&&x.state?x.state.wrap!==2?d:(x.state.gzhead=X,h):d},e.deflate=function(x,X){var tt,k,I,V;if(!x||!x.state||5<X||X<0)return x?$(x,d):d;if(k=x.state,!x.output||!x.input&&x.avail_in!==0||k.status===666&&X!==p)return $(x,x.avail_out===0?-5:d);if(k.strm=x,tt=k.last_flush,k.last_flush=X,k.status===E)if(k.wrap===2)x.adler=0,it(k,31),it(k,139),it(k,8),k.gzhead?(it(k,(k.gzhead.text?1:0)+(k.gzhead.hcrc?2:0)+(k.gzhead.extra?4:0)+(k.gzhead.name?8:0)+(k.gzhead.comment?16:0)),it(k,255&k.gzhead.time),it(k,k.gzhead.time>>8&255),it(k,k.gzhead.time>>16&255),it(k,k.gzhead.time>>24&255),it(k,k.level===9?2:2<=k.strategy||k.level<2?4:0),it(k,255&k.gzhead.os),k.gzhead.extra&&k.gzhead.extra.length&&(it(k,255&k.gzhead.extra.length),it(k,k.gzhead.extra.length>>8&255)),k.gzhead.hcrc&&(x.adler=a(x.adler,k.pending_buf,k.pending,0)),k.gzindex=0,k.status=69):(it(k,0),it(k,0),it(k,0),it(k,0),it(k,0),it(k,k.level===9?2:2<=k.strategy||k.level<2?4:0),it(k,3),k.status=N);else{var rt=f+(k.w_bits-8<<4)<<8;rt|=(2<=k.strategy||k.level<2?0:k.level<6?1:k.level===6?2:3)<<6,k.strstart!==0&&(rt|=32),rt+=31-rt%31,k.status=N,Y(k,rt),k.strstart!==0&&(Y(k,x.adler>>>16),Y(k,65535&x.adler)),x.adler=1}if(k.status===69)if(k.gzhead.extra){for(I=k.pending;k.gzindex<(65535&k.gzhead.extra.length)&&(k.pending!==k.pending_buf_size||(k.gzhead.hcrc&&k.pending>I&&(x.adler=a(x.adler,k.pending_buf,k.pending-I,I)),P(x),I=k.pending,k.pending!==k.pending_buf_size));)it(k,255&k.gzhead.extra[k.gzindex]),k.gzindex++;k.gzhead.hcrc&&k.pending>I&&(x.adler=a(x.adler,k.pending_buf,k.pending-I,I)),k.gzindex===k.gzhead.extra.length&&(k.gzindex=0,k.status=73)}else k.status=73;if(k.status===73)if(k.gzhead.name){I=k.pending;do{if(k.pending===k.pending_buf_size&&(k.gzhead.hcrc&&k.pending>I&&(x.adler=a(x.adler,k.pending_buf,k.pending-I,I)),P(x),I=k.pending,k.pending===k.pending_buf_size)){V=1;break}V=k.gzindex<k.gzhead.name.length?255&k.gzhead.name.charCodeAt(k.gzindex++):0,it(k,V)}while(V!==0);k.gzhead.hcrc&&k.pending>I&&(x.adler=a(x.adler,k.pending_buf,k.pending-I,I)),V===0&&(k.gzindex=0,k.status=91)}else k.status=91;if(k.status===91)if(k.gzhead.comment){I=k.pending;do{if(k.pending===k.pending_buf_size&&(k.gzhead.hcrc&&k.pending>I&&(x.adler=a(x.adler,k.pending_buf,k.pending-I,I)),P(x),I=k.pending,k.pending===k.pending_buf_size)){V=1;break}V=k.gzindex<k.gzhead.comment.length?255&k.gzhead.comment.charCodeAt(k.gzindex++):0,it(k,V)}while(V!==0);k.gzhead.hcrc&&k.pending>I&&(x.adler=a(x.adler,k.pending_buf,k.pending-I,I)),V===0&&(k.status=103)}else k.status=103;if(k.status===103&&(k.gzhead.hcrc?(k.pending+2>k.pending_buf_size&&P(x),k.pending+2<=k.pending_buf_size&&(it(k,255&x.adler),it(k,x.adler>>8&255),x.adler=0,k.status=N)):k.status=N),k.pending!==0){if(P(x),x.avail_out===0)return k.last_flush=-1,h}else if(x.avail_in===0&&q(X)<=q(tt)&&X!==p)return $(x,-5);if(k.status===666&&x.avail_in!==0)return $(x,-5);if(x.avail_in!==0||k.lookahead!==0||X!==l&&k.status!==666){var st=k.strategy===2?function(Z,ut){for(var C;;){if(Z.lookahead===0&&(ft(Z),Z.lookahead===0)){if(ut===l)return v;break}if(Z.match_length=0,C=s._tr_tally(Z,0,Z.window[Z.strstart]),Z.lookahead--,Z.strstart++,C&&(R(Z,!1),Z.strm.avail_out===0))return v}return Z.insert=0,ut===p?(R(Z,!0),Z.strm.avail_out===0?B:F):Z.last_lit&&(R(Z,!1),Z.strm.avail_out===0)?v:O}(k,X):k.strategy===3?function(Z,ut){for(var C,A,G,ot,ht=Z.window;;){if(Z.lookahead<=b){if(ft(Z),Z.lookahead<=b&&ut===l)return v;if(Z.lookahead===0)break}if(Z.match_length=0,Z.lookahead>=T&&0<Z.strstart&&(A=ht[G=Z.strstart-1])===ht[++G]&&A===ht[++G]&&A===ht[++G]){ot=Z.strstart+b;do;while(A===ht[++G]&&A===ht[++G]&&A===ht[++G]&&A===ht[++G]&&A===ht[++G]&&A===ht[++G]&&A===ht[++G]&&A===ht[++G]&&G<ot);Z.match_length=b-(ot-G),Z.match_length>Z.lookahead&&(Z.match_length=Z.lookahead)}if(Z.match_length>=T?(C=s._tr_tally(Z,1,Z.match_length-T),Z.lookahead-=Z.match_length,Z.strstart+=Z.match_length,Z.match_length=0):(C=s._tr_tally(Z,0,Z.window[Z.strstart]),Z.lookahead--,Z.strstart++),C&&(R(Z,!1),Z.strm.avail_out===0))return v}return Z.insert=0,ut===p?(R(Z,!0),Z.strm.avail_out===0?B:F):Z.last_lit&&(R(Z,!1),Z.strm.avail_out===0)?v:O}(k,X):n[k.level].func(k,X);if(st!==B&&st!==F||(k.status=666),st===v||st===B)return x.avail_out===0&&(k.last_flush=-1),h;if(st===O&&(X===1?s._tr_align(k):X!==5&&(s._tr_stored_block(k,0,0,!1),X===3&&(j(k.head),k.lookahead===0&&(k.strstart=0,k.block_start=0,k.insert=0))),P(x),x.avail_out===0))return k.last_flush=-1,h}return X!==p?h:k.wrap<=0?1:(k.wrap===2?(it(k,255&x.adler),it(k,x.adler>>8&255),it(k,x.adler>>16&255),it(k,x.adler>>24&255),it(k,255&x.total_in),it(k,x.total_in>>8&255),it(k,x.total_in>>16&255),it(k,x.total_in>>24&255)):(Y(k,x.adler>>>16),Y(k,65535&x.adler)),P(x),0<k.wrap&&(k.wrap=-k.wrap),k.pending!==0?h:1)},e.deflateEnd=function(x){var X;return x&&x.state?(X=x.state.status)!==E&&X!==69&&X!==73&&X!==91&&X!==103&&X!==N&&X!==666?$(x,d):(x.state=null,X===N?$(x,-3):h):d},e.deflateSetDictionary=function(x,X){var tt,k,I,V,rt,st,Z,ut,C=X.length;if(!x||!x.state||(V=(tt=x.state).wrap)===2||V===1&&tt.status!==E||tt.lookahead)return d;for(V===1&&(x.adler=o(x.adler,X,C,0)),tt.wrap=0,C>=tt.w_size&&(V===0&&(j(tt.head),tt.strstart=0,tt.block_start=0,tt.insert=0),ut=new i.Buf8(tt.w_size),i.arraySet(ut,X,C-tt.w_size,tt.w_size,0),X=ut,C=tt.w_size),rt=x.avail_in,st=x.next_in,Z=x.input,x.avail_in=C,x.next_in=0,x.input=X,ft(tt);tt.lookahead>=T;){for(k=tt.strstart,I=tt.lookahead-(T-1);tt.ins_h=(tt.ins_h<<tt.hash_shift^tt.window[k+T-1])&tt.hash_mask,tt.prev[k&tt.w_mask]=tt.head[tt.ins_h],tt.head[tt.ins_h]=k,k++,--I;);tt.strstart=k,tt.lookahead=T-1,ft(tt)}return tt.strstart+=tt.lookahead,tt.block_start=tt.strstart,tt.insert=tt.lookahead,tt.lookahead=0,tt.match_length=tt.prev_length=T-1,tt.match_available=0,x.next_in=st,x.input=Z,x.avail_in=rt,tt.wrap=V,h},e.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./messages":51,"./trees":52}],47:[function(r,t,e){"use strict";t.exports=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}},{}],48:[function(r,t,e){"use strict";t.exports=function(n,i){var s,o,a,c,l,p,h,d,m,g,u,f,_,y,M,w,S,D,T,b,L,E,N,v,O;s=n.state,o=n.next_in,v=n.input,a=o+(n.avail_in-5),c=n.next_out,O=n.output,l=c-(i-n.avail_out),p=c+(n.avail_out-257),h=s.dmax,d=s.wsize,m=s.whave,g=s.wnext,u=s.window,f=s.hold,_=s.bits,y=s.lencode,M=s.distcode,w=(1<<s.lenbits)-1,S=(1<<s.distbits)-1;t:do{_<15&&(f+=v[o++]<<_,_+=8,f+=v[o++]<<_,_+=8),D=y[f&w];e:for(;;){if(f>>>=T=D>>>24,_-=T,(T=D>>>16&255)===0)O[c++]=65535&D;else{if(!(16&T)){if((64&T)==0){D=y[(65535&D)+(f&(1<<T)-1)];continue e}if(32&T){s.mode=12;break t}n.msg="invalid literal/length code",s.mode=30;break t}b=65535&D,(T&=15)&&(_<T&&(f+=v[o++]<<_,_+=8),b+=f&(1<<T)-1,f>>>=T,_-=T),_<15&&(f+=v[o++]<<_,_+=8,f+=v[o++]<<_,_+=8),D=M[f&S];n:for(;;){if(f>>>=T=D>>>24,_-=T,!(16&(T=D>>>16&255))){if((64&T)==0){D=M[(65535&D)+(f&(1<<T)-1)];continue n}n.msg="invalid distance code",s.mode=30;break t}if(L=65535&D,_<(T&=15)&&(f+=v[o++]<<_,(_+=8)<T&&(f+=v[o++]<<_,_+=8)),h<(L+=f&(1<<T)-1)){n.msg="invalid distance too far back",s.mode=30;break t}if(f>>>=T,_-=T,(T=c-l)<L){if(m<(T=L-T)&&s.sane){n.msg="invalid distance too far back",s.mode=30;break t}if(N=u,(E=0)===g){if(E+=d-T,T<b){for(b-=T;O[c++]=u[E++],--T;);E=c-L,N=O}}else if(g<T){if(E+=d+g-T,(T-=g)<b){for(b-=T;O[c++]=u[E++],--T;);if(E=0,g<b){for(b-=T=g;O[c++]=u[E++],--T;);E=c-L,N=O}}}else if(E+=g-T,T<b){for(b-=T;O[c++]=u[E++],--T;);E=c-L,N=O}for(;2<b;)O[c++]=N[E++],O[c++]=N[E++],O[c++]=N[E++],b-=3;b&&(O[c++]=N[E++],1<b&&(O[c++]=N[E++]))}else{for(E=c-L;O[c++]=O[E++],O[c++]=O[E++],O[c++]=O[E++],2<(b-=3););b&&(O[c++]=O[E++],1<b&&(O[c++]=O[E++]))}break}}break}}while(o<a&&c<p);o-=b=_>>3,f&=(1<<(_-=b<<3))-1,n.next_in=o,n.next_out=c,n.avail_in=o<a?a-o+5:5-(o-a),n.avail_out=c<p?p-c+257:257-(c-p),s.hold=f,s.bits=_}},{}],49:[function(r,t,e){"use strict";var n=r("../utils/common"),i=r("./adler32"),s=r("./crc32"),o=r("./inffast"),a=r("./inftrees"),c=1,l=2,p=0,h=-2,d=1,m=852,g=592;function u(E){return(E>>>24&255)+(E>>>8&65280)+((65280&E)<<8)+((255&E)<<24)}function f(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new n.Buf16(320),this.work=new n.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function _(E){var N;return E&&E.state?(N=E.state,E.total_in=E.total_out=N.total=0,E.msg="",N.wrap&&(E.adler=1&N.wrap),N.mode=d,N.last=0,N.havedict=0,N.dmax=32768,N.head=null,N.hold=0,N.bits=0,N.lencode=N.lendyn=new n.Buf32(m),N.distcode=N.distdyn=new n.Buf32(g),N.sane=1,N.back=-1,p):h}function y(E){var N;return E&&E.state?((N=E.state).wsize=0,N.whave=0,N.wnext=0,_(E)):h}function M(E,N){var v,O;return E&&E.state?(O=E.state,N<0?(v=0,N=-N):(v=1+(N>>4),N<48&&(N&=15)),N&&(N<8||15<N)?h:(O.window!==null&&O.wbits!==N&&(O.window=null),O.wrap=v,O.wbits=N,y(E))):h}function w(E,N){var v,O;return E?(O=new f,(E.state=O).window=null,(v=M(E,N))!==p&&(E.state=null),v):h}var S,D,T=!0;function b(E){if(T){var N;for(S=new n.Buf32(512),D=new n.Buf32(32),N=0;N<144;)E.lens[N++]=8;for(;N<256;)E.lens[N++]=9;for(;N<280;)E.lens[N++]=7;for(;N<288;)E.lens[N++]=8;for(a(c,E.lens,0,288,S,0,E.work,{bits:9}),N=0;N<32;)E.lens[N++]=5;a(l,E.lens,0,32,D,0,E.work,{bits:5}),T=!1}E.lencode=S,E.lenbits=9,E.distcode=D,E.distbits=5}function L(E,N,v,O){var B,F=E.state;return F.window===null&&(F.wsize=1<<F.wbits,F.wnext=0,F.whave=0,F.window=new n.Buf8(F.wsize)),O>=F.wsize?(n.arraySet(F.window,N,v-F.wsize,F.wsize,0),F.wnext=0,F.whave=F.wsize):(O<(B=F.wsize-F.wnext)&&(B=O),n.arraySet(F.window,N,v-O,B,F.wnext),(O-=B)?(n.arraySet(F.window,N,v-O,O,0),F.wnext=O,F.whave=F.wsize):(F.wnext+=B,F.wnext===F.wsize&&(F.wnext=0),F.whave<F.wsize&&(F.whave+=B))),0}e.inflateReset=y,e.inflateReset2=M,e.inflateResetKeep=_,e.inflateInit=function(E){return w(E,15)},e.inflateInit2=w,e.inflate=function(E,N){var v,O,B,F,$,q,j,P,R,it,Y,Q,ft,Et,nt,At,Mt,bt,xt,zt,x,X,tt,k,I=0,V=new n.Buf8(4),rt=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!E||!E.state||!E.output||!E.input&&E.avail_in!==0)return h;(v=E.state).mode===12&&(v.mode=13),$=E.next_out,B=E.output,j=E.avail_out,F=E.next_in,O=E.input,q=E.avail_in,P=v.hold,R=v.bits,it=q,Y=j,X=p;t:for(;;)switch(v.mode){case d:if(v.wrap===0){v.mode=13;break}for(;R<16;){if(q===0)break t;q--,P+=O[F++]<<R,R+=8}if(2&v.wrap&&P===35615){V[v.check=0]=255&P,V[1]=P>>>8&255,v.check=s(v.check,V,2,0),R=P=0,v.mode=2;break}if(v.flags=0,v.head&&(v.head.done=!1),!(1&v.wrap)||(((255&P)<<8)+(P>>8))%31){E.msg="incorrect header check",v.mode=30;break}if((15&P)!=8){E.msg="unknown compression method",v.mode=30;break}if(R-=4,x=8+(15&(P>>>=4)),v.wbits===0)v.wbits=x;else if(x>v.wbits){E.msg="invalid window size",v.mode=30;break}v.dmax=1<<x,E.adler=v.check=1,v.mode=512&P?10:12,R=P=0;break;case 2:for(;R<16;){if(q===0)break t;q--,P+=O[F++]<<R,R+=8}if(v.flags=P,(255&v.flags)!=8){E.msg="unknown compression method",v.mode=30;break}if(57344&v.flags){E.msg="unknown header flags set",v.mode=30;break}v.head&&(v.head.text=P>>8&1),512&v.flags&&(V[0]=255&P,V[1]=P>>>8&255,v.check=s(v.check,V,2,0)),R=P=0,v.mode=3;case 3:for(;R<32;){if(q===0)break t;q--,P+=O[F++]<<R,R+=8}v.head&&(v.head.time=P),512&v.flags&&(V[0]=255&P,V[1]=P>>>8&255,V[2]=P>>>16&255,V[3]=P>>>24&255,v.check=s(v.check,V,4,0)),R=P=0,v.mode=4;case 4:for(;R<16;){if(q===0)break t;q--,P+=O[F++]<<R,R+=8}v.head&&(v.head.xflags=255&P,v.head.os=P>>8),512&v.flags&&(V[0]=255&P,V[1]=P>>>8&255,v.check=s(v.check,V,2,0)),R=P=0,v.mode=5;case 5:if(1024&v.flags){for(;R<16;){if(q===0)break t;q--,P+=O[F++]<<R,R+=8}v.length=P,v.head&&(v.head.extra_len=P),512&v.flags&&(V[0]=255&P,V[1]=P>>>8&255,v.check=s(v.check,V,2,0)),R=P=0}else v.head&&(v.head.extra=null);v.mode=6;case 6:if(1024&v.flags&&(q<(Q=v.length)&&(Q=q),Q&&(v.head&&(x=v.head.extra_len-v.length,v.head.extra||(v.head.extra=new Array(v.head.extra_len)),n.arraySet(v.head.extra,O,F,Q,x)),512&v.flags&&(v.check=s(v.check,O,Q,F)),q-=Q,F+=Q,v.length-=Q),v.length))break t;v.length=0,v.mode=7;case 7:if(2048&v.flags){if(q===0)break t;for(Q=0;x=O[F+Q++],v.head&&x&&v.length<65536&&(v.head.name+=String.fromCharCode(x)),x&&Q<q;);if(512&v.flags&&(v.check=s(v.check,O,Q,F)),q-=Q,F+=Q,x)break t}else v.head&&(v.head.name=null);v.length=0,v.mode=8;case 8:if(4096&v.flags){if(q===0)break t;for(Q=0;x=O[F+Q++],v.head&&x&&v.length<65536&&(v.head.comment+=String.fromCharCode(x)),x&&Q<q;);if(512&v.flags&&(v.check=s(v.check,O,Q,F)),q-=Q,F+=Q,x)break t}else v.head&&(v.head.comment=null);v.mode=9;case 9:if(512&v.flags){for(;R<16;){if(q===0)break t;q--,P+=O[F++]<<R,R+=8}if(P!==(65535&v.check)){E.msg="header crc mismatch",v.mode=30;break}R=P=0}v.head&&(v.head.hcrc=v.flags>>9&1,v.head.done=!0),E.adler=v.check=0,v.mode=12;break;case 10:for(;R<32;){if(q===0)break t;q--,P+=O[F++]<<R,R+=8}E.adler=v.check=u(P),R=P=0,v.mode=11;case 11:if(v.havedict===0)return E.next_out=$,E.avail_out=j,E.next_in=F,E.avail_in=q,v.hold=P,v.bits=R,2;E.adler=v.check=1,v.mode=12;case 12:if(N===5||N===6)break t;case 13:if(v.last){P>>>=7&R,R-=7&R,v.mode=27;break}for(;R<3;){if(q===0)break t;q--,P+=O[F++]<<R,R+=8}switch(v.last=1&P,R-=1,3&(P>>>=1)){case 0:v.mode=14;break;case 1:if(b(v),v.mode=20,N!==6)break;P>>>=2,R-=2;break t;case 2:v.mode=17;break;case 3:E.msg="invalid block type",v.mode=30}P>>>=2,R-=2;break;case 14:for(P>>>=7&R,R-=7&R;R<32;){if(q===0)break t;q--,P+=O[F++]<<R,R+=8}if((65535&P)!=(P>>>16^65535)){E.msg="invalid stored block lengths",v.mode=30;break}if(v.length=65535&P,R=P=0,v.mode=15,N===6)break t;case 15:v.mode=16;case 16:if(Q=v.length){if(q<Q&&(Q=q),j<Q&&(Q=j),Q===0)break t;n.arraySet(B,O,F,Q,$),q-=Q,F+=Q,j-=Q,$+=Q,v.length-=Q;break}v.mode=12;break;case 17:for(;R<14;){if(q===0)break t;q--,P+=O[F++]<<R,R+=8}if(v.nlen=257+(31&P),P>>>=5,R-=5,v.ndist=1+(31&P),P>>>=5,R-=5,v.ncode=4+(15&P),P>>>=4,R-=4,286<v.nlen||30<v.ndist){E.msg="too many length or distance symbols",v.mode=30;break}v.have=0,v.mode=18;case 18:for(;v.have<v.ncode;){for(;R<3;){if(q===0)break t;q--,P+=O[F++]<<R,R+=8}v.lens[rt[v.have++]]=7&P,P>>>=3,R-=3}for(;v.have<19;)v.lens[rt[v.have++]]=0;if(v.lencode=v.lendyn,v.lenbits=7,tt={bits:v.lenbits},X=a(0,v.lens,0,19,v.lencode,0,v.work,tt),v.lenbits=tt.bits,X){E.msg="invalid code lengths set",v.mode=30;break}v.have=0,v.mode=19;case 19:for(;v.have<v.nlen+v.ndist;){for(;At=(I=v.lencode[P&(1<<v.lenbits)-1])>>>16&255,Mt=65535&I,!((nt=I>>>24)<=R);){if(q===0)break t;q--,P+=O[F++]<<R,R+=8}if(Mt<16)P>>>=nt,R-=nt,v.lens[v.have++]=Mt;else{if(Mt===16){for(k=nt+2;R<k;){if(q===0)break t;q--,P+=O[F++]<<R,R+=8}if(P>>>=nt,R-=nt,v.have===0){E.msg="invalid bit length repeat",v.mode=30;break}x=v.lens[v.have-1],Q=3+(3&P),P>>>=2,R-=2}else if(Mt===17){for(k=nt+3;R<k;){if(q===0)break t;q--,P+=O[F++]<<R,R+=8}R-=nt,x=0,Q=3+(7&(P>>>=nt)),P>>>=3,R-=3}else{for(k=nt+7;R<k;){if(q===0)break t;q--,P+=O[F++]<<R,R+=8}R-=nt,x=0,Q=11+(127&(P>>>=nt)),P>>>=7,R-=7}if(v.have+Q>v.nlen+v.ndist){E.msg="invalid bit length repeat",v.mode=30;break}for(;Q--;)v.lens[v.have++]=x}}if(v.mode===30)break;if(v.lens[256]===0){E.msg="invalid code -- missing end-of-block",v.mode=30;break}if(v.lenbits=9,tt={bits:v.lenbits},X=a(c,v.lens,0,v.nlen,v.lencode,0,v.work,tt),v.lenbits=tt.bits,X){E.msg="invalid literal/lengths set",v.mode=30;break}if(v.distbits=6,v.distcode=v.distdyn,tt={bits:v.distbits},X=a(l,v.lens,v.nlen,v.ndist,v.distcode,0,v.work,tt),v.distbits=tt.bits,X){E.msg="invalid distances set",v.mode=30;break}if(v.mode=20,N===6)break t;case 20:v.mode=21;case 21:if(6<=q&&258<=j){E.next_out=$,E.avail_out=j,E.next_in=F,E.avail_in=q,v.hold=P,v.bits=R,o(E,Y),$=E.next_out,B=E.output,j=E.avail_out,F=E.next_in,O=E.input,q=E.avail_in,P=v.hold,R=v.bits,v.mode===12&&(v.back=-1);break}for(v.back=0;At=(I=v.lencode[P&(1<<v.lenbits)-1])>>>16&255,Mt=65535&I,!((nt=I>>>24)<=R);){if(q===0)break t;q--,P+=O[F++]<<R,R+=8}if(At&&(240&At)==0){for(bt=nt,xt=At,zt=Mt;At=(I=v.lencode[zt+((P&(1<<bt+xt)-1)>>bt)])>>>16&255,Mt=65535&I,!(bt+(nt=I>>>24)<=R);){if(q===0)break t;q--,P+=O[F++]<<R,R+=8}P>>>=bt,R-=bt,v.back+=bt}if(P>>>=nt,R-=nt,v.back+=nt,v.length=Mt,At===0){v.mode=26;break}if(32&At){v.back=-1,v.mode=12;break}if(64&At){E.msg="invalid literal/length code",v.mode=30;break}v.extra=15&At,v.mode=22;case 22:if(v.extra){for(k=v.extra;R<k;){if(q===0)break t;q--,P+=O[F++]<<R,R+=8}v.length+=P&(1<<v.extra)-1,P>>>=v.extra,R-=v.extra,v.back+=v.extra}v.was=v.length,v.mode=23;case 23:for(;At=(I=v.distcode[P&(1<<v.distbits)-1])>>>16&255,Mt=65535&I,!((nt=I>>>24)<=R);){if(q===0)break t;q--,P+=O[F++]<<R,R+=8}if((240&At)==0){for(bt=nt,xt=At,zt=Mt;At=(I=v.distcode[zt+((P&(1<<bt+xt)-1)>>bt)])>>>16&255,Mt=65535&I,!(bt+(nt=I>>>24)<=R);){if(q===0)break t;q--,P+=O[F++]<<R,R+=8}P>>>=bt,R-=bt,v.back+=bt}if(P>>>=nt,R-=nt,v.back+=nt,64&At){E.msg="invalid distance code",v.mode=30;break}v.offset=Mt,v.extra=15&At,v.mode=24;case 24:if(v.extra){for(k=v.extra;R<k;){if(q===0)break t;q--,P+=O[F++]<<R,R+=8}v.offset+=P&(1<<v.extra)-1,P>>>=v.extra,R-=v.extra,v.back+=v.extra}if(v.offset>v.dmax){E.msg="invalid distance too far back",v.mode=30;break}v.mode=25;case 25:if(j===0)break t;if(Q=Y-j,v.offset>Q){if((Q=v.offset-Q)>v.whave&&v.sane){E.msg="invalid distance too far back",v.mode=30;break}ft=Q>v.wnext?(Q-=v.wnext,v.wsize-Q):v.wnext-Q,Q>v.length&&(Q=v.length),Et=v.window}else Et=B,ft=$-v.offset,Q=v.length;for(j<Q&&(Q=j),j-=Q,v.length-=Q;B[$++]=Et[ft++],--Q;);v.length===0&&(v.mode=21);break;case 26:if(j===0)break t;B[$++]=v.length,j--,v.mode=21;break;case 27:if(v.wrap){for(;R<32;){if(q===0)break t;q--,P|=O[F++]<<R,R+=8}if(Y-=j,E.total_out+=Y,v.total+=Y,Y&&(E.adler=v.check=v.flags?s(v.check,B,Y,$-Y):i(v.check,B,Y,$-Y)),Y=j,(v.flags?P:u(P))!==v.check){E.msg="incorrect data check",v.mode=30;break}R=P=0}v.mode=28;case 28:if(v.wrap&&v.flags){for(;R<32;){if(q===0)break t;q--,P+=O[F++]<<R,R+=8}if(P!==(4294967295&v.total)){E.msg="incorrect length check",v.mode=30;break}R=P=0}v.mode=29;case 29:X=1;break t;case 30:X=-3;break t;case 31:return-4;case 32:default:return h}return E.next_out=$,E.avail_out=j,E.next_in=F,E.avail_in=q,v.hold=P,v.bits=R,(v.wsize||Y!==E.avail_out&&v.mode<30&&(v.mode<27||N!==4))&&L(E,E.output,E.next_out,Y-E.avail_out)?(v.mode=31,-4):(it-=E.avail_in,Y-=E.avail_out,E.total_in+=it,E.total_out+=Y,v.total+=Y,v.wrap&&Y&&(E.adler=v.check=v.flags?s(v.check,B,Y,E.next_out-Y):i(v.check,B,Y,E.next_out-Y)),E.data_type=v.bits+(v.last?64:0)+(v.mode===12?128:0)+(v.mode===20||v.mode===15?256:0),(it==0&&Y===0||N===4)&&X===p&&(X=-5),X)},e.inflateEnd=function(E){if(!E||!E.state)return h;var N=E.state;return N.window&&(N.window=null),E.state=null,p},e.inflateGetHeader=function(E,N){var v;return E&&E.state?(2&(v=E.state).wrap)==0?h:((v.head=N).done=!1,p):h},e.inflateSetDictionary=function(E,N){var v,O=N.length;return E&&E.state?(v=E.state).wrap!==0&&v.mode!==11?h:v.mode===11&&i(1,N,O,0)!==v.check?-3:L(E,N,O,O)?(v.mode=31,-4):(v.havedict=1,p):h},e.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./inffast":48,"./inftrees":50}],50:[function(r,t,e){"use strict";var n=r("../utils/common"),i=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],s=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],o=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],a=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];t.exports=function(c,l,p,h,d,m,g,u){var f,_,y,M,w,S,D,T,b,L=u.bits,E=0,N=0,v=0,O=0,B=0,F=0,$=0,q=0,j=0,P=0,R=null,it=0,Y=new n.Buf16(16),Q=new n.Buf16(16),ft=null,Et=0;for(E=0;E<=15;E++)Y[E]=0;for(N=0;N<h;N++)Y[l[p+N]]++;for(B=L,O=15;1<=O&&Y[O]===0;O--);if(O<B&&(B=O),O===0)return d[m++]=20971520,d[m++]=20971520,u.bits=1,0;for(v=1;v<O&&Y[v]===0;v++);for(B<v&&(B=v),E=q=1;E<=15;E++)if(q<<=1,(q-=Y[E])<0)return-1;if(0<q&&(c===0||O!==1))return-1;for(Q[1]=0,E=1;E<15;E++)Q[E+1]=Q[E]+Y[E];for(N=0;N<h;N++)l[p+N]!==0&&(g[Q[l[p+N]]++]=N);if(S=c===0?(R=ft=g,19):c===1?(R=i,it-=257,ft=s,Et-=257,256):(R=o,ft=a,-1),E=v,w=m,$=N=P=0,y=-1,M=(j=1<<(F=B))-1,c===1&&852<j||c===2&&592<j)return 1;for(;;){for(D=E-$,b=g[N]<S?(T=0,g[N]):g[N]>S?(T=ft[Et+g[N]],R[it+g[N]]):(T=96,0),f=1<<E-$,v=_=1<<F;d[w+(P>>$)+(_-=f)]=D<<24|T<<16|b|0,_!==0;);for(f=1<<E-1;P&f;)f>>=1;if(f!==0?(P&=f-1,P+=f):P=0,N++,--Y[E]==0){if(E===O)break;E=l[p+g[N]]}if(B<E&&(P&M)!==y){for($===0&&($=B),w+=v,q=1<<(F=E-$);F+$<O&&!((q-=Y[F+$])<=0);)F++,q<<=1;if(j+=1<<F,c===1&&852<j||c===2&&592<j)return 1;d[y=P&M]=B<<24|F<<16|w-m|0}}return P!==0&&(d[w+P]=E-$<<24|64<<16|0),u.bits=B,0}},{"../utils/common":41}],51:[function(r,t,e){"use strict";t.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],52:[function(r,t,e){"use strict";var n=r("../utils/common"),i=0,s=1;function o(I){for(var V=I.length;0<=--V;)I[V]=0}var a=0,c=29,l=256,p=l+1+c,h=30,d=19,m=2*p+1,g=15,u=16,f=7,_=256,y=16,M=17,w=18,S=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],D=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],T=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],b=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],L=new Array(2*(p+2));o(L);var E=new Array(2*h);o(E);var N=new Array(512);o(N);var v=new Array(256);o(v);var O=new Array(c);o(O);var B,F,$,q=new Array(h);function j(I,V,rt,st,Z){this.static_tree=I,this.extra_bits=V,this.extra_base=rt,this.elems=st,this.max_length=Z,this.has_stree=I&&I.length}function P(I,V){this.dyn_tree=I,this.max_code=0,this.stat_desc=V}function R(I){return I<256?N[I]:N[256+(I>>>7)]}function it(I,V){I.pending_buf[I.pending++]=255&V,I.pending_buf[I.pending++]=V>>>8&255}function Y(I,V,rt){I.bi_valid>u-rt?(I.bi_buf|=V<<I.bi_valid&65535,it(I,I.bi_buf),I.bi_buf=V>>u-I.bi_valid,I.bi_valid+=rt-u):(I.bi_buf|=V<<I.bi_valid&65535,I.bi_valid+=rt)}function Q(I,V,rt){Y(I,rt[2*V],rt[2*V+1])}function ft(I,V){for(var rt=0;rt|=1&I,I>>>=1,rt<<=1,0<--V;);return rt>>>1}function Et(I,V,rt){var st,Z,ut=new Array(g+1),C=0;for(st=1;st<=g;st++)ut[st]=C=C+rt[st-1]<<1;for(Z=0;Z<=V;Z++){var A=I[2*Z+1];A!==0&&(I[2*Z]=ft(ut[A]++,A))}}function nt(I){var V;for(V=0;V<p;V++)I.dyn_ltree[2*V]=0;for(V=0;V<h;V++)I.dyn_dtree[2*V]=0;for(V=0;V<d;V++)I.bl_tree[2*V]=0;I.dyn_ltree[2*_]=1,I.opt_len=I.static_len=0,I.last_lit=I.matches=0}function At(I){8<I.bi_valid?it(I,I.bi_buf):0<I.bi_valid&&(I.pending_buf[I.pending++]=I.bi_buf),I.bi_buf=0,I.bi_valid=0}function Mt(I,V,rt,st){var Z=2*V,ut=2*rt;return I[Z]<I[ut]||I[Z]===I[ut]&&st[V]<=st[rt]}function bt(I,V,rt){for(var st=I.heap[rt],Z=rt<<1;Z<=I.heap_len&&(Z<I.heap_len&&Mt(V,I.heap[Z+1],I.heap[Z],I.depth)&&Z++,!Mt(V,st,I.heap[Z],I.depth));)I.heap[rt]=I.heap[Z],rt=Z,Z<<=1;I.heap[rt]=st}function xt(I,V,rt){var st,Z,ut,C,A=0;if(I.last_lit!==0)for(;st=I.pending_buf[I.d_buf+2*A]<<8|I.pending_buf[I.d_buf+2*A+1],Z=I.pending_buf[I.l_buf+A],A++,st===0?Q(I,Z,V):(Q(I,(ut=v[Z])+l+1,V),(C=S[ut])!==0&&Y(I,Z-=O[ut],C),Q(I,ut=R(--st),rt),(C=D[ut])!==0&&Y(I,st-=q[ut],C)),A<I.last_lit;);Q(I,_,V)}function zt(I,V){var rt,st,Z,ut=V.dyn_tree,C=V.stat_desc.static_tree,A=V.stat_desc.has_stree,G=V.stat_desc.elems,ot=-1;for(I.heap_len=0,I.heap_max=m,rt=0;rt<G;rt++)ut[2*rt]!==0?(I.heap[++I.heap_len]=ot=rt,I.depth[rt]=0):ut[2*rt+1]=0;for(;I.heap_len<2;)ut[2*(Z=I.heap[++I.heap_len]=ot<2?++ot:0)]=1,I.depth[Z]=0,I.opt_len--,A&&(I.static_len-=C[2*Z+1]);for(V.max_code=ot,rt=I.heap_len>>1;1<=rt;rt--)bt(I,ut,rt);for(Z=G;rt=I.heap[1],I.heap[1]=I.heap[I.heap_len--],bt(I,ut,1),st=I.heap[1],I.heap[--I.heap_max]=rt,I.heap[--I.heap_max]=st,ut[2*Z]=ut[2*rt]+ut[2*st],I.depth[Z]=(I.depth[rt]>=I.depth[st]?I.depth[rt]:I.depth[st])+1,ut[2*rt+1]=ut[2*st+1]=Z,I.heap[1]=Z++,bt(I,ut,1),2<=I.heap_len;);I.heap[--I.heap_max]=I.heap[1],function(ht,pt){var Tt,U,J,dt,wt,yt,St=pt.dyn_tree,Lt=pt.max_code,Ft=pt.stat_desc.static_tree,W=pt.stat_desc.has_stree,vt=pt.stat_desc.extra_bits,gt=pt.stat_desc.extra_base,lt=pt.stat_desc.max_length,_t=0;for(dt=0;dt<=g;dt++)ht.bl_count[dt]=0;for(St[2*ht.heap[ht.heap_max]+1]=0,Tt=ht.heap_max+1;Tt<m;Tt++)lt<(dt=St[2*St[2*(U=ht.heap[Tt])+1]+1]+1)&&(dt=lt,_t++),St[2*U+1]=dt,Lt<U||(ht.bl_count[dt]++,wt=0,gt<=U&&(wt=vt[U-gt]),yt=St[2*U],ht.opt_len+=yt*(dt+wt),W&&(ht.static_len+=yt*(Ft[2*U+1]+wt)));if(_t!==0){do{for(dt=lt-1;ht.bl_count[dt]===0;)dt--;ht.bl_count[dt]--,ht.bl_count[dt+1]+=2,ht.bl_count[lt]--,_t-=2}while(0<_t);for(dt=lt;dt!==0;dt--)for(U=ht.bl_count[dt];U!==0;)Lt<(J=ht.heap[--Tt])||(St[2*J+1]!==dt&&(ht.opt_len+=(dt-St[2*J+1])*St[2*J],St[2*J+1]=dt),U--)}}(I,V),Et(ut,ot,I.bl_count)}function x(I,V,rt){var st,Z,ut=-1,C=V[1],A=0,G=7,ot=4;for(C===0&&(G=138,ot=3),V[2*(rt+1)+1]=65535,st=0;st<=rt;st++)Z=C,C=V[2*(st+1)+1],++A<G&&Z===C||(A<ot?I.bl_tree[2*Z]+=A:Z!==0?(Z!==ut&&I.bl_tree[2*Z]++,I.bl_tree[2*y]++):A<=10?I.bl_tree[2*M]++:I.bl_tree[2*w]++,ut=Z,ot=(A=0)===C?(G=138,3):Z===C?(G=6,3):(G=7,4))}function X(I,V,rt){var st,Z,ut=-1,C=V[1],A=0,G=7,ot=4;for(C===0&&(G=138,ot=3),st=0;st<=rt;st++)if(Z=C,C=V[2*(st+1)+1],!(++A<G&&Z===C)){if(A<ot)for(;Q(I,Z,I.bl_tree),--A!=0;);else Z!==0?(Z!==ut&&(Q(I,Z,I.bl_tree),A--),Q(I,y,I.bl_tree),Y(I,A-3,2)):A<=10?(Q(I,M,I.bl_tree),Y(I,A-3,3)):(Q(I,w,I.bl_tree),Y(I,A-11,7));ut=Z,ot=(A=0)===C?(G=138,3):Z===C?(G=6,3):(G=7,4)}}o(q);var tt=!1;function k(I,V,rt,st){Y(I,(a<<1)+(st?1:0),3),function(Z,ut,C,A){At(Z),A&&(it(Z,C),it(Z,~C)),n.arraySet(Z.pending_buf,Z.window,ut,C,Z.pending),Z.pending+=C}(I,V,rt,!0)}e._tr_init=function(I){tt||(function(){var V,rt,st,Z,ut,C=new Array(g+1);for(Z=st=0;Z<c-1;Z++)for(O[Z]=st,V=0;V<1<<S[Z];V++)v[st++]=Z;for(v[st-1]=Z,Z=ut=0;Z<16;Z++)for(q[Z]=ut,V=0;V<1<<D[Z];V++)N[ut++]=Z;for(ut>>=7;Z<h;Z++)for(q[Z]=ut<<7,V=0;V<1<<D[Z]-7;V++)N[256+ut++]=Z;for(rt=0;rt<=g;rt++)C[rt]=0;for(V=0;V<=143;)L[2*V+1]=8,V++,C[8]++;for(;V<=255;)L[2*V+1]=9,V++,C[9]++;for(;V<=279;)L[2*V+1]=7,V++,C[7]++;for(;V<=287;)L[2*V+1]=8,V++,C[8]++;for(Et(L,p+1,C),V=0;V<h;V++)E[2*V+1]=5,E[2*V]=ft(V,5);B=new j(L,S,l+1,p,g),F=new j(E,D,0,h,g),$=new j(new Array(0),T,0,d,f)}(),tt=!0),I.l_desc=new P(I.dyn_ltree,B),I.d_desc=new P(I.dyn_dtree,F),I.bl_desc=new P(I.bl_tree,$),I.bi_buf=0,I.bi_valid=0,nt(I)},e._tr_stored_block=k,e._tr_flush_block=function(I,V,rt,st){var Z,ut,C=0;0<I.level?(I.strm.data_type===2&&(I.strm.data_type=function(A){var G,ot=4093624447;for(G=0;G<=31;G++,ot>>>=1)if(1&ot&&A.dyn_ltree[2*G]!==0)return i;if(A.dyn_ltree[18]!==0||A.dyn_ltree[20]!==0||A.dyn_ltree[26]!==0)return s;for(G=32;G<l;G++)if(A.dyn_ltree[2*G]!==0)return s;return i}(I)),zt(I,I.l_desc),zt(I,I.d_desc),C=function(A){var G;for(x(A,A.dyn_ltree,A.l_desc.max_code),x(A,A.dyn_dtree,A.d_desc.max_code),zt(A,A.bl_desc),G=d-1;3<=G&&A.bl_tree[2*b[G]+1]===0;G--);return A.opt_len+=3*(G+1)+5+5+4,G}(I),Z=I.opt_len+3+7>>>3,(ut=I.static_len+3+7>>>3)<=Z&&(Z=ut)):Z=ut=rt+5,rt+4<=Z&&V!==-1?k(I,V,rt,st):I.strategy===4||ut===Z?(Y(I,2+(st?1:0),3),xt(I,L,E)):(Y(I,4+(st?1:0),3),function(A,G,ot,ht){var pt;for(Y(A,G-257,5),Y(A,ot-1,5),Y(A,ht-4,4),pt=0;pt<ht;pt++)Y(A,A.bl_tree[2*b[pt]+1],3);X(A,A.dyn_ltree,G-1),X(A,A.dyn_dtree,ot-1)}(I,I.l_desc.max_code+1,I.d_desc.max_code+1,C+1),xt(I,I.dyn_ltree,I.dyn_dtree)),nt(I),st&&At(I)},e._tr_tally=function(I,V,rt){return I.pending_buf[I.d_buf+2*I.last_lit]=V>>>8&255,I.pending_buf[I.d_buf+2*I.last_lit+1]=255&V,I.pending_buf[I.l_buf+I.last_lit]=255&rt,I.last_lit++,V===0?I.dyn_ltree[2*rt]++:(I.matches++,V--,I.dyn_ltree[2*(v[rt]+l+1)]++,I.dyn_dtree[2*R(V)]++),I.last_lit===I.lit_bufsize-1},e._tr_align=function(I){Y(I,2,3),Q(I,_,L),function(V){V.bi_valid===16?(it(V,V.bi_buf),V.bi_buf=0,V.bi_valid=0):8<=V.bi_valid&&(V.pending_buf[V.pending++]=255&V.bi_buf,V.bi_buf>>=8,V.bi_valid-=8)}(I)}},{"../utils/common":41}],53:[function(r,t,e){"use strict";t.exports=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}},{}],54:[function(r,t,e){(function(n){(function(i,s){"use strict";if(!i.setImmediate){var o,a,c,l,p=1,h={},d=!1,m=i.document,g=Object.getPrototypeOf&&Object.getPrototypeOf(i);g=g&&g.setTimeout?g:i,o={}.toString.call(i.process)==="[object process]"?function(y){process.nextTick(function(){f(y)})}:function(){if(i.postMessage&&!i.importScripts){var y=!0,M=i.onmessage;return i.onmessage=function(){y=!1},i.postMessage("","*"),i.onmessage=M,y}}()?(l="setImmediate$"+Math.random()+"$",i.addEventListener?i.addEventListener("message",_,!1):i.attachEvent("onmessage",_),function(y){i.postMessage(l+y,"*")}):i.MessageChannel?((c=new MessageChannel).port1.onmessage=function(y){f(y.data)},function(y){c.port2.postMessage(y)}):m&&"onreadystatechange"in m.createElement("script")?(a=m.documentElement,function(y){var M=m.createElement("script");M.onreadystatechange=function(){f(y),M.onreadystatechange=null,a.removeChild(M),M=null},a.appendChild(M)}):function(y){setTimeout(f,0,y)},g.setImmediate=function(y){typeof y!="function"&&(y=new Function(""+y));for(var M=new Array(arguments.length-1),w=0;w<M.length;w++)M[w]=arguments[w+1];var S={callback:y,args:M};return h[p]=S,o(p),p++},g.clearImmediate=u}function u(y){delete h[y]}function f(y){if(d)setTimeout(f,0,y);else{var M=h[y];if(M){d=!0;try{(function(w){var S=w.callback,D=w.args;switch(D.length){case 0:S();break;case 1:S(D[0]);break;case 2:S(D[0],D[1]);break;case 3:S(D[0],D[1],D[2]);break;default:S.apply(s,D)}})(M)}finally{u(y),d=!1}}}}function _(y){y.source===i&&typeof y.data=="string"&&y.data.indexOf(l)===0&&f(+y.data.slice(l.length))}})(typeof self>"u"?n===void 0?this:n:self)}).call(this,typeof global<"u"?global:typeof self<"u"?self:typeof window<"u"?window:{})},{}]},{},[10])(10)})});function Hi(r,t,e,n){let i=n,s=0,o=0;for(t=Math.floor(t),e=Math.floor(e),r.rect(t-i,e,n<<1,1);i>s;)o-=--i-++s,o<0&&(o+=i++),r.rect(t-s,e-i,s<<1,1),r.rect(t-i,e-s,i<<1,1),r.rect(t-i,e+s,i<<1,1),r.rect(t-s,e+i,s<<1,1)}function El(r,t,e,n=1){t=[Math.floor(t[0]),Math.floor(t[1])],e=[Math.floor(e[0]),Math.floor(e[1])];let i=[Math.min(t[0],e[0])-n,Math.min(t[1],e[1])-n],s=[Math.max(t[0],e[0])+n,Math.max(t[1],e[1])+n],o=s[0]-i[0]+1,a=s[1]-i[1]+1;if(o==0||a==0)return;let c=r.getImageData(i[0],i[1],o,a),l=[parseInt(r.fillStyle.substring(1,3),16),parseInt(r.fillStyle.substring(3,5),16),parseInt(r.fillStyle.substring(5,7),16),r.globalCompositeOperation=="source-over"?255:0];function p(w,S){c.data[(w[1]*o+w[0])*4+0]=S[0],c.data[(w[1]*o+w[0])*4+1]=S[1],c.data[(w[1]*o+w[0])*4+2]=S[2],c.data[(w[1]*o+w[0])*4+3]=S[3]}let[h,d]=[t[0]-i[0],t[1]-i[1]],[m,g]=[e[0]-i[0],e[1]-i[1]],u=Math.abs(m-h),f=h<m?1:-1,_=-Math.abs(g-d),y=d<g?1:-1,M=u+_;for(;;){for(let S=-n;S<=n;S++)p([h+S,d],l),p([h,d+S],l);if(h==m&&d==g)break;let w=2*M;w>=_&&(M+=_,h+=f),w<=u&&(M+=u,d+=y)}r.putImageData(c,i[0],i[1])}function Xs(r,t,e,n,i=!1){n=Math.floor(n),El(r,t,e,n);let[s,o]=t,[a,c]=e;if(r.beginPath(),!i)Hi(r,s,o,n),Hi(r,a,c,n);else{let l=n;r.rect(Math.floor(s)-l,Math.floor(o)-l,l*2,l*2),r.rect(Math.floor(a)-l,Math.floor(c)-l,l*2,l*2)}r.fill()}var ia="145",Vn={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Wn={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Al=0,Ma=1,Tl=2;var Fo=1,Cl=2,zi=3,pi=0,Ie=1,Xe=2,Mn=0,ui=1,Sa=2,Ea=3,Aa=4,Ll=5,li=100,Pl=101,Rl=102,Ta=103,Ca=104,Il=200,Dl=201,zl=202,kl=203,Uo=204,Bo=205,Ol=206,Nl=207,Fl=208,Ul=209,Bl=210,Vl=0,Wl=1,Hl=2,Mr=3,Gl=4,ql=5,Xl=6,Zl=7,Vo=0,Yl=1,Jl=2,Ve=0,jl=1,$l=2,Kl=3,Ql=4,tc=5,Wo=300,mi=301,gi=302,Sr=303,Er=304,Ps=306,Ar=1e3,ye=1001,Tr=1002,Kt=1003,La=1004;var Pa=1005;var Re=1006,ec=1007;var Rs=1008;var kn=1009,nc=1010,ic=1011,Ho=1012,sc=1013,Rn=1014,Ze=1015,Ui=1016,rc=1017,ac=1018,di=1020,oc=1021,lc=1022,Ae=1023,cc=1024,hc=1025,Dn=1026,_i=1027,uc=1028,dc=1029,fc=1030,pc=1031,mc=1033,Zs=33776,Ys=33777,Js=33778,js=33779,Ra=35840,Ia=35841,Da=35842,za=35843,gc=36196,ka=37492,Oa=37496,Na=37808,Fa=37809,Ua=37810,Ba=37811,Va=37812,Wa=37813,Ha=37814,Ga=37815,qa=37816,Xa=37817,Za=37818,Ya=37819,Ja=37820,ja=37821,$a=36492;var fs=2300,ps=2301,$s=2302,Ka=2400,Qa=2401,to=2402;var cn=3e3,jt=3001,_c=3200,xc=3201,vc=0,yc=1;var rn="srgb",In="srgb-linear";var Ks=7680;var bc=519,Cr=35044;var eo="300 es",Lr=1035,Ye=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let i=this._listeners[t];if(i!==void 0){let s=i.indexOf(e);s!==-1&&i.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let n=this._listeners[t.type];if(n!==void 0){t.target=this;let i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,t);t.target=null}}},ce=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],no=1234567,Oi=Math.PI/180,ms=180/Math.PI;function ln(){let r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(ce[r&255]+ce[r>>8&255]+ce[r>>16&255]+ce[r>>24&255]+"-"+ce[t&255]+ce[t>>8&255]+"-"+ce[t>>16&15|64]+ce[t>>24&255]+"-"+ce[e&63|128]+ce[e>>8&255]+"-"+ce[e>>16&255]+ce[e>>24&255]+ce[n&255]+ce[n>>8&255]+ce[n>>16&255]+ce[n>>24&255]).toLowerCase()}function ue(r,t,e){return Math.max(t,Math.min(e,r))}function sa(r,t){return(r%t+t)%t}function wc(r,t,e,n,i){return n+(r-t)*(i-n)/(e-t)}function Mc(r,t,e){return r!==t?(e-r)/(t-r):0}function Ni(r,t,e){return(1-e)*r+e*t}function Sc(r,t,e,n){return Ni(r,t,1-Math.exp(-e*n))}function Ec(r,t=1){return t-Math.abs(sa(r,t*2)-t)}function Ac(r,t,e){return r<=t?0:r>=e?1:(r=(r-t)/(e-t),r*r*(3-2*r))}function Tc(r,t,e){return r<=t?0:r>=e?1:(r=(r-t)/(e-t),r*r*r*(r*(r*6-15)+10))}function Cc(r,t){return r+Math.floor(Math.random()*(t-r+1))}function Lc(r,t){return r+Math.random()*(t-r)}function Pc(r){return r*(.5-Math.random())}function Rc(r){r!==void 0&&(no=r);let t=no+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Ic(r){return r*Oi}function Dc(r){return r*ms}function Pr(r){return(r&r-1)===0&&r!==0}function zc(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function gs(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function kc(r,t,e,n,i){let s=Math.cos,o=Math.sin,a=s(e/2),c=o(e/2),l=s((t+n)/2),p=o((t+n)/2),h=s((t-n)/2),d=o((t-n)/2),m=s((n-t)/2),g=o((n-t)/2);switch(i){case"XYX":r.set(a*p,c*h,c*d,a*l);break;case"YZY":r.set(c*d,a*p,c*h,a*l);break;case"ZXZ":r.set(c*h,c*d,a*p,a*l);break;case"XZX":r.set(a*p,c*g,c*m,a*l);break;case"YXY":r.set(c*m,a*p,c*g,a*l);break;case"ZYZ":r.set(c*g,c*m,a*p,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function on(r,t){switch(t.constructor){case Float32Array:return r;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function Gt(r,t){switch(t.constructor){case Float32Array:return r;case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}var Go=Object.freeze({__proto__:null,DEG2RAD:Oi,RAD2DEG:ms,generateUUID:ln,clamp:ue,euclideanModulo:sa,mapLinear:wc,inverseLerp:Mc,lerp:Ni,damp:Sc,pingpong:Ec,smoothstep:Ac,smootherstep:Tc,randInt:Cc,randFloat:Lc,randFloatSpread:Pc,seededRandom:Rc,degToRad:Ic,radToDeg:Dc,isPowerOfTwo:Pr,ceilPowerOfTwo:zc,floorPowerOfTwo:gs,setQuaternionFromProperEuler:kc,normalize:Gt,denormalize:on}),Dt=class{constructor(t=0,e=0){Dt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),i=Math.sin(e),s=this.x-t.x,o=this.y-t.y;return this.x=s*n-o*i+t.x,this.y=s*i+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},be=class{constructor(){be.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1]}set(t,e,n,i,s,o,a,c,l){let p=this.elements;return p[0]=t,p[1]=i,p[2]=a,p[3]=e,p[4]=s,p[5]=c,p[6]=n,p[7]=o,p[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,s=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],p=n[4],h=n[7],d=n[2],m=n[5],g=n[8],u=i[0],f=i[3],_=i[6],y=i[1],M=i[4],w=i[7],S=i[2],D=i[5],T=i[8];return s[0]=o*u+a*y+c*S,s[3]=o*f+a*M+c*D,s[6]=o*_+a*w+c*T,s[1]=l*u+p*y+h*S,s[4]=l*f+p*M+h*D,s[7]=l*_+p*w+h*T,s[2]=d*u+m*y+g*S,s[5]=d*f+m*M+g*D,s[8]=d*_+m*w+g*T,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],c=t[6],l=t[7],p=t[8];return e*o*p-e*a*l-n*s*p+n*a*c+i*s*l-i*o*c}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],c=t[6],l=t[7],p=t[8],h=p*o-a*l,d=a*c-p*s,m=l*s-o*c,g=e*h+n*d+i*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let u=1/g;return t[0]=h*u,t[1]=(i*l-p*n)*u,t[2]=(a*n-i*o)*u,t[3]=d*u,t[4]=(p*e-i*c)*u,t[5]=(i*s-a*e)*u,t[6]=m*u,t[7]=(n*c-l*e)*u,t[8]=(o*e-n*s)*u,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,s,o,a){let c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-i*l,i*c,-i*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){let n=this.elements;return n[0]*=t,n[3]*=t,n[6]*=t,n[1]*=e,n[4]*=e,n[7]*=e,this}rotate(t){let e=Math.cos(t),n=Math.sin(t),i=this.elements,s=i[0],o=i[3],a=i[6],c=i[1],l=i[4],p=i[7];return i[0]=e*s+n*c,i[3]=e*o+n*l,i[6]=e*a+n*p,i[1]=-n*s+e*c,i[4]=-n*o+e*l,i[7]=-n*a+e*p,this}translate(t,e){let n=this.elements;return n[0]+=t*n[2],n[3]+=t*n[5],n[6]+=t*n[8],n[1]+=e*n[2],n[4]+=e*n[5],n[7]+=e*n[8],this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};function qo(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function _s(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function zn(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function ds(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}var Qs={[rn]:{[In]:zn},[In]:{[rn]:ds}},Oe={legacyMode:!0,get workingColorSpace(){return In},set workingColorSpace(r){console.warn("THREE.ColorManagement: .workingColorSpace is readonly.")},convert:function(r,t,e){if(this.legacyMode||t===e||!t||!e)return r;if(Qs[t]&&Qs[t][e]!==void 0){let n=Qs[t][e];return r.r=n(r.r),r.g=n(r.g),r.b=n(r.b),r}throw new Error("Unsupported color space conversion.")},fromWorkingColorSpace:function(r,t){return this.convert(r,this.workingColorSpace,t)},toWorkingColorSpace:function(r,t){return this.convert(r,t,this.workingColorSpace)}},Xo={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ne={r:0,g:0,b:0},Ne={h:0,s:0,l:0},Gi={h:0,s:0,l:0};function tr(r,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?r+(t-r)*6*e:e<1/2?t:e<2/3?r+(t-r)*6*(2/3-e):r}function qi(r,t){return t.r=r.r,t.g=r.g,t.b=r.b,t}var Xt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,e===void 0&&n===void 0?this.set(t):this.setRGB(t,e,n)}set(t){return t&&t.isColor?this.copy(t):typeof t=="number"?this.setHex(t):typeof t=="string"&&this.setStyle(t),this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=rn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Oe.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=In){return this.r=t,this.g=e,this.b=n,Oe.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=In){if(t=sa(t,1),e=ue(e,0,1),n=ue(n,0,1),e===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+e):n+e-n*e,o=2*n-s;this.r=tr(o,s,t+1/3),this.g=tr(o,s,t),this.b=tr(o,s,t-1/3)}return Oe.toWorkingColorSpace(this,i),this}setStyle(t,e=rn){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^((?:rgb|hsl)a?)\(([^\)]*)\)/.exec(t)){let s,o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return this.r=Math.min(255,parseInt(s[1],10))/255,this.g=Math.min(255,parseInt(s[2],10))/255,this.b=Math.min(255,parseInt(s[3],10))/255,Oe.toWorkingColorSpace(this,e),n(s[4]),this;if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return this.r=Math.min(100,parseInt(s[1],10))/100,this.g=Math.min(100,parseInt(s[2],10))/100,this.b=Math.min(100,parseInt(s[3],10))/100,Oe.toWorkingColorSpace(this,e),n(s[4]),this;break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a)){let c=parseFloat(s[1])/360,l=parseFloat(s[2])/100,p=parseFloat(s[3])/100;return n(s[4]),this.setHSL(c,l,p,e)}break}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){let s=i[1],o=s.length;if(o===3)return this.r=parseInt(s.charAt(0)+s.charAt(0),16)/255,this.g=parseInt(s.charAt(1)+s.charAt(1),16)/255,this.b=parseInt(s.charAt(2)+s.charAt(2),16)/255,Oe.toWorkingColorSpace(this,e),this;if(o===6)return this.r=parseInt(s.charAt(0)+s.charAt(1),16)/255,this.g=parseInt(s.charAt(2)+s.charAt(3),16)/255,this.b=parseInt(s.charAt(4)+s.charAt(5),16)/255,Oe.toWorkingColorSpace(this,e),this}return t&&t.length>0?this.setColorName(t,e):this}setColorName(t,e=rn){let n=Xo[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=zn(t.r),this.g=zn(t.g),this.b=zn(t.b),this}copyLinearToSRGB(t){return this.r=ds(t.r),this.g=ds(t.g),this.b=ds(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=rn){return Oe.fromWorkingColorSpace(qi(this,ne),t),ue(ne.r*255,0,255)<<16^ue(ne.g*255,0,255)<<8^ue(ne.b*255,0,255)<<0}getHexString(t=rn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=In){Oe.fromWorkingColorSpace(qi(this,ne),e);let n=ne.r,i=ne.g,s=ne.b,o=Math.max(n,i,s),a=Math.min(n,i,s),c,l,p=(a+o)/2;if(a===o)c=0,l=0;else{let h=o-a;switch(l=p<=.5?h/(o+a):h/(2-o-a),o){case n:c=(i-s)/h+(i<s?6:0);break;case i:c=(s-n)/h+2;break;case s:c=(n-i)/h+4;break}c/=6}return t.h=c,t.s=l,t.l=p,t}getRGB(t,e=In){return Oe.fromWorkingColorSpace(qi(this,ne),e),t.r=ne.r,t.g=ne.g,t.b=ne.b,t}getStyle(t=rn){return Oe.fromWorkingColorSpace(qi(this,ne),t),t!==rn?`color(${t} ${ne.r} ${ne.g} ${ne.b})`:`rgb(${ne.r*255|0},${ne.g*255|0},${ne.b*255|0})`}offsetHSL(t,e,n){return this.getHSL(Ne),Ne.h+=t,Ne.s+=e,Ne.l+=n,this.setHSL(Ne.h,Ne.s,Ne.l),this}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Ne),t.getHSL(Gi);let n=Ni(Ne.h,Gi.h,e),i=Ni(Ne.s,Gi.s,e),s=Ni(Ne.l,Gi.l,e);return this.setHSL(n,i,s),this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}};Xt.NAMES=Xo;var Yn,xs=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Yn===void 0&&(Yn=_s("canvas")),Yn.width=t.width,Yn.height=t.height;let n=Yn.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Yn}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=_s("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let i=n.getImageData(0,0,t.width,t.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=zn(s[o]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(zn(e[n]/255)*255):e[n]=zn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},vs=class{constructor(t=null){this.isSource=!0,this.uuid=ln(),this.data=t,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(er(i[o].image)):s.push(er(i[o]))}else s=er(i);n.url=s}return e||(t.images[this.uuid]=n),n}};function er(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?xs.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Oc=0,we=class extends Ye{constructor(t=we.DEFAULT_IMAGE,e=we.DEFAULT_MAPPING,n=ye,i=ye,s=Re,o=Rs,a=Ae,c=kn,l=1,p=cn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Oc++}),this.uuid=ln(),this.name="",this.source=new vs(t),this.mipmaps=[],this.mapping=e,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Dt(0,0),this.repeat=new Dt(1,1),this.center=new Dt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new be,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.encoding=p,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.encoding=t.encoding,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.5,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,type:this.type,encoding:this.encoding,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return JSON.stringify(this.userData)!=="{}"&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Wo)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ar:t.x=t.x-Math.floor(t.x);break;case ye:t.x=t.x<0?0:1;break;case Tr:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ar:t.y=t.y-Math.floor(t.y);break;case ye:t.y=t.y<0?0:1;break;case Tr:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}};we.DEFAULT_IMAGE=null;we.DEFAULT_MAPPING=Wo;var Zt=class{constructor(t=0,e=0,n=0,i=1){Zt.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,s=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*s,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,s,c=t.elements,l=c[0],p=c[4],h=c[8],d=c[1],m=c[5],g=c[9],u=c[2],f=c[6],_=c[10];if(Math.abs(p-d)<.01&&Math.abs(h-u)<.01&&Math.abs(g-f)<.01){if(Math.abs(p+d)<.1&&Math.abs(h+u)<.1&&Math.abs(g+f)<.1&&Math.abs(l+m+_-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let M=(l+1)/2,w=(m+1)/2,S=(_+1)/2,D=(p+d)/4,T=(h+u)/4,b=(g+f)/4;return M>w&&M>S?M<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(M),i=D/n,s=T/n):w>S?w<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(w),n=D/i,s=b/i):S<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(S),n=T/s,i=b/s),this.set(n,i,s,e),this}let y=Math.sqrt((f-g)*(f-g)+(h-u)*(h-u)+(d-p)*(d-p));return Math.abs(y)<.001&&(y=1),this.x=(f-g)/y,this.y=(h-u)/y,this.z=(d-p)/y,this.w=Math.acos((l+m+_-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this.w=this.w<0?Math.ceil(this.w):Math.floor(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},We=class extends Ye{constructor(t,e,n={}){super(),this.isWebGLRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Zt(0,0,t,e),this.scissorTest=!1,this.viewport=new Zt(0,0,t,e);let i={width:t,height:e,depth:1};this.texture=new we(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.encoding),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.internalFormat=n.internalFormat!==void 0?n.internalFormat:null,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:Re,this.depthBuffer=n.depthBuffer!==void 0?n.depthBuffer:!0,this.stencilBuffer=n.stencilBuffer!==void 0?n.stencilBuffer:!1,this.depthTexture=n.depthTexture!==void 0?n.depthTexture:null,this.samples=n.samples!==void 0?n.samples:0}setSize(t,e,n=1){(this.width!==t||this.height!==e||this.depth!==n)&&(this.width=t,this.height=e,this.depth=n,this.texture.image.width=t,this.texture.image.height=e,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.viewport.copy(t.viewport),this.texture=t.texture.clone(),this.texture.isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new vs(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},ys=class extends we{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Kt,this.minFilter=Kt,this.wrapR=ye,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Rr=class extends we{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Kt,this.minFilter=Kt,this.wrapR=ye,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var He=class{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,s,o,a){let c=n[i+0],l=n[i+1],p=n[i+2],h=n[i+3],d=s[o+0],m=s[o+1],g=s[o+2],u=s[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=p,t[e+3]=h;return}if(a===1){t[e+0]=d,t[e+1]=m,t[e+2]=g,t[e+3]=u;return}if(h!==u||c!==d||l!==m||p!==g){let f=1-a,_=c*d+l*m+p*g+h*u,y=_>=0?1:-1,M=1-_*_;if(M>Number.EPSILON){let S=Math.sqrt(M),D=Math.atan2(S,_*y);f=Math.sin(f*D)/S,a=Math.sin(a*D)/S}let w=a*y;if(c=c*f+d*w,l=l*f+m*w,p=p*f+g*w,h=h*f+u*w,f===1-a){let S=1/Math.sqrt(c*c+l*l+p*p+h*h);c*=S,l*=S,p*=S,h*=S}}t[e]=c,t[e+1]=l,t[e+2]=p,t[e+3]=h}static multiplyQuaternionsFlat(t,e,n,i,s,o){let a=n[i],c=n[i+1],l=n[i+2],p=n[i+3],h=s[o],d=s[o+1],m=s[o+2],g=s[o+3];return t[e]=a*g+p*h+c*m-l*d,t[e+1]=c*g+p*d+l*h-a*m,t[e+2]=l*g+p*m+a*d-c*h,t[e+3]=p*g-a*h-c*d-l*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e){let n=t._x,i=t._y,s=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),p=a(i/2),h=a(s/2),d=c(n/2),m=c(i/2),g=c(s/2);switch(o){case"XYZ":this._x=d*p*h+l*m*g,this._y=l*m*h-d*p*g,this._z=l*p*g+d*m*h,this._w=l*p*h-d*m*g;break;case"YXZ":this._x=d*p*h+l*m*g,this._y=l*m*h-d*p*g,this._z=l*p*g-d*m*h,this._w=l*p*h+d*m*g;break;case"ZXY":this._x=d*p*h-l*m*g,this._y=l*m*h+d*p*g,this._z=l*p*g+d*m*h,this._w=l*p*h-d*m*g;break;case"ZYX":this._x=d*p*h-l*m*g,this._y=l*m*h+d*p*g,this._z=l*p*g-d*m*h,this._w=l*p*h+d*m*g;break;case"YZX":this._x=d*p*h+l*m*g,this._y=l*m*h+d*p*g,this._z=l*p*g-d*m*h,this._w=l*p*h-d*m*g;break;case"XZY":this._x=d*p*h-l*m*g,this._y=l*m*h-d*p*g,this._z=l*p*g+d*m*h,this._w=l*p*h+d*m*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e!==!1&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],i=e[4],s=e[8],o=e[1],a=e[5],c=e[9],l=e[2],p=e[6],h=e[10],d=n+a+h;if(d>0){let m=.5/Math.sqrt(d+1);this._w=.25/m,this._x=(p-c)*m,this._y=(s-l)*m,this._z=(o-i)*m}else if(n>a&&n>h){let m=2*Math.sqrt(1+n-a-h);this._w=(p-c)/m,this._x=.25*m,this._y=(i+o)/m,this._z=(s+l)/m}else if(a>h){let m=2*Math.sqrt(1+a-n-h);this._w=(s-l)/m,this._x=(i+o)/m,this._y=.25*m,this._z=(c+p)/m}else{let m=2*Math.sqrt(1+h-n-a);this._w=(o-i)/m,this._x=(s+l)/m,this._y=(c+p)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ue(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,i=t._y,s=t._z,o=t._w,a=e._x,c=e._y,l=e._z,p=e._w;return this._x=n*p+o*a+i*l-s*c,this._y=i*p+o*c+s*a-n*l,this._z=s*p+o*l+n*c-i*a,this._w=o*p-n*a-i*c-s*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,i=this._y,s=this._z,o=this._w,a=o*t._w+n*t._x+i*t._y+s*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=i,this._z=s,this;let c=1-a*a;if(c<=Number.EPSILON){let m=1-e;return this._w=m*o+e*this._w,this._x=m*n+e*this._x,this._y=m*i+e*this._y,this._z=m*s+e*this._z,this.normalize(),this._onChangeCallback(),this}let l=Math.sqrt(c),p=Math.atan2(l,a),h=Math.sin((1-e)*p)/l,d=Math.sin(e*p)/l;return this._w=o*h+this._w*d,this._x=n*h+this._x*d,this._y=i*h+this._y*d,this._z=s*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=Math.random(),e=Math.sqrt(1-t),n=Math.sqrt(t),i=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(e*Math.cos(i),n*Math.sin(s),n*Math.cos(s),e*Math.sin(i))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},H=class{constructor(t=0,e=0,n=0){H.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(io.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(io.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*i,this.y=s[1]*e+s[4]*n+s[7]*i,this.z=s[2]*e+s[5]*n+s[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,s=t.elements,o=1/(s[3]*e+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*e+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*e+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,i=this.z,s=t.x,o=t.y,a=t.z,c=t.w,l=c*e+o*i-a*n,p=c*n+a*e-s*i,h=c*i+s*n-o*e,d=-s*e-o*n-a*i;return this.x=l*c+d*-s+p*-a-h*-o,this.y=p*c+d*-o+h*-s-l*-a,this.z=h*c+d*-a+l*-o-p*-s,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*i,this.y=s[1]*e+s[5]*n+s[9]*i,this.z=s[2]*e+s[6]*n+s[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,i=t.y,s=t.z,o=e.x,a=e.y,c=e.z;return this.x=i*c-s*a,this.y=s*o-n*c,this.z=n*a-i*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return nr.copy(this).projectOnVector(t),this.sub(nr)}reflect(t){return this.sub(nr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(ue(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=(Math.random()-.5)*2,e=Math.random()*Math.PI*2,n=Math.sqrt(1-t**2);return this.x=n*Math.cos(e),this.y=n*Math.sin(e),this.z=t,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},nr=new H,io=new He,De=class{constructor(t=new H(1/0,1/0,1/0),e=new H(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){let e=1/0,n=1/0,i=1/0,s=-1/0,o=-1/0,a=-1/0;for(let c=0,l=t.length;c<l;c+=3){let p=t[c],h=t[c+1],d=t[c+2];p<e&&(e=p),h<n&&(n=h),d<i&&(i=d),p>s&&(s=p),h>o&&(o=h),d>a&&(a=d)}return this.min.set(e,n,i),this.max.set(s,o,a),this}setFromBufferAttribute(t){let e=1/0,n=1/0,i=1/0,s=-1/0,o=-1/0,a=-1/0;for(let c=0,l=t.count;c<l;c++){let p=t.getX(c),h=t.getY(c),d=t.getZ(c);p<e&&(e=p),h<n&&(n=h),d<i&&(i=d),p>s&&(s=p),h>o&&(o=h),d>a&&(a=d)}return this.min.set(e,n,i),this.max.set(s,o,a),this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=An.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0)if(e&&n.attributes!=null&&n.attributes.position!==void 0){let s=n.attributes.position;for(let o=0,a=s.count;o<a;o++)An.fromBufferAttribute(s,o).applyMatrix4(t.matrixWorld),this.expandByPoint(An)}else n.boundingBox===null&&n.computeBoundingBox(),ir.copy(n.boundingBox),ir.applyMatrix4(t.matrixWorld),this.union(ir);let i=t.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,An),An.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ri),Xi.subVectors(this.max,Ri),Jn.subVectors(t.a,Ri),jn.subVectors(t.b,Ri),$n.subVectors(t.c,Ri),mn.subVectors(jn,Jn),gn.subVectors($n,jn),Tn.subVectors(Jn,$n);let e=[0,-mn.z,mn.y,0,-gn.z,gn.y,0,-Tn.z,Tn.y,mn.z,0,-mn.x,gn.z,0,-gn.x,Tn.z,0,-Tn.x,-mn.y,mn.x,0,-gn.y,gn.x,0,-Tn.y,Tn.x,0];return!sr(e,Jn,jn,$n,Xi)||(e=[1,0,0,0,1,0,0,0,1],!sr(e,Jn,jn,$n,Xi))?!1:(Zi.crossVectors(mn,gn),e=[Zi.x,Zi.y,Zi.z],sr(e,Jn,jn,$n,Xi))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return An.copy(t).clamp(this.min,this.max).sub(t).length()}getBoundingSphere(t){return this.getCenter(t.center),t.radius=this.getSize(An).length()*.5,t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Qe[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Qe[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Qe[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Qe[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Qe[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Qe[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Qe[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Qe[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Qe),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},Qe=[new H,new H,new H,new H,new H,new H,new H,new H],An=new H,ir=new De,Jn=new H,jn=new H,$n=new H,mn=new H,gn=new H,Tn=new H,Ri=new H,Xi=new H,Zi=new H,Cn=new H;function sr(r,t,e,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){Cn.fromArray(r,s);let a=i.x*Math.abs(Cn.x)+i.y*Math.abs(Cn.y)+i.z*Math.abs(Cn.z),c=t.dot(Cn),l=e.dot(Cn),p=n.dot(Cn);if(Math.max(-Math.max(c,l,p),Math.min(c,l,p))>a)return!1}return!0}var Nc=new De,so=new H,Yi=new H,rr=new H,hn=class{constructor(t=new H,e=-1){this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Nc.setFromPoints(t).getCenter(n);let i=0;for(let s=0,o=t.length;s<o;s++)i=Math.max(i,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;rr.subVectors(t,this.center);let e=rr.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.add(rr.multiplyScalar(i/n)),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?Yi.set(0,0,1).multiplyScalar(t.radius):Yi.subVectors(t.center,this.center).normalize().multiplyScalar(t.radius),this.expandByPoint(so.copy(t.center).add(Yi)),this.expandByPoint(so.copy(t.center).sub(Yi)),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},tn=new H,ar=new H,Ji=new H,_n=new H,or=new H,ji=new H,lr=new H,Ir=class{constructor(t=new H,e=new H(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.direction).multiplyScalar(t).add(this.origin)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,tn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.direction).multiplyScalar(n).add(this.origin)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=tn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(tn.copy(this.direction).multiplyScalar(e).add(this.origin),tn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){ar.copy(t).add(e).multiplyScalar(.5),Ji.copy(e).sub(t).normalize(),_n.copy(this.origin).sub(ar);let s=t.distanceTo(e)*.5,o=-this.direction.dot(Ji),a=_n.dot(this.direction),c=-_n.dot(Ji),l=_n.lengthSq(),p=Math.abs(1-o*o),h,d,m,g;if(p>0)if(h=o*c-a,d=o*a-c,g=s*p,h>=0)if(d>=-g)if(d<=g){let u=1/p;h*=u,d*=u,m=h*(h+o*d+2*a)+d*(o*h+d+2*c)+l}else d=s,h=Math.max(0,-(o*d+a)),m=-h*h+d*(d+2*c)+l;else d=-s,h=Math.max(0,-(o*d+a)),m=-h*h+d*(d+2*c)+l;else d<=-g?(h=Math.max(0,-(-o*s+a)),d=h>0?-s:Math.min(Math.max(-s,-c),s),m=-h*h+d*(d+2*c)+l):d<=g?(h=0,d=Math.min(Math.max(-s,-c),s),m=d*(d+2*c)+l):(h=Math.max(0,-(o*s+a)),d=h>0?s:Math.min(Math.max(-s,-c),s),m=-h*h+d*(d+2*c)+l);else d=o>0?-s:s,h=Math.max(0,-(o*d+a)),m=-h*h+d*(d+2*c)+l;return n&&n.copy(this.direction).multiplyScalar(h).add(this.origin),i&&i.copy(Ji).multiplyScalar(d).add(ar),m}intersectSphere(t,e){tn.subVectors(t.center,this.origin);let n=tn.dot(this.direction),i=tn.dot(tn)-n*n,s=t.radius*t.radius;if(i>s)return null;let o=Math.sqrt(s-i),a=n-o,c=n+o;return a<0&&c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,s,o,a,c,l=1/this.direction.x,p=1/this.direction.y,h=1/this.direction.z,d=this.origin;return l>=0?(n=(t.min.x-d.x)*l,i=(t.max.x-d.x)*l):(n=(t.max.x-d.x)*l,i=(t.min.x-d.x)*l),p>=0?(s=(t.min.y-d.y)*p,o=(t.max.y-d.y)*p):(s=(t.max.y-d.y)*p,o=(t.min.y-d.y)*p),n>o||s>i||((s>n||n!==n)&&(n=s),(o<i||i!==i)&&(i=o),h>=0?(a=(t.min.z-d.z)*h,c=(t.max.z-d.z)*h):(a=(t.max.z-d.z)*h,c=(t.min.z-d.z)*h),n>c||a>i)||((a>n||n!==n)&&(n=a),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,tn)!==null}intersectTriangle(t,e,n,i,s){or.subVectors(e,t),ji.subVectors(n,t),lr.crossVectors(or,ji);let o=this.direction.dot(lr),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;_n.subVectors(this.origin,t);let c=a*this.direction.dot(ji.crossVectors(_n,ji));if(c<0)return null;let l=a*this.direction.dot(or.cross(_n));if(l<0||c+l>o)return null;let p=-a*_n.dot(lr);return p<0?null:this.at(p/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Qt=class{constructor(){Qt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}set(t,e,n,i,s,o,a,c,l,p,h,d,m,g,u,f){let _=this.elements;return _[0]=t,_[4]=e,_[8]=n,_[12]=i,_[1]=s,_[5]=o,_[9]=a,_[13]=c,_[2]=l,_[6]=p,_[10]=h,_[14]=d,_[3]=m,_[7]=g,_[11]=u,_[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Qt().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,i=1/Kn.setFromMatrixColumn(t,0).length(),s=1/Kn.setFromMatrixColumn(t,1).length(),o=1/Kn.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,i=t.y,s=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(i),l=Math.sin(i),p=Math.cos(s),h=Math.sin(s);if(t.order==="XYZ"){let d=o*p,m=o*h,g=a*p,u=a*h;e[0]=c*p,e[4]=-c*h,e[8]=l,e[1]=m+g*l,e[5]=d-u*l,e[9]=-a*c,e[2]=u-d*l,e[6]=g+m*l,e[10]=o*c}else if(t.order==="YXZ"){let d=c*p,m=c*h,g=l*p,u=l*h;e[0]=d+u*a,e[4]=g*a-m,e[8]=o*l,e[1]=o*h,e[5]=o*p,e[9]=-a,e[2]=m*a-g,e[6]=u+d*a,e[10]=o*c}else if(t.order==="ZXY"){let d=c*p,m=c*h,g=l*p,u=l*h;e[0]=d-u*a,e[4]=-o*h,e[8]=g+m*a,e[1]=m+g*a,e[5]=o*p,e[9]=u-d*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){let d=o*p,m=o*h,g=a*p,u=a*h;e[0]=c*p,e[4]=g*l-m,e[8]=d*l+u,e[1]=c*h,e[5]=u*l+d,e[9]=m*l-g,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){let d=o*c,m=o*l,g=a*c,u=a*l;e[0]=c*p,e[4]=u-d*h,e[8]=g*h+m,e[1]=h,e[5]=o*p,e[9]=-a*p,e[2]=-l*p,e[6]=m*h+g,e[10]=d-u*h}else if(t.order==="XZY"){let d=o*c,m=o*l,g=a*c,u=a*l;e[0]=c*p,e[4]=-h,e[8]=l*p,e[1]=d*h+u,e[5]=o*p,e[9]=m*h-g,e[2]=g*h-m,e[6]=a*p,e[10]=u*h+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Fc,t,Uc)}lookAt(t,e,n){let i=this.elements;return Se.subVectors(t,e),Se.lengthSq()===0&&(Se.z=1),Se.normalize(),xn.crossVectors(n,Se),xn.lengthSq()===0&&(Math.abs(n.z)===1?Se.x+=1e-4:Se.z+=1e-4,Se.normalize(),xn.crossVectors(n,Se)),xn.normalize(),$i.crossVectors(Se,xn),i[0]=xn.x,i[4]=$i.x,i[8]=Se.x,i[1]=xn.y,i[5]=$i.y,i[9]=Se.y,i[2]=xn.z,i[6]=$i.z,i[10]=Se.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,s=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],p=n[1],h=n[5],d=n[9],m=n[13],g=n[2],u=n[6],f=n[10],_=n[14],y=n[3],M=n[7],w=n[11],S=n[15],D=i[0],T=i[4],b=i[8],L=i[12],E=i[1],N=i[5],v=i[9],O=i[13],B=i[2],F=i[6],$=i[10],q=i[14],j=i[3],P=i[7],R=i[11],it=i[15];return s[0]=o*D+a*E+c*B+l*j,s[4]=o*T+a*N+c*F+l*P,s[8]=o*b+a*v+c*$+l*R,s[12]=o*L+a*O+c*q+l*it,s[1]=p*D+h*E+d*B+m*j,s[5]=p*T+h*N+d*F+m*P,s[9]=p*b+h*v+d*$+m*R,s[13]=p*L+h*O+d*q+m*it,s[2]=g*D+u*E+f*B+_*j,s[6]=g*T+u*N+f*F+_*P,s[10]=g*b+u*v+f*$+_*R,s[14]=g*L+u*O+f*q+_*it,s[3]=y*D+M*E+w*B+S*j,s[7]=y*T+M*N+w*F+S*P,s[11]=y*b+M*v+w*$+S*R,s[15]=y*L+M*O+w*q+S*it,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],i=t[8],s=t[12],o=t[1],a=t[5],c=t[9],l=t[13],p=t[2],h=t[6],d=t[10],m=t[14],g=t[3],u=t[7],f=t[11],_=t[15];return g*(+s*c*h-i*l*h-s*a*d+n*l*d+i*a*m-n*c*m)+u*(+e*c*m-e*l*d+s*o*d-i*o*m+i*l*p-s*c*p)+f*(+e*l*h-e*a*m-s*o*h+n*o*m+s*a*p-n*l*p)+_*(-i*a*p-e*c*h+e*a*d+i*o*h-n*o*d+n*c*p)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],c=t[6],l=t[7],p=t[8],h=t[9],d=t[10],m=t[11],g=t[12],u=t[13],f=t[14],_=t[15],y=h*f*l-u*d*l+u*c*m-a*f*m-h*c*_+a*d*_,M=g*d*l-p*f*l-g*c*m+o*f*m+p*c*_-o*d*_,w=p*u*l-g*h*l+g*a*m-o*u*m-p*a*_+o*h*_,S=g*h*c-p*u*c-g*a*d+o*u*d+p*a*f-o*h*f,D=e*y+n*M+i*w+s*S;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let T=1/D;return t[0]=y*T,t[1]=(u*d*s-h*f*s-u*i*m+n*f*m+h*i*_-n*d*_)*T,t[2]=(a*f*s-u*c*s+u*i*l-n*f*l-a*i*_+n*c*_)*T,t[3]=(h*c*s-a*d*s-h*i*l+n*d*l+a*i*m-n*c*m)*T,t[4]=M*T,t[5]=(p*f*s-g*d*s+g*i*m-e*f*m-p*i*_+e*d*_)*T,t[6]=(g*c*s-o*f*s-g*i*l+e*f*l+o*i*_-e*c*_)*T,t[7]=(o*d*s-p*c*s+p*i*l-e*d*l-o*i*m+e*c*m)*T,t[8]=w*T,t[9]=(g*h*s-p*u*s-g*n*m+e*u*m+p*n*_-e*h*_)*T,t[10]=(o*u*s-g*a*s+g*n*l-e*u*l-o*n*_+e*a*_)*T,t[11]=(p*a*s-o*h*s-p*n*l+e*h*l+o*n*m-e*a*m)*T,t[12]=S*T,t[13]=(p*u*i-g*h*i+g*n*d-e*u*d-p*n*f+e*h*f)*T,t[14]=(g*a*i-o*u*i-g*n*c+e*u*c+o*n*f-e*a*f)*T,t[15]=(o*h*i-p*a*i+p*n*c-e*h*c-o*n*d+e*a*d)*T,this}scale(t){let e=this.elements,n=t.x,i=t.y,s=t.z;return e[0]*=n,e[4]*=i,e[8]*=s,e[1]*=n,e[5]*=i,e[9]*=s,e[2]*=n,e[6]*=i,e[10]*=s,e[3]*=n,e[7]*=i,e[11]*=s,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),i=Math.sin(e),s=1-n,o=t.x,a=t.y,c=t.z,l=s*o,p=s*a;return this.set(l*o+n,l*a-i*c,l*c+i*a,0,l*a+i*c,p*a+n,p*c-i*o,0,l*c-i*a,p*c+i*o,s*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,s,o){return this.set(1,n,s,0,t,1,o,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){let i=this.elements,s=e._x,o=e._y,a=e._z,c=e._w,l=s+s,p=o+o,h=a+a,d=s*l,m=s*p,g=s*h,u=o*p,f=o*h,_=a*h,y=c*l,M=c*p,w=c*h,S=n.x,D=n.y,T=n.z;return i[0]=(1-(u+_))*S,i[1]=(m+w)*S,i[2]=(g-M)*S,i[3]=0,i[4]=(m-w)*D,i[5]=(1-(d+_))*D,i[6]=(f+y)*D,i[7]=0,i[8]=(g+M)*T,i[9]=(f-y)*T,i[10]=(1-(d+u))*T,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){let i=this.elements,s=Kn.set(i[0],i[1],i[2]).length(),o=Kn.set(i[4],i[5],i[6]).length(),a=Kn.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),t.x=i[12],t.y=i[13],t.z=i[14],Fe.copy(this);let l=1/s,p=1/o,h=1/a;return Fe.elements[0]*=l,Fe.elements[1]*=l,Fe.elements[2]*=l,Fe.elements[4]*=p,Fe.elements[5]*=p,Fe.elements[6]*=p,Fe.elements[8]*=h,Fe.elements[9]*=h,Fe.elements[10]*=h,e.setFromRotationMatrix(Fe),n.x=s,n.y=o,n.z=a,this}makePerspective(t,e,n,i,s,o){let a=this.elements,c=2*s/(e-t),l=2*s/(n-i),p=(e+t)/(e-t),h=(n+i)/(n-i),d=-(o+s)/(o-s),m=-2*o*s/(o-s);return a[0]=c,a[4]=0,a[8]=p,a[12]=0,a[1]=0,a[5]=l,a[9]=h,a[13]=0,a[2]=0,a[6]=0,a[10]=d,a[14]=m,a[3]=0,a[7]=0,a[11]=-1,a[15]=0,this}makeOrthographic(t,e,n,i,s,o){let a=this.elements,c=1/(e-t),l=1/(n-i),p=1/(o-s),h=(e+t)*c,d=(n+i)*l,m=(o+s)*p;return a[0]=2*c,a[4]=0,a[8]=0,a[12]=-h,a[1]=0,a[5]=2*l,a[9]=0,a[13]=-d,a[2]=0,a[6]=0,a[10]=-2*p,a[14]=-m,a[3]=0,a[7]=0,a[11]=0,a[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},Kn=new H,Fe=new Qt,Fc=new H(0,0,0),Uc=new H(1,1,1),xn=new H,$i=new H,Se=new H,ro=new Qt,ao=new He,On=class{constructor(t=0,e=0,n=0,i=On.DefaultOrder){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let i=t.elements,s=i[0],o=i[4],a=i[8],c=i[1],l=i[5],p=i[9],h=i[2],d=i[6],m=i[10];switch(e){case"XYZ":this._y=Math.asin(ue(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-p,m),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ue(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(a,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(ue(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,m),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-ue(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,m),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(ue(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-p,l),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(a,m));break;case"XZY":this._z=Math.asin(-ue(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-p,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return ro.makeRotationFromQuaternion(t),this.setFromRotationMatrix(ro,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return ao.setFromEuler(this),this.setFromQuaternion(ao,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}toVector3(){console.error("THREE.Euler: .toVector3() has been removed. Use Vector3.setFromEuler() instead")}};On.DefaultOrder="XYZ";On.RotationOrders=["XYZ","YZX","ZXY","XZY","YXZ","ZYX"];var bs=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Bc=0,oo=new H,Qn=new He,en=new Qt,Ki=new H,Ii=new H,Vc=new H,Wc=new He,lo=new H(1,0,0),co=new H(0,1,0),ho=new H(0,0,1),Hc={type:"added"},uo={type:"removed"},xe=class extends Ye{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Bc++}),this.uuid=ln(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=xe.DefaultUp.clone();let t=new H,e=new On,n=new He,i=new H(1,1,1);function s(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Qt},normalMatrix:{value:new be}}),this.matrix=new Qt,this.matrixWorld=new Qt,this.matrixAutoUpdate=xe.DefaultMatrixAutoUpdate,this.matrixWorldNeedsUpdate=!1,this.matrixWorldAutoUpdate=xe.DefaultMatrixWorldAutoUpdate,this.layers=new bs,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Qn.setFromAxisAngle(t,e),this.quaternion.multiply(Qn),this}rotateOnWorldAxis(t,e){return Qn.setFromAxisAngle(t,e),this.quaternion.premultiply(Qn),this}rotateX(t){return this.rotateOnAxis(lo,t)}rotateY(t){return this.rotateOnAxis(co,t)}rotateZ(t){return this.rotateOnAxis(ho,t)}translateOnAxis(t,e){return oo.copy(t).applyQuaternion(this.quaternion),this.position.add(oo.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(lo,t)}translateY(t){return this.translateOnAxis(co,t)}translateZ(t){return this.translateOnAxis(ho,t)}localToWorld(t){return t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return t.applyMatrix4(en.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Ki.copy(t):Ki.set(t,e,n);let i=this.parent;this.updateWorldMatrix(!0,!1),Ii.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?en.lookAt(Ii,Ki,this.up):en.lookAt(Ki,Ii,this.up),this.quaternion.setFromRotationMatrix(en),i&&(en.extractRotation(i.matrixWorld),Qn.setFromRotationMatrix(en),this.quaternion.premultiply(Qn.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.parent!==null&&t.parent.remove(t),t.parent=this,this.children.push(t),t.dispatchEvent(Hc)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(uo)),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){for(let t=0;t<this.children.length;t++){let e=this.children[t];e.parent=null,e.dispatchEvent(uo)}return this.children.length=0,this}attach(t){return this.updateWorldMatrix(!0,!1),en.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),en.multiply(t.parent.matrixWorld)),t.applyMatrix4(en),this.add(t),t.updateWorldMatrix(!1,!0),this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ii,t,Vc),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ii,Wc,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,i=e.length;n<i;n++){let s=e[n];(s.matrixWorldAutoUpdate===!0||t===!0)&&s.updateMatrixWorld(t)}}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){let i=this.children;for(let s=0,o=i.length;s<o;s++){let a=i[s];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.5,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),JSON.stringify(this.userData)!=="{}"&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON()));function s(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,p=c.length;l<p;l++){let h=c[l];s(t.shapes,h)}else s(t.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(s(t.materials,this.material[c]));i.material=a}else i.material=s(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];i.animations.push(s(t.animations,c))}}if(e){let a=o(t.geometries),c=o(t.materials),l=o(t.textures),p=o(t.images),h=o(t.shapes),d=o(t.skeletons),m=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),p.length>0&&(n.images=p),h.length>0&&(n.shapes=h),d.length>0&&(n.skeletons=d),m.length>0&&(n.animations=m),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){let c=[];for(let l in a){let p=a[l];delete p.metadata,c.push(p)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let i=t.children[n];this.add(i.clone())}return this}};xe.DefaultUp=new H(0,1,0);xe.DefaultMatrixAutoUpdate=!0;xe.DefaultMatrixWorldAutoUpdate=!0;var Ue=new H,nn=new H,cr=new H,sn=new H,ti=new H,ei=new H,fo=new H,hr=new H,ur=new H,dr=new H,Be=class{constructor(t=new H,e=new H,n=new H){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),Ue.subVectors(t,e),i.cross(Ue);let s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(t,e,n,i,s){Ue.subVectors(i,e),nn.subVectors(n,e),cr.subVectors(t,e);let o=Ue.dot(Ue),a=Ue.dot(nn),c=Ue.dot(cr),l=nn.dot(nn),p=nn.dot(cr),h=o*l-a*a;if(h===0)return s.set(-2,-1,-1);let d=1/h,m=(l*c-a*p)*d,g=(o*p-a*c)*d;return s.set(1-m-g,g,m)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,sn),sn.x>=0&&sn.y>=0&&sn.x+sn.y<=1}static getUV(t,e,n,i,s,o,a,c){return this.getBarycoord(t,e,n,i,sn),c.set(0,0),c.addScaledVector(s,sn.x),c.addScaledVector(o,sn.y),c.addScaledVector(a,sn.z),c}static isFrontFacing(t,e,n,i){return Ue.subVectors(n,e),nn.subVectors(t,e),Ue.cross(nn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Ue.subVectors(this.c,this.b),nn.subVectors(this.a,this.b),Ue.cross(nn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Be.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Be.getBarycoord(t,this.a,this.b,this.c,e)}getUV(t,e,n,i,s){return Be.getUV(t,this.a,this.b,this.c,e,n,i,s)}containsPoint(t){return Be.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Be.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,i=this.b,s=this.c,o,a;ti.subVectors(i,n),ei.subVectors(s,n),hr.subVectors(t,n);let c=ti.dot(hr),l=ei.dot(hr);if(c<=0&&l<=0)return e.copy(n);ur.subVectors(t,i);let p=ti.dot(ur),h=ei.dot(ur);if(p>=0&&h<=p)return e.copy(i);let d=c*h-p*l;if(d<=0&&c>=0&&p<=0)return o=c/(c-p),e.copy(n).addScaledVector(ti,o);dr.subVectors(t,s);let m=ti.dot(dr),g=ei.dot(dr);if(g>=0&&m<=g)return e.copy(s);let u=m*l-c*g;if(u<=0&&l>=0&&g<=0)return a=l/(l-g),e.copy(n).addScaledVector(ei,a);let f=p*g-m*h;if(f<=0&&h-p>=0&&m-g>=0)return fo.subVectors(s,i),a=(h-p)/(h-p+(m-g)),e.copy(i).addScaledVector(fo,a);let _=1/(f+u+d);return o=u*_,a=d*_,e.copy(n).addScaledVector(ti,o).addScaledVector(ei,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Gc=0,xi=class extends Ye{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Gc++}),this.uuid=ln(),this.name="",this.type="Material",this.blending=ui,this.side=pi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.blendSrc=Uo,this.blendDst=Bo,this.blendEquation=li,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.depthFunc=Mr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=bc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ks,this.stencilZFail=Ks,this.stencilZPass=Ks,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn("THREE.Material: '"+e+"' parameter is undefined.");continue}let i=this[e];if(i===void 0){console.warn("THREE."+this.type+": '"+e+"' is not a property of this material.");continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.5,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ui&&(n.blending=this.blending),this.side!==pi&&(n.side=this.side),this.vertexColors&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=this.transparent),n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.stencilWrite=this.stencilWrite,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaToCoverage===!0&&(n.alphaToCoverage=this.alphaToCoverage),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=this.premultipliedAlpha),this.wireframe===!0&&(n.wireframe=this.wireframe),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=this.flatShading),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),JSON.stringify(this.userData)!=="{}"&&(n.userData=this.userData);function i(s){let o=[];for(let a in s){let c=s[a];delete c.metadata,o.push(c)}return o}if(e){let s=i(t.textures),o=i(t.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let i=e.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},vi=class extends xi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Xt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Vo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},ee=new H,Qi=new Dt,Te=class{constructor(t,e,n){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n===!0,this.usage=Cr,this.updateRange={offset:0,count:-1},this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Qi.fromBufferAttribute(this,e),Qi.applyMatrix3(t),this.setXY(e,Qi.x,Qi.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ee.fromBufferAttribute(this,e),ee.applyMatrix3(t),this.setXYZ(e,ee.x,ee.y,ee.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ee.fromBufferAttribute(this,e),ee.applyMatrix4(t),this.setXYZ(e,ee.x,ee.y,ee.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ee.fromBufferAttribute(this,e),ee.applyNormalMatrix(t),this.setXYZ(e,ee.x,ee.y,ee.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ee.fromBufferAttribute(this,e),ee.transformDirection(t),this.setXYZ(e,ee.x,ee.y,ee.z);return this}set(t,e=0){return this.array.set(t,e),this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=on(e,this.array)),e}setX(t,e){return this.normalized&&(e=Gt(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=on(e,this.array)),e}setY(t,e){return this.normalized&&(e=Gt(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=on(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Gt(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=on(e,this.array)),e}setW(t,e){return this.normalized&&(e=Gt(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Gt(e,this.array),n=Gt(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=Gt(e,this.array),n=Gt(n,this.array),i=Gt(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t*=this.itemSize,this.normalized&&(e=Gt(e,this.array),n=Gt(n,this.array),i=Gt(i,this.array),s=Gt(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Cr&&(t.usage=this.usage),(this.updateRange.offset!==0||this.updateRange.count!==-1)&&(t.updateRange=this.updateRange),t}copyColorsArray(){console.error("THREE.BufferAttribute: copyColorsArray() was removed in r144.")}copyVector2sArray(){console.error("THREE.BufferAttribute: copyVector2sArray() was removed in r144.")}copyVector3sArray(){console.error("THREE.BufferAttribute: copyVector3sArray() was removed in r144.")}copyVector4sArray(){console.error("THREE.BufferAttribute: copyVector4sArray() was removed in r144.")}};var ws=class extends Te{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var Ms=class extends Te{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var de=class extends Te{constructor(t,e,n){super(new Float32Array(t),e,n)}};var qc=0,Pe=new Qt,fr=new xe,ni=new H,Ee=new De,Di=new De,re=new H,ze=class extends Ye{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:qc++}),this.uuid=ln(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(qo(t)?Ms:ws)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new be().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Pe.makeRotationFromQuaternion(t),this.applyMatrix4(Pe),this}rotateX(t){return Pe.makeRotationX(t),this.applyMatrix4(Pe),this}rotateY(t){return Pe.makeRotationY(t),this.applyMatrix4(Pe),this}rotateZ(t){return Pe.makeRotationZ(t),this.applyMatrix4(Pe),this}translate(t,e,n){return Pe.makeTranslation(t,e,n),this.applyMatrix4(Pe),this}scale(t,e,n){return Pe.makeScale(t,e,n),this.applyMatrix4(Pe),this}lookAt(t){return fr.lookAt(t),fr.updateMatrix(),this.applyMatrix4(fr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ni).negate(),this.translate(ni.x,ni.y,ni.z),this}setFromPoints(t){let e=[];for(let n=0,i=t.length;n<i;n++){let s=t[n];e.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new de(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new De);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new H(-1/0,-1/0,-1/0),new H(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){let s=e[n];Ee.setFromBufferAttribute(s),this.morphTargetsRelative?(re.addVectors(this.boundingBox.min,Ee.min),this.boundingBox.expandByPoint(re),re.addVectors(this.boundingBox.max,Ee.max),this.boundingBox.expandByPoint(re)):(this.boundingBox.expandByPoint(Ee.min),this.boundingBox.expandByPoint(Ee.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new hn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new H,1/0);return}if(t){let n=this.boundingSphere.center;if(Ee.setFromBufferAttribute(t),e)for(let s=0,o=e.length;s<o;s++){let a=e[s];Di.setFromBufferAttribute(a),this.morphTargetsRelative?(re.addVectors(Ee.min,Di.min),Ee.expandByPoint(re),re.addVectors(Ee.max,Di.max),Ee.expandByPoint(re)):(Ee.expandByPoint(Di.min),Ee.expandByPoint(Di.max))}Ee.getCenter(n);let i=0;for(let s=0,o=t.count;s<o;s++)re.fromBufferAttribute(t,s),i=Math.max(i,n.distanceToSquared(re));if(e)for(let s=0,o=e.length;s<o;s++){let a=e[s],c=this.morphTargetsRelative;for(let l=0,p=a.count;l<p;l++)re.fromBufferAttribute(a,l),c&&(ni.fromBufferAttribute(t,l),re.add(ni)),i=Math.max(i,n.distanceToSquared(re))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.array,i=e.position.array,s=e.normal.array,o=e.uv.array,a=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Te(new Float32Array(4*a),4));let c=this.getAttribute("tangent").array,l=[],p=[];for(let E=0;E<a;E++)l[E]=new H,p[E]=new H;let h=new H,d=new H,m=new H,g=new Dt,u=new Dt,f=new Dt,_=new H,y=new H;function M(E,N,v){h.fromArray(i,E*3),d.fromArray(i,N*3),m.fromArray(i,v*3),g.fromArray(o,E*2),u.fromArray(o,N*2),f.fromArray(o,v*2),d.sub(h),m.sub(h),u.sub(g),f.sub(g);let O=1/(u.x*f.y-f.x*u.y);!isFinite(O)||(_.copy(d).multiplyScalar(f.y).addScaledVector(m,-u.y).multiplyScalar(O),y.copy(m).multiplyScalar(u.x).addScaledVector(d,-f.x).multiplyScalar(O),l[E].add(_),l[N].add(_),l[v].add(_),p[E].add(y),p[N].add(y),p[v].add(y))}let w=this.groups;w.length===0&&(w=[{start:0,count:n.length}]);for(let E=0,N=w.length;E<N;++E){let v=w[E],O=v.start,B=v.count;for(let F=O,$=O+B;F<$;F+=3)M(n[F+0],n[F+1],n[F+2])}let S=new H,D=new H,T=new H,b=new H;function L(E){T.fromArray(s,E*3),b.copy(T);let N=l[E];S.copy(N),S.sub(T.multiplyScalar(T.dot(N))).normalize(),D.crossVectors(b,N);let O=D.dot(p[E])<0?-1:1;c[E*4]=S.x,c[E*4+1]=S.y,c[E*4+2]=S.z,c[E*4+3]=O}for(let E=0,N=w.length;E<N;++E){let v=w[E],O=v.start,B=v.count;for(let F=O,$=O+B;F<$;F+=3)L(n[F+0]),L(n[F+1]),L(n[F+2])}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Te(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,m=n.count;d<m;d++)n.setXYZ(d,0,0,0);let i=new H,s=new H,o=new H,a=new H,c=new H,l=new H,p=new H,h=new H;if(t)for(let d=0,m=t.count;d<m;d+=3){let g=t.getX(d+0),u=t.getX(d+1),f=t.getX(d+2);i.fromBufferAttribute(e,g),s.fromBufferAttribute(e,u),o.fromBufferAttribute(e,f),p.subVectors(o,s),h.subVectors(i,s),p.cross(h),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,u),l.fromBufferAttribute(n,f),a.add(p),c.add(p),l.add(p),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(u,c.x,c.y,c.z),n.setXYZ(f,l.x,l.y,l.z)}else for(let d=0,m=e.count;d<m;d+=3)i.fromBufferAttribute(e,d+0),s.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),p.subVectors(o,s),h.subVectors(i,s),p.cross(h),n.setXYZ(d+0,p.x,p.y,p.z),n.setXYZ(d+1,p.x,p.y,p.z),n.setXYZ(d+2,p.x,p.y,p.z);this.normalizeNormals(),n.needsUpdate=!0}}merge(){return console.error("THREE.BufferGeometry.merge() has been removed. Use THREE.BufferGeometryUtils.mergeBufferGeometries() instead."),this}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)re.fromBufferAttribute(t,e),re.normalize(),t.setXYZ(e,re.x,re.y,re.z)}toNonIndexed(){function t(a,c){let l=a.array,p=a.itemSize,h=a.normalized,d=new l.constructor(c.length*p),m=0,g=0;for(let u=0,f=c.length;u<f;u++){a.isInterleavedBufferAttribute?m=c[u]*a.data.stride+a.offset:m=c[u]*p;for(let _=0;_<p;_++)d[g++]=l[m++]}return new Te(d,p,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new ze,n=this.index.array,i=this.attributes;for(let a in i){let c=i[a],l=t(c,n);e.setAttribute(a,l)}let s=this.morphAttributes;for(let a in s){let c=[],l=s[a];for(let p=0,h=l.length;p<h;p++){let d=l[p],m=t(d,n);c.push(m)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){let t={metadata:{version:4.5,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let c in n){let l=n[c];t.data.attributes[c]=l.toJSON(t.data)}let i={},s=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],p=[];for(let h=0,d=l.length;h<d;h++){let m=l[h];p.push(m.toJSON(t.data))}p.length>0&&(i[c]=p,s=!0)}s&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone(e));let i=t.attributes;for(let l in i){let p=i[l];this.setAttribute(l,p.clone(e))}let s=t.morphAttributes;for(let l in s){let p=[],h=s[l];for(let d=0,m=h.length;d<m;d++)p.push(h[d].clone(e));this.morphAttributes[l]=p}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let l=0,p=o.length;l<p;l++){let h=o[l];this.addGroup(h.start,h.count,h.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,t.parameters!==void 0&&(this.parameters=Object.assign({},t.parameters)),this}dispose(){this.dispatchEvent({type:"dispose"})}},po=new Qt,ii=new Ir,pr=new hn,vn=new H,yn=new H,bn=new H,mr=new H,gr=new H,_r=new H,ts=new H,es=new H,ns=new H,is=new Dt,ss=new Dt,rs=new Dt,xr=new H,as=new H,ae=class extends xe{constructor(t=new ze,e=new vi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){let a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}raycast(t,e){let n=this.geometry,i=this.material,s=this.matrixWorld;if(i===void 0||(n.boundingSphere===null&&n.computeBoundingSphere(),pr.copy(n.boundingSphere),pr.applyMatrix4(s),t.ray.intersectsSphere(pr)===!1)||(po.copy(s).invert(),ii.copy(t.ray).applyMatrix4(po),n.boundingBox!==null&&ii.intersectsBox(n.boundingBox)===!1))return;let o,a=n.index,c=n.attributes.position,l=n.morphAttributes.position,p=n.morphTargetsRelative,h=n.attributes.uv,d=n.attributes.uv2,m=n.groups,g=n.drawRange;if(a!==null)if(Array.isArray(i))for(let u=0,f=m.length;u<f;u++){let _=m[u],y=i[_.materialIndex],M=Math.max(_.start,g.start),w=Math.min(a.count,Math.min(_.start+_.count,g.start+g.count));for(let S=M,D=w;S<D;S+=3){let T=a.getX(S),b=a.getX(S+1),L=a.getX(S+2);o=os(this,y,t,ii,c,l,p,h,d,T,b,L),o&&(o.faceIndex=Math.floor(S/3),o.face.materialIndex=_.materialIndex,e.push(o))}}else{let u=Math.max(0,g.start),f=Math.min(a.count,g.start+g.count);for(let _=u,y=f;_<y;_+=3){let M=a.getX(_),w=a.getX(_+1),S=a.getX(_+2);o=os(this,i,t,ii,c,l,p,h,d,M,w,S),o&&(o.faceIndex=Math.floor(_/3),e.push(o))}}else if(c!==void 0)if(Array.isArray(i))for(let u=0,f=m.length;u<f;u++){let _=m[u],y=i[_.materialIndex],M=Math.max(_.start,g.start),w=Math.min(c.count,Math.min(_.start+_.count,g.start+g.count));for(let S=M,D=w;S<D;S+=3){let T=S,b=S+1,L=S+2;o=os(this,y,t,ii,c,l,p,h,d,T,b,L),o&&(o.faceIndex=Math.floor(S/3),o.face.materialIndex=_.materialIndex,e.push(o))}}else{let u=Math.max(0,g.start),f=Math.min(c.count,g.start+g.count);for(let _=u,y=f;_<y;_+=3){let M=_,w=_+1,S=_+2;o=os(this,i,t,ii,c,l,p,h,d,M,w,S),o&&(o.faceIndex=Math.floor(_/3),e.push(o))}}}};function Xc(r,t,e,n,i,s,o,a){let c;if(t.side===Ie?c=n.intersectTriangle(o,s,i,!0,a):c=n.intersectTriangle(i,s,o,t.side!==Xe,a),c===null)return null;as.copy(a),as.applyMatrix4(r.matrixWorld);let l=e.ray.origin.distanceTo(as);return l<e.near||l>e.far?null:{distance:l,point:as.clone(),object:r}}function os(r,t,e,n,i,s,o,a,c,l,p,h){vn.fromBufferAttribute(i,l),yn.fromBufferAttribute(i,p),bn.fromBufferAttribute(i,h);let d=r.morphTargetInfluences;if(s&&d){ts.set(0,0,0),es.set(0,0,0),ns.set(0,0,0);for(let g=0,u=s.length;g<u;g++){let f=d[g],_=s[g];f!==0&&(mr.fromBufferAttribute(_,l),gr.fromBufferAttribute(_,p),_r.fromBufferAttribute(_,h),o?(ts.addScaledVector(mr,f),es.addScaledVector(gr,f),ns.addScaledVector(_r,f)):(ts.addScaledVector(mr.sub(vn),f),es.addScaledVector(gr.sub(yn),f),ns.addScaledVector(_r.sub(bn),f)))}vn.add(ts),yn.add(es),bn.add(ns)}r.isSkinnedMesh&&(r.boneTransform(l,vn),r.boneTransform(p,yn),r.boneTransform(h,bn));let m=Xc(r,t,e,n,vn,yn,bn,xr);if(m){a&&(is.fromBufferAttribute(a,l),ss.fromBufferAttribute(a,p),rs.fromBufferAttribute(a,h),m.uv=Be.getUV(xr,vn,yn,bn,is,ss,rs,new Dt)),c&&(is.fromBufferAttribute(c,l),ss.fromBufferAttribute(c,p),rs.fromBufferAttribute(c,h),m.uv2=Be.getUV(xr,vn,yn,bn,is,ss,rs,new Dt));let g={a:l,b:p,c:h,normal:new H,materialIndex:0};Be.getNormal(vn,yn,bn,g.normal),m.face=g}return m}var un=class extends ze{constructor(t=1,e=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};let a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);let c=[],l=[],p=[],h=[],d=0,m=0;g("z","y","x",-1,-1,n,e,t,o,s,0),g("z","y","x",1,-1,n,e,-t,o,s,1),g("x","z","y",1,1,t,n,e,i,o,2),g("x","z","y",1,-1,t,n,-e,i,o,3),g("x","y","z",1,-1,t,e,n,i,s,4),g("x","y","z",-1,-1,t,e,-n,i,s,5),this.setIndex(c),this.setAttribute("position",new de(l,3)),this.setAttribute("normal",new de(p,3)),this.setAttribute("uv",new de(h,2));function g(u,f,_,y,M,w,S,D,T,b,L){let E=w/T,N=S/b,v=w/2,O=S/2,B=D/2,F=T+1,$=b+1,q=0,j=0,P=new H;for(let R=0;R<$;R++){let it=R*N-O;for(let Y=0;Y<F;Y++){let Q=Y*E-v;P[u]=Q*y,P[f]=it*M,P[_]=B,l.push(P.x,P.y,P.z),P[u]=0,P[f]=0,P[_]=D>0?1:-1,p.push(P.x,P.y,P.z),h.push(Y/T),h.push(1-R/b),q+=1}}for(let R=0;R<b;R++)for(let it=0;it<T;it++){let Y=d+it+F*R,Q=d+it+F*(R+1),ft=d+(it+1)+F*(R+1),Et=d+(it+1)+F*R;c.push(Y,Q,Et),c.push(Q,ft,Et),j+=6}a.addGroup(m,j,L),m+=j,d+=q}}static fromJSON(t){return new un(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function yi(r){let t={};for(let e in r){t[e]={};for(let n in r[e]){let i=r[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function he(r){let t={};for(let e=0;e<r.length;e++){let n=yi(r[e]);for(let i in n)t[i]=n[i]}return t}function Zc(r){let t=[];for(let e=0;e<r.length;e++)t.push(r[e].clone());return t}var Is={clone:yi,merge:he},Yc=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Jc=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,ve=class extends xi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Yc,this.fragmentShader=Jc,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv2:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=yi(t.uniforms),this.uniformsGroups=Zc(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let i in this.uniforms){let o=this.uniforms[i].value;o&&o.isTexture?e.uniforms[i]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[i]={type:"m4",value:o.toArray()}:e.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},bi=class extends xe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Qt,this.projectionMatrix=new Qt,this.projectionMatrixInverse=new Qt}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(-e[8],-e[9],-e[10]).normalize()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},ge=class extends bi{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=ms*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Oi*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ms*2*Math.atan(Math.tan(Oi*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(t,e,n,i,s,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Oi*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,s=-.5*i,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;s+=o.offsetX*i/c,e-=o.offsetY*n/l,i*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(s+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,e,e-n,t,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},si=90,ri=1,Dr=class extends xe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n;let i=new ge(si,ri,t,e);i.layers=this.layers,i.up.set(0,-1,0),i.lookAt(new H(1,0,0)),this.add(i);let s=new ge(si,ri,t,e);s.layers=this.layers,s.up.set(0,-1,0),s.lookAt(new H(-1,0,0)),this.add(s);let o=new ge(si,ri,t,e);o.layers=this.layers,o.up.set(0,0,1),o.lookAt(new H(0,1,0)),this.add(o);let a=new ge(si,ri,t,e);a.layers=this.layers,a.up.set(0,0,-1),a.lookAt(new H(0,-1,0)),this.add(a);let c=new ge(si,ri,t,e);c.layers=this.layers,c.up.set(0,-1,0),c.lookAt(new H(0,0,1)),this.add(c);let l=new ge(si,ri,t,e);l.layers=this.layers,l.up.set(0,-1,0),l.lookAt(new H(0,0,-1)),this.add(l)}update(t,e){this.parent===null&&this.updateMatrixWorld();let n=this.renderTarget,[i,s,o,a,c,l]=this.children,p=t.getRenderTarget(),h=t.toneMapping,d=t.xr.enabled;t.toneMapping=Ve,t.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0),t.render(e,i),t.setRenderTarget(n,1),t.render(e,s),t.setRenderTarget(n,2),t.render(e,o),t.setRenderTarget(n,3),t.render(e,a),t.setRenderTarget(n,4),t.render(e,c),n.texture.generateMipmaps=m,t.setRenderTarget(n,5),t.render(e,l),t.setRenderTarget(p),t.toneMapping=h,t.xr.enabled=d,n.texture.needsPMREMUpdate=!0}},Ss=class extends we{constructor(t,e,n,i,s,o,a,c,l,p){t=t!==void 0?t:[],e=e!==void 0?e:mi,super(t,e,n,i,s,o,a,c,l,p),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},zr=class extends We{constructor(t,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new Ss(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.encoding),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Re}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.encoding=e.encoding,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new un(5,5,5),s=new ve({name:"CubemapFromEquirect",uniforms:yi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ie,blending:Mn});s.uniforms.tEquirect.value=e;let o=new ae(i,s),a=e.minFilter;return e.minFilter===Rs&&(e.minFilter=Re),new Dr(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,i){let s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,i);t.setRenderTarget(s)}},vr=new H,jc=new H,$c=new be,an=class{constructor(t=new H(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let i=vr.subVectors(n,e).cross(jc.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(this.normal).multiplyScalar(-this.distanceToPoint(t)).add(t)}intersectLine(t,e){let n=t.delta(vr),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let s=-(t.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:e.copy(n).multiplyScalar(s).add(t.start)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||$c.getNormalMatrix(t),i=this.coplanarPoint(vr).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},ai=new hn,ls=new H,Es=class{constructor(t=new an,e=new an,n=new an,i=new an,s=new an,o=new an){this.planes=[t,e,n,i,s,o]}set(t,e,n,i,s,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t){let e=this.planes,n=t.elements,i=n[0],s=n[1],o=n[2],a=n[3],c=n[4],l=n[5],p=n[6],h=n[7],d=n[8],m=n[9],g=n[10],u=n[11],f=n[12],_=n[13],y=n[14],M=n[15];return e[0].setComponents(a-i,h-c,u-d,M-f).normalize(),e[1].setComponents(a+i,h+c,u+d,M+f).normalize(),e[2].setComponents(a+s,h+l,u+m,M+_).normalize(),e[3].setComponents(a-s,h-l,u-m,M-_).normalize(),e[4].setComponents(a-o,h-p,u-g,M-y).normalize(),e[5].setComponents(a+o,h+p,u+g,M+y).normalize(),this}intersectsObject(t){let e=t.geometry;return e.boundingSphere===null&&e.computeBoundingSphere(),ai.copy(e.boundingSphere).applyMatrix4(t.matrixWorld),this.intersectsSphere(ai)}intersectsSprite(t){return ai.center.set(0,0,0),ai.radius=.7071067811865476,ai.applyMatrix4(t.matrixWorld),this.intersectsSphere(ai)}intersectsSphere(t){let e=this.planes,n=t.center,i=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let i=e[n];if(ls.x=i.normal.x>0?t.max.x:t.min.x,ls.y=i.normal.y>0?t.max.y:t.min.y,ls.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(ls)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function Zo(){let r=null,t=!1,e=null,n=null;function i(s,o){e(s,o),n=r.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=r.requestAnimationFrame(i),t=!0)},stop:function(){r.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){r=s}}}function Kc(r,t){let e=t.isWebGL2,n=new WeakMap;function i(l,p){let h=l.array,d=l.usage,m=r.createBuffer();r.bindBuffer(p,m),r.bufferData(p,h,d),l.onUploadCallback();let g;if(h instanceof Float32Array)g=5126;else if(h instanceof Uint16Array)if(l.isFloat16BufferAttribute)if(e)g=5131;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else g=5123;else if(h instanceof Int16Array)g=5122;else if(h instanceof Uint32Array)g=5125;else if(h instanceof Int32Array)g=5124;else if(h instanceof Int8Array)g=5120;else if(h instanceof Uint8Array)g=5121;else if(h instanceof Uint8ClampedArray)g=5121;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:m,type:g,bytesPerElement:h.BYTES_PER_ELEMENT,version:l.version}}function s(l,p,h){let d=p.array,m=p.updateRange;r.bindBuffer(h,l),m.count===-1?r.bufferSubData(h,0,d):(e?r.bufferSubData(h,m.offset*d.BYTES_PER_ELEMENT,d,m.offset,m.count):r.bufferSubData(h,m.offset*d.BYTES_PER_ELEMENT,d.subarray(m.offset,m.offset+m.count)),m.count=-1)}function o(l){return l.isInterleavedBufferAttribute&&(l=l.data),n.get(l)}function a(l){l.isInterleavedBufferAttribute&&(l=l.data);let p=n.get(l);p&&(r.deleteBuffer(p.buffer),n.delete(l))}function c(l,p){if(l.isGLBufferAttribute){let d=n.get(l);(!d||d.version<l.version)&&n.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);let h=n.get(l);h===void 0?n.set(l,i(l,p)):h.version<l.version&&(s(h.buffer,l,p),h.version=l.version)}return{get:o,remove:a,update:c}}var Nn=class extends ze{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};let s=t/2,o=e/2,a=Math.floor(n),c=Math.floor(i),l=a+1,p=c+1,h=t/a,d=e/c,m=[],g=[],u=[],f=[];for(let _=0;_<p;_++){let y=_*d-o;for(let M=0;M<l;M++){let w=M*h-s;g.push(w,-y,0),u.push(0,0,1),f.push(M/a),f.push(1-_/c)}}for(let _=0;_<c;_++)for(let y=0;y<a;y++){let M=y+l*_,w=y+l*(_+1),S=y+1+l*(_+1),D=y+1+l*_;m.push(M,w,D),m.push(w,S,D)}this.setIndex(m),this.setAttribute("position",new de(g,3)),this.setAttribute("normal",new de(u,3)),this.setAttribute("uv",new de(f,2))}static fromJSON(t){return new Nn(t.width,t.height,t.widthSegments,t.heightSegments)}},Qc=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vUv ).g;
#endif`,th=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,eh=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,nh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ih=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,sh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,rh="vec3 transformed = vec3( position );",ah=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,oh=`vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
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
#endif`,lh=`#ifdef USE_IRIDESCENCE
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
#endif`,ch=`#ifdef USE_BUMPMAP
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
#endif`,hh=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,uh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,dh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,fh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ph=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,mh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,gh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,_h=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,xh=`#define PI 3.141592653589793
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
}`,vh=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,yh=`vec3 transformedNormal = objectNormal;
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
#endif`,bh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,wh=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vUv ).x * displacementScale + displacementBias );
#endif`,Mh=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Sh=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Eh="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ah=`vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Th=`#ifdef USE_ENVMAP
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
#endif`,Ch=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Lh=`#ifdef USE_ENVMAP
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
#endif`,Ph=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Rh=`#ifdef USE_ENVMAP
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
#endif`,Ih=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Dh=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,zh=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,kh=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Oh=`#ifdef USE_GRADIENTMAP
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
}`,Nh=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vUv2 );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Fh=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Uh=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Bh=`varying vec3 vViewPosition;
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
#define Material_LightProbeLOD( material )	(0)`,Vh=`uniform bool receiveShadow;
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
#endif`,Wh=`#if defined( USE_ENVMAP )
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
#endif`,Hh=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Gh=`varying vec3 vViewPosition;
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
#define Material_LightProbeLOD( material )	(0)`,qh=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Xh=`varying vec3 vViewPosition;
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
#define Material_LightProbeLOD( material )	(0)`,Zh=`PhysicalMaterial material;
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
#endif`,Yh=`struct PhysicalMaterial {
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
}`,Jh=`
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
#endif`,jh=`#if defined( RE_IndirectDiffuse )
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
#endif`,$h=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );
#endif`,Kh=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Qh=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,tu=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,eu=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,nu=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,iu=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,su=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,ru=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	uniform mat3 uvTransform;
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,au=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ou=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,lu=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,cu=`#ifdef USE_MORPHNORMALS
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
#endif`,hu=`#ifdef USE_MORPHTARGETS
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
#endif`,uu=`#ifdef USE_MORPHTARGETS
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
#endif`,du=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 geometryNormal = normal;`,fu=`#ifdef OBJECTSPACE_NORMALMAP
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
#endif`,pu=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,mu=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,gu=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,_u=`#ifdef USE_NORMALMAP
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
#endif`,xu=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = geometryNormal;
#endif`,vu=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	#ifdef USE_TANGENT
		clearcoatNormal = normalize( vTBN * clearcoatMapN );
	#else
		clearcoatNormal = perturbNormal2Arb( - vViewPosition, clearcoatNormal, clearcoatMapN, faceDirection );
	#endif
#endif`,yu=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif`,bu=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,wu=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha + 0.1;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Mu=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Su=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Eu=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Au=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Tu=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Cu=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Lu=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Pu=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Ru=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Iu=`#if defined( USE_SHADOWMAP ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Du=`float getShadowMask() {
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
}`,zu=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ku=`#ifdef USE_SKINNING
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
#endif`,Ou=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Nu=`#ifdef USE_SKINNING
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
#endif`,Fu=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Uu=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Bu=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Vu=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Wu=`#ifdef USE_TRANSMISSION
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
#endif`,Hu=`#ifdef USE_TRANSMISSION
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
#endif`,Gu=`#if ( defined( USE_UV ) && ! defined( UVS_VERTEX_ONLY ) )
	varying vec2 vUv;
#endif`,qu=`#ifdef USE_UV
	#ifdef UVS_VERTEX_ONLY
		vec2 vUv;
	#else
		varying vec2 vUv;
	#endif
	uniform mat3 uvTransform;
#endif`,Xu=`#ifdef USE_UV
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
#endif`,Zu=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	varying vec2 vUv2;
#endif`,Yu=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	attribute vec2 uv2;
	varying vec2 vUv2;
	uniform mat3 uv2Transform;
#endif`,Ju=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	vUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;
#endif`,ju=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,$u=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ku=`uniform sampler2D t2D;
varying vec2 vUv;
void main() {
	gl_FragColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		gl_FragColor = vec4( mix( pow( gl_FragColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), gl_FragColor.rgb * 0.0773993808, vec3( lessThanEqual( gl_FragColor.rgb, vec3( 0.04045 ) ) ) ), gl_FragColor.w );
	#endif
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,Qu=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,td=`#include <envmap_common_pars_fragment>
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
}`,ed=`#include <common>
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
}`,nd=`#if DEPTH_PACKING == 3200
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
}`,id=`#define DISTANCE
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
}`,sd=`#define DISTANCE
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
}`,rd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ad=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,od=`uniform float scale;
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
}`,ld=`uniform vec3 diffuse;
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
}`,cd=`#include <common>
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
}`,hd=`uniform vec3 diffuse;
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
}`,ud=`#define LAMBERT
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
}`,dd=`#define LAMBERT
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
}`,fd=`#define MATCAP
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
}`,pd=`#define MATCAP
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
}`,md=`#define NORMAL
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
}`,gd=`#define NORMAL
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
}`,_d=`#define PHONG
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
}`,xd=`#define PHONG
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
}`,vd=`#define STANDARD
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
}`,yd=`#define STANDARD
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
}`,bd=`#define TOON
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
}`,wd=`#define TOON
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
}`,Md=`uniform float size;
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
}`,Sd=`uniform vec3 diffuse;
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
}`,Ed=`#include <common>
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
}`,Ad=`uniform vec3 color;
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
}`,Td=`uniform float rotation;
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
}`,Cd=`uniform vec3 diffuse;
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
}`,Ot={alphamap_fragment:Qc,alphamap_pars_fragment:th,alphatest_fragment:eh,alphatest_pars_fragment:nh,aomap_fragment:ih,aomap_pars_fragment:sh,begin_vertex:rh,beginnormal_vertex:ah,bsdfs:oh,iridescence_fragment:lh,bumpmap_pars_fragment:ch,clipping_planes_fragment:hh,clipping_planes_pars_fragment:uh,clipping_planes_pars_vertex:dh,clipping_planes_vertex:fh,color_fragment:ph,color_pars_fragment:mh,color_pars_vertex:gh,color_vertex:_h,common:xh,cube_uv_reflection_fragment:vh,defaultnormal_vertex:yh,displacementmap_pars_vertex:bh,displacementmap_vertex:wh,emissivemap_fragment:Mh,emissivemap_pars_fragment:Sh,encodings_fragment:Eh,encodings_pars_fragment:Ah,envmap_fragment:Th,envmap_common_pars_fragment:Ch,envmap_pars_fragment:Lh,envmap_pars_vertex:Ph,envmap_physical_pars_fragment:Wh,envmap_vertex:Rh,fog_vertex:Ih,fog_pars_vertex:Dh,fog_fragment:zh,fog_pars_fragment:kh,gradientmap_pars_fragment:Oh,lightmap_fragment:Nh,lightmap_pars_fragment:Fh,lights_lambert_fragment:Uh,lights_lambert_pars_fragment:Bh,lights_pars_begin:Vh,lights_toon_fragment:Hh,lights_toon_pars_fragment:Gh,lights_phong_fragment:qh,lights_phong_pars_fragment:Xh,lights_physical_fragment:Zh,lights_physical_pars_fragment:Yh,lights_fragment_begin:Jh,lights_fragment_maps:jh,lights_fragment_end:$h,logdepthbuf_fragment:Kh,logdepthbuf_pars_fragment:Qh,logdepthbuf_pars_vertex:tu,logdepthbuf_vertex:eu,map_fragment:nu,map_pars_fragment:iu,map_particle_fragment:su,map_particle_pars_fragment:ru,metalnessmap_fragment:au,metalnessmap_pars_fragment:ou,morphcolor_vertex:lu,morphnormal_vertex:cu,morphtarget_pars_vertex:hu,morphtarget_vertex:uu,normal_fragment_begin:du,normal_fragment_maps:fu,normal_pars_fragment:pu,normal_pars_vertex:mu,normal_vertex:gu,normalmap_pars_fragment:_u,clearcoat_normal_fragment_begin:xu,clearcoat_normal_fragment_maps:vu,clearcoat_pars_fragment:yu,iridescence_pars_fragment:bu,output_fragment:wu,packing:Mu,premultiplied_alpha_fragment:Su,project_vertex:Eu,dithering_fragment:Au,dithering_pars_fragment:Tu,roughnessmap_fragment:Cu,roughnessmap_pars_fragment:Lu,shadowmap_pars_fragment:Pu,shadowmap_pars_vertex:Ru,shadowmap_vertex:Iu,shadowmask_pars_fragment:Du,skinbase_vertex:zu,skinning_pars_vertex:ku,skinning_vertex:Ou,skinnormal_vertex:Nu,specularmap_fragment:Fu,specularmap_pars_fragment:Uu,tonemapping_fragment:Bu,tonemapping_pars_fragment:Vu,transmission_fragment:Wu,transmission_pars_fragment:Hu,uv_pars_fragment:Gu,uv_pars_vertex:qu,uv_vertex:Xu,uv2_pars_fragment:Zu,uv2_pars_vertex:Yu,uv2_vertex:Ju,worldpos_vertex:ju,background_vert:$u,background_frag:Ku,cube_vert:Qu,cube_frag:td,depth_vert:ed,depth_frag:nd,distanceRGBA_vert:id,distanceRGBA_frag:sd,equirect_vert:rd,equirect_frag:ad,linedashed_vert:od,linedashed_frag:ld,meshbasic_vert:cd,meshbasic_frag:hd,meshlambert_vert:ud,meshlambert_frag:dd,meshmatcap_vert:fd,meshmatcap_frag:pd,meshnormal_vert:md,meshnormal_frag:gd,meshphong_vert:_d,meshphong_frag:xd,meshphysical_vert:vd,meshphysical_frag:yd,meshtoon_vert:bd,meshtoon_frag:wd,points_vert:Md,points_frag:Sd,shadow_vert:Ed,shadow_frag:Ad,sprite_vert:Td,sprite_frag:Cd},mt={common:{diffuse:{value:new Xt(16777215)},opacity:{value:1},map:{value:null},uvTransform:{value:new be},uv2Transform:{value:new be},alphaMap:{value:null},alphaTest:{value:0}},specularmap:{specularMap:{value:null}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1}},emissivemap:{emissiveMap:{value:null}},bumpmap:{bumpMap:{value:null},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalScale:{value:new Dt(1,1)}},displacementmap:{displacementMap:{value:null},displacementScale:{value:1},displacementBias:{value:0}},roughnessmap:{roughnessMap:{value:null}},metalnessmap:{metalnessMap:{value:null}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Xt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Xt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaTest:{value:0},uvTransform:{value:new be}},sprite:{diffuse:{value:new Xt(16777215)},opacity:{value:1},center:{value:new Dt(.5,.5)},rotation:{value:0},map:{value:null},alphaMap:{value:null},alphaTest:{value:0},uvTransform:{value:new be}}},_e={basic:{uniforms:he([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.fog]),vertexShader:Ot.meshbasic_vert,fragmentShader:Ot.meshbasic_frag},lambert:{uniforms:he([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,mt.lights,{emissive:{value:new Xt(0)}}]),vertexShader:Ot.meshlambert_vert,fragmentShader:Ot.meshlambert_frag},phong:{uniforms:he([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,mt.lights,{emissive:{value:new Xt(0)},specular:{value:new Xt(1118481)},shininess:{value:30}}]),vertexShader:Ot.meshphong_vert,fragmentShader:Ot.meshphong_frag},standard:{uniforms:he([mt.common,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.roughnessmap,mt.metalnessmap,mt.fog,mt.lights,{emissive:{value:new Xt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ot.meshphysical_vert,fragmentShader:Ot.meshphysical_frag},toon:{uniforms:he([mt.common,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.gradientmap,mt.fog,mt.lights,{emissive:{value:new Xt(0)}}]),vertexShader:Ot.meshtoon_vert,fragmentShader:Ot.meshtoon_frag},matcap:{uniforms:he([mt.common,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,{matcap:{value:null}}]),vertexShader:Ot.meshmatcap_vert,fragmentShader:Ot.meshmatcap_frag},points:{uniforms:he([mt.points,mt.fog]),vertexShader:Ot.points_vert,fragmentShader:Ot.points_frag},dashed:{uniforms:he([mt.common,mt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ot.linedashed_vert,fragmentShader:Ot.linedashed_frag},depth:{uniforms:he([mt.common,mt.displacementmap]),vertexShader:Ot.depth_vert,fragmentShader:Ot.depth_frag},normal:{uniforms:he([mt.common,mt.bumpmap,mt.normalmap,mt.displacementmap,{opacity:{value:1}}]),vertexShader:Ot.meshnormal_vert,fragmentShader:Ot.meshnormal_frag},sprite:{uniforms:he([mt.sprite,mt.fog]),vertexShader:Ot.sprite_vert,fragmentShader:Ot.sprite_frag},background:{uniforms:{uvTransform:{value:new be},t2D:{value:null}},vertexShader:Ot.background_vert,fragmentShader:Ot.background_frag},cube:{uniforms:he([mt.envmap,{opacity:{value:1}}]),vertexShader:Ot.cube_vert,fragmentShader:Ot.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ot.equirect_vert,fragmentShader:Ot.equirect_frag},distanceRGBA:{uniforms:he([mt.common,mt.displacementmap,{referencePosition:{value:new H},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ot.distanceRGBA_vert,fragmentShader:Ot.distanceRGBA_frag},shadow:{uniforms:he([mt.lights,mt.fog,{color:{value:new Xt(0)},opacity:{value:1}}]),vertexShader:Ot.shadow_vert,fragmentShader:Ot.shadow_frag}};_e.physical={uniforms:he([_e.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatNormalScale:{value:new Dt(1,1)},clearcoatNormalMap:{value:null},iridescence:{value:0},iridescenceMap:{value:null},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},sheen:{value:0},sheenColor:{value:new Xt(0)},sheenColorMap:{value:null},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},transmission:{value:0},transmissionMap:{value:null},transmissionSamplerSize:{value:new Dt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},attenuationDistance:{value:0},attenuationColor:{value:new Xt(0)},specularIntensity:{value:1},specularIntensityMap:{value:null},specularColor:{value:new Xt(1,1,1)},specularColorMap:{value:null}}]),vertexShader:Ot.meshphysical_vert,fragmentShader:Ot.meshphysical_frag};function Ld(r,t,e,n,i,s){let o=new Xt(0),a=i===!0?0:1,c,l,p=null,h=0,d=null;function m(u,f){let _=!1,y=f.isScene===!0?f.background:null;y&&y.isTexture&&(y=t.get(y));let M=r.xr,w=M.getSession&&M.getSession();w&&w.environmentBlendMode==="additive"&&(y=null),y===null?g(o,a):y&&y.isColor&&(g(y,1),_=!0),(r.autoClear||_)&&r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil),y&&(y.isCubeTexture||y.mapping===Ps)?(l===void 0&&(l=new ae(new un(1,1,1),new ve({name:"BackgroundCubeMaterial",uniforms:yi(_e.cube.uniforms),vertexShader:_e.cube.vertexShader,fragmentShader:_e.cube.fragmentShader,side:Ie,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(S,D,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=y,l.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,(p!==y||h!==y.version||d!==r.toneMapping)&&(l.material.needsUpdate=!0,p=y,h=y.version,d=r.toneMapping),l.layers.enableAll(),u.unshift(l,l.geometry,l.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new ae(new Nn(2,2),new ve({name:"BackgroundMaterial",uniforms:yi(_e.background.uniforms),vertexShader:_e.background.vertexShader,fragmentShader:_e.background.fragmentShader,side:pi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=y,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(p!==y||h!==y.version||d!==r.toneMapping)&&(c.material.needsUpdate=!0,p=y,h=y.version,d=r.toneMapping),c.layers.enableAll(),u.unshift(c,c.geometry,c.material,0,0,null))}function g(u,f){e.buffers.color.setClear(u.r,u.g,u.b,f,s)}return{getClearColor:function(){return o},setClearColor:function(u,f=1){o.set(u),a=f,g(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(u){a=u,g(o,a)},render:m}}function Pd(r,t,e,n){let i=r.getParameter(34921),s=n.isWebGL2?null:t.get("OES_vertex_array_object"),o=n.isWebGL2||s!==null,a={},c=f(null),l=c,p=!1;function h(B,F,$,q,j){let P=!1;if(o){let R=u(q,$,F);l!==R&&(l=R,m(l.object)),P=_(B,q,$,j),P&&y(B,q,$,j)}else{let R=F.wireframe===!0;(l.geometry!==q.id||l.program!==$.id||l.wireframe!==R)&&(l.geometry=q.id,l.program=$.id,l.wireframe=R,P=!0)}j!==null&&e.update(j,34963),(P||p)&&(p=!1,b(B,F,$,q),j!==null&&r.bindBuffer(34963,e.get(j).buffer))}function d(){return n.isWebGL2?r.createVertexArray():s.createVertexArrayOES()}function m(B){return n.isWebGL2?r.bindVertexArray(B):s.bindVertexArrayOES(B)}function g(B){return n.isWebGL2?r.deleteVertexArray(B):s.deleteVertexArrayOES(B)}function u(B,F,$){let q=$.wireframe===!0,j=a[B.id];j===void 0&&(j={},a[B.id]=j);let P=j[F.id];P===void 0&&(P={},j[F.id]=P);let R=P[q];return R===void 0&&(R=f(d()),P[q]=R),R}function f(B){let F=[],$=[],q=[];for(let j=0;j<i;j++)F[j]=0,$[j]=0,q[j]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:$,attributeDivisors:q,object:B,attributes:{},index:null}}function _(B,F,$,q){let j=l.attributes,P=F.attributes,R=0,it=$.getAttributes();for(let Y in it)if(it[Y].location>=0){let ft=j[Y],Et=P[Y];if(Et===void 0&&(Y==="instanceMatrix"&&B.instanceMatrix&&(Et=B.instanceMatrix),Y==="instanceColor"&&B.instanceColor&&(Et=B.instanceColor)),ft===void 0||ft.attribute!==Et||Et&&ft.data!==Et.data)return!0;R++}return l.attributesNum!==R||l.index!==q}function y(B,F,$,q){let j={},P=F.attributes,R=0,it=$.getAttributes();for(let Y in it)if(it[Y].location>=0){let ft=P[Y];ft===void 0&&(Y==="instanceMatrix"&&B.instanceMatrix&&(ft=B.instanceMatrix),Y==="instanceColor"&&B.instanceColor&&(ft=B.instanceColor));let Et={};Et.attribute=ft,ft&&ft.data&&(Et.data=ft.data),j[Y]=Et,R++}l.attributes=j,l.attributesNum=R,l.index=q}function M(){let B=l.newAttributes;for(let F=0,$=B.length;F<$;F++)B[F]=0}function w(B){S(B,0)}function S(B,F){let $=l.newAttributes,q=l.enabledAttributes,j=l.attributeDivisors;$[B]=1,q[B]===0&&(r.enableVertexAttribArray(B),q[B]=1),j[B]!==F&&((n.isWebGL2?r:t.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](B,F),j[B]=F)}function D(){let B=l.newAttributes,F=l.enabledAttributes;for(let $=0,q=F.length;$<q;$++)F[$]!==B[$]&&(r.disableVertexAttribArray($),F[$]=0)}function T(B,F,$,q,j,P){n.isWebGL2===!0&&($===5124||$===5125)?r.vertexAttribIPointer(B,F,$,j,P):r.vertexAttribPointer(B,F,$,q,j,P)}function b(B,F,$,q){if(n.isWebGL2===!1&&(B.isInstancedMesh||q.isInstancedBufferGeometry)&&t.get("ANGLE_instanced_arrays")===null)return;M();let j=q.attributes,P=$.getAttributes(),R=F.defaultAttributeValues;for(let it in P){let Y=P[it];if(Y.location>=0){let Q=j[it];if(Q===void 0&&(it==="instanceMatrix"&&B.instanceMatrix&&(Q=B.instanceMatrix),it==="instanceColor"&&B.instanceColor&&(Q=B.instanceColor)),Q!==void 0){let ft=Q.normalized,Et=Q.itemSize,nt=e.get(Q);if(nt===void 0)continue;let At=nt.buffer,Mt=nt.type,bt=nt.bytesPerElement;if(Q.isInterleavedBufferAttribute){let xt=Q.data,zt=xt.stride,x=Q.offset;if(xt.isInstancedInterleavedBuffer){for(let X=0;X<Y.locationSize;X++)S(Y.location+X,xt.meshPerAttribute);B.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=xt.meshPerAttribute*xt.count)}else for(let X=0;X<Y.locationSize;X++)w(Y.location+X);r.bindBuffer(34962,At);for(let X=0;X<Y.locationSize;X++)T(Y.location+X,Et/Y.locationSize,Mt,ft,zt*bt,(x+Et/Y.locationSize*X)*bt)}else{if(Q.isInstancedBufferAttribute){for(let xt=0;xt<Y.locationSize;xt++)S(Y.location+xt,Q.meshPerAttribute);B.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let xt=0;xt<Y.locationSize;xt++)w(Y.location+xt);r.bindBuffer(34962,At);for(let xt=0;xt<Y.locationSize;xt++)T(Y.location+xt,Et/Y.locationSize,Mt,ft,Et*bt,Et/Y.locationSize*xt*bt)}}else if(R!==void 0){let ft=R[it];if(ft!==void 0)switch(ft.length){case 2:r.vertexAttrib2fv(Y.location,ft);break;case 3:r.vertexAttrib3fv(Y.location,ft);break;case 4:r.vertexAttrib4fv(Y.location,ft);break;default:r.vertexAttrib1fv(Y.location,ft)}}}}D()}function L(){v();for(let B in a){let F=a[B];for(let $ in F){let q=F[$];for(let j in q)g(q[j].object),delete q[j];delete F[$]}delete a[B]}}function E(B){if(a[B.id]===void 0)return;let F=a[B.id];for(let $ in F){let q=F[$];for(let j in q)g(q[j].object),delete q[j];delete F[$]}delete a[B.id]}function N(B){for(let F in a){let $=a[F];if($[B.id]===void 0)continue;let q=$[B.id];for(let j in q)g(q[j].object),delete q[j];delete $[B.id]}}function v(){O(),p=!0,l!==c&&(l=c,m(l.object))}function O(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:h,reset:v,resetDefaultState:O,dispose:L,releaseStatesOfGeometry:E,releaseStatesOfProgram:N,initAttributes:M,enableAttribute:w,disableUnusedAttributes:D}}function Rd(r,t,e,n){let i=n.isWebGL2,s;function o(l){s=l}function a(l,p){r.drawArrays(s,l,p),e.update(p,s,1)}function c(l,p,h){if(h===0)return;let d,m;if(i)d=r,m="drawArraysInstanced";else if(d=t.get("ANGLE_instanced_arrays"),m="drawArraysInstancedANGLE",d===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}d[m](s,l,p,h),e.update(p,s,h)}this.setMode=o,this.render=a,this.renderInstances=c}function Id(r,t,e){let n;function i(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){let T=t.get("EXT_texture_filter_anisotropic");n=r.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function s(T){if(T==="highp"){if(r.getShaderPrecisionFormat(35633,36338).precision>0&&r.getShaderPrecisionFormat(35632,36338).precision>0)return"highp";T="mediump"}return T==="mediump"&&r.getShaderPrecisionFormat(35633,36337).precision>0&&r.getShaderPrecisionFormat(35632,36337).precision>0?"mediump":"lowp"}let o=typeof WebGL2RenderingContext<"u"&&r instanceof WebGL2RenderingContext||typeof WebGL2ComputeRenderingContext<"u"&&r instanceof WebGL2ComputeRenderingContext,a=e.precision!==void 0?e.precision:"highp",c=s(a);c!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",c,"instead."),a=c);let l=o||t.has("WEBGL_draw_buffers"),p=e.logarithmicDepthBuffer===!0,h=r.getParameter(34930),d=r.getParameter(35660),m=r.getParameter(3379),g=r.getParameter(34076),u=r.getParameter(34921),f=r.getParameter(36347),_=r.getParameter(36348),y=r.getParameter(36349),M=d>0,w=o||t.has("OES_texture_float"),S=M&&w,D=o?r.getParameter(36183):0;return{isWebGL2:o,drawBuffers:l,getMaxAnisotropy:i,getMaxPrecision:s,precision:a,logarithmicDepthBuffer:p,maxTextures:h,maxVertexTextures:d,maxTextureSize:m,maxCubemapSize:g,maxAttributes:u,maxVertexUniforms:f,maxVaryings:_,maxFragmentUniforms:y,vertexTextures:M,floatFragmentTextures:w,floatVertexTextures:S,maxSamples:D}}function Dd(r){let t=this,e=null,n=0,i=!1,s=!1,o=new an,a=new be,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d,m){let g=h.length!==0||d||n!==0||i;return i=d,e=p(h,m,0),n=h.length,g},this.beginShadows=function(){s=!0,p(null)},this.endShadows=function(){s=!1,l()},this.setState=function(h,d,m){let g=h.clippingPlanes,u=h.clipIntersection,f=h.clipShadows,_=r.get(h);if(!i||g===null||g.length===0||s&&!f)s?p(null):l();else{let y=s?0:n,M=y*4,w=_.clippingState||null;c.value=w,w=p(g,d,M,m);for(let S=0;S!==M;++S)w[S]=e[S];_.clippingState=w,this.numIntersection=u?this.numPlanes:0,this.numPlanes+=y}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function p(h,d,m,g){let u=h!==null?h.length:0,f=null;if(u!==0){if(f=c.value,g!==!0||f===null){let _=m+u*4,y=d.matrixWorldInverse;a.getNormalMatrix(y),(f===null||f.length<_)&&(f=new Float32Array(_));for(let M=0,w=m;M!==u;++M,w+=4)o.copy(h[M]).applyMatrix4(y,a),o.normal.toArray(f,w),f[w+3]=o.constant}c.value=f,c.needsUpdate=!0}return t.numPlanes=u,t.numIntersection=0,f}}function zd(r){let t=new WeakMap;function e(o,a){return a===Sr?o.mapping=mi:a===Er&&(o.mapping=gi),o}function n(o){if(o&&o.isTexture&&o.isRenderTargetTexture===!1){let a=o.mapping;if(a===Sr||a===Er)if(t.has(o)){let c=t.get(o).texture;return e(c,o.mapping)}else{let c=o.image;if(c&&c.height>0){let l=new zr(c.height/2);return l.fromEquirectangularTexture(r,o),t.set(o,l),o.addEventListener("dispose",i),e(l.texture,o.mapping)}else return null}}return o}function i(o){let a=o.target;a.removeEventListener("dispose",i);let c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}var kr=class extends bi{constructor(t=-1,e=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,s=n-t,o=n+t,a=i+e,c=i-e;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,p=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,o=s+l*this.view.width,a-=p*this.view.offsetY,c=a-p*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,c,this.near,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},ci=4,mo=[.125,.215,.35,.446,.526,.582],Pn=20,yr=new kr,go=new Xt,br=null,Ln=(1+Math.sqrt(5))/2,oi=1/Ln,_o=[new H(1,1,1),new H(-1,1,1),new H(1,1,-1),new H(-1,1,-1),new H(0,Ln,oi),new H(0,Ln,-oi),new H(oi,0,Ln),new H(-oi,0,Ln),new H(Ln,oi,0),new H(-Ln,oi,0)],As=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){br=this._renderer.getRenderTarget(),this._setSize(256);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,n,i,s),e>0&&this._blur(s,0,0,e),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=yo(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=vo(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(br),t.scissorTest=!1,cs(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===mi||t.mapping===gi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),br=this._renderer.getRenderTarget();let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Re,minFilter:Re,generateMipmaps:!1,type:Ui,format:Ae,encoding:cn,depthBuffer:!1},i=xo(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=xo(t,e,n);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=kd(s)),this._blurMaterial=Od(s,t,e)}return i}_compileMaterial(t){let e=new ae(this._lodPlanes[0],t);this._renderer.compile(e,yr)}_sceneToCubeUV(t,e,n,i){let a=new ge(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],p=this._renderer,h=p.autoClear,d=p.toneMapping;p.getClearColor(go),p.toneMapping=Ve,p.autoClear=!1;let m=new vi({name:"PMREM.Background",side:Ie,depthWrite:!1,depthTest:!1}),g=new ae(new un,m),u=!1,f=t.background;f?f.isColor&&(m.color.copy(f),t.background=null,u=!0):(m.color.copy(go),u=!0);for(let _=0;_<6;_++){let y=_%3;y===0?(a.up.set(0,c[_],0),a.lookAt(l[_],0,0)):y===1?(a.up.set(0,0,c[_]),a.lookAt(0,l[_],0)):(a.up.set(0,c[_],0),a.lookAt(0,0,l[_]));let M=this._cubeSize;cs(i,y*M,_>2?M:0,M,M),p.setRenderTarget(i),u&&p.render(g,a),p.render(t,a)}g.geometry.dispose(),g.material.dispose(),p.toneMapping=d,p.autoClear=h,t.background=f}_textureToCubeUV(t,e){let n=this._renderer,i=t.mapping===mi||t.mapping===gi;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=yo()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=vo());let s=i?this._cubemapMaterial:this._equirectMaterial,o=new ae(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=t;let c=this._cubeSize;cs(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,yr)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){let s=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),o=_o[(i-1)%_o.length];this._blur(t,i-1,i,s,o)}e.autoClear=n}_blur(t,e,n,i,s){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,i,"latitudinal",s),this._halfBlur(o,t,n,n,i,"longitudinal",s)}_halfBlur(t,e,n,i,s,o,a){let c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let p=3,h=new ae(this._lodPlanes[i],l),d=l.uniforms,m=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*m):2*Math.PI/(2*Pn-1),u=s/g,f=isFinite(s)?1+Math.floor(p*u):Pn;f>Pn&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${f} samples when the maximum is set to ${Pn}`);let _=[],y=0;for(let T=0;T<Pn;++T){let b=T/u,L=Math.exp(-b*b/2);_.push(L),T===0?y+=L:T<f&&(y+=2*L)}for(let T=0;T<_.length;T++)_[T]=_[T]/y;d.envMap.value=t.texture,d.samples.value=f,d.weights.value=_,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);let{_lodMax:M}=this;d.dTheta.value=g,d.mipInt.value=M-n;let w=this._sizeLods[i],S=3*w*(i>M-ci?i-M+ci:0),D=4*(this._cubeSize-w);cs(e,S,D,3*w,2*w),c.setRenderTarget(e),c.render(h,yr)}};function kd(r){let t=[],e=[],n=[],i=r,s=r-ci+1+mo.length;for(let o=0;o<s;o++){let a=Math.pow(2,i);e.push(a);let c=1/a;o>r-ci?c=mo[o-r+ci-1]:o===0&&(c=0),n.push(c);let l=1/(a-2),p=-l,h=1+l,d=[p,p,h,p,h,h,p,p,h,h,p,h],m=6,g=6,u=3,f=2,_=1,y=new Float32Array(u*g*m),M=new Float32Array(f*g*m),w=new Float32Array(_*g*m);for(let D=0;D<m;D++){let T=D%3*2/3-1,b=D>2?0:-1,L=[T,b,0,T+2/3,b,0,T+2/3,b+1,0,T,b,0,T+2/3,b+1,0,T,b+1,0];y.set(L,u*g*D),M.set(d,f*g*D);let E=[D,D,D,D,D,D];w.set(E,_*g*D)}let S=new ze;S.setAttribute("position",new Te(y,u)),S.setAttribute("uv",new Te(M,f)),S.setAttribute("faceIndex",new Te(w,_)),t.push(S),i>ci&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function xo(r,t,e){let n=new We(r,t,e);return n.texture.mapping=Ps,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function cs(r,t,e,n,i){r.viewport.set(t,e,n,i),r.scissor.set(t,e,n,i)}function Od(r,t,e){let n=new Float32Array(Pn),i=new H(0,1,0);return new ve({name:"SphericalGaussianBlur",defines:{n:Pn,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:ra(),fragmentShader:`

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
		`,blending:Mn,depthTest:!1,depthWrite:!1})}function vo(){return new ve({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ra(),fragmentShader:`

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
		`,blending:Mn,depthTest:!1,depthWrite:!1})}function yo(){return new ve({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ra(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Mn,depthTest:!1,depthWrite:!1})}function ra(){return`

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
	`}function Nd(r){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){let c=a.mapping,l=c===Sr||c===Er,p=c===mi||c===gi;if(l||p)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let h=t.get(a);return e===null&&(e=new As(r)),h=l?e.fromEquirectangular(a,h):e.fromCubemap(a,h),t.set(a,h),h.texture}else{if(t.has(a))return t.get(a).texture;{let h=a.image;if(l&&h&&h.height>0||p&&h&&i(h)){e===null&&(e=new As(r));let d=l?e.fromEquirectangular(a):e.fromCubemap(a);return t.set(a,d),a.addEventListener("dispose",s),d.texture}else return null}}}return a}function i(a){let c=0,l=6;for(let p=0;p<l;p++)a[p]!==void 0&&c++;return c===l}function s(a){let c=a.target;c.removeEventListener("dispose",s);let l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Fd(r){let t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(n){n.isWebGL2?e("EXT_color_buffer_float"):(e("WEBGL_depth_texture"),e("OES_texture_float"),e("OES_texture_half_float"),e("OES_texture_half_float_linear"),e("OES_standard_derivatives"),e("OES_element_index_uint"),e("OES_vertex_array_object"),e("ANGLE_instanced_arrays")),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture")},get:function(n){let i=e(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Ud(r,t,e,n){let i={},s=new WeakMap;function o(h){let d=h.target;d.index!==null&&t.remove(d.index);for(let g in d.attributes)t.remove(d.attributes[g]);d.removeEventListener("dispose",o),delete i[d.id];let m=s.get(d);m&&(t.remove(m),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(h,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,e.memory.geometries++),d}function c(h){let d=h.attributes;for(let g in d)t.update(d[g],34962);let m=h.morphAttributes;for(let g in m){let u=m[g];for(let f=0,_=u.length;f<_;f++)t.update(u[f],34962)}}function l(h){let d=[],m=h.index,g=h.attributes.position,u=0;if(m!==null){let y=m.array;u=m.version;for(let M=0,w=y.length;M<w;M+=3){let S=y[M+0],D=y[M+1],T=y[M+2];d.push(S,D,D,T,T,S)}}else{let y=g.array;u=g.version;for(let M=0,w=y.length/3-1;M<w;M+=3){let S=M+0,D=M+1,T=M+2;d.push(S,D,D,T,T,S)}}let f=new(qo(d)?Ms:ws)(d,1);f.version=u;let _=s.get(h);_&&t.remove(_),s.set(h,f)}function p(h){let d=s.get(h);if(d){let m=h.index;m!==null&&d.version<m.version&&l(h)}else l(h);return s.get(h)}return{get:a,update:c,getWireframeAttribute:p}}function Bd(r,t,e,n){let i=n.isWebGL2,s;function o(d){s=d}let a,c;function l(d){a=d.type,c=d.bytesPerElement}function p(d,m){r.drawElements(s,m,a,d*c),e.update(m,s,1)}function h(d,m,g){if(g===0)return;let u,f;if(i)u=r,f="drawElementsInstanced";else if(u=t.get("ANGLE_instanced_arrays"),f="drawElementsInstancedANGLE",u===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}u[f](s,m,a,d*c,g),e.update(m,s,g)}this.setMode=o,this.setIndex=l,this.render=p,this.renderInstances=h}function Vd(r){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(e.calls++,o){case 4:e.triangles+=a*(s/3);break;case 1:e.lines+=a*(s/2);break;case 3:e.lines+=a*(s-1);break;case 2:e.lines+=a*s;break;case 0:e.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){e.frame++,e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function Wd(r,t){return r[0]-t[0]}function Hd(r,t){return Math.abs(t[1])-Math.abs(r[1])}function Gd(r,t,e){let n={},i=new Float32Array(8),s=new WeakMap,o=new Zt,a=[];for(let l=0;l<8;l++)a[l]=[l,0];function c(l,p,h,d){let m=l.morphTargetInfluences;if(t.isWebGL2===!0){let g=p.morphAttributes.position||p.morphAttributes.normal||p.morphAttributes.color,u=g!==void 0?g.length:0,f=s.get(p);if(f===void 0||f.count!==u){let F=function(){O.dispose(),s.delete(p),p.removeEventListener("dispose",F)};f!==void 0&&f.texture.dispose();let M=p.morphAttributes.position!==void 0,w=p.morphAttributes.normal!==void 0,S=p.morphAttributes.color!==void 0,D=p.morphAttributes.position||[],T=p.morphAttributes.normal||[],b=p.morphAttributes.color||[],L=0;M===!0&&(L=1),w===!0&&(L=2),S===!0&&(L=3);let E=p.attributes.position.count*L,N=1;E>t.maxTextureSize&&(N=Math.ceil(E/t.maxTextureSize),E=t.maxTextureSize);let v=new Float32Array(E*N*4*u),O=new ys(v,E,N,u);O.type=Ze,O.needsUpdate=!0;let B=L*4;for(let $=0;$<u;$++){let q=D[$],j=T[$],P=b[$],R=E*N*4*$;for(let it=0;it<q.count;it++){let Y=it*B;M===!0&&(o.fromBufferAttribute(q,it),v[R+Y+0]=o.x,v[R+Y+1]=o.y,v[R+Y+2]=o.z,v[R+Y+3]=0),w===!0&&(o.fromBufferAttribute(j,it),v[R+Y+4]=o.x,v[R+Y+5]=o.y,v[R+Y+6]=o.z,v[R+Y+7]=0),S===!0&&(o.fromBufferAttribute(P,it),v[R+Y+8]=o.x,v[R+Y+9]=o.y,v[R+Y+10]=o.z,v[R+Y+11]=P.itemSize===4?o.w:1)}}f={count:u,texture:O,size:new Dt(E,N)},s.set(p,f),p.addEventListener("dispose",F)}let _=0;for(let M=0;M<m.length;M++)_+=m[M];let y=p.morphTargetsRelative?1:1-_;d.getUniforms().setValue(r,"morphTargetBaseInfluence",y),d.getUniforms().setValue(r,"morphTargetInfluences",m),d.getUniforms().setValue(r,"morphTargetsTexture",f.texture,e),d.getUniforms().setValue(r,"morphTargetsTextureSize",f.size)}else{let g=m===void 0?0:m.length,u=n[p.id];if(u===void 0||u.length!==g){u=[];for(let w=0;w<g;w++)u[w]=[w,0];n[p.id]=u}for(let w=0;w<g;w++){let S=u[w];S[0]=w,S[1]=m[w]}u.sort(Hd);for(let w=0;w<8;w++)w<g&&u[w][1]?(a[w][0]=u[w][0],a[w][1]=u[w][1]):(a[w][0]=Number.MAX_SAFE_INTEGER,a[w][1]=0);a.sort(Wd);let f=p.morphAttributes.position,_=p.morphAttributes.normal,y=0;for(let w=0;w<8;w++){let S=a[w],D=S[0],T=S[1];D!==Number.MAX_SAFE_INTEGER&&T?(f&&p.getAttribute("morphTarget"+w)!==f[D]&&p.setAttribute("morphTarget"+w,f[D]),_&&p.getAttribute("morphNormal"+w)!==_[D]&&p.setAttribute("morphNormal"+w,_[D]),i[w]=T,y+=T):(f&&p.hasAttribute("morphTarget"+w)===!0&&p.deleteAttribute("morphTarget"+w),_&&p.hasAttribute("morphNormal"+w)===!0&&p.deleteAttribute("morphNormal"+w),i[w]=0)}let M=p.morphTargetsRelative?1:1-y;d.getUniforms().setValue(r,"morphTargetBaseInfluence",M),d.getUniforms().setValue(r,"morphTargetInfluences",i)}}return{update:c}}function qd(r,t,e,n){let i=new WeakMap;function s(c){let l=n.render.frame,p=c.geometry,h=t.get(c,p);return i.get(h)!==l&&(t.update(h),i.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),e.update(c.instanceMatrix,34962),c.instanceColor!==null&&e.update(c.instanceColor,34962)),h}function o(){i=new WeakMap}function a(c){let l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:s,dispose:o}}var Yo=new we,Jo=new ys,jo=new Rr,$o=new Ss,bo=[],wo=[],Mo=new Float32Array(16),So=new Float32Array(9),Eo=new Float32Array(4);function Ai(r,t,e){let n=r[0];if(n<=0||n>0)return r;let i=t*e,s=bo[i];if(s===void 0&&(s=new Float32Array(i),bo[i]=s),t!==0){n.toArray(s,0);for(let o=1,a=0;o!==t;++o)a+=e,r[o].toArray(s,a)}return s}function ie(r,t){if(r.length!==t.length)return!1;for(let e=0,n=r.length;e<n;e++)if(r[e]!==t[e])return!1;return!0}function se(r,t){for(let e=0,n=t.length;e<n;e++)r[e]=t[e]}function Ds(r,t){let e=wo[t];e===void 0&&(e=new Int32Array(t),wo[t]=e);for(let n=0;n!==t;++n)e[n]=r.allocateTextureUnit();return e}function Xd(r,t){let e=this.cache;e[0]!==t&&(r.uniform1f(this.addr,t),e[0]=t)}function Zd(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ie(e,t))return;r.uniform2fv(this.addr,t),se(e,t)}}function Yd(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ie(e,t))return;r.uniform3fv(this.addr,t),se(e,t)}}function Jd(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ie(e,t))return;r.uniform4fv(this.addr,t),se(e,t)}}function jd(r,t){let e=this.cache,n=t.elements;if(n===void 0){if(ie(e,t))return;r.uniformMatrix2fv(this.addr,!1,t),se(e,t)}else{if(ie(e,n))return;Eo.set(n),r.uniformMatrix2fv(this.addr,!1,Eo),se(e,n)}}function $d(r,t){let e=this.cache,n=t.elements;if(n===void 0){if(ie(e,t))return;r.uniformMatrix3fv(this.addr,!1,t),se(e,t)}else{if(ie(e,n))return;So.set(n),r.uniformMatrix3fv(this.addr,!1,So),se(e,n)}}function Kd(r,t){let e=this.cache,n=t.elements;if(n===void 0){if(ie(e,t))return;r.uniformMatrix4fv(this.addr,!1,t),se(e,t)}else{if(ie(e,n))return;Mo.set(n),r.uniformMatrix4fv(this.addr,!1,Mo),se(e,n)}}function Qd(r,t){let e=this.cache;e[0]!==t&&(r.uniform1i(this.addr,t),e[0]=t)}function tf(r,t){let e=this.cache;ie(e,t)||(r.uniform2iv(this.addr,t),se(e,t))}function ef(r,t){let e=this.cache;ie(e,t)||(r.uniform3iv(this.addr,t),se(e,t))}function nf(r,t){let e=this.cache;ie(e,t)||(r.uniform4iv(this.addr,t),se(e,t))}function sf(r,t){let e=this.cache;e[0]!==t&&(r.uniform1ui(this.addr,t),e[0]=t)}function rf(r,t){let e=this.cache;ie(e,t)||(r.uniform2uiv(this.addr,t),se(e,t))}function af(r,t){let e=this.cache;ie(e,t)||(r.uniform3uiv(this.addr,t),se(e,t))}function of(r,t){let e=this.cache;ie(e,t)||(r.uniform4uiv(this.addr,t),se(e,t))}function lf(r,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture2D(t||Yo,i)}function cf(r,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||jo,i)}function hf(r,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||$o,i)}function uf(r,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||Jo,i)}function df(r){switch(r){case 5126:return Xd;case 35664:return Zd;case 35665:return Yd;case 35666:return Jd;case 35674:return jd;case 35675:return $d;case 35676:return Kd;case 5124:case 35670:return Qd;case 35667:case 35671:return tf;case 35668:case 35672:return ef;case 35669:case 35673:return nf;case 5125:return sf;case 36294:return rf;case 36295:return af;case 36296:return of;case 35678:case 36198:case 36298:case 36306:case 35682:return lf;case 35679:case 36299:case 36307:return cf;case 35680:case 36300:case 36308:case 36293:return hf;case 36289:case 36303:case 36311:case 36292:return uf}}function ff(r,t){r.uniform1fv(this.addr,t)}function pf(r,t){let e=Ai(t,this.size,2);r.uniform2fv(this.addr,e)}function mf(r,t){let e=Ai(t,this.size,3);r.uniform3fv(this.addr,e)}function gf(r,t){let e=Ai(t,this.size,4);r.uniform4fv(this.addr,e)}function _f(r,t){let e=Ai(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,e)}function xf(r,t){let e=Ai(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,e)}function vf(r,t){let e=Ai(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,e)}function yf(r,t){r.uniform1iv(this.addr,t)}function bf(r,t){r.uniform2iv(this.addr,t)}function wf(r,t){r.uniform3iv(this.addr,t)}function Mf(r,t){r.uniform4iv(this.addr,t)}function Sf(r,t){r.uniform1uiv(this.addr,t)}function Ef(r,t){r.uniform2uiv(this.addr,t)}function Af(r,t){r.uniform3uiv(this.addr,t)}function Tf(r,t){r.uniform4uiv(this.addr,t)}function Cf(r,t,e){let n=this.cache,i=t.length,s=Ds(e,i);ie(n,s)||(r.uniform1iv(this.addr,s),se(n,s));for(let o=0;o!==i;++o)e.setTexture2D(t[o]||Yo,s[o])}function Lf(r,t,e){let n=this.cache,i=t.length,s=Ds(e,i);ie(n,s)||(r.uniform1iv(this.addr,s),se(n,s));for(let o=0;o!==i;++o)e.setTexture3D(t[o]||jo,s[o])}function Pf(r,t,e){let n=this.cache,i=t.length,s=Ds(e,i);ie(n,s)||(r.uniform1iv(this.addr,s),se(n,s));for(let o=0;o!==i;++o)e.setTextureCube(t[o]||$o,s[o])}function Rf(r,t,e){let n=this.cache,i=t.length,s=Ds(e,i);ie(n,s)||(r.uniform1iv(this.addr,s),se(n,s));for(let o=0;o!==i;++o)e.setTexture2DArray(t[o]||Jo,s[o])}function If(r){switch(r){case 5126:return ff;case 35664:return pf;case 35665:return mf;case 35666:return gf;case 35674:return _f;case 35675:return xf;case 35676:return vf;case 5124:case 35670:return yf;case 35667:case 35671:return bf;case 35668:case 35672:return wf;case 35669:case 35673:return Mf;case 5125:return Sf;case 36294:return Ef;case 36295:return Af;case 36296:return Tf;case 35678:case 36198:case 36298:case 36306:case 35682:return Cf;case 35679:case 36299:case 36307:return Lf;case 35680:case 36300:case 36308:case 36293:return Pf;case 36289:case 36303:case 36311:case 36292:return Rf}}var Or=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.setValue=df(e.type)}},Nr=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.size=e.size,this.setValue=If(e.type)}},Fr=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let i=this.seq;for(let s=0,o=i.length;s!==o;++s){let a=i[s];a.setValue(t,e[a.id],n)}}},wr=/(\w+)(\])?(\[|\.)?/g;function Ao(r,t){r.seq.push(t),r.map[t.id]=t}function Df(r,t,e){let n=r.name,i=n.length;for(wr.lastIndex=0;;){let s=wr.exec(n),o=wr.lastIndex,a=s[1],c=s[2]==="]",l=s[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===i){Ao(e,l===void 0?new Or(a,r,t):new Nr(a,r,t));break}else{let h=e.map[a];h===void 0&&(h=new Fr(a),Ao(e,h)),e=h}}}var fi=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,35718);for(let i=0;i<n;++i){let s=t.getActiveUniform(e,i),o=t.getUniformLocation(e,s.name);Df(s,o,this)}}setValue(t,e,n,i){let s=this.map[e];s!==void 0&&s.setValue(t,n,i)}setOptional(t,e,n){let i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let s=0,o=e.length;s!==o;++s){let a=e[s],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,i)}}static seqWithValue(t,e){let n=[];for(let i=0,s=t.length;i!==s;++i){let o=t[i];o.id in e&&n.push(o)}return n}};function To(r,t,e){let n=r.createShader(t);return r.shaderSource(n,e),r.compileShader(n),n}var zf=0;function kf(r,t){let e=r.split(`
`),n=[],i=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let o=i;o<s;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}function Of(r){switch(r){case cn:return["Linear","( value )"];case jt:return["sRGB","( value )"];default:return console.warn("THREE.WebGLProgram: Unsupported encoding:",r),["Linear","( value )"]}}function Co(r,t,e){let n=r.getShaderParameter(t,35713),i=r.getShaderInfoLog(t).trim();if(n&&i==="")return"";let s=/ERROR: 0:(\d+)/.exec(i);if(s){let o=parseInt(s[1]);return e.toUpperCase()+`

`+i+`

`+kf(r.getShaderSource(t),o)}else return i}function Nf(r,t){let e=Of(t);return"vec4 "+r+"( vec4 value ) { return LinearTo"+e[0]+e[1]+"; }"}function Ff(r,t){let e;switch(t){case jl:e="Linear";break;case $l:e="Reinhard";break;case Kl:e="OptimizedCineon";break;case Ql:e="ACESFilmic";break;case tc:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+r+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function Uf(r){return[r.extensionDerivatives||!!r.envMapCubeUVHeight||r.bumpMap||r.tangentSpaceNormalMap||r.clearcoatNormalMap||r.flatShading||r.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(r.extensionFragDepth||r.logarithmicDepthBuffer)&&r.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",r.extensionDrawBuffers&&r.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(r.extensionShaderTextureLOD||r.envMap||r.transmission)&&r.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(ki).join(`
`)}function Bf(r){let t=[];for(let e in r){let n=r[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Vf(r,t){let e={},n=r.getProgramParameter(t,35721);for(let i=0;i<n;i++){let s=r.getActiveAttrib(t,i),o=s.name,a=1;s.type===35674&&(a=2),s.type===35675&&(a=3),s.type===35676&&(a=4),e[o]={type:s.type,location:r.getAttribLocation(t,o),locationSize:a}}return e}function ki(r){return r!==""}function Lo(r,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Po(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Wf=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ur(r){return r.replace(Wf,Hf)}function Hf(r,t){let e=Ot[t];if(e===void 0)throw new Error("Can not resolve #include <"+t+">");return Ur(e)}var Gf=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ro(r){return r.replace(Gf,qf)}function qf(r,t,e,n){let i="";for(let s=parseInt(t);s<parseInt(e);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Io(r){let t="precision "+r.precision+` float;
precision `+r.precision+" int;";return r.precision==="highp"?t+=`
#define HIGH_PRECISION`:r.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Xf(r){let t="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Fo?t="SHADOWMAP_TYPE_PCF":r.shadowMapType===Cl?t="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===zi&&(t="SHADOWMAP_TYPE_VSM"),t}function Zf(r){let t="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case mi:case gi:t="ENVMAP_TYPE_CUBE";break;case Ps:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Yf(r){let t="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case gi:t="ENVMAP_MODE_REFRACTION";break}return t}function Jf(r){let t="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case Vo:t="ENVMAP_BLENDING_MULTIPLY";break;case Yl:t="ENVMAP_BLENDING_MIX";break;case Jl:t="ENVMAP_BLENDING_ADD";break}return t}function jf(r){let t=r.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function $f(r,t,e,n){let i=r.getContext(),s=e.defines,o=e.vertexShader,a=e.fragmentShader,c=Xf(e),l=Zf(e),p=Yf(e),h=Jf(e),d=jf(e),m=e.isWebGL2?"":Uf(e),g=Bf(s),u=i.createProgram(),f,_,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(f=[g].filter(ki).join(`
`),f.length>0&&(f+=`
`),_=[m,g].filter(ki).join(`
`),_.length>0&&(_+=`
`)):(f=[Io(e),"#define SHADER_NAME "+e.shaderName,g,e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.supportsVertexTextures?"#define VERTEX_TEXTURES":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+p:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMap&&e.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",e.normalMap&&e.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.displacementMap&&e.supportsVertexTextures?"#define USE_DISPLACEMENTMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularIntensityMap?"#define USE_SPECULARINTENSITYMAP":"",e.specularColorMap?"#define USE_SPECULARCOLORMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEENCOLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEENROUGHNESSMAP":"",e.vertexTangents?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUvs?"#define USE_UV":"",e.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors&&e.isWebGL2?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ki).join(`
`),_=[m,Io(e),"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+p:"",e.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMap&&e.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",e.normalMap&&e.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularIntensityMap?"#define USE_SPECULARINTENSITYMAP":"",e.specularColorMap?"#define USE_SPECULARCOLORMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEENCOLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEENROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.vertexTangents?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUvs?"#define USE_UV":"",e.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.physicallyCorrectLights?"#define PHYSICALLY_CORRECT_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Ve?"#define TONE_MAPPING":"",e.toneMapping!==Ve?Ot.tonemapping_pars_fragment:"",e.toneMapping!==Ve?Ff("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ot.encodings_pars_fragment,Nf("linearToOutputTexel",e.outputEncoding),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ki).join(`
`)),o=Ur(o),o=Lo(o,e),o=Po(o,e),a=Ur(a),a=Lo(a,e),a=Po(a,e),o=Ro(o),a=Ro(a),e.isWebGL2&&e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,f=["precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,_=["#define varying in",e.glslVersion===eo?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===eo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+_);let M=y+f+o,w=y+_+a,S=To(i,35633,M),D=To(i,35632,w);if(i.attachShader(u,S),i.attachShader(u,D),e.index0AttributeName!==void 0?i.bindAttribLocation(u,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(u,0,"position"),i.linkProgram(u),r.debug.checkShaderErrors){let L=i.getProgramInfoLog(u).trim(),E=i.getShaderInfoLog(S).trim(),N=i.getShaderInfoLog(D).trim(),v=!0,O=!0;if(i.getProgramParameter(u,35714)===!1){v=!1;let B=Co(i,S,"vertex"),F=Co(i,D,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(u,35715)+`

Program Info Log: `+L+`
`+B+`
`+F)}else L!==""?console.warn("THREE.WebGLProgram: Program Info Log:",L):(E===""||N==="")&&(O=!1);O&&(this.diagnostics={runnable:v,programLog:L,vertexShader:{log:E,prefix:f},fragmentShader:{log:N,prefix:_}})}i.deleteShader(S),i.deleteShader(D);let T;this.getUniforms=function(){return T===void 0&&(T=new fi(i,u)),T};let b;return this.getAttributes=function(){return b===void 0&&(b=Vf(i,u)),b},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(u),this.program=void 0},this.name=e.shaderName,this.id=zf++,this.cacheKey=t,this.usedTimes=1,this.program=u,this.vertexShader=S,this.fragmentShader=D,this}var Kf=0,Br=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new Vr(t),e.set(t,n)),n}},Vr=class{constructor(t){this.id=Kf++,this.code=t,this.usedTimes=0}};function Qf(r,t,e,n,i,s,o){let a=new bs,c=new Br,l=[],p=i.isWebGL2,h=i.logarithmicDepthBuffer,d=i.vertexTextures,m=i.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function u(b,L,E,N,v){let O=N.fog,B=v.geometry,F=b.isMeshStandardMaterial?N.environment:null,$=(b.isMeshStandardMaterial?e:t).get(b.envMap||F),q=!!$&&$.mapping===Ps?$.image.height:null,j=g[b.type];b.precision!==null&&(m=i.getMaxPrecision(b.precision),m!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",m,"instead."));let P=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,R=P!==void 0?P.length:0,it=0;B.morphAttributes.position!==void 0&&(it=1),B.morphAttributes.normal!==void 0&&(it=2),B.morphAttributes.color!==void 0&&(it=3);let Y,Q,ft,Et;if(j){let zt=_e[j];Y=zt.vertexShader,Q=zt.fragmentShader}else Y=b.vertexShader,Q=b.fragmentShader,c.update(b),ft=c.getVertexShaderID(b),Et=c.getFragmentShaderID(b);let nt=r.getRenderTarget(),At=b.alphaTest>0,Mt=b.clearcoat>0,bt=b.iridescence>0;return{isWebGL2:p,shaderID:j,shaderName:b.type,vertexShader:Y,fragmentShader:Q,defines:b.defines,customVertexShaderID:ft,customFragmentShaderID:Et,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:m,instancing:v.isInstancedMesh===!0,instancingColor:v.isInstancedMesh===!0&&v.instanceColor!==null,supportsVertexTextures:d,outputEncoding:nt===null?r.outputEncoding:nt.isXRRenderTarget===!0?nt.texture.encoding:cn,map:!!b.map,matcap:!!b.matcap,envMap:!!$,envMapMode:$&&$.mapping,envMapCubeUVHeight:q,lightMap:!!b.lightMap,aoMap:!!b.aoMap,emissiveMap:!!b.emissiveMap,bumpMap:!!b.bumpMap,normalMap:!!b.normalMap,objectSpaceNormalMap:b.normalMapType===yc,tangentSpaceNormalMap:b.normalMapType===vc,decodeVideoTexture:!!b.map&&b.map.isVideoTexture===!0&&b.map.encoding===jt,clearcoat:Mt,clearcoatMap:Mt&&!!b.clearcoatMap,clearcoatRoughnessMap:Mt&&!!b.clearcoatRoughnessMap,clearcoatNormalMap:Mt&&!!b.clearcoatNormalMap,iridescence:bt,iridescenceMap:bt&&!!b.iridescenceMap,iridescenceThicknessMap:bt&&!!b.iridescenceThicknessMap,displacementMap:!!b.displacementMap,roughnessMap:!!b.roughnessMap,metalnessMap:!!b.metalnessMap,specularMap:!!b.specularMap,specularIntensityMap:!!b.specularIntensityMap,specularColorMap:!!b.specularColorMap,opaque:b.transparent===!1&&b.blending===ui,alphaMap:!!b.alphaMap,alphaTest:At,gradientMap:!!b.gradientMap,sheen:b.sheen>0,sheenColorMap:!!b.sheenColorMap,sheenRoughnessMap:!!b.sheenRoughnessMap,transmission:b.transmission>0,transmissionMap:!!b.transmissionMap,thicknessMap:!!b.thicknessMap,combine:b.combine,vertexTangents:!!b.normalMap&&!!B.attributes.tangent,vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,vertexUvs:!!b.map||!!b.bumpMap||!!b.normalMap||!!b.specularMap||!!b.alphaMap||!!b.emissiveMap||!!b.roughnessMap||!!b.metalnessMap||!!b.clearcoatMap||!!b.clearcoatRoughnessMap||!!b.clearcoatNormalMap||!!b.iridescenceMap||!!b.iridescenceThicknessMap||!!b.displacementMap||!!b.transmissionMap||!!b.thicknessMap||!!b.specularIntensityMap||!!b.specularColorMap||!!b.sheenColorMap||!!b.sheenRoughnessMap,uvsVertexOnly:!(!!b.map||!!b.bumpMap||!!b.normalMap||!!b.specularMap||!!b.alphaMap||!!b.emissiveMap||!!b.roughnessMap||!!b.metalnessMap||!!b.clearcoatNormalMap||!!b.iridescenceMap||!!b.iridescenceThicknessMap||b.transmission>0||!!b.transmissionMap||!!b.thicknessMap||!!b.specularIntensityMap||!!b.specularColorMap||b.sheen>0||!!b.sheenColorMap||!!b.sheenRoughnessMap)&&!!b.displacementMap,fog:!!O,useFog:b.fog===!0,fogExp2:O&&O.isFogExp2,flatShading:!!b.flatShading,sizeAttenuation:b.sizeAttenuation,logarithmicDepthBuffer:h,skinning:v.isSkinnedMesh===!0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:R,morphTextureStride:it,numDirLights:L.directional.length,numPointLights:L.point.length,numSpotLights:L.spot.length,numSpotLightMaps:L.spotLightMap.length,numRectAreaLights:L.rectArea.length,numHemiLights:L.hemi.length,numDirLightShadows:L.directionalShadowMap.length,numPointLightShadows:L.pointShadowMap.length,numSpotLightShadows:L.spotShadowMap.length,numSpotLightShadowsWithMaps:L.numSpotLightShadowsWithMaps,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:b.dithering,shadowMapEnabled:r.shadowMap.enabled&&E.length>0,shadowMapType:r.shadowMap.type,toneMapping:b.toneMapped?r.toneMapping:Ve,physicallyCorrectLights:r.physicallyCorrectLights,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Xe,flipSided:b.side===Ie,useDepthPacking:!!b.depthPacking,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionDerivatives:b.extensions&&b.extensions.derivatives,extensionFragDepth:b.extensions&&b.extensions.fragDepth,extensionDrawBuffers:b.extensions&&b.extensions.drawBuffers,extensionShaderTextureLOD:b.extensions&&b.extensions.shaderTextureLOD,rendererExtensionFragDepth:p||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:p||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:p||n.has("EXT_shader_texture_lod"),customProgramCacheKey:b.customProgramCacheKey()}}function f(b){let L=[];if(b.shaderID?L.push(b.shaderID):(L.push(b.customVertexShaderID),L.push(b.customFragmentShaderID)),b.defines!==void 0)for(let E in b.defines)L.push(E),L.push(b.defines[E]);return b.isRawShaderMaterial===!1&&(_(L,b),y(L,b),L.push(r.outputEncoding)),L.push(b.customProgramCacheKey),L.join()}function _(b,L){b.push(L.precision),b.push(L.outputEncoding),b.push(L.envMapMode),b.push(L.envMapCubeUVHeight),b.push(L.combine),b.push(L.vertexUvs),b.push(L.fogExp2),b.push(L.sizeAttenuation),b.push(L.morphTargetsCount),b.push(L.morphAttributeCount),b.push(L.numDirLights),b.push(L.numPointLights),b.push(L.numSpotLights),b.push(L.numSpotLightMaps),b.push(L.numHemiLights),b.push(L.numRectAreaLights),b.push(L.numDirLightShadows),b.push(L.numPointLightShadows),b.push(L.numSpotLightShadows),b.push(L.numSpotLightShadowsWithMaps),b.push(L.shadowMapType),b.push(L.toneMapping),b.push(L.numClippingPlanes),b.push(L.numClipIntersection),b.push(L.depthPacking)}function y(b,L){a.disableAll(),L.isWebGL2&&a.enable(0),L.supportsVertexTextures&&a.enable(1),L.instancing&&a.enable(2),L.instancingColor&&a.enable(3),L.map&&a.enable(4),L.matcap&&a.enable(5),L.envMap&&a.enable(6),L.lightMap&&a.enable(7),L.aoMap&&a.enable(8),L.emissiveMap&&a.enable(9),L.bumpMap&&a.enable(10),L.normalMap&&a.enable(11),L.objectSpaceNormalMap&&a.enable(12),L.tangentSpaceNormalMap&&a.enable(13),L.clearcoat&&a.enable(14),L.clearcoatMap&&a.enable(15),L.clearcoatRoughnessMap&&a.enable(16),L.clearcoatNormalMap&&a.enable(17),L.iridescence&&a.enable(18),L.iridescenceMap&&a.enable(19),L.iridescenceThicknessMap&&a.enable(20),L.displacementMap&&a.enable(21),L.specularMap&&a.enable(22),L.roughnessMap&&a.enable(23),L.metalnessMap&&a.enable(24),L.gradientMap&&a.enable(25),L.alphaMap&&a.enable(26),L.alphaTest&&a.enable(27),L.vertexColors&&a.enable(28),L.vertexAlphas&&a.enable(29),L.vertexUvs&&a.enable(30),L.vertexTangents&&a.enable(31),L.uvsVertexOnly&&a.enable(32),b.push(a.mask),a.disableAll(),L.fog&&a.enable(0),L.useFog&&a.enable(1),L.flatShading&&a.enable(2),L.logarithmicDepthBuffer&&a.enable(3),L.skinning&&a.enable(4),L.morphTargets&&a.enable(5),L.morphNormals&&a.enable(6),L.morphColors&&a.enable(7),L.premultipliedAlpha&&a.enable(8),L.shadowMapEnabled&&a.enable(9),L.physicallyCorrectLights&&a.enable(10),L.doubleSided&&a.enable(11),L.flipSided&&a.enable(12),L.useDepthPacking&&a.enable(13),L.dithering&&a.enable(14),L.specularIntensityMap&&a.enable(15),L.specularColorMap&&a.enable(16),L.transmission&&a.enable(17),L.transmissionMap&&a.enable(18),L.thicknessMap&&a.enable(19),L.sheen&&a.enable(20),L.sheenColorMap&&a.enable(21),L.sheenRoughnessMap&&a.enable(22),L.decodeVideoTexture&&a.enable(23),L.opaque&&a.enable(24),b.push(a.mask)}function M(b){let L=g[b.type],E;if(L){let N=_e[L];E=Is.clone(N.uniforms)}else E=b.uniforms;return E}function w(b,L){let E;for(let N=0,v=l.length;N<v;N++){let O=l[N];if(O.cacheKey===L){E=O,++E.usedTimes;break}}return E===void 0&&(E=new $f(r,L,b,s),l.push(E)),E}function S(b){if(--b.usedTimes===0){let L=l.indexOf(b);l[L]=l[l.length-1],l.pop(),b.destroy()}}function D(b){c.remove(b)}function T(){c.dispose()}return{getParameters:u,getProgramCacheKey:f,getUniforms:M,acquireProgram:w,releaseProgram:S,releaseShaderCache:D,programs:l,dispose:T}}function tp(){let r=new WeakMap;function t(s){let o=r.get(s);return o===void 0&&(o={},r.set(s,o)),o}function e(s){r.delete(s)}function n(s,o,a){r.get(s)[o]=a}function i(){r=new WeakMap}return{get:t,remove:e,update:n,dispose:i}}function ep(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.z!==t.z?r.z-t.z:r.id-t.id}function Do(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function zo(){let r=[],t=0,e=[],n=[],i=[];function s(){t=0,e.length=0,n.length=0,i.length=0}function o(h,d,m,g,u,f){let _=r[t];return _===void 0?(_={id:h.id,object:h,geometry:d,material:m,groupOrder:g,renderOrder:h.renderOrder,z:u,group:f},r[t]=_):(_.id=h.id,_.object=h,_.geometry=d,_.material=m,_.groupOrder=g,_.renderOrder=h.renderOrder,_.z=u,_.group=f),t++,_}function a(h,d,m,g,u,f){let _=o(h,d,m,g,u,f);m.transmission>0?n.push(_):m.transparent===!0?i.push(_):e.push(_)}function c(h,d,m,g,u,f){let _=o(h,d,m,g,u,f);m.transmission>0?n.unshift(_):m.transparent===!0?i.unshift(_):e.unshift(_)}function l(h,d){e.length>1&&e.sort(h||ep),n.length>1&&n.sort(d||Do),i.length>1&&i.sort(d||Do)}function p(){for(let h=t,d=r.length;h<d;h++){let m=r[h];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:n,transparent:i,init:s,push:a,unshift:c,finish:p,sort:l}}function np(){let r=new WeakMap;function t(n,i){let s=r.get(n),o;return s===void 0?(o=new zo,r.set(n,[o])):i>=s.length?(o=new zo,s.push(o)):o=s[i],o}function e(){r=new WeakMap}return{get:t,dispose:e}}function ip(){let r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new H,color:new Xt};break;case"SpotLight":e={position:new H,direction:new H,color:new Xt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new H,color:new Xt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new H,skyColor:new Xt,groundColor:new Xt};break;case"RectAreaLight":e={color:new Xt,position:new H,halfWidth:new H,halfHeight:new H};break}return r[t.id]=e,e}}}function sp(){let r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Dt};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Dt};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Dt,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=e,e}}}var rp=0;function ap(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function op(r,t){let e=new ip,n=sp(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0};for(let p=0;p<9;p++)i.probe.push(new H);let s=new H,o=new Qt,a=new Qt;function c(p,h){let d=0,m=0,g=0;for(let N=0;N<9;N++)i.probe[N].set(0,0,0);let u=0,f=0,_=0,y=0,M=0,w=0,S=0,D=0,T=0,b=0;p.sort(ap);let L=h!==!0?Math.PI:1;for(let N=0,v=p.length;N<v;N++){let O=p[N],B=O.color,F=O.intensity,$=O.distance,q=O.shadow&&O.shadow.map?O.shadow.map.texture:null;if(O.isAmbientLight)d+=B.r*F*L,m+=B.g*F*L,g+=B.b*F*L;else if(O.isLightProbe)for(let j=0;j<9;j++)i.probe[j].addScaledVector(O.sh.coefficients[j],F);else if(O.isDirectionalLight){let j=e.get(O);if(j.color.copy(O.color).multiplyScalar(O.intensity*L),O.castShadow){let P=O.shadow,R=n.get(O);R.shadowBias=P.bias,R.shadowNormalBias=P.normalBias,R.shadowRadius=P.radius,R.shadowMapSize=P.mapSize,i.directionalShadow[u]=R,i.directionalShadowMap[u]=q,i.directionalShadowMatrix[u]=O.shadow.matrix,w++}i.directional[u]=j,u++}else if(O.isSpotLight){let j=e.get(O);j.position.setFromMatrixPosition(O.matrixWorld),j.color.copy(B).multiplyScalar(F*L),j.distance=$,j.coneCos=Math.cos(O.angle),j.penumbraCos=Math.cos(O.angle*(1-O.penumbra)),j.decay=O.decay,i.spot[_]=j;let P=O.shadow;if(O.map&&(i.spotLightMap[T]=O.map,T++,P.updateMatrices(O),O.castShadow&&b++),i.spotLightMatrix[_]=P.matrix,O.castShadow){let R=n.get(O);R.shadowBias=P.bias,R.shadowNormalBias=P.normalBias,R.shadowRadius=P.radius,R.shadowMapSize=P.mapSize,i.spotShadow[_]=R,i.spotShadowMap[_]=q,D++}_++}else if(O.isRectAreaLight){let j=e.get(O);j.color.copy(B).multiplyScalar(F),j.halfWidth.set(O.width*.5,0,0),j.halfHeight.set(0,O.height*.5,0),i.rectArea[y]=j,y++}else if(O.isPointLight){let j=e.get(O);if(j.color.copy(O.color).multiplyScalar(O.intensity*L),j.distance=O.distance,j.decay=O.decay,O.castShadow){let P=O.shadow,R=n.get(O);R.shadowBias=P.bias,R.shadowNormalBias=P.normalBias,R.shadowRadius=P.radius,R.shadowMapSize=P.mapSize,R.shadowCameraNear=P.camera.near,R.shadowCameraFar=P.camera.far,i.pointShadow[f]=R,i.pointShadowMap[f]=q,i.pointShadowMatrix[f]=O.shadow.matrix,S++}i.point[f]=j,f++}else if(O.isHemisphereLight){let j=e.get(O);j.skyColor.copy(O.color).multiplyScalar(F*L),j.groundColor.copy(O.groundColor).multiplyScalar(F*L),i.hemi[M]=j,M++}}y>0&&(t.isWebGL2||r.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=mt.LTC_FLOAT_1,i.rectAreaLTC2=mt.LTC_FLOAT_2):r.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=mt.LTC_HALF_1,i.rectAreaLTC2=mt.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=d,i.ambient[1]=m,i.ambient[2]=g;let E=i.hash;(E.directionalLength!==u||E.pointLength!==f||E.spotLength!==_||E.rectAreaLength!==y||E.hemiLength!==M||E.numDirectionalShadows!==w||E.numPointShadows!==S||E.numSpotShadows!==D||E.numSpotMaps!==T)&&(i.directional.length=u,i.spot.length=_,i.rectArea.length=y,i.point.length=f,i.hemi.length=M,i.directionalShadow.length=w,i.directionalShadowMap.length=w,i.pointShadow.length=S,i.pointShadowMap.length=S,i.spotShadow.length=D,i.spotShadowMap.length=D,i.directionalShadowMatrix.length=w,i.pointShadowMatrix.length=S,i.spotLightMatrix.length=D+T-b,i.spotLightMap.length=T,i.numSpotLightShadowsWithMaps=b,E.directionalLength=u,E.pointLength=f,E.spotLength=_,E.rectAreaLength=y,E.hemiLength=M,E.numDirectionalShadows=w,E.numPointShadows=S,E.numSpotShadows=D,E.numSpotMaps=T,i.version=rp++)}function l(p,h){let d=0,m=0,g=0,u=0,f=0,_=h.matrixWorldInverse;for(let y=0,M=p.length;y<M;y++){let w=p[y];if(w.isDirectionalLight){let S=i.directional[d];S.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(_),d++}else if(w.isSpotLight){let S=i.spot[g];S.position.setFromMatrixPosition(w.matrixWorld),S.position.applyMatrix4(_),S.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(_),g++}else if(w.isRectAreaLight){let S=i.rectArea[u];S.position.setFromMatrixPosition(w.matrixWorld),S.position.applyMatrix4(_),a.identity(),o.copy(w.matrixWorld),o.premultiply(_),a.extractRotation(o),S.halfWidth.set(w.width*.5,0,0),S.halfHeight.set(0,w.height*.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),u++}else if(w.isPointLight){let S=i.point[m];S.position.setFromMatrixPosition(w.matrixWorld),S.position.applyMatrix4(_),m++}else if(w.isHemisphereLight){let S=i.hemi[f];S.direction.setFromMatrixPosition(w.matrixWorld),S.direction.transformDirection(_),f++}}}return{setup:c,setupView:l,state:i}}function ko(r,t){let e=new op(r,t),n=[],i=[];function s(){n.length=0,i.length=0}function o(h){n.push(h)}function a(h){i.push(h)}function c(h){e.setup(n,h)}function l(h){e.setupView(n,h)}return{init:s,state:{lightsArray:n,shadowsArray:i,lights:e},setupLights:c,setupLightsView:l,pushLight:o,pushShadow:a}}function lp(r,t){let e=new WeakMap;function n(s,o=0){let a=e.get(s),c;return a===void 0?(c=new ko(r,t),e.set(s,[c])):o>=a.length?(c=new ko(r,t),a.push(c)):c=a[o],c}function i(){e=new WeakMap}return{get:n,dispose:i}}var Wr=class extends xi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=_c,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Hr=class extends xi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.referencePosition=new H,this.nearDistance=1,this.farDistance=1e3,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.referencePosition.copy(t.referencePosition),this.nearDistance=t.nearDistance,this.farDistance=t.farDistance,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},cp=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,hp=`uniform sampler2D shadow_pass;
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
}`;function up(r,t,e){let n=new Es,i=new Dt,s=new Dt,o=new Zt,a=new Wr({depthPacking:xc}),c=new Hr,l={},p=e.maxTextureSize,h={0:Ie,1:pi,2:Xe},d=new ve({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Dt},radius:{value:4}},vertexShader:cp,fragmentShader:hp}),m=d.clone();m.defines.HORIZONTAL_PASS=1;let g=new ze;g.setAttribute("position",new Te(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let u=new ae(g,d),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Fo,this.render=function(w,S,D){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||w.length===0)return;let T=r.getRenderTarget(),b=r.getActiveCubeFace(),L=r.getActiveMipmapLevel(),E=r.state;E.setBlending(Mn),E.buffers.color.setClear(1,1,1,1),E.buffers.depth.setTest(!0),E.setScissorTest(!1);for(let N=0,v=w.length;N<v;N++){let O=w[N],B=O.shadow;if(B===void 0){console.warn("THREE.WebGLShadowMap:",O,"has no shadow.");continue}if(B.autoUpdate===!1&&B.needsUpdate===!1)continue;i.copy(B.mapSize);let F=B.getFrameExtents();if(i.multiply(F),s.copy(B.mapSize),(i.x>p||i.y>p)&&(i.x>p&&(s.x=Math.floor(p/F.x),i.x=s.x*F.x,B.mapSize.x=s.x),i.y>p&&(s.y=Math.floor(p/F.y),i.y=s.y*F.y,B.mapSize.y=s.y)),B.map===null){let q=this.type!==zi?{minFilter:Kt,magFilter:Kt}:{};B.map=new We(i.x,i.y,q),B.map.texture.name=O.name+".shadowMap",B.camera.updateProjectionMatrix()}r.setRenderTarget(B.map),r.clear();let $=B.getViewportCount();for(let q=0;q<$;q++){let j=B.getViewport(q);o.set(s.x*j.x,s.y*j.y,s.x*j.z,s.y*j.w),E.viewport(o),B.updateMatrices(O,q),n=B.getFrustum(),M(S,D,B.camera,O,this.type)}B.isPointLightShadow!==!0&&this.type===zi&&_(B,D),B.needsUpdate=!1}f.needsUpdate=!1,r.setRenderTarget(T,b,L)};function _(w,S){let D=t.update(u);d.defines.VSM_SAMPLES!==w.blurSamples&&(d.defines.VSM_SAMPLES=w.blurSamples,m.defines.VSM_SAMPLES=w.blurSamples,d.needsUpdate=!0,m.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new We(i.x,i.y)),d.uniforms.shadow_pass.value=w.map.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,r.setRenderTarget(w.mapPass),r.clear(),r.renderBufferDirect(S,null,D,d,u,null),m.uniforms.shadow_pass.value=w.mapPass.texture,m.uniforms.resolution.value=w.mapSize,m.uniforms.radius.value=w.radius,r.setRenderTarget(w.map),r.clear(),r.renderBufferDirect(S,null,D,m,u,null)}function y(w,S,D,T,b,L){let E=null,N=D.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(N!==void 0?E=N:E=D.isPointLight===!0?c:a,r.localClippingEnabled&&S.clipShadows===!0&&Array.isArray(S.clippingPlanes)&&S.clippingPlanes.length!==0||S.displacementMap&&S.displacementScale!==0||S.alphaMap&&S.alphaTest>0){let v=E.uuid,O=S.uuid,B=l[v];B===void 0&&(B={},l[v]=B);let F=B[O];F===void 0&&(F=E.clone(),B[O]=F),E=F}return E.visible=S.visible,E.wireframe=S.wireframe,L===zi?E.side=S.shadowSide!==null?S.shadowSide:S.side:E.side=S.shadowSide!==null?S.shadowSide:h[S.side],E.alphaMap=S.alphaMap,E.alphaTest=S.alphaTest,E.clipShadows=S.clipShadows,E.clippingPlanes=S.clippingPlanes,E.clipIntersection=S.clipIntersection,E.displacementMap=S.displacementMap,E.displacementScale=S.displacementScale,E.displacementBias=S.displacementBias,E.wireframeLinewidth=S.wireframeLinewidth,E.linewidth=S.linewidth,D.isPointLight===!0&&E.isMeshDistanceMaterial===!0&&(E.referencePosition.setFromMatrixPosition(D.matrixWorld),E.nearDistance=T,E.farDistance=b),E}function M(w,S,D,T,b){if(w.visible===!1)return;if(w.layers.test(S.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&b===zi)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,w.matrixWorld);let N=t.update(w),v=w.material;if(Array.isArray(v)){let O=N.groups;for(let B=0,F=O.length;B<F;B++){let $=O[B],q=v[$.materialIndex];if(q&&q.visible){let j=y(w,q,T,D.near,D.far,b);r.renderBufferDirect(D,null,N,j,w,$)}}}else if(v.visible){let O=y(w,v,T,D.near,D.far,b);r.renderBufferDirect(D,null,N,O,w,null)}}let E=w.children;for(let N=0,v=E.length;N<v;N++)M(E[N],S,D,T,b)}}function dp(r,t,e){let n=e.isWebGL2;function i(){let W=!1,vt=new Zt,gt=null,lt=new Zt(0,0,0,0);return{setMask:function(_t){gt!==_t&&!W&&(r.colorMask(_t,_t,_t,_t),gt=_t)},setLocked:function(_t){W=_t},setClear:function(_t,Pt,qt,$t,fn){fn===!0&&(_t*=$t,Pt*=$t,qt*=$t),vt.set(_t,Pt,qt,$t),lt.equals(vt)===!1&&(r.clearColor(_t,Pt,qt,$t),lt.copy(vt))},reset:function(){W=!1,gt=null,lt.set(-1,0,0,0)}}}function s(){let W=!1,vt=null,gt=null,lt=null;return{setTest:function(_t){_t?At(2929):Mt(2929)},setMask:function(_t){vt!==_t&&!W&&(r.depthMask(_t),vt=_t)},setFunc:function(_t){if(gt!==_t){switch(_t){case Vl:r.depthFunc(512);break;case Wl:r.depthFunc(519);break;case Hl:r.depthFunc(513);break;case Mr:r.depthFunc(515);break;case Gl:r.depthFunc(514);break;case ql:r.depthFunc(518);break;case Xl:r.depthFunc(516);break;case Zl:r.depthFunc(517);break;default:r.depthFunc(515)}gt=_t}},setLocked:function(_t){W=_t},setClear:function(_t){lt!==_t&&(r.clearDepth(_t),lt=_t)},reset:function(){W=!1,vt=null,gt=null,lt=null}}}function o(){let W=!1,vt=null,gt=null,lt=null,_t=null,Pt=null,qt=null,$t=null,fn=null;return{setTest:function(Yt){W||(Yt?At(2960):Mt(2960))},setMask:function(Yt){vt!==Yt&&!W&&(r.stencilMask(Yt),vt=Yt)},setFunc:function(Yt,Ke,Ce){(gt!==Yt||lt!==Ke||_t!==Ce)&&(r.stencilFunc(Yt,Ke,Ce),gt=Yt,lt=Ke,_t=Ce)},setOp:function(Yt,Ke,Ce){(Pt!==Yt||qt!==Ke||$t!==Ce)&&(r.stencilOp(Yt,Ke,Ce),Pt=Yt,qt=Ke,$t=Ce)},setLocked:function(Yt){W=Yt},setClear:function(Yt){fn!==Yt&&(r.clearStencil(Yt),fn=Yt)},reset:function(){W=!1,vt=null,gt=null,lt=null,_t=null,Pt=null,qt=null,$t=null,fn=null}}}let a=new i,c=new s,l=new o,p=new WeakMap,h=new WeakMap,d={},m={},g=new WeakMap,u=[],f=null,_=!1,y=null,M=null,w=null,S=null,D=null,T=null,b=null,L=!1,E=null,N=null,v=null,O=null,B=null,F=r.getParameter(35661),$=!1,q=0,j=r.getParameter(7938);j.indexOf("WebGL")!==-1?(q=parseFloat(/^WebGL (\d)/.exec(j)[1]),$=q>=1):j.indexOf("OpenGL ES")!==-1&&(q=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),$=q>=2);let P=null,R={},it=r.getParameter(3088),Y=r.getParameter(2978),Q=new Zt().fromArray(it),ft=new Zt().fromArray(Y);function Et(W,vt,gt){let lt=new Uint8Array(4),_t=r.createTexture();r.bindTexture(W,_t),r.texParameteri(W,10241,9728),r.texParameteri(W,10240,9728);for(let Pt=0;Pt<gt;Pt++)r.texImage2D(vt+Pt,0,6408,1,1,0,6408,5121,lt);return _t}let nt={};nt[3553]=Et(3553,3553,1),nt[34067]=Et(34067,34069,6),a.setClear(0,0,0,1),c.setClear(1),l.setClear(0),At(2929),c.setFunc(Mr),I(!1),V(Ma),At(2884),tt(Mn);function At(W){d[W]!==!0&&(r.enable(W),d[W]=!0)}function Mt(W){d[W]!==!1&&(r.disable(W),d[W]=!1)}function bt(W,vt){return m[W]!==vt?(r.bindFramebuffer(W,vt),m[W]=vt,n&&(W===36009&&(m[36160]=vt),W===36160&&(m[36009]=vt)),!0):!1}function xt(W,vt){let gt=u,lt=!1;if(W)if(gt=g.get(vt),gt===void 0&&(gt=[],g.set(vt,gt)),W.isWebGLMultipleRenderTargets){let _t=W.texture;if(gt.length!==_t.length||gt[0]!==36064){for(let Pt=0,qt=_t.length;Pt<qt;Pt++)gt[Pt]=36064+Pt;gt.length=_t.length,lt=!0}}else gt[0]!==36064&&(gt[0]=36064,lt=!0);else gt[0]!==1029&&(gt[0]=1029,lt=!0);lt&&(e.isWebGL2?r.drawBuffers(gt):t.get("WEBGL_draw_buffers").drawBuffersWEBGL(gt))}function zt(W){return f!==W?(r.useProgram(W),f=W,!0):!1}let x={[li]:32774,[Pl]:32778,[Rl]:32779};if(n)x[Ta]=32775,x[Ca]=32776;else{let W=t.get("EXT_blend_minmax");W!==null&&(x[Ta]=W.MIN_EXT,x[Ca]=W.MAX_EXT)}let X={[Il]:0,[Dl]:1,[zl]:768,[Uo]:770,[Bl]:776,[Fl]:774,[Ol]:772,[kl]:769,[Bo]:771,[Ul]:775,[Nl]:773};function tt(W,vt,gt,lt,_t,Pt,qt,$t){if(W===Mn){_===!0&&(Mt(3042),_=!1);return}if(_===!1&&(At(3042),_=!0),W!==Ll){if(W!==y||$t!==L){if((M!==li||D!==li)&&(r.blendEquation(32774),M=li,D=li),$t)switch(W){case ui:r.blendFuncSeparate(1,771,1,771);break;case Sa:r.blendFunc(1,1);break;case Ea:r.blendFuncSeparate(0,769,0,1);break;case Aa:r.blendFuncSeparate(0,768,0,770);break;default:console.error("THREE.WebGLState: Invalid blending: ",W);break}else switch(W){case ui:r.blendFuncSeparate(770,771,1,771);break;case Sa:r.blendFunc(770,1);break;case Ea:r.blendFuncSeparate(0,769,0,1);break;case Aa:r.blendFunc(0,768);break;default:console.error("THREE.WebGLState: Invalid blending: ",W);break}w=null,S=null,T=null,b=null,y=W,L=$t}return}_t=_t||vt,Pt=Pt||gt,qt=qt||lt,(vt!==M||_t!==D)&&(r.blendEquationSeparate(x[vt],x[_t]),M=vt,D=_t),(gt!==w||lt!==S||Pt!==T||qt!==b)&&(r.blendFuncSeparate(X[gt],X[lt],X[Pt],X[qt]),w=gt,S=lt,T=Pt,b=qt),y=W,L=null}function k(W,vt){W.side===Xe?Mt(2884):At(2884);let gt=W.side===Ie;vt&&(gt=!gt),I(gt),W.blending===ui&&W.transparent===!1?tt(Mn):tt(W.blending,W.blendEquation,W.blendSrc,W.blendDst,W.blendEquationAlpha,W.blendSrcAlpha,W.blendDstAlpha,W.premultipliedAlpha),c.setFunc(W.depthFunc),c.setTest(W.depthTest),c.setMask(W.depthWrite),a.setMask(W.colorWrite);let lt=W.stencilWrite;l.setTest(lt),lt&&(l.setMask(W.stencilWriteMask),l.setFunc(W.stencilFunc,W.stencilRef,W.stencilFuncMask),l.setOp(W.stencilFail,W.stencilZFail,W.stencilZPass)),st(W.polygonOffset,W.polygonOffsetFactor,W.polygonOffsetUnits),W.alphaToCoverage===!0?At(32926):Mt(32926)}function I(W){E!==W&&(W?r.frontFace(2304):r.frontFace(2305),E=W)}function V(W){W!==Al?(At(2884),W!==N&&(W===Ma?r.cullFace(1029):W===Tl?r.cullFace(1028):r.cullFace(1032))):Mt(2884),N=W}function rt(W){W!==v&&($&&r.lineWidth(W),v=W)}function st(W,vt,gt){W?(At(32823),(O!==vt||B!==gt)&&(r.polygonOffset(vt,gt),O=vt,B=gt)):Mt(32823)}function Z(W){W?At(3089):Mt(3089)}function ut(W){W===void 0&&(W=33984+F-1),P!==W&&(r.activeTexture(W),P=W)}function C(W,vt,gt){gt===void 0&&(P===null?gt=33984+F-1:gt=P);let lt=R[gt];lt===void 0&&(lt={type:void 0,texture:void 0},R[gt]=lt),(lt.type!==W||lt.texture!==vt)&&(P!==gt&&(r.activeTexture(gt),P=gt),r.bindTexture(W,vt||nt[W]),lt.type=W,lt.texture=vt)}function A(){let W=R[P];W!==void 0&&W.type!==void 0&&(r.bindTexture(W.type,null),W.type=void 0,W.texture=void 0)}function G(){try{r.compressedTexImage2D.apply(r,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function ot(){try{r.texSubImage2D.apply(r,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function ht(){try{r.texSubImage3D.apply(r,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function pt(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function Tt(){try{r.texStorage2D.apply(r,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function U(){try{r.texStorage3D.apply(r,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function J(){try{r.texImage2D.apply(r,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function dt(){try{r.texImage3D.apply(r,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function wt(W){Q.equals(W)===!1&&(r.scissor(W.x,W.y,W.z,W.w),Q.copy(W))}function yt(W){ft.equals(W)===!1&&(r.viewport(W.x,W.y,W.z,W.w),ft.copy(W))}function St(W,vt){let gt=h.get(vt);gt===void 0&&(gt=new WeakMap,h.set(vt,gt));let lt=gt.get(W);lt===void 0&&(lt=r.getUniformBlockIndex(vt,W.name),gt.set(W,lt))}function Lt(W,vt){let lt=h.get(vt).get(W);p.get(W)!==lt&&(r.uniformBlockBinding(vt,lt,W.__bindingPointIndex),p.set(W,lt))}function Ft(){r.disable(3042),r.disable(2884),r.disable(2929),r.disable(32823),r.disable(3089),r.disable(2960),r.disable(32926),r.blendEquation(32774),r.blendFunc(1,0),r.blendFuncSeparate(1,0,1,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(513),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(519,0,4294967295),r.stencilOp(7680,7680,7680),r.clearStencil(0),r.cullFace(1029),r.frontFace(2305),r.polygonOffset(0,0),r.activeTexture(33984),r.bindFramebuffer(36160,null),n===!0&&(r.bindFramebuffer(36009,null),r.bindFramebuffer(36008,null)),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),d={},P=null,R={},m={},g=new WeakMap,u=[],f=null,_=!1,y=null,M=null,w=null,S=null,D=null,T=null,b=null,L=!1,E=null,N=null,v=null,O=null,B=null,Q.set(0,0,r.canvas.width,r.canvas.height),ft.set(0,0,r.canvas.width,r.canvas.height),a.reset(),c.reset(),l.reset()}return{buffers:{color:a,depth:c,stencil:l},enable:At,disable:Mt,bindFramebuffer:bt,drawBuffers:xt,useProgram:zt,setBlending:tt,setMaterial:k,setFlipSided:I,setCullFace:V,setLineWidth:rt,setPolygonOffset:st,setScissorTest:Z,activeTexture:ut,bindTexture:C,unbindTexture:A,compressedTexImage2D:G,texImage2D:J,texImage3D:dt,updateUBOMapping:St,uniformBlockBinding:Lt,texStorage2D:Tt,texStorage3D:U,texSubImage2D:ot,texSubImage3D:ht,compressedTexSubImage2D:pt,scissor:wt,viewport:yt,reset:Ft}}function fp(r,t,e,n,i,s,o){let a=i.isWebGL2,c=i.maxTextures,l=i.maxCubemapSize,p=i.maxTextureSize,h=i.maxSamples,d=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,m=/OculusBrowser/g.test(navigator.userAgent),g=new WeakMap,u,f=new WeakMap,_=!1;try{_=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch(C){}function y(C,A){return _?new OffscreenCanvas(C,A):_s("canvas")}function M(C,A,G,ot){let ht=1;if((C.width>ot||C.height>ot)&&(ht=ot/Math.max(C.width,C.height)),ht<1||A===!0)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap){let pt=A?gs:Math.floor,Tt=pt(ht*C.width),U=pt(ht*C.height);u===void 0&&(u=y(Tt,U));let J=G?y(Tt,U):u;return J.width=Tt,J.height=U,J.getContext("2d").drawImage(C,0,0,Tt,U),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+C.width+"x"+C.height+") to ("+Tt+"x"+U+")."),J}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+C.width+"x"+C.height+")."),C;return C}function w(C){return Pr(C.width)&&Pr(C.height)}function S(C){return a?!1:C.wrapS!==ye||C.wrapT!==ye||C.minFilter!==Kt&&C.minFilter!==Re}function D(C,A){return C.generateMipmaps&&A&&C.minFilter!==Kt&&C.minFilter!==Re}function T(C){r.generateMipmap(C)}function b(C,A,G,ot,ht=!1){if(a===!1)return A;if(C!==null){if(r[C]!==void 0)return r[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let pt=A;return A===6403&&(G===5126&&(pt=33326),G===5131&&(pt=33325),G===5121&&(pt=33321)),A===33319&&(G===5126&&(pt=33328),G===5131&&(pt=33327),G===5121&&(pt=33323)),A===6408&&(G===5126&&(pt=34836),G===5131&&(pt=34842),G===5121&&(pt=ot===jt&&ht===!1?35907:32856),G===32819&&(pt=32854),G===32820&&(pt=32855)),(pt===33325||pt===33326||pt===33327||pt===33328||pt===34842||pt===34836)&&t.get("EXT_color_buffer_float"),pt}function L(C,A,G){return D(C,G)===!0||C.isFramebufferTexture&&C.minFilter!==Kt&&C.minFilter!==Re?Math.log2(Math.max(A.width,A.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?A.mipmaps.length:1}function E(C){return C===Kt||C===La||C===Pa?9728:9729}function N(C){let A=C.target;A.removeEventListener("dispose",N),O(A),A.isVideoTexture&&g.delete(A)}function v(C){let A=C.target;A.removeEventListener("dispose",v),F(A)}function O(C){let A=n.get(C);if(A.__webglInit===void 0)return;let G=C.source,ot=f.get(G);if(ot){let ht=ot[A.__cacheKey];ht.usedTimes--,ht.usedTimes===0&&B(C),Object.keys(ot).length===0&&f.delete(G)}n.remove(C)}function B(C){let A=n.get(C);r.deleteTexture(A.__webglTexture);let G=C.source,ot=f.get(G);delete ot[A.__cacheKey],o.memory.textures--}function F(C){let A=C.texture,G=n.get(C),ot=n.get(A);if(ot.__webglTexture!==void 0&&(r.deleteTexture(ot.__webglTexture),o.memory.textures--),C.depthTexture&&C.depthTexture.dispose(),C.isWebGLCubeRenderTarget)for(let ht=0;ht<6;ht++)r.deleteFramebuffer(G.__webglFramebuffer[ht]),G.__webglDepthbuffer&&r.deleteRenderbuffer(G.__webglDepthbuffer[ht]);else{if(r.deleteFramebuffer(G.__webglFramebuffer),G.__webglDepthbuffer&&r.deleteRenderbuffer(G.__webglDepthbuffer),G.__webglMultisampledFramebuffer&&r.deleteFramebuffer(G.__webglMultisampledFramebuffer),G.__webglColorRenderbuffer)for(let ht=0;ht<G.__webglColorRenderbuffer.length;ht++)G.__webglColorRenderbuffer[ht]&&r.deleteRenderbuffer(G.__webglColorRenderbuffer[ht]);G.__webglDepthRenderbuffer&&r.deleteRenderbuffer(G.__webglDepthRenderbuffer)}if(C.isWebGLMultipleRenderTargets)for(let ht=0,pt=A.length;ht<pt;ht++){let Tt=n.get(A[ht]);Tt.__webglTexture&&(r.deleteTexture(Tt.__webglTexture),o.memory.textures--),n.remove(A[ht])}n.remove(A),n.remove(C)}let $=0;function q(){$=0}function j(){let C=$;return C>=c&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+c),$+=1,C}function P(C){let A=[];return A.push(C.wrapS),A.push(C.wrapT),A.push(C.magFilter),A.push(C.minFilter),A.push(C.anisotropy),A.push(C.internalFormat),A.push(C.format),A.push(C.type),A.push(C.generateMipmaps),A.push(C.premultiplyAlpha),A.push(C.flipY),A.push(C.unpackAlignment),A.push(C.encoding),A.join()}function R(C,A){let G=n.get(C);if(C.isVideoTexture&&Z(C),C.isRenderTargetTexture===!1&&C.version>0&&G.__version!==C.version){let ot=C.image;if(ot===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ot.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Mt(G,C,A);return}}e.bindTexture(3553,G.__webglTexture,33984+A)}function it(C,A){let G=n.get(C);if(C.version>0&&G.__version!==C.version){Mt(G,C,A);return}e.bindTexture(35866,G.__webglTexture,33984+A)}function Y(C,A){let G=n.get(C);if(C.version>0&&G.__version!==C.version){Mt(G,C,A);return}e.bindTexture(32879,G.__webglTexture,33984+A)}function Q(C,A){let G=n.get(C);if(C.version>0&&G.__version!==C.version){bt(G,C,A);return}e.bindTexture(34067,G.__webglTexture,33984+A)}let ft={[Ar]:10497,[ye]:33071,[Tr]:33648},Et={[Kt]:9728,[La]:9984,[Pa]:9986,[Re]:9729,[ec]:9985,[Rs]:9987};function nt(C,A,G){if(G?(r.texParameteri(C,10242,ft[A.wrapS]),r.texParameteri(C,10243,ft[A.wrapT]),(C===32879||C===35866)&&r.texParameteri(C,32882,ft[A.wrapR]),r.texParameteri(C,10240,Et[A.magFilter]),r.texParameteri(C,10241,Et[A.minFilter])):(r.texParameteri(C,10242,33071),r.texParameteri(C,10243,33071),(C===32879||C===35866)&&r.texParameteri(C,32882,33071),(A.wrapS!==ye||A.wrapT!==ye)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),r.texParameteri(C,10240,E(A.magFilter)),r.texParameteri(C,10241,E(A.minFilter)),A.minFilter!==Kt&&A.minFilter!==Re&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),t.has("EXT_texture_filter_anisotropic")===!0){let ot=t.get("EXT_texture_filter_anisotropic");if(A.type===Ze&&t.has("OES_texture_float_linear")===!1||a===!1&&A.type===Ui&&t.has("OES_texture_half_float_linear")===!1)return;(A.anisotropy>1||n.get(A).__currentAnisotropy)&&(r.texParameterf(C,ot.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,i.getMaxAnisotropy())),n.get(A).__currentAnisotropy=A.anisotropy)}}function At(C,A){let G=!1;C.__webglInit===void 0&&(C.__webglInit=!0,A.addEventListener("dispose",N));let ot=A.source,ht=f.get(ot);ht===void 0&&(ht={},f.set(ot,ht));let pt=P(A);if(pt!==C.__cacheKey){ht[pt]===void 0&&(ht[pt]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,G=!0),ht[pt].usedTimes++;let Tt=ht[C.__cacheKey];Tt!==void 0&&(ht[C.__cacheKey].usedTimes--,Tt.usedTimes===0&&B(A)),C.__cacheKey=pt,C.__webglTexture=ht[pt].texture}return G}function Mt(C,A,G){let ot=3553;A.isDataArrayTexture&&(ot=35866),A.isData3DTexture&&(ot=32879);let ht=At(C,A),pt=A.source;e.bindTexture(ot,C.__webglTexture,33984+G);let Tt=n.get(pt);if(pt.version!==Tt.__version||ht===!0){e.activeTexture(33984+G),r.pixelStorei(37440,A.flipY),r.pixelStorei(37441,A.premultiplyAlpha),r.pixelStorei(3317,A.unpackAlignment),r.pixelStorei(37443,0);let U=S(A)&&w(A.image)===!1,J=M(A.image,U,!1,p);J=ut(A,J);let dt=w(J)||a,wt=s.convert(A.format,A.encoding),yt=s.convert(A.type),St=b(A.internalFormat,wt,yt,A.encoding,A.isVideoTexture);nt(ot,A,dt);let Lt,Ft=A.mipmaps,W=a&&A.isVideoTexture!==!0,vt=Tt.__version===void 0||ht===!0,gt=L(A,J,dt);if(A.isDepthTexture)St=6402,a?A.type===Ze?St=36012:A.type===Rn?St=33190:A.type===di?St=35056:St=33189:A.type===Ze&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),A.format===Dn&&St===6402&&A.type!==Ho&&A.type!==Rn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),A.type=Rn,yt=s.convert(A.type)),A.format===_i&&St===6402&&(St=34041,A.type!==di&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),A.type=di,yt=s.convert(A.type))),vt&&(W?e.texStorage2D(3553,1,St,J.width,J.height):e.texImage2D(3553,0,St,J.width,J.height,0,wt,yt,null));else if(A.isDataTexture)if(Ft.length>0&&dt){W&&vt&&e.texStorage2D(3553,gt,St,Ft[0].width,Ft[0].height);for(let lt=0,_t=Ft.length;lt<_t;lt++)Lt=Ft[lt],W?e.texSubImage2D(3553,lt,0,0,Lt.width,Lt.height,wt,yt,Lt.data):e.texImage2D(3553,lt,St,Lt.width,Lt.height,0,wt,yt,Lt.data);A.generateMipmaps=!1}else W?(vt&&e.texStorage2D(3553,gt,St,J.width,J.height),e.texSubImage2D(3553,0,0,0,J.width,J.height,wt,yt,J.data)):e.texImage2D(3553,0,St,J.width,J.height,0,wt,yt,J.data);else if(A.isCompressedTexture){W&&vt&&e.texStorage2D(3553,gt,St,Ft[0].width,Ft[0].height);for(let lt=0,_t=Ft.length;lt<_t;lt++)Lt=Ft[lt],A.format!==Ae?wt!==null?W?e.compressedTexSubImage2D(3553,lt,0,0,Lt.width,Lt.height,wt,Lt.data):e.compressedTexImage2D(3553,lt,St,Lt.width,Lt.height,0,Lt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):W?e.texSubImage2D(3553,lt,0,0,Lt.width,Lt.height,wt,yt,Lt.data):e.texImage2D(3553,lt,St,Lt.width,Lt.height,0,wt,yt,Lt.data)}else if(A.isDataArrayTexture)W?(vt&&e.texStorage3D(35866,gt,St,J.width,J.height,J.depth),e.texSubImage3D(35866,0,0,0,0,J.width,J.height,J.depth,wt,yt,J.data)):e.texImage3D(35866,0,St,J.width,J.height,J.depth,0,wt,yt,J.data);else if(A.isData3DTexture)W?(vt&&e.texStorage3D(32879,gt,St,J.width,J.height,J.depth),e.texSubImage3D(32879,0,0,0,0,J.width,J.height,J.depth,wt,yt,J.data)):e.texImage3D(32879,0,St,J.width,J.height,J.depth,0,wt,yt,J.data);else if(A.isFramebufferTexture){if(vt)if(W)e.texStorage2D(3553,gt,St,J.width,J.height);else{let lt=J.width,_t=J.height;for(let Pt=0;Pt<gt;Pt++)e.texImage2D(3553,Pt,St,lt,_t,0,wt,yt,null),lt>>=1,_t>>=1}}else if(Ft.length>0&&dt){W&&vt&&e.texStorage2D(3553,gt,St,Ft[0].width,Ft[0].height);for(let lt=0,_t=Ft.length;lt<_t;lt++)Lt=Ft[lt],W?e.texSubImage2D(3553,lt,0,0,wt,yt,Lt):e.texImage2D(3553,lt,St,wt,yt,Lt);A.generateMipmaps=!1}else W?(vt&&e.texStorage2D(3553,gt,St,J.width,J.height),e.texSubImage2D(3553,0,0,0,wt,yt,J)):e.texImage2D(3553,0,St,wt,yt,J);D(A,dt)&&T(ot),Tt.__version=pt.version,A.onUpdate&&A.onUpdate(A)}C.__version=A.version}function bt(C,A,G){if(A.image.length!==6)return;let ot=At(C,A),ht=A.source;e.bindTexture(34067,C.__webglTexture,33984+G);let pt=n.get(ht);if(ht.version!==pt.__version||ot===!0){e.activeTexture(33984+G),r.pixelStorei(37440,A.flipY),r.pixelStorei(37441,A.premultiplyAlpha),r.pixelStorei(3317,A.unpackAlignment),r.pixelStorei(37443,0);let Tt=A.isCompressedTexture||A.image[0].isCompressedTexture,U=A.image[0]&&A.image[0].isDataTexture,J=[];for(let lt=0;lt<6;lt++)!Tt&&!U?J[lt]=M(A.image[lt],!1,!0,l):J[lt]=U?A.image[lt].image:A.image[lt],J[lt]=ut(A,J[lt]);let dt=J[0],wt=w(dt)||a,yt=s.convert(A.format,A.encoding),St=s.convert(A.type),Lt=b(A.internalFormat,yt,St,A.encoding),Ft=a&&A.isVideoTexture!==!0,W=pt.__version===void 0||ot===!0,vt=L(A,dt,wt);nt(34067,A,wt);let gt;if(Tt){Ft&&W&&e.texStorage2D(34067,vt,Lt,dt.width,dt.height);for(let lt=0;lt<6;lt++){gt=J[lt].mipmaps;for(let _t=0;_t<gt.length;_t++){let Pt=gt[_t];A.format!==Ae?yt!==null?Ft?e.compressedTexSubImage2D(34069+lt,_t,0,0,Pt.width,Pt.height,yt,Pt.data):e.compressedTexImage2D(34069+lt,_t,Lt,Pt.width,Pt.height,0,Pt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ft?e.texSubImage2D(34069+lt,_t,0,0,Pt.width,Pt.height,yt,St,Pt.data):e.texImage2D(34069+lt,_t,Lt,Pt.width,Pt.height,0,yt,St,Pt.data)}}}else{gt=A.mipmaps,Ft&&W&&(gt.length>0&&vt++,e.texStorage2D(34067,vt,Lt,J[0].width,J[0].height));for(let lt=0;lt<6;lt++)if(U){Ft?e.texSubImage2D(34069+lt,0,0,0,J[lt].width,J[lt].height,yt,St,J[lt].data):e.texImage2D(34069+lt,0,Lt,J[lt].width,J[lt].height,0,yt,St,J[lt].data);for(let _t=0;_t<gt.length;_t++){let qt=gt[_t].image[lt].image;Ft?e.texSubImage2D(34069+lt,_t+1,0,0,qt.width,qt.height,yt,St,qt.data):e.texImage2D(34069+lt,_t+1,Lt,qt.width,qt.height,0,yt,St,qt.data)}}else{Ft?e.texSubImage2D(34069+lt,0,0,0,yt,St,J[lt]):e.texImage2D(34069+lt,0,Lt,yt,St,J[lt]);for(let _t=0;_t<gt.length;_t++){let Pt=gt[_t];Ft?e.texSubImage2D(34069+lt,_t+1,0,0,yt,St,Pt.image[lt]):e.texImage2D(34069+lt,_t+1,Lt,yt,St,Pt.image[lt])}}}D(A,wt)&&T(34067),pt.__version=ht.version,A.onUpdate&&A.onUpdate(A)}C.__version=A.version}function xt(C,A,G,ot,ht){let pt=s.convert(G.format,G.encoding),Tt=s.convert(G.type),U=b(G.internalFormat,pt,Tt,G.encoding);n.get(A).__hasExternalTextures||(ht===32879||ht===35866?e.texImage3D(ht,0,U,A.width,A.height,A.depth,0,pt,Tt,null):e.texImage2D(ht,0,U,A.width,A.height,0,pt,Tt,null)),e.bindFramebuffer(36160,C),st(A)?d.framebufferTexture2DMultisampleEXT(36160,ot,ht,n.get(G).__webglTexture,0,rt(A)):r.framebufferTexture2D(36160,ot,ht,n.get(G).__webglTexture,0),e.bindFramebuffer(36160,null)}function zt(C,A,G){if(r.bindRenderbuffer(36161,C),A.depthBuffer&&!A.stencilBuffer){let ot=33189;if(G||st(A)){let ht=A.depthTexture;ht&&ht.isDepthTexture&&(ht.type===Ze?ot=36012:ht.type===Rn&&(ot=33190));let pt=rt(A);st(A)?d.renderbufferStorageMultisampleEXT(36161,pt,ot,A.width,A.height):r.renderbufferStorageMultisample(36161,pt,ot,A.width,A.height)}else r.renderbufferStorage(36161,ot,A.width,A.height);r.framebufferRenderbuffer(36160,36096,36161,C)}else if(A.depthBuffer&&A.stencilBuffer){let ot=rt(A);G&&st(A)===!1?r.renderbufferStorageMultisample(36161,ot,35056,A.width,A.height):st(A)?d.renderbufferStorageMultisampleEXT(36161,ot,35056,A.width,A.height):r.renderbufferStorage(36161,34041,A.width,A.height),r.framebufferRenderbuffer(36160,33306,36161,C)}else{let ot=A.isWebGLMultipleRenderTargets===!0?A.texture:[A.texture];for(let ht=0;ht<ot.length;ht++){let pt=ot[ht],Tt=s.convert(pt.format,pt.encoding),U=s.convert(pt.type),J=b(pt.internalFormat,Tt,U,pt.encoding),dt=rt(A);G&&st(A)===!1?r.renderbufferStorageMultisample(36161,dt,J,A.width,A.height):st(A)?d.renderbufferStorageMultisampleEXT(36161,dt,J,A.width,A.height):r.renderbufferStorage(36161,J,A.width,A.height)}}r.bindRenderbuffer(36161,null)}function x(C,A){if(A&&A.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(36160,C),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(A.depthTexture).__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),R(A.depthTexture,0);let ot=n.get(A.depthTexture).__webglTexture,ht=rt(A);if(A.depthTexture.format===Dn)st(A)?d.framebufferTexture2DMultisampleEXT(36160,36096,3553,ot,0,ht):r.framebufferTexture2D(36160,36096,3553,ot,0);else if(A.depthTexture.format===_i)st(A)?d.framebufferTexture2DMultisampleEXT(36160,33306,3553,ot,0,ht):r.framebufferTexture2D(36160,33306,3553,ot,0);else throw new Error("Unknown depthTexture format")}function X(C){let A=n.get(C),G=C.isWebGLCubeRenderTarget===!0;if(C.depthTexture&&!A.__autoAllocateDepthBuffer){if(G)throw new Error("target.depthTexture not supported in Cube render targets");x(A.__webglFramebuffer,C)}else if(G){A.__webglDepthbuffer=[];for(let ot=0;ot<6;ot++)e.bindFramebuffer(36160,A.__webglFramebuffer[ot]),A.__webglDepthbuffer[ot]=r.createRenderbuffer(),zt(A.__webglDepthbuffer[ot],C,!1)}else e.bindFramebuffer(36160,A.__webglFramebuffer),A.__webglDepthbuffer=r.createRenderbuffer(),zt(A.__webglDepthbuffer,C,!1);e.bindFramebuffer(36160,null)}function tt(C,A,G){let ot=n.get(C);A!==void 0&&xt(ot.__webglFramebuffer,C,C.texture,36064,3553),G!==void 0&&X(C)}function k(C){let A=C.texture,G=n.get(C),ot=n.get(A);C.addEventListener("dispose",v),C.isWebGLMultipleRenderTargets!==!0&&(ot.__webglTexture===void 0&&(ot.__webglTexture=r.createTexture()),ot.__version=A.version,o.memory.textures++);let ht=C.isWebGLCubeRenderTarget===!0,pt=C.isWebGLMultipleRenderTargets===!0,Tt=w(C)||a;if(ht){G.__webglFramebuffer=[];for(let U=0;U<6;U++)G.__webglFramebuffer[U]=r.createFramebuffer()}else{if(G.__webglFramebuffer=r.createFramebuffer(),pt)if(i.drawBuffers){let U=C.texture;for(let J=0,dt=U.length;J<dt;J++){let wt=n.get(U[J]);wt.__webglTexture===void 0&&(wt.__webglTexture=r.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&C.samples>0&&st(C)===!1){let U=pt?A:[A];G.__webglMultisampledFramebuffer=r.createFramebuffer(),G.__webglColorRenderbuffer=[],e.bindFramebuffer(36160,G.__webglMultisampledFramebuffer);for(let J=0;J<U.length;J++){let dt=U[J];G.__webglColorRenderbuffer[J]=r.createRenderbuffer(),r.bindRenderbuffer(36161,G.__webglColorRenderbuffer[J]);let wt=s.convert(dt.format,dt.encoding),yt=s.convert(dt.type),St=b(dt.internalFormat,wt,yt,dt.encoding,C.isXRRenderTarget===!0),Lt=rt(C);r.renderbufferStorageMultisample(36161,Lt,St,C.width,C.height),r.framebufferRenderbuffer(36160,36064+J,36161,G.__webglColorRenderbuffer[J])}r.bindRenderbuffer(36161,null),C.depthBuffer&&(G.__webglDepthRenderbuffer=r.createRenderbuffer(),zt(G.__webglDepthRenderbuffer,C,!0)),e.bindFramebuffer(36160,null)}}if(ht){e.bindTexture(34067,ot.__webglTexture),nt(34067,A,Tt);for(let U=0;U<6;U++)xt(G.__webglFramebuffer[U],C,A,36064,34069+U);D(A,Tt)&&T(34067),e.unbindTexture()}else if(pt){let U=C.texture;for(let J=0,dt=U.length;J<dt;J++){let wt=U[J],yt=n.get(wt);e.bindTexture(3553,yt.__webglTexture),nt(3553,wt,Tt),xt(G.__webglFramebuffer,C,wt,36064+J,3553),D(wt,Tt)&&T(3553)}e.unbindTexture()}else{let U=3553;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(a?U=C.isWebGL3DRenderTarget?32879:35866:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),e.bindTexture(U,ot.__webglTexture),nt(U,A,Tt),xt(G.__webglFramebuffer,C,A,36064,U),D(A,Tt)&&T(U),e.unbindTexture()}C.depthBuffer&&X(C)}function I(C){let A=w(C)||a,G=C.isWebGLMultipleRenderTargets===!0?C.texture:[C.texture];for(let ot=0,ht=G.length;ot<ht;ot++){let pt=G[ot];if(D(pt,A)){let Tt=C.isWebGLCubeRenderTarget?34067:3553,U=n.get(pt).__webglTexture;e.bindTexture(Tt,U),T(Tt),e.unbindTexture()}}}function V(C){if(a&&C.samples>0&&st(C)===!1){let A=C.isWebGLMultipleRenderTargets?C.texture:[C.texture],G=C.width,ot=C.height,ht=16384,pt=[],Tt=C.stencilBuffer?33306:36096,U=n.get(C),J=C.isWebGLMultipleRenderTargets===!0;if(J)for(let dt=0;dt<A.length;dt++)e.bindFramebuffer(36160,U.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(36160,36064+dt,36161,null),e.bindFramebuffer(36160,U.__webglFramebuffer),r.framebufferTexture2D(36009,36064+dt,3553,null,0);e.bindFramebuffer(36008,U.__webglMultisampledFramebuffer),e.bindFramebuffer(36009,U.__webglFramebuffer);for(let dt=0;dt<A.length;dt++){pt.push(36064+dt),C.depthBuffer&&pt.push(Tt);let wt=U.__ignoreDepthValues!==void 0?U.__ignoreDepthValues:!1;if(wt===!1&&(C.depthBuffer&&(ht|=256),C.stencilBuffer&&(ht|=1024)),J&&r.framebufferRenderbuffer(36008,36064,36161,U.__webglColorRenderbuffer[dt]),wt===!0&&(r.invalidateFramebuffer(36008,[Tt]),r.invalidateFramebuffer(36009,[Tt])),J){let yt=n.get(A[dt]).__webglTexture;r.framebufferTexture2D(36009,36064,3553,yt,0)}r.blitFramebuffer(0,0,G,ot,0,0,G,ot,ht,9728),m&&r.invalidateFramebuffer(36008,pt)}if(e.bindFramebuffer(36008,null),e.bindFramebuffer(36009,null),J)for(let dt=0;dt<A.length;dt++){e.bindFramebuffer(36160,U.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(36160,36064+dt,36161,U.__webglColorRenderbuffer[dt]);let wt=n.get(A[dt]).__webglTexture;e.bindFramebuffer(36160,U.__webglFramebuffer),r.framebufferTexture2D(36009,36064+dt,3553,wt,0)}e.bindFramebuffer(36009,U.__webglMultisampledFramebuffer)}}function rt(C){return Math.min(h,C.samples)}function st(C){let A=n.get(C);return a&&C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function Z(C){let A=o.render.frame;g.get(C)!==A&&(g.set(C,A),C.update())}function ut(C,A){let G=C.encoding,ot=C.format,ht=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||C.format===Lr||G!==cn&&(G===jt?a===!1?t.has("EXT_sRGB")===!0&&ot===Ae?(C.format=Lr,C.minFilter=Re,C.generateMipmaps=!1):A=xs.sRGBToLinear(A):(ot!==Ae||ht!==kn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture encoding:",G)),A}this.allocateTextureUnit=j,this.resetTextureUnits=q,this.setTexture2D=R,this.setTexture2DArray=it,this.setTexture3D=Y,this.setTextureCube=Q,this.rebindTextures=tt,this.setupRenderTarget=k,this.updateRenderTargetMipmap=I,this.updateMultisampleRenderTarget=V,this.setupDepthRenderbuffer=X,this.setupFrameBufferTexture=xt,this.useMultisampledRTT=st}function pp(r,t,e){let n=e.isWebGL2;function i(s,o=null){let a;if(s===kn)return 5121;if(s===rc)return 32819;if(s===ac)return 32820;if(s===nc)return 5120;if(s===ic)return 5122;if(s===Ho)return 5123;if(s===sc)return 5124;if(s===Rn)return 5125;if(s===Ze)return 5126;if(s===Ui)return n?5131:(a=t.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(s===oc)return 6406;if(s===Ae)return 6408;if(s===cc)return 6409;if(s===hc)return 6410;if(s===Dn)return 6402;if(s===_i)return 34041;if(s===uc)return 6403;if(s===lc)return console.warn("THREE.WebGLRenderer: THREE.RGBFormat has been removed. Use THREE.RGBAFormat instead. https://github.com/mrdoob/three.js/pull/23228"),6408;if(s===Lr)return a=t.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(s===dc)return 36244;if(s===fc)return 33319;if(s===pc)return 33320;if(s===mc)return 36249;if(s===Zs||s===Ys||s===Js||s===js)if(o===jt)if(a=t.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(s===Zs)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Ys)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Js)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===js)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=t.get("WEBGL_compressed_texture_s3tc"),a!==null){if(s===Zs)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Ys)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Js)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===js)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Ra||s===Ia||s===Da||s===za)if(a=t.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(s===Ra)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===Ia)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Da)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===za)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===gc)return a=t.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===ka||s===Oa)if(a=t.get("WEBGL_compressed_texture_etc"),a!==null){if(s===ka)return o===jt?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(s===Oa)return o===jt?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===Na||s===Fa||s===Ua||s===Ba||s===Va||s===Wa||s===Ha||s===Ga||s===qa||s===Xa||s===Za||s===Ya||s===Ja||s===ja)if(a=t.get("WEBGL_compressed_texture_astc"),a!==null){if(s===Na)return o===jt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Fa)return o===jt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Ua)return o===jt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===Ba)return o===jt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Va)return o===jt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===Wa)return o===jt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Ha)return o===jt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Ga)return o===jt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===qa)return o===jt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Xa)return o===jt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Za)return o===jt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Ya)return o===jt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===Ja)return o===jt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===ja)return o===jt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===$a)if(a=t.get("EXT_texture_compression_bptc"),a!==null){if(s===$a)return o===jt?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT}else return null;return s===di?n?34042:(a=t.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):r[s]!==void 0?r[s]:null}return{convert:i}}var Gr=class extends ge{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},hi=class extends xe{constructor(){super(),this.isGroup=!0,this.type="Group"}},mp={type:"move"},Fi=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new hi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new hi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new H,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new H),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new hi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new H,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new H),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,s=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(let u of t.hand.values()){let f=e.getJointPose(u,n);if(l.joints[u.jointName]===void 0){let y=new hi;y.matrixAutoUpdate=!1,y.visible=!1,l.joints[u.jointName]=y,l.add(y)}let _=l.joints[u.jointName];f!==null&&(_.matrix.fromArray(f.transform.matrix),_.matrix.decompose(_.position,_.rotation,_.scale),_.jointRadius=f.radius),_.visible=f!==null}let p=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],d=p.position.distanceTo(h.position),m=.02,g=.005;l.inputState.pinching&&d>m+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&d<=m-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(mp)))}return a!==null&&(a.visible=i!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=o!==null),this}},qr=class extends we{constructor(t,e,n,i,s,o,a,c,l,p){if(p=p!==void 0?p:Dn,p!==Dn&&p!==_i)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&p===Dn&&(n=Rn),n===void 0&&p===_i&&(n=di),super(null,i,s,o,a,c,p,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Kt,this.minFilter=c!==void 0?c:Kt,this.flipY=!1,this.generateMipmaps=!1}},Xr=class extends Ye{constructor(t,e){super();let n=this,i=null,s=1,o=null,a="local-floor",c=null,l=null,p=null,h=null,d=null,m=null,g=e.getContextAttributes(),u=null,f=null,_=[],y=[],M=new ge;M.layers.enable(1),M.viewport=new Zt;let w=new ge;w.layers.enable(2),w.viewport=new Zt;let S=[M,w],D=new Gr;D.layers.enable(1),D.layers.enable(2);let T=null,b=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(P){let R=_[P];return R===void 0&&(R=new Fi,_[P]=R),R.getTargetRaySpace()},this.getControllerGrip=function(P){let R=_[P];return R===void 0&&(R=new Fi,_[P]=R),R.getGripSpace()},this.getHand=function(P){let R=_[P];return R===void 0&&(R=new Fi,_[P]=R),R.getHandSpace()};function L(P){let R=y.indexOf(P.inputSource);if(R===-1)return;let it=_[R];it!==void 0&&it.dispatchEvent({type:P.type,data:P.inputSource})}function E(){i.removeEventListener("select",L),i.removeEventListener("selectstart",L),i.removeEventListener("selectend",L),i.removeEventListener("squeeze",L),i.removeEventListener("squeezestart",L),i.removeEventListener("squeezeend",L),i.removeEventListener("end",E),i.removeEventListener("inputsourceschange",N);for(let P=0;P<_.length;P++){let R=y[P];R!==null&&(y[P]=null,_[P].disconnect(R))}T=null,b=null,t.setRenderTarget(u),d=null,h=null,p=null,i=null,f=null,j.stop(),n.isPresenting=!1,n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(P){s=P,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(P){a=P,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(P){c=P},this.getBaseLayer=function(){return h!==null?h:d},this.getBinding=function(){return p},this.getFrame=function(){return m},this.getSession=function(){return i},this.setSession=async function(P){if(i=P,i!==null){if(u=t.getRenderTarget(),i.addEventListener("select",L),i.addEventListener("selectstart",L),i.addEventListener("selectend",L),i.addEventListener("squeeze",L),i.addEventListener("squeezestart",L),i.addEventListener("squeezeend",L),i.addEventListener("end",E),i.addEventListener("inputsourceschange",N),g.xrCompatible!==!0&&await e.makeXRCompatible(),i.renderState.layers===void 0||t.capabilities.isWebGL2===!1){let R={antialias:i.renderState.layers===void 0?g.antialias:!0,alpha:g.alpha,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(i,e,R),i.updateRenderState({baseLayer:d}),f=new We(d.framebufferWidth,d.framebufferHeight,{format:Ae,type:kn,encoding:t.outputEncoding,stencilBuffer:g.stencil})}else{let R=null,it=null,Y=null;g.depth&&(Y=g.stencil?35056:33190,R=g.stencil?_i:Dn,it=g.stencil?di:Rn);let Q={colorFormat:32856,depthFormat:Y,scaleFactor:s};p=new XRWebGLBinding(i,e),h=p.createProjectionLayer(Q),i.updateRenderState({layers:[h]}),f=new We(h.textureWidth,h.textureHeight,{format:Ae,type:kn,depthTexture:new qr(h.textureWidth,h.textureHeight,it,void 0,void 0,void 0,void 0,void 0,void 0,R),stencilBuffer:g.stencil,encoding:t.outputEncoding,samples:g.antialias?4:0});let ft=t.properties.get(f);ft.__ignoreDepthValues=h.ignoreDepthValues}f.isXRRenderTarget=!0,this.setFoveation(1),c=null,o=await i.requestReferenceSpace(a),j.setContext(i),j.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}};function N(P){for(let R=0;R<P.removed.length;R++){let it=P.removed[R],Y=y.indexOf(it);Y>=0&&(y[Y]=null,_[Y].dispatchEvent({type:"disconnected",data:it}))}for(let R=0;R<P.added.length;R++){let it=P.added[R],Y=y.indexOf(it);if(Y===-1){for(let ft=0;ft<_.length;ft++)if(ft>=y.length){y.push(it),Y=ft;break}else if(y[ft]===null){y[ft]=it,Y=ft;break}if(Y===-1)break}let Q=_[Y];Q&&Q.dispatchEvent({type:"connected",data:it})}}let v=new H,O=new H;function B(P,R,it){v.setFromMatrixPosition(R.matrixWorld),O.setFromMatrixPosition(it.matrixWorld);let Y=v.distanceTo(O),Q=R.projectionMatrix.elements,ft=it.projectionMatrix.elements,Et=Q[14]/(Q[10]-1),nt=Q[14]/(Q[10]+1),At=(Q[9]+1)/Q[5],Mt=(Q[9]-1)/Q[5],bt=(Q[8]-1)/Q[0],xt=(ft[8]+1)/ft[0],zt=Et*bt,x=Et*xt,X=Y/(-bt+xt),tt=X*-bt;R.matrixWorld.decompose(P.position,P.quaternion,P.scale),P.translateX(tt),P.translateZ(X),P.matrixWorld.compose(P.position,P.quaternion,P.scale),P.matrixWorldInverse.copy(P.matrixWorld).invert();let k=Et+X,I=nt+X,V=zt-tt,rt=x+(Y-tt),st=At*nt/I*k,Z=Mt*nt/I*k;P.projectionMatrix.makePerspective(V,rt,st,Z,k,I)}function F(P,R){R===null?P.matrixWorld.copy(P.matrix):P.matrixWorld.multiplyMatrices(R.matrixWorld,P.matrix),P.matrixWorldInverse.copy(P.matrixWorld).invert()}this.updateCamera=function(P){if(i===null)return;D.near=w.near=M.near=P.near,D.far=w.far=M.far=P.far,(T!==D.near||b!==D.far)&&(i.updateRenderState({depthNear:D.near,depthFar:D.far}),T=D.near,b=D.far);let R=P.parent,it=D.cameras;F(D,R);for(let Q=0;Q<it.length;Q++)F(it[Q],R);D.matrixWorld.decompose(D.position,D.quaternion,D.scale),P.matrix.copy(D.matrix),P.matrix.decompose(P.position,P.quaternion,P.scale);let Y=P.children;for(let Q=0,ft=Y.length;Q<ft;Q++)Y[Q].updateMatrixWorld(!0);it.length===2?B(D,M,w):D.projectionMatrix.copy(M.projectionMatrix)},this.getCamera=function(){return D},this.getFoveation=function(){if(h!==null)return h.fixedFoveation;if(d!==null)return d.fixedFoveation},this.setFoveation=function(P){h!==null&&(h.fixedFoveation=P),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=P)};let $=null;function q(P,R){if(l=R.getViewerPose(c||o),m=R,l!==null){let it=l.views;d!==null&&(t.setRenderTargetFramebuffer(f,d.framebuffer),t.setRenderTarget(f));let Y=!1;it.length!==D.cameras.length&&(D.cameras.length=0,Y=!0);for(let Q=0;Q<it.length;Q++){let ft=it[Q],Et=null;if(d!==null)Et=d.getViewport(ft);else{let At=p.getViewSubImage(h,ft);Et=At.viewport,Q===0&&(t.setRenderTargetTextures(f,At.colorTexture,h.ignoreDepthValues?void 0:At.depthStencilTexture),t.setRenderTarget(f))}let nt=S[Q];nt===void 0&&(nt=new ge,nt.layers.enable(Q),nt.viewport=new Zt,S[Q]=nt),nt.matrix.fromArray(ft.transform.matrix),nt.projectionMatrix.fromArray(ft.projectionMatrix),nt.viewport.set(Et.x,Et.y,Et.width,Et.height),Q===0&&D.matrix.copy(nt.matrix),Y===!0&&D.cameras.push(nt)}}for(let it=0;it<_.length;it++){let Y=y[it],Q=_[it];Y!==null&&Q!==void 0&&Q.update(Y,R,c||o)}$&&$(P,R),m=null}let j=new Zo;j.setAnimationLoop(q),this.setAnimationLoop=function(P){$=P},this.dispose=function(){}}};function gp(r,t){function e(u,f){u.fogColor.value.copy(f.color),f.isFog?(u.fogNear.value=f.near,u.fogFar.value=f.far):f.isFogExp2&&(u.fogDensity.value=f.density)}function n(u,f,_,y,M){f.isMeshBasicMaterial||f.isMeshLambertMaterial?i(u,f):f.isMeshToonMaterial?(i(u,f),p(u,f)):f.isMeshPhongMaterial?(i(u,f),l(u,f)):f.isMeshStandardMaterial?(i(u,f),h(u,f),f.isMeshPhysicalMaterial&&d(u,f,M)):f.isMeshMatcapMaterial?(i(u,f),m(u,f)):f.isMeshDepthMaterial?i(u,f):f.isMeshDistanceMaterial?(i(u,f),g(u,f)):f.isMeshNormalMaterial?i(u,f):f.isLineBasicMaterial?(s(u,f),f.isLineDashedMaterial&&o(u,f)):f.isPointsMaterial?a(u,f,_,y):f.isSpriteMaterial?c(u,f):f.isShadowMaterial?(u.color.value.copy(f.color),u.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function i(u,f){u.opacity.value=f.opacity,f.color&&u.diffuse.value.copy(f.color),f.emissive&&u.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(u.map.value=f.map),f.alphaMap&&(u.alphaMap.value=f.alphaMap),f.bumpMap&&(u.bumpMap.value=f.bumpMap,u.bumpScale.value=f.bumpScale,f.side===Ie&&(u.bumpScale.value*=-1)),f.displacementMap&&(u.displacementMap.value=f.displacementMap,u.displacementScale.value=f.displacementScale,u.displacementBias.value=f.displacementBias),f.emissiveMap&&(u.emissiveMap.value=f.emissiveMap),f.normalMap&&(u.normalMap.value=f.normalMap,u.normalScale.value.copy(f.normalScale),f.side===Ie&&u.normalScale.value.negate()),f.specularMap&&(u.specularMap.value=f.specularMap),f.alphaTest>0&&(u.alphaTest.value=f.alphaTest);let _=t.get(f).envMap;if(_&&(u.envMap.value=_,u.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,u.reflectivity.value=f.reflectivity,u.ior.value=f.ior,u.refractionRatio.value=f.refractionRatio),f.lightMap){u.lightMap.value=f.lightMap;let w=r.physicallyCorrectLights!==!0?Math.PI:1;u.lightMapIntensity.value=f.lightMapIntensity*w}f.aoMap&&(u.aoMap.value=f.aoMap,u.aoMapIntensity.value=f.aoMapIntensity);let y;f.map?y=f.map:f.specularMap?y=f.specularMap:f.displacementMap?y=f.displacementMap:f.normalMap?y=f.normalMap:f.bumpMap?y=f.bumpMap:f.roughnessMap?y=f.roughnessMap:f.metalnessMap?y=f.metalnessMap:f.alphaMap?y=f.alphaMap:f.emissiveMap?y=f.emissiveMap:f.clearcoatMap?y=f.clearcoatMap:f.clearcoatNormalMap?y=f.clearcoatNormalMap:f.clearcoatRoughnessMap?y=f.clearcoatRoughnessMap:f.iridescenceMap?y=f.iridescenceMap:f.iridescenceThicknessMap?y=f.iridescenceThicknessMap:f.specularIntensityMap?y=f.specularIntensityMap:f.specularColorMap?y=f.specularColorMap:f.transmissionMap?y=f.transmissionMap:f.thicknessMap?y=f.thicknessMap:f.sheenColorMap?y=f.sheenColorMap:f.sheenRoughnessMap&&(y=f.sheenRoughnessMap),y!==void 0&&(y.isWebGLRenderTarget&&(y=y.texture),y.matrixAutoUpdate===!0&&y.updateMatrix(),u.uvTransform.value.copy(y.matrix));let M;f.aoMap?M=f.aoMap:f.lightMap&&(M=f.lightMap),M!==void 0&&(M.isWebGLRenderTarget&&(M=M.texture),M.matrixAutoUpdate===!0&&M.updateMatrix(),u.uv2Transform.value.copy(M.matrix))}function s(u,f){u.diffuse.value.copy(f.color),u.opacity.value=f.opacity}function o(u,f){u.dashSize.value=f.dashSize,u.totalSize.value=f.dashSize+f.gapSize,u.scale.value=f.scale}function a(u,f,_,y){u.diffuse.value.copy(f.color),u.opacity.value=f.opacity,u.size.value=f.size*_,u.scale.value=y*.5,f.map&&(u.map.value=f.map),f.alphaMap&&(u.alphaMap.value=f.alphaMap),f.alphaTest>0&&(u.alphaTest.value=f.alphaTest);let M;f.map?M=f.map:f.alphaMap&&(M=f.alphaMap),M!==void 0&&(M.matrixAutoUpdate===!0&&M.updateMatrix(),u.uvTransform.value.copy(M.matrix))}function c(u,f){u.diffuse.value.copy(f.color),u.opacity.value=f.opacity,u.rotation.value=f.rotation,f.map&&(u.map.value=f.map),f.alphaMap&&(u.alphaMap.value=f.alphaMap),f.alphaTest>0&&(u.alphaTest.value=f.alphaTest);let _;f.map?_=f.map:f.alphaMap&&(_=f.alphaMap),_!==void 0&&(_.matrixAutoUpdate===!0&&_.updateMatrix(),u.uvTransform.value.copy(_.matrix))}function l(u,f){u.specular.value.copy(f.specular),u.shininess.value=Math.max(f.shininess,1e-4)}function p(u,f){f.gradientMap&&(u.gradientMap.value=f.gradientMap)}function h(u,f){u.roughness.value=f.roughness,u.metalness.value=f.metalness,f.roughnessMap&&(u.roughnessMap.value=f.roughnessMap),f.metalnessMap&&(u.metalnessMap.value=f.metalnessMap),t.get(f).envMap&&(u.envMapIntensity.value=f.envMapIntensity)}function d(u,f,_){u.ior.value=f.ior,f.sheen>0&&(u.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),u.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(u.sheenColorMap.value=f.sheenColorMap),f.sheenRoughnessMap&&(u.sheenRoughnessMap.value=f.sheenRoughnessMap)),f.clearcoat>0&&(u.clearcoat.value=f.clearcoat,u.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(u.clearcoatMap.value=f.clearcoatMap),f.clearcoatRoughnessMap&&(u.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap),f.clearcoatNormalMap&&(u.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),u.clearcoatNormalMap.value=f.clearcoatNormalMap,f.side===Ie&&u.clearcoatNormalScale.value.negate())),f.iridescence>0&&(u.iridescence.value=f.iridescence,u.iridescenceIOR.value=f.iridescenceIOR,u.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],u.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(u.iridescenceMap.value=f.iridescenceMap),f.iridescenceThicknessMap&&(u.iridescenceThicknessMap.value=f.iridescenceThicknessMap)),f.transmission>0&&(u.transmission.value=f.transmission,u.transmissionSamplerMap.value=_.texture,u.transmissionSamplerSize.value.set(_.width,_.height),f.transmissionMap&&(u.transmissionMap.value=f.transmissionMap),u.thickness.value=f.thickness,f.thicknessMap&&(u.thicknessMap.value=f.thicknessMap),u.attenuationDistance.value=f.attenuationDistance,u.attenuationColor.value.copy(f.attenuationColor)),u.specularIntensity.value=f.specularIntensity,u.specularColor.value.copy(f.specularColor),f.specularIntensityMap&&(u.specularIntensityMap.value=f.specularIntensityMap),f.specularColorMap&&(u.specularColorMap.value=f.specularColorMap)}function m(u,f){f.matcap&&(u.matcap.value=f.matcap)}function g(u,f){u.referencePosition.value.copy(f.referencePosition),u.nearDistance.value=f.nearDistance,u.farDistance.value=f.farDistance}return{refreshFogUniforms:e,refreshMaterialUniforms:n}}function _p(r,t,e,n){let i={},s={},o=[],a=e.isWebGL2?r.getParameter(35375):0;function c(y,M){let w=M.program;n.uniformBlockBinding(y,w)}function l(y,M){let w=i[y.id];w===void 0&&(g(y),w=p(y),i[y.id]=w,y.addEventListener("dispose",f));let S=M.program;n.updateUBOMapping(y,S);let D=t.render.frame;s[y.id]!==D&&(d(y),s[y.id]=D)}function p(y){let M=h();y.__bindingPointIndex=M;let w=r.createBuffer(),S=y.__size,D=y.usage;return r.bindBuffer(35345,w),r.bufferData(35345,S,D),r.bindBuffer(35345,null),r.bindBufferBase(35345,M,w),w}function h(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(y){let M=i[y.id],w=y.uniforms,S=y.__cache;r.bindBuffer(35345,M);for(let D=0,T=w.length;D<T;D++){let b=w[D];if(m(b,D,S)===!0){let L=b.value,E=b.__offset;typeof L=="number"?(b.__data[0]=L,r.bufferSubData(35345,E,b.__data)):(b.value.isMatrix3?(b.__data[0]=b.value.elements[0],b.__data[1]=b.value.elements[1],b.__data[2]=b.value.elements[2],b.__data[3]=b.value.elements[0],b.__data[4]=b.value.elements[3],b.__data[5]=b.value.elements[4],b.__data[6]=b.value.elements[5],b.__data[7]=b.value.elements[0],b.__data[8]=b.value.elements[6],b.__data[9]=b.value.elements[7],b.__data[10]=b.value.elements[8],b.__data[11]=b.value.elements[0]):L.toArray(b.__data),r.bufferSubData(35345,E,b.__data))}}r.bindBuffer(35345,null)}function m(y,M,w){let S=y.value;if(w[M]===void 0)return typeof S=="number"?w[M]=S:w[M]=S.clone(),!0;if(typeof S=="number"){if(w[M]!==S)return w[M]=S,!0}else{let D=w[M];if(D.equals(S)===!1)return D.copy(S),!0}return!1}function g(y){let M=y.uniforms,w=0,S=16,D=0;for(let T=0,b=M.length;T<b;T++){let L=M[T],E=u(L);if(L.__data=new Float32Array(E.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=w,T>0){D=w%S;let N=S-D;D!==0&&N-E.boundary<0&&(w+=S-D,L.__offset=w)}w+=E.storage}return D=w%S,D>0&&(w+=S-D),y.__size=w,y.__cache={},this}function u(y){let M=y.value,w={boundary:0,storage:0};return typeof M=="number"?(w.boundary=4,w.storage=4):M.isVector2?(w.boundary=8,w.storage=8):M.isVector3||M.isColor?(w.boundary=16,w.storage=12):M.isVector4?(w.boundary=16,w.storage=16):M.isMatrix3?(w.boundary=48,w.storage=48):M.isMatrix4?(w.boundary=64,w.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),w}function f(y){let M=y.target;M.removeEventListener("dispose",f);let w=o.indexOf(M.__bindingPointIndex);o.splice(w,1),r.deleteBuffer(i[M.id]),delete i[M.id],delete s[M.id]}function _(){for(let y in i)r.deleteBuffer(i[y]);o=[],i={},s={}}return{bind:c,update:l,dispose:_}}function xp(){let r=_s("canvas");return r.style.display="block",r}function aa(r={}){this.isWebGLRenderer=!0;let t=r.canvas!==void 0?r.canvas:xp(),e=r.context!==void 0?r.context:null,n=r.depth!==void 0?r.depth:!0,i=r.stencil!==void 0?r.stencil:!0,s=r.antialias!==void 0?r.antialias:!1,o=r.premultipliedAlpha!==void 0?r.premultipliedAlpha:!0,a=r.preserveDrawingBuffer!==void 0?r.preserveDrawingBuffer:!1,c=r.powerPreference!==void 0?r.powerPreference:"default",l=r.failIfMajorPerformanceCaveat!==void 0?r.failIfMajorPerformanceCaveat:!1,p;e!==null?p=e.getContextAttributes().alpha:p=r.alpha!==void 0?r.alpha:!1;let h=null,d=null,m=[],g=[];this.domElement=t,this.debug={checkShaderErrors:!0},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.outputEncoding=cn,this.physicallyCorrectLights=!1,this.toneMapping=Ve,this.toneMappingExposure=1,Object.defineProperties(this,{gammaFactor:{get:function(){return console.warn("THREE.WebGLRenderer: .gammaFactor has been removed."),2},set:function(){console.warn("THREE.WebGLRenderer: .gammaFactor has been removed.")}}});let u=this,f=!1,_=0,y=0,M=null,w=-1,S=null,D=new Zt,T=new Zt,b=null,L=t.width,E=t.height,N=1,v=null,O=null,B=new Zt(0,0,L,E),F=new Zt(0,0,L,E),$=!1,q=new Es,j=!1,P=!1,R=null,it=new Qt,Y=new Dt,Q=new H,ft={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Et(){return M===null?N:1}let nt=e;function At(z,et){for(let at=0;at<z.length;at++){let K=z[at],ct=t.getContext(K,et);if(ct!==null)return ct}return null}try{let z={alpha:!0,depth:n,stencil:i,antialias:s,premultipliedAlpha:o,preserveDrawingBuffer:a,powerPreference:c,failIfMajorPerformanceCaveat:l};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${ia}`),t.addEventListener("webglcontextlost",St,!1),t.addEventListener("webglcontextrestored",Lt,!1),t.addEventListener("webglcontextcreationerror",Ft,!1),nt===null){let et=["webgl2","webgl","experimental-webgl"];if(u.isWebGL1Renderer===!0&&et.shift(),nt=At(et,z),nt===null)throw At(et)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}nt.getShaderPrecisionFormat===void 0&&(nt.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(z){throw console.error("THREE.WebGLRenderer: "+z.message),z}let Mt,bt,xt,zt,x,X,tt,k,I,V,rt,st,Z,ut,C,A,G,ot,ht,pt,Tt,U,J,dt;function wt(){Mt=new Fd(nt),bt=new Id(nt,Mt,r),Mt.init(bt),U=new pp(nt,Mt,bt),xt=new dp(nt,Mt,bt),zt=new Vd,x=new tp,X=new fp(nt,Mt,xt,x,bt,U,zt),tt=new zd(u),k=new Nd(u),I=new Kc(nt,bt),J=new Pd(nt,Mt,I,bt),V=new Ud(nt,I,zt,J),rt=new qd(nt,V,I,zt),ht=new Gd(nt,bt,X),A=new Dd(x),st=new Qf(u,tt,k,Mt,bt,J,A),Z=new gp(u,x),ut=new np,C=new lp(Mt,bt),ot=new Ld(u,tt,xt,rt,p,o),G=new up(u,rt,bt),dt=new _p(nt,zt,bt,xt),pt=new Rd(nt,Mt,zt,bt),Tt=new Bd(nt,Mt,zt,bt),zt.programs=st.programs,u.capabilities=bt,u.extensions=Mt,u.properties=x,u.renderLists=ut,u.shadowMap=G,u.state=xt,u.info=zt}wt();let yt=new Xr(u,nt);this.xr=yt,this.getContext=function(){return nt},this.getContextAttributes=function(){return nt.getContextAttributes()},this.forceContextLoss=function(){let z=Mt.get("WEBGL_lose_context");z&&z.loseContext()},this.forceContextRestore=function(){let z=Mt.get("WEBGL_lose_context");z&&z.restoreContext()},this.getPixelRatio=function(){return N},this.setPixelRatio=function(z){z!==void 0&&(N=z,this.setSize(L,E,!1))},this.getSize=function(z){return z.set(L,E)},this.setSize=function(z,et,at){if(yt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}L=z,E=et,t.width=Math.floor(z*N),t.height=Math.floor(et*N),at!==!1&&(t.style.width=z+"px",t.style.height=et+"px"),this.setViewport(0,0,z,et)},this.getDrawingBufferSize=function(z){return z.set(L*N,E*N).floor()},this.setDrawingBufferSize=function(z,et,at){L=z,E=et,N=at,t.width=Math.floor(z*at),t.height=Math.floor(et*at),this.setViewport(0,0,z,et)},this.getCurrentViewport=function(z){return z.copy(D)},this.getViewport=function(z){return z.copy(B)},this.setViewport=function(z,et,at,K){z.isVector4?B.set(z.x,z.y,z.z,z.w):B.set(z,et,at,K),xt.viewport(D.copy(B).multiplyScalar(N).floor())},this.getScissor=function(z){return z.copy(F)},this.setScissor=function(z,et,at,K){z.isVector4?F.set(z.x,z.y,z.z,z.w):F.set(z,et,at,K),xt.scissor(T.copy(F).multiplyScalar(N).floor())},this.getScissorTest=function(){return $},this.setScissorTest=function(z){xt.setScissorTest($=z)},this.setOpaqueSort=function(z){v=z},this.setTransparentSort=function(z){O=z},this.getClearColor=function(z){return z.copy(ot.getClearColor())},this.setClearColor=function(){ot.setClearColor.apply(ot,arguments)},this.getClearAlpha=function(){return ot.getClearAlpha()},this.setClearAlpha=function(){ot.setClearAlpha.apply(ot,arguments)},this.clear=function(z=!0,et=!0,at=!0){let K=0;z&&(K|=16384),et&&(K|=256),at&&(K|=1024),nt.clear(K)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",St,!1),t.removeEventListener("webglcontextrestored",Lt,!1),t.removeEventListener("webglcontextcreationerror",Ft,!1),ut.dispose(),C.dispose(),x.dispose(),tt.dispose(),k.dispose(),rt.dispose(),J.dispose(),dt.dispose(),st.dispose(),yt.dispose(),yt.removeEventListener("sessionstart",Pt),yt.removeEventListener("sessionend",qt),R&&(R.dispose(),R=null),$t.stop()};function St(z){z.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),f=!0}function Lt(){console.log("THREE.WebGLRenderer: Context Restored."),f=!1;let z=zt.autoReset,et=G.enabled,at=G.autoUpdate,K=G.needsUpdate,ct=G.type;wt(),zt.autoReset=z,G.enabled=et,G.autoUpdate=at,G.needsUpdate=K,G.type=ct}function Ft(z){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",z.statusMessage)}function W(z){let et=z.target;et.removeEventListener("dispose",W),vt(et)}function vt(z){gt(z),x.remove(z)}function gt(z){let et=x.get(z).programs;et!==void 0&&(et.forEach(function(at){st.releaseProgram(at)}),z.isShaderMaterial&&st.releaseShaderCache(z))}this.renderBufferDirect=function(z,et,at,K,ct,Ct){et===null&&(et=ft);let Rt=ct.isMesh&&ct.matrixWorld.determinant()<0,kt=dl(z,et,at,K,ct);xt.setMaterial(K,Rt);let It=at.index,Ht=at.attributes.position;if(It===null){if(Ht===void 0||Ht.count===0)return}else if(It.count===0)return;let Ut=1;K.wireframe===!0&&(It=V.getWireframeAttribute(at),Ut=2),J.setup(ct,K,kt,at,It);let Bt,Jt=pt;It!==null&&(Bt=I.get(It),Jt=Tt,Jt.setIndex(Bt));let Sn=It!==null?It.count:Ht.count,qn=at.drawRange.start*Ut,Xn=at.drawRange.count*Ut,qe=Ct!==null?Ct.start*Ut:0,Vt=Ct!==null?Ct.count*Ut:1/0,Zn=Math.max(qn,qe),te=Math.min(Sn,qn+Xn,qe+Vt)-1,Le=Math.max(0,te-Zn+1);if(Le!==0){if(ct.isMesh)K.wireframe===!0?(xt.setLineWidth(K.wireframeLinewidth*Et()),Jt.setMode(1)):Jt.setMode(4);else if(ct.isLine){let pn=K.linewidth;pn===void 0&&(pn=1),xt.setLineWidth(pn*Et()),ct.isLineSegments?Jt.setMode(1):ct.isLineLoop?Jt.setMode(2):Jt.setMode(3)}else ct.isPoints?Jt.setMode(0):ct.isSprite&&Jt.setMode(4);if(ct.isInstancedMesh)Jt.renderInstances(Zn,Le,ct.count);else if(at.isInstancedBufferGeometry){let pn=Math.min(at.instanceCount,at._maxInstanceCount);Jt.renderInstances(Zn,Le,pn)}else Jt.render(Zn,Le)}},this.compile=function(z,et){function at(K,ct,Ct){K.transparent===!0&&K.side===Xe?(K.side=Ie,K.needsUpdate=!0,Wi(K,ct,Ct),K.side=pi,K.needsUpdate=!0,Wi(K,ct,Ct),K.side=Xe):Wi(K,ct,Ct)}d=C.get(z),d.init(),g.push(d),z.traverseVisible(function(K){K.isLight&&K.layers.test(et.layers)&&(d.pushLight(K),K.castShadow&&d.pushShadow(K))}),d.setupLights(u.physicallyCorrectLights),z.traverse(function(K){let ct=K.material;if(ct)if(Array.isArray(ct))for(let Ct=0;Ct<ct.length;Ct++){let Rt=ct[Ct];at(Rt,z,K)}else at(ct,z,K)}),g.pop(),d=null};let lt=null;function _t(z){lt&&lt(z)}function Pt(){$t.stop()}function qt(){$t.start()}let $t=new Zo;$t.setAnimationLoop(_t),typeof self<"u"&&$t.setContext(self),this.setAnimationLoop=function(z){lt=z,yt.setAnimationLoop(z),z===null?$t.stop():$t.start()},yt.addEventListener("sessionstart",Pt),yt.addEventListener("sessionend",qt),this.render=function(z,et){if(et!==void 0&&et.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(f===!0)return;z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),et.parent===null&&et.matrixWorldAutoUpdate===!0&&et.updateMatrixWorld(),yt.enabled===!0&&yt.isPresenting===!0&&(yt.cameraAutoUpdate===!0&&yt.updateCamera(et),et=yt.getCamera()),z.isScene===!0&&z.onBeforeRender(u,z,et,M),d=C.get(z,g.length),d.init(),g.push(d),it.multiplyMatrices(et.projectionMatrix,et.matrixWorldInverse),q.setFromProjectionMatrix(it),P=this.localClippingEnabled,j=A.init(this.clippingPlanes,P,et),h=ut.get(z,m.length),h.init(),m.push(h),fn(z,et,0,u.sortObjects),h.finish(),u.sortObjects===!0&&h.sort(v,O),j===!0&&A.beginShadows();let at=d.state.shadowsArray;if(G.render(at,z,et),j===!0&&A.endShadows(),this.info.autoReset===!0&&this.info.reset(),ot.render(h,z),d.setupLights(u.physicallyCorrectLights),et.isArrayCamera){let K=et.cameras;for(let ct=0,Ct=K.length;ct<Ct;ct++){let Rt=K[ct];Yt(h,z,Rt,Rt.viewport)}}else Yt(h,z,et);M!==null&&(X.updateMultisampleRenderTarget(M),X.updateRenderTargetMipmap(M)),z.isScene===!0&&z.onAfterRender(u,z,et),J.resetDefaultState(),w=-1,S=null,g.pop(),g.length>0?d=g[g.length-1]:d=null,m.pop(),m.length>0?h=m[m.length-1]:h=null};function fn(z,et,at,K){if(z.visible===!1)return;if(z.layers.test(et.layers)){if(z.isGroup)at=z.renderOrder;else if(z.isLOD)z.autoUpdate===!0&&z.update(et);else if(z.isLight)d.pushLight(z),z.castShadow&&d.pushShadow(z);else if(z.isSprite){if(!z.frustumCulled||q.intersectsSprite(z)){K&&Q.setFromMatrixPosition(z.matrixWorld).applyMatrix4(it);let Rt=rt.update(z),kt=z.material;kt.visible&&h.push(z,Rt,kt,at,Q.z,null)}}else if((z.isMesh||z.isLine||z.isPoints)&&(z.isSkinnedMesh&&z.skeleton.frame!==zt.render.frame&&(z.skeleton.update(),z.skeleton.frame=zt.render.frame),!z.frustumCulled||q.intersectsObject(z))){K&&Q.setFromMatrixPosition(z.matrixWorld).applyMatrix4(it);let Rt=rt.update(z),kt=z.material;if(Array.isArray(kt)){let It=Rt.groups;for(let Ht=0,Ut=It.length;Ht<Ut;Ht++){let Bt=It[Ht],Jt=kt[Bt.materialIndex];Jt&&Jt.visible&&h.push(z,Rt,Jt,at,Q.z,Bt)}}else kt.visible&&h.push(z,Rt,kt,at,Q.z,null)}}let Ct=z.children;for(let Rt=0,kt=Ct.length;Rt<kt;Rt++)fn(Ct[Rt],et,at,K)}function Yt(z,et,at,K){let ct=z.opaque,Ct=z.transmissive,Rt=z.transparent;d.setupLightsView(at),Ct.length>0&&Ke(ct,et,at),K&&xt.viewport(D.copy(K)),ct.length>0&&Ce(ct,et,at),Ct.length>0&&Ce(Ct,et,at),Rt.length>0&&Ce(Rt,et,at),xt.buffers.depth.setTest(!0),xt.buffers.depth.setMask(!0),xt.buffers.color.setMask(!0),xt.setPolygonOffset(!1)}function Ke(z,et,at){let K=bt.isWebGL2;R===null&&(R=new We(1,1,{generateMipmaps:!0,type:Mt.has("EXT_color_buffer_half_float")?Ui:kn,minFilter:Rs,samples:K&&s===!0?4:0})),u.getDrawingBufferSize(Y),K?R.setSize(Y.x,Y.y):R.setSize(gs(Y.x),gs(Y.y));let ct=u.getRenderTarget();u.setRenderTarget(R),u.clear();let Ct=u.toneMapping;u.toneMapping=Ve,Ce(z,et,at),u.toneMapping=Ct,X.updateMultisampleRenderTarget(R),X.updateRenderTargetMipmap(R),u.setRenderTarget(ct)}function Ce(z,et,at){let K=et.isScene===!0?et.overrideMaterial:null;for(let ct=0,Ct=z.length;ct<Ct;ct++){let Rt=z[ct],kt=Rt.object,It=Rt.geometry,Ht=K===null?Rt.material:K,Ut=Rt.group;kt.layers.test(at.layers)&&ul(kt,et,at,It,Ht,Ut)}}function ul(z,et,at,K,ct,Ct){z.onBeforeRender(u,et,at,K,ct,Ct),z.modelViewMatrix.multiplyMatrices(at.matrixWorldInverse,z.matrixWorld),z.normalMatrix.getNormalMatrix(z.modelViewMatrix),ct.onBeforeRender(u,et,at,K,z,Ct),ct.transparent===!0&&ct.side===Xe?(ct.side=Ie,ct.needsUpdate=!0,u.renderBufferDirect(at,et,K,ct,z,Ct),ct.side=pi,ct.needsUpdate=!0,u.renderBufferDirect(at,et,K,ct,z,Ct),ct.side=Xe):u.renderBufferDirect(at,et,K,ct,z,Ct),z.onAfterRender(u,et,at,K,ct,Ct)}function Wi(z,et,at){et.isScene!==!0&&(et=ft);let K=x.get(z),ct=d.state.lights,Ct=d.state.shadowsArray,Rt=ct.state.version,kt=st.getParameters(z,ct.state,Ct,et,at),It=st.getProgramCacheKey(kt),Ht=K.programs;K.environment=z.isMeshStandardMaterial?et.environment:null,K.fog=et.fog,K.envMap=(z.isMeshStandardMaterial?k:tt).get(z.envMap||K.environment),Ht===void 0&&(z.addEventListener("dispose",W),Ht=new Map,K.programs=Ht);let Ut=Ht.get(It);if(Ut!==void 0){if(K.currentProgram===Ut&&K.lightsStateVersion===Rt)return ba(z,kt),Ut}else kt.uniforms=st.getUniforms(z),z.onBuild(at,kt,u),z.onBeforeCompile(kt,u),Ut=st.acquireProgram(kt,It),Ht.set(It,Ut),K.uniforms=kt.uniforms;let Bt=K.uniforms;(!z.isShaderMaterial&&!z.isRawShaderMaterial||z.clipping===!0)&&(Bt.clippingPlanes=A.uniform),ba(z,kt),K.needsLights=pl(z),K.lightsStateVersion=Rt,K.needsLights&&(Bt.ambientLightColor.value=ct.state.ambient,Bt.lightProbe.value=ct.state.probe,Bt.directionalLights.value=ct.state.directional,Bt.directionalLightShadows.value=ct.state.directionalShadow,Bt.spotLights.value=ct.state.spot,Bt.spotLightShadows.value=ct.state.spotShadow,Bt.rectAreaLights.value=ct.state.rectArea,Bt.ltc_1.value=ct.state.rectAreaLTC1,Bt.ltc_2.value=ct.state.rectAreaLTC2,Bt.pointLights.value=ct.state.point,Bt.pointLightShadows.value=ct.state.pointShadow,Bt.hemisphereLights.value=ct.state.hemi,Bt.directionalShadowMap.value=ct.state.directionalShadowMap,Bt.directionalShadowMatrix.value=ct.state.directionalShadowMatrix,Bt.spotShadowMap.value=ct.state.spotShadowMap,Bt.spotLightMatrix.value=ct.state.spotLightMatrix,Bt.spotLightMap.value=ct.state.spotLightMap,Bt.pointShadowMap.value=ct.state.pointShadowMap,Bt.pointShadowMatrix.value=ct.state.pointShadowMatrix);let Jt=Ut.getUniforms(),Sn=fi.seqWithValue(Jt.seq,Bt);return K.currentProgram=Ut,K.uniformsList=Sn,Ut}function ba(z,et){let at=x.get(z);at.outputEncoding=et.outputEncoding,at.instancing=et.instancing,at.skinning=et.skinning,at.morphTargets=et.morphTargets,at.morphNormals=et.morphNormals,at.morphColors=et.morphColors,at.morphTargetsCount=et.morphTargetsCount,at.numClippingPlanes=et.numClippingPlanes,at.numIntersection=et.numClipIntersection,at.vertexAlphas=et.vertexAlphas,at.vertexTangents=et.vertexTangents,at.toneMapping=et.toneMapping}function dl(z,et,at,K,ct){et.isScene!==!0&&(et=ft),X.resetTextureUnits();let Ct=et.fog,Rt=K.isMeshStandardMaterial?et.environment:null,kt=M===null?u.outputEncoding:M.isXRRenderTarget===!0?M.texture.encoding:cn,It=(K.isMeshStandardMaterial?k:tt).get(K.envMap||Rt),Ht=K.vertexColors===!0&&!!at.attributes.color&&at.attributes.color.itemSize===4,Ut=!!K.normalMap&&!!at.attributes.tangent,Bt=!!at.morphAttributes.position,Jt=!!at.morphAttributes.normal,Sn=!!at.morphAttributes.color,qn=K.toneMapped?u.toneMapping:Ve,Xn=at.morphAttributes.position||at.morphAttributes.normal||at.morphAttributes.color,qe=Xn!==void 0?Xn.length:0,Vt=x.get(K),Zn=d.state.lights;if(j===!0&&(P===!0||z!==S)){let Me=z===S&&K.id===w;A.setState(K,z,Me)}let te=!1;K.version===Vt.__version?(Vt.needsLights&&Vt.lightsStateVersion!==Zn.state.version||Vt.outputEncoding!==kt||ct.isInstancedMesh&&Vt.instancing===!1||!ct.isInstancedMesh&&Vt.instancing===!0||ct.isSkinnedMesh&&Vt.skinning===!1||!ct.isSkinnedMesh&&Vt.skinning===!0||Vt.envMap!==It||K.fog===!0&&Vt.fog!==Ct||Vt.numClippingPlanes!==void 0&&(Vt.numClippingPlanes!==A.numPlanes||Vt.numIntersection!==A.numIntersection)||Vt.vertexAlphas!==Ht||Vt.vertexTangents!==Ut||Vt.morphTargets!==Bt||Vt.morphNormals!==Jt||Vt.morphColors!==Sn||Vt.toneMapping!==qn||bt.isWebGL2===!0&&Vt.morphTargetsCount!==qe)&&(te=!0):(te=!0,Vt.__version=K.version);let Le=Vt.currentProgram;te===!0&&(Le=Wi(K,et,ct));let pn=!1,Li=!1,Ws=!1,pe=Le.getUniforms(),En=Vt.uniforms;if(xt.useProgram(Le.program)&&(pn=!0,Li=!0,Ws=!0),K.id!==w&&(w=K.id,Li=!0),pn||S!==z){if(pe.setValue(nt,"projectionMatrix",z.projectionMatrix),bt.logarithmicDepthBuffer&&pe.setValue(nt,"logDepthBufFC",2/(Math.log(z.far+1)/Math.LN2)),S!==z&&(S=z,Li=!0,Ws=!0),K.isShaderMaterial||K.isMeshPhongMaterial||K.isMeshToonMaterial||K.isMeshStandardMaterial||K.envMap){let Me=pe.map.cameraPosition;Me!==void 0&&Me.setValue(nt,Q.setFromMatrixPosition(z.matrixWorld))}(K.isMeshPhongMaterial||K.isMeshToonMaterial||K.isMeshLambertMaterial||K.isMeshBasicMaterial||K.isMeshStandardMaterial||K.isShaderMaterial)&&pe.setValue(nt,"isOrthographic",z.isOrthographicCamera===!0),(K.isMeshPhongMaterial||K.isMeshToonMaterial||K.isMeshLambertMaterial||K.isMeshBasicMaterial||K.isMeshStandardMaterial||K.isShaderMaterial||K.isShadowMaterial||ct.isSkinnedMesh)&&pe.setValue(nt,"viewMatrix",z.matrixWorldInverse)}if(ct.isSkinnedMesh){pe.setOptional(nt,ct,"bindMatrix"),pe.setOptional(nt,ct,"bindMatrixInverse");let Me=ct.skeleton;Me&&(bt.floatVertexTextures?(Me.boneTexture===null&&Me.computeBoneTexture(),pe.setValue(nt,"boneTexture",Me.boneTexture,X),pe.setValue(nt,"boneTextureSize",Me.boneTextureSize)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}let Hs=at.morphAttributes;if((Hs.position!==void 0||Hs.normal!==void 0||Hs.color!==void 0&&bt.isWebGL2===!0)&&ht.update(ct,at,K,Le),(Li||Vt.receiveShadow!==ct.receiveShadow)&&(Vt.receiveShadow=ct.receiveShadow,pe.setValue(nt,"receiveShadow",ct.receiveShadow)),K.isMeshGouraudMaterial&&K.envMap!==null&&(En.envMap.value=It,En.flipEnvMap.value=It.isCubeTexture&&It.isRenderTargetTexture===!1?-1:1),Li&&(pe.setValue(nt,"toneMappingExposure",u.toneMappingExposure),Vt.needsLights&&fl(En,Ws),Ct&&K.fog===!0&&Z.refreshFogUniforms(En,Ct),Z.refreshMaterialUniforms(En,K,N,E,R),fi.upload(nt,Vt.uniformsList,En,X)),K.isShaderMaterial&&K.uniformsNeedUpdate===!0&&(fi.upload(nt,Vt.uniformsList,En,X),K.uniformsNeedUpdate=!1),K.isSpriteMaterial&&pe.setValue(nt,"center",ct.center),pe.setValue(nt,"modelViewMatrix",ct.modelViewMatrix),pe.setValue(nt,"normalMatrix",ct.normalMatrix),pe.setValue(nt,"modelMatrix",ct.matrixWorld),K.isShaderMaterial||K.isRawShaderMaterial){let Me=K.uniformsGroups;for(let Gs=0,ml=Me.length;Gs<ml;Gs++)if(bt.isWebGL2){let wa=Me[Gs];dt.update(wa,Le),dt.bind(wa,Le)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Le}function fl(z,et){z.ambientLightColor.needsUpdate=et,z.lightProbe.needsUpdate=et,z.directionalLights.needsUpdate=et,z.directionalLightShadows.needsUpdate=et,z.pointLights.needsUpdate=et,z.pointLightShadows.needsUpdate=et,z.spotLights.needsUpdate=et,z.spotLightShadows.needsUpdate=et,z.rectAreaLights.needsUpdate=et,z.hemisphereLights.needsUpdate=et}function pl(z){return z.isMeshLambertMaterial||z.isMeshToonMaterial||z.isMeshPhongMaterial||z.isMeshStandardMaterial||z.isShadowMaterial||z.isShaderMaterial&&z.lights===!0}this.getActiveCubeFace=function(){return _},this.getActiveMipmapLevel=function(){return y},this.getRenderTarget=function(){return M},this.setRenderTargetTextures=function(z,et,at){x.get(z.texture).__webglTexture=et,x.get(z.depthTexture).__webglTexture=at;let K=x.get(z);K.__hasExternalTextures=!0,K.__hasExternalTextures&&(K.__autoAllocateDepthBuffer=at===void 0,K.__autoAllocateDepthBuffer||Mt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),K.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(z,et){let at=x.get(z);at.__webglFramebuffer=et,at.__useDefaultFramebuffer=et===void 0},this.setRenderTarget=function(z,et=0,at=0){M=z,_=et,y=at;let K=!0;if(z){let It=x.get(z);It.__useDefaultFramebuffer!==void 0?(xt.bindFramebuffer(36160,null),K=!1):It.__webglFramebuffer===void 0?X.setupRenderTarget(z):It.__hasExternalTextures&&X.rebindTextures(z,x.get(z.texture).__webglTexture,x.get(z.depthTexture).__webglTexture)}let ct=null,Ct=!1,Rt=!1;if(z){let It=z.texture;(It.isData3DTexture||It.isDataArrayTexture)&&(Rt=!0);let Ht=x.get(z).__webglFramebuffer;z.isWebGLCubeRenderTarget?(ct=Ht[et],Ct=!0):bt.isWebGL2&&z.samples>0&&X.useMultisampledRTT(z)===!1?ct=x.get(z).__webglMultisampledFramebuffer:ct=Ht,D.copy(z.viewport),T.copy(z.scissor),b=z.scissorTest}else D.copy(B).multiplyScalar(N).floor(),T.copy(F).multiplyScalar(N).floor(),b=$;if(xt.bindFramebuffer(36160,ct)&&bt.drawBuffers&&K&&xt.drawBuffers(z,ct),xt.viewport(D),xt.scissor(T),xt.setScissorTest(b),Ct){let It=x.get(z.texture);nt.framebufferTexture2D(36160,36064,34069+et,It.__webglTexture,at)}else if(Rt){let It=x.get(z.texture),Ht=et||0;nt.framebufferTextureLayer(36160,36064,It.__webglTexture,at||0,Ht)}w=-1},this.readRenderTargetPixels=function(z,et,at,K,ct,Ct,Rt){if(!(z&&z.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let kt=x.get(z).__webglFramebuffer;if(z.isWebGLCubeRenderTarget&&Rt!==void 0&&(kt=kt[Rt]),kt){xt.bindFramebuffer(36160,kt);try{let It=z.texture,Ht=It.format,Ut=It.type;if(Ht!==Ae&&U.convert(Ht)!==nt.getParameter(35739)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}let Bt=Ut===Ui&&(Mt.has("EXT_color_buffer_half_float")||bt.isWebGL2&&Mt.has("EXT_color_buffer_float"));if(Ut!==kn&&U.convert(Ut)!==nt.getParameter(35738)&&!(Ut===Ze&&(bt.isWebGL2||Mt.has("OES_texture_float")||Mt.has("WEBGL_color_buffer_float")))&&!Bt){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}et>=0&&et<=z.width-K&&at>=0&&at<=z.height-ct&&nt.readPixels(et,at,K,ct,U.convert(Ht),U.convert(Ut),Ct)}finally{let It=M!==null?x.get(M).__webglFramebuffer:null;xt.bindFramebuffer(36160,It)}}},this.copyFramebufferToTexture=function(z,et,at=0){let K=Math.pow(2,-at),ct=Math.floor(et.image.width*K),Ct=Math.floor(et.image.height*K);X.setTexture2D(et,0),nt.copyTexSubImage2D(3553,at,0,0,z.x,z.y,ct,Ct),xt.unbindTexture()},this.copyTextureToTexture=function(z,et,at,K=0){let ct=et.image.width,Ct=et.image.height,Rt=U.convert(at.format),kt=U.convert(at.type);X.setTexture2D(at,0),nt.pixelStorei(37440,at.flipY),nt.pixelStorei(37441,at.premultiplyAlpha),nt.pixelStorei(3317,at.unpackAlignment),et.isDataTexture?nt.texSubImage2D(3553,K,z.x,z.y,ct,Ct,Rt,kt,et.image.data):et.isCompressedTexture?nt.compressedTexSubImage2D(3553,K,z.x,z.y,et.mipmaps[0].width,et.mipmaps[0].height,Rt,et.mipmaps[0].data):nt.texSubImage2D(3553,K,z.x,z.y,Rt,kt,et.image),K===0&&at.generateMipmaps&&nt.generateMipmap(3553),xt.unbindTexture()},this.copyTextureToTexture3D=function(z,et,at,K,ct=0){if(u.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}let Ct=z.max.x-z.min.x+1,Rt=z.max.y-z.min.y+1,kt=z.max.z-z.min.z+1,It=U.convert(K.format),Ht=U.convert(K.type),Ut;if(K.isData3DTexture)X.setTexture3D(K,0),Ut=32879;else if(K.isDataArrayTexture)X.setTexture2DArray(K,0),Ut=35866;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}nt.pixelStorei(37440,K.flipY),nt.pixelStorei(37441,K.premultiplyAlpha),nt.pixelStorei(3317,K.unpackAlignment);let Bt=nt.getParameter(3314),Jt=nt.getParameter(32878),Sn=nt.getParameter(3316),qn=nt.getParameter(3315),Xn=nt.getParameter(32877),qe=at.isCompressedTexture?at.mipmaps[0]:at.image;nt.pixelStorei(3314,qe.width),nt.pixelStorei(32878,qe.height),nt.pixelStorei(3316,z.min.x),nt.pixelStorei(3315,z.min.y),nt.pixelStorei(32877,z.min.z),at.isDataTexture||at.isData3DTexture?nt.texSubImage3D(Ut,ct,et.x,et.y,et.z,Ct,Rt,kt,It,Ht,qe.data):at.isCompressedTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),nt.compressedTexSubImage3D(Ut,ct,et.x,et.y,et.z,Ct,Rt,kt,It,qe.data)):nt.texSubImage3D(Ut,ct,et.x,et.y,et.z,Ct,Rt,kt,It,Ht,qe),nt.pixelStorei(3314,Bt),nt.pixelStorei(32878,Jt),nt.pixelStorei(3316,Sn),nt.pixelStorei(3315,qn),nt.pixelStorei(32877,Xn),ct===0&&K.generateMipmaps&&nt.generateMipmap(Ut),xt.unbindTexture()},this.initTexture=function(z){z.isCubeTexture?X.setTextureCube(z,0):z.isData3DTexture?X.setTexture3D(z,0):z.isDataArrayTexture?X.setTexture2DArray(z,0):X.setTexture2D(z,0),xt.unbindTexture()},this.resetState=function(){_=0,y=0,M=null,xt.reset(),J.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}var Zr=class extends aa{};Zr.prototype.isWebGL1Renderer=!0;var wi=class extends xe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e}get autoUpdate(){return console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),this.matrixWorldAutoUpdate}set autoUpdate(t){console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),this.matrixWorldAutoUpdate=t}},Yr=class{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Cr,this.updateRange={offset:0,count:-1},this.version=0,this.uuid=ln()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,s=this.stride;i<s;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ln()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ln()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},me=new H,ke=class{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i===!0}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)me.fromBufferAttribute(this,e),me.applyMatrix4(t),this.setXYZ(e,me.x,me.y,me.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)me.fromBufferAttribute(this,e),me.applyNormalMatrix(t),this.setXYZ(e,me.x,me.y,me.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)me.fromBufferAttribute(this,e),me.transformDirection(t),this.setXYZ(e,me.x,me.y,me.z);return this}setX(t,e){return this.normalized&&(e=Gt(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=Gt(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=Gt(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=Gt(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=on(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=on(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=on(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=on(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=Gt(e,this.array),n=Gt(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=Gt(e,this.array),n=Gt(n,this.array),i=Gt(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=Gt(e,this.array),n=Gt(n,this.array),i=Gt(i,this.array),s=Gt(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=s,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will deinterleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[i+s])}return new Te(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new ke(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will deinterleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}};var Mi=class extends we{constructor(t=null,e=1,n=1,i,s,o,a,c,l=Kt,p=Kt,h,d){super(null,o,a,c,l,p,i,s,h,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Si=class extends ze{constructor(t=1,e=1,n=1,i=8,s=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:c};let l=this;i=Math.floor(i),s=Math.floor(s);let p=[],h=[],d=[],m=[],g=0,u=[],f=n/2,_=0;y(),o===!1&&(t>0&&M(!0),e>0&&M(!1)),this.setIndex(p),this.setAttribute("position",new de(h,3)),this.setAttribute("normal",new de(d,3)),this.setAttribute("uv",new de(m,2));function y(){let w=new H,S=new H,D=0,T=(e-t)/n;for(let b=0;b<=s;b++){let L=[],E=b/s,N=E*(e-t)+t;for(let v=0;v<=i;v++){let O=v/i,B=O*c+a,F=Math.sin(B),$=Math.cos(B);S.x=N*F,S.y=-E*n+f,S.z=N*$,h.push(S.x,S.y,S.z),w.set(F,T,$).normalize(),d.push(w.x,w.y,w.z),m.push(O,1-E),L.push(g++)}u.push(L)}for(let b=0;b<i;b++)for(let L=0;L<s;L++){let E=u[L][b],N=u[L+1][b],v=u[L+1][b+1],O=u[L][b+1];p.push(E,N,O),p.push(N,v,O),D+=6}l.addGroup(_,D,0),_+=D}function M(w){let S=g,D=new Dt,T=new H,b=0,L=w===!0?t:e,E=w===!0?1:-1;for(let v=1;v<=i;v++)h.push(0,f*E,0),d.push(0,E,0),m.push(.5,.5),g++;let N=g;for(let v=0;v<=i;v++){let B=v/i*c+a,F=Math.cos(B),$=Math.sin(B);T.x=L*$,T.y=f*E,T.z=L*F,h.push(T.x,T.y,T.z),d.push(0,E,0),D.x=F*.5+.5,D.y=$*.5*E+.5,m.push(D.x,D.y),g++}for(let v=0;v<i;v++){let O=S+v,B=N+v;w===!0?p.push(B,B+1,O):p.push(B+1,B,O),b+=3}l.addGroup(_,b,w===!0?1:2),_+=b}}static fromJSON(t){return new Si(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var Ts=class extends ze{constructor(t=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:t},t!==null){let e=[],n=new Set,i=new H,s=new H;if(t.index!==null){let o=t.attributes.position,a=t.index,c=t.groups;c.length===0&&(c=[{start:0,count:a.count,materialIndex:0}]);for(let l=0,p=c.length;l<p;++l){let h=c[l],d=h.start,m=h.count;for(let g=d,u=d+m;g<u;g+=3)for(let f=0;f<3;f++){let _=a.getX(g+f),y=a.getX(g+(f+1)%3);i.fromBufferAttribute(o,_),s.fromBufferAttribute(o,y),Oo(i,s,n)===!0&&(e.push(i.x,i.y,i.z),e.push(s.x,s.y,s.z))}}}else{let o=t.attributes.position;for(let a=0,c=o.count/3;a<c;a++)for(let l=0;l<3;l++){let p=3*a+l,h=3*a+(l+1)%3;i.fromBufferAttribute(o,p),s.fromBufferAttribute(o,h),Oo(i,s,n)===!0&&(e.push(i.x,i.y,i.z),e.push(s.x,s.y,s.z))}}this.setAttribute("position",new de(e,3))}}};function Oo(r,t,e){let n=`${r.x},${r.y},${r.z}-${t.x},${t.y},${t.z}`,i=`${t.x},${t.y},${t.z}-${r.x},${r.y},${r.z}`;return e.has(n)===!0||e.has(i)===!0?!1:(e.add(n),e.add(i),!0)}function wn(r,t,e){return Ko(r)?new r.constructor(r.subarray(t,e!==void 0?e:r.length)):r.slice(t,e)}function hs(r,t,e){return!r||!e&&r.constructor===t?r:typeof t.BYTES_PER_ELEMENT=="number"?new t(r):Array.prototype.slice.call(r)}function Ko(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}var Ei=class{constructor(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,i=e[n],s=e[n-1];t:{e:{let o;n:{i:if(!(t<i)){for(let a=n+2;;){if(i===void 0){if(t<s)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=i,i=e[++n],t<i)break e}o=e.length;break n}if(!(t>=s)){let a=e[1];t<a&&(n=2,s=a);for(let c=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=s,s=e[--n-1],t>=s)break e}o=n,n=0;break n}break t}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(i=e[n],s=e[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,t,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=t*i;for(let o=0;o!==i;++o)e[o]=n[s+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Jr=class extends Ei{constructor(t,e,n,i){super(t,e,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ka,endingEnd:Ka}}intervalChanged_(t,e,n){let i=this.parameterPositions,s=t-2,o=t+1,a=i[s],c=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case Qa:s=t,a=2*e-n;break;case to:s=i.length-2,a=e+i[s]-i[s+1];break;default:s=t,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Qa:o=t,c=2*n-e;break;case to:o=1,c=n+i[1]-i[0];break;default:o=t-1,c=e}let l=(n-e)*.5,p=this.valueSize;this._weightPrev=l/(e-a),this._weightNext=l/(c-n),this._offsetPrev=s*p,this._offsetNext=o*p}interpolate_(t,e,n,i){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,p=this._offsetPrev,h=this._offsetNext,d=this._weightPrev,m=this._weightNext,g=(n-e)/(i-e),u=g*g,f=u*g,_=-d*f+2*d*u-d*g,y=(1+d)*f+(-1.5-2*d)*u+(-.5+d)*g+1,M=(-1-m)*f+(1.5+m)*u+.5*g,w=m*f-m*u;for(let S=0;S!==a;++S)s[S]=_*o[p+S]+y*o[l+S]+M*o[c+S]+w*o[h+S];return s}},jr=class extends Ei{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,p=(n-e)/(i-e),h=1-p;for(let d=0;d!==a;++d)s[d]=o[l+d]*h+o[c+d]*p;return s}},$r=class extends Ei{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t){return this.copySampleValue_(t-1)}},Ge=class{constructor(t,e,n,i){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=hs(e,this.TimeBufferType),this.values=hs(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:hs(t.times,Array),values:hs(t.values,Array)};let i=t.getInterpolation();i!==t.DefaultInterpolation&&(n.interpolation=i)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new $r(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new jr(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Jr(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case fs:e=this.InterpolantFactoryMethodDiscrete;break;case ps:e=this.InterpolantFactoryMethodLinear;break;case $s:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return fs;case this.InterpolantFactoryMethodLinear:return ps;case this.InterpolantFactoryMethodSmooth:return $s}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]*=t}return this}trim(t,e){let n=this.times,i=n.length,s=0,o=i-1;for(;s!==i&&n[s]<t;)++s;for(;o!==-1&&n[o]>e;)--o;if(++o,s!==0||o!==i){s>=o&&(o=Math.max(o,1),s=o-1);let a=this.getValueSize();this.times=wn(n,s,o),this.values=wn(this.values,s*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==s;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),t=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),t=!1;break}o=c}if(i!==void 0&&Ko(i))for(let a=0,c=i.length;a!==c;++a){let l=i[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),t=!1;break}}return t}optimize(){let t=wn(this.times),e=wn(this.values),n=this.getValueSize(),i=this.getInterpolation()===$s,s=t.length-1,o=1;for(let a=1;a<s;++a){let c=!1,l=t[a],p=t[a+1];if(l!==p&&(a!==1||l!==t[0]))if(i)c=!0;else{let h=a*n,d=h-n,m=h+n;for(let g=0;g!==n;++g){let u=e[h+g];if(u!==e[d+g]||u!==e[m+g]){c=!0;break}}}if(c){if(a!==o){t[o]=t[a];let h=a*n,d=o*n;for(let m=0;m!==n;++m)e[d+m]=e[h+m]}++o}}if(s>0){t[o]=t[s];for(let a=s*n,c=o*n,l=0;l!==n;++l)e[c+l]=e[a+l];++o}return o!==t.length?(this.times=wn(t,0,o),this.values=wn(e,0,o*n)):(this.times=t,this.values=e),this}clone(){let t=wn(this.times,0),e=wn(this.values,0),n=this.constructor,i=new n(this.name,t,e);return i.createInterpolant=this.createInterpolant,i}};Ge.prototype.TimeBufferType=Float32Array;Ge.prototype.ValueBufferType=Float32Array;Ge.prototype.DefaultInterpolation=ps;var Fn=class extends Ge{};Fn.prototype.ValueTypeName="bool";Fn.prototype.ValueBufferType=Array;Fn.prototype.DefaultInterpolation=fs;Fn.prototype.InterpolantFactoryMethodLinear=void 0;Fn.prototype.InterpolantFactoryMethodSmooth=void 0;var Kr=class extends Ge{};Kr.prototype.ValueTypeName="color";var Qr=class extends Ge{};Qr.prototype.ValueTypeName="number";var ta=class extends Ei{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-e)/(i-e),l=t*a;for(let p=l+a;l!==p;l+=4)He.slerpFlat(s,0,o,l-a,o,l,c);return s}},Bi=class extends Ge{InterpolantFactoryMethodLinear(t){return new ta(this.times,this.values,this.getValueSize(),t)}};Bi.prototype.ValueTypeName="quaternion";Bi.prototype.DefaultInterpolation=ps;Bi.prototype.InterpolantFactoryMethodSmooth=void 0;var Un=class extends Ge{};Un.prototype.ValueTypeName="string";Un.prototype.ValueBufferType=Array;Un.prototype.DefaultInterpolation=fs;Un.prototype.InterpolantFactoryMethodLinear=void 0;Un.prototype.InterpolantFactoryMethodSmooth=void 0;var ea=class extends Ge{};ea.prototype.ValueTypeName="vector";var Cs=class extends ze{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}clone(){return new this.constructor().copy(this)}toJSON(){let t=super.toJSON(this);return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}};var oa="\\[\\]\\.:\\/",vp=new RegExp("["+oa+"]","g"),la="[^"+oa+"]",yp="[^"+oa.replace("\\.","")+"]",bp=/((?:WC+[\/:])*)/.source.replace("WC",la),wp=/(WCOD+)?/.source.replace("WCOD",yp),Mp=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",la),Sp=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",la),Ep=new RegExp("^"+bp+wp+Mp+Sp+"$"),Ap=["material","materials","bones","map"],na=class{constructor(t,e,n){let i=n||Wt.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},Wt=class{constructor(t,e,n){this.path=e,this.parsedPath=n||Wt.parseTrackName(e),this.node=Wt.findNode(t,this.parsedPath.nodeName)||t,this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new Wt.Composite(t,e,n):new Wt(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(vp,"")}static parseTrackName(t){let e=Ep.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let s=n.nodeName.substring(i+1);Ap.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(s){for(let o=0;o<s.length;o++){let a=s[o];if(a.name===e||a.uuid===e)return a;let c=n(a.children);if(c)return c}return null},i=n(t.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)t[e++]=n[i]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,i=e.propertyName,s=e.propertyIndex;if(t||(t=Wt.findNode(this.rootNode,e.nodeName)||this.rootNode,this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.error("THREE.PropertyBinding: Trying to update node for track: "+this.path+" but it wasn't found.");return}if(n){let l=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let p=0;p<t.length;p++)if(t[p].name===l){l=p;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(l!==void 0){if(t[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}let o=t[i];if(o===void 0){let l=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[s]!==void 0&&(s=t.morphTargetDictionary[s])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Wt.Composite=na;Wt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Wt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Wt.prototype.GetterByBindingType=[Wt.prototype._getValue_direct,Wt.prototype._getValue_array,Wt.prototype._getValue_arrayElement,Wt.prototype._getValue_toArray];Wt.prototype.SetterByBindingTypeAndVersioning=[[Wt.prototype._setValue_direct,Wt.prototype._setValue_direct_setNeedsUpdate,Wt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Wt.prototype._setValue_array,Wt.prototype._setValue_array_setNeedsUpdate,Wt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Wt.prototype._setValue_arrayElement,Wt.prototype._setValue_arrayElement_setNeedsUpdate,Wt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Wt.prototype._setValue_fromArray,Wt.prototype._setValue_fromArray_setNeedsUpdate,Wt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Bp=new Float32Array(1);var Bn=class extends Yr{constructor(t,e,n=1){super(t,e),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=n}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}clone(t){let e=super.clone(t);return e.meshPerAttribute=this.meshPerAttribute,e}toJSON(t){let e=super.toJSON(t);return e.isInstancedInterleavedBuffer=!0,e.meshPerAttribute=this.meshPerAttribute,e}};var Vi=class{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(ue(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var No=new H,us=new H,Ls=class{constructor(t=new H,e=new H){this.start=t,this.end=e}set(t,e){return this.start.copy(t),this.end.copy(e),this}copy(t){return this.start.copy(t.start),this.end.copy(t.end),this}getCenter(t){return t.addVectors(this.start,this.end).multiplyScalar(.5)}delta(t){return t.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(t,e){return this.delta(e).multiplyScalar(t).add(this.start)}closestPointToPointParameter(t,e){No.subVectors(t,this.start),us.subVectors(this.end,this.start);let n=us.dot(us),s=us.dot(No)/n;return e&&(s=ue(s,0,1)),s}closestPointToPoint(t,e,n){let i=this.closestPointToPointParameter(t,e);return this.delta(n).multiplyScalar(i).add(this.start)}applyMatrix4(t){return this.start.applyMatrix4(t),this.end.applyMatrix4(t),this}equals(t){return t.start.equals(this.start)&&t.end.equals(this.end)}clone(){return new this.constructor().copy(this)}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ia}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ia);var dn={Circle:"Circle",Square:"Square",Fill:"Fill",Erase:"Erase"};function Tp(r,t,e,n){let i=r.getImageData(0,0,r.canvas.width,r.canvas.height);function s(d){return new Uint8Array([parseInt(d.substring(1,3),16),parseInt(d.substring(3,5),16),parseInt(d.substring(5,7),16),255])}function o(d){return i.data.slice((d[1]*r.canvas.width+d[0])*4,(d[1]*r.canvas.width+d[0])*4+4)}function a(d,m){i.data[(d[1]*r.canvas.width+d[0])*4+0]=m[0],i.data[(d[1]*r.canvas.width+d[0])*4+1]=m[1],i.data[(d[1]*r.canvas.width+d[0])*4+2]=m[2],i.data[(d[1]*r.canvas.width+d[0])*4+3]=m[3]}function c(d,m){return d[0]==m[0]&&d[1]==m[1]&&d[2]==m[2]&&d[3]==m[3]}let l=s(n?"#000000":r.fillStyle);n&&(l[3]=0);let p=o([t,e]);if(c(l,p))return;let h=[[t,e]];for(;h.length>0;){let d=h.pop(),m=[[d[0]-1,d[1]+0],[d[0]+1,d[1]+0],[d[0]+0,d[1]-1],[d[0]+0,d[1]+1]];for(let g of m)g[0]<0||g[1]<0||g[0]>=r.canvas.width||g[1]>=r.canvas.width||c(o(g),p)&&(h.push(g),a(g,l))}r.putImageData(i,0,0)}var zs=10,Qo=16,ca=class{constructor(){Nt(this,"blobs",[null]);Nt(this,"pointer",0)}clear(t=!0){t?(this.blobs=[],this.pointer=-1):(this.blobs=[null],this.pointer=0)}latestBlob(){return this.blobs.length==0?null:this.blobs[this.blobs.length-1]}async push(t){let e=await new Promise(n=>t.canvas.toBlob(n));this.pointer++,this.pointer!=this.blobs.length&&this.blobs.splice(this.pointer,this.blobs.length-this.pointer),this.blobs.length==Qo&&(this.blobs.splice(0,1),this.pointer=Qo-1),this.blobs.push(e),console.assert(this.pointer==this.blobs.length-1)}async undo(t){this.pointer<=0||(this.pointer--,await this.restore(t))}async redo(t){this.pointer<this.blobs.length-1&&(this.pointer++,await this.restore(t))}async restore(t){let e=this.blobs[this.pointer];if(e==null)t.clearRect(0,0,t.canvas.width,t.canvas.height);else{let n=await createImageBitmap(e);t.clearRect(0,0,t.canvas.width,t.canvas.height),t.drawImage(n,0,0)}}},ha=class extends HTMLElement{constructor(){super();Nt(this,"ctx");Nt(this,"overlayCtx");Nt(this,"size");Nt(this,"color","rgb(0,0,0)");Nt(this,"brushSize",.5);Nt(this,"brushStyle",dn.Circle);Nt(this,"textures",Array(4).fill(null).map(()=>{let e=new Mi(new Uint8Array(262144),256,256);return e.flipY=!0,e.needsUpdate=!0,e}));Nt(this,"layers",Array(4).fill(null).map(()=>new ca));Nt(this,"layer",0);Nt(this,"mouseDown",!1);Nt(this,"previousX",0);Nt(this,"previousY",0);Nt(this,"start");this.attachShadow({mode:"open"}),this.size=256;let e=document.createElement("canvas");e.id="canvas",e.width=this.size,e.height=e.width,e.oncontextmenu=()=>!1,e.addEventListener("pointerdown",p=>this.handleMouseDown(p)),document.addEventListener("pointermove",p=>this.handleMouseMove(p)),document.addEventListener("pointerup",p=>this.handleMouseUp(p)),this.ctx=e.getContext("2d",{willReadFrequently:!0});let n=document.createElement("canvas");n.id="overlay",n.width=e.width,n.height=e.height,this.overlayCtx=n.getContext("2d"),this.overlayCtx.fillStyle="black";let i=document.createElement("div");i.id="title";let s=document.createElement("slot");s.name="title",s.textContent="Placeholder",i.append(s);let o=document.createElement("div");o.id="undoredo";let a=document.createElement("div");a.id="undo",a.textContent="\u21B6",a.addEventListener("click",async()=>{await this.layers[this.layer].undo(this.ctx),this.invalidate(this.layer)}),o.append(a);let c=document.createElement("div");c.id="redo",c.textContent="\u21B7",c.addEventListener("click",async()=>{await this.layers[this.layer].redo(this.ctx),this.invalidate(this.layer)}),o.append(c);let l=document.createElement("style");l.textContent=`
:host {
    transform: scale(1);
    display: block;

    user-select: none;

    background-size: 25% 25%, 25% 25%, calc(100% / 12) calc(100% / 12), calc(100% / 12) calc(100% / 12);
    background-color: #FFF;
    background-image:
        linear-gradient(to right, #aaa 1px, transparent 1px),
        linear-gradient(to bottom, #aaa 1px, transparent 1px),
        linear-gradient(to right, #d7d7d7 1px, transparent 1px),
        linear-gradient(to bottom, #d7d7d7 1px, transparent 1px);
}

* {
    box-sizing: border-box;
}

#canvas {
    width: 100%;
    height: 100%;

    image-rendering: pixelated;
    background-color: transparent;
    border: none;
    border-radius: inherit;

}
#title {
    position: absolute;
    top: 10px;
    left: 10px;

    color: var(--canvas-label-color);

    pointer-events: none;
}
#undoredo {
    position: absolute;
    display: flex;
    gap: 5px;

    top: 5px;
    right: 10px;

    font-family: arial;
    color: rgba(0,0,0,0.5);
    font-weight: bold;

    cursor: pointer;
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
`,this.shadowRoot.append(l,e,n,i,o)}clear(e=!0){this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height),e&&this.invalidate(this.layer)}palettize(e){function n(s,o){let a=[s[0]-o[0],s[1]-o[1],s[2]-o[2],s[3]-o[3]];return Math.sqrt(a[0]*a[0]+a[1]*a[1]+a[2]*a[2]+a[3]*a[3])}let i=this.ctx.getImageData(0,0,this.ctx.canvas.width,this.ctx.canvas.height);for(let s=0;s<this.ctx.canvas.width;s++)for(let o=0;o<this.ctx.canvas.height;o++){let a=i.data.slice((o*this.ctx.canvas.width+s)*4,(o*this.ctx.canvas.width+s)*4+4),c=9999,l=[0,0,0,0];for(let p of e)n(a,p)<c&&(c=n(a,p),l=p);i.data[(o*this.ctx.canvas.width+s)*4+0]=l[0],i.data[(o*this.ctx.canvas.width+s)*4+1]=l[1],i.data[(o*this.ctx.canvas.width+s)*4+2]=l[2],i.data[(o*this.ctx.canvas.width+s)*4+3]=l[3]}this.ctx.putImageData(i,0,0)}eventToCanvasCoords(e,n,i){let{clientX:s,clientY:o}=e,{top:a,left:c,width:l,height:p}=this.ctx.canvas.getBoundingClientRect();return{current:[(s-c)/l*this.ctx.canvas.width,(o-a)/p*this.ctx.canvas.height],previous:[(this.previousX-c)/l*this.ctx.canvas.width,(this.previousY-a)/p*this.ctx.canvas.height]}}handleMouseDown(e){if(this.layer==-1)return;this.mouseDown=!0,this.ctx.fillStyle=this.ctx.strokeStyle=this.color,(this.color=="transparent"||this.brushStyle==dn.Erase)&&(this.ctx.fillStyle=this.ctx.strokeStyle="white");let{current:n}=this.eventToCanvasCoords(e);if(this.start=n,(this.color=="transparent"||this.brushStyle==dn.Erase)&&(this.ctx.globalCompositeOperation="destination-out"),e.ctrlKey||this.brushStyle==dn.Fill)Tp(this.ctx,Math.floor(n[0]),Math.floor(n[1]),this.color=="transparent"),this.mouseDown=!1;else{let i=e.pointerType=="pen"?Math.max(e.pressure,.2):this.brushSize;Xs(this.ctx,n,n,i*zs,this.brushStyle==dn.Square)}this.ctx.globalCompositeOperation="source-over",this.invalidate(this.layer)}handleMouseMove(e){let{current:n,previous:i}=this.eventToCanvasCoords(e),s=e.pointerType=="pen"?Math.max(e.pressure,.2):this.brushSize;if(this.overlayCtx.clearRect(0,0,this.overlayCtx.canvas.width,this.overlayCtx.canvas.height),this.overlayCtx.beginPath(),this.overlayCtx.fillStyle=this.color=="transparent"||this.brushStyle==dn.Erase?"rgba(0,0,0,0.5)":this.color,this.brushStyle==dn.Square){let a=s*zs;this.overlayCtx.fillRect(Math.floor(n[0])-a,Math.floor(n[1])-a,a*2,a*2)}else Hi(this.overlayCtx,n[0],n[1],s*zs);this.overlayCtx.fill(),this.mouseDown&&((this.color=="transparent"||this.brushStyle==dn.Erase)&&(this.ctx.globalCompositeOperation="destination-out"),Xs(this.ctx,i,n,s*zs,this.brushStyle==dn.Square),this.ctx.globalCompositeOperation="source-over",this.invalidate(this.layer)),this.previousX=e.clientX,this.previousY=e.clientY;let o={x:n[0]/this.ctx.canvas.width,y:n[1]/this.ctx.canvas.height};o.x>=0&&o.x<=1&&o.y>=0&&o.y<=1&&this.dispatchEvent(new CustomEvent("clothmove",{detail:o}))}handleMouseUp(e){this.mouseDown&&this.layers[this.layer].push(this.ctx),this.mouseDown=!1}invalidate(e){this.textures[e].image.data=this.ctx.getImageData(0,0,this.ctx.canvas.width,this.ctx.canvas.height),this.textures[e].needsUpdate=!0,this.dispatchEvent(new CustomEvent("change",{detail:e}))}async saveToLayer(e){await this.layers[e].push(this.ctx)}async loadLayer(e){this.layer!=e&&(await this.saveToLayer(this.layer),this.layer=e,await this.layers[e].restore(this.ctx))}async serialize(){return await this.saveToLayer(this.layer),this.layers}async deserialize(e){var n;for(let[i,s]of this.layers.entries()){if(this.layer=i,s.clear(),this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height),(n=e[i])!=null&&n){let o=e[i],a=await createImageBitmap(o);this.ctx.drawImage(a,0,0)}await s.push(this.ctx),this.invalidate(i)}await this.loadLayer(0)}};customElements.define("itmas-cloth",ha);var ua=class extends HTMLElement{constructor(){super();Nt(this,"divs",[]);Nt(this,"selectedPaletteIndex",-1);Nt(this,"selectedColorDiv",null);Nt(this,"wrapper");this.attachShadow({mode:"open"});let e=["#dde4e8","#ffc97a","#8dc196","#5a6e93","#301c44","#ce2f7f","#ef8a6e","#514cad","#877aff"],n=document.createElement("div");n.id="wrapper",this.wrapper=n,e.forEach((s,o)=>{let a=document.createElement("input");a.type="color";let c=`palette-color-${o}`;a.id=c,a.value=s;let l=document.createElement("label");l.setAttribute("for",c),l.style.backgroundColor=s,l.classList.add("color");let p=this.divs.length;l.addEventListener("click",h=>{this.setSelection(l,p),h.preventDefault()}),l.append(a),this.divs.push(l),a.addEventListener("change",h=>{l.style.backgroundColor=h.target.value,this.setSelection(l,p)}),l.addEventListener("contextmenu",h=>(this.setSelection(l,p),a.dispatchEvent(new MouseEvent("click")),h.preventDefault(),!1),!1),n.append(l)});let i=document.createElement("style");i.textContent=`
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
    border-radius: var(--button-roundness);

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
`,this.shadowRoot.append(i,n),this.divs.length>0&&this.setSelection(this.divs[0],0,!1)}setSelection(e,n,i=!0){if(!!e){for(let s of[...this.wrapper.getElementsByClassName("selected")])s.classList.remove("selected");e.classList.add("selected"),this.selectedColorDiv=e,this.selectedPaletteIndex=n,i&&this.dispatchEvent(new CustomEvent("change",{detail:e.style.backgroundColor}))}}updateSelectedColor(e,{dispatch:n=!0}={}){if(this.selectedPaletteIndex<0)return!1;let i=this.divs[this.selectedPaletteIndex];if(!i)return!1;i.style.backgroundColor=e;let s=i.querySelector("input");return s&&(s.value=e),this.selectedColorDiv=i,n&&this.dispatchEvent(new CustomEvent("change",{detail:e})),!0}emitSelectedColor(){this.selectedColorDiv&&this.dispatchEvent(new CustomEvent("change",{detail:this.selectedColorDiv.style.backgroundColor}))}setColors(e){function n(i){return"#"+i.split("(")[1].split(")")[0].split(",").map(s=>parseInt(s).toString(16).padStart(2,"0")).join("")}for(let[i,s]of e.entries()){if(i>=this.divs.length)return;this.divs[i].style.backgroundColor=s,this.divs[i].firstElementChild.value=n(s)}}getColors(){return this.divs.map(e=>e.style.backgroundColor)}getSelectedColor(){var e,n,i;return(i=(n=(e=this.selectedColorDiv)==null?void 0:e.style)==null?void 0:n.backgroundColor)!=null?i:null}};customElements.define("itmas-palette",ua);var da=class extends HTMLElement{constructor(){super();Nt(this,"nameElem");this.attachShadow({mode:"open"}),this.nameElem=document.createElement("span"),this.shadowRoot.append(this.nameElem)}connectedCallback(){this.nameElem.innerText=`${parseInt(this.getAttribute("layer"))+1}`}};customElements.define("itmas-layer",da);function Hn(r){return Math.min(Math.max(r,0),1)}function Cp(r,t,e){t=Hn(t),e=Hn(e);let n=e*t,i=(r%360+360)%360,s=n*(1-Math.abs(i/60%2-1)),o=0,a=0,c=0;i<60?(o=n,a=s):i<120?(o=s,a=n):i<180?(a=n,c=s):i<240?(a=s,c=n):i<300?(o=s,c=n):(o=n,c=s);let l=e-n;return[Math.round((o+l)*255),Math.round((a+l)*255),Math.round((c+l)*255)]}function Lp(r,t,e){r/=255,t/=255,e/=255;let n=Math.max(r,t,e),i=Math.min(r,t,e),s=n-i,o=0;s!==0&&(n===r?o=(t-e)/s%6:n===t?o=(e-r)/s+2:o=(r-t)/s+4,o*=60),o<0&&(o+=360);let a=n===0?0:s/n;return{h:o,s:a,v:n}}function Pp(r,t,e){let n=i=>{let s=i.toString(16);return s.length===1&&(s="0"+s),s};return`#${n(r)}${n(t)}${n(e)}`}function Rp(r){let t=r.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);if(!t)return null;let e=t[1];e.length===3&&(e=e.split("").map(i=>i+i).join(""));let n=parseInt(e,16);return[n>>16&255,n>>8&255,n&255]}function Ip(r){let t=r.match(/rgba?\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})/i);return t?[Hn(parseInt(t[1],10)/255)*255,Hn(parseInt(t[2],10)/255)*255,Hn(parseInt(t[3],10)/255)*255].map(e=>Math.round(e)):null}function Dp(r){if(!r)return null;let t=r.trim();return t===""?null:(t.startsWith("#")||(t=`#${t}`),/^#[0-9a-f]{3}$/i.test(t)||/^#[0-9a-f]{6}$/i.test(t)?t:null)}function zp(r){if(!r)return null;let t=Dp(r);if(t)return Rp(t);let e=Ip(r);return e||null}var fa=class extends HTMLElement{constructor(){super();Nt(this,"_hue",0);Nt(this,"_saturation",1);Nt(this,"_brightness",1);Nt(this,"_color","rgb(255, 0, 0)");Nt(this,"_rgb",[255,0,0]);Nt(this,"_pointerActive",!1);this.attachShadow({mode:"open"});let e=document.createElement("div");e.id="wrapper";let n=document.createElement("div");n.id="canvas-wrapper";let i=document.createElement("canvas");i.width=200,i.height=200,i.id="saturation-value",n.append(i),this.canvas=i,this.ctx=i.getContext("2d"),this.indicator=document.createElement("div"),this.indicator.id="indicator",n.append(this.indicator);let s=document.createElement("div");s.id="controls",this.hueSlider=document.createElement("input"),this.hueSlider.id="hue-slider",this.hueSlider.type="range",this.hueSlider.min="0",this.hueSlider.max="360",this.hueSlider.value=String(this._hue);let o=document.createElement("div");o.id="preview-row",this.preview=document.createElement("div"),this.preview.id="preview",this.hexInput=document.createElement("input"),this.hexInput.id="hex",this.hexInput.type="text",this.hexInput.value="#ff0000",o.append(this.preview,this.hexInput),s.append(this.hueSlider,o);let a=document.createElement("style");a.textContent=`
:host {
    display: block;
    width: 100%;
    max-width: 260px;
}

#wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

#canvas-wrapper {
    position: relative;
    width: 100%;
}

#saturation-value {
    width: 100%;
    display: block;
    border-radius: var(--roundness, 6px);
    cursor: crosshair;
    touch-action: none;
    border: 1px solid black;
}

#indicator {
    position: absolute;
    width: 14px;
    height: 14px;
    border: 2px solid white;
    border-radius: 50%;
    box-shadow: 0 0 0 1px rgba(0,0,0,0.35);
    pointer-events: none;
    transform: translate(-50%, -50%);
}

#controls {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

#controls label {
    font-size: 0.85rem;
    color: rgba(0,0,0,0.7);
}

#hue-slider {
    width: 100%;
    -webkit-appearance: none;
    height: 10px;
    border-radius: var(--roundness);
    background: linear-gradient(90deg, red, yellow, lime, aqua, blue, magenta, red);
    outline: none;
}

#hue-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 2px solid #fff;
    background: #000;
    cursor: pointer;
}

#preview-row {
    display: flex;
    gap: 10px;
    align-items: center;
}

#preview {
    width: 40px;
    height: 40px;
    border-radius: var(--button-roundness, 4px);
    border: 1px solid #333;
}

#hex {
    flex: 1;
    border-radius: var(--button-roundness, 4px);
    border: 1px solid #555;
    padding: 6px 8px;
    font-family: "SFMono-Regular", "Consolas", monospace;
    font-size: 0.95rem;
    text-transform: uppercase;
    text-align: center;
}
`,this.shadowRoot.append(a,e),e.append(n,s),this.hueSlider.addEventListener("input",()=>{this._hue=parseFloat(this.hueSlider.value),this.redraw(),this.updateColorFromHsv(!0)});let c=()=>{let l=this.hexInput.value;!l||this.setColor(l)};this.hexInput.addEventListener("change",c),this.hexInput.addEventListener("keydown",l=>{l.key==="Enter"&&(l.preventDefault(),c())}),i.addEventListener("pointerdown",l=>{this._pointerActive=!0,i.setPointerCapture(l.pointerId),this.handleCanvasEvent(l)}),i.addEventListener("pointermove",l=>{!this._pointerActive||this.handleCanvasEvent(l)}),i.addEventListener("pointerup",l=>{this._pointerActive=!1,i.releasePointerCapture(l.pointerId)}),i.addEventListener("pointerleave",()=>{this._pointerActive=!1}),i.addEventListener("pointercancel",()=>{this._pointerActive=!1}),this.redraw(),this.updateIndicator(),this.updateColorFromHsv(!1)}handleCanvasEvent(e){let n=this.canvas.getBoundingClientRect(),i=Hn((e.clientX-n.left)/n.width),s=Hn((e.clientY-n.top)/n.height);this._saturation=i,this._brightness=1-s,this.updateIndicator(),this.updateColorFromHsv(!0)}redraw(){let e=this.ctx,n=this.canvas.width,i=this.canvas.height;e.clearRect(0,0,n,i),e.fillStyle=`hsl(${this._hue}, 100%, 50%)`,e.fillRect(0,0,n,i);let s=e.createLinearGradient(0,0,n,0);s.addColorStop(0,"rgba(255,255,255,1)"),s.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=s,e.fillRect(0,0,n,i);let o=e.createLinearGradient(0,0,0,i);o.addColorStop(0,"rgba(0,0,0,0)"),o.addColorStop(1,"rgba(0,0,0,1)"),e.fillStyle=o,e.fillRect(0,0,n,i)}updateIndicator(){let e=this._saturation*100,n=(1-this._brightness)*100;this.indicator.style.left=`${e}%`,this.indicator.style.top=`${n}%`}updateColorFromHsv(e=!0){let[n,i,s]=Cp(this._hue,this._saturation,this._brightness);this._rgb=[n,i,s],this._color=`rgb(${n}, ${i}, ${s})`,this.preview.style.backgroundColor=this._color,this.hexInput.value=Pp(n,i,s).toUpperCase(),e&&this.dispatchEvent(new CustomEvent("change",{detail:this._color}))}setColor(e){let n=zp(e);if(!n)return!1;let{h:i,s,v:o}=Lp(...n);return this._hue=i,this._saturation=s,this._brightness=o,this.hueSlider.value=String(Math.round(this._hue)),this.redraw(),this.updateIndicator(),this.updateColorFromHsv(!0),!0}getColor(){return this._color}};customElements.define("itmas-picker",fa);var tl={type:"change"},pa={type:"start"},el={type:"end"},ks=class extends Ye{constructor(t,e){super(),this.object=t,this.domElement=e,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new H,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Vn.ROTATE,MIDDLE:Vn.DOLLY,RIGHT:Vn.PAN},this.touches={ONE:Wn.ROTATE,TWO:Wn.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return a.phi},this.getAzimuthalAngle=function(){return a.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(U){U.addEventListener("keydown",ut),this._domElementKeyEvents=U},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(tl),n.update(),s=i.NONE},this.update=function(){let U=new H,J=new He().setFromUnitVectors(t.up,new H(0,1,0)),dt=J.clone().invert(),wt=new H,yt=new He,St=2*Math.PI;return function(){let Ft=n.object.position;U.copy(Ft).sub(n.target),U.applyQuaternion(J),a.setFromVector3(U),n.autoRotate&&s===i.NONE&&L(T()),n.enableDamping?(a.theta+=c.theta*n.dampingFactor,a.phi+=c.phi*n.dampingFactor):(a.theta+=c.theta,a.phi+=c.phi);let W=n.minAzimuthAngle,vt=n.maxAzimuthAngle;return isFinite(W)&&isFinite(vt)&&(W<-Math.PI?W+=St:W>Math.PI&&(W-=St),vt<-Math.PI?vt+=St:vt>Math.PI&&(vt-=St),W<=vt?a.theta=Math.max(W,Math.min(vt,a.theta)):a.theta=a.theta>(W+vt)/2?Math.max(W,a.theta):Math.min(vt,a.theta)),a.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,a.phi)),a.makeSafe(),a.radius*=l,a.radius=Math.max(n.minDistance,Math.min(n.maxDistance,a.radius)),n.enableDamping===!0?n.target.addScaledVector(p,n.dampingFactor):n.target.add(p),U.setFromSpherical(a),U.applyQuaternion(dt),Ft.copy(n.target).add(U),n.object.lookAt(n.target),n.enableDamping===!0?(c.theta*=1-n.dampingFactor,c.phi*=1-n.dampingFactor,p.multiplyScalar(1-n.dampingFactor)):(c.set(0,0,0),p.set(0,0,0)),l=1,h||wt.distanceToSquared(n.object.position)>o||8*(1-yt.dot(n.object.quaternion))>o?(n.dispatchEvent(tl),wt.copy(n.object.position),yt.copy(n.object.quaternion),h=!1,!0):!1}}(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",G),n.domElement.removeEventListener("pointerdown",tt),n.domElement.removeEventListener("pointercancel",V),n.domElement.removeEventListener("wheel",Z),n.domElement.removeEventListener("pointermove",k),n.domElement.removeEventListener("pointerup",I),n._domElementKeyEvents!==null&&n._domElementKeyEvents.removeEventListener("keydown",ut)};let n=this,i={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},s=i.NONE,o=1e-6,a=new Vi,c=new Vi,l=1,p=new H,h=!1,d=new Dt,m=new Dt,g=new Dt,u=new Dt,f=new Dt,_=new Dt,y=new Dt,M=new Dt,w=new Dt,S=[],D={};function T(){return 2*Math.PI/60/60*n.autoRotateSpeed}function b(){return Math.pow(.95,n.zoomSpeed)}function L(U){c.theta-=U}function E(U){c.phi-=U}let N=function(){let U=new H;return function(dt,wt){U.setFromMatrixColumn(wt,0),U.multiplyScalar(-dt),p.add(U)}}(),v=function(){let U=new H;return function(dt,wt){n.screenSpacePanning===!0?U.setFromMatrixColumn(wt,1):(U.setFromMatrixColumn(wt,0),U.crossVectors(n.object.up,U)),U.multiplyScalar(dt),p.add(U)}}(),O=function(){let U=new H;return function(dt,wt){let yt=n.domElement;if(n.object.isPerspectiveCamera){let St=n.object.position;U.copy(St).sub(n.target);let Lt=U.length();Lt*=Math.tan(n.object.fov/2*Math.PI/180),N(2*dt*Lt/yt.clientHeight,n.object.matrix),v(2*wt*Lt/yt.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(N(dt*(n.object.right-n.object.left)/n.object.zoom/yt.clientWidth,n.object.matrix),v(wt*(n.object.top-n.object.bottom)/n.object.zoom/yt.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}}();function B(U){n.object.isPerspectiveCamera?l/=U:n.object.isOrthographicCamera?(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom*U)),n.object.updateProjectionMatrix(),h=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function F(U){n.object.isPerspectiveCamera?l*=U:n.object.isOrthographicCamera?(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/U)),n.object.updateProjectionMatrix(),h=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function $(U){d.set(U.clientX,U.clientY)}function q(U){y.set(U.clientX,U.clientY)}function j(U){u.set(U.clientX,U.clientY)}function P(U){m.set(U.clientX,U.clientY),g.subVectors(m,d).multiplyScalar(n.rotateSpeed);let J=n.domElement;L(2*Math.PI*g.x/J.clientHeight),E(2*Math.PI*g.y/J.clientHeight),d.copy(m),n.update()}function R(U){M.set(U.clientX,U.clientY),w.subVectors(M,y),w.y>0?B(b()):w.y<0&&F(b()),y.copy(M),n.update()}function it(U){f.set(U.clientX,U.clientY),_.subVectors(f,u).multiplyScalar(n.panSpeed),O(_.x,_.y),u.copy(f),n.update()}function Y(U){U.deltaY<0?F(b()):U.deltaY>0&&B(b()),n.update()}function Q(U){let J=!1;switch(U.code){case n.keys.UP:O(0,n.keyPanSpeed),J=!0;break;case n.keys.BOTTOM:O(0,-n.keyPanSpeed),J=!0;break;case n.keys.LEFT:O(n.keyPanSpeed,0),J=!0;break;case n.keys.RIGHT:O(-n.keyPanSpeed,0),J=!0;break}J&&(U.preventDefault(),n.update())}function ft(){if(S.length===1)d.set(S[0].pageX,S[0].pageY);else{let U=.5*(S[0].pageX+S[1].pageX),J=.5*(S[0].pageY+S[1].pageY);d.set(U,J)}}function Et(){if(S.length===1)u.set(S[0].pageX,S[0].pageY);else{let U=.5*(S[0].pageX+S[1].pageX),J=.5*(S[0].pageY+S[1].pageY);u.set(U,J)}}function nt(){let U=S[0].pageX-S[1].pageX,J=S[0].pageY-S[1].pageY,dt=Math.sqrt(U*U+J*J);y.set(0,dt)}function At(){n.enableZoom&&nt(),n.enablePan&&Et()}function Mt(){n.enableZoom&&nt(),n.enableRotate&&ft()}function bt(U){if(S.length==1)m.set(U.pageX,U.pageY);else{let dt=Tt(U),wt=.5*(U.pageX+dt.x),yt=.5*(U.pageY+dt.y);m.set(wt,yt)}g.subVectors(m,d).multiplyScalar(n.rotateSpeed);let J=n.domElement;L(2*Math.PI*g.x/J.clientHeight),E(2*Math.PI*g.y/J.clientHeight),d.copy(m)}function xt(U){if(S.length===1)f.set(U.pageX,U.pageY);else{let J=Tt(U),dt=.5*(U.pageX+J.x),wt=.5*(U.pageY+J.y);f.set(dt,wt)}_.subVectors(f,u).multiplyScalar(n.panSpeed),O(_.x,_.y),u.copy(f)}function zt(U){let J=Tt(U),dt=U.pageX-J.x,wt=U.pageY-J.y,yt=Math.sqrt(dt*dt+wt*wt);M.set(0,yt),w.set(0,Math.pow(M.y/y.y,n.zoomSpeed)),B(w.y),y.copy(M)}function x(U){n.enableZoom&&zt(U),n.enablePan&&xt(U)}function X(U){n.enableZoom&&zt(U),n.enableRotate&&bt(U)}function tt(U){n.enabled!==!1&&(S.length===0&&(n.domElement.setPointerCapture(U.pointerId),n.domElement.addEventListener("pointermove",k),n.domElement.addEventListener("pointerup",I)),ot(U),U.pointerType==="touch"?C(U):rt(U))}function k(U){n.enabled!==!1&&(U.pointerType==="touch"?A(U):st(U))}function I(U){ht(U),S.length===0&&(n.domElement.releasePointerCapture(U.pointerId),n.domElement.removeEventListener("pointermove",k),n.domElement.removeEventListener("pointerup",I)),n.dispatchEvent(el),s=i.NONE}function V(U){ht(U)}function rt(U){let J;switch(U.button){case 0:J=n.mouseButtons.LEFT;break;case 1:J=n.mouseButtons.MIDDLE;break;case 2:J=n.mouseButtons.RIGHT;break;default:J=-1}switch(J){case Vn.DOLLY:if(n.enableZoom===!1)return;q(U),s=i.DOLLY;break;case Vn.ROTATE:if(U.ctrlKey||U.metaKey||U.shiftKey){if(n.enablePan===!1)return;j(U),s=i.PAN}else{if(n.enableRotate===!1)return;$(U),s=i.ROTATE}break;case Vn.PAN:if(U.ctrlKey||U.metaKey||U.shiftKey){if(n.enableRotate===!1)return;$(U),s=i.ROTATE}else{if(n.enablePan===!1)return;j(U),s=i.PAN}break;default:s=i.NONE}s!==i.NONE&&n.dispatchEvent(pa)}function st(U){switch(s){case i.ROTATE:if(n.enableRotate===!1)return;P(U);break;case i.DOLLY:if(n.enableZoom===!1)return;R(U);break;case i.PAN:if(n.enablePan===!1)return;it(U);break}}function Z(U){n.enabled===!1||n.enableZoom===!1||s!==i.NONE||(U.preventDefault(),n.dispatchEvent(pa),Y(U),n.dispatchEvent(el))}function ut(U){n.enabled===!1||n.enablePan===!1||Q(U)}function C(U){switch(pt(U),S.length){case 1:switch(n.touches.ONE){case Wn.ROTATE:if(n.enableRotate===!1)return;ft(),s=i.TOUCH_ROTATE;break;case Wn.PAN:if(n.enablePan===!1)return;Et(),s=i.TOUCH_PAN;break;default:s=i.NONE}break;case 2:switch(n.touches.TWO){case Wn.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;At(),s=i.TOUCH_DOLLY_PAN;break;case Wn.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;Mt(),s=i.TOUCH_DOLLY_ROTATE;break;default:s=i.NONE}break;default:s=i.NONE}s!==i.NONE&&n.dispatchEvent(pa)}function A(U){switch(pt(U),s){case i.TOUCH_ROTATE:if(n.enableRotate===!1)return;bt(U),n.update();break;case i.TOUCH_PAN:if(n.enablePan===!1)return;xt(U),n.update();break;case i.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;x(U),n.update();break;case i.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;X(U),n.update();break;default:s=i.NONE}}function G(U){n.enabled!==!1&&U.preventDefault()}function ot(U){S.push(U)}function ht(U){delete D[U.pointerId];for(let J=0;J<S.length;J++)if(S[J].pointerId==U.pointerId){S.splice(J,1);return}}function pt(U){let J=D[U.pointerId];J===void 0&&(J=new Dt,D[U.pointerId]=J),J.set(U.pageX,U.pageY)}function Tt(U){let J=U.pointerId===S[0].pointerId?S[1]:S[0];return D[J.pointerId]}n.domElement.addEventListener("contextmenu",G),n.domElement.addEventListener("pointerdown",tt),n.domElement.addEventListener("pointercancel",V),n.domElement.addEventListener("wheel",Z,{passive:!1}),this.update()}};var Os=class{constructor(t,e,n){this.variables=[],this.currentTextureIndex=0;let i=Ze,s=new wi,o=new bi;o.position.z=1;let a={passThruTexture:{value:null}},c=h(m(),a),l=new ae(new Nn(2,2),c);s.add(l),this.setDataType=function(g){return i=g,this},this.addVariable=function(g,u,f){let _=this.createShaderMaterial(u),y={name:g,initialValueTexture:f,material:_,dependencies:null,renderTargets:[],wrapS:null,wrapT:null,minFilter:Kt,magFilter:Kt};return this.variables.push(y),y},this.setVariableDependencies=function(g,u){g.dependencies=u},this.init=function(){if(n.capabilities.isWebGL2===!1&&n.extensions.has("OES_texture_float")===!1)return"No OES_texture_float support for float textures.";if(n.capabilities.maxVertexTextures===0)return"No support for vertex shader textures.";for(let g=0;g<this.variables.length;g++){let u=this.variables[g];u.renderTargets[0]=this.createRenderTarget(t,e,u.wrapS,u.wrapT,u.minFilter,u.magFilter),u.renderTargets[1]=this.createRenderTarget(t,e,u.wrapS,u.wrapT,u.minFilter,u.magFilter),this.renderTexture(u.initialValueTexture,u.renderTargets[0]),this.renderTexture(u.initialValueTexture,u.renderTargets[1]);let f=u.material,_=f.uniforms;if(u.dependencies!==null)for(let y=0;y<u.dependencies.length;y++){let M=u.dependencies[y];if(M.name!==u.name){let w=!1;for(let S=0;S<this.variables.length;S++)if(M.name===this.variables[S].name){w=!0;break}if(!w)return"Variable dependency not found. Variable="+u.name+", dependency="+M.name}_[M.name]={value:null},f.fragmentShader=`
uniform sampler2D `+M.name+`;
`+f.fragmentShader}}return this.currentTextureIndex=0,null},this.compute=function(){let g=this.currentTextureIndex,u=this.currentTextureIndex===0?1:0;for(let f=0,_=this.variables.length;f<_;f++){let y=this.variables[f];if(y.dependencies!==null){let M=y.material.uniforms;for(let w=0,S=y.dependencies.length;w<S;w++){let D=y.dependencies[w];M[D.name].value=D.renderTargets[g].texture}}this.doRenderTarget(y.material,y.renderTargets[u])}this.currentTextureIndex=u},this.getCurrentRenderTarget=function(g){return g.renderTargets[this.currentTextureIndex]},this.getAlternateRenderTarget=function(g){return g.renderTargets[this.currentTextureIndex===0?1:0]},this.dispose=function(){var u;l.geometry.dispose(),l.material.dispose();let g=this.variables;for(let f=0;f<g.length;f++){let _=g[f];(u=_.initialValueTexture)==null||u.dispose();let y=_.renderTargets;for(let M=0;M<y.length;M++)y[M].dispose()}};function p(g){g.defines.resolution="vec2( "+t.toFixed(1)+", "+e.toFixed(1)+" )"}this.addResolutionDefine=p;function h(g,u){u=u||{};let f=new ve({uniforms:u,vertexShader:d(),fragmentShader:g});return p(f),f}this.createShaderMaterial=h,this.createRenderTarget=function(g,u,f,_,y,M){return g=g||t,u=u||e,f=f||ye,_=_||ye,y=y||Kt,M=M||Kt,new We(g,u,{wrapS:f,wrapT:_,minFilter:y,magFilter:M,format:Ae,type:i,depthBuffer:!1})},this.createTexture=function(){let g=new Float32Array(t*e*4),u=new Mi(g,t,e,Ae,Ze);return u.needsUpdate=!0,u},this.renderTexture=function(g,u){a.passThruTexture.value=g,this.doRenderTarget(c,u),a.passThruTexture.value=null},this.doRenderTarget=function(g,u){let f=n.getRenderTarget(),_=n.xr.enabled,y=n.shadowMap.autoUpdate,M=n.outputEncoding,w=n.toneMapping;n.xr.enabled=!1,n.shadowMap.autoUpdate=!1,n.outputEncoding=cn,n.toneMapping=Ve,l.material=g,n.setRenderTarget(u),n.render(s,o),l.material=c,n.xr.enabled=_,n.shadowMap.autoUpdate=y,n.outputEncoding=M,n.toneMapping=w,n.setRenderTarget(f)};function d(){return`void main()	{

	gl_Position = vec4( position, 1.0 );

}
`}function m(){return`uniform sampler2D passThruTexture;

void main() {

	vec2 uv = gl_FragCoord.xy / resolution.xy;

	gl_FragColor = texture2D( passThruTexture, uv );

}
`}}};var ma=`
float distSq(vec3 a, vec3 b) {
    vec3 d = a - b;
    return dot(d, d);
}

vec4 sampleVolume(vec3 p) { // p: (0-1, 0-1, 0-1)
    vec4 t = vec4(0,0,0,0);
    vec4 f = vec4(0,0,0,0);
    vec4 s = vec4(0,0,0,0);

    vec4 result = vec4(0,0,0,0);

    #pragma unroll_loop_start
    for (int i = 0; i < 4; i++) {
        t = texture2D(topViews[i], vec2(p.x, 1.0 - p.z));
        if (t.a > 0.5) {
        f = texture2D(frontViews[i], p.xy);
        if (f.a > 0.5) {
        s = texture2D(sideViews[i], p.zy);
        if (s.a > 0.5) {

        //result = vec4((t.xyz + f.xyz + s.xyz)/3.0, 1);
        result = vec4(f.xyz, 1);

        float thresholdSq = 0.01 * 0.01;
        if (distSq(f.xyz, s.xyz) < thresholdSq)
            result = vec4(f.xyz, 1);
        if (distSq(t.xyz, f.xyz) < thresholdSq)
            result = vec4(t.xyz, 1);
        if (distSq(t.xyz, s.xyz) < thresholdSq)
            result = vec4(t.xyz, 1);

        return result;
        }}}
    }
    #pragma unroll_loop_end

    return result;
}
`,kp=`
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
    return vec3(1,0,0);
    // const float eps = 0.1; // or some other value
    // const vec2 h = vec2(eps,0);
    // return normalize( vec3(sampleDistanceBinary(p+h.xyy) - sampleDistanceBinary(p-h.xyy),
    //                        sampleDistanceBinary(p+h.yxy) - sampleDistanceBinary(p-h.yxy),
    //                        sampleDistanceBinary(p+h.yyx) - sampleDistanceBinary(p-h.yyx) ) );
}
`,Ns=class extends ve{constructor(e,{topViews:n,frontViews:i,sideViews:s}){super();Nt(this,"renderer");Nt(this,"topViews");Nt(this,"frontViews");Nt(this,"sideViews");this.renderer=e,this.topViews=n,this.frontViews=i,this.sideViews=s,this.uniforms.topViews={type:"tv",value:this.topViews},this.uniforms.frontViews={type:"tv",value:this.frontViews},this.uniforms.sideViews={type:"tv",value:this.sideViews},this.vertexShader=`
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

uniform mat4 projectionMatrix;

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

float worldToDepth(const vec3 worldPos) {
    vec4 clip = projectionMatrix * viewMatrix * vec4(worldPos, 1.0);

    // NDC (\u22121..1)
    vec3 ndc = clip.xyz / clip.w;

    // Convert NDC z to depth buffer value (0..1)
    float depth = ndc.z * 0.5 + 0.5;

    return depth;
}

float rand(vec2 co) {
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

${ma}
${kp}

void main() {
    gl_FragColor = vec4(1,1,1,1);
    gl_FragDepth = 1.0;

    Ray r = Ray(cameraPosition,
                normalize(v_position - cameraPosition),
                1.0/normalize(v_position - cameraPosition));

    Hit hit;
    intersectBox(vec3(-0.5,-0.5,-0.5), vec3(0.5,0.5,0.5), r, hit);
    vec3 a = r.origin + hit.tMin * r.dir;
    vec3 b = r.origin + hit.tMax * r.dir;

    if (inBox(cameraPosition))
        a = cameraPosition;

    float density = 128.0;
    float rl = distance(a, b)/1.73; // ray length 0-1 with the maximum length being cube diagonal
    int steps = clamp(int(rl * density), 2, 128);

    vec3 stepVector = (b - a) / float(steps);
    float jitter = rand(gl_FragCoord.xy);
    vec3 p = a + (stepVector * jitter);

    // gl_FragColor = vec4(vec3(float(steps)/128.0), 1.0);
    // return;

    for (int i = 0; i < 128; i++) {
        if (i >= steps) break;
        p += stepVector;
        vec3 mp = p + vec3(0.5,0.5,0.5);

        vec4 result = sampleVolume(mp);
        if (result.a > 0.0) {
            gl_FragColor = result;
            gl_FragDepth = worldToDepth(p);
            break;
        }
    }
}
`,this.side=Xe}};var ya=Sl(il());var sl=new De,Fs=new H,Ti=class extends Cs{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";let t=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],e=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],n=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(n),this.setAttribute("position",new de(t,3)),this.setAttribute("uv",new de(e,2))}applyMatrix4(t){let e=this.attributes.instanceStart,n=this.attributes.instanceEnd;return e!==void 0&&(e.applyMatrix4(t),n.applyMatrix4(t),e.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(t){let e;t instanceof Float32Array?e=t:Array.isArray(t)&&(e=new Float32Array(t));let n=new Bn(e,6,1);return this.setAttribute("instanceStart",new ke(n,3,0)),this.setAttribute("instanceEnd",new ke(n,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(t){let e;t instanceof Float32Array?e=t:Array.isArray(t)&&(e=new Float32Array(t));let n=new Bn(e,6,1);return this.setAttribute("instanceColorStart",new ke(n,3,0)),this.setAttribute("instanceColorEnd",new ke(n,3,3)),this}fromWireframeGeometry(t){return this.setPositions(t.attributes.position.array),this}fromEdgesGeometry(t){return this.setPositions(t.attributes.position.array),this}fromMesh(t){return this.fromWireframeGeometry(new Ts(t.geometry)),this}fromLineSegments(t){let e=t.geometry;return this.setPositions(e.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new De);let t=this.attributes.instanceStart,e=this.attributes.instanceEnd;t!==void 0&&e!==void 0&&(this.boundingBox.setFromBufferAttribute(t),sl.setFromBufferAttribute(e),this.boundingBox.union(sl))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new hn),this.boundingBox===null&&this.computeBoundingBox();let t=this.attributes.instanceStart,e=this.attributes.instanceEnd;if(t!==void 0&&e!==void 0){let n=this.boundingSphere.center;this.boundingBox.getCenter(n);let i=0;for(let s=0,o=t.count;s<o;s++)Fs.fromBufferAttribute(t,s),i=Math.max(i,n.distanceToSquared(Fs)),Fs.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(Fs));this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(t){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(t)}};mt.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new Dt(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};_e.line={uniforms:Is.merge([mt.common,mt.fog,mt.line]),vertexShader:`
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		void trimSegment( const in vec4 start, inout vec4 end ) {

			// trim end segment so it terminates between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
			float nearEstimate = - 0.5 * b / a;

			float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

			end.xyz = mix( start.xyz, end.xyz, alpha );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
				vUv = uv;

			#endif

			float aspect = resolution.x / resolution.y;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			#ifdef WORLD_UNITS

				worldStart = start.xyz;
				worldEnd = end.xyz;

			#else

				vUv = uv;

			#endif

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					trimSegment( start, end );

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					trimSegment( end, start );

				}

			}

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec3 ndcStart = clipStart.xyz / clipStart.w;
			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

			// direction
			vec2 dir = ndcEnd.xy - ndcStart.xy;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			#ifdef WORLD_UNITS

				// get the offset direction as perpendicular to the view vector
				vec3 worldDir = normalize( end.xyz - start.xyz );
				vec3 offset;
				if ( position.y < 0.5 ) {

					offset = normalize( cross( start.xyz, worldDir ) );

				} else {

					offset = normalize( cross( end.xyz, worldDir ) );

				}

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				float forwardOffset = dot( worldDir, vec3( 0.0, 0.0, 1.0 ) );

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				#ifndef USE_DASH

					// extend the line bounds to encompass  endcaps
					start.xyz += - worldDir * linewidth * 0.5;
					end.xyz += worldDir * linewidth * 0.5;

					// shift the position of the quad so it hugs the forward edge of the line
					offset.xy -= dir * forwardOffset;
					offset.z += 0.5;

				#endif

				// endcaps
				if ( position.y > 1.0 || position.y < 0.0 ) {

					offset.xy += dir * 2.0 * forwardOffset;

				}

				// adjust for linewidth
				offset *= linewidth * 0.5;

				// set the world position
				worldPos = ( position.y < 0.5 ) ? start : end;
				worldPos.xyz += offset;

				// project the worldpos
				vec4 clip = projectionMatrix * worldPos;

				// shift the depth of the projected points so the line
				// segments overlap neatly
				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
				clip.z = clipPose.z * clip.w;

			#else

				vec2 offset = vec2( dir.y, - dir.x );
				// undo aspect ratio adjustment
				dir.x /= aspect;
				offset.x /= aspect;

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				// endcaps
				if ( position.y < 0.0 ) {

					offset += - dir;

				} else if ( position.y > 1.0 ) {

					offset += dir;

				}

				// adjust for linewidth
				offset *= linewidth;

				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
				offset /= resolution.y;

				// select end
				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

				// back to clip space
				offset *= clip.w;

				clip.xy += offset;

			#endif

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,fragmentShader:`
		uniform vec3 diffuse;
		uniform float opacity;
		uniform float linewidth;

		#ifdef USE_DASH

			uniform float dashOffset;
			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

			float mua;
			float mub;

			vec3 p13 = p1 - p3;
			vec3 p43 = p4 - p3;

			vec3 p21 = p2 - p1;

			float d1343 = dot( p13, p43 );
			float d4321 = dot( p43, p21 );
			float d1321 = dot( p13, p21 );
			float d4343 = dot( p43, p43 );
			float d2121 = dot( p21, p21 );

			float denom = d2121 * d4343 - d4321 * d4321;

			float numer = d1343 * d4321 - d1321 * d4343;

			mua = numer / denom;
			mua = clamp( mua, 0.0, 1.0 );
			mub = ( d1343 + d4321 * ( mua ) ) / d4343;
			mub = clamp( mub, 0.0, 1.0 );

			return vec2( mua, mub );

		}

		void main() {

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			float alpha = opacity;

			#ifdef WORLD_UNITS

				// Find the closest points on the view ray and the line segment
				vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
				vec3 lineDir = worldEnd - worldStart;
				vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

				vec3 p1 = worldStart + lineDir * params.x;
				vec3 p2 = rayEnd * params.y;
				vec3 delta = p1 - p2;
				float len = length( delta );
				float norm = len / linewidth;

				#ifndef USE_DASH

					#ifdef USE_ALPHA_TO_COVERAGE

						float dnorm = fwidth( norm );
						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

					#else

						if ( norm > 0.5 ) {

							discard;

						}

					#endif

				#endif

			#else

				#ifdef USE_ALPHA_TO_COVERAGE

					// artifacts appear on some hardware if a derivative is taken within a conditional
					float a = vUv.x;
					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
					float len2 = a * a + b * b;
					float dlen = fwidth( len2 );

					if ( abs( vUv.y ) > 1.0 ) {

						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

					}

				#else

					if ( abs( vUv.y ) > 1.0 ) {

						float a = vUv.x;
						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
						float len2 = a * a + b * b;

						if ( len2 > 1.0 ) discard;

					}

				#endif

			#endif

			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <encodings_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`};var Ci=class extends ve{constructor(t){super({type:"LineMaterial",uniforms:Is.clone(_e.line.uniforms),vertexShader:_e.line.vertexShader,fragmentShader:_e.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(e){this.uniforms.diffuse.value=e}},worldUnits:{enumerable:!0,get:function(){return"WORLD_UNITS"in this.defines},set:function(e){e===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(e){this.uniforms.linewidth.value=e}},dashed:{enumerable:!0,get:function(){return Boolean("USE_DASH"in this.defines)},set(e){Boolean(e)!==Boolean("USE_DASH"in this.defines)&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(e){this.uniforms.dashScale.value=e}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(e){this.uniforms.dashSize.value=e}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(e){this.uniforms.dashOffset.value=e}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(e){this.uniforms.gapSize.value=e}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(e){this.uniforms.opacity.value=e}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(e){this.uniforms.resolution.value.copy(e)}},alphaToCoverage:{enumerable:!0,get:function(){return Boolean("USE_ALPHA_TO_COVERAGE"in this.defines)},set:function(e){Boolean(e)!==Boolean("USE_ALPHA_TO_COVERAGE"in this.defines)&&(this.needsUpdate=!0),e===!0?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(t)}};var rl=new H,al=new H,oe=new Zt,le=new Zt,Je=new Zt,_a=new H,xa=new Qt,fe=new Ls,ol=new H,Us=new De,Bs=new hn,je=new Zt,$e,va,cl,Gn;function ll(r,t,e){return je.set(0,0,-t,1).applyMatrix4(r.projectionMatrix),je.multiplyScalar(1/je.w),je.x=Gn/e.width,je.y=Gn/e.height,je.applyMatrix4(r.projectionMatrixInverse),je.multiplyScalar(1/je.w),Math.abs(Math.max(je.x,je.y))}function Op(r,t){for(let e=0,n=va.count;e<n;e++){fe.start.fromBufferAttribute(va,e),fe.end.fromBufferAttribute(cl,e);let i=new H,s=new H;$e.distanceSqToSegment(fe.start,fe.end,s,i),s.distanceTo(i)<Gn*.5&&t.push({point:s,pointOnLine:i,distance:$e.origin.distanceTo(s),object:r,face:null,faceIndex:e,uv:null,uv2:null})}}function Np(r,t,e){let n=t.projectionMatrix,s=r.material.resolution,o=r.matrixWorld,a=r.geometry,c=a.attributes.instanceStart,l=a.attributes.instanceEnd,p=-t.near;$e.at(1,Je),Je.w=1,Je.applyMatrix4(t.matrixWorldInverse),Je.applyMatrix4(n),Je.multiplyScalar(1/Je.w),Je.x*=s.x/2,Je.y*=s.y/2,Je.z=0,_a.copy(Je),xa.multiplyMatrices(t.matrixWorldInverse,o);for(let h=0,d=c.count;h<d;h++){if(oe.fromBufferAttribute(c,h),le.fromBufferAttribute(l,h),oe.w=1,le.w=1,oe.applyMatrix4(xa),le.applyMatrix4(xa),oe.z>p&&le.z>p)continue;if(oe.z>p){let y=oe.z-le.z,M=(oe.z-p)/y;oe.lerp(le,M)}else if(le.z>p){let y=le.z-oe.z,M=(le.z-p)/y;le.lerp(oe,M)}oe.applyMatrix4(n),le.applyMatrix4(n),oe.multiplyScalar(1/oe.w),le.multiplyScalar(1/le.w),oe.x*=s.x/2,oe.y*=s.y/2,le.x*=s.x/2,le.y*=s.y/2,fe.start.copy(oe),fe.start.z=0,fe.end.copy(le),fe.end.z=0;let g=fe.closestPointToPointParameter(_a,!0);fe.at(g,ol);let u=Go.lerp(oe.z,le.z,g),f=u>=-1&&u<=1,_=_a.distanceTo(ol)<Gn*.5;if(f&&_){fe.start.fromBufferAttribute(c,h),fe.end.fromBufferAttribute(l,h),fe.start.applyMatrix4(o),fe.end.applyMatrix4(o);let y=new H,M=new H;$e.distanceSqToSegment(fe.start,fe.end,M,y),e.push({point:M,pointOnLine:y,distance:$e.origin.distanceTo(M),object:r,face:null,faceIndex:h,uv:null,uv2:null})}}}var Vs=class extends ae{constructor(t=new Ti,e=new Ci({color:Math.random()*16777215})){super(t,e),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){let t=this.geometry,e=t.attributes.instanceStart,n=t.attributes.instanceEnd,i=new Float32Array(2*e.count);for(let o=0,a=0,c=e.count;o<c;o++,a+=2)rl.fromBufferAttribute(e,o),al.fromBufferAttribute(n,o),i[a]=a===0?0:i[a-1],i[a+1]=i[a]+rl.distanceTo(al);let s=new Bn(i,2,1);return t.setAttribute("instanceDistanceStart",new ke(s,1,0)),t.setAttribute("instanceDistanceEnd",new ke(s,1,1)),this}raycast(t,e){let n=this.material.worldUnits,i=t.camera;i===null&&!n&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');let s=t.params.Line2!==void 0&&t.params.Line2.threshold||0;$e=t.ray;let o=this.matrixWorld,a=this.geometry,c=this.material;Gn=c.linewidth+s,va=a.attributes.instanceStart,cl=a.attributes.instanceEnd,a.boundingSphere===null&&a.computeBoundingSphere(),Bs.copy(a.boundingSphere).applyMatrix4(o);let l;if(n)l=Gn*.5;else{let h=Math.max(i.near,Bs.distanceToPoint($e.origin));l=ll(i,h,c.resolution)}if(Bs.radius+=l,$e.intersectsSphere(Bs)===!1)return;a.boundingBox===null&&a.computeBoundingBox(),Us.copy(a.boundingBox).applyMatrix4(o);let p;if(n)p=Gn*.5;else{let h=Math.max(i.near,Us.distanceToPoint($e.origin));p=ll(i,h,c.resolution)}Us.expandByScalar(p),$e.intersectsBox(Us)!==!1&&(n?Op(this,e):Np(this,i,e))}};function hl(r,t){let e=URL.createObjectURL(r),n=document.createElement("a");n.href=e,n.download=t,n.rel="noopener",setTimeout(()=>{URL.revokeObjectURL(e)},4e4),setTimeout(()=>{n.dispatchEvent(new MouseEvent("click"))},0)}window.onbeforeunload=function(){return!0};window.addEventListener("load",()=>{let r=new wi,t=new ge(40,1,.1,1e3),e=document.getElementById("three-canvas"),{width:n,height:i}=e.getBoundingClientRect();e.width=512,e.height=512;let s=new aa({canvas:e,powerPreference:"high-performance"});s.setClearColor(16777215);let o=[document.getElementById("top-view"),document.getElementById("front-view"),document.getElementById("side-view")],a=o.map(T=>T.textures),c=new ks(t,s.domElement);c.minDistance=.4,c.maxDistance=3,c.enableDamping=!0,t.position.z=2,t.position.y=1,t.position.x=1,c.update();function l(){requestAnimationFrame(l),c.update(),s.render(r,t)}l();let p=document.getElementById("palette"),h=document.getElementById("picker");p.addEventListener("change",T=>{h.setColor(T.detail);for(let b of o)b.color=T.detail}),h.addEventListener("change",T=>{let b=T.detail;for(let L of o)L.color=b;p.updateSelectedColor(b,{dispatch:!1})}),p.emitSelectedColor(),document.getElementById("brush").addEventListener("change",T=>{for(let b of o)b.brushSize=parseInt(T.target.value)/parseInt(T.target.getAttribute("max"))}),[...document.querySelectorAll("#tool-row button[data-tool]")].forEach(T=>{T.addEventListener("click",b=>{var E;(E=document.querySelector("#tool-row button.selected"))==null||E.classList.remove("selected"),T.classList.add("selected");let L=T.getAttribute("data-tool");for(let N of o)N.brushStyle=L})}),document.getElementById("clear").addEventListener("click",()=>{if(confirm("Are you sure you want to clear this layer?"))for(let T of o)T.clear()}),document.getElementById("expand").addEventListener("click",()=>{for(let b of o)b.style.display=b.style.display=="none"?"block":"none";let T=document.getElementById("grid");T.style.display=T.style.display=="block"?"grid":"block"}),document.getElementById("save").addEventListener("click",async()=>{let T=new ya.default,b={};b.version=1,b.palette=palette.getColors(),T.file("metadata.json",new Blob([JSON.stringify(b)],{type:"application/json"})),s.render(r,t);let L=await new Promise(E=>document.getElementById("three-canvas").toBlob(E));console.log(L),T.file("thumbnail.png",L);for(let E of o){let N=T.folder(E.id);for(let[v,O]of(await E.serialize()).entries())O.latestBlob()!=null&&N.file(`layer-${v}.png`,O)}T.generateAsync({type:"blob"}).then(async E=>{hl(E,"model.zip")})});async function d(T){var E,N;let b=new ya.default;await b.loadAsync(T);for(let v of o){let O=Array(4).fill(null);for(let[B,F]of Object.entries(b.files)){let $=B.match(new RegExp(`${v.id}/layer-(\\d+).png`));$!=null&&(O[parseInt($[1])]=await F.async("blob"),O[parseInt($[1])]=O[parseInt($[1])].slice(0,O[parseInt($[1])].size,"image/png"))}await v.deserialize(O)}let L=b.file("metadata.json");if(L!=null){let v=JSON.parse(await L.async("string"));"palette"in v&&(palette.setColors(v.palette),palette.emitSelectedColor())}(E=document.querySelector("itmas-layer.selected"))==null||E.classList.remove("selected"),(N=document.querySelector("itmas-layer[layer='0']"))==null||N.classList.add("selected")}document.getElementById("load").addEventListener("change",async T=>{let b=T.target.files;if(b.length==0)return;let L=b[0];await d(L)}),document.getElementById("examples").addEventListener("change",async T=>{let b=await(await fetch(`./models/${T.target.value}.zip`)).blob();await d(b)}),document.getElementById("export").addEventListener("click",async()=>{let T=[...document.querySelectorAll("#buttons *")];T.forEach(B=>B.setAttribute("disabled","")),document.documentElement.style.setProperty("--progress","0%");let b=new Worker("/js/exportWorker.js",{type:"module"});b.postMessage({type:"init",totalLayers:256}),b.addEventListener("message",B=>{let F=B.data;!F||(F.type==="progress"?document.documentElement.style.setProperty("--progress",`${F.percent}%`):F.type==="done"&&(hl(F.blob,F.filename),document.documentElement.style.setProperty("--progress","0%"),T.forEach($=>$.removeAttribute("disabled")),b.terminate()))}),b.addEventListener("error",B=>{console.error("export worker error",B),document.documentElement.style.setProperty("--progress","0%"),T.forEach(F=>F.removeAttribute("disabled")),b.terminate()});let L=new Os(256,256,s),E=L.createShaderMaterial(`
uniform sampler2D frontViews[4];
uniform sampler2D sideViews[4];
uniform sampler2D topViews[4];
uniform int layer;

${ma}

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;

    vec3 p = vec3(uv.x, float(layer)/255.0, uv.y);
    gl_FragColor = sampleVolume(p);
}
`,{layer:{value:null},frontViews:{type:"tv",value:null},sideViews:{type:"tv",value:null},topViews:{type:"tv",value:null}});E.uniforms.topViews.value=o[0].textures,E.uniforms.frontViews.value=o[1].textures,E.uniforms.sideViews.value=o[2].textures;let N=L.init();N!==null&&console.error(N);let v=new Float32Array(256*256*4),O=L.createRenderTarget();for(let B=0;B<256;B++){E.uniforms.layer.value=B,L.doRenderTarget(E,O),s.readRenderTargetPixels(O,0,0,256,256,v);let F=new Uint8ClampedArray(256*256*4);for(let $=0;$<v.length/4;$++)F[$*4+0]=v[$*4+0]*255,F[$*4+1]=v[$*4+1]*255,F[$*4+2]=v[$*4+2]*255,F[$*4+3]=v[$*4+3]*255;b.postMessage({type:"layer",layer:B,width:256,height:256,pixels:F.buffer},[F.buffer])}b.postMessage({type:"finalize",filename:"export.vox"})}),[...document.getElementsByTagName("itmas-layer")].forEach(T=>{loadingLayers=!1;let b=parseInt(T.getAttribute("layer"));T.addEventListener("click",async()=>{var L;if(loadingLayers){console.warn("Attempted to load layers while loading layers!");return}loadingLayers=!0,(L=document.querySelector("itmas-layer.selected"))==null||L.classList.remove("selected"),T.classList.add("selected"),await Promise.all(o.map(E=>E.loadLayer(b))),loadingLayers=!1})});let m=new un(1,1,1),g=new Ns(s,{topViews:a[0],frontViews:a[1],sideViews:a[2]}),u=new ae(m,g);r.add(u);let f=new Si(.025,.025,1,16),_=new vi({color:"#AAA",transparent:!0,opacity:.5}),y=new ae(f,_);y.visible=!1,r.add(y),document.getElementById("brush").addEventListener("change",T=>{let b=parseInt(T.target.value)/parseInt(T.target.getAttribute("max"))*2;y.scale.set(b,1,b)});for(let T of o)T.addEventListener("clothmove",b=>{b.target.id=="top-view"?(y.rotation.set(0,0,0),y.position.set(-.5+b.detail.x,0,-.5+b.detail.y)):b.target.id=="side-view"?(y.rotation.set(0,0,Math.PI/2),y.position.set(0,.5-b.detail.y,-.5+b.detail.x)):b.target.id=="front-view"&&(y.rotation.set(Math.PI/2,0,0),y.position.set(-.5+b.detail.x,.5-b.detail.y,0))}),T.addEventListener("pointerover",()=>{y.visible=!0}),T.addEventListener("pointerout",()=>{y.visible=!1});let M=new Ci({color:"#aaa",transparent:!0,opacity:.1,linewidth:.01}),w=[.5,.5,.5,-.5,.5,.5,.5,.5,.5,.5,-.5,.5,-.5,-.5,.5,.5,-.5,.5,-.5,-.5,.5,-.5,.5,.5,.5,.5,-.5,-.5,.5,-.5,.5,.5,-.5,.5,-.5,-.5,-.5,-.5,-.5,.5,-.5,-.5,-.5,-.5,-.5,-.5,.5,-.5,.5,.5,.5,.5,.5,-.5,-.5,.5,.5,-.5,.5,-.5,.5,-.5,.5,.5,-.5,-.5,-.5,-.5,.5,-.5,-.5,-.5],S=new Ti;S.setPositions(w);let D=new Vs(S,M);r.add(D)});})();
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

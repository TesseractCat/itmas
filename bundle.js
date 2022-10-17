(()=>{var Do=Object.create;var bs=Object.defineProperty;var zo=Object.getOwnPropertyDescriptor;var ko=Object.getOwnPropertyNames;var Oo=Object.getPrototypeOf,No=Object.prototype.hasOwnProperty;var Fo=(a,t,e)=>t in a?bs(a,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[t]=e;var fi=(a=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(a,{get:(t,e)=>(typeof require<"u"?require:t)[e]}):a)(function(a){if(typeof require<"u")return require.apply(this,arguments);throw new Error('Dynamic require of "'+a+'" is not supported')});var Uo=(a,t)=>()=>(t||a((t={exports:{}}).exports,t),t.exports);var Bo=(a,t,e,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of ko(t))!No.call(a,i)&&i!==e&&bs(a,i,{get:()=>t[i],enumerable:!(n=zo(t,i))||n.enumerable});return a};var Vo=(a,t,e)=>(e=a!=null?Do(Oo(a)):{},Bo(t||!a||!a.__esModule?bs(e,"default",{value:a,enumerable:!0}):e,a));var $t=(a,t,e)=>(Fo(a,typeof t!="symbol"?t+"":t,e),e);var To=Uo((Ao,Hr)=>{(function(a){typeof Ao=="object"&&typeof Hr<"u"?Hr.exports=a():typeof define=="function"&&define.amd?define([],a):(typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:this).JSZip=a()})(function(){return function a(t,e,n){function i(r,c){if(!e[r]){if(!t[r]){var h=typeof fi=="function"&&fi;if(!c&&h)return h(r,!0);if(s)return s(r,!0);var p=new Error("Cannot find module '"+r+"'");throw p.code="MODULE_NOT_FOUND",p}var u=e[r]={exports:{}};t[r][0].call(u.exports,function(f){var m=t[r][1][f];return i(m||f)},u,u.exports,a,t,e,n)}return e[r].exports}for(var s=typeof fi=="function"&&fi,o=0;o<n.length;o++)i(n[o]);return i}({1:[function(a,t,e){"use strict";var n=a("./utils"),i=a("./support"),s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";e.encode=function(o){for(var r,c,h,p,u,f,m,g=[],l=0,d=o.length,_=d,y=n.getTypeOf(o)!=="string";l<o.length;)_=d-l,h=y?(r=o[l++],c=l<d?o[l++]:0,l<d?o[l++]:0):(r=o.charCodeAt(l++),c=l<d?o.charCodeAt(l++):0,l<d?o.charCodeAt(l++):0),p=r>>2,u=(3&r)<<4|c>>4,f=1<_?(15&c)<<2|h>>6:64,m=2<_?63&h:64,g.push(s.charAt(p)+s.charAt(u)+s.charAt(f)+s.charAt(m));return g.join("")},e.decode=function(o){var r,c,h,p,u,f,m=0,g=0,l="data:";if(o.substr(0,l.length)===l)throw new Error("Invalid base64 input, it looks like a data url.");var d,_=3*(o=o.replace(/[^A-Za-z0-9+/=]/g,"")).length/4;if(o.charAt(o.length-1)===s.charAt(64)&&_--,o.charAt(o.length-2)===s.charAt(64)&&_--,_%1!=0)throw new Error("Invalid base64 input, bad content length.");for(d=i.uint8array?new Uint8Array(0|_):new Array(0|_);m<o.length;)r=s.indexOf(o.charAt(m++))<<2|(p=s.indexOf(o.charAt(m++)))>>4,c=(15&p)<<4|(u=s.indexOf(o.charAt(m++)))>>2,h=(3&u)<<6|(f=s.indexOf(o.charAt(m++))),d[g++]=r,u!==64&&(d[g++]=c),f!==64&&(d[g++]=h);return d}},{"./support":30,"./utils":32}],2:[function(a,t,e){"use strict";var n=a("./external"),i=a("./stream/DataWorker"),s=a("./stream/Crc32Probe"),o=a("./stream/DataLengthProbe");function r(c,h,p,u,f){this.compressedSize=c,this.uncompressedSize=h,this.crc32=p,this.compression=u,this.compressedContent=f}r.prototype={getContentWorker:function(){var c=new i(n.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new o("data_length")),h=this;return c.on("end",function(){if(this.streamInfo.data_length!==h.uncompressedSize)throw new Error("Bug : uncompressed data size mismatch")}),c},getCompressedWorker:function(){return new i(n.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize",this.compressedSize).withStreamInfo("uncompressedSize",this.uncompressedSize).withStreamInfo("crc32",this.crc32).withStreamInfo("compression",this.compression)}},r.createWorkerFrom=function(c,h,p){return c.pipe(new s).pipe(new o("uncompressedSize")).pipe(h.compressWorker(p)).pipe(new o("compressedSize")).withStreamInfo("compression",h)},t.exports=r},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(a,t,e){"use strict";var n=a("./stream/GenericWorker");e.STORE={magic:"\0\0",compressWorker:function(){return new n("STORE compression")},uncompressWorker:function(){return new n("STORE decompression")}},e.DEFLATE=a("./flate")},{"./flate":7,"./stream/GenericWorker":28}],4:[function(a,t,e){"use strict";var n=a("./utils"),i=function(){for(var s,o=[],r=0;r<256;r++){s=r;for(var c=0;c<8;c++)s=1&s?3988292384^s>>>1:s>>>1;o[r]=s}return o}();t.exports=function(s,o){return s!==void 0&&s.length?n.getTypeOf(s)!=="string"?function(r,c,h,p){var u=i,f=p+h;r^=-1;for(var m=p;m<f;m++)r=r>>>8^u[255&(r^c[m])];return-1^r}(0|o,s,s.length,0):function(r,c,h,p){var u=i,f=p+h;r^=-1;for(var m=p;m<f;m++)r=r>>>8^u[255&(r^c.charCodeAt(m))];return-1^r}(0|o,s,s.length,0):0}},{"./utils":32}],5:[function(a,t,e){"use strict";e.base64=!1,e.binary=!1,e.dir=!1,e.createFolders=!0,e.date=null,e.compression=null,e.compressionOptions=null,e.comment=null,e.unixPermissions=null,e.dosPermissions=null},{}],6:[function(a,t,e){"use strict";var n=null;n=typeof Promise<"u"?Promise:a("lie"),t.exports={Promise:n}},{lie:37}],7:[function(a,t,e){"use strict";var n=typeof Uint8Array<"u"&&typeof Uint16Array<"u"&&typeof Uint32Array<"u",i=a("pako"),s=a("./utils"),o=a("./stream/GenericWorker"),r=n?"uint8array":"array";function c(h,p){o.call(this,"FlateWorker/"+h),this._pako=null,this._pakoAction=h,this._pakoOptions=p,this.meta={}}e.magic="\b\0",s.inherits(c,o),c.prototype.processChunk=function(h){this.meta=h.meta,this._pako===null&&this._createPako(),this._pako.push(s.transformTo(r,h.data),!1)},c.prototype.flush=function(){o.prototype.flush.call(this),this._pako===null&&this._createPako(),this._pako.push([],!0)},c.prototype.cleanUp=function(){o.prototype.cleanUp.call(this),this._pako=null},c.prototype._createPako=function(){this._pako=new i[this._pakoAction]({raw:!0,level:this._pakoOptions.level||-1});var h=this;this._pako.onData=function(p){h.push({data:p,meta:h.meta})}},e.compressWorker=function(h){return new c("Deflate",h)},e.uncompressWorker=function(){return new c("Inflate",{})}},{"./stream/GenericWorker":28,"./utils":32,pako:38}],8:[function(a,t,e){"use strict";function n(u,f){var m,g="";for(m=0;m<f;m++)g+=String.fromCharCode(255&u),u>>>=8;return g}function i(u,f,m,g,l,d){var _,y,b=u.file,w=u.compression,S=d!==r.utf8encode,L=s.transformTo("string",d(b.name)),I=s.transformTo("string",r.utf8encode(b.name)),A=b.comment,z=s.transformTo("string",d(A)),T=s.transformTo("string",r.utf8encode(A)),N=I.length!==b.name.length,v=T.length!==A.length,O="",B="",U="",nt=b.dir,G=b.date,J={crc32:0,compressedSize:0,uncompressedSize:0};f&&!m||(J.crc32=u.crc32,J.compressedSize=u.compressedSize,J.uncompressedSize=u.uncompressedSize);var C=0;f&&(C|=8),S||!N&&!v||(C|=2048);var R=0,it=0;nt&&(R|=16),l==="UNIX"?(it=798,R|=function(K,ft){var At=K;return K||(At=ft?16893:33204),(65535&At)<<16}(b.unixPermissions,nt)):(it=20,R|=function(K){return 63&(K||0)}(b.dosPermissions)),_=G.getUTCHours(),_<<=6,_|=G.getUTCMinutes(),_<<=5,_|=G.getUTCSeconds()/2,y=G.getUTCFullYear()-1980,y<<=4,y|=G.getUTCMonth()+1,y<<=5,y|=G.getUTCDate(),N&&(B=n(1,1)+n(c(L),4)+I,O+="up"+n(B.length,2)+B),v&&(U=n(1,1)+n(c(z),4)+T,O+="uc"+n(U.length,2)+U);var Z="";return Z+=`
\0`,Z+=n(C,2),Z+=w.magic,Z+=n(_,2),Z+=n(y,2),Z+=n(J.crc32,4),Z+=n(J.compressedSize,4),Z+=n(J.uncompressedSize,4),Z+=n(L.length,2),Z+=n(O.length,2),{fileRecord:h.LOCAL_FILE_HEADER+Z+L+O,dirRecord:h.CENTRAL_FILE_HEADER+n(it,2)+Z+n(z.length,2)+"\0\0\0\0"+n(R,4)+n(g,4)+L+O+z}}var s=a("../utils"),o=a("../stream/GenericWorker"),r=a("../utf8"),c=a("../crc32"),h=a("../signature");function p(u,f,m,g){o.call(this,"ZipFileWorker"),this.bytesWritten=0,this.zipComment=f,this.zipPlatform=m,this.encodeFileName=g,this.streamFiles=u,this.accumulate=!1,this.contentBuffer=[],this.dirRecords=[],this.currentSourceOffset=0,this.entriesCount=0,this.currentFile=null,this._sources=[]}s.inherits(p,o),p.prototype.push=function(u){var f=u.meta.percent||0,m=this.entriesCount,g=this._sources.length;this.accumulate?this.contentBuffer.push(u):(this.bytesWritten+=u.data.length,o.prototype.push.call(this,{data:u.data,meta:{currentFile:this.currentFile,percent:m?(f+100*(m-g-1))/m:100}}))},p.prototype.openedSource=function(u){this.currentSourceOffset=this.bytesWritten,this.currentFile=u.file.name;var f=this.streamFiles&&!u.file.dir;if(f){var m=i(u,f,!1,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.push({data:m.fileRecord,meta:{percent:0}})}else this.accumulate=!0},p.prototype.closedSource=function(u){this.accumulate=!1;var f=this.streamFiles&&!u.file.dir,m=i(u,f,!0,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);if(this.dirRecords.push(m.dirRecord),f)this.push({data:function(g){return h.DATA_DESCRIPTOR+n(g.crc32,4)+n(g.compressedSize,4)+n(g.uncompressedSize,4)}(u),meta:{percent:100}});else for(this.push({data:m.fileRecord,meta:{percent:0}});this.contentBuffer.length;)this.push(this.contentBuffer.shift());this.currentFile=null},p.prototype.flush=function(){for(var u=this.bytesWritten,f=0;f<this.dirRecords.length;f++)this.push({data:this.dirRecords[f],meta:{percent:100}});var m=this.bytesWritten-u,g=function(l,d,_,y,b){var w=s.transformTo("string",b(y));return h.CENTRAL_DIRECTORY_END+"\0\0\0\0"+n(l,2)+n(l,2)+n(d,4)+n(_,4)+n(w.length,2)+w}(this.dirRecords.length,m,u,this.zipComment,this.encodeFileName);this.push({data:g,meta:{percent:100}})},p.prototype.prepareNextSource=function(){this.previous=this._sources.shift(),this.openedSource(this.previous.streamInfo),this.isPaused?this.previous.pause():this.previous.resume()},p.prototype.registerPrevious=function(u){this._sources.push(u);var f=this;return u.on("data",function(m){f.processChunk(m)}),u.on("end",function(){f.closedSource(f.previous.streamInfo),f._sources.length?f.prepareNextSource():f.end()}),u.on("error",function(m){f.error(m)}),this},p.prototype.resume=function(){return!!o.prototype.resume.call(this)&&(!this.previous&&this._sources.length?(this.prepareNextSource(),!0):this.previous||this._sources.length||this.generatedError?void 0:(this.end(),!0))},p.prototype.error=function(u){var f=this._sources;if(!o.prototype.error.call(this,u))return!1;for(var m=0;m<f.length;m++)try{f[m].error(u)}catch(g){}return!0},p.prototype.lock=function(){o.prototype.lock.call(this);for(var u=this._sources,f=0;f<u.length;f++)u[f].lock()},t.exports=p},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(a,t,e){"use strict";var n=a("../compressions"),i=a("./ZipFileWorker");e.generateWorker=function(s,o,r){var c=new i(o.streamFiles,r,o.platform,o.encodeFileName),h=0;try{s.forEach(function(p,u){h++;var f=function(d,_){var y=d||_,b=n[y];if(!b)throw new Error(y+" is not a valid compression method !");return b}(u.options.compression,o.compression),m=u.options.compressionOptions||o.compressionOptions||{},g=u.dir,l=u.date;u._compressWorker(f,m).withStreamInfo("file",{name:p,dir:g,date:l,comment:u.comment||"",unixPermissions:u.unixPermissions,dosPermissions:u.dosPermissions}).pipe(c)}),c.entriesCount=h}catch(p){c.error(p)}return c}},{"../compressions":3,"./ZipFileWorker":8}],10:[function(a,t,e){"use strict";function n(){if(!(this instanceof n))return new n;if(arguments.length)throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");this.files=Object.create(null),this.comment=null,this.root="",this.clone=function(){var i=new n;for(var s in this)typeof this[s]!="function"&&(i[s]=this[s]);return i}}(n.prototype=a("./object")).loadAsync=a("./load"),n.support=a("./support"),n.defaults=a("./defaults"),n.version="3.10.1",n.loadAsync=function(i,s){return new n().loadAsync(i,s)},n.external=a("./external"),t.exports=n},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(a,t,e){"use strict";var n=a("./utils"),i=a("./external"),s=a("./utf8"),o=a("./zipEntries"),r=a("./stream/Crc32Probe"),c=a("./nodejsUtils");function h(p){return new i.Promise(function(u,f){var m=p.decompressed.getContentWorker().pipe(new r);m.on("error",function(g){f(g)}).on("end",function(){m.streamInfo.crc32!==p.decompressed.crc32?f(new Error("Corrupted zip : CRC32 mismatch")):u()}).resume()})}t.exports=function(p,u){var f=this;return u=n.extend(u||{},{base64:!1,checkCRC32:!1,optimizedBinaryString:!1,createFolders:!1,decodeFileName:s.utf8decode}),c.isNode&&c.isStream(p)?i.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")):n.prepareContent("the loaded zip file",p,!0,u.optimizedBinaryString,u.base64).then(function(m){var g=new o(u);return g.load(m),g}).then(function(m){var g=[i.Promise.resolve(m)],l=m.files;if(u.checkCRC32)for(var d=0;d<l.length;d++)g.push(h(l[d]));return i.Promise.all(g)}).then(function(m){for(var g=m.shift(),l=g.files,d=0;d<l.length;d++){var _=l[d],y=_.fileNameStr,b=n.resolve(_.fileNameStr);f.file(b,_.decompressed,{binary:!0,optimizedBinaryString:!0,date:_.date,dir:_.dir,comment:_.fileCommentStr.length?_.fileCommentStr:null,unixPermissions:_.unixPermissions,dosPermissions:_.dosPermissions,createFolders:u.createFolders}),_.dir||(f.file(b).unsafeOriginalName=y)}return g.zipComment.length&&(f.comment=g.zipComment),f})}},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(a,t,e){"use strict";var n=a("../utils"),i=a("../stream/GenericWorker");function s(o,r){i.call(this,"Nodejs stream input adapter for "+o),this._upstreamEnded=!1,this._bindStream(r)}n.inherits(s,i),s.prototype._bindStream=function(o){var r=this;(this._stream=o).pause(),o.on("data",function(c){r.push({data:c,meta:{percent:0}})}).on("error",function(c){r.isPaused?this.generatedError=c:r.error(c)}).on("end",function(){r.isPaused?r._upstreamEnded=!0:r.end()})},s.prototype.pause=function(){return!!i.prototype.pause.call(this)&&(this._stream.pause(),!0)},s.prototype.resume=function(){return!!i.prototype.resume.call(this)&&(this._upstreamEnded?this.end():this._stream.resume(),!0)},t.exports=s},{"../stream/GenericWorker":28,"../utils":32}],13:[function(a,t,e){"use strict";var n=a("readable-stream").Readable;function i(s,o,r){n.call(this,o),this._helper=s;var c=this;s.on("data",function(h,p){c.push(h)||c._helper.pause(),r&&r(p)}).on("error",function(h){c.emit("error",h)}).on("end",function(){c.push(null)})}a("../utils").inherits(i,n),i.prototype._read=function(){this._helper.resume()},t.exports=i},{"../utils":32,"readable-stream":16}],14:[function(a,t,e){"use strict";t.exports={isNode:typeof Buffer<"u",newBufferFrom:function(n,i){if(Buffer.from&&Buffer.from!==Uint8Array.from)return Buffer.from(n,i);if(typeof n=="number")throw new Error('The "data" argument must not be a number');return new Buffer(n,i)},allocBuffer:function(n){if(Buffer.alloc)return Buffer.alloc(n);var i=new Buffer(n);return i.fill(0),i},isBuffer:function(n){return Buffer.isBuffer(n)},isStream:function(n){return n&&typeof n.on=="function"&&typeof n.pause=="function"&&typeof n.resume=="function"}}},{}],15:[function(a,t,e){"use strict";function n(b,w,S){var L,I=s.getTypeOf(w),A=s.extend(S||{},c);A.date=A.date||new Date,A.compression!==null&&(A.compression=A.compression.toUpperCase()),typeof A.unixPermissions=="string"&&(A.unixPermissions=parseInt(A.unixPermissions,8)),A.unixPermissions&&16384&A.unixPermissions&&(A.dir=!0),A.dosPermissions&&16&A.dosPermissions&&(A.dir=!0),A.dir&&(b=l(b)),A.createFolders&&(L=g(b))&&d.call(this,L,!0);var z=I==="string"&&A.binary===!1&&A.base64===!1;S&&S.binary!==void 0||(A.binary=!z),(w instanceof h&&w.uncompressedSize===0||A.dir||!w||w.length===0)&&(A.base64=!1,A.binary=!0,w="",A.compression="STORE",I="string");var T=null;T=w instanceof h||w instanceof o?w:f.isNode&&f.isStream(w)?new m(b,w):s.prepareContent(b,w,A.binary,A.optimizedBinaryString,A.base64);var N=new p(b,T,A);this.files[b]=N}var i=a("./utf8"),s=a("./utils"),o=a("./stream/GenericWorker"),r=a("./stream/StreamHelper"),c=a("./defaults"),h=a("./compressedObject"),p=a("./zipObject"),u=a("./generate"),f=a("./nodejsUtils"),m=a("./nodejs/NodejsStreamInputAdapter"),g=function(b){b.slice(-1)==="/"&&(b=b.substring(0,b.length-1));var w=b.lastIndexOf("/");return 0<w?b.substring(0,w):""},l=function(b){return b.slice(-1)!=="/"&&(b+="/"),b},d=function(b,w){return w=w!==void 0?w:c.createFolders,b=l(b),this.files[b]||n.call(this,b,null,{dir:!0,createFolders:w}),this.files[b]};function _(b){return Object.prototype.toString.call(b)==="[object RegExp]"}var y={load:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},forEach:function(b){var w,S,L;for(w in this.files)L=this.files[w],(S=w.slice(this.root.length,w.length))&&w.slice(0,this.root.length)===this.root&&b(S,L)},filter:function(b){var w=[];return this.forEach(function(S,L){b(S,L)&&w.push(L)}),w},file:function(b,w,S){if(arguments.length!==1)return b=this.root+b,n.call(this,b,w,S),this;if(_(b)){var L=b;return this.filter(function(A,z){return!z.dir&&L.test(A)})}var I=this.files[this.root+b];return I&&!I.dir?I:null},folder:function(b){if(!b)return this;if(_(b))return this.filter(function(I,A){return A.dir&&b.test(I)});var w=this.root+b,S=d.call(this,w),L=this.clone();return L.root=S.name,L},remove:function(b){b=this.root+b;var w=this.files[b];if(w||(b.slice(-1)!=="/"&&(b+="/"),w=this.files[b]),w&&!w.dir)delete this.files[b];else for(var S=this.filter(function(I,A){return A.name.slice(0,b.length)===b}),L=0;L<S.length;L++)delete this.files[S[L].name];return this},generate:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},generateInternalStream:function(b){var w,S={};try{if((S=s.extend(b||{},{streamFiles:!1,compression:"STORE",compressionOptions:null,type:"",platform:"DOS",comment:null,mimeType:"application/zip",encodeFileName:i.utf8encode})).type=S.type.toLowerCase(),S.compression=S.compression.toUpperCase(),S.type==="binarystring"&&(S.type="string"),!S.type)throw new Error("No output type specified.");s.checkSupport(S.type),S.platform!=="darwin"&&S.platform!=="freebsd"&&S.platform!=="linux"&&S.platform!=="sunos"||(S.platform="UNIX"),S.platform==="win32"&&(S.platform="DOS");var L=S.comment||this.comment||"";w=u.generateWorker(this,S,L)}catch(I){(w=new o("error")).error(I)}return new r(w,S.type||"string",S.mimeType)},generateAsync:function(b,w){return this.generateInternalStream(b).accumulate(w)},generateNodeStream:function(b,w){return(b=b||{}).type||(b.type="nodebuffer"),this.generateInternalStream(b).toNodejsStream(w)}};t.exports=y},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(a,t,e){"use strict";t.exports=a("stream")},{stream:void 0}],17:[function(a,t,e){"use strict";var n=a("./DataReader");function i(s){n.call(this,s);for(var o=0;o<this.data.length;o++)s[o]=255&s[o]}a("../utils").inherits(i,n),i.prototype.byteAt=function(s){return this.data[this.zero+s]},i.prototype.lastIndexOfSignature=function(s){for(var o=s.charCodeAt(0),r=s.charCodeAt(1),c=s.charCodeAt(2),h=s.charCodeAt(3),p=this.length-4;0<=p;--p)if(this.data[p]===o&&this.data[p+1]===r&&this.data[p+2]===c&&this.data[p+3]===h)return p-this.zero;return-1},i.prototype.readAndCheckSignature=function(s){var o=s.charCodeAt(0),r=s.charCodeAt(1),c=s.charCodeAt(2),h=s.charCodeAt(3),p=this.readData(4);return o===p[0]&&r===p[1]&&c===p[2]&&h===p[3]},i.prototype.readData=function(s){if(this.checkOffset(s),s===0)return[];var o=this.data.slice(this.zero+this.index,this.zero+this.index+s);return this.index+=s,o},t.exports=i},{"../utils":32,"./DataReader":18}],18:[function(a,t,e){"use strict";var n=a("../utils");function i(s){this.data=s,this.length=s.length,this.index=0,this.zero=0}i.prototype={checkOffset:function(s){this.checkIndex(this.index+s)},checkIndex:function(s){if(this.length<this.zero+s||s<0)throw new Error("End of data reached (data length = "+this.length+", asked index = "+s+"). Corrupted zip ?")},setIndex:function(s){this.checkIndex(s),this.index=s},skip:function(s){this.setIndex(this.index+s)},byteAt:function(){},readInt:function(s){var o,r=0;for(this.checkOffset(s),o=this.index+s-1;o>=this.index;o--)r=(r<<8)+this.byteAt(o);return this.index+=s,r},readString:function(s){return n.transformTo("string",this.readData(s))},readData:function(){},lastIndexOfSignature:function(){},readAndCheckSignature:function(){},readDate:function(){var s=this.readInt(4);return new Date(Date.UTC(1980+(s>>25&127),(s>>21&15)-1,s>>16&31,s>>11&31,s>>5&63,(31&s)<<1))}},t.exports=i},{"../utils":32}],19:[function(a,t,e){"use strict";var n=a("./Uint8ArrayReader");function i(s){n.call(this,s)}a("../utils").inherits(i,n),i.prototype.readData=function(s){this.checkOffset(s);var o=this.data.slice(this.zero+this.index,this.zero+this.index+s);return this.index+=s,o},t.exports=i},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(a,t,e){"use strict";var n=a("./DataReader");function i(s){n.call(this,s)}a("../utils").inherits(i,n),i.prototype.byteAt=function(s){return this.data.charCodeAt(this.zero+s)},i.prototype.lastIndexOfSignature=function(s){return this.data.lastIndexOf(s)-this.zero},i.prototype.readAndCheckSignature=function(s){return s===this.readData(4)},i.prototype.readData=function(s){this.checkOffset(s);var o=this.data.slice(this.zero+this.index,this.zero+this.index+s);return this.index+=s,o},t.exports=i},{"../utils":32,"./DataReader":18}],21:[function(a,t,e){"use strict";var n=a("./ArrayReader");function i(s){n.call(this,s)}a("../utils").inherits(i,n),i.prototype.readData=function(s){if(this.checkOffset(s),s===0)return new Uint8Array(0);var o=this.data.subarray(this.zero+this.index,this.zero+this.index+s);return this.index+=s,o},t.exports=i},{"../utils":32,"./ArrayReader":17}],22:[function(a,t,e){"use strict";var n=a("../utils"),i=a("../support"),s=a("./ArrayReader"),o=a("./StringReader"),r=a("./NodeBufferReader"),c=a("./Uint8ArrayReader");t.exports=function(h){var p=n.getTypeOf(h);return n.checkSupport(p),p!=="string"||i.uint8array?p==="nodebuffer"?new r(h):i.uint8array?new c(n.transformTo("uint8array",h)):new s(n.transformTo("array",h)):new o(h)}},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(a,t,e){"use strict";e.LOCAL_FILE_HEADER="PK",e.CENTRAL_FILE_HEADER="PK",e.CENTRAL_DIRECTORY_END="PK",e.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK\x07",e.ZIP64_CENTRAL_DIRECTORY_END="PK",e.DATA_DESCRIPTOR="PK\x07\b"},{}],24:[function(a,t,e){"use strict";var n=a("./GenericWorker"),i=a("../utils");function s(o){n.call(this,"ConvertWorker to "+o),this.destType=o}i.inherits(s,n),s.prototype.processChunk=function(o){this.push({data:i.transformTo(this.destType,o.data),meta:o.meta})},t.exports=s},{"../utils":32,"./GenericWorker":28}],25:[function(a,t,e){"use strict";var n=a("./GenericWorker"),i=a("../crc32");function s(){n.call(this,"Crc32Probe"),this.withStreamInfo("crc32",0)}a("../utils").inherits(s,n),s.prototype.processChunk=function(o){this.streamInfo.crc32=i(o.data,this.streamInfo.crc32||0),this.push(o)},t.exports=s},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(a,t,e){"use strict";var n=a("../utils"),i=a("./GenericWorker");function s(o){i.call(this,"DataLengthProbe for "+o),this.propName=o,this.withStreamInfo(o,0)}n.inherits(s,i),s.prototype.processChunk=function(o){if(o){var r=this.streamInfo[this.propName]||0;this.streamInfo[this.propName]=r+o.data.length}i.prototype.processChunk.call(this,o)},t.exports=s},{"../utils":32,"./GenericWorker":28}],27:[function(a,t,e){"use strict";var n=a("../utils"),i=a("./GenericWorker");function s(o){i.call(this,"DataWorker");var r=this;this.dataIsReady=!1,this.index=0,this.max=0,this.data=null,this.type="",this._tickScheduled=!1,o.then(function(c){r.dataIsReady=!0,r.data=c,r.max=c&&c.length||0,r.type=n.getTypeOf(c),r.isPaused||r._tickAndRepeat()},function(c){r.error(c)})}n.inherits(s,i),s.prototype.cleanUp=function(){i.prototype.cleanUp.call(this),this.data=null},s.prototype.resume=function(){return!!i.prototype.resume.call(this)&&(!this._tickScheduled&&this.dataIsReady&&(this._tickScheduled=!0,n.delay(this._tickAndRepeat,[],this)),!0)},s.prototype._tickAndRepeat=function(){this._tickScheduled=!1,this.isPaused||this.isFinished||(this._tick(),this.isFinished||(n.delay(this._tickAndRepeat,[],this),this._tickScheduled=!0))},s.prototype._tick=function(){if(this.isPaused||this.isFinished)return!1;var o=null,r=Math.min(this.max,this.index+16384);if(this.index>=this.max)return this.end();switch(this.type){case"string":o=this.data.substring(this.index,r);break;case"uint8array":o=this.data.subarray(this.index,r);break;case"array":case"nodebuffer":o=this.data.slice(this.index,r)}return this.index=r,this.push({data:o,meta:{percent:this.max?this.index/this.max*100:0}})},t.exports=s},{"../utils":32,"./GenericWorker":28}],28:[function(a,t,e){"use strict";function n(i){this.name=i||"default",this.streamInfo={},this.generatedError=null,this.extraStreamInfo={},this.isPaused=!0,this.isFinished=!1,this.isLocked=!1,this._listeners={data:[],end:[],error:[]},this.previous=null}n.prototype={push:function(i){this.emit("data",i)},end:function(){if(this.isFinished)return!1;this.flush();try{this.emit("end"),this.cleanUp(),this.isFinished=!0}catch(i){this.emit("error",i)}return!0},error:function(i){return!this.isFinished&&(this.isPaused?this.generatedError=i:(this.isFinished=!0,this.emit("error",i),this.previous&&this.previous.error(i),this.cleanUp()),!0)},on:function(i,s){return this._listeners[i].push(s),this},cleanUp:function(){this.streamInfo=this.generatedError=this.extraStreamInfo=null,this._listeners=[]},emit:function(i,s){if(this._listeners[i])for(var o=0;o<this._listeners[i].length;o++)this._listeners[i][o].call(this,s)},pipe:function(i){return i.registerPrevious(this)},registerPrevious:function(i){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.streamInfo=i.streamInfo,this.mergeStreamInfo(),this.previous=i;var s=this;return i.on("data",function(o){s.processChunk(o)}),i.on("end",function(){s.end()}),i.on("error",function(o){s.error(o)}),this},pause:function(){return!this.isPaused&&!this.isFinished&&(this.isPaused=!0,this.previous&&this.previous.pause(),!0)},resume:function(){if(!this.isPaused||this.isFinished)return!1;var i=this.isPaused=!1;return this.generatedError&&(this.error(this.generatedError),i=!0),this.previous&&this.previous.resume(),!i},flush:function(){},processChunk:function(i){this.push(i)},withStreamInfo:function(i,s){return this.extraStreamInfo[i]=s,this.mergeStreamInfo(),this},mergeStreamInfo:function(){for(var i in this.extraStreamInfo)Object.prototype.hasOwnProperty.call(this.extraStreamInfo,i)&&(this.streamInfo[i]=this.extraStreamInfo[i])},lock:function(){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.isLocked=!0,this.previous&&this.previous.lock()},toString:function(){var i="Worker "+this.name;return this.previous?this.previous+" -> "+i:i}},t.exports=n},{}],29:[function(a,t,e){"use strict";var n=a("../utils"),i=a("./ConvertWorker"),s=a("./GenericWorker"),o=a("../base64"),r=a("../support"),c=a("../external"),h=null;if(r.nodestream)try{h=a("../nodejs/NodejsStreamOutputAdapter")}catch(f){}function p(f,m){return new c.Promise(function(g,l){var d=[],_=f._internalType,y=f._outputType,b=f._mimeType;f.on("data",function(w,S){d.push(w),m&&m(S)}).on("error",function(w){d=[],l(w)}).on("end",function(){try{var w=function(S,L,I){switch(S){case"blob":return n.newBlob(n.transformTo("arraybuffer",L),I);case"base64":return o.encode(L);default:return n.transformTo(S,L)}}(y,function(S,L){var I,A=0,z=null,T=0;for(I=0;I<L.length;I++)T+=L[I].length;switch(S){case"string":return L.join("");case"array":return Array.prototype.concat.apply([],L);case"uint8array":for(z=new Uint8Array(T),I=0;I<L.length;I++)z.set(L[I],A),A+=L[I].length;return z;case"nodebuffer":return Buffer.concat(L);default:throw new Error("concat : unsupported type '"+S+"'")}}(_,d),b);g(w)}catch(S){l(S)}d=[]}).resume()})}function u(f,m,g){var l=m;switch(m){case"blob":case"arraybuffer":l="uint8array";break;case"base64":l="string"}try{this._internalType=l,this._outputType=m,this._mimeType=g,n.checkSupport(l),this._worker=f.pipe(new i(l)),f.lock()}catch(d){this._worker=new s("error"),this._worker.error(d)}}u.prototype={accumulate:function(f){return p(this,f)},on:function(f,m){var g=this;return f==="data"?this._worker.on(f,function(l){m.call(g,l.data,l.meta)}):this._worker.on(f,function(){n.delay(m,arguments,g)}),this},resume:function(){return n.delay(this._worker.resume,[],this._worker),this},pause:function(){return this._worker.pause(),this},toNodejsStream:function(f){if(n.checkSupport("nodestream"),this._outputType!=="nodebuffer")throw new Error(this._outputType+" is not supported by this method");return new h(this,{objectMode:this._outputType!=="nodebuffer"},f)}},t.exports=u},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(a,t,e){"use strict";if(e.base64=!0,e.array=!0,e.string=!0,e.arraybuffer=typeof ArrayBuffer<"u"&&typeof Uint8Array<"u",e.nodebuffer=typeof Buffer<"u",e.uint8array=typeof Uint8Array<"u",typeof ArrayBuffer>"u")e.blob=!1;else{var n=new ArrayBuffer(0);try{e.blob=new Blob([n],{type:"application/zip"}).size===0}catch(s){try{var i=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);i.append(n),e.blob=i.getBlob("application/zip").size===0}catch(o){e.blob=!1}}}try{e.nodestream=!!a("readable-stream").Readable}catch(s){e.nodestream=!1}},{"readable-stream":16}],31:[function(a,t,e){"use strict";for(var n=a("./utils"),i=a("./support"),s=a("./nodejsUtils"),o=a("./stream/GenericWorker"),r=new Array(256),c=0;c<256;c++)r[c]=252<=c?6:248<=c?5:240<=c?4:224<=c?3:192<=c?2:1;r[254]=r[254]=1;function h(){o.call(this,"utf-8 decode"),this.leftOver=null}function p(){o.call(this,"utf-8 encode")}e.utf8encode=function(u){return i.nodebuffer?s.newBufferFrom(u,"utf-8"):function(f){var m,g,l,d,_,y=f.length,b=0;for(d=0;d<y;d++)(64512&(g=f.charCodeAt(d)))==55296&&d+1<y&&(64512&(l=f.charCodeAt(d+1)))==56320&&(g=65536+(g-55296<<10)+(l-56320),d++),b+=g<128?1:g<2048?2:g<65536?3:4;for(m=i.uint8array?new Uint8Array(b):new Array(b),d=_=0;_<b;d++)(64512&(g=f.charCodeAt(d)))==55296&&d+1<y&&(64512&(l=f.charCodeAt(d+1)))==56320&&(g=65536+(g-55296<<10)+(l-56320),d++),g<128?m[_++]=g:(g<2048?m[_++]=192|g>>>6:(g<65536?m[_++]=224|g>>>12:(m[_++]=240|g>>>18,m[_++]=128|g>>>12&63),m[_++]=128|g>>>6&63),m[_++]=128|63&g);return m}(u)},e.utf8decode=function(u){return i.nodebuffer?n.transformTo("nodebuffer",u).toString("utf-8"):function(f){var m,g,l,d,_=f.length,y=new Array(2*_);for(m=g=0;m<_;)if((l=f[m++])<128)y[g++]=l;else if(4<(d=r[l]))y[g++]=65533,m+=d-1;else{for(l&=d===2?31:d===3?15:7;1<d&&m<_;)l=l<<6|63&f[m++],d--;1<d?y[g++]=65533:l<65536?y[g++]=l:(l-=65536,y[g++]=55296|l>>10&1023,y[g++]=56320|1023&l)}return y.length!==g&&(y.subarray?y=y.subarray(0,g):y.length=g),n.applyFromCharCode(y)}(u=n.transformTo(i.uint8array?"uint8array":"array",u))},n.inherits(h,o),h.prototype.processChunk=function(u){var f=n.transformTo(i.uint8array?"uint8array":"array",u.data);if(this.leftOver&&this.leftOver.length){if(i.uint8array){var m=f;(f=new Uint8Array(m.length+this.leftOver.length)).set(this.leftOver,0),f.set(m,this.leftOver.length)}else f=this.leftOver.concat(f);this.leftOver=null}var g=function(d,_){var y;for((_=_||d.length)>d.length&&(_=d.length),y=_-1;0<=y&&(192&d[y])==128;)y--;return y<0||y===0?_:y+r[d[y]]>_?y:_}(f),l=f;g!==f.length&&(i.uint8array?(l=f.subarray(0,g),this.leftOver=f.subarray(g,f.length)):(l=f.slice(0,g),this.leftOver=f.slice(g,f.length))),this.push({data:e.utf8decode(l),meta:u.meta})},h.prototype.flush=function(){this.leftOver&&this.leftOver.length&&(this.push({data:e.utf8decode(this.leftOver),meta:{}}),this.leftOver=null)},e.Utf8DecodeWorker=h,n.inherits(p,o),p.prototype.processChunk=function(u){this.push({data:e.utf8encode(u.data),meta:u.meta})},e.Utf8EncodeWorker=p},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(a,t,e){"use strict";var n=a("./support"),i=a("./base64"),s=a("./nodejsUtils"),o=a("./external");function r(m){return m}function c(m,g){for(var l=0;l<m.length;++l)g[l]=255&m.charCodeAt(l);return g}a("setimmediate"),e.newBlob=function(m,g){e.checkSupport("blob");try{return new Blob([m],{type:g})}catch(d){try{var l=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);return l.append(m),l.getBlob(g)}catch(_){throw new Error("Bug : can't construct the Blob.")}}};var h={stringifyByChunk:function(m,g,l){var d=[],_=0,y=m.length;if(y<=l)return String.fromCharCode.apply(null,m);for(;_<y;)g==="array"||g==="nodebuffer"?d.push(String.fromCharCode.apply(null,m.slice(_,Math.min(_+l,y)))):d.push(String.fromCharCode.apply(null,m.subarray(_,Math.min(_+l,y)))),_+=l;return d.join("")},stringifyByChar:function(m){for(var g="",l=0;l<m.length;l++)g+=String.fromCharCode(m[l]);return g},applyCanBeUsed:{uint8array:function(){try{return n.uint8array&&String.fromCharCode.apply(null,new Uint8Array(1)).length===1}catch(m){return!1}}(),nodebuffer:function(){try{return n.nodebuffer&&String.fromCharCode.apply(null,s.allocBuffer(1)).length===1}catch(m){return!1}}()}};function p(m){var g=65536,l=e.getTypeOf(m),d=!0;if(l==="uint8array"?d=h.applyCanBeUsed.uint8array:l==="nodebuffer"&&(d=h.applyCanBeUsed.nodebuffer),d)for(;1<g;)try{return h.stringifyByChunk(m,l,g)}catch(_){g=Math.floor(g/2)}return h.stringifyByChar(m)}function u(m,g){for(var l=0;l<m.length;l++)g[l]=m[l];return g}e.applyFromCharCode=p;var f={};f.string={string:r,array:function(m){return c(m,new Array(m.length))},arraybuffer:function(m){return f.string.uint8array(m).buffer},uint8array:function(m){return c(m,new Uint8Array(m.length))},nodebuffer:function(m){return c(m,s.allocBuffer(m.length))}},f.array={string:p,array:r,arraybuffer:function(m){return new Uint8Array(m).buffer},uint8array:function(m){return new Uint8Array(m)},nodebuffer:function(m){return s.newBufferFrom(m)}},f.arraybuffer={string:function(m){return p(new Uint8Array(m))},array:function(m){return u(new Uint8Array(m),new Array(m.byteLength))},arraybuffer:r,uint8array:function(m){return new Uint8Array(m)},nodebuffer:function(m){return s.newBufferFrom(new Uint8Array(m))}},f.uint8array={string:p,array:function(m){return u(m,new Array(m.length))},arraybuffer:function(m){return m.buffer},uint8array:r,nodebuffer:function(m){return s.newBufferFrom(m)}},f.nodebuffer={string:p,array:function(m){return u(m,new Array(m.length))},arraybuffer:function(m){return f.nodebuffer.uint8array(m).buffer},uint8array:function(m){return u(m,new Uint8Array(m.length))},nodebuffer:r},e.transformTo=function(m,g){if(g=g||"",!m)return g;e.checkSupport(m);var l=e.getTypeOf(g);return f[l][m](g)},e.resolve=function(m){for(var g=m.split("/"),l=[],d=0;d<g.length;d++){var _=g[d];_==="."||_===""&&d!==0&&d!==g.length-1||(_===".."?l.pop():l.push(_))}return l.join("/")},e.getTypeOf=function(m){return typeof m=="string"?"string":Object.prototype.toString.call(m)==="[object Array]"?"array":n.nodebuffer&&s.isBuffer(m)?"nodebuffer":n.uint8array&&m instanceof Uint8Array?"uint8array":n.arraybuffer&&m instanceof ArrayBuffer?"arraybuffer":void 0},e.checkSupport=function(m){if(!n[m.toLowerCase()])throw new Error(m+" is not supported by this platform")},e.MAX_VALUE_16BITS=65535,e.MAX_VALUE_32BITS=-1,e.pretty=function(m){var g,l,d="";for(l=0;l<(m||"").length;l++)d+="\\x"+((g=m.charCodeAt(l))<16?"0":"")+g.toString(16).toUpperCase();return d},e.delay=function(m,g,l){setImmediate(function(){m.apply(l||null,g||[])})},e.inherits=function(m,g){function l(){}l.prototype=g.prototype,m.prototype=new l},e.extend=function(){var m,g,l={};for(m=0;m<arguments.length;m++)for(g in arguments[m])Object.prototype.hasOwnProperty.call(arguments[m],g)&&l[g]===void 0&&(l[g]=arguments[m][g]);return l},e.prepareContent=function(m,g,l,d,_){return o.Promise.resolve(g).then(function(y){return n.blob&&(y instanceof Blob||["[object File]","[object Blob]"].indexOf(Object.prototype.toString.call(y))!==-1)&&typeof FileReader<"u"?new o.Promise(function(b,w){var S=new FileReader;S.onload=function(L){b(L.target.result)},S.onerror=function(L){w(L.target.error)},S.readAsArrayBuffer(y)}):y}).then(function(y){var b=e.getTypeOf(y);return b?(b==="arraybuffer"?y=e.transformTo("uint8array",y):b==="string"&&(_?y=i.decode(y):l&&d!==!0&&(y=function(w){return c(w,n.uint8array?new Uint8Array(w.length):new Array(w.length))}(y))),y):o.Promise.reject(new Error("Can't read the data of '"+m+"'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))})}},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,setimmediate:54}],33:[function(a,t,e){"use strict";var n=a("./reader/readerFor"),i=a("./utils"),s=a("./signature"),o=a("./zipEntry"),r=a("./support");function c(h){this.files=[],this.loadOptions=h}c.prototype={checkSignature:function(h){if(!this.reader.readAndCheckSignature(h)){this.reader.index-=4;var p=this.reader.readString(4);throw new Error("Corrupted zip or bug: unexpected signature ("+i.pretty(p)+", expected "+i.pretty(h)+")")}},isSignature:function(h,p){var u=this.reader.index;this.reader.setIndex(h);var f=this.reader.readString(4)===p;return this.reader.setIndex(u),f},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2);var h=this.reader.readData(this.zipCommentLength),p=r.uint8array?"uint8array":"array",u=i.transformTo(p,h);this.zipComment=this.loadOptions.decodeFileName(u)},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.reader.skip(4),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={};for(var h,p,u,f=this.zip64EndOfCentralSize-44;0<f;)h=this.reader.readInt(2),p=this.reader.readInt(4),u=this.reader.readData(p),this.zip64ExtensibleData[h]={id:h,length:p,value:u}},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),1<this.disksCount)throw new Error("Multi-volumes zip are not supported")},readLocalFiles:function(){var h,p;for(h=0;h<this.files.length;h++)p=this.files[h],this.reader.setIndex(p.localHeaderOffset),this.checkSignature(s.LOCAL_FILE_HEADER),p.readLocalPart(this.reader),p.handleUTF8(),p.processAttributes()},readCentralDir:function(){var h;for(this.reader.setIndex(this.centralDirOffset);this.reader.readAndCheckSignature(s.CENTRAL_FILE_HEADER);)(h=new o({zip64:this.zip64},this.loadOptions)).readCentralPart(this.reader),this.files.push(h);if(this.centralDirRecords!==this.files.length&&this.centralDirRecords!==0&&this.files.length===0)throw new Error("Corrupted zip or bug: expected "+this.centralDirRecords+" records in central dir, got "+this.files.length)},readEndOfCentral:function(){var h=this.reader.lastIndexOfSignature(s.CENTRAL_DIRECTORY_END);if(h<0)throw this.isSignature(0,s.LOCAL_FILE_HEADER)?new Error("Corrupted zip: can't find end of central directory"):new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");this.reader.setIndex(h);var p=h;if(this.checkSignature(s.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===i.MAX_VALUE_16BITS||this.diskWithCentralDirStart===i.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===i.MAX_VALUE_16BITS||this.centralDirRecords===i.MAX_VALUE_16BITS||this.centralDirSize===i.MAX_VALUE_32BITS||this.centralDirOffset===i.MAX_VALUE_32BITS){if(this.zip64=!0,(h=this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR))<0)throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");if(this.reader.setIndex(h),this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,s.ZIP64_CENTRAL_DIRECTORY_END)&&(this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_END),this.relativeOffsetEndOfZip64CentralDir<0))throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral()}var u=this.centralDirOffset+this.centralDirSize;this.zip64&&(u+=20,u+=12+this.zip64EndOfCentralSize);var f=p-u;if(0<f)this.isSignature(p,s.CENTRAL_FILE_HEADER)||(this.reader.zero=f);else if(f<0)throw new Error("Corrupted zip: missing "+Math.abs(f)+" bytes.")},prepareReader:function(h){this.reader=n(h)},load:function(h){this.prepareReader(h),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles()}},t.exports=c},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utils":32,"./zipEntry":34}],34:[function(a,t,e){"use strict";var n=a("./reader/readerFor"),i=a("./utils"),s=a("./compressedObject"),o=a("./crc32"),r=a("./utf8"),c=a("./compressions"),h=a("./support");function p(u,f){this.options=u,this.loadOptions=f}p.prototype={isEncrypted:function(){return(1&this.bitFlag)==1},useUTF8:function(){return(2048&this.bitFlag)==2048},readLocalPart:function(u){var f,m;if(u.skip(22),this.fileNameLength=u.readInt(2),m=u.readInt(2),this.fileName=u.readData(this.fileNameLength),u.skip(m),this.compressedSize===-1||this.uncompressedSize===-1)throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");if((f=function(g){for(var l in c)if(Object.prototype.hasOwnProperty.call(c,l)&&c[l].magic===g)return c[l];return null}(this.compressionMethod))===null)throw new Error("Corrupted zip : compression "+i.pretty(this.compressionMethod)+" unknown (inner file : "+i.transformTo("string",this.fileName)+")");this.decompressed=new s(this.compressedSize,this.uncompressedSize,this.crc32,f,u.readData(this.compressedSize))},readCentralPart:function(u){this.versionMadeBy=u.readInt(2),u.skip(2),this.bitFlag=u.readInt(2),this.compressionMethod=u.readString(2),this.date=u.readDate(),this.crc32=u.readInt(4),this.compressedSize=u.readInt(4),this.uncompressedSize=u.readInt(4);var f=u.readInt(2);if(this.extraFieldsLength=u.readInt(2),this.fileCommentLength=u.readInt(2),this.diskNumberStart=u.readInt(2),this.internalFileAttributes=u.readInt(2),this.externalFileAttributes=u.readInt(4),this.localHeaderOffset=u.readInt(4),this.isEncrypted())throw new Error("Encrypted zip are not supported");u.skip(f),this.readExtraFields(u),this.parseZIP64ExtraField(u),this.fileComment=u.readData(this.fileCommentLength)},processAttributes:function(){this.unixPermissions=null,this.dosPermissions=null;var u=this.versionMadeBy>>8;this.dir=!!(16&this.externalFileAttributes),u==0&&(this.dosPermissions=63&this.externalFileAttributes),u==3&&(this.unixPermissions=this.externalFileAttributes>>16&65535),this.dir||this.fileNameStr.slice(-1)!=="/"||(this.dir=!0)},parseZIP64ExtraField:function(){if(this.extraFields[1]){var u=n(this.extraFields[1].value);this.uncompressedSize===i.MAX_VALUE_32BITS&&(this.uncompressedSize=u.readInt(8)),this.compressedSize===i.MAX_VALUE_32BITS&&(this.compressedSize=u.readInt(8)),this.localHeaderOffset===i.MAX_VALUE_32BITS&&(this.localHeaderOffset=u.readInt(8)),this.diskNumberStart===i.MAX_VALUE_32BITS&&(this.diskNumberStart=u.readInt(4))}},readExtraFields:function(u){var f,m,g,l=u.index+this.extraFieldsLength;for(this.extraFields||(this.extraFields={});u.index+4<l;)f=u.readInt(2),m=u.readInt(2),g=u.readData(m),this.extraFields[f]={id:f,length:m,value:g};u.setIndex(l)},handleUTF8:function(){var u=h.uint8array?"uint8array":"array";if(this.useUTF8())this.fileNameStr=r.utf8decode(this.fileName),this.fileCommentStr=r.utf8decode(this.fileComment);else{var f=this.findExtraFieldUnicodePath();if(f!==null)this.fileNameStr=f;else{var m=i.transformTo(u,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(m)}var g=this.findExtraFieldUnicodeComment();if(g!==null)this.fileCommentStr=g;else{var l=i.transformTo(u,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(l)}}},findExtraFieldUnicodePath:function(){var u=this.extraFields[28789];if(u){var f=n(u.value);return f.readInt(1)!==1||o(this.fileName)!==f.readInt(4)?null:r.utf8decode(f.readData(u.length-5))}return null},findExtraFieldUnicodeComment:function(){var u=this.extraFields[25461];if(u){var f=n(u.value);return f.readInt(1)!==1||o(this.fileComment)!==f.readInt(4)?null:r.utf8decode(f.readData(u.length-5))}return null}},t.exports=p},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(a,t,e){"use strict";function n(f,m,g){this.name=f,this.dir=g.dir,this.date=g.date,this.comment=g.comment,this.unixPermissions=g.unixPermissions,this.dosPermissions=g.dosPermissions,this._data=m,this._dataBinary=g.binary,this.options={compression:g.compression,compressionOptions:g.compressionOptions}}var i=a("./stream/StreamHelper"),s=a("./stream/DataWorker"),o=a("./utf8"),r=a("./compressedObject"),c=a("./stream/GenericWorker");n.prototype={internalStream:function(f){var m=null,g="string";try{if(!f)throw new Error("No output type specified.");var l=(g=f.toLowerCase())==="string"||g==="text";g!=="binarystring"&&g!=="text"||(g="string"),m=this._decompressWorker();var d=!this._dataBinary;d&&!l&&(m=m.pipe(new o.Utf8EncodeWorker)),!d&&l&&(m=m.pipe(new o.Utf8DecodeWorker))}catch(_){(m=new c("error")).error(_)}return new i(m,g,"")},async:function(f,m){return this.internalStream(f).accumulate(m)},nodeStream:function(f,m){return this.internalStream(f||"nodebuffer").toNodejsStream(m)},_compressWorker:function(f,m){if(this._data instanceof r&&this._data.compression.magic===f.magic)return this._data.getCompressedWorker();var g=this._decompressWorker();return this._dataBinary||(g=g.pipe(new o.Utf8EncodeWorker)),r.createWorkerFrom(g,f,m)},_decompressWorker:function(){return this._data instanceof r?this._data.getContentWorker():this._data instanceof c?this._data:new s(this._data)}};for(var h=["asText","asBinary","asNodeBuffer","asUint8Array","asArrayBuffer"],p=function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},u=0;u<h.length;u++)n.prototype[h[u]]=p;t.exports=n},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(a,t,e){(function(n){"use strict";var i,s,o=n.MutationObserver||n.WebKitMutationObserver;if(o){var r=0,c=new o(f),h=n.document.createTextNode("");c.observe(h,{characterData:!0}),i=function(){h.data=r=++r%2}}else if(n.setImmediate||n.MessageChannel===void 0)i="document"in n&&"onreadystatechange"in n.document.createElement("script")?function(){var m=n.document.createElement("script");m.onreadystatechange=function(){f(),m.onreadystatechange=null,m.parentNode.removeChild(m),m=null},n.document.documentElement.appendChild(m)}:function(){setTimeout(f,0)};else{var p=new n.MessageChannel;p.port1.onmessage=f,i=function(){p.port2.postMessage(0)}}var u=[];function f(){var m,g;s=!0;for(var l=u.length;l;){for(g=u,u=[],m=-1;++m<l;)g[m]();l=u.length}s=!1}t.exports=function(m){u.push(m)!==1||s||i()}}).call(this,typeof global<"u"?global:typeof self<"u"?self:typeof window<"u"?window:{})},{}],37:[function(a,t,e){"use strict";var n=a("immediate");function i(){}var s={},o=["REJECTED"],r=["FULFILLED"],c=["PENDING"];function h(l){if(typeof l!="function")throw new TypeError("resolver must be a function");this.state=c,this.queue=[],this.outcome=void 0,l!==i&&m(this,l)}function p(l,d,_){this.promise=l,typeof d=="function"&&(this.onFulfilled=d,this.callFulfilled=this.otherCallFulfilled),typeof _=="function"&&(this.onRejected=_,this.callRejected=this.otherCallRejected)}function u(l,d,_){n(function(){var y;try{y=d(_)}catch(b){return s.reject(l,b)}y===l?s.reject(l,new TypeError("Cannot resolve promise with itself")):s.resolve(l,y)})}function f(l){var d=l&&l.then;if(l&&(typeof l=="object"||typeof l=="function")&&typeof d=="function")return function(){d.apply(l,arguments)}}function m(l,d){var _=!1;function y(S){_||(_=!0,s.reject(l,S))}function b(S){_||(_=!0,s.resolve(l,S))}var w=g(function(){d(b,y)});w.status==="error"&&y(w.value)}function g(l,d){var _={};try{_.value=l(d),_.status="success"}catch(y){_.status="error",_.value=y}return _}(t.exports=h).prototype.finally=function(l){if(typeof l!="function")return this;var d=this.constructor;return this.then(function(_){return d.resolve(l()).then(function(){return _})},function(_){return d.resolve(l()).then(function(){throw _})})},h.prototype.catch=function(l){return this.then(null,l)},h.prototype.then=function(l,d){if(typeof l!="function"&&this.state===r||typeof d!="function"&&this.state===o)return this;var _=new this.constructor(i);return this.state!==c?u(_,this.state===r?l:d,this.outcome):this.queue.push(new p(_,l,d)),_},p.prototype.callFulfilled=function(l){s.resolve(this.promise,l)},p.prototype.otherCallFulfilled=function(l){u(this.promise,this.onFulfilled,l)},p.prototype.callRejected=function(l){s.reject(this.promise,l)},p.prototype.otherCallRejected=function(l){u(this.promise,this.onRejected,l)},s.resolve=function(l,d){var _=g(f,d);if(_.status==="error")return s.reject(l,_.value);var y=_.value;if(y)m(l,y);else{l.state=r,l.outcome=d;for(var b=-1,w=l.queue.length;++b<w;)l.queue[b].callFulfilled(d)}return l},s.reject=function(l,d){l.state=o,l.outcome=d;for(var _=-1,y=l.queue.length;++_<y;)l.queue[_].callRejected(d);return l},h.resolve=function(l){return l instanceof this?l:s.resolve(new this(i),l)},h.reject=function(l){var d=new this(i);return s.reject(d,l)},h.all=function(l){var d=this;if(Object.prototype.toString.call(l)!=="[object Array]")return this.reject(new TypeError("must be an array"));var _=l.length,y=!1;if(!_)return this.resolve([]);for(var b=new Array(_),w=0,S=-1,L=new this(i);++S<_;)I(l[S],S);return L;function I(A,z){d.resolve(A).then(function(T){b[z]=T,++w!==_||y||(y=!0,s.resolve(L,b))},function(T){y||(y=!0,s.reject(L,T))})}},h.race=function(l){var d=this;if(Object.prototype.toString.call(l)!=="[object Array]")return this.reject(new TypeError("must be an array"));var _=l.length,y=!1;if(!_)return this.resolve([]);for(var b=-1,w=new this(i);++b<_;)S=l[b],d.resolve(S).then(function(L){y||(y=!0,s.resolve(w,L))},function(L){y||(y=!0,s.reject(w,L))});var S;return w}},{immediate:36}],38:[function(a,t,e){"use strict";var n={};(0,a("./lib/utils/common").assign)(n,a("./lib/deflate"),a("./lib/inflate"),a("./lib/zlib/constants")),t.exports=n},{"./lib/deflate":39,"./lib/inflate":40,"./lib/utils/common":41,"./lib/zlib/constants":44}],39:[function(a,t,e){"use strict";var n=a("./zlib/deflate"),i=a("./utils/common"),s=a("./utils/strings"),o=a("./zlib/messages"),r=a("./zlib/zstream"),c=Object.prototype.toString,h=0,p=-1,u=0,f=8;function m(l){if(!(this instanceof m))return new m(l);this.options=i.assign({level:p,method:f,chunkSize:16384,windowBits:15,memLevel:8,strategy:u,to:""},l||{});var d=this.options;d.raw&&0<d.windowBits?d.windowBits=-d.windowBits:d.gzip&&0<d.windowBits&&d.windowBits<16&&(d.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new r,this.strm.avail_out=0;var _=n.deflateInit2(this.strm,d.level,d.method,d.windowBits,d.memLevel,d.strategy);if(_!==h)throw new Error(o[_]);if(d.header&&n.deflateSetHeader(this.strm,d.header),d.dictionary){var y;if(y=typeof d.dictionary=="string"?s.string2buf(d.dictionary):c.call(d.dictionary)==="[object ArrayBuffer]"?new Uint8Array(d.dictionary):d.dictionary,(_=n.deflateSetDictionary(this.strm,y))!==h)throw new Error(o[_]);this._dict_set=!0}}function g(l,d){var _=new m(d);if(_.push(l,!0),_.err)throw _.msg||o[_.err];return _.result}m.prototype.push=function(l,d){var _,y,b=this.strm,w=this.options.chunkSize;if(this.ended)return!1;y=d===~~d?d:d===!0?4:0,typeof l=="string"?b.input=s.string2buf(l):c.call(l)==="[object ArrayBuffer]"?b.input=new Uint8Array(l):b.input=l,b.next_in=0,b.avail_in=b.input.length;do{if(b.avail_out===0&&(b.output=new i.Buf8(w),b.next_out=0,b.avail_out=w),(_=n.deflate(b,y))!==1&&_!==h)return this.onEnd(_),!(this.ended=!0);b.avail_out!==0&&(b.avail_in!==0||y!==4&&y!==2)||(this.options.to==="string"?this.onData(s.buf2binstring(i.shrinkBuf(b.output,b.next_out))):this.onData(i.shrinkBuf(b.output,b.next_out)))}while((0<b.avail_in||b.avail_out===0)&&_!==1);return y===4?(_=n.deflateEnd(this.strm),this.onEnd(_),this.ended=!0,_===h):y!==2||(this.onEnd(h),!(b.avail_out=0))},m.prototype.onData=function(l){this.chunks.push(l)},m.prototype.onEnd=function(l){l===h&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=i.flattenChunks(this.chunks)),this.chunks=[],this.err=l,this.msg=this.strm.msg},e.Deflate=m,e.deflate=g,e.deflateRaw=function(l,d){return(d=d||{}).raw=!0,g(l,d)},e.gzip=function(l,d){return(d=d||{}).gzip=!0,g(l,d)}},{"./utils/common":41,"./utils/strings":42,"./zlib/deflate":46,"./zlib/messages":51,"./zlib/zstream":53}],40:[function(a,t,e){"use strict";var n=a("./zlib/inflate"),i=a("./utils/common"),s=a("./utils/strings"),o=a("./zlib/constants"),r=a("./zlib/messages"),c=a("./zlib/zstream"),h=a("./zlib/gzheader"),p=Object.prototype.toString;function u(m){if(!(this instanceof u))return new u(m);this.options=i.assign({chunkSize:16384,windowBits:0,to:""},m||{});var g=this.options;g.raw&&0<=g.windowBits&&g.windowBits<16&&(g.windowBits=-g.windowBits,g.windowBits===0&&(g.windowBits=-15)),!(0<=g.windowBits&&g.windowBits<16)||m&&m.windowBits||(g.windowBits+=32),15<g.windowBits&&g.windowBits<48&&(15&g.windowBits)==0&&(g.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new c,this.strm.avail_out=0;var l=n.inflateInit2(this.strm,g.windowBits);if(l!==o.Z_OK)throw new Error(r[l]);this.header=new h,n.inflateGetHeader(this.strm,this.header)}function f(m,g){var l=new u(g);if(l.push(m,!0),l.err)throw l.msg||r[l.err];return l.result}u.prototype.push=function(m,g){var l,d,_,y,b,w,S=this.strm,L=this.options.chunkSize,I=this.options.dictionary,A=!1;if(this.ended)return!1;d=g===~~g?g:g===!0?o.Z_FINISH:o.Z_NO_FLUSH,typeof m=="string"?S.input=s.binstring2buf(m):p.call(m)==="[object ArrayBuffer]"?S.input=new Uint8Array(m):S.input=m,S.next_in=0,S.avail_in=S.input.length;do{if(S.avail_out===0&&(S.output=new i.Buf8(L),S.next_out=0,S.avail_out=L),(l=n.inflate(S,o.Z_NO_FLUSH))===o.Z_NEED_DICT&&I&&(w=typeof I=="string"?s.string2buf(I):p.call(I)==="[object ArrayBuffer]"?new Uint8Array(I):I,l=n.inflateSetDictionary(this.strm,w)),l===o.Z_BUF_ERROR&&A===!0&&(l=o.Z_OK,A=!1),l!==o.Z_STREAM_END&&l!==o.Z_OK)return this.onEnd(l),!(this.ended=!0);S.next_out&&(S.avail_out!==0&&l!==o.Z_STREAM_END&&(S.avail_in!==0||d!==o.Z_FINISH&&d!==o.Z_SYNC_FLUSH)||(this.options.to==="string"?(_=s.utf8border(S.output,S.next_out),y=S.next_out-_,b=s.buf2string(S.output,_),S.next_out=y,S.avail_out=L-y,y&&i.arraySet(S.output,S.output,_,y,0),this.onData(b)):this.onData(i.shrinkBuf(S.output,S.next_out)))),S.avail_in===0&&S.avail_out===0&&(A=!0)}while((0<S.avail_in||S.avail_out===0)&&l!==o.Z_STREAM_END);return l===o.Z_STREAM_END&&(d=o.Z_FINISH),d===o.Z_FINISH?(l=n.inflateEnd(this.strm),this.onEnd(l),this.ended=!0,l===o.Z_OK):d!==o.Z_SYNC_FLUSH||(this.onEnd(o.Z_OK),!(S.avail_out=0))},u.prototype.onData=function(m){this.chunks.push(m)},u.prototype.onEnd=function(m){m===o.Z_OK&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=i.flattenChunks(this.chunks)),this.chunks=[],this.err=m,this.msg=this.strm.msg},e.Inflate=u,e.inflate=f,e.inflateRaw=function(m,g){return(g=g||{}).raw=!0,f(m,g)},e.ungzip=f},{"./utils/common":41,"./utils/strings":42,"./zlib/constants":44,"./zlib/gzheader":47,"./zlib/inflate":49,"./zlib/messages":51,"./zlib/zstream":53}],41:[function(a,t,e){"use strict";var n=typeof Uint8Array<"u"&&typeof Uint16Array<"u"&&typeof Int32Array<"u";e.assign=function(o){for(var r=Array.prototype.slice.call(arguments,1);r.length;){var c=r.shift();if(c){if(typeof c!="object")throw new TypeError(c+"must be non-object");for(var h in c)c.hasOwnProperty(h)&&(o[h]=c[h])}}return o},e.shrinkBuf=function(o,r){return o.length===r?o:o.subarray?o.subarray(0,r):(o.length=r,o)};var i={arraySet:function(o,r,c,h,p){if(r.subarray&&o.subarray)o.set(r.subarray(c,c+h),p);else for(var u=0;u<h;u++)o[p+u]=r[c+u]},flattenChunks:function(o){var r,c,h,p,u,f;for(r=h=0,c=o.length;r<c;r++)h+=o[r].length;for(f=new Uint8Array(h),r=p=0,c=o.length;r<c;r++)u=o[r],f.set(u,p),p+=u.length;return f}},s={arraySet:function(o,r,c,h,p){for(var u=0;u<h;u++)o[p+u]=r[c+u]},flattenChunks:function(o){return[].concat.apply([],o)}};e.setTyped=function(o){o?(e.Buf8=Uint8Array,e.Buf16=Uint16Array,e.Buf32=Int32Array,e.assign(e,i)):(e.Buf8=Array,e.Buf16=Array,e.Buf32=Array,e.assign(e,s))},e.setTyped(n)},{}],42:[function(a,t,e){"use strict";var n=a("./common"),i=!0,s=!0;try{String.fromCharCode.apply(null,[0])}catch(h){i=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(h){s=!1}for(var o=new n.Buf8(256),r=0;r<256;r++)o[r]=252<=r?6:248<=r?5:240<=r?4:224<=r?3:192<=r?2:1;function c(h,p){if(p<65537&&(h.subarray&&s||!h.subarray&&i))return String.fromCharCode.apply(null,n.shrinkBuf(h,p));for(var u="",f=0;f<p;f++)u+=String.fromCharCode(h[f]);return u}o[254]=o[254]=1,e.string2buf=function(h){var p,u,f,m,g,l=h.length,d=0;for(m=0;m<l;m++)(64512&(u=h.charCodeAt(m)))==55296&&m+1<l&&(64512&(f=h.charCodeAt(m+1)))==56320&&(u=65536+(u-55296<<10)+(f-56320),m++),d+=u<128?1:u<2048?2:u<65536?3:4;for(p=new n.Buf8(d),m=g=0;g<d;m++)(64512&(u=h.charCodeAt(m)))==55296&&m+1<l&&(64512&(f=h.charCodeAt(m+1)))==56320&&(u=65536+(u-55296<<10)+(f-56320),m++),u<128?p[g++]=u:(u<2048?p[g++]=192|u>>>6:(u<65536?p[g++]=224|u>>>12:(p[g++]=240|u>>>18,p[g++]=128|u>>>12&63),p[g++]=128|u>>>6&63),p[g++]=128|63&u);return p},e.buf2binstring=function(h){return c(h,h.length)},e.binstring2buf=function(h){for(var p=new n.Buf8(h.length),u=0,f=p.length;u<f;u++)p[u]=h.charCodeAt(u);return p},e.buf2string=function(h,p){var u,f,m,g,l=p||h.length,d=new Array(2*l);for(u=f=0;u<l;)if((m=h[u++])<128)d[f++]=m;else if(4<(g=o[m]))d[f++]=65533,u+=g-1;else{for(m&=g===2?31:g===3?15:7;1<g&&u<l;)m=m<<6|63&h[u++],g--;1<g?d[f++]=65533:m<65536?d[f++]=m:(m-=65536,d[f++]=55296|m>>10&1023,d[f++]=56320|1023&m)}return c(d,f)},e.utf8border=function(h,p){var u;for((p=p||h.length)>h.length&&(p=h.length),u=p-1;0<=u&&(192&h[u])==128;)u--;return u<0||u===0?p:u+o[h[u]]>p?u:p}},{"./common":41}],43:[function(a,t,e){"use strict";t.exports=function(n,i,s,o){for(var r=65535&n|0,c=n>>>16&65535|0,h=0;s!==0;){for(s-=h=2e3<s?2e3:s;c=c+(r=r+i[o++]|0)|0,--h;);r%=65521,c%=65521}return r|c<<16|0}},{}],44:[function(a,t,e){"use strict";t.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],45:[function(a,t,e){"use strict";var n=function(){for(var i,s=[],o=0;o<256;o++){i=o;for(var r=0;r<8;r++)i=1&i?3988292384^i>>>1:i>>>1;s[o]=i}return s}();t.exports=function(i,s,o,r){var c=n,h=r+o;i^=-1;for(var p=r;p<h;p++)i=i>>>8^c[255&(i^s[p])];return-1^i}},{}],46:[function(a,t,e){"use strict";var n,i=a("../utils/common"),s=a("./trees"),o=a("./adler32"),r=a("./crc32"),c=a("./messages"),h=0,p=4,u=0,f=-2,m=-1,g=4,l=2,d=8,_=9,y=286,b=30,w=19,S=2*y+1,L=15,I=3,A=258,z=A+I+1,T=42,N=113,v=1,O=2,B=3,U=4;function nt(x,X){return x.msg=c[X],X}function G(x){return(x<<1)-(4<x?9:0)}function J(x){for(var X=x.length;0<=--X;)x[X]=0}function C(x){var X=x.state,Q=X.pending;Q>x.avail_out&&(Q=x.avail_out),Q!==0&&(i.arraySet(x.output,X.pending_buf,X.pending_out,Q,x.next_out),x.next_out+=Q,X.pending_out+=Q,x.total_out+=Q,x.avail_out-=Q,X.pending-=Q,X.pending===0&&(X.pending_out=0))}function R(x,X){s._tr_flush_block(x,0<=x.block_start?x.block_start:-1,x.strstart-x.block_start,X),x.block_start=x.strstart,C(x.strm)}function it(x,X){x.pending_buf[x.pending++]=X}function Z(x,X){x.pending_buf[x.pending++]=X>>>8&255,x.pending_buf[x.pending++]=255&X}function K(x,X){var Q,k,P=x.max_chain_length,V=x.strstart,rt=x.prev_length,st=x.nice_match,q=x.strstart>x.w_size-z?x.strstart-(x.w_size-z):0,ut=x.window,E=x.w_mask,M=x.prev,H=x.strstart+A,ot=ut[V+rt-1],ht=ut[V+rt];x.prev_length>=x.good_match&&(P>>=2),st>x.lookahead&&(st=x.lookahead);do if(ut[(Q=X)+rt]===ht&&ut[Q+rt-1]===ot&&ut[Q]===ut[V]&&ut[++Q]===ut[V+1]){V+=2,Q++;do;while(ut[++V]===ut[++Q]&&ut[++V]===ut[++Q]&&ut[++V]===ut[++Q]&&ut[++V]===ut[++Q]&&ut[++V]===ut[++Q]&&ut[++V]===ut[++Q]&&ut[++V]===ut[++Q]&&ut[++V]===ut[++Q]&&V<H);if(k=A-(H-V),V=H-A,rt<k){if(x.match_start=X,st<=(rt=k))break;ot=ut[V+rt-1],ht=ut[V+rt]}}while((X=M[X&E])>q&&--P!=0);return rt<=x.lookahead?rt:x.lookahead}function ft(x){var X,Q,k,P,V,rt,st,q,ut,E,M=x.w_size;do{if(P=x.window_size-x.lookahead-x.strstart,x.strstart>=M+(M-z)){for(i.arraySet(x.window,x.window,M,M,0),x.match_start-=M,x.strstart-=M,x.block_start-=M,X=Q=x.hash_size;k=x.head[--X],x.head[X]=M<=k?k-M:0,--Q;);for(X=Q=M;k=x.prev[--X],x.prev[X]=M<=k?k-M:0,--Q;);P+=M}if(x.strm.avail_in===0)break;if(rt=x.strm,st=x.window,q=x.strstart+x.lookahead,ut=P,E=void 0,E=rt.avail_in,ut<E&&(E=ut),Q=E===0?0:(rt.avail_in-=E,i.arraySet(st,rt.input,rt.next_in,E,q),rt.state.wrap===1?rt.adler=o(rt.adler,st,E,q):rt.state.wrap===2&&(rt.adler=r(rt.adler,st,E,q)),rt.next_in+=E,rt.total_in+=E,E),x.lookahead+=Q,x.lookahead+x.insert>=I)for(V=x.strstart-x.insert,x.ins_h=x.window[V],x.ins_h=(x.ins_h<<x.hash_shift^x.window[V+1])&x.hash_mask;x.insert&&(x.ins_h=(x.ins_h<<x.hash_shift^x.window[V+I-1])&x.hash_mask,x.prev[V&x.w_mask]=x.head[x.ins_h],x.head[x.ins_h]=V,V++,x.insert--,!(x.lookahead+x.insert<I)););}while(x.lookahead<z&&x.strm.avail_in!==0)}function At(x,X){for(var Q,k;;){if(x.lookahead<z){if(ft(x),x.lookahead<z&&X===h)return v;if(x.lookahead===0)break}if(Q=0,x.lookahead>=I&&(x.ins_h=(x.ins_h<<x.hash_shift^x.window[x.strstart+I-1])&x.hash_mask,Q=x.prev[x.strstart&x.w_mask]=x.head[x.ins_h],x.head[x.ins_h]=x.strstart),Q!==0&&x.strstart-Q<=x.w_size-z&&(x.match_length=K(x,Q)),x.match_length>=I)if(k=s._tr_tally(x,x.strstart-x.match_start,x.match_length-I),x.lookahead-=x.match_length,x.match_length<=x.max_lazy_match&&x.lookahead>=I){for(x.match_length--;x.strstart++,x.ins_h=(x.ins_h<<x.hash_shift^x.window[x.strstart+I-1])&x.hash_mask,Q=x.prev[x.strstart&x.w_mask]=x.head[x.ins_h],x.head[x.ins_h]=x.strstart,--x.match_length!=0;);x.strstart++}else x.strstart+=x.match_length,x.match_length=0,x.ins_h=x.window[x.strstart],x.ins_h=(x.ins_h<<x.hash_shift^x.window[x.strstart+1])&x.hash_mask;else k=s._tr_tally(x,0,x.window[x.strstart]),x.lookahead--,x.strstart++;if(k&&(R(x,!1),x.strm.avail_out===0))return v}return x.insert=x.strstart<I-1?x.strstart:I-1,X===p?(R(x,!0),x.strm.avail_out===0?B:U):x.last_lit&&(R(x,!1),x.strm.avail_out===0)?v:O}function et(x,X){for(var Q,k,P;;){if(x.lookahead<z){if(ft(x),x.lookahead<z&&X===h)return v;if(x.lookahead===0)break}if(Q=0,x.lookahead>=I&&(x.ins_h=(x.ins_h<<x.hash_shift^x.window[x.strstart+I-1])&x.hash_mask,Q=x.prev[x.strstart&x.w_mask]=x.head[x.ins_h],x.head[x.ins_h]=x.strstart),x.prev_length=x.match_length,x.prev_match=x.match_start,x.match_length=I-1,Q!==0&&x.prev_length<x.max_lazy_match&&x.strstart-Q<=x.w_size-z&&(x.match_length=K(x,Q),x.match_length<=5&&(x.strategy===1||x.match_length===I&&4096<x.strstart-x.match_start)&&(x.match_length=I-1)),x.prev_length>=I&&x.match_length<=x.prev_length){for(P=x.strstart+x.lookahead-I,k=s._tr_tally(x,x.strstart-1-x.prev_match,x.prev_length-I),x.lookahead-=x.prev_length-1,x.prev_length-=2;++x.strstart<=P&&(x.ins_h=(x.ins_h<<x.hash_shift^x.window[x.strstart+I-1])&x.hash_mask,Q=x.prev[x.strstart&x.w_mask]=x.head[x.ins_h],x.head[x.ins_h]=x.strstart),--x.prev_length!=0;);if(x.match_available=0,x.match_length=I-1,x.strstart++,k&&(R(x,!1),x.strm.avail_out===0))return v}else if(x.match_available){if((k=s._tr_tally(x,0,x.window[x.strstart-1]))&&R(x,!1),x.strstart++,x.lookahead--,x.strm.avail_out===0)return v}else x.match_available=1,x.strstart++,x.lookahead--}return x.match_available&&(k=s._tr_tally(x,0,x.window[x.strstart-1]),x.match_available=0),x.insert=x.strstart<I-1?x.strstart:I-1,X===p?(R(x,!0),x.strm.avail_out===0?B:U):x.last_lit&&(R(x,!1),x.strm.avail_out===0)?v:O}function Tt(x,X,Q,k,P){this.good_length=x,this.max_lazy=X,this.nice_length=Q,this.max_chain=k,this.func=P}function Mt(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=d,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new i.Buf16(2*S),this.dyn_dtree=new i.Buf16(2*(2*b+1)),this.bl_tree=new i.Buf16(2*(2*w+1)),J(this.dyn_ltree),J(this.dyn_dtree),J(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new i.Buf16(L+1),this.heap=new i.Buf16(2*y+1),J(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new i.Buf16(2*y+1),J(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function bt(x){var X;return x&&x.state?(x.total_in=x.total_out=0,x.data_type=l,(X=x.state).pending=0,X.pending_out=0,X.wrap<0&&(X.wrap=-X.wrap),X.status=X.wrap?T:N,x.adler=X.wrap===2?0:1,X.last_flush=h,s._tr_init(X),u):nt(x,f)}function xt(x){var X=bt(x);return X===u&&function(Q){Q.window_size=2*Q.w_size,J(Q.head),Q.max_lazy_match=n[Q.level].max_lazy,Q.good_match=n[Q.level].good_length,Q.nice_match=n[Q.level].nice_length,Q.max_chain_length=n[Q.level].max_chain,Q.strstart=0,Q.block_start=0,Q.lookahead=0,Q.insert=0,Q.match_length=Q.prev_length=I-1,Q.match_available=0,Q.ins_h=0}(x.state),X}function Dt(x,X,Q,k,P,V){if(!x)return f;var rt=1;if(X===m&&(X=6),k<0?(rt=0,k=-k):15<k&&(rt=2,k-=16),P<1||_<P||Q!==d||k<8||15<k||X<0||9<X||V<0||g<V)return nt(x,f);k===8&&(k=9);var st=new Mt;return(x.state=st).strm=x,st.wrap=rt,st.gzhead=null,st.w_bits=k,st.w_size=1<<st.w_bits,st.w_mask=st.w_size-1,st.hash_bits=P+7,st.hash_size=1<<st.hash_bits,st.hash_mask=st.hash_size-1,st.hash_shift=~~((st.hash_bits+I-1)/I),st.window=new i.Buf8(2*st.w_size),st.head=new i.Buf16(st.hash_size),st.prev=new i.Buf16(st.w_size),st.lit_bufsize=1<<P+6,st.pending_buf_size=4*st.lit_bufsize,st.pending_buf=new i.Buf8(st.pending_buf_size),st.d_buf=1*st.lit_bufsize,st.l_buf=3*st.lit_bufsize,st.level=X,st.strategy=V,st.method=Q,xt(x)}n=[new Tt(0,0,0,0,function(x,X){var Q=65535;for(Q>x.pending_buf_size-5&&(Q=x.pending_buf_size-5);;){if(x.lookahead<=1){if(ft(x),x.lookahead===0&&X===h)return v;if(x.lookahead===0)break}x.strstart+=x.lookahead,x.lookahead=0;var k=x.block_start+Q;if((x.strstart===0||x.strstart>=k)&&(x.lookahead=x.strstart-k,x.strstart=k,R(x,!1),x.strm.avail_out===0)||x.strstart-x.block_start>=x.w_size-z&&(R(x,!1),x.strm.avail_out===0))return v}return x.insert=0,X===p?(R(x,!0),x.strm.avail_out===0?B:U):(x.strstart>x.block_start&&(R(x,!1),x.strm.avail_out),v)}),new Tt(4,4,8,4,At),new Tt(4,5,16,8,At),new Tt(4,6,32,32,At),new Tt(4,4,16,16,et),new Tt(8,16,32,32,et),new Tt(8,16,128,128,et),new Tt(8,32,128,256,et),new Tt(32,128,258,1024,et),new Tt(32,258,258,4096,et)],e.deflateInit=function(x,X){return Dt(x,X,d,15,8,0)},e.deflateInit2=Dt,e.deflateReset=xt,e.deflateResetKeep=bt,e.deflateSetHeader=function(x,X){return x&&x.state?x.state.wrap!==2?f:(x.state.gzhead=X,u):f},e.deflate=function(x,X){var Q,k,P,V;if(!x||!x.state||5<X||X<0)return x?nt(x,f):f;if(k=x.state,!x.output||!x.input&&x.avail_in!==0||k.status===666&&X!==p)return nt(x,x.avail_out===0?-5:f);if(k.strm=x,Q=k.last_flush,k.last_flush=X,k.status===T)if(k.wrap===2)x.adler=0,it(k,31),it(k,139),it(k,8),k.gzhead?(it(k,(k.gzhead.text?1:0)+(k.gzhead.hcrc?2:0)+(k.gzhead.extra?4:0)+(k.gzhead.name?8:0)+(k.gzhead.comment?16:0)),it(k,255&k.gzhead.time),it(k,k.gzhead.time>>8&255),it(k,k.gzhead.time>>16&255),it(k,k.gzhead.time>>24&255),it(k,k.level===9?2:2<=k.strategy||k.level<2?4:0),it(k,255&k.gzhead.os),k.gzhead.extra&&k.gzhead.extra.length&&(it(k,255&k.gzhead.extra.length),it(k,k.gzhead.extra.length>>8&255)),k.gzhead.hcrc&&(x.adler=r(x.adler,k.pending_buf,k.pending,0)),k.gzindex=0,k.status=69):(it(k,0),it(k,0),it(k,0),it(k,0),it(k,0),it(k,k.level===9?2:2<=k.strategy||k.level<2?4:0),it(k,3),k.status=N);else{var rt=d+(k.w_bits-8<<4)<<8;rt|=(2<=k.strategy||k.level<2?0:k.level<6?1:k.level===6?2:3)<<6,k.strstart!==0&&(rt|=32),rt+=31-rt%31,k.status=N,Z(k,rt),k.strstart!==0&&(Z(k,x.adler>>>16),Z(k,65535&x.adler)),x.adler=1}if(k.status===69)if(k.gzhead.extra){for(P=k.pending;k.gzindex<(65535&k.gzhead.extra.length)&&(k.pending!==k.pending_buf_size||(k.gzhead.hcrc&&k.pending>P&&(x.adler=r(x.adler,k.pending_buf,k.pending-P,P)),C(x),P=k.pending,k.pending!==k.pending_buf_size));)it(k,255&k.gzhead.extra[k.gzindex]),k.gzindex++;k.gzhead.hcrc&&k.pending>P&&(x.adler=r(x.adler,k.pending_buf,k.pending-P,P)),k.gzindex===k.gzhead.extra.length&&(k.gzindex=0,k.status=73)}else k.status=73;if(k.status===73)if(k.gzhead.name){P=k.pending;do{if(k.pending===k.pending_buf_size&&(k.gzhead.hcrc&&k.pending>P&&(x.adler=r(x.adler,k.pending_buf,k.pending-P,P)),C(x),P=k.pending,k.pending===k.pending_buf_size)){V=1;break}V=k.gzindex<k.gzhead.name.length?255&k.gzhead.name.charCodeAt(k.gzindex++):0,it(k,V)}while(V!==0);k.gzhead.hcrc&&k.pending>P&&(x.adler=r(x.adler,k.pending_buf,k.pending-P,P)),V===0&&(k.gzindex=0,k.status=91)}else k.status=91;if(k.status===91)if(k.gzhead.comment){P=k.pending;do{if(k.pending===k.pending_buf_size&&(k.gzhead.hcrc&&k.pending>P&&(x.adler=r(x.adler,k.pending_buf,k.pending-P,P)),C(x),P=k.pending,k.pending===k.pending_buf_size)){V=1;break}V=k.gzindex<k.gzhead.comment.length?255&k.gzhead.comment.charCodeAt(k.gzindex++):0,it(k,V)}while(V!==0);k.gzhead.hcrc&&k.pending>P&&(x.adler=r(x.adler,k.pending_buf,k.pending-P,P)),V===0&&(k.status=103)}else k.status=103;if(k.status===103&&(k.gzhead.hcrc?(k.pending+2>k.pending_buf_size&&C(x),k.pending+2<=k.pending_buf_size&&(it(k,255&x.adler),it(k,x.adler>>8&255),x.adler=0,k.status=N)):k.status=N),k.pending!==0){if(C(x),x.avail_out===0)return k.last_flush=-1,u}else if(x.avail_in===0&&G(X)<=G(Q)&&X!==p)return nt(x,-5);if(k.status===666&&x.avail_in!==0)return nt(x,-5);if(x.avail_in!==0||k.lookahead!==0||X!==h&&k.status!==666){var st=k.strategy===2?function(q,ut){for(var E;;){if(q.lookahead===0&&(ft(q),q.lookahead===0)){if(ut===h)return v;break}if(q.match_length=0,E=s._tr_tally(q,0,q.window[q.strstart]),q.lookahead--,q.strstart++,E&&(R(q,!1),q.strm.avail_out===0))return v}return q.insert=0,ut===p?(R(q,!0),q.strm.avail_out===0?B:U):q.last_lit&&(R(q,!1),q.strm.avail_out===0)?v:O}(k,X):k.strategy===3?function(q,ut){for(var E,M,H,ot,ht=q.window;;){if(q.lookahead<=A){if(ft(q),q.lookahead<=A&&ut===h)return v;if(q.lookahead===0)break}if(q.match_length=0,q.lookahead>=I&&0<q.strstart&&(M=ht[H=q.strstart-1])===ht[++H]&&M===ht[++H]&&M===ht[++H]){ot=q.strstart+A;do;while(M===ht[++H]&&M===ht[++H]&&M===ht[++H]&&M===ht[++H]&&M===ht[++H]&&M===ht[++H]&&M===ht[++H]&&M===ht[++H]&&H<ot);q.match_length=A-(ot-H),q.match_length>q.lookahead&&(q.match_length=q.lookahead)}if(q.match_length>=I?(E=s._tr_tally(q,1,q.match_length-I),q.lookahead-=q.match_length,q.strstart+=q.match_length,q.match_length=0):(E=s._tr_tally(q,0,q.window[q.strstart]),q.lookahead--,q.strstart++),E&&(R(q,!1),q.strm.avail_out===0))return v}return q.insert=0,ut===p?(R(q,!0),q.strm.avail_out===0?B:U):q.last_lit&&(R(q,!1),q.strm.avail_out===0)?v:O}(k,X):n[k.level].func(k,X);if(st!==B&&st!==U||(k.status=666),st===v||st===B)return x.avail_out===0&&(k.last_flush=-1),u;if(st===O&&(X===1?s._tr_align(k):X!==5&&(s._tr_stored_block(k,0,0,!1),X===3&&(J(k.head),k.lookahead===0&&(k.strstart=0,k.block_start=0,k.insert=0))),C(x),x.avail_out===0))return k.last_flush=-1,u}return X!==p?u:k.wrap<=0?1:(k.wrap===2?(it(k,255&x.adler),it(k,x.adler>>8&255),it(k,x.adler>>16&255),it(k,x.adler>>24&255),it(k,255&x.total_in),it(k,x.total_in>>8&255),it(k,x.total_in>>16&255),it(k,x.total_in>>24&255)):(Z(k,x.adler>>>16),Z(k,65535&x.adler)),C(x),0<k.wrap&&(k.wrap=-k.wrap),k.pending!==0?u:1)},e.deflateEnd=function(x){var X;return x&&x.state?(X=x.state.status)!==T&&X!==69&&X!==73&&X!==91&&X!==103&&X!==N&&X!==666?nt(x,f):(x.state=null,X===N?nt(x,-3):u):f},e.deflateSetDictionary=function(x,X){var Q,k,P,V,rt,st,q,ut,E=X.length;if(!x||!x.state||(V=(Q=x.state).wrap)===2||V===1&&Q.status!==T||Q.lookahead)return f;for(V===1&&(x.adler=o(x.adler,X,E,0)),Q.wrap=0,E>=Q.w_size&&(V===0&&(J(Q.head),Q.strstart=0,Q.block_start=0,Q.insert=0),ut=new i.Buf8(Q.w_size),i.arraySet(ut,X,E-Q.w_size,Q.w_size,0),X=ut,E=Q.w_size),rt=x.avail_in,st=x.next_in,q=x.input,x.avail_in=E,x.next_in=0,x.input=X,ft(Q);Q.lookahead>=I;){for(k=Q.strstart,P=Q.lookahead-(I-1);Q.ins_h=(Q.ins_h<<Q.hash_shift^Q.window[k+I-1])&Q.hash_mask,Q.prev[k&Q.w_mask]=Q.head[Q.ins_h],Q.head[Q.ins_h]=k,k++,--P;);Q.strstart=k,Q.lookahead=I-1,ft(Q)}return Q.strstart+=Q.lookahead,Q.block_start=Q.strstart,Q.insert=Q.lookahead,Q.lookahead=0,Q.match_length=Q.prev_length=I-1,Q.match_available=0,x.next_in=st,x.input=q,x.avail_in=rt,Q.wrap=V,u},e.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./messages":51,"./trees":52}],47:[function(a,t,e){"use strict";t.exports=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}},{}],48:[function(a,t,e){"use strict";t.exports=function(n,i){var s,o,r,c,h,p,u,f,m,g,l,d,_,y,b,w,S,L,I,A,z,T,N,v,O;s=n.state,o=n.next_in,v=n.input,r=o+(n.avail_in-5),c=n.next_out,O=n.output,h=c-(i-n.avail_out),p=c+(n.avail_out-257),u=s.dmax,f=s.wsize,m=s.whave,g=s.wnext,l=s.window,d=s.hold,_=s.bits,y=s.lencode,b=s.distcode,w=(1<<s.lenbits)-1,S=(1<<s.distbits)-1;t:do{_<15&&(d+=v[o++]<<_,_+=8,d+=v[o++]<<_,_+=8),L=y[d&w];e:for(;;){if(d>>>=I=L>>>24,_-=I,(I=L>>>16&255)===0)O[c++]=65535&L;else{if(!(16&I)){if((64&I)==0){L=y[(65535&L)+(d&(1<<I)-1)];continue e}if(32&I){s.mode=12;break t}n.msg="invalid literal/length code",s.mode=30;break t}A=65535&L,(I&=15)&&(_<I&&(d+=v[o++]<<_,_+=8),A+=d&(1<<I)-1,d>>>=I,_-=I),_<15&&(d+=v[o++]<<_,_+=8,d+=v[o++]<<_,_+=8),L=b[d&S];n:for(;;){if(d>>>=I=L>>>24,_-=I,!(16&(I=L>>>16&255))){if((64&I)==0){L=b[(65535&L)+(d&(1<<I)-1)];continue n}n.msg="invalid distance code",s.mode=30;break t}if(z=65535&L,_<(I&=15)&&(d+=v[o++]<<_,(_+=8)<I&&(d+=v[o++]<<_,_+=8)),u<(z+=d&(1<<I)-1)){n.msg="invalid distance too far back",s.mode=30;break t}if(d>>>=I,_-=I,(I=c-h)<z){if(m<(I=z-I)&&s.sane){n.msg="invalid distance too far back",s.mode=30;break t}if(N=l,(T=0)===g){if(T+=f-I,I<A){for(A-=I;O[c++]=l[T++],--I;);T=c-z,N=O}}else if(g<I){if(T+=f+g-I,(I-=g)<A){for(A-=I;O[c++]=l[T++],--I;);if(T=0,g<A){for(A-=I=g;O[c++]=l[T++],--I;);T=c-z,N=O}}}else if(T+=g-I,I<A){for(A-=I;O[c++]=l[T++],--I;);T=c-z,N=O}for(;2<A;)O[c++]=N[T++],O[c++]=N[T++],O[c++]=N[T++],A-=3;A&&(O[c++]=N[T++],1<A&&(O[c++]=N[T++]))}else{for(T=c-z;O[c++]=O[T++],O[c++]=O[T++],O[c++]=O[T++],2<(A-=3););A&&(O[c++]=O[T++],1<A&&(O[c++]=O[T++]))}break}}break}}while(o<r&&c<p);o-=A=_>>3,d&=(1<<(_-=A<<3))-1,n.next_in=o,n.next_out=c,n.avail_in=o<r?r-o+5:5-(o-r),n.avail_out=c<p?p-c+257:257-(c-p),s.hold=d,s.bits=_}},{}],49:[function(a,t,e){"use strict";var n=a("../utils/common"),i=a("./adler32"),s=a("./crc32"),o=a("./inffast"),r=a("./inftrees"),c=1,h=2,p=0,u=-2,f=1,m=852,g=592;function l(T){return(T>>>24&255)+(T>>>8&65280)+((65280&T)<<8)+((255&T)<<24)}function d(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new n.Buf16(320),this.work=new n.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function _(T){var N;return T&&T.state?(N=T.state,T.total_in=T.total_out=N.total=0,T.msg="",N.wrap&&(T.adler=1&N.wrap),N.mode=f,N.last=0,N.havedict=0,N.dmax=32768,N.head=null,N.hold=0,N.bits=0,N.lencode=N.lendyn=new n.Buf32(m),N.distcode=N.distdyn=new n.Buf32(g),N.sane=1,N.back=-1,p):u}function y(T){var N;return T&&T.state?((N=T.state).wsize=0,N.whave=0,N.wnext=0,_(T)):u}function b(T,N){var v,O;return T&&T.state?(O=T.state,N<0?(v=0,N=-N):(v=1+(N>>4),N<48&&(N&=15)),N&&(N<8||15<N)?u:(O.window!==null&&O.wbits!==N&&(O.window=null),O.wrap=v,O.wbits=N,y(T))):u}function w(T,N){var v,O;return T?(O=new d,(T.state=O).window=null,(v=b(T,N))!==p&&(T.state=null),v):u}var S,L,I=!0;function A(T){if(I){var N;for(S=new n.Buf32(512),L=new n.Buf32(32),N=0;N<144;)T.lens[N++]=8;for(;N<256;)T.lens[N++]=9;for(;N<280;)T.lens[N++]=7;for(;N<288;)T.lens[N++]=8;for(r(c,T.lens,0,288,S,0,T.work,{bits:9}),N=0;N<32;)T.lens[N++]=5;r(h,T.lens,0,32,L,0,T.work,{bits:5}),I=!1}T.lencode=S,T.lenbits=9,T.distcode=L,T.distbits=5}function z(T,N,v,O){var B,U=T.state;return U.window===null&&(U.wsize=1<<U.wbits,U.wnext=0,U.whave=0,U.window=new n.Buf8(U.wsize)),O>=U.wsize?(n.arraySet(U.window,N,v-U.wsize,U.wsize,0),U.wnext=0,U.whave=U.wsize):(O<(B=U.wsize-U.wnext)&&(B=O),n.arraySet(U.window,N,v-O,B,U.wnext),(O-=B)?(n.arraySet(U.window,N,v-O,O,0),U.wnext=O,U.whave=U.wsize):(U.wnext+=B,U.wnext===U.wsize&&(U.wnext=0),U.whave<U.wsize&&(U.whave+=B))),0}e.inflateReset=y,e.inflateReset2=b,e.inflateResetKeep=_,e.inflateInit=function(T){return w(T,15)},e.inflateInit2=w,e.inflate=function(T,N){var v,O,B,U,nt,G,J,C,R,it,Z,K,ft,At,et,Tt,Mt,bt,xt,Dt,x,X,Q,k,P=0,V=new n.Buf8(4),rt=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!T||!T.state||!T.output||!T.input&&T.avail_in!==0)return u;(v=T.state).mode===12&&(v.mode=13),nt=T.next_out,B=T.output,J=T.avail_out,U=T.next_in,O=T.input,G=T.avail_in,C=v.hold,R=v.bits,it=G,Z=J,X=p;t:for(;;)switch(v.mode){case f:if(v.wrap===0){v.mode=13;break}for(;R<16;){if(G===0)break t;G--,C+=O[U++]<<R,R+=8}if(2&v.wrap&&C===35615){V[v.check=0]=255&C,V[1]=C>>>8&255,v.check=s(v.check,V,2,0),R=C=0,v.mode=2;break}if(v.flags=0,v.head&&(v.head.done=!1),!(1&v.wrap)||(((255&C)<<8)+(C>>8))%31){T.msg="incorrect header check",v.mode=30;break}if((15&C)!=8){T.msg="unknown compression method",v.mode=30;break}if(R-=4,x=8+(15&(C>>>=4)),v.wbits===0)v.wbits=x;else if(x>v.wbits){T.msg="invalid window size",v.mode=30;break}v.dmax=1<<x,T.adler=v.check=1,v.mode=512&C?10:12,R=C=0;break;case 2:for(;R<16;){if(G===0)break t;G--,C+=O[U++]<<R,R+=8}if(v.flags=C,(255&v.flags)!=8){T.msg="unknown compression method",v.mode=30;break}if(57344&v.flags){T.msg="unknown header flags set",v.mode=30;break}v.head&&(v.head.text=C>>8&1),512&v.flags&&(V[0]=255&C,V[1]=C>>>8&255,v.check=s(v.check,V,2,0)),R=C=0,v.mode=3;case 3:for(;R<32;){if(G===0)break t;G--,C+=O[U++]<<R,R+=8}v.head&&(v.head.time=C),512&v.flags&&(V[0]=255&C,V[1]=C>>>8&255,V[2]=C>>>16&255,V[3]=C>>>24&255,v.check=s(v.check,V,4,0)),R=C=0,v.mode=4;case 4:for(;R<16;){if(G===0)break t;G--,C+=O[U++]<<R,R+=8}v.head&&(v.head.xflags=255&C,v.head.os=C>>8),512&v.flags&&(V[0]=255&C,V[1]=C>>>8&255,v.check=s(v.check,V,2,0)),R=C=0,v.mode=5;case 5:if(1024&v.flags){for(;R<16;){if(G===0)break t;G--,C+=O[U++]<<R,R+=8}v.length=C,v.head&&(v.head.extra_len=C),512&v.flags&&(V[0]=255&C,V[1]=C>>>8&255,v.check=s(v.check,V,2,0)),R=C=0}else v.head&&(v.head.extra=null);v.mode=6;case 6:if(1024&v.flags&&(G<(K=v.length)&&(K=G),K&&(v.head&&(x=v.head.extra_len-v.length,v.head.extra||(v.head.extra=new Array(v.head.extra_len)),n.arraySet(v.head.extra,O,U,K,x)),512&v.flags&&(v.check=s(v.check,O,K,U)),G-=K,U+=K,v.length-=K),v.length))break t;v.length=0,v.mode=7;case 7:if(2048&v.flags){if(G===0)break t;for(K=0;x=O[U+K++],v.head&&x&&v.length<65536&&(v.head.name+=String.fromCharCode(x)),x&&K<G;);if(512&v.flags&&(v.check=s(v.check,O,K,U)),G-=K,U+=K,x)break t}else v.head&&(v.head.name=null);v.length=0,v.mode=8;case 8:if(4096&v.flags){if(G===0)break t;for(K=0;x=O[U+K++],v.head&&x&&v.length<65536&&(v.head.comment+=String.fromCharCode(x)),x&&K<G;);if(512&v.flags&&(v.check=s(v.check,O,K,U)),G-=K,U+=K,x)break t}else v.head&&(v.head.comment=null);v.mode=9;case 9:if(512&v.flags){for(;R<16;){if(G===0)break t;G--,C+=O[U++]<<R,R+=8}if(C!==(65535&v.check)){T.msg="header crc mismatch",v.mode=30;break}R=C=0}v.head&&(v.head.hcrc=v.flags>>9&1,v.head.done=!0),T.adler=v.check=0,v.mode=12;break;case 10:for(;R<32;){if(G===0)break t;G--,C+=O[U++]<<R,R+=8}T.adler=v.check=l(C),R=C=0,v.mode=11;case 11:if(v.havedict===0)return T.next_out=nt,T.avail_out=J,T.next_in=U,T.avail_in=G,v.hold=C,v.bits=R,2;T.adler=v.check=1,v.mode=12;case 12:if(N===5||N===6)break t;case 13:if(v.last){C>>>=7&R,R-=7&R,v.mode=27;break}for(;R<3;){if(G===0)break t;G--,C+=O[U++]<<R,R+=8}switch(v.last=1&C,R-=1,3&(C>>>=1)){case 0:v.mode=14;break;case 1:if(A(v),v.mode=20,N!==6)break;C>>>=2,R-=2;break t;case 2:v.mode=17;break;case 3:T.msg="invalid block type",v.mode=30}C>>>=2,R-=2;break;case 14:for(C>>>=7&R,R-=7&R;R<32;){if(G===0)break t;G--,C+=O[U++]<<R,R+=8}if((65535&C)!=(C>>>16^65535)){T.msg="invalid stored block lengths",v.mode=30;break}if(v.length=65535&C,R=C=0,v.mode=15,N===6)break t;case 15:v.mode=16;case 16:if(K=v.length){if(G<K&&(K=G),J<K&&(K=J),K===0)break t;n.arraySet(B,O,U,K,nt),G-=K,U+=K,J-=K,nt+=K,v.length-=K;break}v.mode=12;break;case 17:for(;R<14;){if(G===0)break t;G--,C+=O[U++]<<R,R+=8}if(v.nlen=257+(31&C),C>>>=5,R-=5,v.ndist=1+(31&C),C>>>=5,R-=5,v.ncode=4+(15&C),C>>>=4,R-=4,286<v.nlen||30<v.ndist){T.msg="too many length or distance symbols",v.mode=30;break}v.have=0,v.mode=18;case 18:for(;v.have<v.ncode;){for(;R<3;){if(G===0)break t;G--,C+=O[U++]<<R,R+=8}v.lens[rt[v.have++]]=7&C,C>>>=3,R-=3}for(;v.have<19;)v.lens[rt[v.have++]]=0;if(v.lencode=v.lendyn,v.lenbits=7,Q={bits:v.lenbits},X=r(0,v.lens,0,19,v.lencode,0,v.work,Q),v.lenbits=Q.bits,X){T.msg="invalid code lengths set",v.mode=30;break}v.have=0,v.mode=19;case 19:for(;v.have<v.nlen+v.ndist;){for(;Tt=(P=v.lencode[C&(1<<v.lenbits)-1])>>>16&255,Mt=65535&P,!((et=P>>>24)<=R);){if(G===0)break t;G--,C+=O[U++]<<R,R+=8}if(Mt<16)C>>>=et,R-=et,v.lens[v.have++]=Mt;else{if(Mt===16){for(k=et+2;R<k;){if(G===0)break t;G--,C+=O[U++]<<R,R+=8}if(C>>>=et,R-=et,v.have===0){T.msg="invalid bit length repeat",v.mode=30;break}x=v.lens[v.have-1],K=3+(3&C),C>>>=2,R-=2}else if(Mt===17){for(k=et+3;R<k;){if(G===0)break t;G--,C+=O[U++]<<R,R+=8}R-=et,x=0,K=3+(7&(C>>>=et)),C>>>=3,R-=3}else{for(k=et+7;R<k;){if(G===0)break t;G--,C+=O[U++]<<R,R+=8}R-=et,x=0,K=11+(127&(C>>>=et)),C>>>=7,R-=7}if(v.have+K>v.nlen+v.ndist){T.msg="invalid bit length repeat",v.mode=30;break}for(;K--;)v.lens[v.have++]=x}}if(v.mode===30)break;if(v.lens[256]===0){T.msg="invalid code -- missing end-of-block",v.mode=30;break}if(v.lenbits=9,Q={bits:v.lenbits},X=r(c,v.lens,0,v.nlen,v.lencode,0,v.work,Q),v.lenbits=Q.bits,X){T.msg="invalid literal/lengths set",v.mode=30;break}if(v.distbits=6,v.distcode=v.distdyn,Q={bits:v.distbits},X=r(h,v.lens,v.nlen,v.ndist,v.distcode,0,v.work,Q),v.distbits=Q.bits,X){T.msg="invalid distances set",v.mode=30;break}if(v.mode=20,N===6)break t;case 20:v.mode=21;case 21:if(6<=G&&258<=J){T.next_out=nt,T.avail_out=J,T.next_in=U,T.avail_in=G,v.hold=C,v.bits=R,o(T,Z),nt=T.next_out,B=T.output,J=T.avail_out,U=T.next_in,O=T.input,G=T.avail_in,C=v.hold,R=v.bits,v.mode===12&&(v.back=-1);break}for(v.back=0;Tt=(P=v.lencode[C&(1<<v.lenbits)-1])>>>16&255,Mt=65535&P,!((et=P>>>24)<=R);){if(G===0)break t;G--,C+=O[U++]<<R,R+=8}if(Tt&&(240&Tt)==0){for(bt=et,xt=Tt,Dt=Mt;Tt=(P=v.lencode[Dt+((C&(1<<bt+xt)-1)>>bt)])>>>16&255,Mt=65535&P,!(bt+(et=P>>>24)<=R);){if(G===0)break t;G--,C+=O[U++]<<R,R+=8}C>>>=bt,R-=bt,v.back+=bt}if(C>>>=et,R-=et,v.back+=et,v.length=Mt,Tt===0){v.mode=26;break}if(32&Tt){v.back=-1,v.mode=12;break}if(64&Tt){T.msg="invalid literal/length code",v.mode=30;break}v.extra=15&Tt,v.mode=22;case 22:if(v.extra){for(k=v.extra;R<k;){if(G===0)break t;G--,C+=O[U++]<<R,R+=8}v.length+=C&(1<<v.extra)-1,C>>>=v.extra,R-=v.extra,v.back+=v.extra}v.was=v.length,v.mode=23;case 23:for(;Tt=(P=v.distcode[C&(1<<v.distbits)-1])>>>16&255,Mt=65535&P,!((et=P>>>24)<=R);){if(G===0)break t;G--,C+=O[U++]<<R,R+=8}if((240&Tt)==0){for(bt=et,xt=Tt,Dt=Mt;Tt=(P=v.distcode[Dt+((C&(1<<bt+xt)-1)>>bt)])>>>16&255,Mt=65535&P,!(bt+(et=P>>>24)<=R);){if(G===0)break t;G--,C+=O[U++]<<R,R+=8}C>>>=bt,R-=bt,v.back+=bt}if(C>>>=et,R-=et,v.back+=et,64&Tt){T.msg="invalid distance code",v.mode=30;break}v.offset=Mt,v.extra=15&Tt,v.mode=24;case 24:if(v.extra){for(k=v.extra;R<k;){if(G===0)break t;G--,C+=O[U++]<<R,R+=8}v.offset+=C&(1<<v.extra)-1,C>>>=v.extra,R-=v.extra,v.back+=v.extra}if(v.offset>v.dmax){T.msg="invalid distance too far back",v.mode=30;break}v.mode=25;case 25:if(J===0)break t;if(K=Z-J,v.offset>K){if((K=v.offset-K)>v.whave&&v.sane){T.msg="invalid distance too far back",v.mode=30;break}ft=K>v.wnext?(K-=v.wnext,v.wsize-K):v.wnext-K,K>v.length&&(K=v.length),At=v.window}else At=B,ft=nt-v.offset,K=v.length;for(J<K&&(K=J),J-=K,v.length-=K;B[nt++]=At[ft++],--K;);v.length===0&&(v.mode=21);break;case 26:if(J===0)break t;B[nt++]=v.length,J--,v.mode=21;break;case 27:if(v.wrap){for(;R<32;){if(G===0)break t;G--,C|=O[U++]<<R,R+=8}if(Z-=J,T.total_out+=Z,v.total+=Z,Z&&(T.adler=v.check=v.flags?s(v.check,B,Z,nt-Z):i(v.check,B,Z,nt-Z)),Z=J,(v.flags?C:l(C))!==v.check){T.msg="incorrect data check",v.mode=30;break}R=C=0}v.mode=28;case 28:if(v.wrap&&v.flags){for(;R<32;){if(G===0)break t;G--,C+=O[U++]<<R,R+=8}if(C!==(4294967295&v.total)){T.msg="incorrect length check",v.mode=30;break}R=C=0}v.mode=29;case 29:X=1;break t;case 30:X=-3;break t;case 31:return-4;case 32:default:return u}return T.next_out=nt,T.avail_out=J,T.next_in=U,T.avail_in=G,v.hold=C,v.bits=R,(v.wsize||Z!==T.avail_out&&v.mode<30&&(v.mode<27||N!==4))&&z(T,T.output,T.next_out,Z-T.avail_out)?(v.mode=31,-4):(it-=T.avail_in,Z-=T.avail_out,T.total_in+=it,T.total_out+=Z,v.total+=Z,v.wrap&&Z&&(T.adler=v.check=v.flags?s(v.check,B,Z,T.next_out-Z):i(v.check,B,Z,T.next_out-Z)),T.data_type=v.bits+(v.last?64:0)+(v.mode===12?128:0)+(v.mode===20||v.mode===15?256:0),(it==0&&Z===0||N===4)&&X===p&&(X=-5),X)},e.inflateEnd=function(T){if(!T||!T.state)return u;var N=T.state;return N.window&&(N.window=null),T.state=null,p},e.inflateGetHeader=function(T,N){var v;return T&&T.state?(2&(v=T.state).wrap)==0?u:((v.head=N).done=!1,p):u},e.inflateSetDictionary=function(T,N){var v,O=N.length;return T&&T.state?(v=T.state).wrap!==0&&v.mode!==11?u:v.mode===11&&i(1,N,O,0)!==v.check?-3:z(T,N,O,O)?(v.mode=31,-4):(v.havedict=1,p):u},e.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./inffast":48,"./inftrees":50}],50:[function(a,t,e){"use strict";var n=a("../utils/common"),i=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],s=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],o=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],r=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];t.exports=function(c,h,p,u,f,m,g,l){var d,_,y,b,w,S,L,I,A,z=l.bits,T=0,N=0,v=0,O=0,B=0,U=0,nt=0,G=0,J=0,C=0,R=null,it=0,Z=new n.Buf16(16),K=new n.Buf16(16),ft=null,At=0;for(T=0;T<=15;T++)Z[T]=0;for(N=0;N<u;N++)Z[h[p+N]]++;for(B=z,O=15;1<=O&&Z[O]===0;O--);if(O<B&&(B=O),O===0)return f[m++]=20971520,f[m++]=20971520,l.bits=1,0;for(v=1;v<O&&Z[v]===0;v++);for(B<v&&(B=v),T=G=1;T<=15;T++)if(G<<=1,(G-=Z[T])<0)return-1;if(0<G&&(c===0||O!==1))return-1;for(K[1]=0,T=1;T<15;T++)K[T+1]=K[T]+Z[T];for(N=0;N<u;N++)h[p+N]!==0&&(g[K[h[p+N]]++]=N);if(S=c===0?(R=ft=g,19):c===1?(R=i,it-=257,ft=s,At-=257,256):(R=o,ft=r,-1),T=v,w=m,nt=N=C=0,y=-1,b=(J=1<<(U=B))-1,c===1&&852<J||c===2&&592<J)return 1;for(;;){for(L=T-nt,A=g[N]<S?(I=0,g[N]):g[N]>S?(I=ft[At+g[N]],R[it+g[N]]):(I=96,0),d=1<<T-nt,v=_=1<<U;f[w+(C>>nt)+(_-=d)]=L<<24|I<<16|A|0,_!==0;);for(d=1<<T-1;C&d;)d>>=1;if(d!==0?(C&=d-1,C+=d):C=0,N++,--Z[T]==0){if(T===O)break;T=h[p+g[N]]}if(B<T&&(C&b)!==y){for(nt===0&&(nt=B),w+=v,G=1<<(U=T-nt);U+nt<O&&!((G-=Z[U+nt])<=0);)U++,G<<=1;if(J+=1<<U,c===1&&852<J||c===2&&592<J)return 1;f[y=C&b]=B<<24|U<<16|w-m|0}}return C!==0&&(f[w+C]=T-nt<<24|64<<16|0),l.bits=B,0}},{"../utils/common":41}],51:[function(a,t,e){"use strict";t.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],52:[function(a,t,e){"use strict";var n=a("../utils/common"),i=0,s=1;function o(P){for(var V=P.length;0<=--V;)P[V]=0}var r=0,c=29,h=256,p=h+1+c,u=30,f=19,m=2*p+1,g=15,l=16,d=7,_=256,y=16,b=17,w=18,S=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],L=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],I=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],A=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],z=new Array(2*(p+2));o(z);var T=new Array(2*u);o(T);var N=new Array(512);o(N);var v=new Array(256);o(v);var O=new Array(c);o(O);var B,U,nt,G=new Array(u);function J(P,V,rt,st,q){this.static_tree=P,this.extra_bits=V,this.extra_base=rt,this.elems=st,this.max_length=q,this.has_stree=P&&P.length}function C(P,V){this.dyn_tree=P,this.max_code=0,this.stat_desc=V}function R(P){return P<256?N[P]:N[256+(P>>>7)]}function it(P,V){P.pending_buf[P.pending++]=255&V,P.pending_buf[P.pending++]=V>>>8&255}function Z(P,V,rt){P.bi_valid>l-rt?(P.bi_buf|=V<<P.bi_valid&65535,it(P,P.bi_buf),P.bi_buf=V>>l-P.bi_valid,P.bi_valid+=rt-l):(P.bi_buf|=V<<P.bi_valid&65535,P.bi_valid+=rt)}function K(P,V,rt){Z(P,rt[2*V],rt[2*V+1])}function ft(P,V){for(var rt=0;rt|=1&P,P>>>=1,rt<<=1,0<--V;);return rt>>>1}function At(P,V,rt){var st,q,ut=new Array(g+1),E=0;for(st=1;st<=g;st++)ut[st]=E=E+rt[st-1]<<1;for(q=0;q<=V;q++){var M=P[2*q+1];M!==0&&(P[2*q]=ft(ut[M]++,M))}}function et(P){var V;for(V=0;V<p;V++)P.dyn_ltree[2*V]=0;for(V=0;V<u;V++)P.dyn_dtree[2*V]=0;for(V=0;V<f;V++)P.bl_tree[2*V]=0;P.dyn_ltree[2*_]=1,P.opt_len=P.static_len=0,P.last_lit=P.matches=0}function Tt(P){8<P.bi_valid?it(P,P.bi_buf):0<P.bi_valid&&(P.pending_buf[P.pending++]=P.bi_buf),P.bi_buf=0,P.bi_valid=0}function Mt(P,V,rt,st){var q=2*V,ut=2*rt;return P[q]<P[ut]||P[q]===P[ut]&&st[V]<=st[rt]}function bt(P,V,rt){for(var st=P.heap[rt],q=rt<<1;q<=P.heap_len&&(q<P.heap_len&&Mt(V,P.heap[q+1],P.heap[q],P.depth)&&q++,!Mt(V,st,P.heap[q],P.depth));)P.heap[rt]=P.heap[q],rt=q,q<<=1;P.heap[rt]=st}function xt(P,V,rt){var st,q,ut,E,M=0;if(P.last_lit!==0)for(;st=P.pending_buf[P.d_buf+2*M]<<8|P.pending_buf[P.d_buf+2*M+1],q=P.pending_buf[P.l_buf+M],M++,st===0?K(P,q,V):(K(P,(ut=v[q])+h+1,V),(E=S[ut])!==0&&Z(P,q-=O[ut],E),K(P,ut=R(--st),rt),(E=L[ut])!==0&&Z(P,st-=G[ut],E)),M<P.last_lit;);K(P,_,V)}function Dt(P,V){var rt,st,q,ut=V.dyn_tree,E=V.stat_desc.static_tree,M=V.stat_desc.has_stree,H=V.stat_desc.elems,ot=-1;for(P.heap_len=0,P.heap_max=m,rt=0;rt<H;rt++)ut[2*rt]!==0?(P.heap[++P.heap_len]=ot=rt,P.depth[rt]=0):ut[2*rt+1]=0;for(;P.heap_len<2;)ut[2*(q=P.heap[++P.heap_len]=ot<2?++ot:0)]=1,P.depth[q]=0,P.opt_len--,M&&(P.static_len-=E[2*q+1]);for(V.max_code=ot,rt=P.heap_len>>1;1<=rt;rt--)bt(P,ut,rt);for(q=H;rt=P.heap[1],P.heap[1]=P.heap[P.heap_len--],bt(P,ut,1),st=P.heap[1],P.heap[--P.heap_max]=rt,P.heap[--P.heap_max]=st,ut[2*q]=ut[2*rt]+ut[2*st],P.depth[q]=(P.depth[rt]>=P.depth[st]?P.depth[rt]:P.depth[st])+1,ut[2*rt+1]=ut[2*st+1]=q,P.heap[1]=q++,bt(P,ut,1),2<=P.heap_len;);P.heap[--P.heap_max]=P.heap[1],function(ht,pt){var Et,F,Y,dt,wt,yt,St=pt.dyn_tree,Rt=pt.max_code,Nt=pt.stat_desc.static_tree,W=pt.stat_desc.has_stree,vt=pt.stat_desc.extra_bits,mt=pt.stat_desc.extra_base,lt=pt.stat_desc.max_length,gt=0;for(dt=0;dt<=g;dt++)ht.bl_count[dt]=0;for(St[2*ht.heap[ht.heap_max]+1]=0,Et=ht.heap_max+1;Et<m;Et++)lt<(dt=St[2*St[2*(F=ht.heap[Et])+1]+1]+1)&&(dt=lt,gt++),St[2*F+1]=dt,Rt<F||(ht.bl_count[dt]++,wt=0,mt<=F&&(wt=vt[F-mt]),yt=St[2*F],ht.opt_len+=yt*(dt+wt),W&&(ht.static_len+=yt*(Nt[2*F+1]+wt)));if(gt!==0){do{for(dt=lt-1;ht.bl_count[dt]===0;)dt--;ht.bl_count[dt]--,ht.bl_count[dt+1]+=2,ht.bl_count[lt]--,gt-=2}while(0<gt);for(dt=lt;dt!==0;dt--)for(F=ht.bl_count[dt];F!==0;)Rt<(Y=ht.heap[--Et])||(St[2*Y+1]!==dt&&(ht.opt_len+=(dt-St[2*Y+1])*St[2*Y],St[2*Y+1]=dt),F--)}}(P,V),At(ut,ot,P.bl_count)}function x(P,V,rt){var st,q,ut=-1,E=V[1],M=0,H=7,ot=4;for(E===0&&(H=138,ot=3),V[2*(rt+1)+1]=65535,st=0;st<=rt;st++)q=E,E=V[2*(st+1)+1],++M<H&&q===E||(M<ot?P.bl_tree[2*q]+=M:q!==0?(q!==ut&&P.bl_tree[2*q]++,P.bl_tree[2*y]++):M<=10?P.bl_tree[2*b]++:P.bl_tree[2*w]++,ut=q,ot=(M=0)===E?(H=138,3):q===E?(H=6,3):(H=7,4))}function X(P,V,rt){var st,q,ut=-1,E=V[1],M=0,H=7,ot=4;for(E===0&&(H=138,ot=3),st=0;st<=rt;st++)if(q=E,E=V[2*(st+1)+1],!(++M<H&&q===E)){if(M<ot)for(;K(P,q,P.bl_tree),--M!=0;);else q!==0?(q!==ut&&(K(P,q,P.bl_tree),M--),K(P,y,P.bl_tree),Z(P,M-3,2)):M<=10?(K(P,b,P.bl_tree),Z(P,M-3,3)):(K(P,w,P.bl_tree),Z(P,M-11,7));ut=q,ot=(M=0)===E?(H=138,3):q===E?(H=6,3):(H=7,4)}}o(G);var Q=!1;function k(P,V,rt,st){Z(P,(r<<1)+(st?1:0),3),function(q,ut,E,M){Tt(q),M&&(it(q,E),it(q,~E)),n.arraySet(q.pending_buf,q.window,ut,E,q.pending),q.pending+=E}(P,V,rt,!0)}e._tr_init=function(P){Q||(function(){var V,rt,st,q,ut,E=new Array(g+1);for(q=st=0;q<c-1;q++)for(O[q]=st,V=0;V<1<<S[q];V++)v[st++]=q;for(v[st-1]=q,q=ut=0;q<16;q++)for(G[q]=ut,V=0;V<1<<L[q];V++)N[ut++]=q;for(ut>>=7;q<u;q++)for(G[q]=ut<<7,V=0;V<1<<L[q]-7;V++)N[256+ut++]=q;for(rt=0;rt<=g;rt++)E[rt]=0;for(V=0;V<=143;)z[2*V+1]=8,V++,E[8]++;for(;V<=255;)z[2*V+1]=9,V++,E[9]++;for(;V<=279;)z[2*V+1]=7,V++,E[7]++;for(;V<=287;)z[2*V+1]=8,V++,E[8]++;for(At(z,p+1,E),V=0;V<u;V++)T[2*V+1]=5,T[2*V]=ft(V,5);B=new J(z,S,h+1,p,g),U=new J(T,L,0,u,g),nt=new J(new Array(0),I,0,f,d)}(),Q=!0),P.l_desc=new C(P.dyn_ltree,B),P.d_desc=new C(P.dyn_dtree,U),P.bl_desc=new C(P.bl_tree,nt),P.bi_buf=0,P.bi_valid=0,et(P)},e._tr_stored_block=k,e._tr_flush_block=function(P,V,rt,st){var q,ut,E=0;0<P.level?(P.strm.data_type===2&&(P.strm.data_type=function(M){var H,ot=4093624447;for(H=0;H<=31;H++,ot>>>=1)if(1&ot&&M.dyn_ltree[2*H]!==0)return i;if(M.dyn_ltree[18]!==0||M.dyn_ltree[20]!==0||M.dyn_ltree[26]!==0)return s;for(H=32;H<h;H++)if(M.dyn_ltree[2*H]!==0)return s;return i}(P)),Dt(P,P.l_desc),Dt(P,P.d_desc),E=function(M){var H;for(x(M,M.dyn_ltree,M.l_desc.max_code),x(M,M.dyn_dtree,M.d_desc.max_code),Dt(M,M.bl_desc),H=f-1;3<=H&&M.bl_tree[2*A[H]+1]===0;H--);return M.opt_len+=3*(H+1)+5+5+4,H}(P),q=P.opt_len+3+7>>>3,(ut=P.static_len+3+7>>>3)<=q&&(q=ut)):q=ut=rt+5,rt+4<=q&&V!==-1?k(P,V,rt,st):P.strategy===4||ut===q?(Z(P,2+(st?1:0),3),xt(P,z,T)):(Z(P,4+(st?1:0),3),function(M,H,ot,ht){var pt;for(Z(M,H-257,5),Z(M,ot-1,5),Z(M,ht-4,4),pt=0;pt<ht;pt++)Z(M,M.bl_tree[2*A[pt]+1],3);X(M,M.dyn_ltree,H-1),X(M,M.dyn_dtree,ot-1)}(P,P.l_desc.max_code+1,P.d_desc.max_code+1,E+1),xt(P,P.dyn_ltree,P.dyn_dtree)),et(P),st&&Tt(P)},e._tr_tally=function(P,V,rt){return P.pending_buf[P.d_buf+2*P.last_lit]=V>>>8&255,P.pending_buf[P.d_buf+2*P.last_lit+1]=255&V,P.pending_buf[P.l_buf+P.last_lit]=255&rt,P.last_lit++,V===0?P.dyn_ltree[2*rt]++:(P.matches++,V--,P.dyn_ltree[2*(v[rt]+h+1)]++,P.dyn_dtree[2*R(V)]++),P.last_lit===P.lit_bufsize-1},e._tr_align=function(P){Z(P,2,3),K(P,_,z),function(V){V.bi_valid===16?(it(V,V.bi_buf),V.bi_buf=0,V.bi_valid=0):8<=V.bi_valid&&(V.pending_buf[V.pending++]=255&V.bi_buf,V.bi_buf>>=8,V.bi_valid-=8)}(P)}},{"../utils/common":41}],53:[function(a,t,e){"use strict";t.exports=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}},{}],54:[function(a,t,e){(function(n){(function(i,s){"use strict";if(!i.setImmediate){var o,r,c,h,p=1,u={},f=!1,m=i.document,g=Object.getPrototypeOf&&Object.getPrototypeOf(i);g=g&&g.setTimeout?g:i,o={}.toString.call(i.process)==="[object process]"?function(y){process.nextTick(function(){d(y)})}:function(){if(i.postMessage&&!i.importScripts){var y=!0,b=i.onmessage;return i.onmessage=function(){y=!1},i.postMessage("","*"),i.onmessage=b,y}}()?(h="setImmediate$"+Math.random()+"$",i.addEventListener?i.addEventListener("message",_,!1):i.attachEvent("onmessage",_),function(y){i.postMessage(h+y,"*")}):i.MessageChannel?((c=new MessageChannel).port1.onmessage=function(y){d(y.data)},function(y){c.port2.postMessage(y)}):m&&"onreadystatechange"in m.createElement("script")?(r=m.documentElement,function(y){var b=m.createElement("script");b.onreadystatechange=function(){d(y),b.onreadystatechange=null,r.removeChild(b),b=null},r.appendChild(b)}):function(y){setTimeout(d,0,y)},g.setImmediate=function(y){typeof y!="function"&&(y=new Function(""+y));for(var b=new Array(arguments.length-1),w=0;w<b.length;w++)b[w]=arguments[w+1];var S={callback:y,args:b};return u[p]=S,o(p),p++},g.clearImmediate=l}function l(y){delete u[y]}function d(y){if(f)setTimeout(d,0,y);else{var b=u[y];if(b){f=!0;try{(function(w){var S=w.callback,L=w.args;switch(L.length){case 0:S();break;case 1:S(L[0]);break;case 2:S(L[0],L[1]);break;case 3:S(L[0],L[1],L[2]);break;default:S.apply(s,L)}})(b)}finally{l(y),f=!1}}}}function _(y){y.source===i&&typeof y.data=="string"&&y.data.indexOf(h)===0&&d(+y.data.slice(h.length))}})(typeof self>"u"?n===void 0?this:n:self)}).call(this,typeof global<"u"?global:typeof self<"u"?self:typeof window<"u"?window:{})},{}]},{},[10])(10)})});function Ti(a,t,e,n){let i=n,s=0,o=0;for(t=Math.floor(t),e=Math.floor(e),a.rect(t-i,e,n<<1,1);i>s;)o-=--i-++s,o<0&&(o+=i++),a.rect(t-s,e-i,s<<1,1),a.rect(t-i,e-s,i<<1,1),a.rect(t-i,e+s,i<<1,1),a.rect(t-s,e+i,s<<1,1)}function qr(a,t,e,n,i){var s,o,r=i-e,c=n-t,h=!1,p=c>>31,u=r>>31,f;if((r^u)-u>(c^p)-p&&(r^=c,c^=r,r^=c,h=!0),s=c<0?-1:1,o=c===0?r:r/c,h)for(t+=.5,f=0;f!==c;f+=s)a.rect(t+f*o|0,e+f,1,1);else for(e+=.5,f=0;f!==c;f+=s)a.rect(t+f,e+f*o|0,1,1)}function ws(a,t,e,n,i=!1){let[s,o]=t,[r,c]=e;var h=r-s,p=c-o,u=Math.atan2(p,h),f=s-n*Math.sin(u),m=o+n*Math.cos(u),g=r-n*Math.sin(u),l=c+n*Math.cos(u),d=s+n*Math.sin(u),_=o-n*Math.cos(u),y=r+n*Math.sin(u),b=c-n*Math.cos(u);a.beginPath(),a.moveTo(s,o),a.lineTo(r,c),a.lineWidth=n<<1,a.stroke(),a.beginPath(),qr(a,f|0,m|0,g|0,l|0),qr(a,d|0,_|0,y|0,b|0),a.fill(),i?(a.fillRect(Math.floor(s)-n,Math.floor(o)-n,n*2,n*2),a.fillRect(Math.floor(r)-n,Math.floor(c)-n,n*2,n*2)):(Ti(a,s,o,n),Ti(a,r,c,n),a.fill())}var Dr="145",Pn={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Ln={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Wo=0,Zr=1,Ho=2;var oo=1,Go=2,_i=3,ni=0,Ae=1,Fe=2,hn=0,Qn=1,Yr=2,Jr=3,jr=4,Xo=5,jn=100,qo=101,Zo=102,$r=103,Kr=104,Yo=200,Jo=201,jo=202,$o=203,lo=204,co=205,Ko=206,Qo=207,tl=208,el=209,nl=210,il=0,sl=1,rl=2,er=3,al=4,ol=5,ll=6,cl=7,ho=0,hl=1,ul=2,Ie=0,dl=1,fl=2,pl=3,ml=4,gl=5,uo=300,ii=301,si=302,nr=303,ir=304,cs=306,sr=1e3,ue=1001,rr=1002,Jt=1003,Qr=1004;var ta=1005;var Se=1006,_l=1007;var hs=1008;var Mn=1009,xl=1010,vl=1011,fo=1012,yl=1013,vn=1014,Ue=1015,yi=1016,bl=1017,wl=1018,ti=1020,Ml=1021,Sl=1022,ve=1023,Al=1024,Tl=1025,bn=1026,ri=1027,El=1028,Cl=1029,Rl=1030,Pl=1031,Ll=1033,Ms=33776,Ss=33777,As=33778,Ts=33779,ea=35840,na=35841,ia=35842,sa=35843,Il=36196,ra=37492,aa=37496,oa=37808,la=37809,ca=37810,ha=37811,ua=37812,da=37813,fa=37814,pa=37815,ma=37816,ga=37817,_a=37818,xa=37819,va=37820,ya=37821,ba=36492;var ji=2300,$i=2301,Es=2302,wa=2400,Ma=2401,Sa=2402;var je=3e3,Zt=3001,Dl=3200,zl=3201,kl=0,Ol=1;var Ze="srgb",yn="srgb-linear";var Cs=7680;var Nl=519,Aa=35044;var Ta="300 es",ar=1035,Be=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let i=this._listeners[t];if(i!==void 0){let s=i.indexOf(e);s!==-1&&i.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let n=this._listeners[t.type];if(n!==void 0){t.target=this;let i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,t);t.target=null}}},re=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Rs=Math.PI/180,Ea=180/Math.PI;function Si(){let a=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(re[a&255]+re[a>>8&255]+re[a>>16&255]+re[a>>24&255]+"-"+re[t&255]+re[t>>8&255]+"-"+re[t>>16&15|64]+re[t>>24&255]+"-"+re[e&63|128]+re[e>>8&255]+"-"+re[e>>16&255]+re[e>>24&255]+re[n&255]+re[n>>8&255]+re[n>>16&255]+re[n>>24&255]).toLowerCase()}function he(a,t,e){return Math.max(t,Math.min(e,a))}function Fl(a,t){return(a%t+t)%t}function Ps(a,t,e){return(1-e)*a+e*t}function Ca(a){return(a&a-1)===0&&a!==0}function or(a){return Math.pow(2,Math.floor(Math.log(a)/Math.LN2))}function Ei(a,t){switch(t.constructor){case Float32Array:return a;case Uint16Array:return a/65535;case Uint8Array:return a/255;case Int16Array:return Math.max(a/32767,-1);case Int8Array:return Math.max(a/127,-1);default:throw new Error("Invalid component type.")}}function ge(a,t){switch(t.constructor){case Float32Array:return a;case Uint16Array:return Math.round(a*65535);case Uint8Array:return Math.round(a*255);case Int16Array:return Math.round(a*32767);case Int8Array:return Math.round(a*127);default:throw new Error("Invalid component type.")}}var zt=class{constructor(t=0,e=0){zt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),i=Math.sin(e),s=this.x-t.x,o=this.y-t.y;return this.x=s*n-o*i+t.x,this.y=s*i+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},de=class{constructor(){de.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1]}set(t,e,n,i,s,o,r,c,h){let p=this.elements;return p[0]=t,p[1]=i,p[2]=r,p[3]=e,p[4]=s,p[5]=c,p[6]=n,p[7]=o,p[8]=h,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,s=this.elements,o=n[0],r=n[3],c=n[6],h=n[1],p=n[4],u=n[7],f=n[2],m=n[5],g=n[8],l=i[0],d=i[3],_=i[6],y=i[1],b=i[4],w=i[7],S=i[2],L=i[5],I=i[8];return s[0]=o*l+r*y+c*S,s[3]=o*d+r*b+c*L,s[6]=o*_+r*w+c*I,s[1]=h*l+p*y+u*S,s[4]=h*d+p*b+u*L,s[7]=h*_+p*w+u*I,s[2]=f*l+m*y+g*S,s[5]=f*d+m*b+g*L,s[8]=f*_+m*w+g*I,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],r=t[5],c=t[6],h=t[7],p=t[8];return e*o*p-e*r*h-n*s*p+n*r*c+i*s*h-i*o*c}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],r=t[5],c=t[6],h=t[7],p=t[8],u=p*o-r*h,f=r*c-p*s,m=h*s-o*c,g=e*u+n*f+i*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let l=1/g;return t[0]=u*l,t[1]=(i*h-p*n)*l,t[2]=(r*n-i*o)*l,t[3]=f*l,t[4]=(p*e-i*c)*l,t[5]=(i*s-r*e)*l,t[6]=m*l,t[7]=(n*c-h*e)*l,t[8]=(o*e-n*s)*l,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,s,o,r){let c=Math.cos(s),h=Math.sin(s);return this.set(n*c,n*h,-n*(c*o+h*r)+o+t,-i*h,i*c,-i*(-h*o+c*r)+r+e,0,0,1),this}scale(t,e){let n=this.elements;return n[0]*=t,n[3]*=t,n[6]*=t,n[1]*=e,n[4]*=e,n[7]*=e,this}rotate(t){let e=Math.cos(t),n=Math.sin(t),i=this.elements,s=i[0],o=i[3],r=i[6],c=i[1],h=i[4],p=i[7];return i[0]=e*s+n*c,i[3]=e*o+n*h,i[6]=e*r+n*p,i[1]=-n*s+e*c,i[4]=-n*o+e*h,i[7]=-n*r+e*p,this}translate(t,e){let n=this.elements;return n[0]+=t*n[2],n[3]+=t*n[5],n[6]+=t*n[8],n[1]+=e*n[2],n[4]+=e*n[5],n[7]+=e*n[8],this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};function po(a){for(let t=a.length-1;t>=0;--t)if(a[t]>=65535)return!0;return!1}function Ki(a){return document.createElementNS("http://www.w3.org/1999/xhtml",a)}function wn(a){return a<.04045?a*.0773993808:Math.pow(a*.9478672986+.0521327014,2.4)}function Ji(a){return a<.0031308?a*12.92:1.055*Math.pow(a,.41666)-.055}var Ls={[Ze]:{[yn]:wn},[yn]:{[Ze]:Ji}},Ee={legacyMode:!0,get workingColorSpace(){return yn},set workingColorSpace(a){console.warn("THREE.ColorManagement: .workingColorSpace is readonly.")},convert:function(a,t,e){if(this.legacyMode||t===e||!t||!e)return a;if(Ls[t]&&Ls[t][e]!==void 0){let n=Ls[t][e];return a.r=n(a.r),a.g=n(a.g),a.b=n(a.b),a}throw new Error("Unsupported color space conversion.")},fromWorkingColorSpace:function(a,t){return this.convert(a,this.workingColorSpace,t)},toWorkingColorSpace:function(a,t){return this.convert(a,t,this.workingColorSpace)}},mo={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Qt={r:0,g:0,b:0},Ce={h:0,s:0,l:0},Ci={h:0,s:0,l:0};function Is(a,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?a+(t-a)*6*e:e<1/2?t:e<2/3?a+(t-a)*6*(2/3-e):a}function Ri(a,t){return t.r=a.r,t.g=a.g,t.b=a.b,t}var Gt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,e===void 0&&n===void 0?this.set(t):this.setRGB(t,e,n)}set(t){return t&&t.isColor?this.copy(t):typeof t=="number"?this.setHex(t):typeof t=="string"&&this.setStyle(t),this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ze){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Ee.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=yn){return this.r=t,this.g=e,this.b=n,Ee.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=yn){if(t=Fl(t,1),e=he(e,0,1),n=he(n,0,1),e===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+e):n+e-n*e,o=2*n-s;this.r=Is(o,s,t+1/3),this.g=Is(o,s,t),this.b=Is(o,s,t-1/3)}return Ee.toWorkingColorSpace(this,i),this}setStyle(t,e=Ze){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^((?:rgb|hsl)a?)\(([^\)]*)\)/.exec(t)){let s,o=i[1],r=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(r))return this.r=Math.min(255,parseInt(s[1],10))/255,this.g=Math.min(255,parseInt(s[2],10))/255,this.b=Math.min(255,parseInt(s[3],10))/255,Ee.toWorkingColorSpace(this,e),n(s[4]),this;if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(r))return this.r=Math.min(100,parseInt(s[1],10))/100,this.g=Math.min(100,parseInt(s[2],10))/100,this.b=Math.min(100,parseInt(s[3],10))/100,Ee.toWorkingColorSpace(this,e),n(s[4]),this;break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(r)){let c=parseFloat(s[1])/360,h=parseFloat(s[2])/100,p=parseFloat(s[3])/100;return n(s[4]),this.setHSL(c,h,p,e)}break}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){let s=i[1],o=s.length;if(o===3)return this.r=parseInt(s.charAt(0)+s.charAt(0),16)/255,this.g=parseInt(s.charAt(1)+s.charAt(1),16)/255,this.b=parseInt(s.charAt(2)+s.charAt(2),16)/255,Ee.toWorkingColorSpace(this,e),this;if(o===6)return this.r=parseInt(s.charAt(0)+s.charAt(1),16)/255,this.g=parseInt(s.charAt(2)+s.charAt(3),16)/255,this.b=parseInt(s.charAt(4)+s.charAt(5),16)/255,Ee.toWorkingColorSpace(this,e),this}return t&&t.length>0?this.setColorName(t,e):this}setColorName(t,e=Ze){let n=mo[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=wn(t.r),this.g=wn(t.g),this.b=wn(t.b),this}copyLinearToSRGB(t){return this.r=Ji(t.r),this.g=Ji(t.g),this.b=Ji(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ze){return Ee.fromWorkingColorSpace(Ri(this,Qt),t),he(Qt.r*255,0,255)<<16^he(Qt.g*255,0,255)<<8^he(Qt.b*255,0,255)<<0}getHexString(t=Ze){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=yn){Ee.fromWorkingColorSpace(Ri(this,Qt),e);let n=Qt.r,i=Qt.g,s=Qt.b,o=Math.max(n,i,s),r=Math.min(n,i,s),c,h,p=(r+o)/2;if(r===o)c=0,h=0;else{let u=o-r;switch(h=p<=.5?u/(o+r):u/(2-o-r),o){case n:c=(i-s)/u+(i<s?6:0);break;case i:c=(s-n)/u+2;break;case s:c=(n-i)/u+4;break}c/=6}return t.h=c,t.s=h,t.l=p,t}getRGB(t,e=yn){return Ee.fromWorkingColorSpace(Ri(this,Qt),e),t.r=Qt.r,t.g=Qt.g,t.b=Qt.b,t}getStyle(t=Ze){return Ee.fromWorkingColorSpace(Ri(this,Qt),t),t!==Ze?`color(${t} ${Qt.r} ${Qt.g} ${Qt.b})`:`rgb(${Qt.r*255|0},${Qt.g*255|0},${Qt.b*255|0})`}offsetHSL(t,e,n){return this.getHSL(Ce),Ce.h+=t,Ce.s+=e,Ce.l+=n,this.setHSL(Ce.h,Ce.s,Ce.l),this}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Ce),t.getHSL(Ci);let n=Ps(Ce.h,Ci.h,e),i=Ps(Ce.s,Ci.s,e),s=Ps(Ce.l,Ci.l,e);return this.setHSL(n,i,s),this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}};Gt.NAMES=mo;var On,Qi=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{On===void 0&&(On=Ki("canvas")),On.width=t.width,On.height=t.height;let n=On.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=On}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Ki("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let i=n.getImageData(0,0,t.width,t.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=wn(s[o]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(wn(e[n]/255)*255):e[n]=wn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},ts=class{constructor(t=null){this.isSource=!0,this.uuid=Si(),this.data=t,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,r=i.length;o<r;o++)i[o].isDataTexture?s.push(Ds(i[o].image)):s.push(Ds(i[o]))}else s=Ds(i);n.url=s}return e||(t.images[this.uuid]=n),n}};function Ds(a){return typeof HTMLImageElement<"u"&&a instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&a instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&a instanceof ImageBitmap?Qi.getDataURL(a):a.data?{data:Array.from(a.data),width:a.width,height:a.height,type:a.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Ul=0,pe=class extends Be{constructor(t=pe.DEFAULT_IMAGE,e=pe.DEFAULT_MAPPING,n=ue,i=ue,s=Se,o=hs,r=ve,c=Mn,h=1,p=je){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ul++}),this.uuid=Si(),this.name="",this.source=new ts(t),this.mipmaps=[],this.mapping=e,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=h,this.format=r,this.internalFormat=null,this.type=c,this.offset=new zt(0,0),this.repeat=new zt(1,1),this.center=new zt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new de,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.encoding=p,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.encoding=t.encoding,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.5,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,type:this.type,encoding:this.encoding,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return JSON.stringify(this.userData)!=="{}"&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==uo)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case sr:t.x=t.x-Math.floor(t.x);break;case ue:t.x=t.x<0?0:1;break;case rr:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case sr:t.y=t.y-Math.floor(t.y);break;case ue:t.y=t.y<0?0:1;break;case rr:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}};pe.DEFAULT_IMAGE=null;pe.DEFAULT_MAPPING=uo;var te=class{constructor(t=0,e=0,n=0,i=1){te.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,s=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*s,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,s,c=t.elements,h=c[0],p=c[4],u=c[8],f=c[1],m=c[5],g=c[9],l=c[2],d=c[6],_=c[10];if(Math.abs(p-f)<.01&&Math.abs(u-l)<.01&&Math.abs(g-d)<.01){if(Math.abs(p+f)<.1&&Math.abs(u+l)<.1&&Math.abs(g+d)<.1&&Math.abs(h+m+_-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let b=(h+1)/2,w=(m+1)/2,S=(_+1)/2,L=(p+f)/4,I=(u+l)/4,A=(g+d)/4;return b>w&&b>S?b<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(b),i=L/n,s=I/n):w>S?w<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(w),n=L/i,s=A/i):S<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(S),n=I/s,i=A/s),this.set(n,i,s,e),this}let y=Math.sqrt((d-g)*(d-g)+(u-l)*(u-l)+(f-p)*(f-p));return Math.abs(y)<.001&&(y=1),this.x=(d-g)/y,this.y=(u-l)/y,this.z=(f-p)/y,this.w=Math.acos((h+m+_-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this.w=this.w<0?Math.ceil(this.w):Math.floor(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},De=class extends Be{constructor(t,e,n={}){super(),this.isWebGLRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new te(0,0,t,e),this.scissorTest=!1,this.viewport=new te(0,0,t,e);let i={width:t,height:e,depth:1};this.texture=new pe(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.encoding),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.internalFormat=n.internalFormat!==void 0?n.internalFormat:null,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:Se,this.depthBuffer=n.depthBuffer!==void 0?n.depthBuffer:!0,this.stencilBuffer=n.stencilBuffer!==void 0?n.stencilBuffer:!1,this.depthTexture=n.depthTexture!==void 0?n.depthTexture:null,this.samples=n.samples!==void 0?n.samples:0}setSize(t,e,n=1){(this.width!==t||this.height!==e||this.depth!==n)&&(this.width=t,this.height=e,this.depth=n,this.texture.image.width=t,this.texture.image.height=e,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.viewport.copy(t.viewport),this.texture=t.texture.clone(),this.texture.isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new ts(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},es=class extends pe{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Jt,this.minFilter=Jt,this.wrapR=ue,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var lr=class extends pe{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Jt,this.minFilter=Jt,this.wrapR=ue,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var ze=class{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,s,o,r){let c=n[i+0],h=n[i+1],p=n[i+2],u=n[i+3],f=s[o+0],m=s[o+1],g=s[o+2],l=s[o+3];if(r===0){t[e+0]=c,t[e+1]=h,t[e+2]=p,t[e+3]=u;return}if(r===1){t[e+0]=f,t[e+1]=m,t[e+2]=g,t[e+3]=l;return}if(u!==l||c!==f||h!==m||p!==g){let d=1-r,_=c*f+h*m+p*g+u*l,y=_>=0?1:-1,b=1-_*_;if(b>Number.EPSILON){let S=Math.sqrt(b),L=Math.atan2(S,_*y);d=Math.sin(d*L)/S,r=Math.sin(r*L)/S}let w=r*y;if(c=c*d+f*w,h=h*d+m*w,p=p*d+g*w,u=u*d+l*w,d===1-r){let S=1/Math.sqrt(c*c+h*h+p*p+u*u);c*=S,h*=S,p*=S,u*=S}}t[e]=c,t[e+1]=h,t[e+2]=p,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,i,s,o){let r=n[i],c=n[i+1],h=n[i+2],p=n[i+3],u=s[o],f=s[o+1],m=s[o+2],g=s[o+3];return t[e]=r*g+p*u+c*m-h*f,t[e+1]=c*g+p*f+h*u-r*m,t[e+2]=h*g+p*m+r*f-c*u,t[e+3]=p*g-r*u-c*f-h*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e){let n=t._x,i=t._y,s=t._z,o=t._order,r=Math.cos,c=Math.sin,h=r(n/2),p=r(i/2),u=r(s/2),f=c(n/2),m=c(i/2),g=c(s/2);switch(o){case"XYZ":this._x=f*p*u+h*m*g,this._y=h*m*u-f*p*g,this._z=h*p*g+f*m*u,this._w=h*p*u-f*m*g;break;case"YXZ":this._x=f*p*u+h*m*g,this._y=h*m*u-f*p*g,this._z=h*p*g-f*m*u,this._w=h*p*u+f*m*g;break;case"ZXY":this._x=f*p*u-h*m*g,this._y=h*m*u+f*p*g,this._z=h*p*g+f*m*u,this._w=h*p*u-f*m*g;break;case"ZYX":this._x=f*p*u-h*m*g,this._y=h*m*u+f*p*g,this._z=h*p*g-f*m*u,this._w=h*p*u+f*m*g;break;case"YZX":this._x=f*p*u+h*m*g,this._y=h*m*u+f*p*g,this._z=h*p*g-f*m*u,this._w=h*p*u-f*m*g;break;case"XZY":this._x=f*p*u-h*m*g,this._y=h*m*u-f*p*g,this._z=h*p*g+f*m*u,this._w=h*p*u+f*m*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e!==!1&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],i=e[4],s=e[8],o=e[1],r=e[5],c=e[9],h=e[2],p=e[6],u=e[10],f=n+r+u;if(f>0){let m=.5/Math.sqrt(f+1);this._w=.25/m,this._x=(p-c)*m,this._y=(s-h)*m,this._z=(o-i)*m}else if(n>r&&n>u){let m=2*Math.sqrt(1+n-r-u);this._w=(p-c)/m,this._x=.25*m,this._y=(i+o)/m,this._z=(s+h)/m}else if(r>u){let m=2*Math.sqrt(1+r-n-u);this._w=(s-h)/m,this._x=(i+o)/m,this._y=.25*m,this._z=(c+p)/m}else{let m=2*Math.sqrt(1+u-n-r);this._w=(o-i)/m,this._x=(s+h)/m,this._y=(c+p)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(he(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,i=t._y,s=t._z,o=t._w,r=e._x,c=e._y,h=e._z,p=e._w;return this._x=n*p+o*r+i*h-s*c,this._y=i*p+o*c+s*r-n*h,this._z=s*p+o*h+n*c-i*r,this._w=o*p-n*r-i*c-s*h,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,i=this._y,s=this._z,o=this._w,r=o*t._w+n*t._x+i*t._y+s*t._z;if(r<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,r=-r):this.copy(t),r>=1)return this._w=o,this._x=n,this._y=i,this._z=s,this;let c=1-r*r;if(c<=Number.EPSILON){let m=1-e;return this._w=m*o+e*this._w,this._x=m*n+e*this._x,this._y=m*i+e*this._y,this._z=m*s+e*this._z,this.normalize(),this._onChangeCallback(),this}let h=Math.sqrt(c),p=Math.atan2(h,r),u=Math.sin((1-e)*p)/h,f=Math.sin(e*p)/h;return this._w=o*u+this._w*f,this._x=n*u+this._x*f,this._y=i*u+this._y*f,this._z=s*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=Math.random(),e=Math.sqrt(1-t),n=Math.sqrt(t),i=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(e*Math.cos(i),n*Math.sin(s),n*Math.cos(s),e*Math.sin(i))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},$=class{constructor(t=0,e=0,n=0){$.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Ra.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Ra.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*i,this.y=s[1]*e+s[4]*n+s[7]*i,this.z=s[2]*e+s[5]*n+s[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,s=t.elements,o=1/(s[3]*e+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*e+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*e+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,i=this.z,s=t.x,o=t.y,r=t.z,c=t.w,h=c*e+o*i-r*n,p=c*n+r*e-s*i,u=c*i+s*n-o*e,f=-s*e-o*n-r*i;return this.x=h*c+f*-s+p*-r-u*-o,this.y=p*c+f*-o+u*-s-h*-r,this.z=u*c+f*-r+h*-o-p*-s,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*i,this.y=s[1]*e+s[5]*n+s[9]*i,this.z=s[2]*e+s[6]*n+s[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,i=t.y,s=t.z,o=e.x,r=e.y,c=e.z;return this.x=i*c-s*r,this.y=s*o-n*c,this.z=n*r-i*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return zs.copy(this).projectOnVector(t),this.sub(zs)}reflect(t){return this.sub(zs.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(he(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=(Math.random()-.5)*2,e=Math.random()*Math.PI*2,n=Math.sqrt(1-t**2);return this.x=n*Math.cos(e),this.y=n*Math.sin(e),this.z=t,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},zs=new $,Ra=new ze,Sn=class{constructor(t=new $(1/0,1/0,1/0),e=new $(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){let e=1/0,n=1/0,i=1/0,s=-1/0,o=-1/0,r=-1/0;for(let c=0,h=t.length;c<h;c+=3){let p=t[c],u=t[c+1],f=t[c+2];p<e&&(e=p),u<n&&(n=u),f<i&&(i=f),p>s&&(s=p),u>o&&(o=u),f>r&&(r=f)}return this.min.set(e,n,i),this.max.set(s,o,r),this}setFromBufferAttribute(t){let e=1/0,n=1/0,i=1/0,s=-1/0,o=-1/0,r=-1/0;for(let c=0,h=t.count;c<h;c++){let p=t.getX(c),u=t.getY(c),f=t.getZ(c);p<e&&(e=p),u<n&&(n=u),f<i&&(i=f),p>s&&(s=p),u>o&&(o=u),f>r&&(r=f)}return this.min.set(e,n,i),this.max.set(s,o,r),this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=pn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0)if(e&&n.attributes!=null&&n.attributes.position!==void 0){let s=n.attributes.position;for(let o=0,r=s.count;o<r;o++)pn.fromBufferAttribute(s,o).applyMatrix4(t.matrixWorld),this.expandByPoint(pn)}else n.boundingBox===null&&n.computeBoundingBox(),ks.copy(n.boundingBox),ks.applyMatrix4(t.matrixWorld),this.union(ks);let i=t.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,pn),pn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(pi),Pi.subVectors(this.max,pi),Nn.subVectors(t.a,pi),Fn.subVectors(t.b,pi),Un.subVectors(t.c,pi),en.subVectors(Fn,Nn),nn.subVectors(Un,Fn),mn.subVectors(Nn,Un);let e=[0,-en.z,en.y,0,-nn.z,nn.y,0,-mn.z,mn.y,en.z,0,-en.x,nn.z,0,-nn.x,mn.z,0,-mn.x,-en.y,en.x,0,-nn.y,nn.x,0,-mn.y,mn.x,0];return!Os(e,Nn,Fn,Un,Pi)||(e=[1,0,0,0,1,0,0,0,1],!Os(e,Nn,Fn,Un,Pi))?!1:(Li.crossVectors(en,nn),e=[Li.x,Li.y,Li.z],Os(e,Nn,Fn,Un,Pi))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return pn.copy(t).clamp(this.min,this.max).sub(t).length()}getBoundingSphere(t){return this.getCenter(t.center),t.radius=this.getSize(pn).length()*.5,t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(We[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),We[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),We[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),We[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),We[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),We[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),We[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),We[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(We),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},We=[new $,new $,new $,new $,new $,new $,new $,new $],pn=new $,ks=new Sn,Nn=new $,Fn=new $,Un=new $,en=new $,nn=new $,mn=new $,pi=new $,Pi=new $,Li=new $,gn=new $;function Os(a,t,e,n,i){for(let s=0,o=a.length-3;s<=o;s+=3){gn.fromArray(a,s);let r=i.x*Math.abs(gn.x)+i.y*Math.abs(gn.y)+i.z*Math.abs(gn.z),c=t.dot(gn),h=e.dot(gn),p=n.dot(gn);if(Math.max(-Math.max(c,h,p),Math.min(c,h,p))>r)return!1}return!0}var Bl=new Sn,Pa=new $,Ii=new $,Ns=new $,bi=class{constructor(t=new $,e=-1){this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Bl.setFromPoints(t).getCenter(n);let i=0;for(let s=0,o=t.length;s<o;s++)i=Math.max(i,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ns.subVectors(t,this.center);let e=Ns.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.add(Ns.multiplyScalar(i/n)),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?Ii.set(0,0,1).multiplyScalar(t.radius):Ii.subVectors(t.center,this.center).normalize().multiplyScalar(t.radius),this.expandByPoint(Pa.copy(t.center).add(Ii)),this.expandByPoint(Pa.copy(t.center).sub(Ii)),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},He=new $,Fs=new $,Di=new $,sn=new $,Us=new $,zi=new $,Bs=new $,cr=class{constructor(t=new $,e=new $(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.direction).multiplyScalar(t).add(this.origin)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,He)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.direction).multiplyScalar(n).add(this.origin)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=He.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(He.copy(this.direction).multiplyScalar(e).add(this.origin),He.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){Fs.copy(t).add(e).multiplyScalar(.5),Di.copy(e).sub(t).normalize(),sn.copy(this.origin).sub(Fs);let s=t.distanceTo(e)*.5,o=-this.direction.dot(Di),r=sn.dot(this.direction),c=-sn.dot(Di),h=sn.lengthSq(),p=Math.abs(1-o*o),u,f,m,g;if(p>0)if(u=o*c-r,f=o*r-c,g=s*p,u>=0)if(f>=-g)if(f<=g){let l=1/p;u*=l,f*=l,m=u*(u+o*f+2*r)+f*(o*u+f+2*c)+h}else f=s,u=Math.max(0,-(o*f+r)),m=-u*u+f*(f+2*c)+h;else f=-s,u=Math.max(0,-(o*f+r)),m=-u*u+f*(f+2*c)+h;else f<=-g?(u=Math.max(0,-(-o*s+r)),f=u>0?-s:Math.min(Math.max(-s,-c),s),m=-u*u+f*(f+2*c)+h):f<=g?(u=0,f=Math.min(Math.max(-s,-c),s),m=f*(f+2*c)+h):(u=Math.max(0,-(o*s+r)),f=u>0?s:Math.min(Math.max(-s,-c),s),m=-u*u+f*(f+2*c)+h);else f=o>0?-s:s,u=Math.max(0,-(o*f+r)),m=-u*u+f*(f+2*c)+h;return n&&n.copy(this.direction).multiplyScalar(u).add(this.origin),i&&i.copy(Di).multiplyScalar(f).add(Fs),m}intersectSphere(t,e){He.subVectors(t.center,this.origin);let n=He.dot(this.direction),i=He.dot(He)-n*n,s=t.radius*t.radius;if(i>s)return null;let o=Math.sqrt(s-i),r=n-o,c=n+o;return r<0&&c<0?null:r<0?this.at(c,e):this.at(r,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,s,o,r,c,h=1/this.direction.x,p=1/this.direction.y,u=1/this.direction.z,f=this.origin;return h>=0?(n=(t.min.x-f.x)*h,i=(t.max.x-f.x)*h):(n=(t.max.x-f.x)*h,i=(t.min.x-f.x)*h),p>=0?(s=(t.min.y-f.y)*p,o=(t.max.y-f.y)*p):(s=(t.max.y-f.y)*p,o=(t.min.y-f.y)*p),n>o||s>i||((s>n||n!==n)&&(n=s),(o<i||i!==i)&&(i=o),u>=0?(r=(t.min.z-f.z)*u,c=(t.max.z-f.z)*u):(r=(t.max.z-f.z)*u,c=(t.min.z-f.z)*u),n>c||r>i)||((r>n||n!==n)&&(n=r),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,He)!==null}intersectTriangle(t,e,n,i,s){Us.subVectors(e,t),zi.subVectors(n,t),Bs.crossVectors(Us,zi);let o=this.direction.dot(Bs),r;if(o>0){if(i)return null;r=1}else if(o<0)r=-1,o=-o;else return null;sn.subVectors(this.origin,t);let c=r*this.direction.dot(zi.crossVectors(sn,zi));if(c<0)return null;let h=r*this.direction.dot(Us.cross(sn));if(h<0||c+h>o)return null;let p=-r*sn.dot(Bs);return p<0?null:this.at(p/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ee=class{constructor(){ee.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}set(t,e,n,i,s,o,r,c,h,p,u,f,m,g,l,d){let _=this.elements;return _[0]=t,_[4]=e,_[8]=n,_[12]=i,_[1]=s,_[5]=o,_[9]=r,_[13]=c,_[2]=h,_[6]=p,_[10]=u,_[14]=f,_[3]=m,_[7]=g,_[11]=l,_[15]=d,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ee().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,i=1/Bn.setFromMatrixColumn(t,0).length(),s=1/Bn.setFromMatrixColumn(t,1).length(),o=1/Bn.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,i=t.y,s=t.z,o=Math.cos(n),r=Math.sin(n),c=Math.cos(i),h=Math.sin(i),p=Math.cos(s),u=Math.sin(s);if(t.order==="XYZ"){let f=o*p,m=o*u,g=r*p,l=r*u;e[0]=c*p,e[4]=-c*u,e[8]=h,e[1]=m+g*h,e[5]=f-l*h,e[9]=-r*c,e[2]=l-f*h,e[6]=g+m*h,e[10]=o*c}else if(t.order==="YXZ"){let f=c*p,m=c*u,g=h*p,l=h*u;e[0]=f+l*r,e[4]=g*r-m,e[8]=o*h,e[1]=o*u,e[5]=o*p,e[9]=-r,e[2]=m*r-g,e[6]=l+f*r,e[10]=o*c}else if(t.order==="ZXY"){let f=c*p,m=c*u,g=h*p,l=h*u;e[0]=f-l*r,e[4]=-o*u,e[8]=g+m*r,e[1]=m+g*r,e[5]=o*p,e[9]=l-f*r,e[2]=-o*h,e[6]=r,e[10]=o*c}else if(t.order==="ZYX"){let f=o*p,m=o*u,g=r*p,l=r*u;e[0]=c*p,e[4]=g*h-m,e[8]=f*h+l,e[1]=c*u,e[5]=l*h+f,e[9]=m*h-g,e[2]=-h,e[6]=r*c,e[10]=o*c}else if(t.order==="YZX"){let f=o*c,m=o*h,g=r*c,l=r*h;e[0]=c*p,e[4]=l-f*u,e[8]=g*u+m,e[1]=u,e[5]=o*p,e[9]=-r*p,e[2]=-h*p,e[6]=m*u+g,e[10]=f-l*u}else if(t.order==="XZY"){let f=o*c,m=o*h,g=r*c,l=r*h;e[0]=c*p,e[4]=-u,e[8]=h*p,e[1]=f*u+l,e[5]=o*p,e[9]=m*u-g,e[2]=g*u-m,e[6]=r*p,e[10]=l*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Vl,t,Wl)}lookAt(t,e,n){let i=this.elements;return _e.subVectors(t,e),_e.lengthSq()===0&&(_e.z=1),_e.normalize(),rn.crossVectors(n,_e),rn.lengthSq()===0&&(Math.abs(n.z)===1?_e.x+=1e-4:_e.z+=1e-4,_e.normalize(),rn.crossVectors(n,_e)),rn.normalize(),ki.crossVectors(_e,rn),i[0]=rn.x,i[4]=ki.x,i[8]=_e.x,i[1]=rn.y,i[5]=ki.y,i[9]=_e.y,i[2]=rn.z,i[6]=ki.z,i[10]=_e.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,s=this.elements,o=n[0],r=n[4],c=n[8],h=n[12],p=n[1],u=n[5],f=n[9],m=n[13],g=n[2],l=n[6],d=n[10],_=n[14],y=n[3],b=n[7],w=n[11],S=n[15],L=i[0],I=i[4],A=i[8],z=i[12],T=i[1],N=i[5],v=i[9],O=i[13],B=i[2],U=i[6],nt=i[10],G=i[14],J=i[3],C=i[7],R=i[11],it=i[15];return s[0]=o*L+r*T+c*B+h*J,s[4]=o*I+r*N+c*U+h*C,s[8]=o*A+r*v+c*nt+h*R,s[12]=o*z+r*O+c*G+h*it,s[1]=p*L+u*T+f*B+m*J,s[5]=p*I+u*N+f*U+m*C,s[9]=p*A+u*v+f*nt+m*R,s[13]=p*z+u*O+f*G+m*it,s[2]=g*L+l*T+d*B+_*J,s[6]=g*I+l*N+d*U+_*C,s[10]=g*A+l*v+d*nt+_*R,s[14]=g*z+l*O+d*G+_*it,s[3]=y*L+b*T+w*B+S*J,s[7]=y*I+b*N+w*U+S*C,s[11]=y*A+b*v+w*nt+S*R,s[15]=y*z+b*O+w*G+S*it,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],i=t[8],s=t[12],o=t[1],r=t[5],c=t[9],h=t[13],p=t[2],u=t[6],f=t[10],m=t[14],g=t[3],l=t[7],d=t[11],_=t[15];return g*(+s*c*u-i*h*u-s*r*f+n*h*f+i*r*m-n*c*m)+l*(+e*c*m-e*h*f+s*o*f-i*o*m+i*h*p-s*c*p)+d*(+e*h*u-e*r*m-s*o*u+n*o*m+s*r*p-n*h*p)+_*(-i*r*p-e*c*u+e*r*f+i*o*u-n*o*f+n*c*p)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],r=t[5],c=t[6],h=t[7],p=t[8],u=t[9],f=t[10],m=t[11],g=t[12],l=t[13],d=t[14],_=t[15],y=u*d*h-l*f*h+l*c*m-r*d*m-u*c*_+r*f*_,b=g*f*h-p*d*h-g*c*m+o*d*m+p*c*_-o*f*_,w=p*l*h-g*u*h+g*r*m-o*l*m-p*r*_+o*u*_,S=g*u*c-p*l*c-g*r*f+o*l*f+p*r*d-o*u*d,L=e*y+n*b+i*w+s*S;if(L===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let I=1/L;return t[0]=y*I,t[1]=(l*f*s-u*d*s-l*i*m+n*d*m+u*i*_-n*f*_)*I,t[2]=(r*d*s-l*c*s+l*i*h-n*d*h-r*i*_+n*c*_)*I,t[3]=(u*c*s-r*f*s-u*i*h+n*f*h+r*i*m-n*c*m)*I,t[4]=b*I,t[5]=(p*d*s-g*f*s+g*i*m-e*d*m-p*i*_+e*f*_)*I,t[6]=(g*c*s-o*d*s-g*i*h+e*d*h+o*i*_-e*c*_)*I,t[7]=(o*f*s-p*c*s+p*i*h-e*f*h-o*i*m+e*c*m)*I,t[8]=w*I,t[9]=(g*u*s-p*l*s-g*n*m+e*l*m+p*n*_-e*u*_)*I,t[10]=(o*l*s-g*r*s+g*n*h-e*l*h-o*n*_+e*r*_)*I,t[11]=(p*r*s-o*u*s-p*n*h+e*u*h+o*n*m-e*r*m)*I,t[12]=S*I,t[13]=(p*l*i-g*u*i+g*n*f-e*l*f-p*n*d+e*u*d)*I,t[14]=(g*r*i-o*l*i-g*n*c+e*l*c+o*n*d-e*r*d)*I,t[15]=(o*u*i-p*r*i+p*n*c-e*u*c-o*n*f+e*r*f)*I,this}scale(t){let e=this.elements,n=t.x,i=t.y,s=t.z;return e[0]*=n,e[4]*=i,e[8]*=s,e[1]*=n,e[5]*=i,e[9]*=s,e[2]*=n,e[6]*=i,e[10]*=s,e[3]*=n,e[7]*=i,e[11]*=s,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),i=Math.sin(e),s=1-n,o=t.x,r=t.y,c=t.z,h=s*o,p=s*r;return this.set(h*o+n,h*r-i*c,h*c+i*r,0,h*r+i*c,p*r+n,p*c-i*o,0,h*c-i*r,p*c+i*o,s*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,s,o){return this.set(1,n,s,0,t,1,o,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){let i=this.elements,s=e._x,o=e._y,r=e._z,c=e._w,h=s+s,p=o+o,u=r+r,f=s*h,m=s*p,g=s*u,l=o*p,d=o*u,_=r*u,y=c*h,b=c*p,w=c*u,S=n.x,L=n.y,I=n.z;return i[0]=(1-(l+_))*S,i[1]=(m+w)*S,i[2]=(g-b)*S,i[3]=0,i[4]=(m-w)*L,i[5]=(1-(f+_))*L,i[6]=(d+y)*L,i[7]=0,i[8]=(g+b)*I,i[9]=(d-y)*I,i[10]=(1-(f+l))*I,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){let i=this.elements,s=Bn.set(i[0],i[1],i[2]).length(),o=Bn.set(i[4],i[5],i[6]).length(),r=Bn.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),t.x=i[12],t.y=i[13],t.z=i[14],Re.copy(this);let h=1/s,p=1/o,u=1/r;return Re.elements[0]*=h,Re.elements[1]*=h,Re.elements[2]*=h,Re.elements[4]*=p,Re.elements[5]*=p,Re.elements[6]*=p,Re.elements[8]*=u,Re.elements[9]*=u,Re.elements[10]*=u,e.setFromRotationMatrix(Re),n.x=s,n.y=o,n.z=r,this}makePerspective(t,e,n,i,s,o){let r=this.elements,c=2*s/(e-t),h=2*s/(n-i),p=(e+t)/(e-t),u=(n+i)/(n-i),f=-(o+s)/(o-s),m=-2*o*s/(o-s);return r[0]=c,r[4]=0,r[8]=p,r[12]=0,r[1]=0,r[5]=h,r[9]=u,r[13]=0,r[2]=0,r[6]=0,r[10]=f,r[14]=m,r[3]=0,r[7]=0,r[11]=-1,r[15]=0,this}makeOrthographic(t,e,n,i,s,o){let r=this.elements,c=1/(e-t),h=1/(n-i),p=1/(o-s),u=(e+t)*c,f=(n+i)*h,m=(o+s)*p;return r[0]=2*c,r[4]=0,r[8]=0,r[12]=-u,r[1]=0,r[5]=2*h,r[9]=0,r[13]=-f,r[2]=0,r[6]=0,r[10]=-2*p,r[14]=-m,r[3]=0,r[7]=0,r[11]=0,r[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},Bn=new $,Re=new ee,Vl=new $(0,0,0),Wl=new $(1,1,1),rn=new $,ki=new $,_e=new $,La=new ee,Ia=new ze,An=class{constructor(t=0,e=0,n=0,i=An.DefaultOrder){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let i=t.elements,s=i[0],o=i[4],r=i[8],c=i[1],h=i[5],p=i[9],u=i[2],f=i[6],m=i[10];switch(e){case"XYZ":this._y=Math.asin(he(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(-p,m),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,h),this._z=0);break;case"YXZ":this._x=Math.asin(-he(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(r,m),this._z=Math.atan2(c,h)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(he(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,m),this._z=Math.atan2(-o,h)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-he(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,m),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-o,h));break;case"YZX":this._z=Math.asin(he(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-p,h),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(r,m));break;case"XZY":this._z=Math.asin(-he(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,h),this._y=Math.atan2(r,s)):(this._x=Math.atan2(-p,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return La.makeRotationFromQuaternion(t),this.setFromRotationMatrix(La,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Ia.setFromEuler(this),this.setFromQuaternion(Ia,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}toVector3(){console.error("THREE.Euler: .toVector3() has been removed. Use Vector3.setFromEuler() instead")}};An.DefaultOrder="XYZ";An.RotationOrders=["XYZ","YZX","ZXY","XZY","YXZ","ZYX"];var ns=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Hl=0,Da=new $,Vn=new ze,Ge=new ee,Oi=new $,mi=new $,Gl=new $,Xl=new ze,za=new $(1,0,0),ka=new $(0,1,0),Oa=new $(0,0,1),ql={type:"added"},Na={type:"removed"},ce=class extends Be{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Hl++}),this.uuid=Si(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ce.DefaultUp.clone();let t=new $,e=new An,n=new ze,i=new $(1,1,1);function s(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new ee},normalMatrix:{value:new de}}),this.matrix=new ee,this.matrixWorld=new ee,this.matrixAutoUpdate=ce.DefaultMatrixAutoUpdate,this.matrixWorldNeedsUpdate=!1,this.matrixWorldAutoUpdate=ce.DefaultMatrixWorldAutoUpdate,this.layers=new ns,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Vn.setFromAxisAngle(t,e),this.quaternion.multiply(Vn),this}rotateOnWorldAxis(t,e){return Vn.setFromAxisAngle(t,e),this.quaternion.premultiply(Vn),this}rotateX(t){return this.rotateOnAxis(za,t)}rotateY(t){return this.rotateOnAxis(ka,t)}rotateZ(t){return this.rotateOnAxis(Oa,t)}translateOnAxis(t,e){return Da.copy(t).applyQuaternion(this.quaternion),this.position.add(Da.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(za,t)}translateY(t){return this.translateOnAxis(ka,t)}translateZ(t){return this.translateOnAxis(Oa,t)}localToWorld(t){return t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return t.applyMatrix4(Ge.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Oi.copy(t):Oi.set(t,e,n);let i=this.parent;this.updateWorldMatrix(!0,!1),mi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ge.lookAt(mi,Oi,this.up):Ge.lookAt(Oi,mi,this.up),this.quaternion.setFromRotationMatrix(Ge),i&&(Ge.extractRotation(i.matrixWorld),Vn.setFromRotationMatrix(Ge),this.quaternion.premultiply(Vn.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.parent!==null&&t.parent.remove(t),t.parent=this,this.children.push(t),t.dispatchEvent(ql)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Na)),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){for(let t=0;t<this.children.length;t++){let e=this.children[t];e.parent=null,e.dispatchEvent(Na)}return this.children.length=0,this}attach(t){return this.updateWorldMatrix(!0,!1),Ge.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Ge.multiply(t.parent.matrixWorld)),t.applyMatrix4(Ge),this.add(t),t.updateWorldMatrix(!1,!0),this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(mi,t,Gl),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(mi,Xl,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,i=e.length;n<i;n++){let s=e[n];(s.matrixWorldAutoUpdate===!0||t===!0)&&s.updateMatrixWorld(t)}}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){let i=this.children;for(let s=0,o=i.length;s<o;s++){let r=i[s];r.matrixWorldAutoUpdate===!0&&r.updateWorldMatrix(!1,!0)}}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.5,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),JSON.stringify(this.userData)!=="{}"&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON()));function s(r,c){return r[c.uuid]===void 0&&(r[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(t.geometries,this.geometry);let r=this.geometry.parameters;if(r!==void 0&&r.shapes!==void 0){let c=r.shapes;if(Array.isArray(c))for(let h=0,p=c.length;h<p;h++){let u=c[h];s(t.shapes,u)}else s(t.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let r=[];for(let c=0,h=this.material.length;c<h;c++)r.push(s(t.materials,this.material[c]));i.material=r}else i.material=s(t.materials,this.material);if(this.children.length>0){i.children=[];for(let r=0;r<this.children.length;r++)i.children.push(this.children[r].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let r=0;r<this.animations.length;r++){let c=this.animations[r];i.animations.push(s(t.animations,c))}}if(e){let r=o(t.geometries),c=o(t.materials),h=o(t.textures),p=o(t.images),u=o(t.shapes),f=o(t.skeletons),m=o(t.animations),g=o(t.nodes);r.length>0&&(n.geometries=r),c.length>0&&(n.materials=c),h.length>0&&(n.textures=h),p.length>0&&(n.images=p),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),m.length>0&&(n.animations=m),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(r){let c=[];for(let h in r){let p=r[h];delete p.metadata,c.push(p)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let i=t.children[n];this.add(i.clone())}return this}};ce.DefaultUp=new $(0,1,0);ce.DefaultMatrixAutoUpdate=!0;ce.DefaultMatrixWorldAutoUpdate=!0;var Pe=new $,Xe=new $,Vs=new $,qe=new $,Wn=new $,Hn=new $,Fa=new $,Ws=new $,Hs=new $,Gs=new $,Le=class{constructor(t=new $,e=new $,n=new $){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),Pe.subVectors(t,e),i.cross(Pe);let s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(t,e,n,i,s){Pe.subVectors(i,e),Xe.subVectors(n,e),Vs.subVectors(t,e);let o=Pe.dot(Pe),r=Pe.dot(Xe),c=Pe.dot(Vs),h=Xe.dot(Xe),p=Xe.dot(Vs),u=o*h-r*r;if(u===0)return s.set(-2,-1,-1);let f=1/u,m=(h*c-r*p)*f,g=(o*p-r*c)*f;return s.set(1-m-g,g,m)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,qe),qe.x>=0&&qe.y>=0&&qe.x+qe.y<=1}static getUV(t,e,n,i,s,o,r,c){return this.getBarycoord(t,e,n,i,qe),c.set(0,0),c.addScaledVector(s,qe.x),c.addScaledVector(o,qe.y),c.addScaledVector(r,qe.z),c}static isFrontFacing(t,e,n,i){return Pe.subVectors(n,e),Xe.subVectors(t,e),Pe.cross(Xe).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Pe.subVectors(this.c,this.b),Xe.subVectors(this.a,this.b),Pe.cross(Xe).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Le.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Le.getBarycoord(t,this.a,this.b,this.c,e)}getUV(t,e,n,i,s){return Le.getUV(t,this.a,this.b,this.c,e,n,i,s)}containsPoint(t){return Le.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Le.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,i=this.b,s=this.c,o,r;Wn.subVectors(i,n),Hn.subVectors(s,n),Ws.subVectors(t,n);let c=Wn.dot(Ws),h=Hn.dot(Ws);if(c<=0&&h<=0)return e.copy(n);Hs.subVectors(t,i);let p=Wn.dot(Hs),u=Hn.dot(Hs);if(p>=0&&u<=p)return e.copy(i);let f=c*u-p*h;if(f<=0&&c>=0&&p<=0)return o=c/(c-p),e.copy(n).addScaledVector(Wn,o);Gs.subVectors(t,s);let m=Wn.dot(Gs),g=Hn.dot(Gs);if(g>=0&&m<=g)return e.copy(s);let l=m*h-c*g;if(l<=0&&h>=0&&g<=0)return r=h/(h-g),e.copy(n).addScaledVector(Hn,r);let d=p*g-m*u;if(d<=0&&u-p>=0&&m-g>=0)return Fa.subVectors(s,i),r=(u-p)/(u-p+(m-g)),e.copy(i).addScaledVector(Fa,r);let _=1/(d+l+f);return o=l*_,r=f*_,e.copy(n).addScaledVector(Wn,o).addScaledVector(Hn,r)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Zl=0,ai=class extends Be{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Zl++}),this.uuid=Si(),this.name="",this.type="Material",this.blending=Qn,this.side=ni,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.blendSrc=lo,this.blendDst=co,this.blendEquation=jn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.depthFunc=er,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Nl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Cs,this.stencilZFail=Cs,this.stencilZPass=Cs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn("THREE.Material: '"+e+"' parameter is undefined.");continue}let i=this[e];if(i===void 0){console.warn("THREE."+this.type+": '"+e+"' is not a property of this material.");continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.5,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Qn&&(n.blending=this.blending),this.side!==ni&&(n.side=this.side),this.vertexColors&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=this.transparent),n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.stencilWrite=this.stencilWrite,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaToCoverage===!0&&(n.alphaToCoverage=this.alphaToCoverage),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=this.premultipliedAlpha),this.wireframe===!0&&(n.wireframe=this.wireframe),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=this.flatShading),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),JSON.stringify(this.userData)!=="{}"&&(n.userData=this.userData);function i(s){let o=[];for(let r in s){let c=s[r];delete c.metadata,o.push(c)}return o}if(e){let s=i(t.textures),o=i(t.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let i=e.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},is=class extends ai{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Gt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=ho,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},Kt=new $,Ni=new zt,Te=class{constructor(t,e,n){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n===!0,this.usage=Aa,this.updateRange={offset:0,count:-1},this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Ni.fromBufferAttribute(this,e),Ni.applyMatrix3(t),this.setXY(e,Ni.x,Ni.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Kt.fromBufferAttribute(this,e),Kt.applyMatrix3(t),this.setXYZ(e,Kt.x,Kt.y,Kt.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Kt.fromBufferAttribute(this,e),Kt.applyMatrix4(t),this.setXYZ(e,Kt.x,Kt.y,Kt.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Kt.fromBufferAttribute(this,e),Kt.applyNormalMatrix(t),this.setXYZ(e,Kt.x,Kt.y,Kt.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Kt.fromBufferAttribute(this,e),Kt.transformDirection(t),this.setXYZ(e,Kt.x,Kt.y,Kt.z);return this}set(t,e=0){return this.array.set(t,e),this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Ei(e,this.array)),e}setX(t,e){return this.normalized&&(e=ge(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Ei(e,this.array)),e}setY(t,e){return this.normalized&&(e=ge(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Ei(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ge(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Ei(e,this.array)),e}setW(t,e){return this.normalized&&(e=ge(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=ge(e,this.array),n=ge(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=ge(e,this.array),n=ge(n,this.array),i=ge(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t*=this.itemSize,this.normalized&&(e=ge(e,this.array),n=ge(n,this.array),i=ge(i,this.array),s=ge(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Aa&&(t.usage=this.usage),(this.updateRange.offset!==0||this.updateRange.count!==-1)&&(t.updateRange=this.updateRange),t}copyColorsArray(){console.error("THREE.BufferAttribute: copyColorsArray() was removed in r144.")}copyVector2sArray(){console.error("THREE.BufferAttribute: copyVector2sArray() was removed in r144.")}copyVector3sArray(){console.error("THREE.BufferAttribute: copyVector3sArray() was removed in r144.")}copyVector4sArray(){console.error("THREE.BufferAttribute: copyVector4sArray() was removed in r144.")}};var ss=class extends Te{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var rs=class extends Te{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var Je=class extends Te{constructor(t,e,n){super(new Float32Array(t),e,n)}};var Yl=0,Me=new ee,Xs=new ce,Gn=new $,xe=new Sn,gi=new Sn,se=new $,$e=class extends Be{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Yl++}),this.uuid=Si(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(po(t)?rs:ss)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new de().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Me.makeRotationFromQuaternion(t),this.applyMatrix4(Me),this}rotateX(t){return Me.makeRotationX(t),this.applyMatrix4(Me),this}rotateY(t){return Me.makeRotationY(t),this.applyMatrix4(Me),this}rotateZ(t){return Me.makeRotationZ(t),this.applyMatrix4(Me),this}translate(t,e,n){return Me.makeTranslation(t,e,n),this.applyMatrix4(Me),this}scale(t,e,n){return Me.makeScale(t,e,n),this.applyMatrix4(Me),this}lookAt(t){return Xs.lookAt(t),Xs.updateMatrix(),this.applyMatrix4(Xs.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Gn).negate(),this.translate(Gn.x,Gn.y,Gn.z),this}setFromPoints(t){let e=[];for(let n=0,i=t.length;n<i;n++){let s=t[n];e.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new Je(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Sn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new $(-1/0,-1/0,-1/0),new $(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){let s=e[n];xe.setFromBufferAttribute(s),this.morphTargetsRelative?(se.addVectors(this.boundingBox.min,xe.min),this.boundingBox.expandByPoint(se),se.addVectors(this.boundingBox.max,xe.max),this.boundingBox.expandByPoint(se)):(this.boundingBox.expandByPoint(xe.min),this.boundingBox.expandByPoint(xe.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new bi);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new $,1/0);return}if(t){let n=this.boundingSphere.center;if(xe.setFromBufferAttribute(t),e)for(let s=0,o=e.length;s<o;s++){let r=e[s];gi.setFromBufferAttribute(r),this.morphTargetsRelative?(se.addVectors(xe.min,gi.min),xe.expandByPoint(se),se.addVectors(xe.max,gi.max),xe.expandByPoint(se)):(xe.expandByPoint(gi.min),xe.expandByPoint(gi.max))}xe.getCenter(n);let i=0;for(let s=0,o=t.count;s<o;s++)se.fromBufferAttribute(t,s),i=Math.max(i,n.distanceToSquared(se));if(e)for(let s=0,o=e.length;s<o;s++){let r=e[s],c=this.morphTargetsRelative;for(let h=0,p=r.count;h<p;h++)se.fromBufferAttribute(r,h),c&&(Gn.fromBufferAttribute(t,h),se.add(Gn)),i=Math.max(i,n.distanceToSquared(se))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.array,i=e.position.array,s=e.normal.array,o=e.uv.array,r=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Te(new Float32Array(4*r),4));let c=this.getAttribute("tangent").array,h=[],p=[];for(let T=0;T<r;T++)h[T]=new $,p[T]=new $;let u=new $,f=new $,m=new $,g=new zt,l=new zt,d=new zt,_=new $,y=new $;function b(T,N,v){u.fromArray(i,T*3),f.fromArray(i,N*3),m.fromArray(i,v*3),g.fromArray(o,T*2),l.fromArray(o,N*2),d.fromArray(o,v*2),f.sub(u),m.sub(u),l.sub(g),d.sub(g);let O=1/(l.x*d.y-d.x*l.y);!isFinite(O)||(_.copy(f).multiplyScalar(d.y).addScaledVector(m,-l.y).multiplyScalar(O),y.copy(m).multiplyScalar(l.x).addScaledVector(f,-d.x).multiplyScalar(O),h[T].add(_),h[N].add(_),h[v].add(_),p[T].add(y),p[N].add(y),p[v].add(y))}let w=this.groups;w.length===0&&(w=[{start:0,count:n.length}]);for(let T=0,N=w.length;T<N;++T){let v=w[T],O=v.start,B=v.count;for(let U=O,nt=O+B;U<nt;U+=3)b(n[U+0],n[U+1],n[U+2])}let S=new $,L=new $,I=new $,A=new $;function z(T){I.fromArray(s,T*3),A.copy(I);let N=h[T];S.copy(N),S.sub(I.multiplyScalar(I.dot(N))).normalize(),L.crossVectors(A,N);let O=L.dot(p[T])<0?-1:1;c[T*4]=S.x,c[T*4+1]=S.y,c[T*4+2]=S.z,c[T*4+3]=O}for(let T=0,N=w.length;T<N;++T){let v=w[T],O=v.start,B=v.count;for(let U=O,nt=O+B;U<nt;U+=3)z(n[U+0]),z(n[U+1]),z(n[U+2])}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Te(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,m=n.count;f<m;f++)n.setXYZ(f,0,0,0);let i=new $,s=new $,o=new $,r=new $,c=new $,h=new $,p=new $,u=new $;if(t)for(let f=0,m=t.count;f<m;f+=3){let g=t.getX(f+0),l=t.getX(f+1),d=t.getX(f+2);i.fromBufferAttribute(e,g),s.fromBufferAttribute(e,l),o.fromBufferAttribute(e,d),p.subVectors(o,s),u.subVectors(i,s),p.cross(u),r.fromBufferAttribute(n,g),c.fromBufferAttribute(n,l),h.fromBufferAttribute(n,d),r.add(p),c.add(p),h.add(p),n.setXYZ(g,r.x,r.y,r.z),n.setXYZ(l,c.x,c.y,c.z),n.setXYZ(d,h.x,h.y,h.z)}else for(let f=0,m=e.count;f<m;f+=3)i.fromBufferAttribute(e,f+0),s.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),p.subVectors(o,s),u.subVectors(i,s),p.cross(u),n.setXYZ(f+0,p.x,p.y,p.z),n.setXYZ(f+1,p.x,p.y,p.z),n.setXYZ(f+2,p.x,p.y,p.z);this.normalizeNormals(),n.needsUpdate=!0}}merge(){return console.error("THREE.BufferGeometry.merge() has been removed. Use THREE.BufferGeometryUtils.mergeBufferGeometries() instead."),this}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)se.fromBufferAttribute(t,e),se.normalize(),t.setXYZ(e,se.x,se.y,se.z)}toNonIndexed(){function t(r,c){let h=r.array,p=r.itemSize,u=r.normalized,f=new h.constructor(c.length*p),m=0,g=0;for(let l=0,d=c.length;l<d;l++){r.isInterleavedBufferAttribute?m=c[l]*r.data.stride+r.offset:m=c[l]*p;for(let _=0;_<p;_++)f[g++]=h[m++]}return new Te(f,p,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new $e,n=this.index.array,i=this.attributes;for(let r in i){let c=i[r],h=t(c,n);e.setAttribute(r,h)}let s=this.morphAttributes;for(let r in s){let c=[],h=s[r];for(let p=0,u=h.length;p<u;p++){let f=h[p],m=t(f,n);c.push(m)}e.morphAttributes[r]=c}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let r=0,c=o.length;r<c;r++){let h=o[r];e.addGroup(h.start,h.count,h.materialIndex)}return e}toJSON(){let t={metadata:{version:4.5,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let h in c)c[h]!==void 0&&(t[h]=c[h]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let c in n){let h=n[c];t.data.attributes[c]=h.toJSON(t.data)}let i={},s=!1;for(let c in this.morphAttributes){let h=this.morphAttributes[c],p=[];for(let u=0,f=h.length;u<f;u++){let m=h[u];p.push(m.toJSON(t.data))}p.length>0&&(i[c]=p,s=!0)}s&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let r=this.boundingSphere;return r!==null&&(t.data.boundingSphere={center:r.center.toArray(),radius:r.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone(e));let i=t.attributes;for(let h in i){let p=i[h];this.setAttribute(h,p.clone(e))}let s=t.morphAttributes;for(let h in s){let p=[],u=s[h];for(let f=0,m=u.length;f<m;f++)p.push(u[f].clone(e));this.morphAttributes[h]=p}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let h=0,p=o.length;h<p;h++){let u=o[h];this.addGroup(u.start,u.count,u.materialIndex)}let r=t.boundingBox;r!==null&&(this.boundingBox=r.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,t.parameters!==void 0&&(this.parameters=Object.assign({},t.parameters)),this}dispose(){this.dispatchEvent({type:"dispose"})}},Ua=new ee,Xn=new cr,qs=new bi,an=new $,on=new $,ln=new $,Zs=new $,Ys=new $,Js=new $,Fi=new $,Ui=new $,Bi=new $,Vi=new zt,Wi=new zt,Hi=new zt,js=new $,Gi=new $,fe=class extends ce{constructor(t=new $e,e=new is){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){let r=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[r]=s}}}}raycast(t,e){let n=this.geometry,i=this.material,s=this.matrixWorld;if(i===void 0||(n.boundingSphere===null&&n.computeBoundingSphere(),qs.copy(n.boundingSphere),qs.applyMatrix4(s),t.ray.intersectsSphere(qs)===!1)||(Ua.copy(s).invert(),Xn.copy(t.ray).applyMatrix4(Ua),n.boundingBox!==null&&Xn.intersectsBox(n.boundingBox)===!1))return;let o,r=n.index,c=n.attributes.position,h=n.morphAttributes.position,p=n.morphTargetsRelative,u=n.attributes.uv,f=n.attributes.uv2,m=n.groups,g=n.drawRange;if(r!==null)if(Array.isArray(i))for(let l=0,d=m.length;l<d;l++){let _=m[l],y=i[_.materialIndex],b=Math.max(_.start,g.start),w=Math.min(r.count,Math.min(_.start+_.count,g.start+g.count));for(let S=b,L=w;S<L;S+=3){let I=r.getX(S),A=r.getX(S+1),z=r.getX(S+2);o=Xi(this,y,t,Xn,c,h,p,u,f,I,A,z),o&&(o.faceIndex=Math.floor(S/3),o.face.materialIndex=_.materialIndex,e.push(o))}}else{let l=Math.max(0,g.start),d=Math.min(r.count,g.start+g.count);for(let _=l,y=d;_<y;_+=3){let b=r.getX(_),w=r.getX(_+1),S=r.getX(_+2);o=Xi(this,i,t,Xn,c,h,p,u,f,b,w,S),o&&(o.faceIndex=Math.floor(_/3),e.push(o))}}else if(c!==void 0)if(Array.isArray(i))for(let l=0,d=m.length;l<d;l++){let _=m[l],y=i[_.materialIndex],b=Math.max(_.start,g.start),w=Math.min(c.count,Math.min(_.start+_.count,g.start+g.count));for(let S=b,L=w;S<L;S+=3){let I=S,A=S+1,z=S+2;o=Xi(this,y,t,Xn,c,h,p,u,f,I,A,z),o&&(o.faceIndex=Math.floor(S/3),o.face.materialIndex=_.materialIndex,e.push(o))}}else{let l=Math.max(0,g.start),d=Math.min(c.count,g.start+g.count);for(let _=l,y=d;_<y;_+=3){let b=_,w=_+1,S=_+2;o=Xi(this,i,t,Xn,c,h,p,u,f,b,w,S),o&&(o.faceIndex=Math.floor(_/3),e.push(o))}}}};function Jl(a,t,e,n,i,s,o,r){let c;if(t.side===Ae?c=n.intersectTriangle(o,s,i,!0,r):c=n.intersectTriangle(i,s,o,t.side!==Fe,r),c===null)return null;Gi.copy(r),Gi.applyMatrix4(a.matrixWorld);let h=e.ray.origin.distanceTo(Gi);return h<e.near||h>e.far?null:{distance:h,point:Gi.clone(),object:a}}function Xi(a,t,e,n,i,s,o,r,c,h,p,u){an.fromBufferAttribute(i,h),on.fromBufferAttribute(i,p),ln.fromBufferAttribute(i,u);let f=a.morphTargetInfluences;if(s&&f){Fi.set(0,0,0),Ui.set(0,0,0),Bi.set(0,0,0);for(let g=0,l=s.length;g<l;g++){let d=f[g],_=s[g];d!==0&&(Zs.fromBufferAttribute(_,h),Ys.fromBufferAttribute(_,p),Js.fromBufferAttribute(_,u),o?(Fi.addScaledVector(Zs,d),Ui.addScaledVector(Ys,d),Bi.addScaledVector(Js,d)):(Fi.addScaledVector(Zs.sub(an),d),Ui.addScaledVector(Ys.sub(on),d),Bi.addScaledVector(Js.sub(ln),d)))}an.add(Fi),on.add(Ui),ln.add(Bi)}a.isSkinnedMesh&&(a.boneTransform(h,an),a.boneTransform(p,on),a.boneTransform(u,ln));let m=Jl(a,t,e,n,an,on,ln,js);if(m){r&&(Vi.fromBufferAttribute(r,h),Wi.fromBufferAttribute(r,p),Hi.fromBufferAttribute(r,u),m.uv=Le.getUV(js,an,on,ln,Vi,Wi,Hi,new zt)),c&&(Vi.fromBufferAttribute(c,h),Wi.fromBufferAttribute(c,p),Hi.fromBufferAttribute(c,u),m.uv2=Le.getUV(js,an,on,ln,Vi,Wi,Hi,new zt));let g={a:h,b:p,c:u,normal:new $,materialIndex:0};Le.getNormal(an,on,ln,g.normal),m.face=g}return m}var Ke=class extends $e{constructor(t=1,e=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};let r=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);let c=[],h=[],p=[],u=[],f=0,m=0;g("z","y","x",-1,-1,n,e,t,o,s,0),g("z","y","x",1,-1,n,e,-t,o,s,1),g("x","z","y",1,1,t,n,e,i,o,2),g("x","z","y",1,-1,t,n,-e,i,o,3),g("x","y","z",1,-1,t,e,n,i,s,4),g("x","y","z",-1,-1,t,e,-n,i,s,5),this.setIndex(c),this.setAttribute("position",new Je(h,3)),this.setAttribute("normal",new Je(p,3)),this.setAttribute("uv",new Je(u,2));function g(l,d,_,y,b,w,S,L,I,A,z){let T=w/I,N=S/A,v=w/2,O=S/2,B=L/2,U=I+1,nt=A+1,G=0,J=0,C=new $;for(let R=0;R<nt;R++){let it=R*N-O;for(let Z=0;Z<U;Z++){let K=Z*T-v;C[l]=K*y,C[d]=it*b,C[_]=B,h.push(C.x,C.y,C.z),C[l]=0,C[d]=0,C[_]=L>0?1:-1,p.push(C.x,C.y,C.z),u.push(Z/I),u.push(1-R/A),G+=1}}for(let R=0;R<A;R++)for(let it=0;it<I;it++){let Z=f+it+U*R,K=f+it+U*(R+1),ft=f+(it+1)+U*(R+1),At=f+(it+1)+U*R;c.push(Z,K,At),c.push(K,ft,At),J+=6}r.addGroup(m,J,z),m+=J,f+=G}}static fromJSON(t){return new Ke(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function oi(a){let t={};for(let e in a){t[e]={};for(let n in a[e]){let i=a[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function ae(a){let t={};for(let e=0;e<a.length;e++){let n=oi(a[e]);for(let i in n)t[i]=n[i]}return t}function jl(a){let t=[];for(let e=0;e<a.length;e++)t.push(a[e].clone());return t}var $l={clone:oi,merge:ae},Kl=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ql=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,ye=class extends ai{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Kl,this.fragmentShader=Ql,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv2:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=oi(t.uniforms),this.uniformsGroups=jl(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let i in this.uniforms){let o=this.uniforms[i].value;o&&o.isTexture?e.uniforms[i]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[i]={type:"m4",value:o.toArray()}:e.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},li=class extends ce{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ee,this.projectionMatrix=new ee,this.projectionMatrixInverse=new ee}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(-e[8],-e[9],-e[10]).normalize()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},le=class extends li{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Ea*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Rs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ea*2*Math.atan(Math.tan(Rs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(t,e,n,i,s,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Rs*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,s=-.5*i,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,h=o.fullHeight;s+=o.offsetX*i/c,e-=o.offsetY*n/h,i*=o.width/c,n*=o.height/h}let r=this.filmOffset;r!==0&&(s+=t*r/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,e,e-n,t,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},qn=90,Zn=1,hr=class extends ce{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n;let i=new le(qn,Zn,t,e);i.layers=this.layers,i.up.set(0,-1,0),i.lookAt(new $(1,0,0)),this.add(i);let s=new le(qn,Zn,t,e);s.layers=this.layers,s.up.set(0,-1,0),s.lookAt(new $(-1,0,0)),this.add(s);let o=new le(qn,Zn,t,e);o.layers=this.layers,o.up.set(0,0,1),o.lookAt(new $(0,1,0)),this.add(o);let r=new le(qn,Zn,t,e);r.layers=this.layers,r.up.set(0,0,-1),r.lookAt(new $(0,-1,0)),this.add(r);let c=new le(qn,Zn,t,e);c.layers=this.layers,c.up.set(0,-1,0),c.lookAt(new $(0,0,1)),this.add(c);let h=new le(qn,Zn,t,e);h.layers=this.layers,h.up.set(0,-1,0),h.lookAt(new $(0,0,-1)),this.add(h)}update(t,e){this.parent===null&&this.updateMatrixWorld();let n=this.renderTarget,[i,s,o,r,c,h]=this.children,p=t.getRenderTarget(),u=t.toneMapping,f=t.xr.enabled;t.toneMapping=Ie,t.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0),t.render(e,i),t.setRenderTarget(n,1),t.render(e,s),t.setRenderTarget(n,2),t.render(e,o),t.setRenderTarget(n,3),t.render(e,r),t.setRenderTarget(n,4),t.render(e,c),n.texture.generateMipmaps=m,t.setRenderTarget(n,5),t.render(e,h),t.setRenderTarget(p),t.toneMapping=u,t.xr.enabled=f,n.texture.needsPMREMUpdate=!0}},as=class extends pe{constructor(t,e,n,i,s,o,r,c,h,p){t=t!==void 0?t:[],e=e!==void 0?e:ii,super(t,e,n,i,s,o,r,c,h,p),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},ur=class extends De{constructor(t,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new as(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.encoding),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Se}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.encoding=e.encoding,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Ke(5,5,5),s=new ye({name:"CubemapFromEquirect",uniforms:oi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ae,blending:hn});s.uniforms.tEquirect.value=e;let o=new fe(i,s),r=e.minFilter;return e.minFilter===hs&&(e.minFilter=Se),new hr(1,10,this).update(t,o),e.minFilter=r,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,i){let s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,i);t.setRenderTarget(s)}},$s=new $,tc=new $,ec=new de,Ye=class{constructor(t=new $(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let i=$s.subVectors(n,e).cross(tc.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(this.normal).multiplyScalar(-this.distanceToPoint(t)).add(t)}intersectLine(t,e){let n=t.delta($s),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let s=-(t.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:e.copy(n).multiplyScalar(s).add(t.start)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||ec.getNormalMatrix(t),i=this.coplanarPoint($s).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},Yn=new bi,qi=new $,os=class{constructor(t=new Ye,e=new Ye,n=new Ye,i=new Ye,s=new Ye,o=new Ye){this.planes=[t,e,n,i,s,o]}set(t,e,n,i,s,o){let r=this.planes;return r[0].copy(t),r[1].copy(e),r[2].copy(n),r[3].copy(i),r[4].copy(s),r[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t){let e=this.planes,n=t.elements,i=n[0],s=n[1],o=n[2],r=n[3],c=n[4],h=n[5],p=n[6],u=n[7],f=n[8],m=n[9],g=n[10],l=n[11],d=n[12],_=n[13],y=n[14],b=n[15];return e[0].setComponents(r-i,u-c,l-f,b-d).normalize(),e[1].setComponents(r+i,u+c,l+f,b+d).normalize(),e[2].setComponents(r+s,u+h,l+m,b+_).normalize(),e[3].setComponents(r-s,u-h,l-m,b-_).normalize(),e[4].setComponents(r-o,u-p,l-g,b-y).normalize(),e[5].setComponents(r+o,u+p,l+g,b+y).normalize(),this}intersectsObject(t){let e=t.geometry;return e.boundingSphere===null&&e.computeBoundingSphere(),Yn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld),this.intersectsSphere(Yn)}intersectsSprite(t){return Yn.center.set(0,0,0),Yn.radius=.7071067811865476,Yn.applyMatrix4(t.matrixWorld),this.intersectsSphere(Yn)}intersectsSphere(t){let e=this.planes,n=t.center,i=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let i=e[n];if(qi.x=i.normal.x>0?t.max.x:t.min.x,qi.y=i.normal.y>0?t.max.y:t.min.y,qi.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(qi)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function go(){let a=null,t=!1,e=null,n=null;function i(s,o){e(s,o),n=a.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=a.requestAnimationFrame(i),t=!0)},stop:function(){a.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){a=s}}}function nc(a,t){let e=t.isWebGL2,n=new WeakMap;function i(h,p){let u=h.array,f=h.usage,m=a.createBuffer();a.bindBuffer(p,m),a.bufferData(p,u,f),h.onUploadCallback();let g;if(u instanceof Float32Array)g=5126;else if(u instanceof Uint16Array)if(h.isFloat16BufferAttribute)if(e)g=5131;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else g=5123;else if(u instanceof Int16Array)g=5122;else if(u instanceof Uint32Array)g=5125;else if(u instanceof Int32Array)g=5124;else if(u instanceof Int8Array)g=5120;else if(u instanceof Uint8Array)g=5121;else if(u instanceof Uint8ClampedArray)g=5121;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:m,type:g,bytesPerElement:u.BYTES_PER_ELEMENT,version:h.version}}function s(h,p,u){let f=p.array,m=p.updateRange;a.bindBuffer(u,h),m.count===-1?a.bufferSubData(u,0,f):(e?a.bufferSubData(u,m.offset*f.BYTES_PER_ELEMENT,f,m.offset,m.count):a.bufferSubData(u,m.offset*f.BYTES_PER_ELEMENT,f.subarray(m.offset,m.offset+m.count)),m.count=-1)}function o(h){return h.isInterleavedBufferAttribute&&(h=h.data),n.get(h)}function r(h){h.isInterleavedBufferAttribute&&(h=h.data);let p=n.get(h);p&&(a.deleteBuffer(p.buffer),n.delete(h))}function c(h,p){if(h.isGLBufferAttribute){let f=n.get(h);(!f||f.version<h.version)&&n.set(h,{buffer:h.buffer,type:h.type,bytesPerElement:h.elementSize,version:h.version});return}h.isInterleavedBufferAttribute&&(h=h.data);let u=n.get(h);u===void 0?n.set(h,i(h,p)):u.version<h.version&&(s(u.buffer,h,p),u.version=h.version)}return{get:o,remove:r,update:c}}var Tn=class extends $e{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};let s=t/2,o=e/2,r=Math.floor(n),c=Math.floor(i),h=r+1,p=c+1,u=t/r,f=e/c,m=[],g=[],l=[],d=[];for(let _=0;_<p;_++){let y=_*f-o;for(let b=0;b<h;b++){let w=b*u-s;g.push(w,-y,0),l.push(0,0,1),d.push(b/r),d.push(1-_/c)}}for(let _=0;_<c;_++)for(let y=0;y<r;y++){let b=y+h*_,w=y+h*(_+1),S=y+1+h*(_+1),L=y+1+h*_;m.push(b,w,L),m.push(w,S,L)}this.setIndex(m),this.setAttribute("position",new Je(g,3)),this.setAttribute("normal",new Je(l,3)),this.setAttribute("uv",new Je(d,2))}static fromJSON(t){return new Tn(t.width,t.height,t.widthSegments,t.heightSegments)}},ic=`#ifdef USE_ALPHAMAP
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
#endif`,Ac=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Tc=`#ifdef USE_DISPLACEMENTMAP
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
#endif`,Ah=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Th=`#ifdef OPAQUE
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
}`,Au=`#define TOON
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
}`,Tu=`#define TOON
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
}`,Ot={alphamap_fragment:ic,alphamap_pars_fragment:sc,alphatest_fragment:rc,alphatest_pars_fragment:ac,aomap_fragment:oc,aomap_pars_fragment:lc,begin_vertex:cc,beginnormal_vertex:hc,bsdfs:uc,iridescence_fragment:dc,bumpmap_pars_fragment:fc,clipping_planes_fragment:pc,clipping_planes_pars_fragment:mc,clipping_planes_pars_vertex:gc,clipping_planes_vertex:_c,color_fragment:xc,color_pars_fragment:vc,color_pars_vertex:yc,color_vertex:bc,common:wc,cube_uv_reflection_fragment:Mc,defaultnormal_vertex:Sc,displacementmap_pars_vertex:Ac,displacementmap_vertex:Tc,emissivemap_fragment:Ec,emissivemap_pars_fragment:Cc,encodings_fragment:Rc,encodings_pars_fragment:Pc,envmap_fragment:Lc,envmap_common_pars_fragment:Ic,envmap_pars_fragment:Dc,envmap_pars_vertex:zc,envmap_physical_pars_fragment:qc,envmap_vertex:kc,fog_vertex:Oc,fog_pars_vertex:Nc,fog_fragment:Fc,fog_pars_fragment:Uc,gradientmap_pars_fragment:Bc,lightmap_fragment:Vc,lightmap_pars_fragment:Wc,lights_lambert_fragment:Hc,lights_lambert_pars_fragment:Gc,lights_pars_begin:Xc,lights_toon_fragment:Zc,lights_toon_pars_fragment:Yc,lights_phong_fragment:Jc,lights_phong_pars_fragment:jc,lights_physical_fragment:$c,lights_physical_pars_fragment:Kc,lights_fragment_begin:Qc,lights_fragment_maps:th,lights_fragment_end:eh,logdepthbuf_fragment:nh,logdepthbuf_pars_fragment:ih,logdepthbuf_pars_vertex:sh,logdepthbuf_vertex:rh,map_fragment:ah,map_pars_fragment:oh,map_particle_fragment:lh,map_particle_pars_fragment:ch,metalnessmap_fragment:hh,metalnessmap_pars_fragment:uh,morphcolor_vertex:dh,morphnormal_vertex:fh,morphtarget_pars_vertex:ph,morphtarget_vertex:mh,normal_fragment_begin:gh,normal_fragment_maps:_h,normal_pars_fragment:xh,normal_pars_vertex:vh,normal_vertex:yh,normalmap_pars_fragment:bh,clearcoat_normal_fragment_begin:wh,clearcoat_normal_fragment_maps:Mh,clearcoat_pars_fragment:Sh,iridescence_pars_fragment:Ah,output_fragment:Th,packing:Eh,premultiplied_alpha_fragment:Ch,project_vertex:Rh,dithering_fragment:Ph,dithering_pars_fragment:Lh,roughnessmap_fragment:Ih,roughnessmap_pars_fragment:Dh,shadowmap_pars_fragment:zh,shadowmap_pars_vertex:kh,shadowmap_vertex:Oh,shadowmask_pars_fragment:Nh,skinbase_vertex:Fh,skinning_pars_vertex:Uh,skinning_vertex:Bh,skinnormal_vertex:Vh,specularmap_fragment:Wh,specularmap_pars_fragment:Hh,tonemapping_fragment:Gh,tonemapping_pars_fragment:Xh,transmission_fragment:qh,transmission_pars_fragment:Zh,uv_pars_fragment:Yh,uv_pars_vertex:Jh,uv_vertex:jh,uv2_pars_fragment:$h,uv2_pars_vertex:Kh,uv2_vertex:Qh,worldpos_vertex:tu,background_vert:eu,background_frag:nu,cube_vert:iu,cube_frag:su,depth_vert:ru,depth_frag:au,distanceRGBA_vert:ou,distanceRGBA_frag:lu,equirect_vert:cu,equirect_frag:hu,linedashed_vert:uu,linedashed_frag:du,meshbasic_vert:fu,meshbasic_frag:pu,meshlambert_vert:mu,meshlambert_frag:gu,meshmatcap_vert:_u,meshmatcap_frag:xu,meshnormal_vert:vu,meshnormal_frag:yu,meshphong_vert:bu,meshphong_frag:wu,meshphysical_vert:Mu,meshphysical_frag:Su,meshtoon_vert:Au,meshtoon_frag:Tu,points_vert:Eu,points_frag:Cu,shadow_vert:Ru,shadow_frag:Pu,sprite_vert:Lu,sprite_frag:Iu},_t={common:{diffuse:{value:new Gt(16777215)},opacity:{value:1},map:{value:null},uvTransform:{value:new de},uv2Transform:{value:new de},alphaMap:{value:null},alphaTest:{value:0}},specularmap:{specularMap:{value:null}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1}},emissivemap:{emissiveMap:{value:null}},bumpmap:{bumpMap:{value:null},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalScale:{value:new zt(1,1)}},displacementmap:{displacementMap:{value:null},displacementScale:{value:1},displacementBias:{value:0}},roughnessmap:{roughnessMap:{value:null}},metalnessmap:{metalnessMap:{value:null}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Gt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Gt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaTest:{value:0},uvTransform:{value:new de}},sprite:{diffuse:{value:new Gt(16777215)},opacity:{value:1},center:{value:new zt(.5,.5)},rotation:{value:0},map:{value:null},alphaMap:{value:null},alphaTest:{value:0},uvTransform:{value:new de}}},Ne={basic:{uniforms:ae([_t.common,_t.specularmap,_t.envmap,_t.aomap,_t.lightmap,_t.fog]),vertexShader:Ot.meshbasic_vert,fragmentShader:Ot.meshbasic_frag},lambert:{uniforms:ae([_t.common,_t.specularmap,_t.envmap,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.fog,_t.lights,{emissive:{value:new Gt(0)}}]),vertexShader:Ot.meshlambert_vert,fragmentShader:Ot.meshlambert_frag},phong:{uniforms:ae([_t.common,_t.specularmap,_t.envmap,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.fog,_t.lights,{emissive:{value:new Gt(0)},specular:{value:new Gt(1118481)},shininess:{value:30}}]),vertexShader:Ot.meshphong_vert,fragmentShader:Ot.meshphong_frag},standard:{uniforms:ae([_t.common,_t.envmap,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.roughnessmap,_t.metalnessmap,_t.fog,_t.lights,{emissive:{value:new Gt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ot.meshphysical_vert,fragmentShader:Ot.meshphysical_frag},toon:{uniforms:ae([_t.common,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.gradientmap,_t.fog,_t.lights,{emissive:{value:new Gt(0)}}]),vertexShader:Ot.meshtoon_vert,fragmentShader:Ot.meshtoon_frag},matcap:{uniforms:ae([_t.common,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.fog,{matcap:{value:null}}]),vertexShader:Ot.meshmatcap_vert,fragmentShader:Ot.meshmatcap_frag},points:{uniforms:ae([_t.points,_t.fog]),vertexShader:Ot.points_vert,fragmentShader:Ot.points_frag},dashed:{uniforms:ae([_t.common,_t.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ot.linedashed_vert,fragmentShader:Ot.linedashed_frag},depth:{uniforms:ae([_t.common,_t.displacementmap]),vertexShader:Ot.depth_vert,fragmentShader:Ot.depth_frag},normal:{uniforms:ae([_t.common,_t.bumpmap,_t.normalmap,_t.displacementmap,{opacity:{value:1}}]),vertexShader:Ot.meshnormal_vert,fragmentShader:Ot.meshnormal_frag},sprite:{uniforms:ae([_t.sprite,_t.fog]),vertexShader:Ot.sprite_vert,fragmentShader:Ot.sprite_frag},background:{uniforms:{uvTransform:{value:new de},t2D:{value:null}},vertexShader:Ot.background_vert,fragmentShader:Ot.background_frag},cube:{uniforms:ae([_t.envmap,{opacity:{value:1}}]),vertexShader:Ot.cube_vert,fragmentShader:Ot.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ot.equirect_vert,fragmentShader:Ot.equirect_frag},distanceRGBA:{uniforms:ae([_t.common,_t.displacementmap,{referencePosition:{value:new $},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ot.distanceRGBA_vert,fragmentShader:Ot.distanceRGBA_frag},shadow:{uniforms:ae([_t.lights,_t.fog,{color:{value:new Gt(0)},opacity:{value:1}}]),vertexShader:Ot.shadow_vert,fragmentShader:Ot.shadow_frag}};Ne.physical={uniforms:ae([Ne.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatNormalScale:{value:new zt(1,1)},clearcoatNormalMap:{value:null},iridescence:{value:0},iridescenceMap:{value:null},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},sheen:{value:0},sheenColor:{value:new Gt(0)},sheenColorMap:{value:null},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},transmission:{value:0},transmissionMap:{value:null},transmissionSamplerSize:{value:new zt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},attenuationDistance:{value:0},attenuationColor:{value:new Gt(0)},specularIntensity:{value:1},specularIntensityMap:{value:null},specularColor:{value:new Gt(1,1,1)},specularColorMap:{value:null}}]),vertexShader:Ot.meshphysical_vert,fragmentShader:Ot.meshphysical_frag};function Du(a,t,e,n,i,s){let o=new Gt(0),r=i===!0?0:1,c,h,p=null,u=0,f=null;function m(l,d){let _=!1,y=d.isScene===!0?d.background:null;y&&y.isTexture&&(y=t.get(y));let b=a.xr,w=b.getSession&&b.getSession();w&&w.environmentBlendMode==="additive"&&(y=null),y===null?g(o,r):y&&y.isColor&&(g(y,1),_=!0),(a.autoClear||_)&&a.clear(a.autoClearColor,a.autoClearDepth,a.autoClearStencil),y&&(y.isCubeTexture||y.mapping===cs)?(h===void 0&&(h=new fe(new Ke(1,1,1),new ye({name:"BackgroundCubeMaterial",uniforms:oi(Ne.cube.uniforms),vertexShader:Ne.cube.vertexShader,fragmentShader:Ne.cube.fragmentShader,side:Ae,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(S,L,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(h)),h.material.uniforms.envMap.value=y,h.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,(p!==y||u!==y.version||f!==a.toneMapping)&&(h.material.needsUpdate=!0,p=y,u=y.version,f=a.toneMapping),h.layers.enableAll(),l.unshift(h,h.geometry,h.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new fe(new Tn(2,2),new ye({name:"BackgroundMaterial",uniforms:oi(Ne.background.uniforms),vertexShader:Ne.background.vertexShader,fragmentShader:Ne.background.fragmentShader,side:ni,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=y,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(p!==y||u!==y.version||f!==a.toneMapping)&&(c.material.needsUpdate=!0,p=y,u=y.version,f=a.toneMapping),c.layers.enableAll(),l.unshift(c,c.geometry,c.material,0,0,null))}function g(l,d){e.buffers.color.setClear(l.r,l.g,l.b,d,s)}return{getClearColor:function(){return o},setClearColor:function(l,d=1){o.set(l),r=d,g(o,r)},getClearAlpha:function(){return r},setClearAlpha:function(l){r=l,g(o,r)},render:m}}function zu(a,t,e,n){let i=a.getParameter(34921),s=n.isWebGL2?null:t.get("OES_vertex_array_object"),o=n.isWebGL2||s!==null,r={},c=d(null),h=c,p=!1;function u(B,U,nt,G,J){let C=!1;if(o){let R=l(G,nt,U);h!==R&&(h=R,m(h.object)),C=_(B,G,nt,J),C&&y(B,G,nt,J)}else{let R=U.wireframe===!0;(h.geometry!==G.id||h.program!==nt.id||h.wireframe!==R)&&(h.geometry=G.id,h.program=nt.id,h.wireframe=R,C=!0)}J!==null&&e.update(J,34963),(C||p)&&(p=!1,A(B,U,nt,G),J!==null&&a.bindBuffer(34963,e.get(J).buffer))}function f(){return n.isWebGL2?a.createVertexArray():s.createVertexArrayOES()}function m(B){return n.isWebGL2?a.bindVertexArray(B):s.bindVertexArrayOES(B)}function g(B){return n.isWebGL2?a.deleteVertexArray(B):s.deleteVertexArrayOES(B)}function l(B,U,nt){let G=nt.wireframe===!0,J=r[B.id];J===void 0&&(J={},r[B.id]=J);let C=J[U.id];C===void 0&&(C={},J[U.id]=C);let R=C[G];return R===void 0&&(R=d(f()),C[G]=R),R}function d(B){let U=[],nt=[],G=[];for(let J=0;J<i;J++)U[J]=0,nt[J]=0,G[J]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:nt,attributeDivisors:G,object:B,attributes:{},index:null}}function _(B,U,nt,G){let J=h.attributes,C=U.attributes,R=0,it=nt.getAttributes();for(let Z in it)if(it[Z].location>=0){let ft=J[Z],At=C[Z];if(At===void 0&&(Z==="instanceMatrix"&&B.instanceMatrix&&(At=B.instanceMatrix),Z==="instanceColor"&&B.instanceColor&&(At=B.instanceColor)),ft===void 0||ft.attribute!==At||At&&ft.data!==At.data)return!0;R++}return h.attributesNum!==R||h.index!==G}function y(B,U,nt,G){let J={},C=U.attributes,R=0,it=nt.getAttributes();for(let Z in it)if(it[Z].location>=0){let ft=C[Z];ft===void 0&&(Z==="instanceMatrix"&&B.instanceMatrix&&(ft=B.instanceMatrix),Z==="instanceColor"&&B.instanceColor&&(ft=B.instanceColor));let At={};At.attribute=ft,ft&&ft.data&&(At.data=ft.data),J[Z]=At,R++}h.attributes=J,h.attributesNum=R,h.index=G}function b(){let B=h.newAttributes;for(let U=0,nt=B.length;U<nt;U++)B[U]=0}function w(B){S(B,0)}function S(B,U){let nt=h.newAttributes,G=h.enabledAttributes,J=h.attributeDivisors;nt[B]=1,G[B]===0&&(a.enableVertexAttribArray(B),G[B]=1),J[B]!==U&&((n.isWebGL2?a:t.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](B,U),J[B]=U)}function L(){let B=h.newAttributes,U=h.enabledAttributes;for(let nt=0,G=U.length;nt<G;nt++)U[nt]!==B[nt]&&(a.disableVertexAttribArray(nt),U[nt]=0)}function I(B,U,nt,G,J,C){n.isWebGL2===!0&&(nt===5124||nt===5125)?a.vertexAttribIPointer(B,U,nt,J,C):a.vertexAttribPointer(B,U,nt,G,J,C)}function A(B,U,nt,G){if(n.isWebGL2===!1&&(B.isInstancedMesh||G.isInstancedBufferGeometry)&&t.get("ANGLE_instanced_arrays")===null)return;b();let J=G.attributes,C=nt.getAttributes(),R=U.defaultAttributeValues;for(let it in C){let Z=C[it];if(Z.location>=0){let K=J[it];if(K===void 0&&(it==="instanceMatrix"&&B.instanceMatrix&&(K=B.instanceMatrix),it==="instanceColor"&&B.instanceColor&&(K=B.instanceColor)),K!==void 0){let ft=K.normalized,At=K.itemSize,et=e.get(K);if(et===void 0)continue;let Tt=et.buffer,Mt=et.type,bt=et.bytesPerElement;if(K.isInterleavedBufferAttribute){let xt=K.data,Dt=xt.stride,x=K.offset;if(xt.isInstancedInterleavedBuffer){for(let X=0;X<Z.locationSize;X++)S(Z.location+X,xt.meshPerAttribute);B.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=xt.meshPerAttribute*xt.count)}else for(let X=0;X<Z.locationSize;X++)w(Z.location+X);a.bindBuffer(34962,Tt);for(let X=0;X<Z.locationSize;X++)I(Z.location+X,At/Z.locationSize,Mt,ft,Dt*bt,(x+At/Z.locationSize*X)*bt)}else{if(K.isInstancedBufferAttribute){for(let xt=0;xt<Z.locationSize;xt++)S(Z.location+xt,K.meshPerAttribute);B.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let xt=0;xt<Z.locationSize;xt++)w(Z.location+xt);a.bindBuffer(34962,Tt);for(let xt=0;xt<Z.locationSize;xt++)I(Z.location+xt,At/Z.locationSize,Mt,ft,At*bt,At/Z.locationSize*xt*bt)}}else if(R!==void 0){let ft=R[it];if(ft!==void 0)switch(ft.length){case 2:a.vertexAttrib2fv(Z.location,ft);break;case 3:a.vertexAttrib3fv(Z.location,ft);break;case 4:a.vertexAttrib4fv(Z.location,ft);break;default:a.vertexAttrib1fv(Z.location,ft)}}}}L()}function z(){v();for(let B in r){let U=r[B];for(let nt in U){let G=U[nt];for(let J in G)g(G[J].object),delete G[J];delete U[nt]}delete r[B]}}function T(B){if(r[B.id]===void 0)return;let U=r[B.id];for(let nt in U){let G=U[nt];for(let J in G)g(G[J].object),delete G[J];delete U[nt]}delete r[B.id]}function N(B){for(let U in r){let nt=r[U];if(nt[B.id]===void 0)continue;let G=nt[B.id];for(let J in G)g(G[J].object),delete G[J];delete nt[B.id]}}function v(){O(),p=!0,h!==c&&(h=c,m(h.object))}function O(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:u,reset:v,resetDefaultState:O,dispose:z,releaseStatesOfGeometry:T,releaseStatesOfProgram:N,initAttributes:b,enableAttribute:w,disableUnusedAttributes:L}}function ku(a,t,e,n){let i=n.isWebGL2,s;function o(h){s=h}function r(h,p){a.drawArrays(s,h,p),e.update(p,s,1)}function c(h,p,u){if(u===0)return;let f,m;if(i)f=a,m="drawArraysInstanced";else if(f=t.get("ANGLE_instanced_arrays"),m="drawArraysInstancedANGLE",f===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[m](s,h,p,u),e.update(p,s,u)}this.setMode=o,this.render=r,this.renderInstances=c}function Ou(a,t,e){let n;function i(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){let I=t.get("EXT_texture_filter_anisotropic");n=a.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function s(I){if(I==="highp"){if(a.getShaderPrecisionFormat(35633,36338).precision>0&&a.getShaderPrecisionFormat(35632,36338).precision>0)return"highp";I="mediump"}return I==="mediump"&&a.getShaderPrecisionFormat(35633,36337).precision>0&&a.getShaderPrecisionFormat(35632,36337).precision>0?"mediump":"lowp"}let o=typeof WebGL2RenderingContext<"u"&&a instanceof WebGL2RenderingContext||typeof WebGL2ComputeRenderingContext<"u"&&a instanceof WebGL2ComputeRenderingContext,r=e.precision!==void 0?e.precision:"highp",c=s(r);c!==r&&(console.warn("THREE.WebGLRenderer:",r,"not supported, using",c,"instead."),r=c);let h=o||t.has("WEBGL_draw_buffers"),p=e.logarithmicDepthBuffer===!0,u=a.getParameter(34930),f=a.getParameter(35660),m=a.getParameter(3379),g=a.getParameter(34076),l=a.getParameter(34921),d=a.getParameter(36347),_=a.getParameter(36348),y=a.getParameter(36349),b=f>0,w=o||t.has("OES_texture_float"),S=b&&w,L=o?a.getParameter(36183):0;return{isWebGL2:o,drawBuffers:h,getMaxAnisotropy:i,getMaxPrecision:s,precision:r,logarithmicDepthBuffer:p,maxTextures:u,maxVertexTextures:f,maxTextureSize:m,maxCubemapSize:g,maxAttributes:l,maxVertexUniforms:d,maxVaryings:_,maxFragmentUniforms:y,vertexTextures:b,floatFragmentTextures:w,floatVertexTextures:S,maxSamples:L}}function Nu(a){let t=this,e=null,n=0,i=!1,s=!1,o=new Ye,r=new de,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f,m){let g=u.length!==0||f||n!==0||i;return i=f,e=p(u,m,0),n=u.length,g},this.beginShadows=function(){s=!0,p(null)},this.endShadows=function(){s=!1,h()},this.setState=function(u,f,m){let g=u.clippingPlanes,l=u.clipIntersection,d=u.clipShadows,_=a.get(u);if(!i||g===null||g.length===0||s&&!d)s?p(null):h();else{let y=s?0:n,b=y*4,w=_.clippingState||null;c.value=w,w=p(g,f,b,m);for(let S=0;S!==b;++S)w[S]=e[S];_.clippingState=w,this.numIntersection=l?this.numPlanes:0,this.numPlanes+=y}};function h(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function p(u,f,m,g){let l=u!==null?u.length:0,d=null;if(l!==0){if(d=c.value,g!==!0||d===null){let _=m+l*4,y=f.matrixWorldInverse;r.getNormalMatrix(y),(d===null||d.length<_)&&(d=new Float32Array(_));for(let b=0,w=m;b!==l;++b,w+=4)o.copy(u[b]).applyMatrix4(y,r),o.normal.toArray(d,w),d[w+3]=o.constant}c.value=d,c.needsUpdate=!0}return t.numPlanes=l,t.numIntersection=0,d}}function Fu(a){let t=new WeakMap;function e(o,r){return r===nr?o.mapping=ii:r===ir&&(o.mapping=si),o}function n(o){if(o&&o.isTexture&&o.isRenderTargetTexture===!1){let r=o.mapping;if(r===nr||r===ir)if(t.has(o)){let c=t.get(o).texture;return e(c,o.mapping)}else{let c=o.image;if(c&&c.height>0){let h=new ur(c.height/2);return h.fromEquirectangularTexture(a,o),t.set(o,h),o.addEventListener("dispose",i),e(h.texture,o.mapping)}else return null}}return o}function i(o){let r=o.target;r.removeEventListener("dispose",i);let c=t.get(r);c!==void 0&&(t.delete(r),c.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}var dr=class extends li{constructor(t=-1,e=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,s=n-t,o=n+t,r=i+e,c=i-e;if(this.view!==null&&this.view.enabled){let h=(this.right-this.left)/this.view.fullWidth/this.zoom,p=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=h*this.view.offsetX,o=s+h*this.view.width,r-=p*this.view.offsetY,c=r-p*this.view.height}this.projectionMatrix.makeOrthographic(s,o,r,c,this.near,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},$n=4,Ba=[.125,.215,.35,.446,.526,.582],xn=20,Ks=new dr,Va=new Gt,Qs=null,_n=(1+Math.sqrt(5))/2,Jn=1/_n,Wa=[new $(1,1,1),new $(-1,1,1),new $(1,1,-1),new $(-1,1,-1),new $(0,_n,Jn),new $(0,_n,-Jn),new $(Jn,0,_n),new $(-Jn,0,_n),new $(_n,Jn,0),new $(-_n,Jn,0)],ls=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){Qs=this._renderer.getRenderTarget(),this._setSize(256);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,n,i,s),e>0&&this._blur(s,0,0,e),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Xa(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ga(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Qs),t.scissorTest=!1,Zi(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ii||t.mapping===si?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Qs=this._renderer.getRenderTarget();let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Se,minFilter:Se,generateMipmaps:!1,type:yi,format:ve,encoding:je,depthBuffer:!1},i=Ha(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ha(t,e,n);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Uu(s)),this._blurMaterial=Bu(s,t,e)}return i}_compileMaterial(t){let e=new fe(this._lodPlanes[0],t);this._renderer.compile(e,Ks)}_sceneToCubeUV(t,e,n,i){let r=new le(90,1,e,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],p=this._renderer,u=p.autoClear,f=p.toneMapping;p.getClearColor(Va),p.toneMapping=Ie,p.autoClear=!1;let m=new is({name:"PMREM.Background",side:Ae,depthWrite:!1,depthTest:!1}),g=new fe(new Ke,m),l=!1,d=t.background;d?d.isColor&&(m.color.copy(d),t.background=null,l=!0):(m.color.copy(Va),l=!0);for(let _=0;_<6;_++){let y=_%3;y===0?(r.up.set(0,c[_],0),r.lookAt(h[_],0,0)):y===1?(r.up.set(0,0,c[_]),r.lookAt(0,h[_],0)):(r.up.set(0,c[_],0),r.lookAt(0,0,h[_]));let b=this._cubeSize;Zi(i,y*b,_>2?b:0,b,b),p.setRenderTarget(i),l&&p.render(g,r),p.render(t,r)}g.geometry.dispose(),g.material.dispose(),p.toneMapping=f,p.autoClear=u,t.background=d}_textureToCubeUV(t,e){let n=this._renderer,i=t.mapping===ii||t.mapping===si;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Xa()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ga());let s=i?this._cubemapMaterial:this._equirectMaterial,o=new fe(this._lodPlanes[0],s),r=s.uniforms;r.envMap.value=t;let c=this._cubeSize;Zi(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,Ks)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){let s=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),o=Wa[(i-1)%Wa.length];this._blur(t,i-1,i,s,o)}e.autoClear=n}_blur(t,e,n,i,s){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,i,"latitudinal",s),this._halfBlur(o,t,n,n,i,"longitudinal",s)}_halfBlur(t,e,n,i,s,o,r){let c=this._renderer,h=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let p=3,u=new fe(this._lodPlanes[i],h),f=h.uniforms,m=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*m):2*Math.PI/(2*xn-1),l=s/g,d=isFinite(s)?1+Math.floor(p*l):xn;d>xn&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${d} samples when the maximum is set to ${xn}`);let _=[],y=0;for(let I=0;I<xn;++I){let A=I/l,z=Math.exp(-A*A/2);_.push(z),I===0?y+=z:I<d&&(y+=2*z)}for(let I=0;I<_.length;I++)_[I]=_[I]/y;f.envMap.value=t.texture,f.samples.value=d,f.weights.value=_,f.latitudinal.value=o==="latitudinal",r&&(f.poleAxis.value=r);let{_lodMax:b}=this;f.dTheta.value=g,f.mipInt.value=b-n;let w=this._sizeLods[i],S=3*w*(i>b-$n?i-b+$n:0),L=4*(this._cubeSize-w);Zi(e,S,L,3*w,2*w),c.setRenderTarget(e),c.render(u,Ks)}};function Uu(a){let t=[],e=[],n=[],i=a,s=a-$n+1+Ba.length;for(let o=0;o<s;o++){let r=Math.pow(2,i);e.push(r);let c=1/r;o>a-$n?c=Ba[o-a+$n-1]:o===0&&(c=0),n.push(c);let h=1/(r-2),p=-h,u=1+h,f=[p,p,u,p,u,u,p,p,u,u,p,u],m=6,g=6,l=3,d=2,_=1,y=new Float32Array(l*g*m),b=new Float32Array(d*g*m),w=new Float32Array(_*g*m);for(let L=0;L<m;L++){let I=L%3*2/3-1,A=L>2?0:-1,z=[I,A,0,I+2/3,A,0,I+2/3,A+1,0,I,A,0,I+2/3,A+1,0,I,A+1,0];y.set(z,l*g*L),b.set(f,d*g*L);let T=[L,L,L,L,L,L];w.set(T,_*g*L)}let S=new $e;S.setAttribute("position",new Te(y,l)),S.setAttribute("uv",new Te(b,d)),S.setAttribute("faceIndex",new Te(w,_)),t.push(S),i>$n&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Ha(a,t,e){let n=new De(a,t,e);return n.texture.mapping=cs,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Zi(a,t,e,n,i){a.viewport.set(t,e,n,i),a.scissor.set(t,e,n,i)}function Bu(a,t,e){let n=new Float32Array(xn),i=new $(0,1,0);return new ye({name:"SphericalGaussianBlur",defines:{n:xn,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${a}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:zr(),fragmentShader:`

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
		`,blending:hn,depthTest:!1,depthWrite:!1})}function Ga(){return new ye({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:zr(),fragmentShader:`

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
		`,blending:hn,depthTest:!1,depthWrite:!1})}function Xa(){return new ye({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:zr(),fragmentShader:`

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
	`}function Vu(a){let t=new WeakMap,e=null;function n(r){if(r&&r.isTexture){let c=r.mapping,h=c===nr||c===ir,p=c===ii||c===si;if(h||p)if(r.isRenderTargetTexture&&r.needsPMREMUpdate===!0){r.needsPMREMUpdate=!1;let u=t.get(r);return e===null&&(e=new ls(a)),u=h?e.fromEquirectangular(r,u):e.fromCubemap(r,u),t.set(r,u),u.texture}else{if(t.has(r))return t.get(r).texture;{let u=r.image;if(h&&u&&u.height>0||p&&u&&i(u)){e===null&&(e=new ls(a));let f=h?e.fromEquirectangular(r):e.fromCubemap(r);return t.set(r,f),r.addEventListener("dispose",s),f.texture}else return null}}}return r}function i(r){let c=0,h=6;for(let p=0;p<h;p++)r[p]!==void 0&&c++;return c===h}function s(r){let c=r.target;c.removeEventListener("dispose",s);let h=t.get(c);h!==void 0&&(t.delete(c),h.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Wu(a){let t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=a.getExtension("WEBGL_depth_texture")||a.getExtension("MOZ_WEBGL_depth_texture")||a.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=a.getExtension("EXT_texture_filter_anisotropic")||a.getExtension("MOZ_EXT_texture_filter_anisotropic")||a.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=a.getExtension("WEBGL_compressed_texture_s3tc")||a.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||a.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=a.getExtension("WEBGL_compressed_texture_pvrtc")||a.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=a.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(n){n.isWebGL2?e("EXT_color_buffer_float"):(e("WEBGL_depth_texture"),e("OES_texture_float"),e("OES_texture_half_float"),e("OES_texture_half_float_linear"),e("OES_standard_derivatives"),e("OES_element_index_uint"),e("OES_vertex_array_object"),e("ANGLE_instanced_arrays")),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture")},get:function(n){let i=e(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Hu(a,t,e,n){let i={},s=new WeakMap;function o(u){let f=u.target;f.index!==null&&t.remove(f.index);for(let g in f.attributes)t.remove(f.attributes[g]);f.removeEventListener("dispose",o),delete i[f.id];let m=s.get(f);m&&(t.remove(m),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function r(u,f){return i[f.id]===!0||(f.addEventListener("dispose",o),i[f.id]=!0,e.memory.geometries++),f}function c(u){let f=u.attributes;for(let g in f)t.update(f[g],34962);let m=u.morphAttributes;for(let g in m){let l=m[g];for(let d=0,_=l.length;d<_;d++)t.update(l[d],34962)}}function h(u){let f=[],m=u.index,g=u.attributes.position,l=0;if(m!==null){let y=m.array;l=m.version;for(let b=0,w=y.length;b<w;b+=3){let S=y[b+0],L=y[b+1],I=y[b+2];f.push(S,L,L,I,I,S)}}else{let y=g.array;l=g.version;for(let b=0,w=y.length/3-1;b<w;b+=3){let S=b+0,L=b+1,I=b+2;f.push(S,L,L,I,I,S)}}let d=new(po(f)?rs:ss)(f,1);d.version=l;let _=s.get(u);_&&t.remove(_),s.set(u,d)}function p(u){let f=s.get(u);if(f){let m=u.index;m!==null&&f.version<m.version&&h(u)}else h(u);return s.get(u)}return{get:r,update:c,getWireframeAttribute:p}}function Gu(a,t,e,n){let i=n.isWebGL2,s;function o(f){s=f}let r,c;function h(f){r=f.type,c=f.bytesPerElement}function p(f,m){a.drawElements(s,m,r,f*c),e.update(m,s,1)}function u(f,m,g){if(g===0)return;let l,d;if(i)l=a,d="drawElementsInstanced";else if(l=t.get("ANGLE_instanced_arrays"),d="drawElementsInstancedANGLE",l===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}l[d](s,m,r,f*c,g),e.update(m,s,g)}this.setMode=o,this.setIndex=h,this.render=p,this.renderInstances=u}function Xu(a){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,r){switch(e.calls++,o){case 4:e.triangles+=r*(s/3);break;case 1:e.lines+=r*(s/2);break;case 3:e.lines+=r*(s-1);break;case 2:e.lines+=r*s;break;case 0:e.points+=r*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){e.frame++,e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function qu(a,t){return a[0]-t[0]}function Zu(a,t){return Math.abs(t[1])-Math.abs(a[1])}function Yu(a,t,e){let n={},i=new Float32Array(8),s=new WeakMap,o=new te,r=[];for(let h=0;h<8;h++)r[h]=[h,0];function c(h,p,u,f){let m=h.morphTargetInfluences;if(t.isWebGL2===!0){let g=p.morphAttributes.position||p.morphAttributes.normal||p.morphAttributes.color,l=g!==void 0?g.length:0,d=s.get(p);if(d===void 0||d.count!==l){let U=function(){O.dispose(),s.delete(p),p.removeEventListener("dispose",U)};d!==void 0&&d.texture.dispose();let b=p.morphAttributes.position!==void 0,w=p.morphAttributes.normal!==void 0,S=p.morphAttributes.color!==void 0,L=p.morphAttributes.position||[],I=p.morphAttributes.normal||[],A=p.morphAttributes.color||[],z=0;b===!0&&(z=1),w===!0&&(z=2),S===!0&&(z=3);let T=p.attributes.position.count*z,N=1;T>t.maxTextureSize&&(N=Math.ceil(T/t.maxTextureSize),T=t.maxTextureSize);let v=new Float32Array(T*N*4*l),O=new es(v,T,N,l);O.type=Ue,O.needsUpdate=!0;let B=z*4;for(let nt=0;nt<l;nt++){let G=L[nt],J=I[nt],C=A[nt],R=T*N*4*nt;for(let it=0;it<G.count;it++){let Z=it*B;b===!0&&(o.fromBufferAttribute(G,it),v[R+Z+0]=o.x,v[R+Z+1]=o.y,v[R+Z+2]=o.z,v[R+Z+3]=0),w===!0&&(o.fromBufferAttribute(J,it),v[R+Z+4]=o.x,v[R+Z+5]=o.y,v[R+Z+6]=o.z,v[R+Z+7]=0),S===!0&&(o.fromBufferAttribute(C,it),v[R+Z+8]=o.x,v[R+Z+9]=o.y,v[R+Z+10]=o.z,v[R+Z+11]=C.itemSize===4?o.w:1)}}d={count:l,texture:O,size:new zt(T,N)},s.set(p,d),p.addEventListener("dispose",U)}let _=0;for(let b=0;b<m.length;b++)_+=m[b];let y=p.morphTargetsRelative?1:1-_;f.getUniforms().setValue(a,"morphTargetBaseInfluence",y),f.getUniforms().setValue(a,"morphTargetInfluences",m),f.getUniforms().setValue(a,"morphTargetsTexture",d.texture,e),f.getUniforms().setValue(a,"morphTargetsTextureSize",d.size)}else{let g=m===void 0?0:m.length,l=n[p.id];if(l===void 0||l.length!==g){l=[];for(let w=0;w<g;w++)l[w]=[w,0];n[p.id]=l}for(let w=0;w<g;w++){let S=l[w];S[0]=w,S[1]=m[w]}l.sort(Zu);for(let w=0;w<8;w++)w<g&&l[w][1]?(r[w][0]=l[w][0],r[w][1]=l[w][1]):(r[w][0]=Number.MAX_SAFE_INTEGER,r[w][1]=0);r.sort(qu);let d=p.morphAttributes.position,_=p.morphAttributes.normal,y=0;for(let w=0;w<8;w++){let S=r[w],L=S[0],I=S[1];L!==Number.MAX_SAFE_INTEGER&&I?(d&&p.getAttribute("morphTarget"+w)!==d[L]&&p.setAttribute("morphTarget"+w,d[L]),_&&p.getAttribute("morphNormal"+w)!==_[L]&&p.setAttribute("morphNormal"+w,_[L]),i[w]=I,y+=I):(d&&p.hasAttribute("morphTarget"+w)===!0&&p.deleteAttribute("morphTarget"+w),_&&p.hasAttribute("morphNormal"+w)===!0&&p.deleteAttribute("morphNormal"+w),i[w]=0)}let b=p.morphTargetsRelative?1:1-y;f.getUniforms().setValue(a,"morphTargetBaseInfluence",b),f.getUniforms().setValue(a,"morphTargetInfluences",i)}}return{update:c}}function Ju(a,t,e,n){let i=new WeakMap;function s(c){let h=n.render.frame,p=c.geometry,u=t.get(c,p);return i.get(u)!==h&&(t.update(u),i.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",r)===!1&&c.addEventListener("dispose",r),e.update(c.instanceMatrix,34962),c.instanceColor!==null&&e.update(c.instanceColor,34962)),u}function o(){i=new WeakMap}function r(c){let h=c.target;h.removeEventListener("dispose",r),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:s,dispose:o}}var _o=new pe,xo=new es,vo=new lr,yo=new as,qa=[],Za=[],Ya=new Float32Array(16),Ja=new Float32Array(9),ja=new Float32Array(4);function ui(a,t,e){let n=a[0];if(n<=0||n>0)return a;let i=t*e,s=qa[i];if(s===void 0&&(s=new Float32Array(i),qa[i]=s),t!==0){n.toArray(s,0);for(let o=1,r=0;o!==t;++o)r+=e,a[o].toArray(s,r)}return s}function ne(a,t){if(a.length!==t.length)return!1;for(let e=0,n=a.length;e<n;e++)if(a[e]!==t[e])return!1;return!0}function ie(a,t){for(let e=0,n=t.length;e<n;e++)a[e]=t[e]}function us(a,t){let e=Za[t];e===void 0&&(e=new Int32Array(t),Za[t]=e);for(let n=0;n!==t;++n)e[n]=a.allocateTextureUnit();return e}function ju(a,t){let e=this.cache;e[0]!==t&&(a.uniform1f(this.addr,t),e[0]=t)}function $u(a,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(a.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ne(e,t))return;a.uniform2fv(this.addr,t),ie(e,t)}}function Ku(a,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(a.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(a.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ne(e,t))return;a.uniform3fv(this.addr,t),ie(e,t)}}function Qu(a,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(a.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ne(e,t))return;a.uniform4fv(this.addr,t),ie(e,t)}}function td(a,t){let e=this.cache,n=t.elements;if(n===void 0){if(ne(e,t))return;a.uniformMatrix2fv(this.addr,!1,t),ie(e,t)}else{if(ne(e,n))return;ja.set(n),a.uniformMatrix2fv(this.addr,!1,ja),ie(e,n)}}function ed(a,t){let e=this.cache,n=t.elements;if(n===void 0){if(ne(e,t))return;a.uniformMatrix3fv(this.addr,!1,t),ie(e,t)}else{if(ne(e,n))return;Ja.set(n),a.uniformMatrix3fv(this.addr,!1,Ja),ie(e,n)}}function nd(a,t){let e=this.cache,n=t.elements;if(n===void 0){if(ne(e,t))return;a.uniformMatrix4fv(this.addr,!1,t),ie(e,t)}else{if(ne(e,n))return;Ya.set(n),a.uniformMatrix4fv(this.addr,!1,Ya),ie(e,n)}}function id(a,t){let e=this.cache;e[0]!==t&&(a.uniform1i(this.addr,t),e[0]=t)}function sd(a,t){let e=this.cache;ne(e,t)||(a.uniform2iv(this.addr,t),ie(e,t))}function rd(a,t){let e=this.cache;ne(e,t)||(a.uniform3iv(this.addr,t),ie(e,t))}function ad(a,t){let e=this.cache;ne(e,t)||(a.uniform4iv(this.addr,t),ie(e,t))}function od(a,t){let e=this.cache;e[0]!==t&&(a.uniform1ui(this.addr,t),e[0]=t)}function ld(a,t){let e=this.cache;ne(e,t)||(a.uniform2uiv(this.addr,t),ie(e,t))}function cd(a,t){let e=this.cache;ne(e,t)||(a.uniform3uiv(this.addr,t),ie(e,t))}function hd(a,t){let e=this.cache;ne(e,t)||(a.uniform4uiv(this.addr,t),ie(e,t))}function ud(a,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(a.uniform1i(this.addr,i),n[0]=i),e.setTexture2D(t||_o,i)}function dd(a,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(a.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||vo,i)}function fd(a,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(a.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||yo,i)}function pd(a,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(a.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||xo,i)}function md(a){switch(a){case 5126:return ju;case 35664:return $u;case 35665:return Ku;case 35666:return Qu;case 35674:return td;case 35675:return ed;case 35676:return nd;case 5124:case 35670:return id;case 35667:case 35671:return sd;case 35668:case 35672:return rd;case 35669:case 35673:return ad;case 5125:return od;case 36294:return ld;case 36295:return cd;case 36296:return hd;case 35678:case 36198:case 36298:case 36306:case 35682:return ud;case 35679:case 36299:case 36307:return dd;case 35680:case 36300:case 36308:case 36293:return fd;case 36289:case 36303:case 36311:case 36292:return pd}}function gd(a,t){a.uniform1fv(this.addr,t)}function _d(a,t){let e=ui(t,this.size,2);a.uniform2fv(this.addr,e)}function xd(a,t){let e=ui(t,this.size,3);a.uniform3fv(this.addr,e)}function vd(a,t){let e=ui(t,this.size,4);a.uniform4fv(this.addr,e)}function yd(a,t){let e=ui(t,this.size,4);a.uniformMatrix2fv(this.addr,!1,e)}function bd(a,t){let e=ui(t,this.size,9);a.uniformMatrix3fv(this.addr,!1,e)}function wd(a,t){let e=ui(t,this.size,16);a.uniformMatrix4fv(this.addr,!1,e)}function Md(a,t){a.uniform1iv(this.addr,t)}function Sd(a,t){a.uniform2iv(this.addr,t)}function Ad(a,t){a.uniform3iv(this.addr,t)}function Td(a,t){a.uniform4iv(this.addr,t)}function Ed(a,t){a.uniform1uiv(this.addr,t)}function Cd(a,t){a.uniform2uiv(this.addr,t)}function Rd(a,t){a.uniform3uiv(this.addr,t)}function Pd(a,t){a.uniform4uiv(this.addr,t)}function Ld(a,t,e){let n=this.cache,i=t.length,s=us(e,i);ne(n,s)||(a.uniform1iv(this.addr,s),ie(n,s));for(let o=0;o!==i;++o)e.setTexture2D(t[o]||_o,s[o])}function Id(a,t,e){let n=this.cache,i=t.length,s=us(e,i);ne(n,s)||(a.uniform1iv(this.addr,s),ie(n,s));for(let o=0;o!==i;++o)e.setTexture3D(t[o]||vo,s[o])}function Dd(a,t,e){let n=this.cache,i=t.length,s=us(e,i);ne(n,s)||(a.uniform1iv(this.addr,s),ie(n,s));for(let o=0;o!==i;++o)e.setTextureCube(t[o]||yo,s[o])}function zd(a,t,e){let n=this.cache,i=t.length,s=us(e,i);ne(n,s)||(a.uniform1iv(this.addr,s),ie(n,s));for(let o=0;o!==i;++o)e.setTexture2DArray(t[o]||xo,s[o])}function kd(a){switch(a){case 5126:return gd;case 35664:return _d;case 35665:return xd;case 35666:return vd;case 35674:return yd;case 35675:return bd;case 35676:return wd;case 5124:case 35670:return Md;case 35667:case 35671:return Sd;case 35668:case 35672:return Ad;case 35669:case 35673:return Td;case 5125:return Ed;case 36294:return Cd;case 36295:return Rd;case 36296:return Pd;case 35678:case 36198:case 36298:case 36306:case 35682:return Ld;case 35679:case 36299:case 36307:return Id;case 35680:case 36300:case 36308:case 36293:return Dd;case 36289:case 36303:case 36311:case 36292:return zd}}var fr=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.setValue=md(e.type)}},pr=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.size=e.size,this.setValue=kd(e.type)}},mr=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let i=this.seq;for(let s=0,o=i.length;s!==o;++s){let r=i[s];r.setValue(t,e[r.id],n)}}},tr=/(\w+)(\])?(\[|\.)?/g;function $a(a,t){a.seq.push(t),a.map[t.id]=t}function Od(a,t,e){let n=a.name,i=n.length;for(tr.lastIndex=0;;){let s=tr.exec(n),o=tr.lastIndex,r=s[1],c=s[2]==="]",h=s[3];if(c&&(r=r|0),h===void 0||h==="["&&o+2===i){$a(e,h===void 0?new fr(r,a,t):new pr(r,a,t));break}else{let u=e.map[r];u===void 0&&(u=new mr(r),$a(e,u)),e=u}}}var ei=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,35718);for(let i=0;i<n;++i){let s=t.getActiveUniform(e,i),o=t.getUniformLocation(e,s.name);Od(s,o,this)}}setValue(t,e,n,i){let s=this.map[e];s!==void 0&&s.setValue(t,n,i)}setOptional(t,e,n){let i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let s=0,o=e.length;s!==o;++s){let r=e[s],c=n[r.id];c.needsUpdate!==!1&&r.setValue(t,c.value,i)}}static seqWithValue(t,e){let n=[];for(let i=0,s=t.length;i!==s;++i){let o=t[i];o.id in e&&n.push(o)}return n}};function Ka(a,t,e){let n=a.createShader(t);return a.shaderSource(n,e),a.compileShader(n),n}var Nd=0;function Fd(a,t){let e=a.split(`
`),n=[],i=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let o=i;o<s;o++){let r=o+1;n.push(`${r===t?">":" "} ${r}: ${e[o]}`)}return n.join(`
`)}function Ud(a){switch(a){case je:return["Linear","( value )"];case Zt:return["sRGB","( value )"];default:return console.warn("THREE.WebGLProgram: Unsupported encoding:",a),["Linear","( value )"]}}function Qa(a,t,e){let n=a.getShaderParameter(t,35713),i=a.getShaderInfoLog(t).trim();if(n&&i==="")return"";let s=/ERROR: 0:(\d+)/.exec(i);if(s){let o=parseInt(s[1]);return e.toUpperCase()+`

`+i+`

`+Fd(a.getShaderSource(t),o)}else return i}function Bd(a,t){let e=Ud(t);return"vec4 "+a+"( vec4 value ) { return LinearTo"+e[0]+e[1]+"; }"}function Vd(a,t){let e;switch(t){case dl:e="Linear";break;case fl:e="Reinhard";break;case pl:e="OptimizedCineon";break;case ml:e="ACESFilmic";break;case gl:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+a+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function Wd(a){return[a.extensionDerivatives||!!a.envMapCubeUVHeight||a.bumpMap||a.tangentSpaceNormalMap||a.clearcoatNormalMap||a.flatShading||a.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(a.extensionFragDepth||a.logarithmicDepthBuffer)&&a.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",a.extensionDrawBuffers&&a.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(a.extensionShaderTextureLOD||a.envMap||a.transmission)&&a.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(xi).join(`
`)}function Hd(a){let t=[];for(let e in a){let n=a[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Gd(a,t){let e={},n=a.getProgramParameter(t,35721);for(let i=0;i<n;i++){let s=a.getActiveAttrib(t,i),o=s.name,r=1;s.type===35674&&(r=2),s.type===35675&&(r=3),s.type===35676&&(r=4),e[o]={type:s.type,location:a.getAttribLocation(t,o),locationSize:r}}return e}function xi(a){return a!==""}function to(a,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return a.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function eo(a,t){return a.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Xd=/^[ \t]*#include +<([\w\d./]+)>/gm;function gr(a){return a.replace(Xd,qd)}function qd(a,t){let e=Ot[t];if(e===void 0)throw new Error("Can not resolve #include <"+t+">");return gr(e)}var Zd=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function no(a){return a.replace(Zd,Yd)}function Yd(a,t,e,n){let i="";for(let s=parseInt(t);s<parseInt(e);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function io(a){let t="precision "+a.precision+` float;
precision `+a.precision+" int;";return a.precision==="highp"?t+=`
#define HIGH_PRECISION`:a.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:a.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Jd(a){let t="SHADOWMAP_TYPE_BASIC";return a.shadowMapType===oo?t="SHADOWMAP_TYPE_PCF":a.shadowMapType===Go?t="SHADOWMAP_TYPE_PCF_SOFT":a.shadowMapType===_i&&(t="SHADOWMAP_TYPE_VSM"),t}function jd(a){let t="ENVMAP_TYPE_CUBE";if(a.envMap)switch(a.envMapMode){case ii:case si:t="ENVMAP_TYPE_CUBE";break;case cs:t="ENVMAP_TYPE_CUBE_UV";break}return t}function $d(a){let t="ENVMAP_MODE_REFLECTION";if(a.envMap)switch(a.envMapMode){case si:t="ENVMAP_MODE_REFRACTION";break}return t}function Kd(a){let t="ENVMAP_BLENDING_NONE";if(a.envMap)switch(a.combine){case ho:t="ENVMAP_BLENDING_MULTIPLY";break;case hl:t="ENVMAP_BLENDING_MIX";break;case ul:t="ENVMAP_BLENDING_ADD";break}return t}function Qd(a){let t=a.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function tf(a,t,e,n){let i=a.getContext(),s=e.defines,o=e.vertexShader,r=e.fragmentShader,c=Jd(e),h=jd(e),p=$d(e),u=Kd(e),f=Qd(e),m=e.isWebGL2?"":Wd(e),g=Hd(s),l=i.createProgram(),d,_,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(d=[g].filter(xi).join(`
`),d.length>0&&(d+=`
`),_=[m,g].filter(xi).join(`
`),_.length>0&&(_+=`
`)):(d=[io(e),"#define SHADER_NAME "+e.shaderName,g,e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.supportsVertexTextures?"#define VERTEX_TEXTURES":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+p:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMap&&e.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",e.normalMap&&e.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.displacementMap&&e.supportsVertexTextures?"#define USE_DISPLACEMENTMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularIntensityMap?"#define USE_SPECULARINTENSITYMAP":"",e.specularColorMap?"#define USE_SPECULARCOLORMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEENCOLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEENROUGHNESSMAP":"",e.vertexTangents?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUvs?"#define USE_UV":"",e.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors&&e.isWebGL2?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(xi).join(`
`),_=[m,io(e),"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.envMap?"#define "+p:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMap&&e.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",e.normalMap&&e.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularIntensityMap?"#define USE_SPECULARINTENSITYMAP":"",e.specularColorMap?"#define USE_SPECULARCOLORMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEENCOLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEENROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.vertexTangents?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUvs?"#define USE_UV":"",e.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.physicallyCorrectLights?"#define PHYSICALLY_CORRECT_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Ie?"#define TONE_MAPPING":"",e.toneMapping!==Ie?Ot.tonemapping_pars_fragment:"",e.toneMapping!==Ie?Vd("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ot.encodings_pars_fragment,Bd("linearToOutputTexel",e.outputEncoding),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(xi).join(`
`)),o=gr(o),o=to(o,e),o=eo(o,e),r=gr(r),r=to(r,e),r=eo(r,e),o=no(o),r=no(r),e.isWebGL2&&e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,d=["precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+d,_=["#define varying in",e.glslVersion===Ta?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Ta?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+_);let b=y+d+o,w=y+_+r,S=Ka(i,35633,b),L=Ka(i,35632,w);if(i.attachShader(l,S),i.attachShader(l,L),e.index0AttributeName!==void 0?i.bindAttribLocation(l,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(l,0,"position"),i.linkProgram(l),a.debug.checkShaderErrors){let z=i.getProgramInfoLog(l).trim(),T=i.getShaderInfoLog(S).trim(),N=i.getShaderInfoLog(L).trim(),v=!0,O=!0;if(i.getProgramParameter(l,35714)===!1){v=!1;let B=Qa(i,S,"vertex"),U=Qa(i,L,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(l,35715)+`

Program Info Log: `+z+`
`+B+`
`+U)}else z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",z):(T===""||N==="")&&(O=!1);O&&(this.diagnostics={runnable:v,programLog:z,vertexShader:{log:T,prefix:d},fragmentShader:{log:N,prefix:_}})}i.deleteShader(S),i.deleteShader(L);let I;this.getUniforms=function(){return I===void 0&&(I=new ei(i,l)),I};let A;return this.getAttributes=function(){return A===void 0&&(A=Gd(i,l)),A},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(l),this.program=void 0},this.name=e.shaderName,this.id=Nd++,this.cacheKey=t,this.usedTimes=1,this.program=l,this.vertexShader=S,this.fragmentShader=L,this}var ef=0,_r=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new xr(t),e.set(t,n)),n}},xr=class{constructor(t){this.id=ef++,this.code=t,this.usedTimes=0}};function nf(a,t,e,n,i,s,o){let r=new ns,c=new _r,h=[],p=i.isWebGL2,u=i.logarithmicDepthBuffer,f=i.vertexTextures,m=i.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function l(A,z,T,N,v){let O=N.fog,B=v.geometry,U=A.isMeshStandardMaterial?N.environment:null,nt=(A.isMeshStandardMaterial?e:t).get(A.envMap||U),G=!!nt&&nt.mapping===cs?nt.image.height:null,J=g[A.type];A.precision!==null&&(m=i.getMaxPrecision(A.precision),m!==A.precision&&console.warn("THREE.WebGLProgram.getParameters:",A.precision,"not supported, using",m,"instead."));let C=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,R=C!==void 0?C.length:0,it=0;B.morphAttributes.position!==void 0&&(it=1),B.morphAttributes.normal!==void 0&&(it=2),B.morphAttributes.color!==void 0&&(it=3);let Z,K,ft,At;if(J){let Dt=Ne[J];Z=Dt.vertexShader,K=Dt.fragmentShader}else Z=A.vertexShader,K=A.fragmentShader,c.update(A),ft=c.getVertexShaderID(A),At=c.getFragmentShaderID(A);let et=a.getRenderTarget(),Tt=A.alphaTest>0,Mt=A.clearcoat>0,bt=A.iridescence>0;return{isWebGL2:p,shaderID:J,shaderName:A.type,vertexShader:Z,fragmentShader:K,defines:A.defines,customVertexShaderID:ft,customFragmentShaderID:At,isRawShaderMaterial:A.isRawShaderMaterial===!0,glslVersion:A.glslVersion,precision:m,instancing:v.isInstancedMesh===!0,instancingColor:v.isInstancedMesh===!0&&v.instanceColor!==null,supportsVertexTextures:f,outputEncoding:et===null?a.outputEncoding:et.isXRRenderTarget===!0?et.texture.encoding:je,map:!!A.map,matcap:!!A.matcap,envMap:!!nt,envMapMode:nt&&nt.mapping,envMapCubeUVHeight:G,lightMap:!!A.lightMap,aoMap:!!A.aoMap,emissiveMap:!!A.emissiveMap,bumpMap:!!A.bumpMap,normalMap:!!A.normalMap,objectSpaceNormalMap:A.normalMapType===Ol,tangentSpaceNormalMap:A.normalMapType===kl,decodeVideoTexture:!!A.map&&A.map.isVideoTexture===!0&&A.map.encoding===Zt,clearcoat:Mt,clearcoatMap:Mt&&!!A.clearcoatMap,clearcoatRoughnessMap:Mt&&!!A.clearcoatRoughnessMap,clearcoatNormalMap:Mt&&!!A.clearcoatNormalMap,iridescence:bt,iridescenceMap:bt&&!!A.iridescenceMap,iridescenceThicknessMap:bt&&!!A.iridescenceThicknessMap,displacementMap:!!A.displacementMap,roughnessMap:!!A.roughnessMap,metalnessMap:!!A.metalnessMap,specularMap:!!A.specularMap,specularIntensityMap:!!A.specularIntensityMap,specularColorMap:!!A.specularColorMap,opaque:A.transparent===!1&&A.blending===Qn,alphaMap:!!A.alphaMap,alphaTest:Tt,gradientMap:!!A.gradientMap,sheen:A.sheen>0,sheenColorMap:!!A.sheenColorMap,sheenRoughnessMap:!!A.sheenRoughnessMap,transmission:A.transmission>0,transmissionMap:!!A.transmissionMap,thicknessMap:!!A.thicknessMap,combine:A.combine,vertexTangents:!!A.normalMap&&!!B.attributes.tangent,vertexColors:A.vertexColors,vertexAlphas:A.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,vertexUvs:!!A.map||!!A.bumpMap||!!A.normalMap||!!A.specularMap||!!A.alphaMap||!!A.emissiveMap||!!A.roughnessMap||!!A.metalnessMap||!!A.clearcoatMap||!!A.clearcoatRoughnessMap||!!A.clearcoatNormalMap||!!A.iridescenceMap||!!A.iridescenceThicknessMap||!!A.displacementMap||!!A.transmissionMap||!!A.thicknessMap||!!A.specularIntensityMap||!!A.specularColorMap||!!A.sheenColorMap||!!A.sheenRoughnessMap,uvsVertexOnly:!(!!A.map||!!A.bumpMap||!!A.normalMap||!!A.specularMap||!!A.alphaMap||!!A.emissiveMap||!!A.roughnessMap||!!A.metalnessMap||!!A.clearcoatNormalMap||!!A.iridescenceMap||!!A.iridescenceThicknessMap||A.transmission>0||!!A.transmissionMap||!!A.thicknessMap||!!A.specularIntensityMap||!!A.specularColorMap||A.sheen>0||!!A.sheenColorMap||!!A.sheenRoughnessMap)&&!!A.displacementMap,fog:!!O,useFog:A.fog===!0,fogExp2:O&&O.isFogExp2,flatShading:!!A.flatShading,sizeAttenuation:A.sizeAttenuation,logarithmicDepthBuffer:u,skinning:v.isSkinnedMesh===!0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:R,morphTextureStride:it,numDirLights:z.directional.length,numPointLights:z.point.length,numSpotLights:z.spot.length,numSpotLightMaps:z.spotLightMap.length,numRectAreaLights:z.rectArea.length,numHemiLights:z.hemi.length,numDirLightShadows:z.directionalShadowMap.length,numPointLightShadows:z.pointShadowMap.length,numSpotLightShadows:z.spotShadowMap.length,numSpotLightShadowsWithMaps:z.numSpotLightShadowsWithMaps,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:A.dithering,shadowMapEnabled:a.shadowMap.enabled&&T.length>0,shadowMapType:a.shadowMap.type,toneMapping:A.toneMapped?a.toneMapping:Ie,physicallyCorrectLights:a.physicallyCorrectLights,premultipliedAlpha:A.premultipliedAlpha,doubleSided:A.side===Fe,flipSided:A.side===Ae,useDepthPacking:!!A.depthPacking,depthPacking:A.depthPacking||0,index0AttributeName:A.index0AttributeName,extensionDerivatives:A.extensions&&A.extensions.derivatives,extensionFragDepth:A.extensions&&A.extensions.fragDepth,extensionDrawBuffers:A.extensions&&A.extensions.drawBuffers,extensionShaderTextureLOD:A.extensions&&A.extensions.shaderTextureLOD,rendererExtensionFragDepth:p||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:p||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:p||n.has("EXT_shader_texture_lod"),customProgramCacheKey:A.customProgramCacheKey()}}function d(A){let z=[];if(A.shaderID?z.push(A.shaderID):(z.push(A.customVertexShaderID),z.push(A.customFragmentShaderID)),A.defines!==void 0)for(let T in A.defines)z.push(T),z.push(A.defines[T]);return A.isRawShaderMaterial===!1&&(_(z,A),y(z,A),z.push(a.outputEncoding)),z.push(A.customProgramCacheKey),z.join()}function _(A,z){A.push(z.precision),A.push(z.outputEncoding),A.push(z.envMapMode),A.push(z.envMapCubeUVHeight),A.push(z.combine),A.push(z.vertexUvs),A.push(z.fogExp2),A.push(z.sizeAttenuation),A.push(z.morphTargetsCount),A.push(z.morphAttributeCount),A.push(z.numDirLights),A.push(z.numPointLights),A.push(z.numSpotLights),A.push(z.numSpotLightMaps),A.push(z.numHemiLights),A.push(z.numRectAreaLights),A.push(z.numDirLightShadows),A.push(z.numPointLightShadows),A.push(z.numSpotLightShadows),A.push(z.numSpotLightShadowsWithMaps),A.push(z.shadowMapType),A.push(z.toneMapping),A.push(z.numClippingPlanes),A.push(z.numClipIntersection),A.push(z.depthPacking)}function y(A,z){r.disableAll(),z.isWebGL2&&r.enable(0),z.supportsVertexTextures&&r.enable(1),z.instancing&&r.enable(2),z.instancingColor&&r.enable(3),z.map&&r.enable(4),z.matcap&&r.enable(5),z.envMap&&r.enable(6),z.lightMap&&r.enable(7),z.aoMap&&r.enable(8),z.emissiveMap&&r.enable(9),z.bumpMap&&r.enable(10),z.normalMap&&r.enable(11),z.objectSpaceNormalMap&&r.enable(12),z.tangentSpaceNormalMap&&r.enable(13),z.clearcoat&&r.enable(14),z.clearcoatMap&&r.enable(15),z.clearcoatRoughnessMap&&r.enable(16),z.clearcoatNormalMap&&r.enable(17),z.iridescence&&r.enable(18),z.iridescenceMap&&r.enable(19),z.iridescenceThicknessMap&&r.enable(20),z.displacementMap&&r.enable(21),z.specularMap&&r.enable(22),z.roughnessMap&&r.enable(23),z.metalnessMap&&r.enable(24),z.gradientMap&&r.enable(25),z.alphaMap&&r.enable(26),z.alphaTest&&r.enable(27),z.vertexColors&&r.enable(28),z.vertexAlphas&&r.enable(29),z.vertexUvs&&r.enable(30),z.vertexTangents&&r.enable(31),z.uvsVertexOnly&&r.enable(32),A.push(r.mask),r.disableAll(),z.fog&&r.enable(0),z.useFog&&r.enable(1),z.flatShading&&r.enable(2),z.logarithmicDepthBuffer&&r.enable(3),z.skinning&&r.enable(4),z.morphTargets&&r.enable(5),z.morphNormals&&r.enable(6),z.morphColors&&r.enable(7),z.premultipliedAlpha&&r.enable(8),z.shadowMapEnabled&&r.enable(9),z.physicallyCorrectLights&&r.enable(10),z.doubleSided&&r.enable(11),z.flipSided&&r.enable(12),z.useDepthPacking&&r.enable(13),z.dithering&&r.enable(14),z.specularIntensityMap&&r.enable(15),z.specularColorMap&&r.enable(16),z.transmission&&r.enable(17),z.transmissionMap&&r.enable(18),z.thicknessMap&&r.enable(19),z.sheen&&r.enable(20),z.sheenColorMap&&r.enable(21),z.sheenRoughnessMap&&r.enable(22),z.decodeVideoTexture&&r.enable(23),z.opaque&&r.enable(24),A.push(r.mask)}function b(A){let z=g[A.type],T;if(z){let N=Ne[z];T=$l.clone(N.uniforms)}else T=A.uniforms;return T}function w(A,z){let T;for(let N=0,v=h.length;N<v;N++){let O=h[N];if(O.cacheKey===z){T=O,++T.usedTimes;break}}return T===void 0&&(T=new tf(a,z,A,s),h.push(T)),T}function S(A){if(--A.usedTimes===0){let z=h.indexOf(A);h[z]=h[h.length-1],h.pop(),A.destroy()}}function L(A){c.remove(A)}function I(){c.dispose()}return{getParameters:l,getProgramCacheKey:d,getUniforms:b,acquireProgram:w,releaseProgram:S,releaseShaderCache:L,programs:h,dispose:I}}function sf(){let a=new WeakMap;function t(s){let o=a.get(s);return o===void 0&&(o={},a.set(s,o)),o}function e(s){a.delete(s)}function n(s,o,r){a.get(s)[o]=r}function i(){a=new WeakMap}return{get:t,remove:e,update:n,dispose:i}}function rf(a,t){return a.groupOrder!==t.groupOrder?a.groupOrder-t.groupOrder:a.renderOrder!==t.renderOrder?a.renderOrder-t.renderOrder:a.material.id!==t.material.id?a.material.id-t.material.id:a.z!==t.z?a.z-t.z:a.id-t.id}function so(a,t){return a.groupOrder!==t.groupOrder?a.groupOrder-t.groupOrder:a.renderOrder!==t.renderOrder?a.renderOrder-t.renderOrder:a.z!==t.z?t.z-a.z:a.id-t.id}function ro(){let a=[],t=0,e=[],n=[],i=[];function s(){t=0,e.length=0,n.length=0,i.length=0}function o(u,f,m,g,l,d){let _=a[t];return _===void 0?(_={id:u.id,object:u,geometry:f,material:m,groupOrder:g,renderOrder:u.renderOrder,z:l,group:d},a[t]=_):(_.id=u.id,_.object=u,_.geometry=f,_.material=m,_.groupOrder=g,_.renderOrder=u.renderOrder,_.z=l,_.group=d),t++,_}function r(u,f,m,g,l,d){let _=o(u,f,m,g,l,d);m.transmission>0?n.push(_):m.transparent===!0?i.push(_):e.push(_)}function c(u,f,m,g,l,d){let _=o(u,f,m,g,l,d);m.transmission>0?n.unshift(_):m.transparent===!0?i.unshift(_):e.unshift(_)}function h(u,f){e.length>1&&e.sort(u||rf),n.length>1&&n.sort(f||so),i.length>1&&i.sort(f||so)}function p(){for(let u=t,f=a.length;u<f;u++){let m=a[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:n,transparent:i,init:s,push:r,unshift:c,finish:p,sort:h}}function af(){let a=new WeakMap;function t(n,i){let s=a.get(n),o;return s===void 0?(o=new ro,a.set(n,[o])):i>=s.length?(o=new ro,s.push(o)):o=s[i],o}function e(){a=new WeakMap}return{get:t,dispose:e}}function of(){let a={};return{get:function(t){if(a[t.id]!==void 0)return a[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new $,color:new Gt};break;case"SpotLight":e={position:new $,direction:new $,color:new Gt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new $,color:new Gt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new $,skyColor:new Gt,groundColor:new Gt};break;case"RectAreaLight":e={color:new Gt,position:new $,halfWidth:new $,halfHeight:new $};break}return a[t.id]=e,e}}}function lf(){let a={};return{get:function(t){if(a[t.id]!==void 0)return a[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new zt};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new zt};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new zt,shadowCameraNear:1,shadowCameraFar:1e3};break}return a[t.id]=e,e}}}var cf=0;function hf(a,t){return(t.castShadow?2:0)-(a.castShadow?2:0)+(t.map?1:0)-(a.map?1:0)}function uf(a,t){let e=new of,n=lf(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0};for(let p=0;p<9;p++)i.probe.push(new $);let s=new $,o=new ee,r=new ee;function c(p,u){let f=0,m=0,g=0;for(let N=0;N<9;N++)i.probe[N].set(0,0,0);let l=0,d=0,_=0,y=0,b=0,w=0,S=0,L=0,I=0,A=0;p.sort(hf);let z=u!==!0?Math.PI:1;for(let N=0,v=p.length;N<v;N++){let O=p[N],B=O.color,U=O.intensity,nt=O.distance,G=O.shadow&&O.shadow.map?O.shadow.map.texture:null;if(O.isAmbientLight)f+=B.r*U*z,m+=B.g*U*z,g+=B.b*U*z;else if(O.isLightProbe)for(let J=0;J<9;J++)i.probe[J].addScaledVector(O.sh.coefficients[J],U);else if(O.isDirectionalLight){let J=e.get(O);if(J.color.copy(O.color).multiplyScalar(O.intensity*z),O.castShadow){let C=O.shadow,R=n.get(O);R.shadowBias=C.bias,R.shadowNormalBias=C.normalBias,R.shadowRadius=C.radius,R.shadowMapSize=C.mapSize,i.directionalShadow[l]=R,i.directionalShadowMap[l]=G,i.directionalShadowMatrix[l]=O.shadow.matrix,w++}i.directional[l]=J,l++}else if(O.isSpotLight){let J=e.get(O);J.position.setFromMatrixPosition(O.matrixWorld),J.color.copy(B).multiplyScalar(U*z),J.distance=nt,J.coneCos=Math.cos(O.angle),J.penumbraCos=Math.cos(O.angle*(1-O.penumbra)),J.decay=O.decay,i.spot[_]=J;let C=O.shadow;if(O.map&&(i.spotLightMap[I]=O.map,I++,C.updateMatrices(O),O.castShadow&&A++),i.spotLightMatrix[_]=C.matrix,O.castShadow){let R=n.get(O);R.shadowBias=C.bias,R.shadowNormalBias=C.normalBias,R.shadowRadius=C.radius,R.shadowMapSize=C.mapSize,i.spotShadow[_]=R,i.spotShadowMap[_]=G,L++}_++}else if(O.isRectAreaLight){let J=e.get(O);J.color.copy(B).multiplyScalar(U),J.halfWidth.set(O.width*.5,0,0),J.halfHeight.set(0,O.height*.5,0),i.rectArea[y]=J,y++}else if(O.isPointLight){let J=e.get(O);if(J.color.copy(O.color).multiplyScalar(O.intensity*z),J.distance=O.distance,J.decay=O.decay,O.castShadow){let C=O.shadow,R=n.get(O);R.shadowBias=C.bias,R.shadowNormalBias=C.normalBias,R.shadowRadius=C.radius,R.shadowMapSize=C.mapSize,R.shadowCameraNear=C.camera.near,R.shadowCameraFar=C.camera.far,i.pointShadow[d]=R,i.pointShadowMap[d]=G,i.pointShadowMatrix[d]=O.shadow.matrix,S++}i.point[d]=J,d++}else if(O.isHemisphereLight){let J=e.get(O);J.skyColor.copy(O.color).multiplyScalar(U*z),J.groundColor.copy(O.groundColor).multiplyScalar(U*z),i.hemi[b]=J,b++}}y>0&&(t.isWebGL2||a.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=_t.LTC_FLOAT_1,i.rectAreaLTC2=_t.LTC_FLOAT_2):a.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=_t.LTC_HALF_1,i.rectAreaLTC2=_t.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=f,i.ambient[1]=m,i.ambient[2]=g;let T=i.hash;(T.directionalLength!==l||T.pointLength!==d||T.spotLength!==_||T.rectAreaLength!==y||T.hemiLength!==b||T.numDirectionalShadows!==w||T.numPointShadows!==S||T.numSpotShadows!==L||T.numSpotMaps!==I)&&(i.directional.length=l,i.spot.length=_,i.rectArea.length=y,i.point.length=d,i.hemi.length=b,i.directionalShadow.length=w,i.directionalShadowMap.length=w,i.pointShadow.length=S,i.pointShadowMap.length=S,i.spotShadow.length=L,i.spotShadowMap.length=L,i.directionalShadowMatrix.length=w,i.pointShadowMatrix.length=S,i.spotLightMatrix.length=L+I-A,i.spotLightMap.length=I,i.numSpotLightShadowsWithMaps=A,T.directionalLength=l,T.pointLength=d,T.spotLength=_,T.rectAreaLength=y,T.hemiLength=b,T.numDirectionalShadows=w,T.numPointShadows=S,T.numSpotShadows=L,T.numSpotMaps=I,i.version=cf++)}function h(p,u){let f=0,m=0,g=0,l=0,d=0,_=u.matrixWorldInverse;for(let y=0,b=p.length;y<b;y++){let w=p[y];if(w.isDirectionalLight){let S=i.directional[f];S.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(_),f++}else if(w.isSpotLight){let S=i.spot[g];S.position.setFromMatrixPosition(w.matrixWorld),S.position.applyMatrix4(_),S.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(_),g++}else if(w.isRectAreaLight){let S=i.rectArea[l];S.position.setFromMatrixPosition(w.matrixWorld),S.position.applyMatrix4(_),r.identity(),o.copy(w.matrixWorld),o.premultiply(_),r.extractRotation(o),S.halfWidth.set(w.width*.5,0,0),S.halfHeight.set(0,w.height*.5,0),S.halfWidth.applyMatrix4(r),S.halfHeight.applyMatrix4(r),l++}else if(w.isPointLight){let S=i.point[m];S.position.setFromMatrixPosition(w.matrixWorld),S.position.applyMatrix4(_),m++}else if(w.isHemisphereLight){let S=i.hemi[d];S.direction.setFromMatrixPosition(w.matrixWorld),S.direction.transformDirection(_),d++}}}return{setup:c,setupView:h,state:i}}function ao(a,t){let e=new uf(a,t),n=[],i=[];function s(){n.length=0,i.length=0}function o(u){n.push(u)}function r(u){i.push(u)}function c(u){e.setup(n,u)}function h(u){e.setupView(n,u)}return{init:s,state:{lightsArray:n,shadowsArray:i,lights:e},setupLights:c,setupLightsView:h,pushLight:o,pushShadow:r}}function df(a,t){let e=new WeakMap;function n(s,o=0){let r=e.get(s),c;return r===void 0?(c=new ao(a,t),e.set(s,[c])):o>=r.length?(c=new ao(a,t),r.push(c)):c=r[o],c}function i(){e=new WeakMap}return{get:n,dispose:i}}var vr=class extends ai{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Dl,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},yr=class extends ai{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.referencePosition=new $,this.nearDistance=1,this.farDistance=1e3,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.referencePosition.copy(t.referencePosition),this.nearDistance=t.nearDistance,this.farDistance=t.farDistance,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},ff=`void main() {
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
}`;function mf(a,t,e){let n=new os,i=new zt,s=new zt,o=new te,r=new vr({depthPacking:zl}),c=new yr,h={},p=e.maxTextureSize,u={0:Ae,1:ni,2:Fe},f=new ye({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new zt},radius:{value:4}},vertexShader:ff,fragmentShader:pf}),m=f.clone();m.defines.HORIZONTAL_PASS=1;let g=new $e;g.setAttribute("position",new Te(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let l=new fe(g,f),d=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=oo,this.render=function(w,S,L){if(d.enabled===!1||d.autoUpdate===!1&&d.needsUpdate===!1||w.length===0)return;let I=a.getRenderTarget(),A=a.getActiveCubeFace(),z=a.getActiveMipmapLevel(),T=a.state;T.setBlending(hn),T.buffers.color.setClear(1,1,1,1),T.buffers.depth.setTest(!0),T.setScissorTest(!1);for(let N=0,v=w.length;N<v;N++){let O=w[N],B=O.shadow;if(B===void 0){console.warn("THREE.WebGLShadowMap:",O,"has no shadow.");continue}if(B.autoUpdate===!1&&B.needsUpdate===!1)continue;i.copy(B.mapSize);let U=B.getFrameExtents();if(i.multiply(U),s.copy(B.mapSize),(i.x>p||i.y>p)&&(i.x>p&&(s.x=Math.floor(p/U.x),i.x=s.x*U.x,B.mapSize.x=s.x),i.y>p&&(s.y=Math.floor(p/U.y),i.y=s.y*U.y,B.mapSize.y=s.y)),B.map===null){let G=this.type!==_i?{minFilter:Jt,magFilter:Jt}:{};B.map=new De(i.x,i.y,G),B.map.texture.name=O.name+".shadowMap",B.camera.updateProjectionMatrix()}a.setRenderTarget(B.map),a.clear();let nt=B.getViewportCount();for(let G=0;G<nt;G++){let J=B.getViewport(G);o.set(s.x*J.x,s.y*J.y,s.x*J.z,s.y*J.w),T.viewport(o),B.updateMatrices(O,G),n=B.getFrustum(),b(S,L,B.camera,O,this.type)}B.isPointLightShadow!==!0&&this.type===_i&&_(B,L),B.needsUpdate=!1}d.needsUpdate=!1,a.setRenderTarget(I,A,z)};function _(w,S){let L=t.update(l);f.defines.VSM_SAMPLES!==w.blurSamples&&(f.defines.VSM_SAMPLES=w.blurSamples,m.defines.VSM_SAMPLES=w.blurSamples,f.needsUpdate=!0,m.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new De(i.x,i.y)),f.uniforms.shadow_pass.value=w.map.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,a.setRenderTarget(w.mapPass),a.clear(),a.renderBufferDirect(S,null,L,f,l,null),m.uniforms.shadow_pass.value=w.mapPass.texture,m.uniforms.resolution.value=w.mapSize,m.uniforms.radius.value=w.radius,a.setRenderTarget(w.map),a.clear(),a.renderBufferDirect(S,null,L,m,l,null)}function y(w,S,L,I,A,z){let T=null,N=L.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(N!==void 0?T=N:T=L.isPointLight===!0?c:r,a.localClippingEnabled&&S.clipShadows===!0&&Array.isArray(S.clippingPlanes)&&S.clippingPlanes.length!==0||S.displacementMap&&S.displacementScale!==0||S.alphaMap&&S.alphaTest>0){let v=T.uuid,O=S.uuid,B=h[v];B===void 0&&(B={},h[v]=B);let U=B[O];U===void 0&&(U=T.clone(),B[O]=U),T=U}return T.visible=S.visible,T.wireframe=S.wireframe,z===_i?T.side=S.shadowSide!==null?S.shadowSide:S.side:T.side=S.shadowSide!==null?S.shadowSide:u[S.side],T.alphaMap=S.alphaMap,T.alphaTest=S.alphaTest,T.clipShadows=S.clipShadows,T.clippingPlanes=S.clippingPlanes,T.clipIntersection=S.clipIntersection,T.displacementMap=S.displacementMap,T.displacementScale=S.displacementScale,T.displacementBias=S.displacementBias,T.wireframeLinewidth=S.wireframeLinewidth,T.linewidth=S.linewidth,L.isPointLight===!0&&T.isMeshDistanceMaterial===!0&&(T.referencePosition.setFromMatrixPosition(L.matrixWorld),T.nearDistance=I,T.farDistance=A),T}function b(w,S,L,I,A){if(w.visible===!1)return;if(w.layers.test(S.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&A===_i)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,w.matrixWorld);let N=t.update(w),v=w.material;if(Array.isArray(v)){let O=N.groups;for(let B=0,U=O.length;B<U;B++){let nt=O[B],G=v[nt.materialIndex];if(G&&G.visible){let J=y(w,G,I,L.near,L.far,A);a.renderBufferDirect(L,null,N,J,w,nt)}}}else if(v.visible){let O=y(w,v,I,L.near,L.far,A);a.renderBufferDirect(L,null,N,O,w,null)}}let T=w.children;for(let N=0,v=T.length;N<v;N++)b(T[N],S,L,I,A)}}function gf(a,t,e){let n=e.isWebGL2;function i(){let W=!1,vt=new te,mt=null,lt=new te(0,0,0,0);return{setMask:function(gt){mt!==gt&&!W&&(a.colorMask(gt,gt,gt,gt),mt=gt)},setLocked:function(gt){W=gt},setClear:function(gt,Pt,Ht,Yt,Qe){Qe===!0&&(gt*=Yt,Pt*=Yt,Ht*=Yt),vt.set(gt,Pt,Ht,Yt),lt.equals(vt)===!1&&(a.clearColor(gt,Pt,Ht,Yt),lt.copy(vt))},reset:function(){W=!1,mt=null,lt.set(-1,0,0,0)}}}function s(){let W=!1,vt=null,mt=null,lt=null;return{setTest:function(gt){gt?Tt(2929):Mt(2929)},setMask:function(gt){vt!==gt&&!W&&(a.depthMask(gt),vt=gt)},setFunc:function(gt){if(mt!==gt){switch(gt){case il:a.depthFunc(512);break;case sl:a.depthFunc(519);break;case rl:a.depthFunc(513);break;case er:a.depthFunc(515);break;case al:a.depthFunc(514);break;case ol:a.depthFunc(518);break;case ll:a.depthFunc(516);break;case cl:a.depthFunc(517);break;default:a.depthFunc(515)}mt=gt}},setLocked:function(gt){W=gt},setClear:function(gt){lt!==gt&&(a.clearDepth(gt),lt=gt)},reset:function(){W=!1,vt=null,mt=null,lt=null}}}function o(){let W=!1,vt=null,mt=null,lt=null,gt=null,Pt=null,Ht=null,Yt=null,Qe=null;return{setTest:function(Xt){W||(Xt?Tt(2960):Mt(2960))},setMask:function(Xt){vt!==Xt&&!W&&(a.stencilMask(Xt),vt=Xt)},setFunc:function(Xt,Ve,be){(mt!==Xt||lt!==Ve||gt!==be)&&(a.stencilFunc(Xt,Ve,be),mt=Xt,lt=Ve,gt=be)},setOp:function(Xt,Ve,be){(Pt!==Xt||Ht!==Ve||Yt!==be)&&(a.stencilOp(Xt,Ve,be),Pt=Xt,Ht=Ve,Yt=be)},setLocked:function(Xt){W=Xt},setClear:function(Xt){Qe!==Xt&&(a.clearStencil(Xt),Qe=Xt)},reset:function(){W=!1,vt=null,mt=null,lt=null,gt=null,Pt=null,Ht=null,Yt=null,Qe=null}}}let r=new i,c=new s,h=new o,p=new WeakMap,u=new WeakMap,f={},m={},g=new WeakMap,l=[],d=null,_=!1,y=null,b=null,w=null,S=null,L=null,I=null,A=null,z=!1,T=null,N=null,v=null,O=null,B=null,U=a.getParameter(35661),nt=!1,G=0,J=a.getParameter(7938);J.indexOf("WebGL")!==-1?(G=parseFloat(/^WebGL (\d)/.exec(J)[1]),nt=G>=1):J.indexOf("OpenGL ES")!==-1&&(G=parseFloat(/^OpenGL ES (\d)/.exec(J)[1]),nt=G>=2);let C=null,R={},it=a.getParameter(3088),Z=a.getParameter(2978),K=new te().fromArray(it),ft=new te().fromArray(Z);function At(W,vt,mt){let lt=new Uint8Array(4),gt=a.createTexture();a.bindTexture(W,gt),a.texParameteri(W,10241,9728),a.texParameteri(W,10240,9728);for(let Pt=0;Pt<mt;Pt++)a.texImage2D(vt+Pt,0,6408,1,1,0,6408,5121,lt);return gt}let et={};et[3553]=At(3553,3553,1),et[34067]=At(34067,34069,6),r.setClear(0,0,0,1),c.setClear(1),h.setClear(0),Tt(2929),c.setFunc(er),P(!1),V(Zr),Tt(2884),Q(hn);function Tt(W){f[W]!==!0&&(a.enable(W),f[W]=!0)}function Mt(W){f[W]!==!1&&(a.disable(W),f[W]=!1)}function bt(W,vt){return m[W]!==vt?(a.bindFramebuffer(W,vt),m[W]=vt,n&&(W===36009&&(m[36160]=vt),W===36160&&(m[36009]=vt)),!0):!1}function xt(W,vt){let mt=l,lt=!1;if(W)if(mt=g.get(vt),mt===void 0&&(mt=[],g.set(vt,mt)),W.isWebGLMultipleRenderTargets){let gt=W.texture;if(mt.length!==gt.length||mt[0]!==36064){for(let Pt=0,Ht=gt.length;Pt<Ht;Pt++)mt[Pt]=36064+Pt;mt.length=gt.length,lt=!0}}else mt[0]!==36064&&(mt[0]=36064,lt=!0);else mt[0]!==1029&&(mt[0]=1029,lt=!0);lt&&(e.isWebGL2?a.drawBuffers(mt):t.get("WEBGL_draw_buffers").drawBuffersWEBGL(mt))}function Dt(W){return d!==W?(a.useProgram(W),d=W,!0):!1}let x={[jn]:32774,[qo]:32778,[Zo]:32779};if(n)x[$r]=32775,x[Kr]=32776;else{let W=t.get("EXT_blend_minmax");W!==null&&(x[$r]=W.MIN_EXT,x[Kr]=W.MAX_EXT)}let X={[Yo]:0,[Jo]:1,[jo]:768,[lo]:770,[nl]:776,[tl]:774,[Ko]:772,[$o]:769,[co]:771,[el]:775,[Qo]:773};function Q(W,vt,mt,lt,gt,Pt,Ht,Yt){if(W===hn){_===!0&&(Mt(3042),_=!1);return}if(_===!1&&(Tt(3042),_=!0),W!==Xo){if(W!==y||Yt!==z){if((b!==jn||L!==jn)&&(a.blendEquation(32774),b=jn,L=jn),Yt)switch(W){case Qn:a.blendFuncSeparate(1,771,1,771);break;case Yr:a.blendFunc(1,1);break;case Jr:a.blendFuncSeparate(0,769,0,1);break;case jr:a.blendFuncSeparate(0,768,0,770);break;default:console.error("THREE.WebGLState: Invalid blending: ",W);break}else switch(W){case Qn:a.blendFuncSeparate(770,771,1,771);break;case Yr:a.blendFunc(770,1);break;case Jr:a.blendFuncSeparate(0,769,0,1);break;case jr:a.blendFunc(0,768);break;default:console.error("THREE.WebGLState: Invalid blending: ",W);break}w=null,S=null,I=null,A=null,y=W,z=Yt}return}gt=gt||vt,Pt=Pt||mt,Ht=Ht||lt,(vt!==b||gt!==L)&&(a.blendEquationSeparate(x[vt],x[gt]),b=vt,L=gt),(mt!==w||lt!==S||Pt!==I||Ht!==A)&&(a.blendFuncSeparate(X[mt],X[lt],X[Pt],X[Ht]),w=mt,S=lt,I=Pt,A=Ht),y=W,z=null}function k(W,vt){W.side===Fe?Mt(2884):Tt(2884);let mt=W.side===Ae;vt&&(mt=!mt),P(mt),W.blending===Qn&&W.transparent===!1?Q(hn):Q(W.blending,W.blendEquation,W.blendSrc,W.blendDst,W.blendEquationAlpha,W.blendSrcAlpha,W.blendDstAlpha,W.premultipliedAlpha),c.setFunc(W.depthFunc),c.setTest(W.depthTest),c.setMask(W.depthWrite),r.setMask(W.colorWrite);let lt=W.stencilWrite;h.setTest(lt),lt&&(h.setMask(W.stencilWriteMask),h.setFunc(W.stencilFunc,W.stencilRef,W.stencilFuncMask),h.setOp(W.stencilFail,W.stencilZFail,W.stencilZPass)),st(W.polygonOffset,W.polygonOffsetFactor,W.polygonOffsetUnits),W.alphaToCoverage===!0?Tt(32926):Mt(32926)}function P(W){T!==W&&(W?a.frontFace(2304):a.frontFace(2305),T=W)}function V(W){W!==Wo?(Tt(2884),W!==N&&(W===Zr?a.cullFace(1029):W===Ho?a.cullFace(1028):a.cullFace(1032))):Mt(2884),N=W}function rt(W){W!==v&&(nt&&a.lineWidth(W),v=W)}function st(W,vt,mt){W?(Tt(32823),(O!==vt||B!==mt)&&(a.polygonOffset(vt,mt),O=vt,B=mt)):Mt(32823)}function q(W){W?Tt(3089):Mt(3089)}function ut(W){W===void 0&&(W=33984+U-1),C!==W&&(a.activeTexture(W),C=W)}function E(W,vt,mt){mt===void 0&&(C===null?mt=33984+U-1:mt=C);let lt=R[mt];lt===void 0&&(lt={type:void 0,texture:void 0},R[mt]=lt),(lt.type!==W||lt.texture!==vt)&&(C!==mt&&(a.activeTexture(mt),C=mt),a.bindTexture(W,vt||et[W]),lt.type=W,lt.texture=vt)}function M(){let W=R[C];W!==void 0&&W.type!==void 0&&(a.bindTexture(W.type,null),W.type=void 0,W.texture=void 0)}function H(){try{a.compressedTexImage2D.apply(a,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function ot(){try{a.texSubImage2D.apply(a,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function ht(){try{a.texSubImage3D.apply(a,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function pt(){try{a.compressedTexSubImage2D.apply(a,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function Et(){try{a.texStorage2D.apply(a,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function F(){try{a.texStorage3D.apply(a,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function Y(){try{a.texImage2D.apply(a,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function dt(){try{a.texImage3D.apply(a,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function wt(W){K.equals(W)===!1&&(a.scissor(W.x,W.y,W.z,W.w),K.copy(W))}function yt(W){ft.equals(W)===!1&&(a.viewport(W.x,W.y,W.z,W.w),ft.copy(W))}function St(W,vt){let mt=u.get(vt);mt===void 0&&(mt=new WeakMap,u.set(vt,mt));let lt=mt.get(W);lt===void 0&&(lt=a.getUniformBlockIndex(vt,W.name),mt.set(W,lt))}function Rt(W,vt){let lt=u.get(vt).get(W);p.get(W)!==lt&&(a.uniformBlockBinding(vt,lt,W.__bindingPointIndex),p.set(W,lt))}function Nt(){a.disable(3042),a.disable(2884),a.disable(2929),a.disable(32823),a.disable(3089),a.disable(2960),a.disable(32926),a.blendEquation(32774),a.blendFunc(1,0),a.blendFuncSeparate(1,0,1,0),a.colorMask(!0,!0,!0,!0),a.clearColor(0,0,0,0),a.depthMask(!0),a.depthFunc(513),a.clearDepth(1),a.stencilMask(4294967295),a.stencilFunc(519,0,4294967295),a.stencilOp(7680,7680,7680),a.clearStencil(0),a.cullFace(1029),a.frontFace(2305),a.polygonOffset(0,0),a.activeTexture(33984),a.bindFramebuffer(36160,null),n===!0&&(a.bindFramebuffer(36009,null),a.bindFramebuffer(36008,null)),a.useProgram(null),a.lineWidth(1),a.scissor(0,0,a.canvas.width,a.canvas.height),a.viewport(0,0,a.canvas.width,a.canvas.height),f={},C=null,R={},m={},g=new WeakMap,l=[],d=null,_=!1,y=null,b=null,w=null,S=null,L=null,I=null,A=null,z=!1,T=null,N=null,v=null,O=null,B=null,K.set(0,0,a.canvas.width,a.canvas.height),ft.set(0,0,a.canvas.width,a.canvas.height),r.reset(),c.reset(),h.reset()}return{buffers:{color:r,depth:c,stencil:h},enable:Tt,disable:Mt,bindFramebuffer:bt,drawBuffers:xt,useProgram:Dt,setBlending:Q,setMaterial:k,setFlipSided:P,setCullFace:V,setLineWidth:rt,setPolygonOffset:st,setScissorTest:q,activeTexture:ut,bindTexture:E,unbindTexture:M,compressedTexImage2D:H,texImage2D:Y,texImage3D:dt,updateUBOMapping:St,uniformBlockBinding:Rt,texStorage2D:Et,texStorage3D:F,texSubImage2D:ot,texSubImage3D:ht,compressedTexSubImage2D:pt,scissor:wt,viewport:yt,reset:Nt}}function _f(a,t,e,n,i,s,o){let r=i.isWebGL2,c=i.maxTextures,h=i.maxCubemapSize,p=i.maxTextureSize,u=i.maxSamples,f=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,m=/OculusBrowser/g.test(navigator.userAgent),g=new WeakMap,l,d=new WeakMap,_=!1;try{_=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch(E){}function y(E,M){return _?new OffscreenCanvas(E,M):Ki("canvas")}function b(E,M,H,ot){let ht=1;if((E.width>ot||E.height>ot)&&(ht=ot/Math.max(E.width,E.height)),ht<1||M===!0)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap){let pt=M?or:Math.floor,Et=pt(ht*E.width),F=pt(ht*E.height);l===void 0&&(l=y(Et,F));let Y=H?y(Et,F):l;return Y.width=Et,Y.height=F,Y.getContext("2d").drawImage(E,0,0,Et,F),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+E.width+"x"+E.height+") to ("+Et+"x"+F+")."),Y}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+E.width+"x"+E.height+")."),E;return E}function w(E){return Ca(E.width)&&Ca(E.height)}function S(E){return r?!1:E.wrapS!==ue||E.wrapT!==ue||E.minFilter!==Jt&&E.minFilter!==Se}function L(E,M){return E.generateMipmaps&&M&&E.minFilter!==Jt&&E.minFilter!==Se}function I(E){a.generateMipmap(E)}function A(E,M,H,ot,ht=!1){if(r===!1)return M;if(E!==null){if(a[E]!==void 0)return a[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let pt=M;return M===6403&&(H===5126&&(pt=33326),H===5131&&(pt=33325),H===5121&&(pt=33321)),M===33319&&(H===5126&&(pt=33328),H===5131&&(pt=33327),H===5121&&(pt=33323)),M===6408&&(H===5126&&(pt=34836),H===5131&&(pt=34842),H===5121&&(pt=ot===Zt&&ht===!1?35907:32856),H===32819&&(pt=32854),H===32820&&(pt=32855)),(pt===33325||pt===33326||pt===33327||pt===33328||pt===34842||pt===34836)&&t.get("EXT_color_buffer_float"),pt}function z(E,M,H){return L(E,H)===!0||E.isFramebufferTexture&&E.minFilter!==Jt&&E.minFilter!==Se?Math.log2(Math.max(M.width,M.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?M.mipmaps.length:1}function T(E){return E===Jt||E===Qr||E===ta?9728:9729}function N(E){let M=E.target;M.removeEventListener("dispose",N),O(M),M.isVideoTexture&&g.delete(M)}function v(E){let M=E.target;M.removeEventListener("dispose",v),U(M)}function O(E){let M=n.get(E);if(M.__webglInit===void 0)return;let H=E.source,ot=d.get(H);if(ot){let ht=ot[M.__cacheKey];ht.usedTimes--,ht.usedTimes===0&&B(E),Object.keys(ot).length===0&&d.delete(H)}n.remove(E)}function B(E){let M=n.get(E);a.deleteTexture(M.__webglTexture);let H=E.source,ot=d.get(H);delete ot[M.__cacheKey],o.memory.textures--}function U(E){let M=E.texture,H=n.get(E),ot=n.get(M);if(ot.__webglTexture!==void 0&&(a.deleteTexture(ot.__webglTexture),o.memory.textures--),E.depthTexture&&E.depthTexture.dispose(),E.isWebGLCubeRenderTarget)for(let ht=0;ht<6;ht++)a.deleteFramebuffer(H.__webglFramebuffer[ht]),H.__webglDepthbuffer&&a.deleteRenderbuffer(H.__webglDepthbuffer[ht]);else{if(a.deleteFramebuffer(H.__webglFramebuffer),H.__webglDepthbuffer&&a.deleteRenderbuffer(H.__webglDepthbuffer),H.__webglMultisampledFramebuffer&&a.deleteFramebuffer(H.__webglMultisampledFramebuffer),H.__webglColorRenderbuffer)for(let ht=0;ht<H.__webglColorRenderbuffer.length;ht++)H.__webglColorRenderbuffer[ht]&&a.deleteRenderbuffer(H.__webglColorRenderbuffer[ht]);H.__webglDepthRenderbuffer&&a.deleteRenderbuffer(H.__webglDepthRenderbuffer)}if(E.isWebGLMultipleRenderTargets)for(let ht=0,pt=M.length;ht<pt;ht++){let Et=n.get(M[ht]);Et.__webglTexture&&(a.deleteTexture(Et.__webglTexture),o.memory.textures--),n.remove(M[ht])}n.remove(M),n.remove(E)}let nt=0;function G(){nt=0}function J(){let E=nt;return E>=c&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+c),nt+=1,E}function C(E){let M=[];return M.push(E.wrapS),M.push(E.wrapT),M.push(E.magFilter),M.push(E.minFilter),M.push(E.anisotropy),M.push(E.internalFormat),M.push(E.format),M.push(E.type),M.push(E.generateMipmaps),M.push(E.premultiplyAlpha),M.push(E.flipY),M.push(E.unpackAlignment),M.push(E.encoding),M.join()}function R(E,M){let H=n.get(E);if(E.isVideoTexture&&q(E),E.isRenderTargetTexture===!1&&E.version>0&&H.__version!==E.version){let ot=E.image;if(ot===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ot.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Mt(H,E,M);return}}e.bindTexture(3553,H.__webglTexture,33984+M)}function it(E,M){let H=n.get(E);if(E.version>0&&H.__version!==E.version){Mt(H,E,M);return}e.bindTexture(35866,H.__webglTexture,33984+M)}function Z(E,M){let H=n.get(E);if(E.version>0&&H.__version!==E.version){Mt(H,E,M);return}e.bindTexture(32879,H.__webglTexture,33984+M)}function K(E,M){let H=n.get(E);if(E.version>0&&H.__version!==E.version){bt(H,E,M);return}e.bindTexture(34067,H.__webglTexture,33984+M)}let ft={[sr]:10497,[ue]:33071,[rr]:33648},At={[Jt]:9728,[Qr]:9984,[ta]:9986,[Se]:9729,[_l]:9985,[hs]:9987};function et(E,M,H){if(H?(a.texParameteri(E,10242,ft[M.wrapS]),a.texParameteri(E,10243,ft[M.wrapT]),(E===32879||E===35866)&&a.texParameteri(E,32882,ft[M.wrapR]),a.texParameteri(E,10240,At[M.magFilter]),a.texParameteri(E,10241,At[M.minFilter])):(a.texParameteri(E,10242,33071),a.texParameteri(E,10243,33071),(E===32879||E===35866)&&a.texParameteri(E,32882,33071),(M.wrapS!==ue||M.wrapT!==ue)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),a.texParameteri(E,10240,T(M.magFilter)),a.texParameteri(E,10241,T(M.minFilter)),M.minFilter!==Jt&&M.minFilter!==Se&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),t.has("EXT_texture_filter_anisotropic")===!0){let ot=t.get("EXT_texture_filter_anisotropic");if(M.type===Ue&&t.has("OES_texture_float_linear")===!1||r===!1&&M.type===yi&&t.has("OES_texture_half_float_linear")===!1)return;(M.anisotropy>1||n.get(M).__currentAnisotropy)&&(a.texParameterf(E,ot.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,i.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy)}}function Tt(E,M){let H=!1;E.__webglInit===void 0&&(E.__webglInit=!0,M.addEventListener("dispose",N));let ot=M.source,ht=d.get(ot);ht===void 0&&(ht={},d.set(ot,ht));let pt=C(M);if(pt!==E.__cacheKey){ht[pt]===void 0&&(ht[pt]={texture:a.createTexture(),usedTimes:0},o.memory.textures++,H=!0),ht[pt].usedTimes++;let Et=ht[E.__cacheKey];Et!==void 0&&(ht[E.__cacheKey].usedTimes--,Et.usedTimes===0&&B(M)),E.__cacheKey=pt,E.__webglTexture=ht[pt].texture}return H}function Mt(E,M,H){let ot=3553;M.isDataArrayTexture&&(ot=35866),M.isData3DTexture&&(ot=32879);let ht=Tt(E,M),pt=M.source;e.bindTexture(ot,E.__webglTexture,33984+H);let Et=n.get(pt);if(pt.version!==Et.__version||ht===!0){e.activeTexture(33984+H),a.pixelStorei(37440,M.flipY),a.pixelStorei(37441,M.premultiplyAlpha),a.pixelStorei(3317,M.unpackAlignment),a.pixelStorei(37443,0);let F=S(M)&&w(M.image)===!1,Y=b(M.image,F,!1,p);Y=ut(M,Y);let dt=w(Y)||r,wt=s.convert(M.format,M.encoding),yt=s.convert(M.type),St=A(M.internalFormat,wt,yt,M.encoding,M.isVideoTexture);et(ot,M,dt);let Rt,Nt=M.mipmaps,W=r&&M.isVideoTexture!==!0,vt=Et.__version===void 0||ht===!0,mt=z(M,Y,dt);if(M.isDepthTexture)St=6402,r?M.type===Ue?St=36012:M.type===vn?St=33190:M.type===ti?St=35056:St=33189:M.type===Ue&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),M.format===bn&&St===6402&&M.type!==fo&&M.type!==vn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),M.type=vn,yt=s.convert(M.type)),M.format===ri&&St===6402&&(St=34041,M.type!==ti&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),M.type=ti,yt=s.convert(M.type))),vt&&(W?e.texStorage2D(3553,1,St,Y.width,Y.height):e.texImage2D(3553,0,St,Y.width,Y.height,0,wt,yt,null));else if(M.isDataTexture)if(Nt.length>0&&dt){W&&vt&&e.texStorage2D(3553,mt,St,Nt[0].width,Nt[0].height);for(let lt=0,gt=Nt.length;lt<gt;lt++)Rt=Nt[lt],W?e.texSubImage2D(3553,lt,0,0,Rt.width,Rt.height,wt,yt,Rt.data):e.texImage2D(3553,lt,St,Rt.width,Rt.height,0,wt,yt,Rt.data);M.generateMipmaps=!1}else W?(vt&&e.texStorage2D(3553,mt,St,Y.width,Y.height),e.texSubImage2D(3553,0,0,0,Y.width,Y.height,wt,yt,Y.data)):e.texImage2D(3553,0,St,Y.width,Y.height,0,wt,yt,Y.data);else if(M.isCompressedTexture){W&&vt&&e.texStorage2D(3553,mt,St,Nt[0].width,Nt[0].height);for(let lt=0,gt=Nt.length;lt<gt;lt++)Rt=Nt[lt],M.format!==ve?wt!==null?W?e.compressedTexSubImage2D(3553,lt,0,0,Rt.width,Rt.height,wt,Rt.data):e.compressedTexImage2D(3553,lt,St,Rt.width,Rt.height,0,Rt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):W?e.texSubImage2D(3553,lt,0,0,Rt.width,Rt.height,wt,yt,Rt.data):e.texImage2D(3553,lt,St,Rt.width,Rt.height,0,wt,yt,Rt.data)}else if(M.isDataArrayTexture)W?(vt&&e.texStorage3D(35866,mt,St,Y.width,Y.height,Y.depth),e.texSubImage3D(35866,0,0,0,0,Y.width,Y.height,Y.depth,wt,yt,Y.data)):e.texImage3D(35866,0,St,Y.width,Y.height,Y.depth,0,wt,yt,Y.data);else if(M.isData3DTexture)W?(vt&&e.texStorage3D(32879,mt,St,Y.width,Y.height,Y.depth),e.texSubImage3D(32879,0,0,0,0,Y.width,Y.height,Y.depth,wt,yt,Y.data)):e.texImage3D(32879,0,St,Y.width,Y.height,Y.depth,0,wt,yt,Y.data);else if(M.isFramebufferTexture){if(vt)if(W)e.texStorage2D(3553,mt,St,Y.width,Y.height);else{let lt=Y.width,gt=Y.height;for(let Pt=0;Pt<mt;Pt++)e.texImage2D(3553,Pt,St,lt,gt,0,wt,yt,null),lt>>=1,gt>>=1}}else if(Nt.length>0&&dt){W&&vt&&e.texStorage2D(3553,mt,St,Nt[0].width,Nt[0].height);for(let lt=0,gt=Nt.length;lt<gt;lt++)Rt=Nt[lt],W?e.texSubImage2D(3553,lt,0,0,wt,yt,Rt):e.texImage2D(3553,lt,St,wt,yt,Rt);M.generateMipmaps=!1}else W?(vt&&e.texStorage2D(3553,mt,St,Y.width,Y.height),e.texSubImage2D(3553,0,0,0,wt,yt,Y)):e.texImage2D(3553,0,St,wt,yt,Y);L(M,dt)&&I(ot),Et.__version=pt.version,M.onUpdate&&M.onUpdate(M)}E.__version=M.version}function bt(E,M,H){if(M.image.length!==6)return;let ot=Tt(E,M),ht=M.source;e.bindTexture(34067,E.__webglTexture,33984+H);let pt=n.get(ht);if(ht.version!==pt.__version||ot===!0){e.activeTexture(33984+H),a.pixelStorei(37440,M.flipY),a.pixelStorei(37441,M.premultiplyAlpha),a.pixelStorei(3317,M.unpackAlignment),a.pixelStorei(37443,0);let Et=M.isCompressedTexture||M.image[0].isCompressedTexture,F=M.image[0]&&M.image[0].isDataTexture,Y=[];for(let lt=0;lt<6;lt++)!Et&&!F?Y[lt]=b(M.image[lt],!1,!0,h):Y[lt]=F?M.image[lt].image:M.image[lt],Y[lt]=ut(M,Y[lt]);let dt=Y[0],wt=w(dt)||r,yt=s.convert(M.format,M.encoding),St=s.convert(M.type),Rt=A(M.internalFormat,yt,St,M.encoding),Nt=r&&M.isVideoTexture!==!0,W=pt.__version===void 0||ot===!0,vt=z(M,dt,wt);et(34067,M,wt);let mt;if(Et){Nt&&W&&e.texStorage2D(34067,vt,Rt,dt.width,dt.height);for(let lt=0;lt<6;lt++){mt=Y[lt].mipmaps;for(let gt=0;gt<mt.length;gt++){let Pt=mt[gt];M.format!==ve?yt!==null?Nt?e.compressedTexSubImage2D(34069+lt,gt,0,0,Pt.width,Pt.height,yt,Pt.data):e.compressedTexImage2D(34069+lt,gt,Rt,Pt.width,Pt.height,0,Pt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Nt?e.texSubImage2D(34069+lt,gt,0,0,Pt.width,Pt.height,yt,St,Pt.data):e.texImage2D(34069+lt,gt,Rt,Pt.width,Pt.height,0,yt,St,Pt.data)}}}else{mt=M.mipmaps,Nt&&W&&(mt.length>0&&vt++,e.texStorage2D(34067,vt,Rt,Y[0].width,Y[0].height));for(let lt=0;lt<6;lt++)if(F){Nt?e.texSubImage2D(34069+lt,0,0,0,Y[lt].width,Y[lt].height,yt,St,Y[lt].data):e.texImage2D(34069+lt,0,Rt,Y[lt].width,Y[lt].height,0,yt,St,Y[lt].data);for(let gt=0;gt<mt.length;gt++){let Ht=mt[gt].image[lt].image;Nt?e.texSubImage2D(34069+lt,gt+1,0,0,Ht.width,Ht.height,yt,St,Ht.data):e.texImage2D(34069+lt,gt+1,Rt,Ht.width,Ht.height,0,yt,St,Ht.data)}}else{Nt?e.texSubImage2D(34069+lt,0,0,0,yt,St,Y[lt]):e.texImage2D(34069+lt,0,Rt,yt,St,Y[lt]);for(let gt=0;gt<mt.length;gt++){let Pt=mt[gt];Nt?e.texSubImage2D(34069+lt,gt+1,0,0,yt,St,Pt.image[lt]):e.texImage2D(34069+lt,gt+1,Rt,yt,St,Pt.image[lt])}}}L(M,wt)&&I(34067),pt.__version=ht.version,M.onUpdate&&M.onUpdate(M)}E.__version=M.version}function xt(E,M,H,ot,ht){let pt=s.convert(H.format,H.encoding),Et=s.convert(H.type),F=A(H.internalFormat,pt,Et,H.encoding);n.get(M).__hasExternalTextures||(ht===32879||ht===35866?e.texImage3D(ht,0,F,M.width,M.height,M.depth,0,pt,Et,null):e.texImage2D(ht,0,F,M.width,M.height,0,pt,Et,null)),e.bindFramebuffer(36160,E),st(M)?f.framebufferTexture2DMultisampleEXT(36160,ot,ht,n.get(H).__webglTexture,0,rt(M)):a.framebufferTexture2D(36160,ot,ht,n.get(H).__webglTexture,0),e.bindFramebuffer(36160,null)}function Dt(E,M,H){if(a.bindRenderbuffer(36161,E),M.depthBuffer&&!M.stencilBuffer){let ot=33189;if(H||st(M)){let ht=M.depthTexture;ht&&ht.isDepthTexture&&(ht.type===Ue?ot=36012:ht.type===vn&&(ot=33190));let pt=rt(M);st(M)?f.renderbufferStorageMultisampleEXT(36161,pt,ot,M.width,M.height):a.renderbufferStorageMultisample(36161,pt,ot,M.width,M.height)}else a.renderbufferStorage(36161,ot,M.width,M.height);a.framebufferRenderbuffer(36160,36096,36161,E)}else if(M.depthBuffer&&M.stencilBuffer){let ot=rt(M);H&&st(M)===!1?a.renderbufferStorageMultisample(36161,ot,35056,M.width,M.height):st(M)?f.renderbufferStorageMultisampleEXT(36161,ot,35056,M.width,M.height):a.renderbufferStorage(36161,34041,M.width,M.height),a.framebufferRenderbuffer(36160,33306,36161,E)}else{let ot=M.isWebGLMultipleRenderTargets===!0?M.texture:[M.texture];for(let ht=0;ht<ot.length;ht++){let pt=ot[ht],Et=s.convert(pt.format,pt.encoding),F=s.convert(pt.type),Y=A(pt.internalFormat,Et,F,pt.encoding),dt=rt(M);H&&st(M)===!1?a.renderbufferStorageMultisample(36161,dt,Y,M.width,M.height):st(M)?f.renderbufferStorageMultisampleEXT(36161,dt,Y,M.width,M.height):a.renderbufferStorage(36161,Y,M.width,M.height)}}a.bindRenderbuffer(36161,null)}function x(E,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(36160,E),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(M.depthTexture).__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),R(M.depthTexture,0);let ot=n.get(M.depthTexture).__webglTexture,ht=rt(M);if(M.depthTexture.format===bn)st(M)?f.framebufferTexture2DMultisampleEXT(36160,36096,3553,ot,0,ht):a.framebufferTexture2D(36160,36096,3553,ot,0);else if(M.depthTexture.format===ri)st(M)?f.framebufferTexture2DMultisampleEXT(36160,33306,3553,ot,0,ht):a.framebufferTexture2D(36160,33306,3553,ot,0);else throw new Error("Unknown depthTexture format")}function X(E){let M=n.get(E),H=E.isWebGLCubeRenderTarget===!0;if(E.depthTexture&&!M.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");x(M.__webglFramebuffer,E)}else if(H){M.__webglDepthbuffer=[];for(let ot=0;ot<6;ot++)e.bindFramebuffer(36160,M.__webglFramebuffer[ot]),M.__webglDepthbuffer[ot]=a.createRenderbuffer(),Dt(M.__webglDepthbuffer[ot],E,!1)}else e.bindFramebuffer(36160,M.__webglFramebuffer),M.__webglDepthbuffer=a.createRenderbuffer(),Dt(M.__webglDepthbuffer,E,!1);e.bindFramebuffer(36160,null)}function Q(E,M,H){let ot=n.get(E);M!==void 0&&xt(ot.__webglFramebuffer,E,E.texture,36064,3553),H!==void 0&&X(E)}function k(E){let M=E.texture,H=n.get(E),ot=n.get(M);E.addEventListener("dispose",v),E.isWebGLMultipleRenderTargets!==!0&&(ot.__webglTexture===void 0&&(ot.__webglTexture=a.createTexture()),ot.__version=M.version,o.memory.textures++);let ht=E.isWebGLCubeRenderTarget===!0,pt=E.isWebGLMultipleRenderTargets===!0,Et=w(E)||r;if(ht){H.__webglFramebuffer=[];for(let F=0;F<6;F++)H.__webglFramebuffer[F]=a.createFramebuffer()}else{if(H.__webglFramebuffer=a.createFramebuffer(),pt)if(i.drawBuffers){let F=E.texture;for(let Y=0,dt=F.length;Y<dt;Y++){let wt=n.get(F[Y]);wt.__webglTexture===void 0&&(wt.__webglTexture=a.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(r&&E.samples>0&&st(E)===!1){let F=pt?M:[M];H.__webglMultisampledFramebuffer=a.createFramebuffer(),H.__webglColorRenderbuffer=[],e.bindFramebuffer(36160,H.__webglMultisampledFramebuffer);for(let Y=0;Y<F.length;Y++){let dt=F[Y];H.__webglColorRenderbuffer[Y]=a.createRenderbuffer(),a.bindRenderbuffer(36161,H.__webglColorRenderbuffer[Y]);let wt=s.convert(dt.format,dt.encoding),yt=s.convert(dt.type),St=A(dt.internalFormat,wt,yt,dt.encoding,E.isXRRenderTarget===!0),Rt=rt(E);a.renderbufferStorageMultisample(36161,Rt,St,E.width,E.height),a.framebufferRenderbuffer(36160,36064+Y,36161,H.__webglColorRenderbuffer[Y])}a.bindRenderbuffer(36161,null),E.depthBuffer&&(H.__webglDepthRenderbuffer=a.createRenderbuffer(),Dt(H.__webglDepthRenderbuffer,E,!0)),e.bindFramebuffer(36160,null)}}if(ht){e.bindTexture(34067,ot.__webglTexture),et(34067,M,Et);for(let F=0;F<6;F++)xt(H.__webglFramebuffer[F],E,M,36064,34069+F);L(M,Et)&&I(34067),e.unbindTexture()}else if(pt){let F=E.texture;for(let Y=0,dt=F.length;Y<dt;Y++){let wt=F[Y],yt=n.get(wt);e.bindTexture(3553,yt.__webglTexture),et(3553,wt,Et),xt(H.__webglFramebuffer,E,wt,36064+Y,3553),L(wt,Et)&&I(3553)}e.unbindTexture()}else{let F=3553;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(r?F=E.isWebGL3DRenderTarget?32879:35866:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),e.bindTexture(F,ot.__webglTexture),et(F,M,Et),xt(H.__webglFramebuffer,E,M,36064,F),L(M,Et)&&I(F),e.unbindTexture()}E.depthBuffer&&X(E)}function P(E){let M=w(E)||r,H=E.isWebGLMultipleRenderTargets===!0?E.texture:[E.texture];for(let ot=0,ht=H.length;ot<ht;ot++){let pt=H[ot];if(L(pt,M)){let Et=E.isWebGLCubeRenderTarget?34067:3553,F=n.get(pt).__webglTexture;e.bindTexture(Et,F),I(Et),e.unbindTexture()}}}function V(E){if(r&&E.samples>0&&st(E)===!1){let M=E.isWebGLMultipleRenderTargets?E.texture:[E.texture],H=E.width,ot=E.height,ht=16384,pt=[],Et=E.stencilBuffer?33306:36096,F=n.get(E),Y=E.isWebGLMultipleRenderTargets===!0;if(Y)for(let dt=0;dt<M.length;dt++)e.bindFramebuffer(36160,F.__webglMultisampledFramebuffer),a.framebufferRenderbuffer(36160,36064+dt,36161,null),e.bindFramebuffer(36160,F.__webglFramebuffer),a.framebufferTexture2D(36009,36064+dt,3553,null,0);e.bindFramebuffer(36008,F.__webglMultisampledFramebuffer),e.bindFramebuffer(36009,F.__webglFramebuffer);for(let dt=0;dt<M.length;dt++){pt.push(36064+dt),E.depthBuffer&&pt.push(Et);let wt=F.__ignoreDepthValues!==void 0?F.__ignoreDepthValues:!1;if(wt===!1&&(E.depthBuffer&&(ht|=256),E.stencilBuffer&&(ht|=1024)),Y&&a.framebufferRenderbuffer(36008,36064,36161,F.__webglColorRenderbuffer[dt]),wt===!0&&(a.invalidateFramebuffer(36008,[Et]),a.invalidateFramebuffer(36009,[Et])),Y){let yt=n.get(M[dt]).__webglTexture;a.framebufferTexture2D(36009,36064,3553,yt,0)}a.blitFramebuffer(0,0,H,ot,0,0,H,ot,ht,9728),m&&a.invalidateFramebuffer(36008,pt)}if(e.bindFramebuffer(36008,null),e.bindFramebuffer(36009,null),Y)for(let dt=0;dt<M.length;dt++){e.bindFramebuffer(36160,F.__webglMultisampledFramebuffer),a.framebufferRenderbuffer(36160,36064+dt,36161,F.__webglColorRenderbuffer[dt]);let wt=n.get(M[dt]).__webglTexture;e.bindFramebuffer(36160,F.__webglFramebuffer),a.framebufferTexture2D(36009,36064+dt,3553,wt,0)}e.bindFramebuffer(36009,F.__webglMultisampledFramebuffer)}}function rt(E){return Math.min(u,E.samples)}function st(E){let M=n.get(E);return r&&E.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function q(E){let M=o.render.frame;g.get(E)!==M&&(g.set(E,M),E.update())}function ut(E,M){let H=E.encoding,ot=E.format,ht=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||E.format===ar||H!==je&&(H===Zt?r===!1?t.has("EXT_sRGB")===!0&&ot===ve?(E.format=ar,E.minFilter=Se,E.generateMipmaps=!1):M=Qi.sRGBToLinear(M):(ot!==ve||ht!==Mn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture encoding:",H)),M}this.allocateTextureUnit=J,this.resetTextureUnits=G,this.setTexture2D=R,this.setTexture2DArray=it,this.setTexture3D=Z,this.setTextureCube=K,this.rebindTextures=Q,this.setupRenderTarget=k,this.updateRenderTargetMipmap=P,this.updateMultisampleRenderTarget=V,this.setupDepthRenderbuffer=X,this.setupFrameBufferTexture=xt,this.useMultisampledRTT=st}function xf(a,t,e){let n=e.isWebGL2;function i(s,o=null){let r;if(s===Mn)return 5121;if(s===bl)return 32819;if(s===wl)return 32820;if(s===xl)return 5120;if(s===vl)return 5122;if(s===fo)return 5123;if(s===yl)return 5124;if(s===vn)return 5125;if(s===Ue)return 5126;if(s===yi)return n?5131:(r=t.get("OES_texture_half_float"),r!==null?r.HALF_FLOAT_OES:null);if(s===Ml)return 6406;if(s===ve)return 6408;if(s===Al)return 6409;if(s===Tl)return 6410;if(s===bn)return 6402;if(s===ri)return 34041;if(s===El)return 6403;if(s===Sl)return console.warn("THREE.WebGLRenderer: THREE.RGBFormat has been removed. Use THREE.RGBAFormat instead. https://github.com/mrdoob/three.js/pull/23228"),6408;if(s===ar)return r=t.get("EXT_sRGB"),r!==null?r.SRGB_ALPHA_EXT:null;if(s===Cl)return 36244;if(s===Rl)return 33319;if(s===Pl)return 33320;if(s===Ll)return 36249;if(s===Ms||s===Ss||s===As||s===Ts)if(o===Zt)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(s===Ms)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Ss)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===As)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Ts)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(s===Ms)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Ss)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===As)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Ts)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===ea||s===na||s===ia||s===sa)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(s===ea)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===na)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===ia)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===sa)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Il)return r=t.get("WEBGL_compressed_texture_etc1"),r!==null?r.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===ra||s===aa)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(s===ra)return o===Zt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(s===aa)return o===Zt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===oa||s===la||s===ca||s===ha||s===ua||s===da||s===fa||s===pa||s===ma||s===ga||s===_a||s===xa||s===va||s===ya)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(s===oa)return o===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===la)return o===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===ca)return o===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===ha)return o===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===ua)return o===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===da)return o===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===fa)return o===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===pa)return o===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===ma)return o===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===ga)return o===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===_a)return o===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===xa)return o===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===va)return o===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===ya)return o===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===ba)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(s===ba)return o===Zt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT}else return null;return s===ti?n?34042:(r=t.get("WEBGL_depth_texture"),r!==null?r.UNSIGNED_INT_24_8_WEBGL:null):a[s]!==void 0?a[s]:null}return{convert:i}}var br=class extends le{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},Kn=class extends ce{constructor(){super(),this.isGroup=!0,this.type="Group"}},vf={type:"move"},vi=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Kn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Kn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new $,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new $),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Kn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new $,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new $),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,s=null,o=null,r=this._targetRay,c=this._grip,h=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(h&&t.hand){o=!0;for(let l of t.hand.values()){let d=e.getJointPose(l,n);if(h.joints[l.jointName]===void 0){let y=new Kn;y.matrixAutoUpdate=!1,y.visible=!1,h.joints[l.jointName]=y,h.add(y)}let _=h.joints[l.jointName];d!==null&&(_.matrix.fromArray(d.transform.matrix),_.matrix.decompose(_.position,_.rotation,_.scale),_.jointRadius=d.radius),_.visible=d!==null}let p=h.joints["index-finger-tip"],u=h.joints["thumb-tip"],f=p.position.distanceTo(u.position),m=.02,g=.005;h.inputState.pinching&&f>m+g?(h.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!h.inputState.pinching&&f<=m-g&&(h.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));r!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(r.matrix.fromArray(i.transform.matrix),r.matrix.decompose(r.position,r.rotation,r.scale),i.linearVelocity?(r.hasLinearVelocity=!0,r.linearVelocity.copy(i.linearVelocity)):r.hasLinearVelocity=!1,i.angularVelocity?(r.hasAngularVelocity=!0,r.angularVelocity.copy(i.angularVelocity)):r.hasAngularVelocity=!1,this.dispatchEvent(vf)))}return r!==null&&(r.visible=i!==null),c!==null&&(c.visible=s!==null),h!==null&&(h.visible=o!==null),this}},wr=class extends pe{constructor(t,e,n,i,s,o,r,c,h,p){if(p=p!==void 0?p:bn,p!==bn&&p!==ri)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&p===bn&&(n=vn),n===void 0&&p===ri&&(n=ti),super(null,i,s,o,r,c,p,n,h),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=r!==void 0?r:Jt,this.minFilter=c!==void 0?c:Jt,this.flipY=!1,this.generateMipmaps=!1}},Mr=class extends Be{constructor(t,e){super();let n=this,i=null,s=1,o=null,r="local-floor",c=null,h=null,p=null,u=null,f=null,m=null,g=e.getContextAttributes(),l=null,d=null,_=[],y=[],b=new le;b.layers.enable(1),b.viewport=new te;let w=new le;w.layers.enable(2),w.viewport=new te;let S=[b,w],L=new br;L.layers.enable(1),L.layers.enable(2);let I=null,A=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(C){let R=_[C];return R===void 0&&(R=new vi,_[C]=R),R.getTargetRaySpace()},this.getControllerGrip=function(C){let R=_[C];return R===void 0&&(R=new vi,_[C]=R),R.getGripSpace()},this.getHand=function(C){let R=_[C];return R===void 0&&(R=new vi,_[C]=R),R.getHandSpace()};function z(C){let R=y.indexOf(C.inputSource);if(R===-1)return;let it=_[R];it!==void 0&&it.dispatchEvent({type:C.type,data:C.inputSource})}function T(){i.removeEventListener("select",z),i.removeEventListener("selectstart",z),i.removeEventListener("selectend",z),i.removeEventListener("squeeze",z),i.removeEventListener("squeezestart",z),i.removeEventListener("squeezeend",z),i.removeEventListener("end",T),i.removeEventListener("inputsourceschange",N);for(let C=0;C<_.length;C++){let R=y[C];R!==null&&(y[C]=null,_[C].disconnect(R))}I=null,A=null,t.setRenderTarget(l),f=null,u=null,p=null,i=null,d=null,J.stop(),n.isPresenting=!1,n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(C){s=C,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(C){r=C,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(C){c=C},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return p},this.getFrame=function(){return m},this.getSession=function(){return i},this.setSession=async function(C){if(i=C,i!==null){if(l=t.getRenderTarget(),i.addEventListener("select",z),i.addEventListener("selectstart",z),i.addEventListener("selectend",z),i.addEventListener("squeeze",z),i.addEventListener("squeezestart",z),i.addEventListener("squeezeend",z),i.addEventListener("end",T),i.addEventListener("inputsourceschange",N),g.xrCompatible!==!0&&await e.makeXRCompatible(),i.renderState.layers===void 0||t.capabilities.isWebGL2===!1){let R={antialias:i.renderState.layers===void 0?g.antialias:!0,alpha:g.alpha,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,e,R),i.updateRenderState({baseLayer:f}),d=new De(f.framebufferWidth,f.framebufferHeight,{format:ve,type:Mn,encoding:t.outputEncoding,stencilBuffer:g.stencil})}else{let R=null,it=null,Z=null;g.depth&&(Z=g.stencil?35056:33190,R=g.stencil?ri:bn,it=g.stencil?ti:vn);let K={colorFormat:32856,depthFormat:Z,scaleFactor:s};p=new XRWebGLBinding(i,e),u=p.createProjectionLayer(K),i.updateRenderState({layers:[u]}),d=new De(u.textureWidth,u.textureHeight,{format:ve,type:Mn,depthTexture:new wr(u.textureWidth,u.textureHeight,it,void 0,void 0,void 0,void 0,void 0,void 0,R),stencilBuffer:g.stencil,encoding:t.outputEncoding,samples:g.antialias?4:0});let ft=t.properties.get(d);ft.__ignoreDepthValues=u.ignoreDepthValues}d.isXRRenderTarget=!0,this.setFoveation(1),c=null,o=await i.requestReferenceSpace(r),J.setContext(i),J.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}};function N(C){for(let R=0;R<C.removed.length;R++){let it=C.removed[R],Z=y.indexOf(it);Z>=0&&(y[Z]=null,_[Z].dispatchEvent({type:"disconnected",data:it}))}for(let R=0;R<C.added.length;R++){let it=C.added[R],Z=y.indexOf(it);if(Z===-1){for(let ft=0;ft<_.length;ft++)if(ft>=y.length){y.push(it),Z=ft;break}else if(y[ft]===null){y[ft]=it,Z=ft;break}if(Z===-1)break}let K=_[Z];K&&K.dispatchEvent({type:"connected",data:it})}}let v=new $,O=new $;function B(C,R,it){v.setFromMatrixPosition(R.matrixWorld),O.setFromMatrixPosition(it.matrixWorld);let Z=v.distanceTo(O),K=R.projectionMatrix.elements,ft=it.projectionMatrix.elements,At=K[14]/(K[10]-1),et=K[14]/(K[10]+1),Tt=(K[9]+1)/K[5],Mt=(K[9]-1)/K[5],bt=(K[8]-1)/K[0],xt=(ft[8]+1)/ft[0],Dt=At*bt,x=At*xt,X=Z/(-bt+xt),Q=X*-bt;R.matrixWorld.decompose(C.position,C.quaternion,C.scale),C.translateX(Q),C.translateZ(X),C.matrixWorld.compose(C.position,C.quaternion,C.scale),C.matrixWorldInverse.copy(C.matrixWorld).invert();let k=At+X,P=et+X,V=Dt-Q,rt=x+(Z-Q),st=Tt*et/P*k,q=Mt*et/P*k;C.projectionMatrix.makePerspective(V,rt,st,q,k,P)}function U(C,R){R===null?C.matrixWorld.copy(C.matrix):C.matrixWorld.multiplyMatrices(R.matrixWorld,C.matrix),C.matrixWorldInverse.copy(C.matrixWorld).invert()}this.updateCamera=function(C){if(i===null)return;L.near=w.near=b.near=C.near,L.far=w.far=b.far=C.far,(I!==L.near||A!==L.far)&&(i.updateRenderState({depthNear:L.near,depthFar:L.far}),I=L.near,A=L.far);let R=C.parent,it=L.cameras;U(L,R);for(let K=0;K<it.length;K++)U(it[K],R);L.matrixWorld.decompose(L.position,L.quaternion,L.scale),C.matrix.copy(L.matrix),C.matrix.decompose(C.position,C.quaternion,C.scale);let Z=C.children;for(let K=0,ft=Z.length;K<ft;K++)Z[K].updateMatrixWorld(!0);it.length===2?B(L,b,w):L.projectionMatrix.copy(b.projectionMatrix)},this.getCamera=function(){return L},this.getFoveation=function(){if(u!==null)return u.fixedFoveation;if(f!==null)return f.fixedFoveation},this.setFoveation=function(C){u!==null&&(u.fixedFoveation=C),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=C)};let nt=null;function G(C,R){if(h=R.getViewerPose(c||o),m=R,h!==null){let it=h.views;f!==null&&(t.setRenderTargetFramebuffer(d,f.framebuffer),t.setRenderTarget(d));let Z=!1;it.length!==L.cameras.length&&(L.cameras.length=0,Z=!0);for(let K=0;K<it.length;K++){let ft=it[K],At=null;if(f!==null)At=f.getViewport(ft);else{let Tt=p.getViewSubImage(u,ft);At=Tt.viewport,K===0&&(t.setRenderTargetTextures(d,Tt.colorTexture,u.ignoreDepthValues?void 0:Tt.depthStencilTexture),t.setRenderTarget(d))}let et=S[K];et===void 0&&(et=new le,et.layers.enable(K),et.viewport=new te,S[K]=et),et.matrix.fromArray(ft.transform.matrix),et.projectionMatrix.fromArray(ft.projectionMatrix),et.viewport.set(At.x,At.y,At.width,At.height),K===0&&L.matrix.copy(et.matrix),Z===!0&&L.cameras.push(et)}}for(let it=0;it<_.length;it++){let Z=y[it],K=_[it];Z!==null&&K!==void 0&&K.update(Z,R,c||o)}nt&&nt(C,R),m=null}let J=new go;J.setAnimationLoop(G),this.setAnimationLoop=function(C){nt=C},this.dispose=function(){}}};function yf(a,t){function e(l,d){l.fogColor.value.copy(d.color),d.isFog?(l.fogNear.value=d.near,l.fogFar.value=d.far):d.isFogExp2&&(l.fogDensity.value=d.density)}function n(l,d,_,y,b){d.isMeshBasicMaterial||d.isMeshLambertMaterial?i(l,d):d.isMeshToonMaterial?(i(l,d),p(l,d)):d.isMeshPhongMaterial?(i(l,d),h(l,d)):d.isMeshStandardMaterial?(i(l,d),u(l,d),d.isMeshPhysicalMaterial&&f(l,d,b)):d.isMeshMatcapMaterial?(i(l,d),m(l,d)):d.isMeshDepthMaterial?i(l,d):d.isMeshDistanceMaterial?(i(l,d),g(l,d)):d.isMeshNormalMaterial?i(l,d):d.isLineBasicMaterial?(s(l,d),d.isLineDashedMaterial&&o(l,d)):d.isPointsMaterial?r(l,d,_,y):d.isSpriteMaterial?c(l,d):d.isShadowMaterial?(l.color.value.copy(d.color),l.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function i(l,d){l.opacity.value=d.opacity,d.color&&l.diffuse.value.copy(d.color),d.emissive&&l.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(l.map.value=d.map),d.alphaMap&&(l.alphaMap.value=d.alphaMap),d.bumpMap&&(l.bumpMap.value=d.bumpMap,l.bumpScale.value=d.bumpScale,d.side===Ae&&(l.bumpScale.value*=-1)),d.displacementMap&&(l.displacementMap.value=d.displacementMap,l.displacementScale.value=d.displacementScale,l.displacementBias.value=d.displacementBias),d.emissiveMap&&(l.emissiveMap.value=d.emissiveMap),d.normalMap&&(l.normalMap.value=d.normalMap,l.normalScale.value.copy(d.normalScale),d.side===Ae&&l.normalScale.value.negate()),d.specularMap&&(l.specularMap.value=d.specularMap),d.alphaTest>0&&(l.alphaTest.value=d.alphaTest);let _=t.get(d).envMap;if(_&&(l.envMap.value=_,l.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,l.reflectivity.value=d.reflectivity,l.ior.value=d.ior,l.refractionRatio.value=d.refractionRatio),d.lightMap){l.lightMap.value=d.lightMap;let w=a.physicallyCorrectLights!==!0?Math.PI:1;l.lightMapIntensity.value=d.lightMapIntensity*w}d.aoMap&&(l.aoMap.value=d.aoMap,l.aoMapIntensity.value=d.aoMapIntensity);let y;d.map?y=d.map:d.specularMap?y=d.specularMap:d.displacementMap?y=d.displacementMap:d.normalMap?y=d.normalMap:d.bumpMap?y=d.bumpMap:d.roughnessMap?y=d.roughnessMap:d.metalnessMap?y=d.metalnessMap:d.alphaMap?y=d.alphaMap:d.emissiveMap?y=d.emissiveMap:d.clearcoatMap?y=d.clearcoatMap:d.clearcoatNormalMap?y=d.clearcoatNormalMap:d.clearcoatRoughnessMap?y=d.clearcoatRoughnessMap:d.iridescenceMap?y=d.iridescenceMap:d.iridescenceThicknessMap?y=d.iridescenceThicknessMap:d.specularIntensityMap?y=d.specularIntensityMap:d.specularColorMap?y=d.specularColorMap:d.transmissionMap?y=d.transmissionMap:d.thicknessMap?y=d.thicknessMap:d.sheenColorMap?y=d.sheenColorMap:d.sheenRoughnessMap&&(y=d.sheenRoughnessMap),y!==void 0&&(y.isWebGLRenderTarget&&(y=y.texture),y.matrixAutoUpdate===!0&&y.updateMatrix(),l.uvTransform.value.copy(y.matrix));let b;d.aoMap?b=d.aoMap:d.lightMap&&(b=d.lightMap),b!==void 0&&(b.isWebGLRenderTarget&&(b=b.texture),b.matrixAutoUpdate===!0&&b.updateMatrix(),l.uv2Transform.value.copy(b.matrix))}function s(l,d){l.diffuse.value.copy(d.color),l.opacity.value=d.opacity}function o(l,d){l.dashSize.value=d.dashSize,l.totalSize.value=d.dashSize+d.gapSize,l.scale.value=d.scale}function r(l,d,_,y){l.diffuse.value.copy(d.color),l.opacity.value=d.opacity,l.size.value=d.size*_,l.scale.value=y*.5,d.map&&(l.map.value=d.map),d.alphaMap&&(l.alphaMap.value=d.alphaMap),d.alphaTest>0&&(l.alphaTest.value=d.alphaTest);let b;d.map?b=d.map:d.alphaMap&&(b=d.alphaMap),b!==void 0&&(b.matrixAutoUpdate===!0&&b.updateMatrix(),l.uvTransform.value.copy(b.matrix))}function c(l,d){l.diffuse.value.copy(d.color),l.opacity.value=d.opacity,l.rotation.value=d.rotation,d.map&&(l.map.value=d.map),d.alphaMap&&(l.alphaMap.value=d.alphaMap),d.alphaTest>0&&(l.alphaTest.value=d.alphaTest);let _;d.map?_=d.map:d.alphaMap&&(_=d.alphaMap),_!==void 0&&(_.matrixAutoUpdate===!0&&_.updateMatrix(),l.uvTransform.value.copy(_.matrix))}function h(l,d){l.specular.value.copy(d.specular),l.shininess.value=Math.max(d.shininess,1e-4)}function p(l,d){d.gradientMap&&(l.gradientMap.value=d.gradientMap)}function u(l,d){l.roughness.value=d.roughness,l.metalness.value=d.metalness,d.roughnessMap&&(l.roughnessMap.value=d.roughnessMap),d.metalnessMap&&(l.metalnessMap.value=d.metalnessMap),t.get(d).envMap&&(l.envMapIntensity.value=d.envMapIntensity)}function f(l,d,_){l.ior.value=d.ior,d.sheen>0&&(l.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),l.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(l.sheenColorMap.value=d.sheenColorMap),d.sheenRoughnessMap&&(l.sheenRoughnessMap.value=d.sheenRoughnessMap)),d.clearcoat>0&&(l.clearcoat.value=d.clearcoat,l.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(l.clearcoatMap.value=d.clearcoatMap),d.clearcoatRoughnessMap&&(l.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap),d.clearcoatNormalMap&&(l.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),l.clearcoatNormalMap.value=d.clearcoatNormalMap,d.side===Ae&&l.clearcoatNormalScale.value.negate())),d.iridescence>0&&(l.iridescence.value=d.iridescence,l.iridescenceIOR.value=d.iridescenceIOR,l.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],l.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(l.iridescenceMap.value=d.iridescenceMap),d.iridescenceThicknessMap&&(l.iridescenceThicknessMap.value=d.iridescenceThicknessMap)),d.transmission>0&&(l.transmission.value=d.transmission,l.transmissionSamplerMap.value=_.texture,l.transmissionSamplerSize.value.set(_.width,_.height),d.transmissionMap&&(l.transmissionMap.value=d.transmissionMap),l.thickness.value=d.thickness,d.thicknessMap&&(l.thicknessMap.value=d.thicknessMap),l.attenuationDistance.value=d.attenuationDistance,l.attenuationColor.value.copy(d.attenuationColor)),l.specularIntensity.value=d.specularIntensity,l.specularColor.value.copy(d.specularColor),d.specularIntensityMap&&(l.specularIntensityMap.value=d.specularIntensityMap),d.specularColorMap&&(l.specularColorMap.value=d.specularColorMap)}function m(l,d){d.matcap&&(l.matcap.value=d.matcap)}function g(l,d){l.referencePosition.value.copy(d.referencePosition),l.nearDistance.value=d.nearDistance,l.farDistance.value=d.farDistance}return{refreshFogUniforms:e,refreshMaterialUniforms:n}}function bf(a,t,e,n){let i={},s={},o=[],r=e.isWebGL2?a.getParameter(35375):0;function c(y,b){let w=b.program;n.uniformBlockBinding(y,w)}function h(y,b){let w=i[y.id];w===void 0&&(g(y),w=p(y),i[y.id]=w,y.addEventListener("dispose",d));let S=b.program;n.updateUBOMapping(y,S);let L=t.render.frame;s[y.id]!==L&&(f(y),s[y.id]=L)}function p(y){let b=u();y.__bindingPointIndex=b;let w=a.createBuffer(),S=y.__size,L=y.usage;return a.bindBuffer(35345,w),a.bufferData(35345,S,L),a.bindBuffer(35345,null),a.bindBufferBase(35345,b,w),w}function u(){for(let y=0;y<r;y++)if(o.indexOf(y)===-1)return o.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(y){let b=i[y.id],w=y.uniforms,S=y.__cache;a.bindBuffer(35345,b);for(let L=0,I=w.length;L<I;L++){let A=w[L];if(m(A,L,S)===!0){let z=A.value,T=A.__offset;typeof z=="number"?(A.__data[0]=z,a.bufferSubData(35345,T,A.__data)):(A.value.isMatrix3?(A.__data[0]=A.value.elements[0],A.__data[1]=A.value.elements[1],A.__data[2]=A.value.elements[2],A.__data[3]=A.value.elements[0],A.__data[4]=A.value.elements[3],A.__data[5]=A.value.elements[4],A.__data[6]=A.value.elements[5],A.__data[7]=A.value.elements[0],A.__data[8]=A.value.elements[6],A.__data[9]=A.value.elements[7],A.__data[10]=A.value.elements[8],A.__data[11]=A.value.elements[0]):z.toArray(A.__data),a.bufferSubData(35345,T,A.__data))}}a.bindBuffer(35345,null)}function m(y,b,w){let S=y.value;if(w[b]===void 0)return typeof S=="number"?w[b]=S:w[b]=S.clone(),!0;if(typeof S=="number"){if(w[b]!==S)return w[b]=S,!0}else{let L=w[b];if(L.equals(S)===!1)return L.copy(S),!0}return!1}function g(y){let b=y.uniforms,w=0,S=16,L=0;for(let I=0,A=b.length;I<A;I++){let z=b[I],T=l(z);if(z.__data=new Float32Array(T.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=w,I>0){L=w%S;let N=S-L;L!==0&&N-T.boundary<0&&(w+=S-L,z.__offset=w)}w+=T.storage}return L=w%S,L>0&&(w+=S-L),y.__size=w,y.__cache={},this}function l(y){let b=y.value,w={boundary:0,storage:0};return typeof b=="number"?(w.boundary=4,w.storage=4):b.isVector2?(w.boundary=8,w.storage=8):b.isVector3||b.isColor?(w.boundary=16,w.storage=12):b.isVector4?(w.boundary=16,w.storage=16):b.isMatrix3?(w.boundary=48,w.storage=48):b.isMatrix4?(w.boundary=64,w.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),w}function d(y){let b=y.target;b.removeEventListener("dispose",d);let w=o.indexOf(b.__bindingPointIndex);o.splice(w,1),a.deleteBuffer(i[b.id]),delete i[b.id],delete s[b.id]}function _(){for(let y in i)a.deleteBuffer(i[y]);o=[],i={},s={}}return{bind:c,update:h,dispose:_}}function wf(){let a=Ki("canvas");return a.style.display="block",a}function kr(a={}){this.isWebGLRenderer=!0;let t=a.canvas!==void 0?a.canvas:wf(),e=a.context!==void 0?a.context:null,n=a.depth!==void 0?a.depth:!0,i=a.stencil!==void 0?a.stencil:!0,s=a.antialias!==void 0?a.antialias:!1,o=a.premultipliedAlpha!==void 0?a.premultipliedAlpha:!0,r=a.preserveDrawingBuffer!==void 0?a.preserveDrawingBuffer:!1,c=a.powerPreference!==void 0?a.powerPreference:"default",h=a.failIfMajorPerformanceCaveat!==void 0?a.failIfMajorPerformanceCaveat:!1,p;e!==null?p=e.getContextAttributes().alpha:p=a.alpha!==void 0?a.alpha:!1;let u=null,f=null,m=[],g=[];this.domElement=t,this.debug={checkShaderErrors:!0},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.outputEncoding=je,this.physicallyCorrectLights=!1,this.toneMapping=Ie,this.toneMappingExposure=1,Object.defineProperties(this,{gammaFactor:{get:function(){return console.warn("THREE.WebGLRenderer: .gammaFactor has been removed."),2},set:function(){console.warn("THREE.WebGLRenderer: .gammaFactor has been removed.")}}});let l=this,d=!1,_=0,y=0,b=null,w=-1,S=null,L=new te,I=new te,A=null,z=t.width,T=t.height,N=1,v=null,O=null,B=new te(0,0,z,T),U=new te(0,0,z,T),nt=!1,G=new os,J=!1,C=!1,R=null,it=new ee,Z=new zt,K=new $,ft={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function At(){return b===null?N:1}let et=e;function Tt(D,tt){for(let at=0;at<D.length;at++){let j=D[at],ct=t.getContext(j,tt);if(ct!==null)return ct}return null}try{let D={alpha:!0,depth:n,stencil:i,antialias:s,premultipliedAlpha:o,preserveDrawingBuffer:r,powerPreference:c,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Dr}`),t.addEventListener("webglcontextlost",St,!1),t.addEventListener("webglcontextrestored",Rt,!1),t.addEventListener("webglcontextcreationerror",Nt,!1),et===null){let tt=["webgl2","webgl","experimental-webgl"];if(l.isWebGL1Renderer===!0&&tt.shift(),et=Tt(tt,D),et===null)throw Tt(tt)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}et.getShaderPrecisionFormat===void 0&&(et.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(D){throw console.error("THREE.WebGLRenderer: "+D.message),D}let Mt,bt,xt,Dt,x,X,Q,k,P,V,rt,st,q,ut,E,M,H,ot,ht,pt,Et,F,Y,dt;function wt(){Mt=new Wu(et),bt=new Ou(et,Mt,a),Mt.init(bt),F=new xf(et,Mt,bt),xt=new gf(et,Mt,bt),Dt=new Xu,x=new sf,X=new _f(et,Mt,xt,x,bt,F,Dt),Q=new Fu(l),k=new Vu(l),P=new nc(et,bt),Y=new zu(et,Mt,P,bt),V=new Hu(et,P,Dt,Y),rt=new Ju(et,V,P,Dt),ht=new Yu(et,bt,X),M=new Nu(x),st=new nf(l,Q,k,Mt,bt,Y,M),q=new yf(l,x),ut=new af,E=new df(Mt,bt),ot=new Du(l,Q,xt,rt,p,o),H=new mf(l,rt,bt),dt=new bf(et,Dt,bt,xt),pt=new ku(et,Mt,Dt,bt),Et=new Gu(et,Mt,Dt,bt),Dt.programs=st.programs,l.capabilities=bt,l.extensions=Mt,l.properties=x,l.renderLists=ut,l.shadowMap=H,l.state=xt,l.info=Dt}wt();let yt=new Mr(l,et);this.xr=yt,this.getContext=function(){return et},this.getContextAttributes=function(){return et.getContextAttributes()},this.forceContextLoss=function(){let D=Mt.get("WEBGL_lose_context");D&&D.loseContext()},this.forceContextRestore=function(){let D=Mt.get("WEBGL_lose_context");D&&D.restoreContext()},this.getPixelRatio=function(){return N},this.setPixelRatio=function(D){D!==void 0&&(N=D,this.setSize(z,T,!1))},this.getSize=function(D){return D.set(z,T)},this.setSize=function(D,tt,at){if(yt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}z=D,T=tt,t.width=Math.floor(D*N),t.height=Math.floor(tt*N),at!==!1&&(t.style.width=D+"px",t.style.height=tt+"px"),this.setViewport(0,0,D,tt)},this.getDrawingBufferSize=function(D){return D.set(z*N,T*N).floor()},this.setDrawingBufferSize=function(D,tt,at){z=D,T=tt,N=at,t.width=Math.floor(D*at),t.height=Math.floor(tt*at),this.setViewport(0,0,D,tt)},this.getCurrentViewport=function(D){return D.copy(L)},this.getViewport=function(D){return D.copy(B)},this.setViewport=function(D,tt,at,j){D.isVector4?B.set(D.x,D.y,D.z,D.w):B.set(D,tt,at,j),xt.viewport(L.copy(B).multiplyScalar(N).floor())},this.getScissor=function(D){return D.copy(U)},this.setScissor=function(D,tt,at,j){D.isVector4?U.set(D.x,D.y,D.z,D.w):U.set(D,tt,at,j),xt.scissor(I.copy(U).multiplyScalar(N).floor())},this.getScissorTest=function(){return nt},this.setScissorTest=function(D){xt.setScissorTest(nt=D)},this.setOpaqueSort=function(D){v=D},this.setTransparentSort=function(D){O=D},this.getClearColor=function(D){return D.copy(ot.getClearColor())},this.setClearColor=function(){ot.setClearColor.apply(ot,arguments)},this.getClearAlpha=function(){return ot.getClearAlpha()},this.setClearAlpha=function(){ot.setClearAlpha.apply(ot,arguments)},this.clear=function(D=!0,tt=!0,at=!0){let j=0;D&&(j|=16384),tt&&(j|=256),at&&(j|=1024),et.clear(j)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",St,!1),t.removeEventListener("webglcontextrestored",Rt,!1),t.removeEventListener("webglcontextcreationerror",Nt,!1),ut.dispose(),E.dispose(),x.dispose(),Q.dispose(),k.dispose(),rt.dispose(),Y.dispose(),dt.dispose(),st.dispose(),yt.dispose(),yt.removeEventListener("sessionstart",Pt),yt.removeEventListener("sessionend",Ht),R&&(R.dispose(),R=null),Yt.stop()};function St(D){D.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),d=!0}function Rt(){console.log("THREE.WebGLRenderer: Context Restored."),d=!1;let D=Dt.autoReset,tt=H.enabled,at=H.autoUpdate,j=H.needsUpdate,ct=H.type;wt(),Dt.autoReset=D,H.enabled=tt,H.autoUpdate=at,H.needsUpdate=j,H.type=ct}function Nt(D){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",D.statusMessage)}function W(D){let tt=D.target;tt.removeEventListener("dispose",W),vt(tt)}function vt(D){mt(D),x.remove(D)}function mt(D){let tt=x.get(D).programs;tt!==void 0&&(tt.forEach(function(at){st.releaseProgram(at)}),D.isShaderMaterial&&st.releaseShaderCache(D))}this.renderBufferDirect=function(D,tt,at,j,ct,Ct){tt===null&&(tt=ft);let Lt=ct.isMesh&&ct.matrixWorld.determinant()<0,kt=Ro(D,tt,at,j,ct);xt.setMaterial(j,Lt);let It=at.index,Wt=at.attributes.position;if(It===null){if(Wt===void 0||Wt.count===0)return}else if(It.count===0)return;let Ft=1;j.wireframe===!0&&(It=V.getWireframeAttribute(at),Ft=2),Y.setup(ct,j,kt,at,It);let Ut,qt=pt;It!==null&&(Ut=P.get(It),qt=Et,qt.setIndex(Ut));let dn=It!==null?It.count:Wt.count,Dn=at.drawRange.start*Ft,zn=at.drawRange.count*Ft,Oe=Ct!==null?Ct.start*Ft:0,Bt=Ct!==null?Ct.count*Ft:1/0,kn=Math.max(Dn,Oe),jt=Math.min(dn,Dn+zn,Oe+Bt)-1,we=Math.max(0,jt-kn+1);if(we!==0){if(ct.isMesh)j.wireframe===!0?(xt.setLineWidth(j.wireframeLinewidth*At()),qt.setMode(1)):qt.setMode(4);else if(ct.isLine){let tn=j.linewidth;tn===void 0&&(tn=1),xt.setLineWidth(tn*At()),ct.isLineSegments?qt.setMode(1):ct.isLineLoop?qt.setMode(2):qt.setMode(3)}else ct.isPoints?qt.setMode(0):ct.isSprite&&qt.setMode(4);if(ct.isInstancedMesh)qt.renderInstances(kn,we,ct.count);else if(at.isInstancedBufferGeometry){let tn=Math.min(at.instanceCount,at._maxInstanceCount);qt.renderInstances(kn,we,tn)}else qt.render(kn,we)}},this.compile=function(D,tt){function at(j,ct,Ct){j.transparent===!0&&j.side===Fe?(j.side=Ae,j.needsUpdate=!0,Ai(j,ct,Ct),j.side=ni,j.needsUpdate=!0,Ai(j,ct,Ct),j.side=Fe):Ai(j,ct,Ct)}f=E.get(D),f.init(),g.push(f),D.traverseVisible(function(j){j.isLight&&j.layers.test(tt.layers)&&(f.pushLight(j),j.castShadow&&f.pushShadow(j))}),f.setupLights(l.physicallyCorrectLights),D.traverse(function(j){let ct=j.material;if(ct)if(Array.isArray(ct))for(let Ct=0;Ct<ct.length;Ct++){let Lt=ct[Ct];at(Lt,D,j)}else at(ct,D,j)}),g.pop(),f=null};let lt=null;function gt(D){lt&&lt(D)}function Pt(){Yt.stop()}function Ht(){Yt.start()}let Yt=new go;Yt.setAnimationLoop(gt),typeof self<"u"&&Yt.setContext(self),this.setAnimationLoop=function(D){lt=D,yt.setAnimationLoop(D),D===null?Yt.stop():Yt.start()},yt.addEventListener("sessionstart",Pt),yt.addEventListener("sessionend",Ht),this.render=function(D,tt){if(tt!==void 0&&tt.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(d===!0)return;D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),tt.parent===null&&tt.matrixWorldAutoUpdate===!0&&tt.updateMatrixWorld(),yt.enabled===!0&&yt.isPresenting===!0&&(yt.cameraAutoUpdate===!0&&yt.updateCamera(tt),tt=yt.getCamera()),D.isScene===!0&&D.onBeforeRender(l,D,tt,b),f=E.get(D,g.length),f.init(),g.push(f),it.multiplyMatrices(tt.projectionMatrix,tt.matrixWorldInverse),G.setFromProjectionMatrix(it),C=this.localClippingEnabled,J=M.init(this.clippingPlanes,C,tt),u=ut.get(D,m.length),u.init(),m.push(u),Qe(D,tt,0,l.sortObjects),u.finish(),l.sortObjects===!0&&u.sort(v,O),J===!0&&M.beginShadows();let at=f.state.shadowsArray;if(H.render(at,D,tt),J===!0&&M.endShadows(),this.info.autoReset===!0&&this.info.reset(),ot.render(u,D),f.setupLights(l.physicallyCorrectLights),tt.isArrayCamera){let j=tt.cameras;for(let ct=0,Ct=j.length;ct<Ct;ct++){let Lt=j[ct];Xt(u,D,Lt,Lt.viewport)}}else Xt(u,D,tt);b!==null&&(X.updateMultisampleRenderTarget(b),X.updateRenderTargetMipmap(b)),D.isScene===!0&&D.onAfterRender(l,D,tt),Y.resetDefaultState(),w=-1,S=null,g.pop(),g.length>0?f=g[g.length-1]:f=null,m.pop(),m.length>0?u=m[m.length-1]:u=null};function Qe(D,tt,at,j){if(D.visible===!1)return;if(D.layers.test(tt.layers)){if(D.isGroup)at=D.renderOrder;else if(D.isLOD)D.autoUpdate===!0&&D.update(tt);else if(D.isLight)f.pushLight(D),D.castShadow&&f.pushShadow(D);else if(D.isSprite){if(!D.frustumCulled||G.intersectsSprite(D)){j&&K.setFromMatrixPosition(D.matrixWorld).applyMatrix4(it);let Lt=rt.update(D),kt=D.material;kt.visible&&u.push(D,Lt,kt,at,K.z,null)}}else if((D.isMesh||D.isLine||D.isPoints)&&(D.isSkinnedMesh&&D.skeleton.frame!==Dt.render.frame&&(D.skeleton.update(),D.skeleton.frame=Dt.render.frame),!D.frustumCulled||G.intersectsObject(D))){j&&K.setFromMatrixPosition(D.matrixWorld).applyMatrix4(it);let Lt=rt.update(D),kt=D.material;if(Array.isArray(kt)){let It=Lt.groups;for(let Wt=0,Ft=It.length;Wt<Ft;Wt++){let Ut=It[Wt],qt=kt[Ut.materialIndex];qt&&qt.visible&&u.push(D,Lt,qt,at,K.z,Ut)}}else kt.visible&&u.push(D,Lt,kt,at,K.z,null)}}let Ct=D.children;for(let Lt=0,kt=Ct.length;Lt<kt;Lt++)Qe(Ct[Lt],tt,at,j)}function Xt(D,tt,at,j){let ct=D.opaque,Ct=D.transmissive,Lt=D.transparent;f.setupLightsView(at),Ct.length>0&&Ve(ct,tt,at),j&&xt.viewport(L.copy(j)),ct.length>0&&be(ct,tt,at),Ct.length>0&&be(Ct,tt,at),Lt.length>0&&be(Lt,tt,at),xt.buffers.depth.setTest(!0),xt.buffers.depth.setMask(!0),xt.buffers.color.setMask(!0),xt.setPolygonOffset(!1)}function Ve(D,tt,at){let j=bt.isWebGL2;R===null&&(R=new De(1,1,{generateMipmaps:!0,type:Mt.has("EXT_color_buffer_half_float")?yi:Mn,minFilter:hs,samples:j&&s===!0?4:0})),l.getDrawingBufferSize(Z),j?R.setSize(Z.x,Z.y):R.setSize(or(Z.x),or(Z.y));let ct=l.getRenderTarget();l.setRenderTarget(R),l.clear();let Ct=l.toneMapping;l.toneMapping=Ie,be(D,tt,at),l.toneMapping=Ct,X.updateMultisampleRenderTarget(R),X.updateRenderTargetMipmap(R),l.setRenderTarget(ct)}function be(D,tt,at){let j=tt.isScene===!0?tt.overrideMaterial:null;for(let ct=0,Ct=D.length;ct<Ct;ct++){let Lt=D[ct],kt=Lt.object,It=Lt.geometry,Wt=j===null?Lt.material:j,Ft=Lt.group;kt.layers.test(at.layers)&&Co(kt,tt,at,It,Wt,Ft)}}function Co(D,tt,at,j,ct,Ct){D.onBeforeRender(l,tt,at,j,ct,Ct),D.modelViewMatrix.multiplyMatrices(at.matrixWorldInverse,D.matrixWorld),D.normalMatrix.getNormalMatrix(D.modelViewMatrix),ct.onBeforeRender(l,tt,at,j,D,Ct),ct.transparent===!0&&ct.side===Fe?(ct.side=Ae,ct.needsUpdate=!0,l.renderBufferDirect(at,tt,j,ct,D,Ct),ct.side=ni,ct.needsUpdate=!0,l.renderBufferDirect(at,tt,j,ct,D,Ct),ct.side=Fe):l.renderBufferDirect(at,tt,j,ct,D,Ct),D.onAfterRender(l,tt,at,j,ct,Ct)}function Ai(D,tt,at){tt.isScene!==!0&&(tt=ft);let j=x.get(D),ct=f.state.lights,Ct=f.state.shadowsArray,Lt=ct.state.version,kt=st.getParameters(D,ct.state,Ct,tt,at),It=st.getProgramCacheKey(kt),Wt=j.programs;j.environment=D.isMeshStandardMaterial?tt.environment:null,j.fog=tt.fog,j.envMap=(D.isMeshStandardMaterial?k:Q).get(D.envMap||j.environment),Wt===void 0&&(D.addEventListener("dispose",W),Wt=new Map,j.programs=Wt);let Ft=Wt.get(It);if(Ft!==void 0){if(j.currentProgram===Ft&&j.lightsStateVersion===Lt)return Gr(D,kt),Ft}else kt.uniforms=st.getUniforms(D),D.onBuild(at,kt,l),D.onBeforeCompile(kt,l),Ft=st.acquireProgram(kt,It),Wt.set(It,Ft),j.uniforms=kt.uniforms;let Ut=j.uniforms;(!D.isShaderMaterial&&!D.isRawShaderMaterial||D.clipping===!0)&&(Ut.clippingPlanes=M.uniform),Gr(D,kt),j.needsLights=Lo(D),j.lightsStateVersion=Lt,j.needsLights&&(Ut.ambientLightColor.value=ct.state.ambient,Ut.lightProbe.value=ct.state.probe,Ut.directionalLights.value=ct.state.directional,Ut.directionalLightShadows.value=ct.state.directionalShadow,Ut.spotLights.value=ct.state.spot,Ut.spotLightShadows.value=ct.state.spotShadow,Ut.rectAreaLights.value=ct.state.rectArea,Ut.ltc_1.value=ct.state.rectAreaLTC1,Ut.ltc_2.value=ct.state.rectAreaLTC2,Ut.pointLights.value=ct.state.point,Ut.pointLightShadows.value=ct.state.pointShadow,Ut.hemisphereLights.value=ct.state.hemi,Ut.directionalShadowMap.value=ct.state.directionalShadowMap,Ut.directionalShadowMatrix.value=ct.state.directionalShadowMatrix,Ut.spotShadowMap.value=ct.state.spotShadowMap,Ut.spotLightMatrix.value=ct.state.spotLightMatrix,Ut.spotLightMap.value=ct.state.spotLightMap,Ut.pointShadowMap.value=ct.state.pointShadowMap,Ut.pointShadowMatrix.value=ct.state.pointShadowMatrix);let qt=Ft.getUniforms(),dn=ei.seqWithValue(qt.seq,Ut);return j.currentProgram=Ft,j.uniformsList=dn,Ft}function Gr(D,tt){let at=x.get(D);at.outputEncoding=tt.outputEncoding,at.instancing=tt.instancing,at.skinning=tt.skinning,at.morphTargets=tt.morphTargets,at.morphNormals=tt.morphNormals,at.morphColors=tt.morphColors,at.morphTargetsCount=tt.morphTargetsCount,at.numClippingPlanes=tt.numClippingPlanes,at.numIntersection=tt.numClipIntersection,at.vertexAlphas=tt.vertexAlphas,at.vertexTangents=tt.vertexTangents,at.toneMapping=tt.toneMapping}function Ro(D,tt,at,j,ct){tt.isScene!==!0&&(tt=ft),X.resetTextureUnits();let Ct=tt.fog,Lt=j.isMeshStandardMaterial?tt.environment:null,kt=b===null?l.outputEncoding:b.isXRRenderTarget===!0?b.texture.encoding:je,It=(j.isMeshStandardMaterial?k:Q).get(j.envMap||Lt),Wt=j.vertexColors===!0&&!!at.attributes.color&&at.attributes.color.itemSize===4,Ft=!!j.normalMap&&!!at.attributes.tangent,Ut=!!at.morphAttributes.position,qt=!!at.morphAttributes.normal,dn=!!at.morphAttributes.color,Dn=j.toneMapped?l.toneMapping:Ie,zn=at.morphAttributes.position||at.morphAttributes.normal||at.morphAttributes.color,Oe=zn!==void 0?zn.length:0,Bt=x.get(j),kn=f.state.lights;if(J===!0&&(C===!0||D!==S)){let me=D===S&&j.id===w;M.setState(j,D,me)}let jt=!1;j.version===Bt.__version?(Bt.needsLights&&Bt.lightsStateVersion!==kn.state.version||Bt.outputEncoding!==kt||ct.isInstancedMesh&&Bt.instancing===!1||!ct.isInstancedMesh&&Bt.instancing===!0||ct.isSkinnedMesh&&Bt.skinning===!1||!ct.isSkinnedMesh&&Bt.skinning===!0||Bt.envMap!==It||j.fog===!0&&Bt.fog!==Ct||Bt.numClippingPlanes!==void 0&&(Bt.numClippingPlanes!==M.numPlanes||Bt.numIntersection!==M.numIntersection)||Bt.vertexAlphas!==Wt||Bt.vertexTangents!==Ft||Bt.morphTargets!==Ut||Bt.morphNormals!==qt||Bt.morphColors!==dn||Bt.toneMapping!==Dn||bt.isWebGL2===!0&&Bt.morphTargetsCount!==Oe)&&(jt=!0):(jt=!0,Bt.__version=j.version);let we=Bt.currentProgram;jt===!0&&(we=Ai(j,tt,ct));let tn=!1,di=!1,xs=!1,oe=we.getUniforms(),fn=Bt.uniforms;if(xt.useProgram(we.program)&&(tn=!0,di=!0,xs=!0),j.id!==w&&(w=j.id,di=!0),tn||S!==D){if(oe.setValue(et,"projectionMatrix",D.projectionMatrix),bt.logarithmicDepthBuffer&&oe.setValue(et,"logDepthBufFC",2/(Math.log(D.far+1)/Math.LN2)),S!==D&&(S=D,di=!0,xs=!0),j.isShaderMaterial||j.isMeshPhongMaterial||j.isMeshToonMaterial||j.isMeshStandardMaterial||j.envMap){let me=oe.map.cameraPosition;me!==void 0&&me.setValue(et,K.setFromMatrixPosition(D.matrixWorld))}(j.isMeshPhongMaterial||j.isMeshToonMaterial||j.isMeshLambertMaterial||j.isMeshBasicMaterial||j.isMeshStandardMaterial||j.isShaderMaterial)&&oe.setValue(et,"isOrthographic",D.isOrthographicCamera===!0),(j.isMeshPhongMaterial||j.isMeshToonMaterial||j.isMeshLambertMaterial||j.isMeshBasicMaterial||j.isMeshStandardMaterial||j.isShaderMaterial||j.isShadowMaterial||ct.isSkinnedMesh)&&oe.setValue(et,"viewMatrix",D.matrixWorldInverse)}if(ct.isSkinnedMesh){oe.setOptional(et,ct,"bindMatrix"),oe.setOptional(et,ct,"bindMatrixInverse");let me=ct.skeleton;me&&(bt.floatVertexTextures?(me.boneTexture===null&&me.computeBoneTexture(),oe.setValue(et,"boneTexture",me.boneTexture,X),oe.setValue(et,"boneTextureSize",me.boneTextureSize)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}let vs=at.morphAttributes;if((vs.position!==void 0||vs.normal!==void 0||vs.color!==void 0&&bt.isWebGL2===!0)&&ht.update(ct,at,j,we),(di||Bt.receiveShadow!==ct.receiveShadow)&&(Bt.receiveShadow=ct.receiveShadow,oe.setValue(et,"receiveShadow",ct.receiveShadow)),j.isMeshGouraudMaterial&&j.envMap!==null&&(fn.envMap.value=It,fn.flipEnvMap.value=It.isCubeTexture&&It.isRenderTargetTexture===!1?-1:1),di&&(oe.setValue(et,"toneMappingExposure",l.toneMappingExposure),Bt.needsLights&&Po(fn,xs),Ct&&j.fog===!0&&q.refreshFogUniforms(fn,Ct),q.refreshMaterialUniforms(fn,j,N,T,R),ei.upload(et,Bt.uniformsList,fn,X)),j.isShaderMaterial&&j.uniformsNeedUpdate===!0&&(ei.upload(et,Bt.uniformsList,fn,X),j.uniformsNeedUpdate=!1),j.isSpriteMaterial&&oe.setValue(et,"center",ct.center),oe.setValue(et,"modelViewMatrix",ct.modelViewMatrix),oe.setValue(et,"normalMatrix",ct.normalMatrix),oe.setValue(et,"modelMatrix",ct.matrixWorld),j.isShaderMaterial||j.isRawShaderMaterial){let me=j.uniformsGroups;for(let ys=0,Io=me.length;ys<Io;ys++)if(bt.isWebGL2){let Xr=me[ys];dt.update(Xr,we),dt.bind(Xr,we)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return we}function Po(D,tt){D.ambientLightColor.needsUpdate=tt,D.lightProbe.needsUpdate=tt,D.directionalLights.needsUpdate=tt,D.directionalLightShadows.needsUpdate=tt,D.pointLights.needsUpdate=tt,D.pointLightShadows.needsUpdate=tt,D.spotLights.needsUpdate=tt,D.spotLightShadows.needsUpdate=tt,D.rectAreaLights.needsUpdate=tt,D.hemisphereLights.needsUpdate=tt}function Lo(D){return D.isMeshLambertMaterial||D.isMeshToonMaterial||D.isMeshPhongMaterial||D.isMeshStandardMaterial||D.isShadowMaterial||D.isShaderMaterial&&D.lights===!0}this.getActiveCubeFace=function(){return _},this.getActiveMipmapLevel=function(){return y},this.getRenderTarget=function(){return b},this.setRenderTargetTextures=function(D,tt,at){x.get(D.texture).__webglTexture=tt,x.get(D.depthTexture).__webglTexture=at;let j=x.get(D);j.__hasExternalTextures=!0,j.__hasExternalTextures&&(j.__autoAllocateDepthBuffer=at===void 0,j.__autoAllocateDepthBuffer||Mt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),j.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(D,tt){let at=x.get(D);at.__webglFramebuffer=tt,at.__useDefaultFramebuffer=tt===void 0},this.setRenderTarget=function(D,tt=0,at=0){b=D,_=tt,y=at;let j=!0;if(D){let It=x.get(D);It.__useDefaultFramebuffer!==void 0?(xt.bindFramebuffer(36160,null),j=!1):It.__webglFramebuffer===void 0?X.setupRenderTarget(D):It.__hasExternalTextures&&X.rebindTextures(D,x.get(D.texture).__webglTexture,x.get(D.depthTexture).__webglTexture)}let ct=null,Ct=!1,Lt=!1;if(D){let It=D.texture;(It.isData3DTexture||It.isDataArrayTexture)&&(Lt=!0);let Wt=x.get(D).__webglFramebuffer;D.isWebGLCubeRenderTarget?(ct=Wt[tt],Ct=!0):bt.isWebGL2&&D.samples>0&&X.useMultisampledRTT(D)===!1?ct=x.get(D).__webglMultisampledFramebuffer:ct=Wt,L.copy(D.viewport),I.copy(D.scissor),A=D.scissorTest}else L.copy(B).multiplyScalar(N).floor(),I.copy(U).multiplyScalar(N).floor(),A=nt;if(xt.bindFramebuffer(36160,ct)&&bt.drawBuffers&&j&&xt.drawBuffers(D,ct),xt.viewport(L),xt.scissor(I),xt.setScissorTest(A),Ct){let It=x.get(D.texture);et.framebufferTexture2D(36160,36064,34069+tt,It.__webglTexture,at)}else if(Lt){let It=x.get(D.texture),Wt=tt||0;et.framebufferTextureLayer(36160,36064,It.__webglTexture,at||0,Wt)}w=-1},this.readRenderTargetPixels=function(D,tt,at,j,ct,Ct,Lt){if(!(D&&D.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let kt=x.get(D).__webglFramebuffer;if(D.isWebGLCubeRenderTarget&&Lt!==void 0&&(kt=kt[Lt]),kt){xt.bindFramebuffer(36160,kt);try{let It=D.texture,Wt=It.format,Ft=It.type;if(Wt!==ve&&F.convert(Wt)!==et.getParameter(35739)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}let Ut=Ft===yi&&(Mt.has("EXT_color_buffer_half_float")||bt.isWebGL2&&Mt.has("EXT_color_buffer_float"));if(Ft!==Mn&&F.convert(Ft)!==et.getParameter(35738)&&!(Ft===Ue&&(bt.isWebGL2||Mt.has("OES_texture_float")||Mt.has("WEBGL_color_buffer_float")))&&!Ut){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}tt>=0&&tt<=D.width-j&&at>=0&&at<=D.height-ct&&et.readPixels(tt,at,j,ct,F.convert(Wt),F.convert(Ft),Ct)}finally{let It=b!==null?x.get(b).__webglFramebuffer:null;xt.bindFramebuffer(36160,It)}}},this.copyFramebufferToTexture=function(D,tt,at=0){let j=Math.pow(2,-at),ct=Math.floor(tt.image.width*j),Ct=Math.floor(tt.image.height*j);X.setTexture2D(tt,0),et.copyTexSubImage2D(3553,at,0,0,D.x,D.y,ct,Ct),xt.unbindTexture()},this.copyTextureToTexture=function(D,tt,at,j=0){let ct=tt.image.width,Ct=tt.image.height,Lt=F.convert(at.format),kt=F.convert(at.type);X.setTexture2D(at,0),et.pixelStorei(37440,at.flipY),et.pixelStorei(37441,at.premultiplyAlpha),et.pixelStorei(3317,at.unpackAlignment),tt.isDataTexture?et.texSubImage2D(3553,j,D.x,D.y,ct,Ct,Lt,kt,tt.image.data):tt.isCompressedTexture?et.compressedTexSubImage2D(3553,j,D.x,D.y,tt.mipmaps[0].width,tt.mipmaps[0].height,Lt,tt.mipmaps[0].data):et.texSubImage2D(3553,j,D.x,D.y,Lt,kt,tt.image),j===0&&at.generateMipmaps&&et.generateMipmap(3553),xt.unbindTexture()},this.copyTextureToTexture3D=function(D,tt,at,j,ct=0){if(l.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}let Ct=D.max.x-D.min.x+1,Lt=D.max.y-D.min.y+1,kt=D.max.z-D.min.z+1,It=F.convert(j.format),Wt=F.convert(j.type),Ft;if(j.isData3DTexture)X.setTexture3D(j,0),Ft=32879;else if(j.isDataArrayTexture)X.setTexture2DArray(j,0),Ft=35866;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}et.pixelStorei(37440,j.flipY),et.pixelStorei(37441,j.premultiplyAlpha),et.pixelStorei(3317,j.unpackAlignment);let Ut=et.getParameter(3314),qt=et.getParameter(32878),dn=et.getParameter(3316),Dn=et.getParameter(3315),zn=et.getParameter(32877),Oe=at.isCompressedTexture?at.mipmaps[0]:at.image;et.pixelStorei(3314,Oe.width),et.pixelStorei(32878,Oe.height),et.pixelStorei(3316,D.min.x),et.pixelStorei(3315,D.min.y),et.pixelStorei(32877,D.min.z),at.isDataTexture||at.isData3DTexture?et.texSubImage3D(Ft,ct,tt.x,tt.y,tt.z,Ct,Lt,kt,It,Wt,Oe.data):at.isCompressedTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),et.compressedTexSubImage3D(Ft,ct,tt.x,tt.y,tt.z,Ct,Lt,kt,It,Oe.data)):et.texSubImage3D(Ft,ct,tt.x,tt.y,tt.z,Ct,Lt,kt,It,Wt,Oe),et.pixelStorei(3314,Ut),et.pixelStorei(32878,qt),et.pixelStorei(3316,dn),et.pixelStorei(3315,Dn),et.pixelStorei(32877,zn),ct===0&&j.generateMipmaps&&et.generateMipmap(Ft),xt.unbindTexture()},this.initTexture=function(D){D.isCubeTexture?X.setTextureCube(D,0):D.isData3DTexture?X.setTexture3D(D,0):D.isDataArrayTexture?X.setTexture2DArray(D,0):X.setTexture2D(D,0),xt.unbindTexture()},this.resetState=function(){_=0,y=0,b=null,xt.reset(),Y.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}var Sr=class extends kr{};Sr.prototype.isWebGL1Renderer=!0;var ci=class extends ce{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e}get autoUpdate(){return console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),this.matrixWorldAutoUpdate}set autoUpdate(t){console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),this.matrixWorldAutoUpdate=t}};var En=class extends pe{constructor(t=null,e=1,n=1,i,s,o,r,c,h=Jt,p=Jt,u,f){super(null,o,r,c,h,p,i,s,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};function cn(a,t,e){return bo(a)?new a.constructor(a.subarray(t,e!==void 0?e:a.length)):a.slice(t,e)}function Yi(a,t,e){return!a||!e&&a.constructor===t?a:typeof t.BYTES_PER_ELEMENT=="number"?new t(a):Array.prototype.slice.call(a)}function bo(a){return ArrayBuffer.isView(a)&&!(a instanceof DataView)}var hi=class{constructor(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,i=e[n],s=e[n-1];t:{e:{let o;n:{i:if(!(t<i)){for(let r=n+2;;){if(i===void 0){if(t<s)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===r)break;if(s=i,i=e[++n],t<i)break e}o=e.length;break n}if(!(t>=s)){let r=e[1];t<r&&(n=2,s=r);for(let c=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=s,s=e[--n-1],t>=s)break e}o=n,n=0;break n}break t}for(;n<o;){let r=n+o>>>1;t<e[r]?o=r:n=r+1}if(i=e[n],s=e[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,t,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=t*i;for(let o=0;o!==i;++o)e[o]=n[s+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Ar=class extends hi{constructor(t,e,n,i){super(t,e,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:wa,endingEnd:wa}}intervalChanged_(t,e,n){let i=this.parameterPositions,s=t-2,o=t+1,r=i[s],c=i[o];if(r===void 0)switch(this.getSettings_().endingStart){case Ma:s=t,r=2*e-n;break;case Sa:s=i.length-2,r=e+i[s]-i[s+1];break;default:s=t,r=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Ma:o=t,c=2*n-e;break;case Sa:o=1,c=n+i[1]-i[0];break;default:o=t-1,c=e}let h=(n-e)*.5,p=this.valueSize;this._weightPrev=h/(e-r),this._weightNext=h/(c-n),this._offsetPrev=s*p,this._offsetNext=o*p}interpolate_(t,e,n,i){let s=this.resultBuffer,o=this.sampleValues,r=this.valueSize,c=t*r,h=c-r,p=this._offsetPrev,u=this._offsetNext,f=this._weightPrev,m=this._weightNext,g=(n-e)/(i-e),l=g*g,d=l*g,_=-f*d+2*f*l-f*g,y=(1+f)*d+(-1.5-2*f)*l+(-.5+f)*g+1,b=(-1-m)*d+(1.5+m)*l+.5*g,w=m*d-m*l;for(let S=0;S!==r;++S)s[S]=_*o[p+S]+y*o[h+S]+b*o[c+S]+w*o[u+S];return s}},Tr=class extends hi{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let s=this.resultBuffer,o=this.sampleValues,r=this.valueSize,c=t*r,h=c-r,p=(n-e)/(i-e),u=1-p;for(let f=0;f!==r;++f)s[f]=o[h+f]*u+o[c+f]*p;return s}},Er=class extends hi{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t){return this.copySampleValue_(t-1)}},ke=class{constructor(t,e,n,i){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Yi(e,this.TimeBufferType),this.values=Yi(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Yi(t.times,Array),values:Yi(t.values,Array)};let i=t.getInterpolation();i!==t.DefaultInterpolation&&(n.interpolation=i)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Er(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Tr(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Ar(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case ji:e=this.InterpolantFactoryMethodDiscrete;break;case $i:e=this.InterpolantFactoryMethodLinear;break;case Es:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ji;case this.InterpolantFactoryMethodLinear:return $i;case this.InterpolantFactoryMethodSmooth:return Es}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]*=t}return this}trim(t,e){let n=this.times,i=n.length,s=0,o=i-1;for(;s!==i&&n[s]<t;)++s;for(;o!==-1&&n[o]>e;)--o;if(++o,s!==0||o!==i){s>=o&&(o=Math.max(o,1),s=o-1);let r=this.getValueSize();this.times=cn(n,s,o),this.values=cn(this.values,s*r,o*r)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let r=0;r!==s;r++){let c=n[r];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,r,c),t=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,r,c,o),t=!1;break}o=c}if(i!==void 0&&bo(i))for(let r=0,c=i.length;r!==c;++r){let h=i[r];if(isNaN(h)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,r,h),t=!1;break}}return t}optimize(){let t=cn(this.times),e=cn(this.values),n=this.getValueSize(),i=this.getInterpolation()===Es,s=t.length-1,o=1;for(let r=1;r<s;++r){let c=!1,h=t[r],p=t[r+1];if(h!==p&&(r!==1||h!==t[0]))if(i)c=!0;else{let u=r*n,f=u-n,m=u+n;for(let g=0;g!==n;++g){let l=e[u+g];if(l!==e[f+g]||l!==e[m+g]){c=!0;break}}}if(c){if(r!==o){t[o]=t[r];let u=r*n,f=o*n;for(let m=0;m!==n;++m)e[f+m]=e[u+m]}++o}}if(s>0){t[o]=t[s];for(let r=s*n,c=o*n,h=0;h!==n;++h)e[c+h]=e[r+h];++o}return o!==t.length?(this.times=cn(t,0,o),this.values=cn(e,0,o*n)):(this.times=t,this.values=e),this}clone(){let t=cn(this.times,0),e=cn(this.values,0),n=this.constructor,i=new n(this.name,t,e);return i.createInterpolant=this.createInterpolant,i}};ke.prototype.TimeBufferType=Float32Array;ke.prototype.ValueBufferType=Float32Array;ke.prototype.DefaultInterpolation=$i;var Cn=class extends ke{};Cn.prototype.ValueTypeName="bool";Cn.prototype.ValueBufferType=Array;Cn.prototype.DefaultInterpolation=ji;Cn.prototype.InterpolantFactoryMethodLinear=void 0;Cn.prototype.InterpolantFactoryMethodSmooth=void 0;var Cr=class extends ke{};Cr.prototype.ValueTypeName="color";var Rr=class extends ke{};Rr.prototype.ValueTypeName="number";var Pr=class extends hi{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let s=this.resultBuffer,o=this.sampleValues,r=this.valueSize,c=(n-e)/(i-e),h=t*r;for(let p=h+r;h!==p;h+=4)ze.slerpFlat(s,0,o,h-r,o,h,c);return s}},wi=class extends ke{InterpolantFactoryMethodLinear(t){return new Pr(this.times,this.values,this.getValueSize(),t)}};wi.prototype.ValueTypeName="quaternion";wi.prototype.DefaultInterpolation=$i;wi.prototype.InterpolantFactoryMethodSmooth=void 0;var Rn=class extends ke{};Rn.prototype.ValueTypeName="string";Rn.prototype.ValueBufferType=Array;Rn.prototype.DefaultInterpolation=ji;Rn.prototype.InterpolantFactoryMethodLinear=void 0;Rn.prototype.InterpolantFactoryMethodSmooth=void 0;var Lr=class extends ke{};Lr.prototype.ValueTypeName="vector";var Or="\\[\\]\\.:\\/",Mf=new RegExp("["+Or+"]","g"),Nr="[^"+Or+"]",Sf="[^"+Or.replace("\\.","")+"]",Af=/((?:WC+[\/:])*)/.source.replace("WC",Nr),Tf=/(WCOD+)?/.source.replace("WCOD",Sf),Ef=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Nr),Cf=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Nr),Rf=new RegExp("^"+Af+Tf+Ef+Cf+"$"),Pf=["material","materials","bones","map"],Ir=class{constructor(t,e,n){let i=n||Vt.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},Vt=class{constructor(t,e,n){this.path=e,this.parsedPath=n||Vt.parseTrackName(e),this.node=Vt.findNode(t,this.parsedPath.nodeName)||t,this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new Vt.Composite(t,e,n):new Vt(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Mf,"")}static parseTrackName(t){let e=Rf.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let s=n.nodeName.substring(i+1);Pf.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(s){for(let o=0;o<s.length;o++){let r=s[o];if(r.name===e||r.uuid===e)return r;let c=n(r.children);if(c)return c}return null},i=n(t.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)t[e++]=n[i]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,i=e.propertyName,s=e.propertyIndex;if(t||(t=Vt.findNode(this.rootNode,e.nodeName)||this.rootNode,this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.error("THREE.PropertyBinding: Trying to update node for track: "+this.path+" but it wasn't found.");return}if(n){let h=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let p=0;p<t.length;p++)if(t[p].name===h){h=p;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(h!==void 0){if(t[h]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[h]}}let o=t[i];if(o===void 0){let h=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+h+"."+i+" but it wasn't found.",t);return}let r=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?r=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(r=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[s]!==void 0&&(s=t.morphTargetDictionary[s])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][r]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Vt.Composite=Ir;Vt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Vt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Vt.prototype.GetterByBindingType=[Vt.prototype._getValue_direct,Vt.prototype._getValue_array,Vt.prototype._getValue_arrayElement,Vt.prototype._getValue_toArray];Vt.prototype.SetterByBindingTypeAndVersioning=[[Vt.prototype._setValue_direct,Vt.prototype._setValue_direct_setNeedsUpdate,Vt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Vt.prototype._setValue_array,Vt.prototype._setValue_array_setNeedsUpdate,Vt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Vt.prototype._setValue_arrayElement,Vt.prototype._setValue_arrayElement_setNeedsUpdate,Vt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Vt.prototype._setValue_fromArray,Vt.prototype._setValue_fromArray_setNeedsUpdate,Vt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var zf=new Float32Array(1);var Mi=class{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(he(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Dr}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Dr);var un={Circle:"Circle",Square:"Square",Fill:"Fill"};var ds=10,Fr=class extends HTMLElement{constructor(){super();$t(this,"ctx");$t(this,"overlayCtx");$t(this,"size");$t(this,"color","black");$t(this,"brushSize",.5);$t(this,"brushStyle",un.Circle);$t(this,"textures",Array(4).fill(null).map(()=>{let e=new En(new Uint8Array([0,0,0,0]),1,1);return e.needsUpdate=!0,e}));$t(this,"layers",Array(4).fill(null));$t(this,"layer",0);$t(this,"mouseDown",!1);this.attachShadow({mode:"open"}),this.size=256;let e=document.createElement("canvas");e.id="canvas",e.width=this.size,e.height=e.width,e.oncontextmenu=()=>!1,e.addEventListener("pointerdown",r=>this.handleMouseDown(r)),e.addEventListener("pointermove",r=>this.handleMouseMove(r)),e.addEventListener("pointerout",r=>this.handleMouseOut(r)),document.addEventListener("pointerup",r=>this.handleMouseUp(r)),this.ctx=e.getContext("2d",{willReadFrequently:!0});let n=document.createElement("canvas");n.id="overlay",n.width=e.width,n.height=e.height,this.overlayCtx=n.getContext("2d"),this.overlayCtx.fillStyle="black";let i=document.createElement("div");i.id="title";let s=document.createElement("slot");s.name="title",s.textContent="Placeholder",i.append(s);let o=document.createElement("style");o.textContent=`
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
`,this.initLayer(0),this.shadowRoot.append(o,e,n,i)}clear(e=!0){this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height),e&&this.invalidate(this.layer)}eventToCanvasCoords(e,n,i){let{offsetX:s,offsetY:o,movementX:r,movementY:c}=e,{width:h,height:p}=this.ctx.canvas.getBoundingClientRect();return{current:[s/h*this.ctx.canvas.width,o/p*this.ctx.canvas.height],previous:[(s-r)/h*this.ctx.canvas.width,(o-c)/p*this.ctx.canvas.height]}}handleMouseDown(e){if(this.layer==-1)return;this.mouseDown=!0,this.ctx.fillStyle=this.ctx.strokeStyle=this.color,this.color=="transparent"&&(this.ctx.fillStyle=this.ctx.strokeStyle="white");let{current:n}=this.eventToCanvasCoords(e);this.color=="transparent"&&(this.ctx.globalCompositeOperation="destination-out");let i=e.pointerType=="pen"?Math.max(e.pressure,.2):this.brushSize;ws(this.ctx,n,n,i*ds,this.brushStyle==un.Square),this.ctx.globalCompositeOperation="source-over",this.invalidate(this.layer)}handleMouseMove(e){let{current:n,previous:i}=this.eventToCanvasCoords(e),s=e.pointerType=="pen"?Math.max(e.pressure,.2):this.brushSize;if(this.overlayCtx.clearRect(0,0,this.overlayCtx.canvas.width,this.overlayCtx.canvas.height),this.overlayCtx.beginPath(),this.overlayCtx.fillStyle=this.color=="transparent"?"rgba(0,0,0,0.5)":this.color,this.brushStyle==un.Square){let o=s*ds;this.overlayCtx.fillRect(Math.floor(n[0])-o,Math.floor(n[1])-o,o*2,o*2)}else Ti(this.overlayCtx,n[0],n[1],s*ds);this.overlayCtx.fill(),this.mouseDown&&(this.color=="transparent"&&(this.ctx.globalCompositeOperation="destination-out"),ws(this.ctx,i,n,s*ds,this.brushStyle==un.Square),this.ctx.globalCompositeOperation="source-over",this.invalidate(this.layer))}handleMouseUp(e){this.mouseDown=!1}handleMouseOut(e){this.overlayCtx.clearRect(0,0,this.overlayCtx.canvas.width,this.overlayCtx.canvas.height),this.overlayCtx.beginPath()}invalidate(e){this.textures[e].image.data=this.ctx.getImageData(0,0,this.ctx.canvas.width,this.ctx.canvas.height),this.textures[e].needsUpdate=!0}initLayer(e){this.textures[e]!=null&&this.textures[e].dispose(),this.textures[e]=new En(this.ctx.getImageData(0,0,this.ctx.canvas.width,this.ctx.canvas.height),this.ctx.canvas.width,this.ctx.canvas.height),this.textures[e].flipY=!0,this.textures[e].needsUpdate=!0}async saveToLayer(e){let n=await new Promise(i=>this.ctx.canvas.toBlob(i));this.layers[e]=n}async loadLayer(e){if(this.layer!=e)if(await this.saveToLayer(this.layer),this.clear(!1),this.layer=e,this.layers[this.layer]!=null){let n=new Image,i=URL.createObjectURL(this.layers[this.layer]);n.setAttribute("src",i),await new Promise(s=>n.addEventListener("load",s)),this.ctx.drawImage(n,0,0),URL.revokeObjectURL(i)}else this.initLayer(e)}async serialize(){return await this.saveToLayer(this.layer),this.layers}async deserialize(e){this.layer=-1,this.layers=e;for(let[n,i]of this.layers.entries()){if(i==null){this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height),this.initLayer(n);continue}this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);let s=new Image,o=URL.createObjectURL(i);s.setAttribute("src",o),await new Promise(r=>s.addEventListener("load",r)),this.ctx.drawImage(s,0,0),URL.revokeObjectURL(o),this.initLayer(n)}await this.loadLayer(0)}};customElements.define("itmas-cloth",Fr);var Ur=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"});let t=["transparent","#dde4e8","#ffc97a","#8dc196","#5a6e93","#301c44","#ce2f7f","#ef8a6e","#514cad","#877aff"],e=document.createElement("div");e.id="wrapper";for(let[i,s]of t.entries()){let o=document.createElement("input");o.type="color",o.id=i,o.value=s;let r=document.createElement("label");r.setAttribute("for",i),r.style.backgroundColor=s,r.classList.add("color"),s=="transparent"&&r.classList.add("transparent"),s=="black"&&r.classList.add("selected"),r.addEventListener("click",()=>{for(let c of[...e.getElementsByClassName("selected")])c.classList.remove("selected");r.classList.add("selected"),this.dispatchEvent(new CustomEvent("change",{detail:r.style.backgroundColor}))}),o.addEventListener("change",c=>{r.style.backgroundColor=c.target.value,this.dispatchEvent(new CustomEvent("change",{detail:c.target.value}))}),o.addEventListener("click",c=>{c.button==0&&c.preventDefault()}),s!="transparent"&&r.addEventListener("contextmenu",c=>(o.dispatchEvent(new MouseEvent("click",{button:2})),c.preventDefault(),!1),!1),e.append(r),s!="transparent"&&e.append(o)}let n=document.createElement("style");n.textContent=`
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
}

.color {
    display: block;
    border: 3px solid black;
    border-radius: 100%;

    width: auto;
    flex-grow: 1;
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
`,this.shadowRoot.append(n,e)}};customElements.define("itmas-palette",Ur);var Br=class extends HTMLElement{constructor(){super();$t(this,"nameElem");this.attachShadow({mode:"open"}),this.nameElem=document.createElement("span"),this.shadowRoot.append(this.nameElem)}connectedCallback(){this.nameElem.innerText=`${parseInt(this.getAttribute("layer"))+1}`}};customElements.define("itmas-layer",Br);var wo={type:"change"},Vr={type:"start"},Mo={type:"end"},fs=class extends Be{constructor(t,e){super(),this.object=t,this.domElement=e,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new $,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Pn.ROTATE,MIDDLE:Pn.DOLLY,RIGHT:Pn.PAN},this.touches={ONE:Ln.ROTATE,TWO:Ln.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return r.phi},this.getAzimuthalAngle=function(){return r.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(F){F.addEventListener("keydown",ut),this._domElementKeyEvents=F},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(wo),n.update(),s=i.NONE},this.update=function(){let F=new $,Y=new ze().setFromUnitVectors(t.up,new $(0,1,0)),dt=Y.clone().invert(),wt=new $,yt=new ze,St=2*Math.PI;return function(){let Nt=n.object.position;F.copy(Nt).sub(n.target),F.applyQuaternion(Y),r.setFromVector3(F),n.autoRotate&&s===i.NONE&&z(I()),n.enableDamping?(r.theta+=c.theta*n.dampingFactor,r.phi+=c.phi*n.dampingFactor):(r.theta+=c.theta,r.phi+=c.phi);let W=n.minAzimuthAngle,vt=n.maxAzimuthAngle;return isFinite(W)&&isFinite(vt)&&(W<-Math.PI?W+=St:W>Math.PI&&(W-=St),vt<-Math.PI?vt+=St:vt>Math.PI&&(vt-=St),W<=vt?r.theta=Math.max(W,Math.min(vt,r.theta)):r.theta=r.theta>(W+vt)/2?Math.max(W,r.theta):Math.min(vt,r.theta)),r.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,r.phi)),r.makeSafe(),r.radius*=h,r.radius=Math.max(n.minDistance,Math.min(n.maxDistance,r.radius)),n.enableDamping===!0?n.target.addScaledVector(p,n.dampingFactor):n.target.add(p),F.setFromSpherical(r),F.applyQuaternion(dt),Nt.copy(n.target).add(F),n.object.lookAt(n.target),n.enableDamping===!0?(c.theta*=1-n.dampingFactor,c.phi*=1-n.dampingFactor,p.multiplyScalar(1-n.dampingFactor)):(c.set(0,0,0),p.set(0,0,0)),h=1,u||wt.distanceToSquared(n.object.position)>o||8*(1-yt.dot(n.object.quaternion))>o?(n.dispatchEvent(wo),wt.copy(n.object.position),yt.copy(n.object.quaternion),u=!1,!0):!1}}(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",H),n.domElement.removeEventListener("pointerdown",Q),n.domElement.removeEventListener("pointercancel",V),n.domElement.removeEventListener("wheel",q),n.domElement.removeEventListener("pointermove",k),n.domElement.removeEventListener("pointerup",P),n._domElementKeyEvents!==null&&n._domElementKeyEvents.removeEventListener("keydown",ut)};let n=this,i={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},s=i.NONE,o=1e-6,r=new Mi,c=new Mi,h=1,p=new $,u=!1,f=new zt,m=new zt,g=new zt,l=new zt,d=new zt,_=new zt,y=new zt,b=new zt,w=new zt,S=[],L={};function I(){return 2*Math.PI/60/60*n.autoRotateSpeed}function A(){return Math.pow(.95,n.zoomSpeed)}function z(F){c.theta-=F}function T(F){c.phi-=F}let N=function(){let F=new $;return function(dt,wt){F.setFromMatrixColumn(wt,0),F.multiplyScalar(-dt),p.add(F)}}(),v=function(){let F=new $;return function(dt,wt){n.screenSpacePanning===!0?F.setFromMatrixColumn(wt,1):(F.setFromMatrixColumn(wt,0),F.crossVectors(n.object.up,F)),F.multiplyScalar(dt),p.add(F)}}(),O=function(){let F=new $;return function(dt,wt){let yt=n.domElement;if(n.object.isPerspectiveCamera){let St=n.object.position;F.copy(St).sub(n.target);let Rt=F.length();Rt*=Math.tan(n.object.fov/2*Math.PI/180),N(2*dt*Rt/yt.clientHeight,n.object.matrix),v(2*wt*Rt/yt.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(N(dt*(n.object.right-n.object.left)/n.object.zoom/yt.clientWidth,n.object.matrix),v(wt*(n.object.top-n.object.bottom)/n.object.zoom/yt.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}}();function B(F){n.object.isPerspectiveCamera?h/=F:n.object.isOrthographicCamera?(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom*F)),n.object.updateProjectionMatrix(),u=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function U(F){n.object.isPerspectiveCamera?h*=F:n.object.isOrthographicCamera?(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/F)),n.object.updateProjectionMatrix(),u=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function nt(F){f.set(F.clientX,F.clientY)}function G(F){y.set(F.clientX,F.clientY)}function J(F){l.set(F.clientX,F.clientY)}function C(F){m.set(F.clientX,F.clientY),g.subVectors(m,f).multiplyScalar(n.rotateSpeed);let Y=n.domElement;z(2*Math.PI*g.x/Y.clientHeight),T(2*Math.PI*g.y/Y.clientHeight),f.copy(m),n.update()}function R(F){b.set(F.clientX,F.clientY),w.subVectors(b,y),w.y>0?B(A()):w.y<0&&U(A()),y.copy(b),n.update()}function it(F){d.set(F.clientX,F.clientY),_.subVectors(d,l).multiplyScalar(n.panSpeed),O(_.x,_.y),l.copy(d),n.update()}function Z(F){F.deltaY<0?U(A()):F.deltaY>0&&B(A()),n.update()}function K(F){let Y=!1;switch(F.code){case n.keys.UP:O(0,n.keyPanSpeed),Y=!0;break;case n.keys.BOTTOM:O(0,-n.keyPanSpeed),Y=!0;break;case n.keys.LEFT:O(n.keyPanSpeed,0),Y=!0;break;case n.keys.RIGHT:O(-n.keyPanSpeed,0),Y=!0;break}Y&&(F.preventDefault(),n.update())}function ft(){if(S.length===1)f.set(S[0].pageX,S[0].pageY);else{let F=.5*(S[0].pageX+S[1].pageX),Y=.5*(S[0].pageY+S[1].pageY);f.set(F,Y)}}function At(){if(S.length===1)l.set(S[0].pageX,S[0].pageY);else{let F=.5*(S[0].pageX+S[1].pageX),Y=.5*(S[0].pageY+S[1].pageY);l.set(F,Y)}}function et(){let F=S[0].pageX-S[1].pageX,Y=S[0].pageY-S[1].pageY,dt=Math.sqrt(F*F+Y*Y);y.set(0,dt)}function Tt(){n.enableZoom&&et(),n.enablePan&&At()}function Mt(){n.enableZoom&&et(),n.enableRotate&&ft()}function bt(F){if(S.length==1)m.set(F.pageX,F.pageY);else{let dt=Et(F),wt=.5*(F.pageX+dt.x),yt=.5*(F.pageY+dt.y);m.set(wt,yt)}g.subVectors(m,f).multiplyScalar(n.rotateSpeed);let Y=n.domElement;z(2*Math.PI*g.x/Y.clientHeight),T(2*Math.PI*g.y/Y.clientHeight),f.copy(m)}function xt(F){if(S.length===1)d.set(F.pageX,F.pageY);else{let Y=Et(F),dt=.5*(F.pageX+Y.x),wt=.5*(F.pageY+Y.y);d.set(dt,wt)}_.subVectors(d,l).multiplyScalar(n.panSpeed),O(_.x,_.y),l.copy(d)}function Dt(F){let Y=Et(F),dt=F.pageX-Y.x,wt=F.pageY-Y.y,yt=Math.sqrt(dt*dt+wt*wt);b.set(0,yt),w.set(0,Math.pow(b.y/y.y,n.zoomSpeed)),B(w.y),y.copy(b)}function x(F){n.enableZoom&&Dt(F),n.enablePan&&xt(F)}function X(F){n.enableZoom&&Dt(F),n.enableRotate&&bt(F)}function Q(F){n.enabled!==!1&&(S.length===0&&(n.domElement.setPointerCapture(F.pointerId),n.domElement.addEventListener("pointermove",k),n.domElement.addEventListener("pointerup",P)),ot(F),F.pointerType==="touch"?E(F):rt(F))}function k(F){n.enabled!==!1&&(F.pointerType==="touch"?M(F):st(F))}function P(F){ht(F),S.length===0&&(n.domElement.releasePointerCapture(F.pointerId),n.domElement.removeEventListener("pointermove",k),n.domElement.removeEventListener("pointerup",P)),n.dispatchEvent(Mo),s=i.NONE}function V(F){ht(F)}function rt(F){let Y;switch(F.button){case 0:Y=n.mouseButtons.LEFT;break;case 1:Y=n.mouseButtons.MIDDLE;break;case 2:Y=n.mouseButtons.RIGHT;break;default:Y=-1}switch(Y){case Pn.DOLLY:if(n.enableZoom===!1)return;G(F),s=i.DOLLY;break;case Pn.ROTATE:if(F.ctrlKey||F.metaKey||F.shiftKey){if(n.enablePan===!1)return;J(F),s=i.PAN}else{if(n.enableRotate===!1)return;nt(F),s=i.ROTATE}break;case Pn.PAN:if(F.ctrlKey||F.metaKey||F.shiftKey){if(n.enableRotate===!1)return;nt(F),s=i.ROTATE}else{if(n.enablePan===!1)return;J(F),s=i.PAN}break;default:s=i.NONE}s!==i.NONE&&n.dispatchEvent(Vr)}function st(F){switch(s){case i.ROTATE:if(n.enableRotate===!1)return;C(F);break;case i.DOLLY:if(n.enableZoom===!1)return;R(F);break;case i.PAN:if(n.enablePan===!1)return;it(F);break}}function q(F){n.enabled===!1||n.enableZoom===!1||s!==i.NONE||(F.preventDefault(),n.dispatchEvent(Vr),Z(F),n.dispatchEvent(Mo))}function ut(F){n.enabled===!1||n.enablePan===!1||K(F)}function E(F){switch(pt(F),S.length){case 1:switch(n.touches.ONE){case Ln.ROTATE:if(n.enableRotate===!1)return;ft(),s=i.TOUCH_ROTATE;break;case Ln.PAN:if(n.enablePan===!1)return;At(),s=i.TOUCH_PAN;break;default:s=i.NONE}break;case 2:switch(n.touches.TWO){case Ln.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;Tt(),s=i.TOUCH_DOLLY_PAN;break;case Ln.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;Mt(),s=i.TOUCH_DOLLY_ROTATE;break;default:s=i.NONE}break;default:s=i.NONE}s!==i.NONE&&n.dispatchEvent(Vr)}function M(F){switch(pt(F),s){case i.TOUCH_ROTATE:if(n.enableRotate===!1)return;bt(F),n.update();break;case i.TOUCH_PAN:if(n.enablePan===!1)return;xt(F),n.update();break;case i.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;x(F),n.update();break;case i.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;X(F),n.update();break;default:s=i.NONE}}function H(F){n.enabled!==!1&&F.preventDefault()}function ot(F){S.push(F)}function ht(F){delete L[F.pointerId];for(let Y=0;Y<S.length;Y++)if(S[Y].pointerId==F.pointerId){S.splice(Y,1);return}}function pt(F){let Y=L[F.pointerId];Y===void 0&&(Y=new zt,L[F.pointerId]=Y),Y.set(F.pageX,F.pageY)}function Et(F){let Y=F.pointerId===S[0].pointerId?S[1]:S[0];return L[Y.pointerId]}n.domElement.addEventListener("contextmenu",H),n.domElement.addEventListener("pointerdown",Q),n.domElement.addEventListener("pointercancel",V),n.domElement.addEventListener("wheel",q,{passive:!1}),this.update()}};var ps=class{constructor(t,e,n){this.variables=[],this.currentTextureIndex=0;let i=Ue,s=new ci,o=new li;o.position.z=1;let r={passThruTexture:{value:null}},c=u(m(),r),h=new fe(new Tn(2,2),c);s.add(h),this.setDataType=function(g){return i=g,this},this.addVariable=function(g,l,d){let _=this.createShaderMaterial(l),y={name:g,initialValueTexture:d,material:_,dependencies:null,renderTargets:[],wrapS:null,wrapT:null,minFilter:Jt,magFilter:Jt};return this.variables.push(y),y},this.setVariableDependencies=function(g,l){g.dependencies=l},this.init=function(){if(n.capabilities.isWebGL2===!1&&n.extensions.has("OES_texture_float")===!1)return"No OES_texture_float support for float textures.";if(n.capabilities.maxVertexTextures===0)return"No support for vertex shader textures.";for(let g=0;g<this.variables.length;g++){let l=this.variables[g];l.renderTargets[0]=this.createRenderTarget(t,e,l.wrapS,l.wrapT,l.minFilter,l.magFilter),l.renderTargets[1]=this.createRenderTarget(t,e,l.wrapS,l.wrapT,l.minFilter,l.magFilter),this.renderTexture(l.initialValueTexture,l.renderTargets[0]),this.renderTexture(l.initialValueTexture,l.renderTargets[1]);let d=l.material,_=d.uniforms;if(l.dependencies!==null)for(let y=0;y<l.dependencies.length;y++){let b=l.dependencies[y];if(b.name!==l.name){let w=!1;for(let S=0;S<this.variables.length;S++)if(b.name===this.variables[S].name){w=!0;break}if(!w)return"Variable dependency not found. Variable="+l.name+", dependency="+b.name}_[b.name]={value:null},d.fragmentShader=`
uniform sampler2D `+b.name+`;
`+d.fragmentShader}}return this.currentTextureIndex=0,null},this.compute=function(){let g=this.currentTextureIndex,l=this.currentTextureIndex===0?1:0;for(let d=0,_=this.variables.length;d<_;d++){let y=this.variables[d];if(y.dependencies!==null){let b=y.material.uniforms;for(let w=0,S=y.dependencies.length;w<S;w++){let L=y.dependencies[w];b[L.name].value=L.renderTargets[g].texture}}this.doRenderTarget(y.material,y.renderTargets[l])}this.currentTextureIndex=l},this.getCurrentRenderTarget=function(g){return g.renderTargets[this.currentTextureIndex]},this.getAlternateRenderTarget=function(g){return g.renderTargets[this.currentTextureIndex===0?1:0]},this.dispose=function(){var l;h.geometry.dispose(),h.material.dispose();let g=this.variables;for(let d=0;d<g.length;d++){let _=g[d];(l=_.initialValueTexture)==null||l.dispose();let y=_.renderTargets;for(let b=0;b<y.length;b++)y[b].dispose()}};function p(g){g.defines.resolution="vec2( "+t.toFixed(1)+", "+e.toFixed(1)+" )"}this.addResolutionDefine=p;function u(g,l){l=l||{};let d=new ye({uniforms:l,vertexShader:f(),fragmentShader:g});return p(d),d}this.createShaderMaterial=u,this.createRenderTarget=function(g,l,d,_,y,b){return g=g||t,l=l||e,d=d||ue,_=_||ue,y=y||Jt,b=b||Jt,new De(g,l,{wrapS:d,wrapT:_,minFilter:y,magFilter:b,format:ve,type:i,depthBuffer:!1})},this.createTexture=function(){let g=new Float32Array(t*e*4),l=new En(g,t,e,ve,Ue);return l.needsUpdate=!0,l},this.renderTexture=function(g,l){r.passThruTexture.value=g,this.doRenderTarget(c,l),r.passThruTexture.value=null},this.doRenderTarget=function(g,l){let d=n.getRenderTarget(),_=n.xr.enabled,y=n.shadowMap.autoUpdate,b=n.outputEncoding,w=n.toneMapping;n.xr.enabled=!1,n.shadowMap.autoUpdate=!1,n.outputEncoding=je,n.toneMapping=Ie,h.material=g,n.setRenderTarget(l),n.render(s,o),h.material=c,n.xr.enabled=_,n.shadowMap.autoUpdate=y,n.outputEncoding=b,n.toneMapping=w,n.setRenderTarget(d)};function f(){return`void main()	{

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
`,ms=class extends ye{constructor({topViews:e,frontViews:n,sideViews:i}){super();$t(this,"topViews");$t(this,"frontViews");$t(this,"sideViews");this.topViews=e,this.frontViews=n,this.sideViews=i,this.uniforms.topViews={type:"tv",value:e},this.uniforms.frontViews={type:"tv",value:n},this.uniforms.sideViews={type:"tv",value:i},this.vertexShader=`
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
`,this.side=Fe}};function In(a,t=!0){let e=new ArrayBuffer(4);return new DataView(e).setInt32(0,a,t),new Uint8Array(e)}function Lf(a,t=!0){let e=new ArrayBuffer(4);return new DataView(e).setUint32(0,a,t),new Uint8Array(e)}function So(a){return Uint8Array.from(a.split("").map(t=>t.charCodeAt()))}var gs=class{constructor(){$t(this,"palette",[]);$t(this,"voxels",[])}addVoxel(t,e){let n=this.palette.indexOf(e);n==-1&&(n=this.palette.length,this.palette.push(e)),this.voxels.push(t[0],t[1],t[2],n+1)}toBlob(){let t=this.MAIN(),e=new Uint8Array(8);return e.set(So("VOX "),0),e.set(In(150),4),new Blob([e,t])}MAIN(){let t=this.SIZE(),e=this.XYZI(),n=this.RGBA(),i=new Uint8Array(t.length+e.length+n.length);return i.set(t),i.set(e,t.length),i.set(n,t.length+e.length),this.createChunk("MAIN",[],i)}SIZE(){let t=new Uint8Array(12);return t.set(In(256),0),t.set(In(256),4),t.set(In(256),8),this.createChunk("SIZE",t)}XYZI(){let t=new Uint8Array(this.voxels.length+4);return t.set(In(this.voxels.length/4),0),t.set(this.voxels,4),this.createChunk("XYZI",t)}RGBA(){let t=new Uint8Array(1024);for(let e=0;e<this.palette.length;e++)t.set(Lf(this.palette[e],!1),e*4);return this.createChunk("RGBA",t)}createChunk(t,e=[],n=[]){let i=12+e.length+n.length,s=new Uint8Array(i);return s.set(So(t),0),s.set(In(e.length),4),s.set(In(n.length),8),s.set(e,12),s.set(n,12+e.length),s}};var _s=Vo(To());function Eo(a,t){let e=URL.createObjectURL(a),n=document.createElement("a");n.href=e,n.download=t,n.rel="noopener",setTimeout(()=>{URL.revokeObjectURL(e)},4e4),setTimeout(()=>{n.dispatchEvent(new MouseEvent("click"))},0)}window.onbeforeunload=function(){return!0};window.addEventListener("load",()=>{let a=new ci,t=new le(40,1,.1,1e3),e=document.getElementById("three-canvas"),{width:n,height:i}=e.getBoundingClientRect();e.width=n,e.height=n;let s=new kr({canvas:e});s.setClearColor(16777215);let o=[document.getElementById("top-view"),document.getElementById("front-view"),document.getElementById("side-view")],r=o.map(g=>g.textures),c=new fs(t,s.domElement);c.minDistance=.4,c.maxDistance=3,c.enableDamping=!0,t.position.z=1,c.update();function h(){requestAnimationFrame(h),c.update(),s.render(a,t)}h(),document.getElementById("palette").addEventListener("change",g=>{for(let l of o)l.color=g.detail}),document.getElementById("brush").addEventListener("change",g=>{for(let l of o)l.brushSize=parseInt(g.target.value)/parseInt(g.target.getAttribute("max"))}),document.getElementById("shape").addEventListener("click",g=>{g.target.textContent=="\u2B24"?g.target.textContent="\u2BC0":g.target.textContent="\u2B24";for(let l of o)l.brushStyle==un.Circle?l.brushStyle=un.Square:l.brushStyle=un.Circle}),document.getElementById("clear").addEventListener("click",()=>{if(confirm("Are you sure you want to clear this layer?"))for(let g of o)g.clear()}),document.getElementById("expand").addEventListener("click",()=>{for(let l of o)l.style.display=l.style.display=="none"?"block":"none";let g=document.getElementById("grid");g.style.display=g.style.display=="block"?"grid":"block"}),document.getElementById("save").addEventListener("click",async()=>{let g=new _s.default;for(let l of o){let d=g.folder(l.id);for(let[_,y]of(await l.serialize()).entries())y!=null&&d.file(`layer-${_}.png`,y)}g.generateAsync({type:"blob"}).then(async l=>{Eo(l,"model.zip")})});async function p(g){let l=new _s.default;await l.loadAsync(g);for(let d of o){let _=Array(4).fill(null);for(let[y,b]of Object.entries(l.files)){let w=y.match(new RegExp(`${d.id}/layer-(\\d+).png`));w!=null&&(_[parseInt(w[1])]=await b.async("blob"),_[parseInt(w[1])]=_[parseInt(w[1])].slice(0,_[parseInt(w[1])].size,"image/png"))}await d.deserialize(_)}}document.getElementById("load").addEventListener("change",async g=>{let l=g.target.files;if(l.length==0)return;let d=l[0];await p(d)}),document.getElementById("examples").addEventListener("change",async g=>{let l=await(await fetch(`./models/${g.target.value}.zip`)).blob();await p(l)}),document.getElementById("export").addEventListener("click",async()=>{[...document.querySelectorAll("#buttons *")].forEach(z=>z.setAttribute("disabled",""));let g=new _s.default,l=new gs,d=new ps(256,256,s),_=d.createShaderMaterial(`
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
`,{layer:{value:null},frontViews:{type:"tv",value:null},sideViews:{type:"tv",value:null},topViews:{type:"tv",value:null}});_.uniforms.topViews.value=o[0].textures,_.uniforms.frontViews.value=o[1].textures,_.uniforms.sideViews.value=o[2].textures;let y=d.init();y!==null&&console.error(y);let b=new Float32Array(256*256*4),w=d.createRenderTarget(),S=document.createElement("canvas");S.width=256,S.height=256;let L=S.getContext("2d"),I=new Uint8ClampedArray(256*256*4);for(let z=0;z<256;z++){document.documentElement.style.setProperty("--progress",`${z/256*100}%`),_.uniforms.layer.value=z,d.doRenderTarget(_,w),s.readRenderTargetPixels(w,0,0,256,256,b);for(let N=0;N<b.length/4;N++)if(I[N*4+0]=b[N*4+0]*255,I[N*4+1]=b[N*4+1]*255,I[N*4+2]=b[N*4+2]*255,I[N*4+3]=b[N*4+3]*255,I[N*4+3]>128){let v=N%256,O=Math.floor(N/256);l.addVoxel([v,O,z],I[N*4+0]<<24|I[N*4+1]<<16|I[N*4+2]<<8|I[N*4+3]<<0)}let T=new ImageData(I,256,256);L.putImageData(T,0,0)}document.documentElement.style.setProperty("--progress","0%");let A=l.toBlob();Eo(A,"export.vox"),[...document.querySelectorAll("#buttons *")].forEach(z=>z.removeAttribute("disabled"))}),[...document.getElementsByTagName("itmas-layer")].forEach(g=>{loadingLayers=!1;let l=parseInt(g.getAttribute("layer"));g.addEventListener("click",async()=>{var d;if(loadingLayers){console.warn("Attempted to load layers while loading layers!");return}loadingLayers=!0,(d=document.querySelector("itmas-layer.selected"))==null||d.classList.remove("selected"),g.classList.add("selected"),await Promise.all(o.map(_=>_.loadLayer(l))),loadingLayers=!1})});let u=new Ke(1,1,1),f=new ms({topViews:r[0],frontViews:r[1],sideViews:r[2]}),m=new fe(u,f);a.add(m)});})();
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

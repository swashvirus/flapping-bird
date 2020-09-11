'use strict';Cache.prototype.add||(Cache.prototype.add=function(a){return this.addAll([a])});
Cache.prototype.addAll||(Cache.prototype.addAll=function(a){function c(b){this.name="NetworkError";this.code=19;this.message=b}var d=this;c.prototype=Object.create(Error.prototype);return Promise.resolve().then(function(){if(1>arguments.length)throw new TypeError;a=a.map(function(b){return b instanceof Request?b:String(b)});return Promise.all(a.map(function(b){"string"===typeof b&&(b=new Request(b));var e=(new URL(b.url)).protocol;if("http:"!==e&&"https:"!==e)throw new c("Invalid scheme");return fetch(b.clone())}))}).then(function(b){return Promise.all(b.map(function(e,
f){return d.put(a[f],e)}))}).then(function(){})});CacheStorage.prototype.match||(CacheStorage.prototype.match=function(a,c){var d=this;return this.keys().then(function(b){var e;return b.reduce(function(f,h){return f.then(function(){return e||d.open(h).then(function(g){return g.match(a,c)}).then(function(g){return e=g})})},Promise.resolve())})});var k=["./","index.html?utm=homescreen","image.png","spritesheet.png","manifest.json"];
self.addEventListener("install",a=>{a.waitUntil(caches.open("cache-v5").then(c=>c.addAll(k).then(()=>self.skipWaiting()).catch(()=>{})))});self.addEventListener("fetch",a=>{var c=a.request;(new URL(c.url)).origin===location.origin?a.respondWith(l(c)):a.respondWith(m(c))});async function l(a){return await caches.match(a)||fetch(a)}
async function m(a){const c=await caches.open("cache-v5");try{const d=await fetch(a);c.put(a,d.clone()).catch(b=>{console.warn(a.url+": "+b.message)});return d}catch(d){return await c.match(a)}}self.addEventListener("activate",a=>{a.waitUntil(caches.keys().then(c=>Promise.all(c.map(d=>{if("cache-v5"!==d)return caches.delete(d)}))).then(function(){return self.clients.claim()}))});
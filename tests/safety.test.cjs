const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const {COLORS,safePhoto,destination,validateConfig}=require('../app.js');
const config=JSON.parse(fs.readFileSync(require.resolve('../config.json')));
const clone=()=>JSON.parse(JSON.stringify(config));
const verified={...config.contacts[0],verified:true,verifiedOn:'2000-01-01'};
test('source contacts and colours survive exactly; no old destination is enabled by assumption',()=>{
  const original=fs.readFileSync(require.resolve('../archive/index.original.html'),'utf8');
  assert.equal(config.contacts.length+config.screens.length,6);
  for(const item of config.contacts){assert.ok(original.includes('tel:'+item.phone));assert.equal(destination(item,'contact'),null);}
  assert.match(original,/tel:000/);
  assert.equal(COLORS.green,'#a5d6a7');assert.equal(COLORS.pink,'#f8bbd0');assert.equal(COLORS.purple,'#ce93d8');assert.equal(COLORS.blue,'#90caf9');
});
test('verification requires explicit true, a date and a valid destination',()=>{
  assert.equal(destination(verified,'contact'),'tel:'+verified.phone);
  for(const patch of [{verified:false},{verified:'true'},{verifiedOn:null},{verifiedOn:'2099-01-01'},{verifiedOn:'2026-02-31'},{phone:'000'},{phone:'+61;123'},{phone:'javascript:alert(1)'}])assert.equal(destination({...verified,...patch},'contact'),null);
  for(const url of [null,'javascript:alert(1)','data:text/html,hi','http://example.com','https://user:secret@example.com','shortcuts://run-shortcut?name=whatever'])assert.equal(destination({...verified,url},'link'),null);
  assert.equal(destination({...verified,url:'https://example.com/'},'link'),'https://example.com/');
});
test('photo paths stay local and fall back safely',()=>{
  assert.equal(safePhoto('assets/adam.jpg'),'assets/adam.jpg');
  for(const s of [null,'https://example.com/photo.jpg','../adam.jpg','assets/../adam.jpg','assets/x.svg','assets/x.jpg?track=1'])assert.equal(safePhoto(s),null);
});
test('bad shapes and duplicate IDs fail closed',()=>{
  assert.equal(validateConfig(config),config);
  for(const mutate of [c=>c.contacts.pop(),c=>c.screens.push(c.screens[0]),c=>c.contacts[0].id='home',c=>c.contacts[0].color='url(evil)',c=>c.contacts[0].label='',c=>c.screens[0].items[0].id='adam']){const c=clone();mutate(c);assert.throws(()=>validateConfig(c));}
});
function harness(data=config,ok=true){
  let now=0;
  class Element{
    constructor(tag='div'){this.tag=tag;this.hidden=false;this.attrs={};this.dataset={};this.children=[];this.events={};this.style={setProperty(){}};this.isConnected=true;this.className='';}
    setAttribute(k,v){this.attrs[k]=v;}removeAttribute(k){delete this.attrs[k];}hasAttribute(k){return k in this.attrs;}getAttribute(k){return this.attrs[k]??null;}
    set href(v){this.attrs.href=v;}get href(){return this.attrs.href;}
    addEventListener(k,f){(this.events[k]??=[]).push(f);}append(...x){this.children.push(...x);}replaceChildren(...x){this.children=x;}focus(){doc.activeElement=this;}
    querySelectorAll(){return [els.cancel,els.confirm,els['dialog-home']].filter(e=>e.tag==='button'||e.hasAttribute('href'));}
    click(){const e={currentTarget:this,preventDefault(){this.defaultPrevented=true;},defaultPrevented:false};for(const f of this.events.click??[])f(e);return e;}
  }
  const els=Object.fromEntries(['modal','screen-title','home','cancel','confirm','dialog-home','emergency','dialog-kicker','dialog-title','dialog-description','tiles','page-count','screen-note','connection','load-status'].map(id=>[id,new Element(['home','cancel','dialog-home','emergency'].includes(id)?'button':id==='confirm'?'a':'div')]));
  els.modal.hidden=true;const app=new Element(),devents={},events={},timers=[];
  const doc={body:{style:{}},getElementById:id=>els[id],querySelector:()=>app,createElement:t=>new Element(t),addEventListener:(k,f)=>devents[k]=f,visibilityState:'visible',activeElement:null};
  const root={document:doc,location:{hash:'',pathname:'/ma_phone_site/',search:''},history:{replaceState(a,b,url){root.location.hash=url.includes('#')?'#'+url.split('#')[1]:'';}},scrollTo(){},navigator:{onLine:true},addEventListener:(k,f)=>events[k]=f,setTimeout:f=>timers.push(f),fetch:async()=>({ok,json:async()=>data})};
  vm.runInNewContext(fs.readFileSync(require.resolve('../app.js'),'utf8'),{window:root,URL,Date,performance:{now:()=>now},Set,console});
  return {els,app,doc,events,devents,root,timers,advance(ms=1000){now+=ms;},ready:()=>new Promise(setImmediate),tile:id=>els.tiles.children.find(e=>e.dataset.id===id)};
}
test('main has six tiles; both screens and all recovery routes return home',async()=>{
  const h=harness();await h.ready();assert.equal(h.els.tiles.children.length,6);
  for(const id of ['radio','more']){h.advance();h.tile(id).click();assert.notEqual(h.els['screen-title'].textContent,'Main screen');h.els.home.click();assert.equal(h.els.tiles.children.length,6);}
  for(const name of ['pageshow','popstate','hashchange']){h.advance();h.tile('radio').click();h.events[name]();assert.equal(h.els['screen-title'].textContent,'Main screen');}
  h.advance();h.tile('more').click();h.devents.visibilitychange();assert.equal(h.els['screen-title'].textContent,'Main screen');
});
test('unverified call cannot open; cancel restores focus; emergency needs a second deliberate tap',async()=>{
  const h=harness();await h.ready();const adam=h.tile('adam');adam.click();assert.equal(h.els.confirm.hidden,true);assert.equal(h.els.confirm.hasAttribute('href'),false);assert.equal(h.app.inert,true);
  h.els.cancel.click();assert.equal(h.els.modal.hidden,true);assert.equal(h.doc.activeElement,adam);assert.equal(h.app.inert,false);
  h.els.emergency.click();assert.equal(h.els.confirm.href,'tel:000');assert.equal(h.doc.activeElement,h.els.cancel);assert.equal(h.els.confirm.click().defaultPrevented,true);
  h.advance();assert.equal(h.els.confirm.click().defaultPrevented,false);assert.equal(h.els.confirm.click().defaultPrevented,true);
  h.timers.pop()();assert.equal(h.els.confirm.hasAttribute('href'),false);assert.equal(h.els.modal.hidden,true);assert.equal(h.doc.activeElement,h.els['screen-title']);
});
test('verified call/link use exact values; link opens separately; duplicate taps and Escape are safe',async()=>{
  const c=clone();c.contacts[0]=verified;c.screens[0].items[0]={...c.screens[0].items[0],verified:true,verifiedOn:'2000-01-01',url:'https://example.com/'};
  const h=harness(c);await h.ready();h.tile('adam').click();assert.equal(h.els.confirm.href,'tel:'+verified.phone);assert.equal(h.els.confirm.click().defaultPrevented,true);
  h.devents.keydown({key:'Escape',preventDefault(){}});assert.equal(h.els.modal.hidden,true);
  h.advance();h.tile('radio').click();h.tile('abc702').click();assert.equal(h.els.modal.hidden,true);h.advance();h.tile('abc702').click();assert.equal(h.els.confirm.href,'https://example.com/');assert.equal(h.els.confirm.target,'_blank');assert.equal(h.els.confirm.rel,'noopener noreferrer');
  h.els['dialog-home'].click();assert.equal(h.els['screen-title'].textContent,'Main screen');
});
test('configuration fetch failure and invalid content leave no tiles or call links; emergency remains',async()=>{
  for(const [data,ok] of [[{},true],[config,false]]){const h=harness(data,ok);await h.ready();assert.equal(h.els.tiles.children.length,0);assert.match(h.els['load-status'].textContent,/could not load/);h.els.emergency.click();assert.equal(h.els.confirm.href,'tel:000');}
});
test('text contrast passes AA and native zoom is allowed',()=>{
  function lum(hex){const v=hex.match(/[a-f0-9]{2}/gi).map(x=>parseInt(x,16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4);return v[0]*.2126+v[1]*.7152+v[2]*.0722;}
  const ink=lum('#172a29');for(const color of Object.values(COLORS))assert.ok((lum(color)+.05)/(ink+.05)>=4.5,color);
  assert.ok((1.05)/(lum('#ad242a')+.05)>=4.5);
  assert.doesNotMatch(fs.readFileSync(require.resolve('../index.html'),'utf8'),/user-scalable=no|maximum-scale=1/);
});

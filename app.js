(function (root) {
  'use strict';
  const COLORS = Object.freeze({green:'#a5d6a7',pink:'#f8bbd0',purple:'#ce93d8',blue:'#90caf9',yellow:'#f4d779',peach:'#f5ba94'});
  const dateOK = value => {
    if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const parsed = new Date(value);
    const today = new Date();
    const localDate = [today.getFullYear(),String(today.getMonth()+1).padStart(2,'0'),String(today.getDate()).padStart(2,'0')].join('-');
    return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0,10) === value && value <= localDate;
  };
  function safePhoto(value) {
    return typeof value === 'string' && /^assets\/(?:[A-Za-z0-9_-]+\/)*[A-Za-z0-9_-]+\.(?:png|jpe?g|webp)$/i.test(value) ? value : null;
  }
  function destination(item, kind) {
    if (!item || item.verified !== true || !dateOK(item.verifiedOn)) return null;
    if (kind === 'contact') return /^\+\d{8,15}$/.test(item.phone) ? 'tel:' + item.phone : null;
    try {
      const url = new URL(item.url);
      return url.protocol === 'https:' && !url.username && !url.password ? url.href : null;
    } catch (_) { return null; }
  }
  function validateConfig(config) {
    if (!config || config.schemaVersion !== 1 || !Array.isArray(config.contacts) || config.contacts.length !== 4 || !Array.isArray(config.screens) || config.screens.length !== 2) throw new Error('Expected four contacts and two screens.');
    const ids = new Set(['home']);
    const validateItem = item => {
      if (!item || !/^[a-z0-9][a-z0-9-]*$/.test(item.id) || ids.has(item.id) || typeof item.label !== 'string' || !item.label.trim() || item.label.length > 40 || !Object.prototype.hasOwnProperty.call(COLORS,item.color)) throw new Error('Invalid or duplicate item.');
      ids.add(item.id);
    };
    config.contacts.forEach(validateItem);
    config.screens.forEach(section => {
      validateItem(section);
      if (!Array.isArray(section.items) || section.items.length > 6) throw new Error('Invalid supplementary screen.');
      section.items.forEach(validateItem);
    });
    return config;
  }
  const PROFILE_KEY = 'ma-phone.private-profile.v1';
  function validateProfile(data) {
    validateConfig(data);
    for (const item of [...data.contacts,...data.screens.flatMap(s=>s.items)]) {
      const kind = data.contacts.includes(item) ? 'contact' : 'link';
      if (typeof item.verified !== 'boolean' || (item.verified && !destination(item,kind))) throw new Error('Invalid verified destination.');
      if (kind === 'contact' && item.phone !== null && !/^\+\d{8,15}$/.test(item.phone)) throw new Error('Invalid phone number.');
      if (kind === 'link' && item.url !== null && !destination({...item,verified:true,verifiedOn:'2000-01-01'},'link')) throw new Error('Invalid website.');
      if (item.photo !== null) throw new Error('Keep private photographs in the native Photos app.');
    }
    return data;
  }
  function readProfile(storage) {
    try {
      const raw = storage.getItem(PROFILE_KEY);
      return {config:raw ? validateProfile(JSON.parse(raw)) : null,problem:false};
    } catch (_) { return {config:null,problem:true}; }
  }
  function saveProfile(storage,data) {
    const serialized = JSON.stringify(validateProfile(data));
    const previous = storage.getItem(PROFILE_KEY);
    try {
      storage.setItem(PROFILE_KEY,serialized);
      if (storage.getItem(PROFILE_KEY) !== serialized) throw new Error('Storage did not retain the profile.');
    } catch (error) {
      try { if(previous === null)storage.removeItem(PROFILE_KEY);else storage.setItem(PROFILE_KEY,previous); } catch (_) { /* Never activate an unsaved replacement. */ }
      throw error;
    }
    return data;
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = {COLORS,safePhoto,destination,validateConfig,PROFILE_KEY,validateProfile,readProfile,saveProfile};
  if (!root.document) return;
  const doc = root.document, $ = id => doc.getElementById(id);
  let config = null, screen = 'home', opener = null, armedAt = 0, launched = false, lastTap = -Infinity;
  const app = doc.querySelector('.app'), modal = $('modal'), title = $('screen-title');
  function closeDialog(restoreFocus = true) {
    const wasOpen = !modal.hidden;
    modal.hidden = true; doc.body.style.overflow = ''; app.removeAttribute('aria-hidden'); app.inert = false;
    $('confirm').removeAttribute('href'); launched = false;
    if (restoreFocus && wasOpen && opener && opener.isConnected) opener.focus();
  }
  function goHome(focus = true) {
    const shouldFocus = focus || !modal.hidden;
    closeDialog(false); $('helper-panel').hidden=true; $('main').hidden=false; screen = 'home';
    if (root.location.hash) root.history.replaceState(null,'',root.location.pathname + root.location.search);
    render(shouldFocus);
  }
  function navigate(id) {
    closeDialog(false); screen = config.screens.some(s => s.id === id) ? id : 'home';
    root.history.replaceState(null,'',screen === 'home' ? root.location.pathname + root.location.search : '#' + screen);
    render(true);
  }
  function openDialog(item, kind, trigger) {
    opener = trigger;
    const href = kind === 'emergency' ? 'tel:000' : destination(item,kind);
    $('dialog-kicker').textContent = kind === 'emergency' ? 'EMERGENCY' : href ? 'ONE MORE TAP' : 'NEEDS SETUP';
    $('dialog-title').textContent = kind === 'emergency' ? 'Call 000?' : href ? (kind === 'contact' ? 'Call ' : 'Open ') + item.label + '?' : item.label;
    $('dialog-description').textContent = kind === 'emergency' ? 'Police, fire or ambulance.\nIf this was a mistake, tap GO BACK.\nYou can also use the native Phone app.' : !href ? 'This button is not ready yet.\nAsk your helper to finish setting it up.' : kind === 'contact' ? 'Check the name before continuing.' : 'This opens in Safari.\nTo come back, open MA Phone again.';
    const confirm = $('confirm'); confirm.hidden = !href;
    confirm.removeAttribute('href'); confirm.removeAttribute('target'); confirm.removeAttribute('rel');
    if (href) {confirm.href = href;if (kind === 'link') {confirm.target = '_blank';confirm.rel = 'noopener noreferrer';}}
    confirm.textContent = kind === 'emergency' ? 'CALL 000' : kind === 'contact' ? 'YES, CALL' : 'YES, OPEN';
    confirm.dataset.emergency = String(kind === 'emergency');confirm.setAttribute('aria-disabled','false');
    modal.hidden = false; doc.body.style.overflow = 'hidden'; armedAt = performance.now() + 650; launched = false;
    $('cancel').focus();app.inert = true;app.setAttribute('aria-hidden','true');
  }
  function makeTile(item,kind) {
    const button = doc.createElement('button');button.type = 'button';button.className = 'tile';button.dataset.id = item.id;button.dataset.kind = kind;
    button.style.setProperty('--tile-color',COLORS[item.color]);
    const ready = kind === 'screen' || !!destination(item,kind);button.dataset.ready = String(ready);
    const portrait = doc.createElement('span');portrait.className = 'portrait';portrait.setAttribute('aria-hidden','true');
    const fallback = kind === 'screen' ? (item.id === config.screens[0].id ? '▤' : '•••') : item.label.charAt(0);portrait.textContent = fallback;
    const photo = safePhoto(item.photo);
    if (photo) {const img = doc.createElement('img');img.src = photo;img.alt = '';img.draggable = false;img.addEventListener('error',()=>{portrait.textContent = fallback;},{once:true});portrait.replaceChildren(img);}
    if (kind === 'contact') {const verb = doc.createElement('span');verb.className = 'verb';verb.textContent = 'CALL';button.append(verb);}
    button.append(portrait);
    const label = doc.createElement('span');label.className = 'label';label.textContent = item.label;button.append(label);
    const state = doc.createElement('span');state.className = 'state';state.textContent = kind === 'screen' ? 'OPEN →' : ready ? (kind === 'contact' ? 'Tap to call' : 'Tap to open') : 'Needs setup';button.append(state);
    button.setAttribute('aria-label',(kind === 'contact' ? 'Call ' : '') + item.label + (!ready ? ' — needs setup' : kind === 'screen' ? ' — open screen' : ''));
    button.addEventListener('click',()=>{const now = performance.now();if (!modal.hidden || now-lastTap < 450) return;lastTap = now;if (kind === 'screen') navigate(item.id);else openDialog(item,kind,button);});
    return button;
  }
  function render(focus = false) {
    if (!config) return;
    const section = config.screens.find(s => s.id === screen);title.textContent = section ? section.label : 'Main screen';
    $('page-count').textContent = (section ? config.screens.indexOf(section)+2 : 1) + ' of 3';
    $('tiles').replaceChildren(...(section ? section.items.map(item=>makeTile(item,'link')) : [...config.contacts.map(item=>makeTile(item,'contact')),...config.screens.map(item=>makeTile(item,'screen'))]));
    $('screen-note').textContent = section ? 'Tap HOME to return to the main screen.' : '';
    root.scrollTo(0,0);if (focus) title.focus({preventScroll:true});
  }
  $('home').addEventListener('click',()=>goHome());$('dialog-home').addEventListener('click',()=>goHome());$('cancel').addEventListener('click',()=>closeDialog());
  $('emergency').addEventListener('click',event=>{if(modal.hidden)openDialog({label:'EMERGENCY 000'},'emergency',event.currentTarget);});
  $('confirm').addEventListener('click',event=>{if(performance.now()<armedAt || launched || !event.currentTarget.hasAttribute('href')) {event.preventDefault();return;}launched=true;event.currentTarget.setAttribute('aria-disabled','true');root.setTimeout(()=>goHome(false),300);});
  doc.addEventListener('keydown',event=>{
    if (modal.hidden) return;
    if (event.key === 'Escape') {event.preventDefault();closeDialog();}
    if (event.key === 'Tab') {const buttons=[...modal.querySelectorAll('button,a[href]')].filter(el=>!el.hidden),first=buttons[0],last=buttons[buttons.length-1];if(event.shiftKey && doc.activeElement===first){event.preventDefault();last.focus();}else if(!event.shiftKey && doc.activeElement===last){event.preventDefault();first.focus();}}
  });
  root.addEventListener('hashchange',()=>goHome());root.addEventListener('popstate',()=>goHome());
  // Returning from the native file picker must not hide/reset an in-progress helper import.
  root.addEventListener('pageshow',()=>{if($('helper-panel').hidden)goHome(false);});
  doc.addEventListener('visibilitychange',()=>{if(doc.visibilityState==='visible' && $('helper-panel').hidden)goHome(false);});
  function connection() {$('connection').hidden=root.navigator.onLine;$('connection').textContent='No internet connection. Use the native Phone app for calls. Online buttons may not open.';}
  root.addEventListener('online',connection);root.addEventListener('offline',connection);connection();
  function storedProfile() {try{return readProfile(root.localStorage);}catch(_){return {config:null,problem:true};}}
  function showHelper() {
    closeDialog(false);$('main').hidden=true;$('helper-panel').hidden=false;title.textContent='Helper setup';
    $('profile-file').value='';$('profile-ack').checked=false;$('profile-status').textContent='Import the verified private profile on this installed app. Nothing is uploaded.';
    $('helper-title').focus();
  }
  $('helper-open').addEventListener('click',showHelper);
  $('profile-save').addEventListener('click',async()=>{
    const status=$('profile-status'),file=$('profile-file').files[0];
    if(!file || !$('profile-ack').checked){status.textContent='Choose a profile and confirm you have checked the contacts.';return;}
    if(file.size>65536){status.textContent='Profile is too large. No changes saved.';return;}
    try{
      const next=validateProfile(JSON.parse(await file.text()));
      // Preserve the six familiar positions, including the two separate MA GOOGLE slots.
      if(!config || JSON.stringify(next.contacts.map(i=>i.id))!==JSON.stringify(config.contacts.map(i=>i.id)) || JSON.stringify(next.screens.map(s=>[s.id,s.items.map(i=>i.id)]))!==JSON.stringify(config.screens.map(s=>[s.id,s.items.map(i=>i.id)])))throw new Error('Unexpected layout.');
      saveProfile(root.localStorage,next);config=next;
      $('profile-file').value='';$('profile-ack').checked=false;
      status.textContent='Saved on this device. Tap HOME, then close and reopen this installed app to check the contacts persist.';
      $('load-status').hidden=true;
    }catch(_){status.textContent='Profile could not be saved. Check its format and browser storage. Previous settings remain active; use native Phone if needed.';}
  });
  root.fetch('config.json',{cache:'no-store'}).then(response=>{if(!response.ok)throw new Error('Configuration unavailable');return response.json();}).then(data=>{
    const publicConfig=validateConfig(data),saved=storedProfile();config=saved.config || publicConfig;
    $('load-status').hidden=!!saved.config;
    $('load-status').textContent=saved.problem ? 'Private settings are unavailable. Ask your helper to restore them. Use the native Phone app for calls.' : 'Ask your helper to set up these buttons on this device. Use the native Phone app for calls.';
    goHome(false);
  }).catch(()=>{$('load-status').textContent='Ma’s buttons could not load. Check the internet connection, then reopen MA Phone. Use the native Phone app for calls.';});
})(typeof window === 'undefined' ? globalThis : window);

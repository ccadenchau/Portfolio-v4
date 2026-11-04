var fontToggle = document.getElementById('fontToggle');

function updateFontToggle() {
  var handwriting = document.documentElement.dataset.font !== 'original';
  fontToggle.setAttribute('aria-pressed', String(handwriting));
  fontToggle.querySelector('.font-status').textContent = handwriting ? 'on' : 'off';
  fontToggle.title = handwriting ? 'Switch to the original font' : 'Switch to handwriting';
}

updateFontToggle();
fontToggle.addEventListener('click', function () {
  var original = document.documentElement.dataset.font !== 'original';
  document.documentElement.dataset.font = original ? 'original' : 'handwriting';
  try {
    localStorage.setItem('portfolio-font', original ? 'original' : 'handwriting');
  } catch (e) {}
  updateFontToggle();
  requestAnimationFrame(updateScrollFades);
});
if (document.fonts) document.fonts.ready.then(updateScrollFades);

var baseTitle = document.title;
var pages = document.querySelectorAll('section.page');
var navLinks = document.querySelectorAll('nav a[href^="#"]');

function setCurrentNav(id) {
  navLinks.forEach(function (link) {
    var current = link.getAttribute('href') === '#' + id;
    link.classList.toggle('current', current);
    if (current) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}

var scrollShells = document.querySelectorAll('.scroll-shell');

function updateScrollFades() {
  scrollShells.forEach(function (shell) {
    var area = shell.querySelector('.scroll-area');
    if (!area) return;
    shell.classList.toggle('at-top', area.scrollTop <= 4);
    shell.classList.toggle('at-bottom', area.scrollTop + area.clientHeight >= area.scrollHeight - 4);
  });
}

var nameHeading = document.getElementById('aboutName');
var nameText = nameHeading.querySelector('span');
var fullName = nameHeading.getAttribute('aria-label');
var nameTimer;

function typeName() {
  clearTimeout(nameTimer);
  nameHeading.classList.remove('is-typing');
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    nameText.textContent = fullName;
    return;
  }
  nameText.textContent = '';
  nameHeading.classList.add('is-typing');
  var length = 0;
  function typeLetter() {
    length++;
    nameText.textContent = fullName.slice(0, length);
    if (length < fullName.length) {
      nameTimer = setTimeout(typeLetter, 95);
    } else {
      nameTimer = setTimeout(function () {
        nameHeading.classList.remove('is-typing');
      }, 350);
    }
  }
  nameTimer = setTimeout(typeLetter, 140);
}

function openPage(id) {
  var target = document.getElementById(id) || document.getElementById('about');
  pages.forEach(function (p) { p.classList.toggle('active', p === target); });
  document.body.classList.toggle('home', target.id === 'about');
  document.body.classList.toggle('projects', target.id === 'projects');
  document.body.classList.toggle('skills', target.id === 'skills');
  document.title = target.id === 'about' ? baseTitle : target.dataset.title + ' | ' + baseTitle;
  setCurrentNav(target.id);
  if (target.id === 'about') typeName();
  else {
    clearTimeout(nameTimer);
    nameHeading.classList.remove('is-typing');
    nameText.textContent = fullName;
  }
  updateScrollFades();
}

navLinks.forEach(function (link) {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    openPage(link.getAttribute('href').slice(1));
  });
});

scrollShells.forEach(function (shell) {
  var area = shell.querySelector('.scroll-area');
  if (area) area.addEventListener('scroll', updateScrollFades);
});
window.addEventListener('resize', updateScrollFades);

openPage('about');

var mindGroups = {
  games:   '#E0A32E',
  build:   '#4C8DF0',
  stories: '#A46BE0',
  making:  '#35BE87',
  design:  '#DB6BA8',
  body:    '#EC6A5C'
};

var interests = {
  'game design':            { x: 15, y: 9,  size: 2, group: 'games',   desc: "I've always loved designing games whether that was scratch when I first started, web games, or Roblox games", links: ['roblox dev', 'gaming'] },
  'roblox trading':         { x: 37, y: 9,  size: 2, group: 'games',   desc: 'Started trading around 2020 to make some quick Robux. I got hooked into it and by the time I quit in 2023, I had around 500k in items which has since inflated to around 1M', links: [] },
  'user interface':         { x: 60, y: 9,  size: 2, group: 'design',  desc: 'Always enjoyed designing things and user interfaces let me design things I could use and play around with', links: ['graphic design', 'web development'] },
  'graphic design':         { x: 84, y: 9,  size: 2, group: 'design',  desc: "I enjoy making graphics/posters/renders. I'm not too good at it but I did spend a period of time doing commission based work rendering Roblox avatars", links: ['3d modeling'] },

  'gaming':                 { x: 13, y: 27, size: 2, group: 'games',   desc: "Always enjoy playing games. I've been loyal to Roblox for a really long time but I did/do play other games like Minecraft, Clash, and Battlefront", links: ['tetris'] },
  'roblox dev':             { x: 32, y: 27, size: 1, group: 'games',   desc: 'Working on Roblox games allowed me to culminate a ton of skills I already had into 1 project at a time', links: ['roblox trading', 'virtual economies', 'user interface'] },
  'apis':                   { x: 50, y: 27, size: 2, group: 'build',   desc: 'Fascinated with data and data processing and apis helped me access it', links: ['web scraping', 'full stack development'] },
  'web scraping':           { x: 67, y: 27, size: 3, group: 'build',   desc: 'Webscraping allowed me to understand how sites handle their data and also how to secure my own systems in the future to prevent webscraping. I used to challange myself to scrape data off sites that had better security', links: ['automation'] },
  '3d modeling':            { x: 86, y: 27, size: 3, group: 'making',  desc: 'Another way for me to build. Allowed me to express creativity without physical constraints. I had a whole youtube channel dedicated to my 3d builds', links: [] },

  'tetris':                 { x: 12, y: 45, size: 3, group: 'games',   desc: 'Started playing as a way to pass time by playing a game with short rounds so I could play in between doing things. Helped me practice typing faster and have quicker reaction times (or i would like to think lol)', links: [] },
  'virtual economies':      { x: 32, y: 45, size: 2, group: 'games',   desc: 'I love working with and analyzing virtual economies', links: ['web scraping'] },
  'full stack development': { x: 61, y: 45, size: 2, group: 'build',   desc: 'As someone who liked apis and user interfaces, it was natural I progressed to full stack development', links: ['self hosting', 'web development'] },
  'self hosting':           { x: 86, y: 45, size: 3, group: 'build',   desc: 'I originally started hosting on Digital Ocean but it was expensive as hell so I taught myself how to self host and have done so for all projects since since then', links: [] },

  'reading':                { x: 11, y: 63, size: 2, group: 'stories', desc: 'Love reading sci-fi and autobiographies. Favorites include all of Andy Weir as well as Enders Game + the trilogy', links: ['sci fi', 'WW2'] },
  'hackathons':             { x: 30, y: 63, size: 1, group: 'build',   desc: 'Build, win prizes, have fun with friends', links: ['web development'] },
  'web development':        { x: 52, y: 63, size: 2, group: 'build',   desc: 'Disliked desktop/mobile app development so I built on web (also nice that it was consistent across devices)', links: [] },
  'automation':             { x: 73, y: 63, size: 2, group: 'build',   desc: 'This is how I first got started with programming: automating mundane tasks. Ever since then, I have tons of scripts that help me automate things in daily life whenever possible', links: ['typing', 'robotics'] },
  'typing':                 { x: 90, y: 63, size: 3, group: 'build',   desc: 'Typing fast allows me to code faster :) (i guess not anymore cuz of ai) Average at around 150 wpm', links: [] },

  'sci fi':                 { x: 16, y: 81, size: 2, group: 'stories', desc: 'I love space battles and cool tech what can I say', links: ['star wars'] },
  'star wars':              { x: 33, y: 81, size: 2, group: 'stories', desc: 'Been a star wars fan ever since I was young (Revenge of the Sith my favorite by far)', links: [] },
  'robotics':               { x: 65, y: 81, size: 2, group: 'making',  desc: 'Writing software to do things physically is fun', links: [] }
};

function colorOf(name) {
  var info = interests[name];
  return (info && mindGroups[info.group]) || '';
}

var mindJitter = { x: 3, y: 3 };

var mind = document.getElementById('mind');
var mindTip = document.getElementById('mindTip');
var mindPos = {};
var mindNodeEls = {};
var calmMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function livePos(name) {
  var el = mindNodeEls[name];
  if (!el) return null;
  var box = mind.getBoundingClientRect();
  if (!box.width || !box.height) return null;
  var r = el.getBoundingClientRect();
  return {
    x: ((r.left + r.width / 2) - box.left) / box.width * 100,
    y: ((r.top + r.height / 2) - box.top) / box.height * 100
  };
}

function focusNode(name) {
  var neighbours = {};
  mind.querySelectorAll('.mind-links line').forEach(function (line) {
    var hit = line.dataset.a === name || line.dataset.b === name;
    line.classList.toggle('lit', hit);
    if (hit) {
      neighbours[line.dataset.a] = true;
      neighbours[line.dataset.b] = true;
    }
  });
  mind.querySelectorAll('.node').forEach(function (node) {
    var nid = node.dataset.id;
    node.classList.toggle('on', nid === name);
    node.classList.toggle('near', nid !== name && !!neighbours[nid]);
  });
  mind.classList.add('focus');

  var info = interests[name];
  var pos = livePos(name) || mindPos[name];
  if (info && info.desc && pos) {
    mindTip.textContent = info.desc;

    var canvasWidth = mind.clientWidth;
    var halfPct = canvasWidth ? (mindTip.offsetWidth / 2 / canvasWidth) * 100 : 0;
    var tx = Math.min(100 - halfPct, Math.max(halfPct, pos.x));

    mindTip.style.setProperty('--tx', tx + '%');
    mindTip.style.setProperty('--ty', pos.y + '%');
    mindTip.classList.add('show');
  }
}

function clearFocus() {
  mind.classList.remove('focus');
  mind.querySelectorAll('.lit').forEach(function (el) { el.classList.remove('lit'); });
  mind.querySelectorAll('.node').forEach(function (n) { n.classList.remove('on', 'near'); });
  mindTip.classList.remove('show');
}

function layoutMind() {
  Object.keys(interests).forEach(function (name) {
    var n = interests[name];
    var rx = (Math.random() * 2 - 1) * mindJitter.x;
    var ry = (Math.random() * 2 - 1) * mindJitter.y;
    mindPos[name] = {
      x: Math.min(94, Math.max(7, n.x + rx)),
      y: Math.min(93, Math.max(7, n.y + ry))
    };
  });

  mind.querySelectorAll('.node').forEach(function (li) {
    var p = mindPos[li.dataset.id];
    if (!p) return;
    li.style.setProperty('--x', p.x + '%');
    li.style.setProperty('--y', p.y + '%');
  });

  mind.querySelectorAll('.mind-links line').forEach(function (line) {
    var a = mindPos[line.dataset.a];
    var b = mindPos[line.dataset.b];
    if (!a || !b) return;
    line.setAttribute('x1', a.x);
    line.setAttribute('y1', a.y);
    line.setAttribute('x2', b.x);
    line.setAttribute('y2', b.y);
  });
}

function buildMind() {
  var svg = mind.querySelector('.mind-links');
  var list = mind.querySelector('.mind-nodes');
  var drawn = {};

  Object.keys(interests).forEach(function (name) {
    (interests[name].links || []).forEach(function (other) {
      if (!interests[other]) return;
      var key = [name, other].sort().join('|');
      if (drawn[key]) return;
      drawn[key] = true;

      var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.dataset.a = name;
      line.dataset.b = other;
      var lc = colorOf(name) || colorOf(other);
      if (lc) line.style.setProperty('--lc', lc);
      svg.appendChild(line);
    });
  });

  Object.keys(interests).forEach(function (name, i) {
    var n = interests[name];
    var li = document.createElement('li');
    li.className = 'node s' + (n.size || 2);
    li.dataset.id = name;
    li.tabIndex = 0;
    mindNodeEls[name] = li;
    li.style.setProperty('--dx', (i % 2 ? 1 : -1) * (14 + (i % 4) * 4) + 'px');
    li.style.setProperty('--dy', (i % 3 ? -1 : 1) * (11 + (i % 5) * 3) + 'px');
    li.style.setProperty('--dur', (7 + (i % 5) * 1.6) + 's');
    li.style.setProperty('--delay', -(i * 0.7) + 's');

    var span = document.createElement('span');
    span.textContent = name;
    li.appendChild(span);

    li.addEventListener('mouseenter', function () { focusNode(name); });
    li.addEventListener('focus', function () { focusNode(name); });
    li.addEventListener('mouseleave', clearFocus);
    li.addEventListener('blur', clearFocus);
    list.appendChild(li);
  });

  layoutMind();
}

function trackMindLines() {
  requestAnimationFrame(trackMindLines);

  var page = mind.closest('.page');
  if ((page && !page.classList.contains('active')) || calmMotion.matches) return;

  var box = mind.getBoundingClientRect();
  if (!box.width || !box.height) return;

  var live = {};
  Object.keys(mindNodeEls).forEach(function (name) {
    var r = mindNodeEls[name].getBoundingClientRect();
    live[name] = {
      x: ((r.left + r.width / 2) - box.left) / box.width * 100,
      y: ((r.top + r.height / 2) - box.top) / box.height * 100
    };
  });

  mind.querySelectorAll('.mind-links line').forEach(function (line) {
    var a = live[line.dataset.a];
    var b = live[line.dataset.b];
    if (!a || !b) return;
    line.setAttribute('x1', a.x);
    line.setAttribute('y1', a.y);
    line.setAttribute('x2', b.x);
    line.setAttribute('y2', b.y);
  });
}

if (mind) {
  buildMind();
  requestAnimationFrame(trackMindLines);
}

// A brief ink stroke that dries away; rendering stops when the trail is empty.
(function () {
  var canvas = document.getElementById('penTrail');
  var ctx = canvas.getContext('2d');
  if (!ctx) return;
  var motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var points = [];
  var frame = 0;
  var lifetime = 500;
  var trailNav = document.querySelector('nav');
  var ink = '';

  function resizeTrail() {
    var scale = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(window.innerWidth * scale);
    canvas.height = Math.round(window.innerHeight * scale);
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
    points = [];
  }

  function drawTrail(now) {
    frame = 0;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    points = points.filter(function (point) { return now - point.time < lifetime; });
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = ink;
    for (var i = 1; i < points.length; i++) {
      var a = points[i - 1];
      var b = points[i];
      if (b.breakBefore) continue;
      var freshness = Math.max(0, 1 - (now - a.time) / lifetime);
      var previous = points[i - 2];
      var startX = previous && !a.breakBefore ? (previous.x + a.x) / 2 : a.x;
      var startY = previous && !a.breakBefore ? (previous.y + a.y) / 2 : a.y;
      ctx.globalAlpha = freshness * 0.65;
      ctx.lineWidth = 0.6 + freshness * 1.8;
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.quadraticCurveTo(a.x, a.y, (a.x + b.x) / 2, (a.y + b.y) / 2);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    if (points.length) frame = requestAnimationFrame(drawTrail);
  }

  var disconnected = true;
  document.addEventListener('pointermove', function (event) {
    if (event.pointerType !== 'mouse' || motion.matches) return;
    var navBounds = trailNav.getBoundingClientRect();
    if (event.clientX >= navBounds.left && event.clientX <= navBounds.right &&
        event.clientY >= navBounds.top && event.clientY <= navBounds.bottom) {
      disconnected = true;
      return;
    }
    var now = performance.now();
    var last = points[points.length - 1];
    points.push({
      x: event.clientX, y: event.clientY, time: now,
      breakBefore: disconnected || !last || now - last.time > 100
    });
    if (points.length > 1200) points.shift();
    disconnected = false;
    if (!frame) {
      ink = getComputedStyle(document.documentElement).getPropertyValue('--nav-blue').trim();
      frame = requestAnimationFrame(drawTrail);
    }
  }, { passive: true });
  document.documentElement.addEventListener('mouseleave', function () { disconnected = true; });
  window.addEventListener('blur', function () { disconnected = true; });
  window.addEventListener('resize', resizeTrail);
  motion.addEventListener('change', function () {
    points = [];
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    disconnected = true;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  });
  resizeTrail();
})();

document.addEventListener('mousemove', function (e) {
  document.documentElement.style.setProperty('--mx', e.clientX + 'px');
  document.documentElement.style.setProperty('--my', e.clientY + 'px');
  document.documentElement.classList.add('cursor-active');
});
document.documentElement.addEventListener('mouseenter', function () {
  document.documentElement.classList.add('cursor-active');
});
document.documentElement.addEventListener('mouseleave', function () {
  document.documentElement.classList.remove('cursor-active');
});

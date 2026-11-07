'use strict';

(function (root) {
  const version = 'tour-v3';
  const hour = 3600000;
  const learning = () => typeof module !== 'undefined' ? require('./season-learning') : root.GravelSeasonLearning;

  function precipitation({code, rainMm, snowCm, totalMm, rain}) {
    const snow = snowCm > 0 || [71,73,75,77,85,86].includes(code);
    const heavy = [63,65,67,81,82].includes(code);
    if (snow) {
      const mixed = Number.isFinite(rainMm) && rainMm > 0;
      return {snow, mixed, unknown: !Number.isFinite(rainMm), rain: mixed ? (heavy ? 2 : 1) : 0};
    }
    if (heavy) return {rain:2};
    if ([51,53,55,56,57,61,66,80].includes(code) || rainMm > 0) return {rain:1};
    return {rain: Number.isFinite(code) ? (totalMm > 0 && rainMm !== 0 ? 1 : 0) : (rain || 0)};
  }

  function lightShowerReserve(state,weather){
    const f=state.weather.forecast;
    if(!f?.weatherIntervals?.length)return false;
    const start=Date.parse(f.startAt),end=Date.parse(f.endAt);
    const journey=f.route||f.journey;
    const spans=weather.split&&journey?
      [[start,Date.parse(journey.arrivalAt)],[Date.parse(journey.returnStartAt),end]]:[[start,end]];
    const duration=spans.reduce((sum,[from,to])=>sum+to-from,0);
    const wet=[];
    let cold=false;
    for(const [from,to] of spans){
      for(const i of f.weatherIntervals.filter(i=>i.from<to&&i.to>from)){
        cold||=i.temperature<=7;
        const condition=precipitation(i);
        if(condition.snow||condition.rain>1||[56,57,66].includes(i.code))return false;
        if(!condition.rain)continue;
        if(!Number.isFinite(i.rainMm)||i.rainMm>0.3)return false;
        wet.push([Math.max(from,i.from),Math.min(to,i.to)]);
      }
    }
    wet.sort((a,b)=>a[0]-b[0]);
    let wetDuration=0,coveredUntil=-Infinity;
    for(const [from,to] of wet){
      wetDuration+=Math.max(0,to-Math.max(from,coveredUntil));
      coveredUntil=Math.max(coveredUntil,to);
    }
    return cold&&wetDuration>0&&wetDuration<=Math.min(hour,duration/2);
  }

  function phaseWeather(state) {
    const w = state.weather, f = w.forecast;
    const route = f?.route || f?.journey;
    const planned = state.tripPlan;
    const split = !!(route?.kind === 'outback' || planned?.kind === 'outback');
    const start = Date.parse(f?.startAt), end = Date.parse(f?.endAt);
    const arrival = route?.arrivalAt ? Date.parse(route.arrivalAt) : start + (planned?.minutes || 0) * 60000;
    const returnAt = route?.returnStartAt ? Date.parse(route.returnStartAt) : arrival + (planned?.stayMinutes || 0) * 60000;
    const intervals = f?.weatherIntervals || [];
    const points = f?.timeline || [];
    const overlap = (from,to) => intervals.filter(p => p.from < to && p.to > from);
    const combine = values => {
      const list = values.map(precipitation);
      return {rain: Math.max(0,...list.map(p=>p.rain)), snow:list.some(p=>p.snow),
        mixed:list.some(p=>p.mixed), unknown:list.some(p=>p.unknown)};
    };
    const make = (from,to,side,fallback) => {
      const samples = points.filter(p => Date.parse(p.at) >= from && Date.parse(p.at) <= to);
      const weather = overlap(from,to);
      const temperatures = weather.map(p=>p.temperature).filter(Number.isFinite);
      const sampleTemperatures = samples.map(p=>p.temperature).filter(Number.isFinite);
      if (!temperatures.length) temperatures.push(...sampleTemperatures);
      const maxima = weather.length && weather.every(p=>Number.isFinite(p.maxTemperature)) ?
        weather.map(p=>p.maxTemperature) : [...temperatures,...sampleTemperatures];
      const wind = Math.max(0,...[...samples,...weather].map(p=>p.windKmH || 0));
      const light = w.light && w.light !== 'auto' ? ['night','twilight'].includes(w.light) :
        [...samples,...weather].some(p=>p.lowLight);
      const fog = f ? [...samples,...weather].some(p=>p.fog) : !!w.fog;
      return {t: temperatures.length ? Math.min(...temperatures) : fallback,
        max: maxima.length ? Math.max(...maxima) : fallback,
        wind: samples.length || weather.length ? wind : [0,22,34][w.wind] || 0,
        ...(!samples.length&&!weather.length?{manualWind:w.wind}:{}),
        visible: light || fog, fog, ...combine(weather.length ? weather : samples.length ? samples :
          [{rain:f ? (side==='start'?f.start.rain:f.rain) : w.rain}]),
        effort:w.effort, cold:w.cold, feedbackPoint:side, durationMinutes:Number.isFinite(to-from)?(to-from)/60000:w.rideMinutes||planned?.minutes||null,
        radiation:samples[0]?.radiation, cloudCover:samples[0]?.cloudCover,
        leg:split?(side==='start'?'outbound':'return'):undefined};
    };
    if (split && Number.isFinite(arrival) && Number.isFinite(returnAt) && arrival>=start && returnAt>=arrival && returnAt<=end) {
      const boundary=Math.min(arrival,...overlap(start,start+1).map(p=>p.to));
      return {split, start:{...make(start,boundary,'start',w.startTemp),durationMinutes:(arrival-start)/60000}, end:make(returnAt,end,'end',w.endTemp),
        ...(boundary<arrival?{outboundLater:make(boundary,arrival,'start',w.startTemp)}:{}),
        buffer:combine([...overlap(arrival,Math.min(arrival+hour,returnAt)),...overlap(Math.max(arrival,returnAt-hour),returnAt)])};
    }
    const first = intervals.filter(p=>p.from<=start&&p.to>start);
    const boundary = first.length ? Math.min(end,...first.map(p=>p.to)) : Math.min(end,start+hour);
    const firstPhase=make(start,boundary,'start',w.startTemp);
    const later=make(boundary,end,'end',w.endTemp);
    if (Number.isFinite(boundary) && boundary>=end) Object.assign(later,firstPhase,{feedbackPoint:'end'});
    if(Number.isFinite(end-start)){firstPhase.durationMinutes=(end-start)/60000;later.durationMinutes=firstPhase.durationMinutes;}
    return {split, start:firstPhase, end:later, buffer:{rain:0}};
  }

  // Each row follows the workbook order: calm, windy, strong wind, rain.
  // Columns describe base, jersey, outer layers, trousers, gloves, head and shoes.
  const matrix = [
    [25, [
      ['', 'short', '', 'short'], ['', 'short', 'reserveVest', 'short'],
      ['', 'short', 'vest', 'short'], ['', 'short', 'shell', 'short']]],
    [20, [
      ['sleeveless','short','','short'], ['sleeveless','short','vest','short'],
      ['sleeveless','short','vest','short'], ['','short','shell','short']]],
    [16, [
      ['light','short','','short'], ['light','short','vest','short'],
      ['light','short','vest','short',false,'headband'], ['sleeveless','short','shell','short',false,'headband']]],
    [13, [
      ['light','short','arms','short'], ['light','short','vestArms','short',true,'headband'],
      ['light','short','shell','long',true,'headband'], ['light','short','shell','either',true,'headband']]],
    [10, [
      ['light','warm','','long',true], ['lightLong','warm','vest','long',true,'headband'],
      ['lightLong','warm','shell','thermal',true,'headband'], ['lightLong','warm','shell','thermal',true,'headband']]],
    [7, [
      ['thermal','warm','','thermal',true,'headband'], ['thermal','warm','vest','thermal',true,'headband'],
      ['thermal','warm','shell','thermal',true,'cap'], ['thermal','warm','shell','thermal',true,'cap',true]]],
    [4, [
      ['thermal','','jacket','thermal',true,'headband',true], ['thermal','','jacket','thermal',true,'cap',true],
      ['thermal','warm','shell','thermal',true,'cap',true], ['thermal','warm','shell','thermal',true,'cap',true]]],
    [0, [
      ['thermalWind','','jacket','thermal',true,'cap',true], ['thermalWind','','jacket','thermal',true,'cap',true],
      ['thermal','warm','shell','thermal',true,'cap',true], ['thermal','warm','shell','thermal',true,'cap',true]]],
    [-Infinity, [
      ['thermalWind','','jacket','thermal',true,'cap',true], ['thermalWind','','jacket','thermal',true,'cap',true],
      ['thermal','warm','shell','thermal',true,'cap',true], ['thermal','warm','shell','thermal',true,'cap',true]]]
  ];
  function matrixTarget(p){
    const [,row]=matrix.find(([limit])=>p.t>limit||limit===0&&p.t===0);
    const offset=Math.min(15,Math.max(0,p.t-10));
    const mode=p.rain?3:p.manualWind??(p.wind>30+offset?2:p.wind>15+offset?1:0);
    const [base,mid,outer,pants,hands,head,covers]=row[mode];
    if(p.snow&&!p.rain&&p.t<=7)return {base:'thermalWind',mid:p.t<0?'warm':'',outer:'jacket',pants:'thermal',hands:true,head:'cap',covers:true};
    return {base,mid,outer,pants,hands,head,covers};
  }

  function recommend(state,G) {
    const fixedBase=state.tourRules===version;
    const useMatrix=fixedBase||state.tourRules==='tour-v2';
    const weather=phaseWeather(state), L=learning();
    const showerReserve=useMatrix&&lightShowerReserve(state,weather);
    const outfitWeather=p=>showerReserve&&p.rain===1?{...p,rain:0}:p;
    const a=outfitWeather(weather.start), b=outfitWeather(weather.end);
    const laterWeather=weather.outboundLater&&outfitWeather(weather.outboundLater);
    const items=G.expandItems(state.items.filter(G.usable));
    const distance=(p,i)=>{
      const range=L.range(i,state,p);
      return Math.max(0,range.min-p.t,p.max-range.max);
    };
    const best=(p,list)=>list.slice().sort((x,y)=>distance(p,x)-distance(p,y))[0];
    const byType=(p,...types)=>best(p,items.filter(i=>types.includes(i.type)));
    const group=(slot)=>items.filter(i=>G.traits(i).slot===slot);
    const bases=group('base'), mids=group('mid');
    const isThermal=i=>i.type==='winterbase';
    const isWarmMid=i=>i.type==='longjersey'||i.length==='long';
    const thermalJacket=p=>byType(p,'winterjacket');
    function cores(p) {
      if(useMatrix){
        const target=matrixTarget(p);
        const baseCost=(i)=>{
          const kind=i.type==='winterbase'?(i.wind?'thermalWind':'thermal'):i.length==='long'?'lightLong':i.length==='sleeveless'?'sleeveless':'light';
          const alternatives={
            sleeveless:['sleeveless','light','lightLong','thermal','thermalWind'],
            light:['light','lightLong','sleeveless','thermal','thermalWind'],
            lightLong:['lightLong','light','thermal','thermalWind','sleeveless'],
            thermal:['thermal','thermalWind','lightLong','light','sleeveless'],
            thermalWind:['thermalWind','thermal','lightLong','light','sleeveless']
          };
          return alternatives[target.base].indexOf(kind)*4;
        };
        const jacket=thermalJacket(p);
        const useBase=!!target.base;
        const useMid=!!target.mid||target.outer==='jacket'&&(!jacket||p.t<0&&distance(p,jacket)>0);
        const baseOptions=useBase&&bases.length?bases:[null];
        const midOptions=useMid&&mids.length?mids:[null];
        return baseOptions.flatMap(base=>midOptions.map(mid=>{
          const basePenalty=base?baseCost(base):0;
          const dedicatedWindstopper=base?.type==='winterbase'&&base.wind&&
            /wind[\s-]*stopper/i.test([base.model,base.name].join(' '));
          const modelPreference=dedicatedWindstopper?
            (target.base==='thermalWind'?-0.1:target.base==='thermal'?0.1:0):0;
          const midPenalty=mid&&isWarmMid(mid)!==(target.mid!=='short')?8:0;
          const adjustment=base&&mid?L.preference(state,p,[base,mid],G.traits):0;
          return {base,mid,order:basePenalty+midPenalty,learned:adjustment<0,
            score:basePenalty+midPenalty+modelPreference+2*(base?distance(p,base):0)+2*(mid?distance(p,mid):0)+adjustment};
        })).sort((x,y)=>x.score-y.score);
      }
      const choices=[];
      for(const base of bases) for(const mid of mids){
        const t=p.t, long=base.length==='long', warm=isWarmMid(mid);
        let order;
        if(t<=0)order=(isThermal(base)?0:9)+(warm?0:8);
        else if(t<=5)order=isThermal(base)&&warm?0:
          thermalJacket(p)&&((isThermal(base)&&!warm)||(base.length==='short'&&warm))?1:10;
        else if(t<=10)order=(base.length==='short'&&warm)||(long&&!warm)?0:8;
        else if(t<=15)order=base.length==='short'&&!warm?0:long&&!warm?3:8;
        else order=['short','sleeveless'].includes(base.length)&&!warm?0:8;
        const learned=L.preference(state,p,[base,mid],G.traits);
        const adjustment=learned<0&&[base,mid].some(i=>Math.max(i.min-p.t,p.t-i.max)>2)?0:learned;
        const comfort=((p.effort??1)-(p.cold??1))*(Number(isThermal(base))+Number(warm))*.25;
        choices.push({base,mid,order, learned:adjustment<0, score:order+2*distance(p,base)+2*distance(p,mid)+comfort+adjustment});
      }
      return choices.sort((x,y)=>x.score-y.score);
    }
    const ac=cores(a),bc=cores(b);
    let first=ac[0],last=bc[0],sharedBase=false,sharedGloves=false;
    if(!useMatrix&&weather.split&&Math.round(a.t)===14&&Math.round(b.t)===10&&a.wind<=15&&b.wind<=15&&
      !a.rain&&!b.rain&&!a.snow&&!b.snow&&!weather.buffer.rain&&first?.mid.length==='short'){
      const retained=bc.find(c=>c.base.id===first.base.id&&c.mid.id===first.mid.id);
      if(retained){last=retained;sharedBase=true;}
    }
    if (!useMatrix && weather.split && Math.round(a.t)===12 && Math.round(b.t)===5 && first?.base?.length==='short') {
      const exception=bc.find(c=>c.base.id===first.base.id&&isWarmMid(c.mid));
      if(exception){last={...exception,windException:true};sharedBase=true;}
    }
    if(!fixedBase && !sharedBase && first && last && first.base&&last.base&&first.base.id!==last.base.id){
      const pairs=[];
      for(const x of ac)for(const y of bc){
        if(!x.base||!y.base||x.base.id!==y.base.id||x.order>3||y.order>3)continue;
        if(distance(a,x.base)>Math.max(1,distance(a,first.base))||distance(b,y.base)>Math.max(1,distance(b,last.base)))continue;
        if(x.score+y.score<=first.score+last.score+3)pairs.push([x,y]);
      }
      pairs.sort((x,y)=>x[0].score+x[1].score-y[0].score-y[1].score);
      if(pairs.length){[first,last]=pairs[0];sharedBase=true;}
    }
    const laterCore=useMatrix&&weather.outboundLater?cores(laterWeather)[0]:null;
    const tourBase=fixedBase?(last?.base||laterCore?.base||first?.base):null;
    if(tourBase){
      first={...first,base:tourBase};
      last={...last,base:tourBase};
      sharedBase=true;
    }
    function gloves(p){
      if(state.optional.hands==='none')return null;
      const candidates=items.filter(i=>['wintergloves','gloves'].includes(i.type));
      if(useMatrix?!matrixTarget(p).hands:false)return null;
      if(useMatrix||p.t<=10)return best(p,candidates.filter(i=>i.type==='wintergloves'))||best(p,candidates);
      return best(p,candidates.filter(i=>i.type==='gloves'&&distance(p,i)===0&&(!i.wind||p.t<16)));
    }
    let ga=gloves(a),gb=gloves(b);
    const warm=Math.max(a.t,b.t),cold=Math.min(a.t,b.t),warmPair=ga?.type==='wintergloves'?ga:gb;
    if(ga&&gb&&ga.id!==gb.id&&warmPair?.type==='wintergloves'&&cold<=10&&warm<16&&warm-cold<=4&&
      !a.rain&&!b.rain&&!a.snow&&!b.snow&&!weather.buffer.rain&&!weather.buffer.snow&&cold>=warmPair.min&&
      (Math.max(a.max,b.max)<=warmPair.max+4||(Math.round(a.t)===14&&Math.round(b.t)===10))){
      ga=gb=warmPair;sharedGloves=true;
    }
    function dress(p,core,hand) {
      const target=useMatrix?matrixTarget(p):null;
      const worn=[], warnings=[], reasons=new Map(), gaps=Object.fromEntries(['torso','legs'].map(zone=>[zone,{foundation:false,outer:false,rain:0,wind:0,warmth:0}]));
      const add=(i,why)=>{
        if(!i)return;
        if(!worn.some(x=>x.id===i.id))worn.push({...i});
        const prior=reasons.get(i.id);
        reasons.set(i.id,prior&&prior!==why?prior+' · '+why:why);
      };
      const shell=byType(p,'lupra'), overpants=byType(p,'luprapants'), jacket=thermalJacket(p), vest=byType(p,'vest');
      const windJacket=best(p,items.filter(i=>G.traits(i).slot==='jacket'&&i.type!=='winterjacket'&&i.wind))||shell;
      const requireItem=(i,reason)=>i?add(i,reason):warnings.push('Bestandslücke: '+reason+'.');
      const base=target?core?.base:core?.base||best(p,bases),mid=target?core?.mid:core?.mid||best(p,mids);
      add(base,sharedBase?'Gemeinsamer Baselayer':'Baselayer');add(mid,core?.learned?'Trikot · vergleichbare Rückmeldungen berücksichtigt':'Trikot');
      const torsoReady=target?!!(mid||target.outer==='jacket'&&jacket):!!(base&&mid);
      if(!torsoReady){gaps.torso.foundation=true;warnings.push('Trikot oder passende Thermojacke fehlt.');}
      if(target?.base&&target.base!=='thermalWind'&&!base)warnings.push('Bestandslücke: passender Baselayer.');
      const windThermalBase=i=>!!i&&isThermal(i)&&i.wind;
      if(target?.base==='thermalWind'&&!windThermalBase(base)){
        const available=best(p,bases.filter(windThermalBase));
        if(available){
          warnings.push(available.name+' ist verfügbar. '+(sharedBase?
            'Für die gesamte Tour ist '+base.name+' als gemeinsamer Baselayer eingeplant.':
            'Für diesen Fahrabschnitt ist '+(base?.name||'eine andere Schicht')+' eingeplant.'));
        }else{
          warnings.push('Kein windschützender Thermo-Baselayer mit hinterlegtem Windschutz verfügbar.');
        }
      }
      if(target?.base==='lightLong'&&base?.length!=='long'&&base)warnings.push('Leichter Langarm-Baselayer fehlt in der gewählten Kombination. Ärmelschutz der übrigen Schichten prüfen.');
      const long=[base,mid].some(i=>i?.length==='long');
      const fullWind=()=>{
        if(worn.some(i=>['lupra','winterjacket'].includes(i.type)&&i.wind))return;
        requireItem(windJacket,'Windschutz für Rumpf und Arme');
      };
      if(target){
        const arms=byType(p,'arms');
        if(target.outer==='jacket'){
          if(jacket)add(jacket,'Thermo-Außenschicht für trockene Kälte');
          else {warnings.push('Thermojacke fehlt. Thermotrikot und Windschutz als Ersatz prüfen.');fullWind();}
        }
        if(target.outer==='shell'){
          if(shell)add(shell,p.rain?'Regenschutz während der Fahrt':'Windschutz für Rumpf und Arme');
          else{
            if(p.rain)warnings.push('Bestandslücke: wasserdichte Regenjacke.');
            if(jacket?.wind&&p.t<=13)add(jacket,'Windschutz als Ersatz');
            else if(vest?.wind){
              add(vest,'Windschutz am Rumpf als Ersatz');
              if(arms?.wind&&!long&&mid?.length==='short'&&state.optional.arms!=='none')add(arms,'Windschutz an den Armen als Ersatz');
              else warnings.push('Windschutz an den Armen bleibt eingeschränkt.');
            }else warnings.push('Bestandslücke: Windschutz für Rumpf und Arme.');
          }
        }
        if(target.outer==='vest'||target.outer==='vestArms'){
          if(vest?.wind&&(target.outer!=='vestArms'||arms?.wind||state.optional.arms==='none'||long))add(vest,'Windschutz am Rumpf');else fullWind();
        }
        if(['arms','vestArms'].includes(target.outer)&&state.optional.arms!=='none'&&!long&&mid?.length==='short'){
          if(arms?.wind)add(arms,'Windschutz an den Armen');
          else fullWind();
        }
        if(p.t<=7&&(!jacket||target.outer==='shell')&&(!base||!isThermal(base)||!mid||!isWarmMid(mid))){
          gaps.torso.warmth=1;
          warnings.push('Wärmereserve am Oberkörper prüfen. Wind- und Regenschutz ersetzen keine Isolierung.');
        }
      }else if(p.t<=0||(p.t<=5&&!core?.windException&&(p.snow&&!p.mixed&&!p.unknown||p.t<5&&p.visible&&!p.rain)&&jacket&&distance(p,jacket)===0)){
        requireItem(jacket,'Thermojacke für die kalte Fahrphase');
        if(!jacket?.wind)fullWind();
      }else if(p.t<=5) {
        if(!core?.windException&&core?.order===1&&jacket) add(jacket,'Thermoschicht');
        else fullWind();
      }
      if(!target&&p.rain)requireItem(shell,p.mixed?'Nässeschutz bei Schnee mit Regenanteil':'Regenschutz während der Fahrt');
      const offset=Math.min(15,Math.max(0,p.t-10)), windy=p.wind>15+offset;
      const protectedTorso=worn.some(i=>i.wind&&['jacket','shell'].includes(G.traits(i).slot));
      if(!target&&p.t>5&&!protectedTorso){
        if(p.wind>30+offset||(windy&&long))fullWind();
        else if(windy||p.t<=10){
          if(vest?.wind)add(vest,'Windschutz am Rumpf');else fullWind();
          if(vest?.wind&&!long&&mid?.length==='short'&&state.optional.arms!=='none')requireItem(byType(p,'arms'),'Armlinge als Windschutz');
        }
      }
      if(p.visible){
        const outer=worn.find(i=>i.type==='lupra')||worn.find(i=>G.traits(i).slot==='jacket')||worn.find(i=>i.type==='vest');
        if(outer?.visibilityPriority)outer.outerForVisibility=outer.type==='vest';
        else if(vest?.visibilityPriority){add(vest,'Sichtbarkeit');worn.find(i=>i.id===vest.id).outerForVisibility=true;}
        else warnings.push('Sichtbarkeit: sichtbare Außenschicht fehlt.');
      }
      const desiredLength=target?target.pants==='short'?'short':target.pants==='either'?null:'long':p.t>=16?'short':'long';
      const wantsThermal=target?target.pants==='thermal':p.t<=5;
      const pants= (wantsThermal?byType(p,'thermolegs'):null)||best(p,items.filter(i=>['rr','shorts','cyclingpants','thermolegs'].includes(i.type)&&(!desiredLength||i.length===desiredLength)&&i.type!=='thermolegs'))||
        byType(p,'rr','shorts','cyclingpants','thermolegs');
      requireItem(pants,'Äußere Hose');
      const padded=pants&&['cyclingpants','thermolegs'].includes(pants.type);
      if(!padded)requireItem(byType(p,'c3'),'Gepolsterte Innenhose');
      if(((target?wantsThermal:p.t<=10)&&pants?.type!=='thermolegs')||p.rain===2||p.mixed||
        p.rain===1&&L.wetNeed(state,p,worn,'legs'))requireItem(overpants,p.mixed?'Nässeschutz bei Schnee mit Regenanteil':p.rain===2?'Regenschutz an den Beinen':'Wind- oder Nässeschutz an den Beinen');
      if(target&&wantsThermal&&pants?.type!=='thermolegs')warnings.push('Thermohose fehlt. Die Überhose ergänzt den Windschutz, die Beinisolierung bleibt begrenzt.');
      if(p.t<=0&&pants?.type!=='thermolegs')warnings.push('Zusätzliche Beinisolierung durch eine lange Unterhose erforderlich.');
      if(!pants)gaps.legs.foundation=true;
      add(hand,sharedGloves?'Ein Paar für die gesamte Tour':'Handschutz');
      if((target?target.hands:p.t<=10)&&!hand&&state.optional.hands!=='none')warnings.push('Bestandslücke: geeignete Handschuhe.');
      if(target&&target.head&&state.optional.cap!=='none'){
        const fallback=target.head==='headband'?'cap':'headband';
        requireItem(byType(p,target.head)||byType(p,fallback),'Kopfschutz');
      }else if(!target&&state.optional.cap!=='none'&&p.t<=10){
        const cap=p.t<=5?byType(p,'cap'):byType(p,'headband','cap');
        if(cap&&(distance(p,cap)===0||p.t<=5))add(cap,'Kopfschutz');
      }
      const buff=byType(p,'buff');
      if(state.optional.buff!=='none'&&buff&&distance(p,buff)===0)add(buff,'Persönlicher Halsbereich');
      if(state.optional.covers!=='none'&&((target?target.covers:p.t<=5)||p.rain===2||p.rain===1&&L.wetNeed(state,p,worn,'feet'))){
        const covers=byType(p,'covers');
        requireItem(covers,p.t<=5?'Fußwärme':'Nässeschutz an den Füßen');
        if(p.rain&&covers&&!covers.rain)warnings.push('Überschuhe bieten begrenzten Nässeschutz.');
      }
      if(!target&&p.t<=5&&core?.order>3&&!core.windException){gaps.torso.warmth=1;warnings.push('Zusätzliche Wärmeisolierung am Oberkörper erforderlich.');}
      if(p.rain&&!shell)gaps.torso.rain=p.rain;
      if((p.rain===2||p.mixed)&&!overpants)gaps.legs.rain=p.rain;
      if(p.unknown)warnings.push('Schnee mit unbekanntem Regenanteil: Lupra-Jacke und -Hose als optionale Reserve prüfen.');
      for(const i of worn)if(distance(p,i)>0)warnings.push(i.name+' liegt für diese Fahrphase außerhalb deines persönlichen oder gelernten Bereichs ('+reasons.get(i.id)+').');
      return {items:G.sortItems(worn),reasons,warnings,gaps,wearable:!!(torsoReady&&pants)};
    }
    const end=dress(b,last,gb);
    const continuous=!weather.split&&a.t>b.t&&a.t-b.t<=2&&a.rain===b.rain&&a.snow===b.snow&&
      a.visible===b.visible&&Math.abs(a.wind-b.wind)<=5&&end.wearable;
    const start=continuous?end:dress(a,first,ga);
    const outbound=weather.outboundLater?dress(laterWeather,tourBase?{...laterCore,base:tourBase}:useMatrix?laterCore:first,useMatrix?gloves(laterWeather):ga):null;
    const startIds=new Set(start.items.map(i=>i.id)),endIds=new Set(end.items.map(i=>i.id));
    const later=[...new Map([...(outbound?.items||[]),...end.items].filter(i=>!startIds.has(i.id)).map(i=>[i.id,i])).values()];
    const snowReserve=[a,b,weather.outboundLater].some(p=>p?.unknown);
    const reserveShell=showerReserve?byType(b,'lupra'):null;
    const bufferParts=weather.buffer.rain||snowReserve||reserveShell ? [byType(b,'lupra')] : [];
    if(weather.buffer.rain===2||weather.buffer.mixed||snowReserve)bufferParts.push(byType(b,'luprapants'));
    if(weather.buffer.rain===2&&state.optional.covers!=='none')bufferParts.push(byType(b,'covers'));
    const windReserve=useMatrix&&[a,b,weather.outboundLater].some(p=>p&&matrixTarget(p).outer==='reserveVest')?byType(b,'vest'):null;
    if(windReserve&&!bufferParts.some(i=>i?.id===windReserve.id))bufferParts.push(windReserve);
    const pack=G.sortItems([...later,...bufferParts.filter(i=>i&&!startIds.has(i.id)&&!later.some(x=>x.id===i.id))]);
    const variantChanges=start.items.flatMap(i=>{
      const next=end.items.find(x=>x.id===i.id);
      return next&&i.selectedVariant&&next.selectedVariant&&i.selectedVariant!==next.selectedVariant?
        [{id:i.id,name:i.name,from:i.length,to:next.length}]:[];
    });
    const packComponents=variantChanges.filter(v=>v.from==='short'&&v.to==='long').map(v=>G.zipoffComponent(start.items.find(i=>i.id===v.id)));
    const row=(item,group,reason)=>({item,type:item.type,group,reason});
    const rows=[...start.items.map(i=>row(i,'start',start.reasons.get(i.id))),...pack.map(i=>row(i,'pack',outbound?.reasons.has(i.id)?'Später auf dem Hinweg: '+outbound.reasons.get(i.id):end.reasons.get(i.id)||(i.id===windReserve?.id?'Optionale Windweste für Abfahrten':i.id===reserveShell?.id?'Regenreserve bei möglichem kurzem Schauer':snowReserve?'Optionale Reserve bei unklarem Regenanteil':'Regenschutzreserve im Wetterpuffer')))];
    const assessment=x=>Object.fromEntries(['torso','legs'].map(zone=>{
      const traits=x.items.filter(i=>G.traits(i).zone===zone).map(G.traits);
      return [zone,{warmth:traits.reduce((n,p)=>n+p.warmth,0),wind:Math.max(0,...traits.map(p=>p.wind)),
        rain:Math.max(0,...traits.map(p=>p.rain)),breathability:Math.min(3,...traits.map(p=>p.breathability)),gaps:x.gaps[zone]}];
    }));
    const substitute=phase=>{
      const pants=phase.items.filter(i=>['rr','shorts','cyclingpants','luprapants'].includes(i.type));
      return pants.some(i=>i.type==='luprapants')&&pants.length>1?{status:'yellow',items:pants,target:'windgeschützte Thermohose',explanation:'Außenhose und Regenhose ergänzen den Windschutz.',windSufficient:pants.some(i=>i.type==='luprapants'&&i.wind),warmthSufficient:false,limitation:'Die Regenhose ergänzt den Windschutz. Ihre Wärmeisolierung ist begrenzt.'}:null;
    };
    const target=useMatrix?matrixTarget(b):null;
    const endTargets=[{label:'Oberkörper',value:target?(target.outer==='jacket'?'Thermo-Baselayer und Thermojacke':target.mid==='warm'?'Baselayer und Thermotrikot':'Kurzarmtrikot'+(target.base?' mit Baselayer':'')):b.t<=5?'Baselayer und Trikot mit zusätzlicher Wärme- oder Windschutzschicht':'Baselayer und Trikot mit passender Armlänge'},
      {label:'Beine',value:target?({short:'Kurze Radhose',long:'Lange Radhose',either:'Kurze oder leichte lange Radhose',thermal:'Thermohose'})[target.pants]:b.t>=16?'Kurze Außenhose':b.t<=10?'Lange Hose mit zusätzlichem Windschutz oder passende Thermohose':'Lange Außenhose'},
      ...(b.rain?[{label:'Regenschutz',value:b.rain===2||b.mixed?'Regenjacke und Regenhose':'Regenjacke'}]:[]),
      ...(b.visible?[{label:'Sichtbarkeit',value:'Sichtbare Außenschicht'}]:[])];
    return {modelVersion:useMatrix?state.tourRules:'tour-v1',phaseWeather:weather,wearable:start.wearable,endWearable:end.wearable,
      rows,endItems:end.items,variantChanges,packComponents,remove:start.items.filter(i=>!endIds.has(i.id)).map(i=>row(i,'start')),
      baselayerPlan:{minimum:Math.min(a.t,b.t),personal:true},assessment:assessment(start),endAssessment:assessment(end),
      sourceStatus:{start:[],end:[]},targets:[],endTargets,replacements:{start:substitute(start),end:substitute(end)},continuous,felt:a.t,endFelt:b.t,
      warnings:[...start.warnings.map(v=>'Tourstart: '+v),...(outbound?.warnings||[]).map(v=>'Später auf dem Hinweg: '+v),...end.warnings.map(v=>'Später: '+v),
        ...(showerReserve?[reserveShell?
          'Möglicher kurzer Schauer: Kälteschutz bleibt eingeplant. Regenjacke bei Bedarf anziehen.':
          'Möglicher kurzer Schauer: Kälteschutz bleibt eingeplant. Keine Regenjacke als Reserve verfügbar.']:[]),
        ...L.experienceHints(state,a,start.items),...L.experienceHints(state,b,end.items),
        ...(continuous?['Bei geringer Abkühlung gleich etwas wärmer starten und unterwegs möglichst wenig wechseln.']:[]),
        ...(sharedBase?['Gemeinsamer Baselayer für beide Fahrabschnitte.']:[]),
        ...(sharedGloves?['Ein Handschuhpaar für beide Fahrabschnitte.']:[])],
      learning:{zones:{start:{},end:{}}}};
  }

  const api={version,precipitation,phaseWeather,recommend};
  root.GravelTourRules=api;
  if(typeof module!=='undefined')module.exports=api;
})(globalThis);

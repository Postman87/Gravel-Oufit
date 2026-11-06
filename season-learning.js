'use strict';

(function(root){
  const personal=()=>typeof module!=='undefined'?require('./personal'):root.GravelPersonal;
  const baseTypes=new Set(['base','winterbase']);
  const midTypes=new Set(['jersey','longjersey']);
  const legZones=['legs','thighs','knees','lowerLegs'];
  const cap=(x,min,max)=>Math.max(min,Math.min(max,x));
  function remap(value,oldRange,newRange){
    if(!oldRange||!Number.isFinite(oldRange.min)||!Number.isFinite(oldRange.max)||
      oldRange.max<=oldRange.min||value<oldRange.min||value>oldRange.max)return value;
    return newRange.min+(value-oldRange.min)*(newRange.max-newRange.min)/(oldRange.max-oldRange.min);
  }
  function actualItems(ride){
    const known=ride.reviewedItems||ride.items||[];
    if(ride.itemUsage)return known.filter(i=>ride.itemUsage.some(x=>x.id===i.id));
    if(ride.wornItemIds)return known.filter(i=>ride.wornItemIds.includes(i.id));
    return [];
  }
  function records(state,p,zone,kind){
    if(!state.learning?.enabled)return [];
    const P=personal(), output=[];
    for(const ride of state.rides||[]){
      const segments=ride.outboundReview?
        [[{...ride.outboundReview,actualWeather:ride.actualWeather,weatherPending:ride.weatherPending},'outbound'],[ride,'return']]:
        [[ride,undefined]];
      for(const [segment,leg] of segments){
        if(!segment.learningEligible||p.leg!==leg||segment.weather?.effort!==p.effort||
          segment.weatherPending&&!segment.actualWeather)continue;
        const from=Date.parse(segment.feedbackWindow?.startAt||segment.startedAt);
        const to=Date.parse(segment.feedbackWindow?.endAt||segment.endedAt);
        if(Number.isFinite(p.durationMinutes)&&Number.isFinite(to-from)&&Math.abs((to-from)/60000-p.durationMinutes)>Math.max(15,p.durationMinutes*.25))continue;
        const worn=actualItems(segment);
        if(!worn.length)continue;
        const entries=segment.feedbackEntries?.length?segment.feedbackEntries:
          [{context:segment.feedbackPeriod||'whole',zoneFeedback:segment.zoneFeedback}];
        for(const e of entries){
          if(p.terrain?e.context!==p.terrain:e.context!=='whole'&&e.context!==p.feedbackPoint)continue;
          const rating=(kind==='wet'?e.wetFeedback:e.zoneFeedback)?.[zone];
          if(!rating)continue;
          const c=P.conditions({...segment,feedbackPeriod:p.terrain?'whole':e.context});
          if(!Number.isFinite(c?.meanTemperature)||!P.similar(c,{...p,wind:p.wind>30?2:p.wind>15?1:0}))continue;
          const used=worn.filter(i=>!segment.itemUsage||segment.itemUsage.some(x=>x.id===i.id&&(x.period==='whole'||x.period===e.context)));
          if(used.length)output.push({id:ride.id,at:Date.parse(segment.endedAt),rating,temperature:c.meanTemperature,worn:used});
        }
      }
    }
    return output.sort((a,b)=>a.at-b.at);
  }
  function agreed(samples,rating){
    const unique=new Map();
    for(const sample of samples){
      const previous=unique.get(sample.id);
      unique.set(sample.id,{...sample,rating:previous&&previous.rating!==sample.rating?'conflict':sample.rating});
    }
    const latest=[...unique.values()].slice(-3);
    return latest.length===3&&latest.every(r=>r.rating===rating)?latest:[];
  }
  function range(item,state,p){
    const bounds={min:item.min,max:item.max};
    const zone=personal().zones[item.type];
    const samples=records(state,p,zone,'heat').flatMap(r=>{
      const former=r.worn.find(i=>i.id===item.id);
      if(!former)return [];
      const temperature=remap(r.temperature,former,bounds);
      return Math.abs(temperature-p.t)<=2?[{...r,temperature}]:[];
    });
    const upper=agreed(samples.filter(r=>r.temperature>=bounds.max-2),'hot');
    const lower=agreed(samples.filter(r=>r.temperature<=bounds.min+2),'cold');
    const fitting=agreed(samples,'right');
    let {min,max}=bounds;
    if(upper.length)max-=cap(Math.ceil(bounds.max-Math.min(...upper.map(x=>x.temperature))+1),1,2);
    if(lower.length)min+=cap(Math.ceil(Math.max(...lower.map(x=>x.temperature))-bounds.min+1),1,2);
    if(fitting.length){
      min=Math.min(min,Math.max(bounds.min-2,Math.floor(Math.min(...fitting.map(x=>x.temperature)))));
      max=Math.max(max,Math.min(bounds.max+2,Math.ceil(Math.max(...fitting.map(x=>x.temperature)))));
    }
    return {min:Math.min(min,max),max,count:new Set(samples.map(r=>r.id)).size};
  }
  function warmth(items,zone,traits){
    return items.reduce((n,i)=>n+(zone==='arms'&&i.length!=='long'?0:traits(i).warmth),0);
  }
  function preference(state,p,items,traits){
    let score=0;
    for(const zone of ['arms','torso']){
      const samples=records(state,p,zone,'heat').filter(r=>Math.abs(r.temperature-p.t)<=2);
      const key=values=>values.map(i=>i.id).sort().join('|');
      const core=r=>r.worn.filter(i=>baseTypes.has(i.type)||midTypes.has(i.type));
      const outer=r=>r.worn.filter(i=>['winterjacket','lupra','vest','arms'].includes(i.type));
      // Core-only learning is limited to experiences with the same unprotected context.
      const relevant=samples.filter(r=>core(r).length===2&&!outer(r).length&&p.t>5&&!p.rain&&!p.visible&&p.wind<=15);
      const exact=relevant.filter(r=>key(core(r))===key(items));
      if(agreed(exact,'right').length){score-=16;continue;}
      if(agreed(exact,'cold').length||agreed(exact,'hot').length){score+=14;continue;}
      const reference=relevant.at(-1);
      if(!reference)continue;
      const referenceItems=core(reference);
      const matching=relevant.filter(r=>key(core(r))===key(referenceItems));
      const cold=agreed(matching,'cold'), hot=agreed(matching,'hot');
      const delta=warmth(items,zone,traits)-warmth(referenceItems,zone,traits);
      if((cold.length&&delta>0)||(hot.length&&delta<0)){
        const changedBase=items[0].id!==referenceItems.find(i=>baseTypes.has(i.type))?.id;
        const changed=items.filter(i=>!referenceItems.some(x=>x.id===i.id)).length;
        score-=changed===1?(changedBase?15:13):7;
      }
    }
    return score;
  }
  function wetNeed(state,p,worn,zone){
    const zones=zone==='legs'?legZones:[zone];
    const present=worn.filter(i=>zones.includes(personal().zones[i.type])).map(i=>i.id).sort().join('|');
    return zones.some(z=>agreed(records(state,p,z,'wet').filter(r=>Math.abs(r.temperature-p.t)<=2&&
      r.worn.filter(i=>zones.includes(personal().zones[i.type])).map(i=>i.id).sort().join('|')===present),'outside').length);
  }
  function experienceHints(state,p,worn){
    const matching=sample=>Math.abs(sample.temperature-p.t)<=2&&sample.worn.every(i=>worn.some(x=>x.id===i.id))&&sample.worn.length===worn.length;
    const hints=[];
    const zones={torso:'Rumpf',arms:'Arme',legs:'Beine',thighs:'Oberschenkel',knees:'Knie',lowerLegs:'Unterschenkel',feet:'Füße',head:'Kopf',face:'Gesicht',hands:'Hände',neck:'Hals'};
    for(const [zone,label] of Object.entries(zones)){
      if(agreed(records(state,p,zone,'wet').filter(matching),'sweat').length)hints.push(label+': Bei dieser Kombination war es wiederholt durch Schwitzen feucht. Belüftung prüfen.');
      for(const [terrain,name] of [['ascent','Anstiege'],['descent','Abfahrten']]){
        const samples=records(state,{...p,terrain},zone,'heat').filter(matching);
        if(agreed(samples,'cold').length)hints.push(name+' · '+label+': Mit dieser Kombination war es wiederholt zu kalt.');
        if(agreed(samples,'hot').length)hints.push(name+' · '+label+': Mit dieser Kombination war es wiederholt zu warm. Belüftung prüfen.');
      }
    }
    return hints;
  }
  function exportState(state){
    return {...state,exportedAt:new Date().toISOString(),seasonExportVersion:1,
      seasonIndex:(state.rides||[]).map(r=>({
        rideId:r.id, startedAt:r.startedAt, ruleVersion:r.recommendation?.modelVersion||null,
        sections:[...(r.outboundReview?[{kind:'outbound',review:r.outboundReview}]:[]),
          {kind:r.outboundReview?'return':'ride',review:r}].map(({kind,review})=>({
          kind, startAt:review.feedbackWindow?.startAt||review.startedAt,endAt:review.endedAt,
          evaluation:review.feedbackUnrated?'unreviewed':review.feedbackEntries?.length?'zonal':review.feedback?'overall':'unreviewed',
          confirmedItemIds:actualItems(review).map(i=>i.id)
        }))
      }))};
  }
  const api={remap,range,preference,wetNeed,experienceHints,exportState,actualItems};
  root.GravelSeasonLearning=api;
  if(typeof module!=='undefined')module.exports=api;
})(globalThis);

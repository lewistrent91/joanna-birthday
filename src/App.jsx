import { useState, useEffect, useRef, useCallback } from "react";

const PF = "'Playfair Display',Georgia,serif";
const INT = "'Inter',sans-serif";
const PLUM = "#2D0F4E", PLUMDK = "#1A0830", GOLD = "#F4C430", CHAMP = "#F7E7CE", MUTED = "#7A6A8A";
const MEDALS = ["🥇","🥈","🥉"];


const PALETTE = [
  { num:1, hex:"#C8A2C8", name:"Lilac" }, { num:2, hex:"#FFB6C1", name:"Pink" },
  { num:3, hex:"#9966CC", name:"Purple" }, { num:4, hex:"#FFD700", name:"Gold" },
  { num:5, hex:"#F5DEB3", name:"Cream" }, { num:6, hex:"#FF8C00", name:"Orange" },
  { num:7, hex:"#4CAF50", name:"Green" }, { num:8, hex:"#87CEEB", name:"Sky Blue" },
];
const REGIONS = [
  {id:"bg",n:8},{id:"plate",n:5},{id:"tier1",n:2},{id:"tier2",n:3},{id:"tier3",n:4},
  {id:"frost1",n:1},{id:"frost2",n:1},{id:"frost3",n:1},
  {id:"c1",n:4},{id:"c2",n:4},{id:"c3",n:4},
  {id:"f1",n:6},{id:"f2",n:6},{id:"f3",n:6},
  {id:"d1",n:7},{id:"d2",n:7},{id:"d3",n:7},{id:"d4",n:7},
];

// ── Shared UI ─────────────────────────────────────────────────────────────────
function Btn({ onClick, children, style, v="gold" }) {
  const base = { width:"100%", border:"none", borderRadius:12, padding:"13px 18px", fontFamily:INT, fontWeight:700, fontSize:14, cursor:"pointer", transition:"opacity .15s" };
  const vs = {
    gold: { ...base, background:GOLD, color:PLUM },
    outline: { ...base, background:"transparent", border:`1.5px solid ${MUTED}`, color:MUTED },
    ghost: { ...base, background:"none", color:CHAMP, opacity:.6, fontSize:13, textDecoration:"underline", width:"auto" },
  };
  return <button onClick={onClick} style={{...(vs[v]||vs.gold),...style}}
    onMouseEnter={e=>e.currentTarget.style.opacity=".82"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>{children}</button>;
}
function Card({ children, style }) {
  return <div style={{ background:"#fff", borderRadius:20, boxShadow:"0 8px 32px rgba(45,15,78,.22)", padding:28, maxWidth:470, width:"100%", ...style }}>{children}</div>;
}
function TopBar({ onBack, title, right }) {
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 20px", background:"rgba(26,8,48,.97)", borderBottom:"1px solid rgba(244,196,48,.2)" }}>
      <button onClick={onBack} style={{ background:"none", border:"none", cursor:"pointer", color:CHAMP, fontSize:14, fontFamily:INT, opacity:.8 }}>← Home</button>
      <span style={{ color:GOLD, fontFamily:PF, fontSize:16, fontWeight:700 }}>{title}</span>
      <div style={{ minWidth:60, textAlign:"right" }}>{right||null}</div>
    </div>
  );
}
function Screen({ onBack, title, right, children }) {
  return (
    <div style={{ minHeight:600, display:"flex", flexDirection:"column", background:`linear-gradient(160deg,${PLUMDK} 0%,${PLUM} 100%)` }}>
      <TopBar onBack={onBack} title={title} right={right} />
      <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"20px 16px", gap:14 }}>{children}</div>
    </div>
  );
}

// ── Home ──────────────────────────────────────────────────────────────────────
function Home({ go }) {
  const [vis, setVis] = useState(false);
  useEffect(() => { setTimeout(() => setVis(true), 80); }, []);
  const games = [
    { e:"🧩", t:"Puzzle", d:"Put the picture back together!", v:"puzzle" },
    { e:"🐦", t:"Joanna Bird", d:"Flap through the 1950s!", v:"bird" },
    { e:"👾", t:"Pac Mom", d:"Eat dots, avoid the ghosts!", v:"pacmom" },
    { e:"🍬", t:"Joanna Crush", d:"Match-3 with a 1950s twist!", v:"crush" },
    { e:"🔢", t:"Sudoku", d:"Numbers puzzle — password required!", v:"sudoku" },
    { e:"🔓", t:"Decoder", d:"Crack the secret message!", v:"decoder" },
  ];
  return (
    <div style={{ minHeight:600, background:`linear-gradient(160deg,${PLUMDK} 0%,${PLUM} 60%,#4A1565 100%)` }}>
      <div className="fu" style={{ textAlign:"center", padding:"46px 24px 30px" }}>
        <div style={{ fontSize:58, lineHeight:1, marginBottom:16 }}>🎂</div>
        <div style={{ fontFamily:PF, color:"#fff", fontWeight:900, fontSize:"clamp(1.8rem,5vw,3rem)", lineHeight:1.1 }}>Joanna Loftus</div>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:12, margin:"10px 0 6px" }}>
          <div style={{ flex:1, maxWidth:70, height:1, background:GOLD, opacity:.6 }} />
          <span style={{ color:GOLD, fontFamily:PF, fontStyle:"italic", fontSize:16 }}>Celebrating 70 Years</span>
          <div style={{ flex:1, maxWidth:70, height:1, background:GOLD, opacity:.6 }} />
        </div>
        <p style={{ color:CHAMP, opacity:.7, fontSize:14 }}>Choose a game to celebrate! 🎉</p>
      </div>
      <div className="fu2" style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:13, maxWidth:900, margin:"0 auto", padding:"0 18px 12px" }}>
        {games.map(g => (
          <button key={g.v} onClick={() => go(g.v)}
            style={{ flex:"1 1 160px", maxWidth:200, background:"rgba(255,255,255,.07)", border:"1px solid rgba(244,196,48,.25)", borderRadius:18, padding:"22px 16px", color:"#fff", cursor:"pointer", fontFamily:INT, textAlign:"center", transition:"all .2s ease" }}
            onMouseEnter={e => { e.currentTarget.style.background="rgba(255,255,255,.14)"; e.currentTarget.style.borderColor=GOLD; e.currentTarget.style.transform="translateY(-4px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,.07)"; e.currentTarget.style.borderColor="rgba(244,196,48,.25)"; e.currentTarget.style.transform="none"; }}>
            <div style={{ fontSize:34, marginBottom:8 }}>{g.e}</div>
            <div style={{ fontFamily:PF, fontSize:16, fontWeight:700, marginBottom:4 }}>{g.t}</div>
            <div style={{ color:CHAMP, opacity:.75, fontSize:11 }}>{g.d}</div>
          </button>
        ))}
      </div>
    </div>
  );
}


// ── Puzzle Admin ──────────────────────────────────────────────────────────────
function PuzzleAdmin({back}){
  const [unlocked,setUnlocked]=useState(false);
  const [pw,setPw]=useState('');
  const [pwErr,setPwErr]=useState(false);
  const [photos,setPhotos]=useState([]);
  const [pending,setPending]=useState(null);
  const [photoName,setPhotoName]=useState('');
  const [saved,setSaved]=useState(false);

  useEffect(()=>{
    window.storage.get('j70_puzzle_photos',true).then(r=>{if(r)setPhotos(JSON.parse(r.value));}).catch(()=>{});
  },[]);

  const tryPw=()=>{
    if(pw.toLowerCase()==='trent'){setUnlocked(true);setPwErr(false);}
    else{setPwErr(true);setPw('');}
  };

  const onFile=e=>{
    const f=e.target.files[0]; if(!f)return;
    const reader=new FileReader();
    reader.onload=ev=>{
      const img=new Image();
      img.onload=()=>{
        const maxS=700,scale=Math.min(maxS/img.width,maxS/img.height,1);
        const oc=document.createElement('canvas');
        oc.width=Math.round(img.width*scale); oc.height=Math.round(img.height*scale);
        oc.getContext('2d').drawImage(img,0,0,oc.width,oc.height);
        setPending({src:oc.toDataURL('image/jpeg',.78)});
        setPhotoName('');setSaved(false);
      };
      img.src=ev.target.result;
    };
    reader.readAsDataURL(f);
  };

  const savePhoto=async()=>{
    if(!pending||!photoName.trim())return;
    const np=[...photos,{id:Date.now(),name:photoName.trim(),src:pending.src}];
    setPhotos(np);
    await window.storage.set('j70_puzzle_photos',JSON.stringify(np),true);
    setPending(null);setPhotoName('');setSaved(true);
    setTimeout(()=>setSaved(false),3000);
  };

  const delPhoto=async(id)=>{
    const np=photos.filter(p=>p.id!==id);
    setPhotos(np);
    await window.storage.set('j70_puzzle_photos',JSON.stringify(np),true);
  };

  if(!unlocked) return(
    <div style={{minHeight:600,display:'flex',flexDirection:'column',background:`linear-gradient(160deg,${PLUMDK},${PLUM})`}}>
      <TopBar onBack={back} title="🧩 Puzzle Admin"/>
      <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',padding:20}}>
        <div style={{background:'rgba(255,255,255,.08)',borderRadius:24,padding:36,maxWidth:300,width:'100%',textAlign:'center',border:`1px solid ${GOLD}33`}}>
          <div style={{fontSize:48,marginBottom:12}}>🔒</div>
          <div style={{color:GOLD,fontFamily:PF,fontSize:20,fontWeight:700,marginBottom:20}}>Admin Password</div>
          <input type="password" value={pw} autoFocus
            onChange={e=>{setPw(e.target.value);setPwErr(false);}}
            onKeyDown={e=>e.key==='Enter'&&tryPw()}
            placeholder="Password..."
            style={{width:'100%',padding:'12px',borderRadius:10,border:`2px solid ${pwErr?'#EF5350':GOLD+'55'}`,
              background:'rgba(255,255,255,.1)',color:'#fff',fontFamily:INT,fontSize:18,
              marginBottom:8,outline:'none',boxSizing:'border-box',textAlign:'center',letterSpacing:6}}/>
          {pwErr&&<div style={{color:'#EF5350',fontSize:12,fontFamily:INT,marginBottom:8}}>Wrong password!</div>}
          <button onClick={tryPw} style={{background:GOLD,color:PLUM,border:'none',borderRadius:10,padding:'12px 0',fontFamily:PF,fontWeight:700,fontSize:15,cursor:'pointer',width:'100%'}}>Unlock →</button>
        </div>
      </div>
    </div>
  );

  return(
    <div style={{minHeight:600,display:'flex',flexDirection:'column',background:`linear-gradient(160deg,${PLUMDK},${PLUM})`}}>
      <TopBar onBack={back} title="🧩 Puzzle Admin"/>
      <div style={{flex:1,overflowY:'auto',padding:16}}>
        <div style={{background:'rgba(255,255,255,.07)',borderRadius:18,padding:20,marginBottom:16,border:`1px solid ${GOLD}33`}}>
          <div style={{color:GOLD,fontFamily:PF,fontSize:17,fontWeight:700,marginBottom:12}}>➕ Add Puzzle Photo</div>
          <label style={{display:'block',background:'rgba(255,255,255,.1)',borderRadius:10,padding:14,textAlign:'center',cursor:'pointer',border:`2px dashed ${GOLD}55`,marginBottom:12}}>
            <input type="file" accept="image/*" onChange={onFile} style={{display:'none'}}/>
            <div style={{color:CHAMP,fontFamily:INT,fontSize:13,opacity:.8}}>
              {pending?'✅ Photo ready — tap to change':'📸 Tap to upload a photo'}
            </div>
          </label>
          {pending&&(
            <>
              <img src={pending.src} alt="preview"
                style={{display:'block',maxWidth:160,maxHeight:120,margin:'0 auto 12px',borderRadius:10,objectFit:'cover',border:`2px solid ${GOLD}44`}}/>
              <input value={photoName} onChange={e=>setPhotoName(e.target.value)}
                placeholder="Name this puzzle (e.g. Family at the Beach)..."
                style={{width:'100%',padding:'10px 12px',borderRadius:10,border:`1.5px solid ${GOLD}55`,
                  background:'rgba(255,255,255,.1)',color:'#fff',fontFamily:INT,fontSize:14,
                  outline:'none',boxSizing:'border-box',marginBottom:8}}/>
              <button onClick={savePhoto} disabled={!photoName.trim()}
                style={{background:photoName.trim()?'#4CAF50':'rgba(255,255,255,.1)',color:'#fff',border:'none',borderRadius:10,
                  padding:'11px 0',fontFamily:PF,fontWeight:700,fontSize:14,cursor:photoName.trim()?'pointer':'default',width:'100%'}}>
                💾 Save Photo
              </button>
              {saved&&<div style={{color:'#4CAF50',fontFamily:INT,fontSize:12,textAlign:'center',marginTop:8}}>✅ Saved!</div>}
            </>
          )}
        </div>

        <div style={{color:GOLD,fontFamily:PF,fontSize:17,fontWeight:700,marginBottom:10}}>📋 Saved Photos ({photos.length})</div>
        {photos.length===0&&<div style={{color:CHAMP,fontFamily:INT,fontSize:13,opacity:.55,textAlign:'center',padding:20}}>No photos yet. Upload one above!</div>}
        {photos.map(p=>(
          <div key={p.id} style={{background:'rgba(255,255,255,.07)',borderRadius:12,padding:'12px 14px',marginBottom:8,
            display:'flex',alignItems:'center',gap:12,border:`1px solid rgba(255,255,255,.1)`}}>
            <img src={p.src} alt={p.name} style={{width:56,height:56,objectFit:'cover',borderRadius:8,flexShrink:0}}/>
            <div style={{flex:1}}>
              <div style={{color:'#fff',fontFamily:INT,fontSize:13,fontWeight:600}}>{p.name}</div>
              <div style={{color:CHAMP,fontSize:11,fontFamily:INT,opacity:.5,marginTop:2}}>3×3 · 4×4 · 5×5 available</div>
            </div>
            <button onClick={()=>delPhoto(p.id)}
              style={{background:'rgba(239,83,80,.15)',border:`1px solid rgba(239,83,80,.3)`,borderRadius:8,
                color:'#EF9A9A',fontFamily:INT,fontSize:12,cursor:'pointer',padding:'6px 12px',flexShrink:0}}>
              🗑
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Puzzle Game ───────────────────────────────────────────────────────────────
function Puzzle({back,goAdmin}){
  const [photos,setPhotos]=useState(null);
  const [photo,setPhoto]=useState(null);
  const [diff,setDiff]=useState(null);
  const [tiles,setTiles]=useState(null);
  const [sel,setSel]=useState(null);
  const [moves,setMoves]=useState(0);
  const [solved,setSolved]=useState(false);
  const cvs=useRef(null);
  const imgEl=useRef(null);

  useEffect(()=>{
    window.storage.get('j70_puzzle_photos',true).then(r=>{setPhotos(r?JSON.parse(r.value):[]);}).catch(()=>setPhotos([]));
  },[]);

  const N=diff==='easy'?3:diff==='medium'?4:5;
  const CSIZE=300; // canvas px

  const shuffle=arr=>{
    const a=[...arr];
    for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}
    return a;
  };

  const startGame=(p,d)=>{
    setPhoto(p);setDiff(d);
    const n=d==='easy'?3:d==='medium'?4:5;
    let arr;
    do{ arr=shuffle([...Array(n*n).keys()]); }
    while(arr.every((v,i)=>v===i)); // ensure not already solved
    setTiles(arr);setSel(null);setMoves(0);setSolved(false);
  };

  // Draw tiles
  useEffect(()=>{
    if(!tiles||!cvs.current||!imgEl.current||!imgEl.current.complete)return;
    const n=diff==='easy'?3:diff==='medium'?4:5;
    const ts=CSIZE/n;
    const ctx=cvs.current.getContext('2d');
    const img=imgEl.current;
    ctx.clearRect(0,0,CSIZE,CSIZE);

    tiles.forEach((tileId,pos)=>{
      const pr=Math.floor(pos/n),pc=pos%n;
      const tr=Math.floor(tileId/n),tc=tileId%n;
      const dx=pc*ts,dy=pr*ts;
      const iw=img.naturalWidth||img.width,ih=img.naturalHeight||img.height;
      ctx.drawImage(img,tc*(iw/n),tr*(ih/n),iw/n,ih/n,dx,dy,ts,ts);

      // Grid lines
      ctx.strokeStyle='rgba(255,255,255,.55)';ctx.lineWidth=2;
      ctx.strokeRect(dx+1,dy+1,ts-2,ts-2);

      // Selected highlight
      if(sel===pos){
        ctx.fillStyle='rgba(244,196,48,.35)';ctx.fillRect(dx,dy,ts,ts);
        ctx.strokeStyle=GOLD;ctx.lineWidth=3;ctx.strokeRect(dx+1,dy+1,ts-2,ts-2);
      }
    });

    // Solved flash
    if(solved){
      ctx.fillStyle='rgba(76,175,80,.25)';ctx.fillRect(0,0,CSIZE,CSIZE);
    }
  },[tiles,sel,solved,diff,photo]);

  const onCanvasClick=e=>{
    if(solved||!tiles||!cvs.current)return;
    const rect=cvs.current.getBoundingClientRect();
    const n=diff==='easy'?3:diff==='medium'?4:5;
    const ts=CSIZE/n;
    const scale=CSIZE/rect.width;
    const x=(e.clientX-rect.left)*scale,y=(e.clientY-rect.top)*scale;
    const pos=Math.floor(y/ts)*n+Math.floor(x/ts);
    if(pos<0||pos>=n*n)return;

    if(sel===null){setSel(pos);}
    else if(sel===pos){setSel(null);}
    else{
      const nt=[...tiles];
      [nt[sel],nt[pos]]=[nt[pos],nt[sel]];
      setTiles(nt);setSel(null);setMoves(m=>m+1);
      if(nt.every((v,i)=>v===i))setSolved(true);
    }
  };

  const onTouchStart=e=>{
    e.preventDefault();
    const touch=e.touches[0];
    onCanvasClick({clientX:touch.clientX,clientY:touch.clientY});
  };

  if(photos===null) return(
    <Screen onBack={back} title="🧩 Puzzle">
      <div className="pu" style={{color:GOLD,fontFamily:PF,fontSize:18}}>Loading...</div>
    </Screen>
  );

  // No photos
  if(photos.length===0&&!photo) return(
    <Screen onBack={back} title="🧩 Puzzle">
      <div style={{textAlign:'center',padding:20}}>
        <div style={{fontSize:56,marginBottom:16}}>🧩</div>
        <div style={{color:GOLD,fontFamily:PF,fontSize:20,fontWeight:700,marginBottom:8}}>No puzzle photos yet!</div>
        <div style={{color:CHAMP,fontFamily:INT,fontSize:14,opacity:.65,marginBottom:28}}>Ask the game master to add photos in the Admin portal.</div>
        <button onClick={goAdmin} style={{background:'rgba(255,255,255,.1)',border:`1px solid ${GOLD}55`,borderRadius:12,padding:'12px 24px',color:GOLD,fontFamily:INT,fontSize:14,cursor:'pointer'}}>⚙️ Go to Admin Portal</button>
      </div>
    </Screen>
  );

  // Photo selection
  if(!photo) return(
    <Screen onBack={back} title="🧩 Puzzle"
      right={<button onClick={goAdmin} style={{background:'none',border:'none',cursor:'pointer',color:CHAMP,fontSize:11,fontFamily:INT,opacity:.6}}>⚙️ Admin</button>}>
      <div style={{width:'100%',maxWidth:420}}>
        <div style={{color:CHAMP,fontFamily:INT,fontSize:13,opacity:.6,textAlign:'center',marginBottom:14}}>Choose a photo to puzzle</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
          {photos.map(p=>(
            <button key={p.id} onClick={()=>{setPhoto(p);setDiff(null);}}
              style={{background:'rgba(255,255,255,.07)',border:`1px solid rgba(255,255,255,.15)`,
                borderRadius:14,overflow:'hidden',cursor:'pointer',padding:0,transition:'all .15s'}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=GOLD+'88';}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,.15)';}}>
              <img src={p.src} alt={p.name} style={{width:'100%',height:110,objectFit:'cover',display:'block'}}/>
              <div style={{padding:'8px 10px',textAlign:'left'}}>
                <div style={{color:'#fff',fontFamily:INT,fontSize:12,fontWeight:600}}>{p.name}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </Screen>
  );

  // Difficulty selection
  if(photo&&!diff) return(
    <Screen onBack={()=>setPhoto(null)} title="🧩 Puzzle">
      <div style={{width:'100%',maxWidth:340}}>
        <img src={photo.src} alt={photo.name} style={{width:'100%',maxHeight:160,objectFit:'cover',borderRadius:14,marginBottom:16,border:`2px solid ${GOLD}44`}}/>
        <div style={{color:GOLD,fontFamily:PF,fontSize:20,fontWeight:900,textAlign:'center',marginBottom:4}}>{photo.name}</div>
        <div style={{color:CHAMP,fontFamily:INT,fontSize:13,opacity:.6,textAlign:'center',marginBottom:18}}>Choose difficulty</div>
        {[
          {d:'easy',  emoji:'🌸',label:'Easy',   pieces:'9 pieces (3×3)',   clr:'#66BB6A'},
          {d:'medium',emoji:'⭐',label:'Medium', pieces:'16 pieces (4×4)', clr:GOLD},
          {d:'hard',  emoji:'🔥',label:'Hard',   pieces:'25 pieces (5×5)', clr:'#EF5350'},
        ].map(({d,emoji,label,pieces,clr})=>(
          <button key={d} onClick={()=>startGame(photo,d)}
            style={{width:'100%',background:'rgba(255,255,255,.07)',border:`2px solid ${clr}44`,
              borderRadius:16,padding:'16px 22px',marginBottom:10,cursor:'pointer',textAlign:'left',transition:'all .15s'}}
            onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,255,255,.13)';e.currentTarget.style.borderColor=clr;}}
            onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,.07)';e.currentTarget.style.borderColor=clr+'44';}}>
            <div style={{display:'flex',alignItems:'center',gap:14}}>
              <div style={{fontSize:28}}>{emoji}</div>
              <div>
                <div style={{color:clr,fontFamily:PF,fontSize:18,fontWeight:700}}>{label}</div>
                <div style={{color:CHAMP,fontSize:12,fontFamily:INT,opacity:.65,marginTop:2}}>{pieces}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </Screen>
  );

  // Game
  return(
    <div style={{minHeight:600,display:'flex',flexDirection:'column',background:`linear-gradient(160deg,${PLUMDK},${PLUM})`}}>
      <TopBar onBack={()=>setDiff(null)} title="🧩 Puzzle"
        right={<span style={{color:CHAMP,fontSize:11,fontFamily:INT,opacity:.6,textTransform:'capitalize'}}>{diff} · {moves} moves</span>}/>

      {/* Hidden image loader */}
      <img ref={imgEl} src={photo.src} alt="" style={{display:'none'}}
        onLoad={()=>{if(tiles)setTiles(t=>[...t]);}}/>

      <div style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'8px 16px 12px',gap:12}}>
        <canvas ref={cvs} width={CSIZE} height={CSIZE}
          onClick={onCanvasClick}
          onTouchStart={onTouchStart}
          style={{borderRadius:14,boxShadow:'0 8px 32px rgba(0,0,0,.55)',cursor:'pointer',
            maxWidth:'100%',display:'block',touchAction:'none'}}/>

        <div style={{color:CHAMP,fontSize:12,fontFamily:INT,opacity:.6,textAlign:'center'}}>
          Tap a piece to select it, then tap where to move it
        </div>

        <div style={{display:'flex',gap:10}}>
          <button onClick={()=>startGame(photo,diff)}
            style={{padding:'10px 22px',borderRadius:10,background:'rgba(255,255,255,.1)',
              border:`1px solid rgba(255,255,255,.2)`,color:CHAMP,fontFamily:INT,fontSize:13,cursor:'pointer'}}>
            🔀 Shuffle
          </button>
          <button onClick={()=>setDiff(null)}
            style={{padding:'10px 22px',borderRadius:10,background:'rgba(255,255,255,.08)',
              border:`1px solid rgba(255,255,255,.15)`,color:CHAMP,fontFamily:INT,fontSize:13,cursor:'pointer',opacity:.7}}>
            ← Difficulty
          </button>
        </div>
      </div>

      {solved&&(
        <div style={{position:'absolute',inset:0,background:'rgba(0,0,0,.75)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:100}}>
          <div style={{background:`linear-gradient(135deg,${PLUMDK},${PLUM})`,border:`2px solid ${GOLD}`,
            borderRadius:26,padding:'38px 32px',textAlign:'center',maxWidth:300}}>
            <div style={{fontSize:52,marginBottom:10}}>🎉</div>
            <div style={{color:GOLD,fontFamily:PF,fontSize:26,fontWeight:900,marginBottom:6}}>Puzzle Solved!</div>
            <div style={{color:CHAMP,fontSize:14,fontFamily:INT,marginBottom:4,opacity:.8}}>{moves} moves</div>
            <div style={{color:CHAMP,fontSize:13,fontFamily:INT,marginBottom:24,opacity:.55,textTransform:'capitalize'}}>{diff} difficulty</div>
            <button onClick={()=>startGame(photo,diff)} style={{background:GOLD,color:PLUM,border:'none',borderRadius:12,
              padding:'12px 0',fontFamily:PF,fontWeight:700,fontSize:16,cursor:'pointer',width:'100%',marginBottom:8}}>Play Again</button>
            <button onClick={()=>setDiff(null)} style={{background:'transparent',color:CHAMP,border:`1px solid rgba(255,255,255,.2)`,
              borderRadius:12,padding:'10px 0',fontFamily:INT,fontSize:13,cursor:'pointer',width:'100%'}}>Try Another Difficulty</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState("home");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Inter:wght@400;500;600;700&display=swap');
      *{box-sizing:border-box;margin:0;padding:0}
      textarea,input,select{font-family:'Inter',sans-serif}
      @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
      @keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
      @keyframes pop{0%{transform:scale(.8);opacity:0}70%{transform:scale(1.05)}100%{transform:scale(1);opacity:1}}
      .fu{animation:fadeUp .5s ease forwards}
      .fu2{animation:fadeUp .6s ease .2s both}
      .pu{animation:pulse 1.5s ease infinite}
      .pop{animation:pop .3s ease forwards}
      .scroll{overflow-y:auto;max-height:320px}
    `;
    document.head.appendChild(style);
    setReady(true);
  }, []);

  if (!ready) return (
    <div style={{ minHeight:600, display:"flex", alignItems:"center", justifyContent:"center", background:`linear-gradient(160deg,${PLUMDK},${PLUM})` }}>
      <div className="pu" style={{ color:GOLD, fontFamily:PF, fontSize:22 }}>🎂 Loading…</div>
    </div>
  );

  if (view==="home") return <Home go={setView} />;
  if (view==="puzzle") return <Puzzle back={()=>setView("home")} goAdmin={()=>setView("puzzle-admin")} />;
  if (view==="puzzle-admin") return <PuzzleAdmin back={()=>setView("puzzle")} />;
  if (view==="bird") return <JoannaBird back={()=>setView("home")} />;
  if (view==="pacmom") return <PacMom back={()=>setView("home")} />;
  if (view==="crush") return <JoannaCrush back={()=>setView("home")} />;
  if (view==="sudoku") return <SudokuGame back={()=>setView("home")} />;
  if (view==="decoder") return <DecoderGame back={()=>setView("home")} />;
  return null;
}

function JoannaBird({ back }) {
  const canvasRef = useRef(null);
  const stateRef = useRef("waiting");
  const birdRef = useRef({ x: 90, y: 250, vy: 0 });
  const pipesRef = useRef([]);
  const frameRef = useRef(0);
  const scoreRef = useRef(0);
  const bestRef = useRef(0);
  const animRef = useRef(null);
  const lastPipeRef = useRef(0);
  const [uiScore, setUiScore] = useState(0);
  const [uiBest, setUiBest] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;
    const GH = 45;    // ground height
    const GRAVITY = 0.42;
    const FLAP = -8.5;
    const PW = 78;    // pipe width
    const TYPES = ["tv", "record", "jukebox", "car"];

    // Difficulty scaling: level up every 20pts, fully hard at 120
    const getDiff = (score) => {
      const lvl = Math.min(6, Math.floor(score / 20));
      const t = lvl / 6;
      return {
        gap:      Math.round(190 - t * 48),   // 190 (easy) → 142 (hard)
        speed:    2.0 + t * 1.8,              // 2.0 → 3.8
        interval: Math.round(170 - t * 48),   // 170 → 122 frames
        level:    lvl + 1,
      };
    };

    const reset = () => {
      stateRef.current = "waiting";
      birdRef.current = { x: 90, y: H / 2, vy: 0 };
      pipesRef.current = [];
      frameRef.current = 0;
      scoreRef.current = 0;
      lastPipeRef.current = 0;
      setUiScore(0);
    };

    // ── Draw helpers ────────────────────────────────────────────
    const fillRR = (x, y, w, h, r) => {
      ctx.beginPath();
      ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y);
      ctx.arcTo(x + w, y, x + w, y + r, r);
      ctx.lineTo(x + w, y + h - r);
      ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
      ctx.lineTo(x + r, y + h);
      ctx.arcTo(x, y + h, x, y + h - r, r);
      ctx.lineTo(x, y + r);
      ctx.arcTo(x, y, x + r, y, r);
      ctx.closePath(); ctx.fill();
    };

    // ── Joanna face sprite ──────────────────────────────────────
    const drawJoanna = (x, y, vy) => {
      const angle = Math.max(-28, Math.min(75, vy * 3.8)) * Math.PI / 180;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.scale(0.62, 0.62); // smaller head = easier game

      // Back hair mass (auburn)
      ctx.fillStyle = "#8B3A2A";
      ctx.beginPath();
      ctx.ellipse(0, -4, 25, 22, 0, Math.PI, 2 * Math.PI);
      ctx.fill();
      // Side hair
      ctx.beginPath(); ctx.ellipse(-22, 6, 9, 16, 0.25, 0, 2 * Math.PI); ctx.fill();
      ctx.beginPath(); ctx.ellipse(22, 6, 9, 16, -0.25, 0, 2 * Math.PI); ctx.fill();

      // Face skin
      ctx.fillStyle = "#F5C5A0";
      ctx.beginPath(); ctx.arc(0, 4, 21, 0, 2 * Math.PI); ctx.fill();

      // Bangs (swept slightly to one side like photo)
      ctx.fillStyle = "#8B3A2A";
      ctx.beginPath(); ctx.ellipse(-3, -16, 23, 11, 0.1, Math.PI, 2 * Math.PI); ctx.fill();
      // Hair highlight / layering
      ctx.fillStyle = "#A0432E";
      ctx.beginPath(); ctx.ellipse(8, -18, 12, 8, -0.2, Math.PI, 2 * Math.PI); ctx.fill();

      // Rosy cheeks
      ctx.fillStyle = "rgba(220,110,90,0.28)";
      ctx.beginPath(); ctx.ellipse(-13, 9, 8, 6, 0, 0, 2 * Math.PI); ctx.fill();
      ctx.beginPath(); ctx.ellipse(13, 9, 8, 6, 0, 0, 2 * Math.PI); ctx.fill();

      // Eye whites
      ctx.fillStyle = "#fff";
      ctx.beginPath(); ctx.ellipse(-9, 1, 6.5, 5, 0, 0, 2 * Math.PI); ctx.fill();
      ctx.beginPath(); ctx.ellipse(9, 1, 6.5, 5, 0, 0, 2 * Math.PI); ctx.fill();
      // Iris (blue-grey like photo)
      ctx.fillStyle = "#5C2E0A";
      ctx.beginPath(); ctx.arc(-9, 2, 3.8, 0, 2 * Math.PI); ctx.fill();
      ctx.beginPath(); ctx.arc(9, 2, 3.8, 0, 2 * Math.PI); ctx.fill();
      // Pupils
      ctx.fillStyle = "#1C1C1C";
      ctx.beginPath(); ctx.arc(-8.6, 2.2, 2, 0, 2 * Math.PI); ctx.fill();
      ctx.beginPath(); ctx.arc(9.4, 2.2, 2, 0, 2 * Math.PI); ctx.fill();
      // Sparkle
      ctx.fillStyle = "#fff";
      ctx.beginPath(); ctx.arc(-8, 0.8, 1, 0, 2 * Math.PI); ctx.fill();
      ctx.beginPath(); ctx.arc(10, 0.8, 1, 0, 2 * Math.PI); ctx.fill();
      // Lashes
      ctx.strokeStyle = "#1C1C1C"; ctx.lineWidth = 1;
      [[-14,-3,-16,-7],[-12,-6,-13,-9],[-10,-6.5,-10,-10],[-8,-6,-7,-9]].forEach(([ax,ay,bx,by]) => {
        ctx.beginPath(); ctx.moveTo(ax,ay); ctx.lineTo(bx,by); ctx.stroke();
      });
      [[8,-3],[10,-6],[12,-6],[14,-3]].forEach(([ax,ay]) => {
        ctx.beginPath(); ctx.moveTo(ax,ay); ctx.lineTo(ax+2,ay-3); ctx.stroke();
      });

      // Nose
      ctx.fillStyle = "#E59A78";
      ctx.beginPath(); ctx.arc(0, 9, 3.2, 0, 2 * Math.PI); ctx.fill();

      // Big warm smile
      ctx.strokeStyle = "#8B2020"; ctx.lineWidth = 2.5; ctx.lineCap = "round";
      ctx.beginPath(); ctx.arc(0, 11, 10, 0.1 * Math.PI, 0.9 * Math.PI); ctx.stroke();
      ctx.fillStyle = "#fff";
      ctx.beginPath(); ctx.arc(0, 11, 8, 0.12 * Math.PI, 0.88 * Math.PI); ctx.fill();

      // Little pink wings (flap up when going up)
      const wingAngle = vy < 0 ? -0.4 : 0.1;
      ctx.fillStyle = "rgba(255,182,193,0.88)";
      ctx.save(); ctx.translate(-22, 6); ctx.rotate(wingAngle);
      ctx.beginPath(); ctx.ellipse(-8, 0, 13, 7, 0.3, 0, 2 * Math.PI); ctx.fill(); ctx.restore();
      ctx.save(); ctx.translate(22, 6); ctx.rotate(-wingAngle);
      ctx.beginPath(); ctx.ellipse(8, 0, 13, 7, -0.3, 0, 2 * Math.PI); ctx.fill(); ctx.restore();

      ctx.restore();
    };

    // ── 1950s Background ────────────────────────────────────────
    const drawBg = () => {
      // Sky
      const sky = ctx.createLinearGradient(0, 0, 0, H - GH);
      sky.addColorStop(0, "#87CEEB"); sky.addColorStop(1, "#DAF0FB");
      ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H - GH);

      // Retro clouds
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      [[70,55],[210,38],[370,62]].forEach(([cx,cy]) => {
        ctx.beginPath();
        ctx.arc(cx, cy, 18, 0, 2*Math.PI);
        ctx.arc(cx+22, cy-5, 23, 0, 2*Math.PI);
        ctx.arc(cx+45, cy, 18, 0, 2*Math.PI);
        ctx.fill();
      });

      // Checkerboard ground (1950s diner floor)
      const colors = ["#F0C040","#E8B030"];
      for (let i = 0; i < Math.ceil(W/22); i++) {
        ctx.fillStyle = colors[i % 2];
        ctx.fillRect(i * 22, H - GH, 22, GH);
      }
      // Ground line
      ctx.fillStyle = "#B8860B"; ctx.fillRect(0, H - GH, W, 3);
    };

    // ── Obstacle drawing ────────────────────────────────────────
    // 1950s TV sets
    const drawTVPipe = (x, topH, botH) => {
      const drawTV = (tx, ty, tw, th) => {
        ctx.fillStyle = "#2C3E50"; fillRR(tx, ty, tw, th, 4);
        ctx.fillStyle = "#5DADE2"; ctx.fillRect(tx+10, ty+7, tw-20, th-16);
        ctx.strokeStyle = "rgba(0,80,140,0.3)"; ctx.lineWidth = 1;
        for (let ly = ty+9; ly < ty+th-8; ly += 3) {
          ctx.beginPath(); ctx.moveTo(tx+10,ly); ctx.lineTo(tx+tw-10,ly); ctx.stroke();
        }
        ctx.fillStyle = "#839192";
        [tx+6, tx+tw-6].forEach(kx => { ctx.beginPath(); ctx.arc(kx,ty+th/2,2.5,0,2*Math.PI); ctx.fill(); });
      };
      const tH = 52;
      // Top pipe (TVs hanging down from ceiling)
      const nTop = Math.ceil(topH/tH)+1;
      for (let i=0; i<nTop; i++) {
        const ty = topH - (nTop-i)*tH;
        if (ty+tH < 0 || ty > topH) continue;
        drawTV(x+2, ty, PW-4, tH-3);
      }
      // Antenna on lowest visible TV in top pipe
      ctx.strokeStyle = "#2C3E50"; ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(x+PW/2-9, topH-tH+2); ctx.lineTo(x+PW/2-20, topH-tH-16); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x+PW/2+9, topH-tH+2); ctx.lineTo(x+PW/2+20, topH-tH-16); ctx.stroke();
      // Bottom pipe (TVs stacking up)
      const by = H-GH-botH;
      const nBot = Math.ceil(botH/tH)+1;
      for (let i=0; i<nBot; i++) {
        const ty = by + i*tH;
        if (ty >= H-GH) break;
        drawTV(x+2, ty, PW-4, Math.min(tH-3, H-GH-ty));
      }
      // Legs on bottom
      ctx.fillStyle = "#1A252F";
      ctx.fillRect(x+14, H-GH-4, 7, 7);
      ctx.fillRect(x+PW-21, H-GH-4, 7, 7);
    };

    // Vinyl records
    const drawRecordPipe = (x, topH, botH) => {
      const rH = 64;
      const drawRec = (cx, cy, label) => {
        ctx.fillStyle = "#0D0D1A";
        ctx.beginPath(); ctx.ellipse(cx,cy,PW/2-2,rH/2-2,0,0,2*Math.PI); ctx.fill();
        for (let r=10; r<PW/2-2; r+=5) {
          ctx.strokeStyle = `rgba(30,30,60,0.5)`; ctx.lineWidth = 0.7;
          ctx.beginPath(); ctx.ellipse(cx,cy,r,r*(rH/2-2)/(PW/2-2),0,0,2*Math.PI); ctx.stroke();
        }
        ctx.fillStyle = label==="A" ? "#E74C3C" : "#3498DB";
        ctx.beginPath(); ctx.ellipse(cx,cy,PW/8,rH/8,0,0,2*Math.PI); ctx.fill();
        ctx.fillStyle="#fff"; ctx.font="bold 6px Arial"; ctx.textAlign="center";
        ctx.fillText(label, cx, cy+2.5);
        ctx.fillStyle="#0D0D1A"; ctx.beginPath(); ctx.arc(cx,cy,3,0,2*Math.PI); ctx.fill();
      };
      const nTop = Math.ceil(topH/rH)+1;
      for (let i=0; i<nTop; i++) {
        const cy = topH-(nTop-i)*rH+rH/2;
        if (cy+rH/2<0||cy-rH/2>topH) continue;
        drawRec(x+PW/2, cy, "A");
      }
      const by=H-GH-botH, nBot=Math.ceil(botH/rH)+1;
      for (let i=0; i<nBot; i++) {
        const cy=by+i*rH+rH/2;
        if (cy-rH/2>=H-GH) break;
        drawRec(x+PW/2, cy, "B");
      }
    };

    // Jukebox
    const drawJukeboxPipe = (x, topH, botH) => {
      const jH = 68;
      const drawJ = (tx, ty, th) => {
        ctx.fillStyle = "#7B0D1E"; fillRR(tx, ty, PW-4, th, 5);
        ctx.strokeStyle = "#C0C0C0"; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.roundRect ? ctx.roundRect(tx+3,ty+3,PW-10,th-6,3) : ctx.rect(tx+3,ty+3,PW-10,th-6);
        ctx.stroke();
        const lights = ["#FF4444","#FFD700","#44FF44","#4488FF","#FF44FF"];
        lights.forEach((c,li) => {
          ctx.fillStyle = c;
          ctx.beginPath(); ctx.arc(tx+9+li*11, ty+12, 4, 0, 2*Math.PI); ctx.fill();
          ctx.fillStyle = "rgba(255,255,255,0.4)";
          ctx.beginPath(); ctx.arc(tx+8+li*11, ty+11, 1.5, 0, 2*Math.PI); ctx.fill();
        });
        ctx.strokeStyle = "#B8860B"; ctx.lineWidth = 1;
        for (let gy=ty+24; gy<ty+th-8; gy+=5) {
          ctx.beginPath(); ctx.moveTo(tx+6,gy); ctx.lineTo(tx+PW-10,gy); ctx.stroke();
        }
      };
      const nTop=Math.ceil(topH/jH)+1;
      for (let i=0; i<nTop; i++) {
        const ty=topH-(nTop-i)*jH;
        if (ty+jH<0||ty>topH) continue;
        drawJ(x+2, ty, Math.min(jH-3, topH-ty));
      }
      const by=H-GH-botH, nBot=Math.ceil(botH/jH)+1;
      for (let i=0; i<nBot; i++) {
        const ty=by+i*jH;
        if (ty>=H-GH) break;
        drawJ(x+2, ty, Math.min(jH-3, H-GH-ty));
      }
    };

    // 1950s car with tail fins
    const drawCarPipe = (x, topH, botH) => {
      const cH = 58;
      const drawCar = (tx, ty, th, topPipe) => {
        ctx.fillStyle = "#B22222"; fillRR(tx, ty, PW-4, th, 4);
        ctx.fillStyle = "#A0A0A0";
        ctx.fillRect(tx, topPipe ? ty+th-5 : ty, PW-4, 5); // bumper
        ctx.fillStyle = "rgba(135,206,235,0.55)";
        ctx.fillRect(tx+10, ty+8, PW-24, Math.max(0,th-24));
        // Tail fins (on bottom of top-pipe cars, top of bottom-pipe cars)
        ctx.fillStyle = "#8B0000";
        if (topPipe && th > 20) {
          [[tx+2,ty+th],[tx+12,ty+th+14],[tx+22,ty+th]].reduce((a,b,i,arr)=>{if(i>0){ctx.beginPath();ctx.moveTo(arr[0][0],arr[0][1]);ctx.lineTo(b[0],b[1]);} return b;});
          ctx.beginPath();
          ctx.moveTo(tx+2,ty+th); ctx.lineTo(tx+12,ty+th+14); ctx.lineTo(tx+22,ty+th);
          ctx.fill();
          ctx.beginPath();
          ctx.moveTo(tx+PW-22,ty+th); ctx.lineTo(tx+PW-12,ty+th+14); ctx.lineTo(tx+PW-2,ty+th);
          ctx.fill();
        }
        ctx.fillStyle = "#FFD700"; // headlights
        ctx.beginPath(); ctx.arc(tx+8, topPipe ? ty+th-8 : ty+8, 4, 0, 2*Math.PI); ctx.fill();
        ctx.beginPath(); ctx.arc(tx+PW-12, topPipe ? ty+th-8 : ty+8, 4, 0, 2*Math.PI); ctx.fill();
      };
      const nTop=Math.ceil(topH/cH)+1;
      for (let i=0; i<nTop; i++) {
        const ty=topH-(nTop-i)*cH;
        if (ty+cH<0||ty>topH) continue;
        drawCar(x+2, ty, Math.min(cH-3,topH-ty), true);
      }
      const by=H-GH-botH, nBot=Math.ceil(botH/cH)+1;
      for (let i=0; i<nBot; i++) {
        const ty=by+i*cH;
        if (ty>=H-GH) break;
        drawCar(x+2, ty, Math.min(cH-3,H-GH-ty), false);
      }
    };

    const drawPipe = p => {
      if (p.type==="tv") drawTVPipe(p.x, p.topH, p.botH);
      else if (p.type==="record") drawRecordPipe(p.x, p.topH, p.botH);
      else if (p.type==="jukebox") drawJukeboxPipe(p.x, p.topH, p.botH);
      else drawCarPipe(p.x, p.topH, p.botH);
    };

    // ── Game loop ───────────────────────────────────────────────
    const loop = () => {
      ctx.clearRect(0, 0, W, H);
      drawBg();
      const bird = birdRef.current;
      const state = stateRef.current;
      const pipes = pipesRef.current;

      if (state === "waiting") {
        frameRef.current++;
        const bob = Math.sin(frameRef.current * 0.06) * 9;
        drawJoanna(bird.x, H/2 + bob, 0);
        // Prompt box
        ctx.fillStyle = "rgba(45,15,78,0.82)";
        fillRR(W/2-110, H/2+52, 220, 48, 14);
        ctx.fillStyle = "#F4C430"; ctx.font = "bold 16px Inter,sans-serif"; ctx.textAlign = "center";
        ctx.fillText("Tap / click / space to flap!", W/2, H/2+81);

      } else if (state === "playing" || state === "dead") {
        if (state === "playing") {
          frameRef.current++;
          bird.vy += GRAVITY;
          bird.y += bird.vy;

          const diff = getDiff(scoreRef.current);
          if (frameRef.current - lastPipeRef.current >= diff.interval) {
            lastPipeRef.current = frameRef.current;
            const gap = diff.gap;
            const minH=70, maxH=H-GH-gap-70;
            const tH = Math.random()*(maxH-minH)+minH;
            pipes.push({ x:W, topH:tH, botH:H-GH-tH-gap, type:TYPES[Math.floor(Math.random()*4)], scored:false });
          }
          for (const p of pipes) {
            p.x -= diff.speed;
            if (!p.scored && p.x+PW < bird.x) {
              p.scored=true; scoreRef.current++;
              setUiScore(scoreRef.current);
            }
          }
          pipesRef.current = pipes.filter(p=>p.x>-PW-20);

          // Collision
          const BR=11; // matches scaled-down head size
          let hit = bird.y+BR>H-GH || bird.y-BR<0;
          for (const p of pipes) {
            if (bird.x+BR>p.x+5 && bird.x-BR<p.x+PW-5) {
              if (bird.y-BR<p.topH || bird.y+BR>H-GH-p.botH) hit=true;
            }
          }
          if (hit) {
            stateRef.current="dead";
            bestRef.current = Math.max(bestRef.current, scoreRef.current);
            setUiBest(bestRef.current);
          }
        }

        for (const p of pipes) drawPipe(p);
        const angle = state==="dead" ? 80 : 0;
        drawJoanna(bird.x, Math.min(bird.y, H-GH-18), state==="dead"?80:bird.vy);

        // Score + level HUD
        if (state==="playing") {
          const d = getDiff(scoreRef.current);
          ctx.fillStyle="rgba(0,0,0,0.25)"; ctx.font="bold 30px 'Playfair Display',serif"; ctx.textAlign="center";
          ctx.fillText(scoreRef.current, W/2+2, 46);
          ctx.fillStyle="#fff"; ctx.fillText(scoreRef.current, W/2, 44);
          // Level badge top-right
          const lvlLabel = d.level >= 7 ? "🔥 HARD" : `Lv.${d.level}`;
          ctx.fillStyle="rgba(45,15,78,0.7)";
          ctx.beginPath(); ctx.roundRect ? ctx.roundRect(W-68,8,60,22,8) : ctx.rect(W-68,8,60,22); ctx.fill();
          ctx.fillStyle=d.level>=7?"#FF6B6B":"#F4C430"; ctx.font="bold 12px Inter,sans-serif"; ctx.textAlign="center";
          ctx.fillText(lvlLabel, W-38, 24);
        }

        // Game over overlay
        if (state==="dead") {
          ctx.fillStyle="rgba(0,0,0,0.38)"; ctx.fillRect(0,0,W,H);
          ctx.fillStyle="rgba(255,249,240,0.97)"; fillRR(W/2-118,H/2-82,236,174,18);
          ctx.fillStyle=PLUM; ctx.font=`bold 20px 'Playfair Display',serif`; ctx.textAlign="center";
          ctx.fillText("Oh no, Joanna! 😵", W/2, H/2-45);
          ctx.fillStyle=GOLD; ctx.font=`bold 52px 'Playfair Display',serif`;
          ctx.fillText(scoreRef.current, W/2, H/2+18);
          const dOver = getDiff(scoreRef.current);
          ctx.fillStyle=dOver.level>=7?"#E74C3C":MUTED; ctx.font=`bold 12px Inter,sans-serif`;
          ctx.fillText(dOver.level>=7?"🔥 Reached HARD mode!!":`Reached Level ${dOver.level}`, W/2, H/2+42);
          ctx.fillStyle=MUTED; ctx.font=`12px Inter,sans-serif`;
          ctx.fillText(`Best: ${bestRef.current}`, W/2, H/2+60);
          ctx.fillStyle=PLUM; ctx.font=`14px Inter,sans-serif`;
          ctx.fillText("Tap to flap again!", W/2, H/2+82);
        }
      }

      animRef.current = requestAnimationFrame(loop);
    };

    const handleInput = () => {
      const s = stateRef.current;
      if (s==="waiting") { stateRef.current="playing"; birdRef.current.vy=FLAP; }
      else if (s==="playing") { birdRef.current.vy=FLAP; }
      else if (s==="dead") { reset(); }
    };

    canvas.addEventListener("click", handleInput);
    canvas.addEventListener("touchstart", e=>{e.preventDefault();handleInput();},{passive:false});
    const onKey = e=>{if(e.code==="Space"||e.code==="ArrowUp"){e.preventDefault();handleInput();}};
    window.addEventListener("keydown", onKey);
    animRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animRef.current);
      canvas.removeEventListener("click", handleInput);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div style={{ minHeight:600, display:"flex", flexDirection:"column", background:`linear-gradient(160deg,${PLUMDK} 0%,${PLUM} 100%)` }}>
      <TopBar onBack={back} title="🐦 Joanna Bird" />
      <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"14px 12px", gap:10 }}>
        <div style={{ display:"flex", gap:24, marginBottom:4 }}>
          <div style={{ color:CHAMP, fontSize:13, textAlign:"center" }}>
            <div style={{ color:GOLD, fontFamily:PF, fontSize:22, fontWeight:700 }}>{uiScore}</div>
            <div style={{ opacity:.6, fontSize:11 }}>score</div>
          </div>
          <div style={{ color:CHAMP, fontSize:13, textAlign:"center" }}>
            <div style={{ color:GOLD, fontFamily:PF, fontSize:22, fontWeight:700 }}>{uiBest}</div>
            <div style={{ opacity:.6, fontSize:11 }}>best</div>
          </div>
        </div>
        <canvas ref={canvasRef} width={420} height={520}
          style={{ borderRadius:18, boxShadow:"0 8px 40px rgba(0,0,0,0.45)", maxWidth:"100%", cursor:"pointer", display:"block" }} />
        <p style={{ color:CHAMP, fontSize:12, opacity:.6, textAlign:"center", marginTop:4 }}>
          Tap · click · spacebar to flap 🐦
        </p>
      </div>
    </div>
  );
}


// ── Decoder Puzzles ───────────────────────────────────────────────────────────
const MORSE_REF = [
  ["A","·−"],["B","−···"],["C","−·−·"],["D","−··"],["E","·"],["F","··−·"],
  ["G","−−·"],["H","····"],["I","··"],["J","·−−−"],["K","−·−"],["L","·−··"],
  ["M","−−"],["N","−·"],["O","−−−"],["P","·−−·"],["Q","−−·−"],["R","·−·"],
  ["S","···"],["T","−"],["U","··−"],["V","···−"],["W","·−−"],["X","−··−"],
  ["Y","−·−−"],["Z","−−··"],
];
const T9_REF = [
  ["2","A B C"],["3","D E F"],["4","G H I"],
  ["5","J K L"],["6","M N O"],["7","P Q R S"],
  ["8","T U V"],["9","W X Y Z"],
];

// ── Puzzle 1 Data (Don't Be Cruel / Elvis) ────────────────────────────────────
const P1_PUZZLES = [
  {
    id:1, icon:"🔐", type:"Caesar Cipher", color:"#92400E",
    encoded:"MXWC   KN",
    answer:"DONTBE", reveals:"Don't be",
    instructions:`A Caesar cipher shifts every letter the same number of places through the alphabet — to decode, shift each one back.

The clue to the shift: Joanna was born in September — the 9th month of the year. That's your key number!

Shift each encoded letter BACK 9 places. If you go past A, wrap around from Z.

Example:  M is the 13th letter → 13 − 9 = 4 → D`,
    hint:"M→D,  X→O,  W→N,  C→T,  [space],  K→B,  N→E",
  },
  {
    id:2, icon:"📡", type:"Morse Code", color:"#1E40AF",
    encoded:"−·−·  /  ·−·  /  ··−  /  ·  /  ·−··",
    morse:true, answer:"CRUEL", reveals:"cruel",
    instructions:`Morse code was the telegraph language of the 1800s — still used by radio operators in the 1950s!

Each letter is made of dots (·) and dashes (−). Letters in the message are separated by  /

Look up (or recall) what each group of dots and dashes means, then write the letters to reveal the hidden word.

Toggle the reference chart below if you need it!`,
    hint:"C=−·−·  ·  R=·−·  ·  U=··−  ·  E=·  ·  L=·−··",
  },
  {
    id:3, icon:"🔄", type:"Atbash Cipher", color:"#166534",
    encoded:"GL  Z",
    answer:"TOA", reveals:"to a",
    instructions:`Atbash is one of the oldest known ciphers — used to encode Hebrew texts!

The alphabet is completely reversed:
  A ↔ Z,   B ↔ Y,   C ↔ X,   D ↔ W ... and so on.

The 1st letter swaps with the 26th. The 2nd with the 25th.

Decode each letter by finding its mirror in the alphabet. The space between GL and Z separates two words.`,
    hint:"G is the 7th letter → its mirror is the 20th = T.   L=12th → 15th = O.   Z=26th → 1st = A.",
  },
  {
    id:4, icon:"🚂", type:"Rail Fence Cipher", color:"#6B21A8",
    encoded:"HATER",
    answer:"HEART", reveals:"heart,",
    instructions:`The Rail Fence cipher zigzags a message across two "rails," then reads each rail left-to-right.

HEART was encoded like this:
  Rail 1:  H · A · T   (positions 1, 3, 5 — odd)
  Rail 2:  · E · R ·   (positions 2, 4 — even)

Reading Rail 1 then Rail 2 gives: HAT + ER = HATER

To DECODE: the first 3 letters (HAT) go into the odd positions 1,3,5 — and the last 2 (ER) fill positions 2,4. Weave them back together!`,
    hint:"Place H at 1, E at 2, A at 3, R at 4, T at 5 → read in order → H E A R T",
  },
  {
    id:5, icon:"🔀", type:"Scramble + Impostor", color:"#9D174D",
    encoded:"T   ·   A   ·   H   ·   Q   ·   S   ·   T",
    answer:"THATS", reveals:"that's",
    instructions:`These 6 letters spell out a hidden 5-letter word — but one is an IMPOSTOR that doesn't belong!

Step 1: Find and remove the letter that doesn't fit.
Step 2: Rearrange the remaining 5 letters to spell a real word.

Clue: the word is a common English contraction — think "that is" shortened.`,
    hint:"Q is the impostor — remove it. The 5 remaining letters T, A, H, S, T unscramble to...",
  },
  {
    id:6, icon:"💻", type:"Binary Code", color:"#1F2937",
    encoded:"10100  ·  10010  ·  10101  ·  00101",
    answer:"TRUE", reveals:"true",
    instructions:`Each letter is encoded as a 5-digit binary number, where A=1, B=2 ... Z=26.

Each position (right to left) has a value:
  16  ·  8  ·  4  ·  2  ·  1

Example:  1 0 1 0 0  =  16+0+4+0+0 = 20 = T (the 20th letter)

Decode all four groups to find the word!`,
    hint:"10100=20=T,  10010=18=R,  10101=21=U,  00101=5=E",
  },
];
const P1_PARTS = [
  {id:1,display:"Don't be"},{id:2,display:" cruel"},{id:3,display:" to a"},
  {id:4,display:" heart,"},{id:5,display:" that's"},{id:6,display:" true"},
];

// ── Puzzle 2 Data (Vitameatavegamin / I Love Lucy) ───────────────────────────
const P2_PUZZLES = [
  {
    id:1, icon:"📻", type:"NATO Phonetic", color:"#7C3AED",
    encoded:`THE: Tango · Hotel · Echo
ANSWER: Alpha · November · Sierra · Whiskey · Echo · Romeo
TO: Tango · Oscar
ALL: Alpha · Lima · Lima`,
    answer:"THEANSWERTOALL", reveals:"The answer to all",
    instructions:`Lucy and Ethel intercepted a military radio transmission in one of Lucy's wild schemes!

In the NATO phonetic alphabet, each letter is spoken as a code word:
  A=Alpha, B=Bravo, C=Charlie, D=Delta, E=Echo, F=Foxtrot ...
  G=Golf, H=Hotel, I=India, J=Juliet, K=Kilo, L=Lima ...
  M=Mike, N=November, O=Oscar, P=Papa, Q=Quebec, R=Romeo ...
  S=Sierra, T=Tango, U=Uniform, V=Victor, W=Whiskey, X=X-ray ...
  Y=Yankee, Z=Zulu

To decode: take only the FIRST LETTER of each code word. Each line is one word of the hidden phrase.`,
    hint:"T=Tango, H=Hotel, E=Echo → THE.   A=Alpha, N=November, S=Sierra, W=Whiskey, E=Echo, R=Romeo → ANSWER",
  },
  {
    id:2, icon:"📝", type:"Pig Latin", color:"#B45309",
    encoded:"ouryay  oblemspray",
    answer:"YOURPROBLEMS", reveals:"your problems",
    instructions:`Lucy wrote this secret note to pass to Ethel right under Ricky's nose — in Pig Latin!

How Pig Latin works:
  • Move ALL consonants from the START of a word to the END, then add "ay"
  • If a word starts with a vowel, just add "way"

Examples: CHAIR → AIRCHAY,  STREET → EETSTRAY,  EGG → EGGWAY

To decode: remove "ay" from the end, then take the trailing consonant(s) and move them back to the front.`,
    hint:"ouryay: remove 'ay' → oury → move 'y' to front → YOUR.   oblemspray: remove 'ay' → oblemsp+r → move 'pr' to front → PROBLEMS",
  },
  {
    id:3, icon:"🪞", type:"Word Reversal", color:"#0F766E",
    encoded:"si   ni   siht   elttil",
    answer:"ISINTHISLITTLE", reveals:"is in this little",
    instructions:`The Mertzes played a prank on Lucy and scrambled her shopping list — each word is spelled completely backwards!

Each word in the hidden phrase has been reversed, letter by letter. The spaces between words are your guide.

To decode: simply read each word backwards (right to left) to restore the original.

Example:  YPPAH → HAPPY`,
    hint:"si→IS,  ni→IN,  siht→THIS,  elttil→LITTLE",
  },
  {
    id:4, icon:"☎️", type:"Phone Keypad (T9)", color:"#0369A1",
    encoded:"666 · 555  |  22 · 666 · 8 · 8 · 555 · 33",
    t9:true,
    answer:"OLBOTTLE", reveals:"ol' bottle",
    instructions:`Before smartphones, Lucy would dial a telephone using buttons. Each key has letters:

  2=ABC   3=DEF   4=GHI   5=JKL
  6=MNO   7=PQRS  8=TUV   9=WXYZ

Press a key once for the 1st letter, twice for the 2nd, three times for the 3rd.
  2=A,  22=B,  222=C  ·  6=M,  66=N,  666=O

Dots (·) separate letters. The | mark separates words in the phrase.`,
    hint:"666=O, 555=L → OL.   22=B, 666=O, 8=T, 8=T, 555=L, 33=E → BOTTLE",
  },
  {
    id:5, icon:"🧪", type:"Emoji Cipher", color:"#BE123C",
    encoded:"🎻 🍦 🦁 🍎 🐭 🐘 🍎 🦁 🍎 🎻 🐘 🍇 🍎 🐭 🍦 🥜",
    emoji:true,
    emojiKey:[["🍎","A","Apple"],["🐘","E","Elephant"],["🍇","G","Grapes"],
              ["🍦","I","Ice cream"],["🐭","M","Mouse"],["🥜","N","Nuts"],
              ["🦁","T","Tiger"],["🎻","V","Violin"]],
    answer:"VITAMEATAVEGAMIN", reveals:"Vitameatavegamin",
    instructions:`The secret formula from Lucy's Vitameatavegamin commercial!

Each emoji in the sequence below stands for a letter — specifically, the first letter of what that emoji represents.

Examples:
  🍎 = A  (Apple starts with A)
  🐘 = E  (Elephant starts with E)

Use the full key shown below to decode all 16 emojis and reveal the magical ingredient name!`,
    hint:"🎻=V, 🍦=I, 🦁=T, 🍎=A, 🐭=M, 🐘=E, 🍇=G, 🥜=N",
  },
];
const P2_PARTS = [
  {id:1,display:"The answer to all"},{id:2,display:" your problems"},
  {id:3,display:" is in this little"},{id:4,display:" ol' bottle,"},
  {id:5,display:" Vitameatavegamin"},
];

// ── Generic Puzzle Game UI (shared by both puzzles) ───────────────────────────
function PuzzleGame({ back, puzzles, parts, correctAnswer, label, celebrate }) {
  const [tab, setTab] = useState(0);
  const [solved, setSolved] = useState(new Set());
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});
  const [hints, setHints] = useState({});
  const [morseVis, setMorseVis] = useState(false);
  const [t9Vis, setT9Vis] = useState(false);
  const [answerInput, setAnswerInput] = useState("");
  const [answerError, setAnswerError] = useState(false);
  const [done, setDone] = useState(false);

  const norm = s => s.trim().toUpperCase().replace(/[^A-Z]/g,"");

  const checkPuzzle = p => {
    if (norm(inputs[p.id]||"") === norm(p.answer)) {
      const next = new Set([...solved, p.id]);
      setSolved(next);
      if (next.size === puzzles.length) setTimeout(()=>setDone(true),600);
    } else {
      setErrors(e=>({...e,[p.id]:true}));
      setTimeout(()=>setErrors(e=>({...e,[p.id]:false})),700);
    }
  };

  const checkFinal = () => {
    if (norm(answerInput) === correctAnswer) setDone(true);
    else { setAnswerError(true); setTimeout(()=>setAnswerError(false),700); }
  };

  const phraseDisplay = () => parts.map(pt =>
    solved.has(pt.id) ? pt.display
      : pt.display.split("").map(c=>c===" "?" ":"●").join("")
  ).join("");

  const p = tab < puzzles.length ? puzzles[tab] : null;

  const tabStyle = i => ({
    flexShrink:0, padding:"8px 11px", border:"none", cursor:"pointer",
    fontFamily:INT, fontSize:12, fontWeight:tab===i?700:500, transition:"all .15s",
    borderRadius:"10px 10px 0 0",
    background: tab===i ? "#fff"
      : i===puzzles.length ? "rgba(244,196,48,.2)"
      : solved.has(puzzles[i]?.id) ? "rgba(34,197,94,.25)"
      : "rgba(255,255,255,.12)",
    color: tab===i ? PLUM
      : i===puzzles.length ? GOLD
      : solved.has(puzzles[i]?.id) ? "#86EFAC"
      : CHAMP,
  });

  if (done) return (
    <div style={{minHeight:600,display:"flex",flexDirection:"column",background:`linear-gradient(160deg,${PLUMDK} 0%,${PLUM} 100%)`}}>
      <TopBar onBack={back} title="🎉 Decoded!" />
      <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"24px 18px",gap:16}}>
        <div style={{fontSize:62,lineHeight:1}}>{celebrate.emoji}</div>
        <div style={{color:CHAMP,fontFamily:PF,fontSize:15,opacity:.85,textAlign:"center"}}>You cracked it!</div>
        <div style={{background:"rgba(255,255,255,.09)",borderRadius:20,border:`2px solid ${GOLD}`,padding:"22px 26px",maxWidth:500,width:"100%",textAlign:"center"}}>
          <div style={{fontFamily:PF,fontStyle:"italic",fontSize:celebrate.phraseFontSize||18,color:GOLD,lineHeight:1.6,fontWeight:700}}>
            "{celebrate.phrase}"
          </div>
        </div>
        <div style={{background:"rgba(255,255,255,.08)",borderRadius:16,padding:"16px 22px",maxWidth:500,width:"100%",textAlign:"center"}}>
          <div style={{color:GOLD,fontFamily:PF,fontSize:16,fontWeight:700,marginBottom:8}}>{celebrate.title}</div>
          <div style={{color:CHAMP,fontSize:13,lineHeight:1.9,fontFamily:INT}} dangerouslySetInnerHTML={{__html:celebrate.body}} />
        </div>
        <Btn onClick={back} style={{maxWidth:280}}>← Back to Puzzles</Btn>
      </div>
    </div>
  );

  return (
    <div style={{minHeight:600,display:"flex",flexDirection:"column",background:`linear-gradient(160deg,${PLUMDK} 0%,${PLUM} 100%)`}}>
      <TopBar onBack={back} title={label}
        right={<span style={{color:GOLD,fontSize:12,fontFamily:INT,fontWeight:700}}>{solved.size}/{puzzles.length} ✓</span>} />

      {/* Tab bar */}
      <div style={{display:"flex",overflowX:"auto",gap:3,padding:"10px 10px 0",scrollbarWidth:"none",WebkitOverflowScrolling:"touch"}}>
        {puzzles.map((_,i)=>(
          <button key={i} onClick={()=>setTab(i)} style={tabStyle(i)}>
            {solved.has(puzzles[i].id)?"✓":puzzles[i].icon} {i+1}
          </button>
        ))}
        <button onClick={()=>setTab(puzzles.length)} style={tabStyle(puzzles.length)}>✍️ Answer</button>
      </div>

      {/* White content panel */}
      <div style={{flex:1,background:"#fff",overflowY:"auto",padding:"20px 18px 36px"}}>

        {/* Puzzle tab */}
        {p && (
          <>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
              <span style={{fontSize:30}}>{p.icon}</span>
              <div>
                <div style={{fontFamily:PF,fontSize:19,fontWeight:700,color:p.color}}>
                  Station {p.id} — {p.type}
                </div>
                {solved.has(p.id)&&<div style={{color:"#22C55E",fontSize:13,fontWeight:700,fontFamily:INT}}>✓ Solved!</div>}
              </div>
            </div>

            {/* Instructions */}
            <div style={{background:"#F9FAFB",borderRadius:14,padding:"14px 16px",marginBottom:16,borderLeft:`4px solid ${p.color}`}}>
              <div style={{color:"#374151",fontSize:13,lineHeight:1.8,fontFamily:INT,whiteSpace:"pre-line"}}>{p.instructions}</div>
            </div>

            {/* Encoded message */}
            <div style={{marginBottom:14}}>
              <div style={{color:MUTED,fontSize:10,fontFamily:INT,fontWeight:700,letterSpacing:"1.5px",marginBottom:6}}>ENCODED MESSAGE</div>
              <div style={{background:"#0F172A",borderRadius:14,padding:"16px 18px",fontFamily:"'Courier New',monospace",fontSize:p.emoji?22:18,fontWeight:700,color:"#F4C430",letterSpacing:p.emoji?"3px":"2px",textAlign:"center",wordBreak:"break-all",lineHeight:1.9,whiteSpace:"pre-line"}}>
                {p.encoded}
              </div>
            </div>

            {/* Emoji key */}
            {p.emoji&&(
              <div style={{marginBottom:14}}>
                <div style={{color:MUTED,fontSize:10,fontFamily:INT,fontWeight:700,letterSpacing:"1.5px",marginBottom:8}}>CIPHER KEY</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                  {p.emojiKey.map(([sym,ltr,name])=>(
                    <div key={ltr} style={{background:"#F9FAFB",border:"1.5px solid #E5E7EB",borderRadius:10,padding:"7px 12px",display:"flex",gap:8,alignItems:"center"}}>
                      <span style={{fontSize:22}}>{sym}</span>
                      <div style={{fontFamily:INT,fontSize:12}}>
                        <div style={{fontWeight:700,color:PLUM}}>{ltr}</div>
                        <div style={{color:MUTED,fontSize:10}}>{name}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Polybius grid */}
            {p.polybius&&(
              <div style={{marginBottom:14}}>
                <div style={{color:MUTED,fontSize:10,fontFamily:INT,fontWeight:700,letterSpacing:"1.5px",marginBottom:8}}>POLYBIUS SQUARE</div>
                <div style={{overflowX:"auto"}}>
                  <table style={{borderCollapse:"collapse",margin:"0 auto",fontFamily:"monospace"}}>
                    <thead>
                      <tr>
                        <td style={{padding:"6px 12px",color:MUTED,fontSize:12,borderRight:"2px solid #E5E7EB"}}></td>
                        {[1,2,3,4,5].map(n=><th key={n} style={{padding:"6px 14px",color:p.color,fontSize:14,fontWeight:700,textAlign:"center",borderBottom:"2px solid #E5E7EB"}}>{n}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {[[1,"A","B","C","D","E"],[2,"F","G","H","I/J","K"],[3,"L","M","N","O","P"],[4,"Q","R","S","T","U"],[5,"V","W","X","Y","Z"]].map(([row,...letters])=>(
                        <tr key={row} style={{background:row%2===0?"#F0F9FF":"#fff"}}>
                          <th style={{padding:"6px 12px",color:p.color,fontSize:14,fontWeight:700,textAlign:"center",borderRight:"2px solid #E5E7EB"}}>{row}</th>
                          {letters.map((l,i)=><td key={i} style={{padding:"7px 14px",textAlign:"center",fontSize:13,color:l==="I/J"?"#DC2626":"#1F2937",fontWeight:600,border:"1px solid #E5E7EB"}}>{l}</td>)}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Morse chart */}
            {p.morse&&(
              <div style={{marginBottom:14}}>
                <button onClick={()=>setMorseVis(v=>!v)} style={{width:"100%",background:"none",border:`1.5px solid ${p.color}`,borderRadius:10,color:p.color,padding:"7px 14px",fontFamily:INT,fontSize:12,cursor:"pointer",fontWeight:600}}>
                  {morseVis?"▲ Hide":"▼ Show"} Morse Reference Chart 📡
                </button>
                {morseVis&&(
                  <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:4,marginTop:8,background:"#EFF6FF",borderRadius:10,padding:10,maxHeight:190,overflowY:"auto"}}>
                    {MORSE_REF.map(([l,c])=>(
                      <div key={l} style={{display:"flex",gap:5,alignItems:"baseline"}}>
                        <span style={{fontWeight:700,color:p.color,fontSize:12,fontFamily:"monospace",minWidth:14}}>{l}</span>
                        <span style={{color:"#374151",fontSize:10,fontFamily:"monospace"}}>{c}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* T9 keypad reference */}
            {p.t9&&(
              <div style={{marginBottom:14}}>
                <button onClick={()=>setT9Vis(v=>!v)} style={{width:"100%",background:"none",border:`1.5px solid ${p.color}`,borderRadius:10,color:p.color,padding:"7px 14px",fontFamily:INT,fontSize:12,cursor:"pointer",fontWeight:600}}>
                  {t9Vis?"▲ Hide":"▼ Show"} Phone Keypad Reference ☎️
                </button>
                {t9Vis&&(
                  <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6,marginTop:8,background:"#F0F9FF",borderRadius:10,padding:12}}>
                    {T9_REF.map(([num,letters])=>(
                      <div key={num} style={{background:"#fff",border:"1.5px solid #BAE6FD",borderRadius:8,padding:"8px 10px",textAlign:"center"}}>
                        <div style={{fontFamily:"monospace",fontSize:18,fontWeight:700,color:p.color}}>{num}</div>
                        <div style={{fontFamily:"monospace",fontSize:11,color:"#374151",letterSpacing:"1px"}}>{letters}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Solved / input */}
            {solved.has(p.id)?(
              <div style={{background:"#DCFCE7",border:"2px solid #22C55E",borderRadius:14,padding:"16px 18px",textAlign:"center"}}>
                <div style={{color:"#15803D",fontSize:12,fontFamily:INT,marginBottom:4}}>Decoded fragment:</div>
                <div style={{color:"#166534",fontFamily:PF,fontSize:20,fontWeight:700,fontStyle:"italic"}}>"{p.reveals}"</div>
              </div>
            ):(
              <>
                <input value={inputs[p.id]||""} onChange={e=>setInputs(i=>({...i,[p.id]:e.target.value}))}
                  onKeyDown={e=>e.key==="Enter"&&checkPuzzle(p)}
                  placeholder="Type your decoded answer here…"
                  style={{width:"100%",boxSizing:"border-box",border:`2px solid ${errors[p.id]?"#FB7185":"#E5E7EB"}`,borderRadius:12,padding:"12px 16px",fontFamily:INT,fontSize:15,outline:"none",marginBottom:10,background:errors[p.id]?"#FFF1F2":"#F9FAFB",color:"#111827",transition:"border-color .2s"}} />
                <div style={{display:"flex",gap:10}}>
                  <button onClick={()=>checkPuzzle(p)} style={{flex:1,background:p.color,border:"none",borderRadius:12,padding:"12px",color:"#fff",fontFamily:INT,fontWeight:700,fontSize:14,cursor:"pointer"}}>
                    Check Answer ✓
                  </button>
                  <button onClick={()=>setHints(h=>({...h,[p.id]:!h[p.id]}))} style={{background:"none",border:"1.5px solid #E5E7EB",borderRadius:12,padding:"12px 16px",color:"#6B7280",fontFamily:INT,fontSize:16,cursor:"pointer"}}>💡</button>
                </div>
                {errors[p.id]&&<p style={{color:"#DC2626",fontSize:13,fontFamily:INT,textAlign:"center",marginTop:8,fontWeight:500}}>Not quite — try again!</p>}
                {hints[p.id]&&(
                  <div style={{marginTop:10,background:"#FFFBEB",border:"1.5px solid #FCD34D",borderRadius:12,padding:"12px 16px",color:"#92400E",fontSize:13,fontFamily:INT,lineHeight:1.65}}>
                    💡 <strong>Hint:</strong> {p.hint}
                  </div>
                )}
              </>
            )}
          </>
        )}

        {/* Answer tab */}
        {tab===puzzles.length&&(
          <>
            <div style={{fontFamily:PF,fontSize:21,fontWeight:700,color:PLUM,marginBottom:6}}>Enter the Full Phrase</div>
            <p style={{color:MUTED,fontSize:13,fontFamily:INT,lineHeight:1.7,marginBottom:18}}>
              Solve the stations to reveal each piece — or type the full phrase below if you know it! Punctuation (commas, apostrophes) is completely optional.
            </p>
            <div style={{background:"#F3E8FF",borderRadius:16,padding:"16px 18px",marginBottom:20}}>
              <div style={{color:MUTED,fontSize:10,fontFamily:INT,fontWeight:700,letterSpacing:"1px",marginBottom:10}}>DECODED SO FAR — {solved.size}/{puzzles.length} STATIONS</div>
              <div style={{fontFamily:PF,fontStyle:"italic",fontSize:16,color:PLUM,lineHeight:1.8,wordBreak:"break-word",marginBottom:12}}>{phraseDisplay()}</div>
              <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
                {puzzles.map(dp=>(
                  <div key={dp.id} onClick={()=>setTab(dp.id-1)} style={{width:30,height:30,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",background:solved.has(dp.id)?"#22C55E":"#E5E7EB",color:solved.has(dp.id)?"#fff":"#9CA3AF",fontSize:12,fontWeight:700,fontFamily:INT,transition:"all .3s"}}>
                    {solved.has(dp.id)?"✓":dp.id}
                  </div>
                ))}
              </div>
            </div>
            <div style={{color:MUTED,fontSize:10,fontFamily:INT,fontWeight:700,letterSpacing:"1px",marginBottom:8}}>YOUR ANSWER</div>
            <input value={answerInput} onChange={e=>setAnswerInput(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&checkFinal()}
              placeholder="Type the full decoded phrase…"
              style={{width:"100%",boxSizing:"border-box",border:`2px solid ${answerError?"#FB7185":"#E5E7EB"}`,borderRadius:12,padding:"13px 16px",fontFamily:INT,fontSize:15,outline:"none",marginBottom:10,background:answerError?"#FFF1F2":"#F9FAFB",color:"#111827",transition:"border-color .2s"}} />
            {answerError&&<p style={{color:"#DC2626",fontSize:13,fontFamily:INT,textAlign:"center",marginBottom:10,fontWeight:500}}>Not quite — keep trying!</p>}
            <Btn onClick={checkFinal} style={{background:PLUM,color:"#fff"}}>Submit Phrase 🔓</Btn>
          </>
        )}
      </div>
    </div>
  );
}

// ── Decoder Game (selection screen + puzzle routing) ─────────────────────────
function DecoderGame({ back }) {
  const [active, setActive] = useState(null); // null | 1 | 2
  const [unlocked, setUnlocked] = useState(false);
  const [pw, setPw] = useState('');
  const [pwErr, setPwErr] = useState(false);

  const tryPw = () => {
    if (pw.toLowerCase() === 'trent') { setUnlocked(true); setPwErr(false); }
    else { setPwErr(true); setPw(''); }
  };

  // Password screen
  if (!unlocked) return (
    <div style={{minHeight:600,display:'flex',flexDirection:'column',background:`linear-gradient(160deg,${PLUMDK},${PLUM})`}}>
      <TopBar onBack={back} title="🔓 Decoder"/>
      <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',padding:20}}>
        <div style={{background:'rgba(255,255,255,.08)',borderRadius:24,padding:40,maxWidth:320,width:'100%',textAlign:'center',border:`1px solid ${GOLD}33`}}>
          <div style={{fontSize:52,marginBottom:14}}>🔒</div>
          <div style={{color:GOLD,fontFamily:PF,fontSize:22,fontWeight:700,marginBottom:6}}>Password Required</div>
          <div style={{color:CHAMP,fontSize:13,fontFamily:INT,marginBottom:24,opacity:.65}}>Enter the secret password to unlock the Decoder</div>
          <input type="password" value={pw} autoFocus
            onChange={e=>{setPw(e.target.value);setPwErr(false);}}
            onKeyDown={e=>e.key==='Enter'&&tryPw()}
            placeholder="Password..."
            style={{width:'100%',padding:'13px 16px',borderRadius:12,border:`2px solid ${pwErr?'#EF5350':GOLD+'55'}`,
              background:'rgba(255,255,255,.1)',color:'#fff',fontFamily:INT,fontSize:20,
              marginBottom:10,outline:'none',boxSizing:'border-box',textAlign:'center',letterSpacing:8}}/>
          {pwErr&&<div style={{color:'#EF5350',fontSize:12,fontFamily:INT,marginBottom:10}}>❌ Wrong password, try again!</div>}
          <button onClick={tryPw} style={{background:GOLD,color:PLUM,border:'none',borderRadius:13,padding:'13px 0',fontFamily:PF,fontWeight:700,fontSize:17,cursor:'pointer',width:'100%'}}>Unlock →</button>
        </div>
      </div>
    </div>
  );

  if (active === 1) return (
    <PuzzleGame
      back={()=>setActive(null)}
      puzzles={P1_PUZZLES} parts={P1_PARTS}
      correctAnswer="DONTBECRUELTOAHEARTTHATSTRUE"
      label="🔐 Puzzle 1"
      celebrate={{
        emoji:"🎂",
        phrase:"Don't be cruel to a heart, that's true",
        phraseFontSize:20,
        title:"🎵 Don't Be Cruel — Elvis Presley",
        body:`#1 song on <strong style="color:#F4C430">September 18th, 1956</strong><br/><span style="opacity:.8">Joanna's very own birthday!</span><br/><span style="color:#F4C430;font-weight:600">Happy 70th, Joanna! 🎉</span>`,
      }}
    />
  );

  if (active === 2) return (
    <PuzzleGame
      back={()=>setActive(null)}
      puzzles={P2_PUZZLES} parts={P2_PARTS}
      correctAnswer="THEANSWERTOALLYOURPROBLEMSISINTHISLITTLEOLBOTTLEVITAMEATAVEGAMIN"
      label="🔏 Puzzle 2"
      celebrate={{
        emoji:"📺",
        phrase:"The answer to all your problems is in this little ol' bottle, Vitameatavegamin",
        phraseFontSize:15,
        title:"📺 I Love Lucy — 'Lucy Does a TV Commercial'",
        body:`One of the most iconic scenes in television history!<br/><span style="opacity:.8">Lucy Ricardo tries to film a commercial for a health tonic — and keeps drinking the product. The word <strong style="color:#F4C430">Vitameatavegamin</strong> became legendary.</span><br/><span style="color:#F4C430;font-weight:600">First aired in 1952 — right when Joanna was growing up! 🎉</span>`,
      }}
    />
  );

  if (active === 3) return (
    <PuzzleGame
      back={()=>setActive(null)}
      puzzles={P3_PUZZLES} parts={P3_PARTS}
      correctAnswer="KIDNEYTRANSPLANT"
      label="🗝️ Puzzle 3"
      celebrate={{
        emoji:"🏥",
        phrase:"kidney transplant",
        phraseFontSize:28,
        title:"🏥 A Medical Milestone — 1950",
        body:`On June 17, 1950, Dr. Richard Lawler performed one of the world's first kidney transplants in Chicago, Illinois — a breakthrough that opened the door to modern transplant medicine.<br/><span style="opacity:.8">This life-changing moment happened right at the dawn of the decade Joanna grew up in.</span><br/><span style="color:#F4C430;font-weight:600">The 1950s — Joanna's era! 🎉</span>`,
      }}
    />
  );

  // Selection screen
  return (
    <div style={{minHeight:600,display:"flex",flexDirection:"column",background:`linear-gradient(160deg,${PLUMDK} 0%,${PLUM} 100%)`}}>
      <TopBar onBack={back} title="🔓 Decoder" />
      <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"24px 18px",gap:20}}>
        <div style={{textAlign:"center"}}>
          <div style={{fontSize:48,marginBottom:10}}>📺</div>
          <div style={{fontFamily:PF,color:"#fff",fontSize:22,fontWeight:700,marginBottom:6}}>Choose Your Puzzle</div>
          <p style={{color:CHAMP,fontSize:13,opacity:.75,fontFamily:INT}}>Solve the stations in each puzzle to decode the secret phrase!</p>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:14,maxWidth:440,width:"100%"}}>
          {[
            {num:1,icon:"🔐",title:"Puzzle 1",subtitle:"6 cipher stations",desc:"Crack each station to reveal a piece of the secret phrase",accent:"#92400E",bg:"#FEFCE8"},
            {num:2,icon:"🔏",title:"Puzzle 2",subtitle:"5 cipher stations",desc:"Decode each clue to unlock the hidden message",accent:"#7C3AED",bg:"#F5F3FF"},
            {num:3,icon:"🗝️",title:"Puzzle 3",subtitle:"5 cipher stations",desc:"Five all-new cipher types stand between you and the answer",accent:"#0369A1",bg:"#EFF6FF"},
          ].map(({num,icon,title,subtitle,desc,accent,bg})=>(
            <button key={num} onClick={()=>setActive(num)} style={{
              background:"rgba(255,255,255,.97)",borderRadius:20,
              padding:"22px 24px",border:`2px solid rgba(255,255,255,.3)`,
              cursor:"pointer",textAlign:"left",transition:"all .2s ease",
              boxShadow:"0 8px 28px rgba(0,0,0,.25)",
            }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 12px 36px rgba(0,0,0,.35)";}}
              onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 8px 28px rgba(0,0,0,.25)";}}>
              <div style={{display:"flex",alignItems:"center",gap:14}}>
                <div style={{width:52,height:52,borderRadius:14,background:bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,flexShrink:0}}>
                  {icon}
                </div>
                <div style={{flex:1}}>
                  <div style={{fontFamily:PF,fontSize:13,color:MUTED,fontWeight:600,marginBottom:2}}>{title}</div>
                  <div style={{fontFamily:PF,fontSize:18,fontWeight:700,color:accent,marginBottom:4}}>{subtitle}</div>
                  <div style={{fontFamily:INT,fontSize:12,color:MUTED,lineHeight:1.4}}>{desc}</div>
                </div>
                <div style={{color:accent,fontSize:22,flexShrink:0}}>→</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Puzzle 3 Data (Kidney Transplant / 1950) ─────────────────────────────────
const P3_PUZZLES = [
  {
    id:1, icon:"🔲", type:"Polybius Square", color:"#0369A1",
    polybius:true,
    encoded:"25  ·  24  ·  14",
    answer:"KID", reveals:"kid",
    instructions:`The Polybius square is an ancient Greek cipher invented around 150 BC. Each letter is located in a 5×5 grid and encoded as two digits: ROW number first, then COLUMN number.

Note: I and J share the same cell (row 2, col 4).

To decode: look up each pair of numbers in the grid shown below. The fragment is 3 letters long.`,
    hint:"25 = row 2, col 5 = K   ·   24 = row 2, col 4 = I   ·   14 = row 1, col 4 = D",
  },
  {
    id:2, icon:"🔍", type:"Null Cipher", color:"#166534",
    encoded:"Notable Experimental Yearning for organ transplants defined 1950 medical history.",
    answer:"NEY", reveals:"ney",
    instructions:`A null cipher hides a secret message inside a perfectly ordinary-looking sentence! The message is invisible to anyone not looking for it.

The hidden fragment is exactly 3 letters long.

To decode: take the FIRST LETTER of each word in order — but collect only the first 3. Everything else is camouflage!`,
    hint:"N=Notable, E=Experimental, Y=Yearning — those are your three first letters!",
  },
  {
    id:3, icon:"⏭️", type:"Skip Cipher", color:"#9D174D",
    encoded:"T · Z · R · Q · A · X · N · W · S",
    answer:"TRANS", reveals:" trans",
    instructions:`This message has been padded with decoy letters to disguise the real text!

A fake letter has been inserted between every real letter. To decode:

  • Keep only the letters at ODD positions: 1st, 3rd, 5th, 7th, 9th...
  • Discard the letters at EVEN positions: 2nd, 4th, 6th, 8th...

The dots (·) separate each individual letter to help you count positions. The hidden fragment is 5 letters long.`,
    hint:"Odd positions (1,3,5,7,9): T R A N S — the Z, Q, X, W at even positions are decoys!",
  },
  {
    id:4, icon:"🔁", type:"ROT13", color:"#7C3AED",
    encoded:"CY",
    answer:"PL", reveals:"pl",
    instructions:`ROT13 shifts every letter exactly 13 places forward in the alphabet. Since there are 26 letters, applying it twice returns to the start — so decoding is identical to encoding!

ROT13 swap pairs (each letter trades places with its partner):
  A↔N  ·  B↔O  ·  C↔P  ·  D↔Q  ·  E↔R  ·  F↔S  ·  G↔T
  H↔U  ·  I↔V  ·  J↔W  ·  K↔X  ·  L↔Y  ·  M↔Z

Find the swap partner of each encoded letter to reveal the 2-letter fragment.`,
    hint:"C↔P (3rd letter + 13 = 16th letter)   ·   Y↔L (25th letter − 13 = 12th letter)",
  },
  {
    id:5, icon:"🏛️", type:"Roman Numerals", color:"#B45309",
    encoded:"I  ·  XIV  ·  XX",
    answer:"ANT", reveals:"ant",
    instructions:`The ancient Romans would have been amazed by modern surgery — but they'd recognize this cipher!

Convert each Roman numeral to a regular number, then find the corresponding letter (A=1, B=2 ... Z=26).

Roman numeral values:
  I=1   V=5   X=10   L=50   C=100   D=500   M=1,000

Key rule: a smaller numeral placed BEFORE a larger one is SUBTRACTED:
  IV = 5−1 = 4,   IX = 10−1 = 9,   XIV = X + IV = 10+4 = 14

Decode all three groups to find the 3-letter fragment!`,
    hint:"I = 1 = A   ·   XIV = 10+4 = 14 = N   ·   XX = 10+10 = 20 = T",
  },
];
const P3_PARTS = [
  {id:1, display:"kid"},
  {id:2, display:"ney"},
  {id:3, display:" trans"},
  {id:4, display:"pl"},
  {id:5, display:"ant"},
];

// ── Pac Mom ───────────────────────────────────────────────────────────────────
const PM = {
  CS:18, NR:21, NC:21, HUD:48,
  DR:[0,1,0,-1], DC:[1,0,-1,0], OPP:[2,3,0,1],
  MAZE:[
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1],
    [1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1],
    [1,0,1,0,1,1,1,0,1,1,1,1,1,0,1,1,1,0,1,0,1],
    [1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1],
    [1,0,1,0,0,1,0,1,1,1,1,1,1,1,0,1,0,0,1,0,1],
    [1,0,1,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,1,0,1],
    [1,0,0,0,0,1,1,1,1,1,4,1,1,1,1,1,0,0,0,0,1],
    [1,1,1,1,0,1,3,3,3,3,3,3,3,3,3,1,0,1,1,1,1],
    [0,0,0,0,0,1,3,3,3,3,3,3,3,3,3,1,0,0,0,0,0],
    [1,1,1,1,0,1,3,3,3,3,3,3,3,3,3,1,0,1,1,1,1],
    [1,0,0,0,0,1,1,1,0,0,0,0,0,1,1,1,0,0,0,0,1],
    [1,0,1,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,1,0,1],
    [1,0,1,0,0,1,0,1,1,1,1,1,1,1,0,1,0,0,1,0,1],
    [1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1],
    [1,0,1,0,1,1,1,0,1,1,1,1,1,0,1,1,1,0,1,0,1],
    [1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1],
    [1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  ],
};

function pmDrawJoanna(ctx, x, y, dir, ma, cs) {
  const R = cs * 0.74;
  const rot = [0, Math.PI/2, Math.PI, -Math.PI/2][dir];
  const ang = ma * Math.PI;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
  // Auburn hair blob
  ctx.fillStyle = '#8B3A2A';
  ctx.beginPath(); ctx.arc(0, -R*0.12, R*1.05, ang*0.4, Math.PI*2 - ang*0.4); ctx.fill();
  ctx.beginPath(); ctx.arc(-R*0.28, -R*0.9, R*0.32, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc( R*0.15, -R*0.95, R*0.28, 0, Math.PI*2); ctx.fill();
  // Peach face wedge
  ctx.fillStyle = '#FDDCB5';
  ctx.beginPath(); ctx.moveTo(0,0); ctx.arc(0,0,R,ang,Math.PI*2-ang); ctx.closePath(); ctx.fill();
  // Fade features when mouth open
  const fa = Math.max(0, 1 - ma*4);
  if (fa > 0.05) {
    ctx.globalAlpha = fa;
    // Eyebrows
    ctx.strokeStyle='#5C2E0A'; ctx.lineWidth=R*0.14; ctx.lineCap='round';
    ctx.beginPath(); ctx.moveTo(-R*0.48,-R*0.36); ctx.lineTo(-R*0.22,-R*0.48); ctx.stroke();
    ctx.beginPath(); ctx.moveTo( R*0.22,-R*0.48); ctx.lineTo( R*0.48,-R*0.36); ctx.stroke();
    // Brown eyes
    ctx.fillStyle='#5C2E0A';
    ctx.beginPath(); ctx.arc(-R*0.3,-R*0.2,R*0.18,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc( R*0.3,-R*0.2,R*0.18,0,Math.PI*2); ctx.fill();
    // Highlights
    ctx.fillStyle='rgba(255,255,255,0.7)';
    ctx.beginPath(); ctx.arc(-R*0.24,-R*0.27,R*0.08,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc( R*0.35,-R*0.27,R*0.08,0,Math.PI*2); ctx.fill();
    // Cheeks
    ctx.fillStyle='rgba(255,140,140,0.38)';
    ctx.beginPath(); ctx.arc(-R*0.44,R*0.08,R*0.22,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc( R*0.44,R*0.08,R*0.22,0,Math.PI*2); ctx.fill();
    // Nose
    ctx.fillStyle='rgba(180,100,80,0.55)';
    ctx.beginPath(); ctx.arc(0,R*0.05,R*0.08,0,Math.PI*2); ctx.fill();
    ctx.globalAlpha = 1;
  }
  ctx.restore();
}

function pmDrawGhost(ctx, x, y, color, scared, flash, cs) {
  const R = cs/2 - 1, c = scared ? (flash ? '#fff':'#2121DE') : color;
  ctx.fillStyle = c;
  ctx.beginPath(); ctx.arc(x,y-R*.3,R,Math.PI,0); ctx.lineTo(x+R,y+R*.7);
  const bw = R*2/3;
  for(let i=2;i>=0;i--) ctx.arc(x+R-(2*i+1)*bw/2,y+R*.7,bw/2,0,Math.PI,true);
  ctx.closePath(); ctx.fill();
  if (!scared) {
    ctx.fillStyle='#fff';
    ctx.beginPath(); ctx.arc(x-R*.35,y-R*.3,R*.27,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(x+R*.35,y-R*.3,R*.27,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#00F';
    ctx.beginPath(); ctx.arc(x-R*.28,y-R*.22,R*.13,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(x+R*.28,y-R*.22,R*.13,0,Math.PI*2); ctx.fill();
  } else {
    ctx.fillStyle='#fff';
    ctx.beginPath(); ctx.arc(x-R*.35,y-R*.2,R*.12,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(x+R*.35,y-R*.2,R*.12,0,Math.PI*2); ctx.fill();
  }
}

function PacMom({ back }) {
  const cvs = useRef(null);
  const G = useRef(null);
  const af = useRef(null);
  const [ui, setUi] = useState({score:0,lives:3,level:1,st:'ready'});

  const {CS,NR,NC,HUD,DR,DC,OPP,MAZE} = PM;
  const W = NC*CS, H = NR*CS;

  const pacSpd = l => Math.max(4, 14 - Math.floor(l*0.38));
  const ghSpd  = l => Math.max(5, 17 - Math.floor(l*0.46));
  const frightT = l => Math.max(80, 360 - l*11);
  const nGhosts = l => Math.min(4, 1 + Math.floor((l-1)/6));

  const wc = c => (c+NC)%NC;
  const cellVal = (maze,r,c) => (r<0||r>=NR||c<0||c>=NC) ? 1 : maze[r][c];
  const pacOk = (maze,r,c) => [0,2].includes(cellVal(maze,r,c));
  const ghOk  = (maze,r,c) => [0,2,3,4].includes(cellVal(maze,r,c));

  const mkDots = (maze) => {
    const dots=new Set(), pellets=new Set(); let tot=0;
    for(let r=0;r<NR;r++) for(let c=0;c<NC;c++){
      if(maze[r][c]===0){dots.add(`${r},${c}`);tot++;}
      if(maze[r][c]===2){pellets.add(`${r},${c}`);tot++;}
    }
    return {dots,pellets,tot};
  };

  const mkGhosts = (level) => [
    {id:0,color:'#FF0000',row:10,gc:9, dir:1,mode:'house',relF:30,         tick:0,sc:false,dead:false,dt:0},
    {id:1,color:'#FFB8FF',row:10,gc:10,dir:1,mode:'house',relF:30+Math.floor(150/Math.max(1,nGhosts(level)-1)||150), tick:0,sc:false,dead:false,dt:0},
    {id:2,color:'#00FFFF',row:10,gc:11,dir:1,mode:'house',relF:30+Math.floor(270/Math.max(1,nGhosts(level)-1)||270), tick:0,sc:false,dead:false,dt:0},
    {id:3,color:'#FFB852',row:10,gc:8, dir:1,mode:'house',relF:30+Math.floor(390/Math.max(1,nGhosts(level)-1)||390), tick:0,sc:false,dead:false,dt:0},
  ];

  const initGame = (lvl=1, sc=0, lv=3) => {
    const maze = MAZE.map(r=>[...r]);
    const {dots,pellets,tot} = mkDots(maze);
    G.current = {
      st:'playing', score:sc, lives:lv, level:lvl, frame:0,
      maze, dots, pellets, tot, left:tot,
      fright:0, combo:0,
      pac:{row:17,col:10,dir:2,next:2,tick:0,ma:0,mad:1},
      ghosts: mkGhosts(lvl),
      dieTimer:0, lvlTimer:0,
    };
    setUi({score:sc,lives:lv,level:lvl,st:'playing'});
  };

  useEffect(() => {
    const canvas = cvs.current;
    const ctx = canvas.getContext('2d');
    G.current = { st:'ready', score:0, lives:3, level:1 };

    const onKey = e => {
      const g = G.current; if (!g) return;
      const map = {ArrowRight:0,ArrowDown:1,ArrowLeft:2,ArrowUp:3};
      if (map[e.code] !== undefined) { if(g.pac) g.pac.next=map[e.code]; e.preventDefault(); }
      if (e.code==='Space'||e.code==='Enter') {
        if(g.st==='ready'||g.st==='gameover') initGame();
      }
    };
    window.addEventListener('keydown', onKey);

    let ts = null;
    const onTS = e => { ts={x:e.touches[0].clientX,y:e.touches[0].clientY}; e.preventDefault(); };
    const onTE = e => {
      if(!ts) return;
      const dx=e.changedTouches[0].clientX-ts.x, dy=e.changedTouches[0].clientY-ts.y;
      const g=G.current;
      if(g.st==='ready'||g.st==='gameover'){initGame();ts=null;return;}
      if(g.pac) { if(Math.abs(dx)>Math.abs(dy)) g.pac.next=dx>0?0:2; else g.pac.next=dy>0?1:3; }
      ts=null; e.preventDefault();
    };
    canvas.addEventListener('touchstart',onTS,{passive:false});
    canvas.addEventListener('touchend',onTE,{passive:false});

    const moveGhost = (gh, g) => {
      if(gh.dead){
        gh.dt++;
        if(gh.dt>220){
          // Respawn in house — must wait there before exiting again
          gh.row=10; gh.gc=9+Math.min(gh.id,3); gh.mode='house';
          gh.sc=false; gh.dead=false; gh.dt=0;
          gh.relF = g.frame + 180 + gh.id*40; // stagger re-exit timing
        }
        return;
      }
      if(gh.mode==='house'){
        if(g.frame>=gh.relF && gh.id<nGhosts(g.level)) gh.mode='exiting';
        return;
      }
      if(gh.mode==='exiting'){
        if(gh.gc!==10){ gh.gc+=gh.gc<10?1:-1; }
        else if(gh.row>7){ gh.row--; if(gh.row<=7) gh.mode='chase'; }
        return;
      }
      gh.tick++;
      if(gh.tick<ghSpd(g.level)) return;
      gh.tick=0;
      const {row,gc:col,dir} = gh;
      const dirs=[0,1,2,3].filter(d=>d!==OPP[dir]);
      const valid=dirs.filter(d=>{
        const nr=row+DR[d], nc=wc(col+DC[d]);
        if(d===1&&nr>=NR||d===3&&nr<0) return false;
        return ghOk(g.maze,nr,nc);
      });
      if(!valid.length){ gh.dir=OPP[dir]; return; }
      let chosen;
      if(gh.sc){ chosen=valid[Math.floor(Math.random()*valid.length)]; }
      else {
        const {row:pr,col:pc}=g.pac;
        chosen=valid.reduce((best,d)=>{
          const nr=row+DR[d],nc=wc(col+DC[d]);
          const bd=row+DR[best],bc=wc(col+DC[best]);
          return(Math.abs(nr-pr)+Math.abs(nc-pc))<(Math.abs(bd-pr)+Math.abs(bc-pc))?d:best;
        });
      }
      gh.dir=chosen;
      let nr=row+DR[chosen], nc=wc(col+DC[chosen]);
      if(chosen===1&&nr>=NR)nr=0; if(chosen===3&&nr<0)nr=NR-1;
      gh.row=nr; gh.gc=nc;
    };

    const loop = () => {
      const g = G.current;
      ctx.fillStyle='#0F172A'; ctx.fillRect(0,0,W,H+HUD);

      // HUD
      ctx.fillStyle=GOLD; ctx.font=`bold 14px ${PF}`; ctx.textAlign='left';
      ctx.fillText(`Score: ${g.score||0}`,8,22);
      ctx.textAlign='center'; ctx.fillText(`Level ${g.level||1}`,W/2,22);
      ctx.textAlign='right'; ctx.fillText(`♥`.repeat(g.lives||3),W-8,22);

      ctx.save(); ctx.translate(0,HUD);

      // Draw maze
      const maze = g.maze||MAZE;
      for(let r=0;r<NR;r++) for(let c=0;c<NC;c++){
        const v=cellVal(maze,r,c);
        if(v===1){
          ctx.fillStyle='#1E3A5F'; ctx.fillRect(c*CS,r*CS,CS,CS);
          ctx.strokeStyle='#2563EB'; ctx.lineWidth=1;
          ctx.strokeRect(c*CS+.5,r*CS+.5,CS-1,CS-1);
        } else if(v===3){ ctx.fillStyle='#12122A'; ctx.fillRect(c*CS,r*CS,CS,CS); }
        else if(v===4){ ctx.fillStyle='#EC4899'; ctx.fillRect(c*CS,r*CS+CS/2-1,CS,3); }
      }

      if(g.st==='playing'||g.st==='dying'||g.st==='levelup'){
        // Dots
        if(g.dots) g.dots.forEach(k=>{
          const [r,c]=k.split(',').map(Number);
          ctx.fillStyle='#FFE0B2'; ctx.beginPath(); ctx.arc(c*CS+CS/2,r*CS+CS/2,2.2,0,Math.PI*2); ctx.fill();
        });
        // Pellets
        if(g.pellets) g.pellets.forEach(k=>{
          const [r,c]=k.split(',').map(Number);
          if(Math.floor(g.frame/8)%2===0){
            ctx.fillStyle='#FFE0B2'; ctx.beginPath(); ctx.arc(c*CS+CS/2,r*CS+CS/2,5,0,Math.PI*2); ctx.fill();
          }
        });
      }

      if(g.st==='playing'){
        g.frame++;
        if(g.fright>0){g.fright--;if(g.fright===0){g.ghosts.forEach(h=>{if(!h.dead)h.sc=false;});g.combo=0;}}

        // Move pac
        const p=g.pac; p.tick++;
        if(p.tick>=pacSpd(g.level)){
          p.tick=0;
          const nr0=p.row+DR[p.next],nc0=wc(p.col+DC[p.next]);
          if(pacOk(g.maze,nr0,nc0)) p.dir=p.next;
          const nr=p.row+DR[p.dir],nc=wc(p.col+DC[p.dir]);
          if(pacOk(g.maze,nr,nc)){p.row=nr;p.col=nc;}
          const k=`${p.row},${p.col}`;
          if(g.dots.has(k)){g.dots.delete(k);g.score+=10;g.left--;}
          if(g.pellets.has(k)){g.pellets.delete(k);g.score+=50;g.left--;g.fright=frightT(g.level);g.combo=0;g.ghosts.forEach(h=>{if(!h.dead)h.sc=true;});}
          if(g.left<=0){g.st='levelup';g.lvlTimer=100;}
        }
        p.ma+=p.mad*.13; if(p.ma>=0.42){p.ma=0.42;p.mad=-1;} if(p.ma<=0){p.ma=0;p.mad=1;}

        g.ghosts.forEach(h=>moveGhost(h,g));

        // Collision
        g.ghosts.forEach(h=>{
          if(h.dead||h.mode==='house') return;
          if(h.row===g.pac.row&&h.gc===g.pac.col){
            if(h.sc){h.dead=true;h.sc=false;h.dt=0;g.combo++;g.score+=200*Math.pow(2,g.combo-1);}
            else{
              g.lives--;
              if(g.lives<=0){g.st='gameover';}
              else{g.st='dying';g.dieTimer=80;}
            }
          }
        });
        setUi({score:g.score,lives:g.lives,level:g.level,st:g.st});
      }

      if(g.st==='dying'){
        g.dieTimer--;
        if(g.dieTimer<=0){
          g.pac={row:17,col:10,dir:2,next:2,tick:0,ma:0,mad:1};
          g.ghosts=mkGhosts(g.level); g.fright=0; g.combo=0; g.st='playing';
        }
      }
      if(g.st==='levelup'){
        g.lvlTimer--;
        if(g.lvlTimer<=0){
          const nl=Math.min(25,g.level+1);
          const maze2=MAZE.map(r=>[...r]);
          const {dots:d2,pellets:p2,tot:t2}=mkDots(maze2);
          Object.assign(g,{level:nl,maze:maze2,dots:d2,pellets:p2,tot:t2,left:t2,frame:0,fright:0,combo:0,
            pac:{row:17,col:10,dir:2,next:2,tick:0,ma:0,mad:1},ghosts:mkGhosts(nl),st:'playing'});
          setUi({score:g.score,lives:g.lives,level:nl,st:'playing'});
        }
      }

      // Draw pac + ghosts
      if(g.pac && g.st!=='ready'){
        pmDrawJoanna(ctx,g.pac.col*CS+CS/2,g.pac.row*CS+CS/2,g.pac.dir,g.pac.ma,CS);
      }
      if(g.ghosts) g.ghosts.forEach(h=>{
        if(h.mode==='house'&&h.id>=nGhosts(g.level)) return;
        if(h.dead) return;
        pmDrawGhost(ctx,h.gc*CS+CS/2,h.row*CS+CS/2,h.color,h.sc,g.fright>0&&g.fright<60,CS);
      });

      // Overlays
      if(g.st==='ready'||g.st==='gameover'){
        ctx.fillStyle='rgba(0,0,0,.52)'; ctx.fillRect(0,0,W,H);
        ctx.fillStyle=GOLD; ctx.font=`bold 22px ${PF}`; ctx.textAlign='center';
        if(g.st==='gameover'){
          ctx.fillText('Game Over! 😵',W/2,H/2-24);
          ctx.fillStyle='#fff'; ctx.font=`14px ${INT}`;
          ctx.fillText(`Final score: ${g.score}`,W/2,H/2+8);
          ctx.fillText('Tap or press Enter to play again',W/2,H/2+32);
        } else {
          ctx.fillText('👾 Pac Mom',W/2,H/2-24);
          ctx.fillStyle='#fff'; ctx.font=`13px ${INT}`;
          ctx.fillText('Eat all the dots! Avoid the ghosts!',W/2,H/2+8);
          ctx.fillText('Tap or press Enter to start',W/2,H/2+30);
          ctx.fillText('Arrow keys or swipe to move',W/2,H/2+50);
        }
      }
      if(g.st==='levelup'){
        ctx.fillStyle='rgba(0,0,0,.4)'; ctx.fillRect(0,0,W,H);
        ctx.fillStyle=GOLD; ctx.font=`bold 26px ${PF}`; ctx.textAlign='center';
        ctx.fillText(g.level>=25?'🏆 Final Level!!':`Level ${g.level||1} Complete!`,W/2,H/2-12);
        ctx.fillStyle='#fff'; ctx.font=`14px ${INT}`;
        ctx.fillText(`Next: Level ${Math.min(25,(g.level||1)+1)}  •  Speed up!`,W/2,H/2+18);
      }

      ctx.restore();
      af.current = requestAnimationFrame(loop);
    };

    af.current = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(af.current);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <div style={{minHeight:600,display:'flex',flexDirection:'column',background:`linear-gradient(160deg,${PLUMDK} 0%,${PLUM} 100%)`}}>
      <TopBar onBack={back} title="👾 Pac Mom"
        right={<span style={{color:GOLD,fontSize:12,fontFamily:INT,fontWeight:700}}>Lv.{ui.level}</span>} />
      <div style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'12px 8px',gap:10}}>
        <canvas ref={cvs} width={W} height={H+HUD}
          style={{borderRadius:14,boxShadow:'0 8px 32px rgba(0,0,0,.5)',maxWidth:'100%',display:'block',cursor:'default'}} />
        <p style={{color:CHAMP,fontSize:11,opacity:.55,textAlign:'center'}}>Arrow keys / swipe · Eat dots · Avoid ghosts · 25 levels</p>
      </div>
    </div>
  );
}


// ── Joanna Crush ──────────────────────────────────────────────────────────────
const JGEMS = [
  {id:0,name:'Record', c1:'#EF5350',c2:'#5C0A0A',glow:'#EF5350'},
  {id:1,name:'Flower', c1:'#F06292',c2:'#880E4F',glow:'#F06292'},
  {id:2,name:'Star',   c1:'#FFD740',c2:'#E65100',glow:'#FFD740'},
  {id:3,name:'Cherry', c1:'#FF7043',c2:'#7B0000',glow:'#FF7043'},
  {id:4,name:'Bow',    c1:'#CE93D8',c2:'#4A148C',glow:'#CE93D8'},
  {id:5,name:'Guitar', c1:'#4DB6AC',c2:'#004D40',glow:'#4DB6AC'},
];
const JR=8,JC=8;
const JGP={IDLE:'idle',SWAP:'swap',SWAPBACK:'swapback',MATCH:'match',FALL:'fall'};

// ── Rounded-rect helper (polyfill-safe) ──────────────────────────────────────
function jRR(ctx,x,y,w,h,r){
  ctx.beginPath();ctx.moveTo(x+r,y);ctx.lineTo(x+w-r,y);
  ctx.quadraticCurveTo(x+w,y,x+w,y+r);ctx.lineTo(x+w,y+h-r);
  ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);ctx.lineTo(x+r,y+h);
  ctx.quadraticCurveTo(x,y+h,x,y+h-r);ctx.lineTo(x,y+r);
  ctx.quadraticCurveTo(x,y,x+r,y);ctx.closePath();
}

// ── Gem drawing ───────────────────────────────────────────────────────────────
function jDrawGem(ctx,x,y,sz,type,scl=1,al=1,bright=false){
  const g=JGEMS[type]??JGEMS[0];
  const r=sz*.18,cx=x+sz/2,cy=y+sz/2;
  ctx.save();ctx.globalAlpha=al;
  ctx.translate(cx,cy);ctx.scale(scl,scl);ctx.translate(-cx,-cy);

  // Background gradient
  const bg=ctx.createRadialGradient(x+sz*.32,y+sz*.28,0,x+sz*.5,y+sz*.5,sz*.65);
  if(bright){bg.addColorStop(0,'#fff');bg.addColorStop(.4,g.c1);bg.addColorStop(1,g.c2);}
  else{bg.addColorStop(0,g.c1);bg.addColorStop(1,g.c2);}
  ctx.fillStyle=bg;jRR(ctx,x,y,sz,sz,r);ctx.fill();

  // Type-specific art
  ctx.save();ctx.translate(x,y);
  const h=sz/2;

  if(type===0){ // Vinyl record
    ctx.fillStyle='#111';ctx.beginPath();ctx.arc(h,h,sz*.36,0,Math.PI*2);ctx.fill();
    [.16,.22,.28].forEach(rr=>{ctx.strokeStyle='#2a2a2a';ctx.lineWidth=1;ctx.beginPath();ctx.arc(h,h,sz*rr,0,Math.PI*2);ctx.stroke();});
    const lb=ctx.createRadialGradient(h-2,h-3,0,h,h,sz*.14);
    lb.addColorStop(0,'#FFD740');lb.addColorStop(1,'#FF6D00');
    ctx.fillStyle=lb;ctx.beginPath();ctx.arc(h,h,sz*.14,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#111';ctx.beginPath();ctx.arc(h,h,sz*.03,0,Math.PI*2);ctx.fill();
  }
  else if(type===1){ // Flower with petals
    for(let p=0;p<5;p++){
      ctx.save();ctx.translate(h,h);ctx.rotate(p*Math.PI*2/5);
      ctx.fillStyle='rgba(255,236,240,.92)';
      ctx.beginPath();ctx.ellipse(0,-sz*.22,sz*.1,sz*.19,0,0,Math.PI*2);ctx.fill();
      ctx.restore();
    }
    const cc=ctx.createRadialGradient(h-1,h-2,0,h,h,sz*.13);
    cc.addColorStop(0,'#FFF9C4');cc.addColorStop(1,'#F9A825');
    ctx.fillStyle=cc;ctx.beginPath();ctx.arc(h,h,sz*.13,0,Math.PI*2);ctx.fill();
  }
  else if(type===2){ // 5-pointed star
    ctx.save();ctx.translate(h,h+sz*.02);ctx.fillStyle='#FFD740';ctx.strokeStyle='rgba(255,160,0,.5)';ctx.lineWidth=1;
    ctx.beginPath();
    for(let i=0;i<5;i++){
      const oa=i*4*Math.PI/5-Math.PI/2,ia=oa+Math.PI/5;
      const oR=sz*.37,iR=sz*.15;
      i===0?ctx.moveTo(Math.cos(oa)*oR,Math.sin(oa)*oR):ctx.lineTo(Math.cos(oa)*oR,Math.sin(oa)*oR);
      ctx.lineTo(Math.cos(ia)*iR,Math.sin(ia)*iR);
    }
    ctx.closePath();ctx.fill();ctx.stroke();ctx.restore();
  }
  else if(type===3){ // Cherry pair
    ctx.strokeStyle='#388E3C';ctx.lineWidth=2.2;ctx.lineCap='round';
    ctx.beginPath();ctx.moveTo(sz*.35,sz*.52);ctx.quadraticCurveTo(sz*.35,sz*.2,sz*.5,sz*.2);ctx.quadraticCurveTo(sz*.65,sz*.2,sz*.65,sz*.38);ctx.stroke();
    [[.33,.64],[.63,.64]].forEach(([px,py])=>{
      const cg=ctx.createRadialGradient(sz*(px-.07),sz*(py-.08),0,sz*px,sz*py,sz*.19);
      cg.addColorStop(0,'#FF5252');cg.addColorStop(1,'#B71C1C');
      ctx.fillStyle=cg;ctx.beginPath();ctx.arc(sz*px,sz*py,sz*.19,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='rgba(255,255,255,.36)';ctx.beginPath();ctx.arc(sz*(px-.06),sz*(py-.07),sz*.065,0,Math.PI*2);ctx.fill();
    });
  }
  else if(type===4){ // Bow/ribbon
    ctx.save();ctx.translate(h,h);
    const bw='rgba(243,229,245,.9)';ctx.strokeStyle='rgba(255,255,255,.35)';ctx.lineWidth=1;
    // Wings
    [[-1],[1]].forEach(([d])=>{
      ctx.fillStyle=bw;ctx.beginPath();ctx.moveTo(0,0);
      ctx.bezierCurveTo(d*sz*.05,-sz*.26,d*sz*.37,-sz*.28,d*sz*.37,-sz*.04);
      ctx.bezierCurveTo(d*sz*.37,sz*.17,d*sz*.05,sz*.18,0,0);
      ctx.fill();ctx.stroke();
    });
    // Tails
    [[-1],[1]].forEach(([d])=>{
      ctx.fillStyle=bw;ctx.beginPath();ctx.moveTo(0,0);
      ctx.bezierCurveTo(d*sz*.04,sz*.1,d*sz*.22,sz*.28,d*sz*.28,sz*.33);
      ctx.lineTo(d*sz*.2,sz*.37);ctx.bezierCurveTo(d*sz*.12,sz*.3,d*sz*.01,sz*.12,0,0);
      ctx.fill();
    });
    // Knot
    const kg=ctx.createRadialGradient(-1,-2,0,0,0,sz*.1);kg.addColorStop(0,'#F3E5F5');kg.addColorStop(1,'#CE93D8');
    ctx.fillStyle=kg;ctx.beginPath();ctx.arc(0,0,sz*.1,0,Math.PI*2);ctx.fill();
    ctx.restore();
  }
  else if(type===5){ // Guitar silhouette
    const nw=sz*.13;
    ctx.fillStyle='#00897B';ctx.fillRect(h-nw/2,sz*.08,nw,sz*.45);
    ctx.fillRect(h-nw*.8,sz*.08,nw*1.6,sz*.07); // nut
    const bodyG=ctx.createRadialGradient(h,sz*.62,0,h,sz*.62,sz*.25);
    bodyG.addColorStop(0,'#4DB6AC');bodyG.addColorStop(1,'#00695C');
    ctx.fillStyle=bodyG;
    ctx.beginPath();ctx.arc(h,sz*.5,sz*.19,0,Math.PI*2);ctx.fill();
    ctx.beginPath();ctx.arc(h,sz*.7,sz*.22,0,Math.PI*2);ctx.fill();
    ctx.fillStyle=g.c2;ctx.beginPath();ctx.arc(h,sz*.68,sz*.1,0,Math.PI*2);ctx.fill();
    ctx.strokeStyle='rgba(255,255,255,.32)';ctx.lineWidth=.8;
    [-sz*.04,0,sz*.04].forEach(d=>{ctx.beginPath();ctx.moveTo(h+d,sz*.08);ctx.lineTo(h+d,sz*.68);ctx.stroke();});
  }

  ctx.restore();

  // Top-left specular highlight
  const hl=ctx.createRadialGradient(x+sz*.28,x+sz*.22,0,x+sz*.28,y+sz*.22,sz*.42);
  hl.addColorStop(0,'rgba(255,255,255,.52)');hl.addColorStop(.55,'rgba(255,255,255,.1)');hl.addColorStop(1,'rgba(255,255,255,0)');
  ctx.fillStyle=hl;jRR(ctx,x,y,sz,sz,r);ctx.fill();
  // Edge shine
  ctx.strokeStyle='rgba(255,255,255,.22)';ctx.lineWidth=1.5;jRR(ctx,x,y,sz,sz,r);ctx.stroke();

  ctx.restore();
}

// ── Match detection ───────────────────────────────────────────────────────────
function jFindMatches(tgrid){
  const m=new Set();
  for(let r=0;r<JR;r++)for(let c=0;c<JC-2;c++){
    const t=tgrid[r][c];if(t==null)continue;
    if(t===tgrid[r][c+1]&&t===tgrid[r][c+2]){
      let l=3;while(c+l<JC&&t===tgrid[r][c+l])l++;
      for(let i=0;i<l;i++)m.add(`${r},${c+i}`);c+=l-1;
    }
  }
  for(let c=0;c<JC;c++)for(let r=0;r<JR-2;r++){
    const t=tgrid[r][c];if(t==null)continue;
    if(t===tgrid[r+1][c]&&t===tgrid[r+2][c]){
      let l=3;while(r+l<JR&&t===tgrid[r+l][c])l++;
      for(let i=0;i<l;i++)m.add(`${r+i},${c}`);r+=l-1;
    }
  }
  return m;
}

function JoannaCrush({back}){
  const cvs=useRef(null);
  const G=useRef(null);
  const af=useRef(null);
  const [ui,setUi]=useState({score:0,moves:28,level:1,overlay:null,target:3000});

  const CS=44,GAP=4,PAD=10,MAXLV=10;
  const W=JC*(CS+GAP)-GAP+PAD*2, H=JR*(CS+GAP)-GAP+PAD*2;
  const LERP=0.2, LERP_FAST=0.28;
  const px=(col)=>PAD+col*(CS+GAP), py=(row)=>PAD+row*(CS+GAP);
  const jTarget=lv=>500*lv*(lv+5);
  const jMoves=lv=>Math.max(18,30-lv*2);

  // Build grid avoiding initial matches
  const initG=(lv=1,sc=0)=>{
    let nid=0;
    const pm=new Map();
    const tg=Array.from({length:JR},()=>new Array(JC).fill(null));
    const ig=Array.from({length:JR},()=>new Array(JC).fill(null));
    for(let r=0;r<JR;r++)for(let c=0;c<JC;c++){
      let t,att=0;
      do{t=Math.floor(Math.random()*JGEMS.length);att++;}
      while(att<10&&((c>=2&&tg[r][c-1]===t&&tg[r][c-2]===t)||(r>=2&&tg[r-1]?.[c]===t&&tg[r-2]?.[c]===t)));
      const id=nid++;
      pm.set(id,{id,type:t,row:r,col:c,x:px(c),y:py(r)-JR*(CS+GAP),tx:px(c),ty:py(r),scl:1,al:1,bright:false});
      tg[r][c]=t;ig[r][c]=id;
    }
    const tgt=jTarget(lv);
    return{pm,grid:ig,sel:null,phase:JGP.IDLE,score:sc,moves:jMoves(lv),level:lv,nid,cascade:0,
      swapData:null,swapT:0,matchSet:new Set(),matchT:0,target:tgt};
  };

  useEffect(()=>{
    G.current=initG();
    setUi({score:0,moves:G.current.moves,level:1,overlay:null,target:G.current.target});
    const ctx=cvs.current.getContext('2d');

    const getTypeGrid=g=>Array.from({length:JR},(_,r)=>Array.from({length:JC},(_,c)=>{
      const id=g.grid[r][c];return id!=null?g.pm.get(id)?.type??null:null;
    }));

    const allSettled=g=>{for(const p of g.pm.values())if(Math.abs(p.y-p.ty)>1.5||Math.abs(p.x-p.tx)>1.5)return false;return true;};

    const applyGravity=g=>{
      for(let c=0;c<JC;c++){
        const col=[];
        for(let r=0;r<JR;r++){const id=g.grid[r][c];if(id!=null)col.push(id);}
        const fill=JR-col.length;
        // Move existing pieces to new rows
        col.forEach((id,i)=>{
          const nr=fill+i,p=g.pm.get(id);
          if(p){p.row=nr;p.col=c;p.tx=px(c);p.ty=py(nr);}
          g.grid[nr][c]=id;
        });
        // New pieces drop from above
        for(let r=0;r<fill;r++){
          const id=g.nid++;const t=Math.floor(Math.random()*JGEMS.length);
          g.pm.set(id,{id,type:t,row:r,col:c,x:px(c),y:py(r)-(fill-r)*(CS+GAP)-CS,tx:px(c),ty:py(r),scl:1,al:1,bright:false});
          g.grid[r][c]=id;
        }
      }
    };

    const startMatching=g=>{
      const m=jFindMatches(getTypeGrid(g));
      if(!m.size){
        g.phase=JGP.IDLE;
        setUi(u=>({...u,score:g.score,moves:g.moves}));
        if(g.score>=g.target)setUi(u=>({...u,overlay:'win'}));
        else if(g.moves<=0)setUi(u=>({...u,overlay:'lose'}));
        return;
      }
      g.matchSet=m;g.matchT=0;g.phase=JGP.MATCH;
      m.forEach(k=>{const[r,c]=k.split(',').map(Number);const id=g.grid[r][c];const p=g.pm.get(id);if(p)p.bright=true;});
    };

    const update=()=>{
      const g=G.current;if(!g)return;
      // Lerp all pieces
      for(const p of g.pm.values()){
        const sp=p.y<0?LERP_FAST:LERP;
        p.x+=(p.tx-p.x)*sp;p.y+=(p.ty-p.y)*sp;
      }

      if(g.phase===JGP.SWAP){
        g.swapT++;
        if(g.swapT>=22){
          const m=jFindMatches(getTypeGrid(g));
          if(!m.size){
            // Invalid — swap back
            g.phase=JGP.SWAPBACK;g.swapT=0;
            const{r1,c1,r2,c2,id1,id2}=g.swapData;
            [g.grid[r1][c1],g.grid[r2][c2]]=[g.grid[r2][c2],g.grid[r1][c1]];
            const p1=g.pm.get(id1),p2=g.pm.get(id2);
            if(p1){p1.row=r1;p1.col=c1;p1.tx=px(c1);p1.ty=py(r1);}
            if(p2){p2.row=r2;p2.col=c2;p2.tx=px(c2);p2.ty=py(r2);}
          } else {
            g.moves--;g.cascade=0;startMatching(g);
            setUi(u=>({...u,moves:g.moves}));
          }
        }
      }
      else if(g.phase===JGP.SWAPBACK){g.swapT++;if(g.swapT>=22)g.phase=JGP.IDLE;}
      else if(g.phase===JGP.MATCH){
        g.matchT++;
        const t=g.matchT;
        g.matchSet.forEach(k=>{
          const[r,c]=k.split(',').map(Number);const id=g.grid[r][c];const p=g.pm.get(id);
          if(!p)return;
          if(t<22){p.scl=1+.18*Math.sin(t*.38);p.bright=Math.floor(t/4)%2===0;}
          else{p.scl=Math.max(0,p.scl-.07);p.al=Math.max(0,p.al-.065);}
        });
        if(t>=48){
          const pts=Math.round(g.matchSet.size*60*Math.pow(1.5,g.cascade));
          g.score+=pts;g.cascade++;
          g.matchSet.forEach(k=>{
            const[r,c]=k.split(',').map(Number);const id=g.grid[r][c];
            if(id!=null){g.pm.delete(id);g.grid[r][c]=null;}
          });
          g.matchSet=new Set();
          applyGravity(g);g.phase=JGP.FALL;
        }
      }
      else if(g.phase===JGP.FALL){if(allSettled(g))startMatching(g);}
    };

    const render=()=>{
      const g=G.current;
      // Board bg
      ctx.fillStyle='#09011A';ctx.fillRect(0,0,W,H);
      // Cell slots
      for(let r=0;r<JR;r++)for(let c=0;c<JC;c++){
        ctx.fillStyle='rgba(255,255,255,.05)';jRR(ctx,px(c),py(r),CS,CS,CS*.15);ctx.fill();
      }
      // Pieces (sorted: non-selected first)
      const selId=g.sel?.id;
      const pArr=[...g.pm.values()];
      pArr.filter(p=>p.id!==selId).forEach(p=>jDrawGem(ctx,p.x,p.y,CS,p.type,p.scl,p.al,p.bright));
      pArr.filter(p=>p.id===selId).forEach(p=>{
        // Selection glow ring
        ctx.save();ctx.strokeStyle=GOLD;ctx.lineWidth=3;
        ctx.shadowColor=GOLD;ctx.shadowBlur=14+4*Math.sin(Date.now()*.007);
        ctx.globalAlpha=.85;jRR(ctx,p.x-2,p.y-2,CS+4,CS+4,CS*.2);ctx.stroke();ctx.restore();
        jDrawGem(ctx,p.x,p.y,CS,p.type,p.scl*1.1,p.al,p.bright);
      });
    };

    const loop=()=>{update();render();af.current=requestAnimationFrame(loop);};
    af.current=requestAnimationFrame(loop);

    const onTap=e=>{
      e.preventDefault();
      const g=G.current;
      if(!g||g.phase!==JGP.IDLE||ui.overlay)return;
      const rect=cvs.current.getBoundingClientRect();
      const dpr=window.devicePixelRatio||1;
      const mx=((e.clientX??e.touches?.[0]?.clientX)-rect.left)*(W/rect.width);
      const my=((e.clientY??e.touches?.[0]?.clientY)-rect.top)*(H/rect.height);
      const col=Math.floor((mx-PAD)/(CS+GAP)),row=Math.floor((my-PAD)/(CS+GAP));
      if(row<0||row>=JR||col<0||col>=JC)return;
      const id=g.grid[row]?.[col];if(id==null)return;
      if(!g.sel){g.sel={id,row,col};return;}
      const{row:sr,col:sc,id:sid}=g.sel;g.sel=null;
      if(sid===id)return;
      if(Math.abs(row-sr)+Math.abs(col-sc)!==1){g.sel={id,row,col};return;}
      // Swap
      [g.grid[sr][sc],g.grid[row][col]]=[g.grid[row][col],g.grid[sr][sc]];
      const p1=g.pm.get(sid),p2=g.pm.get(id);
      if(p1){p1.row=row;p1.col=col;p1.tx=px(col);p1.ty=py(row);}
      if(p2){p2.row=sr;p2.col=sc;p2.tx=px(sc);p2.ty=py(sr);}
      g.swapData={r1:sr,c1:sc,r2:row,c2:col,id1:sid,id2:id};
      g.phase=JGP.SWAP;g.swapT=0;
    };

    cvs.current.addEventListener('click',onTap);
    cvs.current.addEventListener('touchstart',onTap,{passive:false});
    return()=>{cancelAnimationFrame(af.current);cvs.current?.removeEventListener('click',onTap);cvs.current?.removeEventListener('touchstart',onTap);};
  },[]);

  // Overlay buttons need current G state — use a ref callback
  const doNext=()=>{
    const nl=G.current.level+1;
    const ng=initG(nl,G.current.score);
    G.current=ng;
    setUi({score:ng.score,moves:ng.moves,level:nl,overlay:null,target:ng.target});
  };
  const doRetry=()=>{
    const ng=initG(G.current.level,0);
    G.current=ng;
    setUi({score:0,moves:ng.moves,level:G.current.level,overlay:null,target:ng.target});
  };

  const prog=Math.min(1,ui.score/ui.target);

  return(
    <div style={{minHeight:600,display:'flex',flexDirection:'column',background:`linear-gradient(160deg,${PLUMDK},${PLUM})`}}>
      <TopBar onBack={back} title="🍬 Joanna Crush"
        right={<span style={{color:GOLD,fontSize:12,fontFamily:INT,fontWeight:700}}>Lv {ui.level}/{MAXLV}</span>}/>

      {/* HUD */}
      <div style={{padding:'10px 18px 6px',display:'flex',alignItems:'center',gap:14}}>
        <div style={{textAlign:'center',minWidth:68}}>
          <div style={{color:MUTED,fontSize:9,fontFamily:INT,textTransform:'uppercase',letterSpacing:.8}}>Score</div>
          <div style={{color:GOLD,fontFamily:PF,fontSize:20,fontWeight:700}}>{ui.score.toLocaleString()}</div>
        </div>
        <div style={{flex:1}}>
          <div style={{height:10,background:'rgba(255,255,255,.1)',borderRadius:5,overflow:'hidden'}}>
            <div style={{height:'100%',width:`${prog*100}%`,background:prog>=1?'#4CAF50':GOLD,borderRadius:5,transition:'width .4s ease'}}/>
          </div>
          <div style={{display:'flex',justifyContent:'space-between',marginTop:3}}>
            <span style={{color:CHAMP,fontSize:9,fontFamily:INT,opacity:.55}}>0</span>
            <span style={{color:CHAMP,fontSize:9,fontFamily:INT,opacity:.55}}>🎯 {ui.target.toLocaleString()}</span>
          </div>
        </div>
        <div style={{textAlign:'center',minWidth:68}}>
          <div style={{color:MUTED,fontSize:9,fontFamily:INT,textTransform:'uppercase',letterSpacing:.8}}>Moves</div>
          <div style={{color:ui.moves<=5?'#EF5350':CHAMP,fontFamily:PF,fontSize:20,fontWeight:700}}>{ui.moves}</div>
        </div>
      </div>

      {/* Canvas board */}
      <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',padding:'4px 8px 10px',position:'relative'}}>
        <div style={{borderRadius:22,overflow:'hidden',boxShadow:'0 8px 40px rgba(0,0,0,.65)'}}>
          <canvas ref={cvs} width={W} height={H} style={{display:'block',maxWidth:'100%'}}/>
        </div>

        {/* Overlay */}
        {ui.overlay&&(
          <div style={{position:'absolute',inset:0,background:'rgba(0,0,0,.75)',display:'flex',
            alignItems:'center',justifyContent:'center',borderRadius:22}}>
            <div style={{background:`linear-gradient(135deg,${PLUMDK},${PLUM})`,border:`2px solid ${GOLD}`,
              borderRadius:26,padding:'38px 32px',textAlign:'center',maxWidth:290,width:'90%',
              boxShadow:'0 20px 60px rgba(0,0,0,.6)'}}>
              {ui.overlay==='win'?(
                <>
                  <div style={{fontSize:54,marginBottom:10}}>🎉</div>
                  <div style={{color:GOLD,fontFamily:PF,fontSize:26,fontWeight:900,marginBottom:6}}>Level {ui.level} Complete!</div>
                  <div style={{color:CHAMP,fontSize:14,fontFamily:INT,marginBottom:26,opacity:.8}}>Score: {ui.score.toLocaleString()}</div>
                  {ui.level<MAXLV
                    ?<button onClick={doNext} style={{background:GOLD,color:PLUM,border:'none',borderRadius:13,
                        padding:'13px 0',fontFamily:PF,fontWeight:700,fontSize:17,cursor:'pointer',width:'100%'}}>
                        Level {ui.level+1} →</button>
                    :<div style={{color:GOLD,fontFamily:PF,fontSize:20}}>🏆 All 10 levels complete!</div>
                  }
                </>
              ):(
                <>
                  <div style={{fontSize:54,marginBottom:10}}>😥</div>
                  <div style={{color:'#EF5350',fontFamily:PF,fontSize:24,fontWeight:900,marginBottom:6}}>Out of Moves!</div>
                  <div style={{color:CHAMP,fontSize:14,fontFamily:INT,marginBottom:4,opacity:.8}}>{ui.score.toLocaleString()} / {ui.target.toLocaleString()}</div>
                  <div style={{color:MUTED,fontSize:12,fontFamily:INT,marginBottom:26}}>Need {(ui.target-ui.score).toLocaleString()} more</div>
                  <button onClick={doRetry} style={{background:GOLD,color:PLUM,border:'none',borderRadius:13,
                    padding:'13px 0',fontFamily:PF,fontWeight:700,fontSize:17,cursor:'pointer',width:'100%'}}>Try Again</button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Gem key */}
      <div style={{display:'flex',justifyContent:'center',flexWrap:'wrap',gap:6,padding:'0 10px 14px'}}>
        {JGEMS.map(g=>(
          <div key={g.id} style={{display:'flex',alignItems:'center',gap:4,
            background:'rgba(255,255,255,.07)',borderRadius:8,padding:'3px 9px'}}>
            <span style={{color:CHAMP,fontSize:10,fontFamily:INT,opacity:.65}}>{g.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Sudoku ────────────────────────────────────────────────────────────────────
function sudValid(b,r,c,n){
  for(let i=0;i<9;i++) if(b[r][i]===n||b[i][c]===n) return false;
  const br=Math.floor(r/3)*3,bc=Math.floor(c/3)*3;
  for(let dr=0;dr<3;dr++) for(let dc=0;dc<3;dc++) if(b[br+dr][bc+dc]===n) return false;
  return true;
}
function sudFill(b){
  for(let r=0;r<9;r++) for(let c=0;c<9;c++) if(b[r][c]===0){
    const ns=[1,2,3,4,5,6,7,8,9].sort(()=>Math.random()-.5);
    for(const n of ns){if(sudValid(b,r,c,n)){b[r][c]=n;if(sudFill(b))return true;b[r][c]=0;}}
    return false;
  }
  return true;
}
function sudGen(difficulty){
  const sol=Array.from({length:9},()=>new Array(9).fill(0));
  sudFill(sol);
  const keep={easy:38,medium:29,hard:23}[difficulty];
  const puz=sol.map(r=>[...r]);
  const pos=[...Array(81).keys()].sort(()=>Math.random()-.5);
  let kept=81;
  for(const p of pos){if(kept<=keep)break;puz[Math.floor(p/9)][p%9]=0;kept--;}
  return{puz,sol};
}

function SudokuGame({back}){
  const [screen,setScreen]=useState('select');
  const [diff,setDiff]=useState('easy');
  const [sol,setSol]=useState(null);
  const [board,setBoard]=useState(null);
  const [given,setGiven]=useState(null);
  const [sel,setSel]=useState(null);
  const [hintCell,setHintCell]=useState(null);
  const [checking,setChecking]=useState(false); // true for 10s when Check is pressed
  const [time,setTime]=useState(0);

  // Refs for stale-closure-safe keyboard handler
  const selR=useRef(null),boardR=useRef(null),givenR=useRef(null),solR=useRef(null);
  useEffect(()=>{selR.current=sel;},[sel]);
  useEffect(()=>{boardR.current=board;},[board]);
  useEffect(()=>{givenR.current=given;},[given]);
  useEffect(()=>{solR.current=sol;},[sol]);

  // Timer
  useEffect(()=>{
    if(screen!=='play')return;
    const id=setInterval(()=>setTime(t=>t+1),1000);
    return()=>clearInterval(id);
  },[screen]);

  const fmt=t=>`${Math.floor(t/60)}:${(t%60).toString().padStart(2,'0')}`;

  const startGame=d=>{
    const{puz,sol:s}=sudGen(d);
    setDiff(d);setSol(s);setBoard(puz.map(r=>[...r]));
    setGiven(puz.map(r=>r.map(v=>v!==0)));
    setSel(null);setTime(0);setScreen('play');setHintCell(null);
  };

  const enterNum=n=>{
    const s=selR.current,b=boardR.current,g=givenR.current,so=solR.current;
    if(!s||!b||!g)return;
    if(g[s.r][s.c])return;
    const nb=b.map(r=>[...r]);
    nb[s.r][s.c]=n;
    setBoard(nb);
    if(n!==0) setHintCell(null); // clear hint when player fills a cell
    if(n!==0&&so&&nb.every((row,ri)=>row.every((v,ci)=>v===so[ri][ci])))setScreen('win');
  };

  const tryPw=()=>{
    if(pw.toLowerCase()==='trent'){setScreen('select');setPwErr(false);}
    else{setPwErr(true);setPw('');}
  };

  // Hint: find a cell with only one valid possibility and flash it
  const giveHint=()=>{
    const b=boardR.current, g=givenR.current, so=solR.current;
    if(!b||!g||!so) return;
    // Collect all empty (or wrong) unfilled cells
    const candidates=[];
    for(let r=0;r<9;r++) for(let c=0;c<9;c++){
      if(!g[r][c]&&b[r][c]!==so[r][c]) candidates.push({r,c});
    }
    if(!candidates.length) return;
    // Prefer a "naked single" — cell where only one number is valid
    const naked=candidates.find(({r,c})=>{
      let count=0;
      for(let n=1;n<=9;n++) if(sudValid(b.map(row=>[...row]),r,c,n)){count++;if(count>1)break;}
      return count===1;
    });
    const pick=naked||candidates[Math.floor(Math.random()*candidates.length)];
    // Flash the cell for 2.5s, then fill it in
    setHintCell(pick);
    setSel(pick);
    setTimeout(()=>{
      setBoard(prev=>{
        const nb=prev.map(row=>[...row]);
        nb[pick.r][pick.c]=so[pick.r][pick.c];
        if(nb.every((row,ri)=>row.every((v,ci)=>v===so[ri][ci]))) setScreen('win');
        return nb;
      });
      setHintCell(null);
    },1800);
  };

  // Check: highlight correct (green) and incorrect (red) player entries for 10s
  const checkAnswers=()=>{
    if(checking) return;
    setChecking(true);
    setTimeout(()=>setChecking(false), 10000);
  };

  // Keyboard
  useEffect(()=>{
    if(screen!=='play')return;
    const onKey=e=>{
      if(e.key>='1'&&e.key<='9')enterNum(parseInt(e.key));
      if(e.key==='Backspace'||e.key==='Delete')enterNum(0);
      if(e.key==='ArrowUp')setSel(s=>s?{r:Math.max(0,s.r-1),c:s.c}:s);
      if(e.key==='ArrowDown')setSel(s=>s?{r:Math.min(8,s.r+1),c:s.c}:s);
      if(e.key==='ArrowLeft')setSel(s=>s?{r:s.r,c:Math.max(0,s.c-1)}:s);
      if(e.key==='ArrowRight')setSel(s=>s?{r:s.r,c:Math.min(8,s.c+1)}:s);
    };
    window.addEventListener('keydown',onKey);
    return()=>window.removeEventListener('keydown',onKey);
  },[screen]);

  const CS=38;
  const btn={background:GOLD,color:PLUM,border:'none',borderRadius:13,padding:'13px 0',
    fontFamily:PF,fontWeight:700,fontSize:17,cursor:'pointer',width:'100%',marginBottom:10};

  if(screen==='password') return(
    <div style={{minHeight:600,display:'flex',flexDirection:'column',background:`linear-gradient(160deg,${PLUMDK},${PLUM})`}}>
      <TopBar onBack={back} title="🔢 Sudoku"/>
      <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',padding:20}}>
        <div style={{background:'rgba(255,255,255,.08)',borderRadius:24,padding:40,maxWidth:320,width:'100%',textAlign:'center',border:`1px solid ${GOLD}33`}}>
          <div style={{fontSize:52,marginBottom:14}}>🔒</div>
          <div style={{color:GOLD,fontFamily:PF,fontSize:22,fontWeight:700,marginBottom:6}}>Password Required</div>
          <div style={{color:CHAMP,fontSize:13,fontFamily:INT,marginBottom:24,opacity:.65}}>Enter the secret password to unlock Sudoku</div>
          <input type="password" value={pw} autoFocus
            onChange={e=>{setPw(e.target.value);setPwErr(false);}}
            onKeyDown={e=>e.key==='Enter'&&tryPw()}
            placeholder="Password..."
            style={{width:'100%',padding:'13px 16px',borderRadius:12,border:`2px solid ${pwErr?'#EF5350':GOLD+'55'}`,
              background:'rgba(255,255,255,.1)',color:'#fff',fontFamily:INT,fontSize:20,
              marginBottom:10,outline:'none',boxSizing:'border-box',textAlign:'center',letterSpacing:8}}/>
          {pwErr&&<div style={{color:'#EF5350',fontSize:12,fontFamily:INT,marginBottom:10}}>❌ Wrong password, try again!</div>}
          <button onClick={tryPw} style={{...btn,marginBottom:0}}>Unlock →</button>
        </div>
      </div>
    </div>
  );

  if(screen==='select') return(
    <div style={{minHeight:600,display:'flex',flexDirection:'column',background:`linear-gradient(160deg,${PLUMDK},${PLUM})`}}>
      <TopBar onBack={back} title="🔢 Sudoku"/>
      <div style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:24,gap:14}}>
        <div style={{textAlign:'center',marginBottom:8}}>
          <div style={{color:GOLD,fontFamily:PF,fontSize:26,fontWeight:900}}>Choose Difficulty</div>
          <div style={{color:CHAMP,fontSize:13,fontFamily:INT,opacity:.6,marginTop:4}}>How sharp is your mind today? 🧠</div>
        </div>
        {[
          {d:'easy',  emoji:'🌸',label:'Easy',  desc:'38 clues — relaxed and fun',   clr:'#66BB6A'},
          {d:'medium',emoji:'⭐',label:'Medium',desc:'29 clues — a real challenge',   clr:GOLD},
          {d:'hard',  emoji:'🔥',label:'Hard',  desc:'23 clues — for puzzle masters!',clr:'#EF5350'},
        ].map(({d,emoji,label,desc,clr})=>(
          <button key={d} onClick={()=>startGame(d)}
            style={{background:'rgba(255,255,255,.07)',border:`2px solid ${clr}44`,borderRadius:20,
              padding:'20px 26px',cursor:'pointer',maxWidth:320,width:'100%',textAlign:'left',transition:'all .15s'}}
            onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,255,255,.13)';e.currentTarget.style.borderColor=clr;}}
            onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,.07)';e.currentTarget.style.borderColor=clr+'44';}}>
            <div style={{display:'flex',alignItems:'center',gap:14}}>
              <div style={{fontSize:32}}>{emoji}</div>
              <div>
                <div style={{color:clr,fontFamily:PF,fontSize:20,fontWeight:700}}>{label}</div>
                <div style={{color:CHAMP,fontSize:12,fontFamily:INT,opacity:.7,marginTop:2}}>{desc}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  if(screen==='win') return(
    <div style={{minHeight:600,display:'flex',flexDirection:'column',background:`linear-gradient(160deg,${PLUMDK},${PLUM})`}}>
      <TopBar onBack={back} title="🔢 Sudoku"/>
      <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',padding:24}}>
        <div style={{background:`linear-gradient(135deg,${PLUMDK},${PLUM})`,border:`2px solid ${GOLD}`,
          borderRadius:26,padding:'38px 32px',textAlign:'center',maxWidth:300,boxShadow:'0 20px 60px rgba(0,0,0,.6)'}}>
          <div style={{fontSize:54,marginBottom:10}}>🧠✨</div>
          <div style={{color:GOLD,fontFamily:PF,fontSize:26,fontWeight:900,marginBottom:6}}>Puzzle Solved!</div>
          <div style={{color:CHAMP,fontSize:14,fontFamily:INT,marginBottom:4,opacity:.8}}>⏱ Time: {fmt(time)}</div>
          <div style={{color:CHAMP,fontSize:13,fontFamily:INT,marginBottom:24,opacity:.55,textTransform:'capitalize'}}>Difficulty: {diff}</div>
          <button onClick={()=>startGame(diff)} style={btn}>Play Again</button>
          <button onClick={()=>setScreen('select')} style={{background:'transparent',color:CHAMP,border:`1px solid rgba(255,255,255,.2)`,borderRadius:13,padding:'10px 0',fontFamily:INT,fontSize:13,cursor:'pointer',width:'100%'}}>Change Difficulty</button>
        </div>
      </div>
    </div>
  );

  if(screen==='play'&&board) {
    const counts=Array.from({length:9},(_,i)=>board.reduce((s,r)=>s+r.filter(v=>v===i+1).length,0));
    return(
      <div style={{minHeight:600,display:'flex',flexDirection:'column',background:`linear-gradient(160deg,${PLUMDK},${PLUM})`}}>
        <TopBar onBack={()=>setScreen('select')} title="🔢 Sudoku"
          right={<span style={{color:GOLD,fontSize:13,fontFamily:INT,fontWeight:700}}>{fmt(time)}</span>}/>

        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'4px 16px 2px'}}>
          <span style={{color:CHAMP,fontSize:11,fontFamily:INT,opacity:.6,textTransform:'capitalize'}}>{diff}</span>
          <button onClick={()=>startGame(diff)} style={{background:'none',border:`1px solid rgba(255,255,255,.18)`,borderRadius:7,color:CHAMP,fontSize:11,fontFamily:INT,cursor:'pointer',padding:'3px 10px',opacity:.6}}>New Puzzle</button>
        </div>

        {/* Grid */}
        <div style={{display:'flex',justifyContent:'center',padding:'6px 4px 4px'}}>
          <div style={{border:`2.5px solid ${GOLD}88`,borderRadius:6,overflow:'hidden',boxShadow:'0 6px 28px rgba(0,0,0,.5)'}}>
            {board.map((row,r)=>(
              <div key={r} style={{display:'flex',borderBottom:(r+1)%3===0&&r!==8?`2px solid ${GOLD}66`:`1px solid rgba(255,255,255,.1)`}}>
                {row.map((val,c)=>{
                  const isHint=hintCell?.r===r&&hintCell?.c===c;
                  const isGiven=given[r][c];
                  const isSel=sel?.r===r&&sel?.c===c;
                  const isSameN=sel&&board[sel.r]?.[sel.c]!==0&&val!==0&&val===board[sel.r][sel.c];
                  const isRelated=sel&&(sel.r===r||sel.c===c||(Math.floor(sel.r/3)===Math.floor(r/3)&&Math.floor(sel.c/3)===Math.floor(c/3)));
                  // Check mode: show green (correct) or red (wrong) for player entries only
                  const isWrong=checking&&!isGiven&&val!==0&&sol&&val!==sol[r][c];
                  const isRight=checking&&!isGiven&&val!==0&&sol&&val===sol[r][c];
                  let bg='rgba(255,255,255,.04)';
                  if(isHint)bg='rgba(244,196,48,.42)';
                  else if(isWrong)bg='rgba(239,83,80,.22)';
                  else if(isRight)bg='rgba(76,175,80,.22)';
                  else if(isSel)bg='rgba(244,196,48,.32)';
                  else if(isSameN)bg='rgba(244,196,48,.18)';
                  else if(isRelated)bg='rgba(255,255,255,.1)';
                  return(
                    <div key={c} onClick={()=>setSel({r,c})}
                      style={{width:CS,height:CS,display:'flex',alignItems:'center',justifyContent:'center',
                        background:bg,cursor:'pointer',userSelect:'none',transition:'background .08s',
                        borderRight:(c+1)%3===0&&c!==8?`2px solid ${GOLD}66`:`1px solid rgba(255,255,255,.1)`,
                        color:isHint?PLUM:isWrong?'#EF9A9A':isRight?'#A5D6A7':isGiven?GOLD:'#e0e0ff',
                        fontFamily:PF,fontSize:19,fontWeight:isGiven||isHint?700:400,
                        boxSizing:'border-box',boxShadow:isHint?`inset 0 0 0 2px ${GOLD}`:
                          isWrong?'inset 0 0 0 2px #EF5350':isRight?'inset 0 0 0 2px #4CAF50':'none'}}>
                      {isHint?(sol?.[r]?.[c]??''):(val!==0?val:'')}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Number pad */}
        <div style={{display:'flex',justifyContent:'center',padding:'10px 4px 4px',gap:4}}>
          {[1,2,3,4,5,6,7,8,9].map(n=>{
            const full=counts[n-1]>=9;
            return(
              <button key={n} onClick={()=>!full&&enterNum(n)}
                style={{width:CS,height:CS+8,borderRadius:8,
                  background:full?'rgba(255,255,255,.03)':'rgba(255,255,255,.1)',
                  border:`1px solid rgba(255,255,255,.15)`,
                  color:full?'rgba(255,255,255,.2)':'#fff',
                  fontFamily:PF,fontSize:19,fontWeight:700,cursor:full?'default':'pointer'}}
                onMouseEnter={e=>{if(!full)e.currentTarget.style.background='rgba(244,196,48,.28)';}}
                onMouseLeave={e=>{if(!full)e.currentTarget.style.background='rgba(255,255,255,.1)';}}>
                {n}
              </button>
            );
          })}
        </div>
        <div style={{display:'flex',justifyContent:'center',padding:'6px 8px 16px',gap:8}}>
          <button onClick={()=>enterNum(0)} style={{padding:'8px 16px',borderRadius:8,
            background:'rgba(239,83,80,.12)',border:`1px solid rgba(239,83,80,.25)`,
            color:'#EF9A9A',fontFamily:INT,fontSize:13,cursor:'pointer'}}>⌫ Erase</button>
          <button onClick={checkAnswers} disabled={checking} style={{padding:'8px 16px',borderRadius:8,
            background:checking?'rgba(76,175,80,.15)':'rgba(76,175,80,.25)',
            border:`1px solid rgba(76,175,80,.4)`,
            color:checking?'#A5D6A7':'#81C784',fontFamily:PF,fontWeight:700,fontSize:13,
            cursor:checking?'default':'pointer',transition:'all .2s'}}>
            {checking?'✓ Checking...':'✓ Check'}
          </button>
          <button onClick={giveHint} disabled={!!hintCell} style={{padding:'8px 16px',borderRadius:8,
            background:hintCell?'rgba(255,255,255,.05)':GOLD,border:'none',
            color:hintCell?MUTED:PLUM,fontFamily:PF,fontWeight:700,fontSize:13,
            cursor:hintCell?'default':'pointer',opacity:hintCell?.5:1,transition:'all .2s'}}>
            💡 Hint
          </button>
        </div>
      </div>
    );
  }
  return null;
}

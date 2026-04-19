const ae={FLYING:120,GATHERING:300,FORMED:300,DISPERSING:100},ht=["FLYING","GATHERING","FORMED","DISPERSING"];function Pe(ne,o,_t,oe){let M=window.innerWidth,v=window.innerHeight;const P=Math.min(window.devicePixelRatio,2),g=Math.min(M,v)*.7,k=M*.28,dt=t=>(t/360-.5)*g+k,ft=t=>-(t/360-.5)*g,h=new o.WebGLRenderer({canvas:ne,antialias:!1});h.outputColorSpace="srgb-linear",h.setClearColor(new o.Color(1580074),1),h.clear(),h.setPixelRatio(P),h.setSize(M,v),h.autoClear=!1;function Pt(){return new o.WebGLRenderTarget(M*P,v*P,{minFilter:o.LinearFilter,magFilter:o.LinearFilter,format:o.RGBAFormat})}let y=Pt(),w=Pt();const At=new o.OrthographicCamera(-1,1,1,-1,0,1),et=new o.PlaneGeometry(2,2),ut=new o.MeshBasicMaterial({map:w.texture,depthTest:!1}),bt=new o.Scene;bt.add(new o.Mesh(et,ut));const Mt=new o.MeshBasicMaterial({color:1580074,transparent:!0,opacity:.12,depthTest:!1,depthWrite:!1}),Nt=new o.Scene;Nt.add(new o.Mesh(et,Mt));const vt=new o.MeshBasicMaterial({map:y.texture,depthTest:!1}),Gt=new o.Scene;Gt.add(new o.Mesh(et,vt));const Lt=new o.Color(1580074);h.setClearColor(Lt,1),h.setRenderTarget(y),h.clear(),h.setRenderTarget(w),h.clear(),h.setRenderTarget(null),h.clear();const C=new o.OrthographicCamera(-M/2,M/2,v/2,-v/2,.1,2e3);C.position.set(0,0,500);const Y=new o.Scene,Tt=new o.Scene;let W=[],Ft=0,I=[];const q=[[],[],[],[]];let V=0;function X(){const t=[],a=g/2;for(let s=-a;s<=a;s+=5)for(let c=-a;c<=a;c+=5)c*c+s*s<=a*a&&t.push({x:c+k,y:s});return t}function at(){I.length&&mt.forEach((t,a)=>{const s=I[a%I.length];t.tx=s.x,t.ty=s.y,t.tz=0})}function se(t){const a=document.createElement("canvas");a.width=a.height=360;const s=a.getContext("2d");s.drawImage(t,0,0,360,360);let c=[];try{const{data:f}=s.getImageData(0,0,360,360),l=360,e=(r,i)=>f[(i*l+r)*4+3],n=(r,i)=>{const A=(i*l+r)*4;return f[A+3]<30?-1:f[A]*.299+f[A+1]*.587+f[A+2]*.114},d=new Float32Array(l*l),m=new Float32Array(l*l),x=new Float32Array(l*l);for(let r=1;r<l-1;r++)for(let i=1;i<l-1;i++){if(e(i,r)<30)continue;const A=[n(i-1,r-1),n(i,r-1),n(i+1,r-1),n(i-1,r),n(i+1,r),n(i-1,r+1),n(i,r+1),n(i+1,r+1)];if(A.some(L=>L<0))continue;const p=-A[0]-2*A[3]-A[5]+A[2]+2*A[4]+A[7],S=-A[0]-2*A[1]-A[2]+A[5]+2*A[6]+A[7],G=Math.sqrt(p*p+S*S);d[r*l+i]=G,m[r*l+i]=p,x[r*l+i]=S}for(let r=1;r<l-1;r++)for(let i=1;i<l-1;i++){if(e(i,r)>=30&&(e(i-1,r)<30||e(i+1,r)<30||e(i,r-1)<30||e(i,r+1)<30)){c.push({x:dt(i),y:ft(r)}),c.push({x:dt(i),y:ft(r)});continue}const p=d[r*l+i];if(p<26)continue;const S=Math.sqrt(m[r*l+i]**2+x[r*l+i]**2)||1,G=m[r*l+i]/S,L=x[r*l+i]/S,$=Math.round(i+G),H=Math.round(r+L),tt=Math.round(i-G),Ct=Math.round(r-L),we=$>=0&&$<l&&H>=0&&H<l?d[H*l+$]:0,Ce=tt>=0&&tt<l&&Ct>=0&&Ct<l?d[Ct*l+tt]:0;p>=we&&p>=Ce&&c.push({x:dt(i),y:ft(r)})}}catch{return X()}if(c.length<80)return X();for(let f=c.length-1;f>0;f--){const l=Math.floor(Math.random()*(f+1));[c[f],c[l]]=[c[l],c[f]]}return c}const re=["/assets/image/logo-v4.png","/assets/image/logo-v3.png","/assets/image/logo-v2.png","/assets/image/logo-v5.png"];(_t.length>0?_t:re).forEach((t,a)=>{const s=new Image;s.onload=()=>{q[a]=se(s),a===0&&(I=q[0],V=1,at())},s.onerror=()=>{q[a]=X()},s.src=t});function ie(){const t=Math.random()*Math.PI*2,a=.15+Math.random()*.35,s=I.length?I[Math.floor(Math.random()*I.length)]:{x:0,y:0};return{x:(Math.random()-.5)*M,y:(Math.random()-.5)*v,z:(Math.random()-.5)*300,vx:Math.cos(t)*a,vy:Math.sin(t)*a,vz:(Math.random()-.5)*.3,tx:s.x,ty:s.y,tz:0,spd:5+Math.random()*6,sz:.35+Math.random()*.25}}I=X(),V=0;const mt=Array.from({length:2800},ie);at();const xt=Array.from({length:80},()=>{const t=(Math.random()-.5)*M*1.3,a=(Math.random()-.5)*v*1.3;return{x:t,y:a,ox:t,oy:a,vx:0,vy:0,z:-300+Math.random()*200,radius:1+Math.random()*1.5,alpha:.3+Math.random()*.45,phase:Math.random()*Math.PI*2}}),nt=new Float32Array(2800*3),Ot=new Float32Array(2800),T=new Float32Array(2800).fill(1),F=new o.BufferGeometry;F.setAttribute("position",new o.BufferAttribute(nt,3)),F.setAttribute("aSize",new o.BufferAttribute(Ot,1)),F.setAttribute("aAlpha",new o.BufferAttribute(T,1));const gt=new o.ShaderMaterial({uniforms:{uPhaseT:{value:0},uDPR:{value:P}},vertexShader:`
      attribute float aSize;
      attribute float aAlpha;
      uniform float uDPR;
      varying float vAlpha;

      void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

        // 奥行きによるサイズ補正（HiDPI 対応）
        float depth = 1.0 + position.z / 350.0;
        gl_PointSize = max(0.5, aSize * clamp(depth, 0.15, 2.5)) * uDPR;
        vAlpha = aAlpha;
      }
    `,fragmentShader:`
      uniform float uPhaseT;
      varying float vAlpha;

      void main() {
        // FLYING フェーズは uPhaseT=-1 で渡される → パーティクル不可視
        if (uPhaseT < 0.0) discard;
        // 個別 alpha が 0 に近い場合は描画スキップ（GATHERING 中の遠距離パーティクル）
        if (vAlpha < 0.01) discard;

        vec2 uv = gl_PointCoord - 0.5;
        float r = length(uv);
        if (r > 0.5) discard;

        // フェーズ別カラー定義（サイトのアクセントカラー #00e5ff に調和する碧・翠系）
        vec3 jade    = vec3(0.20, 1.00, 0.65); // GATHERING：翠 #33ffa6
        vec3 emerald = vec3(0.00, 1.00, 0.55); // FORMED センター：エメラルド #00ff8c

        vec3  col;
        float alpha;

        if (uPhaseT >= 2.0) {
          // FORMED：エメラルドセンター、翠エッジ
          col   = r < 0.22 ? emerald : jade;
          alpha = r < 0.22 ? 1.00 : 0.95;
        } else {
          // GATHERING：目標に近いものだけ表示（vAlpha で距離フェードイン）
          col   = jade;
          alpha = 0.95;
        }

        gl_FragColor = vec4(col, alpha * vAlpha);
      }
    `,transparent:!0,blending:o.AdditiveBlending,depthTest:!1,depthWrite:!1}),le=new o.Points(F,gt);Y.add(le);const O=new Float32Array(2800*6),z=new Float32Array(2800*6),E=new Float32Array(2800*2),B=new o.BufferGeometry;B.setAttribute("position",new o.BufferAttribute(O,3)),B.setAttribute("aColor",new o.BufferAttribute(z,3)),B.setAttribute("aAlpha",new o.BufferAttribute(E,1));const zt=new o.ShaderMaterial({vertexShader:`
      attribute vec3  aColor;
      attribute float aAlpha;
      varying   vec3  vColor;
      varying   float vAlpha;

      void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        vColor = aColor;
        vAlpha = aAlpha;
      }
    `,fragmentShader:`
      varying vec3  vColor;
      varying float vAlpha;

      void main() {
        gl_FragColor = vec4(vColor, vAlpha);
      }
    `,transparent:!0,blending:o.AdditiveBlending,depthTest:!1,depthWrite:!1}),ce=new o.LineSegments(B,zt);Y.add(ce);const ot=new Float32Array(240),Bt=new Float32Array(80),Dt=new Float32Array(80),D=new o.BufferGeometry;D.setAttribute("position",new o.BufferAttribute(ot,3)),D.setAttribute("aSize",new o.BufferAttribute(Bt,1)),D.setAttribute("aAlpha",new o.BufferAttribute(Dt,1));const Rt=new o.ShaderMaterial({uniforms:{uDPR:{value:P}},vertexShader:`
      attribute float aSize;
      attribute float aAlpha;
      uniform   float uDPR;
      varying   float vAlpha;

      void main() {
        gl_Position  = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = aSize * uDPR;
        vAlpha       = aAlpha;
      }
    `,fragmentShader:`
      varying float vAlpha;

      void main() {
        vec2  uv = gl_PointCoord - 0.5;
        float r  = length(uv);
        if (r > 0.5) discard;
        float glow = 1.0 - r * 2.0;
        gl_FragColor = vec4(0.7, 0.9, 1.0, vAlpha * glow * glow);
      }
    `,transparent:!0,blending:o.AdditiveBlending,depthTest:!1,depthWrite:!1}),he=new o.Points(D,Rt);Y.add(he);const yt=48,de=8,st=new Float32Array(yt*3);for(let t=0;t<yt;t++){const a=t/yt*Math.PI*2;st[t*3]=Math.cos(a),st[t*3+1]=Math.sin(a),st[t*3+2]=0}const It=Array.from({length:de},()=>{const t=new o.BufferGeometry;t.setAttribute("position",new o.BufferAttribute(st.slice(),3));const a=new o.LineBasicMaterial({color:new o.Color(3407782),transparent:!0,opacity:0,blending:o.AdditiveBlending,depthTest:!1,depthWrite:!1}),s=new o.LineLoop(t,a);return s.visible=!1,Y.add(s),{mesh:s,mat:a,r:0,maxR:100,active:!1}});function fe(t,a){const s=It.find(c=>!c.active);s&&(s.r=0,s.maxR=60+Math.random()*80,s.mesh.position.set(t,a,20),s.mesh.visible=!0,s.active=!0)}const Ut=t=>{const a=t.clientX-M/2,s=v/2-t.clientY;fe(a,s)};window.addEventListener("click",Ut,{passive:!0});const R=Math.round(Math.min(M,v)/28),b=Math.ceil(M/R)+1,_=Math.ceil(v/R)+1,N=b*_,U=Math.max(3,Math.floor(Math.min(b,_)*.12));let kt=Math.floor(b/2),Wt=Math.floor(_/2),pt=0;const K=new Float32Array(N),Yt=new Float32Array(N),rt=new Float32Array(N),Vt=new Float32Array(N),Zt=new Float32Array(N);for(let t=0;t<N;t++)Zt[t]=t;function jt(t,a){kt=Math.max(U,Math.min(b-1-U,t)),Wt=Math.max(U,Math.min(_-1-U,a));const s=Math.sqrt(b**2+_**2);for(let c=0;c<_;c++)for(let f=0;f<b;f++){const l=c*b+f,e=f-kt,n=c-Wt,d=Math.max(Math.abs(e),Math.abs(n))<=U&&(n===0||e===0||Math.abs(e)===Math.abs(n));rt[l]=d?1:0,Yt[l]=Math.sqrt(e*e+n*n)/s,Vt[l]=.56}Et.needsUpdate=!0,Kt.needsUpdate=!0}const Z=new o.PlaneGeometry(R-2,R-2),qt=new o.ShaderMaterial({vertexShader:`
      attribute float aFlipAngle;
      attribute float aIsAsterisk;
      attribute float aAlpha;
      attribute float aTileIdx;
      varying   float vIsAsterisk;
      varying   float vAlpha;
      varying   float vCosA;    // fragment でフェード計算するために渡す
      varying   float vTileIdx;

      void main() {
        // ローカル Y 軸周りにフリップ（PlaneGeometry の x 方向を回転）
        float cosA   = cos(aFlipAngle);
        float sinA   = sin(aFlipAngle);
        vec3  pos    = vec3(position.x * cosA, position.y, -position.x * sinA);
        gl_Position  = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(pos, 1.0);
        vIsAsterisk  = aIsAsterisk;
        vAlpha       = aAlpha;
        vCosA        = cosA;
        vTileIdx     = aTileIdx;
      }
    `,fragmentShader:`
      varying float vIsAsterisk;
      varying float vAlpha;
      varying float vCosA;
      varying float vTileIdx;

      void main() {
        // cosA > 0 → 表面。1 - smoothstep(lo, hi, x) で 90° 付近をなめらかにフェード。
        // edge0 < edge1 を守らないと GLSL 未定義動作でちらつきの原因になる。
        float faceMask = 1.0 - smoothstep(-0.12, 0.0, vCosA); // cosA<-0.12→1, cosA>0→0
        if (faceMask < 0.01) discard;

        float alpha;
        vec3  col;
        if (vIsAsterisk > 0.5) {
          // アスタリスクタイル：明るいシアン白で発光感を演出（AdditiveBlending で自然にグロー）
          col   = vec3(0.75, 0.97, 1.0);
          alpha = 0.55 * vAlpha * faceMask;
        } else {
          // バイナリ風：インデックスをハッシュして 0/1 の濃淡（jade グリーン）
          col         = vec3(0.20, 1.00, 0.65);
          float h     = fract(sin(vTileIdx * 127.1 + 43.0) * 43758.5);
          alpha       = (h > 0.5 ? 0.20 : 0.08) * vAlpha * faceMask;
        }
        gl_FragColor = vec4(col, alpha);
      }
    `,transparent:!0,blending:o.AdditiveBlending,depthTest:!1,depthWrite:!1,side:o.DoubleSide}),St=new o.InstancedMesh(Z,qt,N),Xt=new o.Matrix4;for(let t=0;t<_;t++)for(let a=0;a<b;a++){const s=t*b+a,c=(a+.5)*R-M/2,f=v/2-(t+.5)*R;Xt.setPosition(c,f,-80),St.setMatrixAt(s,Xt)}St.instanceMatrix.needsUpdate=!0,Tt.add(St);const it=new o.InstancedBufferAttribute(K,1),Et=new o.InstancedBufferAttribute(rt,1),Kt=new o.InstancedBufferAttribute(Vt,1),Ae=new o.InstancedBufferAttribute(Zt,1);Z.setAttribute("aFlipAngle",it),Z.setAttribute("aIsAsterisk",Et),Z.setAttribute("aAlpha",Kt),Z.setAttribute("aTileIdx",Ae);const ue=k-g*.5,Jt=Math.max(U+1,Math.floor((ue-R*(U+2)+M/2)/R)),Qt=U+1,$t=(Jt+Qt)/2,Me=(Jt-Qt)/2;jt(Math.floor($t),Math.floor(_/2)),K.fill(Math.PI),it.needsUpdate=!0;let lt="HOLD",j=0;const Ht=70,te=18,ve=150;let ct=ht.indexOf("GATHERING"),J=0,u="GATHERING";function me(){if(u==="FLYING"&&I.length===0&&(I=X(),V=0,at()),u==="DISPERSING"?ct=ht.indexOf("GATHERING"):ct=(ct+1)%ht.length,u==="FORMED"&&(W=[]),u=ht[ct],J=0,u==="GATHERING"){const t=q[V];t&&t.length>0&&(I=t,V=(V+1)%q.length,at())}u==="FLYING"&&mt.forEach(t=>{const a=Math.random()*Math.PI*2,s=.1+Math.random()*.3;t.vx=Math.cos(a)*s,t.vy=Math.sin(a)*s,t.x=(Math.random()-.5)*M,t.y=(Math.random()-.5)*v,t.z=(Math.random()-.5)*300,t.vz=(Math.random()-.5)*.3})}function xe(t){t.x+=(t.tx-t.x)*.06,t.y+=(t.ty-t.y)*.06,t.z+=(0-t.z)*.06}function ge(t,a){const s=.04+a*.08,c=t.x,f=t.y,l=t.tx-t.x,e=t.ty-t.y,n=Math.hypot(l,e)||1,d=Math.max(0,1-a*1.5)*.12,m=-e/n,x=l/n;t.x+=(t.tx-t.x)*s+m*Math.min(n,80)*d,t.y+=(t.ty-t.y)*s+x*Math.min(n,80)*d,t.z+=(t.tz-t.z)*s,t.vx=t.x-c,t.vy=t.y-f}function ye(t,a){const s=t.tx-t.x,c=t.ty-t.y,f=t.tz-t.z,l=Math.hypot(s,c,f)||1,e=Math.min(l*.22,4),n=(t.tx*.07+t.ty*.05)%(Math.PI*2),d=Math.sin(a*.04+n)*.8,m=a*.008+n,x=Math.cos(m)*.02,r=Math.sin(m)*.02;t.vx+=(s/l*(e+d)-t.vx)*.18+x,t.vy+=(c/l*(e+d)-t.vy)*.18+r,t.vz+=(f/l*e-t.vz)*.18,t.vx+=(Math.random()-.5)*.5,t.vy+=(Math.random()-.5)*.5,t.x+=t.vx,t.y+=t.vy,t.z+=t.vz}function Ie(t,a){if(a<.18){const c=Math.pow(a/.18,2)*7;t.vx+=(Math.random()-.5)*c,t.vy+=(Math.random()-.5)*c,t.vz+=(Math.random()-.5)*c*.3,t.vx*=.84,t.vy*=.84,t.vz*=.84}else{const c=(a-.18)/.8200000000000001,f=t.tx-k,l=t.ty,e=Math.atan2(l,f)+(Math.random()-.5)*1.1,n=t.spd*(1.4+c*2),d=.09*(1+c*3);t.vx+=(Math.cos(e)*n-t.vx)*d,t.vy+=(Math.sin(e)*n-t.vy)*d,t.vz+=((Math.random()-.5)*t.spd*.5-t.vz)*.07}t.x+=t.vx,t.y+=t.vy,t.z+=t.vz}function pe(t,a,s,c){const e=Math.min(s*2.2,36),n=s||1,d=t.vx/n,m=t.vy/n,x=t.vz/n,r=.2*c,i=.9+.1*c,A=1-.35*c;O[a*6]=t.x-d*e,O[a*6+1]=t.y-m*e,O[a*6+2]=t.z-x*e,z[a*6]=r,z[a*6+1]=i,z[a*6+2]=A,E[a*2]=0,O[a*6+3]=t.x,O[a*6+4]=t.y,O[a*6+5]=t.z,z[a*6+3]=1,z[a*6+4]=1,z[a*6+5]=1,E[a*2+1]=.82}function Se(t){for(let a=0;a<6;a++)O[t*6+a]=0,z[t*6+a]=0;E[t*2]=0,E[t*2+1]=0}let Q=0,wt=0;(function t(){wt=requestAnimationFrame(t),oe(wt),Q++,J++,J>=ae[u]&&me();const a=J/ae[u];(u==="FORMED"||u==="DISPERSING")&&J===0&&(h.setRenderTarget(y),h.clear(),h.setRenderTarget(w),h.clear(),h.setRenderTarget(null)),Mt.opacity=u==="GATHERING"?.28:u==="DISPERSING"?.22:.12,C.position.x=0,C.position.y=0;const s=u==="FORMED"?2:u==="GATHERING"?a:u==="DISPERSING"?2-a:-1;gt.uniforms.uPhaseT.value=s,xt.forEach((e,n)=>{e.vx+=(e.ox-e.x)*.02,e.vy+=(e.oy-e.y)*.02,e.vx*=.88,e.vy*=.88,e.x+=e.vx,e.y+=e.vy;const d=e.alpha*(.5+.5*Math.sin(Q*.016+e.phase));ot[n*3]=e.x,ot[n*3+1]=e.y,ot[n*3+2]=e.z,Bt[n]=e.radius*2,Dt[n]=d}),D.attributes.position.needsUpdate=!0,D.attributes.aSize.needsUpdate=!0,D.attributes.aAlpha.needsUpdate=!0,It.forEach(e=>{if(!e.active)return;e.r+=.9;const n=e.r/e.maxR;e.mat.opacity=.55*Math.pow(1-n,1.5),e.mesh.scale.setScalar(e.r),e.r>=e.maxR&&(e.active=!1,e.mesh.visible=!1,e.mat.opacity=0)}),j++;const c=lt;if(c==="HOLD"&&j>ve){pt+=.8;const e=Math.floor($t+Math.sin(pt)*Me),n=Math.floor(_/2+Math.cos(pt*.7)*_*.3);jt(e,n);for(let d=0;d<N;d++)K[d]=rt[d]>.5?0:Math.PI;it.needsUpdate=!0,lt="WAVE_IN",j=0}else c==="WAVE_IN"&&j>Ht+te&&(lt="HOLD",j=0);if(lt==="WAVE_IN"){let e=!1;for(let n=0;n<N;n++)if(rt[n]>.5&&K[n]<Math.PI){const d=Math.max(0,Math.min(1,(j-Yt[n]*Ht)/te));K[n]=d*Math.PI,e=!0}e&&(it.needsUpdate=!0)}u==="FORMED"&&Q>=Ft&&W.length<5&&(W.push({x:(Math.random()-.5)*M,y:(Math.random()-.5)*v,strength:.8+Math.random()*.7}),Ft=Q+18+Math.floor(Math.random()*18)),W.length>0&&(xt.forEach(e=>{W.forEach(n=>{const d=e.x-n.x,m=e.y-n.y,x=Math.hypot(d,m)||1,r=Math.min(n.strength*40/(x*.03+1),5);e.vx+=d/x*r,e.vy+=m/x*r})}),W=W.filter(e=>(e.strength*=.97,e.strength>.05)));const f=u==="GATHERING"||u==="DISPERSING",l=1.5;mt.forEach((e,n)=>{u==="FLYING"?xe(e):u==="GATHERING"?ge(e,a):u==="FORMED"?ye(e,Q):Ie(e,a);const d=Math.hypot(e.vx,e.vy);nt[n*3]=e.x,nt[n*3+1]=e.y,nt[n*3+2]=e.z,Ot[n]=e.sz*4.3;let m=!0;if(u==="GATHERING"){const r=e.x-e.tx,i=e.y-e.ty,A=Math.sqrt(r*r+i*i),p=Math.max(0,1-a*1.5),S=Math.min(1,Math.max(0,1-A/(g*.2)))*p,G=e.x-k,L=e.y,$=Math.sqrt(G*G+L*L),H=g*.48*a,tt=Math.min(1,Math.max(0,(H-$)/(g*.06)));T[n]=Math.max(S,tt),m=T[n]>.01}else if(u==="FORMED"){const r=e.x-k,i=e.y,A=Math.sqrt(r*r+i*i);T[n]=Math.min(1,Math.max(0,(g*.48-A)/(g*.06))),m=T[n]>.01}else if(u==="DISPERSING"){const r=e.x-k,i=e.y,A=Math.sqrt(r*r+i*i),p=Math.min(1,Math.max(0,(g*.48-A)/(g*.06))),S=Math.max(0,1-a*5),G=Math.max(p*S,1-S),L=a<.7?1:Math.max(0,1-(a-.7)/.3);T[n]=G*L,m=T[n]>.01}else T[n]=1;const x=u==="GATHERING"?a:u==="DISPERSING"?1-a:0;f&&d>l&&m?pe(e,n,d,x):Se(n)}),F.attributes.position.needsUpdate=!0,F.attributes.aSize.needsUpdate=!0,F.attributes.aAlpha.needsUpdate=!0,B.attributes.position.needsUpdate=!0,B.attributes.aColor.needsUpdate=!0,B.attributes.aAlpha.needsUpdate=!0,h.setRenderTarget(y),h.clear(),ut.map=w.texture,h.render(bt,At),h.render(Nt,At),h.render(Y,C),h.setRenderTarget(null),h.clear(),vt.map=y.texture,h.render(Gt,At),h.render(Tt,C),[y,w]=[w,y]})();const ee=()=>{M=window.innerWidth,v=window.innerHeight,h.setSize(M,v),C.left=-M/2,C.right=M/2,C.top=v/2,C.bottom=-v/2,C.updateProjectionMatrix(),y.setSize(M*P,v*P),w.setSize(M*P,v*P),h.setClearColor(Lt,1),h.setRenderTarget(y),h.clear(),h.setRenderTarget(w),h.clear(),h.setRenderTarget(null),xt.forEach(t=>{t.x=(Math.random()-.5)*M*1.3,t.y=(Math.random()-.5)*v*1.3})};return window.addEventListener("resize",ee,{passive:!0}),()=>{cancelAnimationFrame(wt),window.removeEventListener("resize",ee),window.removeEventListener("click",Ut),Z.dispose(),qt.dispose(),It.forEach(t=>{Y.remove(t.mesh),t.mesh.geometry.dispose(),t.mat.dispose()}),et.dispose(),ut.dispose(),Mt.dispose(),vt.dispose(),y.texture.dispose(),w.texture.dispose(),y.dispose(),w.dispose(),h.dispose(),F.dispose(),gt.dispose(),B.dispose(),zt.dispose(),D.dispose(),Rt.dispose()}}export{Pe as initBg};

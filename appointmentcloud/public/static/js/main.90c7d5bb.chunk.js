(this["webpackJsonpappointment-login-app"]=this["webpackJsonpappointment-login-app"]||[]).push([[0],{50:function(e,n,t){},51:function(e,n,t){},80:function(e,n,t){"use strict";t.r(n);var c=t(5),s=t(0),a=t.n(s),r=t(16),o=t.n(r),i=(t(50),t(33),t(51),t(19)),j=t(6),l=t(17),u=t(20),b=t.n(u);var d=function(){var e=Object(s.useState)(),n=Object(l.a)(e,2),t=n[0],a=n[1],r=Object(j.g)();return Object(s.useEffect)((function(){b.a.post("/login/user",{nric:r.state.nric}).then((function(e){console.log(e.data),a(e.data[0].name)})).catch((function(e){console.log(e.response),alert(JSON.stringify(e.response.data))}))})),Object(c.jsxs)("h1",{children:["Welcome ",t,"!"]})},h=t(84),O=t(87),p=t(86),x=t(82);var f=function(){return Object(c.jsx)(O.a,{className:"cardAnnouncement",children:Object(c.jsxs)(p.a,{defaultActiveKey:"mask",children:[Object(c.jsxs)(x.a,{eventKey:"mask",title:"Mask",children:[Object(c.jsx)("br",{}),Object(c.jsx)("p",{children:"Mask Announcements"})]}),Object(c.jsxs)(x.a,{eventKey:"token",title:"TT Token",children:[Object(c.jsx)("br",{}),Object(c.jsx)("p",{children:"Token Announcements"})]}),Object(c.jsxs)(x.a,{eventKey:"vaccine",title:"Vaccine",children:[Object(c.jsx)("br",{}),Object(c.jsx)("p",{children:"Vaccine Announcements"})]})]})})},g=t(85),m=t(83);var v=function(){var e=Object(s.useState)(""),n=Object(l.a)(e,2),t=n[0],a=n[1],r=Object(s.useState)(""),o=Object(l.a)(r,2),i=o[0],u=o[1],d=Object(j.f)();return Object(c.jsxs)(O.a,{className:"cardLogin",children:[Object(c.jsx)("h2",{children:"Login"}),Object(c.jsxs)(g.a,{onSubmit:function(e){return function(e){e.preventDefault(),console.log(e),console.log("NRIC: ",t),console.log("Password: ",i),b.a.post("/login",{nric:t,password:i}).then((function(e){console.log("Login successful!"),d.push("/home",{nric:t})})).catch((function(e){console.log(e.response),404===e.response.status&&alert("User not found!"),401===e.response.status&&alert("Incorrect Password!")}))}(e)},children:[Object(c.jsx)(g.a.Group,{controlId:"nric",className:"text-align-left",children:Object(c.jsx)(g.a.Control,{type:"text",value:t,placeholder:"Singpass ID",onChange:function(e){return a(e.target.value)},required:!0})}),Object(c.jsx)(g.a.Group,{controlId:"password",children:Object(c.jsx)(g.a.Control,{type:"password",value:i,placeholder:"Password",onChange:function(e){return u(e.target.value)},required:!0})}),Object(c.jsx)(m.a,{variant:"primary",type:"submit",children:"Login"})]})]})};var k=function(){return Object(c.jsxs)(h.a,{className:"carddeck",children:[Object(c.jsx)(f,{}),Object(c.jsx)(v,{})]})};var y=function(){return Object(c.jsx)("div",{className:"App",children:Object(c.jsx)(i.a,{children:Object(c.jsxs)(j.c,{children:[Object(c.jsx)(j.a,{path:"/home",children:Object(c.jsx)(d,{})}),Object(c.jsx)(j.a,{path:"/",children:Object(c.jsx)(k,{})})]})})})},w=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,88)).then((function(n){var t=n.getCLS,c=n.getFID,s=n.getFCP,a=n.getLCP,r=n.getTTFB;t(e),c(e),s(e),a(e),r(e)}))};o.a.render(Object(c.jsx)(a.a.StrictMode,{children:Object(c.jsx)(y,{})}),document.getElementById("root")),w()}},[[80,1,2]]]);
//# sourceMappingURL=main.90c7d5bb.chunk.js.map
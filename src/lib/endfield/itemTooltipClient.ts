/** One hover/focus preview shared by every official Gear/Weapon icon.
 * Native popover lives in the top layer, not inside clipped build cards/tables.
 * Astro emits one instance of this script no matter how many ItemIcons render.
 */
let active:HTMLElement|null=null;
let panel:HTMLDivElement|null=null;
let hideHandle:number|undefined;
// Closing by Escape must not immediately re-open the panel via a synthetic
// pointerover caused by removing the top-layer popover on the same target.
let dismissedByEscape:HTMLElement|null=null;
const selector="[data-endfield-item-hover]";

function clearHide(){
  if(hideHandle!==undefined){window.clearTimeout(hideHandle);hideHandle=undefined;}
}
function closePopup(){
  clearHide();
  if(active)active.removeAttribute("aria-describedby");
  if(panel?.matches(":popover-open"))panel.hidePopover();
  active=null;
}
function scheduleHide(){
  clearHide();
  hideHandle=window.setTimeout(closePopup,170);
}
function position(trigger:HTMLElement,popup:HTMLElement){
  const origin=trigger.getBoundingClientRect();
  const margin=10;
  const spaceBelow=window.innerHeight-origin.bottom-margin-9;
  const spaceAbove=origin.top-margin-9;
  // Never cover the hovered icon: otherwise a long data table intercepts
  // its own hover target (and blocks the next icon in the matrix).
  const placeBelow=spaceBelow>=spaceAbove;
  const available=Math.max(64,placeBelow?spaceBelow:spaceAbove);
  popup.style.maxHeight=Math.min(740,Math.floor(available))+"px";
  const bounds=popup.getBoundingClientRect();
  const left=Math.max(margin,Math.min(origin.left,window.innerWidth-bounds.width-margin));
  const top=placeBelow?origin.bottom+9:origin.top-bounds.height-9;
  popup.style.left=left+"px";
  popup.style.top=Math.max(margin,top)+"px";
}
function ensurePanel(host:HTMLElement):HTMLDivElement{
  if(!panel){
    panel=document.createElement("div");
    panel.className="op-item-hover-panel";
    panel.id="op-item-hover-panel";
    panel.setAttribute("popover","manual");
    panel.setAttribute("role","tooltip");
    panel.tabIndex=0;
    panel.addEventListener("pointerenter",clearHide);
    panel.addEventListener("pointerleave",scheduleHide);
    panel.addEventListener("focusin",clearHide);
    panel.addEventListener("focusout",event=>{
      if(!panel?.contains(event.relatedTarget as Node|null)&&event.relatedTarget!==active)scheduleHide();
    });
  }
  if(panel.parentElement!==host){
    if(panel.matches(":popover-open"))panel.hidePopover();
    host.appendChild(panel);
  }
  return panel;
}
function showPopup(trigger:HTMLElement){
  if(dismissedByEscape===trigger)return;
  clearHide();
  if(active===trigger&&panel?.matches(":popover-open")){
    position(trigger,panel);
    return;
  }
  const template=trigger.querySelector<HTMLTemplateElement>("template[data-item-popup-template]");
  if(!template)return;
  closePopup();
  const host=trigger.closest<HTMLDialogElement>("dialog[open]")??document.body;
  const popup=ensurePanel(host);
  popup.replaceChildren(template.content.cloneNode(true));
  active=trigger;
  trigger.setAttribute("aria-describedby",popup.id);
  popup.showPopover();
  position(trigger,popup);
}

document.addEventListener("pointerover",event=>{
  if((event as PointerEvent).pointerType!=="mouse"&&(event as PointerEvent).pointerType!=="pen")return;
  const target=event.target;
  if(!(target instanceof Element))return;
  const trigger=target.closest<HTMLElement>(selector);
  if(trigger){if(!trigger.contains(event.relatedTarget as Node|null))showPopup(trigger);}
  else if(panel?.contains(target))clearHide();
},true);
document.addEventListener("pointerout",event=>{
  const target=event.target;
  if(!(target instanceof Element))return;
  const trigger=target.closest<HTMLElement>(selector);
  if(trigger&&!trigger.contains(event.relatedTarget as Node|null)&&!panel?.contains(event.relatedTarget as Node|null)){
    if(dismissedByEscape===trigger)dismissedByEscape=null;
    scheduleHide();
  }
},true);
document.addEventListener("focusin",event=>{
  const target=event.target;
  if(!(target instanceof Element))return;
  const trigger=target.closest<HTMLElement>(selector);
  if(trigger){dismissedByEscape=null;showPopup(trigger);}
},true);
document.addEventListener("focusout",event=>{
  const target=event.target;
  if(!(target instanceof Element))return;
  const trigger=target.closest<HTMLElement>(selector);
  if(trigger&&!trigger.contains(event.relatedTarget as Node|null)&&!panel?.contains(event.relatedTarget as Node|null))scheduleHide();
},true);
document.addEventListener("click",event=>{
  const target=event.target;
  if(!(target instanceof Element))return;
  const trigger=target.closest<HTMLElement>(selector);
  if(trigger){
    dismissedByEscape=null;
    event.stopPropagation();
    if(active===trigger&&panel?.matches(":popover-open"))closePopup();
    else showPopup(trigger);
  }else if(panel&&!panel.contains(target))closePopup();
},true);
document.addEventListener("keydown",event=>{
  if(event.key==="Escape"&&panel?.matches(":popover-open")){
    // Keep this icon muted until the cursor leaves or it receives a new
    // explicit focus/click; otherwise dismissing can trigger another hover.
    dismissedByEscape=active;
    event.preventDefault();event.stopPropagation();closePopup();
  }
  if((event.key==="Enter"||event.key===" ")&&event.target instanceof Element){
    const trigger=event.target.closest<HTMLElement>(selector);
    if(trigger){event.preventDefault();if(active===trigger&&panel?.matches(":popover-open"))closePopup();else showPopup(trigger);}
  }
},true);
document.addEventListener("scroll",event=>{
  if(panel&&event.target instanceof Node&&panel.contains(event.target))return;
  if(!active||!panel)return;
  // On narrow matrices the browser may scroll the table INTO view in the same
  // gesture as a hover. Keep the preview attached to that icon instead of
  // immediately hiding it due to the scroll event that hover itself caused.
  const rect=active.getBoundingClientRect();
  if(rect.bottom<0||rect.top>window.innerHeight||rect.right<0||rect.left>window.innerWidth)
    closePopup();
  else if(panel.matches(":popover-open"))position(active,panel);
},true);
window.addEventListener("resize",closePopup,{passive:true});

- [incidentsMain](https://aadams-bga.github.io/insideIllinoisJails/incidentsMain/)
- [incidentsFollow](https://aadams-bga.github.io/insideIllinoisJails/incidentsFollow/)
- [inspectionsSummary](https://aadams-bga.github.io/insideIllinoisJails/inspectionsSummary/)
- [inspectionsTimeline](https://aadams-bga.github.io/insideIllinoisJails/inspectionsTimeline/)
- [pepperballsBar](https://aadams-bga.github.io/insideIllinoisJails/pepperballsBar/)
- [cookIncidents](https://aadams-bga.github.io/insideIllinoisJails/cookIncidents/)
- [suicidesProportion](https://aadams-bga.github.io/insideIllinoisJails/suicidesProportion/)
- [mannerAndCause](https://aadams-bga.github.io/insideIllinoisJails/mannerAndCause/)
- [regulatoryModels](https://aadams-bga.github.io/insideIllinoisJails/regulatoryModels/)
- [pepperballMap](https://aadams-bga.github.io/insideIllinoisJails/pepperballMap/)
- [inspectionMap](https://aadams-bga.github.io/insideIllinoisJails/inspectionMap/)
- [inCustodyDeaths](https://aadams-bga.github.io/insideIllinoisJails/inCustodyDeaths/)
- [countyLineTransfer](https://aadams-bga.github.io/insideIllinoisJails/countyLineTransfer/)
- [pepperballScroll](https://aadams-bga.github.io/insideIllinoisJails/pepperballScroll/)
- [pepperballPolicy](https://aadams-bga.github.io/insideIllinoisJails/pepperballPolicy/)
- [cookCountyMannerAndCause](https://aadams-bga.github.io/insideIllinoisJails/cookCountyMannerAndCause/)
- [cookCountyDeaths](https://aadams-bga.github.io/insideIllinoisJails/cookCountyDeaths/)

**Use this as the embed code**
Change id and the slug portion of the src url 

```html
<iframe
  id="incidentsMain"
  src="https://aadams-bga.github.io/insideIllinoisJails/incidentsMain/"
  height="660"
  loading="lazy"
  scrolling="no"
  frameborder="0"
  style="display:block;width:100%;border:0;overflow:hidden"
></iframe>
```

**Put this somewhere on the page**

```html
<script>
(function () {
  function ask() {
    var frames = document.getElementsByTagName("iframe");
    for (var i = 0; i < frames.length; i++) {
      try { frames[i].contentWindow.postMessage({ type: "iap-graphic-request" }, "*"); } catch (e) {}
    }
  }
  window.addEventListener("message", function (e) {
    if (!e.data || e.data.type !== "iap-graphic-height") return;
    var frame = document.getElementById(e.data.id);
    if (frame) frame.style.height = e.data.height + "px";
  });
  ask();
  window.addEventListener("load", ask);
  setTimeout(ask, 500);
  setTimeout(ask, 2000);
})();
</script>
```

**All iframes for reference**

```html
<iframe id="incidentsMain"       src="https://aadams-bga.github.io/insideIllinoisJails/incidentsMain/"       height="660" loading="lazy" scrolling="no" frameborder="0" style="display:block;width:100%;border:0;overflow:hidden"></iframe>
<iframe id="incidentsFollow"     src="https://aadams-bga.github.io/insideIllinoisJails/incidentsFollow/"     height="682" loading="lazy" scrolling="no" frameborder="0" style="display:block;width:100%;border:0;overflow:hidden"></iframe>
<iframe id="inspectionsSummary"  src="https://aadams-bga.github.io/insideIllinoisJails/inspectionsSummary/"  height="788" loading="lazy" scrolling="no" frameborder="0" style="display:block;width:100%;border:0;overflow:hidden"></iframe>
<iframe id="inspectionsTimeline" src="https://aadams-bga.github.io/insideIllinoisJails/inspectionsTimeline/" height="594" loading="lazy" scrolling="no" frameborder="0" style="display:block;width:100%;border:0;overflow:hidden"></iframe>
<iframe id="pepperballsBar"      src="https://aadams-bga.github.io/insideIllinoisJails/pepperballsBar/"      height="574" loading="lazy" scrolling="no" frameborder="0" style="display:block;width:100%;border:0;overflow:hidden"></iframe>
<iframe id="cookIncidents"       src="https://aadams-bga.github.io/insideIllinoisJails/cookIncidents/"       height="675" loading="lazy" scrolling="no" frameborder="0" style="display:block;width:100%;border:0;overflow:hidden"></iframe>
<iframe id="suicidesProportion"  src="https://aadams-bga.github.io/insideIllinoisJails/suicidesProportion/"  height="572" loading="lazy" scrolling="no" frameborder="0" style="display:block;width:100%;border:0;overflow:hidden"></iframe>
<iframe id="mannerAndCause"      src="https://aadams-bga.github.io/insideIllinoisJails/mannerAndCause/"      height="653" loading="lazy" scrolling="no" frameborder="0" style="display:block;width:100%;border:0;overflow:hidden"></iframe>
<iframe id="regulatoryModels"    src="https://aadams-bga.github.io/insideIllinoisJails/regulatoryModels/"    height="668" loading="lazy" scrolling="no" frameborder="0" style="display:block;width:100%;border:0;overflow:hidden"></iframe>
<iframe id="pepperballMap"       src="https://aadams-bga.github.io/insideIllinoisJails/pepperballMap/"       height="780" loading="lazy" scrolling="no" frameborder="0" style="display:block;width:100%;border:0;overflow:hidden"></iframe>
<iframe id="pepperballPolicy"   src="https://aadams-bga.github.io/insideIllinoisJails/pepperballPolicy/"   height="350" loading="lazy" scrolling="no" frameborder="0" style="display:block;width:100%;border:0;overflow:hidden"></iframe>
<iframe id="cookCountyMannerAndCause" src="https://aadams-bga.github.io/insideIllinoisJails/cookCountyMannerAndCause/" height="416" loading="lazy" scrolling="no" frameborder="0" style="display:block;width:100%;border:0;overflow:hidden"></iframe>
<iframe id="cookCountyDeaths"      src="https://aadams-bga.github.io/insideIllinoisJails/cookCountyDeaths/"      height="593" loading="lazy" scrolling="no" frameborder="0" style="display:block;width:100%;border:0;overflow:hidden"></iframe>
<iframe id="inspectionMap"       src="https://aadams-bga.github.io/insideIllinoisJails/inspectionMap/"       height="794" loading="lazy" scrolling="no" frameborder="0" style="display:block;width:100%;border:0;overflow:hidden"></iframe>
<iframe id="inCustodyDeaths"     src="https://aadams-bga.github.io/insideIllinoisJails/inCustodyDeaths/"     height="913" loading="lazy" scrolling="no" frameborder="0" style="display:block;width:100%;border:0;overflow:hidden"></iframe>
<iframe id="countyLineTransfer"  src="https://aadams-bga.github.io/insideIllinoisJails/countyLineTransfer/"  height="940" loading="lazy" scrolling="no" frameborder="0" style="display:block;width:100%;border:0;overflow:hidden"></iframe>
```

**Where the data lives**

Each graphic folder holds the CSV that graphic reads at runtime, named after the folder. The footer's "Download the data" link points at that file, so a reader downloads exactly what they are looking at.

`dataDownload/` is separate. It holds combined datasets for readers who want the whole thing rather than one chart's slice, and no graphic reads from it.

```
incidentsMain/
  index.html              <- fetches incidentsMain.csv at runtime
  incidentsMain.csv       <- the data behind this graphic

inCustodyDeaths/
  index.html
  embed.html              <- fragment version for a custom HTML block
  inCustodyDeaths.csv
  photos/                 <- portraits shown in the popups

pepperballScroll/
  pepperballScroll.css    <- external so edits reach live embeds
  pepperballScroll.js
  pepperballScroll.csv
  embed-external.html     <- paste this one into WordPress

geo/                      <- shared basemaps, used by the three maps
dataDownload/             <- combined datasets for readers, not read by any graphic
```

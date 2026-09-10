# Inside Illinois Jails — graphics

Eight D3 charts and three D3 maps for the Illinois Answers Project jails series.

Each graphic lives in its own directory as `index.html` and is published on GitHub Pages at
`https://aadams-bga.github.io/insideIllinoisJails/<slug>/`. Every page fetches its CSV at
runtime — no data is hard-coded into the HTML.

| Slug | Type | Data |
|---|---|---|
| `incidentsMain` | Line | `incidentsMain.csv` |
| `incidentsFollow` | Line | `incidentsFollow.csv` |
| `inspectionsSummary` | Grouped bar | `inspectionsSummary.csv` |
| `inspectionsTimeline` | Line | `inspectionsTimeline.csv` |
| `pepperballsBar` | Bar | `pepperballsBar.csv` |
| `cookIncidents` | Line | `cookIncidents.csv` |
| `suicidesProportion` | Stacked bar | `suicidesProportion.csv` |
| `mannerAndCause` | Pictograph | `mannerAndCause.csv` |
| `regulatoryModels` | US map | `regulatoryModels.csv` |
| `pepperballMap` | Illinois map | `pepperballMap.csv` |
| `inspectionMap` | Illinois choropleth | `inspectionMap.csv` |

## Embedding

```html
<iframe src="https://aadams-bga.github.io/insideIllinoisJails/incidentsMain/"
        width="100%" height="620" frameborder="0" scrolling="no"></iframe>
```

Pages render on a transparent background and post their height to the parent window:

```js
window.addEventListener("message", function (e) {
  if (e.data && e.data.type === "iap-graphic-height") {
    document.querySelector("#" + e.data.id).height = e.data.height;
  }
});
```

## Basemaps

Both files in `geo/` derive from **U.S. Census Bureau cartographic boundary files**, which are
public domain under [17 U.S.C. §105](https://www.copyright.gov/title17/92chap1.html#105) — free
to use, modify and redistribute with no attribution requirement.

| File | Contents | Provenance |
|---|---|---|
| `geo/us-states-albers.topo.json` | 56 states and territories, plus a nation outline | Verbatim copy of [`us-atlas@3`](https://github.com/topojson/us-atlas) `states-albers-10m.json` (ISC license). Pre-projected to Albers USA with Alaska and Hawaii placed as insets, so it draws with a bare `d3.geoPath()` against a `0 0 975 610` viewBox. |
| `geo/il-counties.topo.json` | 102 Illinois counties, WGS84 | Extracted from [`us-atlas@3`](https://github.com/topojson/us-atlas) `counties-10m.json` by filtering to FIPS prefix `17` and renumbering arcs. Unprojected, drawn with `d3.geoTransverseMercator().rotate([89.5, 0])`. |

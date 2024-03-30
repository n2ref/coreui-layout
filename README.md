# CoreUI Layout

**[DEMO](https://n2ref.github.io/coreui-layout)**


### Install with NPM

`npm install coreui-layout`

### Example usage

```html
<div id="layout-justify-start"></div>
<div id="layout-justify-end"></div>
<div id="layout-justify-center"></div>
<div id="layout-justify-between"></div>
<div id="layout-justify-around"></div>
<div id="layout-justify-evenly"></div>

<script>
    let justifyItems = [
        { "width": 200, "content": "Left" },
        { "content": "Center" },
        { "width": 150, "content": "Right" },
    ];

    CoreUI.layout.create({ justify: "start",   items: justifyItems }).render('layout-justify-start');
    CoreUI.layout.create({ justify: "end",     items: justifyItems }).render('layout-justify-end');
    CoreUI.layout.create({ justify: "center",  items: justifyItems }).render('layout-justify-center');
    CoreUI.layout.create({ justify: "between", items: justifyItems }).render('layout-justify-between');
    CoreUI.layout.create({ justify: "around",  items: justifyItems }).render('layout-justify-around');
    CoreUI.layout.create({ justify: "evenly",  items: justifyItems }).render('layout-justify-evenly');
</script>
```

![Preview](https://raw.githubusercontent.com/n2ref/coreui-layout/master/preview.png) 

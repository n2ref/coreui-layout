document.addEventListener('DOMContentLoaded', function () {

    // Simple
    let layout = CoreUI.layout.create({
        items: [
            { width: 200, content: "Left" },
            { content: "Center" },
            { width: 150, content: "Right" },
        ]
    });
    layout.render('layout-items');


    // Nested
    CoreUI.layout.create({
        items: [
            { width: 200, content: "Left" },
            { content: "Center" },
            { fill: true, content: {
                component: 'coreui.layout',
                items: [
                    { width: 200, content: "Left" },
                    { content: "Center" },
                    { width: 150, content: "Right" },
                ]
            }},
        ]
    }).render('layout-nested');


    // Direction
    let directionItems = [
        { width: 200, content: "Left" },
        { content: "Center" },
        { width: 150, content: "Right" },
    ];

    CoreUI.layout.create({ direction: "row",            items: directionItems }).render('layout-direction-row');
    CoreUI.layout.create({ direction: "row-reverse",    items: directionItems }).render('layout-direction-row-reverse');
    CoreUI.layout.create({ direction: "column",         items: directionItems }).render('layout-direction-column');
    CoreUI.layout.create({ direction: "column-reverse", items: directionItems }).render('layout-direction-column-reverse');




    // Justify
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




    // Align
    let alignItems = [
        { "width": 200, "content": "Left" },
        { "content": "Center" },
        { "width": 150, "content": "Right" },
    ];

    CoreUI.layout.create({ align: "start",    height: 100, items: alignItems }).render('layout-align-start');
    CoreUI.layout.create({ align: "end",      height: 100, items: alignItems }).render('layout-align-end');
    CoreUI.layout.create({ align: "center",   height: 100, items: alignItems }).render('layout-align-center');
    CoreUI.layout.create({ align: "baseline", height: 100, items: alignItems }).render('layout-align-baseline');
    CoreUI.layout.create({ align: "stretch",  height: 100, items: alignItems }).render('layout-align-stretch');



    // Align self
    CoreUI.layout.create({
        align: "stretch",
        height: 100,
        items: [
            { "content": "Left" },
            { "width": 200, "content": "Center", align: "start" },
            { "width": 100, "content": "Right" },
        ]
    }).render('layout-align-self-start');

    CoreUI.layout.create({
        align: "stretch",
        height: 100,
        items: [
            { "content": "Left" },
            { "width": 200, "content": "Center", align: "end" },
            { "width": 100, "content": "Right" },
        ]
    }).render('layout-align-self-end');

    CoreUI.layout.create({
        align: "stretch",
        height: 100,
        items: [
            { "content": "Left" },
            { "width": 200, "content": "Center", align: "center"},
            { "width": 100, "content": "Right" },
        ]
    }).render('layout-align-self-center');

    CoreUI.layout.create({
        align: "stretch",
        height: 100,
        items: [
            { "content": "Left" },
            { "width": 200, "content": "Center", align: "baseline" },
            { "width": 100, "content": "Right" },
        ]
    }).render('layout-align-self-baseline');

    CoreUI.layout.create({
        align: "stretch",
        height: 100,
        items: [
            { "content": "Left" },
            { "width": 200, "content": "Center", align: "stretch" },
            { "width": 100, "content": "Right" },
        ]
    }).render('layout-align-self-stretch');


    // Fill
    CoreUI.layout.create({
        items: [
            { "width": 200, "content": "Left" },
            { "content": "Center", fill: true},
            { "width": 150, "content": "Right" },
        ]
    }).render('layout-fill');


    // Wrap
    CoreUI.layout.create({
        wrap: "wrap",
        width: 250,
        items: [
            { "width": 200, "content": "Left" },
            { "content": "Center"},
            { "width": 150, "content": "Right" },
        ]
    }).render('layout-wrap-simple');

    CoreUI.layout.create({
        wrap: "nowrap",
        width: 250,
        items: [
            { "content": "Flex item" },
            { "content": "Flex item" },
            { "content": "Flex item" },
            { "content": "Flex item" },
            { "content": "Flex item" },
            { "content": "Flex item" },
            { "content": "Flex item" },
        ]
    }).render('layout-nowrap');

    CoreUI.layout.create({
        wrap: "wrap",
        items: [
            { "content": "Flex item 1" },
            { "content": "Flex item 2" },
            { "content": "Flex item 3" },
            { "content": "Flex item 4" },
            { "content": "Flex item 5" },
            { "content": "Flex item 6" },
            { "content": "Flex item 7" },
            { "content": "Flex item 8" },
            { "content": "Flex item 9" },
            { "content": "Flex item 10" },
            { "content": "Flex item 11" },
            { "content": "Flex item 12" },
        ]
    }).render('layout-wrap');

    CoreUI.layout.create({
        wrap: "wrap-reverse",
        items: [
            { "content": "Flex item 1" },
            { "content": "Flex item 2" },
            { "content": "Flex item 3" },
            { "content": "Flex item 4" },
            { "content": "Flex item 5" },
            { "content": "Flex item 6" },
            { "content": "Flex item 7" },
            { "content": "Flex item 8" },
            { "content": "Flex item 9" },
            { "content": "Flex item 10" },
            { "content": "Flex item 11" },
            { "content": "Flex item 12" },
        ]
    }).render('layout-wrap-reverse');


    // Order
    CoreUI.layout.create({
        items: [
            { order: 3, content: "First flex item" },
            { order: 2, content: "Second flex item" },
            { order: 1, content: "Third flex item" },
        ]
    }).render('layout-order1');

    CoreUI.layout.create({
        items: [
            { order: 1, content: "Flex item 1" },
            { order: 1, content: "Flex item 2" },
            { order: 1, content: "Flex item 3" },
            { order: 0, content: "Flex item 4" },
            { order: 0, content: "Flex item 5" },
            { order: 0, content: "Flex item 6" },
            { order: 2, content: "Flex item 7" },
            { order: 2, content: "Flex item 8" },
            { order: 2, content: "Flex item 9" },
            { order: 2, content: "Flex item 10" },
        ]
    }).render('layout-order2');



    // Size options
    CoreUI.layout.create({
        justify: "start",
        align: "start",
        direction: "row",
        wrap: "wrap",
        items: [
            { "width": 200, "content": "Left" },
            { "content": "Center" },
            { "width": 150, "content": "Right" },
        ],
        sizes: {
            sm: {},
            md: {},
            lg: {},
            xl: {},
            xxl: {
                direction: "column",
                justify: "between",
                align: "start",
                wrap: "nowrap",
            },
        }
    }).render('layout-sizes1');

    CoreUI.layout.create({
        justify: "start",
        align: "start",
        direction: "row",
        wrap: "wrap",
        items: [
            { order: 1, width: 200, content: "Left" },
            { order: 1, content: "Center" },
            {
                content: "Right",
                order: 0,
                width: 150,
                sizes: {
                    sm: {},
                    md: {},
                    lg: {},
                    xl: {},
                    xxl: {
                        align: "start",
                        fill: true,
                        order: 2
                    },
                }
            }
        ]
    }).render('layout-sizes2');


    // Overflow
    CoreUI.layout.create({
        overflow: 'hidden',
        height: 150,
        items: [
            { width: '25%', height: 95, overflow: 'auto',    content: "This is an example of using overflow auto on an element with set width and height dimensions. By design, this content will vertically scroll." },
            { width: '25%', height: 95, overflow: 'hidden',  content: "This is an example of using overflow hidden on an element with set width and height dimensions." },
            { width: '25%', height: 95, overflow: 'visible', content: "This is an example of using overflow visible on an element with set width and height dimensions." },
            { width: '25%', height: 95, overflow: 'scroll',  content: "This is an example of using overflow scroll on an element with set width and height dimensions." },
        ]
    }).render('layout-overflow');


    // All options
    let layoutAll = CoreUI.layout.create({
        id: "layout-all-id",
        justify: "start", // start, end, center, between, around, evenly
        align: "start", // start, end, center, baseline, stretch
        direction: "row", // column, column-reverse, row, row-reverse
        wrap: "wrap", // wrap, nowrap, wrap-reverse
        overflow : "auto", // auto, hidden, visible, scroll
        overflowX : "auto", // auto, hidden, visible, scroll
        overflowY : "auto", // auto, hidden, visible, scroll
        width: 500,
        minWidth: 400,
        maxWidth: 600,
        height: 200,
        minHeight: 100,
        maxHeight: 300,
        gap: 15,
        items: [
            { id: "id-sidebar", content: "Left",   align: "start" },
            { id: "id-content", content: "Center", fill: true },
            {
                id: "id-right_bar",
                align: "stretch",
                content: "Right",
                order: 0,  // 0 - 5
                overflow : "auto", // auto, hidden, visible, scroll
                overflowX : "auto", // auto, hidden, visible, scroll
                overflowY : "auto", // auto, hidden, visible, scroll
                sizes: {
                    sm: {},
                    md: {},
                    lg: {},
                    xl: {},
                    xxl: {
                        align: "end", // start, end, center, baseline, stretch
                        fill: true,
                        order: 2
                    },
                }
            },
        ],
        sizes: {
            sm: {
                direction: "row", // column, column-reverse, row, row-reverse
                justify: "start", // start, end, center, between, around, evenly
                align: "start", // start, end, center, baseline, stretch
                wrap: "wrap", // wrap, nowrap, wrap-reverse
            },
            md: {},
            lg: {},
            xl: {},
            xxl: {},
        }
    });

    let layoutContent = layoutAll.render();
    $('#layout-all').html(layoutContent);
    layoutAll.initEvents();

    layoutAll.setItemContent('id-sidebar', "Set Item Content");


    // Code highlight
    $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
    });
});
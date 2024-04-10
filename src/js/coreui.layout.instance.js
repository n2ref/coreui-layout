import coreuiLayoutUtils   from "./coreui.layout.utils";
import coreuiLayoutPrivate from "./coreui.layout.private";

let coreuiLayoutInstance = {

    _options: {
        id: '',
        justify: "start", // start, end, center, between, around, evenly
        align: "start", // start, end, center, baseline, stretch
        direction: "row", // column, column-reverse, row, row-reverse
        wrap: "wrap", // wrap, nowrap, reverse
        overflow: null, // auto, hidden, visible, scroll
        overflowX: null, // auto, hidden, visible, scroll
        overflowY: null, // auto, hidden, visible, scroll
        width: null,
        minWidth: null,
        maxWidth: null,
        height: null,
        minHeight: null,
        naxHeight: null,
        gap: null,
        items: [],
        sizes: {},
    },
    _item: {
        id: '',
        align: null, // start, end, center, baseline, stretch
        order: null, // 0 - 5
        fill: false,
        overflow: null, // auto, hidden, visible, scroll
        overflowX: null, // auto, hidden, visible, scroll
        overflowY: null, // auto, hidden, visible, scroll
        width: null,
        minWidth: null,
        maxWidth: null,
        height: null,
        minHeight: null,
        naxHeight: null,
        sizes: {},
    },

    _id: '',
    _events: {},


    /**
     * Инициализация
     * @param options
     */
    _init: function (options) {

        this._options = $.extend(true, {}, this._options, options);
        this._id      = this._options.hasOwnProperty('id') && typeof this._options.id === 'string' && this._options.id
            ? this._options.id
            : coreuiLayoutUtils.hashCode();


        let that = this;

        $.each(this._options.items, function (key, item) {

            if (coreuiLayoutUtils.isObject(item)) {
                if ( ! item.hasOwnProperty('id') ||
                    typeof item.id !== 'string' ||
                    ! item.id
                ) {
                    that._options.items[key].id = coreuiLayoutUtils.hashCode();
                }
            }
        });
    },


    /**
     *
     */
    initEvents: function () {

        coreuiLayoutPrivate.trigger(this, 'shown.coreui.layout');
    },


    /**
     *
     * @returns {*}
     */
    getId: function () {
        return this._id;
    },


    /**
     * @param itemId
     * @param content
     */
    setItemContent: function (itemId, content) {

        let container = $('#coreui-layout-' + this.getId() + ' .item-' + itemId);

        if (container[0]) {
            let contents = coreuiLayoutPrivate.renderContent(this, content);
            container.empty();

            $.each(contents, function (key, content) {
                container.append(content);
            });

            coreuiLayoutPrivate.trigger(this, 'show-content.coreui.layout', this, [itemId]);
        }
    },


    /**
     *
     * @param element
     * @returns {*}
     */
    render: function(element) {

        let containerClasses = [];
        let containerStyles  = [];
        let containerItems   = [];

        switch (this._options.direction) {
            case 'row' :            containerClasses.push('flex-row'); break;
            case 'row-reverse' :    containerClasses.push('flex-row-reverse'); break;
            case 'column' :         containerClasses.push('flex-column'); break;
            case 'column-reverse' : containerClasses.push('flex-column-reverse'); break;
        }

        switch (this._options.justify) {
            case 'start' :   containerClasses.push('justify-content-start'); break;
            case 'end' :     containerClasses.push('justify-content-end'); break;
            case 'center' :  containerClasses.push('justify-content-center'); break;
            case 'between' : containerClasses.push('justify-content-between'); break;
            case 'around' :  containerClasses.push('justify-content-around'); break;
            case 'evenly' :  containerClasses.push('justify-content-evenly'); break;
        }

        switch (this._options.align) {
            case 'start' :    containerClasses.push('align-items-start'); break;
            case 'end' :      containerClasses.push('align-items-end'); break;
            case 'center' :   containerClasses.push('align-items-center'); break;
            case 'baseline' : containerClasses.push('align-items-baseline'); break;
            case 'stretch' :  containerClasses.push('align-items-stretch'); break;
        }

        switch (this._options.wrap) {
            case 'wrap' :         containerClasses.push('flex-wrap'); break;
            case 'wrap-reverse' : containerClasses.push('flex-wrap-reverse'); break;
            case 'nowrap' :       containerClasses.push('flex-nowrap'); break;
        }

        switch (this._options.overflow) {
            case 'auto' :    containerClasses.push('overflow-auto'); break;
            case 'hidden' :  containerClasses.push('overflow-hidden'); break;
            case 'visible' : containerClasses.push('overflow-visible'); break;
            case 'scroll' :  containerClasses.push('overflow-scroll'); break;
        }

        switch (this._options.overflowX) {
            case 'auto' :    containerClasses.push('overflow-x-auto'); break;
            case 'hidden' :  containerClasses.push('overflow-x-hidden'); break;
            case 'visible' : containerClasses.push('overflow-x-visible'); break;
            case 'scroll' :  containerClasses.push('overflow-x-scroll'); break;
        }

        switch (this._options.overflowY) {
            case 'auto' :    containerClasses.push('overflow-y-auto'); break;
            case 'hidden' :  containerClasses.push('overflow-y-hidden'); break;
            case 'visible' : containerClasses.push('overflow-y-visible'); break;
            case 'scroll' :  containerClasses.push('overflow-y-scroll'); break;
        }



        if (['number', 'string'].indexOf(typeof this._options.width) >= 0) {
            let unit = typeof this._options.width === 'number' ? 'px' : '';
            containerStyles.push('width:' + this._options.width + unit)
        }
        if (['number', 'string'].indexOf(typeof this._options.minWidth) >= 0) {
            let unit = typeof this._options.minWidth === 'number' ? 'px' : '';
            containerStyles.push('min-width:' + this._options.minWidth + unit)
        }
        if (['number', 'string'].indexOf(typeof this._options.maxWidth) >= 0) {
            let unit = typeof this._options.maxWidth === 'number' ? 'px' : '';
            containerStyles.push('max-width:' + this._options.maxWidth + unit)
        }

        if (['number', 'string'].indexOf(typeof this._options.height) >= 0) {
            let unit = typeof this._options.height === 'number' ? 'px' : '';
            containerStyles.push('height:' + this._options.height + unit)
        }
        if (['number', 'string'].indexOf(typeof this._options.minHeight) >= 0) {
            let unit = typeof this._options.minHeight === 'number' ? 'px' : '';
            containerStyles.push('min-height:' + this._options.minHeight + unit)
        }

        if (['number', 'string'].indexOf(typeof this._options.maxHeight) >= 0) {
            let unit = typeof this._options.maxHeight === 'number' ? 'px' : '';
            containerStyles.push('max-height:' + this._options.maxHeight + unit)
        }

        if (['number', 'string'].indexOf(typeof this._options.gap) >= 0) {
            let unit = typeof this._options.gap === 'number' ? 'px' : '';
            containerStyles.push('gap:' + this._options.gap + unit)
        }

        $.each(this._options.sizes, function (name, size) {
            if (['sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name) >= 0) {

                switch (size.direction) {
                    case 'row' :            containerClasses.push('flex-' + name + '-row'); break;
                    case 'row-reverse' :    containerClasses.push('flex-' + name + '-row-reverse'); break;
                    case 'column' :         containerClasses.push('flex-' + name + '-column'); break;
                    case 'column-reverse' : containerClasses.push('flex-' + name + '-column-reverse'); break;
                }

                switch (size.justify) {
                    case 'start' :   containerClasses.push('justify-content-' + name + '-start'); break;
                    case 'end' :     containerClasses.push('justify-content-' + name + '-end'); break;
                    case 'center' :  containerClasses.push('justify-content-' + name + '-center'); break;
                    case 'between' : containerClasses.push('justify-content-' + name + '-between'); break;
                    case 'around' :  containerClasses.push('justify-content-' + name + '-around'); break;
                    case 'evenly' :  containerClasses.push('justify-content-' + name + '-evenly'); break;
                }

                switch (size.align) {
                    case 'start' :    containerClasses.push('align-items-' + name + '-start'); break;
                    case 'end' :      containerClasses.push('align-items-' + name + '-end'); break;
                    case 'center' :   containerClasses.push('align-items-' + name + '-center'); break;
                    case 'baseline' : containerClasses.push('align-items-' + name + '-baseline'); break;
                    case 'stretch' :  containerClasses.push('align-items-' + name + '-stretch'); break;
                }

                switch (size.wrap) {
                    case 'wrap' :         containerClasses.push('flex-' + name + '-wrap'); break;
                    case 'wrap-reverse' : containerClasses.push('flex-' + name + '-wrap-reverse'); break;
                    case 'nowrap' :       containerClasses.push('flex-' + name + '-nowrap'); break;
                }
            }
        });

        let that         = this;
        let issetColumns = false;

        $.each(this._options.items, function (key, item) {

            let itemClasses = [
                'coreui-layout-item',
                'item-' + item.id
            ];
            let itemStyles      = [];
            let issetItemColumn = false;

            switch (item.align) {
                case 'start' :    itemClasses.push('align-self-start'); break;
                case 'end' :      itemClasses.push('align-self-end'); break;
                case 'center' :   itemClasses.push('align-self-center'); break;
                case 'baseline' : itemClasses.push('align-self-baseline'); break;
                case 'stretch' :  itemClasses.push('align-self-stretch'); break;
            }

            switch (item.overflow) {
                case 'auto' :    itemClasses.push('overflow-auto'); break;
                case 'hidden' :  itemClasses.push('overflow-hidden'); break;
                case 'visible' : itemClasses.push('overflow-visible'); break;
                case 'scroll' :  itemClasses.push('overflow-scroll'); break;
            }

            switch (item.overflowX) {
                case 'auto' :    itemClasses.push('overflow-x-auto'); break;
                case 'hidden' :  itemClasses.push('overflow-x-hidden'); break;
                case 'visible' : itemClasses.push('overflow-x-visible'); break;
                case 'scroll' :  itemClasses.push('overflow-x-scroll'); break;
            }

            switch (item.overflowY) {
                case 'auto' :    itemClasses.push('overflow-y-auto'); break;
                case 'hidden' :  itemClasses.push('overflow-y-hidden'); break;
                case 'visible' : itemClasses.push('overflow-y-visible'); break;
                case 'scroll' :  itemClasses.push('overflow-y-scroll'); break;
            }

            if (item.fill) {
                itemClasses.push('flex-fill')
            }

            if (typeof item.order === 'number') {
                if (item.order < 0) {
                    itemClasses.push('order-0')

                } else if (item.order > 5) {
                    itemClasses.push('order-5')

                } else {
                    itemClasses.push('order-' + item.order)
                }
            }

            if (item.widthColumn) {
                issetColumns    = true;
                issetItemColumn = true;
                itemClasses.push('col-' + item.widthColumn);
            }


            $.each(item.sizes, function (name, size) {
                if (['sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name) >= 0) {
                    switch (size.align) {
                        case 'start' :    itemClasses.push('align-self-' + name + '-start'); break;
                        case 'end' :      itemClasses.push('align-self-' + name + '-end'); break;
                        case 'center' :   itemClasses.push('align-self-' + name + '-center'); break;
                        case 'baseline' : itemClasses.push('align-self-' + name + '-baseline'); break;
                        case 'stretch' :  itemClasses.push('align-self-' + name + '-stretch'); break;
                    }

                    if (size.fill) {
                        itemClasses.push('flex-' + name + '-fill');
                    }

                    if (size.widthColumn) {
                        issetColumns    = true;
                        issetItemColumn = true;
                        itemClasses.push('col-' + name + '-' + size.widthColumn);
                    }

                    if (typeof size.order === 'number') {
                        if (size.order < 0) {
                            itemClasses.push('order-' + name + '-0')

                        } else if (size.order > 5) {
                            itemClasses.push('order-' + name + '-5')

                        } else {
                            itemClasses.push('order-' + name + '-' + size.order)
                        }
                    }
                }
            });



            if (item.width !== undefined) {
                let unit = typeof item.width === 'number' ? 'px' : '';
                itemStyles.push('width:' + item.width + unit)
            }
            if (item.minWidth !== undefined) {
                let unit = typeof item.minWidth === 'number' ? 'px' : '';
                itemStyles.push('min-width:' + item.minWidth + unit)
            }
            if (item.maxWidth !== undefined) {
                let unit = typeof item.maxWidth === 'number' ? 'px' : '';
                itemStyles.push('max-width:' + item.maxWidth + unit)
            }

            if (item.height !== undefined) {
                let unit = typeof item.height === 'number' ? 'px' : '';
                itemStyles.push('height:' + item.height + unit)
            }
            if (item.minHeight ) {
                let unit = typeof item.minHeight === 'number' ? 'px' : '';
                itemStyles.push('min-height:' + item.minHeight + unit)
            }
            if (item.maxHeight !== undefined) {
                let unit = typeof item.maxHeight === 'number' ? 'px' : '';
                itemStyles.push('max-height:' + item.maxHeight + unit)
            }

            if (issetItemColumn) {
                itemClasses.push('col');
            }


            let contents = coreuiLayoutPrivate.renderContent(that, item.content);
            let styles   = itemStyles.length > 0 ? ' style="' + itemStyles.join(';') + '"' : '';

            let itemContent = $('<div class="' + itemClasses.join(' ') + '"' + styles + '></div>');
            $.each(contents, function (name, content) {
                itemContent.append(content);
            });

            containerItems.push(itemContent);
        });


        if (issetColumns) {
            containerClasses.push('row');
        }

        let styles = containerStyles.length > 0 ? ' style="' + containerStyles.join(';') + '"' : '';
        let html   = $(
            '<div id="coreui-layout-' + this.getId() + '" ' +
                 'class="coreui-layout d-flex ' + containerClasses.join(' ') + '"' + styles + '></div>'
        );

        $.each(containerItems, function (name, containerItem) {
            html.append(containerItem);
        });


        if (element === undefined) {
            return html;
        }

        // Dom element
        let domElement = {};

        if (typeof element === 'string') {
            domElement = document.getElementById(element);

            if ( ! domElement) {
                return '';
            }

        } else if (element instanceof HTMLElement) {
            domElement = element;
        }


        $(domElement).html(html);

        this.initEvents();
    },


    /**
     * @param eventName
     * @param callback
     * @param context
     * @param singleExec
     */
    on: function(eventName, callback, context, singleExec) {
        if (typeof this._events[eventName] !== 'object') {
            this._events[eventName] = [];
        }
        this._events[eventName].push({
            context : context || this,
            callback: callback,
            singleExec: !! singleExec,
        });
    }
}

export default coreuiLayoutInstance;
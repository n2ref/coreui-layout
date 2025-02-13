import LayoutUtils from "./layout.utils";

let LayoutPrivate = {

    /**
     * Выполнение события
     * @param {object} layout
     * @param {string} name
     * @param {object|null} context
     * @param {Array} params
     * @private
     */
    trigger: function(layout, name, context, params) {

        params = params || [];

        if (layout._events.hasOwnProperty(name) && layout._events[name].length > 0) {
            for (var i = 0; i < layout._events[name].length; i++) {
                let callback = layout._events[name][i].callback;

                context = layout._events[name][i].context || context;

                callback.apply(context, params);

                if (layout._events[name][i].singleExec) {
                    layout._events[name].splice(i, 1);
                    i--;
                }
            }
        }
    },


    /**
     * Формирование контента
     * @param {object} layout
     * @param {*}      data
     * @returns {Array}
     * @private
     */
    renderContent: function(layout, data) {

        let result = [];

        if (typeof data === 'string') {
            result.push(data);

        } else if (data instanceof Object) {
            if ( ! Array.isArray(data)) {
                data = [ data ];
            }

            for (let i = 0; i < data.length; i++) {
                if (typeof data[i] === 'string') {
                    result.push(data[i]);

                } else if (data[i] instanceof Object &&
                    typeof data[i].render === 'function' &&
                    typeof data[i].initEvents === 'function'
                ) {
                    result.push(data[i].render());

                    layout.on('shown.coreui.layout', data[i].initEvents, data[i], true);

                } else if ( ! Array.isArray(data[i]) &&
                    data[i].hasOwnProperty('component') &&
                    data[i].component.substring(0, 6) === 'coreui'
                ) {
                    let name = data[i].component.split('.')[1];

                    if (CoreUI.hasOwnProperty(name) &&
                        LayoutUtils.isObject(CoreUI[name])
                    ) {
                        let instance = CoreUI[name].create(data[i]);
                        result.push(instance.render());

                        layout.on('shown.coreui.layout', instance.initEvents, instance, true);
                    } else {
                        result.push(JSON.stringify(data[i]));
                    }

                } else {
                    result.push(JSON.stringify(data[i]));
                }
            }
        }

        return result;
    }
}

export default LayoutPrivate;
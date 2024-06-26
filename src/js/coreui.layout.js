import coreuiLayoutInstance from "./coreui.layout.instance";
import coreuiLayoutUtils    from "./coreui.layout.utils";

let coreuiLayout = {

    _instances: {},

    /**
     * @param {object} options
     * @returns {object}
     */
    create: function (options) {

        let instance = $.extend(true, {}, coreuiLayoutInstance);
        instance._init(coreuiLayoutUtils.isObject(options) ? options : {});

        let layoutId = instance.getId();
        this._instances[layoutId] = instance;

        return instance;
    },


    /**
     * @param {string} id
     * @returns {object|null}
     */
    get: function (id) {

        if ( ! this._instances.hasOwnProperty(id)) {
            return null;
        }

        if ( ! $('#coreui-layout-' + this._instances[id])[0]) {
            delete this._instances[id];
            return null;
        }

        return this._instances[id];
    }
}

export default coreuiLayout;
import LayoutInstance from "./layout.instance";
import LayoutUtils    from "./layout.utils";

let Layout = {

    _instances: {},

    /**
     * @param {object} options
     * @returns {LayoutInstance}
     */
    create: function (options) {

        let instance = new LayoutInstance(LayoutUtils.isObject(options) ? options : {});

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

export default Layout;
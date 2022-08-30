export const _clickoutsideI = {
    bind(el, binding, vnode) {
        function documentHandler(e) {
            if (
                e.target.localName === "span" &&
                e.target.parentElement.id === "clickIn"
            ) {
                return false;
            }
            if (
                e.target.id === "clickIn" ||
                e.target.id === "mask" ||
                e.target.id === "screen"
            ) {
                return false;
            }
            if (el.contains(e.target)) {
                return false;
            }
            if (binding.expression) {
                binding.value(e);
            }
        }
        // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
        el.__vueClickOutside__ = documentHandler;
        document.addEventListener("click", documentHandler);
    },
    update() { },
    unbind(el, binding) {
        document.removeEventListener("click", el.__vueClickOutside__);
        delete el.__vueClickOutside__;
    },
};

export const _clickoutsideP = {
    bind(el, binding, vnode) {
        function documentHandler(e) {
            if (
                e.target.id === "province"
            ) {
                return false;
            }
            if (
                e.target.localName === "span" &&
                e.target.parentElement.id === "province"
            ) {
                return false;
            }
            if (el.contains(e.target)) {
                return false;
            }
            if (binding.expression) {
                binding.value(e);
            }
        }
        // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
        el.__vueClickOutside__ = documentHandler;
        document.addEventListener("click", documentHandler);
    },
    update() {
    },
    unbind(el, binding) {
        document.removeEventListener("click", el.__vueClickOutside__);
        delete el.__vueClickOutside__;
    },
};
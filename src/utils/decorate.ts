export const GValidate = (params: string) => {
    return function (target: any, methodName: any, descriptor: any) {
        const oldMethod = descriptor.value;
        descriptor.value = function (...args) {
            (<HTMLFormElement>this.$refs[params]).validate(async valid => {
                if (valid) {
                    oldMethod.apply(this, args)
                } else {
                    return false
                }
            });
        }
        return descriptor
    }
}
import { Message } from 'element-ui'
import { MessageType } from 'element-ui/types/message';
export const GElementUIMessage = (type?: MessageType, message?: string, duration?: number) => {
    return function (target: any, methodName: any, descriptor: any) {
        const oldMethod = descriptor.value;
        descriptor.value = async function (...args) {
            let res = await oldMethod.apply(this, args)
            if (res.code === 0) {
                Message({
                    type: type || 'success',
                    duration: duration || 3000,
                    message: message || '操作成功'
                })
            }
        }
        return descriptor
    }
}

import { MessageBox } from 'element-ui';

export const confirmation = (mes = '确定操作?', tip = '提示') => {
    return function (target, name, descriptor) {
        let oldValue = descriptor.value;
        descriptor.value = function (...args) {
            MessageBox.confirm(mes, tip)
                .then(oldValue.bind(this, ...args))
                .catch(() => { });
        };
        return descriptor;
    }
}
// 防抖
export function debounce(wait) {
    return function (target, name, descriptor) {
        const fn = descriptor.value
        let timer: any = 0
        descriptor.value = function (...args) {
            const _this = this._isVue ? this : target
            clearTimeout(timer)
            timer = setTimeout(() => {
                fn.apply(_this, args)
            }, wait)
        }
    }
}
// 节流
export function throttle(wait) {
    return function (target, name, descriptor) {
        const fn = descriptor.value
        let canRun = true
        descriptor.value = function (...args) {
            const _this = this._isVue ? this : target
            if (!canRun) return
            fn.apply(_this, args)
            canRun = false
            setTimeout(() => {
                canRun = true
            }, wait)
        }
    }
}
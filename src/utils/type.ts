export enum ProjectStatusType { "已创建" = 10, "待审核" = 20, "审核失败" = 21, "融资中" = 30, "发行方取消" = 42, "融资失败" = 41, "计息中" = 40, "完成" = 100, }
export enum DividendType { '次日' = 1, '次周', '次月', '次季', '次半年', '次年', '次2年' }
export enum FundType { '私募股权' = 1 }
export enum ProfitType { '按期返息' = 1 }
export enum ProjectType { '房地产/景区' = 1 }


export function getProjectType(a = '', b = '', c) {
    return ProjectType[c];
}
export function getDividendType(a = '', b = '', c) {
    return DividendType[c];
}
export function getProfitType(a = '', b = '', c) {
    return ProfitType[c];
}
export function getFundType(a = '', b = '', c) {
    return FundType[c];
}
export function getProjectStatusType(a = '', b = '', c) {
    return ProjectStatusType[c];
}

import fd from "./formatDate"
export function formatterTime(a = '', b = '', c) {
    if (c < 10000000000) {
        c = c * 1000
    }
    return c ? fd(c) + ' UTC' : "-";
}
export function noEmpty(a = '', b = '', c) {
    return c ? c : "-";
}
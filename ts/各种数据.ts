/**
 * 获取本地化的月份
 * @param mon Date.getMonth()获取的值，即0为一月，11为二月
 */
function getMonth(mon: number,type='lunar'): string {
    const MON_EN: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const MON_LUNAR: string[] = ["正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "冬", "腊"];

    let monMap = {
        // 农历
        'lunar': MON_LUNAR,
        // 英文
        'En': MON_EN,
        // 中文
        'Zh': []
    }
    let MON_LIST = monMap[type];
    return MON_LIST[mon];
}
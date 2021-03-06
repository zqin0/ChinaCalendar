window.onload = function(){

    var weekend = ["星期天","星期一","星期二","星期三","星期四","星期五","星期六"];
    // var SX = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];
    var chineseDayIndex = new Array(0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072, 240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795, 462224, 483532, 504758)
    var chineseNum = new Array('日', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十');
    var chineseDate = new Array('初', '十', '廿', '卅', '　');

    var date = new Date();
    var weekday = date.getUTCDay();
    var week = weekend[weekday];
    var month = date.getMonth()
    var year = date.getFullYear()
    var day = date.getFullYear().toString()+"-"+(1+date.getMonth()).toString()+"-"+date.getDate().toString();
    // 注意getMonth返回的是0~11即0代表1月,11代表12月
    console.log(date);
    document.getElementById("date").innerHTML = day;
    document.getElementById("weekend").innerHTML = week;
    document.getElementById("shengxiao").innerHTML = getSX(date.getFullYear());
    document.getElementById("time").innerHTML = getTime();
    // setInterval("getTime()",1000);
    // setTimeout(getTime(),1000);
    // createTable();

    createDateSelect()
    getSelectDate();
    document.getElementById("selectYear").addEventListener("change",DaysChange);
    document.getElementById("selectMonth").addEventListener("change",DaysChange);
    // document.getElementById("SD1").innerHTML = 1; 
    createTable();
    // var lengthOfMonth = getDaysOfMonth(year, month)
    // console.log(getFirstWeek(date));
    // console.log(getDaysOfMonth(year,month))
    // var lengthOfMonth = getDaysOfMonth(year,month)
    // var newdate = new Date(2018,02,10)
    // console.log(newdate);
    // console.log(newdate.getDate())
    // var lengthOfMonth = getDaysOfMonth(newdate.getFullYear(),newdate.getMonth())
    // var offset = getFirstWeek(newdate.getFullYear(),newdate.getMonth())
    // var offset = getFirstWeek(year,month);
    // getChineseMonth(year,month);
    showEveryDay(year,month);

}
//创建日期选择器 
function createDateSelect(){

    for(i=1950;i<2051;i++){
        // console.log("success");
        var yearNode = document.createElement("option");
        yearNode.setAttribute("value",i);
        yearNode.innerHTML = i.toString() + "年";

        document.getElementById("selectYear").appendChild(yearNode);
    }
    for(j=1;j<13;j++){
        // console.log("success");
        var monthNode = document.createElement("option");
        monthNode.setAttribute("value",j);
        monthNode.innerHTML = j.toString() + "月"

        document.getElementById("selectMonth").appendChild(monthNode);
    }
}
// 获取生肖函数
function getSX(Year) {
    var SX = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];
    var i , date;
    date = new Date();
    i = (Year - 4 ) % 12;
    var ShengXiao =SX[i];
    return ShengXiao;
}
// setInterval("getTime()",1000);
function getTime(){
    today = new Date();
    var hou = today.getHours();
    var min = today.getMinutes(); //分
    var sec = today.getSeconds(); //秒
    if (sec < 10)
        var sec = "0" + sec;
    if (min < 10)
        var min = "0" + min;
    if (hou < 10)
        var hou = "0" + hou;
    var time = hou + ':' + min + ':' + sec;
    // return time;
    document.getElementById("time").innerHTML = hou + ':' + min + ':' + sec;
    // setInterval("getTime()", 1000);
}
//创建日期表格
function createTable() {
    var Num; //Num计算出日期位置
    var html = "";
    for (i = 0; i < 6; i++) {

        html += '<table class="cal-content"><tr>';

        for (j = 0; j < 7; j++) {
            Num = i * 7 + j;
            html += '<td id="SD' + Num.toString() + '" onclick="addDay(' + Num.toString() + ')" ';
            //周六 周日 假期样式设定
            if (j == 0 || j == 6) {
                html += ' class="weekend"';
            } else {
                html += ' class="sampleDay"';
            }
            html += 'title=""> </td>';
        }

        html += '</tr></table></td></tr><tr><td><table><tr style="text-align:center"> ';
        //农历
        for (j = 0; j < 7; j++) {
            Num = i * 7 + j;
            html += '<td id="LD' + Num.toString() + '" onclick="addDay(' + Num.toString() + ')" class="chinaDay" title=""> </td>';

        }
        html += '</tr></table>';

    }
    //    console.log(html);
    document.getElementById("detail").innerHTML = html;
}
//获取指定年份月份,一个月多少天
function getDaysOfMonth(year,month) {
    var daysOfMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    if(month == 1){
        return ((year % 4 == 0)&&(year % 100 == 0) || (year % 400 == 0))?29 : 28
    }else{
        return daysOfMonth[month];
    }
    

}
// 将每一天的日期写入detail表中
function showEveryDay(year,month){
    var daysOfMonth = getDaysOfMonth(year,month)
    var offset = getFirstWeek(year,month);
    var i,j,id,cid;
    var chineseDayDetail = getChineseMonth(year,month);
    // index = index + 1;
    // console.log(daysOfMonth);
    // 显示上个月末
    getPrevMonthDetial(year,month);

    // 判断是否为本月第一天是否为星期天,如果是的话从第二行开始显示
    if(offset == 0){
        for (i = 0; i < daysOfMonth; i++) {
            id = "SD" + ( offset + 7).toString();
            cid = "LD" + (offset + 7).toString();
            document.getElementById(id).innerHTML = i + 1;
            document.getElementById(cid).innerHTML = transformChinese(chineseDayDetail[i].day);
            offset++;
            // document.getElementById("id").innerText = i + 1;
        }
    }else{
        for (i = 0; i < daysOfMonth; i++) {
            id = "SD" + offset.toString();
            cid = "LD" + offset.toString();
            document.getElementById(id).innerHTML = i + 1;
            document.getElementById(cid).innerHTML = transformChinese(chineseDayDetail[i].day);
            offset++;
            // document.getElementById("id").innerText = i + 1;
        }
    }
    // 显示下个月初
    getNextMonthDetial(year,month);

}
// 计算上个月末
function getPrevMonthDetial(year,month) {
    var index;
    var daysOfPrevMonth;
    var offset = getFirstWeek(year,month);
    var firstday;
    daysOfPrevMonth = getDaysOfMonth(year,month - 1);
    if(month == 0){
        firstday = 31 - offset + 1;
    }else{
        firstday = daysOfPrevMonth - offset + 1;
    }
    if(offset == 0){
        for(index = 0; index<7;index++){
            id = "SD" + index.toString();
            cid = "LD" + index.toString();
            document.getElementById(id).innerHTML = firstday - 7;
            document.getElementById(id).setAttribute("style","color:#aaa;background-Color:#eee");
            document.getElementById(cid).innerHTML = transformChinese(getChineseDay(year,(month-1),(firstday-7)).day);
            document.getElementById(cid).setAttribute("style","color:#aaa;background-Color:#eee");
            firstday ++;
        }
    }else{
        for(index = 0; index<offset;index++){
            id = "SD" + index.toString();
            cid = "LD" + index.toString();
            document.getElementById(id).innerHTML = firstday;
            document.getElementById(id).setAttribute("style","color:#aaa;background-Color:#eee");
            document.getElementById(cid).innerHTML = transformChinese(getChineseDay(year,(month-1),firstday).day);
            document.getElementById(cid).setAttribute("style","color:#aaa;background-Color:#eee");
            firstday ++;
        }
    }
    
}
// 计算下个月初
function getNextMonthDetial(year,month) {
    var index;
    var daysOfcurrentMonth;
    var lastDay,space;
    var offset = getFirstWeek(year,month);
    daysOfcurrentMonth = getDaysOfMonth(year,month);
    if(offset == 0){
        lastDay = daysOfcurrentMonth + 7;
        space = (42 - daysOfcurrentMonth - 7);
        for(index = 0; index<space;index++){
            id = "SD" + lastDay.toString();
            cid = "LD" + lastDay.toString();
            document.getElementById(id).innerHTML = (index + 1);
            document.getElementById(id).setAttribute("style","color:#aaa;background-Color:#eee");
            document.getElementById(cid).innerHTML = transformChinese(getChineseDay(year,(month+1),(index+1)).day);
            document.getElementById(cid).setAttribute("style","color:#aaa;background-Color:#eee");
            lastDay ++;
        }
    }else{
        lastDay = daysOfcurrentMonth + offset;
        space = (42 - daysOfcurrentMonth - offset);
        for(index = 0; index<space;index++){
            id = "SD" + lastDay.toString();
            cid = "LD" + lastDay.toString();
            document.getElementById(id).innerHTML = ( index + 1);
            document.getElementById(id).setAttribute("style","color:#aaa;background-Color:#eee");
            document.getElementById(cid).innerHTML = transformChinese(getChineseDay(year,(month+1),(index+1)).day);
            document.getElementById(cid).setAttribute("style","color:#aaa;background-Color:#eee");
            lastDay ++;
        }
    }
}
// 获取指定年份月份的第一天是星期几
// 返回 0-6
function getFirstWeek(Y,M){
    var d = new Date(Y,M,1);
    var firstweek = d.getDay();
    // console.log("本月第一天为"+firstweek);
    return firstweek;
}

//选择获取选择的年份月份 
// 返回包含所选年份月份的对象
function getSelectDate() {
    var selectYear = document.getElementById("selectYear");
    var selectMonth = document.getElementById("selectMonth");
    // console.log(selectMonth);
    // console.log(selectYear);
    var indexY = selectYear.selectedIndex;
    var indexM = selectMonth.selectedIndex;
    // console.log(selectYear[indexY].text);
    // console.log(selectMonth[indexM].text);
    // console.log(selectYear,selectMonth);
    var selectDate = {
        "year":selectYear[indexY].value,
        "month":selectMonth[indexM].value
    }
    return selectDate;

}

// 所选日期发生变化后重新生成新的日历
function DaysChange(){
    // console.log("Days has been changed");
    var selectYear = getSelectDate().year;
    var selectMonth = getSelectDate().month - 1;
    clearDetial();//清空旧日历
    showEveryDay(selectYear,selectMonth);//根据所选年份月份生成新日历
}
//清空旧日历,重新生成日历表格
function clearDetial() {
    document.getElementById('detail').innerText = '';
    createTable();
}

// 计算农历日期所需数组,固定格式,请勿修改
var chineseDayIndex = new Array(//阴历数据
    0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,
    0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
    0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
    0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
    0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,
    0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5d0, 0x14573, 0x052d0, 0x0a9a8, 0x0e950, 0x06aa0,
    0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,
    0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b5a0, 0x195a6,
    0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,
    0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0,
    0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,
    0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
    0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,
    0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,
    0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0);

function lunar_day(y) {
    var i, sum = 348
    for (i = 0x8000; i > 0x8; i >>= 1) {sum += (chineseDayIndex[y - 1900] & i) ? 1 : 0}
    // console.log(sum + lunar_leap(y));
    return (sum + lunar_leap(y));
}

//返回农历第y年闰月的天数
//返回农历第y年的总天数
function lunar_leap(y) {
    if (lunar_leap_m(y)) {return ((chineseDayIndex[y - 1900] & 0x10000) ? 30 : 29) }
    else return (0)
}

//返回农历第y年闰几月（1-12月），没闰返回0
function lunar_leap_m(y) {
    return (chineseDayIndex[y - 1900] & 0xf)
}

//返回农历第y年第m月的总天数
function lunar_leap_d(y, m) {
    return ((chineseDayIndex[y - 1900] & (0x10000 >> m)) ? 30 : 29)
}

//算出农历，把值传入到日期控件，返回农历日期控件
//该农历日期对象的属性：.year .month .day .isLeap .yearCyl .monthCyl .dayCyl
function ChineseDate(DateObject) {

    var i, leap = 0, temp = 0
    var baseDate = new Date(1900, 0, 31);
    var offset = (DateObject - baseDate) / 86400000

    this.dayCyl = offset + 40
    this.monCyl = 14

    for (i = 1900; i < 2050 && offset > 0; i++) {
          temp = lunar_day(i)
          offset -= temp
          this.monCyl += 12
    }

    if (offset < 0) {
          offset += temp;
          i--;
          this.monCyl -= 12
    }

    this.year = i
    this.yearCyl = i - 1864

    leap = lunar_leap_m(i)
    this.isLeap = false

    for (i = 1; i < 13 && offset > 0; i++) {
          if (leap > 0 && i == (leap + 1) && this.isLeap == false) { --i; this.isLeap = true; temp = lunar_leap(this.year); }
          else { temp = lunar_leap_d(this.year, i); }

          if (this.isLeap == true && i == (leap + 1)) this.isLeap = false

          offset -= temp
          if (this.isLeap == false) this.monCyl++
    }

    if (offset == 0 && leap > 0 && i == leap + 1)
          if (this.isLeap) { this.isLeap = false; }
          else { this.isLeap = true; --i; --this.monCyl; }

    if (offset < 0) { offset += temp; --i; --this.monCyl; }

    this.month = i
    this.day = offset + 1
}
// 计算指定日期的农历信息,data为一个Date()对象
function getChineseDate(date) {
    var chineseDateObj = new ChineseDate(date);
    // console.log(chineseDateObj);
    return chineseDateObj;
}
function getChineseDay(year,month,day) {
    var date = new Date(year,month,day);
    var chineseDayinfo = new ChineseDate(date);
    return chineseDayinfo;
    
}
// 转换为中文
// 使用了全局数组chineseDate与chineseNum
function transformChinese(day) {
    var chineseNum = new Array('日', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十')
    var chineseDate = new Array('初', '十', '廿', '卅', '　')
    // 农历日期
    var chineseDay;
    if (day == 10) { chineseDay = '初十'; }
    else if (day == 20) { chineseDay = '二十'; }
    else if (day == 30) { chineseDay = '三十'; }
    else { chineseDay = chineseDate[Math.floor(day / 10)]; chineseDay += chineseNum[day % 10]; }
    //利用天数除于10取整加上天数除于10取余,计算出农历天数
    //例如26号:26/10 = 2 即chineseDate[1]="廿" 26 % 10 = 6 即 chieseNum[6]="六" 合起来就是"廿六"
    return (chineseDay);
}
// 获取指定年份月份一整个月的农历日期
function getChineseMonth(year,month) {
    var dayofmonth = getDaysOfMonth(year,month);
    var i;
    var chineseDateList = [];
    for(i = 0; i<dayofmonth;i++){
        var newdate = new Date(year,month,i+1);
        chineseDateList[i] = getChineseDate(newdate);
        // console.log(chineseday);
        // console.log((month+1)+ "月"+(i+1)+"日-农历:"+chineseday.month+"月"+transformChinese(chineseday.day));
    }
    return chineseDateList;
}
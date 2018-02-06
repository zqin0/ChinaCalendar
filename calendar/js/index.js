window.onload = function(){
    var weekend = ["星期天","星期一","星期二","星期三","星期四","星期五","星期六"];
    // var SX = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];
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
    
    function getTime() {
        // setInterval("getTime()", 1000);
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
        // document.getElementById("time").innerHTML = hou + ':' + min + ':' + sec;
        // setInterval("getTime()", 1000);
        // console.log(time);
    }
    console.log(getDaysOfMonth(year,month))
    createTable();


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
        return daysOfMonth[month]
    }

}
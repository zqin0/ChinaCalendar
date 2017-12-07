window.onload = function(){
    var weekend = ["星期天","星期一","星期二","星期三","星期四","星期五","星期六"];
    var SX = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];
    var date = new Date();
    
    var weekday = date.getUTCDay();
    var week = weekend[weekday];
    
    var day = date.getFullYear().toString()+"-"+date.getMonth().toString()+"-"+date.getDate().toString();

    document.getElementById("date").innerHTML = day;
    document.getElementById("weekend").innerHTML = week;
    document.getElementById("shengxiao").innerHTML = getSX(date.getFullYear());
    // document.getElementById("time").innerHTML = getTime();
    // setInterval("getTime()",1000);
    function getTime() {
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

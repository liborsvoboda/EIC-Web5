var EC_LOG_IDX = 0;
function ecLog(data) {

    var url = 'http://echarts.baidu.com/statistics/es.gif?';
    var tm = (new Date()).getTime();
    var common = {
        path: document.location.href,
        referrer: document.referrer
    };

    data.extend = (data.extend || '') + '.t_' + new Date().getTime() + '_' + (EC_LOG_IDX++);
    data.path = document.location.href;
    data.referrer = document.referrer;
    for(var i in data){
        if(data.hasOwnProperty(i)){
            url += '&' + i + '=' + encodeURIComponent(data[i]);
        }
    }
    var img = window['EC_LOG_' + tm] = new Image();
    img.src = url;
}
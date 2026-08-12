function doGet() {
  try {
    var url='https://query1.finance.yahoo.com/v8/finance/chart/%5ENSEI?range=1d&interval=1m&includePrePost=false&events=div%2Csplits';
    var res=UrlFetchApp.fetch(url,{muteHttpExceptions:true,headers:{'User-Agent':'Mozilla/5.0'}});
    if(res.getResponseCode()!=200)return json({error:'Yahoo Finance HTTP '+res.getResponseCode()});
    var root=JSON.parse(res.getContentText()), r=root.chart&&root.chart.result&&root.chart.result[0];
    if(!r)return json({error:'No NIFTY data returned.'});
    var ts=r.timestamp||[], q=r.indicators&&r.indicators.quote&&r.indicators.quote[0];
    if(!q)return json({error:'No 1-minute OHLC data returned.'});
    var today=Utilities.formatDate(new Date(),'Asia/Kolkata','yyyy-MM-dd'), first=null;
    for(var i=0;i<ts.length;i++){
      if(q.open[i]==null||q.close[i]==null)continue;
      var ist=Utilities.formatDate(new Date(ts[i]*1000),'Asia/Kolkata','yyyy-MM-dd HH:mm:ss');
      if(ist.indexOf(today+' 09:15:')===0){first={open:Number(q.open[i]),close:Number(q.close[i])};break;}
    }
    if(!first)return json({error:'09:15 1-minute candle is not available yet. Try again after 09:16 IST.',date:today});
    var prev=Number(r.meta&&r.meta.previousClose);
    if(!isFinite(prev)||prev<=0)return json({error:'Previous trading-day close was not returned.'});
    return json({date:today,previousClose:prev,candleOpen:first.open,candleClose:first.close});
  }catch(e){return json({error:String(e)})}
}
function json(o){return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON)}

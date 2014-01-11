function  mapTo (x,y,z){
    if(typeof(z)==="undefined")z=12;
    var gg='https://www.google.com/fusiontables/embedviz?q=select+col2+from+1BILYy9TOfCajakAc0_mVuM4KiN8EdroQxzahA-g&viz=MAP&h=false&lat=';
    var gg1='&lng=';
    var gg2='&t=1&z=';
    var gg3='&l=col2&y=2&tmplt=2&hml=ONE_COL_LAT_LNG';
    return gg+x+gg1+y+gg2+z+gg3;
}

$().ready(function(){
    $('#country').change(function(){
        cty=$('#country').val();
        $('#line_chart')
        .empty()
        .append($('<img>')
        .attr('src','./imgs/'+cty+'.jpg'));
        
        switch(cty){
            case '新北市':
                $('#ifmap')
                    .attr('src',
                          mapTo(25.074710135370427,121.60171399633796,10)
                         );
                break;
            case '台北市':
                $('#ifmap')
                    .attr('src',
                          mapTo(25.027434089850697,121.51862988989265)
                         );
                break;
            case '桃園縣':
                $('#ifmap')
                    .attr('src',
                          mapTo(24.990331410517026,121.18758092443855)
                         );
                break;
            case '新竹市':
                $('#ifmap')
                    .attr('src',
                          mapTo(24.80503978690687,121.04681859533699)
                         );
                break;
            case '台中市':
                $('#ifmap')
                    .attr('src',
                          mapTo(24.188016410171,120.71585546057136)
                         );
                break;
            case '高雄市':
                $('#ifmap')
                    .attr('src',
                          mapTo(22.71277176570096,120.36154637854011)
                         );
                break;
        }
        
    });

    //for Chart SVG
    svg=d3.select('#chart');
    d3.csv("http://whycatstyle.com/data/fonggia.csv",function(d){
      return d
    },function(e,d){
      console.log(d);
      chart=svg.selectAll('g').data(d).enter();

    });



});
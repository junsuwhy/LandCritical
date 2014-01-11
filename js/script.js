basedata={"name":["101年8月","101年9月","101年10月","101年11月","101年12月","102年01月","102年02月","102年03月","102年04月","102年05月","102年06月","102年07月","102年08月","102年09月"],
"台北市":["54.67","55.10","56.85","55.33","54.54","57.14","57.75","56.40","59.43","60.04","61.12","61.07","60.18","58.99"],
"新北市":["25.45","25.87","25.67","27.28","28.52","27.91","27.96","29.68","28.76","29.49","30.86","30.68","31.20","31.96"],
"新竹市":["17.16","17.27","17.79","16.35","17.74","19.10","15.59","15.17","17.46","17.82","17.92","16.80","17.08","17.95"],
"新竹縣":["19.01","17.22","17.46","19.49","17.55","19.16","21.77","20.74","19.17","21.10","20.82","22.03","22.60","20.44"],
"台中市":["13.54","14.57","15.14","14.95","15.46","15.75","15.39","15.76","16.10","16.23","16.34","16.71","16.49","16.81"],
"高雄市":["12.80","13.06","13.17","13.90","14.05","13.76","13.89","14.29","14.45","14.27","14.74","14.69","15.07","15.28"],
"桃園縣":["14.45","14.08","14.42","14.25","14.33","14.33","14.57","15.19","15.56","15.73","16.20","16.06","15.82","16.79"]};


  $this=$('#chart');
      width=461,
      height=400,
      pd_l=50,
      pd_t=40;

  x=d3.scale.linear().domain([0,13]).range([pd_l,width-pd_l]);
  y=d3.scale.linear().domain([0,63]).range([height-pd_t,pd_t]);


function showchart(countryname){
  $('.xc').remove();
  $('.xline').remove();
  $('#charttext').text('過去'+countryname+'平均房價波動');
  //$this.attr('display','block');
  dvcircle=svg.selectAll('g')
            .data(basedata[countryname])
            .enter()
            .append('circle')
            .attr('class','xc')
            .attr('cx',function(d,i){return x(i)})
            .attr('cy',function(d,i){return y(d)})
            .attr('r',5)
            .on('mouseover',function(d,i){
//                        text=d3.select(this).attr('val');
                        $('#tiptool')
                            .html(basedata["name"][i]+" "+d+'萬元');
                        boxtop=$(this).attr('cy')-$('#tiptool').height();
                        boxleft=$(this).attr('cx')-$('#tiptool').width();
                        $('#tiptool')
                            .css('top',($('#chart').position().top+boxtop-20)+"px")
                            .css('left',($('#chart').position().left+boxleft-10)+"px")
                            .css('display','');
                        
                    })
                    .on('mouseout',function(){
                        $('#tiptool').css('display','none');
                    })
;
            ;
  dvline=svg.selectAll('g')
            .data(basedata[countryname])
            .enter()
            .append('line')
            .attr('class','xline')
            .attr('x1',function(d,i){return x(i)})
            .attr('y1',function(d,i){return y(d)})
            .attr('x2',function(d,i){
              if(i==13)return x(i)
                else return x(i+1)
            })
            .attr('y2',function(d,i){
              if(i==13)return y(d)
              return y(basedata[countryname][i+1])
            })
            .attr('stroke','#000096')
            .attr('stroke-width',1)
            ;




}

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
        $('#ichart').hide();
        cty=$('#country').val();
        

        showchart(cty);
        //.attr('src','./imgs/'+cty+'.jpg'));
        
        
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
    /*
    $('#line_chart')
        .empty()
        .append($('<svg>').attr('id','chart'));
        */

    svg=d3.select('#chart');
    //下面線
    svg.append('line')
            .attr('x1',x(0))
            .attr('y1',y(0))
            .attr('x2',x(13))
            .attr('y2',y(0))
            .attr('stroke','#000096')
            .attr('stroke-width',1);
    //左邊線
    svg.append('line')
            .attr('x1',x(0))
            .attr('y1',y(0))
            .attr('x2',x(0))
            .attr('y2',y(63))
            .attr('stroke','#000098')
            .attr('stroke-width',1);

            //30萬線
    svg.append('line')
            .attr('x1',x(0))
            .attr('y1',y(30))
            .attr('x2',x(13))
            .attr('y2',y(30))
            .attr('stroke','#ffcca2')
            .attr('stroke-width',1);
      //30萬text
      svg.append('text')
            .text('30萬')
            .attr('x',x(-1))
            .attr('y',y(30));
      
            //60萬線
    svg.append('line')
            .attr('x1',x(0))
            .attr('y1',y(60))
            .attr('x2',x(13))
            .attr('y2',y(60))
            .attr('stroke','#ffcca2')
            .attr('stroke-width',1);
      //60萬text
      svg.append('text')
            .text('60萬')
            .attr('x',x(-1))
            .attr('y',y(60));
      //字
      svg.append('text')
            .text('101年8月')
            .attr('x',x(-1))
            .attr('y',y(-3));
      svg.append('text')
            .text('102年9月')
            .attr('x',x(12))
            .attr('y',y(-3));
      svg.append('text')
            .attr('id','charttext')
            .attr('x',30)
            .attr('y',30)
            .attr('font-size',20);
    

    //console.log(basedata);
    /*
    d3.csv("data/fonggia.csv",function(d){
      return d
    },function(e,d){
      console.log(d);
      chart=svg.selectAll('g').data(d).enter();

    });*/



});
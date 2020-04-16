
function initMap() {
    CreatePoly();

}
var vungbo;
var vunglong;
var EEZ;
var map;
function CreatePoly() {
    var bo2 = [
    {
        lat: 23.280141,
        lng: 105.347008
    },
    {
        lat: 21.503194135549496,
        lng: 108.02619254294065
    },
    {
        lat: 21.297161379096146,
        lng: 108.22480509158356
    },
    {
        lat: 20.77640623884077,
        lng: 107.49933562034437
    },
    {
        lat: 20.78218407614093,
        lng: 107.25488981956312
    },
    {
        lat: 19.48079141166457,
        lng: 105.8929193720719
    },
    {
        lat: 18.85371975591871,
        lng: 106.07666110640285
    },
    {
        lat: 18.00837312927585,
        lng: 106.69288137037508
    },
    {
        lat: 17.228582152191144,
        lng: 107.39704107428051
    },
    {
        lat: 15.449776771055586,
        lng: 109.15733841196696
    },
    {
        lat: 12.69602865658084,
        lng: 109.55186730353006
    },
    {
        lat: 11.325273851872304,
        lng: 109.18188819694667
    },
    {
        lat: 10.140214684249509,
        lng: 107.05858580904787
    },
    {
        lat: 9.457781057934595,
        lng: 106.68539918157842
    },
    {
        lat: 9.08031407756966,
        lng: 105.8552447626331
    },
    {
        lat: 8.47779555308242,
        lng: 105.28500466758953
    },
    {
        lat: 8.528428615467199,
        lng: 104.61373556128177
    },
    {
        lat: 10.04419157417623,
        lng: 104.61065060776808
    },
    {
        lat: 10.044060671815789,
        lng: 104.07640064691681
    },
    {
        lat: 10.39325704700242,
        lng: 103.91046360697484
    },
    {
        lat: 10.379073755361572,
        lng: 104.44467381205297
    }];
    var long2 = [
        {
            lat: 23.280141,
            lng: 105.347008
        },
        {
            lat: 21.503194135549496,
            lng: 108.02619254294065
        },
        {
            lat: 21.27184946152741,
            lng: 108.2519905029297
        },
        {
            lat: 20.858238795550733,
            lng: 108.34490845369258
        },
        {
            lat: 19.5902308612782,
            lng: 106.62004059242275
        },
        {
            lat: 18.648810920991348,
            lng: 106.61842212159299
        },
        {
            lat: 18.433979558389915,
            lng: 106.87042102296017
        },
        {
            lat: 17.978696336041832,
            lng: 107.13065967042111
        },
        {
            lat: 17.45602816449127,
            lng: 107.66040360201372
        },
        {
            lat: 15.640857101793385,
            lng: 109.65263186574529
        },
        {
            lat: 12.739034580946218,
            lng: 110.10183715040718
        },
        {
            lat: 10.892694838233052,
            lng: 109.62075379644894
        },
        {
            lat: 9.668930302885345,
            lng: 107.33201354059692
        },
        {
            lat: 9.019443110533954,
            lng: 107.13295285276917
        },
        {
            lat: 8.620470697801126,
            lng: 106.13731686644104
        },
        {
            lat: 7.979310681555522,
            lng: 105.59226763095965
        },
        {
            lat: 8.078662326012513,
            lng: 104.22501148728139
        },
        {
            lat: 9.543674686940426,
            lng: 104.20120549581164
        },
        {
            lat: 9.542320400261909,
            lng: 103.8201172389757
        },
        {
            lat: 10.075896401615779,
            lng: 103.5475096832125
        },
        {
            lat: 10.394501446413623,
            lng: 103.85705794721736
        },
        {
            lat: 10.370579776181014,
            lng: 104.4344147351941
        }];
    var bo = [
      {
          lat: 23.280141,
          lng: 105.347008
      },
      {
          lat: 21.532631301291076,
          lng: 108.05561492727831
      },
      {
          lat: 21.20972222,
          lng: 108.2086
      },
      {
          lat: 20.71888889,
          lng: 107.4561
      },
      {
          lat: 20.614444,
          lng: 107.206944
      },
      {
          lat: 19.3475,
          lng: 105.93388889
      },
      {
          lat: 18.79277778,
          lng: 105.99638889
      },
      {
          lat: 17.91388889	
          ,
          lng: 106.67250000
      },
      {
          lat: 17.16083333	
          ,
          lng: 107.34305556
      },
      {
          lat: 15.37777778	
          ,
          lng: 109.13972222
      },
      {
          lat: 12.65500000	
          ,
          lng: 109.56944444
      },
      {
          lat: 11.14972222	
          ,
          lng: 109.15722222
      },
      {
          lat: 10.01055556	
          ,
          lng: 106.97888889
      },
      {
          lat: 9.35750000	
          ,
          lng: 106.67194444
      },
      {
          lat: 8.97416667	
          ,
          lng: 105.74805556
      },
      {
          lat: 8.41805556	
          ,
          lng: 105.24027778
      },
      {
          lat: 8.40888889	
          ,
          lng: 104.53694444
      },
      {
          lat: 10.00000000	
          ,
          lng: 104.53666667
      },
      {
          lat: 10	
          ,
          lng: 104.00500000
      },
      {
          lat: 10.1538,
          lng: 103.9352
      },
      {
          lat: 10.2177,
          lng: 103.9234
      },
      {
          lat: 10.2420,
          lng: 103.9131
      },
      {
          lat: 10.2612,
          lng: 103.9009
      },
      {
          lat: 10.2908,
          lng: 103.8266
      },
      {
          lat: 10.3837,
          lng: 103.8051
      },
      {
          lat: 10.40201,
          lng: 103.83776
      },
      {
          lat: 10.3902,
          lng: 103.9143
      },
      {
          lat: 10.43034,
          lng: 103.92653
      },
      {
          lat: 10.4439,
          lng: 103.9426
      },
      {
          lat: 10.4799,
          lng: 103.9715
      },
      {
          lat: 10.4804,
          lng: 104.0112
      },
      {
          lat: 10.4206,
          lng: 104.0885
      },
      {
          lat: 10.3835,
          lng:104.1107
      },
      {
          lat:10.34014,
          lng:104.11135
      },
      {
          lat: 10.30778,
          lng: 104.11968
      },
      {
          lat: 10.28570,
          lng: 104.11782
      },
      {
          lat: 10.25693,
          lng: 104.12397
      },
      {
          lat: 10.23190,
          lng: 104.12436
      },
      {
          lat: 10.421051,
          lng: 104.438897
      }];
    var long = [
      {
          lat: 23.280141,
          lng: 105.347008
      },
      {
          lat: 21.532631301291076,
          lng: 108.05561492727831
      },
      {
          lat: 21.209722,
          lng: 108.208611
      },
      {
          lat: 20.803333	
          ,
          lng: 108.294444
      },
      {
          lat: 20.000000	
          ,
          lng: 107.128056
      },
      {
          lat: 19.551944	
          ,
          lng: 106.621389
      },
      {
          lat: 18.666667	
          ,
          lng: 106.621389
      },
      {
          lat: 18.316111	
          ,
          lng: 106.885556
      },
      {
          lat: 18,
          lng: 107.031944
      },
      {
          lat: 17.393889	
          ,
          lng: 107.580000
      },
      {
          lat: 15.621111	
          ,
          lng: 109.624444
      },
      {
          lat: 12.614444	
          ,
          lng: 110.089722
      },
      {
          lat: 10.776667	
          ,
          lng: 109.576111
      },
      {
          lat: 9.603611	
          ,
          lng: 107.351667
      },
      {
          lat: 8.968611	
          ,
          lng: 107.046944
      },
      {
          lat: 8.553333	
          ,
          lng: 106.046389
      },
      {
          lat: 7.918333	
          ,
          lng: 105.466111
      },
      {
          lat: 7.898889	
          ,
          lng: 104.033056
      },
      {
          lat: 9.500000	
          ,
          lng: 104.030556
      },
      {
          lat: 9.5,
          lng: 103.694444
      },
      {
          lat: 9.993333	
          ,
          lng: 103.424444
      },

      {
        lat: 10.1538,
        lng: 103.9352
    },
    {
        lat: 10.2177,
        lng: 103.9234
    },
    {
        lat: 10.2420,
        lng: 103.9131
    },
    {
        lat: 10.2612,
        lng: 103.9009
    },
    {
        lat: 10.2908,
        lng: 103.8266
    },
    {
        lat: 10.3837,
        lng: 103.8051
    },
    {
        lat: 10.40201,
        lng: 103.83776
    },
    {
        lat: 10.3902,
        lng: 103.9143
    },
    {
        lat: 10.43034,
        lng: 103.92653
    },
    {
        lat: 10.4439,
        lng: 103.9426
    },
    {
        lat: 10.4799,
        lng: 103.9715
    },
    {
        lat: 10.4804,
        lng: 104.0112
    },
    {
        lat: 10.4206,
        lng: 104.0885
    },
    {
        lat: 10.3835,
        lng:104.1107
    },
    {
        lat:10.34014,
        lng:104.11135
    },
    {
        lat: 10.30778,
        lng: 104.11968
    },
    {
        lat: 10.28570,
        lng: 104.11782
    },
    {
        lat: 10.25693,
        lng: 104.12397
    },
    {
        lat: 10.23190,
        lng: 104.12436
    },
      {
          lat: 10.421051,
          lng: 104.438897
      }];
    var China = [
        {
            lat: 21.209722,
            lng: 108.208611
        },
        {
            lat: 20.401389,
            lng: 108.379167
        },
        {
            lat: 19.959167,
            lng: 107.929722
        },
        {
            lat: 19.659167,
            lng: 107.527778
        },
        {
            lat: 19.423889,
            lng: 107.35
        },
        {
            lat: 19.423889,
            lng: 107.211944
        },
        {
            lat: 19.267778,
            lng: 107.189722
        },
        {
            lat: 19.215278,
            lng: 107.159444
        },
        {
            lat: 18.714444,
            lng: 107.159444
        },
        {
            lat: 18.230278,
            lng: 107.566667
        },
        {
            lat: 18.118889,
            lng: 107.626111
        },
        {
            lat: 18.070278,
            lng: 107.6525
        },
        {
            lat: 17.783333,
            lng: 107.966667
        },
    ];
    var ThaiLan = [
        {
            lat: 8.781882,
            lng: 102.203204
        },
        {
            lat: 7.816667,
            lng: 103.041667
        },
        {
            lat: 6.096667,
            lng: 105.82
        },
        {
            lat: 6.25,
            lng: 106.2
        },
        {
            lat: 6.25,
            lng: 106.316944
        },
        {
            lat: 6.349689,
            lng: 106.661019
        },
        {
            lat: 6.8375,
            lng: 109.286944
        },
        {
            lat: 6.303333,
            lng: 109.643333
        }
    ];      
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 20.72222222, lng: 107.5111 },
        zoom: 8,
        scaleControl: true
    });
    //EEZ = ThaiLan.concat(Indonesia);
    // for(i = 0; i < ThaiLan.length+Indonesia.length+China.length; i++)
    // {
    //     //var p = new google.maps.LatLng(ThaiLan.join(Indonesia)[i]["lat"],ThaiLan.join(Indonesia)[i]["lng"]);
    //     var marker = new google.maps.Marker({
    //         position: EEZ[i],
    //         label: "EEZ",
    //         map: map
    //     })
    // }
    var EEZLine = new google.maps.Polyline({
        path: China,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2,
        map: map
    });

    var EEZSine = new google.maps.Polyline({
        path: ThaiLan,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2,
        map: map
    });
    // var EEZSine1 = new google.maps.Polyline({
    //     path: Indonesia,
    //     geodesic: true,
    //     strokeColor: '#FF0000',
    //     strokeOpacity: 1.0,
    //     strokeWeight: 2,
    //     map: map
    // });    
    vungbo = new google.maps.Polygon({
        paths: bo,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35
    });
    vungbo.setMap(map);
    // vungbo2 = new google.maps.Polygon({
    //     paths: bo2,
    //     strokeColor: '#000000',
    //     strokeOpacity: 0.8,
    //     strokeWeight: 2,
    //     fillColor: '#000000',
    //     fillOpacity: 0.5
    // });
    // vungbo2.setMap(map);
    vunglong = new google.maps.Polygon({
        paths: long,
        strokeColor: '#f91608',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#c51536',
        fillOpacity: 0.35
    });
    vunglong.setMap(map);
    // vunglong2 = new google.maps.Polygon({
    //     paths: long2,
    //     strokeColor: '#f91608',
    //     strokeOpacity: 0.8,
    //     strokeWeight: 2,
    //     fillColor: '#14e851',
    //     fillOpacity: 0.35
    // });
    // vunglong2.setMap(map);

    google.maps.event.addListener(map, 'click', function (event) {
        addMarker(event.latLng, map);
        console.log(event.latLng.lat());
        console.log(event.latLng.lng());
        // var label;
        // if (google.maps.geometry.poly.containsLocation(event.latLng, vungbo)) {
        //     label = "B";
        // } else {
        //     if (google.maps.geometry.poly.containsLocation(event.latLng, vungbo2)) {
        //         label = "B2";
        //     } else {
        //         if (google.maps.geometry.poly.containsLocation(event.latLng, vunglong)) {
        //             label = "L";
        //         } else {
        //             label = "L2";
        //         }
        //     }
        // }
        // new google.maps.Marker({
        //     position: event.latLng,
        //     map: map,
        //     label: label
        // });
    });

}
function addMarker(location, map) {
    // Add the marker at the clicked location, and add the next-available label
    // from the array of alphabetical characters.
    var marker = new google.maps.Marker({
        position: location,
        label: "C",
        map: map,
    });
    marker.addListener('rightclick',function (){
        marker.setMap(null);
    });
}
function checkArea(lat, lng) {
    var checkpoint = new google.maps.LatLng(lat, lng);
    if (google.maps.geometry.poly.containsLocation(checkpoint, vunglong) == false) {
        console.log('Vùng khơi');
        return 3;
    }

    else {
        if (google.maps.geometry.poly.containsLocation(checkpoint, vungbo) == false) {
            console.log('Vùng lộng');
            return 2;
        }
        console.log('Vùng bộ');
        return 1;
    }
}

function FindPoint(lat1,lon1,lat2,lon2,lat3,lon3){
    //Biên giới AB (lat1,lon1, lat2,lon2)
    //Điểm M(lat3,lon3)
    var a = lon2-lon1;
    var b = lat1 - lat2;
    var c = -a*lat1 -b*lat2;
    var d = (Math.abs(a*lat3 + b*lon3 + c))/Math.sqrt(a*a + b*b);
    var e = (d*Math.PI/180*6371);
    if(d>5) console.log(d);
    if(d<=5) console.log(d);
    

}
function Distance(lat1,lon1,lat2,lon2){
    var R = 6371; // Km
    var φ1 = lat1*Math.PI/180;
    var φ2 = lat2*Math.PI/180;
    var Δφ = (lat2-lat1)*Math.PI/180;
    var Δλ = (lon2-lon1)*Math.PI/180;
    var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ/2) * Math.sin(Δλ/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;

}


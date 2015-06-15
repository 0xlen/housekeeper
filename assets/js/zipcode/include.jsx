function onScroll(event){
    var scrollPos = $(document).scrollTop();
    var curr= $('img#progress');
    if (curr.position().top >= $(window).height() / 2) {
        if (flag != 1) curr.animate( { width: prog+'px', }, 1200 )
    } else{
    }
}

$(function () {
    // $(document).on("scroll", onScroll);

    var finder = window.finder = new Finder();
    $('#container .content').empty();
    $('#container .content').append(finder.$view);
    // finder.$address.focus();

    finder.$address.keypress(function(e) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
            $.post('/home/change',
                {zip: finder.$address_with_zipcode.val(), address: $(this).val()},
                function(data) {
                    $('input[name="address"]').attr('disabled', 'disabled');
                    alert("更新成功");
                    location.href = 'http://localhost:1337'
                    console.log( data );
                }
            );
        }
    })

    $('#docker img')
        .hover(function() {
            $(this).attr('src', '/images/'+$(this).attr('name')+'1.png')
        }, function() {
            $(this).attr('src', '/images/'+$(this).attr('name')+'0.png')
        })
        .click(function() {
            prog = 0;
            $('img#progress').css('width', '0px');
            $('div#contain').fadeOut().fadeIn()

            $('.details').empty();
            $('.details').append('<span>No relative data</span>');
            switch ( $(this).attr('name') ) {
                case 'air': {
                    $('img#progress').attr('src', '/images/green.gif').css('width', '0px').animate( { width: '266px', }, 1200 );
                    $('span#levels').text('Air')
                    $('span#description').text('Descirption')

                    $.get('http://localhost:1337/air', function(data) {
                        $('.details').empty();
                        $('.details').append('<p>Last 4 data<p>')
                        $('.details').append('<p>'+data[0].avg+'<p>')
                        $('.details').append('<p>'+data[1].avg+'</p>')
                        $('.details').append('<p>'+data[2].avg+'</p>')
                        $('.details').append('<p>'+data[3].avg+'</p>')

                        total = (parseFloat(data[0].avg) + parseFloat(data[1].avg) + parseFloat(data[2].avg) + parseFloat(data[3].avg));
                        img = '/images/red.gif';
                        if (total / 4 >= 6 && total / 4 <= 7) {
                            $('span#levels').text('Normal')
                        } else if (total / 4 > 7) {
                            $('span#levels').text('Danger')
                        } else {
                            $('span#levels').text('Clear')
                            img = '/images/green.gif';
                        }
                        prog = total / 4 / 10 * 266;
                        $('span#description').text(total / 4)
                        $('img#progress').attr('src', '/images/red.gif').animate( { width: prog+'px', }, 1200 );
                    })
                    break;
                }
                case 'light' : {
                    $('span#levels').text('Light')
                    $('span#description').text('No data')
                    break;
                }
                case 'humid': {
                    $('span#levels').text('Humid')
                    $('span#description').text('No data')

                    var zip_code = $('input.address-with-zipcode').val().substring(0,3);
                    $.get('http://api.openweathermap.org/data/2.5/weather?q='+zip_code+',tw', function(data) {
                        if (data.sys && data.sys.country == 'Taiwan') {
                            $('span#levels').text(data.name)
                            $('span#description').text( data.main.humidity + ' % ' )

                            $('.details').empty();
                            $('.details').append('<p>'+ data.weather[0].main + '</p>')
                            $('.details').append('<p>'+ data.weather[0].description + '</p>')

                            prog = data.main.humidity / 100 * 266;
                            $('img#progress').attr('src', '/images/red.gif').animate( { width: prog+'px', }, 1200 );
                        }

                    });
                    break;
                }
                case 'temp': {
                    $('img#progress').css('width', '0px')
                    $('span#levels').text('Weather')
                    $('span#description').text('No data')

                    var zip_code = $('input.address-with-zipcode').val().substring(0,3);
                    $.get('http://api.openweathermap.org/data/2.5/weather?q='+zip_code+',tw&units=metric', function(data) {
                        if (data.sys && data.sys.country == 'Taiwan') {
                            $('span#levels').text(data.name)
                            $('span#description').text( data.main.temp + ' °C')

                            $('.details').empty();
                            $('.details').append('<p>'+ data.name + ', ' + data.sys.country +'</p>')
                            $('.details').append('<p>Temperature: '+ data.main.temp + ' °C' +'</p>')
                            $('.details').append('<p>Cloudiness:'+ data.clouds.all + ' %' +'</p>')
                            $('.details').append('<p>Atmospheric pressure:'+ data.main.pressure + ' hPa '+'</p>')
                            $('.details').append('<p>Atmospheric pressure on Sea Level:'+ data.main.sea_level + ' hPa' +'</p>')

                            prog = data.main.temp / 100 * 266;
                            $('img#progress').attr('src', '/images/red.gif').animate( { width: prog+'px', }, 1200 );
                        }
                    });
                    break;
                }
            }
        });

    $('img#progress').css('width', '0px');
});

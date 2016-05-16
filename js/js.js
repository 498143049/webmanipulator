$(function(){
            var arr = [0,0,0,0];
            arr.push = $('#ex1SliderVal').val();
            arr.push = $('#ex2SliderVal').val();
            arr.push = $('#ex3SliderVal').val();
            arr.push = $('#ex4SliderVal').val();

            $("#ex1").slider();
            $("#ex1").on("slide", function(slideEvt) {
                $("#ex1SliderVal").val(slideEvt.value);
            });
            var mySlider1 = $("#ex1").slider();
            $('#ex1SliderVal').change(function(){
                mySlider1.slider('setValue',parseFloat($('#ex1SliderVal').val()));
            });
            $("#ex1").on('slideStop',function(){
                arr[0] = $('#ex1SliderVal').val();
                change(arr);
                updateobj();
            })


            $("#ex2").slider();
            $("#ex2").on("slide", function(slideEvt) {
                $("#ex2SliderVal").val(slideEvt.value);
            });
            var mySlider2 = $("#ex2").slider();
            $('#ex2SliderVal').change(function(){
                mySlider2.slider('setValue',parseFloat($('#ex2SliderVal').val()));
            })
            $("#ex2").on('slideStop',function(){
                arr[1] = $('#ex2SliderVal').val();
                change(arr);
                updateobj();
            })

            $("#ex3").slider();
            $("#ex3").on("slide", function(slideEvt) {
                $("#ex3SliderVal").val(slideEvt.value);
            });
            var mySlider3 = $("#ex3").slider();
            $('#ex3SliderVal').change(function(){
                mySlider3.slider('setValue',parseFloat($('#ex3SliderVal').val()));
            })
            $("#ex3").on('slideStop',function(){
                arr[2] = $('#ex3SliderVal').val();
                change(arr);
                updateobj();
            })

            $("#ex4").slider();
            $("#ex4").on("slide", function(slideEvt) {
                $("#ex4SliderVal").val(slideEvt.value);
            });
            var mySlider4 = $("#ex4").slider();
            $('#ex4SliderVal').change(function(){
                mySlider4.slider('setValue',parseFloat($('#ex4SliderVal').val()));
            })
            $("#ex4").on('slideStop',function(){
                arr[3] = $('#ex4SliderVal').val();
                change(arr);
                updateobj();
            })
        })
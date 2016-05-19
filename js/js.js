$(function(){
            var arr = [0,0,0,0];
            console.log(arr);
            arr[0] =  parseFloat($('#ex1SliderVal').val());
            arr[1] =  parseFloat($('#ex2SliderVal').val());
            arr[2] =  parseFloat($('#ex3SliderVal').val());
            arr[3] =  parseFloat($('#ex4SliderVal').val());
            console.log(arr);
            function RightSlider(num){
                var mySlider;
                $("#ex" + num).slider();
                $("#ex" + num).on("slide", function(slideEvt) {
                    $("#ex" + num + "SliderVal").val(slideEvt.value);
                    arr[num - 1] = $('#ex' + num + 'SliderVal').val();
                    change(arr);
                    updateobj();
                });
                mySlider = $("#ex" + num).slider();
                $("#ex" + num + "SliderVal").change(function(){
                    var Oldarr = arr.slice(0);
                    Oldarr[num - 1]=mySlider.slider('getValue');
                    mySlider.slider('setValue',parseFloat($('#ex' + num + 'SliderVal').val()));
                    arr[num - 1] = parseFloat($('#ex' + num + 'SliderVal').val());
                    changeArray(Oldarr,arr);
                    // change(arr);
                    // updateobj();
                });
                // $("#ex" + num).on('slideStop',function(){
                //     arr[num - 1] = $('#ex' + num + 'SliderVal').val();
                //     change(arr);
                //     updateobj();
                // })
            }

            RightSlider(1);
            RightSlider(2);
            RightSlider(3);
            RightSlider(4);
            function PhoneChoose(){
                var PhoneBtn = $('.PhoneBtn input');
                var PhoneSlider = $('.sliderPart');
                PhoneBtn.each(function(i){
                    $(this).click(function(){
                        PhoneSlider.hide();
                        PhoneSlider.eq(i).show();
                    })
                })
            }
            PhoneChoose();
        })
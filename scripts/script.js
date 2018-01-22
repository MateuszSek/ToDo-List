var numberOfItems = 3; //start number of items
var doneItems=0; //to track if user did all his items
var addItem = function(item){ 
    $("ol").prepend("<li style='font-weight:bold'>"+item.toString()+"</li>");
    $('input').val('');
    numberOfItems+=1;}   

var main = function(){  
    $('#ul1').sortable(); //making it possible to prioritize tasks
    $( "#ul1" ).disableSelection(); //making it possible to prioritize tasks

    $(document).on('keypress', function(e){ //assigning keys ENTER and DELETE
        if (e.which==13){ //assigning ENTER to addItem function
            var newItem = $("#new_item").val();        
            if ($('input').val()!='') addItem(newItem);
            else alert('Najpierw wpisz zadanie!');
        }
        if (e.keyCode==46){
            $("li").each(function(){ //assigning DELETE to remove function
                if($(this).css("text-decoration")=="underline") {
                    $(this).remove();
                };
            }); 
        }
    })

    $("#add").on("click", function(){  //assigning Add button to addItem function
        var newItem = $("#new_item").val();        
        if ($('input').val()!='') addItem(newItem);
        else alert('Najpierw wpisz zadanie!');
    });    

    $('#deletion').on('click',function(){ //assigning remove button to remove function
        $("li").each(function(){
            if($(this).css("text-decoration")=="underline") {
                $(this).remove();
                doneItems+=1;
                if(doneItems==numberOfItems) alert('Wykonałeś wszystkie zadania!');
            };
        })
    });

    $('#done').on('click',function(){ //making tasks done through a buttton
        $("li").each(function(){
            if($(this).css("text-decoration")=="underline") {
                $(this).css({"text-decoration":"line-through","color":"green"});
                doneItems+=1;
                if(doneItems==numberOfItems) alert('Wykonałeś wszystkie zadania!');
            };
        })
    });


    $('#deleteDoneTasks').on('click',function(){ //deleting done (green) tasks
        $("li").each(function(){
            if($(this).css("text-decoration")=="line-through") {
                $(this).remove();
            };
        })
    });

    $('ol').on('dblclick','li', function(){ //choosing tasks that will be managed
        if ($(this).css("text-decoration")=="underline") {
            $(this).css({"text-decoration":"none","font-weight":"bold", "color":"black"});
        }
        else if ($(this).css("text-decoration")=="none"){
            $(this).css({"text-decoration":"underline","font-weight":"normal", "color":"red"});   
        }
    });    

}
$(document).ready(main);

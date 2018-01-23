var numberOfItems = 3; //start number of items
var doneItems=0; //to track if user did all his items
var addItem = function(item){ 
    $("ol").prepend("<li style='font-weight:bold'>"+item.toString()+"</li>");
    $('input').val('');
    numberOfItems+=1;
}   

var main = function(){  
    $('#ul1').sortable(); //making it possible to prioritize tasks
    $( "#ul1" ).disableSelection(); //making it possible to prioritize tasks

    $(document).on('keypress', function(e){ //assigning keys ENTER and DELETE
        if (e.which==13){ //assigning ENTER to addItem function
            var newItem = $("#new_item").val();        
            if ($('input').val()!='' && $('input').val()!='Najpierw wpisz zadanie!') addItem(newItem);
            else $('input').val('Najpierw wpisz zadanie!');
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
        if ($('#add').html()=='Dodaj'){ //because there is also 'edit' option on a same button, I need to check if user wants to Add or Edit
            var newItem = $("#new_item").val();        
            if ($('input').val()!='' && $('input').val()!='Najpierw wpisz zadanie!') addItem(newItem);
            else $('input').val('Najpierw wpisz zadanie!');
        }

    });    

    $('#deletion').on('click',function(){ //assigning remove button to remove function
        $("li").each(function(){
            if($(this).css("text-decoration")=="underline") {
                $(this).remove();
                doneItems+=1;
            };
        })
    });

    $('#done').on('click',function(){ //making tasks done through a buttton
        $("li").each(function(){
            if($(this).css("text-decoration")=="underline") {
                $(this).css({"text-decoration":"line-through","color":"green"});
                doneItems+=1;
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

    $('#editTask').on('click', function(){
        var itemsChose=0;
        $('li').each(function() {if($(this).css("text-decoration")=="underline") itemsChose+=1;}) //checking if user chose 1 item to edit
        if (itemsChose!=1) $('input').val('Do edycji trzeba wybrać 1 zadanie!');
        else {
            $('input').val('Tu wpisz nową treść zadania');
            $('#add').html('Zmień!'); //now button for Add becomes the button to Edit
            $("#add").on("click", function(){
                if($('#add').html()=='Zmień!'){ //function will only trigger, if button is 'set' to edit
                    var word=$("#new_item").val();
                    $('li').each(function() {if($(this).css("text-decoration")=="underline") { //selecting the exact item that user chose
                        $(this).html(word);
                        $(this).css({"text-decoration":"none","font-weight":"bold", "color":"black"});
                        }});
                    $('#add').html('Dodaj'); //now button to Edit becomes again the button to Add
                    $('input').val('');
                }
            });
        };
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


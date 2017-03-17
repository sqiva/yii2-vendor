//$(function() {
    function ___make_menu(){
    var o={};

    var margin=0;

    o.__app_list_obj={};

    var set_var_obj = function(data){
        return o.__app_list_obj = data;
    }
    o.__set_var_obj = set_var_obj;

    var make_tree_data = function(){
        var tree={};
        for(var i =0; i<o.__app_list_obj.length;i++){
            tree[o.__app_list_obj[i].APP_CODE] = o.__app_list_obj[i];
        }
        o.__app_list_obj = tree;
    }
    o.__make_tree_data = make_tree_data;
    //alert(JSON.stringify(o.__app_list_obj));
    
    //--------------
    var make_input_list = function (node) {
        var id='chk_list-'+node;
        if(o.__app_list_obj[node].PARENT_CODE==""){
            margin=0;
        }else{
            margin+=20;
        }
        var tree_string = '<ul style="list-style-type: none;padding-left:5px;" ><li id="li-'+node+'">\
            <input parent_code="'+o.__app_list_obj[node].PARENT_CODE+'" id="'+id+'" menu="'+node+'" type="checkbox" class="__chk_click" style="margin-left:'+margin+'px;" />';
        var blue='';
        if(o.__app_list_obj[node].IS_MENU == '0'){
            blue=' style="color:blue;" ';
        }
        tree_string+='<span '+blue+' > '+o.__app_list_obj[node].NAME+' </span>';
        for (var i in o.__app_list_obj) {
            if (o.__app_list_obj[i].PARENT_CODE == node) {
                tree_string += o.__make_input_list(i);
            }
        }
        tree_string += "</li></ul>";
        margin-=20;
        return tree_string;
    }
    o.__make_input_list = make_input_list;

    var chk_click = function(){
        $('.__chk_click').click(function(){
            if($(this).is(':checked')){
                var id_parent = $(this).attr('parent_code');
                var id = $(this).attr('menu');
                //cek kebawah
                set_checklist(id,true);
                $('#li-'+id).find('input[type=checkbox]').attr('checked',true);
                var flag = true;
                temp_id = id_parent;
                //cek keatas
                while(flag){
                    if(document.getElementById('chk_list-'+temp_id) != null){
                        document.getElementById('chk_list-'+temp_id).checked = true;
                        temp_id = document.getElementById('chk_list-'+temp_id).getAttribute('parent_code');
                    }else{
                        flag = false;
                    }
                }
            }else{
                var id = $(this).attr('menu');
                set_checklist(id,false);
            }
        });
    }
    o.__chk_click = chk_click;

    var set_checklist = function(node,status){
        var id='chk_list-'+node;
        if(document.getElementById(id) != null){
            document.getElementById(id).checked = status;
        }
        for (var i in o.__app_list_obj) {
            if (o.__app_list_obj[i].PARENT_CODE == node) {
                set_checklist(i,status);
            }
        }
        return 1;
    }

    var get_checked = function()
    {
        var data  = {};
        var arr = [];
        for (var i in o.__app_list_obj) {
            if(document.getElementById('chk_list-'+i).checked){
                data[i] = 1;
                arr.push(i);
            }
        }
        return arr;
    }
    o.__get_checked = get_checked;

    var set_checked = function()
    {
        for (var i in o.__app_list_obj) {
            document.getElementById('chk_list-'+i).checked=false;
        }
    }
    o.__set_checked = set_checked;

    var make_list = function(){
        var tbl='<div id="__div_chk_box" >';
        //alert(JSON.stringify(o.__app_list_obj));
        for (var key in o.__app_list_obj) {
            if(o.__app_list_obj[key].PARENT_CODE =='0'){
                tbl+=o.__make_input_list(key);
            }
        }
        tbl+='</div>';
        return tbl;
    }
    o.__make_list = make_list;



    
    return o;
  //  jQuery.fn.extend(o);
//});
}


//alert(z);

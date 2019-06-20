var currentUserId = 0;
function whoami(){
        $.ajax({
            url:'/current',
            type:'GET',
            contentType: 'application/json',
            dataType:'json',
            success: function(response){
                //alert(JSON.stringify(response));
                var name = response['name']+" "+response['fullname'];
                currentUserId = response['id']
                $('#cu_name').html(name);
                allusers(currentUserId);
            },
            error: function(response){
                alert(JSON.stringify(response));
            }
        });
    }

    function allusers(idUser){
        $.ajax({
            url:'/users',
            type:'GET',
            contentType: 'application/json',
            dataType:'json',
            success: function(response){
                //alert(JSON.stringify(response));
                var i = 0;
                $.each(response, function(){
                    if (response[i].id!=idUser)
                    {
                        f = '<div class="alert alert-secondary" role="alert" onclick=loadMessages('+currentUserId+','+response[i].id+') >';
                        f = f + response[i].username;
                        f = f + '</div>';
                        $('#allusers').append(f);
                    }
                    i = i+1;
                });
            },
            error: function(response){
                alert(JSON.stringify(response));
            }
        });
    }

    function loadMessages(user_from_id, user_to_id){
        //alert(user_from_id);
        //alert(user_to_id);
        $.ajax({
            url:'/messages/'+user_from_id+"/"+user_to_id,
            type:'GET',
            contentType: 'application/json',
            dataType:'json',
            success: function(response){
                $('#messages_').empty();
                var i = 0;
                $.each(response, function(){
                    if (response[i].user_from_id==user_from_id)
                        f = '<div class="alert alert-info" role="alert" >';
                    if (response[i].user_from_id==user_to_id)
                        f = '<div class="alert alert-warning" role="alert" >';
                    f = f + response[i].content;
                    f = f + '<br>';
                    f = f + response[i].sent_on;
                    f = f + '</div>';
                    i = i+1;
                    $('#messages_').append(f);
                });
                $('#from').html('User id number: '+user_to_id);

                $('#send_button').attr('onclick', 'sendMessage('+user_from_id+','+user_to_id+')');
                $('#div').show();
            },

            error: function(response){
                alert(JSON.stringify(response));
            }
        });

    }

    function sendMessage(user_from_id, user_to_id){
                var content = $('#content').val();
                var message = JSON.stringify({
                        "content": content,
                        "user_from_id": user_from_id,
                        "user_to_id": user_to_id
                    });
               $.ajax({
                         url:'/sendmessage',
                         type:'POST',
                         contentType: 'application/json',
                         data : message,
                         dataType:'json'
                       });
            }

/*
function changeNameLoad(){
    $('#cu_name').hide();
    $('#inputChange').show();
    $('#buttonChange').show();
    $('#cancelChange').show();
}


function changeName(){
    $.ajax({
            url:'/current',
            type:'GET',
            contentType: 'application/json',
            dataType:'json',
            success: function(response){
                var id = response.id;
                allusers();
                var name = $('#inputChange').val();
                alert(name);
                alert(id);
                var message = JSON.stringify({
                                    "id": id,
                                    "name": name
                       });
                alert(8);
                $.ajax({
                         url:'/changename',
                         type:'PUT',
                         contentType: 'application/json',
                         data : message,
                         dataType:'json'
                       });
            },
        });

}

function cancelChange(){
    $('#cu_name').show();
    $('#inputChange').hide();
    $('#buttonChange').hide();
    $('#cancelChange').hide();
}
*/

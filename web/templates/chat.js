var currentUserId = 0;
function whoami(){
        $.ajax({
            url:'/current',
            type:'GET',
            contentType: 'application/json',
            dataType:'json',
            success: function(response){
                //alert(JSON.stringify(response));
                $('#cu_username').html(response['username'])
                var name = response['name']+" "+response['fullname'];
                currentUserId = response['id']
                $('#cu_name').html(name);
                allusers();
            },
            error: function(response){
                alert(JSON.stringify(response));
            }
        });
    }

    function allusers(){
        $.ajax({
            url:'/users',
            type:'GET',
            contentType: 'application/json',
            dataType:'json',
            success: function(response){
                //alert(JSON.stringify(response));
                var i = 0;
                $.each(response, function(){
                    f = '<div class="alert alert-secondary" role="alert" onclick=loadMessages('+currentUserId+','+response[i].id+') >';
                    f = f + response[i].username;
                    f = f + '</div>';
                    i = i+1;
                    $('#allusers').append(f);
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
                    f = '<div class="alert alert-warning" role="alert" >';
                    f = f + '<div class="alert alert-light" role="alert" color="blue">';
                    f = f + response[i].content;
                    f = f + '<div class="alert alert-light" role="alert" >';
                    f = f + response[i].sent_on;
                    f = f + '</div>';
                    f = f + '</div>';
                    f = f + '</div>';
                    i = i+1;
                    $('#messages_').append(f);
                });
                $('#from').html('User id number: '+user_to_id);

                $('#send_button').attr('onclick', 'sendMessage('+user_from_id+','+user_to_id+')');
                $('#div').show();
                alert(JSON.stringify(response));
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

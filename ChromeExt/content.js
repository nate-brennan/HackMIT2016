// content.js
  var pwd="test";   //get password from vb.net app
      var usr="test";   //get username from vb.net app
      var inputs=document.getElementsByTagName("input");    //look for all inputs

      for(var i=0;i<inputs.length;i++){{    //for each input on document

            var input=inputs[i];     //look at whatever input

            if(input.type=="password"&&(input.name.toLowerCase().indexOf("auth")==-1)){
                    {input.value=pwd}
            }
            if(input.type=="text"&&(input.name.toLowerCase().indexOf("login")!=-1||input.name.toLowerCase().indexOf("email")!=-1||input.name.toLowerCase().indexOf("user")!=-1||input.name=="AgentAccount")){
                    {input.value=usr}
            }
       }};
undefined;
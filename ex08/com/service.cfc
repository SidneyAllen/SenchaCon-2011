component  hint="I get the Contact data using Script syntax" output="false"
{
	import  com.*;
	
	remote any function contacts() 
    returnformat="JSON" 
	{	


		var struct = StructNew();
        
	    if (GetHttpRequestData().method eq 'POST') 
        {
        	var jsonData = StructNew();
            var requestBody = toString( getHttpRequestData().content );
     		if (isJSON( requestBody ) )
            {
	            jsonData = deserializeJSON( requestBody );
    		}        
            
            if(len(trim(jsonData['newrecord']['contactid'])) gt 0)
            {
                newContact = EntityLoad('contacts',{ContactId = jsonData['newrecord']['contactid']},true);
                newContact.setName(jsonData['newrecord']['name']);
                newContact.setEmail(jsonData['newrecord']['email']);    
                
            } else {
                newContact = new Contacts(jsonData['newrecord']['name'],jsonData['newrecord']['email']);
            }
            
            EntitySave(newContact);
            struct['contact'] = '';

          
		}
        
        if (GetHttpRequestData().method eq 'GET') 
        {
	        var qReturn = EntityLoad("contacts",{},"Name Asc");
  			struct['contact'] = qReturn;
        }
        struct['success'] = true;
        
		return serializeJSON(struct);
	}
    

}
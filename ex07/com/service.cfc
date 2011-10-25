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
            
            if(len(trim(jsonData['newrecord'][1]['contactid'])) gt 0)
            {
                newContact = EntityLoad('contacts',{ContactId = jsonData['newrecord'][1]['contactid']},true);
                newContact.setName(jsonData['newrecord'][1]['name']);
                newContact.setEmail(jsonData['newrecord'][1]['email']);    
                
            } else {
                newContact = new Contacts(jsonData['newrecord'][1]['name'],jsonData['newrecord'][1]['email']);
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
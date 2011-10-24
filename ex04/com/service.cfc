component  hint="I get the Contact data using Script syntax" output="false"
{
	import  com.*;
	
    
    remote any function getContacts() 
	returnformat="JSON" 
	{  
		return serializeJSON(getAllContactsByCFquery());
	}
  
    

	public any function getAllContactsByCFquery()  	 
	{
		qObj = new Query();
		qObj.setSql( "SELECT * FROM Contacts");
		qObj.setName("myQuery");
		result = qObj.execute( );
		qResult = result.getResult(); 
 
		return qResult;
	}

	


}
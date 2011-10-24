component  hint="I get the Contact data using Script syntax" output="false"
{
	import  com.*;
	
    
    remote any function getContacts(String queryType="orm") 
	returnformat="JSON" 
	{
		qReturn = EntityLoad("contacts",{},"name Asc");
		
        var struct = StructNew();
        
        if(queryType eq 'orm')
        {
        	struct['contact'] = getAllContactsByORM();
  		
        } else if (queryType eq 'cfquery') {
        	struct['contact']  = getAllContactsByCFquery();
        
        } else if (queryType eq 'struct') {
        	struct['contact'] = getAllContactsByStruct();
		
        
        } else if (queryType eq 'querytostruct') {
        	struct['contact']  = QueryToStruct(getAllContactsByCFquery());
       	
        }
        
        struct['queryType'] = arguments.queryType;
        struct['success'] = true;
        
		return serializeJSON(struct);
	}
    
	public any function getAllContactsByORM() 
	{
		qReturn = EntityLoad("contacts",{},"Name Asc");
        
		return qReturn;
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

	public any function getAllContactsByStruct() 
	{
	
		var qObj = new Query();
		qObj.setSql( "SELECT * FROM Contacts");
		qObj.setName("myQuery");
		var result = qObj.execute( );
		var qResult = result.getResult(); 
 
		var aResult = ArrayNew(1);
	 
 		for ( i = 1 ; i LTE qResult.RecordCount;i = (i + 1) )
		{ 
			var struct = StructNew();
			struct["name"] = qResult.Name[i];
			struct["email"] = qResult.Email[i];
            struct["contactid"] = qResult.ContactId[i];
			temp = arrayAppend(aResult,struct);
		}
		
		return aResult;		
	}
    
    
    
  	//Ben Nadel / Kinky Solutions
	//http://www.bennadel.com/index.cfm?event=blog.view&id=149

	public any function QueryToStruct(query Query="") 
	{

		// Define the local scope.
		var LOCAL = StructNew();

		// We are looping over the entire query.
		LOCAL.FromIndex = 1;
		LOCAL.ToIndex = ARGUMENTS.Query.RecordCount;

		// Get the list of columns as an array and the column count.
		LOCAL.Columns = ListToArray( ARGUMENTS.Query.ColumnList );
		LOCAL.ColumnCount = ArrayLen( LOCAL.Columns );

		// Create an array to keep all the objects.
		LOCAL.DataArray = ArrayNew( 1 );

		// Loop over the rows to create a structure for each row.
		for (LOCAL.RowIndex = LOCAL.FromIndex ; LOCAL.RowIndex LTE LOCAL.ToIndex ; LOCAL.RowIndex = (LOCAL.RowIndex + 1)){

			// Create a new structure for this row.
			ArrayAppend( LOCAL.DataArray, StructNew() );

			// Get the index of the current data array object.
			LOCAL.DataArrayIndex = ArrayLen( LOCAL.DataArray );

			// Loop over the columns to set the structure values.
			for (LOCAL.ColumnIndex = 1 ; LOCAL.ColumnIndex LTE LOCAL.ColumnCount ; LOCAL.ColumnIndex = (LOCAL.ColumnIndex + 1)){

				// Get the column value.
				LOCAL.ColumnName = LOCAL.Columns[ LOCAL.ColumnIndex ];

				// Set column value into the structure.
				LOCAL.DataArray[ LOCAL.DataArrayIndex ][ LCase(LOCAL.ColumnName) ] = ARGUMENTS.Query[ LOCAL.ColumnName ][ LOCAL.RowIndex ];

			}

		}

		// Return the entire array.
		return( LOCAL.DataArray );

	}
	
	
	remote any function addContact(String Name="",String Email="", String ContactId="") 
	{	
    	if(len(trim(arguments.ContactId)) gt 0)
        {
        	newContact = EntityLoad('contacts',{ContactId = arguments.ContactId},true);
            newContact.setName(arguments.Name);
        	newContact.setEmail(arguments.Email);    
            
        } else {
        	newContact = new Contacts(arguments.Name,arguments.Email);
        }
		
		EntitySave(newContact);
       
	}

}
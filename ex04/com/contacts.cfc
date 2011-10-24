component  
output="true"  
persistent="true"  
table="Contacts"  
accessors="true" 
hint="I handle the Contacts methods and properties"
{
	property name="ContactId" fieldtype="id" generator="identity" type="numeric" elementtype="integer";
	property name="Name" type="string";
	property name="Email" type="string" ;	

	public contacts function init(String Name="" ,String Email="" ) 
	output="false"
	hint="I initialize this componenet and return a copy of this component"
	{
			this.setName(arguments.Name);
			this.setEmail(arguments.Email);
			return this;
	}
}

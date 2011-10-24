component  
output="true"  
persistent="true"  
table="Contacts"  
accessors="true" 
hint="I handle the Contacts methods and properties"
{
	property name="contactid" fieldtype="id" generator="identity" type="numeric" elementtype="integer";
	property name="name" type="string";
	property name="email" type="string" ;	

	public contacts function init(String name="" ,String email="" ) 
	output="false"
	hint="I initialize this componenet and return a copy of this component"
	{
			this.setName(arguments.name);
			this.setEmail(arguments.email);
			return this;
	}
}

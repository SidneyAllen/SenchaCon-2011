<cfcomponent>
	
	<cfscript>
	
	this.name = 'SenchaCon-ex04';
	
	this.ormEnabled = true;
	this.datasource = "senchacon";
	this.ormSettings.logSQL = true;
	this.ormSettings.dbCreate = "update";
	this.ormSettings.cfclocation = "com";
	this.sessionmanagement = true;
	this.sessiontimeout = createTimeSpan(0,2,0,0);
	
	customtagpaths = "#getDirectoryFromPath(ExpandPath('/com'))#";
	
	THIS.customTagPaths = customtagpaths; 


	this.mappings["/root"] = getDirectoryFromPath(getCurrentTemplatePath());

	public void function setupRequest(){
		showdebugoutput= false;
		
		if (isDefined('url.refresh')) {
			setupApplication();
			ormReload();
	      
		}
	}
	
	
	</cfscript>
	
	
</cfcomponent>
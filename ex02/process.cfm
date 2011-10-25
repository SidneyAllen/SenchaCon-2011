<!---<cfset sleep(2000)>--->
<cfset return = StructNew()>
<cfset return.form = form>
<!---<cfset return.success = true>--->
<cfset return['success'] = true>
<cfoutput>#serializeJSON(return)#<cfsetting showdebugoutput="false" /></cfoutput><cfabort>		
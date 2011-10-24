
Ext.onReady(function(){
	//TTest the library
	//Ext.Msg.alert('Hello World', Ext.version);
	
var fieldDef = [
			{name: 'name', mapping: 'NAME'},
			{name: 'email', mapping: 'EMAIL'}
		];
	
	
var cfQueryReader = new Ext.data.CFQueryReader({id:'COLUMNS'},fieldDef);
	
var store2 = new Ext.data.Store({
	url : 'com/service.cfc',
	baseParams	: {method:'getContacts'},
	reader		: cfQueryReader,
	autoLoad	: true,
	listeners	: {
					load		: doLoad,
					exception	: doException
					} //listeners
});//store
	
function doLoad(){
	console.log('store1:',store2.getCount()+' records');
};
	
function doException(misc){
	console.log('doException :',misc);
};
	
			
// data grid	
var grid = new Ext.grid.GridPanel({
	store		: store2, //store2 = column based json
	width		: 600,
	height		: 600,
	flex:1,
	columns		: [
				{header: 'Name', dataIndex: 'name',flex: 1,  width: 300},
				{header: 'Email', dataIndex: 'email', width: 300}]
});
	
myWin = new Ext.Window({
	title		: 'Members',
	width 		:  627,
	height		: 400,
	autoScroll	: true,
	items		:[grid]
});

myWin.show();

}); //onReady




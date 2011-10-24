function buildGrid() {
	
	Ext.define('Contact', {
		extend: 'Ext.data.Model',
		fields: ['name', 'email']
	});
	
	/* orm, cfquery, struct, querytostruct*/
	var store = Ext.create('Ext.data.Store', {
		model: 'Contact',
		proxy: {
			type: 'ajax',
			url : 'com/service.cfc?method=getContacts&queryType=querytostruct',
			reader: {
				type: 'json',
				root: 'contact'
			}
		},
		autoLoad: true
		
	});

	
	var grid = Ext.create('Ext.grid.Panel', {
		store: store,
		columns: [
			{ text: "Name", flex: 1, width: 120, dataIndex: 'name', sortable: true },
			{ text: "Email", width: 100, dataIndex: 'email', sortable: true },
		],
		height: 210,
		width: 600,
		split: true,
		renderTo: Ext.getBody()
	}).show();

}

Ext.onReady(buildGrid);


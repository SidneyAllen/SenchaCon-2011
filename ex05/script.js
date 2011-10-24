Ext.onReady(function(){
	
	Ext.define('Contact', {
		extend: 'Ext.data.Model',
		fields: ['name', 'email']
	});
	
	var store = Ext.create('Ext.data.Store', {
		model: 'Contact',
		proxy: {
			type: 'ajax',
			url : 'com/service.cfc?method=getContacts&queryType=struct',
			reader: {
				type: 'json',
				root: 'contact'
			}
		},
		autoLoad:true
		
	});
	
	
	var grid = Ext.create('Ext.grid.Panel', {
		title: 'My Contacts',
		store: store,
		columns: [
			{ text: "Name", flex: 1, width: 120, dataIndex: 'name', sortable: true },
			{ text: "Email", width: 100, dataIndex: 'email', sortable: true },
		],
		flex:1,
		height: 250,
		split: true,
	});
	
	
	var simple = new Ext.form.FormPanel({
 
        standardSubmit: false,
 
        frame:true,
        title: 'Contact',
        defaultType: 'textfield',
		items: [{
                fieldLabel: 'Name',
                name: 'name',
                allowBlank:false
            },
			{
                fieldLabel: 'Email',
                name: 'email',
                allowBlank:false
            }
			
        ],
        buttons: [{
            text: 'Submit',
	        handler: function() {
				simple.getForm().submit({
					url : 'com/service.cfc?method=addContact',
					waitMsg: 'Processing Request',
					success: function(simple, resp){
						store.load();
						simple.reset();
					}
				});
				
            }
        }]
 
    });
	

	new Ext.Window({
			height: 300,
			width: 600,
			layout: 'hbox',
			items:[grid,simple]
	}).show();
	
 
});

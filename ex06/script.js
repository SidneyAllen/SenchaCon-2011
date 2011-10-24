Ext.onReady(function(){
	
	Ext.define('Contact', {
		extend: 'Ext.data.Model',
		fields: ['name', 'email','contactid']
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
		store: store,
		columns: [
			{ text: "Name", flex: 1, width: 120, dataIndex: 'name', sortable: true },
			{ text: "Email", width: 100, dataIndex: 'email', sortable: true },
			{ text: "ContactId",dataIndex: 'contactid' , hidden: true},
		],
		flex: 2,
		height:250,
		split: true
	});
	
	
	grid.on('itemclick', function(me, record)
		{
			Ext.getCmp('myForm').getForm().setValues({
				email: record.data.email, 
				name: record.data.name,
				contactid: record.data.contactid
			})
			
		});

	
	var simple = new Ext.form.FormPanel({
 
        standardSubmit: false,
 		id: 'myForm',
		frame:true,
		height: 250,
        defaultType: 'textfield',
		items: [{
                fieldLabel: 'Name',
                name: 'name',
				id: 'name',
                allowBlank:false
            },
			{
                fieldLabel: 'Email',
                name: 'email',
				id: 'email',
                allowBlank:false
            },
			{
                inputType: 'hidden',
                id: 'contactid',
                name: 'contactid'
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
			title: 'My Contacts',
			height: 280,
			width: 600,
			layout: 'hbox',	
			layoutConfig: {
				align: 'stretch',
				pack: 'start'
			},
			items:[grid,simple]
	}).show();
	
 
});

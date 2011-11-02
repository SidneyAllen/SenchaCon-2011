Ext.onReady(function(){
	
	Ext.define('Contact', {
		extend: 'Ext.data.Model',
		fields: ['name', 'email','contactid']
	});
	
	var Contact = Ext.regModel('contact', {
			fields: [
				{name: 'contactid', type: 'string'},
				{name: 'name',  type: 'string'},
				{name: 'email',  type: 'string'}
			]
		});
	
	
	
	
	var store = new Ext.data.Store({
			model: Contact,
			idProperty: 'contactid',
			 proxy: {
					type: 'ajax',
					 api: {
						create: 'com/service.cfc?method=contacts', // Called when saving new records
						read: 'com/service.cfc?method=contacts', // Called when reading existing records
						update: 'com/service.cfc?method=contacts', // Called when updating existing records
						destroy: 'com/service.cfc?method=contacts' // Called when deleting existing records
					},
					reader: {
						type: 'json',
						root: 'contact'
					},
					writer: {
						type: 'json',
						root: 'newrecord'
					},
					
				},
			autoLoad: true
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
		simple.getForm().loadRecord(record)
		
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
				
						
				var record = simple.getRecord();
				record.set(simple.getValues());
				console.log(record);
				
				if(record.data.contactid == '')
				{
					
					store.create(record.data);

				} else {				
					
					store.update(record.data);
				}
				
				//simple.getForm().reset();
				
            }
        }]
 
    }).hide();
	
	
	var addButton =   new Ext.Button({
			
            text: 'Add New',
	        handler: function() {
				var model = new Contact({name:'',email:'',contactid:''});
				
        		simple.loadRecord(model);
					
				simple.show();
				
            }
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
			items:[grid,simple,addButton]
	}).show();
	
 
});

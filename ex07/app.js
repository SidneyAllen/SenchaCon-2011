// JavaScript Document
new Ext.Application({
	launch: function() {
		
		Ext.ns('MyApp');
 
		MyApp.Contact = Ext.regModel('contact', {
			fields: [
				{name: 'contactid', type: 'string'},
				{name: 'name',  type: 'string'},
				{name: 'email',  type: 'string'}
			]
		});

		MyApp.myStore = new Ext.data.Store({
			model: MyApp.Contact,
			 proxy: {
					type: 'ajax',
					url : 'com/service.cfc?method=contacts',
					
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
		
		var header = new Ext.Toolbar({
			dock:"top",
			title:"Contacts",
			items: [
               
                { xtype: 'spacer' },
                {
                    text: 'Add',
                    ui: 'action',
                    handler: function () {
						
						var model = new MyApp.Contact();
				
        				detailPanel.load(model);
						panel.setActiveItem('detail');
                    }
					
                }
            ]
		})
		
		var listPage = new Ext.Panel({
			id: 'list',
			items: [{
				id: 'myList',
				xtype: 'list',
		        store: MyApp.myStore,
		        itemTpl: '{name}',
		      
				onItemDisclosure: function(record, btn, index) {
               		detailPanel.load(record);
                	panel.setActiveItem('detail');
           		}
		    }],
			dockedItems: [header]
		});
		
		
		var contactEditToolbar = new Ext.Toolbar({
            title: 'Edit Contact',
            items: [
                {
                    text: 'Home',
                    ui: 'back',
                    handler: function () {
                        panel.setActiveItem('list', { type: 'slide', direction: 'right' });
                    }
                },
                { xtype: 'spacer' },
                {
                    text: 'Save',
                    ui: 'action',
                    handler: function () {
						var record = detailPanel.getRecord();
						record.set(detailPanel.getValues());
						
						if(record.data.contactid == '')
						{
							MyApp.myStore.create(record.data);
	
						} else {						
							MyApp.myStore.update();
						}
						
						//MyApp.myStore.load();
				 		panel.setActiveItem('list', { type: 'slide', direction: 'right' });
					
                    }
					
                }
            ]
        });
		
		
		
		var detailPanel = new Ext.form.FormPanel({
            id: 'detail',
            items: [
                {
                    xtype: 'textfield',
                    name: 'name',
                    label: 'name',
                    required: true
                },
                {
                    xtype: 'textfield',
                    name: 'email',
                    label: 'email'
                }
            ],
			dockedItems: [contactEditToolbar]
            
        });
	
	
		var panel = new Ext.Panel({
			fullscreen: true,
			id: 'content',
			layout:{type:"card",
				align:"stretch",
				pack:"end"},
			defaults:{flex:1},
			activeItem: 0,
			cardSwitchAnimation:{type:"slide",duration:300},
			items:[listPage,detailPanel]
		});
		
		
	}
});

Ext.onReady(function(){
	var simple = new Ext.form.FormPanel({
 
        standardSubmit: false,
 		id: 'contactForm',
        frame:true,
        title: 'Contact',
		width: 350,
        defaults: {width: 230},
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
						url: 'process.cfm',
						waitMsg: 'Processing Request',
						success: function(contactForm, resp){
							
							Ext.getCmp('resultText').update('Name : ' + resp.result.FORM.NAME + '<br>Email : ' + resp.result.FORM.EMAIL);
							result.show();
						}
					});
					
            }
        }]
		
 
    });
	
	var result = new Ext.form.Panel({
 		id: 'resultText',
        title: 'Results',
		width: 350,
		bodyStyle: 'padding:10px;' 
	}).hide();
 
    simple.render('myForm');
	result.render('myResults');
 
});
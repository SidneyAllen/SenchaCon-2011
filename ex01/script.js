Ext.onReady(function(){
	var simple = new Ext.form.FormPanel({
 
        standardSubmit: true,
 
        frame:true,
        title: 'Contact',
		url: 'process.cfm',
 
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
            },
			{
                inputType: 'hidden',
                id: 'submitbutton',
                name: 'myhiddenbutton',
                value: 'hiddenvalue'
            }
 
        ],
        buttons: [{
            text: 'Submit',
	        handler: function() {
	                simple.getForm().submit();
            }
        }]
 
    });
 
    simple.render('myForm');
 
});
var AwardService = Class.create();

AwardService.prototype = {
	
	type: 'AwardService',
	
    initialize: function(sys_id, fileName, response) {
		this.attachments_table_name = 'sys_attachment';
		this.operations_table_name = 'sys_ws_operation';
		this.grAttachments = new GlideRecord(this.attachments_table_name);
		//this.grOperations = new GlideRecord(this.operations_table_name);
		this.sys_id = sys_id;
		this.fileName = fileName;
		this.response = response;
    },
	
	queryTable: function() {
		this.grAttachments.addQuery('table_sys_id', this.sys_id);
		this.grAttachments.query();
		return this;
	},
	
	queryFile: function() {
		this.grAttachments.addQuery('table_sys_id', this.sys_id);
		this.grAttachments.addQuery('file_name', this.fileName);
		this.grAttachments.query();
		return this;
	},
	
	getContent: function(){
		if (this.grAttachments.next()){
			var message = new GlideSysAttachment().getContent(this.grAttachments);
			return this.getResponse(message);
		}
		return "File Not Found";
	},
	
	getResponse: function(message){
			if (this.fileName.indexOf('.js')>0){ 
				this.response.setContentType('text/javascript');
			}
			else if (this.fileName.indexOf('.css')>0){
				this.response.setContentType('text/css');
			}
			else { this.response.setContentType('text/html'); }
			this.response.setStatus(200);
			return this.response.getStreamWriter().writeString(message);
	},
	
	getFile: function(){
		var bytesInFile = new GlideSysAttachment().getBytes(this.table_name, this.sys_id), dataAsString;
		dataAsString = Packages.java.lang.String(bytesInFile);
		return this.getResponse(String(dataAsString));
	}
    
};
		
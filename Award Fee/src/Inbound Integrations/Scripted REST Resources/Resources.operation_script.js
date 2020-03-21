(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {

    var sys_id = "a01b1d83dba30010629a5385ca961957", 
		fileName = request.pathParams.file, 
		service;
	
		service = new AwardService(sys_id, fileName, response);
		service.queryFile().getContent();

})(request, response);
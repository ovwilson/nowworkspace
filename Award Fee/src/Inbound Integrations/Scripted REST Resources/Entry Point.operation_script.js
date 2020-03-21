(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {
	
	var sys_id = "b5a4b4cbdb230010629a5385ca96193b", service;
		service = new AwardService(sys_id, '/', response);
		service.queryTable().getContent();

})(request, response);
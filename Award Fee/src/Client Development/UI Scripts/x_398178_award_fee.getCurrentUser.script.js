function CurrentUser(){
	this.userName = window.NOW.user.name;
	this.token = window.g_ck;
	this.uri = '/api/now/table/sys_user';
	this.query = 'sysparm_query=user_name%3D{{userName}}';
	this.limit = 'sysparm_limit=1';
	this.fields = 'sysparm_fields=';
	this.client = new XMLHttpRequest();
}

CurrentUser.prototype.get = function(){
	this.client.open('get', this.uri + '?'+ this.query.replace('{{userName}}', this.userName) + '&' + this.limit);
	this.client.setRequestHeader('Accept','application/json');
	this.client.setRequestHeader('Content-Type','application/json');
	this.client.setRequestHeader('X-UserToken', this.token);
	this.client.onloadend = function(){
		if (this.status === 200) { 
			console.table(JSON.parse(this.response).result[0]); 
		}
		else { 
			console.error('Error: '+ this.status + ' - ' + this.statusText, JSON.parse(this.responseText));
		}
	}
	this.client.send();
};

new CurrentUser().get();
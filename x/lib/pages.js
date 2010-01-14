function pages(req, model) {
	if (!model) model = {};
	var scheme = 'http';
	var host = req['headers']['X-Forwarded-Host'] || req['headers']['Host'];
	var db = 'fortytwo';
	var design = '_design/fortytwo';
	
	var _design_idx = req['path'].indexOf('_design');
	var design_base = req['path'].slice(0, _design_idx+2).join('/');
	
	var rel_root = '/' + design_base;
	var host_root = scheme + '://' + host; 
	var abs_root =  host_root + '/' + design_base;
		
	model['page_referer'] = req['headers']['Referer'];
	
	model['page_rel_root'] = '/' + design_base;
	model['page_root'] = rel_root;
	model['page_index'] = rel_root + '/index.html';
	
	model['page_question_list'] = rel_root + '/_list/questions_index/questions_index?descending=true';
	model['page_abs_question_list'] = abs_root + '/_list/questions_index/questions_index?descending=true';
	
	model['page_ask'] = rel_root + '/_show/ask';
	model['page_login'] = rel_root + '/_show/auth';
	model['page_results'] = rel_root + '/_show/results';
	model['page_question'] = rel_root + '/_list/question_and_answers/questions';
	
	model['page_update_answer'] = rel_root + '/_update/answer';
	model['page_update_question'] = rel_root + '/_update/question';
	
	return model;
}
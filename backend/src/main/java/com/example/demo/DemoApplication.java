package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import java.util.*;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

//	@RequestMapping
//	public Map<String, Object> getForms(){
//		Map<String, Object> form = new HashMap<String, Object>();
//		form.put("formId", 1);
//		form.put("formName", "接口");
//		form.put("writable", true);
//		form.put("required", false);
//		form.put("option", false);
//		form.put("form", "string");
//
//		return form;
//	}
}

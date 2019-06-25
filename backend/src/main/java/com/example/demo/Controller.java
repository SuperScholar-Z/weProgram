package com.example.demo;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.ArrayList;

@RestController
@RequestMapping(value = "/form")
public class Controller {
    @RequestMapping(value = "/getForm",method = RequestMethod.POST)
    public Map<String, Object> getForm(@RequestBody Map<String, Object> requestData){
        System.out.println(requestData);

        Map<String, Object> item = new HashMap<String, Object>();
        item.put("itemName", "接口");
        item.put("writable", true);
        item.put("defaultValue", "");
        item.put("required", true);
        item.put("type", "textBox");
        Map<String, Object> item2 = new HashMap<String, Object>();
        item2.put("itemName", "接口2");
        item2.put("writable", true);
        item2.put("defaultValue", "");
        item2.put("required", false);
        item2.put("type", "textArea");
        Map<String, Object> item3 = new HashMap<String, Object>();
        item3.put("itemName", "接口3");
        item3.put("writable", true);
        item3.put("defaultValue", "内容2");
        item3.put("required", false);
        item3.put("type", "select");
        ArrayList<String> values = new ArrayList<>();
        values.add("内容1");
        values.add("内容2");
        values.add("内容3");
        item3.put("values", values);

        Map<String, Object> res = new HashMap<String, Object>();
        ArrayList<Object> form = new ArrayList<>();
        form.add(item);
        form.add(item2);
        form.add(item3);
        res.put("taskId", "123456");
        res.put("formName", "体检表");
        res.put("form", form);

        return res;
    }
    @RequestMapping(value = "/submitForm",method = RequestMethod.POST)
    public Map<String, Object> submitForm(@RequestBody Map<String, Object> requestData) {
        System.out.println(requestData);

        Map<String, Object> res = new HashMap<String, Object>();
        res.put("message", "success");
        return null;
    }
}

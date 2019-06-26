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
    private ArrayList<User> userInfo = new ArrayList<User>();
    public Controller(){
        userInfo.add(new User("123", "123","张三",
                "18818882888", "打杂"));
    }

    @RequestMapping(value = "/login",method = RequestMethod.POST)
    public Map<String, Object> login(@RequestBody Map<String, Object> requestData){
        Map<String, Object> res = new HashMap<String, Object>();
        int status = -1;

        //用户名是否存在
        int index = -1;
        for(int i = 0; i < userInfo.size(); i++){
            if(userInfo.get(i).equals(requestData.get("username"))){
                index = i;
                break;
            }
        }
        if(index == -1){
            res.put("message", "用户名不存在");
        }
        else if(userInfo.get(index).getPassword().equals(requestData.get("password"))){ //密码正确
            status = 0;

            Map<String, Object> userInfoMap = new HashMap<String, Object>();
            userInfoMap.put("name", userInfo.get(index).getName());
            userInfoMap.put("phoneNumber", userInfo.get(index).getPhoneNumber());
            userInfoMap.put("position", userInfo.get(index).getPosition());
            res.put("userInfo", userInfoMap);
        }
        else{
            res.put("message", "用户名或密码错误");
        }
        res.put("status", status);

        return res;
    }
    @RequestMapping(value = "/regist",method = RequestMethod.POST)
    public Map<String, Object> regist(@RequestBody Map<String, Object> requestData) {
        Map<String, Object> res = new HashMap<String, Object>();
        int status = 0;

        //用户名是否存在
        int index = -1;
        for(int i = 0; i < userInfo.size(); i++){
            if(userInfo.get(i).equals(requestData.get("username"))){
                index = i;
                break;
            }
        }
        if(index >= 0){
            status = -1;
            res.put("message", "该用户已注册!");
        }

        if(status == 0){
            User user = new User((String)requestData.get("username"), (String)requestData.get("password"),
                    (String)requestData.get("name"), (String)requestData.get("phoneNumber"), "扫地");
            userInfo.add(user);
        }
        res.put("status", status);
        System.out.println(userInfo);

        return res;
    }
    @RequestMapping(value = "/getProcess",method = RequestMethod.POST)
    public Map<String, Object> getProcess(@RequestBody Map<String, Object> requestData) {
        System.out.println(requestData);
        Map<String, Object> res = new HashMap<String, Object>();

        res.put("1", "流程1");
        res.put("3", "流程3");
        res.put("4", "流程4");
        res.put("6", "流程6");
        return res;
    }
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

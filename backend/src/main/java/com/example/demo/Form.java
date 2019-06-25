package com.example.demo;

import java.util.ArrayList;

public class Form {
    private String formId;
    private String formName;
    private boolean writable;
    private String defaultValue;
    private boolean required;
    private String type;
    private ArrayList<String> values;

    public Form(String formId, String formName, boolean writable, String defaultValue, boolean required, String type, ArrayList<String> values) {
        this.formId = formId;
        this.formName = formName;
        this.writable = writable;
        this.defaultValue = defaultValue;
        this.required = required;
        this.type = type;
        this.values = values;
    }
}

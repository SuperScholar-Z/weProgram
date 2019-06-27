package com.example.demo;

public class User {
    private String username;
    private String password;
    private String name;
    private String phoneNumber;
    private String position;

    public User(String username, String password, String name, String phoneNumber, String position) {
        this.username = username;
        this.password = password;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.position = position;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }
    public String getName() {
        return name;
    }
    public String getPhoneNumber() {
        return phoneNumber;
    }
    public String getPosition() {
        return position;
    }

    @Override
    public String toString(){
        return "username=" + this.username + ",password=" + this.password + "name=" + this.name + "phoneNumber=" +
                this.phoneNumber + "position=" + this.position;
    }
    @Override
    public boolean equals(Object obj){
        if(obj instanceof User){
            User user = (User) obj;
            return this.username.equals(user.getUsername());
        }
        else if(obj instanceof String){
            String str = (String) obj;
            return this.username.equals(str);
        }
        else{
            return false;
        }
    }
}
